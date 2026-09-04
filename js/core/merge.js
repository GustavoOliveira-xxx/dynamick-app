/**
 * Fusão de dois retratos do progresso.
 *
 * Quando a mesma conta é usada no computador e no celular, os dois aparelhos
 * escrevem no mesmo pacote cifrado. Sem fusão, quem grava por último apaga o
 * estudo do outro. Aqui as duas versões são combinadas item a item, de forma
 * determinística: os dois aparelhos, partindo do mesmo par de retratos,
 * chegam ao mesmo resultado e param de brigar.
 */

const CAMPOS_DE_DATA = [
  'updatedAt',
  'lastActiveAt',
  'answeredAt',
  'lastPracticedAt',
  'lastReviewedAt',
  'submittedAt',
  'resolvedAt',
  'finishedAt',
  'startedAt',
  'createdAt',
];

const MAPAS = ['sessions', 'attempts', 'mastery', 'review', 'notes', 'simulationRuns', 'essays'];
const LISTAS = ['profileHistory', 'profileConfirmations', 'reports'];

const ORDEM_ONBOARDING = { not_started: 0, skipped: 1, in_progress: 2, completed: 3 };

/** Data mais recente registrada numa entrada, em milissegundos. */
function carimbo(entrada) {
  if (!entrada || typeof entrada !== 'object') return 0;
  let maior = 0;
  for (const campo of CAMPOS_DE_DATA) {
    const valor = Date.parse(entrada[campo] ?? '');
    if (Number.isFinite(valor) && valor > maior) maior = valor;
  }
  return maior;
}

/**
 * Desempate estável: sem isto, dois aparelhos podem escolher lados diferentes
 * para o mesmo empate e ficar reenviando um ao outro para sempre.
 */
function desempatar(a, b) {
  const textoA = JSON.stringify(a) ?? '';
  const textoB = JSON.stringify(b) ?? '';
  return textoA >= textoB ? a : b;
}

function maisRecente(a, b) {
  if (a === undefined) return b;
  if (b === undefined) return a;
  const carimboA = carimbo(a);
  const carimboB = carimbo(b);
  if (carimboA !== carimboB) return carimboA > carimboB ? a : b;
  return desempatar(a, b);
}

/**
 * Domínio de um tópico é derivado das tentativas. Como as tentativas são
 * unidas, quem viu mais tentativas tem a contagem mais completa — e o valor
 * se corrige sozinho na próxima questão respondida.
 */
function melhorDominio(a, b) {
  if (a === undefined) return b;
  if (b === undefined) return a;
  const tentativasA = Number(a?.attemptCount ?? 0);
  const tentativasB = Number(b?.attemptCount ?? 0);
  if (tentativasA !== tentativasB) return tentativasA > tentativasB ? a : b;
  return maisRecente(a, b);
}

function mesclarMapa(a, b, escolher = maisRecente) {
  const saida = { ...(a ?? {}) };
  for (const [chave, valor] of Object.entries(b ?? {})) {
    saida[chave] = chave in saida ? escolher(saida[chave], valor) : valor;
  }
  return saida;
}

function mesclarLista(a, b) {
  const entradas = [...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])];
  const posicoes = new Map();
  const saida = [];

  for (const item of entradas) {
    const chave = item?.id ?? JSON.stringify(item);
    if (posicoes.has(chave)) {
      const indice = posicoes.get(chave);
      saida[indice] = maisRecente(saida[indice], item);
      continue;
    }
    posicoes.set(chave, saida.length);
    saida.push(item);
  }

  return saida.sort((x, y) => carimbo(x) - carimbo(y));
}

function uniao(a, b) {
  return [...new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])])];
}

function vazio(valor) {
  return valor === null || valor === undefined || valor === '';
}

/**
 * Um retrato recém-criado, sem nenhum estudo dentro.
 *
 * É o estado de um aparelho que acabou de entrar na conta: ele tem a data de
 * agora, mais recente que a do servidor, mas nada a contribuir. Sem esta
 * verificação o celular zerado sobrescreveria o perfil vindo do computador só
 * por ter o relógio à frente.
 */
function semEstudo(estado) {
  if (!estado) return true;
  const temRegistros = MAPAS.some((chave) => Object.keys(estado[chave] ?? {}).length > 0)
    || LISTAS.some((chave) => (estado[chave] ?? []).length > 0)
    || Boolean(estado.plan);
  if (temRegistros) return false;

  const aluno = estado.student ?? {};
  return (ORDEM_ONBOARDING[aluno.onboardingStatus] ?? 0) === 0
    && !aluno.name
    && !aluno.activeProfile
    && Object.keys(aluno.answers ?? {}).length === 0;
}

function mesclarAluno(novo, velho) {
  const base = { ...(velho ?? {}), ...(novo ?? {}) };

  // Campo em branco no lado mais novo não apaga o que o outro aparelho tem:
  // um celular sem perfil preenchido não deve zerar o nome nem o perfil de
  // estudo já definidos no computador.
  for (const [chave, valor] of Object.entries(velho ?? {})) {
    if (vazio(base[chave]) && !vazio(valor)) base[chave] = valor;
  }

  base.completedSteps = uniao(novo?.completedSteps, velho?.completedSteps);
  base.skippedSteps = uniao(novo?.skippedSteps, velho?.skippedSteps);
  base.answers = { ...(velho?.answers ?? {}), ...(novo?.answers ?? {}) };
  base.dimensions = {
    declared: { ...(velho?.dimensions?.declared ?? {}), ...(novo?.dimensions?.declared ?? {}) },
    observed: { ...(velho?.dimensions?.observed ?? {}), ...(novo?.dimensions?.observed ?? {}) },
  };

  // Onboarding e diagnóstico só andam para a frente: terminar num aparelho não
  // pode voltar a pedir tudo de novo no outro.
  const ordemNovo = ORDEM_ONBOARDING[novo?.onboardingStatus] ?? -1;
  const ordemVelho = ORDEM_ONBOARDING[velho?.onboardingStatus] ?? -1;
  if (ordemVelho > ordemNovo) base.onboardingStatus = velho.onboardingStatus;

  // Pular o diagnóstico é uma escolha; ela vale para a conta, não para o aparelho.
  if (novo?.diagnosticStatus === 'skipped' || velho?.diagnosticStatus === 'skipped') {
    base.diagnosticStatus = 'skipped';
  }
  if (!base.confirmedAt) base.confirmedAt = novo?.confirmedAt ?? velho?.confirmedAt ?? null;

  return base;
}

function mesclarPlano(novo, velho) {
  if (!novo) return velho ?? null;
  if (!velho) return novo;

  const semanaNova = String(novo.weekStart ?? '');
  const semanaVelha = String(velho.weekStart ?? '');
  if (semanaNova !== semanaVelha) return semanaNova > semanaVelha ? novo : velho;

  // Mesma semana nos dois aparelhos: um bloco concluído em qualquer um deles
  // continua concluído.
  const concluidos = new Set(
    (velho.blocks ?? []).filter((bloco) => bloco?.status === 'done').map((bloco) => bloco.id),
  );

  return {
    ...novo,
    blocks: (novo.blocks ?? []).map((bloco) =>
      bloco?.status !== 'done' && concluidos.has(bloco?.id) ? { ...bloco, status: 'done' } : bloco,
    ),
  };
}

/**
 * Une dois retratos completos do progresso.
 *
 * A ordem dos argumentos não muda o resultado: o que decide cada item é a data
 * gravada nele, não quem chamou a função.
 */
export function mesclarEstados(a, b) {
  if (!a) return b ?? null;
  if (!b) return a;

  // Aparelho que ainda não estudou nada só recebe; não tem o que somar.
  if (semEstudo(a)) return b;
  if (semEstudo(b)) return a;

  const dataA = Date.parse(a.updatedAt ?? '') || 0;
  const dataB = Date.parse(b.updatedAt ?? '') || 0;
  const [novo, velho] = dataA >= dataB ? [a, b] : [b, a];

  const saida = { ...velho, ...novo };

  for (const chave of MAPAS) {
    saida[chave] = mesclarMapa(novo[chave], velho[chave], chave === 'mastery' ? melhorDominio : maisRecente);
  }
  for (const chave of LISTAS) {
    saida[chave] = mesclarLista(novo[chave], velho[chave]);
  }

  saida.student = mesclarAluno(novo.student, velho.student);
  saida.preferences = { ...(velho.preferences ?? {}), ...(novo.preferences ?? {}) };
  saida.plan = mesclarPlano(novo.plan, velho.plan);
  saida.conta = novo.conta ?? velho.conta ?? undefined;
  if (saida.conta === undefined) delete saida.conta;

  saida.createdAt = [velho.createdAt, novo.createdAt].filter(Boolean).sort()[0] ?? novo.createdAt;
  saida.updatedAt = new Date(Math.max(dataA, dataB) || Date.now()).toISOString();

  return saida;
}

export const _internos = { carimbo, mesclarLista, mesclarMapa, mesclarPlano, mesclarAluno, semEstudo };

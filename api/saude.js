import { neon } from '@neondatabase/serverless';

/** Mesma lista aceita por /api/sync. */
const VARIAVEIS = [
  'DATABASE_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'NEON_DATABASE_URL',
];

/**
 * Diz, numa página só, se a sincronização entre aparelhos está de pé.
 *
 * Aberto no navegador responde em português, com o que fazer em seguida;
 * chamado por script responde JSON. Sem isto, descobrir por que o celular não
 * entra exigia ler mensagem de erro de login e vasculhar painel.
 *
 * Nada aqui expõe a string de conexão, o host do banco ou dado de aluno: só o
 * nome da variável encontrada e quantos pacotes cifrados estão guardados.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405);
    res.setHeader('allow', 'GET');
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ erro: 'Método não suportado.' }));
    return;
  }

  const diagnostico = await diagnosticar();
  const querHtml = String(req.headers?.accept ?? '').includes('text/html');

  res.status(diagnostico.pronto ? 200 : 503);
  res.setHeader('cache-control', 'no-store');

  if (querHtml) {
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end(pagina(diagnostico));
    return;
  }

  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(diagnostico));
}

async function diagnosticar() {
  const variavel = VARIAVEIS.find((nome) => String(process.env[nome] ?? '').trim().length > 0);

  if (!variavel) {
    return {
      pronto: false,
      estado: 'sem-variavel',
      banco: { configurado: false, variavel: null, conectado: false },
      tabela: { existe: false, pacotes: null },
      acervo: null,
      titulo: 'A sincronização está parada',
      resumo:
        'Esta publicação subiu sem a conexão com o banco, então entrar com a mesma conta em outro aparelho não funciona.',
      passos: [
        'No console do Neon, abra o projeto do Dynamick e copie a string de conexão (Connect).',
        'Na Vercel, em Settings › Environments › Production, cole em DATABASE_URL — o valor precisa começar com postgresql:// e conter .neon.tech.',
        'Faça Redeploy: variável nova só vale no deploy seguinte.',
      ],
      variaveisAceitas: VARIAVEIS,
    };
  }

  const sql = neon(process.env[variavel].trim());

  try {
    const [linha] = await sql`SELECT count(*)::int AS pacotes FROM sync_snapshots`;
    return {
      pronto: true,
      estado: 'ok',
      banco: { configurado: true, variavel, conectado: true },
      tabela: { existe: true, pacotes: linha.pacotes },
      acervo: await lerAcervo(sql),
      titulo: 'A sincronização está no ar',
      resumo:
        linha.pacotes === 0
          ? 'O banco respondeu e a tabela existe. Ainda não há nenhuma conta guardada: crie a sua no computador e este número vira 1.'
          : `O banco respondeu e há ${linha.pacotes} conta(s) guardada(s). Entrar com o mesmo e-mail e senha em outro aparelho traz o progresso junto.`,
      passos: [],
    };
  } catch (erro) {
    const mensagem = String(erro?.message ?? '');
    const semTabela = /relation .*sync_snapshots.* does not exist/i.test(mensagem);

    console.error('falha em /api/saude', erro);

    if (semTabela) {
      return {
        pronto: false,
        estado: 'sem-tabela',
        banco: { configurado: true, variavel, conectado: true },
        tabela: { existe: false, pacotes: null },
        acervo: null,
        titulo: 'O banco respondeu, mas falta a tabela',
        resumo:
          'A conexão está certa. Só falta criar a tabela sync_snapshots, que é onde os pacotes cifrados ficam guardados.',
        passos: [
          'Faça Redeploy da produção: o build roda db/migrar.mjs e cria o que falta.',
          'Ou rode npm run db:migrar com a DATABASE_URL apontando para este banco — pode rodar quantas vezes quiser, não apaga nada.',
        ],
      };
    }

    return {
      pronto: false,
      estado: 'sem-resposta',
      banco: { configurado: true, variavel, conectado: false },
      tabela: { existe: false, pacotes: null },
      acervo: null,
      titulo: 'O banco não respondeu',
      resumo:
        `A variável ${variavel} está preenchida, mas a conexão falhou. Normalmente é string trocada, senha rodada ou projeto do Neon apagado.`,
      passos: [
        'Confira no console do Neon se o projeto continua ativo.',
        'Gere a string de conexão de novo em Connect e substitua o valor na Vercel.',
        'Faça Redeploy depois de trocar.',
      ],
    };
  }
}

/**
 * O acervo no banco é uma cópia de js/data/ que o build de produção atualiza.
 * Só informa: o site funciona mesmo sem ela, então não muda o "pronto".
 */
async function lerAcervo(sql) {
  try {
    const [linha] = await sql`SELECT totals, synced_at, source_commit FROM catalog_sync WHERE id = 1`;
    if (!linha) return { carregado: false };
    return {
      carregado: true,
      assuntos: Number(linha.totals?.topics ?? 0),
      questoes: Number(linha.totals?.questions ?? 0),
      atualizadoEm: linha.synced_at,
      commit: linha.source_commit ? String(linha.source_commit).slice(0, 7) : null,
    };
  } catch {
    // Banco anterior a db/migracoes/03-acervo-atual.sql.
    return { carregado: false };
  }
}

const CORES = {
  ok: '#2ee88a',
  'sem-variavel': '#ff6b7a',
  'sem-tabela': '#ffc861',
  'sem-resposta': '#ff6b7a',
};

function escapar(texto) {
  return String(texto).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function descreverAcervo(acervo) {
  if (!acervo) return '—';
  if (!acervo.carregado) return 'ainda não carregado';
  const data = new Date(acervo.atualizadoEm).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  return `${acervo.questoes} questões em ${acervo.assuntos} assuntos, de ${data}`;
}

function pagina(d) {
  const cor = CORES[d.estado] ?? '#ffc861';
  const passos = d.passos.length
    ? `<ol>${d.passos.map((passo) => `<li>${escapar(passo)}</li>`).join('')}</ol>`
    : '';

  const linhas = [
    ['Conexão configurada', d.banco.configurado ? `sim, por ${d.banco.variavel}` : 'não'],
    ['Banco respondendo', d.banco.conectado ? 'sim' : 'não'],
    ['Tabela sync_snapshots', d.tabela.existe ? 'existe' : 'não encontrada'],
    ['Contas guardadas', d.tabela.pacotes === null ? '—' : String(d.tabela.pacotes)],
    ['Acervo no banco', descreverAcervo(d.acervo)],
  ];

  return `<!doctype html>
<html lang="pt-BR">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Sincronização — Dynamic CK</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 2rem 1.25rem; background: #020504; color: #e8f4ef;
    font: 16px/1.6 'Work Sans', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    display: flex; justify-content: center;
  }
  main { width: 100%; max-width: 34rem; }
  .selo {
    display: inline-flex; align-items: center; gap: .5rem; font-size: .8rem;
    letter-spacing: .08em; text-transform: uppercase; color: ${cor};
    border: 1px solid ${cor}40; border-radius: 999px; padding: .3rem .8rem;
  }
  .selo::before { content: ''; width: .5rem; height: .5rem; border-radius: 50%; background: ${cor}; }
  h1 { font-size: 1.65rem; line-height: 1.25; margin: 1rem 0 .5rem; color: ${cor}; }
  p.resumo { margin: 0 0 1.5rem; color: #b9d4c9; }
  section {
    background: #0a1715; border: 1px solid rgb(46 232 138 / 14%);
    border-radius: 14px; padding: 1.1rem 1.25rem; margin-bottom: 1rem;
  }
  h2 { font-size: .78rem; letter-spacing: .08em; text-transform: uppercase;
       color: #7fa596; margin: 0 0 .75rem; font-weight: 600; }
  ol { margin: 0; padding-left: 1.2rem; }
  ol li { margin-bottom: .6rem; }
  ol li:last-child { margin-bottom: 0; }
  dl { margin: 0; display: grid; grid-template-columns: 1fr auto; gap: .55rem 1rem; }
  dt { color: #7fa596; }
  dd { margin: 0; text-align: right; font-variant-numeric: tabular-nums; }
  footer { color: #5d7d70; font-size: .8rem; margin-top: 1.5rem; }
  a { color: ${cor}; }
  @media (max-width: 30rem) { body { padding: 1.5rem 1rem; } h1 { font-size: 1.4rem; } }
</style>
<main>
  <span class="selo">${d.pronto ? 'no ar' : 'parada'}</span>
  <h1>${escapar(d.titulo)}</h1>
  <p class="resumo">${escapar(d.resumo)}</p>
  ${passos ? `<section><h2>O que fazer</h2>${passos}</section>` : ''}
  <section>
    <h2>Detalhes</h2>
    <dl>${linhas.map(([rotulo, valor]) => `<dt>${escapar(rotulo)}</dt><dd>${escapar(valor)}</dd>`).join('')}</dl>
  </section>
  <footer>
    Esta página não mostra a string de conexão nem nada de aluno — só se a ligação com o banco está de pé.
    Os pacotes sobem cifrados com a sua senha.
  </footer>
</main>
</html>`;
}

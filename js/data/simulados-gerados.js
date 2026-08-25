import { SUBJECTS } from './areas.js';

const QUESTOES_POR_ASSUNTO = 8;
const MINUTOS_POR_ASSUNTO = 16;
const QUESTOES_POR_MATERIA = 12;
const MINUTOS_POR_MATERIA = 26;

function distribuir(total, partes) {
  const base = Math.floor(total / partes.length);
  const sobra = total - base * partes.length;
  const saida = {};
  partes.forEach((parte, indice) => {
    const extra = indice < sobra ? 1 : 0;
    const quantidade = base + extra;
    if (quantidade > 0) saida[parte] = quantidade;
  });
  return saida;
}

function proporcaoDeDificuldade(total) {
  const intro = Math.max(1, Math.round(total * 0.3));
  const desafio = Math.max(1, Math.round(total * 0.2));
  return { intro, intermediate: Math.max(1, total - intro - desafio), challenging: desafio };
}

export function simuladosDeAssunto(topicos) {
  return topicos.map((topico) => {
    const principais = topico.questions.filter((questao) => !questao.isRecovery).length;
    const total = Math.min(QUESTOES_POR_ASSUNTO, principais);
    return {
      slug: `simulado-assunto-${topico.slug}`,
      title: `Simulado de ${topico.name}`,
      description: `${total} questões sorteadas só deste assunto. A cada tentativa o sorteio muda.`,
      kind: 'topic',
      areaSlug: topico.areaSlug,
      subjectSlug: topico.subjectSlug,
      topicSlug: topico.slug,
      questionCount: total,
      minutes: Math.max(8, Math.round((total / QUESTOES_POR_ASSUNTO) * MINUTOS_POR_ASSUNTO)),
      blueprint: {
        topics: { [topico.slug]: total },
        difficulty: proporcaoDeDificuldade(total),
      },
    };
  });
}

export function simuladosDeMateria(topicos) {
  const porMateria = new Map();
  for (const topico of topicos) {
    if (!porMateria.has(topico.subjectSlug)) porMateria.set(topico.subjectSlug, []);
    porMateria.get(topico.subjectSlug).push(topico);
  }

  const saida = [];
  for (const materia of SUBJECTS) {
    const daMateria = porMateria.get(materia.slug) ?? [];
    if (daMateria.length === 0) continue;

    const disponiveis = daMateria.reduce(
      (soma, topico) => soma + topico.questions.filter((questao) => !questao.isRecovery).length,
      0,
    );
    const total = Math.min(QUESTOES_POR_MATERIA, disponiveis);
    const slugs = daMateria.map((topico) => topico.slug);

    saida.push({
      slug: `simulado-materia-${materia.slug}`,
      title: `Simulado de ${materia.name}`,
      description: `${total} questões espalhadas entre os ${daMateria.length} assuntos de ${materia.name}.`,
      kind: 'subject',
      areaSlug: materia.areaSlug,
      subjectSlug: materia.slug,
      questionCount: total,
      minutes: Math.max(10, Math.round((total / QUESTOES_POR_MATERIA) * MINUTOS_POR_MATERIA)),
      blueprint: {
        topics: distribuir(total, slugs),
        difficulty: proporcaoDeDificuldade(total),
      },
    });
  }
  return saida;
}

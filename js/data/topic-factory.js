/**
 * Fábrica dos tópicos da segunda leva.
 *
 * Os doze tópicos originais foram escritos à mão, um a um, e continuam assim.
 * Esta leva cobre os demais assuntos previstos no escopo — inclusive as três
 * matérias que ainda não tinham nenhum tópico: Literatura, História e Filosofia.
 *
 * A fábrica existe por um motivo simples: com quase trinta tópicos novos, repetir
 * a mesma estrutura editorial à mão convida ao erro — um `kind` trocado, uma
 * ordem repetida, um `skillSlug` que não existe. Aqui a estrutura é garantida por
 * construção e o que se escreve é só o conteúdo.
 *
 * O que a fábrica NÃO faz: gerar texto. Cada resumo, explicação, exemplo, erro
 * comum e questão é escrito por pessoa, em português do Brasil, e passa pelas
 * mesmas checagens de integridade dos originais (tests/content.test.mjs).
 */

const LABELS = ['A', 'B', 'C', 'D', 'E'];

export const ORIGIN = 'AUTORAL_LEVA_2';
export const LICENSE = 'Conteúdo autoral de desenvolvimento — Conscious Knowledge';

/**
 * Uma questão.
 *
 * @param {{
 *   slug: string,
 *   stem: string,
 *   difficulty: 'intro'|'intermediate'|'challenging',
 *   format: 'concept'|'applied'|'interpretation'|'comparison'|'integration',
 *   reasoning: string,
 *   seconds?: number,
 *   recovery?: boolean,
 *   errors?: string[],
 *   correct: number,           índice (0 a 4) da alternativa correta
 *   options: [string, string, string?][],  texto, comentário e (opcional) dica de erro
 *   explanation: string,
 *   detail?: string,
 *   strategy?: string,
 * }} definition
 */
export function question(definition) {
  const {
    slug, stem, difficulty, format, reasoning, seconds = 120, recovery = false,
    errors = [], correct, options, explanation, detail, strategy,
  } = definition;

  if (options.length !== 5) throw new Error(`Questão ${slug}: são necessárias 5 alternativas.`);
  if (!Number.isInteger(correct) || correct < 0 || correct > 4) {
    throw new Error(`Questão ${slug}: índice da alternativa correta inválido.`);
  }
  if (!explanation?.trim()) throw new Error(`Questão ${slug}: falta a explicação.`);

  return {
    slug,
    stem,
    difficulty,
    cognitiveFormat: format,
    reasoningType: reasoning,
    estimatedSeconds: seconds,
    ...(recovery ? { isRecovery: true } : {}),
    likelyErrors: errors,
    origin: ORIGIN,
    license: LICENSE,
    status: 'reviewed',
    options: options.map(([text, rationale, errorHint], index) => ({
      label: LABELS[index],
      text,
      ...(index === correct ? { isCorrect: true } : {}),
      rationale,
      ...(errorHint ? { errorHint } : {}),
    })),
    explanation: {
      summary: explanation,
      ...(detail ? { detailed: detail } : {}),
      ...(strategy ? { strategy } : {}),
    },
  };
}

/**
 * Um tópico completo: resumo rápido, explicação, dois exemplos resolvidos, três
 * erros comuns, perguntas de autoexplicação e as questões.
 *
 * @param {{
 *   slug: string, name: string, subject: string, area: string, summary: string,
 *   difficulty?: string, minutes?: number, weight?: number, order?: number,
 *   prerequisites?: string[], related?: string[],
 *   skill: { slug: string, name: string, description: string },
 *   quick: string,
 *   explanation: { title: string, body: string },
 *   examples: [{ title: string, body: string }, { title: string, body: string }],
 *   mistakes: string,
 *   selfCheck: string[],
 *   questions: object[],
 * }} definition
 */
export function topic(definition) {
  const {
    slug, name, subject, area, summary,
    difficulty = 'intermediate', minutes = 22, weight = 80, order = 1,
    prerequisites, related,
    skill, quick, explanation, examples, mistakes, selfCheck, questions,
  } = definition;

  if (examples.length !== 2) throw new Error(`Tópico ${slug}: são esperados 2 exemplos resolvidos.`);
  if (questions.length < 5) throw new Error(`Tópico ${slug}: mínimo de 5 questões.`);

  const formatos = new Set(questions.filter((item) => !item.isRecovery).map((item) => item.cognitiveFormat));
  for (const esperado of ['concept', 'applied', 'interpretation', 'comparison', 'integration']) {
    if (!formatos.has(esperado)) {
      throw new Error(`Tópico ${slug}: falta questão do formato "${esperado}".`);
    }
  }

  // Toda questão precisa apontar para uma habilidade que existe no tópico.
  const comHabilidade = questions.map((item) => ({ ...item, skillSlug: item.skillSlug ?? skill.slug }));

  return {
    slug,
    name,
    subjectSlug: subject,
    areaSlug: area,
    summary,
    difficulty,
    estimatedMinutes: minutes,
    curationWeight: weight,
    order,
    ...(prerequisites ? { prerequisites } : {}),
    ...(related ? { related } : {}),
    skills: [skill],
    content: [
      { slug: `${slug}-resumo`, kind: 'quick_summary', title: 'Em 2 minutos', depth: 'quick', order: 1, body: quick },
      { slug: `${slug}-explicacao`, kind: 'explanation', title: explanation.title, depth: 'standard', order: 2, body: explanation.body },
      { slug: `${slug}-exemplo-1`, kind: 'worked_example', title: examples[0].title, order: 3, body: examples[0].body },
      { slug: `${slug}-exemplo-2`, kind: 'worked_example', title: examples[1].title, order: 4, body: examples[1].body },
      { slug: `${slug}-erros`, kind: 'common_mistakes', title: 'Três erros que mais custam ponto', order: 5, body: mistakes },
      {
        slug: `${slug}-autoexplicacao`,
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: selfCheck.map((pergunta, indice) => `${indice + 1}. ${pergunta}`).join('\n'),
      },
    ],
    questions: comHabilidade,
  };
}

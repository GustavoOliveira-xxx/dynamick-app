/** Estrutura editorial comum às questões da expansão de agosto de 2026. */

const LABELS = ['A', 'B', 'C', 'D', 'E'];

export function expandedQuestion(definition) {
  const {
    topicSlug,
    slug,
    stem,
    support,
    difficulty,
    cognitiveFormat,
    reasoningType,
    estimatedSeconds = 120,
    skillSlug,
    likelyErrors = [],
    correct,
    options,
    explanation,
    strategy,
  } = definition;

  if (options.length !== 5 || correct < 0 || correct > 4) {
    throw new Error(`Questão de expansão inválida: ${slug}`);
  }

  return {
    topicSlug,
    slug,
    stem,
    ...(support ? { support } : {}),
    difficulty,
    cognitiveFormat,
    reasoningType,
    estimatedSeconds,
    skillSlug,
    likelyErrors,
    origin: 'AUTORAL_EXPANSAO_2026_08',
    license: 'Conteúdo autoral de desenvolvimento — Conscious Knowledge',
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
      detailed: explanation,
      ...(strategy ? { strategy } : {}),
    },
  };
}

/**
 * Revisão espaçada.
 * Combina o que o estudante declara ("não lembro / lembro parcialmente / domino")
 * com o resultado observado na questão de recuperação.
 */

export const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60];
export const EASE_BOUNDS = { min: 130, max: 320 };

/**
 * A declaração não vale sozinha: dizer "domino" e errar é tratado como
 * "lembro parcialmente" — e o contrário também.
 */
export function reconcileRecall({ recall, wasCorrect }) {
  if (wasCorrect === undefined) return recall;
  if (recall === 'mastered' && wasCorrect === false) return 'partial';
  if (recall === 'forgot' && wasCorrect === true) return 'partial';
  return recall;
}

export function nextReviewState(current, outcome) {
  const recall = reconcileRecall(outcome);

  if (recall === 'forgot') {
    // Volta ao começo, mas guarda o histórico de repetições no ease.
    return {
      interval: REVIEW_INTERVALS[0],
      ease: Math.max(EASE_BOUNDS.min, current.ease - 30),
      repetitions: 0,
    };
  }

  const repetitions = current.repetitions + 1;

  if (recall === 'partial') {
    const index = Math.min(REVIEW_INTERVALS.length - 1, Math.max(0, repetitions - 1));
    return {
      interval: REVIEW_INTERVALS[index] ?? REVIEW_INTERVALS[0],
      ease: Math.max(EASE_BOUNDS.min, current.ease - 10),
      repetitions,
    };
  }

  // "domino" confirmado: cresce pelo fator de facilidade, com teto.
  const grown = Math.round((current.interval * current.ease) / 100);
  return {
    interval: Math.min(180, Math.max(REVIEW_INTERVALS[1], grown)),
    ease: Math.min(EASE_BOUNDS.max, current.ease + 12),
    repetitions,
  };
}

export function nextDueDate(state, from = new Date()) {
  const due = new Date(from);
  due.setHours(0, 0, 0, 0);
  due.setDate(due.getDate() + state.interval);
  return due;
}

/**
 * A revisão SEMPRE inclui um item novo ou reformulado: o estudante não pode "passar"
 * só por lembrar o enunciado antigo.
 */
export function buildReviewBatch(originalIds, candidates, size) {
  const seen = new Set(originalIds);
  const fresh = candidates.filter((candidate) => !seen.has(candidate.id));
  const picked = [];

  const firstFresh = fresh[0];
  if (firstFresh) picked.push(firstFresh.id);

  for (const id of originalIds) {
    if (picked.length >= size) break;
    if (!picked.includes(id)) picked.push(id);
  }

  for (const candidate of fresh) {
    if (picked.length >= size) break;
    if (!picked.includes(candidate.id)) picked.push(candidate.id);
  }

  return { questionIds: picked.slice(0, size), hasFreshItem: Boolean(firstFresh) };
}

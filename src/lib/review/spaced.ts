import type { RecallLevel } from '@/lib/domain';

/**
 * Revisão espaçada — §5.7.
 * Lógica simples e configurável, combinando o que o estudante declara
 * ("não lembro / lembro parcialmente / domino") com o resultado observado.
 */

export const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60] as const;

export type ReviewState = {
  interval: number;
  ease: number; // ×100
  repetitions: number;
};

export type ReviewOutcome = {
  recall: RecallLevel;
  /** Resultado observado na questão de recuperação, quando houve uma. */
  wasCorrect?: boolean;
};

export const EASE_BOUNDS = { min: 130, max: 320 } as const;

/**
 * A declaração do estudante não vale sozinha: dizer "domino" e errar a questão
 * de recuperação é tratado como "lembro parcialmente".
 */
export function reconcileRecall({ recall, wasCorrect }: ReviewOutcome): RecallLevel {
  if (wasCorrect === undefined) return recall;
  if (recall === 'mastered' && wasCorrect === false) return 'partial';
  if (recall === 'forgot' && wasCorrect === true) return 'partial';
  return recall;
}

export function nextReviewState(current: ReviewState, outcome: ReviewOutcome): ReviewState {
  const recall = reconcileRecall(outcome);

  if (recall === 'forgot') {
    // Volta para o começo, mas guarda o histórico de repetições.
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
  const interval = Math.min(180, Math.max(REVIEW_INTERVALS[1], grown));
  return {
    interval,
    ease: Math.min(EASE_BOUNDS.max, current.ease + 12),
    repetitions,
  };
}

export function nextDueDate(state: ReviewState, from = new Date()): Date {
  const due = new Date(from);
  due.setHours(0, 0, 0, 0);
  due.setDate(due.getDate() + state.interval);
  return due;
}

/**
 * A revisão sempre inclui um item novo ou reformulado (§5.7): o estudante não pode
 * "passar" apenas por lembrar o enunciado antigo.
 */
export function buildReviewBatch<T extends { id: string; isRecovery: boolean }>(
  originalQuestionIds: string[],
  candidates: T[],
  size: number,
): { questionIds: string[]; hasFreshItem: boolean } {
  const seen = new Set(originalQuestionIds);
  const fresh = candidates.filter((candidate) => !seen.has(candidate.id));

  const picked: string[] = [];
  // Pelo menos um item inédito primeiro.
  const firstFresh = fresh[0];
  if (firstFresh) picked.push(firstFresh.id);

  for (const id of originalQuestionIds) {
    if (picked.length >= size) break;
    if (!picked.includes(id)) picked.push(id);
  }

  for (const candidate of fresh) {
    if (picked.length >= size) break;
    if (!picked.includes(candidate.id)) picked.push(candidate.id);
  }

  return { questionIds: picked.slice(0, size), hasFreshItem: Boolean(firstFresh) };
}

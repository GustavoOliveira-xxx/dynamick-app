export const CONSOLIDATION_RULES = {
  minDistinctQuestions: 4,
  minDistinctSessions: 2,
  minAccuracy: 0.8,

  forgettingDays: 30,
};

export function accuracy(input) {
  if (input.attemptCount <= 0) return 0;
  return input.correctCount / input.attemptCount;
}

export function computeMasteryState(input) {
  if (input.attemptCount === 0) {
    return input.viewedContent ? 'explored' : 'not_started';
  }

  if (input.distinctQuestions < 3) return 'explored';

  const rate = accuracy(input);

  const needsReview =
    input.recentErrors >= 2 ||
    rate < 0.6 ||
    input.lowConfidenceAttempts >= 3 ||
    (input.daysSinceLastPractice !== null &&
      input.daysSinceLastPractice > CONSOLIDATION_RULES.forgettingDays);

  if (needsReview) return 'needs_review';

  const consolidated =
    input.distinctQuestions >= CONSOLIDATION_RULES.minDistinctQuestions &&
    input.distinctSessions >= CONSOLIDATION_RULES.minDistinctSessions &&
    rate >= CONSOLIDATION_RULES.minAccuracy &&
    input.recentErrors === 0;

  return consolidated ? 'consolidated' : 'practicing';
}

export function computeMasteryScore(input) {
  if (input.attemptCount === 0) return input.viewedContent ? 10 : 0;

  const rate = accuracy(input);
  const evidence = Math.min(1, input.distinctQuestions / CONSOLIDATION_RULES.minDistinctQuestions);
  const spread = Math.min(1, input.distinctSessions / CONSOLIDATION_RULES.minDistinctSessions);
  const confidencePenalty = Math.min(0.2, input.lowConfidenceAttempts * 0.04);
  const decay =
    input.daysSinceLastPractice !== null && input.daysSinceLastPractice > 14
      ? Math.min(0.25, (input.daysSinceLastPractice - 14) / 120)
      : 0;

  const raw = rate * 0.6 + evidence * 0.22 + spread * 0.18 - confidencePenalty - decay;
  return Math.max(0, Math.min(100, Math.round(raw * 100)));
}

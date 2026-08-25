import { getState, update } from './store.js';
import { applyPreferencesTo } from './preferences-dom.js';
import { newId, startOfWeek, daysBetween, clamp } from './format.js';
import { classifyProfile } from '../engine/profile.js';
import { getProfile } from '../engine/profiles.js';
import { computeMasteryScore, computeMasteryState } from '../engine/mastery.js';
import { nextDueDate, nextReviewState } from '../engine/spaced.js';
import { recommendTopics } from '../engine/recommendation.js';
import {
  TOPICS,
  getArea,
  getQuestion,
  getSubject,
  getTopic,
  questionsForTopic,
} from '../data/content.js';

export function student() {
  return getState().student;
}

export function preferences() {
  return getState().preferences;
}

export function activeProfile() {
  return getProfile(student().activeProfile);
}

export function syncProfile() {
  const result = classifyProfile(student().answers);

  update((state) => {
    const s = state.student;
    s.suggestedProfile = result.suggested;

    if (!s.confirmedAt) s.activeProfile = result.suggested;
    s.confidence = result.confidence;
    s.provisional = result.provisional;
    s.dimensions.declared = result.dimensions;

    const answers = s.answers;
    const days = Number(answers.daysPerWeek);
    const minutes = Number(answers.sessionMinutes);
    if (Number.isFinite(days)) s.daysPerWeek = clamp(days, 1, 7);
    if (Number.isFinite(minutes)) s.sessionMinutes = clamp(minutes, 5, 180);
    if (result.suggestsDiagnostic && s.diagnosticStatus === 'pending') {
      s.diagnosticStatus = 'pending';
    }
  });

  return result;
}

export function saveAnswer(questionId, value) {
  update((state) => {
    state.student.answers[questionId] = value;
  });
}

export function markStepCompleted(stepSlug) {
  update((state) => {
    const s = state.student;
    const completed = new Set(s.completedSteps);
    const skipped = new Set(s.skippedSteps);
    completed.add(stepSlug);
    skipped.delete(stepSlug);
    s.completedSteps = [...completed];
    s.skippedSteps = [...skipped];
    s.onboardingStep = stepSlug;
    if (s.onboardingStatus !== 'completed') s.onboardingStatus = 'in_progress';
  });
}

export function markStepSkipped(stepSlug) {
  update((state) => {
    const s = state.student;
    const skipped = new Set(s.skippedSteps);
    skipped.add(stepSlug);
    s.skippedSteps = [...skipped];
    s.onboardingStep = stepSlug;
    if (s.onboardingStatus !== 'completed') s.onboardingStatus = 'in_progress';
  });
}

export function skipOnboarding() {
  update((state) => {
    const s = state.student;
    s.onboardingStatus = 'skipped';
    s.suggestedProfile = 'explorador-sem-rota';
    s.activeProfile = 'explorador-sem-rota';
    s.confidence = 'low';
    s.provisional = true;
    s.diagnosticStatus = 'pending';
  }, { immediate: true });
}

export function confirmProfile(suggested, chosen, note) {
  const previous = student().activeProfile;

  update((state) => {
    const s = state.student;
    s.activeProfile = chosen;
    s.suggestedProfile = suggested;
    s.confirmedAt = new Date().toISOString();
    s.onboardingStatus = 'completed';

    state.profileConfirmations.push({
      id: newId('conf'),
      suggestedProfile: suggested,
      chosenProfile: chosen,
      matchedSuggestion: suggested === chosen,
      note: note || null,
      decidedAt: new Date().toISOString(),
    });

    state.profileHistory.push({
      id: newId('snap'),
      previousProfile: previous,
      nextProfile: chosen,
      trigger: 'confirmation',
      reason:
        suggested === chosen
          ? `Você confirmou o perfil sugerido: ${getProfile(chosen).name}.`
          : `Você escolheu ${getProfile(chosen).name} no lugar da nossa sugestão (${getProfile(suggested).name}). Sua escolha vale mais que a classificação automática.`,
      createdAt: new Date().toISOString(),
    });
  }, { immediate: true });

  rebuildPlan();
}

export function changeProfile(chosen, note) {
  const previous = student().activeProfile;
  if (previous === chosen) return;

  update((state) => {
    const s = state.student;
    s.activeProfile = chosen;
    s.confirmedAt = new Date().toISOString();
    s.provisional = false;

    state.profileConfirmations.push({
      id: newId('conf'),
      suggestedProfile: s.suggestedProfile ?? chosen,
      chosenProfile: chosen,
      matchedSuggestion: s.suggestedProfile === chosen,
      note: note || null,
      decidedAt: new Date().toISOString(),
    });

    state.profileHistory.push({
      id: newId('snap'),
      previousProfile: previous,
      nextProfile: chosen,
      trigger: 'manual',
      reason: `Você mudou seu perfil de ${getProfile(previous).name} para ${getProfile(chosen).name}. Sua escolha tem prioridade sobre a classificação automática.`,
      createdAt: new Date().toISOString(),
    });
  }, { immediate: true });

  rebuildPlan();
}

export function updateAvailability({ daysPerWeek, sessionMinutes, examDate }) {
  update((state) => {
    const s = state.student;
    s.daysPerWeek = clamp(Number(daysPerWeek) || 3, 1, 7);
    s.sessionMinutes = clamp(Number(sessionMinutes) || 20, 5, 180);
    s.examDate = examDate || null;
    s.answers.daysPerWeek = String(s.daysPerWeek);
    s.answers.sessionMinutes = String(s.sessionMinutes);
  }, { immediate: true });

  rebuildPlan();
}

export function updatePreferences(partial) {
  update((state) => {
    Object.assign(state.preferences, partial);
  }, { immediate: true });
  applyPreferences();
}

export function applyPreferences() {
  applyPreferencesTo(preferences());
}

export function masteryFor(topicSlug) {
  return (
    getState().mastery[topicSlug] ?? {
      state: 'not_started',
      score: 0,
      distinctQuestions: 0,
      distinctSessions: 0,
      correctCount: 0,
      attemptCount: 0,
      lastPracticedAt: null,
      viewedContent: false,
    }
  );
}

export function markTopicViewed(topicSlug) {
  update((state) => {
    const current = state.mastery[topicSlug] ?? {
      state: 'not_started', score: 0, distinctQuestions: 0, distinctSessions: 0,
      correctCount: 0, attemptCount: 0, lastPracticedAt: null, viewedContent: false,
    };
    if (current.viewedContent) return;
    current.viewedContent = true;
    if (current.attemptCount === 0) {
      current.state = 'explored';
      current.score = 10;
    }
    state.mastery[topicSlug] = current;
  });
}

export function refreshMastery(topicSlug) {
  const state = getState();
  const attempts = Object.values(state.attempts).filter((attempt) => {
    const question = getQuestion(attempt.questionSlug);
    return question?.topicSlug === topicSlug;
  });

  const distinctQuestions = new Set(attempts.map((a) => a.questionSlug)).size;
  const distinctSessions = new Set(attempts.map((a) => a.sessionId).filter(Boolean)).size;
  const twoWeeksAgo = Date.now() - 14 * 86400000;

  const input = {
    attemptCount: attempts.length,
    correctCount: attempts.filter((a) => a.isCorrect).length,
    distinctQuestions,
    distinctSessions,
    recentErrors: attempts.filter(
      (a) => !a.isCorrect && new Date(a.answeredAt).getTime() >= twoWeeksAgo,
    ).length,
    lowConfidenceAttempts: attempts.filter(
      (a) => a.confidence === 'unsure' || a.confidence === 'guess',
    ).length,
    daysSinceLastPractice: 0,
    viewedContent: true,
  };

  update((s) => {
    s.mastery[topicSlug] = {
      state: computeMasteryState(input),
      score: computeMasteryScore(input),
      distinctQuestions,
      distinctSessions,
      correctCount: input.correctCount,
      attemptCount: input.attemptCount,
      lastPracticedAt: new Date().toISOString(),
      viewedContent: true,
    };
  });
}

export function collectSignals() {
  const state = getState();
  const now = Date.now();
  const twoWeeksAgo = now - 14 * 86400000;

  const errorsByTopic = new Map();
  for (const attempt of Object.values(state.attempts)) {
    const question = getQuestion(attempt.questionSlug);
    if (!question) continue;
    if (new Date(attempt.answeredAt).getTime() < twoWeeksAgo) continue;

    const bucket = errorsByTopic.get(question.topicSlug) ?? {
      recent: 0, sessions: new Set(), lowConfidence: 0,
    };
    if (!attempt.isCorrect) {
      bucket.recent += 1;
      if (attempt.sessionId) bucket.sessions.add(attempt.sessionId);
    }
    if (attempt.confidence === 'unsure' || attempt.confidence === 'guess') {
      bucket.lowConfidence += 1;
    }
    errorsByTopic.set(question.topicSlug, bucket);
  }

  const dueByTopic = new Map();
  for (const item of Object.values(state.review)) {
    if (item.status !== 'pending') continue;
    if (new Date(item.dueAt).getTime() > now) continue;
    dueByTopic.set(item.topicSlug, (dueByTopic.get(item.topicSlug) ?? 0) + 1);
  }

  const selfAssessment = state.student.answers.selfAssessment ?? {};
  const priorityAreas = new Set(
    Object.entries(selfAssessment)
      .filter(([, value]) => value === 'insecure')
      .map(([slug]) => slug),
  );

  return TOPICS.map((topic) => {
    const mastery = masteryFor(topic.slug);
    const errors = errorsByTopic.get(topic.slug);

    return {
      topicId: topic.slug,
      topicName: topic.name,

      subjectName: getSubject(topic.subjectSlug)?.name ?? topic.subjectSlug,
      areaId: topic.areaSlug,
      areaName: getArea(topic.areaSlug)?.name ?? topic.areaSlug,
      difficulty: topic.difficulty,
      curationWeight: topic.curationWeight,
      masteryState: mastery.state,
      recentErrors: errors?.recent ?? 0,
      repeatedErrors: (errors?.sessions.size ?? 0) > 1 ? errors.sessions.size : 0,
      lowConfidenceAttempts: errors?.lowConfidence ?? 0,
      attemptCount: mastery.attemptCount,
      daysSinceLastPractice: mastery.lastPracticedAt ? daysBetween(mastery.lastPracticedAt) : null,
      availableQuestions: questionsForTopic(topic.slug, { excludeRecovery: true }).length,
      studentPriority: priorityAreas.has(topic.areaSlug),
      dueReviews: dueByTopic.get(topic.slug) ?? 0,
    };
  });
}

export function recommendationContext() {
  const state = getState();
  const personalization = activeProfile().personalization;
  const cutoff = Date.now() - 48 * 3600000;

  const recentAreaIds = [];
  const recentTopicIds = [];

  const sessions = Object.values(state.sessions)
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
    .slice(0, 6);

  for (const session of sessions) {
    for (const slug of session.questionSlugs ?? []) {
      const question = getQuestion(slug);
      if (!question) continue;
      recentAreaIds.push(question.areaSlug);
      if (new Date(session.startedAt).getTime() >= cutoff) recentTopicIds.push(question.topicSlug);
    }
  }

  return {
    daysToExam: state.student.examDate
      ? Math.max(0, -daysBetween(new Date(), new Date(state.student.examDate)))
      : null,
    recentAreaIds,
    recentTopicIds,
    subjectsPerWeek: personalization.subjectsPerWeek,
  };
}

export function mainRecommendation() {
  const signals = collectSignals();
  const { selection } = recommendTopics(signals, recommendationContext(), 4);
  const best = selection[0];
  if (!best) return null;

  const signal = signals.find((item) => item.topicId === best.topicId);
  const topic = getTopic(best.topicId);
  if (!signal || !topic) return null;

  const personalization = activeProfile().personalization;

  const minutes = Math.min(personalization.baseMinutes, student().sessionMinutes);
  const questionCount = clamp(
    Math.round((minutes / personalization.baseMinutes) * personalization.questionsPerSession),
    2,
    signal.availableQuestions,
  );

  const dueCount = pendingReviews().length;

  return {
    topicSlug: topic.slug,
    topicName: topic.name,
    areaSlug: topic.areaSlug,
    reason: best.reason,
    minutes,
    questionCount,
    kind: dueCount > 0 && signal.dueReviews > 0 ? 'review' : 'practice',
  };
}

export function alternativeRecommendations(limit = 3) {
  const signals = collectSignals();
  const { selection } = recommendTopics(signals, recommendationContext(), limit + 1);
  return selection.slice(1, limit + 1).flatMap((item) => {
    const topic = getTopic(item.topicId);
    return topic ? [{ topicSlug: topic.slug, topicName: topic.name, areaSlug: topic.areaSlug, reason: item.reason }] : [];
  });
}

export function pendingReviews() {
  const now = Date.now();
  return Object.values(getState().review)
    .filter((item) => item.status === 'pending' && new Date(item.dueAt).getTime() <= now)
    .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
}

export function upcomingReviewCount() {
  const now = Date.now();
  return Object.values(getState().review).filter(
    (item) => item.status === 'pending' && new Date(item.dueAt).getTime() > now,
  ).length;
}

export function scheduleReview(questionSlug, reason) {
  const question = getQuestion(questionSlug);
  if (!question) return;

  const id = `rev_${questionSlug}`;
  const next = nextReviewState({ interval: 1, ease: 250, repetitions: 0 }, { recall: 'forgot', wasCorrect: false });

  update((state) => {
    const existing = state.review[id];
    state.review[id] = {
      id,
      questionSlug,
      topicSlug: question.topicSlug,
      kind: 'question',
      dueAt: nextDueDate(next).toISOString(),
      interval: next.interval,
      ease: existing?.ease ?? next.ease,
      repetitions: existing?.repetitions ?? 0,
      lastRecall: 'forgot',
      lastReviewedAt: new Date().toISOString(),
      status: 'pending',
      reason: reason ?? `Você errou uma questão de ${question.topicName}.`,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };
  });
}

export function registerRecall(reviewId, recall, wasCorrect) {
  update((state) => {
    const item = state.review[reviewId];
    if (!item) return;

    const next = nextReviewState(
      { interval: item.interval, ease: item.ease, repetitions: item.repetitions },
      { recall, wasCorrect },
    );

    item.interval = next.interval;
    item.ease = next.ease;
    item.repetitions = next.repetitions;
    item.dueAt = nextDueDate(next).toISOString();
    item.lastRecall = recall;
    item.lastReviewedAt = new Date().toISOString();
  }, { immediate: true });
}

export function errorNotes(status = 'open') {
  return Object.values(getState().notes)
    .filter((note) => (status === 'open' ? note.status !== 'resolved' : note.status === 'resolved'))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addErrorNote({ questionSlug, reason, nextAction = 'similar_question', source = 'manual' }) {
  const question = getQuestion(questionSlug);
  if (!question) return null;

  const existing = Object.values(getState().notes).find(
    (note) => note.questionSlug === questionSlug && note.status !== 'resolved',
  );

  if (existing) {
    update((state) => {
      state.notes[existing.id].nextAction = nextAction;
      if (reason) state.notes[existing.id].reason = reason;
    });
    return existing.id;
  }

  const id = newId('note');
  update((state) => {
    state.notes[id] = {
      id,
      questionSlug,
      topicSlug: question.topicSlug,
      concept: question.topicName,
      reason: reason ?? null,
      note: null,
      status: 'open',
      source,
      nextAction,
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };
  });
  return id;
}

export function updateErrorNote(id, patch) {
  update((state) => {
    if (state.notes[id]) Object.assign(state.notes[id], patch);
  }, { immediate: true });
}

export function toggleErrorNoteResolved(id) {
  update((state) => {
    const note = state.notes[id];
    if (!note) return;
    const resolving = note.status !== 'resolved';
    note.status = resolving ? 'resolved' : 'open';
    note.resolvedAt = resolving ? new Date().toISOString() : null;
  }, { immediate: true });
}

export function currentPlan() {
  const plan = getState().plan;
  const weekStart = startOfWeek().toISOString();
  if (!plan || plan.weekStart !== weekStart) return null;
  return plan;
}

export function rebuildPlan() {
  const personalization = activeProfile().personalization;
  const s = student();
  const days = clamp(s.daysPerWeek, 1, 7);
  const minutes = Math.min(personalization.baseMinutes, s.sessionMinutes);
  const weekStart = startOfWeek().toISOString();

  const main = mainRecommendation();
  const alternatives = alternativeRecommendations(3);
  const candidates = [
    ...(main ? [{ topicSlug: main.topicSlug, topicName: main.topicName, reason: main.reason }] : []),
    ...alternatives,
  ];

  update((state) => {
    const existing = state.plan?.weekStart === weekStart ? state.plan : null;
    const done = (existing?.blocks ?? []).filter((block) => block.status === 'done');
    const usedDays = new Set(done.map((block) => block.dayOfWeek));
    const kinds = ['practice', 'review', 'learn'];
    const blocks = [...done];

    let created = done.length;
    for (let day = 0; day < 7 && created < days; day += 1) {
      if (usedDays.has(day)) continue;
      const candidate = candidates[created % Math.max(1, candidates.length)];
      const kind = kinds[created % kinds.length];

      blocks.push({
        id: newId('block'),
        topicSlug: candidate?.topicSlug ?? null,
        dayOfWeek: day,
        kind,
        title:
          kind === 'review'
            ? 'Revisar seus erros'
            : kind === 'learn'
              ? `Entender ${candidate?.topicName ?? 'um novo tópico'}`
              : `Praticar ${candidate?.topicName ?? 'o que está pendente'}`,
        minutes,
        status: 'planned',
        reason: candidate?.reason ?? 'Bloco derivado da sua disponibilidade.',
      });
      created += 1;
    }

    blocks.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
    state.plan = { weekStart, minutesTarget: days * minutes, blocks };
  }, { immediate: true });

  return currentPlan();
}

export function markPlanBlockDone(blockId) {
  update((state) => {
    const block = state.plan?.blocks.find((item) => item.id === blockId);
    if (block) block.status = 'done';
  }, { immediate: true });
}

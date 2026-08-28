import { getState, update } from './store.js';
import { newId, clamp } from './format.js';
import { activeProfile, refreshMastery, scheduleReview, student, addErrorNote } from './student.js';
import { getQuestion, getTopic, questionsForTopic, QUESTIONS, getSimulation } from '../data/content.js';
import { generateSimulation } from '../engine/simulation.js';
import { buildReviewBatch } from '../engine/spaced.js';
import { analyzeEliminations } from '../engine/elimination.js';
import { getExamEnvironment } from '../data/exam-environments.js';

export function selectQuestions(topicSlug, count) {
  const state = getState();
  const fiveDaysAgo = Date.now() - 5 * 86400000;

  const recentlySeen = new Set(
    Object.values(state.attempts)
      .filter((attempt) => new Date(attempt.answeredAt).getTime() >= fiveDaysAgo)
      .map((attempt) => attempt.questionSlug),
  );

  const candidates = questionsForTopic(topicSlug).sort((a, b) => {
    if (a.isRecovery !== b.isRecovery) return a.isRecovery ? 1 : -1;
    const order = { intro: 0, intermediate: 1, challenging: 2 };
    if (order[a.difficulty] !== order[b.difficulty]) return order[a.difficulty] - order[b.difficulty];
    return a.slug.localeCompare(b.slug);
  });

  const fresh = candidates.filter((question) => !recentlySeen.has(question.slug));
  const pool = fresh.length >= count ? fresh : candidates;

  const perFormat = new Map();
  const picked = [];

  for (const question of pool) {
    if (picked.length >= count) break;
    const used = perFormat.get(question.cognitiveFormat) ?? 0;
    if (used >= 2 && pool.length > count) continue;
    perFormat.set(question.cognitiveFormat, used + 1);
    picked.push(question.slug);
  }

  for (const question of pool) {
    if (picked.length >= count) break;
    if (!picked.includes(question.slug)) picked.push(question.slug);
  }

  return picked;
}

export function selectReviewQuestions(topicSlug, originalSlugs, count) {
  const candidates = questionsForTopic(topicSlug).map((question) => ({
    id: question.slug,
    isRecovery: question.isRecovery,
  }));

  candidates.sort((a, b) => (a.isRecovery === b.isRecovery ? 0 : a.isRecovery ? -1 : 1));
  return buildReviewBatch(originalSlugs, candidates, count);
}

function idempotencyKey(parts) {
  return `${parts.join('|')}|${Math.floor(Date.now() / 60000)}`;
}

export function createSession({
  title,
  kind = 'practice',
  mode = 'learning',
  reason = null,
  topicSlug = null,
  questionSlugs = null,
  minutes = 20,
  timeLimitSeconds = null,
  simulationSlug = null,
  eliminationEnabled = getState().preferences.eliminationMode,
  examEnvironment = null,
  allowPause = true,
  showTimerOverride = null,
  confidencePromptOverride = null,
  perQuestionTargetSeconds = null,
  focusMode = false,
}) {
  const key = idempotencyKey([topicSlug ?? 'sem-topico', kind, simulationSlug ?? 'sem-simulado']);
  const existing = Object.values(getState().sessions).find(
    (session) => session.idempotencyKey === key && session.status !== 'completed',
  );
  if (existing) return existing;

  const slugs = questionSlugs ?? (topicSlug ? selectQuestions(topicSlug, 5) : []);
  if (slugs.length === 0) return null;

  const id = newId('sess');
  const now = new Date().toISOString();

  update((state) => {
    state.sessions[id] = {
      id,
      title,
      kind,
      mode,
      reason,
      topicSlug,
      simulationSlug,
      questionSlugs: slugs,
      status: 'in_progress',
      currentIndex: 0,
      plannedMinutes: minutes,
      timeLimitSeconds,
      eliminationEnabled: Boolean(eliminationEnabled),
      examEnvironment,
      allowPause,
      showTimerOverride,
      confidencePromptOverride,
      perQuestionTargetSeconds,
      focusMode,
      idempotencyKey: key,
      startedAt: now,
      lastActiveAt: now,
      completedAt: null,
      items: slugs.map((slug, order) => ({
        questionSlug: slug,
        order,
        flagged: false,
        note: null,
        eliminations: {},
        status: 'pending',
      })),
    };
  }, { immediate: true });

  return getState().sessions[id];
}

export function createTopicSession(topicSlug, kind = 'practice') {
  const topic = getTopic(topicSlug);
  if (!topic) return null;

  const personalization = activeProfile().personalization;
  const s = student();
  const minutes = Math.min(personalization.baseMinutes, s.sessionMinutes);
  const count = clamp(
    Math.round((minutes / personalization.baseMinutes) * personalization.questionsPerSession),
    2,
    20,
  );

  const prefs = getState().preferences;

  if (kind === 'review') {
    const failed = Object.values(getState().attempts)
      .filter((attempt) => {
        const question = getQuestion(attempt.questionSlug);
        return question?.topicSlug === topicSlug && !attempt.isCorrect;
      })
      .map((attempt) => attempt.questionSlug);

    const batch = selectReviewQuestions(topicSlug, [...new Set(failed)], count);
    return createSession({
      title: `Revisão — ${topic.name}`,
      kind: 'review',
      mode: prefs.correctionMode === 'exam' ? 'exam' : 'learning',
      reason: batch.hasFreshItem
        ? `Revisão de ${topic.name} com pelo menos uma questão diferente da original.`
        : `Revisão de ${topic.name}.`,
      topicSlug,
      questionSlugs: batch.questionIds,
      minutes,
    });
  }

  return createSession({
    title: `Prática — ${topic.name}`,
    kind,
    mode: prefs.correctionMode === 'exam' ? 'exam' : 'learning',
    reason: `Sessão de ${topic.name}, escolhida a partir do seu histórico e do seu perfil.`,
    topicSlug,
    minutes,
  });
}

export function createDiagnosticSession(perArea = 2) {
  const byArea = new Map();
  for (const question of QUESTIONS) {
    if (question.isRecovery) continue;
    if (question.difficulty === 'challenging') continue;
    const list = byArea.get(question.areaSlug) ?? [];
    if (list.length < perArea) {
      list.push(question.slug);
      byArea.set(question.areaSlug, list);
    }
  }

  const slugs = [...byArea.values()].flat();
  if (slugs.length === 0) return null;

  return createSession({
    title: 'Diagnóstico leve',
    kind: 'diagnostic',

    mode: 'exam',
    reason:
      'Questões distribuídas entre as quatro áreas para um primeiro mapa. Não é prova e você pode pular o que não souber.',
    questionSlugs: slugs,
    minutes: 20,
  });
}

export function createSimulationSession(simulationSlug, options = {}) {
  const simulation = getSimulation(simulationSlug);
  if (!simulation) return null;

  const normalized = typeof options === 'boolean'
    ? { environmentSlug: options ? 'padrao' : 'flexivel' }
    : options;
  const environment = getExamEnvironment(normalized.environmentSlug);
  const eliminationEnabled = normalized.eliminationEnabled ?? environment.eliminationDefault;
  const seconds = environment.timeFactor == null
    ? null
    : Math.max(60, Math.round(simulation.minutes * 60 * environment.timeFactor));

  const existing = Object.values(getState().simulationRuns).find(
    (run) => run.simulationSlug === simulationSlug && !run.submittedAt,
  );
  if (existing) return getState().sessions[existing.sessionId] ?? null;

  const pool = QUESTIONS.filter(
    (question) => !simulation.areaSlug || question.areaSlug === simulation.areaSlug,
  ).map((question) => ({
    id: question.slug,
    areaSlug: question.areaSlug,
    topicSlug: question.topicSlug,
    difficulty: question.difficulty,
    isRecovery: question.isRecovery,
  }));

  const tentativa = Object.values(getState().simulationRuns ?? {}).filter(
    (run) => run.simulationSlug === simulationSlug,
  ).length;
  const semente = `${simulation.slug}#${tentativa}#${Date.now().toString(36)}#${Math.random().toString(36).slice(2, 10)}`;
  const result = generateSimulation(pool, simulation.blueprint, simulation.questionCount, semente);
  if (result.questionIds.length === 0) return null;

  const session = createSession({
    title: simulation.title,
    kind: 'simulate',
    mode: 'exam',
    reason: simulation.description,
    questionSlugs: result.questionIds,
    minutes: simulation.minutes,
    timeLimitSeconds: seconds,
    simulationSlug,
    eliminationEnabled,
    examEnvironment: environment.slug,
    allowPause: environment.allowPause,
    showTimerOverride: environment.showTimer,
    confidencePromptOverride: environment.confidencePrompt,
    perQuestionTargetSeconds: environment.pacePerQuestion
      ? Math.max(30, Math.round(seconds / result.questionIds.length))
      : null,
    focusMode: environment.focusMode,
  });
  if (!session) return null;

  update((state) => {
    const runId = newId('run');
    state.simulationRuns[runId] = {
      id: runId,
      simulationSlug,
      sessionId: session.id,
      timed: seconds != null,
      environmentSlug: environment.slug,
      eliminationEnabled,
      totalItems: result.questionIds.length,
      score: 0,
      submittedAt: null,
      analysis: null,

      fallbackNote: result.fallbackNote,
      shortfall: result.shortfall,
      createdAt: new Date().toISOString(),
    };
  }, { immediate: true });

  return session;
}

export function getSession(id) {
  return getState().sessions[id] ?? null;
}

export function resumableSession() {
  return Object.values(getState().sessions)
    .filter((session) => session.status === 'in_progress' || session.status === 'paused')
    .sort((a, b) => new Date(b.lastActiveAt) - new Date(a.lastActiveAt))[0] ?? null;
}

export function attemptFor(sessionId, questionSlug) {
  return Object.values(getState().attempts).find(
    (attempt) => attempt.sessionId === sessionId && attempt.questionSlug === questionSlug,
  ) ?? null;
}

export function setElimination(sessionId, questionSlug, optionLabel, certainty = null) {
  if (![null, 'maybe', 'sure'].includes(certainty)) return null;

  update((state) => {
    const item = state.sessions[sessionId]?.items.find((entry) => entry.questionSlug === questionSlug);
    if (!item) return;
    item.eliminations ??= {};
    if (certainty) item.eliminations[optionLabel] = certainty;
    else delete item.eliminations[optionLabel];
    const attempt = Object.values(state.attempts).find(
      (entry) => entry.sessionId === sessionId && entry.questionSlug === questionSlug,
    );
    if (attempt) attempt.eliminations = { ...item.eliminations };
    state.sessions[sessionId].lastActiveAt = new Date().toISOString();
  }, { immediate: true });

  return getState().sessions[sessionId]?.items.find((entry) => entry.questionSlug === questionSlug)?.eliminations ?? {};
}

export function runForSession(sessionId) {
  return Object.values(getState().simulationRuns).find((run) => run.sessionId === sessionId) ?? null;
}

export function answerQuestion({ sessionId, questionSlug, optionLabel, confidence, timeSpentMs }) {
  const question = getQuestion(questionSlug);
  if (!question) return null;

  const option = question.options.find((item) => item.label === optionLabel);
  if (!option) return null;

  const existing = attemptFor(sessionId, questionSlug);
  const id = existing?.id ?? newId('att');
  const sessionItem = getState().sessions[sessionId]?.items.find((entry) => entry.questionSlug === questionSlug);

  update((state) => {
    const previous = state.attempts[id];
    state.attempts[id] = {
      id,
      sessionId,
      questionSlug,

      firstAnswer: previous?.firstAnswer ?? optionLabel,
      answer: optionLabel,
      changedAnswer: previous ? previous.firstAnswer !== optionLabel : false,
      isCorrect: Boolean(option.isCorrect),
      confidence: confidence ?? previous?.confidence ?? null,
      eliminations: { ...(sessionItem?.eliminations ?? previous?.eliminations ?? {}) },
      timeSpentMs: (previous?.timeSpentMs ?? 0) + (timeSpentMs ?? 0),
      errorReason: previous?.errorReason ?? null,
      answeredAt: new Date().toISOString(),
    };

    const session = state.sessions[sessionId];
    if (session) {
      const item = session.items.find((entry) => entry.questionSlug === questionSlug);
      if (item) item.status = 'answered';
      session.lastActiveAt = new Date().toISOString();
    }
  }, { immediate: true });

  refreshMastery(question.topicSlug);
  return getState().attempts[id];
}

export function classifyError(attemptId, reason) {
  const attempt = getState().attempts[attemptId];
  if (!attempt) return;

  update((state) => {
    state.attempts[attemptId].errorReason = reason;
  });

  const nextAction =
    reason === 'unknown_content'
      ? 'review_concept'
      : reason === 'interpretation'
        ? 'self_explain'
        : 'similar_question';

  addErrorNote({ questionSlug: attempt.questionSlug, reason, nextAction, source: 'suggested' });
  scheduleReview(attempt.questionSlug);
}

export function setSessionIndex(sessionId, index) {
  update((state) => {
    const session = state.sessions[sessionId];
    if (!session) return;
    session.currentIndex = clamp(index, 0, Math.max(0, session.items.length - 1));
    session.lastActiveAt = new Date().toISOString();
  });
}

export function toggleFlag(sessionId, questionSlug) {
  update((state) => {
    const item = state.sessions[sessionId]?.items.find((entry) => entry.questionSlug === questionSlug);
    if (item) item.flagged = !item.flagged;
  }, { immediate: true });
}

export function saveItemNote(sessionId, questionSlug, note) {
  update((state) => {
    const item = state.sessions[sessionId]?.items.find((entry) => entry.questionSlug === questionSlug);
    if (item) item.note = note || null;
  }, { immediate: true });
}

export function pauseSession(sessionId) {
  update((state) => {
    const session = state.sessions[sessionId];
    if (session && session.status === 'in_progress') {
      session.status = 'paused';
      session.lastActiveAt = new Date().toISOString();
    }
  }, { immediate: true });
}

export function completeSession(sessionId) {
  update((state) => {
    const session = state.sessions[sessionId];
    if (session && session.status !== 'completed') {
      session.status = 'completed';
      session.completedAt = new Date().toISOString();
    }
  }, { immediate: true });

  const session = getSession(sessionId);
  if (session?.topicSlug) {
    update((state) => {
      const block = state.plan?.blocks.find(
        (item) => item.topicSlug === session.topicSlug && item.status === 'planned',
      );
      if (block) block.status = 'done';
    });
  }
}

export function summarizeSession(sessionId) {
  const session = getSession(sessionId);
  if (!session) return null;

  const byTopic = new Map();
  const reasons = new Map();

  let answered = 0;
  let correct = 0;
  let changedAnswer = 0;
  let correctWithConfidence = 0;
  let correctWithDoubt = 0;
  let correctAfterChange = 0;
  let totalTimeMs = 0;
  const eliminationRecords = [];
  const times = [];

  for (const item of session.items) {
    const question = getQuestion(item.questionSlug);
    if (!question) continue;

    const bucket = byTopic.get(question.topicName) ?? { correct: 0, total: 0 };
    bucket.total += 1;

    const attempt = attemptFor(sessionId, item.questionSlug);
    if (attempt) {
      answered += 1;
      totalTimeMs += attempt.timeSpentMs;
      times.push(attempt.timeSpentMs);
      if (attempt.changedAnswer) changedAnswer += 1;

      if (attempt.isCorrect) {
        correct += 1;
        bucket.correct += 1;

        if (attempt.changedAnswer) correctAfterChange += 1;
        else if (attempt.confidence === 'sure') correctWithConfidence += 1;
        else correctWithDoubt += 1;
      } else if (attempt.errorReason) {
        reasons.set(attempt.errorReason, (reasons.get(attempt.errorReason) ?? 0) + 1);
      }

      eliminationRecords.push({ options: question.options, eliminations: attempt.eliminations });
    }

    byTopic.set(question.topicName, bucket);
  }

  const sorted = [...times].sort((a, b) => a - b);

  return {
    answered,
    correct,
    wrong: answered - correct,
    total: session.items.length,
    flagged: session.items.filter((item) => item.flagged).length,
    changedAnswer,
    correctWithConfidence,
    correctWithDoubt,
    correctAfterChange,
    totalTimeMs,
    medianTimeMs: sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0,
    slowestMs: sorted.at(-1) ?? 0,
    elimination: analyzeEliminations(eliminationRecords),
    topics: [...byTopic.entries()].map(([name, value]) => ({ name, ...value })),
    errorReasons: [...reasons.entries()]
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count),
  };
}

export function submitSimulation(sessionId) {
  const run = runForSession(sessionId);
  const session = getSession(sessionId);
  if (!run || !session) return null;

  if (run.submittedAt) return run;

  const byArea = {};
  const byTopic = {};
  const bySkill = {};
  let score = 0;

  for (const item of session.items) {
    const question = getQuestion(item.questionSlug);
    if (!question) continue;

    const attempt = attemptFor(sessionId, item.questionSlug);
    const correct = attempt?.isCorrect ?? false;
    const skill = question.skillName ?? 'Não classificada';

    for (const [map, key] of [[byArea, question.areaName], [byTopic, question.topicName], [bySkill, skill]]) {
      map[key] ??= { correct: 0, total: 0 };
      map[key].total += 1;
      if (correct) map[key].correct += 1;
    }
    if (correct) score += 1;
  }

  const summary = summarizeSession(sessionId);

  update((state) => {
    state.simulationRuns[run.id].submittedAt = new Date().toISOString();
    state.simulationRuns[run.id].score = score;
    state.simulationRuns[run.id].analysis = {
      byArea,
      byTopic,
      bySkill,
      time: {
        totalMs: summary.totalTimeMs,
        medianMs: summary.medianTimeMs,
        slowestMs: summary.slowestMs,
        answered: summary.answered,
      },
      errorReasons: summary.errorReasons,
      elimination: summary.elimination,
    };
  }, { immediate: true });

  completeSession(sessionId);
  return getState().simulationRuns[run.id];
}

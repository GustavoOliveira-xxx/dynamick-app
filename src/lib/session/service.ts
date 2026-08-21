import { createHash } from 'node:crypto';
import { prisma } from '@/lib/db';
import { parseList, parseRecord } from '@/lib/util/json';
import { clamp } from '@/lib/util/format';
import { getProfile } from '@/lib/profile/profiles';
import {
  recommendTopics,
  type RecommendationContext,
  type ScoredTopic,
  type TopicSignals,
} from '@/lib/recommendation/engine';
import { computeMasteryScore, computeMasteryState } from '@/lib/review/mastery';
import type { Difficulty, MasteryState, SessionKind, SessionMode } from '@/lib/domain';

/**
 * Serviço de sessões de estudo: seleção de itens, criação idempotente, registro de
 * tentativas e encerramento.
 */

const RECENT_TOPIC_WINDOW_HOURS = 48;

/** Reúne, para cada tópico publicado, os sinais que o motor de recomendação consome. */
export async function collectTopicSignals(userId: string): Promise<TopicSignals[]> {
  const [topics, mastery, recentAttempts, dueReviews, profile] = await Promise.all([
    prisma.topic.findMany({
      where: { status: 'published' },
      include: {
        area: true,
        subject: true,
        _count: { select: { questions: { where: { status: 'published' } } } },
      },
    }),
    prisma.topicMastery.findMany({ where: { userId } }),
    prisma.attempt.findMany({
      where: { userId, createdAt: { gte: new Date(Date.now() - 14 * 86_400_000) } },
      include: { question: { select: { topicId: true } }, errorClassification: true },
    }),
    prisma.reviewItem.findMany({
      where: { userId, status: 'pending', dueAt: { lte: new Date() } },
      select: { topicId: true },
    }),
    prisma.studyProfile.findUnique({ where: { userId } }),
  ]);

  const masteryByTopic = new Map(mastery.map((item) => [item.topicId, item]));
  const dueByTopic = new Map<string, number>();
  for (const review of dueReviews) {
    if (!review.topicId) continue;
    dueByTopic.set(review.topicId, (dueByTopic.get(review.topicId) ?? 0) + 1);
  }

  const errorsByTopic = new Map<string, { recent: number; sessions: Set<string>; lowConfidence: number }>();
  for (const attempt of recentAttempts) {
    const topicId = attempt.question.topicId;
    const bucket = errorsByTopic.get(topicId) ?? { recent: 0, sessions: new Set<string>(), lowConfidence: 0 };
    if (!attempt.isCorrect) {
      bucket.recent += 1;
      if (attempt.sessionId) bucket.sessions.add(attempt.sessionId);
    }
    if (attempt.confidence === 'unsure' || attempt.confidence === 'guess') bucket.lowConfidence += 1;
    errorsByTopic.set(topicId, bucket);
  }

  // Áreas marcadas como inseguras na autopercepção do onboarding contam como prioridade.
  const selfAssessment = parseRecord(profile?.selfAssessment);
  const priorityAreas = new Set(
    Object.entries(selfAssessment)
      .filter(([, value]) => value === 'insecure')
      .map(([slug]) => slug),
  );

  return topics.map((topic) => {
    const state = masteryByTopic.get(topic.id);
    const errors = errorsByTopic.get(topic.id);
    const lastPracticed = state?.lastPracticedAt ?? null;

    return {
      topicId: topic.id,
      topicName: topic.name,
      subjectName: topic.subject.name,
      areaId: topic.areaId,
      areaName: topic.area.shortName,
      difficulty: topic.difficulty as Difficulty,
      curationWeight: topic.curationWeight,
      masteryState: (state?.state ?? 'not_started') as MasteryState,
      recentErrors: errors?.recent ?? 0,
      repeatedErrors: (errors?.sessions.size ?? 0) > 1 ? errors!.sessions.size : 0,
      lowConfidenceAttempts: errors?.lowConfidence ?? 0,
      attemptCount: state?.attemptCount ?? 0,
      daysSinceLastPractice: lastPracticed
        ? Math.floor((Date.now() - lastPracticed.getTime()) / 86_400_000)
        : null,
      availableQuestions: topic._count.questions,
      studentPriority: priorityAreas.has(topic.area.slug),
      dueReviews: dueByTopic.get(topic.id) ?? 0,
    };
  });
}

export async function buildRecommendationContext(userId: string): Promise<RecommendationContext> {
  const [profile, recentSessions] = await Promise.all([
    prisma.studyProfile.findUnique({ where: { userId } }),
    prisma.studySession.findMany({
      where: { userId, startedAt: { gte: new Date(Date.now() - 7 * 86_400_000) } },
      orderBy: { startedAt: 'desc' },
      take: 6,
      include: { items: { include: { question: { select: { areaId: true, topicId: true } } } } },
    }),
  ]);

  const recentAreaIds: string[] = [];
  const recentTopicIds: string[] = [];
  const cutoff = Date.now() - RECENT_TOPIC_WINDOW_HOURS * 3_600_000;

  for (const session of recentSessions) {
    for (const item of session.items) {
      recentAreaIds.push(item.question.areaId);
      if (session.startedAt.getTime() >= cutoff) recentTopicIds.push(item.question.topicId);
    }
  }

  const personalization = getProfile(profile?.activeProfile).personalization;

  return {
    daysToExam: profile?.examDate
      ? Math.max(0, Math.floor((profile.examDate.getTime() - Date.now()) / 86_400_000))
      : null,
    recentAreaIds,
    recentTopicIds,
    subjectsPerWeek: personalization.subjectsPerWeek,
  };
}

export type Recommendation = {
  topicId: string;
  topicName: string;
  subjectName: string;
  areaName: string;
  reason: string;
  minutes: number;
  questionCount: number;
  kind: SessionKind;
};

/** A recomendação principal do dashboard: uma só, sempre com justificativa legível. */
export async function getMainRecommendation(userId: string): Promise<Recommendation | null> {
  const [signals, context, profile, dueCount] = await Promise.all([
    collectTopicSignals(userId),
    buildRecommendationContext(userId),
    prisma.studyProfile.findUnique({ where: { userId } }),
    prisma.reviewItem.count({ where: { userId, status: 'pending', dueAt: { lte: new Date() } } }),
  ]);

  const { selection } = recommendTopics(signals, context, 4);
  const best = selection[0];
  if (!best) return null;

  const signal = signals.find((item) => item.topicId === best.topicId);
  if (!signal) return null;

  const personalization = getProfile(profile?.activeProfile).personalization;
  // O tempo informado no onboarding é limite real, não meta (§ etapa C).
  const minutes = Math.min(personalization.baseMinutes, profile?.sessionMinutes ?? 20);
  const questionCount = clamp(
    Math.round((minutes / personalization.baseMinutes) * personalization.questionsPerSession),
    2,
    signal.availableQuestions,
  );

  return {
    topicId: best.topicId,
    topicName: signal.topicName,
    subjectName: signal.subjectName,
    areaName: signal.areaName,
    reason: best.reason,
    minutes,
    questionCount,
    kind: dueCount > 0 && signal.dueReviews > 0 ? 'review' : 'practice',
  };
}

export async function getAlternativeRecommendations(
  userId: string,
  limit = 3,
): Promise<{ topicId: string; topicName: string; areaName: string; reason: string }[]> {
  const [signals, context] = await Promise.all([
    collectTopicSignals(userId),
    buildRecommendationContext(userId),
  ]);
  const { selection } = recommendTopics(signals, context, limit + 1);
  const byTopic = new Map(signals.map((signal) => [signal.topicId, signal]));

  return selection.slice(1, limit + 1).flatMap((item: ScoredTopic) => {
    const signal = byTopic.get(item.topicId);
    if (!signal) return [];
    return [{ topicId: item.topicId, topicName: signal.topicName, areaName: signal.areaName, reason: item.reason }];
  });
}

/**
 * Chave de idempotência: recarregar o navegador não cria uma segunda sessão idêntica
 * (§20.2 "sessão de estudo duplicada ao atualizar o navegador").
 */
export function sessionIdempotencyKey(userId: string, parts: string[]): string {
  const minuteBucket = Math.floor(Date.now() / 60_000);
  return createHash('sha256').update([userId, ...parts, String(minuteBucket)].join('|')).digest('hex');
}

export type CreateSessionInput = {
  userId: string;
  topicId?: string;
  kind: SessionKind;
  mode: SessionMode;
  title: string;
  reason?: string;
  minutes: number;
  questionCount: number;
  simulationId?: string;
  /** IDs específicos; quando ausente, o serviço seleciona a partir do tópico. */
  questionIds?: string[];
  timeLimitSeconds?: number;
};

export async function createSession(input: CreateSessionInput) {
  const idempotencyKey = sessionIdempotencyKey(input.userId, [
    input.topicId ?? 'sem-topico',
    input.kind,
    input.simulationId ?? 'sem-simulado',
  ]);

  const existing = await prisma.studySession.findUnique({ where: { idempotencyKey } });
  if (existing) return existing;

  const questionIds = input.questionIds ?? (await selectQuestions(input));
  if (questionIds.length === 0) return null;

  return prisma.studySession.create({
    data: {
      userId: input.userId,
      title: input.title,
      kind: input.kind,
      mode: input.mode,
      reason: input.reason,
      plannedMinutes: input.minutes,
      plannedItems: questionIds.length,
      simulationId: input.simulationId,
      timeLimitSeconds: input.timeLimitSeconds,
      idempotencyKey,
      items: {
        create: questionIds.map((questionId, order) => ({ questionId, order })),
      },
    },
  });
}

/**
 * Seleção de questões para uma sessão de prática.
 * Evita repetir em curto intervalo (§7 regra 7) e busca variedade de formato cognitivo.
 */
async function selectQuestions(input: CreateSessionInput): Promise<string[]> {
  if (!input.topicId) return [];

  const recentlySeen = await prisma.attempt.findMany({
    where: {
      userId: input.userId,
      createdAt: { gte: new Date(Date.now() - 5 * 86_400_000) },
    },
    select: { questionId: true },
  });
  const recentIds = new Set(recentlySeen.map((item) => item.questionId));

  const candidates = await prisma.question.findMany({
    where: { topicId: input.topicId, status: 'published' },
    orderBy: [{ isRecovery: 'asc' }, { difficulty: 'asc' }, { slug: 'asc' }],
  });

  const fresh = candidates.filter((question) => !recentIds.has(question.id));
  const pool = fresh.length >= input.questionCount ? fresh : candidates;

  // Variedade de formato cognitivo: no máximo dois do mesmo tipo por sessão.
  const perFormat = new Map<string, number>();
  const picked: string[] = [];

  for (const question of pool) {
    if (picked.length >= input.questionCount) break;
    const count = perFormat.get(question.cognitiveFormat) ?? 0;
    if (count >= 2 && pool.length > input.questionCount) continue;
    perFormat.set(question.cognitiveFormat, count + 1);
    picked.push(question.id);
  }

  // Se os limites deixaram a sessão curta, completa com o que sobrou.
  for (const question of pool) {
    if (picked.length >= input.questionCount) break;
    if (!picked.includes(question.id)) picked.push(question.id);
  }

  return picked;
}

/** Recalcula o domínio do tópico após uma tentativa. */
export async function refreshTopicMastery(userId: string, topicId: string) {
  const attempts = await prisma.attempt.findMany({
    where: { userId, question: { topicId } },
    select: {
      isCorrect: true,
      confidence: true,
      questionId: true,
      sessionId: true,
      createdAt: true,
    },
  });

  const distinctQuestions = new Set(attempts.map((attempt) => attempt.questionId)).size;
  const distinctSessions = new Set(attempts.map((attempt) => attempt.sessionId).filter(Boolean)).size;
  const twoWeeksAgo = Date.now() - 14 * 86_400_000;

  const input = {
    attemptCount: attempts.length,
    correctCount: attempts.filter((attempt) => attempt.isCorrect).length,
    distinctQuestions,
    distinctSessions,
    recentErrors: attempts.filter(
      (attempt) => !attempt.isCorrect && attempt.createdAt.getTime() >= twoWeeksAgo,
    ).length,
    lowConfidenceAttempts: attempts.filter(
      (attempt) => attempt.confidence === 'unsure' || attempt.confidence === 'guess',
    ).length,
    daysSinceLastPractice: 0,
    viewedContent: true,
  };

  const lastCorrect = attempts.filter((attempt) => attempt.isCorrect).at(-1);

  await prisma.topicMastery.upsert({
    where: { userId_topicId: { userId, topicId } },
    create: {
      userId,
      topicId,
      state: computeMasteryState(input),
      score: computeMasteryScore(input),
      distinctQuestions,
      distinctSessions,
      correctCount: input.correctCount,
      attemptCount: input.attemptCount,
      lastPracticedAt: new Date(),
      lastCorrectAt: lastCorrect ? new Date() : null,
    },
    update: {
      state: computeMasteryState(input),
      score: computeMasteryScore(input),
      distinctQuestions,
      distinctSessions,
      correctCount: input.correctCount,
      attemptCount: input.attemptCount,
      lastPracticedAt: new Date(),
      ...(lastCorrect ? { lastCorrectAt: new Date() } : {}),
    },
  });
}

export type SessionSummary = {
  answered: number;
  correct: number;
  wrong: number;
  flagged: number;
  changedAnswer: number;
  correctWithConfidence: number;
  correctWithDoubt: number;
  correctAfterChange: number;
  totalTimeMs: number;
  topics: { name: string; correct: number; total: number }[];
  errorReasons: { reason: string; count: number }[];
};

export async function summarizeSession(sessionId: string): Promise<SessionSummary> {
  const items = await prisma.sessionItem.findMany({
    where: { sessionId },
    include: {
      question: { include: { topic: { select: { name: true } } } },
      attempt: { include: { errorClassification: true } },
    },
    orderBy: { order: 'asc' },
  });

  const byTopic = new Map<string, { correct: number; total: number }>();
  const reasons = new Map<string, number>();

  let answered = 0;
  let correct = 0;
  let changedAnswer = 0;
  let correctWithConfidence = 0;
  let correctWithDoubt = 0;
  let correctAfterChange = 0;
  let totalTimeMs = 0;

  for (const item of items) {
    const topicName = item.question.topic.name;
    const bucket = byTopic.get(topicName) ?? { correct: 0, total: 0 };
    bucket.total += 1;

    if (item.attempt) {
      answered += 1;
      totalTimeMs += item.attempt.timeSpentMs;
      if (item.attempt.changedAnswer) changedAnswer += 1;

      if (item.attempt.isCorrect) {
        correct += 1;
        bucket.correct += 1;
        // Diferencia acerto com confiança, com dúvida e após troca de alternativa.
        if (item.attempt.changedAnswer) correctAfterChange += 1;
        else if (item.attempt.confidence === 'sure') correctWithConfidence += 1;
        else correctWithDoubt += 1;
      } else if (item.attempt.errorClassification) {
        const reason = item.attempt.errorClassification.reason;
        reasons.set(reason, (reasons.get(reason) ?? 0) + 1);
      }
    }

    byTopic.set(topicName, bucket);
  }

  return {
    answered,
    correct,
    wrong: answered - correct,
    flagged: items.filter((item) => item.flagged).length,
    changedAnswer,
    correctWithConfidence,
    correctWithDoubt,
    correctAfterChange,
    totalTimeMs,
    topics: [...byTopic.entries()].map(([name, value]) => ({ name, ...value })),
    errorReasons: [...reasons.entries()]
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count),
  };
}

/** Retomada: a sessão interrompida mais recente, se houver (§ etapa 12). */
export async function getResumableSession(userId: string) {
  return prisma.studySession.findFirst({
    where: { userId, status: { in: ['in_progress', 'paused'] } },
    orderBy: { lastActiveAt: 'desc' },
    include: {
      items: { select: { id: true, status: true } },
      simulation: { select: { title: true } },
    },
  });
}

export function parseTopicList(raw: string | null | undefined): string[] {
  return parseList(raw);
}

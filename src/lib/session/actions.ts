'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth/current-user';
import { getProfile } from '@/lib/profile/profiles';
import { clamp } from '@/lib/util/format';
import {
  CONFIDENCE_ANSWERS,
  ERROR_REASONS,
  NEXT_ACTIONS,
  RECALL_LEVELS,
  SESSION_KINDS,
  type SessionKind,
} from '@/lib/domain';
import { createSession, refreshTopicMastery } from './service';
import { nextDueDate, nextReviewState, reconcileRecall } from '@/lib/review/spaced';

/**
 * Ações da sessão de estudo.
 * Toda ação valida no servidor e confere que o recurso pertence ao usuário —
 * manipular o ID na URL não dá acesso a nada (§20.5).
 */

async function requireOwnedSession(sessionId: string, userId: string) {
  const session = await prisma.studySession.findFirst({
    where: { id: sessionId, userId },
  });
  if (!session) redirect('/inicio');
  return session;
}

export async function startTopicSessionAction(topicId: string, kindRaw: string): Promise<void> {
  const user = await requireUser();
  const kind = (SESSION_KINDS as readonly string[]).includes(kindRaw)
    ? (kindRaw as SessionKind)
    : 'practice';

  const topic = await prisma.topic.findFirst({ where: { id: topicId, status: 'published' } });
  if (!topic) redirect('/conteudos');

  const [profile, personalizationRow] = await Promise.all([
    prisma.studyProfile.findUnique({ where: { userId: user.id } }),
    prisma.personalizationPreference.findUnique({ where: { userId: user.id } }),
  ]);

  const personalization = getProfile(profile?.activeProfile).personalization;
  const minutes = Math.min(personalization.baseMinutes, profile?.sessionMinutes ?? 20);
  const questionCount = clamp(
    Math.round((minutes / personalization.baseMinutes) * personalization.questionsPerSession),
    2,
    20,
  );

  const session = await createSession({
    userId: user.id,
    topicId: topic.id,
    kind,
    mode: personalizationRow?.correctionMode === 'exam' ? 'exam' : 'learning',
    title: `${kind === 'review' ? 'Revisão' : 'Prática'} — ${topic.name}`,
    reason: `Sessão de ${topic.name}, escolhida a partir do seu histórico e do seu perfil.`,
    minutes,
    questionCount,
  });

  if (!session) redirect(`/conteudos/${topic.slug}?erro=sem-questoes`);
  redirect(`/sessao/${session.id}`);
}

export async function startQuickSessionAction(): Promise<void> {
  const user = await requireUser();
  const { getMainRecommendation } = await import('./service');
  const recommendation = await getMainRecommendation(user.id);
  if (!recommendation) redirect('/conteudos');

  const session = await createSession({
    userId: user.id,
    topicId: recommendation.topicId,
    kind: 'practice',
    mode: 'learning',
    title: `Sessão rápida — ${recommendation.topicName}`,
    reason: 'Você pediu uma sessão curta. Escolhemos duas questões do que mais importa agora.',
    minutes: 10,
    questionCount: 2,
  });

  if (!session) redirect('/conteudos');
  redirect(`/sessao/${session.id}`);
}

const answerSchema = z.object({
  sessionId: z.string().min(1),
  itemId: z.string().min(1),
  optionId: z.string().min(1),
  confidence: z.enum(CONFIDENCE_ANSWERS).optional(),
  timeSpentMs: z.coerce.number().int().min(0).max(3_600_000).catch(0),
});

export type AnswerResult = { error?: string };

/**
 * Registra a resposta.
 * A primeira resposta e a resposta final ficam separadas (§ etapa 7): trocar de
 * alternativa é dado pedagógico, não ruído.
 */
export async function answerQuestionAction(
  _prev: AnswerResult,
  formData: FormData,
): Promise<AnswerResult> {
  const user = await requireUser();
  const parsed = answerSchema.safeParse({
    sessionId: formData.get('sessionId'),
    itemId: formData.get('itemId'),
    optionId: formData.get('optionId'),
    confidence: formData.get('confidence') || undefined,
    timeSpentMs: formData.get('timeSpentMs'),
  });

  if (!parsed.success) return { error: 'Escolha uma alternativa para continuar.' };

  const session = await requireOwnedSession(parsed.data.sessionId, user.id);
  if (session.status === 'completed') return { error: 'Esta sessão já foi encerrada.' };

  const item = await prisma.sessionItem.findFirst({
    where: { id: parsed.data.itemId, sessionId: session.id },
    include: { question: { select: { id: true, topicId: true } }, attempt: true },
  });
  if (!item) return { error: 'Questão não encontrada nesta sessão.' };

  const option = await prisma.answerOption.findFirst({
    where: { id: parsed.data.optionId, questionId: item.questionId },
  });
  if (!option) return { error: 'Essa alternativa não pertence a esta questão.' };

  const isFirstAnswer = !item.attempt;
  const changedAnswer = !isFirstAnswer && item.attempt?.firstAnswerId !== option.id;

  await prisma.attempt.upsert({
    where: { sessionItemId: item.id },
    create: {
      userId: user.id,
      sessionId: session.id,
      sessionItemId: item.id,
      questionId: item.questionId,
      firstAnswerId: option.id,
      answerId: option.id,
      isCorrect: option.isCorrect,
      confidence: parsed.data.confidence,
      timeSpentMs: parsed.data.timeSpentMs,
      answeredAt: new Date(),
    },
    update: {
      // firstAnswerId NUNCA é sobrescrito: ele guarda o primeiro impulso.
      answerId: option.id,
      isCorrect: option.isCorrect,
      changedAnswer,
      confidence: parsed.data.confidence ?? undefined,
      timeSpentMs: { increment: parsed.data.timeSpentMs },
      answeredAt: new Date(),
    },
  });

  await prisma.sessionItem.update({ where: { id: item.id }, data: { status: 'answered' } });
  await prisma.studySession.update({
    where: { id: session.id },
    data: { lastActiveAt: new Date() },
  });
  await refreshTopicMastery(user.id, item.question.topicId);

  revalidatePath(`/sessao/${session.id}`);
  return {};
}

const navigateSchema = z.object({
  sessionId: z.string().min(1),
  index: z.coerce.number().int().min(0).max(200),
});

export async function navigateSessionAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const parsed = navigateSchema.safeParse({
    sessionId: formData.get('sessionId'),
    index: formData.get('index'),
  });
  if (!parsed.success) return;

  const session = await requireOwnedSession(parsed.data.sessionId, user.id);
  const total = await prisma.sessionItem.count({ where: { sessionId: session.id } });

  await prisma.studySession.update({
    where: { id: session.id },
    data: {
      currentIndex: clamp(parsed.data.index, 0, Math.max(0, total - 1)),
      lastActiveAt: new Date(),
    },
  });
  revalidatePath(`/sessao/${session.id}`);
}

export async function toggleFlagAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const itemId = String(formData.get('itemId') ?? '');
  const item = await prisma.sessionItem.findFirst({
    where: { id: itemId, session: { userId: user.id } },
  });
  if (!item) return;

  await prisma.sessionItem.update({
    where: { id: item.id },
    data: { flagged: !item.flagged },
  });
  revalidatePath(`/sessao/${item.sessionId}`);
}

export async function saveItemNoteAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const itemId = String(formData.get('itemId') ?? '');
  const note = String(formData.get('note') ?? '').slice(0, 1000);

  const item = await prisma.sessionItem.findFirst({
    where: { id: itemId, session: { userId: user.id } },
  });
  if (!item) return;

  await prisma.sessionItem.update({ where: { id: item.id }, data: { note: note || null } });
  revalidatePath(`/sessao/${item.sessionId}`);
}

const errorReasonSchema = z.object({
  attemptId: z.string().min(1),
  reason: z.enum(ERROR_REASONS),
  note: z.string().max(1000).optional(),
});

/** "O que dificultou esta questão?" — gera ação, não apenas estatística (§7 regra 10). */
export async function classifyErrorAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const parsed = errorReasonSchema.safeParse({
    attemptId: formData.get('attemptId'),
    reason: formData.get('reason'),
    note: formData.get('note') || undefined,
  });
  if (!parsed.success) return;

  const attempt = await prisma.attempt.findFirst({
    where: { id: parsed.data.attemptId, userId: user.id },
    include: { question: { select: { id: true, topicId: true, topic: { select: { name: true } } } } },
  });
  if (!attempt) return;

  await prisma.errorClassification.upsert({
    where: { attemptId: attempt.id },
    create: {
      attemptId: attempt.id,
      reason: parsed.data.reason,
      source: 'declared',
      note: parsed.data.note,
    },
    update: { reason: parsed.data.reason, note: parsed.data.note },
  });

  // Todo erro classificado vira um item acionável no caderno de erros.
  const existing = await prisma.errorNote.findFirst({
    where: { userId: user.id, questionId: attempt.questionId, status: 'open' },
  });

  if (!existing) {
    await prisma.errorNote.create({
      data: {
        userId: user.id,
        questionId: attempt.questionId,
        topicId: attempt.question.topicId,
        reason: parsed.data.reason,
        concept: attempt.question.topic.name,
        status: 'open',
        source: 'suggested',
        nextAction:
          parsed.data.reason === 'unknown_content'
            ? 'review_concept'
            : parsed.data.reason === 'interpretation'
              ? 'self_explain'
              : 'similar_question',
      },
    });
  }

  // Agenda a revisão espaçada do item errado.
  const reviewState = nextReviewState(
    { interval: 1, ease: 250, repetitions: 0 },
    { recall: 'forgot', wasCorrect: false },
  );

  await prisma.reviewItem.upsert({
    where: { id: `${user.id}-${attempt.questionId}` },
    create: {
      id: `${user.id}-${attempt.questionId}`,
      userId: user.id,
      topicId: attempt.question.topicId,
      questionId: attempt.questionId,
      kind: 'question',
      dueAt: nextDueDate(reviewState),
      interval: reviewState.interval,
      ease: reviewState.ease,
      repetitions: reviewState.repetitions,
      lastRecall: 'forgot',
      status: 'pending',
      reason: `Você errou uma questão de ${attempt.question.topic.name} e indicou o motivo.`,
    },
    update: { status: 'pending', dueAt: nextDueDate(reviewState) },
  });

  if (attempt.sessionId) revalidatePath(`/sessao/${attempt.sessionId}`);
}

export async function saveToErrorNotebookAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const questionId = String(formData.get('questionId') ?? '');
  const nextActionRaw = String(formData.get('nextAction') ?? 'similar_question');
  const nextAction = (NEXT_ACTIONS as readonly string[]).includes(nextActionRaw)
    ? nextActionRaw
    : 'similar_question';

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { topic: { select: { id: true, name: true } } },
  });
  if (!question) return;

  const existing = await prisma.errorNote.findFirst({
    where: { userId: user.id, questionId, status: { not: 'resolved' } },
  });

  if (existing) {
    await prisma.errorNote.update({ where: { id: existing.id }, data: { nextAction } });
  } else {
    await prisma.errorNote.create({
      data: {
        userId: user.id,
        questionId,
        topicId: question.topic.id,
        concept: question.topic.name,
        status: 'open',
        source: 'manual',
        nextAction,
      },
    });
  }

  revalidatePath('/revisar/caderno');
}

export async function completeSessionAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const sessionId = String(formData.get('sessionId') ?? '');
  const session = await requireOwnedSession(sessionId, user.id);

  if (session.status !== 'completed') {
    await prisma.studySession.update({
      where: { id: session.id },
      data: { status: 'completed', completedAt: new Date(), lastActiveAt: new Date() },
    });
  }

  revalidatePath('/inicio');
  redirect(`/sessao/${session.id}/resultado`);
}

/** Abandonar não perde o estado: a sessão fica pausada e retomável (§ etapa 7). */
export async function pauseSessionAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const sessionId = String(formData.get('sessionId') ?? '');
  const session = await requireOwnedSession(sessionId, user.id);

  if (session.status === 'in_progress') {
    await prisma.studySession.update({
      where: { id: session.id },
      data: { status: 'paused', lastActiveAt: new Date() },
    });
  }
  revalidatePath('/inicio');
  redirect('/inicio');
}

const recallSchema = z.object({
  reviewItemId: z.string().min(1),
  recall: z.enum(RECALL_LEVELS),
  wasCorrect: z.enum(['true', 'false']).optional(),
});

/** Revisão espaçada: combina a declaração do estudante com o resultado observado. */
export async function registerRecallAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const parsed = recallSchema.safeParse({
    reviewItemId: formData.get('reviewItemId'),
    recall: formData.get('recall'),
    wasCorrect: formData.get('wasCorrect') || undefined,
  });
  if (!parsed.success) return;

  const item = await prisma.reviewItem.findFirst({
    where: { id: parsed.data.reviewItemId, userId: user.id },
  });
  if (!item) return;

  const outcome = {
    recall: parsed.data.recall,
    wasCorrect: parsed.data.wasCorrect ? parsed.data.wasCorrect === 'true' : undefined,
  };
  const reconciled = reconcileRecall(outcome);
  const next = nextReviewState(
    { interval: item.interval, ease: item.ease, repetitions: item.repetitions },
    outcome,
  );

  await prisma.reviewItem.update({
    where: { id: item.id },
    data: {
      interval: next.interval,
      ease: next.ease,
      repetitions: next.repetitions,
      dueAt: nextDueDate(next),
      lastRecall: reconciled,
      lastReviewedAt: new Date(),
      status: 'pending',
    },
  });

  revalidatePath('/revisar');
}

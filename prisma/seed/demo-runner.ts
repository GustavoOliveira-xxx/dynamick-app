import type { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { DEMO_USERS, type DemoUser } from './demo-users';
import type { SeedTopic } from './types';
import { classifyProfile } from '../../src/lib/profile/engine';
import { getProfile } from '../../src/lib/profile/profiles';
import { computeMasteryScore, computeMasteryState } from '../../src/lib/review/mastery';
import { nextDueDate, nextReviewState } from '../../src/lib/review/spaced';
import { QUESTIONNAIRE_VERSION, ONBOARDING_STEPS } from '../../src/lib/onboarding/questionnaire';
import { startOfWeek } from '../../src/lib/util/format';

/**
 * Usuários de demonstração com histórico completo: tentativas, erros classificados,
 * fila de revisão e plano semanal (§11.9).
 *
 * Idempotente: identificado pelo e-mail; o histórico é reconstruído do zero a cada
 * execução para nunca duplicar tentativas.
 */

const DEMO_PASSWORD = process.env.SEED_DEMO_PASSWORD || 'demo1234';

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 86_400_000);
}

export async function seedDemoUsers(prisma: PrismaClient, topics: SeedTopic[]) {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));

  for (const demo of DEMO_USERS) {
    await seedOneDemoUser(prisma, demo, passwordHash, topicBySlug);
  }

  process.stdout.write(
    `  ${'usuários demo'.padEnd(22)} ${DEMO_USERS.length} registrados (senha: ${DEMO_PASSWORD})\n`,
  );
}

async function seedOneDemoUser(
  prisma: PrismaClient,
  demo: DemoUser,
  passwordHash: string,
  topicBySlug: Map<string, SeedTopic>,
) {
  const user = await prisma.user.upsert({
    where: { email: demo.email },
    create: {
      email: demo.email,
      name: demo.name,
      passwordHash,
      role: demo.role ?? 'student',
      isDemo: true,
      emailVerified: true,
      personalization: { create: {} },
      notificationPreference: { create: {} },
      studyProfile: { create: {} },
    },
    update: { name: demo.name, role: demo.role ?? 'student', passwordHash, isDemo: true },
  });

  // Reconstrói o histórico do zero: garante idempotência sem duplicar tentativas.
  await prisma.attempt.deleteMany({ where: { userId: user.id } });
  await prisma.studySession.deleteMany({ where: { userId: user.id } });
  await prisma.reviewItem.deleteMany({ where: { userId: user.id } });
  await prisma.errorNote.deleteMany({ where: { userId: user.id } });
  await prisma.topicMastery.deleteMany({ where: { userId: user.id } });
  await prisma.studyPlan.deleteMany({ where: { userId: user.id } });
  await prisma.onboardingResponse.deleteMany({ where: { userId: user.id } });
  await prisma.profileConfirmation.deleteMany({ where: { userId: user.id } });
  await prisma.profileSnapshot.deleteMany({ where: { userId: user.id } });

  const profile = await prisma.studyProfile.upsert({
    where: { userId: user.id },
    create: { userId: user.id },
    update: {},
  });

  // ---- Onboarding ----
  if (demo.skipOnboarding) {
    await prisma.studyProfile.update({
      where: { userId: user.id },
      data: {
        onboardingStatus: 'skipped',
        suggestedProfile: 'explorador-sem-rota',
        activeProfile: 'explorador-sem-rota',
        confidence: 'low',
        provisional: true,
        diagnosticStatus: 'pending',
      },
    });
  } else {
    for (const [questionId, value] of Object.entries(demo.answers)) {
      const step = ONBOARDING_STEPS.find((item) =>
        item.questions.some((question) => question.id === questionId),
      );
      await prisma.onboardingResponse.create({
        data: {
          userId: user.id,
          step: step?.slug ?? 'contexto',
          questionId,
          value: JSON.stringify(value),
          version: QUESTIONNAIRE_VERSION,
        },
      });
    }

    const result = classifyProfile(demo.answers);
    const chosen = demo.confirmChoice ?? result.suggested;
    const answeredStepSlugs = result.answeredSteps;

    await prisma.studyProfile.update({
      where: { userId: user.id },
      data: {
        onboardingStatus: 'completed',
        completedSteps: JSON.stringify(answeredStepSlugs),
        suggestedProfile: result.suggested,
        activeProfile: chosen,
        confidence: result.confidence,
        provisional: result.provisional,
        confirmedAt: daysAgo(14),
        schoolYear: typeof demo.answers.schoolYear === 'string' ? demo.answers.schoolYear : null,
        primaryGoal: typeof demo.answers.primaryGoal === 'string' ? demo.answers.primaryGoal : null,
        horizon: typeof demo.answers.horizon === 'string' ? demo.answers.horizon : null,
        daysPerWeek: Number(demo.answers.daysPerWeek ?? 3),
        sessionMinutes: Number(demo.answers.sessionMinutes ?? 20),
        routineStability:
          typeof demo.answers.routineStability === 'string' ? demo.answers.routineStability : null,
        goals: JSON.stringify(demo.answers.goals ?? []),
        preferredTimes: JSON.stringify(demo.answers.preferredTimes ?? []),
        studyPreferences: JSON.stringify(demo.answers.studyPreferences ?? []),
        frictions: JSON.stringify(demo.answers.frictions ?? []),
        selfAssessment: JSON.stringify(demo.answers.selfAssessment ?? {}),
        diagnosticStatus: result.suggestsDiagnostic ? 'pending' : 'skipped',
      },
    });

    for (const [key, value] of Object.entries(result.dimensions)) {
      await prisma.studyProfileDimension.upsert({
        where: { profileId_key_source: { profileId: profile.id, key, source: 'declared' } },
        create: { profileId: profile.id, key, value, source: 'declared' },
        update: { value },
      });
    }

    await prisma.profileConfirmation.create({
      data: {
        userId: user.id,
        suggestedProfile: result.suggested,
        chosenProfile: chosen,
        matchedSuggestion: result.suggested === chosen,
        questionnaireVersion: QUESTIONNAIRE_VERSION,
        decidedAt: daysAgo(14),
      },
    });

    await prisma.profileSnapshot.create({
      data: {
        userId: user.id,
        nextProfile: chosen,
        trigger: 'confirmation',
        reason: `Você confirmou o perfil sugerido: ${getProfile(chosen).name}.`,
        acknowledgedAt: daysAgo(14),
        createdAt: daysAgo(14),
      },
    });
  }

  // ---- Histórico de estudo ----
  if (!demo.history?.length) return;

  for (const entry of demo.history) {
    const seedTopic = topicBySlug.get(entry.topicSlug);
    if (!seedTopic) continue;

    const topicRow = await prisma.topic.findUnique({ where: { slug: entry.topicSlug } });
    if (!topicRow) continue;

    const questionSlugs = seedTopic.questions
      .filter((question) => !question.isRecovery)
      .slice(0, entry.answered)
      .map((question) => question.slug);

    const questions = await prisma.question.findMany({
      where: { slug: { in: questionSlugs } },
      include: { options: true },
    });

    let remainingCorrect = entry.correct;
    let distinctSessions = 0;
    let recentErrors = 0;
    let lowConfidence = 0;
    let correctCount = 0;

    // Distribui as questões entre o número de sessões informado.
    const perSession = Math.max(1, Math.ceil(questions.length / Math.max(1, entry.sessions)));

    for (let sessionIndex = 0; sessionIndex < entry.sessions; sessionIndex += 1) {
      const slice = questions.slice(sessionIndex * perSession, (sessionIndex + 1) * perSession);
      if (slice.length === 0) continue;
      distinctSessions += 1;

      const startedAt = daysAgo(entry.daysAgo + (entry.sessions - sessionIndex - 1) * 3);

      const session = await prisma.studySession.create({
        data: {
          userId: user.id,
          title: `Prática — ${seedTopic.name}`,
          kind: 'practice',
          mode: 'learning',
          status: 'completed',
          reason: `Sessão de prática em ${seedTopic.name}.`,
          plannedMinutes: 20,
          plannedItems: slice.length,
          startedAt,
          lastActiveAt: startedAt,
          completedAt: startedAt,
          currentIndex: slice.length,
        },
      });

      for (const [index, question] of slice.entries()) {
        const correctOption = question.options.find((option) => option.isCorrect);
        const wrongOption = question.options.find((option) => !option.isCorrect);
        const gotItRight = remainingCorrect > 0;
        if (gotItRight) remainingCorrect -= 1;

        const chosenOption = gotItRight ? correctOption : wrongOption;
        if (!chosenOption) continue;

        const sessionItem = await prisma.sessionItem.create({
          data: {
            sessionId: session.id,
            questionId: question.id,
            order: index,
            status: 'answered',
            selectionReason: `Questão de ${seedTopic.name}.`,
          },
        });

        const attempt = await prisma.attempt.create({
          data: {
            userId: user.id,
            sessionId: session.id,
            sessionItemId: sessionItem.id,
            questionId: question.id,
            firstAnswerId: chosenOption.id,
            answerId: chosenOption.id,
            isCorrect: gotItRight,
            confidence: entry.confidence ?? 'unsure',
            timeSpentMs: (question.estimatedSeconds + 15) * 1000,
            answeredAt: startedAt,
            createdAt: startedAt,
          },
        });

        if (gotItRight) correctCount += 1;

        if (!gotItRight) {
          if (entry.daysAgo <= 14) recentErrors += 1;

          await prisma.errorClassification.create({
            data: {
              attemptId: attempt.id,
              reason: entry.errorReason ?? 'other',
              source: 'declared',
              createdAt: startedAt,
            },
          });

          await prisma.errorNote.create({
            data: {
              userId: user.id,
              questionId: question.id,
              topicId: topicRow.id,
              reason: entry.errorReason ?? 'other',
              concept: seedTopic.name,
              status: 'open',
              source: 'suggested',
              nextAction: 'similar_question',
              createdAt: startedAt,
            },
          });

          const reviewState = nextReviewState(
            { interval: 1, ease: 250, repetitions: 0 },
            { recall: 'forgot', wasCorrect: false },
          );

          await prisma.reviewItem.upsert({
            where: { id: `${user.id}-${question.id}` },
            create: {
              id: `${user.id}-${question.id}`,
              userId: user.id,
              topicId: topicRow.id,
              questionId: question.id,
              kind: 'question',
              dueAt: nextDueDate(reviewState, startedAt),
              interval: reviewState.interval,
              ease: reviewState.ease,
              repetitions: reviewState.repetitions,
              lastRecall: 'forgot',
              lastReviewedAt: startedAt,
              status: 'pending',
              reason: `Você errou esta questão de ${seedTopic.name}.`,
              createdAt: startedAt,
            },
            update: {},
          });
        }

        if (entry.confidence === 'unsure' || entry.confidence === 'guess') lowConfidence += 1;
      }
    }

    const masteryInput = {
      attemptCount: questions.length,
      correctCount,
      distinctQuestions: questions.length,
      distinctSessions,
      recentErrors,
      lowConfidenceAttempts: lowConfidence,
      daysSinceLastPractice: entry.daysAgo,
      viewedContent: true,
    };

    await prisma.topicMastery.upsert({
      where: { userId_topicId: { userId: user.id, topicId: topicRow.id } },
      create: {
        userId: user.id,
        topicId: topicRow.id,
        state: computeMasteryState(masteryInput),
        score: computeMasteryScore(masteryInput),
        distinctQuestions: questions.length,
        distinctSessions,
        correctCount,
        attemptCount: questions.length,
        lastPracticedAt: daysAgo(entry.daysAgo),
        lastCorrectAt: correctCount > 0 ? daysAgo(entry.daysAgo) : null,
      },
      update: {
        state: computeMasteryState(masteryInput),
        score: computeMasteryScore(masteryInput),
        distinctQuestions: questions.length,
        distinctSessions,
        correctCount,
        attemptCount: questions.length,
        lastPracticedAt: daysAgo(entry.daysAgo),
      },
    });
  }

  // ---- Plano semanal ----
  const activeProfile = await prisma.studyProfile.findUnique({ where: { userId: user.id } });
  const personalization = getProfile(activeProfile?.activeProfile).personalization;
  const daysPerWeek = activeProfile?.daysPerWeek ?? 3;
  const weekStart = startOfWeek();

  const plan = await prisma.studyPlan.upsert({
    where: { userId_weekStart: { userId: user.id, weekStart } },
    create: {
      userId: user.id,
      weekStart,
      minutesTarget: daysPerWeek * personalization.baseMinutes,
      note: 'Plano gerado a partir do seu perfil e da sua disponibilidade.',
    },
    update: { minutesTarget: daysPerWeek * personalization.baseMinutes },
  });

  await prisma.studyPlanBlock.deleteMany({ where: { planId: plan.id } });

  const historyTopics = demo.history.map((entry) => entry.topicSlug);
  const kinds: ('learn' | 'practice' | 'review' | 'simulate')[] = ['learn', 'practice', 'review'];

  for (let day = 0; day < daysPerWeek; day += 1) {
    const topicSlug = historyTopics[day % historyTopics.length];
    const topicRow = topicSlug ? await prisma.topic.findUnique({ where: { slug: topicSlug } }) : null;
    const kind = kinds[day % kinds.length]!;

    await prisma.studyPlanBlock.create({
      data: {
        planId: plan.id,
        topicId: topicRow?.id ?? null,
        dayOfWeek: (day + 1) % 7,
        kind,
        title:
          kind === 'learn'
            ? `Entender ${topicRow?.name ?? 'um novo tópico'}`
            : kind === 'practice'
              ? `Praticar ${topicRow?.name ?? 'o que você viu'}`
              : 'Revisar seus erros',
        minutes: personalization.baseMinutes,
        status: 'planned',
        reason:
          kind === 'review'
            ? 'Você tem questões pendentes na fila de revisão.'
            : `Bloco derivado do seu perfil ${getProfile(activeProfile?.activeProfile).name}.`,
        order: day,
      },
    });
  }
}

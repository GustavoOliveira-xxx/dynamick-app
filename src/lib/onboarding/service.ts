import { prisma } from '@/lib/db';
import { parseList, parseRecord, stringify } from '@/lib/util/json';
import { classifyProfile, type AnswerMap, type AnswerValue } from '@/lib/profile/engine';
import { getProfile } from '@/lib/profile/profiles';
import { QUESTIONNAIRE_VERSION, findQuestion, ONBOARDING_STEPS } from './questionnaire';

/**
 * Persistência do onboarding.
 * Salvamento é parcial por questão, então sair no meio nunca perde nada (§7 regra 1).
 */

export async function loadAnswers(userId: string): Promise<AnswerMap> {
  const rows = await prisma.onboardingResponse.findMany({
    where: { userId, version: QUESTIONNAIRE_VERSION, skipped: false },
  });

  const answers: AnswerMap = {};
  for (const row of rows) {
    try {
      answers[row.questionId] = JSON.parse(row.value) as AnswerValue;
    } catch {
      // Um registro corrompido não pode derrubar o onboarding inteiro.
    }
  }
  return answers;
}

export async function saveAnswer(
  userId: string,
  step: string,
  questionId: string,
  value: AnswerValue,
): Promise<void> {
  if (!findQuestion(questionId)) return; // ignora id desconhecido em vez de gravar lixo

  await prisma.onboardingResponse.upsert({
    where: {
      userId_questionId_version: { userId, questionId, version: QUESTIONNAIRE_VERSION },
    },
    create: { userId, step, questionId, value: stringify(value), version: QUESTIONNAIRE_VERSION },
    update: { value: stringify(value), skipped: false, step },
  });
}

export async function markStepCompleted(userId: string, step: string): Promise<void> {
  const profile = await prisma.studyProfile.findUnique({ where: { userId } });
  if (!profile) return;

  const completed = new Set(parseList(profile.completedSteps));
  const skipped = new Set(parseList(profile.skippedSteps));
  completed.add(step);
  skipped.delete(step); // responder depois de pular deixa de contar como pulada

  await prisma.studyProfile.update({
    where: { userId },
    data: {
      completedSteps: stringify([...completed]),
      skippedSteps: stringify([...skipped]),
      onboardingStatus: profile.onboardingStatus === 'completed' ? 'completed' : 'in_progress',
      onboardingStep: step,
    },
  });
}

export async function markStepSkipped(userId: string, step: string): Promise<void> {
  const profile = await prisma.studyProfile.findUnique({ where: { userId } });
  if (!profile) return;

  const stepDefinition = ONBOARDING_STEPS.find((item) => item.slug === step);
  if (!stepDefinition || stepDefinition.required) return; // etapa obrigatória não é pulável

  const skipped = new Set(parseList(profile.skippedSteps));
  skipped.add(step);

  await prisma.studyProfile.update({
    where: { userId },
    data: {
      skippedSteps: stringify([...skipped]),
      onboardingStatus: profile.onboardingStatus === 'completed' ? 'completed' : 'in_progress',
      onboardingStep: step,
    },
  });
}

/** Espelha as respostas nos campos consultáveis do perfil e recalcula a sugestão. */
export async function syncProfileFromAnswers(userId: string) {
  const answers = await loadAnswers(userId);
  const result = classifyProfile(answers);

  const asString = (value: AnswerValue | undefined): string | null =>
    typeof value === 'string' ? value : typeof value === 'number' ? String(value) : null;
  const asList = (value: AnswerValue | undefined): string[] =>
    Array.isArray(value) ? value : typeof value === 'string' && value ? [value] : [];

  const minutes = Number(asString(answers.sessionMinutes) ?? '20');
  const days = Number(asString(answers.daysPerWeek) ?? '3');

  const profile = await prisma.studyProfile.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });

  await prisma.studyProfile.update({
    where: { userId },
    data: {
      suggestedProfile: result.suggested,
      // A escolha confirmada pelo usuário tem prioridade e não é sobrescrita (§ regra da §19).
      activeProfile: profile.confirmedAt ? profile.activeProfile : result.suggested,
      confidence: result.confidence,
      provisional: result.provisional,
      schoolYear: asString(answers.schoolYear),
      primaryGoal: asString(answers.primaryGoal),
      goals: stringify(asList(answers.goals)),
      horizon: asString(answers.horizon),
      daysPerWeek: Number.isFinite(days) ? Math.min(7, Math.max(1, days)) : 3,
      sessionMinutes: Number.isFinite(minutes) ? Math.min(180, Math.max(5, minutes)) : 20,
      preferredTimes: stringify(asList(answers.preferredTimes)),
      routineStability: asString(answers.routineStability),
      studyPreferences: stringify(asList(answers.studyPreferences)),
      frictions: stringify(asList(answers.frictions)),
      selfAssessment: stringify(
        answers.selfAssessment && typeof answers.selfAssessment === 'object'
          ? answers.selfAssessment
          : {},
      ),
      diagnosticStatus: result.suggestsDiagnostic ? 'pending' : profile.diagnosticStatus,
    },
  });

  // Dimensões declaradas ficam separadas das observadas (§7 regra 3).
  for (const [key, value] of Object.entries(result.dimensions)) {
    await prisma.studyProfileDimension.upsert({
      where: { profileId_key_source: { profileId: profile.id, key, source: 'declared' } },
      create: { profileId: profile.id, key, value, source: 'declared' },
      update: { value },
    });
  }

  return result;
}

/** Registra a decisão do estudante na tela de confirmação (§19). */
export async function confirmProfile(
  userId: string,
  suggested: string,
  chosen: string,
  note?: string,
): Promise<void> {
  const profile = await prisma.studyProfile.findUnique({ where: { userId } });
  if (!profile) return;

  const previous = profile.activeProfile;

  await prisma.$transaction([
    prisma.profileConfirmation.create({
      data: {
        userId,
        suggestedProfile: suggested,
        chosenProfile: chosen,
        matchedSuggestion: suggested === chosen,
        note: note?.slice(0, 500),
        questionnaireVersion: QUESTIONNAIRE_VERSION,
      },
    }),
    prisma.studyProfile.update({
      where: { userId },
      data: {
        activeProfile: chosen,
        suggestedProfile: suggested,
        confirmedAt: new Date(),
        onboardingStatus: 'completed',
      },
    }),
    prisma.profileSnapshot.create({
      data: {
        userId,
        previousProfile: previous,
        nextProfile: chosen,
        trigger: 'confirmation',
        reason:
          suggested === chosen
            ? `Você confirmou o perfil sugerido: ${getProfile(chosen).name}.`
            : `Você escolheu ${getProfile(chosen).name} no lugar da nossa sugestão (${getProfile(suggested).name}). Sua escolha vale mais que a classificação automática.`,
        acknowledgedAt: new Date(),
      },
    }),
  ]);
}

/** Pular o onboarding inteiro: perfil provisório guiado, sem bloquear nada (§4.3). */
export async function skipOnboarding(userId: string): Promise<void> {
  await prisma.studyProfile.upsert({
    where: { userId },
    create: {
      userId,
      onboardingStatus: 'skipped',
      suggestedProfile: 'explorador-sem-rota',
      activeProfile: 'explorador-sem-rota',
      confidence: 'low',
      provisional: true,
      diagnosticStatus: 'pending',
    },
    update: {
      onboardingStatus: 'skipped',
      suggestedProfile: 'explorador-sem-rota',
      activeProfile: 'explorador-sem-rota',
      confidence: 'low',
      provisional: true,
    },
  });
}

export type OnboardingProgress = {
  completed: string[];
  skipped: string[];
  status: string;
  answers: AnswerMap;
  selfAssessment: Record<string, string>;
};

export async function loadProgress(userId: string): Promise<OnboardingProgress> {
  const [profile, answers] = await Promise.all([
    prisma.studyProfile.findUnique({ where: { userId } }),
    loadAnswers(userId),
  ]);

  return {
    completed: parseList(profile?.completedSteps),
    skipped: parseList(profile?.skippedSteps),
    status: profile?.onboardingStatus ?? 'not_started',
    answers,
    selfAssessment: parseRecord(profile?.selfAssessment),
  };
}

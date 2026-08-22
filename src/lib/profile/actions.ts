'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth/current-user';
import { getProfile, isProfileSlug } from '@/lib/profile/profiles';
import { clamp, startOfWeek } from '@/lib/util/format';

export type ProfileActionState = { success?: string; error?: string };

const availabilitySchema = z.object({
  daysPerWeek: z.coerce.number().int().min(1).max(7),
  sessionMinutes: z.coerce.number().int().min(5).max(180),
  examDate: z.string().optional(),
});

/**
 * Alterar disponibilidade recalcula o plano imediatamente (§20.4:
 * "plano não sendo recalculado após alteração de disponibilidade").
 */
export async function updateAvailabilityAction(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await requireUser();
  const parsed = availabilitySchema.safeParse({
    daysPerWeek: formData.get('daysPerWeek'),
    sessionMinutes: formData.get('sessionMinutes'),
    examDate: formData.get('examDate') || undefined,
  });

  if (!parsed.success) {
    return { error: 'Informe de 1 a 7 dias e um tempo entre 5 e 180 minutos.' };
  }

  const examDate = parsed.data.examDate ? new Date(parsed.data.examDate) : null;

  await prisma.studyProfile.update({
    where: { userId: user.id },
    data: {
      daysPerWeek: parsed.data.daysPerWeek,
      sessionMinutes: parsed.data.sessionMinutes,
      examDate: examDate && !Number.isNaN(examDate.getTime()) ? examDate : null,
    },
  });

  await rebuildWeeklyPlan(user.id);

  revalidatePath('/perfil/estudo');
  revalidatePath('/inicio');
  revalidatePath('/praticar');
  return { success: 'Disponibilidade salva e plano da semana recalculado.' };
}

/** Reconstrói o plano da semana a partir do perfil e das recomendações atuais. */
export async function rebuildWeeklyPlan(userId: string): Promise<void> {
  const [profile, { getMainRecommendation, getAlternativeRecommendations }] = await Promise.all([
    prisma.studyProfile.findUnique({ where: { userId } }),
    import('@/lib/session/service'),
  ]);

  const personalization = getProfile(profile?.activeProfile).personalization;
  const daysPerWeek = clamp(profile?.daysPerWeek ?? 3, 1, 7);
  const minutes = Math.min(personalization.baseMinutes, profile?.sessionMinutes ?? 20);
  const weekStart = startOfWeek();

  const [main, alternatives] = await Promise.all([
    getMainRecommendation(userId),
    getAlternativeRecommendations(userId, 3),
  ]);

  const candidates = [
    ...(main ? [{ topicId: main.topicId, topicName: main.topicName, reason: main.reason }] : []),
    ...alternatives.map((item) => ({
      topicId: item.topicId,
      topicName: item.topicName,
      reason: item.reason,
    })),
  ];

  const plan = await prisma.studyPlan.upsert({
    where: { userId_weekStart: { userId, weekStart } },
    create: { userId, weekStart, minutesTarget: daysPerWeek * minutes },
    update: { minutesTarget: daysPerWeek * minutes },
  });

  // Preserva os blocos já concluídos: replanejar não apaga o que a pessoa fez.
  const done = await prisma.studyPlanBlock.findMany({
    where: { planId: plan.id, status: 'done' },
  });
  await prisma.studyPlanBlock.deleteMany({ where: { planId: plan.id, status: { not: 'done' } } });

  const usedDays = new Set(done.map((block) => block.dayOfWeek));
  const kinds: ('learn' | 'practice' | 'review')[] = ['practice', 'review', 'learn'];

  let created = done.length;
  for (let day = 0; day < 7 && created < daysPerWeek; day += 1) {
    if (usedDays.has(day)) continue;
    const candidate = candidates[created % Math.max(1, candidates.length)];
    const kind = kinds[created % kinds.length]!;

    await prisma.studyPlanBlock.create({
      data: {
        planId: plan.id,
        topicId: candidate?.topicId ?? null,
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
        order: created,
      },
    });
    created += 1;
  }
}

/** Trocar de perfil registra justificativa e preserva o histórico (§7 regra 4). */
export async function changeProfileAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const chosen = String(formData.get('chosenProfile') ?? '');
  const note = String(formData.get('note') ?? '').slice(0, 500);
  if (!isProfileSlug(chosen)) return;

  const profile = await prisma.studyProfile.findUnique({ where: { userId: user.id } });
  if (!profile || profile.activeProfile === chosen) return;

  const previous = profile.activeProfile;

  await prisma.$transaction([
    prisma.studyProfile.update({
      where: { userId: user.id },
      data: { activeProfile: chosen, confirmedAt: new Date(), provisional: false },
    }),
    prisma.profileConfirmation.create({
      data: {
        userId: user.id,
        suggestedProfile: profile.suggestedProfile ?? chosen,
        chosenProfile: chosen,
        matchedSuggestion: profile.suggestedProfile === chosen,
        note: note || undefined,
      },
    }),
    // Histórico preservado: nada do que existia é apagado.
    prisma.profileSnapshot.create({
      data: {
        userId: user.id,
        previousProfile: previous,
        nextProfile: chosen,
        trigger: 'manual',
        reason: `Você mudou seu perfil de ${getProfile(previous).name} para ${getProfile(chosen).name}. Sua escolha tem prioridade sobre a classificação automática.`,
        acknowledgedAt: new Date(),
      },
    }),
  ]);

  await rebuildWeeklyPlan(user.id);
  revalidatePath('/perfil/estudo');
  revalidatePath('/inicio');
}

const appearanceSchema = z.object({
  theme: z.enum(['dark', 'light']),
  textScale: z.enum(['100', '112', '125']),
  reducedMotion: z.enum(['auto', 'always']),
  highContrast: z.enum(['true', 'false']),
  visualIntensity: z.enum(['full', 'reduced']),
  correctionMode: z.enum(['learning', 'exam']),
  showTimer: z.enum(['true', 'false']),
  confidencePrompt: z.enum(['true', 'false']),
  hintsBeforeAnswer: z.enum(['true', 'false']),
});

export async function updateAppearanceAction(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await requireUser();
  const parsed = appearanceSchema.safeParse({
    theme: formData.get('theme') ?? 'dark',
    textScale: formData.get('textScale') ?? '100',
    reducedMotion: formData.get('reducedMotion') ?? 'auto',
    highContrast: formData.get('highContrast') ?? 'false',
    visualIntensity: formData.get('visualIntensity') ?? 'full',
    correctionMode: formData.get('correctionMode') ?? 'learning',
    showTimer: formData.get('showTimer') ?? 'true',
    confidencePrompt: formData.get('confidencePrompt') ?? 'true',
    hintsBeforeAnswer: formData.get('hintsBeforeAnswer') ?? 'false',
  });

  if (!parsed.success) return { error: 'Não conseguimos salvar essas preferências. Tente de novo.' };

  await prisma.personalizationPreference.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      theme: parsed.data.theme,
      textScale: parsed.data.textScale,
      reducedMotion: parsed.data.reducedMotion,
      highContrast: parsed.data.highContrast === 'true',
      visualIntensity: parsed.data.visualIntensity,
      correctionMode: parsed.data.correctionMode,
      showTimer: parsed.data.showTimer === 'true',
      confidencePrompt: parsed.data.confidencePrompt === 'true',
      hintsBeforeAnswer: parsed.data.hintsBeforeAnswer === 'true',
    },
    update: {
      theme: parsed.data.theme,
      textScale: parsed.data.textScale,
      reducedMotion: parsed.data.reducedMotion,
      highContrast: parsed.data.highContrast === 'true',
      visualIntensity: parsed.data.visualIntensity,
      correctionMode: parsed.data.correctionMode,
      showTimer: parsed.data.showTimer === 'true',
      confidencePrompt: parsed.data.confidencePrompt === 'true',
      hintsBeforeAnswer: parsed.data.hintsBeforeAnswer === 'true',
    },
  });

  revalidatePath('/', 'layout');
  return { success: 'Preferências salvas. Elas já valem em todas as telas.' };
}

const notificationSchema = z.object({
  enabled: z.enum(['true', 'false']),
  timeOfDay: z.string().optional(),
});

export async function updateNotificationsAction(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await requireUser();
  const parsed = notificationSchema.safeParse({
    enabled: formData.get('enabled') ?? 'false',
    timeOfDay: formData.get('timeOfDay') || undefined,
  });
  if (!parsed.success) return { error: 'Não conseguimos salvar essa preferência.' };

  const weekdays = formData.getAll('weekdays').map((value) => Number(value)).filter((value) => value >= 0 && value <= 6);

  await prisma.notificationPreference.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      enabled: parsed.data.enabled === 'true',
      timeOfDay: parsed.data.timeOfDay,
      weekdays: JSON.stringify(weekdays),
    },
    update: {
      enabled: parsed.data.enabled === 'true',
      timeOfDay: parsed.data.timeOfDay,
      weekdays: JSON.stringify(weekdays),
    },
  });

  revalidatePath('/perfil/configuracoes');
  return { success: 'Preferência de lembretes salva.' };
}

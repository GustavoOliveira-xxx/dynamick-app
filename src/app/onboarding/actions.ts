'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth/current-user';
import {
  confirmProfile,
  loadAnswers,
  markStepCompleted,
  markStepSkipped,
  saveAnswer,
  skipOnboarding,
  syncProfileFromAnswers,
} from '@/lib/onboarding/service';
import {
  AREA_SELF_ASSESSMENT,
  getStep,
  nextStepSlug,
  type Question,
} from '@/lib/onboarding/questionnaire';
import { classifyProfile } from '@/lib/profile/engine';
import { isProfileSlug } from '@/lib/profile/profiles';

export type StepState = { fieldErrors?: Record<string, string>; error?: string };

const AREA_SLUGS = AREA_SELF_ASSESSMENT.map((area) => area.slug);
const SELF_VALUES = ['secure', 'insecure', 'unknown'] as const;

/** Validação no servidor com as mesmas regras do cliente (§9). */
function validateQuestion(question: Question, formData: FormData): { value: unknown; error?: string } {
  if (question.type === 'multiple') {
    const values = formData.getAll(question.id).map(String).filter(Boolean);
    const allowed = new Set((question.options ?? []).map((option) => option.value));
    const filtered = values.filter((value) => allowed.has(value));
    if (question.required && filtered.length === 0) {
      return { value: [], error: 'Escolha pelo menos uma opção para continuar.' };
    }
    return { value: filtered };
  }

  if (question.type === 'scale-per-area') {
    const record: Record<string, string> = {};
    for (const area of AREA_SLUGS) {
      const raw = String(formData.get(`${question.id}:${area}`) ?? '');
      if ((SELF_VALUES as readonly string[]).includes(raw)) record[area] = raw;
    }
    return { value: record };
  }

  const raw = String(formData.get(question.id) ?? '').trim();

  if (question.allowCustom && raw === 'custom') {
    const custom = Number(String(formData.get(`${question.id}:custom`) ?? ''));
    if (!Number.isFinite(custom) || custom < 5 || custom > 180) {
      return { value: '', error: 'Informe um tempo entre 5 e 180 minutos.' };
    }
    return { value: String(Math.round(custom)) };
  }

  if (!raw) {
    if (question.required) return { value: '', error: 'Escolha uma opção para continuar.' };
    return { value: '' };
  }

  const allowed = new Set((question.options ?? []).map((option) => option.value));
  if (allowed.size > 0 && !allowed.has(raw)) {
    return { value: '', error: 'Essa opção não é válida. Escolha uma das alternativas.' };
  }
  return { value: raw };
}

export async function saveStepAction(_prev: StepState, formData: FormData): Promise<StepState> {
  const user = await requireUser();
  const stepSlug = String(formData.get('__step') ?? '');
  const step = getStep(stepSlug);
  if (!step) return { error: 'Etapa não encontrada.' };

  const fieldErrors: Record<string, string> = {};
  const toSave: { questionId: string; value: unknown }[] = [];

  for (const question of step.questions) {
    // primaryGoal só existe se houver objetivos marcados
    if (question.id === 'primaryGoal') {
      const goals = formData.getAll('goals').map(String);
      const primary = String(formData.get('primaryGoal') ?? '');
      if (goals.length > 0 && primary && !goals.includes(primary)) {
        fieldErrors.primaryGoal = 'Escolha o principal entre os objetivos que você marcou.';
        continue;
      }
      if (primary) toSave.push({ questionId: 'primaryGoal', value: primary });
      continue;
    }

    const result = validateQuestion(question, formData);
    if (result.error) {
      fieldErrors[question.id] = result.error;
      continue;
    }
    if (result.value !== '') toSave.push({ questionId: question.id, value: result.value });
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  for (const item of toSave) {
    await saveAnswer(user.id, step.slug, item.questionId, item.value as never);
  }

  // Etapa H aplica preferências de interface imediatamente.
  if (step.slug === 'conforto') {
    await applyAppearance(user.id, formData);
  }

  await markStepCompleted(user.id, step.slug);
  await syncProfileFromAnswers(user.id);

  const next = nextStepSlug(step.slug);
  revalidatePath('/onboarding', 'layout');
  redirect(next ? `/onboarding/${next}` : '/onboarding/perfil');
}

async function applyAppearance(userId: string, formData: FormData) {
  const schema = z.object({
    theme: z.enum(['dark', 'light']).catch('dark'),
    textScale: z.enum(['100', '112', '125']).catch('100'),
    reducedMotion: z.enum(['auto', 'always']).catch('auto'),
    highContrast: z.enum(['true', 'false']).catch('false'),
    visualIntensity: z.enum(['full', 'reduced']).catch('full'),
    reminders: z.enum(['true', 'false']).catch('false'),
  });

  const parsed = schema.parse({
    theme: formData.get('theme') ?? 'dark',
    textScale: formData.get('textScale') ?? '100',
    reducedMotion: formData.get('reducedMotion') ?? 'auto',
    highContrast: formData.get('highContrast') ?? 'false',
    visualIntensity: formData.get('visualIntensity') ?? 'full',
    reminders: formData.get('reminders') ?? 'false',
  });

  await prisma.personalizationPreference.upsert({
    where: { userId },
    create: {
      userId,
      theme: parsed.theme,
      textScale: parsed.textScale,
      reducedMotion: parsed.reducedMotion,
      highContrast: parsed.highContrast === 'true',
      visualIntensity: parsed.visualIntensity,
    },
    update: {
      theme: parsed.theme,
      textScale: parsed.textScale,
      reducedMotion: parsed.reducedMotion,
      highContrast: parsed.highContrast === 'true',
      visualIntensity: parsed.visualIntensity,
    },
  });

  await prisma.notificationPreference.upsert({
    where: { userId },
    create: { userId, enabled: parsed.reminders === 'true' },
    update: { enabled: parsed.reminders === 'true' },
  });
}

export async function skipStepAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const stepSlug = String(formData.get('__step') ?? '');
  const step = getStep(stepSlug);
  if (!step || step.required) redirect(`/onboarding/${stepSlug || ''}`);

  await markStepSkipped(user.id, step.slug);
  await syncProfileFromAnswers(user.id);

  const next = nextStepSlug(step.slug);
  revalidatePath('/onboarding', 'layout');
  redirect(next ? `/onboarding/${next}` : '/onboarding/perfil');
}

export async function skipOnboardingAction(): Promise<void> {
  const user = await requireUser();
  await skipOnboarding(user.id);
  revalidatePath('/inicio');
  redirect('/inicio');
}

export async function confirmProfileAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const answers = await loadAnswers(user.id);
  const result = classifyProfile(answers);

  const chosenRaw = String(formData.get('chosenProfile') ?? result.suggested);
  const chosen = isProfileSlug(chosenRaw) ? chosenRaw : result.suggested;
  const note = String(formData.get('note') ?? '').trim();

  await confirmProfile(user.id, result.suggested, chosen, note || undefined);
  revalidatePath('/inicio');
  redirect('/onboarding/resumo');
}

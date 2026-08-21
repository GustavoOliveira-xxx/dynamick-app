import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { loadProgress } from '@/lib/onboarding/service';
import {
  getStep,
  ONBOARDING_MESSAGES,
  ONBOARDING_STEPS,
  previousStepSlug,
  stepIndex,
} from '@/lib/onboarding/questionnaire';
import { StepForm } from './StepForm';

type Params = { params: Promise<{ etapa: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { etapa } = await params;
  const step = getStep(etapa);
  return { title: step ? `${step.title} · Onboarding` : 'Onboarding' };
}

export default async function OnboardingStepPage({ params }: Params) {
  const { etapa } = await params;
  const step = getStep(etapa);
  if (!step) notFound();

  const user = await requireUser(`/onboarding/${etapa}`);
  const progress = await loadProgress(user.id);
  if (progress.status === 'completed' && !progress.completed.includes(step.slug)) {
    redirect('/onboarding/perfil');
  }

  const index = stepIndex(step.slug);
  const total = ONBOARDING_STEPS.length;
  const previous = previousStepSlug(step.slug);
  const resumed =
    (progress.completed.length > 0 || progress.skipped.length > 0) &&
    !progress.completed.includes(step.slug);

  return (
    <StepForm
      step={step}
      stepNumber={index + 1}
      totalSteps={total}
      previousSlug={previous}
      answers={progress.answers}
      selfAssessment={progress.selfAssessment}
      resumedMessage={resumed ? ONBOARDING_MESSAGES.resumed : undefined}
    />
  );
}

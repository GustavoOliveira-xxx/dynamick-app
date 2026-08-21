import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { loadProgress } from '@/lib/onboarding/service';
import { firstIncompleteStep, ONBOARDING_MESSAGES, ONBOARDING_STEPS, REQUIRED_STEPS } from '@/lib/onboarding/questionnaire';
import { LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InlineMessage } from '@/components/ui/States';
import { SkipOnboardingButton } from './SkipOnboardingButton';

export const metadata: Metadata = { title: 'Vamos começar' };

export default async function OnboardingWelcome() {
  const user = await requireUser('/onboarding');
  const progress = await loadProgress(user.id);

  // Retomada: quem já começou volta direto para a primeira etapa incompleta.
  const resumeStep = firstIncompleteStep(progress.completed, progress.skipped);
  const hasStarted = progress.completed.length > 0 || progress.skipped.length > 0;
  if (hasStarted && resumeStep) redirect(`/onboarding/${resumeStep}`);
  if (progress.status === 'completed') redirect('/inicio');

  const firstStep = ONBOARDING_STEPS[0]!;

  return (
    <div className="ck-enter space-y-6 py-6">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-ink-muted">
          Olá, {user.name.split(' ')[0]}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Vamos montar sua primeira semana</h1>
      </div>

      <InlineMessage tone="info" title="Antes de começar">
        {ONBOARDING_MESSAGES.opening}
      </InlineMessage>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Como funciona</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-secondary">
          <li>
            • São {ONBOARDING_STEPS.length} etapas curtas. Só{' '}
            <strong className="text-ink-primary">{REQUIRED_STEPS.length}</strong> são obrigatórias —
            elas levam cerca de 2 minutos.
          </li>
          <li>• Você pode pular as demais e responder depois em “Meu perfil de estudo”.</li>
          <li>• Cada resposta é salva na hora. Se sair no meio, volta exatamente onde parou.</li>
          <li>• Voltar para uma etapa anterior não apaga nada.</li>
        </ul>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <LinkButton href={`/onboarding/${firstStep.slug}`} size="lg">
          Começar
        </LinkButton>
        <SkipOnboardingButton />
      </div>
    </div>
  );
}

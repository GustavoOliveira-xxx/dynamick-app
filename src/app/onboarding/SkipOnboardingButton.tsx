'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { skipOnboardingAction } from './actions';

/**
 * Pular o onboarding inteiro é uma ação real: grava perfil provisório de baixa
 * confiança e leva ao dashboard em modo guiado (§4.3 do ONBOARDING_SPEC.md).
 */
export function SkipOnboardingButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      loading={pending}
      onClick={() => startTransition(() => skipOnboardingAction())}
    >
      Pular por enquanto
    </Button>
  );
}

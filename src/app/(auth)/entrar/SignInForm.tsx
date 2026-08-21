'use client';

import { useActionState } from 'react';
import { signInAction, type ActionState } from '@/lib/auth/actions';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { InlineMessage } from '@/components/ui/States';

const INITIAL: ActionState = {};

export function SignInForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(signInAction, INITIAL);

  return (
    <form action={formAction} className="mt-6 space-y-4" noValidate>
      {state.error && <InlineMessage tone="danger">{state.error}</InlineMessage>}
      {next && <input type="hidden" name="next" value={next} />}

      <Field
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={state.fieldErrors?.email}
      />
      <Field
        label="Senha"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        error={state.fieldErrors?.password}
      />

      <Button type="submit" loading={pending} fullWidth size="lg">
        {pending ? 'Entrando…' : 'Entrar'}
      </Button>
    </form>
  );
}

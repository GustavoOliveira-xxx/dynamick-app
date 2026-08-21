'use client';

import { useActionState } from 'react';
import { signUpAction, type ActionState } from '@/lib/auth/actions';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { InlineMessage } from '@/components/ui/States';

const INITIAL: ActionState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, INITIAL);

  return (
    <form action={formAction} className="mt-6 space-y-4" noValidate>
      {state.error && <InlineMessage tone="danger">{state.error}</InlineMessage>}

      <Field
        label="Como você quer ser chamado"
        name="name"
        autoComplete="given-name"
        required
        maxLength={60}
        error={state.fieldErrors?.name}
        hint="Pode ser seu primeiro nome ou um apelido."
      />
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
        autoComplete="new-password"
        required
        minLength={8}
        error={state.fieldErrors?.password}
        hint="Pelo menos 8 caracteres."
      />

      {/* O botão fica desabilitado enquanto envia: impede envio duplo (§20.1). */}
      <Button type="submit" loading={pending} fullWidth size="lg">
        {pending ? 'Criando sua conta…' : 'Criar conta'}
      </Button>

      <p className="text-xs text-ink-muted">
        Ao criar a conta você concorda com o tratamento dos seus dados de estudo conforme a nossa{' '}
        <a href="/privacidade" className="underline underline-offset-2">
          política de privacidade
        </a>
        . Você pode exportar ou excluir seus dados quando quiser.
      </p>
    </form>
  );
}

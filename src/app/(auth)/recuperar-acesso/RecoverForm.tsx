'use client';

import { useActionState, useState } from 'react';
import {
  forgotPasswordAction,
  resetPasswordAction,
  type ActionState,
} from '@/lib/auth/actions';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { InlineMessage } from '@/components/ui/States';

const INITIAL: ActionState = {};

export function RecoverForm() {
  const [requestState, requestAction, requestPending] = useActionState(forgotPasswordAction, INITIAL);
  const [resetState, resetAction, resetPending] = useActionState(resetPasswordAction, INITIAL);
  const [showReset, setShowReset] = useState(false);

  if (resetState.success) {
    return <InlineMessage tone="success">{resetState.success}</InlineMessage>;
  }

  return (
    <div className="mt-6 space-y-5">
      {!showReset && (
        <form action={requestAction} className="space-y-4" noValidate>
          {requestState.error && <InlineMessage tone="danger">{requestState.error}</InlineMessage>}
          <Field
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            required
            error={requestState.fieldErrors?.email}
          />
          <Button type="submit" loading={requestPending} fullWidth>
            {requestPending ? 'Enviando…' : 'Enviar link de redefinição'}
          </Button>
        </form>
      )}

      {requestState.success && (
        <InlineMessage tone="success">{requestState.success}</InlineMessage>
      )}

      {requestState.devResetToken && (
        <InlineMessage tone="warning" title="Modo de desenvolvimento">
          <p>
            Esta versão ainda não envia e-mails (limitação registrada em PROJECT_AUDIT.md). Use o
            código abaixo para redefinir sua senha:
          </p>
          <code className="mt-2 block break-all rounded-sm bg-[color:var(--ck-bg-raised)] p-2 font-mono text-xs">
            {requestState.devResetToken}
          </code>
        </InlineMessage>
      )}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowReset((value) => !value)}
      >
        {showReset ? 'Voltar' : 'Já tenho um código de redefinição'}
      </Button>

      {showReset && (
        <form action={resetAction} className="space-y-4" noValidate>
          {resetState.error && <InlineMessage tone="danger">{resetState.error}</InlineMessage>}
          <Field
            label="Código de redefinição"
            name="token"
            required
            defaultValue={requestState.devResetToken}
            error={resetState.fieldErrors?.token}
          />
          <Field
            label="Nova senha"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            hint="Pelo menos 8 caracteres."
            error={resetState.fieldErrors?.password}
          />
          <Button type="submit" loading={resetPending} fullWidth>
            {resetPending ? 'Salvando…' : 'Definir nova senha'}
          </Button>
        </form>
      )}
    </div>
  );
}

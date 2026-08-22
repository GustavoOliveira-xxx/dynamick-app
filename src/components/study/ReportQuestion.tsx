'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { REPORT_KINDS, REPORT_KIND_LABELS } from '@/lib/domain';
import { reportQuestionAction, type AdminActionState } from '@/lib/admin/actions';

const INITIAL: AdminActionState = {};

/**
 * Denúncia de problema em questão (§13).
 * Disponível para o estudante durante a correção; vai direto para a fila da curadoria.
 */
export function ReportQuestion({ questionId }: { questionId: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(reportQuestionAction, INITIAL);
  const [kind, setKind] = useState<string>('');

  if (state.success) {
    return <InlineMessage tone="success">{state.success}</InlineMessage>;
  }

  if (!open) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Relatar um problema nesta questão
      </Button>
    );
  }

  return (
    <form action={formAction} className="mt-3 space-y-3 rounded-md border border-line p-4">
      <input type="hidden" name="questionId" value={questionId} />
      <input type="hidden" name="kind" value={kind} />

      {state.error && (
        <InlineMessage tone="danger" title={state.error}>
          {state.details && (
            <ul className="mt-1 space-y-1">
              {state.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          )}
        </InlineMessage>
      )}

      <fieldset className="border-0 p-0">
        <legend className="text-sm font-medium">Qual é o problema?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {REPORT_KINDS.map((value) => (
            <label
              key={value}
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-pill border px-3 text-sm"
              style={{ borderColor: kind === value ? 'var(--ck-green-primary)' : 'var(--ck-border)' }}
            >
              <input
                type="radio"
                name="kindChoice"
                value={value}
                checked={kind === value}
                onChange={() => setKind(value)}
                className="h-4 w-4 accent-[color:var(--ck-green-primary)]"
              />
              {REPORT_KIND_LABELS[value]}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`msg-${questionId}`} className="mb-1.5 block text-sm font-medium">
          Conte em uma frase
        </label>
        <textarea
          id={`msg-${questionId}`}
          name="message"
          rows={2}
          required
          minLength={5}
          maxLength={1000}
          className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
          placeholder="Ex.: a alternativa C também parece correta segundo o enunciado."
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" size="sm" loading={pending} disabled={!kind}>
          Enviar para a curadoria
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </div>

      <p className="text-xs text-ink-muted">
        A curadoria analisa e registra a resolução. Isso não afeta o seu histórico.
      </p>
    </form>
  );
}

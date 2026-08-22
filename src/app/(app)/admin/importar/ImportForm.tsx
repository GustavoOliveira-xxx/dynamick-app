'use client';

import { useActionState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { importQuestionsAction, type AdminActionState } from '@/lib/admin/actions';

const INITIAL: AdminActionState = {};

export function ImportForm({ example }: { example: string }) {
  const [state, formAction, pending] = useActionState(importQuestionsAction, INITIAL);

  return (
    <form action={formAction}>
      <Card className="space-y-4 p-5">
        <h2 className="text-lg font-semibold">Colar JSON</h2>

        {state.success && <InlineMessage tone="success">{state.success}</InlineMessage>}
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

        <div>
          <label htmlFor="payload" className="mb-1.5 block text-sm font-medium">
            Lista de questões (JSON)
          </label>
          <textarea
            id="payload"
            name="payload"
            rows={14}
            required
            defaultValue={example}
            className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 font-mono text-xs"
          />
        </div>

        <Button type="submit" loading={pending}>
          {pending ? 'Validando e importando…' : 'Validar e importar'}
        </Button>
      </Card>
    </form>
  );
}

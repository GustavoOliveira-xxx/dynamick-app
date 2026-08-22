'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ERROR_REASON_LABELS, NEXT_ACTIONS, NEXT_ACTION_LABELS, type ErrorReason, type NextAction } from '@/lib/domain';
import { resolveErrorNoteAction, updateErrorNoteAction } from '@/lib/session/notebook-actions';
import { startTopicSessionAction } from '@/lib/session/actions';

/** Item do caderno de erros: sempre com nota pessoal, motivo, conceito e uma ação. */
export function ErrorNoteCard({
  id,
  topicId,
  topicName,
  topicSlug,
  questionStem,
  reason,
  note,
  nextAction,
  status,
  createdLabel,
}: {
  id: string;
  topicId: string | null;
  topicName: string;
  topicSlug: string;
  questionStem: string | null;
  reason: string | null;
  note: string | null;
  nextAction: string;
  status: string;
  createdLabel: string;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const resolved = status === 'resolved';

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="cyan">{topicName}</Badge>
        {reason && (
          <Badge tone="warning">{ERROR_REASON_LABELS[reason as ErrorReason] ?? reason}</Badge>
        )}
        <Badge tone={resolved ? 'green' : 'neutral'}>{resolved ? 'Compreendido' : createdLabel}</Badge>
      </div>

      {questionStem && (
        <p className="mt-3 text-sm text-ink-muted">
          {questionStem.slice(0, 180)}
          {questionStem.length > 180 ? '…' : ''}
        </p>
      )}

      {note && !editing && (
        <p className="mt-3 rounded-md border-l-2 bg-[color:var(--ck-bg-raised)] p-3 text-sm" style={{ borderColor: 'var(--ck-teal)' }}>
          {note}
        </p>
      )}

      {editing && (
        <form
          action={(formData) => startTransition(async () => { await updateErrorNoteAction(formData); setEditing(false); })}
          className="mt-3 space-y-3"
        >
          <input type="hidden" name="id" value={id} />
          <label className="block text-sm font-medium" htmlFor={`nota-${id}`}>
            Sua nota
          </label>
          <textarea
            id={`nota-${id}`}
            name="note"
            rows={3}
            maxLength={2000}
            defaultValue={note ?? ''}
            className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
            placeholder="O que faltou aqui? Escrever com suas palavras ajuda a fixar."
          />

          <label className="block text-sm font-medium" htmlFor={`acao-${id}`}>
            Próxima ação
          </label>
          <select
            id={`acao-${id}`}
            name="nextAction"
            defaultValue={nextAction}
            className="min-h-[44px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
          >
            {NEXT_ACTIONS.map((action) => (
              <option key={action} value={action}>
                {NEXT_ACTION_LABELS[action]}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <Button type="submit" size="sm" loading={pending}>
              Salvar
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      {!editing && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone="teal">
            Próxima ação: {NEXT_ACTION_LABELS[nextAction as NextAction] ?? nextAction}
          </Badge>

          {topicId && !resolved && (
            <Button
              size="sm"
              loading={pending}
              onClick={() => startTransition(async () => { await startTopicSessionAction(topicId, 'review'); })}
            >
              Fazer agora
            </Button>
          )}

          {topicSlug && (
            <Link
              href={`/conteudos/${topicSlug}`}
              className="inline-flex min-h-[40px] items-center px-2 text-sm underline underline-offset-4 hover:text-ink-primary"
            >
              Rever conceito
            </Link>
          )}

          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            {note ? 'Editar nota' : 'Adicionar nota'}
          </Button>

          <form action={(formData) => startTransition(async () => { await resolveErrorNoteAction(formData); })}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" size="sm" variant="ghost">
              {resolved ? 'Reabrir' : 'Marcar como compreendido'}
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
}

'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RECALL_LABELS, RECALL_LEVELS } from '@/lib/domain';
import { registerRecallAction, startTopicSessionAction } from '@/lib/session/actions';

/**
 * Item da fila de revisão.
 * A declaração ("não lembro / lembro parcialmente / domino") é registrada ANTES de
 * praticar, e a sessão de recuperação traz questões diferentes da original (§5.7).
 */
export function ReviewCard({
  reviewItemId,
  topicId,
  topicName,
  topicSlug,
  questionStem,
  reason,
  dueLabel,
  repetitions,
}: {
  reviewItemId: string;
  topicId: string | null;
  topicName: string;
  topicSlug: string;
  questionStem: string | null;
  reason: string | null;
  dueLabel: string;
  repetitions: number;
}) {
  const [recall, setRecall] = useState<string>('');
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="cyan">{topicName}</Badge>
        <Badge tone="neutral">Agendada {dueLabel}</Badge>
        {repetitions > 0 && <Badge tone="teal">{repetitions}ª revisão</Badge>}
      </div>

      {reason && <p className="mt-3 text-sm text-ink-secondary">{reason}</p>}

      {questionStem && (
        <p className="mt-3 line-clamp-2 text-sm text-ink-muted">
          {questionStem.slice(0, 160)}
          {questionStem.length > 160 ? '…' : ''}
        </p>
      )}

      <form
        action={(formData) => {
          startTransition(async () => {
            await registerRecallAction(formData);
            setSaved(true);
          });
        }}
        className="mt-4"
      >
        <input type="hidden" name="reviewItemId" value={reviewItemId} />
        <input type="hidden" name="recall" value={recall} />

        <fieldset className="border-0 p-0">
          <legend className="text-sm font-medium">Antes de praticar: quanto você lembra?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {RECALL_LEVELS.map((level) => (
              <label
                key={level}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-pill border px-4 text-sm"
                style={{ borderColor: recall === level ? 'var(--ck-green-primary)' : 'var(--ck-border)' }}
              >
                <input
                  type="radio"
                  name="recallChoice"
                  value={level}
                  checked={recall === level}
                  onChange={() => {
                    setRecall(level);
                    setSaved(false);
                  }}
                  className="h-4 w-4 accent-[color:var(--ck-green-primary)]"
                />
                {RECALL_LABELS[level]}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button type="submit" size="sm" variant="secondary" disabled={!recall} loading={pending}>
            Registrar
          </Button>

          {topicId && (
            <Button
              type="button"
              size="sm"
              onClick={() =>
                startTransition(async () => {
                  await startTopicSessionAction(topicId, 'review');
                })
              }
            >
              Praticar questões diferentes
            </Button>
          )}

          {topicSlug && (
            <Link
              href={`/conteudos/${topicSlug}`}
              className="inline-flex min-h-[40px] items-center px-2 text-sm underline underline-offset-4 hover:text-ink-primary"
            >
              Rever o conceito
            </Link>
          )}
        </div>

        {saved && (
          <p className="mt-2 text-xs" style={{ color: 'var(--ck-success)' }}>
            ✓ Registrado. O intervalo da próxima revisão foi ajustado.
          </p>
        )}
      </form>
    </Card>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/States';
import { ERROR_REASON_LABELS, type ErrorReason } from '@/lib/domain';
import { relativeDays } from '@/lib/util/format';
import { ErrorNoteCard } from '@/components/study/ErrorNoteCard';

export const metadata: Metadata = { title: 'Caderno de erros' };

/**
 * Caderno de erros (§5.6).
 * Nunca é arquivo morto: cada registro traz uma ação concreta a executar.
 */
export default async function ErrorNotebookPage({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string; status?: string }>;
}) {
  const user = await requireUser('/revisar/caderno');
  const filters = await searchParams;

  const status = filters.status === 'resolved' ? 'resolved' : 'open';

  const notes = await prisma.errorNote.findMany({
    where: {
      userId: user.id,
      status: status === 'open' ? { not: 'resolved' } : 'resolved',
      ...(filters.motivo ? { reason: filters.motivo } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      topic: { select: { id: true, name: true, slug: true } },
      question: { select: { id: true, stem: true } },
    },
  });

  const reasonCounts = await prisma.errorNote.groupBy({
    by: ['reason'],
    where: { userId: user.id, status: { not: 'resolved' } },
    _count: { reason: true },
  });

  const resolvedCount = await prisma.errorNote.count({
    where: { userId: user.id, status: 'resolved' },
  });

  return (
    <div className="space-y-6">
      <div>
        <nav aria-label="Trilha" className="text-xs text-ink-muted">
          <Link href="/revisar" className="underline underline-offset-4 hover:text-ink-primary">
            Revisar
          </Link>{' '}
          · Caderno de erros
        </nav>
        <h1 className="mt-2 text-2xl font-semibold">Caderno de erros</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Cada item aqui tem uma próxima ação. Isso não é uma lista de falhas — é uma lista de coisas
          a resolver.
        </p>
      </div>

      {/* Padrões por motivo — a leitura útil do caderno */}
      {reasonCounts.length > 0 && (
        <Card className="p-5">
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink-muted">
            Seus padrões de dificuldade
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            <li>
              <Link href="/revisar/caderno">
                <Badge tone={!filters.motivo ? 'green' : 'neutral'}>Todos</Badge>
              </Link>
            </li>
            {reasonCounts
              .sort((a, b) => b._count.reason - a._count.reason)
              .map((entry) => (
                <li key={entry.reason}>
                  <Link href={`/revisar/caderno?motivo=${entry.reason}`}>
                    <Badge tone={filters.motivo === entry.reason ? 'green' : 'warning'}>
                      {ERROR_REASON_LABELS[entry.reason as ErrorReason] ?? entry.reason} ·{' '}
                      {entry._count.reason}
                    </Badge>
                  </Link>
                </li>
              ))}
          </ul>
          {reasonCounts.length > 1 && (
            <p className="mt-3 text-sm text-ink-secondary">
              Um padrão que se repete costuma render mais atenção do que um erro isolado.
            </p>
          )}
        </Card>
      )}

      <div className="flex gap-2">
        <Link href="/revisar/caderno">
          <Badge tone={status === 'open' ? 'green' : 'neutral'}>Em aberto</Badge>
        </Link>
        <Link href="/revisar/caderno?status=resolved">
          <Badge tone={status === 'resolved' ? 'green' : 'neutral'}>
            Resolvidos ({resolvedCount})
          </Badge>
        </Link>
      </div>

      {notes.length === 0 ? (
        <EmptyState
          title={status === 'open' ? 'Nenhum erro em aberto' : 'Nada resolvido ainda'}
          description={
            status === 'open'
              ? 'Quando você errar e indicar o motivo, o item aparece aqui com uma ação.'
              : 'Marque um item como compreendido depois de revisá-lo.'
          }
          actionLabel="Praticar"
          actionHref="/praticar"
          icon="✎"
        />
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li key={note.id}>
              <ErrorNoteCard
                id={note.id}
                topicId={note.topic?.id ?? null}
                topicName={note.topic?.name ?? note.concept ?? 'Conceito'}
                topicSlug={note.topic?.slug ?? ''}
                questionStem={note.question?.stem ?? null}
                reason={note.reason}
                note={note.note}
                nextAction={note.nextAction}
                status={note.status}
                createdLabel={relativeDays(note.createdAt)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

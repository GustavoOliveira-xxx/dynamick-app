import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { EmptyState, InlineMessage } from '@/components/ui/States';
import { relativeDays } from '@/lib/util/format';
import { RECALL_LABELS } from '@/lib/domain';
import { ReviewCard } from '@/components/study/ReviewCard';

export const metadata: Metadata = { title: 'Revisar' };

/**
 * Fila de revisão (§ etapa 10 e §5.7).
 * Reúne conceitos E questões, não apenas uma lista do que foi errado.
 * Cada item vira uma ação, nunca só uma estatística.
 */
export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>;
}) {
  const user = await requireUser('/revisar');
  const { filtro } = await searchParams;

  const now = new Date();

  const [due, upcoming, notesCount] = await Promise.all([
    prisma.reviewItem.findMany({
      where: { userId: user.id, status: 'pending', dueAt: { lte: now } },
      orderBy: { dueAt: 'asc' },
      take: 20,
      include: {
        topic: { select: { name: true, slug: true, id: true } },
        question: {
          select: {
            id: true,
            stem: true,
            difficulty: true,
            topic: { select: { name: true, slug: true, id: true } },
          },
        },
      },
    }),
    prisma.reviewItem.count({ where: { userId: user.id, status: 'pending', dueAt: { gt: now } } }),
    prisma.errorNote.count({ where: { userId: user.id, status: 'open' } }),
  ]);

  const filtered = filtro
    ? due.filter((item) => item.topic?.slug === filtro || item.question?.topic.slug === filtro)
    : due;

  const topics = [
    ...new Map(
      due
        .map((item) => item.topic ?? item.question?.topic)
        .filter((topic): topic is { id: string; name: string; slug: string } => Boolean(topic))
        .map((topic) => [topic.slug, topic]),
    ).values(),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Revisar</h1>
          <p className="mt-1 text-sm text-ink-secondary">
            O que você errou volta aqui no momento certo — e sempre com uma questão diferente.
          </p>
        </div>
        <Link
          href="/revisar/caderno"
          className="text-sm underline underline-offset-4 hover:text-ink-primary"
        >
          Caderno de erros ({notesCount})
        </Link>
      </div>

      {due.length === 0 ? (
        <EmptyState
          title="Nada para revisar agora"
          description={
            upcoming > 0
              ? `Você tem ${upcoming} item(ns) agendado(s) para os próximos dias. Revisar antes da hora rende menos.`
              : 'Quando você errar alguma questão, ela aparece aqui no intervalo adequado.'
          }
          actionLabel="Praticar algo novo"
          actionHref="/praticar"
          icon="↻"
        />
      ) : (
        <>
          <InlineMessage tone="info">
            Antes de responder, diga o quanto você lembra. Comparamos sua percepção com o resultado —
            dizer &ldquo;domino&rdquo; e errar conta como &ldquo;{RECALL_LABELS.partial.toLowerCase()}&rdquo;.
          </InlineMessage>

          {topics.length > 1 && (
            <div className="flex flex-wrap gap-2">
              <Link href="/revisar">
                <Badge tone={!filtro ? 'green' : 'neutral'}>Todos ({due.length})</Badge>
              </Link>
              {topics.map((topic) => (
                <Link key={topic.slug} href={`/revisar?filtro=${topic.slug}`}>
                  <Badge tone={filtro === topic.slug ? 'green' : 'neutral'}>{topic.name}</Badge>
                </Link>
              ))}
            </div>
          )}

          <ul className="space-y-3">
            {filtered.map((item) => {
              const topic = item.topic ?? item.question?.topic;
              return (
                <li key={item.id}>
                  <ReviewCard
                    reviewItemId={item.id}
                    topicId={topic?.id ?? null}
                    topicName={topic?.name ?? 'Conceito'}
                    topicSlug={topic?.slug ?? ''}
                    questionStem={item.question?.stem ?? null}
                    reason={item.reason}
                    dueLabel={relativeDays(item.dueAt)}
                    repetitions={item.repetitions}
                  />
                </li>
              );
            })}
          </ul>

          {upcoming > 0 && (
            <Card className="p-4">
              <p className="text-sm text-ink-secondary">
                Mais {upcoming} item(ns) voltam nos próximos dias. Revisar cedo demais não ajuda a
                fixar.
              </p>
            </Card>
          )}
        </>
      )}

      <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h2 className="text-lg font-semibold">Revisão intercalada</h2>
          <p className="mt-1 text-sm text-ink-secondary">
            Questões de matérias diferentes na mesma sessão — treina escolher a estratégia certa.
          </p>
        </div>
        <LinkButton href="/praticar/sessao/revisao-intercalada" variant="secondary">
          Ver sessão
        </LinkButton>
      </Card>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { EmptyState, SeedContentNotice } from '@/components/ui/States';
import { MASTERY_LABELS, MASTERY_MEANING, type MasteryState } from '@/lib/domain';
import { relativeDays } from '@/lib/util/format';
import { ContentFilters } from './ContentFilters';

export const metadata: Metadata = { title: 'Mapa de conteúdos' };

const STATE_TONE: Record<MasteryState, 'neutral' | 'teal' | 'green' | 'warning' | 'cyan'> = {
  not_started: 'neutral',
  explored: 'cyan',
  practicing: 'teal',
  needs_review: 'warning',
  consolidated: 'green',
};

/**
 * Mapa de conteúdo (§5.2): representação visual e textual de áreas, matérias e tópicos.
 * Cada tópico mostra status, domínio estimado, questões disponíveis e última prática.
 */
export default async function ContentMapPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string; estado?: string; busca?: string }>;
}) {
  const user = await requireUser('/conteudos');
  const filters = await searchParams;

  const [areas, mastery] = await Promise.all([
    prisma.knowledgeArea.findMany({
      orderBy: { order: 'asc' },
      include: {
        subjects: {
          orderBy: { order: 'asc' },
          include: {
            topics: {
              where: { status: 'published' },
              orderBy: { order: 'asc' },
              include: { _count: { select: { questions: { where: { status: 'published' } } } } },
            },
          },
        },
      },
    }),
    prisma.topicMastery.findMany({ where: { userId: user.id } }),
  ]);

  const masteryByTopic = new Map(mastery.map((item) => [item.topicId, item]));
  const search = (filters.busca ?? '').trim().toLowerCase();

  const visibleAreas = areas
    .filter((area) => !filters.area || area.slug === filters.area)
    .map((area) => ({
      ...area,
      subjects: area.subjects
        .map((subject) => ({
          ...subject,
          topics: subject.topics.filter((topic) => {
            const state = masteryByTopic.get(topic.id)?.state ?? 'not_started';
            if (filters.estado && state !== filters.estado) return false;
            if (search && !topic.name.toLowerCase().includes(search) && !topic.summary.toLowerCase().includes(search)) {
              return false;
            }
            return true;
          }),
        }))
        .filter((subject) => subject.topics.length > 0),
    }))
    .filter((area) => area.subjects.length > 0);

  const totalTopics = areas.flatMap((a) => a.subjects.flatMap((s) => s.topics)).length;
  const consolidated = mastery.filter((item) => item.state === 'consolidated').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Mapa de conteúdos</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          {totalTopics} tópicos disponíveis · {consolidated} consolidado(s) até agora.
        </p>
      </div>

      <SeedContentNotice />

      <ContentFilters
        areas={areas.map((area) => ({ slug: area.slug, name: area.shortName }))}
        current={{ area: filters.area ?? '', estado: filters.estado ?? '', busca: filters.busca ?? '' }}
      />

      {visibleAreas.length === 0 ? (
        <EmptyState
          title="Nenhum tópico com esses filtros"
          description="Tente remover um filtro ou buscar por outro termo."
          actionLabel="Limpar filtros"
          actionHref="/conteudos"
        />
      ) : (
        <div className="space-y-8">
          {visibleAreas.map((area) => (
            <section key={area.id} aria-labelledby={`area-${area.slug}`}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: `var(--ck-${area.accent === 'green' ? 'green-primary' : area.accent})` }}
                />
                <h2 id={`area-${area.slug}`} className="text-lg font-semibold">
                  {area.shortName}
                </h2>
              </div>
              <p className="mt-1 text-sm text-ink-muted">{area.summary}</p>

              <div className="mt-4 space-y-5">
                {area.subjects.map((subject) => (
                  <div key={subject.id}>
                    <h3 className="text-sm font-medium uppercase tracking-wide text-ink-muted">
                      {subject.name}
                    </h3>
                    <ul className="mt-2 grid gap-3 sm:grid-cols-2">
                      {subject.topics.map((topic) => {
                        const state = (masteryByTopic.get(topic.id)?.state ?? 'not_started') as MasteryState;
                        const score = masteryByTopic.get(topic.id)?.score ?? 0;
                        const lastPracticed = masteryByTopic.get(topic.id)?.lastPracticedAt;

                        return (
                          <li key={topic.id}>
                            <Link href={`/conteudos/${topic.slug}`} className="block h-full">
                              <Card interactive className="h-full p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="font-medium">{topic.name}</p>
                                  <Badge tone={STATE_TONE[state]}>{MASTERY_LABELS[state]}</Badge>
                                </div>
                                <p className="mt-1.5 text-sm text-ink-secondary">{topic.summary}</p>

                                <div className="mt-3">
                                  <Progress
                                    value={score}
                                    label={`Domínio estimado em ${topic.name}: ${score} de 100`}
                                    size="sm"
                                    tone={state === 'needs_review' ? 'warning' : 'green'}
                                  />
                                </div>

                                <p className="mt-2 text-xs text-ink-muted">
                                  {topic._count.questions} questões · última prática{' '}
                                  {relativeDays(lastPracticed)}
                                </p>
                                <p className="mt-1 text-xs text-ink-muted">{MASTERY_MEANING[state]}</p>
                              </Card>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

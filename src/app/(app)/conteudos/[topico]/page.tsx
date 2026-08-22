import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { InlineMessage, SeedContentNotice } from '@/components/ui/States';
import { Markdown } from '@/components/study/Markdown';
import { StartRecommendedSession } from '../../inicio/StartRecommendedSession';
import {
  CONTENT_KIND_LABELS,
  DIFFICULTY_LABELS,
  MASTERY_LABELS,
  MASTERY_MEANING,
  type ContentKind,
  type Difficulty,
  type MasteryState,
} from '@/lib/domain';
import { formatMinutes, relativeDays } from '@/lib/util/format';

type Params = { params: Promise<{ topico: string }>; searchParams: Promise<{ erro?: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { topico } = await params;
  const topic = await prisma.topic.findUnique({ where: { slug: topico }, select: { name: true } });
  return { title: topic?.name ?? 'Tópico' };
}

/**
 * Página do tópico (§5.3).
 * Níveis de profundidade: leitura rápida, explicação padrão e aprofundamento.
 * O estudante nunca é obrigado a ler tudo antes de praticar.
 */
export default async function TopicPage({ params, searchParams }: Params) {
  const { topico } = await params;
  const { erro } = await searchParams;
  const user = await requireUser(`/conteudos/${topico}`);

  const topic = await prisma.topic.findFirst({
    where: { slug: topico, status: 'published' },
    include: {
      area: true,
      subject: true,
      skills: true,
      contentItems: { where: { status: 'published' }, orderBy: { order: 'asc' } },
      prerequisites: { include: { prerequisite: { select: { name: true, slug: true } } } },
      relatedFrom: { include: { to: { select: { name: true, slug: true } } } },
      _count: { select: { questions: { where: { status: 'published' } } } },
    },
  });

  if (!topic) notFound();

  const mastery = await prisma.topicMastery.findUnique({
    where: { userId_topicId: { userId: user.id, topicId: topic.id } },
  });

  const state = (mastery?.state ?? 'not_started') as MasteryState;
  const byKind = (kind: ContentKind) => topic.contentItems.filter((item) => item.kind === kind);

  const quickSummary = byKind('quick_summary')[0];
  const explanation = byKind('explanation')[0];
  const examples = byKind('worked_example');
  const mistakes = byKind('common_mistakes')[0];
  const selfExplanation = byKind('self_explanation')[0];

  return (
    <div className="space-y-6">
      <nav aria-label="Trilha de navegação" className="text-xs text-ink-muted">
        <Link href="/conteudos" className="underline underline-offset-4 hover:text-ink-primary">
          Conteúdos
        </Link>{' '}
        · {topic.area.shortName} · {topic.subject.name}
      </nav>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="cyan">{topic.subject.name}</Badge>
          <Badge tone="neutral">{DIFFICULTY_LABELS[topic.difficulty as Difficulty]}</Badge>
          <Badge tone="teal">{formatMinutes(topic.estimatedMinutes)}</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-semibold">{topic.name}</h1>
        <p className="mt-2 text-ink-secondary">{topic.summary}</p>
      </header>

      {erro === 'sem-questoes' && (
        <InlineMessage tone="warning" title="Não foi possível montar a sessão">
          Este tópico ainda não tem questões publicadas suficientes. A equipe de curadoria já
          consegue ver essa lacuna no painel.
        </InlineMessage>
      )}

      {/* Situação e ação principal */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-[220px] flex-1">
            <div className="flex items-center gap-2">
              <Badge tone={state === 'consolidated' ? 'green' : state === 'needs_review' ? 'warning' : 'neutral'}>
                {MASTERY_LABELS[state]}
              </Badge>
              <span className="text-xs text-ink-muted">{MASTERY_MEANING[state]}</span>
            </div>
            <div className="mt-3">
              <Progress
                value={mastery?.score ?? 0}
                label={`Domínio estimado: ${mastery?.score ?? 0} de 100`}
                tone={state === 'needs_review' ? 'warning' : 'green'}
              />
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              {topic._count.questions} questões disponíveis · última prática{' '}
              {relativeDays(mastery?.lastPracticedAt)}
            </p>
          </div>

          {topic._count.questions > 0 && (
            <StartRecommendedSession topicId={topic.id} kind="practice" />
          )}
        </div>
      </Card>

      {/* Pré-requisitos */}
      {topic.prerequisites.length > 0 && (
        <Card className="p-5">
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink-muted">
            Ajuda ter visto antes
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {topic.prerequisites.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/conteudos/${item.prerequisite.slug}`}
                  className="inline-flex min-h-[36px] items-center rounded-pill border border-line px-3 text-sm hover:border-[color:var(--ck-green-primary)]"
                >
                  {item.prerequisite.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-muted">
            Isso é uma sugestão, não um bloqueio: você pode estudar este tópico agora.
          </p>
        </Card>
      )}

      {/* Leitura rápida */}
      {quickSummary && (
        <Card className="p-6" as="section">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{quickSummary.title}</h2>
            <Badge tone="teal">{CONTENT_KIND_LABELS.quick_summary}</Badge>
          </div>
          <div className="mt-3">
            <Markdown source={quickSummary.body} />
          </div>
        </Card>
      )}

      {/* Explicação padrão — recolhível para não obrigar leitura longa */}
      {explanation && (
        <Card className="p-6" as="section">
          <details open>
            <summary className="cursor-pointer list-none">
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-semibold">{explanation.title}</span>
                <Badge tone="cyan">{CONTENT_KIND_LABELS.explanation}</Badge>
              </span>
            </summary>
            <div className="mt-4">
              <Markdown source={explanation.body} />
            </div>
          </details>
        </Card>
      )}

      {/* Exemplos resolvidos */}
      {examples.length > 0 && (
        <section aria-labelledby="exemplos" className="space-y-3">
          <h2 id="exemplos" className="text-lg font-semibold">
            Exemplos resolvidos
          </h2>
          {examples.map((example) => (
            <Card key={example.id} className="p-6">
              <details>
                <summary className="cursor-pointer font-medium">{example.title}</summary>
                <div className="mt-3">
                  <Markdown source={example.body} />
                </div>
              </details>
            </Card>
          ))}
        </section>
      )}

      {/* Erros comuns */}
      {mistakes && (
        <Card className="p-6" as="section" id="erros-comuns">
          <h2 className="text-lg font-semibold">{mistakes.title}</h2>
          <div className="mt-3">
            <Markdown source={mistakes.body} />
          </div>
        </Card>
      )}

      {/* Autoexplicação */}
      {selfExplanation && (
        <Card className="p-6" as="section">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{selfExplanation.title}</h2>
            <Badge tone="lime">Estudo ativo</Badge>
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            Tente responder antes de voltar à explicação. Errar aqui não custa nada.
          </p>
          <div className="mt-3">
            <Markdown source={selfExplanation.body} />
          </div>
        </Card>
      )}

      {/* Habilidades e relações */}
      <div className="grid gap-4 md:grid-cols-2">
        {topic.skills.length > 0 && (
          <Card className="p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-muted">
              Habilidade praticada
            </h2>
            <ul className="mt-2 space-y-2 text-sm">
              {topic.skills.map((skill) => (
                <li key={skill.id}>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-ink-secondary">{skill.description}</p>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {topic.relatedFrom.length > 0 && (
          <Card className="p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-muted">
              Se conecta com
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {topic.relatedFrom.map((relation) => (
                <li key={relation.id}>
                  <Link
                    href={`/conteudos/${relation.to.slug}`}
                    className="inline-flex min-h-[36px] items-center rounded-pill border border-line px-3 text-sm hover:border-[color:var(--ck-green-primary)]"
                  >
                    {relation.to.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {topic._count.questions > 0 && (
        <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <h2 className="text-lg font-semibold">Pronto para praticar?</h2>
            <p className="mt-1 text-sm text-ink-secondary">
              As questões variam de contexto — não são a mesma pergunta com números trocados.
            </p>
          </div>
          <StartRecommendedSession topicId={topic.id} kind="practice" />
        </Card>
      )}

      <SeedContentNotice compact />
    </div>
  );
}

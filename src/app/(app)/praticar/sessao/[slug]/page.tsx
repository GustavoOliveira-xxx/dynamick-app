import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { formatMinutes } from '@/lib/util/format';
import { parseJson } from '@/lib/util/json';
import { SESSION_KIND_LABELS, type SessionKind } from '@/lib/domain';
import { StartSessionTemplate } from '../../StartSessionTemplate';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const template = await prisma.sessionTemplate.findUnique({
    where: { slug },
    select: { title: true },
  });
  return { title: template?.title ?? 'Sessão' };
}

/** Detalhe de uma sessão pronta do seed, com objetivo, instruções e critério. */
export default async function SessionTemplatePage({ params }: Params) {
  const { slug } = await params;
  const user = await requireUser(`/praticar/sessao/${slug}`);

  const template = await prisma.sessionTemplate.findUnique({ where: { slug } });
  if (!template) notFound();

  const rule = parseJson<{ topicSlugs?: string[]; count?: number; source?: string }>(
    template.itemRule,
    {},
  );

  const topics = rule.topicSlugs?.length
    ? await prisma.topic.findMany({
        where: { slug: { in: rule.topicSlugs }, status: 'published' },
        include: { _count: { select: { questions: { where: { status: 'published' } } } } },
      })
    : [];

  const profile = await prisma.studyProfile.findUnique({ where: { userId: user.id } });
  const exceedsTime = template.minutes > (profile?.sessionMinutes ?? 20);

  const nextTemplate = template.nextRecommendation
    ? await prisma.sessionTemplate.findUnique({
        where: { slug: template.nextRecommendation },
        select: { slug: true, title: true },
      })
    : null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <nav aria-label="Trilha" className="text-xs text-ink-muted">
        <Link href="/praticar" className="underline underline-offset-4">
          Praticar
        </Link>{' '}
        · {template.title}
      </nav>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="teal">{formatMinutes(template.minutes)}</Badge>
          <Badge tone="cyan">{SESSION_KIND_LABELS[template.kind as SessionKind]}</Badge>
          <Badge tone="neutral">
            {template.mode === 'exam' ? 'Correção no final' : 'Correção a cada questão'}
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-semibold">{template.title}</h1>
        <p className="mt-2 text-ink-secondary">{template.goal}</p>
      </div>

      {exceedsTime && (
        <InlineMessage tone="warning">
          Esta sessão leva {formatMinutes(template.minutes)}, mais que os{' '}
          {formatMinutes(profile?.sessionMinutes ?? 20)} que você informou por sessão. Você pode
          fazer mesmo assim — e pausar quando precisar.
        </InlineMessage>
      )}

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Como fazer</h2>
        <p className="ck-reading mt-2 text-sm text-ink-secondary">{template.instructions}</p>

        {topics.length > 0 && (
          <>
            <h3 className="mt-5 text-sm font-medium uppercase tracking-wide text-ink-muted">
              Conteúdo
            </h3>
            <ul className="mt-2 space-y-2">
              {topics.map((topic) => (
                <li
                  key={topic.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{topic.name}</p>
                    <p className="text-xs text-ink-muted">
                      {topic._count.questions} questões publicadas
                    </p>
                  </div>
                  {topic._count.questions > 0 ? (
                    <StartSessionTemplate
                      topicId={topic.id}
                      kind={template.kind === 'review' ? 'review' : 'practice'}
                      label="Começar por este"
                    />
                  ) : (
                    <Badge tone="warning">sem questões</Badge>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {!rule.topicSlugs?.length && (
          <InlineMessage tone="info" title="Seleção dinâmica">
            Esta sessão monta os itens a partir do seu histórico, não de uma lista fixa. Use o botão
            abaixo para deixar a plataforma escolher.
          </InlineMessage>
        )}
      </Card>

      <div className="flex flex-wrap gap-3">
        {!rule.topicSlugs?.length && (
          <LinkButton
            href={template.kind === 'review' ? '/revisar' : '/praticar/rapido'}
            size="lg"
          >
            {template.kind === 'review' ? 'Ir para a fila de revisão' : 'Deixar a plataforma escolher'}
          </LinkButton>
        )}
        <LinkButton href="/praticar" variant="ghost">
          Ver outras sessões
        </LinkButton>
      </div>

      {nextTemplate && (
        <Card className="p-5">
          <p className="text-sm text-ink-secondary">
            Depois desta, a sugestão é:{' '}
            <Link
              href={`/praticar/sessao/${nextTemplate.slug}`}
              className="underline underline-offset-4 hover:text-ink-primary"
            >
              {nextTemplate.title}
            </Link>
          </p>
        </Card>
      )}
    </div>
  );
}

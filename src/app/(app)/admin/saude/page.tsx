import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { InlineMessage } from '@/components/ui/States';

export const metadata: Metadata = { title: 'Saúde do banco' };

/**
 * Tela de saúde do banco (§11.10).
 * Lista os nove indicadores exigidos, cada um com o caminho para resolver.
 */
export default async function DatabaseHealthPage() {
  const [
    topics,
    questionsWithoutExplanation,
    questionsWithoutSkill,
    reportedQuestions,
    inReview,
    byDifficulty,
    byArea,
    duplicateCandidates,
  ] = await Promise.all([
    prisma.topic.findMany({
      where: { status: 'published' },
      include: {
        area: { select: { shortName: true } },
        _count: {
          select: {
            questions: { where: { status: 'published' } },
            contentItems: { where: { status: 'published' } },
          },
        },
      },
      orderBy: { name: 'asc' },
    }),
    prisma.question.findMany({
      where: { explanation: null, status: { not: 'archived' } },
      select: { id: true, slug: true, stem: true },
      take: 25,
    }),
    prisma.question.findMany({
      where: { skillId: null, status: { not: 'archived' } },
      select: { id: true, slug: true, stem: true },
      take: 25,
    }),
    prisma.question.findMany({
      where: { reports: { some: { status: { in: ['open', 'reviewing'] } } } },
      select: { id: true, slug: true, stem: true, _count: { select: { reports: true } } },
      take: 25,
    }),
    prisma.question.count({ where: { status: 'reviewed' } }),
    prisma.question.groupBy({ by: ['difficulty'], _count: { difficulty: true } }),
    prisma.knowledgeArea.findMany({
      include: { _count: { select: { questions: { where: { status: 'published' } } } } },
      orderBy: { order: 'asc' },
    }),
    // Candidatas a duplicata: mesmo tópico, mesmo formato cognitivo e início igual.
    prisma.$queryRaw<{ topicId: string; cognitiveFormat: string; total: bigint }[]>`
      SELECT "topicId", "cognitiveFormat", COUNT(*) as total
      FROM "Question"
      WHERE status != 'archived'
      GROUP BY "topicId", "cognitiveFormat", substr(stem, 1, 60)
      HAVING COUNT(*) > 1
    `,
  ]);

  const withoutContent = topics.filter((topic) => topic._count.contentItems === 0);
  const fewQuestions = topics.filter((topic) => topic._count.questions < 5);

  const sections = [
    {
      title: 'Tópicos sem conteúdo',
      count: withoutContent.length,
      items: withoutContent.map((topic) => `${topic.name} (${topic.area.shortName})`),
      fix: 'Adicione ao menos um resumo e uma explicação antes de publicar o tópico.',
    },
    {
      title: 'Tópicos com menos de cinco questões',
      count: fewQuestions.length,
      items: fewQuestions.map((topic) => `${topic.name} — ${topic._count.questions} questão(ões)`),
      fix: 'Cada tópico completo precisa de pelo menos cinco questões em formatos cognitivos diferentes.',
    },
    {
      title: 'Questões sem explicação',
      count: questionsWithoutExplanation.length,
      items: questionsWithoutExplanation.map((question) => question.slug),
      fix: 'Publicação é bloqueada sem explicação. Escreva antes de mudar o estado editorial.',
    },
    {
      title: 'Questões sem habilidade classificada',
      count: questionsWithoutSkill.length,
      items: questionsWithoutSkill.map((question) => question.slug),
      fix: 'A habilidade é usada pela revisão espaçada para escolher itens equivalentes.',
    },
    {
      title: 'Questões possivelmente repetidas',
      count: duplicateCandidates.length,
      items: duplicateCandidates.map(
        (entry) => `${entry.cognitiveFormat} — ${Number(entry.total)} itens muito parecidos`,
      ),
      fix: 'Cinco questões que só trocam números não avaliam a mesma habilidade em contextos diferentes.',
    },
    {
      title: 'Questões denunciadas',
      count: reportedQuestions.length,
      items: reportedQuestions.map((question) => `${question.slug} — ${question._count.reports} denúncia(s)`),
      fix: 'Resolva as denúncias em Denúncias e registre a decisão.',
    },
    {
      title: 'Questões aguardando publicação',
      count: inReview,
      items: [],
      fix: 'Itens revisados que ainda não foram publicados.',
    },
  ];

  return (
    <div className="space-y-5">
      <InlineMessage tone="info">
        Esta tela existe para que a curadoria enxergue lacunas antes que o estudante as encontre.
      </InlineMessage>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Distribuição de dificuldade</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {byDifficulty.map((entry) => (
              <li key={entry.difficulty}>
                <Badge tone="neutral">
                  {entry.difficulty}: {entry._count.difficulty}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold">Cobertura por área</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {byArea.map((area) => (
              <li key={area.id} className="flex items-center justify-between gap-3">
                <span>{area.shortName}</span>
                <Badge tone={area._count.questions >= 10 ? 'green' : 'warning'}>
                  {area._count.questions} questões
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {sections.map((section) => (
        <Card key={section.title} className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <Badge tone={section.count === 0 ? 'green' : 'warning'}>{section.count}</Badge>
          </div>
          <p className="mt-1 text-sm text-ink-muted">{section.fix}</p>
          {section.items.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
              {section.items.slice(0, 10).map((item) => (
                <li key={item}>• {item}</li>
              ))}
              {section.items.length > 10 && (
                <li className="text-ink-muted">e mais {section.items.length - 10}…</li>
              )}
            </ul>
          )}
          {section.count === 0 && (
            <p className="mt-2 text-sm" style={{ color: 'var(--ck-success)' }}>
              Nada pendente aqui.
            </p>
          )}
        </Card>
      ))}

      <Link href="/admin/questoes" className="inline-block text-sm underline underline-offset-4">
        Ir para a lista de questões
      </Link>
    </div>
  );
}

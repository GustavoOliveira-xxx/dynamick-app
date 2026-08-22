import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { validateForPublication } from '@/lib/admin/actions';
import { QuestionEditor } from './QuestionEditor';
import { relativeDays } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Editar questão' };

export default async function AdminQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      options: { orderBy: { order: 'asc' } },
      explanation: true,
      topic: { select: { name: true, slug: true } },
      skill: { select: { name: true } },
      versions: { orderBy: { version: 'desc' }, take: 5 },
      reports: { where: { status: { in: ['open', 'reviewing'] } } },
      _count: { select: { attempts: true } },
    },
  });

  if (!question) notFound();

  const problems = await validateForPublication(question.id);

  return (
    <div className="space-y-5">
      <nav aria-label="Trilha" className="text-xs text-ink-muted">
        <Link href="/admin/questoes" className="underline underline-offset-4">
          Questões
        </Link>{' '}
        · {question.slug}
      </nav>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={question.status === 'published' ? 'green' : 'warning'}>{question.status}</Badge>
        <Badge tone="cyan">{question.topic.name}</Badge>
        <Badge tone="neutral">v{question.version}</Badge>
        <Badge tone="neutral">{question._count.attempts} tentativa(s)</Badge>
        {question.reports.length > 0 && (
          <Badge tone="danger">{question.reports.length} denúncia(s) aberta(s)</Badge>
        )}
      </div>

      <QuestionEditor
        question={{
          id: question.id,
          slug: question.slug,
          stem: question.stem,
          support: question.support,
          difficulty: question.difficulty,
          status: question.status,
          origin: question.origin,
          license: question.license,
          explanationSummary: question.explanation?.summary ?? '',
          skillName: question.skill?.name ?? null,
          attemptCount: question._count.attempts,
        }}
        options={question.options.map((option) => ({
          id: option.id,
          label: option.label,
          text: option.text,
          isCorrect: option.isCorrect,
          rationale: option.rationale,
        }))}
        publicationProblems={problems}
      />

      {question.versions.length > 0 && (
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Histórico de versões</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {question.versions.map((version) => (
              <li key={version.id} className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  v{version.version}
                  {version.changeNote ? ` — ${version.changeNote}` : ''}
                </span>
                <span className="text-xs text-ink-muted">{relativeDays(version.createdAt)}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

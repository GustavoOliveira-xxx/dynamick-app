import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { parseList, parseJson, parseRecord } from '@/lib/util/json';
import { EssayWorkspace } from './EssayWorkspace';
import { relativeDays } from '@/lib/util/format';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const prompt = await prisma.essayPrompt.findUnique({ where: { slug }, select: { title: true } });
  return { title: prompt?.title ?? 'Redação' };
}

export default async function EssayPromptPage({ params }: Params) {
  const { slug } = await params;
  const user = await requireUser(`/redacao/${slug}`);

  const prompt = await prisma.essayPrompt.findFirst({ where: { slug, status: 'published' } });
  if (!prompt) notFound();

  const essay = await prisma.essay.findFirst({
    where: { userId: user.id, promptId: prompt.id },
    orderBy: { updatedAt: 'desc' },
    include: { versions: { orderBy: { createdAt: 'desc' }, take: 5 } },
  });

  const motivating = parseJson<{ title: string; body: string; source: string }[]>(
    prompt.motivatingTexts,
    [],
  );

  return (
    <div className="space-y-6">
      <nav aria-label="Trilha" className="text-xs text-ink-muted">
        <Link href="/redacao" className="underline underline-offset-4">
          Redação
        </Link>{' '}
        · {prompt.title}
      </nav>

      <div>
        <Badge tone="cyan">{prompt.theme}</Badge>
        <h1 className="mt-3 text-2xl font-semibold">{prompt.title}</h1>
        <p className="mt-2 text-ink-secondary">{prompt.focus}</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Textos motivadores</h2>
        <p className="mt-1 text-xs text-ink-muted">
          Textos autorais, produzidos para este material. Não copie trechos na sua redação.
        </p>
        <div className="mt-4 space-y-4">
          {motivating.map((text) => (
            <div key={text.title} className="rounded-md border border-line p-4">
              <p className="text-sm font-medium">{text.title}</p>
              <p className="ck-reading mt-2 text-sm text-ink-secondary">{text.body}</p>
              <p className="mt-2 text-xs text-ink-muted">{text.source}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Comando de produção</h2>
        <p className="ck-reading mt-2 text-sm">{prompt.productionCommand}</p>
      </Card>

      <EssayWorkspace
        promptSlug={prompt.slug}
        planningQuestions={parseList(prompt.planningQuestions)}
        repertoire={parseList(prompt.repertoire)}
        argumentChecklist={parseList(prompt.argumentChecklist)}
        reviewChecklist={parseList(prompt.reviewChecklist)}
        essay={
          essay
            ? {
                id: essay.id,
                thesis: essay.thesis,
                outline: essay.outline,
                body: essay.body,
                status: essay.status,
                wordCount: essay.wordCount,
                checklistState: parseRecord<boolean>(essay.checklistState),
              }
            : null
        }
      />

      {essay && essay.versions.length > 0 && (
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Versões anteriores</h2>
          <ul className="mt-3 space-y-2">
            {essay.versions.map((version) => (
              <li key={version.id}>
                <details className="rounded-md border border-line p-3">
                  <summary className="cursor-pointer text-sm">
                    {version.wordCount} palavras · {relativeDays(version.createdAt)}
                  </summary>
                  <p className="ck-reading mt-2 whitespace-pre-line text-sm text-ink-secondary">
                    {version.body}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

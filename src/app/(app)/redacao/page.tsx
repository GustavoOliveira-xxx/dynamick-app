import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { InlineMessage, SeedContentNotice } from '@/components/ui/States';
import { relativeDays } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Redação' };

export default async function EssayHubPage() {
  const user = await requireUser('/redacao');

  const [prompts, essays] = await Promise.all([
    prisma.essayPrompt.findMany({ where: { status: 'published' }, orderBy: { title: 'asc' } }),
    prisma.essay.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: { prompt: { select: { title: true, slug: true } }, _count: { select: { versions: true } } },
    }),
  ]);

  const byPrompt = new Map(essays.map((essay) => [essay.promptId, essay]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Redação</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Oito propostas autorais para treino, com planejamento, rascunho, checklists e histórico de
          versões.
        </p>
      </div>

      <InlineMessage tone="info" title="Sobre estes temas">
        Estes recortes existem para treino. <strong>Não são previsões</strong> do tema da prova — e
        ninguém consegue prever. Também não há correção automática por IA nesta versão: o produto
        orienta você a construir a própria resposta.
      </InlineMessage>

      {essays.length > 0 && (
        <section aria-labelledby="minhas">
          <h2 id="minhas" className="text-lg font-semibold">
            Minhas redações
          </h2>
          <ul className="mt-3 space-y-2">
            {essays.map((essay) => (
              <li key={essay.id}>
                <Link href={`/redacao/${essay.prompt.slug}`}>
                  <Card interactive className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="font-medium">{essay.prompt.title}</p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        {essay.wordCount} palavras · {essay._count.versions} versão(ões) anteriores ·
                        atualizada {relativeDays(essay.updatedAt)}
                      </p>
                    </div>
                    <Badge tone={essay.status === 'submitted' ? 'green' : 'neutral'}>
                      {essay.status === 'submitted' ? 'Finalizada' : 'Rascunho'}
                    </Badge>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="temas">
        <h2 id="temas" className="text-lg font-semibold">
          Propostas disponíveis
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {prompts.map((prompt) => {
            const started = byPrompt.get(prompt.id);
            return (
              <li key={prompt.id}>
                <Link href={`/redacao/${prompt.slug}`} className="block h-full">
                  <Card interactive className="h-full p-5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium">{prompt.title}</p>
                      {started && <Badge tone="teal">iniciada</Badge>}
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wide text-ink-muted">{prompt.theme}</p>
                    <p className="mt-2 text-sm text-ink-secondary">{prompt.focus}</p>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <SeedContentNotice compact />
    </div>
  );
}

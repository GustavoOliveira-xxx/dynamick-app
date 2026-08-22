import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { DynamickLogo } from '@/components/brand/DynamickLogo';
import { DynamicBackground } from '@/components/visual/DynamicBackground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { InlineMessage } from '@/components/ui/States';
import { DemoSession } from './DemoSession';

export const metadata: Metadata = { title: 'Experimentar sem criar conta' };

/**
 * Sessão demonstrativa sem conta (§ etapa 0).
 * Usa questões autorais do seed. Nada é gravado: o visitante não tem conta e não
 * criamos nenhum registro no banco por causa desta página.
 */
export default async function TryPage() {
  const questions = await prisma.question.findMany({
    where: {
      status: 'published',
      isRecovery: false,
      slug: { in: ['q-interp-1', 'q-porc-1', 'q-eco-1'] },
    },
    include: {
      options: { orderBy: { order: 'asc' } },
      explanation: true,
      topic: { select: { name: true } },
    },
  });

  return (
    <>
      <DynamicBackground intensity="medium" />
      <div className="relative min-h-dvh" style={{ zIndex: 'var(--ck-z-content)' }}>
        <header className="ck-shell flex items-center justify-between py-5">
          <Link href="/" aria-label="Voltar para a página inicial">
            <DynamickLogo variant="compact" />
          </Link>
          <Link
            href="/criar-conta"
            className="text-sm underline underline-offset-4 hover:text-ink-primary"
          >
            Criar conta
          </Link>
        </header>

        <main id="conteudo-principal" className="ck-shell max-w-2xl pb-16">
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-semibold">Uma sessão de 3 questões</h1>
              <p className="mt-2 text-sm text-ink-secondary">
                Sem cadastro e sem gravar nada. É só para você ver como a correção funciona.
              </p>
            </div>

            <InlineMessage tone="info">
              Estas são <strong>questões autorais</strong> criadas para demonstração. Na plataforma,
              a escolha das questões depende do seu histórico — aqui elas são fixas.
            </InlineMessage>

            {questions.length === 0 ? (
              <InlineMessage tone="warning">
                A base de demonstração ainda não foi carregada. Execute <code>npm run db:seed</code>.
              </InlineMessage>
            ) : (
              <DemoSession
                questions={questions.map((question) => ({
                  id: question.id,
                  stem: question.stem,
                  support: question.support,
                  topicName: question.topic.name,
                  options: question.options.map((option) => ({
                    id: option.id,
                    label: option.label,
                    text: option.text,
                    isCorrect: option.isCorrect,
                    rationale: option.rationale,
                  })),
                  explanation: question.explanation?.summary ?? '',
                }))}
              />
            )}
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}

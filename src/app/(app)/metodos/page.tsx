import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { InlineMessage } from '@/components/ui/States';
import { getProfile } from '@/lib/profile/profiles';
import { parseList } from '@/lib/util/json';
import { formatMinutes } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Formas de estudar' };

/**
 * Biblioteca de métodos de estudo (§11.5).
 * Nenhum método é apresentado como solução universal — todos declaram limitações,
 * e a recomendação por perfil nunca impede a escolha manual.
 */
export default async function StudyMethodsPage() {
  const user = await requireUser('/metodos');

  const [methods, profile] = await Promise.all([
    prisma.studyMethod.findMany({ orderBy: { order: 'asc' } }),
    prisma.studyProfile.findUnique({ where: { userId: user.id } }),
  ]);

  const definition = getProfile(profile?.activeProfile);
  const availableMinutes = profile?.sessionMinutes ?? 20;

  /**
   * Recomendação por perfil e tempo — apenas uma sugestão de ordem.
   * Todos os métodos continuam visíveis e acessíveis.
   */
  const recommendedSlugs = new Set(
    [
      definition.personalization.mix.review >= 30 ? 'revisao-espacada' : null,
      definition.personalization.baseMinutes <= 20 ? 'sessao-de-foco-curto' : null,
      definition.personalization.mix.practice >= 50 ? 'pratica-intercalada' : null,
      definition.personalization.initialDifficulty === 'intro' ? 'estudo-ativo' : null,
      definition.personalization.timer === 'timed' ? 'simulado-com-analise' : null,
      'caderno-de-erros',
    ].filter((slug): slug is string => Boolean(slug)),
  );

  const sorted = [...methods].sort((a, b) => {
    const aRec = recommendedSlugs.has(a.slug) ? 0 : 1;
    const bRec = recommendedSlugs.has(b.slug) ? 0 : 1;
    if (aRec !== bRec) return aRec - bRec;
    return a.order - b.order;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Formas de estudar</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Métodos curtos, com quando usar, como fazer e — principalmente — onde cada um deixa a
          desejar.
        </p>
      </div>

      <InlineMessage tone="info" title="Nenhum método serve para tudo">
        Marcamos alguns como sugeridos para o seu perfil ({definition.name}) e para o seu tempo
        disponível ({formatMinutes(availableMinutes)}). Isso é ordem de exibição, não restrição:
        você pode usar qualquer um.
      </InlineMessage>

      <ul className="space-y-4">
        {sorted.map((method) => {
          const steps = parseList(method.steps);
          const topics = parseList(method.suitableTopics);
          const recommended = recommendedSlugs.has(method.slug);
          const fitsTime = method.minutes <= availableMinutes;

          return (
            <li key={method.id}>
              <Card className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{method.title}</h2>
                      {recommended && <Badge tone="green">sugerido para você</Badge>}
                      <Badge tone={fitsTime ? 'teal' : 'warning'}>
                        {formatMinutes(method.minutes)}
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-ink-secondary">{method.summary}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Como funciona
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-secondary">{method.howItWorks}</p>

                    <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Quando usar
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-secondary">{method.whenToUse}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Passos
                    </h3>
                    <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-sm text-ink-secondary">
                      {steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-5 rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Exemplo
                  </p>
                  <p className="mt-1 text-sm text-ink-secondary">{method.example}</p>
                </div>

                {/* A limitação é parte obrigatória: nenhum método é vendido como universal. */}
                <div
                  className="mt-3 rounded-md border-l-2 p-3.5"
                  style={{ borderColor: 'var(--ck-warning)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Onde este método falha
                  </p>
                  <p className="mt-1 text-sm text-ink-secondary">{method.limitations}</p>
                </div>

                {topics.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Combina bem com
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {topics.map((slug) => (
                        <li key={slug}>
                          <Link
                            href={`/conteudos/${slug}`}
                            className="inline-flex min-h-[36px] items-center rounded-pill border border-line px-3 text-sm hover:border-[color:var(--ck-green-primary)]"
                          >
                            {slug.replace(/-/g, ' ')}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

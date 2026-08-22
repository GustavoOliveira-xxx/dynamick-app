import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { formatMinutes, percent, relativeDays } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Simulados' };

export default async function SimulationsPage() {
  const user = await requireUser('/simulados');

  const [simulations, runs] = await Promise.all([
    prisma.simulation.findMany({ where: { status: 'published' }, orderBy: { questionCount: 'asc' } }),
    prisma.simulationRun.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: { simulation: { select: { title: true } } },
    }),
  ]);

  const inProgress = runs.find((run) => !run.submittedAt);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Simulados</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          O que ensina não é o simulado: é a análise depois dele. Todo resultado aqui vem com
          desempenho por área, tópico, habilidade e tempo.
        </p>
      </div>

      {inProgress && (
        <InlineMessage tone="info" title="Você tem um simulado em andamento">
          <p>{inProgress.simulation.title} — o progresso foi salvo.</p>
          <Link
            href={`/sessao/${inProgress.sessionId}?comecar=sim`}
            className="mt-2 inline-block underline underline-offset-4"
          >
            Retomar de onde parei
          </Link>
        </InlineMessage>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {simulations.map((simulation) => (
          <li key={simulation.id}>
            <Card className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-medium">{simulation.title}</h2>
                <Badge tone={simulation.kind === 'diagnostic' ? 'lime' : 'cyan'}>
                  {simulation.questionCount} questões
                </Badge>
              </div>
              <p className="mt-1.5 flex-1 text-sm text-ink-secondary">{simulation.description}</p>
              <p className="mt-2 text-xs text-ink-muted">{formatMinutes(simulation.minutes)}</p>
              <LinkButton
                href={`/simulados/${simulation.slug}`}
                variant="secondary"
                size="sm"
                className="mt-3 self-start"
              >
                Ver e configurar
              </LinkButton>
            </Card>
          </li>
        ))}
      </ul>

      {runs.filter((run) => run.submittedAt).length > 0 && (
        <section aria-labelledby="historico">
          <h2 id="historico" className="text-lg font-semibold">
            Seus simulados anteriores
          </h2>
          <ul className="mt-3 space-y-2">
            {runs
              .filter((run) => run.submittedAt)
              .map((run) => (
                <li key={run.id}>
                  <Link href={`/simulados/resultado/${run.id}`}>
                    <Card interactive className="flex flex-wrap items-center justify-between gap-3 p-4">
                      <div>
                        <p className="font-medium">{run.simulation.title}</p>
                        <p className="mt-0.5 text-xs text-ink-muted">
                          {relativeDays(run.submittedAt)} · {run.timed ? 'cronometrado' : 'sem pressão'}
                        </p>
                      </div>
                      <Badge tone="neutral">
                        {run.score}/{run.totalItems} ({percent(run.score, Math.max(1, run.totalItems))}%)
                      </Badge>
                    </Card>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}

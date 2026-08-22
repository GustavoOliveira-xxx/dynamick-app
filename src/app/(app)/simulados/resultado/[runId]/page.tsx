import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { LinkButton } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { parseJson } from '@/lib/util/json';
import { formatSeconds, percent } from '@/lib/util/format';
import { ERROR_REASON_LABELS, type ErrorReason } from '@/lib/domain';
import { getMainRecommendation } from '@/lib/session/service';

export const metadata: Metadata = { title: 'Resultado do simulado' };

type Analysis = {
  byArea: Record<string, { correct: number; total: number }>;
  byTopic: Record<string, { correct: number; total: number }>;
  bySkill: Record<string, { correct: number; total: number }>;
  time: { totalMs: number; medianMs: number; slowestMs: number; answered: number };
  errorReasons: { reason: string; count: number }[];
};

/** Resultado do simulado (§11.7): análise, não apenas pontuação. */
export default async function SimulationResultPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  const user = await requireUser(`/simulados/resultado/${runId}`);

  const run = await prisma.simulationRun.findFirst({
    where: { id: runId, userId: user.id },
    include: { simulation: { select: { title: true, slug: true } } },
  });
  if (!run) notFound();

  const analysis = parseJson<Analysis>(run.analysis, {
    byArea: {},
    byTopic: {},
    bySkill: {},
    time: { totalMs: 0, medianMs: 0, slowestMs: 0, answered: 0 },
    errorReasons: [],
  });

  const recommendation = await getMainRecommendation(user.id);
  const accuracy = percent(run.score, Math.max(1, run.totalItems));

  const weakestTopics = Object.entries(analysis.byTopic)
    .filter(([, value]) => value.total > 0)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <nav aria-label="Trilha" className="text-xs text-ink-muted">
          <Link href="/simulados" className="underline underline-offset-4">
            Simulados
          </Link>{' '}
          · Resultado
        </nav>
        <h1 className="mt-2 text-2xl font-semibold">{run.simulation.title}</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          {run.score} de {run.totalItems} ({accuracy}%) ·{' '}
          {run.timed ? 'cronometrado' : 'sem pressão'}
        </p>
      </div>

      {run.fallbackNote && (
        <InlineMessage tone="warning" title="Sobre a composição deste simulado">
          {run.fallbackNote}
        </InlineMessage>
      )}

      <Card className="p-6">
        <Progress value={run.score} max={Math.max(1, run.totalItems)} label={`${run.score} de ${run.totalItems}`} />
        <p className="mt-3 text-sm text-ink-secondary">
          Este número descreve seu desempenho neste conjunto de questões. Ele não é uma previsão de
          nota no ENEM.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Por área</h2>
          <ul className="mt-3 space-y-2.5">
            {Object.entries(analysis.byArea).map(([area, value]) => (
              <li key={area}>
                <div className="flex items-center justify-between text-sm">
                  <span>{area}</span>
                  <span className="text-ink-muted">
                    {value.correct}/{value.total}
                  </span>
                </div>
                <div className="mt-1">
                  <Progress
                    value={value.correct}
                    max={Math.max(1, value.total)}
                    label={`${area}: ${value.correct} de ${value.total}`}
                    size="sm"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold">Análise de tempo</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-secondary">
            <li>
              Tempo total registrado:{' '}
              <strong className="text-ink-primary">
                {formatSeconds(Math.round(analysis.time.totalMs / 1000))}
              </strong>
            </li>
            <li>
              Mediana por questão:{' '}
              <strong className="text-ink-primary">
                {formatSeconds(Math.round(analysis.time.medianMs / 1000))}
              </strong>
            </li>
            <li>
              Questão mais demorada:{' '}
              <strong className="text-ink-primary">
                {formatSeconds(Math.round(analysis.time.slowestMs / 1000))}
              </strong>
            </li>
          </ul>
          {analysis.time.slowestMs > analysis.time.medianMs * 3 && analysis.time.medianMs > 0 && (
            <p className="mt-3 text-sm text-ink-secondary">
              Uma questão consumiu mais de três vezes a sua mediana. Em prova, reconhecer cedo esse
              tipo de item e voltar depois costuma render mais pontos.
            </p>
          )}
        </Card>
      </div>

      {Object.keys(analysis.bySkill).length > 0 && (
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Por habilidade</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {Object.entries(analysis.bySkill).map(([skill, value]) => (
              <li key={skill} className="flex items-center justify-between gap-3">
                <span className="min-w-0 flex-1">{skill}</span>
                <Badge tone={value.correct === value.total ? 'green' : 'neutral'}>
                  {value.correct}/{value.total}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {analysis.errorReasons.length > 0 && (
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Erros recorrentes</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {analysis.errorReasons.map((entry) => (
              <li key={entry.reason} className="flex items-center justify-between gap-3">
                <span>{ERROR_REASON_LABELS[entry.reason as ErrorReason] ?? entry.reason}</span>
                <Badge tone="warning">{entry.count}×</Badge>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Recomendação depois deste simulado</h2>
        {weakestTopics.length > 0 && (
          <p className="mt-2 text-sm text-ink-secondary">
            Os tópicos com menor aproveitamento foram:{' '}
            {weakestTopics.map(([topic]) => topic).join(', ')}.
          </p>
        )}
        {recommendation && (
          <p className="mt-2 text-sm text-ink-secondary">{recommendation.reason}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <LinkButton href="/revisar">Ir para a revisão</LinkButton>
          <LinkButton href="/inicio" variant="secondary">
            Voltar ao início
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}

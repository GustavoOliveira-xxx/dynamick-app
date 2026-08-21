import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { summarizeSession } from '@/lib/session/service';
import { getMainRecommendation } from '@/lib/session/service';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { InlineMessage } from '@/components/ui/States';
import { ERROR_REASON_LABELS, type ErrorReason } from '@/lib/domain';
import { formatSeconds, percent } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Resumo da sessão' };

/**
 * Resultado da sessão (§ etapa 9).
 * Resumo sem excesso de números, com o próximo passo sempre visível.
 * Diferencia acerto com confiança, com dúvida e após troca de alternativa.
 */
export default async function SessionResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser(`/sessao/${id}/resultado`);

  const session = await prisma.studySession.findFirst({
    where: { id, userId: user.id },
    include: { items: { select: { id: true, flagged: true } } },
  });
  if (!session) notFound();

  const [summary, recommendation, previousSessions] = await Promise.all([
    summarizeSession(session.id),
    getMainRecommendation(user.id),
    prisma.studySession.findMany({
      where: {
        userId: user.id,
        status: 'completed',
        id: { not: session.id },
        completedAt: { not: null },
      },
      orderBy: { completedAt: 'desc' },
      take: 3,
      include: { attempts: { select: { isCorrect: true } } },
    }),
  ]);

  const accuracy = percent(summary.correct, Math.max(1, summary.answered));
  const previousAccuracy =
    previousSessions.length > 0
      ? Math.round(
          previousSessions.reduce((total, item) => {
            const answered = item.attempts.length || 1;
            return total + (item.attempts.filter((a) => a.isCorrect).length / answered) * 100;
          }, 0) / previousSessions.length,
        )
      : null;

  const evolution =
    previousAccuracy !== null ? accuracy - previousAccuracy : null;

  return (
    <div className="ck-enter space-y-6">
      <div>
        <Badge tone="green">Sessão concluída</Badge>
        <h1 className="mt-3 text-2xl font-semibold">{session.title}</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          {summary.answered} de {session.items.length} questões respondidas em{' '}
          {formatSeconds(Math.round(summary.totalTimeMs / 1000))}.
        </p>
      </div>

      <Card className="p-6">
        <Progress
          value={summary.correct}
          max={Math.max(1, summary.answered)}
          label={`${summary.correct} acertos de ${summary.answered}`}
        />
        <p className="mt-3 text-sm text-ink-secondary">
          {summary.correct} acerto(s) e {summary.wrong} erro(s).
        </p>

        {/* A diferenciação exigida pela § etapa 9 */}
        {summary.correct > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-ink-secondary">
            {summary.correctWithConfidence > 0 && (
              <li>
                • <strong className="text-ink-primary">{summary.correctWithConfidence}</strong>{' '}
                acertou com confiança
              </li>
            )}
            {summary.correctWithDoubt > 0 && (
              <li>
                • <strong className="text-ink-primary">{summary.correctWithDoubt}</strong> acertou
                com dúvida — vale voltar nesses
              </li>
            )}
            {summary.correctAfterChange > 0 && (
              <li>
                • <strong className="text-ink-primary">{summary.correctAfterChange}</strong> acertou
                depois de mudar de alternativa
              </li>
            )}
          </ul>
        )}

        {evolution !== null && (
          <p className="mt-4 text-sm text-ink-secondary">
            {evolution > 3
              ? `Melhor que a média das suas últimas sessões (${previousAccuracy}%).`
              : evolution < -3
                ? `Abaixo da média das suas últimas sessões (${previousAccuracy}%). Isso acontece — o conteúdo pode ter sido mais difícil.`
                : `Em linha com as suas últimas sessões (${previousAccuracy}%).`}
          </p>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Tópicos praticados</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {summary.topics.map((topic) => (
              <li key={topic.name} className="flex items-center justify-between gap-3">
                <span>{topic.name}</span>
                <Badge tone={topic.correct === topic.total ? 'green' : 'neutral'}>
                  {topic.correct}/{topic.total}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold">Onde a dificuldade apareceu</h2>
          {summary.errorReasons.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {summary.errorReasons.map((entry) => (
                <li key={entry.reason} className="flex items-center justify-between gap-3">
                  <span>{ERROR_REASON_LABELS[entry.reason as ErrorReason] ?? entry.reason}</span>
                  <Badge tone="warning">{entry.count}×</Badge>
                </li>
              ))}
            </ul>
          ) : summary.wrong > 0 ? (
            <p className="mt-3 text-sm text-ink-secondary">
              Você não registrou o motivo dos erros. Isso ajuda a plataforma a escolher o que
              oferecer em seguida.
            </p>
          ) : (
            <p className="mt-3 text-sm text-ink-secondary">Nenhum erro nesta sessão.</p>
          )}
        </Card>
      </div>

      {summary.flagged > 0 && (
        <InlineMessage tone="info">
          Você marcou {summary.flagged} questão(ões) para revisar depois. Elas estão na sua fila de
          revisão.
        </InlineMessage>
      )}

      {/* Próximo passo — sempre presente */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Próximo passo</h2>
        {recommendation ? (
          <>
            <p className="mt-2 text-sm text-ink-secondary">{recommendation.reason}</p>
            <p className="mt-3 font-medium">{recommendation.topicName}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <LinkButton href="/inicio">Ver no meu início</LinkButton>
              <LinkButton href="/revisar" variant="secondary">
                Ir para a revisão
              </LinkButton>
            </div>
          </>
        ) : (
          <div className="mt-3 flex flex-wrap gap-3">
            <LinkButton href="/conteudos">Escolher outro assunto</LinkButton>
            <LinkButton href="/inicio" variant="secondary">
              Voltar ao início
            </LinkButton>
          </div>
        )}
      </Card>

      <p className="text-xs text-ink-muted">
        Nenhum número aqui prevê sua nota no ENEM.{' '}
        <Link href="/perfil/relatorio" className="underline underline-offset-4">
          Ver meu progresso ao longo do tempo
        </Link>
      </p>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { LinkButton } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { ERROR_REASON_LABELS, MASTERY_LABELS, type ErrorReason, type MasteryState } from '@/lib/domain';
import { percent, relativeDays } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Meu progresso' };

/**
 * Relatório do estudante (§5.14).
 * Compreensível, com poucos números — e cada bloco tem uma ação associada (§14:
 * "não crie um dashboard cheio de gráficos sem ações").
 */
export default async function ReportPage() {
  const user = await requireUser('/perfil/relatorio');

  const [mastery, attempts, errorReasons, sessions] = await Promise.all([
    prisma.topicMastery.findMany({
      where: { userId: user.id },
      include: { topic: { select: { name: true, slug: true, id: true, area: { select: { shortName: true } } } } },
      orderBy: { score: 'desc' },
    }),
    prisma.attempt.count({ where: { userId: user.id } }),
    prisma.errorClassification.groupBy({
      by: ['reason'],
      where: { attempt: { userId: user.id } },
      _count: { reason: true },
    }),
    prisma.studySession.count({ where: { userId: user.id, status: 'completed' } }),
  ]);

  if (attempts === 0) {
    return (
      <EmptyState
        title="Seu progresso aparece aqui depois da primeira sessão"
        description="A gente só mostra números quando eles significam alguma coisa. Uma questão não diz nada ainda."
        actionLabel="Começar a praticar"
        actionHref="/praticar"
        icon="◔"
      />
    );
  }

  const consolidated = mastery.filter((item) => item.state === 'consolidated');
  const needsReview = mastery.filter((item) => item.state === 'needs_review');
  const practicing = mastery.filter((item) => item.state === 'practicing');
  const totalCorrect = mastery.reduce((sum, item) => sum + item.correctCount, 0);
  const totalAttempts = mastery.reduce((sum, item) => sum + item.attemptCount, 0);

  const topReason = errorReasons.sort((a, b) => b._count.reason - a._count.reason)[0];

  return (
    <div className="space-y-6">
      <div>
        <nav aria-label="Trilha" className="text-xs text-ink-muted">
          <Link href="/perfil" className="underline underline-offset-4 hover:text-ink-primary">
            Perfil
          </Link>{' '}
          · Meu progresso
        </nav>
        <h1 className="mt-2 text-2xl font-semibold">Meu progresso</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          {sessions} sessão(ões) concluída(s) e {totalAttempts} questão(ões) respondida(s).
        </p>
      </div>

      {/* Bloco 1: uma frase e uma prioridade, não cinco gráficos */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Onde você está</h2>
        <p className="mt-2 text-ink-secondary">
          Você acertou {totalCorrect} de {totalAttempts} questões ({percent(totalCorrect, Math.max(1, totalAttempts))}%).{' '}
          {consolidated.length > 0
            ? `${consolidated.length} tópico(s) já mostram domínio consistente.`
            : 'Nenhum tópico está consolidado ainda — isso exige acertos em questões e sessões diferentes.'}
        </p>

        {needsReview.length > 0 && (
          <div className="mt-4 rounded-md border-l-2 p-3" style={{ borderColor: 'var(--ck-warning)' }}>
            <p className="text-sm">
              <strong>Prioridade agora:</strong> {needsReview[0]!.topic.name}
              {needsReview.length > 1 ? ` e mais ${needsReview.length - 1} tópico(s)` : ''}.
            </p>
            <LinkButton href="/revisar" size="sm" variant="secondary" className="mt-3">
              Ir para a revisão
            </LinkButton>
          </div>
        )}
      </Card>

      {/* Bloco 2: padrão de erro com ação */}
      {topReason && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Seu padrão de dificuldade</h2>
          <p className="mt-2 text-ink-secondary">
            O motivo que mais aparece nos seus erros é{' '}
            <strong>
              {(ERROR_REASON_LABELS[topReason.reason as ErrorReason] ?? topReason.reason).toLowerCase()}
            </strong>{' '}
            ({topReason._count.reason} vez(es)).
          </p>
          <p className="mt-2 text-sm text-ink-secondary">
            {topReason.reason === 'interpretation'
              ? 'Vale praticar leitura guiada: ler o comando antes do texto e ancorar cada alternativa em uma passagem.'
              : topReason.reason === 'unknown_content'
                ? 'Vale voltar ao conteúdo antes de acumular mais questões desse tópico.'
                : topReason.reason === 'time'
                  ? 'Vale treinar ritmo com sessões cronometradas curtas antes de simulados completos.'
                  : topReason.reason === 'attention'
                    ? 'Vale reler o comando da questão antes de marcar — erros de atenção somem com uma checagem rápida.'
                    : 'Vale registrar o motivo em cada erro para o padrão ficar mais claro.'}
          </p>
          <LinkButton href="/revisar/caderno" size="sm" variant="secondary" className="mt-3">
            Ver meu caderno de erros
          </LinkButton>
        </Card>
      )}

      {/* Bloco 3: mapa por tópico */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Por tópico</h2>
        <ul className="mt-4 space-y-3">
          {mastery.map((item) => (
            <li key={item.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/conteudos/${item.topic.slug}`}
                  className="text-sm font-medium underline-offset-4 hover:underline"
                >
                  {item.topic.name}
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-muted">{item.topic.area.shortName}</span>
                  <Badge
                    tone={
                      item.state === 'consolidated'
                        ? 'green'
                        : item.state === 'needs_review'
                          ? 'warning'
                          : 'neutral'
                    }
                  >
                    {MASTERY_LABELS[item.state as MasteryState]}
                  </Badge>
                </div>
              </div>
              <div className="mt-1.5">
                <Progress
                  value={item.score}
                  label={`${item.topic.name}: ${item.score} de 100`}
                  size="sm"
                  tone={item.state === 'needs_review' ? 'warning' : 'green'}
                />
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                {item.correctCount}/{item.attemptCount} corretas · {item.distinctSessions} sessão(ões) ·
                última prática {relativeDays(item.lastPracticedAt)}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {practicing.length > 0 && (
        <Card className="p-5">
          <h2 className="text-base font-semibold">Quase lá</h2>
          <p className="mt-1 text-sm text-ink-secondary">
            {practicing.length} tópico(s) precisam de acertos em mais uma sessão para serem
            considerados consolidados. Um tópico nunca é consolidado por uma questão só.
          </p>
        </Card>
      )}

      <p className="text-xs text-ink-muted">
        Nenhum número nesta página é previsão de nota no ENEM. São indicadores do seu histórico
        dentro da plataforma.
      </p>
    </div>
  );
}

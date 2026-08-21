import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import {
  getAlternativeRecommendations,
  getMainRecommendation,
  getResumableSession,
} from '@/lib/session/service';
import { getProfile } from '@/lib/profile/profiles';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { EmptyState, InlineMessage } from '@/components/ui/States';
import { formatMinutes, relativeDays, startOfWeek, WEEKDAY_LABELS } from '@/lib/util/format';
import { SESSION_KIND_LABELS } from '@/lib/domain';
import { StartRecommendedSession } from './StartRecommendedSession';

export const metadata: Metadata = { title: 'Início' };

/**
 * Dashboard diário (§ etapa 4).
 * Uma recomendação principal. Outras opções existem, mas não competem visualmente.
 */
export default async function DashboardPage() {
  const user = await requireUser('/inicio');

  const [recommendation, alternatives, resumable, dueReviews, lastSession, plan, profile] =
    await Promise.all([
      getMainRecommendation(user.id),
      getAlternativeRecommendations(user.id, 3),
      getResumableSession(user.id),
      prisma.reviewItem.count({ where: { userId: user.id, status: 'pending', dueAt: { lte: new Date() } } }),
      prisma.studySession.findFirst({
        where: { userId: user.id, status: 'completed' },
        orderBy: { completedAt: 'desc' },
        include: { _count: { select: { attempts: true } }, attempts: { select: { isCorrect: true } } },
      }),
      prisma.studyPlan.findUnique({
        where: { userId_weekStart: { userId: user.id, weekStart: startOfWeek() } },
        include: { blocks: { orderBy: [{ dayOfWeek: 'asc' }, { order: 'asc' }] } },
      }),
      prisma.studyProfile.findUnique({ where: { userId: user.id } }),
    ]);

  const profileDefinition = getProfile(profile?.activeProfile);
  const direction = profileDefinition.personalization.dashboardDirection;
  const firstName = user.name.split(' ')[0];

  const weekDone = plan?.blocks.filter((block) => block.status === 'done').length ?? 0;
  const weekTotal = plan?.blocks.length ?? 0;

  const needsOnboarding =
    profile?.onboardingStatus === 'skipped' || profile?.onboardingStatus === 'not_started';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Olá, {firstName}</h1>
          <p className="mt-1 text-sm text-ink-secondary">
            {profileDefinition.description}{' '}
            <Link href="/perfil/estudo" className="underline underline-offset-4 hover:text-ink-primary">
              Ver meu perfil de estudo
            </Link>
          </p>
        </div>
        {profile?.provisional && <Badge tone="warning">Perfil provisório</Badge>}
      </div>

      {needsOnboarding && (
        <InlineMessage tone="info" title="Complete seu perfil quando quiser">
          <p>
            Sem as suas respostas, as recomendações ficam genéricas. São 3 perguntas obrigatórias,
            cerca de 2 minutos.
          </p>
          <Link
            href="/onboarding"
            className="mt-2 inline-block underline underline-offset-4 hover:text-ink-primary"
          >
            Completar meu perfil de estudo
          </Link>
        </InlineMessage>
      )}

      {/* Sessão interrompida tem prioridade sobre qualquer recomendação nova */}
      {resumable && (
        <Card className="border-l-2 p-5" as="section">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge tone="teal">Sessão em andamento</Badge>
              <h2 className="mt-2 text-lg font-semibold">{resumable.title}</h2>
              <p className="mt-1 text-sm text-ink-secondary">
                {resumable.items.filter((item) => item.status === 'answered').length} de{' '}
                {resumable.items.length} questões respondidas · começou{' '}
                {relativeDays(resumable.startedAt)}
              </p>
            </div>
            <LinkButton href={`/sessao/${resumable.id}`}>Retomar de onde parei</LinkButton>
          </div>
        </Card>
      )}

      {/* Recomendação principal — uma só */}
      {recommendation ? (
        <Card
          className="p-6"
          as="section"
          // Direção alta destaca visualmente; direção baixa mantém discreto (§ etapa D).
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="green">
              {direction === 'high' ? 'Sua próxima sessão' : 'Sugestão de hoje'}
            </Badge>
            <Badge tone="teal">{SESSION_KIND_LABELS[recommendation.kind]}</Badge>
            <Badge tone="cyan">{formatMinutes(recommendation.minutes)}</Badge>
          </div>

          <h2 className={`mt-4 font-semibold ${direction === 'high' ? 'text-2xl' : 'text-xl'}`}>
            {recommendation.topicName}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            {recommendation.areaName} · {recommendation.subjectName} ·{' '}
            {recommendation.questionCount} questões
          </p>

          {/* Justificativa legível — sempre presente (§7 regra 9) */}
          <p className="ck-reading mt-4 text-[0.95rem] text-ink-secondary">
            <span className="font-medium text-ink-primary">Por que isso agora: </span>
            {recommendation.reason}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StartRecommendedSession
              topicId={recommendation.topicId}
              kind={recommendation.kind}
              size={direction === 'high' ? 'lg' : 'md'}
            />
            <LinkButton
              href={`/conteudos/${recommendation.topicId}`}
              variant="ghost"
              size="sm"
            >
              Ver o tópico antes
            </LinkButton>
          </div>
        </Card>
      ) : (
        <EmptyState
          title="Ainda não temos o que recomendar"
          description="Escolha um assunto no mapa de conteúdos para a gente começar a entender como você estuda."
          actionLabel="Explorar conteúdos"
          actionHref="/conteudos"
        />
      )}

      {/* Três entradas da § etapa 5 */}
      <section aria-labelledby="entradas" className="grid gap-3 sm:grid-cols-3">
        <h2 id="entradas" className="sr-only">
          Como você quer estudar
        </h2>
        {[
          { href: '/praticar', title: 'Continuar meu plano', hint: 'Seguir a sequência da semana' },
          { href: '/conteudos', title: 'Escolher um assunto', hint: 'Ver o mapa completo' },
          { href: '/praticar/rapido', title: 'Tenho pouco tempo', hint: 'Sessão de 10 minutos' },
        ].map((entry) => (
          <Link key={entry.href} href={entry.href} className="block">
            <Card interactive className="h-full p-4">
              <p className="font-medium">{entry.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{entry.hint}</p>
            </Card>
          </Link>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revisão pendente */}
        <Card className="p-5" as="section">
          <h2 className="text-lg font-semibold">Revisão</h2>
          {dueReviews > 0 ? (
            <>
              <p className="mt-2 text-sm text-ink-secondary">
                Você tem {dueReviews} item(ns) no ponto de revisar. Cada um vem com uma questão
                diferente da original.
              </p>
              <LinkButton href="/revisar" variant="secondary" size="sm" className="mt-4">
                Revisar agora
              </LinkButton>
            </>
          ) : (
            <p className="mt-2 text-sm text-ink-secondary">
              Nada pendente agora. Quando você errar algo, ele volta aqui no momento certo.
            </p>
          )}
        </Card>

        {/* Progresso da semana */}
        <Card className="p-5" as="section">
          <h2 className="text-lg font-semibold">Sua semana</h2>
          {weekTotal > 0 ? (
            <div className="mt-3 space-y-3">
              <Progress
                value={weekDone}
                max={weekTotal}
                label={`Progresso da semana: ${weekDone} de ${weekTotal} blocos`}
              />
              <p className="text-sm text-ink-secondary">
                {weekDone} de {weekTotal} blocos concluídos. Se perder um dia, o plano se ajusta —
                sem cobrança.
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {plan?.blocks.map((block) => (
                  <li key={block.id}>
                    <Badge tone={block.status === 'done' ? 'green' : 'neutral'}>
                      {WEEKDAY_LABELS[block.dayOfWeek]} · {SESSION_KIND_LABELS[block.kind as 'learn']}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-2 text-sm text-ink-secondary">
              Seu plano da semana aparece aqui depois da primeira sessão.
            </p>
          )}
        </Card>
      </div>

      {/* Resumo da última sessão */}
      {lastSession && (
        <Card className="p-5" as="section">
          <h2 className="text-lg font-semibold">Última sessão</h2>
          <p className="mt-2 text-sm text-ink-secondary">
            {lastSession.title} · {relativeDays(lastSession.completedAt)} ·{' '}
            {lastSession.attempts.filter((attempt) => attempt.isCorrect).length} de{' '}
            {lastSession._count.attempts} corretas
          </p>
          <Link
            href={`/sessao/${lastSession.id}/resultado`}
            className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-ink-primary"
          >
            Ver o resumo completo
          </Link>
        </Card>
      )}

      {/* Alternativas — discretas, não competem com a principal */}
      {alternatives.length > 0 && (
        <section aria-labelledby="outras">
          <h2 id="outras" className="text-sm font-medium uppercase tracking-wide text-ink-muted">
            Outras opções, se preferir
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {alternatives.map((item) => (
              <li key={item.topicId}>
                <Link href={`/conteudos/${item.topicId}`} className="block">
                  <Card interactive className="h-full p-4">
                    <p className="text-xs text-ink-muted">{item.areaName}</p>
                    <p className="mt-1 font-medium">{item.topicName}</p>
                    <p className="mt-2 text-xs text-ink-secondary">{item.reason}</p>
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

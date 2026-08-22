import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { getProfile } from '@/lib/profile/profiles';
import { getMainRecommendation } from '@/lib/session/service';
import { rebuildWeeklyPlan } from '@/lib/profile/actions';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { formatMinutes } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Tudo pronto' };

/**
 * Resumo pós-confirmação (§19.1).
 * Mostra os sete itens exigidos: perfil escolhido, duração sugerida, proporção
 * aprender/praticar/revisar, questões por sessão, nível de direção do dashboard,
 * primeira atividade recomendada e o caminho para editar tudo depois.
 */
export default async function OnboardingSummaryPage() {
  const user = await requireUser('/onboarding/resumo');

  const profile = await prisma.studyProfile.findUnique({ where: { userId: user.id } });
  // Quem cai aqui sem ter confirmado o perfil volta para a confirmação.
  if (!profile?.confirmedAt) redirect('/onboarding/perfil');

  // O plano da semana é montado agora, para o estudante já sair com ele pronto.
  await rebuildWeeklyPlan(user.id);

  const definition = getProfile(profile.activeProfile);
  const personalization = definition.personalization;
  const recommendation = await getMainRecommendation(user.id);

  const minutes = Math.min(personalization.baseMinutes, profile.sessionMinutes);
  const direction =
    personalization.dashboardDirection === 'high'
      ? 'Uma recomendação principal bem destacada'
      : personalization.dashboardDirection === 'medium'
        ? 'Uma recomendação principal com opções ao lado'
        : 'Mais controle manual, recomendações discretas';

  return (
    <div className="ck-enter space-y-6 py-4">
      <div>
        <Badge tone="green">Tudo pronto</Badge>
        <h1 className="mt-3 text-3xl font-semibold">
          Sua configuração inicial está montada
        </h1>
        <p className="mt-2 text-ink-secondary">
          Nada aqui é definitivo. Tudo pode ser mudado em &ldquo;Meu perfil de estudo&rdquo;.
        </p>
      </div>

      <Card className="p-6">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Perfil escolhido</dt>
            <dd className="mt-1 text-lg font-medium">{definition.name}</dd>
            <p className="mt-1 text-sm text-ink-secondary">{definition.description}</p>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Duração das sessões</dt>
            <dd className="mt-1 text-lg font-medium">{formatMinutes(minutes)}</dd>
            <p className="mt-1 text-sm text-ink-secondary">
              Limitada pelo tempo que você informou ({formatMinutes(profile.sessionMinutes)}),
              {profile.daysPerWeek} dia(s) por semana.
            </p>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">
              Aprender / praticar / revisar
            </dt>
            <dd className="mt-1 text-lg font-medium">
              {personalization.mix.learn}% / {personalization.mix.practice}% /{' '}
              {personalization.mix.review}%
            </dd>
          </div>

          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Questões por sessão</dt>
            <dd className="mt-1 text-lg font-medium">{personalization.questionsPerSession}</dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-ink-muted">
              Nível de direção no seu início
            </dt>
            <dd className="mt-1 text-lg font-medium">{direction}</dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Sua primeira atividade</h2>
        {recommendation ? (
          <>
            <p className="mt-2 text-lg font-medium">{recommendation.topicName}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {recommendation.areaName} · {formatMinutes(recommendation.minutes)} ·{' '}
              {recommendation.questionCount} questões
            </p>
            <p className="ck-reading mt-3 text-sm text-ink-secondary">{recommendation.reason}</p>
          </>
        ) : (
          <p className="mt-2 text-sm text-ink-secondary">
            Vamos montar sua primeira sessão a partir do mapa de conteúdos.
          </p>
        )}
      </Card>

      {profile.diagnosticStatus === 'pending' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Quer um diagnóstico leve antes?</h2>
          <p className="mt-2 text-sm text-ink-secondary">
            São 8 questões distribuídas entre as quatro áreas, em cerca de 20 minutos. Não é prova
            e você pode pular o que não souber. Ajuda a plataforma a acertar mais rápido nas
            recomendações — mas é totalmente opcional.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <LinkButton href="/diagnostico" variant="secondary">
              Fazer o diagnóstico
            </LinkButton>
          </div>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <LinkButton href="/inicio" size="lg">
          Ir para o meu início
        </LinkButton>
        <Link
          href="/perfil/estudo"
          className="inline-flex min-h-[46px] items-center px-3 text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
        >
          Editar tudo em Meu perfil de estudo
        </Link>
      </div>
    </div>
  );
}

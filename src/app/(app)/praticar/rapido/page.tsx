import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth/current-user';
import { getMainRecommendation } from '@/lib/session/service';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/States';
import { StartQuickSession } from './StartQuickSession';

export const metadata: Metadata = { title: 'Sessão rápida' };

export default async function QuickSessionPage() {
  const user = await requireUser('/praticar/rapido');
  const recommendation = await getMainRecommendation(user.id);

  if (!recommendation) {
    return (
      <EmptyState
        title="Ainda não há o que praticar rapidamente"
        description="Escolha um assunto no mapa de conteúdos para começarmos."
        actionLabel="Ver conteúdos"
        actionHref="/conteudos"
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Badge tone="teal">10 minutos</Badge>
        <h1 className="mt-3 text-2xl font-semibold">Uma sessão curta, de verdade</h1>
        <p className="mt-2 text-sm text-ink-secondary">
          Duas questões do que mais importa agora. Se precisar sair no meio, o progresso fica salvo.
        </p>
      </div>

      <Card className="p-6">
        <p className="text-xs uppercase tracking-wide text-ink-muted">O que vamos praticar</p>
        <p className="mt-1 text-lg font-medium">{recommendation.topicName}</p>
        <p className="mt-1 text-sm text-ink-muted">
          {recommendation.areaName} · {recommendation.subjectName}
        </p>
        <p className="ck-reading mt-4 text-sm text-ink-secondary">
          <span className="font-medium text-ink-primary">Por que isso: </span>
          {recommendation.reason}
        </p>
        <div className="mt-6">
          <StartQuickSession />
        </div>
      </Card>
    </div>
  );
}

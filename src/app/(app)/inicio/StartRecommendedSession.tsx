'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { startTopicSessionAction } from '@/lib/session/actions';

/**
 * Inicia a sessão recomendada. Enquanto a ação roda, o botão fica desabilitado —
 * duplo clique não cria duas sessões (a ação também é idempotente no servidor).
 */
export function StartRecommendedSession({
  topicId,
  kind,
  size = 'md',
}: {
  topicId: string;
  kind: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size={size}
      loading={pending}
      onClick={() =>
        startTransition(async () => {
          await startTopicSessionAction(topicId, kind);
        })
      }
    >
      {pending ? 'Preparando sua sessão…' : 'Começar sessão recomendada'}
    </Button>
  );
}

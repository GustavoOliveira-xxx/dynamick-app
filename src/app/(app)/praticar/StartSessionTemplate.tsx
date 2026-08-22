'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { startTopicSessionAction } from '@/lib/session/actions';

export function StartSessionTemplate({
  topicId,
  kind,
  label = 'Começar',
}: {
  topicId: string;
  kind: string;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      size="sm"
      variant="secondary"
      loading={pending}
      onClick={() => startTransition(async () => { await startTopicSessionAction(topicId, kind); })}
    >
      {label}
    </Button>
  );
}

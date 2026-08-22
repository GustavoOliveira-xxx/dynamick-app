'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { startQuickSessionAction } from '@/lib/session/actions';

export function StartQuickSession() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      size="lg"
      loading={pending}
      onClick={() => startTransition(async () => { await startQuickSessionAction(); })}
    >
      {pending ? 'Preparando…' : 'Começar agora'}
    </Button>
  );
}

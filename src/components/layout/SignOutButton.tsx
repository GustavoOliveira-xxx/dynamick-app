'use client';

import { useTransition } from 'react';
import { signOutAction } from '@/lib/auth/actions';
import { Button } from '@/components/ui/Button';

export function SignOutButton() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      loading={pending}
      onClick={() => startTransition(() => signOutAction())}
    >
      Sair
    </Button>
  );
}

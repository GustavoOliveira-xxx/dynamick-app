import { cache } from 'react';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { readSessionUserId } from './session';

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof loadCurrentUser>>>;

async function loadCurrentUser() {
  const userId = await readSessionUserId();
  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: { id: userId, deletedAt: null },
    include: {
      studyProfile: { include: { dimensions: true } },
      personalization: true,
      notificationPreference: true,
    },
  });
  return user;
}

/** Memoizado por requisição: várias chamadas na mesma render fazem uma única consulta. */
export const getCurrentUser = cache(loadCurrentUser);

/** Guarda de rota autenticada — executa no servidor. */
export async function requireUser(returnTo?: string) {
  const user = await getCurrentUser();
  if (!user) {
    const target = returnTo ? `/entrar?next=${encodeURIComponent(returnTo)}` : '/entrar';
    redirect(target);
  }
  return user;
}

/**
 * Guarda administrativa real no servidor (§9 e §20.5).
 * Esconder o botão na interface nunca é a proteção.
 */
export async function requireAdmin(returnTo = '/admin') {
  const user = await requireUser(returnTo);
  if (user.role !== 'admin') redirect('/sem-acesso');
  return user;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}

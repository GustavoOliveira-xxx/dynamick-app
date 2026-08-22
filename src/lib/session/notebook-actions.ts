'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth/current-user';
import { NEXT_ACTIONS } from '@/lib/domain';

const updateSchema = z.object({
  id: z.string().min(1),
  note: z.string().max(2000).optional(),
  nextAction: z.enum(NEXT_ACTIONS).optional(),
});

export async function updateErrorNoteAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const parsed = updateSchema.safeParse({
    id: formData.get('id'),
    note: formData.get('note') ?? undefined,
    nextAction: formData.get('nextAction') || undefined,
  });
  if (!parsed.success) return;

  // Confere a posse antes de escrever: manipular o ID não dá acesso a outro usuário.
  const note = await prisma.errorNote.findFirst({
    where: { id: parsed.data.id, userId: user.id },
  });
  if (!note) return;

  await prisma.errorNote.update({
    where: { id: note.id },
    data: {
      note: parsed.data.note ?? note.note,
      nextAction: parsed.data.nextAction ?? note.nextAction,
    },
  });
  revalidatePath('/revisar/caderno');
}

export async function resolveErrorNoteAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const id = String(formData.get('id') ?? '');

  const note = await prisma.errorNote.findFirst({ where: { id, userId: user.id } });
  if (!note) return;

  const resolving = note.status !== 'resolved';

  await prisma.errorNote.update({
    where: { id: note.id },
    data: {
      status: resolving ? 'resolved' : 'open',
      resolvedAt: resolving ? new Date() : null,
    },
  });
  revalidatePath('/revisar/caderno');
}

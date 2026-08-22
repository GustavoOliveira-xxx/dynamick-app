'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth/current-user';
import { sessionIdempotencyKey } from '@/lib/session/service';

/**
 * Diagnóstico inicial (§ etapa 2).
 * Distribui as questões entre as áreas, registra tudo e nunca bloqueia o uso do produto.
 */
export async function startDiagnosticAction(): Promise<void> {
  const user = await requireUser();

  const existing = await prisma.studySession.findFirst({
    where: { userId: user.id, kind: 'diagnostic', status: { in: ['in_progress', 'paused'] } },
  });
  if (existing) redirect(`/sessao/${existing.id}?comecar=sim`);

  const areas = await prisma.knowledgeArea.findMany({ orderBy: { order: 'asc' } });
  const perArea = 2;
  const questionIds: string[] = [];

  for (const area of areas) {
    const questions = await prisma.question.findMany({
      where: { areaId: area.id, status: 'published', isRecovery: false, difficulty: { in: ['intro', 'intermediate'] } },
      orderBy: { slug: 'asc' },
      take: perArea,
      select: { id: true },
    });
    questionIds.push(...questions.map((question) => question.id));
  }

  if (questionIds.length === 0) redirect('/inicio');

  const idempotencyKey = sessionIdempotencyKey(user.id, ['diagnostico']);
  const already = await prisma.studySession.findUnique({ where: { idempotencyKey } });
  if (already) redirect(`/sessao/${already.id}?comecar=sim`);

  const session = await prisma.studySession.create({
    data: {
      userId: user.id,
      title: 'Diagnóstico leve',
      kind: 'diagnostic',
      // Correção ao final: o diagnóstico mede o ponto de partida, não ensina ainda.
      mode: 'exam',
      status: 'in_progress',
      reason:
        'Questões distribuídas entre as quatro áreas para um primeiro mapa. Não é prova e você pode pular o que não souber.',
      plannedMinutes: 20,
      plannedItems: questionIds.length,
      idempotencyKey,
      items: { create: questionIds.map((questionId, order) => ({ questionId, order })) },
    },
  });

  await prisma.studyProfile.update({
    where: { userId: user.id },
    data: { diagnosticStatus: 'done' },
  });

  revalidatePath('/inicio');
  redirect(`/sessao/${session.id}?comecar=sim`);
}

export async function skipDiagnosticAction(): Promise<void> {
  const user = await requireUser();
  await prisma.studyProfile.update({
    where: { userId: user.id },
    data: { diagnosticStatus: 'skipped' },
  });
  revalidatePath('/inicio');
  redirect('/inicio');
}

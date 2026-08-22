'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth/current-user';
import { parseJson } from '@/lib/util/json';
import { generateSimulation, type Blueprint, type BlueprintQuestion } from './generator';
import { sessionIdempotencyKey, summarizeSession } from '@/lib/session/service';
import type { Difficulty } from '@/lib/domain';

/** Inicia (ou retoma) uma execução de simulado. */
export async function startSimulationAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const slug = String(formData.get('slug') ?? '');
  const timed = String(formData.get('timed') ?? 'true') === 'true';

  const simulation = await prisma.simulation.findFirst({
    where: { slug, status: 'published' },
  });
  if (!simulation) redirect('/praticar');

  // Retomada após interrupção (§11.7): se já existe execução em andamento, volta para ela.
  const existing = await prisma.simulationRun.findFirst({
    where: { userId: user.id, simulationId: simulation.id, submittedAt: null },
    include: { session: true },
  });
  if (existing) redirect(`/sessao/${existing.sessionId}?comecar=sim`);

  const questions = await prisma.question.findMany({
    where: {
      status: 'published',
      ...(simulation.areaId ? { areaId: simulation.areaId } : {}),
    },
    select: {
      id: true,
      isRecovery: true,
      difficulty: true,
      area: { select: { slug: true } },
      topic: { select: { slug: true } },
    },
  });

  const pool: BlueprintQuestion[] = questions.map((question) => ({
    id: question.id,
    areaSlug: question.area.slug,
    topicSlug: question.topic.slug,
    difficulty: question.difficulty as Difficulty,
    isRecovery: question.isRecovery,
  }));

  const blueprint = parseJson<Blueprint>(simulation.blueprint, {});
  const result = generateSimulation(pool, blueprint, simulation.questionCount, simulation.slug);

  if (result.questionIds.length === 0) {
    redirect('/praticar?erro=simulado-sem-questoes');
  }

  const idempotencyKey = sessionIdempotencyKey(user.id, ['simulado', simulation.id]);
  const already = await prisma.studySession.findUnique({ where: { idempotencyKey } });
  if (already) redirect(`/sessao/${already.id}?comecar=sim`);

  const timeLimitSeconds = timed ? simulation.minutes * 60 : null;

  const session = await prisma.studySession.create({
    data: {
      userId: user.id,
      title: simulation.title,
      kind: 'simulate',
      // Simulado mostra o resultado só no final.
      mode: 'exam',
      reason: simulation.description,
      plannedMinutes: simulation.minutes,
      plannedItems: result.questionIds.length,
      simulationId: simulation.id,
      timeLimitSeconds,
      idempotencyKey,
      items: { create: result.questionIds.map((questionId, order) => ({ questionId, order })) },
    },
  });

  await prisma.simulationRun.create({
    data: {
      userId: user.id,
      simulationId: simulation.id,
      sessionId: session.id,
      timed,
      deadlineAt: timeLimitSeconds ? new Date(Date.now() + timeLimitSeconds * 1000) : null,
      totalItems: result.questionIds.length,
      fallbackNote: result.fallbackNote,
    },
  });

  // Falta de questões vira item para a curadoria, não silêncio.
  if (result.fallbackNote) {
    await prisma.auditLog.create({
      data: {
        action: 'simulation.shortfall',
        entity: 'Simulation',
        entityId: simulation.id,
        after: JSON.stringify(result.shortfall),
        note: result.fallbackNote,
      },
    });
  }

  redirect(`/sessao/${session.id}`);
}

/** Envio do simulado: calcula o resultado por área, tópico, habilidade e tempo. */
export async function submitSimulationAction(formData: FormData): Promise<void> {
  const user = await requireUser();
  const sessionId = String(formData.get('sessionId') ?? '');

  const run = await prisma.simulationRun.findFirst({
    where: { sessionId, userId: user.id },
    include: { session: true },
  });
  if (!run) redirect('/praticar');

  // Envio duplicado ao terminar o tempo não recalcula nem duplica (§20.3).
  if (run.submittedAt) redirect(`/simulados/resultado/${run.id}`);

  const items = await prisma.sessionItem.findMany({
    where: { sessionId },
    include: {
      attempt: true,
      question: {
        include: {
          area: { select: { shortName: true } },
          topic: { select: { name: true } },
          skill: { select: { name: true } },
        },
      },
    },
  });

  const byArea: Record<string, { correct: number; total: number }> = {};
  const byTopic: Record<string, { correct: number; total: number }> = {};
  const bySkill: Record<string, { correct: number; total: number }> = {};
  const times: number[] = [];
  let score = 0;

  for (const item of items) {
    const areaName = item.question.area.shortName;
    const topicName = item.question.topic.name;
    const skillName = item.question.skill?.name ?? 'Não classificada';
    const correct = item.attempt?.isCorrect ?? false;

    byArea[areaName] ??= { correct: 0, total: 0 };
    byTopic[topicName] ??= { correct: 0, total: 0 };
    bySkill[skillName] ??= { correct: 0, total: 0 };

    byArea[areaName]!.total += 1;
    byTopic[topicName]!.total += 1;
    bySkill[skillName]!.total += 1;

    if (correct) {
      score += 1;
      byArea[areaName]!.correct += 1;
      byTopic[topicName]!.correct += 1;
      bySkill[skillName]!.correct += 1;
    }

    if (item.attempt?.timeSpentMs) times.push(item.attempt.timeSpentMs);
  }

  const summary = await summarizeSession(sessionId);
  const sorted = [...times].sort((a, b) => a - b);
  const median = sorted.length > 0 ? sorted[Math.floor(sorted.length / 2)]! : 0;

  await prisma.$transaction([
    prisma.simulationRun.update({
      where: { id: run.id },
      data: {
        submittedAt: new Date(),
        score,
        analysis: JSON.stringify({
          byArea,
          byTopic,
          bySkill,
          time: {
            totalMs: times.reduce((sum, value) => sum + value, 0),
            medianMs: median,
            slowestMs: sorted.at(-1) ?? 0,
            answered: times.length,
          },
          errorReasons: summary.errorReasons,
        }),
      },
    }),
    prisma.studySession.update({
      where: { id: sessionId },
      data: { status: 'completed', completedAt: new Date() },
    }),
  ]);

  revalidatePath('/inicio');
  redirect(`/simulados/resultado/${run.id}`);
}

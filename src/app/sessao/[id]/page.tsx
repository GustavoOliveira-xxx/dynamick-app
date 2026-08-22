import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { QuestionRunner } from '@/components/study/QuestionRunner';
import { SessionPreparation } from '@/components/study/SessionPreparation';

export const metadata: Metadata = { title: 'Sessão de estudo' };

type Params = { params: Promise<{ id: string }>; searchParams: Promise<{ comecar?: string }> };

export default async function SessionPage({ params, searchParams }: Params) {
  const { id } = await params;
  const { comecar } = await searchParams;
  const user = await requireUser(`/sessao/${id}`);

  const session = await prisma.studySession.findFirst({
    where: { id, userId: user.id },
    include: {
      items: {
        orderBy: { order: 'asc' },
        include: {
          attempt: { include: { errorClassification: true } },
          question: {
            include: {
              options: { orderBy: { order: 'asc' } },
              explanation: true,
              topic: { select: { name: true, slug: true } },
              subject: { select: { name: true } },
              skill: { select: { name: true } },
            },
          },
        },
      },
      simulation: { select: { title: true } },
    },
  });

  if (!session) notFound();
  if (session.status === 'completed') redirect(`/sessao/${id}/resultado`);

  const personalization = await prisma.personalizationPreference.findUnique({
    where: { userId: user.id },
  });

  const answeredCount = session.items.filter((item) => item.status === 'answered').length;
  const started = comecar === 'sim' || answeredCount > 0 || session.status === 'paused';

  // Tela de preparação (§ etapa 6): objetivo, quantidade, duração, nível e motivo.
  if (!started) {
    return (
      <SessionPreparation
        sessionId={session.id}
        title={session.title}
        reason={session.reason}
        minutes={session.plannedMinutes}
        itemCount={session.items.length}
        mode={session.mode as 'learning' | 'exam'}
        topics={[...new Set(session.items.map((item) => item.question.topic.name))]}
        difficulties={[...new Set(session.items.map((item) => item.question.difficulty))]}
      />
    );
  }

  return (
    <QuestionRunner
      session={{
        id: session.id,
        title: session.title,
        mode: session.mode as 'learning' | 'exam',
        currentIndex: session.currentIndex,
        timeLimitSeconds: session.timeLimitSeconds,
        startedAt: session.startedAt.toISOString(),
        isSimulation: Boolean(session.simulationId),
      }}
      showTimer={personalization?.showTimer ?? true}
      askConfidence={personalization?.confidencePrompt ?? true}
      items={session.items.map((item) => ({
        id: item.id,
        order: item.order,
        flagged: item.flagged,
        note: item.note,
        status: item.status,
        question: {
          id: item.question.id,
          stem: item.question.stem,
          support: item.question.support,
          difficulty: item.question.difficulty,
          topicName: item.question.topic.name,
          topicSlug: item.question.topic.slug,
          subjectName: item.question.subject.name,
          skillName: item.question.skill?.name ?? null,
          options: item.question.options.map((option) => ({
            id: option.id,
            label: option.label,
            text: option.text,
            isCorrect: option.isCorrect,
            rationale: option.rationale,
          })),
          explanation: item.question.explanation
            ? {
                summary: item.question.explanation.summary,
                detailed: item.question.explanation.detailed,
                strategy: item.question.explanation.strategy,
                conceptRecap: item.question.explanation.conceptRecap,
                reflectionPrompt: item.question.explanation.reflectionPrompt,
              }
            : null,
        },
        attempt: item.attempt
          ? {
              id: item.attempt.id,
              answerId: item.attempt.answerId,
              firstAnswerId: item.attempt.firstAnswerId,
              isCorrect: item.attempt.isCorrect,
              changedAnswer: item.attempt.changedAnswer,
              confidence: item.attempt.confidence,
              errorReason: item.attempt.errorClassification?.reason ?? null,
            }
          : null,
      }))}
    />
  );
}

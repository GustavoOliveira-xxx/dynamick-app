'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { ChoiceGroup } from '@/components/onboarding/ChoiceGroup';
import { SelfAssessmentGrid } from '@/components/onboarding/SelfAssessmentGrid';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { InlineMessage } from '@/components/ui/States';
import type { OnboardingStep } from '@/lib/onboarding/questionnaire';
import { ONBOARDING_MESSAGES } from '@/lib/onboarding/questionnaire';
import type { AnswerMap } from '@/lib/profile/engine';
import { saveStepAction, skipStepAction, type StepState } from '../actions';

const INITIAL: StepState = {};

type Props = {
  step: OnboardingStep;
  stepNumber: number;
  totalSteps: number;
  previousSlug: string | null;
  answers: AnswerMap;
  selfAssessment: Record<string, string>;
  resumedMessage?: string;
};

export function StepForm({
  step,
  stepNumber,
  totalSteps,
  previousSlug,
  answers,
  selfAssessment,
  resumedMessage,
}: Props) {
  const [state, formAction, pending] = useActionState(saveStepAction, INITIAL);

  // A etapa B só pergunta o objetivo principal depois que há objetivos marcados.
  const [goals, setGoals] = useState<string[]>(() => {
    const value = answers.goals;
    return Array.isArray(value) ? value : [];
  });

  return (
    <div className="ck-enter space-y-6 py-4">
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            Etapa {step.letter} · {step.title}
          </p>
          <p aria-live="polite" className="text-xs text-ink-muted">
            Etapa {stepNumber} de {totalSteps} ({Math.round((stepNumber / totalSteps) * 100)}%)
          </p>
        </div>
        <div className="mt-2">
          <Progress
            value={stepNumber}
            max={totalSteps}
            label={`Progresso do onboarding: etapa ${stepNumber} de ${totalSteps}`}
            size="sm"
          />
        </div>
      </div>

      {resumedMessage && <InlineMessage tone="info">{resumedMessage}</InlineMessage>}

      <p className="text-sm text-ink-secondary">{step.intro}</p>

      <form action={formAction} className="space-y-7" noValidate>
        <input type="hidden" name="__step" value={step.slug} />

        {step.questions.map((question) => {
          if (question.id === 'primaryGoal') {
            if (goals.length === 0) return null;
            const goalsQuestion = step.questions.find((item) => item.id === 'goals');
            const options = (goalsQuestion?.options ?? []).filter((option) =>
              goals.includes(option.value),
            );
            return (
              <ChoiceGroup
                key={question.id}
                question={{ ...question, options }}
                defaultValue={typeof answers.primaryGoal === 'string' ? answers.primaryGoal : undefined}
                error={state.fieldErrors?.[question.id]}
              />
            );
          }

          if (question.type === 'scale-per-area') {
            return (
              <SelfAssessmentGrid
                key={question.id}
                questionId={question.id}
                defaultValue={selfAssessment}
              />
            );
          }

          const current = answers[question.id];
          return (
            <ChoiceGroup
              key={question.id}
              question={question}
              defaultValue={
                Array.isArray(current)
                  ? current
                  : typeof current === 'string' || typeof current === 'number'
                    ? String(current)
                    : undefined
              }
              error={state.fieldErrors?.[question.id]}
              onChange={question.id === 'goals' ? (value) => setGoals(Array.isArray(value) ? value : []) : undefined}
            />
          );
        })}

        {state.error && <InlineMessage tone="danger">{state.error}</InlineMessage>}

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
          <Button type="submit" loading={pending} size="lg">
            {pending ? 'Salvando…' : 'Continuar'}
          </Button>

          {previousSlug && (
            <Link
              href={`/onboarding/${previousSlug}`}
              className="inline-flex min-h-[46px] items-center px-3 text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
            >
              Voltar
            </Link>
          )}
        </div>
      </form>

      {!step.required && (
        <form action={skipStepAction}>
          <input type="hidden" name="__step" value={step.slug} />
          <Button type="submit" variant="ghost" size="sm">
            Pular esta etapa
          </Button>
          <p className="mt-1 text-xs text-ink-muted">{ONBOARDING_MESSAGES.skipped}</p>
        </form>
      )}
    </div>
  );
}

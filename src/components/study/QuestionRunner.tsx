'use client';

import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { InlineMessage } from '@/components/ui/States';
import { formatSeconds } from '@/lib/util/format';
import { CONFIDENCE_ANSWER_LABELS, CONFIDENCE_ANSWERS, DIFFICULTY_LABELS, type Difficulty } from '@/lib/domain';
import {
  answerQuestionAction,
  completeSessionAction,
  navigateSessionAction,
  pauseSessionAction,
  saveItemNoteAction,
  toggleFlagAction,
  type AnswerResult,
} from '@/lib/session/actions';
import { Correction } from './Correction';

type Option = { id: string; label: string; text: string; isCorrect: boolean; rationale: string };

export type RunnerItem = {
  id: string;
  order: number;
  flagged: boolean;
  note: string | null;
  status: string;
  question: {
    id: string;
    stem: string;
    support: string | null;
    difficulty: string;
    topicName: string;
    topicSlug: string;
    subjectName: string;
    skillName: string | null;
    options: Option[];
    explanation: {
      summary: string;
      detailed: string | null;
      strategy: string | null;
      conceptRecap: string | null;
      reflectionPrompt: string;
    } | null;
  };
  attempt: {
    id: string;
    answerId: string | null;
    firstAnswerId: string | null;
    isCorrect: boolean;
    changedAnswer: boolean;
    confidence: string | null;
    errorReason: string | null;
  } | null;
};

const INITIAL: AnswerResult = {};

/**
 * Resolução de questões (§ etapa 7 e 8).
 *
 * Garantias implementadas aqui:
 * - a alternativa correta nunca aparece antes do envio (§7 regra 16);
 * - a primeira resposta é preservada mesmo se o estudante trocar;
 * - o cronômetro para ao enviar e não continua depois (§20.3);
 * - marcar, anotar e pausar não perdem o estado da sessão.
 */
export function QuestionRunner({
  session,
  items,
  showTimer,
  askConfidence,
}: {
  session: {
    id: string;
    title: string;
    mode: 'learning' | 'exam';
    currentIndex: number;
    timeLimitSeconds: number | null;
    startedAt: string;
  };
  items: RunnerItem[];
  showTimer: boolean;
  askConfidence: boolean;
}) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(0, session.currentIndex), Math.max(0, items.length - 1)),
  );
  const [state, formAction, pending] = useActionState(answerQuestionAction, INITIAL);
  const [selected, setSelected] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<string>('');
  const [noteOpen, setNoteOpen] = useState(false);

  const item = items[index];
  const answered = Boolean(item?.attempt?.answerId);
  const isLearningMode = session.mode === 'learning';

  // Cronômetro por questão: zera ao trocar de item e PARA quando a questão é respondida.
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    setSelected(item?.attempt?.answerId ?? null);
    setConfidence(item?.attempt?.confidence ?? '');
    setNoteOpen(false);
    startRef.current = Date.now();
    setElapsed(0);
  }, [index, item?.attempt?.answerId, item?.attempt?.confidence]);

  useEffect(() => {
    if (answered) return; // não continua contando depois do envio (§20.3)
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [answered, index]);

  // Tempo total da sessão, para o modo simulado.
  const [totalElapsed, setTotalElapsed] = useState(0);
  useEffect(() => {
    const started = new Date(session.startedAt).getTime();
    const timer = window.setInterval(() => {
      setTotalElapsed(Math.floor((Date.now() - started) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [session.startedAt]);

  const answeredCount = useMemo(
    () => items.filter((entry) => entry.attempt?.answerId).length,
    [items],
  );

  if (!item) {
    return <InlineMessage tone="warning">Esta sessão não tem questões disponíveis.</InlineMessage>;
  }

  const remaining = session.timeLimitSeconds ? session.timeLimitSeconds - totalElapsed : null;
  const isLast = index >= items.length - 1;

  function goTo(next: number) {
    const target = Math.min(Math.max(0, next), items.length - 1);
    setIndex(target);
    // Persiste a posição sem bloquear a navegação.
    const data = new FormData();
    data.set('sessionId', session.id);
    data.set('index', String(target));
    void navigateSessionAction(data);
  }

  return (
    <div className="space-y-5">
      {/* Cabeçalho da sessão */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-ink-secondary">{session.title}</p>
          <div className="flex items-center gap-2">
            {showTimer && !answered && (
              <span
                className="font-mono text-xs text-ink-muted"
                aria-label={`Tempo nesta questão: ${formatSeconds(elapsed)}`}
              >
                {formatSeconds(elapsed)}
              </span>
            )}
            {remaining !== null && (
              <Badge tone={remaining < 60 ? 'warning' : 'neutral'}>
                Restam {formatSeconds(Math.max(0, remaining))}
              </Badge>
            )}
            <Badge tone="neutral">
              {index + 1} de {items.length}
            </Badge>
          </div>
        </div>
        <Progress
          value={answeredCount}
          max={items.length}
          label={`${answeredCount} de ${items.length} questões respondidas`}
          size="sm"
        />
      </div>

      {/* Enunciado */}
      <article className="ck-card p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="cyan">{item.question.topicName}</Badge>
          <Badge tone="neutral">{DIFFICULTY_LABELS[item.question.difficulty as Difficulty]}</Badge>
          {item.flagged && <Badge tone="warning">Marcada para revisar</Badge>}
        </div>

        {item.question.support && (
          <p className="ck-reading mt-4 rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm text-ink-secondary">
            {item.question.support}
          </p>
        )}

        <div className="ck-reading mt-4 whitespace-pre-line text-[1.02rem] leading-relaxed">
          {item.question.stem}
        </div>

        {/* Alternativas — radio reais, com estado por borda + texto, nunca só cor */}
        <form action={formAction} className="mt-6 space-y-2.5">
          <input type="hidden" name="sessionId" value={session.id} />
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="timeSpentMs" value={elapsed * 1000} />
          <input type="hidden" name="confidence" value={confidence} />

          <fieldset className="border-0 p-0" disabled={answered && isLearningMode}>
            <legend className="sr-only">Alternativas</legend>
            {item.question.options.map((option) => {
              const isSelected = selected === option.id;
              // A correção só é revelada depois de responder, e só em modo aprendizagem.
              const revealed = answered && isLearningMode;
              const showAsCorrect = revealed && option.isCorrect;
              const showAsWrong = revealed && isSelected && !option.isCorrect;

              return (
                <label
                  key={option.id}
                  className="ck-card ck-card-interactive mb-2.5 flex cursor-pointer items-start gap-3 p-4"
                  style={{
                    borderColor: showAsCorrect
                      ? 'var(--ck-success)'
                      : showAsWrong
                        ? 'var(--ck-danger)'
                        : isSelected
                          ? 'var(--ck-green-primary)'
                          : undefined,
                  }}
                >
                  <input
                    type="radio"
                    name="optionId"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelected(option.id)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--ck-green-primary)]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="font-medium">{option.label})</span>{' '}
                    <span>{option.text}</span>
                    {showAsCorrect && (
                      <span
                        className="mt-1 block text-xs font-medium"
                        style={{ color: 'var(--ck-success)' }}
                      >
                        ✓ Alternativa correta
                      </span>
                    )}
                    {showAsWrong && (
                      <span
                        className="mt-1 block text-xs font-medium"
                        style={{ color: 'var(--ck-danger)' }}
                      >
                        ✗ Foi a sua resposta
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </fieldset>

          {/* Confiança declarada antes de enviar */}
          {askConfidence && !answered && (
            <fieldset className="border-0 p-0 pt-2">
              <legend className="mb-2 text-sm text-ink-secondary">
                Antes de enviar: qual é a sua confiança nesta resposta? (opcional)
              </legend>
              <div className="flex flex-wrap gap-2">
                {CONFIDENCE_ANSWERS.map((value) => (
                  <label
                    key={value}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-pill border px-4 text-sm"
                    style={{
                      borderColor:
                        confidence === value ? 'var(--ck-green-primary)' : 'var(--ck-border)',
                    }}
                  >
                    <input
                      type="radio"
                      name="confidenceChoice"
                      value={value}
                      checked={confidence === value}
                      onChange={() => setConfidence(value)}
                      className="h-4 w-4 accent-[color:var(--ck-green-primary)]"
                    />
                    {CONFIDENCE_ANSWER_LABELS[value]}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {state.error && <InlineMessage tone="danger">{state.error}</InlineMessage>}

          {!answered && (
            <Button type="submit" size="lg" loading={pending} disabled={!selected} className="mt-3">
              {pending ? 'Registrando…' : isLearningMode ? 'Responder' : 'Registrar e avançar'}
            </Button>
          )}

          {answered && !isLearningMode && (
            <p className="mt-3 text-sm text-ink-secondary">
              Resposta registrada. Você pode alterá-la até enviar a sessão.
            </p>
          )}
        </form>

        {/* Trocar de alternativa depois de responder, em modo simulado */}
        {answered && !isLearningMode && (
          <form action={formAction} className="mt-3">
            <input type="hidden" name="sessionId" value={session.id} />
            <input type="hidden" name="itemId" value={item.id} />
            <input type="hidden" name="optionId" value={selected ?? ''} />
            <input type="hidden" name="timeSpentMs" value={elapsed * 1000} />
            <Button type="submit" variant="secondary" size="sm" loading={pending}>
              Atualizar minha resposta
            </Button>
          </form>
        )}
      </article>

      {/* Correção explicada — só em modo aprendizagem e só depois de responder */}
      {answered && isLearningMode && item.attempt && (
        <Correction
          attemptId={item.attempt.id}
          questionId={item.question.id}
          isCorrect={item.attempt.isCorrect}
          changedAnswer={item.attempt.changedAnswer}
          selectedOptionId={item.attempt.answerId}
          options={item.question.options}
          explanation={item.question.explanation}
          topicName={item.question.topicName}
          topicSlug={item.question.topicSlug}
          skillName={item.question.skillName}
          existingReason={item.attempt.errorReason}
        />
      )}

      {/* Controles da sessão */}
      <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <Button variant="ghost" size="sm" onClick={() => goTo(index - 1)} disabled={index === 0}>
          ← Anterior
        </Button>

        {!isLast && (
          <Button variant="secondary" size="sm" onClick={() => goTo(index + 1)}>
            Próxima →
          </Button>
        )}

        <form action={toggleFlagAction}>
          <input type="hidden" name="itemId" value={item.id} />
          <Button type="submit" variant="ghost" size="sm">
            {item.flagged ? 'Desmarcar' : 'Marcar para revisar depois'}
          </Button>
        </form>

        <Button variant="ghost" size="sm" onClick={() => setNoteOpen((value) => !value)}>
          {item.note ? 'Editar minha dúvida' : 'Anotar uma dúvida'}
        </Button>

        <form action={pauseSessionAction} className="ml-auto">
          <input type="hidden" name="sessionId" value={session.id} />
          <Button type="submit" variant="ghost" size="sm">
            Pausar e sair
          </Button>
        </form>
      </div>

      {noteOpen && (
        <form action={saveItemNoteAction} className="ck-card space-y-3 p-4">
          <input type="hidden" name="itemId" value={item.id} />
          <label className="block text-sm font-medium" htmlFor={`note-${item.id}`}>
            O que ficou confuso aqui?
          </label>
          <textarea
            id={`note-${item.id}`}
            name="note"
            rows={3}
            maxLength={1000}
            defaultValue={item.note ?? ''}
            className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
            placeholder="Ex.: não entendi por que a alternativa C está errada."
          />
          <Button type="submit" size="sm">
            Salvar anotação
          </Button>
        </form>
      )}

      {/* Encerrar */}
      {(isLast || answeredCount === items.length) && (
        <form action={completeSessionAction} className="pt-2">
          <input type="hidden" name="sessionId" value={session.id} />
          <Button type="submit" size="lg" fullWidth>
            {answeredCount === items.length
              ? 'Concluir sessão e ver o resumo'
              : `Encerrar mesmo com ${items.length - answeredCount} questão(ões) em branco`}
          </Button>
        </form>
      )}
    </div>
  );
}

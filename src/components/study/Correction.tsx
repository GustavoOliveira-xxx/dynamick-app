'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ERROR_REASON_LABELS, ERROR_REASONS, NEXT_ACTION_LABELS } from '@/lib/domain';
import { classifyErrorAction, saveToErrorNotebookAction } from '@/lib/session/actions';
import { Markdown } from './Markdown';
import { ReportQuestion } from './ReportQuestion';

type Option = { id: string; label: string; text: string; isCorrect: boolean; rationale: string };

/**
 * Correção explicada (§ etapa 8).
 * Traz alternativa correta, explicação principal, análise de CADA distrator,
 * tópico, habilidade, a pergunta de reflexão e as ações curtas seguintes.
 *
 * O tom nunca é de punição: erro é informação, não julgamento sobre a pessoa (§14).
 */
export function Correction({
  attemptId,
  questionId,
  isCorrect,
  changedAnswer,
  selectedOptionId,
  options,
  explanation,
  topicName,
  topicSlug,
  skillName,
  existingReason,
}: {
  attemptId: string;
  questionId: string;
  isCorrect: boolean;
  changedAnswer: boolean;
  selectedOptionId: string | null;
  options: Option[];
  explanation: {
    summary: string;
    detailed: string | null;
    strategy: string | null;
    conceptRecap: string | null;
    reflectionPrompt: string;
  } | null;
  topicName: string;
  topicSlug: string;
  skillName: string | null;
  existingReason: string | null;
}) {
  const [showDistractors, setShowDistractors] = useState(!isCorrect);
  const [reason, setReason] = useState(existingReason ?? '');
  const correct = options.find((option) => option.isCorrect);
  const chosen = options.find((option) => option.id === selectedOptionId);

  return (
    <section
      className="ck-card ck-enter p-6"
      aria-label="Correção da questão"
      style={{ borderColor: isCorrect ? 'var(--ck-border-strong)' : 'rgb(255 107 122 / 34%)' }}
    >
      <div className="flex flex-wrap items-center gap-2">
        {isCorrect ? (
          <Badge tone="green" icon="✓">
            Resposta correta
          </Badge>
        ) : (
          <Badge tone="danger" icon="•">
            Vamos entender essa
          </Badge>
        )}
        {changedAnswer && <Badge tone="warning">Você mudou de alternativa</Badge>}
        <Badge tone="cyan">{topicName}</Badge>
        {skillName && <Badge tone="teal">{skillName}</Badge>}
      </div>

      {!isCorrect && chosen && correct && (
        <p className="mt-4 text-sm text-ink-secondary">
          Você marcou <strong className="text-ink-primary">{chosen.label}</strong>. A correta é{' '}
          <strong style={{ color: 'var(--ck-success)' }}>{correct.label}</strong>.
        </p>
      )}

      {explanation && (
        <div className="mt-4 space-y-3">
          {/* O conteúdo editorial usa markdown leve; renderizar como texto puro exibiria os asteriscos. */}
          <div className="text-[0.98rem]">
            <Markdown source={explanation.summary} />
          </div>

          {explanation.detailed && (
            <details className="rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3">
              <summary className="cursor-pointer text-sm font-medium">Quero entender melhor</summary>
              <div className="mt-2 text-sm text-ink-secondary">
                <Markdown source={explanation.detailed} />
              </div>
            </details>
          )}

          {explanation.strategy && (
            <div className="rounded-md border border-line p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Estratégia
              </p>
              <div className="mt-1 text-sm text-ink-secondary">
                <Markdown source={explanation.strategy} />
              </div>
            </div>
          )}

          {explanation.conceptRecap && (
            <div
              className="rounded-md border-l-2 p-3 text-sm"
              style={{ borderColor: 'var(--ck-teal)', background: 'var(--ck-bg-raised)' }}
            >
              <Markdown source={explanation.conceptRecap} />
            </div>
          )}
        </div>
      )}

      {/* Análise dos distratores */}
      <div className="mt-5">
        <Button variant="ghost" size="sm" onClick={() => setShowDistractors((value) => !value)}>
          {showDistractors ? 'Ocultar' : 'Ver'} a análise de cada alternativa
        </Button>

        {showDistractors && (
          <ul className="mt-3 space-y-2">
            {options.map((option) => (
              <li
                key={option.id}
                className="rounded-md border p-3 text-sm"
                style={{
                  borderColor: option.isCorrect ? 'var(--ck-success)' : 'var(--ck-border)',
                }}
              >
                <p className="font-medium">
                  {option.label}){' '}
                  {option.isCorrect ? (
                    <span style={{ color: 'var(--ck-success)' }}>correta</span>
                  ) : (
                    <span className="text-ink-muted">incorreta</span>
                  )}
                  {option.id === selectedOptionId && (
                    <span className="text-ink-muted"> · sua resposta</span>
                  )}
                </p>
                <div className="mt-1 text-ink-secondary">
                  <Markdown source={option.rationale} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pergunta de reflexão — obrigatória no fluxo quando houve erro */}
      {!isCorrect && (
        <form action={classifyErrorAction} className="mt-6 border-t border-line pt-5">
          <input type="hidden" name="attemptId" value={attemptId} />
          <fieldset className="border-0 p-0">
            <legend className="text-sm font-medium">
              {explanation?.reflectionPrompt ?? 'O que dificultou esta questão?'}
            </legend>
            <p className="mt-1 text-xs text-ink-muted">
              Isso define o que a plataforma vai te oferecer em seguida.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {ERROR_REASONS.map((value) => (
                <label
                  key={value}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-pill border px-4 text-sm"
                  style={{
                    borderColor: reason === value ? 'var(--ck-green-primary)' : 'var(--ck-border)',
                  }}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={value}
                    checked={reason === value}
                    onChange={() => setReason(value)}
                    className="h-4 w-4 accent-[color:var(--ck-green-primary)]"
                  />
                  {ERROR_REASON_LABELS[value]}
                </label>
              ))}
            </div>

            <Button type="submit" size="sm" className="mt-4" disabled={!reason}>
              {existingReason ? 'Atualizar motivo' : 'Registrar motivo'}
            </Button>
            {existingReason && (
              <p className="mt-2 text-xs" style={{ color: 'var(--ck-success)' }}>
                ✓ Registrado. Esta questão entrou na sua fila de revisão.
              </p>
            )}
          </fieldset>
        </form>
      )}

      {/* Ações curtas depois da explicação */}
      <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
        <Link
          href={`/conteudos/${topicSlug}`}
          className="inline-flex min-h-[40px] items-center rounded-pill border border-line-strong px-4 text-sm hover:border-[color:var(--ck-green-primary)]"
        >
          Revisar o conceito
        </Link>

        <form action={saveToErrorNotebookAction}>
          <input type="hidden" name="questionId" value={questionId} />
          <input type="hidden" name="nextAction" value="similar_question" />
          <Button type="submit" variant="secondary" size="sm">
            Salvar no caderno de erros
          </Button>
        </form>

        <form action={saveToErrorNotebookAction}>
          <input type="hidden" name="questionId" value={questionId} />
          <input type="hidden" name="nextAction" value="self_explain" />
          <Button type="submit" variant="ghost" size="sm">
            {NEXT_ACTION_LABELS.self_explain}
          </Button>
        </form>
      </div>

      {/* Denúncia de problema na questão (§13) */}
      <div className="mt-4">
        <ReportQuestion questionId={questionId} />
      </div>
    </section>
  );
}

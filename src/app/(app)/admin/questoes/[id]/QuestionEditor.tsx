'use client';

import { useActionState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InlineMessage } from '@/components/ui/States';
import {
  changeQuestionStatusAction,
  updateQuestionAction,
  type AdminActionState,
} from '@/lib/admin/actions';

const INITIAL: AdminActionState = {};

export function QuestionEditor({
  question,
  options,
  publicationProblems,
}: {
  question: {
    id: string;
    slug: string;
    stem: string;
    support: string | null;
    difficulty: string;
    status: string;
    origin: string;
    license: string;
    explanationSummary: string;
    skillName: string | null;
    attemptCount: number;
  };
  options: { id: string; label: string; text: string; isCorrect: boolean; rationale: string }[];
  publicationProblems: string[];
}) {
  const [editState, editAction, editPending] = useActionState(updateQuestionAction, INITIAL);
  const [statusState, statusAction, statusPending] = useActionState(changeQuestionStatusAction, INITIAL);

  return (
    <div className="space-y-5">
      {publicationProblems.length > 0 && (
        <InlineMessage tone="warning" title="Pendências para publicação">
          <ul className="mt-1 space-y-1">
            {publicationProblems.map((problem) => (
              <li key={problem}>• {problem}</li>
            ))}
          </ul>
        </InlineMessage>
      )}

      {editState.success && <InlineMessage tone="success">{editState.success}</InlineMessage>}
      {editState.error && (
        <InlineMessage tone="danger" title={editState.error}>
          {editState.details && (
            <ul className="mt-1 space-y-1">
              {editState.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          )}
        </InlineMessage>
      )}

      <form action={editAction}>
        <Card className="space-y-4 p-5">
          <input type="hidden" name="questionId" value={question.id} />

          <div>
            <label htmlFor="stem" className="mb-1.5 block text-sm font-medium">
              Enunciado
            </label>
            <textarea
              id="stem"
              name="stem"
              rows={8}
              required
              defaultValue={question.stem}
              className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 font-mono text-sm"
            />
          </div>

          <div>
            <label htmlFor="support" className="mb-1.5 block text-sm font-medium">
              Texto de apoio (opcional)
            </label>
            <textarea
              id="support"
              name="support"
              rows={3}
              defaultValue={question.support ?? ''}
              className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="difficulty" className="mb-1.5 block text-sm font-medium">
                Dificuldade
              </label>
              <select
                id="difficulty"
                name="difficulty"
                defaultValue={question.difficulty}
                className="min-h-[44px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
              >
                <option value="intro">Introdutório</option>
                <option value="intermediate">Intermediário</option>
                <option value="challenging">Desafiador</option>
              </select>
            </div>
            <div>
              <label htmlFor="origin" className="mb-1.5 block text-sm font-medium">
                Origem
              </label>
              <input
                id="origin"
                name="origin"
                required
                defaultValue={question.origin}
                className="min-h-[44px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
              />
            </div>
            <div>
              <label htmlFor="license" className="mb-1.5 block text-sm font-medium">
                Licença ou justificativa de uso
              </label>
              <input
                id="license"
                name="license"
                required
                defaultValue={question.license}
                className="min-h-[44px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="explanationSummary" className="mb-1.5 block text-sm font-medium">
              Explicação da resposta correta
            </label>
            <textarea
              id="explanationSummary"
              name="explanationSummary"
              rows={4}
              required
              defaultValue={question.explanationSummary}
              className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
            />
          </div>

          <div>
            <label htmlFor="changeNote" className="mb-1.5 block text-sm font-medium">
              Nota da alteração (fica no histórico)
            </label>
            <input
              id="changeNote"
              name="changeNote"
              maxLength={500}
              className="min-h-[44px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
              placeholder="Ex.: corrigido erro de digitação no enunciado."
            />
          </div>

          <Button type="submit" loading={editPending}>
            Salvar como nova versão
          </Button>
        </Card>
      </form>

      <Card className="p-5">
        <h2 className="text-lg font-semibold">Alternativas</h2>
        <ul className="mt-3 space-y-2">
          {options.map((option) => (
            <li key={option.id} className="rounded-md border border-line p-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{option.label})</span>
                {option.isCorrect && <Badge tone="green">gabarito</Badge>}
              </div>
              <p className="mt-1">{option.text}</p>
              <p className="mt-1 text-xs text-ink-muted">{option.rationale}</p>
            </li>
          ))}
        </ul>
      </Card>

      {statusState.success && <InlineMessage tone="success">{statusState.success}</InlineMessage>}
      {statusState.error && (
        <InlineMessage tone="danger" title={statusState.error}>
          {statusState.details && (
            <ul className="mt-1 space-y-1">
              {statusState.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          )}
        </InlineMessage>
      )}

      <form action={statusAction}>
        <Card className="space-y-4 p-5">
          <input type="hidden" name="questionId" value={question.id} />
          <h2 className="text-lg font-semibold">Estado editorial</h2>
          <p className="text-sm text-ink-secondary">
            Arquivar não apaga a questão nem o histórico de quem já a respondeu
            {question.attemptCount > 0 ? ` (${question.attemptCount} tentativa(s))` : ''}.
          </p>

          <div>
            <label htmlFor="status" className="mb-1.5 block text-sm font-medium">
              Novo estado
            </label>
            <select
              id="status"
              name="status"
              defaultValue={question.status}
              className="min-h-[44px] rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
            >
              <option value="draft">draft — rascunho</option>
              <option value="reviewed">reviewed — revisada</option>
              <option value="published">published — publicada</option>
              <option value="archived">archived — arquivada</option>
            </select>
          </div>

          <div>
            <label htmlFor="statusNote" className="mb-1.5 block text-sm font-medium">
              Motivo (auditoria)
            </label>
            <input
              id="statusNote"
              name="note"
              maxLength={500}
              className="min-h-[44px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
            />
          </div>

          <Button type="submit" variant="secondary" loading={statusPending}>
            Alterar estado
          </Button>
        </Card>
      </form>
    </div>
  );
}

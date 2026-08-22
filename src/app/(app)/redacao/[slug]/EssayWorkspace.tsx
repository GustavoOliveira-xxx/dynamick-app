'use client';

import { useActionState, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { saveEssayAction, type EssayState } from '@/lib/essay/actions';

const INITIAL: EssayState = {};

/**
 * Espaço de escrita: planejamento, tese, rascunho e checklists (§5.9).
 * A contagem de palavras é local e imediata; o salvamento é explícito, para o
 * estudante não perder o texto por navegação acidental.
 */
export function EssayWorkspace({
  promptSlug,
  planningQuestions,
  repertoire,
  argumentChecklist,
  reviewChecklist,
  essay,
}: {
  promptSlug: string;
  planningQuestions: string[];
  repertoire: string[];
  argumentChecklist: string[];
  reviewChecklist: string[];
  essay: {
    id: string;
    thesis: string | null;
    outline: string | null;
    body: string;
    status: string;
    wordCount: number;
    checklistState: Record<string, boolean>;
  } | null;
}) {
  const [state, formAction, pending] = useActionState(saveEssayAction, INITIAL);
  const [body, setBody] = useState(essay?.body ?? '');

  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const lines = Math.ceil(words / 9); // estimativa aproximada de linhas

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="promptSlug" value={promptSlug} />
      {essay && <input type="hidden" name="essayId" value={essay.id} />}

      {state.success && <InlineMessage tone="success">{state.success}</InlineMessage>}
      {state.error && <InlineMessage tone="danger">{state.error}</InlineMessage>}

      {planningQuestions.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Antes de escrever</h2>
          <p className="mt-1 text-sm text-ink-secondary">
            Responder isso mentalmente costuma economizar meia hora de reescrita.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
            {planningQuestions.map((question) => (
              <li key={question}>• {question}</li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="space-y-4 p-6">
        <div>
          <label htmlFor="thesis" className="mb-1.5 block text-sm font-medium">
            Sua tese em uma frase
          </label>
          <p className="mb-2 text-xs text-ink-muted">
            Teste: escreva mentalmente a frase contrária. Se ela for absurda, sua tese é óbvia demais.
          </p>
          <textarea
            id="thesis"
            name="thesis"
            rows={2}
            maxLength={1000}
            defaultValue={essay?.thesis ?? ''}
            className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
            placeholder="Ex.: o obstáculo central não é X, e sim Y — o que exige Z."
          />
        </div>

        <div>
          <label htmlFor="outline" className="mb-1.5 block text-sm font-medium">
            Planejamento dos parágrafos
          </label>
          <textarea
            id="outline"
            name="outline"
            rows={4}
            maxLength={4000}
            defaultValue={essay?.outline ?? ''}
            className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
            placeholder={'D1: argumento + repertório + análise\nD2: outro ângulo + repertório + análise\nProposta: agente, ação, meio, finalidade, detalhamento'}
          />
        </div>
      </Card>

      {repertoire.length > 0 && (
        <Card className="p-5">
          <h2 className="text-base font-semibold">Repertório possível</h2>
          <p className="mt-1 text-xs text-ink-muted">
            Use só o que você conseguir conectar ao argumento. Citação solta não pontua.
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {repertoire.map((item) => (
              <li key={item}>
                <Badge tone="teal">{item}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="body" className="text-lg font-semibold">
            Sua redação
          </label>
          <span className="text-xs text-ink-muted" aria-live="polite">
            {words} palavras · cerca de {lines} linhas
          </span>
        </div>
        <textarea
          id="body"
          name="body"
          rows={20}
          maxLength={20_000}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="mt-3 w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-4 text-[0.95rem] leading-relaxed"
          placeholder="Comece pela introdução: contextualize o problema e apresente sua tese."
        />
        {words > 0 && words < 120 && (
          <p className="mt-2 text-xs text-ink-muted">
            Textos dissertativos costumam pedir mais desenvolvimento. Continue.
          </p>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Checklist
          title="Checklist de argumentação"
          items={argumentChecklist}
          state={essay?.checklistState ?? {}}
        />
        <Checklist
          title="Checklist de revisão"
          items={reviewChecklist}
          state={essay?.checklistState ?? {}}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" name="submit" value="draft" loading={pending}>
          Salvar rascunho
        </Button>
        <Button type="submit" name="submit" value="submitted" variant="secondary" loading={pending}>
          Marcar como finalizada
        </Button>
      </div>

      <p className="text-xs text-ink-muted">
        Não corrigimos nem atribuímos nota automaticamente. Os checklists servem para você revisar
        seu próprio texto com critério.
      </p>
    </form>
  );
}

function Checklist({
  title,
  items,
  state,
}: {
  title: string;
  items: string[];
  state: Record<string, boolean>;
}) {
  if (items.length === 0) return null;

  return (
    <Card className="p-5">
      <fieldset className="border-0 p-0">
        <legend className="text-base font-semibold">{title}</legend>
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                <input
                  type="checkbox"
                  name="checklist"
                  value={item}
                  defaultChecked={state[item] ?? false}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--ck-green-primary)]"
                />
                <span className="text-ink-secondary">{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </Card>
  );
}

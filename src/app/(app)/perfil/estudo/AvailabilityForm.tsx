'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { updateAvailabilityAction, type ProfileActionState } from '@/lib/profile/actions';

const INITIAL: ProfileActionState = {};

export function AvailabilityForm({
  daysPerWeek,
  sessionMinutes,
  examDate,
}: {
  daysPerWeek: number;
  sessionMinutes: number;
  examDate: string;
}) {
  const [state, formAction, pending] = useActionState(updateAvailabilityAction, INITIAL);

  return (
    <form action={formAction} className="mt-4 space-y-4">
      {state.error && <InlineMessage tone="danger">{state.error}</InlineMessage>}
      {state.success && <InlineMessage tone="success">{state.success}</InlineMessage>}

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="daysPerWeek" className="mb-1.5 block text-sm font-medium">
            Dias por semana
          </label>
          <select
            id="daysPerWeek"
            name="daysPerWeek"
            defaultValue={String(daysPerWeek)}
            className="min-h-[46px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <option key={value} value={value}>
                {value} {value === 1 ? 'dia' : 'dias'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sessionMinutes" className="mb-1.5 block text-sm font-medium">
            Minutos por sessão
          </label>
          <input
            id="sessionMinutes"
            name="sessionMinutes"
            type="number"
            min={5}
            max={180}
            step={5}
            defaultValue={sessionMinutes}
            className="min-h-[46px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
          />
        </div>

        <div>
          <label htmlFor="examDate" className="mb-1.5 block text-sm font-medium">
            Data prevista da prova
          </label>
          <input
            id="examDate"
            name="examDate"
            type="date"
            defaultValue={examDate}
            className="min-h-[46px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
          />
          <p className="mt-1 text-xs text-ink-muted">Opcional. Ajuda a equilibrar revisão e conteúdo novo.</p>
        </div>
      </div>

      <Button type="submit" loading={pending}>
        {pending ? 'Recalculando o plano…' : 'Salvar e recalcular meu plano'}
      </Button>
    </form>
  );
}

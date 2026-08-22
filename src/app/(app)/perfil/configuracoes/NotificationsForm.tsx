'use client';

import { useActionState, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { updateNotificationsAction, type ProfileActionState } from '@/lib/profile/actions';
import { WEEKDAY_LABELS } from '@/lib/util/format';

const INITIAL: ProfileActionState = {};

/** Lembretes: opcionais, poucos e sem linguagem de culpa (§5.11). */
export function NotificationsForm({ enabled, timeOfDay }: { enabled: boolean; timeOfDay: string }) {
  const [state, formAction, pending] = useActionState(updateNotificationsAction, INITIAL);
  const [on, setOn] = useState(enabled);

  return (
    <form action={formAction}>
      <Card className="space-y-4 p-6">
        <div>
          <h2 className="text-lg font-semibold">Lembretes</h2>
          <p className="mt-1 text-sm text-ink-secondary">
            Vêm desligados. Se ligar, são poucos e sempre úteis — nunca do tipo &ldquo;você não
            estudou hoje&rdquo;.
          </p>
        </div>

        {state.error && <InlineMessage tone="danger">{state.error}</InlineMessage>}
        {state.success && <InlineMessage tone="success">{state.success}</InlineMessage>}

        <fieldset className="border-0 p-0">
          <legend className="text-sm font-medium">Quero receber lembretes</legend>
          <div className="mt-2 flex gap-2">
            {[
              { value: 'false', label: 'Não' },
              { value: 'true', label: 'Sim' },
            ].map((option) => (
              <label
                key={option.value}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-pill border px-4 text-sm"
                style={{
                  borderColor: String(on) === option.value ? 'var(--ck-green-primary)' : 'var(--ck-border)',
                }}
              >
                <input
                  type="radio"
                  name="enabled"
                  value={option.value}
                  checked={String(on) === option.value}
                  onChange={() => setOn(option.value === 'true')}
                  className="h-4 w-4 accent-[color:var(--ck-green-primary)]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        {on && (
          <>
            <fieldset className="border-0 p-0">
              <legend className="text-sm font-medium">Em quais dias</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {WEEKDAY_LABELS.map((label, index) => (
                  <label
                    key={label}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-pill border border-line px-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      name="weekdays"
                      value={index}
                      className="h-4 w-4 accent-[color:var(--ck-green-primary)]"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="timeOfDay" className="mb-1.5 block text-sm font-medium">
                Horário
              </label>
              <input
                id="timeOfDay"
                name="timeOfDay"
                type="time"
                defaultValue={timeOfDay}
                className="min-h-[46px] rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
              />
            </div>
          </>
        )}

        <Button type="submit" loading={pending}>
          Salvar lembretes
        </Button>
      </Card>
    </form>
  );
}

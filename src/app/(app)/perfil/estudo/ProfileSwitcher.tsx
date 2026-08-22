'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { changeProfileAction } from '@/lib/profile/actions';

export function ProfileSwitcher({
  current,
  options,
}: {
  current: string;
  options: { slug: string; name: string; description: string; trait: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState(current);
  const [pending, startTransition] = useTransition();

  if (!open) {
    return (
      <Button variant="secondary" className="mt-4" onClick={() => setOpen(true)}>
        Comparar e trocar de perfil
      </Button>
    );
  }

  return (
    <form
      action={(formData) => startTransition(async () => { await changeProfileAction(formData); setOpen(false); })}
      className="mt-4 space-y-4"
    >
      <input type="hidden" name="chosenProfile" value={chosen} />

      <fieldset className="space-y-2.5 border-0 p-0">
        <legend className="sr-only">Perfis disponíveis</legend>
        {options.map((option) => (
          <label
            key={option.slug}
            className="ck-card ck-card-interactive flex cursor-pointer items-start gap-3 p-4"
            style={{ borderColor: chosen === option.slug ? 'var(--ck-green-primary)' : undefined }}
          >
            <input
              type="radio"
              name="profileChoice"
              value={option.slug}
              checked={chosen === option.slug}
              onChange={() => setChosen(option.slug)}
              className="mt-1 h-5 w-5 shrink-0 accent-[color:var(--ck-green-primary)]"
            />
            <span className="min-w-0">
              <span className="block font-medium">
                {option.name}
                {option.slug === current && (
                  <span className="ml-2 text-xs text-ink-muted">(atual)</span>
                )}
              </span>
              <span className="mt-1 block text-sm text-ink-secondary">{option.description}</span>
              <span className="mt-1 block text-xs text-ink-muted">{option.trait}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium">Quer registrar o motivo? (opcional)</span>
        <textarea
          name="note"
          rows={2}
          maxLength={500}
          className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
        />
      </label>

      <div className="flex gap-2">
        <Button type="submit" loading={pending} disabled={chosen === current}>
          Usar este perfil
        </Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

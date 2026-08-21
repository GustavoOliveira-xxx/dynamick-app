'use client';

import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

type Props = {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
  children?: never;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'children'>;

/**
 * Campo de formulário com rótulo real, dica e erro ligados por aria-describedby.
 * A mensagem de erro explica como corrigir, não apenas que houve erro.
 */
export function Field({ label, name, error, hint, ...rest }: Props) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ');

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className="min-h-[46px] w-full rounded-md border bg-[color:var(--ck-bg-raised)] px-3.5 text-[0.95rem] text-ink-primary outline-none transition-colors duration-fast placeholder:text-ink-muted focus:border-[color:var(--ck-green-primary)]"
        style={{ borderColor: error ? 'var(--ck-danger)' : 'var(--ck-border)' }}
        {...rest}
      />
      {hint && (
        <p id={hintId} className="text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs" style={{ color: 'var(--ck-danger)' }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

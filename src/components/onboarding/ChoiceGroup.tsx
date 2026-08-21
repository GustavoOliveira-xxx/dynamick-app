'use client';

import { useId, useState } from 'react';
import type { Question } from '@/lib/onboarding/questionnaire';

/**
 * Opções são radio/checkbox REAIS dentro de fieldset+legend.
 * Isso garante teclado, leitor de tela e funcionamento mesmo sem o JS de estilo
 * (critério de acessibilidade §8 do ONBOARDING_SPEC.md).
 * Seleção nunca é comunicada só por cor: há borda, marcador e texto.
 */

type Props = {
  question: Question;
  defaultValue?: string | string[];
  error?: string;
  onChange?: (value: string | string[]) => void;
};

export function ChoiceGroup({ question, defaultValue, error, onChange }: Props) {
  const groupId = useId();
  const errorId = `${groupId}-error`;
  const hintId = `${groupId}-hint`;
  const multiple = question.type === 'multiple';

  const [selected, setSelected] = useState<string[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof defaultValue === 'string' && defaultValue) return [defaultValue];
    return [];
  });

  const isCustom =
    question.allowCustom &&
    selected.length === 1 &&
    !!selected[0] &&
    !(question.options ?? []).some((option) => option.value === selected[0]);

  function toggle(value: string) {
    const next = multiple
      ? selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
      : [value];
    setSelected(next);
    onChange?.(multiple ? next : (next[0] ?? ''));
  }

  return (
    <fieldset
      className="min-w-0 border-0 p-0"
      aria-describedby={[question.help ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
    >
      <legend className="mb-1 text-lg font-semibold">{question.prompt}</legend>
      {question.help && (
        <p id={hintId} className="mb-3 text-sm text-ink-secondary">
          {question.help}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mb-3 text-sm" style={{ color: 'var(--ck-danger)' }}>
          {error}
        </p>
      )}

      <div className="grid gap-2.5">
        {(question.options ?? []).map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className="ck-card ck-card-interactive flex cursor-pointer items-start gap-3 p-4"
              style={{
                borderColor: checked ? 'var(--ck-green-primary)' : undefined,
                boxShadow: checked ? 'var(--ck-shadow-glow)' : undefined,
              }}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={question.id}
                value={option.value}
                defaultChecked={checked}
                onChange={() => toggle(option.value)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--ck-green-primary)]"
              />
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-medium">{option.label}</span>
                {option.hint && <span className="mt-1 block text-xs text-ink-muted">{option.hint}</span>}
                {option.support && checked && (
                  <span className="mt-2 block text-xs" style={{ color: 'var(--ck-teal)' }}>
                    O que fazemos com isso: {option.support}
                  </span>
                )}
                {checked && <span className="sr-only">(selecionado)</span>}
              </span>
            </label>
          );
        })}

        {question.allowCustom && (
          <label
            className="ck-card ck-card-interactive flex cursor-pointer items-center gap-3 p-4"
            style={{ borderColor: isCustom ? 'var(--ck-green-primary)' : undefined }}
          >
            <input
              type="radio"
              name={question.id}
              value="custom"
              defaultChecked={isCustom}
              onChange={() => {
                setSelected(['custom']);
                onChange?.('custom');
              }}
              className="h-5 w-5 shrink-0 accent-[color:var(--ck-green-primary)]"
            />
            <span className="flex flex-wrap items-center gap-2 text-[0.95rem]">
              {question.customLabel ?? 'Outro'}
              <input
                type="number"
                name={`${question.id}:custom`}
                min={5}
                max={180}
                step={5}
                defaultValue={isCustom ? selected[0] : ''}
                aria-label={question.customLabel ?? 'Valor personalizado'}
                className="min-h-[40px] w-24 rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-2.5"
              />
            </span>
          </label>
        )}
      </div>
    </fieldset>
  );
}

import type { ReactNode } from 'react';

type Tone = 'neutral' | 'green' | 'teal' | 'cyan' | 'warning' | 'danger' | 'lime';

const TONES: Record<Tone, { color: string; border: string }> = {
  neutral: { color: 'var(--ck-text-secondary)', border: 'var(--ck-border)' },
  green: { color: 'var(--ck-green-primary)', border: 'var(--ck-border-strong)' },
  teal: { color: 'var(--ck-teal)', border: 'rgb(53 214 192 / 34%)' },
  cyan: { color: 'var(--ck-cyan)', border: 'rgb(99 230 255 / 34%)' },
  warning: { color: 'var(--ck-warning)', border: 'rgb(255 200 97 / 38%)' },
  danger: { color: 'var(--ck-danger)', border: 'rgb(255 107 122 / 38%)' },
  lime: { color: 'var(--ck-lime)', border: 'rgb(184 243 106 / 38%)' },
};

/** Estado sempre com texto — cor nunca é a única portadora de significado (§14). */
export function Badge({
  children,
  tone = 'neutral',
  icon,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
}) {
  const style = TONES[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-xs font-medium"
      style={{ color: style.color, borderColor: style.border }}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}

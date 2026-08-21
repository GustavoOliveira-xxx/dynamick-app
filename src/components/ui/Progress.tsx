type Props = {
  value: number;
  max?: number;
  label: string;
  /** Mostra o número ao lado — evitado quando cria ansiedade sem ação associada. */
  showValue?: boolean;
  size?: 'sm' | 'md';
  tone?: 'green' | 'teal' | 'warning';
};

const TONES = {
  green: 'linear-gradient(90deg, var(--ck-green-deep), var(--ck-green-primary))',
  teal: 'linear-gradient(90deg, var(--ck-green-deep), var(--ck-teal))',
  warning: 'linear-gradient(90deg, #7a5a12, var(--ck-warning))',
} as const;

/** Preenchimento fluido com rótulo acessível — nunca só cor (§14). */
export function Progress({ value, max = 100, label, showValue, size = 'md', tone = 'green' }: Props) {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.max(0, Math.min(safeMax, value));
  const percentage = Math.round((clamped / safeMax) * 100);

  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-label={label}
        className={`w-full overflow-hidden rounded-pill bg-[color:var(--ck-bg-raised)] ${size === 'sm' ? 'h-1.5' : 'h-2.5'}`}
      >
        <div
          className="h-full rounded-pill transition-[width] duration-slow ease-entry"
          style={{ width: `${percentage}%`, background: TONES[tone] }}
        />
      </div>
      {showValue && (
        <p className="mt-1.5 text-xs text-ink-muted">
          {clamped} de {safeMax}
        </p>
      )}
    </div>
  );
}

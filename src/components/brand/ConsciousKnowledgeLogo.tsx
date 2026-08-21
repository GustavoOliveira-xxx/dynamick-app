import { BRAND, BRAND_ASSETS, useOfficialAssets } from './assets';

type Props = {
  variant?: 'full' | 'compact' | 'symbol';
  className?: string;
};

/**
 * Marca institucional (rodapé, "sobre", assinatura da empresa).
 * Tratamento deliberadamente mais discreto que o da marca do produto (§18.2).
 */
export function ConsciousKnowledgeLogo({ variant = 'compact', className }: Props) {
  if (useOfficialAssets) {
    const src =
      variant === 'symbol'
        ? BRAND_ASSETS.consciousKnowledge.symbol
        : variant === 'compact'
          ? BRAND_ASSETS.consciousKnowledge.compact
          : BRAND_ASSETS.consciousKnowledge.full;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={BRAND.company}
        width={variant === 'symbol' ? 32 : 170}
        height={variant === 'symbol' ? 32 : 44}
        className={className}
        style={{ objectFit: 'contain' }}
      />
    );
  }

  return (
    <span
      data-brand-fallback="true"
      className={`inline-flex items-center gap-2 ${className ?? ''}`}
      role="img"
      aria-label={BRAND.company}
    >
      <svg viewBox="0 0 32 32" width={26} height={26} aria-hidden="true" style={{ flex: 'none' }}>
        <circle cx="16" cy="16" r="13" fill="none" stroke="var(--ck-teal)" strokeWidth="1.4" opacity="0.75" />
        <circle cx="16" cy="16" r="6.5" fill="none" stroke="var(--ck-teal)" strokeWidth="1.2" opacity="0.5" />
        <circle cx="16" cy="16" r="2" fill="var(--ck-teal)" />
      </svg>
      {variant !== 'symbol' && (
        <span
          className="text-[0.72rem] font-medium uppercase tracking-[0.2em]"
          style={{ color: 'var(--ck-text-secondary)' }}
        >
          Conscious Knowledge
        </span>
      )}
    </span>
  );
}

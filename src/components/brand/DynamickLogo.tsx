import { BRAND, BRAND_ASSETS, useOfficialAssets } from './assets';

type Variant = 'full' | 'compact' | 'symbol' | 'mono';

type Props = {
  variant?: Variant;
  /** Desliga a animação de entrada — usado durante leitura e resolução de questões. */
  animated?: boolean;
  className?: string;
  withSignature?: boolean;
};

const SIZES: Record<Variant, { width: number; height: number }> = {
  full: { width: 220, height: 64 },
  compact: { width: 150, height: 40 },
  symbol: { width: 40, height: 40 },
  mono: { width: 180, height: 48 },
};

/**
 * Marca principal da aplicação (cabeçalho, landing, onboarding, dashboard).
 *
 * Enquanto os arquivos oficiais não chegam, desenha um símbolo CK provisório sobre um
 * escudo — geometria abstrata, sem recriar o personagem nem o lettering originais.
 * Um halo discreto garante que a marca não some no fundo quase preto (§18.2).
 */
export function DynamickLogo({
  variant = 'full',
  animated = true,
  className,
  withSignature = false,
}: Props) {
  const size = SIZES[variant];

  if (useOfficialAssets) {
    const src =
      variant === 'symbol'
        ? BRAND_ASSETS.dynamick.symbol
        : variant === 'compact'
          ? BRAND_ASSETS.dynamick.compact
          : variant === 'mono'
            ? BRAND_ASSETS.dynamick.mono
            : BRAND_ASSETS.dynamick.full;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={BRAND.product}
        width={size.width}
        height={size.height}
        className={className}
        style={{ objectFit: 'contain' }}
      />
    );
  }

  const showLettering = variant !== 'symbol';
  const monochrome = variant === 'mono';

  return (
    <span
      data-brand-fallback="true"
      className={`inline-flex items-center gap-2.5 ${className ?? ''}`}
      role="img"
      aria-label={withSignature ? `${BRAND.product} ${BRAND.signature}` : BRAND.product}
    >
      <svg
        viewBox="0 0 48 48"
        width={variant === 'symbol' ? 40 : variant === 'compact' ? 30 : 38}
        height={variant === 'symbol' ? 40 : variant === 'compact' ? 30 : 38}
        aria-hidden="true"
        className={animated ? 'ck-logo-mark' : undefined}
        style={{ flex: 'none', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="ck-mark-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={monochrome ? 'currentColor' : 'var(--ck-cyan)'} />
            <stop offset="55%" stopColor={monochrome ? 'currentColor' : 'var(--ck-green-primary)'} />
            <stop offset="100%" stopColor={monochrome ? 'currentColor' : 'var(--ck-lime)'} />
          </linearGradient>
        </defs>

        {/* Escudo/crista — forma da marca, sem reproduzir a arte original */}
        <path
          d="M24 2.5 43 10v16.5c0 8.6-7.4 16.2-19 19.9C12.4 42.7 5 35.1 5 26.5V10Z"
          fill="var(--ck-bg-deep)"
          stroke="url(#ck-mark-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Núcleo luminoso: conhecimento em movimento */}
        <circle
          cx="24"
          cy="23"
          r="5.4"
          fill="none"
          stroke="url(#ck-mark-grad)"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <circle cx="24" cy="23" r="1.9" fill="url(#ck-mark-grad)" />
        {/* Linhas orbitais — conexão entre tópicos */}
        <ellipse
          cx="24"
          cy="23"
          rx="12.5"
          ry="5.2"
          fill="none"
          stroke="url(#ck-mark-grad)"
          strokeWidth="1.1"
          opacity="0.5"
          transform="rotate(-24 24 23)"
        />
        <ellipse
          cx="24"
          cy="23"
          rx="12.5"
          ry="5.2"
          fill="none"
          stroke="url(#ck-mark-grad)"
          strokeWidth="1.1"
          opacity="0.32"
          transform="rotate(38 24 23)"
        />
        {/* Base: livro aberto estilizado */}
        <path
          d="M15 36.5c3-1.6 6-1.6 9 0 3-1.6 6-1.6 9 0"
          fill="none"
          stroke="url(#ck-mark-grad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>

      {showLettering && (
        <span className="flex flex-col leading-none">
          <span
            className="font-semibold tracking-tight"
            style={{ fontSize: variant === 'compact' ? '1.05rem' : '1.35rem' }}
          >
            <span style={{ color: monochrome ? 'currentColor' : 'var(--ck-text-primary)' }}>Dynami</span>
            <span style={{ color: monochrome ? 'currentColor' : 'var(--ck-green-primary)' }}>CK</span>
          </span>
          {withSignature && (
            <span
              className="mt-1 text-[0.62rem] uppercase tracking-[0.18em]"
              style={{ color: 'var(--ck-text-muted)' }}
            >
              {BRAND.signature}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

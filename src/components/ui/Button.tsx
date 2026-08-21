'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const BASE =
  'relative inline-flex select-none items-center justify-center gap-2 rounded-pill font-medium ' +
  'transition-[transform,box-shadow,background-color,border-color,opacity] duration-fast ease-entry ' +
  'disabled:cursor-not-allowed disabled:opacity-55 active:translate-y-px ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-[linear-gradient(135deg,var(--ck-green-primary),var(--ck-teal))] text-[color:var(--ck-bg-void)] ' +
    'shadow-glow-soft hover:brightness-110 hover:shadow-glow focus-visible:outline-[color:var(--ck-green-glow)]',
  secondary:
    'border border-[color:var(--ck-border-strong)] bg-[color:var(--ck-bg-raised)] text-ink-primary ' +
    'hover:border-[color:var(--ck-green-primary)] hover:bg-[color:var(--ck-bg-panel)] ' +
    'focus-visible:outline-[color:var(--ck-green-primary)]',
  ghost:
    'text-ink-secondary hover:bg-[color:var(--ck-bg-raised)] hover:text-ink-primary ' +
    'focus-visible:outline-[color:var(--ck-green-primary)]',
  danger:
    'border border-[color:var(--ck-danger)] text-[color:var(--ck-danger)] ' +
    'hover:bg-[color:var(--ck-danger)] hover:text-[color:var(--ck-bg-void)] ' +
    'focus-visible:outline-[color:var(--ck-danger)]',
};

// Alvos de toque nunca menores que 44px de altura (critério de acessibilidade).
const SIZES: Record<Size, string> = {
  sm: 'min-h-[40px] px-4 text-sm',
  md: 'min-h-[46px] px-5 text-[0.95rem]',
  lg: 'min-h-[54px] px-7 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

export type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

/**
 * Botão com todos os estados exigidos (§3.6): repouso, hover, foco por teclado,
 * pressionado, carregando, desabilitado e sucesso.
 *
 * Enquanto `loading` está ativo o botão fica realmente desabilitado — não apenas
 * visualmente — o que impede envio duplo do formulário (§20.1).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, success = false, fullWidth, children, className, disabled, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-state={loading ? 'loading' : success ? 'success' : 'idle'}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className ?? ''}`}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {success && !loading && (
        <span aria-hidden="true" className="shrink-0">
          ✓
        </span>
      )}
      <span className={loading ? 'opacity-90' : undefined}>{children}</span>
    </button>
  );
});

type LinkButtonProps = CommonProps & {
  href: string;
  prefetch?: boolean;
  'aria-label'?: string;
};

/** Link que se parece com botão — e navega de verdade (§20.1: nunca href="#"). */
export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth,
  children,
  className,
  prefetch,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

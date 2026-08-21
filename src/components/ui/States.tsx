import type { ReactNode } from 'react';
import { LinkButton } from './Button';

/**
 * Os quatro estados exigidos pela §12: carregando, vazio, erro e sucesso.
 * Toda tela usa estes componentes para que nenhum estado fique sem tratamento.
 */

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={`ck-skeleton ${className ?? ''}`} />;
}

export function LoadingState({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3 p-5">
      <span className="sr-only">{label}</span>
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon = '◇',
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="ck-card flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span
        aria-hidden="true"
        className="grid h-14 w-14 place-items-center rounded-full border border-line-strong text-xl text-[color:var(--ck-green-primary)]"
      >
        {icon}
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-reading text-sm text-ink-secondary">{description}</p>
      {actionLabel && actionHref && (
        <LinkButton href={actionHref} size="sm" className="mt-2">
          {actionLabel}
        </LinkButton>
      )}
    </div>
  );
}

export function ErrorState({
  title = 'Algo não carregou como esperado',
  description = 'Isso é um problema nosso, não seu. Tente de novo em alguns instantes.',
  retryHref,
  children,
}: {
  title?: string;
  description?: string;
  retryHref?: string;
  children?: ReactNode;
}) {
  return (
    <div role="alert" className="ck-card flex flex-col items-start gap-3 p-6">
      <span
        aria-hidden="true"
        className="grid h-10 w-10 place-items-center rounded-full border text-lg"
        style={{ borderColor: 'var(--ck-danger)', color: 'var(--ck-danger)' }}
      >
        !
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-reading text-sm text-ink-secondary">{description}</p>
      {retryHref && (
        <LinkButton href={retryHref} variant="secondary" size="sm">
          Tentar novamente
        </LinkButton>
      )}
      {children}
    </div>
  );
}

export function InlineMessage({
  tone = 'info',
  children,
  title,
}: {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  children: ReactNode;
  title?: string;
}) {
  const colors = {
    info: 'var(--ck-info)',
    success: 'var(--ck-success)',
    warning: 'var(--ck-warning)',
    danger: 'var(--ck-danger)',
  } as const;

  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className="rounded-lg border p-4 text-sm"
      style={{
        borderColor: colors[tone],
        background: 'color-mix(in srgb, var(--ck-bg-panel) 88%, transparent)',
      }}
    >
      {title && (
        <p className="mb-1 font-semibold" style={{ color: colors[tone] }}>
          {title}
        </p>
      )}
      <div className="text-ink-secondary">{children}</div>
    </div>
  );
}

/** Aviso permanente de que o conteúdo é semente de desenvolvimento (§11). */
export function SeedContentNotice({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-ink-muted">
        Conteúdo autoral de desenvolvimento — não representa a cobertura completa do ENEM.
      </p>
    );
  }
  return (
    <InlineMessage tone="info" title="Sobre este conteúdo">
      Esta é uma base inicial <strong>autoral</strong>, criada para desenvolvimento e demonstração.
      Ela não representa a cobertura completa do ENEM nem substitui uma curadoria editorial final.
    </InlineMessage>
  );
}

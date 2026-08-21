import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Reage ao cursor com elevação e borda luminosa; em toque vira feedback de :active. */
  interactive?: boolean;
  as?: 'div' | 'section' | 'article' | 'li';
  id?: string;
};

export function Card({ children, className, interactive, as: Tag = 'div', id }: Props) {
  return (
    <Tag
      id={id}
      className={`ck-card ${interactive ? 'ck-card-interactive' : ''} ${className ?? ''}`}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({
  title,
  description,
  action,
  level = 2,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  level?: 2 | 3 | 4;
}) {
  const Heading = `h${level}` as 'h2' | 'h3' | 'h4';
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 p-5 pb-0">
      <div className="min-w-0">
        <Heading className="text-lg font-semibold">{title}</Heading>
        {description && <p className="mt-1 text-sm text-ink-secondary">{description}</p>}
      </div>
      {action}
    </div>
  );
}

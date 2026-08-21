import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { formatMinutes } from '@/lib/util/format';
import { DIFFICULTY_LABELS, type Difficulty } from '@/lib/domain';

/**
 * Preparação da sessão (§ etapa 6).
 * Mostra objetivo, quantidade, duração, nível, conteúdo e motivo da seleção —
 * e nada de gabarito ou pista antes da resolução.
 */
export function SessionPreparation({
  sessionId,
  title,
  reason,
  minutes,
  itemCount,
  mode,
  topics,
  difficulties,
}: {
  sessionId: string;
  title: string;
  reason: string | null;
  minutes: number;
  itemCount: number;
  mode: 'learning' | 'exam';
  topics: string[];
  difficulties: string[];
}) {
  const level = difficulties.includes('challenging')
    ? 'challenging'
    : difficulties.includes('intermediate')
      ? 'intermediate'
      : 'intro';

  return (
    <div className="ck-enter space-y-6">
      <div>
        <Badge tone="teal">Antes de começar</Badge>
        <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
      </div>

      <Card className="p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Duração estimada</dt>
            <dd className="mt-1 text-lg font-medium">{formatMinutes(minutes)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Questões</dt>
            <dd className="mt-1 text-lg font-medium">{itemCount}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Nível aproximado</dt>
            <dd className="mt-1 text-lg font-medium">{DIFFICULTY_LABELS[level as Difficulty]}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Modo</dt>
            <dd className="mt-1 text-lg font-medium">
              {mode === 'learning' ? 'Aprendizagem' : 'Simulado'}
            </dd>
            <p className="mt-1 text-xs text-ink-muted">
              {mode === 'learning'
                ? 'A correção aparece depois de cada questão.'
                : 'O resultado aparece apenas ao final.'}
            </p>
          </div>
        </dl>

        <div className="ck-hairline my-5" />

        <div>
          <p className="text-xs uppercase tracking-wide text-ink-muted">Conteúdo praticado</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {topics.map((topic) => (
              <li key={topic}>
                <Badge tone="cyan">{topic}</Badge>
              </li>
            ))}
          </ul>
        </div>

        {reason && (
          <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-ink-muted">Por que esta seleção</p>
            <p className="ck-reading mt-1.5 text-sm text-ink-secondary">{reason}</p>
          </div>
        )}
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <LinkButton href={`/sessao/${sessionId}?comecar=sim`} size="lg">
          Começar
        </LinkButton>
        <Link
          href="/inicio"
          className="inline-flex min-h-[46px] items-center px-3 text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
        >
          Agora não
        </Link>
      </div>

      <p className="text-xs text-ink-muted">
        Você pode pausar a qualquer momento. Nada do que já respondeu se perde.
      </p>
    </div>
  );
}

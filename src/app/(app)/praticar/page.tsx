import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { formatMinutes, startOfWeek, WEEKDAY_LABELS } from '@/lib/util/format';
import { SESSION_KIND_LABELS, type SessionKind } from '@/lib/domain';
import { getProfile } from '@/lib/profile/profiles';
import { StartSessionTemplate } from './StartSessionTemplate';

export const metadata: Metadata = { title: 'Praticar' };

/** Escolha da sessão (§ etapa 5) e plano semanal (§ etapa 3). */
export default async function PracticePage() {
  const user = await requireUser('/praticar');

  const [templates, plan, profile, simulations] = await Promise.all([
    prisma.sessionTemplate.findMany({ orderBy: { order: 'asc' } }),
    prisma.studyPlan.findUnique({
      where: { userId_weekStart: { userId: user.id, weekStart: startOfWeek() } },
      include: {
        blocks: {
          orderBy: [{ dayOfWeek: 'asc' }, { order: 'asc' }],
          include: { topic: { select: { name: true, slug: true, id: true } } },
        },
      },
    }),
    prisma.studyProfile.findUnique({ where: { userId: user.id } }),
    prisma.simulation.findMany({ where: { status: 'published' }, orderBy: { questionCount: 'asc' } }),
  ]);

  const personalization = getProfile(profile?.activeProfile).personalization;
  const maxMinutes = profile?.sessionMinutes ?? personalization.baseMinutes;

  // O tempo informado é limite real: sessões maiores aparecem marcadas, nunca escondidas.
  const withinTime = templates.filter((template) => template.minutes <= maxMinutes);
  const longer = templates.filter((template) => template.minutes > maxMinutes);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Praticar</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Você pode seguir o plano, escolher um assunto ou fazer algo curto. Nada aqui é obrigatório.
        </p>
      </div>

      {/* Plano da semana */}
      <Card className="p-5" as="section">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Meu plano da semana</h2>
          <Link href="/perfil/estudo" className="text-sm underline underline-offset-4">
            Ajustar disponibilidade
          </Link>
        </div>

        {plan && plan.blocks.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {plan.blocks.map((block) => (
              <li
                key={block.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{block.title}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {WEEKDAY_LABELS[block.dayOfWeek]} · {formatMinutes(block.minutes)} ·{' '}
                    {SESSION_KIND_LABELS[block.kind as SessionKind]}
                    {block.reason ? ` · ${block.reason}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={block.status === 'done' ? 'green' : 'neutral'}>
                    {block.status === 'done' ? 'Concluído' : 'Planejado'}
                  </Badge>
                  {block.topic && block.status !== 'done' && (
                    <StartSessionTemplate
                      topicId={block.topic.id}
                      kind={block.kind === 'review' ? 'review' : 'practice'}
                      label="Fazer agora"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-secondary">
            Seu plano aparece aqui depois da primeira sessão. Ele se ajusta se você perder um dia —
            sem penalidade.
          </p>
        )}
      </Card>

      {/* Sessões prontas dentro do tempo informado */}
      <section aria-labelledby="sessoes">
        <h2 id="sessoes" className="text-lg font-semibold">
          Sessões prontas
        </h2>
        <p className="mt-1 text-sm text-ink-secondary">
          Cabem no seu tempo declarado de {formatMinutes(maxMinutes)} por sessão.
        </p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {withinTime.map((template) => (
            <li key={template.id}>
              <Card className="flex h-full flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{template.title}</p>
                  <Badge tone="teal">{formatMinutes(template.minutes)}</Badge>
                </div>
                <p className="mt-1.5 flex-1 text-sm text-ink-secondary">{template.goal}</p>
                <p className="mt-2 text-xs text-ink-muted">{template.instructions}</p>
                <LinkButton
                  href={`/praticar/sessao/${template.slug}`}
                  variant="secondary"
                  size="sm"
                  className="mt-3 self-start"
                >
                  Ver esta sessão
                </LinkButton>
              </Card>
            </li>
          ))}
        </ul>

        {longer.length > 0 && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-ink-secondary">
              Ver sessões mais longas que o seu tempo declarado ({longer.length})
            </summary>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {longer.map((template) => (
                <li key={template.id}>
                  <Card className="h-full p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium">{template.title}</p>
                      <Badge tone="warning">{formatMinutes(template.minutes)}</Badge>
                    </div>
                    <p className="mt-1.5 text-sm text-ink-secondary">{template.goal}</p>
                    <LinkButton
                      href={`/praticar/sessao/${template.slug}`}
                      variant="ghost"
                      size="sm"
                      className="mt-3"
                    >
                      Ver mesmo assim
                    </LinkButton>
                  </Card>
                </li>
              ))}
            </ul>
          </details>
        )}
      </section>

      {/* Simulados */}
      <section aria-labelledby="simulados">
        <h2 id="simulados" className="text-lg font-semibold">
          Simulados
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {simulations.map((simulation) => (
            <li key={simulation.id}>
              <Link href={`/simulados/${simulation.slug}`} className="block h-full">
                <Card interactive className="h-full p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{simulation.title}</p>
                    <Badge tone="cyan">{simulation.questionCount} questões</Badge>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-secondary">{simulation.description}</p>
                  <p className="mt-2 text-xs text-ink-muted">
                    {formatMinutes(simulation.minutes)} · cronometrado ou sem pressão
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h2 className="text-lg font-semibold">Tenho pouco tempo</h2>
          <p className="mt-1 text-sm text-ink-secondary">
            Uma explicação curta e duas questões, em 10 minutos.
          </p>
        </div>
        <LinkButton href="/praticar/rapido">Sessão de 10 minutos</LinkButton>
      </Card>
    </div>
  );
}

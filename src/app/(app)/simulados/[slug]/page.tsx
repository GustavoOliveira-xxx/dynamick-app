import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { formatMinutes } from '@/lib/util/format';
import { parseJson } from '@/lib/util/json';
import { startSimulationAction } from '@/lib/simulation/actions';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const simulation = await prisma.simulation.findUnique({ where: { slug }, select: { title: true } });
  return { title: simulation?.title ?? 'Simulado' };
}

export default async function SimulationDetailPage({ params }: Params) {
  const { slug } = await params;
  await requireUser(`/simulados/${slug}`);

  const simulation = await prisma.simulation.findFirst({
    where: { slug, status: 'published' },
    include: { area: { select: { shortName: true } } },
  });
  if (!simulation) notFound();

  const blueprint = parseJson<{ topics?: Record<string, number>; areas?: Record<string, number> }>(
    simulation.blueprint,
    {},
  );

  const availableCount = await prisma.question.count({
    where: { status: 'published', ...(simulation.areaId ? { areaId: simulation.areaId } : {}) },
  });

  const shortOnQuestions = availableCount < simulation.questionCount;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <nav aria-label="Trilha" className="text-xs text-ink-muted">
        <Link href="/simulados" className="underline underline-offset-4">
          Simulados
        </Link>{' '}
        · {simulation.title}
      </nav>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="cyan">{simulation.questionCount} questões</Badge>
          <Badge tone="teal">{formatMinutes(simulation.minutes)}</Badge>
          {simulation.area && <Badge tone="neutral">{simulation.area.shortName}</Badge>}
        </div>
        <h1 className="mt-3 text-2xl font-semibold">{simulation.title}</h1>
        <p className="mt-2 text-ink-secondary">{simulation.description}</p>
      </div>

      {shortOnQuestions && (
        <InlineMessage tone="warning" title="Base de questões insuficiente">
          Este simulado pede {simulation.questionCount} questões e há {availableCount} publicada(s).
          Ele será gerado com o que existe, sem repetir itens, e a curadoria é avisada
          automaticamente.
        </InlineMessage>
      )}

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Distribuição de temas</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
          {Object.entries(blueprint.topics ?? {}).map(([topic, count]) => (
            <li key={topic}>
              • {topic.replace(/-/g, ' ')}: {count} questão(ões)
            </li>
          ))}
          {Object.entries(blueprint.areas ?? {}).map(([area, count]) => (
            <li key={area}>
              • {area.replace(/-/g, ' ')}: {count} questão(ões)
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Como você quer fazer</h2>
        <p className="mt-1 text-sm text-ink-secondary">
          Nos dois modos você pode marcar questões, navegar entre elas e retomar depois de uma queda
          de conexão.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <form action={startSimulationAction}>
            <input type="hidden" name="slug" value={simulation.slug} />
            <input type="hidden" name="timed" value="true" />
            <Card className="flex h-full flex-col p-4">
              <p className="font-medium">Cronometrado</p>
              <p className="mt-1 flex-1 text-sm text-ink-secondary">
                {formatMinutes(simulation.minutes)} no relógio, como na prova.
              </p>
              <Button type="submit" size="sm" className="mt-3">
                Começar cronometrado
              </Button>
            </Card>
          </form>

          <form action={startSimulationAction}>
            <input type="hidden" name="slug" value={simulation.slug} />
            <input type="hidden" name="timed" value="false" />
            <Card className="flex h-full flex-col p-4">
              <p className="font-medium">Sem pressão</p>
              <p className="mt-1 flex-1 text-sm text-ink-secondary">
                O tempo continua sendo registrado, mas não há contagem regressiva.
              </p>
              <Button type="submit" size="sm" variant="secondary" className="mt-3">
                Começar sem pressão
              </Button>
            </Card>
          </form>
        </div>
      </Card>

      <p className="text-xs text-ink-muted">
        A pontuação do simulado é um indicador de desempenho dentro da plataforma. Ela não estima nem
        prevê sua nota oficial no ENEM.
      </p>
    </div>
  );
}

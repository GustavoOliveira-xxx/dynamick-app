import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { DynamickLogo } from '@/components/brand/DynamickLogo';
import { DynamicBackground } from '@/components/visual/DynamicBackground';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { startDiagnosticAction, skipDiagnosticAction } from './actions';

export const metadata: Metadata = { title: 'Diagnóstico inicial' };

/**
 * Diagnóstico inicial OPCIONAL (§ etapa 2).
 * Duração estimada visível, possibilidade de pular e linguagem não determinista.
 */
export default async function DiagnosticPage() {
  const user = await requireUser('/diagnostico');

  const [profile, areas, existing] = await Promise.all([
    prisma.studyProfile.findUnique({ where: { userId: user.id } }),
    prisma.knowledgeArea.findMany({ orderBy: { order: 'asc' }, select: { shortName: true } }),
    prisma.studySession.findFirst({
      where: { userId: user.id, kind: 'diagnostic', status: { in: ['in_progress', 'paused'] } },
    }),
  ]);

  return (
    <>
      <DynamicBackground intensity="medium" />
      <div className="relative min-h-dvh" style={{ zIndex: 'var(--ck-z-content)' }}>
        <header className="ck-shell flex items-center justify-between py-5">
          <Link href="/inicio" aria-label="Ir para o início">
            <DynamickLogo variant="compact" animated={false} />
          </Link>
          <Link href="/inicio" className="text-sm text-ink-secondary underline underline-offset-4">
            Fazer isso depois
          </Link>
        </header>

        <main id="conteudo-principal" className="ck-shell max-w-2xl pb-16">
          <div className="space-y-6">
            <div>
              <Badge tone="teal">Opcional · cerca de 20 minutos</Badge>
              <h1 className="mt-3 text-2xl font-semibold">Diagnóstico leve</h1>
              <p className="mt-2 text-ink-secondary">
                Oito questões distribuídas entre as quatro áreas. Não é prova, não vale nota e você
                pode pular o que não souber.
              </p>
            </div>

            {existing && (
              <InlineMessage tone="info" title="Você já tem um diagnóstico em andamento">
                <Link
                  href={`/sessao/${existing.id}?comecar=sim`}
                  className="underline underline-offset-4"
                >
                  Retomar de onde parei
                </Link>
              </InlineMessage>
            )}

            <Card className="p-6">
              <h2 className="text-lg font-semibold">O que fazemos com isso</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
                <li>• Um primeiro mapa em três faixas: mais desenvolvido, em desenvolvimento e prioridade de revisão.</li>
                <li>• Comparamos com o que você declarou no onboarding — a prática pode discordar de você.</li>
                <li>• Registramos acerto, tempo, confiança e o tópico de cada questão.</li>
              </ul>

              <div className="ck-hairline my-5" />

              <p className="text-xs uppercase tracking-wide text-ink-muted">Áreas cobertas</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {areas.map((area) => (
                  <li key={area.shortName}>
                    <Badge tone="cyan">{area.shortName}</Badge>
                  </li>
                ))}
              </ul>
            </Card>

            <InlineMessage tone="info">
              O resultado <strong>não</strong> diz que você é bom ou ruim em nada. Ele aponta onde
              vale começar agora — e muda conforme você pratica.
            </InlineMessage>

            <div className="flex flex-wrap items-center gap-3">
              <form action={startDiagnosticAction}>
                <Button type="submit" size="lg">
                  Começar o diagnóstico
                </Button>
              </form>

              <form action={skipDiagnosticAction}>
                <Button type="submit" variant="ghost">
                  Pular por enquanto
                </Button>
              </form>
            </div>

            {profile?.diagnosticStatus === 'skipped' && (
              <p className="text-xs text-ink-muted">
                Você já pulou o diagnóstico antes. Ele continua disponível quando quiser.
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

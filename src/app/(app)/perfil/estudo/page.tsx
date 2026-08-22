import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { getProfile, PROFILES } from '@/lib/profile/profiles';
import { describePersonalization } from '@/lib/profile/engine';
import { DIMENSION_LABELS, DIMENSION_KEYS, type DimensionKey } from '@/lib/domain';
import { AvailabilityForm } from './AvailabilityForm';
import { ProfileSwitcher } from './ProfileSwitcher';

export const metadata: Metadata = { title: 'Meu perfil de estudo' };

/**
 * "Meu perfil de estudo" (§19.1).
 * O estudante pode ver os fatores, comparar perfis e mudar a qualquer momento.
 * As dimensões DECLARADAS e OBSERVADAS aparecem separadas (§7 regra 3).
 */
export default async function StudyProfilePage() {
  const user = await requireUser('/perfil/estudo');

  const profile = await prisma.studyProfile.findUnique({
    where: { userId: user.id },
    include: { dimensions: true },
  });
  const snapshots = await prisma.profileSnapshot.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const definition = getProfile(profile?.activeProfile);
  const declared = new Map(
    profile?.dimensions.filter((d) => d.source === 'declared').map((d) => [d.key, d]) ?? [],
  );
  const observed = new Map(
    profile?.dimensions.filter((d) => d.source === 'observed').map((d) => [d.key, d]) ?? [],
  );

  return (
    <div className="space-y-6">
      <div>
        <nav aria-label="Trilha" className="text-xs text-ink-muted">
          <Link href="/perfil" className="underline underline-offset-4 hover:text-ink-primary">
            Perfil
          </Link>{' '}
          · Meu perfil de estudo
        </nav>
        <h1 className="mt-2 text-2xl font-semibold">Meu perfil de estudo</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Este perfil é uma hipótese de trabalho, não um rótulo. Ele muda conforme você pratica — e
          você pode mudá-lo a qualquer momento.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="green">{definition.name}</Badge>
          {profile?.provisional && <Badge tone="warning">Provisório</Badge>}
          {profile?.confidence && (
            <Badge tone="neutral">
              Confiança{' '}
              {profile.confidence === 'high' ? 'alta' : profile.confidence === 'medium' ? 'média' : 'baixa'}
            </Badge>
          )}
        </div>
        <p className="mt-3 text-ink-secondary">{definition.description}</p>

        <h2 className="mt-6 text-sm font-medium uppercase tracking-wide text-ink-muted">
          Como isso muda seus estudos
        </h2>
        <ul className="mt-2 space-y-1.5 text-sm text-ink-secondary">
          {describePersonalization(definition.slug).map((effect) => (
            <li key={effect}>• {effect}</li>
          ))}
        </ul>
      </Card>

      {/* Dimensões: declaradas x observadas */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">O que compõe o seu perfil</h2>
        <p className="mt-1 text-sm text-ink-secondary">
          O que você <strong>declarou</strong> no onboarding fica separado do que a plataforma{' '}
          <strong>observou</strong> na prática. Quando os dois divergem, a gente te avisa antes de
          mudar algo.
        </p>

        <ul className="mt-4 space-y-4">
          {DIMENSION_KEYS.map((key: DimensionKey) => {
            const declaredValue = declared.get(key)?.value ?? 50;
            const observedEntry = observed.get(key);

            return (
              <li key={key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{DIMENSION_LABELS[key]}</span>
                  <span className="text-ink-muted">
                    declarado {declaredValue}
                    {observedEntry ? ` · observado ${observedEntry.value}` : ''}
                  </span>
                </div>
                <div className="mt-1.5 space-y-1">
                  <Progress
                    value={declaredValue}
                    label={`${DIMENSION_LABELS[key]} declarado: ${declaredValue} de 100`}
                    size="sm"
                    tone="teal"
                  />
                  {observedEntry && (
                    <>
                      <Progress
                        value={observedEntry.value}
                        label={`${DIMENSION_LABELS[key]} observado: ${observedEntry.value} de 100`}
                        size="sm"
                        tone="green"
                      />
                      {observedEntry.evidence && (
                        <p className="text-xs text-ink-muted">{observedEntry.evidence}</p>
                      )}
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Disponibilidade */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Minha disponibilidade</h2>
        <p className="mt-1 text-sm text-ink-secondary">
          O tempo informado é tratado como <strong>limite real</strong>, não como meta. Nenhuma
          sessão sugerida vai passar dele.
        </p>
        <AvailabilityForm
          daysPerWeek={profile?.daysPerWeek ?? 3}
          sessionMinutes={profile?.sessionMinutes ?? 20}
          examDate={profile?.examDate ? profile.examDate.toISOString().slice(0, 10) : ''}
        />
      </Card>

      {/* Trocar de perfil */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Esse perfil não combina mais?</h2>
        <p className="mt-1 text-sm text-ink-secondary">
          Escolha outro quando quiser. Sua escolha tem prioridade sobre a classificação automática, e
          nada do seu histórico é apagado.
        </p>
        <ProfileSwitcher
          current={definition.slug}
          options={PROFILES.map((item) => ({
            slug: item.slug,
            name: item.name,
            description: item.description,
            trait: item.trait,
          }))}
        />
      </Card>

      {/* Histórico de mudanças */}
      {snapshots.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Histórico do seu perfil</h2>
          <ul className="mt-3 space-y-3">
            {snapshots.map((snapshot) => (
              <li key={snapshot.id} className="border-l-2 border-line pl-3">
                <p className="text-sm">{snapshot.reason}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(snapshot.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-5">
        <h2 className="text-base font-semibold">Quer refazer o questionário?</h2>
        <p className="mt-1 text-sm text-ink-secondary">
          Suas respostas atuais ficam salvas. Você pode ajustar só o que mudou.
        </p>
        <Link
          href="/onboarding/contexto"
          className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-ink-primary"
        >
          Editar minhas respostas do onboarding
        </Link>
      </Card>
    </div>
  );
}

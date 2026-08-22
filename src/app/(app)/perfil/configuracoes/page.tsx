import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { AppearanceForm } from './AppearanceForm';
import { NotificationsForm } from './NotificationsForm';

export const metadata: Metadata = { title: 'Interface e acessibilidade' };

export default async function SettingsPage() {
  const user = await requireUser('/perfil/configuracoes');
  const [preference, notification] = await Promise.all([
    prisma.personalizationPreference.findUnique({ where: { userId: user.id } }),
    prisma.notificationPreference.findUnique({ where: { userId: user.id } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <nav aria-label="Trilha" className="text-xs text-ink-muted">
          <Link href="/perfil" className="underline underline-offset-4 hover:text-ink-primary">
            Perfil
          </Link>{' '}
          · Interface e acessibilidade
        </nav>
        <h1 className="mt-2 text-2xl font-semibold">Interface e acessibilidade</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Tudo aqui vale imediatamente em todas as telas.
        </p>
      </div>

      <AppearanceForm
        initial={{
          theme: preference?.theme ?? 'dark',
          textScale: preference?.textScale ?? '100',
          reducedMotion: preference?.reducedMotion ?? 'auto',
          highContrast: preference?.highContrast ?? false,
          visualIntensity: preference?.visualIntensity ?? 'full',
          correctionMode: preference?.correctionMode ?? 'learning',
          showTimer: preference?.showTimer ?? true,
          confidencePrompt: preference?.confidencePrompt ?? true,
          hintsBeforeAnswer: preference?.hintsBeforeAnswer ?? false,
        }}
      />

      <NotificationsForm
        enabled={notification?.enabled ?? false}
        timeOfDay={notification?.timeOfDay ?? ''}
      />
    </div>
  );
}

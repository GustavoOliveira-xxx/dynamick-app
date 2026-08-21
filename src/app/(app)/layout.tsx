import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { MainNav } from '@/components/layout/MainNav';
import { DynamickLogo } from '@/components/brand/DynamickLogo';
import { DynamicBackground } from '@/components/visual/DynamicBackground';
import { SignOutButton } from '@/components/layout/SignOutButton';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser('/inicio');

  return (
    <>
      {/* Intensidade média: presente no ambiente, discreta no conteúdo. */}
      <DynamicBackground intensity="medium" />

      <div className="relative min-h-dvh" style={{ zIndex: 'var(--ck-z-content)' }}>
        <header className="border-b border-line">
          <div className="ck-shell flex items-center justify-between py-3.5">
            <Link href="/inicio" aria-label="Ir para o início">
              <DynamickLogo variant="compact" animated={false} />
            </Link>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-ink-secondary sm:inline">
                {user.name.split(' ')[0]}
              </span>
              <SignOutButton />
            </div>
          </div>
        </header>

        <div className="ck-shell flex gap-8">
          <MainNav isAdmin={user.role === 'admin'} />
          <main id="conteudo-principal" className="min-w-0 flex-1 pb-28 pt-6 md:pb-16">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

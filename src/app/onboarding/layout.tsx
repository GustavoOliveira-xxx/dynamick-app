import Link from 'next/link';
import { DynamickLogo } from '@/components/brand/DynamickLogo';
import { DynamicBackground } from '@/components/visual/DynamicBackground';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Intensidade média (§18.3): ambiente acolhedor, foco nas perguntas. */}
      <DynamicBackground intensity="medium" />
      <div className="relative flex min-h-dvh flex-col" style={{ zIndex: 'var(--ck-z-content)' }}>
        <header className="ck-shell flex items-center justify-between py-5">
          <DynamickLogo variant="compact" animated={false} />
          <Link
            href="/inicio"
            className="text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
          >
            Fazer isso depois
          </Link>
        </header>
        <main id="conteudo-principal" className="ck-shell flex-1 pb-16 pt-2">
          <div className="mx-auto w-full max-w-2xl">{children}</div>
        </main>
      </div>
    </>
  );
}

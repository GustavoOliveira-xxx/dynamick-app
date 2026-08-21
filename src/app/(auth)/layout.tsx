import Link from 'next/link';
import { DynamickLogo } from '@/components/brand/DynamickLogo';
import { DynamicBackground } from '@/components/visual/DynamicBackground';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Intensidade média: ambiente acolhedor sem competir com o formulário. */}
      <DynamicBackground intensity="medium" />
      <div className="relative flex min-h-dvh flex-col" style={{ zIndex: 'var(--ck-z-content)' }}>
        <header className="ck-shell py-6">
          <Link href="/" aria-label="Voltar para a página inicial">
            <DynamickLogo variant="compact" />
          </Link>
        </header>
        <main id="conteudo-principal" className="ck-shell flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-md">{children}</div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

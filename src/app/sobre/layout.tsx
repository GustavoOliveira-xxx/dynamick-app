import Link from 'next/link';
import { DynamickLogo } from '@/components/brand/DynamickLogo';
import { DynamicBackground } from '@/components/visual/DynamicBackground';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function StaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DynamicBackground intensity="low" />
      <div className="relative min-h-dvh" style={{ zIndex: 'var(--ck-z-content)' }}>
        <header className="ck-shell py-5">
          <Link href="/" aria-label="Voltar para a página inicial">
            <DynamickLogo variant="compact" />
          </Link>
        </header>
        <main id="conteudo-principal" className="ck-shell max-w-reading pb-16">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

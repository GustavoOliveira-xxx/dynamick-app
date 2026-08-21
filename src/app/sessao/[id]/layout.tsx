import { DynamicBackground } from '@/components/visual/DynamicBackground';
import { DynamickLogo } from '@/components/brand/DynamickLogo';

/**
 * Layout da sessão de questões.
 * Intensidade visual BAIXA (§18.3): leitura e concentração acima de tudo.
 * A logo não anima aqui — §18.2 proíbe movimento de marca durante a resolução.
 */
export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DynamicBackground intensity="low" />
      <div className="relative min-h-dvh" style={{ zIndex: 'var(--ck-z-content)' }}>
        <header className="border-b border-line">
          <div className="ck-shell flex items-center justify-between py-3">
            <DynamickLogo variant="compact" animated={false} />
          </div>
        </header>
        <main id="conteudo-principal" className="ck-shell max-w-3xl py-6">
          {children}
        </main>
      </div>
    </>
  );
}

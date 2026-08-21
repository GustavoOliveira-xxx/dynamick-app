import type { Metadata } from 'next';
import { LinkButton } from '@/components/ui/Button';
import { DynamicBackground } from '@/components/visual/DynamicBackground';

export const metadata: Metadata = { title: 'Sem acesso' };

/**
 * Destino de quem tenta acessar uma rota administrativa sem permissão.
 * A recusa acontece no servidor (requireAdmin); esta tela só explica o resultado.
 */
export default function NoAccessPage() {
  return (
    <>
      <DynamicBackground intensity="low" />
      <main
        id="conteudo-principal"
        className="ck-shell relative flex min-h-dvh items-center justify-center py-16"
        style={{ zIndex: 'var(--ck-z-content)' }}
      >
        <div className="ck-card max-w-md p-7">
          <h1 className="text-2xl font-semibold">Você não tem acesso a esta área</h1>
          <p className="mt-3 text-sm text-ink-secondary">
            Esta parte da plataforma é restrita à equipe de curadoria de conteúdo. Se você acha que
            deveria ter acesso, fale com quem administra a plataforma.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/inicio">Ir para o meu início</LinkButton>
            <LinkButton href="/" variant="secondary">
              Página inicial
            </LinkButton>
          </div>
        </div>
      </main>
    </>
  );
}

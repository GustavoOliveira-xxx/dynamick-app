'use client';

import dynamic from 'next/dynamic';
import type { VisualIntensity } from '@/lib/domain';

/**
 * Fundo dinâmico por contexto (§3.5 e tabela da §18.3).
 * A cena canvas é carregada sob demanda (`lazy`) e nunca bloqueia a primeira pintura:
 * o gradiente base é CSS puro e já dá profundidade sozinho.
 */
const KnowledgeField = dynamic(() => import('./KnowledgeField'), {
  ssr: false,
  loading: () => null,
});

type Props = {
  intensity?: VisualIntensity;
  interactive?: boolean;
};

const GRADIENTS: Record<VisualIntensity, string> = {
  high: `radial-gradient(1100px 620px at 50% -12%, rgb(46 232 138 / 12%), transparent 62%),
         radial-gradient(760px 520px at 88% 8%, rgb(53 214 192 / 9%), transparent 60%),
         radial-gradient(680px 460px at 6% 32%, rgb(99 230 255 / 7%), transparent 58%)`,
  'medium-high': `radial-gradient(900px 520px at 50% -14%, rgb(46 232 138 / 9%), transparent 60%),
         radial-gradient(640px 420px at 92% 12%, rgb(53 214 192 / 7%), transparent 58%)`,
  medium: `radial-gradient(760px 420px at 50% -16%, rgb(46 232 138 / 6%), transparent 58%)`,
  low: `radial-gradient(640px 360px at 50% -20%, rgb(46 232 138 / 4%), transparent 55%)`,
};

export function DynamicBackground({ intensity = 'medium', interactive = false }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 'var(--ck-z-backdrop)' }}
    >
      <div className="absolute inset-0" style={{ background: GRADIENTS[intensity] }} />
      {intensity !== 'low' && (
        <div className="absolute inset-0" style={{ opacity: 'var(--ck-visual-opacity)' }}>
          <KnowledgeField intensity={intensity} interactive={interactive} />
        </div>
      )}
      {/* Véu final: garante contraste do texto sobre qualquer estado da cena (§20.1). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgb(2 5 4 / 30%), rgb(2 5 4 / 62%) 60%, rgb(2 5 4 / 86%))',
        }}
      />
    </div>
  );
}

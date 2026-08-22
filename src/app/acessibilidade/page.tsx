import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = { title: 'Acessibilidade' };

export default function AccessibilityPage() {
  return (
    <div className="ck-reading space-y-6">
      <h1 className="text-2xl font-semibold">Acessibilidade</h1>
      <p className="text-ink-secondary">
        O que já está implementado e o que ainda falta. Preferimos ser específicos a prometer
        conformidade total.
      </p>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">O que já funciona</h2>
        <ul className="space-y-1.5 text-ink-secondary">
          <li>• Navegação completa por teclado, com foco sempre visível.</li>
          <li>• Alternativas e opções são controles reais (radio e checkbox), não divs clicáveis.</li>
          <li>• Todo campo tem rótulo associado; erros são ligados por <code>aria-describedby</code>.</li>
          <li>• Nenhum estado é comunicado apenas por cor — sempre há texto ou ícone junto.</li>
          <li>• Alvos de toque com pelo menos 44 × 44 pixels.</li>
          <li>
            • <code>prefers-reduced-motion</code> respeitado, além de um modo de animações reduzidas
            no seu perfil.
          </li>
          <li>• Modo visual reduzido, que desliga o fundo animado.</li>
          <li>• Alto contraste e texto até 125% sem quebra de layout.</li>
          <li>• Tabelas rolam no próprio contêiner: a página nunca rola na horizontal.</li>
          <li>• Link &ldquo;pular para o conteúdo principal&rdquo; no início de cada página.</li>
          <li>• A aplicação continua utilizável se o canvas do fundo não carregar.</li>
        </ul>
      </Card>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">O que ainda não validamos</h2>
        <ul className="space-y-1.5 text-ink-secondary">
          <li>• Teste completo com leitores de tela reais (NVDA, VoiceOver, TalkBack).</li>
          <li>• Auditoria formal de conformidade WCAG por avaliador externo.</li>
          <li>• Legendas e transcrições — ainda não há conteúdo em áudio ou vídeo.</li>
        </ul>
      </Card>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">Encontrou uma barreira?</h2>
        <p className="text-ink-secondary">
          Em qualquer questão você pode abrir uma denúncia do tipo &ldquo;problema de
          acessibilidade&rdquo;. Ela vai direto para a fila da curadoria, com registro da resolução.
          Você também pode ajustar tema, contraste, tamanho de texto e animações em{' '}
          <Link href="/perfil/configuracoes" className="underline underline-offset-4">
            Interface e acessibilidade
          </Link>
          .
        </p>
      </Card>
    </div>
  );
}

import type { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { ImportForm } from './ImportForm';

export const metadata: Metadata = { title: 'Importar questões' };

const EXAMPLE = `[
  {
    "slug": "q-exemplo-import-1",
    "topicSlug": "porcentagem-e-variacao",
    "skillSlug": "resolver-situacoes-com-variacao-percentual",
    "stem": "Um produto de R$ 120,00 recebe 25% de desconto. Qual é o valor final?",
    "difficulty": "intro",
    "cognitiveFormat": "concept",
    "origin": "AUTORAL_SEED",
    "license": "Conteúdo autoral de desenvolvimento",
    "explanation": "120 × 0,75 = 90. Desconto de 25% corresponde ao fator 0,75.",
    "options": [
      { "label": "A", "text": "R$ 30,00", "rationale": "É o valor do desconto, não o preço final." },
      { "label": "B", "text": "R$ 90,00", "isCorrect": true, "rationale": "120 × 0,75 = 90." },
      { "label": "C", "text": "R$ 95,00", "rationale": "Não corresponde a nenhum cálculo válido." },
      { "label": "D", "text": "R$ 100,00", "rationale": "Corresponde a um desconto de cerca de 17%." },
      { "label": "E", "text": "R$ 150,00", "rationale": "Aplicou aumento em vez de desconto." }
    ]
  }
]`;

/**
 * Importação validada por JSON (§11.10).
 * O administrador adiciona conteúdo sem tocar no código — e nada entra publicado.
 */
export default function ImportPage() {
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <h2 className="text-lg font-semibold">Como funciona</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
          <li>• A validação acontece antes de qualquer gravação: se um item falhar, nada é importado.</li>
          <li>• Cada questão precisa de exatamente uma alternativa correta e comentário em todas.</li>
          <li>• O tópico precisa existir; o slug é o identificador estável.</li>
          <li>
            • Tudo entra como <strong>rascunho</strong>. Nenhuma questão importada chega ao estudante
            sem revisão editorial.
          </li>
          <li>• Origem e licença são obrigatórias — inclusive para conteúdo autoral.</li>
        </ul>
      </Card>

      <ImportForm example={EXAMPLE} />

      <Card className="p-5">
        <h2 className="text-lg font-semibold">Importação por CSV</h2>
        <p className="mt-2 text-sm text-ink-secondary">
          Ainda não implementada. Está registrada como pendência no IMPLEMENTATION_PLAN.md (item
          6.5). Por enquanto, use o formato JSON acima.
        </p>
      </Card>
    </div>
  );
}

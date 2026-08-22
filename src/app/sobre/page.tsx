import type { Metadata } from 'next';
import { ConsciousKnowledgeLogo } from '@/components/brand/ConsciousKnowledgeLogo';
import { BRAND } from '@/components/brand/assets';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = { title: 'Sobre' };

export default function AboutPage() {
  return (
    <div className="ck-reading space-y-6">
      <h1 className="text-2xl font-semibold">Sobre</h1>

      <Card className="space-y-4 p-6">
        <ConsciousKnowledgeLogo variant="full" />
        <p className="text-ink-secondary">
          <strong>{BRAND.company}</strong> é a empresa responsável pela plataforma.{' '}
          <strong>{BRAND.product}</strong> é o produto de estudos para o ENEM.
        </p>
      </Card>

      <section>
        <h2 className="text-lg font-semibold">O que estamos construindo</h2>
        <p className="mt-2 text-ink-secondary">
          Um sistema de aprendizagem, não um banco de questões. O ciclo é sempre o mesmo: entender o
          que estudar, aprender o conceito, praticar, receber uma correção útil, identificar o motivo
          do erro, revisar no momento certo e praticar uma situação diferente.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">O que não fazemos</h2>
        <ul className="mt-2 space-y-1.5 text-ink-secondary">
          <li>• Não prometemos aprovação nem estimamos nota oficial.</li>
          <li>• Não usamos ranking público nem comparação entre estudantes.</li>
          <li>• Não escondemos por que uma atividade foi recomendada.</li>
          <li>• Não tratamos o perfil do estudante como diagnóstico ou rótulo permanente.</li>
          <li>• Não usamos IA para fabricar conteúdo sem revisão editorial.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Sobre o conteúdo</h2>
        <p className="mt-2 text-ink-secondary">
          Todo o conteúdo desta versão é <strong>autoral</strong>, criado para desenvolvimento e
          demonstração. Ele não representa a cobertura completa do ENEM e não reproduz questões de
          provas oficiais, livros ou plataformas de terceiros. Cada questão registra origem e
          licença.
        </p>
      </section>
    </div>
  );
}

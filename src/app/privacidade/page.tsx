import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = { title: 'Privacidade e dados' };

export default function PrivacyPage() {
  return (
    <div className="ck-reading space-y-6">
      <h1 className="text-2xl font-semibold">Privacidade e dados</h1>
      <p className="text-ink-secondary">
        Tratamos dados de estudo como dados pessoais. Esta página descreve, em linguagem direta, o
        que guardamos e por quê.
      </p>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">O que coletamos</h2>
        <ul className="space-y-1.5 text-ink-secondary">
          <li>• Nome (ou apelido) e e-mail, para identificar sua conta.</li>
          <li>• Suas respostas do onboarding, para montar as recomendações.</li>
          <li>• Suas respostas às questões, tempo e confiança declarada.</li>
          <li>• Suas anotações e registros no caderno de erros.</li>
          <li>• Suas preferências de interface e de lembretes.</li>
        </ul>
        <p className="text-ink-secondary">
          <strong>Não coletamos</strong> dados sensíveis, não pedimos documento, não perguntamos
          sobre saúde e não fazemos nenhuma avaliação clínica ou psicológica.
        </p>
      </Card>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">Para que usamos</h2>
        <p className="text-ink-secondary">
          Exclusivamente para personalizar a sua experiência dentro da plataforma: escolher a próxima
          sessão, agendar revisões e mostrar seu progresso. Não vendemos dados, não usamos para
          publicidade e não compartilhamos com terceiros.
        </p>
      </Card>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">Seus direitos</h2>
        <ul className="space-y-1.5 text-ink-secondary">
          <li>
            • <strong>Exportar</strong>: baixe um arquivo com tudo o que guardamos, em{' '}
            <Link href="/perfil/dados" className="underline underline-offset-4">
              Privacidade e meus dados
            </Link>
            .
          </li>
          <li>
            • <strong>Corrigir</strong>: edite suas respostas do onboarding e suas preferências
            quando quiser.
          </li>
          <li>
            • <strong>Excluir</strong>: apague sua conta e seus dados pessoais a qualquer momento.
          </li>
        </ul>
      </Card>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">Menores de idade</h2>
        <p className="text-ink-secondary">
          Esta versão de desenvolvimento não implementa fluxo de consentimento parental. Antes de
          qualquer uso real com menores de 16 anos, esse fluxo precisa ser definido conforme a
          legislação aplicável. A pendência está registrada no PROJECT_AUDIT.md do projeto.
        </p>
      </Card>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">Segurança</h2>
        <p className="text-ink-secondary">
          Senhas são armazenadas com hash (bcrypt) e nunca em texto. A sessão usa cookie assinado,
          httpOnly, e é invalidada no servidor ao sair. Endpoints sensíveis têm limite de tentativas.
          Rotas administrativas são verificadas no servidor, não apenas escondidas na interface.
        </p>
      </Card>
    </div>
  );
}

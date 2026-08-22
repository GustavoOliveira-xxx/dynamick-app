import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { LinkButton } from '@/components/ui/Button';
import { DeleteAccount } from './DeleteAccount';

export const metadata: Metadata = { title: 'Privacidade e meus dados' };

/** Privacidade (§5.1 e §13): exportação, explicação de uso e exclusão de conta. */
export default async function DataPage() {
  const user = await requireUser('/perfil/dados');

  const counts = await prisma.$transaction([
    prisma.attempt.count({ where: { userId: user.id } }),
    prisma.studySession.count({ where: { userId: user.id } }),
    prisma.errorNote.count({ where: { userId: user.id } }),
    prisma.onboardingResponse.count({ where: { userId: user.id } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <nav aria-label="Trilha" className="text-xs text-ink-muted">
          <Link href="/perfil" className="underline underline-offset-4 hover:text-ink-primary">
            Perfil
          </Link>{' '}
          · Privacidade e meus dados
        </nav>
        <h1 className="mt-2 text-2xl font-semibold">Privacidade e meus dados</h1>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">O que guardamos sobre você</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
          <li>• Nome e e-mail — para identificar sua conta.</li>
          <li>• {counts[3]} resposta(s) do onboarding — para montar as recomendações.</li>
          <li>• {counts[1]} sessão(ões) e {counts[0]} tentativa(s) — para acompanhar seu progresso.</li>
          <li>• {counts[2]} registro(s) no caderno de erros — para sugerir revisões.</li>
          <li>• Suas preferências de interface.</li>
        </ul>
        <p className="mt-4 text-sm text-ink-secondary">
          Tratamos dados de estudo como dados pessoais. Não coletamos informação sensível, não
          vendemos dados e não usamos seu histórico para nada além de personalizar a sua experiência
          dentro da plataforma.
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Exportar meus dados</h2>
        <p className="mt-2 text-sm text-ink-secondary">
          Baixe um arquivo JSON com tudo o que está associado à sua conta.
        </p>
        <LinkButton href="/api/meus-dados" variant="secondary" className="mt-4">
          Baixar meus dados
        </LinkButton>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Excluir minha conta</h2>
        <p className="mt-2 text-sm text-ink-secondary">
          A exclusão remove seus dados pessoais e encerra todas as sessões abertas. Registros
          editoriais anônimos (como estatísticas agregadas de questões) permanecem sem qualquer
          vínculo com você. Esta ação não pode ser desfeita.
        </p>
        <DeleteAccount />
      </Card>
    </div>
  );
}

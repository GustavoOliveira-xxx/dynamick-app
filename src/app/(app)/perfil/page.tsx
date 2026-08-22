import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getProfile } from '@/lib/profile/profiles';
import { formatMinutes } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Perfil' };

const SECTIONS = [
  {
    href: '/perfil/estudo',
    title: 'Meu perfil de estudo',
    hint: 'Ver, entender e mudar o perfil, a disponibilidade e as preferências de sessão',
  },
  {
    href: '/perfil/relatorio',
    title: 'Meu progresso',
    hint: 'O que evoluiu, o que precisa de atenção e o que fazer a respeito',
  },
  {
    href: '/perfil/configuracoes',
    title: 'Interface e acessibilidade',
    hint: 'Tema, tamanho do texto, contraste, animações e lembretes',
  },
  {
    href: '/perfil/dados',
    title: 'Privacidade e meus dados',
    hint: 'Exportar tudo o que guardamos ou excluir sua conta',
  },
] as const;

export default async function ProfileHubPage() {
  const user = await requireUser('/perfil');
  const profile = await prisma.studyProfile.findUnique({ where: { userId: user.id } });
  const definition = getProfile(profile?.activeProfile);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="mt-1 text-sm text-ink-muted">{user.email}</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="green">{definition.name}</Badge>
          {profile?.provisional && <Badge tone="warning">Provisório</Badge>}
        </div>
        <p className="mt-3 text-ink-secondary">{definition.description}</p>
        <p className="mt-2 text-sm text-ink-muted">
          {profile?.daysPerWeek ?? 3} dia(s) por semana ·{' '}
          {formatMinutes(profile?.sessionMinutes ?? 20)} por sessão
        </p>
        <Link
          href="/perfil/estudo"
          className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-ink-primary"
        >
          Ver ou mudar meu perfil
        </Link>
      </Card>

      <ul className="grid gap-3 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <li key={section.href}>
            <Link href={section.href} className="block h-full">
              <Card interactive className="h-full p-5">
                <p className="font-medium">{section.title}</p>
                <p className="mt-1 text-sm text-ink-secondary">{section.hint}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

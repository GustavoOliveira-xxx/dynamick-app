import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/current-user';

/**
 * Painel de curadoria.
 * A autorização acontece AQUI, no servidor (§9 e §20.5): esconder o link do menu
 * nunca foi a proteção. Um usuário comum que digitar /admin é recusado antes de
 * qualquer dado ser consultado.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  const links = [
    { href: '/admin', label: 'Visão geral' },
    { href: '/admin/questoes', label: 'Questões' },
    { href: '/admin/saude', label: 'Saúde do banco' },
    { href: '/admin/denuncias', label: 'Denúncias' },
    { href: '/admin/importar', label: 'Importar' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Curadoria de conteúdo</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Área restrita à equipe editorial. Intensidade visual baixa: aqui o que importa é
          produtividade.
        </p>
      </div>

      <nav aria-label="Navegação da curadoria" className="flex flex-wrap gap-2 border-b border-line pb-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex min-h-[40px] items-center rounded-md px-3 text-sm text-ink-secondary hover:bg-[color:var(--ck-bg-raised)] hover:text-ink-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navegação principal (§8): Início, Conteúdos, Praticar, Revisar, Perfil.
 * Lateral no desktop, inferior no celular. Estado atual nunca depende só de cor.
 */

const ITEMS = [
  { href: '/inicio', label: 'Início', icon: '◉' },
  { href: '/conteudos', label: 'Conteúdos', icon: '◫' },
  { href: '/praticar', label: 'Praticar', icon: '◈' },
  { href: '/revisar', label: 'Revisar', icon: '↻' },
  { href: '/perfil', label: 'Perfil', icon: '◑' },
] as const;

export function MainNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Desktop: lateral */}
      <nav
        aria-label="Navegação principal"
        className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col gap-1 border-r border-line py-6 pr-4 md:flex"
      >
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? 'page' : undefined}
            className="flex min-h-[46px] items-center gap-3 rounded-md px-3 text-[0.95rem] transition-colors duration-fast hover:bg-[color:var(--ck-bg-raised)]"
            style={{
              color: isActive(item.href) ? 'var(--ck-green-primary)' : 'var(--ck-text-secondary)',
              background: isActive(item.href) ? 'var(--ck-bg-raised)' : undefined,
              borderLeft: `2px solid ${isActive(item.href) ? 'var(--ck-green-primary)' : 'transparent'}`,
            }}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
            {isActive(item.href) && <span className="sr-only">(página atual)</span>}
          </Link>
        ))}

        {isAdmin && (
          <>
            <div className="ck-hairline my-3" />
            <Link
              href="/admin"
              aria-current={isActive('/admin') ? 'page' : undefined}
              className="flex min-h-[46px] items-center gap-3 rounded-md px-3 text-[0.95rem] text-ink-secondary transition-colors duration-fast hover:bg-[color:var(--ck-bg-raised)]"
            >
              <span aria-hidden="true">⚙</span>
              Curadoria
            </Link>
          </>
        )}
      </nav>

      {/* Celular: barra inferior */}
      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-sticky flex border-t border-line md:hidden"
        style={{
          background: 'var(--ck-surface-glass)',
          backdropFilter: 'blur(14px)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? 'page' : undefined}
            className="flex min-h-[58px] flex-1 flex-col items-center justify-center gap-0.5 text-[0.68rem]"
            style={{ color: isActive(item.href) ? 'var(--ck-green-primary)' : 'var(--ck-text-muted)' }}
          >
            <span aria-hidden="true" className="text-base">
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

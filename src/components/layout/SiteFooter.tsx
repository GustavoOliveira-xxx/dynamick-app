import Link from 'next/link';
import { ConsciousKnowledgeLogo } from '@/components/brand/ConsciousKnowledgeLogo';
import { BRAND } from '@/components/brand/assets';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line py-10">
      <div className="ck-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <ConsciousKnowledgeLogo variant="compact" />
          <p className="max-w-sm text-xs text-ink-muted">
            {BRAND.product} é uma plataforma de estudos da {BRAND.company}. Conteúdo autoral de
            desenvolvimento. Nenhuma pontuação aqui prevê sua nota oficial no ENEM.
          </p>
        </div>
        <nav aria-label="Links institucionais" className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <Link className="text-ink-secondary hover:text-ink-primary" href="/sobre">
            Sobre
          </Link>
          <Link className="text-ink-secondary hover:text-ink-primary" href="/privacidade">
            Privacidade e dados
          </Link>
          <Link className="text-ink-secondary hover:text-ink-primary" href="/acessibilidade">
            Acessibilidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}

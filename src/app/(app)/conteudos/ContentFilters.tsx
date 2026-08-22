'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MASTERY_LABELS, MASTERY_STATES } from '@/lib/domain';

/** Filtros simples (§5.4): apenas os relevantes, sem virar uma tela técnica. */
export function ContentFilters({
  areas,
  current,
}: {
  areas: { slug: string; name: string }[];
  current: { area: string; estado: string; busca: string };
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(current.busca);

  function apply(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/conteudos?${next.toString()}`);
  }

  const hasFilters = current.area || current.estado || current.busca;

  return (
    <form
      className="ck-card flex flex-wrap items-end gap-3 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        apply('busca', search);
      }}
      role="search"
    >
      <div className="min-w-[180px] flex-1">
        <label htmlFor="filtro-busca" className="mb-1.5 block text-xs font-medium">
          Buscar tópico
        </label>
        <input
          id="filtro-busca"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Ex.: porcentagem"
          className="min-h-[44px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
        />
      </div>

      <div>
        <label htmlFor="filtro-area" className="mb-1.5 block text-xs font-medium">
          Área
        </label>
        <select
          id="filtro-area"
          value={current.area}
          onChange={(event) => apply('area', event.target.value)}
          className="min-h-[44px] rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
        >
          <option value="">Todas</option>
          {areas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filtro-estado" className="mb-1.5 block text-xs font-medium">
          Situação
        </label>
        <select
          id="filtro-estado"
          value={current.estado}
          onChange={(event) => apply('estado', event.target.value)}
          className="min-h-[44px] rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
        >
          <option value="">Todas</option>
          {MASTERY_STATES.map((state) => (
            <option key={state} value={state}>
              {MASTERY_LABELS[state]}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" size="sm" variant="secondary">
        Buscar
      </Button>

      {hasFilters && (
        <Button type="button" size="sm" variant="ghost" onClick={() => router.push('/conteudos')}>
          Limpar
        </Button>
      )}
    </form>
  );
}

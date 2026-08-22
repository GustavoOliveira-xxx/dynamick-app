import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/States';
import { QUESTION_STATUS } from '@/lib/domain';

export const metadata: Metadata = { title: 'Questões' };

const PAGE_SIZE = 20;

export default async function AdminQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; busca?: string; pagina?: string }>;
}) {
  const filters = await searchParams;
  const page = Math.max(1, Number(filters.pagina ?? '1') || 1);
  const status = (QUESTION_STATUS as readonly string[]).includes(filters.status ?? '')
    ? filters.status
    : undefined;
  const search = (filters.busca ?? '').trim();

  const where = {
    ...(status ? { status } : {}),
    ...(search ? { stem: { contains: search } } : {}),
  };

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      orderBy: [{ status: 'asc' }, { updatedAt: 'desc' }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        topic: { select: { name: true } },
        explanation: { select: { id: true } },
        _count: { select: { options: true, attempts: true, reports: true } },
      },
    }),
    prisma.question.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-5">
      {/* Filtros — GET simples, funcionam sem JavaScript */}
      <form className="ck-card flex flex-wrap items-end gap-3 p-4" role="search">
        <div className="min-w-[200px] flex-1">
          <label htmlFor="busca" className="mb-1.5 block text-xs font-medium">
            Buscar no enunciado
          </label>
          <input
            id="busca"
            name="busca"
            type="search"
            defaultValue={search}
            className="min-h-[44px] w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
          />
        </div>
        <div>
          <label htmlFor="status" className="mb-1.5 block text-xs font-medium">
            Estado editorial
          </label>
          <select
            id="status"
            name="status"
            defaultValue={status ?? ''}
            className="min-h-[44px] rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
          >
            <option value="">Todos</option>
            {QUESTION_STATUS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="min-h-[44px] rounded-pill border border-line-strong px-4 text-sm hover:border-[color:var(--ck-green-primary)]"
        >
          Filtrar
        </button>
      </form>

      <p className="text-sm text-ink-secondary">
        {total} questão(ões) · página {page} de {pages}
      </p>

      {questions.length === 0 ? (
        <EmptyState
          title="Nenhuma questão com esses filtros"
          description="Ajuste a busca ou o estado editorial."
          actionLabel="Limpar filtros"
          actionHref="/admin/questoes"
        />
      ) : (
        <ul className="space-y-2">
          {questions.map((question) => (
            <li key={question.id}>
              <Link href={`/admin/questoes/${question.id}`}>
                <Card interactive className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      tone={
                        question.status === 'published'
                          ? 'green'
                          : question.status === 'archived'
                            ? 'neutral'
                            : 'warning'
                      }
                    >
                      {question.status}
                    </Badge>
                    <Badge tone="cyan">{question.topic.name}</Badge>
                    {!question.explanation && <Badge tone="danger">sem explicação</Badge>}
                    {!question.skillId && <Badge tone="danger">sem habilidade</Badge>}
                    {question._count.reports > 0 && (
                      <Badge tone="danger">{question._count.reports} denúncia(s)</Badge>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm">{question.stem.slice(0, 180)}…</p>
                  <p className="mt-1.5 text-xs text-ink-muted">
                    {question.slug} · v{question.version} · {question._count.options} alternativas ·{' '}
                    {question._count.attempts} tentativa(s)
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Paginação real — listas extensas nunca vêm inteiras (§9) */}
      {pages > 1 && (
        <nav aria-label="Paginação" className="flex items-center gap-2">
          {page > 1 && (
            <Link
              href={`/admin/questoes?pagina=${page - 1}${status ? `&status=${status}` : ''}${search ? `&busca=${encodeURIComponent(search)}` : ''}`}
              className="inline-flex min-h-[40px] items-center rounded-md border border-line px-3 text-sm"
            >
              ← Anterior
            </Link>
          )}
          {page < pages && (
            <Link
              href={`/admin/questoes?pagina=${page + 1}${status ? `&status=${status}` : ''}${search ? `&busca=${encodeURIComponent(search)}` : ''}`}
              className="inline-flex min-h-[40px] items-center rounded-md border border-line px-3 text-sm"
            >
              Próxima →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

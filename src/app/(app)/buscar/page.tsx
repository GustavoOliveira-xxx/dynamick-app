import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/States';
import { CONTENT_KIND_LABELS, type ContentKind } from '@/lib/domain';

export const metadata: Metadata = { title: 'Buscar' };

const LIMIT = 8;

/**
 * Busca global (§5.10).
 * Separa os resultados por tipo e indica por que cada um apareceu.
 * SQLite não tem busca textual completa aqui, então usamos `contains` — suficiente para
 * a base atual e trocável por full-text ao migrar para PostgreSQL.
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await requireUser('/buscar');
  const { q } = await searchParams;
  const term = (q ?? '').trim();

  if (term.length < 2) {
    return (
      <div className="space-y-6">
        <SearchForm term={term} />
        <EmptyState
          title="O que você quer encontrar?"
          description="Busque por um tópico, um conceito, uma questão ou algo que você salvou. Digite pelo menos 2 caracteres."
          icon="⌕"
        />
      </div>
    );
  }

  const [topics, contents, questions, notes] = await Promise.all([
    prisma.topic.findMany({
      where: {
        status: 'published',
        OR: [{ name: { contains: term } }, { summary: { contains: term } }],
      },
      take: LIMIT,
      include: { area: { select: { shortName: true } }, subject: { select: { name: true } } },
    }),
    prisma.contentItem.findMany({
      where: {
        status: 'published',
        OR: [{ title: { contains: term } }, { body: { contains: term } }],
      },
      take: LIMIT,
      include: { topic: { select: { name: true, slug: true } } },
    }),
    prisma.question.findMany({
      where: { status: 'published', stem: { contains: term } },
      take: LIMIT,
      include: { topic: { select: { name: true, slug: true } } },
    }),
    prisma.errorNote.findMany({
      where: {
        userId: user.id,
        OR: [{ note: { contains: term } }, { concept: { contains: term } }],
      },
      take: LIMIT,
      include: { topic: { select: { name: true, slug: true } } },
    }),
  ]);

  const total = topics.length + contents.length + questions.length + notes.length;

  return (
    <div className="space-y-6">
      <SearchForm term={term} />

      <p className="text-sm text-ink-secondary">
        {total === 0
          ? `Nada encontrado para "${term}".`
          : `${total} resultado(s) para "${term}".`}
      </p>

      {total === 0 && (
        <EmptyState
          title="Nenhum resultado"
          description="Tente um termo mais curto ou navegue pelo mapa de conteúdos."
          actionLabel="Ver o mapa de conteúdos"
          actionHref="/conteudos"
          icon="⌕"
        />
      )}

      {topics.length > 0 && (
        <Section title="Tópicos" count={topics.length}>
          {topics.map((topic) => (
            <ResultLink
              key={topic.id}
              href={`/conteudos/${topic.slug}`}
              title={topic.name}
              meta={`${topic.area.shortName} · ${topic.subject.name}`}
              excerpt={topic.summary}
              tag="Tópico"
            />
          ))}
        </Section>
      )}

      {contents.length > 0 && (
        <Section title="Materiais de estudo" count={contents.length}>
          {contents.map((content) => (
            <ResultLink
              key={content.id}
              href={`/conteudos/${content.topic.slug}`}
              title={content.title}
              meta={content.topic.name}
              excerpt={excerpt(content.body, term)}
              tag={CONTENT_KIND_LABELS[content.kind as ContentKind] ?? 'Material'}
            />
          ))}
        </Section>
      )}

      {questions.length > 0 && (
        <Section title="Questões" count={questions.length}>
          {questions.map((question) => (
            <ResultLink
              key={question.id}
              href={`/conteudos/${question.topic.slug}`}
              title={question.topic.name}
              meta="Praticar este tópico"
              excerpt={excerpt(question.stem, term)}
              tag="Questão"
            />
          ))}
        </Section>
      )}

      {notes.length > 0 && (
        <Section title="Meu caderno de erros" count={notes.length}>
          {notes.map((note) => (
            <ResultLink
              key={note.id}
              href="/revisar/caderno"
              title={note.concept ?? note.topic?.name ?? 'Registro'}
              meta={note.topic?.name ?? ''}
              excerpt={note.note ?? 'Sem anotação pessoal.'}
              tag="Salvo por você"
            />
          ))}
        </Section>
      )}
    </div>
  );
}

/** Recorte em torno do termo, para o resultado mostrar por que apareceu. */
function excerpt(text: string, term: string): string {
  const index = text.toLowerCase().indexOf(term.toLowerCase());
  if (index < 0) return `${text.slice(0, 140)}…`;
  const start = Math.max(0, index - 60);
  return `${start > 0 ? '…' : ''}${text.slice(start, start + 180).trim()}…`;
}

function SearchForm({ term }: { term: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Buscar</h1>
      <form className="mt-4 flex flex-wrap gap-2" role="search">
        <label htmlFor="q" className="sr-only">
          Buscar tópicos, materiais, questões e itens salvos
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={term}
          autoComplete="off"
          placeholder="Ex.: porcentagem, inferência, eutrofização"
          className="min-h-[46px] min-w-[220px] flex-1 rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3.5 text-sm"
        />
        <button
          type="submit"
          className="min-h-[46px] rounded-pill border border-line-strong px-5 text-sm hover:border-[color:var(--ck-green-primary)]"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`secao-${title}`}>
      <div className="flex items-center gap-2">
        <h2 id={`secao-${title}`} className="text-lg font-semibold">
          {title}
        </h2>
        <Badge tone="neutral">{count}</Badge>
      </div>
      <ul className="mt-3 space-y-2">{children}</ul>
    </section>
  );
}

function ResultLink({
  href,
  title,
  meta,
  excerpt: text,
  tag,
}: {
  href: string;
  title: string;
  meta: string;
  excerpt: string;
  tag: string;
}) {
  return (
    <li>
      <Link href={href} className="block">
        <Card interactive className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="font-medium">{title}</p>
            <Badge tone="cyan">{tag}</Badge>
          </div>
          {meta && <p className="mt-0.5 text-xs text-ink-muted">{meta}</p>}
          <p className="mt-2 text-sm text-ink-secondary">{text}</p>
        </Card>
      </Link>
    </li>
  );
}

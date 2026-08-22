import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { REPORT_KIND_LABELS, type ReportKind } from '@/lib/domain';
import { relativeDays } from '@/lib/util/format';
import { resolveReportAction } from '@/lib/admin/actions';

export const metadata: Metadata = { title: 'Denúncias' };

/** Fluxo de revisão de denúncias com registro da resolução (§13). */
export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status === 'resolved' || status === 'rejected' ? status : 'open';

  const reports = await prisma.report.findMany({
    where: filter === 'open' ? { status: { in: ['open', 'reviewing'] } } : { status: filter },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      question: { select: { id: true, slug: true, stem: true, status: true } },
      user: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'open', label: 'Abertas' },
          { value: 'resolved', label: 'Resolvidas' },
          { value: 'rejected', label: 'Recusadas' },
        ].map((option) => (
          <Link key={option.value} href={`/admin/denuncias?status=${option.value}`}>
            <Badge tone={filter === option.value ? 'green' : 'neutral'}>{option.label}</Badge>
          </Link>
        ))}
      </div>

      {reports.length === 0 ? (
        <EmptyState
          title="Nenhuma denúncia nesta lista"
          description="Denúncias de gabarito, ambiguidade, acessibilidade e imagem quebrada aparecem aqui."
          icon="⚑"
        />
      ) : (
        <ul className="space-y-3">
          {reports.map((report) => (
            <li key={report.id}>
              <Card className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="warning">
                    {REPORT_KIND_LABELS[report.kind as ReportKind] ?? report.kind}
                  </Badge>
                  <Badge tone="neutral">{relativeDays(report.createdAt)}</Badge>
                  {report.question && <Badge tone="cyan">{report.question.status}</Badge>}
                </div>

                <p className="mt-3 text-sm">{report.message}</p>

                {report.question && (
                  <p className="mt-2 text-xs text-ink-muted">
                    <Link
                      href={`/admin/questoes/${report.question.id}`}
                      className="underline underline-offset-4"
                    >
                      {report.question.slug}
                    </Link>{' '}
                    — {report.question.stem.slice(0, 100)}…
                  </p>
                )}

                {report.resolution && (
                  <p
                    className="mt-3 rounded-md border-l-2 p-3 text-sm"
                    style={{ borderColor: 'var(--ck-success)' }}
                  >
                    <strong>Resolução:</strong> {report.resolution}
                  </p>
                )}

                {filter === 'open' && (
                  <form action={resolveReportAction} className="mt-4 space-y-3">
                    <input type="hidden" name="reportId" value={report.id} />

                    <div>
                      <label
                        htmlFor={`resolucao-${report.id}`}
                        className="mb-1.5 block text-sm font-medium"
                      >
                        O que foi feito
                      </label>
                      <textarea
                        id={`resolucao-${report.id}`}
                        name="resolution"
                        rows={2}
                        maxLength={1000}
                        className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
                        placeholder="Ex.: gabarito conferido e mantido; explicação reescrita para deixar o critério explícito."
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button type="submit" name="status" value="resolved" size="sm">
                        Marcar como resolvida
                      </Button>
                      <Button type="submit" name="status" value="reviewing" size="sm" variant="secondary">
                        Em análise
                      </Button>
                      <Button type="submit" name="status" value="rejected" size="sm" variant="ghost">
                        Recusar
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

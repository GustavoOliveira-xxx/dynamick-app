import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { relativeDays } from '@/lib/util/format';

export const metadata: Metadata = { title: 'Curadoria' };

export default async function AdminHomePage() {
  const [questions, byStatus, openReports, recentAudit, topics, users] = await Promise.all([
    prisma.question.count(),
    prisma.question.groupBy({ by: ['status'], _count: { status: true } }),
    prisma.report.count({ where: { status: { in: ['open', 'reviewing'] } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { actor: { select: { name: true } } } }),
    prisma.topic.count({ where: { status: 'published' } }),
    prisma.user.count({ where: { deletedAt: null } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Questões', value: questions, href: '/admin/questoes' },
          { label: 'Tópicos publicados', value: topics, href: '/conteudos' },
          { label: 'Denúncias abertas', value: openReports, href: '/admin/denuncias' },
          { label: 'Contas ativas', value: users, href: '/admin' },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card interactive className="p-4">
              <p className="text-xs uppercase tracking-wide text-ink-muted">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-semibold">Questões por estado editorial</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {byStatus.map((entry) => (
            <li key={entry.status}>
              <Badge tone={entry.status === 'published' ? 'green' : entry.status === 'archived' ? 'neutral' : 'warning'}>
                {entry.status}: {entry._count.status}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-5">
        <h2 className="text-lg font-semibold">Últimas alterações</h2>
        {recentAudit.length === 0 ? (
          <p className="mt-2 text-sm text-ink-secondary">Nenhuma alteração administrativa registrada ainda.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {recentAudit.map((entry) => (
              <li key={entry.id} className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  <code className="text-xs text-ink-muted">{entry.action}</code> · {entry.entity}
                  {entry.note ? ` — ${entry.note}` : ''}
                </span>
                <span className="text-xs text-ink-muted">
                  {entry.actor?.name ?? 'sistema'} · {relativeDays(entry.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

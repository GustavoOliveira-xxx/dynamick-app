import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DynamickLogo } from '@/components/brand/DynamickLogo';
import { BRAND } from '@/components/brand/assets';
import { DynamicBackground } from '@/components/visual/DynamicBackground';
import { LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { getCurrentUser } from '@/lib/auth/current-user';

/**
 * Landing page — intensidade visual ALTA (§18.3).
 * Explica o produto em linguagem direta, sem promessa de aprovação nem pressão.
 */

const BENEFITS = [
  {
    title: 'Você sabe o que estudar agora',
    body:
      'Uma recomendação principal por vez, com o motivo escrito em português: qual tópico, por quanto tempo e por que ele foi escolhido para você hoje.',
    icon: '◎',
  },
  {
    title: 'O erro vira o próximo passo',
    body:
      'Depois de cada questão você vê a alternativa correta, o que havia de errado em cada distrator e responde o que dificultou. Isso alimenta sua próxima sessão.',
    icon: '↻',
  },
  {
    title: 'A revisão volta na hora certa',
    body:
      'O que você errou volta em intervalos crescentes — e sempre com uma questão diferente, para você não decorar o enunciado no lugar do conceito.',
    icon: '◷',
  },
];

export default async function LandingPage() {
  const user = await getCurrentUser();
  if (user) redirect('/inicio');

  return (
    <>
      <DynamicBackground intensity="high" interactive />

      <div className="relative" style={{ zIndex: 'var(--ck-z-content)' }}>
        <header className="ck-shell flex items-center justify-between py-6">
          <DynamickLogo variant="full" withSignature />
          <nav aria-label="Acesso" className="flex items-center gap-2">
            <LinkButton href="/entrar" variant="ghost" size="sm">
              Entrar
            </LinkButton>
            <LinkButton href="/criar-conta" size="sm">
              Começar
            </LinkButton>
          </nav>
        </header>

        <main id="conteudo-principal">
          {/* Hero */}
          <section className="ck-shell grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="ck-enter">
              <Badge tone="teal" icon="◈">
                Preparação para o ENEM 2027
              </Badge>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                Estudar sem saber{' '}
                <span className="text-[color:var(--ck-green-primary)]">por onde começar</span> cansa
                mais do que estudar.
              </h1>
              <p className="ck-reading mt-5 text-lg text-ink-secondary">
                {BRAND.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/criar-conta" size="lg">
                  Começar gratuitamente
                </LinkButton>
                <LinkButton href="/experimentar" variant="secondary" size="lg">
                  Ver uma sessão de 3 questões
                </LinkButton>
              </div>
              <p className="mt-4 text-xs text-ink-muted">
                Sem cartão de crédito. A sessão de demonstração não exige conta.
              </p>
            </div>

            {/* Demonstração visual da sessão de estudo */}
            <Card className="ck-enter overflow-hidden p-0" aria-label="Exemplo de sessão de estudo">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                  Exemplo de sessão
                </span>
                <Badge tone="green">20 min</Badge>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <p className="text-sm text-ink-muted">Recomendado para hoje</p>
                  <p className="mt-1 text-lg font-semibold">Interpretação e inferência</p>
                  <p className="mt-2 text-sm text-ink-secondary">
                    “Você foi bem em vocabulário, mas errou questões em que era preciso identificar a
                    intenção do autor.”
                  </p>
                </div>

                <div className="ck-hairline" />

                <ol className="space-y-2.5 text-sm">
                  {[
                    { label: 'Ler o resumo do tópico', meta: '3 min', tone: 'teal' as const },
                    { label: 'Resolver 5 questões variadas', meta: '12 min', tone: 'green' as const },
                    { label: 'Rever o que ficou em dúvida', meta: '5 min', tone: 'cyan' as const },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: 'var(--ck-green-primary)' }}
                        />
                        {item.label}
                      </span>
                      <Badge tone={item.tone}>{item.meta}</Badge>
                    </li>
                  ))}
                </ol>

                <div className="rounded-lg border border-line bg-[color:var(--ck-bg-raised)] p-3.5">
                  <p className="text-xs text-ink-muted">Depois da sessão</p>
                  <p className="mt-1 text-sm">
                    2 questões entram na sua fila de revisão para daqui a 3 dias.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Três benefícios concretos */}
          <section className="ck-shell py-10" aria-labelledby="beneficios">
            <h2 id="beneficios" className="text-2xl font-semibold">
              O que muda na prática
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {BENEFITS.map((benefit, index) => (
                <Card
                  key={benefit.title}
                  interactive
                  className="ck-enter p-5"
                  as="article"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center rounded-lg border border-line-strong text-lg"
                    style={{ color: 'var(--ck-green-primary)', animationDelay: `${index * 70}ms` }}
                  >
                    {benefit.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{benefit.body}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* O que a plataforma não faz — honestidade explícita (§14 "o que não fazer") */}
          <section className="ck-shell py-10" aria-labelledby="limites">
            <Card className="p-6">
              <h2 id="limites" className="text-xl font-semibold">
                O que a gente não promete
              </h2>
              <ul className="ck-reading mt-4 space-y-2 text-sm text-ink-secondary">
                <li>• Não prometemos aprovação nem estimamos a sua nota oficial.</li>
                <li>• Não usamos ranking público nem comparação com outros estudantes.</li>
                <li>
                  • Não escondemos por que uma atividade foi sugerida: toda recomendação vem com o
                  motivo.
                </li>
                <li>
                  • Não tratamos seu perfil como um rótulo fixo — ele é uma hipótese e muda conforme
                  você pratica.
                </li>
              </ul>
            </Card>
          </section>

          <section className="ck-shell pb-6 pt-4">
            <Card className="flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Pronto para a primeira sessão?</h2>
                <p className="mt-1 text-sm text-ink-secondary">
                  O cadastro leva menos de um minuto e o onboarding rápido, cerca de dois.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LinkButton href="/criar-conta">Criar minha conta</LinkButton>
                <Link
                  href="/entrar"
                  className="inline-flex items-center px-2 text-sm text-ink-secondary underline underline-offset-4 hover:text-ink-primary"
                >
                  Já tenho conta
                </Link>
              </div>
            </Card>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}

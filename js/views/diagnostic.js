import { el, render } from '../core/dom.js';
import { button, card, emptyState, linkButton, message } from '../ui/components.js';
import { formatMinutes, percent } from '../core/format.js';
import { AREAS } from '../data/content.js';
import { getState, update } from '../core/store.js';
import { createDiagnosticSession, summarizeSession } from '../core/sessions.js';
import { student } from '../core/student.js';
import { navigate } from '../core/router.js';

const PER_AREA = 2;

export function renderDiagnostic(root) {
  const s = student();

  const done = Object.values(getState().sessions)
    .filter((session) => session.kind === 'diagnostic' && session.status === 'completed')
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];

  if (done) {
    render(root, resultado(done));
    return;
  }

  const openSession = Object.values(getState().sessions).find(
    (session) => session.kind === 'diagnostic' && session.status !== 'completed',
  );

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg reading' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'eyebrow' }, 'Opcional'),
        el('h1', {}, 'Diagnóstico leve'),
        el(
          'p',
          { class: 'small secondary' },
          'Oito questões, duas por área, para dar um primeiro mapa de onde você está. Não é prova, não gera nota e você pode pular qualquer questão.',
        ),
      ),

      s.diagnosticStatus === 'skipped'
        ? message(
            'info',
            'Você já tinha dispensado o diagnóstico',
            el('p', {}, 'Sem problema — ele continua disponível caso mude de ideia.'),
          )
        : null,

      openSession
        ? message(
            'info',
            'Você tem um diagnóstico em andamento',
            el('p', {}, `Parou na questão ${openSession.currentIndex + 1} de ${openSession.items.length}.`),
            el(
              'div',
              { class: 'row', style: { marginTop: '0.75rem' } },
              linkButton({ href: `#/sessao/${openSession.id}`, label: 'Continuar', size: 'sm' }),
            ),
          )
        : null,

      card(
        {},
        el('h2', {}, 'O que ele faz e o que não faz'),
        el(
          'dl',
          { class: 'def-list' },
          el('dt', {}, 'Duração'), el('dd', {}, formatMinutes(20)),
          el('dt', {}, 'Questões'), el('dd', {}, `${PER_AREA * AREAS.length}, ${PER_AREA} por área`),
          el('dt', {}, 'Correção'), el('dd', {}, 'No fim, com explicação de cada alternativa'),
          el('dt', {}, 'Efeito'), el('dd', {}, 'Ajusta a ordem das recomendações iniciais'),
        ),
        el(
          'ul',
          { class: 'plain-list stack stack--sm small secondary', style: { marginTop: '1rem' } },
          el('li', {}, 'Não define seu perfil de estudo — isso vem das suas respostas, não do desempenho.'),
          el('li', {}, 'Não estima nota do ENEM nem chance de aprovação.'),
          el('li', {}, 'Não trava conteúdo: tudo continua acessível independentemente do resultado.'),
          el('li', {}, 'Errar aqui é esperado. O objetivo é encontrar por onde começar, não medir seu valor.'),
        ),
      ),

      el(
        'div',
        { class: 'row' },
        button({
          label: 'Fazer o diagnóstico',
          onClick: (event) => {
            event.currentTarget.disabled = true;
            const session = createDiagnosticSession(PER_AREA);
            if (!session) {
              event.currentTarget.disabled = false;
              return;
            }
            navigate(`/sessao/${session.id}`);
          },
        }),
        button({
          label: 'Prefiro pular',
          variant: 'secondary',
          onClick: () => {
            update((state) => {
              state.student.diagnosticStatus = 'skipped';
            }, { immediate: true });
            navigate('/inicio');
          },
        }),
      ),

      el(
        'p',
        { class: 'xsmall muted' },
        'Pular não deixa a plataforma sem informação: ela passa a aprender pelo seu desempenho nas sessões comuns.',
      ),
    ),
  );
}

function resultado(session) {
  const summary = summarizeSession(session.id);

  if (!summary) {
    return emptyState({
      title: 'Não conseguimos ler este diagnóstico',
      description: 'Os dados da sessão parecem incompletos.',
      actionLabel: 'Voltar ao início',
      actionHref: '#/inicio',
    });
  }

  const ordered = [...summary.topics].sort(
    (a, b) => percent(a.correct, a.total) - percent(b.correct, b.total),
  );
  const weakest = ordered[0];

  return el(
    'div',
    { class: 'stack stack--lg reading' },

    el(
      'header',
      { class: 'view-header' },
      el('h1', {}, 'Seu diagnóstico'),
      el(
        'p',
        { class: 'small secondary' },
        `Você respondeu ${summary.answered} de ${summary.total} questões e acertou ${summary.correct}.`,
      ),
    ),

    card(
      { accent: 'green' },
      el('h2', {}, 'Por onde começar'),
      weakest
        ? el(
            'p',
            {},
            'O ponto mais frágil neste diagnóstico foi ',
            el('strong', {}, weakest.name),
            ` (${weakest.correct} de ${weakest.total}). É por aí que sugerimos começar — não porque você "vai mal", mas porque é onde uma sessão rende mais agora.`,
          )
        : el('p', {}, 'Não houve diferença marcante entre as áreas neste diagnóstico.'),
      el(
        'div',
        { class: 'row', style: { marginTop: '1rem' } },
        linkButton({ href: '#/inicio', label: 'Ver minha recomendação' }),
        linkButton({ href: `#/sessao/${session.id}/resultado`, label: 'Rever as questões', variant: 'secondary' }),
      ),
    ),

    card(
      {},
      el('h2', {}, 'Resultado por conteúdo'),
      el(
        'ul',
        { class: 'list-plain stack stack--sm' },
        ordered.map((topic) =>
          el(
            'li',
            { class: 'row row--between' },
            el('span', { class: 'small' }, topic.name),
            el('span', { class: 'small secondary' }, `${topic.correct} de ${topic.total}`),
          ),
        ),
      ),
      el(
        'p',
        { class: 'xsmall muted', style: { marginTop: '0.75rem' } },
        'Duas questões por área não bastam para declarar domínio de nada. Este mapa é um ponto de partida provisório e muda conforme você pratica.',
      ),
    ),

    el(
      'div',
      { class: 'row' },
      button({
        label: 'Refazer o diagnóstico',
        variant: 'secondary',
        onClick: (event) => {
          event.currentTarget.disabled = true;
          const nova = createDiagnosticSession(PER_AREA);
          if (!nova) {
            event.currentTarget.disabled = false;
            return;
          }
          navigate(`/sessao/${nova.id}`);
        },
      }),
    ),
  );
}

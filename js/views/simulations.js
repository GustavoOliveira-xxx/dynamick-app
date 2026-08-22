/**
 * Simulados — lista, preparação e resultado.
 * O simulado corrige só no fim, é cronometrado por padrão e nunca converte o
 * desempenho em previsão de nota oficial.
 */

import { el, render } from '../core/dom.js';
import { badge, button, card, emptyState, linkButton, message, progress } from '../ui/components.js';
import { formatMinutes, formatSeconds, formatDate, percent, plural } from '../core/format.js';
import { DIFFICULTY_LABELS, ERROR_REASON_LABELS } from '../engine/domain.js';
import { SIMULATIONS, getArea, getSimulation } from '../data/content.js';
import { getState } from '../core/store.js';
import { createSimulationSession, getSession, summarizeSession } from '../core/sessions.js';
import { navigate } from '../core/router.js';

/* ---------------------------------------------------------------- Lista */

export function renderSimulations(root) {
  const state = getState();
  const runs = Object.values(state.simulationRuns).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const finished = runs.filter((run) => run.submittedAt);
  const openRun = runs.find((run) => !run.submittedAt);

  const diagnostic = SIMULATIONS.filter((item) => item.kind === 'diagnostic');
  const byArea = SIMULATIONS.filter((item) => item.kind !== 'diagnostic');

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('h1', {}, 'Simulados'),
        el(
          'p',
          { class: 'small secondary' },
          'Blocos com tempo definido e correção apenas no fim. Servem para treinar ritmo e decisão sob pressão — não para estimar nota de prova.',
        ),
      ),

      message(
        'info',
        'O que este resultado é e o que ele não é',
        el(
          'p',
          {},
          'O simulado mostra seu desempenho neste conjunto de questões autorais, com análise por área, tópico, habilidade e tempo. Ele não prevê sua nota no ENEM e não estima sua chance de aprovação.',
        ),
      ),

      openRun
        ? message(
            'warning',
            'Você tem um simulado em andamento',
            el('p', {}, getSession(openRun.sessionId)?.title ?? 'Simulado', ' — ainda não enviado.'),
            el(
              'div',
              { class: 'row', style: { marginTop: '0.75rem' } },
              linkButton({ href: `#/sessao/${openRun.sessionId}`, label: 'Continuar', size: 'sm' }),
            ),
          )
        : null,

      diagnostic.length > 0
        ? el(
            'section',
            { class: 'stack' },
            el('h2', {}, 'Diagnóstico geral'),
            el('div', { class: 'grid grid--2' }, diagnostic.map((item) => simulationCard(item, runs))),
          )
        : null,

      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Por área'),
        el('div', { class: 'grid grid--2' }, byArea.map((item) => simulationCard(item, runs))),
      ),

      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Seus simulados anteriores'),
        finished.length === 0
          ? emptyState({
              title: 'Você ainda não enviou nenhum simulado',
              description: 'Depois do primeiro envio, a evolução entre tentativas aparece aqui.',
              icon: '◱',
            })
          : el(
              'ul',
              { class: 'list-plain stack stack--sm' },
              finished.map((run) => {
                const simulation = getSimulation(run.simulationSlug);
                const rate = percent(run.score, run.totalItems);
                return el(
                  'li',
                  { class: 'item-row' },
                  el(
                    'div',
                    { class: 'row row--between row--wrap' },
                    el(
                      'div',
                      { class: 'flex-1' },
                      el('p', {}, simulation?.title ?? run.simulationSlug),
                      el(
                        'p',
                        { class: 'xsmall muted' },
                        formatDate(run.submittedAt),
                        ' · ',
                        String(run.score),
                        ' de ',
                        String(run.totalItems),
                        ' (',
                        String(rate),
                        '%)',
                      ),
                    ),
                    linkButton({
                      href: `#/simulados/resultado/${run.id}`,
                      label: 'Ver análise',
                      variant: 'secondary',
                      size: 'sm',
                    }),
                  ),
                );
              }),
            ),
      ),
    ),
  );
}

function simulationCard(simulation, runs) {
  const previous = runs.filter((run) => run.simulationSlug === simulation.slug && run.submittedAt);
  const last = previous[0];
  const area = simulation.areaSlug ? getArea(simulation.areaSlug) : null;

  return card(
    { as: 'article' },
    el(
      'div',
      { class: 'row row--between' },
      el('span', { class: 'eyebrow' }, area ? area.shortName : 'Todas as áreas'),
      badge(formatMinutes(simulation.minutes), 'neutral'),
    ),
    el('h3', { style: { marginTop: '0.35rem' } }, simulation.title),
    el('p', { class: 'small secondary' }, simulation.description),
    el(
      'p',
      { class: 'xsmall muted' },
      String(simulation.questionCount),
      ' questões',
      last ? ` · última tentativa: ${last.score}/${last.totalItems}` : ' · nunca feito',
    ),
    el(
      'div',
      { style: { marginTop: '0.75rem' } },
      linkButton({
        href: `#/simulados/${simulation.slug}`,
        label: last ? 'Refazer' : 'Ver detalhes',
        variant: 'secondary',
        size: 'sm',
      }),
    ),
  );
}

/* ---------------------------------------------------------------- Detalhe */

export function renderSimulationDetail(root, { params }) {
  const simulation = getSimulation(params.slug);

  if (!simulation) {
    render(
      root,
      emptyState({
        title: 'Simulado não encontrado',
        description: 'Este simulado não existe ou o endereço está incorreto.',
        actionLabel: 'Ver simulados',
        actionHref: '#/simulados',
      }),
    );
    return;
  }

  const area = simulation.areaSlug ? getArea(simulation.areaSlug) : null;
  const distribution = Object.entries(simulation.blueprint.difficulty ?? {});
  const topics = Object.entries(simulation.blueprint.topics ?? {});

  let timed = true;
  const aviso = el('div');

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg reading' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'breadcrumb' }, el('a', { href: '#/simulados' }, 'Simulados'), ' › ', simulation.title),
        el('h1', {}, simulation.title),
        el('p', { class: 'small secondary' }, simulation.description),
      ),

      card(
        {},
        el('h2', {}, 'Como este simulado é montado'),
        el(
          'dl',
          { class: 'def-list' },
          el('dt', {}, 'Questões'), el('dd', {}, String(simulation.questionCount)),
          el('dt', {}, 'Tempo'), el('dd', {}, formatMinutes(simulation.minutes)),
          el('dt', {}, 'Abrangência'), el('dd', {}, area ? area.name : 'Todas as áreas'),
          el('dt', {}, 'Correção'), el('dd', {}, 'Somente após o envio'),
        ),
        distribution.length > 0
          ? el(
              'div',
              { style: { marginTop: '1rem' } },
              el('h3', {}, 'Distribuição por dificuldade'),
              el(
                'ul',
                { class: 'list-plain stack stack--sm' },
                distribution.map(([level, count]) =>
                  el(
                    'li',
                    { class: 'row row--between' },
                    el('span', { class: 'small' }, DIFFICULTY_LABELS[level] ?? level),
                    el('span', { class: 'small secondary' }, `${count} ${plural(count, 'questão', 'questões')}`),
                  ),
                ),
              ),
            )
          : null,
        topics.length > 0
          ? el(
              'div',
              { style: { marginTop: '1rem' } },
              el('h3', {}, 'Distribuição por tópico'),
              el(
                'ul',
                { class: 'list-plain stack stack--sm' },
                topics.map(([slug, count]) =>
                  el(
                    'li',
                    { class: 'row row--between' },
                    el('a', { class: 'small', href: `#/conteudos/${slug}` }, slug.replace(/-/g, ' ')),
                    el('span', { class: 'small secondary' }, String(count)),
                  ),
                ),
              ),
            )
          : null,
      ),

      card(
        {},
        el('h2', {}, 'Antes de começar'),
        el(
          'ul',
          { class: 'plain-list stack stack--sm small secondary' },
          el('li', {}, 'Você pode marcar questões para revisar antes de enviar.'),
          el('li', {}, 'Nenhuma resposta é corrigida durante a execução.'),
          el('li', {}, 'Se o tempo acabar, o simulado é enviado automaticamente com o que estiver respondido.'),
          el('li', {}, 'Sair da tela não perde o progresso — o simulado continua aberto até o envio.'),
        ),
        el(
          'label',
          { class: 'chip', style: { marginTop: '1rem' } },
          el('input', {
            type: 'checkbox',
            checked: true,
            onChange: (event) => {
              timed = event.currentTarget.checked;
              render(
                aviso,
                timed
                  ? null
                  : el(
                      'p',
                      { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
                      'Sem cronômetro o simulado deixa de treinar ritmo de prova. O tempo continua sendo medido para a análise.',
                    ),
              );
            },
          }),
          'Usar cronômetro',
        ),
        aviso,
      ),

      el(
        'div',
        { class: 'row' },
        button({
          label: 'Começar o simulado',
          onClick: (event) => {
            event.currentTarget.disabled = true;
            const session = createSimulationSession(simulation.slug, timed);
            if (!session) {
              event.currentTarget.disabled = false;
              render(
                aviso,
                message(
                  'danger',
                  'Não foi possível montar este simulado',
                  el('p', {}, 'O material disponível não cobre a distribuição pedida. Preferimos avisar a repetir questões.'),
                ),
              );
              return;
            }
            navigate(`/sessao/${session.id}`);
          },
        }),
        linkButton({ href: '#/simulados', label: 'Voltar', variant: 'ghost' }),
      ),
    ),
  );
}

/* ---------------------------------------------------------------- Resultado */

export function renderSimulationResult(root, { params }) {
  const run = getState().simulationRuns[params.runId];

  if (!run || !run.submittedAt) {
    render(
      root,
      emptyState({
        title: 'Resultado indisponível',
        description: 'Este simulado ainda não foi enviado ou o endereço está incorreto.',
        actionLabel: 'Ver simulados',
        actionHref: '#/simulados',
      }),
    );
    return;
  }

  const simulation = getSimulation(run.simulationSlug);
  const analysis = run.analysis ?? {};
  const summary = summarizeSession(run.sessionId);
  const rate = percent(run.score, run.totalItems);

  // Comparação com a tentativa anterior do MESMO simulado, quando existe.
  const previous = Object.values(getState().simulationRuns)
    .filter(
      (item) =>
        item.simulationSlug === run.simulationSlug &&
        item.submittedAt &&
        new Date(item.submittedAt) < new Date(run.submittedAt),
    )
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))[0];

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'breadcrumb' }, el('a', { href: '#/simulados' }, 'Simulados'), ' › Resultado'),
        el('h1', {}, simulation?.title ?? 'Resultado do simulado'),
        el('p', { class: 'small secondary' }, 'Enviado em ', formatDate(run.submittedAt), '.'),
      ),

      run.fallbackNote
        ? message(
            'warning',
            'Este simulado saiu menor do que o previsto',
            el('p', {}, run.fallbackNote),
            run.shortfall
              ? el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } }, `Faltaram ${run.shortfall} ${plural(run.shortfall, 'questão', 'questões')} para completar a distribuição planejada.`)
              : null,
          )
        : null,

      card(
        { accent: 'green' },
        el('span', { class: 'eyebrow' }, 'Desempenho neste conjunto de questões'),
        el('p', { style: { fontSize: '2rem', fontWeight: '700', marginTop: '0.35rem' } }, `${run.score} / ${run.totalItems}`),
        progress({ value: rate, label: `${rate}% de acerto`, tone: 'green' }),
        previous
          ? el(
              'p',
              { class: 'small secondary', style: { marginTop: '0.75rem' } },
              'Na tentativa anterior você fez ',
              `${previous.score} de ${previous.totalItems}`,
              '. ',
              run.score > previous.score
                ? 'Houve melhora neste conjunto de questões.'
                : run.score === previous.score
                  ? 'O número de acertos ficou igual.'
                  : 'O número de acertos caiu — vale olhar o tempo por questão abaixo.',
            )
          : null,
        el(
          'p',
          { class: 'xsmall muted', style: { marginTop: '0.75rem' } },
          'Este número descreve o seu desempenho aqui. Ele não é uma nota do ENEM nem uma previsão dela.',
        ),
      ),

      summary
        ? card(
            {},
            el('h2', {}, 'Como você acertou'),
            el(
              'dl',
              { class: 'def-list' },
              el('dt', {}, 'Com confiança'), el('dd', {}, String(summary.correctWithConfidence)),
              el('dt', {}, 'Com dúvida'), el('dd', {}, String(summary.correctWithDoubt)),
              el('dt', {}, 'Depois de trocar de alternativa'), el('dd', {}, String(summary.correctAfterChange)),
              el('dt', {}, 'Marcadas para revisar'), el('dd', {}, String(summary.flagged)),
            ),
            el(
              'p',
              { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
              'Acerto com dúvida e acerto após troca de alternativa não são o mesmo que domínio: os dois voltam na fila de revisão.',
            ),
          )
        : null,

      breakdownCard('Por área', analysis.byArea),
      breakdownCard('Por tópico', analysis.byTopic),
      breakdownCard('Por habilidade', analysis.bySkill),

      analysis.time
        ? card(
            {},
            el('h2', {}, 'Tempo'),
            el(
              'dl',
              { class: 'def-list' },
              el('dt', {}, 'Tempo total respondendo'), el('dd', {}, formatSeconds(Math.round(analysis.time.totalMs / 1000))),
              el('dt', {}, 'Mediana por questão'), el('dd', {}, formatSeconds(Math.round(analysis.time.medianMs / 1000))),
              el('dt', {}, 'Questão mais demorada'), el('dd', {}, formatSeconds(Math.round(analysis.time.slowestMs / 1000))),
              el('dt', {}, 'Questões respondidas'), el('dd', {}, `${analysis.time.answered} de ${run.totalItems}`),
            ),
          )
        : null,

      analysis.errorReasons?.length
        ? card(
            {},
            el('h2', {}, 'Motivos de erro que você registrou'),
            el(
              'ul',
              { class: 'list-plain stack stack--sm' },
              analysis.errorReasons.map((entry) =>
                el(
                  'li',
                  { class: 'row row--between' },
                  el('span', { class: 'small' }, ERROR_REASON_LABELS[entry.reason] ?? entry.reason),
                  el('span', { class: 'small secondary' }, `${entry.count}×`),
                ),
              ),
            ),
          )
        : null,

      el(
        'div',
        { class: 'row' },
        linkButton({ href: '#/revisar', label: 'Ver o que entrou na revisão' }),
        linkButton({ href: '#/simulados', label: 'Voltar aos simulados', variant: 'secondary' }),
      ),
    ),
  );
}

function breakdownCard(title, data) {
  const entries = Object.entries(data ?? {});
  if (entries.length === 0) return null;

  entries.sort((a, b) => percent(a[1].correct, a[1].total) - percent(b[1].correct, b[1].total));

  return card(
    {},
    el('h2', {}, title),
    el(
      'ul',
      { class: 'list-plain stack stack--sm' },
      entries.map(([name, value]) => {
        const rate = percent(value.correct, value.total);
        return el(
          'li',
          {},
          el(
            'div',
            { class: 'row row--between' },
            el('span', { class: 'small' }, name),
            el('span', { class: 'xsmall secondary' }, `${value.correct}/${value.total}`),
          ),
          progress({ value: rate, size: 'sm', tone: rate >= 70 ? 'green' : rate >= 40 ? 'teal' : 'warning' }),
        );
      }),
    ),
  );
}

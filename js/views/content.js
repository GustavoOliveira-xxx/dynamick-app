import { el, render } from '../core/dom.js';
import { badge, card, emptyState, message, progress, seedNotice, button } from '../ui/components.js';
import { markdown } from '../core/markdown.js';
import { formatMinutes, relativeDays } from '../core/format.js';
import {
  CONTENT_KIND_LABELS,
  DIFFICULTY_LABELS,
  MASTERY_LABELS,
  MASTERY_MEANING,
  MASTERY_STATES,
} from '../engine/domain.js';
import { contentTree, getArea, getSubject, getTopic, questionsForTopic } from '../data/content.js';
import { markTopicViewed, masteryFor } from '../core/student.js';
import { navigate } from '../core/router.js';
import { startSession } from './dashboard.js';

const STATE_TONE = {
  not_started: 'neutral',
  explored: 'cyan',
  practicing: 'teal',
  needs_review: 'warning',
  consolidated: 'green',
};

const ACCENT_VAR = {
  green: 'var(--ck-green)',
  teal: 'var(--ck-teal)',
  cyan: 'var(--ck-cyan)',
  lime: 'var(--ck-lime)',
};

export function renderContentMap(root, { query }) {
  const filters = {
    area: query.get('area') ?? '',
    estado: query.get('estado') ?? '',
    busca: (query.get('busca') ?? '').trim().toLowerCase(),
  };

  const tree = contentTree()
    .filter((area) => !filters.area || area.slug === filters.area)
    .map((area) => ({
      ...area,
      subjects: area.subjects
        .map((subject) => ({
          ...subject,
          topics: subject.topics.filter((topic) => {
            const state = masteryFor(topic.slug).state;
            if (filters.estado && state !== filters.estado) return false;
            if (
              filters.busca &&
              !topic.name.toLowerCase().includes(filters.busca) &&
              !topic.summary.toLowerCase().includes(filters.busca)
            ) {
              return false;
            }
            return true;
          }),
        }))
        .filter((subject) => subject.topics.length > 0),
    }))
    .filter((area) => area.subjects.length > 0);

  const allTopics = contentTree().flatMap((area) => area.subjects.flatMap((s) => s.topics));
  const consolidated = allTopics.filter((topic) => masteryFor(topic.slug).state === 'consolidated').length;

  function applyFilter(key, value) {
    const next = new URLSearchParams(query.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const queryString = next.toString();
    navigate(`/conteudos${queryString ? `?${queryString}` : ''}`);
  }

  const searchInput = el('input', {
    id: 'filtro-busca',
    type: 'search',
    class: 'input',
    value: query.get('busca') ?? '',
    placeholder: 'Ex.: porcentagem',
  });

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('h1', {}, 'Mapa de conteúdos'),
        el('p', { class: 'small secondary' },
          `${allTopics.length} tópicos disponíveis · ${consolidated} consolidado(s) até agora.`),
      ),

      seedNotice(),

      el(
        'form',
        {
          class: 'card card--pad filters',
          role: 'search',
          onSubmit: (event) => {
            event.preventDefault();
            applyFilter('busca', searchInput.value.trim());
          },
        },
        el('div', { class: 'field flex-1' },
          el('label', { class: 'field__label', for: 'filtro-busca' }, 'Buscar tópico'),
          searchInput),
        el('div', { class: 'field' },
          el('label', { class: 'field__label', for: 'filtro-area' }, 'Área'),
          el(
            'select',
            {
              id: 'filtro-area',
              class: 'select',
              onChange: (event) => applyFilter('area', event.target.value),
            },
            el('option', { value: '', selected: !filters.area || undefined }, 'Todas'),
            contentTree().map((area) =>
              el('option', { value: area.slug, selected: filters.area === area.slug || undefined }, area.shortName),
            ),
          )),
        el('div', { class: 'field' },
          el('label', { class: 'field__label', for: 'filtro-estado' }, 'Situação'),
          el(
            'select',
            {
              id: 'filtro-estado',
              class: 'select',
              onChange: (event) => applyFilter('estado', event.target.value),
            },
            el('option', { value: '', selected: !filters.estado || undefined }, 'Todas'),
            MASTERY_STATES.map((state) =>
              el('option', { value: state, selected: filters.estado === state || undefined }, MASTERY_LABELS[state]),
            ),
          )),
        button({ label: 'Buscar', type: 'submit', variant: 'secondary', size: 'sm' }),
        filters.area || filters.estado || filters.busca
          ? button({ label: 'Limpar', variant: 'ghost', size: 'sm', onClick: () => navigate('/conteudos') })
          : null,
      ),

      tree.length === 0
        ? emptyState({
            title: 'Nenhum tópico com esses filtros',
            description: 'Tente remover um filtro ou buscar por outro termo.',
            actionLabel: 'Limpar filtros',
            actionHref: '#/conteudos',
          })
        : el(
            'div',
            { class: 'stack stack--lg' },
            tree.map((area) =>
              el(
                'section',
                { 'aria-labelledby': `area-${area.slug}` },
                el(
                  'div',
                  { class: 'area-head' },
                  el('span', {
                    class: 'area-dot',
                    'aria-hidden': 'true',
                    style: { background: ACCENT_VAR[area.accent] ?? 'var(--ck-green)' },
                  }),
                  el('h2', { id: `area-${area.slug}` }, area.shortName),
                ),
                el('p', { class: 'small muted', style: { marginTop: '0.25rem' } }, area.summary),

                el(
                  'div',
                  { class: 'stack', style: { marginTop: '1rem' } },
                  area.subjects.map((subject) =>
                    el(
                      'div',
                      {},
                      el('h3', { class: 'eyebrow' }, subject.name),
                      el(
                        'ul',
                        { class: 'topic-grid list-reset' },
                        subject.topics.map((topic) => topicCard(topic)),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
    ),
  );
}

function topicCard(topic) {
  const mastery = masteryFor(topic.slug);
  const state = mastery.state;
  const questionCount = questionsForTopic(topic.slug, { excludeRecovery: true }).length;

  return el(
    'li',
    {},
    el(
      'a',
      { class: 'card-link', href: `#/conteudos/${topic.slug}` },
      card(
        { interactive: true },
        el(
          'div',
          { class: 'row row--between', style: { alignItems: 'flex-start' } },
          el('p', { style: { fontWeight: '500' } }, topic.name),
          badge(MASTERY_LABELS[state], STATE_TONE[state]),
        ),
        el('p', { class: 'small secondary', style: { marginTop: '0.4rem' } }, topic.summary),
        el(
          'div',
          { style: { marginTop: '0.75rem' } },
          progress({
            value: mastery.score,
            label: `Domínio estimado em ${topic.name}: ${mastery.score} de 100`,
            size: 'sm',
            tone: state === 'needs_review' ? 'warning' : 'green',
          }),
        ),
        el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
          `${questionCount} questões · última prática ${relativeDays(mastery.lastPracticedAt)}`),
        el('p', { class: 'xsmall muted', style: { marginTop: '0.25rem' } }, MASTERY_MEANING[state]),
      ),
    ),
  );
}

export function renderTopic(root, { params, query }) {
  const topic = getTopic(params.slug);
  if (!topic) {
    render(root, emptyState({
      title: 'Tópico não encontrado',
      description: 'O endereço pode estar desatualizado.',
      actionLabel: 'Ver o mapa de conteúdos',
      actionHref: '#/conteudos',
    }));
    return;
  }

  markTopicViewed(topic.slug);

  const area = getArea(topic.areaSlug);
  const subject = getSubject(topic.subjectSlug);
  const mastery = masteryFor(topic.slug);
  const questionCount = questionsForTopic(topic.slug, { excludeRecovery: true }).length;
  const byKind = (kind) => topic.content.filter((item) => item.kind === kind);

  const quick = byKind('quick_summary')[0];
  const explanation = byKind('explanation')[0];
  const examples = byKind('worked_example');
  const mistakes = byKind('common_mistakes')[0];
  const selfExplanation = byKind('self_explanation')[0];

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el('nav', { class: 'breadcrumb', 'aria-label': 'Trilha de navegação' },
        el('a', { href: '#/conteudos' }, 'Conteúdos'), ` · ${area?.shortName ?? ''} · ${subject?.name ?? ''}`),

      el(
        'header',
        {},
        el('div', { class: 'row' },
          badge(subject?.name ?? '', 'cyan'),
          badge(DIFFICULTY_LABELS[topic.difficulty]),
          badge(formatMinutes(topic.estimatedMinutes), 'teal')),
        el('h1', { style: { marginTop: '0.75rem' } }, topic.name),
        el('p', { class: 'secondary', style: { marginTop: '0.5rem' } }, topic.summary),
      ),

      query.get('erro') === 'sem-questoes'
        ? message('warning', 'Não foi possível montar a sessão',
            el('p', {}, 'Este tópico ainda não tem questões publicadas suficientes.'))
        : null,

      card(
        { pad: 'md' },
        el(
          'div',
          { class: 'row row--between' },
          el(
            'div',
            { class: 'flex-1', style: { minWidth: '14rem' } },
            el('div', { class: 'row' },
              badge(MASTERY_LABELS[mastery.state], STATE_TONE[mastery.state]),
              el('span', { class: 'xsmall muted' }, MASTERY_MEANING[mastery.state])),
            el('div', { style: { marginTop: '0.75rem' } },
              progress({
                value: mastery.score,
                label: `Domínio estimado: ${mastery.score} de 100`,
                tone: mastery.state === 'needs_review' ? 'warning' : 'green',
              })),
            el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
              `${questionCount} questões disponíveis · última prática ${relativeDays(mastery.lastPracticedAt)}`),
          ),
          questionCount > 0
            ? button({
                label: 'Começar a praticar',
                onClick: (event) => startSession(event.currentTarget, topic.slug, 'practice'),
              })
            : null,
        ),
      ),

      (topic.prerequisites ?? []).length > 0
        ? card(
            { pad: 'md' },
            el('h2', { class: 'eyebrow' }, 'Ajuda ter visto antes'),
            el(
              'ul',
              { class: 'row list-reset', style: { marginTop: '0.5rem' } },
              topic.prerequisites.map((slug) => {
                const prerequisite = getTopic(slug);
                return prerequisite
                  ? el('li', {}, el('a', { class: 'chip', href: `#/conteudos/${slug}` }, prerequisite.name))
                  : null;
              }),
            ),
            el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
              'Isso é uma sugestão, não um bloqueio: você pode estudar este tópico agora.'),
          )
        : null,

      quick
        ? card(
            { pad: 'lg' },
            el('div', { class: 'row row--between' },
              el('h2', {}, quick.title),
              badge(CONTENT_KIND_LABELS.quick_summary, 'teal')),
            el('div', { class: 'reading', style: { marginTop: '0.75rem' } }, markdown(quick.body)),
          )
        : null,

      explanation
        ? card(
            { pad: 'lg' },
            el(
              'details',
              { open: true },
              el('summary', {},
                el('span', { class: 'row row--between' },
                  el('span', { style: { fontSize: '1.15rem', fontWeight: '600' } }, explanation.title),
                  badge(CONTENT_KIND_LABELS.explanation, 'cyan'))),
              el('div', { class: 'reading', style: { marginTop: '1rem' } }, markdown(explanation.body)),
            ),
          )
        : null,

      examples.length > 0
        ? el(
            'section',
            { class: 'stack stack--sm', 'aria-labelledby': 'exemplos' },
            el('h2', { id: 'exemplos' }, 'Exemplos resolvidos'),
            examples.map((example) =>
              card(
                { pad: 'lg' },
                el(
                  'details',
                  {},
                  el('summary', { style: { fontWeight: '500' } }, example.title),
                  el('div', { class: 'reading', style: { marginTop: '0.75rem' } }, markdown(example.body)),
                ),
              ),
            ),
          )
        : null,

      mistakes
        ? card(
            { pad: 'lg' },
            el('h2', {}, mistakes.title),
            el('div', { class: 'reading', style: { marginTop: '0.75rem' } }, markdown(mistakes.body)),
          )
        : null,

      selfExplanation
        ? card(
            { pad: 'lg' },
            el('div', { class: 'row row--between' },
              el('h2', {}, selfExplanation.title),
              badge('Estudo ativo', 'lime')),
            el('p', { class: 'small muted', style: { marginTop: '0.25rem' } },
              'Tente responder antes de voltar à explicação. Errar aqui não custa nada.'),
            el('div', { class: 'reading', style: { marginTop: '0.75rem' } }, markdown(selfExplanation.body)),
          )
        : null,

      el(
        'div',
        { class: 'grid-2' },
        topic.skills.length > 0
          ? card(
              { pad: 'md' },
              el('h2', { class: 'eyebrow' }, 'Habilidade praticada'),
              el(
                'ul',
                { class: 'stack stack--sm list-reset', style: { marginTop: '0.5rem' } },
                topic.skills.map((skill) =>
                  el('li', {},
                    el('p', { style: { fontWeight: '500', fontSize: '0.9rem' } }, skill.name),
                    el('p', { class: 'small secondary' }, skill.description)),
                ),
              ),
            )
          : null,
        (topic.related ?? []).length > 0
          ? card(
              { pad: 'md' },
              el('h2', { class: 'eyebrow' }, 'Se conecta com'),
              el(
                'ul',
                { class: 'row list-reset', style: { marginTop: '0.5rem' } },
                topic.related.map((slug) => {
                  const related = getTopic(slug);
                  return related
                    ? el('li', {}, el('a', { class: 'chip', href: `#/conteudos/${slug}` }, related.name))
                    : null;
                }),
              ),
            )
          : null,
      ),

      questionCount > 0
        ? card(
            { pad: 'lg' },
            el(
              'div',
              { class: 'row row--between' },
              el(
                'div',
                {},
                el('h2', {}, 'Pronto para praticar?'),
                el('p', { class: 'small secondary', style: { marginTop: '0.25rem' } },
                  'As questões variam de contexto — não são a mesma pergunta com números trocados.'),
              ),
              button({
                label: 'Começar a praticar',
                onClick: (event) => startSession(event.currentTarget, topic.slug, 'practice'),
              }),
            ),
          )
        : null,

      seedNotice(true),
    ),
  );
}

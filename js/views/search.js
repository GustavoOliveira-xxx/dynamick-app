/**
 * Busca — encontra tópicos, conteúdos, métodos, simulados e temas de redação.
 * A busca é local e imediata: não há servidor para consultar.
 * Resultado vazio nunca é um beco sem saída — sempre oferece um caminho.
 */

import { el, render, debounce } from '../core/dom.js';
import { badge, card, emptyState } from '../ui/components.js';
import { plural } from '../core/format.js';
import { CONTENT_KIND_LABELS, MASTERY_LABELS } from '../engine/domain.js';
import {
  ESSAY_PROMPTS,
  SIMULATIONS,
  STUDY_METHODS,
  TOPICS,
  getArea,
} from '../data/content.js';
import { masteryFor } from '../core/student.js';
import { navigate } from '../core/router.js';

/** Remove acento para que "funcoes" encontre "funções". */
function normalize(text) {
  return (text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/** Índice montado uma vez por carregamento — o catálogo é estático. */
let index = null;

function buildIndex() {
  if (index) return index;
  const entries = [];

  for (const topic of TOPICS) {
    const area = getArea(topic.areaSlug);
    entries.push({
      kind: 'topic',
      kindLabel: 'Tópico',
      title: topic.name,
      description: topic.summary,
      context: area?.shortName ?? '',
      href: `#/conteudos/${topic.slug}`,
      slug: topic.slug,
      haystack: normalize(
        [topic.name, topic.summary, area?.name, ...topic.skills.map((skill) => skill.name)].join(' '),
      ),
    });

    for (const item of topic.content) {
      entries.push({
        kind: 'content',
        kindLabel: CONTENT_KIND_LABELS[item.kind] ?? 'Conteúdo',
        title: item.title,
        description: `${topic.name} · ${area?.shortName ?? ''}`,
        context: topic.name,
        href: `#/conteudos/${topic.slug}`,
        slug: topic.slug,
        haystack: normalize([item.title, item.body, topic.name].join(' ')),
      });
    }
  }

  for (const method of STUDY_METHODS) {
    entries.push({
      kind: 'method',
      kindLabel: 'Forma de estudar',
      title: method.title,
      description: method.summary,
      context: '',
      href: '#/metodos',
      slug: method.slug,
      haystack: normalize([method.title, method.summary, method.howItWorks, method.whenToUse].join(' ')),
    });
  }

  for (const simulation of SIMULATIONS) {
    entries.push({
      kind: 'simulation',
      kindLabel: 'Simulado',
      title: simulation.title,
      description: simulation.description,
      context: '',
      href: `#/simulados/${simulation.slug}`,
      slug: simulation.slug,
      haystack: normalize([simulation.title, simulation.description].join(' ')),
    });
  }

  for (const prompt of ESSAY_PROMPTS) {
    entries.push({
      kind: 'essay',
      kindLabel: 'Tema de redação',
      title: prompt.title,
      description: prompt.focus,
      context: prompt.theme,
      href: `#/redacao/${prompt.slug}`,
      slug: prompt.slug,
      haystack: normalize([prompt.title, prompt.theme, prompt.focus].join(' ')),
    });
  }

  index = entries;
  return index;
}

function search(term) {
  const needle = normalize(term).trim();
  if (needle.length < 2) return [];

  const words = needle.split(/\s+/).filter(Boolean);

  return buildIndex()
    .map((entry) => {
      let score = 0;
      for (const word of words) {
        if (!entry.haystack.includes(word)) return null;
        if (normalize(entry.title).includes(word)) score += 3;
        else score += 1;
      }
      // Tópico vale mais que trecho de conteúdo: é o destino navegável.
      if (entry.kind === 'topic') score += 2;
      return { ...entry, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 40);
}

const KIND_TONE = {
  topic: 'green',
  content: 'teal',
  method: 'cyan',
  simulation: 'lime',
  essay: 'neutral',
};

export function renderSearch(root, { query }) {
  const initial = query.get('q') ?? '';

  const results = el('div', { class: 'stack', id: 'resultados-busca' });
  const status = el('p', { class: 'small muted', role: 'status', 'aria-live': 'polite' });

  const input = el('input', {
    class: 'input',
    type: 'search',
    id: 'campo-busca',
    value: initial,
    placeholder: 'porcentagem, ecologia, revisão espaçada…',
    autocomplete: 'off',
    'aria-describedby': 'dica-busca',
  });

  const run = (term) => {
    const found = search(term);

    if (term.trim().length < 2) {
      render(status, 'Digite ao menos duas letras.');
      render(results, sugestoes());
      return;
    }

    render(
      status,
      found.length === 0
        ? `Nada encontrado para "${term}".`
        : `${found.length} ${plural(found.length, 'resultado', 'resultados')} para "${term}".`,
    );

    if (found.length === 0) {
      render(
        results,
        emptyState({
          title: 'Não encontramos esse termo no material',
          description:
            'Pode ser um assunto que ainda não escrevemos, ou uma grafia diferente. O material atual é uma base autoral de desenvolvimento — não cobre o ENEM inteiro.',
          actionLabel: 'Ver tudo o que existe hoje',
          actionHref: '#/conteudos',
          icon: '⌕',
        }),
        sugestoes(),
      );
      return;
    }

    render(
      results,
      el(
        'ul',
        { class: 'list-plain stack stack--sm' },
        found.map((entry) => {
          const mastery = entry.kind === 'topic' || entry.kind === 'content' ? masteryFor(entry.slug) : null;
          return el(
            'li',
            {},
            el(
              'a',
              { class: 'card card--pad card-link', href: entry.href },
              el(
                'div',
                { class: 'row row--between row--wrap' },
                el('strong', {}, entry.title),
                el(
                  'div',
                  { class: 'row' },
                  badge(entry.kindLabel, KIND_TONE[entry.kind] ?? 'neutral'),
                  mastery && mastery.state !== 'not_started'
                    ? badge(MASTERY_LABELS[mastery.state], 'neutral')
                    : null,
                ),
              ),
              el('p', { class: 'small secondary' }, entry.description),
              entry.context ? el('p', { class: 'xsmall muted' }, entry.context) : null,
            ),
          );
        }),
      ),
    );
  };

  const onType = debounce((term) => {
    run(term);
    // Mantém o endereço compartilhável sem empilhar histórico a cada tecla.
    const target = term.trim() ? `/buscar?q=${encodeURIComponent(term.trim())}` : '/buscar';
    navigate(target, { replace: true });
  }, 250);

  input.addEventListener('input', (event) => onType(event.currentTarget.value));

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('h1', {}, 'Buscar'),
        el(
          'p',
          { class: 'small secondary', id: 'dica-busca' },
          'Procura em tópicos, explicações, formas de estudar, simulados e temas de redação. A busca acontece no seu navegador.',
        ),
      ),

      el(
        'div',
        { class: 'field' },
        el('label', { class: 'field__label', for: 'campo-busca' }, 'O que você quer encontrar?'),
        input,
      ),

      status,
      results,
    ),
  );

  run(initial);
  input.focus();
}

/** Sugestões quando não há busca ativa: evita a tela vazia sem saída. */
function sugestoes() {
  const destaques = TOPICS.slice(0, 6);
  return card(
    {},
    el('h2', {}, 'Alguns pontos de partida'),
    el(
      'ul',
      { class: 'list-plain row', style: { marginTop: '0.5rem' } },
      destaques.map((topic) =>
        el('li', {}, el('a', { class: 'chip', href: `#/conteudos/${topic.slug}` }, topic.name)),
      ),
    ),
    el(
      'p',
      { class: 'xsmall muted', style: { marginTop: '0.75rem' } },
      'Ou abra o ',
      el('a', { href: '#/conteudos' }, 'mapa de conteúdos'),
      ' para ver tudo por área.',
    ),
  );
}

import { el, render } from '../core/dom.js';
import { badge, card, message } from '../ui/components.js';
import { ENEM_ARCHIVE, ENEM_ARCHIVE_SOURCE } from '../data/enem-archive.js';

export function renderEnemArchive(root) {
  const results = el('div', { class: 'enem-archive__grid' });
  const count = el('span', { class: 'small secondary' });
  const input = el('input', {
    class: 'input',
    type: 'search',
    inputmode: 'numeric',
    autocomplete: 'off',
    placeholder: 'Digite um ano, como 2015',
    'aria-label': 'Filtrar provas por ano',
  });

  function paint() {
    const query = input.value.trim();
    const editions = ENEM_ARCHIVE.filter((edition) => !query || String(edition.year).includes(query));
    count.textContent = `${editions.length} ${editions.length === 1 ? 'edição encontrada' : 'edições encontradas'}`;
    render(
      results,
      editions.map((edition) =>
        card(
          { as: 'article', interactive: true, class: 'enem-edition' },
          el(
            'div',
            { class: 'enem-edition__top' },
            el('span', { class: 'enem-edition__year' }, String(edition.year)),
            badge('Fonte oficial', 'green'),
          ),
          el('h2', { class: 'enem-edition__title' }, `ENEM ${edition.year}`),
          el(
            'ul',
            { class: 'list-plain stack stack--sm small secondary' },
            edition.contents.map((item) => el('li', {}, '✓ ', item)),
          ),
          el(
            'a',
            {
              class: 'btn btn--secondary btn--sm enem-edition__link',
              href: edition.url,
              target: '_blank',
              rel: 'noopener noreferrer',
              'aria-label': `Abrir provas e gabaritos oficiais do ENEM ${edition.year} no INEP`,
            },
            'Abrir no INEP ↗',
          ),
        ),
      ),
    );
  }

  input.addEventListener('input', paint);

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },
      el(
        'header',
        { class: 'view-header enem-archive__hero' },
        el('div', {}, el('p', { class: 'eyebrow' }, 'Arquivo oficial'), el('h1', {}, 'ENEMs anteriores')),
        el(
          'p',
          { class: 'secondary reading' },
          'Cadernos e gabaritos de todas as edições entre 2010 e 2025, organizados por ano e abertos diretamente na fonte oficial.',
        ),
      ),
      message(
        'info',
        'Prova oficial e questão autoral são coisas diferentes',
        el(
          'p',
          {},
          'Este arquivo leva aos documentos publicados pelo INEP. As questões de prática do DynamiCK continuam identificadas como autorais — nível ENEM, sem atribuir a elas um ano que não possuem.',
        ),
        el(
          'p',
          { style: { marginTop: '0.5rem' } },
          el(
            'a',
            { href: ENEM_ARCHIVE_SOURCE, target: '_blank', rel: 'noopener noreferrer' },
            'Consultar o arquivo completo no INEP ↗',
          ),
        ),
      ),
      el(
        'section',
        { class: 'stack stack--sm', 'aria-labelledby': 'filtrar-enem' },
        el('label', { id: 'filtrar-enem', class: 'field__label', for: 'busca-enem' }, 'Encontrar uma edição'),
        Object.assign(input, { id: 'busca-enem' }),
        count,
      ),
      results,
    ),
  );

  paint();
  window.requestAnimationFrame(() => input.focus({ preventScroll: true }));
}

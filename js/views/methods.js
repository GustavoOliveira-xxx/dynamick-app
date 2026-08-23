





import { el, render } from '../core/dom.js';
import { badge, button, card, emptyState, linkButton, message } from '../ui/components.js';
import { formatMinutes } from '../core/format.js';
import { STUDY_METHODS, getTopic } from '../data/content.js';
import { activeProfile, masteryFor, student } from '../core/student.js';
import { startSession } from './dashboard.js';

export function renderMethods(root, { query }) {
  const profile = activeProfile();
  const s = student();
  const focus = query.get('foco') ?? '';

  const suggested = new Set(profile.personalization.suggestedMethods ?? []);
  const methods = [...STUDY_METHODS].sort((a, b) => {
    const bySuggestion = Number(suggested.has(b.slug)) - Number(suggested.has(a.slug));
    return bySuggestion !== 0 ? bySuggestion : a.order - b.order;
  });

  const filtered = focus
    ? methods.filter((method) => (method.suitableTopics ?? []).includes(focus))
    : methods;

  const focusTopic = focus ? getTopic(focus) : null;

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('h1', {}, 'Formas de estudar'),
        el(
          'p',
          { class: 'small secondary' },
          'Oito métodos com passo a passo, exemplo aplicado e limitação declarada. Escolher um método diferente do sugerido não piora suas recomendações.',
        ),
      ),

      focusTopic
        ? message(
            'info',
            `Filtrando por ${focusTopic.name}`,
            el('p', {}, 'Mostrando apenas os métodos que combinam com este conteúdo.'),
            el('p', { style: { marginTop: '0.5rem' } }, el('a', { href: '#/metodos' }, 'Ver todos os métodos')),
          )
        : null,

      suggested.size > 0 && !focus
        ? message(
            'info',
            'Por que alguns métodos aparecem primeiro',
            el(
              'p',
              {},
              'Seu perfil atual é ',
              el('strong', {}, profile.name),
              '. Para esse perfil, priorizamos métodos que ',
              profile.personalization.methodRationale ??
                'combinam com a forma como você descreveu sua rotina e sua autonomia',
              '. A ordem é uma sugestão, não uma restrição.',
            ),
          )
        : null,

      filtered.length === 0
        ? emptyState({
            title: 'Nenhum método listado para este conteúdo',
            description: 'Isso é uma lacuna do nosso material, não uma limitação sua.',
            actionLabel: 'Ver todos os métodos',
            actionHref: '#/metodos',
          })
        : el(
            'div',
            { class: 'stack' },
            filtered.map((method) => methodCard(method, suggested.has(method.slug), s)),
          ),
    ),
  );
}

function methodCard(method, isSuggested, s) {
  const topics = (method.suitableTopics ?? []).map((slug) => getTopic(slug)).filter(Boolean);
  const fitsTime = method.minutes <= s.sessionMinutes;

  return card(
    { as: 'article', accent: isSuggested ? 'green' : null },
    el(
      'div',
      { class: 'row row--between row--wrap' },
      el('h2', {}, method.title),
      el(
        'div',
        { class: 'row' },
        isSuggested ? badge('Sugerido para o seu perfil', 'green') : null,
        badge(formatMinutes(method.minutes), fitsTime ? 'neutral' : 'warning'),
      ),
    ),
    el('p', { class: 'small secondary' }, method.summary),

    !fitsTime
      ? el(
          'p',
          { class: 'xsmall warning-text' },
          'Este método pede mais tempo do que a sessão que você declarou (',
          formatMinutes(s.sessionMinutes),
          '). Dá para usar em uma versão reduzida, mas o efeito diminui.',
        )
      : null,

    el(
      'div',
      { class: 'stack stack--sm', style: { marginTop: '1rem' } },
      el('h3', {}, 'Como funciona'),
      el('p', { class: 'small' }, method.howItWorks),

      el('h3', {}, 'Passo a passo'),
      el(
        'ol',
        { class: 'stack stack--sm small secondary' },
        method.steps.map((step) => el('li', {}, step)),
      ),

      el('h3', {}, 'Exemplo aplicado'),
      el('p', { class: 'small secondary' }, method.example),

      el('h3', {}, 'Quando usar'),
      el('p', { class: 'small secondary' }, method.whenToUse),

      el('h3', {}, 'Limitação'),
      el('p', { class: 'small warning-text' }, method.limitations),
    ),

    topics.length > 0
      ? el(
          'div',
          { style: { marginTop: '1rem' } },
          el('p', { class: 'xsmall muted' }, 'Combina com:'),
          el(
            'ul',
            { class: 'list-plain row', style: { marginTop: '0.35rem' } },
            topics.map((topic) => {
              const state = masteryFor(topic.slug).state;
              return el(
                'li',
                {},
                el(
                  'a',
                  { class: 'chip', href: `#/conteudos/${topic.slug}` },
                  topic.name,
                  state === 'needs_review' ? ' · precisa de revisão' : '',
                ),
              );
            }),
          ),
          el(
            'div',
            { class: 'row', style: { marginTop: '0.75rem' } },
            button({
              label: `Praticar ${topics[0].name} usando este método`,
              variant: 'secondary',
              size: 'sm',
              onClick: (event) => startSession(event.currentTarget, topics[0].slug, 'practice'),
            }),
            linkButton({
              href: `#/conteudos/${topics[0].slug}`,
              label: 'Ver o conteúdo',
              variant: 'ghost',
              size: 'sm',
            }),
          ),
        )
      : null,
  );
}

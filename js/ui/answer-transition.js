import { el } from '../core/dom.js';

function prefersReducedMotion() {
  const root = document.documentElement;
  return (
    root.dataset.motion === 'reduced' ||
    (root.dataset.motion !== 'full' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );
}

export async function playAnswerTransition(card, {
  hasNext = true,
  answered = true,
  current = null,
  next = null,
  onSwap = null,
} = {}) {
  if (!card) {
    await onSwap?.();
    return;
  }
  const reduced = prefersReducedMotion();
  const label = hasNext
    ? answered
      ? 'Resposta registrada · abrindo a próxima missão'
      : 'Questão deixada em aberto · seguindo a trilha'
    : 'Resposta registrada · missão concluída';
  const picture = el(
    'picture',
    { class: 'answer-flight__picture' },
    el('source', { srcset: 'assets/brand/logo-dynamic.webp', type: 'image/webp' }),
    el('img', {
      src: 'assets/brand/logo-dynamic.png',
      alt: '',
      width: 124,
      height: 113,
      decoding: 'async',
    }),
  );
  const overlay = el(
    'div',
    {
      class: `answer-flight${reduced ? ' answer-flight--reduced' : ''}`,
      role: 'status',
      'aria-live': 'polite',
      'aria-label': label,
    },
    el('span', { class: 'answer-flight__curtain answer-flight__curtain--left', 'aria-hidden': 'true' }),
    el('span', { class: 'answer-flight__curtain answer-flight__curtain--right', 'aria-hidden': 'true' }),
    el('span', { class: 'answer-flight__beam', 'aria-hidden': 'true' }),
    el(
      'div',
      { class: 'answer-flight__portal' },
      el('span', { class: 'answer-flight__ring answer-flight__ring--a' }),
      el('span', { class: 'answer-flight__ring answer-flight__ring--b' }),
      el('span', { class: 'answer-flight__ring answer-flight__ring--c' }),
      picture,
      el(
        'div',
        { class: 'answer-flight__particles' },
        Array.from({ length: 20 }, (_, index) => el('span', { style: { '--particle': String(index) } })),
      ),
    ),
    el(
      'div',
      { class: 'answer-flight__copy' },
      el('p', { class: 'answer-flight__eyebrow' }, answered ? 'Conhecimento em movimento' : 'Sua sessão continua'),
      el('p', { class: 'answer-flight__label' }, label),
      current && next
        ? el(
            'div',
            { class: 'answer-flight__step', 'aria-hidden': 'true' },
            el('span', {}, String(current).padStart(2, '0')),
            el('i', {}),
            el('strong', {}, String(next).padStart(2, '0')),
          )
        : null,
    ),
  );

  card.classList.add('question-card--transitioning');
  document.documentElement.classList.add('question-transition-active');
  document.body.append(overlay);
  window.requestAnimationFrame(() => overlay.classList.add('answer-flight--active'));
  await new Promise((resolve) => window.setTimeout(resolve, reduced ? 90 : 560));
  await onSwap?.();
  overlay.classList.add('answer-flight--swapped');
  await new Promise((resolve) => window.setTimeout(resolve, reduced ? 90 : 520));
  overlay.remove();
  card.classList.remove('question-card--transitioning');
  document.documentElement.classList.remove('question-transition-active');
}

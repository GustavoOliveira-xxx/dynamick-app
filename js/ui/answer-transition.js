import { el } from '../core/dom.js';

function prefersReducedMotion() {
  const root = document.documentElement;
  return (
    root.dataset.motion === 'reduced' ||
    (root.dataset.motion !== 'full' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );
}

export async function playAnswerTransition(card, { hasNext = true } = {}) {
  if (!card) return;
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
    { class: 'answer-flight', 'aria-hidden': 'true' },
    el(
      'div',
      { class: 'answer-flight__portal' },
      el('span', { class: 'answer-flight__ring answer-flight__ring--a' }),
      el('span', { class: 'answer-flight__ring answer-flight__ring--b' }),
      picture,
      el(
        'div',
        { class: 'answer-flight__particles' },
        Array.from({ length: 12 }, (_, index) => el('span', { style: { '--particle': String(index) } })),
      ),
    ),
    el('p', { class: 'answer-flight__label' }, hasNext ? 'Resposta registrada · próxima missão' : 'Resposta registrada'),
  );

  card.classList.add('question-card--transitioning');
  card.append(overlay);
  window.requestAnimationFrame(() => overlay.classList.add('answer-flight--active'));
  await new Promise((resolve) => window.setTimeout(resolve, prefersReducedMotion() ? 120 : 820));
  overlay.remove();
  card.classList.remove('question-card--transitioning');
}

/** Transição curta e cancelável entre telas da SPA. */

import { el } from '../core/dom.js';
import { knowledgeCube } from './knowledge-cube.js';

const ROUTE_LABELS = [
  [/^\/inicio/, 'Organizando seu próximo passo'],
  [/^\/conteudos/, 'Conectando o mapa de conteúdos'],
  [/^\/praticar/, 'Preparando sua prática'],
  [/^\/sessao/, 'Montando sua sessão'],
  [/^\/revisar/, 'Recuperando o que importa'],
  [/^\/simulados/, 'Equilibrando o seu simulado'],
  [/^\/redacao/, 'Abrindo seu espaço de escrita'],
  [/^\/onboarding/, 'Ajustando a jornada ao seu ritmo'],
  [/^\/perfil/, 'Carregando suas escolhas'],
];

let activeTransition = null;

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}
function reducedMotion() {
  const root = document.documentElement;
  return (
    root.dataset.motion === 'reduced' ||
    (root.dataset.motion !== 'full' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );
}

function labelFor(path) {
  return ROUTE_LABELS.find(([pattern]) => pattern.test(path))?.[1] ?? 'Conectando conhecimentos';
}

/**
 * Começa a saída da tela atual e devolve controles para montar a próxima tela.
 * Só uma transição pode existir; iniciar outra cancela a anterior sem deixar overlay.
 */
export function beginRouteTransition(main, path) {
  activeTransition?.cancel();

  let cancelled = false;
  const reduced = reducedMotion();
  const label = labelFor(path);
  const overlay = el(
    'div',
    {
      class: `route-transition${reduced ? ' route-transition--reduced' : ''}`,
      role: 'status',
      'aria-live': 'polite',
      'aria-label': label,
    },
    el(
      'div',
      { class: 'route-transition__content' },
      knowledgeCube({ variant: 'loader' }),
      el('span', { class: 'route-transition__eyebrow', 'aria-hidden': 'true' }, 'DynamiCK'),
      el('span', { class: 'route-transition__label' }, label),
      el(
        'span',
        { class: 'route-transition__track', 'aria-hidden': 'true' },
        el('span', { class: 'route-transition__signal' }),
      ),
    ),
  );

  document.body.append(overlay);
  main.classList.remove('page-view--entering');
  main.classList.add('page-view--leaving');
  // Garante que a classe de entrada seja pintada antes da animação.
  requestAnimationFrame(() => overlay.classList.add('route-transition--visible'));

  const transition = {
    ready: wait(reduced ? 35 : 190),
    async complete() {
      if (cancelled) return;
      main.classList.remove('page-view--leaving');
      main.classList.add('page-view--entering');
      overlay.classList.add('route-transition--complete');
      await wait(reduced ? 45 : 250);
      if (!cancelled) overlay.remove();
      if (activeTransition === transition) activeTransition = null;
    },
    cancel() {
      if (cancelled) return;
      cancelled = true;
      overlay.remove();
      main.classList.remove('page-view--leaving');
      if (activeTransition === transition) activeTransition = null;
    },
  };

  activeTransition = transition;
  return transition;
}

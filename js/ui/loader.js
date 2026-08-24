/**
 * Tela de carregamento — a logo do produto em movimento.
 *
 * Existe em duas formas, com a MESMA marcação e o MESMO CSS (css/loader.css):
 *
 *  1. escrita direto no HTML de cada página, para aparecer na primeira pintura,
 *     antes de qualquer módulo ser baixado;
 *  2. criada aqui, quando a navegação acontece dentro da mesma página ou quando
 *     o estudante clica em um link que leva para outro documento.
 *
 * A regra de ouro é não mentir: a tela some quando a próxima tela está montada,
 * não depois de um tempo fixo. O `minMs` existe só para evitar o piscar de 40ms,
 * que lê como falha de renderização, não como carregamento.
 *
 * A peça é o cubo mágico se abrindo com a logo dentro. Aqui só se constrói a
 * marcação: posição das oito peças, cor das faces e tempo moram em css/loader.css,
 * para que a versão escrita no HTML e esta sejam de fato a mesma tela.
 */

import { el } from '../core/dom.js';

const ELEMENT_ID = 'ck-boot';
const MIN_VISIBLE_MS = 420;

const WORD = [
  ['D', false], ['y', false], ['n', false], ['a', false], ['m', false],
  ['i', false], ['CK', true],
];

let shownAt = 0;
let hideTimer = null;

/**
 * O palco da marca: o cubo gira montado, as oito peças se afastam e a logo
 * estava dentro o tempo todo; depois elas voltam e o cubo fecha. É a mesma peça
 * da tela de carregamento inicial e da transição entre telas — uma identidade
 * só de "estamos preparando algo".
 */
export function brandStage() {
  const cube = el('div', { class: 'ck-boot__cube' });
  for (let peca = 0; peca < 8; peca += 1) {
    cube.append(
      el('div', { class: 'ck-boot__cubie' }, Array.from({ length: 6 }, () => el('i'))),
    );
  }

  const picture = el('picture');
  picture.append(el('source', { srcset: 'assets/brand/logo-dynamic.webp', type: 'image/webp' }));
  picture.append(
    el('img', {
      src: 'assets/brand/logo-dynamic.png',
      alt: '',
      width: 116,
      height: 105,
      decoding: 'async',
      fetchpriority: 'high',
    }),
  );

  return el(
    'div',
    { class: 'ck-boot__stage', 'aria-hidden': 'true' },
    el('span', { class: 'ck-boot__aura' }),
    cube,
    el('div', { class: 'ck-boot__logo' }, picture),
  );
}

/** Lettering "DynamiCK" com as letras subindo em sequência. */
export function brandWord() {
  return el(
    'p',
    { class: 'ck-boot__word', 'aria-hidden': 'true' },
    WORD.map(([letter, accent]) => el('span', accent ? { class: 'ck-boot__ck' } : null, letter)),
  );
}

/** Constrói a marcação da tela de carregamento. Igual à embutida no HTML. */
export function loaderMarkup({ label = 'Carregando', id = ELEMENT_ID } = {}) {
  return el(
    'div',
    { class: 'ck-boot', id, role: 'status', 'aria-live': 'polite' },
    brandStage(),
    brandWord(),
    el('p', { class: 'ck-boot__label' }, label),
    el('p', { class: 'ck-boot__signature', 'aria-hidden': 'true' }, 'Powered by Conscious Knowledge'),
    el('div', { class: 'ck-boot__bar', 'aria-hidden': 'true' }, el('span')),
  );
}

function element() {
  return document.getElementById(ELEMENT_ID);
}

/**
 * Mostra a tela de carregamento. Reaproveita a que veio no HTML, se ainda
 * estiver lá — trocar por uma nova reiniciaria a animação no meio.
 */
export function showLoader(label = 'Carregando') {
  window.clearTimeout(hideTimer);
  let node = element();

  if (!node) {
    node = loaderMarkup({ label });
    document.body.append(node);
  } else {
    node.hidden = false;
    node.classList.remove('ck-boot--done');
    const text = node.querySelector('.ck-boot__label');
    if (text && label) text.textContent = label;
  }

  shownAt = performance.now();
  return node;
}

/** Atualiza só o texto, sem reiniciar a animação. */
export function setLoaderLabel(label) {
  const text = element()?.querySelector('.ck-boot__label');
  if (text) text.textContent = label;
}

/**
 * Esconde a tela de carregamento.
 * Devolve uma promessa que resolve quando ela realmente saiu da tela — quem
 * precisa mover o foco depois disso não deve competir com o overlay.
 */
export function hideLoader({ minMs = MIN_VISIBLE_MS, remove = false } = {}) {
  const node = element();
  if (!node) return Promise.resolve();

  const elapsed = performance.now() - (shownAt || performance.now());
  const wait = Math.max(0, minMs - elapsed);

  return new Promise((resolve) => {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      node.classList.add('ck-boot--done');
      window.setTimeout(() => {
        if (remove) node.remove();
        else node.hidden = true;
        resolve();
      }, 340);
    }, wait);
  });
}

/**
 * Deixa a tela de carregamento visível durante a saída para outro documento.
 *
 * Sem isto, clicar em "Conteúdos" deixaria a tela atual congelada enquanto o
 * próximo documento carrega — o estudante não saberia se o clique funcionou.
 */
export function showLoaderForNavigation(label) {
  const node = showLoader(label);
  // Ao voltar pelo histórico o navegador pode restaurar esta página do cache
  // com o overlay ainda aberto. Este ouvinte devolve a tela ao normal.
  window.addEventListener(
    'pageshow',
    (event) => {
      if (event.persisted) hideLoader({ minMs: 0 });
    },
    { once: true },
  );
  return node;
}

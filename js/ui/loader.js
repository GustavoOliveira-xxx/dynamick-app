import { el } from '../core/dom.js';

const ELEMENT_ID = 'ck-boot';
const MIN_VISIBLE_MS = 420;

const WORD = [
  ['D', false], ['y', false], ['n', false], ['a', false], ['m', false],
  ['i', false], ['CK', true],
];

let shownAt = 0;
let hideTimer = null;

export function brandStage() {
  const NS = 'http://www.w3.org/2000/svg';
  const orbits = el('div', { class: 'ck-boot__orbits' });
  for (const nome of ['a', 'b', 'c']) {
    orbits.append(el('span', { class: `ck-boot__orbit ck-boot__orbit--${nome}` }));
  }

  const sparks = el('div', { class: 'ck-boot__sparks' }, Array.from({ length: 8 }, () => el('i')));

  const arc = document.createElementNS(NS, 'svg');
  arc.setAttribute('class', 'ck-boot__arc');
  arc.setAttribute('viewBox', '0 0 200 200');
  arc.setAttribute('aria-hidden', 'true');
  const defs = document.createElementNS(NS, 'defs');
  const grad = document.createElementNS(NS, 'linearGradient');
  grad.setAttribute('id', 'ck-boot-degrade');
  grad.setAttribute('x1', '0');
  grad.setAttribute('y1', '0');
  grad.setAttribute('x2', '1');
  grad.setAttribute('y2', '1');
  for (const [offset, cor] of [['0%', '#35d6c0'], ['55%', '#5cffb0'], ['100%', '#b8f36a']]) {
    const stop = document.createElementNS(NS, 'stop');
    stop.setAttribute('offset', offset);
    stop.setAttribute('stop-color', cor);
    grad.append(stop);
  }
  defs.append(grad);
  arc.append(defs);
  for (const cls of ['ck-boot__arc-track', 'ck-boot__arc-run']) {
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('class', cls);
    circle.setAttribute('cx', '100');
    circle.setAttribute('cy', '100');
    circle.setAttribute('r', '92');
    arc.append(circle);
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
    el('span', { class: 'ck-boot__glow' }),
    orbits,
    sparks,
    arc,
    el('div', { class: 'ck-boot__logo' }, picture, el('span', { class: 'ck-boot__shine' })),
  );
}

export function brandWord() {
  return el(
    'p',
    { class: 'ck-boot__word', 'aria-hidden': 'true' },
    WORD.map(([letter, accent]) => el('span', accent ? { class: 'ck-boot__ck' } : null, letter)),
  );
}

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

export function setLoaderLabel(label) {
  const text = element()?.querySelector('.ck-boot__label');
  if (text) text.textContent = label;
}

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

export function showLoaderForNavigation(label) {
  const node = showLoader(label);

  window.addEventListener(
    'pageshow',
    (event) => {
      if (event.persisted) hideLoader({ minMs: 0 });
    },
    { once: true },
  );
  return node;
}

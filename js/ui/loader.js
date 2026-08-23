














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
  const ring = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  ring.setAttribute('class', 'ck-boot__ring');
  ring.setAttribute('viewBox', '0 0 190 190');
  ring.setAttribute('aria-hidden', 'true');
  for (const [cls, radius] of [['ck-boot__ring-track', 88], ['ck-boot__ring-signal', 88]]) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', cls);
    circle.setAttribute('cx', '95');
    circle.setAttribute('cy', '95');
    circle.setAttribute('r', String(radius));
    ring.append(circle);
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
    el('span', { class: 'ck-boot__halo' }),
    ring,
    el('div', { class: 'ck-boot__logo' }, picture, el('span', { class: 'ck-boot__sweep' })),
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
    el('p', { class: 'ck-boot__signature', 'aria-hidden': 'true' }, 'by Conscious Knowledge'),
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

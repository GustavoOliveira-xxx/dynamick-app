import { linkTo } from './pages.js';

export function el(tag, attrs = null, ...children) {
  const node = document.createElement(tag);

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;

      if (key === 'href' && typeof value === 'string' && value.startsWith('#/')) {

        node.setAttribute('href', linkTo(value));
      } else if (key === 'class') {
        node.className = value;
      } else if (key === 'dataset') {
        Object.assign(node.dataset, value);
      } else if (key === 'style' && typeof value === 'object') {
        for (const [prop, css] of Object.entries(value)) {
          if (css === null || css === undefined) continue;

          if (prop.startsWith('--')) node.style.setProperty(prop, String(css));
          else node.style[prop] = css;
        }
      } else if (key.startsWith('on') && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === 'html') {

        node.innerHTML = value;
      } else if (value === true) {
        node.setAttribute(key, '');
      } else {
        node.setAttribute(key, String(value));
      }
    }
  }

  append(node, children);
  return node;
}

export function append(parent, children) {
  for (const child of children.flat(Infinity)) {
    if (child === null || child === undefined || child === false) continue;
    parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return parent;
}

export function frag(...children) {
  const fragment = document.createDocumentFragment();
  append(fragment, children);
  return fragment;
}

export function render(target, ...children) {
  target.replaceChildren();
  append(target, children);
  return target;
}

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

let idCounter = 0;
export function uid(prefix = 'ck') {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export function on(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

export function trapFocus(container) {
  const previous = document.activeElement;
  const selector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function focusables() {
    return [...container.querySelectorAll(selector)].filter(
      (node) => node.offsetParent !== null || node === document.activeElement,
    );
  }

  function onKeydown(event) {
    if (event.key !== 'Tab') return;
    const items = focusables();
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  container.addEventListener('keydown', onKeydown);
  focusables()[0]?.focus();

  return () => {
    container.removeEventListener('keydown', onKeydown);
    if (previous instanceof HTMLElement) previous.focus();
  };
}

export function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

export function debounce(fn, wait = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Helpers de DOM.
 *
 * Regra: nada nesta base usa innerHTML com dado do usuário ou do conteúdo.
 * Tudo é criado por createElement + textContent, o que elimina a superfície de XSS
 * sem precisar de sanitizador.
 */

import { linkTo } from './pages.js';

/**
 * Cria um elemento.
 * @param {string} tag
 * @param {Record<string, unknown>|null} attrs  atributos; `class`, `dataset`, `style`,
 *   `on*` (handlers) e o resto viram setAttribute
 * @param {...(Node|string|null|undefined|Array)} children
 */
export function el(tag, attrs = null, ...children) {
  const node = document.createElement(tag);

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;

      if (key === 'href' && typeof value === 'string' && value.startsWith('#/')) {
        /*
         * Rotas continuam sendo escritas como '#/conteudos/x' em toda a base.
         * Como a aplicação foi dividida em vários documentos, o endereço real
         * pode ser 'conteudos.html#/conteudos/x'. A tradução acontece aqui, em
         * um lugar só: nenhuma view precisa saber em qual arquivo a tela mora,
         * e o link continua sendo um link de verdade — copiável, abrível em
         * outra aba e visível na barra de status do navegador.
         */
        node.setAttribute('href', linkTo(value));
      } else if (key === 'class') {
        node.className = value;
      } else if (key === 'dataset') {
        Object.assign(node.dataset, value);
      } else if (key === 'style' && typeof value === 'object') {
        for (const [prop, css] of Object.entries(value)) {
          if (css === null || css === undefined) continue;
          // Custom properties (--x) precisam de setProperty; o resto aceita atribuição.
          if (prop.startsWith('--')) node.style.setProperty(prop, String(css));
          else node.style[prop] = css;
        }
      } else if (key.startsWith('on') && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === 'html') {
        // Uso restrito: apenas para marcação estática definida no próprio código.
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

/** Substitui todo o conteúdo de um elemento. */
export function render(target, ...children) {
  target.replaceChildren();
  append(target, children);
  return target;
}

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/** Gera ids únicos para ligar label/aria-describedby sem colisão. */
let idCounter = 0;
export function uid(prefix = 'ck') {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/** Escuta um evento e devolve a função de remoção — facilita limpeza de views. */
export function on(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

/**
 * Prende o foco dentro de um contêiner (modais).
 * Devolve a função que solta o foco e devolve ao elemento anterior.
 */
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

/** Espera um tick de renderização — útil antes de mover o foco. */
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

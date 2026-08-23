












import { isCrossPage, linkTo, pageForRoute } from './pages.js';
import { showLoaderForNavigation } from '../ui/loader.js';

const routes = [];
let notFoundHandler = null;
let currentCleanup = null;
let currentPath = null;







export function route(pattern, handler) {
  const names = [];
  const regex = new RegExp(
    `^${pattern
      .replace(/\/$/, '')
      .replace(/:[A-Za-z0-9_]+/g, (match) => {
        names.push(match.slice(1));
        return '([^/]+)';
      })}/?$`,
  );
  routes.push({ pattern, regex, names, handler });
}

export function notFound(handler) {
  notFoundHandler = handler;
}

export function currentRoute() {
  return currentPath;
}

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, queryString = ''] = raw.split('?');
  return { path: path || '/', query: new URLSearchParams(queryString) };
}

async function resolve() {
  const { path, query } = parseHash();


  if (typeof currentCleanup === 'function') {
    try {
      currentCleanup();
    } catch (error) {
      console.error('Falha ao limpar a tela anterior', error);
    }
    currentCleanup = null;
  }

  currentPath = path;

  for (const entry of routes) {
    const match = entry.regex.exec(path);
    if (!match) continue;

    const params = {};
    entry.names.forEach((name, index) => {
      params[name] = decodeURIComponent(match[index + 1]);
    });

    try {
      currentCleanup = await entry.handler({ params, query, path });
    } catch (error) {
      console.error(`Erro ao abrir ${path}`, error);
      notFoundHandler?.({ path, error });
    }
    return;
  }

  notFoundHandler?.({ path });
}

export function navigate(path, { replace = false } = {}) {
  const clean = path.startsWith('#') ? path.slice(1) : path;



  if (isCrossPage(clean)) {
    const destino = pageForRoute(clean);
    showLoaderForNavigation(destino?.title ? `Abrindo ${destino.title.toLowerCase()}` : 'Carregando');
    const url = linkTo(clean);
    if (replace) window.location.replace(url);
    else window.location.assign(url);
    return;
  }

  const target = `#${clean}`;




  if (window.location.hash === target) {
    resolve();
    return;
  }

  if (replace) {
    window.location.replace(`${window.location.pathname}${window.location.search}${target}`);
  } else {
    window.location.hash = target;
  }
}


export function refresh() {
  resolve();
}

export function start() {
  window.addEventListener('hashchange', resolve);
  resolve();
}


export function redirect(path) {
  navigate(path, { replace: true });
}

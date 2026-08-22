/**
 * Roteador por hash.
 *
 * Escolha deliberada: `#/rota` funciona ao abrir os arquivos direto de um servidor
 * estático simples, sem precisar de reescrita no servidor. Atualizar a página mantém
 * a rota — o problema de "tela em branco ao atualizar" não existe aqui.
 */

const routes = [];
let notFoundHandler = null;
let currentCleanup = null;
let currentPath = null;

/**
 * Registra uma rota.
 * @param {string} pattern  ex.: '/conteudos/:slug'
 * @param {(context: {params: object, query: URLSearchParams, path: string}) => void|Function} handler
 *   pode devolver uma função de limpeza (para timers, listeners etc.)
 */
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

  // Limpeza da view anterior: evita timers e listeners vazando entre telas.
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
  const target = path.startsWith('#') ? path : `#${path}`;
  if (replace) {
    window.location.replace(`${window.location.pathname}${window.location.search}${target}`);
  } else {
    window.location.hash = target;
  }
}

export function start() {
  window.addEventListener('hashchange', resolve);
  resolve();
}

/** Redireciona sem empilhar histórico — usado por guardas de rota. */
export function redirect(path) {
  navigate(path, { replace: true });
}

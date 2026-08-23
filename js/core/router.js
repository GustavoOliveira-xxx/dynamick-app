/**
 * Roteador por hash, dentro de cada documento.
 *
 * Escolha deliberada: `#/rota` funciona ao abrir os arquivos direto de um servidor
 * estático simples, sem precisar de reescrita no servidor. Atualizar a página mantém
 * a rota — o problema de "tela em branco ao atualizar" não existe aqui.
 *
 * A aplicação está dividida em vários documentos (inicio.html, conteudos.html…).
 * Cada um registra apenas as rotas que lhe pertencem; ir para uma rota de outro
 * documento é uma navegação de verdade do navegador, com tela de carregamento.
 * `js/core/pages.js` é quem sabe qual rota mora em qual arquivo.
 */

import { isCrossPage, linkTo, pageForRoute } from './pages.js';
import { showLoaderForNavigation } from '../ui/loader.js';

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
  const clean = path.startsWith('#') ? path.slice(1) : path;

  // Rota de outro documento: sai desta página levando a tela de carregamento
  // junto, para que o clique tenha resposta imediata.
  if (isCrossPage(clean)) {
    const destino = pageForRoute(clean);
    showLoaderForNavigation(destino?.title ? `Abrindo ${destino.title.toLowerCase()}` : 'Carregando');
    const url = linkTo(clean);
    if (replace) window.location.replace(url);
    else window.location.assign(url);
    return;
  }

  const target = `#${clean}`;

  // Ir para a rota em que já se está não muda o hash, e sem mudança o navegador
  // não dispara `hashchange` — a tela ficaria congelada mostrando dados velhos.
  // Quem chama navigate() para a rota atual quer justamente redesenhar.
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

/** Redesenha a tela atual. Use depois de mudar algo que a tela já mostrava. */
export function refresh() {
  resolve();
}

export function start() {
  window.addEventListener('hashchange', resolve);
  resolve();
}

/** Redireciona sem empilhar histórico — usado por guardas de rota. */
export function redirect(path) {
  navigate(path, { replace: true });
}

/**
 * Mapa de páginas.
 *
 * A área de estudo deixou de ser um único documento. Cada grande área virou um
 * arquivo HTML próprio (inicio.html, conteudos.html, praticar.html…), e este
 * módulo é a única fonte de verdade sobre qual rota mora em qual documento.
 *
 * Por que dividir:
 *  - o navegador só baixa e executa os módulos daquela área, não os 50 e poucos
 *    da aplicação inteira;
 *  - cada troca de área passa por um carregamento real, com tela de
 *    carregamento visível — estado, e não um salto seco;
 *  - um erro em uma tela não derruba a aplicação toda;
 *  - atualizar a página em qualquer endereço continua funcionando.
 *
 * Dentro de uma mesma página, a navegação continua sendo por hash (#/rota), sem
 * recarregar nada. `linkTo()` resolve as duas situações: mesma página vira
 * `#/rota`; página diferente vira `arquivo.html#/rota`.
 */

/**
 * Ordem importa apenas para leitura: a resolução usa o prefixo mais longo.
 * `routes` são prefixos — '/conteudos' cobre '/conteudos/:slug'.
 */
export const PAGES = [
  { id: 'entrar', file: 'entrar.html', title: 'Entrar', routes: ['/entrar'] },
  { id: 'onboarding', file: 'onboarding.html', title: 'Seu perfil de estudo', routes: ['/onboarding'] },
  { id: 'inicio', file: 'inicio.html', title: 'Início', routes: ['/inicio', '/diagnostico'] },
  { id: 'conteudos', file: 'conteudos.html', title: 'Conteúdos', routes: ['/conteudos'] },
  { id: 'praticar', file: 'praticar.html', title: 'Praticar', routes: ['/praticar'] },
  { id: 'sessao', file: 'sessao.html', title: 'Sessão de estudo', routes: ['/sessao'] },
  { id: 'revisar', file: 'revisar.html', title: 'Revisar', routes: ['/revisar'] },
  { id: 'simulados', file: 'simulados.html', title: 'Simulados', routes: ['/simulados'] },
  { id: 'redacao', file: 'redacao.html', title: 'Redação', routes: ['/redacao'] },
  { id: 'metodos', file: 'metodos.html', title: 'Formas de estudar', routes: ['/metodos'] },
  { id: 'buscar', file: 'buscar.html', title: 'Buscar', routes: ['/buscar'] },
  { id: 'catalogo', file: 'catalogo.html', title: 'Saúde do conteúdo', routes: ['/catalogo'] },
  { id: 'perfil', file: 'perfil.html', title: 'Perfil', routes: ['/perfil'] },
];

const byId = new Map(PAGES.map((page) => [page.id, page]));

/** Página inicial da área de estudo — destino de '/' e de rotas desconhecidas. */
export const HOME_PAGE = byId.get('inicio');

export function getPage(id) {
  return byId.get(id) ?? null;
}

/**
 * Separa a rota da consulta.
 * '#/sessao/x?comecar=sim' → { route: '/sessao/x', query: '?comecar=sim' }
 *
 * A consulta PRECISA sobreviver: telas como a sessão usam '?comecar=sim' para
 * distinguir a preparação da resolução. Perder isso deixava o botão "Começar"
 * sem efeito.
 */
function split(path) {
  const withoutHash = String(path ?? '').replace(/^#/, '');
  const index = withoutHash.indexOf('?');
  const route = index === -1 ? withoutHash : withoutHash.slice(0, index);
  const query = index === -1 ? '' : withoutHash.slice(index);
  return { route: route.startsWith('/') ? route : `/${route}`, query };
}

function normalize(path) {
  return split(path).route;
}

/**
 * Qual documento responde por esta rota.
 * Casamento por prefixo mais longo: '/perfil/dados' cai em perfil.html.
 */
export function pageForRoute(path) {
  const clean = normalize(path);
  let best = null;

  for (const page of PAGES) {
    for (const prefix of page.routes) {
      if (clean === prefix || clean.startsWith(`${prefix}/`)) {
        if (!best || prefix.length > best.prefix.length) best = { page, prefix };
      }
    }
  }

  return best?.page ?? null;
}

/** Id da página atual, lido do atributo do body. Fora do navegador, null. */
export function currentPageId() {
  if (typeof document === 'undefined') return null;
  return document.body?.dataset?.page ?? null;
}

/**
 * Endereço utilizável para uma rota, a partir da página atual.
 * Mesma página → '#/rota' (sem recarregar). Outra página → 'arquivo.html#/rota'.
 */
export function linkTo(path) {
  const { route, query } = split(path);
  const target = pageForRoute(route);
  const hash = `#${route}${query}`;
  if (!target || target.id === currentPageId()) return hash;
  return `${target.file}${hash}`;
}

/** true quando abrir esta rota exige carregar outro documento. */
export function isCrossPage(path) {
  const target = pageForRoute(path);
  return Boolean(target) && target.id !== currentPageId();
}

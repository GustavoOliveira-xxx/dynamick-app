























export const PAGES = [
  { id: 'entrar', file: 'entrar.html', title: 'Entrar', routes: ['/entrar'] },
  { id: 'onboarding', file: 'onboarding.html', title: 'Seu perfil de estudo', routes: ['/onboarding'] },
  { id: 'inicio', file: 'inicio.html', title: 'Início', routes: ['/inicio', '/diagnostico'] },
  { id: 'conteudos', file: 'conteudos.html', title: 'Conteúdos', routes: ['/conteudos'] },
  { id: 'praticar', file: 'praticar.html', title: 'Praticar', routes: ['/praticar'] },
  { id: 'sessao', file: 'sessao.html', title: 'Sessão de estudo', routes: ['/sessao'] },
  { id: 'revisar', file: 'revisar.html', title: 'Revisar', routes: ['/revisar'] },
  { id: 'simulados', file: 'simulados.html', title: 'Simulados', routes: ['/simulados'] },
  { id: 'enems', file: 'enems.html', title: 'ENEMs anteriores', routes: ['/enems'] },
  { id: 'redacao', file: 'redacao.html', title: 'Redação', routes: ['/redacao'] },
  { id: 'metodos', file: 'metodos.html', title: 'Formas de estudar', routes: ['/metodos'] },
  { id: 'buscar', file: 'buscar.html', title: 'Buscar', routes: ['/buscar'] },
  { id: 'catalogo', file: 'catalogo.html', title: 'Saúde do conteúdo', routes: ['/catalogo'] },
  { id: 'perfil', file: 'perfil.html', title: 'Perfil', routes: ['/perfil'] },
];

const byId = new Map(PAGES.map((page) => [page.id, page]));


export const HOME_PAGE = byId.get('inicio');

export function getPage(id) {
  return byId.get(id) ?? null;
}









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


export function currentPageId() {
  if (typeof document === 'undefined') return null;
  return document.body?.dataset?.page ?? null;
}





export function linkTo(path) {
  const { route, query } = split(path);
  const target = pageForRoute(route);
  const hash = `#${route}${query}`;
  if (!target || target.id === currentPageId()) return hash;
  return `${target.file}${hash}`;
}


export function isCrossPage(path) {
  const target = pageForRoute(path);
  return Boolean(target) && target.id !== currentPageId();
}

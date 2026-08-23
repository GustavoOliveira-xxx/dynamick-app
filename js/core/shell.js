/**
 * Casca comum das páginas da área de estudo.
 *
 * Cada documento (inicio.html, conteudos.html, praticar.html…) carrega apenas os
 * módulos das suas telas e chama `startPage()` com as rotas que lhe pertencem.
 * Tudo que é igual em todas as páginas — cabeçalho, navegação, fundo dinâmico,
 * preferências, guardas de acesso, transição entre telas — vive aqui.
 */

import { el, render } from './dom.js';
import { route, notFound, start, navigate, currentRoute } from './router.js';
import { getState, onStorageError, storageAvailable, subscribe, watchOtherTabs } from './store.js';
import { applyPreferences, student } from './student.js';
import { bindActiveAccount, currentAccount, isSignedIn, signOut } from './account.js';
import { linkTo, pageForRoute, currentPageId, HOME_PAGE } from './pages.js';
import { dynamickLogo } from '../ui/brand.js';
import { mountBackground } from '../ui/background.js';
import { beginRouteTransition } from '../ui/transitions.js';
import { hideLoader, setLoaderLabel, showLoaderForNavigation } from '../ui/loader.js';
import { emptyState, message, toast } from '../ui/components.js';

const NAV_ITEMS = [
  { href: '#/inicio', label: 'Início', icon: '◉', match: '/inicio' },
  { href: '#/conteudos', label: 'Conteúdos', icon: '◫', match: '/conteudos' },
  { href: '#/praticar', label: 'Praticar', icon: '◈', match: '/praticar' },
  { href: '#/revisar', label: 'Revisar', icon: '↻', match: '/revisar' },
  { href: '#/perfil', label: 'Perfil', icon: '◑', match: '/perfil' },
];

const SECONDARY_NAV = [
  { href: '#/buscar', label: 'Buscar', icon: '⌕', match: '/buscar' },
  { href: '#/metodos', label: 'Formas de estudar', icon: '✦', match: '/metodos' },
  { href: '#/simulados', label: 'Simulados', icon: '◱', match: '/simulados' },
  { href: '#/redacao', label: 'Redação', icon: '✎', match: '/redacao' },
  { href: '#/catalogo', label: 'Saúde do conteúdo', icon: '⚙', match: '/catalogo' },
];

let main = null;
let backgroundHost = null;
let disposeBackground = null;
let lastIntensity = null;
let lastBackgroundContext = null;
let viewSequence = 0;

/* ---------------------------------------------------------------- Fundo */

/** Intensidade visual por contexto: alta no início, baixa durante a leitura. */
function intensityFor(path) {
  if (path.startsWith('/sessao')) return 'low';
  if (path.startsWith('/redacao/')) return 'low';
  if (path.startsWith('/catalogo')) return 'low';
  if (path.startsWith('/inicio')) return 'medium-high';
  if (path.startsWith('/entrar')) return 'medium-high';
  if (path.startsWith('/conteudos') && path !== '/conteudos') return 'medium';
  if (path === '/conteudos') return 'medium-high';
  return 'medium';
}

function backgroundContextFor(path) {
  if (path === '/inicio') return 'dashboard';
  if (path === '/conteudos') return 'map';
  if (path.startsWith('/sessao')) return 'focus';
  if (path.startsWith('/redacao/')) return 'focus';
  if (path.startsWith('/entrar')) return 'landing';
  return 'app';
}

function syncBackground(path) {
  if (!backgroundHost) return;
  const intensity = intensityFor(path);
  const context = backgroundContextFor(path);
  if (intensity === lastIntensity && context === lastBackgroundContext) return;
  lastIntensity = intensity;
  lastBackgroundContext = context;
  disposeBackground?.();
  disposeBackground = mountBackground(backgroundHost, {
    intensity,
    interactive: intensity === 'medium-high' || intensity === 'high',
    context,
  });
}

/* ---------------------------------------------------------------- Navegação */

function isActive(match, path) {
  return path === match || path.startsWith(`${match}/`);
}

/**
 * A navegação marca a página atual mesmo quando a rota é de outro documento:
 * estando em conteudos.html, "Conteúdos" continua sendo a seção corrente.
 */
function isCurrentSection(match, path) {
  if (isActive(match, path)) return true;
  return pageForRoute(match)?.id === currentPageId();
}

function renderNav() {
  const path = currentRoute() ?? '/inicio';
  const desktop = document.getElementById('navegacao');
  const mobile = document.getElementById('navegacao-mobile');
  if (!desktop || !mobile) return;

  render(
    desktop,
    NAV_ITEMS.map((item) =>
      el(
        'a',
        {
          class: 'nav-item',
          href: item.href,
          'aria-current': isCurrentSection(item.match, path) ? 'page' : null,
        },
        el('span', { 'aria-hidden': 'true' }, item.icon),
        item.label,
        isCurrentSection(item.match, path) ? el('span', { class: 'sr-only' }, '(página atual)') : null,
      ),
    ),
    el('hr', { class: 'hairline' }),
    SECONDARY_NAV.map((item) =>
      el(
        'a',
        {
          class: 'nav-item',
          href: item.href,
          'aria-current': isCurrentSection(item.match, path) ? 'page' : null,
        },
        el('span', { 'aria-hidden': 'true' }, item.icon),
        item.label,
      ),
    ),
  );

  render(
    mobile,
    NAV_ITEMS.map((item) =>
      el(
        'a',
        {
          class: 'nav-item-mobile',
          href: item.href,
          'aria-current': isCurrentSection(item.match, path) ? 'page' : null,
        },
        el('span', { class: 'nav-icon', 'aria-hidden': 'true' }, item.icon),
        item.label,
      ),
    ),
  );
}

function renderHeader() {
  const actions = document.getElementById('cabecalho-acoes');
  if (!actions) return;

  const account = currentAccount();

  if (!account) {
    render(
      actions,
      el('a', { class: 'btn btn--ghost btn--sm', href: 'index.html' }, 'Voltar ao site'),
    );
    return;
  }

  const displayName = student().name || account.name || '';
  const firstName = displayName ? displayName.split(' ')[0] : '';

  render(
    actions,
    firstName
      ? el('a', { class: 'small secondary hide-sm header-account', href: '#/perfil' }, firstName)
      : null,
    account.guest
      ? el('a', { class: 'btn btn--secondary btn--sm', href: '#/entrar' }, 'Criar conta')
      : null,
    el(
      'button',
      {
        class: 'btn btn--ghost btn--sm',
        type: 'button',
        onclick: () => {
          signOut();
          showLoaderForNavigation('Saindo com segurança');
          window.location.assign('index.html');
        },
      },
      account.guest ? 'Sair' : 'Sair da conta',
    ),
  );
}

/* ---------------------------------------------------------------- Guardas */

/**
 * Sem sessão aberta, a porta é a tela de entrar — nunca o onboarding.
 * Esta era a origem do "clico em Entrar e caio no onboarding de novo".
 */
export function requireAccount() {
  return isSignedIn() ? null : '/entrar';
}

/** Com conta, mas sem nenhuma resposta do onboarding: passa pelo onboarding. */
export function requireOnboarding() {
  if (!isSignedIn()) return '/entrar';
  return student().onboardingStatus === 'not_started' ? '/onboarding' : null;
}

/* ---------------------------------------------------------------- View */

/**
 * Envolve o handler de uma rota: limpa a tela, aplica o fundo, atualiza a
 * navegação e move o foco para o conteúdo (importante para leitor de tela).
 */
export function view(handler, { guard } = {}) {
  return async (context) => {
    const sequence = ++viewSequence;

    if (guard) {
      const redirectTo = guard(context);
      if (redirectTo) {
        navigate(redirectTo, { replace: true });
        return undefined;
      }
    }

    syncBackground(context.path);
    const transition = beginRouteTransition(main, context.path);
    await transition.ready;
    if (sequence !== viewSequence) {
      transition.cancel();
      return undefined;
    }

    render(main);

    let cleanup;
    try {
      cleanup = await handler(main, context);
    } catch (error) {
      console.error('Falha ao montar a tela', error);
      render(
        main,
        message(
          'danger',
          'Algo não carregou como esperado',
          el('p', {}, 'Isso é um problema nosso, não seu. Tente recarregar a página.'),
          el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } }, String(error?.message ?? error)),
        ),
      );
    }

    if (sequence !== viewSequence) {
      cleanup?.();
      transition.cancel();
      return undefined;
    }

    renderNav();
    renderHeader();
    // O título da aba acompanha a tela — ajuda orientação e histórico.
    document.title = `${main.querySelector('h1')?.textContent ?? 'Dynamic CK'} · Dynamic CK`;
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
    await transition.complete();
    return cleanup;
  };
}

/* ---------------------------------------------------------------- Boot */

/**
 * Liga uma página da área de estudo.
 *
 * @param {{
 *   register: (helpers: {route: Function, view: Function, requireOnboarding: Function, requireAccount: Function}) => void,
 *   fallbackRoute?: string,
 *   chrome?: boolean,   false esconde cabeçalho e navegação (entrar, onboarding)
 * }} options
 */
export async function startPage({ register, fallbackRoute = '/inicio', chrome = true }) {
  main = document.getElementById('conteudo-principal');
  backgroundHost = document.getElementById('fundo');

  // A conta ativa define de qual espaço o store lê. Precisa vir antes de tudo.
  bindActiveAccount();

  const marca = document.getElementById('marca');
  if (marca) marca.append(dynamickLogo({ variant: 'compact', animated: false }));

  if (!chrome) document.body.classList.add('app--focused');

  getState();
  applyPreferences();

  onStorageError((text) => toast(text, 'danger', 8000));

  if (!storageAvailable) {
    main.before(
      el(
        'div',
        { class: 'shell', style: { paddingTop: '1rem' } },
        message(
          'warning',
          'Seu navegador está bloqueando o armazenamento local',
          el('p', {}, 'A plataforma funciona, mas seu progresso não será salvo ao fechar a aba. Isso costuma acontecer em janelas anônimas ou com cookies de site bloqueados.'),
        ),
      ),
    );
  }

  watchOtherTabs(() => {
    applyPreferences();
    toast('Seus dados foram atualizados em outra aba.', 'info');
  });

  subscribe(() => applyPreferences());

  /*
   * Link que leva para outro documento: mostra o carregamento no ato do clique.
   * Sem isto, a tela atual ficaria congelada até o próximo documento chegar, e
   * um clique sem resposta lê como clique que não funcionou.
   *
   * Fica em captura, no documento, para valer também para links criados depois.
   */
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest?.('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || /^[a-z]+:/i.test(href)) return;

    const destino = pageForRoute(href.split('#')[1] ?? '');
    showLoaderForNavigation(destino ? `Abrindo ${destino.title.toLowerCase()}` : 'Carregando');
  });

  register({ route, view, requireOnboarding, requireAccount });

  /*
   * Endereço que não existe NESTE documento pode existir em outro: digitar
   * inicio.html#/perfil deve abrir o perfil, não uma tela de "não encontrado".
   */
  notFound(({ path }) => {
    const target = pageForRoute(path);
    if (target && target.id !== currentPageId()) {
      setLoaderLabel(`Abrindo ${target.title.toLowerCase()}`);
      window.location.replace(linkTo(path));
      return;
    }

    syncBackground('/');
    render(
      main,
      emptyState({
        title: 'Não encontramos esta tela',
        description: `O endereço "${path}" não existe. Talvez o link esteja quebrado ou desatualizado.`,
        actionLabel: 'Ir para o meu início',
        actionHref: `#${fallbackRoute}`,
        icon: '?',
      }),
    );
    renderNav();
    renderHeader();
  });

  // Sem hash, a página abre na sua rota principal.
  if (!window.location.hash || window.location.hash === '#') {
    window.location.replace(`${window.location.pathname}${window.location.search}#${fallbackRoute}`);
  }

  start();

  // A tela de carregamento sai quando a primeira tela está montada — não antes.
  await hideLoader();
}

export { HOME_PAGE, NAV_ITEMS, SECONDARY_NAV };

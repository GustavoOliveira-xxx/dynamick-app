/**
 * Ponto de entrada da aplicação.
 * Monta o shell, registra as rotas e cuida das preferências visuais.
 */

import { el, render } from './core/dom.js';
import { route, notFound, start, navigate, currentRoute } from './core/router.js';
import { getState, onStorageError, storageAvailable, subscribe, watchOtherTabs } from './core/store.js';
import { applyPreferences, student } from './core/student.js';
import { dynamickLogo } from './ui/brand.js';
import { mountBackground } from './ui/background.js';
import { emptyState, message, toast } from './ui/components.js';

import { renderOnboardingWelcome, renderOnboardingStep, renderProfileConfirmation, renderOnboardingSummary } from './views/onboarding.js';
import { renderDashboard } from './views/dashboard.js';
import { renderContentMap, renderTopic } from './views/content.js';
import { renderPractice, renderSessionTemplate, renderQuickSession } from './views/practice.js';
import { renderSession, renderSessionResult } from './views/session.js';
import { renderReview, renderNotebook } from './views/review.js';
import { renderSimulations, renderSimulationDetail, renderSimulationResult } from './views/simulations.js';
import { renderEssayHub, renderEssayPrompt } from './views/essay.js';
import { renderMethods } from './views/methods.js';
import { renderSearch } from './views/search.js';
import { renderProfileHub, renderStudyProfile, renderSettings, renderReport, renderDataPage } from './views/profile.js';
import { renderDiagnostic } from './views/diagnostic.js';
import { renderCatalog } from './views/catalog.js';

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

const main = document.getElementById('conteudo-principal');
const backgroundHost = document.getElementById('fundo');
let disposeBackground = null;
let lastIntensity = null;

/** Intensidade visual por contexto: alta no início, baixa durante a leitura. */
function intensityFor(path) {
  if (path.startsWith('/sessao')) return 'low';
  if (path.startsWith('/redacao/')) return 'low';
  if (path.startsWith('/catalogo')) return 'low';
  if (path.startsWith('/inicio')) return 'medium-high';
  if (path.startsWith('/conteudos') && path !== '/conteudos') return 'medium';
  if (path === '/conteudos') return 'medium-high';
  return 'medium';
}

function syncBackground(path) {
  const intensity = intensityFor(path);
  if (intensity === lastIntensity) return;
  lastIntensity = intensity;
  disposeBackground?.();
  disposeBackground = mountBackground(backgroundHost, {
    intensity,
    interactive: intensity === 'medium-high' || intensity === 'high',
  });
}

function isActive(match, path) {
  return path === match || path.startsWith(`${match}/`);
}

function renderNav() {
  const path = currentRoute() ?? '/inicio';
  const desktop = document.getElementById('navegacao');
  const mobile = document.getElementById('navegacao-mobile');

  render(
    desktop,
    NAV_ITEMS.map((item) =>
      el(
        'a',
        {
          class: 'nav-item',
          href: item.href,
          'aria-current': isActive(item.match, path) ? 'page' : null,
        },
        el('span', { 'aria-hidden': 'true' }, item.icon),
        item.label,
        isActive(item.match, path) ? el('span', { class: 'sr-only' }, '(página atual)') : null,
      ),
    ),
    el('hr', { class: 'hairline' }),
    SECONDARY_NAV.map((item) =>
      el(
        'a',
        {
          class: 'nav-item',
          href: item.href,
          'aria-current': isActive(item.match, path) ? 'page' : null,
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
          'aria-current': isActive(item.match, path) ? 'page' : null,
        },
        el('span', { class: 'nav-icon', 'aria-hidden': 'true' }, item.icon),
        item.label,
      ),
    ),
  );
}

function renderHeader() {
  const actions = document.getElementById('cabecalho-acoes');
  const name = student().name;
  render(
    actions,
    name ? el('span', { class: 'small secondary hide-sm' }, name.split(' ')[0]) : null,
    el('a', { class: 'btn btn--ghost btn--sm', href: 'index.html' }, 'Sair'),
  );
}

/**
 * Envolve o handler de uma rota: limpa a tela, aplica o fundo, atualiza a navegação
 * e move o foco para o conteúdo (importante para leitor de tela em SPA).
 */
function view(handler, { guard } = {}) {
  return async (context) => {
    if (guard) {
      const redirectTo = guard(context);
      if (redirectTo) {
        navigate(redirectTo, { replace: true });
        return undefined;
      }
    }

    syncBackground(context.path);
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

    renderNav();
    renderHeader();
    // O título da aba acompanha a tela — ajuda orientação e histórico.
    document.title = `${main.querySelector('h1')?.textContent ?? 'Dynamic CK'} · Dynamic CK`;
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
    return cleanup;
  };
}

/** Guarda: quem ainda não passou pelo onboarding é levado para lá. */
function requireOnboarding() {
  const status = student().onboardingStatus;
  if (status === 'not_started') return '/onboarding';
  return null;
}

/* ---------------------------------------------------------------- Rotas */

route('/', view(async () => { navigate('/inicio', { replace: true }); }));

route('/onboarding', view(renderOnboardingWelcome));
route('/onboarding/perfil', view(renderProfileConfirmation));
route('/onboarding/resumo', view(renderOnboardingSummary));
route('/onboarding/:etapa', view(renderOnboardingStep));

route('/inicio', view(renderDashboard, { guard: requireOnboarding }));
route('/diagnostico', view(renderDiagnostic, { guard: requireOnboarding }));

route('/conteudos', view(renderContentMap, { guard: requireOnboarding }));
route('/conteudos/:slug', view(renderTopic, { guard: requireOnboarding }));

route('/praticar', view(renderPractice, { guard: requireOnboarding }));
route('/praticar/rapido', view(renderQuickSession, { guard: requireOnboarding }));
route('/praticar/sessao/:slug', view(renderSessionTemplate, { guard: requireOnboarding }));

route('/sessao/:id', view(renderSession, { guard: requireOnboarding }));
route('/sessao/:id/resultado', view(renderSessionResult, { guard: requireOnboarding }));

route('/revisar', view(renderReview, { guard: requireOnboarding }));
route('/revisar/caderno', view(renderNotebook, { guard: requireOnboarding }));

route('/simulados', view(renderSimulations, { guard: requireOnboarding }));
route('/simulados/resultado/:runId', view(renderSimulationResult, { guard: requireOnboarding }));
route('/simulados/:slug', view(renderSimulationDetail, { guard: requireOnboarding }));

route('/redacao', view(renderEssayHub, { guard: requireOnboarding }));
route('/redacao/:slug', view(renderEssayPrompt, { guard: requireOnboarding }));

route('/metodos', view(renderMethods, { guard: requireOnboarding }));
route('/buscar', view(renderSearch, { guard: requireOnboarding }));
route('/catalogo', view(renderCatalog, { guard: requireOnboarding }));

route('/perfil', view(renderProfileHub, { guard: requireOnboarding }));
route('/perfil/estudo', view(renderStudyProfile, { guard: requireOnboarding }));
route('/perfil/configuracoes', view(renderSettings, { guard: requireOnboarding }));
route('/perfil/relatorio', view(renderReport, { guard: requireOnboarding }));
route('/perfil/dados', view(renderDataPage, { guard: requireOnboarding }));

notFound(({ path }) => {
  syncBackground('/');
  render(
    main,
    emptyState({
      title: 'Não encontramos esta tela',
      description: `O endereço "${path}" não existe. Talvez o link esteja quebrado ou desatualizado.`,
      actionLabel: 'Ir para o meu início',
      actionHref: '#/inicio',
      icon: '?',
    }),
  );
  renderNav();
});

/* ---------------------------------------------------------------- Boot */

function boot() {
  document.getElementById('marca').append(dynamickLogo({ variant: 'compact', animated: false }));

  getState();
  applyPreferences();

  // Falha de gravação vira aviso visível, não silêncio.
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

  // Duas abas do mesmo navegador não se sobrescrevem em silêncio.
  watchOtherTabs(() => {
    applyPreferences();
    toast('Seus dados foram atualizados em outra aba.', 'info');
  });

  subscribe(() => applyPreferences());

  start();
}

boot();

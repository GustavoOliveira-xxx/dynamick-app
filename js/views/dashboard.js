/**
 * Início — a tela principal de retorno.
 * Uma recomendação principal. Outras opções existem, mas não competem visualmente.
 */

import { el, render } from '../core/dom.js';
import { badge, card, button, linkButton, emptyState, message, progress } from '../ui/components.js';
import { formatMinutes, relativeDays, WEEKDAYS } from '../core/format.js';
import { SESSION_KIND_LABELS } from '../engine/domain.js';
import { getState } from '../core/store.js';
import {
  activeProfile,
  alternativeRecommendations,
  currentPlan,
  mainRecommendation,
  pendingReviews,
  rebuildPlan,
  student,
} from '../core/student.js';
import { createTopicSession, resumableSession, summarizeSession } from '../core/sessions.js';
import { navigate } from '../core/router.js';
import { rubikCube } from '../ui/rubik-cube.js';

export function renderDashboard(root) {
  const s = student();
  // O cubo é a peça de identidade do início: está aqui toda vez, e é mexível.
  const cube = rubikCube({ size: 'md' });
  const profile = activeProfile();
  const direction = profile.personalization.dashboardDirection;

  const recommendation = mainRecommendation();
  const alternatives = alternativeRecommendations(3);
  const resumable = resumableSession();
  const due = pendingReviews();
  const plan = currentPlan() ?? rebuildPlan();

  const state = getState();
  const lastSession = Object.values(state.sessions)
    .filter((session) => session.status === 'completed')
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];
  const lastSummary = lastSession ? summarizeSession(lastSession.id) : null;

  const weekDone = plan?.blocks.filter((block) => block.status === 'done').length ?? 0;
  const weekTotal = plan?.blocks.length ?? 0;

  const needsOnboarding = s.onboardingStatus === 'skipped' || s.onboardingStatus === 'not_started';
  const firstName = (s.name || '').split(' ')[0];

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header dashboard-hero' },
        el(
          'div',
          { class: 'dashboard-hero__text' },
          el(
            'div',
            { class: 'view-header__row' },
            el(
              'div',
              {},
              el('h1', {}, firstName ? `Olá, ${firstName}` : 'Seu início'),
              el(
                'p',
                { class: 'small secondary' },
                profile.description,
                ' ',
                el('a', { href: '#/perfil/estudo' }, 'Ver meu perfil de estudo'),
              ),
            ),
            s.provisional ? badge('Perfil provisório', 'warning') : null,
          ),
        ),
        el(
          'div',
          { class: 'dashboard-hero__cube' },
          cube,
        ),
      ),

      needsOnboarding
        ? message(
            'info',
            'Complete seu perfil quando quiser',
            el('p', {}, 'Sem as suas respostas, as recomendações ficam genéricas. São 3 perguntas obrigatórias, cerca de 2 minutos.'),
            el('p', { style: { marginTop: '0.5rem' } }, el('a', { href: '#/onboarding' }, 'Completar meu perfil de estudo')),
          )
        : null,

      // Sessão interrompida tem prioridade sobre qualquer recomendação nova.
      resumable
        ? card(
            { pad: 'lg' },
            el(
              'div',
              { class: 'row row--between' },
              el(
                'div',
                {},
                badge('Sessão em andamento', 'teal'),
                el('h2', { style: { marginTop: '0.5rem' } }, resumable.title),
                el(
                  'p',
                  { class: 'small secondary' },
                  `${resumable.items.filter((item) => item.status === 'answered').length} de ${resumable.items.length} questões respondidas · começou ${relativeDays(resumable.startedAt)}`,
                ),
              ),
              linkButton({ href: `#/sessao/${resumable.id}`, label: 'Retomar de onde parei' }),
            ),
          )
        : null,

      // Recomendação principal — uma só.
      recommendation
        ? card(
            { pad: 'lg' },
            el(
              'div',
              { class: 'row' },
              badge(direction === 'high' ? 'Sua próxima sessão' : 'Sugestão de hoje', 'green'),
              badge(SESSION_KIND_LABELS[recommendation.kind], 'teal'),
              badge(formatMinutes(recommendation.minutes), 'cyan'),
            ),
            el(
              'h2',
              { style: { marginTop: '1rem', fontSize: direction === 'high' ? '1.6rem' : '1.25rem' } },
              recommendation.topicName,
            ),
            el('p', { class: 'small muted' }, `${recommendation.questionCount} questões`),
            // Justificativa legível — sempre presente.
            el(
              'p',
              { class: 'reading secondary', style: { marginTop: '1rem' } },
              el('strong', { style: { color: 'var(--ck-text)' } }, 'Por que isso agora: '),
              recommendation.reason,
            ),
            el(
              'div',
              { class: 'row', style: { marginTop: '1.5rem' } },
              button({
                label: 'Começar sessão recomendada',
                size: direction === 'high' ? 'lg' : 'md',
                onClick: (event) => startSession(event.currentTarget, recommendation.topicSlug, recommendation.kind),
              }),
              linkButton({
                href: `#/conteudos/${recommendation.topicSlug}`,
                label: 'Ver o tópico antes',
                variant: 'ghost',
                size: 'sm',
              }),
            ),
          )
        : emptyState({
            title: 'Ainda não temos o que recomendar',
            description: 'Escolha um assunto no mapa de conteúdos para a gente começar a entender como você estuda.',
            actionLabel: 'Explorar conteúdos',
            actionHref: '#/conteudos',
          }),

      // As três entradas
      el(
        'section',
        { 'aria-labelledby': 'entradas' },
        el('h2', { id: 'entradas', class: 'sr-only' }, 'Como você quer estudar'),
        el(
          'div',
          { class: 'grid-3' },
          [
            { href: '#/praticar', title: 'Continuar meu plano', hint: 'Seguir a sequência da semana' },
            { href: '#/conteudos', title: 'Escolher um assunto', hint: 'Ver o mapa completo' },
            { href: '#/praticar/rapido', title: 'Tenho pouco tempo', hint: 'Sessão de 10 minutos' },
          ].map((entry) =>
            el(
              'a',
              { class: 'card-link', href: entry.href },
              card(
                { interactive: true },
                el('p', { style: { fontWeight: '500' } }, entry.title),
                el('p', { class: 'small muted', style: { marginTop: '0.25rem' } }, entry.hint),
              ),
            ),
          ),
        ),
      ),

      el(
        'div',
        { class: 'grid-2' },
        card(
          { pad: 'md' },
          el('h2', {}, 'Revisão'),
          due.length > 0
            ? el(
                'div',
                {},
                el('p', { class: 'small secondary', style: { marginTop: '0.5rem' } },
                  `Você tem ${due.length} item(ns) no ponto de revisar. Cada um vem com uma questão diferente da original.`),
                el('div', { style: { marginTop: '1rem' } },
                  linkButton({ href: '#/revisar', label: 'Revisar agora', variant: 'secondary', size: 'sm' })),
              )
            : el('p', { class: 'small secondary', style: { marginTop: '0.5rem' } },
                'Nada pendente agora. Quando você errar algo, ele volta aqui no momento certo.'),
        ),

        card(
          { pad: 'md' },
          el('h2', {}, 'Sua semana'),
          weekTotal > 0
            ? el(
                'div',
                { class: 'stack stack--sm', style: { marginTop: '0.75rem' } },
                progress({ value: weekDone, max: weekTotal, label: `Progresso da semana: ${weekDone} de ${weekTotal} blocos` }),
                el('p', { class: 'small secondary' },
                  `${weekDone} de ${weekTotal} blocos concluídos. Se perder um dia, o plano se ajusta — sem cobrança.`),
                el(
                  'ul',
                  { class: 'row list-reset', style: { gap: '0.4rem' } },
                  plan.blocks.map((block) =>
                    el('li', {}, badge(`${WEEKDAYS[block.dayOfWeek]} · ${SESSION_KIND_LABELS[block.kind]}`,
                      block.status === 'done' ? 'green' : 'neutral')),
                  ),
                ),
              )
            : el('p', { class: 'small secondary', style: { marginTop: '0.5rem' } },
                'Seu plano da semana aparece aqui depois da primeira sessão.'),
        ),
      ),

      lastSession && lastSummary
        ? card(
            { pad: 'md' },
            el('h2', {}, 'Última sessão'),
            el('p', { class: 'small secondary', style: { marginTop: '0.5rem' } },
              `${lastSession.title} · ${relativeDays(lastSession.completedAt)} · ${lastSummary.correct} de ${lastSummary.answered} corretas`),
            el('p', { style: { marginTop: '0.75rem' } },
              el('a', { class: 'small', href: `#/sessao/${lastSession.id}/resultado` }, 'Ver o resumo completo')),
          )
        : null,

      // Alternativas — discretas, não competem com a principal.
      alternatives.length > 0
        ? el(
            'section',
            { 'aria-labelledby': 'outras' },
            el('h2', { id: 'outras', class: 'eyebrow' }, 'Outras opções, se preferir'),
            el(
              'ul',
              { class: 'grid-3 list-reset', style: { marginTop: '0.75rem' } },
              alternatives.map((item) =>
                el(
                  'li',
                  {},
                  el(
                    'a',
                    { class: 'card-link', href: `#/conteudos/${item.topicSlug}` },
                    card(
                      { interactive: true },
                      el('p', { style: { fontWeight: '500' } }, item.topicName),
                      el('p', { class: 'xsmall secondary', style: { marginTop: '0.5rem' } }, item.reason),
                    ),
                  ),
                ),
              ),
            ),
          )
        : null,
    ),
  );

  // O roteador chama isto ao sair da tela: sem esta linha o cubo continuaria
  // animando em segundo plano e segurando ouvintes de ponteiro.
  return () => cube.dispose?.();
}

/** Inicia a sessão. O botão fica desabilitado enquanto trabalha — sem clique duplo. */
export function startSession(triggerButton, topicSlug, kind) {
  import('../ui/components.js').then(({ setButtonLoading }) => {
    setButtonLoading(triggerButton, true, 'Preparando sua sessão…');

    const session = createTopicSession(topicSlug, kind);
    if (!session) {
      setButtonLoading(triggerButton, false);
      import('../ui/components.js').then(({ toast }) =>
        toast('Este tópico ainda não tem questões suficientes.', 'danger'),
      );
      return;
    }
    navigate(`/sessao/${session.id}`);
  });
}

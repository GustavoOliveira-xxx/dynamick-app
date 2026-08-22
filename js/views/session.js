/**
 * Resolução de questões e resultado.
 *
 * Garantias implementadas aqui:
 *  - a alternativa correta nunca aparece antes do envio;
 *  - a primeira resposta é preservada mesmo se o estudante trocar;
 *  - o cronômetro para ao responder e não continua depois;
 *  - fim do tempo envia UMA vez;
 *  - marcar, anotar e pausar não perdem o estado.
 */

import { el, render } from '../core/dom.js';
import { navigate } from '../core/router.js';
import { badge, button, card, emptyState, linkButton, message, progress, toast } from '../ui/components.js';
import { markdown } from '../core/markdown.js';
import { formatMinutes, formatSeconds, percent } from '../core/format.js';
import {
  CONFIDENCE_ANSWERS,
  CONFIDENCE_LABELS,
  DIFFICULTY_LABELS,
  ERROR_REASONS,
  ERROR_REASON_LABELS,
  NEXT_ACTION_LABELS,
  REPORT_KINDS,
  REPORT_KIND_LABELS,
} from '../engine/domain.js';
import { getQuestion } from '../data/content.js';
import { getState, update } from '../core/store.js';
import {
  answerQuestion,
  attemptFor,
  classifyError,
  completeSession,
  getSession,
  pauseSession,
  saveItemNote,
  setSessionIndex,
  submitSimulation,
  summarizeSession,
  toggleFlag,
} from '../core/sessions.js';
import { addErrorNote, mainRecommendation } from '../core/student.js';

export function renderSession(root, { params, query }) {
  const session = getSession(params.id);
  if (!session) {
    render(root, emptyState({
      title: 'Sessão não encontrada',
      description: 'Ela pode ter sido concluída ou o endereço está desatualizado.',
      actionLabel: 'Voltar ao início',
      actionHref: '#/inicio',
    }));
    return;
  }

  if (session.status === 'completed') {
    navigate(`/sessao/${session.id}/resultado`, { replace: true });
    return;
  }

  const answered = session.items.filter((item) => item.status === 'answered').length;
  const started = query.get('comecar') === 'sim' || answered > 0 || session.status === 'paused';

  if (!started) {
    renderPreparation(root, session);
    return;
  }

  return renderRunner(root, session);
}

/* ---------------------------------------------------------------- Preparação */

function renderPreparation(root, session) {
  const questions = session.items.map((item) => getQuestion(item.questionSlug)).filter(Boolean);
  const topics = [...new Set(questions.map((question) => question.topicName))];
  const level = questions.some((q) => q.difficulty === 'challenging')
    ? 'challenging'
    : questions.some((q) => q.difficulty === 'intermediate')
      ? 'intermediate'
      : 'intro';

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg session-shell ck-enter' },
      el('div', {}, badge('Antes de começar', 'teal'), el('h1', { style: { marginTop: '0.75rem' } }, session.title)),

      card(
        { pad: 'lg' },
        el(
          'dl',
          { class: 'def-list' },
          el('div', {}, el('dt', {}, 'Duração estimada'), el('dd', {}, formatMinutes(session.plannedMinutes))),
          el('div', {}, el('dt', {}, 'Questões'), el('dd', {}, String(session.items.length))),
          el('div', {}, el('dt', {}, 'Nível aproximado'), el('dd', {}, DIFFICULTY_LABELS[level])),
          el(
            'div',
            {},
            el('dt', {}, 'Modo'),
            el('dd', {}, session.mode === 'learning' ? 'Aprendizagem' : 'Simulado'),
            el('p', { class: 'xsmall muted', style: { marginTop: '0.25rem' } },
              session.mode === 'learning'
                ? 'A correção aparece depois de cada questão.'
                : 'O resultado aparece apenas ao final.'),
          ),
        ),

        el('hr', { class: 'hairline' }),

        el('p', { class: 'eyebrow' }, 'Conteúdo praticado'),
        el('ul', { class: 'row list-reset', style: { marginTop: '0.5rem' } },
          topics.map((topic) => el('li', {}, badge(topic, 'cyan')))),

        session.reason
          ? el(
              'div',
              { style: { marginTop: '1.25rem' } },
              el('p', { class: 'eyebrow' }, 'Por que esta seleção'),
              el('p', { class: 'small secondary reading', style: { marginTop: '0.35rem' } }, session.reason),
            )
          : null,
      ),

      el(
        'div',
        { class: 'row' },
        linkButton({ href: `#/sessao/${session.id}?comecar=sim`, label: 'Começar', size: 'lg' }),
        el('a', { class: 'small secondary', href: '#/inicio' }, 'Agora não'),
      ),

      el('p', { class: 'xsmall muted' },
        'Você pode pausar a qualquer momento. Nada do que já respondeu se perde.'),
    ),
  );
}

/* ---------------------------------------------------------------- Resolução */

function renderRunner(root, session) {
  const prefs = getState().preferences;
  let index = Math.min(Math.max(0, session.currentIndex), Math.max(0, session.items.length - 1));

  let questionStart = Date.now();
  let elapsed = 0;
  let totalElapsed = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000);
  let timeExpired = false;
  let submitting = false;

  const timerNode = el('span', { class: 'timer' });
  const limitNode = el('span', {});
  const container = el('div', { class: 'stack stack--lg session-shell' });
  render(root, container);

  const ticker = window.setInterval(tick, 1000);

  function currentItem() {
    return session.items[index];
  }

  function isAnswered() {
    const item = currentItem();
    return item ? Boolean(attemptFor(session.id, item.questionSlug)) : false;
  }

  function tick() {
    totalElapsed = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000);

    // O cronômetro da questão PARA quando ela é respondida.
    if (!isAnswered()) {
      elapsed = Math.floor((Date.now() - questionStart) / 1000);
      timerNode.textContent = formatSeconds(elapsed);
      timerNode.setAttribute('aria-label', `Tempo nesta questão: ${formatSeconds(elapsed)}`);
    }

    if (session.timeLimitSeconds) {
      const remaining = Math.max(0, session.timeLimitSeconds - totalElapsed);
      render(limitNode, badge(`Restam ${formatSeconds(remaining)}`, remaining < 60 ? 'warning' : 'neutral'));

      // Fim do tempo: envia UMA vez. O guard impede o envio duplicado.
      if (remaining === 0 && !timeExpired) {
        timeExpired = true;
        window.clearInterval(ticker);
        toast('O tempo acabou. Suas respostas foram enviadas automaticamente.', 'warning', 8000);
        finish();
      }
    }
  }

  function goTo(next) {
    index = Math.min(Math.max(0, next), session.items.length - 1);
    setSessionIndex(session.id, index);
    questionStart = Date.now();
    elapsed = 0;
    paint();
  }

  function finish() {
    if (submitting) return;
    submitting = true;
    window.clearInterval(ticker);

    if (session.simulationSlug) {
      const run = submitSimulation(session.id);
      navigate(run ? `/simulados/resultado/${run.id}` : `/sessao/${session.id}/resultado`);
      return;
    }
    completeSession(session.id);
    navigate(`/sessao/${session.id}/resultado`);
  }

  function paint() {
    const item = currentItem();
    if (!item) {
      render(container, message('warning', null, el('p', {}, 'Esta sessão não tem questões disponíveis.')));
      return;
    }

    const question = getQuestion(item.questionSlug);
    const attempt = attemptFor(session.id, item.questionSlug);
    const answered = Boolean(attempt);
    const learning = session.mode === 'learning';
    const answeredCount = session.items.filter(
      (entry) => attemptFor(session.id, entry.questionSlug),
    ).length;
    const isLast = index >= session.items.length - 1;

    let selected = attempt?.answer ?? null;
    let confidence = attempt?.confidence ?? '';

    const optionsRegion = el('div', { class: 'question__options' });
    const feedbackRegion = el('div', {});
    const noteRegion = el('div', {});

    function paintOptions() {
      render(
        optionsRegion,
        el(
          'fieldset',
          { disabled: answered && learning ? true : undefined },
          el('legend', { class: 'sr-only' }, 'Alternativas'),
          el(
            'div',
            { class: 'stack stack--sm' },
            question.options.map((option) => {
              const isSelected = selected === option.label;
              // A correção só é revelada DEPOIS de responder, e só em modo aprendizagem.
              const revealed = answered && learning;
              const showCorrect = revealed && option.isCorrect;
              const showWrong = revealed && isSelected && !option.isCorrect;

              return el(
                'label',
                {
                  class: `option${showCorrect ? ' option--correct' : showWrong ? ' option--wrong' : ''}`,
                },
                el('input', {
                  type: 'radio',
                  name: `q-${question.slug}`,
                  value: option.label,
                  checked: isSelected || undefined,
                  onChange: () => {
                    selected = option.label;
                    paintActions();
                  },
                }),
                el(
                  'span',
                  { class: 'option__body' },
                  el('span', {}, el('strong', {}, `${option.label}) `), option.text),
                  showCorrect
                    ? el('span', { class: 'option__verdict option__verdict--correct' }, '✓ Alternativa correta')
                    : null,
                  showWrong
                    ? el('span', { class: 'option__verdict option__verdict--wrong' }, '✗ Foi a sua resposta')
                    : null,
                ),
              );
            }),
          ),
        ),
      );
    }

    const actionsRegion = el('div', { class: 'stack stack--sm', style: { marginTop: '1.25rem' } });

    function paintActions() {
      const children = [];

      if (prefs.confidencePrompt && !answered) {
        children.push(
          el(
            'fieldset',
            {},
            el('legend', { class: 'small secondary', style: { marginBottom: '0.5rem' } },
              'Antes de enviar: qual é a sua confiança nesta resposta? (opcional)'),
            el(
              'div',
              { class: 'row' },
              CONFIDENCE_ANSWERS.map((value) =>
                el(
                  'label',
                  { class: 'chip' },
                  el('input', {
                    type: 'radio',
                    name: `conf-${question.slug}`,
                    value,
                    checked: confidence === value || undefined,
                    onChange: () => { confidence = value; },
                  }),
                  CONFIDENCE_LABELS[value],
                ),
              ),
            ),
          ),
        );
      }

      if (!answered) {
        children.push(
          button({
            label: learning ? 'Responder' : 'Registrar e avançar',
            size: 'lg',
            disabled: !selected,
            onClick: () => {
              if (!selected) return;
              answerQuestion({
                sessionId: session.id,
                questionSlug: question.slug,
                optionLabel: selected,
                confidence: confidence || null,
                timeSpentMs: elapsed * 1000,
              });
              // Recarrega o estado da sessão para refletir a resposta.
              Object.assign(session, getSession(session.id));
              paint();
            },
          }),
        );
      } else if (!learning) {
        children.push(
          el('p', { class: 'small secondary' }, 'Resposta registrada. Você pode alterá-la até enviar a sessão.'),
          button({
            label: 'Atualizar minha resposta',
            variant: 'secondary',
            size: 'sm',
            disabled: !selected || selected === attempt.answer,
            onClick: () => {
              answerQuestion({
                sessionId: session.id,
                questionSlug: question.slug,
                optionLabel: selected,
                confidence: confidence || null,
                timeSpentMs: elapsed * 1000,
              });
              Object.assign(session, getSession(session.id));
              paint();
            },
          }),
        );
      }

      render(actionsRegion, ...children);
    }

    paintOptions();
    paintActions();

    if (answered && learning) {
      render(feedbackRegion, correctionCard(session, question, attempt, () => {
        Object.assign(session, getSession(session.id));
        paint();
      }));
    }

    render(
      container,

      el(
        'div',
        { class: 'stack stack--sm' },
        el(
          'div',
          { class: 'session-bar' },
          el('p', { class: 'small secondary' }, session.title),
          el(
            'div',
            { class: 'row', style: { gap: '0.5rem' } },
            prefs.showTimer && !answered ? timerNode : null,
            session.timeLimitSeconds ? limitNode : null,
            badge(`${index + 1} de ${session.items.length}`),
          ),
        ),
        progress({
          value: answeredCount,
          max: session.items.length,
          label: `${answeredCount} de ${session.items.length} questões respondidas`,
          size: 'sm',
        }),
      ),

      el('h1', { class: 'sr-only' }, `${session.title} — questão ${index + 1}`),

      card(
        { pad: 'lg', tag: 'article' },
        el(
          'div',
          { class: 'row' },
          badge(question.topicName, 'cyan'),
          badge(DIFFICULTY_LABELS[question.difficulty]),
          item.flagged ? badge('Marcada para revisar', 'warning') : null,
        ),
        question.support ? el('p', { class: 'question__support' }, question.support) : null,
        el('div', { class: 'question__stem reading' }, question.stem),
        optionsRegion,
        actionsRegion,
      ),

      feedbackRegion,

      el(
        'div',
        { class: 'session-controls' },
        button({ label: '← Anterior', variant: 'ghost', size: 'sm', disabled: index === 0, onClick: () => goTo(index - 1) }),
        !isLast ? button({ label: 'Próxima →', variant: 'secondary', size: 'sm', onClick: () => goTo(index + 1) }) : null,
        button({
          label: item.flagged ? 'Desmarcar' : 'Marcar para revisar depois',
          variant: 'ghost',
          size: 'sm',
          onClick: () => {
            toggleFlag(session.id, item.questionSlug);
            Object.assign(session, getSession(session.id));
            paint();
          },
        }),
        button({
          label: item.note ? 'Editar minha dúvida' : 'Anotar uma dúvida',
          variant: 'ghost',
          size: 'sm',
          onClick: () => paintNote(true),
        }),
        el(
          'div',
          { class: 'session-controls__end' },
          button({
            label: 'Pausar e sair',
            variant: 'ghost',
            size: 'sm',
            onClick: () => {
              window.clearInterval(ticker);
              pauseSession(session.id);
              navigate('/inicio');
            },
          }),
        ),
      ),

      noteRegion,

      isLast || answeredCount === session.items.length
        ? button({
            label:
              answeredCount === session.items.length
                ? session.simulationSlug
                  ? 'Enviar simulado e ver a análise'
                  : 'Concluir sessão e ver o resumo'
                : `Encerrar mesmo com ${session.items.length - answeredCount} questão(ões) em branco`,
            size: 'lg',
            block: true,
            onClick: finish,
          })
        : null,
    );

    function paintNote(open) {
      if (!open) {
        render(noteRegion);
        return;
      }
      const textarea = el('textarea', {
        class: 'textarea',
        rows: 3,
        maxlength: 1000,
        placeholder: 'Ex.: não entendi por que a alternativa C está errada.',
      }, item.note ?? '');

      render(
        noteRegion,
        card(
          { pad: 'md' },
          el('div', { class: 'field' },
            el('label', { class: 'field__label' }, 'O que ficou confuso aqui?'),
            textarea),
          el(
            'div',
            { class: 'row', style: { marginTop: '0.75rem' } },
            button({
              label: 'Salvar anotação',
              size: 'sm',
              onClick: () => {
                saveItemNote(session.id, item.questionSlug, textarea.value.trim());
                Object.assign(session, getSession(session.id));
                toast('Anotação salva.', 'success');
                paint();
              },
            }),
            button({ label: 'Cancelar', variant: 'ghost', size: 'sm', onClick: () => paintNote(false) }),
          ),
        ),
      );
    }
  }

  paint();
  tick();

  // Limpeza ao sair da tela: sem isso o cronômetro continuaria rodando.
  return () => window.clearInterval(ticker);
}

/* ---------------------------------------------------------------- Correção */

function correctionCard(session, question, attempt, onChange) {
  const correct = question.options.find((option) => option.isCorrect);
  const chosen = question.options.find((option) => option.label === attempt.answer);
  const isCorrect = attempt.isCorrect;

  let showDistractors = !isCorrect;
  let reason = attempt.errorReason ?? '';

  const distractorsRegion = el('div', {});
  const reasonRegion = el('div', {});
  const reportRegion = el('div', { style: { marginTop: '1rem' } });

  function paintDistractors() {
    render(
      distractorsRegion,
      showDistractors
        ? el(
            'ul',
            { class: 'correction__distractors list-reset' },
            question.options.map((option) =>
              el(
                'li',
                { class: `correction__distractor${option.isCorrect ? ' correction__distractor--correct' : ''}` },
                el(
                  'p',
                  { style: { fontWeight: '500' } },
                  `${option.label}) `,
                  option.isCorrect
                    ? el('span', { style: { color: 'var(--ck-success)' } }, 'correta')
                    : el('span', { class: 'muted' }, 'incorreta'),
                  option.label === attempt.answer ? el('span', { class: 'muted' }, ' · sua resposta') : null,
                ),
                el('div', { class: 'secondary', style: { marginTop: '0.25rem' } }, markdown(option.rationale)),
              ),
            ),
          )
        : null,
    );
  }

  function paintReason() {
    if (isCorrect) {
      render(reasonRegion);
      return;
    }
    render(
      reasonRegion,
      el(
        'form',
        {
          style: { marginTop: '1.5rem', borderTop: '1px solid var(--ck-line)', paddingTop: '1.25rem' },
          onSubmit: (event) => {
            event.preventDefault();
            if (!reason) return;
            classifyError(attempt.id, reason);
            toast('Registrado. Esta questão entrou na sua fila de revisão.', 'success');
            onChange();
          },
        },
        el(
          'fieldset',
          {},
          el('legend', { class: 'field__label' },
            question.explanation?.reflectionPrompt ?? 'O que dificultou esta questão?'),
          el('p', { class: 'xsmall muted', style: { marginTop: '0.25rem' } },
            'Isso define o que a plataforma vai te oferecer em seguida.'),
          el(
            'div',
            { class: 'row', style: { marginTop: '0.75rem' } },
            ERROR_REASONS.map((value) =>
              el(
                'label',
                { class: 'chip' },
                el('input', {
                  type: 'radio',
                  name: `reason-${question.slug}`,
                  value,
                  checked: reason === value || undefined,
                  onChange: () => { reason = value; },
                }),
                ERROR_REASON_LABELS[value],
              ),
            ),
          ),
          button({
            label: attempt.errorReason ? 'Atualizar motivo' : 'Registrar motivo',
            type: 'submit',
            size: 'sm',
            variant: 'secondary',
          }),
          attempt.errorReason
            ? el('p', { class: 'xsmall', style: { marginTop: '0.5rem', color: 'var(--ck-success)' } },
                '✓ Registrado. Esta questão está na sua fila de revisão.')
            : null,
        ),
      ),
    );
  }

  paintDistractors();
  paintReason();
  render(reportRegion, reportButton(question.slug));

  return card(
    {
      pad: 'lg',
      class: `correction ck-enter${isCorrect ? '' : ' correction--wrong'}`,
      tag: 'section',
      'aria-label': 'Correção da questão',
    },

    el(
      'div',
      { class: 'row' },
      isCorrect ? badge('Resposta correta', 'green', '✓') : badge('Vamos entender essa', 'danger', '•'),
      attempt.changedAnswer ? badge('Você mudou de alternativa', 'warning') : null,
      badge(question.topicName, 'cyan'),
      question.skillName ? badge(question.skillName, 'teal') : null,
    ),

    !isCorrect && chosen && correct
      ? el('p', { class: 'small secondary', style: { marginTop: '1rem' } },
          'Você marcou ', el('strong', {}, chosen.label), '. A correta é ',
          el('strong', { style: { color: 'var(--ck-success)' } }, correct.label), '.')
      : null,

    question.explanation
      ? el(
          'div',
          { class: 'stack stack--sm reading', style: { marginTop: '1rem' } },
          markdown(question.explanation.summary),
          question.explanation.detailed
            ? el(
                'details',
                { class: 'correction__block' },
                el('summary', { style: { fontWeight: '500' } }, 'Quero entender melhor'),
                el('div', { style: { marginTop: '0.5rem' } }, markdown(question.explanation.detailed)),
              )
            : null,
          question.explanation.strategy
            ? el(
                'div',
                { class: 'correction__block' },
                el('p', { class: 'eyebrow' }, 'Estratégia'),
                el('div', { style: { marginTop: '0.25rem' } }, markdown(question.explanation.strategy)),
              )
            : null,
          question.explanation.conceptRecap
            ? el('div', { class: 'correction__block' }, markdown(question.explanation.conceptRecap))
            : null,
        )
      : null,

    el(
      'div',
      { style: { marginTop: '1.25rem' } },
      button({
        label: `${showDistractors ? 'Ocultar' : 'Ver'} a análise de cada alternativa`,
        variant: 'ghost',
        size: 'sm',
        onClick: (event) => {
          showDistractors = !showDistractors;
          event.currentTarget.querySelector('.btn__label').textContent =
            `${showDistractors ? 'Ocultar' : 'Ver'} a análise de cada alternativa`;
          paintDistractors();
        },
      }),
      distractorsRegion,
    ),

    reasonRegion,

    // Ações curtas depois da explicação
    el(
      'div',
      { class: 'correction__actions' },
      el('a', { class: 'btn btn--secondary btn--sm', href: `#/conteudos/${question.topicSlug}` },
        el('span', { class: 'btn__label' }, 'Revisar o conceito')),
      button({
        label: 'Salvar no caderno de erros',
        variant: 'secondary',
        size: 'sm',
        onClick: () => {
          addErrorNote({ questionSlug: question.slug, nextAction: 'similar_question' });
          toast('Salvo no caderno de erros.', 'success');
        },
      }),
      button({
        label: NEXT_ACTION_LABELS.self_explain,
        variant: 'ghost',
        size: 'sm',
        onClick: () => {
          addErrorNote({ questionSlug: question.slug, nextAction: 'self_explain' });
          toast('Adicionado ao caderno com a ação "explicar com minhas palavras".', 'success');
        },
      }),
    ),

    reportRegion,
  );
}

/** Denúncia de problema na questão, feita pelo estudante. */
function reportButton(questionSlug) {
  const wrapper = el('div', {});
  let open = false;
  let kind = '';

  function paint() {
    if (!open) {
      render(
        wrapper,
        button({
          label: 'Relatar um problema nesta questão',
          variant: 'ghost',
          size: 'sm',
          onClick: () => { open = true; paint(); },
        }),
      );
      return;
    }

    const messageField = el('textarea', {
      class: 'textarea',
      rows: 2,
      maxlength: 1000,
      required: true,
      placeholder: 'Ex.: a alternativa C também parece correta segundo o enunciado.',
    });

    render(
      wrapper,
      el(
        'form',
        {
          class: 'card card--pad stack stack--sm',
          onSubmit: (event) => {
            event.preventDefault();
            if (!kind || messageField.value.trim().length < 5) return;
            update((state) => {
              state.reports.push({
                id: `rep_${Date.now()}`,
                questionSlug,
                kind,
                message: messageField.value.trim(),
                status: 'open',
                createdAt: new Date().toISOString(),
              });
            }, { immediate: true });
            open = false;
            toast('Obrigado. O relato ficou registrado em Saúde do conteúdo.', 'success');
            paint();
          },
        },
        el(
          'fieldset',
          {},
          el('legend', { class: 'field__label' }, 'Qual é o problema?'),
          el(
            'div',
            { class: 'row', style: { marginTop: '0.5rem' } },
            REPORT_KINDS.map((value) =>
              el(
                'label',
                { class: 'chip' },
                el('input', {
                  type: 'radio',
                  name: `report-${questionSlug}`,
                  value,
                  onChange: () => { kind = value; },
                }),
                REPORT_KIND_LABELS[value],
              ),
            ),
          ),
        ),
        el('div', { class: 'field' },
          el('label', { class: 'field__label' }, 'Conte em uma frase'),
          messageField),
        el(
          'div',
          { class: 'row' },
          button({ label: 'Registrar', type: 'submit', size: 'sm' }),
          button({ label: 'Cancelar', variant: 'ghost', size: 'sm', onClick: () => { open = false; paint(); } }),
        ),
      ),
    );
  }

  paint();
  return wrapper;
}

/* ---------------------------------------------------------------- Resultado */

export function renderSessionResult(root, { params }) {
  const session = getSession(params.id);
  if (!session) {
    render(root, emptyState({
      title: 'Sessão não encontrada',
      description: 'Talvez o endereço esteja desatualizado.',
      actionLabel: 'Voltar ao início',
      actionHref: '#/inicio',
    }));
    return;
  }

  const summary = summarizeSession(session.id);
  const recommendation = mainRecommendation();
  const accuracy = percent(summary.correct, Math.max(1, summary.answered));

  const previous = Object.values(getState().sessions)
    .filter((item) => item.status === 'completed' && item.id !== session.id && item.completedAt)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 3)
    .map((item) => summarizeSession(item.id))
    .filter((item) => item && item.answered > 0);

  const previousAccuracy = previous.length
    ? Math.round(previous.reduce((sum, item) => sum + (item.correct / item.answered) * 100, 0) / previous.length)
    : null;
  const evolution = previousAccuracy === null ? null : accuracy - previousAccuracy;

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg session-shell ck-enter' },

      el(
        'div',
        {},
        badge('Sessão concluída', 'green'),
        el('h1', { style: { marginTop: '0.75rem' } }, session.title),
        el('p', { class: 'small secondary' },
          `${summary.answered} de ${summary.total} questões respondidas em ${formatSeconds(Math.round(summary.totalTimeMs / 1000))}.`),
      ),

      card(
        { pad: 'lg' },
        progress({
          value: summary.correct,
          max: Math.max(1, summary.answered),
          label: `${summary.correct} acertos de ${summary.answered}`,
        }),
        el('p', { class: 'small secondary', style: { marginTop: '0.75rem' } },
          `${summary.correct} acerto(s) e ${summary.wrong} erro(s).`),

        // A diferenciação exigida no encerramento da sessão.
        summary.correct > 0
          ? el(
              'ul',
              { class: 'plain-list secondary', style: { marginTop: '1rem' } },
              summary.correctWithConfidence > 0
                ? el('li', {}, el('strong', {}, String(summary.correctWithConfidence)), ' acertou com confiança')
                : null,
              summary.correctWithDoubt > 0
                ? el('li', {}, el('strong', {}, String(summary.correctWithDoubt)), ' acertou com dúvida — vale voltar nesses')
                : null,
              summary.correctAfterChange > 0
                ? el('li', {}, el('strong', {}, String(summary.correctAfterChange)), ' acertou depois de mudar de alternativa')
                : null,
            )
          : null,

        evolution !== null
          ? el('p', { class: 'small secondary', style: { marginTop: '1rem' } },
              evolution > 3
                ? `Melhor que a média das suas últimas sessões (${previousAccuracy}%).`
                : evolution < -3
                  ? `Abaixo da média das suas últimas sessões (${previousAccuracy}%). Isso acontece — o conteúdo pode ter sido mais difícil.`
                  : `Em linha com as suas últimas sessões (${previousAccuracy}%).`)
          : null,
      ),

      el(
        'div',
        { class: 'grid-2' },
        card(
          { pad: 'md' },
          el('h2', {}, 'Tópicos praticados'),
          el(
            'ul',
            { class: 'stack stack--sm list-reset', style: { marginTop: '0.75rem' } },
            summary.topics.map((topic) =>
              el('li', { class: 'row row--between' },
                el('span', { class: 'small' }, topic.name),
                badge(`${topic.correct}/${topic.total}`, topic.correct === topic.total ? 'green' : 'neutral')),
            ),
          ),
        ),
        card(
          { pad: 'md' },
          el('h2', {}, 'Onde a dificuldade apareceu'),
          summary.errorReasons.length > 0
            ? el(
                'ul',
                { class: 'stack stack--sm list-reset', style: { marginTop: '0.75rem' } },
                summary.errorReasons.map((entry) =>
                  el('li', { class: 'row row--between' },
                    el('span', { class: 'small' }, ERROR_REASON_LABELS[entry.reason] ?? entry.reason),
                    badge(`${entry.count}x`, 'warning')),
                ),
              )
            : el('p', { class: 'small secondary', style: { marginTop: '0.75rem' } },
                summary.wrong > 0
                  ? 'Você não registrou o motivo dos erros. Isso ajuda a plataforma a escolher o que oferecer em seguida.'
                  : 'Nenhum erro nesta sessão.'),
        ),
      ),

      summary.flagged > 0
        ? message('info', null, el('p', {},
            `Você marcou ${summary.flagged} questão(ões) para revisar depois. Elas estão na sua fila de revisão.`))
        : null,

      card(
        { pad: 'lg' },
        el('h2', {}, 'Próximo passo'),
        recommendation
          ? el(
              'div',
              {},
              el('p', { class: 'small secondary', style: { marginTop: '0.5rem' } }, recommendation.reason),
              el('p', { style: { marginTop: '0.75rem', fontWeight: '500' } }, recommendation.topicName),
            )
          : null,
        el(
          'div',
          { class: 'row', style: { marginTop: '1rem' } },
          linkButton({ href: '#/inicio', label: 'Ver no meu início' }),
          linkButton({ href: '#/revisar', label: 'Ir para a revisão', variant: 'secondary' }),
        ),
      ),

      el('p', { class: 'xsmall muted' },
        'Nenhum número aqui prevê sua nota no ENEM. ',
        el('a', { href: '#/perfil/relatorio' }, 'Ver meu progresso ao longo do tempo')),
    ),
  );
}

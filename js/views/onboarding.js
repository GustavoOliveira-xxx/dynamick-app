import { el, render } from '../core/dom.js';
import { navigate } from '../core/router.js';
import { badge, button, card, choiceGroup, linkButton, message, progress } from '../ui/components.js';
import {
  AREA_SELF_ASSESSMENT,
  MESSAGES,
  ONBOARDING_STEPS,
  REQUIRED_STEPS,
  SELF_ASSESSMENT_OPTIONS,
  firstIncompleteStep,
  getStep,
  nextStepSlug,
  previousStepSlug,
  stepIndex,
} from '../data/questionnaire.js';
import {
  confirmProfile,
  mainRecommendation,
  markStepCompleted,
  markStepSkipped,
  rebuildPlan,
  saveAnswer,
  skipOnboarding,
  student,
  syncProfile,
  updatePreferences,
} from '../core/student.js';
import { classifyProfile, describePersonalization, supportsFor } from '../engine/profile.js';
import { getProfile } from '../engine/profiles.js';
import { formatMinutes } from '../core/format.js';

export function renderOnboardingWelcome(root) {
  const s = student();

  const started = s.completedSteps.length > 0 || s.skippedSteps.length > 0;
  const resume = firstIncompleteStep(s.completedSteps, s.skippedSteps);
  if (started && resume) {
    navigate(`/onboarding/${resume}`, { replace: true });
    return;
  }
  if (s.onboardingStatus === 'completed') {
    navigate('/inicio', { replace: true });
    return;
  }

  const nameInput = el('input', {
    class: 'input',
    id: 'nome',
    value: s.name ?? '',
    placeholder: 'Como você quer ser chamado',
    maxlength: 60,
    autocomplete: 'given-name',
  });

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg ck-enter', style: { maxWidth: '46rem' } },
      el(
        'div',
        {},
        el('p', { class: 'eyebrow' }, 'Bem-vindo'),
        el('h1', {}, 'Vamos montar sua primeira semana'),
      ),

      message('info', 'Antes de começar', el('p', {}, MESSAGES.opening)),

      card(
        { pad: 'lg' },
        el('h2', {}, 'Como funciona'),
        el(
          'ul',
          { class: 'plain-list secondary' },
          el('li', {}, `São ${ONBOARDING_STEPS.length} etapas curtas. Só `, el('strong', {}, String(REQUIRED_STEPS.length)), ' são obrigatórias — levam cerca de 2 minutos.'),
          el('li', {}, 'Você pode pular as demais e responder depois em “Meu perfil de estudo”.'),
          el('li', {}, 'Cada resposta é salva na hora. Se sair no meio, volta exatamente onde parou.'),
          el('li', {}, 'Voltar para uma etapa anterior não apaga nada.'),
        ),
      ),

      card(
        { pad: 'lg' },
        el('div', { class: 'field' },
          el('label', { class: 'field__label', for: 'nome' }, 'Como podemos te chamar? (opcional)'),
          nameInput,
          el('p', { class: 'field__hint' }, 'Só para deixar a interface mais pessoal. Nada é enviado a lugar nenhum.'),
        ),
      ),

      el(
        'div',
        { class: 'row' },
        button({
          label: 'Começar',
          size: 'lg',
          onClick: () => {
            const name = nameInput.value.trim();
            if (name) {
              import('../core/store.js').then(({ update }) => {
                update((state) => { state.student.name = name; }, { immediate: true });
              });
            }
            navigate(`/onboarding/${ONBOARDING_STEPS[0].slug}`);
          },
        }),
        button({
          label: 'Pular por enquanto',
          variant: 'ghost',
          onClick: () => {
            skipOnboarding();
            rebuildPlan();
            navigate('/inicio');
          },
        }),
      ),
    ),
  );
}

export function renderOnboardingStep(root, { params }) {
  const step = getStep(params.etapa);
  if (!step) {
    navigate('/onboarding', { replace: true });
    return;
  }

  const s = student();
  const answers = { ...s.answers };
  const errors = {};
  const index = stepIndex(step.slug);
  const total = ONBOARDING_STEPS.length;
  const previous = previousStepSlug(step.slug);
  const resumed =
    (s.completedSteps.length > 0 || s.skippedSteps.length > 0) &&
    !s.completedSteps.includes(step.slug);

  const draft = {};
  for (const question of step.questions) draft[question.id] = answers[question.id];

  const errorRegion = el('div', { class: 'stack stack--sm' });
  const questionsRegion = el('div', { class: 'stack stack--lg' });

  function paintQuestions() {
    render(questionsRegion, ...step.questions.map((question) => renderQuestion(question)));
  }

  function renderQuestion(question) {

    if (question.dependsOn) {
      const source = draft[question.dependsOn];
      const selected = Array.isArray(source) ? source : [];
      if (selected.length === 0) return null;
      const sourceQuestion = step.questions.find((item) => item.id === question.dependsOn);
      const options = (sourceQuestion?.options ?? []).filter((option) => selected.includes(option.value));
      return choiceGroup({
        legend: question.prompt,
        hint: question.help,
        name: question.id,
        options,
        value: draft[question.id],
        error: errors[question.id],
        onChange: (value) => {
          draft[question.id] = value;
          saveAnswer(question.id, value);
        },
      });
    }

    if (question.type === 'scale-per-area') {
      return selfAssessmentGrid(question, draft, (value) => {
        draft[question.id] = value;
        saveAnswer(question.id, value);
      });
    }

    if (question.allowCustom) {
      return choiceWithCustom(question, draft, errors, (value) => {
        draft[question.id] = value;
        saveAnswer(question.id, value);
        paintQuestions();
      });
    }

    return choiceGroup({
      legend: question.prompt,
      hint: question.help,
      name: question.id,
      options: question.options ?? [],
      value: draft[question.id],
      multiple: question.type === 'multiple',
      variant: question.variant === 'chip' ? 'chip' : 'option',
      error: errors[question.id],
      onChange: (value) => {
        draft[question.id] = value;
        saveAnswer(question.id, value);

        if (question.type === 'multiple' || step.questions.some((q) => q.dependsOn === question.id)) {
          paintQuestions();
        }
      },
    });
  }

  function validate() {
    let ok = true;
    for (const key of Object.keys(errors)) delete errors[key];

    for (const question of step.questions) {
      if (!question.required) continue;
      const value = draft[question.id];
      const empty =
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);
      if (empty) {
        errors[question.id] =
          question.type === 'multiple'
            ? 'Escolha pelo menos uma opção para continuar.'
            : 'Escolha uma opção para continuar.';
        ok = false;
      }
    }
    return ok;
  }

  function submit() {
    if (!validate()) {
      paintQuestions();
      render(
        errorRegion,
        message('danger', 'Faltou responder', el('p', {}, 'Role a página e escolha uma opção nas perguntas marcadas.')),
      );

      questionsRegion.querySelector('[role="alert"]')?.scrollIntoView({ block: 'center' });
      return;
    }

    render(errorRegion);

    if (step.slug === 'conforto') {
      updatePreferences({
        theme: draft.theme ?? 'dark',
        textScale: draft.textScale ?? '100',
        reducedMotion: draft.reducedMotion ?? 'auto',
        highContrast: draft.highContrast === 'true',
        visualIntensity: draft.visualIntensity ?? 'full',
        remindersEnabled: draft.reminders === 'true',
      });
    }

    markStepCompleted(step.slug);
    syncProfile();

    const next = nextStepSlug(step.slug);
    navigate(next ? `/onboarding/${next}` : '/onboarding/perfil');
  }

  paintQuestions();

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg ck-enter', style: { maxWidth: '46rem' } },

      el(
        'div',
        { class: 'stack stack--sm' },
        el(
          'div',
          { class: 'row row--between' },
          el('p', { class: 'eyebrow' }, `Etapa ${step.letter} · ${step.title}`),
          el(
            'p',
            { class: 'xsmall muted', 'aria-live': 'polite' },
            `Etapa ${index + 1} de ${total} (${Math.round(((index + 1) / total) * 100)}%)`,
          ),
        ),
        progress({
          value: index + 1,
          max: total,
          label: `Progresso do onboarding: etapa ${index + 1} de ${total}`,
          size: 'sm',
        }),
      ),

      el('h1', { class: 'sr-only' }, `${step.title} — etapa ${index + 1} de ${total}`),

      resumed ? message('info', null, el('p', {}, MESSAGES.resumed)) : null,
      el('p', { class: 'secondary' }, step.intro),

      errorRegion,
      questionsRegion,

      el(
        'div',
        { class: 'row', style: { borderTop: '1px solid var(--ck-line)', paddingTop: '1.25rem' } },
        button({ label: 'Continuar', size: 'lg', onClick: submit }),
        previous
          ? el(
              'a',
              { class: 'btn btn--ghost', href: `#/onboarding/${previous}` },
              el('span', { class: 'btn__label' }, 'Voltar'),
            )
          : null,
      ),

      !step.required
        ? el(
            'div',
            { class: 'stack stack--sm' },
            button({
              label: 'Pular esta etapa',
              variant: 'ghost',
              size: 'sm',
              onClick: () => {
                markStepSkipped(step.slug);
                syncProfile();
                const next = nextStepSlug(step.slug);
                navigate(next ? `/onboarding/${next}` : '/onboarding/perfil');
              },
            }),
            el('p', { class: 'xsmall muted' }, MESSAGES.skipped),
          )
        : null,
    ),
  );
}

function selfAssessmentGrid(question, draft, onChange) {
  const value = { ...(draft[question.id] ?? {}) };

  return el(
    'fieldset',
    {},
    el('legend', { class: 'choice-group__legend' }, question.prompt),
    el('p', { class: 'field__hint' }, 'Não precisa acertar. Isso é só um ponto de partida.'),
    el(
      'div',
      { class: 'stack stack--sm', style: { marginTop: '0.75rem' } },
      AREA_SELF_ASSESSMENT.map((area) =>
        el(
          'fieldset',
          { class: 'card card--pad' },
          el('legend', { class: 'field__label' }, area.label),
          el(
            'div',
            { class: 'row', style: { marginTop: '0.5rem' } },
            SELF_ASSESSMENT_OPTIONS.map((option) =>
              el(
                'label',
                { class: 'chip' },
                el('input', {
                  type: 'radio',
                  name: `${question.id}:${area.slug}`,
                  value: option.value,
                  checked: value[area.slug] === option.value || undefined,
                  onChange: () => {
                    value[area.slug] = option.value;
                    onChange({ ...value });
                  },
                }),
                option.label,
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

function choiceWithCustom(question, draft, errors, onChange) {
  const current = draft[question.id];
  const isCustom =
    current !== undefined && !(question.options ?? []).some((option) => option.value === String(current));

  const customInput = el('input', {
    type: 'number',
    class: 'input',
    style: { width: '7rem', minHeight: '40px' },
    min: 5,
    max: 180,
    step: 5,
    value: isCustom ? String(current) : '',
    'aria-label': question.customLabel ?? 'Valor personalizado',
    onChange: (event) => {
      const value = Number(event.target.value);
      if (Number.isFinite(value) && value >= 5 && value <= 180) onChange(String(Math.round(value)));
    },
  });

  const group = choiceGroup({
    legend: question.prompt,
    hint: question.help,
    name: question.id,
    options: question.options ?? [],
    value: isCustom ? undefined : current,
    variant: question.variant === 'chip' ? 'chip' : 'option',
    error: errors[question.id],
    onChange,
  });

  group
    .querySelector('.row, .stack')
    ?.append(
      el(
        'label',
        { class: 'chip' },
        el('input', {
          type: 'radio',
          name: question.id,
          checked: isCustom || undefined,
          onChange: () => customInput.focus(),
        }),
        question.customLabel ?? 'Outro',
        customInput,
      ),
    );

  return group;
}

export function renderProfileConfirmation(root) {
  syncProfile();
  const s = student();
  const result = classifyProfile(s.answers);
  const suggested = getProfile(result.suggested);

  let chosen = suggested.slug;
  let comparing = false;
  let rejected = false;

  const comparisonRegion = el('div', {});
  const actionsRegion = el('div', {});
  const noteRegion = el('div', {});
  const rejectedRegion = el('div', {});

  function paintComparison() {
    if (!comparing) {
      render(comparisonRegion);
      return;
    }

    const alternatives = result.alternatives.map((slug) => {
      const profile = getProfile(slug);
      const entry = result.ranking.find((item) => item.slug === slug);
      return { ...profile, premiseReason: entry?.eligible === false ? entry.premiseReason : null };
    });

    render(
      comparisonRegion,
      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Escolha o que mais representa sua situação agora'),
        el(
          'fieldset',
          { class: 'stack stack--sm' },
          el('legend', { class: 'sr-only' }, 'Perfis disponíveis'),
          [{ ...suggested, trait: 'Nossa sugestão a partir das suas respostas' }, ...alternatives].map(
            (profile) =>
              el(
                'label',
                { class: 'option' },
                el('input', {
                  type: 'radio',
                  name: 'perfil',
                  value: profile.slug,
                  checked: chosen === profile.slug || undefined,
                  onChange: () => {
                    chosen = profile.slug;
                    paintActions();
                  },
                }),
                el(
                  'span',
                  { class: 'option__body' },
                  el('span', { class: 'option__label' }, profile.name),
                  el('span', { class: 'option__hint small secondary' }, profile.description),
                  el('span', { class: 'option__hint xsmall muted' }, profile.trait),
                  profile.premiseReason
                    ? el(
                        'span',
                        { class: 'option__hint xsmall', style: { color: 'var(--ck-warning)' } },
                        `Não sugerimos automaticamente: ${profile.premiseReason} Você ainda pode escolher.`,
                      )
                    : null,
                ),
              ),
          ),
        ),
      ),
    );
  }

  const noteField = el('textarea', {
    class: 'textarea',
    rows: 2,
    maxlength: 500,
    placeholder: 'Ex.: meu tempo muda toda semana por causa do trabalho.',
  });

  function paintNote() {
    render(
      noteRegion,
      chosen !== suggested.slug
        ? el(
            'div',
            { class: 'field' },
            el('label', { class: 'field__label' }, 'Quer contar por que esse perfil combina mais? (opcional)'),
            noteField,
          )
        : null,
    );
  }

  function paintActions() {
    paintNote();
    render(
      actionsRegion,
      el(
        'div',
        { class: 'row', style: { borderTop: '1px solid var(--ck-line)', paddingTop: '1.25rem' } },
        button({
          label:
            chosen === suggested.slug
              ? 'Sim, começar com este perfil'
              : `Começar como ${getProfile(chosen).name}`,
          size: 'lg',
          onClick: () => {
            confirmProfile(suggested.slug, chosen, noteField.value.trim() || null);
            navigate('/onboarding/resumo');
          },
        }),
        !comparing
          ? button({
              label: 'Quero comparar com outros perfis',
              variant: 'secondary',
              onClick: () => {
                comparing = true;
                paintComparison();
                paintActions();
              },
            })
          : null,
        button({
          label: 'Nenhum parece comigo',
          variant: 'ghost',
          onClick: () => {
            rejected = true;
            comparing = true;
            render(rejectedRegion, message('info', null, el('p', {}, MESSAGES.rejectedProfile)));
            paintComparison();
            paintActions();
          },
        }),
      ),
    );
  }

  paintActions();

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg ck-enter', style: { maxWidth: '46rem' } },

      el(
        'div',
        {},
        el('p', { class: 'eyebrow' }, 'Última etapa'),
        el('h1', {}, 'Esse perfil combina com você?'),
      ),

      result.confidence === 'low' && result.contradictions.length === 0
        ? message('info', null, el('p', {}, MESSAGES.insufficient))
        : null,

      result.contradictions.length > 0
        ? message(
            'warning',
            'Notamos algo',
            el('p', {}, MESSAGES.contradiction),
            el('ul', { class: 'plain-list' }, result.contradictions.map((item) => el('li', {}, item))),
          )
        : null,

      rejectedRegion,

      card(
        { pad: 'lg' },
        el(
          'div',
          { class: 'row' },
          badge('Perfil sugerido', 'green'),
          result.confidence !== 'high' ? badge('Provisório', 'warning') : null,
        ),
        el('h2', { style: { marginTop: '1rem', fontSize: '1.5rem' } }, suggested.name),
        el(
          'p',
          { class: 'secondary', style: { marginTop: '0.5rem' } },
          'Pelo que você contou, seu perfil inicial parece ser ',
          el('strong', {}, suggested.name),
          `. Isso significa que vamos priorizar: ${suggested.firstApproach.toLowerCase()}. Esse perfil não é definitivo.`,
        ),

        result.signals.length > 0
          ? el(
              'section',
              { style: { marginTop: '1.5rem' } },
              el('h3', { class: 'eyebrow' }, 'O que levou a essa sugestão'),
              el('ul', { class: 'plain-list secondary' }, result.signals.map((signal) => el('li', {}, signal))),
            )
          : null,

        el(
          'section',
          { style: { marginTop: '1.5rem' } },
          el('h3', { class: 'eyebrow' }, 'Como isso muda seus estudos'),
          el(
            'ul',
            { class: 'plain-list secondary' },
            describePersonalization(suggested.slug).map((effect) => el('li', {}, effect)),
          ),
        ),

        supportsFor(s.answers).length > 0
          ? el(
              'section',
              { style: { marginTop: '1.5rem' } },
              el('h3', { class: 'eyebrow' }, 'Apoios que vamos ativar'),
              el(
                'ul',
                { class: 'plain-list secondary' },
                supportsFor(s.answers).map((support) => el('li', {}, support)),
              ),
            )
          : null,
      ),

      comparisonRegion,
      noteRegion,
      actionsRegion,

      el(
        'p',
        { class: 'small secondary' },
        'Prefere ajustar o que respondeu? ',
        el('a', { href: '#/onboarding/contexto' }, 'Editar minhas respostas'),
        ' — nada do que você já respondeu será apagado.',
      ),
    ),
  );
}

export function renderOnboardingSummary(root) {
  const s = student();
  if (!s.confirmedAt) {
    navigate('/onboarding/perfil', { replace: true });
    return;
  }

  rebuildPlan();

  const profile = getProfile(s.activeProfile);
  const p = profile.personalization;
  const recommendation = mainRecommendation();
  const minutes = Math.min(p.baseMinutes, s.sessionMinutes);

  const direction =
    p.dashboardDirection === 'high'
      ? 'Uma recomendação principal bem destacada'
      : p.dashboardDirection === 'medium'
        ? 'Uma recomendação principal com opções ao lado'
        : 'Mais controle manual, recomendações discretas';

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg ck-enter', style: { maxWidth: '46rem' } },

      el('div', {}, badge('Tudo pronto', 'green'), el('h1', { style: { marginTop: '0.75rem' } }, 'Sua configuração inicial está montada')),
      el('p', { class: 'secondary' }, 'Nada aqui é definitivo. Tudo pode ser mudado em “Meu perfil de estudo”.'),

      card(
        { pad: 'lg' },
        el(
          'dl',
          { class: 'def-list' },
          el('div', {}, el('dt', {}, 'Perfil escolhido'), el('dd', {}, profile.name), el('p', { class: 'small secondary' }, profile.description)),
          el('div', {}, el('dt', {}, 'Duração das sessões'), el('dd', {}, formatMinutes(minutes)),
            el('p', { class: 'small secondary' }, `Limitada pelo tempo que você informou (${formatMinutes(s.sessionMinutes)}), ${s.daysPerWeek} dia(s) por semana.`)),
          el('div', {}, el('dt', {}, 'Aprender / praticar / revisar'), el('dd', {}, `${p.mix.learn}% / ${p.mix.practice}% / ${p.mix.review}%`)),
          el('div', {}, el('dt', {}, 'Questões por sessão'), el('dd', {}, String(p.questionsPerSession))),
          el('div', { style: { gridColumn: '1 / -1' } }, el('dt', {}, 'Nível de direção no seu início'), el('dd', {}, direction)),
        ),
      ),

      card(
        { pad: 'lg' },
        el('h2', {}, 'Sua primeira atividade'),
        recommendation
          ? el(
              'div',
              {},
              el('p', { style: { marginTop: '0.5rem', fontSize: '1.1rem', fontWeight: '500' } }, recommendation.topicName),
              el('p', { class: 'small muted' }, `${formatMinutes(recommendation.minutes)} · ${recommendation.questionCount} questões`),
              el('p', { class: 'small secondary reading', style: { marginTop: '0.75rem' } }, recommendation.reason),
            )
          : el('p', { class: 'small secondary' }, 'Vamos montar sua primeira sessão a partir do mapa de conteúdos.'),
      ),

      s.diagnosticStatus === 'pending'
        ? card(
            { pad: 'lg' },
            el('h2', {}, 'Quer um diagnóstico leve antes?'),
            el('p', { class: 'small secondary', style: { marginTop: '0.5rem' } },
              'São 8 questões distribuídas entre as quatro áreas, em cerca de 20 minutos. Não é prova e você pode pular o que não souber. É totalmente opcional.'),
            el('div', { class: 'row', style: { marginTop: '1rem' } },
              linkButton({ href: '#/diagnostico', label: 'Fazer o diagnóstico', variant: 'secondary' })),
          )
        : null,

      el(
        'div',
        { class: 'row', style: { borderTop: '1px solid var(--ck-line)', paddingTop: '1.25rem' } },
        linkButton({ href: '#/inicio', label: 'Ir para o meu início', size: 'lg' }),
        el('a', { class: 'small secondary', href: '#/perfil/estudo' }, 'Editar tudo em Meu perfil de estudo'),
      ),
    ),
  );
}

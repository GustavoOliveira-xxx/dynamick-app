import { el, render } from '../core/dom.js';
import { badge, button, card, emptyState, linkButton, message, seedNotice } from '../ui/components.js';
import { formatMinutes, plural } from '../core/format.js';
import { SESSION_KIND_LABELS } from '../engine/domain.js';
import {
  QUESTIONS,
  SESSION_TEMPLATES,
  TOPICS,
  getSessionTemplate,
  getTopic,
  questionsForTopic,
} from '../data/content.js';
import {
  activeProfile,
  alternativeRecommendations,
  mainRecommendation,
  pendingReviews,
  student,
} from '../core/student.js';
import { createSession, resumableSession, selectReviewQuestions } from '../core/sessions.js';
import { navigate } from '../core/router.js';
import { startSession } from './dashboard.js';
import { nucleo3d } from '../ui/nucleo-3d.js';

export function renderPractice(root) {
  const profile = activeProfile();
  const s = student();
  const recommendation = mainRecommendation();
  const alternatives = alternativeRecommendations(4);
  const resumable = resumableSession();
  const due = pendingReviews();
  const nucleo = nucleo3d({ size: 'md' });

  const templates = [...SESSION_TEMPLATES].sort((a, b) => a.order - b.order);

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header practice-hero' },
        el(
          'div',
          { class: 'practice-hero__text' },
          el('p', { class: 'eyebrow' }, 'Laboratório de prática'),
          el('h1', {}, 'Praticar'),
          el(
            'p',
            { class: 'small secondary' },
            'Sessões de ',
            formatMinutes(Math.min(profile.personalization.baseMinutes, s.sessionMinutes)),
            '. Você pode pausar e voltar depois — nada se perde.',
          ),
        ),
        el(
          'div',
          { class: 'practice-hero__nucleo' },
          nucleo,
          el('p', { class: 'xsmall muted' }, 'Conexões ficam mais fortes quando você recupera uma ideia sem olhar.'),
        ),
      ),

      resumable
        ? message(
            'info',
            'Você tem uma sessão em andamento',
            el('p', {}, resumable.title, ' — parou na questão ', String(resumable.currentIndex + 1), ' de ', String(resumable.items.length), '.'),
            el(
              'div',
              { class: 'row', style: { marginTop: '0.75rem' } },
              linkButton({ href: `#/sessao/${resumable.id}`, label: 'Voltar para onde parei', size: 'sm' }),
            ),
          )
        : null,

      recommendation
        ? card(
            { accent: 'green' },
            el(
              'div',
              { class: 'row row--between' },
              el('span', { class: 'eyebrow' }, 'Sugestão para agora'),
              badge(SESSION_KIND_LABELS[recommendation.kind] ?? 'Prática', 'green'),
            ),
            el('h2', { style: { marginTop: '0.5rem' } }, recommendation.topicName),
            el(
              'p',
              { class: 'xsmall muted' },
              `${recommendation.questionCount} questões · ${formatMinutes(recommendation.minutes)}`,
            ),
            el('p', { class: 'small secondary' }, recommendation.reason),
            el(
              'div',
              { class: 'row', style: { marginTop: '1rem' } },
              button({
                label: 'Começar esta sessão',
                onClick: (event) => startSession(event.currentTarget, recommendation.topicSlug, recommendation.kind),
              }),
              linkButton({
                href: `#/conteudos/${recommendation.topicSlug}`,
                label: 'Ver o conteúdo antes',
                variant: 'secondary',
              }),
            ),
          )
        : emptyState({
            title: 'Ainda não temos base para sugerir',
            description: 'Complete seu perfil de estudo ou escolha um tópico no mapa de conteúdos.',
            actionLabel: 'Abrir o mapa de conteúdos',
            actionHref: '#/conteudos',
          }),

      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Começar de outro jeito'),
        el(
          'div',
          { class: 'grid grid--3' },
          card(
            {},
            el('h3', {}, 'Prática rápida'),
            el('p', { class: 'small secondary' }, 'Três questões do tópico mais indicado agora. Serve para os dias curtos.'),
            el(
              'div',
              { style: { marginTop: '0.75rem' } },
              linkButton({ href: '#/praticar/rapido', label: 'Ver o que entra', variant: 'secondary', size: 'sm' }),
            ),
          ),
          card(
            {},
            el('h3', {}, 'Revisar o que está esquecendo'),
            el(
              'p',
              { class: 'small secondary' },
              due.length > 0
                ? `${due.length} ${plural(due.length, 'item marcado', 'itens marcados')} para revisão hoje.`
                : 'Nada vencido hoje. A fila se forma conforme você pratica.',
            ),
            el(
              'div',
              { style: { marginTop: '0.75rem' } },
              linkButton({ href: '#/revisar', label: 'Abrir revisão', variant: 'secondary', size: 'sm' }),
            ),
          ),
          card(
            {},
            el('h3', {}, 'Simulado'),
            el('p', { class: 'small secondary' }, 'Bloco cronometrado com correção só no fim. Para treinar ritmo de prova.'),
            el(
              'div',
              { style: { marginTop: '0.75rem' } },
              linkButton({ href: '#/simulados', label: 'Escolher simulado', variant: 'secondary', size: 'sm' }),
            ),
          ),
        ),
      ),

      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Sessões prontas'),
        el(
          'p',
          { class: 'small secondary' },
          'Cada uma tem objetivo declarado, instruções e um próximo passo sugerido. Escolher uma não desfaz a recomendação principal.',
        ),
        el(
          'div',
          { class: 'grid grid--2' },
          templates.map((template) => {
            const resolved = resolveTemplate(template);
            const topics = resolved.topicSlugs.map((slug) => getTopic(slug)).filter(Boolean);
            return card(
              { as: 'article' },
              el(
                'div',
                { class: 'row row--between' },
                el('span', { class: 'eyebrow' }, SESSION_KIND_LABELS[template.kind] ?? 'Prática'),
                badge(formatMinutes(template.minutes), 'neutral'),
              ),
              el('h3', { style: { marginTop: '0.35rem' } }, template.title),
              el('p', { class: 'small secondary' }, template.goal),
              topics.length > 0
                ? el(
                    'p',
                    { class: 'xsmall muted' },
                    topics.length === 1 ? 'Tópico: ' : 'Tópicos: ',
                    topics.map((topic) => topic.name).join(', '),
                  )
                : null,
              resolved.warning ? el('p', { class: 'xsmall warning-text' }, resolved.warning) : null,
              el(
                'div',
                { style: { marginTop: '0.75rem' } },
                linkButton({
                  href: `#/praticar/sessao/${template.slug}`,
                  label: 'Ver a sessão',
                  variant: 'secondary',
                  size: 'sm',
                }),
              ),
            );
          }),
        ),
      ),

      alternatives.length > 0
        ? el(
            'section',
            { class: 'stack' },
            el('h2', {}, 'Outros tópicos que fazem sentido hoje'),
            el(
              'ul',
              { class: 'list-plain stack stack--sm' },
              alternatives.map((item) =>
                el(
                  'li',
                  { class: 'row row--between row--wrap' },
                  el(
                    'div',
                    { class: 'flex-1' },
                    el('a', { href: `#/conteudos/${item.topicSlug}` }, item.topicName),
                    el('p', { class: 'xsmall muted' }, item.reason),
                  ),
                  button({
                    label: 'Praticar',
                    variant: 'ghost',
                    size: 'sm',
                    onClick: (event) => startSession(event.currentTarget, item.topicSlug, 'practice'),
                  }),
                ),
              ),
            ),
          )
        : null,

      seedNotice(true),
    ),
  );

  return () => nucleo.dispose?.();
}

export function renderQuickSession(root) {
  const recommendation = mainRecommendation();

  if (!recommendation) {
    render(
      root,
      emptyState({
        title: 'Sem tópico indicado no momento',
        description: 'Escolha um tópico no mapa de conteúdos para começar uma prática rápida.',
        actionLabel: 'Abrir o mapa de conteúdos',
        actionHref: '#/conteudos',
      }),
    );
    return;
  }

  const topic = getTopic(recommendation.topicSlug);

  if (!topic) {
    render(
      root,
      emptyState({
        title: 'O tópico indicado não existe mais',
        description: 'Abra o mapa de conteúdos e escolha outro para começar.',
        actionLabel: 'Abrir o mapa de conteúdos',
        actionHref: '#/conteudos',
      }),
    );
    return;
  }
  const available = questionsForTopic(topic.slug).length;
  const count = Math.min(3, available);

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg reading' },
      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'eyebrow' }, 'Prática rápida'),
        el('h1', {}, topic.name),
        el('p', { class: 'small secondary' }, recommendation.reason),
      ),
      card(
        { accent: 'green' },
        el(
          'dl',
          { class: 'def-list' },
          el('dt', {}, 'Questões'), el('dd', {}, String(count)),
          el('dt', {}, 'Duração estimada'), el('dd', {}, formatMinutes(Math.max(5, count * 3))),
          el('dt', {}, 'Correção'), el('dd', {}, 'Depois de cada questão, com explicação'),
        ),
        count < 3
          ? el(
              'p',
              { class: 'small warning-text', style: { marginTop: '0.75rem' } },
              'Este tópico tem apenas ',
              String(available),
              ' ',
              plural(available, 'questão disponível', 'questões disponíveis'),
              '. A sessão entra com o que existe, sem repetir item.',
            )
          : null,
        el(
          'div',
          { class: 'row', style: { marginTop: '1rem' } },
          button({
            label: 'Começar agora',
            onClick: (event) => {
              const session = createSession({
                title: `Prática rápida — ${topic.name}`,
                kind: 'practice',
                reason: recommendation.reason,
                topicSlug: topic.slug,
                questionSlugs: questionsForTopic(topic.slug).slice(0, count).map((question) => question.slug),
                minutes: Math.max(5, count * 3),
              });
              if (!session) return;
              navigate(`/sessao/${session.id}`);
            },
          }),
          linkButton({ href: '#/praticar', label: 'Voltar', variant: 'ghost' }),
        ),
      ),
    ),
  );
}

export function renderSessionTemplate(root, { params }) {
  const template = getSessionTemplate(params.slug);

  if (!template) {
    render(
      root,
      emptyState({
        title: 'Sessão não encontrada',
        description: 'Esta sessão pronta não existe mais ou o endereço está incorreto.',
        actionLabel: 'Ver as sessões disponíveis',
        actionHref: '#/praticar',
      }),
    );
    return;
  }

  const resolved = resolveTemplate(template);

  if (resolved.redirectTo) {
    navigate(resolved.redirectTo.replace('#', ''), { replace: true });
    return;
  }

  const topics = resolved.topicSlugs.map((slug) => getTopic(slug)).filter(Boolean);
  const count = resolved.questionSlugs.length;
  const next = template.nextRecommendation ? getTopic(template.nextRecommendation) : null;

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg reading' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'eyebrow' }, 'Sessão pronta · ', SESSION_KIND_LABELS[template.kind] ?? 'Prática'),
        el('h1', {}, template.title),
        el('p', { class: 'small secondary' }, template.goal),
      ),

      card(
        {},
        el('h2', {}, 'Como fazer'),
        el('p', {}, template.instructions),
        el(
          'dl',
          { class: 'def-list', style: { marginTop: '1rem' } },
          el('dt', {}, 'Duração'), el('dd', {}, formatMinutes(template.minutes)),
          el('dt', {}, 'Questões'), el('dd', {}, count > 0 ? String(count) : 'Nenhuma disponível agora'),
          el('dt', {}, 'Conteúdo'),
          el('dd', {}, topics.length > 0 ? topics.map((topic) => topic.name).join(', ') : 'Definido no momento em que você começa'),
          el('dt', {}, 'Correção'),
          el('dd', {}, template.mode === 'exam' ? 'Somente no fim da sessão' : 'Após cada questão, com explicação'),
          el('dt', {}, 'Conclusão'),
          el(
            'dd',
            {},
            template.completionRule === 'all_items'
              ? 'Ao responder todas as questões'
              : 'Ao terminar o tempo previsto',
          ),
        ),
        resolved.note ? el('p', { class: 'small secondary', style: { marginTop: '1rem' } }, resolved.note) : null,
      ),

      resolved.warning
        ? message(
            count === 0 ? 'warning' : 'info',
            count === 0 ? 'Esta sessão não pode começar agora' : 'Esta sessão entra menor do que o previsto',
            el('p', {}, resolved.warning),
          )
        : null,

      count > 0 && count < template.itemRule.count && !resolved.warning
        ? message(
            'warning',
            'Esta sessão entra com menos questões do que o previsto',
            el(
              'p',
              {},
              `O material disponível rendeu ${count} ${plural(count, 'questão', 'questões')}. Preferimos entregar menos itens a repetir os mesmos.`,
            ),
          )
        : null,

      el(
        'div',
        { class: 'row' },
        button({
          label: count > 0 ? 'Começar a sessão' : 'Sem questões disponíveis',
          disabled: count === 0,
          onClick: (event) => {
            const session = createSession({
              title: template.title,
              kind: template.kind,
              mode: template.mode === 'exam' ? 'exam' : 'learning',
              reason: resolved.note ?? template.goal,
              topicSlug: resolved.topicSlugs[0] ?? null,
              questionSlugs: resolved.questionSlugs,
              minutes: template.minutes,
            });
            if (!session) {
              event.currentTarget.disabled = false;
              return;
            }
            navigate(`/sessao/${session.id}`);
          },
        }),
        linkButton({ href: '#/praticar', label: 'Voltar', variant: 'ghost' }),
      ),

      next
        ? card(
            {},
            el('span', { class: 'eyebrow' }, 'Depois desta sessão'),
            el('p', { style: { marginTop: '0.35rem' } }, 'A continuação sugerida é ', el('a', { href: `#/conteudos/${next.slug}` }, next.name), '.'),
            el('p', { class: 'xsmall muted' }, 'Sugestão, não obrigação: você pode seguir por outro caminho sem perder progresso.'),
          )
        : null,
    ),
  );
}

function resolveTemplate(template) {
  const rule = template.itemRule;
  const vazio = { questionSlugs: [], topicSlugs: [], note: null, warning: null };

  if (rule.topicSlugs?.length) {
    const pool = rule.topicSlugs.flatMap((slug) => questionsForTopic(slug, { excludeRecovery: true }));
    return {
      ...vazio,
      questionSlugs: pool.slice(0, rule.count).map((question) => question.slug),
      topicSlugs: rule.topicSlugs,
      note: `Conteúdo fixo: ${rule.topicSlugs.map((slug) => getTopic(slug)?.name).filter(Boolean).join(', ')}.`,
    };
  }

  if (rule.source === 'review_queue') {
    const due = pendingReviews();
    if (due.length === 0) {
      return {
        ...vazio,
        warning:
          'Sua fila de revisão está vazia agora. Esta sessão só faz sentido depois que você tiver erros registrados — ela revisa o que você errou, não conteúdo novo.',
      };
    }
    const topicSlug = due[0].topicSlug;
    const originais = due.filter((item) => item.topicSlug === topicSlug).map((item) => item.questionSlug);
    const batch = selectReviewQuestions(topicSlug, originais, rule.count);
    return {
      ...vazio,
      questionSlugs: batch.questionIds,
      topicSlugs: [topicSlug],
      note: batch.hasFreshItem
        ? `Sai da sua fila de revisão, com pelo menos uma questão que você ainda não viu — é assim que se distingue lembrar da questão de entender o conteúdo.`
        : 'Sai da sua fila de revisão.',
      warning: batch.hasFreshItem
        ? null
        : 'Não sobrou questão inédita neste tópico. A sessão vai repetir itens já vistos, o que mede memória da questão, não domínio do conteúdo.',
    };
  }

  if (rule.source === 'recommendation' || rule.source === 'strategy') {
    const recommendation = mainRecommendation();
    if (!recommendation) {
      return {
        ...vazio,
        warning: 'Ainda não temos base para escolher o conteúdo desta sessão. Complete seu perfil ou faça uma sessão qualquer primeiro.',
      };
    }

    if (rule.mixAreas) {

      const porArea = new Map();
      for (const question of QUESTIONS) {
        if (question.isRecovery) continue;
        const list = porArea.get(question.areaSlug) ?? [];
        list.push(question);
        porArea.set(question.areaSlug, list);
      }
      const escolhidas = [];
      let rodada = 0;
      while (escolhidas.length < rule.count && rodada < 20) {
        for (const list of porArea.values()) {
          if (escolhidas.length >= rule.count) break;
          if (list[rodada]) escolhidas.push(list[rodada]);
        }
        rodada += 1;
      }
      return {
        ...vazio,
        questionSlugs: escolhidas.map((question) => question.slug),
        topicSlugs: [...new Set(escolhidas.map((question) => question.topicSlug))],
        note: 'Questões de todas as áreas, alternando o assunto a cada item — é isso que torna a sessão difícil de propósito.',
        warning:
          escolhidas.length < rule.count
            ? `O acervo rendeu ${escolhidas.length} das ${rule.count} questões previstas. Entramos com menos itens em vez de repetir.`
            : null,
      };
    }

    const pool = questionsForTopic(recommendation.topicSlug, { excludeRecovery: true });
    return {
      ...vazio,
      questionSlugs: pool.slice(0, rule.count).map((question) => question.slug),
      topicSlugs: [recommendation.topicSlug],
      note: `Conteúdo escolhido agora: ${recommendation.topicName}. ${recommendation.reason}`,
    };
  }

  if (rule.source === 'interleaved') {
    const porMateria = new Map();
    for (const topic of TOPICS) {
      const list = porMateria.get(topic.subjectSlug) ?? [];
      list.push(topic);
      porMateria.set(topic.subjectSlug, list);
    }

    const materias = [...porMateria.values()]
      .map((topics) => topics.flatMap((topic) => questionsForTopic(topic.slug, { excludeRecovery: true })))
      .filter((list) => list.length > 0)
      .slice(0, rule.subjects ?? 3);

    const escolhidas = [];
    let rodada = 0;
    while (escolhidas.length < rule.count && rodada < 20) {
      for (const list of materias) {
        if (escolhidas.length >= rule.count) break;
        if (list[rodada]) escolhidas.push(list[rodada]);
      }
      rodada += 1;
    }

    return {
      ...vazio,
      questionSlugs: escolhidas.map((question) => question.slug),
      topicSlugs: [...new Set(escolhidas.map((question) => question.topicSlug))],
      note: `Alterna ${materias.length} matérias diferentes. Trocar de assunto a cada questão é mais difícil que fazer tudo em bloco — e é justamente por isso que funciona.`,
      warning:
        escolhidas.length < rule.count
          ? `O acervo rendeu ${escolhidas.length} das ${rule.count} questões previstas. Entramos com menos itens em vez de repetir.`
          : null,
    };
  }

  if (rule.source === 'diagnostic') {
    return { ...vazio, redirectTo: '#/diagnostico', note: 'Esta sessão é o diagnóstico leve, que tem tela própria.' };
  }

  return { ...vazio, warning: 'Esta sessão não declara como escolher suas questões. É um erro do nosso material.' };
}

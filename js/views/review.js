





import { el, render } from '../core/dom.js';
import { badge, button, card, choiceGroup, emptyState, linkButton, message, textarea, toast } from '../ui/components.js';
import { markdown } from '../core/markdown.js';
import { formatDate, plural, relativeDays } from '../core/format.js';
import {
  ERROR_REASON_LABELS,
  NEXT_ACTIONS,
  NEXT_ACTION_LABELS,
  RECALL_LABELS,
  RECALL_LEVELS,
} from '../engine/domain.js';
import { getQuestion, getTopic } from '../data/content.js';
import {
  errorNotes,
  pendingReviews,
  registerRecall,
  toggleErrorNoteResolved,
  updateErrorNote,
  upcomingReviewCount,
} from '../core/student.js';

import { refresh } from '../core/router.js';
import { startSession } from './dashboard.js';

const RECALL_TONE = { forgot: 'danger', partial: 'warning', mastered: 'green' };



export function renderReview(root) {
  const due = pendingReviews();
  const upcoming = upcomingReviewCount();
  const openNotes = errorNotes('open');


  const byTopic = new Map();
  for (const item of due) {
    const list = byTopic.get(item.topicSlug) ?? [];
    list.push(item);
    byTopic.set(item.topicSlug, list);
  }

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el(
          'div',
          { class: 'view-header__row' },
          el(
            'div',
            {},
            el('h1', {}, 'Revisar'),
            el(
              'p',
              { class: 'small secondary' },
              'A fila usa intervalos crescentes. Cada revisão traz pelo menos uma questão diferente da que você errou.',
            ),
          ),
          el(
            'div',
            { class: 'row' },
            linkButton({ href: '#/revisar/caderno', label: 'Caderno de erros', variant: 'secondary', size: 'sm' }),
          ),
        ),
      ),

      due.length === 0
        ? emptyState({
            title: upcoming > 0 ? 'Nada vencido hoje' : 'Sua fila de revisão está vazia',
            description:
              upcoming > 0
                ? `Você tem ${upcoming} ${plural(upcoming, 'item agendado', 'itens agendados')} para os próximos dias. Voltar antes da hora atrapalha mais do que ajuda.`
                : 'A fila se forma sozinha conforme você pratica: cada erro entra aqui com data para voltar.',
            actionLabel: 'Ir praticar',
            actionHref: '#/praticar',
          })
        : el(
            'section',
            { class: 'stack' },
            el('h2', {}, `${due.length} ${plural(due.length, 'item para hoje', 'itens para hoje')}`),
            el(
              'div',
              { class: 'stack stack--sm' },
              [...byTopic.entries()].map(([topicSlug, items]) => {
                const topic = getTopic(topicSlug);
                return card(
                  {},
                  el(
                    'div',
                    { class: 'row row--between row--wrap' },
                    el(
                      'div',
                      {},
                      el('h3', {}, topic?.name ?? 'Tópico removido'),
                      el(
                        'p',
                        { class: 'xsmall muted' },
                        `${items.length} ${plural(items.length, 'item', 'itens')} · mais antigo desde ${relativeDays(items[0].dueAt)}`,
                      ),
                    ),
                    button({
                      label: 'Revisar este tópico',
                      size: 'sm',
                      disabled: !topic,
                      onClick: (event) => startSession(event.currentTarget, topicSlug, 'review'),
                    }),
                  ),
                  el(
                    'ul',
                    { class: 'list-plain stack stack--sm', style: { marginTop: '0.75rem' } },
                    items.map((item) => reviewItemRow(item)),
                  ),
                );
              }),
            ),
          ),

      upcoming > 0
        ? el(
            'p',
            { class: 'small muted' },
            `Mais ${upcoming} ${plural(upcoming, 'item agendado', 'itens agendados')} para os próximos dias.`,
          )
        : null,

      openNotes.length > 0
        ? message(
            'info',
            `${openNotes.length} ${plural(openNotes.length, 'erro em aberto', 'erros em aberto')} no seu caderno`,
            el('p', {}, 'Cada um tem um motivo registrado e um próximo passo sugerido.'),
            el('p', { style: { marginTop: '0.5rem' } }, el('a', { href: '#/revisar/caderno' }, 'Abrir o caderno de erros')),
          )
        : null,
    ),
  );
}


function reviewItemRow(item) {
  const question = getQuestion(item.questionSlug);
  const container = el('li', { class: 'item-row' });

  const head = el(
    'div',
    { class: 'row row--between row--wrap' },
    el(
      'div',
      { class: 'flex-1' },
      el('p', { class: 'small' }, question?.skillName ?? question?.topicName ?? item.questionSlug),
      el('p', { class: 'xsmall muted' }, item.reason ?? 'Item agendado para revisão.'),
    ),
    el(
      'div',
      { class: 'row' },
      badge(`Intervalo de ${item.interval} ${plural(item.interval, 'dia', 'dias')}`, 'neutral'),
      item.lastRecall ? badge(RECALL_LABELS[item.lastRecall], RECALL_TONE[item.lastRecall] ?? 'neutral') : null,
    ),
  );

  const recallBox = el('div', { style: { marginTop: '0.75rem' } });

  recallBox.append(
    choiceGroup({
      legend: 'Antes de resolver: quanto você lembra deste conteúdo?',
      name: `recall-${item.id}`,
      options: RECALL_LEVELS.map((level) => ({ value: level, label: RECALL_LABELS[level] })),
      onChange: (value) => {


        registerRecall(item.id, value, value === 'mastered');
        toast('Anotado. A próxima data de revisão levou isso em conta.', 'info');
        refresh();
      },
    }),
  );

  container.append(head, recallBox);
  return container;
}



export function renderNotebook(root, { query }) {
  const showResolved = query.get('estado') === 'resolvidos';
  const notes = errorNotes(showResolved ? 'resolved' : 'open');

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'breadcrumb' }, el('a', { href: '#/revisar' }, 'Revisar'), ' › Caderno de erros'),
        el('h1', {}, 'Caderno de erros'),
        el(
          'p',
          { class: 'small secondary' },
          'Aqui não fica a lista de questões erradas: fica o motivo do erro e o que fazer a respeito. Um erro sem motivo identificado tende a se repetir.',
        ),
      ),

      el(
        'div',
        { class: 'filters' },
        el(
          'a',
          { class: `chip${showResolved ? '' : ' chip--active'}`, href: '#/revisar/caderno' },
          'Em aberto',
        ),
        el(
          'a',
          { class: `chip${showResolved ? ' chip--active' : ''}`, href: '#/revisar/caderno?estado=resolvidos' },
          'Resolvidos',
        ),
      ),

      notes.length === 0
        ? emptyState({
            title: showResolved ? 'Nenhum erro marcado como resolvido ainda' : 'Seu caderno está vazio',
            description: showResolved
              ? 'Um erro vira "resolvido" quando você acerta o mesmo conteúdo em outro contexto.'
              : 'Ao errar uma questão, você escolhe o motivo. O registro aparece aqui com um próximo passo.',
            actionLabel: 'Ir praticar',
            actionHref: '#/praticar',
          })
        : el(
            'ul',
            { class: 'list-plain stack' },
            notes.map((note) => noteCard(note)),
          ),
    ),
  );
}

function noteCard(note) {
  const question = getQuestion(note.questionSlug);
  const topic = getTopic(note.topicSlug);

  const body = el(
    'div',
    { class: 'stack stack--sm' },

    el(
      'div',
      { class: 'row row--between row--wrap' },
      el(
        'div',
        { class: 'flex-1' },
        el('h3', {}, note.concept),
        el(
          'p',
          { class: 'xsmall muted' },
          'Registrado em ',
          formatDate(note.createdAt),
          note.source === 'auto' ? ' · a partir de uma correção' : ' · anotado por você',
        ),
      ),
      note.reason ? badge(ERROR_REASON_LABELS[note.reason] ?? note.reason, 'warning') : null,
    ),

    question ? el('div', { class: 'small secondary' }, markdown(question.stem.slice(0, 220) + (question.stem.length > 220 ? '…' : ''))) : null,

    choiceGroup({
      legend: 'Próximo passo',
      name: `acao-${note.id}`,
      value: note.nextAction,
      options: NEXT_ACTIONS.map((action) => ({ value: action, label: NEXT_ACTION_LABELS[action] })),
      onChange: (value) => {
        updateErrorNote(note.id, { nextAction: value });
        toast('Próximo passo atualizado.', 'success');
      },
    }),

    textarea({
      label: 'Sua anotação (opcional)',
      name: `nota-${note.id}`,
      value: note.note ?? '',
      rows: 3,
      placeholder: 'O que você faria diferente da próxima vez?',
      onInput: (value) => updateErrorNote(note.id, { note: value }),
    }),

    el(
      'div',
      { class: 'row' },
      topic
        ? button({
            label: 'Praticar este conteúdo em outro contexto',
            variant: 'secondary',
            size: 'sm',
            onClick: (event) => startSession(event.currentTarget, topic.slug, 'review'),
          })
        : null,
      topic ? linkButton({ href: `#/conteudos/${topic.slug}`, label: 'Rever a explicação', variant: 'ghost', size: 'sm' }) : null,
      button({
        label: note.status === 'resolved' ? 'Reabrir' : 'Marcar como resolvido',
        variant: 'ghost',
        size: 'sm',
        onClick: () => {
          const reabrindo = note.status === 'resolved';
          toggleErrorNoteResolved(note.id);
          toast(reabrindo ? 'Erro reaberto.' : 'Erro marcado como resolvido.', 'success');

          refresh();
        },
      }),
    ),
  );

  return el('li', {}, card({}, body));
}

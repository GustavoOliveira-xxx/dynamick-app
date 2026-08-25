import { el, render } from '../core/dom.js';
import { badge, card, linkButton, message, progress } from '../ui/components.js';
import { percent, plural } from '../core/format.js';
import {
  COGNITIVE_FORMAT_LABELS,
  DIFFICULTY_LABELS,
  SEED_LICENSE,
} from '../engine/domain.js';
import { catalogHealth, QUESTIONS } from '../data/content.js';

const MINIMOS = [
  { key: 'areas', label: 'Áreas', min: 4 },
  { key: 'subjects', label: 'Disciplinas', min: 10 },
  { key: 'topics', label: 'Tópicos completos', min: 12 },
  { key: 'questions', label: 'Questões autorais', min: 60 },
  { key: 'recoveryQuestions', label: 'Questões de recuperação', min: 24 },
  { key: 'sessionTemplates', label: 'Sessões prontas', min: 12 },
  { key: 'simulations', label: 'Simulados', min: 5 },
  { key: 'essayPrompts', label: 'Temas de redação', min: 8 },
  { key: 'methods', label: 'Formas de estudar', min: 8 },
];

export function renderCatalog(root) {
  const health = catalogHealth();
  const origins = [...new Set(QUESTIONS.map((question) => question.origin))];

  const problemas = [
    { label: 'Tópicos sem nenhum conteúdo escrito', list: health.topicsWithoutContent.map((t) => t.name) },
    { label: 'Tópicos com menos de cinco questões próprias', list: health.topicsWithFewQuestions.map((t) => t.name) },
    { label: 'Questões sem explicação', list: health.withoutExplanation.map((q) => q.slug) },
    { label: 'Questões sem habilidade associada', list: health.withoutSkill.map((q) => q.slug) },
    { label: 'Questões sem origem ou licença declarada', list: health.withoutLicense.map((q) => q.slug) },
    { label: 'Questões com gabarito inválido', list: health.badAnswerKey.map((q) => q.slug), grave: true },
    { label: 'Alternativas sem justificativa', list: health.missingRationale.map((q) => q.slug) },
    { label: 'Possíveis duplicatas', list: health.duplicates.map((d) => `${d.a} ≈ ${d.b}`) },
  ].filter((item) => item.list.length > 0);

  const graves = problemas.filter((item) => item.grave).length;

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('h1', {}, 'Saúde do conteúdo'),
        el(
          'p',
          { class: 'small secondary' },
          'O que este acervo tem, o que falta e de onde ele vem. Esta tela é pública de propósito.',
        ),
      ),

      message(
        'warning',
        'Este é um acervo autoral de desenvolvimento',
        el(
          'p',
          {},
          'Nenhuma questão foi copiada de prova oficial, livro ou plataforma de terceiros. Todo o material foi escrito para este projeto.',
        ),
        el(
          'p',
          { style: { marginTop: '0.5rem' } },
          'Ele não cobre o programa completo do ENEM. Serve para exercitar o ciclo de estudo inteiro — entender, praticar, corrigir, revisar e acompanhar — com material verificável.',
        ),
        el(
          'p',
          { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
          'Origens: ',
          origins.join(' + '),
          ' · ',
          SEED_LICENSE,
        ),
      ),

      problemas.length === 0
        ? message(
            'success',
            'Nenhum problema de integridade encontrado',
            el('p', {}, 'Toda questão tem gabarito único, explicação, habilidade, justificativa por alternativa e licença declarada.'),
          )
        : message(
            graves > 0 ? 'danger' : 'warning',
            `${problemas.length} ${plural(problemas.length, 'ponto de atenção', 'pontos de atenção')} no acervo`,
            el(
              'ul',
              { class: 'stack stack--sm small' },
              problemas.map((item) =>
                el(
                  'li',
                  {},
                  el('strong', {}, item.label),
                  ': ',
                  String(item.list.length),
                  el('p', { class: 'xsmall muted' }, item.list.slice(0, 6).join(', '), item.list.length > 6 ? '…' : ''),
                ),
              ),
            ),
          ),

      card(
        {},
        el('h2', {}, 'Mínimos do acervo'),
        el(
          'ul',
          { class: 'list-plain stack stack--sm' },
          MINIMOS.map((item) => {
            const atual = health.totals[item.key] ?? 0;
            const atingido = atual >= item.min;
            return el(
              'li',
              {},
              el(
                'div',
                { class: 'row row--between' },
                el('span', { class: 'small' }, item.label),
                el(
                  'span',
                  { class: 'row' },
                  el('span', { class: 'xsmall muted' }, `${atual} / ${item.min}`),
                  badge(atingido ? 'Atingido' : 'Abaixo do mínimo', atingido ? 'green' : 'warning'),
                ),
              ),
              progress({
                value: Math.min(100, percent(atual, item.min)),
                size: 'sm',
                tone: atingido ? 'green' : 'warning',
                label: `${item.label}: ${atual} de ${item.min}`,
              }),
            );
          }),
        ),
      ),

      el(
        'div',
        { class: 'grid grid--3' },
        distribuicao('Questões por área', health.byArea.map((area) => [area.name, area.total])),
        distribuicao(
          'Por dificuldade',
          Object.entries(health.byDifficulty).map(([key, total]) => [DIFFICULTY_LABELS[key] ?? key, total]),
        ),
        distribuicao(
          'Por formato cognitivo',
          Object.entries(health.byCognitiveFormat).map(([key, total]) => [
            COGNITIVE_FORMAT_LABELS[key] ?? key,
            total,
          ]),
        ),
      ),

      card(
        {},
        el('h2', {}, 'Por que isto está visível'),
        el(
          'p',
          { class: 'small secondary' },
          'Uma plataforma de estudo que esconde as próprias lacunas leva o estudante a confundir "não existe aqui" com "não é importante". Preferimos que a falta apareça: assim você sabe quando precisa procurar o conteúdo em outro lugar.',
        ),
        el(
          'div',
          { class: 'row', style: { marginTop: '1rem' } },
          linkButton({ href: '#/conteudos', label: 'Ver o mapa de conteúdos', variant: 'secondary', size: 'sm' }),
          linkButton({ href: '#/buscar', label: 'Buscar um assunto', variant: 'ghost', size: 'sm' }),
        ),
      ),
    ),
  );
}

function distribuicao(titulo, entradas) {
  const total = entradas.reduce((soma, [, valor]) => soma + valor, 0);

  return card(
    {},
    el('h3', {}, titulo),
    el(
      'ul',
      { class: 'list-plain stack stack--sm', style: { marginTop: '0.5rem' } },
      entradas
        .sort((a, b) => b[1] - a[1])
        .map(([nome, valor]) =>
          el(
            'li',
            {},
            el(
              'div',
              { class: 'row row--between' },
              el('span', { class: 'xsmall' }, nome),
              el('span', { class: 'xsmall muted' }, `${valor} (${percent(valor, total)}%)`),
            ),
            progress({ value: percent(valor, total), size: 'sm', tone: 'teal', label: `${nome}: ${valor}` }),
          ),
        ),
    ),
  );
}

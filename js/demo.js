import { el, render } from './core/dom.js';
import { badge, button, card, linkButton, message, progress } from './ui/components.js';
import { markdown } from './core/markdown.js';
import { CONFIDENCE_LABELS, DIFFICULTY_LABELS, ERROR_REASON_LABELS, ERROR_REASONS } from './engine/domain.js';
import { getQuestion } from './data/content.js';
import { mountBackground } from './ui/background.js';
import { dynamickLogo, consciousKnowledgeLogo } from './ui/brand.js';

const AMOSTRA = ['q-porc-1', 'q-interp-1', 'q-eco-1'];

const respostas = new Map();
let indice = 0;

const raiz = document.getElementById('demo');

function questoes() {
  return AMOSTRA.map((slug) => getQuestion(slug)).filter(Boolean);
}

function pergunta(question) {
  let escolhida = null;
  let confianca = 'sure';

  const alternativas = el('div', { class: 'question__options' });
  const acoes = el('div', { class: 'row', style: { marginTop: '1.25rem' } });

  const confirmar = button({
    label: 'Confirmar resposta',
    disabled: true,
    onClick: () => {
      respostas.set(question.slug, { escolhida, confianca });
      desenhar();
    },
  });

  for (const option of question.options) {
    const input = el('input', {
      type: 'radio',
      name: `demo-${question.slug}`,
      value: option.label,
      onChange: () => {
        escolhida = option.label;
        confirmar.disabled = false;
      },
    });

    alternativas.append(
      el(
        'label',
        { class: 'option' },
        input,
        el(
          'span',
          { class: 'option__body' },
          el('span', { class: 'option__label' }, `${option.label}) `, option.text),
        ),
      ),
    );
  }

  const confiancaBox = el(
    'fieldset',
    { class: 'choice-group', style: { marginTop: '1rem' } },
    el('legend', { class: 'choice-group__legend small' }, 'O quanto você confia nesta resposta?'),
    el(
      'div',
      { class: 'row' },
      ...Object.entries(CONFIDENCE_LABELS).map(([valor, rotulo]) =>
        el(
          'label',
          { class: 'chip' },
          el('input', {
            type: 'radio',
            name: `confianca-${question.slug}`,
            value: valor,
            checked: valor === 'sure',
            onChange: () => {
              confianca = valor;
            },
          }),
          rotulo,
        ),
      ),
    ),
  );

  acoes.append(confirmar);

  return card(
    {},
    el(
      'div',
      { class: 'row row--between row--wrap' },
      el('span', { class: 'eyebrow' }, question.areaName, ' · ', question.topicName),
      el(
        'span',
        { class: 'row' },
        badge(question.sourceLabel, 'green'),
        badge(DIFFICULTY_LABELS[question.difficulty] ?? question.difficulty, 'neutral'),
      ),
    ),
    el('div', { class: 'question__stem', style: { marginTop: '0.75rem' } }, markdown(question.stem)),
    alternativas,
    confiancaBox,
    acoes,
  );
}

function correcao(question, resposta) {
  const correta = question.options.find((option) => option.isCorrect);
  const acertou = resposta.escolhida === correta.label;
  const marcada = question.options.find((option) => option.label === resposta.escolhida);

  return card(
    { accent: acertou ? 'green' : 'warning' },
    el(
      'div',
      { class: 'row row--between row--wrap' },
      el('h3', {}, acertou ? 'Você acertou' : 'Não é essa'),
      badge(CONFIDENCE_LABELS[resposta.confianca], 'neutral'),
    ),

    acertou && resposta.confianca !== 'sure'
      ? el(
          'p',
          { class: 'small warning-text' },
          'Acertou, mas com dúvida. Na plataforma, uma questão assim volta na revisão — acertar sem ter certeza não é o mesmo que dominar.',
        )
      : null,

    el(
      'p',
      { class: 'small', style: { marginTop: '0.5rem' } },
      'Resposta correta: ',
      el('strong', {}, `${correta.label}) ${correta.text}`),
    ),

    el('div', { class: 'correction__block' }, markdown(question.explanation.summary)),

    !acertou && marcada
      ? message(
          'warning',
          `Por que a ${marcada.label} não serve`,
          el('p', {}, marcada.rationale),
          marcada.errorHint
            ? el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } }, 'Padrão de erro: ', marcada.errorHint, '.')
            : null,
        )
      : null,

    el(
      'details',
      { style: { marginTop: '1rem' } },
      el('summary', { class: 'small' }, 'Ver a análise de todas as alternativas'),
      el(
        'ul',
        { class: 'list-plain stack stack--sm', style: { marginTop: '0.75rem' } },
        question.options.map((option) =>
          el(
            'li',
            { class: 'correction__distractor' },
            el('p', { class: 'small' }, el('strong', {}, `${option.label}) `), option.text),
            el('p', { class: 'xsmall secondary' }, option.rationale),
          ),
        ),
      ),
    ),

    !acertou
      ? el(
          'div',
          { style: { marginTop: '1rem' } },
          el('p', { class: 'small' }, 'Na plataforma, a próxima pergunta seria esta:'),
          el('p', { class: 'small secondary' }, 'O que dificultou esta questão?'),
          el(
            'ul',
            { class: 'list-plain row', style: { marginTop: '0.5rem' } },
            ERROR_REASONS.map((reason) => el('li', {}, el('span', { class: 'chip' }, ERROR_REASON_LABELS[reason]))),
          ),
          el(
            'p',
            { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
            'A resposta escolhida define o próximo passo: questão parecida, revisão do conceito, autoexplicação ou refazer depois.',
          ),
        )
      : null,
  );
}

function fim(lista) {
  const acertos = lista.filter((question) => {
    const resposta = respostas.get(question.slug);
    return resposta && question.options.find((option) => option.isCorrect).label === resposta.escolhida;
  }).length;

  const comDuvida = lista.filter((question) => {
    const resposta = respostas.get(question.slug);
    return resposta && resposta.confianca !== 'sure';
  }).length;

  return el(
    'div',
    { class: 'stack' },

    card(
      { accent: 'green' },
      el('h2', {}, 'Fim da amostra'),
      el('p', {}, `Você acertou ${acertos} de ${lista.length}.`),
      comDuvida > 0
        ? el(
            'p',
            { class: 'small secondary' },
            `Em ${comDuvida} ${comDuvida === 1 ? 'delas você marcou dúvida' : 'delas você marcou dúvida'}. Isso muda o que a plataforma recomendaria em seguida.`,
          )
        : null,
      el(
        'p',
        { class: 'small secondary', style: { marginTop: '0.75rem' } },
        'Três questões não bastam para dizer nada sobre o seu nível — e a plataforma não diria. O que você viu aqui é o formato da correção, não um diagnóstico.',
      ),
    ),

    message(
      'info',
      'Nada disto foi salvo',
      el('p', {}, 'Esta demonstração não grava nada, nem no seu navegador. Ao fechar a aba, tudo desaparece.'),
      el(
        'p',
        { style: { marginTop: '0.5rem' } },
        'Na plataforma, cada resposta alimenta seu mapa de conteúdos, sua fila de revisão e seu caderno de erros.',
      ),
    ),

    el(
      'div',
      { class: 'row' },
      linkButton({ href: 'onboarding.html#/onboarding', label: 'Montar meu perfil de estudo' }),
      linkButton({ href: 'index.html', label: 'Voltar ao início', variant: 'ghost' }),
    ),
  );
}

function desenhar() {
  const lista = questoes();

  if (lista.length === 0) {
    render(
      raiz,
      message(
        'danger',
        'A amostra não pôde ser carregada',
        el('p', {}, 'As questões desta demonstração não foram encontradas no acervo.'),
      ),
    );
    return;
  }

  const respondidas = lista.filter((question) => respostas.has(question.slug));
  const atual = lista[indice];
  const resposta = atual ? respostas.get(atual.slug) : null;

  const blocos = [
    el(
      'div',
      {},
      progress({
        value: respondidas.length,
        max: lista.length,
        label: `Questão ${Math.min(indice + 1, lista.length)} de ${lista.length}`,
        size: 'sm',
      }),
      el('p', { class: 'xsmall muted', style: { marginTop: '0.35rem' } }, `Questão ${Math.min(indice + 1, lista.length)} de ${lista.length}`),
    ),
  ];

  if (!atual) {
    blocos.push(fim(lista));
  } else if (!resposta) {
    blocos.push(pergunta(atual));
  } else {
    blocos.push(
      correcao(atual, resposta),
      el(
        'div',
        { class: 'row' },
        button({
          label: indice + 1 < lista.length ? 'Próxima questão' : 'Ver o fechamento',
          onClick: () => {
            indice += 1;
            desenhar();
          },
        }),
      ),
    );
  }

  render(raiz, el('div', { class: 'stack stack--lg' }, ...blocos));
  raiz.querySelector('h2, h3, .question__stem')?.scrollIntoView({ block: 'nearest' });
}

document.getElementById('marca').append(dynamickLogo({ variant: 'compact' }));
document.getElementById('marca-institucional').append(consciousKnowledgeLogo());
mountBackground(document.getElementById('fundo'), { intensity: 'medium' });
desenhar();

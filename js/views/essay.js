/**
 * Redação — propostas autorais, planejamento guiado e autoavaliação por critério.
 * A plataforma não atribui nota de redação: ela devolve critérios e perguntas.
 * Dizer "sua redação vale 820" sem corretor humano seria inventar um número.
 */

import { el, render } from '../core/dom.js';
import { badge, button, card, emptyState, linkButton, message, textarea, toast } from '../ui/components.js';
import { formatDate, plural } from '../core/format.js';
import { ESSAY_PROMPTS, getEssayPrompt } from '../data/content.js';
import { getState, update } from '../core/store.js';

/** Critérios de autoavaliação — descrevem o texto, não geram nota. */
const CRITERIA = [
  {
    key: 'norma',
    label: 'Domínio da escrita formal',
    question: 'Reli o texto procurando concordância, pontuação e repetição de palavra?',
  },
  {
    key: 'tema',
    label: 'Compreensão da proposta',
    question: 'Meu texto responde exatamente ao recorte pedido, sem trocar de assunto?',
  },
  {
    key: 'argumento',
    label: 'Organização dos argumentos',
    question: 'Cada parágrafo tem uma ideia própria, ligada à tese e diferente da anterior?',
  },
  {
    key: 'coesao',
    label: 'Articulação entre as partes',
    question: 'As ligações entre frases e parágrafos são explícitas e variadas?',
  },
  {
    key: 'intervencao',
    label: 'Proposta de intervenção',
    question: 'A proposta tem agente, ação, meio, finalidade e detalhamento — e responde ao problema que eu levantei?',
  },
];

/* ---------------------------------------------------------------- Hub */

export function renderEssayHub(root) {
  const essays = getState().essays;
  const written = Object.values(essays).filter((entry) => (entry.text ?? '').trim().length > 0);

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('h1', {}, 'Redação'),
        el(
          'p',
          { class: 'small secondary' },
          'Oito propostas autorais com textos motivadores, roteiro de planejamento e checklist de revisão.',
        ),
      ),

      message(
        'warning',
        'Estas propostas não são previsão de tema',
        el(
          'p',
          {},
          'Nenhum tema aqui é palpite sobre a prova. São recortes escritos para treinar leitura de comando, construção de tese e proposta de intervenção.',
        ),
      ),

      message(
        'info',
        'Sobre a correção',
        el(
          'p',
          {},
          'A plataforma não atribui nota à sua redação. O que ela devolve são critérios, perguntas de revisão e o registro do seu próprio julgamento — porque uma nota gerada sem leitor humano seria um número inventado.',
        ),
      ),

      written.length > 0
        ? el(
            'section',
            { class: 'stack' },
            el('h2', {}, `Seus textos (${written.length})`),
            el(
              'ul',
              { class: 'list-plain stack stack--sm' },
              written
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .map((entry) => {
                  const prompt = getEssayPrompt(entry.promptSlug);
                  const words = countWords(entry.text);
                  return el(
                    'li',
                    { class: 'item-row' },
                    el(
                      'div',
                      { class: 'row row--between row--wrap' },
                      el(
                        'div',
                        { class: 'flex-1' },
                        el('p', {}, prompt?.title ?? entry.promptSlug),
                        el(
                          'p',
                          { class: 'xsmall muted' },
                          `${words} ${plural(words, 'palavra', 'palavras')} · atualizado em ${formatDate(entry.updatedAt)}`,
                        ),
                      ),
                      linkButton({
                        href: `#/redacao/${entry.promptSlug}`,
                        label: 'Continuar',
                        variant: 'secondary',
                        size: 'sm',
                      }),
                    ),
                  );
                }),
            ),
          )
        : null,

      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Propostas'),
        el(
          'div',
          { class: 'grid grid--2' },
          ESSAY_PROMPTS.map((prompt) => {
            const saved = essays[prompt.slug];
            return card(
              { as: 'article' },
              el(
                'div',
                { class: 'row row--between' },
                el('span', { class: 'eyebrow' }, prompt.theme),
                saved?.text ? badge('Iniciada', 'teal') : null,
              ),
              el('h3', { style: { marginTop: '0.35rem' } }, prompt.title),
              el('p', { class: 'small secondary' }, prompt.focus),
              el(
                'div',
                { style: { marginTop: '0.75rem' } },
                linkButton({
                  href: `#/redacao/${prompt.slug}`,
                  label: saved?.text ? 'Continuar' : 'Abrir proposta',
                  variant: 'secondary',
                  size: 'sm',
                }),
              ),
            );
          }),
        ),
      ),
    ),
  );
}

/* ---------------------------------------------------------------- Proposta */

export function renderEssayPrompt(root, { params }) {
  const prompt = getEssayPrompt(params.slug);

  if (!prompt) {
    render(
      root,
      emptyState({
        title: 'Proposta não encontrada',
        description: 'Esta proposta de redação não existe ou o endereço está incorreto.',
        actionLabel: 'Ver propostas',
        actionHref: '#/redacao',
      }),
    );
    return;
  }

  const saved = getState().essays[prompt.slug] ?? {
    promptSlug: prompt.slug,
    outline: '',
    text: '',
    selfCheck: {},
    updatedAt: null,
  };

  const contador = el('p', { class: 'xsmall muted' }, wordLabel(saved.text));
  const revisao = el('div', { class: 'stack stack--sm' });

  function persist(patch) {
    update((state) => {
      state.essays[prompt.slug] = {
        ...saved,
        ...state.essays[prompt.slug],
        ...patch,
        promptSlug: prompt.slug,
        updatedAt: new Date().toISOString(),
      };
    });
  }

  function currentText() {
    return getState().essays[prompt.slug]?.text ?? saved.text ?? '';
  }

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg reading' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'breadcrumb' }, el('a', { href: '#/redacao' }, 'Redação'), ' › ', prompt.theme),
        el('h1', {}, prompt.title),
        el('p', { class: 'small secondary' }, prompt.focus),
      ),

      /* 1. Textos motivadores. */
      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Textos motivadores'),
        prompt.motivatingTexts.map((text) =>
          card(
            {},
            el('h3', {}, text.title),
            el('p', {}, text.body),
            el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } }, text.source),
          ),
        ),
      ),

      /* 2. Comando. */
      card(
        { accent: 'green' },
        el('h2', {}, 'Proposta de redação'),
        el('p', {}, prompt.productionCommand),
      ),

      /* 3. Planejamento. */
      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Antes de escrever'),
        card(
          {},
          el('h3', {}, 'Perguntas para decidir sua tese'),
          el(
            'ol',
            { class: 'stack stack--sm small secondary' },
            prompt.planningQuestions.map((question) => el('li', {}, question)),
          ),
        ),
        card(
          {},
          el('h3', {}, 'Repertório possível'),
          el(
            'ul',
            { class: 'stack stack--sm small secondary' },
            prompt.repertoire.map((item) => el('li', {}, item)),
          ),
          el(
            'p',
            { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
            'Repertório só conta quando você explica o que ele prova. Citar sem explicar enfraquece o parágrafo.',
          ),
        ),
        textarea({
          label: 'Seu rascunho de planejamento',
          name: 'planejamento',
          value: saved.outline ?? '',
          rows: 5,
          placeholder: 'Tese, argumento 1, argumento 2, proposta de intervenção…',
          onInput: (value) => persist({ outline: value }),
        }),
      ),

      /* 4. Escrita. */
      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Sua redação'),
        textarea({
          label: 'Texto dissertativo-argumentativo',
          name: 'texto',
          value: saved.text ?? '',
          rows: 18,
          placeholder: 'Escreva aqui. O texto é salvo automaticamente neste navegador.',
          onInput: (value) => {
            persist({ text: value });
            render(contador, wordLabel(value));
          },
        }),
        contador,
        el(
          'p',
          { class: 'xsmall muted' },
          'O texto fica salvo apenas neste navegador. Ele não é enviado para nenhum servidor.',
        ),
      ),

      /* 5. Autoavaliação por critério. */
      el(
        'section',
        { class: 'stack' },
        el('h2', {}, 'Revisar pelo critério'),
        el(
          'p',
          { class: 'small secondary' },
          'Responda com o texto na frente. O objetivo não é dar nota: é encontrar o que ainda dá para consertar.',
        ),
        el(
          'div',
          { class: 'stack stack--sm' },
          CRITERIA.map((criterion) => criterionRow(criterion, saved, persist)),
        ),
      ),

      /* 6. Checklist final. */
      card(
        {},
        el('h2', {}, 'Checklist de fechamento'),
        el(
          'ul',
          { class: 'plain-list stack stack--sm small secondary' },
          prompt.reviewChecklist.map((item) => el('li', {}, '☐ ', item)),
        ),
      ),

      el(
        'div',
        { class: 'row' },
        button({
          label: 'Gerar minha devolutiva',
          onClick: () => {
            render(revisao, feedbackBlock(currentText(), getState().essays[prompt.slug]?.selfCheck ?? {}, prompt));
            revisao.scrollIntoView({ behavior: 'smooth', block: 'start' });
          },
        }),
        button({
          label: 'Copiar meu texto',
          variant: 'secondary',
          onClick: async () => {
            try {
              await navigator.clipboard.writeText(currentText());
              toast('Texto copiado.', 'success');
            } catch {
              toast('Seu navegador bloqueou a cópia. Selecione o texto e copie manualmente.', 'warning');
            }
          },
        }),
        linkButton({ href: '#/redacao', label: 'Voltar', variant: 'ghost' }),
      ),

      revisao,
    ),
  );
}

/* ---------------------------------------------------------------- Auxiliares */

function criterionRow(criterion, saved, persist) {
  const current = saved.selfCheck?.[criterion.key] ?? null;
  const group = el('div', { class: 'row' });

  const OPTIONS = [
    { value: 'ok', label: 'Está resolvido' },
    { value: 'parcial', label: 'Dá para melhorar' },
    { value: 'pendente', label: 'Ainda não fiz' },
  ];

  for (const option of OPTIONS) {
    const input = el('input', {
      type: 'radio',
      name: `criterio-${criterion.key}`,
      value: option.value,
      checked: current === option.value,
      onChange: () =>
        persist({
          selfCheck: { ...(saved.selfCheck ?? {}), [criterion.key]: option.value },
        }),
    });
    group.append(el('label', { class: 'chip' }, input, option.label));
  }

  return card(
    { pad: 'md' },
    el('h3', {}, criterion.label),
    el('p', { class: 'small secondary' }, criterion.question),
    el('div', { style: { marginTop: '0.5rem' } }, group),
  );
}

function countWords(text) {
  return (text ?? '').trim().split(/\s+/).filter(Boolean).length;
}

function wordLabel(text) {
  const words = countWords(text);
  if (words === 0) return 'Nada escrito ainda.';
  const reference =
    words < 150
      ? ' — textos dissertativos costumam ficar entre 25 e 30 linhas; você ainda está bem abaixo disso.'
      : words > 420
        ? ' — está longo. Textos muito extensos costumam repetir argumento em vez de aprofundar.'
        : ' — extensão compatível com um texto dissertativo de prova.';
  return `${words} ${plural(words, 'palavra', 'palavras')}${reference}`;
}

/**
 * Devolutiva descritiva: aponta o que observou no texto e o que você mesmo marcou.
 * Em nenhum momento produz uma nota.
 */
function feedbackBlock(text, selfCheck, prompt) {
  const words = countWords(text);

  if (words < 40) {
    return message(
      'warning',
      'Ainda não há texto suficiente para uma devolutiva',
      el('p', {}, 'Escreva ao menos a introdução e um parágrafo de desenvolvimento antes de pedir a devolutiva.'),
    );
  }

  const paragraphs = text.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  const pending = CRITERIA.filter((criterion) => (selfCheck[criterion.key] ?? 'pendente') !== 'ok');
  const copied = prompt.motivatingTexts.some((motivating) =>
    longestSharedRun(text, motivating.body) >= 12,
  );

  return card(
    { accent: 'teal' },
    el('h2', {}, 'Devolutiva'),

    el('h3', {}, 'O que dá para observar no seu texto'),
    el(
      'ul',
      { class: 'stack stack--sm small secondary' },
      el('li', {}, `${paragraphs.length} ${plural(paragraphs.length, 'parágrafo', 'parágrafos')} e ${words} ${plural(words, 'palavra', 'palavras')}.`),
      paragraphs.length < 4
        ? el('li', {}, 'A estrutura mais comum tem quatro ou cinco parágrafos: introdução, dois desenvolvimentos e conclusão com proposta. O seu tem menos que isso.')
        : el('li', {}, 'A quantidade de parágrafos é compatível com a estrutura dissertativa usual.'),
      copied
        ? el('li', { class: 'warning-text' }, 'Há um trecho longo idêntico a um dos textos motivadores. Cópia dos textos de apoio é penalizada — reescreva com suas palavras.')
        : el('li', {}, 'Não encontramos trechos copiados dos textos motivadores.'),
    ),

    el('h3', { style: { marginTop: '1rem' } }, 'O que você mesmo marcou como pendente'),
    pending.length === 0
      ? el('p', { class: 'small secondary' }, 'Você marcou todos os critérios como resolvidos. Vale reler uma vez depois de algumas horas, com o texto "frio".')
      : el(
          'ul',
          { class: 'stack stack--sm small secondary' },
          pending.map((criterion) => el('li', {}, el('strong', {}, criterion.label), ' — ', criterion.question)),
        ),

    el(
      'p',
      { class: 'xsmall muted', style: { marginTop: '1rem' } },
      'Esta devolutiva descreve o texto e organiza a sua própria revisão. Ela não é uma correção nem uma nota, e não substitui a leitura de um professor.',
    ),
  );
}

/** Maior sequência de palavras em comum — usado só para alertar sobre cópia. */
function longestSharedRun(a, b) {
  const wordsA = a.toLowerCase().match(/\p{L}+/gu) ?? [];
  const wordsB = new Set();
  const listB = b.toLowerCase().match(/\p{L}+/gu) ?? [];

  for (let size = 12; size <= Math.min(24, listB.length); size += 1) {
    for (let i = 0; i + size <= listB.length; i += 1) wordsB.add(listB.slice(i, i + size).join(' '));
  }

  for (let size = 12; size <= Math.min(24, wordsA.length); size += 1) {
    for (let i = 0; i + size <= wordsA.length; i += 1) {
      if (wordsB.has(wordsA.slice(i, i + size).join(' '))) return size;
    }
  }
  return 0;
}

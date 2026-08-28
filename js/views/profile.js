import { el, render } from '../core/dom.js';
import {
  badge,
  button,
  card,
  choiceGroup,
  confirmDestructive,
  emptyState,
  field,
  linkButton,
  message,
  progress,
  setButtonLoading,
  textarea,
  toast,
} from '../ui/components.js';
import { formatDate, formatMinutes, percent, plural, relativeDays, WEEKDAYS } from '../core/format.js';
import { DIMENSION_KEYS, DIMENSION_LABELS, MASTERY_LABELS, MASTERY_STATES, REPORT_KIND_LABELS } from '../engine/domain.js';
import { PROFILES, getProfile } from '../engine/profiles.js';
import { describePersonalization, supportsFor } from '../engine/profile.js';
import { TOPICS, getTopic } from '../data/content.js';
import { EXAM_ENVIRONMENTS } from '../data/exam-environments.js';
import { clearAll, exportData, getState, importData } from '../core/store.js';
import {
  activeProfile,
  changeProfile,
  errorNotes,
  masteryFor,
  preferences,
  student,
  updateAvailability,
  updatePreferences,
} from '../core/student.js';
import { summarizeSession } from '../core/sessions.js';
import {
  apagarNoServidor,
  desvincular,
  enviar,
  formatarCodigo,
  receber,
  registrarConta,
  syncDisponivel,
  vincularExistente,
  vincularNovo,
  vinculoAtual,
  vinculoDaConta,
} from '../core/sync.js';
import { currentAccount } from '../core/account.js';
import { navigate, refresh } from '../core/router.js';

export function renderProfileHub(root) {
  const s = student();
  const profile = activeProfile();
  const state = getState();

  const completed = Object.values(state.sessions).filter((session) => session.status === 'completed');
  const consolidated = Object.values(state.mastery).filter((item) => item.state === 'consolidated').length;
  const open = errorNotes('open').length;

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
            el('h1', {}, s.name ? s.name : 'Seu perfil'),
            el('p', { class: 'small secondary' }, profile.name, ' · ', profile.description),
          ),
          s.provisional ? badge('Provisório', 'warning') : badge('Confirmado', 'green'),
        ),
      ),

      el(
        'div',
        { class: 'grid grid--3' },
        statCard('Sessões concluídas', String(completed.length)),
        statCard('Tópicos consolidados', `${consolidated} de ${TOPICS.length}`),
        statCard('Erros em aberto', String(open)),
      ),

      el(
        'div',
        { class: 'grid grid--2' },
        linkCard('Meu perfil de estudo', 'Como ele foi definido, o que ele muda e como trocar.', '#/perfil/estudo'),
        linkCard('Configurações', 'Aparência, movimento, correção, cronômetro e lembretes.', '#/perfil/configuracoes'),
        linkCard('Relatório de evolução', 'O que mudou, o que estagnou e o que voltou a cair.', '#/perfil/relatorio'),
        linkCard('Meus dados', 'Exportar, importar e apagar tudo o que está salvo neste navegador.', '#/perfil/dados'),
      ),
    ),
  );
}

function statCard(label, value) {
  return card(
    {},
    el('p', { class: 'eyebrow' }, label),
    el('p', { style: { fontSize: '1.75rem', fontWeight: '700', marginTop: '0.25rem' } }, value),
  );
}

function linkCard(title, description, href) {
  return el(
    'a',
    { class: 'card card--pad card-link', href },
    el('h2', {}, title),
    el('p', { class: 'small secondary' }, description),
  );
}

export function renderStudyProfile(root) {
  const s = student();
  const profile = activeProfile();
  const state = getState();
  const supports = supportsFor(s.answers ?? {});

  const history = [...state.profileHistory].reverse();
  const lastConfirmation = state.profileConfirmations.at(-1);

  const trocaBox = el('div');
  let escolhido = profile.slug;
  let justificativa = '';

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg reading' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'breadcrumb' }, el('a', { href: '#/perfil' }, 'Perfil'), ' › Perfil de estudo'),
        el('h1', {}, profile.name),
        el('p', { class: 'small secondary' }, profile.description),
      ),

      message(
        'info',
        'O que este perfil é',
        el(
          'p',
          {},
          'Uma descrição provisória de como você estuda hoje, feita a partir das suas respostas. Não é diagnóstico, não é laudo e não diz nada sobre a sua capacidade. Ele muda quando você muda.',
        ),
      ),

      card(
        {},
        el('h2', {}, 'Por que este perfil'),
        lastConfirmation
          ? el(
              'p',
              { class: 'small secondary' },
              lastConfirmation.matchedSuggestion
                ? 'Você confirmou o perfil que sugerimos.'
                : `Nós sugerimos ${getProfile(lastConfirmation.suggestedProfile).name} e você escolheu ${getProfile(lastConfirmation.chosenProfile).name}. Sua escolha prevalece.`,
            )
          : null,
        el('h3', { style: { marginTop: '1rem' } }, 'Como você se descreveu'),
        el(
          'ul',
          { class: 'stack stack--sm small secondary' },
          DIMENSION_KEYS.map((key) => {
            const declared = s.dimensions?.declared?.[key] ?? 50;
            const observed = s.dimensions?.observed?.[key];
            return el(
              'li',
              {},
              el('div', { class: 'row row--between' },
                el('span', {}, DIMENSION_LABELS[key]),
                el('span', { class: 'xsmall muted' }, `${Math.round(declared)}%`),
              ),
              progress({ value: declared, size: 'sm', label: DIMENSION_LABELS[key], tone: 'teal' }),
              observed !== undefined && Math.abs(observed - declared) > 20
                ? el(
                    'p',
                    { class: 'xsmall warning-text' },
                    `Seu comportamento nas sessões aponta ${Math.round(observed)}%. A diferença não invalida o que você disse — só indica que vale reconsiderar.`,
                  )
                : null,
            );
          }),
        ),
      ),

      card(
        {},
        el('h2', {}, 'O que este perfil muda na prática'),
        el(
          'ul',
          { class: 'stack stack--sm small secondary' },
          describePersonalization(profile.slug).map((line) => el('li', {}, line)),
        ),
        el(
          'p',
          { class: 'xsmall muted', style: { marginTop: '0.75rem' } },
          'Nada disso bloqueia conteúdo. Tudo continua acessível pelo mapa de conteúdos e pela busca.',
        ),
      ),

      supports.length > 0
        ? card(
            {},
            el('h2', {}, 'Apoios ativos'),
            el(
              'ul',
              { class: 'stack stack--sm small secondary' },
              supports.map((support) => el('li', {}, support)),
            ),
            el(
              'p',
              { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
              'Estes apoios vieram das dificuldades que você marcou. Você pode revê-las refazendo o questionário.',
            ),
          )
        : null,

      card(
        {},
        el('h2', {}, 'Trocar de perfil'),
        el(
          'p',
          { class: 'small secondary' },
          'Se a descrição não corresponde a você, troque. Não existe perfil melhor nem pior, e trocar não apaga seu progresso.',
        ),
        choiceGroup({
          legend: 'Escolha o perfil que descreve você hoje',
          name: 'perfil',
          value: profile.slug,
          options: PROFILES.map((item) => ({
            value: item.slug,
            label: item.name,
            hint: item.description,
            support: item.slug === profile.slug ? 'Perfil atual' : null,
          })),
          onChange: (value) => {
            escolhido = value;
            render(
              trocaBox,
              value === profile.slug
                ? null
                : el(
                    'div',
                    { class: 'stack stack--sm', style: { marginTop: '1rem' } },
                    el(
                      'p',
                      { class: 'small secondary' },
                      'Ao trocar para ',
                      el('strong', {}, getProfile(value).name),
                      ': ',
                      describePersonalization(value)[0].toLowerCase(),
                      '.',
                    ),
                    textarea({
                      label: 'Por que você está trocando? (opcional)',
                      name: 'justificativa',
                      rows: 3,
                      placeholder: 'Fica registrado no seu histórico e ajuda você a lembrar depois.',
                      onInput: (text) => {
                        justificativa = text;
                      },
                    }),
                    button({
                      label: `Passar a usar ${getProfile(value).name}`,
                      onClick: () => {
                        changeProfile(escolhido, justificativa);
                        toast('Perfil atualizado. Suas recomendações já refletem a mudança.', 'success');
                        refresh();
                      },
                    }),
                  ),
            );
          },
        }),
        trocaBox,
      ),

      history.length > 0
        ? card(
            {},
            el('h2', {}, 'Histórico de perfil'),
            el(
              'ul',
              { class: 'list-plain stack stack--sm' },
              history.map((entry) =>
                el(
                  'li',
                  { class: 'item-row' },
                  el('p', { class: 'small' }, entry.reason),
                  el('p', { class: 'xsmall muted' }, formatDate(entry.createdAt)),
                ),
              ),
            ),
          )
        : null,

      el(
        'div',
        { class: 'row' },
        linkButton({ href: '#/onboarding', label: 'Refazer o questionário', variant: 'secondary' }),
        linkButton({ href: '#/perfil', label: 'Voltar', variant: 'ghost' }),
      ),
    ),
  );
}

export function renderSettings(root) {
  const prefs = preferences();
  const s = student();

  const set = (patch, texto) => {
    updatePreferences(patch);
    if (texto) toast(texto, 'success');
  };

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg reading' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'breadcrumb' }, el('a', { href: '#/perfil' }, 'Perfil'), ' › Configurações'),
        el('h1', {}, 'Configurações'),
        el('p', { class: 'small secondary' }, 'Tudo aqui vale na hora e fica salvo neste navegador.'),
      ),

      card(
        {},
        el('h2', {}, 'Aparência'),
        choiceGroup({
          legend: 'Tema',
          name: 'tema',
          value: prefs.theme,
          options: [
            { value: 'dark', label: 'Escuro', hint: 'Fundo quase preto com verde vibrante — o padrão.' },
            { value: 'light', label: 'Claro', hint: 'Fundo claro, mesma hierarquia.' },
            { value: 'contrast', label: 'Alto contraste', hint: 'Contraste reforçado em texto e bordas.' },
          ],
          onChange: (value) => set({ theme: value }),
        }),
        choiceGroup({
          legend: 'Tamanho do texto',
          name: 'escala',
          value: prefs.textScale,
          options: [
            { value: '100', label: 'Padrão' },
            { value: '112', label: 'Maior' },
            { value: '125', label: 'Bem maior' },
          ],
          onChange: (value) => set({ textScale: value }),
        }),
        choiceGroup({
          legend: 'Elementos visuais',
          name: 'intensidade',
          value: prefs.visualIntensity,
          options: [
            { value: 'full', label: 'Completos', hint: 'Fundo tridimensional e transições.' },
            { value: 'reduced', label: 'Reduzidos', hint: 'Sem fundo animado. Nada de conteúdo é perdido.' },
          ],
          onChange: (value) => set({ visualIntensity: value }),
        }),
        choiceGroup({
          legend: 'Movimento',
          name: 'movimento',
          value: prefs.reducedMotion,
          options: [
            { value: 'auto', label: 'Seguir o sistema', hint: 'Respeita a preferência do seu aparelho.' },
            { value: 'reduced', label: 'Reduzir sempre' },
            { value: 'full', label: 'Permitir sempre' },
          ],
          onChange: (value) => set({ reducedMotion: value }),
        }),
      ),

      card(
        {},
        el('h2', {}, 'Estudo'),
        choiceGroup({
          legend: 'Quando corrigir',
          name: 'correcao',
          value: prefs.correctionMode,
          options: [
            {
              value: 'learning',
              label: 'Modo aprendizado',
              hint: 'Correção logo após cada questão, com explicação de todas as alternativas.',
            },
            {
              value: 'exam',
              label: 'Modo prova',
              hint: 'Correção só no fim da sessão. Treina a decisão sem retorno imediato.',
            },
          ],
          onChange: (value) => set({ correctionMode: value }),
        }),
        choiceGroup({
          legend: 'Cronômetro',
          name: 'timer',
          value: prefs.showTimer ? 'sim' : 'nao',
          options: [
            { value: 'sim', label: 'Mostrar' },
            { value: 'nao', label: 'Esconder', hint: 'O tempo continua sendo medido para a análise.' },
          ],
          onChange: (value) => set({ showTimer: value === 'sim' }),
        }),
        choiceGroup({
          legend: 'Perguntar o quanto você confia na resposta',
          name: 'confianca',
          value: prefs.confidencePrompt ? 'sim' : 'nao',
          options: [
            { value: 'sim', label: 'Perguntar', hint: 'Separa acerto com certeza de acerto com dúvida.' },
            { value: 'nao', label: 'Não perguntar' },
          ],
          onChange: (value) => set({ confidencePrompt: value === 'sim' }),
        }),
        choiceGroup({
          legend: 'Método de eliminação nas sessões de estudo',
          name: 'eliminacao',
          value: prefs.eliminationMode ? 'sim' : 'nao',
          options: [
            {
              value: 'sim',
              label: 'Disponível',
              hint: 'Permite marcar alternativas como talvez erradas ou certamente erradas e analisa seus descartes.',
            },
            { value: 'nao', label: 'Oculto', hint: 'Você ainda pode ativá-lo ao montar um simulado.' },
          ],
          onChange: (value) => set({ eliminationMode: value === 'sim' }),
        }),
        choiceGroup({
          legend: 'Ambiente padrão dos simulados',
          name: 'ambiente-prova',
          value: prefs.preferredExamEnvironment,
          options: EXAM_ENVIRONMENTS.map((environment) => ({
            value: environment.slug,
            label: environment.title,
            hint: environment.description,
          })),
          onChange: (value) => set({ preferredExamEnvironment: value }),
        }),
      ),

      disponibilidadeCard(s),

      lembretesCard(prefs, set),

      el('div', { class: 'row' }, linkButton({ href: '#/perfil', label: 'Voltar', variant: 'ghost' })),
    ),
  );
}

function disponibilidadeCard(s) {
  let dias = s.daysPerWeek;
  let minutos = s.sessionMinutes;
  let data = s.examDate ?? '';

  return card(
    {},
    el('h2', {}, 'Sua disponibilidade'),
    el('p', { class: 'small secondary' }, 'Mudar isto recalcula o seu plano da semana na hora.'),
    field({
      label: 'Dias por semana',
      name: 'dias',
      type: 'number',
      value: String(dias),
      min: '1',
      max: '7',
      onInput: (event) => {
        dias = event.currentTarget.value;
      },
    }),
    field({
      label: 'Minutos por sessão',
      name: 'minutos',
      type: 'number',
      value: String(minutos),
      min: '5',
      max: '180',
      step: '5',
      onInput: (event) => {
        minutos = event.currentTarget.value;
      },
    }),
    field({
      label: 'Data da prova (opcional)',
      name: 'data-prova',
      type: 'date',
      value: data,
      hint: 'Serve para ajustar o ritmo. Nunca é usada para prever nota nem chance de aprovação.',
      onInput: (event) => {
        data = event.currentTarget.value;
      },
    }),
    button({
      label: 'Salvar e recalcular o plano',
      onClick: () => {
        updateAvailability({ daysPerWeek: dias, sessionMinutes: minutos, examDate: data });
        toast('Disponibilidade salva. Seu plano da semana foi recalculado.', 'success');
        refresh();
      },
    }),
  );
}

function lembretesCard(prefs, set) {
  const diasBox = el('div', { class: 'row', style: { marginTop: '0.75rem' } });

  for (const [indice, nome] of WEEKDAYS.entries()) {
    const marcado = (prefs.reminderDays ?? []).includes(indice);
    diasBox.append(
      el(
        'label',
        { class: 'chip' },
        el('input', {
          type: 'checkbox',
          checked: marcado,
          onChange: (event) => {
            const atual = new Set(prefs.reminderDays ?? []);
            if (event.currentTarget.checked) atual.add(indice);
            else atual.delete(indice);
            set({ reminderDays: [...atual].sort((a, b) => a - b) });
          },
        }),
        nome,
      ),
    );
  }

  return card(
    {},
    el('h2', {}, 'Lembretes'),
    el(
      'p',
      { class: 'small secondary' },
      'Um aviso dentro da própria plataforma nos dias que você escolher. Não enviamos e-mail nem notificação para fora do navegador.',
    ),
    choiceGroup({
      legend: 'Quero lembretes',
      name: 'lembretes',
      value: prefs.remindersEnabled ? 'sim' : 'nao',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
      onChange: (value) => {
        set({ remindersEnabled: value === 'sim' });
        refresh();
      },
    }),
    prefs.remindersEnabled
      ? el(
          'div',
          {},
          el('p', { class: 'small' }, 'Em quais dias?'),
          diasBox,
          field({
            label: 'Horário',
            name: 'horario',
            type: 'time',
            value: prefs.reminderTime ?? '',
            onInput: (event) => set({ reminderTime: event.currentTarget.value }),
          }),
          el(
            'p',
            { class: 'xsmall muted' },
            'Faltar em um dia marcado não gera cobrança nem perda de nada. O lembrete some sozinho.',
          ),
        )
      : null,
  );
}

export function renderReport(root) {
  const state = getState();
  const sessions = Object.values(state.sessions)
    .filter((session) => session.status === 'completed')
    .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

  if (sessions.length === 0) {
    render(
      root,
      emptyState({
        title: 'Ainda não há dados para um relatório',
        description: 'Depois da primeira sessão concluída, a evolução por conteúdo aparece aqui.',
        actionLabel: 'Fazer uma sessão',
        actionHref: '#/praticar',
      }),
    );
    return;
  }

  const summaries = sessions.map((session) => ({ session, summary: summarizeSession(session.id) })).filter((item) => item.summary);

  const metade = Math.max(1, Math.floor(summaries.length / 2));
  const antigas = summaries.slice(0, metade);
  const recentes = summaries.slice(-metade);

  const taxa = (list) => {
    const answered = list.reduce((total, item) => total + item.summary.answered, 0);
    const correct = list.reduce((total, item) => total + item.summary.correct, 0);
    return percent(correct, answered);
  };

  const antes = taxa(antigas);
  const depois = taxa(recentes);

  const porEstado = new Map(MASTERY_STATES.map((estado) => [estado, []]));
  for (const topic of TOPICS) {
    const item = masteryFor(topic.slug);
    porEstado.get(item.state)?.push({ topic, item });
  }

  const parados = TOPICS.filter((topic) => {
    const item = masteryFor(topic.slug);
    if (item.state === 'not_started' || item.state === 'consolidated') return false;
    return item.lastPracticedAt && Date.now() - new Date(item.lastPracticedAt).getTime() > 12 * 86400000;
  });

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'breadcrumb' }, el('a', { href: '#/perfil' }, 'Perfil'), ' › Relatório'),
        el('h1', {}, 'Relatório de evolução'),
        el(
          'p',
          { class: 'small secondary' },
          `Baseado em ${sessions.length} ${plural(sessions.length, 'sessão concluída', 'sessões concluídas')}.`,
        ),
      ),

      message(
        'info',
        'Sobre estes números',
        el(
          'p',
          {},
          'Eles descrevem o seu desempenho no material desta plataforma. Não são nota, não são posição em ranking e não estimam resultado de prova oficial.',
        ),
      ),

      card(
        { accent: depois >= antes ? 'green' : 'warning' },
        el('h2', {}, 'Acerto ao longo do tempo'),
        el(
          'div',
          { class: 'grid grid--2' },
          el(
            'div',
            {},
            el('p', { class: 'eyebrow' }, 'Primeiras sessões'),
            el('p', { style: { fontSize: '1.5rem', fontWeight: '700' } }, `${antes}%`),
          ),
          el(
            'div',
            {},
            el('p', { class: 'eyebrow' }, 'Sessões recentes'),
            el('p', { style: { fontSize: '1.5rem', fontWeight: '700' } }, `${depois}%`),
          ),
        ),
        el(
          'p',
          { class: 'small secondary', style: { marginTop: '0.75rem' } },
          depois > antes
            ? 'A taxa de acerto subiu. Vale olhar se a dificuldade das questões também subiu — acertar mais em conteúdo mais fácil não é o mesmo que avançar.'
            : depois === antes
              ? 'A taxa ficou estável. Estabilidade em conteúdo novo já é progresso.'
              : 'A taxa caiu. Isso costuma acontecer quando você passa a enfrentar conteúdo mais difícil, e não é sinal de retrocesso por si só.',
        ),
      ),

      card(
        {},
        el('h2', {}, 'Onde você está por conteúdo'),
        el(
          'ul',
          { class: 'list-plain stack stack--sm' },
          MASTERY_STATES.filter((estado) => (porEstado.get(estado) ?? []).length > 0).map((estado) =>
            el(
              'li',
              {},
              el(
                'div',
                { class: 'row row--between' },
                el('strong', { class: 'small' }, MASTERY_LABELS[estado]),
                el('span', { class: 'xsmall muted' }, String(porEstado.get(estado).length)),
              ),
              el(
                'ul',
                { class: 'list-plain row', style: { marginTop: '0.35rem' } },
                porEstado.get(estado).map(({ topic }) =>
                  el('li', {}, el('a', { class: 'chip', href: `#/conteudos/${topic.slug}` }, topic.name)),
                ),
              ),
            ),
          ),
        ),
      ),

      parados.length > 0
        ? card(
            { accent: 'warning' },
            el('h2', {}, 'Parados há mais de doze dias'),
            el(
              'p',
              { class: 'small secondary' },
              'Estes conteúdos você começou e não voltou. Não é cobrança — é informação para você decidir.',
            ),
            el(
              'ul',
              { class: 'list-plain row', style: { marginTop: '0.5rem' } },
              parados.map((topic) =>
                el(
                  'li',
                  {},
                  el(
                    'a',
                    { class: 'chip', href: `#/conteudos/${topic.slug}` },
                    topic.name,
                    ' · ',
                    relativeDays(masteryFor(topic.slug).lastPracticedAt),
                  ),
                ),
              ),
            ),
          )
        : null,

      card(
        {},
        el('h2', {}, 'Suas últimas sessões'),
        el(
          'ul',
          { class: 'list-plain stack stack--sm' },
          summaries
            .slice(-8)
            .reverse()
            .map(({ session, summary }) =>
              el(
                'li',
                { class: 'item-row' },
                el(
                  'div',
                  { class: 'row row--between row--wrap' },
                  el(
                    'div',
                    { class: 'flex-1' },
                    el('p', { class: 'small' }, session.title),
                    el('p', { class: 'xsmall muted' }, formatDate(session.completedAt), ' · ', formatMinutes(Math.round(summary.totalTimeMs / 60000))),
                  ),
                  el('span', { class: 'small secondary' }, `${summary.correct}/${summary.answered}`),
                ),
              ),
            ),
        ),
      ),

      el('div', { class: 'row' }, linkButton({ href: '#/perfil', label: 'Voltar', variant: 'ghost' })),
    ),
  );
}

export function renderDataPage(root) {
  const state = getState();
  const reports = state.reports ?? [];

  const contagem = {
    Sessões: Object.keys(state.sessions).length,
    Respostas: Object.keys(state.attempts).length,
    'Tópicos com progresso': Object.keys(state.mastery).length,
    'Itens na revisão': Object.keys(state.review).length,
    'Erros no caderno': Object.keys(state.notes).length,
    Redações: Object.keys(state.essays).length,
    Simulados: Object.keys(state.simulationRuns).length,
  };

  const importStatus = el('div');

  render(
    root,
    el(
      'div',
      { class: 'stack stack--lg reading' },

      el(
        'header',
        { class: 'view-header' },
        el('p', { class: 'breadcrumb' }, el('a', { href: '#/perfil' }, 'Perfil'), ' › Meus dados'),
        el('h1', {}, 'Meus dados'),
      ),

      message(
        'info',
        'Onde seus dados estão',
        el(
          'p',
          {},
          'Tudo o que você faz aqui é gravado apenas no armazenamento local deste navegador. Nada é enviado para servidor, e ninguém além de quem usa este aparelho tem acesso.',
        ),
        el(
          'p',
          { style: { marginTop: '0.5rem' } },
          'Consequência prática: seu progresso não acompanha você em outro navegador ou aparelho, e limpar os dados de navegação apaga tudo. Exporte antes se quiser guardar.',
        ),
      ),

      card(
        {},
        el('h2', {}, 'O que está salvo'),
        el(
          'dl',
          { class: 'def-list' },
          Object.entries(contagem).flatMap(([label, valor]) => [el('dt', {}, label), el('dd', {}, String(valor))]),
        ),
        el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } }, 'Criado em ', formatDate(state.createdAt), ' · última alteração em ', formatDate(state.updatedAt), '.'),
      ),

      contaEmOutrosAparelhosCard(),
      sincronizacaoCard(),

      card(
        {},
        el('h2', {}, 'Exportar'),
        el('p', { class: 'small secondary' }, 'Baixa um arquivo JSON com tudo o que está salvo. Serve de backup e para levar o progresso a outro navegador.'),
        el(
          'div',
          { class: 'row', style: { marginTop: '0.75rem' } },
          button({
            label: 'Baixar meus dados',
            onClick: () => {
              const blob = new Blob([exportData()], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = el('a', {
                href: url,
                download: `dynamick-dados-${new Date().toISOString().slice(0, 10)}.json`,
              });
              document.body.append(link);
              link.click();
              link.remove();
              URL.revokeObjectURL(url);
              toast('Arquivo gerado.', 'success');
            },
          }),
        ),
      ),

      card(
        {},
        el('h2', {}, 'Importar'),
        el(
          'p',
          { class: 'small secondary' },
          'Carrega um arquivo exportado antes. Isto substitui tudo o que está salvo agora neste navegador.',
        ),
        el('input', {
          type: 'file',
          accept: 'application/json,.json',
          class: 'input',
          style: { marginTop: '0.75rem' },
          onChange: async (event) => {
            const file = event.currentTarget.files?.[0];
            if (!file) return;
            try {
              importData(await file.text());
              render(
                importStatus,
                message('success', 'Dados importados', el('p', {}, 'Seu progresso foi restaurado neste navegador.')),
              );
              navigate('/inicio');
            } catch (error) {

              render(
                importStatus,
                message(
                  'danger',
                  'Não foi possível importar este arquivo',
                  el('p', {}, 'Nada foi alterado no que você já tinha salvo.'),
                  el('p', { class: 'xsmall muted', style: { marginTop: '0.5rem' } }, String(error?.message ?? error)),
                ),
              );
            }
          },
        }),
        importStatus,
      ),

      reports.length > 0
        ? card(
            {},
            el('h2', {}, 'Problemas que você relatou'),
            el(
              'ul',
              { class: 'list-plain stack stack--sm' },
              reports.map((report) =>
                el(
                  'li',
                  { class: 'item-row' },
                  el('p', { class: 'small' }, REPORT_KIND_LABELS[report.kind] ?? report.kind, ' — ', getTopic(report.topicSlug)?.name ?? report.questionSlug),
                  report.comment ? el('p', { class: 'xsmall secondary' }, report.comment) : null,
                  el('p', { class: 'xsmall muted' }, formatDate(report.createdAt), ' · registrado neste navegador'),
                ),
              ),
            ),
            el(
              'p',
              { class: 'xsmall muted', style: { marginTop: '0.5rem' } },
              'Sem servidor, estes relatos ficam aqui em vez de chegar à equipe. Exporte seus dados e envie o arquivo se quiser que sejam analisados.',
            ),
          )
        : null,

      card(
        { accent: 'danger' },
        el('h2', {}, 'Apagar tudo'),
        el(
          'p',
          { class: 'small secondary' },
          'Remove perfil, sessões, respostas, revisões, caderno de erros e redações deste navegador. Não dá para desfazer.',
        ),
        el(
          'div',
          { class: 'row', style: { marginTop: '0.75rem' } },
          button({
            label: 'Apagar meus dados',
            variant: 'danger',
            onClick: () =>
              confirmDestructive({
                title: 'Apagar tudo o que está salvo?',
                description:
                  'Seu perfil, seu histórico e suas redações serão removidos deste navegador. Se quiser guardar, cancele e exporte antes.',
                confirmWord: 'APAGAR',
                confirmLabel: 'Apagar definitivamente',
                onConfirm: async () => {

                  if (syncDisponivel && vinculoAtual()) {
                    try {
                      await apagarNoServidor();
                    } catch {

                      toast(
                        'Apagamos tudo neste aparelho, mas não conseguimos falar com o servidor. O que está lá continua, e some sozinho depois de um tempo sem uso.',
                        'warning',
                        9000,
                      );
                    }
                  }
                  clearAll();
                  window.location.hash = '#/onboarding';
                  window.location.reload();
                },
              }),
          }),
        ),
      ),

      el('div', { class: 'row' }, linkButton({ href: '#/perfil', label: 'Voltar', variant: 'ghost' })),
    ),
  );
}

function contaEmOutrosAparelhosCard() {
  if (!syncDisponivel) return null;

  const conta = currentAccount();
  const ligada = Boolean(vinculoDaConta());

  if (conta?.guest) {
    return card(
      {},
      el('h2', {}, 'Entrar em outros aparelhos'),
      el(
        'p',
        { class: 'small secondary' },
        'Você está estudando como convidado. Crie uma conta com e-mail e senha para poder entrar com ela no celular sem perder nada do que já fez.',
      ),
      el(
        'div',
        { class: 'row', style: { marginTop: '0.75rem' } },
        linkButton({ href: '#/entrar?aba=criar', label: 'Criar minha conta' }),
      ),
    );
  }

  if (ligada) {
    return card(
      { accent: 'green' },
      el('h2', {}, 'Entrar em outros aparelhos'),
      badge('ligado', 'green'),
      el(
        'p',
        { class: 'small secondary', style: { marginTop: '0.6rem' } },
        'No celular, abra o site, vá em Entrar e digite ',
        el('strong', {}, conta?.email || 'seu e-mail'),
        ' com a sua senha. Seu progresso desce junto e continua sincronizando sozinho nos dois aparelhos.',
      ),
    );
  }

  if (!conta?.email || !conta?.protegida) {
    return card(
      {},
      el('h2', {}, 'Entrar em outros aparelhos'),
      el(
        'p',
        { class: 'small secondary' },
        'Para entrar com e-mail e senha no celular, esta conta precisa dos dois. ',
        conta?.email ? 'Falta uma senha.' : 'Falta um e-mail.',
        ' Você pode preencher em Perfil › Configurações, ou usar o código de sincronização abaixo.',
      ),
    );
  }

  const erro = el('div', { 'aria-live': 'polite' });
  const senha = field({
    label: 'Confirme sua senha',
    name: 'senha-conta',
    type: 'password',
    autocomplete: 'current-password',
    hint: 'É ela que cifra o pacote. Digitamos aqui porque a senha não fica guardada em lugar nenhum.',
  });

  const ligar = button({
    label: 'Ligar entrada por e-mail e senha',
    onClick: async (evento) => {
      const valor = senha.querySelector('input')?.value ?? '';
      render(erro);
      if (!valor) {
        render(erro, message('danger', 'Faltou a senha', el('p', {}, 'Digite a senha desta conta.')));
        return;
      }
      setButtonLoading(evento.currentTarget, true, 'Ligando…');
      try {
        await registrarConta({ email: conta.email, senha: valor });
        toast('Pronto. Agora você entra nesta conta pelo celular com e-mail e senha.', 'success');
        refresh();
      } catch (problema) {
        setButtonLoading(evento.currentTarget, false);
        render(erro, message('danger', 'Não deu certo', el('p', {}, problema.message)));
      }
    },
  });

  return card(
    {},
    el('h2', {}, 'Entrar em outros aparelhos'),
    el(
      'p',
      { class: 'small secondary' },
      'Guarda seu progresso cifrado com a sua senha. Depois é só abrir o site no celular e entrar com ',
      el('strong', {}, conta.email),
      ' e essa mesma senha.',
    ),
    el('hr', { class: 'hairline' }),
    senha,
    erro,
    el('div', { class: 'row' }, ligar),
  );
}

function sincronizacaoCard() {
  if (!syncDisponivel) {
    return card(
      {},
      el('h2', {}, 'Sincronizar entre aparelhos'),
      el(
        'p',
        { class: 'small secondary' },
        'Esta instalação não tem sincronização ligada: o progresso vive só neste navegador. ',
        'Para levar seu estudo a outro aparelho, use exportar e importar acima.',
      ),
    );
  }

  const corpo = el('div', { class: 'stack stack--sm' });
  const aviso = el('div');
  const vinculo = vinculoAtual();

  async function executar(botao, rotulo, operacao) {
    setButtonLoading(botao, true, rotulo);
    render(aviso);
    try {
      await operacao();
    } catch (erro) {
      if (erro?.message === 'conflito') {
        render(aviso, conflitoAviso());
      } else {
        render(
          aviso,
          message('danger', 'Não deu certo', el('p', {}, erro?.message ?? 'Erro inesperado ao sincronizar.')),
        );
      }
    } finally {
      setButtonLoading(botao, false);
    }
  }

  function conflitoAviso() {
    return message(
      'warning',
      'Outro aparelho enviou algo mais novo',
      el('p', {}, 'Para não apagar o que foi gravado lá, escolha o que fazer:'),
      el(
        'div',
        { class: 'row', style: { marginTop: '0.75rem' } },
        button({
          label: 'Trazer o que está no servidor',
          size: 'sm',
          onClick: (evento) =>
            executar(evento.currentTarget, 'Trazendo…', async () => {
              await receber();
              toast('Progresso do servidor aplicado neste aparelho.', 'success');
              refresh();
            }),
        }),
        button({
          label: 'Enviar o meu mesmo assim',
          variant: 'danger',
          size: 'sm',
          onClick: (evento) =>
            confirmDestructive({
              title: 'Sobrescrever o que está no servidor?',
              description:
                'O progresso gravado pelo outro aparelho será substituído pelo deste. Não dá para desfazer.',
              confirmWord: 'SOBRESCREVER',
              confirmLabel: 'Sobrescrever',
              onConfirm: () =>
                executar(evento.currentTarget, 'Enviando…', async () => {
                  await enviar({ forcar: true });
                  toast('Enviado. O servidor agora tem o progresso deste aparelho.', 'success');
                  refresh();
                }),
            }),
        }),
      ),
    );
  }

  if (!vinculo) {
    const entrada = el('input', {
      class: 'input',
      id: 'codigo-sync',
      placeholder: 'ABCD-EFGH-JKLM-NPQR-STUV',
      autocomplete: 'off',
      spellcheck: 'false',
      maxlength: 30,
    });

    corpo.append(
      el(
        'p',
        { class: 'small secondary' },
        'Gere um código neste aparelho e digite-o no outro. Seu progresso sobe cifrado: ',
        el('strong', {}, 'o código é a chave'),
        ', e sem ele nem nós conseguimos ler o conteúdo.',
      ),
      el(
        'div',
        { class: 'row' },
        button({
          label: 'Gerar um código para este aparelho',
          onClick: (evento) =>
            executar(evento.currentTarget, 'Gerando…', async () => {
              const codigo = await vincularNovo();
              render(aviso, codigoNovoAviso(codigo));
              refresh();
              toast('Código criado e progresso enviado.', 'success');
            }),
        }),
      ),
      el('hr', { class: 'hairline' }),
      el('p', { class: 'small' }, 'Já tem um código de outro aparelho?'),
      el(
        'div',
        { class: 'field' },
        el('label', { class: 'field__label', for: 'codigo-sync' }, 'Código de sincronização'),
        entrada,
        el(
          'p',
          { class: 'field__hint' },
          'Pode digitar com ou sem hífen. Isto substitui o progresso deste navegador pelo do código.',
        ),
      ),
      el(
        'div',
        { class: 'row' },
        button({
          label: 'Trazer o progresso deste código',
          variant: 'secondary',
          onClick: (evento) =>
            executar(evento.currentTarget, 'Buscando…', async () => {
              await vincularExistente(entrada.value);
              toast('Progresso restaurado neste aparelho.', 'success');
              navigate('/inicio');
            }),
        }),
      ),
    );
  } else {
    const codigo = formatarCodigo(vinculo.codigo);
    const oculto = el('code', {}, '•'.repeat(4) + '-••••-••••-••••-' + codigo.slice(-4));
    const caixaCodigo = el('p', { class: 'small', style: { marginTop: '0.5rem' } }, oculto);
    let visivel = false;

    corpo.append(
      el('p', { class: 'small secondary' }, 'Este aparelho está sincronizado.'),
      caixaCodigo,
      el(
        'div',
        { class: 'row' },
        button({
          label: 'Mostrar o código',
          variant: 'ghost',
          size: 'sm',
          onClick: (evento) => {
            visivel = !visivel;
            render(caixaCodigo, el('code', {}, visivel ? codigo : '••••-••••-••••-••••-' + codigo.slice(-4)));
            evento.currentTarget.textContent = visivel ? 'Ocultar o código' : 'Mostrar o código';
          },
        }),
        button({
          label: 'Copiar',
          variant: 'ghost',
          size: 'sm',
          onClick: async () => {
            try {
              await navigator.clipboard.writeText(codigo);
              toast('Código copiado. Guarde em lugar seguro.', 'success');
            } catch {
              toast('Seu navegador bloqueou a cópia. Mostre o código e copie à mão.', 'warning');
            }
          },
        }),
      ),
      el(
        'p',
        { class: 'xsmall muted' },
        vinculo.enviadoEm
          ? `Último envio em ${formatDate(vinculo.enviadoEm)}.`
          : vinculo.recebidoEm
            ? `Recebido em ${formatDate(vinculo.recebidoEm)}.`
            : 'Ainda sem envio registrado.',
      ),
      el(
        'div',
        { class: 'row', style: { marginTop: '0.75rem' } },
        button({
          label: 'Enviar meu progresso agora',
          onClick: (evento) =>
            executar(evento.currentTarget, 'Enviando…', async () => {
              await enviar();
              toast('Progresso enviado.', 'success');
              refresh();
            }),
        }),
        button({
          label: 'Trazer do servidor',
          variant: 'secondary',
          onClick: (evento) =>
            executar(evento.currentTarget, 'Trazendo…', async () => {
              const resultado = await receber();
              if (!resultado) {
                render(aviso, message('info', 'Nada gravado ainda', el('p', {}, 'Envie primeiro deste aparelho.')));
                return;
              }
              toast('Progresso do servidor aplicado.', 'success');
              navigate('/inicio');
            }),
        }),
        button({
          label: 'Desligar neste aparelho',
          variant: 'ghost',
          onClick: () => {
            desvincular();
            toast('Sincronização desligada. Seus dados continuam aqui, e o que está no servidor não foi apagado.', 'info');
            refresh();
          },
        }),
      ),
      el(
        'p',
        { class: 'xsmall warning-text', style: { marginTop: '0.75rem' } },
        'Guarde o código. Ele é a única forma de abrir esses dados — não temos como recuperá-lo para você.',
      ),
    );
  }

  return card({}, el('h2', {}, 'Sincronizar entre aparelhos'), corpo, aviso);
}

function codigoNovoAviso(codigo) {
  return message(
    'success',
    'Anote este código agora',
    el('p', {}, 'Ele é a chave dos seus dados no servidor. Guardamos apenas uma versão embaralhada dele, então não conseguimos mostrá-lo de novo se você limpar este navegador.'),
    el('p', { style: { marginTop: '0.5rem', fontSize: '1.1rem' } }, el('code', {}, codigo)),
  );
}

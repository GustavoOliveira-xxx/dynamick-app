/**
 * Persistência.
 *
 * CAMADA ISOLADA DE PROPÓSITO: toda leitura e escrita de dados do estudante passa por
 * aqui. Hoje o destino é o localStorage do navegador. Trocar por um banco de dados
 * significa reimplementar apenas este arquivo — nenhuma view muda.
 *
 * Consequências de guardar no navegador (documentadas em README.md):
 *  - funciona offline e sem cadastro;
 *  - os dados NÃO acompanham o usuário entre aparelhos ou navegadores;
 *  - limpar os dados do site apaga o progresso;
 *  - não há curadoria compartilhada entre usuários.
 */

const KEY = 'dynamick:v1';
const BACKUP_KEY = 'dynamick:v1:backup';

/** Estrutura inicial. Toda chave nova precisa de valor padrão aqui. */
function emptyState() {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    student: {
      name: '',
      onboardingStatus: 'not_started', // not_started | in_progress | completed | skipped
      onboardingStep: null,
      completedSteps: [],
      skippedSteps: [],
      questionnaireVersion: 'v1',
      answers: {},
      suggestedProfile: null,
      activeProfile: null,
      confidence: 'low',
      provisional: true,
      confirmedAt: null,
      diagnosticStatus: 'pending', // pending | skipped | done
      dimensions: { declared: {}, observed: {} },
      daysPerWeek: 3,
      sessionMinutes: 20,
      examDate: null,
    },
    preferences: {
      theme: 'dark',
      textScale: '100',
      reducedMotion: 'auto',
      highContrast: false,
      visualIntensity: 'full',
      correctionMode: 'learning', // learning | exam
      showTimer: true,
      confidencePrompt: true,
      remindersEnabled: false,
      reminderDays: [],
      reminderTime: '',
    },
    /** Histórico de mudanças de perfil, com justificativa legível. */
    profileHistory: [],
    profileConfirmations: [],
    /** Sessões de estudo, por id. */
    sessions: {},
    /** Tentativas, por id. */
    attempts: {},
    /** Domínio por tópico: { [topicSlug]: {...} } */
    mastery: {},
    /** Fila de revisão: { [id]: {...} } */
    review: {},
    /** Caderno de erros: { [id]: {...} } */
    notes: {},
    /** Plano semanal: { weekStart: ISO, blocks: [] } */
    plan: null,
    /** Execuções de simulado, por id. */
    simulationRuns: {},
    /** Redações, por slug do tema. */
    essays: {},
    /** Denúncias de conteúdo abertas pelo estudante. */
    reports: [],
  };
}

let state = null;
const listeners = new Set();

function isStorageAvailable() {
  try {
    const probe = '__ck_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export const storageAvailable = isStorageAvailable();

/** Preenche chaves ausentes ao evoluir a estrutura, sem perder o que já existe. */
function migrate(loaded) {
  const base = emptyState();
  const merged = { ...base, ...loaded };
  merged.student = { ...base.student, ...(loaded.student ?? {}) };
  merged.student.dimensions = {
    ...base.student.dimensions,
    ...(loaded.student?.dimensions ?? {}),
  };
  merged.preferences = { ...base.preferences, ...(loaded.preferences ?? {}) };
  for (const key of ['sessions', 'attempts', 'mastery', 'review', 'notes', 'simulationRuns', 'essays']) {
    merged[key] = { ...base[key], ...(loaded[key] ?? {}) };
  }
  for (const key of ['profileHistory', 'profileConfirmations', 'reports']) {
    merged[key] = Array.isArray(loaded[key]) ? loaded[key] : base[key];
  }
  merged.version = base.version;
  return merged;
}

export function load() {
  if (state) return state;

  if (!storageAvailable) {
    // Sem localStorage a aplicação continua funcionando — só não persiste.
    state = emptyState();
    return state;
  }

  try {
    const raw = window.localStorage.getItem(KEY);
    state = raw ? migrate(JSON.parse(raw)) : emptyState();
  } catch (error) {
    /*
     * Dado corrompido não pode derrubar o app nem sumir em silêncio: guardamos o
     * conteúdo bruto em uma chave de backup para não perder nada e seguimos limpos.
     */
    console.warn('Estado local ilegível; iniciando do zero. Backup em', BACKUP_KEY, error);
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) window.localStorage.setItem(BACKUP_KEY, raw);
    } catch {
      /* backup é melhor-esforço */
    }
    state = emptyState();
  }

  return state;
}

let saveTimer = null;

function persist() {
  if (!storageAvailable) return;
  try {
    state.updatedAt = new Date().toISOString();
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch (error) {
    // Cota estourada é o caso realista aqui. Avisamos em vez de falhar calado.
    console.error('Não foi possível salvar o progresso localmente.', error);
    notifyError?.('Não conseguimos salvar seu progresso neste navegador. Verifique o espaço disponível.');
  }
}

let notifyError = null;
/** Permite que a interface mostre falhas de gravação ao usuário. */
export function onStorageError(handler) {
  notifyError = handler;
}

/**
 * Altera o estado.
 * @param {(state: object) => void} mutator
 * @param {{immediate?: boolean}} options  `immediate` grava sem debounce
 */
export function update(mutator, options = {}) {
  const current = load();
  mutator(current);

  if (options.immediate) {
    clearTimeout(saveTimer);
    persist();
  } else {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 250);
  }

  for (const listener of listeners) listener(current);
  return current;
}

/** Assina mudanças de estado. Devolve a função de cancelamento. */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getState() {
  return load();
}

/** Exportação completa dos dados do estudante (JSON legível). */
export function exportData() {
  return JSON.stringify(load(), null, 2);
}

/** Importa um arquivo exportado antes. Valida o mínimo antes de aceitar. */
export function importData(json) {
  const parsed = JSON.parse(json);
  if (typeof parsed !== 'object' || parsed === null) throw new Error('Arquivo inválido.');
  if (!parsed.student || !parsed.preferences) {
    throw new Error('Este arquivo não parece ser uma exportação do Dynamic CK.');
  }
  state = migrate(parsed);
  persist();
  for (const listener of listeners) listener(state);
  return state;
}

/** Apaga tudo. Usado pela exclusão de dados. */
export function clearAll() {
  state = emptyState();
  if (storageAvailable) {
    try {
      window.localStorage.removeItem(KEY);
      window.localStorage.removeItem(BACKUP_KEY);
    } catch {
      /* ignorado: o estado em memória já foi limpo */
    }
  }
  for (const listener of listeners) listener(state);
  return state;
}

/**
 * Sincroniza entre abas do mesmo navegador.
 * Sem isto, duas abas abertas sobrescreveriam o progresso uma da outra.
 */
export function watchOtherTabs(onExternalChange) {
  if (!storageAvailable) return () => {};

  function handler(event) {
    if (event.key !== KEY || !event.newValue) return;
    try {
      state = migrate(JSON.parse(event.newValue));
      for (const listener of listeners) listener(state);
      onExternalChange?.(state);
    } catch {
      /* mudança externa ilegível é ignorada */
    }
  }

  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

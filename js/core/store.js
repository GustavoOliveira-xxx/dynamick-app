const BASE_KEY = 'dynamick:v1';
const BACKUP_KEY = 'dynamick:v1:backup';

let namespace = null;

function storageKey() {
  return namespace ? `${BASE_KEY}:${namespace}` : BASE_KEY;
}

export function setNamespace(id) {
  const next = id || null;
  if (next === namespace) return;
  namespace = next;
  state = null;
}

export function clearNamespace() {
  setNamespace(null);
}

export function currentNamespace() {
  return namespace;
}

export function hasLegacyState() {
  if (!storageAvailable) return false;
  try {
    return Boolean(window.localStorage.getItem(BASE_KEY));
  } catch {
    return false;
  }
}

export function adoptLegacyState(targetId, sourceId = null) {
  if (!storageAvailable || !targetId) return false;
  const from = sourceId ? `${BASE_KEY}:${sourceId}` : BASE_KEY;
  const to = `${BASE_KEY}:${targetId}`;

  try {
    const raw = window.localStorage.getItem(from);
    if (!raw) return false;

    if (window.localStorage.getItem(to)) return false;
    window.localStorage.setItem(to, raw);
    window.localStorage.removeItem(from);
    if (namespace === targetId) state = null;
    return true;
  } catch {
    return false;
  }
}

function emptyState() {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    student: {
      name: '',
      onboardingStatus: 'not_started',
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
      diagnosticStatus: 'pending',
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
      correctionMode: 'learning',
      showTimer: true,
      confidencePrompt: true,
      eliminationMode: false,
      preferredExamEnvironment: 'padrao',
      remindersEnabled: false,
      reminderDays: [],
      reminderTime: '',
    },

    profileHistory: [],
    profileConfirmations: [],

    sessions: {},

    attempts: {},

    mastery: {},

    review: {},

    notes: {},

    plan: null,

    simulationRuns: {},

    essays: {},

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

    state = emptyState();
    return state;
  }

  try {
    const raw = window.localStorage.getItem(storageKey());
    state = raw ? migrate(JSON.parse(raw)) : emptyState();
  } catch (error) {

    console.warn('Estado local ilegível; iniciando do zero. Backup em', BACKUP_KEY, error);
    try {
      const raw = window.localStorage.getItem(storageKey());
      if (raw) window.localStorage.setItem(`${BACKUP_KEY}:${namespace ?? 'sem-conta'}`, raw);
    } catch {

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
    window.localStorage.setItem(storageKey(), JSON.stringify(state));
  } catch (error) {

    console.error('Não foi possível salvar o progresso localmente.', error);
    notifyError?.('Não conseguimos salvar seu progresso neste navegador. Verifique o espaço disponível.');
  }
}

let notifyError = null;

export function onStorageError(handler) {
  notifyError = handler;
}

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

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getState() {
  return load();
}

export function exportData() {
  return JSON.stringify(load(), null, 2);
}

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

export function clearAll() {
  state = emptyState();
  if (storageAvailable) {
    try {
      window.localStorage.removeItem(storageKey());
      window.localStorage.removeItem(`${BACKUP_KEY}:${namespace ?? 'sem-conta'}`);
    } catch {

    }
  }
  for (const listener of listeners) listener(state);
  return state;
}

export function watchOtherTabs(onExternalChange) {
  if (!storageAvailable) return () => {};

  function handler(event) {
    if (event.key !== storageKey() || !event.newValue) return;
    try {
      state = migrate(JSON.parse(event.newValue));
      for (const listener of listeners) listener(state);
      onExternalChange?.(state);
    } catch {

    }
  }

  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

const CHAVE_BASE = 'dynamick:v1';
const CHAVE_SESSAO = 'dynamick:session:v1';

function chaveAtiva() {
  try {
    const sessao = JSON.parse(localStorage.getItem(CHAVE_SESSAO) || 'null');
    return sessao?.accountId ? `${CHAVE_BASE}:${sessao.accountId}` : CHAVE_BASE;
  } catch {
    return CHAVE_BASE;
  }
}

export const PADROES = {
  theme: 'dark',
  textScale: '100',
  reducedMotion: 'auto',
  highContrast: false,
  visualIntensity: 'full',
};

export function readPreferences() {
  try {
    const bruto = localStorage.getItem(chaveAtiva());
    if (!bruto) return { ...PADROES };
    return { ...PADROES, ...(JSON.parse(bruto).preferences ?? {}) };
  } catch {

    return { ...PADROES };
  }
}

export function applyPreferencesTo(prefs, root = document.documentElement) {
  root.dataset.theme = prefs.theme ?? PADROES.theme;
  root.dataset.textScale = prefs.textScale ?? PADROES.textScale;

  if (prefs.highContrast) root.dataset.contrast = 'high';
  else delete root.dataset.contrast;

  if (prefs.reducedMotion === 'reduced') root.dataset.motion = 'reduced';
  else if (prefs.reducedMotion === 'full') root.dataset.motion = 'full';
  else delete root.dataset.motion;

  if (prefs.visualIntensity === 'reduced') root.dataset.visual = 'reduced';
  else delete root.dataset.visual;
}

export function applyStoredPreferences() {
  applyPreferencesTo(readPreferences());
}

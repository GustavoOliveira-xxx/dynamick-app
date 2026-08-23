/**
 * Aplica as preferências visuais ao documento.
 *
 * Vive separado do resto porque as páginas estáticas (landing, sobre,
 * privacidade, acessibilidade) também precisam respeitar o que a pessoa
 * escolheu — e elas não carregam a aplicação inteira só para isso.
 *
 * Lê o armazenamento direto, sem passar pelo store: é uma leitura só, na
 * abertura da página, e falha em silêncio quando o navegador bloqueia o acesso.
 */

const CHAVE_BASE = 'dynamick:v1';
const CHAVE_SESSAO = 'dynamick:session:v1';

/**
 * Onde está o estado da pessoa que está usando o navegador agora.
 * Com conta ativa, o estado mora em 'dynamick:v1:<id>'; sem conta, em
 * 'dynamick:v1'. As páginas estáticas precisam saber disso para não aplicarem
 * o tema de outra conta.
 */
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

/** Preferências salvas, com os padrões preenchendo o que faltar. */
export function readPreferences() {
  try {
    const bruto = localStorage.getItem(chaveAtiva());
    if (!bruto) return { ...PADROES };
    return { ...PADROES, ...(JSON.parse(bruto).preferences ?? {}) };
  } catch {
    // Janela anônima, cookies bloqueados ou dado corrompido: o padrão serve.
    return { ...PADROES };
  }
}

/**
 * Escreve as preferências como atributos na raiz do documento.
 * O CSS reage a eles; nada aqui mexe em estilo diretamente.
 */
export function applyPreferencesTo(prefs, root = document.documentElement) {
  root.dataset.theme = prefs.theme ?? PADROES.theme;
  root.dataset.textScale = prefs.textScale ?? PADROES.textScale;

  if (prefs.highContrast) root.dataset.contrast = 'high';
  else delete root.dataset.contrast;

  // Três estados, e os três precisam existir no DOM:
  // 'auto' entrega a decisão ao sistema, 'reduced' força reduzir e 'full'
  // pede para manter o movimento mesmo que o sistema peça o contrário.
  if (prefs.reducedMotion === 'reduced') root.dataset.motion = 'reduced';
  else if (prefs.reducedMotion === 'full') root.dataset.motion = 'full';
  else delete root.dataset.motion;

  if (prefs.visualIntensity === 'reduced') root.dataset.visual = 'reduced';
  else delete root.dataset.visual;
}

/** Atalho para as páginas estáticas: lê e aplica em uma chamada. */
export function applyStoredPreferences() {
  applyPreferencesTo(readPreferences());
}

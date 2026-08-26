import { exportData, importData, subscribe } from './store.js';
import { currentAccount, adotarConta, continueAsGuest } from './account.js';
import { SYNC } from '../config.js';

const API = SYNC.base.replace(/\/$/, '');

const CHAVE_LOCAL_BASE = 'dynamick:sync';
const ITERACOES = 210000;
const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export const syncDisponivel = SYNC.habilitado && Boolean(globalThis.crypto?.subtle);

export function gerarCodigo() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const letras = [...bytes].map((b) => ALFABETO[b % ALFABETO.length]).join('');
  return letras.match(/.{1,4}/g).join('-');
}

export function normalizarCodigo(codigo) {
  return (codigo ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function codigoValido(codigo) {
  const limpo = normalizarCodigo(codigo);
  return limpo.length === 20 && [...limpo].every((c) => ALFABETO.includes(c));
}

export function formatarCodigo(codigo) {
  return normalizarCodigo(codigo).match(/.{1,4}/g)?.join('-') ?? '';
}

export function normalizarEmail(email) {
  return String(email ?? '').trim().toLowerCase();
}

const bytesParaBase64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const base64ParaBytes = (texto) => Uint8Array.from(atob(texto), (c) => c.charCodeAt(0));

async function hashDoSegredo(segredo) {
  const dados = new TextEncoder().encode(`dynamick-sync-v1:${segredo}`);
  const digest = await crypto.subtle.digest('SHA-256', dados);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hashDoCodigo(codigo) {
  return hashDoSegredo(normalizarCodigo(codigo));
}

export async function segredoDaConta(email, senha) {
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(String(senha ?? '')),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: new TextEncoder().encode(`dynamick-conta-v1:${normalizarEmail(email)}`),
      iterations: ITERACOES,
    },
    material,
    256,
  );
  return bytesParaBase64(bits);
}

async function derivarChave(segredo, salt) {
  const base = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(segredo),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERACOES, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function cifrar(segredo, texto) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const chave = await derivarChave(segredo, salt);
  const cifrado = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    chave,
    new TextEncoder().encode(texto),
  );
  return { ciphertext: bytesParaBase64(cifrado), iv: bytesParaBase64(iv), salt: bytesParaBase64(salt) };
}

async function decifrar(segredo, { ciphertext, iv, salt }) {
  const chave = await derivarChave(segredo, base64ParaBytes(salt));
  const aberto = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ParaBytes(iv) },
    chave,
    base64ParaBytes(ciphertext),
  );
  return new TextDecoder().decode(aberto);
}

function chaveDoVinculo() {
  const conta = currentAccount();
  return conta ? `${CHAVE_LOCAL_BASE}:${conta.id}` : CHAVE_LOCAL_BASE;
}

function lerVinculos() {
  let bruto = null;
  try {
    bruto = JSON.parse(localStorage.getItem(chaveDoVinculo()) ?? 'null');
  } catch {
    return {};
  }
  if (!bruto) return {};
  if (bruto.codigo && !bruto.conta && !bruto.porCodigo) {
    return { porCodigo: { ...bruto, segredo: normalizarCodigo(bruto.codigo) } };
  }
  return bruto;
}

function gravarVinculos(vinculos) {
  try {
    const chave = chaveDoVinculo();
    const limpo = Object.fromEntries(Object.entries(vinculos ?? {}).filter(([, v]) => v));
    if (Object.keys(limpo).length === 0) localStorage.removeItem(chave);
    else localStorage.setItem(chave, JSON.stringify(limpo));
  } catch {

  }
}

function gravarVinculo(canal, vinculo) {
  gravarVinculos({ ...lerVinculos(), [canal]: vinculo });
}

export function vinculoAtual() {
  return lerVinculos().porCodigo ?? null;
}

export function vinculoDaConta() {
  return lerVinculos().conta ?? null;
}

export function desvincular() {
  gravarVinculo('porCodigo', null);
}

class ErroDeSync extends Error {
  constructor(mensagem, causa) {
    super(mensagem);
    this.name = 'ErroDeSync';
    this.causa = causa;
  }
}

async function chamar(caminho, opcoes = {}) {
  if (!SYNC.habilitado) throw new ErroDeSync('A sincronização não está ligada nesta instalação.');

  let resposta;
  try {
    resposta = await fetch(`${API}${caminho}`, {
      ...opcoes,
      headers: { 'content-type': 'application/json', ...(opcoes.headers ?? {}) },
    });
  } catch (erro) {
    throw new ErroDeSync('Não foi possível falar com o servidor. Verifique sua conexão.', erro);
  }

  if (resposta.status === 404) return null;
  if (resposta.status === 409) throw new ErroDeSync('conflito');
  if (resposta.status === 413) throw new ErroDeSync('Seus dados passaram do tamanho máximo aceito pela sincronização.');
  if (resposta.status === 429) throw new ErroDeSync('Muitas tentativas seguidas. Espere um minuto e tente de novo.');

  if (!resposta.ok) {
    let detalhe = '';
    try {
      detalhe = (await resposta.json())?.erro ?? '';
    } catch {
      detalhe = '';
    }
    throw new ErroDeSync(detalhe || `O servidor respondeu ${resposta.status}.`);
  }

  return resposta.json();
}

function montarPacote() {
  const estado = JSON.parse(exportData());
  const conta = currentAccount();
  if (conta) estado.conta = { nome: conta.name, email: conta.email ?? '', protegida: Boolean(conta.protegida) };
  return JSON.stringify(estado);
}

async function subirPacote(vinculo, { forcar = false } = {}) {
  const corpo = await cifrar(vinculo.segredo, montarPacote());
  return chamar('/api/sync', {
    method: 'PUT',
    body: JSON.stringify({
      codeHash: await hashDoSegredo(vinculo.segredo),
      ...corpo,
      revision: forcar ? null : (vinculo.revision ?? 0),
    }),
  });
}

async function enviarCanal(canal, { forcar = false } = {}) {
  const vinculo = lerVinculos()[canal];
  if (!vinculo) throw new ErroDeSync('Este aparelho ainda não tem um código de sincronização.');
  const resultado = await subirPacote(vinculo, { forcar });
  gravarVinculo(canal, { ...vinculo, revision: resultado.revision, enviadoEm: new Date().toISOString() });
  return resultado;
}

export async function enviar({ forcar = false } = {}) {
  return enviarCanal('porCodigo', { forcar });
}

async function baixarPacote(segredo) {
  const resposta = await chamar(`/api/sync?codeHash=${await hashDoSegredo(segredo)}`);
  if (!resposta) return null;
  let texto;
  try {
    texto = await decifrar(segredo, resposta);
  } catch (erro) {
    throw new ErroDeSync('Código incorreto para estes dados.', erro);
  }
  let conta = null;
  try {
    conta = JSON.parse(texto).conta ?? null;
  } catch {
    conta = null;
  }
  return { texto, conta, revision: resposta.revision, atualizadoEm: resposta.updatedAt };
}

export async function receber(codigo = null) {
  const vinculo = vinculoAtual();
  const segredo = codigo ? normalizarCodigo(codigo) : vinculo?.segredo;
  if (!segredo) throw new ErroDeSync('Nenhum código informado.');
  const pacote = await baixarPacote(segredo);
  if (!pacote) return null;
  importData(pacote.texto);
  gravarVinculo('porCodigo', {
    codigo: segredo,
    segredo,
    revision: pacote.revision,
    recebidoEm: new Date().toISOString(),
  });
  return { revision: pacote.revision, atualizadoEm: pacote.atualizadoEm };
}

export async function entrarComCodigo(codigo) {
  if (!codigoValido(codigo)) throw new ErroDeSync('Esse código não tem o formato esperado.');
  const segredo = normalizarCodigo(codigo);
  const pacote = await baixarPacote(segredo);
  if (!pacote) throw new ErroDeSync('Não encontramos nada gravado com esse código.');

  const nome = pacote.conta?.nome?.trim();
  if (nome) await adotarConta({ name: nome, email: pacote.conta.email ?? '' });
  else continueAsGuest();

  importData(pacote.texto);
  gravarVinculo('porCodigo', {
    codigo: segredo,
    segredo,
    revision: pacote.revision,
    recebidoEm: new Date().toISOString(),
  });
  return { revision: pacote.revision, atualizadoEm: pacote.atualizadoEm, nome: nome ?? null };
}

export async function vincularNovo() {
  const codigo = gerarCodigo();
  const segredo = normalizarCodigo(codigo);
  const resultado = await subirPacote({ segredo, revision: 0 }, { forcar: true });
  gravarVinculo('porCodigo', {
    codigo: segredo,
    segredo,
    revision: resultado.revision,
    enviadoEm: new Date().toISOString(),
  });
  return codigo;
}

export async function vincularExistente(codigo) {
  if (!codigoValido(codigo)) throw new ErroDeSync('Esse código não tem o formato esperado.');
  const resultado = await receber(codigo);
  if (!resultado) throw new ErroDeSync('Não encontramos nada gravado com esse código.');
  return resultado;
}

export function contaPodeSincronizar(conta) {
  return syncDisponivel && Boolean(conta?.email) && Boolean(conta?.protegida);
}

export async function registrarConta({ email, senha }) {
  if (!syncDisponivel) throw new ErroDeSync('A sincronização não está disponível neste navegador.');
  const segredo = await segredoDaConta(email, senha);

  let resultado;
  try {
    resultado = await subirPacote({ segredo, revision: 0 });
  } catch (erro) {
    if (erro?.message === 'conflito') {
      throw new ErroDeSync('Já existe uma conta salva com esse e-mail e essa senha. Use "Entrar" para trazê-la.');
    }
    throw erro;
  }

  gravarVinculo('conta', { segredo, revision: resultado.revision, enviadoEm: new Date().toISOString() });
  return { revision: resultado.revision };
}

export async function contaExisteNoServidor({ email, senha }) {
  if (!syncDisponivel) return false;
  const segredo = await segredoDaConta(email, senha);
  const resposta = await chamar(`/api/sync?codeHash=${await hashDoSegredo(segredo)}`);
  return Boolean(resposta);
}

export async function entrarComSenha({ email, senha }) {
  if (!syncDisponivel) throw new ErroDeSync('A sincronização não está disponível neste navegador.');
  const segredo = await segredoDaConta(email, senha);
  const pacote = await baixarPacote(segredo);
  if (!pacote) {
    throw new ErroDeSync('E-mail ou senha não conferem, ou esta conta ainda não foi salva para outros aparelhos.');
  }

  const nome = pacote.conta?.nome?.trim() || String(email).split('@')[0];
  await adotarConta({ name: nome, email: normalizarEmail(email), password: senha });
  importData(pacote.texto);
  gravarVinculo('conta', { segredo, revision: pacote.revision, recebidoEm: new Date().toISOString() });
  return { nome, revision: pacote.revision, atualizadoEm: pacote.atualizadoEm };
}

export async function apagarNoServidor() {
  const vinculos = lerVinculos();
  const canais = Object.entries(vinculos).filter(([, v]) => v?.segredo);
  if (canais.length === 0) return false;
  for (const [, vinculo] of canais) {
    await chamar(`/api/sync?codeHash=${await hashDoSegredo(vinculo.segredo)}`, { method: 'DELETE' });
  }
  gravarVinculos({});
  return true;
}

export const _internals = { hashDoCodigo, hashDoSegredo, cifrar, decifrar, derivarChave };

let temporizador = null;
let enviando = false;
let pendente = false;

async function drenar() {
  if (enviando) { pendente = true; return; }
  enviando = true;
  try {
    for (const canal of Object.keys(lerVinculos())) {
      try {
        await enviarCanal(canal);
      } catch (erro) {
        if (erro?.message === 'conflito') {
          try { await enviarCanal(canal, { forcar: true }); } catch { pendente = false; }
        }
      }
    }
  } finally {
    enviando = false;
    if (pendente) { pendente = false; agendarEnvio(1200); }
  }
}

export function agendarEnvio(atraso = 4000) {
  if (!syncDisponivel || Object.keys(lerVinculos()).length === 0) return;
  clearTimeout(temporizador);
  temporizador = setTimeout(drenar, atraso);
}

let automaticoLigado = false;

async function olharCanal(canal, vinculo) {
  try {
    const resposta = await chamar(`/api/sync?codeHash=${await hashDoSegredo(vinculo.segredo)}`);
    if (!resposta) return null;
    if (Number(resposta.revision) <= Number(vinculo.revision ?? 0)) return null;
    return { canal, vinculo, resposta };
  } catch {
    return null;
  }
}

export async function buscarNaAbertura() {
  if (!syncDisponivel) return null;
  const vinculos = Object.entries(lerVinculos()).filter(([, v]) => v?.segredo);
  if (vinculos.length === 0) return null;

  const achados = (await Promise.all(vinculos.map(([canal, v]) => olharCanal(canal, v)))).filter(Boolean);
  if (achados.length === 0) return null;

  achados.sort((a, b) => String(b.resposta.updatedAt ?? '').localeCompare(String(a.resposta.updatedAt ?? '')));
  const { canal, vinculo, resposta } = achados[0];

  try {
    importData(await decifrar(vinculo.segredo, resposta));
  } catch {
    return null;
  }

  gravarVinculo(canal, { ...vinculo, revision: resposta.revision, recebidoEm: new Date().toISOString() });
  return { canal, revision: resposta.revision };
}

export function iniciarEnvioAutomatico() {
  if (automaticoLigado || !syncDisponivel) return;
  automaticoLigado = true;
  buscarNaAbertura();
  subscribe(() => agendarEnvio());
  addEventListener('pagehide', () => {
    if (temporizador) { clearTimeout(temporizador); drenar(); }
  });
}

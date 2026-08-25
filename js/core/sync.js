import { exportData, importData, subscribe } from './store.js';
import { currentAccount, createAccount, continueAsGuest } from './account.js';
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

const bytesParaBase64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const base64ParaBytes = (texto) => Uint8Array.from(atob(texto), (c) => c.charCodeAt(0));

async function hashDoCodigo(codigo) {
  const dados = new TextEncoder().encode(`dynamick-sync-v1:${normalizarCodigo(codigo)}`);
  const digest = await crypto.subtle.digest('SHA-256', dados);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function derivarChave(codigo, salt) {
  const base = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(normalizarCodigo(codigo)),
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

async function cifrar(codigo, texto) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const chave = await derivarChave(codigo, salt);
  const cifrado = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    chave,
    new TextEncoder().encode(texto),
  );
  return { ciphertext: bytesParaBase64(cifrado), iv: bytesParaBase64(iv), salt: bytesParaBase64(salt) };
}

async function decifrar(codigo, { ciphertext, iv, salt }) {
  const chave = await derivarChave(codigo, base64ParaBytes(salt));
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

export function vinculoAtual() {
  try {
    return JSON.parse(localStorage.getItem(chaveDoVinculo()) ?? 'null');
  } catch {
    return null;
  }
}

function gravarVinculo(vinculo) {
  try {
    const chave = chaveDoVinculo();
    if (vinculo) localStorage.setItem(chave, JSON.stringify(vinculo));
    else localStorage.removeItem(chave);
  } catch {

  }
}

export function desvincular() {
  gravarVinculo(null);
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
  if (!resposta.ok) throw new ErroDeSync(`O servidor respondeu ${resposta.status}.`);

  return resposta.json();
}

export async function enviar({ forcar = false } = {}) {
  const vinculo = vinculoAtual();
  if (!vinculo) throw new ErroDeSync('Este aparelho ainda não tem um código de sincronização.');

  const corpo = await cifrar(vinculo.codigo, montarPacote());

  const resultado = await chamar('/api/sync', {
    method: 'PUT',
    body: JSON.stringify({
      codeHash: await hashDoCodigo(vinculo.codigo),
      ...corpo,
      revision: forcar ? null : (vinculo.revision ?? 0),
    }),
  });

  gravarVinculo({ ...vinculo, revision: resultado.revision, enviadoEm: new Date().toISOString() });
  return resultado;
}

function montarPacote() {
  const estado = JSON.parse(exportData());
  const conta = currentAccount();
  if (conta) estado.conta = { nome: conta.name, email: conta.email ?? '' };
  return JSON.stringify(estado);
}

async function baixarPacote(codigo) {
  const resposta = await chamar(`/api/sync?codeHash=${await hashDoCodigo(codigo)}`);
  if (!resposta) return null;
  let texto;
  try {
    texto = await decifrar(codigo, resposta);
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
  const usar = codigo ?? vinculo?.codigo;
  if (!usar) throw new ErroDeSync('Nenhum código informado.');
  const pacote = await baixarPacote(usar);
  if (!pacote) return null;
  importData(pacote.texto);
  gravarVinculo({ codigo: normalizarCodigo(usar), revision: pacote.revision, recebidoEm: new Date().toISOString() });
  return { revision: pacote.revision, atualizadoEm: pacote.atualizadoEm };
}

export async function entrarComCodigo(codigo) {
  if (!codigoValido(codigo)) throw new ErroDeSync('Esse código não tem o formato esperado.');
  const pacote = await baixarPacote(codigo);
  if (!pacote) throw new ErroDeSync('Não encontramos nada gravado com esse código.');

  const nome = pacote.conta?.nome?.trim();
  if (nome) await createAccount({ name: nome, email: pacote.conta.email ?? '' });
  else continueAsGuest();

  importData(pacote.texto);
  gravarVinculo({ codigo: normalizarCodigo(codigo), revision: pacote.revision, recebidoEm: new Date().toISOString() });
  return { revision: pacote.revision, atualizadoEm: pacote.atualizadoEm, nome: nome ?? null };
}

export async function vincularNovo() {
  const codigo = gerarCodigo();
  gravarVinculo({ codigo: normalizarCodigo(codigo), revision: 0 });
  await enviar({ forcar: true });
  return codigo;
}

export async function vincularExistente(codigo) {
  if (!codigoValido(codigo)) throw new ErroDeSync('Esse código não tem o formato esperado.');
  const resultado = await receber(codigo);
  if (!resultado) throw new ErroDeSync('Não encontramos nada gravado com esse código.');
  return resultado;
}

export async function apagarNoServidor() {
  const vinculo = vinculoAtual();
  if (!vinculo) return false;
  await chamar(`/api/sync?codeHash=${await hashDoCodigo(vinculo.codigo)}`, { method: 'DELETE' });
  desvincular();
  return true;
}

export const _internals = { hashDoCodigo, cifrar, decifrar, derivarChave };

let temporizador = null;
let enviando = false;
let pendente = false;

async function drenar() {
  if (enviando) { pendente = true; return; }
  enviando = true;
  try {
    await enviar();
  } catch (erro) {
    if (erro?.message === 'conflito') {
      try { await enviar({ forcar: true }); } catch { pendente = false; }
    }
  } finally {
    enviando = false;
    if (pendente) { pendente = false; agendarEnvio(1200); }
  }
}

export function agendarEnvio(atraso = 4000) {
  if (!syncDisponivel || !vinculoAtual()) return;
  clearTimeout(temporizador);
  temporizador = setTimeout(drenar, atraso);
}

let automaticoLigado = false;

export async function buscarNaAbertura() {
  const vinculo = vinculoAtual();
  if (!syncDisponivel || !vinculo) return null;
  let resposta;
  try {
    resposta = await chamar(`/api/sync?codeHash=${await hashDoCodigo(vinculo.codigo)}`);
  } catch {
    return null;
  }
  if (!resposta || Number(resposta.revision) <= Number(vinculo.revision ?? 0)) return null;
  try {
    const texto = await decifrar(vinculo.codigo, resposta);
    importData(texto);
    gravarVinculo({ ...vinculo, revision: resposta.revision, recebidoEm: new Date().toISOString() });
    return { revision: resposta.revision };
  } catch {
    return null;
  }
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

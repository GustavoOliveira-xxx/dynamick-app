/**
 * Contas locais.
 *
 * O que isto é, dito sem rodeio: uma conta do Dynamic CK vive NESTE navegador.
 * Não há servidor de autenticação, não há e-mail de confirmação e não há
 * recuperação de senha por e-mail — prometer qualquer uma dessas coisas seria
 * mentira, porque não existe back-end que as sustente.
 *
 * O que a conta resolve de verdade:
 *  - separar mais de um estudante no mesmo aparelho (irmãos, laboratório de
 *    escola, computador compartilhado), cada um com seu progresso;
 *  - dar uma porta de entrada de verdade — "Entrar" volta para o estudo,
 *    em vez de jogar todo mundo no onboarding de novo;
 *  - guardar a senha como derivação PBKDF2 com sal, nunca em texto claro, para
 *    que ler o armazenamento local não entregue a senha de ninguém.
 *
 * Para levar o progresso a outro aparelho existe a sincronização por código
 * (js/core/sync.js), que é cifrada de ponta a ponta. A conta local e o código
 * de sincronização são coisas diferentes e a interface diz isso.
 */

import { setNamespace, clearNamespace, hasLegacyState, adoptLegacyState } from './store.js';

const ACCOUNTS_KEY = 'dynamick:accounts:v1';
const SESSION_KEY = 'dynamick:session:v1';

const ITERATIONS = 210000; // PBKDF2-SHA256, alinhado à recomendação da OWASP
const GUEST_ID = 'convidado';

/** Sem crypto.subtle (contexto não seguro) a senha não pode ser protegida. */
export const suportaSenha = Boolean(globalThis.crypto?.subtle);

/* ---------------------------------------------------------------- Armazenamento */

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function readAccounts() {
  const data = readJson(ACCOUNTS_KEY, null);
  if (!data || !Array.isArray(data.accounts)) return [];
  return data.accounts;
}

function writeAccounts(accounts) {
  return writeJson(ACCOUNTS_KEY, { version: 1, accounts });
}

/* ---------------------------------------------------------------- Senha */

function toBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function fromBase64(text) {
  return Uint8Array.from(atob(text), (character) => character.codePointAt(0));
}

async function derive(password, salt, iterations = ITERATIONS) {
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    material,
    256,
  );
  return toBase64(bits);
}

/** Comparação em tempo constante: não vaza o quanto o palpite chegou perto. */
function equals(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) {
    diff |= a.codePointAt(index) ^ b.codePointAt(index);
  }
  return diff === 0;
}

/* ---------------------------------------------------------------- Consultas */

/** Dados públicos das contas — nunca devolve sal nem hash. */
export function listAccounts() {
  return readAccounts()
    .map(({ id, name, email, createdAt, lastLoginAt, protegida }) => ({
      id,
      name,
      email: email ?? '',
      createdAt,
      lastLoginAt: lastLoginAt ?? null,
      protegida: Boolean(protegida),
    }))
    .sort((a, b) => String(b.lastLoginAt ?? '').localeCompare(String(a.lastLoginAt ?? '')));
}

export function accountCount() {
  return readAccounts().length;
}

function findRaw(identifier) {
  const needle = String(identifier ?? '').trim().toLowerCase();
  if (!needle) return null;
  return (
    readAccounts().find(
      (account) =>
        account.id === identifier ||
        String(account.email ?? '').toLowerCase() === needle ||
        String(account.name ?? '').toLowerCase() === needle,
    ) ?? null
  );
}

export function currentSession() {
  const session = readJson(SESSION_KEY, null);
  if (!session?.accountId) return null;
  if (session.accountId === GUEST_ID) return { accountId: GUEST_ID, guest: true, since: session.since };
  const account = readAccounts().find((item) => item.id === session.accountId);
  if (!account) return null; // conta apagada em outra aba
  return { accountId: account.id, guest: false, since: session.since };
}

/** Conta ativa em formato público, ou null quando ninguém entrou. */
export function currentAccount() {
  const session = currentSession();
  if (!session) return null;
  if (session.guest) {
    return { id: GUEST_ID, name: '', email: '', guest: true, protegida: false };
  }
  const account = readAccounts().find((item) => item.id === session.accountId);
  return account
    ? {
        id: account.id,
        name: account.name,
        email: account.email ?? '',
        guest: false,
        protegida: Boolean(account.protegida),
        createdAt: account.createdAt,
        lastLoginAt: account.lastLoginAt ?? null,
      }
    : null;
}

export function isSignedIn() {
  return currentSession() !== null;
}

/* ---------------------------------------------------------------- Sessão */

function openSession(accountId) {
  writeJson(SESSION_KEY, { accountId, since: new Date().toISOString() });
  setNamespace(accountId);
}

/**
 * Liga o store ao espaço da conta ativa.
 * Chamado no início de cada página, ANTES de qualquer leitura de estado.
 */
export function bindActiveAccount() {
  const session = currentSession();
  if (!session) {
    clearNamespace();
    return null;
  }
  setNamespace(session.accountId);
  return session;
}

export function signOut() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* sem armazenamento não há sessão para remover */
  }
  clearNamespace();
}

/* ---------------------------------------------------------------- Escrita */

export function validateName(name) {
  const clean = String(name ?? '').trim();
  if (clean.length < 2) return 'Escreva pelo menos duas letras.';
  if (clean.length > 60) return 'Use no máximo 60 caracteres.';
  return null;
}

export function validateEmail(email) {
  const clean = String(email ?? '').trim();
  if (!clean) return null; // e-mail é opcional
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)) return 'Verifique o endereço digitado.';
  if (clean.length > 120) return 'Endereço longo demais.';
  return null;
}

export function validatePassword(password) {
  const value = String(password ?? '');
  if (value.length < 6) return 'A senha precisa de pelo menos 6 caracteres.';
  if (value.length > 200) return 'Senha longa demais.';
  return null;
}

/**
 * Cria uma conta e entra nela.
 * @param {{name: string, email?: string, password?: string}} input
 */
export async function createAccount({ name, email = '', password = '' }) {
  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();

  const problem = validateName(cleanName) ?? validateEmail(cleanEmail);
  if (problem) throw new Error(problem);

  if (cleanEmail && findRaw(cleanEmail)) {
    throw new Error('Já existe uma conta com esse e-mail neste navegador.');
  }
  if (!cleanEmail && findRaw(cleanName)) {
    throw new Error('Já existe uma conta com esse nome neste navegador. Adicione um e-mail para diferenciar.');
  }

  const wantsPassword = Boolean(password) && suportaSenha;
  if (password && !suportaSenha) {
    throw new Error('Este navegador não permite proteger a senha com segurança aqui. Crie a conta sem senha.');
  }
  if (wantsPassword) {
    const invalid = validatePassword(password);
    if (invalid) throw new Error(invalid);
  }

  const id = `acc_${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`.replace(/-/g, '');
  const account = {
    id,
    name: cleanName,
    email: cleanEmail,
    protegida: wantsPassword,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  if (wantsPassword) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    account.salt = toBase64(salt);
    account.iterations = ITERATIONS;
    account.hash = await derive(password, salt, ITERATIONS);
  }

  const accounts = readAccounts();
  const first = accounts.length === 0;
  accounts.push(account);
  if (!writeAccounts(accounts)) {
    throw new Error('Não foi possível salvar a conta neste navegador. Verifique o espaço disponível.');
  }

  openSession(id);

  // Quem já estudava antes de existir conta não perde nada: o progresso que
  // estava solto no navegador passa a pertencer à primeira conta criada.
  if (first && hasLegacyState()) adoptLegacyState(id);

  return currentAccount();
}

/**
 * Entra em uma conta existente.
 * @param {{identifier: string, password?: string}} input  identifier = e-mail ou nome
 */
export async function signIn({ identifier, password = '' }) {
  const account = findRaw(identifier);
  if (!account) throw new Error('Não encontramos essa conta neste navegador.');

  if (account.protegida) {
    if (!password) throw new Error('Digite a senha desta conta.');
    if (!suportaSenha) {
      throw new Error('Este navegador não consegue verificar a senha aqui. Abra o site por https.');
    }
    const hash = await derive(password, fromBase64(account.salt), account.iterations ?? ITERATIONS);
    if (!equals(hash, account.hash)) throw new Error('Senha incorreta.');
  }

  const accounts = readAccounts().map((item) =>
    item.id === account.id ? { ...item, lastLoginAt: new Date().toISOString() } : item,
  );
  writeAccounts(accounts);
  openSession(account.id);
  return currentAccount();
}

/** Entrada sem conta: estuda agora, decide depois. O progresso fica separado. */
export function continueAsGuest() {
  openSession(GUEST_ID);
  if (hasLegacyState()) adoptLegacyState(GUEST_ID);
  return currentAccount();
}

/** Transforma a sessão de convidado em conta, levando o progresso junto. */
export async function upgradeGuest({ name, email = '', password = '' }) {
  const session = currentSession();
  if (!session?.guest) throw new Error('Esta sessão já pertence a uma conta.');

  const account = await createAccount({ name, email, password });
  adoptLegacyState(account.id, GUEST_ID);
  setNamespace(account.id);
  return account;
}

/** Renomeia a conta ativa. O nome do estudante continua vindo do onboarding. */
export function renameAccount(id, { name, email }) {
  const problem = validateName(name) ?? validateEmail(email ?? '');
  if (problem) throw new Error(problem);

  const accounts = readAccounts().map((item) =>
    item.id === id ? { ...item, name: String(name).trim(), email: String(email ?? '').trim() } : item,
  );
  writeAccounts(accounts);
  return currentAccount();
}

/**
 * Remove a conta e todo o estudo ligado a ela.
 * Irreversível de propósito: exclusão de conta que não apaga dado é teatro.
 */
export function deleteAccount(id) {
  const accounts = readAccounts().filter((item) => item.id !== id);
  writeAccounts(accounts);
  try {
    window.localStorage.removeItem(`dynamick:v1:${id}`);
  } catch {
    /* nada a fazer se o navegador bloqueia */
  }
  if (currentSession()?.accountId === id) signOut();
}

export { GUEST_ID };

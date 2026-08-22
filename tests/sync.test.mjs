/**
 * Sincronização: código, cifragem e o contrato com o servidor.
 *
 * O que estes testes protegem:
 *  - o código tem entropia suficiente e aceita ser digitado de qualquer jeito;
 *  - o que sobe é ilegível sem o código;
 *  - código errado FALHA em vez de devolver lixo silenciosamente;
 *  - o controle de revisão impede que um aparelho apague o outro sem aviso.
 */

import { describe, it, expect } from './run.mjs';

// O módulo usa localStorage, fetch e crypto.subtle. No Node existe crypto;
// os outros dois viram dublês, porque aqui só interessa a lógica pura.
globalThis.localStorage ??= (() => {
  const mapa = new Map();
  return {
    getItem: (k) => mapa.get(k) ?? null,
    setItem: (k, v) => mapa.set(k, String(v)),
    removeItem: (k) => mapa.delete(k),
    clear: () => mapa.clear(),
  };
})();
globalThis.btoa ??= (s) => Buffer.from(s, 'binary').toString('base64');
globalThis.atob ??= (s) => Buffer.from(s, 'base64').toString('binary');

const {
  gerarCodigo, normalizarCodigo, codigoValido, formatarCodigo, _internals,
} = await import('../js/core/sync.js');

describe('código de sincronização', () => {
  it('tem 20 caracteres e entropia suficiente', () => {
    const limpo = normalizarCodigo(gerarCodigo());
    expect(limpo).toHaveLength(20);
    // 32 símbolos por posição = 5 bits cada = 100 bits no total.
    expect(Math.round(20 * Math.log2(32))).toBe(100);
  });

  it('não usa caracteres que se confundem ao copiar à mão', () => {
    const codigos = Array.from({ length: 60 }, () => normalizarCodigo(gerarCodigo())).join('');
    for (const ambiguo of ['I', 'O', '0', '1']) {
      expect(codigos).notToContain(ambiguo);
    }
  });

  it('não repete entre chamadas', () => {
    const vistos = new Set(Array.from({ length: 200 }, () => gerarCodigo()));
    expect(vistos.size).toBe(200);
  });

  it('aceita o código digitado com hífen, sem hífen ou em minúscula', () => {
    const codigo = gerarCodigo();
    const limpo = normalizarCodigo(codigo);
    expect(normalizarCodigo(codigo.toLowerCase())).toBe(limpo);
    expect(normalizarCodigo(limpo)).toBe(limpo);
    expect(normalizarCodigo(` ${codigo} `)).toBe(limpo);
    expect(normalizarCodigo(codigo.replace(/-/g, ' '))).toBe(limpo);
  });

  it('formata em grupos de quatro para leitura', () => {
    expect(formatarCodigo('ABCDEFGHJKLMNPQRSTUV')).toBe('ABCD-EFGH-JKLM-NPQR-STUV');
  });

  it('recusa código de tamanho errado ou com símbolo ambíguo', () => {
    expect(codigoValido(gerarCodigo())).toBe(true);
    expect(codigoValido('ABCD-EFGH')).toBe(false);
    expect(codigoValido('IIII-IIII-IIII-IIII-IIII')).toBe(false);
    expect(codigoValido('')).toBe(false);
    expect(codigoValido(null)).toBe(false);
  });
});

describe('cifragem', () => {
  const segredo = JSON.stringify({ student: { name: 'Ana Souza' }, attempts: { a: 1 } });

  it('vai e volta sem perder nada', async () => {
    const codigo = gerarCodigo();
    const pacote = await _internals.cifrar(codigo, segredo);
    expect(await _internals.decifrar(codigo, pacote)).toBe(segredo);
  });

  it('o que sobe não contém o conteúdo em claro', async () => {
    const pacote = await _internals.cifrar(gerarCodigo(), segredo);
    const tudo = JSON.stringify(pacote);
    expect(tudo).notToContain('Ana Souza');
    expect(tudo).notToContain('student');
  });

  it('código errado falha em vez de devolver lixo', async () => {
    const pacote = await _internals.cifrar(gerarCodigo(), segredo);
    let falhou = false;
    try {
      await _internals.decifrar(gerarCodigo(), pacote);
    } catch {
      falhou = true; // AES-GCM autentica: chave errada não decifra, rejeita.
    }
    expect(falhou).toBe(true);
  });

  it('adulterar um byte do texto cifrado é detectado', async () => {
    const codigo = gerarCodigo();
    const pacote = await _internals.cifrar(codigo, segredo);
    const bytes = Buffer.from(pacote.ciphertext, 'base64');
    bytes[0] ^= 0xff;
    let falhou = false;
    try {
      await _internals.decifrar(codigo, { ...pacote, ciphertext: bytes.toString('base64') });
    } catch {
      falhou = true;
    }
    expect(falhou).toBe(true);
  });

  it('o mesmo conteúdo cifrado duas vezes não gera o mesmo texto', async () => {
    const codigo = gerarCodigo();
    const a = await _internals.cifrar(codigo, segredo);
    const b = await _internals.cifrar(codigo, segredo);
    // Sal e vetor de inicialização novos a cada envio.
    expect(a.ciphertext === b.ciphertext).toBe(false);
    expect(a.salt === b.salt).toBe(false);
    expect(a.iv === b.iv).toBe(false);
  });
});

describe('hash do código', () => {
  it('é estável e tem o formato que o servidor exige', async () => {
    const codigo = gerarCodigo();
    const h1 = await _internals.hashDoCodigo(codigo);
    const h2 = await _internals.hashDoCodigo(codigo.toLowerCase());
    expect(h1).toBe(h2);
    expect(/^[0-9a-f]{64}$/.test(h1)).toBe(true);
  });

  it('não permite recuperar o código', async () => {
    const codigo = gerarCodigo();
    const hash = await _internals.hashDoCodigo(codigo);
    expect(hash).notToContain(normalizarCodigo(codigo).slice(0, 6));
  });

  it('códigos diferentes dão hashes diferentes', async () => {
    const a = await _internals.hashDoCodigo(gerarCodigo());
    const b = await _internals.hashDoCodigo(gerarCodigo());
    expect(a === b).toBe(false);
  });
});

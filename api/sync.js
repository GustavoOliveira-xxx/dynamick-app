/**
 * Sincronização entre aparelhos — função serverless (Vercel).
 *
 * Este arquivo é deliberadamente burro. Ele guarda e devolve um bloco de texto
 * cifrado, indexado pelo hash de um código que ele nunca vê. Não sabe quem é o
 * estudante, não consegue ler o conteúdo e não tem o que vazar além de bytes
 * opacos.
 *
 * GET  /api/sync?codeHash=<64 hex>  → devolve o snapshot, ou 404
 * PUT  /api/sync                    → grava, com controle otimista de versão
 * DELETE /api/sync?codeHash=<...>   → apaga
 *
 * A credencial do banco vive em DATABASE_URL, variável de ambiente do projeto.
 * Ela nunca chega ao navegador: é justamente por isso que esta função existe.
 */

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

/** ~1,5 MB de texto cifrado. Um estado real fica em alguns KB; isto é teto de abuso. */
const LIMITE_BYTES = 1_500_000;
const HASH = /^[0-9a-f]{64}$/;
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

function json(res, status, corpo) {
  res.status(status);
  res.setHeader('content-type', 'application/json; charset=utf-8');
  // Snapshot é dado de uma pessoa só: nunca em cache compartilhado.
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(corpo));
}

/** Base64 válido e dentro do limite. Evita gravar lixo ou encher o banco. */
function base64Valido(valor, maximo) {
  return typeof valor === 'string'
    && valor.length > 0
    && valor.length <= maximo
    && BASE64.test(valor);
}

export default async function handler(req, res) {
  // Mesma origem no Vercel (estático e API convivem), então não há CORS a abrir.
  res.setHeader('vary', 'origin');

  try {
    if (req.method === 'GET') return await ler(req, res);
    if (req.method === 'PUT') return await gravar(req, res);
    if (req.method === 'DELETE') return await apagar(req, res);
    res.setHeader('allow', 'GET, PUT, DELETE');
    return json(res, 405, { erro: 'Método não suportado.' });
  } catch (erro) {
    // A mensagem real fica no log; o cliente recebe algo que não vaza estrutura.
    console.error('falha em /api/sync', erro);
    return json(res, 500, { erro: 'Falha interna ao sincronizar.' });
  }
}

async function ler(req, res) {
  const codeHash = req.query?.codeHash;
  if (!HASH.test(codeHash ?? '')) return json(res, 400, { erro: 'codeHash inválido.' });

  const linhas = await sql`
    UPDATE sync_snapshots
       SET last_seen_at = now()
     WHERE code_hash = ${codeHash}
    RETURNING ciphertext, iv, salt, revision, updated_at
  `;
  if (linhas.length === 0) return json(res, 404, { erro: 'Nada gravado com este código.' });

  const linha = linhas[0];
  return json(res, 200, {
    ciphertext: linha.ciphertext,
    iv: linha.iv,
    salt: linha.salt,
    revision: Number(linha.revision),
    updatedAt: linha.updated_at,
  });
}

async function gravar(req, res) {
  const corpo = req.body ?? {};
  const { codeHash, ciphertext, iv, salt, revision } = corpo;

  if (!HASH.test(codeHash ?? '')) return json(res, 400, { erro: 'codeHash inválido.' });
  if (!base64Valido(ciphertext, LIMITE_BYTES)) {
    const grande = typeof ciphertext === 'string' && ciphertext.length > LIMITE_BYTES;
    return json(res, grande ? 413 : 400, { erro: grande ? 'Conteúdo grande demais.' : 'ciphertext inválido.' });
  }
  if (!base64Valido(iv, 32) || !base64Valido(salt, 64)) {
    return json(res, 400, { erro: 'iv ou salt inválido.' });
  }

  const bytes = ciphertext.length;

  // revision null significa "sobrescreva mesmo assim", escolhido pelo estudante
  // depois de um aviso na interface.
  if (revision === null || revision === undefined) {
    const linhas = await sql`
      INSERT INTO sync_snapshots (code_hash, ciphertext, iv, salt, bytes)
      VALUES (${codeHash}, ${ciphertext}, ${iv}, ${salt}, ${bytes})
      ON CONFLICT (code_hash) DO UPDATE
        SET ciphertext = EXCLUDED.ciphertext,
            iv         = EXCLUDED.iv,
            salt       = EXCLUDED.salt,
            bytes      = EXCLUDED.bytes,
            revision   = sync_snapshots.revision + 1,
            updated_at = now(),
            last_seen_at = now()
      RETURNING revision, updated_at
    `;
    return json(res, 200, { revision: Number(linhas[0].revision), updatedAt: linhas[0].updated_at });
  }

  if (!Number.isInteger(revision) || revision < 0) {
    return json(res, 400, { erro: 'revision inválida.' });
  }

  // Primeira gravação deste código: só passa se ninguém tiver criado antes.
  if (revision === 0) {
    const linhas = await sql`
      INSERT INTO sync_snapshots (code_hash, ciphertext, iv, salt, bytes)
      VALUES (${codeHash}, ${ciphertext}, ${iv}, ${salt}, ${bytes})
      ON CONFLICT (code_hash) DO NOTHING
      RETURNING revision, updated_at
    `;
    if (linhas.length === 0) return json(res, 409, { erro: 'Já existe algo mais novo neste código.' });
    return json(res, 200, { revision: Number(linhas[0].revision), updatedAt: linhas[0].updated_at });
  }

  // Atualização normal: só avança se a revisão bater com a que o aparelho viu.
  const linhas = await sql`
    UPDATE sync_snapshots
       SET ciphertext = ${ciphertext},
           iv         = ${iv},
           salt       = ${salt},
           bytes      = ${bytes},
           revision   = revision + 1,
           updated_at = now(),
           last_seen_at = now()
     WHERE code_hash = ${codeHash}
       AND revision  = ${revision}
    RETURNING revision, updated_at
  `;
  if (linhas.length === 0) return json(res, 409, { erro: 'Já existe algo mais novo neste código.' });
  return json(res, 200, { revision: Number(linhas[0].revision), updatedAt: linhas[0].updated_at });
}

async function apagar(req, res) {
  const codeHash = req.query?.codeHash;
  if (!HASH.test(codeHash ?? '')) return json(res, 400, { erro: 'codeHash inválido.' });
  await sql`DELETE FROM sync_snapshots WHERE code_hash = ${codeHash}`;
  return json(res, 200, { apagado: true });
}

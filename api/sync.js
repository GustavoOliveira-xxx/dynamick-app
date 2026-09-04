import { neon } from '@neondatabase/serverless';

/**
 * Nomes aceitos para a conexão, na ordem em que são procurados. DATABASE_URL é
 * o que a integração Neon-Vercel cria sozinha; os outros cobrem instalações
 * antigas e o painel de Postgres da Vercel.
 */
const VARIAVEIS = [
  'DATABASE_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'NEON_DATABASE_URL',
];

let cache = null;

/**
 * A conexão é resolvida a cada chamada, e não uma vez no carregamento do
 * módulo: assim basta definir a variável e publicar de novo, sem depender de
 * qual instância da função continuou viva.
 */
function conectar() {
  const variavel = VARIAVEIS.find((nome) => String(process.env[nome] ?? '').trim().length > 0);
  if (!variavel) return null;

  const url = process.env[variavel].trim();
  if (cache?.url !== url) cache = { url, sql: neon(url) };
  return cache.sql;
}

const LIMITE_BYTES = 1_500_000;
const HASH = /^[0-9a-f]{64}$/;
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

function json(res, status, corpo) {
  res.status(status);
  res.setHeader('content-type', 'application/json; charset=utf-8');

  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(corpo));
}

function base64Valido(valor, maximo) {
  return typeof valor === 'string'
    && valor.length > 0
    && valor.length <= maximo
    && BASE64.test(valor);
}

export default async function handler(req, res) {

  res.setHeader('vary', 'origin');

  const sql = conectar();

  if (!sql) {
    // Só acontece quando o projeto foi publicado sem a variável do banco.
    // A mensagem diz o que fazer em vez de sugerir esperar por uma falha
    // passageira, que era o que a versão anterior pedia.
    console.error(`/api/sync sem banco: defina uma destas variáveis — ${VARIAVEIS.join(', ')}`);
    return json(res, 503, {
      erro: 'A sincronização ainda não foi ligada nesta publicação: falta a variável DATABASE_URL apontando para o banco Neon.',
    });
  }

  try {
    if (req.method === 'GET') return await ler(sql, req, res);
    if (req.method === 'PUT') return await gravar(sql, req, res);
    if (req.method === 'DELETE') return await apagar(sql, req, res);
    res.setHeader('allow', 'GET, PUT, DELETE');
    return json(res, 405, { erro: 'Método não suportado.' });
  } catch (erro) {

    console.error('falha em /api/sync', erro);
    if (/relation .*sync_snapshots.* does not exist/i.test(String(erro?.message ?? ''))) {
      return json(res, 503, {
        erro: 'O banco ainda não tem a tabela sync_snapshots. Rode db/01-esquema.sql antes de sincronizar.',
      });
    }
    return json(res, 500, { erro: 'Falha interna ao sincronizar.' });
  }
}

async function ler(sql, req, res) {
  const codeHash = req.query?.codeHash;
  if (!HASH.test(codeHash ?? '')) return json(res, 400, { erro: 'codeHash inválido.' });

  const linhas = await sql`
    SELECT ciphertext, iv, salt, revision, updated_at, last_seen_at
      FROM sync_snapshots
     WHERE code_hash = ${codeHash}
  `;
  if (linhas.length === 0) return json(res, 404, { erro: 'Nada gravado com este código.' });

  const linha = linhas[0];

  // O carimbo só serve para a limpeza anual, então uma vez por dia basta.
  // Atualizar a cada leitura transformava toda abertura do app numa escrita.
  if (Date.now() - new Date(linha.last_seen_at).getTime() > 86400000) {
    await sql`UPDATE sync_snapshots SET last_seen_at = now() WHERE code_hash = ${codeHash}`;
  }

  return json(res, 200, {
    ciphertext: linha.ciphertext,
    iv: linha.iv,
    salt: linha.salt,
    revision: Number(linha.revision),
    updatedAt: linha.updated_at,
  });
}

async function gravar(sql, req, res) {
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

async function apagar(sql, req, res) {
  const codeHash = req.query?.codeHash;
  if (!HASH.test(codeHash ?? '')) return json(res, 400, { erro: 'codeHash inválido.' });
  await sql`DELETE FROM sync_snapshots WHERE code_hash = ${codeHash}`;
  return json(res, 200, { apagado: true });
}

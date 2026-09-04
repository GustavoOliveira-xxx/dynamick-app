import { neon } from '@neondatabase/serverless';

const VARIAVEIS = [
  'DATABASE_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'NEON_DATABASE_URL',
];

let cache = null;

/** Mesma resolução preguiçosa de /api/sync. */
function conectar() {
  const variavel = VARIAVEIS.find((nome) => String(process.env[nome] ?? '').trim().length > 0);
  if (!variavel) return null;

  const url = process.env[variavel].trim();
  if (cache?.url !== url) cache = { url, sql: neon(url) };
  return cache.sql;
}

const MESES_ATE_EXPIRAR = 12;

export default async function handler(req, res) {
  const sql = conectar();

  if (!sql) {
    res.status(503).json({ erro: 'Banco de sincronização não configurado: falta DATABASE_URL.' });
    return;
  }

  const segredo = process.env.CRON_SECRET;
  const enviado = req.headers?.authorization;

  if (!segredo) {
    res.status(503).json({ erro: 'CRON_SECRET não configurado.' });
    return;
  }
  if (enviado !== `Bearer ${segredo}`) {
    res.status(401).json({ erro: 'Não autorizado.' });
    return;
  }

  try {
    const apagados = await sql`
      DELETE FROM sync_snapshots
       WHERE last_seen_at < now() - ${`${MESES_ATE_EXPIRAR} months`}::interval
      RETURNING code_hash
    `;

    console.log(`limpeza: ${apagados.length} snapshot(s) expirado(s)`);
    res.status(200).json({ apagados: apagados.length });
  } catch (erro) {
    console.error('falha na limpeza', erro);
    res.status(500).json({ erro: 'Falha ao limpar.' });
  }
}

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const MESES_ATE_EXPIRAR = 12;

export default async function handler(req, res) {
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

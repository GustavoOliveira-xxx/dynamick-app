/**
 * Expiração de snapshots abandonados — roda por agendamento (Vercel Cron).
 *
 * Um código que ninguém lê nem grava há um ano é, quase certamente, de alguém
 * que trocou de aparelho, limpou o navegador ou parou de estudar. Guardar isso
 * para sempre acumula dado de gente que não pediu para continuar guardado.
 *
 * A página de privacidade diz que registros abandonados somem sozinhos. É esta
 * função que torna aquela frase verdadeira.
 *
 * Protegida por CRON_SECRET: sem isso, qualquer pessoa poderia disparar.
 */

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

/** Um ano sem nenhuma leitura nem gravação. */
const MESES_ATE_EXPIRAR = 12;

export default async function handler(req, res) {
  const segredo = process.env.CRON_SECRET;
  const enviado = req.headers?.authorization;

  // Sem segredo configurado a rotina não roda: melhor não limpar do que
  // deixar um endereço que apaga dados aberto para qualquer um.
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
    // Só a contagem no log: o hash identificaria o registro de alguém.
    console.log(`limpeza: ${apagados.length} snapshot(s) expirado(s)`);
    res.status(200).json({ apagados: apagados.length });
  } catch (erro) {
    console.error('falha na limpeza', erro);
    res.status(500).json({ erro: 'Falha ao limpar.' });
  }
}

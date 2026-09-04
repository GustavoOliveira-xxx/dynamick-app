/**
 * Aplica db/02-sync.sql no banco apontado por DATABASE_URL.
 *
 *   DATABASE_URL="postgresql://..." npm run db:migrar
 *
 * É seguro rodar quantas vezes quiser: o arquivo só cria o que ainda não
 * existe e nunca apaga dados.
 */
import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const VARIAVEIS = [
  'DATABASE_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'NEON_DATABASE_URL',
];

const variavel = VARIAVEIS.find((nome) => String(process.env[nome] ?? '').trim().length > 0);

if (!variavel) {
  console.error(
    `Nenhuma string de conexão encontrada.\n` +
      `Defina uma destas variáveis: ${VARIAVEIS.join(', ')}\n` +
      `A do Neon está em console.neon.tech › seu projeto › Connect.`,
  );
  process.exit(1);
}

const sql = neon(process.env[variavel].trim());
const caminho = new URL('./02-sync.sql', import.meta.url);
const arquivo = await readFile(caminho, 'utf8');

// Divide em comandos, ignorando comentários e linhas vazias.
const comandos = arquivo
  .split('\n')
  .filter((linha) => !linha.trimStart().startsWith('--'))
  .join('\n')
  .split(';')
  .map((comando) => comando.trim())
  .filter(Boolean);

console.log(`Aplicando db/02-sync.sql (${comandos.length} comandos) usando ${variavel}…`);

for (const comando of comandos) {
  const resumo = comando.replace(/\s+/g, ' ').slice(0, 68);
  try {
    // O driver HTTP do Neon é uma tagged template. Passar o comando como um
    // array de um elemento manda o SQL literal, sem parâmetros — que é
    // exatamente o que uma migração precisa.
    await sql([comando]);
    console.log(`  ok    ${resumo}…`);
  } catch (erro) {
    console.error(`  FALHA ${resumo}…\n        ${erro.message}`);
    process.exit(1);
  }
}

const [linha] = await sql`SELECT count(*)::int AS pacotes FROM sync_snapshots`;
console.log(`\nPronto. A tabela sync_snapshots existe e guarda ${linha.pacotes} pacote(s).`);

import { neon } from '@neondatabase/serverless';

/** Mesma lista aceita por /api/sync. */
const VARIAVEIS = [
  'DATABASE_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'NEON_DATABASE_URL',
];

/**
 * Diz, em uma requisição, se a sincronização entre aparelhos está de pé.
 *
 * Sem isto, a única forma de descobrir por que o celular não entra era tentar
 * entrar e ler a mensagem de erro. Nada aqui expõe a string de conexão, o host
 * do banco ou qualquer dado de aluno: só o nome da variável encontrada e a
 * contagem de pacotes cifrados guardados.
 */
export default async function handler(req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET');
    res.status(405).end(JSON.stringify({ erro: 'Método não suportado.' }));
    return;
  }

  const variavel = VARIAVEIS.find((nome) => String(process.env[nome] ?? '').trim().length > 0);

  if (!variavel) {
    res.status(503).end(
      JSON.stringify({
        pronto: false,
        banco: { configurado: false, variavel: null, conectado: false },
        tabela: { existe: false, pacotes: null },
        proximoPasso:
          'Defina DATABASE_URL nas variáveis de ambiente do projeto com a string de conexão do Neon e publique de novo.',
        variaveisAceitas: VARIAVEIS,
      }),
    );
    return;
  }

  const sql = neon(process.env[variavel].trim());

  try {
    const [linha] = await sql`
      SELECT count(*)::int AS pacotes
        FROM sync_snapshots
    `;

    res.status(200).end(
      JSON.stringify({
        pronto: true,
        banco: { configurado: true, variavel, conectado: true },
        tabela: { existe: true, pacotes: linha.pacotes },
        proximoPasso: null,
      }),
    );
  } catch (erro) {
    const mensagem = String(erro?.message ?? '');
    const semTabela = /relation .*sync_snapshots.* does not exist/i.test(mensagem);

    console.error('falha em /api/saude', erro);

    res.status(503).end(
      JSON.stringify({
        pronto: false,
        banco: { configurado: true, variavel, conectado: !semTabela },
        tabela: { existe: false, pacotes: null },
        proximoPasso: semTabela
          ? 'O banco respondeu, mas não tem a tabela sync_snapshots. Rode "npm run db:migrar" ou aplique db/02-sync.sql.'
          : 'O banco não respondeu. Confira se a string de conexão continua válida no painel do Neon.',
      }),
    );
  }
}

/**
 * Tudo o que leva o banco ao estado que o site espera: as migrações de
 * db/migracoes/ e a carga do acervo. Quem chama é db/migrar.mjs; os testes
 * usam as partes que não precisam de conexão.
 *
 * O banco chega aqui como um objeto { consulta, transacao }, e não como o
 * driver do Neon direto, para que o mesmo código rode contra outro Postgres.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';
import { comandosDoAcervo, montarAcervo, sqlContagens } from './acervo.mjs';

/** Nomes aceitos para a conexão, na mesma ordem de api/sync.js. */
export const VARIAVEIS = [
  'DATABASE_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'NEON_DATABASE_URL',
];

export function variavelDoBanco(ambiente = process.env) {
  return VARIAVEIS.find((nome) => String(ambiente[nome] ?? '').trim().length > 0) ?? null;
}

export function conectarNeon(url) {
  const sql = neon(url);
  return {
    consulta: (texto, params = []) => sql(texto, params),
    transacao: (comandos) =>
      sql.transaction(comandos.map(({ texto, params = [] }) => sql(texto, params))),
  };
}

const PASTA = new URL('./migracoes/', import.meta.url);
const NOME_DE_MIGRACAO = /^\d{2,}-[\w-]+\.sql$/;

const sha256 = (texto) => createHash('sha256').update(texto).digest('hex');

/**
 * Divide um arquivo SQL em comandos. O driver HTTP do Neon executa um comando
 * por vez, e dividir no ";" cru quebraria os blocos DO $$ … $$, as strings e
 * os comentários que têm ponto e vírgula dentro.
 */
export function dividirComandos(texto) {
  const comandos = [];
  const marcaDeCifrao = /\$(?:[A-Za-z_][A-Za-z0-9_]*)?\$/y;
  let atual = '';
  let i = 0;

  while (i < texto.length) {
    if (texto.startsWith('--', i)) {
      const fim = texto.indexOf('\n', i);
      i = fim === -1 ? texto.length : fim + 1;
      atual += '\n';
      continue;
    }

    if (texto.startsWith('/*', i)) {
      const fim = texto.indexOf('*/', i + 2);
      if (fim === -1) throw new Error('Comentário /* sem fechamento.');
      i = fim + 2;
      atual += ' ';
      continue;
    }

    marcaDeCifrao.lastIndex = i;
    const cifrao = texto[i] === '$' ? marcaDeCifrao.exec(texto) : null;
    if (cifrao) {
      const marca = cifrao[0];
      const fim = texto.indexOf(marca, i + marca.length);
      if (fim === -1) throw new Error(`Bloco ${marca} sem fechamento.`);
      atual += texto.slice(i, fim + marca.length);
      i = fim + marca.length;
      continue;
    }

    const aspas = texto[i];
    if (aspas === "'" || aspas === '"') {
      let fim = i + 1;
      while (fim < texto.length) {
        if (texto[fim] === aspas && texto[fim + 1] === aspas) fim += 2;
        else if (texto[fim] === aspas) break;
        else fim += 1;
      }
      if (fim >= texto.length) throw new Error(`Texto entre ${aspas} sem fechamento.`);
      atual += texto.slice(i, fim + 1);
      i = fim + 1;
      continue;
    }

    if (texto[i] === ';') {
      if (atual.trim()) comandos.push(atual.trim());
      atual = '';
      i += 1;
      continue;
    }

    atual += texto[i];
    i += 1;
  }

  if (atual.trim()) comandos.push(atual.trim());
  return comandos;
}

export async function lerMigracoes() {
  const nomes = (await readdir(PASTA)).filter((nome) => NOME_DE_MIGRACAO.test(nome)).sort();
  return Promise.all(nomes.map(async (nome) => {
    const texto = await readFile(new URL(nome, PASTA), 'utf8');
    return { nome, checksum: sha256(texto), comandos: dividirComandos(texto) };
  }));
}

const TRAVA_MIGRACOES = `SELECT pg_advisory_xact_lock(hashtext('dynamick:migracoes'))`;

const SQL_REGISTRO = `CREATE TABLE IF NOT EXISTS schema_migrations (
  name       text PRIMARY KEY,
  checksum   text NOT NULL,
  applied_at timestamptz NOT NULL DEFAULT now()
)`;

/**
 * Aplica, em ordem, cada arquivo que ainda não foi aplicado ou que mudou desde
 * então. Cada arquivo roda numa transação: ou entra inteiro, ou nada muda.
 * Os arquivos são escritos para poder rodar de novo, então um banco anterior
 * a schema_migrations (como o de produção, criado à mão) passa por todos sem
 * efeito colateral e só então fica registrado.
 */
export async function aplicarMigracoes(db, migracoes, log = () => {}) {
  await db.consulta(SQL_REGISTRO);
  const linhas = await db.consulta('SELECT name, checksum FROM schema_migrations');
  const aplicadas = new Map(linhas.map((linha) => [linha.name, linha.checksum]));

  const feitas = [];
  for (const migracao of migracoes) {
    if (aplicadas.get(migracao.nome) === migracao.checksum) {
      log(`  em dia     ${migracao.nome}`);
      continue;
    }
    await db.transacao([
      { texto: TRAVA_MIGRACOES },
      ...migracao.comandos.map((texto) => ({ texto })),
      {
        texto: `INSERT INTO schema_migrations (name, checksum) VALUES ($1, $2)
                ON CONFLICT (name) DO UPDATE SET checksum = EXCLUDED.checksum, applied_at = now()`,
        params: [migracao.nome, migracao.checksum],
      },
    ]);
    feitas.push(migracao.nome);
    log(`  aplicada   ${migracao.nome} (${migracao.comandos.length} comandos)`);
  }
  return feitas;
}

/**
 * Deixa as tabelas do acervo iguais a js/data/. Pula a carga quando a versão
 * registrada em catalog_sync é a mesma do código e nenhuma tabela perdeu ou
 * ganhou linha por fora; com `forcar`, carrega mesmo assim.
 */
export async function sincronizarAcervo(db, { forcar = false, commit = null, log = () => {} } = {}) {
  const acervo = montarAcervo();

  const [registro] = await db.consulta('SELECT content_hash FROM catalog_sync WHERE id = 1');
  const [contagens] = await db.consulta(sqlContagens());
  const divergentes = Object.entries(acervo.totais)
    .filter(([tabela, total]) => contagens[tabela] !== total)
    .map(([tabela]) => tabela);

  if (!forcar && registro?.content_hash === acervo.hash && divergentes.length === 0) {
    log(`  acervo em dia (${acervo.hash.slice(0, 12)})`);
    return { mudou: false, acervo, resumo: [] };
  }

  const comandos = comandosDoAcervo(acervo, { commit });
  const bytes = comandos.reduce((soma, { texto, params = [] }) =>
    soma + texto.length + params.reduce((parcial, valor) => parcial + String(valor ?? '').length, 0), 0);
  log(`  carregando o acervo (${(bytes / 1048576).toFixed(1)} MB numa transação)…`);

  const resultados = await db.transacao(comandos);

  const porTabela = new Map();
  comandos.forEach(({ rotulo }, indice) => {
    if (!rotulo) return;
    const linha = resultados[indice]?.[0] ?? {};
    const atual = porTabela.get(rotulo.tabela) ?? { tabela: rotulo.tabela, novas: 0, alteradas: 0, removidas: 0 };
    porTabela.set(rotulo.tabela, {
      ...atual,
      novas: atual.novas + (linha.novas ?? 0),
      alteradas: atual.alteradas + (linha.alteradas ?? 0),
      removidas: atual.removidas + (linha.removidas ?? 0),
    });
  });

  const resumo = [...porTabela.values()];
  for (const { tabela, novas, alteradas, removidas } of resumo) {
    if (novas + alteradas + removidas === 0) continue;
    log(`  ${tabela.padEnd(20)} +${novas} novas, ${alteradas} alteradas, -${removidas} removidas`);
  }
  log(`  acervo carregado (${acervo.hash.slice(0, 12)})`);
  return { mudou: true, acervo, resumo };
}

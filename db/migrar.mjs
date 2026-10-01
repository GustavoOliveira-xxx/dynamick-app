/**
 * Deixa o banco do Neon igual ao que o site atual espera: aplica as migrações
 * de db/migracoes/ que faltam e recarrega o acervo quando js/data/ mudou.
 *
 *   npm run db:migrar                     migrações pendentes + acervo, se mudou
 *   npm run db:migrar -- --forcar         recarrega o acervo mesmo sem mudança
 *   npm run db:migrar -- --so-esquema     só as migrações
 *   npm run db:migrar -- --conferir       só monta e valida o acervo, sem banco
 *
 * O build da Vercel chama `node db/migrar.mjs --build` a cada publicação. Em
 * produção ele grava no banco; em preview só confere o acervo, porque um
 * preview pode estar ligado ao mesmo banco da produção. Se a migração falhar,
 * a publicação para, e o site no ar continua o anterior. Para publicar sem
 * tocar no banco, defina DYNAMICK_MIGRAR=0 na Vercel.
 *
 * Tudo aqui pode rodar quantas vezes quiser: nada apaga dado de estudante, e o
 * acervo só é regravado quando muda.
 */
import { montarAcervo } from './acervo.mjs';
import {
  VARIAVEIS, aplicarMigracoes, conectarNeon, lerMigracoes, sincronizarAcervo, variavelDoBanco,
} from './banco.mjs';

const opcoes = new Set(process.argv.slice(2));
const noBuild = opcoes.has('--build');
const log = (linha) => console.log(linha);

function conferirAcervo() {
  const { totais, hash } = montarAcervo();
  log(`Acervo conferido (${hash.slice(0, 12)}):`);
  for (const [tabela, total] of Object.entries(totais)) log(`  ${tabela.padEnd(20)} ${total}`);
}

if (opcoes.has('--conferir')) {
  conferirAcervo();
  process.exit(0);
}

if (noBuild && /^(0|false|nao|não)$/i.test(String(process.env.DYNAMICK_MIGRAR ?? '').trim())) {
  log('DYNAMICK_MIGRAR=0: esta publicação não tocou no banco.');
  process.exit(0);
}

if (noBuild && process.env.VERCEL_ENV !== 'production') {
  conferirAcervo();
  log(`Preview (${process.env.VERCEL_GIT_COMMIT_REF ?? 'sem branch'}): o banco não é alterado fora da produção.`);
  process.exit(0);
}

const variavel = variavelDoBanco();

if (!variavel) {
  if (noBuild) {
    log('Esta publicação não tem DATABASE_URL: o banco ficou como estava. /api/saude mostra o que falta.');
    process.exit(0);
  }
  console.error(
    'Nenhuma string de conexão encontrada.\n'
    + `Defina uma destas variáveis: ${VARIAVEIS.join(', ')}\n`
    + 'A do Neon está em console.neon.tech › seu projeto › Connect.',
  );
  process.exit(1);
}

log(`Banco: ${variavel}${noBuild ? ' (produção)' : ''}`);
const db = conectarNeon(process.env[variavel].trim());

try {
  log('Migrações');
  await aplicarMigracoes(db, await lerMigracoes(), log);

  if (!opcoes.has('--so-esquema')) {
    log('Acervo');
    await sincronizarAcervo(db, {
      forcar: opcoes.has('--forcar'),
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      log,
    });
  }

  const [{ pacotes }] = await db.consulta('SELECT count(*)::int AS pacotes FROM sync_snapshots');
  log(`Pronto. sync_snapshots guarda ${pacotes} conta(s).`);
} catch (erro) {
  console.error(`\nFALHA ao migrar o banco: ${erro.message}`);
  if (noBuild) {
    console.error(
      'A publicação parou aqui para o site não subir diferente do banco; o site no ar continua o anterior.\n'
      + 'Para publicar mesmo assim, defina DYNAMICK_MIGRAR=0 em Settings › Environment Variables e faça Redeploy.',
    );
  }
  process.exit(1);
}

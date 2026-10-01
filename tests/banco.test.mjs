import { readFileSync, readdirSync } from 'node:fs';
import { describe, it, expect } from './run.mjs';
import { TABELAS, montarAcervo, validarLinhas, comandosDoAcervo } from '../db/acervo.mjs';
import { dividirComandos, lerMigracoes } from '../db/banco.mjs';
import {
  TOPICS, QUESTIONS, SIMULATIONS, SESSION_TEMPLATES, STUDY_METHODS, ESSAY_PROMPTS,
} from '../js/data/content.js';

const acervo = montarAcervo();
const linhasDe = (tabela) => acervo.tabelas.find((item) => item.tabela === tabela).linhas;
const chavesDe = (tabela, coluna = 'slug') => new Set(linhasDe(tabela).map((linha) => linha[coluna]));

const PASTA = new URL('../db/migracoes/', import.meta.url);
const migracoesSql = readdirSync(PASTA)
  .filter((nome) => nome.endsWith('.sql'))
  .sort()
  .map((nome) => readFileSync(new URL(nome, PASTA), 'utf8'));

/**
 * Lê nas migrações os valores que uma restrição CHECK (coluna IN (...)) aceita.
 * Vale a última definição, como no banco: a de CREATE TABLE ou a de um
 * ADD CONSTRAINT posterior.
 */
function valoresPermitidos(tabela, coluna) {
  let valores = null;
  const lista = `CHECK \\(${coluna} IN \\(([^)]*)\\)\\)`;
  for (const sql of migracoesSql) {
    const criacao = sql.match(new RegExp(`CREATE TABLE IF NOT EXISTS ${tabela} \\(([\\s\\S]*?)\\n\\);`));
    const naCriacao = criacao?.[1].match(new RegExp(`\\n\\s*${coluna}\\s[^\\n]*?${lista}`));
    if (naCriacao) valores = naCriacao[1];
    const alterada = [...sql.matchAll(new RegExp(`ADD CONSTRAINT ${tabela}_${coluna}_check\\s+${lista}`, 'g'))].at(-1);
    if (alterada) valores = alterada[1];
  }
  if (!valores) throw new Error(`Restrição de ${tabela}.${coluna} não encontrada nas migrações.`);
  return valores.split(',').map((valor) => valor.trim().replace(/^'|'$/g, ''));
}

describe('acervo no banco', () => {
  it('tem uma linha para cada item do catálogo do site', () => {
    expect(acervo.totais.topics).toBe(TOPICS.length);
    expect(acervo.totais.questions).toBe(QUESTIONS.length);
    expect(acervo.totais.question_options).toBe(QUESTIONS.reduce((soma, q) => soma + q.options.length, 0));
    expect(acervo.totais.content_items).toBe(TOPICS.reduce((soma, t) => soma + t.content.length, 0));
    expect(acervo.totais.simulations).toBe(SIMULATIONS.length);
    expect(acervo.totais.session_templates).toBe(SESSION_TEMPLATES.length);
    expect(acervo.totais.study_methods).toBe(STUDY_METHODS.length);
    expect(acervo.totais.essay_prompts).toBe(ESSAY_PROMPTS.length);
  });

  it('toda referência aponta para algo que também vai para o banco', () => {
    const areas = chavesDe('areas');
    const materias = chavesDe('subjects');
    const assuntos = chavesDe('topics');
    const habilidades = chavesDe('skills');
    const questoes = chavesDe('questions');
    const soltas = [
      ...linhasDe('subjects').filter((l) => !areas.has(l.area_slug)),
      ...linhasDe('topics').filter((l) => !materias.has(l.subject_slug) || !areas.has(l.area_slug)),
      ...linhasDe('skills').filter((l) => !assuntos.has(l.topic_slug)),
      ...linhasDe('topic_prerequisites').filter((l) => !assuntos.has(l.topic_slug) || !assuntos.has(l.prerequisite_slug)),
      ...linhasDe('topic_related').filter((l) => !assuntos.has(l.topic_slug) || !assuntos.has(l.related_slug)),
      ...linhasDe('content_items').filter((l) => !assuntos.has(l.topic_slug)),
      ...linhasDe('questions').filter((l) => !assuntos.has(l.topic_slug) || (l.skill_slug && !habilidades.has(l.skill_slug))),
      ...linhasDe('question_options').filter((l) => !questoes.has(l.question_slug)),
      ...linhasDe('simulations').filter((l) =>
        (l.area_slug && !areas.has(l.area_slug))
        || (l.subject_slug && !materias.has(l.subject_slug))
        || (l.topic_slug && !assuntos.has(l.topic_slug))),
    ];
    expect(soltas.length).toBe(0);
  });

  it('nenhum assunto aponta para si mesmo como pré-requisito ou relacionado', () => {
    const proprios = [
      ...linhasDe('topic_prerequisites').filter((l) => l.topic_slug === l.prerequisite_slug),
      ...linhasDe('topic_related').filter((l) => l.topic_slug === l.related_slug),
    ];
    expect(proprios.length).toBe(0);
  });

  it('cada questão chega ao banco com exatamente uma alternativa correta', () => {
    const corretas = new Map();
    for (const opcao of linhasDe('question_options')) {
      if (opcao.is_correct) corretas.set(opcao.question_slug, (corretas.get(opcao.question_slug) ?? 0) + 1);
    }
    expect(corretas.size).toBe(QUESTIONS.length);
    expect([...corretas.values()].every((total) => total === 1)).toBe(true);
  });

  it('cabe nas restrições do esquema', () => {
    const fora = [
      ['simulations', 'kind'], ['content_items', 'kind'], ['content_items', 'depth'],
      ['topics', 'difficulty'], ['questions', 'difficulty'], ['question_options', 'label'],
      ['session_templates', 'mode'],
    ].flatMap(([tabela, coluna]) => {
      const permitidos = new Set(valoresPermitidos(tabela, coluna));
      return linhasDe(tabela)
        .filter((linha) => linha[coluna] !== null && !permitidos.has(linha[coluna]))
        .map((linha) => `${tabela}.${coluna} = ${linha[coluna]}`);
    });
    expect(fora).toEqual([]);
  });

  it('tem a mesma impressão digital em duas montagens seguidas', () => {
    expect(montarAcervo().hash).toBe(acervo.hash);
  });

  it('recusa linha sem coluna obrigatória e chave repetida antes de ir ao banco', () => {
    const definicao = TABELAS.find((item) => item.tabela === 'areas');
    const linha = { slug: 'x', name: 'X', short_name: 'X', summary: null, accent: null, display_order: 1 };
    let semNome = '';
    let repetida = '';
    try { validarLinhas(definicao, [{ ...linha, name: null }]); } catch (erro) { semNome = erro.message; }
    try { validarLinhas(definicao, [linha, { ...linha }]); } catch (erro) { repetida = erro.message; }
    expect(semNome).toContain('sem name');
    expect(repetida).toContain('chave repetida');
  });

  it('grava quem é referenciado antes e apaga no sentido inverso', () => {
    const etapas = comandosDoAcervo(acervo).filter((c) => c.rotulo).map((c) => c.rotulo);
    const gravar = etapas.filter((e) => e.etapa === 'gravar').map((e) => e.tabela);
    const apagar = etapas.filter((e) => e.etapa === 'apagar').map((e) => e.tabela);
    expect(gravar.indexOf('topics')).toBeLessThan(gravar.indexOf('questions'));
    expect(gravar.indexOf('questions')).toBeLessThan(gravar.indexOf('question_options'));
    expect(gravar.indexOf('subjects')).toBeLessThan(gravar.indexOf('simulations'));
    expect(apagar).toEqual([...gravar].reverse());
  });
});

describe('migrações do banco', () => {
  it('divide comandos sem quebrar blocos DO, textos e comentários com ponto e vírgula', () => {
    const comandos = dividirComandos(`
      -- comentário; com ponto e vírgula
      CREATE TABLE a (x text DEFAULT 'um;dois');
      DO $$ BEGIN IF true THEN PERFORM 1; END IF; END $$;
      /* bloco; */ SELECT $tag$ ; $tag$;
    `);
    expect(comandos).toHaveLength(3);
    expect(comandos[0]).toBe("CREATE TABLE a (x text DEFAULT 'um;dois')");
    expect(comandos[1]).toBe('DO $$ BEGIN IF true THEN PERFORM 1; END IF; END $$');
    expect(comandos[2]).toBe('SELECT $tag$ ; $tag$');
  });

  it('roda os arquivos em ordem numérica', async () => {
    const nomes = (await lerMigracoes()).map((migracao) => migracao.nome);
    expect(nomes.slice(0, 3)).toEqual(['01-esquema.sql', '02-sync.sql', '03-acervo-atual.sql']);
    expect([...nomes].sort()).toEqual(nomes);
  });

  it('pode rodar de novo: todo CREATE usa IF NOT EXISTS e toda visão é recriada', async () => {
    const problemas = [];
    for (const migracao of await lerMigracoes()) {
      const derrubadas = new Set();
      for (const comando of migracao.comandos) {
        const derrubada = comando.match(/^DROP VIEW IF EXISTS (\w+)/);
        if (derrubada) derrubadas.add(derrubada[1]);
        const visao = comando.match(/^CREATE VIEW (\w+)/);
        if (visao && !derrubadas.has(visao[1])) problemas.push(`${migracao.nome}: ${visao[1]}`);
        if (/^CREATE (UNIQUE )?(TABLE|INDEX) (?!IF NOT EXISTS)/.test(comando)) {
          problemas.push(`${migracao.nome}: ${comando.slice(0, 50)}`);
        }
      }
    }
    expect(problemas).toEqual([]);
  });
});

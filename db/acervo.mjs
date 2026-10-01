/**
 * O acervo do site (js/data/) visto como linhas do banco.
 *
 * O site lê o catálogo direto dos arquivos de dados; o banco guarda uma cópia
 * para consulta e para que as regras do produto virem restrição (uma única
 * alternativa correta, justificativa em toda alternativa, chaves que apontam
 * para o que existe). Este módulo é a única ponte entre os dois: monta as
 * linhas a partir de js/data/ e gera o SQL que deixa o banco igual a elas.
 *
 * Cada tabela é descrita uma vez, em TABELAS. A descrição serve para montar o
 * SQL, para validar as linhas antes de qualquer conexão e para os testes.
 */
import { createHash } from 'node:crypto';
import {
  AREAS, SUBJECTS, TOPICS, QUESTIONS, STUDY_METHODS,
  SESSION_TEMPLATES, SIMULATIONS, ESSAY_PROMPTS,
} from '../js/data/content.js';
import { EXAM_ENVIRONMENTS } from '../js/data/exam-environments.js';
import { ENEM_ARCHIVE } from '../js/data/enem-archive.js';

/**
 * Colunas no formato [nome, tipo]. Tipo terminado em "?" aceita NULL.
 * A ordem das tabelas é a de carga: quem é referenciado vem antes.
 * `carimbo` é a coluna que recebe now() quando a linha muda de verdade.
 */
export const TABELAS = [
  {
    tabela: 'areas',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['name', 'text'], ['short_name', 'text'], ['summary', 'text?'],
      ['accent', 'text?'], ['display_order', 'int'],
    ],
    linhas: () => AREAS.map((area) => ({
      slug: area.slug,
      name: area.name,
      short_name: area.shortName,
      summary: area.summary ?? null,
      accent: area.accent ?? null,
      display_order: area.order ?? 0,
    })),
  },
  {
    tabela: 'subjects',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['area_slug', 'text'], ['name', 'text'], ['summary', 'text?'],
      ['display_order', 'int'],
    ],
    linhas: () => SUBJECTS.map((subject) => ({
      slug: subject.slug,
      area_slug: subject.areaSlug,
      name: subject.name,
      summary: subject.summary ?? null,
      display_order: subject.order ?? 0,
    })),
  },
  {
    tabela: 'topics',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['subject_slug', 'text'], ['area_slug', 'text'], ['name', 'text'],
      ['summary', 'text'], ['difficulty', 'text'], ['estimated_minutes', 'int'],
      ['curation_weight', 'int'], ['display_order', 'int'],
    ],
    linhas: () => TOPICS.map((topic) => ({
      slug: topic.slug,
      subject_slug: topic.subjectSlug,
      area_slug: topic.areaSlug,
      name: topic.name,
      summary: topic.summary,
      difficulty: topic.difficulty,
      estimated_minutes: topic.estimatedMinutes ?? 20,
      curation_weight: topic.curationWeight ?? 50,
      display_order: topic.order ?? 0,
    })),
  },
  {
    tabela: 'skills',
    chave: ['slug'],
    colunas: [['slug', 'text'], ['topic_slug', 'text'], ['name', 'text'], ['description', 'text?']],
    linhas: () => TOPICS.flatMap((topic) => (topic.skills ?? []).map((skill) => ({
      slug: skill.slug,
      topic_slug: topic.slug,
      name: skill.name,
      description: skill.description ?? null,
    }))),
  },
  {
    tabela: 'topic_prerequisites',
    chave: ['topic_slug', 'prerequisite_slug'],
    colunas: [['topic_slug', 'text'], ['prerequisite_slug', 'text']],
    linhas: () => TOPICS.flatMap((topic) => (topic.prerequisites ?? []).map((slug) => ({
      topic_slug: topic.slug,
      prerequisite_slug: slug,
    }))),
  },
  {
    tabela: 'topic_related',
    chave: ['topic_slug', 'related_slug'],
    colunas: [['topic_slug', 'text'], ['related_slug', 'text']],
    linhas: () => TOPICS.flatMap((topic) => (topic.related ?? []).map((slug) => ({
      topic_slug: topic.slug,
      related_slug: slug,
    }))),
  },
  {
    tabela: 'content_items',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['topic_slug', 'text'], ['kind', 'text'], ['title', 'text'],
      ['depth', 'text?'], ['body', 'text'], ['display_order', 'int'],
    ],
    linhas: () => TOPICS.flatMap((topic) => (topic.content ?? []).map((item) => ({
      slug: item.slug,
      topic_slug: topic.slug,
      kind: item.kind,
      title: item.title,
      depth: item.depth ?? null,
      body: item.body,
      display_order: item.order ?? 0,
    }))),
  },
  {
    tabela: 'questions',
    chave: ['slug'],
    carimbo: 'updated_at',
    colunas: [
      ['slug', 'text'], ['topic_slug', 'text'], ['skill_slug', 'text?'], ['difficulty', 'text'],
      ['cognitive_format', 'text'], ['is_recovery', 'boolean'], ['stem', 'text'],
      ['support', 'text?'], ['explanation_summary', 'text'], ['explanation_detailed', 'text?'],
      ['explanation_strategy', 'text?'], ['explanation_concept_recap', 'text?'],
      ['reasoning_type', 'text?'], ['estimated_seconds', 'int?'], ['likely_errors', 'jsonb'],
      ['review_status', 'text?'], ['origin', 'text'], ['license', 'text'],
      ['source_year', 'int?'], ['source_url', 'text?'],
    ],
    // QUESTIONS e não topic.questions: o banco guarda o gabarito já
    // rebalanceado, igual ao que o estudante vê.
    linhas: () => QUESTIONS.map((question) => ({
      slug: question.slug,
      topic_slug: question.topicSlug,
      skill_slug: question.skillSlug ?? null,
      difficulty: question.difficulty,
      cognitive_format: question.cognitiveFormat,
      is_recovery: Boolean(question.isRecovery),
      stem: question.stem,
      support: question.support ?? null,
      explanation_summary: question.explanation?.summary,
      explanation_detailed: question.explanation?.detailed ?? null,
      explanation_strategy: question.explanation?.strategy ?? null,
      explanation_concept_recap: question.explanation?.conceptRecap ?? null,
      reasoning_type: question.reasoningType ?? null,
      estimated_seconds: question.estimatedSeconds ?? null,
      likely_errors: question.likelyErrors ?? [],
      review_status: question.status ?? null,
      origin: question.origin,
      license: question.license,
      source_year: question.sourceYear ?? null,
      source_url: question.sourceUrl ?? null,
    })),
  },
  {
    tabela: 'question_options',
    chave: ['question_slug', 'label'],
    colunas: [
      ['question_slug', 'text'], ['label', 'text'], ['body', 'text'], ['is_correct', 'boolean'],
      ['rationale', 'text'], ['error_hint', 'text?'],
    ],
    linhas: () => QUESTIONS.flatMap((question) => question.options.map((option) => ({
      question_slug: question.slug,
      label: option.label,
      body: option.text,
      is_correct: Boolean(option.isCorrect),
      rationale: option.rationale,
      error_hint: option.errorHint ?? null,
    }))),
  },
  {
    tabela: 'study_methods',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['title', 'text'], ['summary', 'text'], ['how_it_works', 'text'],
      ['when_to_use', 'text'], ['steps', 'jsonb'], ['example', 'text'], ['limitations', 'text'],
      ['minutes', 'int'], ['suitable_topics', 'jsonb'], ['display_order', 'int'],
    ],
    linhas: () => STUDY_METHODS.map((method) => ({
      slug: method.slug,
      title: method.title,
      summary: method.summary,
      how_it_works: method.howItWorks,
      when_to_use: method.whenToUse,
      steps: method.steps ?? [],
      example: method.example,
      limitations: method.limitations,
      minutes: method.minutes ?? 20,
      suitable_topics: method.suitableTopics ?? [],
      display_order: method.order ?? 0,
    })),
  },
  {
    tabela: 'simulations',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['title', 'text'], ['description', 'text'], ['kind', 'text'],
      ['area_slug', 'text?'], ['subject_slug', 'text?'], ['topic_slug', 'text?'],
      ['question_count', 'int'], ['minutes', 'int'], ['blueprint', 'jsonb'],
    ],
    linhas: () => SIMULATIONS.map((simulation) => ({
      slug: simulation.slug,
      title: simulation.title,
      description: simulation.description,
      kind: simulation.kind,
      area_slug: simulation.areaSlug ?? null,
      subject_slug: simulation.subjectSlug ?? null,
      topic_slug: simulation.topicSlug ?? null,
      question_count: simulation.questionCount,
      minutes: simulation.minutes,
      blueprint: simulation.blueprint,
    })),
  },
  {
    tabela: 'session_templates',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['title', 'text'], ['goal', 'text'], ['instructions', 'text'],
      ['minutes', 'int'], ['mode', 'text'], ['kind', 'text'], ['item_rule', 'jsonb'],
      ['completion_rule', 'text'], ['next_recommendation', 'text?'], ['display_order', 'int'],
    ],
    linhas: () => SESSION_TEMPLATES.map((template) => ({
      slug: template.slug,
      title: template.title,
      goal: template.goal,
      instructions: template.instructions,
      minutes: template.minutes,
      mode: template.mode,
      kind: template.kind,
      item_rule: template.itemRule,
      completion_rule: template.completionRule,
      next_recommendation: template.nextRecommendation ?? null,
      display_order: template.order ?? 0,
    })),
  },
  {
    tabela: 'essay_prompts',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['title', 'text'], ['theme', 'text'], ['focus', 'text'],
      ['motivating_texts', 'jsonb'], ['production_command', 'text'],
      ['planning_questions', 'jsonb'], ['repertoire', 'jsonb'],
      ['argument_checklist', 'jsonb'], ['review_checklist', 'jsonb'],
    ],
    linhas: () => ESSAY_PROMPTS.map((prompt) => ({
      slug: prompt.slug,
      title: prompt.title,
      theme: prompt.theme,
      focus: prompt.focus,
      motivating_texts: prompt.motivatingTexts ?? [],
      production_command: prompt.productionCommand,
      planning_questions: prompt.planningQuestions ?? [],
      repertoire: prompt.repertoire ?? [],
      argument_checklist: prompt.argumentChecklist ?? [],
      review_checklist: prompt.reviewChecklist ?? [],
    })),
  },
  {
    tabela: 'exam_environments',
    chave: ['slug'],
    colunas: [
      ['slug', 'text'], ['title', 'text'], ['eyebrow', 'text'], ['description', 'text'],
      ['time_factor', 'numeric?'], ['show_timer', 'boolean'], ['allow_pause', 'boolean'],
      ['focus_mode', 'boolean'], ['pace_per_question', 'boolean'],
      ['elimination_default', 'boolean'], ['confidence_prompt', 'boolean'], ['display_order', 'int'],
    ],
    linhas: () => EXAM_ENVIRONMENTS.map((environment, indice) => ({
      slug: environment.slug,
      title: environment.title,
      eyebrow: environment.eyebrow,
      description: environment.description,
      time_factor: environment.timeFactor ?? null,
      show_timer: Boolean(environment.showTimer),
      allow_pause: Boolean(environment.allowPause),
      focus_mode: Boolean(environment.focusMode),
      pace_per_question: Boolean(environment.pacePerQuestion),
      elimination_default: Boolean(environment.eliminationDefault),
      confidence_prompt: Boolean(environment.confidencePrompt),
      display_order: indice + 1,
    })),
  },
  {
    tabela: 'enem_editions',
    chave: ['year'],
    colunas: [['year', 'int'], ['url', 'text'], ['source', 'text'], ['contents', 'jsonb']],
    linhas: () => ENEM_ARCHIVE.map((edition) => ({
      year: edition.year,
      url: edition.url,
      source: edition.source,
      contents: edition.contents ?? [],
    })),
  },
];

const tipoSql = (tipo) => tipo.replace(/\?$/, '');
const aceitaNulo = (tipo) => tipo.endsWith('?');

/** Lança erro com a primeira linha que o banco recusaria por NOT NULL ou chave repetida. */
export function validarLinhas(definicao, linhas) {
  const vistas = new Set();
  for (const linha of linhas) {
    for (const [coluna, tipo] of definicao.colunas) {
      const valor = linha[coluna];
      if (valor === undefined || (valor === null && !aceitaNulo(tipo))) {
        const chave = definicao.chave.map((parte) => linha[parte]).join(' / ');
        throw new Error(`${definicao.tabela}: a linha "${chave}" está sem ${coluna}.`);
      }
    }
    const chave = JSON.stringify(definicao.chave.map((parte) => linha[parte]));
    if (vistas.has(chave)) throw new Error(`${definicao.tabela}: chave repetida ${chave}.`);
    vistas.add(chave);
  }
}

/** Monta, valida e resume o acervo inteiro. Não toca no banco. */
export function montarAcervo() {
  const tabelas = TABELAS.map((definicao) => {
    const linhas = definicao.linhas();
    validarLinhas(definicao, linhas);
    return { ...definicao, linhas };
  });

  const totais = Object.fromEntries(tabelas.map(({ tabela, linhas }) => [tabela, linhas.length]));
  const hash = createHash('sha256')
    .update(JSON.stringify(tabelas.map(({ tabela, colunas, linhas }) => [tabela, colunas, linhas])))
    .digest('hex');

  return { tabelas, totais, hash };
}

function sqlGravar({ tabela, chave, colunas, carimbo }) {
  const nomes = colunas.map(([nome]) => nome);
  const registro = colunas.map(([nome, tipo]) => `${nome} ${tipoSql(tipo)}`).join(', ');
  const mutaveis = nomes.filter((nome) => !chave.includes(nome));

  // Só reescreve a linha quando algo mudou, para que rodar de novo não gere
  // escrita nem mexa no carimbo de quem continua igual.
  const conflito = mutaveis.length === 0
    ? 'DO NOTHING'
    : `DO UPDATE SET ${mutaveis.map((nome) => `${nome} = EXCLUDED.${nome}`).join(', ')}`
      + (carimbo ? `, ${carimbo} = now()` : '')
      + ` WHERE (${mutaveis.map((nome) => `${tabela}.${nome}`).join(', ')})`
      + ` IS DISTINCT FROM (${mutaveis.map((nome) => `EXCLUDED.${nome}`).join(', ')})`;

  return `WITH gravadas AS (
  INSERT INTO ${tabela} (${nomes.join(', ')})
  SELECT ${nomes.join(', ')} FROM jsonb_to_recordset($1::jsonb) AS r(${registro})
  ON CONFLICT (${chave.join(', ')}) ${conflito}
  RETURNING (xmax = 0) AS nova
)
SELECT count(*) FILTER (WHERE nova)::int AS novas,
       count(*) FILTER (WHERE NOT nova)::int AS alteradas
  FROM gravadas`;
}

function sqlApagarObsoletas({ tabela, chave, colunas }) {
  const tipos = new Map(colunas);
  const registro = chave.map((nome) => `${nome} ${tipoSql(tipos.get(nome))}`).join(', ');
  const casa = chave.map((nome) => `k.${nome} = t.${nome}`).join(' AND ');
  return `WITH apagadas AS (
  DELETE FROM ${tabela} t
   WHERE NOT EXISTS (SELECT 1 FROM jsonb_to_recordset($1::jsonb) AS k(${registro}) WHERE ${casa})
  RETURNING 1
)
SELECT count(*)::int AS removidas FROM apagadas`;
}

// O índice question_options_one_correct não deixa uma questão ter duas
// alternativas corretas nem por um instante. Quando o gabarito de uma questão
// muda de letra, a correta antiga precisa deixar de ser antes da nova virar.
const SQL_DESMARCAR_CORRETAS = `UPDATE question_options o
   SET is_correct = false
 WHERE o.is_correct
   AND NOT EXISTS (SELECT 1 FROM jsonb_to_recordset($1::jsonb) AS k(question_slug text, label text)
                    WHERE k.question_slug = o.question_slug AND k.label = o.label)`;

const SQL_REGISTRAR = `INSERT INTO catalog_sync (id, content_hash, totals, source_commit, synced_at)
VALUES (1, $1, $2::jsonb, $3, now())
ON CONFLICT (id) DO UPDATE
  SET content_hash = EXCLUDED.content_hash,
      totals = EXCLUDED.totals,
      source_commit = EXCLUDED.source_commit,
      synced_at = now()`;

export const TRAVA_ACERVO = `SELECT pg_advisory_xact_lock(hashtext('dynamick:acervo'))`;

/**
 * A sequência completa, para rodar numa única transação: grava de quem é
 * referenciado para quem referencia, apaga o que saiu do código no sentido
 * inverso e, por último, registra a versão carregada.
 */
export function comandosDoAcervo({ tabelas, totais, hash }, { commit = null } = {}) {
  const comandos = [{ texto: TRAVA_ACERVO, rotulo: null }];

  for (const definicao of tabelas) {
    if (definicao.tabela === 'question_options') {
      const corretas = definicao.linhas
        .filter((linha) => linha.is_correct)
        .map(({ question_slug, label }) => ({ question_slug, label }));
      comandos.push({ texto: SQL_DESMARCAR_CORRETAS, params: [JSON.stringify(corretas)], rotulo: null });
    }
    comandos.push({
      texto: sqlGravar(definicao),
      params: [JSON.stringify(definicao.linhas)],
      rotulo: { tabela: definicao.tabela, etapa: 'gravar' },
    });
  }

  for (const definicao of [...tabelas].reverse()) {
    const chaves = definicao.linhas.map((linha) =>
      Object.fromEntries(definicao.chave.map((nome) => [nome, linha[nome]])));
    comandos.push({
      texto: sqlApagarObsoletas(definicao),
      params: [JSON.stringify(chaves)],
      rotulo: { tabela: definicao.tabela, etapa: 'apagar' },
    });
  }

  comandos.push({ texto: SQL_REGISTRAR, params: [hash, JSON.stringify(totais), commit], rotulo: null });
  return comandos;
}

/** Uma consulta que conta as linhas de cada tabela do acervo. */
export function sqlContagens() {
  return `SELECT ${TABELAS.map(({ tabela }) => `(SELECT count(*)::int FROM ${tabela}) AS ${tabela}`).join(',\n       ')}`;
}

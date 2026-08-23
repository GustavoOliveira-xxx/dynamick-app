/**
 * Catálogo de conteúdo: junta as partes e oferece consultas prontas.
 *
 * Tudo aqui é conteúdo AUTORAL de desenvolvimento. Nenhuma questão veio de prova
 * oficial, livro ou plataforma de terceiros. Cada item declara origem e licença.
 */

import { AREAS, SUBJECTS } from './areas.js';
import { LINGUAGENS_TOPICS } from './topics-linguagens.js';
import { MATEMATICA_TOPICS } from './topics-matematica.js';
import { HUMANAS_TOPICS } from './topics-humanas.js';
import { NATUREZA_TOPICS } from './topics-natureza.js';
import { REDACAO_TOPICS } from './topics-redacao.js';
import { LINGUAGENS_TOPICS_LEVA_2 } from './topics-linguagens-leva2.js';
import { MATEMATICA_TOPICS_LEVA_2 } from './topics-matematica-leva2.js';
import { HUMANAS_TOPICS_LEVA_2 } from './topics-humanas-leva2.js';
import { NATUREZA_TOPICS_LEVA_2 } from './topics-natureza-leva2.js';
import { REDACAO_TOPICS_LEVA_2 } from './topics-redacao-leva2.js';
import { STUDY_METHODS } from './study-methods.js';
import { SESSION_TEMPLATES, SIMULATIONS } from './sessions.js';
import { ESSAY_PROMPTS } from './essay-prompts.js';
import { QUESTION_EXPANSION } from './questions-expansion.js';
import { SEED_LICENSE, SEED_ORIGIN } from '../engine/domain.js';

export { AREAS, SUBJECTS, STUDY_METHODS, SESSION_TEMPLATES, SIMULATIONS, ESSAY_PROMPTS };

/*
 * Duas levas de conteúdo autoral.
 *
 * A primeira são os 12 tópicos completos do MVP, escritos um a um. A segunda
 * cobre os demais assuntos previstos no escopo — inclusive Literatura, História
 * e Filosofia, que não tinham nenhum tópico — e usa a fábrica de topic-factory.js
 * para garantir, por construção, a mesma estrutura editorial: resumo, explicação,
 * dois exemplos resolvidos, erros comuns, autoexplicação e cinco questões nos
 * cinco formatos cognitivos.
 */
const BASE_TOPICS = [
  ...LINGUAGENS_TOPICS,
  ...LINGUAGENS_TOPICS_LEVA_2,
  ...MATEMATICA_TOPICS,
  ...MATEMATICA_TOPICS_LEVA_2,
  ...HUMANAS_TOPICS,
  ...HUMANAS_TOPICS_LEVA_2,
  ...NATUREZA_TOPICS,
  ...NATUREZA_TOPICS_LEVA_2,
  ...REDACAO_TOPICS,
  ...REDACAO_TOPICS_LEVA_2,
];

const expansionByTopic = QUESTION_EXPANSION.reduce((index, question) => {
  if (!index.has(question.topicSlug)) index.set(question.topicSlug, []);
  index.get(question.topicSlug).push(question);
  return index;
}, new Map());

export const TOPICS = BASE_TOPICS.map((topic) => ({
  ...topic,
  questions: [...topic.questions, ...(expansionByTopic.get(topic.slug) ?? [])],
}));

/* ---------------------------------------------------------------- Índices */

const areaBySlug = new Map(AREAS.map((area) => [area.slug, area]));
const subjectBySlug = new Map(SUBJECTS.map((subject) => [subject.slug, subject]));
const topicBySlug = new Map(TOPICS.map((topic) => [topic.slug, topic]));

/* ---------------------------------------------------------------- Gabarito */

/**
 * Distribui a posição do gabarito entre as alternativas.
 *
 * O material foi escrito com a resposta correta quase sempre na primeira posição.
 * Isso é um defeito grave numa plataforma de prática: quem marca sempre a primeira
 * alternativa acerta a maioria sem ler, e todo o resto do sistema — domínio,
 * motivo do erro, recomendação — passa a medir ruído.
 *
 * A correção acontece aqui, na montagem, e não nos arquivos de conteúdo: assim
 * quem escreve uma questão nova não precisa se preocupar em variar a posição, e
 * o texto autoral permanece como foi redigido.
 *
 * Duas garantias importantes:
 * - É determinístico. A mesma questão cai sempre na mesma posição, em qualquer
 *   carregamento e em qualquer navegador. Um gabarito que se move entre sessões
 *   quebraria a revisão e o caderno de erros.
 * - É rotação, não embaralhamento. A ordem relativa das alternativas erradas se
 *   mantém, o que preserva progressões deliberadas dentro da lista.
 */
const POSICAO_ALVO = [1, 3, 0, 4, 2, 3, 1, 4, 0, 2, 4, 0, 3, 1, 2, 0, 4, 1, 3, 2];

/**
 * Deslocamento por tópico: sem isso, todo tópico repetiria a mesma sequência de
 * gabaritos. Duas sementes independentes, e não uma só, porque o acervo cresceu:
 * com quase quarenta tópicos, uma semente única fazia sequências inteiras
 * coincidirem entre tópicos diferentes — padrão que um estudante atento perceberia.
 */
function deslocamentoDoTopico(slug) {
  let soma = 0;
  for (const caractere of slug) soma = (soma * 31 + caractere.codePointAt(0)) % 9973;
  return soma;
}

/** Segunda semente, com base e módulo diferentes: descorrelaciona início e passo. */
function passoDoTopico(slug) {
  let soma = 7;
  for (const caractere of slug) soma = (soma * 131 + caractere.codePointAt(0)) % 7919;
  return soma;
}

/** Alternativas curtas e numéricas costumam estar em ordem crescente de propósito. */
function temOrdemNumerica(options) {
  return options.every((option) => {
    const texto = option.text.trim();
    return texto.length <= 14 && /^[R$\s]*[\d.,]+\s*%?\.?$/.test(texto);
  });
}

function balancearGabarito(question, ordem, topicSlug) {
  const options = question.options ?? [];
  const atual = options.findIndex((option) => option.isCorrect);

  // Gabarito inválido é problema de conteúdo: a tela de saúde reporta, aqui não mexemos.
  if (atual < 0 || options.filter((option) => option.isCorrect).length !== 1) return question;
  if (temOrdemNumerica(options)) return question;

  // Cada tópico entra na tabela com um ponto de partida e um passo próprios, para
  // que dois tópicos não terminem com a mesma sequência de gabaritos.
  const semente = deslocamentoDoTopico(topicSlug);
  const passos = [1, 3, 7, 9, 11, 13, 17, 19]; // coprimos de 20: percorrem a tabela inteira
  const passo = passos[passoDoTopico(topicSlug) % passos.length];
  const indice = (semente + ordem * passo) % POSICAO_ALVO.length;
  const alvo = POSICAO_ALVO[indice] % options.length;
  if (alvo === atual) return question;

  const deslocamento = (atual - alvo + options.length) % options.length;
  const rotacionadas = options.map(
    (_, indice) => options[(indice + deslocamento) % options.length],
  );

  return {
    ...question,
    // As etiquetas seguem a posição; o conteúdo de cada alternativa é que se move.
    options: rotacionadas.map((option, indice) => ({ ...option, label: options[indice].label })),
  };
}

/** Todas as questões, já com o contexto do tópico embutido. */
export const QUESTIONS = TOPICS.flatMap((topic) =>
  topic.questions.map((original, ordem) => {
    const question = balancearGabarito(original, ordem, topic.slug);
    return {
    ...question,
    id: question.slug,
    topicSlug: topic.slug,
    topicName: topic.name,
    subjectSlug: topic.subjectSlug,
    subjectName: subjectBySlug.get(topic.subjectSlug)?.name ?? '',
    areaSlug: topic.areaSlug,
    areaName: areaBySlug.get(topic.areaSlug)?.shortName ?? '',
    skillName: topic.skills.find((skill) => skill.slug === question.skillSlug)?.name ?? null,
    origin: question.origin ?? SEED_ORIGIN,
    license: question.license ?? SEED_LICENSE,
    isRecovery: question.isRecovery ?? false,
    };
  }),
);

const questionBySlug = new Map(QUESTIONS.map((question) => [question.slug, question]));

export const getArea = (slug) => areaBySlug.get(slug) ?? null;
export const getSubject = (slug) => subjectBySlug.get(slug) ?? null;
export const getTopic = (slug) => topicBySlug.get(slug) ?? null;
export const getQuestion = (slug) => questionBySlug.get(slug) ?? null;

export const getSessionTemplate = (slug) =>
  SESSION_TEMPLATES.find((template) => template.slug === slug) ?? null;
export const getSimulation = (slug) =>
  SIMULATIONS.find((simulation) => simulation.slug === slug) ?? null;
export const getEssayPrompt = (slug) =>
  ESSAY_PROMPTS.find((prompt) => prompt.slug === slug) ?? null;
export const getStudyMethod = (slug) =>
  STUDY_METHODS.find((method) => method.slug === slug) ?? null;

/** Questões publicadas de um tópico, opcionalmente só as de recuperação. */
export function questionsForTopic(topicSlug, { recoveryOnly = false, excludeRecovery = false } = {}) {
  return QUESTIONS.filter((question) => {
    if (question.topicSlug !== topicSlug) return false;
    if (recoveryOnly && !question.isRecovery) return false;
    if (excludeRecovery && question.isRecovery) return false;
    return true;
  });
}

export function questionsForArea(areaSlug) {
  return QUESTIONS.filter((question) => question.areaSlug === areaSlug);
}

/** Conteúdo de um tópico por tipo. */
export function contentOfKind(topic, kind) {
  return (topic?.content ?? []).filter((item) => item.kind === kind);
}

/** Estrutura em árvore para o mapa de conteúdos. */
export function contentTree() {
  return AREAS.map((area) => ({
    ...area,
    subjects: SUBJECTS.filter((subject) => subject.areaSlug === area.slug)
      .map((subject) => ({
        ...subject,
        topics: TOPICS.filter((topic) => topic.subjectSlug === subject.slug).sort(
          (a, b) => a.order - b.order,
        ),
      }))
      .filter((subject) => subject.topics.length > 0),
  })).filter((area) => area.subjects.length > 0);
}

/**
 * Saúde do catálogo — os indicadores que uma curadoria precisa enxergar.
 * Roda sobre o conteúdo estático: aponta lacunas antes que o estudante as encontre.
 */
export function catalogHealth() {
  const topicsWithoutContent = TOPICS.filter((topic) => (topic.content ?? []).length === 0);
  const topicsWithFewQuestions = TOPICS.filter(
    (topic) => questionsForTopic(topic.slug, { excludeRecovery: true }).length < 5,
  );
  const withoutExplanation = QUESTIONS.filter((question) => !question.explanation?.summary);
  const withoutSkill = QUESTIONS.filter((question) => !question.skillSlug);
  const withoutLicense = QUESTIONS.filter((question) => !question.origin || !question.license);

  const badAnswerKey = QUESTIONS.filter(
    (question) => question.options.filter((option) => option.isCorrect).length !== 1,
  );

  const missingRationale = QUESTIONS.filter((question) =>
    question.options.some((option) => !option.rationale?.trim()),
  );

  // Candidatas a duplicata: mesmo tópico, mesmo formato cognitivo, início igual.
  const seen = new Map();
  const duplicates = [];
  for (const question of QUESTIONS) {
    const key = `${question.topicSlug}|${question.cognitiveFormat}|${question.stem.slice(0, 60)}`;
    if (seen.has(key)) duplicates.push({ a: seen.get(key), b: question.slug });
    else seen.set(key, question.slug);
  }

  const byDifficulty = QUESTIONS.reduce((acc, question) => {
    acc[question.difficulty] = (acc[question.difficulty] ?? 0) + 1;
    return acc;
  }, {});

  const byArea = AREAS.map((area) => ({
    slug: area.slug,
    name: area.shortName,
    total: questionsForArea(area.slug).length,
  }));

  const byCognitiveFormat = QUESTIONS.reduce((acc, question) => {
    acc[question.cognitiveFormat] = (acc[question.cognitiveFormat] ?? 0) + 1;
    return acc;
  }, {});

  return {
    totals: {
      areas: AREAS.length,
      subjects: SUBJECTS.length,
      topics: TOPICS.length,
      questions: QUESTIONS.length,
      recoveryQuestions: QUESTIONS.filter((q) => q.isRecovery).length,
      contentItems: TOPICS.reduce((sum, topic) => sum + (topic.content?.length ?? 0), 0),
      methods: STUDY_METHODS.length,
      sessionTemplates: SESSION_TEMPLATES.length,
      simulations: SIMULATIONS.length,
      essayPrompts: ESSAY_PROMPTS.length,
    },
    topicsWithoutContent,
    topicsWithFewQuestions,
    withoutExplanation,
    withoutSkill,
    withoutLicense,
    badAnswerKey,
    missingRationale,
    duplicates,
    byDifficulty,
    byArea,
    byCognitiveFormat,
  };
}

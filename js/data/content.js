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
import { SESSION_TEMPLATES, SIMULATIONS as SIMULADOS_FIXOS } from './sessions.js';
import { simuladosDeAssunto, simuladosDeMateria } from './simulados-gerados.js';
import { ESSAY_PROMPTS } from './essay-prompts.js';
import { QUESTION_EXPANSION } from './questions-expansion.js';
import { QUESTION_REINFORCEMENT } from './questions-reinforcement.js';
import { QUESTOES_LEVA_3 } from './questions-leva3.js';
import { QUESTOES_LEVA_4 } from './questions-leva4.js';
import { SEED_LICENSE, SEED_ORIGIN } from '../engine/domain.js';

export { AREAS, SUBJECTS, STUDY_METHODS, SESSION_TEMPLATES, ESSAY_PROMPTS };

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

const reinforcementByTopic = QUESTION_REINFORCEMENT.reduce((index, question) => {
  if (!index.has(question.topicSlug)) index.set(question.topicSlug, []);
  index.get(question.topicSlug).push(question);
  return index;
}, new Map());

const leva3ByTopic = QUESTOES_LEVA_3.reduce((index, question) => {
  if (!index.has(question.topicSlug)) index.set(question.topicSlug, []);
  index.get(question.topicSlug).push(question);
  return index;
}, new Map());

const leva4ByTopic = QUESTOES_LEVA_4.reduce((index, question) => {
  if (!index.has(question.topicSlug)) index.set(question.topicSlug, []);
  index.get(question.topicSlug).push(question);
  return index;
}, new Map());

export const TOPICS = BASE_TOPICS.map((topic) => ({
  ...topic,
  questions: [
    ...topic.questions,
    ...(expansionByTopic.get(topic.slug) ?? []),
    ...(reinforcementByTopic.get(topic.slug) ?? []).map((question) => ({
      ...question,
      skillSlug: topic.skills[0]?.slug ?? null,
    })),
    ...(leva3ByTopic.get(topic.slug) ?? []),
    ...(leva4ByTopic.get(topic.slug) ?? []),
  ],
}));

export const SIMULATIONS = [
  ...SIMULADOS_FIXOS,
  ...simuladosDeMateria(TOPICS),
  ...simuladosDeAssunto(TOPICS),
];

const areaBySlug = new Map(AREAS.map((area) => [area.slug, area]));
const subjectBySlug = new Map(SUBJECTS.map((subject) => [subject.slug, subject]));
const topicBySlug = new Map(TOPICS.map((topic) => [topic.slug, topic]));

const POSICAO_ALVO = [1, 3, 0, 4, 2, 3, 1, 4, 0, 2, 4, 0, 3, 1, 2, 0, 4, 1, 3, 2];

function deslocamentoDoTopico(slug) {
  let soma = 0;
  for (const caractere of slug) soma = (soma * 31 + caractere.codePointAt(0)) % 9973;
  return soma;
}

function passoDoTopico(slug) {
  let soma = 7;
  for (const caractere of slug) soma = (soma * 131 + caractere.codePointAt(0)) % 7919;
  return soma;
}

function temOrdemNumerica(options) {
  const valores = options.map((option) => {
    const texto = option.text.trim();
    if (texto.length > 14 || !/^[R$\s]*[\d.,]+\s*%?\.?$/.test(texto)) return null;
    const normalizado = texto
      .replace(/[R$\s%.]/g, '')
      .replace(',', '.');
    const valor = Number(normalizado);
    return Number.isFinite(valor) ? valor : null;
  });
  return valores.every((valor) => valor !== null)
    && valores.every((valor, indice) => indice === 0 || valor >= valores[indice - 1]);
}

function balancearGabarito(question, ordem, topicSlug) {
  const options = question.options ?? [];
  const atual = options.findIndex((option) => option.isCorrect);

  if (atual < 0 || options.filter((option) => option.isCorrect).length !== 1) return question;
  if (temOrdemNumerica(options)) return question;

  const semente = deslocamentoDoTopico(topicSlug);
  const passos = [1, 3, 7, 9, 11, 13, 17, 19];
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

    options: rotacionadas.map((option, indice) => ({ ...option, label: options[indice].label })),
  };
}

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
    sourceLabel: question.sourceYear ? `(ENEM ${question.sourceYear})` : '(Autoral · nível ENEM)',
    sourceUrl: question.sourceUrl ?? null,
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

export function contentOfKind(topic, kind) {
  return (topic?.content ?? []).filter((item) => item.kind === kind);
}

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

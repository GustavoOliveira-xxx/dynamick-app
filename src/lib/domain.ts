/**
 * Fonte de verdade dos domínios fechados usados no schema (SQLite não tem enum).
 * Toda validação Zod e todo rótulo de interface derivam daqui.
 */

export const USER_ROLES = ['student', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const PROFILE_SLUGS = [
  'explorador-sem-rota',
  'construtor-de-base',
  'praticante-em-ritmo',
  'cacador-de-lacunas',
  'treinador-de-desempenho',
  'rotina-variavel',
] as const;
export type ProfileSlug = (typeof PROFILE_SLUGS)[number];

export const DIMENSION_KEYS = [
  'autonomy',
  'consistency',
  'perceivedBase',
  'needsDirection',
  'practicePreference',
  'needsShortSessions',
] as const;
export type DimensionKey = (typeof DIMENSION_KEYS)[number];
export type Dimensions = Record<DimensionKey, number>;

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  autonomy: 'Autonomia',
  consistency: 'Consistência',
  perceivedBase: 'Base percebida',
  needsDirection: 'Necessidade de direção',
  practicePreference: 'Preferência por prática',
  needsShortSessions: 'Necessidade de sessões curtas',
};

export const CONFIDENCE_LEVELS = ['low', 'medium', 'high'] as const;
export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];

export const ONBOARDING_STATUS = ['not_started', 'in_progress', 'completed', 'skipped'] as const;
export type OnboardingStatus = (typeof ONBOARDING_STATUS)[number];

export const MASTERY_STATES = [
  'not_started',
  'explored',
  'practicing',
  'needs_review',
  'consolidated',
] as const;
export type MasteryState = (typeof MASTERY_STATES)[number];

export const MASTERY_LABELS: Record<MasteryState, string> = {
  not_started: 'Não iniciado',
  explored: 'Explorado',
  practicing: 'Em prática',
  needs_review: 'Precisa revisar',
  consolidated: 'Consolidado',
};

export const MASTERY_MEANING: Record<MasteryState, string> = {
  not_started: 'Ainda não há dados suficientes.',
  explored: 'Você viu o conteúdo ou respondeu poucas questões.',
  practicing: 'Está acumulando evidências de domínio.',
  needs_review: 'Há erros, baixa confiança ou esquecimento provável.',
  consolidated: 'Desempenho consistente em questões variadas.',
};

export const SESSION_KINDS = ['learn', 'practice', 'review', 'simulate', 'diagnostic'] as const;
export type SessionKind = (typeof SESSION_KINDS)[number];

export const SESSION_KIND_LABELS: Record<SessionKind, string> = {
  learn: 'Aprender',
  practice: 'Praticar',
  review: 'Revisar',
  simulate: 'Simular',
  diagnostic: 'Diagnóstico',
};

export const SESSION_MODES = ['learning', 'exam'] as const;
export type SessionMode = (typeof SESSION_MODES)[number];

export const SESSION_STATUS = ['in_progress', 'paused', 'completed', 'abandoned'] as const;
export type SessionStatus = (typeof SESSION_STATUS)[number];

export const DIFFICULTIES = ['intro', 'intermediate', 'challenging'] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  intro: 'Introdutório',
  intermediate: 'Intermediário',
  challenging: 'Desafiador',
};

export const COGNITIVE_FORMATS = [
  'concept',
  'applied',
  'interpretation',
  'comparison',
  'integration',
] as const;
export type CognitiveFormat = (typeof COGNITIVE_FORMATS)[number];

export const COGNITIVE_FORMAT_LABELS: Record<CognitiveFormat, string> = {
  concept: 'Compreensão direta de conceito',
  applied: 'Aplicação em situação cotidiana',
  interpretation: 'Interpretação de texto, gráfico, tabela, mapa ou dado',
  comparison: 'Comparação entre alternativas próximas',
  integration: 'Integração com outro conceito ou área',
};

export const QUESTION_STATUS = ['seed', 'draft', 'reviewed', 'published', 'archived'] as const;
export type QuestionStatus = (typeof QUESTION_STATUS)[number];

export const CONFIDENCE_ANSWERS = ['sure', 'unsure', 'guess'] as const;
export type ConfidenceAnswer = (typeof CONFIDENCE_ANSWERS)[number];

export const CONFIDENCE_ANSWER_LABELS: Record<ConfidenceAnswer, string> = {
  sure: 'Tenho certeza',
  unsure: 'Estou em dúvida',
  guess: 'Vou chutar',
};

export const ERROR_REASONS = [
  'unknown_content',
  'interpretation',
  'calculation',
  'attention',
  'time',
  'between_options',
  'other',
] as const;
export type ErrorReason = (typeof ERROR_REASONS)[number];

export const ERROR_REASON_LABELS: Record<ErrorReason, string> = {
  unknown_content: 'Não conhecia o conteúdo',
  interpretation: 'Não entendi o que a questão pedia',
  calculation: 'Errei no cálculo ou na execução',
  attention: 'Falta de atenção',
  time: 'Faltou tempo',
  between_options: 'Fiquei em dúvida entre alternativas',
  other: 'Outro motivo',
};

export const RECALL_LEVELS = ['forgot', 'partial', 'mastered'] as const;
export type RecallLevel = (typeof RECALL_LEVELS)[number];

export const RECALL_LABELS: Record<RecallLevel, string> = {
  forgot: 'Não lembro',
  partial: 'Lembro parcialmente',
  mastered: 'Domino',
};

export const NEXT_ACTIONS = [
  'similar_question',
  'review_concept',
  'self_explain',
  'redo_later',
] as const;
export type NextAction = (typeof NEXT_ACTIONS)[number];

export const NEXT_ACTION_LABELS: Record<NextAction, string> = {
  similar_question: 'Resolver questão semelhante',
  review_concept: 'Revisar o conceito',
  self_explain: 'Explicar com minhas palavras',
  redo_later: 'Refazer depois de um intervalo',
};

export const REPORT_KINDS = [
  'wrong_answer_key',
  'ambiguous',
  'accessibility',
  'broken_image',
  'inappropriate',
  'other',
] as const;
export type ReportKind = (typeof REPORT_KINDS)[number];

export const REPORT_KIND_LABELS: Record<ReportKind, string> = {
  wrong_answer_key: 'Gabarito parece errado',
  ambiguous: 'Questão ambígua',
  accessibility: 'Problema de acessibilidade',
  broken_image: 'Imagem quebrada',
  inappropriate: 'Conteúdo inadequado',
  other: 'Outro problema',
};

export const CONTENT_KINDS = [
  'quick_summary',
  'explanation',
  'worked_example',
  'common_mistakes',
  'self_explanation',
  'glossary',
] as const;
export type ContentKind = (typeof CONTENT_KINDS)[number];

export const CONTENT_KIND_LABELS: Record<ContentKind, string> = {
  quick_summary: 'Leitura rápida',
  explanation: 'Explicação principal',
  worked_example: 'Exemplo resolvido',
  common_mistakes: 'Erros comuns',
  self_explanation: 'Explique com suas palavras',
  glossary: 'Glossário',
};

/** Intensidade visual por contexto (§18.3). */
export const VISUAL_INTENSITY = ['high', 'medium-high', 'medium', 'low'] as const;
export type VisualIntensity = (typeof VISUAL_INTENSITY)[number];

export const SEED_ORIGIN = 'AUTORAL_SEED';
export const SEED_LICENSE = 'Conteúdo autoral de desenvolvimento — Conscious Knowledge';

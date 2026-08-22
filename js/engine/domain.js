/** Domínios fechados e rótulos em português. Fonte única de verdade. */

export const PROFILE_SLUGS = [
  'explorador-sem-rota',
  'construtor-de-base',
  'praticante-em-ritmo',
  'cacador-de-lacunas',
  'treinador-de-desempenho',
  'rotina-variavel',
];

export const DIMENSION_KEYS = [
  'autonomy',
  'consistency',
  'perceivedBase',
  'needsDirection',
  'practicePreference',
  'needsShortSessions',
];

export const DIMENSION_LABELS = {
  autonomy: 'Autonomia',
  consistency: 'Consistência',
  perceivedBase: 'Base percebida',
  needsDirection: 'Necessidade de direção',
  practicePreference: 'Preferência por prática',
  needsShortSessions: 'Necessidade de sessões curtas',
};

export const MASTERY_STATES = ['not_started', 'explored', 'practicing', 'needs_review', 'consolidated'];

export const MASTERY_LABELS = {
  not_started: 'Não iniciado',
  explored: 'Explorado',
  practicing: 'Em prática',
  needs_review: 'Precisa revisar',
  consolidated: 'Consolidado',
};

export const MASTERY_MEANING = {
  not_started: 'Ainda não há dados suficientes.',
  explored: 'Você viu o conteúdo ou respondeu poucas questões.',
  practicing: 'Está acumulando evidências de domínio.',
  needs_review: 'Há erros, baixa confiança ou esquecimento provável.',
  consolidated: 'Desempenho consistente em questões variadas.',
};

export const SESSION_KIND_LABELS = {
  learn: 'Aprender',
  practice: 'Praticar',
  review: 'Revisar',
  simulate: 'Simular',
  diagnostic: 'Diagnóstico',
};

export const DIFFICULTY_LABELS = {
  intro: 'Introdutório',
  intermediate: 'Intermediário',
  challenging: 'Desafiador',
};

export const COGNITIVE_FORMAT_LABELS = {
  concept: 'Compreensão direta de conceito',
  applied: 'Aplicação em situação cotidiana',
  interpretation: 'Interpretação de texto, gráfico, tabela, mapa ou dado',
  comparison: 'Comparação entre alternativas próximas',
  integration: 'Integração com outro conceito ou área',
};

export const CONFIDENCE_ANSWERS = ['sure', 'unsure', 'guess'];

export const CONFIDENCE_LABELS = {
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
];

export const ERROR_REASON_LABELS = {
  unknown_content: 'Não conhecia o conteúdo',
  interpretation: 'Não entendi o que a questão pedia',
  calculation: 'Errei no cálculo ou na execução',
  attention: 'Falta de atenção',
  time: 'Faltou tempo',
  between_options: 'Fiquei em dúvida entre alternativas',
  other: 'Outro motivo',
};

export const RECALL_LEVELS = ['forgot', 'partial', 'mastered'];

export const RECALL_LABELS = {
  forgot: 'Não lembro',
  partial: 'Lembro parcialmente',
  mastered: 'Domino',
};

export const NEXT_ACTIONS = ['similar_question', 'review_concept', 'self_explain', 'redo_later'];

export const NEXT_ACTION_LABELS = {
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
];

export const REPORT_KIND_LABELS = {
  wrong_answer_key: 'Gabarito parece errado',
  ambiguous: 'Questão ambígua',
  accessibility: 'Problema de acessibilidade',
  broken_image: 'Imagem quebrada',
  inappropriate: 'Conteúdo inadequado',
  other: 'Outro problema',
};

export const CONTENT_KIND_LABELS = {
  quick_summary: 'Leitura rápida',
  explanation: 'Explicação principal',
  worked_example: 'Exemplo resolvido',
  common_mistakes: 'Erros comuns',
  self_explanation: 'Explique com suas palavras',
  glossary: 'Glossário',
};

export const SEED_ORIGIN = 'AUTORAL_SEED';
export const SEED_LICENSE = 'Conteúdo autoral de desenvolvimento — Conscious Knowledge';

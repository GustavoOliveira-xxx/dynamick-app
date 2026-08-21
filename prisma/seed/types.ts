/**
 * Tipos do conteúdo-semente.
 *
 * TODO O CONTEÚDO AQUI É AUTORAL, criado para desenvolvimento e demonstração
 * (§11.4 do prompt mestre). Nenhuma questão foi copiada de prova oficial, livro ou
 * plataforma de terceiros. Cada registro carrega origem e licença explícitas.
 */

export type SeedArea = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  accent: 'green' | 'teal' | 'cyan' | 'lime';
  order: number;
};

export type SeedSubject = {
  slug: string;
  name: string;
  summary: string;
  areaSlug: string;
  order: number;
};

export type SeedSkill = {
  slug: string;
  name: string;
  description: string;
};

export type SeedContent = {
  slug: string;
  kind: 'quick_summary' | 'explanation' | 'worked_example' | 'common_mistakes' | 'self_explanation' | 'glossary';
  title: string;
  body: string;
  depth?: 'quick' | 'standard' | 'deep';
  order?: number;
};

export type SeedOption = {
  label: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  isCorrect?: boolean;
  /** Comentário obrigatório: por que essa alternativa está certa ou errada. */
  rationale: string;
  /** Que tipo de raciocínio costuma levar o estudante até aqui. */
  errorHint?: string;
};

export type SeedQuestion = {
  slug: string;
  stem: string;
  support?: string;
  difficulty: 'intro' | 'intermediate' | 'challenging';
  cognitiveFormat: 'concept' | 'applied' | 'interpretation' | 'comparison' | 'integration';
  reasoningType: string;
  estimatedSeconds: number;
  skillSlug?: string;
  isRecovery?: boolean;
  likelyErrors: string[];
  options: SeedOption[];
  explanation: {
    summary: string;
    detailed?: string;
    strategy?: string;
    conceptRecap?: string;
  };
};

export type SeedTopic = {
  slug: string;
  name: string;
  subjectSlug: string;
  areaSlug: string;
  summary: string;
  difficulty: 'intro' | 'intermediate' | 'challenging';
  estimatedMinutes: number;
  curationWeight: number;
  order: number;
  /** Slugs de tópicos que ajudam a entender este. */
  prerequisites?: string[];
  related?: string[];
  skills: SeedSkill[];
  content: SeedContent[];
  questions: SeedQuestion[];
};

export type SeedSessionTemplate = {
  slug: string;
  title: string;
  goal: string;
  instructions: string;
  minutes: number;
  mode: 'learning' | 'exam';
  kind: 'learn' | 'practice' | 'review' | 'simulate' | 'diagnostic';
  itemRule: Record<string, unknown>;
  completionRule: string;
  nextRecommendation: string;
  order: number;
};

export type SeedSimulation = {
  slug: string;
  title: string;
  description: string;
  kind: 'full' | 'area' | 'short' | 'custom' | 'diagnostic';
  areaSlug?: string;
  questionCount: number;
  minutes: number;
  blueprint: Record<string, unknown>;
};

export type SeedEssayPrompt = {
  slug: string;
  title: string;
  theme: string;
  focus: string;
  motivatingTexts: { title: string; body: string; source: string }[];
  productionCommand: string;
  planningQuestions: string[];
  repertoire: string[];
  argumentChecklist: string[];
  reviewChecklist: string[];
};

export type SeedStudyMethod = {
  slug: string;
  title: string;
  summary: string;
  howItWorks: string;
  whenToUse: string;
  minutes: number;
  steps: string[];
  example: string;
  limitations: string;
  suitableTopics: string[];
  order: number;
};

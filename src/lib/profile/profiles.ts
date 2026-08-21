import type { Dimensions, DimensionKey, ProfileSlug } from '@/lib/domain';

export type ProfileDefinition = {
  slug: ProfileSlug;
  name: string;
  /** Descrição mostrada ao estudante — nunca soa como diagnóstico. */
  description: string;
  firstApproach: string;
  /** Característica objetiva usada na tela de comparação (§19). */
  trait: string;
  targets: Dimensions;
  personalization: ProfilePersonalization;
  /** Prioridade de desempate — determinística. */
  priority: number;
};

export type ProfilePersonalization = {
  questionsPerSession: number;
  baseMinutes: number;
  /** Proporção aprender / praticar / revisar, sempre somando 100. */
  mix: { learn: number; practice: number; review: number };
  dashboardDirection: 'high' | 'medium' | 'low';
  initialDifficulty: 'intro' | 'intermediate' | 'challenging';
  timer: 'discreet' | 'visible' | 'timed';
  subjectsPerWeek: number;
  reminderFrequency: 'none' | 'low' | 'medium';
  hintsBeforeAnswer: boolean;
  progressTone: 'gentle' | 'neutral' | 'direct';
  resumeAfterAbandon: boolean;
};

/**
 * Premissa de um perfil: condição sem a qual ele não é *sugerido automaticamente*.
 * O estudante continua podendo escolhê-lo manualmente na tela de comparação (§19) —
 * a premissa limita a sugestão automática, nunca o acesso.
 *
 * Existe por causa da Etapa 13 do prompt mestre: a plataforma não deve empurrar
 * alguém com dois anos de preparação para uma rotina de simulados e alta dificuldade
 * apenas porque a pessoa é autônoma e se sente segura.
 */
export type ProfilePremise = {
  /** Explicação legível de por que o perfil não foi sugerido automaticamente. */
  reason: string;
  isEligible: (context: PremiseContext) => boolean;
};

export type PremiseContext = {
  horizon: string | null;
  examHistory: string | null;
  previousPrep: string | null;
};

export const PROFILE_PREMISES: Partial<Record<ProfileSlug, ProfilePremise>> = {
  'treinador-de-desempenho': {
    reason:
      'Este perfil foca em precisão, estratégia e tempo de prova. Ele é sugerido quando a prova está próxima ou quando você já fez o ENEM antes.',
    isEligible: ({ horizon, examHistory }) =>
      horizon === 'prova_proxima' || examHistory === 'enem_1' || examHistory === 'enem_2',
  },
};

/** Pesos por dimensão na distância — declarados, não mágicos. */
export const DIMENSION_WEIGHTS: Record<DimensionKey, number> = {
  autonomy: 1,
  consistency: 1,
  perceivedBase: 1,
  needsDirection: 1.4,
  practicePreference: 1,
  needsShortSessions: 1.2,
};

export const PROFILES: ProfileDefinition[] = [
  {
    slug: 'explorador-sem-rota',
    name: 'Explorador sem rota',
    description: 'Você está começando e quer entender por onde seguir.',
    firstApproach: 'Trilha guiada, sessões curtas e mapa de conteúdos',
    trait: 'Você quer que a plataforma indique o caminho',
    targets: {
      autonomy: 20,
      consistency: 40,
      perceivedBase: 25,
      needsDirection: 90,
      practicePreference: 40,
      needsShortSessions: 55,
    },
    personalization: {
      questionsPerSession: 5,
      baseMinutes: 15,
      mix: { learn: 40, practice: 40, review: 20 },
      dashboardDirection: 'high',
      initialDifficulty: 'intro',
      timer: 'discreet',
      subjectsPerWeek: 2,
      reminderFrequency: 'low',
      hintsBeforeAnswer: true,
      progressTone: 'gentle',
      resumeAfterAbandon: true,
    },
    priority: 1,
  },
  {
    slug: 'construtor-de-base',
    name: 'Construtor de base',
    description: 'Você quer fortalecer fundamentos antes de acelerar.',
    firstApproach: 'Explicações essenciais, pré-requisitos e prática gradual',
    trait: 'Você prefere entender bem antes de acelerar',
    targets: {
      autonomy: 35,
      consistency: 55,
      perceivedBase: 20,
      needsDirection: 65,
      practicePreference: 45,
      needsShortSessions: 50,
    },
    personalization: {
      questionsPerSession: 6,
      baseMinutes: 20,
      mix: { learn: 45, practice: 40, review: 15 },
      dashboardDirection: 'high',
      initialDifficulty: 'intro',
      timer: 'discreet',
      subjectsPerWeek: 2,
      reminderFrequency: 'low',
      hintsBeforeAnswer: true,
      progressTone: 'gentle',
      resumeAfterAbandon: true,
    },
    priority: 2,
  },
  {
    slug: 'praticante-em-ritmo',
    name: 'Praticante em ritmo',
    description: 'Você já consegue estudar e quer manter constância.',
    firstApproach: 'Plano semanal equilibrado e sessões recorrentes',
    trait: 'Você já tem uma rotina e quer mantê-la',
    targets: {
      autonomy: 65,
      consistency: 80,
      perceivedBase: 60,
      needsDirection: 35,
      practicePreference: 65,
      needsShortSessions: 35,
    },
    personalization: {
      questionsPerSession: 10,
      baseMinutes: 30,
      mix: { learn: 25, practice: 50, review: 25 },
      dashboardDirection: 'medium',
      initialDifficulty: 'intermediate',
      timer: 'visible',
      subjectsPerWeek: 3,
      reminderFrequency: 'medium',
      hintsBeforeAnswer: false,
      progressTone: 'neutral',
      resumeAfterAbandon: true,
    },
    priority: 3,
  },
  {
    slug: 'cacador-de-lacunas',
    name: 'Caçador de lacunas',
    description: 'Você já estudou parte do conteúdo e quer atacar dificuldades específicas.',
    firstApproach: 'Diagnóstico por tópico, questões semelhantes e revisão de erros',
    trait: 'Você já tem base e quer encontrar as lacunas',
    targets: {
      autonomy: 75,
      consistency: 60,
      perceivedBase: 65,
      needsDirection: 30,
      practicePreference: 80,
      needsShortSessions: 45,
    },
    personalization: {
      questionsPerSession: 10,
      baseMinutes: 30,
      mix: { learn: 20, practice: 45, review: 35 },
      dashboardDirection: 'low',
      initialDifficulty: 'intermediate',
      timer: 'visible',
      subjectsPerWeek: 3,
      reminderFrequency: 'low',
      hintsBeforeAnswer: false,
      progressTone: 'direct',
      resumeAfterAbandon: true,
    },
    priority: 4,
  },
  {
    slug: 'treinador-de-desempenho',
    name: 'Treinador de desempenho',
    description: 'Você busca melhorar precisão, estratégia e tempo.',
    firstApproach: 'Simulados, análise de tempo e questões integradas',
    trait: 'Você prefere estudar diretamente por questões e simulados',
    targets: {
      autonomy: 85,
      consistency: 75,
      perceivedBase: 80,
      needsDirection: 20,
      practicePreference: 90,
      needsShortSessions: 25,
    },
    personalization: {
      questionsPerSession: 14,
      baseMinutes: 45,
      mix: { learn: 10, practice: 60, review: 30 },
      dashboardDirection: 'low',
      initialDifficulty: 'challenging',
      timer: 'timed',
      subjectsPerWeek: 4,
      reminderFrequency: 'low',
      hintsBeforeAnswer: false,
      progressTone: 'direct',
      resumeAfterAbandon: false,
    },
    priority: 5,
  },
  {
    slug: 'rotina-variavel',
    name: 'Estudante de rotina variável',
    description: 'Seu tempo muda e o plano precisa acompanhar sua realidade.',
    firstApproach: 'Sessões modulares, retomada e replanejamento automático',
    trait: 'Você tem rotina variável e precisa de flexibilidade',
    targets: {
      autonomy: 55,
      consistency: 20,
      perceivedBase: 50,
      needsDirection: 50,
      practicePreference: 55,
      needsShortSessions: 90,
    },
    personalization: {
      questionsPerSession: 6,
      baseMinutes: 15,
      mix: { learn: 30, practice: 45, review: 25 },
      dashboardDirection: 'medium',
      initialDifficulty: 'intermediate',
      timer: 'discreet',
      subjectsPerWeek: 2,
      reminderFrequency: 'low',
      hintsBeforeAnswer: false,
      progressTone: 'gentle',
      resumeAfterAbandon: true,
    },
    priority: 6,
  },
];

const BY_SLUG = new Map(PROFILES.map((profile) => [profile.slug, profile]));

export function getProfile(slug: string | null | undefined): ProfileDefinition {
  return BY_SLUG.get((slug ?? '') as ProfileSlug) ?? PROFILES[0]!;
}

export function isProfileSlug(value: string): value is ProfileSlug {
  return BY_SLUG.has(value as ProfileSlug);
}

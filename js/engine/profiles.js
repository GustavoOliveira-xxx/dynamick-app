

export const DIMENSION_WEIGHTS = {
  autonomy: 1,
  consistency: 1,
  perceivedBase: 1,
  needsDirection: 1.4,
  practicePreference: 1,
  needsShortSessions: 1.2,
};









export const PROFILE_PREMISES = {
  'treinador-de-desempenho': {
    reason:
      'Este perfil foca em precisão, estratégia e tempo de prova. Ele é sugerido quando a prova está próxima ou quando você já fez o ENEM antes.',
    isEligible: ({ horizon, examHistory }) =>
      horizon === 'prova_proxima' || examHistory === 'enem_1' || examHistory === 'enem_2',
  },
};

export const PROFILES = [
  {
    slug: 'explorador-sem-rota',
    name: 'Explorador sem rota',
    description: 'Você está começando e quer entender por onde seguir.',
    firstApproach: 'Trilha guiada, sessões curtas e mapa de conteúdos',
    trait: 'Você quer que a plataforma indique o caminho',
    priority: 1,
    targets: { autonomy: 20, consistency: 40, perceivedBase: 25, needsDirection: 90, practicePreference: 40, needsShortSessions: 55 },
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
      suggestedMethods: ['sessao-de-foco-curto', 'estudo-ativo', 'explicacao-com-as-proprias-palavras'],
      methodRationale:
        'reduzem o custo de começar e dão retorno rápido, já que você ainda está montando a rotina',
    },
  },
  {
    slug: 'construtor-de-base',
    name: 'Construtor de base',
    description: 'Você quer fortalecer fundamentos antes de acelerar.',
    firstApproach: 'Explicações essenciais, pré-requisitos e prática gradual',
    trait: 'Você prefere entender bem antes de acelerar',
    priority: 2,
    targets: { autonomy: 35, consistency: 55, perceivedBase: 20, needsDirection: 65, practicePreference: 45, needsShortSessions: 50 },
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
      suggestedMethods: ['explicacao-com-as-proprias-palavras', 'estudo-ativo', 'recuperacao'],
      methodRationale:
        'forçam entendimento antes de velocidade, que é o que você disse querer',
    },
  },
  {
    slug: 'praticante-em-ritmo',
    name: 'Praticante em ritmo',
    description: 'Você já consegue estudar e quer manter constância.',
    firstApproach: 'Plano semanal equilibrado e sessões recorrentes',
    trait: 'Você já tem uma rotina e quer mantê-la',
    priority: 3,
    targets: { autonomy: 65, consistency: 80, perceivedBase: 60, needsDirection: 35, practicePreference: 65, needsShortSessions: 35 },
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
      suggestedMethods: ['revisao-espacada', 'pratica-intercalada', 'recuperacao'],
      methodRationale:
        'sustentam constância sem aumentar o tempo de estudo',
    },
  },
  {
    slug: 'cacador-de-lacunas',
    name: 'Caçador de lacunas',
    description: 'Você já estudou parte do conteúdo e quer atacar dificuldades específicas.',
    firstApproach: 'Diagnóstico por tópico, questões semelhantes e revisão de erros',
    trait: 'Você já tem base e quer encontrar as lacunas',
    priority: 4,
    targets: { autonomy: 75, consistency: 60, perceivedBase: 65, needsDirection: 30, practicePreference: 80, needsShortSessions: 45 },
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
      suggestedMethods: ['caderno-de-erros', 'recuperacao', 'pratica-intercalada'],
      methodRationale:
        'transformam erro em informação útil, que é o seu foco declarado',
    },
  },
  {
    slug: 'treinador-de-desempenho',
    name: 'Treinador de desempenho',
    description: 'Você busca melhorar precisão, estratégia e tempo.',
    firstApproach: 'Simulados, análise de tempo e questões integradas',
    trait: 'Você prefere estudar diretamente por questões e simulados',
    priority: 5,
    targets: { autonomy: 85, consistency: 75, perceivedBase: 80, needsDirection: 20, practicePreference: 90, needsShortSessions: 25 },
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
      suggestedMethods: ['simulado-com-analise', 'pratica-intercalada', 'caderno-de-erros'],
      methodRationale:
        'treinam decisão sob tempo e análise de desempenho',
    },
  },
  {
    slug: 'rotina-variavel',
    name: 'Estudante de rotina variável',
    description: 'Seu tempo muda e o plano precisa acompanhar sua realidade.',
    firstApproach: 'Sessões modulares, retomada e replanejamento automático',
    trait: 'Você tem rotina variável e precisa de flexibilidade',
    priority: 6,
    targets: { autonomy: 55, consistency: 20, perceivedBase: 50, needsDirection: 50, practicePreference: 55, needsShortSessions: 90 },
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
      suggestedMethods: ['sessao-de-foco-curto', 'revisao-espacada', 'recuperacao'],
      methodRationale:
        'funcionam em blocos curtos e toleram dias em que você não consegue estudar',
    },
  },
];

const BY_SLUG = new Map(PROFILES.map((profile) => [profile.slug, profile]));

export function getProfile(slug) {
  return BY_SLUG.get(slug) ?? PROFILES[0];
}

export function isProfileSlug(value) {
  return BY_SLUG.has(value);
}

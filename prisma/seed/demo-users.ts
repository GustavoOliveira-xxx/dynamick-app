import type { AnswerMap } from '../../src/lib/profile/engine';

/**
 * Usuários de demonstração (§11.9 e "Perfis de teste obrigatórios" do ONBOARDING_SPEC.md).
 * NENHUM dado pessoal real: nomes fictícios e e-mails no domínio reservado .local.
 */

export type DemoUser = {
  email: string;
  name: string;
  role?: 'student' | 'admin';
  /** Cenário obrigatório coberto por este usuário. */
  scenario: string;
  answers: AnswerMap;
  /** Se true, o onboarding é marcado como pulado. */
  skipOnboarding?: boolean;
  /** Perfil confirmado pelo usuário, quando diferente da sugestão automática. */
  confirmChoice?: string;
  /** Histórico simulado: quantas questões responder e com que taxa de acerto por área. */
  history?: {
    topicSlug: string;
    /** Quantas questões do tópico responder, na ordem em que aparecem no seed. */
    answered: number;
    /** Quantas dessas devem ser acertos. */
    correct: number;
    sessions: number;
    confidence?: 'sure' | 'unsure' | 'guess';
    /** Motivo declarado para os erros. */
    errorReason?: string;
    daysAgo: number;
  }[];
};

export const DEMO_USERS: DemoUser[] = [
  {
    email: 'aluno.perdido@dynamick.local',
    name: 'Alex',
    scenario: '1. Estudante perdido com pouco tempo',
    answers: {
      schoolYear: 'em2',
      previousPrep: 'nunca',
      examHistory: 'nenhum',
      horizon: 'enem_2027',
      daysPerWeek: '2',
      sessionMinutes: '10',
      routineStability: 'pouco',
      autonomyStatement: 'perdido',
      frictions: ['por_onde_comecar', 'perder_ritmo'],
    },
    history: [
      { topicSlug: 'interpretacao-e-inferencia', answered: 3, correct: 1, sessions: 1, confidence: 'unsure', errorReason: 'interpretation', daysAgo: 4 },
    ],
  },
  {
    email: 'aluno.organizado@dynamick.local',
    name: 'Bruna',
    scenario: '2. Estudante organizado com rotina própria',
    answers: {
      schoolYear: 'em3',
      previousPrep: 'cronograma',
      examHistory: 'simulados',
      horizon: 'enem_2027',
      goals: ['desempenho', 'rotina'],
      primaryGoal: 'desempenho',
      daysPerWeek: '5',
      sessionMinutes: '30',
      preferredTimes: ['noite'],
      routineStability: 'regular',
      autonomyStatement: 'cronograma_externo',
      studyPreferences: ['sequencia_questoes', 'revisao_erros'],
      frictions: [],
      selfAssessment: {
        linguagens: 'secure',
        matematica: 'unknown',
        'ciencias-humanas': 'secure',
        'ciencias-natureza': 'insecure',
        redacao: 'unknown',
      },
      theme: 'dark',
    },
    history: [
      { topicSlug: 'porcentagem-e-variacao', answered: 5, correct: 4, sessions: 2, confidence: 'sure', errorReason: 'calculation', daysAgo: 6 },
      { topicSlug: 'leitura-de-graficos-e-tabelas', answered: 4, correct: 3, sessions: 2, confidence: 'sure', errorReason: 'attention', daysAgo: 2 },
      { topicSlug: 'ecologia-e-ciclos', answered: 3, correct: 1, sessions: 1, confidence: 'unsure', errorReason: 'unknown_content', daysAgo: 9 },
    ],
  },
  {
    email: 'aluno.interpretacao@dynamick.local',
    name: 'Caio',
    scenario: '3. Boa base, mas erra por interpretação',
    answers: {
      schoolYear: 'concluido',
      previousPrep: 'cronograma',
      examHistory: 'enem_1',
      horizon: 'prova_proxima',
      goals: ['desempenho'],
      primaryGoal: 'desempenho',
      daysPerWeek: '4',
      sessionMinutes: '30',
      preferredTimes: ['tarde'],
      routineStability: 'pouco',
      autonomyStatement: 'sei_praticar',
      studyPreferences: ['sequencia_questoes', 'revisao_erros'],
      frictions: ['interpretacao'],
      selfAssessment: {
        linguagens: 'insecure',
        matematica: 'secure',
        'ciencias-humanas': 'secure',
        'ciencias-natureza': 'secure',
        redacao: 'insecure',
      },
      theme: 'dark',
    },
    history: [
      { topicSlug: 'porcentagem-e-variacao', answered: 5, correct: 5, sessions: 2, confidence: 'sure', daysAgo: 8 },
      { topicSlug: 'interpretacao-e-inferencia', answered: 5, correct: 2, sessions: 2, confidence: 'unsure', errorReason: 'interpretation', daysAgo: 3 },
      { topicSlug: 'generos-textuais-e-funcao-social', answered: 4, correct: 2, sessions: 2, confidence: 'unsure', errorReason: 'interpretation', daysAgo: 5 },
    ],
  },
  {
    email: 'aluno.rotina-variavel@dynamick.local',
    name: 'Dani',
    scenario: '4. Abandona sessões longas',
    answers: {
      schoolYear: 'em2',
      previousPrep: 'por_conta',
      examHistory: 'nenhum',
      horizon: 'enem_2027',
      goals: ['rotina'],
      primaryGoal: 'rotina',
      daysPerWeek: '2',
      sessionMinutes: '10',
      preferredTimes: ['varia'],
      routineStability: 'muito',
      autonomyStatement: 'preciso_plano',
      studyPreferences: ['explicacao_curta'],
      frictions: ['perder_ritmo', 'abandonar_ao_errar'],
      selfAssessment: {
        linguagens: 'unknown',
        matematica: 'insecure',
        'ciencias-humanas': 'unknown',
        'ciencias-natureza': 'unknown',
        redacao: 'unknown',
      },
      theme: 'dark',
    },
    history: [
      { topicSlug: 'porcentagem-e-variacao', answered: 2, correct: 1, sessions: 1, confidence: 'guess', errorReason: 'unknown_content', daysAgo: 12 },
    ],
  },
  {
    email: 'aluno.confiante@dynamick.local',
    name: 'Elis',
    scenario: '5. Declara segurança, mas o desempenho é baixo',
    answers: {
      schoolYear: 'em3',
      previousPrep: 'por_conta',
      examHistory: 'simulados',
      horizon: 'enem_2027',
      goals: ['desempenho'],
      primaryGoal: 'desempenho',
      daysPerWeek: '3',
      sessionMinutes: '30',
      routineStability: 'pouco',
      autonomyStatement: 'sei_praticar',
      studyPreferences: ['sequencia_questoes'],
      frictions: [],
      selfAssessment: {
        linguagens: 'secure',
        matematica: 'secure',
        'ciencias-humanas': 'secure',
        'ciencias-natureza': 'secure',
        redacao: 'secure',
      },
      theme: 'dark',
    },
    history: [
      { topicSlug: 'funcoes-e-relacoes', answered: 5, correct: 1, sessions: 2, confidence: 'sure', errorReason: 'calculation', daysAgo: 2 },
      { topicSlug: 'transformacoes-quimicas', answered: 4, correct: 1, sessions: 2, confidence: 'sure', errorReason: 'unknown_content', daysAgo: 5 },
    ],
  },
  {
    email: 'aluno.inseguro@dynamick.local',
    name: 'Fabi',
    scenario: '6. Declara insegurança, mas o desempenho é bom',
    answers: {
      schoolYear: 'em2',
      previousPrep: 'cronograma',
      examHistory: 'simulados',
      horizon: 'enem_2027',
      goals: ['base'],
      primaryGoal: 'base',
      daysPerWeek: '4',
      sessionMinutes: '20',
      routineStability: 'regular',
      autonomyStatement: 'preciso_plano',
      studyPreferences: ['explicacao_curta', 'exemplo_resolvido'],
      frictions: ['ansiedade_tempo'],
      selfAssessment: {
        linguagens: 'insecure',
        matematica: 'insecure',
        'ciencias-humanas': 'insecure',
        'ciencias-natureza': 'insecure',
        redacao: 'insecure',
      },
      theme: 'dark',
    },
    history: [
      { topicSlug: 'cidadania-e-direitos', answered: 5, correct: 5, sessions: 2, confidence: 'unsure', daysAgo: 3 },
      { topicSlug: 'ecologia-e-ciclos', answered: 5, correct: 4, sessions: 2, confidence: 'unsure', errorReason: 'attention', daysAgo: 6 },
    ],
  },
  {
    email: 'aluno.pulou-onboarding@dynamick.local',
    name: 'Gabi',
    scenario: '7. Pulou o onboarding',
    answers: {},
    skipOnboarding: true,
  },
  {
    email: 'curadoria@dynamick.local',
    name: 'Equipe de curadoria',
    role: 'admin',
    scenario: 'Administrador de conteúdo',
    answers: {
      schoolYear: 'concluido',
      previousPrep: 'cronograma',
      horizon: 'sem_data',
      daysPerWeek: '3',
      sessionMinutes: '30',
      autonomyStatement: 'sei_praticar',
    },
  },
];

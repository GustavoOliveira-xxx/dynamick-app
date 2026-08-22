/**
 * Questionário de onboarding, versão v1.
 *
 * Cada opção declara o efeito que tem nas dimensões do perfil. É a fonte única:
 * o motor de perfil lê daqui, e a tela de confirmação explica a partir daqui.
 */

export const QUESTIONNAIRE_VERSION = 'v1';

export const AREA_SELF_ASSESSMENT = [
  { slug: 'linguagens', label: 'Linguagens' },
  { slug: 'matematica', label: 'Matemática' },
  { slug: 'ciencias-humanas', label: 'Ciências Humanas' },
  { slug: 'ciencias-natureza', label: 'Ciências da Natureza' },
  { slug: 'redacao', label: 'Redação' },
];

export const SELF_ASSESSMENT_OPTIONS = [
  { value: 'secure', label: 'Me sinto seguro' },
  { value: 'insecure', label: 'Me sinto inseguro' },
  { value: 'unknown', label: 'Não sei dizer' },
];

export const ONBOARDING_STEPS = [
  {
    slug: 'contexto',
    letter: 'A',
    title: 'Contexto',
    intro: 'Primeiro, onde você está agora. Não existe resposta certa nem errada aqui.',
    required: true,
    questions: [
      {
        id: 'schoolYear',
        prompt: 'Em que momento dos estudos você está?',
        type: 'single',
        required: true,
        options: [
          { value: 'em1', label: '1º ano do ensino médio' },
          { value: 'em2', label: '2º ano do ensino médio' },
          { value: 'em3', label: '3º ano do ensino médio', effect: { perceivedBase: 5 } },
          { value: 'concluido', label: 'Já terminei o ensino médio', effect: { perceivedBase: 5 } },
          { value: 'fundamental', label: 'Ainda não estou no ensino médio' },
          { value: 'nao_dizer', label: 'Prefiro não dizer' },
        ],
      },
      {
        id: 'previousPrep',
        prompt: 'Você já se preparou para o ENEM antes?',
        type: 'single',
        required: true,
        options: [
          { value: 'nunca', label: 'Ainda não', effect: { needsDirection: 15, perceivedBase: -10 } },
          { value: 'por_conta', label: 'Estudei por conta própria, sem plano', effect: { autonomy: 5, needsDirection: 5 } },
          { value: 'cronograma', label: 'Sigo ou já segui um cronograma ou cursinho', effect: { autonomy: 10, perceivedBase: 10 } },
          {
            value: 'nao_sei',
            label: 'Não sei ainda',
            hint: 'Sem problema. Vamos sugerir um diagnóstico leve mais adiante.',
            triggersDiagnostic: true,
          },
        ],
      },
      {
        id: 'examHistory',
        prompt: 'Você já fez a prova ou simulados?',
        type: 'single',
        options: [
          { value: 'nenhum', label: 'Nunca fiz' },
          { value: 'simulados', label: 'Já fiz simulados', effect: { perceivedBase: 5 } },
          { value: 'enem_1', label: 'Já fiz o ENEM uma vez', effect: { perceivedBase: 10 } },
          { value: 'enem_2', label: 'Já fiz o ENEM mais de uma vez', effect: { perceivedBase: 12 } },
        ],
      },
      {
        id: 'horizon',
        prompt: 'Qual é o seu horizonte de preparação?',
        type: 'single',
        required: true,
        options: [
          { value: 'enem_2027', label: 'ENEM 2027, com tempo pela frente' },
          { value: 'prova_proxima', label: 'Uma prova em menos de 6 meses', effect: { practicePreference: 15 } },
          { value: 'sem_data', label: 'Ainda sem data definida' },
          { value: 'explorando', label: 'Só estou explorando', effect: { needsDirection: 10 } },
        ],
      },
    ],
  },
  {
    slug: 'objetivo',
    letter: 'B',
    title: 'Objetivo e motivação',
    intro: 'O que você quer conseguir agora. Isso nunca vira cobrança nem ranking.',
    required: false,
    questions: [
      {
        id: 'goals',
        prompt: 'O que você quer conseguir agora?',
        help: 'Pode marcar mais de um.',
        type: 'multiple',
        options: [
          { value: 'base', label: 'Construir base com calma', effect: { perceivedBase: -5, needsDirection: 5 } },
          { value: 'desempenho', label: 'Melhorar meu desempenho', effect: { practicePreference: 10 } },
          { value: 'prova_proxima', label: 'Me preparar para uma prova próxima', effect: { practicePreference: 15 } },
          { value: 'rotina', label: 'Organizar uma rotina de estudos', effect: { consistency: -10, needsDirection: 10 } },
          { value: 'curso', label: 'Testar possibilidades de curso', effect: { needsDirection: 5 } },
        ],
      },
      {
        id: 'primaryGoal',
        prompt: 'Entre os que você marcou, qual é o principal?',
        help: 'O objetivo principal orienta a primeira recomendação. Você pode mudar depois.',
        type: 'single',
        dependsOn: 'goals',
        options: [],
      },
    ],
  },
  {
    slug: 'rotina',
    letter: 'C',
    title: 'Disponibilidade real',
    intro:
      'Responda com o tempo que você realmente tem, não com o que gostaria de ter. Usamos isso como limite, não como meta.',
    required: true,
    questions: [
      {
        id: 'daysPerWeek',
        prompt: 'Quantos dias por semana você consegue estudar?',
        type: 'single',
        required: true,
        variant: 'chip',
        options: [
          { value: '1', label: '1 dia' },
          { value: '2', label: '2 dias' },
          { value: '3', label: '3 dias' },
          { value: '4', label: '4 dias' },
          { value: '5', label: '5 dias' },
          { value: '6', label: '6 dias' },
          { value: '7', label: 'Todos os dias' },
        ],
      },
      {
        id: 'sessionMinutes',
        prompt: 'Quanto tempo você costuma ter em cada sessão?',
        help: 'Nenhuma sessão sugerida vai passar desse tempo.',
        type: 'single',
        required: true,
        allowCustom: true,
        customLabel: 'Outro tempo (minutos)',
        variant: 'chip',
        options: [
          { value: '10', label: '10 minutos', effect: { needsShortSessions: 30 } },
          { value: '20', label: '20 minutos', effect: { needsShortSessions: 15 } },
          { value: '30', label: '30 minutos' },
          { value: '45', label: '45 minutos', effect: { needsShortSessions: -10 } },
          { value: '60', label: '60 minutos', effect: { needsShortSessions: -20 } },
        ],
      },
      {
        id: 'preferredTimes',
        prompt: 'Quais horários são mais prováveis?',
        type: 'multiple',
        variant: 'chip',
        options: [
          { value: 'manha', label: 'Manhã' },
          { value: 'tarde', label: 'Tarde' },
          { value: 'noite', label: 'Noite' },
          { value: 'madrugada', label: 'Madrugada' },
          { value: 'varia', label: 'Varia muito', effect: { consistency: -10 } },
        ],
      },
      {
        id: 'routineStability',
        prompt: 'Sua rotina costuma variar?',
        type: 'single',
        options: [
          { value: 'regular', label: 'É bem regular', effect: { consistency: 15 } },
          { value: 'pouco', label: 'Varia um pouco' },
          { value: 'muito', label: 'Muda bastante', effect: { consistency: -20, needsShortSessions: 10 } },
        ],
      },
    ],
  },
  {
    slug: 'autonomia',
    letter: 'D',
    title: 'Autonomia e organização',
    intro: 'Isso define quanta direção a plataforma dá no seu dia a dia.',
    required: true,
    questions: [
      {
        id: 'autonomyStatement',
        prompt: 'Qual frase descreve melhor você hoje?',
        type: 'single',
        required: true,
        options: [
          {
            value: 'sei_praticar',
            label: 'Sei o que preciso estudar e quero praticar.',
            effect: { autonomy: 30, needsDirection: -30, practicePreference: 15 },
          },
          {
            value: 'preciso_plano',
            label: 'Tenho alguma noção, mas preciso de um plano.',
            effect: { autonomy: 5, needsDirection: 10 },
          },
          {
            value: 'perdido',
            label: 'Estou perdido e quero que a plataforma me guie.',
            effect: { autonomy: -25, needsDirection: 30 },
          },
          {
            value: 'cronograma_externo',
            label: 'Já tenho um cronograma externo e quero usar a plataforma como apoio.',
            effect: { autonomy: 25, needsDirection: -20 },
          },
        ],
      },
    ],
  },
  {
    slug: 'preferencias',
    letter: 'E',
    title: 'Preferência de estudo',
    intro:
      'Isso só muda a ordem do que aparece primeiro. Você continua tendo acesso a todos os formatos — uma preferência declarada não significa que você só aprende de uma forma.',
    required: false,
    questions: [
      {
        id: 'studyPreferences',
        prompt: 'O que costuma te ajudar mais?',
        type: 'multiple',
        options: [
          { value: 'explicacao_curta', label: 'Uma explicação curta' },
          { value: 'exemplo_resolvido', label: 'Um exemplo resolvido' },
          { value: 'sequencia_questoes', label: 'Uma sequência de questões', effect: { practicePreference: 15 } },
          { value: 'revisao_erros', label: 'Rever meus erros', effect: { practicePreference: 5 } },
          { value: 'cronometrada', label: 'Uma sessão cronometrada', effect: { practicePreference: 10 } },
          { value: 'resumo', label: 'Ler um resumo' },
          { value: 'video', label: 'Vídeo' },
          { value: 'depende', label: 'Depende do dia' },
        ],
      },
    ],
  },
  {
    slug: 'desafios',
    letter: 'F',
    title: 'O que costuma atrapalhar',
    intro:
      'Isso gera apoio prático dentro da plataforma. Não é avaliação psicológica e não vira diagnóstico.',
    required: false,
    questions: [
      {
        id: 'frictions',
        prompt: 'O que costuma atrapalhar seus estudos?',
        type: 'multiple',
        options: [
          {
            value: 'por_onde_comecar',
            label: 'Não saber por onde começar',
            effect: { needsDirection: 15 },
            support: 'Uma recomendação principal única e destacada no seu início.',
          },
          {
            value: 'perder_ritmo',
            label: 'Perder o ritmo',
            effect: { consistency: -10 },
            support: 'Sessões menores e retomada explícita quando você voltar.',
          },
          {
            value: 'esquecer',
            label: 'Estudar e esquecer',
            support: 'Revisão espaçada ligada por padrão no seu plano.',
          },
          {
            value: 'interpretacao',
            label: 'Dificuldade para interpretar questões',
            support: 'Prioridade para tópicos de interpretação e leitura guiada.',
          },
          {
            value: 'ansiedade_tempo',
            label: 'Ficar ansioso com o tempo',
            support: 'Cronômetro discreto por padrão e modo sem pressão disponível.',
          },
          {
            value: 'abandonar_ao_errar',
            label: 'Abandonar quando erro',
            support: 'Correção sem linguagem de culpa e atalho para uma questão semelhante.',
          },
          {
            value: 'nao_revisar',
            label: 'Não conseguir revisar',
            support: 'Um bloco curto de revisão fixo no plano da semana.',
          },
        ],
      },
    ],
  },
  {
    slug: 'areas',
    letter: 'G',
    title: 'Como você se sente em cada área',
    intro:
      'Isso é um ponto de partida. Depois vamos comparar com o que acontecer na prática — e a prática pode discordar de você.',
    required: false,
    questions: [
      { id: 'selfAssessment', prompt: 'Como você se sente em cada área hoje?', type: 'scale-per-area' },
    ],
  },
  {
    slug: 'conforto',
    letter: 'H',
    title: 'Interface e acessibilidade',
    intro: 'Tudo aqui pode ser mudado depois em Meu perfil de estudo.',
    required: false,
    questions: [
      {
        id: 'theme',
        prompt: 'Tema da interface',
        type: 'single',
        variant: 'chip',
        options: [
          { value: 'dark', label: 'Escuro (padrão)' },
          { value: 'light', label: 'Claro' },
        ],
      },
      {
        id: 'textScale',
        prompt: 'Tamanho do texto',
        type: 'single',
        variant: 'chip',
        options: [
          { value: '100', label: 'Padrão' },
          { value: '112', label: 'Maior' },
          { value: '125', label: 'Bem maior' },
        ],
      },
      {
        id: 'reducedMotion',
        prompt: 'Animações',
        type: 'single',
        variant: 'chip',
        options: [
          { value: 'auto', label: 'Seguir meu sistema' },
          { value: 'always', label: 'Sempre reduzir' },
        ],
      },
      {
        id: 'highContrast',
        prompt: 'Aumentar contraste',
        type: 'single',
        variant: 'chip',
        options: [
          { value: 'false', label: 'Não' },
          { value: 'true', label: 'Sim' },
        ],
      },
      {
        id: 'visualIntensity',
        prompt: 'Fundo animado',
        type: 'single',
        variant: 'chip',
        options: [
          { value: 'full', label: 'Completo' },
          { value: 'reduced', label: 'Modo visual reduzido' },
        ],
      },
      {
        id: 'reminders',
        prompt: 'Quer receber lembretes de estudo?',
        help: 'Vem desligado. Se ligar, são poucos e você escolhe quando.',
        type: 'single',
        variant: 'chip',
        options: [
          { value: 'false', label: 'Não, obrigado' },
          { value: 'true', label: 'Sim, quero lembretes' },
        ],
      },
    ],
  },
];

export const REQUIRED_STEPS = ONBOARDING_STEPS.filter((step) => step.required).map((s) => s.slug);

export function getStep(slug) {
  return ONBOARDING_STEPS.find((step) => step.slug === slug);
}

export function stepIndex(slug) {
  return ONBOARDING_STEPS.findIndex((step) => step.slug === slug);
}

export function nextStepSlug(slug) {
  const index = stepIndex(slug);
  if (index < 0 || index >= ONBOARDING_STEPS.length - 1) return null;
  return ONBOARDING_STEPS[index + 1].slug;
}

export function previousStepSlug(slug) {
  const index = stepIndex(slug);
  return index <= 0 ? null : ONBOARDING_STEPS[index - 1].slug;
}

/** Primeira etapa ainda não concluída nem pulada — usada na retomada. */
export function firstIncompleteStep(completed, skipped) {
  const done = new Set([...completed, ...skipped]);
  return ONBOARDING_STEPS.find((step) => !done.has(step.slug))?.slug ?? null;
}

export function findQuestion(questionId) {
  for (const step of ONBOARDING_STEPS) {
    const question = step.questions.find((item) => item.id === questionId);
    if (question) return { step, question };
  }
  return null;
}

export function findOption(questionId, value) {
  const found = findQuestion(questionId);
  return found?.question.options?.find((option) => option.value === value) ?? null;
}

export const MESSAGES = {
  opening:
    'Vamos entender como você estuda hoje para montar uma experiência que combine melhor com sua rotina. Seu perfil não é uma etiqueta fixa: ele pode mudar conforme você pratica.',
  resumed: 'Você parou aqui. Suas respostas anteriores foram salvas.',
  skipped: 'Sem problema. Você pode responder isso depois em Meu perfil de estudo.',
  insufficient:
    'Ainda não temos informação suficiente para uma sugestão firme. Vamos começar com algo leve e ajustar conforme você praticar.',
  contradiction:
    'Algumas respostas apontam para caminhos diferentes. Começamos pelo mais seguro e ajustamos com a prática.',
  rejectedProfile:
    'Obrigado por dizer. Escolha o que fizer mais sentido agora — dá para mudar quando quiser.',
};

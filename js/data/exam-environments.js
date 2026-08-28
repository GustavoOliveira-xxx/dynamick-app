export const EXAM_ENVIRONMENTS = [
  {
    slug: 'flexivel',
    title: 'Treino flexível',
    eyebrow: 'Conhecer o formato',
    description: 'Sem limite total e com pausa. Mantém a correção apenas no final, mas reduz a pressão enquanto você conhece o simulado.',
    timeFactor: null,
    showTimer: false,
    allowPause: true,
    focusMode: false,
    pacePerQuestion: false,
    eliminationDefault: true,
    confidencePrompt: true,
  },
  {
    slug: 'padrao',
    title: 'Simulado padrão',
    eyebrow: 'Ritmo equilibrado',
    description: 'Usa o tempo previsto, permite pausar e mostra o relógio. É o ponto de equilíbrio para a rotina semanal.',
    timeFactor: 1,
    showTimer: true,
    allowPause: true,
    focusMode: false,
    pacePerQuestion: false,
    eliminationDefault: true,
    confidencePrompt: true,
  },
  {
    slug: 'sala-real',
    title: 'Sala de prova',
    eyebrow: 'Imersão realista',
    description: 'Tempo integral, interface concentrada e sem pausa durante a execução. Treina permanência, decisão e revisão antes da entrega.',
    timeFactor: 1,
    showTimer: true,
    allowPause: false,
    focusMode: true,
    pacePerQuestion: false,
    eliminationDefault: true,
    confidencePrompt: false,
  },
  {
    slug: 'ritmo-intenso',
    title: 'Ritmo intenso',
    eyebrow: 'Pressão controlada',
    description: 'Reduz o tempo a 75%, mostra a meta por questão e não permite pausa. Serve para treinar decisões quando o relógio aperta.',
    timeFactor: 0.75,
    showTimer: true,
    allowPause: false,
    focusMode: true,
    pacePerQuestion: true,
    eliminationDefault: true,
    confidencePrompt: false,
  },
];

export function getExamEnvironment(slug) {
  return EXAM_ENVIRONMENTS.find((environment) => environment.slug === slug)
    ?? EXAM_ENVIRONMENTS.find((environment) => environment.slug === 'padrao');
}

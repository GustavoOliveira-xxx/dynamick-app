import type { SeedSessionTemplate, SeedSimulation } from './types';

/**
 * Sessões prontas (§11.6). Cada uma tem objetivo, instruções, duração,
 * regra de seleção de itens, critério de conclusão e recomendação posterior.
 */
export const SESSION_TEMPLATES: SeedSessionTemplate[] = [
  {
    slug: 'comece-por-interpretacao',
    title: 'Comece por interpretação',
    goal: 'Diferenciar o que o texto diz do que ele apenas sugere.',
    instructions:
      'Leia o resumo do tópico e resolva três questões. Em cada uma, tente apontar a passagem que sustenta sua resposta antes de marcar.',
    minutes: 15,
    mode: 'learning',
    kind: 'learn',
    itemRule: { topicSlugs: ['interpretacao-e-inferencia'], count: 3, includeContent: true },
    completionRule: 'all_items',
    nextRecommendation: 'generos-textuais-e-funcao-social',
    order: 1,
  },
  {
    slug: 'matematica-no-cotidiano',
    title: 'Matemática no cotidiano',
    goal: 'Resolver situações de aumento, desconto e variação percentual.',
    instructions:
      'Leia o resumo e resolva duas questões aplicadas. Use fator multiplicativo em vez de calcular a parte e somar.',
    minutes: 20,
    mode: 'learning',
    kind: 'practice',
    itemRule: { topicSlugs: ['porcentagem-e-variacao'], count: 4, includeContent: true },
    completionRule: 'all_items',
    nextRecommendation: 'leitura-de-graficos-e-tabelas',
    order: 2,
  },
  {
    slug: 'leitura-de-dados',
    title: 'Leitura de dados',
    goal: 'Extrair e comparar informações de gráficos e tabelas.',
    instructions:
      'Antes de olhar a forma do gráfico, leia título, unidade e eixo. Só então compare.',
    minutes: 20,
    mode: 'learning',
    kind: 'practice',
    itemRule: { topicSlugs: ['leitura-de-graficos-e-tabelas'], count: 4, includeContent: true },
    completionRule: 'all_items',
    nextRecommendation: 'funcoes-e-relacoes',
    order: 3,
  },
  {
    slug: 'ecologia-essencial',
    title: 'Ecologia essencial',
    goal: 'Relacionar energia, matéria e impactos em cadeias e ciclos.',
    instructions:
      'Leia a explicação, faça o exercício de autoexplicação e resolva as questões. Preste atenção na diferença entre o que flui e o que cicla.',
    minutes: 25,
    mode: 'learning',
    kind: 'learn',
    itemRule: { topicSlugs: ['ecologia-e-ciclos'], count: 5, includeContent: true },
    completionRule: 'all_items',
    nextRecommendation: 'energia-e-transformacoes',
    order: 4,
  },
  {
    slug: 'humanas-em-contexto',
    title: 'Humanas em contexto',
    goal: 'Aplicar conceitos de cidadania e sociedade a situações concretas.',
    instructions:
      'Em cada questão, identifique primeiro qual direito está em jogo e quem é o responsável por garanti-lo.',
    minutes: 25,
    mode: 'learning',
    kind: 'practice',
    itemRule: { topicSlugs: ['cidadania-e-direitos', 'urbanizacao-e-desigualdade'], count: 5 },
    completionRule: 'all_items',
    nextRecommendation: 'meio-ambiente-e-sociedade',
    order: 5,
  },
  {
    slug: 'revisao-dos-meus-erros',
    title: 'Revisão dos meus erros',
    goal: 'Retomar o que você errou, com questões diferentes das originais.',
    instructions:
      'Antes de cada questão, diga se você não lembra, lembra parcialmente ou domina. Depois compare com o resultado.',
    minutes: 10,
    mode: 'learning',
    kind: 'review',
    itemRule: { source: 'review_queue', count: 3, requireFreshItem: true },
    completionRule: 'all_items',
    nextRecommendation: 'plano-da-semana',
    order: 6,
  },
  {
    slug: 'sessao-para-quem-tem-pouco-tempo',
    title: 'Sessão para quem tem pouco tempo',
    goal: 'Avançar de verdade em 10 minutos.',
    instructions:
      'Uma explicação curta e duas questões adaptadas ao seu histórico. Se precisar sair, o progresso fica salvo.',
    minutes: 10,
    mode: 'learning',
    kind: 'practice',
    itemRule: { source: 'recommendation', count: 2, includeContent: 'quick_summary' },
    completionRule: 'all_items',
    nextRecommendation: 'revisao-dos-meus-erros',
    order: 7,
  },
  {
    slug: 'pratica-sem-gabarito-imediato',
    title: 'Prática sem gabarito imediato',
    goal: 'Treinar a resolução sem apoio da correção a cada questão.',
    instructions:
      'Você verá o resultado apenas ao final. Marque as questões em que ficou em dúvida — elas entram na revisão.',
    minutes: 30,
    mode: 'exam',
    kind: 'practice',
    itemRule: { source: 'recommendation', count: 8, mixAreas: true },
    completionRule: 'submit_at_end',
    nextRecommendation: 'revisao-dos-meus-erros',
    order: 8,
  },
  {
    slug: 'diagnostico-leve',
    title: 'Diagnóstico leve',
    goal: 'Ter um primeiro mapa de onde você está, sem cobrar tudo.',
    instructions:
      'Questões distribuídas entre as quatro áreas. Não é prova: é só um ponto de partida. Você pode pular o que não souber.',
    minutes: 20,
    mode: 'learning',
    kind: 'diagnostic',
    itemRule: { source: 'diagnostic', count: 8, perArea: 2, allowSkip: true },
    completionRule: 'all_items',
    nextRecommendation: 'plano-da-semana',
    order: 9,
  },
  {
    slug: 'preparacao-para-simulado',
    title: 'Preparação para simulado',
    goal: 'Treinar estratégia de leitura, marcação e controle de tempo.',
    instructions:
      'Antes das questões, leia as orientações de estratégia. Marque o horário de início de cada item.',
    minutes: 15,
    mode: 'learning',
    kind: 'learn',
    itemRule: { source: 'strategy', count: 3, includeContent: true },
    completionRule: 'all_items',
    nextRecommendation: 'simulado-diagnostico-geral',
    order: 10,
  },
  {
    slug: 'tese-e-argumento',
    title: 'Tese e argumento',
    goal: 'Formular uma tese defensável e sustentá-la.',
    instructions:
      'Leia a explicação, escreva sua tese para o tema proposto e resolva as questões sobre argumentação.',
    minutes: 25,
    mode: 'learning',
    kind: 'learn',
    itemRule: { topicSlugs: ['tese-e-argumentacao'], count: 4, includeContent: true },
    completionRule: 'all_items',
    nextRecommendation: 'redacao',
    order: 11,
  },
  {
    slug: 'revisao-intercalada',
    title: 'Revisão intercalada',
    goal: 'Praticar habilidades relacionadas de matérias diferentes na mesma sessão.',
    instructions:
      'As questões alternam entre três matérias. Antes de resolver, identifique de qual tópico é cada uma.',
    minutes: 30,
    mode: 'learning',
    kind: 'review',
    itemRule: { source: 'interleaved', count: 9, subjects: 3 },
    completionRule: 'all_items',
    nextRecommendation: 'pratica-sem-gabarito-imediato',
    order: 12,
  },
];

/**
 * Simulados iniciais (§11.7): quatro curtos por área e um diagnóstico geral.
 * A matriz de distribuição é explícita e usada pelo gerador.
 */
export const SIMULATIONS: SeedSimulation[] = [
  {
    slug: 'simulado-linguagens',
    title: 'Simulado curto de Linguagens',
    description:
      'Dez questões de interpretação, gêneros textuais e argumentação, com dificuldade equilibrada.',
    kind: 'area',
    areaSlug: 'linguagens',
    questionCount: 10,
    minutes: 25,
    blueprint: {
      areas: { linguagens: 10 },
      difficulty: { intro: 3, intermediate: 5, challenging: 2 },
      topics: {
        'interpretacao-e-inferencia': 4,
        'generos-textuais-e-funcao-social': 4,
        'tese-e-argumentacao': 2,
      },
    },
  },
  {
    slug: 'simulado-matematica',
    title: 'Simulado curto de Matemática',
    description: 'Dez questões de porcentagem, leitura de dados e funções.',
    kind: 'area',
    areaSlug: 'matematica',
    questionCount: 10,
    minutes: 30,
    blueprint: {
      areas: { matematica: 10 },
      difficulty: { intro: 3, intermediate: 5, challenging: 2 },
      topics: {
        'porcentagem-e-variacao': 4,
        'leitura-de-graficos-e-tabelas': 3,
        'funcoes-e-relacoes': 3,
      },
    },
  },
  {
    slug: 'simulado-humanas',
    title: 'Simulado curto de Ciências Humanas',
    description: 'Dez questões de cidadania, urbanização e meio ambiente.',
    kind: 'area',
    areaSlug: 'ciencias-humanas',
    questionCount: 10,
    minutes: 25,
    blueprint: {
      areas: { 'ciencias-humanas': 10 },
      difficulty: { intro: 3, intermediate: 5, challenging: 2 },
      topics: {
        'cidadania-e-direitos': 4,
        'urbanizacao-e-desigualdade': 3,
        'meio-ambiente-e-sociedade': 3,
      },
    },
  },
  {
    slug: 'simulado-natureza',
    title: 'Simulado curto de Ciências da Natureza',
    description: 'Dez questões de ecologia, energia e transformações químicas.',
    kind: 'area',
    areaSlug: 'ciencias-natureza',
    questionCount: 10,
    minutes: 30,
    blueprint: {
      areas: { 'ciencias-natureza': 10 },
      difficulty: { intro: 3, intermediate: 5, challenging: 2 },
      topics: {
        'ecologia-e-ciclos': 4,
        'energia-e-transformacoes': 3,
        'transformacoes-quimicas': 3,
      },
    },
  },
  {
    slug: 'simulado-diagnostico-geral',
    title: 'Diagnóstico geral',
    description:
      'Vinte questões distribuídas entre as quatro áreas, para um primeiro mapa do seu desempenho.',
    kind: 'diagnostic',
    questionCount: 20,
    minutes: 50,
    blueprint: {
      areas: {
        linguagens: 5,
        matematica: 5,
        'ciencias-humanas': 5,
        'ciencias-natureza': 5,
      },
      difficulty: { intro: 8, intermediate: 8, challenging: 4 },
    },
  },
];

export const STUDY_METHODS = [
  {
    slug: 'estudo-ativo',
    title: 'Estudo ativo',
    summary: 'Tentar responder antes de ver a solução.',
    howItWorks:
      'Antes de ler a explicação, você tenta resolver ou explicar por conta própria. O esforço de tentar — mesmo errando — prepara o cérebro para aproveitar melhor a correção.',
    whenToUse:
      'Quando você já teve algum contato com o tema. Funciona mal como primeiro contato com um assunto totalmente novo.',
    minutes: 20,
    steps: [
      'Leia o enunciado ou a pergunta com atenção.',
      'Escreva o que você acha, mesmo incompleto.',
      'Só então veja a explicação.',
      'Marque a diferença entre o que você escreveu e o que era esperado.',
    ],
    example:
      'Antes de ler o resumo sobre porcentagem, tente responder: "de 80 para 100, o aumento é de quantos por cento?". Depois compare com a explicação.',
    limitations:
      'Frustra quem não tem nenhuma base no assunto. Se você não faz ideia por onde começar, leia uma explicação curta antes de tentar.',
    suitableTopics: ['porcentagem-e-variacao', 'interpretacao-e-inferencia', 'funcoes-e-relacoes'],
    order: 1,
  },
  {
    slug: 'recuperacao',
    title: 'Recuperação (lembrar sem consultar)',
    summary: 'Resgatar a informação da memória em vez de reler.',
    howItWorks:
      'Você fecha o material e tenta lembrar. O ato de recuperar fortalece a memória muito mais que reler — reler cria a sensação de saber sem criar a capacidade de lembrar.',
    whenToUse: 'Depois de já ter estudado o conteúdo pelo menos uma vez.',
    minutes: 10,
    steps: [
      'Feche o resumo.',
      'Escreva ou fale tudo o que lembrar do tema.',
      'Abra o material e marque o que faltou.',
      'Repita só a parte que faltou, depois de algumas horas.',
    ],
    example:
      'Depois de estudar ecologia, feche o material e escreva a diferença entre fluxo de energia e ciclagem de matéria. Só então confira.',
    limitations:
      'Pode gerar desconforto no começo, porque expõe o que você não sabe. Esse desconforto é parte do processo, mas não deve virar desânimo: comece por trechos curtos.',
    suitableTopics: ['ecologia-e-ciclos', 'cidadania-e-direitos', 'transformacoes-quimicas'],
    order: 2,
  },
  {
    slug: 'revisao-espacada',
    title: 'Revisão espaçada',
    summary: 'O conteúdo volta em intervalos crescentes, com questões diferentes.',
    howItWorks:
      'Em vez de revisar tudo de uma vez, o mesmo conteúdo retorna depois de 1, 3, 7, 14 e 30 dias. Cada retorno é feito com um item diferente, para evitar que você decore o enunciado no lugar do conceito.',
    whenToUse: 'Sempre que houver um intervalo longo até a prova. É o método que mais protege contra o esquecimento.',
    minutes: 15,
    steps: [
      'Estude o conteúdo pela primeira vez.',
      'Revise no dia seguinte.',
      'Aumente o intervalo a cada revisão bem-sucedida.',
      'Ao errar, volte ao intervalo inicial.',
    ],
    example:
      'Você estudou funções na segunda. A plataforma traz uma questão nova de funções na terça, na sexta e duas semanas depois.',
    limitations:
      'Exige constância ao longo de semanas. Não substitui o primeiro entendimento: revisar algo que você nunca compreendeu apenas repete a confusão.',
    suitableTopics: ['funcoes-e-relacoes', 'energia-e-transformacoes', 'urbanizacao-e-desigualdade'],
    order: 3,
  },
  {
    slug: 'pratica-intercalada',
    title: 'Prática intercalada',
    summary: 'Alternar tópicos relacionados em vez de repetir o mesmo em bloco.',
    howItWorks:
      'Em vez de dez questões seguidas do mesmo assunto, a sessão mistura tópicos relacionados. Isso obriga você a decidir qual estratégia usar — que é exatamente o que a prova cobra.',
    whenToUse:
      'Quando você já acerta questões isoladas de um tópico, mas erra quando ele aparece misturado.',
    minutes: 30,
    steps: [
      'Escolha dois ou três tópicos relacionados.',
      'Alterne as questões entre eles.',
      'Antes de resolver, identifique de qual tópico é a questão.',
      'Registre os casos em que você identificou errado.',
    ],
    example:
      'Alternar questões de porcentagem, leitura de gráficos e funções em uma mesma sessão de 30 minutos.',
    limitations:
      'Parece mais difícil e produz mais erros no curto prazo que a prática em bloco. Isso é esperado — mas pode desanimar quem está começando um tópico agora.',
    suitableTopics: ['porcentagem-e-variacao', 'leitura-de-graficos-e-tabelas', 'funcoes-e-relacoes'],
    order: 4,
  },
  {
    slug: 'caderno-de-erros',
    title: 'Caderno de erros',
    summary: 'Registrar o motivo do erro e transformá-lo em uma próxima ação.',
    howItWorks:
      'Cada erro vira um registro com o motivo (não sabia, não entendi o enunciado, errei a conta, faltou atenção) e uma ação: revisar o conceito, resolver questão semelhante ou refazer depois.',
    whenToUse: 'Sempre. É o método que transforma erro em informação útil.',
    minutes: 10,
    steps: [
      'Ao errar, registre o motivo antes de ver a explicação completa.',
      'Escreva com suas palavras o que faltou.',
      'Escolha a ação: conceito, questão semelhante ou refazer depois.',
      'Volte ao registro depois de alguns dias.',
    ],
    example:
      'Você errou uma questão de variação percentual por usar o valor final como base. O registro vira: "conferir sempre de onde eu saí antes de dividir".',
    limitations:
      'Vira lista morta se você só anotar e nunca voltar. O valor está na ação seguinte, não no registro.',
    suitableTopics: [],
    order: 5,
  },
  {
    slug: 'explicacao-com-as-proprias-palavras',
    title: 'Explicação com as próprias palavras',
    summary: 'Escrever uma explicação curta antes de conferir a oficial.',
    howItWorks:
      'Você escreve, em duas ou três frases, como explicaria o conceito para alguém. Onde a explicação trava é exatamente onde a compreensão falha.',
    whenToUse: 'Depois de ler a explicação de um tópico, antes de partir para as questões.',
    minutes: 10,
    steps: [
      'Escolha um conceito do tópico.',
      'Escreva a explicação sem consultar o material.',
      'Compare com a explicação oficial.',
      'Marque os pontos em que você travou.',
    ],
    example:
      'Explicar por que a eutrofização mata peixes sem usar a palavra "poluição" — o exercício obriga a descrever o mecanismo.',
    limitations:
      'Exige escrever, o que consome tempo. Em sessões muito curtas, use apenas para o conceito central da sessão.',
    suitableTopics: ['ecologia-e-ciclos', 'tese-e-argumentacao', 'meio-ambiente-e-sociedade'],
    order: 6,
  },
  {
    slug: 'sessao-de-foco-curto',
    title: 'Sessão de foco curto',
    summary: 'Um bloco de 10 a 20 minutos com um único objetivo.',
    howItWorks:
      'Você define um objetivo único e trabalha só nele por um tempo curto e determinado. Sem trocar de assunto, sem abrir outra coisa.',
    whenToUse: 'Quando o tempo é escasso ou quando começar é a parte mais difícil.',
    minutes: 15,
    steps: [
      'Escolha um objetivo único e específico.',
      'Defina o tempo antes de começar.',
      'Deixe o material pronto antes de iniciar a contagem.',
      'Ao terminar, anote onde parou.',
    ],
    example:
      '15 minutos apenas para resolver três questões de interpretação e registrar o motivo de cada erro.',
    limitations:
      'Não é suficiente para conteúdos que exigem construção longa, como uma redação completa. Nesses casos, use blocos curtos para etapas (planejar, escrever, revisar).',
    suitableTopics: [],
    order: 7,
  },
  {
    slug: 'simulado-com-analise',
    title: 'Simulado com análise',
    summary: 'Conjunto cronometrado seguido da interpretação dos erros e do tempo.',
    howItWorks:
      'A parte que ensina não é o simulado: é a análise depois dele. Você examina onde errou, quanto tempo gastou por questão e que padrão apareceu.',
    whenToUse:
      'Quando você já tem base nos conteúdos e precisa treinar estratégia, ritmo e resistência.',
    minutes: 60,
    steps: [
      'Resolva o conjunto sem interromper, respeitando o tempo.',
      'Só depois confira o gabarito.',
      'Classifique cada erro por motivo.',
      'Separe o que foi falta de conteúdo do que foi falta de estratégia.',
    ],
    example:
      'Depois de um simulado por área, você descobre que 4 dos 6 erros foram por tempo, não por desconhecimento. A ação passa a ser treino de ritmo.',
    limitations:
      'Simulado sem análise é apenas cansaço. E aplicar simulados com frequência alta, sem tempo de estudar entre eles, mede sem ensinar.',
    suitableTopics: [],
    order: 8,
  },
];

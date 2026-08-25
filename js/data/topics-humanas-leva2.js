import { question as q, topic } from './topic-factory.js';

export const HUMANAS_TOPICS_LEVA_2 = [
  topic({
    slug: 'brasil-republica',
    name: 'Brasil República',
    subject: 'historia',
    area: 'ciencias-humanas',
    summary:
      'Acompanhar as transformações políticas do Brasil republicano e reconhecer permanências e rupturas entre 1889 e a redemocratização.',
    difficulty: 'intermediate',
    minutes: 25,
    weight: 90,
    order: 1,
    related: ['cidadania-e-direitos', 'industrializacao'],
    skill: {
      slug: 'analisar-processos-da-republica-brasileira',
      name: 'Analisar processos da República brasileira',
      description:
        'Relacionar períodos, atores e conflitos da República brasileira a permanências e rupturas na estrutura política e social.',
    },
    quick: `**Os grandes períodos**

- **República Velha (1889–1930):** poder das oligarquias agrárias, voto aberto, coronelismo, "política dos governadores".
- **Era Vargas (1930–1945):** centralização, legislação trabalhista, industrialização induzida pelo Estado, Estado Novo (1937–45) autoritário.
- **Democracia de 1946–1964:** partidos nacionais, voto secreto ampliado, crescimento urbano, forte polarização.
- **Ditadura militar (1964–1985):** atos institucionais, censura, repressão, "milagre econômico" seguido de crise e dívida.
- **Nova República (1985–):** Constituição de 1988, eleições diretas, ampliação de direitos sociais.

**Duas ideias que atravessam tudo**

1. **Ampliação lenta da cidadania:** o direito de voto e os direitos sociais foram conquistados aos poucos, com avanços e recuos.
2. **Concentração de terra e renda:** as mudanças de regime não desfizeram a desigualdade estrutural herdada.`,
    explanation: {
      title: 'Rupturas e permanências: como as provas cobram a República',
      body: `### 1. República Velha: quem votava e quem mandava

A proclamação de 1889 trocou o regime, não a estrutura social. O voto era **aberto** — o eleitor declarava em quem votava —, o que permitia pressão direta pelos "coronéis", grandes proprietários locais.

O sistema se apoiava em três engrenagens:

- **coronelismo:** troca de votos por favores e proteção;
- **voto de cabresto:** controle do eleitor pelo poder local;
- **política dos governadores:** apoio mútuo entre presidente e oligarquias estaduais.

Analfabetos, mulheres e a maioria da população estavam fora do eleitorado.

### 2. Vargas: direitos e controle no mesmo pacote

A Era Vargas é o caso clássico de leitura ambígua exigida em prova. No mesmo período houve:

- **avanços:** CLT, salário mínimo, jornada regulamentada, voto feminino (1932), voto secreto;
- **restrições:** sindicatos atrelados ao Estado, censura, fechamento do Congresso e repressão política no Estado Novo.

A resposta correta quase nunca é "foi bom" ou "foi ruim": é reconhecer que a extensão de direitos veio acompanhada de controle sobre a organização autônoma dos trabalhadores.

### 3. 1964–1985: o que caracteriza o regime

- Atos Institucionais (o AI-5, de 1968, é o mais duro): fechamento do Congresso, cassações, suspensão do habeas corpus.
- Censura à imprensa e à produção cultural.
- Perseguição, prisão, tortura e desaparecimento de opositores.
- Economia: crescimento acelerado no início dos anos 1970, com concentração de renda e endividamento externo, seguido de crise e inflação.

### 4. 1988 e a cidadania ampliada

A Constituição de 1988 é o marco da Nova República: direitos sociais, saúde e educação como dever do Estado, voto para analfabetos e para maiores de 16 anos (facultativo), instrumentos de participação.

Ela não resolveu a desigualdade — mas mudou o quadro legal dentro do qual a disputa passou a acontecer.

### 5. Como responder

As questões costumam apresentar um documento, uma charge ou um dado e pedir:

1. **identificar o período** pelas características;
2. **relacionar** o processo histórico a um efeito no presente;
3. **distinguir ruptura de permanência**.

Cuidado com alternativas que apresentam progresso linear ("a partir daí, a democracia se consolidou definitivamente"). A história republicana brasileira tem avanços e retrocessos, e a prova valoriza quem enxerga os dois.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — ler uma prática eleitoral da República Velha',
        body: `**Documento autoral (relato fictício de 1922):** "No dia da eleição, o administrador da fazenda acompanhou os trabalhadores até a mesa e permaneceu ao lado enquanto votavam. Ninguém precisou dizer nada."

**O que o trecho evidencia:**

1. O voto era **aberto**, e não secreto — a presença do administrador só faz sentido nesse contexto.
2. A coerção era **implícita**: "ninguém precisou dizer nada" indica dependência econômica, não ameaça explícita.
3. Trata-se do **voto de cabresto**, engrenagem do coronelismo.

**Como a prova costuma perguntar:** "O trecho evidencia qual prática política?" — a resposta é a relação entre dependência econômica e controle do voto, e não simplesmente "fraude eleitoral", que seria outra coisa.`,
      },
      {
        title: 'Exemplo resolvido 2 — avaliar a legislação trabalhista varguista',
        body: `**Situação:** duas leituras do mesmo período.

**Leitura A:** "Vargas deu direitos aos trabalhadores brasileiros."
**Leitura B:** "Vargas controlou o movimento operário."

**Análise:** as duas descrevem partes reais do processo.

- Houve, de fato, criação e consolidação de direitos (CLT, 1943).
- Houve também atrelamento sindical ao Ministério do Trabalho, imposto sindical e repressão a lideranças autônomas.

**Síntese esperada em uma boa resposta:** a legislação trabalhista foi conquistada num processo que combinou pressão social acumulada e iniciativa estatal, e veio acompanhada de mecanismos que reduziram a autonomia sindical.

**O erro a evitar:** escolher uma das duas leituras como se anulasse a outra.`,
      },
    ],
    mistakes: `**1. Tratar a história republicana como progresso linear.**
Houve golpes, fechamentos do Congresso e retrocessos. Linha reta não descreve o processo.

**2. Reduzir a Era Vargas a "só direitos" ou "só ditadura".**
As duas dimensões coexistiram, e o período de 1937 a 1945 é distinto dos anos anteriores.

**3. Confundir a proclamação da República com ampliação da participação política.**
Em 1889 o eleitorado seguiu restrito, e o voto continuou aberto até 1932.`,
    selfCheck: [
      'Como o voto aberto sustentava o coronelismo na República Velha?',
      'Por que a Era Vargas exige uma leitura que combine direitos e controle?',
      'Que mudanças a Constituição de 1988 trouxe para a cidadania política?',
    ],
    questions: [
      q({
        slug: 'q-rep-1',
        stem: 'Durante a República Velha (1889-1930), a chamada "política dos governadores" consistia em:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de mecanismo político do período',
        seconds: 80,
        errors: ['confundir com federalismo moderno'],
        correct: 1,
        options: [
          ['Um sistema de eleições diretas para governador com participação popular ampla.', 'O eleitorado era restrito e o voto, aberto; não havia participação ampla.', 'projetar o presente sobre o passado'],
          ['Um acordo de apoio mútuo entre o governo federal e as oligarquias estaduais, que garantia estabilidade ao arranjo de poder.', 'O presidente apoiava os grupos dominantes nos estados e recebia deles apoio no Congresso, o que reduzia disputas e mantinha o sistema oligárquico.'],
          ['Uma política de descentralização administrativa que ampliou a autonomia dos municípios.', 'O efeito principal foi consolidar o poder das oligarquias estaduais, não a autonomia municipal.', 'confundir com descentralização'],
          ['Um programa de investimento federal em infraestrutura estadual.', 'O acordo era político-eleitoral, não um programa de obras.', 'trocar política por economia'],
          ['A criação de partidos nacionais que substituíram as oligarquias regionais.', 'Partidos de alcance nacional só se estruturam depois de 1945.', 'antecipar um processo posterior'],
        ],
        explanation: 'A política dos governadores era o acordo que dava sustentação mútua entre presidente e oligarquias estaduais.',
      }),
      q({
        slug: 'q-rep-2',
        stem: 'Um trabalhador urbano dos anos 1940 comenta: "Passei a ter carteira assinada e férias, mas o sindicato só funciona do jeito que o Ministério aprova."\n\nEsse relato sintetiza uma característica central da Era Vargas, que é:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação do conceito de ambiguidade do período varguista',
        seconds: 110,
        errors: ['escolher apenas um lado do processo'],
        correct: 3,
        options: [
          ['A ausência total de direitos trabalhistas no período.', 'O próprio relato menciona carteira assinada e férias.', 'contrariar o documento'],
          ['A plena autonomia sindical conquistada pelos trabalhadores.', 'O relato afirma o oposto sobre o funcionamento sindical.', 'contrariar o documento'],
          ['A substituição do Estado pelos sindicatos na regulação do trabalho.', 'O Estado assumiu papel central na regulação, não o contrário.', 'inverter a relação'],
          ['A extensão de direitos trabalhistas acompanhada do controle estatal sobre a organização sindical.', 'A CLT ampliou direitos ao mesmo tempo em que os sindicatos foram atrelados ao Ministério do Trabalho: as duas coisas fazem parte do mesmo arranjo.'],
          ['A recusa do Estado em intervir nas relações entre patrões e empregados.', 'A marca do período é justamente a forte intervenção estatal.', 'inverter a característica'],
        ],
        explanation: 'A ambiguidade do trabalhismo varguista — direitos concedidos e organização controlada — é o ponto central que a questão cobra.',
      }),
      q({
        slug: 'q-rep-3',
        stem: 'Leia o trecho de um comunicado autoral, no espírito dos atos institucionais do regime iniciado em 1964:\n\n"Ficam suspensas as garantias de habeas corpus nos casos de crimes políticos e autorizada a intervenção nas casas legislativas, no interesse superior da ordem pública."\n\nA leitura correta desse tipo de documento indica que ele:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de documento normativo autoritário',
        seconds: 130,
        errors: ['tomar a justificativa oficial como descrição neutra'],
        correct: 0,
        options: [
          ['Concentra poder no Executivo e retira garantias jurídicas, usando a linguagem da ordem pública para legitimar a exceção.', 'Suspender habeas corpus e permitir intervenção no Legislativo desmonta os freios ao Executivo. A expressão "interesse superior da ordem pública" cumpre a função de legitimar a medida.'],
          ['Amplia as garantias individuais em situações de crise institucional.', 'O texto faz o oposto: suspende garantias.', 'inverter o conteúdo'],
          ['Fortalece o Poder Legislativo diante do Executivo.', 'A autorização de intervenção enfraquece o Legislativo.', 'inverter a relação entre poderes'],
          ['Trata-se de norma de rotina administrativa, sem impacto sobre direitos.', 'Suspensão de habeas corpus atinge diretamente a liberdade individual.', 'minimizar o alcance do documento'],
          ['Descreve um estado de sítio aprovado por plebiscito popular.', 'Não há menção a consulta popular, e os atos institucionais não passavam por ela.', 'inventar procedimento inexistente'],
        ],
        explanation: 'Documentos de exceção costumam combinar suspensão de garantias com uma justificativa de ordem. Ler os dois elementos juntos é a chave da interpretação.',
      }),
      q({
        slug: 'q-rep-4',
        stem: 'Compare duas afirmações sobre a Constituição de 1988:\n\nI. Ampliou direitos sociais e políticos, incluindo o voto facultativo aos 16 anos e o direito de voto aos analfabetos.\nII. Eliminou a desigualdade social no Brasil ao garantir esses direitos em lei.\n\nÉ correto o que se afirma em:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'distinção entre garantia legal e efetivação social',
        seconds: 130,
        errors: ['confundir direito garantido com direito efetivado'],
        correct: 2,
        options: [
          ['I e II.', 'II não se sustenta: garantir direitos em lei não elimina desigualdade estrutural.', 'confundir norma com realidade'],
          ['II, apenas.', 'II é justamente a afirmação incorreta.', 'inverter a avaliação'],
          ['I, apenas.', 'A Constituição de 1988 ampliou de fato direitos sociais e políticos. Já a desigualdade persistiu: reconhecer isso é parte da análise histórica.'],
          ['Nenhuma das duas.', 'I descreve corretamente as mudanças de 1988.', 'excesso de recusa'],
          ['I e II, desde que se considere o período posterior a 2000.', 'Nenhum recorte temporal torna II verdadeira.', 'relativizar um erro factual'],
        ],
        explanation: 'Direito garantido em lei e direito efetivado na prática são coisas diferentes — distinção que a análise histórica exige.',
      }),
      q({
        slug: 'q-rep-5',
        stem: 'Um professor pede que a turma investigue por que, mesmo após sucessivas mudanças de regime político, a concentração fundiária permaneceu alta no Brasil ao longo de todo o período republicano.\n\nA abordagem mais consistente para essa investigação é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre estrutura econômica, política e permanências históricas',
        seconds: 170,
        errors: ['explicar apenas por decisões de um governo', 'atribuir a fatores naturais'],
        correct: 4,
        options: [
          ['Atribuir a permanência exclusivamente ao período da ditadura militar, quando a modernização agrícola se intensificou.', 'A concentração antecede 1964 e persiste depois de 1985; um período só não explica o processo.', 'reduzir a um recorte'],
          ['Concluir que a concentração decorre de características geográficas do território brasileiro.', 'A distribuição da terra é resultado de decisões políticas e jurídicas, não de geografia.', 'naturalizar processo social'],
          ['Analisar apenas os textos constitucionais, já que a lei define a estrutura agrária.', 'A distância entre norma e prática é justamente o que a investigação precisa explicar.', 'ficar só na norma'],
          ['Considerar que a permanência é impossível de explicar, dada a variedade de regimes políticos no período.', 'A variedade de regimes com resultado semelhante é exatamente o que sugere causas estruturais.', 'desistir da explicação'],
          ['Relacionar a herança colonial da grande propriedade, o peso político dos proprietários rurais em diferentes regimes e a limitação das reformas efetivamente implementadas.', 'A permanência se explica pela combinação de herança estrutural, capacidade de influência política dos grandes proprietários em regimes distintos e reformas que ou não saíram do papel ou tiveram alcance restrito.'],
        ],
        explanation: 'A questão integra economia, política e história: permanências estruturais raramente se explicam por um único governo ou por causas naturais.',
      }),
      q({
        slug: 'q-rep-rec-1',
        stem: 'O voto secreto e o direito de voto feminino foram estabelecidos no Brasil pelo Código Eleitoral de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'localização temporal de marco legal',
        seconds: 60,
        recovery: true,
        errors: ['associar a 1988'],
        correct: 1,
        options: [
          ['1889, com a proclamação da República.', 'O voto permaneceu aberto e restrito após 1889.', 'associar mudança à proclamação'],
          ['1932, durante o governo provisório de Vargas.', 'O Código Eleitoral de 1932 instituiu o voto secreto e estendeu o direito de voto às mulheres.'],
          ['1946, com a redemocratização do pós-guerra.', 'A Constituição de 1946 consolidou avanços, mas o marco citado é anterior.', 'atrasar o marco'],
          ['1964, com o início do regime militar.', 'O período restringiu, e não ampliou, direitos políticos.', 'inverter o sentido do período'],
          ['1988, com a nova Constituição.', '1988 ampliou o eleitorado, mas o voto secreto e o voto feminino são bem anteriores.', 'concentrar tudo em 1988'],
        ],
        explanation: 'O Código Eleitoral de 1932 trouxe o voto secreto e o voto feminino, ainda antes do Estado Novo.',
      }),
    ],
  }),

  topic({
    slug: 'industrializacao',
    name: 'Industrialização',
    subject: 'historia',
    area: 'ciencias-humanas',
    summary:
      'Entender as transformações produzidas pela industrialização no mundo e no Brasil, e seus efeitos sobre trabalho, cidade e ambiente.',
    difficulty: 'intermediate',
    minutes: 24,
    weight: 87,
    order: 2,
    prerequisites: ['brasil-republica'],
    related: ['urbanizacao-e-desigualdade', 'trabalho-e-sociedade'],
    skill: {
      slug: 'relacionar-industrializacao-trabalho-e-territorio',
      name: 'Relacionar industrialização, trabalho e território',
      description:
        'Analisar efeitos da industrialização sobre organização do trabalho, ocupação do espaço e desigualdade, no Brasil e no mundo.',
    },
    quick: `**As revoluções industriais, em uma linha cada**

- **1ª (fim do século XVIII):** vapor, carvão, têxteis, fábrica como novo espaço de trabalho.
- **2ª (fim do XIX):** aço, eletricidade, petróleo, linha de montagem, produção em massa.
- **3ª (metade do XX):** eletrônica, informática, automação.
- **4ª (hoje):** dados, conectividade, inteligência artificial, plataformas.

**No Brasil**

- Início tardio e concentrado, ligado ao capital do café.
- **Vargas (1930–45):** Estado como indutor — siderurgia, petróleo, infraestrutura.
- **JK (1956–61):** Plano de Metas, indústria automobilística, capital estrangeiro.
- **Ditadura (1964–85):** grandes projetos, crescimento acelerado, endividamento externo.
- **Anos 1990 em diante:** abertura comercial, reestruturação produtiva, desindustrialização relativa.

**Efeitos que atravessam todos os períodos:** êxodo rural, crescimento urbano acelerado, nova divisão do trabalho e pressão ambiental.`,
    explanation: {
      title: 'O que a industrialização muda além das máquinas',
      body: `### 1. Uma nova relação com o tempo

Antes da fábrica, o trabalho seguia o ritmo da tarefa e das estações. Com a indústria, passa a seguir o **relógio**: jornada fixa, turno, sino, ponto.

Essa mudança é tão importante quanto a máquina em si — ela reorganiza o dia, a família e a cidade.

### 2. Divisão do trabalho e qualificação

A linha de montagem fragmenta a produção em tarefas simples e repetitivas. O resultado é duplo:

- **aumento enorme da produtividade**;
- **perda de controle do trabalhador** sobre o processo completo, com desqualificação de ofícios artesanais.

Daí nascem tanto o consumo de massa quanto os conflitos trabalhistas do século XX.

### 3. O caso brasileiro: tardio, concentrado e induzido

Três marcas distinguem a industrialização brasileira:

1. **Tardia:** ganha escala quando o mundo já estava na segunda revolução industrial.
2. **Concentrada:** o eixo Sudeste, especialmente São Paulo, reuniu capital, mão de obra e infraestrutura, o que aprofundou as desigualdades regionais.
3. **Induzida pelo Estado:** siderurgia, petróleo e energia vieram de decisão estatal, não de iniciativa privada espontânea.

### 4. Cidade e ambiente

Indústria atrai gente. Gente precisa de moradia, transporte, água e esgoto. Quando o crescimento é mais rápido que o investimento público, aparecem periferias sem infraestrutura — padrão que se repete em várias cidades brasileiras.

No ambiente, a industrialização traz emissões, resíduos, consumo de água e demanda por energia. O debate atual sobre transição energética é uma continuação direta dessa história.

### 5. O que as questões pedem

Raramente uma data. Quase sempre:

- relacionar industrialização a **êxodo rural** e crescimento urbano;
- relacionar tecnologia a **mudança na organização do trabalho**;
- avaliar **efeitos desiguais** entre regiões e grupos sociais;
- discutir **automação e futuro do trabalho** no presente.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — por que o eixo Sudeste concentrou a indústria',
        body: `**Pergunta típica:** que fatores explicam a concentração industrial em São Paulo na primeira metade do século XX?

**Resposta organizada em quatro fatores:**

1. **Capital disponível:** os lucros do café foram reinvestidos em indústria.
2. **Mão de obra:** imigração europeia e, depois, migração interna forneceram trabalhadores.
3. **Infraestrutura:** ferrovias construídas para escoar o café serviram à indústria; o porto de Santos dava acesso ao exterior.
4. **Mercado consumidor:** a própria população urbana em crescimento comprava o que era produzido.

**A conclusão que a prova cobra:** a concentração não foi acaso nem "vocação regional" — foi resultado do encontro desses fatores em um mesmo território, o que aprofundou a desigualdade entre regiões do país.`,
      },
      {
        title: 'Exemplo resolvido 2 — automação: comparar dois momentos',
        body: `**Situação:** um trabalhador de fábrica nos anos 1950 e um entregador de aplicativo hoje.

**Semelhanças:**
- o ritmo é definido por um sistema externo (linha de montagem / algoritmo);
- há medição constante do desempenho;
- a tarefa é fragmentada.

**Diferenças:**
- o trabalhador da fábrica tinha vínculo formal, jornada definida e proteção da CLT;
- o entregador costuma trabalhar sem vínculo, com renda variável e sem jornada garantida;
- a supervisão deixou de ser humana e presencial e passou a ser algorítmica e remota.

**O que a análise mostra:** a tecnologia mudou a forma de controle e o vínculo, não a existência do controle. Essa é a leitura que as questões sobre trabalho e tecnologia costumam pedir.`,
      },
    ],
    mistakes: `**1. Tratar a industrialização como progresso sem custo.**
Houve ganho de produtividade e também jornadas extenuantes, trabalho infantil, poluição e desigualdade regional.

**2. Achar que o Brasil se industrializou por iniciativa privada espontânea.**
Os setores de base vieram de decisão estatal — siderurgia, petróleo, energia.

**3. Confundir automação com fim do trabalho.**
A automação redistribui tarefas e altera vínculos; historicamente, ela extingue funções e cria outras, com efeitos desiguais entre grupos.`,
    selfCheck: [
      'Como a fábrica mudou a relação das pessoas com o tempo?',
      'Que fatores explicam a concentração industrial no Sudeste brasileiro?',
      'O que muda e o que permanece na comparação entre a linha de montagem e o trabalho por aplicativo?',
    ],
    questions: [
      q({
        slug: 'q-ind-1',
        stem: 'A introdução da linha de montagem na produção industrial do início do século XX teve como efeito direto:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de efeito da organização fabril',
        seconds: 80,
        errors: ['confundir aumento de produção com melhoria das condições'],
        correct: 2,
        options: [
          ['A valorização do trabalho artesanal e do domínio de todo o processo produtivo.', 'A linha de montagem fragmenta a produção e reduz o domínio do processo completo.', 'inverter o efeito'],
          ['A redução imediata das jornadas de trabalho nas fábricas.', 'A redução de jornada resultou de conflito e legislação, não da tecnologia em si.', 'atribuir à técnica o que veio da luta social'],
          ['O aumento expressivo da produtividade acompanhado da fragmentação das tarefas.', 'Dividir a produção em tarefas simples e repetitivas multiplicou a produtividade e, ao mesmo tempo, reduziu o controle do trabalhador sobre o conjunto do processo.'],
          ['A eliminação da necessidade de trabalhadores nas fábricas.', 'A produção em massa exigiu grande contingente de trabalhadores.', 'antecipar automação total'],
          ['A descentralização da produção em pequenas oficinas familiares.', 'O movimento foi de concentração em grandes plantas industriais.', 'inverter o movimento produtivo'],
        ],
        explanation: 'Produtividade alta e fragmentação do trabalho são as duas faces da mesma reorganização produtiva.',
      }),
      q({
        slug: 'q-ind-2',
        stem: 'Uma cidade do interior recebe uma grande fábrica. Em cinco anos, sua população dobra, os aluguéis sobem, formam-se bairros sem saneamento na periferia e o comércio local se expande.\n\nEsse conjunto de mudanças ilustra:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação da relação entre indústria, migração e urbanização',
        seconds: 110,
        errors: ['ver apenas os efeitos positivos'],
        correct: 0,
        options: [
          ['A relação entre industrialização e urbanização acelerada, em que a chegada de empregos atrai população em ritmo superior à ampliação da infraestrutura urbana.', 'A fábrica atrai migrantes; a cidade cresce mais rápido do que a capacidade de oferecer moradia, saneamento e transporte. Daí a combinação de expansão econômica e precariedade urbana.'],
          ['Um processo de desindustrialização regional.', 'O caso descreve a chegada de indústria, não sua saída.', 'inverter o processo'],
          ['O efeito exclusivamente positivo da industrialização sobre a qualidade de vida local.', 'Bairros sem saneamento e alta de aluguéis são custos concretos que a descrição inclui.', 'ignorar os custos'],
          ['Um caso de êxodo urbano em direção ao campo.', 'O movimento descrito é de chegada à cidade.', 'inverter o sentido da migração'],
          ['A ausência de relação entre atividade econômica e ocupação do espaço urbano.', 'A descrição mostra justamente essa relação.', 'negar a relação evidente'],
        ],
        explanation: 'O descompasso entre o ritmo do crescimento populacional e o da infraestrutura urbana é o padrão histórico da urbanização industrial.',
      }),
      q({
        slug: 'q-ind-3',
        stem: 'A tabela mostra a participação da indústria de transformação no PIB de um país hipotético:\n\n| Ano | Participação |\n| --- | --- |\n| 1980 | 30% |\n| 1995 | 22% |\n| 2010 | 15% |\n| 2023 | 11% |\n\nA leitura desses dados permite concluir que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de série histórica e cuidado com conclusões excessivas',
        seconds: 130,
        errors: ['concluir que a produção industrial caiu em termos absolutos'],
        correct: 3,
        options: [
          ['A produção industrial do país foi reduzida a um terço no período.', 'A tabela mostra participação relativa no PIB; a produção absoluta pode ter crescido enquanto outros setores cresciam mais.', 'confundir participação com volume'],
          ['O país deixou de produzir bens industriais.', '11% do PIB ainda representa atividade industrial significativa.', 'exagerar a conclusão'],
          ['O setor de serviços necessariamente encolheu no mesmo período.', 'A queda da participação industrial sugere o contrário quanto aos demais setores.', 'inverter a leitura'],
          ['Houve queda contínua da participação relativa da indústria na economia, o que caracteriza um processo de desindustrialização relativa.', 'A série mostra redução constante do peso da indústria no PIB. Isso caracteriza desindustrialização relativa, sem afirmar nada sobre o volume absoluto produzido.'],
          ['Os dados são inconclusivos, pois participações percentuais não permitem análise.', 'Séries de participação são amplamente usadas para analisar mudança estrutural.', 'descartar dado válido'],
        ],
        explanation: 'Participação relativa e volume absoluto são grandezas diferentes. A tabela sustenta a primeira conclusão, não a segunda.',
      }),
      q({
        slug: 'q-ind-4',
        stem: 'Compare dois modelos de organização do trabalho:\n\nI. Trabalhador de linha de montagem, com jornada fixa, salário mensal e vínculo formal.\nII. Trabalhador de aplicativo, com jornada variável, remuneração por tarefa e sem vínculo empregatício.\n\nA comparação entre os dois indica que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre formas históricas de controle do trabalho',
        seconds: 150,
        errors: ['ver apenas a mudança tecnológica'],
        correct: 4,
        options: [
          ['O segundo modelo eliminou o controle sobre o trabalhador, que passou a definir livremente seu ritmo.', 'A flexibilidade de horário convive com metas, avaliações e distribuição de tarefas definidas por sistema.', 'confundir flexibilidade com ausência de controle'],
          ['Os dois modelos são equivalentes do ponto de vista da proteção social.', 'A diferença de vínculo produz diferenças significativas de proteção.', 'ignorar a diferença de vínculo'],
          ['O primeiro modelo é mais recente que o segundo.', 'A ordem histórica é a inversa.', 'inverter a cronologia'],
          ['A ausência de vínculo no segundo modelo aumenta necessariamente a renda do trabalhador.', 'A remuneração por tarefa produz renda variável, sem garantia de ganho maior.', 'supor efeito não demonstrado'],
          ['O controle sobre o trabalho permaneceu, mudando de forma: da supervisão presencial e da esteira para a mediação algorítmica, com perda de proteções vinculadas ao emprego formal.', 'O que muda é o mecanismo de controle e o tipo de vínculo — não a existência de controle. A perda de proteções ligadas ao contrato formal é o efeito social mais relevante.'],
        ],
        explanation: 'A comparação entre modelos históricos de trabalho mostra continuidade no controle e mudança na forma e na proteção.',
      }),
      q({
        slug: 'q-ind-5',
        stem: 'Um município discute atrair uma indústria de grande porte oferecendo isenção fiscal por 15 anos. A empresa promete 800 empregos diretos.\n\nUma avaliação consistente dessa proposta deve considerar:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre desenvolvimento econômico, finanças públicas e impacto socioambiental',
        seconds: 180,
        errors: ['avaliar apenas pelo número de empregos'],
        correct: 1,
        options: [
          ['Apenas o número de empregos prometidos, já que emprego é o principal indicador de desenvolvimento.', 'Emprego é indicador central, mas não é o único custo-benefício em jogo.', 'reduzir a decisão a um indicador'],
          ['O saldo entre a renúncia fiscal e a arrecadação futura, a pressão sobre infraestrutura e serviços públicos, os impactos ambientais e a dependência econômica de uma única empresa.', 'A decisão envolve custo fiscal presente contra retorno futuro incerto, demanda adicional por moradia, transporte, saúde e educação, licenciamento ambiental e o risco de a economia local ficar dependente de um só empregador.'],
          ['Somente os impactos ambientais, pois são os únicos irreversíveis.', 'Impactos fiscais e sociais também produzem efeitos duradouros sobre o município.', 'considerar uma dimensão só'],
          ['Que isenções fiscais nunca se justificam, por reduzirem a arrecadação municipal.', 'Isenções podem se justificar em certos arranjos; a análise é que precisa ser feita caso a caso.', 'transformar análise em regra fixa'],
          ['Que a decisão cabe exclusivamente à empresa, por ser ela quem investe.', 'A decisão sobre renúncia fiscal e uso do território é do poder público.', 'transferir a decisão pública ao investidor'],
        ],
        explanation: 'A questão integra história econômica, finanças públicas e planejamento urbano — exatamente o tipo de avaliação multidimensional que decisões desse porte exigem.',
      }),
      q({
        slug: 'q-ind-rec-1',
        stem: 'Durante o governo de Juscelino Kubitschek (1956-1961), o Plano de Metas teve como um de seus eixos centrais:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de política industrial brasileira',
        seconds: 70,
        recovery: true,
        errors: ['confundir com o período Vargas'],
        correct: 2,
        options: [
          ['A estatização completa da indústria brasileira.', 'O plano combinou capital estatal, privado nacional e estrangeiro.', 'exagerar o papel estatal'],
          ['A priorização exclusiva da agricultura de exportação.', 'O foco foi a indústria e a infraestrutura.', 'trocar o setor'],
          ['A implantação da indústria automobilística com atração de capital estrangeiro.', 'O Plano de Metas atraiu montadoras estrangeiras e investiu em energia e transportes, com o lema de "cinquenta anos em cinco".'],
          ['O fechamento da economia ao capital externo.', 'O plano dependeu justamente da entrada de capital externo.', 'inverter a política'],
          ['A criação da Petrobras e da Companhia Siderúrgica Nacional.', 'Essas empresas são do período Vargas, anterior ao Plano de Metas.', 'trocar o período'],
        ],
        explanation: 'O Plano de Metas apostou em indústria de bens duráveis, energia e transportes, com forte presença de capital estrangeiro.',
      }),
    ],
  }),

  topic({
    slug: 'cartografia',
    name: 'Cartografia',
    subject: 'geografia',
    area: 'ciencias-humanas',
    summary:
      'Ler mapas com autonomia: escala, projeção, legenda e orientação — e reconhecer que todo mapa é uma escolha, não uma foto do mundo.',
    difficulty: 'intro',
    minutes: 20,
    weight: 86,
    order: 3,
    related: ['urbanizacao-e-desigualdade', 'globalizacao'],
    skill: {
      slug: 'ler-e-interpretar-representacoes-cartograficas',
      name: 'Ler e interpretar representações cartográficas',
      description:
        'Usar escala, legenda, projeção e orientação para extrair informação de mapas e avaliar as escolhas de quem os produziu.',
    },
    quick: `**Todo mapa tem quatro elementos que precisam ser lidos antes de qualquer conclusão:**

1. **Título** — o que está sendo representado.
2. **Legenda** — o que cada cor, símbolo e espessura significa.
3. **Escala** — a relação entre o mapa e a realidade.
4. **Orientação** — a rosa dos ventos ou a indicação do norte.

**Escala grande x escala pequena** (a parte que mais confunde):

- **Escala grande** (1:1.000): área **pequena**, muito **detalhe**. Planta de bairro.
- **Escala pequena** (1:50.000.000): área **grande**, pouco detalhe. Mapa-múndi.

**Projeções deformam** — não existe mapa plano perfeito da esfera:
- **Mercator:** preserva ângulos, distorce áreas (exagera altas latitudes).
- **Peters:** preserva áreas, distorce formas.
- **Azimutal:** preserva direções a partir de um ponto.

**Consequência política:** escolher a projeção, o centro e as cores é escolher o que se destaca. Mapa é argumento.`,
    explanation: {
      title: 'Escala, projeção e as escolhas de quem faz o mapa',
      body: `### 1. Escala, sem decoreba

A escala é uma razão: 1:100.000 significa que 1 cm no papel corresponde a 100.000 cm (1 km) na realidade.

Para lembrar qual é "grande" e qual é "pequena", pense na **fração**: 1/1.000 é um número maior que 1/50.000.000. Escala grande = fração maior = mais detalhe e menos área.

**Do mapa para a realidade:** multiplique pelo denominador.
**Da realidade para o mapa:** divida.

### 2. Projeções: toda escolha custa algo

A Terra é aproximadamente esférica; o papel é plano. Ao "abrir" a esfera, algo se deforma: área, forma, distância ou direção. Nenhuma projeção preserva tudo.

- **Mercator** é excelente para navegação (rotas de ângulo constante), mas faz a Groenlândia parecer do tamanho da África — quando é cerca de 14 vezes menor.
- **Peters** corrige as áreas e, em troca, alonga as formas.

Não existe projeção "certa": existe projeção **adequada ao uso**.

### 3. Mapas temáticos

- **Coropléticos:** cores por intensidade em áreas (densidade, renda, IDH).
- **De fluxos:** setas mostrando movimento (migração, comércio).
- **De pontos:** cada ponto representa uma quantidade.
- **Cartogramas (anamorfoses):** o tamanho do território é deformado para representar um dado — população, PIB, emissões.

Ao ler um mapa colorido, verifique **sempre** os intervalos da legenda: mudar os cortes das faixas muda a impressão visual sem alterar um único dado.

### 4. Mapa é argumento

O centro escolhido, a orientação, o recorte e as cores comunicam antes de qualquer texto. Um mapa centrado no Pacífico conta uma história diferente de um centrado no Atlântico. Um mapa invertido, com o sul em cima, é geograficamente tão válido quanto o convencional — e revela como o hábito virou "natural".

### 5. Rotina de leitura

1. Leia título e legenda antes das cores.
2. Confira a escala e o que ela permite afirmar.
3. Pergunte o que o mapa deixou de fora.
4. Só então tire conclusões.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — a mesma distância em duas escalas',
        body: `**Situação:** dois mapas mostram o trecho entre duas cidades separadas por 60 km reais.

- Mapa A, escala 1:500.000 → 60 km = 6.000.000 cm ÷ 500.000 = **12 cm**
- Mapa B, escala 1:2.000.000 → 6.000.000 ÷ 2.000.000 = **3 cm**

**Interpretação:** o mapa A é de escala **maior** (fração maior), ocupa mais espaço para o mesmo trecho e permite mostrar estradas secundárias, rios e vilarejos. O mapa B cabe em uma página e mostra o país inteiro, mas perde detalhe.

**Erro clássico:** dizer que o mapa B, por mostrar mais território, é o de "escala grande". É o contrário.`,
      },
      {
        title: 'Exemplo resolvido 2 — a legenda que muda a mensagem',
        body: `**Situação:** dois mapas coropléticos usam os mesmos dados de renda média municipal, mas com cortes diferentes na legenda.

- Mapa 1: faixas de R$ 500 em R$ 500 → aparecem muitos tons intermediários e a diferença parece gradual.
- Mapa 2: duas faixas apenas, cortadas na média nacional → o país aparece dividido em dois blocos contrastantes.

**Conclusão:** os dados são os mesmos; a mensagem visual, não.

**O que isso ensina:** ler a legenda não é formalidade. É a única forma de saber se o contraste que você está vendo vem dos dados ou do recorte escolhido por quem fez o mapa.`,
      },
    ],
    mistakes: `**1. Inverter escala grande e pequena.**
Escala grande mostra área pequena com muito detalhe. Pense na fração.

**2. Tratar o mapa como retrato fiel do mundo.**
Toda projeção deforma alguma coisa. A pergunta certa é o que aquela projeção preserva e o que sacrifica.

**3. Concluir a partir das cores sem ler a legenda.**
Mudar os intervalos altera a impressão visual sem alterar nenhum dado.`,
    selfCheck: [
      'Por que 1:1.000 é uma escala maior que 1:1.000.000?',
      'O que a projeção de Mercator preserva e o que ela distorce?',
      'Como a escolha dos intervalos de uma legenda pode mudar a leitura de um mapa temático?',
    ],
    questions: [
      q({
        slug: 'q-cart-1',
        stem: 'Um mapa está na escala 1:25.000. Uma estrada representada por um segmento de 8 cm tem, na realidade, a extensão de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'conversão de escala',
        seconds: 80,
        errors: ['errar a conversão de centímetros para quilômetros'],
        correct: 1,
        options: [
          ['200 m', 'Corresponde a dividir em vez de multiplicar pela escala.', 'inverter a operação'],
          ['2 km', '8 × 25.000 = 200.000 cm. Como 100.000 cm equivalem a 1 km, o resultado é 2 km.'],
          ['20 km', 'Erra a conversão de cm para km por um fator de dez.', 'errar a potência de dez'],
          ['25 km', 'Usa o denominador da escala como resultado.', 'confundir escala com distância'],
          ['800 m', 'Não corresponde a nenhuma etapa correta do cálculo.', 'estimar sem calcular'],
        ],
        explanation: 'Do mapa para a realidade, multiplica-se pelo denominador da escala; depois converte-se a unidade.',
      }),
      q({
        slug: 'q-cart-2',
        stem: 'Uma prefeitura precisa de um mapa para planejar a rede de esgoto de um bairro, indicando ruas, lotes e desníveis do terreno.\n\nA escala mais adequada para esse mapa é:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'escolha de escala conforme a finalidade',
        seconds: 100,
        errors: ['inverter escala grande e pequena'],
        correct: 0,
        options: [
          ['1:2.000, por ser uma escala grande, que representa área pequena com muito detalhe.', 'Planejar lotes e desníveis exige detalhe, o que só uma escala grande oferece.'],
          ['1:1.000.000, por permitir enxergar toda a região de uma vez.', 'Nessa escala, um bairro inteiro caberia em poucos milímetros.', 'confundir abrangência com utilidade'],
          ['1:500.000, por ser a escala mais usada em mapas oficiais.', 'Escala usual não é escala adequada: essa não mostra lotes.', 'apelar ao costume'],
          ['1:100.000, por equilibrar detalhe e abrangência regional.', 'Ainda é pequena demais para representar lotes e desníveis.', 'errar a ordem de grandeza'],
          ['A escala é irrelevante, desde que a legenda esteja completa.', 'Legenda não substitui a resolução espacial que a escala define.', 'ignorar o papel da escala'],
        ],
        explanation: 'Quanto maior a escala (menor o denominador), maior o detalhe possível — e o planejamento de infraestrutura urbana exige detalhe.',
      }),
      q({
        slug: 'q-cart-3',
        stem: 'Dois mapas do mundo usam projeções diferentes. No primeiro, a Groenlândia aparece com tamanho semelhante ao da África. No segundo, a África aparece cerca de catorze vezes maior que a Groenlândia.\n\nA leitura correta dessa diferença é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de distorção cartográfica',
        seconds: 120,
        errors: ['achar que um dos mapas está errado'],
        correct: 4,
        options: [
          ['O primeiro mapa está errado e deve ser descartado.', 'Ele não está errado: preserva ângulos e distorce áreas, o que é adequado para navegação.', 'confundir escolha de projeção com erro'],
          ['O segundo mapa está errado, pois exagera o tamanho da África.', 'A proporção de catorze vezes corresponde à realidade das áreas.', 'inverter a avaliação'],
          ['As duas representações são igualmente precisas em todos os aspectos.', 'Cada uma preserva uma propriedade diferente e sacrifica outra.', 'ignorar as limitações de cada projeção'],
          ['A diferença decorre apenas da escala usada em cada mapa.', 'A diferença é de projeção, não de escala.', 'trocar os conceitos'],
          ['As duas são válidas: a primeira preserva ângulos e distorce áreas; a segunda preserva áreas e distorce formas.', 'Nenhuma projeção plana preserva todas as propriedades de uma superfície esférica. A escolha depende do uso — navegação pede ângulos; comparação de territórios pede áreas.'],
        ],
        explanation: 'Projeções são escolhas técnicas com consequências: cada uma preserva algo e sacrifica outra coisa.',
        detail: 'Por isso a projeção de Mercator, criada para navegação, gera leituras equivocadas quando usada para comparar o tamanho de países.',
      }),
      q({
        slug: 'q-cart-4',
        stem: 'Compare dois mapas temáticos do mesmo país, feitos com os mesmos dados de acesso à internet por município:\n\nI. Legenda com cinco faixas de cores, em intervalos regulares de 20 pontos percentuais.\nII. Legenda com duas cores, separadas exatamente na média nacional.\n\nSobre a comparação, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre escolhas de representação e efeito sobre a leitura',
        seconds: 150,
        errors: ['supor que um dos mapas falsifica os dados'],
        correct: 3,
        options: [
          ['O mapa II falsifica os dados ao reduzir a informação a duas cores.', 'Reduzir faixas simplifica a leitura, mas não altera os dados: não há falsificação.', 'confundir simplificação com fraude'],
          ['O mapa I é sempre superior, pois usa mais cores.', 'Mais faixas nem sempre comunicam melhor; depende da pergunta que o mapa responde.', 'hierarquizar por quantidade de cores'],
          ['Os dois mapas produzem exatamente a mesma impressão visual.', 'A escolha das faixas altera bastante o contraste percebido.', 'ignorar o efeito da legenda'],
          ['Os dois são legítimos, mas produzem leituras diferentes: I mostra gradação e II enfatiza a divisão entre acima e abaixo da média.', 'Os dados são idênticos; o recorte da legenda decide se o leitor vê um gradiente contínuo ou uma clivagem entre dois blocos. Por isso a legenda precisa ser lida antes das cores.'],
          ['Apenas mapas com escala definida podem usar cores temáticas.', 'Escala e simbologia temática são elementos independentes.', 'misturar conceitos'],
        ],
        explanation: 'A legenda é uma escolha editorial. Ler os intervalos antes das cores é o que separa leitura crítica de impressão visual.',
      }),
      q({
        slug: 'q-cart-5',
        stem: 'Uma organização publica um cartograma em que o tamanho de cada país é proporcional às suas emissões históricas de gases de efeito estufa, e não à sua área territorial.\n\nA avaliação mais consistente dessa escolha de representação é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre técnica cartográfica, comunicação e debate político',
        seconds: 170,
        errors: ['tratar o cartograma como erro cartográfico', 'ignorar o argumento embutido'],
        correct: 2,
        options: [
          ['Trata-se de um erro cartográfico, pois mapas devem sempre respeitar as proporções territoriais.', 'Cartogramas são uma técnica reconhecida, cuja finalidade é justamente representar um dado no lugar da área.', 'confundir técnica com erro'],
          ['A escolha é neutra do ponto de vista político, pois apenas apresenta dados.', 'Toda escolha de representação destaca uma dimensão e apaga outras — inclusive esta.', 'supor neutralidade da representação'],
          ['A representação é tecnicamente válida e carrega um argumento: ao deformar o território segundo as emissões, torna visível a desproporção entre responsabilidade histórica e tamanho dos países.', 'O cartograma é uma técnica legítima. Ao substituir área por dado, ele evidencia que países pequenos podem ter emissões históricas enormes — o que sustenta o debate sobre responsabilidades diferenciadas.'],
          ['A representação é inválida porque dificulta a localização geográfica dos países.', 'A perda de precisão locacional é um custo assumido pela técnica, não um defeito que a invalide.', 'exigir de uma técnica o que ela não propõe'],
          ['O cartograma substitui a necessidade de dados numéricos sobre emissões.', 'A representação visual complementa os dados, não os dispensa.', 'supor substituição entre visual e numérico'],
        ],
        explanation: 'A questão integra técnica cartográfica, leitura crítica e debate ambiental: mapas comunicam argumentos, e reconhecer isso é parte da alfabetização cartográfica.',
      }),
      q({
        slug: 'q-cart-rec-1',
        stem: 'Em relação à escala cartográfica, é correto afirmar que:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'relação entre escala, área e detalhe',
        seconds: 70,
        recovery: true,
        errors: ['inverter grande e pequena'],
        correct: 1,
        options: [
          ['Escalas pequenas representam áreas pequenas com muitos detalhes.', 'A relação está invertida.', 'inverter a definição'],
          ['Escalas grandes representam áreas pequenas com muitos detalhes.', 'Escala grande significa denominador pequeno (1:1.000), o que permite representar pouca área com muito detalhe.'],
          ['A escala não influencia a quantidade de detalhes de um mapa.', 'A escala define diretamente o nível de detalhe possível.', 'negar a relação'],
          ['Escala 1:1.000.000 é maior que escala 1:1.000.', 'Como fração, 1/1.000 é maior que 1/1.000.000.', 'comparar denominadores como se fossem o valor'],
          ['Todo mapa deve usar a mesma escala, independentemente da finalidade.', 'A escala é escolhida conforme o objetivo do mapa.', 'ignorar a finalidade'],
        ],
        explanation: 'Escala grande = denominador pequeno = pouca área com muito detalhe.',
      }),
    ],
  }),

  topic({
    slug: 'globalizacao',
    name: 'Globalização',
    subject: 'geografia',
    area: 'ciencias-humanas',
    summary:
      'Analisar a integração mundial de economia, informação e cultura — e por que ela produz efeitos tão desiguais entre lugares e grupos.',
    difficulty: 'intermediate',
    minutes: 24,
    weight: 88,
    order: 4,
    prerequisites: ['cartografia'],
    related: ['meio-ambiente-e-sociedade', 'trabalho-e-sociedade'],
    skill: {
      slug: 'analisar-processos-e-efeitos-da-globalizacao',
      name: 'Analisar processos e efeitos da globalização',
      description:
        'Relacionar fluxos econômicos, tecnológicos e culturais a efeitos desiguais sobre territórios, trabalho e cultura.',
    },
    quick: `**Globalização é a intensificação dos fluxos** de mercadorias, capitais, informação, pessoas e cultura entre lugares distantes.

**Os motores**
- transporte barato (contêiner, aviação);
- telecomunicações e internet;
- abertura comercial e financeira;
- cadeias produtivas fragmentadas entre países.

**As assimetrias**
- **Capital** circula quase livremente; **pessoas**, não — fronteiras se fecham para migrantes.
- Países fornecem etapas diferentes da produção, com valores agregados muito distintos.
- A conexão é **seletiva**: há regiões densamente conectadas e outras praticamente fora dos fluxos.

**Cultura:** circula em duas direções. Há homogeneização (as mesmas marcas em toda parte) e também hibridação e reafirmação de identidades locais.

**Meio ambiente:** produção deslocalizada permite exportar a poluição junto com a etapa produtiva.`,
    explanation: {
      title: 'Fluxos, cadeias e desigualdade: como analisar sem simplificar',
      body: `### 1. Cadeias globais de valor

Um smartphone reúne projeto em um país, componentes de vários outros e montagem em mais um. Cada etapa agrega valor diferente:

- **projeto, marca e software:** alto valor agregado, poucos empregos, países centrais;
- **montagem:** baixo valor agregado, muitos empregos, países com mão de obra barata;
- **matérias-primas:** valor baixo e sujeito a oscilação de preço, com forte impacto ambiental local.

Analisar globalização é analisar **quem fica com qual etapa** — e por quê.

### 2. O paradoxo da mobilidade

O capital atravessa fronteiras em segundos. A mercadoria atravessa em dias. A pessoa, dependendo do passaporte, pode não atravessar nunca.

Essa assimetria explica muito do que se chama de "crise migratória": não é ausência de fluxo, é fluxo **regulado de forma desigual**.

### 3. Territórios luminosos e opacos

A conexão não cobre o mundo de maneira uniforme. Existem áreas densamente equipadas — com fibra ótica, aeroporto, centro logístico, serviços financeiros — e áreas que ficam à margem desses fluxos, às vezes na mesma cidade.

A desigualdade da globalização não é apenas entre países: é também **intraurbana**.

### 4. Cultura: nem só homogeneização

É simples demais dizer que a globalização apaga culturas locais. O que se observa é mais complexo:

- circulação de bens culturais dominantes (homogeneização);
- misturas e apropriações locais (hibridação);
- reação e reafirmação de identidades regionais;
- projeção global de manifestações locais, que ganham público mundial.

A resposta esperada em prova costuma reconhecer as duas direções.

### 5. Críticas e disputas

- **Ambiental:** deslocar produção desloca emissões e passivos.
- **Trabalhista:** competição entre países pode pressionar salários e proteções para baixo.
- **Fiscal:** empresas globais alocam lucros onde a tributação é menor.
- **Soberania:** decisões que afetam populações inteiras passam a ser tomadas fora do seu alcance político.

Reconhecer benefícios e custos ao mesmo tempo é o que caracteriza uma análise consistente.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — seguir a cadeia de uma camiseta',
        body: `**Situação:** algodão cultivado em um país; fio e tecido produzidos em outro; costura em um terceiro; marca, design e venda em um quarto.

**Onde fica o valor?**

- Algodão: menor parcela do preço final, sujeito a oscilação de commodities e a alto consumo de água.
- Costura: baixa parcela, muitos empregos, salários baixos.
- Marca e varejo: maior parcela do preço final.

**Pergunta que a prova costuma fazer:** por que o país que produz a matéria-prima não fica com o maior valor?

**Resposta:** porque o valor se concentra nas etapas de **conhecimento, marca e acesso ao consumidor final**, e não na produção física — que é a etapa mais facilmente substituível.`,
      },
      {
        title: 'Exemplo resolvido 2 — conexão desigual dentro da mesma cidade',
        body: `**Situação:** em uma metrópole, um distrito concentra centros de dados, escritórios corporativos e internet de alta velocidade. A vinte quilômetros dali, um bairro tem conexão instável e nenhuma agência bancária.

**Análise:** os dois pertencem à mesma cidade e ao mesmo país, mas participam de maneira muito diferente dos fluxos globais.

**Conceito envolvido:** a globalização produz **espaços seletivamente conectados**. A distância que importa não é apenas a física, e sim a distância em relação às redes técnicas e financeiras.

**Consequência prática:** políticas de inclusão digital são, nesse sentido, políticas de integração territorial.`,
      },
    ],
    mistakes: `**1. Tratar globalização como fenômeno só econômico.**
Ela é simultaneamente econômica, técnica, cultural, ambiental e política.

**2. Achar que a integração alcança todo mundo por igual.**
A conexão é seletiva, e a exclusão acontece inclusive dentro de uma mesma cidade.

**3. Reduzir a dimensão cultural a "perda de identidade".**
Há homogeneização, mas também hibridação e reafirmação de culturas locais.`,
    selfCheck: [
      'Por que o valor de uma cadeia produtiva global se concentra em algumas etapas?',
      'O que significa dizer que a globalização produz espaços seletivamente conectados?',
      'Por que a análise da dimensão cultural exige olhar em duas direções?',
    ],
    questions: [
      q({
        slug: 'q-glob-1',
        stem: 'A fragmentação da produção industrial entre vários países, com cada etapa realizada onde as condições são mais vantajosas para a empresa, é característica das:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de conceito central da globalização produtiva',
        seconds: 80,
        errors: ['confundir com autarquia econômica'],
        correct: 3,
        options: [
          ['Economias autárquicas, voltadas para o mercado interno.', 'Autarquia é justamente o oposto: produção fechada e independente.', 'inverter o conceito'],
          ['Políticas protecionistas de substituição de importações.', 'Essas políticas concentram etapas dentro do país, em vez de distribuí-las.', 'trocar por outro modelo'],
          ['Corporações de capital exclusivamente nacional.', 'A fragmentação internacional pressupõe atuação além das fronteiras nacionais.', 'restringir indevidamente'],
          ['Cadeias globais de valor, em que etapas produtivas se distribuem entre países conforme custos e vantagens de cada lugar.', 'Projeto, componentes, montagem e distribuição podem ocorrer em países distintos, cada um agregando uma parcela diferente do valor final.'],
          ['Zonas de livre-comércio regionais restritas a um único continente.', 'A fragmentação descrita atravessa continentes.', 'restringir a escala'],
        ],
        explanation: 'Cadeias globais de valor são a forma predominante de organização da produção industrial contemporânea.',
      }),
      q({
        slug: 'q-glob-2',
        stem: 'Um país exporta minério de ferro a baixo preço e importa máquinas e equipamentos de alto valor produzidos com esse mesmo insumo.\n\nEssa situação exemplifica:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação do conceito de valor agregado às trocas internacionais',
        seconds: 110,
        errors: ['achar que a diferença é só de volume comercializado'],
        correct: 2,
        options: [
          ['Uma relação comercial equilibrada, pois há exportação e importação.', 'O equilíbrio não se mede pela existência dos dois fluxos, e sim pelo valor de cada um.', 'confundir existência de fluxo com equilíbrio'],
          ['O fim da divisão internacional do trabalho.', 'A situação descreve justamente a permanência dessa divisão.', 'inverter a conclusão'],
          ['A permanência de uma divisão internacional do trabalho em que alguns países concentram etapas de maior valor agregado.', 'Exportar matéria-prima barata e importar bens industrializados caros reproduz uma assimetria histórica: o valor se concentra nas etapas de transformação e tecnologia.'],
          ['A superioridade tecnológica natural de alguns países.', '"Natural" não explica nada: trata-se de trajetória histórica de investimento e política industrial.', 'naturalizar a desigualdade'],
          ['A ausência de globalização, já que há dependência de importações.', 'Interdependência comercial é exatamente uma marca da globalização.', 'inverter o conceito'],
        ],
        explanation: 'A diferença de valor agregado entre exportação primária e importação industrializada é uma das assimetrias centrais da economia global.',
      }),
      q({
        slug: 'q-glob-3',
        stem: 'Leia o dado autoral: "Em uma metrópole latino-americana, 96% dos domicílios do distrito central têm internet de banda larga fixa; em três distritos periféricos, o índice fica abaixo de 40%."\n\nA leitura mais adequada desse dado, no contexto da globalização, é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de dado sobre conexão desigual no território',
        seconds: 130,
        errors: ['ler como problema exclusivamente individual'],
        correct: 0,
        options: [
          ['A globalização conecta o território de forma seletiva, e a desigualdade de acesso reproduz, dentro da cidade, a divisão entre áreas integradas e áreas à margem dos fluxos.', 'A diferença entre 96% e menos de 40% na mesma cidade mostra que a integração aos fluxos globais é desigual em escala intraurbana, com efeitos sobre trabalho, estudo e acesso a serviços.'],
          ['O dado indica apenas diferenças de interesse dos moradores pela internet.', 'Acesso depende de infraestrutura, renda e oferta de serviço, não de preferência individual.', 'individualizar um problema estrutural'],
          ['A globalização não afeta a escala urbana, apenas as relações entre países.', 'Seus efeitos aparecem inclusive dentro de um mesmo bairro.', 'restringir a escala do fenômeno'],
          ['O dado prova que a globalização reduziu as desigualdades urbanas.', 'A diferença apresentada indica o contrário.', 'inverter a conclusão'],
          ['Trata-se de um problema técnico sem relação com desigualdade social.', 'Acesso à rede está diretamente associado a renda e localização.', 'despolitizar o dado'],
        ],
        explanation: 'Conexão desigual dentro da mesma cidade é uma das expressões mais concretas da seletividade dos fluxos globais.',
      }),
      q({
        slug: 'q-glob-4',
        stem: 'Analise duas leituras sobre os efeitos culturais da globalização:\n\nI. A circulação mundial de produtos culturais tende a padronizar consumos e enfraquecer manifestações locais.\nII. A mesma circulação permite que expressões culturais locais alcancem público mundial e se recombinem com outras referências.\n\nSobre essas leituras:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre leituras complementares de um mesmo processo',
        seconds: 140,
        errors: ['tratar as leituras como excludentes'],
        correct: 4,
        options: [
          ['Apenas I é correta, pois a globalização destrói culturas locais.', 'A destruição não é o único efeito observado; há também projeção e recombinação.', 'reduzir o processo a um efeito'],
          ['Apenas II é correta, pois a cultura local sempre se fortalece com a exposição global.', 'A exposição não garante fortalecimento; pode haver perda de práticas e de línguas.', 'otimismo sem evidência'],
          ['As duas são incorretas, pois cultura e economia são esferas independentes.', 'Circulação cultural depende diretamente de infraestrutura econômica e técnica.', 'separar esferas interdependentes'],
          ['I é correta e II descreve apenas exceções irrelevantes.', 'Casos de projeção global de manifestações locais são numerosos e estruturais, não exceções.', 'minimizar um efeito real'],
          ['As duas são corretas e descrevem efeitos simultâneos do mesmo processo, que combina homogeneização e hibridação cultural.', 'Homogeneização e hibridação coexistem: os mesmos fluxos que espalham produtos dominantes também permitem circulação e recombinação de expressões locais. Uma análise consistente reconhece as duas direções.'],
        ],
        explanation: 'Os efeitos culturais da globalização não são unidirecionais — reconhecer a simultaneidade é o que a questão avalia.',
      }),
      q({
        slug: 'q-glob-5',
        stem: 'Uma empresa transfere sua produção de um país com legislação ambiental rigorosa para outro com regras mais frouxas, mantendo a venda nos mercados de origem.\n\nA análise mais completa dessa decisão considera que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre economia, regulação ambiental e responsabilidade global',
        seconds: 180,
        errors: ['avaliar apenas o efeito local de emprego', 'ignorar o caráter global das emissões'],
        correct: 1,
        options: [
          ['A transferência resolve o problema ambiental do país de origem, que passa a ter emissões menores.', 'As emissões apenas mudam de lugar; a atmosfera é um sistema único.', 'confundir contabilidade nacional com efeito real'],
          ['A transferência desloca custos ambientais para o país receptor sem eliminá-los, gera empregos ali em condições regulatórias mais frágeis e mantém o consumo nos mercados de origem, o que evidencia a dimensão global do problema ambiental.', 'A decisão reduz o custo da empresa transferindo o passivo ambiental para outro território. As emissões continuam existindo, o país receptor ganha empregos com menor proteção e o consumo permanece onde estava — o que mostra por que regulação ambiental puramente nacional tem limites.'],
          ['A decisão é irrelevante do ponto de vista ambiental, pois a produção total permanece a mesma.', 'A mudança de regulação pode aumentar o impacto por unidade produzida.', 'ignorar o efeito da regulação'],
          ['A decisão beneficia igualmente os dois países envolvidos.', 'Os ganhos e custos se distribuem de forma desigual entre eles.', 'supor simetria inexistente'],
          ['A empresa perde competitividade, pois a distância aumenta os custos logísticos.', 'A logística é apenas um dos fatores, e a decisão pressupõe ganho líquido para a empresa.', 'reduzir a análise a um custo'],
        ],
        explanation: 'A questão integra economia, regulação e meio ambiente, e evidencia por que respostas ambientais eficazes exigem coordenação internacional.',
      }),
      q({
        slug: 'q-glob-rec-1',
        stem: 'Uma característica marcante da globalização contemporânea é a assimetria entre a circulação de capitais e a de pessoas. Essa assimetria significa que:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento de assimetria entre fluxos',
        seconds: 75,
        recovery: true,
        errors: ['achar que todos os fluxos são igualmente livres'],
        correct: 2,
        options: [
          ['Tanto capitais quanto pessoas circulam livremente entre países.', 'A circulação de pessoas é fortemente regulada e desigual conforme a nacionalidade.', 'igualar os fluxos'],
          ['Pessoas circulam com mais facilidade que capitais.', 'A relação é inversa.', 'inverter a assimetria'],
          ['Capitais atravessam fronteiras com muito menos restrição do que pessoas.', 'Transferências financeiras ocorrem em segundos e com poucas barreiras, enquanto a mobilidade humana enfrenta vistos, muros e seleção por origem.'],
          ['Ambos os fluxos foram interrompidos pela globalização.', 'A globalização intensificou os fluxos, não os interrompeu.', 'inverter o processo'],
          ['A assimetria existe apenas entre países vizinhos.', 'Ela se manifesta em escala global.', 'restringir o alcance'],
        ],
        explanation: 'Capital circula quase sem barreiras; a mobilidade humana é seletiva e regulada — uma das assimetrias estruturais da globalização.',
      }),
    ],
  }),

  topic({
    slug: 'etica',
    name: 'Ética',
    subject: 'filosofia',
    area: 'ciencias-humanas',
    summary:
      'Distinguir as principais formas de justificar uma ação — consequências, dever, caráter — e aplicá-las a dilemas concretos.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 85,
    order: 1,
    related: ['cidadania-e-direitos', 'cultura-e-identidade'],
    skill: {
      slug: 'aplicar-teorias-eticas-a-situacoes-concretas',
      name: 'Aplicar teorias éticas a situações concretas',
      description:
        'Identificar o critério moral em jogo em um argumento e comparar as conclusões a que diferentes teorias éticas levariam.',
    },
    quick: `**Três formas clássicas de justificar uma ação**

| Corrente | Critério | Pergunta central |
| --- | --- | --- |
| **Consequencialismo / utilitarismo** | resultados | Qual ação produz o melhor resultado para o maior número? |
| **Deontologia** (Kant) | dever e princípio | Eu poderia querer que todos agissem assim? |
| **Ética das virtudes** (Aristóteles) | caráter | Que tipo de pessoa essa ação me torna? |

**Distinções que as provas cobram**

- **Ética x moral:** moral é o conjunto de normas de um grupo; ética é a reflexão crítica sobre essas normas.
- **Ética x direito:** nem tudo que é legal é ético, nem tudo que é ético está previsto em lei.
- **Relativismo x universalismo:** valores variam entre culturas — mas daí não segue automaticamente que qualquer prática seja igualmente defensável.

**O erro mais comum em prova:** responder com opinião pessoal em vez de identificar o **critério** que sustenta cada posição.`,
    explanation: {
      title: 'Identificar o critério moral por trás de um argumento',
      body: `### 1. Consequencialismo

O que torna uma ação certa é o **resultado** que ela produz. Na versão utilitarista clássica: maximizar bem-estar para o maior número.

**Força:** oferece um critério comparável e útil em decisões coletivas (saúde pública, políticas).
**Limite:** pode justificar sacrificar uma minoria em nome do benefício da maioria — o que a maioria das pessoas rejeita intuitivamente.

### 2. Deontologia

O que torna uma ação certa é sua conformidade com um **dever** ou princípio, independentemente do resultado.

Kant propõe o teste da **universalização**: aja apenas segundo uma máxima que você possa querer que se torne lei universal. E o princípio de tratar a humanidade sempre também como fim, nunca apenas como meio.

**Força:** protege direitos individuais contra cálculos de utilidade.
**Limite:** enfrenta conflitos entre deveres (não mentir x proteger uma vida) sem uma regra clara de prioridade.

### 3. Ética das virtudes

A pergunta se desloca da ação para o agente: qual **caráter** essa escolha cultiva? Aristóteles fala em hábito, prudência e no justo meio entre excessos.

**Força:** lida bem com a vida cotidiana e a formação moral.
**Limite:** oferece menos orientação em dilemas específicos e urgentes.

### 4. Como as três se comportam em um mesmo caso

*Uma jornalista descobre um documento verdadeiro obtido de forma ilícita, que revela desvio de dinheiro público.*

- **Consequencialista:** publica se o benefício social superar os danos.
- **Deontológico:** examina o dever de dizer a verdade, o direito do público à informação e a ilicitude da obtenção — sem que o bom resultado, sozinho, resolva a questão.
- **Ética das virtudes:** pergunta o que a coragem e a integridade profissional exigem naquela situação concreta.

Repare: as três podem chegar à mesma conclusão por caminhos diferentes, ou a conclusões distintas. A prova cobra o **caminho**, não o veredito.

### 5. Ética aplicada

Bioética, ética ambiental, ética digital e ética profissional são campos em que essas teorias são postas à prova por casos reais — testes clínicos, uso de dados pessoais, responsabilidade por danos ambientais futuros.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — o mesmo caso por três critérios',
        body: `**Situação:** uma empresa descobre uma falha em seu produto que causará prejuízo financeiro a poucos clientes. Recolher tudo custaria muito caro; calar sairia mais barato.

**Consequencialista:** compara o custo do recall com o dano total aos clientes, incluindo perda de confiança e efeitos de longo prazo. Se o dano agregado superar o custo, deve recolher.

**Deontológico:** há dever de informar. Omitir trata os clientes apenas como meio para preservar o lucro. Deve informar, independentemente do cálculo.

**Ética das virtudes:** a honestidade e a responsabilidade profissional pedem transparência; a omissão cultivaria um caráter corporativo desonesto.

**Conclusão da análise:** as três convergem para informar, por razões diferentes. Uma boa resposta em prova mostra exatamente isso — a convergência não apaga a diferença dos critérios.`,
      },
      {
        title: 'Exemplo resolvido 2 — quando legal e ético não coincidem',
        body: `**Situação:** uma prática é legal em determinado país — por exemplo, coletar dados de navegação sem consentimento explícito, sob uma cláusula genérica aceita no cadastro.

**Pergunta:** ser legal basta?

**Análise:**
- **Legalidade** responde: existe norma que autoriza?
- **Ética** responde: essa prática respeita a autonomia de quem foi cadastrado?

Uma cláusula que ninguém lê e que ninguém pode recusar sem perder o serviço cumpre a lei sem produzir consentimento real.

**Conclusão:** legalidade e legitimidade ética não são a mesma coisa. Reconhecer essa distinção é uma das competências mais cobradas em questões de filosofia aplicada.`,
      },
    ],
    mistakes: `**1. Trocar análise por opinião.**
A pergunta costuma ser qual critério sustenta cada posição, e não o que você acha do caso.

**2. Confundir ética com moral e com lei.**
Moral é o conjunto de normas vigente em um grupo; ética é a reflexão sobre elas; lei é norma estatal com sanção.

**3. Concluir que relativismo cultural impede qualquer juízo.**
Reconhecer diversidade de valores não obriga a aceitar toda prática como igualmente defensável; o debate segue possível e necessário.`,
    selfCheck: [
      'Qual a diferença entre justificar uma ação por suas consequências e justificá-la por um dever?',
      'Por que uma prática legal pode ser eticamente questionável?',
      'O que a ética das virtudes pergunta que as outras duas correntes não perguntam?',
    ],
    questions: [
      q({
        slug: 'q-etica-1',
        stem: 'Uma pessoa afirma: "Devo devolver a carteira que encontrei porque, se todos ficassem com o que acham, ninguém poderia confiar em ninguém — e eu não posso querer um mundo assim."\n\nEsse argumento se aproxima da:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de critério moral em um argumento',
        seconds: 90,
        errors: ['confundir universalização com cálculo de consequências'],
        correct: 1,
        options: [
          ['Ética utilitarista, pois calcula o benefício coletivo da devolução.', 'A justificativa não pesa benefícios: ela testa se a conduta poderia valer para todos.', 'confundir universalização com utilidade'],
          ['Ética deontológica, pela aplicação do teste de universalização da conduta.', 'Perguntar se a máxima poderia valer para todos é exatamente o procedimento kantiano de universalização, que julga a ação pelo princípio e não pelo resultado.'],
          ['Ética das virtudes, por descrever o caráter da pessoa honesta.', 'O argumento não fala do caráter que se cultiva, e sim da regra que se poderia universalizar.', 'confundir com foco no agente'],
          ['Ética relativista, por depender do contexto cultural.', 'O argumento pretende justamente valer independentemente do contexto.', 'inverter a pretensão do argumento'],
          ['Ética hedonista, por buscar o prazer individual.', 'Não há apelo a prazer ou satisfação pessoal.', 'atribuir critério ausente'],
        ],
        explanation: 'O teste "eu poderia querer que todos agissem assim?" é a marca da deontologia kantiana.',
      }),
      q({
        slug: 'q-etica-2',
        stem: 'Uma cidade precisa decidir se destina uma verba limitada à vacinação em massa, que beneficiaria milhares, ou a um tratamento caro para poucos pacientes com doença rara. Um gestor defende a vacinação, argumentando que ela produz o maior benefício para o maior número de pessoas.\n\nEsse argumento se apoia em uma perspectiva:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação de teoria ética a decisão de política pública',
        seconds: 110,
        errors: ['confundir com deontologia'],
        correct: 3,
        options: [
          ['Deontológica, pois cumpre o dever do Estado de proteger a saúde.', 'A justificativa apresentada é o cálculo de benefício agregado, não o cumprimento de um dever independentemente do resultado.', 'trocar o critério'],
          ['Da ética das virtudes, pois demonstra prudência administrativa.', 'A prudência aparece como consequência, mas o argumento explícito é de maximização.', 'confundir efeito com critério'],
          ['Relativista, pois a decisão depende dos valores da cidade.', 'O argumento apresentado não apela a valores culturais locais.', 'atribuir critério ausente'],
          ['Consequencialista, pois avalia a ação pelo resultado agregado que produz.', 'Escolher a alternativa que maximiza o benefício para o maior número é a formulação clássica do utilitarismo, uma forma de consequencialismo.'],
          ['Contratualista, pois pressupõe um acordo prévio entre os cidadãos.', 'Não há apelo a acordo ou contrato social no argumento.', 'atribuir teoria não mobilizada'],
        ],
        explanation: 'Maximizar benefício agregado é o critério consequencialista. Uma objeção deontológica clássica seria lembrar que pacientes raros também têm direitos que não se dissolvem no cálculo.',
      }),
      q({
        slug: 'q-etica-3',
        stem: 'Leia o comentário autoral: "Não vejo problema em uma empresa usar dados de navegação dos usuários sem aviso claro. Está na cláusula que todo mundo aceita, então é legal — e se é legal, está certo."\n\nA análise filosófica adequada desse comentário identifica que ele:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de argumento que reduz ética a legalidade',
        seconds: 130,
        errors: ['aceitar a equivalência entre legal e ético'],
        correct: 0,
        options: [
          ['Reduz a questão ética à legalidade, ignorando que uma prática pode ser prevista em lei e ainda assim não respeitar a autonomia de quem consente sem informação adequada.', 'A lei estabelece o mínimo exigível; a análise ética pergunta se o consentimento foi real. Uma cláusula genérica, não lida e não recusável sem perda do serviço, cumpre a norma sem produzir autonomia.'],
          ['Apresenta um argumento deontológico consistente, baseado no cumprimento de deveres legais.', 'Deontologia não se confunde com legalismo: o dever moral não se esgota na norma jurídica vigente.', 'confundir dever moral com norma legal'],
          ['Defende a ética das virtudes ao valorizar o cumprimento de contratos.', 'Não há discussão sobre caráter ou virtude no comentário.', 'atribuir teoria ausente'],
          ['É um argumento utilitarista, pois pesa benefícios e custos do uso de dados.', 'Nenhum cálculo de benefícios é apresentado.', 'atribuir critério ausente'],
          ['Não contém nenhum problema, pois legalidade e ética são sinônimos.', 'São conceitos distintos, e a história oferece muitos exemplos de leis eticamente contestadas.', 'aceitar a premissa do comentário'],
        ],
        explanation: 'A distinção entre legalidade e legitimidade ética é central: a lei define o mínimo, a ética avalia se ele basta.',
      }),
      q({
        slug: 'q-etica-4',
        stem: 'Considere duas justificativas para não mentir:\n\nI. "Não minto porque, se a mentira se generalizasse, a própria comunicação perderia sentido."\nII. "Não minto porque quero me tornar uma pessoa íntegra, e a integridade se constrói pela prática constante da verdade."\n\nAs justificativas correspondem, respectivamente, a:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre critérios morais próximos',
        seconds: 140,
        errors: ['confundir deontologia com ética das virtudes'],
        correct: 2,
        options: [
          ['Utilitarismo e deontologia.', 'Nenhuma das duas calcula benefícios agregados.', 'atribuir critério ausente'],
          ['Ética das virtudes e utilitarismo.', 'A ordem está trocada e o utilitarismo não aparece em nenhuma delas.', 'trocar as correntes'],
          ['Deontologia e ética das virtudes.', 'I aplica o teste de universalização, próprio da deontologia. II se preocupa com o caráter que a prática constrói, que é o foco da ética das virtudes.'],
          ['Relativismo e contratualismo.', 'Nenhuma das duas apela a variação cultural ou a acordo social.', 'atribuir teorias não mobilizadas'],
          ['Consequencialismo e deontologia.', 'I não avalia consequências e II não formula um dever universal.', 'inverter os critérios'],
        ],
        explanation: 'A diferença está no foco: I julga a ação por um princípio universalizável; II julga pelo caráter que a conduta cultiva no agente.',
      }),
      q({
        slug: 'q-etica-5',
        stem: 'Um hospital com um único leito de UTI disponível recebe simultaneamente dois pacientes graves. A equipe precisa decidir com transparência e critério.\n\nA abordagem mais consistente do ponto de vista da ética aplicada é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre teorias éticas e decisão em contexto de escassez',
        seconds: 190,
        errors: ['aplicar uma única teoria sem considerar limites', 'recusar a decisão'],
        correct: 4,
        options: [
          ['Escolher aleatoriamente, já que qualquer critério é arbitrário.', 'Sorteio pode integrar um protocolo, mas afirmar que todo critério é arbitrário abandona a deliberação clínica e ética.', 'confundir dificuldade com impossibilidade'],
          ['Aplicar exclusivamente o critério de quem chegou primeiro, por ser o mais simples.', 'Simplicidade não é justificativa suficiente diante de prognósticos diferentes.', 'escolher pela facilidade'],
          ['Decidir pela capacidade de pagamento, já que os recursos são limitados.', 'Critério econômico em atendimento de urgência viola princípios básicos de equidade em saúde.', 'introduzir critério injusto'],
          ['Adiar a decisão até que haja consenso entre todos os envolvidos, incluindo as famílias.', 'Em emergência, adiar equivale a decidir por omissão, com risco para ambos os pacientes.', 'transformar indecisão em método'],
          ['Aplicar protocolos previamente definidos, que combinam critérios clínicos de benefício esperado com regras que impedem discriminação por condição social, e registrar publicamente a justificativa da decisão.', 'Protocolos anteriores ao caso reduzem a arbitrariedade, combinam o cálculo de benefício com salvaguardas deontológicas contra discriminação e tornam a decisão auditável — o que responde às três tradições éticas ao mesmo tempo.'],
        ],
        explanation: 'A questão integra consequencialismo (benefício clínico esperado), deontologia (proteção contra discriminação) e virtudes (transparência e responsabilidade profissional).',
        detail: 'Protocolos definidos antes do caso concreto existem justamente para que a decisão não dependa da pressão do momento nem da preferência de quem está de plantão.',
      }),
      q({
        slug: 'q-etica-rec-1',
        stem: 'A distinção entre ética e moral pode ser assim resumida:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'distinção conceitual básica',
        seconds: 70,
        recovery: true,
        errors: ['tratar os termos como sinônimos'],
        correct: 1,
        options: [
          ['São sinônimos perfeitos, sem qualquer diferença conceitual.', 'A filosofia distingue as duas noções de modo produtivo.', 'igualar os conceitos'],
          ['Moral é o conjunto de normas e valores vigentes em um grupo; ética é a reflexão crítica sobre esses valores.', 'A moral é o que um grupo pratica e prescreve; a ética examina, questiona e busca justificar ou revisar essas normas.'],
          ['Ética é o conjunto de leis do Estado; moral é o comportamento privado.', 'Leis pertencem ao campo do direito, distinto dos dois conceitos.', 'confundir com direito'],
          ['Moral se aplica a instituições; ética, apenas a indivíduos.', 'As duas noções operam nos dois níveis.', 'restringir o alcance'],
          ['Ética é imutável; moral muda conforme a época.', 'A reflexão ética também se transforma historicamente.', 'atribuir imutabilidade indevida'],
        ],
        explanation: 'Moral é o vivido e prescrito por um grupo; ética é a reflexão crítica sobre esse conjunto de normas.',
      }),
    ],
  }),

  topic({
    slug: 'cultura-e-identidade',
    name: 'Cultura e identidade',
    subject: 'sociologia',
    area: 'ciencias-humanas',
    summary:
      'Compreender cultura como construção social e identidade como processo — e reconhecer etnocentrismo, apropriação e diversidade.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 84,
    order: 2,
    related: ['cidadania-e-direitos', 'etica'],
    skill: {
      slug: 'analisar-cultura-identidade-e-diversidade',
      name: 'Analisar cultura, identidade e diversidade',
      description:
        'Aplicar conceitos de cultura, etnocentrismo e identidade a situações concretas de convivência e conflito.',
    },
    quick: `**Cultura**, em sociologia e antropologia, é tudo que é **aprendido e compartilhado** em sociedade: língua, valores, técnicas, rituais, hábitos, formas de organizar a vida. Não é sinônimo de erudição.

**Conceitos que as provas cobram**

- **Etnocentrismo:** julgar outra cultura pelos critérios da própria, tomando a sua como padrão.
- **Relativismo cultural:** compreender uma prática dentro da lógica da cultura em que ela ocorre — como método de análise, não como abandono de todo juízo.
- **Identidade:** processo relacional e dinâmico; construída na relação com os outros, não recebida pronta.
- **Diversidade x desigualdade:** diferença cultural não implica hierarquia; desigualdade é distribuição desigual de recursos e poder.
- **Apropriação cultural:** uso de elementos de uma cultura subordinada por um grupo dominante, sem reconhecimento, contexto ou contrapartida.

**Cuidado clássico:** confundir "cultura" com "cultura erudita" leva a leituras equivocadas em quase toda questão do tema.`,
    explanation: {
      title: 'Cultura como construção, identidade como processo',
      body: `### 1. Cultura é aprendida, não herdada biologicamente

Ninguém nasce sabendo cumprimentar, comer com determinado utensílio ou organizar o tempo de uma certa maneira. Tudo isso é **socialização**: aprendemos com família, escola, trabalho, mídia e grupos de convivência.

Consequência importante: se é aprendida, é **transformável**. Práticas culturais mudam, e disputas sobre elas são normais na vida social.

### 2. Etnocentrismo, e por que ele é tão fácil

Julgar o outro pelos próprios critérios é o caminho de menor esforço: nossos hábitos parecem naturais porque são os únicos que aprendemos desde sempre.

O antídoto metodológico é o **estranhamento**: olhar o próprio hábito como se fosse alheio. Por que comemos em certos horários? Por que essa roupa e não outra? A pergunta desnaturaliza o que parecia óbvio.

### 3. Relativismo como método — e seus limites

Relativismo cultural é uma ferramenta de **compreensão**: entender uma prática no contexto de sentido em que ela existe, antes de julgá-la.

Isso não significa que qualquer prática seja imune à crítica. O debate público, os direitos humanos e a própria discussão interna de cada sociedade continuam existindo. A prova costuma valorizar quem distingue **compreender** de **endossar**.

### 4. Identidade: plural e situacional

Uma mesma pessoa é filha, trabalhadora, torcedora, migrante, praticante de uma religião. Essas identidades:

- coexistem;
- ganham destaque conforme a situação;
- mudam ao longo da vida;
- se constroem na relação com os outros — inclusive por contraste.

Por isso identidade é **processo**, e não um dado fixo.

### 5. Diversidade não é desigualdade

Diferenças culturais são horizontais: modos distintos de viver. Desigualdade é vertical: acesso desigual a renda, direitos e poder.

O problema aparece quando a diferença é usada para **justificar** a desigualdade — é isso que ocorre no racismo e em outras formas de discriminação. Separar os dois conceitos é uma das competências mais exigidas do tema.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — estranhar o próprio hábito',
        body: `**Situação:** um estudante estranha o fato de outra cultura comer com as mãos e considera a prática "sem higiene".

**Análise em três passos:**

1. **Nomear:** o julgamento é etnocentrismo — o critério usado é o da própria cultura.
2. **Contextualizar:** em muitas culturas, comer com as mãos envolve regras rígidas de lavagem, uso de uma das mãos e etiqueta específica.
3. **Estranhar o próprio hábito:** compartilhar um saleiro, um cardápio plastificado ou talheres lavados em uma cozinha invisível também envolve pressupostos que nunca questionamos.

**Conclusão:** o exercício não é decidir qual prática é melhor, e sim perceber que ambas têm regras — e que só uma delas nos parecia "natural".`,
      },
      {
        title: 'Exemplo resolvido 2 — apropriação e circulação cultural',
        body: `**Situação:** uma marca de moda lança uma coleção usando grafismos de um povo indígena, sem citar a origem, sem consulta e sem qualquer contrapartida à comunidade.

**Por que isso é diferente de "troca cultural"?**

Três elementos costumam caracterizar a apropriação problemática:

1. **Assimetria de poder** entre quem usa e quem criou;
2. **Ausência de reconhecimento** da origem;
3. **Concentração do ganho** econômico e simbólico em quem se apropria.

**Contraponto necessário:** culturas sempre circularam e se misturaram, e isso é constitutivo da vida social. O problema não é a circulação — é a circulação **desigual**, em que uma parte fornece o repertório e a outra fica com o lucro e o crédito.

**Como o caso poderia mudar de figura:** consulta prévia, autoria creditada, participação nos resultados e controle da comunidade sobre o uso.`,
      },
    ],
    mistakes: `**1. Confundir cultura com erudição.**
Em ciências humanas, cultura abrange todo modo de vida aprendido e compartilhado — não apenas artes consagradas.

**2. Tratar relativismo como impossibilidade de qualquer crítica.**
Relativismo é método de compreensão; ele não impede o debate público nem a discussão interna às sociedades.

**3. Igualar diversidade e desigualdade.**
Diferença é horizontal; desigualdade é hierarquia de acesso a recursos e direitos.`,
    selfCheck: [
      'Por que dizer que a cultura é aprendida implica dizer que ela pode mudar?',
      'Qual a diferença entre compreender uma prática e endossá-la?',
      'O que distingue troca cultural de apropriação cultural problemática?',
    ],
    questions: [
      q({
        slug: 'q-cult-1',
        stem: 'Em ciências humanas, o conceito de cultura designa:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'definição do conceito de cultura',
        seconds: 70,
        errors: ['confundir cultura com erudição'],
        correct: 2,
        options: [
          ['O conjunto de conhecimentos artísticos e literários de uma elite instruída.', 'Essa é a acepção corrente de "cultura erudita", mais restrita que o conceito antropológico.', 'confundir com erudição'],
          ['As características biológicas herdadas que distinguem os povos.', 'Cultura é aprendida socialmente, não transmitida por herança biológica.', 'naturalizar a diferença cultural'],
          ['O conjunto de práticas, valores, saberes e formas de organização aprendidos e compartilhados socialmente.', 'Língua, alimentação, técnicas, rituais e valores compõem a cultura de um grupo, e todos são aprendidos na convivência.'],
          ['O grau de desenvolvimento econômico alcançado por uma sociedade.', 'Desenvolvimento econômico é outra dimensão, que não define cultura.', 'trocar cultura por economia'],
          ['O conjunto de leis formais que organizam a vida em sociedade.', 'Leis são parte da vida social, mas não esgotam o conceito de cultura.', 'reduzir cultura a norma jurídica'],
        ],
        explanation: 'Cultura, no sentido antropológico, é todo modo de vida aprendido e compartilhado — bem mais amplo que "cultura erudita".',
      }),
      q({
        slug: 'q-cult-2',
        stem: 'Um turista comenta, ao visitar outro país: "Aqui as pessoas almoçam às quatro da tarde. É um povo desorganizado, deviam almoçar na hora certa."\n\nEsse comentário exemplifica:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação do conceito de etnocentrismo',
        seconds: 90,
        errors: ['ver o comentário como simples observação'],
        correct: 0,
        options: [
          ['Etnocentrismo, pois toma os próprios hábitos como padrão universal para julgar os do outro.', '"Hora certa" é a hora do país do turista. Transformar um hábito próprio em critério universal é a definição de etnocentrismo.'],
          ['Relativismo cultural, pois reconhece a existência de outro costume.', 'Reconhecer a diferença e em seguida hierarquizá-la é o oposto do relativismo como método.', 'confundir constatação com relativismo'],
          ['Uma observação neutra sobre horários de refeição.', 'A palavra "desorganizado" carrega um juízo de valor explícito.', 'ignorar o juízo embutido'],
          ['Apropriação cultural, por interferir nos costumes locais.', 'Não há uso de elementos culturais alheios pelo turista.', 'aplicar conceito inadequado'],
          ['Identidade cultural, pois o turista afirma sua origem.', 'A afirmação de origem não é, por si, um conceito explicativo aqui.', 'trocar o conceito central'],
        ],
        explanation: 'Etnocentrismo é converter o hábito próprio em régua universal para medir o outro.',
      }),
      q({
        slug: 'q-cult-3',
        stem: 'Leia o relato autoral: "Cresci falando duas línguas em casa. Na escola, eu era ‘o estrangeiro’; nas férias, no país da minha mãe, eu era ‘o de fora’. Levei anos para entender que não precisava escolher um lado."\n\nO relato ilustra que a identidade cultural:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de relato sobre construção identitária',
        seconds: 120,
        errors: ['tratar identidade como escolha única'],
        correct: 3,
        options: [
          ['É determinada pelo local de nascimento e não muda ao longo da vida.', 'O relato descreve exatamente uma identidade que não se resolve pelo local de nascimento.', 'contrariar o relato'],
          ['Deve ser escolhida entre as origens disponíveis, para evitar conflito.', 'A conclusão do relato é justamente que não era preciso escolher.', 'contrariar a conclusão do texto'],
          ['Depende exclusivamente da língua que a pessoa fala com mais fluência.', 'A língua é um elemento entre vários, e o relato mostra pertencimento múltiplo.', 'reduzir identidade a um marcador'],
          ['É relacional e múltipla, construindo-se de forma diferente conforme o contexto e o olhar dos outros.', 'A pessoa é "estrangeira" em um contexto e "de fora" no outro: a identidade se define na relação, e pode acomodar pertencimentos simultâneos.'],
          ['É um dado fixo, que só se altera por decisão formal de nacionalidade.', 'Nacionalidade jurídica e identidade cultural são coisas distintas.', 'confundir identidade com documento'],
        ],
        explanation: 'Identidade é processo relacional: varia com o contexto, com o olhar do outro e ao longo do tempo, e admite pertencimentos múltiplos.',
      }),
      q({
        slug: 'q-cult-4',
        stem: 'Analise duas situações:\n\nI. Um grupo musical de um país convida artistas de outro para uma produção conjunta, com autoria compartilhada e créditos a todos os envolvidos.\nII. Uma grande empresa comercializa peças com grafismos de um povo indígena, sem consulta, sem crédito e sem repasse de recursos à comunidade.\n\nSobre as duas situações:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'distinção entre troca cultural e apropriação problemática',
        seconds: 150,
        errors: ['tratar toda circulação cultural como apropriação'],
        correct: 1,
        options: [
          ['Ambas configuram apropriação cultural, pois envolvem uso de elementos de outra cultura.', 'Circulação cultural não é, por si, apropriação problemática: o que pesa é a assimetria, o crédito e a repartição dos ganhos.', 'condenar toda circulação'],
          ['Apenas II configura apropriação problemática, pela combinação de assimetria de poder, ausência de reconhecimento e concentração dos ganhos.', 'Em I há reciprocidade, autoria compartilhada e crédito. Em II, um agente economicamente dominante utiliza a criação de uma comunidade sem consulta, sem crédito e sem contrapartida.'],
          ['Apenas I configura apropriação, pois mistura estilos de origens diferentes.', 'Mistura com reciprocidade e crédito é troca cultural, não apropriação.', 'inverter a avaliação'],
          ['Nenhuma configura apropriação, pois culturas sempre circularam.', 'A circulação histórica não anula a assimetria concreta descrita em II.', 'usar a história para neutralizar o caso'],
          ['A distinção entre as situações depende apenas do gosto pessoal de quem avalia.', 'Existem critérios objetivos: consulta, crédito, poder relativo e repartição de benefícios.', 'reduzir análise a preferência'],
        ],
        explanation: 'O critério não é a mistura em si, e sim a assimetria de poder, o reconhecimento da origem e a repartição dos ganhos.',
      }),
      q({
        slug: 'q-cult-5',
        stem: 'Uma escola recebe estudantes de várias origens culturais e discute como organizar suas atividades e calendário.\n\nA política mais consistente com o entendimento sociológico de cultura e diversidade é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre diversidade cultural, igualdade de direitos e política institucional',
        seconds: 180,
        errors: ['confundir tratamento igual com tratamento idêntico', 'transformar diversidade em folclorização'],
        correct: 4,
        options: [
          ['Adotar um único padrão cultural para todos, garantindo que ninguém seja tratado de forma diferente.', 'Padrão único costuma ser o padrão do grupo majoritário, o que não é neutralidade.', 'confundir uniformidade com igualdade'],
          ['Criar turmas separadas por origem cultural, para que cada grupo preserve seus costumes.', 'Separação institucional produz segregação, e não convivência.', 'confundir preservação com separação'],
          ['Realizar uma feira cultural anual com comidas e danças típicas, mantendo o restante do calendário inalterado.', 'Eventos pontuais podem virar folclorização se não houver mudança nas práticas cotidianas da escola.', 'reduzir diversidade a evento'],
          ['Deixar que cada estudante decida individualmente quais regras seguir, sem critérios comuns.', 'A convivência exige regras compartilhadas construídas coletivamente.', 'confundir respeito com ausência de regras'],
          ['Manter regras comuns construídas com participação da comunidade escolar, prever flexibilizações justificadas — como datas religiosas e restrições alimentares — e incorporar as diferentes referências culturais ao currículo ao longo do ano.', 'A proposta trata a diversidade como parte do cotidiano, e não como evento; distingue igualdade de uniformidade ao prever flexibilizações justificadas; e sustenta regras comuns construídas coletivamente, o que evita tanto a imposição de um padrão único quanto a ausência de critérios.'],
        ],
        explanation: 'A questão integra os conceitos de cultura, diversidade e igualdade: tratar todos com igual consideração às vezes exige tratar situações diferentes de modo diferente.',
      }),
      q({
        slug: 'q-cult-rec-1',
        stem: 'A afirmação "as diferenças culturais entre grupos não implicam hierarquia entre eles" corresponde ao reconhecimento de que:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'distinção entre diversidade e desigualdade',
        seconds: 70,
        recovery: true,
        errors: ['confundir diversidade com desigualdade'],
        correct: 1,
        options: [
          ['Todas as culturas produzem exatamente os mesmos resultados materiais.', 'A afirmação não trata de resultados materiais, e sim de hierarquia de valor.', 'trocar o objeto da afirmação'],
          ['Diversidade cultural é diferença horizontal, enquanto desigualdade é distribuição desigual de recursos e poder.', 'Modos de vida distintos não formam uma escala de superioridade. Desigualdade é outro fenômeno: refere-se ao acesso desigual a bens, direitos e poder.'],
          ['As culturas devem ser preservadas sem qualquer contato entre si.', 'Isolamento não decorre do reconhecimento da diversidade.', 'confundir respeito com isolamento'],
          ['Nenhuma prática cultural pode ser objeto de debate público.', 'Reconhecer diversidade não encerra o debate sobre práticas.', 'exagerar a consequência'],
          ['A desigualdade social é uma consequência natural da diversidade cultural.', 'Desigualdade tem causas econômicas e políticas, não decorre da diferença cultural.', 'naturalizar a desigualdade'],
        ],
        explanation: 'Diferença cultural é horizontal; desigualdade é vertical. Usar a primeira para justificar a segunda é o mecanismo do preconceito.',
      }),
    ],
  }),

  topic({
    slug: 'trabalho-e-sociedade',
    name: 'Trabalho e sociedade',
    subject: 'sociologia',
    area: 'ciencias-humanas',
    summary:
      'Analisar as formas de organização do trabalho, os direitos conquistados e as transformações recentes ligadas à tecnologia e à informalidade.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 88,
    order: 3,
    prerequisites: ['cidadania-e-direitos'],
    related: ['industrializacao', 'globalizacao'],
    skill: {
      slug: 'analisar-transformacoes-do-mundo-do-trabalho',
      name: 'Analisar transformações do mundo do trabalho',
      description:
        'Relacionar formas de organização do trabalho, direitos sociais e mudanças tecnológicas a seus efeitos sobre trabalhadores.',
    },
    quick: `**Formas históricas de organização do trabalho**

- **Taylorismo:** tempos e movimentos cronometrados, separação entre quem planeja e quem executa.
- **Fordismo:** linha de montagem, produção em massa, salários que sustentam o consumo de massa.
- **Toyotismo:** produção enxuta, sob demanda, trabalhador multifuncional, estoque mínimo.
- **Plataformas digitais:** tarefas distribuídas por algoritmo, remuneração por entrega, vínculo frequentemente ausente.

**Conceitos-chave**

- **Divisão social do trabalho:** quem faz o quê, e com qual reconhecimento.
- **Formal x informal:** com ou sem contrato, contribuição previdenciária e proteção.
- **Precarização:** perda de estabilidade, previsibilidade e proteção, mesmo com trabalho contínuo.
- **Trabalho reprodutivo:** cuidado e afazeres domésticos, historicamente não remunerados e majoritariamente femininos, sem os quais o trabalho remunerado não se sustenta.

**No Brasil:** informalidade alta e persistente, desigualdades de raça e gênero na renda e no acesso a ocupações.`,
    explanation: {
      title: 'Do relógio da fábrica ao algoritmo: o que muda e o que permanece',
      body: `### 1. Cada modelo produz um tipo de trabalhador

O taylorismo separou concepção e execução: engenheiros pensam, operários repetem. O fordismo acrescentou a esteira e o salário que permitia comprar o próprio produto. O toyotismo pediu polivalência, envolvimento e resposta rápida à demanda.

As plataformas digitais radicalizaram um traço: transferiram para o trabalhador **os riscos e os custos** (veículo, combustível, manutenção, tempo de espera) mantendo o controle sobre a distribuição das tarefas.

### 2. Direitos como resultado de conflito

Jornada de oito horas, descanso semanal, férias e proibição do trabalho infantil não foram concessões espontâneas: resultaram de greves, organização sindical e disputa política ao longo de mais de um século.

Isso importa para a leitura do presente: mudanças na legislação trabalhista são disputas sobre o mesmo terreno, não ajustes técnicos neutros.

### 3. Informalidade no Brasil

Trabalho informal não é sinônimo de trabalho eventual. Muita gente trabalha todos os dias, com jornada longa, sem contrato, sem contribuição previdenciária e sem acesso a auxílio-doença, licença ou aposentadoria futura.

Os efeitos são individuais (insegurança) e coletivos (menor arrecadação para a própria seguridade que ampara todos).

### 4. Trabalho de cuidado

Cozinhar, limpar, cuidar de crianças e de idosos sustentam toda a economia remunerada — e historicamente não entram nas contas nacionais. A distribuição desigual desse trabalho, majoritariamente feminina, reduz o tempo disponível de mulheres para estudo, trabalho remunerado e descanso.

Reconhecer o trabalho reprodutivo é uma das principais contribuições recentes da sociologia do trabalho.

### 5. Automação: o debate honesto

Duas leituras simplistas circulam: "a tecnologia vai acabar com o trabalho" e "sempre surgem novos empregos, então não há problema".

A análise consistente reconhece que:

- automação **elimina** funções e **cria** outras;
- os efeitos são **desiguais**: quem perde o emprego raramente é quem ocupa o novo posto;
- a transição exige política pública — qualificação, proteção de renda e regulação —, e não apenas otimismo.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — a mesma jornada, proteções diferentes',
        body: `**Situação:** duas pessoas trabalham 9 horas por dia, 6 dias por semana. Uma é caixa de supermercado com carteira assinada; a outra faz entregas por aplicativo.

**O que a formalidade muda concretamente:**

| Dimensão | Com vínculo | Sem vínculo |
| --- | --- | --- |
| Renda | previsível | variável |
| Doença | afastamento remunerado | sem renda no período |
| Acidente | cobertura e estabilidade | custo próprio |
| Férias e 13º | garantidos | inexistentes |
| Aposentadoria | contribuição automática | depende de contribuição própria |
| Custos do trabalho | do empregador | do trabalhador |

**Conclusão:** a jornada é igual; a exposição ao risco, não. É isso que o conceito de **precarização** descreve — e ele não depende de a pessoa trabalhar pouco, mas de trabalhar sem proteção.`,
      },
      {
        title: 'Exemplo resolvido 2 — quem faz o trabalho invisível',
        body: `**Dado autoral para análise:** em uma pesquisa doméstica hipotética, mulheres dedicam em média 21 horas semanais a afazeres domésticos e cuidados, enquanto homens dedicam 11 horas.

**Leitura sociológica:**

1. São **10 horas semanais de diferença** — cerca de 43 dias de 24 horas por ano.
2. Esse tempo compete diretamente com estudo, trabalho remunerado, qualificação e descanso.
3. O efeito acumulado aparece na renda, na progressão de carreira e no valor da aposentadoria.

**Por que isso é trabalho:** produz valor econômico real — se não fosse feito em casa, precisaria ser comprado no mercado.

**Conclusão que a prova costuma cobrar:** a desigualdade de renda entre homens e mulheres não se explica apenas por salário desigual na mesma função; ela começa na distribuição desigual do tempo.`,
      },
    ],
    mistakes: `**1. Confundir informalidade com trabalho esporádico.**
Boa parte do trabalho informal é diário, longo e contínuo — só que sem proteção.

**2. Tratar direitos trabalhistas como concessão espontânea.**
Foram conquistados por conflito social ao longo de mais de um século.

**3. Ignorar o trabalho de cuidado.**
Ele sustenta a economia remunerada e sua distribuição desigual é parte central da desigualdade de gênero.`,
    selfCheck: [
      'O que muda concretamente na vida de quem trabalha com e sem vínculo formal?',
      'Por que o trabalho de cuidado é considerado trabalho, mesmo sem remuneração?',
      'Qual é a leitura consistente sobre os efeitos da automação no emprego?',
    ],
    questions: [
      q({
        slug: 'q-trab-1',
        stem: 'O modelo de organização do trabalho baseado na cronometragem de tempos e movimentos e na separação entre planejamento e execução é conhecido como:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de modelo produtivo',
        seconds: 70,
        errors: ['confundir taylorismo com toyotismo'],
        correct: 0,
        options: [
          ['Taylorismo.', 'A administração científica de Taylor cronometrava tarefas e separava quem concebe de quem executa.'],
          ['Toyotismo.', 'O toyotismo enfatiza produção sob demanda, estoque mínimo e trabalhador multifuncional.', 'trocar de modelo'],
          ['Cooperativismo.', 'Cooperativismo é forma de propriedade e gestão coletiva, não método de organização fabril.', 'confundir com modelo de propriedade'],
          ['Corporativismo.', 'Corporativismo se refere à relação entre Estado e categorias profissionais.', 'confundir com arranjo político'],
          ['Mercantilismo.', 'Mercantilismo é uma política econômica dos séculos XVI a XVIII.', 'trocar o campo conceitual'],
        ],
        explanation: 'Taylorismo é a administração científica: medir, padronizar e separar concepção de execução.',
      }),
      q({
        slug: 'q-trab-2',
        stem: 'Uma pessoa trabalha diariamente como entregadora por aplicativo, cumpre longas jornadas, arca com combustível e manutenção da moto e não possui contrato de trabalho.\n\nEssa situação caracteriza:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação dos conceitos de informalidade e precarização',
        seconds: 100,
        errors: ['confundir informalidade com falta de trabalho'],
        correct: 2,
        options: [
          ['Desemprego, pois não há vínculo formal com uma empresa.', 'A pessoa trabalha e obtém renda: não está desempregada.', 'confundir informalidade com desemprego'],
          ['Trabalho autônomo plenamente protegido pela legislação.', 'Sem contrato e sem contribuição, a proteção social é frágil.', 'supor proteção inexistente'],
          ['Trabalho informal em condições de precarização, com transferência de custos e riscos ao trabalhador.', 'Há trabalho contínuo e renda, sem contrato, sem proteção previdenciária automática e com os custos operacionais deslocados para quem executa a tarefa.'],
          ['Trabalho voluntário, por não haver subordinação formal.', 'Há remuneração por tarefa, o que descarta voluntariado.', 'confundir com trabalho não remunerado'],
          ['Emprego formal atípico, com direitos equivalentes aos da CLT.', 'A ausência de contrato afasta os direitos previstos na legislação trabalhista.', 'igualar situações distintas'],
        ],
        explanation: 'Precarização não significa trabalhar pouco: significa trabalhar sem estabilidade, previsibilidade e proteção.',
      }),
      q({
        slug: 'q-trab-3',
        stem: 'Uma pesquisa registrou, em determinado país, a média semanal de horas dedicadas a afazeres domésticos e cuidados:\n\n| Grupo | Horas semanais |\n| --- | --- |\n| Mulheres | 21,3 |\n| Homens | 11,0 |\n\nA leitura sociológica adequada desses dados indica que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de dados sobre divisão sexual do trabalho',
        seconds: 130,
        errors: ['tratar a diferença como escolha individual'],
        correct: 4,
        options: [
          ['A diferença resulta de preferências individuais e não tem efeitos sociais relevantes.', 'A diferença é estrutural e afeta renda, carreira e aposentadoria.', 'individualizar padrão estrutural'],
          ['Os dados mostram que o trabalho doméstico é irrelevante para a economia.', 'Trata-se de trabalho que produz valor e sustenta a economia remunerada.', 'desconsiderar o valor do trabalho reprodutivo'],
          ['A diferença desaparece quando as mulheres trabalham fora de casa.', 'Pesquisas indicam acúmulo de jornadas, não substituição.', 'supor efeito não observado'],
          ['O dado só teria sentido se incluísse a renda de cada grupo.', 'O dado de tempo já sustenta a análise sobre divisão do trabalho.', 'exigir informação desnecessária'],
          ['Há uma divisão sexual do trabalho que concentra o trabalho de cuidado nas mulheres, reduzindo seu tempo disponível para trabalho remunerado, estudo e descanso.', 'A diferença de mais de dez horas semanais é sistemática e compete diretamente com atividades que geram renda e qualificação, o que ajuda a explicar desigualdades de carreira e de aposentadoria.'],
        ],
        explanation: 'A divisão sexual do trabalho aparece antes do salário: começa na distribuição desigual do tempo dedicado ao cuidado.',
      }),
      q({
        slug: 'q-trab-4',
        stem: 'Considere duas leituras sobre automação e emprego:\n\nI. A automação destrói postos de trabalho e levará ao desaparecimento do emprego.\nII. A automação sempre gera mais empregos do que elimina, de modo que não há motivo para preocupação.\n\nA avaliação mais consistente dessas leituras é:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'avaliação crítica de duas posições simplificadas',
        seconds: 150,
        errors: ['escolher uma das duas posições extremas'],
        correct: 3,
        options: [
          ['I está correta, pois a tecnologia substitui trabalhadores de forma definitiva.', 'Historicamente, funções desaparecem e outras surgem; o desaparecimento total do emprego não se verificou.', 'aceitar previsão catastrófica'],
          ['II está correta, pois a história mostra que o emprego sempre se recupera.', 'A recuperação agregada convive com perdas concretas para grupos específicos.', 'aceitar otimismo agregado'],
          ['As duas estão corretas em contextos diferentes e se aplicam a países distintos.', 'A limitação das duas leituras não é geográfica: ambas simplificam o mesmo processo.', 'relativizar sem critério'],
          ['Ambas simplificam o processo: a automação elimina e cria ocupações simultaneamente, com efeitos desiguais entre grupos, o que torna a transição um problema de política pública.', 'A questão relevante não é o saldo agregado, e sim quem perde, quem ganha e o que se faz com quem é deslocado — o que envolve qualificação, proteção de renda e regulação.'],
          ['Nenhuma das duas tem relação com o debate sociológico sobre trabalho.', 'As duas são posições recorrentes no debate público sobre o tema.', 'negar a pertinência do debate'],
        ],
        explanation: 'O ponto central não é o saldo total de empregos, e sim a distribuição desigual dos efeitos e o que se faz a respeito.',
      }),
      q({
        slug: 'q-trab-5',
        stem: 'Um município quer reduzir a informalidade entre trabalhadores de serviços e entregas. A equipe técnica avalia diferentes caminhos.\n\nA abordagem mais consistente com a análise sociológica do trabalho é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre diagnóstico sociológico e política pública',
        seconds: 190,
        errors: ['tratar informalidade como escolha individual', 'apostar em solução única'],
        correct: 1,
        options: [
          ['Fiscalizar e multar os trabalhadores que atuam sem registro, o que os incentivaria a formalizar a atividade.', 'Punir quem já está em situação frágil tende a aprofundar a precariedade, sem alterar as causas.', 'punir o elo mais frágil'],
          ['Combinar simplificação do registro e da contribuição, negociação com as empresas que intermediam o serviço, ampliação do acesso à proteção social e monitoramento dos resultados ao longo do tempo.', 'A informalidade tem causas múltiplas — custo e complexidade da formalização, modelo de negócio das plataformas e lacunas de proteção. Uma política eficaz atua nesses três pontos e verifica se os resultados aparecem.'],
          ['Aguardar que o crescimento econômico reduza espontaneamente a informalidade.', 'Períodos de crescimento no Brasil já conviveram com informalidade elevada.', 'esperar solução automática'],
          ['Proibir a atuação de plataformas digitais no município.', 'A proibição elimina renda imediata sem oferecer alternativa, e desloca o problema.', 'trocar política por interdição'],
          ['Realizar campanhas de conscientização sobre a importância da formalização, sem outras medidas.', 'Informação é insuficiente quando o obstáculo é econômico e estrutural.', 'reduzir política a comunicação'],
        ],
        explanation: 'A questão integra diagnóstico sociológico, desenho de política pública e avaliação de resultados — reconhecendo que a informalidade é estrutural, não uma escolha individual.',
      }),
      q({
        slug: 'q-trab-rec-1',
        stem: 'A conquista da jornada de trabalho de oito horas diárias, no século XX, resultou principalmente:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento da origem dos direitos trabalhistas',
        seconds: 70,
        recovery: true,
        errors: ['tratar direitos como concessão espontânea'],
        correct: 2,
        options: [
          ['De uma concessão espontânea dos empregadores diante do avanço tecnológico.', 'A redução de jornada foi objeto de disputa, não de concessão espontânea.', 'atribuir a iniciativa ao empregador'],
          ['De uma exigência técnica das máquinas, que não podiam operar por mais tempo.', 'A limitação não era técnica, e sim social e política.', 'naturalizar uma conquista social'],
          ['Da organização e da mobilização dos trabalhadores, com greves e pressão política ao longo de décadas.', 'Sindicatos, greves e disputa parlamentar sustentaram a redução progressiva da jornada, que depois foi incorporada à legislação.'],
          ['De acordos internacionais firmados antes da industrialização.', 'Os acordos internacionais sobre jornada são posteriores à industrialização.', 'inverter a cronologia'],
          ['Da automação, que reduziu a necessidade de trabalho humano.', 'A automação em larga escala é posterior às primeiras conquistas de jornada.', 'antecipar processo posterior'],
        ],
        explanation: 'Direitos trabalhistas são resultado de conflito social organizado — o que ajuda a entender por que continuam em disputa.',
      }),
    ],
  }),
];

/**
 * Conteúdo autoral de desenvolvimento — Conscious Knowledge.
 * Nenhuma questão foi copiada de prova oficial, livro ou plataforma de terceiros.
 */

export const HUMANAS_TOPICS = [
  {
    slug: 'cidadania-e-direitos',
    name: 'Cidadania e direitos',
    subjectSlug: 'sociologia',
    areaSlug: 'ciencias-humanas',
    summary:
      'Relacionar conceitos sociais, históricos e políticos a situações concretas do cotidiano.',
    difficulty: 'intro',
    estimatedMinutes: 20,
    curationWeight: 94,
    order: 1,
    related: ['urbanizacao-e-desigualdade'],
    skills: [
      {
        slug: 'relacionar-conceitos-a-situacoes-concretas',
        name: 'Relacionar conceitos sociais, históricos e políticos a situações concretas',
        description:
          'Reconhecer, em casos do dia a dia, quais direitos estão em jogo e que mecanismos existem para efetivá-los.',
      },
    ],
    content: [
      {
        slug: 'cidadania-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `Cidadania não é um título que se ganha: é um **conjunto de direitos e deveres que se exerce**.

A divisão clássica (T. H. Marshall) organiza os direitos em três gerações:

| Tipo | O que garante | Exemplos |
| --- | --- | --- |
| **Civis** | liberdade individual perante o Estado e os outros | ir e vir, expressão, propriedade, defesa em juízo |
| **Políticos** | participação nas decisões coletivas | votar, ser votado, se organizar, se manifestar |
| **Sociais** | condições materiais para exercer os demais | saúde, educação, moradia, trabalho, previdência |

O ponto que mais cai em prova: **direito garantido em lei ≠ direito efetivado na prática**. A distância entre os dois é o que a sociologia chama de **cidadania incompleta** ou **regulada**.`,
      },
      {
        slug: 'cidadania-explicacao',
        kind: 'explanation',
        title: 'Do texto legal à efetivação',
        depth: 'standard',
        order: 2,
        body: `### 1. Os três tipos, em situações reais

- **Civil:** ser atendido sem discriminação em um estabelecimento comercial.
- **Político:** participar de uma audiência pública sobre o orçamento do município.
- **Social:** conseguir uma vaga em creche pública perto de casa.

Repare que o direito social é condição para os outros: quem não tem escola, transporte ou informação exerce muito pouco os direitos políticos.

### 2. Por que o Brasil é um caso particular

No percurso europeu descrito por Marshall, os direitos vieram em sequência: civis → políticos → sociais. No Brasil, a ordem foi diferente e desigual.

Direitos sociais foram ampliados em períodos de restrição de direitos políticos — por exemplo, legislação trabalhista concedida sem liberdade sindical plena. Isso deu origem ao conceito de **cidadania regulada**: os direitos chegam vinculados à ocupação formal reconhecida pelo Estado, e não à condição de pessoa.

Consequência prática: quem estava fora do emprego formal — trabalho rural, doméstico, informal — ficava fora do pacote de direitos.

### 3. Universalidade e equidade

- **Universal**: vale para todos, sem seleção prévia. Ex.: atendimento no SUS.
- **Equidade**: tratar de forma diferente quem está em situação diferente, para chegar ao mesmo resultado. Ex.: reserva de vagas, transporte adaptado, atendimento prioritário.

Equidade **não contradiz** universalidade: é o mecanismo que a torna real quando os pontos de partida são desiguais.

### 4. Como cobrar um direito

Existe um caminho institucional concreto: ouvidoria, conselho tutelar, Defensoria Pública, Ministério Público, conselhos setoriais (saúde, educação), órgãos de defesa do consumidor. Questões costumam pedir a identificação do **canal adequado** para o caso apresentado.`,
      },
      {
        slug: 'cidadania-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — classificar o direito em jogo',
        order: 3,
        body: `**Situação:** um grupo de moradores organiza um abaixo-assinado e ocupa a tribuna da câmara municipal para pedir uma linha de ônibus no bairro.

**Que direitos aparecem?**
- **Político:** organizar-se coletivamente e participar de decisão pública. É o direito exercido no ato.
- **Social:** o transporte que eles reivindicam. É o direito buscado como resultado.
- **Civil:** a liberdade de reunião e expressão que torna a ação possível.

**A pergunta típica:** "qual direito está sendo **exercido**?" A resposta é o político — o social é o objetivo, não o meio.

**Cuidado:** confundir o direito exercido com o direito reivindicado é o erro mais comum nesse tipo de questão.`,
      },
      {
        slug: 'cidadania-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — lei que existe, direito que não chega',
        order: 4,
        body: `**Situação:** uma lei garante atendimento prioritário a idosos em repartições públicas. Em uma unidade sem sinalização, sem fila separada e com um único servidor no balcão, idosos esperam o mesmo tempo que os demais.

**Análise:**
- O direito **existe formalmente**: está previsto em lei.
- O direito **não se efetiva**: faltam condições materiais e organizacionais.

**Conceito aplicável:** a distância entre a norma e a prática. A garantia legal é condição necessária, não suficiente.

**O que a questão costuma cobrar:** identificar que o problema não é ausência de lei, e sim ausência de mecanismos de implementação e fiscalização. Alternativas que propõem "criar uma nova lei" costumam estar erradas justamente por isso.`,
      },
      {
        slug: 'cidadania-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Achar que direito social é "favor" ou "benefício".**
Direito social é dever do Estado e obrigação constitucional, não concessão. Alternativas que usam a palavra "benefício" para descrever direito costumam ser distratores.

**2. Confundir universalidade com tratamento idêntico.**
Universal significa que ninguém fica de fora. Para chegar lá quando os pontos de partida são diferentes, é preciso tratamento diferenciado — isso é equidade, não privilégio.

**3. Concluir que a existência da lei resolve o problema.**
A prova quase sempre apresenta um caso em que a lei existe e o direito não chega. A resposta está nos mecanismos de efetivação, não na criação de mais normas.`,
      },
      {
        slug: 'cidadania-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Por que direitos sociais são condição para o exercício efetivo dos direitos políticos?
2. O que a expressão "cidadania regulada" descreve, e por que ela ajuda a entender o caso brasileiro?
3. Dê um exemplo em que tratar pessoas de forma diferente é o que garante igualdade de resultado.`,
      },
    ],
    questions: [
      {
        slug: 'q-cid-1',
        stem:
          'Um município cria um conselho municipal de saúde com participação de usuários, trabalhadores e gestores, com poder de aprovar o plano municipal de saúde.\n\nEsse mecanismo é um exemplo de exercício de qual tipo de direito?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'classificação de direitos',
        estimatedSeconds: 90,
        skillSlug: 'relacionar-conceitos-a-situacoes-concretas',
        likelyErrors: ['confundir o tema com o tipo de direito exercido'],
        options: [
          { label: 'A', text: 'Direito político, pois trata de participação nas decisões públicas.', isCorrect: true, rationale: 'O conselho é um canal de participação na decisão coletiva. Embora o tema seja saúde, o direito exercido no ato é o de participar do poder.' },
          { label: 'B', text: 'Direito social, pois o conselho trata de saúde.', rationale: 'O tema é social, mas o direito exercido é o de participar. Classificar pelo assunto é o erro mais comum aqui.', errorHint: 'classificar pelo tema em vez do exercício' },
          { label: 'C', text: 'Direito civil, pois garante liberdade individual.', rationale: 'Direitos civis protegem a liberdade individual; conselho é ação coletiva de decisão.', errorHint: 'confundir individual com coletivo' },
          { label: 'D', text: 'Não configura direito, apenas prática administrativa.', rationale: 'A participação social em conselhos é prevista como diretriz do sistema de saúde brasileiro.', errorHint: 'reduzir participação a formalidade' },
          { label: 'E', text: 'Direito trabalhista, pois inclui trabalhadores em sua composição.', rationale: 'A presença de trabalhadores é parte da composição, não a natureza do direito exercido.', errorHint: 'classificar pela composição' },
        ],
        explanation: {
          summary: 'O direito exercido é o político; a saúde é o objeto sobre o qual se decide.',
          strategy: 'Pergunte "o que a pessoa está FAZENDO?", não "sobre o que é o assunto?".',
        },
      },
      {
        slug: 'q-cid-2',
        stem:
          'Uma escola pública instala rampas, contrata intérprete de Libras e adapta materiais para estudantes com deficiência. Um morador critica a medida dizendo que "isso é privilégio, porque nem todos recebem esse tratamento".\n\nO argumento do morador desconsidera que:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'equidade x tratamento idêntico',
        estimatedSeconds: 110,
        skillSlug: 'relacionar-conceitos-a-situacoes-concretas',
        likelyErrors: ['confundir equidade com privilégio'],
        options: [
          { label: 'A', text: 'Tratamentos diferenciados podem ser o meio necessário para garantir acesso igual ao mesmo direito.', isCorrect: true, rationale: 'Sem rampa ou intérprete, o direito à educação existe no papel mas não se realiza. A diferenciação corrige a barreira, não cria vantagem.' },
          { label: 'B', text: 'Direitos educacionais são facultativos e dependem da disponibilidade orçamentária.', rationale: 'Educação é direito, não medida facultativa sujeita a conveniência.', errorHint: 'tratar direito como benefício' },
          { label: 'C', text: 'A escola deveria oferecer o mesmo recurso a todos os estudantes indistintamente.', rationale: 'Intérprete de Libras para quem ouve não amplia acesso nenhum; recursos de acessibilidade respondem a barreiras específicas.', errorHint: 'confundir igualdade com uniformidade' },
          { label: 'D', text: 'Estudantes com deficiência deveriam ser atendidos em instituições separadas.', rationale: 'A perspectiva inclusiva prevê acesso à escola comum com os apoios necessários.', errorHint: 'propor segregação como solução' },
          { label: 'E', text: 'A crítica só faria sentido se a escola fosse privada.', rationale: 'A obrigação de acessibilidade não depende da natureza da instituição.', errorHint: 'condicionar o direito à natureza da instituição' },
        ],
        explanation: {
          summary: 'Equidade é o mecanismo que torna a universalidade real quando existem barreiras distintas.',
          conceptRecap: 'Igualdade de tratamento nem sempre produz igualdade de acesso.',
        },
      },
      {
        slug: 'q-cid-3',
        stem:
          'Leia o trecho de um relatório fictício de ouvidoria:\n\n"Em 78% dos municípios visitados existe legislação sobre acessibilidade em prédios públicos. Em 31% deles há orçamento específico previsto. Em 12%, foram encontradas obras executadas nos últimos cinco anos."\n\nOs dados apontam principalmente para:',
        support: 'Relatório fictício criado para este exercício, sem correspondência com documento real.',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'interpretação de dados sobre efetivação de direitos',
        estimatedSeconds: 120,
        skillSlug: 'relacionar-conceitos-a-situacoes-concretas',
        likelyErrors: ['concluir que falta legislação', 'ignorar a cadeia lei-orçamento-execução'],
        options: [
          { label: 'A', text: 'A distância entre a previsão legal e a efetivação, evidenciada pela queda entre lei, orçamento e execução.', isCorrect: true, rationale: 'A sequência 78% → 31% → 12% mostra que a norma existe na maioria, mas orçamento e obra acompanham em proporção muito menor. Esse é o retrato de um direito garantido e não efetivado.' },
          { label: 'B', text: 'A ausência de legislação sobre acessibilidade na maior parte dos municípios.', rationale: 'A legislação existe em 78% — é justamente o item com maior cobertura.', errorHint: 'ler o dado ao contrário' },
          { label: 'C', text: 'A desnecessidade de novas leis, já que o tema está totalmente resolvido.', rationale: 'Apenas 12% executaram obras: o tema está longe de resolvido.', errorHint: 'confundir existência de lei com solução' },
          { label: 'D', text: 'A prioridade dada por gestores municipais ao tema da acessibilidade.', rationale: 'Prioridade se mede em orçamento e execução, e ambos são baixos.', errorHint: 'inferir intenção a partir da norma' },
          { label: 'E', text: 'O excesso de recursos orçamentários destinados a acessibilidade.', rationale: 'Só 31% preveem orçamento específico — o oposto de excesso.', errorHint: 'inverter a leitura do dado' },
        ],
        explanation: {
          summary: 'A queda ao longo da cadeia lei → orçamento → execução é a medida da não efetivação.',
          strategy: 'Quando houver três dados em sequência decrescente, a pergunta costuma ser sobre onde o processo trava.',
        },
      },
      {
        slug: 'q-cid-4',
        stem:
          'Considere duas afirmações sobre o conceito de cidadania regulada:\n\nI. Descreve uma situação em que os direitos são vinculados à ocupação profissional reconhecida pelo Estado.\nII. Significa que todos os trabalhadores brasileiros sempre tiveram os mesmos direitos garantidos.\n\nÉ correto o que se afirma em:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'comparação entre definição correta e generalização',
        estimatedSeconds: 130,
        skillSlug: 'relacionar-conceitos-a-situacoes-concretas',
        likelyErrors: ['aceitar generalização', 'rejeitar a definição correta'],
        options: [
          { label: 'A', text: 'I, apenas.', isCorrect: true, rationale: 'A cidadania regulada define direitos a partir da inserção em ocupação formalmente reconhecida — o que, por definição, deixava de fora trabalhadores rurais, domésticos e informais. II afirma o contrário disso.' },
          { label: 'B', text: 'II, apenas.', rationale: 'II é justamente o que o conceito nega: a cobertura era desigual e condicionada.', errorHint: 'inverter o sentido do conceito' },
          { label: 'C', text: 'I e II.', rationale: 'I está correta, mas II a contradiz: se os direitos são vinculados à ocupação reconhecida, não são universais.', errorHint: 'não perceber a contradição entre as afirmações' },
          { label: 'D', text: 'Nenhuma das duas.', rationale: 'I descreve o conceito com precisão.', errorHint: 'excesso de cautela' },
          { label: 'E', text: 'I e II, desde que consideradas apenas as décadas recentes.', rationale: 'Nenhum recorte temporal torna II compatível com o conceito.', errorHint: 'salvar a afirmação com condição artificial' },
        ],
        explanation: {
          summary: 'O conceito descreve exatamente a **exclusão** de quem estava fora do emprego formal reconhecido.',
          detailed: 'Trabalhadores rurais e domésticos só tiveram equiparação plena de direitos décadas depois da legislação trabalhista urbana — o que ilustra concretamente o conceito.',
        },
      },
      {
        slug: 'q-cid-5',
        stem:
          'Uma comunidade rural sem transporte escolar regular tem 40% de seus adolescentes fora da escola. A prefeitura responde criando uma campanha de conscientização sobre a importância dos estudos.\n\nA principal limitação dessa resposta é:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre direitos sociais, condições materiais e política pública',
        estimatedSeconds: 150,
        skillSlug: 'relacionar-conceitos-a-situacoes-concretas',
        likelyErrors: ['culpabilizar as famílias', 'considerar a campanha suficiente'],
        options: [
          { label: 'A', text: 'A medida trata como problema de informação uma barreira que é material, deixando a causa apontada pelos dados sem resposta.', isCorrect: true, rationale: 'O dado apresentado aponta ausência de transporte. Campanha informativa não move ninguém até a escola: a política precisa remover a barreira concreta identificada.' },
          { label: 'B', text: 'Campanhas de conscientização são sempre ineficazes em qualquer contexto.', rationale: 'Campanhas funcionam quando o obstáculo é de fato informacional. O problema é a inadequação ao caso, não a ferramenta em si.', errorHint: 'generalizar a crítica' },
          { label: 'C', text: 'A responsabilidade pela frequência escolar é exclusiva das famílias.', rationale: 'A garantia de acesso à educação básica envolve o poder público, inclusive quanto ao transporte escolar.', errorHint: 'transferir responsabilidade ao indivíduo' },
          { label: 'D', text: 'O percentual de 40% é baixo demais para justificar qualquer política pública.', rationale: 'Quatro em cada dez adolescentes fora da escola é indicador grave por qualquer critério.', errorHint: 'minimizar o dado' },
          { label: 'E', text: 'A solução correta seria transferir os estudantes para escolas particulares.', rationale: 'A solução não enfrenta a barreira de deslocamento e desloca a obrigação do poder público.', errorHint: 'propor solução que ignora a causa' },
        ],
        explanation: {
          summary: 'A política precisa responder à barreira identificada pelos dados — no caso, deslocamento, não desinformação.',
          detailed: 'Esta questão integra três ideias: direito social exige condições materiais; política pública deve endereçar a causa diagnosticada; e responsabilizar o indivíduo por barreira estrutural desloca o problema em vez de resolvê-lo.',
          conceptRecap: 'Diagnóstico errado produz política ineficaz mesmo com boa intenção.',
        },
      },
      {
        slug: 'q-cid-rec-1',
        stem: 'O direito de votar e ser votado pertence a qual categoria de direitos?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'classificação direta',
        estimatedSeconds: 60,
        isRecovery: true,
        skillSlug: 'relacionar-conceitos-a-situacoes-concretas',
        likelyErrors: ['confundir civil com político'],
        options: [
          { label: 'A', text: 'Direitos políticos.', isCorrect: true, rationale: 'Direitos políticos tratam da participação no poder, e votar é a forma mais direta dessa participação.' },
          { label: 'B', text: 'Direitos civis.', rationale: 'Direitos civis protegem liberdades individuais como ir e vir, expressão e propriedade.', errorHint: 'confundir liberdade individual com participação política' },
          { label: 'C', text: 'Direitos sociais.', rationale: 'Direitos sociais garantem condições materiais como saúde e educação.', errorHint: 'confundir categorias' },
          { label: 'D', text: 'Direitos trabalhistas.', rationale: 'Direitos trabalhistas são um subconjunto dos sociais e não tratam de participação eleitoral.', errorHint: 'usar categoria específica demais' },
          { label: 'E', text: 'Não é um direito, mas um dever obrigatório.', rationale: 'No Brasil o voto é obrigatório para parte da população, mas isso não retira sua natureza de direito.', errorHint: 'confundir obrigatoriedade com ausência de direito' },
        ],
        explanation: { summary: 'Votar e ser votado são a expressão central dos direitos políticos.' },
      },
      {
        slug: 'q-cid-rec-2',
        stem:
          'Uma lei garante o direito a atendimento prioritário, mas a unidade não possui sinalização nem organização de fila que o viabilize.\n\nEssa situação ilustra:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'norma x efetivação',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'relacionar-conceitos-a-situacoes-concretas',
        likelyErrors: ['propor nova lei como solução'],
        options: [
          { label: 'A', text: 'A diferença entre direito previsto em lei e direito efetivado na prática.', isCorrect: true, rationale: 'A norma existe; faltam os meios de implementação. Essa distância é exatamente o que o conceito descreve.' },
          { label: 'B', text: 'A inexistência de legislação sobre o tema.', rationale: 'O enunciado afirma que a lei existe.', errorHint: 'contrariar o enunciado' },
          { label: 'C', text: 'A necessidade de revogar a lei por ser inaplicável.', rationale: 'A lei não é inaplicável: faltam condições de aplicação, que podem ser criadas.', errorHint: 'confundir falta de meio com impossibilidade' },
          { label: 'D', text: 'O excesso de direitos garantidos à população.', rationale: 'O problema apontado é de implementação, não de quantidade de direitos.', errorHint: 'deslocar o problema' },
          { label: 'E', text: 'Uma escolha legítima da unidade quanto ao seu funcionamento.', rationale: 'Descumprir norma de prioridade não é escolha administrativa legítima.', errorHint: 'legitimar descumprimento' },
        ],
        explanation: { summary: 'Direito garantido e direito efetivado são coisas distintas — e a segunda depende de meios concretos.' },
      },
    ],
  },

  {
    slug: 'urbanizacao-e-desigualdade',
    name: 'Urbanização e desigualdade',
    subjectSlug: 'geografia',
    areaSlug: 'ciencias-humanas',
    summary:
      'Interpretar fenômenos espaciais, sociais e econômicos das cidades brasileiras e suas desigualdades internas.',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    curationWeight: 90,
    order: 2,
    prerequisites: ['cidadania-e-direitos'],
    related: ['meio-ambiente-e-sociedade'],
    skills: [
      {
        slug: 'interpretar-fenomenos-espaciais-sociais-economicos',
        name: 'Interpretar fenômenos espaciais, sociais e econômicos',
        description:
          'Relacionar processos de urbanização, segregação socioespacial e acesso desigual a serviços urbanos.',
      },
    ],
    content: [
      {
        slug: 'urbanizacao-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `A urbanização brasileira foi **rápida, tardia e concentrada**: em cerca de 40 anos (1950–1990) o país passou de majoritariamente rural a mais de 80% urbano.

Rápida demais para que infraestrutura, moradia e emprego formal acompanhassem. O resultado tem nome:

- **Periferização**: quem tem menos renda mora longe do trabalho e dos serviços.
- **Segregação socioespacial**: a desigualdade social vira desigualdade de endereço.
- **Especulação imobiliária**: terrenos vazios em áreas com infraestrutura, ocupação em áreas de risco.
- **Metropolização**: a cidade real ultrapassa o limite do município.

O conceito que amarra tudo: **direito à cidade** — não é só ter uma casa, é ter acesso ao que a cidade oferece.`,
      },
      {
        slug: 'urbanizacao-explicacao',
        kind: 'explanation',
        title: 'Como a desigualdade vira geografia',
        depth: 'standard',
        order: 2,
        body: `### 1. O motor do processo

Duas forças agiram juntas a partir dos anos 1950:

- **Expulsão do campo**: mecanização agrícola e concentração fundiária reduziram a necessidade de mão de obra rural.
- **Atração urbana**: industrialização concentrada no Sudeste oferecia emprego e serviços.

O saldo foi um deslocamento massivo em poucas décadas — sem política habitacional na mesma escala.

### 2. Onde as pessoas foram morar

Quem chegava não conseguia pagar pelo solo urbano central, já valorizado. Restaram três caminhos:

- áreas distantes, sem infraestrutura;
- áreas de risco (encostas, várzeas), desprezadas pelo mercado justamente por serem perigosas;
- moradia precária em áreas centrais degradadas.

Isso não é desorganização: é o resultado previsível de um mercado de terras sem regulação e sem oferta pública de moradia.

### 3. O custo cotidiano da distância

A periferização cobra em tempo e dinheiro:
- deslocamentos longos reduzem horas de estudo, descanso e convívio;
- o transporte consome parcela relevante da renda;
- serviços públicos (saúde, escola, cultura) concentram-se onde a renda está.

Por isso o **direito à cidade** é mais amplo que o direito à moradia: incluir alguém na cidade significa dar acesso a transporte, trabalho, serviço e espaço público — não apenas um teto.

### 4. Metropolização e gestão

Uma região metropolitana funciona como uma cidade só: as pessoas dormem em um município, trabalham em outro, usam hospital em um terceiro. Mas cada município tem orçamento e gestão próprios.

Esse descompasso entre a **cidade real** e a **cidade administrativa** explica boa parte dos impasses em transporte, saneamento e resíduos — e é tema frequente de prova.

### 5. Gentrificação

Quando uma área periférica ou degradada recebe investimento, o valor do solo sobe e a população original é deslocada por preço. O bairro "melhora" e as pessoas que ali moravam não usufruem da melhoria. Requalificar sem deslocar exige política habitacional explícita.`,
      },
      {
        slug: 'urbanizacao-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — ler um indicador urbano',
        order: 3,
        body: `**Dados de uma cidade fictícia:**

| Região | População | Tempo médio de deslocamento | Domicílios com esgoto |
| --- | --- | --- | --- |
| Central | 120.000 | 22 min | 96% |
| Periférica | 380.000 | 68 min | 41% |

**Leitura:**
- A maioria da população (76%) está na região com pior infraestrutura.
- O tempo de deslocamento é 3 vezes maior.
- A cobertura de esgoto é menos da metade.

**Conclusão sustentada:** existe segregação socioespacial — a desigualdade de renda se materializa em desigualdade de acesso por localização.

**Conclusão NÃO sustentada:** "a periferia foi mal planejada". Os dados mostram o resultado, não a causa. A explicação exige informação sobre política habitacional, mercado de terras e histórico de ocupação.`,
      },
      {
        slug: 'urbanizacao-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — requalificação e deslocamento',
        order: 4,
        body: `**Situação:** um bairro recebe nova estação de metrô, praças e iluminação. Em cinco anos, o aluguel médio triplica e 40% dos moradores antigos se mudam.

**O que aconteceu:**
- O investimento público aumentou a **atratividade** do bairro.
- A valorização do solo elevou aluguel e IPTU.
- Quem alugava e tinha renda menor não conseguiu permanecer.

**Nome do processo:** gentrificação.

**O ponto central:** a melhoria urbana é real, mas foi capturada por quem chegou depois. Sem instrumentos de permanência — aluguel social, cota de habitação de interesse social, controle de uso do solo — a requalificação desloca em vez de incluir.

**Erro comum:** concluir que "não se deve investir em bairros pobres". A conclusão correta é que investir exige política de permanência simultânea.`,
      },
      {
        slug: 'urbanizacao-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Tratar a ocupação de áreas de risco como escolha individual.**
Ninguém prefere morar em encosta instável. A ocupação acontece porque as áreas seguras estão precificadas acima da renda disponível.

**2. Confundir crescimento urbano com desenvolvimento urbano.**
Crescer é aumentar população e área construída. Desenvolver é ampliar acesso a serviços, trabalho e espaço público. Uma cidade pode crescer e piorar.

**3. Explicar a periferização apenas por migração.**
A migração explica o volume. A **localização** de quem chegou é explicada pelo preço da terra e pela ausência de política habitacional.`,
      },
      {
        slug: 'urbanizacao-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Por que o direito à cidade é mais amplo que o direito à moradia?
2. Como a especulação imobiliária ajuda a explicar terrenos vazios em áreas com infraestrutura e ocupação em áreas de risco?
3. O que precisaria acompanhar um investimento urbano para que ele não deslocasse a população original?`,
      },
    ],
    questions: [
      {
        slug: 'q-urb-1',
        stem:
          'A urbanização brasileira, entre 1950 e 1990, caracterizou-se por ser acelerada e não acompanhada, na mesma proporção, por oferta de moradia adequada e infraestrutura.\n\nUma consequência direta desse descompasso foi:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'relação causa-consequência em processo histórico',
        estimatedSeconds: 90,
        skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos',
        likelyErrors: ['confundir consequência com causa'],
        options: [
          { label: 'A', text: 'A expansão de assentamentos precários e a ocupação de áreas periféricas e de risco.', isCorrect: true, rationale: 'Sem oferta de moradia acessível na velocidade da chegada, a ocupação se deu onde o solo era barato ou desprezado pelo mercado: periferias distantes e áreas de risco.' },
          { label: 'B', text: 'A redução da população urbana em favor do retorno ao campo.', rationale: 'O movimento foi o oposto: a população urbana cresceu de forma acentuada no período.', errorHint: 'inverter o sentido do processo' },
          { label: 'C', text: 'A equalização das condições de moradia entre as regiões das cidades.', rationale: 'O período aprofundou, e não reduziu, as diferenças internas das cidades.', errorHint: 'assumir efeito equalizador' },
          { label: 'D', text: 'A eliminação da especulação imobiliária nas áreas centrais.', rationale: 'A valorização das áreas centrais é justamente um dos motores do processo descrito.', errorHint: 'inverter o papel do mercado de terras' },
          { label: 'E', text: 'A concentração exclusiva do crescimento em cidades de pequeno porte.', rationale: 'O crescimento concentrou-se sobretudo em grandes cidades e regiões metropolitanas.', errorHint: 'errar a escala do fenômeno' },
        ],
        explanation: {
          summary: 'Chegada rápida sem oferta de moradia acessível produz ocupação periférica e precária.',
          conceptRecap: 'A localização da moradia popular é determinada pelo preço da terra, não por preferência.',
        },
      },
      {
        slug: 'q-urb-2',
        stem:
          'Em uma região metropolitana, um município concentra os empregos e outro concentra a moradia dos trabalhadores. O município-dormitório arrecada pouco e precisa manter escolas e postos de saúde para uma população que trabalha fora.\n\nEsse quadro evidencia:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'gestão metropolitana e financiamento público',
        estimatedSeconds: 120,
        skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos',
        likelyErrors: ['culpar a gestão local isoladamente'],
        options: [
          { label: 'A', text: 'O descompasso entre a cidade real, que é metropolitana, e a gestão administrativa, que é municipal.', isCorrect: true, rationale: 'As pessoas vivem uma cidade única que atravessa fronteiras municipais, enquanto orçamento e responsabilidade seguem divididos por município. Daí o desequilíbrio entre onde se arrecada e onde se gasta.' },
          { label: 'B', text: 'A má administração exclusiva do município-dormitório.', rationale: 'O problema é estrutural: mesmo uma gestão eficiente enfrenta o descompasso entre base tributária e demanda por serviços.', errorHint: 'reduzir problema estrutural a gestão' },
          { label: 'C', text: 'A ausência de população economicamente ativa no município-dormitório.', rationale: 'A população é ativa: ela apenas trabalha em outro município.', errorHint: 'confundir local de trabalho com inatividade' },
          { label: 'D', text: 'A desnecessidade de políticas integradas entre municípios vizinhos.', rationale: 'O quadro demonstra exatamente a necessidade dessas políticas.', errorHint: 'inverter a conclusão' },
          { label: 'E', text: 'A superioridade do modelo de cidades isoladas sobre regiões metropolitanas.', rationale: 'O texto descreve um desafio de gestão, não uma comparação entre modelos.', errorHint: 'extrapolar juízo de valor' },
        ],
        explanation: {
          summary: 'A cidade funcional ultrapassa o limite administrativo, e o financiamento público não acompanha.',
          detailed: 'Consórcios intermunicipais e mecanismos de repartição de receita existem justamente para enfrentar esse descompasso.',
        },
      },
      {
        slug: 'q-urb-3',
        stem:
          'Observe os dados de uma cidade fictícia:\n\n| Indicador | Zona A | Zona B |\n| --- | --- | --- |\n| Renda média domiciliar | 6,2 salários mínimos | 1,8 salário mínimo |\n| Tempo médio até o trabalho | 24 min | 71 min |\n| Áreas verdes por habitante | 14 m² | 2 m² |\n\nA leitura mais adequada desses dados é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'leitura de indicadores socioespaciais',
        estimatedSeconds: 130,
        skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos',
        likelyErrors: ['afirmar causalidade direta', 'ignorar a dimensão espacial'],
        options: [
          { label: 'A', text: 'A desigualdade de renda se manifesta também em acesso desigual a tempo e a espaço público, caracterizando segregação socioespacial.', isCorrect: true, rationale: 'Os três indicadores se alinham: menor renda coincide com maior tempo de deslocamento e menos área verde. A desigualdade social aparece inscrita no território.' },
          { label: 'B', text: 'A renda mais baixa da Zona B é causada pela menor quantidade de áreas verdes.', rationale: 'Área verde não determina renda. Os indicadores estão associados, não em relação causal direta nessa direção.', errorHint: 'inverter causa e efeito' },
          { label: 'C', text: 'Os dados não permitem qualquer comparação, pois medem coisas diferentes.', rationale: 'Justamente por medirem dimensões diferentes é que revelam o alinhamento entre elas.', errorHint: 'recusar leitura possível' },
          { label: 'D', text: 'A Zona A é mais populosa, o que explica seu melhor desempenho nos indicadores.', rationale: 'Os dados não informam população, e dois dos três indicadores são médias ou razões per capita.', errorHint: 'inventar dado ausente' },
          { label: 'E', text: 'O tempo de deslocamento é uma escolha individual dos moradores da Zona B.', rationale: 'Morar longe do trabalho decorre do preço do solo, não de preferência por deslocamento longo.', errorHint: 'individualizar causa estrutural' },
        ],
        explanation: {
          summary: 'Renda, tempo e espaço público variam juntos — é assim que a desigualdade se inscreve no território.',
          conceptRecap: 'Segregação socioespacial: a posição social vira posição geográfica.',
        },
      },
      {
        slug: 'q-urb-4',
        stem:
          'Dois programas urbanos foram propostos para um bairro periférico:\n\nI. Construção de uma linha de transporte rápido ligando o bairro ao centro.\nII. Construção da mesma linha, acompanhada de reserva de área para habitação de interesse social e limite de valorização do IPTU por período determinado.\n\nA diferença central entre as propostas é que:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'comparação entre políticas urbanas',
        estimatedSeconds: 150,
        skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos',
        likelyErrors: ['achar que a segunda é apenas mais cara', 'ignorar a gentrificação'],
        options: [
          { label: 'A', text: 'A segunda prevê mecanismos de permanência, reduzindo o risco de que a valorização desloque a população que se pretende beneficiar.', isCorrect: true, rationale: 'Melhoria urbana valoriza o solo. Sem instrumentos de permanência, o ganho é capturado por quem chega depois e a população original é deslocada por preço.' },
          { label: 'B', text: 'A primeira beneficia mais moradores, por concentrar recursos no transporte.', rationale: 'Beneficia enquanto os moradores permanecerem; sem política de permanência, parte deles não permanece.', errorHint: 'medir benefício sem considerar o deslocamento' },
          { label: 'C', text: 'A segunda impede a valorização do bairro, o que prejudica o investimento.', rationale: 'Limitar a valorização por período não impede o investimento nem a melhoria: apenas modera a captura do ganho.', errorHint: 'confundir moderação com impedimento' },
          { label: 'D', text: 'Não há diferença prática: transporte é o fator determinante nos dois casos.', rationale: 'Os efeitos sobre quem permanece no bairro são substancialmente diferentes.', errorHint: 'ignorar efeitos distributivos' },
          { label: 'E', text: 'A primeira é preferível por não interferir no mercado imobiliário.', rationale: 'Investimento público em transporte já interfere fortemente no mercado imobiliário — a questão é se essa interferência será regulada ou não.', errorHint: 'supor neutralidade do investimento público' },
        ],
        explanation: {
          summary: 'Sem instrumentos de permanência, requalificação urbana tende a gentrificar.',
          detailed: 'Reserva de área para habitação de interesse social e moderação temporária da carga tributária são exemplos de instrumentos previstos no arcabouço urbanístico brasileiro para enfrentar esse efeito.',
        },
      },
      {
        slug: 'q-urb-5',
        stem:
          'Uma cidade registra ocupações recorrentes em encostas com risco de deslizamento. Ao mesmo tempo, 18% dos lotes com infraestrutura completa em áreas centrais estão vazios há mais de dez anos.\n\nA análise que melhor articula os dois fatos é:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre mercado de terras, risco e política urbana',
        estimatedSeconds: 160,
        skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos',
        likelyErrors: ['tratar os dois fatos como independentes', 'culpar os ocupantes'],
        options: [
          { label: 'A', text: 'Os dois fatos são faces do mesmo processo: a retenção especulativa de terra bem localizada eleva o preço e empurra a ocupação para áreas de risco.', isCorrect: true, rationale: 'Lotes vazios com infraestrutura são mantidos à espera de valorização. Isso reduz a oferta efetiva de solo urbanizado, eleva o preço e desloca quem não pode pagar para áreas desprezadas pelo mercado — exatamente as de risco.' },
          { label: 'B', text: 'São fenômenos independentes: um decorre da geografia e o outro do mercado.', rationale: 'A geografia define onde há encosta; o mercado define quem acaba morando lá. Os dois se articulam.', errorHint: 'separar fatos conectados' },
          { label: 'C', text: 'A ocupação de encostas decorre da preferência dos moradores por áreas com vista e menor movimento.', rationale: 'Risco de deslizamento não é atributo desejado; a ocupação decorre de ausência de alternativa acessível.', errorHint: 'individualizar causa estrutural' },
          { label: 'D', text: 'A solução adequada seria remover as ocupações sem qualquer contrapartida habitacional.', rationale: 'Remoção sem alternativa transfere o problema de lugar e costuma gerar nova ocupação de risco.', errorHint: 'propor solução que reproduz a causa' },
          { label: 'E', text: 'Os lotes vazios devem permanecer assim para preservar o valor do solo urbano.', rationale: 'Preservar o valor do solo é justamente o interesse que sustenta a retenção — e o que a política urbana busca moderar em nome da função social da propriedade.', errorHint: 'confundir interesse privado com interesse público' },
        ],
        explanation: {
          summary: 'Terra vazia bem localizada e ocupação em área de risco são dois efeitos do mesmo mercado de terras.',
          detailed: 'Instrumentos como parcelamento compulsório e IPTU progressivo no tempo existem para enfrentar a retenção especulativa, aumentando a oferta de solo urbanizado.',
          conceptRecap: 'Função social da propriedade: o solo urbano com infraestrutura deve cumprir uso, não apenas valorizar.',
        },
      },
      {
        slug: 'q-urb-rec-1',
        stem: 'O termo "periferização" descreve principalmente:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'definição conceitual',
        estimatedSeconds: 70,
        isRecovery: true,
        skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos',
        likelyErrors: ['confundir com crescimento populacional'],
        options: [
          { label: 'A', text: 'O deslocamento da população de menor renda para áreas distantes e menos servidas de infraestrutura.', isCorrect: true, rationale: 'O conceito descreve a relação entre renda e localização: quem tem menos renda ocupa a terra mais barata, que é a mais distante e menos equipada.' },
          { label: 'B', text: 'O crescimento populacional das cidades em geral.', rationale: 'Crescimento populacional é urbanização; periferização é a distribuição desigual dentro da cidade.', errorHint: 'confundir volume com distribuição' },
          { label: 'C', text: 'A construção de novos centros comerciais fora do centro histórico.', rationale: 'Isso descreve descentralização de atividades, não a distribuição da moradia por renda.', errorHint: 'confundir com descentralização econômica' },
          { label: 'D', text: 'A migração de moradores urbanos para o campo.', rationale: 'É o movimento inverso ao descrito pelo conceito.', errorHint: 'inverter o sentido' },
          { label: 'E', text: 'A valorização dos imóveis das áreas mais afastadas.', rationale: 'A periferização decorre justamente do preço mais baixo dessas áreas.', errorHint: 'inverter a lógica de preço' },
        ],
        explanation: { summary: 'Periferização liga renda baixa a localização distante e mal servida.' },
      },
      {
        slug: 'q-urb-rec-2',
        stem:
          'Após a instalação de equipamentos públicos em um bairro popular, o aluguel médio sobe fortemente e parte dos moradores antigos precisa se mudar.\n\nEsse processo é conhecido como:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'identificação de processo urbano',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos',
        likelyErrors: ['confundir com periferização'],
        options: [
          { label: 'A', text: 'Gentrificação.', isCorrect: true, rationale: 'Gentrificação é a valorização de uma área que resulta na substituição da população original por moradores de renda mais alta.' },
          { label: 'B', text: 'Periferização.', rationale: 'Periferização descreve o deslocamento para áreas distantes; aqui o foco é a valorização de uma área já ocupada.', errorHint: 'confundir dois processos relacionados' },
          { label: 'C', text: 'Metropolização.', rationale: 'Metropolização é a integração funcional entre municípios vizinhos.', errorHint: 'trocar de escala' },
          { label: 'D', text: 'Conurbação.', rationale: 'Conurbação é a junção física de manchas urbanas de municípios diferentes.', errorHint: 'confundir com fenômeno físico' },
          { label: 'E', text: 'Êxodo rural.', rationale: 'Êxodo rural é a saída da população do campo para a cidade.', errorHint: 'trocar de fenômeno' },
        ],
        explanation: {
          summary: 'Melhoria urbana sem política de permanência tende a substituir a população do bairro.',
        },
      },
    ],
  },
  {
    slug: 'meio-ambiente-e-sociedade',
    name: 'Meio ambiente e sociedade',
    subjectSlug: 'geografia',
    areaSlug: 'ciencias-humanas',
    summary:
      'Analisar impactos, conflitos, políticas e formas de uso do território a partir de casos concretos.',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    curationWeight: 88,
    order: 3,
    prerequisites: ['urbanizacao-e-desigualdade'],
    skills: [
      {
        slug: 'analisar-impactos-conflitos-e-uso-do-territorio',
        name: 'Analisar impactos, conflitos, políticas e formas de uso do território',
        description:
          'Identificar interesses em disputa, distribuição desigual de custos ambientais e instrumentos de política pública.',
      },
    ],
    content: [
      {
        slug: 'ambiente-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `Questão ambiental **é questão social**: quem causa o impacto e quem paga por ele raramente são as mesmas pessoas.

Três ideias que resolvem a maioria das questões:

- **Justiça ambiental**: os custos ambientais (poluição, risco, escassez) se concentram sobre populações de menor renda e grupos vulnerabilizados.
- **Externalidade**: custo produzido por uma atividade e pago por terceiros — a fábrica lucra, o rio recebe o efluente, a comunidade adoece.
- **Desenvolvimento sustentável**: atender necessidades presentes sem comprometer a capacidade das gerações futuras. Envolve três dimensões — ambiental, social e econômica — em tensão real, não em harmonia automática.

Cuidado com a resposta fácil: culpar "o consumidor" por um problema estrutural costuma ser distrator.`,
      },
      {
        slug: 'ambiente-explicacao',
        kind: 'explanation',
        title: 'Conflitos, custos e instrumentos',
        depth: 'standard',
        order: 2,
        body: `### 1. Quem paga a conta ambiental

Um aterro, uma termelétrica ou um polo industrial precisa ficar em algum lugar. Historicamente, esse lugar é onde a resistência é menor: áreas de menor renda, com menos acesso a informação técnica e representação política.

O resultado é que os **benefícios** (energia, emprego, produto) se distribuem amplamente, enquanto os **custos** (poluição, ruído, risco) se concentram localmente. Essa assimetria é o objeto da **justiça ambiental**.

### 2. Externalidades e internalização

Uma **externalidade negativa** é um custo que não aparece no preço do produto. Se o efluente é lançado sem tratamento, o custo existe — mas é pago pela comunidade em saúde e pela perda do rio.

**Internalizar** significa fazer esse custo voltar para quem o produz: licenciamento com condicionantes, taxação, obrigação de tratamento, responsabilização por dano. Não é punição: é correção de preço.

### 3. Conflitos de uso do território

O mesmo espaço costuma ser disputado por usos incompatíveis:
- agricultura x conservação;
- mineração x território tradicional;
- expansão urbana x área de proteção de manancial;
- turismo x modo de vida local.

Em prova, a pergunta raramente é "quem está certo". É **identificar os interesses em jogo** e **que instrumento poderia mediar** o conflito: zoneamento, licenciamento, unidade de conservação, consulta às comunidades afetadas.

### 4. Escalas do problema

- **Local**: contaminação de um córrego, ocupação de encosta.
- **Regional**: bacia hidrográfica compartilhada por vários municípios.
- **Global**: mudanças climáticas, camada de ozônio.

Um erro comum é aplicar solução de uma escala a problema de outra. Reciclagem doméstica é ação local relevante — mas não substitui regulação industrial nem matriz energética.

### 5. Responsabilidade diferenciada

Em problemas globais, países e grupos contribuíram de forma desigual para o problema e têm capacidades desiguais de resposta. Daí o princípio das **responsabilidades comuns porém diferenciadas**: todos participam, mas não na mesma proporção.`,
      },
      {
        slug: 'ambiente-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — identificar a externalidade',
        order: 3,
        body: `**Situação:** uma indústria reduz custos ao não tratar o efluente. O rio a jusante perde a pesca, e a comunidade ribeirinha registra aumento de doenças de veiculação hídrica.

**Análise em três passos:**

1. **Quem ganha:** a indústria, que reduz custo de produção.
2. **Quem paga:** a comunidade, em saúde, e os pescadores, em renda.
3. **O custo desapareceu?** Não. Ele apenas saiu da planilha da empresa e entrou na vida de terceiros.

**Nome:** externalidade negativa.

**Instrumento de correção:** exigência de tratamento como condicionante de licença, com fiscalização e responsabilização por dano — de modo que o custo volte a quem o gera.

**Erro comum:** propor "conscientização da comunidade" como solução. A comunidade não é a origem do problema.`,
      },
      {
        slug: 'ambiente-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — conflito de uso',
        order: 4,
        body: `**Situação:** um município quer autorizar loteamentos em área de proteção de manancial, alegando déficit habitacional. A companhia de água alerta para risco de contaminação do reservatório que abastece 300 mil pessoas.

**Interesses em jogo:**
- Necessidade real de moradia (direito social).
- Segurança hídrica de uma população maior (direito difuso).
- Interesse imobiliário na valorização da área.

**Por que a resposta não é simples:** os dois primeiros são direitos legítimos. Reduzir o caso a "meio ambiente x pessoas" é falso — as 300 mil pessoas abastecidas também são pessoas.

**Instrumentos de mediação:** zoneamento que direcione a expansão habitacional para áreas adequadas; produção de habitação de interesse social fora da área de manancial; regularização com restrição de densidade onde já há ocupação consolidada.

**O que a prova cobra:** reconhecer que existe conflito entre direitos e que o instrumento adequado é o planejamento territorial, não a escolha entre "desenvolvimento" e "preservação".`,
      },
      {
        slug: 'ambiente-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Reduzir a questão ambiental a comportamento individual.**
Consumo consciente importa, mas problemas estruturais exigem regulação, infraestrutura e política pública. Alternativas que atribuem a solução exclusivamente ao indivíduo costumam ser distratores.

**2. Opor "meio ambiente" a "pessoas".**
Populações atingidas por degradação são pessoas. A disputa real costuma ser entre grupos com interesses diferentes, não entre natureza e humanidade.

**3. Aplicar solução na escala errada.**
Separar o lixo em casa não resolve destinação industrial de resíduos perigosos. Verifique se a escala da solução corresponde à escala do problema.`,
      },
      {
        slug: 'ambiente-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. O que significa dizer que uma empresa "externalizou" um custo ambiental?
2. Por que a distribuição dos danos ambientais costuma coincidir com a distribuição da renda?
3. Dê um exemplo em que dois direitos legítimos entram em conflito no uso do território.`,
      },
    ],
    questions: [
      {
        slug: 'q-amb-1',
        stem:
          'Uma fábrica lança efluentes não tratados em um córrego. Moradores a jusante relatam perda da pesca e aumento de problemas de saúde.\n\nEm análise econômica e ambiental, o custo suportado pelos moradores é denominado:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'aplicação de conceito',
        estimatedSeconds: 90,
        skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio',
        likelyErrors: ['confundir com custo de produção'],
        options: [
          { label: 'A', text: 'Externalidade negativa.', isCorrect: true, rationale: 'É um custo real gerado pela atividade produtiva, mas suportado por terceiros que não participam da decisão nem do lucro.' },
          { label: 'B', text: 'Custo de produção.', rationale: 'Custo de produção é o que a empresa efetivamente paga. Aqui, o custo foi transferido para fora da empresa.', errorHint: 'confundir custo interno com externo' },
          { label: 'C', text: 'Subsídio ambiental.', rationale: 'Subsídio é transferência deliberada de recursos públicos, o que não descreve a situação.', errorHint: 'trocar de conceito econômico' },
          { label: 'D', text: 'Compensação ambiental.', rationale: 'Compensação é a medida que repara ou contrabalança o dano — aqui ela está ausente.', errorHint: 'confundir dano com reparação' },
          { label: 'E', text: 'Depreciação de capital.', rationale: 'Depreciação refere-se à perda de valor de bens da própria empresa.', errorHint: 'usar termo contábil não relacionado' },
        ],
        explanation: {
          summary: 'O custo não desapareceu: saiu da planilha da empresa e recaiu sobre a comunidade.',
          conceptRecap: 'Internalizar a externalidade é fazer o custo voltar a quem o produz.',
        },
      },
      {
        slug: 'q-amb-2',
        stem:
          'Um estudo mapeia a localização de aterros, indústrias poluentes e áreas com maior exposição a enchentes em uma região metropolitana. Verifica-se forte coincidência com as áreas de menor renda.\n\nEsse padrão é analisado pelo conceito de:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'aplicação de conceito a padrão espacial',
        estimatedSeconds: 110,
        skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio',
        likelyErrors: ['confundir com desenvolvimento sustentável'],
        options: [
          { label: 'A', text: 'Justiça ambiental, que trata da distribuição desigual dos riscos e danos ambientais entre grupos sociais.', isCorrect: true, rationale: 'O conceito nomeia exatamente esse padrão: os custos ambientais recaem desproporcionalmente sobre populações de menor renda e grupos vulnerabilizados.' },
          { label: 'B', text: 'Desenvolvimento sustentável, que equilibra crescimento e preservação.', rationale: 'Esse conceito trata da relação entre gerações e dimensões do desenvolvimento, não da distribuição do dano entre grupos no presente.', errorHint: 'usar conceito mais genérico' },
          { label: 'C', text: 'Determinismo geográfico, segundo o qual o meio define as condições sociais.', rationale: 'A coincidência decorre de decisões de localização e do mercado de terras, não de determinação natural.', errorHint: 'naturalizar padrão socialmente produzido' },
          { label: 'D', text: 'Transição energética, que trata da mudança da matriz de energia.', rationale: 'Não há relação com matriz energética no caso descrito.', errorHint: 'trocar de tema' },
          { label: 'E', text: 'Capacidade de suporte, que define o limite populacional de um ecossistema.', rationale: 'Capacidade de suporte é conceito ecológico sobre limites, não sobre distribuição social de danos.', errorHint: 'usar conceito ecológico em questão social' },
        ],
        explanation: {
          summary: 'Quando o mapa do dano ambiental coincide com o mapa da renda, o conceito aplicável é justiça ambiental.',
        },
      },
      {
        slug: 'q-amb-3',
        stem:
          'Leia o trecho de um parecer técnico fictício:\n\n"O empreendimento gerará 400 empregos diretos e ampliará a arrecadação municipal. O estudo aponta risco de assoreamento do rio que abastece três comunidades ribeirinhas, cujas atividades de pesca representam a principal fonte de renda local."\n\nO parecer evidencia que:',
        support: 'Parecer técnico fictício criado para este exercício.',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'identificação de assimetria entre benefício e custo',
        estimatedSeconds: 130,
        skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio',
        likelyErrors: ['escolher lado em vez de analisar', 'ignorar a distribuição'],
        options: [
          { label: 'A', text: 'Os benefícios se distribuem de forma ampla enquanto os custos se concentram em um grupo específico, o que exige medidas de compensação e mitigação.', isCorrect: true, rationale: 'Emprego e arrecadação beneficiam o município como um todo; o risco recai sobre três comunidades cuja renda depende do rio. Essa assimetria é o núcleo do problema e o que justifica condicionantes.' },
          { label: 'B', text: 'O empreendimento deve ser aprovado sem restrições, pois gera empregos.', rationale: 'O parecer aponta risco concreto à principal fonte de renda de comunidades, o que exige tratamento e não omissão.', errorHint: 'considerar apenas um lado da conta' },
          { label: 'C', text: 'O empreendimento deve ser rejeitado, pois todo impacto ambiental é inaceitável.', rationale: 'A análise ambiental trabalha com mitigação, compensação e condicionantes; rejeição automática não decorre do parecer.', errorHint: 'adotar posição absoluta' },
          { label: 'D', text: 'A pesca das comunidades é atividade econômica irrelevante frente à arrecadação municipal.', rationale: 'É a principal fonte de renda local — hierarquizar assim ignora a distribuição do impacto.', errorHint: 'desconsiderar quem sofre o custo' },
          { label: 'E', text: 'O estudo técnico é desnecessário quando há geração de emprego.', rationale: 'O estudo é justamente o instrumento que revela a assimetria e permite decidir com informação.', errorHint: 'dispensar instrumento de análise' },
        ],
        explanation: {
          summary: 'O ponto não é aprovar ou rejeitar, mas reconhecer quem ganha, quem perde e o que fazer a respeito.',
          strategy: 'Em conflitos ambientais, separe sempre: quem recebe o benefício e quem suporta o custo.',
        },
      },
      {
        slug: 'q-amb-4',
        stem:
          'Duas propostas para reduzir resíduos plásticos em uma cidade:\n\nI. Campanha educativa para que a população reduza o consumo de descartáveis.\nII. Regulação que obrigue estabelecimentos a oferecer alternativas reutilizáveis e responsabilize produtores pela destinação das embalagens.\n\nSobre as propostas, é correto afirmar:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'comparação entre escalas de intervenção',
        estimatedSeconds: 150,
        skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio',
        likelyErrors: ['descartar a educação por completo', 'considerar as duas equivalentes'],
        options: [
          { label: 'A', text: 'A segunda atua sobre a estrutura da oferta e a responsabilidade do produtor, tendendo a efeito mais amplo; a primeira é complementar e depende da existência de alternativas viáveis.', isCorrect: true, rationale: 'Campanha muda escolhas dentro das opções existentes. Regulação muda quais opções existem e onde recai o custo da destinação. As duas se somam, mas não são equivalentes em alcance.' },
          { label: 'B', text: 'A primeira é suficiente, pois o consumo é a origem do problema.', rationale: 'Sem alternativa disponível, a orientação não se converte em prática — e a destinação segue sem responsável definido.', errorHint: 'atribuir solução estrutural ao indivíduo' },
          { label: 'C', text: 'A segunda é ineficaz, pois interfere na liberdade do consumidor.', rationale: 'Regulação de oferta amplia opções em vez de restringi-las, e a responsabilidade pela destinação é instrumento consolidado de política ambiental.', errorHint: 'confundir regulação com restrição de escolha' },
          { label: 'D', text: 'As duas propostas produzem exatamente o mesmo efeito.', rationale: 'Elas atuam em pontos diferentes da cadeia: comportamento individual e estrutura de oferta.', errorHint: 'igualar intervenções de escalas distintas' },
          { label: 'E', text: 'Nenhuma das duas trata do problema, que é exclusivamente global.', rationale: 'Resíduo sólido urbano tem gestão local e regional bem definidas.', errorHint: 'deslocar tudo para a escala global' },
        ],
        explanation: {
          summary: 'Educação atua nas escolhas; regulação atua nas opções disponíveis e em quem paga a destinação.',
          conceptRecap: 'Responsabilidade estendida do produtor: quem coloca a embalagem no mercado responde pelo seu retorno.',
        },
      },
      {
        slug: 'q-amb-5',
        stem:
          'Um município aprova a expansão urbana sobre área de proteção de manancial, alegando déficit habitacional. A companhia de saneamento alerta para risco de contaminação do reservatório que abastece 300 mil pessoas.\n\nA análise mais completa da situação é:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre direito à moradia, segurança hídrica e planejamento territorial',
        estimatedSeconds: 170,
        skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio',
        likelyErrors: ['opor meio ambiente a pessoas', 'escolher um direito e ignorar o outro'],
        options: [
          { label: 'A', text: 'Há conflito entre dois direitos legítimos — moradia e segurança hídrica — que exige instrumentos de planejamento territorial capazes de atender à demanda habitacional fora da área sensível.', isCorrect: true, rationale: 'Os dois lados representam direitos reais de populações reais. A saída não é escolher um, e sim usar zoneamento e produção de habitação de interesse social para atender à moradia em área adequada.' },
          { label: 'B', text: 'Trata-se de conflito entre desenvolvimento e meio ambiente, no qual o desenvolvimento deve prevalecer.', rationale: 'A oposição é falsa: 300 mil pessoas abastecidas também estão do lado social da equação.', errorHint: 'opor meio ambiente a pessoas' },
          { label: 'C', text: 'O déficit habitacional justifica qualquer ocupação, independentemente do risco de abastecimento.', rationale: 'Comprometer o abastecimento de 300 mil pessoas criaria um problema social maior que o resolvido.', errorHint: 'considerar apenas um dos direitos' },
          { label: 'D', text: 'A área de manancial deve ser preservada mesmo que nenhuma alternativa habitacional seja oferecida.', rationale: 'Preservar sem oferecer alternativa tende a produzir ocupação irregular na mesma área, agravando o risco.', errorHint: 'ignorar a demanda social que gera a pressão' },
          { label: 'E', text: 'A decisão é exclusivamente técnica e não comporta participação social.', rationale: 'Decisões sobre uso do território afetam direitos e envolvem participação prevista nos instrumentos urbanísticos.', errorHint: 'excluir a dimensão política do problema' },
        ],
        explanation: {
          summary: 'Dois direitos legítimos em conflito exigem instrumento de planejamento, não escolha entre lados.',
          detailed: 'Esta questão integra três conteúdos: direito social à moradia, direito difuso à segurança hídrica e instrumentos de ordenamento territorial. A alternativa correta é a única que reconhece os três.',
        },
      },
      {
        slug: 'q-amb-rec-1',
        stem: 'O princípio das "responsabilidades comuns porém diferenciadas" estabelece que:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'definição de princípio',
        estimatedSeconds: 80,
        isRecovery: true,
        skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio',
        likelyErrors: ['confundir com isenção de responsabilidade'],
        options: [
          { label: 'A', text: 'Todos os países têm responsabilidade sobre problemas ambientais globais, em medidas proporcionais à sua contribuição histórica e capacidade de resposta.', isCorrect: true, rationale: 'O princípio reconhece a responsabilidade compartilhada e, ao mesmo tempo, a desigualdade de contribuição para o problema e de capacidade de agir.' },
          { label: 'B', text: 'Apenas os países mais ricos têm qualquer responsabilidade ambiental.', rationale: 'A responsabilidade é comum a todos: o que varia é a proporção.', errorHint: 'ler "diferenciadas" como "exclusivas"' },
          { label: 'C', text: 'Todos os países devem adotar exatamente as mesmas metas.', rationale: 'Metas idênticas contrariam a parte "diferenciadas" do princípio.', errorHint: 'ignorar a diferenciação' },
          { label: 'D', text: 'Países em desenvolvimento estão dispensados de qualquer compromisso.', rationale: 'Dispensa total contraria a parte "comuns" do princípio.', errorHint: 'confundir proporcionalidade com isenção' },
          { label: 'E', text: 'A responsabilidade recai exclusivamente sobre empresas, não sobre Estados.', rationale: 'O princípio organiza compromissos entre Estados em acordos internacionais.', errorHint: 'trocar o sujeito do princípio' },
        ],
        explanation: { summary: 'Comum a todos, proporcional a cada um.' },
      },
      {
        slug: 'q-amb-rec-2',
        stem:
          'Uma cidade cria um programa de coleta seletiva doméstica e o apresenta como solução para o descarte irregular de resíduos industriais perigosos.\n\nA principal inadequação dessa proposta é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'adequação de escala da solução',
        estimatedSeconds: 100,
        isRecovery: true,
        skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio',
        likelyErrors: ['achar que qualquer ação ambiental serve'],
        options: [
          { label: 'A', text: 'A solução atua em uma escala e um tipo de resíduo diferentes do problema apontado, que exige fiscalização e responsabilização do gerador industrial.', isCorrect: true, rationale: 'Resíduo industrial perigoso tem cadeia, regulação e responsável distintos do resíduo doméstico. A coleta seletiva é útil, mas não endereça esse problema.' },
          { label: 'B', text: 'A coleta seletiva é uma política ineficaz em qualquer situação.', rationale: 'Ela é eficaz para resíduo domiciliar reciclável — o problema é o descompasso com o caso apresentado.', errorHint: 'generalizar a crítica' },
          { label: 'C', text: 'A responsabilidade pelo descarte industrial é dos moradores da cidade.', rationale: 'A responsabilidade pelo resíduo perigoso é do gerador.', errorHint: 'transferir responsabilidade ao indivíduo' },
          { label: 'D', text: 'Resíduos industriais não causam impacto ambiental relevante.', rationale: 'Resíduos perigosos estão entre os de maior potencial de dano.', errorHint: 'minimizar o problema' },
          { label: 'E', text: 'Programas municipais não podem tratar de resíduos.', rationale: 'Municípios têm competência sobre gestão de resíduos sólidos urbanos.', errorHint: 'negar competência existente' },
        ],
        explanation: {
          summary: 'A escala e o tipo da solução precisam corresponder à escala e ao tipo do problema.',
        },
      },
    ],
  },
];

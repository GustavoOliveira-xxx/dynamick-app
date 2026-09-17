import { question as q, topic } from './leva8-factory.js';

export const LINGUAGENS_TOPICS_LEVA_3 = [
  topic({
    slug: 'semantica-e-efeitos-de-sentido',
    name: 'Semântica e efeitos de sentido',
    subject: 'lingua-portuguesa',
    area: 'linguagens',
    summary:
      'Perceber como sinonímia, ambiguidade, denotação, conotação e escolha de palavras produzem efeitos de sentido em textos verbais e não verbais.',
    difficulty: 'intermediate',
    minutes: 24,
    weight: 87,
    order: 6,
    prerequisites: ['interpretacao-e-inferencia'],
    related: ['recursos-expressivos', 'funcoes-da-linguagem'],
    skill: {
      slug: 'analisar-escolhas-lexicais-e-efeitos-de-sentido',
      name: 'Analisar escolhas lexicais e efeitos de sentido',
      description:
        'Identificar como a seleção de palavras, a ambiguidade e o uso figurado orientam a leitura e revelam o ponto de vista de quem escreve.',
    },
    quick: `**Denotação × conotação**

- **Denotativo:** sentido literal, de dicionário. *"A cobra atravessou a trilha."*
- **Conotativo:** sentido figurado, construído no contexto. *"Aquele colega é uma cobra."*

A prova quase nunca pergunta "isso é conotativo?". Ela pergunta **que efeito** o sentido figurado produziu.

**Relações de sentido entre palavras**

| Relação | O que é | Exemplo |
| --- | --- | --- |
| **Sinonímia** | sentidos próximos | casa / residência |
| **Antonímia** | sentidos opostos | economia / desperdício |
| **Hiperonímia** | termo mais geral | ave → pardal |
| **Homonímia** | mesma forma, sentidos diferentes | manga (fruta / da camisa) |
| **Polissemia** | uma palavra, vários sentidos ligados | *pé* de mesa, *pé* da montanha |

**Sinônimo perfeito quase não existe.** *Magro*, *esbelto* e *esquelético* apontam a mesma característica com **avaliações diferentes**. Trocar um pelo outro muda o texto.

**Ambiguidade**

É o enunciado que admite mais de uma leitura.

- **Defeito**, quando não foi intencional: *"O policial prendeu o suspeito em sua casa."* (casa de quem?)
- **Recurso**, quando foi de propósito: é a base do humor em muitas tirinhas e de trocadilhos publicitários.

**O que checar em toda questão de sentido**

1. Que palavra foi escolhida — e qual **não** foi?
2. O sentido é literal ou figurado?
3. Que **avaliação** a escolha carrega (positiva, negativa, neutra)?
4. A que o pronome ou o termo se refere no texto?`,
    explanation: {
      title: 'A palavra escolhida é um ponto de vista',
      body: `### 1. Não existe escolha neutra

Compare três manchetes sobre o mesmo evento:

- "Manifestantes **ocupam** a avenida"
- "Manifestantes **tomam** a avenida"
- "Manifestantes **invadem** a avenida"

O fato descrito é o mesmo. *Ocupar* é quase neutro; *tomar* sugere força; *invadir* pressupõe que o lugar não lhes pertencia e carrega julgamento negativo.

Esse é o coração das questões de semântica no ENEM: a prova mostra duas formulações e pergunta o que muda. A resposta nunca é "nada muda".

O mesmo vale para **eufemismo** (suavizar: *"o funcionário foi desligado"*) e **hipérbole** (exagerar: *"esperei séculos"*).

### 2. Ambiguidade: quando é erro e quando é recurso

Ambiguidade estrutural aparece muito em três situações:

- **Pronome possessivo sem referente claro:** *"Pedro disse a João que seu carro havia sido rebocado."* De quem é o carro?
- **Adjunto mal posicionado:** *"Vendo bicicleta de menino em bom estado."*
- **Pronome relativo distante do antecedente:** *"Entregou o relatório ao diretor que estava incompleto."*

Em texto técnico ou dissertativo, isso é um problema a corrigir — normalmente reescrevendo a frase, não apenas trocando palavras.

Em tirinhas, propaganda e poesia, a ambiguidade é **intencional**: a graça está justamente em o leitor ativar os dois sentidos ao mesmo tempo. Quando a questão pedir "o efeito de humor decorre de...", procure a palavra que aceita duas leituras.

### 3. Pressuposto e subentendido

Dois conceitos que o ENEM cobra sem sempre nomear:

- **Pressuposto:** informação que fica marcada na própria frase e que o leitor aceita sem discutir. *"O aluno **parou de** faltar às aulas"* pressupõe que ele faltava antes. Marcadores típicos: *já, ainda, deixar de, continuar, voltar a*.
- **Subentendido:** insinuação que depende do contexto e de quem lê. *"Está calor aqui"*, dito a alguém perto da janela, pode ser um pedido.

A diferença prática: o pressuposto é difícil de negar (está na estrutura); o subentendido é negável ("eu só comentei sobre o clima").

### 4. Campos semânticos e coerência do texto

Palavras que pertencem ao mesmo campo de sentido criam unidade e orientam a leitura. Um texto sobre economia que usa *sangria*, *hemorragia de recursos* e *tratamento de choque* está lendo a economia pela metáfora da **doença** — e essa metáfora carrega um ponto de vista: a crise é vista como algo a ser curado por um especialista.

Identificar o campo semântico dominante costuma ser o caminho mais rápido para a intenção do autor.

### 5. Como isso cai na prova

O enunciado raramente usa a palavra "semântica". Ele diz:

- "A substituição do termo X por Y alteraria o sentido porque..."
- "O efeito de humor/ironia é produzido por..."
- "A escolha do vocábulo X revela, por parte do autor,..."
- "No texto, a expressão X foi empregada em sentido..."

Em todos os casos, o método é o mesmo: **isole a palavra, imagine a alternativa que não foi usada e compare os dois efeitos.**`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — a troca de uma palavra muda a leitura do fato',
        body: `**Situação:** dois jornais noticiam o mesmo aumento de tarifa.

- Jornal A: "A empresa **reajustou** as tarifas em 8%."
- Jornal B: "A empresa **encareceu** as passagens em 8%."

Qual efeito de sentido cada escolha produz?

**Passo 1 — verificar o fato:** é o mesmo nos dois: aumento de 8%.

**Passo 2 — analisar o verbo de A:** *reajustar* pertence ao campo da técnica e da administração. Sugere correção necessária, cálculo, normalidade. Apaga o desconforto.

**Passo 3 — analisar o verbo de B:** *encarecer* aponta para o efeito sobre quem paga. Coloca o leitor no lugar do usuário e evidencia o ônus.

**Passo 4 — formular a resposta:** ambas são verdadeiras quanto ao fato, mas cada uma **orienta uma leitura diferente**: A aproxima-se do ponto de vista da empresa; B, do ponto de vista do passageiro.

**O que não dizer:** que uma das manchetes "mentiu". O ponto da questão é o **enquadramento**, não a veracidade.`,
      },
      {
        title: 'Exemplo resolvido 2 — de onde vem o humor de uma tirinha',
        body: `**Situação:** numa tirinha, um personagem pergunta ao amigo, na biblioteca: "Você já terminou o livro?" O amigo responde: "Terminei — comi até a última página." No último quadro, vê-se uma traça de livros.

**Passo 1 — localizar a expressão que aceita duas leituras:** "terminar o livro".

**Passo 2 — descrever cada leitura:**
- **Sentido esperado:** terminar de *ler*.
- **Sentido revelado no fim:** terminar de *comer*, já que a personagem é uma traça.

**Passo 3 — identificar o mecanismo:** o humor nasce da **quebra de expectativa**: o leitor constrói a primeira leitura e a tirinha só revela a segunda no desfecho, obrigando a reinterpretar tudo.

**Passo 4 — nomear o recurso:** **ambiguidade intencional**, apoiada na **polissemia** do verbo "terminar".

**Cuidado com a resposta apressada:** dizer que o humor vem "da imagem engraçada" ignora o mecanismo linguístico, que é exatamente o que a questão cobra.`,
      },
    ],
    mistakes: `**1. Tratar sinônimos como palavras intercambiáveis.**
*Residência*, *casa* e *barraco* designam o mesmo tipo de lugar com avaliações bem diferentes. Se a questão pergunta o efeito de uma substituição, a resposta "nenhum, são sinônimos" está errada por definição.

**2. Confundir o que o texto afirma com o que ele pressupõe.**
*"O país voltou a crescer"* afirma o crescimento atual e **pressupõe** que ele havia parado. Marcar como "informação não presente no texto" é perder a questão.

**3. Explicar o humor pelo conteúdo, e não pelo recurso.**
Não basta dizer "é engraçado porque a personagem é uma traça". A prova quer o mecanismo: qual palavra ou expressão admite duas leituras e em que momento a segunda se revela.`,
    selfCheck: [
      'Explique a diferença entre denotação e conotação com um exemplo seu.',
      'Por que dizer que "sinônimos têm exatamente o mesmo sentido" é impreciso?',
      'Quando a ambiguidade é um defeito e quando é um recurso? Dê um exemplo de cada.',
      'Qual a diferença entre pressuposto e subentendido, e por que um é mais difícil de negar?',
      'Ao analisar uma manchete, que pergunta você faz para descobrir o ponto de vista de quem escreveu?',
    ],
    questions: [
      q({
        slug: 'q-sem-1',
        stem: 'Na frase "Aquele jogador é uma raposa dentro de campo", a palavra destacada foi empregada em sentido:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'distinção entre sentido literal e figurado',
        seconds: 70,
        errors: ['classificar como literal qualquer palavra concreta'],
        correct: 3,
        options: [
          ['Denotativo, pois raposa designa um animal existente.', 'A frase não afirma que o jogador é um animal; o termo foi transposto para caracterizar um comportamento.', 'ler literalmente uma metáfora'],
          ['Técnico, próprio da linguagem esportiva formal.', 'Não se trata de um termo técnico do esporte, e sim de uma comparação implícita.', 'confundir registro com sentido'],
          ['Ambíguo, pois a frase admite duas leituras igualmente possíveis.', 'O contexto elimina a leitura literal: não há dúvida real sobre o significado pretendido.', 'ver ambiguidade onde o contexto decide'],
          ['Conotativo, pois atribui ao jogador características associadas à astúcia da raposa.', 'O sentido figurado transfere para o jogador um traço culturalmente associado ao animal — a esperteza.'],
          ['Pejorativo, pois compara uma pessoa a um animal.', 'No contexto esportivo, a comparação é elogiosa, e não depreciativa.', 'atribuir avaliação sem checar o contexto'],
        ],
        explanation: 'O sentido conotativo constrói significado pelo contexto: "raposa" caracteriza a astúcia do jogador, não sua espécie.',
      }),
      q({
        slug: 'q-sem-2',
        stem: 'Um veículo de imprensa substituiu, na manchete, o verbo "reajustar" por "encarecer" ao noticiar o mesmo aumento de tarifa. Essa substituição:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação da análise de escolha lexical a um caso concreto',
        seconds: 95,
        errors: ['supor que sinônimos aproximados são intercambiáveis'],
        correct: 1,
        options: [
          ['Não altera o sentido, pois os verbos são sinônimos perfeitos.', 'Os verbos apontam para o mesmo fato, mas com avaliações diferentes; sinonímia perfeita é rara.', 'tratar sinônimos como equivalentes'],
          ['Desloca o foco para o impacto sobre quem paga, conferindo à notícia uma perspectiva mais crítica.', '"Reajustar" soa técnico e administrativo; "encarecer" evidencia o ônus para o usuário e adota o ponto de vista de quem arca com o aumento.'],
          ['Torna a manchete factualmente incorreta.', 'O fato noticiado permanece o mesmo; muda o enquadramento, não a veracidade.', 'confundir enquadramento com erro factual'],
          ['Elimina qualquer marca de opinião do texto.', 'A escolha lexical é justamente uma das formas de inscrever avaliação no texto.', 'supor neutralidade impossível'],
          ['Transforma a manchete em um texto literário.', 'A mudança de verbo não altera o gênero textual da manchete.', 'confundir efeito de sentido com mudança de gênero'],
        ],
        explanation: 'Escolha lexical é ponto de vista: verbos que descrevem o mesmo fato podem aproximar o texto da empresa ou do consumidor.',
        strategy: 'Pergunte qual palavra não foi usada e compare os efeitos das duas possibilidades.',
      }),
      q({
        slug: 'q-sem-3',
        stem: 'Em uma tirinha, um personagem pergunta se o outro já terminou o livro e recebe como resposta que sim, que ele comeu até a última página; no quadro final, revela-se que o interlocutor é uma traça. O efeito de humor decorre principalmente de:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'identificação do mecanismo linguístico responsável pelo humor',
        seconds: 115,
        errors: ['explicar o humor pelo conteúdo da imagem, e não pelo recurso de linguagem'],
        correct: 4,
        options: [
          ['Um erro gramatical cometido pelo personagem.', 'Não há desvio gramatical na fala apresentada.', 'atribuir o efeito a um desvio inexistente'],
          ['Do desenho engraçado do personagem no último quadro.', 'A imagem revela a chave da piada, mas o mecanismo é linguístico.', 'explicar o humor pelo conteúdo visual'],
          ['Da mudança de assunto entre os quadros.', 'O assunto permanece o mesmo: o livro.', 'supor ruptura temática'],
          ['Do uso de linguagem formal em situação informal.', 'Não há contraste de registro relevante na tirinha.', 'trocar o recurso analisado'],
          ['Da ambiguidade da expressão "terminar o livro", cuja segunda leitura só se revela no último quadro.', 'O leitor constrói a leitura de "terminar de ler" e é obrigado a reinterpretá-la como "terminar de comer" — a quebra de expectativa produz o humor.'],
        ],
        explanation: 'O humor nasce da ambiguidade intencional: a mesma expressão admite duas leituras, e a segunda só se revela no desfecho.',
      }),
      q({
        slug: 'q-sem-4',
        stem: 'Comparando as frases "O programa foi encerrado" e "O programa foi cancelado", em notícia sobre uma política pública descontinuada, a análise semântica adequada é:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre efeitos de sentido de escolhas lexicais próximas',
        seconds: 140,
        errors: ['ignorar a diferença de pressuposto entre os verbos'],
        correct: 0,
        options: [
          ['"Encerrado" sugere um término previsto, enquanto "cancelado" sugere interrupção de algo que deveria continuar, atribuindo responsabilidade a uma decisão.', 'Os verbos pressupõem cenários distintos: um fim planejado ou uma decisão que interrompe uma continuidade esperada.'],
          ['As duas frases são equivalentes, pois descrevem o mesmo fato administrativo.', 'Descrevem o mesmo fato, mas com pressupostos e avaliações diferentes.', 'tratar sinônimos como equivalentes'],
          ['"Cancelado" é a única forma gramaticalmente correta nesse contexto.', 'As duas construções são gramaticalmente corretas.', 'transformar questão de sentido em questão de gramática'],
          ['A diferença está apenas no grau de formalidade entre os verbos.', 'Ambos pertencem ao mesmo registro; a diferença é de pressuposto, não de formalidade.', 'confundir registro com pressuposto'],
          ['"Encerrado" indica que o programa nunca existiu de fato.', 'Encerrar pressupõe justamente que o programa existiu e chegou ao fim.', 'inverter o pressuposto'],
        ],
        explanation: 'Verbos próximos podem carregar pressupostos diferentes: um fim previsto ou uma interrupção decidida — e isso orienta o julgamento do leitor.',
        strategy: 'Pergunte o que cada verbo obriga o leitor a aceitar como verdadeiro antes mesmo de discutir o fato.',
      }),
      q({
        slug: 'q-sem-5',
        stem: 'Uma campanha publicitária de uma marca de água mineral usa o slogan "Fonte de tudo o que importa", acompanhado da imagem de uma família reunida. Considerando as escolhas de linguagem e o conjunto verbo-visual, conclui-se que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre campo semântico, sentido figurado e intenção persuasiva',
        seconds: 165,
        errors: ['analisar apenas o texto verbal e ignorar a construção do sentido pela imagem'],
        correct: 2,
        options: [
          ['O slogan usa apenas sentido literal, pois água é de fato uma fonte natural.', 'A expressão "tudo o que importa" extrapola o sentido literal e mobiliza valores afetivos.', 'ler literalmente um enunciado publicitário'],
          ['A imagem é decorativa e não participa da construção do sentido.', 'Em textos publicitários o elemento visual é parte integrante do argumento.', 'separar o verbal do visual'],
          ['A palavra "fonte" opera em dois planos — a origem natural da água e a origem do bem-estar familiar —, e a imagem reforça a associação entre o produto e valores afetivos.', 'O slogan explora a polissemia de "fonte" e a imagem ancora a leitura figurada, transferindo ao produto um valor que não é físico, mas simbólico.'],
          ['O texto apresenta ambiguidade acidental, que prejudica a compreensão da campanha.', 'A duplicidade de sentido é intencional e favorece a persuasão, em vez de prejudicá-la.', 'confundir recurso com defeito'],
          ['O slogan tem função predominantemente referencial, pois informa características do produto.', 'Não há informação objetiva sobre o produto; predomina a função conativa, voltada a convencer.', 'trocar a função de linguagem'],
        ],
        explanation: 'A publicidade costuma trabalhar a polissemia e o conjunto verbo-visual para transferir ao produto valores simbólicos.',
      }),
      q({
        slug: 'q-sem-rec-1',
        stem: 'A frase "O aluno voltou a entregar os trabalhos no prazo" traz uma informação que não é afirmada diretamente, mas fica marcada na própria estrutura da frase. Essa informação é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de pressuposto',
        seconds: 70,
        recovery: true,
        errors: ['considerar ausente do texto aquilo que está pressuposto'],
        correct: 1,
        options: [
          ['Que o aluno nunca havia entregado trabalhos antes.', 'O verbo "voltar a" indica retomada, e não estreia.', 'inverter o pressuposto'],
          ['Que, em algum momento anterior, o aluno havia deixado de entregar no prazo.', 'A expressão "voltou a" pressupõe que a prática existia, foi interrompida e agora foi retomada.'],
          ['Que o aluno foi reprovado no ano anterior.', 'Nada na frase autoriza essa conclusão.', 'extrapolar o que o texto permite'],
          ['Que todos os alunos da turma entregam no prazo.', 'A frase se refere a um aluno específico.', 'generalizar indevidamente'],
          ['Que a informação não consta do texto de nenhuma forma.', 'Ela consta como pressuposto, marcado pela própria construção verbal.', 'confundir pressuposto com ausência'],
        ],
        explanation: 'Expressões como "voltar a", "deixar de", "ainda" e "já" marcam pressupostos: informações que o texto assume como verdadeiras.',
      }),
    ],
  }),

  topic({
    slug: 'modernismo-brasileiro',
    name: 'Modernismo brasileiro',
    subject: 'literatura',
    area: 'linguagens',
    summary:
      'Compreender a ruptura de 1922, as fases do Modernismo e a relação entre linguagem coloquial, identidade nacional e crítica social na literatura brasileira.',
    difficulty: 'intermediate',
    minutes: 26,
    weight: 85,
    order: 2,
    prerequisites: ['literatura-brasileira'],
    related: ['recursos-expressivos', 'cultura-e-identidade'],
    skill: {
      slug: 'relacionar-obras-modernistas-a-seu-contexto-e-projeto-estetico',
      name: 'Relacionar obras modernistas a seu contexto e projeto estético',
      description:
        'Identificar procedimentos de linguagem do Modernismo e relacioná-los ao projeto de ruptura, à identidade nacional e à crítica social do período.',
    },
    quick: `**O marco: Semana de Arte Moderna, 1922**

São Paulo, Teatro Municipal, centenário da Independência. Não foi um sucesso de público — foi vaiada. Mas fixou um programa: **romper com o academicismo** e criar uma arte brasileira com linguagem brasileira.

**As três fases**

| Fase | Período | Marca |
| --- | --- | --- |
| **1ª — heroica** | 1922-1930 | destruição do velho, humor, irreverência, manifestos |
| **2ª — de consolidação** | 1930-1945 | romance social e regionalista, poesia madura |
| **3ª — pós-45** | 1945-1960 | rigor formal, retomada da construção |

**Primeira fase — os nomes e os gestos**

- **Mário de Andrade** — *Macunaíma*, "o herói sem nenhum caráter"; *Paulicéia Desvairada*.
- **Oswald de Andrade** — *Manifesto Antropófago* (1928): "só a antropofagia nos une". A ideia: **devorar** a cultura estrangeira e transformá-la em algo brasileiro, em vez de copiá-la ou recusá-la.
- **Manuel Bandeira** — *Poética*: "Estou farto do lirismo comedido". O poema "Pneumotórax", com seu desfecho seco, é o exemplo perfeito do humor amargo da fase.

**Procedimentos que identificam um texto modernista**

- **verso livre** (sem métrica fixa) e **verso branco** (sem rima)
- **linguagem coloquial**, do jeito que o brasileiro fala
- **poema-piada**, ironia, paródia
- temas do cotidiano e da cidade, antes considerados "não poéticos"
- valorização do **índio, do negro e do popular** como raiz brasileira

**Segunda fase — o país como problema**

- **Carlos Drummond de Andrade** — "No meio do caminho tinha uma pedra"; o eu e o mundo.
- **Graciliano Ramos** — *Vidas Secas*: seca, linguagem enxuta, personagens quase sem palavras.
- **Rachel de Queiroz**, **José Lins do Rego**, **Jorge Amado** — o romance de 30, denúncia social.

**Terceira fase**

- **João Cabral de Melo Neto** — *Morte e Vida Severina*: poesia construída como engenharia, sem sentimentalismo.
- **Clarice Lispector** e **Guimarães Rosa** — a prosa se volta para dentro e para a invenção da língua.`,
    explanation: {
      title: 'Por que romper: o Modernismo como projeto, não só como estilo',
      body: `### 1. O que havia antes e por que incomodava

No início do século XX, a literatura brasileira prestigiada ainda seguia o **Parnasianismo**: métrica rigorosa, rima rica, vocabulário raro, temas clássicos. Escrever bem era escrever difícil.

O problema, para os modernistas, não era estético apenas — era **político-cultural**. Uma literatura que copiava modelos europeus e falava uma língua que ninguém falava não conseguia dizer o Brasil.

Daí a ironia de Bandeira: *"Não quero mais saber do lirismo que não é libertação."* E a provocação de Oswald, em pleno *Manifesto da Poesia Pau-Brasil*: **"A língua sem arcaísmos. Natural e neológica. A contribuição milionária de todos os erros."**

O "erro" aqui é a fala brasileira real — e ele passa a ser matéria-prima, não defeito.

### 2. Antropofagia: nem cópia, nem recusa

O **Manifesto Antropófago** (1928) é a ideia mais cobrada do período, e costuma ser mal explicada.

Não é "recusar tudo o que vem de fora" nem "copiar o estrangeiro". É **devorar**: assimilar a cultura de fora, digeri-la e devolvê-la transformada em algo brasileiro. A metáfora vem do ritual indígena de devorar o inimigo para incorporar sua força.

*Macunaíma*, de Mário de Andrade, é a aplicação em romance: um herói feito de lendas indígenas, provérbios populares e paisagens de todo o país, que atravessa o Brasil inteiro sem coerência geográfica — porque a ideia é justamente montar uma identidade feita de mistura, e não uma nação idealizada.

O subtítulo, "o herói sem nenhum caráter", tem duplo sentido: sem caráter moral fixo e **sem caráter definido**, isto é, sem uma essência única — como o próprio país.

### 3. Da destruição à construção: por que o tom muda em 1930

A primeira fase precisava chocar; por isso o humor, a piada, o manifesto. Cumprida a ruptura, a literatura pôde se voltar para o país concreto — e o país dos anos 1930 tinha seca, migração, coronelismo, desigualdade.

O **romance de 30** responde a isso. *Vidas Secas* é exemplar: Graciliano Ramos escreve com frases curtas e vocabulário mínimo, e seus personagens mal conseguem falar. A forma **reproduz** o tema: a privação também é de linguagem. Fabiano, quando quer se expressar, "resmunga".

Não é falta de recurso do autor — é escolha estética. Perceber isso é o que a prova costuma pedir.

### 4. Drummond e a poesia que pensa

Drummond atravessa o Modernismo e vai além dele. Da irreverência inicial ("No meio do caminho tinha uma pedra", que escandalizou por repetir uma construção coloquial) à poesia social de *A Rosa do Povo*, ele mantém a linguagem simples e o pensamento complexo.

O "gauche" drummondiano — o sujeito torto, deslocado — é uma das figuras mais reconhecíveis da literatura brasileira, e aparece já em "Poema de Sete Faces": *"Vai, Carlos! ser gauche na vida."*

### 5. Como o ENEM cobra Modernismo

Quase nunca por decoreba de datas e nomes. O formato típico é: **um poema ou trecho + uma pergunta sobre o que a linguagem está fazendo ali.**

O que buscar no texto:

- Há **verso livre**, ausência de rima, linguagem falada? → primeira fase, ruptura formal.
- Há **humor, ironia, paródia** de algo solene? → poema-piada, primeira fase.
- Há **denúncia social, seca, migração, trabalho**? → segunda fase, romance de 30.
- Há **rigor construtivo, imagens secas, antissentimentalismo**? → João Cabral, terceira fase.
- Há valorização do **popular, indígena, afro-brasileiro** como identidade? → projeto antropofágico.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — reconhecer a ruptura em quatro versos',
        body: `**Situação:** leia os versos de Manuel Bandeira, em "Poética":

> *"Estou farto do lirismo comedido / Do lirismo bem comportado / Do lirismo funcionário público com livro de ponto..."*

O que esses versos revelam sobre o projeto modernista?

**Passo 1 — observar a forma:** versos de tamanhos diferentes, sem rima, sem métrica fixa → **verso livre e branco**. Já é uma recusa material do padrão parnasiano.

**Passo 2 — observar o vocabulário:** "funcionário público com livro de ponto" é expressão do cotidiano burocrático, não do repertório poético tradicional. O prosaico entra no poema.

**Passo 3 — identificar o alvo da crítica:** "comedido", "bem comportado" caracterizam a poesia anterior como **domesticada**. A comparação com o funcionário que bate ponto sugere poesia feita por obrigação e regra.

**Passo 4 — formular a resposta:** os versos **realizam** aquilo que defendem: criticam o lirismo regrado usando exatamente uma forma livre e uma linguagem prosaica.

**Erro comum:** dizer que o poeta "critica a poesia". Ele critica **um tipo** de poesia — a submissa à regra — em nome de outra.`,
      },
      {
        title: 'Exemplo resolvido 2 — quando a forma repete o tema',
        body: `**Situação:** em *Vidas Secas*, Graciliano Ramos descreve Fabiano, vaqueiro sertanejo, que admira o modo de falar de seu Tomás da bolandeira e, ao tentar imitá-lo, percebe que "as palavras não vinham" e acaba resmungando. Por que essa cena é considerada representativa do romance de 30?

**Passo 1 — identificar o tema:** a privação material do sertanejo na seca.

**Passo 2 — observar o que a cena acrescenta:** a privação não é só de água e comida — é também de **linguagem**. Fabiano não dispõe das palavras que lhe permitiriam argumentar, reclamar, defender-se.

**Passo 3 — relacionar forma e conteúdo:** Graciliano escreve com frases curtas, vocabulário reduzido e quase nenhum ornamento. A **secura do estilo** corresponde à secura da terra e da vida.

**Passo 4 — concluir:** a cena mostra que, no romance de 30, a denúncia social não está apenas no que se conta, mas **em como se conta**. A forma é argumento.

**Erro comum:** interpretar a linguagem simples como pobreza de recursos do escritor. É o oposto: é escolha deliberada e altamente controlada.`,
      },
    ],
    mistakes: `**1. Confundir antropofagia com recusa do estrangeiro.**
O Manifesto Antropófago propõe **devorar e transformar** o que vem de fora, não rejeitá-lo. Quem lê como nacionalismo xenófobo erra a alternativa.

**2. Achar que Modernismo é "escrever sem regra nenhuma".**
Verso livre não é ausência de trabalho: Drummond e João Cabral são extremamente rigorosos. A liberdade é em relação ao **modelo herdado**, não em relação ao ofício.

**3. Tratar todo o Modernismo como se fosse a primeira fase.**
O poema-piada e a irreverência marcam 1922-1930. A partir de 1930 predomina a denúncia social, e depois de 1945 o rigor construtivo. Datar pelo tom do texto evita o erro.`,
    selfCheck: [
      'O que a Semana de 1922 propunha romper, e por que isso era também uma questão de identidade nacional?',
      'Explique a antropofagia de Oswald sem usar as palavras "copiar" nem "rejeitar".',
      'Por que *Macunaíma* é chamado de "herói sem nenhum caráter"?',
      'Como a linguagem enxuta de *Vidas Secas* se relaciona com o tema do livro?',
      'Que marcas em um poema ajudam a distinguir a primeira fase do Modernismo da terceira?',
    ],
    questions: [
      q({
        slug: 'q-modbr-1',
        stem: 'A Semana de Arte Moderna de 1922 é considerada um marco da literatura brasileira principalmente porque:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento do significado histórico do evento',
        seconds: 75,
        errors: ['avaliar o evento pelo sucesso de público'],
        correct: 2,
        options: [
          ['Foi aclamada pelo público, consagrando imediatamente seus participantes.', 'O evento foi amplamente vaiado; sua importância é histórica e programática, não de recepção imediata.', 'medir a importância pela recepção'],
          ['Restaurou os padrões parnasianos de métrica e rima.', 'O movimento propunha justamente romper com esses padrões.', 'inverter o projeto estético'],
          ['Propôs a ruptura com os modelos acadêmicos e a criação de uma arte com linguagem brasileira.', 'A Semana firmou um programa de renovação estética e de busca por uma expressão artística própria do país.'],
          ['Marcou o fim da produção literária no Brasil por duas décadas.', 'O período seguinte é um dos mais produtivos da literatura brasileira.', 'inverter o efeito histórico'],
          ['Foi organizada pelo governo federal como política oficial de cultura.', 'A Semana foi iniciativa de artistas e mecenas paulistas, não uma política de Estado.', 'atribuir autoria institucional'],
        ],
        explanation: 'O valor da Semana está no programa que ela firmou: romper com o academicismo e construir uma linguagem artística brasileira.',
      }),
      q({
        slug: 'q-modbr-2',
        stem: 'Ao afirmar, no Manifesto da Poesia Pau-Brasil, que a língua deveria ser "sem arcaísmos, natural e neológica", com "a contribuição milionária de todos os erros", Oswald de Andrade defendia que a literatura deveria:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação do programa modernista à questão da linguagem',
        seconds: 95,
        errors: ['interpretar a valorização do coloquial como descuido com a língua'],
        correct: 3,
        options: [
          ['Abandonar a língua portuguesa e adotar idiomas indígenas.', 'A proposta é incorporar a fala brasileira ao português literário, não substituir o idioma.', 'radicalizar a proposta além do texto'],
          ['Retomar a norma clássica portuguesa como modelo de correção.', 'O manifesto rejeita justamente o apego ao modelo lusitano e ao arcaísmo.', 'inverter a proposta'],
          ['Eliminar qualquer preocupação com a construção do texto literário.', 'Recusar um modelo herdado não significa dispensar trabalho estético.', 'confundir liberdade com ausência de ofício'],
          ['Incorporar a fala brasileira real, inclusive suas construções consideradas "erradas" pela norma lusitana, como matéria legítima de literatura.', 'Os chamados "erros" são marcas do português falado no Brasil, e o manifesto os reivindica como riqueza expressiva e traço de identidade.'],
          ['Escrever apenas sobre temas regionais do interior do país.', 'A proposta é de linguagem, e alcança temas urbanos e cosmopolitas também.', 'restringir o alcance do programa'],
        ],
        explanation: 'A "contribuição milionária de todos os erros" reivindica o português brasileiro falado como material literário legítimo.',
        strategy: 'Leia manifestos como programas de linguagem antes de lê-los como declarações políticas.',
      }),
      q({
        slug: 'q-modbr-3',
        stem: 'Em Vidas Secas, de Graciliano Ramos, o vaqueiro Fabiano admira quem fala bem, mas ao tentar se expressar percebe que as palavras não vêm e acaba resmungando. Considerando o projeto do romance de 1930, essa caracterização indica que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação da relação entre forma literária e crítica social',
        seconds: 120,
        errors: ['ler a linguagem enxuta como limitação do autor'],
        correct: 0,
        options: [
          ['A privação vivida pelo personagem também é de linguagem, e a secura do estilo do romance reforça essa condição.', 'A escassez de palavras de Fabiano compõe a denúncia: sem linguagem, ele não consegue reivindicar nem se defender — e a prosa enxuta de Graciliano encena isso formalmente.'],
          ['O autor não dominava recursos estilísticos mais elaborados.', 'A economia verbal de Graciliano é escolha deliberada e rigorosamente controlada.', 'confundir escolha estética com limitação'],
          ['O romance defende que o sertanejo não deve ser alfabetizado.', 'A obra denuncia a privação, em vez de justificá-la.', 'inverter a posição da obra'],
          ['A cena tem função apenas humorística, sem relação com o tema do livro.', 'Não há intenção cômica; a cena é central para a crítica social do romance.', 'trocar o tom da obra'],
          ['O trecho comprova que o Modernismo abandonou a preocupação social.', 'É justamente na segunda fase que a preocupação social se torna central.', 'inverter a cronologia do movimento'],
        ],
        explanation: 'No romance de 30, a forma é argumento: a linguagem reduzida do texto corresponde à privação material e simbólica do personagem.',
      }),
      q({
        slug: 'q-modbr-4',
        stem: 'Comparando a primeira fase do Modernismo brasileiro (1922-1930) e a geração de 1945, representada por João Cabral de Melo Neto, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre fases do movimento quanto a projeto e procedimentos',
        seconds: 140,
        errors: ['tratar todo o Modernismo como um bloco homogêneo'],
        correct: 1,
        options: [
          ['As duas fases se caracterizam igualmente pelo poema-piada e pela irreverência.', 'A irreverência marca a primeira fase; a geração de 1945 caracteriza-se pelo rigor construtivo.', 'homogeneizar o movimento'],
          ['A primeira fase privilegia a ruptura irreverente e o humor, enquanto a geração de 1945 retoma o rigor construtivo e o antissentimentalismo.', 'Cumprida a ruptura inicial, a poesia pós-45 volta-se para a construção cuidadosa do poema, com imagens secas e recusa da efusão lírica.'],
          ['A geração de 1945 retomou integralmente os padrões parnasianos de rima e métrica.', 'O rigor de João Cabral é construtivo e moderno, não uma volta ao Parnasianismo.', 'confundir rigor com retorno ao passado'],
          ['A primeira fase evitava temas brasileiros, enquanto a de 1945 os introduziu.', 'A busca por temas e linguagem brasileiros é central já em 1922.', 'inverter a cronologia'],
          ['Nenhuma das duas fases apresentava projeto estético definido.', 'Ambas têm projetos explícitos, ainda que distintos.', 'negar os projetos estéticos'],
        ],
        explanation: 'A primeira fase destrói para abrir caminho; a de 1945 constrói com rigor. Reconhecer o tom do texto ajuda a datá-lo.',
        strategy: 'Antes de escolher, pergunte se o texto está rompendo com algo ou construindo com precisão.',
      }),
      q({
        slug: 'q-modbr-5',
        stem: 'Macunaíma, de Mário de Andrade, reúne lendas indígenas, provérbios populares e referências de diferentes regiões em um herói descrito como "sem nenhum caráter", que percorre o país sem coerência geográfica. Essa construção deve ser compreendida como:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre projeto antropofágico, forma narrativa e identidade nacional',
        seconds: 165,
        errors: ['ler as incoerências da obra como falhas de composição'],
        correct: 4,
        options: [
          ['Um descuido do autor com a verossimilhança geográfica do enredo.', 'As deslocações são deliberadas e integram o projeto estético da obra.', 'ler a escolha estética como erro'],
          ['Uma defesa da superioridade da cultura europeia sobre as demais.', 'A obra faz o movimento inverso, valorizando matrizes indígenas e populares.', 'inverter o projeto da obra'],
          ['Uma crônica histórica fiel à formação territorial do Brasil.', 'O livro é uma rapsódia, não um relato histórico.', 'confundir gênero'],
          ['Uma recusa completa de qualquer influência estrangeira na cultura brasileira.', 'A antropofagia propõe devorar e transformar o estrangeiro, e não recusá-lo.', 'confundir antropofagia com xenofobia'],
          ['A construção deliberada de uma identidade nacional feita de mistura, em sintonia com o projeto antropofágico de devorar e transformar referências diversas.', 'O herói sem caráter fixo e o território embaralhado encenam um país plural, formado pela deglutição de matrizes culturais variadas.'],
        ],
        explanation: 'Macunaíma aplica a antropofagia: em vez de uma nação idealizada e coerente, uma identidade feita de mistura e transformação.',
      }),
      q({
        slug: 'q-modbr-rec-1',
        stem: 'A expressão "verso livre", muito associada à poesia modernista, designa o verso que:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'definição de procedimento formal',
        seconds: 65,
        recovery: true,
        errors: ['confundir verso livre com ausência de elaboração'],
        correct: 1,
        options: [
          ['Obrigatoriamente apresenta rima em todas as estrofes.', 'Rima é justamente um dos elementos que o verso livre dispensa.', 'inverter a definição'],
          ['Não obedece a um esquema fixo de métrica.', 'Verso livre é aquele que não segue número fixo de sílabas poéticas, ganhando liberdade rítmica.'],
          ['Tem sempre o mesmo número de sílabas poéticas.', 'Essa é a característica do verso metrificado, e não do livre.', 'inverter a definição'],
          ['É escrito exclusivamente em linguagem formal.', 'O registro não define o verso livre.', 'confundir registro com forma'],
          ['Dispensa qualquer trabalho de composição por parte do poeta.', 'Liberdade métrica não elimina o trabalho de construção do poema.', 'confundir liberdade com ausência de ofício'],
        ],
        explanation: 'Verso livre é o que abandona a métrica fixa. Sem rima, chama-se verso branco — e os dois costumam aparecer juntos no Modernismo.',
      }),
    ],
  }),

  topic({
    slug: 'romantismo-e-realismo',
    name: 'Romantismo e Realismo',
    subject: 'literatura',
    area: 'linguagens',
    summary:
      'Contrastar idealização romântica e análise crítica realista, reconhecendo temas, procedimentos de linguagem e projeto de época em textos do século XIX.',
    difficulty: 'intermediate',
    minutes: 25,
    weight: 83,
    order: 3,
    prerequisites: ['literatura-brasileira'],
    related: ['modernismo-brasileiro', 'brasil-republica'],
    skill: {
      slug: 'contrastar-projetos-estéticos-do-seculo-xix',
      name: 'Contrastar projetos estéticos do século XIX',
      description:
        'Distinguir procedimentos românticos e realistas em um texto e relacioná-los ao contexto histórico e ao projeto literário de cada escola.',
    },
    quick: `**A oposição que organiza tudo**

| | **Romantismo** (1836-1881) | **Realismo/Naturalismo** (1881-1893) |
| --- | --- | --- |
| Olhar | idealiza | analisa e critica |
| Herói | perfeito, nobre de alma | pessoa comum, cheia de falhas |
| Amor | eterno, sublime, sofrido | interesse, conveniência, adultério |
| Foco | emoção, subjetividade | observação, objetividade |
| Sociedade | pano de fundo | objeto de crítica |
| Linguagem | rebuscada, emotiva | precisa, irônica |

**Romantismo — três gerações**

1. **Nacionalista/indianista** — Gonçalves Dias (*Canção do Exílio*, *I-Juca-Pirama*), José de Alencar (*Iracema*, *O Guarani*). O índio como herói nacional idealizado.
2. **Ultrarromântica ou "mal do século"** — Álvares de Azevedo. Morte, tédio, amor impossível, exagero.
3. **Condoreira/social** — Castro Alves, "o poeta dos escravos" (*O Navio Negreiro*). Poesia a serviço da abolição.

**Realismo — o marco de 1881**

*Memórias Póstumas de Brás Cubas*, de **Machado de Assis**. Um defunto narra a própria vida — e isso permite a ele dizer tudo, sem medo do julgamento social. Ironia, digressão, conversa com o leitor.

Outros: *Dom Casmurro* (a dúvida sobre Capitu que o narrador nunca resolve), *O Cortiço*, de Aluísio Azevedo (**Naturalismo**: o meio determina o comportamento).

**Realismo × Naturalismo**

Os dois criticam. A diferença: o Naturalismo trata o ser humano como **caso científico**, determinado por meio, raça e momento, e trabalha com personagens coletivos e instintos. Machado analisa a **consciência**; Aluísio Azevedo, o **ambiente**.

**A chave de leitura de Machado**

O narrador **não é confiável**. Em *Dom Casmurro*, quem conta a história é o marido ciumento. A prova adora perguntar isso.`,
    explanation: {
      title: 'De idealizar a desmontar: o que muda no século XIX',
      body: `### 1. O Romantismo e a construção de um país

O Brasil se torna independente em 1822 e precisa de símbolos próprios. A literatura assume essa tarefa: criar um passado heroico e uma natureza grandiosa que sirvam de identidade.

Daí o **indianismo**. O índio de Alencar e de Gonçalves Dias não é o indígena histórico: é um herói com valores de cavaleiro medieval europeu, transplantado para a floresta. Iracema, "a virgem dos lábios de mel", é idealizada até no nome — anagrama de América.

Isso não é ingenuidade: é **projeto**. Faltava ao país um passado nobre como o da Europa, e ele foi inventado literariamente.

A *Canção do Exílio* ("Minha terra tem palmeiras / Onde canta o Sabiá") é o texto mais parodiado da literatura brasileira justamente por isso — cada geração seguinte reescreve esses versos para discutir o que é o Brasil.

### 2. Da idealização ao mal do século

A segunda geração romântica abandona o país e se volta para dentro. Influenciada por Byron, cultiva o tédio, a morte, o amor impossível e a fuga da realidade. O amor é sempre inalcançável — e quando alcançável, some o interesse.

É a geração mais facilmente reconhecível pelo tom: pessimismo, noite, egocentrismo, exagero.

### 3. A terceira geração: a poesia desce à rua

Castro Alves dirige o mesmo ímpeto emotivo do Romantismo para uma causa concreta: a **abolição**. *O Navio Negreiro* descreve o tumbeiro com imagens grandiosas e indignação crescente.

É ainda Romantismo — a linguagem é exaltada, as imagens são hiperbólicas —, mas o objeto já é social. Essa geração serve de ponte para o que vem depois.

### 4. 1881: Machado desmonta tudo

*Memórias Póstumas de Brás Cubas* começa com uma provocação: "Ao verme que primeiro roeu as frias carnes do meu cadáver dedico como saudosa lembrança estas memórias póstumas."

O narrador está morto. Como não tem nada a perder, pode confessar a mesquinharia, a vaidade e o cálculo que movem a elite do Império — inclusive ele próprio. O livro é curto em capítulos, cheio de digressões e interpela o leitor diretamente.

A frase final resume o projeto: "não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria."

**O contraste com o Romantismo é total:**

- Onde havia herói, há um homem medíocre que se acha superior.
- Onde havia amor eterno, há um caso de adultério movido por conveniência.
- Onde havia emoção, há ironia.

### 5. Dom Casmurro e o narrador não confiável

Bento Santiago conta, na velhice, que foi traído por Capitu com Escobar. Mas **toda a evidência vem dele**, um homem obcecado, que seleciona lembranças e interpreta olhares.

Machado não responde à pergunta. Ele constrói um livro em que o leitor é levado a condenar Capitu e depois percebe que o único acusador é uma testemunha suspeita.

Por isso a resposta correta em provas quase nunca é "Capitu traiu" ou "Capitu não traiu" — é que **o texto não permite decidir**, e essa indecidibilidade é o ponto.

### 6. O Naturalismo e o peso do meio

*O Cortiço*, de Aluísio Azevedo, tem como protagonista quase um coletivo: o próprio cortiço, que "cresce", "ferve", "acorda". As personagens são arrastadas por instintos e pelo ambiente.

A diferença de método fica clara: Machado observa a **consciência** de um indivíduo; o Naturalismo observa **o grupo determinado pelo meio**, com pretensão científica.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — identificar a escola pelo tratamento do amor',
        body: `**Situação:** dois trechos tratam de casamento.

- **Trecho I:** o narrador descreve a amada como "anjo de pureza incomparável, cuja simples presença bastava para redimir-lhe a alma atormentada".
- **Trecho II:** o narrador comenta que se casou porque "era conveniente à sua posição, e porque a moça possuía dote suficiente para dispensar maiores entusiasmos".

Identifique a escola de cada um e justifique.

**Passo 1 — analisar o Trecho I:** a amada é **idealizada** ("anjo", "pureza incomparável"), e o amor tem função redentora. O vocabulário é emotivo e hiperbólico → **Romantismo**.

**Passo 2 — analisar o Trecho II:** o casamento aparece como **cálculo social e econômico** ("conveniente", "dote"). O tom é irônico e distanciado, sem qualquer idealização → **Realismo**.

**Passo 3 — formular o critério geral:** o que distingue não é o tema (casamento nos dois), e sim **o modo de tratá-lo**: idealização versus análise crítica.

**Resposta:** I é romântico; II é realista. E o critério vale para qualquer par de trechos sobre o mesmo assunto.`,
      },
      {
        title: 'Exemplo resolvido 2 — por que Dom Casmurro não tem resposta',
        body: `**Situação:** uma questão pergunta o que o romance *Dom Casmurro* permite concluir sobre a traição de Capitu.

**Passo 1 — identificar quem narra:** Bento Santiago, já velho, amargurado, que assume o apelido de "Casmurro". Ele é personagem e narrador.

**Passo 2 — avaliar as evidências apresentadas:** um olhar "de ressaca", uma semelhança física entre o filho e o amigo Escobar, reações interpretadas por ele. **Nenhuma prova externa**, nenhum outro ponto de vista.

**Passo 3 — perceber a construção:** Machado organiza o livro de modo que o leitor receba apenas a versão de quem acusa. Capitu nunca se defende no texto — ela é sempre descrita.

**Passo 4 — concluir:** o romance **não permite decidir** se houve traição. A pergunta que ele realmente propõe é outra: até que ponto confiamos em quem conta a história?

**Por isso a alternativa correta** costuma ser a que menciona a **ambiguidade** ou a **não confiabilidade do narrador**, e não a que afirma ou nega o adultério.`,
      },
    ],
    mistakes: `**1. Distinguir as escolas pelo tema em vez do tratamento.**
Amor, casamento e morte aparecem nas duas. O que muda é o olhar: idealizado (Romantismo) ou analisado criticamente (Realismo).

**2. Achar que Machado "revela" a traição de Capitu.**
O romance é narrado pelo marido ciumento e não oferece prova independente. A ambiguidade é proposital, e responder "ela traiu" trata a suspeita como fato.

**3. Tratar Realismo e Naturalismo como sinônimos.**
Os dois criticam a sociedade, mas o Naturalismo adota o determinismo científico — meio, raça e momento — e foca no coletivo e no instinto. Machado foca na consciência individual e na ironia.`,
    selfCheck: [
      'Por que o indianismo romântico não retrata o indígena histórico, e que projeto ele atende?',
      'Que mudança de olhar separa o Romantismo do Realismo, usando o tema do casamento como exemplo?',
      'O que significa dizer que o narrador de Dom Casmurro não é confiável?',
      'Qual a diferença de método entre Machado de Assis e o Naturalismo de Aluísio Azevedo?',
      'Por que a terceira geração romântica é considerada uma ponte para o período seguinte?',
    ],
    questions: [
      q({
        slug: 'q-romreal-1',
        stem: 'A idealização do herói, o tom emotivo e a valorização da natureza brasileira como símbolo nacional são características associadas principalmente ao:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento de traços de escola literária',
        seconds: 70,
        errors: ['associar idealização à estética realista'],
        correct: 0,
        options: [
          ['Romantismo.', 'A idealização do herói e da natureza, com forte carga emotiva, integra o projeto romântico de construir símbolos nacionais.'],
          ['Realismo.', 'O Realismo caracteriza-se pela análise crítica e pela recusa da idealização.', 'inverter os projetos estéticos'],
          ['Naturalismo.', 'O Naturalismo enfatiza o determinismo do meio, não a idealização.', 'inverter os projetos estéticos'],
          ['Modernismo.', 'O Modernismo é do século XX e rompe com a idealização acadêmica.', 'errar o período'],
          ['Parnasianismo.', 'O Parnasianismo prioriza rigor formal e objetividade, não a efusão emotiva.', 'errar o projeto estético'],
        ],
        explanation: 'Idealização, emoção e natureza como símbolo nacional são marcas do projeto romântico brasileiro.',
      }),
      q({
        slug: 'q-romreal-2',
        stem: 'Um trecho narra que o protagonista se casou porque a união era conveniente à sua posição social e o dote dispensava maiores entusiasmos, comentário feito em tom irônico pelo narrador. Esse tratamento do tema indica a estética:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação do critério de tratamento temático à identificação da escola',
        seconds: 95,
        errors: ['classificar pela temática em vez do tratamento'],
        correct: 2,
        options: [
          ['Romântica, pois trata de casamento, tema caro ao Romantismo.', 'O tema é comum às duas escolas; o que identifica é o tratamento crítico e irônico.', 'classificar pelo tema'],
          ['Barroca, pelo contraste entre matéria e espírito.', 'Não há a tensão religiosa e o jogo antitético característicos do Barroco.', 'errar o período'],
          ['Realista, pois submete o casamento à análise crítica dos interesses sociais e econômicos envolvidos.', 'O Realismo troca a idealização pela observação dos interesses concretos, e a ironia do narrador confirma esse distanciamento.'],
          ['Árcade, por defender a simplicidade da vida no campo.', 'Não há referência ao ideal pastoril nem à vida campestre.', 'errar o período'],
          ['Ultrarromântica, pela presença do sofrimento amoroso.', 'Não há sofrimento amoroso: há cálculo e indiferença.', 'projetar traço ausente no texto'],
        ],
        explanation: 'Casamento como cálculo social, narrado com ironia e distanciamento, é procedimento realista por excelência.',
        strategy: 'Pergunte se o texto idealiza ou analisa o tema — o critério vale mais que o assunto tratado.',
      }),
      q({
        slug: 'q-romreal-3',
        stem: 'Em Dom Casmurro, toda a suspeita sobre a traição de Capitu é apresentada por Bento Santiago, que narra sua própria história já idoso e ressentido. A leitura crítica mais adequada dessa construção é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'análise do ponto de vista narrativo e de sua confiabilidade',
        seconds: 120,
        errors: ['tomar a versão do narrador como fato comprovado'],
        correct: 3,
        options: [
          ['O romance comprova a traição por meio de evidências objetivas apresentadas ao leitor.', 'As evidências são todas interpretações do próprio narrador, sem confirmação independente.', 'tratar interpretação como prova'],
          ['O romance comprova a inocência de Capitu, que se defende ao longo da narrativa.', 'Capitu não narra nem se defende: ela é sempre descrita pelo marido.', 'inverter a mesma falha de leitura'],
          ['A questão da traição é irrelevante para a estrutura da obra.', 'Ela é central — o que a obra problematiza é a possibilidade de decidi-la.', 'descartar o eixo da obra'],
          ['A obra constrói deliberadamente uma ambiguidade insolúvel, pois o único acusador é um narrador parcial e interessado.', 'Machado organiza a narrativa de modo que o leitor receba apenas a versão de quem acusa, o que torna a conclusão indecidível e desloca a pergunta para a confiabilidade do relato.'],
          ['A ambiguidade decorre de um descuido do autor na construção do enredo.', 'A indecidibilidade é resultado de uma construção narrativa altamente controlada.', 'ler a escolha estética como falha'],
        ],
        explanation: 'O ponto do romance não é o que Capitu fez, e sim o quanto se pode confiar em quem conta a história.',
      }),
      q({
        slug: 'q-romreal-4',
        stem: 'Comparando o Realismo de Machado de Assis e o Naturalismo de Aluísio Azevedo, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre métodos de análise social no século XIX',
        seconds: 140,
        errors: ['tratar Realismo e Naturalismo como a mesma estética'],
        correct: 4,
        options: [
          ['Ambos idealizam os personagens e evitam a crítica social.', 'As duas estéticas rompem com a idealização e assumem a crítica social.', 'inverter o projeto das duas escolas'],
          ['Machado adota o determinismo científico e Aluísio analisa a consciência individual.', 'A atribuição está invertida.', 'inverter os métodos'],
          ['As duas estéticas são idênticas, variando apenas o nome usado pela crítica.', 'Há diferença de método e de foco entre elas.', 'igualar escolas distintas'],
          ['Apenas o Naturalismo pertence ao século XIX.', 'As duas produções são do mesmo período.', 'errar a cronologia'],
          ['Machado investiga a consciência e a ambiguidade do indivíduo, enquanto o Naturalismo enfatiza o determinismo do meio sobre coletividades e instintos.', 'Ambos criticam a sociedade, mas por caminhos distintos: a ironia sobre a consciência individual, de um lado; a observação quase científica do ambiente e do grupo, de outro.'],
        ],
        explanation: 'Mesma crítica social, métodos diferentes: consciência e ironia em Machado; meio, instinto e coletivo no Naturalismo.',
        strategy: 'Verifique se o texto observa uma consciência individual ou um ambiente que determina o grupo.',
      }),
      q({
        slug: 'q-romreal-5',
        stem: 'A Canção do Exílio, de Gonçalves Dias, foi reescrita e parodiada por diversos autores brasileiros ao longo dos séculos XIX e XX. Considerando o projeto literário do Romantismo e a recepção posterior do poema, conclui-se que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre projeto de época, construção de identidade nacional e diálogo entre obras',
        seconds: 165,
        errors: ['tratar as paródias como simples imitação sem função crítica'],
        correct: 1,
        options: [
          ['As reescritas apenas repetem o poema original, sem acrescentar sentido.', 'As paródias modificam o texto justamente para discutir criticamente a imagem de Brasil que ele fixou.', 'negar a função crítica da paródia'],
          ['O poema fixou uma imagem idealizada do Brasil, e as reescritas posteriores a retomam para questionar ou atualizar essa imagem, transformando o texto em um espaço de debate sobre identidade nacional.', 'O original constrói uma pátria idealizada a partir da saudade; as gerações seguintes, sobretudo os modernistas, reescrevem os versos para confrontar essa idealização com o país concreto.'],
          ['O poema descreve com exatidão científica a fauna e a flora brasileiras.', 'A descrição é idealizada e seletiva, a serviço de um efeito afetivo.', 'confundir idealização com descrição objetiva'],
          ['As paródias demonstram que o poema perdeu importância na literatura brasileira.', 'Ser continuamente reescrito é sinal de centralidade, não de perda de importância.', 'inverter o sentido da recepção'],
          ['O texto pertence ao Realismo, por tratar criticamente a realidade nacional.', 'O poema é romântico e idealizante; a crítica vem das reescritas posteriores.', 'errar a escola do texto original'],
        ],
        explanation: 'O poema criou um símbolo nacional idealizado; as paródias posteriores usam esse símbolo para discutir o Brasil real.',
      }),
      q({
        slug: 'q-romreal-rec-1',
        stem: 'A publicação de Memórias Póstumas de Brás Cubas, em 1881, é considerada o marco inicial de qual escola literária no Brasil?',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'associação entre obra e marco de periodização',
        seconds: 60,
        recovery: true,
        errors: ['confundir a obra com o início do Modernismo'],
        correct: 2,
        options: [
          ['Romantismo.', 'O Romantismo brasileiro se inicia em 1836 e a obra de Machado rompe com ele.', 'inverter a periodização'],
          ['Modernismo.', 'O Modernismo se inicia em 1922, com a Semana de Arte Moderna.', 'errar o período'],
          ['Realismo.', 'A publicação de Memórias Póstumas de Brás Cubas, em 1881, marca o início do Realismo no Brasil.'],
          ['Barroco.', 'O Barroco brasileiro é do século XVII.', 'errar o período'],
          ['Arcadismo.', 'O Arcadismo é do século XVIII.', 'errar o período'],
        ],
        explanation: 'Memórias Póstumas de Brás Cubas (1881) inaugura o Realismo brasileiro, com narrador defunto, ironia e crítica social.',
      }),
    ],
  }),
];

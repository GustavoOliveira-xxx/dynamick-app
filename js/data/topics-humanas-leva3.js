import { question as q, topic } from './leva8-factory.js';

export const HUMANAS_TOPICS_LEVA_3 = [
  topic({
    slug: 'brasil-colonia-e-escravidao',
    name: 'Brasil Colônia e escravidão',
    subject: 'historia',
    area: 'ciencias-humanas',
    summary:
      'Compreender o pacto colonial, a economia do açúcar e da mineração, a escravidão africana e indígena e as formas de resistência que marcaram três séculos de colonização.',
    difficulty: 'intermediate',
    minutes: 26,
    weight: 88,
    order: 3,
    prerequisites: ['brasil-republica'],
    related: ['industrializacao', 'cultura-e-identidade'],
    skill: {
      slug: 'analisar-estruturas-e-resistencias-do-brasil-colonial',
      name: 'Analisar estruturas e resistências do Brasil colonial',
      description:
        'Relacionar pacto colonial, trabalho compulsório e resistência, avaliando permanências dessas estruturas na sociedade brasileira.',
    },
    quick: `**A lógica do sistema colonial**

**Pacto colonial (exclusivo metropolitano):** a colônia só comercia com a metrópole, comprando caro e vendendo barato. A finalidade da colônia é **gerar lucro para Portugal**, não se desenvolver.

**Plantation:** o modelo produtivo do açúcar — **latifúndio + monocultura + escravidão + exportação**. Os quatro elementos juntos.

**As fases econômicas**

| Período | Atividade | Região |
| --- | --- | --- |
| 1500-1530 | pau-brasil (escambo) | litoral |
| 1530-1700 | **açúcar** | Nordeste (Pernambuco, Bahia) |
| 1690-1780 | **ouro e diamantes** | Minas Gerais |
| séc. XVIII-XIX | café (já no fim do período) | Sudeste |

**Escravidão**

- **Indígena:** predominante no início; reduzida pela resistência, pelas epidemias e pela oposição jesuítica.
- **Africana:** torna-se a base do sistema. Cerca de **4,8 milhões** de africanos escravizados desembarcaram no Brasil — o maior contingente do mundo.
- O tráfico era, em si, um dos negócios mais lucrativos do império português.

**Resistência — nunca houve passividade**

- **Quilombos** — Palmares (séc. XVII), liderado por Zumbi, durou quase cem anos.
- Fugas, revoltas urbanas (**Revolta dos Malês**, 1835), formação de irmandades.
- Resistência cultural: capoeira, religiões de matriz africana, jongo.
- Sabotagem cotidiana, aborto, suicídio, compra de alforria.

**Administração**

Capitanias hereditárias (fracassam em quase todas) → Governo-Geral (1549) → Câmaras municipais dominadas pelos "homens bons" (grandes proprietários).

**Mineração muda o país**

Ouro → interiorização, crescimento urbano, chegada de população, aumento do controle fiscal (quinto, derrama) → tensões que levam à **Inconfidência Mineira** (1789).`,
    explanation: {
      title: 'Como o sistema funcionava e o que dele permaneceu',
      body: `### 1. A colônia não era uma extensão de Portugal

Na lógica **mercantilista**, riqueza é acúmulo de metais preciosos e saldo comercial favorável. A colônia existe para alimentar esse saldo. Por isso Portugal proibiu manufaturas no Brasil (alvará de 1785), controlou o comércio e tributou a produção.

Isso explica um ponto que a prova cobra com frequência: o Brasil colonial **não era pobre**, ele era **drenado**. A riqueza do açúcar e do ouro existiu — e foi transferida.

### 2. Por que a escravidão africana se tornou a base

A substituição do trabalho indígena pelo africano costuma ser explicada de forma simplista. Os fatores reais, combinados:

- **Lucro do tráfico:** comerciantes portugueses já operavam na África; o africano escravizado era mercadoria cara, e o tráfico movimentava o próprio sistema.
- **Epidemias:** populações indígenas foram devastadas por doenças para as quais não tinham imunidade.
- **Resistência e fuga:** o indígena conhecia o território e fugia com mais facilidade.
- **Pressão jesuítica** contra a escravização indígena (mas não contra a africana).

Nada disso tem a ver com "aptidão" — explicação racista que a historiografia rejeitou e que o ENEM cobra como alternativa errada.

### 3. A sociedade colonial

Não era uma sociedade de castas rígidas nem uma democracia racial. Havia:

- **Grandes proprietários** ("homens bons") — controlavam terra, escravizados e as câmaras municipais.
- **Camadas intermediárias** — artesãos, pequenos comerciantes, funcionários, mestiços livres.
- **Escravizados** — sem direitos jurídicos, mas com formas de negociação e resistência.
- **Libertos** — livres, porém marcados pela origem e com direitos restritos.

A mineração ampliou muito a camada intermediária e urbana, o que ajuda a entender por que as tensões políticas do século XVIII nascem em Minas.

### 4. Resistência: quilombo não era isolamento

Palmares, na serra da Barriga (atual Alagoas), chegou a reunir milhares de pessoas e resistiu por quase um século, até ser destruído por bandeirantes liderados por Domingos Jorge Velho, em 1694-1695.

Um erro comum é imaginar quilombos como refúgios isolados. Eles **comerciavam** com povoados vizinhos, produziam excedente agrícola e tinham organização política própria. Eram uma alternativa concreta ao sistema — e por isso ameaçadores.

A **Revolta dos Malês** (Salvador, 1835), organizada por africanos muçulmanos alfabetizados em árabe, mostra outra coisa: havia planejamento, escrita e articulação política entre os escravizados.

### 5. Permanências

O ENEM raramente para no passado. Ele pergunta o que ficou:

- **Concentração fundiária** — a estrutura do latifúndio atravessou a Colônia, o Império e a República.
- **Desigualdade racial** — a abolição (1888) veio sem terra, sem indenização e sem política de inclusão.
- **Economia voltada à exportação de produtos primários** — padrão que se repete em novos ciclos.
- **Cultura afro-brasileira** — construída na resistência e hoje reconhecida como patrimônio.

Questões sobre cotas, demarcação de terras quilombolas e desigualdade costumam exigir essa ponte entre passado colonial e presente.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — por que o açúcar exigia aquele arranjo exato',
        body: `**Situação:** um texto descreve o engenho colonial como unidade de grande extensão, com produção voltada a um único produto, mão de obra escravizada e destino externo. Por que essa combinação específica?

**Passo 1 — o destino é externo:** o açúcar era vendido na Europa, não consumido internamente. Logo, a produção precisava ser em **grande escala** para valer o transporte transatlântico.

**Passo 2 — a escala exige terra:** daí o **latifúndio**.

**Passo 3 — a escala exige trabalho intenso e contínuo:** o corte e a moagem da cana são atividades pesadas e sazonalmente concentradas. Em uma colônia com terra disponível, ninguém trabalharia nessas condições por salário — havia a alternativa de ocupar terra. A solução adotada foi o **trabalho compulsório**.

**Passo 4 — por que monocultura:** dedicar a terra ao produto rentável maximiza o lucro exportador, ainda que torne a colônia dependente de importar alimentos.

**Conclusão:** latifúndio, monocultura, escravidão e exportação não são quatro características soltas — são **um sistema**, em que cada peça sustenta a outra. É assim que a questão espera que você explique.`,
      },
      {
        title: 'Exemplo resolvido 2 — ler Palmares como projeto, não como fuga',
        body: `**Situação:** uma questão apresenta Palmares como comunidade que resistiu por quase um século, com agricultura, comércio com povoados vizinhos e organização política própria. O que essa descrição permite concluir?

**Passo 1 — descartar a leitura de isolamento:** se havia comércio com vizinhos, não era um esconderijo fechado. Havia inserção econômica regional.

**Passo 2 — observar a duração:** quase cem anos e sucessivas expedições fracassadas indicam **capacidade militar e organização**, não sobrevivência precária.

**Passo 3 — identificar o que estava em jogo:** um território fora do controle senhorial, produzindo e se governando, **contestava na prática** a necessidade do sistema escravista. Essa é a ameaça real.

**Passo 4 — concluir:** Palmares deve ser lido como **projeto alternativo de organização social**, e não apenas como reação defensiva.

**Alternativa que costuma aparecer e está errada:** a que descreve os quilombos como grupos isolados, sem produção própria, sobrevivendo de assaltos. A historiografia atual mostra o contrário.`,
      },
    ],
    mistakes: `**1. Explicar a escravidão africana por suposta "aptidão física".**
Trata-se de argumento racista sem base histórica. As razões foram econômicas (lucro do tráfico), demográficas (epidemias) e políticas (resistência indígena e pressão jesuítica).

**2. Dizer que a colônia era pobre.**
Ela produziu enorme riqueza — que foi transferida à metrópole pelo pacto colonial. A diferença entre "não produzir" e "não reter" é o que a questão costuma cobrar.

**3. Imaginar quilombos como refúgios isolados e improvisados.**
Palmares tinha agricultura, comércio, organização política e defesa militar. Era uma alternativa concreta ao sistema, e foi combatida por isso.`,
    selfCheck: [
      'Explique o pacto colonial e por que ele torna insuficiente dizer que "a colônia era pobre".',
      'Por que latifúndio, monocultura, escravidão e exportação formavam um sistema, e não uma lista de características?',
      'Quais fatores explicam a substituição do trabalho indígena pelo africano?',
      'O que a organização de Palmares revela sobre a resistência à escravidão?',
      'Cite duas permanências do período colonial na sociedade brasileira atual e explique cada uma.',
    ],
    questions: [
      q({
        slug: 'q-bracol-1',
        stem: 'O chamado pacto colonial, ou exclusivo metropolitano, consistia na regra segundo a qual:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'definição do mecanismo central do sistema colonial',
        seconds: 75,
        errors: ['confundir exclusivo metropolitano com livre-comércio'],
        correct: 1,
        options: [
          ['A colônia podia comercializar livremente com qualquer nação europeia.', 'O livre-comércio é justamente o que o exclusivo metropolitano proibia.', 'inverter a regra'],
          ['A colônia só podia comercializar com a metrópole, comprando dela e vendendo a ela em condições vantajosas para Portugal.', 'O monopólio comercial garantia à metrópole comprar barato a produção colonial e vender caro os produtos manufaturados.'],
          ['A metrópole se comprometia a industrializar a colônia.', 'Portugal proibiu manufaturas na colônia, em vez de incentivá-las.', 'inverter o objetivo do sistema'],
          ['Os colonos elegiam representantes com poder de decisão em Lisboa.', 'Não havia representação política colonial com esse poder.', 'atribuir participação inexistente'],
          ['A colônia ficava isenta de tributos sobre a produção.', 'A tributação era intensa, como mostram o quinto e a derrama.', 'negar a tributação'],
        ],
        explanation: 'O exclusivo metropolitano é o monopólio comercial que garantia a transferência de riqueza da colônia para a metrópole.',
      }),
      q({
        slug: 'q-bracol-2',
        stem: 'A produção açucareira colonial combinava grandes propriedades, cultivo de um único produto, trabalho escravizado e destino externo da produção. Essa combinação é explicada porque:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação da lógica do sistema plantation',
        seconds: 100,
        errors: ['tratar as características como independentes entre si'],
        correct: 4,
        options: [
          ['As quatro características eram independentes e poderiam existir isoladamente.', 'Elas formam um sistema em que cada elemento sustenta os demais.', 'desconectar os elementos do sistema'],
          ['O objetivo principal era abastecer o mercado interno da colônia.', 'A produção era voltada à exportação para a Europa.', 'inverter o destino da produção'],
          ['A monocultura resultava da falta de conhecimento agrícola dos colonos.', 'A escolha atendia à lógica de maximizar o lucro exportador.', 'atribuir a escolha à ignorância'],
          ['A escravidão foi adotada por não haver trabalhadores disponíveis na Europa.', 'A questão não era disponibilidade, e sim o custo e as condições do trabalho exigido.', 'simplificar a causa do trabalho compulsório'],
          ['A venda no mercado europeu exigia produção em larga escala, o que demandava muita terra e trabalho intenso e contínuo, obtido de forma compulsória.', 'O destino externo impõe escala; a escala impõe latifúndio e grande volume de trabalho, suprido pelo trabalho escravizado — as peças se encaixam como sistema.'],
        ],
        explanation: 'Plantation é um arranjo articulado: exportação exige escala, escala exige terra e trabalho, e o trabalho foi obtido por coerção.',
        strategy: 'Pergunte sempre "para quem se produzia" — o destino da produção explica a organização interna.',
      }),
      q({
        slug: 'q-bracol-3',
        stem: 'Pesquisas históricas mostram que o Quilombo dos Palmares mantinha agricultura própria, realizava trocas comerciais com povoados vizinhos e possuía organização política e militar, resistindo por quase um século. Essa caracterização permite concluir que os quilombos:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de evidências historiográficas sobre resistência',
        seconds: 120,
        errors: ['reduzir os quilombos a esconderijos isolados'],
        correct: 0,
        options: [
          ['Constituíam formas organizadas de vida social e econômica, funcionando como alternativa concreta ao sistema escravista.', 'Produção própria, comércio regional e estrutura política indicam um projeto de organização social, e não mera fuga defensiva.'],
          ['Eram grupos isolados que sobreviviam exclusivamente de assaltos a fazendas.', 'A existência de agricultura e comércio contradiz essa leitura.', 'manter a imagem do isolamento'],
          ['Tinham existência breve e sem impacto sobre a ordem colonial.', 'Palmares durou quase cem anos e mobilizou sucessivas expedições militares contra ele.', 'minimizar a duração e o impacto'],
          ['Eram tolerados pelas autoridades coloniais por não representarem ameaça.', 'Foram alvo de repetidas expedições de destruição, inclusive a de Domingos Jorge Velho.', 'negar o conflito'],
          ['Reproduziam internamente o sistema de plantation exportadora.', 'A produção quilombola era voltada à subsistência e às trocas regionais.', 'projetar o sistema combatido sobre a resistência'],
        ],
        explanation: 'Os quilombos eram comunidades organizadas e inseridas na economia regional — daí sua força e a violência da repressão.',
      }),
      q({
        slug: 'q-bracol-4',
        stem: 'Comparando a economia açucareira do Nordeste e a mineração em Minas Gerais no período colonial, é correto afirmar que a mineração:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre ciclos econômicos e seus efeitos sociais',
        seconds: 140,
        errors: ['supor que os dois ciclos tiveram os mesmos efeitos sociais'],
        correct: 2,
        options: [
          ['Manteve a população concentrada no litoral, como no ciclo do açúcar.', 'A mineração provocou justamente a interiorização do povoamento.', 'inverter o efeito territorial'],
          ['Dispensou o trabalho escravizado, por exigir mão de obra especializada.', 'A mineração empregou intensamente trabalho escravizado.', 'negar o trabalho compulsório'],
          ['Promoveu a interiorização do povoamento, o crescimento de núcleos urbanos e a ampliação das camadas médias, além de intensificar o controle fiscal da metrópole.', 'O ouro deslocou população para o interior, criou vilas com vida urbana e comercial mais diversificada e levou a metrópole a reforçar a cobrança de tributos, como o quinto e a derrama.'],
          ['Reduziu a tributação metropolitana sobre a colônia.', 'O período é marcado pelo aumento e pelo rigor da cobrança de tributos.', 'inverter a política fiscal'],
          ['Eliminou a estrutura de grande propriedade no restante da colônia.', 'A grande propriedade permaneceu como estrutura dominante.', 'supor ruptura inexistente'],
        ],
        explanation: 'A mineração interiorizou o povoamento, urbanizou parte da colônia e intensificou a pressão fiscal — daí as tensões que levam à Inconfidência.',
        strategy: 'Compare os ciclos por três eixos: onde ocupam o território, que sociedade produzem e como a metrópole os tributa.',
      }),
      q({
        slug: 'q-bracol-5',
        stem: 'A abolição da escravidão no Brasil, em 1888, ocorreu sem que fossem adotadas medidas de acesso à terra, indenização ou políticas de inserção da população recém-libertada. Relacionando esse fato à estrutura colonial e à sociedade brasileira posterior, conclui-se que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre estrutura colonial, abolição e desigualdades contemporâneas',
        seconds: 170,
        errors: ['tratar a abolição como ponto final da desigualdade racial'],
        correct: 3,
        options: [
          ['A ausência de políticas foi irrelevante, pois a liberdade jurídica bastou para equalizar as condições sociais.', 'Liberdade formal sem acesso a terra, renda ou educação não elimina desigualdades estruturais.', 'confundir igualdade formal com igualdade material'],
          ['A desigualdade racial brasileira teve origem apenas no século XX, sem relação com o período colonial.', 'As estruturas de concentração fundiária e exclusão remontam ao período colonial.', 'desconectar presente e passado'],
          ['A concentração de terras foi resolvida logo após a abolição, com distribuição aos libertos.', 'Não houve distribuição de terras aos libertos; a concentração fundiária permaneceu.', 'inventar política inexistente'],
          ['A forma como a abolição se deu contribuiu para a permanência de desigualdades sociais e raciais, articulando estruturas coloniais a problemas contemporâneos.', 'Sem terra, sem reparação e sem políticas de inclusão, a população liberta permaneceu em posição subalterna, o que ajuda a explicar desigualdades persistentes e fundamenta debates atuais sobre políticas afirmativas.'],
          ['O fim da escravidão significou o fim imediato do trabalho compulsório em todas as suas formas no país.', 'Formas de trabalho análogo à escravidão persistiram e ainda são objeto de fiscalização.', 'supor ruptura completa'],
        ],
        explanation: 'A abolição sem reparação preservou a estrutura fundiária e social herdada da Colônia — base histórica do debate atual sobre desigualdade racial.',
      }),
      q({
        slug: 'q-bracol-rec-1',
        stem: 'O sistema de capitanias hereditárias, adotado por Portugal na década de 1530, caracterizava-se por:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento da forma inicial de administração colonial',
        seconds: 65,
        recovery: true,
        errors: ['confundir capitanias com governo-geral'],
        correct: 1,
        options: [
          ['Administração direta e centralizada pela Coroa portuguesa.', 'A administração centralizada só vem com o Governo-Geral, em 1549.', 'trocar a forma de administração'],
          ['Divisão do território em faixas doadas a particulares, responsáveis por povoar e explorar a área por conta própria.', 'A Coroa transferiu a donatários o custo e o encargo da ocupação, mantendo a propriedade última da terra.'],
          ['Eleição de governadores pelos colonos de cada região.', 'Não havia eleição de governadores; os donatários eram nomeados pelo rei.', 'atribuir participação inexistente'],
          ['Distribuição igualitária de terras entre colonos e indígenas.', 'Não houve distribuição igualitária, e os povos indígenas foram despojados de seus territórios.', 'idealizar o processo'],
          ['Proibição total de qualquer atividade econômica no território.', 'O objetivo era justamente promover a exploração econômica.', 'inverter a finalidade'],
        ],
        explanation: 'Capitanias hereditárias transferiram a particulares o custo da ocupação; o fracasso de quase todas levou ao Governo-Geral de 1549.',
      }),
    ],
  }),

  topic({
    slug: 'guerras-mundiais-e-guerra-fria',
    name: 'Guerras Mundiais e Guerra Fria',
    subject: 'historia',
    area: 'ciencias-humanas',
    summary:
      'Relacionar imperialismo, totalitarismos e disputa bipolar, compreendendo causas, consequências e a reorganização geopolítica do século XX.',
    difficulty: 'intermediate',
    minutes: 27,
    weight: 87,
    order: 4,
    prerequisites: ['industrializacao'],
    related: ['globalizacao', 'cidadania-e-direitos'],
    skill: {
      slug: 'relacionar-conflitos-mundiais-e-reorganizacao-geopolitica',
      name: 'Relacionar conflitos mundiais e reorganização geopolítica',
      description:
        'Explicar causas e desdobramentos das guerras mundiais e da Guerra Fria, articulando disputa econômica, ideologia e ordem internacional.',
    },
    quick: `**Primeira Guerra (1914-1918)**

Causas de fundo: **imperialismo** (disputa por colônias e mercados), corrida armamentista, nacionalismos, sistema de alianças. O atentado de Sarajevo foi o **estopim**, não a causa.

Novidades: guerra de trincheiras, armas químicas, mobilização total da economia.

**Tratado de Versalhes (1919):** culpa e reparações pesadíssimas à Alemanha, perda de território, limitação militar. Criou a **humilhação** que o nazismo soube explorar.

**Entreguerras**

Crise de 1929 → desemprego em massa → descrédito da democracia liberal → ascensão de regimes totalitários.

**Totalitarismos**

| | Fascismo (Itália) | Nazismo (Alemanha) | Stalinismo (URSS) |
| --- | --- | --- | --- |
| Base | nacionalismo, corporativismo | nacionalismo + **racismo de Estado** | partido único, economia estatal |
| Comum | partido único, culto ao líder, propaganda, terror, supressão de direitos | | |

**Segunda Guerra (1939-1945)**

Início: invasão da Polônia. Fim: rendição alemã (maio/1945) e bombas atômicas sobre Hiroshima e Nagasaki (agosto/1945).

**Holocausto:** extermínio sistemático de cerca de **6 milhões de judeus**, além de ciganos, eslavos, pessoas com deficiência, homossexuais e opositores.

Consequências: **ONU** (1945), **Declaração Universal dos Direitos Humanos** (1948), descolonização da Ásia e da África, mundo bipolar.

**Guerra Fria (1947-1991)**

EUA (capitalismo) × URSS (socialismo). **Guerra "fria"** porque não houve confronto militar direto entre as duas potências — mas houve guerras por procuração (Coreia, Vietnã, Afeganistão), corrida armamentista e espacial, espionagem.

Marcos: Plano Marshall, OTAN × Pacto de Varsóvia, Muro de Berlim (1961-1989), crise dos mísseis (1962), fim da URSS (1991).`,
    explanation: {
      title: 'Do imperialismo à bipolaridade: a lógica dos conflitos do século XX',
      body: `### 1. Estopim não é causa

A distinção mais cobrada sobre a Primeira Guerra. O assassinato do arquiduque Francisco Ferdinando em Sarajevo, em junho de 1914, desencadeou a guerra — mas as tensões já estavam montadas:

- **Imperialismo:** Alemanha e Itália se unificaram tarde e chegaram atrasadas à partilha da África e da Ásia. Queriam repartição.
- **Rivalidade econômica:** a indústria alemã ameaçava a primazia britânica.
- **Nacionalismos:** revanchismo francês pela Alsácia-Lorena, pan-eslavismo nos Bálcãs.
- **Alianças:** Tríplice Aliança × Tríplice Entente transformaram um conflito local em continental.

Responder "a guerra foi causada pelo atentado" é o erro clássico.

### 2. Versalhes e a ponte para 1939

O Tratado de Versalhes atribuiu à Alemanha a culpa exclusiva, impôs reparações impagáveis, tomou territórios e limitou suas forças armadas.

Combine isso com a crise de 1929 — hiperinflação, desemprego de milhões — e se tem o terreno em que Hitler ergueu seu discurso: humilhação nacional, busca de culpados internos (sobretudo os judeus) e promessa de restaurar a grandeza alemã.

**A lição historiográfica:** a Segunda Guerra não é um evento isolado, e sim o desdobramento das condições deixadas pela primeira. Alguns historiadores falam em uma "guerra de trinta anos" do século XX.

### 3. O que caracteriza um regime totalitário

Não basta ser autoritário. O totalitarismo pretende controlar **toda** a vida social:

- partido único fundido ao Estado;
- **culto à personalidade** do líder;
- propaganda e controle da informação e da educação;
- polícia política e terror contra opositores;
- supressão de eleições livres, imprensa livre e organização autônoma;
- mobilização permanente da população.

Fascismo e nazismo compartilham nacionalismo extremo e anticomunismo; o nazismo acrescenta o **racismo de Estado**, que leva ao Holocausto. O stalinismo difere na base ideológica e econômica, mas coincide nos métodos de controle e repressão.

### 4. Direitos humanos como resposta

O Holocausto e a escala da destruição levaram à criação da **ONU** (1945) e à **Declaração Universal dos Direitos Humanos** (1948).

A ideia central: existem direitos que pertencem à pessoa **pela simples condição humana**, e que nenhum Estado pode suprimir legitimamente — nem mesmo por decisão de maioria.

Esse é o ponto de ligação entre História e Filosofia/Sociologia nas provas, e explica por que questões sobre o tema costumam terminar em discussão sobre cidadania e universalidade de direitos.

### 5. Por que a Guerra Fria foi "fria"

Não houve guerra direta entre EUA e URSS porque ambos tinham armas nucleares. A **destruição mútua assegurada** funcionou como dissuasão: atacar significaria ser destruído também.

A disputa se deu, então, em outros terrenos:

- **Conflitos por procuração:** Coreia, Vietnã, Afeganistão, América Central.
- **Corridas:** armamentista, espacial (Sputnik em 1957; chegada à Lua em 1969).
- **Disputa ideológica e cultural**, espionagem, apoio a golpes e a governos alinhados — inclusive na América Latina.

O Muro de Berlim (1961) tornou-se o símbolo mais visível da divisão; sua queda, em 1989, antecipou o fim da URSS, em 1991.

### 6. O que mudou depois de 1991

O fim da bipolaridade abriu debates que seguem vivos: hegemonia dos EUA, expansão da globalização econômica, surgimento de novas potências e conflitos regionais antes contidos pela lógica bipolar. Questões sobre globalização e geopolítica atual quase sempre partem daqui.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — separar estopim de causas estruturais',
        body: `**Situação:** uma questão apresenta o atentado de Sarajevo e pergunta o que explica a eclosão da Primeira Guerra Mundial.

**Passo 1 — classificar o evento citado:** um assassinato político em junho de 1914. É um **acontecimento pontual**.

**Passo 2 — perguntar por que ele teve alcance mundial:** um atentado só provoca uma guerra continental se já existir um arranjo que o transforme nisso. Esse arranjo era o **sistema de alianças**, que obrigava cada país a entrar em defesa dos parceiros.

**Passo 3 — listar as tensões acumuladas:** disputa imperialista por colônias e mercados, rivalidade industrial anglo-alemã, nacionalismos e revanchismos, corrida armamentista.

**Passo 4 — formular a resposta:** Sarajevo foi o **estopim**; as causas foram as **disputas imperialistas e o sistema de alianças** que converteram um incidente regional em guerra mundial.

**A alternativa armadilha:** a que apresenta o atentado como causa. Ela descreve corretamente o fato e erra na explicação.`,
      },
      {
        title: 'Exemplo resolvido 2 — por que uma guerra sem batalha direta',
        body: `**Situação:** um texto afirma que, entre 1947 e 1991, EUA e URSS mantiveram forte hostilidade sem nunca travarem confronto militar direto entre si, embora tenham participado de guerras em outros países. Explique.

**Passo 1 — identificar o fator decisivo:** ambos possuíam arsenal nuclear capaz de destruir o adversário mesmo após ser atacado.

**Passo 2 — nomear o mecanismo:** **destruição mútua assegurada** — atacar significaria garantir a própria destruição. O resultado é a dissuasão.

**Passo 3 — explicar onde a disputa aconteceu:** em terrenos indiretos — conflitos por procuração (Coreia, Vietnã, Afeganistão), corrida armamentista e espacial, propaganda, espionagem e apoio a governos alinhados.

**Passo 4 — concluir:** "fria" não significa pacífica. Houve milhões de mortos em conflitos periféricos; o que não houve foi guerra **direta** entre as duas superpotências.

**Erro comum:** interpretar "Guerra Fria" como ausência de violência no período. A alternativa correta costuma destacar exatamente o caráter indireto do confronto.`,
      },
    ],
    mistakes: `**1. Confundir estopim com causa.**
O atentado de Sarajevo deflagrou a Primeira Guerra; as causas foram imperialismo, nacionalismos, corrida armamentista e alianças.

**2. Achar que "Guerra Fria" significa período sem conflitos armados.**
Não houve guerra direta entre EUA e URSS, mas houve guerras sangrentas por procuração — Coreia, Vietnã, Afeganistão — e intervenções em vários continentes.

**3. Tratar o nazismo apenas como um autoritarismo comum.**
Além do partido único e do terror, o nazismo tem o racismo como política de Estado, o que conduz ao extermínio sistemático do Holocausto. Apagar esse traço distorce o fenômeno.`,
    selfCheck: [
      'Qual a diferença entre o estopim e as causas da Primeira Guerra Mundial?',
      'Como o Tratado de Versalhes e a crise de 1929 ajudam a explicar a ascensão do nazismo?',
      'O que caracteriza um regime totalitário, além de ser autoritário?',
      'Por que a Guerra Fria não se transformou em guerra direta entre as superpotências?',
      'Que relação existe entre o Holocausto e a Declaração Universal dos Direitos Humanos?',
    ],
    questions: [
      q({
        slug: 'q-gmgf-1',
        stem: 'Entre as causas estruturais da Primeira Guerra Mundial, destaca-se:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de causas de longo prazo',
        seconds: 75,
        errors: ['apontar o estopim como causa estrutural'],
        correct: 2,
        options: [
          ['O assassinato do arquiduque em Sarajevo.', 'Esse episódio foi o estopim imediato, não uma causa estrutural.', 'confundir estopim com causa'],
          ['A criação da Organização das Nações Unidas.', 'A ONU foi criada em 1945, após a Segunda Guerra.', 'errar a cronologia'],
          ['A disputa imperialista por colônias, mercados e matérias-primas entre as potências europeias.', 'A concorrência por territórios e mercados, somada a nacionalismos e alianças, acumulou as tensões que a guerra veio expressar.'],
          ['A queda do Muro de Berlim.', 'O Muro caiu em 1989, no fim da Guerra Fria.', 'errar a cronologia'],
          ['A adoção do Plano Marshall pelos Estados Unidos.', 'O Plano Marshall é de 1947, no contexto do pós-Segunda Guerra.', 'errar a cronologia'],
        ],
        explanation: 'As causas estruturais são imperialismo, nacionalismos, corrida armamentista e sistema de alianças; Sarajevo foi o estopim.',
      }),
      q({
        slug: 'q-gmgf-2',
        stem: 'A relação entre o Tratado de Versalhes, a crise econômica de 1929 e a ascensão do nazismo na Alemanha pode ser explicada porque:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'encadeamento entre condições econômicas, políticas e ascensão de regimes',
        seconds: 105,
        errors: ['isolar a ascensão do nazismo de seu contexto econômico'],
        correct: 3,
        options: [
          ['O tratado beneficiou a economia alemã, o que fortaleceu partidos de oposição.', 'O tratado impôs reparações pesadas e perdas territoriais à Alemanha.', 'inverter o efeito do tratado'],
          ['A crise de 1929 atingiu apenas os Estados Unidos, sem efeitos na Europa.', 'A crise se espalhou mundialmente, com forte impacto na Alemanha.', 'restringir o alcance da crise'],
          ['O nazismo chegou ao poder por invasão militar estrangeira.', 'Hitler chegou ao poder por meios institucionais, em um contexto de crise da democracia de Weimar.', 'alterar a forma de ascensão'],
          ['As imposições do tratado alimentaram um sentimento de humilhação nacional que, somado ao desemprego em massa após 1929, permitiu ao nazismo mobilizar apoio com promessas de restauração e com a busca de culpados internos.', 'A combinação de crise econômica profunda e ressentimento nacional criou a base social para um discurso autoritário, nacionalista e persecutório.'],
          ['A democracia de Weimar era sólida e foi derrubada sem apoio popular.', 'Weimar enfrentava fragilidade institucional e perda de legitimidade em meio à crise.', 'idealizar a estabilidade do período'],
        ],
        explanation: 'Humilhação de Versalhes + colapso econômico de 1929 = terreno social para o discurso nazista de restauração e perseguição.',
        strategy: 'Encadeie condição econômica, crise de legitimidade e discurso político antes de julgar as alternativas.',
      }),
      q({
        slug: 'q-gmgf-3',
        stem: 'Um texto afirma que, entre 1947 e 1991, Estados Unidos e União Soviética mantiveram intensa hostilidade sem jamais travar confronto militar direto entre si, embora tenham apoiado lados opostos em guerras na Coreia, no Vietnã e no Afeganistão. Dessa informação conclui-se que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação do caráter indireto do conflito bipolar',
        seconds: 125,
        errors: ['ler "guerra fria" como ausência de violência'],
        correct: 0,
        options: [
          ['O confronto se deu de forma indireta, por meio de conflitos periféricos, corrida armamentista e disputa ideológica, sem guerra direta entre as superpotências.', 'A posse de arsenais nucleares tornava o confronto direto inviável, deslocando a disputa para guerras por procuração e outras frentes.'],
          ['O período foi de paz mundial, sem conflitos armados relevantes.', 'Houve guerras com milhões de mortos ao longo de todo o período.', 'confundir ausência de guerra direta com paz'],
          ['As duas potências mantinham cooperação militar permanente.', 'A relação era de rivalidade sistemática, marcada por blocos militares opostos.', 'inverter a natureza da relação'],
          ['A ausência de confronto direto decorreu da inexistência de armas nucleares no período.', 'Foi justamente a existência dessas armas que inviabilizou o confronto direto.', 'inverter o fator decisivo'],
          ['Os conflitos citados não tiveram relação com a disputa bipolar.', 'Coreia, Vietnã e Afeganistão são exemplos clássicos de guerras por procuração.', 'desconectar os conflitos do contexto'],
        ],
        explanation: 'A dissuasão nuclear impediu o confronto direto e deslocou a disputa para conflitos periféricos e outras arenas.',
      }),
      q({
        slug: 'q-gmgf-4',
        stem: 'Comparando os regimes fascista italiano e nazista alemão, é correto afirmar que ambos compartilhavam partido único, culto ao líder e repressão a opositores, mas o nazismo distinguia-se por:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre regimes totalitários quanto a fundamentos ideológicos',
        seconds: 140,
        errors: ['tratar fascismo e nazismo como regimes idênticos'],
        correct: 1,
        options: [
          ['Defender a democracia parlamentar como forma de governo.', 'Ambos suprimiram instituições democráticas.', 'atribuir traço oposto ao regime'],
          ['Adotar o racismo como política de Estado, o que conduziu ao extermínio sistemático de judeus e de outros grupos.', 'O antissemitismo e a doutrina de superioridade racial estavam no centro do projeto nazista e resultaram no Holocausto.'],
          ['Rejeitar o nacionalismo como fundamento político.', 'O nacionalismo extremo é central nos dois regimes.', 'atribuir traço oposto ao regime'],
          ['Abrir mão da propaganda estatal e do controle da informação.', 'A propaganda foi instrumento essencial dos dois regimes.', 'negar prática comprovada'],
          ['Manter eleições livres e pluripartidarismo.', 'Ambos instituíram partido único e suprimiram a competição eleitoral.', 'atribuir traço oposto ao regime'],
        ],
        explanation: 'Fascismo e nazismo compartilham métodos totalitários; o racismo de Estado e o extermínio sistemático distinguem o nazismo.',
        strategy: 'Liste primeiro o que os regimes têm em comum e só então procure o traço que diferencia.',
      }),
      q({
        slug: 'q-gmgf-5',
        stem: 'A criação da Organização das Nações Unidas, em 1945, e a aprovação da Declaração Universal dos Direitos Humanos, em 1948, ocorreram logo após o fim da Segunda Guerra Mundial. Articulando os acontecimentos do período e o conteúdo desses documentos, conclui-se que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre experiência histórica, ordem internacional e fundamentos dos direitos humanos',
        seconds: 170,
        errors: ['desvincular a Declaração da experiência histórica que a motivou'],
        correct: 4,
        options: [
          ['Os documentos foram elaborados sem relação com os acontecimentos da guerra.', 'A experiência do conflito e do Holocausto é o contexto direto de sua elaboração.', 'desconectar documento e contexto'],
          ['A Declaração estabeleceu direitos válidos apenas para os países vencedores da guerra.', 'Seu princípio é justamente a universalidade dos direitos.', 'restringir o alcance do documento'],
          ['A ONU substituiu os Estados nacionais na administração dos territórios.', 'A ONU é uma organização de cooperação entre Estados soberanos.', 'atribuir função inexistente'],
          ['Os documentos eliminaram definitivamente as violações de direitos humanos no mundo.', 'Violações persistiram; os documentos criam parâmetros e instrumentos, não garantias automáticas.', 'confundir norma com efetividade'],
          ['A escala das atrocidades, sobretudo o Holocausto, levou à formulação de uma ordem internacional baseada na ideia de direitos inerentes a toda pessoa, que nenhum Estado poderia suprimir legitimamente.', 'A experiência do extermínio sistemático mostrou que a legalidade estatal podia ser usada para violar direitos, o que fundamentou a afirmação de direitos universais acima da vontade de cada Estado.'],
        ],
        explanation: 'A Declaração de 1948 responde diretamente à experiência da guerra e do Holocausto: direitos que pertencem à pessoa pela condição humana.',
      }),
      q({
        slug: 'q-gmgf-rec-1',
        stem: 'A expressão "mundo bipolar", usada para caracterizar o período da Guerra Fria, refere-se à:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'compreensão da organização geopolítica do pós-guerra',
        seconds: 65,
        recovery: true,
        errors: ['confundir bipolaridade com divisão geográfica do planeta'],
        correct: 2,
        options: [
          ['Divisão do planeta entre os polos Norte e Sul geográficos.', 'A expressão é política, e não geográfica em sentido físico.', 'ler a expressão literalmente'],
          ['Existência de dois sistemas econômicos dentro de cada país.', 'A bipolaridade se refere à ordem internacional, não à economia interna de cada país.', 'trocar a escala de análise'],
          ['Organização do mundo em torno de dois blocos liderados por Estados Unidos e União Soviética.', 'O termo descreve a ordem internacional dividida entre o bloco capitalista e o bloco socialista, cada um com sua área de influência e alianças militares.'],
          ['Alternância de governos entre dois partidos em cada nação.', 'Não se trata de sistema partidário interno.', 'trocar a escala de análise'],
          ['Coexistência de duas moedas internacionais de referência.', 'A bipolaridade é política e ideológica, não monetária.', 'trocar o critério'],
        ],
        explanation: 'Bipolaridade é a ordem internacional organizada em dois blocos: EUA e aliados de um lado, URSS e aliados de outro.',
      }),
    ],
  }),

  topic({
    slug: 'filosofia-politica-e-poder',
    name: 'Filosofia política e poder',
    subject: 'filosofia',
    area: 'ciencias-humanas',
    summary:
      'Comparar as principais respostas filosóficas sobre a origem e os limites do poder — do contrato social à crítica do poder disciplinar — e aplicá-las a debates políticos atuais.',
    difficulty: 'challenging',
    minutes: 26,
    weight: 86,
    order: 2,
    prerequisites: ['etica'],
    related: ['cidadania-e-direitos', 'trabalho-e-sociedade'],
    skill: {
      slug: 'comparar-concepcoes-filosoficas-sobre-poder-e-legitimidade',
      name: 'Comparar concepções filosóficas sobre poder e legitimidade',
      description:
        'Distinguir as teses centrais de diferentes filósofos políticos e aplicá-las à análise de situações concretas de poder e legitimidade.',
    },
    quick: `**A pergunta da filosofia política**

> Por que devemos obedecer? O que torna um poder **legítimo** — e não apenas forte?

**Contratualistas: o Estado nasce de um acordo**

| Filósofo | Estado de natureza | Contrato | Estado ideal |
| --- | --- | --- | --- |
| **Hobbes** | guerra de todos contra todos; "o homem é o lobo do homem" | entrega da liberdade em troca de segurança | soberano forte, poder absoluto |
| **Locke** | relativamente pacífico, mas com direitos inseguros | preservar vida, liberdade e **propriedade** | poder limitado; direito de resistência |
| **Rousseau** | homem naturalmente bom; a **propriedade** corrompe | submissão à **vontade geral** | soberania popular |

**Antes deles**

- **Platão:** quem deve governar é quem conhece o bem — o rei-filósofo.
- **Aristóteles:** o ser humano é um "animal político"; a política visa ao bem comum na *pólis*.
- **Maquiavel** (*O Príncipe*, 1513): separa política de moral. Analisa o poder **como ele é**, não como deveria ser. "Os fins justificam os meios" é simplificação de leitores, não citação dele.

**Depois**

- **Montesquieu:** separação dos poderes — só o poder freia o poder.
- **Marx:** o Estado não é neutro; expressa a dominação de uma classe sobre outra.
- **Weber:** define Estado pelo **monopólio do uso legítimo da força**; três tipos de dominação — **tradicional**, **carismática** e **racional-legal**.
- **Hannah Arendt:** distingue poder (agir em conjunto) de violência (instrumento); analisa o totalitarismo e a "banalidade do mal".
- **Foucault:** o poder não está só no Estado; circula em escolas, hospitais, prisões — **poder disciplinar** que produz corpos e condutas.`,
    explanation: {
      title: 'Cinco respostas para a mesma pergunta sobre o poder',
      body: `### 1. Por que o contratualismo importa até hoje

Os contratualistas inventaram uma ficção útil: imagine que não houvesse Estado. Como seria? A resposta a essa pergunta já contém o tipo de Estado que cada autor defende.

**Hobbes** vê insegurança total: sem árbitro comum, cada um julga sua própria causa e a vida fica "solitária, pobre, sórdida, embrutecida e curta". Para escapar, os indivíduos transferem sua liberdade a um soberano. A segurança é o valor máximo, e a rebelião nunca se justifica — porque voltar ao estado de natureza é pior.

**Locke** discorda do diagnóstico: já existem direitos naturais antes do Estado, inclusive à propriedade. O governo é um **mandatário** encarregado de protegê-los. Se ele violar esses direitos, rompe o contrato — e o povo tem **direito de resistência**. É a base filosófica do liberalismo e das declarações de direitos dos séculos XVIII e XIX.

**Rousseau** inverte de novo: o problema não está na natureza humana, mas na sociedade que a corrompeu, sobretudo com a instituição da propriedade privada. A saída é um contrato em que cada um se submete à **vontade geral** — que não é a soma dos interesses individuais, e sim o que visa ao bem comum. Daí sua influência sobre a ideia de soberania popular.

**O erro mais comum:** achar que os três descrevem a mesma coisa. Eles usam o mesmo método (estado de natureza → contrato) para chegar a conclusões opostas sobre os limites do poder.

### 2. Maquiavel e o realismo político

Maquiavel não ensina maldade. Ele faz outra coisa, mais radical para a época: separa a análise política da moral religiosa. Pergunta **como o poder de fato se conquista e se mantém**, e não como um governante virtuoso deveria agir.

Conceitos-chave: **virtù** (capacidade de agir e decidir) e **fortuna** (o acaso, as circunstâncias). O bom governante é o que sabe adaptar sua ação às circunstâncias.

### 3. Weber: por que as pessoas obedecem

Weber muda a pergunta: em vez de "o que legitima o poder", pergunta **por que as pessoas de fato aceitam obedecer**. Três respostas típicas:

- **Tradicional:** "sempre foi assim" — monarquias hereditárias, chefias costumeiras.
- **Carismática:** qualidades excepcionais atribuídas ao líder — profetas, líderes revolucionários.
- **Racional-legal:** obedece-se à **norma**, não à pessoa — é a burocracia e o Estado moderno de direito.

Sua definição de Estado é uma das mais cobradas: a comunidade humana que reivindica, com êxito, o **monopólio do uso legítimo da força física** em dado território.

### 4. Arendt e a diferença entre poder e violência

Para Hannah Arendt, **poder** é o que surge quando as pessoas agem em conjunto; ele se sustenta no apoio mútuo. **Violência** é instrumental, precisa de aparato, e aparece justamente quando o poder está se esvaindo.

Daí a tese que a prova adora: violência e poder não são a mesma coisa; um governo que precisa recorrer ao máximo de violência está, para ela, no ponto mais frágil de sua autoridade.

Sua análise do totalitarismo mostra como regimes desse tipo destroem a esfera pública, isolam os indivíduos e transformam o crime em rotina administrativa — a "banalidade do mal".

### 5. Foucault e o poder que não está no Estado

Foucault desloca a análise. Em vez de perguntar quem detém o poder, pergunta **como ele funciona**.

O poder disciplinar age em instituições — escola, hospital, quartel, fábrica, prisão — por meio de vigilância, exame, horários, classificação. O modelo é o **panóptico**: uma arquitetura em que o vigiado nunca sabe se está sendo observado e, por isso, passa a se vigiar sozinho.

O resultado é que o poder não apenas proíbe: ele **produz** comportamentos, saberes e subjetividades. Essa ideia costuma aparecer em questões sobre vigilância digital, avaliação de desempenho e controle por dados.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — três filósofos diante de um mesmo caso',
        body: `**Situação:** um governo suspende eleições e restringe liberdades alegando necessidade de manter a ordem. Como Hobbes, Locke e Rousseau avaliariam a medida?

**Passo 1 — Hobbes:** o valor central é a segurança, e a alternativa ao soberano é o caos. Se a ordem está ameaçada, o reforço do poder soberano é coerente com sua teoria. Ele tenderia a **aceitar** a medida.

**Passo 2 — Locke:** o governo existe para proteger direitos naturais anteriores a ele. Suspender liberdades e eleições viola o mandato recebido. Ele **condenaria** a medida e reconheceria o direito de resistência.

**Passo 3 — Rousseau:** a soberania pertence ao povo e não pode ser transferida nem confiscada. Um governo que suprime a participação usurpa a vontade geral. Ele também **condenaria**, mas por um fundamento diferente do de Locke — soberania popular, não direitos individuais prévios.

**Passo 4 — o que a questão avalia:** não é decorar nomes, e sim reconhecer **qual valor cada autor coloca no centro**: segurança (Hobbes), direitos individuais (Locke), soberania popular (Rousseau).`,
      },
      {
        title: 'Exemplo resolvido 2 — identificar o tipo de dominação em Weber',
        body: `**Situação:** classifique três casos segundo os tipos de dominação de Weber.

I. Uma comunidade obedece ao chefe porque a família dele sempre liderou o grupo.
II. Multidões seguem um líder por atribuírem a ele qualidades excepcionais e uma missão.
III. Um cidadão cumpre uma determinação porque ela foi emitida por autoridade competente, conforme a lei.

**Passo 1 — caso I:** o fundamento é o costume, a continuidade do que "sempre foi". → **dominação tradicional**.

**Passo 2 — caso II:** o fundamento está nas qualidades atribuídas à pessoa do líder, não ao cargo nem à norma. → **dominação carismática**.

**Passo 3 — caso III:** obedece-se ao **cargo e à norma**, independentemente de quem os ocupe. → **dominação racional-legal**.

**Passo 4 — observar o critério unificador:** em todos os casos a pergunta é a mesma — *por que se obedece?*. A resposta é que muda: costume, pessoa ou regra.

**Cuidado:** a dominação racional-legal não significa que as normas sejam justas, apenas que a legitimidade repousa sobre elas.`,
      },
    ],
    mistakes: `**1. Tratar Hobbes, Locke e Rousseau como se dissessem a mesma coisa.**
Todos partem do estado de natureza, mas chegam a conclusões opostas: poder absoluto, poder limitado com direito de resistência e soberania popular.

**2. Reduzir Maquiavel a "os fins justificam os meios".**
A frase não é dele. Sua contribuição é separar a análise do poder da moral religiosa e estudar a política tal como ela funciona.

**3. Confundir poder e violência em Arendt.**
Para ela, poder nasce da ação conjunta; violência é instrumento e costuma crescer quando o poder está se perdendo. Tratá-los como sinônimos inverte a tese.`,
    selfCheck: [
      'Por que Hobbes e Locke chegam a conclusões opostas partindo do mesmo método?',
      'O que Rousseau quer dizer com vontade geral, e por que ela não é a soma dos interesses individuais?',
      'Explique os três tipos de dominação de Weber com um exemplo atual para cada.',
      'Qual a diferença entre poder e violência para Hannah Arendt?',
      'Como o conceito de poder disciplinar de Foucault ajuda a pensar a vigilância digital hoje?',
    ],
    questions: [
      q({
        slug: 'q-filpol-1',
        stem: 'Para Thomas Hobbes, a passagem do estado de natureza para a sociedade civil ocorre porque os indivíduos:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento da tese central do contratualismo hobbesiano',
        seconds: 80,
        errors: ['atribuir a Hobbes a defesa de direitos naturais anteriores ao Estado'],
        correct: 3,
        options: [
          ['Buscam preservar direitos naturais já garantidos no estado de natureza.', 'Essa é a posição de Locke; para Hobbes, o estado de natureza não garante direito algum.', 'trocar os autores'],
          ['Pretendem retornar à bondade natural perdida com a propriedade.', 'Essa formulação corresponde a Rousseau.', 'trocar os autores'],
          ['Desejam eliminar toda forma de autoridade política.', 'Hobbes defende justamente a instituição de uma autoridade forte.', 'inverter a tese'],
          ['Transferem sua liberdade a um soberano em troca de segurança, escapando da guerra de todos contra todos.', 'Sem árbitro comum, a vida seria marcada pelo medo e pela insegurança permanentes; o contrato institui um poder capaz de garantir a ordem.'],
          ['Firmam um acordo que pode ser rompido a qualquer momento sem consequências.', 'Para Hobbes, a dissolução do pacto significaria o retorno ao estado de guerra.', 'ignorar a lógica do pacto hobbesiano'],
        ],
        explanation: 'Em Hobbes, a insegurança do estado de natureza justifica a transferência de liberdade a um soberano capaz de garantir a paz.',
      }),
      q({
        slug: 'q-filpol-2',
        stem: 'Um cidadão cumpre uma determinação de um órgão público porque ela foi emitida por autoridade competente, segundo procedimentos previstos em lei, independentemente de quem ocupe o cargo. Na tipologia de Max Weber, trata-se de dominação:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação da tipologia weberiana a uma situação concreta',
        seconds: 95,
        errors: ['confundir legitimidade da norma com qualidades pessoais do governante'],
        correct: 2,
        options: [
          ['Tradicional, pois baseada em costumes antigos.', 'A dominação tradicional se apoia no costume, não em procedimentos legais.', 'trocar o tipo de dominação'],
          ['Carismática, pois baseada nas qualidades pessoais da autoridade.', 'O enunciado destaca justamente a independência em relação à pessoa que ocupa o cargo.', 'trocar o tipo de dominação'],
          ['Racional-legal, pois a obediência se dirige à norma e ao cargo, e não à pessoa.', 'É o tipo característico do Estado moderno e da burocracia: a legitimidade repousa sobre regras impessoais previamente estabelecidas.'],
          ['Patrimonial, pois o governante trata o Estado como propriedade privada.', 'O patrimonialismo é variante do tipo tradicional, ausente na situação descrita.', 'trocar o tipo de dominação'],
          ['Revolucionária, pois rompe com a ordem estabelecida.', 'Não há ruptura: há cumprimento da ordem legal vigente.', 'inventar categoria fora da tipologia'],
        ],
        explanation: 'Obedecer à norma e ao cargo, e não à pessoa, caracteriza a dominação racional-legal descrita por Weber.',
        strategy: 'Pergunte a que se dirige a obediência: ao costume, à pessoa ou à regra.',
      }),
      q({
        slug: 'q-filpol-3',
        stem: 'Michel Foucault analisa instituições como escolas, hospitais e prisões, mostrando que nelas operam vigilância contínua, organização do tempo, exame e classificação dos indivíduos. Dessa análise decorre que o poder, para o autor:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação da noção de poder disciplinar',
        seconds: 125,
        errors: ['reduzir o poder ao aparelho de Estado'],
        correct: 0,
        options: [
          ['Não se concentra apenas no Estado: circula em instituições cotidianas e produz condutas, saberes e formas de subjetividade.', 'O poder disciplinar age capilarmente, moldando corpos e comportamentos por meio de práticas rotineiras de vigilância e classificação.'],
          ['Existe unicamente como repressão exercida pelo aparelho estatal.', 'Foucault critica justamente essa concepção restrita e apenas repressiva do poder.', 'reduzir o poder ao Estado'],
          ['Desaparece nas sociedades modernas, substituído pelo consenso.', 'A análise mostra a intensificação, e não o desaparecimento, dos mecanismos de poder.', 'inverter a tese'],
          ['Se limita a proibir comportamentos, sem produzir efeitos positivos.', 'Para Foucault, o poder também produz saberes, normas e sujeitos.', 'reduzir o poder à proibição'],
          ['É exercido exclusivamente por meio da violência física explícita.', 'A disciplina opera sobretudo por vigilância e normalização, não por violência aberta.', 'confundir disciplina com força bruta'],
        ],
        explanation: 'O poder disciplinar é capilar e produtivo: não apenas reprime, mas fabrica condutas por meio de vigilância e normalização.',
      }),
      q({
        slug: 'q-filpol-4',
        stem: 'Comparando as concepções de John Locke e Jean-Jacques Rousseau sobre os limites do poder político, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre fundamentos distintos de limitação do poder',
        seconds: 145,
        errors: ['igualar direitos naturais individuais e soberania popular'],
        correct: 1,
        options: [
          ['Ambos defendem o poder absoluto do soberano, como Hobbes.', 'Os dois limitam o poder, ainda que por fundamentos distintos.', 'igualar aos autores absolutistas'],
          ['Locke limita o poder a partir de direitos naturais anteriores ao Estado, enquanto Rousseau o limita a partir da soberania popular e da vontade geral.', 'Para Locke, o governo é mandatário de direitos preexistentes e pode ser resistido se os violar; para Rousseau, a soberania pertence ao povo e não pode ser alienada.'],
          ['Os dois consideram a propriedade privada a base da liberdade humana.', 'Rousseau vê na instituição da propriedade a origem da desigualdade, ao contrário de Locke.', 'igualar posições opostas sobre propriedade'],
          ['Nenhum deles admite qualquer forma de resistência ao governo.', 'Locke formula explicitamente o direito de resistência.', 'negar tese central de um dos autores'],
          ['Ambos rejeitam a ideia de contrato social como método de análise.', 'Os dois são contratualistas.', 'negar o método comum'],
        ],
        explanation: 'Locke e Rousseau limitam o poder por caminhos diferentes: direitos naturais individuais, de um lado; soberania popular, de outro.',
        strategy: 'Identifique primeiro o valor central de cada autor e depois compare as consequências práticas.',
      }),
      q({
        slug: 'q-filpol-5',
        stem: 'Hannah Arendt sustenta que o poder resulta da ação conjunta de pessoas que agem de comum acordo, enquanto a violência é instrumental e depende de aparatos. A partir dessa distinção, a conclusão coerente com o pensamento da autora é que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre teoria do poder, legitimidade e análise de regimes políticos',
        seconds: 170,
        errors: ['tratar poder e violência como sinônimos'],
        correct: 4,
        options: [
          ['Poder e violência são equivalentes, variando apenas em intensidade.', 'A distinção entre os dois conceitos é justamente o eixo da argumentação da autora.', 'igualar os conceitos'],
          ['Um governo é tanto mais poderoso quanto mais recorre à força física.', 'Para Arendt, o recurso intensivo à violência indica perda de poder, não seu aumento.', 'inverter a tese'],
          ['A ação conjunta das pessoas é irrelevante para a manutenção de um governo.', 'O apoio conjunto é exatamente a fonte do poder na formulação da autora.', 'negar a fonte do poder'],
          ['A violência é a única forma de estabelecer autoridade política duradoura.', 'A autoridade fundada apenas na violência é, para Arendt, instável e destrutiva do espaço público.', 'inverter a conclusão'],
          ['Quando um governo precisa recorrer sistematicamente à violência para se manter, isso indica que seu poder — o apoio que vem da ação conjunta — está se esvaindo.', 'Como o poder depende do consentimento ativo e da ação em comum, a substituição desse apoio por coerção revela fragilidade, e não força.'],
        ],
        explanation: 'Em Arendt, violência e poder são opostos em sua lógica: a violência cresce onde o poder se perde.',
      }),
      q({
        slug: 'q-filpol-rec-1',
        stem: 'Ao afirmar que o Estado é a comunidade que reivindica com êxito o monopólio do uso legítimo da força física em determinado território, Max Weber destaca que:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'compreensão da definição weberiana de Estado',
        seconds: 70,
        recovery: true,
        errors: ['confundir monopólio da força com ausência de regras'],
        correct: 2,
        options: [
          ['Qualquer grupo pode usar a força legitimamente dentro do território.', 'O ponto da definição é justamente a exclusividade reivindicada pelo Estado.', 'negar o monopólio'],
          ['O Estado não pode utilizar a força em nenhuma circunstância.', 'A definição afirma o contrário: o uso legítimo da força é atributo estatal.', 'inverter a definição'],
          ['Somente o Estado pode empregar ou autorizar legitimamente o uso da força dentro de suas fronteiras.', 'O monopólio não significa arbitrariedade: o uso é regulado por normas, mas a legitimidade da coerção é reivindicada com exclusividade pelo Estado.'],
          ['A força é irrelevante para a definição de Estado moderno.', 'Ela é o elemento central da definição weberiana.', 'negar o elemento central'],
          ['O monopólio da força dispensa qualquer forma de legitimidade.', 'Weber fala em uso legítimo, apoiado em formas reconhecidas de dominação.', 'ignorar a legitimidade'],
        ],
        explanation: 'A definição weberiana associa Estado, território e exclusividade do uso legítimo da força — sempre apoiada em alguma forma de legitimidade.',
      }),
    ],
  }),

  topic({
    slug: 'movimentos-sociais',
    name: 'Movimentos sociais',
    subject: 'sociologia',
    area: 'ciencias-humanas',
    summary:
      'Compreender como grupos organizados disputam direitos e reconhecimento, distinguindo movimentos clássicos e identitários e avaliando repertórios de ação, inclusive digitais.',
    difficulty: 'intermediate',
    minutes: 24,
    weight: 85,
    order: 4,
    prerequisites: ['cidadania-e-direitos'],
    related: ['trabalho-e-sociedade', 'cultura-e-identidade'],
    skill: {
      slug: 'analisar-acao-coletiva-e-conquista-de-direitos',
      name: 'Analisar ação coletiva e conquista de direitos',
      description:
        'Identificar formas de organização, demandas e repertórios de ação de movimentos sociais e relacioná-los à ampliação de direitos.',
    },
    quick: `**O que é um movimento social**

Ação **coletiva**, **organizada** e **continuada** de um grupo que busca transformar alguma situação social — não é um protesto isolado nem um grupo de amigos indignados.

Três elementos que a sociologia costuma exigir:

1. **identidade coletiva** (um "nós");
2. **adversário** ou situação a ser mudada;
3. **projeto** — o que se quer no lugar.

**Clássicos × novos movimentos**

| | Movimentos clássicos | Novos movimentos sociais |
| --- | --- | --- |
| Eixo | classe, trabalho, renda | identidade, reconhecimento, qualidade de vida |
| Exemplos | sindicatos, movimento operário | feminista, negro, LGBTQIA+, ambientalista, indígena |
| Demanda típica | **redistribuição** | **reconhecimento** (e também redistribuição) |
| Organização | centralizada, hierárquica | em rede, mais horizontal |

Atenção: a separação é analítica. Movimentos reais misturam as duas pautas — o MST quer terra (redistribuição) e reconhecimento do campesinato.

**No Brasil**

- **Movimento operário** — greves do ABC (fim dos anos 1970), reorganização sindical.
- **Diretas Já** (1984) — mobilização pela redemocratização.
- **MST** — reforma agrária, criado em 1984.
- **Movimento negro** — Frente Negra (1931), MNU (1978); cotas, Lei 10.639/2003 (ensino de história afro-brasileira).
- **Movimento feminista** — sufrágio (1932), Lei Maria da Penha (2006).
- **Movimento indígena** — artigos 231 e 232 da Constituição de 1988, demarcação de terras.
- **Junho de 2013** — ciclo de protestos iniciado pelo transporte, com pautas múltiplas e forte uso de redes.

**Repertório de ação**

Passeata, greve, ocupação, abaixo-assinado, audiência pública, litígio judicial, campanha em rede, boicote. Cada época inventa novos formatos — o **ciberativismo** é o mais recente.

**Direitos não "chegam": são conquistados.** Praticamente todo direito social do século XX resultou de pressão organizada.`,
    explanation: {
      title: 'Como a ação coletiva transforma demanda em direito',
      body: `### 1. O que distingue movimento social de manifestação

Uma manifestação é um **evento**. Um movimento social é um **processo**: tem continuidade no tempo, alguma estrutura organizativa, identidade compartilhada e um projeto.

Isso importa para a prova porque muitas alternativas erradas descrevem movimentos como "ajuntamentos espontâneos sem organização" ou "reações emocionais desordenadas". A sociologia contemporânea rejeita essa leitura: a ação coletiva envolve **recursos, estratégia e cálculo**, além de emoção.

### 2. Redistribuição e reconhecimento

Duas gramáticas de demanda, frequentemente combinadas:

- **Redistribuição:** desigualdade econômica. Demandas por salário, terra, renda, acesso a serviços.
- **Reconhecimento:** hierarquias de status e valor. Demandas contra o racismo, o sexismo, a LGBTfobia, pelo respeito a modos de vida e identidades.

Um movimento como o negro brasileiro opera nos dois registros: cotas em universidades e concursos (redistribuição de oportunidades) **e** revisão do currículo escolar e combate ao racismo (reconhecimento).

Questões que apresentam as duas dimensões como excludentes costumam estar erradas.

### 3. O papel dos movimentos na Constituição de 1988

A Constituição não nasceu pronta: foi disputada. Emendas populares levaram à Assembleia Constituinte pautas de movimentos de moradia, saúde, mulheres, negros e indígenas.

Resultados concretos: o **SUS** como sistema universal, o reconhecimento dos direitos originários dos povos indígenas sobre suas terras (art. 231), a criminalização do racismo, a proteção ao trabalho urbano e rural.

É o exemplo mais claro de como demanda organizada vira **direito positivado**.

### 4. Ciberativismo: potência e limites

As redes digitais baratearam a convocação e ampliaram o alcance. Permitem coordenar mobilizações rápidas, dar visibilidade a pautas antes invisíveis e criar solidariedade transnacional.

Mas há limites reconhecidos pela literatura:

- mobilizações rápidas podem ser igualmente rápidas em se dispersar, sem estrutura que sustente a pauta;
- há risco de **slacktivismo** — engajamento de baixo custo que não se converte em ação;
- desigualdade de acesso digital exclui parte da população;
- desinformação e ataques coordenados também usam as mesmas ferramentas.

A conclusão equilibrada, que costuma ser a alternativa correta: as redes **ampliam o repertório** de ação, sem substituir a organização duradoura.

### 5. Movimento social e democracia

Movimentos sociais são frequentemente vistos como ameaça à ordem. A sociologia política os entende de outro modo: como **canal de participação** entre uma eleição e outra, capaz de trazer ao debate público temas que o sistema político formal não processa espontaneamente.

Quando o conflito é reconhecido e negociado, ele tende a fortalecer a democracia; quando é apenas reprimido, tende a se radicalizar. Essa é a leitura que aparece com mais frequência nas questões de Sociologia do ENEM.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — da demanda organizada à lei',
        body: `**Situação:** a Lei Maria da Penha (2006) é frequentemente citada como conquista do movimento feminista. Reconstrua o percurso que leva uma demanda a virar direito.

**Passo 1 — problema socialmente vivido:** violência doméstica tratada como assunto privado, com respostas institucionais frágeis.

**Passo 2 — organização e nomeação do problema:** o movimento feminista reúne dados, cria centros de referência, dá nome público ao que era tratado como "briga de casal" — desprivatiza o tema.

**Passo 3 — repertório de ação:** campanhas, pressão parlamentar, articulação com juristas e, no caso, denúncia internacional à Comissão Interamericana de Direitos Humanos, que responsabilizou o Estado brasileiro por omissão.

**Passo 4 — positivação:** aprovação da lei, com medidas protetivas, atendimento especializado e mudança de procedimento.

**Passo 5 — o que a análise sociológica acrescenta:** a lei não encerra o processo. O movimento segue atuando pela implementação — delegacias, orçamento, formação de agentes.

**Conclusão:** direitos resultam de **pressão organizada e continuada**, não de concessão espontânea.`,
      },
      {
        title: 'Exemplo resolvido 2 — avaliar o ciberativismo sem euforia nem desprezo',
        body: `**Situação:** uma questão apresenta um movimento que se organizou por redes sociais, reuniu milhares de pessoas em poucos dias e, meses depois, perdeu visibilidade sem conquistas concretas. O que a sociologia conclui?

**Passo 1 — reconhecer a potência:** as redes reduziram drasticamente o custo de convocar e coordenar. A mobilização rápida e numerosa é um ganho real de repertório.

**Passo 2 — identificar a fragilidade:** mobilizações que não constroem estrutura organizativa — lideranças, recursos, interlocução institucional — têm dificuldade de sustentar pressão ao longo do tempo.

**Passo 3 — evitar as duas respostas simplistas:**
- "As redes resolveram o problema da ação coletiva" → ignora a dispersão observada.
- "Ativismo digital não serve para nada" → ignora pautas que ganharam visibilidade e resultados por essa via.

**Passo 4 — formular a conclusão equilibrada:** as tecnologias digitais **ampliam o repertório** de ação coletiva, mas não substituem a organização continuada, que é o que converte mobilização em conquista.

**Na prova:** a alternativa correta quase sempre é a que reconhece simultaneamente potencial e limite.`,
      },
    ],
    mistakes: `**1. Descrever movimentos sociais como ajuntamentos espontâneos e desorganizados.**
A ação coletiva envolve identidade, organização, recursos e estratégia. Alternativas que falam em "reação emocional sem articulação" costumam estar erradas.

**2. Separar redistribuição e reconhecimento como se fossem excludentes.**
O movimento negro reivindica cotas **e** revisão curricular; o indígena, terra **e** respeito cultural. As duas dimensões convivem.

**3. Tratar o ativismo digital como substituto da organização.**
As redes ampliam alcance e velocidade, mas conquistas duradouras dependem de estrutura, continuidade e interlocução institucional.`,
    selfCheck: [
      'Que três elementos permitem chamar uma ação coletiva de movimento social?',
      'Explique a diferença entre demandas de redistribuição e de reconhecimento, com um exemplo de cada.',
      'Como os movimentos sociais participaram da construção da Constituição de 1988?',
      'Quais são os ganhos e os limites do ciberativismo?',
      'Por que se diz que direitos são conquistados, e não concedidos?',
    ],
    questions: [
      q({
        slug: 'q-movsoc-1',
        stem: 'Do ponto de vista sociológico, um movimento social se caracteriza por:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'definição de ação coletiva organizada',
        seconds: 75,
        errors: ['confundir movimento social com manifestação isolada'],
        correct: 2,
        options: [
          ['Qualquer aglomeração de pessoas em um espaço público.', 'Aglomeração não implica identidade coletiva, organização nem projeto comum.', 'confundir ajuntamento com movimento'],
          ['Uma reação emocional espontânea e desorganizada diante de um problema.', 'A literatura sociológica destaca justamente a presença de organização, recursos e estratégia.', 'negar a dimensão organizativa'],
          ['Uma ação coletiva organizada e continuada, com identidade compartilhada e um projeto de transformação social.', 'Movimentos sociais se distinguem de eventos isolados por terem continuidade, alguma estrutura, um "nós" e um objetivo de mudança.'],
          ['Um partido político registrado na Justiça Eleitoral.', 'Partidos disputam eleições e têm natureza institucional distinta da dos movimentos.', 'confundir movimento com partido'],
          ['Um órgão criado pelo Estado para representar categorias profissionais.', 'Movimentos sociais surgem da sociedade civil, não por criação estatal.', 'inverter a origem'],
        ],
        explanation: 'Identidade coletiva, organização continuada e projeto de transformação são os traços que definem um movimento social.',
      }),
      q({
        slug: 'q-movsoc-2',
        stem: 'A Lei Maria da Penha, de 2006, é frequentemente apontada como resultado da atuação do movimento feminista brasileiro. Esse caso ilustra que:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação da relação entre pressão organizada e positivação de direitos',
        seconds: 100,
        errors: ['tratar direitos como concessão espontânea do Estado'],
        correct: 4,
        options: [
          ['Direitos sociais são concedidos espontaneamente pelo Estado quando a sociedade amadurece.', 'A trajetória da lei mostra décadas de pressão, campanhas e articulação, inclusive internacional.', 'tratar direito como concessão'],
          ['A legislação encerra a atuação do movimento, que deixa de ter função.', 'Após a aprovação, os movimentos seguem atuando pela implementação e pelo orçamento.', 'confundir aprovação com efetivação'],
          ['A violência doméstica é assunto exclusivamente privado, sem alcance jurídico.', 'A lei resulta justamente de desprivatizar o problema e reconhecê-lo como questão pública.', 'manter a leitura privatista'],
          ['Movimentos sociais atuam apenas por meio de manifestações de rua.', 'O repertório incluiu campanhas, articulação parlamentar, litígio e denúncia internacional.', 'reduzir o repertório de ação'],
          ['A conversão de uma demanda coletiva em direito positivado depende de organização, pressão continuada e uso de diferentes repertórios de ação.', 'O percurso envolve nomear publicamente o problema, produzir dados, mobilizar aliados e pressionar instituições até a positivação — e prossegue na etapa de implementação.'],
        ],
        explanation: 'A lei é exemplo de como demanda organizada, com repertório variado, se transforma em direito — e de que a luta continua na implementação.',
        strategy: 'Reconstrua o percurso: problema vivido, organização, repertório, positivação e implementação.',
      }),
      q({
        slug: 'q-movsoc-3',
        stem: 'Uma pesquisa descreve uma mobilização organizada por redes sociais que reuniu milhares de pessoas em poucos dias e, meses depois, perdeu visibilidade sem conquistas institucionais. A leitura sociológica mais adequada desse caso é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação equilibrada do papel das tecnologias digitais na ação coletiva',
        seconds: 125,
        errors: ['avaliar o ciberativismo apenas como solução ou apenas como ilusão'],
        correct: 1,
        options: [
          ['As redes digitais tornaram desnecessária qualquer forma de organização coletiva.', 'A dispersão observada mostra exatamente o contrário.', 'superestimar a tecnologia'],
          ['As tecnologias digitais ampliam o alcance e a velocidade da mobilização, mas conquistas duradouras dependem de estrutura organizativa e interlocução continuada com instituições.', 'O caso mostra os dois lados: facilidade de convocação e fragilidade para sustentar pressão sem organização permanente.'],
          ['O ativismo digital não produz qualquer efeito político relevante.', 'Diversas pautas ganharam visibilidade e resultados concretos por essa via.', 'subestimar a tecnologia'],
          ['A mobilização fracassou porque as pautas digitais são sempre irrelevantes.', 'A relevância da pauta não decorre do meio utilizado para difundi-la.', 'desqualificar a pauta pelo meio'],
          ['O episódio prova que movimentos sociais deixaram de existir nas sociedades contemporâneas.', 'Movimentos sociais seguem atuantes, inclusive combinando ação de rua e ação digital.', 'generalizar indevidamente'],
        ],
        explanation: 'A resposta equilibrada reconhece o ganho de repertório trazido pelas redes e o limite de mobilizações sem estrutura continuada.',
      }),
      q({
        slug: 'q-movsoc-4',
        stem: 'Comparando o movimento operário do início do século XX e os chamados novos movimentos sociais, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre eixos de demanda e formas de organização',
        seconds: 145,
        errors: ['supor que os novos movimentos abandonaram pautas materiais'],
        correct: 0,
        options: [
          ['O movimento operário organizou-se sobretudo em torno de classe e condições de trabalho, enquanto os novos movimentos acrescentam demandas por reconhecimento de identidades, sem abandonar pautas materiais.', 'A distinção é analítica: os novos movimentos ampliam o eixo das demandas, combinando reconhecimento e redistribuição, e adotam formas de organização mais horizontais e em rede.'],
          ['Os novos movimentos sociais abandonaram completamente qualquer demanda econômica.', 'Pautas como cotas, terra e acesso a serviços são claramente materiais.', 'separar de forma absoluta as duas gramáticas'],
          ['O movimento operário não possuía qualquer forma de organização estável.', 'Sindicatos e associações são exemplos de organização estruturada e duradoura.', 'negar a organização do movimento clássico'],
          ['Os novos movimentos sociais são criados e dirigidos pelo Estado.', 'Eles emergem da sociedade civil, muitas vezes em conflito com o Estado.', 'inverter a origem'],
          ['As duas formas de mobilização são idênticas em pautas e em estrutura.', 'Há diferenças relevantes de eixo temático e de forma organizativa.', 'apagar as diferenças'],
        ],
        explanation: 'Novos movimentos não trocam redistribuição por reconhecimento: eles somam as duas dimensões, com organização mais horizontal.',
        strategy: 'Verifique se a alternativa trata as duas gramáticas de demanda como excludentes — isso costuma indicar erro.',
      }),
      q({
        slug: 'q-movsoc-5',
        stem: 'Durante a Assembleia Nacional Constituinte, emendas populares subscritas por milhares de cidadãos levaram ao texto de 1988 pautas de movimentos de saúde, moradia, mulheres, povos indígenas e movimento negro. Considerando o funcionamento da democracia, esse processo indica que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre participação social, institucionalização de demandas e qualidade da democracia',
        seconds: 170,
        errors: ['ver a mobilização social como ameaça à ordem democrática'],
        correct: 3,
        options: [
          ['A participação de movimentos sociais enfraquece as instituições democráticas.', 'A canalização institucional do conflito social tende a fortalecer, e não a enfraquecer, a democracia.', 'ver conflito como ameaça'],
          ['A Constituição foi elaborada exclusivamente por especialistas, sem participação social.', 'As emendas populares documentam ampla participação organizada.', 'negar o fato descrito'],
          ['Demandas sociais só se tornam direitos quando partem de iniciativa do Poder Executivo.', 'O caso mostra iniciativa vinda da sociedade civil organizada.', 'inverter a origem da demanda'],
          ['A ação coletiva organizada funciona como canal de participação que amplia a agenda pública e converte demandas sociais em direitos constitucionais.', 'Os movimentos levaram ao texto constitucional temas como o SUS universal, os direitos originários dos povos indígenas e a criminalização do racismo — mostrando que a participação organizada alarga o que o sistema político processa.'],
          ['A participação popular na Constituinte não produziu efeitos no texto final.', 'Diversos dispositivos resultaram diretamente dessas emendas.', 'negar o resultado'],
        ],
        explanation: 'A Constituinte mostra o papel dos movimentos como canal de participação entre eleições, capaz de converter demanda em direito.',
      }),
      q({
        slug: 'q-movsoc-rec-1',
        stem: 'A afirmação de que "direitos são conquistados, e não concedidos" significa que:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'compreensão da relação entre luta social e direitos',
        seconds: 70,
        recovery: true,
        errors: ['interpretar direitos como dádiva estatal'],
        correct: 1,
        options: [
          ['Os direitos surgem naturalmente com o desenvolvimento econômico de um país.', 'Crescimento econômico não garante, por si só, ampliação de direitos.', 'atribuir os direitos ao crescimento'],
          ['A ampliação de direitos resulta historicamente da pressão organizada de grupos sociais sobre as instituições.', 'Jornada de trabalho, voto feminino, SUS e leis antirracismo resultaram de mobilização coletiva sustentada ao longo do tempo.'],
          ['Todo direito depende exclusivamente da vontade do governante em exercício.', 'A trajetória histórica mostra que a pressão social é decisiva, mesmo diante de governos resistentes.', 'personalizar a origem dos direitos'],
          ['Direitos existem apenas quando não há conflito social.', 'A maior parte dos direitos nasceu justamente de situações de conflito e disputa.', 'inverter a relação com o conflito'],
          ['Não há relação entre movimentos sociais e legislação.', 'Diversas leis resultaram diretamente da atuação de movimentos.', 'negar a relação documentada'],
        ],
        explanation: 'A frase resume um achado histórico: direitos sociais se firmaram por mobilização organizada, e não por concessão espontânea.',
      }),
    ],
  }),

  topic({
    slug: 'questao-agraria-e-agronegocio',
    name: 'Questão agrária e agronegócio',
    subject: 'geografia',
    area: 'ciencias-humanas',
    summary:
      'Relacionar concentração fundiária, modernização agrícola, agronegócio e agricultura familiar, avaliando impactos sociais e ambientais no campo brasileiro.',
    difficulty: 'intermediate',
    minutes: 25,
    weight: 86,
    order: 5,
    prerequisites: ['meio-ambiente-e-sociedade'],
    related: ['urbanizacao-e-desigualdade', 'globalizacao'],
    skill: {
      slug: 'analisar-estrutura-fundiaria-e-modelos-produtivos-no-campo',
      name: 'Analisar estrutura fundiária e modelos produtivos no campo',
      description:
        'Interpretar dados sobre posse da terra e produção agrícola e relacionar modelos produtivos a efeitos sociais, econômicos e ambientais.',
    },
    quick: `**Concentração fundiária: o dado que organiza o tema**

O Brasil tem um dos maiores índices de concentração de terras do mundo. Grandes propriedades ocupam a maior parte da área agrícola; os estabelecimentos familiares são a **maioria em número**, mas ocupam **fração pequena da área**.

Origem histórica: sesmarias → **Lei de Terras de 1850** (terra só se adquire por compra, e não por ocupação, logo antes da abolição) → latifúndio consolidado.

**Agronegócio × agricultura familiar**

| | Agronegócio | Agricultura familiar |
| --- | --- | --- |
| Escala | grande propriedade | pequena e média |
| Produção | commodities para exportação (soja, milho, carne, cana) | diversificada, boa parte para o mercado interno |
| Tecnologia | alta mecanização, insumos, defensivos | menor uso de máquinas; muitas vezes mais mão de obra |
| Emprego | pouca gente por hectare | absorve mais trabalho por área |
| Papel | superávit da balança comercial | parte relevante dos **alimentos** que vão à mesa |

Os dois coexistem. A prova costuma cobrar essa complementaridade — e os conflitos entre eles.

**Revolução Verde (a partir dos anos 1960-70)**

Sementes selecionadas, fertilizantes, agrotóxicos e mecanização. Resultado: **aumento enorme da produtividade**, mas também concentração de terras, êxodo rural, dependência de insumos e impactos ambientais.

**Conflitos e atores**

- **MST** e movimentos por reforma agrária.
- **Povos indígenas e quilombolas** — disputa por demarcação.
- **Ribeirinhos, quebradeiras de coco, seringueiros** — populações tradicionais.
- Grilagem, desmatamento e violência no campo.

**Fronteira agrícola**

Expansão para o Centro-Oeste (**Cerrado**) e, depois, para o **MATOPIBA** (Maranhão, Tocantins, Piauí, Bahia). Ganho produtivo com custo ambiental: o Cerrado é o berço das águas de várias bacias.`,
    explanation: {
      title: 'Por que produzir muito não resolve sozinho a questão agrária',
      body: `### 1. A herança que explica o presente

A **Lei de Terras de 1850** determinou que a terra devoluta só poderia ser adquirida por compra. Aprovada às vésperas do fim do tráfico e da futura abolição, ela fechou a porta de acesso à terra justamente para quem não tinha capital — libertos e imigrantes pobres.

O efeito foi manter a força de trabalho disponível para as grandes propriedades. É por isso que se diz que a concentração fundiária brasileira é uma construção **jurídica e política**, não um resultado natural da geografia.

### 2. Revolução Verde: dois resultados ao mesmo tempo

A modernização agrícola aumentou fortemente a produtividade por hectare. Isso é fato e aparece em todos os dados.

Mas ela foi **conservadora**: modernizou a técnica sem alterar a estrutura de propriedade. Quem tinha capital para comprar máquinas e insumos ampliou sua área; quem não tinha, vendeu ou perdeu a terra.

Consequências encadeadas:

produtividade ↑ → necessidade de mão de obra por hectare ↓ → **êxodo rural** → crescimento acelerado e desordenado das cidades → periferias e déficit habitacional urbano.

É a ponte que a prova frequentemente pede entre campo e cidade: o problema urbano brasileiro tem raiz agrária.

### 3. Agronegócio: o que os dados mostram e o que não mostram

O agronegócio responde por parcela expressiva das exportações brasileiras e sustenta o superávit da balança comercial. Ignorar isso é erro analítico.

Também é erro concluir que, por produzir muito, ele resolve a segurança alimentar interna. Boa parte da produção é de **commodities** destinadas à exportação ou ao consumo animal — soja e milho, sobretudo. Já parte relevante dos alimentos consumidos diretamente pela população vem da agricultura familiar: feijão, mandioca, hortaliças, leite.

**A formulação correta que a prova espera:** os dois modelos cumprem funções diferentes na economia e na alimentação, e produzir muito em volume não garante, por si só, acesso a alimento.

### 4. Fronteira agrícola e custo ambiental

A expansão sobre o Cerrado e, depois, sobre o MATOPIBA aumentou a área produtiva do país. O Cerrado, porém, é bioma de vegetação profunda e de raízes que alimentam aquéferos — nasce ali boa parte das águas de bacias importantes, como a do São Francisco e a do Tocantins.

Desmatar Cerrado e Amazônia para pasto e lavoura gera três tipos de efeito cobrados em prova:

- **climático:** emissões por mudança de uso do solo e alteração do regime de chuvas (os "rios voadores");
- **hídrico:** comprometimento de recarga de aquíferos e de nascentes;
- **social:** conflitos com populações tradicionais e concentração de terra na nova fronteira.

### 5. Reforma agrária: o debate real

Reforma agrária não significa apenas distribuir lotes. A literatura aponta que assentamentos só se sustentam com **crédito, assistência técnica, escoamento e infraestrutura**. Sem isso, o assentado vende o lote e o processo se desfaz.

Os argumentos que circulam no debate público:

- **A favor:** reduz desigualdade, fixa população no campo, diversifica a produção de alimentos, alivia a pressão sobre as cidades.
- **Contra:** alegação de menor produtividade e de insegurança jurídica para investimentos.

A resposta em uma redação ou questão dissertativa raramente é "escolher um lado" — é reconhecer a coexistência dos modelos e discutir os critérios: função social da propriedade (art. 186 da Constituição), produtividade, sustentabilidade e emprego.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — ler um gráfico de estrutura fundiária sem cair na armadilha',
        body: `**Situação:** um gráfico mostra que os estabelecimentos com menos de 10 hectares representam cerca de metade do total de estabelecimentos agropecuários do Brasil, mas ocupam apenas uma pequena fração da área total. O que se conclui?

**Passo 1 — identificar as duas variáveis:** **número de estabelecimentos** e **área ocupada**. São coisas diferentes, e a questão depende de não confundi-las.

**Passo 2 — ler cada uma:** muitos estabelecimentos pequenos; pouca área sob controle deles. No outro extremo, poucos estabelecimentos grandes concentram a maior parte da área.

**Passo 3 — nomear o fenômeno:** **concentração fundiária**.

**Passo 4 — evitar a conclusão apressada:** o gráfico **não** informa produtividade nem valor produzido. Alternativas que afirmam "logo, a pequena propriedade produz pouco" extrapolam o dado apresentado.

**Resposta correta típica:** o gráfico evidencia a desigualdade na distribuição da terra, com muitos estabelecimentos ocupando pouca área e poucos concentrando a maior parte.

**Regra geral:** responda apenas o que a variável do gráfico permite.`,
      },
      {
        title: 'Exemplo resolvido 2 — modernização que expulsa',
        body: `**Situação:** explique por que a modernização agrícola brasileira é chamada de "modernização conservadora" e que efeito urbano ela produziu.

**Passo 1 — o que foi modernizado:** a técnica. Máquinas, fertilizantes, defensivos, sementes selecionadas, a partir dos anos 1960-70.

**Passo 2 — o que **não** foi modificado:** a estrutura de propriedade da terra. A concentração permaneceu — e se aprofundou, porque só quem tinha capital pôde se modernizar.

**Passo 3 — por que "conservadora":** exatamente por isso: transformação técnica com conservação da estrutura fundiária e social.

**Passo 4 — o encadeamento com a cidade:** a mecanização reduziu a necessidade de trabalhadores por hectare → êxodo rural intenso → chegada massiva às cidades em poucas décadas → crescimento urbano mais rápido que a oferta de moradia, saneamento e transporte → periferização.

**Conclusão:** o processo explica ao mesmo tempo o salto de produtividade e a formação das grandes periferias urbanas brasileiras — dois fenômenos que a prova gosta de conectar.`,
      },
    ],
    mistakes: `**1. Confundir número de estabelecimentos com área ocupada.**
A agricultura familiar é maioria em número de estabelecimentos e minoria em área. Trocar as duas variáveis inverte completamente a leitura do gráfico.

**2. Concluir que alto volume de produção resolve a fome.**
Boa parte das commodities vai para exportação e ração animal. Segurança alimentar depende de acesso, renda e distribuição, não só de volume produzido.

**3. Tratar agronegócio e agricultura familiar como se um anulasse o outro.**
Eles coexistem, com funções distintas na economia e no abastecimento. Alternativas que apresentam um como simplesmente "atrasado" ou o outro como "irrelevante" costumam estar erradas.`,
    selfCheck: [
      'Como a Lei de Terras de 1850 ajuda a explicar a concentração fundiária atual?',
      'Por que a modernização agrícola brasileira é chamada de conservadora?',
      'Que relação existe entre mecanização no campo e periferização nas cidades?',
      'Qual a diferença de papel entre agronegócio e agricultura familiar no abastecimento alimentar?',
      'Quais impactos ambientais estão associados à expansão da fronteira agrícola sobre o Cerrado?',
    ],
    questions: [
      q({
        slug: 'q-agraria-1',
        stem: 'A expressão "concentração fundiária", usada para caracterizar o campo brasileiro, refere-se ao fato de que:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'definição de estrutura fundiária',
        seconds: 75,
        errors: ['confundir concentração de terras com concentração de produção'],
        correct: 1,
        options: [
          ['A produção agrícola se concentra em poucos produtos exportados.', 'Isso descreve a especialização produtiva, não a distribuição da terra.', 'trocar o conceito'],
          ['Uma parcela pequena dos estabelecimentos controla a maior parte da área agrícola do país.', 'Concentração fundiária é desigualdade na distribuição da posse da terra, com poucas propriedades ocupando grande parte da área.'],
          ['A população rural se concentra em poucas regiões do território.', 'Isso descreve distribuição demográfica, não estrutura fundiária.', 'trocar o conceito'],
          ['As atividades agrícolas se concentram em determinadas épocas do ano.', 'Isso descreve sazonalidade da produção.', 'trocar o conceito'],
          ['O governo concentra a propriedade de todas as terras agrícolas.', 'A maior parte das terras agrícolas brasileiras é de propriedade privada.', 'inverter a titularidade'],
        ],
        explanation: 'Concentração fundiária diz respeito à posse da terra: poucos estabelecimentos ocupando grande parte da área agrícola.',
      }),
      q({
        slug: 'q-agraria-2',
        stem: 'A modernização agrícola brasileira iniciada nos anos 1960 e 1970 é frequentemente chamada de "modernização conservadora" porque:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação do conceito a um processo histórico',
        seconds: 100,
        errors: ['supor que a modernização técnica alterou a estrutura fundiária'],
        correct: 3,
        options: [
          ['Não houve incorporação de novas tecnologias ao campo.', 'Houve intensa incorporação de máquinas, insumos e sementes selecionadas.', 'negar a modernização técnica'],
          ['A produtividade agrícola permaneceu estagnada em todo o período.', 'A produtividade por hectare cresceu de forma expressiva.', 'negar o ganho produtivo'],
          ['O processo redistribuiu a propriedade da terra entre pequenos produtores.', 'A concentração fundiária foi mantida e, em várias regiões, aprofundada.', 'inverter o efeito fundiário'],
          ['Introduziu forte transformação técnica sem alterar a estrutura de propriedade da terra, aprofundando a concentração fundiária.', 'Modernizou-se a produção, mas apenas quem dispunha de capital pôde acompanhar; a estrutura de posse permaneceu intacta, daí o adjetivo "conservadora".'],
          ['Foi conduzido exclusivamente pela agricultura familiar.', 'O acesso a crédito e tecnologia beneficiou majoritariamente a grande propriedade.', 'inverter o protagonismo'],
        ],
        explanation: 'Modernização conservadora: avanço técnico expressivo sem reforma da estrutura fundiária, o que ampliou a concentração.',
        strategy: 'Separe sempre duas dimensões: mudança técnica e mudança na estrutura de propriedade.',
      }),
      q({
        slug: 'q-agraria-3',
        stem: 'Um gráfico mostra que estabelecimentos agropecuários com menos de dez hectares são cerca de metade do total de estabelecimentos do país, mas ocupam parcela muito reduzida da área agrícola total. A conclusão que o gráfico autoriza é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura rigorosa de dados sobre número de estabelecimentos e área ocupada',
        seconds: 125,
        errors: ['extrapolar conclusões sobre produtividade a partir de dados de área'],
        correct: 0,
        options: [
          ['Há acentuada desigualdade na distribuição da terra, com muitos estabelecimentos ocupando pouca área e poucos concentrando grande parte dela.', 'As duas variáveis do gráfico — número de estabelecimentos e área ocupada — evidenciam a concentração fundiária, sem autorizar conclusões sobre produtividade.'],
          ['As pequenas propriedades produzem pouco, por ocuparem área reduzida.', 'O gráfico informa área, não produção; a relação entre área e produtividade não é linear.', 'extrapolar além do dado'],
          ['A maior parte da população brasileira vive no campo.', 'O gráfico não traz dados demográficos, e o país é majoritariamente urbano.', 'extrapolar para outra variável'],
          ['A área agrícola do país vem diminuindo ao longo do tempo.', 'O gráfico não apresenta série histórica de área total.', 'extrapolar para outra variável'],
          ['Não existe diferença relevante entre os estabelecimentos brasileiros.', 'O gráfico evidencia justamente uma diferença acentuada.', 'inverter a leitura'],
        ],
        explanation: 'Responda apenas o que a variável permite: número de estabelecimentos e área mostram concentração, não produtividade.',
      }),
      q({
        slug: 'q-agraria-4',
        stem: 'Comparando o agronegócio exportador e a agricultura familiar no Brasil, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre modelos produtivos quanto a destino, emprego e abastecimento',
        seconds: 145,
        errors: ['tratar um modelo como simplesmente superior ao outro'],
        correct: 2,
        options: [
          ['A agricultura familiar não tem participação relevante no abastecimento interno.', 'Ela responde por parcela significativa de alimentos consumidos diretamente pela população.', 'subestimar a agricultura familiar'],
          ['O agronegócio é irrelevante para a economia brasileira.', 'Ele responde por parcela expressiva das exportações e do saldo comercial.', 'subestimar o agronegócio'],
          ['O agronegócio é fortemente voltado a commodities de exportação e emprega pouca mão de obra por área, enquanto a agricultura familiar tem produção mais diversificada, absorve mais trabalho por hectare e contribui de modo relevante para o abastecimento interno.', 'Os modelos cumprem funções distintas: um sustenta o superávit comercial com alta mecanização; o outro mantém emprego no campo e diversidade de alimentos no mercado interno.'],
          ['Os dois modelos produzem exatamente os mesmos produtos, nas mesmas proporções.', 'As pautas produtivas são distintas, com predomínio de commodities em um e de alimentos diversificados no outro.', 'apagar as diferenças'],
          ['A agricultura familiar utiliza mais mecanização por hectare que o agronegócio.', 'A mecanização intensiva é característica do agronegócio de larga escala.', 'inverter os dados de tecnologia'],
        ],
        explanation: 'Os modelos são complementares em função: exportação e saldo comercial, de um lado; emprego rural e abastecimento interno, de outro.',
        strategy: 'Compare por três eixos: destino da produção, uso de trabalho e papel no abastecimento.',
      }),
      q({
        slug: 'q-agraria-5',
        stem: 'A expansão da fronteira agrícola sobre o Cerrado ampliou significativamente a produção de grãos no país. Considerando as características do bioma e os efeitos dessa expansão, a análise mais completa é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre ganho produtivo, funções ecológicas do bioma e conflitos sociais',
        seconds: 175,
        errors: ['avaliar a expansão apenas pelo ganho de produção'],
        correct: 4,
        options: [
          ['A expansão não produziu efeitos ambientais relevantes, por se tratar de vegetação de pequeno porte.', 'O Cerrado tem raízes profundas e papel decisivo na recarga hídrica, apesar do porte da vegetação aparente.', 'subestimar o bioma pela aparência'],
          ['O ganho produtivo é suficiente para justificar qualquer nível de supressão do bioma.', 'A avaliação exige considerar também custos hídricos, climáticos e sociais.', 'reduzir a análise a uma variável'],
          ['A expansão não teve relação com conflitos por terra na região.', 'A ocupação da nova fronteira envolveu grilagem e disputas com populações tradicionais.', 'negar a dimensão social'],
          ['O Cerrado não possui relação com as bacias hidrográficas brasileiras.', 'Nele nascem cursos d’água de várias bacias importantes, entre elas a do São Francisco.', 'negar a função hídrica'],
          ['Houve ganho expressivo de produção, acompanhado de custos ambientais — perda de vegetação nativa, comprometimento da recarga de aquíferos e emissões por mudança de uso do solo — e de conflitos fundiários com populações tradicionais.', 'A análise completa reconhece simultaneamente o resultado econômico e os custos hídricos, climáticos e sociais da expansão sobre o bioma.'],
        ],
        explanation: 'Avaliar fronteira agrícola exige somar três planos: produção, funções ecológicas do bioma e conflitos pela terra.',
      }),
      q({
        slug: 'q-agraria-rec-1',
        stem: 'A Lei de Terras, aprovada no Brasil em 1850, estabeleceu que o acesso às terras devolutas se daria por:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento do marco legal da estrutura fundiária',
        seconds: 70,
        recovery: true,
        errors: ['supor que a lei facilitou o acesso à terra por ocupação'],
        correct: 1,
        options: [
          ['Ocupação e trabalho na terra, sem necessidade de pagamento.', 'A lei encerrou justamente a possibilidade de aquisição por posse e ocupação.', 'inverter o conteúdo da lei'],
          ['Compra, excluindo a aquisição por simples ocupação.', 'Ao exigir compra, a lei restringiu o acesso à terra a quem tinha capital, às vésperas do fim do tráfico e da futura abolição.'],
          ['Distribuição gratuita a ex-escravizados.', 'Não houve política de distribuição de terras aos libertos.', 'atribuir política inexistente'],
          ['Sorteio público entre imigrantes recém-chegados.', 'Não existiu tal mecanismo de distribuição.', 'atribuir política inexistente'],
          ['Concessão automática a qualquer cidadão que a solicitasse.', 'A aquisição dependia de compra, e não de solicitação.', 'inverter o conteúdo da lei'],
        ],
        explanation: 'A Lei de Terras de 1850 condicionou o acesso à compra, fechando a via da ocupação e ajudando a consolidar a concentração fundiária.',
      }),
    ],
  }),

  topic({
    slug: 'conhecimento-e-ciencia',
    name: 'Conhecimento e ciência',
    subject: 'filosofia',
    area: 'ciencias-humanas',
    summary:
      'Distinguir tipos de conhecimento, comparar racionalismo e empirismo e compreender o método científico, a falseabilidade e os limites da ciência.',
    difficulty: 'intermediate',
    minutes: 24,
    weight: 84,
    order: 3,
    prerequisites: ['etica'],
    related: ['filosofia-politica-e-poder', 'meio-ambiente-e-sociedade'],
    skill: {
      slug: 'avaliar-formas-de-conhecimento-e-criterios-de-validade',
      name: 'Avaliar formas de conhecimento e critérios de validade',
      description:
        'Distinguir senso comum, ciência, filosofia e outras formas de saber, identificando critérios de validação e limites de cada uma.',
    },
    quick: `**Formas de conhecimento**

| Tipo | Como se valida | Exemplo |
| --- | --- | --- |
| **Senso comum** | experiência cotidiana, tradição | "chá de boldo faz bem ao fígado" |
| **Científico** | método, teste, revisão por pares | eficácia medida em ensaio clínico |
| **Filosófico** | argumentação racional, análise de conceitos | o que é justiça? |
| **Religioso** | fé, revelação, tradição | dogmas |
| **Artístico** | expressão e sensibilidade | uma obra que revela uma condição humana |

Não são uma escada do pior ao melhor: cada um responde a perguntas diferentes. A ciência não decide o que é belo; a arte não mede a temperatura de fusão do ferro.

**Racionalismo × empirismo**

- **Racionalismo** (Descartes): a fonte segura do conhecimento é a **razão**. Os sentidos enganam. Método da dúvida → *"penso, logo existo"*.
- **Empirismo** (Locke, Hume): todo conhecimento vem da **experiência**. A mente nasce como "tábula rasa".
- **Kant** faz a síntese: conhecemos porque a experiência fornece o **conteúdo** e a razão fornece as **formas** que o organizam. "Pensamentos sem conteúdo são vazios; intuições sem conceitos são cegas."

**Método e demarcação**

- **Indução:** do particular ao geral (observações → lei). Hume mostra seu problema: nenhuma quantidade de casos garante o próximo.
- **Dedução:** do geral ao particular; conclusão necessária, se as premissas forem verdadeiras.
- **Popper — falseabilidade:** uma teoria é científica se puder, em princípio, ser **refutada** por um teste. Não é a confirmação que qualifica a ciência, é a exposição ao risco de erro.
- **Kuhn — paradigmas:** a ciência opera dentro de um paradigma até que anomalias acumuladas provoquem uma **revolução científica**.

**O que a ciência não é**

Não é verdade definitiva — é conhecimento **provisório e corrigível**. Essa abertura à revisão é sua força, não sua fraqueza.`,
    explanation: {
      title: 'Como se decide que um conhecimento é válido',
      body: `### 1. Senso comum não é sinônimo de erro

O senso comum organiza a vida prática e às vezes acerta. O que o distingue da ciência não é ser falso, e sim **como se valida**: ele se apoia na repetição, na tradição e na experiência imediata, sem controle sistemático de variáveis nem exposição pública a testes.

Por isso ele é frágil diante de casos em que a intuição falha — e é justamente aí que o método científico se torna necessário.

### 2. A dúvida de Descartes e a experiência de Hume

**Descartes** procura um ponto de partida absolutamente seguro. Para isso, duvida de tudo o que pode ser duvidado: os sentidos enganam, os sonhos imitam a vigília, até a matemática poderia ser manipulada por um "gênio maligno". Resta uma certeza: se duvido, **penso**; se penso, **existo**. A razão, e não os sentidos, é o fundamento.

**Hume** vai na direção oposta. Todo conteúdo da mente vem das impressões sensíveis. E há uma consequência incômoda: a ideia de **causalidade** não é algo que observamos — observamos apenas uma sucessão constante de eventos e passamos a esperar que ela continue por **hábito**. Nada garante que o futuro se pareça com o passado.

Esse é o **problema da indução**, e ele é decisivo: por mais cisnes brancos que se observem, nada prova que não exista um preto.

### 3. Kant: nem só razão, nem só experiência

Kant reconhece que Hume tem razão quanto à origem do conteúdo — sem experiência não há conhecimento de mundo — mas mostra que a experiência sozinha não basta. Nós não recebemos o mundo passivamente: organizamos as sensações em **espaço, tempo e categorias** (causa, substância, quantidade), que são formas da própria estrutura do nosso conhecer.

Consequência importante: conhecemos o **fenômeno** (a coisa tal como aparece a nós), não a coisa em si.

### 4. Popper e a falseabilidade

Popper enfrenta o problema da demarcação: o que separa ciência de pseudociência?

A resposta não é "a ciência é confirmada por muitos casos" — teorias vagas o bastante são confirmadas por tudo. O critério é o inverso: **uma teoria é científica se especifica o que poderia refutá-la**.

- "Todos os corpos caem com a mesma aceleração no vácuo" → é falseável: basta um corpo que não caia assim.
- "Tudo acontece porque tem que acontecer" → não é falseável: nenhum resultado a contradiz.

Por isso uma teoria científica nunca é definitivamente provada — ela é **corroborada até o momento**. A provisoriedade é estrutural.

### 5. Kuhn e a ciência como prática coletiva

Kuhn observa a história real da ciência e nota que ela não avança por falsificações pontuais. Os cientistas trabalham dentro de um **paradigma** — um conjunto de teorias, métodos e problemas considerados legítimos — resolvendo quebra-cabeças (**ciência normal**).

Quando anomalias se acumulam e o paradigma não dá conta, ocorre uma **revolução científica** e um novo paradigma se estabelece. A passagem do geocentrismo ao heliocentrismo e da física newtoniana à relatividade são os exemplos clássicos.

Isso não torna a ciência arbitrária: mostra que ela é uma prática **coletiva, histórica e institucional** — com revisão por pares, reprodutibilidade e crítica pública.

### 6. Por que isso cai na prova hoje

Questões sobre negacionismo, vacinas, mudanças climáticas e fake news cobram exatamente estes conceitos. Os pontos mais exigidos:

- Divergência entre cientistas **não** significa que "não se sabe nada": o debate é parte do método.
- Teoria científica **não** é "mero palpite": no vocabulário científico, teoria é um corpo explicativo amplamente testado.
- Ser revisável **não** enfraquece a ciência: é o que permite corrigir erros.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — aplicar o critério de falseabilidade',
        body: `**Situação:** classifique as afirmações quanto à falseabilidade.

I. "Este medicamento reduz em 30% o tempo de recuperação da doença X."
II. "Tudo o que acontece na sua vida acontece porque tinha de acontecer."

**Passo 1 — afirmação I:** é possível imaginar um resultado que a contradiga — um ensaio clínico controlado em que não haja diferença entre o grupo tratado e o grupo placebo. Existe teste capaz de refutá-la → **falseável** → candidata a enunciado científico.

**Passo 2 — afirmação II:** qualquer acontecimento, bom ou ruim, é compatível com ela. Não há resultado possível que a contrarie → **não falseável**.

**Passo 3 — cuidado com a interpretação:** não falseável **não** quer dizer falsa nem desprezível. Quer dizer que está fora do campo do que a ciência pode testar — pode ser uma crença legítima, mas não um enunciado científico.

**Passo 4 — resposta:** apenas I é falseável, e por isso apenas ela pode ser avaliada pelo método científico.

**Na prova:** a alternativa correta costuma frisar que o critério é **poder ser refutada**, não "ter muitas confirmações".`,
      },
      {
        title: 'Exemplo resolvido 2 — divergência entre cientistas não é ignorância',
        body: `**Situação:** um texto afirma que, como cientistas divergem sobre detalhes de um fenômeno, "a ciência não sabe nada sobre o assunto e qualquer opinião vale igualmente". Avalie o argumento.

**Passo 1 — identificar a estrutura do argumento:** de "há divergência em algum ponto" conclui-se "não há conhecimento algum". Há um salto indevido entre as duas coisas.

**Passo 2 — descrever como a ciência funciona:** o debate, a revisão por pares e a disputa de hipóteses **fazem parte** do método. É assim que hipóteses frágeis são eliminadas.

**Passo 3 — distinguir níveis de consenso:** é comum haver acordo amplo sobre o núcleo de uma teoria e divergência sobre detalhes, magnitudes ou mecanismos secundários. Uma coisa não anula a outra.

**Passo 4 — avaliar a conclusão "qualquer opinião vale igualmente":** ela ignora que enunciados científicos passam por testes, controle e exposição pública à crítica, o que opiniões não submetidas a esse processo não fizeram.

**Conclusão:** o argumento é falacioso. A provisoriedade e o debate são condições de funcionamento da ciência, e não prova de sua incapacidade.`,
      },
    ],
    mistakes: `**1. Tratar as formas de conhecimento como uma escada de valor.**
Ciência, filosofia, arte e religião respondem a perguntas diferentes e se validam de modos distintos. A comparação correta é por critério de validação, não por hierarquia.

**2. Confundir "teoria" no sentido comum e no científico.**
No cotidiano, teoria é palpite. Na ciência, é um corpo explicativo amplamente testado — como a teoria da evolução ou a da gravitação.

**3. Concluir que ciência revisável é ciência não confiável.**
A possibilidade de revisão é justamente o mecanismo de correção de erros. Uma explicação que nunca pode ser contestada está fora da ciência, não acima dela.`,
    selfCheck: [
      'Qual a diferença entre senso comum e conhecimento científico em termos de validação?',
      'Explique o problema da indução levantado por Hume com um exemplo.',
      'Como Kant articula razão e experiência?',
      'O que significa dizer que uma afirmação é falseável, e por que isso importa?',
      'Por que a divergência entre cientistas não autoriza dizer que "nada se sabe" sobre um tema?',
    ],
    questions: [
      q({
        slug: 'q-conhec-1',
        stem: 'A principal diferença entre o conhecimento do senso comum e o conhecimento científico está no fato de que este último:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'distinção entre formas de conhecimento por critério de validação',
        seconds: 75,
        errors: ['supor que o senso comum é sempre falso'],
        correct: 3,
        options: [
          ['É sempre verdadeiro, enquanto o senso comum é sempre falso.', 'O senso comum pode acertar, e a ciência pode errar e se corrigir.', 'transformar a diferença em hierarquia de verdade'],
          ['Dispensa qualquer relação com a experiência.', 'A ciência se apoia fortemente em observação e experimentação.', 'negar a base empírica'],
          ['É produzido individualmente, sem participação de outras pessoas.', 'A ciência é prática coletiva, com revisão por pares e reprodutibilidade.', 'negar a dimensão coletiva'],
          ['Segue métodos sistemáticos, com controle de variáveis, testes e exposição pública à crítica.', 'A diferença está no modo de validação: procedimento controlado, verificável e submetido ao escrutínio da comunidade científica.'],
          ['Não pode ser revisado depois de formulado.', 'A revisibilidade é característica essencial do conhecimento científico.', 'inverter uma propriedade central'],
        ],
        explanation: 'A distinção não é entre verdade e erro, e sim entre formas de validar: método controlado e crítica pública de um lado, experiência imediata e tradição de outro.',
      }),
      q({
        slug: 'q-conhec-2',
        stem: 'Ao afirmar que uma teoria só pode ser considerada científica se for possível conceber um experimento capaz de refutá-la, Karl Popper propõe como critério de demarcação:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação do critério de demarcação popperiano',
        seconds: 95,
        errors: ['confundir falseabilidade com falsidade'],
        correct: 2,
        options: [
          ['A quantidade de confirmações obtidas pela teoria.', 'Para Popper, acumular confirmações não distingue ciência de pseudociência.', 'trocar o critério por confirmação'],
          ['A aceitação da teoria pela maioria das pessoas.', 'Aceitação popular não é critério de cientificidade.', 'trocar o critério por consenso social'],
          ['A falseabilidade, isto é, a possibilidade de a teoria ser refutada por um teste.', 'Uma teoria científica precisa se expor ao risco do erro, especificando o que poderia contrariá-la.'],
          ['A falsidade da teoria, já demonstrada por experimentos.', 'Falseável significa poder ser testada e eventualmente refutada, não já refutada.', 'confundir falseabilidade com falsidade'],
          ['A impossibilidade de qualquer contestação à teoria.', 'Uma teoria imune a contestação é, para Popper, não científica.', 'inverter o critério'],
        ],
        explanation: 'Falseabilidade é a possibilidade de refutação. Teorias imunes a qualquer teste ficam fora do campo científico.',
        strategy: 'Pergunte: que resultado tornaria essa afirmação falsa? Se nenhum, ela não é falseável.',
      }),
      q({
        slug: 'q-conhec-3',
        stem: 'Um texto de circulação nas redes sustenta que, como cientistas divergem sobre aspectos de determinado fenômeno, nada se sabe a respeito dele e qualquer opinião tem o mesmo valor. A análise filosófica adequada desse argumento é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'avaliação crítica de argumento sobre autoridade científica',
        seconds: 130,
        errors: ['confundir debate interno da ciência com ausência de conhecimento'],
        correct: 0,
        options: [
          ['O argumento é falacioso, pois a divergência sobre aspectos específicos convive com amplo acordo sobre o núcleo da teoria, e o debate crítico integra o próprio método científico.', 'Discordância pontual não anula o consenso construído por testes e revisão por pares; e opiniões não submetidas a esse processo não têm o mesmo estatuto de enunciados testados.'],
          ['O argumento é correto, pois a ciência só pode afirmar algo quando há unanimidade absoluta.', 'A unanimidade absoluta não é critério de validade científica nem ocorre na prática.', 'exigir unanimidade'],
          ['O argumento é correto, pois todo conhecimento é igualmente arbitrário.', 'Diferentes formas de conhecimento têm critérios distintos de validação, e isso não as torna equivalentes.', 'igualar todos os saberes'],
          ['O argumento é irrelevante, pois a ciência não admite qualquer tipo de debate interno.', 'O debate é parte constitutiva da prática científica.', 'negar o debate científico'],
          ['O argumento demonstra que a ciência deveria abandonar a revisão por pares.', 'A revisão por pares é justamente um dos mecanismos de controle de qualidade do conhecimento.', 'inverter o papel do mecanismo'],
        ],
        explanation: 'Divergência sobre detalhes não equivale a ausência de conhecimento: o debate crítico é como a ciência elimina hipóteses frágeis.',
      }),
      q({
        slug: 'q-conhec-4',
        stem: 'Comparando racionalismo cartesiano e empirismo, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre correntes quanto à origem do conhecimento',
        seconds: 145,
        errors: ['atribuir a Descartes a defesa da experiência sensível como fundamento'],
        correct: 4,
        options: [
          ['Ambos consideram a experiência sensível a única fonte segura de conhecimento.', 'Essa é a posição empirista; Descartes desconfia dos sentidos.', 'igualar as correntes'],
          ['Descartes defende que a mente nasce como tábula rasa.', 'A tese da tábula rasa é de Locke, não de Descartes.', 'trocar os autores'],
          ['O empirismo sustenta que o conhecimento independe completamente da experiência.', 'O empirismo afirma exatamente o contrário.', 'inverter a tese empirista'],
          ['As duas correntes rejeitam qualquer papel da razão no conhecimento.', 'Ambas atribuem algum papel à razão, ainda que com pesos diferentes.', 'negar o papel da razão'],
          ['Descartes toma a razão como fundamento seguro, desconfiando dos sentidos, enquanto o empirismo sustenta que todo conteúdo do conhecimento provém da experiência.', 'A divergência está na fonte: dúvida metódica e certeza racional em Descartes; impressões sensíveis como origem de todas as ideias no empirismo.'],
        ],
        explanation: 'Racionalismo e empirismo divergem sobre a fonte do conhecimento — razão ou experiência —, tensão que Kant tentará articular.',
        strategy: 'Localize a fonte do conhecimento defendida por cada corrente antes de avaliar as alternativas.',
      }),
      q({
        slug: 'q-conhec-5',
        stem: 'Thomas Kuhn sustenta que a ciência opera dentro de paradigmas e que, quando anomalias se acumulam sem solução, ocorre uma revolução científica que substitui o paradigma vigente. Articulando essa tese ao caráter provisório do conhecimento científico, conclui-se que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre história da ciência, provisoriedade e confiabilidade do conhecimento',
        seconds: 175,
        errors: ['concluir que a mudança de paradigmas torna a ciência arbitrária'],
        correct: 1,
        options: [
          ['A substituição de paradigmas mostra que o conhecimento científico é arbitrário e equivale a qualquer outra crença.', 'A mudança de paradigma resulta de anomalias, testes e debate coletivo, e não de escolha arbitrária.', 'confundir historicidade com arbitrariedade'],
          ['A ciência é uma prática histórica e coletiva, cujo caráter provisório e revisável é justamente o que permite corrigir erros e ampliar a explicação dos fenômenos.', 'Reconhecer que teorias são substituídas quando deixam de explicar bem os fenômenos evidencia um mecanismo de autocorreção, o que reforça, e não enfraquece, a confiabilidade do empreendimento científico.'],
          ['Uma vez estabelecido um paradigma, ele se torna imune a qualquer revisão.', 'A tese de Kuhn descreve exatamente a possibilidade de superação de paradigmas.', 'negar a revisão'],
          ['As revoluções científicas ocorrem por decisão individual de um único cientista.', 'Trata-se de processo coletivo, envolvendo a comunidade científica ao longo do tempo.', 'individualizar o processo'],
          ['A existência de paradigmas demonstra que a ciência não utiliza observação nem experimento.', 'A ciência normal é intensamente experimental, dentro do quadro do paradigma.', 'negar a base empírica'],
        ],
        explanation: 'Mudança de paradigma é mecanismo de correção, não sinal de arbitrariedade: a provisoriedade é o que permite à ciência avançar.',
      }),
      q({
        slug: 'q-conhec-rec-1',
        stem: 'No vocabulário científico, a palavra "teoria" designa:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'esclarecimento de terminologia científica',
        seconds: 70,
        recovery: true,
        errors: ['usar o sentido cotidiano de teoria como palpite'],
        correct: 2,
        options: [
          ['Um palpite ainda não verificado sobre um fenômeno.', 'Esse é o sentido cotidiano da palavra, que corresponde melhor a "hipótese".', 'usar o sentido cotidiano'],
          ['Uma opinião pessoal sem necessidade de comprovação.', 'Teoria científica exige comprovação e teste sistemático.', 'usar o sentido cotidiano'],
          ['Um conjunto explicativo amplamente testado, capaz de organizar fenômenos e gerar previsões.', 'Teorias como a da evolução ou a da gravitação reúnem grande volume de evidências e permitem prever resultados de novos testes.'],
          ['Uma afirmação impossível de ser contestada por qualquer experimento.', 'Teorias científicas devem ser falseáveis, isto é, sujeitas a teste.', 'inverter uma propriedade central'],
          ['Um cálculo matemático sem relação com observações.', 'Teorias científicas articulam formulação e evidência empírica.', 'separar teoria e observação'],
        ],
        explanation: 'Teoria científica não é palpite: é explicação amplamente testada, com poder de previsão — como evolução e gravitação.',
      }),
    ],
  }),
];

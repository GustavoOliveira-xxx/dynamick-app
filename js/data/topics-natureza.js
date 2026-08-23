




export const NATUREZA_TOPICS = [
  {
    slug: 'ecologia-e-ciclos',
    name: 'Ecologia e ciclos',
    subjectSlug: 'biologia',
    areaSlug: 'ciencias-natureza',
    summary:
      'Relacionar seres vivos, energia, matéria e impactos ambientais em cadeias, teias e ciclos biogeoquímicos.',
    difficulty: 'intro',
    estimatedMinutes: 25,
    curationWeight: 93,
    order: 1,
    related: ['energia-e-transformacoes'],
    skills: [
      {
        slug: 'relacionar-seres-vivos-energia-materia-impactos',
        name: 'Relacionar seres vivos, energia, matéria e impactos ambientais',
        description:
          'Interpretar fluxo de energia, ciclagem de matéria e efeitos de alterações em cadeias e ecossistemas.',
      },
    ],
    content: [
      {
        slug: 'ecologia-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `Duas regras organizam quase toda a ecologia:

1. **Energia FLUI** — entra pelo Sol, passa pelos níveis tróficos e sai como calor. **Não volta.**
2. **Matéria CICLA** — carbono, nitrogênio, água e fósforo são reutilizados indefinidamente.

**Níveis tróficos:**
produtores → consumidores primários → secundários → terciários, com **decompositores** atuando em todos.

**A regra dos 10%:** a cada nível, cerca de 90% da energia se perde como calor. Por isso as cadeias são curtas (3 a 5 níveis) e há sempre muito mais capim que onça.

**Bioacumulação:** substâncias que o organismo não elimina se concentram ao subir a cadeia. O topo é o mais atingido — inclusive quando o topo somos nós.`,
      },
      {
        slug: 'ecologia-explicacao',
        kind: 'explanation',
        title: 'Fluxo, ciclagem e o efeito das alterações',
        depth: 'standard',
        order: 2,
        body: `### 1. Por que energia flui e matéria cicla

A energia solar é capturada na fotossíntese e transformada em matéria orgânica. A cada transferência, parte se dissipa como calor — energia degradada não é reaproveitada pelo ecossistema. Por isso é preciso **entrada contínua** de energia.

Já os átomos de carbono, nitrogênio e fósforo são os mesmos há bilhões de anos: passam de organismo para organismo, voltam ao solo e à atmosfera e retornam. Um ecossistema não precisa de "entrada de matéria" da mesma forma.

### 2. A pirâmide e o número de níveis

Se cada nível aproveita cerca de 10% da energia do anterior:
- 10.000 kcal em produtores
- 1.000 kcal em consumidores primários
- 100 kcal em secundários
- 10 kcal em terciários

Depois disso não sobra energia suficiente para sustentar mais um nível. É a razão física para cadeias curtas — não uma escolha dos organismos.

### 3. Cadeia x teia

**Cadeia** é uma sequência linear, uma simplificação didática. **Teia** é o que existe de fato: o mesmo organismo ocupa níveis diferentes conforme o que come.

Consequência prática: a remoção de uma espécie em uma teia tem efeitos que se propagam por vários caminhos, não apenas para cima e para baixo de uma linha.

### 4. Ciclos biogeoquímicos, em uma frase cada

- **Água:** evaporação/transpiração → condensação → precipitação → infiltração e escoamento.
- **Carbono:** fotossíntese retira CO₂; respiração, decomposição e queima devolvem. A queima de combustível fóssil devolve carbono estocado por milhões de anos em décadas — daí o desequilíbrio.
- **Nitrogênio:** o N₂ do ar é abundante mas inerte; bactérias fixadoras o convertem em formas assimiláveis. Sem elas, não há proteína.
- **Fósforo:** não tem fase gasosa relevante; vem da rocha e é o mais facilmente limitante.

### 5. Eutrofização — o encadeamento que mais cai

Excesso de nutrientes (esgoto, fertilizante) → proliferação de algas → bloqueio de luz → morte de produtores submersos → decomposição intensa → **consumo de oxigênio dissolvido** → mortandade de peixes.

Repare: o que mata os peixes é a **falta de oxigênio**, não a alga em si. Esse detalhe é a resposta correta na maioria das questões sobre o tema.

### 6. Bioacumulação e biomagnificação

- **Bioacumulação:** acúmulo ao longo da vida de um indivíduo.
- **Biomagnificação:** aumento da concentração a cada nível trófico.

Um predador de topo come muitos organismos contaminados e concentra a substância de todos eles.`,
      },
      {
        slug: 'ecologia-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — o que acontece ao remover um nível',
        order: 3,
        body: `**Situação:** em um lago, a pesca intensiva reduz drasticamente a população de peixes carnívoros que se alimentam de peixes menores herbívoros.

**Encadeamento esperado:**
1. Sem predador, a população de herbívoros **aumenta**.
2. Mais herbívoros consomem mais algas e plantas aquáticas → produtores **diminuem**.
3. Com menos produtores, o alimento se torna escasso e a população de herbívoros **cai** depois de um pico.
4. O sistema oscila até encontrar novo equilíbrio, geralmente com menor biodiversidade.

**O erro comum:** parar no passo 1 e responder "aumenta a população de herbívoros" como efeito final. A questão costuma pedir o efeito **sobre os produtores** ou o resultado após o período de ajuste.

**Conceito envolvido:** controle de cima para baixo (top-down) exercido por predadores sobre a estrutura da comunidade.`,
      },
      {
        slug: 'ecologia-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — ler uma pirâmide de energia',
        order: 4,
        body: `**Dados:** um ecossistema tem 20.000 kcal/m²/ano fixadas pelos produtores.

**Pergunta:** quanta energia chega, aproximadamente, ao terceiro nível de consumidores?

**Cálculo (transferência de ~10%):**
- Consumidores primários: 2.000 kcal
- Consumidores secundários: 200 kcal
- Consumidores terciários: **20 kcal**

**Interpretação:** 20 kcal de 20.000 — apenas 0,1% da energia inicial. Isso explica por que predadores de topo são poucos, precisam de grandes territórios e são os mais vulneráveis a alterações no ecossistema.

**Extensão útil:** também explica por que uma dieta baseada em produtores sustenta mais pessoas por hectare que uma baseada em consumidores — menos etapas, menos perda.`,
      },
      {
        slug: 'ecologia-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Dizer que a energia "cicla".**
Energia flui e se dissipa; matéria cicla. Trocar os dois é o erro mais frequente da área.

**2. Dizer que na eutrofização as algas envenenam os peixes.**
Na maioria dos casos, os peixes morrem por **queda do oxigênio dissolvido** durante a decomposição da matéria orgânica. A causa é indireta.

**3. Tratar decompositores como um nível no fim da cadeia.**
Eles atuam sobre **todos** os níveis, devolvendo matéria ao ambiente. Não são o "último degrau".`,
      },
      {
        slug: 'ecologia-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Por que as cadeias alimentares raramente passam de cinco níveis?
2. Explique, passo a passo, por que a eutrofização mata peixes.
3. Qual é a diferença entre bioacumulação e biomagnificação?`,
      },
    ],
    questions: [
      {
        slug: 'q-eco-1',
        stem:
          'Em um ecossistema, os produtores fixam 15.000 kcal/m²/ano. Considerando uma transferência média de 10% entre níveis tróficos, a energia disponível para os consumidores secundários é de aproximadamente:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'aplicação da regra dos 10%',
        estimatedSeconds: 90,
        skillSlug: 'relacionar-seres-vivos-energia-materia-impactos',
        likelyErrors: ['errar o número de transferências', 'confundir os níveis'],
        options: [
          { label: 'A', text: '1.500 kcal/m²/ano', rationale: 'Esse é o valor dos consumidores primários — apenas uma transferência a partir dos produtores.', errorHint: 'contar uma transferência a menos' },
          { label: 'B', text: '150 kcal/m²/ano', isCorrect: true, rationale: 'São duas transferências: 15.000 → 1.500 (primários) → 150 (secundários).' },
          { label: 'C', text: '15 kcal/m²/ano', rationale: 'Corresponde aos consumidores terciários, uma transferência além do pedido.', errorHint: 'contar uma transferência a mais' },
          { label: 'D', text: '7.500 kcal/m²/ano', rationale: 'Corresponde a 50% de transferência, e não aos 10% informados.', errorHint: 'usar percentual incorreto' },
          { label: 'E', text: '15.000 kcal/m²/ano', rationale: 'É o valor fixado pelos produtores, antes de qualquer transferência.', errorHint: 'não aplicar a perda' },
        ],
        explanation: {
          summary: 'Produtores → primários → secundários são duas etapas de 10%: 15.000 × 0,1 × 0,1 = 150.',
          strategy: 'Escreva a cadeia com setas e conte quantas setas separam o nível pedido dos produtores.',
        },
      },
      {
        slug: 'q-eco-2',
        stem:
          'Um lago próximo a área agrícola recebe grande quantidade de fertilizantes por escoamento. Semanas depois, observa-se intensa proliferação de algas e, em seguida, mortandade de peixes.\n\nA causa direta da morte dos peixes é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'encadeamento causal na eutrofização',
        estimatedSeconds: 110,
        skillSlug: 'relacionar-seres-vivos-energia-materia-impactos',
        likelyErrors: ['atribuir a morte às algas diretamente', 'parar no primeiro passo'],
        options: [
          { label: 'A', text: 'A redução do oxigênio dissolvido durante a decomposição da matéria orgânica acumulada.', isCorrect: true, rationale: 'As algas morrem em massa e sua decomposição consome oxigênio dissolvido. Os peixes morrem por asfixia — a causa é indireta.' },
          { label: 'B', text: 'A liberação de gás carbônico pelas algas durante a fotossíntese.', rationale: 'Na fotossíntese as algas consomem CO₂ e liberam O₂; o processo descrito está invertido.', errorHint: 'inverter reagentes e produtos da fotossíntese' },
          { label: 'C', text: 'O consumo direto das algas pelos peixes, que causa intoxicação em todos os casos.', rationale: 'Algumas florações produzem toxinas, mas o mecanismo geral e mais frequente da mortandade é a queda do oxigênio.', errorHint: 'generalizar um caso particular' },
          { label: 'D', text: 'O aumento da luminosidade na superfície do lago.', rationale: 'A proliferação de algas reduz a penetração de luz, não a aumenta.', errorHint: 'inverter o efeito sobre a luz' },
          { label: 'E', text: 'A elevação do pH provocada pelos fertilizantes ao entrar em contato com a água.', rationale: 'Alterações de pH podem ocorrer, mas não são o mecanismo central descrito no processo de eutrofização.', errorHint: 'escolher um efeito secundário' },
        ],
        explanation: {
          summary: 'Excesso de nutrientes → algas → morte das algas → decomposição → queda do oxigênio → mortandade.',
          detailed: 'A pergunta pede a causa **direta**. Rastreie a cadeia até o passo imediatamente anterior à morte dos peixes.',
          conceptRecap: 'Eutrofização mata por asfixia, não por envenenamento na maioria dos casos.',
        },
      },
      {
        slug: 'q-eco-3',
        stem:
          'A tabela apresenta a concentração de um poluente persistente em organismos de um mesmo ambiente aquático:\n\n| Organismo | Nível trófico | Concentração (ppm) |\n| --- | --- | --- |\n| Fitoplâncton | produtor | 0,04 |\n| Zooplâncton | consumidor primário | 0,4 |\n| Peixe pequeno | consumidor secundário | 3,8 |\n| Ave piscívora | consumidor terciário | 42,0 |\n\nOs dados evidenciam o fenômeno de:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'leitura de dados sobre concentração trófica',
        estimatedSeconds: 120,
        skillSlug: 'relacionar-seres-vivos-energia-materia-impactos',
        likelyErrors: ['confundir com bioacumulação individual', 'atribuir a produção do poluente aos organismos'],
        options: [
          { label: 'A', text: 'Biomagnificação, com aumento da concentração a cada nível trófico.', isCorrect: true, rationale: 'A concentração multiplica-se cerca de dez vezes a cada nível. Isso caracteriza biomagnificação: o predador concentra o que estava disperso em muitas presas.' },
          { label: 'B', text: 'Bioacumulação exclusivamente individual, sem relação com a cadeia.', rationale: 'Bioacumulação ocorre dentro do indivíduo. Os dados mostram progressão **entre níveis**, o que caracteriza biomagnificação.', errorHint: 'confundir os dois conceitos' },
          { label: 'C', text: 'Produção crescente do poluente pelos organismos de níveis superiores.', rationale: 'Os organismos não produzem o poluente: eles o acumulam a partir do alimento.', errorHint: 'inverter origem do poluente' },
          { label: 'D', text: 'Decomposição progressiva do poluente ao longo da cadeia.', rationale: 'Se houvesse decomposição, a concentração cairia ao subir a cadeia.', errorHint: 'ler o dado ao contrário' },
          { label: 'E', text: 'Equilíbrio da concentração entre todos os níveis tróficos.', rationale: 'A variação é de mais de mil vezes entre o primeiro e o último nível.', errorHint: 'ignorar a magnitude da variação' },
        ],
        explanation: {
          summary: 'Concentração crescente a cada nível trófico é a definição de biomagnificação.',
          detailed: 'A ave apresenta concentração cerca de 1.000 vezes maior que o fitoplâncton. Substâncias persistentes e lipossolúveis, que o organismo não consegue excretar, produzem esse padrão.',
        },
      },
      {
        slug: 'q-eco-4',
        stem:
          'Considere duas afirmações sobre ecossistemas:\n\nI. A energia entra pelo Sol, é transferida entre níveis tróficos e deixa o sistema principalmente na forma de calor.\nII. O carbono presente hoje em um organismo pode já ter integrado outros seres vivos no passado.\n\nÉ correto o que se afirma em:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'distinção entre fluxo de energia e ciclagem de matéria',
        estimatedSeconds: 130,
        skillSlug: 'relacionar-seres-vivos-energia-materia-impactos',
        likelyErrors: ['achar que uma das afirmações contradiz a outra'],
        options: [
          { label: 'A', text: 'I, apenas.', rationale: 'I está correta, mas II também: a matéria cicla, então os mesmos átomos são reutilizados indefinidamente.', errorHint: 'não reconhecer a ciclagem da matéria' },
          { label: 'B', text: 'II, apenas.', rationale: 'II está correta, mas I também descreve corretamente o fluxo unidirecional da energia.', errorHint: 'não reconhecer o fluxo da energia' },
          { label: 'C', text: 'I e II.', isCorrect: true, rationale: 'As duas afirmações descrevem os dois princípios complementares: energia flui em sentido único e se dissipa; matéria cicla e é reutilizada.' },
          { label: 'D', text: 'Nenhuma das duas.', rationale: 'Ambas correspondem a princípios básicos da ecologia.', errorHint: 'excesso de cautela' },
          { label: 'E', text: 'I e II, mas apenas em ecossistemas aquáticos.', rationale: 'Os dois princípios valem para qualquer ecossistema.', errorHint: 'restringir indevidamente o alcance' },
        ],
        explanation: {
          summary: 'Energia flui; matéria cicla. As duas afirmações são complementares, não concorrentes.',
          conceptRecap: 'Essa é a distinção mais cobrada em ecologia — memorize pelo par "flui × cicla".',
        },
      },
      {
        slug: 'q-eco-5',
        stem:
          'Uma proposta de recuperação de uma área degradada prevê o plantio exclusivo de uma única espécie de crescimento rápido, com corte previsto em sete anos.\n\nDo ponto de vista ecológico, a principal limitação dessa proposta é:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre biodiversidade, sucessão ecológica e serviços do ecossistema',
        estimatedSeconds: 160,
        skillSlug: 'relacionar-seres-vivos-energia-materia-impactos',
        likelyErrors: ['confundir cobertura vegetal com ecossistema', 'rejeitar por razão econômica'],
        options: [
          { label: 'A', text: 'A cobertura vegetal por uma única espécie não reconstitui as interações e a diversidade necessárias para restabelecer as funções do ecossistema.', isCorrect: true, rationale: 'Restauração ecológica exige diversidade de espécies, presença de polinizadores e dispersores e retomada da sucessão. Uma monocultura cobre o solo, mas não recompõe a teia de interações nem os ciclos associados.' },
          { label: 'B', text: 'Espécies de crescimento rápido não realizam fotossíntese de forma eficiente.', rationale: 'Crescimento rápido normalmente indica alta eficiência fotossintética, não o contrário.', errorHint: 'inverter relação fisiológica' },
          { label: 'C', text: 'O plantio de árvores nunca contribui para a recuperação de áreas degradadas.', rationale: 'O plantio contribui — a limitação está na baixa diversidade e no manejo previsto, não no ato de plantar.', errorHint: 'generalizar a crítica' },
          { label: 'D', text: 'A área deveria permanecer sem intervenção para que se recupere sozinha.', rationale: 'Em áreas muito degradadas, a regeneração natural pode não ocorrer sem intervenção. A crítica é ao desenho da intervenção.', errorHint: 'trocar uma solução simplista por outra' },
          { label: 'E', text: 'Sete anos é tempo suficiente para a plena recuperação de qualquer ecossistema.', rationale: 'A restauração de funções ecossistêmicas costuma levar décadas, o que reforça a limitação da proposta.', errorHint: 'subestimar o tempo da sucessão' },
        ],
        explanation: {
          summary: 'Cobrir o solo não é o mesmo que restaurar um ecossistema.',
          detailed: 'Esta questão integra três conteúdos: biodiversidade como base das interações, sucessão ecológica como processo temporal e serviços ecossistêmicos como resultado. Um plantio homogêneo com corte em sete anos atende a objetivos produtivos, não de restauração.',
        },
      },
      {
        slug: 'q-eco-rec-1',
        stem: 'Em uma cadeia alimentar, os organismos capazes de produzir seu próprio alimento a partir da energia solar são chamados de:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'identificação de nível trófico',
        estimatedSeconds: 60,
        isRecovery: true,
        skillSlug: 'relacionar-seres-vivos-energia-materia-impactos',
        likelyErrors: ['confundir com decompositores'],
        options: [
          { label: 'A', text: 'Produtores.', isCorrect: true, rationale: 'Produtores (autótrofos) convertem energia luminosa em matéria orgânica pela fotossíntese, sustentando os demais níveis.' },
          { label: 'B', text: 'Consumidores primários.', rationale: 'Consumidores primários se alimentam dos produtores; não produzem o próprio alimento.', errorHint: 'confundir níveis adjacentes' },
          { label: 'C', text: 'Decompositores.', rationale: 'Decompositores obtêm energia da matéria orgânica morta.', errorHint: 'confundir com o papel de reciclagem' },
          { label: 'D', text: 'Consumidores terciários.', rationale: 'Estão no topo da cadeia e dependem de outros consumidores.', errorHint: 'inverter a posição na cadeia' },
          { label: 'E', text: 'Detritívoros.', rationale: 'Detritívoros consomem restos orgânicos, sem produzir o próprio alimento.', errorHint: 'confundir com decomposição' },
        ],
        explanation: { summary: 'Produtores são a porta de entrada da energia no ecossistema.' },
      },
      {
        slug: 'q-eco-rec-2',
        stem:
          'A remoção de um predador de topo de um ecossistema tende a provocar, inicialmente:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'efeito em cascata',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'relacionar-seres-vivos-energia-materia-impactos',
        likelyErrors: ['prever efeito na direção errada'],
        options: [
          { label: 'A', text: 'Aumento da população de suas presas, com pressão crescente sobre os níveis inferiores.', isCorrect: true, rationale: 'Sem controle predatório, as presas crescem em número e passam a consumir mais dos níveis abaixo, o que se propaga pela cadeia.' },
          { label: 'B', text: 'Redução imediata da população de suas presas.', rationale: 'Sem o predador, a pressão sobre as presas diminui, o que tende a aumentar sua população.', errorHint: 'inverter o efeito' },
          { label: 'C', text: 'Aumento imediato da população de produtores.', rationale: 'Com mais herbívoros, os produtores tendem a sofrer maior consumo.', errorHint: 'pular níveis na cadeia' },
          { label: 'D', text: 'Nenhuma alteração, pois predadores de topo são pouco numerosos.', rationale: 'Predadores de topo exercem controle desproporcional à sua abundância.', errorHint: 'confundir número com importância ecológica' },
          { label: 'E', text: 'Extinção imediata de todos os níveis inferiores.', rationale: 'O efeito é de desequilíbrio e oscilação, não de extinção instantânea generalizada.', errorHint: 'exagerar a magnitude do efeito' },
        ],
        explanation: {
          summary: 'O efeito se propaga em cascata pela cadeia, começando pelo aumento das presas.',
        },
      },
    ],
  },

  {
    slug: 'energia-e-transformacoes',
    name: 'Energia e transformações',
    subjectSlug: 'fisica',
    areaSlug: 'ciencias-natureza',
    summary:
      'Interpretar conservação, consumo e transformação de energia em situações do cotidiano.',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    curationWeight: 91,
    order: 2,
    prerequisites: ['ecologia-e-ciclos'],
    skills: [
      {
        slug: 'interpretar-conservacao-consumo-transformacao-energia',
        name: 'Interpretar conservação, consumo e transformação de energia',
        description:
          'Identificar transformações de energia, calcular consumo elétrico e avaliar eficiência em situações reais.',
      },
    ],
    content: [
      {
        slug: 'energia-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `**Energia não é criada nem destruída — ela se transforma.** Quando dizemos "gastar energia", queremos dizer que ela foi convertida em uma forma menos útil, geralmente calor disperso.

**Potência x energia** — a confusão mais cara da área:
- **Potência (W)** = velocidade com que a energia é usada.
- **Energia (kWh)** = potência × tempo. É o que aparece na conta de luz.

\`Energia (kWh) = Potência (kW) × tempo (h)\`

Um chuveiro de 5.500 W ligado 10 min/dia por 30 dias:
5,5 kW × (10/60) h × 30 = **27,5 kWh**

**Eficiência** = energia útil ÷ energia fornecida. Nunca chega a 100%: sempre há perda, quase sempre como calor.`,
      },
      {
        slug: 'energia-explicacao',
        kind: 'explanation',
        title: 'Transformação, consumo e eficiência',
        depth: 'standard',
        order: 2,
        body: `### 1. Cadeias de transformação

Nenhum equipamento "produz" energia: todos convertem.

- Usina hidrelétrica: potencial gravitacional → cinética → elétrica.
- Painel solar: radiante → elétrica.
- Chuveiro: elétrica → térmica.
- Corpo humano: química (alimento) → mecânica + térmica.
- Lâmpada incandescente: elétrica → radiante (~5%) + térmica (~95%).

O último exemplo mostra por que a lâmpada incandescente saiu de linha: ela é, na prática, um aquecedor que também ilumina.

### 2. O cálculo da conta de luz

Três passos:
1. Converta a potência para **quilowatts** (dividir por 1.000).
2. Multiplique pelo tempo em **horas**.
3. Multiplique pelo número de dias e pela tarifa.

Exemplo: geladeira de 150 W funcionando efetivamente 8 h por dia.
0,15 kW × 8 h × 30 dias = 36 kWh/mês. A R$ 0,80/kWh → **R$ 28,80**.

**Armadilha frequente:** a geladeira fica ligada 24 h, mas o compressor só opera parte do tempo. O enunciado costuma informar o tempo efetivo — use esse.

### 3. Por que a eficiência nunca é total

Toda transformação real dissipa parte da energia como calor por atrito, resistência elétrica ou turbulência. Essa energia não some: ela se degrada em uma forma dispersa e de difícil reaproveitamento.

Por isso não existe máquina de movimento perpétuo — não por falta de engenharia, mas por uma restrição física.

### 4. Fontes: renovável, limpa e disponível

Três adjetivos que **não são sinônimos**:
- **Renovável**: repõe-se em escala de tempo humana (solar, eólica, hídrica, biomassa).
- **Limpa**: baixa emissão de poluentes na operação.
- **Sem impacto**: não existe. Hidrelétricas alagam áreas; eólicas afetam aves e paisagem; painéis exigem mineração.

Uma alternativa que afirme "fonte totalmente sem impacto" é quase sempre distrator.

### 5. Potência, tempo e o mesmo consumo

Um equipamento de 2.000 W por 30 min consome o mesmo que um de 1.000 W por 1 h: 1 kWh. Comparar equipamentos só pela potência, sem considerar o tempo de uso, leva à conclusão errada.`,
      },
      {
        slug: 'energia-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — comparar dois equipamentos',
        order: 3,
        body: `**Situação:** qual consome mais em um mês?
- Chuveiro: 5.500 W, 8 minutos por dia.
- Ar-condicionado: 1.400 W, 6 horas por dia.

**Chuveiro:**
5,5 kW × (8/60) h ≈ 0,733 kWh/dia → × 30 = **22 kWh/mês**

**Ar-condicionado:**
1,4 kW × 6 h = 8,4 kWh/dia → × 30 = **252 kWh/mês**

**Conclusão:** o ar-condicionado consome mais de 11 vezes o que o chuveiro consome, apesar de ter menos de um terço da potência.

**A lição:** potência alta por pouco tempo pesa muito menos que potência média por muito tempo. Sempre multiplique pelo tempo antes de comparar.`,
      },
      {
        slug: 'energia-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — eficiência e perda',
        order: 4,
        body: `**Situação:** um motor recebe 800 J de energia elétrica e realiza 520 J de trabalho mecânico.

**Eficiência:**
520 ÷ 800 = 0,65 → **65%**

**Para onde foi o resto?**
800 − 520 = 280 J, dissipados principalmente como **calor** (atrito nos mancais, resistência elétrica nos enrolamentos) e um pouco como som e vibração.

**O ponto conceitual:** os 280 J não foram destruídos. A energia se conservou — o que se perdeu foi a **capacidade de realizar trabalho** com ela.

**Erro comum:** responder que "280 J foram consumidos" como se tivessem desaparecido. Em física, energia dissipada continua existindo, apenas em forma degradada.`,
      },
      {
        slug: 'energia-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Confundir potência com energia.**
Watt é velocidade de uso; quilowatt-hora é quantidade usada. A conta de luz cobra o segundo.

**2. Esquecer de converter unidades.**
Watts para quilowatts (÷1.000) e minutos para horas (÷60). Esquecer uma dessas conversões erra a resposta por fator 60 ou 1.000.

**3. Chamar uma fonte de "sem impacto".**
Toda fonte tem impacto — o que varia é o tipo, a escala e quem o suporta.`,
      },
      {
        slug: 'energia-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Se a energia se conserva, o que significa dizer que um aparelho "gasta" energia?
2. Por que um equipamento de potência menor pode pesar mais na conta de luz?
3. Qual é a diferença entre uma fonte renovável e uma fonte limpa?`,
      },
    ],
    questions: [
      {
        slug: 'q-ene-1',
        stem:
          'Um ferro de passar de 1.200 W é utilizado durante 30 minutos por dia, ao longo de 30 dias.\n\nO consumo mensal de energia elétrica é de:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'cálculo de consumo elétrico',
        estimatedSeconds: 100,
        skillSlug: 'interpretar-conservacao-consumo-transformacao-energia',
        likelyErrors: ['não converter unidades', 'confundir potência com energia'],
        options: [
          { label: 'A', text: '18 kWh', isCorrect: true, rationale: '1,2 kW × 0,5 h = 0,6 kWh por dia; × 30 dias = 18 kWh.' },
          { label: 'B', text: '36 kWh', rationale: 'Corresponde a usar 1 hora por dia em vez de 30 minutos.', errorHint: 'não converter minutos em horas' },
          { label: 'C', text: '1.200 kWh', rationale: 'Confunde a potência em watts com o consumo em quilowatt-hora.', errorHint: 'confundir potência com energia' },
          { label: 'D', text: '600 kWh', rationale: 'Corresponde a esquecer a conversão de watts para quilowatts.', errorHint: 'esquecer a divisão por 1.000' },
          { label: 'E', text: '0,6 kWh', rationale: 'É o consumo de um único dia, não do mês.', errorHint: 'parar antes de multiplicar pelos dias' },
        ],
        explanation: {
          summary: 'Energia = potência (kW) × tempo (h) × dias = 1,2 × 0,5 × 30 = 18 kWh.',
          strategy: 'Converta primeiro (W→kW, min→h) e só depois multiplique.',
        },
      },
      {
        slug: 'q-ene-2',
        stem:
          'Uma família troca 10 lâmpadas incandescentes de 60 W por lâmpadas de LED de 9 W, que produzem a mesma iluminação. O uso médio é de 5 horas por dia.\n\nA economia mensal (30 dias) de energia é de aproximadamente:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'cálculo de economia com eficiência',
        estimatedSeconds: 130,
        skillSlug: 'interpretar-conservacao-consumo-transformacao-energia',
        likelyErrors: ['esquecer o número de lâmpadas', 'calcular o consumo em vez da economia'],
        options: [
          { label: 'A', text: '76,5 kWh', isCorrect: true, rationale: 'Diferença por lâmpada: 60 − 9 = 51 W = 0,051 kW. Total: 0,051 × 10 × 5 h × 30 dias = 76,5 kWh.' },
          { label: 'B', text: '7,65 kWh', rationale: 'Resultado de considerar apenas uma lâmpada em vez de dez.', errorHint: 'esquecer a quantidade' },
          { label: 'C', text: '90 kWh', rationale: 'Corresponde ao consumo total das incandescentes, não à economia.', errorHint: 'calcular consumo em vez de diferença' },
          { label: 'D', text: '13,5 kWh', rationale: 'Corresponde ao consumo total das lâmpadas de LED.', errorHint: 'responder o consumo novo' },
          { label: 'E', text: '51 kWh', rationale: 'Usa a diferença de potência (51) diretamente como resultado, sem multiplicar pelo tempo e pela quantidade.', errorHint: 'não completar o cálculo' },
        ],
        explanation: {
          summary: 'Economia = diferença de potência × número de lâmpadas × horas × dias.',
          detailed: 'Também é possível calcular os dois consumos (90 kWh e 13,5 kWh) e subtrair: 90 − 13,5 = 76,5 kWh. Os dois caminhos coincidem.',
        },
      },
      {
        slug: 'q-ene-3',
        stem:
          'Uma usina termelétrica recebe 1.000 MJ de energia na forma de combustível e entrega 380 MJ na forma de energia elétrica.\n\nSobre os 620 MJ restantes, é correto afirmar que:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'conservação e degradação da energia',
        estimatedSeconds: 120,
        skillSlug: 'interpretar-conservacao-consumo-transformacao-energia',
        likelyErrors: ['dizer que a energia foi destruída'],
        options: [
          { label: 'A', text: 'Foram transferidos ao ambiente, sobretudo como calor, permanecendo conservados mas em forma de menor aproveitamento.', isCorrect: true, rationale: 'A energia se conserva. O que se perde é a capacidade de realizar trabalho: os 620 MJ se dispersam como calor de baixa temperatura, difícil de reaproveitar.' },
          { label: 'B', text: 'Foram destruídos durante o processo de conversão.', rationale: 'Energia não é destruída — esse é o princípio da conservação.', errorHint: 'violar a conservação da energia' },
          { label: 'C', text: 'Foram armazenados na usina para uso posterior.', rationale: 'Calor dissipado no ambiente não fica armazenado de forma utilizável.', errorHint: 'confundir dissipação com armazenamento' },
          { label: 'D', text: 'Correspondem a erro de medição, pois a eficiência deveria ser de 100%.', rationale: 'Eficiência de 100% é fisicamente impossível em conversões térmicas.', errorHint: 'esperar eficiência total' },
          { label: 'E', text: 'Foram convertidos integralmente em energia química no combustível restante.', rationale: 'A energia química é a entrada do processo, não o destino das perdas.', errorHint: 'inverter entrada e saída' },
        ],
        explanation: {
          summary: 'Eficiência de 38%: os 62% restantes se conservam, mas dispersos como calor.',
          conceptRecap: '"Perder energia" significa degradá-la, não destruí-la.',
        },
      },
      {
        slug: 'q-ene-4',
        stem:
          'Dois aparelhos são comparados:\n\n- Aparelho X: 2.000 W, usado 30 minutos por dia.\n- Aparelho Y: 250 W, usado 8 horas por dia.\n\nSobre o consumo mensal dos dois:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'comparação entre potência e tempo de uso',
        estimatedSeconds: 140,
        skillSlug: 'interpretar-conservacao-consumo-transformacao-energia',
        likelyErrors: ['comparar apenas pela potência'],
        options: [
          { label: 'A', text: 'Y consome o dobro de X, pois 2 kWh/dia contra 1 kWh/dia.', isCorrect: true, rationale: 'X: 2 kW × 0,5 h = 1 kWh/dia. Y: 0,25 kW × 8 h = 2 kWh/dia. O aparelho de menor potência consome mais por ficar ligado oito vezes mais tempo.' },
          { label: 'B', text: 'X consome mais, pois tem potência oito vezes maior.', rationale: 'Potência maior não implica consumo maior quando o tempo de uso é muito menor.', errorHint: 'comparar só pela potência' },
          { label: 'C', text: 'Os dois consomem exatamente o mesmo.', rationale: 'Os valores são 1 kWh/dia e 2 kWh/dia — diferentes.', errorHint: 'supor equivalência sem calcular' },
          { label: 'D', text: 'X consome mais, pois potência elevada gera mais perdas por calor.', rationale: 'Perdas dependem do projeto do equipamento; o consumo faturado é potência × tempo.', errorHint: 'introduzir fator não informado' },
          { label: 'E', text: 'Não é possível comparar sem conhecer a tarifa de energia.', rationale: 'A tarifa converte kWh em reais, mas a comparação de consumo em kWh já é possível.', errorHint: 'exigir dado desnecessário' },
        ],
        explanation: {
          summary: 'Consumo é potência **vezes tempo** — o tempo costuma pesar mais que a potência.',
          strategy: 'Calcule kWh/dia de cada um antes de comparar. Nunca compare watts diretamente.',
        },
      },
      {
        slug: 'q-ene-5',
        stem:
          'Um município pretende reduzir emissões substituindo parte da energia de origem térmica por solar fotovoltaica. Um técnico observa que a geração solar cai à noite e em dias nublados, e que os painéis exigem mineração de materiais específicos.\n\nA conclusão mais adequada é:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre matriz energética, intermitência e impacto de ciclo de vida',
        estimatedSeconds: 160,
        skillSlug: 'interpretar-conservacao-consumo-transformacao-energia',
        likelyErrors: ['tratar renovável como sem impacto', 'rejeitar a fonte pelas limitações'],
        options: [
          { label: 'A', text: 'A fonte solar reduz emissões na operação, mas exige planejamento para a intermitência e avaliação dos impactos de todo o ciclo de vida.', isCorrect: true, rationale: 'Reconhece o benefício real (baixa emissão na geração) sem ignorar dois pontos concretos: a necessidade de armazenamento ou complementação para a intermitência e os impactos de extração e descarte.' },
          { label: 'B', text: 'A fonte solar não deve ser adotada, pois sua geração é intermitente.', rationale: 'Intermitência é um desafio de planejamento — resolvido com armazenamento e complementaridade entre fontes —, não um impedimento.', errorHint: 'rejeitar por limitação gerenciável' },
          { label: 'C', text: 'A fonte solar é totalmente limpa e não apresenta impacto ambiental algum.', rationale: 'Extração de materiais, fabricação e descarte geram impacto. Nenhuma fonte é isenta.', errorHint: 'confundir renovável com sem impacto' },
          { label: 'D', text: 'A geração térmica deve ser mantida integralmente, pois é mais estável.', rationale: 'Estabilidade não anula o custo ambiental das emissões; a solução usual é combinar fontes.', errorHint: 'escolher um lado ignorando o outro' },
          { label: 'E', text: 'A intermitência prova que a energia solar viola a conservação da energia.', rationale: 'Intermitência decorre da variação da radiação disponível, sem qualquer relação com a conservação da energia.', errorHint: 'misturar conceitos sem relação' },
        ],
        explanation: {
          summary: 'Reconhece o ganho real e os dois desafios concretos, sem idealizar nem rejeitar a fonte.',
          detailed: 'Esta questão integra três conteúdos: transformação de energia, intermitência e análise de ciclo de vida. A alternativa correta é a única que sustenta as três dimensões ao mesmo tempo.',
        },
      },
      {
        slug: 'q-ene-rec-1',
        stem: 'Em uma lâmpada incandescente, a maior parte da energia elétrica é convertida em:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'transformação de energia',
        estimatedSeconds: 70,
        isRecovery: true,
        skillSlug: 'interpretar-conservacao-consumo-transformacao-energia',
        likelyErrors: ['assumir que a maior parte vira luz'],
        options: [
          { label: 'A', text: 'Energia térmica.', isCorrect: true, rationale: 'Cerca de 95% da energia elétrica vira calor no filamento; apenas uma pequena parcela sai como luz visível. Por isso a lâmpada esquenta tanto.' },
          { label: 'B', text: 'Energia luminosa.', rationale: 'A parcela convertida em luz é pequena — é justamente por isso que a tecnologia foi substituída.', errorHint: 'assumir a função como destino principal da energia' },
          { label: 'C', text: 'Energia química.', rationale: 'Não há reação química envolvida no funcionamento da lâmpada incandescente.', errorHint: 'trocar de forma de energia' },
          { label: 'D', text: 'Energia sonora.', rationale: 'A conversão em som é desprezível.', errorHint: 'escolher forma irrelevante' },
          { label: 'E', text: 'Energia mecânica.', rationale: 'Não há movimento macroscópico associado ao funcionamento.', errorHint: 'trocar de forma de energia' },
        ],
        explanation: { summary: 'A incandescente é, na prática, um aquecedor que também ilumina.' },
      },
      {
        slug: 'q-ene-rec-2',
        stem:
          'Um aparelho de 800 W permanece ligado 3 horas por dia. Qual é o consumo em 30 dias?',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'cálculo de consumo',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'interpretar-conservacao-consumo-transformacao-energia',
        likelyErrors: ['esquecer a conversão para kW'],
        options: [
          { label: 'A', text: '72 kWh', isCorrect: true, rationale: '0,8 kW × 3 h = 2,4 kWh/dia; × 30 = 72 kWh.' },
          { label: 'B', text: '2,4 kWh', rationale: 'É o consumo de um dia.', errorHint: 'não multiplicar pelos dias' },
          { label: 'C', text: '720 kWh', rationale: 'Corresponde a esquecer a conversão de watts para quilowatts em uma das etapas.', errorHint: 'erro de ordem de grandeza' },
          { label: 'D', text: '24 kWh', rationale: 'Corresponde a 1 hora por dia em vez de 3.', errorHint: 'usar tempo incorreto' },
          { label: 'E', text: '800 kWh', rationale: 'Confunde a potência com o consumo mensal.', errorHint: 'confundir potência com energia' },
        ],
        explanation: { summary: '0,8 × 3 × 30 = 72 kWh.' },
      },
    ],
  },
  {
    slug: 'transformacoes-quimicas',
    name: 'Transformações químicas',
    subjectSlug: 'quimica',
    areaSlug: 'ciencias-natureza',
    summary:
      'Identificar reagentes, produtos, evidências de reação e proporções básicas entre as substâncias.',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    curationWeight: 89,
    order: 3,
    prerequisites: ['energia-e-transformacoes'],
    skills: [
      {
        slug: 'identificar-reagentes-produtos-evidencias-proporcoes',
        name: 'Identificar reagentes, produtos, evidências e proporções básicas',
        description:
          'Distinguir transformação física de química, ler equações balanceadas e aplicar proporções estequiométricas simples.',
      },
    ],
    content: [
      {
        slug: 'quimica-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `**Transformação física:** muda o estado ou a forma; as substâncias continuam as mesmas. Gelo derretendo ainda é água.

**Transformação química:** formam-se **substâncias novas**, com propriedades diferentes.

**Evidências de reação química** (nenhuma isolada é prova definitiva):
- liberação de gás sem aquecimento externo;
- formação de precipitado;
- mudança de cor não explicada por diluição;
- variação de temperatura sem fonte externa;
- emissão de luz.

**Lei de Lavoisier:** a massa total se conserva. Em sistema aberto ela parece diminuir porque o gás escapou — não porque a matéria sumiu.

**Balanceamento:** o número de átomos de cada elemento é igual dos dois lados. Os coeficientes dão a **proporção** entre as substâncias.`,
      },
      {
        slug: 'quimica-explicacao',
        kind: 'explanation',
        title: 'Reconhecer, balancear e proporcionar',
        depth: 'standard',
        order: 2,
        body: `### 1. Física ou química?

A pergunta decisiva: **surgiu substância nova?**

| Situação | Tipo | Por quê |
| --- | --- | --- |
| Água fervendo | física | vapor ainda é H₂O |
| Sal dissolvendo | física | é possível recuperar o sal por evaporação |
| Ferro enferrujando | química | forma-se óxido, substância diferente |
| Papel queimando | química | formam-se CO₂, H₂O e cinzas |
| Leite azedando | química | fermentação produz ácido láctico |

Critério prático: se dá para reverter por meio físico simples (aquecer, resfriar, filtrar, evaporar), provavelmente é física.

### 2. Lavoisier na prática

Em uma reação em recipiente **fechado**, a balança não muda.

Em recipiente **aberto**:
- se um gás é liberado, a massa medida **diminui**;
- se um gás do ar é incorporado (como na oxidação de um metal), a massa **aumenta**.

Nos dois casos a matéria se conservou — o que mudou foi o que estava dentro da balança.

### 3. Balancear

\`CH₄ + 2 O₂ → CO₂ + 2 H₂O\`

Confira elemento por elemento:
- C: 1 e 1 ✔
- H: 4 e 4 ✔
- O: 4 e 4 ✔ (2×2 à esquerda; 2 + 2×1 à direita)

Os coeficientes **não** dizem massa: dizem **proporção em número de partículas (mol)**.

### 4. Proporção estequiométrica

Na equação acima, 1 mol de CH₄ exige 2 mol de O₂. Se você tiver 3 mol de CH₄, precisará de 6 mol de O₂.

**Reagente limitante:** quando as quantidades não estão na proporção exata, a reação para quando o reagente em menor proporção acaba. O que sobra é o **excesso** — e ele não reage sozinho.

Esse conceito responde a boa parte das questões aplicadas: "quanto de produto se forma?" depende do limitante, não do total de reagentes.

### 5. Concentração de soluções

\`C = massa do soluto ÷ volume da solução\`

Ao diluir, a **quantidade de soluto não muda** — só o volume aumenta. Daí:

\`C₁ × V₁ = C₂ × V₂\``,
      },
      {
        slug: 'quimica-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — a massa que "some"',
        order: 3,
        body: `**Situação:** um comprimido efervescente é colocado em um copo com água, sobre uma balança. Após a efervescência, a massa medida é menor que a inicial.

**Pergunta:** houve violação da conservação da massa?

**Análise:**
1. A efervescência indica liberação de gás — evidência de reação química.
2. O gás (CO₂) escapou do copo para o ambiente.
3. A balança mede apenas o que está sobre ela.

**Resposta:** não houve violação. A massa do gás liberado explica exatamente a diferença.

**Como confirmar:** repetir o experimento em recipiente **fechado**. A massa permanece constante — e essa é a resposta esperada quando a questão pede "como comprovar".`,
      },
      {
        slug: 'quimica-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — reagente limitante',
        order: 4,
        body: `**Equação:** \`2 H₂ + O₂ → 2 H₂O\`

**Disponível:** 6 mol de H₂ e 2 mol de O₂.

**Passo 1 — qual é a proporção exigida?** 2 mol de H₂ para cada 1 mol de O₂.

**Passo 2 — quanto de O₂ seria preciso para consumir todo o H₂?**
6 mol de H₂ ÷ 2 = 3 mol de O₂. Só há 2 mol.

**Passo 3 — o limitante é o O₂.**
Com 2 mol de O₂, reagem 4 mol de H₂ e formam-se **4 mol de H₂O**.

**Passo 4 — o que sobra?** 6 − 4 = **2 mol de H₂ em excesso**.

**Erro comum:** calcular o produto a partir do reagente mais abundante. A reação para quando o limitante acaba, independentemente do que sobrou.`,
      },
      {
        slug: 'quimica-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Achar que dissolver é reação química.**
Sal em água se dissolve; o sal continua sal e pode ser recuperado por evaporação. É transformação física.

**2. Concluir que a massa "não se conservou" em sistema aberto.**
Se houve gás, ele saiu. A conservação vale para o sistema completo, não para o que ficou na balança.

**3. Usar coeficientes como se fossem massa.**
Em \`2 H₂ + O₂\`, o "2" indica proporção em mol, não gramas. Converter exige a massa molar.`,
      },
      {
        slug: 'quimica-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Que pergunta você faz para decidir se uma transformação é física ou química?
2. Por que a massa medida pode diminuir em uma reação sem que a matéria seja destruída?
3. O que determina a quantidade de produto formada quando os reagentes não estão na proporção exata?`,
      },
    ],
    questions: [
      {
        slug: 'q-qui-1',
        stem:
          'Considere os processos:\n\nI. Derretimento de um cubo de gelo.\nII. Enferrujamento de um portão de ferro exposto à chuva.\nIII. Dissolução de açúcar em água.\n\nApresenta(m) transformação química apenas:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'classificação de transformações',
        estimatedSeconds: 90,
        skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes',
        likelyErrors: ['classificar dissolução como química'],
        options: [
          { label: 'A', text: 'I.', rationale: 'O derretimento muda o estado físico; a água continua sendo água.', errorHint: 'confundir mudança de estado com reação' },
          { label: 'B', text: 'II.', isCorrect: true, rationale: 'A ferrugem é um óxido de ferro — substância nova, com propriedades diferentes do ferro metálico. É a única transformação química da lista.' },
          { label: 'C', text: 'III.', rationale: 'A dissolução é física: o açúcar pode ser recuperado por evaporação da água.', errorHint: 'confundir dissolução com reação' },
          { label: 'D', text: 'I e III.', rationale: 'Ambas são transformações físicas.', errorHint: 'inverter a classificação' },
          { label: 'E', text: 'II e III.', rationale: 'II está correta, mas III é transformação física.', errorHint: 'incluir a dissolução indevidamente' },
        ],
        explanation: {
          summary: 'Só a ferrugem forma substância nova.',
          strategy: 'Pergunte se dá para reverter por meio físico simples. Se sim, provavelmente é física.',
        },
      },
      {
        slug: 'q-qui-2',
        stem:
          'Em um experimento, palha de aço é queimada ao ar livre sobre uma balança. Ao final, a massa registrada é maior que a inicial.\n\nA explicação correta é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'conservação da massa em sistema aberto',
        estimatedSeconds: 120,
        skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes',
        likelyErrors: ['achar que houve criação de matéria', 'esperar que a massa sempre diminua'],
        options: [
          { label: 'A', text: 'O ferro combinou-se com o oxigênio do ar, e a massa desse oxigênio incorporado explica o aumento.', isCorrect: true, rationale: 'A oxidação incorpora oxigênio atmosférico ao sólido. Como o oxigênio veio de fora da balança e passou a fazer parte do produto, a massa registrada aumenta.' },
          { label: 'B', text: 'Houve criação de matéria durante a combustão.', rationale: 'Matéria não é criada — isso violaria a conservação da massa.', errorHint: 'violar a lei de Lavoisier' },
          { label: 'C', text: 'O calor liberado tem massa e foi somado ao produto.', rationale: 'A energia liberada não contribui de forma mensurável para a massa em uma reação química comum.', errorHint: 'atribuir massa mensurável ao calor' },
          { label: 'D', text: 'A balança apresentou defeito, pois toda combustão reduz a massa.', rationale: 'Combustões que liberam gases reduzem a massa medida; combustões de metais que incorporam oxigênio a aumentam.', errorHint: 'generalizar a partir de um caso' },
          { label: 'E', text: 'A palha de aço absorveu umidade do ar, o que explica todo o ganho.', rationale: 'A umidade pode ter efeito marginal, mas o ganho característico do experimento decorre da incorporação de oxigênio.', errorHint: 'escolher causa secundária' },
        ],
        explanation: {
          summary: 'Em sistema aberto, incorporar gás aumenta a massa; liberar gás a diminui.',
          conceptRecap: 'Lavoisier vale sempre — o que muda é o que está dentro do sistema medido.',
        },
      },
      {
        slug: 'q-qui-3',
        stem:
          'A combustão completa do metano é representada por:\n\nCH₄ + 2 O₂ → CO₂ + 2 H₂O\n\nSobre essa equação, é correto afirmar que:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'leitura de equação balanceada',
        estimatedSeconds: 120,
        skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes',
        likelyErrors: ['ler coeficientes como massa'],
        options: [
          { label: 'A', text: 'Cada 1 mol de metano consome 2 mol de gás oxigênio e produz 1 mol de gás carbônico.', isCorrect: true, rationale: 'Os coeficientes indicam proporção em quantidade de matéria: 1 CH₄ : 2 O₂ : 1 CO₂ : 2 H₂O.' },
          { label: 'B', text: 'Cada 1 grama de metano consome 2 gramas de oxigênio.', rationale: 'Coeficientes expressam mol, não massa. A conversão exige as massas molares de cada substância.', errorHint: 'ler coeficiente como massa' },
          { label: 'C', text: 'A equação não está balanceada, pois há mais átomos à direita.', rationale: 'Está balanceada: 1 C, 4 H e 4 O de cada lado.', errorHint: 'contar átomos incorretamente' },
          { label: 'D', text: 'A água formada é reagente da reação.', rationale: 'A água aparece à direita da seta: é produto.', errorHint: 'inverter reagente e produto' },
          { label: 'E', text: 'A reação produz mais moléculas do que consome.', rationale: 'São 3 moléculas de reagentes (1 + 2) e 3 de produtos (1 + 2): o total é igual.', errorHint: 'não somar os coeficientes' },
        ],
        explanation: {
          summary: 'Coeficientes indicam proporção em mol entre as substâncias.',
          strategy: 'Ao ler uma equação, traduza mentalmente: "para cada X mol de..., preciso de Y mol de...".',
        },
      },
      {
        slug: 'q-qui-4',
        stem:
          'Na reação 2 H₂ + O₂ → 2 H₂O, um estudante dispõe de 6 mol de H₂ e 2 mol de O₂.\n\nA quantidade máxima de água formada e o reagente em excesso são, respectivamente:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'reagente limitante e excesso',
        estimatedSeconds: 150,
        skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes',
        likelyErrors: ['usar o reagente mais abundante como base', 'esquecer de identificar o excesso'],
        options: [
          { label: 'A', text: '6 mol de água, com O₂ em excesso.', rationale: 'Formar 6 mol de água exigiria 3 mol de O₂, mas só há 2 mol. Além disso, o O₂ é o limitante, não o excesso.', errorHint: 'usar o reagente mais abundante como base' },
          { label: 'B', text: '4 mol de água, com H₂ em excesso.', isCorrect: true, rationale: 'Os 2 mol de O₂ reagem com 4 mol de H₂ e formam 4 mol de H₂O. Sobram 2 mol de H₂, que não têm com o que reagir.' },
          { label: 'C', text: '2 mol de água, com H₂ em excesso.', rationale: 'A proporção 2:1 indica que 2 mol de O₂ formam 4 mol de água, não 2.', errorHint: 'ignorar o coeficiente da água' },
          { label: 'D', text: '4 mol de água, com O₂ em excesso.', rationale: 'A quantidade está correta, mas o O₂ foi totalmente consumido: é o limitante.', errorHint: 'confundir limitante com excesso' },
          { label: 'E', text: '8 mol de água, sem excesso.', rationale: 'Não há reagente suficiente para essa quantidade, e sobra H₂.', errorHint: 'somar reagentes sem respeitar a proporção' },
        ],
        explanation: {
          summary: 'O O₂ é o limitante: 2 mol de O₂ → 4 mol de H₂O, sobrando 2 mol de H₂.',
          detailed: 'Método seguro: para cada reagente, calcule quanto de produto ele permitiria formar sozinho. O menor valor é o real, e aquele reagente é o limitante.',
          conceptRecap: 'A reação para quando o limitante acaba — o excesso permanece sem reagir.',
        },
      },
      {
        slug: 'q-qui-5',
        stem:
          'Uma indústria libera efluente ácido em um curso d\'água. Um técnico propõe adicionar carbonato de cálcio ao efluente antes do descarte, monitorando o pH até a faixa neutra.\n\nA avaliação mais adequada da proposta é:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre reação de neutralização, evidência experimental e impacto ambiental',
        estimatedSeconds: 170,
        skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes',
        likelyErrors: ['aceitar a proposta sem ressalva', 'rejeitar a neutralização por princípio'],
        options: [
          { label: 'A', text: 'A neutralização é quimicamente adequada, mas o monitoramento do pH sozinho não garante ausência de outros contaminantes nem controla o gás e os sais gerados.', isCorrect: true, rationale: 'Carbonato neutraliza ácido, com liberação de CO₂ e formação de sal. O pH volta à faixa neutra, mas metais dissolvidos e carga de sais permanecem — e não aparecem na medida de pH.' },
          { label: 'B', text: 'A proposta é inadequada, pois carbonatos não reagem com ácidos.', rationale: 'Carbonatos reagem com ácidos produzindo sal, água e gás carbônico — é uma neutralização clássica.', errorHint: 'negar reação existente' },
          { label: 'C', text: 'A proposta resolve integralmente o problema ambiental do efluente.', rationale: 'Corrigir o pH não remove metais, matéria orgânica ou outros contaminantes eventualmente presentes.', errorHint: 'confundir um parâmetro com o todo' },
          { label: 'D', text: 'A efervescência observada indicaria falha do processo.', rationale: 'A efervescência é justamente a evidência de que a reação está ocorrendo, com liberação de CO₂.', errorHint: 'interpretar evidência de reação como falha' },
          { label: 'E', text: 'O pH deveria ser elevado o máximo possível para garantir segurança.', rationale: 'Efluente muito alcalino também causa dano ambiental: o objetivo é a faixa adequada, não o extremo.', errorHint: 'supor que mais é sempre melhor' },
        ],
        explanation: {
          summary: 'A química funciona; o monitoramento por um único parâmetro é que é insuficiente.',
          detailed: 'Esta questão integra três conteúdos: reação de neutralização com liberação de gás, leitura de evidência experimental (a efervescência) e avaliação ambiental de um tratamento. A alternativa correta sustenta as três.',
        },
      },
      {
        slug: 'q-qui-rec-1',
        stem: 'A formação de um precipitado ao misturar duas soluções transparentes é indício de:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'evidência de reação',
        estimatedSeconds: 70,
        isRecovery: true,
        skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes',
        likelyErrors: ['confundir com mudança de estado'],
        options: [
          { label: 'A', text: 'Transformação química, pela formação de uma substância nova insolúvel.', isCorrect: true, rationale: 'O sólido que se forma não estava presente antes: é substância nova, evidência de reação química.' },
          { label: 'B', text: 'Transformação física, semelhante à solidificação.', rationale: 'Na solidificação a mesma substância muda de estado; aqui surge substância diferente.', errorHint: 'confundir com mudança de estado' },
          { label: 'C', text: 'Evaporação de um dos solventes.', rationale: 'Evaporação não produz sólido insolúvel de forma imediata na mistura.', errorHint: 'trocar de fenômeno' },
          { label: 'D', text: 'Erro de preparo das soluções.', rationale: 'A formação de precipitado é resultado esperado em diversas reações.', errorHint: 'tratar resultado esperado como erro' },
          { label: 'E', text: 'Aumento da temperatura da mistura, sem reação.', rationale: 'Variação de temperatura é outra evidência possível, mas não explica a formação de sólido.', errorHint: 'trocar de evidência' },
        ],
        explanation: { summary: 'Precipitado é substância nova — evidência de reação química.' },
      },
      {
        slug: 'q-qui-rec-2',
        stem:
          'Uma reação ocorre em um frasco hermeticamente fechado, com liberação de gás. Sobre a massa total do sistema ao final:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'conservação da massa em sistema fechado',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes',
        likelyErrors: ['esperar variação como em sistema aberto'],
        options: [
          { label: 'A', text: 'Permanece igual à massa inicial, pois nada entrou nem saiu do sistema.', isCorrect: true, rationale: 'Em sistema fechado, o gás produzido continua dentro do frasco. A massa total se conserva, conforme a lei de Lavoisier.' },
          { label: 'B', text: 'Diminui, porque gases têm massa desprezível.', rationale: 'Gases têm massa, e ela continua sendo contabilizada dentro do frasco fechado.', errorHint: 'supor que gás não tem massa' },
          { label: 'C', text: 'Aumenta, devido à pressão interna.', rationale: 'Pressão não altera a massa do conteúdo.', errorHint: 'confundir pressão com massa' },
          { label: 'D', text: 'Diminui pela metade, conforme a proporção da reação.', rationale: 'Proporções estequiométricas não implicam perda de massa.', errorHint: 'confundir proporção com perda' },
          { label: 'E', text: 'Não pode ser determinada sem conhecer os reagentes.', rationale: 'A conservação vale independentemente das substâncias envolvidas.', errorHint: 'exigir dado desnecessário' },
        ],
        explanation: {
          summary: 'Sistema fechado: nada entra, nada sai, massa constante.',
        },
      },
    ],
  },
];

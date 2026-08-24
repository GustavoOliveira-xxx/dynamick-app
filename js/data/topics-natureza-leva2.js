










import { question as q, topic } from './topic-factory.js';

export const NATUREZA_TOPICS_LEVA_2 = [
  topic({
    slug: 'genetica-basica',
    name: 'Genética básica',
    subject: 'biologia',
    area: 'ciencias-natureza',
    summary:
      'Entender como características são transmitidas, resolver cruzamentos simples e interpretar heredogramas e resultados de exames genéticos.',
    difficulty: 'intermediate',
    minutes: 24,
    weight: 89,
    order: 2,
    prerequisites: ['ecologia-e-ciclos'],
    skill: {
      slug: 'aplicar-principios-de-heranca-genetica',
      name: 'Aplicar princípios de herança genética',
      description:
        'Resolver cruzamentos, interpretar heredogramas e relacionar genótipo, fenótipo e probabilidade em situações concretas.',
    },
    quick: `**Vocabulário mínimo**

- **Gene:** trecho de DNA com informação para uma característica.
- **Alelo:** cada versão de um gene (A, a).
- **Genótipo:** os alelos que o indivíduo tem (AA, Aa, aa).
- **Fenótipo:** a característica que aparece.
- **Homozigoto:** alelos iguais (AA, aa). **Heterozigoto:** diferentes (Aa).
- **Dominante:** manifesta-se com um único alelo. **Recessivo:** só se manifesta em dose dupla.

**Quadro de Punnett — Aa × Aa**

|  | A | a |
| --- | --- | --- |
| **A** | AA | Aa |
| **a** | Aa | aa |

Genótipos: 1 AA : 2 Aa : 1 aa → **fenótipos 3:1**

**Aa × aa** → 1 Aa : 1 aa → **1:1**

**Regra que evita o erro mais comum:** cada gestação é um evento independente. Ter dois filhos afetados não "protege" o terceiro.`,
    explanation: {
      title: 'Da probabilidade teórica ao heredograma real',
      body: `### 1. Por que 3:1 e não "três filhos e um"

A proporção 3:1 descreve a **probabilidade de cada nascimento**, não uma distribuição garantida. Em um casal Aa × Aa, cada filho tem 75% de chance de apresentar o fenótipo dominante e 25% o recessivo — a cada gestação, do zero.

Com poucos filhos, o resultado observado pode ficar longe da proporção esperada. Com muitos indivíduos, ele se aproxima.

### 2. Ler um heredograma

Convenções: quadrado = masculino, círculo = feminino, símbolo preenchido = afetado, linha horizontal = casal, linha vertical = descendentes.

**A pista de ouro:** dois pais **não afetados** com um filho **afetado** indicam herança **recessiva**, e os dois pais são necessariamente heterozigotos.

Se a característica pula gerações, provavelmente é recessiva. Se aparece em todas as gerações e todo afetado tem ao menos um pai afetado, provavelmente é dominante.

### 3. Herança ligada ao X

Homens têm um só X. Um alelo recessivo no X se manifesta neles sem precisar de par — por isso daltonismo e hemofilia são mais frequentes em homens.

Mulheres portadoras (heterozigotas) não manifestam, mas transmitem a metade dos filhos.

Padrão típico: mãe portadora × pai normal → 50% dos filhos homens afetados; nenhuma filha afetada, mas 50% delas portadoras.

### 4. Grupos sanguíneos: alelos múltiplos e codominância

Três alelos: I^A, I^B e i. I^A e I^B são **codominantes** entre si e dominantes sobre i.

- A → I^A I^A ou I^A i
- B → I^B I^B ou I^B i
- AB → I^A I^B (codominância: as duas se manifestam)
- O → ii

Um casal A (heterozigoto) × B (heterozigoto) pode ter filhos dos quatro tipos.

### 5. Genótipo não é destino

Muitas características resultam de vários genes e da interação com o ambiente. Altura, peso e risco de várias doenças não seguem um padrão mendeliano simples. Cuidado com alternativas deterministas: "quem tem o gene X necessariamente terá a doença" quase sempre está errada.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — heredograma de característica recessiva',
        body: `**Situação:** um casal sem determinada característica tem uma filha que a apresenta. O casal espera outro filho.

**Passo 1 — identificar o tipo de herança:** pais não afetados com filha afetada → característica **recessiva**.

**Passo 2 — deduzir os genótipos:** a filha é **aa**; logo, recebeu um "a" de cada progenitor. Como nenhum dos dois manifesta, ambos são **Aa**.

**Passo 3 — calcular:** Aa × Aa → 25% aa.

**Resposta:** a chance de o próximo filho apresentar a característica é de **25%**, independentemente do que aconteceu antes.

**Erro clássico:** responder "menos de 25%, porque já nasceu uma afetada". Gestações são eventos independentes.`,
      },
      {
        title: 'Exemplo resolvido 2 — daltonismo em uma família',
        body: `**Situação:** mulher com visão normal, cujo pai era daltônico, casa-se com homem de visão normal.

**Passo 1:** o pai daltônico é X^d Y e transmite seu único X à filha. Logo, a mulher é **X^D X^d** (portadora).

**Passo 2:** o marido é **X^D Y**.

**Passo 3 — cruzamento X^D X^d × X^D Y:**

| | X^D | Y |
| --- | --- | --- |
| **X^D** | X^D X^D | X^D Y |
| **X^d** | X^D X^d | X^d Y |

**Resultados:**
- Filhas: 50% normais, 50% portadoras — **nenhuma daltônica**.
- Filhos: 50% normais, 50% **daltônicos**.

**Chance total de uma criança daltônica:** 25% (metade dos 50% que serão meninos).`,
      },
    ],
    mistakes: `**1. Achar que 3:1 garante a proporção nos filhos.**
É probabilidade por nascimento, não cota a ser cumprida pela família.

**2. Confundir portador com afetado.**
Heterozigoto para recessiva não manifesta a característica, mas transmite o alelo.

**3. Ler genótipo como destino.**
Muitas características dependem de vários genes e do ambiente. Determinismo genético é quase sempre alternativa errada.`,
    selfCheck: [
      'Por que dois pais não afetados que têm um filho afetado são necessariamente heterozigotos?',
      'Por que o daltonismo é mais frequente em homens?',
      'Qual a diferença entre ser portador e ser afetado?',
    ],
    questions: [
      q({
        slug: 'q-genetica-1',
        stem: 'Em uma espécie, a cor escura da pelagem (A) é dominante sobre a cor clara (a). Do cruzamento entre dois indivíduos heterozigotos, a proporção fenotípica esperada na descendência é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação do quadro de Punnett',
        seconds: 80,
        errors: ['confundir proporção genotípica com fenotípica'],
        correct: 3,
        options: [
          ['1 escuro : 1 claro', 'Essa é a proporção de um cruzamento entre heterozigoto e homozigoto recessivo.', 'trocar o cruzamento'],
          ['1 : 2 : 1', 'Essa é a proporção genotípica (AA : Aa : aa), não a fenotípica.', 'confundir genótipo com fenótipo'],
          ['4 escuros : 0 claros', 'Isso ocorreria se um dos pais fosse homozigoto dominante.', 'trocar os genótipos parentais'],
          ['3 escuros : 1 claro', 'Aa × Aa gera 1 AA, 2 Aa e 1 aa. Como AA e Aa têm o mesmo fenótipo, a proporção observada é 3 escuros para 1 claro.'],
          ['2 escuros : 2 claros', 'Não corresponde a nenhum cruzamento mendeliano simples com dominância completa.', 'estimar sem montar o quadro'],
        ],
        explanation: 'Genótipos 1:2:1; fenótipos 3:1, porque o heterozigoto expressa o alelo dominante.',
      }),
      q({
        slug: 'q-genetica-2',
        stem: 'Um casal sem fibrose cística tem um filho com a doença, que é recessiva e autossômica. O casal deseja saber a probabilidade de o próximo filho também nascer com a doença.\n\nEssa probabilidade é de:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'dedução de genótipos parentais e cálculo de probabilidade',
        seconds: 120,
        errors: ['achar que o nascimento anterior altera a probabilidade'],
        correct: 2,
        options: [
          ['0%, pois o casal já teve um filho afetado.', 'Cada gestação é independente; o nascimento anterior não altera as chances.', 'aplicar falácia do apostador'],
          ['12,5%, metade da probabilidade original.', 'Não há razão para dividir a probabilidade pela metade.', 'inventar correção'],
          ['25%.', 'Como o filho afetado é aa, ambos os pais são portadores (Aa). Em Aa × Aa, a chance de aa é 1/4 a cada gestação.'],
          ['50%.', 'Corresponderia a um cruzamento Aa × aa.', 'errar o genótipo de um dos pais'],
          ['100%, pois o alelo já se manifestou na família.', 'A manifestação anterior não torna certa a repetição.', 'confundir presença de alelo com certeza'],
        ],
        explanation: 'Pais não afetados com filho afetado são obrigatoriamente heterozigotos, e a chance é de 25% em cada gestação.',
        strategy: 'Comece sempre pelo indivíduo afetado: o genótipo dele revela o dos pais.',
      }),
      q({
        slug: 'q-genetica-3',
        stem: 'Um heredograma mostra: um casal não afetado (I-1 e I-2) com três filhos — dois não afetados e uma filha afetada. A filha afetada, casada com um homem não afetado sem histórico familiar da característica, tem dois filhos, ambos não afetados.\n\nA interpretação correta desses dados é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de heredograma e dedução do tipo de herança',
        seconds: 140,
        errors: ['classificar como herança dominante'],
        correct: 0,
        options: [
          ['A característica é recessiva, os pais I-1 e I-2 são heterozigotos e os filhos da mulher afetada são obrigatoriamente portadores.', 'Pais não afetados com filha afetada indicam herança recessiva e genótipo Aa para ambos. A filha é aa e transmite um "a" a todos os seus filhos, que herdam A do pai e são, portanto, Aa.'],
          ['A característica é dominante, pois se manifestou em duas gerações.', 'Ela se manifestou apenas na segunda geração; os netos não são afetados.', 'ler o padrão ao contrário'],
          ['A característica é ligada ao cromossomo Y, pois apareceu em apenas um dos filhos.', 'Herança ligada ao Y se manifestaria apenas em homens, e a afetada é mulher.', 'atribuir herança incompatível'],
          ['Os filhos da mulher afetada não podem ser portadores, pois não manifestam a característica.', 'Portador é justamente quem tem o alelo sem manifestá-lo.', 'confundir portador com afetado'],
          ['Os dados são insuficientes para qualquer conclusão sobre o tipo de herança.', 'O padrão descrito é suficiente para concluir que a herança é recessiva.', 'recusar conclusão possível'],
        ],
        explanation: 'A combinação "pais normais, filha afetada" é a assinatura da herança recessiva — e a filha aa transmite obrigatoriamente um alelo recessivo a cada descendente.',
      }),
      q({
        slug: 'q-genetica-4',
        stem: 'Compare dois casos de herança:\n\nI. Uma característica que aparece em todas as gerações de uma família, sempre com pelo menos um genitor afetado.\nII. Uma característica que pula gerações e aparece em filhos de casais não afetados.\n\nOs padrões descritos sugerem, respectivamente:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre padrões de herança dominante e recessiva',
        seconds: 130,
        errors: ['inverter os padrões'],
        correct: 1,
        options: [
          ['Herança recessiva e herança dominante.', 'A ordem está trocada em relação aos padrões descritos.', 'inverter os padrões'],
          ['Herança dominante e herança recessiva.', 'Em I, todo afetado tem genitor afetado — padrão típico de dominante. Em II, o alelo atravessa gerações silenciosamente em heterozigotos — padrão típico de recessiva.'],
          ['Herança ligada ao X em ambos os casos.', 'Os padrões descritos não permitem essa conclusão; faltaria informação sobre o sexo dos afetados.', 'atribuir herança sem evidência'],
          ['Herança mitocondrial e herança autossômica.', 'Herança mitocondrial é exclusivamente materna, o que não é descrito.', 'atribuir mecanismo incompatível'],
          ['Ausência de padrão genético em ambos os casos.', 'Os dois padrões são clássicos e reconhecíveis.', 'negar padrões estabelecidos'],
        ],
        explanation: 'Presença em todas as gerações sugere dominante; salto de gerações sugere recessiva mantida por heterozigotos.',
      }),
      q({
        slug: 'q-genetica-5',
        stem: 'Um exame revela que uma pessoa possui uma variante genética associada a maior risco de determinada doença. A reportagem que divulga o caso afirma que a pessoa "certamente desenvolverá a doença".\n\nA avaliação cientificamente adequada dessa afirmação é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre genética, probabilidade e comunicação científica',
        seconds: 170,
        errors: ['aceitar o determinismo genético', 'concluir que o exame é inútil'],
        correct: 4,
        options: [
          ['A afirmação está correta, pois a presença da variante determina o fenótipo.', 'Variantes de risco alteram probabilidade, não produzem certeza.', 'aceitar determinismo'],
          ['A afirmação está correta apenas se a variante for dominante.', 'Mesmo variantes dominantes podem ter penetrância incompleta e expressividade variável.', 'simplificar a relação genótipo-fenótipo'],
          ['O exame é inútil, já que não permite prever com certeza o futuro da pessoa.', 'Informação probabilística orienta prevenção e acompanhamento — é útil sem ser determinista.', 'descartar informação válida'],
          ['A afirmação está correta porque exames genéticos têm alta precisão técnica.', 'Precisão em detectar a variante não é o mesmo que certeza sobre o desfecho clínico.', 'confundir precisão do teste com determinismo do desfecho'],
          ['A afirmação é incorreta: a variante aumenta o risco, mas o desfecho depende de outros genes, do ambiente e do estilo de vida, o que justifica acompanhamento e prevenção em vez de prognóstico definitivo.', 'A maioria das doenças complexas é multifatorial. O resultado do exame indica probabilidade elevada e serve para orientar decisões de prevenção, não para anunciar um destino.'],
        ],
        explanation: 'A questão integra genética, probabilidade e leitura crítica de divulgação científica: risco aumentado não é sinônimo de certeza.',
      }),
      q({
        slug: 'q-genetica-rec-1',
        stem: 'Um indivíduo de genótipo Aa para um gene com dominância completa é chamado de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'vocabulário básico de genética',
        seconds: 55,
        recovery: true,
        errors: ['confundir heterozigoto com homozigoto'],
        correct: 2,
        options: [
          ['Homozigoto dominante.', 'Homozigoto dominante seria AA.', 'trocar o genótipo'],
          ['Homozigoto recessivo.', 'Homozigoto recessivo seria aa.', 'trocar o genótipo'],
          ['Heterozigoto.', 'Ter dois alelos diferentes para o mesmo gene (A e a) define o heterozigoto, que expressa o fenótipo dominante e transmite os dois alelos.'],
          ['Hemizigoto.', 'Hemizigoto se refere a genes presentes em dose única, como os do X em indivíduos XY.', 'usar termo de outro contexto'],
          ['Mutante.', 'A presença de dois alelos diferentes é comum e não caracteriza mutação.', 'confundir variação normal com mutação'],
        ],
        explanation: 'Alelos diferentes para o mesmo gene definem o heterozigoto.',
      }),
    ],
  }),

  topic({
    slug: 'saude-e-prevencao',
    name: 'Saúde e prevenção',
    subject: 'biologia',
    area: 'ciencias-natureza',
    summary:
      'Relacionar agentes causadores, formas de transmissão e medidas de prevenção — e entender vacinação e saúde pública com base em evidência.',
    difficulty: 'intro',
    minutes: 22,
    weight: 91,
    order: 3,
    related: ['ecologia-e-ciclos', 'genetica-basica'],
    skill: {
      slug: 'relacionar-agente-transmissao-e-prevencao',
      name: 'Relacionar agente, transmissão e prevenção',
      description:
        'Identificar agentes causadores, vias de transmissão e medidas de prevenção adequadas, individuais e coletivas.',
    },
    quick: `**A cadeia que organiza tudo**

agente → reservatório → via de transmissão → hospedeiro suscetível

**Interromper qualquer elo previne a doença.** Por isso saneamento, vacina, repelente e tratamento entram na mesma conversa.

**Agentes e exemplos**
- **Vírus:** dengue, gripe, HIV, hepatites virais. Não respondem a antibiótico.
- **Bactérias:** tuberculose, leptospirose, tétano. Tratadas com antibiótico.
- **Protozoários:** malária, doença de Chagas, amebíase.
- **Vermes:** ascaridíase, esquistossomose, teníase.

**Vias de transmissão**
- vetor (mosquito, barbeiro), água e alimento contaminados, via aérea, contato direto, sangue e fluidos, solo.

**Vacinas** ensinam o sistema imune a reconhecer o agente antes do encontro real. A **imunidade coletiva** protege quem não pode se vacinar — desde que a cobertura seja alta.

**Antibiótico não trata vírus.** Uso indevido acelera a resistência bacteriana, que é um problema coletivo.`,
    explanation: {
      title: 'Prevenção como cadeia — e por que a coletiva é indispensável',
      body: `### 1. Ligar agente, transmissão e prevenção

A prevenção adequada depende da **via**, não do medo:

| Doença | Agente | Transmissão | Prevenção principal |
| --- | --- | --- | --- |
| Dengue | vírus | mosquito Aedes | eliminar criadouros |
| Leptospirose | bactéria | urina de roedor em água | saneamento, evitar contato |
| Esquistossomose | verme | água doce com caramujo | saneamento, não entrar em água contaminada |
| Tuberculose | bactéria | via aérea | vacina BCG, ventilação, tratamento dos casos |
| Doença de Chagas | protozoário | barbeiro, alimento contaminado | moradia adequada, controle do vetor |

### 2. Vacina: como funciona, em quatro passos

1. A vacina apresenta ao corpo uma parte do agente (ou instruções para produzi-la).
2. O sistema imune responde e produz anticorpos.
3. Formam-se **células de memória**.
4. No encontro real, a resposta é rápida o bastante para impedir a doença grave.

Efeitos leves — dor no braço, febre baixa — indicam que a resposta imune está acontecendo.

### 3. Imunidade coletiva

Quando muita gente está imunizada, a cadeia de transmissão se interrompe e o agente circula pouco. Isso protege:

- recém-nascidos ainda sem idade para vacinar;
- pessoas imunossuprimidas que não podem receber certas vacinas;
- quem foi vacinado mas não respondeu plenamente.

Por isso vacinação é uma decisão com efeito **coletivo**, e não apenas individual. Quedas de cobertura já provocaram retorno de doenças que estavam controladas.

### 4. Resistência bacteriana

Usar antibiótico sem necessidade ou interromper o tratamento antes do fim seleciona as bactérias mais resistentes, que sobrevivem e se multiplicam.

O efeito não fica em quem usou: bactérias resistentes circulam. Por isso a orientação é dupla — não usar sem prescrição e **completar** o tratamento prescrito.

### 5. Determinantes sociais

Saúde não depende só de comportamento individual. Saneamento, moradia, renda, acesso a serviços e informação explicam boa parte das diferenças de adoecimento entre grupos. Uma resposta que atribui tudo a "falta de cuidado pessoal" costuma estar incompleta.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — do caso à prevenção correta',
        body: `**Situação:** após uma enchente, um bairro registra aumento de casos de uma doença com febre, dor muscular intensa e histórico de contato com água parada.

**Raciocínio em três passos:**

1. **Contexto:** enchente + água parada + roedores → suspeita de **leptospirose**.
2. **Agente e via:** bactéria eliminada na urina de roedores, que penetra por pele lesada ou mucosas em contato com água contaminada.
3. **Prevenção adequada:**
   - evitar contato com água de enchente; se inevitável, usar botas e luvas;
   - lavar e desinfetar áreas atingidas;
   - controle de roedores e destino adequado do lixo;
   - saneamento básico — a medida estrutural.

**O que NÃO previne:** repelente (não é vetor alado) ou antibiótico preventivo por conta própria (uso deve ser orientado por serviço de saúde).`,
      },
      {
        title: 'Exemplo resolvido 2 — por que a cobertura vacinal importa',
        body: `**Situação:** uma cidade tinha 95% de cobertura vacinal contra o sarampo e cai para 70% em alguns anos.

**Efeito esperado:**

- O número de pessoas suscetíveis mais que dobra.
- Como o sarampo é altamente transmissível, cada caso passa a gerar vários outros.
- Surge o risco de surto, que atinge primeiro bebês pequenos demais para vacinar e pessoas imunossuprimidas.

**O ponto que a prova costuma cobrar:** a proteção de quem não pode se vacinar depende de quem pode. É por isso que a decisão individual tem consequência coletiva.

**Complemento honesto:** nenhuma vacina é 100% eficaz em todos os indivíduos — e é justamente por isso que a alta cobertura importa tanto.`,
      },
    ],
    mistakes: `**1. Tomar antibiótico para infecção viral.**
Gripe, dengue e resfriado são virais. O antibiótico não age e ainda seleciona bactérias resistentes.

**2. Confundir a via de transmissão.**
Prevenção só funciona se corresponder à via: repelente para vetor alado, saneamento para veiculação hídrica, ventilação para via aérea.

**3. Reduzir saúde a comportamento individual.**
Saneamento, moradia, renda e acesso a serviços explicam boa parte das diferenças de adoecimento.`,
    selfCheck: [
      'Como a cadeia agente–transmissão–hospedeiro ajuda a escolher a prevenção correta?',
      'Por que a vacinação de uma pessoa protege também quem não pode se vacinar?',
      'Por que interromper um tratamento com antibiótico é um problema coletivo?',
    ],
    questions: [
      q({
        slug: 'q-saude-1',
        stem: 'A dengue, a zika e a chikungunya são transmitidas ao ser humano principalmente pela picada do mosquito Aedes aegypti. A medida de prevenção mais eficaz contra essas doenças é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'relação entre via de transmissão e prevenção',
        seconds: 70,
        errors: ['escolher medida que não interrompe a via de transmissão'],
        correct: 1,
        options: [
          ['O uso preventivo de antibióticos durante o verão.', 'As três doenças são virais; antibióticos não agem sobre vírus.', 'usar antibiótico contra vírus'],
          ['A eliminação de criadouros com água parada, que impede a reprodução do mosquito.', 'Sem locais de reprodução, a população do vetor cai e a transmissão é interrompida na origem.'],
          ['O isolamento das pessoas doentes, já que a transmissão é direta entre humanos.', 'A transmissão depende do mosquito, não do contato direto entre pessoas.', 'confundir a via de transmissão'],
          ['A fervura da água antes do consumo.', 'A transmissão não é por veiculação hídrica.', 'aplicar prevenção de outra via'],
          ['A vacinação obrigatória contra os três vírus na infância.', 'A oferta de vacinas para essas arboviroses é limitada e não substitui o controle do vetor.', 'supor solução indisponível'],
        ],
        explanation: 'Contra doenças transmitidas por vetor, a prevenção mais eficaz age sobre o vetor — no caso do Aedes, sobre os criadouros.',
      }),
      q({
        slug: 'q-saude-2',
        stem: 'Uma pessoa com sintomas de gripe procura a farmácia e pede um antibiótico, alegando que "sempre funciona".\n\nA orientação cientificamente correta é:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação do conceito de agente etiológico e resistência bacteriana',
        seconds: 100,
        errors: ['aceitar a experiência pessoal como evidência'],
        correct: 3,
        options: [
          ['O antibiótico deve ser tomado por precaução, para evitar complicações bacterianas.', 'Uso preventivo sem indicação médica não é recomendado e favorece a resistência.', 'generalizar profilaxia'],
          ['O antibiótico funciona porque reduz a duração da gripe.', 'Ele não age sobre vírus e não altera a duração da gripe.', 'aceitar a premissa incorreta'],
          ['O antibiótico só não funciona se for tomado em dose baixa.', 'A dose não muda o fato de que o alvo do medicamento são bactérias.', 'atribuir o problema à dosagem'],
          ['A gripe é causada por vírus, sobre os quais o antibiótico não age; o uso indevido ainda contribui para a resistência bacteriana.', 'Antibióticos atuam em estruturas bacterianas ausentes nos vírus. Usá-los sem indicação seleciona bactérias resistentes, que depois circulam na população.'],
          ['O uso é indiferente, pois antibióticos não causam efeito algum quando não há bactérias.', 'Há efeito: alteração da microbiota e pressão seletiva sobre bactérias resistentes.', 'supor ausência de consequência'],
        ],
        explanation: 'Antibiótico age sobre bactérias. Em infecções virais, além de ineficaz, contribui para um problema de saúde pública.',
      }),
      q({
        slug: 'q-saude-3',
        stem: 'A tabela apresenta a cobertura vacinal contra o sarampo em um município e o número de casos registrados:\n\n| Ano | Cobertura | Casos |\n| --- | --- | --- |\n| 2018 | 96% | 0 |\n| 2020 | 88% | 3 |\n| 2022 | 74% | 41 |\n| 2024 | 68% | 156 |\n\nA leitura adequada desses dados indica que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de série e relação entre cobertura e transmissão',
        seconds: 130,
        errors: ['negar a relação entre as variáveis'],
        correct: 0,
        options: [
          ['A queda da cobertura vacinal ampliou o número de pessoas suscetíveis, o que favoreceu a retomada da transmissão.', 'Quanto menor a cobertura, maior a proporção de suscetíveis. Em uma doença muito transmissível, isso reativa cadeias de transmissão — o que a série mostra com clareza.'],
          ['Os dados mostram que a vacina perdeu eficácia ao longo do tempo.', 'A série mostra queda de cobertura, não de eficácia individual da vacina.', 'confundir cobertura com eficácia'],
          ['O aumento de casos decorre exclusivamente do crescimento populacional.', 'Um crescimento populacional não explicaria salto de 0 para 156 casos com queda simultânea de cobertura.', 'atribuir a variável irrelevante'],
          ['Não há relação entre as duas colunas, pois correlação não implica causalidade.', 'A cautela é válida em geral, mas aqui há mecanismo biológico conhecido que sustenta a relação.', 'aplicar a máxima sem considerar o mecanismo'],
          ['A vacinação deveria ser interrompida, já que os casos aumentaram mesmo com sua aplicação.', 'Os casos aumentaram justamente onde a vacinação diminuiu.', 'inverter a leitura dos dados'],
        ],
        explanation: 'A relação entre cobertura vacinal e transmissão tem mecanismo conhecido: menos vacinados significa mais suscetíveis e mais cadeias de transmissão ativas.',
      }),
      q({
        slug: 'q-saude-4',
        stem: 'Compare duas situações de prevenção:\n\nI. Uso de mosquiteiro impregnado com inseticida em região com malária.\nII. Instalação de rede de esgoto e tratamento de água em bairro com casos de verminoses.\n\nSobre as duas medidas, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre medidas de prevenção segundo a via de transmissão',
        seconds: 140,
        errors: ['hierarquizar as medidas sem considerar a via'],
        correct: 2,
        options: [
          ['As duas medidas são intercambiáveis, pois ambas previnem doenças infecciosas.', 'Cada uma interrompe uma via específica: trocá-las tornaria ambas ineficazes.', 'ignorar a via de transmissão'],
          ['Apenas a medida II é eficaz, por ser estrutural.', 'Ser estrutural não torna a outra ineficaz: mosquiteiros reduzem comprovadamente a transmissão da malária.', 'hierarquizar sem critério técnico'],
          ['Cada medida interrompe a cadeia de transmissão específica da sua doença: a I atua sobre o vetor alado e a II sobre a veiculação hídrica e o contato com o solo contaminado.', 'A escolha da medida depende da via: malária é transmitida por mosquito, e verminoses, sobretudo por água, alimentos e solo contaminados por fezes.'],
          ['Apenas a medida I é eficaz, por agir diretamente sobre o agente causador.', 'O mosquiteiro age sobre o vetor, não sobre o protozoário; e a medida II é eficaz em sua própria via.', 'errar o alvo da medida'],
          ['Nenhuma das duas previne doenças, pois só a vacinação é preventiva.', 'Controle de vetores e saneamento estão entre as medidas preventivas mais eficazes conhecidas.', 'restringir prevenção à vacina'],
        ],
        explanation: 'A prevenção eficaz corresponde à via de transmissão. Comparar medidas exige olhar a cadeia de cada doença.',
      }),
      q({
        slug: 'q-saude-5',
        stem: 'Dois bairros de uma mesma cidade apresentam incidências muito diferentes de doenças de veiculação hídrica. O bairro com maior incidência tem menor renda média, cobertura de esgoto incompleta e abastecimento de água intermitente.\n\nA análise mais completa dessa diferença considera que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre biologia, determinantes sociais e política pública',
        seconds: 180,
        errors: ['atribuir a diferença apenas a comportamento individual'],
        correct: 4,
        options: [
          ['A diferença decorre exclusivamente de hábitos de higiene dos moradores.', 'Higiene depende de acesso a água e esgoto; atribuir tudo ao comportamento ignora a condição material.', 'culpar o indivíduo'],
          ['A diferença é genética, o que explicaria a maior suscetibilidade em um dos bairros.', 'Não há base para atribuir a diferença a fatores genéticos entre bairros.', 'invocar explicação biológica indevida'],
          ['A diferença é aleatória e não permite planejamento de saúde pública.', 'O padrão descrito é sistemático e é justamente a base para o planejamento.', 'negar padrão observável'],
          ['A solução depende apenas de campanhas educativas sobre fervura de água.', 'Educação ajuda, mas não substitui infraestrutura de saneamento.', 'reduzir política pública a comunicação'],
          ['Os determinantes sociais — saneamento, regularidade do abastecimento e renda — condicionam a exposição ao agente, de modo que a prevenção eficaz exige investimento em infraestrutura, além de ações educativas e assistenciais.', 'A exposição depende de condições materiais: sem esgoto e com abastecimento intermitente, o contato com água contaminada é mais provável independentemente do cuidado individual. Por isso a resposta combina infraestrutura, educação e assistência.'],
        ],
        explanation: 'A questão integra biologia da transmissão, determinantes sociais da saúde e desenho de política pública.',
      }),
      q({
        slug: 'q-saude-rec-1',
        stem: 'A imunidade coletiva contra uma doença transmissível é alcançada quando:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'compreensão de imunidade coletiva',
        seconds: 70,
        recovery: true,
        errors: ['confundir imunidade coletiva com imunidade individual'],
        correct: 1,
        options: [
          ['Cada pessoa se protege individualmente, sem relação com as demais.', 'A imunidade coletiva é, por definição, um efeito de população.', 'individualizar o conceito'],
          ['Uma proporção suficientemente alta da população está imunizada, o que reduz a circulação do agente e protege inclusive quem não pôde se vacinar.', 'Com poucos suscetíveis, cada caso encontra poucas pessoas capazes de adoecer, e as cadeias de transmissão se interrompem.'],
          ['A doença desaparece naturalmente após algumas gerações.', 'Não há desaparecimento espontâneo garantido; depende da interrupção da transmissão.', 'supor extinção natural'],
          ['Todas as pessoas, sem exceção, são vacinadas.', 'A imunidade coletiva não exige 100% de cobertura, e algumas pessoas não podem ser vacinadas.', 'exigir cobertura total'],
          ['O agente infeccioso sofre mutação e perde a capacidade de causar doença.', 'Mutações podem ocorrer em qualquer direção e não definem imunidade coletiva.', 'trocar o mecanismo'],
        ],
        explanation: 'Imunidade coletiva é efeito de população: alta cobertura interrompe cadeias de transmissão e protege os não imunizáveis.',
      }),
    ],
  }),

  topic({
    slug: 'mecanica',
    name: 'Mecânica',
    subject: 'fisica',
    area: 'ciencias-natureza',
    summary:
      'Descrever movimentos, aplicar as leis de Newton e usar conservação de energia em situações do cotidiano e do trânsito.',
    difficulty: 'intermediate',
    minutes: 25,
    weight: 88,
    order: 3,
    related: ['energia-e-transformacoes'],
    skill: {
      slug: 'aplicar-leis-do-movimento-e-conservacao',
      name: 'Aplicar leis do movimento e conservação de energia',
      description:
        'Relacionar força, massa, aceleração e energia em situações concretas, interpretando gráficos de movimento.',
    },
    quick: `**Cinemática essencial**

- Velocidade média = Δs / Δt
- MRU: s = s₀ + v·t
- MRUV: v = v₀ + a·t e s = s₀ + v₀t + a·t²/2
- Equação de Torricelli (sem tempo): v² = v₀² + 2·a·Δs

**Leis de Newton**

1. **Inércia:** sem força resultante, o corpo mantém seu estado de movimento.
2. **F = m·a:** a aceleração é proporcional à força resultante e inversa à massa.
3. **Ação e reação:** forças em pares, em corpos **diferentes** — por isso não se cancelam.

**Energia**

- Cinética: Ec = m·v²/2 → depende do **quadrado** da velocidade.
- Potencial gravitacional: Ep = m·g·h
- Sem atrito, a mecânica total se conserva.

**Consequência prática:** dobrar a velocidade **quadruplica** a energia cinética. É a física por trás dos limites de velocidade.`,
    explanation: {
      title: 'Ler gráficos, aplicar Newton e usar energia sem decorar fórmula',
      body: `### 1. Gráficos: o que cada inclinação significa

- **Posição × tempo:** a inclinação é a **velocidade**. Reta inclinada = velocidade constante; curva = velocidade variando; reta horizontal = repouso.
- **Velocidade × tempo:** a inclinação é a **aceleração**, e a **área** sob a curva é o deslocamento.

Essas duas leituras resolvem a maioria das questões de cinemática sem substituir nada em fórmula.

### 2. As leis de Newton no cotidiano

**Inércia:** o passageiro é projetado para a frente quando o ônibus freia — o corpo tende a manter o movimento. O cinto existe para aplicar a força que interrompe essa tendência de forma segura.

**F = m·a:** a mesma força empurra menos um corpo mais pesado. É por isso que caminhões precisam de mais distância para frear.

**Ação e reação:** ao caminhar, o pé empurra o chão para trás e o chão empurra a pessoa para a frente. As forças têm mesma intensidade e sentidos opostos, mas atuam em **corpos diferentes** — daí não se anularem.

### 3. Energia como atalho

Quando a pergunta envolve altura e velocidade e o tempo não importa, conservação de energia costuma resolver mais rápido:

*Um corpo cai de 20 m. Com que velocidade chega ao solo (g = 10 m/s²)?*

m·g·h = m·v²/2 → v² = 2·g·h = 2 × 10 × 20 = 400 → **v = 20 m/s**

Repare que a massa desaparece: a velocidade de chegada não depende dela (desprezando resistência do ar).

### 4. Por que velocidade mata mais que proporcionalmente

Como Ec = m·v²/2, ao passar de 60 para 120 km/h a energia envolvida em uma colisão fica **quatro vezes maior**. A distância de frenagem cresce na mesma proporção.

Esse é um dos raciocínios físicos com maior aplicação social direta.

### 5. Atrito não é vilão

Sem atrito, não seria possível caminhar, frear ou segurar objetos. Ele dissipa energia mecânica em térmica, mas é condição para o movimento controlado.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — ler um gráfico de velocidade',
        body: `**Situação:** um carro parte do repouso e sua velocidade cresce uniformemente até 30 m/s em 10 s; depois mantém essa velocidade por 20 s.

**a) Aceleração na primeira fase:**
a = Δv/Δt = 30/10 = **3 m/s²**

**b) Distância na primeira fase (área do triângulo):**
(10 × 30)/2 = **150 m**

**c) Distância na segunda fase (área do retângulo):**
30 × 20 = **600 m**

**d) Distância total:** **750 m**

**A ideia que economiza tempo:** no gráfico velocidade × tempo, área é deslocamento. Triângulos e retângulos resolvem sem nenhuma fórmula de MRUV.`,
      },
      {
        title: 'Exemplo resolvido 2 — frenagem e o quadrado da velocidade',
        body: `**Situação:** um carro a 20 m/s freia com desaceleração de 5 m/s². Qual a distância até parar? E se estivesse a 40 m/s?

**A 20 m/s (Torricelli):**
0 = 20² − 2 × 5 × d → d = 400/10 = **40 m**

**A 40 m/s:**
0 = 40² − 2 × 5 × d → d = 1.600/10 = **160 m**

**Conclusão:** a velocidade dobrou; a distância de frenagem **quadruplicou**.

**Por que isso importa:** essa relação quadrática, e não uma intuição linear, é o que fundamenta limites de velocidade em áreas urbanas. E o cálculo ainda desconsidera o tempo de reação do motorista, que acrescenta dezenas de metros.`,
      },
    ],
    mistakes: `**1. Achar que ação e reação se cancelam.**
Elas atuam em corpos diferentes. Só se somam forças aplicadas ao mesmo corpo.

**2. Confundir velocidade com aceleração em gráficos.**
No gráfico posição × tempo, a inclinação é a velocidade; no gráfico velocidade × tempo, a inclinação é a aceleração.

**3. Tratar energia cinética como proporcional à velocidade.**
Ela varia com o **quadrado** da velocidade — dobrar a velocidade quadruplica a energia.`,
    selfCheck: [
      'O que representa a área sob um gráfico de velocidade por tempo?',
      'Por que as forças de ação e reação não se anulam?',
      'Por que a distância de frenagem quadruplica quando a velocidade dobra?',
    ],
    questions: [
      q({
        slug: 'q-mec-1',
        stem: 'Um corpo de 4 kg recebe uma força resultante de 12 N. A aceleração adquirida por esse corpo é de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação direta da segunda lei de Newton',
        seconds: 60,
        errors: ['multiplicar em vez de dividir'],
        correct: 1,
        options: [
          ['48 m/s²', 'Corresponde a multiplicar força por massa.', 'inverter a operação'],
          ['3 m/s²', 'Pela segunda lei de Newton, a = F/m = 12/4 = 3 m/s².'],
          ['0,33 m/s²', 'Corresponde a dividir a massa pela força.', 'inverter a razão'],
          ['16 m/s²', 'Corresponde a somar força e massa.', 'somar grandezas diferentes'],
          ['8 m/s²', 'Não corresponde a nenhuma operação correta com os dados.', 'estimar sem calcular'],
        ],
        explanation: 'F = m·a, logo a = F/m. A unidade confirma: N/kg = m/s².',
      }),
      q({
        slug: 'q-mec-2',
        stem: 'Um passageiro em pé dentro de um ônibus é projetado para a frente quando o veículo freia bruscamente.\n\nEsse fenômeno é explicado:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação do princípio da inércia a situação cotidiana',
        seconds: 80,
        errors: ['inventar uma força para a frente'],
        correct: 2,
        options: [
          ['Por uma força que empurra o passageiro para a frente durante a frenagem.', 'Não há força aplicada para a frente; o que existe é a tendência de manter o movimento.', 'inventar força inexistente'],
          ['Pela terceira lei de Newton, já que o ônibus reage à frenagem.', 'A terceira lei trata de pares de forças em corpos diferentes, não do deslocamento do passageiro.', 'aplicar a lei errada'],
          ['Pelo princípio da inércia: o corpo tende a manter seu estado de movimento enquanto o ônibus desacelera.', 'O ônibus recebe força de frenagem; o passageiro, não. Ele continua com a velocidade que tinha, o que produz o deslocamento relativo para a frente.'],
          ['Pela ação da gravidade sobre o corpo do passageiro.', 'A gravidade atua verticalmente e não explica o deslocamento horizontal.', 'trocar a força atuante'],
          ['Pela conservação da energia cinética do ônibus.', 'A energia do ônibus é dissipada na frenagem, e isso não explica o movimento do passageiro.', 'aplicar conceito inadequado'],
        ],
        explanation: 'Primeira lei de Newton: sem força resultante aplicada a ele, o passageiro mantém sua velocidade enquanto o ônibus desacelera.',
      }),
      q({
        slug: 'q-mec-3',
        stem: 'Um gráfico de velocidade por tempo mostra: de 0 a 4 s, a velocidade sobe uniformemente de 0 a 8 m/s; de 4 s a 10 s, permanece constante em 8 m/s.\n\nA distância total percorrida no intervalo de 0 a 10 s é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de gráfico e cálculo de área',
        seconds: 120,
        errors: ['esquecer de dividir a área do triângulo por 2'],
        correct: 3,
        options: [
          ['80 m', 'Considera apenas a segunda fase, sem a área do triângulo.', 'ignorar uma das fases'],
          ['32 m', 'Corresponde a tratar a primeira fase como retângulo.', 'errar a forma da área'],
          ['96 m', 'Corresponde a somar 32 m (retângulo indevido) com 64 m.', 'errar as duas áreas'],
          ['64 m', 'Primeira fase: área do triângulo = (4 × 8)/2 = 16 m. Segunda fase: 8 × 6 = 48 m. Total: 64 m.'],
          ['48 m', 'Considera apenas a fase de velocidade constante.', 'ignorar a primeira fase'],
        ],
        explanation: 'No gráfico velocidade × tempo, a área sob a curva é o deslocamento. Triângulo mais retângulo resolve sem fórmula de MRUV.',
      }),
      q({
        slug: 'q-mec-4',
        stem: 'Dois carros idênticos freiam com a mesma desaceleração. O carro A trafega a 30 km/h e o carro B, a 60 km/h.\n\nSobre as distâncias de frenagem e as energias envolvidas, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação com relação quadrática entre velocidade e energia',
        seconds: 140,
        errors: ['supor relação linear'],
        correct: 0,
        options: [
          ['O carro B precisa de aproximadamente quatro vezes a distância do carro A, e sua energia cinética também é quatro vezes maior.', 'Tanto a energia cinética quanto a distância de frenagem variam com o quadrado da velocidade: dobrar v multiplica ambas por quatro.'],
          ['O carro B precisa do dobro da distância, pois sua velocidade é o dobro.', 'A relação é quadrática, não linear.', 'supor proporcionalidade direta'],
          ['As distâncias são iguais, pois a desaceleração é a mesma.', 'A mesma desaceleração aplicada a velocidades diferentes produz distâncias diferentes.', 'ignorar a velocidade inicial'],
          ['O carro B precisa de metade da distância, por ter mais energia para dissipar.', 'Mais energia exige mais distância, não menos.', 'inverter a relação'],
          ['A energia cinética é o dobro e a distância é quatro vezes maior.', 'Energia e distância crescem no mesmo fator quadrático.', 'misturar as relações'],
        ],
        explanation: 'Como Ec = m·v²/2 e v² = 2·a·d, tanto a energia quanto a distância de frenagem crescem com o quadrado da velocidade.',
        detail: 'Esse é o fundamento físico dos limites de velocidade urbanos, e o cálculo ainda ignora o tempo de reação do motorista.',
      }),
      q({
        slug: 'q-mec-5',
        stem: 'Uma cidade estuda reduzir o limite de velocidade em vias urbanas de 60 km/h para 40 km/h. Um grupo argumenta que a redução é pequena demais para produzir efeito.\n\nA análise física mais consistente indica que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre cinemática, energia e política de segurança viária',
        seconds: 180,
        errors: ['avaliar a redução apenas em termos percentuais de velocidade'],
        correct: 2,
        options: [
          ['A redução de 33% na velocidade produz uma redução equivalente de 33% na energia envolvida em uma colisão.', 'A energia depende do quadrado da velocidade, e a redução é bem maior que a percentual da velocidade.', 'aplicar proporcionalidade direta'],
          ['A redução não altera a distância de frenagem, que depende apenas do sistema de freios do veículo.', 'A distância de frenagem depende também da velocidade inicial, ao quadrado.', 'ignorar a velocidade inicial'],
          ['A redução diminui a energia cinética em cerca de 56% e encurta proporcionalmente a distância de frenagem, o que amplia bastante a chance de sobrevivência de um pedestre atropelado.', 'Como a energia varia com v², passar de 60 para 40 km/h reduz a energia para (40/60)² ≈ 44% do valor original — uma queda de cerca de 56%. A distância de frenagem cai na mesma proporção, e ambos os efeitos aumentam muito a chance de sobrevivência.'],
          ['A mudança só teria efeito se acompanhada da proibição total de veículos na região.', 'Medidas graduais têm efeito mensurável e não exigem proibição total.', 'exigir solução extrema'],
          ['A física não permite avaliar políticas de trânsito, que dependem apenas de estatísticas.', 'A relação quadrática entre velocidade e energia é justamente o fundamento físico dessas políticas.', 'separar indevidamente física e política pública'],
        ],
        explanation: 'A questão integra cinemática, energia e aplicação social: a relação quadrática torna reduções aparentemente pequenas de velocidade bastante significativas.',
      }),
      q({
        slug: 'q-mec-rec-1',
        stem: 'Um objeto é abandonado de uma altura de 45 m. Desprezando a resistência do ar e adotando g = 10 m/s², a velocidade com que ele chega ao solo é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação de conservação de energia ou Torricelli',
        seconds: 90,
        recovery: true,
        errors: ['esquecer a raiz quadrada'],
        correct: 2,
        options: [
          ['45 m/s', 'Confunde a altura com a velocidade final.', 'copiar o dado do enunciado'],
          ['900 m/s', 'É o valor de v², antes de extrair a raiz.', 'esquecer a raiz quadrada'],
          ['30 m/s', 'v² = 2·g·h = 2 × 10 × 45 = 900, logo v = 30 m/s.'],
          ['15 m/s', 'Corresponde à metade do valor correto.', 'errar a conta'],
          ['10 m/s', 'Corresponde ao valor da gravidade, não da velocidade final.', 'confundir grandezas'],
        ],
        explanation: 'A energia potencial se converte em cinética: m·g·h = m·v²/2, e a massa se cancela.',
      }),
    ],
  }),

  topic({
    slug: 'eletricidade',
    name: 'Eletricidade',
    subject: 'fisica',
    area: 'ciencias-natureza',
    summary:
      'Relacionar tensão, corrente, resistência e potência, e interpretar consumo elétrico em contas de energia e aparelhos domésticos.',
    difficulty: 'intermediate',
    minutes: 24,
    weight: 90,
    order: 4,
    prerequisites: ['energia-e-transformacoes'],
    related: ['mecanica'],
    skill: {
      slug: 'analisar-circuitos-e-consumo-eletrico',
      name: 'Analisar circuitos e consumo elétrico',
      description:
        'Aplicar a lei de Ohm, calcular potência e consumo e interpretar informações de aparelhos e contas de energia.',
    },
    quick: `**As três grandezas base**

- **Tensão (V)** — volt: o "empurrão" que move as cargas.
- **Corrente (I)** — ampère: quantidade de carga por segundo.
- **Resistência (R)** — ohm: oposição à passagem da corrente.

**Lei de Ohm:** V = R · I

**Potência:** P = V · I = R · I² = V²/R (watt)

**Consumo:** energia = potência × tempo. A conta de luz cobra em **kWh**:
kWh = (watts ÷ 1000) × horas

**Associações**

- **Série:** mesma corrente; resistências somam; se um componente abre, tudo apaga.
- **Paralelo:** mesma tensão; a resistência equivalente é menor que a menor delas; cada ramo é independente — é assim que a casa é ligada.

**Choque:** quem faz mal é a **corrente** que atravessa o corpo, não a tensão isolada.`,
    explanation: {
      title: 'Da tomada à conta de luz',
      body: `### 1. O que a potência de um aparelho realmente informa

A etiqueta de um chuveiro de 5.500 W diz quanta energia ele converte **por segundo**. Como a conta cobra energia acumulada, o gasto depende também do **tempo de uso**.

Um chuveiro de 5.500 W ligado 15 minutos por dia:
(5.500 ÷ 1000) × 0,25 h = 1,375 kWh/dia → cerca de **41 kWh/mês**.

Uma lâmpada de 10 W acesa 5 horas por dia:
0,01 × 5 = 0,05 kWh/dia → **1,5 kWh/mês**.

Daí a regra prática: **alta potência com pouco tempo pode gastar mais que baixa potência com muito tempo** — e é por isso que chuveiro e ar-condicionado dominam a conta.

### 2. Por que a casa é ligada em paralelo

Em série, apagar uma lâmpada desligaria todas, e cada aparelho receberia apenas parte da tensão. Em paralelo:

- todo aparelho recebe a tensão nominal da rede;
- cada um pode ser ligado e desligado sem afetar os outros;
- a corrente total é a soma das correntes dos ramos.

O preço disso é que ligar muitos aparelhos no mesmo circuito aumenta a corrente total — daí a existência de disjuntores.

### 3. Tensão 127 V ou 220 V

Para a mesma potência, tensão maior significa corrente menor (P = V·I). Corrente menor permite fios mais finos e reduz perdas por aquecimento (que dependem de I²·R).

É por isso que a transmissão de longa distância usa tensões altíssimas: para reduzir perdas na linha.

**Atenção:** ligar em 127 V um aparelho projetado para 220 V, ou o contrário, pode queimá-lo — a resistência do equipamento é fixa, e a potência dissipada muda com o quadrado da tensão.

### 4. Segurança elétrica

O que causa dano é a **corrente** que percorre o corpo. Ela depende da tensão e da resistência do caminho — e a resistência da pele cai muito quando está molhada, o que explica o perigo de mexer em instalações no banheiro.

Aterramento e disjuntores diferenciais existem para desviar e interromper correntes de fuga antes que causem dano.

### 5. Eficiência

LED converte mais energia em luz e menos em calor que uma lâmpada incandescente. Trocar 60 W por 9 W com o mesmo brilho reduz o consumo em 85% para a mesma função — o exemplo mais direto de eficiência energética doméstica.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — quanto custa o chuveiro no mês',
        body: `**Situação:** chuveiro de 4.400 W, usado por 3 pessoas, 10 minutos cada, todos os dias. Tarifa: R$ 0,80 por kWh.

**Passo 1 — tempo diário:** 3 × 10 min = 30 min = **0,5 h**

**Passo 2 — energia diária:** (4.400 ÷ 1000) × 0,5 = **2,2 kWh**

**Passo 3 — mês (30 dias):** 2,2 × 30 = **66 kWh**

**Passo 4 — custo:** 66 × 0,80 = **R$ 52,80**

**Comparação que dá dimensão:** uma geladeira de 150 W ligada 24 h por dia consome 0,15 × 24 × 30 = 108 kWh/mês. O chuveiro, usado meia hora por dia, chega a 61% disso.

**Se cada banho encurtasse 3 minutos:** o consumo cairia para 46,2 kWh, uma economia de cerca de R$ 15,80 por mês.`,
      },
      {
        title: 'Exemplo resolvido 2 — associação em série e em paralelo',
        body: `**Situação:** três resistores de 6 Ω cada, sob tensão de 12 V.

**Em série:**
- R = 6 + 6 + 6 = 18 Ω
- I = 12/18 ≈ 0,67 A
- P = 12 × 0,67 ≈ **8 W**

**Em paralelo:**
- 1/R = 1/6 + 1/6 + 1/6 = 3/6 → R = **2 Ω**
- I = 12/2 = 6 A
- P = 12 × 6 = **72 W**

**Conclusão:** a mesma tensão e os mesmos componentes dissipam **nove vezes mais** potência em paralelo.

**Verificação de sanidade:** em paralelo, a resistência equivalente (2 Ω) é menor que a menor das resistências individuais (6 Ω). Se o resultado der maior, há erro na conta.`,
      },
    ],
    mistakes: `**1. Confundir potência com consumo.**
Potência é energia por segundo; consumo é potência multiplicada pelo tempo de uso.

**2. Somar resistências em paralelo.**
Em paralelo, soma-se o inverso. A equivalente é sempre menor que a menor resistência do conjunto.

**3. Achar que a tensão sozinha determina o perigo do choque.**
O dano depende da corrente que passa pelo corpo, e a resistência da pele varia muito — sobretudo se estiver molhada.`,
    selfCheck: [
      'Por que um chuveiro usado 30 minutos por dia pode pesar mais na conta que uma geladeira ligada o dia todo?',
      'Por que as instalações residenciais são ligadas em paralelo?',
      'Como se calcula o consumo em kWh de um aparelho a partir da sua potência?',
    ],
    questions: [
      q({
        slug: 'q-elet-1',
        stem: 'Um resistor de 20 Ω é submetido a uma tensão de 120 V. A corrente que o percorre é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação direta da lei de Ohm',
        seconds: 60,
        errors: ['multiplicar em vez de dividir'],
        correct: 1,
        options: [
          ['2.400 A', 'Corresponde a multiplicar tensão por resistência.', 'inverter a operação'],
          ['6 A', 'Pela lei de Ohm, I = V/R = 120/20 = 6 A.'],
          ['0,17 A', 'Corresponde a dividir a resistência pela tensão.', 'inverter a razão'],
          ['100 A', 'Corresponde a subtrair a resistência da tensão.', 'subtrair grandezas diferentes'],
          ['140 A', 'Corresponde a somar tensão e resistência.', 'somar grandezas diferentes'],
        ],
        explanation: 'V = R·I, logo I = V/R. A unidade confirma: V/Ω = A.',
      }),
      q({
        slug: 'q-elet-2',
        stem: 'Uma residência usa um ferro de passar de 1.200 W durante 2 horas por semana. Considerando 4 semanas no mês e tarifa de R$ 0,75 por kWh, o custo mensal desse aparelho é de aproximadamente:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'cálculo de consumo em kWh e conversão em custo',
        seconds: 120,
        errors: ['esquecer de converter watts em quilowatts'],
        correct: 0,
        options: [
          ['R$ 7,20', 'Consumo: 1,2 kW × 2 h × 4 semanas = 9,6 kWh. Custo: 9,6 × 0,75 = R$ 7,20.'],
          ['R$ 72,00', 'Corresponde a usar 1.200 W sem converter para quilowatts.', 'esquecer a conversão de unidade'],
          ['R$ 1,80', 'Considera apenas uma semana de uso.', 'ignorar o período total'],
          ['R$ 14,40', 'Corresponde a dobrar o tempo de uso informado.', 'errar o tempo'],
          ['R$ 3,60', 'Corresponde à metade do consumo real.', 'errar a multiplicação'],
        ],
        explanation: 'Consumo em kWh é potência em kW multiplicada pelas horas de uso. A conversão de W para kW é o passo mais esquecido.',
        strategy: 'Divida a potência por 1.000 antes de qualquer outra conta.',
      }),
      q({
        slug: 'q-elet-3',
        stem: 'A tabela mostra a potência e o tempo médio de uso diário de alguns aparelhos de uma residência:\n\n| Aparelho | Potência | Uso diário |\n| --- | --- | --- |\n| Chuveiro | 5.400 W | 0,5 h |\n| Geladeira | 120 W | 24 h |\n| Televisão | 90 W | 5 h |\n| Lâmpadas LED (total) | 60 W | 6 h |\n\nO aparelho responsável pelo maior consumo mensal é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'comparação de consumo a partir de potência e tempo',
        seconds: 140,
        errors: ['escolher pela potência sem considerar o tempo'],
        correct: 1,
        options: [
          ['O chuveiro, por ter a maior potência.', 'O chuveiro consome 2,7 kWh/dia; a geladeira, 2,88 kWh/dia. A potência sozinha não decide.', 'decidir pela potência isolada'],
          ['A geladeira, que consome 2,88 kWh por dia contra 2,7 kWh do chuveiro.', 'Geladeira: 0,12 kW × 24 h = 2,88 kWh. Chuveiro: 5,4 kW × 0,5 h = 2,7 kWh. O tempo de uso compensa a diferença de potência.'],
          ['A televisão, por ficar ligada várias horas.', 'Televisão: 0,09 × 5 = 0,45 kWh/dia, bem abaixo dos demais.', 'ignorar a ordem de grandeza'],
          ['As lâmpadas, por estarem distribuídas pela casa.', 'Lâmpadas: 0,06 × 6 = 0,36 kWh/dia, o menor consumo da lista.', 'confundir quantidade com consumo'],
          ['Todos consomem o mesmo, pois potência e tempo se compensam.', 'Os valores calculados são diferentes entre si.', 'supor equivalência sem calcular'],
        ],
        explanation: 'Consumo é potência multiplicada pelo tempo. Neste caso, as 24 horas da geladeira superam por pouco a alta potência do chuveiro.',
        detail: 'A diferença é pequena: reduzir 5 minutos por banho já inverteria o ranking.',
      }),
      q({
        slug: 'q-elet-4',
        stem: 'Dois resistores idênticos de 10 Ω podem ser associados em série ou em paralelo, sob a mesma tensão de 20 V.\n\nSobre as duas associações, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre associações em série e em paralelo',
        seconds: 140,
        errors: ['somar resistências em paralelo'],
        correct: 4,
        options: [
          ['A resistência equivalente é 20 Ω em ambos os casos.', 'Em paralelo, a equivalente é 5 Ω.', 'somar em paralelo também'],
          ['A associação em série dissipa mais potência, pois tem maior resistência.', 'Sob tensão fixa, maior resistência significa menor corrente e menor potência.', 'inverter a relação'],
          ['A corrente é a mesma nas duas associações.', 'Em série, I = 1 A; em paralelo, I = 4 A.', 'ignorar a mudança da resistência equivalente'],
          ['Em paralelo, a resistência equivalente é maior que a de cada resistor isolado.', 'Em paralelo, a equivalente é sempre menor que a menor resistência do conjunto.', 'inverter a propriedade do paralelo'],
          ['Em série a resistência equivalente é 20 Ω e a potência dissipada é 20 W; em paralelo a equivalente é 5 Ω e a potência é 80 W.', 'Série: R = 20 Ω, I = 1 A, P = 20 W. Paralelo: R = 5 Ω, I = 4 A, P = 80 W. Sob a mesma tensão, o paralelo dissipa quatro vezes mais.'],
        ],
        explanation: 'Em série as resistências somam; em paralelo, somam-se os inversos. Sob tensão fixa, menor resistência significa maior corrente e maior potência.',
      }),
      q({
        slug: 'q-elet-5',
        stem: 'Uma família quer reduzir a conta de luz e avalia duas medidas:\n\nI. Trocar as dez lâmpadas incandescentes de 60 W por LEDs de 9 W, mantendo 6 horas de uso diário.\nII. Reduzir em 5 minutos o banho de cada uma das quatro pessoas da casa, que usam um chuveiro de 5.500 W.\n\nComparando o consumo mensal evitado por cada medida:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre potência, tempo de uso, quantidade de aparelhos e decisão prática',
        seconds: 190,
        errors: ['comparar apenas as potências', 'ignorar o número de lâmpadas'],
        correct: 2,
        options: [
          ['As duas medidas economizam praticamente o mesmo, pois potência e tempo se compensam.', 'Os valores calculados são bem diferentes: cerca de 92 kWh contra 55 kWh por mês.', 'supor equivalência sem calcular'],
          ['A redução do banho economiza mais, porque o chuveiro tem a maior potência da casa.', 'A potência do chuveiro é maior, mas ele funciona poucos minutos por dia; o cálculo do consumo precisa incluir o tempo.', 'decidir pela potência isolada'],
          ['A troca das lâmpadas economiza mais: cerca de 92 kWh por mês, contra cerca de 55 kWh da redução do banho.', 'Lâmpadas: dez unidades economizam 51 W cada, ou 0,51 kW × 6 h ≈ 3,06 kWh/dia ≈ 92 kWh/mês. Banho: 20 minutos a menos por dia com 5,5 kW dão 5,5 × 0,33 ≈ 1,83 kWh/dia ≈ 55 kWh/mês.'],
          ['Nenhuma das duas produz efeito relevante, pois ambas envolvem valores pequenos de potência.', 'As duas somam quase 150 kWh mensais evitados, o que é bastante significativo em uma conta residencial.', 'descartar medidas eficazes'],
          ['A troca das lâmpadas é desnecessária, pois LEDs consomem mais energia ao longo do tempo.', 'LEDs consomem menos para o mesmo brilho e duram mais.', 'inverter o dado técnico'],
        ],
        explanation: 'Comparar medidas de economia exige calcular consumo absoluto: potência × tempo × número de aparelhos. Dez lâmpadas com muitas horas de uso superam um chuveiro potente usado poucos minutos.',
        detail: 'As duas medidas são complementares e podem ser adotadas juntas — o exercício serve para mostrar que a intuição de "o aparelho mais potente é o vilão" nem sempre se confirma.',
      }),
      q({
        slug: 'q-elet-rec-1',
        stem: 'Um aparelho de 100 W permanece ligado 10 horas por dia. Seu consumo diário de energia elétrica é de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'cálculo básico de consumo em kWh',
        seconds: 70,
        recovery: true,
        errors: ['esquecer a conversão de W para kW'],
        correct: 2,
        options: [
          ['1.000 kWh', 'Corresponde a não converter watts em quilowatts.', 'esquecer a conversão'],
          ['10 kWh', 'Corresponde a usar a potência em kW como se fosse 1 kW.', 'errar a conversão'],
          ['1 kWh', '100 W = 0,1 kW. Consumo: 0,1 × 10 = 1 kWh por dia.'],
          ['0,1 kWh', 'Considera apenas uma hora de uso.', 'ignorar o tempo total'],
          ['100 kWh', 'Confunde a potência com o consumo.', 'confundir grandezas'],
        ],
        explanation: 'Consumo em kWh = potência em kW × horas de uso.',
      }),
    ],
  }),

  topic({
    slug: 'solucoes',
    name: 'Soluções',
    subject: 'quimica',
    area: 'ciencias-natureza',
    summary:
      'Trabalhar com concentração, diluição e solubilidade em situações de laboratório, indústria e cotidiano.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 87,
    order: 2,
    prerequisites: ['transformacoes-quimicas'],
    related: ['estequiometria-introdutoria'],
    skill: {
      slug: 'calcular-e-interpretar-concentracoes',
      name: 'Calcular e interpretar concentrações de soluções',
      description:
        'Aplicar concentração comum, molaridade e diluição, e interpretar curvas de solubilidade.',
    },
    quick: `**Vocabulário**
- **Soluto:** o que se dissolve. **Solvente:** o que dissolve (em geral, a água).
- **Solução:** mistura homogênea de soluto e solvente.

**Concentrações**
- **Comum (C):** massa do soluto ÷ volume da solução → g/L
- **Molaridade (M):** mols de soluto ÷ volume em litros → mol/L
- **Título em massa:** massa do soluto ÷ massa da solução (× 100 = %)

**Diluição:** acrescentar solvente não muda a quantidade de soluto.
C₁·V₁ = C₂·V₂

**Solubilidade:** massa máxima que se dissolve em certa quantidade de solvente, a uma temperatura.
- Solução **insaturada:** abaixo do limite.
- **Saturada:** no limite.
- **Supersaturada:** acima, instável — qualquer perturbação precipita o excesso.

**Regra prática:** para a maioria dos sólidos, a solubilidade **aumenta** com a temperatura. Para gases, **diminui** — por isso refrigerante quente perde gás mais rápido.`,
    explanation: {
      title: 'Concentração, diluição e leitura de curvas de solubilidade',
      body: `### 1. Volume da solução, não do solvente

Concentração usa o volume **final da solução**, e não o volume de água adicionada. Dissolver 20 g de sal e completar até 500 mL não é o mesmo que dissolver em 500 mL de água — o volume final seria um pouco maior.

Em prova, o enunciado geralmente informa o volume final. Se disser "dissolvidos em água suficiente para 500 mL", é volume de solução.

### 2. Molaridade em três passos

*Qual a molaridade de uma solução com 40 g de NaOH (massa molar 40 g/mol) em 2 L?*

1. mols = 40 ÷ 40 = 1 mol
2. M = 1 ÷ 2
3. **M = 0,5 mol/L**

O passo esquecido é o primeiro: converter massa em mols antes de dividir pelo volume.

### 3. Diluição: por que C₁V₁ = C₂V₂ funciona

Ao adicionar solvente, a **quantidade de soluto não muda** — só se espalha por mais volume. Como concentração × volume é a quantidade de soluto, esse produto se conserva.

*Diluir 100 mL de solução 2 mol/L até 500 mL:*
2 × 100 = C₂ × 500 → C₂ = **0,4 mol/L**

**Conferência de sanidade:** o volume quintuplicou, então a concentração deve cair cinco vezes. E cai.

### 4. Ler uma curva de solubilidade

O gráfico traz temperatura no eixo horizontal e solubilidade (g de soluto por 100 g de água) no vertical.

- Ponto **sobre** a curva: solução saturada.
- Ponto **abaixo**: insaturada, ainda dissolve mais.
- Ponto **acima**: supersaturada, instável.

Questão clássica: resfriar uma solução saturada faz precipitar a diferença entre a solubilidade na temperatura inicial e na final.

### 5. Fatores que afetam a dissolução

- **Temperatura:** aumenta a solubilidade da maioria dos sólidos; diminui a dos gases.
- **Agitação e granulometria:** aceleram a dissolução, mas **não alteram** a solubilidade máxima.
- **Pressão:** relevante para gases (por isso a garrafa de refrigerante é pressurizada).

Distinguir **velocidade** de dissolução de **quantidade máxima** dissolvida é uma das confusões mais cobradas.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — soro caseiro e concentração',
        body: `**Situação:** uma receita de soro caseiro dissolve 3,5 g de sal e 20 g de açúcar em água suficiente para 1 L de solução.

**Concentração comum do sal:**
C = 3,5 g ÷ 1 L = **3,5 g/L**

**Molaridade do sal (NaCl, massa molar 58,5 g/mol):**
mols = 3,5 ÷ 58,5 ≈ 0,06 mol → M ≈ **0,06 mol/L**

**Por que a proporção importa:** concentrações muito acima do recomendado podem agravar a desidratação em vez de tratá-la, porque alteram o equilíbrio osmótico. Por isso a orientação de saúde insiste na medida correta.

**Erro comum de cálculo:** usar 1 L de água em vez de 1 L de solução. Aqui a diferença é pequena, mas em soluções concentradas é significativa.`,
      },
      {
        title: 'Exemplo resolvido 2 — resfriar uma solução saturada',
        body: `**Dados de solubilidade de um sal:** 80 °C → 60 g por 100 g de água; 20 °C → 35 g por 100 g de água.

**Situação:** 200 g de água a 80 °C com a quantidade máxima de sal dissolvida. A solução é resfriada até 20 °C.

**Passo 1 — massa dissolvida a 80 °C:** 60 × 2 = **120 g** (são 200 g de água, o dobro de 100 g).

**Passo 2 — massa que permanece a 20 °C:** 35 × 2 = **70 g**.

**Passo 3 — precipitado:** 120 − 70 = **50 g**.

**Cuidado que a prova cobra:** o dado da tabela é sempre "por 100 g de água". Esquecer de ajustar para a massa real de água é o erro mais frequente do tópico.`,
      },
    ],
    mistakes: `**1. Usar volume de solvente em vez de volume de solução.**
Concentração se refere ao volume final da solução.

**2. Esquecer de converter massa em mols na molaridade.**
Molaridade é mol/L; começar dividindo gramas por litros dá g/L, que é outra grandeza.

**3. Confundir velocidade de dissolução com solubilidade.**
Triturar e agitar aceleram o processo, mas não aumentam a quantidade máxima que se dissolve.`,
    selfCheck: [
      'Por que a fórmula C₁V₁ = C₂V₂ funciona em uma diluição?',
      'O que significa um ponto acima da curva de solubilidade?',
      'Qual a diferença entre acelerar a dissolução e aumentar a solubilidade?',
    ],
    questions: [
      q({
        slug: 'q-sol-1',
        stem: 'Uma solução foi preparada dissolvendo 25 g de um sal em água suficiente para completar 500 mL de solução. A concentração comum dessa solução é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação da concentração comum',
        seconds: 80,
        errors: ['esquecer de converter mL em L'],
        correct: 2,
        options: [
          ['0,05 g/L', 'Corresponde a dividir a massa pelo volume em mililitros.', 'esquecer a conversão de unidade'],
          ['25 g/L', 'Corresponde a supor 1 L de solução.', 'ignorar o volume informado'],
          ['50 g/L', 'C = m/V = 25 g ÷ 0,5 L = 50 g/L.'],
          ['12,5 g/L', 'Corresponde a multiplicar a massa pelo volume em litros.', 'inverter a operação'],
          ['500 g/L', 'Confunde o volume com a concentração.', 'trocar as grandezas'],
        ],
        explanation: 'Concentração comum é massa do soluto dividida pelo volume da solução em litros.',
      }),
      q({
        slug: 'q-sol-2',
        stem: 'Um laboratório precisa preparar 400 mL de solução 0,5 mol/L a partir de uma solução estoque de 2 mol/L. O volume da solução estoque necessário é:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação da relação de diluição',
        seconds: 110,
        errors: ['inverter a razão das concentrações'],
        correct: 3,
        options: [
          ['1.600 mL', 'Corresponde a inverter a relação entre as concentrações.', 'inverter a razão'],
          ['200 mL', 'Corresponde a uma diluição de 1:2, e não de 1:4.', 'errar o fator de diluição'],
          ['50 mL', 'Corresponde a uma diluição de 1:8.', 'errar o fator de diluição'],
          ['100 mL', 'C₁V₁ = C₂V₂ → 2 × V₁ = 0,5 × 400 → V₁ = 200/2 = 100 mL. Completa-se com água até 400 mL.'],
          ['400 mL', 'Não haveria diluição alguma.', 'ignorar a mudança de concentração'],
        ],
        explanation: 'A concentração cai quatro vezes, então o volume inicial é um quarto do final: 100 mL de estoque completados até 400 mL.',
        strategy: 'Confira sempre pelo fator: concentração dividida por 4 significa volume multiplicado por 4.',
      }),
      q({
        slug: 'q-sol-3',
        stem: 'A tabela mostra a solubilidade de um sal em água:\n\n| Temperatura | Solubilidade (g / 100 g de água) |\n| --- | --- |\n| 20 °C | 30 |\n| 40 °C | 45 |\n| 60 °C | 65 |\n\nUma solução saturada preparada com 300 g de água a 60 °C é resfriada até 20 °C. A massa de sal que precipita é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de tabela de solubilidade com ajuste de massa de água',
        seconds: 150,
        errors: ['esquecer de ajustar para 300 g de água'],
        correct: 1,
        options: [
          ['35 g', 'Esse seria o resultado para 100 g de água; a solução tem 300 g.', 'não ajustar a massa de água'],
          ['105 g', 'A 60 °C, 300 g de água dissolvem 65 × 3 = 195 g. A 20 °C, dissolvem 30 × 3 = 90 g. Precipitam 195 − 90 = 105 g.'],
          ['195 g', 'É a massa total dissolvida a 60 °C, não o precipitado.', 'confundir total com diferença'],
          ['90 g', 'É a massa que permanece dissolvida a 20 °C.', 'responder a parte que permanece'],
          ['45 g', 'Corresponde à solubilidade a 40 °C, temperatura que não aparece no problema.', 'usar a linha errada da tabela'],
        ],
        explanation: 'Ajuste sempre a solubilidade tabelada (por 100 g de água) para a massa real de água do problema.',
      }),
      q({
        slug: 'q-sol-4',
        stem: 'Compare dois procedimentos para dissolver açúcar em água:\n\nI. Triturar o açúcar e agitar a mistura vigorosamente.\nII. Aquecer a água antes de adicionar o açúcar.\n\nSobre os efeitos de cada procedimento:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'distinção entre velocidade de dissolução e solubilidade máxima',
        seconds: 140,
        errors: ['achar que agitar aumenta a solubilidade'],
        correct: 0,
        options: [
          ['I acelera a dissolução sem alterar a quantidade máxima dissolvida; II aumenta a solubilidade, permitindo dissolver mais açúcar.', 'Trituração e agitação aumentam a superfície de contato e o transporte, o que acelera o processo. Já a temperatura desloca o equilíbrio e aumenta a quantidade máxima que se dissolve.'],
          ['Os dois procedimentos aumentam a solubilidade na mesma proporção.', 'Agitação não altera a solubilidade máxima.', 'igualar efeitos distintos'],
          ['Os dois apenas aceleram a dissolução, sem alterar a solubilidade.', 'O aquecimento altera a solubilidade da maioria dos sólidos.', 'ignorar o efeito da temperatura'],
          ['I aumenta a solubilidade e II apenas acelera o processo.', 'Os efeitos estão trocados.', 'inverter os efeitos'],
          ['Nenhum dos dois tem efeito, pois a solubilidade é uma constante imutável.', 'A solubilidade depende da temperatura, e a velocidade depende das condições do processo.', 'tratar solubilidade como constante absoluta'],
        ],
        explanation: 'Velocidade de dissolução e solubilidade máxima são grandezas distintas, afetadas por fatores diferentes.',
      }),
      q({
        slug: 'q-sol-5',
        stem: 'Uma estação de tratamento precisa dosar cloro na água. O manual recomenda concentração final entre 0,5 e 1,0 mg/L em um reservatório de 200.000 litros. O operador dispõe de uma solução concentrada de 50 g/L.\n\nA análise correta da dosagem é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre concentração, diluição, unidades e segurança operacional',
        seconds: 190,
        errors: ['errar a conversão entre mg e g', 'ignorar a faixa recomendada'],
        correct: 2,
        options: [
          ['São necessários 100 litros da solução concentrada para atingir 0,5 mg/L.', 'Esse volume produziria concentração mil vezes maior que a recomendada.', 'errar a ordem de grandeza'],
          ['A dosagem não pode ser calculada sem conhecer a temperatura da água.', 'A temperatura afeta a estabilidade do cloro, mas não impede o cálculo da dosagem.', 'exigir dado desnecessário para o cálculo'],
          ['Para 0,5 mg/L são necessários 2 litros da solução, e para 1,0 mg/L, 4 litros — faixa dentro da qual a dosagem deve ser mantida e monitorada.', 'Massa necessária para 0,5 mg/L: 0,5 mg × 200.000 = 100.000 mg = 100 g. Como a solução tem 50 g/L, são 2 L. Para 1,0 mg/L, 200 g, ou 4 L. A dosagem deve permanecer nessa faixa e ser verificada.'],
          ['Qualquer quantidade serve, desde que o cloro seja diluído antes da aplicação.', 'Concentração fora da faixa compromete a desinfecção ou a potabilidade.', 'ignorar limites técnicos'],
          ['A solução concentrada deve ser aplicada diretamente, sem cálculo, pois o volume do reservatório é muito grande.', 'Volume grande não dispensa cálculo: é justamente o que determina a massa necessária.', 'dispensar o cálculo'],
        ],
        explanation: 'A questão integra concentração, conversão de unidades e critério operacional — incluindo o fato de que existe uma faixa, e não um valor único.',
      }),
      q({
        slug: 'q-sol-rec-1',
        stem: 'Uma solução em que a quantidade de soluto dissolvido é a máxima possível naquela temperatura é chamada de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'classificação de soluções quanto à saturação',
        seconds: 60,
        recovery: true,
        errors: ['confundir saturada com supersaturada'],
        correct: 1,
        options: [
          ['Insaturada.', 'Insaturada é aquela que ainda pode dissolver mais soluto.', 'trocar a classificação'],
          ['Saturada.', 'A solução saturada contém exatamente a quantidade máxima de soluto que se dissolve naquela temperatura.'],
          ['Supersaturada.', 'Supersaturada contém mais soluto do que o máximo estável, e é instável.', 'confundir com estado instável'],
          ['Diluída.', 'Diluída indica baixa concentração, sem referência ao limite de saturação.', 'confundir com concentração baixa'],
          ['Coloidal.', 'Coloide é outro tipo de dispersão, com partículas maiores.', 'trocar o tipo de mistura'],
        ],
        explanation: 'Saturada é a solução no limite de dissolução para aquela temperatura.',
      }),
    ],
  }),

  topic({
    slug: 'estequiometria-introdutoria',
    name: 'Estequiometria introdutória',
    subject: 'quimica',
    area: 'ciencias-natureza',
    summary:
      'Usar mol, massa molar e proporções de equações balanceadas para prever quanto se consome e quanto se produz em uma reação.',
    difficulty: 'challenging',
    minutes: 25,
    weight: 85,
    order: 3,
    prerequisites: ['transformacoes-quimicas', 'solucoes'],
    skill: {
      slug: 'calcular-quantidades-em-reacoes-quimicas',
      name: 'Calcular quantidades em reações químicas',
      description:
        'Relacionar massa, mol e proporção estequiométrica para prever consumo e produção em reações balanceadas.',
    },
    quick: `**O mol é uma contagem.** 1 mol = 6,02 × 10²³ partículas. A **massa molar** (g/mol) converte massa em quantidade de partículas.

**O caminho que resolve quase tudo**

massa (g) → **÷ massa molar** → mol → **× proporção da equação** → mol → **× massa molar** → massa (g)

**Balancear vem primeiro.** Sem a equação balanceada, a proporção está errada e todo o resto também.

N₂ + 3 H₂ → 2 NH₃ significa: 1 mol de N₂ reage com **3** de H₂ e produz **2** de NH₃.

**Reagente limitante:** quando as quantidades dos dois reagentes são dadas, um acaba primeiro e determina o resultado. Calcule o produto a partir de cada reagente e fique com o **menor** valor.

**Rendimento:** rendimento (%) = massa obtida ÷ massa teórica × 100. Na prática, quase nunca chega a 100%.`,
    explanation: {
      title: 'O caminho massa → mol → mol → massa, sem pular etapa',
      body: `### 1. Por que passar por mol

A equação química informa proporção em **mols**, não em gramas. Reagir "10 g com 10 g" não diz nada sobre a proporção correta, porque partículas diferentes têm massas diferentes.

Por isso o percurso é sempre o mesmo: converter para mol, aplicar a proporção da equação e converter de volta.

### 2. Exemplo completo

*Quantos gramas de água se formam na combustão completa de 32 g de metano?*

**Equação balanceada:** CH₄ + 2 O₂ → CO₂ + 2 H₂O

1. Massa molar do CH₄ = 12 + 4 = 16 g/mol
2. mols de CH₄ = 32 ÷ 16 = **2 mol**
3. Proporção: 1 CH₄ → 2 H₂O, logo 2 mol de CH₄ → **4 mol de H₂O**
4. Massa molar da H₂O = 18 g/mol
5. Massa = 4 × 18 = **72 g**

### 3. Reagente limitante

*2 mol de H₂ reagem com 2 mol de O₂ para formar água (2 H₂ + O₂ → 2 H₂O). Quanto se forma?*

- Por H₂: 2 mol de H₂ → 2 mol de H₂O
- Por O₂: 2 mol de O₂ → 4 mol de H₂O

O menor valor manda: formam-se **2 mol de água**, e sobra 1 mol de O₂. O H₂ é o **limitante**.

### 4. Rendimento real

Se a previsão teórica é 72 g e o experimento obtém 61,2 g:

61,2 ÷ 72 × 100 = **85% de rendimento**

Perdas por reação incompleta, reações paralelas e material que fica no equipamento explicam a diferença. Uma resposta que ignora isso costuma ser a alternativa errada em questões contextualizadas.

### 5. Conferência que evita erro grosseiro

A **massa total se conserva**: a soma das massas dos reagentes consumidos é igual à soma das massas dos produtos. Se o resultado violar isso, há erro em algum passo.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — do reagente ao produto',
        body: `**Situação:** decomposição do carbonato de cálcio: CaCO₃ → CaO + CO₂

**Pergunta:** quantos gramas de CaO se obtêm a partir de 250 g de CaCO₃? (Massas molares: CaCO₃ = 100 g/mol; CaO = 56 g/mol.)

1. mols de CaCO₃ = 250 ÷ 100 = **2,5 mol**
2. Proporção 1:1 → **2,5 mol de CaO**
3. Massa = 2,5 × 56 = **140 g**

**Conferência pela conservação da massa:** o CO₂ liberado tem massa molar 44 g/mol → 2,5 × 44 = 110 g. E 140 + 110 = **250 g**, exatamente a massa inicial. O cálculo fecha.`,
      },
      {
        title: 'Exemplo resolvido 2 — limitante e rendimento juntos',
        body: `**Situação:** N₂ + 3 H₂ → 2 NH₃. Reagem 28 g de N₂ (28 g/mol) com 9 g de H₂ (2 g/mol).

**Passo 1 — mols:**
- N₂: 28 ÷ 28 = 1 mol
- H₂: 9 ÷ 2 = 4,5 mol

**Passo 2 — quem limita:**
- Por N₂: 1 mol → 2 mol de NH₃
- Por H₂: 4,5 ÷ 3 = 1,5 → 3 mol de NH₃

Menor valor: **2 mol de NH₃**. O **N₂ é o limitante**, e sobram 1,5 mol de H₂.

**Passo 3 — massa teórica:** 2 × 17 = **34 g de NH₃**

**Passo 4 — rendimento de 70%:** 34 × 0,70 = **23,8 g** obtidos na prática.

**Repare:** havia mais massa de N₂ (28 g) que de H₂ (9 g), e ainda assim o N₂ foi o limitante. Massa não decide — proporção em mols decide.`,
      },
    ],
    mistakes: `**1. Calcular sem balancear a equação.**
A proporção vem dos coeficientes. Equação desbalanceada leva a todos os números errados.

**2. Aplicar a proporção diretamente em gramas.**
A proporção da equação é em mols. Converta antes.

**3. Escolher o reagente limitante pela massa.**
O limitante é definido pela razão entre mols disponíveis e coeficientes, não pela massa maior ou menor.`,
    selfCheck: [
      'Por que é necessário converter massa em mol antes de aplicar a proporção da equação?',
      'Como se identifica o reagente limitante quando há dois reagentes em quantidades conhecidas?',
      'Por que o rendimento real de uma reação costuma ser menor que o teórico?',
    ],
    questions: [
      q({
        slug: 'q-esteq-1',
        stem: 'Considere a reação balanceada: 2 H₂ + O₂ → 2 H₂O. A partir de 4 mol de H₂, com oxigênio em excesso, a quantidade de água formada é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação direta de proporção estequiométrica',
        seconds: 80,
        errors: ['ignorar os coeficientes'],
        correct: 2,
        options: [
          ['2 mol', 'Corresponde a metade do valor correto.', 'inverter a proporção'],
          ['8 mol', 'Corresponde a dobrar indevidamente a quantidade.', 'errar a proporção'],
          ['4 mol', 'A proporção é 2 H₂ para 2 H₂O, ou seja, 1:1. Assim, 4 mol de H₂ produzem 4 mol de H₂O.'],
          ['1 mol', 'Corresponde à quantidade de O₂ necessária dividida por dois.', 'responder outra grandeza'],
          ['16 mol', 'Não corresponde a nenhuma proporção da equação.', 'estimar sem calcular'],
        ],
        explanation: 'Os coeficientes 2 e 2 estabelecem proporção 1:1 entre H₂ e H₂O.',
      }),
      q({
        slug: 'q-esteq-2',
        stem: 'Na reação CaCO₃ → CaO + CO₂, a decomposição de 400 g de carbonato de cálcio produz, teoricamente, uma massa de óxido de cálcio igual a: (massas molares: CaCO₃ = 100 g/mol; CaO = 56 g/mol)',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'percurso massa → mol → mol → massa',
        seconds: 130,
        errors: ['aplicar a proporção diretamente sobre a massa'],
        correct: 3,
        options: [
          ['400 g', 'Ignora a liberação de CO₂, que carrega parte da massa.', 'supor conservação total no sólido'],
          ['100 g', 'Corresponde à massa molar do reagente, não ao resultado.', 'confundir dado com resposta'],
          ['176 g', 'Corresponde à massa de CO₂ liberada.', 'responder o outro produto'],
          ['224 g', 'mols de CaCO₃ = 400/100 = 4 mol. Proporção 1:1 → 4 mol de CaO. Massa = 4 × 56 = 224 g.'],
          ['56 g', 'Corresponde a 1 mol de CaO apenas.', 'esquecer a quantidade de mols'],
        ],
        explanation: 'Percorra sempre massa → mol → proporção → mol → massa. A verificação: 224 g de CaO + 176 g de CO₂ = 400 g.',
      }),
      q({
        slug: 'q-esteq-3',
        stem: 'Um experimento previa a produção teórica de 90 g de um produto. Foram obtidos 72 g. O rendimento da reação foi de:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de rendimento percentual',
        seconds: 100,
        errors: ['inverter a razão do rendimento'],
        correct: 1,
        options: [
          ['125%', 'Corresponde a dividir o teórico pelo obtido; rendimento não pode passar de 100%.', 'inverter a razão'],
          ['80%', 'Rendimento = obtido ÷ teórico × 100 = 72 ÷ 90 × 100 = 80%.'],
          ['18%', 'Corresponde à perda, e não ao rendimento.', 'responder o complementar em valor absoluto'],
          ['72%', 'Confunde a massa obtida com o percentual.', 'copiar o dado como resposta'],
          ['20%', 'É o percentual de perda, não o rendimento.', 'responder o complementar'],
        ],
        explanation: 'Rendimento compara o que se obteve com o que a estequiometria previa: sempre obtido sobre teórico.',
      }),
      q({
        slug: 'q-esteq-4',
        stem: 'Na reação N₂ + 3 H₂ → 2 NH₃, são colocados para reagir 2 mol de N₂ e 3 mol de H₂.\n\nSobre essa mistura, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'identificação do reagente limitante',
        seconds: 150,
        errors: ['escolher o limitante pela quantidade maior'],
        correct: 0,
        options: [
          ['O H₂ é o reagente limitante e formam-se 2 mol de NH₃, restando 1 mol de N₂ sem reagir.', 'Por N₂: 2 mol → 4 mol de NH₃. Por H₂: 3/3 = 1 → 2 mol de NH₃. O menor valor manda: 2 mol de NH₃, com 1 mol de N₂ sobrando.'],
          ['O N₂ é o limitante, pois está em menor quantidade em massa.', 'Massa não define o limitante; a razão entre mols e coeficientes define.', 'usar massa como critério'],
          ['Formam-se 4 mol de NH₃, pois há 2 mol de N₂ disponíveis.', 'Não há hidrogênio suficiente para consumir todo o N₂.', 'ignorar o limitante'],
          ['Nenhum reagente é limitante, pois ambos estão presentes.', 'Sempre que a proporção não é exata, um dos reagentes limita.', 'negar a existência do limitante'],
          ['Formam-se 3 mol de NH₃, correspondendo aos mols de H₂ disponíveis.', 'A proporção é 3 H₂ para 2 NH₃, e não 1:1.', 'ignorar os coeficientes'],
        ],
        explanation: 'Calcule o produto a partir de cada reagente e fique com o menor valor: esse reagente é o limitante.',
      }),
      q({
        slug: 'q-esteq-5',
        stem: 'Uma indústria calcula que precisa de 500 kg de um reagente para produzir determinada quantidade de produto. Na prática, o rendimento do processo é de 80% e parte do reagente contém 5% de impurezas.\n\nA análise correta dessa situação indica que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre estequiometria, pureza e rendimento em contexto industrial',
        seconds: 190,
        errors: ['considerar apenas um dos fatores de correção'],
        correct: 4,
        options: [
          ['Basta aumentar a quantidade de reagente em 20% para compensar o rendimento.', 'A correção do rendimento é necessária, mas não é a única: a pureza também reduz a massa efetivamente reagente.', 'considerar apenas um fator'],
          ['Basta aumentar a quantidade em 5% para compensar as impurezas.', 'Faltaria compensar a perda de rendimento.', 'considerar apenas um fator'],
          ['O rendimento e a pureza se cancelam, de modo que 500 kg são suficientes.', 'Os dois fatores atuam na mesma direção: ambos reduzem o produto obtido.', 'supor cancelamento inexistente'],
          ['Não é possível corrigir o cálculo, pois rendimento e pureza são imprevisíveis.', 'Ambos são medidos e usados rotineiramente no planejamento industrial.', 'tratar variáveis conhecidas como imprevisíveis'],
          ['É preciso corrigir o cálculo pelos dois fatores, o que eleva a necessidade para cerca de 658 kg do reagente comercial.', 'Primeiro corrige-se o rendimento: 500 ÷ 0,80 = 625 kg de reagente puro. Depois a pureza: 625 ÷ 0,95 ≈ 658 kg do material comercial. Os dois efeitos se multiplicam, não se cancelam.'],
        ],
        explanation: 'A questão integra estequiometria, pureza e rendimento — três correções que se acumulam no planejamento industrial.',
        strategy: 'Corrija sempre dividindo pelos fatores decimais, um de cada vez, e confira a ordem de grandeza no fim.',
      }),
      q({
        slug: 'q-esteq-rec-1',
        stem: 'A massa de 3 mol de água (massa molar 18 g/mol) é de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'conversão entre mol e massa',
        seconds: 60,
        recovery: true,
        errors: ['dividir em vez de multiplicar'],
        correct: 2,
        options: [
          ['6 g', 'Corresponde a dividir a massa molar pela quantidade de mols.', 'inverter a operação'],
          ['18 g', 'Corresponde a 1 mol apenas.', 'ignorar a quantidade'],
          ['54 g', 'Massa = mols × massa molar = 3 × 18 = 54 g.'],
          ['21 g', 'Corresponde a somar 3 e 18.', 'somar em vez de multiplicar'],
          ['0,17 g', 'Corresponde a dividir 3 por 18.', 'inverter a razão'],
        ],
        explanation: 'Para converter mol em massa, multiplique pela massa molar.',
      }),
    ],
  }),

  topic({
    slug: 'quimica-ambiental',
    name: 'Química ambiental',
    subject: 'quimica',
    area: 'ciencias-natureza',
    summary:
      'Entender a química por trás da poluição, do efeito estufa, da chuva ácida e do tratamento de água e resíduos.',
    difficulty: 'intermediate',
    minutes: 24,
    weight: 89,
    order: 4,
    prerequisites: ['transformacoes-quimicas'],
    related: ['ecologia-e-ciclos', 'meio-ambiente-e-sociedade'],
    skill: {
      slug: 'relacionar-processos-quimicos-e-impactos-ambientais',
      name: 'Relacionar processos químicos e impactos ambientais',
      description:
        'Explicar fenômenos ambientais por seus processos químicos e avaliar medidas de mitigação e tratamento.',
    },
    quick: `**Efeito estufa**
Gases como CO₂, CH₄ e N₂O absorvem radiação infravermelha emitida pela superfície e reemitem parte dela de volta. O efeito é **natural e necessário**; o problema é a **intensificação** pelo aumento das concentrações.

**Chuva ácida**
SO₂ e NOₓ reagem na atmosfera formando H₂SO₄ e HNO₃. A chuva normal já é levemente ácida (pH ≈ 5,6) pelo CO₂ dissolvido; abaixo disso, o problema é antrópico.

**Camada de ozônio**
Assunto distinto do efeito estufa. CFCs liberam cloro que destrói O₃ na estratosfera. O Protocolo de Montreal reduziu a produção desses gases — e a camada vem se recuperando.

**Tratamento de água**
coagulação → floculação → decantação → filtração → desinfecção (cloro) → correção de pH.

**Resíduos**
A ordem de prioridade é: **reduzir → reutilizar → reciclar → tratar → dispor**. Aterro sanitário tem impermeabilização, drenagem de chorume e captação de gases; lixão não tem nada disso.`,
    explanation: {
      title: 'A química por trás dos problemas ambientais mais cobrados',
      body: `### 1. Efeito estufa: não confundir com o buraco de ozônio

São fenômenos diferentes, com gases, altitudes e soluções distintas:

| | Efeito estufa intensificado | Destruição do ozônio |
| --- | --- | --- |
| Gases | CO₂, CH₄, N₂O | CFCs, halons |
| Onde | troposfera | estratosfera |
| Efeito | aquecimento global | mais radiação UV na superfície |
| Resposta | transição energética | Protocolo de Montreal |

Trocar um pelo outro é o erro mais comum do tópico.

### 2. Por que o metano importa tanto

O CH₄ tem potencial de aquecimento muito maior que o CO₂ por molécula, embora permaneça menos tempo na atmosfera. Ele vem de aterros, pecuária, arrozais e vazamentos de gás natural.

Consequência prática: reduzir emissões de metano produz efeito **mais rápido** sobre o clima do que reduzir CO₂ na mesma proporção — ainda que o CO₂ siga sendo o problema principal no longo prazo.

### 3. Chuva ácida, passo a passo

1. Queima de combustíveis com enxofre → SO₂
2. Altas temperaturas em motores → NOₓ
3. Na atmosfera, com água e oxigênio → H₂SO₄ e HNO₃
4. Precipitação com pH abaixo do normal

**Efeitos:** acidificação de solos e lagos, corrosão de estruturas metálicas e de monumentos de carbonato (mármore, calcário).

**Mitigação:** dessulfurização de combustíveis, filtros e catalisadores.

### 4. Tratamento de água e de esgoto

O tratamento de água potável remove partículas, microrganismos e corrige o pH. O tratamento de **esgoto** é outro processo: remove matéria orgânica antes do lançamento, evitando a queda de oxigênio dissolvido no corpo d'água receptor.

Sem tratamento de esgoto, a eutrofização e a mortandade de peixes se tornam prováveis.

### 5. Resíduos e ciclo de vida

Reciclar é importante, mas está em terceiro lugar na hierarquia — depois de **reduzir** e **reutilizar**. A razão é química e energética: reciclar exige coleta, transporte, separação e reprocessamento, todos com custo energético.

Materiais diferem muito: alumínio recicla bem e economiza muita energia; plásticos misturados e embalagens multicamada são difíceis de reciclar.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — separar dois fenômenos',
        body: `**Afirmação para avaliar:** "O aumento do buraco na camada de ozônio é a causa do aquecimento global."

**Por que está errada:**

1. O aquecimento global decorre da intensificação do efeito estufa na **troposfera**, por gases como CO₂ e CH₄.
2. A destruição do ozônio ocorre na **estratosfera**, por ação de cloro proveniente de CFCs.
3. O efeito principal da perda de ozônio é o aumento da radiação **ultravioleta** que chega à superfície — o que causa danos à saúde e aos ecossistemas, mas não é o mecanismo do aquecimento global.

**Observação que enriquece a resposta:** os CFCs também são gases de efeito estufa potentes, o que cria alguma sobreposição. Mas os fenômenos, os locais e as políticas de resposta continuam distintos.`,
      },
      {
        title: 'Exemplo resolvido 2 — por que o monumento corroeu',
        body: `**Situação:** estátuas de mármore em uma cidade industrial apresentam perda de detalhes e superfície corroída ao longo de décadas.

**Química envolvida:**

1. Queima de combustíveis com enxofre libera SO₂.
2. Na atmosfera, o SO₂ é oxidado e reage com água formando H₂SO₄.
3. O ácido reage com o carbonato de cálcio do mármore (CaCO₃), formando sulfato de cálcio, que é mais solúvel e se desprende.

**Resultado:** a superfície é literalmente dissolvida aos poucos.

**Medidas de mitigação:** redução do teor de enxofre nos combustíveis, filtros em chaminés industriais e, no curto prazo, tratamentos protetivos na superfície das peças.`,
      },
    ],
    mistakes: `**1. Confundir efeito estufa com destruição da camada de ozônio.**
Gases, altitudes, efeitos e acordos internacionais são diferentes.

**2. Dizer que o efeito estufa é, em si, um problema.**
Sem ele, a temperatura média do planeta seria dezenas de graus menor. O problema é a intensificação.

**3. Tratar reciclagem como primeira solução para resíduos.**
A hierarquia começa em reduzir e reutilizar; reciclar vem depois, e tem custo energético próprio.`,
    selfCheck: [
      'Quais são as diferenças entre o efeito estufa intensificado e a destruição da camada de ozônio?',
      'Como o SO₂ emitido por uma indústria acaba corroendo um monumento de mármore?',
      'Por que reduzir e reutilizar vêm antes de reciclar na hierarquia de resíduos?',
    ],
    questions: [
      q({
        slug: 'q-qamb-1',
        stem: 'A intensificação do efeito estufa observada nas últimas décadas está associada principalmente ao aumento da concentração atmosférica de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação dos gases envolvidos',
        seconds: 70,
        errors: ['confundir com gases da camada de ozônio'],
        correct: 3,
        options: [
          ['Gás nitrogênio (N₂) e gás oxigênio (O₂).', 'São os gases mais abundantes da atmosfera e não absorvem radiação infravermelha de forma significativa.', 'confundir abundância com efeito estufa'],
          ['Clorofluorcarbonos, responsáveis pela destruição do ozônio estratosférico.', 'CFCs afetam a camada de ozônio; sua contribuição não é o principal fator do aquecimento observado.', 'trocar os dois fenômenos'],
          ['Ozônio estratosférico, que retém o calor na superfície.', 'O ozônio estratosférico filtra radiação ultravioleta e não é o principal gás de efeito estufa.', 'confundir os fenômenos'],
          ['Dióxido de carbono, metano e óxido nitroso.', 'Esses gases absorvem e reemitem radiação infravermelha na troposfera, e suas concentrações aumentaram com a queima de combustíveis fósseis, a agropecuária e os resíduos.'],
          ['Vapor de água exclusivamente, por ser o gás mais abundante da atmosfera.', 'O vapor d\'água responde à temperatura, funcionando como amplificador; o forçamento inicial vem dos gases emitidos por atividade humana.', 'inverter causa e efeito'],
        ],
        explanation: 'CO₂, CH₄ e N₂O são os principais gases cujas concentrações aumentaram por ação humana e que intensificam o efeito estufa.',
      }),
      q({
        slug: 'q-qamb-2',
        stem: 'Em uma região com muitas indústrias que queimam combustíveis com alto teor de enxofre, observa-se acidificação de lagos e corrosão de monumentos de mármore.\n\nA explicação química para esses efeitos é:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação do processo de formação da chuva ácida',
        seconds: 120,
        errors: ['atribuir os efeitos ao CO₂'],
        correct: 1,
        options: [
          ['O CO₂ liberado na queima forma ácido carbônico, que dissolve o mármore rapidamente.', 'O CO₂ contribui para a acidez natural da chuva, mas não explica a acidificação intensa nem a corrosão acelerada descrita.', 'atribuir ao gás errado'],
          ['O SO₂ liberado é oxidado e reage com a água atmosférica formando ácido sulfúrico, que acidifica os lagos e reage com o carbonato de cálcio do mármore.', 'A queima de combustíveis com enxofre libera SO₂; na atmosfera ele forma H₂SO₄, que precipita, acidifica corpos d\'água e reage com o CaCO₃ das estruturas de mármore.'],
          ['O ozônio troposférico se decompõe e forma ácidos que corroem estruturas.', 'O ozônio troposférico é um poluente relevante, mas não é o mecanismo da chuva ácida descrita.', 'trocar o poluente'],
          ['Os CFCs liberados reagem com a água da chuva formando ácido clorídrico.', 'CFCs atuam na estratosfera sobre o ozônio, e não são a causa da chuva ácida.', 'misturar os fenômenos'],
          ['O nitrogênio atmosférico se dissolve na chuva, tornando-a ácida.', 'O N₂ é praticamente inerte nessas condições; são os óxidos de nitrogênio, formados em altas temperaturas, que contribuem.', 'confundir N₂ com NOₓ'],
        ],
        explanation: 'Chuva ácida resulta principalmente de SO₂ e NOₓ, que formam ácido sulfúrico e ácido nítrico na atmosfera.',
      }),
      q({
        slug: 'q-qamb-3',
        stem: 'A tabela mostra o pH da água da chuva medido em quatro pontos de uma região:\n\n| Ponto | pH |\n| --- | --- |\n| Rural distante | 5,6 |\n| Periferia urbana | 5,1 |\n| Centro industrial | 4,2 |\n| Área portuária | 4,5 |\n\nConsiderando que a chuva não poluída tem pH em torno de 5,6, a leitura correta dos dados é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação de dados de pH em escala logarítmica',
        seconds: 140,
        errors: ['ignorar que a escala de pH é logarítmica'],
        correct: 2,
        options: [
          ['Os quatro pontos apresentam chuva ácida de origem antrópica.', 'O ponto rural está no valor de referência da chuva não poluída.', 'incluir o valor de referência'],
          ['A diferença entre 5,6 e 4,2 é pequena, pois corresponde a pouco mais de um ponto na escala.', 'A escala é logarítmica: essa diferença corresponde a cerca de 25 vezes mais íons H⁺.', 'ler a escala como linear'],
          ['O centro industrial apresenta a chuva mais ácida, com concentração de íons H⁺ cerca de 25 vezes maior que a do ponto rural.', 'Cada unidade de pH corresponde a um fator de dez. A diferença de 1,4 unidade entre 5,6 e 4,2 equivale a 10^1,4 ≈ 25 vezes mais íons H⁺.'],
          ['A área portuária tem chuva alcalina, por estar próxima ao mar.', 'pH 4,5 é ácido, bem abaixo do neutro.', 'confundir ácido com alcalino'],
          ['Os dados não permitem comparação, pois o pH varia naturalmente.', 'A variação natural é conhecida, e é justamente o que permite identificar o desvio antrópico.', 'descartar dado comparável'],
        ],
        explanation: 'A escala de pH é logarítmica: uma diferença de 1,4 unidade significa cerca de 25 vezes mais íons H⁺.',
      }),
      q({
        slug: 'q-qamb-4',
        stem: 'Compare dois destinos para resíduos sólidos urbanos:\n\nI. Lixão a céu aberto, sem impermeabilização do solo nem captação de gases.\nII. Aterro sanitário com impermeabilização, drenagem e tratamento de chorume e captação de biogás.\n\nSobre os impactos ambientais de cada um:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre formas de disposição de resíduos',
        seconds: 150,
        errors: ['tratar aterro sanitário como solução sem impacto'],
        correct: 4,
        options: [
          ['Os dois produzem os mesmos impactos, já que ambos acumulam resíduos no solo.', 'A impermeabilização e o tratamento do chorume mudam radicalmente o impacto sobre solo e água.', 'ignorar as diferenças técnicas'],
          ['O aterro sanitário elimina completamente os impactos ambientais dos resíduos.', 'Ele reduz e controla impactos, mas ocupa área, gera emissões residuais e tem vida útil limitada.', 'supor solução sem impacto'],
          ['O lixão é preferível, pois permite a decomposição natural dos resíduos.', 'A decomposição em lixão contamina solo e água e libera metano sem controle.', 'confundir ausência de estrutura com processo natural benéfico'],
          ['A diferença entre eles é apenas estética e de organização do espaço.', 'A diferença é de contaminação de solo, água e ar.', 'minimizar impactos técnicos'],
          ['O lixão contamina solo e águas subterrâneas pelo chorume e libera metano sem controle; o aterro reduz esses impactos, mas ainda ocupa área, tem vida útil limitada e não substitui a redução na geração de resíduos.', 'A comparação correta reconhece a superioridade técnica do aterro sanitário sem tratá-lo como solução definitiva: a hierarquia de resíduos começa em reduzir e reutilizar.'],
        ],
        explanation: 'Aterro sanitário é muito melhor que lixão, mas continua sendo disposição final — o último degrau da hierarquia de resíduos.',
      }),
      q({
        slug: 'q-qamb-5',
        stem: 'Um município avalia trocar a frota de ônibus a diesel por veículos elétricos, com energia proveniente majoritariamente de hidrelétricas.\n\nA avaliação ambiental mais completa dessa medida considera que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre química da combustão, matriz energética e análise de ciclo de vida',
        seconds: 190,
        errors: ['avaliar apenas as emissões locais', 'ignorar a matriz energética e as baterias'],
        correct: 0,
        options: [
          ['A troca elimina as emissões locais de material particulado e óxidos de nitrogênio, com ganho direto para a saúde urbana, mas a avaliação completa exige considerar a matriz energética, a produção e o descarte das baterias e os impactos das próprias hidrelétricas.', 'A queima de diesel emite material particulado e NOₓ, que afetam diretamente a saúde nas vias urbanas. A eletrificação remove essa emissão no ponto de uso; o balanço final depende de como a eletricidade é gerada e do ciclo de vida das baterias.'],
          ['A medida não traz benefício algum, pois a energia elétrica também precisa ser gerada.', 'Com matriz predominantemente hidrelétrica, o balanço de emissões é bastante favorável.', 'anular o ganho pela existência de geração'],
          ['A medida elimina completamente os impactos ambientais do transporte público.', 'Produção de veículos, baterias e infraestrutura mantêm impactos relevantes.', 'supor impacto zero'],
          ['O benefício é apenas econômico, sem efeito ambiental relevante.', 'A redução de material particulado e NOₓ tem efeito ambiental e sanitário direto.', 'negar o efeito ambiental'],
          ['A análise deve considerar apenas as emissões de CO₂, já que são as mais relevantes para o clima.', 'Material particulado e NOₓ têm efeito imediato sobre a saúde e não podem ser ignorados na análise urbana.', 'reduzir a análise a um poluente'],
        ],
        explanation: 'A questão integra química da combustão, matriz energética e análise de ciclo de vida — o padrão de avaliação ambiental que evita tanto o entusiasmo acrítico quanto a negação do benefício.',
      }),
      q({
        slug: 'q-qamb-rec-1',
        stem: 'Na estação de tratamento de água, a etapa de desinfecção tem como objetivo principal:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação da função de uma etapa do tratamento',
        seconds: 70,
        recovery: true,
        errors: ['confundir desinfecção com filtração'],
        correct: 2,
        options: [
          ['Remover partículas sólidas em suspensão.', 'Essa é a função das etapas de coagulação, floculação, decantação e filtração.', 'trocar a etapa'],
          ['Corrigir o pH da água tratada.', 'A correção de pH é uma etapa distinta, feita ao final do processo.', 'trocar a etapa'],
          ['Eliminar microrganismos patogênicos presentes na água.', 'A desinfecção, geralmente com cloro, inativa bactérias, vírus e protozoários que causam doenças.'],
          ['Retirar sais dissolvidos da água.', 'A remoção de sais dissolvidos exige processos como osmose reversa, que não fazem parte do tratamento convencional.', 'atribuir função de outro processo'],
          ['Aumentar a temperatura da água antes da distribuição.', 'Não há aquecimento no tratamento convencional de água potável.', 'inventar etapa inexistente'],
        ],
        explanation: 'Desinfecção elimina microrganismos causadores de doenças; as etapas anteriores cuidam das partículas em suspensão.',
      }),
    ],
  }),
];

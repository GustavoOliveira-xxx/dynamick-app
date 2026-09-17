import { question as q, topic } from './leva8-factory.js';

export const NATUREZA_TOPICS_LEVA_3 = [
  topic({
    slug: 'funcoes-organicas',
    name: 'Funções orgânicas',
    subject: 'quimica',
    area: 'ciencias-natureza',
    summary:
      'Reconhecer grupos funcionais em fórmulas estruturais, nomear compostos pelas regras da IUPAC e prever solubilidade, acidez e comportamento a partir da função presente.',
    difficulty: 'intermediate',
    minutes: 28,
    weight: 92,
    order: 5,
    prerequisites: ['transformacoes-quimicas'],
    related: ['solucoes', 'quimica-ambiental'],
    skill: {
      slug: 'identificar-grupos-funcionais-e-prever-propriedades',
      name: 'Identificar grupos funcionais e prever propriedades',
      description:
        'Localizar o grupo funcional em uma estrutura, nomear o composto e deduzir polaridade, solubilidade, acidez e aplicação a partir da função orgânica.',
    },
    quick: `**O que é uma função orgânica**

Um **grupo funcional** é um arranjo fixo de átomos que se repete em várias moléculas e manda nas propriedades delas. Quem tem o mesmo grupo funcional pertence à mesma **função orgânica** e se comporta de modo parecido.

**As funções que mais aparecem no ENEM**

| Função | Grupo funcional | Terminação | Exemplo |
| --- | --- | --- | --- |
| Hidrocarboneto | só C e H | -o | propano |
| Álcool | —OH em carbono saturado | -ol | etanol |
| Fenol | —OH ligado ao anel benzênico | — | fenol |
| Aldeído | —CHO (na ponta) | -al | etanal |
| Cetona | C=O entre carbonos | -ona | propanona |
| Ácido carboxílico | —COOH | -oico | ácido etanoico |
| Éster | —COO— | -oato de -ila | etanoato de etila |
| Éter | —O— entre carbonos | -óxi- | metóxi-etano |
| Amina | —NH₂ / —NH— / —N— | -amina | etilamina |
| Amida | —CONH₂ | -amida | etanamida |

**Como nomear em três passos**

1. **Quantos carbonos** na cadeia principal: 1 met- · 2 et- · 3 prop- · 4 but- · 5 pent- · 6 hex-.
2. **Que tipo de ligação** entre eles: só simples **-an-** · uma dupla **-en-** · uma tripla **-in-**.
3. **Qual a função**: a terminação da tabela acima.

Etanol = et (2 C) + an (só simples) + ol (álcool).

**A regra que resolve metade das questões**

**Semelhante dissolve semelhante.** —OH, —COOH, —NH₂ fazem ligação de hidrogênio → parte **polar**, "gosta" de água. A cadeia carbônica é **apolar**, "gosta" de gordura e óleo. Quem manda é o lado maior: etanol (2 C) mistura com água; álcool com 12 C, não.`,
    explanation: {
      title: 'Do grupo funcional ao comportamento da substância',
      body: `### 1. Por que o grupo funcional importa mais do que o tamanho

Butano (C₄H₁₀) ferve a −0,5 °C. Butan-1-ol (C₄H₉OH) ferve a 118 °C. Praticamente a mesma massa, mais de 100 graus de diferença — e a única mudança é um —OH.

A razão: o —OH permite **ligação de hidrogênio** entre as moléculas. Para ferver, é preciso separá-las, e essa interação é forte. O butano só tem forças de dispersão, muito fracas.

**Ordem de força das interações** (e, portanto, dos pontos de ebulição, comparando massas parecidas):

ligação de hidrogênio (ácidos > álcoois/aminas) > dipolo-dipolo (aldeídos, cetonas, ésteres) > dispersão (hidrocarbonetos)

Ácidos carboxílicos ficam no topo porque formam **dímeros**: duas moléculas se ligam por duas pontes de hidrogênio ao mesmo tempo.

### 2. Reconhecer a função olhando a estrutura

O erro mais comum do aluno é confundir funções que têm o mesmo C=O. Um roteiro que não falha:

**Achou C=O? Olhe quem está ligado ao carbono da carbonila.**

- ligado a **H e a um carbono** → **aldeído** (—CHO, sempre na ponta da cadeia)
- ligado a **dois carbonos** → **cetona** (C=O no meio)
- ligado a **OH** → **ácido carboxílico** (—COOH)
- ligado a **O—C** → **éster** (—COO—)
- ligado a **N** → **amida** (—CONH₂)

**Não achou C=O, mas achou —OH?**

- —OH em carbono de cadeia comum → **álcool**
- —OH preso direto no anel benzênico → **fenol** (função diferente, propriedades diferentes)

**Nem C=O nem OH, mas tem O no meio da cadeia** → **éter**. **Tem N sem C=O** → **amina**.

### 3. Acidez: quem cede H⁺ com mais facilidade

Ordem prática que o ENEM cobra:

**ácido carboxílico > fenol > água > álcool**

O ácido carboxílico é o mais ácido porque, ao perder o H⁺, a carga negativa fica **espalhada entre os dois oxigênios** (ressonância) — o ânion resultante é estável, então a saída do H⁺ é favorecida. No fenol, a carga se espalha pelo anel: estabiliza, mas menos. No álcool a carga fica localizada num único oxigênio: nada estabiliza, e por isso o álcool praticamente não se comporta como ácido em água.

É por isso que vinagre (ácido etanoico) muda a cor do indicador e etanol não.

### 4. Isomeria: mesma fórmula, substâncias diferentes

Duas substâncias com a **mesma fórmula molecular** e estruturas diferentes são **isômeros**. Vale a pena reconhecer três casos:

- **De cadeia:** butano (linear) e metilpropano (ramificado) — ambos C₄H₁₀.
- **De posição:** propan-1-ol e propan-2-ol — o —OH muda de carbono.
- **De função:** etanol (álcool) e metóxi-metano (éter) — ambos C₂H₆O, funções completamente diferentes.

O último é o mais cobrado, porque mostra que a fórmula molecular sozinha não diz o que a substância faz.

### 5. Onde isso aparece na vida real (o jeito ENEM de perguntar)

O ENEM raramente pede a nomenclatura pura. Ele dá um rótulo, uma bula, uma reportagem, e pergunta o que se conclui:

- **Sabão:** sal de ácido carboxílico de cadeia longa. Cabeça —COO⁻ polar (água) e cauda apolar (gordura) — por isso limpa.
- **Biodiesel:** éster obtido pela reação de óleo vegetal com metanol ou etanol (transesterificação).
- **Aroma de frutas:** ésteres de cadeia curta.
- **Conservantes e antioxidantes:** frequentemente fenóis.
- **Anestésicos, analgésicos, corantes:** quase sempre contêm amina ou amida.
- **Álcool em gel:** etanol, miscível em água pela ligação de hidrogênio.

Se a questão trouxer uma estrutura e falar em "solúvel em água", "responsável pelo cheiro" ou "caráter ácido", ela está perguntando pelo grupo funcional, mesmo sem usar essa palavra.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — identificar a função e prever a solubilidade',
        body: `**Situação:** um rótulo informa que o princípio ativo tem fórmula estrutural CH₃—CH₂—CH₂—COOH e é solúvel em água. Uma segunda substância, CH₃—(CH₂)₁₆—COOH, é praticamente insolúvel. Explique.

**Passo 1 — identificar a função:** as duas têm —COOH → ambas são **ácidos carboxílicos**. A função é a mesma.

**Passo 2 — nomear:** a primeira tem 4 carbonos, só ligações simples → **ácido butanoico**. A segunda tem 18 carbonos → ácido octadecanoico (esteárico).

**Passo 3 — separar as duas partes da molécula:** o —COOH é polar e faz ligação de hidrogênio com a água. A cadeia carbônica é apolar.

**Passo 4 — comparar as proporções:** no ácido butanoico, 3 carbonos apolares para 1 grupo polar — o —COOH ainda "puxa" a molécula para a água. No esteárico, 17 carbonos apolares para o mesmo único —COOH — a parte apolar domina.

**Resposta:** a função é a mesma; o que muda é a **razão entre a parte apolar e a parte polar**. Quanto maior a cadeia, menor a solubilidade em água.

**Erro clássico:** dizer "é insolúvel porque não tem grupo polar". Tem — só não é suficiente para uma cadeia de 18 carbonos.`,
      },
      {
        title: 'Exemplo resolvido 2 — aldeído ou cetona, e por que isso muda o resultado',
        body: `**Situação:** duas substâncias têm fórmula molecular C₃H₆O. A estrutura I é CH₃—CH₂—CHO e a estrutura II é CH₃—CO—CH₃. Classifique-as e diga o que são entre si.

**Passo 1 — achar a carbonila:** as duas têm C=O.

**Passo 2 — olhar os vizinhos do carbono da carbonila:**
- Em **I**, esse carbono está ligado a um **H** e a um carbono → é o carbono da ponta → **aldeído**.
- Em **II**, esse carbono está ligado a **dois carbonos** → está no meio → **cetona**.

**Passo 3 — nomear:** I tem 3 C, só simples, aldeído → **propanal**. II tem 3 C, cetona → **propanona** (a acetona).

**Passo 4 — relacionar:** mesma fórmula molecular (C₃H₆O), funções diferentes → são **isômeros de função**.

**Consequência prática:** o aldeído se oxida com facilidade a ácido carboxílico (propanal → ácido propanoico); a cetona não faz essa oxidação em condições brandas, porque não tem o H preso ao carbono da carbonila. É essa diferença, e não a fórmula, que decide o comportamento no laboratório.`,
      },
    ],
    mistakes: `**1. Confundir aldeído com cetona.**
Os dois têm C=O. O que decide é a **posição**: aldeído sempre na ponta (tem H no carbono da carbonila), cetona sempre entre dois carbonos. Antes de responder, aponte o carbono da carbonila e conte quem está ligado a ele.

**2. Tratar fenol como álcool porque "tem OH".**
—OH ligado direto ao anel benzênico é **fenol**, e o fenol é bem mais ácido que qualquer álcool. Chamar de álcool leva a errar toda alternativa sobre acidez.

**3. Achar que molécula com grupo polar é sempre solúvel em água.**
A solubilidade é uma disputa entre a parte polar e a cadeia apolar. Até 3 ou 4 carbonos o grupo polar costuma vencer; daí em diante, não. É por isso que etanol mistura com água e o óleo de cozinha não.`,
    selfCheck: [
      'Olhando só a estrutura, que pergunta você faz primeiro para separar aldeído de cetona?',
      'Por que o ácido carboxílico é mais ácido que o álcool, se os dois têm oxigênio e hidrogênio?',
      'Explique com suas palavras por que etanol mistura com água e um álcool de 12 carbonos não.',
      'O que são isômeros de função e por que eles mostram que a fórmula molecular não basta?',
      'Que grupo funcional o sabão tem, e como isso explica ele conseguir limpar gordura?',
    ],
    questions: [
      q({
        slug: 'q-forg-1',
        stem: 'Em uma fórmula estrutural, o grupo funcional —COOH caracteriza a função:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento de grupo funcional',
        seconds: 70,
        errors: ['confundir a carboxila com outras funções que contêm C=O'],
        correct: 1,
        options: [
          ['Álcool.', 'Álcool tem —OH ligado a carbono saturado, sem a carbonila ao lado.', 'ignorar o C=O da carboxila'],
          ['Ácido carboxílico.', 'A carboxila (—COOH) reúne carbonila e hidroxila no mesmo carbono e define a função ácido carboxílico.'],
          ['Cetona.', 'Na cetona o C=O aparece entre dois carbonos, sem —OH ligado a ele.', 'ver só o C=O'],
          ['Éter.', 'O éter tem apenas um oxigênio entre dois carbonos, sem carbonila.', 'trocar a função'],
          ['Amina.', 'A amina é caracterizada pelo nitrogênio, ausente na carboxila.', 'trocar o heteroátomo'],
        ],
        explanation: 'O grupo —COOH (carboxila) é a marca do ácido carboxílico, como no ácido etanoico do vinagre.',
      }),
      q({
        slug: 'q-forg-2',
        stem: 'O composto CH₃—CH₂—CH₂—OH, muito usado como solvente, recebe o nome oficial de:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação das regras de nomenclatura',
        seconds: 90,
        errors: ['contar errado os carbonos da cadeia principal'],
        correct: 3,
        options: [
          ['Propanona.', 'A terminação -ona indica cetona, mas o composto apresenta —OH, não C=O.', 'trocar a terminação da função'],
          ['Propanal.', 'A terminação -al indica aldeído; não há grupo —CHO na estrutura.', 'trocar a terminação da função'],
          ['Etanol.', 'Et- corresponde a dois carbonos, e a cadeia mostrada tem três.', 'contar errado os carbonos'],
          ['Propan-1-ol.', 'Três carbonos (prop-), apenas ligações simples (-an-), função álcool (-ol), com a hidroxila no carbono 1.'],
          ['Ácido propanoico.', 'O ácido exigiria —COOH; aqui só há —OH.', 'confundir hidroxila com carboxila'],
        ],
        explanation: 'Três carbonos → prop-; só ligações simples → -an-; —OH em carbono saturado → -ol, com a posição 1 indicada.',
        strategy: 'Conte os carbonos, veja o tipo de ligação e só então escolha a terminação da função.',
      }),
      q({
        slug: 'q-forg-3',
        stem: 'Uma reportagem informa que o aroma característico de certas frutas se deve a substâncias formadas na reação entre um ácido carboxílico e um álcool, com eliminação de água. Essas substâncias pertencem à função:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de texto e associação com a função orgânica correspondente',
        seconds: 110,
        errors: ['associar aroma a qualquer composto oxigenado'],
        correct: 2,
        options: [
          ['Amida.', 'A amida se forma com nitrogênio, ausente na reação descrita.', 'ignorar os reagentes citados'],
          ['Cetona.', 'A cetona não resulta da união de ácido com álcool.', 'escolher função sem checar a reação'],
          ['Éster.', 'A esterificação une ácido carboxílico e álcool, liberando água e formando o grupo —COO—, típico dos aromas de frutas.'],
          ['Fenol.', 'O fenol exige —OH ligado ao anel benzênico, o que o texto não descreve.', 'trocar a função'],
          ['Éter.', 'O éter tem oxigênio entre dois carbonos, sem carbonila, e não vem dessa reação.', 'confundir éter com éster'],
        ],
        explanation: 'Ácido carboxílico + álcool, com saída de água, é esterificação: o produto é um éster, grupo responsável por muitos aromas frutais.',
      }),
      q({
        slug: 'q-forg-4',
        stem: 'Comparando butano (C₄H₁₀) e butan-1-ol (C₄H₁₀O), de massas molares próximas, verifica-se que o butan-1-ol tem ponto de ebulição muito mais alto. A explicação está em:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre interações intermoleculares',
        seconds: 135,
        errors: ['atribuir a diferença apenas à massa molar'],
        correct: 4,
        options: [
          ['Massa molar muito maior do álcool.', 'As massas molares são próximas; a diferença de ebulição é grande demais para vir daí.', 'explicar tudo pela massa'],
          ['Presença de ligações duplas no álcool.', 'Butan-1-ol tem apenas ligações simples.', 'inventar insaturação'],
          ['Maior número de carbonos no álcool.', 'Os dois têm quatro carbonos.', 'não comparar as estruturas'],
          ['Caráter iônico do álcool.', 'Álcoois são compostos moleculares, não iônicos.', 'atribuir ligação iônica'],
          ['Ligações de hidrogênio entre as moléculas do álcool, ausentes no butano.', 'O grupo —OH permite ligação de hidrogênio, interação muito mais forte que as forças de dispersão do hidrocarboneto; separar as moléculas exige mais energia.'],
        ],
        explanation: 'O grupo funcional, e não a massa, define a interação dominante: —OH faz ligação de hidrogênio; o hidrocarboneto só conta com dispersão.',
        strategy: 'Com massas parecidas, compare as interações intermoleculares antes de qualquer outra hipótese.',
      }),
      q({
        slug: 'q-forg-5',
        stem: 'Uma molécula de sabão pode ser representada por CH₃—(CH₂)₁₆—COO⁻Na⁺. Sobre sua ação na remoção de gordura de um tecido, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre grupo funcional, polaridade e aplicação cotidiana',
        seconds: 165,
        errors: ['tratar a molécula como se tivesse apenas um comportamento'],
        correct: 0,
        options: [
          ['A cadeia carbônica apolar interage com a gordura e a extremidade —COO⁻ interage com a água, permitindo que a sujeira seja arrastada na lavagem.', 'A molécula é anfifílica: uma ponta se dissolve no óleo e a outra na água, formando micelas que dispersam a gordura no meio aquoso.'],
          ['O sabão reage quimicamente com a gordura, transformando-a em água e gás carbônico.', 'Não há combustão nem degradação completa da gordura durante a lavagem.', 'supor reação inexistente'],
          ['A remoção ocorre porque toda a molécula de sabão é polar e dissolve qualquer substância.', 'A maior parte da molécula é apolar; é justamente essa dualidade que explica a limpeza.', 'ignorar a parte apolar'],
          ['O sabão apenas aumenta a temperatura da água, e é o calor que remove a gordura.', 'A ação do sabão é de natureza interfacial, não térmica.', 'atribuir o efeito ao calor'],
          ['A gordura é removida por evaporação provocada pelo sódio presente na molécula.', 'O sódio é apenas o contra-íon do sal; gordura não evapora na lavagem.', 'atribuir o papel ao íon errado'],
        ],
        explanation: 'O sabão é um sal de ácido carboxílico de cadeia longa: cauda apolar para a gordura, cabeça iônica para a água. A dupla afinidade é o que permite a limpeza.',
      }),
      q({
        slug: 'q-forg-rec-1',
        stem: 'Um composto orgânico que apresenta apenas átomos de carbono e hidrogênio em sua estrutura é classificado como:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'classificação a partir da composição elementar',
        seconds: 60,
        recovery: true,
        errors: ['procurar grupo funcional onde só há C e H'],
        correct: 2,
        options: [
          ['Álcool.', 'Álcool exige a presença de oxigênio no grupo —OH.', 'ignorar a composição'],
          ['Amina.', 'Amina exige nitrogênio na estrutura.', 'ignorar a composição'],
          ['Hidrocarboneto.', 'Hidrocarbonetos são formados exclusivamente por carbono e hidrogênio, como o metano e o propano do gás de cozinha.'],
          ['Éster.', 'O éster contém oxigênio no grupo —COO—.', 'ignorar a composição'],
          ['Ácido carboxílico.', 'O ácido carboxílico contém oxigênio no grupo —COOH.', 'ignorar a composição'],
        ],
        explanation: 'Só carbono e hidrogênio: hidrocarboneto. Qualquer outra função exige pelo menos um heteroátomo (O, N, S, halogênio).',
      }),
    ],
  }),

  topic({
    slug: 'ondas-sonoras',
    name: 'Ondas sonoras',
    subject: 'fisica',
    area: 'ciencias-natureza',
    summary:
      'Entender o som como onda mecânica longitudinal: relacionar frequência, comprimento de onda e velocidade, distinguir altura, intensidade e timbre e explicar eco, ressonância e efeito Doppler.',
    difficulty: 'intermediate',
    minutes: 28,
    weight: 90,
    order: 4,
    prerequisites: ['mecanica'],
    related: ['energia-e-transformacoes', 'eletricidade'],
    skill: {
      slug: 'relacionar-grandezas-e-fenomenos-das-ondas-sonoras',
      name: 'Relacionar grandezas e fenômenos das ondas sonoras',
      description:
        'Aplicar v = λf, interpretar as qualidades do som e explicar reflexão, ressonância, interferência e efeito Doppler em situações concretas.',
    },
    quick: `**O som é uma onda mecânica longitudinal**

- **Mecânica:** precisa de um meio material. **No vácuo não há som** — é por isso que uma explosão no espaço seria silenciosa.
- **Longitudinal:** as partículas do meio vibram **na mesma direção** em que a onda caminha, formando compressões e rarefações. (A onda numa corda é transversal; o som, não.)
- O que viaja é **energia**, não matéria. O ar não vai da boca até o ouvido.

**A equação que resolve quase tudo**

$$v = \\lambda \\cdot f$$

- **v** = velocidade (m/s) — depende **só do meio**
- **λ** = comprimento de onda (m)
- **f** = frequência (Hz) — depende **só da fonte**

**Regra de ouro:** ao mudar de meio, **a frequência não muda**; quem muda é a velocidade, e o λ acompanha.

**Velocidade do som (aproximada)**

| Meio | v (m/s) |
| --- | --- |
| Ar a 20 °C | 340 |
| Água | 1 500 |
| Aço | 5 000 |

Mais rápido em sólidos do que em líquidos, e em líquidos do que em gases — quanto mais ligadas as partículas, mais rápido o "empurrão" se transmite. No ar, a velocidade **cresce com a temperatura**.

**As três qualidades do som**

| Qualidade | Depende de | Percebemos como |
| --- | --- | --- |
| **Altura** | frequência | grave (f baixa) ou agudo (f alta) |
| **Intensidade** | amplitude | fraco ou forte (volume, em dB) |
| **Timbre** | forma da onda / harmônicos | que instrumento ou voz é |

**Audível para o ser humano:** 20 Hz a 20 000 Hz. Abaixo, infrassom; acima, ultrassom (usado em ecografia e sonar).`,
    explanation: {
      title: 'Como o som se propaga e por que ele muda pelo caminho',
      body: `### 1. Grave/agudo é frequência; alto/baixo de volume é amplitude

Essa confusão custa questão todo ano, porque a linguagem do dia a dia atrapalha. Na física:

- **Som agudo** = frequência **alta**. **Som grave** = frequência **baixa**. A palavra técnica para isso é **altura**.
- **Som "alto" no sentido de volume** = **intensidade** grande = **amplitude** grande.

Então um sussurro agudo é um som **de altura alta e intensidade baixa**. Se a alternativa disser "aumentar a frequência deixa o som mais forte", está errada: mudar a frequência muda o *tipo* de nota, não o volume.

### 2. Quando o som muda de meio

Imagine uma pessoa gritando na beira de uma piscina e alguém ouvindo submerso.

- Quem produz o som é a fonte → **a frequência é a mesma na água**.
- A água transmite mais rápido: v passa de ~340 para ~1 500 m/s.
- Como v = λf e f não mudou, **λ aumenta** na mesma proporção (cerca de 4,4 vezes).

**O padrão de resposta:** frequência é da fonte, velocidade é do meio, comprimento de onda é a consequência dos dois.

### 3. Reflexão: eco e reverberação

Quando o som bate num obstáculo e volta, há **reflexão**. Se o som refletido chega **mais de 0,1 s** depois do original, o ouvido separa os dois e percebemos **eco**. Se chega antes disso, os sons se sobrepõem e temos **reverberação** — aquela sensação de som "arrastado" em igrejas e ginásios.

Com v = 340 m/s e 0,1 s de ida e volta, o obstáculo precisa estar a pelo menos **17 m** (o som percorre 34 m no total).

O mesmo princípio explica o **sonar** e a **ecografia**: emite-se um pulso, mede-se o tempo até o eco voltar e calcula-se a distância por d = v·t/2 — o **/2** existe porque o pulso vai e volta. Esquecer esse 2 é o erro clássico.

### 4. Ressonância

Todo corpo tem uma **frequência natural** de vibração. Quando recebe energia numa frequência **igual à sua**, a amplitude cresce muito: é a **ressonância**.

É por isso que uma taça pode trincar com um som intenso na frequência certa, que a caixa de um violão amplifica a corda, e que tropas quebram o passo ao cruzar pontes.

### 5. Efeito Doppler

Quando fonte e observador se **aproximam**, as frentes de onda chegam mais juntas: a frequência **percebida aumenta** (som mais agudo). Quando se **afastam**, chegam mais espaçadas: frequência percebida **diminui** (mais grave).

É a ambulância: agudo ao vir, grave ao passar. Atenção ao ponto que o ENEM adora: **a fonte continua emitindo sempre a mesma frequência**. Quem muda é a frequência *recebida* pelo observador. E a mudança acontece na aproximação e no afastamento — não "no momento em que passa".

### 6. Intensidade e a escala em decibéis

A intensidade sonora cai conforme a distância aumenta, porque a mesma energia se espalha por uma área maior. A escala de decibéis é **logarítmica**: cada **10 dB** a mais corresponde a uma intensidade **10 vezes maior**.

Por isso 80 dB não é "o dobro" de 40 dB — é dez mil vezes mais intenso. Exposição prolongada acima de 85 dB traz risco de perda auditiva, o que costuma ser o gancho das questões sobre saúde e ruído urbano.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — do ar para a água, sem perder a frequência',
        body: `**Situação:** um alto-falante emite som de 850 Hz no ar (v = 340 m/s). Parte do som passa para a água (v = 1 500 m/s). Calcule o comprimento de onda em cada meio.

**Passo 1 — no ar:**

λ = v/f = 340 / 850 = **0,40 m**

**Passo 2 — identificar o que muda:** a fonte é a mesma, então **f continua 850 Hz**. O meio mudou, então v passou a 1 500 m/s.

**Passo 3 — na água:**

λ = 1 500 / 850 ≈ **1,76 m**

**Resposta:** 0,40 m no ar e cerca de 1,76 m na água. O comprimento de onda aumentou porque a velocidade aumentou e a frequência foi mantida.

**Erro clássico:** supor que a frequência muda ao mudar de meio. Ela é imposta pela fonte e acompanha a onda por todo o percurso.`,
      },
      {
        title: 'Exemplo resolvido 2 — medir profundidade com sonar',
        body: `**Situação:** um sonar emite um pulso ultrassônico e recebe o eco do fundo do mar 0,8 s depois. A velocidade do som na água é 1 500 m/s. Qual a profundidade?

**Passo 1 — calcular a distância total percorrida pelo pulso:**

d_total = v · t = 1 500 × 0,8 = 1 200 m

**Passo 2 — lembrar que o pulso fez ida e volta:**

profundidade = d_total / 2 = 1 200 / 2 = **600 m**

**Resposta:** o fundo está a 600 m.

**Por que o ultrassom e não o som audível:** frequências altas têm comprimento de onda pequeno, o que permite detectar objetos menores e obter imagens mais detalhadas — a mesma razão pela qual a ecografia usa ultrassom.

**Erro clássico:** responder 1 200 m. O tempo medido é sempre o da viagem completa; a distância até o obstáculo é a metade.`,
      },
    ],
    mistakes: `**1. Trocar altura por intensidade.**
Grave e agudo são **frequência** (altura). Fraco e forte são **amplitude** (intensidade, em dB). Aumentar o volume não deixa a nota mais aguda.

**2. Esquecer o "dividido por 2" em eco, sonar e ecografia.**
O tempo cronometrado é de ida **e** volta. A distância até o obstáculo é d = v·t/2.

**3. Dizer que a fonte muda de frequência no efeito Doppler.**
A fonte emite sempre a mesma frequência. O que muda é a frequência **percebida** pelo observador, por causa do movimento relativo entre os dois.`,
    selfCheck: [
      'Por que o som não se propaga no vácuo, mas a luz do Sol chega até nós?',
      'Ao passar do ar para a água, o que muda no som: frequência, velocidade ou comprimento de onda? Justifique.',
      'Qual a diferença entre um som agudo e um som forte, usando os termos frequência e amplitude?',
      'Explique, sem fórmula, por que é preciso dividir por 2 o tempo medido por um sonar.',
      'Uma ambulância se afasta de você tocando a sirene. O que muda no som que você ouve, e o que continua igual na fonte?',
    ],
    questions: [
      q({
        slug: 'q-ondson-1',
        stem: 'O som é classificado como uma onda mecânica longitudinal. Isso significa que ele:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'classificação de ondas quanto ao meio e à direção de vibração',
        seconds: 75,
        errors: ['confundir onda mecânica com eletromagnética'],
        correct: 3,
        options: [
          ['Propaga-se no vácuo com velocidade constante.', 'Ondas mecânicas exigem meio material; no vácuo não há som.', 'tratar som como onda eletromagnética'],
          ['Faz as partículas do meio vibrarem perpendicularmente à propagação.', 'Essa é a descrição de uma onda transversal, como a de uma corda.', 'trocar longitudinal por transversal'],
          ['Transporta matéria da fonte até o receptor.', 'A onda transporta energia; as partículas apenas oscilam em torno da posição de equilíbrio.', 'supor transporte de matéria'],
          ['Precisa de um meio material e faz as partículas vibrarem na mesma direção da propagação.', 'Mecânica significa depender de um meio; longitudinal significa vibração paralela à propagação, formando compressões e rarefações.'],
          ['Tem velocidade maior no ar do que no aço.', 'O som é mais rápido em sólidos, onde as partículas estão mais próximas e ligadas.', 'inverter a ordem das velocidades'],
        ],
        explanation: 'Mecânica: precisa de meio material. Longitudinal: as partículas vibram na mesma direção em que a onda se propaga.',
      }),
      q({
        slug: 'q-ondson-2',
        stem: 'Uma fonte emite som de frequência 680 Hz no ar, onde a velocidade do som vale 340 m/s. O comprimento de onda dessa onda sonora é de:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação direta da equação fundamental da ondulatória',
        seconds: 90,
        errors: ['multiplicar quando deveria dividir'],
        correct: 1,
        options: [
          ['2,0 m.', 'Esse valor viria de dividir a frequência pela velocidade, invertendo a relação.', 'inverter a divisão'],
          ['0,50 m.', 'λ = v/f = 340/680 = 0,50 m.'],
          ['340 m.', 'Esse é o valor da velocidade, não do comprimento de onda.', 'repetir um dado do enunciado'],
          ['680 m.', 'Esse é o valor numérico da frequência, em unidade trocada.', 'repetir um dado do enunciado'],
          ['231 200 m.', 'Esse resultado vem de multiplicar v por f, quando a relação pede divisão.', 'multiplicar em vez de dividir'],
        ],
        explanation: 'De v = λf vem λ = v/f. Com 340 m/s e 680 Hz, λ = 0,50 m.',
        strategy: 'Isole a grandeza pedida antes de substituir os números e confira a unidade do resultado.',
      }),
      q({
        slug: 'q-ondson-3',
        stem: 'Uma reportagem sobre poluição sonora informa que uma via movimentada registra 80 dB, enquanto uma biblioteca registra 40 dB, e alerta que a escala de decibéis é logarítmica. Da informação apresentada conclui-se que a intensidade sonora na via é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de escala logarítmica em contexto de saúde urbana',
        seconds: 120,
        errors: ['tratar a escala de decibéis como proporcional'],
        correct: 4,
        options: [
          ['O dobro da intensidade na biblioteca.', 'Dobrar o número de decibéis não dobra a intensidade: a escala não é proporcional.', 'ler a escala como linear'],
          ['Quatro vezes maior.', 'Esse resultado suporia proporcionalidade simples entre decibéis e intensidade.', 'ler a escala como linear'],
          ['Quarenta vezes maior.', 'A diferença de 40 dB não corresponde a multiplicar por 40.', 'ler a escala como linear'],
          ['Igual, pois decibel mede apenas frequência.', 'O decibel mede nível de intensidade sonora, não frequência.', 'confundir as grandezas'],
          ['Dez mil vezes maior.', 'Cada 10 dB equivalem a multiplicar a intensidade por 10; 40 dB de diferença correspondem a 10⁴, ou seja, 10 000 vezes.'],
        ],
        explanation: 'Na escala logarítmica, +10 dB significa intensidade dez vezes maior. Uma diferença de 40 dB equivale a 10⁴ = 10 000 vezes.',
      }),
      q({
        slug: 'q-ondson-4',
        stem: 'Um som emitido no ar (v ≈ 340 m/s) passa a se propagar na água (v ≈ 1 500 m/s). Comparando a onda nos dois meios, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação das grandezas da onda na mudança de meio',
        seconds: 135,
        errors: ['supor que a frequência muda com o meio'],
        correct: 0,
        options: [
          ['A frequência permanece a mesma e o comprimento de onda aumenta na água.', 'A frequência é imposta pela fonte e não muda com o meio; como v cresceu e v = λf, o comprimento de onda cresce na mesma proporção.'],
          ['A frequência aumenta e o comprimento de onda permanece o mesmo.', 'A frequência não depende do meio, e sim da fonte.', 'atribuir a frequência ao meio'],
          ['Tanto a frequência quanto o comprimento de onda diminuem.', 'Com velocidade maior na água, o comprimento de onda aumenta em vez de diminuir.', 'inverter a relação'],
          ['A velocidade permanece constante e apenas a amplitude muda.', 'A velocidade do som depende do meio e é claramente maior na água.', 'ignorar o dado do enunciado'],
          ['O som deixa de se propagar, por ser onda exclusiva do ar.', 'O som se propaga em qualquer meio material, inclusive líquidos e sólidos.', 'restringir o som a um único meio'],
        ],
        explanation: 'Fonte define a frequência; meio define a velocidade; o comprimento de onda é a consequência: λ = v/f.',
        strategy: 'Na mudança de meio, marque f como constante e deduza λ a partir da nova velocidade.',
      }),
      q({
        slug: 'q-ondson-5',
        stem: 'Um morador percebe a sirene de uma ambulância mais aguda enquanto o veículo se aproxima e mais grave depois que ele passa, embora a sirene funcione sem qualquer alteração. Sobre a situação, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre movimento relativo, frequência percebida e qualidade do som',
        seconds: 165,
        errors: ['supor que a fonte altera a frequência emitida'],
        correct: 2,
        options: [
          ['A sirene passa a emitir frequências maiores ao se aproximar e menores ao se afastar.', 'A fonte emite sempre a mesma frequência; o enunciado diz que ela funciona sem alteração.', 'transferir a mudança para a fonte'],
          ['A mudança ocorre porque a velocidade do som aumenta quando a ambulância se aproxima.', 'A velocidade do som depende do meio, não do movimento da fonte.', 'atribuir a mudança à velocidade do som'],
          ['A frequência percebida pelo morador aumenta na aproximação e diminui no afastamento, pelo efeito Doppler, enquanto a frequência emitida permanece constante.', 'No movimento relativo de aproximação as frentes de onda chegam mais juntas, elevando a frequência recebida; no afastamento chegam mais espaçadas, reduzindo-a. A emissão não muda.'],
          ['A intensidade do som muda, e é isso que o morador interpreta como agudo ou grave.', 'Intensidade está ligada ao volume, não à altura do som.', 'confundir intensidade com altura'],
          ['O fenômeno é uma ressonância entre a sirene e o ar da rua.', 'Ressonância envolve coincidência de frequências naturais, não movimento relativo entre fonte e observador.', 'trocar o fenômeno'],
        ],
        explanation: 'É o efeito Doppler: o movimento relativo altera a frequência percebida pelo observador, e não a frequência emitida pela fonte.',
      }),
      q({
        slug: 'q-ondson-rec-1',
        stem: 'A faixa de frequências que um ser humano com audição saudável consegue perceber está aproximadamente entre:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento da faixa audível',
        seconds: 60,
        recovery: true,
        errors: ['confundir a faixa audível com valores de velocidade'],
        correct: 1,
        options: [
          ['0 Hz e 20 Hz.', 'Abaixo de 20 Hz está o infrassom, que não é percebido pelo ouvido humano.', 'confundir com infrassom'],
          ['20 Hz e 20 000 Hz.', 'Essa é a faixa audível típica; abaixo dela há infrassom e acima, ultrassom.'],
          ['340 Hz e 1 500 Hz.', 'Esses números são velocidades do som no ar e na água, não limites de audição.', 'trocar grandeza'],
          ['20 000 Hz e 40 000 Hz.', 'Essa faixa corresponde ao ultrassom, usado em ecografia e sonar.', 'confundir com ultrassom'],
          ['1 Hz e 100 Hz.', 'Boa parte dessa faixa é inaudível, e ela ignora todos os sons agudos.', 'restringir demais a faixa'],
        ],
        explanation: 'A audição humana vai de cerca de 20 Hz a 20 000 Hz. Fora disso: infrassom (abaixo) e ultrassom (acima).',
      }),
    ],
  }),

  topic({
    slug: 'citologia-e-metabolismo',
    name: 'Citologia e metabolismo celular',
    subject: 'biologia',
    area: 'ciencias-natureza',
    summary:
      'Relacionar as organelas às suas funções, comparar respiração celular e fotossíntese e explicar o transporte pela membrana em situações do cotidiano e da saúde.',
    difficulty: 'intermediate',
    minutes: 26,
    weight: 88,
    order: 4,
    prerequisites: ['ecologia-e-ciclos'],
    related: ['genetica-basica', 'saude-e-prevencao'],
    skill: {
      slug: 'relacionar-estruturas-celulares-e-processos-metabolicos',
      name: 'Relacionar estruturas celulares e processos metabólicos',
      description:
        'Associar organelas às suas funções, comparar as vias de obtenção de energia e prever o comportamento da célula em diferentes meios.',
    },
    quick: `**Quem faz o quê na célula**

| Organela | Função em uma frase |
| --- | --- |
| **Membrana plasmática** | controla o que entra e o que sai (permeabilidade seletiva) |
| **Núcleo** | guarda o DNA e comanda a célula |
| **Mitocôndria** | respiração celular: libera energia (ATP) |
| **Cloroplasto** | fotossíntese: produz matéria orgânica (só em vegetais e algas) |
| **Ribossomo** | monta as proteínas |
| **Retículo rugoso** | tem ribossomos: processa e transporta proteínas |
| **Retículo liso** | produz lipídios e faz desintoxicação |
| **Complexo golgiense** | empacota e envia; forma os lisossomos |
| **Lisossomo** | digestão intracelular |
| **Parede celular** | sustentação — vegetal, fungo e bactéria; **nunca** animal |

**Procarionte × eucarionte**

- **Procarionte** (bactérias): **sem núcleo delimitado** e sem organelas membranosas. DNA solto no citoplasma.
- **Eucarionte** (animais, plantas, fungos, protistas): núcleo com membrana e organelas.

**As duas equações que se espelham**

Fotossíntese: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂ *(armazena energia)*

Respiração: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP *(libera energia)*

**Atenção:** a planta faz fotossíntese **e** respiração. Ela não "só respira à noite" — ela respira o tempo todo; de dia a fotossíntese só é mais intensa.

**Transporte pela membrana**

- **Passivo** (sem gasto de energia, a favor do gradiente): difusão, difusão facilitada e **osmose** (água).
- **Ativo** (com gasto de ATP, contra o gradiente): bomba de sódio e potássio.
- **Osmose:** a água vai do meio **menos concentrado em soluto** para o **mais concentrado**.`,
    explanation: {
      title: 'Da estrutura da célula ao que acontece no corpo',
      body: `### 1. A membrana e o motivo de a célula murchar ou estourar

A membrana é seletiva: deixa passar água livremente, mas controla os solutos. A água se move por **osmose**, sempre "atrás" do soluto.

Três situações que o ENEM cobra:

- **Meio hipotônico** (menos concentrado que a célula): a água entra. A célula animal incha e pode romper (hemólise). A vegetal incha mas é contida pela parede celular — fica **túrgida**, o estado saudável da planta.
- **Meio isotônico**: entra e sai na mesma taxa. É por isso que soro fisiológico e soluções injetáveis são isotônicos ao sangue.
- **Meio hipertônico** (mais concentrado): a água sai. A célula murcha. É o princípio da conservação de alimentos em sal ou açúcar: a salmoura desidrata os microrganismos.

Explica também por que a salada murcha quando se põe sal antes da hora, e por que beber água do mar piora a desidratação.

### 2. Mitocôndria: onde a energia do alimento vira energia da célula

A respiração celular **não cria** energia — ela transfere a energia das ligações da glicose para o ATP, a "moeda" que a célula gasta.

A via completa, com oxigênio (**aeróbia**), rende muito mais ATP do que a via sem oxigênio (**fermentação**, anaeróbia). Daí duas consequências cobradas:

- Células muito ativas (músculo cardíaco, neurônio) têm **muitas mitocôndrias**.
- No esforço intenso, quando o oxigênio não chega rápido o bastante, parte do músculo faz **fermentação láctica**: produz menos ATP e acumula lactato.

Fermentação também é a base do pão e da cerveja (alcoólica, por leveduras) e do iogurte (láctica, por bactérias).

### 3. Cloroplasto e a relação com a cadeia alimentar

A fotossíntese transforma energia **luminosa** em energia **química** armazenada na glicose. Todo o resto da teia alimentar depende disso — inclusive nós.

Comparação que costuma ser pedida:

| | Fotossíntese | Respiração |
| --- | --- | --- |
| Onde | cloroplasto | mitocôndria |
| Quem faz | vegetais, algas, cianobactérias | praticamente todos os seres vivos |
| Energia | armazena | libera |
| Consome | CO₂ e H₂O | glicose e O₂ |
| Produz | glicose e O₂ | CO₂, H₂O e ATP |
| Quando | só com luz | o tempo todo |

### 4. A rota das proteínas

DNA (núcleo) → RNA → **ribossomo** monta a proteína → **retículo rugoso** processa → **complexo golgiense** empacota → vesícula leva ao destino ou para fora da célula.

Uma célula que secreta muita proteína (as do pâncreas, por exemplo) tem retículo rugoso e Golgi bem desenvolvidos. Esse tipo de dedução — "olhando a organela abundante, que função a célula exerce?" — é o formato preferido da prova.

### 5. Lisossomo e autofagia

O lisossomo tem enzimas digestivas. Ele degrada partículas que entraram na célula (**heterofagia**) e também organelas próprias envelhecidas (**autofagia**), reciclando os componentes. Em jejum prolongado, a autofagia ajuda a célula a sobreviver reaproveitando o próprio material.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — por que a hemácia estoura em água pura',
        body: `**Situação:** hemácias são colocadas em três tubos: água destilada, soro fisiológico (isotônico) e solução concentrada de sal. Preveja o que acontece em cada um.

**Passo 1 — lembrar a regra da osmose:** a água vai do meio menos concentrado em soluto para o mais concentrado.

**Passo 2 — tubo com água destilada:** o meio externo praticamente não tem soluto; o interior da hemácia tem. A água **entra**. Como a célula animal não tem parede celular, ela incha até romper — **hemólise**.

**Passo 3 — soro fisiológico:** concentrações iguais dentro e fora. Entra e sai a mesma quantidade de água; a célula **mantém o volume**. Por isso é a solução usada em hidratação venosa.

**Passo 4 — solução concentrada:** o meio externo tem mais soluto. A água **sai** e a célula **murcha** (crenação).

**Conclusão:** o que decide não é "ter água", e sim a **diferença de concentração** entre os dois lados da membrana.`,
      },
      {
        title: 'Exemplo resolvido 2 — deduzir a função de uma célula pela organela',
        body: `**Situação:** ao microscópio eletrônico, uma célula A apresenta enorme quantidade de mitocôndrias; uma célula B apresenta retículo endoplasmático rugoso e complexo golgiense muito desenvolvidos. O que se pode concluir sobre elas?

**Passo 1 — célula A:** mitocôndria é o local da respiração celular, onde se produz ATP. Muitas mitocôndrias indicam **alta demanda energética** — é o caso das células musculares cardíacas, que se contraem sem parar.

**Passo 2 — célula B:** o retículo rugoso processa proteínas recém-sintetizadas pelos ribossomos, e o Golgi as empacota para exportação. Isso indica uma célula **secretora de proteínas** — como as do pâncreas, que produzem enzimas digestivas e insulina.

**Passo 3 — cuidado com a conclusão inversa:** a presença de muitas mitocôndrias não diz *qual* trabalho a célula faz, só que ele consome muita energia. Alternativas que afirmam mais do que o dado permite estão erradas.

**Resposta:** A é uma célula de alto gasto energético; B é uma célula especializada em secreção de proteínas.`,
      },
    ],
    mistakes: `**1. Dizer que a planta "respira só à noite".**
A planta respira 24 horas por dia, nas mitocôndrias. A fotossíntese é que só ocorre com luz. De dia os dois processos acontecem juntos, com a fotossíntese mais intensa.

**2. Inverter o sentido da osmose.**
A água vai para onde há **mais soluto**, não para onde há mais água livre no senso comum. Antes de responder, marque qual lado está mais concentrado.

**3. Atribuir parede celular à célula animal.**
Parede celular existe em vegetal, fungo e bactéria. A célula animal tem apenas a membrana plasmática — é por isso que ela pode estourar em meio hipotônico.`,
    selfCheck: [
      'Qual a diferença essencial entre uma célula procarionte e uma eucarionte?',
      'Fotossíntese e respiração são processos opostos? Explique o que cada um faz com a energia.',
      'Por que o soro usado em hospitais precisa ser isotônico em relação ao sangue?',
      'Se uma célula tem muitas mitocôndrias, o que você pode e o que você não pode concluir sobre ela?',
      'Como o sal conserva a carne, pensando em osmose e em microrganismos?',
    ],
    questions: [
      q({
        slug: 'q-citmet-1',
        stem: 'A organela responsável pela respiração celular, processo que disponibiliza energia na forma de ATP, é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'associação entre organela e função',
        seconds: 70,
        errors: ['trocar mitocôndria por cloroplasto'],
        correct: 2,
        options: [
          ['O cloroplasto.', 'O cloroplasto realiza fotossíntese, que armazena energia, e existe apenas em vegetais e algas.', 'trocar as organelas energéticas'],
          ['O lisossomo.', 'O lisossomo faz digestão intracelular, não produção de ATP.', 'trocar a função'],
          ['A mitocôndria.', 'É na mitocôndria que ocorre a respiração celular aeróbia, transferindo a energia da glicose para o ATP.'],
          ['O ribossomo.', 'O ribossomo sintetiza proteínas.', 'trocar a função'],
          ['O complexo golgiense.', 'O Golgi empacota e distribui substâncias produzidas pela célula.', 'trocar a função'],
        ],
        explanation: 'Mitocôndria é o sítio da respiração celular aeróbia — por isso células de alta demanda energética têm muitas delas.',
      }),
      q({
        slug: 'q-citmet-2',
        stem: 'Para conservar carnes por longos períodos, uma técnica tradicional consiste em cobri-las com grande quantidade de sal. O efeito conservante se explica porque o sal:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação da osmose a uma prática cotidiana',
        seconds: 95,
        errors: ['atribuir a conservação a um efeito químico direto do sal'],
        correct: 3,
        options: [
          ['Eleva a temperatura da carne, matando os microrganismos pelo calor.', 'A salga não aquece o alimento.', 'inventar mecanismo térmico'],
          ['Impede fisicamente a chegada de microrganismos à superfície.', 'O efeito não é de barreira física, e sim osmótico.', 'trocar o mecanismo'],
          ['Fornece nutrientes que competem com os microrganismos pelo alimento.', 'Sal não atua por competição nutricional.', 'trocar o mecanismo'],
          ['Cria um meio hipertônico, que retira água das células dos microrganismos por osmose e impede sua multiplicação.', 'Com o meio externo muito concentrado, a água sai das células microbianas, que desidratam e não conseguem se reproduzir.'],
          ['Torna o meio hipotônico, fazendo os microrganismos absorverem água até estourarem.', 'O sal torna o meio hipertônico, não hipotônico.', 'inverter o tipo de meio'],
        ],
        explanation: 'Salga e conservação em açúcar funcionam pelo mesmo princípio: meio hipertônico desidrata os microrganismos por osmose.',
        strategy: 'Identifique qual lado tem mais soluto e deduza para onde a água vai.',
      }),
      q({
        slug: 'q-citmet-3',
        stem: 'Ao analisar imagens de microscopia, um estudante observa que uma célula do pâncreas apresenta retículo endoplasmático rugoso e complexo golgiense muito desenvolvidos. A conclusão mais adequada é que essa célula:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'inferência de função celular a partir de evidência morfológica',
        seconds: 115,
        errors: ['concluir além do que a evidência permite'],
        correct: 0,
        options: [
          ['É especializada na produção e na secreção de proteínas.', 'O retículo rugoso processa proteínas sintetizadas pelos ribossomos e o Golgi as empacota para exportação: o conjunto indica intensa atividade secretora.'],
          ['Realiza fotossíntese em grande quantidade.', 'Células animais não têm cloroplastos e não fazem fotossíntese.', 'atribuir função vegetal a célula animal'],
          ['Não consome energia para funcionar.', 'Toda célula consome ATP, e a secreção é um processo energeticamente caro.', 'negar o gasto energético'],
          ['Perdeu o núcleo durante a diferenciação.', 'Nada na observação descrita indica ausência de núcleo.', 'concluir além da evidência'],
          ['Está em processo de morte celular programada.', 'Organelas de síntese bem desenvolvidas indicam atividade intensa, não degeneração.', 'inverter a leitura da evidência'],
        ],
        explanation: 'Retículo rugoso + Golgi desenvolvidos é a assinatura morfológica de uma célula secretora de proteínas, como as do pâncreas.',
      }),
      q({
        slug: 'q-citmet-4',
        stem: 'Comparando fotossíntese e respiração celular, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre vias metabólicas quanto a local, reagentes e energia',
        seconds: 140,
        errors: ['supor que a planta só respira à noite'],
        correct: 4,
        options: [
          ['A fotossíntese libera energia e a respiração a armazena.', 'É o contrário: a fotossíntese armazena energia na glicose e a respiração a libera na forma de ATP.', 'inverter os papéis energéticos'],
          ['Ambas ocorrem exclusivamente nas mitocôndrias.', 'A fotossíntese ocorre nos cloroplastos.', 'unificar os locais'],
          ['Plantas realizam apenas fotossíntese, e animais apenas respiração.', 'Plantas também respiram, o tempo todo, para obter ATP.', 'excluir a respiração vegetal'],
          ['Nas plantas, a respiração ocorre somente durante a noite.', 'A respiração é contínua; à noite apenas cessa a fotossíntese, que a mascarava durante o dia.', 'confundir ausência de luz com ausência de respiração'],
          ['A fotossíntese ocorre no cloroplasto e armazena energia na glicose, enquanto a respiração ocorre na mitocôndria e libera essa energia na forma de ATP.', 'Os processos são complementares: um converte energia luminosa em química armazenada, o outro converte essa energia química em ATP utilizável.'],
        ],
        explanation: 'Fotossíntese: cloroplasto, armazena. Respiração: mitocôndria, libera. As plantas fazem as duas coisas.',
        strategy: 'Monte uma tabela mental com local, reagentes, produtos e destino da energia antes de julgar as alternativas.',
      }),
      q({
        slug: 'q-citmet-5',
        stem: 'Durante um esforço físico muito intenso, o oxigênio pode não chegar ao músculo na velocidade necessária. Nessa condição, parte das células musculares passa a obter energia por fermentação láctica. Sobre essa situação, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre metabolismo energético, disponibilidade de oxigênio e fisiologia do exercício',
        seconds: 165,
        errors: ['igualar o rendimento energético das duas vias'],
        correct: 1,
        options: [
          ['A fermentação produz mais ATP por glicose do que a respiração aeróbia, o que explica o esforço intenso.', 'A via aeróbia é muito mais rentável; a fermentação é um recurso de emergência, não um ganho.', 'inverter o rendimento das vias'],
          ['A fermentação permite continuar produzindo ATP sem oxigênio, mas com rendimento muito menor por molécula de glicose, e leva ao acúmulo de lactato.', 'Sem oxigênio suficiente, a célula recorre a uma via menos eficiente que mantém alguma produção de ATP e gera lactato como produto.'],
          ['A célula deixa de consumir glicose enquanto falta oxigênio.', 'A glicose continua sendo consumida — é justamente o substrato da fermentação.', 'negar o consumo de substrato'],
          ['O processo ocorre no cloroplasto das células musculares.', 'Células animais não possuem cloroplastos.', 'atribuir organela vegetal'],
          ['A fermentação elimina a necessidade de respiração aeróbia durante todo o exercício.', 'A via aeróbia continua operando e volta a predominar assim que a oferta de oxigênio se normaliza.', 'excluir a via principal'],
        ],
        explanation: 'A fermentação é uma alternativa anaeróbia de baixo rendimento: mantém a produção de ATP por pouco tempo e acumula lactato.',
      }),
      q({
        slug: 'q-citmet-rec-1',
        stem: 'A principal diferença entre uma célula procarionte e uma célula eucarionte está no fato de que a procarionte:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'distinção entre tipos celulares',
        seconds: 65,
        recovery: true,
        errors: ['confundir ausência de núcleo com ausência de material genético'],
        correct: 2,
        options: [
          ['Não possui material genético.', 'A procarionte possui DNA; ele apenas não fica delimitado por uma membrana nuclear.', 'confundir núcleo com DNA'],
          ['Não possui membrana plasmática.', 'Toda célula tem membrana plasmática.', 'negar estrutura universal'],
          ['Não possui núcleo delimitado por membrana nem organelas membranosas.', 'No procarionte o DNA fica disperso no citoplasma, e faltam organelas envolvidas por membrana, como mitocôndrias e Golgi.'],
          ['Não realiza qualquer forma de metabolismo.', 'Bactérias têm metabolismo ativo e diversificado.', 'negar o metabolismo'],
          ['É sempre maior que a célula eucarionte.', 'Procariontes costumam ser consideravelmente menores.', 'inverter a comparação de tamanho'],
        ],
        explanation: 'Procarionte tem DNA, mas sem núcleo delimitado e sem organelas membranosas; eucarionte tem os dois.',
      }),
    ],
  }),
];

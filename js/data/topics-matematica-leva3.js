import { question as q, topic } from './leva8-factory.js';

export const MATEMATICA_TOPICS_LEVA_3 = [
  topic({
    slug: 'analise-combinatoria',
    name: 'Análise combinatória',
    subject: 'matematica',
    area: 'matematica',
    summary:
      'Contar possibilidades sem listar uma a uma: princípio multiplicativo, arranjos, combinações e permutações, decidindo quando a ordem importa.',
    difficulty: 'challenging',
    minutes: 28,
    weight: 86,
    order: 10,
    prerequisites: ['probabilidade'],
    related: ['estatistica', 'funcoes-e-relacoes'],
    skill: {
      slug: 'contar-agrupamentos-decidindo-se-a-ordem-importa',
      name: 'Contar agrupamentos decidindo se a ordem importa',
      description:
        'Aplicar o princípio multiplicativo e escolher entre arranjo, combinação e permutação a partir da natureza do agrupamento pedido.',
    },
    quick: `**A pergunta que decide tudo**

> **Trocar a ordem gera um resultado diferente?**

- **Sim** → a ordem importa → **arranjo** ou **permutação**.
- **Não** → a ordem não importa → **combinação**.

Senha, pódio, fila, código: a ordem importa. Comissão, sabores de pizza, cartas na mão: não importa.

**Princípio multiplicativo (o mais cobrado)**

Se uma escolha tem *m* opções e a seguinte tem *n*, o total é *m × n*. Vale para quantas etapas houver.

> 4 camisas × 3 calças × 2 sapatos = **24** combinações de roupa.

**As três fórmulas**

| Caso | Quando usar | Fórmula |
| --- | --- | --- |
| **Permutação** de n | organizar **todos** os n elementos | $P_n = n!$ |
| **Arranjo** de n, p a p | escolher p de n **com ordem** | $A_{n,p} = \\dfrac{n!}{(n-p)!}$ |
| **Combinação** de n, p a p | escolher p de n **sem ordem** | $C_{n,p} = \\dfrac{n!}{p!\\,(n-p)!}$ |

**Fatorial:** $n! = n \\times (n-1) \\times \\dots \\times 2 \\times 1$. E $0! = 1$.

$5! = 120$ · $4! = 24$ · $3! = 6$

**Permutação com elementos repetidos**

Divida pelo fatorial de cada repetição. ARARA: 5 letras, com 3 A e 2 R →
$\\dfrac{5!}{3!\\,2!} = \\dfrac{120}{12} = 10$ anagramas.

**Ligação com probabilidade**

$$P = \\dfrac{\\text{casos favoráveis}}{\\text{casos possíveis}}$$

Contar bem os dois é justamente o trabalho da combinatória.`,
    explanation: {
      title: 'Contar sem listar: do princípio multiplicativo às fórmulas',
      body: `### 1. Por que o princípio multiplicativo resolve a maioria das questões

O ENEM raramente pede a fórmula pura. Ele descreve um processo em etapas e pergunta de quantos modos ele pode acontecer. Nessas horas, basta desenhar as casinhas:

> Uma senha tem 4 dígitos, de 0 a 9, **podendo repetir**.

__ __ __ __ → 10 × 10 × 10 × 10 = **10 000**

> A mesma senha, mas **sem repetir** dígito:

__ __ __ __ → 10 × 9 × 8 × 7 = **5 040**

Repare que a segunda situação é exatamente um arranjo $A_{10,4}$. A fórmula é um atalho para a mesma contagem — se você entendeu as casinhas, nunca fica sem saída.

### 2. Arranjo × combinação: o teste do "troquei a ordem"

A regra prática: monte um exemplo concreto e troque dois elementos de lugar. Se o resultado virou outra coisa, a ordem importa.

**Caso A — pódio.** Três medalhas entre 8 atletas. Ana em 1º e Bia em 2º **não é** o mesmo que Bia em 1º e Ana em 2º. A ordem importa → arranjo:

$A_{8,3} = \\dfrac{8!}{5!} = 8 \\times 7 \\times 6 = 336$

**Caso B — comissão.** Três representantes entre 8 alunos, todos com a mesma função. Escolher {Ana, Bia, Caio} é a mesma comissão em qualquer ordem → combinação:

$C_{8,3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$

É o mesmo 336, dividido por 3! = 6 — exatamente o número de ordens possíveis de cada trio. A combinação é o arranjo **descontando as repetições de ordem**.

### 3. Permutação: quando todos entram

Quando o problema pede para organizar **todos** os elementos, é permutação.

> De quantas formas 5 pessoas podem formar uma fila? $5! = 120$.

Dois refinamentos frequentes:

- **Elementos que devem ficar juntos:** trate o bloco como uma peça única, permute o conjunto e depois permute dentro do bloco. Duas pessoas juntas em uma fila de 5: $4! \\times 2! = 48$.
- **Elementos repetidos:** divida pelos fatoriais das repetições, como em ARARA.

### 4. O truque do complementar

Quando o enunciado diz **"pelo menos um"**, contar direto costuma dar trabalho. Conte o **total** e subtraia o caso proibido:

> Em um grupo de 10 pessoas, das quais 4 são canhotas, quantas comissões de 3 têm **pelo menos uma** canhota?

Total: $C_{10,3} = 120$. Sem nenhuma canhota (só entre as 6 destras): $C_{6,3} = 20$.

Resposta: 120 − 20 = **100**.

### 5. Do contagem à probabilidade

Contagem e probabilidade são a mesma conta vista de dois ângulos.

> Em uma urna com 5 bolas brancas e 3 pretas, retiram-se 2 ao acaso. Qual a probabilidade de as duas serem brancas?

Casos possíveis: $C_{8,2} = 28$. Favoráveis: $C_{5,2} = 10$.

$P = 10/28 = 5/14 \\approx 36\\%$

Por que combinação e não arranjo? Porque tirar a bola 1 e depois a 2 é o mesmo par que tirar a 2 e depois a 1. Se você usar arranjo nos dois lados, o resultado é o mesmo — o erro só aparece quando se mistura arranjo em cima com combinação embaixo.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — placas, senhas e o princípio multiplicativo',
        body: `**Situação:** um sistema gera códigos formados por 2 letras seguidas de 3 algarismos. Há 26 letras disponíveis e 10 algarismos, e a repetição é permitida. Quantos códigos diferentes existem?

**Passo 1 — separar em etapas e desenhar as posições:**

L L D D D

**Passo 2 — contar as opções de cada posição:** cada letra tem 26 opções; cada dígito tem 10.

**Passo 3 — multiplicar:**

26 × 26 × 10 × 10 × 10 = 676 × 1 000 = **676 000** códigos.

**Variação que a prova gosta:** e se não pudesse repetir?

26 × 25 × 10 × 9 × 8 = 650 × 720 = **468 000**.

**A leitura que evita o erro:** "pode repetir" mantém o número de opções constante; "não pode repetir" reduz de um em um.`,
      },
      {
        title: 'Exemplo resolvido 2 — pódio ou comissão? O mesmo grupo, contas diferentes',
        body: `**Situação:** uma turma tem 10 alunos. Calcule:
(a) de quantos modos podem ser escolhidos 3 representantes com as funções de presidente, vice e secretário;
(b) de quantos modos pode ser formada uma comissão de 3 alunos sem cargos definidos.

**Item (a) — a ordem importa?** Sim: trocar o presidente pelo vice muda a diretoria. É **arranjo**.

$A_{10,3} = 10 \\times 9 \\times 8 = 720$

(Também dá para pensar por etapas: 10 opções para presidente, 9 para vice, 8 para secretário.)

**Item (b) — a ordem importa?** Não: a comissão {Ana, Bia, Caio} é a mesma em qualquer ordem. É **combinação**.

$C_{10,3} = \\dfrac{10 \\times 9 \\times 8}{3!} = \\dfrac{720}{6} = 120$

**Resposta:** 720 e 120.

**O que a divisão por 3! significa:** cada comissão de 3 pessoas foi contada 6 vezes no arranjo, uma para cada ordem possível. Dividir por 3! elimina exatamente essa repetição.`,
      },
    ],
    mistakes: `**1. Usar arranjo onde cabia combinação (e vice-versa).**
Antes de qualquer fórmula, troque dois elementos de posição no exemplo e pergunte: mudou o resultado? Cargos, pódios e senhas → arranjo. Comissões, times e sabores → combinação.

**2. Ignorar se a repetição é permitida.**
"Uma senha de 4 dígitos" (10⁴ = 10 000) é bem diferente de "uma senha de 4 dígitos distintos" (10 × 9 × 8 × 7 = 5 040). A palavra "distintos" muda toda a conta.

**3. Contar direto quando o enunciado diz "pelo menos um".**
Quase sempre é mais rápido calcular o total e subtrair o caso indesejado do que somar vários casos separados — e o caminho longo costuma esquecer alguma situação.`,
    selfCheck: [
      'Qual pergunta você faz para decidir entre arranjo e combinação, e como testa a resposta com um exemplo?',
      'Por que a combinação é o arranjo dividido por p! ? O que esse p! está eliminando?',
      'Como muda a contagem de uma senha quando o enunciado acrescenta a palavra "distintos"?',
      'Explique a estratégia do complementar em um problema que pede "pelo menos um".',
      'Por que ARARA tem 10 anagramas e não 120?',
    ],
    questions: [
      q({
        slug: 'q-comb-1',
        stem: 'Em um problema de contagem, a escolha entre arranjo e combinação depende fundamentalmente de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'critério de decisão entre tipos de agrupamento',
        seconds: 75,
        errors: ['decidir pelo tamanho do grupo em vez da natureza do agrupamento'],
        correct: 1,
        options: [
          ['O número total de elementos disponíveis.', 'O total de elementos entra na fórmula, mas não decide qual fórmula usar.', 'confundir dado com critério'],
          ['A ordem dos elementos escolhidos alterar ou não o resultado.', 'Se trocar a ordem gera um agrupamento diferente, é arranjo; se gera o mesmo agrupamento, é combinação.'],
          ['O fato de o resultado ser um número par ou ímpar.', 'A paridade do resultado não tem relação com o tipo de agrupamento.', 'usar critério irrelevante'],
          ['A quantidade de casas decimais da resposta.', 'Resultados de contagem são números inteiros.', 'usar critério irrelevante'],
          ['A ordem alfabética dos nomes envolvidos.', 'A ordem alfabética é apenas uma forma de apresentar, não altera a contagem.', 'confundir apresentação com estrutura'],
        ],
        explanation: 'O teste é sempre o mesmo: trocar dois elementos de posição muda o resultado? Se muda, a ordem importa.',
      }),
      q({
        slug: 'q-comb-2',
        stem: 'Um restaurante oferece 4 tipos de massa, 3 tipos de molho e 2 tipos de queijo. Um prato é montado escolhendo exatamente um item de cada categoria. O número de pratos diferentes possíveis é:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação do princípio multiplicativo',
        seconds: 85,
        errors: ['somar as opções em vez de multiplicar'],
        correct: 4,
        options: [
          ['9.', 'Esse valor vem de somar 4 + 3 + 2, o que contaria escolhas alternativas, não combinadas.', 'somar em vez de multiplicar'],
          ['12.', 'Esse resultado considera apenas massa e molho, esquecendo o queijo.', 'esquecer uma etapa'],
          ['14.', 'Esse valor não corresponde a nenhuma operação coerente com o enunciado.', 'operar sem critério'],
          ['48.', 'Esse resultado dobraria indevidamente uma das etapas.', 'contar uma etapa duas vezes'],
          ['24.', '4 × 3 × 2 = 24: pelo princípio multiplicativo, cada escolha de massa pode acompanhar cada molho e cada queijo.'],
        ],
        explanation: 'Escolhas feitas em sequência, uma de cada categoria, multiplicam-se: 4 × 3 × 2 = 24.',
        strategy: 'Desenhe uma casinha por etapa, escreva quantas opções cabem em cada uma e multiplique.',
      }),
      q({
        slug: 'q-comb-3',
        stem: 'Uma escola vai formar uma comissão de 3 estudantes, sem cargos definidos, a partir de um grupo de 8 voluntários. O número de comissões distintas que podem ser formadas é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'identificação do tipo de agrupamento a partir do contexto',
        seconds: 115,
        errors: ['tratar comissão sem cargos como se a ordem importasse'],
        correct: 2,
        options: [
          ['336.', 'Esse é o valor do arranjo, que contaria a mesma comissão várias vezes, uma para cada ordem.', 'usar arranjo onde cabe combinação'],
          ['24.', 'Esse valor não corresponde a nenhuma contagem coerente com o enunciado.', 'operar sem critério'],
          ['56.', 'Como não há cargos, a ordem não importa: C(8,3) = (8 × 7 × 6)/(3 × 2 × 1) = 56.'],
          ['512.', 'Esse valor viria de 8³, que permitiria repetir a mesma pessoa.', 'permitir repetição indevida'],
          ['40 320.', 'Esse é 8!, que permutaria todos os oito voluntários.', 'permutar o grupo inteiro'],
        ],
        explanation: 'Sem cargos definidos, {Ana, Bia, Caio} é uma única comissão: usa-se combinação, C(8,3) = 56.',
      }),
      q({
        slug: 'q-comb-4',
        stem: 'Considere dois problemas com os mesmos 6 atletas: (I) formar um pódio com ouro, prata e bronze; (II) escolher 3 atletas para uma foto, sem distinção entre eles. Comparando as quantidades de resultados possíveis, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre arranjo e combinação no mesmo conjunto',
        seconds: 140,
        errors: ['supor que os dois problemas têm a mesma resposta'],
        correct: 3,
        options: [
          ['Os dois problemas têm a mesma quantidade de resultados, pois envolvem 3 dos mesmos 6 atletas.', 'A distinção entre as medalhas faz a ordem importar em (I), o que multiplica a quantidade de resultados.', 'ignorar o papel da ordem'],
          ['O problema II tem mais resultados, pois não há restrição de cargos.', 'A ausência de distinção reduz, e não aumenta, a quantidade de resultados diferentes.', 'inverter o efeito da ordem'],
          ['O problema I tem exatamente o dobro dos resultados de II.', 'A razão entre eles é 3! = 6, e não 2.', 'errar o fator de correção'],
          ['O problema I tem 6 vezes mais resultados que o II, porque cada trio pode ser ordenado de 3! = 6 maneiras.', 'A(6,3) = 120 e C(6,3) = 20: a razão é exatamente 3! = 6, o número de ordens possíveis de cada trio.'],
          ['Não é possível comparar sem saber os nomes dos atletas.', 'A contagem depende apenas da quantidade de elementos e da natureza do agrupamento.', 'exigir dado irrelevante'],
        ],
        explanation: 'Arranjo e combinação sobre o mesmo conjunto diferem pelo fator p!: A(6,3) = 120, C(6,3) = 20, razão 6.',
        strategy: 'Calcule a combinação e multiplique por p! para obter o arranjo — isso torna a comparação imediata.',
      }),
      q({
        slug: 'q-comb-5',
        stem: 'Em uma urna há 5 bolas brancas e 3 bolas pretas, idênticas ao tato. Retiram-se 2 bolas simultaneamente, ao acaso. A probabilidade de que ambas sejam brancas é de, aproximadamente:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre contagem de agrupamentos e cálculo de probabilidade',
        seconds: 165,
        errors: ['contar casos favoráveis e possíveis com critérios diferentes'],
        correct: 0,
        options: [
          ['36%.', 'Casos possíveis: C(8,2) = 28. Favoráveis: C(5,2) = 10. P = 10/28 ≈ 0,357, ou cerca de 36%.'],
          ['63%.', 'Esse valor corresponderia à proporção de bolas brancas na urna, não à de tirar duas brancas.', 'confundir proporção simples com probabilidade conjunta'],
          ['25%.', 'Esse resultado não decorre de nenhuma contagem coerente com o enunciado.', 'estimar sem contar'],
          ['50%.', 'A resposta não é obtida por simetria: há mais brancas que pretas, e a retirada é de duas bolas.', 'supor equiprobabilidade'],
          ['71%.', 'Esse valor superestima, aproximando-se da chance de pelo menos uma branca.', 'trocar o evento calculado'],
        ],
        explanation: 'Retirada simultânea significa que a ordem não importa: usa-se combinação nos dois lados da fração — 10/28 ≈ 36%.',
      }),
      q({
        slug: 'q-comb-rec-1',
        stem: 'O valor de 4! (quatro fatorial), operação frequente em problemas de contagem, é igual a:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'cálculo de fatorial',
        seconds: 60,
        recovery: true,
        errors: ['somar os números em vez de multiplicá-los'],
        correct: 2,
        options: [
          ['10.', 'Esse valor vem da soma 4 + 3 + 2 + 1, e não do produto.', 'somar em vez de multiplicar'],
          ['16.', 'Esse valor corresponde a 4², não ao fatorial de 4.', 'elevar ao quadrado'],
          ['24.', '4! = 4 × 3 × 2 × 1 = 24.'],
          ['12.', 'Esse resultado ignora um dos fatores do produto.', 'esquecer um fator'],
          ['4.', 'Esse é apenas o primeiro fator da sequência.', 'não efetuar o produto'],
        ],
        explanation: 'Fatorial é o produto decrescente até 1: 4! = 4 × 3 × 2 × 1 = 24.',
      }),
    ],
  }),
];

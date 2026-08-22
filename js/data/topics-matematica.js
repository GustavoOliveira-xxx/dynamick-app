/**
 * Conteúdo autoral de desenvolvimento — Conscious Knowledge.
 * Nenhuma questão foi copiada de prova oficial, livro ou plataforma de terceiros.
 */

export const MATEMATICA_TOPICS = [
  {
    slug: 'porcentagem-e-variacao',
    name: 'Porcentagem e variação',
    subjectSlug: 'matematica',
    areaSlug: 'matematica',
    summary:
      'Aumento, desconto, variação percentual e a diferença entre variação sobre o valor inicial e sobre o final.',
    difficulty: 'intro',
    estimatedMinutes: 20,
    curationWeight: 98,
    order: 1,
    related: ['leitura-de-graficos-e-tabelas'],
    skills: [
      {
        slug: 'resolver-situacoes-com-variacao-percentual',
        name: 'Resolver situações com aumento, desconto, proporção e variação percentual',
        description:
          'Aplicar fatores multiplicativos, calcular variação relativa e identificar sobre qual base o percentual incide.',
      },
    ],
    content: [
      {
        slug: 'porcentagem-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `Porcentagem é comparação com 100. **25% de 80** = 0,25 × 80 = 20.

**Trabalhe com fator multiplicativo** — economiza tempo e evita erro:

| Situação | Fator |
| --- | --- |
| Aumento de 10% | × 1,10 |
| Desconto de 10% | × 0,90 |
| Aumento de 100% | × 2,00 |
| Desconto de 50% | × 0,50 |

**Variações em sequência multiplicam, não somam.**
Aumentar 10% e depois dar 10% de desconto: 1,10 × 0,90 = **0,99** → perda de 1%, não empate.

**A pergunta decisiva:** *percentual sobre qual valor?* Sair de 40 para 50 é aumento de **25%** (10/40). Voltar de 50 para 40 é queda de **20%** (10/50). Mesma diferença absoluta, percentuais diferentes.`,
      },
      {
        slug: 'porcentagem-explicacao',
        kind: 'explanation',
        title: 'Fator multiplicativo, variação e a base de comparação',
        depth: 'standard',
        order: 2,
        body: `### 1. O fator multiplicativo

Em vez de calcular a parte e depois somar, multiplique direto:

- Aumento de \`p\`%: fator = \`1 + p/100\`
- Desconto de \`p\`%: fator = \`1 − p/100\`

Um produto de R$ 200 com 15% de desconto: 200 × 0,85 = **R$ 170**. Um passo, não dois.

### 2. Variações sucessivas

Multiplique os fatores. Nunca some os percentuais.

Exemplo: um preço sobe 20% e depois cai 20%.
\`1,20 × 0,80 = 0,96\` → o preço final é **4% menor** que o original.

O motivo: o aumento incidiu sobre o valor menor; a queda incidiu sobre o valor maior.

### 3. Variação percentual (a fórmula que resolve metade das questões)

\`variação = (valor final − valor inicial) / valor inicial × 100\`

O denominador é **sempre o valor de onde você partiu**. Esse é o erro mais comum da prova.

- De 80 para 100: (100−80)/80 = 0,25 → **+25%**
- De 100 para 80: (80−100)/100 = −0,20 → **−20%**

### 4. Ponto percentual ≠ porcentagem

Se uma taxa vai de 5% para 7%:
- Aumento de **2 pontos percentuais**.
- Aumento de **40%** (2/5) em termos relativos.

As duas leituras estão certas — e questões costumam apresentar uma como se fosse a outra.

### 5. Descontos "acumulados" da publicidade

"30% + 20% de desconto" **não é 50%**. É \`0,70 × 0,80 = 0,56\` → desconto real de **44%**.`,
      },
      {
        slug: 'porcentagem-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — aumento e desconto em sequência',
        order: 3,
        body: `**Situação:** um curso custava R$ 480. Em janeiro, aumentou 25%. Em março, ofereceu 20% de desconto sobre o novo valor. Quanto custa agora?

**Passo 1 — fatores:** aumento 25% → 1,25 · desconto 20% → 0,80

**Passo 2 — multiplique:** 480 × 1,25 × 0,80

**Passo 3 — calcule:** 480 × 1,25 = 600 · 600 × 0,80 = **R$ 480**

**Leitura do resultado:** voltou ao valor original. Isso acontece porque 1,25 × 0,80 = 1,00 exatamente.

**Atenção:** isso é coincidência dos números escolhidos, não regra. Com 25% e 25%, daria 1,25 × 0,75 = 0,9375 → 6,25% de queda.`,
      },
      {
        slug: 'porcentagem-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — a base da comparação',
        order: 4,
        body: `**Situação:** uma cidade tinha 250 leitos e passou a ter 300. Um jornal diz "aumento de 20%"; outro diz "aumento de 50 leitos, cerca de 17% do novo total". Quem está certo?

**Cálculo da variação:** (300 − 250)/250 = 50/250 = 0,20 → **+20%**

**O segundo cálculo:** 50/300 ≈ 0,167 → 16,7%. Esse número existe, mas responde outra pergunta: "os leitos novos representam quanto do total atual?".

**Conclusão:** para **variação**, a base é sempre o valor inicial. O segundo jornal calculou uma **participação**, não uma variação — e chamou pelo nome errado.`,
      },
      {
        slug: 'porcentagem-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Somar percentuais sucessivos.**
"Subiu 10% e depois 10%" não é 20%. É 1,1 × 1,1 = 1,21 → 21%. Multiplique sempre.

**2. Usar a base errada na variação.**
Dividir pelo valor final em vez do inicial. Regra fixa: o denominador é **de onde você saiu**.

**3. Confundir ponto percentual com porcentagem.**
De 4% para 6% são 2 pontos percentuais e 50% de aumento relativo. Leia o enunciado com atenção: ele diz qual das duas quer.`,
      },
      {
        slug: 'porcentagem-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Por que um aumento de 50% seguido de um desconto de 50% **não** devolve o valor original?
2. Qual é o denominador da fórmula de variação percentual, e por quê?
3. Dê um exemplo em que "2 pontos percentuais" e "40% de aumento" descrevem a mesma mudança.`,
      },
    ],
    questions: [
      {
        slug: 'q-porc-1',
        stem:
          'Um produto que custava R$ 250,00 passou a custar R$ 300,00.\n\nQual foi a variação percentual do preço?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'aplicação direta da fórmula de variação',
        estimatedSeconds: 90,
        skillSlug: 'resolver-situacoes-com-variacao-percentual',
        likelyErrors: ['usar o valor final como base', 'confundir variação com participação'],
        options: [
          { label: 'A', text: '16,7%', rationale: 'Esse é 50/300 — divide pelo valor final. A variação usa o valor inicial como base.', errorHint: 'base errada na divisão' },
          { label: 'B', text: '20%', isCorrect: true, rationale: '(300 − 250)/250 = 50/250 = 0,20 → 20%. O denominador é o valor de onde se partiu.' },
          { label: 'C', text: '25%', rationale: 'Resultado de 50/200. Nem 200 nem qualquer outro valor do enunciado justifica esse denominador.', errorHint: 'erro de leitura do valor inicial' },
          { label: 'D', text: '50%', rationale: 'Confunde a diferença absoluta (50 reais) com o percentual.', errorHint: 'usar a diferença absoluta como percentual' },
          { label: 'E', text: '83,3%', rationale: 'Corresponde a 250/300, que é a razão entre os preços, não a variação.', errorHint: 'calcular razão em vez de variação' },
        ],
        explanation: {
          summary: 'A resposta é B. Variação = (final − inicial)/inicial = 50/250 = 20%.',
          strategy: 'Antes de dividir, escreva no papel: "de onde eu saí?". Esse valor é o denominador.',
          conceptRecap: 'O denominador da variação percentual é sempre o valor inicial.',
        },
      },
      {
        slug: 'q-porc-2',
        stem:
          'Uma loja anuncia: "30% de desconto e, na segunda peça, mais 20% sobre o valor já com desconto."\n\nUma peça de R$ 200,00 comprada como segunda peça sairá por quanto, e qual é o desconto total equivalente?',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'descontos sucessivos em situação de compra',
        estimatedSeconds: 120,
        skillSlug: 'resolver-situacoes-com-variacao-percentual',
        likelyErrors: ['somar os percentuais', 'aplicar os dois descontos sobre o valor cheio'],
        options: [
          { label: 'A', text: 'R$ 100,00, com desconto total de 50%.', rationale: 'Somar 30% + 20% é o erro clássico: o segundo desconto incide sobre um valor já reduzido, não sobre os R$ 200.', errorHint: 'somar percentuais sucessivos' },
          { label: 'B', text: 'R$ 112,00, com desconto total de 44%.', isCorrect: true, rationale: '200 × 0,70 = 140; 140 × 0,80 = 112. Como 0,70 × 0,80 = 0,56, o desconto equivalente é 44%.' },
          { label: 'C', text: 'R$ 140,00, com desconto total de 30%.', rationale: 'Esse é o valor após apenas o primeiro desconto — o segundo foi ignorado.', errorHint: 'esquecer a segunda etapa' },
          { label: 'D', text: 'R$ 120,00, com desconto total de 40%.', rationale: 'Corresponde a um único desconto de 40%, que não é o resultado da composição dos dois.', errorHint: 'estimar sem calcular' },
          { label: 'E', text: 'R$ 112,00, com desconto total de 56%.', rationale: 'O valor final está correto, mas 56% é o fator que resta (0,56), não o desconto. O desconto é 1 − 0,56 = 44%.', errorHint: 'confundir fator restante com desconto' },
        ],
        explanation: {
          summary: 'A resposta é B. 200 × 0,70 × 0,80 = 112. O desconto equivalente é 1 − 0,56 = 44%.',
          detailed: 'A opção que apresenta 56% como desconto é a mais perigosa: acerta a conta e erra a leitura. 0,56 é quanto você **paga**; o desconto é o que **sobra do 1**.',
          strategy: 'Multiplique fatores, depois traduza: fator 0,56 significa pagar 56% e economizar 44%.',
        },
      },
      {
        slug: 'q-porc-3',
        stem:
          'Uma pesquisa sobre transporte apresentou os dados:\n\n| Ano | Domicílios com bicicleta |\n| --- | --- |\n| 2023 | 8% |\n| 2026 | 11% |\n\nUm site publicou: "O uso de bicicleta cresceu 3%." Outro publicou: "O uso de bicicleta cresceu 37,5%."\n\nSobre as duas manchetes:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'ponto percentual x variação relativa',
        estimatedSeconds: 130,
        skillSlug: 'resolver-situacoes-com-variacao-percentual',
        likelyErrors: ['confundir ponto percentual com porcentagem', 'considerar uma delas falsa'],
        options: [
          { label: 'A', text: 'A primeira confunde ponto percentual com porcentagem; a segunda calcula corretamente a variação relativa.', isCorrect: true, rationale: 'A diferença é de 3 pontos percentuais. Em variação relativa: (11−8)/8 = 0,375 → 37,5%. A primeira manchete usa a unidade errada.' },
          { label: 'B', text: 'Ambas estão corretas e dizem exatamente a mesma coisa.', rationale: 'Descrevem a mesma mudança, mas não a mesma medida: 3 pontos percentuais e 37,5% são grandezas distintas.', errorHint: 'tratar pontos percentuais e porcentagem como sinônimos' },
          { label: 'C', text: 'Ambas estão erradas, pois o crescimento foi de 11%.', rationale: '11% é o valor final, não o crescimento.', errorHint: 'confundir valor final com variação' },
          { label: 'D', text: 'A segunda está errada, pois percentual de percentual não existe.', rationale: 'Variação relativa entre dois percentuais é operação válida e comum em estatística.', errorHint: 'rejeitar operação válida' },
          { label: 'E', text: 'A primeira está correta e a segunda exagera o resultado.', rationale: 'A primeira erra a unidade; a segunda aplica corretamente a fórmula de variação.', errorHint: 'julgar pelo tamanho do número' },
        ],
        explanation: {
          summary: 'A resposta é A. São 3 **pontos percentuais** de diferença, o que equivale a 37,5% de variação relativa.',
          detailed: 'Esse par de leituras aparece com frequência em notícias sobre desemprego, inflação e cobertura de serviços. Saber qual está sendo usada muda completamente a percepção do dado.',
          conceptRecap: 'Ponto percentual mede a diferença entre dois percentuais; porcentagem mede a variação relativa entre eles.',
        },
      },
      {
        slug: 'q-porc-4',
        stem:
          'Considere duas situações:\n\nI. Um salário de R$ 2.000 recebe aumento de 10% e, no ano seguinte, novo aumento de 10%.\nII. O mesmo salário de R$ 2.000 recebe um único aumento de 21%.\n\nComparando os resultados finais:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'comparação entre aumentos sucessivos e único',
        estimatedSeconds: 120,
        skillSlug: 'resolver-situacoes-com-variacao-percentual',
        likelyErrors: ['somar percentuais', 'assumir diferença sem calcular'],
        options: [
          { label: 'A', text: 'Os dois resultam no mesmo valor final.', isCorrect: true, rationale: '1,10 × 1,10 = 1,21, exatamente o fator de um aumento único de 21%. Ambos chegam a R$ 2.420.' },
          { label: 'B', text: 'A situação I resulta em valor maior.', rationale: 'Seria verdade se o aumento único fosse de 20%. Com 21%, os fatores se igualam.', errorHint: 'lembrar a regra geral sem conferir o número' },
          { label: 'C', text: 'A situação II resulta em valor maior.', rationale: 'Os fatores são idênticos (1,21), então não há vantagem para nenhuma das duas.', errorHint: 'estimar sem multiplicar' },
          { label: 'D', text: 'A situação I resulta em R$ 2.400 e a II, em R$ 2.420.', rationale: 'R$ 2.400 corresponderia a somar os percentuais (20%), o que não é como aumentos sucessivos funcionam.', errorHint: 'somar percentuais sucessivos' },
          { label: 'E', text: 'Não é possível comparar sem saber o intervalo entre os aumentos.', rationale: 'O intervalo de tempo não altera o valor final quando os percentuais são dados.', errorHint: 'introduzir variável irrelevante' },
        ],
        explanation: {
          summary: 'A resposta é A. 1,10 × 1,10 = 1,21 → os dois caminhos chegam a R$ 2.420.',
          detailed: 'O ponto da questão é que "10% duas vezes" equivale a 21%, e não a 20%. O 1% extra vem do aumento incidindo sobre o valor já aumentado.',
          strategy: 'Sempre converta para fatores e multiplique antes de comparar.',
        },
      },
      {
        slug: 'q-porc-5',
        stem:
          'Uma família gasta R$ 900 por mês em alimentação, o que corresponde a 30% da renda mensal. No mês seguinte, a renda cai 10% e o gasto com alimentação sobe 5%.\n\nQual passa a ser, aproximadamente, o percentual da renda comprometido com alimentação?',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre proporção e variação percentual',
        estimatedSeconds: 160,
        skillSlug: 'resolver-situacoes-com-variacao-percentual',
        likelyErrors: ['somar as variações', 'esquecer de recalcular a renda', 'não achar a renda inicial'],
        options: [
          { label: 'A', text: 'Cerca de 35%.', isCorrect: true, rationale: 'Renda inicial = 900/0,30 = R$ 3.000. Nova renda = 2.700. Novo gasto = 945. 945/2.700 = 0,35 → 35%.' },
          { label: 'B', text: 'Cerca de 32%.', rationale: 'Resultado de somar as duas variações (30% + 5% − ...), sem recalcular a razão entre os novos valores.', errorHint: 'somar variações em vez de recalcular a razão' },
          { label: 'C', text: 'Cerca de 31,5%.', rationale: 'Corresponde a aplicar apenas o aumento do gasto (30% × 1,05), ignorando a queda da renda.', errorHint: 'considerar só uma das mudanças' },
          { label: 'D', text: 'Cerca de 27%.', rationale: 'Aplica a queda de 10% ao percentual, o que inverte o efeito: renda menor aumenta o peso do gasto.', errorHint: 'inverter o sentido do efeito' },
          { label: 'E', text: 'Continua em 30%, pois as variações se compensam.', rationale: 'As variações têm sentidos que se somam no mesmo efeito: renda menor e gasto maior aumentam o comprometimento.', errorHint: 'supor compensação sem verificar' },
        ],
        explanation: {
          summary: 'A resposta é A. Renda inicial R$ 3.000 → R$ 2.700; gasto R$ 900 → R$ 945; 945/2.700 = 35%.',
          detailed: 'A questão integra três passos: recuperar o valor inicial a partir de um percentual, aplicar duas variações independentes e recalcular a proporção. Nenhum atalho por soma de percentuais funciona aqui.',
          strategy: 'Quando o enunciado dá um percentual e um valor, comece encontrando o total. Depois trabalhe com valores absolutos.',
          conceptRecap: 'Percentual de participação precisa ser recalculado quando numerador e denominador mudam.',
        },
      },
      {
        slug: 'q-porc-rec-1',
        stem: 'Um item de R$ 80,00 recebe 15% de desconto. Qual é o valor final?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'fator multiplicativo de desconto',
        estimatedSeconds: 70,
        isRecovery: true,
        skillSlug: 'resolver-situacoes-com-variacao-percentual',
        likelyErrors: ['calcular só o desconto'],
        options: [
          { label: 'A', text: 'R$ 12,00', rationale: 'Esse é o valor do desconto (15% de 80), não o preço final.', errorHint: 'parar no cálculo da parte' },
          { label: 'B', text: 'R$ 65,00', rationale: 'Corresponde a um desconto de R$ 15, e não de 15%.', errorHint: 'confundir percentual com valor absoluto' },
          { label: 'C', text: 'R$ 68,00', isCorrect: true, rationale: '80 × 0,85 = 68. Usar o fator resolve em uma operação.' },
          { label: 'D', text: 'R$ 72,00', rationale: 'Corresponde a 10% de desconto.', errorHint: 'arredondar o percentual' },
          { label: 'E', text: 'R$ 92,00', rationale: 'Aplicou aumento em vez de desconto.', errorHint: 'inverter o sentido da variação' },
        ],
        explanation: { summary: 'A resposta é C. Desconto de 15% → fator 0,85 → 80 × 0,85 = R$ 68,00.' },
      },
      {
        slug: 'q-porc-rec-2',
        stem:
          'O número de inscritos em uma atividade caiu de 120 para 96.\n\nQual foi a queda percentual?',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'variação percentual negativa',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'resolver-situacoes-com-variacao-percentual',
        likelyErrors: ['usar base errada'],
        options: [
          { label: 'A', text: '20%', isCorrect: true, rationale: '(96 − 120)/120 = −24/120 = −0,20 → queda de 20%.' },
          { label: 'B', text: '24%', rationale: 'Usa a diferença absoluta (24) como se fosse o percentual.', errorHint: 'confundir diferença com percentual' },
          { label: 'C', text: '25%', rationale: 'Resultado de 24/96 — divide pelo valor final em vez do inicial.', errorHint: 'base errada' },
          { label: 'D', text: '80%', rationale: 'É a razão 96/120, ou seja, quanto restou, não quanto caiu.', errorHint: 'confundir proporção restante com variação' },
          { label: 'E', text: '4%', rationale: 'Não corresponde a nenhuma operação válida com os dados.', errorHint: 'chute' },
        ],
        explanation: {
          summary: 'A resposta é A. A base é 120 (valor inicial): 24/120 = 20% de queda.',
          conceptRecap: 'Queda de 20% deixa 80% do valor: 120 × 0,80 = 96 confirma o resultado.',
        },
      },
    ],
  },
  {
    slug: 'leitura-de-graficos-e-tabelas',
    name: 'Leitura de gráficos e tabelas',
    subjectSlug: 'matematica',
    areaSlug: 'matematica',
    summary:
      'Extrair, comparar e interpretar dados — e reconhecer quando a apresentação distorce a leitura.',
    difficulty: 'intro',
    estimatedMinutes: 20,
    curationWeight: 96,
    order: 2,
    prerequisites: ['porcentagem-e-variacao'],
    skills: [
      {
        slug: 'extrair-comparar-interpretar-dados',
        name: 'Extrair, comparar e interpretar dados',
        description:
          'Ler valores, comparar séries, calcular variações e identificar limitações e distorções da representação.',
      },
    ],
    content: [
      {
        slug: 'graficos-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `Antes de olhar as barras, leia **três coisas**:

1. **O título** — o que está sendo medido?
2. **As unidades** — reais, milhares, percentual, por 100 mil habitantes?
3. **O eixo vertical** — começa em zero?

Eixo cortado é a distorção mais comum: uma diferença de 2% vira uma montanha visual.

**Cada gráfico serve a uma pergunta:**
| Gráfico | Responde |
| --- | --- |
| Barras | quem é maior? |
| Linhas | como evoluiu no tempo? |
| Setores (pizza) | qual a participação no total? |
| Dispersão | duas grandezas andam juntas? |

E o alerta que mais cai: **correlação não é causa**.`,
      },
      {
        slug: 'graficos-explicacao',
        kind: 'explanation',
        title: 'Ler, comparar e desconfiar',
        depth: 'standard',
        order: 2,
        body: `### 1. Valor absoluto x valor relativo

Uma cidade com 500 casos e 5 milhões de habitantes tem situação melhor que outra com 100 casos e 200 mil habitantes:
- 500/5.000.000 = 10 por 100 mil
- 100/200.000 = 50 por 100 mil

Quando as populações diferem, comparar números absolutos leva à conclusão errada. Procure a **taxa**.

### 2. O eixo que não começa em zero

Em um gráfico de barras cujo eixo vai de 48 a 52, uma diferença de 1 ponto ocupa metade da altura. A leitura visual sugere um abismo; o dado mostra estabilidade.

**Como se defender:** leia os números do eixo antes de olhar a forma. Sempre.

### 3. Total x parte

Em gráficos de setores, as fatias somam 100% **daquele recorte**. Se o recorte for "entre os que responderam", a fatia não representa a população inteira.

### 4. Tendência x oscilação

Três pontos não fazem tendência. Séries com variação sazonal (vendas em dezembro, energia no verão) sobem e descem todo ano. Comparar dezembro com janeiro e concluir "queda" ignora o padrão.

Compare **o mesmo período de anos diferentes** quando houver sazonalidade.

### 5. Correlação não é causa

Duas séries podem subir juntas por acaso, por causa comum ou por causalidade real. O gráfico sozinho **nunca** distingue essas três hipóteses. Alternativas que afirmam "X causou Y" a partir de um gráfico costumam estar erradas.`,
      },
      {
        slug: 'graficos-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — comparar com base diferente',
        order: 3,
        body: `**Dados:**

| Escola | Aprovados | Total de alunos |
| --- | --- | --- |
| A | 180 | 400 |
| B | 120 | 200 |

**Pergunta:** qual escola teve melhor desempenho?

**Erro comum:** A, porque tem mais aprovados (180 > 120).

**Cálculo correto:**
- A: 180/400 = 45%
- B: 120/200 = 60%

**Resposta:** B teve melhor desempenho proporcional, mesmo com menos aprovados em números absolutos.

**Cuidado extra:** a questão pode perguntar "qual formou mais estudantes?" — aí a resposta é A. Leia o comando: absoluto ou proporcional?`,
      },
      {
        slug: 'graficos-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — o eixo cortado',
        order: 4,
        body: `**Situação:** um gráfico de barras compara a satisfação com dois serviços. As barras têm alturas visivelmente diferentes — uma parece o dobro da outra. O eixo vertical vai de **70 a 76**.

**Valores reais:** serviço 1 = 72; serviço 2 = 75.

**Análise:**
- Diferença real: 3 pontos, ou 4,2% em termos relativos (3/72).
- Diferença visual: a barra de 75 ocupa quase o dobro da área acima da base 70.

**Conclusão:** a diferença existe, mas é pequena. O gráfico exagera porque a base não é zero.

**O que uma questão pode pedir:** identificar a distorção, ou calcular a diferença real. Nos dois casos, a resposta vem dos **números**, não da forma.`,
      },
      {
        slug: 'graficos-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Comparar absolutos quando as bases são diferentes.**
Cidades, escolas e países com tamanhos distintos só se comparam por taxa.

**2. Ler a forma antes dos números.**
O cérebro compara alturas em um instante. Se o eixo estiver cortado, essa comparação instantânea está errada. Leia o eixo primeiro.

**3. Transformar correlação em causa.**
"As duas linhas subiram juntas, logo uma causou a outra" é a conclusão mais tentadora e mais frequentemente errada em provas.`,
      },
      {
        slug: 'graficos-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Por que um gráfico com eixo começando em 70 pode induzir a erro mesmo com dados corretos?
2. Quando comparar números absolutos é adequado e quando é enganoso?
3. Que tipos de explicação alternativa existem quando duas séries sobem juntas?`,
      },
    ],
    questions: [
      {
        slug: 'q-graf-1',
        stem:
          'A tabela mostra o número de atendimentos em duas unidades de saúde:\n\n| Unidade | Atendimentos | População atendida |\n| --- | --- | --- |\n| Norte | 4.500 | 30.000 |\n| Sul | 3.000 | 15.000 |\n\nQual unidade apresenta maior número de atendimentos por habitante?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'cálculo de taxa a partir de tabela',
        estimatedSeconds: 100,
        skillSlug: 'extrair-comparar-interpretar-dados',
        likelyErrors: ['comparar valores absolutos', 'inverter a razão'],
        options: [
          { label: 'A', text: 'Norte, pois realizou mais atendimentos.', rationale: 'O número absoluto é maior, mas a população também é o dobro. A comparação precisa ser proporcional.', errorHint: 'comparar absolutos com bases diferentes' },
          { label: 'B', text: 'Sul, com 0,20 atendimento por habitante contra 0,15 da Norte.', isCorrect: true, rationale: 'Norte: 4.500/30.000 = 0,15. Sul: 3.000/15.000 = 0,20. A Sul atende proporcionalmente mais.' },
          { label: 'C', text: 'As duas têm a mesma taxa.', rationale: 'As taxas são 0,15 e 0,20 — diferentes.', errorHint: 'assumir equivalência sem calcular' },
          { label: 'D', text: 'Norte, com 6,67 habitantes por atendimento.', rationale: 'O cálculo está certo (30.000/4.500), mas a razão invertida favorece quem tem MENOS habitantes por atendimento: a Sul tem 5.', errorHint: 'inverter a razão e ler ao contrário' },
          { label: 'E', text: 'Não é possível comparar sem saber o número de profissionais.', rationale: 'A pergunta é sobre atendimentos por habitante, e os dois dados necessários estão na tabela.', errorHint: 'exigir dado desnecessário' },
        ],
        explanation: {
          summary: 'A resposta é B. Taxa = atendimentos ÷ população: 0,15 (Norte) contra 0,20 (Sul).',
          strategy: 'Sempre que as bases forem diferentes, converta para taxa antes de comparar.',
        },
      },
      {
        slug: 'q-graf-2',
        stem:
          'Um relatório apresenta o consumo médio de energia de uma residência ao longo de um ano. Os valores de janeiro e julho são os mais altos; abril e outubro, os mais baixos.\n\nUm leitor conclui: "O consumo caiu de janeiro para abril, portanto a campanha de economia lançada em fevereiro funcionou."\n\nA principal fragilidade dessa conclusão é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'sazonalidade e atribuição de causa',
        estimatedSeconds: 120,
        skillSlug: 'extrair-comparar-interpretar-dados',
        likelyErrors: ['ignorar sazonalidade', 'atribuir causa a partir de série temporal'],
        options: [
          { label: 'A', text: 'A queda pode refletir variação sazonal, e não o efeito da campanha.', isCorrect: true, rationale: 'A própria série indica padrão sazonal (picos em janeiro e julho). Sem comparar com o mesmo período de outros anos, não é possível separar a campanha do padrão.' },
          { label: 'B', text: 'Os dados de consumo não podem ser comparados entre meses diferentes.', rationale: 'Podem ser comparados; a ressalva é sobre a interpretação causal, não sobre a comparabilidade.', errorHint: 'rejeitar comparação válida' },
          { label: 'C', text: 'O relatório não apresenta valores em reais, apenas em consumo.', rationale: 'A conclusão do leitor é sobre consumo, então a unidade é adequada.', errorHint: 'exigir dado irrelevante' },
          { label: 'D', text: 'A campanha começou em fevereiro, portanto não pode afetar abril.', rationale: 'Uma campanha de fevereiro pode, sim, afetar abril. O problema é outro: distinguir esse efeito da sazonalidade.', errorHint: 'rejeitar por razão errada' },
          { label: 'E', text: 'Séries temporais não permitem nenhum tipo de conclusão.', rationale: 'Permitem conclusões, desde que controlados os fatores que competem pela explicação.', errorHint: 'generalizar a cautela' },
        ],
        explanation: {
          summary: 'A resposta é A. Com padrão sazonal evidente, a queda entre janeiro e abril é esperada mesmo sem campanha alguma.',
          detailed: 'A forma de testar seria comparar abril deste ano com abril de anos anteriores. Comparar meses seguidos dentro de uma série sazonal não isola o efeito da intervenção.',
          conceptRecap: 'Em séries sazonais, compare o mesmo período de anos diferentes.',
        },
      },
      {
        slug: 'q-graf-3',
        stem:
          'Um gráfico de barras compara o índice de satisfação de dois serviços. As barras aparentam alturas muito diferentes. Consultando os eixos, verifica-se que o eixo vertical vai de 60 a 68, e que os valores são: Serviço A = 62 e Serviço B = 66.\n\nA leitura correta desses dados é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'identificação de distorção visual',
        estimatedSeconds: 120,
        skillSlug: 'extrair-comparar-interpretar-dados',
        likelyErrors: ['confiar na altura visual', 'negar a existência da diferença'],
        options: [
          { label: 'A', text: 'A diferença real é de 4 pontos (cerca de 6,5%), bem menor do que a impressão visual sugere.', isCorrect: true, rationale: '66 − 62 = 4 pontos; em termos relativos, 4/62 ≈ 6,5%. O eixo iniciado em 60 amplia visualmente essa diferença.' },
          { label: 'B', text: 'O serviço B tem satisfação aproximadamente duas vezes maior que o A.', rationale: 'Essa é exatamente a leitura induzida pelo eixo cortado. Os valores mostram diferença de 6,5%, não de 100%.', errorHint: 'ler a altura em vez do número' },
          { label: 'C', text: 'Não há diferença entre os serviços, pois o gráfico está distorcido.', rationale: 'A distorção é da representação, não dos dados. A diferença de 4 pontos existe.', errorHint: 'negar o dado por causa da forma' },
          { label: 'D', text: 'O gráfico é inválido e não permite nenhuma conclusão.', rationale: 'O gráfico é enganoso na forma, mas os valores dos eixos permitem a leitura correta.', errorHint: 'descartar dado utilizável' },
          { label: 'E', text: 'A diferença é de 4%, calculada como 66 − 62 dividido por 100.', rationale: 'Dividir por 100 pressupõe que o índice vá de 0 a 100 como base de variação, o que não é a fórmula de variação relativa.', errorHint: 'usar base arbitrária' },
        ],
        explanation: {
          summary: 'A resposta é A. Quatro pontos de diferença, cerca de 6,5% em termos relativos — a forma exagera, os números corrigem.',
          strategy: 'Leia os valores do eixo antes de comparar alturas. Sempre.',
        },
      },
      {
        slug: 'q-graf-4',
        stem:
          'Dois gráficos apresentam a mesma série de vendas mensais de uma empresa:\n\nI. Gráfico de linhas com eixo vertical de 0 a 500 mil.\nII. Gráfico de linhas com eixo vertical de 380 mil a 420 mil.\n\nSobre os dois gráficos, é correto afirmar:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'comparação entre escolhas de escala',
        estimatedSeconds: 130,
        skillSlug: 'extrair-comparar-interpretar-dados',
        likelyErrors: ['achar que um dos gráficos é falso', 'ignorar o propósito da escala'],
        options: [
          { label: 'A', text: 'Ambos representam os mesmos dados; I favorece a percepção de estabilidade e II, a de oscilação.', isCorrect: true, rationale: 'A escala não altera os dados, mas altera a leitura: escala ampla achata as variações; escala estreita as amplia. Nenhum é falso, mas cada um sugere uma narrativa.' },
          { label: 'B', text: 'O gráfico II apresenta dados incorretos, pois omite parte do eixo.', rationale: 'Omitir parte do eixo é escolha de escala, não erro de dado.', errorHint: 'confundir escolha de escala com erro' },
          { label: 'C', text: 'Apenas o gráfico I pode ser usado em publicações sérias.', rationale: 'Escalas estreitas são legítimas quando o objetivo é examinar variações pequenas — desde que o eixo esteja visível.', errorHint: 'regra rígida sem considerar o objetivo' },
          { label: 'D', text: 'Os dois gráficos levarão qualquer leitor à mesma conclusão.', rationale: 'A percepção visual muda de forma significativa, mesmo com dados idênticos.', errorHint: 'ignorar o efeito da representação' },
          { label: 'E', text: 'O gráfico I exagera as variações da série.', rationale: 'É o contrário: a escala ampla reduz a percepção das variações.', errorHint: 'inverter o efeito da escala' },
        ],
        explanation: {
          summary: 'A resposta é A. Mesmos dados, leituras diferentes: a escala é uma escolha comunicativa.',
          detailed: 'A conclusão útil não é "gráfico com eixo cortado mente", e sim "a escala precisa ser lida antes da forma, e escolhida de acordo com a pergunta".',
        },
      },
      {
        slug: 'q-graf-5',
        stem:
          'Um estudo apresenta um gráfico de dispersão relacionando, para 40 municípios, o número de bibliotecas públicas e o índice de desempenho escolar. Os pontos indicam associação positiva.\n\nQual conclusão é sustentada pelo gráfico?',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre correlação, causa e variáveis de confusão',
        estimatedSeconds: 150,
        skillSlug: 'extrair-comparar-interpretar-dados',
        likelyErrors: ['afirmar causalidade', 'descartar a associação'],
        options: [
          { label: 'A', text: 'Existe associação positiva entre as variáveis, o que não permite concluir, isoladamente, que uma cause a outra.', isCorrect: true, rationale: 'O gráfico mostra associação. Municípios com mais recursos podem ter simultaneamente mais bibliotecas e melhor desempenho — uma terceira variável explicando as duas.' },
          { label: 'B', text: 'A construção de bibliotecas eleva o desempenho escolar dos municípios.', rationale: 'Essa é a conclusão causal que o gráfico não sustenta: correlação não distingue causa, causa comum e coincidência.', errorHint: 'transformar correlação em causa' },
          { label: 'C', text: 'O desempenho escolar determina quantas bibliotecas um município constrói.', rationale: 'Inverte a direção, mas comete o mesmo erro: atribuir causalidade a partir de associação.', errorHint: 'causalidade invertida' },
          { label: 'D', text: 'Como há exceções entre os pontos, não existe relação alguma entre as variáveis.', rationale: 'Dispersão com exceções ainda pode indicar associação. A presença de casos fora do padrão não anula a tendência.', errorHint: 'exigir relação perfeita' },
          { label: 'E', text: 'A associação observada só teria validade com mais de 100 municípios.', rationale: 'Não existe limiar fixo de 100 observações; o tamanho adequado depende do desenho do estudo.', errorHint: 'inventar critério estatístico' },
        ],
        explanation: {
          summary: 'A resposta é A. O gráfico estabelece associação; causalidade exige desenho de estudo que controle outras explicações.',
          detailed: 'A explicação alternativa mais provável aqui é a renda do município: cidades com mais orçamento tendem a ter mais bibliotecas E melhores indicadores educacionais. Essa terceira variável produziria a mesma associação sem qualquer relação causal direta.',
          conceptRecap: 'Associação é o que o gráfico mostra. Causa é uma hipótese que precisa de mais evidência.',
        },
      },
      {
        slug: 'q-graf-rec-1',
        stem:
          'Em um gráfico de setores sobre meios de transporte usados para ir ao trabalho, a fatia "ônibus" corresponde a 35% e a fatia "a pé" a 15%. O total de entrevistados foi 800.\n\nQuantas pessoas usam ônibus a mais do que vão a pé?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'leitura de gráfico de setores',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'extrair-comparar-interpretar-dados',
        likelyErrors: ['responder em percentual'],
        options: [
          { label: 'A', text: '20 pessoas', rationale: 'Esse é o valor da diferença percentual (20), não o número de pessoas.', errorHint: 'confundir pontos percentuais com pessoas' },
          { label: 'B', text: '160 pessoas', isCorrect: true, rationale: '20% de 800 = 160. Ou: 280 (ônibus) − 120 (a pé) = 160.' },
          { label: 'C', text: '280 pessoas', rationale: 'É o total de usuários de ônibus, não a diferença.', errorHint: 'responder o valor de uma das fatias' },
          { label: 'D', text: '400 pessoas', rationale: 'Corresponde a metade dos entrevistados, valor não relacionado às fatias citadas.', errorHint: 'chute' },
          { label: 'E', text: '120 pessoas', rationale: 'É o número de quem vai a pé.', errorHint: 'responder a outra fatia' },
        ],
        explanation: { summary: 'A resposta é B. A diferença é de 20 pontos percentuais, e 20% de 800 = 160 pessoas.' },
      },
      {
        slug: 'q-graf-rec-2',
        stem:
          'Uma série mostra o número de inscrições em um curso: 120, 118, 125, 122 e 127 nos últimos cinco semestres.\n\nA leitura mais adequada dessa série é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'tendência x oscilação',
        estimatedSeconds: 100,
        isRecovery: true,
        skillSlug: 'extrair-comparar-interpretar-dados',
        likelyErrors: ['ver tendência em oscilação'],
        options: [
          { label: 'A', text: 'Os valores oscilam em torno de um patamar, com leve tendência de alta.', isCorrect: true, rationale: 'A variação total é de 9 inscrições sobre ~120 (cerca de 7%), com subidas e descidas. Descrever como estabilidade com leve alta é a leitura mais fiel.' },
          { label: 'B', text: 'Há crescimento constante ao longo dos cinco semestres.', rationale: 'Não é constante: houve queda do primeiro para o segundo e do terceiro para o quarto.', errorHint: 'ignorar as quedas intermediárias' },
          { label: 'C', text: 'Há queda acentuada nas inscrições.', rationale: 'O último valor é o maior da série.', errorHint: 'leitura contrária ao dado' },
          { label: 'D', text: 'A série indica que o curso dobrará de tamanho no próximo semestre.', rationale: 'Nada na série sustenta projeção de dobra.', errorHint: 'extrapolar projeção' },
          { label: 'E', text: 'Os dados são insuficientes para qualquer descrição.', rationale: 'Cinco pontos permitem descrever o comportamento observado, ainda que não permitam projeções firmes.', errorHint: 'excesso de cautela' },
        ],
        explanation: {
          summary: 'A resposta é A. Variações pequenas em ambas as direções indicam oscilação em torno de um patamar.',
          strategy: 'Antes de dizer "tendência", verifique se os movimentos são todos na mesma direção e se o tamanho da variação é relevante.',
        },
      },
    ],
  },
  {
    slug: 'funcoes-e-relacoes',
    name: 'Funções e relações',
    subjectSlug: 'matematica',
    areaSlug: 'matematica',
    summary:
      'Interpretar relações entre grandezas em tabelas, gráficos e expressões — e reconhecer o que cada modelo permite prever.',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    curationWeight: 92,
    order: 3,
    prerequisites: ['porcentagem-e-variacao', 'leitura-de-graficos-e-tabelas'],
    skills: [
      {
        slug: 'interpretar-relacoes-entre-grandezas',
        name: 'Interpretar relações entre grandezas em tabelas, gráficos e expressões',
        description:
          'Reconhecer padrões de variação, identificar o tipo de relação e traduzir entre as três representações.',
      },
    ],
    content: [
      {
        slug: 'funcoes-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `Função é uma **regra que liga duas grandezas**: para cada valor de entrada, um único valor de saída.

**Como identificar o tipo pela tabela:**

| Se a cada passo igual de x… | O tipo é |
| --- | --- |
| y muda pela mesma **soma** | linear (1º grau) |
| y muda pela mesma **multiplicação** | exponencial |
| a diferença das diferenças é constante | quadrática |

Na função do 1º grau \`y = ax + b\`:
- **b** é o valor quando x = 0 (o "ponto de partida", uma taxa fixa, uma taxa de adesão)
- **a** é quanto y muda a cada unidade de x (a "velocidade")

Em situações reais, \`b\` costuma ser a parte fixa da conta e \`a\`, a parte que depende do consumo.`,
      },
      {
        slug: 'funcoes-explicacao',
        kind: 'explanation',
        title: 'Reconhecer o padrão e escolher o modelo',
        depth: 'standard',
        order: 2,
        body: `### 1. O teste da tabela

Dados os pares (x, y), calcule as diferenças de y para passos iguais de x.

| x | y | diferença |
| --- | --- | --- |
| 0 | 50 | — |
| 1 | 70 | +20 |
| 2 | 90 | +20 |
| 3 | 110 | +20 |

Diferença constante → **função do 1º grau**. Aqui: \`y = 20x + 50\`.

Se em vez de somar sempre 20 os valores fossem 50, 75, 112,5 (multiplicando por 1,5), a relação seria **exponencial**.

### 2. Traduzir o contexto para a expressão

Um plano de internet cobra R$ 60 fixos mais R$ 4 por giga extra:
\`C(g) = 4g + 60\`

- \`60\` é o que se paga mesmo usando zero giga extra.
- \`4\` é o custo de cada giga adicional.

Pergunta típica: "a partir de quantos gigas o plano A fica mais caro que o B?" → iguale as duas expressões e resolva.

### 3. O ponto de encontro

Dois planos: \`A(g) = 4g + 60\` e \`B(g) = 6g + 40\`.

\`4g + 60 = 6g + 40 → 20 = 2g → g = 10\`

Interpretação: **com 10 gigas, os planos custam o mesmo**. Abaixo disso, B é mais barato (parte fixa menor); acima, A é mais barato (custo por giga menor).

Essa leitura — "quem é melhor antes e depois do encontro" — é o que a prova quase sempre pede.

### 4. O que o modelo não faz

Uma função ajustada a dados observados vale **dentro do intervalo observado**. Usar \`y = 20x + 50\` para prever x = 500 quando os dados vão até x = 5 é extrapolação sem garantia: modelos lineares raramente continuam lineares para sempre.`,
      },
      {
        slug: 'funcoes-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — da tabela para a expressão',
        order: 3,
        body: `**Tabela:** consumo de combustível de um trajeto

| Quilômetros | Litros no tanque |
| --- | --- |
| 0 | 45 |
| 100 | 37 |
| 200 | 29 |
| 300 | 21 |

**Passo 1 — as diferenças:** −8 a cada 100 km. Constante → função do 1º grau.

**Passo 2 — a taxa por km:** −8/100 = −0,08 litro por km.

**Passo 3 — o valor inicial:** 45 litros quando km = 0.

**Expressão:** \`L(k) = 45 − 0,08k\`

**Pergunta derivada:** quando o tanque zera?
\`45 − 0,08k = 0 → k = 562,5 km\`

**Ressalva importante:** o modelo supõe consumo constante. Em subida, trânsito ou velocidade alta, o consumo muda — a previsão é uma estimativa, não uma garantia.`,
      },
      {
        slug: 'funcoes-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — comparar dois planos',
        order: 4,
        body: `**Situação:** duas academias.
- Plano Mensal: R$ 120 por mês, sem taxa.
- Plano Anual: R$ 300 de matrícula + R$ 90 por mês.

**Expressões:** \`M(t) = 120t\` e \`A(t) = 90t + 300\`

**Ponto de encontro:**
\`120t = 90t + 300 → 30t = 300 → t = 10\`

**Leitura:**
- Até 10 meses: o mensal sai mais barato (não tem a matrícula).
- Exatamente 10 meses: custam o mesmo (R$ 1.200).
- Acima de 10 meses: o anual compensa (mensalidade menor).

**Erro comum:** responder apenas "t = 10" sem dizer o que acontece antes e depois. A questão quase sempre quer a interpretação, não o número.`,
      },
      {
        slug: 'funcoes-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Confundir o coeficiente angular com o valor inicial.**
Em \`y = 4x + 60\`, muita gente responde 4 quando a pergunta é sobre o valor fixo. O fixo é o que sobra quando x = 0: é 60.

**2. Assumir que toda relação é linear.**
Se as diferenças não forem constantes, a reta não serve. Confira a tabela antes de aplicar \`y = ax + b\`.

**3. Parar no ponto de encontro.**
Encontrar t = 10 é metade da resposta. A outra metade é dizer qual opção vale antes e qual vale depois.`,
      },
      {
        slug: 'funcoes-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Como você distingue, olhando só uma tabela, uma relação linear de uma exponencial?
2. Em uma conta de consumo, o que representa o coeficiente angular e o que representa o termo independente?
3. Por que o ponto de encontro entre dois planos raramente é a resposta completa de uma questão?`,
      },
    ],
    questions: [
      {
        slug: 'q-func-1',
        stem:
          'Uma operadora cobra R$ 45,00 fixos por mês mais R$ 0,80 por minuto de ligação excedente.\n\nA expressão que representa o valor total V, em função dos minutos excedentes m, é:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'tradução de contexto para expressão algébrica',
        estimatedSeconds: 90,
        skillSlug: 'interpretar-relacoes-entre-grandezas',
        likelyErrors: ['trocar coeficiente e termo independente'],
        options: [
          { label: 'A', text: 'V = 45m + 0,80', rationale: 'Isso cobraria R$ 45 por minuto e R$ 0,80 fixos — troca os papéis dos dois valores.', errorHint: 'inverter coeficiente e termo independente' },
          { label: 'B', text: 'V = 0,80m + 45', isCorrect: true, rationale: 'R$ 0,80 multiplica os minutos (varia com o uso) e R$ 45 é a parte fixa (existe mesmo com m = 0).' },
          { label: 'C', text: 'V = 45,80m', rationale: 'Somar os dois valores em um único coeficiente faria a parte fixa ser cobrada a cada minuto.', errorHint: 'somar valores de naturezas diferentes' },
          { label: 'D', text: 'V = 45 − 0,80m', rationale: 'O sinal negativo faria a conta diminuir com o uso, o oposto do descrito.', errorHint: 'errar o sinal da variação' },
          { label: 'E', text: 'V = 0,80(m + 45)', rationale: 'Aqui os R$ 45 entrariam como minutos, sendo multiplicados por 0,80 — resultaria em R$ 36 fixos.', errorHint: 'colocar o valor fixo dentro do parêntese' },
        ],
        explanation: {
          summary: 'A resposta é B. O que varia com o uso multiplica a variável; o que é fixo entra somando.',
          strategy: 'Teste com m = 0: a expressão correta deve devolver exatamente a parte fixa (R$ 45).',
        },
      },
      {
        slug: 'q-func-2',
        stem:
          'Duas empresas de entrega cobram:\n\n- Empresa X: R$ 12,00 fixos + R$ 2,00 por km\n- Empresa Y: R$ 20,00 fixos + R$ 1,50 por km\n\nA partir de quantos quilômetros a Empresa Y passa a ser mais barata?',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'ponto de equilíbrio entre duas funções lineares',
        estimatedSeconds: 130,
        skillSlug: 'interpretar-relacoes-entre-grandezas',
        likelyErrors: ['parar no ponto de igualdade', 'inverter qual é mais barata'],
        options: [
          { label: 'A', text: 'A partir de 8 km.', rationale: 'Em 8 km os preços não se igualam: X custa R$ 28 e Y custa R$ 32.', errorHint: 'erro de cálculo na equação' },
          { label: 'B', text: 'A partir de 16 km, pois em 16 km os preços se igualam e, acima disso, Y fica menor.', isCorrect: true, rationale: '12 + 2k = 20 + 1,5k → 0,5k = 8 → k = 16. Em 16 km ambos custam R$ 44; acima disso, o menor custo por km faz Y ganhar.' },
          { label: 'C', text: 'A partir de 16 km, pois abaixo disso Y já é mais barata.', rationale: 'O cálculo do ponto está certo, mas a leitura está invertida: abaixo de 16 km, X é mais barata por causa da taxa fixa menor.', errorHint: 'inverter a leitura do gráfico' },
          { label: 'D', text: 'Y nunca fica mais barata, pois sua taxa fixa é maior.', rationale: 'A taxa fixa maior é compensada pelo custo por km menor a partir de certa distância.', errorHint: 'considerar apenas a parte fixa' },
          { label: 'E', text: 'A partir de 4 km.', rationale: 'Resultado de dividir 8 por 2 em vez de por 0,5.', errorHint: 'erro na divisão final' },
        ],
        explanation: {
          summary: 'A resposta é B. O ponto de igualdade é 16 km; acima dele, Y é mais barata.',
          detailed: 'A opção que diz depender da distância mostra por que o número sozinho não basta: quem tem taxa fixa menor ganha nas distâncias curtas; quem tem custo por km menor ganha nas longas.',
          strategy: 'Depois de achar o ponto, teste um valor de cada lado para confirmar quem ganha onde.',
        },
      },
      {
        slug: 'q-func-3',
        stem:
          'A tabela mostra a população de uma colônia de bactérias:\n\n| Horas | População |\n| --- | --- |\n| 0 | 200 |\n| 1 | 400 |\n| 2 | 800 |\n| 3 | 1.600 |\n\nO tipo de relação e a expressão correspondente são:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'identificação de padrão em tabela',
        estimatedSeconds: 120,
        skillSlug: 'interpretar-relacoes-entre-grandezas',
        likelyErrors: ['assumir linearidade', 'confundir base e coeficiente'],
        options: [
          { label: 'A', text: 'Linear, P(t) = 200t + 200.', rationale: 'Se fosse linear, a diferença seria constante. Aqui as diferenças são 200, 400 e 800 — crescentes.', errorHint: 'aplicar modelo linear sem testar' },
          { label: 'B', text: 'Exponencial, P(t) = 200 · 2^t.', isCorrect: true, rationale: 'A cada hora a população é multiplicada por 2 (razão constante), e o valor inicial é 200. Confere: 200·2³ = 1.600.' },
          { label: 'C', text: 'Exponencial, P(t) = 2 · 200^t.', rationale: 'Inverte base e valor inicial: em t = 0 daria 2, não 200.', errorHint: 'trocar base por valor inicial' },
          { label: 'D', text: 'Quadrática, P(t) = 200t² + 200.', rationale: 'Em t = 1 daria 400, mas em t = 2 daria 1.000, e não 800.', errorHint: 'aceitar o modelo pelo primeiro ponto' },
          { label: 'E', text: 'Linear, P(t) = 400t.', rationale: 'Em t = 0 daria 0, contrariando o valor inicial de 200.', errorHint: 'ignorar o valor em t = 0' },
        ],
        explanation: {
          summary: 'A resposta é B. Razão constante entre valores consecutivos (×2) indica crescimento exponencial.',
          strategy: 'Teste soma primeiro; se a diferença não for constante, teste divisão. Razão constante = exponencial.',
          conceptRecap: 'Diferença constante → linear. Razão constante → exponencial.',
        },
      },
      {
        slug: 'q-func-4',
        stem:
          'Duas descrições foram propostas para a função C(x) = 25x + 150, que representa o custo total de produção de x unidades:\n\nI. Produzir uma unidade a mais aumenta o custo em R$ 25,00.\nII. O custo médio por unidade diminui conforme a produção aumenta.\n\nÉ correto o que se afirma em:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'custo marginal x custo médio',
        estimatedSeconds: 150,
        skillSlug: 'interpretar-relacoes-entre-grandezas',
        likelyErrors: ['confundir custo marginal com custo médio', 'rejeitar II por parecer contraditório'],
        options: [
          { label: 'A', text: 'I, apenas.', rationale: 'I está correta, mas II também: o custo fixo de R$ 150 se dilui entre mais unidades, reduzindo a média.', errorHint: 'não considerar a diluição do custo fixo' },
          { label: 'B', text: 'II, apenas.', rationale: 'II está correta, mas I também: o coeficiente 25 é exatamente o acréscimo por unidade adicional.', errorHint: 'não reconhecer o custo marginal' },
          { label: 'C', text: 'I e II.', isCorrect: true, rationale: 'I descreve o custo marginal (constante, R$ 25). II descreve o custo médio: C(x)/x = 25 + 150/x, que decresce à medida que x cresce.' },
          { label: 'D', text: 'Nenhuma das duas.', rationale: 'Ambas descrevem corretamente aspectos diferentes da mesma função.', errorHint: 'excesso de cautela' },
          { label: 'E', text: 'I e II, mas apenas para x maior que 150.', rationale: 'As duas afirmações valem para qualquer x positivo; 150 é o custo fixo, não um limiar.', errorHint: 'confundir valor do custo fixo com limite de validade' },
        ],
        explanation: {
          summary: 'A resposta é C. Custo marginal constante (R$ 25) e custo médio decrescente (25 + 150/x) coexistem sem contradição.',
          detailed: 'Verifique numericamente: com 10 unidades, o custo médio é 400/10 = R$ 40. Com 50 unidades, é 1.400/50 = R$ 28. A média cai porque os R$ 150 fixos se distribuem entre mais peças, enquanto cada peça adicional continua custando R$ 25.',
          conceptRecap: 'Custo marginal é o coeficiente angular. Custo médio inclui a diluição do custo fixo.',
        },
      },
      {
        slug: 'q-func-5',
        stem:
          'Uma prefeitura ajustou a função D(t) = 3,5t + 42 para o número de dias com boa qualidade do ar por trimestre, com t medido em trimestres desde 2024, usando dados de 8 trimestres observados.\n\nUm gestor usa a função para projetar t = 40 (dez anos à frente) e obtém 182 dias.\n\nA principal limitação dessa projeção é:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'validade do modelo e extrapolação',
        estimatedSeconds: 160,
        skillSlug: 'interpretar-relacoes-entre-grandezas',
        likelyErrors: ['aceitar extrapolação sem ressalva', 'apontar erro de cálculo inexistente'],
        options: [
          { label: 'A', text: 'A projeção extrapola muito além do intervalo observado e, além disso, resulta em valor incompatível com o número de dias de um trimestre.', isCorrect: true, rationale: 'O ajuste vale para 8 trimestres; t = 40 está cinco vezes além. E 182 dias excede os ~91 dias de um trimestre, o que mostra que o modelo linear perde sentido físico muito antes disso.' },
          { label: 'B', text: 'O cálculo está incorreto: 3,5 × 40 + 42 não resulta em 182.', rationale: '3,5 × 40 = 140; 140 + 42 = 182. O cálculo está certo — o problema é de interpretação, não de aritmética.', errorHint: 'procurar erro de conta onde não há' },
          { label: 'C', text: 'Funções do 1º grau não podem ser usadas para projeções em nenhum caso.', rationale: 'Podem, dentro do intervalo observado e com ressalvas. A limitação é de alcance, não de tipo de função.', errorHint: 'generalizar a restrição' },
          { label: 'D', text: 'O valor de t deveria ser medido em anos, e não em trimestres.', rationale: 'A unidade está declarada no enunciado e é coerente com o ajuste.', errorHint: 'inventar inconsistência de unidade' },
          { label: 'E', text: 'A função deveria ter coeficiente angular negativo, pois a qualidade do ar tende a piorar.', rationale: 'O sinal do coeficiente vem dos dados observados, não de uma expectativa sobre o tema.', errorHint: 'substituir dado por opinião' },
        ],
        explanation: {
          summary: 'A resposta é A. Dois problemas se somam: extrapolação muito além dos dados e resultado impossível no contexto.',
          detailed: 'O limite físico é o teste mais rápido: um trimestre tem cerca de 91 dias. A função ultrapassa esse teto quando 3,5t + 42 > 91, ou seja, a partir de t ≈ 14 — bem antes de t = 40. Modelos lineares descrevem bem trechos curtos e falham em horizontes longos.',
          strategy: 'Sempre confronte o resultado de uma projeção com os limites do contexto antes de aceitá-la.',
          conceptRecap: 'Um modelo vale no intervalo em que foi ajustado e enquanto fizer sentido no mundo real.',
        },
      },
      {
        slug: 'q-func-rec-1',
        stem: 'Na função f(x) = 7x + 25, qual é o valor de f(x) quando x = 0, e o que ele representa em uma situação de cobrança?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'termo independente',
        estimatedSeconds: 70,
        isRecovery: true,
        skillSlug: 'interpretar-relacoes-entre-grandezas',
        likelyErrors: ['responder o coeficiente angular'],
        options: [
          { label: 'A', text: '25 — a parte fixa, cobrada mesmo sem consumo.', isCorrect: true, rationale: 'Com x = 0, o termo 7x desaparece e sobra 25: exatamente o valor que não depende do consumo.' },
          { label: 'B', text: '7 — o valor cobrado por unidade.', rationale: '7 é o coeficiente angular, que só aparece quando x é maior que zero.', errorHint: 'confundir coeficiente com termo independente' },
          { label: 'C', text: '0 — nada é cobrado sem consumo.', rationale: 'A existência do termo 25 garante cobrança mesmo com consumo zero.', errorHint: 'ignorar o termo independente' },
          { label: 'D', text: '32 — a soma dos dois coeficientes.', rationale: 'Somar 7 e 25 corresponderia a f(1), não a f(0).', errorHint: 'somar sem substituir x' },
          { label: 'E', text: 'Não é possível calcular sem saber a unidade.', rationale: 'O valor numérico não depende da unidade escolhida.', errorHint: 'exigir dado irrelevante' },
        ],
        explanation: { summary: 'A resposta é A. f(0) = 25 é o termo independente: a parte fixa da cobrança.' },
      },
      {
        slug: 'q-func-rec-2',
        stem:
          'Observe a tabela:\n\n| x | 1 | 2 | 3 | 4 |\n| --- | --- | --- | --- | --- |\n| y | 12 | 19 | 26 | 33 |\n\nA expressão que relaciona y e x é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'da tabela para a expressão linear',
        estimatedSeconds: 100,
        isRecovery: true,
        skillSlug: 'interpretar-relacoes-entre-grandezas',
        likelyErrors: ['esquecer o termo independente'],
        options: [
          { label: 'A', text: 'y = 7x', rationale: 'Em x = 1 daria 7, mas a tabela mostra 12. Falta o termo independente.', errorHint: 'ignorar o valor inicial' },
          { label: 'B', text: 'y = 7x + 5', isCorrect: true, rationale: 'A diferença constante é 7, e em x = 1 temos 7 + 5 = 12. Confere em todos os pontos.' },
          { label: 'C', text: 'y = 12x', rationale: 'Em x = 2 daria 24, e não 19.', errorHint: 'usar o primeiro valor como coeficiente' },
          { label: 'D', text: 'y = 5x + 7', rationale: 'Troca coeficiente e termo independente: em x = 1 daria 12, mas em x = 2 daria 17, e não 19.', errorHint: 'inverter os dois valores' },
          { label: 'E', text: 'y = x + 11', rationale: 'Em x = 2 daria 13, e não 19.', errorHint: 'assumir coeficiente 1' },
        ],
        explanation: {
          summary: 'A resposta é B. Diferença constante de 7 dá o coeficiente; substituir um ponto revela o termo independente.',
          strategy: 'Ache a diferença constante, depois substitua um par (x, y) para descobrir o valor que falta.',
        },
      },
    ],
  },
];

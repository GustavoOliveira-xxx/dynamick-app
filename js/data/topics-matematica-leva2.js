/**
 * Matemática — segunda leva de tópicos.
 *
 * Conteúdo autoral de desenvolvimento — Conscious Knowledge.
 * Nenhum enunciado foi copiado de prova oficial, livro ou plataforma de terceiros.
 *
 * Cobre os assuntos previstos no escopo que ainda não tinham tópico próprio:
 * razão e proporção, regra de três, geometria plana, estatística, probabilidade
 * e matemática financeira.
 */

import { question as q, topic } from './topic-factory.js';

export const MATEMATICA_TOPICS_LEVA_2 = [
  topic({
    slug: 'razao-e-proporcao',
    name: 'Razão e proporção',
    subject: 'matematica',
    area: 'matematica',
    summary:
      'Comparar grandezas por divisão, reconhecer proporcionalidade e usar escalas, densidades e taxas em situações do dia a dia.',
    difficulty: 'intro',
    minutes: 20,
    weight: 92,
    order: 4,
    related: ['porcentagem-e-variacao', 'regra-de-tres'],
    skill: {
      slug: 'comparar-grandezas-por-razao-e-proporcao',
      name: 'Comparar grandezas por razão e proporção',
      description:
        'Montar razões corretas, verificar proporcionalidade e aplicar escala, densidade e taxa em contextos reais.',
    },
    quick: `**Razão** é comparação por divisão: a razão entre 12 e 4 é 12/4 = 3.

**Proporção** é a igualdade de duas razões: a/b = c/d.

**A propriedade que resolve quase tudo:** em a/b = c/d, vale a·d = b·c (multiplicação cruzada).

**Razões que aparecem com nome próprio:**
- **escala** = medida no desenho ÷ medida real (1:50 significa 1 cm no papel para 50 cm reais);
- **densidade** = massa ÷ volume;
- **velocidade média** = distância ÷ tempo;
- **densidade demográfica** = habitantes ÷ área.

**Cuidado com a ordem.** "A razão de A para B" é A/B. Inverter é o erro que mais custa ponto — e quase sempre existe uma alternativa esperando por ele.`,
    explanation: {
      title: 'Montar a razão certa e reconhecer quando há proporção',
      body: `### 1. Razão exige mesma unidade

Comparar 2 metros com 50 centímetros pela razão 2/50 está errado. Converta primeiro: 200 cm / 50 cm = 4. A razão é um número puro — as unidades se cancelam.

Exceção importante: razões entre grandezas **diferentes** (km/h, R$/kg, hab/km²) mantêm as unidades e são chamadas de **taxas**. Aí a unidade faz parte da resposta.

### 2. Proporcionalidade direta e inversa

- **Direta:** uma dobra, a outra dobra. O **quociente** é constante: y/x = k.
- **Inversa:** uma dobra, a outra cai pela metade. O **produto** é constante: x·y = k.

Como decidir? Pergunte: se eu aumentar a primeira, a segunda aumenta ou diminui **pela mesma causa**?

- Mais pedreiros → menos tempo: inversa.
- Mais quilos → mais preço: direta.

Cuidado com relações que não são proporcionais de jeito nenhum: dobrar o lado de um quadrado não dobra a área (quadruplica), e a idade de uma pessoa não é proporcional à sua altura.

### 3. Divisão em partes proporcionais

Dividir R$ 900 entre três pessoas na razão 2 : 3 : 4:

1. Some as partes: 2 + 3 + 4 = 9.
2. Encontre o valor de uma parte: 900 ÷ 9 = 100.
3. Multiplique: 200, 300 e 400.

**Confira sempre somando de volta:** 200 + 300 + 400 = 900. Essa conferência de dez segundos elimina a maioria dos erros.

### 4. Escala

Escala 1:200 significa que 1 unidade no desenho vale 200 na realidade.

- Do desenho para o real: **multiplique**.
- Do real para o desenho: **divida**.

Um erro clássico: aplicar a escala linear à área. Se o comprimento é reduzido 200 vezes, a área é reduzida 200² = 40.000 vezes.

### 5. Estratégia de prova

1. Escreva a razão com as palavras do enunciado antes de colocar números.
2. Verifique se as unidades batem.
3. Monte a proporção e cruze.
4. Volte ao enunciado e pergunte: o número que achei responde exatamente o que foi perguntado?`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — escala de uma planta',
        body: `**Situação:** em uma planta na escala 1:150, uma sala aparece com 4 cm por 3 cm.

**a) Dimensões reais**

- 4 cm × 150 = 600 cm = **6 m**
- 3 cm × 150 = 450 cm = **4,5 m**

**b) Área real**

Pelo caminho direto: 6 × 4,5 = **27 m²**.

Pelo caminho da escala: a área no papel é 4 × 3 = 12 cm²; a razão entre áreas é 150² = 22.500; logo 12 × 22.500 = 270.000 cm² = **27 m²**. Os dois caminhos coincidem.

**Onde se erra:** multiplicar a área do papel por 150 (e não por 150²), obtendo 1.800 cm² — um valor sem sentido físico para uma sala.`,
      },
      {
        title: 'Exemplo resolvido 2 — mesma tinta, embalagens diferentes',
        body: `**Situação:** a lata de 3,6 litros custa R$ 108,00 e a de 18 litros custa R$ 486,00. Qual compensa?

**Razão de comparação (taxa):** preço por litro.

- 108 ÷ 3,6 = **R$ 30,00/L**
- 486 ÷ 18 = **R$ 27,00/L**

**Resposta:** a lata de 18 litros é mais econômica, com R$ 3,00 a menos por litro — 10% de diferença.

**Complemento que a prova costuma cobrar:** se a pessoa precisa de apenas 5 litros, comprar a lata grande gasta mais dinheiro no total, ainda que o litro saia mais barato. Economia por unidade e gasto total são perguntas diferentes.`,
      },
    ],
    mistakes: `**1. Inverter a ordem da razão.**
"A razão de A para B" é A/B. Trocar a ordem gera um resultado que costuma estar entre as alternativas.

**2. Comparar grandezas em unidades diferentes.**
Converta antes de dividir. 30 minutos e 2 horas viram 30 e 120 (ou 0,5 e 2) — nunca 30 e 2.

**3. Aplicar a escala linear à área.**
Se as medidas são reduzidas k vezes, a área é reduzida k² vezes e o volume, k³ vezes.`,
    selfCheck: [
      'Como você decide se duas grandezas são direta ou inversamente proporcionais?',
      'Por que a área de uma figura em escala 1:100 não é 100 vezes menor que a real?',
      'Qual a diferença entre "mais barato por litro" e "gasto total menor"?',
    ],
    questions: [
      q({
        slug: 'q-razao-1',
        stem: 'Em uma turma há 18 meninas e 12 meninos. A razão entre o número de meninos e o número total de estudantes é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'montagem correta da razão pedida',
        seconds: 75,
        errors: ['usar o total errado', 'inverter a razão'],
        correct: 1,
        options: [
          ['3/2', 'Essa é a razão entre meninas e meninos (18/12), que não é o pedido.', 'responder outra razão'],
          ['2/5', 'O total é 18 + 12 = 30. A razão pedida é 12/30 = 2/5.'],
          ['2/3', 'Essa é a razão entre meninos e meninas (12/18), não entre meninos e o total.', 'usar a parte no lugar do todo'],
          ['5/2', 'É o inverso da razão pedida.', 'inverter a ordem'],
          ['3/5', 'Essa é a razão entre meninas e o total (18/30).', 'trocar o grupo pedido'],
        ],
        explanation: 'A razão pedida compara uma parte (12 meninos) com o todo (30 estudantes): 12/30 = 2/5.',
        strategy: 'Escreva a razão em palavras antes dos números: "meninos dividido por total".',
      }),
      q({
        slug: 'q-razao-2',
        stem: 'Uma receita de bolo usa 3 xícaras de farinha para 2 xícaras de leite. Para preparar uma versão maior usando 7,5 xícaras de farinha, a quantidade de leite deve ser de:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação de proporção direta em situação cotidiana',
        seconds: 85,
        errors: ['somar em vez de multiplicar a razão'],
        correct: 2,
        options: [
          ['4,5 xícaras', 'Corresponde a somar 2,5 às duas xícaras originais, e não a manter a proporção.', 'raciocinar por soma'],
          ['6 xícaras', 'Usa a razão invertida (3/2 no lugar de 2/3).', 'inverter a razão'],
          ['5 xícaras', '3/2 = 7,5/x, então 3x = 15 e x = 5. A proporção entre farinha e leite se mantém.'],
          ['3,5 xícaras', 'Não mantém a razão: com 3,5 de leite, a proporção seria bem diferente de 3 para 2.', 'estimar sem calcular'],
          ['11,25 xícaras', 'Multiplica farinha por leite em vez de aplicar a proporção.', 'operação trocada'],
        ],
        explanation: 'A farinha foi multiplicada por 2,5 (3 → 7,5). O leite acompanha: 2 × 2,5 = 5 xícaras.',
      }),
      q({
        slug: 'q-razao-3',
        stem: 'A tabela mostra dados de três cidades:\n\n| Cidade | População | Área (km²) |\n| --- | --- | --- |\n| Alfa | 240.000 | 300 |\n| Beta | 150.000 | 250 |\n| Gama | 420.000 | 600 |\n\nSobre a densidade demográfica dessas cidades, é correto afirmar que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de tabela e cálculo de taxa',
        seconds: 130,
        errors: ['comparar apenas a população', 'comparar apenas a área'],
        correct: 0,
        options: [
          ['Alfa tem a maior densidade demográfica, com 800 habitantes por km².', 'Alfa: 240.000/300 = 800 hab/km². Beta: 150.000/250 = 600. Gama: 420.000/600 = 700. Alfa lidera, embora não seja a mais populosa.'],
          ['Gama tem a maior densidade, por ter a maior população.', 'População maior não implica densidade maior: Gama tem 700 hab/km², abaixo de Alfa.', 'confundir população com densidade'],
          ['Beta tem a maior densidade, por ter a menor área.', 'Beta tem a menor densidade das três: 600 hab/km².', 'confundir área pequena com concentração'],
          ['As três têm a mesma densidade, pois as razões são equivalentes.', 'As razões resultam em 800, 600 e 700 — valores diferentes.', 'supor equivalência sem calcular'],
          ['Não é possível comparar, pois as áreas são diferentes.', 'É justamente a divisão pela área que torna a comparação possível.', 'não reconhecer a função da taxa'],
        ],
        explanation: 'Densidade demográfica é habitantes por km². Dividir cada população pela sua área torna cidades de tamanhos diferentes comparáveis.',
        detail: 'Repare que a cidade mais populosa (Gama) não é a mais densa. Esse contraste é o alvo pedagógico da questão.',
      }),
      q({
        slug: 'q-razao-4',
        stem: 'Considere duas situações:\n\nI. Uma torneira enche um tanque em 6 horas; duas torneiras iguais enchem o mesmo tanque em 3 horas.\nII. Um carro percorre 100 km com 8 litros; para percorrer 200 km, precisa de 16 litros.\n\nSobre o tipo de proporcionalidade em cada caso:',
        difficulty: 'intermediate',
        format: 'comparison',
        reasoning: 'distinção entre proporcionalidade direta e inversa',
        seconds: 120,
        errors: ['classificar as duas como diretas'],
        correct: 3,
        options: [
          ['Ambas são diretamente proporcionais.', 'Em I, aumentar o número de torneiras diminui o tempo: é inversa.', 'ignorar o sentido da variação'],
          ['Ambas são inversamente proporcionais.', 'Em II, mais distância exige mais combustível: é direta.', 'generalizar a inversa'],
          ['I é direta e II é inversa.', 'A classificação está trocada em relação ao comportamento descrito.', 'inverter os casos'],
          ['I é inversa e II é direta.', 'Em I o produto é constante (1×6 = 2×3 = 6): inversa. Em II o quociente é constante (100/8 = 200/16 = 12,5): direta.'],
          ['Nenhuma das duas é proporcional.', 'As duas mantêm uma constante — de produto em I, de quociente em II.', 'negar a regularidade dos dados'],
        ],
        explanation: 'Inversa mantém o produto constante; direta mantém o quociente constante. Testar as duas contas resolve a classificação sem depender de intuição.',
      }),
      q({
        slug: 'q-razao-5',
        stem: 'Uma cooperativa vai dividir R$ 6.300,00 entre três famílias, proporcionalmente ao número de dias trabalhados: 5, 7 e 9 dias. Uma quarta família alega que a divisão deveria ser igual, pois todas participaram do projeto.\n\nA análise correta da situação é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre divisão proporcional e leitura crítica do critério adotado',
        seconds: 160,
        errors: ['errar a soma das partes', 'confundir critério com cálculo'],
        correct: 2,
        options: [
          ['A divisão proporcional resulta em R$ 2.100,00 para cada família, que é o mesmo valor da divisão igualitária.', 'R$ 2.100 é o resultado da divisão igual entre três, não da proporcional.', 'confundir os dois critérios'],
          ['A divisão proporcional resulta em R$ 1.500,00, R$ 2.100,00 e R$ 2.700,00, e o critério é matematicamente inválido.', 'Os valores estão corretos, mas divisão proporcional é um critério matematicamente válido — o que se pode discutir é sua justiça.', 'confundir validade matemática com escolha de critério'],
          ['A divisão proporcional resulta em R$ 1.500,00, R$ 2.100,00 e R$ 2.700,00; escolher entre esse critério e a divisão igual é uma decisão do grupo, não uma questão de cálculo.', 'Somando 5 + 7 + 9 = 21 e dividindo 6.300 por 21, cada dia vale R$ 300: 1.500, 2.100 e 2.700, que somam 6.300. Qual critério adotar é decisão coletiva; a matemática apenas executa o critério escolhido.'],
          ['A divisão proporcional é impossível, pois os dias trabalhados não formam uma proporção.', 'Qualquer conjunto de números positivos permite divisão proporcional.', 'supor exigência inexistente'],
          ['A divisão deve ser sempre igual, pois proporcionalidade não se aplica a pessoas.', 'Divisão proporcional ao trabalho é amplamente usada; o debate é sobre justiça, não sobre aplicabilidade.', 'transformar juízo em regra matemática'],
        ],
        explanation: 'A questão integra o cálculo (soma das partes, valor da parte, verificação) com a leitura crítica de que a escolha do critério é uma decisão coletiva, não um resultado matemático.',
        strategy: 'Depois de dividir em partes proporcionais, sempre some de volta para conferir o total.',
      }),
      q({
        slug: 'q-razao-rec-1',
        stem: 'Um mapa está na escala 1:50.000. Dois pontos separados por 4 cm no mapa correspondem, na realidade, a uma distância de:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'conversão por escala',
        seconds: 80,
        recovery: true,
        errors: ['errar a conversão de unidades'],
        correct: 2,
        options: [
          ['200 m', 'Corresponde a usar 1:5.000 em vez de 1:50.000.', 'errar a ordem de grandeza'],
          ['20 km', 'Corresponde a multiplicar por 500.000.', 'errar a conversão de cm para km'],
          ['2 km', '4 × 50.000 = 200.000 cm. Como 100.000 cm = 1 km, o resultado é 2 km.'],
          ['500 m', 'Não corresponde a nenhuma etapa correta do cálculo.', 'estimar sem calcular'],
          ['200 km', 'Multiplica por 5.000.000, cem vezes mais que o correto.', 'errar a potência de dez'],
        ],
        explanation: 'Do mapa para o real, multiplica-se pela escala: 4 cm × 50.000 = 200.000 cm = 2 km.',
      }),
    ],
  }),

  topic({
    slug: 'regra-de-tres',
    name: 'Regra de três',
    subject: 'matematica',
    area: 'matematica',
    summary:
      'Resolver problemas com grandezas proporcionais, simples ou compostas, decidindo corretamente entre proporção direta e inversa.',
    difficulty: 'intro',
    minutes: 20,
    weight: 90,
    order: 5,
    prerequisites: ['razao-e-proporcao'],
    related: ['porcentagem-e-variacao'],
    skill: {
      slug: 'resolver-situacoes-com-regra-de-tres',
      name: 'Resolver situações com regra de três',
      description:
        'Organizar grandezas, decidir o sentido de cada proporcionalidade e resolver regras de três simples e compostas.',
    },
    quick: `**Regra de três simples direta**

Monte a tabela, cruze, resolva:

| Grandeza A | Grandeza B |
| --- | --- |
| 4 | 20 |
| 7 | x |

4/7 = 20/x → 4x = 140 → x = 35.

**Regra de três simples inversa**

Quando uma cresce e a outra diminui, **inverta uma das colunas** antes de cruzar.

5 pedreiros → 12 dias; 6 pedreiros → x dias.
Inversa: 5 × 12 = 6 × x → x = 10 dias.

**Regra de três composta**

Com três ou mais grandezas, compare **cada uma** com a grandeza da incógnita e decida direta ou inversa separadamente. Depois multiplique as razões.

**Antes de calcular, faça o teste do bom senso:** o resultado deve aumentar ou diminuir? Um número na direção errada é erro de montagem, não de conta.`,
    explanation: {
      title: 'Montar a regra de três sem errar o sentido',
      body: `### 1. O procedimento em quatro passos

1. **Identifique as grandezas** e escreva o que cada coluna representa.
2. **Alinhe as unidades** (horas com horas, kg com kg).
3. **Decida o sentido** de cada grandeza em relação à incógnita.
4. **Resolva e confira** se o valor faz sentido.

### 2. Como decidir direta ou inversa sem decorar

Pergunte: *aumentando esta grandeza, e mantendo as outras iguais, a incógnita aumenta ou diminui?*

- Aumenta junto → **direta**.
- Diminui → **inversa**.

Exemplos que quase sempre aparecem:
- máquinas × tempo para terminar: **inversa**;
- máquinas × produção: **direta**;
- velocidade × tempo de viagem: **inversa**;
- pessoas × comida consumida: **direta**;
- pessoas × duração de um estoque fixo: **inversa**.

### 3. Regra de três composta, passo a passo

*Se 6 operários constroem 120 m de muro em 5 dias, quantos metros 9 operários constroem em 4 dias?*

Incógnita: metros de muro.

- Operários × metros: mais operários, mais muro → **direta** → 9/6.
- Dias × metros: mais dias, mais muro → **direta** → 4/5.

x = 120 × (9/6) × (4/5) = 120 × 1,5 × 0,8 = **144 m**.

**Conferência:** subiu de 120 para 144. Faz sentido: ganhamos operários e perdemos um dia, e o ganho foi maior.

### 4. Quando NÃO usar regra de três

Nem toda relação é proporcional. Não use regra de três para:

- área a partir do lado (relação quadrática);
- juros compostos (crescimento exponencial);
- situações com valor fixo somado (taxa de adesão + consumo);
- desempenho humano em escalas extremas — 1 pessoa cava um buraco em 6 h não significa que 360 pessoas cavam em 1 minuto.

Reconhecer o limite do modelo é parte da competência avaliada.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — inversa com verificação',
        body: `**Situação:** um reservatório é enchido por 4 bombas em 9 horas. Com 6 bombas iguais, em quanto tempo enche?

**Sentido:** mais bombas, menos tempo → **inversa**.

**Cálculo:** 4 × 9 = 6 × x → 36 = 6x → x = **6 horas**.

**Conferência dupla:**
- O tempo diminuiu (9 → 6), como esperado.
- O "trabalho total" é o mesmo nos dois casos: 4×9 = 36 = 6×6 bomba-hora.

**Erro típico:** montar como direta e obter 13,5 horas — mais bombas levando mais tempo, o que é absurdo. O teste de bom senso pega isso antes de marcar a alternativa.`,
      },
      {
        title: 'Exemplo resolvido 2 — composta com dois sentidos diferentes',
        body: `**Situação:** 5 costureiras produzem 300 uniformes em 6 dias. Quantos dias 4 costureiras levam para produzir 400 uniformes?

**Incógnita:** dias.

- Costureiras × dias: menos costureiras, mais dias → **inversa** → multiplicamos por 5/4.
- Uniformes × dias: mais uniformes, mais dias → **direta** → multiplicamos por 400/300.

x = 6 × (5/4) × (400/300) = 6 × 1,25 × 1,333… = **10 dias**.

**Conferência:** as duas mudanças empurram o prazo para cima, e o resultado subiu de 6 para 10 dias. Coerente.`,
      },
    ],
    mistakes: `**1. Assumir que tudo é direto.**
Antes de cruzar, pergunte o sentido de cada grandeza. Em problema de tempo, a inversa é a regra, não a exceção.

**2. Misturar unidades.**
Minutos com horas, gramas com quilos. Converta antes de montar a tabela.

**3. Usar regra de três onde a relação não é proporcional.**
Juros compostos, áreas a partir de lados e contas com parcela fixa não obedecem a proporção simples.`,
    selfCheck: [
      'Como você decide, sem decorar, se uma grandeza entra como direta ou inversa?',
      'Em uma regra de três composta, por que cada grandeza é comparada separadamente com a incógnita?',
      'Cite uma situação real em que aplicar regra de três daria um resultado sem sentido.',
    ],
    questions: [
      q({
        slug: 'q-rt-1',
        stem: 'Se 8 metros de tecido custam R$ 96,00, então 14 metros do mesmo tecido custam:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'regra de três simples direta',
        seconds: 70,
        errors: ['somar em vez de multiplicar'],
        correct: 3,
        options: [
          ['R$ 154,00', 'Corresponde a somar R$ 58,00 ao valor original, sem manter a proporção.', 'raciocinar por soma'],
          ['R$ 120,00', 'Corresponde a 10 metros, não a 14.', 'errar o valor da incógnita'],
          ['R$ 196,00', 'Usa R$ 14,00 por metro, valor que não vem dos dados.', 'inventar o preço unitário'],
          ['R$ 168,00', 'O metro custa 96 ÷ 8 = R$ 12,00. Logo, 14 × 12 = R$ 168,00.'],
          ['R$ 112,00', 'Corresponde a somar 2 metros ao preço de 8, ignorando a proporção.', 'raciocinar por soma'],
        ],
        explanation: 'Encontre o valor unitário (R$ 12,00 por metro) e multiplique pela quantidade pedida.',
        strategy: 'Reduzir à unidade costuma ser mais seguro que cruzar direto.',
      }),
      q({
        slug: 'q-rt-2',
        stem: 'Uma obra seria concluída por 12 operários em 20 dias. Se apenas 8 operários trabalharem, no mesmo ritmo, o prazo passa a ser de:',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'regra de três simples inversa',
        seconds: 90,
        errors: ['tratar como proporção direta'],
        correct: 4,
        options: [
          ['13 dias', 'Menos operários não podem reduzir o prazo.', 'inverter o sentido'],
          ['16 dias', 'Corresponde a montar a proporção como direta.', 'tratar como direta'],
          ['24 dias', 'Não corresponde ao produto constante 12 × 20 = 240.', 'errar a conta'],
          ['32 dias', 'Corresponde a usar a razão 8/12 invertida duas vezes.', 'aplicar a inversa duas vezes'],
          ['30 dias', 'Mais operários, menos dias: é inversa. 12 × 20 = 8 × x → 240 = 8x → x = 30 dias.'],
        ],
        explanation: 'Em relação inversa, o produto se conserva: 12 × 20 = 8 × 30 = 240 operário-dia.',
      }),
      q({
        slug: 'q-rt-3',
        stem: 'Uma padaria registrou o consumo de farinha em três semanas:\n\n| Semana | Pães produzidos | Farinha usada (kg) |\n| --- | --- | --- |\n| 1 | 1.200 | 60 |\n| 2 | 1.800 | 90 |\n| 3 | 2.400 | 120 |\n\nMantida a mesma relação, a farinha necessária para produzir 3.000 pães é de:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de tabela e extensão da proporcionalidade',
        seconds: 110,
        errors: ['ignorar a regularidade da tabela'],
        correct: 1,
        options: [
          ['135 kg', 'Não corresponde à razão constante de 20 pães por kg.', 'errar a conta final'],
          ['150 kg', 'A razão é constante: 1.200/60 = 20 pães por kg. Logo, 3.000 ÷ 20 = 150 kg.'],
          ['160 kg', 'Corresponde a usar 18,75 pães por kg, valor que não aparece nos dados.', 'usar razão inventada'],
          ['180 kg', 'Corresponde a somar as três semanas, o que não responde à pergunta.', 'somar os dados em vez de aplicar a razão'],
          ['125 kg', 'Corresponde a 24 pães por kg, acima da relação observada.', 'errar a razão'],
        ],
        explanation: 'A tabela mostra proporcionalidade direta constante: 20 pães por quilo de farinha. Basta dividir 3.000 por 20.',
        detail: 'Conferir a constante nas três linhas antes de extrapolar é o que garante que a proporcionalidade realmente existe.',
      }),
      q({
        slug: 'q-rt-4',
        stem: 'Analise duas situações:\n\nI. Um trem a 80 km/h percorre um trecho em 3 horas; a 120 km/h, percorreria o mesmo trecho em 2 horas.\nII. Um quadrado de lado 4 cm tem 16 cm² de área; um quadrado de lado 8 cm tem 32 cm² de área.\n\nSobre o uso de regra de três nessas situações:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre relação proporcional e relação não proporcional',
        seconds: 140,
        errors: ['aplicar regra de três à área'],
        correct: 0,
        options: [
          ['I está correta e usa proporcionalidade inversa; II está incorreta, pois a área não é proporcional ao lado.', 'Em I, 80 × 3 = 120 × 2 = 240: inversa correta. Em II, dobrar o lado quadruplica a área — 8 cm de lado dá 64 cm², não 32.'],
          ['As duas estão corretas e usam proporcionalidade direta.', 'I é inversa e II está numericamente errada.', 'classificar tudo como direta'],
          ['As duas estão corretas e usam proporcionalidade inversa.', 'A relação entre lado e área não é inversa nem proporcional.', 'generalizar a inversa'],
          ['I está incorreta, pois maior velocidade não reduz o tempo proporcionalmente.', 'Com distância fixa, velocidade e tempo são inversamente proporcionais.', 'negar uma relação válida'],
          ['II está correta, pois basta multiplicar a área pelo mesmo fator do lado.', 'Esse é exatamente o erro: a área varia com o quadrado do fator.', 'aplicar fator linear à área'],
        ],
        explanation: 'Regra de três só vale onde há proporcionalidade. Área em função do lado é quadrática: dobrar o lado multiplica a área por 4.',
      }),
      q({
        slug: 'q-rt-5',
        stem: 'Uma cozinha comunitária serve 240 refeições por dia com 6 voluntários trabalhando 5 horas cada. Para o mês seguinte, a meta é 320 refeições diárias, e o grupo conseguiu 8 voluntários.\n\nMantido o mesmo ritmo de trabalho, quantas horas cada voluntário precisará trabalhar por dia?',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'regra de três composta com dois sentidos e verificação do resultado',
        seconds: 170,
        errors: ['errar o sentido de uma das grandezas', 'esquecer de verificar o resultado'],
        correct: 2,
        options: [
          ['3 horas', 'Aplica apenas o aumento de voluntários e ignora o aumento da meta.', 'considerar só uma grandeza'],
          ['4 horas', 'Corresponde a manter 240 refeições com 8 voluntários, e não à nova meta.', 'usar a meta antiga'],
          ['5 horas', 'Voluntários × horas é inversa (5 × 6/8 = 3,75); refeições × horas é direta (× 320/240 = 4/3). Assim, 5 × 6/8 × 320/240 = 5 horas.'],
          ['6 horas', 'Corresponde a tratar a relação com voluntários como direta.', 'errar o sentido da inversa'],
          ['6,67 horas', 'Aplica só o aumento da meta e ignora os voluntários a mais.', 'considerar só uma grandeza'],
        ],
        explanation: 'Composta com dois sentidos: mais voluntários reduzem as horas; mais refeições aumentam. Os dois efeitos se cancelam e o resultado volta a 5 horas.',
        detail: 'Conferência pelo total de trabalho: hoje são 6 × 5 = 30 hora-voluntário para 240 refeições (8 refeições por hora-voluntário). Para 320, precisa-se de 40 hora-voluntário; com 8 pessoas, 5 horas cada.',
      }),
      q({
        slug: 'q-rt-rec-1',
        stem: 'Se 3 impressoras iguais imprimem um lote em 40 minutos, 5 impressoras iguais imprimem o mesmo lote em:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação de proporcionalidade inversa',
        seconds: 75,
        recovery: true,
        errors: ['tratar como direta'],
        correct: 1,
        options: [
          ['66,7 minutos', 'Mais impressoras não podem aumentar o tempo.', 'inverter o sentido'],
          ['24 minutos', '3 × 40 = 5 × x → 120 = 5x → x = 24 minutos.'],
          ['30 minutos', 'Não corresponde ao produto constante de 120 impressora-minuto.', 'errar a conta'],
          ['20 minutos', 'Corresponde a 6 impressoras, não a 5.', 'errar o divisor'],
          ['40 minutos', 'O tempo não permaneceria igual com mais máquinas.', 'ignorar a mudança'],
        ],
        explanation: 'Mais máquinas, menos tempo: relação inversa, com produto constante.',
      }),
    ],
  }),

  topic({
    slug: 'geometria-plana',
    name: 'Geometria plana',
    subject: 'matematica',
    area: 'matematica',
    summary:
      'Calcular perímetros e áreas, aplicar o teorema de Pitágoras e resolver problemas reais de terreno, piso, cerca e deslocamento.',
    difficulty: 'intermediate',
    minutes: 25,
    weight: 88,
    order: 6,
    prerequisites: ['razao-e-proporcao'],
    skill: {
      slug: 'calcular-e-aplicar-medidas-em-figuras-planas',
      name: 'Calcular e aplicar medidas em figuras planas',
      description:
        'Aplicar perímetro, área e relações métricas do triângulo retângulo em problemas concretos, com atenção às unidades.',
    },
    quick: `**Áreas que resolvem quase tudo**

- Retângulo: base × altura
- Quadrado: lado²
- Triângulo: (base × altura) ÷ 2
- Trapézio: (B + b) × altura ÷ 2
- Círculo: π·r² — **perímetro** (comprimento): 2π·r

**Pitágoras:** em triângulo retângulo, a² = b² + c², com a = hipotenusa (o lado maior, oposto ao ângulo reto).

**Trio que aparece sempre:** 3-4-5 (e seus múltiplos 6-8-10, 9-12-15).

**Perímetro x área:** perímetro é o contorno (cerca, rodapé, moldura); área é a superfície (piso, tinta, grama). Ler a palavra errada custa a questão inteira.

**Unidades:** 1 m² = 10.000 cm². Área converte pelo **quadrado** do fator.`,
    explanation: {
      title: 'Da figura ao problema real: decompor, calcular, conferir',
      body: `### 1. Decompor figuras compostas

Terrenos e cômodos raramente são retângulos perfeitos. A estratégia é sempre a mesma:

1. Corte a figura em retângulos e triângulos.
2. Calcule cada parte.
3. Some (ou subtraia, quando há um vazio, como um canteiro ou uma piscina).

Um "L" pode ser lido como dois retângulos ou como um retângulo grande menos um retângulo pequeno. Os dois caminhos dão o mesmo resultado — escolha o de conta mais simples.

### 2. Pitágoras fora do triângulo desenhado

O teorema aparece disfarçado em:

- diagonal de um retângulo ou de uma tela;
- altura de uma escada apoiada na parede;
- distância em linha reta entre dois pontos de um mapa quadriculado;
- altura de um triângulo equilátero (h = L√3 / 2);
- diagonal de um quadrado (d = L√2).

Sempre que o problema tiver um ângulo reto e faltar um lado, teste Pitágoras.

### 3. Círculo: o erro mais caro

Confundir raio com diâmetro dobra ou quadruplica o resultado. Anote o raio separadamente antes de calcular.

- Comprimento (perímetro) = 2π·r
- Área = π·r²

Com π ≈ 3,14, uma pizza de 30 cm de diâmetro tem raio 15 cm e área ≈ 706,5 cm².

### 4. Escala de áreas

Ampliar todas as medidas por k multiplica a área por k². Duas pizzas de 20 cm não equivalem a uma de 40 cm: a de 40 cm tem quatro vezes a área de uma de 20 cm, e não duas.

### 5. Rotina de verificação

1. A pergunta é de perímetro ou de área?
2. As unidades estão todas iguais?
3. O resultado é plausível para o objeto descrito?
4. A resposta precisa ser arredondada para cima? (Piso, tinta e ladrilho não se compram pela metade.)`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — terreno em L com canteiro',
        body: `**Situação:** um terreno em L é formado por um retângulo de 20 m × 12 m com um recorte retangular de 8 m × 5 m em um dos cantos. No meio, há um canteiro circular de 4 m de diâmetro que não será gramado.

**Área do terreno:** 20 × 12 = 240 m²; recorte: 8 × 5 = 40 m² → 240 − 40 = **200 m²**

**Área do canteiro:** raio 2 m → π × 2² = 4π ≈ **12,6 m²**

**Área a gramar:** 200 − 12,6 = **187,4 m²**

**Quantas placas de grama de 0,5 m² cada?** 187,4 ÷ 0,5 = 374,8 → **375 placas**, porque não existe fração de placa.

**Onde se erra:** usar 4 m como raio do canteiro (área 4 vezes maior) e arredondar 374,8 para baixo.`,
      },
      {
        title: 'Exemplo resolvido 2 — a escada e a parede',
        body: `**Situação:** uma escada de 5 m está apoiada na parede, com a base a 3 m do rodapé. A que altura ela toca a parede?

**Montagem:** a escada é a hipotenusa; o chão e a parede são os catetos.

5² = 3² + h² → 25 = 9 + h² → h² = 16 → h = **4 m**

**Segunda parte, que costuma aparecer:** se a base for afastada para 4 m, a nova altura é √(25 − 16) = 3 m. Afastar 1 m a base fez a escada descer 1 m — mas essa coincidência não é regra: com 5 m de base, a escada nem alcança a parede em pé.

**Conferência:** 3-4-5 é o trio pitagórico mais comum. Reconhecê-lo economiza tempo de prova.`,
      },
    ],
    mistakes: `**1. Trocar perímetro por área.**
Cerca, rodapé e moldura pedem perímetro. Piso, tinta e grama pedem área. Sublinhe a palavra no enunciado.

**2. Usar o diâmetro como raio.**
Isso quadruplica a área do círculo. Escreva "r = ..." antes de qualquer conta.

**3. Converter área como se fosse comprimento.**
1 m² são 10.000 cm², não 100. A conversão de área usa o quadrado do fator.`,
    selfCheck: [
      'Como você decide se um problema pede perímetro ou área?',
      'Em que situações cotidianas o teorema de Pitágoras aparece sem que haja um triângulo desenhado?',
      'Por que uma pizza com o dobro do diâmetro tem quatro vezes a área?',
    ],
    questions: [
      q({
        slug: 'q-geo-1',
        stem: 'Uma sala retangular mede 6 m por 4,5 m. A área do piso dessa sala é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'cálculo direto de área',
        seconds: 60,
        errors: ['calcular perímetro em vez de área'],
        correct: 2,
        options: [
          ['10,5 m²', 'Corresponde à soma dos lados, não ao produto.', 'somar em vez de multiplicar'],
          ['21 m²', 'Corresponde ao perímetro (2 × 6 + 2 × 4,5), não à área.', 'confundir perímetro com área'],
          ['27 m²', '6 × 4,5 = 27 m². Área de retângulo é base vezes altura.'],
          ['13,5 m²', 'Corresponde à metade do produto — fórmula de triângulo.', 'usar fórmula de outra figura'],
          ['54 m²', 'Corresponde ao dobro do produto.', 'multiplicar por dois sem motivo'],
        ],
        explanation: 'Área de retângulo é o produto das dimensões: 6 × 4,5 = 27 m².',
      }),
      q({
        slug: 'q-geo-2',
        stem: 'Uma pessoa vai cercar um terreno retangular de 25 m por 18 m com três voltas de arame. O arame é vendido em rolos de 50 metros.\n\nO número mínimo de rolos necessários é:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação de perímetro com arredondamento para cima',
        seconds: 120,
        errors: ['esquecer as três voltas', 'arredondar para baixo'],
        correct: 3,
        options: [
          ['3 rolos', 'Corresponde a uma volta apenas (86 m).', 'ignorar as três voltas'],
          ['5 rolos', 'Cobriria 250 m, insuficiente para 258 m.', 'arredondar para baixo'],
          ['9 rolos', 'Corresponde a calcular a área em vez do perímetro.', 'trocar a grandeza'],
          ['6 rolos', 'Perímetro: 2 × (25 + 18) = 86 m. Três voltas: 258 m. Como 5 rolos dão 250 m, são necessários 6 rolos.'],
          ['4 rolos', 'Cobriria 200 m, abaixo do necessário.', 'errar a multiplicação por três'],
        ],
        explanation: 'Cerca é perímetro. São 86 m por volta, 258 m no total; 258 ÷ 50 = 5,16, que exige 6 rolos inteiros.',
        strategy: 'Em compras de material, o arredondamento é sempre para cima.',
      }),
      q({
        slug: 'q-geo-3',
        stem: 'A planta de um jardim mostra um retângulo de 12 m por 8 m, com um canteiro triangular no canto cuja base mede 6 m e cuja altura mede 4 m. O restante será coberto com grama.\n\nA área a ser gramada é de:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de figura composta e subtração de áreas',
        seconds: 120,
        errors: ['esquecer de dividir a área do triângulo por 2'],
        correct: 0,
        options: [
          ['84 m²', 'Retângulo: 12 × 8 = 96 m². Triângulo: (6 × 4)/2 = 12 m². Grama: 96 − 12 = 84 m².'],
          ['72 m²', 'Corresponde a subtrair 24 m², ou seja, a esquecer de dividir a área do triângulo por dois.', 'esquecer a divisão por 2'],
          ['96 m²', 'É a área total do jardim, sem descontar o canteiro.', 'ignorar a subtração'],
          ['108 m²', 'Corresponde a somar o canteiro em vez de subtraí-lo.', 'somar em vez de subtrair'],
          ['12 m²', 'É apenas a área do canteiro triangular.', 'responder a parte em vez do resto'],
        ],
        explanation: 'Área de triângulo é base × altura ÷ 2. O gramado é a área total menos a do canteiro.',
      }),
      q({
        slug: 'q-geo-4',
        stem: 'Duas pizzarias vendem pizzas circulares pelo mesmo preço:\n\n- Pizzaria do Centro: uma pizza de 40 cm de diâmetro por R$ 60,00.\n- Pizzaria da Esquina: duas pizzas de 20 cm de diâmetro por R$ 60,00.\n\nSobre a quantidade de pizza obtida em cada oferta:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre áreas e efeito quadrático da escala',
        seconds: 140,
        errors: ['comparar diâmetros em vez de áreas'],
        correct: 4,
        options: [
          ['As duas ofertas entregam a mesma quantidade, pois 20 + 20 = 40.', 'Somar diâmetros não soma áreas: a relação é quadrática.', 'somar medidas lineares'],
          ['A Pizzaria da Esquina entrega o dobro, por serem duas pizzas.', 'Duas pizzas pequenas somam menos área que uma grande de diâmetro dobrado.', 'contar unidades em vez de área'],
          ['A Pizzaria da Esquina entrega mais, pois há mais bordas e mais superfície.', 'Mais bordas não significam mais área total.', 'raciocinar por impressão'],
          ['Não é possível comparar sem saber a espessura das pizzas.', 'Mantida a mesma espessura, a comparação por área é suficiente e é o que a questão pede.', 'introduzir variável desnecessária'],
          ['A Pizzaria do Centro entrega o dobro, pois sua pizza tem área quatro vezes maior que a de cada pizza pequena.', 'Área da pizza grande: π × 20² = 400π. Cada pizza pequena: π × 10² = 100π, e as duas somam 200π. A pizza grande entrega o dobro.'],
        ],
        explanation: 'Dobrar o diâmetro multiplica a área por quatro. Duas pizzas de metade do diâmetro somam apenas metade da área da grande.',
        detail: 'Esse é o efeito quadrático da escala: ele explica por que pizzas grandes quase sempre custam menos por centímetro quadrado.',
      }),
      q({
        slug: 'q-geo-5',
        stem: 'Um ciclista precisa ir do ponto A ao ponto C. Pelo caminho das ruas, ele percorre 800 m para o norte e depois 600 m para o leste. Uma ciclovia em construção ligará A e C em linha reta.\n\nA economia de distância proporcionada pela ciclovia e o percentual correspondente são, aproximadamente:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre Pitágoras, cálculo de diferença e variação percentual',
        seconds: 170,
        errors: ['esquecer de comparar com o percurso original', 'errar o cálculo do percentual'],
        correct: 1,
        options: [
          ['400 m, o que representa 40% de economia.', 'A diferença é de 400 m, mas o percentual está calculado sobre a base errada.', 'usar base incorreta no percentual'],
          ['400 m, o que representa cerca de 29% de economia.', 'Ciclovia: √(800² + 600²) = √1.000.000 = 1.000 m. Percurso atual: 1.400 m. Economia: 400 m, que sobre 1.400 m equivale a ≈ 28,6%.'],
          ['200 m, o que representa cerca de 14% de economia.', 'A hipotenusa mede 1.000 m, e não 1.200 m.', 'errar Pitágoras'],
          ['1.000 m, o que representa 71% de economia.', '1.000 m é o comprimento da ciclovia, não a economia.', 'confundir medida com diferença'],
          ['400 m, o que representa 25% de economia.', 'O percentual foi calculado sobre 1.600 m, valor que não corresponde ao percurso.', 'errar o denominador'],
        ],
        explanation: 'A questão integra três passos: aplicar Pitágoras (3-4-5 ampliado), calcular a diferença e converter em percentual sobre o percurso original.',
        strategy: 'Reconhecer 600-800-1000 como múltiplo de 3-4-5 dispensa a raiz quadrada.',
      }),
      q({
        slug: 'q-geo-rec-1',
        stem: 'Um triângulo retângulo tem catetos de 9 cm e 12 cm. A hipotenusa mede:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação direta do teorema de Pitágoras',
        seconds: 70,
        recovery: true,
        errors: ['somar os catetos'],
        correct: 2,
        options: [
          ['21 cm', 'Corresponde a somar os catetos, e não a aplicar Pitágoras.', 'somar em vez de usar o teorema'],
          ['10,5 cm', 'É a média dos catetos, valor menor que o maior cateto — impossível para a hipotenusa.', 'calcular média'],
          ['15 cm', '9² + 12² = 81 + 144 = 225, e √225 = 15 cm. É o trio 3-4-5 multiplicado por 3.'],
          ['13 cm', 'Corresponde ao trio 5-12-13, que não é o caso aqui.', 'trocar de trio pitagórico'],
          ['16 cm', 'Não satisfaz a relação: 16² = 256 ≠ 225.', 'errar a raiz'],
        ],
        explanation: 'A hipotenusa é sempre maior que qualquer cateto e menor que a soma dos dois — 15 cm cumpre as duas condições.',
      }),
    ],
  }),

  topic({
    slug: 'estatistica',
    name: 'Estatística',
    subject: 'matematica',
    area: 'matematica',
    summary:
      'Calcular e interpretar média, mediana e moda, entender dispersão e reconhecer quando uma medida resume mal os dados.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 90,
    order: 7,
    prerequisites: ['leitura-de-graficos-e-tabelas'],
    related: ['probabilidade'],
    skill: {
      slug: 'interpretar-medidas-estatisticas-em-contexto',
      name: 'Interpretar medidas estatísticas em contexto',
      description:
        'Calcular média, mediana e moda, comparar seus significados e avaliar qual resume melhor um conjunto de dados.',
    },
    quick: `**As três medidas de centro**

- **Média:** soma ÷ quantidade. Sensível a valores extremos.
- **Mediana:** o valor do meio com os dados **ordenados**. Resistente a extremos.
- **Moda:** o mais frequente. Pode não existir ou haver mais de uma.

**Quando usar qual**
- Dados simétricos e sem extremos → média resume bem.
- Salários, preços de imóveis, tempo de espera → **mediana** costuma representar melhor.
- Tamanho de camiseta, cor mais vendida → **moda**.

**Dispersão:** duas turmas podem ter a mesma média com realidades opostas. A **amplitude** (maior − menor) e o **desvio** mostram se os dados estão concentrados ou espalhados.

**Média ponderada:** quando cada valor tem peso diferente, multiplique cada nota pelo seu peso, some e divida pela soma dos pesos.`,
    explanation: {
      title: 'Por que a média sozinha engana — e o que olhar junto',
      body: `### 1. O efeito dos valores extremos

Salários de uma empresa: R$ 2.000, R$ 2.200, R$ 2.400, R$ 2.500 e R$ 60.000.

- **Média:** R$ 13.820
- **Mediana:** R$ 2.400

A média não descreve ninguém: quatro das cinco pessoas ganham muito menos que ela. A mediana descreve a realidade típica.

Regra prática: quando houver poucos valores muito distantes dos demais, a mediana é a medida honesta.

### 2. Mesma média, distribuições diferentes

Turma A: 5, 5, 5, 5, 5 → média 5, amplitude 0.
Turma B: 0, 2, 5, 8, 10 → média 5, amplitude 10.

Mesma média, situações pedagógicas opostas. Por isso média sem medida de dispersão é informação incompleta.

### 3. Média ponderada

Notas 6 (peso 2), 8 (peso 3) e 9 (peso 5):

(6×2 + 8×3 + 9×5) ÷ (2+3+5) = (12 + 24 + 45) ÷ 10 = **8,1**

Erro clássico: dividir por 3 (número de notas) em vez de 10 (soma dos pesos).

### 4. Como uma média muda quando entra um dado novo

Se a média de 9 valores é 7, a soma é 63. Entrando um décimo valor x, a nova média é (63 + x)/10.

- Para a média subir, x > 7.
- Para a média cair, x < 7.
- Para permanecer, x = 7.

Esse raciocínio — voltar da média para a **soma** — resolve boa parte das questões.

### 5. Leitura crítica de estatística na imprensa

Desconfie de:

- média sem informação sobre dispersão;
- percentual sem a base ("aumento de 200%" sobre 1 caso é 3 casos);
- comparação entre grupos de tamanhos muito diferentes;
- gráfico com eixo vertical que não começa em zero, exagerando variações.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — qual medida representa o bairro',
        body: `**Dados:** aluguéis em um bairro (em R$): 900, 950, 1.000, 1.000, 1.100, 1.200 e 9.500.

**Média:** (900 + 950 + 1.000 + 1.000 + 1.100 + 1.200 + 9.500) ÷ 7 = 15.650 ÷ 7 ≈ **R$ 2.236**

**Mediana:** com 7 valores ordenados, o 4º é o do meio → **R$ 1.000**

**Moda:** **R$ 1.000** (aparece duas vezes)

**Qual usar em uma reportagem sobre o custo de morar no bairro?** A **mediana**. A média foi puxada por um único imóvel atípico e sugere um bairro caro que não existe para quase ninguém.

**Se a prova pedir a interpretação:** a distância entre média e mediana é o próprio sinal de que há valores extremos nos dados.`,
      },
      {
        title: 'Exemplo resolvido 2 — a nota que falta',
        body: `**Situação:** um estudante tem 6,0; 7,5 e 5,5 em três provas de mesmo peso. Ele precisa de média 7,0 nas quatro provas do semestre. Qual nota precisa na quarta?

**Do resultado para a soma:** média 7,0 em 4 provas significa soma total 28,0.

**Soma atual:** 6,0 + 7,5 + 5,5 = 19,0

**Nota necessária:** 28,0 − 19,0 = **9,0**

**Complemento realista:** se a nota máxima fosse 8,0, a meta seria impossível — e reconhecer isso também é resposta válida em prova.`,
      },
    ],
    mistakes: `**1. Calcular a mediana sem ordenar os dados.**
A mediana é o valor central da lista **ordenada**. Sem ordenar, o resultado é aleatório.

**2. Dividir a média ponderada pelo número de notas.**
O divisor é a soma dos pesos, não a quantidade de valores.

**3. Tratar a média como se descrevesse todo mundo.**
Com valores extremos, a média pode não representar nenhum caso real do conjunto.`,
    selfCheck: [
      'Quando a mediana representa melhor um conjunto de dados do que a média?',
      'Por que duas turmas com a mesma média podem ter realidades muito diferentes?',
      'Como você descobre qual valor falta para atingir uma média-alvo?',
    ],
    questions: [
      q({
        slug: 'q-est-1',
        stem: 'Considere o conjunto de valores: 4, 7, 7, 9, 13. A média, a mediana e a moda são, respectivamente:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'cálculo das três medidas de tendência central',
        seconds: 90,
        errors: ['confundir mediana com média'],
        correct: 0,
        options: [
          ['8, 7 e 7', 'Média: 40 ÷ 5 = 8. Mediana: o terceiro valor da lista ordenada é 7. Moda: 7 aparece duas vezes.'],
          ['7, 8 e 7', 'Inverte média e mediana.', 'trocar as duas medidas'],
          ['8, 9 e 7', 'A mediana de cinco valores é o terceiro, que é 7, não 9.', 'errar a posição central'],
          ['8, 7 e 13', 'Moda é o valor mais frequente, não o maior.', 'confundir moda com máximo'],
          ['9, 7 e 7', 'A soma é 40, e não 45: a média é 8.', 'errar a soma'],
        ],
        explanation: 'Média é soma dividida pela quantidade; mediana é o valor central da lista ordenada; moda é o mais frequente.',
      }),
      q({
        slug: 'q-est-2',
        stem: 'Um estudante tem notas 7,0; 5,0 e 8,0 em três avaliações com pesos 2, 3 e 5, respectivamente. A média ponderada é:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação de média ponderada',
        seconds: 100,
        errors: ['dividir pelo número de notas'],
        correct: 3,
        options: [
          ['6,7', 'Corresponde à média simples das três notas.', 'ignorar os pesos'],
          ['7,3', 'Corresponde a somar os produtos e dividir por 3.', 'dividir pela quantidade de notas'],
          ['20,0', 'É a soma total dos produtos, sem a divisão.', 'esquecer de dividir'],
          ['6,9', '(7×2 + 5×3 + 8×5) ÷ (2+3+5) = (14 + 15 + 40) ÷ 10 = 69 ÷ 10 = 6,9.'],
          ['8,0', 'Considera apenas a nota de maior peso.', 'ignorar as demais notas'],
        ],
        explanation: 'Na média ponderada, o divisor é a soma dos pesos — aqui, 10.',
        strategy: 'Escreva a soma dos pesos antes de começar: é o erro mais comum do tópico.',
      }),
      q({
        slug: 'q-est-3',
        stem: 'A tabela mostra o número de livros lidos em um ano por sete pessoas de um grupo de leitura:\n\n| Pessoa | A | B | C | D | E | F | G |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| Livros | 3 | 4 | 4 | 5 | 6 | 7 | 45 |\n\nSobre a análise desses dados, a leitura mais adequada é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação do efeito de valor extremo sobre a média',
        seconds: 130,
        errors: ['usar a média sem observar o valor extremo'],
        correct: 1,
        options: [
          ['A média de 10,6 livros descreve bem o comportamento do grupo.', 'Seis das sete pessoas leram menos que a média: ela não descreve o grupo.', 'aceitar a média sem análise'],
          ['A mediana de 5 livros representa melhor o grupo, pois a média é puxada por um valor extremo.', 'A soma é 74, e a média ≈ 10,6 — acima de seis dos sete valores. A mediana (4º valor ordenado, igual a 5) representa o leitor típico.'],
          ['A moda de 4 livros é a única medida válida neste conjunto.', 'A moda é informativa, mas não invalida as demais medidas.', 'excluir medidas sem justificativa'],
          ['Os dados são inválidos porque uma das pessoas leu muito mais que as outras.', 'Um valor extremo é um dado legítimo; ele exige cuidado na escolha da medida, não descarte.', 'descartar dado incômodo'],
          ['A média e a mediana são iguais, pois o conjunto tem sete valores.', 'A média é ≈ 10,6 e a mediana é 5.', 'supor igualdade sem calcular'],
        ],
        explanation: 'Quando média e mediana ficam muito distantes, isso é sinal de valores extremos. Nesses casos, a mediana descreve melhor o caso típico.',
      }),
      q({
        slug: 'q-est-4',
        stem: 'Duas turmas fizeram a mesma prova:\n\n- Turma X: 5, 5, 6, 6, 6, 7, 7\n- Turma Y: 2, 3, 5, 6, 8, 9, 9\n\nSobre a comparação entre as turmas, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre conjuntos com mesma média e dispersões diferentes',
        seconds: 140,
        errors: ['comparar apenas as médias'],
        correct: 2,
        options: [
          ['A turma X teve desempenho superior, pois suas notas são mais altas.', 'As duas turmas têm a mesma soma (42) e a mesma média (6).', 'comparar sem calcular'],
          ['A turma Y teve desempenho superior, pois alcançou as maiores notas.', 'Notas máximas mais altas convivem com notas mínimas mais baixas; a média é a mesma.', 'olhar apenas os extremos superiores'],
          ['As duas turmas têm a mesma média, mas a turma Y apresenta dispersão muito maior, o que indica desempenhos mais desiguais.', 'Ambas somam 42 e têm média 6. A amplitude de X é 2 (de 5 a 7) e a de Y é 7 (de 2 a 9): a turma Y é bem mais heterogênea.'],
          ['A comparação é impossível porque as turmas têm notas diferentes.', 'É exatamente para isso que servem as medidas estatísticas.', 'recusar a comparação'],
          ['A turma X tem maior mediana, o que compensa a média igual.', 'As duas têm mediana 6.', 'supor diferença inexistente'],
        ],
        explanation: 'Média igual não significa realidade igual. A dispersão revela que a turma Y tem estudantes em situações muito distintas.',
        detail: 'Na prática pedagógica, a turma Y exige atenção diferenciada: há quem precise de recuperação e quem precise de aprofundamento na mesma sala.',
      }),
      q({
        slug: 'q-est-5',
        stem: 'Uma reportagem afirma: "O salário médio na empresa subiu 18% no último ano." O sindicato responde: "A mediana salarial ficou praticamente estável."\n\nSupondo que ambas as informações estejam corretas, a explicação mais consistente é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre medidas de centro, distribuição e leitura crítica de dados',
        seconds: 170,
        errors: ['supor que uma das partes mentiu', 'confundir média com mediana'],
        correct: 0,
        options: [
          ['Os aumentos se concentraram em poucos salários altos, o que eleva a média sem deslocar o valor central da distribuição.', 'A média responde ao total pago; a mediana, à posição central. Aumentos grandes em poucos cargos elevam a soma sem mover quem está no meio da lista.'],
          ['Uma das duas informações é necessariamente falsa, pois média e mediana devem variar juntas.', 'As duas medidas medem coisas diferentes e podem divergir sem contradição.', 'supor que as medidas são equivalentes'],
          ['A empresa contratou muitos funcionários novos, o que sempre aumenta a média.', 'Contratações podem puxar a média em qualquer direção, conforme os salários de entrada.', 'generalizar um efeito'],
          ['A mediana só não subiu porque foi calculada sobre um número par de funcionários.', 'A paridade do total afeta apenas o modo de cálculo, não a estabilidade do valor.', 'atribuir o efeito a um detalhe de cálculo'],
          ['O aumento de 18% na média garante que todos receberam pelo menos algum reajuste.', 'A média pode subir com a maioria dos salários congelados.', 'inferir efeito individual a partir da média'],
        ],
        explanation: 'A questão integra o entendimento de média, mediana e distribuição — e mostra por que a escolha da medida é também uma escolha argumentativa.',
      }),
      q({
        slug: 'q-est-rec-1',
        stem: 'A média de quatro números é 12. Se três deles são 10, 11 e 14, o quarto número é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'recuperação da soma a partir da média',
        seconds: 80,
        recovery: true,
        errors: ['tentar responder sem voltar à soma'],
        correct: 3,
        options: [
          ['12', 'Só seria correto se os outros três somassem 36, o que não é o caso.', 'supor que o valor coincide com a média'],
          ['15', 'Levaria a uma soma de 50, e a média seria 12,5.', 'errar a soma'],
          ['11', 'Levaria a uma soma de 46, e a média seria 11,5.', 'errar a soma'],
          ['13', 'Média 12 em quatro números significa soma 48. Como 10 + 11 + 14 = 35, o quarto é 48 − 35 = 13.'],
          ['14', 'Levaria a uma soma de 49, acima do necessário.', 'errar a subtração'],
        ],
        explanation: 'Volte da média para a soma total (12 × 4 = 48) e subtraia o que já é conhecido.',
      }),
    ],
  }),

  topic({
    slug: 'probabilidade',
    name: 'Probabilidade',
    subject: 'matematica',
    area: 'matematica',
    summary:
      'Calcular a chance de eventos simples e compostos, entender independência e ler probabilidade como informação para decisão.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 86,
    order: 8,
    prerequisites: ['razao-e-proporcao'],
    related: ['estatistica'],
    skill: {
      slug: 'calcular-e-interpretar-probabilidades',
      name: 'Calcular e interpretar probabilidades',
      description:
        'Determinar espaço amostral, calcular probabilidades simples e compostas e interpretar o resultado em contextos de decisão.',
    },
    quick: `**Fórmula base**

P(evento) = casos favoráveis ÷ casos possíveis — desde que todos os casos sejam **igualmente prováveis**.

Toda probabilidade fica entre 0 e 1 (ou 0% e 100%).

**Eventos compostos**

- **E** (os dois acontecem) → multiplique: P(A e B) = P(A) × P(B), se independentes.
- **OU** (pelo menos um) → some e desconte a interseção: P(A ou B) = P(A) + P(B) − P(A e B).
- **Complementar:** P(não A) = 1 − P(A). É o atalho para "pelo menos um".

**Com e sem reposição**

Sem reposição, o denominador muda a cada retirada. Ler essa palavra no enunciado vale a questão.

**Independência:** a moeda não tem memória. Cinco caras seguidas não alteram a chance da próxima.`,
    explanation: {
      title: 'Espaço amostral, eventos compostos e o que a probabilidade não diz',
      body: `### 1. Comece sempre pelo espaço amostral

A pergunta inicial é: **quantos resultados possíveis existem, e são igualmente prováveis?**

- Um dado: 6 resultados.
- Dois dados: 36 pares ordenados — não 11 somas, porque as somas não são igualmente prováveis.
- Uma moeda três vezes: 8 sequências.

Errar aqui invalida tudo o que vem depois.

### 2. "Pelo menos um" pede o complementar

*Jogando um dado três vezes, qual a chance de sair pelo menos um 6?*

Contar diretamente é trabalhoso. Pelo complementar:

- P(não sair 6 em uma jogada) = 5/6
- P(nenhum 6 em três jogadas) = (5/6)³ = 125/216
- P(pelo menos um 6) = 1 − 125/216 = **91/216 ≈ 42%**

Sempre que ler "pelo menos", teste o complementar antes de qualquer outra coisa.

### 3. Com reposição e sem reposição

Urna com 4 bolas azuis e 6 vermelhas.

- **Com reposição:** P(duas azuis) = (4/10) × (4/10) = 16/100 = 16%
- **Sem reposição:** P(duas azuis) = (4/10) × (3/9) = 12/90 ≈ 13,3%

Sem reposição, tanto o numerador quanto o denominador mudam.

### 4. Independência e a falácia do apostador

Se uma moeda honesta deu cinco caras seguidas, a chance de coroa na sexta continua 1/2. A moeda não "compensa" o passado.

O que é raro é a **sequência inteira** antes de começar (1/32). Depois que os cinco resultados já aconteceram, eles são fato, não probabilidade.

### 5. O que a probabilidade não diz

Uma chance de 70% de chuva não garante chuva, e uma de 5% não garante seca. Probabilidade descreve a frequência esperada em muitas repetições — é insumo para decisão, não previsão de um caso isolado.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — dois dados e a soma pedida',
        body: `**Situação:** dois dados comuns são lançados. Qual a probabilidade de a soma ser 8?

**Espaço amostral:** 6 × 6 = 36 pares ordenados.

**Casos favoráveis:** (2,6), (3,5), (4,4), (5,3), (6,2) → **5 casos**.

**Probabilidade:** 5/36 ≈ **13,9%**

**Erro clássico:** contar (2,6) e (6,2) como um caso só, chegando a 3/36. Os dados são distinguíveis, e o par ordenado importa.

**Extensão útil:** a soma 7 tem 6 casos favoráveis — é a mais provável de todas. Por isso 7 é o número central em jogos de dois dados.`,
      },
      {
        title: 'Exemplo resolvido 2 — sorteio sem reposição',
        body: `**Situação:** em uma caixa há 5 fichas premiadas e 15 comuns. Duas fichas são retiradas, sem reposição.

**a) Ambas premiadas:** (5/20) × (4/19) = 20/380 ≈ **5,3%**

**b) Nenhuma premiada:** (15/20) × (14/19) = 210/380 ≈ **55,3%**

**c) Pelo menos uma premiada:** 1 − 55,3% ≈ **44,7%**

**Repare no item c:** contar diretamente exigiria somar dois casos (uma premiada + duas premiadas). O complementar resolve em uma linha.`,
      },
    ],
    mistakes: `**1. Montar o espaço amostral errado.**
Com dois dados, são 36 pares — não 11 somas. Some apenas o que for igualmente provável.

**2. Ignorar "sem reposição".**
Sem reposição, o denominador diminui a cada retirada.

**3. Achar que resultados passados mudam a próxima chance.**
Eventos independentes não têm memória. Isso vale para moedas, dados e sorteios com reposição.`,
    selfCheck: [
      'Por que a soma 7 é mais provável que a soma 2 no lançamento de dois dados?',
      'Quando usar o complementar em vez de contar diretamente os casos favoráveis?',
      'O que muda no cálculo quando a retirada é feita sem reposição?',
    ],
    questions: [
      q({
        slug: 'q-prob-1',
        stem: 'Uma urna contém 3 bolas verdes, 5 azuis e 2 brancas. Retirando uma bola ao acaso, a probabilidade de ela ser azul é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'cálculo de probabilidade simples',
        seconds: 60,
        errors: ['errar o total de casos possíveis'],
        correct: 2,
        options: [
          ['5/8', 'Usa 8 como total, esquecendo as bolas brancas.', 'errar o espaço amostral'],
          ['3/10', 'Corresponde às bolas verdes.', 'responder outra cor'],
          ['1/2', 'Total de bolas: 3 + 5 + 2 = 10. Favoráveis: 5 azuis. P = 5/10 = 1/2.'],
          ['5/7', 'Usa 7 como total, esquecendo duas bolas.', 'errar o espaço amostral'],
          ['2/10', 'Corresponde às bolas brancas.', 'responder outra cor'],
        ],
        explanation: 'Probabilidade simples é casos favoráveis sobre o total de casos possíveis: 5 em 10.',
      }),
      q({
        slug: 'q-prob-2',
        stem: 'Uma moeda honesta é lançada três vezes. A probabilidade de sair pelo menos uma coroa é:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'uso do evento complementar',
        seconds: 110,
        errors: ['somar probabilidades individuais'],
        correct: 4,
        options: [
          ['1/8', 'É a probabilidade de sair coroa nas três jogadas.', 'responder o caso extremo'],
          ['3/8', 'Corresponde a exatamente uma coroa.', 'confundir "pelo menos uma" com "exatamente uma"'],
          ['1/2', 'É a probabilidade de coroa em um único lançamento.', 'ignorar as três jogadas'],
          ['3/2', 'Probabilidade não pode ser maior que 1.', 'somar probabilidades indevidamente'],
          ['7/8', 'O complementar de "pelo menos uma coroa" é "nenhuma coroa", isto é, três caras: (1/2)³ = 1/8. Logo, 1 − 1/8 = 7/8.'],
        ],
        explanation: 'Para "pelo menos um", calcule o complementar: 1 menos a probabilidade de nenhum.',
        strategy: 'Se a resposta passar de 1, há erro de método — provavelmente soma indevida.',
      }),
      q({
        slug: 'q-prob-3',
        stem: 'Uma pesquisa com 200 pessoas registrou o meio de transporte usado para ir ao trabalho:\n\n| Transporte | Pessoas |\n| --- | --- |\n| Ônibus | 90 |\n| Carro | 60 |\n| Bicicleta | 30 |\n| A pé | 20 |\n\nEscolhendo uma dessas pessoas ao acaso, a probabilidade de que ela NÃO use transporte motorizado é:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de tabela e cálculo de evento complementar',
        seconds: 120,
        errors: ['esquecer de somar as duas categorias'],
        correct: 1,
        options: [
          ['15%', 'Considera apenas quem usa bicicleta.', 'responder só uma categoria'],
          ['25%', 'Não motorizado reúne bicicleta (30) e a pé (20): 50 pessoas em 200, ou 25%.'],
          ['10%', 'Considera apenas quem vai a pé.', 'responder só uma categoria'],
          ['75%', 'É a probabilidade de usar transporte motorizado.', 'responder o complementar do pedido'],
          ['45%', 'Corresponde à proporção de quem usa ônibus.', 'responder outra categoria'],
        ],
        explanation: 'Bicicleta e a pé somam 50 pessoas. Sobre 200, isso equivale a 25%.',
      }),
      q({
        slug: 'q-prob-4',
        stem: 'Considere duas situações com uma urna que contém 4 fichas vermelhas e 6 azuis:\n\nI. Retirar duas fichas, com reposição, e obter duas vermelhas.\nII. Retirar duas fichas, sem reposição, e obter duas vermelhas.\n\nSobre as probabilidades, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre extração com e sem reposição',
        seconds: 140,
        errors: ['tratar as duas situações como iguais'],
        correct: 0,
        options: [
          ['A probabilidade em I é maior, pois em II a segunda retirada tem menos fichas vermelhas disponíveis.', 'I: (4/10) × (4/10) = 16%. II: (4/10) × (3/9) ≈ 13,3%. Sem reposição, tanto o numerador quanto o denominador diminuem.'],
          ['As duas probabilidades são iguais, pois a composição inicial é a mesma.', 'A composição muda depois da primeira retirada no caso II.', 'ignorar a mudança do espaço amostral'],
          ['A probabilidade em II é maior, pois há menos fichas na urna.', 'Menos fichas no total não compensa a perda de uma ficha vermelha.', 'raciocinar apenas pelo denominador'],
          ['Não é possível comparar sem saber a ordem das retiradas.', 'A ordem não altera o resultado neste caso.', 'introduzir variável desnecessária'],
          ['A probabilidade em I é o dobro da probabilidade em II.', 'A diferença é de 16% para 13,3%, e não do dobro.', 'exagerar a diferença'],
        ],
        explanation: 'Sem reposição, o segundo fator diminui em cima e embaixo, o que reduz a probabilidade em relação ao caso com reposição.',
      }),
      q({
        slug: 'q-prob-5',
        stem: 'Um teste rápido para uma doença acerta 95% dos casos positivos. Em uma cidade em que 1 em cada 1.000 pessoas tem a doença, uma pessoa sem sintomas recebe resultado positivo.\n\nA leitura mais adequada dessa situação é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre probabilidade, prevalência e interpretação de resultado de teste',
        seconds: 180,
        errors: ['confundir sensibilidade do teste com probabilidade de estar doente'],
        correct: 3,
        options: [
          ['A pessoa tem 95% de chance de estar doente, que é a taxa de acerto do teste.', 'A taxa de acerto responde a outra pergunta: dado que a pessoa está doente, qual a chance de o teste dar positivo.', 'inverter a condicional'],
          ['A pessoa certamente está doente, pois o teste é confiável.', 'Nenhum teste torna um resultado isolado uma certeza.', 'tratar probabilidade como certeza'],
          ['O resultado não traz nenhuma informação, pois a doença é rara.', 'O resultado aumenta bastante a probabilidade em relação à população geral; ele apenas não a torna alta em termos absolutos.', 'descartar informação relevante'],
          ['Como a doença é rara, boa parte dos positivos pode vir de falsos positivos, e um segundo exame é necessário.', 'Com prevalência de 1 em 1.000, mesmo uma pequena taxa de falso positivo gera mais positivos falsos que verdadeiros. Por isso um resultado isolado, sem sintomas, pede confirmação.'],
          ['A raridade da doença torna o teste inútil para qualquer finalidade.', 'O teste é útil como triagem; o que muda é a interpretação do resultado isolado.', 'generalizar a limitação'],
        ],
        explanation: 'A questão integra probabilidade condicional, prevalência e decisão prática: em doenças raras, a taxa de acerto do teste não é a probabilidade de estar doente.',
        detail: 'Este é um dos raciocínios mais úteis fora da escola: a mesma lógica vale para alarmes, filtros de spam e triagens em geral.',
      }),
      q({
        slug: 'q-prob-rec-1',
        stem: 'Um dado comum de seis faces é lançado uma vez. A probabilidade de sair um número maior que 4 é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'contagem de casos favoráveis',
        seconds: 60,
        recovery: true,
        errors: ['incluir o 4 entre os favoráveis'],
        correct: 2,
        options: [
          ['1/2', 'Corresponde a incluir 4, 5 e 6 — mas "maior que 4" exclui o próprio 4.', 'incluir o limite'],
          ['1/6', 'Corresponde a um único resultado favorável.', 'contar de menos'],
          ['1/3', 'Maiores que 4 são 5 e 6: dois casos em seis, ou seja, 2/6 = 1/3.'],
          ['2/3', 'Corresponde aos números menores ou iguais a 4.', 'responder o complementar'],
          ['5/6', 'Corresponde a excluir apenas um resultado.', 'errar a contagem'],
        ],
        explanation: '"Maior que 4" inclui apenas 5 e 6 — o próprio 4 fica de fora.',
      }),
    ],
  }),

  topic({
    slug: 'matematica-financeira',
    name: 'Matemática financeira',
    subject: 'matematica',
    area: 'matematica',
    summary:
      'Comparar juros simples e compostos, avaliar parcelamentos e descontos e decidir com base em custo total, não em impressão.',
    difficulty: 'challenging',
    minutes: 25,
    weight: 91,
    order: 9,
    prerequisites: ['porcentagem-e-variacao'],
    related: ['razao-e-proporcao'],
    skill: {
      slug: 'avaliar-situacoes-financeiras-com-juros-e-descontos',
      name: 'Avaliar situações financeiras com juros e descontos',
      description:
        'Calcular juros simples e compostos, comparar formas de pagamento e justificar decisões com base no custo total.',
    },
    quick: `**Juros simples:** incidem sempre sobre o valor inicial.
M = C · (1 + i·t)

**Juros compostos:** incidem sobre o montante acumulado.
M = C · (1 + i)^t

**A diferença cresce com o tempo.** Em 1 mês são iguais; em 12 meses, a distância já é grande; em anos, é enorme.

**Descontos sucessivos não se somam.** 20% e depois 10% dão 28%, não 30%:
0,80 × 0,90 = 0,72 → desconto total de 28%.

**Aumentar 20% e depois reduzir 20% não volta ao início:**
1,20 × 0,80 = 0,96 → perda de 4%.

**Comparar formas de pagamento é comparar valores totais**, nunca "parcela pequena" com "preço cheio".`,
    explanation: {
      title: 'Do "cabe no bolso" ao custo total: como comparar de verdade',
      body: `### 1. Simples x composto, com números

R$ 1.000 a 10% ao mês, por 3 meses:

**Simples:** 1.000 × (1 + 0,10 × 3) = **R$ 1.300**
**Composto:** 1.000 × 1,10³ = **R$ 1.331**

Diferença de R$ 31 em três meses. Em 12 meses: R$ 2.200 contra R$ 3.138 — R$ 938 de diferença. É o mesmo percentual, mas incidindo sobre bases diferentes.

### 2. O parcelamento "sem juros" que tem juros

Um produto custa R$ 1.000 à vista ou 10 × R$ 120.

- Total parcelado: R$ 1.200
- Diferença: R$ 200 sobre R$ 1.000 = **20% de acréscimo**

Chamar isso de "sem juros" é uma escolha de linguagem, não de matemática. O teste é sempre o mesmo: **compare o total pago com o preço à vista.**

Do outro lado: se o dinheiro parado renderia mais que o acréscimo, parcelar pode compensar. A decisão exige os dois números.

### 3. Descontos sucessivos

Aplicar 30% e depois mais 10%:

1 − (0,70 × 0,90) = 1 − 0,63 = **37% de desconto total**, e não 40%.

Cada desconto incide sobre o valor já reduzido. Por isso a ordem dos descontos não altera o resultado, mas somá-los sempre superestima o benefício.

### 4. Inflação e poder de compra

Um aumento salarial de 5% com inflação de 8% significa perda real:
1,05 ÷ 1,08 ≈ 0,972 → **perda de cerca de 2,8%** no poder de compra.

Ganho nominal e ganho real são coisas diferentes, e a prova gosta dessa distinção.

### 5. Checklist para decidir

1. Qual é o preço à vista?
2. Qual é o total pago em cada opção?
3. Existe rendimento possível para o dinheiro que ficaria parado?
4. O compromisso cabe no orçamento **mensal** sem comprometer o essencial?

Matemática financeira resolve os três primeiros. O quarto é decisão de vida — e a prova costuma reconhecer isso na alternativa correta.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — à vista com desconto ou parcelado',
        body: `**Situação:** um aparelho custa R$ 2.400 em 12 parcelas iguais "sem juros" ou R$ 2.100 à vista.

**Análise 1 — desconto embutido:**
2.100 ÷ 2.400 = 0,875 → o pagamento à vista custa 87,5% do parcelado, um desconto de **12,5%**.

**Análise 2 — sob a ótica do parcelamento:**
2.400 ÷ 2.100 ≈ 1,143 → parcelar custa **14,3% a mais** que o preço à vista.

**Repare:** 12,5% de desconto e 14,3% de acréscimo descrevem a mesma diferença, vista de bases diferentes. Confundir os dois é erro frequente.

**Decisão:** se o dinheiro renderia menos de 14,3% em 12 meses, pagar à vista é melhor. Se não há os R$ 2.100 disponíveis, a comparação muda de natureza — vira orçamento, não juros.`,
      },
      {
        title: 'Exemplo resolvido 2 — a dívida que dobra',
        body: `**Situação:** R$ 800 no rotativo do cartão a 12% ao mês, sem pagamento por 6 meses.

**Composto:** 800 × 1,12⁶ = 800 × 1,9738 ≈ **R$ 1.579**

**Se fosse simples:** 800 × (1 + 0,12 × 6) = **R$ 1.376**

**Diferença:** cerca de R$ 203 em seis meses — e a distância acelera a cada mês.

**Leitura importante:** a dívida quase dobrou em meio ano sem nenhuma compra nova. É por isso que rotativo de cartão é a modalidade mais cara do crédito ao consumidor no Brasil.`,
      },
    ],
    mistakes: `**1. Somar descontos sucessivos.**
20% + 10% não é 30%. Multiplique os fatores: 0,8 × 0,9 = 0,72, ou seja, 28%.

**2. Comparar parcela com preço à vista.**
A comparação honesta é total × total. Parcela pequena é informação de fluxo de caixa, não de custo.

**3. Usar juros simples onde o contrato é composto.**
Cartão, cheque especial e financiamento usam juros compostos. Usar a fórmula simples subestima a dívida.`,
    selfCheck: [
      'Por que dois descontos sucessivos de 20% e 10% não equivalem a 30%?',
      'Como você identifica juros embutidos em um parcelamento anunciado como "sem juros"?',
      'Qual a diferença entre ganho nominal e ganho real de um salário?',
    ],
    questions: [
      q({
        slug: 'q-fin-1',
        stem: 'Um capital de R$ 2.000,00 é aplicado a juros simples de 2% ao mês durante 5 meses. O montante final é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação da fórmula de juros simples',
        seconds: 90,
        errors: ['usar a fórmula de juros compostos'],
        correct: 1,
        options: [
          ['R$ 2.040,00', 'Corresponde a apenas um mês de juros.', 'ignorar o prazo'],
          ['R$ 2.200,00', 'Juros: 2.000 × 0,02 × 5 = R$ 200. Montante: 2.000 + 200 = R$ 2.200,00.'],
          ['R$ 2.208,16', 'É o montante a juros compostos, e não simples.', 'trocar o regime de capitalização'],
          ['R$ 2.100,00', 'Corresponde a 5% no período, e não a 2% ao mês por 5 meses.', 'errar a taxa acumulada'],
          ['R$ 2.400,00', 'Corresponde a 4% ao mês.', 'dobrar a taxa'],
        ],
        explanation: 'Em juros simples, os juros incidem sempre sobre o capital inicial: 2% × 5 = 10% de R$ 2.000.',
      }),
      q({
        slug: 'q-fin-2',
        stem: 'Uma loja anuncia um sofá por R$ 1.800,00 à vista ou em 12 parcelas de R$ 175,00 "sem juros".\n\nSobre essa oferta, é correto afirmar que:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'identificação de juros embutidos em parcelamento',
        seconds: 120,
        errors: ['aceitar o rótulo "sem juros"', 'comparar parcela com preço à vista'],
        correct: 2,
        options: [
          ['Realmente não há juros, pois o anúncio informa "sem juros".', 'O total parcelado supera o preço à vista, o que caracteriza acréscimo.', 'aceitar o rótulo sem verificar'],
          ['A parcela de R$ 175,00 é menor que R$ 1.800,00, o que já comprova vantagem do parcelamento.', 'Comparar parcela com preço total não é uma comparação válida.', 'comparar grandezas diferentes'],
          ['Há um acréscimo de R$ 300,00, o que corresponde a cerca de 16,7% sobre o preço à vista.', 'Total parcelado: 12 × 175 = R$ 2.100. Diferença: R$ 300 sobre R$ 1.800, ou seja, ≈ 16,7% de acréscimo.'],
          ['Há um acréscimo de R$ 300,00, o que corresponde a 30% sobre o preço à vista.', 'O valor absoluto está certo, mas 300 sobre 1.800 é ≈ 16,7%, não 30%.', 'errar a base do percentual'],
          ['O parcelamento é sempre a melhor opção, pois preserva o dinheiro em caixa.', 'Preservar caixa pode ser desejável, mas isso é uma decisão de orçamento, não uma vantagem financeira automática.', 'generalizar uma decisão'],
        ],
        explanation: 'A verificação é sempre a mesma: some as parcelas e compare com o preço à vista. A diferença dividida pelo preço à vista dá o acréscimo real.',
        strategy: 'Nunca compare parcela com preço total: compare total com total.',
      }),
      q({
        slug: 'q-fin-3',
        stem: 'A tabela mostra a evolução de uma dívida de R$ 1.000,00 em dois regimes, com taxa de 10% ao mês:\n\n| Mês | Juros simples | Juros compostos |\n| --- | --- | --- |\n| 1 | 1.100 | 1.100 |\n| 2 | 1.200 | 1.210 |\n| 3 | 1.300 | 1.331 |\n| 6 | 1.600 | 1.772 |\n\nA leitura correta dos dados indica que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'interpretação da diferença crescente entre os dois regimes',
        seconds: 130,
        errors: ['achar que a diferença é constante'],
        correct: 0,
        options: [
          ['A diferença entre os dois regimes cresce com o tempo, porque no regime composto os juros passam a incidir também sobre juros anteriores.', 'No mês 1 os valores coincidem; no mês 3 diferem em R$ 31; no mês 6, em R$ 172. A base de cálculo do regime composto aumenta a cada período.'],
          ['A diferença entre os regimes é constante e igual a R$ 100,00 por mês.', 'A tabela mostra diferenças de R$ 0, R$ 10, R$ 31 e R$ 172 — crescentes.', 'supor crescimento linear'],
          ['O regime simples é sempre mais caro para quem deve.', 'É o contrário: o composto acumula mais.', 'inverter a comparação'],
          ['Os dois regimes produzem o mesmo resultado em qualquer prazo.', 'Só coincidem no primeiro período.', 'ignorar os dados da tabela'],
          ['O regime composto só é desvantajoso a partir de um ano.', 'A desvantagem começa já no segundo mês, e apenas se amplia.', 'errar o momento da divergência'],
        ],
        explanation: 'No regime composto, cada mês parte de um montante maior. Isso faz a diferença crescer de forma acelerada, não linear.',
      }),
      q({
        slug: 'q-fin-4',
        stem: 'Duas lojas anunciam o mesmo produto de R$ 500,00:\n\n- Loja A: desconto único de 25%.\n- Loja B: desconto de 15% e, sobre o valor já reduzido, mais 10%.\n\nSobre os preços finais, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre desconto único e descontos sucessivos',
        seconds: 140,
        errors: ['somar os descontos sucessivos'],
        correct: 3,
        options: [
          ['Os preços finais são iguais, pois 15% + 10% = 25%.', 'Descontos sucessivos não se somam: incidem sobre bases diferentes.', 'somar percentuais sucessivos'],
          ['A loja B é mais barata, pois oferece dois descontos.', 'Dois descontos não garantem desconto maior.', 'contar descontos em vez de calcular'],
          ['A loja B é mais barata em R$ 12,50.', 'O valor está certo em módulo, mas favorece a loja errada.', 'inverter o sinal da diferença'],
          ['A loja A é mais barata em R$ 7,50.', 'Loja A: 500 × 0,75 = R$ 375,00. Loja B: 500 × 0,85 × 0,90 = R$ 382,50. A diferença é de R$ 7,50 a favor da loja A.'],
          ['Não é possível comparar sem saber a ordem dos descontos na loja B.', 'A ordem dos descontos sucessivos não altera o resultado final.', 'introduzir variável irrelevante'],
        ],
        explanation: 'Descontos sucessivos de 15% e 10% equivalem a 23,5% (1 − 0,85 × 0,90), abaixo dos 25% da loja A.',
        detail: 'Regra prática: dois descontos sucessivos sempre resultam em menos que a soma dos dois percentuais.',
      }),
      q({
        slug: 'q-fin-5',
        stem: 'Uma pessoa tem R$ 3.000,00 guardados rendendo 0,8% ao mês. Ela quer comprar um equipamento que custa R$ 3.000,00 à vista ou 10 parcelas de R$ 330,00.\n\nA análise financeira mais completa dessa decisão indica que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre custo do parcelamento, rendimento da aplicação e decisão prática',
        seconds: 190,
        errors: ['ignorar o rendimento da aplicação', 'comparar apenas os totais sem olhar as taxas'],
        correct: 1,
        options: [
          ['Parcelar é sempre melhor, pois o dinheiro continua rendendo na aplicação.', 'O rendimento precisa superar o acréscimo do parcelamento — e aqui não supera.', 'generalizar sem comparar taxas'],
          ['O parcelamento custa 10% a mais no total, acréscimo superior ao que os R$ 3.000,00 renderiam no período, o que favorece a compra à vista.', 'Total parcelado: 10 × 330 = R$ 3.300, ou 10% de acréscimo. A aplicação renderia cerca de 8,3% em 10 meses (1,008¹⁰ ≈ 1,083), abaixo do custo do parcelamento.'],
          ['As duas opções são equivalentes, pois o valor à vista é igual ao total das parcelas.', 'O total parcelado é R$ 3.300, e não R$ 3.000.', 'errar a soma das parcelas'],
          ['Pagar à vista é melhor apenas se a pessoa não tiver outra reserva de emergência.', 'Ter reserva é um critério relevante, mas a comparação de custo já favorece o pagamento à vista.', 'trocar o critério financeiro por outro'],
          ['A decisão depende exclusivamente do valor da parcela caber no orçamento mensal.', 'Caber no orçamento é condição necessária, não suficiente: o custo total também pesa.', 'reduzir a decisão a um só critério'],
        ],
        explanation: 'A questão integra três cálculos: acréscimo do parcelamento, rendimento da aplicação no mesmo prazo e comparação entre os dois percentuais.',
        detail: 'Se a aplicação rendesse mais de 10% em 10 meses, a conclusão se inverteria — e é isso que torna a comparação necessária em vez de uma regra fixa.',
      }),
      q({
        slug: 'q-fin-rec-1',
        stem: 'Um produto de R$ 200,00 recebe um desconto de 10% e, sobre o valor já reduzido, mais 10%. O preço final é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'cálculo de descontos sucessivos',
        seconds: 80,
        recovery: true,
        errors: ['somar os dois descontos'],
        correct: 2,
        options: [
          ['R$ 160,00', 'Corresponde a somar os descontos e aplicar 20% de uma vez.', 'somar descontos sucessivos'],
          ['R$ 180,00', 'Corresponde a aplicar apenas um dos descontos.', 'esquecer o segundo desconto'],
          ['R$ 162,00', '200 × 0,90 = 180; 180 × 0,90 = R$ 162,00. O desconto total é de 19%, não de 20%.'],
          ['R$ 170,00', 'Não corresponde a nenhuma etapa do cálculo.', 'estimar sem calcular'],
          ['R$ 164,00', 'Não corresponde ao produto dos fatores de desconto.', 'errar a multiplicação'],
        ],
        explanation: 'O segundo desconto incide sobre o valor já reduzido: 0,90 × 0,90 = 0,81, isto é, 19% de desconto total.',
      }),
    ],
  }),
];

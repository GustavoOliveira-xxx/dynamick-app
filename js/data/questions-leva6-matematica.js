import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_6_2026_08';
const support = 'Situação e dados autorais criados para a sexta atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'porcentagem-e-variacao',
    skillSlug: 'resolver-situacoes-com-variacao-percentual',
    reasoning: 'cálculo e interpretação de variações percentuais sucessivas',
    errors: ['usar a base percentual errada'],
    strategy: 'Identifique a base de cada variação e use fatores multiplicativos.',
    items: [
      ['Uma mensalidade de R$ 250 recebeu reajuste de 8%. Qual passou a ser o valor cobrado?', 'R$ 270,00.', ['R$ 258,00.', 'R$ 268,00.', 'R$ 275,00.', 'R$ 330,00.'], 'O reajuste é 0,08 × 250 = 20; portanto, 250 + 20 = 270.'],
      ['Após um desconto de 25%, um casaco passou a custar R$ 450. Qual era o preço antes do desconto?', 'R$ 600,00.', ['R$ 562,50.', 'R$ 575,00.', 'R$ 475,00.', 'R$ 337,50.'], 'R$ 450 representam 75% do preço original; 450 ÷ 0,75 = 600.'],
      ['A participação em um projeto aumentou de 40 para 50 estudantes. Qual foi a variação percentual?', 'Aumento de 25%.', ['Aumento de 10%.', 'Aumento de 20%.', 'Aumento de 40%.', 'Aumento de 50%.'], 'O aumento foi 10 sobre a base inicial 40; 10 ÷ 40 = 25%.'],
      ['Um preço sobe 20% e depois cai 20%. Comparado ao valor inicial, o preço final fica:', '4% menor.', ['Igual.', '4% maior.', '20% menor.', '40% menor.'], 'Os fatores são 1,20 e 0,80; o produto 0,96 deixa o preço 4% abaixo do inicial.'],
      ['Um índice passa de 80 para 100 e depois de 100 para 90. As duas variações são, respectivamente:', '+25% e −10%.', ['+20% e −10%.', '+25% e −12,5%.', '+20% e −20%.', '+10% e −10%.'], 'Cada etapa tem sua própria base: 20 ÷ 80 = 25% e −10 ÷ 100 = −10%.'],
    ],
  },
  {
    topicSlug: 'leitura-de-graficos-e-tabelas',
    skillSlug: 'extrair-comparar-interpretar-dados',
    reasoning: 'leitura crítica de escala, frequência e proporcionalidade em dados',
    errors: ['ignorar eixo, unidade ou total de referência'],
    strategy: 'Leia título, fonte, eixos, unidades e total antes de calcular.',
    items: [
      ['Uma tabela registra 18, 22, 15 e 25 atendimentos em quatro semanas. Quantos atendimentos houve no total?', '80 atendimentos.', ['62 atendimentos.', '75 atendimentos.', '82 atendimentos.', '100 atendimentos.'], 'Somar as quatro frequências produz 18 + 22 + 15 + 25 = 80.'],
      ['Duas barras representam 102 e 106, mas o eixo começa em 100. Por que a diferença visual pode enganar?', 'Porque o eixo truncado amplia uma diferença numérica pequena.', ['Porque gráficos de barras não aceitam números pares.', 'Porque 106 é mais que o dobro de 102.', 'Porque todo eixo precisa terminar em 100.', 'Porque as barras deveriam ter a mesma altura.'], 'A diferença real é 4 em 102, cerca de 3,9%, embora o recorte do eixo a faça parecer enorme.'],
      ['Em um gráfico de setores, uma categoria ocupa 72°. Qual percentual do total ela representa?', '20%.', ['15%.', '25%.', '36%.', '72%.'], 'Uma volta tem 360°; 72 ÷ 360 = 0,20, ou 20%.'],
      ['A cidade A teve 500 casos em 100 mil habitantes; a B, 300 casos em 30 mil. Qual apresentou maior taxa?', 'A cidade B, com 10 casos por mil habitantes.', ['A cidade A, porque teve mais casos absolutos.', 'As duas, com a mesma taxa.', 'A cidade A, com 50 casos por mil.', 'Não é possível comparar populações diferentes.'], 'A tem 5 casos por mil e B tem 10 por mil; taxas tornam populações diferentes comparáveis.'],
      ['Uma série mensal é 12, 15, 14, 18 e 21. Qual descrição preserva melhor a trajetória?', 'Há tendência geral de alta, apesar de uma queda intermediária.', ['Há queda contínua.', 'Os valores permanecem constantes.', 'O valor final é exatamente o dobro do inicial.', 'Não existe qualquer tendência.'], 'O valor final supera o inicial e só há uma queda, de 15 para 14, no meio da série.'],
    ],
  },
  {
    topicSlug: 'funcoes-e-relacoes',
    skillSlug: 'interpretar-relacoes-entre-grandezas',
    reasoning: 'modelagem de dependência entre grandezas e interpretação de parâmetros',
    errors: ['confundir valor inicial com taxa de variação'],
    strategy: 'Separe parcela fixa, taxa e domínio antes de substituir valores.',
    items: [
      ['Um táxi cobra R$ 7 de bandeirada e R$ 2,50 por quilômetro. Quanto custa uma corrida de 6 km?', 'R$ 22,00.', ['R$ 15,00.', 'R$ 17,50.', 'R$ 21,00.', 'R$ 42,00.'], 'O modelo é C(x) = 7 + 2,50x; C(6) = 7 + 15 = 22.'],
      ['Na função P(t) = 120 − 8t, que descreve a quantidade restante, o número −8 indica:', 'Redução de 8 unidades por período.', ['Quantidade inicial de 8 unidades.', 'Aumento de 8 unidades por período.', 'Tempo máximo de 8 períodos.', 'Preço de cada unidade.'], 'O coeficiente de t é a taxa de variação; o sinal negativo indica redução.'],
      ['Qual é o zero da função f(x) = 3x − 18?', 'x = 6.', ['x = −6.', 'x = 3.', 'x = 18.', 'x = 54.'], 'No zero, f(x)=0: 3x − 18 = 0, então x = 6.'],
      ['Os pontos (1,5), (2,8) e (3,11) pertencem a uma relação com:', 'Taxa constante 3 e expressão y = 3x + 2.', ['Taxa constante 2 e expressão y = 2x + 3.', 'Taxa variável e expressão y = x² + 4.', 'Taxa constante 5 e expressão y = 5x.', 'Nenhuma relação funcional.'], 'A cada aumento de 1 em x, y cresce 3; usando (1,5), o termo inicial é 2.'],
      ['Uma caixa suporta no máximo 12 kg. Se x é a massa colocada nela, qual domínio representa o uso seguro?', '0 ≤ x ≤ 12.', ['x > 12.', 'x < 0.', 'x = 12 apenas.', 'Todos os números reais.'], 'A massa não pode ser negativa nem superar a capacidade declarada.'],
    ],
  },
  {
    topicSlug: 'razao-e-proporcao',
    skillSlug: 'comparar-grandezas-por-razao-e-proporcao',
    reasoning: 'comparação de grandezas e manutenção de razões equivalentes',
    errors: ['inverter a ordem da razão ou misturar unidades'],
    strategy: 'Mantenha a ordem das grandezas e iguale unidades antes de comparar.',
    items: [
      ['Uma tinta mistura 3 partes de azul para 2 de branco. Com 12 partes de azul, quantas de branco mantêm a cor?', '8 partes.', ['6 partes.', '10 partes.', '12 partes.', '18 partes.'], 'O azul foi multiplicado por 4; o branco também deve ser: 2 × 4 = 8.'],
      ['Em uma escala 1:25 000, uma distância de 8 cm no mapa corresponde a:', '2 km.', ['200 m.', '20 km.', '3,125 km.', '200 km.'], '8 × 25 000 = 200 000 cm, que equivalem a 2 km.'],
      ['Uma turma tem 18 meninas e 12 meninos. A razão meninas:meninos, na forma simplificada, é:', '3:2.', ['2:3.', '18:30.', '6:4.', '1:2.'], 'Dividindo os dois termos por 6, 18:12 simplifica para 3:2.'],
      ['O suco A usa 4 colheres em 800 mL; o B, 3 colheres em 500 mL. Qual é mais concentrado?', 'O B, com 0,006 colher por mL.', ['O A, porque usa mais colheres no total.', 'Os dois têm a mesma concentração.', 'O A, com 0,008 colher por mL.', 'Não se pode comparar volumes diferentes.'], 'A razão do A é 4/800 = 0,005 e a do B é 3/500 = 0,006 colher por mL.'],
      ['R$ 1 800 serão divididos na razão 2:3:4. Quanto recebe a parte intermediária?', 'R$ 600.', ['R$ 400.', 'R$ 450.', 'R$ 800.', 'R$ 900.'], 'As partes somam 9; cada parte vale 200 e a parte intermediária recebe 3 × 200 = 600.'],
    ],
  },
  {
    topicSlug: 'regra-de-tres',
    skillSlug: 'resolver-situacoes-com-regra-de-tres',
    reasoning: 'resolução de proporcionalidade direta, inversa e composta',
    errors: ['tratar relação inversa como direta'],
    strategy: 'Classifique como cada grandeza varia em relação à incógnita.',
    items: [
      ['Cinco cadernos custam R$ 45. Mantido o preço unitário, quanto custam oito cadernos?', 'R$ 72.', ['R$ 48.', 'R$ 67.', 'R$ 80.', 'R$ 90.'], 'Cada caderno custa 45 ÷ 5 = 9; oito custam 8 × 9 = 72.'],
      ['Doze trabalhadores concluem uma obra em 15 dias. No mesmo ritmo, 18 trabalhadores levariam:', '10 dias.', ['20 dias.', '22,5 dias.', '12 dias.', '8 dias.'], 'Trabalhadores e tempo são inversos: 12 × 15 = 18 × t, logo t = 10.'],
      ['Quatro máquinas produzem 960 peças em 6 horas. Quantas peças seis máquinas produzem em 8 horas?', '1 920 peças.', ['1 280 peças.', '1 440 peças.', '2 880 peças.', '7 680 peças.'], 'A produção varia diretamente com máquinas e horas: 960 × 6/4 × 8/6 = 1 920.'],
      ['Um carro percorre 210 km com 14 L. Mantido o consumo, quantos litros usa em 360 km?', '24 L.', ['18 L.', '21 L.', '25 L.', '30 L.'], 'O consumo é 210 ÷ 14 = 15 km/L; 360 ÷ 15 = 24 L.'],
      ['Uma receita para 9 pessoas usa 675 g de farinha. Para 14 pessoas, mantendo a porção, serão necessários:', '1 050 g.', ['750 g.', '875 g.', '945 g.', '1 125 g.'], 'São 675 ÷ 9 = 75 g por pessoa; 75 × 14 = 1 050 g.'],
    ],
  },
  {
    topicSlug: 'geometria-plana',
    skillSlug: 'calcular-e-aplicar-medidas-em-figuras-planas',
    reasoning: 'cálculo e interpretação de perímetro, área e semelhança',
    errors: ['confundir medida linear com medida de superfície'],
    strategy: 'Identifique se a pergunta pede contorno, superfície, ângulo ou escala.',
    items: [
      ['Um jardim retangular mede 14 m por 9 m. Quantos metros de cerca contornam todo o jardim?', '46 m.', ['23 m.', '126 m.', '84 m.', '36 m.'], 'O perímetro é 2 × (14 + 9) = 46 m.'],
      ['Um trapézio tem bases 12 cm e 8 cm e altura 5 cm. Qual é sua área?', '50 cm².', ['40 cm².', '60 cm².', '100 cm².', '25 cm².'], 'A área é (12 + 8) × 5 ÷ 2 = 50 cm².'],
      ['Um círculo tem diâmetro 10 cm. Usando π ≈ 3,14, qual é sua área?', '78,5 cm².', ['31,4 cm².', '62,8 cm².', '157 cm².', '314 cm².'], 'O raio é 5 cm; A = πr² = 3,14 × 25 = 78,5 cm².'],
      ['Dois triângulos semelhantes têm lados correspondentes 4 cm e 10 cm. O fator de ampliação do menor para o maior é:', '2,5.', ['1,5.', '4.', '6.', '40.'], 'O fator linear é a razão entre lados correspondentes: 10 ÷ 4 = 2,5.'],
      ['Uma figura em L é formada por retângulos sem sobreposição de 24 m², 15 m² e 9 m². Qual é a área total?', '48 m².', ['30 m².', '39 m².', '54 m².', '72 m².'], 'Sem sobreposição, a área da figura é a soma das partes: 24 + 15 + 9 = 48 m².'],
    ],
  },
  {
    topicSlug: 'estatistica',
    skillSlug: 'interpretar-medidas-estatisticas-em-contexto',
    reasoning: 'síntese de dados e escolha crítica de medidas estatísticas',
    errors: ['escolher uma medida sem considerar a distribuição'],
    strategy: 'Ordene os dados e observe extremos antes de escolher a medida.',
    items: [
      ['As idades 14, 15, 15, 16 e 20 têm média aritmética igual a:', '16 anos.', ['15 anos.', '15,5 anos.', '16,5 anos.', '20 anos.'], 'A soma é 80 e há cinco valores; 80 ÷ 5 = 16.'],
      ['Nos valores 3, 5, 8, 11, 12 e 20, qual é a mediana?', '9,5.', ['8.', '11.', '9.', '12.'], 'Com seis valores, a mediana é a média dos dois centrais: (8 + 11) ÷ 2 = 9,5.'],
      ['Em salários 2, 2, 3, 3 e 30 mil reais, qual medida representa melhor o valor típico?', 'A mediana, de 3 mil reais.', ['A média, de 8 mil reais.', 'A amplitude, de 28 mil reais.', 'O máximo, de 30 mil reais.', 'A soma, de 40 mil reais.'], 'O valor extremo eleva a média; a mediana permanece ligada ao centro da distribuição.'],
      ['Uma pesquisa com 200 pessoas teve 70 respostas “sim”. Qual é a frequência relativa dessa resposta?', '35%.', ['28,6%.', '70%.', '130%.', '140%.'], 'A frequência relativa é 70 ÷ 200 = 0,35, ou 35%.'],
      ['Duas turmas têm média 7; a primeira tem desvio pequeno e a segunda, grande. Isso indica que:', 'A segunda turma tem resultados mais dispersos em torno da média.', ['A segunda turma tem necessariamente média maior.', 'A primeira turma tem mais estudantes.', 'As duas distribuições são idênticas.', 'O desvio não informa variação.'], 'Maior dispersão significa maior afastamento dos valores em relação à média, ainda que as médias coincidam.'],
    ],
  },
  {
    topicSlug: 'probabilidade',
    skillSlug: 'calcular-e-interpretar-probabilidades',
    reasoning: 'contagem de possibilidades, eventos complementares e dependência',
    errors: ['ignorar o espaço amostral ou a dependência'],
    strategy: 'Liste os resultados possíveis e verifique se há reposição.',
    items: [
      ['Ao sortear um número de 1 a 10, qual é a probabilidade de ele ser múltiplo de 3?', '3/10.', ['1/10.', '1/3.', '4/10.', '7/10.'], 'Os múltiplos são 3, 6 e 9: três casos favoráveis em dez possíveis.'],
      ['Uma urna tem 5 bolas vermelhas e 3 verdes. A probabilidade de retirar uma bola que não seja verde é:', '5/8.', ['3/8.', '1/2.', '5/3.', '8/5.'], 'Não ser verde significa ser vermelha: cinco resultados favoráveis entre oito bolas.'],
      ['Um dado honesto é lançado. Sabendo que o resultado foi par, qual é a probabilidade de ele ser maior que 3?', '2/3.', ['1/6.', '1/3.', '1/2.', '5/6.'], 'No espaço amostral condicionado {2, 4, 6}, dois resultados, 4 e 6, são maiores que 3.'],
      ['Duas cartas são retiradas sem reposição. Por que os eventos são dependentes?', 'Porque a primeira retirada altera o total e a composição para a segunda.', ['Porque as cartas deixam de ser aleatórias.', 'Porque a segunda carta é sempre igual à primeira.', 'Porque toda probabilidade vira 50%.', 'Porque o baralho aumenta depois da primeira retirada.'], 'Sem reposição, o espaço amostral da segunda retirada depende do resultado da primeira.'],
      ['Se P(A)=0,35 e A é complementar a B, então P(B) vale:', '0,65.', ['0,35.', '0,30.', '1,35.', '35.'], 'Eventos complementares somam 1; logo P(B) = 1 − 0,35 = 0,65.'],
    ],
  },
  {
    topicSlug: 'matematica-financeira',
    skillSlug: 'avaliar-situacoes-financeiras-com-juros-e-descontos',
    reasoning: 'comparação de juros, descontos, inflação e custo total',
    errors: ['comparar parcelas em vez do custo total'],
    strategy: 'Alinhe taxa e prazo e compare montantes completos.',
    items: [
      ['R$ 1 500 rendem juros simples de 3% ao mês por 4 meses. Qual é o montante?', 'R$ 1 680.', ['R$ 1 545.', 'R$ 1 620.', 'R$ 1 688,26.', 'R$ 1 950.'], 'Os juros são 1 500 × 0,03 × 4 = 180; o montante é 1 680.'],
      ['R$ 2 000 aplicados a juros compostos de 5% por dois períodos resultam em:', 'R$ 2 205.', ['R$ 2 100.', 'R$ 2 200.', 'R$ 2 250.', 'R$ 2 500.'], 'O montante é 2 000 × 1,05² = 2 205.'],
      ['Um produto custa R$ 1 200 à vista ou 12 parcelas de R$ 112. Qual é o acréscimo nominal do parcelamento?', 'R$ 144.', ['R$ 112.', 'R$ 120.', 'R$ 1 344.', 'R$ 2 544.'], 'O total parcelado é 12 × 112 = 1 344; a diferença para 1 200 é 144.'],
      ['Uma aplicação rende 7% no período em que a inflação foi 9%. O poder de compra:', 'Diminui, porque o rendimento ficou abaixo da inflação.', ['Aumenta 16%.', 'Aumenta 2%.', 'Permanece exatamente igual.', 'Dobra porque houve rendimento positivo.'], 'Ganho nominal menor que a inflação significa retorno real negativo.'],
      ['Uma loja oferece 15% de desconto em um item de R$ 640. Qual é o preço final?', 'R$ 544.', ['R$ 96.', 'R$ 625.', 'R$ 736.', 'R$ 550.'], 'O desconto é 0,15 × 640 = 96; o preço final é 640 − 96 = 544.'],
    ],
  },
];

export const MATEMATICA_QUESTOES_LEVA_6 = buildQuestionBatch({
  batch: 6,
  origin,
  support,
  sets,
});

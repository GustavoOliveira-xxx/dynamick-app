import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_7_2026_08';
const support = 'Situação e dados autorais criados para a sétima atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'porcentagem-e-variacao', skillSlug: 'resolver-situacoes-com-variacao-percentual', reasoning: 'análise de percentuais, bases e variação acumulada', errors: ['aplicar o percentual sobre a base errada'], strategy: 'Identifique a base de cada etapa antes de multiplicar pelo percentual.',
    items: [
      ['Uma conta de R$ 180 recebe multa de 5%. Qual é o total a pagar?', 'R$ 189,00.', ['R$ 185,00.', 'R$ 190,00.', 'R$ 171,00.', 'R$ 270,00.'], 'Cinco por cento de 180 são 9; o total é 189.'],
      ['Uma população passou de 2 400 para 2 760 habitantes. O crescimento percentual foi:', '15%.', ['12%.', '13%.', '18%.', '36%.'], 'O aumento de 360 dividido pela base 2 400 vale 0,15.'],
      ['Um produto de R$ 500 tem desconto de 10% e depois mais 20% sobre o preço reduzido. O valor final é:', 'R$ 360,00.', ['R$ 350,00.', 'R$ 370,00.', 'R$ 400,00.', 'R$ 450,00.'], '500 × 0,90 × 0,80 = 360.'],
      ['Uma taxa cai de 8% para 6%. A queda em pontos percentuais e a queda relativa são:', '2 pontos percentuais e 25%.', ['2 pontos e 2%.', '25 pontos e 2%.', '6 pontos e 75%.', '8 pontos e 25%.'], 'A diferença é 2 pontos; relativamente à taxa inicial, 2/8 = 25%.'],
      ['Após aumentar 25%, um valor precisa ser multiplicado por qual fator para voltar ao inicial?', '0,8.', ['0,75.', '1,25.', '0,25.', '1,8.'], 'O inverso de 1,25 é 0,8; uma redução de 20% desfaz o aumento.'],
    ],
  },
  {
    topicSlug: 'leitura-de-graficos-e-tabelas', skillSlug: 'extrair-comparar-interpretar-dados', reasoning: 'interpretação de escala, taxa e tendência em dados', errors: ['ignorar unidade ou denominador'], strategy: 'Leia título, eixos, unidade, fonte e base de comparação antes de concluir.',
    items: [
      ['Uma tabela mostra vendas de 32, 45, 38 e 55 unidades. Entre quais períodos ocorreu o maior aumento?', 'Do terceiro para o quarto.', ['Do primeiro para o segundo.', 'Do segundo para o terceiro.', 'Do primeiro para o terceiro.', 'Os aumentos foram iguais.'], 'As variações são +13, −7 e +17; a maior é a última.'],
      ['Num gráfico, 1 cm representa 200 pessoas. Uma barra de 3,5 cm corresponde a:', '700 pessoas.', ['203,5 pessoas.', '350 pessoas.', '600 pessoas.', '7 000 pessoas.'], '3,5 × 200 = 700.'],
      ['Uma tabela registra 40 aprovados em 50 inscritos na escola A e 72 em 100 na B. Qual teve maior taxa?', 'A escola A, com 80%.', ['A escola B, com 72%.', 'As duas, com 76%.', 'A escola B, porque teve mais aprovados.', 'Não se pode comparar.'], '40/50 = 80%, superior a 72/100 = 72%.'],
      ['Um gráfico de linha sobe de 20 para 30, cai para 24 e termina em 36. A descrição correta é:', 'Houve oscilações, mas o valor final ficou 80% acima do inicial.', ['Houve crescimento contínuo.', 'O valor final dobrou.', 'A queda anulou todo crescimento.', 'O valor final ficou 16% acima.'], 'A trajetória oscila e a variação total é 16/20 = 80%.'],
      ['Um mapa colore estados pelo número total de casos, sem considerar população. Para comparar risco, seria melhor usar:', 'Casos por habitante.', ['Apenas a área territorial.', 'O nome dos estados.', 'A cor mais escura sempre.', 'A ordem alfabética.'], 'Uma taxa populacional fornece denominador comparável.'],
    ],
  },
  {
    topicSlug: 'funcoes-e-relacoes', skillSlug: 'interpretar-relacoes-entre-grandezas', reasoning: 'modelagem, domínio e taxa de variação', errors: ['trocar termo fixo pela taxa'], strategy: 'Traduza o contexto em variável, taxa, parcela fixa e restrições.',
    items: [
      ['Um estacionamento cobra R$ 6 fixos mais R$ 4 por hora. A função do custo para h horas é:', 'C(h)=6+4h.', ['C(h)=10h.', 'C(h)=6h+4.', 'C(h)=24h.', 'C(h)=4/h+6.'], 'A cobrança reúne parcela fixa 6 e parcela variável 4h.'],
      ['Na função T(x)=18−2x, T(4) vale:', '10.', ['8.', '14.', '16.', '20.'], 'T(4)=18−8=10.'],
      ['Uma função linear passa por (0,7) e (3,16). Sua taxa de variação é:', '3.', ['7.', '9.', '16.', '23.'], 'A taxa é (16−7)/(3−0)=3.'],
      ['A relação “cada aluno possui um número único de matrícula” é função de alunos para matrículas porque:', 'Cada aluno está associado a exatamente uma matrícula.', ['Cada matrícula pertence a vários alunos.', 'Todo aluno possui várias matrículas simultâneas.', 'Os números precisam ser consecutivos.', 'O conjunto precisa ser infinito.'], 'Função exige uma única imagem para cada elemento do domínio.'],
      ['Uma caixa-d’água tem 900 L e perde 30 L por minuto. Em qual domínio o modelo V(t)=900−30t é fisicamente válido?', '0≤t≤30.', ['t<0.', 't≥30 sem limite.', 'Somente t=900.', 'Todos os reais.'], 'O volume não pode ser negativo e zera em 900/30=30 minutos.'],
    ],
  },
  {
    topicSlug: 'razao-e-proporcao', skillSlug: 'comparar-grandezas-por-razao-e-proporcao', reasoning: 'comparação e escalonamento de razões', errors: ['misturar grandezas em ordens diferentes'], strategy: 'Alinhe unidades e mantenha a mesma ordem nos termos da razão.',
    items: [
      ['Uma mistura usa água e concentrado na razão 5:1. Para 18 L de bebida, quanto é concentrado?', '3 L.', ['1 L.', '5 L.', '6 L.', '15 L.'], 'São seis partes totais; 18/6 = 3 L por parte.'],
      ['Uma maquete na escala 1:50 tem parede de 8 cm. A parede real mede:', '4 m.', ['40 cm.', '1,6 m.', '8 m.', '400 m.'], '8×50=400 cm=4 m.'],
      ['A razão entre 45 minutos e 1,5 hora, usando a mesma unidade, é:', '1:2.', ['1:1,5.', '2:1.', '3:2.', '45:1,5.'], '1,5 hora são 90 minutos; 45:90 simplifica para 1:2.'],
      ['Um mapa A tem escala 1:10 000 e B, 1:50 000. Qual mostra mais detalhes?', 'O mapa A, por ter escala maior.', ['O mapa B, por ter denominador maior.', 'Os dois mostram o mesmo detalhe.', 'Nenhum usa proporção.', 'Depende apenas da cor.'], 'Menor denominador representa área menor com maior detalhamento.'],
      ['Três pessoas dividem R$ 2 400 proporcionalmente a 1, 3 e 4. A maior parte é:', 'R$ 1 200.', ['R$ 300.', 'R$ 600.', 'R$ 900.', 'R$ 1 600.'], 'A soma é 8; a maior recebe 4/8 de 2 400.'],
    ],
  },
  {
    topicSlug: 'regra-de-tres', skillSlug: 'resolver-situacoes-com-regra-de-tres', reasoning: 'proporcionalidade direta, inversa e composta', errors: ['assumir relação direta sem verificar'], strategy: 'Decida como cada grandeza muda quando a incógnita aumenta.',
    items: [
      ['Sete ingressos custam R$ 126. Quanto custam 11 nas mesmas condições?', 'R$ 198.', ['R$ 137.', 'R$ 180.', 'R$ 189.', 'R$ 216.'], 'Cada ingresso custa 18; onze custam 198.'],
      ['Oito torneiras enchem um reservatório em 6 horas. Doze torneiras iguais levam:', '4 horas.', ['8 horas.', '9 horas.', '12 horas.', '18 horas.'], 'É relação inversa: 8×6=12×t, então t=4.'],
      ['Três impressoras fazem 1 800 páginas em 5 horas. Cinco impressoras, em 4 horas, fazem:', '2 400 páginas.', ['1 200.', '1 500.', '3 000.', '6 000.'], '1800×(5/3)×(4/5)=2400.'],
      ['Um medicamento de 2 mL atende 8 kg de massa. Para 30 kg, na mesma proporção, seriam:', '7,5 mL.', ['6 mL.', '8 mL.', '15 mL.', '120 mL.'], '2/8=x/30, logo x=7,5.'],
      ['Um estoque dura 20 dias para 15 pessoas. Para 25 pessoas, com consumo igual, dura:', '12 dias.', ['16 dias.', '25 dias.', '30 dias.', '33 dias.'], 'Pessoas e duração são inversas: 15×20=25×d.'],
    ],
  },
  {
    topicSlug: 'geometria-plana', skillSlug: 'calcular-e-aplicar-medidas-em-figuras-planas', reasoning: 'medidas, decomposição e propriedades de figuras', errors: ['confundir área com perímetro'], strategy: 'Desenhe, marque unidades e identifique se a medida é linear, angular ou de superfície.',
    items: [
      ['Um quadrado tem perímetro 52 cm. Sua área é:', '169 cm².', ['13 cm².', '26 cm².', '104 cm².', '676 cm².'], 'O lado mede 52/4=13; a área é 13².'],
      ['Um triângulo de base 18 cm e altura 7 cm tem área:', '63 cm².', ['25 cm².', '56 cm².', '126 cm².', '252 cm².'], 'A área é 18×7/2=63.'],
      ['Um círculo de raio 4 m tem comprimento aproximado, usando π=3,14, de:', '25,12 m.', ['12,56 m.', '16 m.', '50,24 m.', '200,96 m.'], 'C=2πr=2×3,14×4.'],
      ['A soma dos ângulos internos de um pentágono é:', '540°.', ['180°.', '360°.', '450°.', '720°.'], '(5−2)×180°=540°.'],
      ['Um piso de 6 m por 4 m recebe placas quadradas de 0,5 m de lado. Sem perdas, são necessárias:', '96 placas.', ['24.', '48.', '72.', '192.'], 'O piso tem 24 m² e cada placa 0,25 m²; 24/0,25=96.'],
    ],
  },
  {
    topicSlug: 'estatistica', skillSlug: 'interpretar-medidas-estatisticas-em-contexto', reasoning: 'cálculo e escolha de medidas descritivas', errors: ['ignorar valores extremos e tamanho do grupo'], strategy: 'Ordene os dados e escolha a medida que responde à pergunta.',
    items: [
      ['As notas 5, 7, 7, 8 e 8 têm média:', '7.', ['5.', '6.', '7,5.', '8.'], 'A soma 35 dividida por 5 resulta em 7.'],
      ['Nos dados 2, 4, 4, 5, 9, a moda é:', '4.', ['2.', '4,8.', '5.', '9.'], 'Quatro é o valor com maior frequência.'],
      ['A amplitude do conjunto 11, 15, 18, 18 e 27 é:', '16.', ['9.', '11.', '18.', '38.'], 'Amplitude é máximo menos mínimo: 27−11=16.'],
      ['Um valor muito alto é acrescentado a um conjunto equilibrado. Qual medida tende a mudar mais?', 'A média.', ['A moda sempre.', 'A mediana sempre na mesma proporção.', 'O tamanho da amostra não muda.', 'Nenhuma medida.'], 'A média usa a magnitude de todos os valores e é sensível a extremos.'],
      ['Duas pesquisas têm 60% de aprovação; uma ouviu 50 pessoas e outra 5 000. Em geral, a segunda:', 'Tende a oferecer estimativa mais estável, se a amostra for bem selecionada.', ['É automaticamente sem viés.', 'Tem aprovação maior.', 'Dispensa método de amostragem.', 'Prova a opinião de toda população.'], 'Maior amostra reduz variação aleatória, mas não corrige seleção ruim.'],
    ],
  },
  {
    topicSlug: 'probabilidade', skillSlug: 'calcular-e-interpretar-probabilidades', reasoning: 'espaço amostral, união, complemento e dependência', errors: ['somar probabilidades incompatíveis'], strategy: 'Defina o espaço amostral e verifique sobreposição, reposição e condicionamento.',
    items: [
      ['Uma caixa tem 2 bolas azuis e 6 amarelas. A chance de retirar azul é:', '1/4.', ['1/8.', '1/3.', '2/3.', '3/4.'], 'São 2 casos favoráveis em 8; 2/8=1/4.'],
      ['Ao lançar um dado, a probabilidade de sair número menor que 5 é:', '2/3.', ['1/6.', '1/3.', '1/2.', '5/6.'], 'Os resultados 1,2,3,4 são quatro entre seis; 4/6=2/3.'],
      ['A chance de chover é 0,28. A chance de não chover é:', '0,72.', ['0,28.', '0,62.', '1,28.', '28.'], 'O evento complementar vale 1−0,28.'],
      ['Uma moeda é lançada e um dado também. Quantos resultados ordenados existem?', '12.', ['6.', '8.', '10.', '36.'], 'São 2 resultados da moeda vezes 6 do dado.'],
      ['Em duas retiradas sem reposição de uma urna, a probabilidade da segunda muda porque:', 'A primeira retirada altera a composição disponível.', ['O segundo sorteio deixa de ser aleatório.', 'A urna passa a ter mais objetos.', 'Toda chance vira zero.', 'A ordem nunca importa.'], 'Sem reposição, o espaço amostral depende do primeiro resultado.'],
    ],
  },
  {
    topicSlug: 'matematica-financeira', skillSlug: 'avaliar-situacoes-financeiras-com-juros-e-descontos', reasoning: 'juros, inflação, descontos e comparação de alternativas', errors: ['comparar só o valor da parcela'], strategy: 'Calcule custo total, alinhe prazo e taxa e diferencie valor nominal de real.',
    items: [
      ['Um capital de R$ 800 rende 2% de juros simples por 5 meses. O juro é:', 'R$ 80.', ['R$ 16.', 'R$ 40.', 'R$ 82.', 'R$ 880.'], 'J=800×0,02×5=80.'],
      ['R$ 1 000 a 10% compostos por dois períodos tornam-se:', 'R$ 1 210.', ['R$ 1 100.', 'R$ 1 200.', 'R$ 1 220.', 'R$ 2 000.'], '1000×1,10²=1210.'],
      ['Uma compra custa R$ 900 à vista ou 10×R$ 99. O parcelamento acrescenta:', 'R$ 90.', ['R$ 9.', 'R$ 99.', 'R$ 900.', 'R$ 990.'], 'O total parcelado é 990, diferença de 90.'],
      ['Um salário sobe 6% enquanto os preços sobem 8%. O poder de compra tende a:', 'Diminuir.', ['Aumentar 14%.', 'Aumentar 2%.', 'Ficar exatamente igual.', 'Dobrar.'], 'O reajuste nominal ficou abaixo da inflação.'],
      ['Dois descontos sucessivos de 10% sobre R$ 200 produzem preço final de:', 'R$ 162.', ['R$ 160.', 'R$ 170.', 'R$ 180.', 'R$ 198.'], '200×0,9×0,9=162; percentuais sucessivos não se somam diretamente.'],
    ],
  },
];

export const MATEMATICA_QUESTOES_LEVA_7 = buildQuestionBatch({ batch: 7, origin, support, sets });

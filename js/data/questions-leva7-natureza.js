import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_7_2026_08';
const support = 'Situação e dados autorais criados para a sétima atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'ecologia-e-ciclos', skillSlug: 'relacionar-seres-vivos-energia-materia-impactos', reasoning: 'fluxo de energia, ciclos biogeoquímicos e equilíbrio ecológico', errors: ['tratar energia e matéria como se circulassem do mesmo modo'], strategy: 'Separe o caminho da energia do ciclo dos elementos e acompanhe cada relação ecológica.',
    items: [
      ['Em uma teia alimentar, a diminuição intensa dos produtores afeta primeiro o sistema porque:', 'Reduz a entrada de energia disponível para todos os níveis consumidores.', ['Aumenta a energia criada pelos decompositores.', 'Transforma consumidores em seres autotróficos.', 'Interrompe apenas o ciclo da água.', 'Eleva obrigatoriamente todos os predadores.'], 'Produtores convertem energia luminosa em energia química que sustenta os demais níveis.'],
      ['Uma área reflorestada pode contribuir para o ciclo do carbono ao:', 'Retirar CO₂ do ar durante a fotossíntese e armazenar carbono na biomassa.', ['Impedir toda respiração dos organismos.', 'Converter carbono em um elemento diferente.', 'Eliminar permanentemente os decompositores.', 'Liberar apenas oxigênio, sem formar matéria orgânica.'], 'A fotossíntese incorpora carbono atmosférico às moléculas orgânicas dos vegetais.'],
      ['Em uma ilha, a introdução de um predador sem inimigos naturais tende a:', 'Alterar populações nativas e desequilibrar relações da comunidade.', ['Aumentar igualmente todas as espécies.', 'Produzir diversidade sem qualquer risco.', 'Afetar somente organismos decompositores.', 'Manter a teia alimentar necessariamente estável.'], 'Uma espécie invasora pode crescer rapidamente e pressionar presas que não evoluíram com ela.'],
      ['Durante uma seca prolongada, a competição entre plantas pode aumentar principalmente por:', 'Menor disponibilidade de água como recurso compartilhado.', ['Excesso de produtores aquáticos.', 'Ausência total de luz solar.', 'Criação espontânea de nutrientes.', 'Conversão de herbívoros em plantas.'], 'Quando um recurso limitante fica mais escasso, organismos que dependem dele competem com maior intensidade.'],
      ['Uma população de insetos adquire resistência após aplicações sucessivas do mesmo pesticida. Isso ocorre porque:', 'Indivíduos resistentes deixam mais descendentes e aumentam sua frequência na população.', ['O produto ensina cada inseto a mudar seus genes.', 'Todos os insetos se tornam resistentes ao mesmo tempo.', 'A resistência surge porque os predadores desaparecem.', 'O pesticida escolhe mutações úteis antes da reprodução.'], 'A pressão seletiva favorece variantes resistentes já existentes ou surgidas ao acaso.'],
    ],
  },
  {
    topicSlug: 'energia-e-transformacoes', skillSlug: 'interpretar-conservacao-consumo-transformacao-energia', reasoning: 'balanço energético, trabalho, potência e eficiência', errors: ['ignorar dissipações ao calcular energia útil'], strategy: 'Faça um balanço entre entrada, saída útil e dissipações, mantendo as unidades consistentes.',
    items: [
      ['Um painel solar recebe 1 000 J de radiação e fornece 220 J de eletricidade. Sua eficiência é:', '22%.', ['4,5%.', '78%.', '220%.', '1 220%.'], 'A eficiência é a razão 220/1 000, equivalente a 0,22 ou 22%.'],
      ['Ao frear uma bicicleta, sua energia cinética é convertida principalmente em:', 'Energia térmica nos freios, pneus e ambiente.', ['Energia potencial nuclear.', 'Massa adicional no ciclista.', 'Carga elétrica sem dissipação.', 'Energia química produzida espontaneamente.'], 'O atrito transforma a energia do movimento em energia interna e calor.'],
      ['Um elevador realiza 60 kJ de trabalho em 20 segundos. A potência média desenvolvida é:', '3 kW.', ['0,3 kW.', '30 kW.', '80 kW.', '1 200 kW.'], 'Potência é trabalho dividido pelo tempo: 60 kJ/20 s = 3 kJ/s = 3 kW.'],
      ['Duas panelas aquecem a mesma massa de água até a mesma temperatura. A que perde menos calor ao ambiente:', 'Precisa receber menos energia total para produzir o mesmo aquecimento útil.', ['Viola a conservação da energia.', 'Necessariamente leva mais tempo.', 'Produz água com maior massa.', 'Tem eficiência sempre igual a zero.'], 'Com menores perdas, uma parcela maior da energia fornecida aquece efetivamente a água.'],
      ['Em uma usina hidrelétrica, a sequência dominante de transformações é:', 'Potencial gravitacional da água → cinética → mecânica → elétrica.', ['Elétrica → nuclear → química → térmica.', 'Química → luminosa → gravitacional.', 'Térmica → potencial → massa.', 'Nuclear → sonora → elétrica.'], 'A queda movimenta a água, que gira turbinas conectadas a geradores.'],
    ],
  },
  {
    topicSlug: 'transformacoes-quimicas', skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes', reasoning: 'evidências, conservação e fatores que afetam reações', errors: ['confundir evidência observável com prova isolada de reação'], strategy: 'Compare propriedades antes e depois e represente a conservação de cada elemento.',
    items: [
      ['Misturar vinagre e bicarbonato produz bolhas. A evidência observada indica principalmente:', 'Formação de uma substância gasosa durante a reação.', ['Derretimento obrigatório do bicarbonato.', 'Desaparecimento dos átomos reagentes.', 'Mudança apenas no estado físico do vinagre.', 'Criação de massa em recipiente fechado.'], 'A liberação de gás é uma evidência de formação de novos produtos.'],
      ['Na equação 2Mg + O₂ → 2MgO, dois mol de magnésio reagem com:', 'Um mol de oxigênio.', ['Dois mol de oxigênio.', 'Três mol de oxigênio.', 'Meio mol de oxigênio.', 'Quatro mol de oxigênio.'], 'Os coeficientes balanceados expressam a proporção 2:1 entre Mg e O₂.'],
      ['Triturar um comprimido efervescente acelera sua reação na água porque:', 'Aumenta a superfície de contato entre os reagentes.', ['Aumenta a massa total do comprimido.', 'Altera os elementos químicos presentes.', 'Elimina a necessidade de colisões.', 'Transforma água em catalisador obrigatório.'], 'Mais área exposta favorece colisões efetivas por unidade de tempo.'],
      ['Em um frasco fechado, a balança registra a mesma massa antes e depois de uma reação. Isso confirma que:', 'Os átomos foram reorganizados sem perda da massa total do sistema.', ['Nenhum produto gasoso foi formado.', 'A reação não ocorreu.', 'Os reagentes mantiveram todas as propriedades.', 'A energia não sofreu transformação.'], 'A conservação da massa vale para o sistema fechado mesmo que surjam gases.'],
      ['Ao aumentar a temperatura de muitas reações, a velocidade cresce porque as partículas:', 'Colidem com maior energia e uma fração maior supera a energia de ativação.', ['Deixam de se mover.', 'Perdem toda sua massa.', 'Passam a ser catalisadores.', 'Criam novos elementos químicos.'], 'Maior energia cinética aumenta a frequência e a efetividade das colisões.'],
    ],
  },
  {
    topicSlug: 'genetica-basica', skillSlug: 'aplicar-principios-de-heranca-genetica', reasoning: 'probabilidade de herança, expressão gênica e diversidade', errors: ['inferir genótipo único a partir de fenótipo dominante'], strategy: 'Liste genótipos compatíveis, gametas possíveis e probabilidades antes de concluir.',
    items: [
      ['Para uma característica com dominância completa, um indivíduo de fenótipo recessivo possui genótipo:', 'Homozigoto recessivo.', ['Homozigoto dominante.', 'Heterozigoto obrigatoriamente.', 'Sem alelos para o gene.', 'Determinado apenas pelo ambiente.'], 'O fenótipo recessivo aparece quando não há alelo dominante, portanto o genótipo é aa.'],
      ['No cruzamento AA × aa, a primeira geração será composta por:', 'Indivíduos Aa em todos os descendentes.', ['Metade AA e metade aa.', 'Somente indivíduos AA.', 'Um quarto de cada genótipo.', 'Indivíduos sem o gene.'], 'O primeiro genitor fornece apenas A e o segundo apenas a.'],
      ['Uma mutação ocorrida em célula da pele de uma pessoa tende a:', 'Permanecer restrita à linhagem somática e não ser herdada por filhos.', ['Ser transmitida por todos os gametas.', 'Alterar imediatamente todas as células do corpo.', 'Modificar o DNA dos pais da pessoa.', 'Eliminar a meiose.'], 'Alterações somáticas não entram na linhagem germinativa que origina gametas.'],
      ['Gêmeos idênticos criados em ambientes diferentes podem apresentar diferenças porque:', 'A expressão de características também sofre influência ambiental.', ['Seus genomas deixam de ser semelhantes ao nascer.', 'Um deles não possui cromossomos.', 'Ambiente substitui todos os genes.', 'Fenótipo e genótipo são sempre sinônimos.'], 'O fenótipo resulta da interação entre constituição genética e condições ambientais.'],
      ['A meiose favorece diversidade genética por meio da segregação dos cromossomos e:', 'Da recombinação entre cromossomos homólogos.', ['Da duplicação indefinida do número cromossômico.', 'Da produção de clones diploides.', 'Da eliminação de todos os alelos recessivos.', 'Da ausência de divisão celular.'], 'Permuta e distribuição independente geram novas combinações de alelos nos gametas.'],
    ],
  },
  {
    topicSlug: 'saude-e-prevencao', skillSlug: 'relacionar-agente-transmissao-e-prevencao', reasoning: 'prevenção orientada por agente, transmissão e proteção coletiva', errors: ['escolher prevenção sem considerar a via de transmissão'], strategy: 'Associe cada medida ao elo específico da cadeia de transmissão que ela interrompe.',
    items: [
      ['Manter ambientes ventilados ajuda a reduzir a transmissão de doenças respiratórias porque:', 'Diminui a concentração de partículas infecciosas suspensas no ar.', ['Elimina todas as bactérias do corpo.', 'Substitui qualquer tratamento médico.', 'Impede doenças transmitidas por vetores.', 'Aumenta a resistência dos vírus fora do corpo.'], 'A renovação do ar dispersa aerossóis que podem transportar agentes infecciosos.'],
      ['O uso inadequado de antibióticos favorece um problema coletivo ao:', 'Selecionar bactérias resistentes que podem se disseminar.', ['Tornar vírus sensíveis ao mesmo medicamento.', 'Impedir qualquer mutação bacteriana.', 'Criar anticorpos no comprimido.', 'Eliminar apenas bactérias resistentes.'], 'O fármaco elimina as sensíveis e aumenta a vantagem relativa das variantes resistentes.'],
      ['Para prevenir doença transmitida por água contaminada, uma medida estrutural eficaz é:', 'Garantir tratamento de água e coleta adequada de esgoto.', ['Usar repelente dentro de casa.', 'Evitar contato com animais domésticos.', 'Tomar antibiótico preventivamente.', 'Fechar janelas durante o dia.'], 'Saneamento bloqueia a contaminação fecal da água e sua ingestão.'],
      ['A cobertura vacinal elevada protege também pessoas vulneráveis quando:', 'Reduz a circulação do agente e a probabilidade de exposição.', ['Transforma toda vacina em medicamento curativo.', 'Dispensa completamente a vigilância.', 'Aumenta a quantidade de vetores.', 'Impede o sistema imune de produzir memória.'], 'Menos hospedeiros suscetíveis dificultam cadeias de transmissão na comunidade.'],
      ['Uma campanha de prevenção deve usar dados de incidência por faixa etária para:', 'Direcionar ações aos grupos com maior ocorrência sem abandonar a proteção geral.', ['Provar que outros grupos nunca adoecem.', 'Substituir o diagnóstico individual.', 'Escolher tratamento sem avaliação clínica.', 'Ocultar variações regionais.'], 'A estratificação ajuda a priorizar recursos, mas não elimina riscos nos demais grupos.'],
    ],
  },
  {
    topicSlug: 'mecanica', skillSlug: 'aplicar-leis-do-movimento-e-conservacao', reasoning: 'forças, energia mecânica, impulso e movimento', errors: ['confundir velocidade constante com ausência de forças'], strategy: 'Escolha o sistema, represente as interações e só depois aplique a lei de conservação adequada.',
    items: [
      ['Um livro permanece parado sobre uma mesa horizontal porque:', 'A força normal equilibra o peso, produzindo resultante nula.', ['Nenhuma força atua sobre ele.', 'O peso desaparece em repouso.', 'A mesa exerce força apenas para baixo.', 'Sua massa se torna zero.'], 'Peso e normal atuam em sentidos opostos e têm módulos iguais nessa situação.'],
      ['Um carro aumenta sua velocidade de 10 m/s para 22 m/s em 4 s. Sua aceleração média é:', '3 m/s².', ['2 m/s².', '4 m/s².', '5,5 m/s².', '8 m/s².'], 'A variação de velocidade é 12 m/s; dividida por 4 s resulta em 3 m/s².'],
      ['Sem resistência do ar, uma bola lançada verticalmente para cima possui no ponto mais alto:', 'Velocidade instantânea zero e aceleração da gravidade para baixo.', ['Velocidade e aceleração nulas.', 'Aceleração para cima.', 'Peso nulo.', 'Velocidade máxima para cima.'], 'A velocidade zera antes de inverter, mas a gravidade continua atuando.'],
      ['Uma embalagem acolchoada protege um objeto durante a queda porque aumenta:', 'O tempo de colisão e reduz a força média para o mesmo impulso.', ['A velocidade de impacto.', 'A massa do objeto até o infinito.', 'A aceleração da gravidade.', 'A quantidade de movimento final.'], 'Alongar a desaceleração distribui a variação de momento por mais tempo.'],
      ['Em uma montanha-russa ideal sem atrito, ao passar de um ponto alto para um baixo:', 'A energia potencial diminui enquanto a cinética aumenta, mantendo a soma.', ['A energia mecânica desaparece.', 'A massa do carrinho aumenta.', 'Toda energia vira elétrica.', 'A velocidade diminui necessariamente.'], 'Na ausência de dissipação, a energia mecânica total permanece constante.'],
    ],
  },
  {
    topicSlug: 'eletricidade', skillSlug: 'analisar-circuitos-e-consumo-eletrico', reasoning: 'corrente, resistência, potência, energia e segurança elétrica', errors: ['somar resistências de paralelo como se estivessem em série'], strategy: 'Desenhe os ramos do circuito, identifique grandezas comuns e confira potência e energia.',
    items: [
      ['Uma corrente de 0,5 A atravessa um resistor de 20 Ω. A tensão aplicada é:', '10 V.', ['0,025 V.', '2,5 V.', '20,5 V.', '40 V.'], 'Pela lei de Ohm, V = RI = 20 × 0,5 = 10 V.'],
      ['Ligar muitos aparelhos potentes na mesma tomada aumenta o risco de aquecimento porque:', 'Eleva a corrente nos condutores e as perdas térmicas.', ['Reduz a corrente total a zero.', 'Elimina a resistência dos fios.', 'Transforma a tomada em gerador.', 'Diminui toda potência consumida.'], 'Corrente elevada intensifica a dissipação por efeito Joule nos fios e conexões.'],
      ['Uma lâmpada de 12 W permanece ligada 5 horas por dia durante 30 dias. O consumo é:', '1,8 kWh.', ['0,18 kWh.', '6 kWh.', '18 kWh.', '180 kWh.'], '12 W × 150 h = 1 800 Wh = 1,8 kWh.'],
      ['Dois resistores iguais são ligados em paralelo. A resistência equivalente é:', 'Metade da resistência de um deles.', ['O dobro de uma resistência.', 'A soma mais um ohm.', 'Sempre infinita.', 'Igual à de um resistor.'], 'Dois caminhos idênticos em paralelo duplicam a condutância e reduzem a resistência à metade.'],
      ['O fio terra aumenta a segurança de um equipamento metálico ao:', 'Oferecer caminho de baixa resistência para corrente de falha e favorecer o desligamento.', ['Elevar a tensão da carcaça.', 'Substituir o disjuntor em qualquer caso.', 'Armazenar eletricidade indefinidamente.', 'Impedir o consumo normal de energia.'], 'A corrente de falha é desviada da pessoa e pode acionar dispositivos de proteção.'],
    ],
  },
  {
    topicSlug: 'solucoes', skillSlug: 'calcular-e-interpretar-concentracoes', reasoning: 'concentração, preparo, diluição e propriedades de soluções', errors: ['somar volumes sem observar a concentração desejada'], strategy: 'Anote quantidade de soluto, volume final e unidade pedida antes de calcular.',
    items: [
      ['Uma solução possui 15 g de sal em 300 mL de solução. A concentração comum é:', '50 g/L.', ['5 g/L.', '20 g/L.', '45 g/L.', '500 g/L.'], 'O volume é 0,3 L; 15/0,3 = 50 g/L.'],
      ['Para obter 100 mL de uma solução 0,2 mol/L a partir de outra 1 mol/L, deve-se usar:', '20 mL da solução inicial e completar o volume com solvente.', ['2 mL da solução inicial.', '50 mL da solução inicial.', '100 mL sem diluição.', '200 mL da solução inicial.'], 'C₁V₁=C₂V₂: 1×V₁=0,2×100, então V₁=20 mL.'],
      ['Uma solução é considerada insaturada quando, nas condições dadas:', 'Ainda pode dissolver mais soluto antes de atingir o limite de solubilidade.', ['Contém obrigatoriamente sólido no fundo.', 'Não possui solvente.', 'Ultrapassou sempre o limite de solubilidade.', 'Apresenta apenas soluto gasoso.'], 'A quantidade dissolvida está abaixo da máxima permitida naquela temperatura.'],
      ['Ao evaporar parte do solvente de uma solução sem perder soluto, a concentração tende a:', 'Aumentar, pois a mesma quantidade de soluto ocupa menor volume.', ['Diminuir até zero.', 'Permanecer sempre igual.', 'Eliminar a massa do soluto.', 'Converter soluto em elemento químico.'], 'A razão entre quantidade de soluto e volume da solução cresce.'],
      ['Duas soluções de glicose têm 10 g/L e 25 g/L. Para o mesmo volume, a segunda contém:', 'Duas vezes e meia a massa de glicose da primeira.', ['Metade da massa.', 'A mesma massa.', 'Quinze vezes mais.', 'Nenhuma glicose.'], 'A razão entre as concentrações é 25/10 = 2,5.'],
    ],
  },
  {
    topicSlug: 'estequiometria-introdutoria', skillSlug: 'calcular-quantidades-em-reacoes-quimicas', reasoning: 'proporções molares, reagente limitante e rendimento', errors: ['aplicar proporção antes de balancear a equação'], strategy: 'Balanceie, converta as grandezas para mol e compare as proporções disponíveis.',
    items: [
      ['Na reação 2CO + O₂ → 2CO₂, quatro mol de CO produzem, com O₂ em excesso:', 'Quatro mol de CO₂.', ['Um mol de CO₂.', 'Dois mol de CO₂.', 'Seis mol de CO₂.', 'Oito mol de CO₂.'], 'CO e CO₂ aparecem na proporção 2:2, equivalente a 1:1.'],
      ['Na síntese 2Na + Cl₂ → 2NaCl, um mol de Cl₂ exige quantos mol de Na?', 'Dois mol.', ['Meio mol.', 'Um mol.', 'Três mol.', 'Quatro mol.'], 'A proporção balanceada entre Na e Cl₂ é 2:1.'],
      ['Misturam-se quantidades que permitiriam consumir 5 mol de A, mas há apenas 3 mol disponíveis. A é:', 'O reagente limitante, se os demais estiverem em excesso.', ['O catalisador da reação.', 'Um produto final.', 'O solvente obrigatório.', 'O reagente que sobrará.'], 'A menor quantidade relativa à proporção exigida determina o máximo de produto.'],
      ['Uma reação deveria fornecer 80 g de produto, mas foram obtidos 60 g. O rendimento foi:', '75%.', ['20%.', '60%.', '80%.', '133%.'], 'A razão entre massa real e teórica é 60/80 = 0,75.'],
      ['Na decomposição CaCO₃ → CaO + CO₂, a produção de 2 mol de CaO corresponde a:', 'Dois mol de CO₂.', ['Meio mol de CO₂.', 'Um mol de CO₂.', 'Três mol de CO₂.', 'Quatro mol de CO₂.'], 'Os coeficientes de CaO e CO₂ são ambos 1, logo a proporção é 1:1.'],
    ],
  },
  {
    topicSlug: 'quimica-ambiental', skillSlug: 'relacionar-processos-quimicos-e-impactos-ambientais', reasoning: 'fontes de poluição, transformações ambientais e mitigação', errors: ['confundir poluente primário com produto formado no ambiente'], strategy: 'Rastreie a fonte, a reação ambiental, a exposição e o efeito antes de escolher a medida.',
    items: [
      ['A queima incompleta de combustíveis em ambiente fechado é perigosa pela produção de:', 'Monóxido de carbono, que prejudica o transporte de oxigênio no sangue.', ['Oxigênio em excesso.', 'Água potável concentrada.', 'Gás hélio radioativo.', 'Cloreto de sódio gasoso.'], 'O CO liga-se fortemente à hemoglobina e reduz a oxigenação dos tecidos.'],
      ['A substituição de CFCs em sistemas de refrigeração protege a camada de ozônio porque reduz:', 'A liberação de espécies que catalisam a destruição do ozônio estratosférico.', ['A presença natural de nitrogênio no ar.', 'Toda radiação solar que chega à Terra.', 'A formação de oxigênio pela fotossíntese.', 'A quantidade de vapor de água nos oceanos.'], 'Radicais derivados de CFCs participam repetidamente da decomposição de O₃.'],
      ['O aumento de CO₂ dissolvido nos oceanos contribui para acidificação ao:', 'Formar espécies ácidas que reduzem o pH da água.', ['Transformar toda água em base forte.', 'Eliminar o carbono dos carbonatos.', 'Aumentar indefinidamente a salinidade.', 'Produzir oxigênio sem reação química.'], 'O equilíbrio do CO₂ em água gera ácido carbônico e libera íons que diminuem o pH.'],
      ['A remediação de solo com plantas que acumulam certos metais é chamada de:', 'Fitorremediação.', ['Destilação fracionada.', 'Eletrólise atmosférica.', 'Combustão completa.', 'Neutralização nuclear.'], 'Plantas podem retirar, estabilizar ou concentrar contaminantes presentes no solo.'],
      ['Ao comparar combustíveis, avaliar apenas a massa de CO₂ emitida é insuficiente porque também importam:', 'Energia fornecida, ciclo de produção e outros poluentes liberados.', ['Somente a cor da chama.', 'A marca do veículo.', 'A temperatura do motorista.', 'A forma do recipiente.'], 'Uma avaliação ambiental coerente relaciona emissões ao serviço energético e ao ciclo de vida.'],
    ],
  },
];

export const NATUREZA_QUESTOES_LEVA_7 = buildQuestionBatch({
  batch: 7,
  origin,
  support,
  sets,
});

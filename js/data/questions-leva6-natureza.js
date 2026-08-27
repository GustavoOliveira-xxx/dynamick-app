import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_6_2026_08';
const support = 'Situação e dados autorais criados para a sexta atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'ecologia-e-ciclos',
    skillSlug: 'relacionar-seres-vivos-energia-materia-impactos',
    reasoning: 'relações tróficas, fluxo de energia e ciclagem da matéria',
    errors: ['confundir fluxo de energia com reciclagem de matéria'],
    strategy: 'Siga a direção da energia e identifique como a matéria retorna ao ambiente.',
    items: [
      ['Em uma cadeia capim → gafanhoto → sapo → cobra, o gafanhoto é:', 'Consumidor primário.', ['Produtor.', 'Consumidor secundário.', 'Decompositor.', 'Consumidor terciário.'], 'Ele se alimenta diretamente do produtor e ocupa o primeiro nível de consumidores.'],
      ['Por que uma pirâmide de energia é sempre decrescente?', 'Porque parte da energia é dissipada como calor em cada transferência trófica.', ['Porque a matéria desaparece a cada nível.', 'Porque produtores não armazenam energia.', 'Porque predadores produzem luz.', 'Porque decompositores interrompem o ciclo.'], 'Respiração e metabolismo dissipam energia, restando menos para o nível seguinte.'],
      ['A retirada de grandes predadores de um ecossistema pode provocar:', 'Aumento de presas e efeitos em cascata sobre outros níveis tróficos.', ['Maior estabilidade obrigatória.', 'Fim imediato da fotossíntese.', 'Aumento igual de todas as espécies.', 'Transformação de consumidores em produtores.'], 'Predadores regulam populações e sua ausência altera várias relações alimentares.'],
      ['Bactérias decompositoras participam do ciclo do carbono ao:', 'Degradar matéria orgânica e liberar compostos que retornam ao ambiente.', ['Criar carbono a partir do nada.', 'Impedir toda respiração celular.', 'Eliminar nutrientes do solo para sempre.', 'Converter energia em matéria sem perdas.'], 'A decomposição recicla elementos químicos contidos nos restos dos organismos.'],
      ['O excesso de fertilizante levado a um lago pode causar eutrofização porque:', 'Nutrientes favorecem algas e sua decomposição consome oxigênio da água.', ['O fertilizante remove toda matéria orgânica.', 'A água passa a produzir oxigênio sem limite.', 'Peixes tornam-se produtores.', 'O nitrogênio deixa de participar de ciclos.'], 'A floração de algas e posterior decomposição podem criar condições de baixa oxigenação.'],
    ],
  },
  {
    topicSlug: 'energia-e-transformacoes',
    skillSlug: 'interpretar-conservacao-consumo-transformacao-energia',
    reasoning: 'conservação, transferência, potência e eficiência energética',
    errors: ['confundir energia com potência'],
    strategy: 'Identifique a forma inicial, as transformações, o tempo e as perdas úteis ao contexto.',
    items: [
      ['Uma lâmpada converte energia elétrica principalmente em:', 'Luz e energia térmica.', ['Energia química apenas.', 'Energia nuclear apenas.', 'Massa sem energia.', 'Movimento mecânico exclusivamente.'], 'Parte vira radiação visível e parte é dissipada na forma de calor.'],
      ['Dois aparelhos realizam o mesmo trabalho; um leva metade do tempo. Ele possui:', 'Maior potência média.', ['Menor energia obrigatoriamente.', 'Menor massa.', 'Eficiência igual a zero.', 'Temperatura sempre menor.'], 'Potência é a razão entre energia transferida e tempo; menor tempo para o mesmo trabalho implica maior potência.'],
      ['Ao descer, um carrinho sem motor perde energia potencial gravitacional e ganha:', 'Energia cinética, com parte podendo virar calor por atrito.', ['Carga elétrica obrigatória.', 'Matéria adicional.', 'Energia química criada do nada.', 'Somente energia nuclear.'], 'A energia se transforma; o atrito converte parte da energia mecânica em energia interna.'],
      ['Um equipamento recebe 500 J e entrega 400 J de energia útil. Sua eficiência é:', '80%.', ['20%.', '40%.', '100%.', '125%.'], 'Eficiência = energia útil ÷ recebida = 400 ÷ 500 = 0,80.'],
      ['Uma casa troca chuveiro de 5 500 W por outro de 4 400 W, usado pelo mesmo tempo. A tendência é:', 'Reduzir o consumo de energia elétrica em 20%.', ['Aumentar o consumo em 25%.', 'Manter o consumo idêntico.', 'Eliminar qualquer aquecimento.', 'Dobrar a tensão da rede.'], 'Para o mesmo tempo, energia é proporcional à potência; 4 400 é 80% de 5 500.'],
    ],
  },
  {
    topicSlug: 'transformacoes-quimicas',
    skillSlug: 'identificar-reagentes-produtos-evidencias-proporcoes',
    reasoning: 'identificação e representação de reações e conservação da matéria',
    errors: ['considerar toda mudança física uma reação química'],
    strategy: 'Procure formação de novas substâncias e conserve o número de átomos na equação.',
    items: [
      ['Qual situação evidencia mais diretamente uma transformação química?', 'Formação de ferrugem em um portão.', ['Derretimento do gelo.', 'Corte de uma folha.', 'Dissolução de açúcar em água.', 'Quebra de um copo.'], 'A ferrugem contém novas substâncias formadas pela reação do ferro com o ambiente.'],
      ['Na combustão do metano, CH₄ + 2O₂ → CO₂ + 2H₂O, os reagentes são:', 'CH₄ e O₂.', ['CO₂ e H₂O.', 'CH₄ e CO₂.', 'O₂ e H₂O.', 'Apenas CO₂.'], 'Reagentes aparecem à esquerda da seta e são consumidos na transformação.'],
      ['Por que uma equação química deve ser balanceada?', 'Para representar a conservação do número de átomos de cada elemento.', ['Para tornar produtos mais pesados.', 'Para alterar a identidade dos elementos.', 'Para eliminar reagentes gasosos.', 'Para indicar a velocidade da reação.'], 'Os átomos se reorganizam, mas não são criados nem destruídos numa reação comum.'],
      ['Em recipiente fechado, 10 g de A reagem totalmente com 15 g de B. Qual massa total de produtos é esperada?', '25 g.', ['5 g.', '10 g.', '15 g.', '150 g.'], 'Em sistema fechado, a massa total se conserva: 10 + 15 = 25 g.'],
      ['Adicionar um catalisador a uma reação tende a:', 'Aumentar a velocidade ao oferecer caminho de menor energia de ativação.', ['Aumentar a massa final dos produtos.', 'Mudar a conservação dos átomos.', 'Ser consumido integralmente como reagente.', 'Tornar toda reação espontânea.'], 'O catalisador altera a rapidez, sem mudar o balanço material nem ser consumido no processo global.'],
    ],
  },
  {
    topicSlug: 'genetica-basica',
    skillSlug: 'aplicar-principios-de-heranca-genetica',
    reasoning: 'relações entre genes, alelos, genótipos, fenótipos e herança',
    errors: ['confundir dominância com frequência ou superioridade'],
    strategy: 'Defina alelos e gametas antes de montar as combinações possíveis.',
    items: [
      ['Em um indivíduo Aa, as letras A e a representam:', 'Alelos de um mesmo gene.', ['Dois cromossomos de espécies diferentes.', 'Duas células somáticas.', 'Características sem relação genética.', 'Proteínas necessariamente idênticas.'], 'Alelos são versões alternativas de um gene presentes em posições correspondentes.'],
      ['Se A é dominante e a recessivo, qual fenótipo apresenta um indivíduo Aa?', 'O fenótipo associado ao alelo A.', ['Sempre uma mistura exata dos dois.', 'O fenótipo recessivo apenas.', 'Nenhum fenótipo.', 'Um fenótipo determinado pela frequência de A na população.'], 'Na dominância completa, uma cópia do alelo dominante basta para o fenótipo correspondente.'],
      ['No cruzamento Aa × Aa, a chance de descendente aa é:', '25%.', ['0%.', '50%.', '75%.', '100%.'], 'As combinações AA, Aa, Aa e aa são equiprováveis; uma em quatro é aa.'],
      ['Por que irmãos dos mesmos pais podem ser geneticamente diferentes?', 'Meiose e fecundação combinam alelos de maneiras variadas.', ['Cada filho recebe genes de apenas um dos pais.', 'O DNA dos pais desaparece após o primeiro filho.', 'Todos os gametas de uma pessoa são idênticos.', 'Ambiente cria cromossomos novos em cada nascimento.'], 'Segregação, recombinação e encontro aleatório de gametas produzem diversidade.'],
      ['Uma característica multifatorial, como estatura, depende geralmente de:', 'Vários genes e interação com fatores ambientais.', ['Um único alelo sem qualquer influência externa.', 'Apenas do cromossomo Y.', 'Somente da alimentação, sem genes.', 'Uma mutação obrigatória em todas as células.'], 'Características complexas resultam de contribuição poligênica e condições de desenvolvimento.'],
    ],
  },
  {
    topicSlug: 'saude-e-prevencao',
    skillSlug: 'relacionar-agente-transmissao-e-prevencao',
    reasoning: 'relação entre agentes, vias de transmissão e medidas preventivas',
    errors: ['usar antibiótico para qualquer infecção'],
    strategy: 'Identifique o agente e a via de transmissão para escolher prevenção específica.',
    items: [
      ['Vacinas contribuem para a prevenção porque:', 'Preparam o sistema imune para responder com memória ao agente.', ['Matam todos os microrganismos do ambiente.', 'Substituem permanentemente os leucócitos.', 'Curam qualquer doença já instalada.', 'Impedem a formação de anticorpos.'], 'A exposição segura a antígenos promove células de memória e resposta futura mais rápida.'],
      ['Antibióticos não são indicados para tratar gripe comum porque:', 'A gripe é causada por vírus, e antibióticos agem contra bactérias.', ['Vírus são maiores que bactérias.', 'Antibióticos só atuam na pele.', 'A gripe nunca provoca sintomas.', 'Bactérias não causam doenças.'], 'O alvo biológico do medicamento não está presente no vírus da gripe.'],
      ['Eliminar água parada ajuda a prevenir dengue ao:', 'Reduzir locais de reprodução do mosquito vetor.', ['Matar diretamente o vírus dentro das pessoas.', 'Impedir transmissão por gotículas.', 'Substituir a vacinação.', 'Aumentar a população de mosquitos adultos.'], 'O Aedes utiliza recipientes com água para completar parte de seu ciclo de vida.'],
      ['Lavar as mãos antes de preparar alimentos interrompe principalmente:', 'A transferência de microrganismos para alimentos e superfícies.', ['A herança genética de doenças.', 'A produção de anticorpos pelo consumidor.', 'A circulação de mosquitos.', 'A poluição sonora da cozinha.'], 'Higiene reduz contaminação por contato e risco de doenças transmitidas por alimentos.'],
      ['Em saúde coletiva, saneamento básico previne doenças ao:', 'Reduzir contato da população com água e resíduos contaminados.', ['Eliminar a necessidade de vigilância epidemiológica.', 'Tratar apenas doenças genéticas.', 'Aumentar vetores em áreas urbanas.', 'Substituir todo atendimento médico.'], 'Água tratada, esgoto e manejo de resíduos bloqueiam importantes vias de transmissão.'],
    ],
  },
  {
    topicSlug: 'mecanica',
    skillSlug: 'aplicar-leis-do-movimento-e-conservacao',
    reasoning: 'aplicação de forças, movimento, impulso e conservação',
    errors: ['supor que movimento exige força resultante constante'],
    strategy: 'Desenhe as forças, determine a resultante e só então relacione-a ao movimento.',
    items: [
      ['Um corpo segue em linha reta com velocidade constante. A força resultante sobre ele é:', 'Nula.', ['Sempre igual ao peso.', 'Crescente.', 'Contrária ao movimento e não nula.', 'Impossível de determinar pelas leis de Newton.'], 'Velocidade constante implica aceleração zero e, portanto, resultante zero.'],
      ['Uma força resultante de 12 N atua sobre uma massa de 3 kg. A aceleração é:', '4 m/s².', ['0,25 m/s².', '9 m/s².', '15 m/s².', '36 m/s².'], 'Pela segunda lei de Newton, a = F/m = 12/3 = 4 m/s².'],
      ['Ao caminhar, o pé empurra o chão para trás e o chão empurra a pessoa para frente. Isso ilustra:', 'O par de ação e reação em corpos diferentes.', ['Duas forças que se anulam no mesmo corpo.', 'Ausência de atrito.', 'Conservação de massa apenas.', 'Movimento sem interação.'], 'As forças têm mesma intensidade e sentidos opostos, mas atuam em corpos diferentes.'],
      ['O cinto de segurança reduz lesões porque:', 'Aumenta o tempo de desaceleração e reduz a força média sobre o corpo.', ['Elimina a inércia do passageiro.', 'Aumenta instantaneamente a velocidade.', 'Torna a massa da pessoa nula.', 'Impede toda troca de energia.'], 'Para a mesma variação de quantidade de movimento, maior intervalo de tempo reduz a força média.'],
      ['Dois patinadores parados se empurram. O mais leve tende a adquirir maior velocidade porque:', 'Recebe impulso de mesma intensidade, mas tem menor massa.', ['Recebe força sem reação.', 'Possui maior quantidade de matéria.', 'A quantidade de movimento total aumenta do nada.', 'O patinador pesado permanece sem qualquer movimento.'], 'Os momentos são opostos e de mesmo módulo; para p = mv, menor massa implica maior velocidade.'],
    ],
  },
  {
    topicSlug: 'eletricidade',
    skillSlug: 'analisar-circuitos-e-consumo-eletrico',
    reasoning: 'análise de tensão, corrente, resistência, potência e circuitos',
    errors: ['confundir corrente com tensão'],
    strategy: 'Identifique a ligação, as grandezas dadas e aplique a relação elétrica adequada com unidades.',
    items: [
      ['Um resistor de 6 Ω submetido a 12 V é percorrido por corrente de:', '2 A.', ['0,5 A.', '6 A.', '18 A.', '72 A.'], 'Pela lei de Ohm, I = V/R = 12/6 = 2 A.'],
      ['Em uma ligação residencial em paralelo, se uma lâmpada queima, as outras tendem a:', 'Continuar acesas, pois possuem ramos independentes.', ['Apagar sempre, como num único caminho em série.', 'Receber corrente nula por definição.', 'Duplicar a resistência de cada filamento.', 'Transformar-se em geradores.'], 'Cada ramo mantém conexão própria com os terminais da fonte.'],
      ['Um aparelho de 1 000 W fica ligado por 3 horas. O consumo é:', '3 kWh.', ['0,33 kWh.', '1 kWh.', '3 000 kWh.', '30 kWh.'], '1 000 W equivalem a 1 kW; energia = 1 × 3 = 3 kWh.'],
      ['O disjuntor protege uma instalação principalmente ao:', 'Interromper o circuito quando a corrente ultrapassa um limite seguro.', ['Aumentar a tensão de todos os aparelhos.', 'Armazenar energia por tempo indefinido.', 'Eliminar a resistência dos fios.', 'Produzir corrente sem fonte.'], 'Corrente excessiva aquece condutores; o desligamento reduz risco de dano e incêndio.'],
      ['Dois resistores idênticos ligados em série apresentam resistência equivalente:', 'Igual à soma das duas resistências.', ['Igual à metade de uma resistência.', 'Sempre nula.', 'Igual ao produto em qualquer unidade.', 'Menor que cada resistor.'], 'Em série, a mesma corrente percorre os elementos e as resistências se somam.'],
    ],
  },
  {
    topicSlug: 'solucoes',
    skillSlug: 'calcular-e-interpretar-concentracoes',
    reasoning: 'cálculo e interpretação de concentração, diluição e solubilidade',
    errors: ['usar volume do solvente no lugar do volume da solução'],
    strategy: 'Defina soluto, solução e unidade antes de aplicar a razão de concentração.',
    items: [
      ['Uma solução contém 20 g de soluto em 500 mL de solução. Sua concentração comum é:', '40 g/L.', ['10 g/L.', '20 g/L.', '25 g/L.', '400 g/L.'], '500 mL = 0,5 L; 20 ÷ 0,5 = 40 g/L.'],
      ['Ao adicionar água a uma solução sem perder soluto, ocorre:', 'Diminuição da concentração e aumento do volume.', ['Aumento da massa de soluto.', 'Formação obrigatória de precipitado.', 'Aumento da concentração.', 'Desaparecimento do solvente.'], 'A mesma quantidade de soluto fica distribuída em maior volume.'],
      ['Para preparar 200 mL de solução a partir de 50 mL de solução 2 mol/L, a concentração final será:', '0,5 mol/L.', ['0,25 mol/L.', '1 mol/L.', '2 mol/L.', '8 mol/L.'], 'Na diluição, C₁V₁=C₂V₂: 2×50 = C₂×200, então C₂=0,5.'],
      ['Uma solução saturada, em determinada temperatura, é aquela que:', 'Contém a quantidade máxima de soluto dissolvida nas condições dadas.', ['Não contém soluto.', 'Sempre possui corpo de fundo.', 'Aceita quantidade ilimitada de soluto.', 'É necessariamente gasosa.'], 'Saturação depende do limite de solubilidade para aquela temperatura e pressão.'],
      ['Se a solubilidade de um sólido aumenta com a temperatura, resfriar uma solução saturada pode:', 'Provocar cristalização do excesso de soluto.', ['Transformar o soluto em solvente.', 'Aumentar sempre a quantidade dissolvida.', 'Eliminar a conservação de massa.', 'Criar água na solução.'], 'Ao cair o limite de solubilidade, parte do material antes dissolvido pode separar-se.'],
    ],
  },
  {
    topicSlug: 'estequiometria-introdutoria',
    skillSlug: 'calcular-quantidades-em-reacoes-quimicas',
    reasoning: 'uso de proporções molares, massas e reagentes em reações',
    errors: ['usar coeficientes como se fossem massas em gramas'],
    strategy: 'Balanceie a equação, converta para mol e aplique a proporção dos coeficientes.',
    items: [
      ['Na reação 2H₂ + O₂ → 2H₂O, quantos mol de água são formados por 3 mol de O₂ com H₂ em excesso?', '6 mol.', ['1,5 mol.', '2 mol.', '3 mol.', '9 mol.'], 'A proporção O₂:H₂O é 1:2; 3 mol de O₂ formam 6 mol de H₂O.'],
      ['Na equação N₂ + 3H₂ → 2NH₃, a razão molar H₂:NH₃ é:', '3:2.', ['1:1.', '1:3.', '2:3.', '3:1.'], 'Os coeficientes balanceados fornecem a proporção de três mol de H₂ para dois de NH₃.'],
      ['Se 12 g de carbono reagem completamente com 32 g de oxigênio, a massa de CO₂ formada é:', '44 g.', ['20 g.', '32 g.', '38 g.', '384 g.'], 'Pela conservação da massa, 12 + 32 = 44 g.'],
      ['Quando um reagente acaba antes dos outros, ele é chamado de:', 'Reagente limitante.', ['Catalisador.', 'Solvente universal.', 'Produto intermediário.', 'Reagente em excesso.'], 'Ele limita a quantidade máxima de produto que a reação pode formar.'],
      ['Uma reação teria rendimento teórico de 50 g, mas produziu 40 g. O rendimento percentual é:', '80%.', ['10%.', '20%.', '40%.', '125%.'], 'Rendimento = 40 ÷ 50 × 100 = 80%.'],
    ],
  },
  {
    topicSlug: 'quimica-ambiental',
    skillSlug: 'relacionar-processos-quimicos-e-impactos-ambientais',
    reasoning: 'relação entre substâncias, processos químicos e impactos ambientais',
    errors: ['atribuir todo impacto a uma única substância'],
    strategy: 'Associe fonte, transformação química, transporte ambiental e efeito observado.',
    items: [
      ['A chuva ácida está associada principalmente à transformação atmosférica de óxidos de enxofre e nitrogênio em:', 'Ácidos que reduzem o pH da precipitação.', ['Bases que neutralizam toda água.', 'Metais puros.', 'Gases nobres radioativos.', 'Plásticos insolúveis.'], 'Os óxidos reagem no ar formando ácidos que podem ser incorporados às gotas.'],
      ['O efeito estufa natural é importante porque:', 'Mantém temperatura compatível com a vida, embora sua intensificação cause aquecimento.', ['Deve ser eliminado por completo.', 'Só existe em cidades industriais.', 'É causado exclusivamente pelo oxigênio.', 'Impede qualquer entrada de luz solar.'], 'Gases atmosféricos retêm parte da radiação infravermelha; o problema é o aumento antrópico desse efeito.'],
      ['Óleo derramado sobre a água prejudica aves marinhas ao:', 'Comprometer impermeabilização e isolamento térmico das penas.', ['Aumentar a disponibilidade de oxigênio na água.', 'Transformar penas em brânquias.', 'Neutralizar todos os contaminantes.', 'Produzir alimento para todas as espécies.'], 'A cobertura oleosa altera propriedades físicas das penas e pode provocar hipotermia e intoxicação.'],
      ['A bioacumulação ocorre quando:', 'Uma substância persistente se concentra no organismo mais rápido do que é eliminada.', ['Todo poluente se dissolve e desaparece imediatamente.', 'A concentração diminui em cada tecido por definição.', 'Um organismo produz metais pesados.', 'A água elimina qualquer composto persistente.'], 'Entrada contínua e baixa metabolização ou excreção elevam a concentração ao longo do tempo.'],
      ['No tratamento de água, a coagulação e a floculação servem para:', 'Agrupar partículas finas e facilitar sua remoção por decantação e filtração.', ['Aumentar a quantidade de microrganismos.', 'Transformar água em combustível.', 'Adicionar metais tóxicos deliberadamente.', 'Substituir todas as etapas de desinfecção.'], 'Partículas pequenas passam a formar flocos maiores, que se separam mais facilmente.'],
    ],
  },
];

export const NATUREZA_QUESTOES_LEVA_6 = buildQuestionBatch({
  batch: 6,
  origin,
  support,
  sets,
});

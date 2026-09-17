import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_APROFUNDAMENTO_2026_09';
const support = 'Situações autorais criadas para o aprofundamento de Funções orgânicas no acervo DynamiCK.';
const topicSlug = 'funcoes-organicas';
const skillSlug = 'identificar-grupos-funcionais-e-prever-propriedades';

const bloco = (batch, reasoning, errors, strategy, items) =>
  buildQuestionBatch({
    batch, origin, support,
    sets: [{ topicSlug, skillSlug, reasoning, errors, strategy, items }],
  });

export const QUESTOES_APROFUNDAMENTO_FUNCOES_ORGANICAS = [
  ...bloco(
    'fo1',
    'reconhecimento de grupos funcionais em fórmulas estruturais',
    ['ver apenas o C=O sem checar os vizinhos do carbono da carbonila'],
    'Ache o heteroátomo, depois pergunte quem está ligado a ele — a resposta sai da vizinhança, não do tamanho da cadeia.',
    [
      ['Uma estrutura apresenta o grupo C=O com o carbono da carbonila ligado a um hidrogênio e a um único carbono. Essa substância é:', 'Um aldeído.', ['Uma cetona.', 'Um ácido carboxílico.', 'Um éster.', 'Uma amida.'], 'Carbonila na extremidade da cadeia, com hidrogênio ligado ao carbono, é a marca do aldeído (—CHO).'],
      ['Na estrutura CH₃—CO—CH₂—CH₃, o grupo carbonila aparece entre dois átomos de carbono. Trata-se de:', 'Uma cetona.', ['Um aldeído.', 'Um éter.', 'Um fenol.', 'Um ácido carboxílico.'], 'Quando a carbonila está entre dois carbonos, e não na ponta, a função é cetona.'],
      ['Um composto apresenta o grupo —OH ligado diretamente a um carbono do anel benzênico. Esse composto pertence à função:', 'Fenol.', ['Álcool.', 'Éter.', 'Aldeído.', 'Amida.'], 'Hidroxila presa ao anel aromático caracteriza fenol, função distinta do álcool e bem mais ácida.'],
      ['Na molécula CH₃—CH₂—O—CH₂—CH₃, o átomo de oxigênio aparece entre dois carbonos, sem carbonila nem hidroxila. A função presente é:', 'Éter.', ['Éster.', 'Álcool.', 'Cetona.', 'Ácido carboxílico.'], 'Oxigênio ligando dois carbonos, sem C=O e sem —OH, define a função éter.'],
      ['Uma substância utilizada em medicamentos apresenta, na mesma molécula, o grupo —COOH e o grupo —NH₂. Sobre ela, é correto afirmar que:', 'Apresenta simultaneamente as funções ácido carboxílico e amina.', ['Pertence apenas à função amida.', 'Pertence apenas à função éster.', 'Não possui grupo funcional definido.', 'É necessariamente um hidrocarboneto.'], 'Uma molécula pode ter mais de um grupo funcional, e cada um contribui com suas próprias propriedades — é o caso dos aminoácidos.'],
    ],
  ),
  ...bloco(
    'fo2',
    'nomenclatura oficial a partir da cadeia carbônica',
    ['errar a contagem de carbonos ou a terminação da função'],
    'Conte os carbonos, veja o tipo de ligação e só então escolha a terminação: prefixo + infixo + sufixo.',
    [
      ['O composto de fórmula CH₃—CH₂—CH₂—CH₂—OH, com quatro carbonos e uma hidroxila na extremidade, recebe o nome de:', 'Butan-1-ol.', ['Propan-1-ol.', 'Butanal.', 'Ácido butanoico.', 'Butanona.'], 'Quatro carbonos (but-), apenas ligações simples (-an-) e função álcool (-ol), com a hidroxila no carbono 1.'],
      ['Um solvente de esmaltes tem fórmula CH₃—CO—CH₃, com a carbonila no carbono central de uma cadeia de três átomos. Seu nome oficial é:', 'Propanona.', ['Propanal.', 'Propan-2-ol.', 'Ácido propanoico.', 'Propano.'], 'Três carbonos com carbonila no meio da cadeia: prop- + -an- + -ona.'],
      ['O componente que dá o sabor ácido ao vinagre tem dois carbonos e o grupo —COOH. Seu nome oficial é:', 'Ácido etanoico.', ['Ácido metanoico.', 'Etanol.', 'Etanal.', 'Ácido propanoico.'], 'Dois carbonos (et-), ligação simples (-an-) e carboxila (ácido ...-oico).'],
      ['Considere o composto CH₃—CH=CH—CH₃, de quatro carbonos e uma ligação dupla entre os carbonos centrais. Seu nome é:', 'But-2-eno.', ['Butano.', 'But-1-eno.', 'Butino.', 'Butanol.'], 'A presença da dupla exige o infixo -en-, e sua posição é indicada pelo menor número possível: carbono 2.'],
      ['Um éster responsável por aroma de frutas é obtido do ácido etanoico e do etanol. Sua nomenclatura correta e a razão dela são:', 'Etanoato de etila, porque o nome do éster vem do ácido, com terminação -oato, seguido do grupo do álcool, com terminação -ila.', ['Ácido etanoico duplo, porque dois ácidos se unem.', 'Dietiléter, porque há oxigênio entre carbonos.', 'Etanamida, porque há nitrogênio na estrutura.', 'Etanal de etila, porque há carbonila na estrutura.'], 'A nomenclatura do éster registra primeiro a parte que veio do ácido (-oato) e depois a que veio do álcool (-ila).'],
    ],
  ),
  ...bloco(
    'fo3',
    'previsão de ponto de ebulição e solubilidade a partir do grupo funcional',
    ['explicar diferenças de ebulição apenas pela massa molar'],
    'Com massas parecidas, compare as interações intermoleculares; para solubilidade, pese a parte polar contra a cadeia apolar.',
    [
      ['A interação intermolecular responsável pelo alto ponto de ebulição dos álcoois, quando comparados a hidrocarbonetos de massa semelhante, é:', 'A ligação de hidrogênio entre as hidroxilas.', ['A ligação iônica entre as moléculas.', 'A ligação metálica no interior da cadeia.', 'A força de dispersão, que é mais intensa nos álcoois.', 'A ligação covalente entre moléculas vizinhas.'], 'O grupo —OH permite ligação de hidrogênio, interação bem mais forte que as forças de dispersão dos hidrocarbonetos.'],
      ['O etanol se mistura com a água em qualquer proporção, enquanto o hexano não se mistura. A explicação para esse comportamento é que o etanol:', 'Possui hidroxila capaz de fazer ligação de hidrogênio com a água, e sua cadeia curta não impede essa interação.', ['Tem massa molar maior que a da água.', 'É um composto iônico dissolvido em água.', 'Reage quimicamente com a água formando um novo composto.', 'Possui cadeia apolar maior que a do hexano.'], 'A miscibilidade depende de a molécula interagir com a água; o —OH faz isso, e com apenas dois carbonos a parte apolar não domina.'],
      ['Um químico observa que ácidos carboxílicos têm pontos de ebulição ainda maiores que os de álcoois de massa semelhante. A informação que explica essa observação é que os ácidos carboxílicos:', 'Formam dímeros, unidos por duas ligações de hidrogênio simultâneas.', ['São compostos iônicos em qualquer estado físico.', 'Possuem sempre cadeias muito mais longas.', 'Não apresentam qualquer interação intermolecular.', 'Têm massa molar dez vezes maior.'], 'Duas moléculas de ácido se emparelham por duas pontes de hidrogênio, o que exige ainda mais energia para separá-las.'],
      ['Comparando o ácido etanoico (2 carbonos) e o ácido octadecanoico (18 carbonos) quanto à solubilidade em água, conclui-se que:', 'O ácido etanoico é muito mais solúvel, pois a proporção entre a parte polar e a cadeia apolar lhe é favorável.', ['Os dois são igualmente solúveis, pois têm o mesmo grupo funcional.', 'O de 18 carbonos é mais solúvel, por ter mais átomos.', 'Nenhum dos dois é solúvel, por serem orgânicos.', 'A solubilidade depende apenas da massa molar, e não da estrutura.'], 'O mesmo grupo funcional produz solubilidades diferentes: quanto maior a cadeia apolar, menor a afinidade pela água.'],
      ['Ao escolher um solvente para remover uma mancha de gordura de um tecido, a orientação mais coerente com a química envolvida é usar um solvente:', 'Apolar ou pouco polar, porque substâncias apolares dissolvem gorduras, que também são apolares.', ['Fortemente polar, porque toda gordura é polar.', 'Sempre aquoso, porque a água dissolve qualquer substância.', 'Iônico, porque íons quebram as ligações da gordura.', 'Com ponto de ebulição alto, pois isso define a solubilidade.'], 'A regra semelhante dissolve semelhante orienta a escolha: a gordura é apolar e exige um solvente de polaridade compatível.'],
    ],
  ),
  ...bloco(
    'fo4',
    'caráter ácido e básico das funções orgânicas',
    ['tratar álcool e ácido carboxílico como igualmente ácidos'],
    'Pergunte o que estabiliza o ânion depois da saída do H⁺: quanto mais espalhada a carga negativa, mais ácido o composto.',
    [
      ['Entre as funções orgânicas a seguir, a que apresenta o caráter ácido mais acentuado em meio aquoso é:', 'Ácido carboxílico.', ['Álcool.', 'Éter.', 'Cetona.', 'Hidrocarboneto.'], 'A carboxila cede H⁺ com facilidade porque o ânion resultante tem a carga distribuída entre dois oxigênios.'],
      ['Ao pingar solução de vinagre e solução de etanol sobre um indicador ácido-base, apenas o vinagre provoca mudança visível de cor. A explicação está no fato de que:', 'O ácido etanoico se ioniza em água liberando H⁺, enquanto o etanol praticamente não o faz.', ['O etanol é mais ácido, mas não colore indicadores.', 'O vinagre é uma substância pura e o etanol é uma mistura.', 'A cor depende apenas da densidade da solução.', 'Os dois têm a mesma acidez, e a diferença é apenas de concentração de corante.'], 'O comportamento ácido observável depende da facilidade de liberar H⁺, muito maior na carboxila que na hidroxila do álcool.'],
      ['Um texto informa que o fenol é mais ácido que os álcoois, embora ambos apresentem o grupo —OH. A razão apresentada pela química é que, no fenol:', 'A carga negativa do ânion formado é estabilizada por deslocalização no anel aromático.', ['A hidroxila está ligada a um metal.', 'Não existe hidrogênio disponível para sair.', 'O oxigênio é substituído por nitrogênio.', 'A molécula é iônica desde o início.'], 'O anel benzênico espalha a carga negativa do ânion, o que favorece a saída do H⁺ e aumenta a acidez em relação ao álcool.'],
      ['Comparando a acidez do ácido etanoico, do fenol e do etanol em água, a ordem decrescente correta é:', 'Ácido etanoico > fenol > etanol.', ['Etanol > fenol > ácido etanoico.', 'Fenol > ácido etanoico > etanol.', 'Os três apresentam exatamente a mesma acidez.', 'Etanol > ácido etanoico > fenol.'], 'A estabilização da carga negativa é máxima na carboxila, intermediária no fenol e praticamente inexistente no álcool.'],
      ['As aminas são frequentemente descritas como compostos de caráter básico. Essa característica se deve ao fato de que o nitrogênio:', 'Possui um par de elétrons disponível, capaz de receber um próton H⁺.', ['Libera H⁺ com facilidade em água.', 'Forma ligações iônicas com o carbono.', 'Substitui o oxigênio da carbonila em qualquer reação.', 'Impede qualquer interação com a água.'], 'Basicidade significa capacidade de receber próton, e o par eletrônico não ligante do nitrogênio cumpre esse papel.'],
    ],
  ),
  ...bloco(
    'fo5',
    'isomeria e a limitação da fórmula molecular',
    ['supor que a mesma fórmula molecular garante a mesma substância'],
    'Escreva as estruturas possíveis antes de concluir: mesma fórmula pode esconder cadeia, posição ou função diferentes.',
    [
      ['Dois compostos com a mesma fórmula molecular e estruturas diferentes são classificados como:', 'Isômeros.', ['Alótropos.', 'Isótopos.', 'Polímeros.', 'Misturas azeotrópicas.'], 'Isomeria é justamente a existência de estruturas distintas para uma mesma fórmula molecular.'],
      ['O etanol e o metóxi-metano compartilham a fórmula molecular C₂H₆O, mas pertencem a funções diferentes. Eles são exemplos de isomeria de:', 'Função.', ['Cadeia.', 'Posição.', 'Compensação apenas.', 'Óptica apenas.'], 'Um é álcool e o outro é éter: a mesma fórmula molecular corresponde a funções orgânicas distintas.'],
      ['Uma análise revela que uma amostra tem fórmula molecular C₄H₁₀. Um técnico afirma que, por isso, ela é necessariamente butano. A avaliação correta dessa afirmação é que ela:', 'Está incorreta, pois C₄H₁₀ corresponde também ao metilpropano, isômero de cadeia do butano.', ['Está correta, pois cada fórmula molecular tem uma única estrutura.', 'Está incorreta, pois C₄H₁₀ não é uma fórmula possível.', 'Está correta, pois ramificações não alteram a fórmula molecular.', 'Está incorreta, pois a amostra teria de conter oxigênio.'], 'A fórmula molecular não identifica a substância: butano e metilpropano têm a mesma fórmula e propriedades diferentes.'],
      ['Propan-1-ol e propan-2-ol têm a mesma fórmula molecular, a mesma função e diferem apenas na localização da hidroxila. Essa relação é chamada de isomeria de:', 'Posição.', ['Função.', 'Cadeia.', 'Metameria.', 'Tautomeria.'], 'Mesma função e mesma cadeia, com o grupo funcional em carbonos diferentes, caracteriza isomeria de posição.'],
      ['Um laboratório recebe duas amostras com fórmula molecular idêntica, mas uma tem ponto de ebulição muito maior e é solúvel em água, enquanto a outra não. A conclusão mais coerente é que as amostras:', 'São isômeros de função, e a diferença de propriedades decorre dos grupos funcionais distintos.', ['São a mesma substância, e a diferença veio de erro de medida.', 'Diferem apenas na quantidade de matéria analisada.', 'São isótopos do mesmo elemento químico.', 'Não podem ter a mesma fórmula molecular, por definição.'], 'Propriedades físicas muito diferentes com a mesma fórmula molecular apontam grupos funcionais diferentes — isomeria de função.'],
    ],
  ),
  ...bloco(
    'fo6',
    'aplicação das funções orgânicas em produtos e processos do cotidiano',
    ['associar uma aplicação à função errada por não checar o grupo presente'],
    'Localize o grupo funcional citado no texto e ligue a propriedade que ele confere ao uso descrito.',
    [
      ['O biodiesel é obtido pela reação de óleos vegetais com um álcool, em processo chamado transesterificação. Os produtos dessa reação pertencem à função:', 'Éster.', ['Álcool.', 'Ácido carboxílico apenas.', 'Amina.', 'Hidrocarboneto puro.'], 'A transesterificação troca o grupo alquila de um éster por outro, e o biodiesel é justamente uma mistura de ésteres.'],
      ['Um rótulo de conservante alimentar indica a presença de um composto com hidroxila ligada ao anel aromático, descrito como antioxidante. A função orgânica desse composto é:', 'Fenol.', ['Álcool.', 'Cetona.', 'Éter.', 'Amida.'], 'Hidroxila presa ao anel aromático define fenol, classe à qual pertencem diversos antioxidantes naturais e sintéticos.'],
      ['Uma reportagem sobre higiene informa que o álcool em gel a 70% é eficaz contra vírus e bactérias e se mistura facilmente à água. A propriedade do etanol que sustenta essa informação é:', 'A presença da hidroxila, que permite ligação de hidrogênio com a água e explica a miscibilidade.', ['O caráter iônico do etanol em solução.', 'A ausência de qualquer grupo funcional.', 'A presença de nitrogênio na molécula.', 'Sua natureza exclusivamente apolar.'], 'A hidroxila torna o etanol miscível em água e responde por boa parte de seu comportamento como solvente e antisséptico.'],
      ['Comparando o sabão, um sal de ácido carboxílico de cadeia longa, com o etanol quanto à capacidade de remover gordura, é correto afirmar que:', 'O sabão atua por ter uma parte apolar que interage com a gordura e uma parte iônica que interage com a água, o que o etanol não reproduz na mesma medida.', ['Os dois atuam pelo mesmo mecanismo, pois ambos têm oxigênio.', 'O etanol é mais eficaz por ser totalmente apolar.', 'O sabão age apenas por aumentar a temperatura da água.', 'Nenhum dos dois interage com gordura.'], 'A eficiência do sabão vem da dupla afinidade da molécula, que forma micelas e dispersa a gordura na água.'],
      ['Uma bula descreve o princípio ativo de um analgésico como uma molécula que contém, simultaneamente, um anel aromático, um grupo —COOH e um grupo éster. Sobre essa molécula, a análise mais adequada é que:', 'Ela apresenta mais de uma função orgânica, e cada grupo contribui para propriedades como acidez, solubilidade e forma de atuação no organismo.', ['Ela pertence a uma única função, definida pelo anel aromático.', 'A presença de vários grupos impede qualquer reatividade.', 'O grupo éster anula o caráter ácido da carboxila.', 'A molécula não pode existir, pois funções diferentes não coexistem.'], 'Moléculas de fármacos costumam ser polifuncionais, e cada grupo funcional responde por parte do comportamento químico e biológico.'],
    ],
  ),
];

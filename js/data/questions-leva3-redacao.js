/**
 * Terceira leva — cinco questões novas para cada assunto de Produção Textual.
 *
 * As questões tratam de decisões de escrita: como formular uma tese, escolher
 * repertório, encadear parágrafos e detalhar uma proposta. Todos os trechos
 * citados foram escritos para estas questões.
 */

import { expandedQuestion } from './questions-expansion-factory.js';

const ORIGEM = 'AUTORAL_LEVA_3_2026_08';
const FONTE = 'Trechos e situações autorais criados para prática de produção textual.';

const q = (definicao) => expandedQuestion({ ...definicao, support: FONTE, origin: ORIGEM });

export const REDACAO_QUESTOES_LEVA_3 = [
  /* ------------------------------------------------- Tese e argumentação */
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q3-tese-1',
    stem: 'Sobre o que distingue uma tese de um mero anúncio de tema em uma redação dissertativo-argumentativa, é correto afirmar que a tese:',
    difficulty: 'intro', cognitiveFormat: 'concept', reasoningType: 'distinção entre tema, tese e anúncio de assunto', estimatedSeconds: 100,
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['confundir apresentar o tema com defender uma posição'], correct: 3,
    options: [
      ['apresenta o assunto que será discutido no texto.', 'Apresentar o assunto é anunciar o tema, não assumir posição sobre ele.', 'confundir tema com tese'],
      ['deve aparecer obrigatoriamente na última linha da introdução.', 'A posição usual é o fim da introdução, mas isso é convenção, não definição.', 'confundir posição com natureza'],
      ['precisa ser uma afirmação com a qual ninguém possa discordar.', 'Se ninguém pode discordar, não há o que argumentar.', 'inverter o critério'],
      ['assume uma posição discutível sobre o tema, que os parágrafos seguintes precisarão sustentar.', 'Uma tese comprometente cria a obrigação argumentativa que estrutura o resto do texto.'],
      ['resume os argumentos que serão desenvolvidos ao longo do texto.', 'O resumo dos argumentos é um recurso possível, mas não é o que define a tese.', 'confundir recurso com definição'],
    ],
    explanation: 'Tese é posição, não apresentação. O teste é simples: se é possível discordar dela com razões, é tese; se não, é anúncio de assunto.',
  }),
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q3-tese-2',
    stem: 'Um candidato escreve: "A evasão escolar no Brasil é um problema muito grave e precisa ser resolvido com urgência." Para transformar essa frase em tese, a reescrita mais adequada é:',
    difficulty: 'intermediate', cognitiveFormat: 'applied', reasoningType: 'reescrita de frase genérica em posição defensável', estimatedSeconds: 130,
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['intensificar adjetivos em vez de assumir posição'], correct: 2,
    options: [
      ['"A evasão escolar no Brasil é um problema gravíssimo e urgentíssimo."', 'Intensificar adjetivos não acrescenta posição defensável.', 'intensificar sem posicionar'],
      ['"Muitos jovens abandonam a escola no Brasil todos os anos."', 'Essa é uma constatação factual, sem posição a defender.', 'constatação sem tese'],
      ['"A evasão escolar decorre menos da falta de interesse dos jovens do que da incapacidade da escola de dialogar com a realidade em que vivem."', 'A frase atribui causa, exclui outra explicação corrente e cria compromisso argumentativo verificável.'],
      ['"Neste texto, discutirei as causas e as consequências da evasão escolar."', 'Anunciar o percurso do texto não é assumir posição sobre o tema.', 'anúncio de percurso'],
      ['"A evasão escolar é um tema que preocupa educadores, famílias e governos."', 'A frase descreve a repercussão do tema, sem tomar partido.', 'contextualização sem tese'],
    ],
    explanation: 'Uma tese ganha força quando aponta causa, hierarquiza fatores ou recusa uma explicação corrente. Adjetivos intensos não substituem posição.',
  }),
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q3-tese-3',
    stem: 'Um parágrafo argumentativo afirma: "Isso é verdade porque todo mundo sabe que a educação é a base de tudo." O problema argumentativo desse trecho é que ele:',
    difficulty: 'intermediate', cognitiveFormat: 'interpretation', reasoningType: 'identificação de apelo ao senso comum como falha argumentativa', estimatedSeconds: 120,
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['aceitar consenso aparente como prova'], correct: 1,
    options: [
      ['usa uma linguagem informal inadequada ao gênero.', 'O registro é informal, mas o problema apontado é de estrutura argumentativa.', 'reduzir a registro'],
      ['apoia a conclusão em um consenso presumido, sem oferecer razão, dado ou exemplo.', 'Dizer que todos sabem transfere o ônus da prova para o leitor em vez de sustentar a afirmação.'],
      ['apresenta dois argumentos contraditórios no mesmo período.', 'Não há contradição interna no trecho.', 'diagnóstico incorreto'],
      ['contém um erro de concordância verbal.', 'A concordância está adequada.', 'diagnóstico incorreto'],
      ['não apresenta conectivo entre as orações.', 'O conectivo está presente e é justamente o que introduz a justificativa frágil.', 'diagnóstico incorreto'],
    ],
    explanation: 'Apelar ao que "todo mundo sabe" evita argumentar. A justificativa precisa trazer razão, dado ou exemplo que o leitor possa examinar.',
  }),
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q3-tese-4',
    stem: 'Comparando um texto que ignora as objeções à sua tese e outro que as apresenta antes de respondê-las, é correto afirmar que o segundo:',
    difficulty: 'intermediate', cognitiveFormat: 'comparison', reasoningType: 'efeito da contra-argumentação sobre a força do texto', estimatedSeconds: 130,
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['achar que mencionar objeção enfraquece o texto'], correct: 4,
    options: [
      ['enfraquece sua posição, pois dá espaço ao adversário.', 'Apresentar e responder à objeção demonstra domínio e antecipa a resistência do leitor.', 'supor enfraquecimento'],
      ['é mais longo e por isso menos objetivo.', 'Extensão não é o critério em discussão.', 'critério trocado'],
      ['deixa de ser dissertativo-argumentativo ao expor outra opinião.', 'A contra-argumentação é procedimento próprio do gênero.', 'classificação incorreta'],
      ['só funciona quando a objeção é fraca.', 'Responder a uma objeção forte é o que mais fortalece o texto.', 'inverter o critério'],
      ['ganha força, porque mostra que a tese resiste ao exame das objeções mais sérias.', 'Uma posição que enfrenta a melhor versão do argumento contrário se torna mais difícil de recusar.'],
    ],
    explanation: 'Antecipar objeções não é conceder: é mostrar que a tese foi testada. O que fragiliza é fingir que a objeção não existe.',
  }),
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q3-tese-5',
    stem: 'Um texto defende que "o acesso à internet deve ser tratado como direito básico". No desenvolvimento, apresenta dados sobre exclusão digital, cita uma política pública de conectividade e discute o impacto na escolarização. Sobre a articulação entre tese e desenvolvimento:',
    difficulty: 'challenging', cognitiveFormat: 'integration', reasoningType: 'avaliação da coerência entre tese e sustentação', estimatedSeconds: 160,
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['aceitar acúmulo de informação como argumentação'], correct: 0,
    options: [
      ['os três elementos sustentam a tese se cada um for explicitamente ligado à ideia de direito básico, e não apenas justapostos.', 'Dado, política pública e impacto só argumentam quando o texto mostra o que cada um prova em relação à posição defendida.'],
      ['os três elementos, por si só, já comprovam a tese.', 'Informação acumulada não é argumentação: falta o elo entre o dado e a conclusão.', 'confundir informação com argumento'],
      ['a citação de política pública é desnecessária em uma dissertação.', 'Ela é repertório legítimo e pode sustentar a tese.', 'excluir recurso válido'],
      ['a tese é inadequada, pois trata de tema técnico.', 'O tema admite tratamento dissertativo-argumentativo sem dificuldade.', 'avaliação incorreta'],
      ['o texto deveria apresentar apenas um dos três elementos, para não perder foco.', 'A variedade de sustentação é desejável, desde que articulada.', 'restrição desnecessária'],
    ],
    explanation: 'O que transforma informação em argumento é o elo explícito com a tese. Sem esse elo, o parágrafo informa, mas não defende.',
    strategy: 'Depois de cada dado ou exemplo, escreva uma frase que responda: o que isso prova a respeito da minha tese?',
  }),

  /* ------------------------------------------- Repertório sociocultural */
  q({
    topicSlug: 'repertorio-sociocultural', slug: 'q3-rep3-1',
    stem: 'Um repertório sociocultural é considerado produtivo em uma redação quando:',
    difficulty: 'intro', cognitiveFormat: 'concept', reasoningType: 'critério de produtividade do repertório', estimatedSeconds: 100,
    skillSlug: 'selecionar-e-articular-repertorio-sociocultural', likelyErrors: ['avaliar repertório pelo prestígio da fonte'], correct: 2,
    options: [
      ['provém de uma fonte prestigiada, como um filósofo clássico.', 'Prestígio da fonte não garante função argumentativa no texto.', 'critério de prestígio'],
      ['aparece logo na introdução, para demonstrar conhecimento.', 'Posição não define produtividade.', 'critério de posição'],
      ['está articulado à tese, esclarecendo ou sustentando o argumento em que aparece.', 'O repertório precisa fazer trabalho argumentativo, e não apenas demonstrar leitura.'],
      ['é pouco conhecido, o que impressiona o leitor.', 'Originalidade sem função argumentativa não acrescenta.', 'critério de raridade'],
      ['ocupa pelo menos três linhas do parágrafo.', 'Extensão não é critério de qualidade.', 'critério de tamanho'],
    ],
    explanation: 'Repertório produtivo é aquele que faz o argumento avançar. Citação que poderia ser removida sem prejuízo não estava trabalhando.',
  }),
  q({
    topicSlug: 'repertorio-sociocultural', slug: 'q3-rep3-2',
    stem: 'Ao discutir a desigualdade no acesso à cultura, um candidato quer usar como repertório a existência de bibliotecas públicas em seu município. A forma mais produtiva de empregar esse repertório é:',
    difficulty: 'intermediate', cognitiveFormat: 'applied', reasoningType: 'articulação entre repertório local e argumento', estimatedSeconds: 130,
    skillSlug: 'selecionar-e-articular-repertorio-sociocultural', likelyErrors: ['citar o repertório sem extrair consequência argumentativa'], correct: 1,
    options: [
      ['mencionar que a cidade possui bibliotecas públicas e passar ao próximo parágrafo.', 'A menção isolada não sustenta nada: falta dizer o que ela demonstra.', 'citar sem articular'],
      ['mostrar que a existência do equipamento não garante acesso quando ele está distante das periferias e funciona em horário comercial.', 'O repertório passa a sustentar a tese ao revelar a distância entre oferta formal e acesso efetivo.'],
      ['elogiar a política cultural do município em termos gerais.', 'O elogio genérico não faz trabalho argumentativo.', 'avaliação sem função'],
      ['substituir o exemplo local por uma citação de um autor estrangeiro.', 'A troca não é necessária: repertório local bem articulado funciona.', 'substituição desnecessária'],
      ['listar o número de bibliotecas de várias cidades brasileiras.', 'Acúmulo de dados sem articulação não avança o argumento.', 'acumular sem articular'],
    ],
    explanation: 'Repertório local é legítimo e muitas vezes mais preciso. O que decide é a consequência que o texto extrai dele.',
  }),
  q({
    topicSlug: 'repertorio-sociocultural', slug: 'q3-rep3-3',
    stem: 'Um texto abre o segundo parágrafo com uma citação atribuída a um filósofo, seguida de "portanto, o problema persiste no Brasil". Sobre esse uso:',
    difficulty: 'intermediate', cognitiveFormat: 'interpretation', reasoningType: 'avaliação do encaixe entre citação e conclusão', estimatedSeconds: 130,
    skillSlug: 'selecionar-e-articular-repertorio-sociocultural', likelyErrors: ['aceitar o conectivo como se ele criasse a ligação lógica'], correct: 3,
    options: [
      ['está adequado, pois a citação confere autoridade ao argumento.', 'Autoridade não substitui o raciocínio que liga a citação à conclusão.', 'autoridade como prova'],
      ['está adequado, desde que a citação seja literal.', 'Fidelidade é necessária, mas não resolve a ausência de articulação.', 'condição insuficiente'],
      ['está inadequado porque citações não devem abrir parágrafos.', 'Abrir com citação é procedimento comum e aceitável.', 'regra inventada'],
      ['está inadequado: o conectivo anuncia uma conclusão que a citação, sozinha, não sustenta.', 'Entre a citação e a conclusão falta o passo que explica por que aquela ideia se aplica ao caso brasileiro.'],
      ['está inadequado porque filósofos não servem como repertório em temas sociais.', 'Eles servem, desde que a articulação seja feita.', 'restrição incorreta'],
    ],
    explanation: 'Conectivo não cria relação lógica: ele sinaliza uma relação que o texto precisa ter construído. O elo ausente aparece como salto.',
  }),
  q({
    topicSlug: 'repertorio-sociocultural', slug: 'q3-rep3-4',
    stem: 'Comparando o uso de um dado estatístico e o de um exemplo narrativo como repertório, é correto afirmar que:',
    difficulty: 'intermediate', cognitiveFormat: 'comparison', reasoningType: 'contraste entre tipos de repertório e suas funções', estimatedSeconds: 130,
    skillSlug: 'selecionar-e-articular-repertorio-sociocultural', likelyErrors: ['hierarquizar tipos de repertório de forma absoluta'], correct: 4,
    options: [
      ['o dado estatístico é sempre superior, por ser objetivo.', 'Dado sem articulação é tão inerte quanto exemplo sem função.', 'hierarquia absoluta'],
      ['o exemplo narrativo é sempre superior, por ser concreto.', 'Concretude ajuda, mas não substitui a demonstração de abrangência.', 'hierarquia absoluta'],
      ['os dois cumprem exatamente a mesma função no texto.', 'Um mostra dimensão do fenômeno; o outro torna visível o mecanismo.', 'igualar funções'],
      ['apenas o dado estatístico exige indicação de fonte.', 'Exemplos também ganham com indicação de origem quando são factuais.', 'restrição indevida'],
      ['o dado indica a dimensão do problema e o exemplo torna visível como ele se realiza, e a combinação costuma ser mais forte que cada um isolado.', 'Escala e mecanismo respondem a perguntas diferentes, e um argumento sólido costuma precisar das duas.'],
    ],
    explanation: 'Dado responde "quanto"; exemplo responde "como". Um texto forte costuma articular os dois em vez de escolher entre eles.',
  }),
  q({
    topicSlug: 'repertorio-sociocultural', slug: 'q3-rep3-5',
    stem: 'Um candidato tem repertório sobre a Revolução Industrial e precisa escrever sobre trabalho por aplicativos. A decisão mais consistente é:',
    difficulty: 'challenging', cognitiveFormat: 'integration', reasoningType: 'transposição produtiva de repertório entre contextos', estimatedSeconds: 160,
    skillSlug: 'selecionar-e-articular-repertorio-sociocultural', likelyErrors: ['forçar o repertório disponível sem estabelecer a relação'], correct: 0,
    options: [
      ['usar o repertório para mostrar que a disputa por regulação da jornada não é nova, explicitando semelhança e diferença entre os dois contextos.', 'A transposição funciona quando o texto nomeia o que se repete e o que mudou, em vez de sugerir identidade entre épocas.'],
      ['descrever a Revolução Industrial em detalhe e depois falar de aplicativos.', 'Justapor os dois assuntos não constrói relação argumentativa.', 'justapor sem articular'],
      ['abandonar o repertório por ser de outro período histórico.', 'Repertório histórico é produtivo quando a relação é construída.', 'descarte desnecessário'],
      ['afirmar que o trabalho por aplicativo é idêntico ao do século XIX.', 'A identidade é falsa e fragiliza o texto.', 'analogia sem limite'],
      ['citar apenas o nome do período, sem desenvolver.', 'A menção solta não faz trabalho argumentativo.', 'citar sem articular'],
    ],
    explanation: 'Transpor repertório exige marcar a semelhança que sustenta o argumento e a diferença que impede a analogia de virar exagero.',
  }),

  /* --------------------------------------------- Coesão e progressão */
  q({
    topicSlug: 'coesao-e-progressao', slug: 'q3-coe-1',
    stem: 'Em um texto dissertativo, a diferença entre coesão e coerência pode ser formulada assim:',
    difficulty: 'intro', cognitiveFormat: 'concept', reasoningType: 'distinção entre articulação superficial e sentido global', estimatedSeconds: 100,
    skillSlug: 'construir-coesao-e-progressao-no-texto', likelyErrors: ['usar os dois termos como sinônimos'], correct: 2,
    options: [
      ['coesão trata do conteúdo e coerência, da gramática.', 'A relação está invertida.', 'inverter os termos'],
      ['coesão é obrigatória e coerência é opcional.', 'As duas são exigidas em um texto bem construído.', 'hierarquia incorreta'],
      ['coesão é a amarração explícita entre partes do texto; coerência é a consistência do sentido construído no conjunto.', 'Conectivos e retomadas fazem a costura visível; a coerência garante que o todo faça sentido.'],
      ['coesão só existe entre parágrafos, e coerência só dentro deles.', 'Ambas operam nos dois níveis.', 'escopo incorreto'],
      ['os dois termos designam a mesma propriedade textual.', 'Um texto pode ser coeso e incoerente, o que mostra que são distintos.', 'igualar os conceitos'],
    ],
    explanation: 'É possível encadear frases com conectivos corretos e ainda assim dizer algo sem sentido. Coesão é costura; coerência é o desenho que resulta dela.',
  }),
  q({
    topicSlug: 'coesao-e-progressao', slug: 'q3-coe-2',
    stem: 'Leia: "A cidade ampliou as ciclovias. Portanto, o número de acidentes com ciclistas aumentou." O problema desse período está em:',
    difficulty: 'intermediate', cognitiveFormat: 'applied', reasoningType: 'adequação do conectivo à relação entre as ideias', estimatedSeconds: 120,
    skillSlug: 'construir-coesao-e-progressao-no-texto', likelyErrors: ['escolher conectivos pelo som, não pela relação'], correct: 3,
    options: [
      ['repetir o assunto nas duas orações.', 'A retomada do assunto é adequada e favorece a coesão.', 'diagnóstico incorreto'],
      ['usar duas orações curtas em sequência.', 'A extensão das orações não é o problema.', 'diagnóstico incorreto'],
      ['omitir o sujeito da segunda oração.', 'O sujeito está expresso na segunda oração.', 'diagnóstico incorreto'],
      ['usar um conectivo de conclusão para uma relação que o texto não estabeleceu.', 'A conclusão anunciada não decorre da premissa: seria preciso explicar por que a ampliação levaria a mais acidentes.'],
      ['empregar o pretérito perfeito nas duas orações.', 'A escolha de tempo verbal é adequada.', 'diagnóstico incorreto'],
    ],
    explanation: 'Conectivo é promessa: quem escreve "portanto" se compromete com uma relação de consequência que o texto precisa sustentar.',
  }),
  q({
    topicSlug: 'coesao-e-progressao', slug: 'q3-coe-3',
    stem: 'Um parágrafo repete cinco vezes a palavra "violência" em oito linhas. Além do efeito de repetição, o problema textual mais relevante é que:',
    difficulty: 'intermediate', cognitiveFormat: 'interpretation', reasoningType: 'leitura da retomada lexical como recurso de progressão', estimatedSeconds: 120,
    skillSlug: 'construir-coesao-e-progressao-no-texto', likelyErrors: ['tratar repetição apenas como problema de estilo'], correct: 1,
    options: [
      ['a repetição torna o texto informal.', 'Repetição não desloca o registro para o informal.', 'diagnóstico incorreto'],
      ['a ausência de retomadas variadas desperdiça oportunidades de acrescentar informação sobre o termo a cada menção.', 'Substituições como "esse fenômeno" ou "tal agravamento" retomam e ao mesmo tempo qualificam, fazendo o texto progredir.'],
      ['a palavra repetida deve ser trocada por sinônimo em toda ocorrência.', 'A substituição sistemática pode prejudicar a clareza; o critério é a função de cada retomada.', 'regra rígida'],
      ['a repetição indica erro gramatical.', 'Não há erro gramatical envolvido.', 'diagnóstico incorreto'],
      ['o parágrafo ficou longo demais para uma dissertação.', 'Oito linhas é extensão normal para um parágrafo argumentativo.', 'diagnóstico incorreto'],
    ],
    explanation: 'Boa retomada faz dois trabalhos ao mesmo tempo: liga ao que veio antes e acrescenta uma qualificação nova. Repetir só faz o primeiro.',
  }),
  q({
    topicSlug: 'coesao-e-progressao', slug: 'q3-coe-4',
    stem: 'Comparando dois textos, um em que cada parágrafo começa retomando a ideia final do anterior e outro em que os parágrafos apenas se somam sem ligação explícita, é correto afirmar que:',
    difficulty: 'intermediate', cognitiveFormat: 'comparison', reasoningType: 'efeito da articulação entre parágrafos sobre a leitura', estimatedSeconds: 130,
    skillSlug: 'construir-coesao-e-progressao-no-texto', likelyErrors: ['achar que parágrafos bem escritos dispensam articulação'], correct: 4,
    options: [
      ['os dois se equivalem, desde que cada parágrafo seja bem escrito internamente.', 'Parágrafos bons isolados podem formar um texto que não avança.', 'ignorar o encadeamento'],
      ['o segundo é preferível, por evitar repetições.', 'Evitar repetição não compensa a perda de encadeamento.', 'critério trocado'],
      ['o primeiro tende a ficar prolixo pela retomada constante.', 'A retomada bem feita é breve e não implica prolixidade.', 'avaliação incorreta'],
      ['a articulação entre parágrafos é opcional em textos curtos.', 'Mesmo em textos curtos o encadeamento orienta a leitura.', 'exceção inventada'],
      ['o primeiro constrói progressão, permitindo ao leitor acompanhar como o argumento avança de uma etapa à seguinte.', 'Encadear parágrafos transforma uma lista de ideias em um percurso argumentativo.'],
    ],
    explanation: 'Progressão é o que distingue argumentação de enumeração. Sem articulação entre parágrafos, o leitor recebe blocos, não um raciocínio.',
  }),
  q({
    topicSlug: 'coesao-e-progressao', slug: 'q3-coe-5',
    stem: 'Um texto usa "além disso" para introduzir o terceiro parágrafo, que na verdade apresenta uma objeção à ideia defendida no segundo. Analisando essa escolha:',
    difficulty: 'challenging', cognitiveFormat: 'integration', reasoningType: 'articulação entre plano argumentativo e escolha de conectivo', estimatedSeconds: 160,
    skillSlug: 'construir-coesao-e-progressao-no-texto', likelyErrors: ['tratar conectivos como intercambiáveis'], correct: 0,
    options: [
      ['o conectivo desorienta o leitor, que espera acréscimo e encontra contraste; a escolha adequada seria um conectivo adversativo ou concessivo.', 'O conectivo cria uma expectativa de continuidade que o parágrafo contraria, obrigando o leitor a reler para entender a relação.'],
      ['a escolha é indiferente, pois o conteúdo do parágrafo esclarece a relação.', 'Se o leitor precisa reler para reconstruir a relação, o conectivo falhou.', 'minimizar o efeito'],
      ['o problema é o uso de conectivo no início do parágrafo.', 'Iniciar parágrafo com conectivo é procedimento comum e adequado.', 'regra inventada'],
      ['a solução é retirar o conectivo e deixar os parágrafos justapostos.', 'Retirar a marca de relação piora o encadeamento em vez de corrigi-lo.', 'solução inadequada'],
      ['o erro está no segundo parágrafo, que não deveria admitir objeção.', 'Admitir objeção é desejável; o problema está na sinalização da relação.', 'deslocar o problema'],
    ],
    explanation: 'Conectivo é instrução de leitura. Quando ele aponta para um lado e o parágrafo vai para outro, o leitor perde o fio do argumento.',
    strategy: 'Antes de escolher o conectivo, nomeie a relação: acréscimo, contraste, causa, conclusão ou concessão. A palavra vem depois da relação.',
  }),

  /* ------------------------------------------- Proposta de intervenção */
  q({
    topicSlug: 'proposta-de-intervencao', slug: 'q3-prop-1',
    stem: 'Uma proposta de intervenção completa em redação dissertativo-argumentativa costuma articular cinco elementos. São eles:',
    difficulty: 'intro', cognitiveFormat: 'concept', reasoningType: 'estrutura da proposta de intervenção', estimatedSeconds: 100,
    skillSlug: 'elaborar-proposta-de-intervencao-detalhada', likelyErrors: ['reduzir a proposta a agente e ação'], correct: 2,
    options: [
      ['tema, tese, argumento, exemplo e conclusão.', 'Esses são elementos do texto como um todo, não da proposta.', 'confundir com estrutura do texto'],
      ['agente, ação e finalidade, apenas.', 'Faltam o meio de execução e o detalhamento.', 'proposta incompleta'],
      ['agente, ação, meio ou modo de execução, finalidade e detalhamento.', 'Quem faz, o que faz, como faz, para que faz e um esclarecimento que torne a proposta concreta.'],
      ['agente, orçamento, prazo, meta e indicador.', 'Esse é o formato de um projeto administrativo, não da proposta pedida no gênero.', 'formato trocado'],
      ['problema, causa, consequência, solução e avaliação.', 'Essa é uma estrutura de análise, não a da proposta.', 'formato trocado'],
    ],
    explanation: 'A proposta responde a cinco perguntas: quem, o quê, como, para quê e com que especificação. Faltando uma, ela fica genérica.',
  }),
  q({
    topicSlug: 'proposta-de-intervencao', slug: 'q3-prop-2',
    stem: 'Um candidato escreve: "O governo deve investir mais em educação para resolver o problema." Para completar essa proposta, o elemento mais urgente a acrescentar é:',
    difficulty: 'intermediate', cognitiveFormat: 'applied', reasoningType: 'identificação do elemento ausente na proposta', estimatedSeconds: 120,
    skillSlug: 'elaborar-proposta-de-intervencao-detalhada', likelyErrors: ['acrescentar adjetivos em vez de meio de execução'], correct: 1,
    options: [
      ['um adjetivo que reforce a urgência do investimento.', 'Intensificar a linguagem não torna a proposta executável.', 'intensificar sem detalhar'],
      ['o meio de execução: por qual instrumento e em que frente o investimento se daria.', 'Sem indicar como a ação se realiza, a proposta permanece uma intenção genérica.'],
      ['a menção ao problema tratado no texto.', 'O problema já está pressuposto pela redação.', 'elemento já presente'],
      ['a repetição da tese defendida na introdução.', 'Repetir a tese não acrescenta operacionalidade.', 'repetição sem função'],
      ['a indicação do valor exato a ser investido.', 'Precisão orçamentária não é exigida no gênero.', 'exigência incompatível'],
    ],
    explanation: '"Investir mais" nomeia agente, ação e finalidade, mas não diz como. É o meio de execução que separa proposta de desejo.',
  }),
  q({
    topicSlug: 'proposta-de-intervencao', slug: 'q3-prop-3',
    stem: 'Uma proposta afirma: "As escolas devem conscientizar os alunos por meio de palestras semanais sobre o tema, a fim de reduzir o problema." Sobre essa formulação:',
    difficulty: 'intermediate', cognitiveFormat: 'interpretation', reasoningType: 'avaliação da consistência entre meio e finalidade', estimatedSeconds: 130,
    skillSlug: 'elaborar-proposta-de-intervencao-detalhada', likelyErrors: ['aceitar a presença formal dos elementos como suficiência'], correct: 4,
    options: [
      ['está incompleta, pois falta o agente.', 'O agente está indicado: as escolas.', 'elemento presente'],
      ['está incompleta, pois falta a finalidade.', 'A finalidade está expressa na oração final.', 'elemento presente'],
      ['está incompleta, pois falta a ação.', 'A ação está indicada como conscientizar.', 'elemento presente'],
      ['está completa e adequada, sem reparos possíveis.', 'Os elementos estão presentes, mas o detalhamento é fraco e o meio é genérico.', 'aceitar sem exame'],
      ['tem os cinco elementos, mas o detalhamento é frágil: "palestras sobre o tema" não especifica conteúdo, público nem articulação com o currículo.', 'A presença formal dos elementos não garante que a proposta seja concreta o bastante para ser avaliada.'],
    ],
    explanation: 'Marcar os cinco elementos é o mínimo. O que distingue uma proposta forte é o grau de especificação de cada um deles.',
  }),
  q({
    topicSlug: 'proposta-de-intervencao', slug: 'q3-prop-4',
    stem: 'Comparando uma proposta que atribui a ação ao Ministério da Educação e outra que a atribui a "a sociedade", é correto afirmar que:',
    difficulty: 'intermediate', cognitiveFormat: 'comparison', reasoningType: 'critério de adequação do agente proposto', estimatedSeconds: 130,
    skillSlug: 'elaborar-proposta-de-intervencao-detalhada', likelyErrors: ['aceitar agentes difusos como suficientes'], correct: 3,
    options: [
      ['as duas são equivalentes, pois ambas indicam um agente.', 'Um agente que não pode ser cobrado não cumpre a função do elemento.', 'igualar os agentes'],
      ['a segunda é melhor, por envolver todos os cidadãos.', 'Envolver todos, na prática, é não atribuir responsabilidade a ninguém.', 'confundir abrangência com precisão'],
      ['a primeira é inadequada por citar um órgão específico.', 'Citar órgão competente é justamente o que se espera.', 'inverter o critério'],
      ['a primeira é mais adequada, porque nomeia um agente com competência definida e passível de ser responsabilizado.', 'Agente identificável torna a proposta verificável: é possível dizer quem deve agir e sob qual atribuição.'],
      ['nenhuma serve, pois propostas devem indicar pessoas físicas.', 'Instituições são agentes legítimos e usuais.', 'exigência incorreta'],
    ],
    explanation: 'Agente difuso dilui responsabilidade. Nomear quem tem competência para agir é o que permite avaliar se a proposta faz sentido.',
  }),
  q({
    topicSlug: 'proposta-de-intervencao', slug: 'q3-prop-5',
    stem: 'Um texto defende que a evasão escolar decorre da necessidade de trabalho precoce, mas propõe como intervenção campanhas de conscientização sobre a importância do estudo. Sobre a relação entre diagnóstico e proposta:',
    difficulty: 'challenging', cognitiveFormat: 'integration', reasoningType: 'articulação entre causa identificada e intervenção proposta', estimatedSeconds: 170,
    skillSlug: 'elaborar-proposta-de-intervencao-detalhada', likelyErrors: ['propor intervenção desconectada da causa desenvolvida'], correct: 0,
    options: [
      ['há incoerência: a proposta atua sobre percepção, enquanto o texto atribuiu a evasão a uma necessidade material.', 'Se a causa apontada é a renda familiar, a intervenção precisa tocar essa condição, por meio de auxílio, bolsa ou jornada compatível.'],
      ['a proposta é adequada, pois conscientizar sempre ajuda.', 'Ajuda genérica não responde à causa que o próprio texto estabeleceu.', 'aceitar solução genérica'],
      ['a incoerência é irrelevante, pois a proposta aparece no último parágrafo.', 'A coerência entre diagnóstico e proposta é justamente o que se avalia.', 'minimizar o problema'],
      ['o problema está no diagnóstico, que deveria citar falta de interesse.', 'O diagnóstico apresentado é plausível; o desencontro está na proposta.', 'deslocar o problema'],
      ['bastaria acrescentar mais um agente à proposta para corrigi-la.', 'Somar agentes não corrige o desencontro entre causa e ação.', 'correção insuficiente'],
    ],
    explanation: 'Proposta é a continuação do diagnóstico. Se o texto atribui o problema a uma causa material, intervir apenas sobre percepção deixa a causa intocada.',
    strategy: 'Antes de escrever a proposta, releia a causa que você defendeu no desenvolvimento. A intervenção precisa agir sobre ela, e não sobre outra.',
  }),
];

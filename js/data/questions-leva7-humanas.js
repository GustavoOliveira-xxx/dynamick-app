import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_7_2026_08';
const support = 'Situação e fonte autorais criadas para a sétima atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'cidadania-e-direitos', skillSlug: 'relacionar-conceitos-a-situacoes-concretas', reasoning: 'direitos, deveres, inclusão e participação social', errors: ['confundir direito universal com benefício particular'], strategy: 'Identifique quem possui o direito, quem deve garanti-lo e como ele pode ser exigido.',
    items: [
      ['Uma audiência pública permite que moradores questionem um projeto urbano antes da decisão. Ela amplia:', 'Participação social e controle democrático.', ['Sigilo administrativo.', 'Poder hereditário.', 'Censura comunitária.', 'Privatização do voto.'], 'A população recebe canal formal para informar e fiscalizar a decisão.'],
      ['Uma escola instala rampas e materiais acessíveis. A medida concretiza:', 'O direito à educação com remoção de barreiras.', ['Um favor sem obrigação institucional.', 'A separação permanente dos estudantes.', 'A redução do currículo para todos.', 'A proibição de diferenças.'], 'Acesso efetivo exige adaptações que permitam participação.'],
      ['O habeas corpus protege principalmente:', 'A liberdade de locomoção diante de ameaça ou abuso ilegal.', ['O direito de herança apenas.', 'A criação de empresas.', 'A propriedade intelectual.', 'A cobrança de impostos.'], 'O instrumento reage a restrição ilegal da liberdade de ir e vir.'],
      ['Quando cidadãos solicitam dados de gastos públicos, exercem:', 'Direito de acesso à informação e fiscalização.', ['Poder de substituir o orçamento.', 'Direito de ocultar contratos.', 'Censura dos servidores.', 'Privilégio eleitoral privado.'], 'Transparência permite acompanhar o emprego de recursos coletivos.'],
      ['Uma política universal pode precisar de ações específicas para grupos vulneráveis porque:', 'Condições desiguais exigem meios diferentes para acesso equivalente.', ['Universalidade proíbe qualquer adaptação.', 'Direitos pertencem apenas a minorias.', 'A igualdade elimina diferenças reais.', 'Toda ação específica é discriminação.'], 'Equidade ajusta meios sem retirar a universalidade do direito.'],
    ],
  },
  {
    topicSlug: 'urbanizacao-e-desigualdade', skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos', reasoning: 'produção, segregação e mobilidade no espaço urbano', errors: ['naturalizar desigualdades territoriais'], strategy: 'Conecte mercado da terra, planejamento, infraestrutura e deslocamentos cotidianos.',
    items: [
      ['O aumento do preço da terra perto de novos equipamentos públicos pode expulsar moradores de baixa renda. Isso revela:', 'A disputa desigual pelos benefícios da valorização urbana.', ['Distribuição automática de riqueza.', 'Fim do mercado imobiliário.', 'Homogeneidade dos bairros.', 'Ausência de ação pública.'], 'A melhoria territorial pode gerar deslocamento se não houver proteção habitacional.'],
      ['No processo de urbanização, a conurbação ocorre quando:', 'Áreas urbanizadas de municípios vizinhos se unem fisicamente.', ['A população retorna ao campo.', 'Uma cidade perde todas as indústrias.', 'Bairros centrais ficam vazios.', 'Uma metrópole proíbe transportes.'], 'A expansão contínua faz limites municipais deixarem de ser visíveis na paisagem.'],
      ['Longos deslocamentos pendulares entre periferia e centro indicam:', 'Separação espacial entre moradia e oportunidades.', ['Autossuficiência dos bairros periféricos.', 'Fim da mobilidade diária.', 'Igualdade de acesso ao emprego.', 'Desaparecimento da metrópole.'], 'A concentração de trabalho e serviços obriga viagens recorrentes.'],
      ['Regularização fundiária acompanhada de saneamento busca:', 'Garantir segurança da posse e melhorar condições urbanas.', ['Remover todos os moradores.', 'Aumentar riscos geológicos.', 'Substituir serviços por documentos.', 'Impedir qualquer planejamento.'], 'Titulação isolada é insuficiente; urbanização integra direitos e infraestrutura.'],
      ['Uma cidade com muitos imóveis vazios e grande déficit habitacional apresenta:', 'Contradição entre função social da propriedade e uso especulativo.', ['Falta absoluta de construções.', 'Distribuição perfeita das moradias.', 'Problema apenas demográfico.', 'Fim da valorização imobiliária.'], 'A existência física de imóveis não garante que cumpram finalidade social.'],
    ],
  },
  {
    topicSlug: 'meio-ambiente-e-sociedade', skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio', reasoning: 'conflitos socioambientais, recursos e sustentabilidade', errors: ['ignorar distribuição social de custos'], strategy: 'Mapeie atores, interesses, escalas, benefícios e impactos.',
    items: [
      ['Uma comunidade depende do rio que uma indústria utiliza para descarte. O conflito envolve:', 'Usos incompatíveis do recurso e poder desigual entre atores.', ['Ausência de relação entre economia e água.', 'Interesse idêntico de todos.', 'Problema exclusivamente natural.', 'Fim da responsabilidade empresarial.'], 'Qualidade da água afeta modos de vida enquanto a atividade transfere custos.'],
      ['O consumo de produtos com cadeia rastreável pode contribuir para:', 'Responsabilizar fornecedores e reduzir origem ligada a desmatamento ilegal.', ['Eliminar todo impacto automaticamente.', 'Impedir fiscalização pública.', 'Tornar transporte desnecessário.', 'Substituir leis por propaganda.'], 'Rastreabilidade torna origem verificável, embora não resolva tudo sozinha.'],
      ['A impermeabilização intensa do solo urbano favorece enchentes porque:', 'Reduz infiltração e acelera escoamento superficial.', ['Aumenta absorção pela vegetação.', 'Cria rios subterrâneos naturais.', 'Diminui o volume de chuva.', 'Elimina ocupação de várzeas.'], 'Mais água chega rapidamente à drenagem e aos cursos d’água.'],
      ['Uma unidade de conservação de uso sustentável permite:', 'Proteção ambiental combinada a usos regulados por comunidades.', ['Exploração sem limite.', 'Ausência total de pessoas em qualquer categoria.', 'Venda obrigatória do território.', 'Eliminação do plano de manejo.'], 'Algumas categorias conciliam conservação e atividades compatíveis.'],
      ['Economia circular procura reduzir resíduos por meio de:', 'Reuso, reparo, remanufatura e reciclagem desde o projeto.', ['Extração crescente e descarte rápido.', 'Proibição de manutenção.', 'Uso único de materiais.', 'Aumento planejado da obsolescência.'], 'Materiais permanecem em ciclos produtivos por mais tempo.'],
    ],
  },
  {
    topicSlug: 'brasil-republica', skillSlug: 'analisar-processos-da-republica-brasileira', reasoning: 'disputas políticas, direitos e mudanças no Brasil republicano', errors: ['narrar mudanças sem analisar conflitos'], strategy: 'Relacione instituições, grupos sociais, interesses e limites de cada transformação.',
    items: [
      ['A Revolta da Vacina combinou reação à vacinação obrigatória com:', 'Insatisfação diante de reformas autoritárias e remoções urbanas.', ['Defesa do voto feminino já universal.', 'Apoio popular unânime ao governo.', 'Fim das desigualdades cariocas.', 'Movimento pela volta da escravidão.'], 'A medida sanitária ocorreu num contexto de intervenção sem participação popular.'],
      ['O tenentismo criticava especialmente:', 'Fraudes eleitorais e domínio oligárquico da Primeira República.', ['A industrialização do século XXI.', 'A Constituição de 1988.', 'A redemocratização de 1985.', 'A independência de 1822.'], 'Jovens oficiais defendiam reformas contra estruturas oligárquicas.'],
      ['O Estado Novo, iniciado em 1937, caracterizou-se por:', 'Autoritarismo, centralização e censura.', ['Federalismo sem poder central.', 'Eleições presidenciais livres anuais.', 'Pluralismo partidário irrestrito.', 'Autonomia sindical completa.'], 'O golpe fechou instituições e concentrou poder no Executivo.'],
      ['A campanha da anistia no final da ditadura relacionou-se à:', 'Volta de exilados e libertação de perseguidos políticos.', ['Ampliação da censura.', 'Suspensão da redemocratização.', 'Extinção de movimentos sociais.', 'Manutenção de todos os atos de exceção.'], 'A anistia foi reivindicação central da abertura política.'],
      ['A eleição indireta de Tancredo Neves em 1985 representou:', 'Transição negociada que encerrou o ciclo de presidentes militares.', ['Primeira eleição direta após a Constituição de 1988.', 'Retorno imediato do Estado Novo.', 'Fim do Congresso Nacional.', 'Implantação do parlamentarismo permanente.'], 'A mudança ocorreu ainda pelo colégio eleitoral, antes do voto direto presidencial.'],
    ],
  },
  {
    topicSlug: 'industrializacao', skillSlug: 'relacionar-industrializacao-trabalho-e-territorio', reasoning: 'etapas industriais, localização e organização do trabalho', errors: ['separar tecnologia de relações de trabalho'], strategy: 'Observe energia, técnica, capital, mercado, logística e efeitos sobre o emprego.',
    items: [
      ['A Primeira Revolução Industrial apoiou-se principalmente em:', 'Máquina a vapor, carvão e indústria têxtil.', ['Internet e inteligência artificial.', 'Energia nuclear e robótica.', 'Petróleo e linha de montagem apenas.', 'Satélites e biotecnologia.'], 'Vapor e carvão mecanizaram especialmente a produção têxtil britânica.'],
      ['A Segunda Revolução Industrial associou-se à expansão de:', 'Eletricidade, petróleo, aço e produção em série.', ['Pedra lascada e caça.', 'Vapor apenas no artesanato doméstico.', 'Computação em nuvem.', 'Energia solar residencial apenas.'], 'Novas fontes, materiais e organização ampliaram escala produtiva.'],
      ['No toyotismo, estoques menores dependem de:', 'Produção ajustada à demanda e coordenação de fornecedores.', ['Acúmulo ilimitado de peças.', 'Uma única tarefa sem flexibilidade.', 'Ausência de controle de qualidade.', 'Fim da logística.'], 'O just in time sincroniza entrega e produção, reduzindo estoques.'],
      ['Incentivos fiscais podem atrair indústrias para uma região, mas devem ser avaliados porque:', 'O custo público pode superar empregos e encadeamentos gerados.', ['Toda indústria garante desenvolvimento igual.', 'Impostos nunca financiam serviços.', 'Localização não afeta economia.', 'Empresas permanecem para sempre.'], 'A análise compara renúncia, permanência, qualidade dos empregos e efeitos locais.'],
      ['Em linhas de produção atuais, a indústria 4.0 combina:', 'Sensores, dados, automação e sistemas conectados.', ['Somente trabalho manual isolado.', 'Ausência de comunicação entre máquinas.', 'Energia a vapor sem controle digital.', 'Fim de toda intervenção humana.'], 'Integração digital permite monitoramento e decisões em tempo real.'],
    ],
  },
  {
    topicSlug: 'cartografia', skillSlug: 'ler-e-interpretar-representacoes-cartograficas', reasoning: 'escala, coordenadas, projeções e mapas temáticos', errors: ['ignorar convenções e escolhas do mapa'], strategy: 'Leia metadados cartográficos antes de comparar formas, distâncias ou valores.',
    items: [
      ['Na escala 1:200 000, 5 cm no mapa equivalem a:', '10 km.', ['1 km.', '5 km.', '20 km.', '100 km.'], '5×200 000 cm = 1 000 000 cm = 10 km.'],
      ['Latitude mede distância angular em relação:', 'Ao Equador.', ['Ao meridiano de Greenwich.', 'Ao nível do mar.', 'Ao polo magnético.', 'À linha de data.'], 'Paralelos expressam posição norte ou sul do Equador.'],
      ['Longitude é usada na organização dos fusos porque se relaciona:', 'À rotação terrestre e à posição leste-oeste.', ['À altitude do relevo.', 'À vegetação local.', 'Ao volume dos rios.', 'À densidade populacional.'], 'A Terra gira no sentido longitudinal, produzindo diferenças de horário.'],
      ['Um mapa anamórfico altera o tamanho dos territórios para:', 'Representar a magnitude de uma variável.', ['Preservar todas as distâncias reais.', 'Eliminar dados quantitativos.', 'Mostrar somente relevo.', 'Manter áreas geográficas exatas.'], 'A área visual passa a variar conforme população, renda ou outro indicador.'],
      ['Uma legenda com intervalos sobrepostos, como 0–10 e 10–20, cria:', 'Ambiguidade para o valor exatamente igual a 10.', ['Maior precisão obrigatória.', 'Escala cartográfica maior.', 'Orientação para o norte.', 'Projeção equivalente.'], 'Classes precisam indicar claramente onde valores de fronteira entram.'],
    ],
  },
  {
    topicSlug: 'globalizacao', skillSlug: 'analisar-processos-e-efeitos-da-globalizacao', reasoning: 'redes, fluxos, poder e desigualdade global', errors: ['considerar globalização uniforme'], strategy: 'Identifique agentes, infraestrutura, escala e assimetrias de cada fluxo.',
    items: [
      ['A redução do custo de transporte em contêineres favoreceu:', 'Expansão do comércio e fragmentação das cadeias produtivas.', ['Fim dos portos.', 'Produção somente local.', 'Desaparecimento da logística.', 'Proibição de mercadorias padronizadas.'], 'Padronização acelerou transbordo e circulação internacional.'],
      ['Remessas enviadas por migrantes a seus países de origem são exemplo de:', 'Fluxo financeiro ligado à mobilidade humana.', ['Barreira física sem efeito econômico.', 'Fim das redes familiares.', 'Comércio apenas estatal.', 'Isolamento monetário.'], 'Pessoas mantêm vínculos econômicos transnacionais.'],
      ['Uma empresa distribui produção por países conforme custo e especialização. Isso expressa:', 'Nova divisão internacional do trabalho.', ['Autarquia econômica.', 'Fim das multinacionais.', 'Igualdade salarial global.', 'Ausência de estratégia territorial.'], 'Etapas são localizadas segundo vantagens e relações desiguais.'],
      ['O acesso desigual à internet limita benefícios da globalização porque:', 'Exclui pessoas de informação, serviços e oportunidades digitais.', ['Conectividade não afeta trabalho.', 'Toda rede é presencial.', 'A internet existe apenas em países ricos.', 'Serviços públicos nunca usam tecnologia.'], 'Infraestrutura e competências condicionam participação nas redes.'],
      ['Sanções econômicas mostram que interdependência global pode ser usada como:', 'Instrumento de pressão política entre Estados.', ['Prova de ausência de relações internacionais.', 'Fim dos sistemas financeiros.', 'Garantia de paz automática.', 'Ação sem efeitos sociais.'], 'Controle de mercados e finanças cria capacidade de coerção.'],
    ],
  },
  {
    topicSlug: 'etica', skillSlug: 'aplicar-teorias-eticas-a-situacoes-concretas', reasoning: 'princípios, consequências, virtudes e justiça em dilemas', errors: ['decidir só pelo interesse próprio'], strategy: 'Explicite a regra, os afetados, as consequências e o tipo de pessoa ou sociedade promovido.',
    items: [
      ['Divulgar dados privados para obter benefício público exige avaliar:', 'Proporcionalidade entre interesse coletivo, consentimento e dano individual.', ['Somente a curiosidade do público.', 'A popularidade de quem divulga.', 'A ausência de qualquer direito à privacidade.', 'O número de compartilhamentos.'], 'O objetivo público não elimina limites e impactos sobre pessoas.'],
      ['Uma regra é injusta se ninguém aceitaria ocupando a posição mais desfavorecida. Essa ideia aproxima-se de:', 'Justiça como imparcialidade.', ['Hedonismo individual.', 'Determinismo biológico.', 'Relativismo absoluto.', 'Autoritarismo tradicional.'], 'Imaginar posições desconhecidas reduz regras feitas para vantagem própria.'],
      ['Coragem, na ética das virtudes, não é ausência de medo, mas:', 'Disposição equilibrada para agir diante do risco adequado.', ['Busca de qualquer perigo.', 'Obediência cega.', 'Recusa de toda prudência.', 'Sentimento sem prática.'], 'A virtude orienta ação habitual entre covardia e temeridade.'],
      ['Uma promessa cumprida apenas por medo da punição possui:', 'Ação correta, mas motivação moral limitada.', ['Virtude perfeita necessariamente.', 'Ausência total de consequência.', 'Impossibilidade jurídica.', 'Prova de altruísmo.'], 'A avaliação ética pode distinguir conformidade externa e razão da escolha.'],
      ['Ao projetar uma política, ouvir diretamente o grupo afetado respeita:', 'Autonomia e participação dos sujeitos da decisão.', ['Paternalismo sem consulta.', 'Sigilo obrigatório.', 'Neutralidade por exclusão.', 'Supressão do conflito.'], 'Pessoas impactadas devem participar da definição de respostas.'],
    ],
  },
  {
    topicSlug: 'cultura-e-identidade', skillSlug: 'analisar-cultura-identidade-e-diversidade', reasoning: 'pertencimento, memória, representação e poder', errors: ['tratar identidade como natureza fixa'], strategy: 'Analise quem define significados, quais memórias circulam e como pertencimentos mudam.',
    items: [
      ['Uma língua minoritária ensinada às novas gerações fortalece:', 'Memória coletiva e continuidade cultural.', ['Homogeneização obrigatória.', 'Esquecimento das tradições.', 'Fim do bilinguismo.', 'Isolamento total da comunidade.'], 'A transmissão linguística carrega narrativas, valores e formas de pertencimento.'],
      ['Apropriação cultural torna-se problemática especialmente quando:', 'Elementos são explorados sem contexto enquanto o grupo de origem permanece discriminado.', ['Toda troca cultural é proibida.', 'Grupos dialogam em condições iguais.', 'A origem é reconhecida e remunerada.', 'Há consentimento e colaboração.'], 'O problema envolve assimetria, apagamento e benefício desigual.'],
      ['Um museu revisa legendas para incluir vozes das comunidades representadas. Isso busca:', 'Pluralizar a narrativa e questionar autoridade única.', ['Eliminar pesquisa histórica.', 'Ocultar conflitos.', 'Impedir acesso público.', 'Fixar uma verdade eterna.'], 'Participação redistribui poder sobre como objetos e histórias são interpretados.'],
      ['Identidade nacional é uma construção porque:', 'Seleciona símbolos e memórias em processos históricos e disputados.', ['Nasce pronta e nunca muda.', 'Depende apenas do clima.', 'É idêntica para toda pessoa.', 'Não possui relação com instituições.'], 'Narrativas de nação resultam de escolhas e exclusões ao longo do tempo.'],
      ['Uma pessoa pode pertencer simultaneamente a culturas locais e redes globais. Isso demonstra:', 'Identidades articuladas, não mutuamente exclusivas.', ['Impossibilidade de múltiplos vínculos.', 'Fim da cultura local.', 'Pureza cultural absoluta.', 'Ausência de influência histórica.'], 'Pertencimentos coexistem e são acionados conforme contextos.'],
    ],
  },
  {
    topicSlug: 'trabalho-e-sociedade', skillSlug: 'analisar-transformacoes-do-mundo-do-trabalho', reasoning: 'relações laborais, tecnologia, direitos e desigualdade', errors: ['individualizar problemas estruturais do trabalho'], strategy: 'Relacione contrato, controle, qualificação, proteção e distribuição do valor produzido.',
    items: [
      ['O trabalho remoto pode reduzir deslocamentos, mas também ampliar:', 'Dificuldade de separar tempo profissional e pessoal.', ['Garantia de jornada menor.', 'Fim da supervisão.', 'Igualdade de infraestrutura doméstica.', 'Desaparecimento de metas.'], 'A fronteira espacial e temporal fica menos nítida.'],
      ['A terceirização transfere uma atividade para outra empresa e pode gerar:', 'Fragmentação de vínculos e diferenças de proteção entre trabalhadores.', ['Propriedade coletiva automática.', 'Fim de contratos.', 'Salário igual em toda cadeia.', 'Ausência de responsabilidade.'], 'Trabalhadores no mesmo processo podem ficar sob empregadores e condições distintas.'],
      ['O desemprego estrutural relaciona-se a:', 'Mudanças duradouras na tecnologia e na organização produtiva.', ['Férias anuais.', 'Troca momentânea de turno.', 'Atraso de um trabalhador.', 'Variação diária do clima.'], 'Certas ocupações desaparecem ou mudam quando a estrutura econômica se transforma.'],
      ['Trabalho reprodutivo não remunerado inclui:', 'Cuidado doméstico que sustenta a vida e a força de trabalho.', ['Somente produção industrial exportada.', 'Apenas emprego formal público.', 'Investimento financeiro.', 'Mineração mecanizada.'], 'Cozinhar, limpar e cuidar produzem condições para a atividade econômica.'],
      ['Uma cooperativa de trabalhadores diferencia-se por:', 'Gestão e resultados compartilhados entre associados.', ['Submissão obrigatória a acionista externo.', 'Ausência de qualquer regra.', 'Proibição de decisões coletivas.', 'Trabalho sem finalidade econômica.'], 'A propriedade e a deliberação tendem a ser coletivas.'],
    ],
  },
];

export const HUMANAS_QUESTOES_LEVA_7 = buildQuestionBatch({ batch: 7, origin, support, sets });

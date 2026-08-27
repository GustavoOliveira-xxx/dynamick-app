import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_6_2026_08';
const support = 'Situação e fonte autorais criadas para a sexta atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'cidadania-e-direitos',
    skillSlug: 'relacionar-conceitos-a-situacoes-concretas',
    reasoning: 'aplicação dos princípios de cidadania, igualdade e participação',
    errors: ['tratar direitos como favores concedidos'],
    strategy: 'Identifique o direito, o dever estatal e as formas de participação presentes no caso.',
    items: [
      ['Uma prefeitura publica orçamento em formato acessível e abre consulta sobre prioridades. A iniciativa fortalece:', 'Transparência e participação cidadã no controle das políticas públicas.', ['Censura prévia das opiniões.', 'Substituição das eleições por sorteio.', 'Privatização automática dos serviços.', 'Sigilo das decisões administrativas.'], 'Acesso à informação e consulta permitem acompanhar e influenciar decisões de interesse coletivo.'],
      ['Garantir intérprete de Libras em um serviço público exemplifica:', 'Igualdade material, pois remove uma barreira para o exercício de direitos.', ['Privilégio sem relação com cidadania.', 'Tratamento idêntico que ignora diferenças.', 'Suspensão da liberdade de expressão.', 'Favor temporário sem dever público.'], 'Medidas específicas podem ser necessárias para que pessoas em condições diferentes tenham acesso equivalente.'],
      ['O direito à liberdade de expressão não protege:', 'Ameaças e condutas que violam direitos de outras pessoas.', ['Críticas fundamentadas a autoridades.', 'Debates sobre políticas públicas.', 'Produções artísticas.', 'Opiniões divergentes dentro da lei.'], 'Direitos coexistem e podem sofrer limites para proteger integridade, dignidade e outros bens jurídicos.'],
      ['Uma associação de bairro protocola proposta, acompanha a votação e cobra sua execução. Isso demonstra cidadania como:', 'Participação contínua, além do ato de votar.', ['Obediência passiva a qualquer decisão.', 'Ação restrita a servidores públicos.', 'Prática possível apenas em ano eleitoral.', 'Substituição do poder público pela associação.'], 'A cidadania inclui organização, proposição, fiscalização e cobrança de políticas.'],
      ['Quando o acesso a um direito depende de renda, território ou raça, analisar apenas a igualdade formal pode ser insuficiente porque:', 'Regras iguais podem manter barreiras concretas desiguais.', ['Toda diferença social desaparece na lei.', 'Direitos só existem para grupos majoritários.', 'A desigualdade não afeta oportunidades.', 'A igualdade exige proibir políticas públicas.'], 'A igualdade material observa condições reais e busca remover obstáculos históricos e sociais.'],
    ],
  },
  {
    topicSlug: 'urbanizacao-e-desigualdade',
    skillSlug: 'interpretar-fenomenos-espaciais-sociais-economicos',
    reasoning: 'análise da produção desigual do espaço urbano',
    errors: ['explicar desigualdade urbana como escolha individual isolada'],
    strategy: 'Relacione moradia, emprego, infraestrutura, preço da terra e mobilidade.',
    items: [
      ['Empregos se concentram no centro, enquanto moradias populares se afastam para a periferia. Um efeito provável é:', 'Aumento do tempo e do custo dos deslocamentos cotidianos.', ['Desaparecimento da segregação espacial.', 'Redução automática do preço dos transportes.', 'Distribuição igual de infraestrutura.', 'Fim da expansão urbana.'], 'Distância entre casa e trabalho sobrecarrega especialmente quem depende de transporte coletivo.'],
      ['A valorização rápida de um bairro, seguida da saída de moradores que não conseguem pagar os novos custos, caracteriza:', 'Gentrificação.', ['Êxodo rural.', 'Conurbação.', 'Verticalização sem deslocamento.', 'Transumância.'], 'Gentrificação combina reinvestimento, encarecimento e substituição social dos residentes.'],
      ['O crescimento de assentamentos em encostas e margens de rios está ligado, entre outros fatores, a:', 'Déficit habitacional e exclusão do mercado formal de terras.', ['Excesso universal de moradias centrais.', 'Ausência de riscos ambientais nessas áreas.', 'Preferência natural por locais vulneráveis.', 'Proibição de qualquer expansão periférica.'], 'Sem acesso a moradia segura e bem localizada, parte da população ocupa áreas mais baratas e expostas.'],
      ['Uma política de corredores de ônibus integrados a ciclovias e calçadas pode reduzir desigualdades ao:', 'Ampliar acesso a oportunidades para quem não utiliza automóvel.', ['Reservar as vias somente a moradores centrais.', 'Aumentar distâncias entre bairros.', 'Eliminar todos os empregos locais.', 'Substituir o planejamento por decisões individuais.'], 'Mobilidade acessível conecta pessoas a trabalho, saúde, educação e lazer.'],
      ['Dois bairros têm a mesma população, mas apenas um possui saneamento, parque e posto de saúde. O caso evidencia:', 'Distribuição territorial desigual de serviços e qualidade urbana.', ['Igualdade de condições pelo tamanho populacional.', 'Problema exclusivamente climático.', 'Ausência de responsabilidade pública.', 'Homogeneidade completa do espaço urbano.'], 'População semelhante não garante o mesmo acesso à infraestrutura e aos equipamentos coletivos.'],
    ],
  },
  {
    topicSlug: 'meio-ambiente-e-sociedade',
    skillSlug: 'analisar-impactos-conflitos-e-uso-do-territorio',
    reasoning: 'análise integrada de impactos ambientais, atores e território',
    errors: ['separar impacto ambiental de relações sociais'],
    strategy: 'Identifique quem usa o recurso, quem recebe benefícios, quem suporta impactos e em qual escala.',
    items: [
      ['Uma barragem gera energia, mas alaga comunidades e altera o rio. Uma avaliação adequada deve:', 'Comparar benefícios, impactos e distribuição de custos entre os grupos afetados.', ['Considerar apenas a eletricidade gerada.', 'Ignorar efeitos de longo prazo.', 'Tratar o deslocamento como fenômeno natural.', 'Excluir as comunidades do processo decisório.'], 'Decisões territoriais exigem avaliação multidimensional e participação dos atingidos.'],
      ['A retirada de vegetação nas margens de um rio tende a:', 'Aumentar erosão, assoreamento e instabilidade das margens.', ['Impedir totalmente a entrada de sedimentos.', 'Elevar a proteção do solo pelas raízes.', 'Transformar água doce em salgada.', 'Eliminar qualquer risco de enchente.'], 'A mata ciliar reduz escoamento superficial e retém sedimentos.'],
      ['Uma empresa transfere atividade poluente para região com fiscalização frágil. Esse processo pode ser analisado como:', 'Distribuição desigual de riscos ambientais.', ['Neutralidade territorial da produção.', 'Desaparecimento da poluição.', 'Recuperação automática do ecossistema.', 'Igualdade ambiental garantida pelo mercado.'], 'Grupos e territórios com menor poder político frequentemente concentram danos.'],
      ['A agroecologia diferencia-se de um modelo de monocultura intensiva porque tende a:', 'Diversificar cultivos e integrar processos ecológicos à produção.', ['Eliminar todo conhecimento local.', 'Depender de uma única espécie em grandes áreas.', 'Impedir qualquer comercialização.', 'Substituir o solo por superfícies artificiais.'], 'Diversidade e manejo ecológico podem reduzir vulnerabilidades e uso de insumos externos.'],
      ['Em uma cidade sujeita a ondas de calor, ampliar arborização prioritariamente em bairros vulneráveis combina:', 'Adaptação climática e justiça socioambiental.', ['Apenas decoração urbana.', 'Mitigação sem efeito local.', 'Aumento planejado de ilhas de calor.', 'Retirada de sombra das vias.'], 'Árvores reduzem calor local e priorizar áreas expostas enfrenta desigualdades na proteção.'],
    ],
  },
  {
    topicSlug: 'brasil-republica',
    skillSlug: 'analisar-processos-da-republica-brasileira',
    reasoning: 'interpretação de continuidades, rupturas e disputas políticas republicanas',
    errors: ['tratar períodos históricos como blocos homogêneos'],
    strategy: 'Localize atores, instituições, conflitos e permanências em cada processo.',
    items: [
      ['Na Primeira República, o coronelismo articulava poder local e sistema político por meio de:', 'Controle de recursos e votos em redes de dependência.', ['Sufrágio secreto plenamente fiscalizado.', 'Participação igualitária de toda a população.', 'Fim das oligarquias estaduais.', 'Autonomia completa dos trabalhadores rurais.'], 'Chefes locais mediavam favores, coerção e apoio eleitoral em troca de influência.'],
      ['A legislação trabalhista da Era Vargas pode ser interpretada como:', 'Ampliação de direitos combinada ao controle estatal sobre a organização sindical.', ['Eliminação de qualquer direito urbano.', 'Liberdade sindical sem interferência estatal.', 'Política limitada ao setor agrícola colonial.', 'Fim imediato das desigualdades do trabalho.'], 'O período institucionalizou garantias, mas integrou sindicatos à estrutura corporativa estatal.'],
      ['Durante a ditadura militar, atos institucionais e censura demonstram:', 'Concentração de poder e restrição de liberdades políticas.', ['Fortalecimento irrestrito do pluralismo.', 'Ausência de perseguição a opositores.', 'Submissão total do Executivo ao Legislativo.', 'Expansão da imprensa sem controle.'], 'Mecanismos de exceção reduziram direitos e canais democráticos de oposição.'],
      ['O movimento das Diretas Já foi importante porque:', 'Mobilizou amplos setores pela retomada do voto direto para presidente.', ['Defendeu a manutenção indefinida do regime militar.', 'Propôs o fim de todas as eleições municipais.', 'Restaurou a monarquia parlamentar.', 'Impediu a nova Constituição.'], 'A campanha transformou a demanda eleitoral em mobilização nacional durante a redemocratização.'],
      ['A Constituição de 1988 é chamada de “Constituição Cidadã” por:', 'Ampliar direitos e mecanismos democráticos após o regime autoritário.', ['Retirar direitos sociais da ordem constitucional.', 'Proibir participação popular.', 'Restabelecer censura permanente.', 'Concentrar todos os poderes no Executivo.'], 'O texto marcou a redemocratização com garantias civis, políticas e sociais abrangentes.'],
    ],
  },
  {
    topicSlug: 'industrializacao',
    skillSlug: 'relacionar-industrializacao-trabalho-e-territorio',
    reasoning: 'relação entre industrialização, organização produtiva, trabalho e espaço',
    errors: ['reduzir industrialização à instalação de fábricas'],
    strategy: 'Conecte tecnologia, energia, mão de obra, infraestrutura, mercado e localização.',
    items: [
      ['A industrialização por substituição de importações buscou:', 'Produzir internamente bens antes comprados do exterior.', ['Eliminar toda atividade industrial nacional.', 'Especializar o país apenas em importações.', 'Proibir infraestrutura urbana.', 'Reduzir o mercado consumidor interno.'], 'Restrições externas e políticas estatais estimularam produção doméstica de manufaturados.'],
      ['A concentração histórica de indústrias no Sudeste brasileiro relaciona-se a:', 'Capital acumulado, mercado consumidor, infraestrutura e mão de obra disponíveis.', ['Ausência de cidades e ferrovias na região.', 'Distância de qualquer porto.', 'Proibição industrial nas grandes metrópoles.', 'Distribuição uniforme de investimentos no território.'], 'Múltiplos fatores econômicos e logísticos favoreceram a aglomeração industrial.'],
      ['A desconcentração industrial para cidades médias pode ser impulsionada por:', 'Custos metropolitanos elevados e novas redes de transporte e comunicação.', ['Impossibilidade de produzir fora das capitais.', 'Fim das rodovias nacionais.', 'Ausência de incentivos locais.', 'Retorno obrigatório ao artesanato.'], 'Empresas buscam custos menores mantendo conexão logística com mercados.'],
      ['No modelo fordista, a produção caracteriza-se principalmente por:', 'Padronização, linha de montagem e fabricação em massa.', ['Peças únicas feitas sem divisão de tarefas.', 'Produção sob demanda totalmente flexível.', 'Ausência de controle do tempo de trabalho.', 'Trabalho apenas remoto e digital.'], 'A linha de montagem organizou tarefas repetitivas para grande volume padronizado.'],
      ['Automação industrial pode elevar produtividade, mas também:', 'Transformar ocupações e exigir políticas de qualificação e proteção social.', ['Garantir emprego idêntico para todos.', 'Eliminar qualquer necessidade de formação.', 'Impedir inovação tecnológica futura.', 'Tornar a localização industrial irrelevante.'], 'Mudança técnica redistribui tarefas e pode gerar transições laborais desiguais.'],
    ],
  },
  {
    topicSlug: 'cartografia',
    skillSlug: 'ler-e-interpretar-representacoes-cartograficas',
    reasoning: 'leitura crítica de escala, orientação, projeção e representação temática',
    errors: ['tratar o mapa como reprodução neutra do território'],
    strategy: 'Leia título, legenda, escala, orientação, fonte e método de representação.',
    items: [
      ['Em um mapa na escala 1:100 000, 3 cm representam no terreno:', '3 km.', ['300 m.', '30 km.', '100 km.', '300 km.'], 'Cada centímetro representa 100 000 cm, ou 1 km; três centímetros representam 3 km.'],
      ['Curvas de nível muito próximas indicam:', 'Declive acentuado.', ['Terreno perfeitamente plano.', 'Baixa altitude obrigatória.', 'Ausência de relevo.', 'Distância maior entre altitudes.'], 'Pequena distância horizontal para grande variação de altitude caracteriza maior inclinação.'],
      ['Uma projeção cartográfica que preserva ângulos pode distorcer:', 'Áreas, especialmente em altas latitudes.', ['A existência dos continentes.', 'Todas as direções locais.', 'A localização do Equador.', 'A presença dos oceanos.'], 'Toda projeção plana implica distorções; preservar forma local não preserva necessariamente área.'],
      ['Num mapa coroplético, usar números absolutos de casos por município pode enganar porque:', 'Municípios populosos tendem a ter mais casos mesmo com taxa menor.', ['Cores nunca podem representar dados.', 'Todo município tem a mesma população.', 'Mapas não aceitam valores numéricos.', 'Números absolutos são sempre falsos.'], 'Taxas por população são mais adequadas quando se quer comparar risco entre unidades.'],
      ['Se o norte está no topo e um ponto B fica à direita de A, B está a:', 'Leste de A.', ['Oeste de A.', 'Sul de A.', 'Noroeste de A.', 'Sudoeste de A.'], 'Na orientação convencional, a direita corresponde ao leste.'],
    ],
  },
  {
    topicSlug: 'globalizacao',
    skillSlug: 'analisar-processos-e-efeitos-da-globalizacao',
    reasoning: 'análise de fluxos globais, redes produtivas e assimetrias',
    errors: ['supor que integração global distribui ganhos igualmente'],
    strategy: 'Observe fluxos, escalas, agentes, dependências e quem captura valor em cada rede.',
    items: [
      ['Um celular é projetado em um país, recebe peças de vários outros e é montado em outro continente. Isso exemplifica:', 'Fragmentação internacional das cadeias produtivas.', ['Autossuficiência produtiva local.', 'Fim do comércio internacional.', 'Desconexão entre territórios.', 'Produção exclusivamente artesanal.'], 'Etapas distribuídas aproveitam redes logísticas, tecnologia e diferenças de custo.'],
      ['Uma interrupção em um porto distante paralisa fábricas em vários países. O caso revela:', 'Interdependência e vulnerabilidade das cadeias globais.', ['Independência completa das economias.', 'Desaparecimento dos transportes marítimos.', 'Ausência de estoques nas empresas locais.', 'Fim da divisão internacional do trabalho.'], 'Redes integradas transmitem rapidamente choques entre seus diferentes nós.'],
      ['Plataformas digitais alcançam usuários globais, mas concentram dados e receita em poucas empresas. Isso mostra que:', 'Conectividade pode coexistir com concentração econômica.', ['Toda rede digital distribui poder igualmente.', 'Dados não possuem valor econômico.', 'Empresas globais não atuam localmente.', 'A internet eliminou monopólios.'], 'Ampliação dos fluxos não impede assimetrias na propriedade da infraestrutura e dos dados.'],
      ['A circulação mundial de músicas que se misturam a ritmos locais exemplifica:', 'Hibridização cultural, não simples apagamento das culturas locais.', ['Isolamento cultural absoluto.', 'Uniformização sem qualquer adaptação.', 'Fim da criatividade regional.', 'Proibição de intercâmbios culturais.'], 'Referências globais são reinterpretadas e combinadas em contextos locais.'],
      ['Para reduzir dependência de um único fornecedor internacional, uma empresa diversifica países de origem. A decisão busca:', 'Aumentar resiliência diante de choques geopolíticos ou logísticos.', ['Eliminar todos os custos de produção.', 'Impedir qualquer comércio futuro.', 'Concentrar ainda mais a cadeia.', 'Substituir fornecedores por consumidores.'], 'Diversificação reduz a exposição a uma interrupção localizada.'],
    ],
  },
  {
    topicSlug: 'etica',
    skillSlug: 'aplicar-teorias-eticas-a-situacoes-concretas',
    reasoning: 'avaliação de dilemas por consequências, deveres, virtudes e justiça',
    errors: ['confundir legalidade com justificativa ética completa'],
    strategy: 'Explicite princípios, consequências, pessoas afetadas e possibilidade de generalização.',
    items: [
      ['Uma decisão maximiza o bem-estar total, ainda que distribua custos de modo desigual. O critério usado aproxima-se do:', 'Consequencialismo utilitarista.', ['Dever absoluto sem olhar resultados.', 'Ceticismo sobre qualquer escolha.', 'Egoísmo baseado apenas no agente.', 'Relativismo linguístico.'], 'O foco no saldo agregado de benefícios e danos é característico do utilitarismo.'],
      ['Recusar uma mentira mesmo quando ela traria vantagem imediata expressa uma ética centrada em:', 'Deveres e princípios que devem valer de modo geral.', ['Resultados financeiros somente.', 'Preferências momentâneas.', 'Ausência de responsabilidade.', 'Maioria estatística.'], 'A ação é julgada pela regra que a orienta, não apenas por sua consequência particular.'],
      ['Devolver um valor recebido por engano, mesmo sem risco de descoberta, revela principalmente:', 'Integridade como disposição estável do caráter.', ['Obediência produzida por punição.', 'Cálculo de popularidade.', 'Indiferença ao outro.', 'Incapacidade de escolher.'], 'A ética das virtudes enfatiza hábitos e qualidades que orientam a ação.'],
      ['Um algoritmo beneficia a maioria, mas discrimina sistematicamente um grupo. Uma crítica ética adequada é:', 'O ganho agregado não elimina o dever de enfrentar injustiças e proteger direitos.', ['Toda eficiência torna a discriminação aceitável.', 'Algoritmos não podem produzir efeitos sociais.', 'A maioria sempre define o justo.', 'Direitos dependem apenas do lucro.'], 'Justiça exige observar distribuição de riscos, dignidade e tratamento dos grupos afetados.'],
      ['Uma empresa divulga apenas dados favoráveis de um produto legalizado. Por que a conduta ainda pode ser eticamente problemática?', 'Porque legalidade mínima não substitui transparência e responsabilidade com o consumidor.', ['Porque todo produto legal é proibido.', 'Porque informação verdadeira nunca deve ser divulgada.', 'Porque consumidores não tomam decisões.', 'Porque ética e comunicação não se relacionam.'], 'Omitir riscos relevantes pode manipular escolhas mesmo sem violar uma regra explícita.'],
    ],
  },
  {
    topicSlug: 'cultura-e-identidade',
    skillSlug: 'analisar-cultura-identidade-e-diversidade',
    reasoning: 'análise de identidades como construções sociais plurais e históricas',
    errors: ['tratar cultura e identidade como essências imutáveis'],
    strategy: 'Considere pertencimentos, relações de poder, memória e transformações históricas.',
    items: [
      ['Uma mesma pessoa se identifica por geração, território, profissão e religião. Isso indica que identidades são:', 'Múltiplas e articuladas conforme contextos e experiências.', ['Determinadas por um único traço biológico.', 'Sempre contraditórias e falsas.', 'Imutáveis desde o nascimento.', 'Independentes de relações sociais.'], 'Os pertencimentos se combinam e ganham relevância diferente em cada situação.'],
      ['Uma festa tradicional incorpora instrumentos eletrônicos sem deixar de ser reconhecida pela comunidade. O caso mostra que cultura:', 'Pode se transformar preservando vínculos de memória e pertencimento.', ['Só é autêntica quando não muda.', 'Desaparece ao entrar em contato com tecnologia.', 'Existe sem participação coletiva.', 'É definida unicamente pelo Estado.'], 'Continuidade cultural não exige repetição idêntica; grupos reelaboram suas práticas.'],
      ['Quando um grupo dominante apresenta seus costumes como os únicos “normais”, ocorre:', 'Etnocentrismo.', ['Relativização crítica.', 'Diversidade linguística neutra.', 'Mobilidade social.', 'Secularização.'], 'O etnocentrismo usa os próprios padrões como medida universal para julgar outros grupos.'],
      ['Reconhecer patrimônio imaterial significa proteger:', 'Saberes, celebrações, modos de fazer e referências transmitidas por comunidades.', ['Somente edifícios de pedra.', 'Apenas objetos vendidos em museus.', 'Práticas sem participantes vivos.', 'Uma lista fixa sem transformação.'], 'O patrimônio imaterial vive na prática e na transmissão social, não apenas em objetos.'],
      ['Representações estereotipadas são problemáticas porque:', 'Reduzem grupos diversos a características fixas e podem legitimar desigualdades.', ['Descrevem toda pessoa com precisão.', 'Eliminam relações de poder.', 'Garantem voz direta aos representados.', 'São sempre elogios sem consequências.'], 'A simplificação apaga diferenças internas e influencia expectativas e tratamentos sociais.'],
    ],
  },
  {
    topicSlug: 'trabalho-e-sociedade',
    skillSlug: 'analisar-transformacoes-do-mundo-do-trabalho',
    reasoning: 'análise das mudanças tecnológicas, contratuais e sociais do trabalho',
    errors: ['atribuir mudanças estruturais apenas ao esforço individual'],
    strategy: 'Relacione tecnologia, direitos, qualificação, organização produtiva e poder de negociação.',
    items: [
      ['Trabalhadores de aplicativo definem parte do horário, mas recebem preço e avaliação da plataforma. O caso combina:', 'Flexibilidade operacional com controle algorítmico do trabalho.', ['Autonomia completa sem regras externas.', 'Emprego público estável.', 'Fim de qualquer forma de supervisão.', 'Produção doméstica sem mercado.'], 'A liberdade de conexão convive com decisões automatizadas sobre acesso, remuneração e reputação.'],
      ['A informalidade pode ampliar renda imediata para alguns, mas costuma envolver:', 'Menor acesso a proteção social e maior insegurança de rendimento.', ['Garantia universal de férias remuneradas.', 'Estabilidade contratual obrigatória.', 'Fim dos riscos ocupacionais.', 'Aposentadoria automática integral.'], 'Sem vínculos e contribuições regulares, direitos e previsibilidade tendem a ser menores.'],
      ['A divisão detalhada de tarefas numa linha de produção pode elevar produtividade e também:', 'Reduzir autonomia e tornar o trabalho repetitivo.', ['Eliminar a especialização das funções.', 'Transformar todos em proprietários da fábrica.', 'Impedir qualquer padronização.', 'Acabar com a gestão do tempo.'], 'Fragmentação e controle do ritmo podem separar concepção e execução.'],
      ['Diante da automação de tarefas rotineiras, uma política pública relevante é:', 'Oferecer formação continuada e apoiar transições profissionais.', ['Proibir toda inovação indefinidamente.', 'Responsabilizar apenas cada trabalhador.', 'Eliminar a educação básica.', 'Ignorar setores mais afetados.'], 'Mudanças estruturais exigem oportunidades reais de requalificação e proteção durante a transição.'],
      ['A negociação coletiva pode reduzir assimetrias porque:', 'Trabalhadores organizados ampliam poder de barganha diante do empregador.', ['Cada indivíduo passa a definir sozinho as leis.', 'Empresas deixam de ter qualquer interesse.', 'Conflitos desaparecem automaticamente.', 'Salários deixam de depender da economia.'], 'A representação conjunta equilibra parcialmente recursos e informação desiguais na relação laboral.'],
    ],
  },
];

export const HUMANAS_QUESTOES_LEVA_6 = buildQuestionBatch({
  batch: 6,
  origin,
  support,
  sets,
});

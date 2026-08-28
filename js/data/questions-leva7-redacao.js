import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_7_2026_08';
const support = 'Trecho e situação autorais criados para a sétima atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'tese-e-argumentacao', skillSlug: 'formular-tese-e-sustentar-com-argumentos', reasoning: 'recorte temático, tese, causalidade e sustentação argumentativa', errors: ['apresentar fato geral sem posicionamento'], strategy: 'Formule uma posição delimitada e teste se cada argumento explica uma causa, consequência ou solução ligada a ela.',
    items: [
      ['Para o tema “solidão entre idosos”, qual alternativa apresenta uma tese defensável?', 'O isolamento de idosos é agravado pela fragilidade das redes comunitárias e pela exclusão digital.', ['Muitas pessoas envelhecem todos os anos.', 'A solidão é uma palavra conhecida.', 'Este texto tratará de pessoas idosas.', 'Idosos vivem em diferentes cidades.'], 'A frase delimita o problema e anuncia dois fatores que podem ser desenvolvidos.'],
      ['Um texto defende que bibliotecas públicas reduzem desigualdades. Qual argumento sustenta melhor essa tese?', 'O acesso gratuito a livros, internet e mediação cultural amplia oportunidades de formação.', ['Algumas bibliotecas possuem fachadas antigas.', 'Livros variam de tamanho e cor.', 'Muitas cidades têm nomes diferentes.', 'Toda pessoa prefere ler sozinha.'], 'O argumento mostra como o equipamento público amplia recursos formativos.'],
      ['Após afirmar que jornadas extensas prejudicam o estudo, o autor cita falta de tempo. Para aprofundar o argumento, deve:', 'Explicar como o cansaço e a redução do tempo disponível afetam aprendizagem e permanência.', ['Repetir a tese com as mesmas palavras.', 'Mudar para um assunto sem relação.', 'Inserir um dado sem fonte nem comentário.', 'Concluir que todo trabalho deve ser proibido.'], 'A explicação conecta a condição de trabalho ao efeito educacional defendido.'],
      ['Uma tese atribui o descarte irregular apenas à “falta de consciência”, embora o texto mostre ausência de coleta. O ajuste mais coerente é:', 'Reconhecer a combinação entre educação ambiental e deficiência de infraestrutura pública.', ['Apagar toda referência à coleta.', 'Culpar exclusivamente os moradores.', 'Negar que exista descarte irregular.', 'Trocar a tese por uma pergunta retórica.'], 'A nova tese incorpora os fatores individuais e estruturais demonstrados.'],
      ['Ao contestar que “tecnologia sempre melhora a educação”, qual resposta é mais sólida?', 'Resultados dependem de acesso, formação docente e uso pedagógico, não apenas da presença do equipamento.', ['Todo aparelho tecnológico é prejudicial.', 'A educação existia antes dos computadores.', 'Basta discordar sem apresentar critério.', 'Equipamentos têm preços variados.'], 'O contra-argumento qualifica a afirmação absoluta e apresenta condições verificáveis.'],
    ],
  },
  {
    topicSlug: 'repertorio-sociocultural', skillSlug: 'selecionar-e-articular-repertorio-sociocultural', reasoning: 'pertinência, contextualização e autoria no uso de referências', errors: ['usar repertório como decoração desconectada'], strategy: 'Escolha uma ideia da referência e explicite o elo lógico entre ela, o problema e sua tese.',
    items: [
      ['Em uma redação sobre invisibilidade social, uma referência ao conceito de cidadania é produtiva quando:', 'Ajuda a explicar por que direitos formais não garantem acesso efetivo a serviços e reconhecimento.', ['Aparece apenas como palavra sofisticada.', 'Substitui todos os exemplos concretos.', 'É citada sem definir qualquer relação.', 'Serve para iniciar qualquer redação.'], 'A referência funciona como lente para interpretar a distância entre direito e experiência.'],
      ['Ao usar um filme como repertório, o autor deve priorizar:', 'A cena ou conflito específico que esclarece o argumento, com conexão explícita ao tema.', ['O nome de todo o elenco.', 'Um resumo completo do enredo.', 'A bilheteria, mesmo sem relação.', 'A opinião de que o filme é bom.'], 'O recorte pertinente evita que a obra seja apenas ornamentação.'],
      ['Um dado de pesquisa fortalece o parágrafo quando vem acompanhado de:', 'Fonte, contexto e explicação de como sustenta a afirmação central.', ['Adjetivos exagerados no lugar de análise.', 'Alteração do valor para causar impacto.', 'Uma conclusão sem ligação com o dado.', 'Omissão do período pesquisado.'], 'Rastreabilidade e interpretação transformam o número em evidência argumentativa.'],
      ['Qual uso de uma lei demonstra repertório produtivo?', 'Apresentar o direito previsto e contrastá-lo com uma barreira concreta discutida no texto.', ['Copiar vários artigos sem comentá-los.', 'Citar o número da lei de memória, ainda que incorreto.', 'Usar a lei para encerrar qualquer tema.', 'Afirmar que a existência da norma resolve o problema.'], 'O contraste entre norma e realidade sustenta uma análise específica.'],
      ['Se o autor não recorda com segurança o nome de uma obra, a escolha mais responsável é:', 'Usar outra referência conhecida com precisão ou desenvolver evidência sem inventar dados.', ['Inventar autor e data plausíveis.', 'Atribuir a obra a uma instituição qualquer.', 'Criar uma citação entre aspas.', 'Escrever que a fonte é secreta.'], 'Confiabilidade vale mais que aparência de erudição e preserva a argumentação.'],
    ],
  },
  {
    topicSlug: 'coesao-e-progressao', skillSlug: 'construir-coesao-e-progressao-no-texto', reasoning: 'relações lógicas, referenciação e desenvolvimento entre períodos', errors: ['acumular conectivos sem função lógica'], strategy: 'Nomeie a relação entre as ideias e verifique se cada frase acrescenta informação ao núcleo do parágrafo.',
    items: [
      ['“O município ampliou as linhas de ônibus. ___, bairros periféricos seguem com poucas opções noturnas.” O conector adequado é:', 'Ainda assim.', ['Por isso.', 'Do mesmo modo.', 'Em síntese.', 'Por exemplo.'], 'A segunda oração limita o alcance do avanço apresentado e exige contraste.'],
      ['No trecho “A plataforma notificou a escola depois que ela recebeu a denúncia”, a ambiguidade decorre de:', 'O pronome “ela” poder retomar plataforma ou escola.', ['Ausência de qualquer verbo.', 'Uso obrigatório de voz passiva.', 'Excesso de pontuação final.', 'Falta de uma conjunção conclusiva.'], 'Há dois antecedentes femininos possíveis para o mesmo pronome.'],
      ['Um parágrafo começa com a causa do problema, apresenta um exemplo e termina explicando o impacto. Essa organização:', 'Promove progressão porque cada etapa desenvolve a anterior.', ['É incoerente por usar exemplo.', 'Repete exatamente a mesma informação.', 'Dispensa relação com a tese.', 'Impede qualquer conclusão.'], 'Causa, concretização e consequência formam uma cadeia temática reconhecível.'],
      ['Em “O projeto oferece formação; consequentemente, amplia a autonomia dos participantes”, o termo destacado expressa:', 'Consequência.', ['Contraste.', 'Condição.', 'Exemplificação.', 'Retificação.'], 'A autonomia é apresentada como resultado da formação oferecida.'],
      ['Para ligar dois parágrafos sem produzir repetição mecânica, é adequado:', 'Retomar a conclusão anterior e introduzir o novo aspecto que será analisado.', ['Copiar a última frase integralmente.', 'Começar um tema totalmente diferente.', 'Usar qualquer conectivo, independentemente do sentido.', 'Eliminar o tópico frasal.'], 'A transição combina continuidade referencial e avanço da discussão.'],
    ],
  },
  {
    topicSlug: 'proposta-de-intervencao', skillSlug: 'elaborar-proposta-de-intervencao-detalhada', reasoning: 'agente, ação, meio, finalidade, monitoramento e direitos humanos', errors: ['apresentar solução genérica que não enfrenta a causa analisada'], strategy: 'Vincule cada ação ao diagnóstico e detalhe responsável, meio, execução e resultado esperado.',
    items: [
      ['Para enfrentar golpes digitais contra idosos, qual proposta está mais detalhada?', 'Centros de assistência devem oferecer oficinas mensais com simulações de mensagens fraudulentas e canais de denúncia, para ampliar a segurança digital.', ['Os golpes precisam acabar imediatamente.', 'A internet deve melhorar para todos.', 'As famílias devem ter mais cuidado.', 'É necessário criar alguma campanha.'], 'A alternativa explicita agente, ação, periodicidade, meio, conteúdo e finalidade.'],
      ['Se a causa discutida é a baixa frequência de ônibus à noite, a intervenção mais coerente envolve:', 'A gestão municipal revisar horários com dados de demanda e ampliar linhas nos trajetos críticos.', ['Escolas distribuírem livros didáticos.', 'Moradores comprarem automóveis individualmente.', 'Hospitais criarem campanhas alimentares.', 'Empresas reduzirem o uso de papel.'], 'A ação corresponde à causa de mobilidade e indica responsável e método.'],
      ['Uma proposta se torna passível de acompanhamento quando inclui:', 'Metas, prazo e indicadores públicos de execução e resultado.', ['A promessa de resolver tudo rapidamente.', 'Um adjetivo positivo para a ação.', 'A expressão “de alguma forma”.', 'Um agente chamado apenas de “alguém”.'], 'Critérios observáveis permitem verificar se a ação ocorreu e o que produziu.'],
      ['“As plataformas devem agir” pode ser detalhado por meio de:', 'Protocolos transparentes de denúncia, prazo de resposta e relatório periódico de moderação.', ['Uma frase afirmando que agir é importante.', 'A remoção de qualquer conteúdo sem regra.', 'A ausência de canal para usuários.', 'Uma campanha sem público definido.'], 'Meios, prazos e transparência tornam a responsabilidade operacional.'],
      ['Ao propor segurança em escolas, qual medida preserva direitos humanos?', 'Mediação de conflitos, apoio psicossocial e protocolos de proteção sem discriminação.', ['Revista vexatória de um grupo específico.', 'Exposição pública de estudantes acusados.', 'Punição coletiva sem apuração.', 'Expulsão automática por boatos.'], 'A proteção pode ser efetiva sem humilhação, preconceito ou suspensão arbitrária de direitos.'],
    ],
  },
];

export const REDACAO_QUESTOES_LEVA_7 = buildQuestionBatch({
  batch: 7,
  origin,
  support,
  sets,
});

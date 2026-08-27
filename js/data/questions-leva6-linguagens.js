import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_6_2026_08';
const support = 'Texto e situação autorais criados para a sexta atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'interpretacao-e-inferencia',
    skillSlug: 'identificar-informacao-explicita-e-implicita',
    reasoning: 'inferência sustentada por pistas verbais e contextuais',
    errors: ['inventar informação que o texto não oferece'],
    strategy: 'Separe o que foi dito do que pode ser concluído e localize a pista que sustenta a conclusão.',
    items: [
      ['Ao entrar em casa, Lia encontrou o guarda-chuva aberto no corredor e pequenas marcas de lama até a cozinha. O texto permite inferir que:', 'Alguém chegou da rua em um momento de chuva.', ['Lia deixou a torneira aberta.', 'A casa ficou vazia o dia inteiro.', 'O corredor estava em reforma.', 'O guarda-chuva foi comprado naquele dia.'], 'O guarda-chuva aberto, a lama e o trajeto para dentro da casa sustentam a inferência de chegada sob chuva.'],
      ['Uma notícia afirma: “Segundo a secretaria, o atendimento já foi normalizado”. A expressão inicial mostra que:', 'A informação é atribuída à secretaria, não confirmada diretamente pelo jornal.', ['O jornal considera a secretaria culpada.', 'O atendimento nunca foi interrompido.', 'A notícia é uma propaganda institucional.', 'A frase expressa a opinião dos pacientes.'], '“Segundo a secretaria” marca a fonte responsável pela afirmação e preserva o distanciamento do veículo.'],
      ['No bilhete “A porta continua destrancada”, a palavra “continua” pressupõe que:', 'A porta já estava destrancada antes.', ['A porta acabou de ser instalada.', 'Ninguém conhece a porta.', 'A porta será trancada amanhã.', 'Todas as portas estão abertas.'], 'O verbo aspectual indica permanência de um estado anterior.'],
      ['“Pedro guardou o celular assim que a professora se aproximou.” A ação sugere, com maior apoio textual, que Pedro:', 'Não queria que a professora visse o uso do celular.', ['Terminou uma ligação autorizada.', 'Recebeu uma nota alta.', 'Pretendia presentear a professora.', 'Estava com a bateria descarregada.'], 'A coincidência temporal entre aproximação e ocultação do aparelho indica intenção de evitar ser visto.'],
      ['Um anúncio diz “Agora com 30% a mais”, sem indicar a versão de comparação. Qual limite de interpretação existe?', 'Não é possível verificar o aumento sem saber qual é a base comparada.', ['Todo aumento de 30% dobra a quantidade.', 'O produto necessariamente ficou mais barato.', 'A frase prova que o produto é saudável.', 'A porcentagem só pode se referir ao preço.'], 'Uma comparação percentual exige um valor ou versão de referência para ser verificável.'],
    ],
  },
  {
    topicSlug: 'generos-textuais-e-funcao-social',
    skillSlug: 'relacionar-formato-contexto-publico-finalidade',
    reasoning: 'relação entre composição do gênero, circulação e finalidade',
    errors: ['classificar o gênero apenas pelo assunto'],
    strategy: 'Observe quem produz, para quem circula, em qual suporte e com qual ação esperada.',
    items: [
      ['Um texto apresenta título objetivo, data, local, descrição de um fato recente e falas de testemunhas. Sua função social mais provável é:', 'Noticiar um acontecimento de interesse público.', ['Ensinar uma receita passo a passo.', 'Registrar sentimentos íntimos do autor.', 'Vender um produto por comparação.', 'Criar uma regra jurídica.'], 'A organização por fato recente, fontes e contextualização caracteriza a finalidade informativa da notícia.'],
      ['Em uma campanha de vacinação, um cartaz reúne data, público-alvo, endereço e a frase “Leve seu documento”. Esse formato busca:', 'Orientar e mobilizar o público para uma ação concreta.', ['Narrar a história das vacinas.', 'Debater diferentes teorias científicas.', 'Entreter com uma narrativa ficcional.', 'Substituir o prontuário médico.'], 'Informações operacionais e verbo no imperativo servem à adesão imediata à campanha.'],
      ['Uma resenha difere de uma sinopse principalmente porque a resenha:', 'Apresenta avaliação argumentada da obra, além de informações sobre ela.', ['Conta obrigatoriamente todo o final.', 'É sempre escrita pelo autor da obra.', 'Não pode mencionar personagens.', 'Serve apenas para vender ingressos.'], 'A resenha combina apresentação e julgamento fundamentado; a sinopse resume sem exigir avaliação.'],
      ['Num manual de montagem, a presença de etapas numeradas e imagens ampliadas de encaixes atende à necessidade de:', 'Guiar a execução de um procedimento com clareza.', ['Convencer o leitor sobre uma opinião política.', 'Produzir suspense até a última etapa.', 'Divulgar resultados de uma pesquisa.', 'Relatar uma memória pessoal.'], 'Sequência e imagens funcionais reduzem ambiguidades durante a realização da tarefa.'],
      ['Uma postagem curta informa interdição de uma avenida e inclui mapa, horário e rota alternativa. Mesmo publicada em rede social, ela funciona como:', 'Aviso de utilidade pública.', ['Poema lírico.', 'Verbete enciclopédico.', 'Contrato comercial.', 'Conto fantástico.'], 'Suporte digital não define sozinho o gênero; finalidade e organização configuram um aviso.'],
    ],
  },
  {
    topicSlug: 'funcoes-da-linguagem',
    skillSlug: 'identificar-funcao-predominante-da-linguagem',
    reasoning: 'identificação do elemento da comunicação colocado em destaque',
    errors: ['escolher a função por uma palavra isolada'],
    strategy: 'Pergunte se o foco está no referente, emissor, receptor, canal, código ou forma da mensagem.',
    items: [
      ['Em “A água ferve a 100 °C ao nível do mar”, predomina a função:', 'Referencial, por priorizar informação objetiva sobre um fenômeno.', ['Emotiva, por revelar sentimentos.', 'Conativa, por ordenar uma ação.', 'Fática, por testar o contato.', 'Poética, por explorar rimas.'], 'O enunciado concentra-se no referente e transmite uma informação verificável.'],
      ['“Experimente hoje e descubra um novo sabor.” A função predominante é:', 'Conativa, pois procura influenciar o comportamento do receptor.', ['Metalinguística, porque define uma palavra.', 'Fática, porque encerra uma conversa.', 'Referencial, porque apresenta uma medida.', 'Emotiva, porque confessa um medo.'], 'Imperativos e apelo direto ao interlocutor colocam o receptor no centro da mensagem.'],
      ['Na frase “Substantivo é a palavra que nomeia seres, lugares, sentimentos ou conceitos”, destaca-se a função:', 'Metalinguística, porque a língua é usada para explicar a própria língua.', ['Poética, pela sonoridade.', 'Conativa, por pedir obediência.', 'Fática, por abrir o canal.', 'Emotiva, por expressar gosto.'], 'O código linguístico é simultaneamente instrumento e assunto da explicação.'],
      ['Durante uma ligação, alguém pergunta “Alô, você ainda está me ouvindo?”. Predomina a função:', 'Fática, voltada à manutenção do canal de comunicação.', ['Referencial, voltada a um fato histórico.', 'Poética, voltada à forma estética.', 'Metalinguística, voltada à gramática.', 'Emotiva, voltada à identidade do emissor.'], 'A pergunta verifica se o contato entre os interlocutores permanece ativo.'],
      ['Em “Que manhã absurda de bonita!”, o uso da primeira perspectiva e da avaliação evidencia a função:', 'Emotiva, centrada na atitude do emissor.', ['Referencial, centrada em dados impessoais.', 'Fática, centrada no canal.', 'Metalinguística, centrada no código.', 'Conativa, centrada numa ordem.'], 'A avaliação intensificada manifesta a reação subjetiva de quem fala.'],
    ],
  },
  {
    topicSlug: 'variacao-linguistica',
    skillSlug: 'analisar-variacao-e-adequacao-linguistica',
    reasoning: 'análise de variedades linguísticas em relação a contexto e identidade',
    errors: ['confundir variedade linguística com incapacidade'],
    strategy: 'Avalie adequação ao contexto sem transformar diferença linguística em hierarquia humana.',
    items: [
      ['Uma pessoa usa “a gente vai” numa conversa e “nós iremos” em um ofício. Essa mudança exemplifica:', 'Adequação do registro às diferentes situações comunicativas.', ['Perda completa de identidade linguística.', 'Erro obrigatório na conversa informal.', 'Mudança do português para outro idioma.', 'Ausência de domínio da língua.'], 'Falantes competentes ajustam escolhas linguísticas conforme público, finalidade e grau de formalidade.'],
      ['A pronúncia regional de uma palavra deve ser entendida como:', 'Uma variedade legítima associada à história e à comunidade dos falantes.', ['Prova de menor inteligência.', 'Falha que impede qualquer comunicação.', 'Regra exclusiva da escrita formal.', 'Uso sem relação com identidade.'], 'Variação regional é parte natural de toda língua e não mede capacidade intelectual.'],
      ['Em um relatório profissional, abreviações como “vc” e “pq” podem ser inadequadas principalmente porque:', 'Não correspondem às expectativas de formalidade e clareza desse gênero.', ['São palavras inexistentes em qualquer contexto.', 'Só pessoas mais velhas usam abreviações.', 'Tornam toda frase gramaticalmente impossível.', 'A escrita digital é sempre proibida.'], 'Adequação depende do contexto; formas eficientes em mensagens rápidas podem não servir ao relatório.'],
      ['Ridicularizar alguém por usar uma construção típica de sua comunidade constitui:', 'Preconceito linguístico, pois transforma diferença de uso em julgamento social.', ['Correção neutra sem consequência social.', 'Tradução entre idiomas.', 'Variação exclusivamente histórica.', 'Elogio à diversidade.'], 'A discriminação recai sobre o grupo social por meio de sua forma de falar.'],
      ['A palavra “downloadar” mostra que a língua:', 'Incorpora empréstimos e os adapta a seus padrões de formação.', ['Permanece imutável ao longo do tempo.', 'Perde toda regra ao receber palavras novas.', 'Só muda por decisão de gramáticas.', 'Elimina palavras de origem estrangeira.'], 'O radical emprestado recebe terminação verbal produtiva do português, evidenciando mudança regular.'],
    ],
  },
  {
    topicSlug: 'recursos-expressivos',
    skillSlug: 'relacionar-recurso-expressivo-e-efeito-de-sentido',
    reasoning: 'relação entre escolha expressiva e efeito construído no contexto',
    errors: ['nomear a figura sem explicar seu efeito'],
    strategy: 'Identifique a escolha incomum e explique o que ela intensifica, aproxima ou contrapõe.',
    items: [
      ['Em “A cidade acordou tossindo fumaça”, a personificação contribui para:', 'Representar a poluição como um mal-estar vivido por toda a cidade.', ['Informar que prédios possuem pulmões reais.', 'Eliminar qualquer crítica ambiental.', 'Indicar que a cidade estava silenciosa.', 'Descrever apenas uma pessoa resfriada.'], 'Atribuir tosse à cidade transforma o problema coletivo em imagem corporal de adoecimento.'],
      ['A repetição em “correu, correu, correu até perder a rua de vista” produz sobretudo:', 'Sensação de duração e intensidade do movimento.', ['Dúvida sobre quem praticou a ação.', 'Tom técnico e impessoal.', 'Redução da velocidade narrativa.', 'Comparação explícita entre pessoas.'], 'A retomada insistente do verbo prolonga a ação e acentua o esforço.'],
      ['Em “Esperei uma eternidade por cinco minutos”, a hipérbole expressa:', 'A percepção subjetiva de que a espera pareceu muito longa.', ['A duração literal de milhares de anos.', 'Um cálculo exato do tempo.', 'A ausência total de espera.', 'Uma instrução para medir minutos.'], 'O exagero traduz a experiência emocional do tempo, não sua medida objetiva.'],
      ['Na frase “Ele sorria por fora e desabava por dentro”, a antítese destaca:', 'O contraste entre aparência pública e estado emocional.', ['A igualdade entre sorriso e tristeza.', 'Uma sequência cronológica de viagens.', 'Uma explicação científica do corpo.', 'A impossibilidade de sentir emoções.'], 'A oposição “por fora/por dentro” organiza sentidos contrários e evidencia conflito.'],
      ['Um cartaz ambiental pergunta “Se não for agora, quando?”. A pergunta retórica busca:', 'Criar urgência e envolver o leitor sem esperar uma resposta literal.', ['Solicitar uma data precisa ao leitor.', 'Provar que nenhuma ação é possível.', 'Substituir dados por uma saudação.', 'Encerrar o contato entre emissor e receptor.'], 'A pergunta já orienta para a necessidade de agir no presente e funciona como apelo.'],
    ],
  },
  {
    topicSlug: 'literatura-brasileira',
    skillSlug: 'relacionar-obra-contexto-e-projeto-estetico',
    reasoning: 'articulação entre forma literária, contexto histórico e projeto estético',
    errors: ['reduzir a obra a uma lista de datas'],
    strategy: 'Relacione procedimentos do texto a tensões históricas sem tratar a literatura como simples documento.',
    items: [
      ['A idealização da natureza nacional e do herói indígena, comum em parte do Romantismo brasileiro, relaciona-se ao projeto de:', 'Construir símbolos de identidade para a nação recém-independente.', ['Negar qualquer paisagem brasileira.', 'Defender apenas a objetividade científica.', 'Eliminar personagens nacionais.', 'Reproduzir a linguagem administrativa colonial.'], 'A busca de símbolos próprios serviu à elaboração cultural de uma identidade nacional.'],
      ['Ao expor a hipocrisia social com narrador irônico e personagens contraditórios, o Realismo brasileiro procura:', 'Questionar aparências e convenções da sociedade do período.', ['Idealizar os conflitos amorosos.', 'Substituir análise social por mitologia medieval.', 'Evitar qualquer observação psicológica.', 'Celebrar sem crítica as elites.'], 'Ironia e exame das motivações desestabilizam valores apresentados como naturais.'],
      ['A ruptura modernista com formas rígidas e o uso de fala cotidiana indicam:', 'Busca de experimentação estética e de novas maneiras de representar o Brasil.', ['Retorno obrigatório a modelos clássicos intactos.', 'Recusa de todo tema nacional.', 'Proibição do humor na poesia.', 'Defesa de uma única variedade linguística.'], 'Liberdade formal e aproximação da oralidade participam de um projeto de renovação artística.'],
      ['Em narrativas regionalistas de 1930, seca, migração e exploração do trabalho frequentemente servem para:', 'Articular experiência individual e desigualdade social.', ['Transformar todo conflito em fantasia medieval.', 'Apagar diferenças entre regiões.', 'Provar que o espaço não afeta as personagens.', 'Produzir apenas descrição turística.'], 'O destino das personagens torna visíveis estruturas econômicas e condições históricas.'],
      ['Uma obra contemporânea reconta um episódio histórico pela voz de quem foi silenciado. Esse procedimento pode:', 'Revisar memórias oficiais e ampliar os sujeitos representados.', ['Garantir neutralidade absoluta da narrativa.', 'Eliminar o ponto de vista do texto.', 'Tornar o passado idêntico ao presente.', 'Impedir qualquer diálogo com a história.'], 'Deslocar o narrador evidencia disputas de memória e abre espaço para perspectivas marginalizadas.'],
    ],
  },
];

export const LINGUAGENS_QUESTOES_LEVA_6 = buildQuestionBatch({
  batch: 6,
  origin,
  support,
  sets,
});

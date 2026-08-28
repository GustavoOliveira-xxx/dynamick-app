import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_7_2026_08';
const support = 'Texto e situação autorais criados para a sétima atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'interpretacao-e-inferencia', skillSlug: 'identificar-informacao-explicita-e-implicita',
    reasoning: 'leitura de pressupostos, relações e pistas contextuais', errors: ['concluir além das pistas disponíveis'],
    strategy: 'Localize a palavra ou relação que autoriza a inferência e descarte histórias inventadas.',
    items: [
      ['“Marina voltou a levar almoço de casa.” O verbo “voltou” permite concluir que Marina:', 'Já levava almoço de casa em um período anterior.', ['Nunca havia levado almoço.', 'Passou a trabalhar em casa.', 'Não gosta da comida atual.', 'Levará almoço somente amanhã.'], '“Voltou a” pressupõe uma prática anterior, interrompida e retomada.'],
      ['Uma placa diz “Até os funcionários usam a escada”. A palavra “até” sugere que:', 'O uso pelos funcionários é apresentado como caso inesperado ou reforço do argumento.', ['Funcionários são proibidos de usar escadas.', 'Somente funcionários usam a escada.', 'A escada termina no setor de funcionários.', 'O prédio não possui elevador.'], '“Até” inclui um caso tratado como limite ou surpresa na escala argumentativa.'],
      ['“Quando o ônibus finalmente apareceu, a fila já dobrava a esquina.” Infere-se que:', 'A espera foi longa o bastante para acumular muitas pessoas.', ['O ônibus passou antes do horário.', 'A esquina foi interditada.', 'A fila estava dentro do ônibus.', 'Todos chegaram ao mesmo tempo.'], '“Finalmente” e o tamanho da fila sustentam demora e acúmulo.'],
      ['Em “João é cuidadoso, mas esqueceu o documento”, o conectivo “mas” indica que o esquecimento:', 'Contraria a expectativa criada pela característica de João.', ['Comprova que João nunca é cuidadoso.', 'É causa direta de seu cuidado.', 'Aconteceu antes de João nascer.', 'Não possui relação com a primeira oração.'], 'O contraste surge entre o cuidado esperado e a falha ocorrida.'],
      ['Uma crítica afirma: “O filme não é curto, porém nunca parece longo”. O elogio implícito recai sobre:', 'O ritmo, que mantém o interesse apesar da duração.', ['A ausência completa de narrativa.', 'A quantidade reduzida de cenas.', 'O preço do ingresso.', 'A falta de personagens.'], 'Se a duração não pesa para o espectador, o ritmo é percebido como envolvente.'],
    ],
  },
  {
    topicSlug: 'generos-textuais-e-funcao-social', skillSlug: 'relacionar-formato-contexto-publico-finalidade',
    reasoning: 'identificação de gênero pela situação de circulação', errors: ['definir gênero apenas pelo suporte'],
    strategy: 'Relacione organização, autoria, destinatário, suporte e finalidade prática.',
    items: [
      ['Um documento apresenta partes contratantes, obrigações, prazo e assinaturas. Sua função principal é:', 'Formalizar um acordo e registrar responsabilidades.', ['Narrar uma aventura pessoal.', 'Ensinar um experimento escolar.', 'Avaliar uma obra artística.', 'Divulgar uma promoção relâmpago.'], 'A estrutura produz compromisso verificável entre as partes.'],
      ['Uma sequência de áudio com apresentador, entrevista e episódios publicados periodicamente caracteriza:', 'Podcast, organizado para circulação sonora seriada.', ['Ata de reunião.', 'Bula de medicamento.', 'Verbete de dicionário.', 'Procuração pública.'], 'Periodicidade, oralidade gravada e episódios definem o formato comunicativo.'],
      ['Em uma carta aberta, a identificação pública do destinatário serve para:', 'Cobrar posicionamento e mobilizar também leitores externos.', ['Manter a mensagem totalmente privada.', 'Eliminar qualquer argumento.', 'Substituir o remetente pelo destinatário.', 'Registrar somente dados contábeis.'], 'O destinatário é direto, mas a circulação pública amplia pressão e debate.'],
      ['Um infográfico combina números, ícones, mapas e legendas curtas para:', 'Sintetizar relações de dados com leitura visual rápida.', ['Ocultar a fonte dos dados.', 'Criar personagens ficcionais complexos.', 'Prescrever regras jurídicas.', 'Impedir comparações.'], 'Recursos verbais e visuais condensam informação e evidenciam padrões.'],
      ['Comentários de usuários numa página de produto formam um gênero cuja função recorrente é:', 'Compartilhar experiências e orientar decisões de outros consumidores.', ['Substituir obrigatoriamente o manual técnico.', 'Criar uma lei de consumo.', 'Manter a compra em segredo.', 'Registrar uma reunião empresarial.'], 'Relatos avaliativos circulam socialmente como referência para futuras escolhas.'],
    ],
  },
  {
    topicSlug: 'funcoes-da-linguagem', skillSlug: 'identificar-funcao-predominante-da-linguagem',
    reasoning: 'análise do foco predominante no ato comunicativo', errors: ['considerar que só existe uma função no texto inteiro'],
    strategy: 'Identifique o objetivo dominante, mesmo quando outras funções também aparecem.',
    items: [
      ['“Eu não consigo esconder a alegria desta conquista.” Predomina a função:', 'Emotiva, centrada na experiência de quem fala.', ['Referencial, centrada num dado neutro.', 'Fática, centrada no canal.', 'Metalinguística, centrada no código.', 'Conativa, centrada numa ordem.'], 'Primeira pessoa e expressão de sentimento destacam o emissor.'],
      ['“Mantenha a porta fechada durante a apresentação.” Predomina a função:', 'Conativa, pois orienta a conduta do interlocutor.', ['Poética, pela rima.', 'Emotiva, por confessar medo.', 'Metalinguística, por definir “porta”.', 'Fática, por testar o microfone.'], 'O imperativo dirige uma ação ao receptor.'],
      ['Em “A palavra ‘célere’ significa rápido”, a função central é:', 'Metalinguística.', ['Emotiva.', 'Poética.', 'Fática.', 'Conativa.'], 'A língua explica uma unidade do próprio código linguístico.'],
      ['“Bom dia, turma. Podemos começar?” usa a linguagem sobretudo para:', 'Abrir e confirmar o canal de interação.', ['Apresentar estatística científica.', 'Produzir ambiguidade poética.', 'Definir uma classe gramatical.', 'Expressar uma lembrança íntima.'], 'Saudação e verificação de disponibilidade iniciam o contato.'],
      ['No slogan “Leve leve a vida”, a repetição e o duplo valor de “leve” destacam a função:', 'Poética, pela elaboração da forma da mensagem.', ['Referencial, por apresentar um relatório.', 'Fática, por testar conexão.', 'Metalinguística, por listar regras.', 'Emotiva, por narrar uma biografia.'], 'A escolha sonora e semântica chama atenção para a construção do enunciado.'],
    ],
  },
  {
    topicSlug: 'variacao-linguistica', skillSlug: 'analisar-variacao-e-adequacao-linguistica',
    reasoning: 'relação entre variedade, situação, tempo e grupo social', errors: ['julgar variedade como deficiência do falante'],
    strategy: 'Descreva a diferença e avalie sua adequação ao contexto, sem hierarquizar pessoas.',
    items: [
      ['A diferença entre “mandioca”, “aipim” e “macaxeira” exemplifica variação:', 'Regional, com formas diferentes para um mesmo referente.', ['Biológica, determinada por genes.', 'Sintática, sem mudança lexical.', 'Exclusivamente formal.', 'Criada por erro de impressão.'], 'A escolha lexical acompanha comunidades de diferentes regiões.'],
      ['Palavras como “vosmecê” que deram origem a “você” evidenciam variação:', 'Histórica, pois usos mudam ao longo do tempo.', ['Geográfica apenas.', 'Semântica sem mudança sonora.', 'Restrita a textos científicos.', 'Produzida por tradução automática.'], 'A forma atual resulta de transformações sucessivas no uso.'],
      ['Um médico explica um diagnóstico sem jargões a um paciente. Essa escolha representa:', 'Adequação ao interlocutor para garantir compreensão.', ['Abandono de todo conhecimento técnico.', 'Erro por usar linguagem acessível.', 'Variação sem finalidade comunicativa.', 'Preconceito contra a medicina.'], 'Competência comunicativa inclui traduzir termos conforme o público.'],
      ['Gírias compartilhadas por integrantes de um grupo podem funcionar como:', 'Marca de pertencimento e identidade coletiva.', ['Prova de que o grupo não conhece a língua.', 'Regra obrigatória da escrita acadêmica.', 'Idioma sem relação com o português.', 'Falha que elimina sentidos.'], 'Vocabulário grupal cria reconhecimento e vínculos entre participantes.'],
      ['Corrigir a fala espontânea de alguém em público, ridicularizando seu sotaque, é inadequado porque:', 'Transforma diferença linguística em constrangimento social.', ['Todo sotaque impede compreensão.', 'A fala espontânea segue as mesmas regras de um contrato.', 'Somente a escrita admite variação.', 'A correção pública é sempre exigida.'], 'A atitude desconsidera contexto e associa variedade a inferioridade.'],
    ],
  },
  {
    topicSlug: 'recursos-expressivos', skillSlug: 'relacionar-recurso-expressivo-e-efeito-de-sentido',
    reasoning: 'interpretação de figuras, pontuação e repetição em contexto', errors: ['apenas nomear o recurso sem analisar seu efeito'],
    strategy: 'Compare a formulação escolhida com uma versão neutra e explique a diferença de efeito.',
    items: [
      ['Em “O relógio devorou a tarde”, a metáfora enfatiza:', 'A passagem rápida e irreversível do tempo.', ['A alimentação literal de um objeto.', 'A paralisação completa das horas.', 'A fabricação de relógios.', 'A duração exata de uma refeição.'], '“Devorar” transforma o tempo em força que consome rapidamente o período.'],
      ['A sequência “Sem água. Sem sombra. Sem saída.” produz:', 'Ritmo interrompido e intensificação da sensação de limite.', ['Explicação técnica detalhada.', 'Neutralidade afetiva.', 'Uma comparação explícita.', 'Redução do problema a uma solução.'], 'Frases curtas e repetição acumulam ausência e tensão.'],
      ['Em “A notícia caiu como uma pedra”, a comparação destaca:', 'O impacto brusco e pesado da notícia.', ['O peso físico do papel.', 'A origem mineral da informação.', 'A lentidão da leitura.', 'A falta de consequências.'], 'A pedra oferece imagem concreta para o choque emocional.'],
      ['As reticências em “Eu até iria, mas...” sugerem:', 'Interrupção que deixa uma justificativa ou recusa subentendida.', ['Conclusão totalmente encerrada.', 'Enumeração de dados completos.', 'Ordem direta ao leitor.', 'Mudança para discurso científico.'], 'A suspensão convida o interlocutor a completar o sentido.'],
      ['Chamar um congestionamento de “mar de carros” amplia a percepção de:', 'Extensão e quantidade de veículos.', ['Profundidade literal da avenida.', 'Presença de água salgada.', 'Ausência de movimento apenas.', 'Velocidade dos automóveis.'], 'A imagem do mar comunica vastidão e continuidade visual.'],
    ],
  },
  {
    topicSlug: 'literatura-brasileira', skillSlug: 'relacionar-obra-contexto-e-projeto-estetico',
    reasoning: 'relação entre procedimentos literários e projetos históricos', errors: ['reduzir movimento literário a uma característica fixa'],
    strategy: 'Use marcas formais do trecho e conecte-as às tensões de seu projeto estético.',
    items: [
      ['A poesia árcade valoriza frequentemente equilíbrio, vida simples e natureza como reação:', 'Ao rebuscamento barroco e ao ambiente urbano da corte.', ['À liberdade formal modernista.', 'Ao realismo científico do século XIX.', 'À literatura digital contemporânea.', 'Ao regionalismo de 1930.'], 'O ideal pastoril procura clareza e moderação diante do excesso barroco.'],
      ['O narrador machadiano que conversa com o leitor e expõe contradições sociais produz:', 'Ironia e desconfiança diante das aparências.', ['Heroísmo nacional sem crítica.', 'Descrição neutra sem ponto de vista.', 'Linguagem científica obrigatória.', 'Idealização romântica do amor.'], 'A interlocução instável envolve o leitor no exame crítico de valores sociais.'],
      ['No Naturalismo, a ênfase em ambiente e hereditariedade relaciona-se à tentativa de:', 'Explicar comportamentos por forças biológicas e sociais.', ['Negar qualquer influência do meio.', 'Retomar cavaleiros medievais.', 'Valorizar apenas a subjetividade lírica.', 'Eliminar descrições coletivas.'], 'O projeto dialoga com ideias deterministas e cientificistas do período.'],
      ['A poesia concreta organiza palavras também como formas visuais. Com isso, ela:', 'Integra espaço gráfico, som e sentido à construção poética.', ['Abandona toda linguagem verbal.', 'Retoma somente sonetos clássicos.', 'Proíbe leitura não linear.', 'Transforma poema em notícia.'], 'A disposição material passa a participar ativamente do significado.'],
      ['Uma narrativa indígena contemporânea escrita em português e ligada à memória oral pode:', 'Tensionar o cânone e afirmar perspectivas historicamente silenciadas.', ['Apagar necessariamente a cultura de origem.', 'Eliminar o diálogo entre oralidade e escrita.', 'Repetir a visão colonial sem mudança.', 'Ser considerada não literária por definição.'], 'A autoria e o ponto de vista deslocam quem representa e interpreta essas experiências.'],
    ],
  },
];

export const LINGUAGENS_QUESTOES_LEVA_7 = buildQuestionBatch({ batch: 7, origin, support, sets });

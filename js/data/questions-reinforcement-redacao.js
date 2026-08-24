export const REDACAO_REINFORCEMENT_SETS = [
  {
    topicSlug: 'tese-e-argumentacao', reasoning: 'avaliação de tese, argumento e vínculo lógico',
    errors: ['confundir tema e tese', 'acumular exemplos sem explicar'],
    strategy: 'Localize a posição defendida e pergunte como cada evidência sustenta exatamente essa posição.',
    distractors: ['Repetir o tema já constitui uma tese completa.', 'Todo dado funciona como argumento mesmo sem interpretação.', 'Uma boa redação deve evitar assumir qualquer posição.', 'Conclusão e introdução não precisam manter coerência entre si.'],
    items: [
      ['Sobre o tema desinformação em saúde, qual formulação apresenta uma tese defensável?', 'A baixa alfabetização midiática e a circulação algorítmica favorecem a desinformação, exigindo educação crítica e transparência das plataformas.', 'A formulação assume posição, apresenta causas e abre uma linha de desenvolvimento.'],
      ['Um parágrafo cita uma pesquisa, mas não a relaciona à tese. O que falta?', 'Explicar o vínculo entre o dado, a causa discutida e a posição defendida.', 'Evidência só argumenta quando seu sentido é explicitado no raciocínio.'],
      ['Qual sequência favorece um parágrafo argumentativo consistente?', 'Tópico frasal, explicação do mecanismo, evidência pertinente e fechamento ligado à tese.', 'A sequência apresenta ideia, desenvolve, comprova e reconecta ao projeto de texto.'],
      ['Dois argumentos repetem que o problema é grave, sem avançar. Como melhorar?', 'Dar funções diferentes aos parágrafos, como analisar uma causa e depois uma consequência.', 'Progressão exige novos passos do raciocínio, não mera reformulação da mesma afirmação.'],
      ['Uma tese culpa somente indivíduos por um problema ligado também a políticas públicas e mercado. Qual revisão é mais sólida?', 'Incluir os agentes e fatores estruturais que condicionam as escolhas individuais.', 'Uma causalidade multiescalar evita reduzir fenômeno coletivo a vontade pessoal.'],
    ],
  },
  {
    topicSlug: 'repertorio-sociocultural', reasoning: 'seleção e articulação produtiva de repertório',
    errors: ['usar citação decorativa', 'inventar referência'],
    strategy: 'Escolha uma referência verificável e explique a ponte entre seu conceito e a situação do tema.',
    distractors: ['Uma referência famosa é pertinente a qualquer tema.', 'Basta nomear um autor para validar o argumento.', 'Repertório produtivo deve substituir a análise do candidato.', 'Inventar números específicos torna o texto mais convincente.'],
    items: [
      ['Uma menção a um filme ocupa duas linhas, mas não se conecta ao problema debatido. Ela funciona como:', 'Referência decorativa, pois falta interpretação e vínculo argumentativo.', 'Produtividade depende do uso da referência para provar ou explicar algo.'],
      ['Ao não lembrar um número exato de pesquisa, qual escolha preserva credibilidade?', 'Usar uma referência geral segura ou desenvolver o argumento sem fabricar o dado.', 'Precisão inventada fragiliza o texto; repertório deve ser confiável.'],
      ['Qual uso de um conceito sociológico é mais produtivo?', 'Definir brevemente a ideia e mostrar como ela explica uma causa concreta do tema.', 'Conceito articulado opera como ferramenta de análise, não como nome de autoridade.'],
      ['Uma obra literária retrata exclusão semelhante à do tema, mas em outro período. O candidato deve:', 'Explicar a analogia e também respeitar as diferenças de contexto.', 'Comparação forte torna explícitos alcance e limites da aproximação.'],
      ['Por que exemplos do cotidiano podem compor repertório válido?', 'Porque pertinência, legitimidade e articulação importam mais que prestígio do nome citado.', 'Observação social bem explicada pode sustentar o argumento de forma relevante.'],
    ],
  },
  {
    topicSlug: 'coesao-e-progressao', reasoning: 'construção de relações entre frases, parágrafos e etapas do argumento',
    errors: ['usar conectivo pelo som', 'repetir sem progredir'],
    strategy: 'Nomeie a relação lógica pretendida e escolha o recurso coesivo que a exprime sem ambiguidade.',
    distractors: ['Quanto mais conectivos, maior é necessariamente a coesão.', 'Todo parágrafo deve começar com o mesmo operador.', 'Sinônimos sempre podem substituir uma palavra sem alterar sentido.', 'Progressão consiste em repetir a tese ao final de cada frase.'],
    items: [
      ['A segunda frase contrasta uma expectativa apresentada na primeira. Qual operador é adequado?', '“Entretanto”, pois sinaliza oposição entre as ideias.', 'O conectivo deve declarar a relação adversativa que organiza a leitura.'],
      ['Um pronome pode se referir a dois substantivos anteriores e gera dúvida. Como corrigir?', 'Retomar explicitamente o referente ou reestruturar a frase.', 'Clareza referencial é parte da coesão e evita dupla interpretação.'],
      ['Um parágrafo começa com “portanto”, mas introduz uma nova causa. Qual é o problema?', 'O operador anuncia conclusão, enquanto a relação necessária é de adição ou causalidade.', 'Conectivo inadequado contradiz a arquitetura lógica do argumento.'],
      ['Como progredir do diagnóstico para a proposta sem salto brusco?', 'Fechar o diagnóstico indicando a barreira que a intervenção seguinte deverá enfrentar.', 'A frase-ponte transforma a conclusão do argumento em critério para agir.'],
      ['Repetir uma palavra-chave pode ser legítimo quando:', 'Mantém o referente central claro e se combina com novas informações.', 'Coesão não exige apagar toda repetição; exige continuidade com progressão.'],
    ],
  },
  {
    topicSlug: 'proposta-de-intervencao', reasoning: 'elaboração de intervenção detalhada, viável e vinculada ao diagnóstico',
    errors: ['propor ação vaga', 'omitir meio ou finalidade'],
    strategy: 'Cheque agente, ação, meio, finalidade, detalhamento e respeito aos direitos humanos.',
    distractors: ['“É preciso conscientizar” já detalha uma intervenção completa.', 'Qualquer agente pode executar qualquer política sem competência institucional.', 'A proposta não precisa responder às causas discutidas.', 'Violar direitos é aceitável quando a finalidade é positiva.'],
    items: [
      ['Na frase “o governo deve melhorar a educação”, qual lacuna é mais evidente?', 'Faltam ação específica, meio de execução, público e finalidade verificável.', 'Agente genérico e verbo amplo não permitem entender como a medida funcionaria.'],
      ['Se o texto diagnostica falta de acesso à internet, qual proposta responde diretamente à causa?', 'Expandir infraestrutura e oferta pública de conexão nas áreas identificadas, com metas e monitoramento.', 'A ação atua sobre a barreira material apontada e inclui meios de acompanhamento.'],
      ['Por que o agente precisa ser compatível com a ação proposta?', 'Porque competência, recursos e alcance determinam a viabilidade da execução.', 'Uma proposta plausível atribui responsabilidade a quem pode realizá-la.'],
      ['Uma campanha informa o público, mas o problema também envolve fiscalização insuficiente. Como fortalecer a intervenção?', 'Combinar educação com mecanismo de controle, canal de denúncia e avaliação.', 'A proposta passa a atuar tanto na informação quanto na falha institucional diagnosticada.'],
      ['Qual elemento transforma a finalidade “reduzir o problema” em algo mais preciso?', 'Indicar o efeito esperado, o público beneficiado e um critério de acompanhamento.', 'Finalidade detalhada mostra direção e permite avaliar se a ação alcançou resultado.'],
    ],
  },
];

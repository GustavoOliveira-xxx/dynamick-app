import { buildQuestionBatch } from './questions-batch-factory.js';

const origin = 'AUTORAL_LEVA_6_2026_08';
const support = 'Trecho e situação autorais criados para a sexta atualização do acervo DynamiCK.';

const sets = [
  {
    topicSlug: 'tese-e-argumentacao',
    skillSlug: 'formular-tese-e-sustentar-com-argumentos',
    reasoning: 'formulação de tese específica e construção de argumento relacionado',
    errors: ['confundir tema amplo com posicionamento defendível'],
    strategy: 'Transforme o tema em uma afirmação específica e ligue cada argumento a ela por uma explicação.',
    items: [
      ['Para o tema “desinformação em saúde”, qual frase funciona melhor como tese?', 'A desinformação em saúde se amplia pela baixa educação midiática e pela circulação de conteúdo sem verificação nas plataformas.', ['A saúde é muito importante para todos.', 'Existem muitas informações na internet.', 'Desde a Antiguidade as pessoas se comunicam.', 'Este texto falará sobre desinformação.'], 'A alternativa assume posição específica e antecipa duas causas que podem organizar os argumentos.'],
      ['Após a tese de que ciclovias integradas melhoram a mobilidade, qual argumento é mais pertinente?', 'Uma rede contínua reduz trajetos inseguros e conecta bairros a terminais de transporte.', ['Bicicletas podem ter várias cores.', 'Algumas cidades foram fundadas há séculos.', 'O clima muda durante o ano.', 'Todo cidadão possui automóvel.'], 'O argumento explica um mecanismo pelo qual a política sustenta a tese apresentada.'],
      ['Um parágrafo apresenta estatística sobre evasão escolar, mas não a comenta. O que falta para formar argumento?', 'Explicar como o dado comprova a causa ou consequência defendida.', ['Apagar o dado e repetir o tema.', 'Adicionar uma pergunta sem resposta.', 'Trocar a tese por uma saudação.', 'Usar apenas palavras mais longas.'], 'Dados ganham função argumentativa quando interpretados e conectados ao raciocínio central.'],
      ['A tese “o problema ocorre apenas por falta de interesse individual” é frágil quando o texto também mostra barreiras econômicas. Por quê?', 'Ela simplifica o fenômeno e ignora fatores estruturais relevantes.', ['Ela possui verbo no presente.', 'Toda tese deve ter exatamente dez palavras.', 'Argumentos econômicos nunca são válidos.', 'Interesse individual e estrutura são sinônimos.'], 'Uma boa tese precisa acomodar a complexidade demonstrada pelos próprios argumentos.'],
      ['Para rebater “regular publicidade infantil é censura”, qual contra-argumento é mais consistente?', 'A regulação pode proteger um público vulnerável sem impedir a circulação geral de informações e produtos.', ['Toda publicidade é idêntica.', 'Crianças nunca veem anúncios.', 'A censura é sempre um tema antigo.', 'Basta afirmar que a opinião contrária está errada.'], 'A resposta distingue proteção regulatória de proibição ampla e enfrenta diretamente a objeção.'],
    ],
  },
  {
    topicSlug: 'repertorio-sociocultural',
    skillSlug: 'selecionar-e-articular-repertorio-sociocultural',
    reasoning: 'seleção, contextualização e uso produtivo de repertório',
    errors: ['citar uma referência sem explicar sua relação com a tese'],
    strategy: 'Apresente a referência, recorte a ideia pertinente e conecte-a explicitamente ao argumento.',
    items: [
      ['Em um texto sobre vigilância digital, qual uso de “1984”, de George Orwell, é mais produtivo?', 'Explicar como a vigilância constante do romance ajuda a discutir controle por coleta massiva de dados.', ['Escrever apenas “como em 1984” e mudar de assunto.', 'Resumir todos os capítulos do livro.', 'Citar o título sem relacioná-lo ao tema.', 'Afirmar que ficção prova qualquer dado atual.'], 'O repertório é produtivo quando uma ideia da obra ilumina o mecanismo discutido.'],
      ['Uma estatística de dez anos atrás pode ser usada com responsabilidade se o autor:', 'Indicar data e fonte e explicar os limites de comparação com o presente.', ['Apresentá-la como atual sem ressalvas.', 'Ocultar a fonte para parecer mais convincente.', 'Mudar o número para aproximá-lo da tese.', 'Tratá-la como opinião pessoal.'], 'Contextualização temporal preserva a honestidade e delimita a força da evidência.'],
      ['Para discutir desigualdade urbana, uma referência ao direito à cidade é pertinente quando:', 'Ajuda a analisar acesso desigual a transporte, moradia e serviços.', ['Serve apenas para ornamentar a introdução.', 'Substitui toda explicação sobre o problema.', 'É citada sem relação com o espaço urbano.', 'Impede o uso de dados concretos.'], 'O conceito organiza a análise dos recursos e oportunidades distribuídos no território.'],
      ['Qual prática evita o “repertório coringa”?', 'Escolher referência cuja ideia específica responda ao argumento daquele tema.', ['Usar a mesma citação em qualquer assunto.', 'Memorizar nomes sem conhecer conceitos.', 'Inserir referência apenas para aumentar o tamanho.', 'Trocar explicação por uma lista de autores.'], 'Pertinência depende da relação real entre a referência e a linha de raciocínio.'],
      ['Ao citar uma fala de especialista, o texto mantém autonomia argumentativa quando:', 'Interpreta a fala e mostra como ela sustenta a tese, em vez de terceirizar a conclusão.', ['Aceita a autoridade como prova absoluta.', 'Elimina toda ligação com o parágrafo.', 'Copia um trecho longo sem análise.', 'Dispensa a identificação da fonte.'], 'A referência deve integrar o raciocínio do autor e não ocupar seu lugar.'],
    ],
  },
  {
    topicSlug: 'coesao-e-progressao',
    skillSlug: 'construir-coesao-e-progressao-no-texto',
    reasoning: 'encadeamento lógico, referenciação e progressão temática',
    errors: ['usar conectivo incompatível com a relação entre ideias'],
    strategy: 'Defina a relação lógica antes de escolher o conectivo e retome referentes sem ambiguidade.',
    items: [
      ['“A escola ampliou o acesso à internet. ___, muitos alunos ainda não possuem equipamento próprio.” Qual conectivo é adequado?', 'Entretanto.', ['Portanto.', 'Além disso.', 'Por exemplo.', 'Em consequência.'], 'A segunda frase introduz contraste e limite em relação ao avanço indicado na primeira.'],
      ['No trecho “A prefeitura ouviu os moradores e os técnicos. Eles propuseram mudanças”, qual problema pode ocorrer?', 'O pronome “eles” tem referente ambíguo.', ['Não existe verbo na segunda frase.', 'O plural está sempre proibido.', 'As frases expressam causa obrigatória.', 'O termo “mudanças” é um conectivo.'], 'Não fica claro se a proposta veio dos moradores, dos técnicos ou de ambos.'],
      ['Qual sequência apresenta progressão temática mais clara?', 'Problema → causa → consequência → possibilidade de enfrentamento.', ['Conclusão → título → saudação → exemplo sem tema.', 'A mesma afirmação repetida quatro vezes.', 'Dados desconectados sem interpretação.', 'Mudança de assunto a cada frase.'], 'A sequência desenvolve novas informações ligadas ao foco central.'],
      ['Em “A medida reduz custos. Além disso, amplia o acesso”, o conectivo indica:', 'Adição de um segundo benefício.', ['Oposição entre os benefícios.', 'Conclusão que invalida a primeira frase.', 'Explicação de uma causa anterior.', 'Condição impossível.'], '“Além disso” acrescenta informação com a mesma orientação argumentativa.'],
      ['Para evitar repetição excessiva de “a coleta seletiva”, uma retomada adequada é:', '“Essa prática”, desde que o referente esteja claro no contexto.', ['“Aquilo”, mesmo sem referente identificável.', 'Eliminar todas as referências ao tema.', 'Trocar o termo por assunto sem relação.', 'Usar sempre o pronome “ele”, qualquer que seja o gênero.'], 'A expressão encapsula o referente anterior e mantém continuidade sem ambiguidade.'],
    ],
  },
  {
    topicSlug: 'proposta-de-intervencao',
    skillSlug: 'elaborar-proposta-de-intervencao-detalhada',
    reasoning: 'elaboração de intervenção viável, detalhada e ligada ao diagnóstico',
    errors: ['propor ação vaga sem agente, meio ou finalidade'],
    strategy: 'Defina agente, ação, meio, público, finalidade e um detalhamento coerente com a causa discutida.',
    items: [
      ['Para enfrentar baixa educação midiática, qual proposta é mais completa?', 'Secretarias de Educação devem oferecer oficinas semestrais de verificação de fontes nas escolas, com análise guiada de conteúdos, para ampliar a leitura crítica dos estudantes.', ['A sociedade precisa melhorar.', 'As notícias falsas devem acabar.', 'Alguém deveria criar uma campanha.', 'Os estudantes precisam prestar atenção.'], 'A proposta identifica agente, ação, periodicidade, meio, público e finalidade.'],
      ['Se o texto aponta falta de iluminação como causa de insegurança em pontos de ônibus, a intervenção deve priorizar:', 'Mapeamento e manutenção da iluminação pela gestão municipal nos locais críticos.', ['Uma campanha sobre alimentação saudável.', 'A criação de bibliotecas sem relação com mobilidade.', 'A proibição de ônibus à noite.', 'Uma frase genérica sobre respeito.'], 'A ação enfrenta diretamente a causa diagnosticada e indica responsabilidade institucional.'],
      ['“O governo deve conscientizar a população” é uma proposta pouco detalhada porque não informa:', 'Qual órgão atuará, por qual meio, com qual conteúdo e objetivo verificável.', ['Uma citação literária obrigatória.', 'A opinião de todos os leitores.', 'O título completo da redação.', 'A quantidade exata de palavras do texto.'], 'Agente genérico e ação abstrata não permitem compreender a execução.'],
      ['Qual detalhamento torna uma campanha de combate ao desperdício mais verificável?', 'Divulgar metas mensais e publicar indicadores de redução por unidade participante.', ['Dizer que a campanha será excelente.', 'Usar cartazes bonitos sem conteúdo definido.', 'Afirmar que todos participarão.', 'Prometer solução imediata de qualquer problema.'], 'Metas e indicadores permitem acompanhar implementação e resultados.'],
      ['Uma intervenção respeita direitos humanos quando:', 'Protege pessoas e grupos sem violência, discriminação ou supressão arbitrária de direitos.', ['Propõe exposição pública de indivíduos suspeitos.', 'Defende punição coletiva sem processo.', 'Exclui um grupo do acesso a serviços.', 'Usa coerção como única estratégia educativa.'], 'A solução não pode reproduzir violações enquanto tenta resolver o problema.'],
    ],
  },
];

export const REDACAO_QUESTOES_LEVA_6 = buildQuestionBatch({
  batch: 6,
  origin,
  support,
  sets,
});

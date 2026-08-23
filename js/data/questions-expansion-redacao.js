import { expandedQuestion as q } from './questions-expansion-factory.js';

const SOURCE = 'Propostas e trechos autorais criados para prática de argumentação.';

export const REDACAO_QUESTION_EXPANSION = [
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q-red-6',
    stem: 'Tema: “Desafios para ampliar o acesso a espaços públicos de cultura”. Qual formulação apresenta uma tese defensável e delimitada?',
    support: SOURCE, difficulty: 'intro', cognitiveFormat: 'concept', reasoningType: 'identificação de tese',
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['confundir tema com tese'], correct: 1,
    options: [
      ['Espaços públicos de cultura.', 'Apenas repete o tema e não assume posição.', 'ausência de posicionamento'],
      ['O acesso permanece desigual porque equipamentos se concentram em áreas centrais e a divulgação não alcança parte da população.', 'A formulação assume posição e apresenta dois eixos argumentativos.'],
      ['A cultura é muito importante para todo mundo.', 'A afirmação é genérica e não delimita o problema de acesso.', 'generalidade'],
      ['Existem museus, bibliotecas, teatros e centros culturais.', 'A enumeração informa, mas não defende uma interpretação.', 'confundir repertório com tese'],
      ['Será que todos frequentam espaços culturais?', 'A pergunta pode introduzir o tema, mas não apresenta a posição do texto.', 'interrogação sem resposta'],
    ],
    explanation: 'Uma tese útil responde ao problema e antecipa caminhos de desenvolvimento; concentração territorial e comunicação formam dois eixos claros.',
  }),
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q-red-7',
    stem: 'Um estudante defende que escolas devem ampliar projetos de leitura. Qual evidência melhor sustenta um argumento sobre continuidade da prática?',
    support: SOURCE, difficulty: 'intermediate', cognitiveFormat: 'applied', reasoningType: 'seleção de evidência pertinente',
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['usar exemplo sem ligação causal'], correct: 3,
    options: [
      ['Uma lista dos livros preferidos do estudante.', 'Preferência individual não demonstra continuidade de um projeto escolar.', 'evidência anedótica'],
      ['A afirmação de que ler é sempre bom.', 'A frase é valorativa e não comprova efeito de uma política continuada.', 'petição de princípio'],
      ['O preço médio de capas de livros antigos.', 'O dado não se relaciona diretamente à manutenção da prática escolar.', 'irrelevância'],
      ['Dados de frequência mostrando participação ao longo do ano, comparados entre projetos pontuais e recorrentes.', 'A comparação mede precisamente continuidade e adesão no tempo.'],
      ['Uma fotografia da inauguração da biblioteca.', 'A imagem comprova um evento, não a continuidade do uso.', 'confundir inauguração com prática'],
    ],
    explanation: 'O argumento sobre continuidade pede evidência longitudinal e comparativa, não apenas uma opinião ou registro de evento isolado.',
  }),
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q-red-8',
    stem: 'Leia o período: “A entrega de computadores pode ampliar o acesso digital; contudo, sem conexão estável e formação docente, o equipamento tende a ter uso limitado.” A relação entre as partes constrói:',
    support: SOURCE, difficulty: 'intermediate', cognitiveFormat: 'interpretation', reasoningType: 'análise de concessão argumentativa',
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['entender concessão como contradição'], correct: 0,
    options: [
      ['Uma concessão que reconhece o benefício e delimita condições para que ele se realize.', 'O texto admite potencial positivo antes de apresentar limites necessários.'],
      ['Uma negação de qualquer utilidade dos computadores.', 'O início reconhece que eles podem ampliar o acesso.', 'apagar concessão'],
      ['Uma sequência temporal entre compra e descarte.', 'Não há cronologia de descarte; há condição de efetividade.', 'confundir relação lógica'],
      ['Uma definição técnica de conexão estável.', 'O conceito é citado, mas não definido.', 'confundir menção com definição'],
      ['Uma comparação entre professores e estudantes.', 'Os grupos não são colocados em oposição comparativa.', 'criar oposição'],
    ],
    explanation: 'A concessão fortalece a tese ao reconhecer um ganho real e impedir que ele seja tratado como solução suficiente.',
  }),
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q-red-9',
    stem: 'Compare duas propostas de intervenção para combater o desperdício de alimentos: I. “É preciso conscientizar a sociedade.” II. “Secretarias municipais, em parceria com feiras, devem publicar rotinas de doação e treinar comerciantes para separar alimentos próprios ao consumo.” A segunda é mais consistente porque:',
    support: SOURCE, difficulty: 'challenging', cognitiveFormat: 'comparison', reasoningType: 'comparação de propostas de intervenção',
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['valorizar intenção sem detalhamento'], correct: 2,
    options: [
      ['Promete eliminar completamente o desperdício.', 'A proposta não faz promessa total.', 'atribuir garantia'],
      ['Usa mais palavras e, por isso, é automaticamente melhor.', 'Extensão não garante viabilidade ou pertinência.', 'critério formal'],
      ['Define agentes, ações e meios ligados ao problema.', 'Secretarias e feiras são agentes; publicação e treinamento são ações com meios concretos.'],
      ['Responsabiliza apenas consumidores individuais.', 'A proposta atua sobre poder público e comerciantes.', 'ler agentes incorretamente'],
      ['Evita qualquer participação do setor público.', 'Secretarias municipais são explicitamente centrais.', 'contradição textual'],
    ],
    explanation: 'Uma intervenção consistente explicita quem faz o quê e como, mantendo relação direta com a causa discutida.',
  }),
  q({
    topicSlug: 'tese-e-argumentacao', slug: 'q-red-10',
    stem: 'Para defender a ampliação de áreas verdes urbanas, um texto articula ilhas de calor, saúde respiratória e convivência comunitária. Essa integração é produtiva quando:',
    support: SOURCE, difficulty: 'challenging', cognitiveFormat: 'integration', reasoningType: 'integração de repertórios em eixo argumentativo',
    skillSlug: 'formular-tese-e-sustentar-com-argumentos', likelyErrors: ['empilhar repertório sem conexão'], correct: 4,
    options: [
      ['Cada conceito aparece em um parágrafo sem ligação com a tese.', 'A simples presença de conceitos não constrói argumento.', 'repertório decorativo'],
      ['O texto afirma que uma praça resolve todos os problemas urbanos.', 'A generalização enfraquece a credibilidade.', 'solução absoluta'],
      ['Saúde respiratória é citada apenas como frase de efeito.', 'Sem mecanismo ou evidência, a citação não sustenta a tese.', 'afirmação gratuita'],
      ['Convivência substitui completamente a discussão ambiental.', 'Os aspectos podem se complementar; não precisam se excluir.', 'falsa oposição'],
      ['Os conceitos explicam efeitos ambientais e sociais diferentes da mesma política, ligados por relações claras.', 'A integração mostra múltiplos efeitos sem perder o eixo da política urbana.'],
    ],
    explanation: 'Repertórios diversos fortalecem a argumentação quando têm função demonstrável e convergem para a tese, em vez de formar uma lista desconectada.',
  }),
];

/**
 * Linguagens — segunda leva de tópicos.
 *
 * Conteúdo autoral de desenvolvimento — Conscious Knowledge.
 * Nenhum enunciado, texto motivador ou alternativa foi copiado de prova oficial,
 * livro ou plataforma de terceiros. Os textos de apoio são curtos e autorais.
 *
 * Cobre os assuntos previstos no escopo que ainda não tinham tópico próprio:
 * funções da linguagem, variação linguística, recursos expressivos e literatura
 * brasileira — este último abre a matéria de Literatura, até então vazia.
 */

import { question as q, topic } from './topic-factory.js';

export const LINGUAGENS_TOPICS_LEVA_2 = [
  topic({
    slug: 'funcoes-da-linguagem',
    name: 'Funções da linguagem',
    subject: 'lingua-portuguesa',
    area: 'linguagens',
    summary:
      'Reconhecer para que serve um texto — informar, convencer, emocionar, aproximar, explicar a própria língua — a partir de marcas concretas no enunciado.',
    difficulty: 'intro',
    minutes: 20,
    weight: 88,
    order: 3,
    related: ['interpretacao-e-inferencia', 'generos-textuais-e-funcao-social'],
    skill: {
      slug: 'identificar-funcao-predominante-da-linguagem',
      name: 'Identificar a função predominante da linguagem',
      description:
        'Relacionar marcas linguísticas ao elemento da comunicação em destaque e justificar a escolha com evidência do texto.',
    },
    quick: `Toda mensagem tem seis elementos. A função predominante é a do elemento **em destaque**:

| Elemento em foco | Função | Marca típica |
| --- | --- | --- |
| Emissor | **emotiva** | 1ª pessoa, interjeição, adjetivo de valor |
| Receptor | **conativa** (apelativa) | imperativo, vocativo, "você" |
| Referente | **referencial** | 3ª pessoa, dado, linguagem objetiva |
| Mensagem | **poética** | jogo sonoro, metáfora, forma trabalhada |
| Canal | **fática** | "alô?", "entendeu?", "tá me ouvindo?" |
| Código | **metalinguística** | a língua falando dela mesma |

**Regra prática:** um texto quase nunca tem uma função só. A pergunta é sempre qual **predomina** — e a resposta se prova com um trecho, não com uma impressão.`,
    explanation: {
      title: 'Como provar a função predominante em vez de adivinhar',
      body: `### 1. Predominante não é única

Uma propaganda pode emocionar (emotiva), descrever o produto (referencial) e mandar comprar (conativa) no mesmo cartaz. A questão pede a que **organiza** o texto: se tudo converge para fazer o leitor agir, é conativa, ainda que haja dado e emoção pelo caminho.

### 2. Marcas que valem como prova

- **Emotiva:** "eu", "senti", "que dia horrível!", diminutivos afetivos.
- **Conativa:** "compre", "venha", "não perca", "você merece", vocativo.
- **Referencial:** verbos na 3ª pessoa, números, ausência de opinião explícita.
- **Poética:** repetição sonora, rima, metáfora, ordem inusitada das palavras — a forma chama atenção para si.
- **Fática:** teste ou manutenção do contato, não da informação.
- **Metalinguística:** definição de palavra, explicação de regra, dicionário, gramática, filme sobre cinema.

### 3. O erro que separa quem estuda de quem chuta

Confundir **assunto** com **função**. Um texto sobre a língua portuguesa não é automaticamente metalinguístico: se ele **informa** sobre a história do idioma, é referencial. Metalinguística é quando o código é usado para explicar o próprio código — a definição, não o comentário.

Do mesmo modo, um poema não é automaticamente poético em sentido técnico: se o poema é usado numa campanha para você doar sangue, a função que organiza o texto passou a ser conativa.

### 4. Fática x conativa

As duas mexem com o receptor, mas com objetivos diferentes:

- fática **verifica ou mantém o canal**: "está me ouvindo?";
- conativa **pede uma ação**: "me escute".

### 5. Como responder em prova

1. Leia o texto inteiro antes de decidir.
2. Pergunte: o que o texto quer que aconteça depois da leitura?
3. Ache uma marca linguística que sustente a resposta.
4. Se duas funções parecem empatar, escolha aquela sem a qual o texto perderia o sentido.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — a campanha que parece informativa',
        body: `**Texto:** "Todo ano, 12 mil litros de sangue faltam nos hospitais da região. Doar leva 40 minutos. Procure o hemocentro mais próximo."

**Leitura equivocada:** "tem número, então é referencial."

**Leitura correta:** o dado e o tempo existem para **derrubar as objeções** do leitor (falta sangue; é rápido). A terceira frase revela o objetivo: um verbo no imperativo dirigido ao leitor.

**Resposta:** função **conativa**, com apoio referencial.

**O que provou:** "Procure" — imperativo, segunda pessoa implícita, ação pedida ao receptor.`,
      },
      {
        title: 'Exemplo resolvido 2 — quando o texto explica a própria língua',
        body: `**Texto A:** "Gíria é o vocabulário de um grupo específico, que costuma se renovar rapidamente."

**Texto B:** "Meu avô não entendia nada do que a gente falava; parecia outro idioma dentro de casa."

**Texto A** define um termo da língua usando a própria língua: **metalinguística**.

**Texto B** trata do mesmo assunto — variação de vocabulário — mas em relato pessoal, com foco em quem fala: **emotiva**.

**Conclusão:** mesmo tema, funções diferentes. O que decide é o elemento em destaque, não o assunto.`,
      },
    ],
    mistakes: `**1. Trocar assunto por função.**
Falar sobre a língua não é o mesmo que usar a língua para explicar a língua. Um texto sobre a origem do português pode ser puramente referencial.

**2. Ver imperativo e responder "conativa" sem ler o resto.**
Uma receita culinária é cheia de imperativos e continua predominantemente referencial: ela informa um procedimento, não persuade ninguém a cozinhar.

**3. Chamar de poética qualquer coisa bonita.**
Poética é quando a **forma da mensagem** vira o centro — sonoridade, construção, ambiguidade proposital. Uma frase emocionante sem trabalho formal costuma ser emotiva.`,
    selfCheck: [
      'Qual a diferença prática entre função fática e função conativa?',
      'Por que um texto sobre a língua nem sempre é metalinguístico?',
      'Que marca linguística você procuraria para provar que um texto é emotivo?',
    ],
    questions: [
      q({
        slug: 'q-linguagem-1',
        stem: 'Em uma conversa por telefone, um dos falantes repete: "Alô? Você está me ouvindo? Alô?" A função da linguagem predominante nessas falas é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de função pela marca linguística',
        seconds: 70,
        errors: ['confundir fática com conativa'],
        correct: 3,
        options: [
          ['Emotiva, porque expressa a ansiedade do falante.', 'Não há marca de expressão de sentimento: o falante testa o contato, não fala de si.', 'ver emoção onde há teste de canal'],
          ['Referencial, porque informa a situação da ligação.', 'Nenhuma informação sobre o mundo é transmitida; a fala serve ao contato.', 'confundir contexto com referente'],
          ['Metalinguística, porque comenta a própria conversa.', 'Metalinguagem explica o código, não verifica se a mensagem está chegando.', 'confundir canal com código'],
          ['Fática, porque testa e tenta manter o canal de comunicação.', '"Alô?" e "está me ouvindo?" existem para verificar se a ligação funciona: o foco está no canal.'],
          ['Poética, porque há repetição de palavras.', 'A repetição aqui é funcional, não trabalho estético sobre a forma da mensagem.', 'tratar toda repetição como recurso poético'],
        ],
        explanation: 'Quando a fala serve para abrir, testar ou manter o contato — sem informar, emocionar ou pedir ação —, a função é fática.',
        strategy: 'Pergunte: se a frase sumisse, o que se perderia? Se for o contato, é fática.',
      }),
      q({
        slug: 'q-linguagem-2',
        stem: 'Um cartaz de campanha de trânsito traz: "Você tem pressa. Sua família tem você. Reduza a velocidade."\n\nA função predominante e a marca que a sustenta são:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação do conceito a um texto publicitário',
        seconds: 100,
        errors: ['parar na primeira frase', 'confundir emoção com função emotiva'],
        correct: 1,
        options: [
          ['Emotiva, sustentada por "Sua família tem você".', 'A frase mobiliza afeto, mas está a serviço do pedido final; sozinha, ela não organiza o texto.', 'tomar o meio pelo fim'],
          ['Conativa, sustentada pelo imperativo "Reduza".', 'Todo o cartaz converge para uma ação do leitor. O imperativo dirigido a "você" é a marca que prova a função.'],
          ['Referencial, sustentada pela menção ao trânsito.', 'Não há dado ou informação objetiva sobre trânsito no texto.', 'inferir informação ausente'],
          ['Poética, sustentada pelo paralelismo entre as duas primeiras frases.', 'O paralelismo é um recurso a serviço da persuasão, não o centro do texto.', 'confundir recurso com função'],
          ['Metalinguística, sustentada pelo uso de "você" em dois sentidos.', 'Não há explicação do código linguístico em nenhum ponto.', 'chamar de metalinguagem qualquer jogo de palavras'],
        ],
        explanation: 'A campanha usa afeto e paralelismo como meios; o fim é fazer o leitor reduzir a velocidade. Imperativo + destinatário explícito = função conativa.',
        detail: 'Repare que as duas primeiras frases preparam a terceira. Retirar "Reduza a velocidade" descaracterizaria a campanha; retirar as anteriores, não.',
      }),
      q({
        slug: 'q-linguagem-3',
        stem: 'Leia o verbete: "**Saudade**, substantivo feminino. Sentimento de falta de alguém ou de algo distante ou perdido."\n\nEm seguida, leia o trecho de diário: "Hoje senti saudade daquele quintal — e doeu de um jeito que eu não sabia explicar."\n\nA comparação entre os dois textos mostra que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura comparada de dois usos do mesmo tema',
        seconds: 110,
        errors: ['achar que o mesmo tema implica a mesma função'],
        correct: 4,
        options: [
          ['Os dois são metalinguísticos, porque tratam do significado de uma palavra.', 'Só o verbete explica o código; o diário usa a palavra para falar de si.', 'confundir tema com função'],
          ['Os dois são emotivos, porque saudade é um sentimento.', 'O verbete define o termo sem expressar sentimento algum.', 'deduzir a função pelo assunto'],
          ['O verbete é emotivo e o diário é referencial.', 'A relação está invertida: o verbete é objetivo e o diário é subjetivo.', 'inverter as funções'],
          ['O verbete é conativo e o diário é poético.', 'O verbete não pede ação, e o diário não organiza a forma da mensagem como centro.', 'escolher duas funções não sustentadas'],
          ['O verbete é metalinguístico e o diário é emotivo.', 'O verbete usa a língua para definir uma palavra da própria língua; o diário coloca em destaque quem fala e o que sente.'],
        ],
        explanation: 'Mesmo tema, funções diferentes: definir uma palavra é metalinguagem; relatar o próprio sentimento é função emotiva.',
      }),
      q({
        slug: 'q-linguagem-4',
        stem: 'Considere dois textos sobre o mesmo aplicativo:\n\nI. "O aplicativo registra o consumo de água por cômodo e gera um relatório mensal."\nII. "Descubra quanto você desperdiça sem perceber. Baixe agora e comece hoje."\n\nSobre as funções predominantes, é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre alternativas próximas',
        seconds: 120,
        errors: ['achar que os dois são publicitários por serem sobre um produto'],
        correct: 0,
        options: [
          ['I é referencial e II é conativa, porque o primeiro descreve o funcionamento e o segundo pede uma ação do leitor.', 'I apresenta o que o produto faz, em 3ª pessoa e sem apelo; II usa imperativos dirigidos ao leitor ("Descubra", "Baixe").'],
          ['I e II são conativos, porque ambos falam de um produto vendido.', 'Falar de um produto não torna um texto persuasivo: I não pede nada ao leitor.', 'deduzir a função pelo contexto comercial'],
          ['I é emotivo e II é referencial.', 'I não expressa subjetividade e II não é objetivo: a classificação está trocada.', 'inverter as duas funções'],
          ['I é metalinguístico, porque explica um sistema.', 'Explicar um aplicativo não é explicar o código linguístico.', 'ampliar indevidamente a metalinguagem'],
          ['II é poético, porque cria expectativa no leitor.', 'Criar expectativa é efeito persuasivo; não há trabalho formal sobre a mensagem.', 'confundir efeito com função poética'],
        ],
        explanation: 'A diferença entre descrever um produto e convencer alguém a usá-lo é exatamente a diferença entre função referencial e função conativa.',
        detail: 'Um teste rápido: se o texto pudesse terminar com "e é isso", ele informa. Se pede um "faça agora", persuade.',
      }),
      q({
        slug: 'q-linguagem-5',
        stem: 'Uma escola publica um mural com três materiais sobre reciclagem: um infográfico com percentuais de coleta seletiva no município; um poema escrito por estudantes, com rimas sobre o lixo do rio; e um cartaz com a frase "Separe o seu. Cobre o do vizinho."\n\nUma análise adequada do conjunto deve reconhecer que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre função da linguagem, gênero e finalidade comunicativa',
        seconds: 150,
        errors: ['tratar o conjunto como um texto só', 'hierarquizar as funções por valor'],
        correct: 2,
        options: [
          ['Os três materiais cumprem a mesma função, já que compartilham o tema da reciclagem.', 'Tema comum não implica função comum: cada material coloca um elemento diferente em destaque.', 'confundir tema com função'],
          ['Apenas o cartaz comunica de fato, porque é o único que pede uma ação concreta.', 'Informar e emocionar também são formas de comunicar; a campanha se apoia nas três.', 'hierarquizar funções por utilidade'],
          ['O infográfico predomina como referencial, o poema como poético e o cartaz como conativo, e a combinação amplia o alcance da campanha.', 'Cada material põe em destaque um elemento diferente — referente, mensagem e receptor — e o conjunto atinge quem responde melhor a dado, a forma ou a chamado direto.'],
          ['O poema é o material mais eficiente, porque a linguagem poética é mais persuasiva que a referencial.', 'Eficiência depende do público e do objetivo; não há hierarquia fixa entre funções.', 'atribuir superioridade a uma função'],
          ['O infográfico é metalinguístico, porque traduz números em linguagem visual.', 'Metalinguagem é a língua explicando a própria língua, não a tradução de dados em imagem.', 'estender metalinguagem a qualquer tradução de código'],
        ],
        explanation: 'A questão integra três conteúdos: função predominante, adequação ao gênero e estratégia de campanha. O ganho está na complementaridade, não na competição entre os materiais.',
      }),
      q({
        slug: 'q-linguagem-rec-1',
        stem: 'Em um manual, lê-se: "Pressione o botão lateral por três segundos para ligar o aparelho." A função predominante é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento de função em texto instrucional',
        seconds: 60,
        recovery: true,
        errors: ['ver imperativo e responder conativa automaticamente'],
        correct: 1,
        options: [
          ['Conativa, pelo uso do imperativo.', 'O imperativo aqui descreve um procedimento técnico, não persuade o leitor a agir por convencimento.', 'associar imperativo a persuasão'],
          ['Referencial, porque transmite uma informação objetiva sobre o funcionamento do aparelho.', 'O manual informa como o objeto funciona, em linguagem objetiva e verificável: o foco está no referente.'],
          ['Emotiva, porque orienta o usuário com cuidado.', 'Não há marca de subjetividade do emissor.', 'ler intenção afetiva sem marca'],
          ['Fática, porque estabelece contato com o usuário.', 'Não há teste ou manutenção de canal.', 'confundir instrução com contato'],
          ['Metalinguística, porque explica o uso de um código técnico.', 'Explicar um aparelho não é explicar a língua.', 'ampliar a metalinguagem'],
        ],
        explanation: 'Instruções técnicas usam imperativo, mas informam um procedimento: predomina a função referencial.',
      }),
    ],
  }),

  topic({
    slug: 'variacao-linguistica',
    name: 'Variação linguística',
    subject: 'lingua-portuguesa',
    area: 'linguagens',
    summary:
      'Entender que a língua varia com região, grupo social, situação e época — e que variedade diferente não é erro, mas adequação a um contexto.',
    difficulty: 'intro',
    minutes: 20,
    weight: 90,
    order: 4,
    related: ['funcoes-da-linguagem', 'generos-textuais-e-funcao-social'],
    skill: {
      slug: 'analisar-variacao-e-adequacao-linguistica',
      name: 'Analisar variação linguística e adequação ao contexto',
      description:
        'Identificar tipos de variação, avaliar adequação ao contexto de uso e reconhecer o preconceito linguístico como julgamento social, não gramatical.',
    },
    quick: `A língua nunca é uma coisa só. Ela varia por:

- **região** (variação diatópica): mandioca, macaxeira, aipim;
- **grupo social e escolaridade** (diastrática): a fala de um grupo profissional, de uma faixa etária, de uma comunidade;
- **situação** (diafásica): a mesma pessoa fala diferente em uma entrevista e num churrasco;
- **tempo** (diacrônica): "vossa mercê" virou "você" virou "cê".

**A ideia central:** o que existe é **adequação**, não superioridade. Uma variedade não é mais "certa" que a outra do ponto de vista linguístico — o que muda é o **prestígio social** que a sociedade atribui a ela.

**Preconceito linguístico** é julgar a pessoa pela variedade que ela fala. É um julgamento social disfarçado de correção gramatical.`,
    explanation: {
      title: 'Variedade, norma e adequação — três coisas diferentes',
      body: `### 1. Norma-padrão não é "a língua certa"

A norma-padrão é uma variedade **codificada** em gramáticas e dicionários, usada em contextos formais e de escrita pública. Ela tem enorme utilidade prática — acesso a emprego, documentos, universidade — e por isso a escola a ensina.

Mas "codificada" não é "natural" nem "superior". Estruturas fora do padrão seguem regras próprias, consistentes e previsíveis. "Nós vai" não é ausência de regra: é outra regra de concordância, que funciona em uma variedade específica.

### 2. Adequação: a pergunta certa

Em vez de "isso é certo ou errado?", pergunte: **isso é adequado a esta situação?**

- Numa redação de vestibular, a norma-padrão é exigida — usá-la é adequação, não submissão.
- Numa mensagem para um amigo, escrever na norma-padrão rígida soa artificial.
- Numa peça de teatro sobre o sertão, colocar um personagem falando como um manual seria um erro de verossimilhança.

### 3. Os quatro tipos, com exemplo

- **Diatópica (espaço):** "sinaleiro", "semáforo", "farol" para o mesmo objeto.
- **Diastrática (grupo):** vocabulário técnico de uma profissão; gírias de uma faixa etária.
- **Diafásica (situação):** a mesma pessoa dizendo "bom dia, senhor" e "e aí, cara".
- **Diacrônica (tempo):** formas que caíram em desuso e sentidos que mudaram.

### 4. O que as questões costumam cobrar

Quase sempre uma destas três coisas:

1. **Identificar o tipo** de variação presente em um texto.
2. **Avaliar a adequação** de uma variedade a uma situação descrita.
3. **Reconhecer o preconceito linguístico** e recusar a leitura que trata variedade como deficiência.

Nunca escolha a alternativa que chama uma variedade de "erro", "pobreza de vocabulário" ou "falta de instrução". Além de linguisticamente falsa, é a leitura que as provas rejeitam.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — a mesma pessoa, dois registros',
        body: `**Situação:** uma técnica de enfermagem escreve no prontuário: "Paciente relata cefaleia intensa há 48 horas." Depois, ao telefone com a irmã: "Ele tá com uma dor de cabeça braba desde anteontem."

**Análise:** não há duas pessoas nem dois níveis de instrução — há **uma** pessoa em **duas situações**.

- Prontuário: registro formal, público e técnico → norma-padrão e vocabulário especializado.
- Telefonema: registro informal, privado → variedade coloquial.

**Tipo de variação:** diafásica (situacional).

**Conclusão que a prova cobra:** a competência está em **transitar** entre registros, não em usar só um deles.`,
      },
      {
        title: 'Exemplo resolvido 2 — quando o "erro" é caracterização',
        body: `**Trecho autoral:** "— Nós pega o caminho velho, que ninguém num passa por lá."

**Leitura equivocada:** "o autor errou a concordância."

**Leitura correta:** o desvio da norma-padrão está na **fala do personagem**, entre travessões. É recurso de caracterização: constrói origem, região e classe social sem precisar descrevê-las.

**Repare também:** "num passa" e a dupla negação seguem um padrão regular da variedade representada — não são aleatórios.

**Se a questão perguntar o efeito:** produzir verossimilhança e aproximar o leitor do universo do personagem.`,
      },
    ],
    mistakes: `**1. Tratar variedade não padrão como erro.**
Do ponto de vista linguístico, não é erro: é outra regra. O que muda é o prestígio social, e prova nenhuma premia essa confusão.

**2. Confundir variação diastrática com diafásica.**
Diastrática é diferença **entre grupos**; diafásica é diferença **de situação** dentro da fala da mesma pessoa. Um mesmo falante muda de registro sem mudar de grupo social.

**3. Achar que defender a variação é dispensar a norma-padrão.**
Não é. Dominar a norma-padrão amplia o repertório e o acesso. O que se recusa é usá-la como régua para medir o valor das pessoas.`,
    selfCheck: [
      'Qual é a diferença entre variação diastrática e variação diafásica?',
      'Por que dizer que uma variedade é "errada" é um julgamento social, e não linguístico?',
      'Em que situações a norma-padrão é a escolha adequada, e por quê?',
    ],
    questions: [
      q({
        slug: 'q-var-1',
        stem: 'Em diferentes regiões do Brasil, o mesmo alimento é chamado de mandioca, macaxeira ou aipim. Esse fenômeno é um exemplo de variação:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'classificação do tipo de variação',
        seconds: 60,
        errors: ['confundir região com grupo social'],
        correct: 2,
        options: [
          ['Diafásica, ligada à situação de uso.', 'A mudança não depende de o falante estar em situação formal ou informal.', 'trocar espaço por situação'],
          ['Diacrônica, ligada à passagem do tempo.', 'As três formas convivem hoje, em lugares diferentes.', 'trocar espaço por tempo'],
          ['Diatópica, ligada à distribuição geográfica dos falantes.', 'O que determina a escolha do termo é a região do falante: é variação no espaço.'],
          ['Diastrática, ligada ao grupo social do falante.', 'Pessoas de qualquer grupo social usam o termo da sua região.', 'trocar espaço por grupo'],
          ['Não é variação, e sim erro de vocabulário em duas das três formas.', 'As três formas são legítimas e usadas por comunidades inteiras de falantes.', 'tratar variedade como erro'],
        ],
        explanation: 'Variação no espaço geográfico é diatópica. As três palavras são igualmente corretas nas suas regiões.',
      }),
      q({
        slug: 'q-var-2',
        stem: 'Um estudante escreve, em uma mensagem para o grupo da turma: "gente, alguém tem o resumo de bio? tô sem nada aqui 😭". Na semana seguinte, redige em uma prova: "A ausência de material de apoio prejudicou a preparação da turma."\n\nA comparação entre os dois textos indica que o estudante:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação do conceito de adequação a contextos reais',
        seconds: 100,
        errors: ['achar que um dos registros é inferior'],
        correct: 3,
        options: [
          ['Escreve corretamente apenas na prova, e de forma inadequada no grupo.', 'A mensagem é adequada ao seu contexto: informal, rápida e entre iguais.', 'aplicar a norma formal a todo contexto'],
          ['Domina a norma-padrão, mas perde qualidade linguística no ambiente digital.', 'Não há perda: há troca de registro conforme a situação.', 'ver adequação como deterioração'],
          ['Usa duas variedades regionais distintas.', 'A diferença não é de região, e sim de situação de uso.', 'confundir os tipos de variação'],
          ['Adequa o registro à situação, o que demonstra competência linguística.', 'Transitar entre registros conforme o contexto — informal com colegas, formal na prova — é exatamente o que se espera de um falante competente.'],
          ['Deveria usar o mesmo registro nos dois casos para manter coerência.', 'Manter registro único em contextos opostos produziria textos inadequados nos dois lados.', 'confundir coerência com uniformidade'],
        ],
        explanation: 'Competência linguística é justamente saber mudar de registro conforme a situação — variação diafásica bem resolvida.',
        strategy: 'Pergunte sempre: adequado a quem, onde e para quê?',
      }),
      q({
        slug: 'q-var-3',
        stem: 'Leia o comentário publicado sob um vídeo: "Não aguento mais ouvir gente falando ‘nóis vai’. Isso é falta de estudo, tinha que ter aula de português obrigatória para adulto."\n\nA análise linguística adequada desse comentário indica que ele:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'identificação de preconceito linguístico em um enunciado real',
        seconds: 110,
        errors: ['concordar com a premissa do comentário'],
        correct: 0,
        options: [
          ['Expressa preconceito linguístico, ao converter uma diferença entre variedades em julgamento sobre as pessoas.', 'A concordância "nóis vai" segue uma regra regular de outra variedade. Chamá-la de "falta de estudo" transfere para a pessoa um julgamento que é social, não gramatical.'],
          ['Está tecnicamente correto, já que a concordância mencionada contraria a gramática.', 'Contrariar a norma-padrão não torna uma construção agramatical: ela é sistemática dentro de sua variedade.', 'tomar norma-padrão como a única gramática'],
          ['Defende a variação linguística ao pedir mais acesso ao ensino.', 'O pedido de "aula obrigatória" aparece como punição, não como ampliação de repertório.', 'ler intenção inclusiva onde há julgamento'],
          ['Trata de variação diacrônica, já que a forma citada é antiga.', 'A forma é atual e corrente, não histórica.', 'classificar o tipo errado de variação'],
          ['É apenas uma opinião sobre estilo, sem implicações sociais.', 'Julgar a fala é uma das formas mais comuns de julgar origem e classe social.', 'minimizar o efeito social do julgamento'],
        ],
        explanation: 'Preconceito linguístico é o julgamento de pessoas a partir da variedade que falam, apresentado como se fosse correção gramatical.',
        detail: 'Ampliar o repertório de alguém para a norma-padrão é legítimo e útil. O problema está em tratar a variedade de origem como defeito.',
      }),
      q({
        slug: 'q-var-4',
        stem: 'Considere duas afirmações:\n\nI. Ensinar a norma-padrão amplia as possibilidades de participação social do estudante.\nII. Variedades linguísticas de menor prestígio são sistemas incompletos, com menos regras que a norma-padrão.\n\nÉ correto o que se afirma em:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'distinção entre valor social e estrutura linguística',
        seconds: 120,
        errors: ['rejeitar as duas por parecerem opostas'],
        correct: 4,
        options: [
          ['I e II.', 'I é correta, mas II é falsa: nenhuma variedade tem "menos regras" — tem regras diferentes.', 'aceitar a hierarquia entre variedades'],
          ['II, apenas.', 'II é justamente a afirmação incorreta.', 'inverter a avaliação'],
          ['Nenhuma das duas.', 'I está correta: o domínio da norma-padrão amplia o acesso a esferas formais.', 'excesso de recusa'],
          ['I e II, desde que se considere o contexto escolar.', 'Contexto algum torna II verdadeira do ponto de vista linguístico.', 'relativizar um erro factual'],
          ['I, apenas.', 'Dominar a norma-padrão amplia oportunidades — isso é verdade social. Já a ideia de variedade "incompleta" não se sustenta: toda variedade é um sistema regular e completo.'],
        ],
        explanation: 'As duas afirmações parecem opostas, mas só a primeira é verdadeira. Reconhecer o valor social da norma-padrão não exige rebaixar as demais variedades.',
      }),
      q({
        slug: 'q-var-5',
        stem: 'Uma prefeitura vai publicar uma cartilha sobre prevenção de dengue para moradores de bairros com baixa escolaridade formal. A equipe discute a linguagem a ser usada.\n\nA decisão mais consistente com os estudos de variação linguística é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre variação, adequação e finalidade comunicativa em política pública',
        seconds: 150,
        errors: ['confundir simplificação com infantilização', 'igualar clareza a informalidade'],
        correct: 1,
        options: [
          ['Usar a norma-padrão em sua forma mais formal, para garantir a autoridade do documento.', 'Autoridade que não é compreendida não protege ninguém; o texto perderia a função.', 'privilegiar prestígio sobre eficácia'],
          ['Escrever em português claro, com frases curtas e vocabulário cotidiano, mantendo a precisão das informações de saúde.', 'A finalidade é fazer a informação chegar. Isso pede clareza e vocabulário partilhado, sem abrir mão da precisão técnica onde ela salva vidas.'],
          ['Reproduzir a variedade falada no bairro, inclusive nos desvios de concordância, para criar identificação.', 'Imitar a fala do leitor em documento público costuma soar condescendente e não aumenta a compreensão.', 'confundir aproximação com imitação'],
          ['Publicar duas versões, uma "certa" e outra "simplificada", indicando qual é a correta.', 'Rotular uma versão como a correta reinstala a hierarquia que a decisão deveria evitar.', 'hierarquizar as versões'],
          ['Evitar qualquer termo técnico, substituindo todos por aproximações populares.', 'Alguns termos técnicos precisam aparecer: o caminho é explicá-los, não apagá-los.', 'trocar precisão por simplificação'],
        ],
        explanation: 'A questão integra adequação ao público, função do gênero e ética da comunicação pública: clareza sem imitação e sem perda de precisão.',
        detail: 'Escrever com clareza não é escrever "errado de propósito" nem "falar como o povo": é escolher palavras que o leitor use e organizar a informação na ordem em que ele precisa dela.',
      }),
      q({
        slug: 'q-var-rec-1',
        stem: 'A expressão "vossa mercê", que deu origem a "você", é um exemplo de variação linguística:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de variação no tempo',
        seconds: 60,
        recovery: true,
        errors: ['confundir tempo com região'],
        correct: 2,
        options: [
          ['Diatópica.', 'A mudança não se deve à região do falante.', 'trocar tempo por espaço'],
          ['Diastrática.', 'A mudança atravessou todos os grupos sociais.', 'trocar tempo por grupo'],
          ['Diacrônica.', 'A forma mudou ao longo do tempo: "vossa mercê" → "vosmecê" → "você". É variação histórica.'],
          ['Diafásica.', 'Não se trata de mudança conforme a situação de fala.', 'trocar tempo por situação'],
          ['Não é variação, e sim abreviação incorreta.', 'A redução foi um processo histórico regular da língua, não um erro.', 'tratar mudança histórica como erro'],
        ],
        explanation: 'Mudanças ao longo do tempo caracterizam a variação diacrônica.',
      }),
    ],
  }),

  topic({
    slug: 'recursos-expressivos',
    name: 'Recursos expressivos',
    subject: 'lingua-portuguesa',
    area: 'linguagens',
    summary:
      'Reconhecer figuras de linguagem e recursos sonoros pelo efeito que produzem no texto, e não apenas pelo nome que recebem.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 84,
    order: 5,
    prerequisites: ['interpretacao-e-inferencia'],
    related: ['literatura-brasileira'],
    skill: {
      slug: 'relacionar-recurso-expressivo-e-efeito-de-sentido',
      name: 'Relacionar recurso expressivo e efeito de sentido',
      description:
        'Identificar figuras e recursos sonoros e explicar o efeito que produzem sobre a leitura, em textos literários e cotidianos.',
    },
    quick: `Figura de linguagem não é enfeite: é **escolha que produz efeito**. As mais cobradas:

**De palavra**
- **Metáfora:** comparação sem conectivo — "meu tempo é um rio".
- **Metonímia:** troca por proximidade — "li Machado" (a obra pelo autor).
- **Catacrese:** metáfora já gasta — "braço da cadeira".

**De pensamento**
- **Ironia:** dizer o oposto do que se quer fazer entender.
- **Antítese:** ideias opostas lado a lado — "amor e ódio".
- **Paradoxo:** oposição na mesma ideia — "é ferida que dói e não se sente".
- **Eufemismo:** suavizar — "partiu" por "morreu".
- **Hipérbole:** exagerar — "chorei um rio".
- **Prosopopeia:** dar traço humano ao não humano — "o vento reclamava".

**De som**
- **Aliteração** (consoantes) e **assonância** (vogais) repetidas.
- **Onomatopeia:** imitação de som.

**A pergunta da prova quase nunca é "qual o nome disto?".** É "qual efeito isto produz?".`,
    explanation: {
      title: 'Do nome ao efeito: como as questões realmente cobram figuras',
      body: `### 1. Antítese, paradoxo e ironia: o trio que mais confunde

- **Antítese:** dois termos opostos **coexistem** e fazem sentido — "vida e morte", "guerra e paz". Nada de estranho: são polos contrastados.
- **Paradoxo:** a oposição está **dentro da mesma ideia**, e ela desafia a lógica — "é solidão que acompanha". Não dá para separar em dois polos.
- **Ironia:** o dito e o pretendido são **opostos**, e o contexto denuncia — dizer "que sorte a minha" ao perder o ônibus.

### 2. Metáfora x metonímia

- **Metáfora** funciona por **semelhança**: "aquele advogado é uma raposa" (esperteza).
- **Metonímia** funciona por **contiguidade**: parte pelo todo, autor pela obra, marca pelo produto, continente pelo conteúdo — "bebi duas taças".

Teste rápido: se existe uma relação real de vizinhança, pertencimento ou origem, é metonímia; se é uma transferência por parecença, é metáfora.

### 3. Recursos sonoros têm função, não só nome

Aliteração e assonância criam **ritmo** e podem **imitar** o que descrevem: sons sibilantes sugerindo vento, oclusivas sugerindo impacto. Numa questão, a resposta correta costuma ligar o som ao sentido do trecho.

### 4. Fora da literatura

Publicidade, jornalismo e conversa cotidiana estão cheios de figuras:

- manchete com metonímia — "o Planalto respondeu";
- slogan com hipérbole — "o melhor do mundo";
- comentário com ironia — "excelente ideia, como sempre";
- eufemismo institucional — "reestruturação do quadro" por "demissões".

Perceber o eufemismo institucional é leitura crítica: ele suaviza para reduzir a reação.

### 5. Método para responder

1. Localize o trecho exato citado no enunciado.
2. Descreva com suas palavras o que ele faz com o leitor.
3. Só então procure o nome entre as alternativas.
4. Descarte alternativas que dão o nome certo mas descrevem o efeito errado — elas existem e são a armadilha mais comum.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — o nome certo, o efeito errado',
        body: `**Trecho:** "A cidade acordou de mau humor: buzinas, gritos, um sol que castigava."

**Pergunta típica:** qual recurso predomina e que efeito produz?

**Análise:** "a cidade acordou de mau humor" e "um sol que castigava" atribuem comportamento humano a entidades não humanas → **prosopopeia** (personificação).

**Efeito:** transfere para o ambiente o estado de espírito de quem observa; o leitor sente o incômodo antes de qualquer explicação.

**A armadilha:** uma alternativa dirá "prosopopeia, que serve para descrever objetivamente o clima". O nome está certo, mas o efeito, não — personificar é o oposto de descrever objetivamente.`,
      },
      {
        title: 'Exemplo resolvido 2 — eufemismo em nota oficial',
        body: `**Trecho de nota autoral:** "A empresa comunica a otimização do seu quadro funcional, com a consequente descontinuidade de 300 postos."

**Traduzindo:** 300 pessoas foram demitidas.

**Recurso:** **eufemismo** — "otimização" e "descontinuidade" substituem "corte" e "demissão".

**Efeito:** reduz a carga negativa, distancia a empresa da decisão e dificulta a reação de quem lê.

**Por que isso cai:** identificar eufemismo em texto institucional é leitura crítica de linguagem pública — o recurso não está a serviço da beleza, e sim do controle da repercussão.`,
      },
    ],
    mistakes: `**1. Confundir antítese com paradoxo.**
Antítese contrasta dois termos que coexistem sem contradição lógica. Paradoxo junta, na mesma ideia, o que a lógica separa.

**2. Chamar toda comparação de metáfora.**
Se o conectivo comparativo aparece ("como", "tal qual"), é comparação (símile). Metáfora dispensa o conectivo.

**3. Nomear a figura e parar por aí.**
A alternativa correta quase sempre inclui o **efeito**. Nome certo com efeito errado é alternativa errada.`,
    selfCheck: [
      'Como você distingue metáfora de metonímia em um caso concreto?',
      'Qual é a diferença entre antítese e paradoxo?',
      'Por que identificar um eufemismo em uma nota oficial é um ato de leitura crítica?',
    ],
    questions: [
      q({
        slug: 'q-rec-1',
        stem: 'Em "o relógio da sala roubava minhas horas em silêncio", o recurso expressivo predominante é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de figura de linguagem',
        seconds: 70,
        errors: ['confundir personificação com metáfora simples'],
        correct: 0,
        options: [
          ['Prosopopeia, que atribui ação humana a um objeto.', 'Roubar é ação humana e intencional, atribuída a um relógio: é personificação.'],
          ['Metonímia, que substitui o todo pela parte.', 'Não há substituição por contiguidade: o relógio continua sendo o relógio.', 'aplicar metonímia sem relação de vizinhança'],
          ['Hipérbole, que exagera uma quantidade.', 'Não há exagero numérico; há atribuição de conduta.', 'confundir efeito de intensidade com exagero'],
          ['Eufemismo, que suaviza uma ideia desagradável.', 'A construção intensifica o incômodo, em vez de suavizá-lo.', 'inverter o efeito'],
          ['Antítese, que aproxima ideias opostas.', 'Não há par de opostos no trecho.', 'ver oposição inexistente'],
        ],
        explanation: 'Atribuir intenção e ação humanas a um objeto caracteriza prosopopeia (personificação).',
      }),
      q({
        slug: 'q-rec-2',
        stem: 'Um comunicado de uma escola informa: "Em razão de um reordenamento pedagógico, o programa de reforço passará por um período de suspensão temporária."\n\nAo reconhecer o recurso usado e seu efeito, um leitor crítico conclui que o texto:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação da análise de recursos a um texto institucional',
        seconds: 110,
        errors: ['ler o comunicado literalmente'],
        correct: 2,
        options: [
          ['Usa hipérbole para dar dimensão ao problema.', 'Não há exagero: o texto faz o contrário, reduz a dimensão do fato.', 'inverter o sentido do recurso'],
          ['Usa metáfora para tornar a comunicação mais didática.', 'Não há transferência por semelhança em "reordenamento" ou "suspensão temporária".', 'nomear figura ausente'],
          ['Usa eufemismo, o que suaviza a informação de que o reforço foi interrompido.', '"Reordenamento pedagógico" e "suspensão temporária" substituem "corte" e "fim". O recurso reduz a carga negativa e a chance de reação das famílias.'],
          ['Usa ironia para criticar a própria decisão administrativa.', 'Não há descompasso entre dito e pretendido: a nota adere ao que comunica.', 'ver ironia sem marca de contraste'],
          ['Não usa recurso expressivo, por ser um texto administrativo.', 'Textos administrativos usam recursos expressivos com frequência — inclusive para controlar repercussão.', 'supor neutralidade do gênero'],
        ],
        explanation: 'O eufemismo institucional troca palavras de impacto por termos técnicos e vagos. Reconhecê-lo é ler o que a nota evita dizer.',
        strategy: 'Traduza a frase para o português mais direto possível e compare com o original: a diferença revela o recurso.',
      }),
      q({
        slug: 'q-rec-3',
        stem: 'Leia os versos autorais:\n\n"Sussurra o sereno na serra sem sono,\nsilêncio de seda sobre o sertão."\n\nA repetição sonora presente nos versos:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'relação entre recurso sonoro e efeito de leitura',
        seconds: 110,
        errors: ['identificar o recurso sem relacioná-lo ao sentido'],
        correct: 1,
        options: [
          ['É assonância e produz efeito de aceleração na leitura.', 'A repetição é de consoantes, não de vogais, e o efeito é de suavidade, não de aceleração.', 'trocar consoante por vogal'],
          ['É aliteração e sugere, pelo próprio som, a suavidade descrita nos versos.', 'A repetição do /s/ produz um som contínuo e sibilante que imita sussurro e silêncio: a sonoridade reforça o sentido.'],
          ['É onomatopeia, pois reproduz literalmente o ruído do vento.', 'Onomatopeia é palavra criada para imitar som ("tic-tac"); aqui a imitação é indireta, pela escolha das consoantes.', 'confundir sugestão sonora com onomatopeia'],
          ['É paronomásia, pois aproxima palavras de sentidos opostos.', 'Paronomásia aproxima palavras parecidas no som e diferentes no sentido, e não é o recurso central aqui.', 'nomear recurso secundário'],
          ['É rima interna e serve apenas para marcar o ritmo, sem relação com o sentido.', 'A sonoridade está diretamente ligada ao que os versos descrevem.', 'separar som e sentido'],
        ],
        explanation: 'Aliteração é a repetição de consoantes. Aqui, o /s/ contínuo imita sussurro e silêncio — som e sentido trabalham juntos.',
      }),
      q({
        slug: 'q-rec-4',
        stem: 'Compare os dois trechos:\n\nI. "Naquela casa havia amor e havia briga, na mesma mesa."\nII. "Era um silêncio tão cheio de vozes que ninguém conseguia dormir."\n\nOs recursos predominantes em I e II são, respectivamente:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'distinção entre antítese e paradoxo',
        seconds: 130,
        errors: ['tratar os dois como antítese'],
        correct: 3,
        options: [
          ['Antítese e antítese.', 'Em II a contradição está dentro da mesma ideia — silêncio cheio de vozes —, o que caracteriza paradoxo.', 'ignorar a contradição interna'],
          ['Paradoxo e antítese.', 'A ordem está invertida: I contrapõe dois termos que coexistem; II é o que desafia a lógica.', 'inverter as figuras'],
          ['Metáfora e hipérbole.', 'Nenhum dos trechos se organiza por semelhança ou por exagero numérico.', 'nomear figuras ausentes'],
          ['Antítese e paradoxo.', 'Em I, "amor" e "briga" são opostos que convivem sem contradição lógica: antítese. Em II, "silêncio cheio de vozes" contradiz a si mesmo dentro da mesma ideia: paradoxo.'],
          ['Ironia e prosopopeia.', 'Não há inversão entre dito e pretendido nem atribuição de traço humano a algo não humano.', 'escolher figuras sem marca no texto'],
        ],
        explanation: 'Antítese contrasta dois termos que coexistem. Paradoxo instala a contradição dentro da própria ideia.',
        detail: 'Teste: se você consegue separar a frase em dois polos que fazem sentido isoladamente, é antítese. Se a separação destrói a ideia, é paradoxo.',
      }),
      q({
        slug: 'q-rec-5',
        stem: 'Uma marca de água mineral lança a campanha: "Beba a montanha." Em entrevista, a agência afirma que a frase "traduz pureza e origem em duas palavras".\n\nA análise mais consistente do recurso e do seu funcionamento publicitário é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre figura de linguagem, construção de sentido e estratégia publicitária',
        seconds: 150,
        errors: ['ficar só no nome da figura', 'confundir metonímia com metáfora'],
        correct: 0,
        options: [
          ['Há metonímia — a montanha pela água que dela vem — e o recurso transfere para o produto os atributos do lugar de origem.', 'A relação é de origem e contiguidade, não de semelhança. Ao nomear a fonte no lugar do produto, a campanha empresta à água a pureza atribuída à montanha.'],
          ['Há metáfora, pois a água é comparada à montanha por semelhança de pureza.', 'Não há comparação por parecença: a montanha é a origem real da água, o que caracteriza metonímia.', 'confundir contiguidade com semelhança'],
          ['Há hipérbole, pois seria impossível beber uma montanha.', 'A impossibilidade literal é consequência da metonímia, não exagero quantitativo.', 'confundir impossibilidade com exagero'],
          ['Há catacrese, pois falta na língua uma palavra específica para essa água.', 'A palavra "água" existe e é corrente; não há lacuna lexical a preencher.', 'aplicar catacrese sem lacuna'],
          ['Não há figura: trata-se apenas de um slogan curto e direto.', 'A frase só funciona porque opera uma substituição figurada; lida ao pé da letra, não faz sentido.', 'negar a figura por brevidade do texto'],
        ],
        explanation: 'A questão integra três camadas: identificar a metonímia, explicar seu funcionamento por contiguidade e reconhecer o efeito publicitário de transferir atributos da origem para o produto.',
      }),
      q({
        slug: 'q-rec-rec-1',
        stem: 'Na frase "esperei uma eternidade na fila do banco", o recurso expressivo utilizado é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de hipérbole',
        seconds: 55,
        recovery: true,
        errors: ['confundir exagero com metáfora'],
        correct: 4,
        options: [
          ['Eufemismo.', 'Eufemismo suaviza; a frase faz o contrário.', 'inverter o efeito'],
          ['Metonímia.', 'Não há substituição por contiguidade.', 'aplicar metonímia sem relação de vizinhança'],
          ['Antítese.', 'Não há par de opostos.', 'ver oposição inexistente'],
          ['Prosopopeia.', 'Nada não humano recebe traço humano.', 'confundir com personificação'],
          ['Hipérbole.', 'O exagero intencional ("uma eternidade") intensifica a sensação de espera.'],
        ],
        explanation: 'Hipérbole é o exagero deliberado usado para intensificar uma impressão.',
      }),
    ],
  }),

  topic({
    slug: 'literatura-brasileira',
    name: 'Literatura brasileira em contexto',
    subject: 'literatura',
    area: 'linguagens',
    summary:
      'Relacionar obra, momento histórico e projeto estético — lendo os movimentos literários brasileiros como respostas a questões do seu tempo.',
    difficulty: 'intermediate',
    minutes: 25,
    weight: 82,
    order: 1,
    related: ['recursos-expressivos', 'interpretacao-e-inferencia'],
    skill: {
      slug: 'relacionar-obra-contexto-e-projeto-estetico',
      name: 'Relacionar obra, contexto histórico e projeto estético',
      description:
        'Identificar traços de cada movimento literário brasileiro e explicá-los como resposta a um contexto, sem reduzir a obra a uma lista de características.',
    },
    quick: `Movimento literário não é etiqueta: é um **projeto** — um grupo de autores respondendo a uma questão do seu tempo.

| Movimento | Questão central | Traço reconhecível |
| --- | --- | --- |
| **Barroco** | fé e razão em conflito | antíteses, paradoxos, linguagem rebuscada |
| **Arcadismo** | excesso barroco | simplicidade, vida no campo, pastores |
| **Romantismo** | que país é este? | herói idealizado, natureza nacional, subjetividade |
| **Realismo/Naturalismo** | a sociedade se examina | análise crítica, ironia, determinismo (no Naturalismo) |
| **Parnasianismo** | forma acima de tudo | rigor métrico, culto ao verso perfeito |
| **Simbolismo** | além do visível | musicalidade, sugestão, sinestesia |
| **Pré-Modernismo** | o Brasil real e esquecido | denúncia social, linguagem mais direta |
| **Modernismo (1922)** | romper com o importado | liberdade formal, língua brasileira, humor |
| **Geração de 30** | o país desigual | romance social e regional |
| **Geração de 45 em diante** | o rigor volta | contenção, experimento, densidade |

**O que a prova cobra:** ligar um trecho ao seu projeto estético **pela evidência do texto**, não pela data decorada.`,
    explanation: {
      title: 'Ler o trecho e chegar ao movimento, sem decorar datas',
      body: `### 1. O que procurar no texto

Antes de pensar em nome de escola literária, responda três perguntas sobre o trecho:

1. **Como o texto trata a linguagem?** Rebuscada e cheia de oposições? Contida e simples? Livre, com marcas de fala brasileira?
2. **Como trata o sujeito?** Idealizado e sofredor? Analisado com distância crítica? Fragmentado?
3. **Como trata o Brasil?** Como paisagem exuberante? Como problema social? Como material a ser reinventado?

### 2. Romantismo x Realismo — o par mais cobrado

- **Romantismo:** idealiza. O amor é absoluto, a mulher é etérea, o indígena é herói nacional, a natureza é grandiosa e nacional. O narrador está do lado do sentimento.
- **Realismo:** examina. O casamento aparece como arranjo social, o herói tem falhas mesquinhas, o narrador ironiza e o leitor é convidado a desconfiar.

Se o trecho **eleva**, provavelmente é romântico. Se **desmonta**, provavelmente é realista.

### 3. Modernismo: liberdade com projeto

A Semana de 1922 não foi só "escrever sem regra". O projeto tinha alvo: substituir o modelo europeu importado por uma expressão brasileira — inclusive na sintaxe, no vocabulário e no humor. Daí o verso livre, o poema-piada, a valorização do falar cotidiano e a releitura irônica da tradição.

A **Geração de 30** desdobrou isso no romance: seca, migração, engenho, cidade grande, desigualdade — o país como problema concreto.

### 4. Um erro estratégico comum

Tratar movimentos como caixas estanques. Autores atravessam fases, e obras misturam traços. A prova costuma pedir o traço **predominante** no trecho apresentado, com justificativa textual — não a biografia do autor.

### 5. Como responder

1. Leia o trecho e descreva o que ele faz.
2. Procure marcas de linguagem: rebuscamento, ironia, verso livre, musicalidade.
3. Relacione com a questão do tempo a que aquele projeto respondia.
4. Rejeite alternativas que só citem datas ou nomes sem sustentação no texto.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — dois olhares sobre o mesmo casamento',
        body: `**Trecho A (autoral, inspirado no projeto romântico):** "Ela era pura como a manhã, e ele juraria, diante de Deus e do mundo, um amor que a morte não desfaria."

**Trecho B (autoral, inspirado no projeto realista):** "Casaram-se. Ele ganhou o dote; ela, o sobrenome. Ambos declararam-se felizes, o que era conveniente e quase verdadeiro."

**Análise:**

- A **eleva** o sentimento ao absoluto, com adjetivação idealizante ("pura", "que a morte não desfaria") → traços do **Romantismo**.
- B **desmonta** o mesmo evento em interesses e conveniências, com ironia do narrador ("quase verdadeiro") → traços do **Realismo**.

**O que provou:** o tratamento do sentimento e a posição do narrador — não a data.`,
      },
      {
        title: 'Exemplo resolvido 2 — reconhecer o projeto modernista em um poema',
        body: `**Poema autoral curto:**

"No bonde da manhã
o cobrador anuncia o Brasil:
— Olha o troco, cidadão!
E ninguém olha."

**Marcas:**
- verso livre, sem métrica fixa nem rima;
- cena urbana e cotidiana;
- fala brasileira coloquial incorporada ao poema;
- humor breve com crítica embutida.

**Projeto:** **Modernismo** — reinventar a poesia com material brasileiro e linguagem do dia a dia.

**Cuidado:** verso livre sozinho não prova modernismo. O que sustenta a leitura é o conjunto: cotidiano + fala + ironia + recusa da forma fixa.`,
      },
    ],
    mistakes: `**1. Responder pela data, não pelo texto.**
Saber que uma obra é de 1902 não diz qual traço predomina no trecho apresentado. A prova pede evidência textual.

**2. Achar que Realismo é "escrever o que aconteceu".**
Realismo não é reportagem: é análise crítica da sociedade, quase sempre com ironia e um narrador que não deixa o leitor confortável.

**3. Reduzir o Modernismo a "falta de regras".**
A liberdade formal servia a um projeto: criar uma expressão brasileira no lugar do modelo importado. Sem esse objetivo, a leitura fica vazia.`,
    selfCheck: [
      'Que marcas de um trecho ajudam a distinguir projeto romântico de projeto realista?',
      'Por que o verso livre, sozinho, não prova que um poema é modernista?',
      'Como a Geração de 30 desdobrou o projeto de 1922 no romance?',
    ],
    questions: [
      q({
        slug: 'q-lit-1',
        stem: 'A idealização da amada, o herói nacional construído a partir da figura indígena e a exuberância da natureza brasileira como símbolo de identidade são traços característicos do:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'associação entre traços e projeto estético',
        seconds: 70,
        errors: ['confundir Romantismo com Realismo'],
        correct: 3,
        options: [
          ['Realismo, que analisa criticamente a sociedade brasileira.', 'O Realismo desmonta idealizações em vez de construí-las.', 'inverter os projetos'],
          ['Parnasianismo, centrado no rigor formal do verso.', 'O parnasianismo prioriza a forma, não a construção de identidade nacional idealizada.', 'trocar projeto por forma'],
          ['Barroco, marcado pelo conflito entre fé e razão.', 'O conflito barroco é religioso e existencial, não de identidade nacional.', 'trocar época'],
          ['Romantismo, que buscava construir uma identidade nacional após a independência.', 'Idealização, natureza nacional e herói indígena compõem o projeto romântico brasileiro de fundar uma literatura própria.'],
          ['Modernismo, que valorizou elementos brasileiros na literatura.', 'O Modernismo também trata do Brasil, mas com ironia e recusa da idealização romântica.', 'confundir valorização com idealização'],
        ],
        explanation: 'O Romantismo brasileiro responde à pergunta "que país é este?" idealizando natureza, herói e sentimento.',
      }),
      q({
        slug: 'q-lit-2',
        stem: 'Leia o trecho autoral, escrito no espírito de um movimento literário brasileiro:\n\n"Anunciou a viagem com solenidade, arrumou as malas com esmero e chorou na despedida. Voltou na semana seguinte, e ninguém teve coragem de perguntar por quê — o que lhe conveio perfeitamente."\n\nO tratamento dado ao personagem aproxima o trecho do projeto:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'aplicação da leitura de projeto estético a um trecho novo',
        seconds: 120,
        errors: ['confundir narração em terceira pessoa com neutralidade'],
        correct: 2,
        options: [
          ['Romântico, pela intensidade emocional da despedida.', 'A emoção aparece para ser desmontada logo em seguida, não para ser celebrada.', 'parar na primeira frase'],
          ['Parnasiano, pelo cuidado com a construção das frases.', 'O trabalho formal do Parnasianismo é métrico e poético, não narrativo e irônico.', 'confundir esmero com escola'],
          ['Realista, pela análise irônica das aparências e das conveniências sociais.', 'O narrador expõe a distância entre o gesto e o interesse ("o que lhe conveio perfeitamente"): é a ironia analítica típica do projeto realista.'],
          ['Simbolista, pela sugestão de estados de alma.', 'Não há musicalidade nem sugestão do indizível; há observação social.', 'trocar análise por sugestão'],
          ['Modernista, pela liberdade formal do texto.', 'A prosa é convencional na sintaxe; a marca aqui é a ironia sobre a hipocrisia social.', 'confundir tom com forma'],
        ],
        explanation: 'A ironia do narrador diante da distância entre gesto público e interesse privado é assinatura do projeto realista.',
        strategy: 'Pergunte se o narrador eleva ou desmonta o personagem.',
      }),
      q({
        slug: 'q-lit-3',
        stem: 'Leia o poema autoral:\n\n"Chove.\nO guarda-chuva do vizinho é vermelho\ne o meu, emprestado.\nAssim mesmo a rua inteira cabe\nnesta calçada de dois metros."\n\nOs elementos formais e temáticos do poema permitem relacioná-lo ao:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'leitura de marcas formais para situar um projeto estético',
        seconds: 120,
        errors: ['identificar o movimento apenas pelo verso livre'],
        correct: 1,
        options: [
          ['Parnasianismo, pelo cuidado com a imagem visual.', 'Falta exatamente o que define o Parnasianismo: métrica rigorosa, rima e vocabulário elevado.', 'confundir imagem com forma fixa'],
          ['Modernismo, pela combinação de verso livre, cena cotidiana e linguagem coloquial.', 'Verso livre, cotidiano urbano, vocabulário simples e um fecho de humor discreto compõem o conjunto característico do projeto modernista.'],
          ['Romantismo, pela subjetividade do eu lírico.', 'Há subjetividade, mas sem idealização, natureza grandiosa ou exaltação sentimental.', 'tomar subjetividade por romantismo'],
          ['Simbolismo, pela musicalidade dos versos.', 'Não há aliterações, sinestesias ou sugestão do indizível.', 'atribuir musicalidade ausente'],
          ['Barroco, pelo contraste entre a rua e a calçada.', 'O contraste é de escala e observação, não conflito espiritual construído com antíteses.', 'confundir contraste com antítese barroca'],
        ],
        explanation: 'Não é só o verso livre: é o conjunto — cotidiano, coloquialismo, humor contido e recusa da forma fixa.',
      }),
      q({
        slug: 'q-lit-4',
        stem: 'Compare os dois projetos literários:\n\nI. Um grupo defende a forma perfeita, a métrica rigorosa e o vocabulário raro como valores centrais da poesia.\nII. Outro grupo defende a incorporação da fala brasileira, o verso livre e o humor como caminho para uma expressão nacional.\n\nA relação entre os dois pode ser descrita como:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre projetos estéticos e sua sucessão histórica',
        seconds: 130,
        errors: ['tratar o segundo como ausência de projeto'],
        correct: 4,
        options: [
          ['Complementar: os dois grupos defendem os mesmos valores por caminhos diferentes.', 'Os valores são opostos quanto à forma e à língua literária.', 'apagar o conflito'],
          ['Idêntica em objetivo, já que ambos buscam a beleza formal.', 'O segundo projeto recusa a beleza formal como critério central.', 'igualar critérios opostos'],
          ['Hierárquica: o segundo projeto é esteticamente superior ao primeiro.', 'Superioridade estética não é uma conclusão que a análise literária sustenta.', 'hierarquizar projetos'],
          ['Sem relação, por pertencerem a áreas distintas da literatura.', 'O segundo se constrói justamente em oposição ao primeiro: há relação direta.', 'negar a relação histórica'],
          ['De ruptura: o segundo projeto se constrói recusando os critérios do primeiro e propondo outros em seu lugar.', 'A relação entre o Parnasianismo e o Modernismo é de ruptura deliberada: a recusa da métrica, da rima e do vocabulário elevado é parte do programa modernista, e no lugar deles entram a fala brasileira e o verso livre.'],
        ],
        explanation: 'Movimentos se definem também pelo que recusam. O Modernismo se constitui em oposição explícita ao rigor parnasiano.',
      }),
      q({
        slug: 'q-lit-5',
        stem: 'Um professor propõe que a turma leia um romance da Geração de 30 sobre a seca no Nordeste ao lado de reportagens atuais sobre migração climática.\n\nA justificativa mais consistente para essa proposta é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre literatura, contexto histórico e leitura do presente',
        seconds: 150,
        errors: ['reduzir literatura a documento histórico', 'tratar a obra como profecia'],
        correct: 0,
        options: [
          ['A literatura da Geração de 30 elabora esteticamente a relação entre território, desigualdade e deslocamento, o que oferece uma chave de leitura para fenômenos atuais sem confundir obra e reportagem.', 'O romance social de 30 não é reportagem: é elaboração estética de um problema. Colocá-lo ao lado de textos jornalísticos ilumina permanências históricas e, ao mesmo tempo, evidencia o que a linguagem literária faz que o jornalismo não faz.'],
          ['O romance descreve exatamente os mesmos fatos das reportagens, o que comprova a veracidade da obra.', 'A obra literária não precisa nem pretende ser verificada como notícia.', 'confundir literatura com documento'],
          ['A literatura deve ser lida apenas por seu valor estético, sem relação com contextos sociais.', 'Isolar a obra do contexto empobrece justamente o projeto da Geração de 30.', 'separar obra e contexto'],
          ['O romance antecipa acontecimentos futuros, funcionando como previsão social.', 'Literatura não é previsão; permanências sociais explicam a atualidade do tema.', 'tratar obra como profecia'],
          ['As reportagens tornam o romance dispensável, por trazerem dados mais atualizados.', 'Dado e elaboração estética cumprem funções diferentes e não se substituem.', 'hierarquizar os dois tipos de texto'],
        ],
        explanation: 'A questão integra projeto estético, contexto histórico e leitura crítica do presente — sem transformar o romance em documento nem em profecia.',
      }),
      q({
        slug: 'q-lit-rec-1',
        stem: 'A Semana de Arte Moderna de 1922 teve como um de seus objetivos centrais:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento do projeto modernista',
        seconds: 60,
        recovery: true,
        errors: ['reduzir o modernismo a ausência de regras'],
        correct: 3,
        options: [
          ['Restaurar a métrica clássica na poesia brasileira.', 'O movimento recusou a métrica fixa como critério de valor.', 'inverter o programa'],
          ['Consolidar o Romantismo como estética nacional.', 'O Romantismo já pertencia ao século anterior e foi objeto de crítica modernista.', 'trocar o movimento'],
          ['Eliminar qualquer referência ao Brasil na literatura.', 'O objetivo era o contrário: colocar o Brasil no centro da criação.', 'inverter o objeto'],
          ['Romper com os modelos europeus importados e construir uma expressão artística brasileira.', 'O programa de 1922 recusa a cópia do modelo estrangeiro e busca uma linguagem própria, com material e fala brasileiros.'],
          ['Substituir a literatura pela pintura como arte principal do país.', 'A Semana reuniu várias linguagens, sem hierarquia entre elas.', 'atribuir objetivo inexistente'],
        ],
        explanation: 'O projeto de 1922 recusa o modelo importado e busca uma expressão brasileira — na forma, na língua e nos temas.',
      }),
    ],
  }),
];

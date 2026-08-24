




export const LINGUAGENS_TOPICS = [
  {
    slug: 'interpretacao-e-inferencia',
    name: 'Interpretação e inferência',
    subjectSlug: 'lingua-portuguesa',
    areaSlug: 'linguagens',
    summary:
      'Separar o que o texto diz do que ele sugere, e reconhecer a intenção de quem escreveu.',
    difficulty: 'intro',
    estimatedMinutes: 15,
    curationWeight: 95,
    order: 1,
    related: ['generos-textuais-e-funcao-social'],
    skills: [
      {
        slug: 'identificar-informacao-explicita-e-implicita',
        name: 'Identificar informações explícitas, implícitas e intenção comunicativa',
        description:
          'Distinguir o que está escrito, o que é possível concluir com base no texto e o que é opinião de quem lê.',
      },
    ],
    content: [
      {
        slug: 'interpretacao-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `Todo texto tem três camadas:

- **Explícito**: está escrito com todas as letras. Dá para apontar com o dedo.
- **Implícito (inferência)**: não está escrito, mas o texto obriga a concluir. A pista está lá.
- **Extrapolação**: não está no texto nem é obrigatório concluir. É opinião de quem lê — e em prova, quase sempre é a armadilha.

A pergunta que resolve a maioria das questões: **"onde exatamente o texto me obriga a isso?"** Se você não consegue apontar a passagem, provavelmente está extrapolando.`,
      },
      {
        slug: 'interpretacao-explicacao',
        kind: 'explanation',
        title: 'Como funciona a inferência',
        depth: 'standard',
        order: 2,
        body: `### 1. Explícito x implícito

Leia: *"Ela guardou o guarda-chuva molhado atrás da porta e tirou os sapatos."*

- Explícito: o guarda-chuva estava molhado; ela tirou os sapatos.
- Implícito: **choveu** e ela **acabou de chegar da rua**. O texto não diz isso, mas obriga a concluir.
- Extrapolação: "ela estava atrasada", "ela mora sozinha". O texto não dá pista nenhuma disso.

### 2. A intenção comunicativa

Além do que o texto diz, existe **para que** ele foi escrito: informar, convencer, criticar, emocionar, instruir, vender. A intenção aparece em marcas concretas:

- **Escolha das palavras**: "manifestação" e "tumulto" descrevem o mesmo evento com julgamentos opostos.
- **O que foi omitido**: um texto que fala só dos benefícios de algo está tentando convencer, não informar.
- **Verbos e modo**: "é preciso", "deveríamos", "urge" indicam defesa de ponto de vista.
- **Ironia**: dizer o contrário do que se pensa, com uma pista de exagero ou contraste.

### 3. O método que funciona em prova

1. Leia o **comando** da questão antes do texto. Você lê procurando algo específico.
2. Leia o texto inteiro uma vez, sem parar em cada palavra.
3. Volte ao trecho que responde ao comando e **sublinhe**.
4. Elimine as alternativas que você **não consegue ancorar** em uma passagem.
5. Entre as duas que sobraram, escolha a que **não acrescenta nada** que o texto não garanta.

O passo 5 é o que mais muda resultado: em interpretação, a alternativa correta costuma ser a mais **modesta**, não a mais interessante.`,
      },
      {
        slug: 'interpretacao-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — inferência simples',
        order: 3,
        body: `**Texto:** "O restaurante que abriu na esquina tem sempre fila na porta. O antigo, que ficava do outro lado da rua, fechou em três meses."

**Pergunta:** o que se pode concluir?

**Raciocínio:**
- Explícito: um tem fila; o outro fechou em três meses.
- O texto coloca os dois lado a lado, o que sugere **comparação**.
- Inferência sustentada: o novo restaurante teve **mais movimento** que o antigo.
- Extrapolação (armadilha): "a comida do novo é melhor". O texto **não fala de qualidade**. Fila pode ser preço, novidade, localização.

**Resposta:** o novo teve mais procura. Nada além disso.`,
      },
      {
        slug: 'interpretacao-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — intenção do autor',
        order: 4,
        body: `**Texto:** "A nova ciclovia custou caro, tomou uma faixa de carros e, é claro, resolveu magicamente todos os problemas de mobilidade da cidade."

**Pergunta:** qual é a intenção do autor?

**Raciocínio:**
- "é claro" e "magicamente" são exageros — ninguém acredita que uma ciclovia resolve tudo.
- Quando alguém exagera de forma óbvia, está dizendo o **contrário** do que escreve: isso é **ironia**.
- A intenção é **criticar**, não elogiar nem informar.

**Cuidado:** a crítica é ao **discurso de que a ciclovia resolveria tudo**. Concluir que "o autor é contra ciclovias" já é extrapolação: ele critica o exagero, não necessariamente a obra.`,
      },
      {
        slug: 'interpretacao-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Responder com o que você sabe do assunto, não com o que o texto diz.**
Se você já conhece o tema, o cérebro completa lacunas sozinho. Em prova, isso faz você marcar uma alternativa verdadeira no mundo — mas ausente no texto. Teste: consigo apontar a linha?

**2. Escolher a alternativa mais forte.**
Alternativas com "sempre", "nunca", "todos", "comprova que" exigem que o texto garanta muito. Texto curto raramente garante tanto. A alternativa correta costuma usar "sugere", "indica", "aponta".

**3. Confundir o que o autor diz com o que um personagem diz.**
Em narrativas e reportagens, a opinião entre aspas é da **fonte**, não do autor. Perguntas sobre "o ponto de vista do autor" mudam de resposta se você trocar um pelo outro.`,
      },
      {
        slug: 'interpretacao-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Qual é a diferença entre uma **inferência** e uma **opinião sua** sobre o texto? Dê um exemplo de cada.
2. Que marcas concretas em um texto ajudam a perceber que o autor quer **convencer** e não apenas informar?
3. Por que a alternativa mais "forte" costuma estar errada em questões de interpretação?`,
      },
    ],
    questions: [
      {
        slug: 'q-interp-1',
        stem:
          'Leia o trecho:\n\n"Chegou em casa, tirou o casaco encharcado e só então percebeu que tinha deixado o celular no bolso."\n\nCom base apenas no que o texto permite concluir, é correto afirmar que:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'inferência a partir de pista textual',
        estimatedSeconds: 90,
        skillSlug: 'identificar-informacao-explicita-e-implicita',
        likelyErrors: ['extrapolação', 'leitura literal insuficiente'],
        options: [
          {
            label: 'A',
            text: 'A personagem estava na chuva antes de chegar em casa.',
            isCorrect: true,
            rationale:
              'O casaco "encharcado" é a pista. O texto não diz "choveu", mas obriga a concluir que houve contato com muita água antes de entrar — a leitura mais direta e sustentada.',
          },
          {
            label: 'B',
            text: 'A personagem perdeu o celular naquele dia.',
            rationale:
              'O texto diz que ela percebeu que o celular estava no bolso, ou seja, ele está com ela. Perder é o oposto do que o texto informa.',
            errorHint: 'leitura apressada do final da frase',
          },
          {
            label: 'C',
            text: 'A personagem estava atrasada para um compromisso.',
            rationale:
              'Nada no trecho menciona horário, pressa ou compromisso. É informação acrescentada por quem lê.',
            errorHint: 'extrapolação',
          },
          {
            label: 'D',
            text: 'A personagem não gosta de usar casaco.',
            rationale:
              'Tirar o casaco molhado ao chegar em casa é comportamento comum e não revela preferência alguma.',
            errorHint: 'inferência sobre personalidade sem pista',
          },
          {
            label: 'E',
            text: 'O celular da personagem parou de funcionar.',
            rationale:
              'O texto não menciona funcionamento do aparelho. Concluir isso exige uma cadeia de suposições que o trecho não sustenta.',
            errorHint: 'encadeamento de suposições',
          },
        ],
        explanation: {
          summary:
            '"Encharcado" é a única pista concreta e ela sustenta uma única conclusão obrigatória: houve contato com muita água antes de entrar.',
          detailed:
            'As demais alternativas acrescentam informações que o texto não garante (atraso, preferência, dano ao aparelho) ou contradizem o que está escrito (perder o celular). Em interpretação, a conclusão precisa estar ancorada em uma passagem que você consiga apontar.',
          strategy:
            'Para cada alternativa, pergunte: "qual palavra do texto me obriga a isso?". Se não houver palavra, elimine.',
          conceptRecap: 'Inferência tem âncora no texto. Extrapolação não tem.',
        },
      },
      {
        slug: 'q-interp-2',
        stem:
          'Uma placa em um parque público informa:\n\n"Recolha o que trouxe. A natureza agradece — e a próxima família também."\n\nA escolha de mencionar "a próxima família" cumpre qual função no texto?',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'função de escolha lexical em situação cotidiana',
        estimatedSeconds: 100,
        skillSlug: 'identificar-informacao-explicita-e-implicita',
        likelyErrors: ['confundir tema com função', 'ignorar o efeito pretendido'],
        options: [
          {
            label: 'A',
            text: 'Aproximar a consequência do descarte de uma situação concreta e imediata para quem lê.',
            isCorrect: true,
            rationale:
              'Falar de "natureza" é abstrato e distante; falar da "próxima família" transforma a consequência em algo visível e próximo, aumentando a chance de adesão.',
          },
          {
            label: 'B',
            text: 'Informar que o parque é destinado exclusivamente a famílias.',
            rationale:
              'A menção é um exemplo de quem virá depois, não uma regra de acesso. O texto não restringe o público.',
            errorHint: 'leitura literal de um exemplo como se fosse regra',
          },
          {
            label: 'C',
            text: 'Indicar que a limpeza do parque é responsabilidade da administração pública.',
            rationale:
              'O texto faz o oposto: atribui a responsabilidade a quem trouxe o material ("recolha o que trouxe").',
            errorHint: 'inverter o sujeito da responsabilidade',
          },
          {
            label: 'D',
            text: 'Criar um tom de ameaça para desestimular o uso do parque.',
            rationale:
              'Não há ameaça: o verbo "agradece" e a construção afirmativa criam tom cordial, não punitivo.',
            errorHint: 'atribuir tom que o vocabulário não sustenta',
          },
          {
            label: 'E',
            text: 'Explicar tecnicamente o tempo de decomposição dos resíduos.',
            rationale:
              'Não há nenhuma informação técnica no texto. A placa não explica processos, apenas pede um comportamento.',
            errorHint: 'buscar informação que não está presente',
          },
        ],
        explanation: {
          summary:
            'A placa troca uma consequência abstrata (a natureza) por uma consequência concreta e próxima (a próxima família), o que torna o pedido mais persuasivo.',
          detailed:
            'Textos que pedem comportamento costumam funcionar melhor quando a consequência é imaginável. Perceber esse mecanismo é reconhecer a intenção comunicativa por trás da escolha das palavras.',
          strategy:
            'Quando a questão pergunta pela função de um trecho, pergunte "o que mudaria se essa parte fosse retirada?". O que se perde é a função.',
        },
      },
      {
        slug: 'q-interp-3',
        stem:
          'Leia o comentário publicado em um site de notícias sobre transporte público:\n\n"Ampliaram a frota em 4%. Com isso, quem espera 40 minutos passará a esperar, no melhor cenário possível, uns gloriosos 38."\n\nO efeito de sentido produzido pelo uso de "gloriosos" é:',
        support:
          'Comentário autoral criado para este exercício, sem relação com veículo ou pessoa real.',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'reconhecimento de ironia',
        estimatedSeconds: 110,
        skillSlug: 'identificar-informacao-explicita-e-implicita',
        likelyErrors: ['leitura literal da ironia', 'confundir crítica com elogio'],
        options: [
          {
            label: 'A',
            text: 'Ironia, que reforça a crítica à insuficiência da medida.',
            isCorrect: true,
            rationale:
              'Um adjetivo grandioso ("gloriosos") aplicado a um ganho mínimo (2 minutos) cria contraste evidente. Esse contraste é a marca da ironia.',
          },
          {
            label: 'B',
            text: 'Elogio sincero ao esforço de ampliação da frota.',
            rationale:
              'O elogio não se sustenta: o próprio texto expõe que o ganho é de 2 minutos e usa "no melhor cenário possível", enfraquecendo ainda mais o resultado.',
            errorHint: 'leitura literal de ironia',
          },
          {
            label: 'C',
            text: 'Neutralidade, já que o autor apenas apresenta os números.',
            rationale:
              'Se fosse neutro, o autor não escolheria um adjetivo carregado. A escolha lexical marca posição.',
            errorHint: 'confundir presença de dados com neutralidade',
          },
          {
            label: 'D',
            text: 'Dúvida quanto à veracidade do percentual divulgado.',
            rationale:
              'O autor aceita o número de 4% e trabalha a partir dele. A crítica é ao efeito prático, não à veracidade.',
            errorHint: 'deslocar o alvo da crítica',
          },
          {
            label: 'E',
            text: 'Exagero técnico, próprio da linguagem estatística.',
            rationale:
              'Linguagem estatística não usa adjetivos avaliativos como "gloriosos". A marca é de opinião, não de técnica.',
            errorHint: 'confundir registro opinativo com técnico',
          },
        ],
        explanation: {
          summary:
            '"Gloriosos" para descrever 2 minutos é um exagero deliberado: o autor diz o contrário do que pensa para criticar.',
          detailed:
            'Repare que a crítica tem alvo específico — a insuficiência do ganho prático. Concluir que o autor "é contra a ampliação da frota" seria extrapolar: ele critica a dimensão da medida, não a ideia.',
          strategy:
            'Ironia quase sempre deixa rastro: adjetivo grandioso em situação pequena, ou o contrário. Procure o desencaixe.',
        },
      },
      {
        slug: 'q-interp-4',
        stem:
          'Sobre o mesmo comentário ("Ampliaram a frota em 4%. Com isso, quem espera 40 minutos passará a esperar, no melhor cenário possível, uns gloriosos 38."), duas leituras foram propostas:\n\nI. O autor questiona a proporção entre a medida anunciada e o problema enfrentado.\nII. O autor afirma que a ampliação da frota não trará nenhuma melhora.\n\nÉ correto o que se afirma em:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'comparação entre leituras próximas',
        estimatedSeconds: 130,
        skillSlug: 'identificar-informacao-explicita-e-implicita',
        likelyErrors: ['aceitar generalização', 'não distinguir grau de afirmação'],
        options: [
          {
            label: 'A',
            text: 'I, apenas.',
            isCorrect: true,
            rationale:
              'O texto reconhece uma melhora (de 40 para 38 minutos) e a considera desproporcional ao problema. Isso valida I e invalida II, que nega qualquer melhora.',
          },
          {
            label: 'B',
            text: 'II, apenas.',
            rationale:
              'O próprio texto admite a redução de 2 minutos. Dizer "nenhuma melhora" contraria o que está escrito.',
            errorHint: 'transformar crítica de grau em negação total',
          },
          {
            label: 'C',
            text: 'I e II.',
            rationale:
              'I está correta, mas II extrapola. Basta uma afirmação falsa para invalidar a alternativa.',
            errorHint: 'não verificar cada afirmação separadamente',
          },
          {
            label: 'D',
            text: 'Nenhuma das duas.',
            rationale:
              'I é sustentada com clareza pelo contraste entre o adjetivo grandioso e o ganho mínimo.',
            errorHint: 'excesso de cautela',
          },
          {
            label: 'E',
            text: 'I e II, desde que o percentual seja confirmado.',
            rationale:
              'A validade de II não depende do percentual: mesmo com os números aceitos, "nenhuma melhora" continua contrariando o texto.',
            errorHint: 'condicionar a resposta a um dado irrelevante',
          },
        ],
        explanation: {
          summary:
            'A diferença entre as leituras é de **grau**: criticar que a melhora é pequena não é o mesmo que negar que exista melhora.',
          detailed:
            'Questões com afirmações I/II costumam colocar lado a lado uma leitura correta e uma versão exagerada dela. Verifique cada uma isoladamente antes de olhar as alternativas.',
          strategy: 'Marque V ou F em cada afirmação na margem antes de ler as alternativas.',
        },
      },
      {
        slug: 'q-interp-5',
        stem:
          'Uma campanha de saúde pública sobre hidratação distribuiu dois materiais com a mesma informação:\n\nMaterial 1: "Adultos devem consumir cerca de 2 litros de água por dia, variando conforme peso, clima e atividade física."\n\nMaterial 2: "Você já bebeu água hoje? Seu corpo perde líquido o tempo todo — inclusive agora, respirando."\n\nA diferença central entre os dois materiais está:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre intenção comunicativa e escolha de gênero',
        estimatedSeconds: 130,
        skillSlug: 'identificar-informacao-explicita-e-implicita',
        likelyErrors: ['confundir conteúdo com abordagem', 'julgar qual é "melhor"'],
        options: [
          {
            label: 'A',
            text: 'Na função predominante: o primeiro prioriza informar com precisão; o segundo prioriza mobilizar a atenção do leitor.',
            isCorrect: true,
            rationale:
              'O Material 1 traz dado numérico e ressalvas técnicas. O Material 2 usa pergunta direta e segunda pessoa para provocar reação imediata. A informação de fundo é a mesma; o que muda é o propósito da abordagem.',
          },
          {
            label: 'B',
            text: 'Na veracidade: o segundo material apresenta informação incorreta.',
            rationale:
              'A perda de líquido pela respiração é fato. Não há erro factual, apenas escolha de abordagem.',
            errorHint: 'confundir informalidade com imprecisão',
          },
          {
            label: 'C',
            text: 'No público: o primeiro se dirige a profissionais de saúde e o segundo, a pacientes.',
            rationale:
              'Nada nos textos indica destinatário profissional. Ambos usam linguagem acessível ao público geral.',
            errorHint: 'inferir público sem marca textual',
          },
          {
            label: 'D',
            text: 'Na quantidade de informação: o segundo material é incompleto por não trazer números.',
            rationale:
              '"Incompleto" pressupõe que o objetivo fosse informar quantidade. Para mobilizar atenção, o número não é necessário — a ausência é escolha, não falha.',
            errorHint: 'avaliar um gênero pelos critérios de outro',
          },
          {
            label: 'E',
            text: 'No grau de formalidade, sem qualquer efeito sobre a função do texto.',
            rationale:
              'A formalidade realmente muda, mas ela não é neutra: a escolha do registro é justamente o que produz a diferença de função.',
            errorHint: 'perceber a forma e ignorar o efeito',
          },
        ],
        explanation: {
          summary:
            'Mesma informação de base, propósitos diferentes: informar com precisão x chamar a atenção.',
          detailed:
            'Esta questão integra dois conceitos: intenção comunicativa e adequação do gênero ao objetivo. Nenhum dos materiais é "melhor" — eles cumprem funções diferentes dentro da mesma campanha.',
          strategy:
            'Quando dois textos trazem a mesma informação, a pergunta quase sempre é sobre **função**, não sobre conteúdo.',
          conceptRecap: 'Forma e função andam juntas: mudar o registro muda o efeito pretendido.',
        },
      },
      {
        slug: 'q-interp-rec-1',
        stem:
          'Leia:\n\n"O bilhete estava sobre a mesa, com a caneta ainda destampada ao lado."\n\nQual conclusão o texto sustenta?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'inferência a partir de pista textual',
        estimatedSeconds: 80,
        isRecovery: true,
        skillSlug: 'identificar-informacao-explicita-e-implicita',
        likelyErrors: ['extrapolação'],
        options: [
          {
            label: 'A',
            text: 'O bilhete foi escrito há pouco tempo.',
            isCorrect: true,
            rationale:
              'A caneta "ainda destampada" é a pista: quem escreveu não teve tempo ou intenção de guardá-la, o que sugere proximidade temporal.',
          },
          {
            label: 'B',
            text: 'O bilhete contém uma má notícia.',
            rationale: 'O conteúdo do bilhete não é mencionado em momento algum.',
            errorHint: 'extrapolação sobre conteúdo',
          },
          {
            label: 'C',
            text: 'A pessoa que escreveu saiu de casa.',
            rationale:
              'O texto não informa onde está quem escreveu. Ela pode estar na sala ao lado.',
            errorHint: 'inferência sobre ação não mencionada',
          },
          {
            label: 'D',
            text: 'A mesa fica em um escritório.',
            rationale: 'Nenhum elemento identifica o ambiente.',
            errorHint: 'inferir cenário sem pista',
          },
          {
            label: 'E',
            text: 'O bilhete era endereçado a mais de uma pessoa.',
            rationale: 'O destinatário não é mencionado.',
            errorHint: 'inferir destinatário sem pista',
          },
        ],
        explanation: {
          summary:
            '"Ainda destampada" é o único detalhe que produz uma conclusão obrigatória: a escrita foi recente.',
          strategy: 'Procure o detalhe que parece "sobrando" na frase — ele costuma ser a pista.',
        },
      },
      {
        slug: 'q-interp-rec-2',
        stem:
          'Um cartaz de biblioteca diz: "Silêncio. Alguém aqui está começando a gostar de ler."\n\nA segunda frase foi incluída para:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'função de escolha lexical',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'identificar-informacao-explicita-e-implicita',
        likelyErrors: ['confundir tema com função'],
        options: [
          {
            label: 'A',
            text: 'Justificar o pedido, dando a ele um motivo concreto e simpático.',
            isCorrect: true,
            rationale:
              '"Silêncio" sozinho é ordem seca. A segunda frase transforma a ordem em pedido com razão visível, o que aumenta a adesão.',
          },
          {
            label: 'B',
            text: 'Informar quantas pessoas frequentam a biblioteca.',
            rationale: '"Alguém" é indefinido de propósito e não traz dado quantitativo.',
            errorHint: 'ler "alguém" como número',
          },
          {
            label: 'C',
            text: 'Restringir o acesso a leitores iniciantes.',
            rationale: 'Não há qualquer restrição de acesso no texto.',
            errorHint: 'ler exemplo como regra',
          },
          {
            label: 'D',
            text: 'Substituir a regra de silêncio por uma sugestão opcional.',
            rationale:
              'A regra continua: a primeira frase é imperativa. A segunda apenas a justifica.',
            errorHint: 'achar que justificar enfraquece a regra',
          },
          {
            label: 'E',
            text: 'Indicar que a biblioteca oferece cursos de leitura.',
            rationale: 'Nenhum serviço é mencionado.',
            errorHint: 'acrescentar informação ausente',
          },
        ],
        explanation: {
          summary:
            'A segunda frase dá um motivo à ordem, tornando o pedido mais persuasivo sem deixar de ser regra.',
          strategy: 'Pergunte o que se perderia se aquele trecho fosse apagado.',
        },
      },
    ],
  },
  {
    slug: 'generos-textuais-e-funcao-social',
    name: 'Gêneros textuais e função social',
    subjectSlug: 'lingua-portuguesa',
    areaSlug: 'linguagens',
    summary:
      'Relacionar formato, contexto, público e finalidade — e perceber quando um texto foge do esperado de propósito.',
    difficulty: 'intro',
    estimatedMinutes: 15,
    curationWeight: 85,
    order: 2,
    prerequisites: ['interpretacao-e-inferencia'],
    skills: [
      {
        slug: 'relacionar-formato-contexto-publico-finalidade',
        name: 'Relacionar formato, contexto, público e finalidade',
        description:
          'Reconhecer o gênero de um texto e explicar como sua forma serve ao objetivo e ao leitor previsto.',
      },
    ],
    content: [
      {
        slug: 'generos-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `**Gênero textual** é o formato que um texto assume para cumprir uma função social. Receita, bula, manchete, edital, meme, carta de leitor: cada um tem uma forma porque tem um trabalho a fazer.

Quatro perguntas identificam qualquer gênero:
1. **Quem escreve?** (uma empresa, um jornal, uma pessoa comum)
2. **Para quem?** (público amplo, especialista, cliente)
3. **Para quê?** (informar, instruir, convencer, registrar, divertir)
4. **Onde circula?** (jornal, rede social, mural, embalagem)

Mudar o suporte muda o gênero: a mesma informação vira notícia, post ou cartaz — e a forma muda junto.`,
      },
      {
        slug: 'generos-explicacao',
        kind: 'explanation',
        title: 'Forma, função e quebra de expectativa',
        depth: 'standard',
        order: 2,
        body: `### A forma serve à função

Uma **bula** usa subtítulos fixos ("posologia", "efeitos adversos") porque a pessoa precisa **encontrar rápido** uma informação específica, sob estresse. Não é burocracia: é design.

Uma **manchete** tem verbo no presente e omite artigos porque precisa caber e ser lida em um segundo.

Um **edital** é repetitivo e preciso porque qualquer ambiguidade vira processo judicial.

Quando a prova pergunta "por que esse texto é assim?", a resposta quase sempre é: **porque o leitor previsto precisa disso**.

### Quebra de expectativa

Textos publicitários e literários frequentemente **usam a forma de um gênero para fazer outra coisa**. Um anúncio no formato de receita. Uma campanha de trânsito no formato de bula. Isso não é erro: é recurso.

O efeito depende do reconhecimento: só funciona porque você **conhece o gênero original**. Quando isso aparece, a pergunta costuma ser sobre o **efeito da quebra**, não sobre o gênero em si.

### Registro e adequação

- **Formal**: distância, precisão, sem gírias. Edital, ofício, artigo científico.
- **Informal**: proximidade, contração, gíria. Conversa, post, mensagem.

Não existe registro "certo" em abstrato. Existe registro **adequado ao contexto**. Um post institucional excessivamente formal falha tanto quanto um ofício com gíria — os dois erram o leitor.`,
      },
      {
        slug: 'generos-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — identificar pela forma',
        order: 3,
        body: `**Texto:** "Modo de preparo: leve ao fogo médio por 8 minutos, mexendo sempre. Retire antes que grude."

**Como identificar:**
- Verbos no **imperativo** ("leve", "retire") → o texto manda fazer algo.
- Sequência **ordenada** de ações com tempo.
- Presença de um **aviso** para evitar erro.

**Gênero:** instrucional (receita ou manual). **Função:** garantir que alguém execute um procedimento corretamente. **Público:** quem vai executar, não quem vai avaliar.

**Cuidado:** o imperativo sozinho não define o gênero — publicidade também usa ("Compre já"). O que fecha a identificação é a **sequência ordenada com tempo e advertência**.`,
      },
      {
        slug: 'generos-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — quebra de expectativa',
        order: 4,
        body: `**Texto de campanha:** "PRESSA. Indicação: nenhuma. Contraindicação: qualquer trajeto com outras pessoas na via. Efeitos adversos: perda irreversível."

**O que está acontecendo:**
- A forma é de **bula de remédio** (indicação, contraindicação, efeitos adversos).
- O conteúdo é de **campanha de trânsito**.

**Por que funciona:** a bula é o gênero em que a gente aceita ler sobre risco de forma seca e técnica. Ao vestir a campanha com essa forma, o texto empresta essa seriedade e evita o tom de sermão.

**O que a prova costuma perguntar:** o **efeito** da escolha (aproximar risco de trânsito de risco médico), não o nome do gênero.`,
      },
      {
        slug: 'generos-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Identificar o gênero pelo tema, não pela forma.**
Um texto sobre futebol pode ser notícia, crônica, tabela, meme ou súmula. O tema não define o gênero — a forma e a função definem.

**2. Tratar linguagem informal como erro.**
Em um post ou diálogo, informalidade é **adequação**. A pergunta certa não é "está certo?", e sim "serve ao contexto e ao leitor?".

**3. Descrever a forma e parar por aí.**
Dizer "usa imperativo" não responde nada. A questão quer saber **por que** essa escolha serve à função. Sempre complete a frase: "usa X **porque** o leitor precisa Y".`,
      },
      {
        slug: 'generos-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Escolha um gênero que você lê com frequência. Que elemento da forma dele existe **por causa** do leitor previsto?
2. Por que a mesma informação muda de forma ao passar de um jornal para uma rede social?
3. Quando um texto imita o formato de outro gênero, o que precisa acontecer para o recurso funcionar?`,
      },
    ],
    questions: [
      {
        slug: 'q-gen-1',
        stem:
          'Um texto apresenta a seguinte estrutura: título curto em destaque, primeiro parágrafo respondendo quem, o quê, quando e onde, e os parágrafos seguintes com detalhes em ordem decrescente de importância.\n\nEssa organização é típica de qual gênero e atende a qual necessidade do leitor?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'identificação de gênero pela estrutura',
        estimatedSeconds: 90,
        skillSlug: 'relacionar-formato-contexto-publico-finalidade',
        likelyErrors: ['identificar pelo tema', 'confundir com texto dissertativo'],
        options: [
          {
            label: 'A',
            text: 'Notícia — permite que o leitor obtenha o essencial mesmo se interromper a leitura no início.',
            isCorrect: true,
            rationale:
              'A estrutura descrita é a pirâmide invertida, característica da notícia: o mais importante vem primeiro justamente porque a leitura pode parar a qualquer momento.',
          },
          {
            label: 'B',
            text: 'Artigo de opinião — apresenta a tese no início para depois sustentá-la.',
            rationale:
              'Artigo de opinião abre com um ponto de vista a ser defendido, não com quem/o quê/quando/onde. Faltam as marcas de posicionamento.',
            errorHint: 'confundir "informação primeiro" com "tese primeiro"',
          },
          {
            label: 'C',
            text: 'Relatório técnico — organiza os dados por ordem cronológica de coleta.',
            rationale:
              'O texto descrito organiza por importância, não por cronologia, e relatórios técnicos costumam ter seções fixas.',
            errorHint: 'confundir ordem de importância com ordem cronológica',
          },
          {
            label: 'D',
            text: 'Crônica — parte de um fato cotidiano para uma reflexão pessoal.',
            rationale:
              'Não há marca de subjetividade nem de reflexão na estrutura descrita.',
            errorHint: 'identificar gênero sem verificar as marcas',
          },
          {
            label: 'E',
            text: 'Edital — precisa listar requisitos de forma exaustiva e sem ambiguidade.',
            rationale:
              'Edital não usa pirâmide invertida: ele precisa ser completo e é organizado por itens normativos.',
            errorHint: 'associar formalidade a qualquer gênero institucional',
          },
        ],
        explanation: {
          summary:
            'A pirâmide invertida existe porque o leitor de notícia pode parar a qualquer instante — a forma serve a essa necessidade.',
          strategy:
            'Identifique o gênero pela estrutura e pela função, nunca pelo assunto tratado.',
        },
      },
      {
        slug: 'q-gen-2',
        stem:
          'Uma prefeitura precisa comunicar a mudança do ponto final de uma linha de ônibus. Foram produzidos: (1) um aviso impresso colado no ponto antigo e (2) uma publicação no perfil oficial da prefeitura em uma rede social.\n\nO que justifica que os dois textos sejam escritos de formas diferentes?',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'adequação ao suporte e ao público',
        estimatedSeconds: 100,
        skillSlug: 'relacionar-formato-contexto-publico-finalidade',
        likelyErrors: ['achar que só o tamanho muda', 'ignorar o suporte'],
        options: [
          {
            label: 'A',
            text: 'O suporte e a situação de leitura são diferentes: no ponto, lê-se de pé e com pressa; na rede, a leitura é voluntária e pode incluir mais contexto.',
            isCorrect: true,
            rationale:
              'A forma acompanha a condição real de leitura. No ponto, a informação precisa ser imediata e visual; na rede, cabe explicação, imagem e resposta a comentários.',
          },
          {
            label: 'B',
            text: 'O aviso impresso precisa ser formal e a rede social exige linguagem incorreta.',
            rationale:
              'Informalidade não é incorreção. Um perfil institucional escreve de forma adequada, apenas com registro mais próximo.',
            errorHint: 'confundir informalidade com erro',
          },
          {
            label: 'C',
            text: 'A publicação em rede social não tem valor oficial, então pode omitir a informação principal.',
            rationale:
              'Um comunicado oficial não pode omitir o essencial em nenhum suporte — isso frustraria a função.',
            errorHint: 'confundir informalidade com falta de compromisso',
          },
          {
            label: 'D',
            text: 'O público é o mesmo, portanto a diferença é apenas estética.',
            rationale:
              'A situação de leitura muda mesmo quando o público é o mesmo, e isso tem efeito funcional, não estético.',
            errorHint: 'reduzir adequação a estilo',
          },
          {
            label: 'E',
            text: 'O aviso impresso deve conter opinião da administração sobre a mudança.',
            rationale:
              'Um aviso operacional informa; opinião é função de outro gênero.',
            errorHint: 'atribuir função de opinião a texto informativo',
          },
        ],
        explanation: {
          summary:
            'A situação concreta de leitura (de pé, com pressa x voluntária, com contexto) explica a diferença de forma.',
          detailed:
            'Esse é o princípio central do estudo de gêneros: a forma responde ao suporte, ao público e à finalidade. Nenhuma das três pode ser ignorada.',
        },
      },
      {
        slug: 'q-gen-3',
        stem:
          'Leia a peça de campanha:\n\n"CELULAR AO VOLANTE\nComposição: 2 segundos de distração.\nIndicações: nenhuma.\nEfeitos adversos: podem ser permanentes."\n\nO efeito pretendido pela escolha desse formato é:',
        support: 'Peça publicitária autoral criada para este exercício.',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'quebra de expectativa de gênero',
        estimatedSeconds: 110,
        skillSlug: 'relacionar-formato-contexto-publico-finalidade',
        likelyErrors: ['identificar o gênero e parar aí', 'ignorar o efeito'],
        options: [
          {
            label: 'A',
            text: 'Aproximar o uso do celular ao volante de um risco médico, emprestando a seriedade técnica associada à bula.',
            isCorrect: true,
            rationale:
              'O formato de bula carrega autoridade e sobriedade. Ao vestir a campanha com ele, o texto trata a distração como risco à saúde, evitando o tom de sermão.',
          },
          {
            label: 'B',
            text: 'Informar corretamente a composição química de um medicamento.',
            rationale:
              'Não há medicamento algum: "composição: 2 segundos de distração" é uso figurado do campo.',
            errorHint: 'leitura literal da quebra de expectativa',
          },
          {
            label: 'C',
            text: 'Confundir o leitor para que ele leia o texto até o final por engano.',
            rationale:
              'O recurso depende do reconhecimento imediato do formato — se confundisse, não funcionaria.',
            errorHint: 'confundir estranhamento com confusão',
          },
          {
            label: 'D',
            text: 'Substituir a legislação de trânsito por uma recomendação médica.',
            rationale:
              'A campanha não trata de norma legal nem propõe substituição de regra.',
            errorHint: 'extrapolar consequência institucional',
          },
          {
            label: 'E',
            text: 'Demonstrar que campanhas de trânsito devem sempre usar linguagem técnica.',
            rationale:
              'Uma peça isolada não estabelece regra geral, e o texto não faz essa defesa.',
            errorHint: 'generalizar a partir de um caso',
          },
        ],
        explanation: {
          summary:
            'A forma de bula é usada de propósito para transferir a seriedade do risco médico para o risco no trânsito.',
          strategy:
            'Quando um texto imita outro gênero, pergunte: "o que esse formato original carrega que serve aqui?".',
        },
      },
      {
        slug: 'q-gen-4',
        stem:
          'Compare os dois trechos, ambos sobre a mesma vaga de emprego:\n\nI. "Requisitos: ensino médio completo; disponibilidade para trabalho aos sábados; experiência mínima de 6 meses em atendimento."\n\nII. "Se você curte lidar com gente e topa pegar alguns sábados, vem com a gente."\n\nSobre os dois trechos, é correto afirmar:',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'comparação de registro e precisão',
        estimatedSeconds: 130,
        skillSlug: 'relacionar-formato-contexto-publico-finalidade',
        likelyErrors: ['julgar qual é melhor', 'associar informal a inadequado'],
        options: [
          {
            label: 'A',
            text: 'O trecho I prioriza precisão verificável; o II prioriza aproximação, ao custo de deixar critérios menos definidos.',
            isCorrect: true,
            rationale:
              'I lista requisitos objetivamente verificáveis. II cria identificação, mas "alguns sábados" e "curte lidar com gente" não são critérios checáveis. Cada escolha tem ganho e custo.',
          },
          {
            label: 'B',
            text: 'O trecho II está incorreto por não usar norma padrão.',
            rationale:
              'O trecho II é adequado ao registro escolhido; informalidade planejada não é incorreção.',
            errorHint: 'confundir registro com erro gramatical',
          },
          {
            label: 'C',
            text: 'Os dois trechos transmitem exatamente a mesma informação.',
            rationale:
              'II omite escolaridade e experiência mínima — informações presentes em I.',
            errorHint: 'não conferir o conteúdo item a item',
          },
          {
            label: 'D',
            text: 'O trecho I é inadequado por ser impessoal demais para um anúncio.',
            rationale:
              'Impessoalidade é adequada quando o objetivo é filtrar candidatos por critérios objetivos.',
            errorHint: 'julgar adequação sem considerar a finalidade',
          },
          {
            label: 'E',
            text: 'O trecho II se dirige a um público mais velho, por usar linguagem coloquial.',
            rationale:
              'Não há marca no texto que permita definir faixa etária do público.',
            errorHint: 'inferir público sem evidência',
          },
        ],
        explanation: {
          summary:
            'A diferença não é "certo x errado", e sim o que cada escolha ganha e o que ela perde.',
          detailed:
            'Reconhecer o custo de cada registro é mais preciso do que classificar um como melhor. Em provas, a alternativa correta costuma ser a que reconhece o trade-off.',
        },
      },
      {
        slug: 'q-gen-5',
        stem:
          'Uma escola pediu que os estudantes transformassem uma reportagem sobre desperdício de alimentos em um cartaz para o refeitório.\n\nQual conjunto de decisões melhor atende a essa transformação?',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre gênero, público e finalidade',
        estimatedSeconds: 140,
        skillSlug: 'relacionar-formato-contexto-publico-finalidade',
        likelyErrors: ['manter a forma do gênero de origem', 'esquecer a ação pretendida'],
        options: [
          {
            label: 'A',
            text: 'Selecionar um dado de impacto, escrever uma frase curta orientada à ação e usar hierarquia visual forte.',
            isCorrect: true,
            rationale:
              'O cartaz é lido de passagem, por quem está prestes a servir o prato. Precisa de um dado que impacte, uma ação clara e leitura em segundos.',
          },
          {
            label: 'B',
            text: 'Reproduzir a reportagem integralmente para preservar a informação original.',
            rationale:
              'Um texto longo no refeitório não será lido: preservar o texto destrói a função.',
            errorHint: 'confundir fidelidade ao conteúdo com fidelidade à forma',
          },
          {
            label: 'C',
            text: 'Manter a estrutura de pirâmide invertida com título, lide e parágrafos de apoio.',
            rationale:
              'A pirâmide invertida serve à notícia, não ao cartaz. O suporte mudou, a estrutura precisa mudar.',
            errorHint: 'transportar a estrutura do gênero de origem',
          },
          {
            label: 'D',
            text: 'Substituir todos os dados por opiniões dos estudantes para tornar o texto mais pessoal.',
            rationale:
              'Trocar dados por opinião enfraquece a credibilidade sem ganho de função.',
            errorHint: 'confundir aproximação com abandono da informação',
          },
          {
            label: 'E',
            text: 'Usar linguagem técnica sobre cadeia produtiva para demonstrar profundidade.',
            rationale:
              'Linguagem técnica afasta o público previsto e não gera a ação pretendida.',
            errorHint: 'confundir profundidade com adequação',
          },
        ],
        explanation: {
          summary:
            'Transformar um gênero em outro significa manter a informação essencial e refazer a forma para o novo suporte, público e objetivo.',
          detailed:
            'A questão integra três dimensões: o que preservar do conteúdo, o que mudar na forma e qual ação se espera do leitor no novo contexto.',
          conceptRecap:
            'Retextualizar não é resumir: é reconstruir o texto para outra situação de leitura.',
        },
      },
      {
        slug: 'q-gen-rec-1',
        stem:
          'Um texto começa assim: "Art. 1º Fica instituído, no âmbito do município, o programa de..." \n\nEsse início indica um gênero cuja principal exigência é:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'identificação de gênero pela marca formal',
        estimatedSeconds: 80,
        isRecovery: true,
        skillSlug: 'relacionar-formato-contexto-publico-finalidade',
        likelyErrors: ['identificar pelo tema'],
        options: [
          {
            label: 'A',
            text: 'Precisão sem ambiguidade, porque o texto produz efeitos obrigatórios.',
            isCorrect: true,
            rationale:
              'Textos normativos precisam ser interpretados da mesma forma por qualquer leitor, já que criam obrigações. Daí a linguagem repetitiva e delimitada.',
          },
          {
            label: 'B',
            text: 'Emoção, para aproximar o leitor do tema tratado.',
            rationale: 'Texto normativo evita apelo emocional justamente para não abrir interpretação.',
            errorHint: 'atribuir função de outro gênero',
          },
          {
            label: 'C',
            text: 'Brevidade máxima, para caber em um único parágrafo.',
            rationale: 'Normas costumam ser longas: completude importa mais que brevidade.',
            errorHint: 'associar clareza a tamanho',
          },
          {
            label: 'D',
            text: 'Uso de linguagem coloquial para ampliar o alcance.',
            rationale:
              'Coloquialidade aumentaria a ambiguidade, o que é incompatível com a função normativa.',
            errorHint: 'confundir acessibilidade com informalidade',
          },
          {
            label: 'E',
            text: 'Apresentação de opinião do autor sobre o programa.',
            rationale: 'Norma não expressa opinião individual; ela institui regra.',
            errorHint: 'confundir texto oficial com texto opinativo',
          },
        ],
        explanation: {
          summary:
            'A forma "Art. 1º" indica texto normativo, cuja exigência central é não deixar margem a leituras divergentes.',
        },
      },
      {
        slug: 'q-gen-rec-2',
        stem:
          'Uma mesma informação — o horário de funcionamento de uma unidade de saúde — aparece em um cartaz na porta e em uma mensagem automática de atendimento por telefone.\n\nA diferença entre os dois textos se explica principalmente por:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'adequação ao canal',
        estimatedSeconds: 90,
        isRecovery: true,
        skillSlug: 'relacionar-formato-contexto-publico-finalidade',
        likelyErrors: ['ignorar o canal'],
        options: [
          {
            label: 'A',
            text: 'Um texto é lido e o outro é ouvido, o que muda ritmo, repetição e ordem da informação.',
            isCorrect: true,
            rationale:
              'Quem ouve não pode reler: a mensagem falada precisa repetir o essencial e usar frases mais curtas e pausadas.',
          },
          {
            label: 'B',
            text: 'O cartaz pode conter informação incorreta, já que não é oficial.',
            rationale: 'Ambos são comunicações da mesma unidade e devem ser corretos.',
            errorHint: 'associar suporte a confiabilidade',
          },
          {
            label: 'C',
            text: 'A mensagem telefônica se dirige a profissionais de saúde.',
            rationale: 'Nada indica público profissional; o atendimento é ao público geral.',
            errorHint: 'inferir público sem evidência',
          },
          {
            label: 'D',
            text: 'O cartaz precisa de linguagem mais rebuscada por estar exposto ao público.',
            rationale:
              'Exposição pública pede clareza, não rebuscamento.',
            errorHint: 'associar formalidade a qualidade',
          },
          {
            label: 'E',
            text: 'Não há diferença real: os dois textos podem ser idênticos.',
            rationale:
              'Podem até trazer as mesmas palavras, mas a mensagem falada perde eficiência sem repetição e pausa.',
            errorHint: 'ignorar a diferença entre ler e ouvir',
          },
        ],
        explanation: {
          summary:
            'O canal (leitura x escuta) impõe diferenças reais de ritmo, repetição e ordem.',
        },
      },
    ],
  },
];

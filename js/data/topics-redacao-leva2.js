/**
 * Redação — segunda leva de tópicos.
 *
 * Conteúdo autoral de desenvolvimento — Conscious Knowledge.
 * Nenhum enunciado, trecho de redação ou proposta foi copiado de prova oficial,
 * livro ou plataforma de terceiros.
 *
 * Cobre os assuntos previstos no escopo que ainda não tinham tópico próprio:
 * repertório sociocultural, coesão e progressão textual e proposta de intervenção.
 */

import { question as q, topic } from './topic-factory.js';

export const REDACAO_TOPICS_LEVA_2 = [
  topic({
    slug: 'repertorio-sociocultural',
    name: 'Repertório sociocultural',
    subject: 'producao-textual',
    area: 'linguagens',
    summary:
      'Selecionar e usar referências externas de forma produtiva — conectadas à tese, e não coladas ao texto como enfeite.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 89,
    order: 2,
    prerequisites: ['tese-e-argumentacao'],
    related: ['coesao-e-progressao'],
    skill: {
      slug: 'selecionar-e-articular-repertorio-sociocultural',
      name: 'Selecionar e articular repertório sociocultural',
      description:
        'Escolher referências pertinentes e integrá-las ao argumento, explicitando a relação com a tese defendida.',
    },
    quick: `**Repertório produtivo** é uma referência externa ao tema que **sustenta** o argumento — não que apenas o decora.

**Fontes legítimas:** dados oficiais, legislação, história, filosofia, sociologia, ciência, literatura, arte e cinema.

**A regra de três passos**

1. **Apresente** a referência com precisão.
2. **Explique** o que ela mostra.
3. **Conecte** explicitamente ao seu argumento.

Pular o passo 3 é o erro mais comum: a referência aparece, impressiona e não serve para nada.

**Repertório improdutivo**
- citação decorada, encaixada em qualquer tema;
- referência genérica ("como diz o filósofo…");
- dado sem fonte nem período;
- frase de efeito atribuída a quem nunca a disse.

**Melhor menos e melhor:** duas referências bem articuladas valem mais que cinco enfileiradas.`,
    explanation: {
      title: 'Como transformar uma referência em argumento',
      body: `### 1. O teste da substituição

Se você puder trocar sua referência por outra qualquer sem alterar o parágrafo, ela não está fazendo trabalho argumentativo — está enfeitando.

Repertório produtivo é aquele que, se retirado, deixa um buraco no raciocínio.

### 2. A estrutura que funciona

Um parágrafo de desenvolvimento bem construído costuma ter:

1. **Tópico frasal:** o argumento em uma frase.
2. **Repertório:** a referência que dá base.
3. **Análise:** o que a referência demonstra.
4. **Amarração:** a volta explícita à tese.

Exemplo de encadeamento (tema hipotético: acesso à leitura):

> A ausência de bibliotecas públicas em bairros periféricos limita a formação de leitores. *(tópico frasal)* Levantamentos do setor cultural indicam que a maior parte dos municípios brasileiros tem menos de um equipamento de leitura por bairro. *(repertório)* Isso significa que ler deixa de ser um hábito possível e passa a depender de deslocamento, tempo e renda. *(análise)* Sem política pública que aproxime o livro do território, o direito à leitura permanece formal. *(amarração)*

### 3. Escolher a referência certa

Antes de usar, pergunte:

- Ela é **verdadeira** e verificável?
- Ela é **específica** o bastante para dizer algo?
- Ela **sustenta** exatamente o argumento deste parágrafo?
- Eu consigo **explicá-la** em duas frases?

Se a resposta a qualquer uma for não, troque a referência.

### 4. Repertório de mão dupla

As melhores referências fazem duas coisas ao mesmo tempo: mostram conhecimento e **avançam** o raciocínio. Um dado que revela a dimensão do problema no primeiro parágrafo pode reaparecer, transformado, na proposta de intervenção — mostrando por que a medida sugerida ataca aquela causa.

### 5. Cuidados de honestidade

- Não invente número, pesquisa ou instituição.
- Não atribua frase a quem não a disse.
- Se não lembra do dado exato, prefira uma formulação qualificada ("levantamentos recentes indicam") a um número falso.

Um dado inventado, quando percebido, custa mais do que a ausência dele.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — a mesma referência, dois usos',
        body: `**Referência:** a Constituição de 1988 estabelece a educação como direito de todos e dever do Estado.

**Uso improdutivo:**
> "Como diz a Constituição de 1988, a educação é um direito de todos. Portanto, o problema precisa ser resolvido."

Aqui a referência é apenas citada. Nada é analisado, e a conclusão não decorre dela.

**Uso produtivo:**
> "A Constituição de 1988 define a educação como direito de todos e dever do Estado. A previsão legal, no entanto, não descreve a realidade de escolas sem internet estável em regiões inteiras do país: quando o ensino passa a depender de conexão, o direito garantido no papel deixa de existir na prática para parte dos estudantes."

Repare no que mudou: a referência **entra em tensão** com um fato e produz uma conclusão que não estava dada.`,
      },
      {
        title: 'Exemplo resolvido 2 — planejar duas referências para um tema',
        body: `**Tema hipotético:** os desafios do descarte de resíduos eletrônicos no Brasil.

**Referência 1 — legislação:** a Política Nacional de Resíduos Sólidos prevê logística reversa, isto é, a responsabilidade do fabricante pelo retorno do produto após o uso.
**Como articular:** mostrar a distância entre a previsão legal e a existência efetiva de pontos de coleta acessíveis.

**Referência 2 — química/ambiente:** aparelhos eletrônicos contêm metais pesados que, em contato com solo e água, permanecem por muito tempo no ambiente.
**Como articular:** explicar por que o descarte comum não é um problema de estética urbana, mas de contaminação de longo prazo.

**Por que essas duas funcionam juntas:** uma trata da **norma** e a outra da **consequência material**. Isso permite um desenvolvimento em duas frentes e uma proposta de intervenção que fala das duas.`,
      },
    ],
    mistakes: `**1. Citar sem explicar.**
A referência aparece, mas não é analisada nem conectada à tese. Ela vira enfeite.

**2. Inventar dado ou autoria.**
Número falso ou frase atribuída a quem não disse comprometem a credibilidade do texto inteiro.

**3. Acumular referências.**
Cinco citações rasas argumentam menos que duas bem articuladas.`,
    selfCheck: [
      'Como você testa se uma referência está de fato sustentando o seu argumento?',
      'Quais são os três passos para articular um repertório em um parágrafo?',
      'Por que é melhor qualificar uma informação do que inventar um número exato?',
    ],
    questions: [
      q({
        slug: 'q-repertorio-1',
        stem: 'Em uma redação dissertativa-argumentativa, um repertório sociocultural é considerado produtivo quando:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'definição de repertório produtivo',
        seconds: 80,
        errors: ['confundir quantidade com qualidade'],
        correct: 3,
        options: [
          ['É extenso e ocupa boa parte do parágrafo de desenvolvimento.', 'Extensão não é critério: uma referência longa e desconectada continua improdutiva.', 'confundir tamanho com função'],
          ['Cita um autor consagrado, independentemente da relação com o tema.', 'A consagração do autor não substitui a pertinência ao argumento.', 'apelar à autoridade sem conexão'],
          ['Aparece na introdução para demonstrar conhecimento prévio.', 'A posição no texto não define a produtividade da referência.', 'confundir posição com função'],
          ['É pertinente ao tema, apresentado com precisão e explicitamente relacionado ao argumento defendido.', 'Repertório produtivo sustenta o raciocínio: entra com precisão, é analisado e volta à tese de forma explícita.'],
          ['Traz uma frase de efeito capaz de emocionar o leitor.', 'Emoção pode acompanhar o texto, mas não é o que caracteriza repertório produtivo.', 'trocar argumentação por efeito'],
        ],
        explanation: 'Produtivo é o repertório que, se retirado, deixa um buraco no raciocínio — não o que apenas decora o parágrafo.',
      }),
      q({
        slug: 'q-repertorio-2',
        stem: 'Um estudante escreve, em um texto sobre mobilidade urbana:\n\n"Como já dizia um grande filósofo, o homem é a medida de todas as coisas. Por isso, o transporte público precisa melhorar."\n\nO problema central desse trecho é que ele:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'identificação de repertório improdutivo em um caso concreto',
        seconds: 100,
        errors: ['achar que o problema é apenas a falta do nome do autor'],
        correct: 2,
        options: [
          ['Usa uma citação longa demais para o parágrafo.', 'A citação é curta; o problema não é a extensão.', 'diagnosticar o problema errado'],
          ['Apresenta um argumento contrário à tese defendida.', 'A citação não contradiz a tese; ela simplesmente não a sustenta.', 'inverter o diagnóstico'],
          ['Introduz uma referência genérica e não estabelece nenhuma relação analítica entre ela e o argumento sobre transporte.', 'Não há identificação do autor, não há explicação do que a frase significa e não há ponte entre a citação e a mobilidade urbana: o "por isso" liga duas ideias que não se conectam.'],
          ['Cita um filósofo antigo, quando o tema exige referências atuais.', 'Referências clássicas são plenamente válidas quando bem articuladas.', 'desqualificar a fonte pela época'],
          ['Não apresenta dados estatísticos sobre transporte público.', 'Dados ajudariam, mas o problema apontado é a ausência de articulação da referência usada.', 'apontar ausência em vez do defeito presente'],
        ],
        explanation: 'O defeito não é a citação em si, e sim a ausência dos passos de explicação e conexão com o argumento.',
        strategy: 'Aplique o teste da substituição: se qualquer outra frase famosa caberia ali, a referência não está trabalhando.',
      }),
      q({
        slug: 'q-repertorio-3',
        stem: 'Leia o parágrafo autoral:\n\n"O acesso desigual à internet aprofunda desigualdades educacionais. Levantamentos sobre conectividade escolar indicam que parte significativa das escolas públicas brasileiras não dispõe de conexão adequada para uso pedagógico. Isso significa que atividades que dependem de pesquisa on-line deixam de ser tarefa e passam a ser privilégio, separando estudantes pela infraestrutura de suas escolas."\n\nA análise da construção desse parágrafo mostra que ele:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'análise da estrutura argumentativa de um parágrafo',
        seconds: 130,
        errors: ['confundir presença de dado com argumentação'],
        correct: 0,
        options: [
          ['Apresenta tópico frasal, repertório e análise que conecta a referência à desigualdade educacional afirmada no início.', 'A primeira frase enuncia o argumento; a segunda traz a referência; a terceira interpreta o dado e retorna ao ponto inicial, fechando o raciocínio.'],
          ['Apresenta apenas repertório, sem argumento próprio.', 'A primeira e a terceira frases contêm o argumento do autor.', 'ignorar as frases de argumentação'],
          ['Apresenta um argumento sem qualquer repertório de apoio.', 'A segunda frase traz a referência sobre conectividade escolar.', 'ignorar a referência presente'],
          ['Utiliza o repertório apenas como enfeite, sem relação com a tese.', 'A terceira frase estabelece exatamente essa relação.', 'contrariar o texto'],
          ['Depende de uma citação de autoridade para se sustentar.', 'Não há citação de autor; há uso analítico de informação.', 'confundir dado com citação de autoridade'],
        ],
        explanation: 'A sequência tópico frasal → repertório → análise → retomada é o desenho básico de um parágrafo argumentativo bem construído.',
      }),
      q({
        slug: 'q-repertorio-4',
        stem: 'Compare dois usos de repertório em textos sobre desperdício de alimentos:\n\nI. "Dados de organismos internacionais indicam que cerca de um terço dos alimentos produzidos no mundo é desperdiçado."\nII. "Dados de organismos internacionais indicam que cerca de um terço dos alimentos produzidos no mundo é desperdiçado — proporção que evidencia que a fome contemporânea não decorre de escassez de produção, mas de falhas na distribuição e no armazenamento."\n\nSobre os dois usos:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre repertório citado e repertório articulado',
        seconds: 140,
        errors: ['achar que a diferença é apenas de extensão'],
        correct: 1,
        options: [
          ['São equivalentes, pois apresentam a mesma informação.', 'A informação é a mesma, mas apenas II a transforma em argumento.', 'confundir informação com argumentação'],
          ['Apenas II articula o repertório, pois interpreta o dado e o converte em um argumento sobre a causa do problema.', 'Em I o dado aparece e para. Em II, o mesmo dado é lido e sustenta uma tese específica: o problema é de distribuição, não de produção.'],
          ['Apenas I é adequado, por ser mais objetivo e conciso.', 'Concisão não substitui a análise que o texto argumentativo exige.', 'confundir concisão com qualidade argumentativa'],
          ['Ambos são improdutivos, por não citarem a fonte exata.', 'A qualificação da fonte é adequada; a diferença entre os dois está na análise.', 'deslocar o critério'],
          ['A diferença entre eles é apenas de extensão do período.', 'A diferença é funcional: II acrescenta interpretação e conclusão.', 'reduzir a diferença ao tamanho'],
        ],
        explanation: 'O dado, sozinho, informa. O dado interpretado argumenta — e é a interpretação que caracteriza repertório produtivo.',
      }),
      q({
        slug: 'q-repertorio-5',
        stem: 'Um estudante precisa escolher duas referências para um texto sobre saúde mental na adolescência. Ele dispõe de: (a) uma frase motivacional de autoria desconhecida; (b) legislação que estabelece diretrizes de saúde mental na atenção básica; (c) um estudo sobre relação entre uso intensivo de redes sociais e indicadores de ansiedade; (d) uma citação célebre sobre felicidade, sem relação direta com o tema.\n\nA escolha e a justificativa mais consistentes são:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre seleção de repertório, pertinência e desenho argumentativo',
        seconds: 180,
        errors: ['escolher pela sonoridade da citação', 'não justificar a combinação'],
        correct: 4,
        options: [
          ['(a) e (d), por serem mais acessíveis ao leitor e criarem empatia.', 'Nenhuma das duas oferece base verificável nem sustenta um argumento específico.', 'trocar argumentação por efeito'],
          ['(a) e (c), combinando emoção e evidência.', 'A frase de autoria desconhecida não acrescenta base argumentativa.', 'aceitar repertório sem procedência'],
          ['(d) e (b), unindo tradição filosófica e norma legal.', 'A citação sobre felicidade não tem relação direta com o tema e exigiria uma ponte forçada.', 'escolher referência sem pertinência'],
          ['Apenas (c), pois um único repertório bem usado dispensa qualquer outro.', 'Um repertório pode bastar em um parágrafo, mas o texto ganha ao articular causa e resposta pública.', 'reduzir demais o repertório'],
          ['(b) e (c), porque uma trata da resposta institucional prevista e a outra de um fator associado ao problema, o que permite desenvolver causa e política pública e sustentar a proposta de intervenção.', 'As duas são verificáveis, pertinentes e complementares: (c) ajuda a explicar o problema e (b) sustenta o que já está previsto e não se efetiva, o que dá base à proposta de intervenção no fim do texto.'],
        ],
        explanation: 'A questão integra seleção de repertório, pertinência temática e planejamento do texto: as referências escolhidas devem cobrir causa e resposta, sustentando também a conclusão.',
      }),
      q({
        slug: 'q-repertorio-rec-1',
        stem: 'Ao usar um dado estatístico em uma redação, o procedimento mais adequado, quando não se lembra do número exato, é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'critério de honestidade no uso de repertório',
        seconds: 70,
        recovery: true,
        errors: ['inventar um número plausível'],
        correct: 1,
        options: [
          ['Inventar um número aproximado, já que o corretor não verificará a fonte.', 'Informação falsa compromete a credibilidade do texto e pode ser percebida.', 'apostar na não verificação'],
          ['Usar uma formulação qualificada, indicando a tendência sem afirmar um número que não se conhece.', 'Escrever "levantamentos recentes indicam que a maior parte..." mantém a honestidade e ainda sustenta o argumento.'],
          ['Omitir completamente qualquer referência a dados no texto.', 'A omissão total empobrece o texto quando havia informação útil disponível.', 'renunciar ao repertório'],
          ['Citar o dado como se fosse de conhecimento geral, sem qualquer qualificação.', 'Apresentar informação incerta como consensual é igualmente arriscado.', 'disfarçar a incerteza'],
          ['Substituir o dado por uma opinião pessoal enfática.', 'Opinião enfática não cumpre a função argumentativa do repertório.', 'trocar evidência por ênfase'],
        ],
        explanation: 'Qualificar a informação preserva a honestidade e mantém a força argumentativa; inventar números coloca todo o texto sob suspeita.',
      }),
    ],
  }),

  topic({
    slug: 'coesao-e-progressao',
    name: 'Coesão e progressão textual',
    subject: 'producao-textual',
    area: 'linguagens',
    summary:
      'Amarrar as partes do texto e fazer a ideia avançar: conectivos com sentido correto, retomadas variadas e parágrafos que não repetem.',
    difficulty: 'intermediate',
    minutes: 22,
    weight: 90,
    order: 3,
    prerequisites: ['tese-e-argumentacao'],
    related: ['repertorio-sociocultural', 'proposta-de-intervencao'],
    skill: {
      slug: 'construir-coesao-e-progressao-no-texto',
      name: 'Construir coesão e progressão no texto',
      description:
        'Empregar conectivos adequados ao sentido pretendido, retomar termos sem repetição e garantir avanço de ideias entre parágrafos.',
    },
    quick: `**Coesão** amarra; **coerência** faz sentido; **progressão** avança.

**Conectivos por sentido**

| Sentido | Conectivos |
| --- | --- |
| Adição | além disso, ademais, também |
| Oposição | porém, contudo, entretanto, no entanto |
| Causa | porque, uma vez que, visto que |
| Consequência | portanto, logo, por isso, de modo que |
| Condição | se, caso, desde que |
| Conclusão | portanto, dessa forma, em síntese |
| Exemplificação | por exemplo, a saber, como |

**Coesão referencial:** retomar sem repetir — pronomes, sinônimos, hiperônimos, expressões resumitivas ("essa medida", "tal cenário").

**Progressão:** cada parágrafo precisa acrescentar. Se o segundo desenvolvimento apenas reformula o primeiro, o texto anda em círculos.

**Erro que mais custa:** usar conectivo com o sentido trocado. "Portanto" onde a relação é de oposição embaralha o raciocínio inteiro.`,
    explanation: {
      title: 'Amarrar sem repetir e avançar sem se perder',
      body: `### 1. O conectivo é uma promessa

Ao escrever "no entanto", você promete ao leitor um contraste. Se o que vem depois não contrasta, a frase falha — mesmo estando gramaticalmente correta.

Antes de usar um conectivo, pergunte: **que relação existe entre estas duas ideias?** Escolha o conectivo depois de responder, nunca antes.

### 2. Retomar sem repetir

Repetir o mesmo substantivo cinco vezes empobrece; usar pronomes demais confunde. As alternativas:

- **Pronomes:** "essa política", "ele", "isso".
- **Sinônimos e hiperônimos:** "o transporte público" → "o serviço" → "o sistema".
- **Expressões resumitivas:** "tal medida", "esse cenário", "o problema descrito".

**Cuidado com a ambiguidade:** se houver dois substantivos candidatos antes do pronome, o leitor não sabe a qual ele se refere. Nesse caso, repita o termo — clareza vence elegância.

### 3. Progressão entre parágrafos

Um bom texto responde, a cada parágrafo, a uma pergunta nova:

1. **Introdução:** qual é o problema e qual é a minha tese?
2. **Desenvolvimento 1:** por que isso acontece? (causa)
3. **Desenvolvimento 2:** o que isso produz, ou que outro fator agrava? (consequência ou segunda causa)
4. **Conclusão:** o que fazer?

Se dois parágrafos respondem à mesma pergunta com palavras diferentes, falta progressão.

### 4. Coesão entre parágrafos

A primeira frase de cada parágrafo pode retomar o anterior e anunciar o novo passo, sem repetir o que já foi dito:

> "Se a ausência de infraestrutura explica parte do problema, a falta de fiscalização o aprofunda."

Essa frase amarra e avança em uma linha só.

### 5. Erros que os corretores registram

- conectivo com sentido oposto ao pretendido;
- excesso de "porém" e "além disso" a cada frase;
- pronome sem referente claro;
- parágrafo que repete o anterior;
- conclusão que apresenta ideia nova em vez de fechar o percurso.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — o conectivo errado embaralha tudo',
        body: `**Versão problemática:**
> "O município ampliou a rede de creches. Portanto, milhares de famílias continuam na fila de espera."

O "portanto" anuncia consequência, mas o que vem depois é um contraste: a ampliação **não** resolveu o problema.

**Versão corrigida:**
> "O município ampliou a rede de creches. **Ainda assim**, milhares de famílias continuam na fila de espera."

**Um passo além, com mais precisão:**
> "O município ampliou a rede de creches, **mas a expansão ficou aquém da demanda**: milhares de famílias continuam na fila."

**O que mudou:** a segunda versão corrige a relação lógica; a terceira ainda explica **por que** o contraste existe, o que aumenta a densidade argumentativa.`,
      },
      {
        title: 'Exemplo resolvido 2 — reescrever para eliminar repetição',
        body: `**Versão com repetição:**
> "O transporte público é precário. O transporte público não atende os bairros distantes. O transporte público precisa de investimento."

**Versão reescrita:**
> "O transporte público é precário: **o serviço** não alcança os bairros distantes, e **essa lacuna** só será resolvida com investimento contínuo."

**O que foi usado:**
- "o serviço" — hiperônimo que retoma sem repetir;
- "essa lacuna" — expressão resumitiva que condensa a ideia anterior;
- dois pontos e vírgula no lugar de três períodos curtos, o que também produz progressão.

**Repare no ganho duplo:** o texto ficou mais curto e disse mais.`,
      },
    ],
    mistakes: `**1. Escolher o conectivo antes de definir a relação.**
Conectivo é promessa de sentido: use apenas depois de saber se a relação é de causa, oposição, consequência ou adição.

**2. Usar pronome sem referente claro.**
Com dois substantivos candidatos por perto, o pronome gera ambiguidade. Repetir o termo é melhor que confundir.

**3. Repetir o mesmo argumento em outro parágrafo.**
Sem progressão, o texto ocupa linhas sem avançar — e o corretor percebe.`,
    selfCheck: [
      'Como você decide qual conectivo usar entre duas ideias?',
      'Quais recursos permitem retomar um termo sem repeti-lo?',
      'Como identificar que dois parágrafos do seu texto não estão progredindo?',
    ],
    questions: [
      q({
        slug: 'q-coe-1',
        stem: 'Considere as frases: "A cidade investiu em ciclovias. ______, o número de acidentes com ciclistas caiu pela metade."\n\nO conectivo que estabelece a relação lógica adequada entre as duas ideias é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'escolha de conectivo conforme a relação de sentido',
        seconds: 70,
        errors: ['escolher conectivo de oposição'],
        correct: 2,
        options: [
          ['No entanto', 'Anuncia contraste, mas a segunda frase confirma o efeito esperado do investimento.', 'usar oposição onde há consequência'],
          ['Embora', 'Introduz concessão e exigiria outra construção sintática.', 'trocar a relação lógica'],
          ['Como resultado', 'A segunda frase apresenta a consequência do investimento descrito na primeira, e o conectivo explicita essa relação.'],
          ['Por outro lado', 'Marca contraposição entre pontos de vista, o que não ocorre aqui.', 'usar contraposição inexistente'],
          ['Apesar disso', 'Indica que o efeito contraria a expectativa, o que não é o caso.', 'inverter a relação'],
        ],
        explanation: 'Investimento em ciclovias e queda de acidentes formam uma relação de causa e consequência.',
      }),
      q({
        slug: 'q-coe-2',
        stem: 'Leia o trecho: "A prefeitura ampliou o número de leitos. Portanto, o tempo de espera nos hospitais permaneceu inalterado."\n\nO problema desse trecho é que:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'identificação de conectivo inadequado ao sentido',
        seconds: 100,
        errors: ['achar que o problema é gramatical'],
        correct: 3,
        options: [
          ['O verbo "permanecer" está mal empregado no contexto.', 'O verbo está adequado; o problema é a relação lógica anunciada pelo conectivo.', 'diagnosticar erro inexistente'],
          ['Falta uma vírgula antes do conectivo.', 'A pontuação está correta; o problema é semântico.', 'diagnosticar problema de pontuação'],
          ['O trecho apresenta duas ideias sem relação possível entre si.', 'As ideias se relacionam, sim — por contraste, e não por consequência.', 'negar a relação existente'],
          ['O conectivo "portanto" anuncia consequência, mas a segunda oração apresenta um contraste em relação ao esperado.', 'Se os leitos aumentaram, esperava-se redução da espera. Como isso não ocorreu, a relação é adversativa: caberia "ainda assim" ou "no entanto".'],
          ['O trecho deveria começar pela segunda oração.', 'A ordem está adequada; o defeito é a escolha do conectivo.', 'propor mudança que não corrige o problema'],
        ],
        explanation: 'O conectivo é uma promessa de sentido. "Portanto" promete consequência; o que veio foi frustração da expectativa.',
      }),
      q({
        slug: 'q-coe-3',
        stem: 'Leia o parágrafo autoral:\n\n"A coleta seletiva avançou nas grandes cidades. Essa expansão, contudo, não alcançou os municípios menores, onde a ausência de estrutura de triagem faz com que o material reciclável siga para o aterro. Tal desigualdade regional revela que a política de resíduos precisa considerar as diferentes capacidades administrativas do país."\n\nOs recursos de coesão empregados no parágrafo são, principalmente:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'identificação de recursos coesivos em um texto',
        seconds: 130,
        errors: ['identificar apenas os conectivos'],
        correct: 0,
        options: [
          ['Um conectivo adversativo e expressões resumitivas que retomam ideias anteriores sem repeti-las.', '"Contudo" marca o contraste; "essa expansão" e "tal desigualdade" retomam, de forma condensada, o que foi dito antes, o que evita repetição e faz o texto progredir.'],
          ['Apenas repetições lexicais do termo "coleta seletiva".', 'O termo não é repetido: é retomado por expressões diferentes.', 'ignorar as retomadas'],
          ['Apenas conectivos de adição ao longo de todo o parágrafo.', 'O conectivo presente é adversativo, não aditivo.', 'errar a classificação do conectivo'],
          ['Uso exclusivo de pronomes pessoais para retomar os termos.', 'As retomadas são feitas por expressões nominais, não por pronomes pessoais.', 'trocar o recurso empregado'],
          ['Ausência de recursos coesivos, com frases justapostas.', 'O parágrafo é claramente articulado.', 'contrariar o texto'],
        ],
        explanation: '"Essa expansão" e "tal desigualdade" são expressões resumitivas: retomam e condensam, permitindo que o texto avance sem repetir.',
      }),
      q({
        slug: 'q-coe-4',
        stem: 'Compare dois segundos parágrafos de desenvolvimento, escritos para o mesmo texto sobre evasão escolar (cujo primeiro desenvolvimento tratou da necessidade de trabalho precoce):\n\nI. "Além disso, muitos jovens precisam trabalhar cedo, o que dificulta a permanência na escola."\nII. "Se a necessidade de renda explica parte das saídas, a ausência de acolhimento pedagógico explica outra: estudantes que acumulam reprovações deixam de encontrar sentido na escola muito antes de abandoná-la formalmente."\n\nSobre os dois parágrafos:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação quanto à progressão textual',
        seconds: 150,
        errors: ['avaliar apenas a correção gramatical'],
        correct: 1,
        options: [
          ['Ambos apresentam boa progressão, pois iniciam com conectivos adequados.', 'O conectivo de I é adequado, mas o conteúdo repete o parágrafo anterior.', 'confundir conectivo com progressão'],
          ['Apenas II apresenta progressão, pois retoma o argumento anterior e introduz uma causa distinta, enquanto I repete o que já havia sido dito.', 'I reapresenta a mesma causa com outras palavras, ocupando linhas sem avançar. II amarra o que veio antes e acrescenta um segundo fator, o que faz o texto progredir.'],
          ['Apenas I apresenta progressão, por ser mais direto e objetivo.', 'Objetividade não substitui a introdução de conteúdo novo.', 'confundir concisão com progressão'],
          ['Os dois são equivalentes, pois tratam do mesmo tema.', 'Tratar do mesmo tema é o esperado; a diferença está em acrescentar ou repetir.', 'ignorar o critério de progressão'],
          ['Nenhum dos dois progride, pois ambos citam o parágrafo anterior.', 'Retomar o anterior é justamente um recurso de coesão; o problema seria apenas repetir.', 'confundir retomada com repetição'],
        ],
        explanation: 'Progressão é acrescentar. Retomar o parágrafo anterior é coesão; repetir seu conteúdo com outras palavras é estagnação.',
      }),
      q({
        slug: 'q-coe-5',
        stem: 'Um estudante escreveu: "O programa foi criado em 2015 e ampliado em 2019. Ele não alcançou as regiões mais afastadas, o que reduziu seu impacto. Isso mostra que ele precisa de revisão."\n\nAo revisar o texto, a intervenção mais adequada é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre clareza referencial, coesão e revisão de texto',
        seconds: 170,
        errors: ['trocar apenas os conectivos', 'ignorar a ambiguidade dos pronomes'],
        correct: 4,
        options: [
          ['Substituir todos os pronomes por repetições do termo "programa", garantindo clareza absoluta.', 'A repetição excessiva resolve a ambiguidade criando outro problema de estilo.', 'trocar um defeito por outro'],
          ['Unir os três períodos em um só, ligados por vírgulas.', 'A junção sem conectivos adequados não resolve a ambiguidade nem melhora a articulação.', 'alterar a forma sem tratar o problema'],
          ['Acrescentar mais conectivos entre as frases, como "além disso" e "portanto".', 'Acrescentar conectivos sem corrigir os referentes mantém o problema central.', 'empilhar conectivos'],
          ['Retirar o último período, por apresentar uma conclusão precipitada.', 'A conclusão é pertinente; o problema está na clareza dos referentes.', 'remover conteúdo válido'],
          ['Explicitar os referentes ambíguos e articular as frases pelo sentido, por exemplo: "Criado em 2015 e ampliado em 2019, o programa não chegou às regiões mais afastadas, limitação que reduziu seu impacto e justifica uma revisão de seu desenho."', 'A reescrita elimina o "ele" e o "isso" sem referente claro, condensa a informação, marca a relação de causa e consequência e mantém a conclusão — resolvendo coesão referencial e articulação ao mesmo tempo.'],
        ],
        explanation: 'A questão integra coesão referencial, articulação lógica e revisão: pronomes sem referente claro e frases justapostas se resolvem na reescrita, não com mais conectivos.',
      }),
      q({
        slug: 'q-coe-rec-1',
        stem: 'Na frase "O secretário conversou com o diretor e ele afirmou que o projeto seria mantido", o problema de coesão é:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação de ambiguidade referencial',
        seconds: 70,
        recovery: true,
        errors: ['não perceber a ambiguidade'],
        correct: 2,
        options: [
          ['O uso incorreto do conectivo "e".', 'O conectivo aditivo está adequado à sequência de ações.', 'diagnosticar problema inexistente'],
          ['A ausência de vírgula antes de "e".', 'A vírgula não resolveria a ambiguidade do pronome.', 'confundir pontuação com referência'],
          ['A ambiguidade do pronome "ele", que pode retomar tanto o secretário quanto o diretor.', 'Com dois substantivos masculinos candidatos antes do pronome, o leitor não sabe quem afirmou. A solução é repetir o termo ou reorganizar a frase.'],
          ['O tempo verbal de "seria", inadequado ao contexto.', 'O futuro do pretérito é adequado ao discurso indireto.', 'diagnosticar erro verbal inexistente'],
          ['A repetição excessiva de termos ao longo da frase.', 'Não há repetição: o problema é justamente o oposto.', 'inverter o diagnóstico'],
        ],
        explanation: 'Quando há mais de um referente possível, o pronome gera ambiguidade — e clareza vale mais que evitar repetição.',
      }),
    ],
  }),

  topic({
    slug: 'proposta-de-intervencao',
    name: 'Proposta de intervenção',
    subject: 'producao-textual',
    area: 'linguagens',
    summary:
      'Fechar o texto com uma solução concreta, viável e detalhada — ligada aos problemas que o próprio texto levantou.',
    difficulty: 'challenging',
    minutes: 24,
    weight: 93,
    order: 4,
    prerequisites: ['tese-e-argumentacao', 'coesao-e-progressao'],
    skill: {
      slug: 'elaborar-proposta-de-intervencao-detalhada',
      name: 'Elaborar proposta de intervenção detalhada',
      description:
        'Construir propostas com agente, ação, meio, finalidade e detalhamento, articuladas aos argumentos desenvolvidos.',
    },
    quick: `**Os cinco elementos de uma proposta completa**

1. **Agente:** quem faz (Ministério da Educação, prefeituras, escolas, mídia, sociedade civil).
2. **Ação:** o que será feito.
3. **Meio ou modo:** como será feito.
4. **Finalidade:** para quê — o efeito esperado.
5. **Detalhamento:** um elemento aprofundado, com informação específica.

**Modelo de encaixe**

> [Agente] deve [ação], por meio de [meio], a fim de [finalidade], considerando que [detalhamento].

**O que derruba uma proposta**
- verbo vago: "conscientizar a população" sem dizer como;
- agente ausente ou genérico: "é preciso que algo seja feito";
- desconexão: propõe algo que não responde ao problema desenvolvido;
- inviabilidade: solução impossível no prazo ou fora da competência do agente;
- violação de direitos humanos — o que zera a competência em provas que a avaliam.

**A regra de ouro:** a proposta deve responder aos problemas **que o seu próprio texto levantou**.`,
    explanation: {
      title: 'De "é preciso conscientizar" a uma proposta que funciona',
      body: `### 1. Por que "conscientizar" quase nunca basta

"Conscientizar a população" não diz **quem** conscientiza, **como**, **para quem** e **com que efeito**. É a proposta mais comum e a mais fraca.

Compare:

> ❌ "É preciso conscientizar a população sobre o descarte de lixo eletrônico."

> ✅ "As secretarias municipais de meio ambiente devem implantar pontos fixos de coleta de eletrônicos em unidades de saúde e escolas, divulgados por mensagens nas contas de água e luz, a fim de encurtar a distância entre o morador e o descarte correto — já que a inexistência de ponto próximo é a principal razão apontada para o descarte comum."

O segundo texto tem agente, ação, meio, finalidade e detalhamento.

### 2. Escolher o agente certo

O agente precisa ter **competência real** sobre o problema:

- Educação básica: municípios e estados, com apoio federal.
- Saneamento: municípios e concessionárias, com financiamento estadual ou federal.
- Legislação: Congresso, assembleias, câmaras municipais.
- Fiscalização: órgãos específicos, conforme a área.
- Formação e mobilização: escolas, universidades, imprensa, organizações da sociedade civil.

Propor que "as escolas aprovem uma lei" é erro de competência, e o corretor percebe.

### 3. O detalhamento é o que diferencia

Detalhar não é escrever mais: é acrescentar informação **específica** — periodicidade, público, fonte de recursos, critério de prioridade, forma de acompanhamento.

> "…com prioridade para os municípios com menor cobertura de coleta, monitorada por indicadores anuais publicados pelo próprio órgão."

### 4. A proposta precisa fechar o texto

Se o desenvolvimento tratou de (a) falta de infraestrutura e (b) ausência de fiscalização, a conclusão deve responder aos dois pontos — ou explicar por que prioriza um.

Uma proposta que resolve um problema que o texto não discutiu revela que a conclusão foi escrita à parte.

### 5. Checklist de revisão

- Consigo apontar o agente em uma palavra?
- O verbo indica ação concreta?
- Digo **como** a ação acontece?
- Digo **para quê**?
- Acrescentei uma informação específica?
- A proposta responde aos problemas do meu texto?
- Ela respeita direitos humanos?

Sete perguntas, cerca de trinta segundos de revisão — e é onde muita nota se ganha ou se perde.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — melhorando uma proposta em três versões',
        body: `**Tema hipotético:** desertos alimentares em áreas urbanas periféricas.

**Versão 1 (fraca):**
> "O governo deve resolver o problema da alimentação nas periferias."

Agente genérico, ação vaga, sem meio, sem finalidade, sem detalhamento.

**Versão 2 (intermediária):**
> "As prefeituras devem incentivar feiras de produtores em bairros periféricos para melhorar o acesso a alimentos frescos."

Já tem agente, ação e finalidade. Falta o meio e o detalhamento.

**Versão 3 (completa):**
> "As prefeituras, em parceria com cooperativas de agricultura familiar, devem instalar feiras semanais em praças e equipamentos públicos de bairros sem comércio de hortifrúti, com isenção de taxa de ocupação para o produtor, a fim de reduzir a distância entre morador e alimento fresco — priorizando os territórios identificados como desertos alimentares nos mapeamentos municipais."

**O que entrou:** parceria (meio), isenção de taxa (detalhamento operacional), finalidade explícita e critério de priorização.`,
      },
      {
        title: 'Exemplo resolvido 2 — conectar a proposta ao desenvolvimento',
        body: `**Texto hipotético sobre acesso a bibliotecas:**

- Desenvolvimento 1: as bibliotecas se concentram em áreas centrais, o que faz o acesso depender de deslocamento, tempo e dinheiro.
- Desenvolvimento 2: os acervos raramente dialogam com o repertório dos jovens leitores, o que afasta quem chega.

**Proposta que fecha os dois pontos:**
> "As secretarias municipais de cultura devem instalar bibliotecas comunitárias em equipamentos já existentes nos bairros — como centros de saúde, escolas em horário estendido e associações de moradores —, com acervo definido em consulta pública aos próprios frequentadores, a fim de aproximar o livro do território e tornar o acervo reconhecível para quem chega, com renovação anual das obras a partir das sugestões recebidas."

**Repare:** "instalar em equipamentos existentes" responde ao problema (a); "acervo definido em consulta" responde ao problema (b). A conclusão não introduz assunto novo — ela colhe o que o texto plantou.`,
      },
    ],
    mistakes: `**1. Propor "conscientização" sem dizer como.**
Sem agente, meio e finalidade, a proposta não é avaliável.

**2. Escolher um agente sem competência sobre o problema.**
Escola não legisla; ministério não administra praça de bairro. Competência importa.

**3. Propor algo desconectado do próprio texto.**
A conclusão deve responder aos problemas que o desenvolvimento levantou — não a outros.`,
    selfCheck: [
      'Quais são os cinco elementos de uma proposta de intervenção completa?',
      'Por que "conscientizar a população" costuma ser insuficiente?',
      'Como verificar se a sua proposta responde aos problemas discutidos no texto?',
    ],
    questions: [
      q({
        slug: 'q-prop-1',
        stem: 'Em uma proposta de intervenção completa, os elementos esperados são:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'identificação dos elementos da proposta',
        seconds: 80,
        errors: ['esquecer o detalhamento'],
        correct: 3,
        options: [
          ['Tese, argumento e conclusão.', 'Esses são elementos da estrutura geral do texto, não da proposta.', 'confundir estrutura do texto com estrutura da proposta'],
          ['Introdução, desenvolvimento e fechamento.', 'Também descrevem a organização do texto, não a proposta em si.', 'confundir os planos'],
          ['Causa, consequência e solução.', 'São etapas do raciocínio argumentativo, não os componentes da proposta.', 'trocar o objeto da pergunta'],
          ['Agente, ação, meio, finalidade e detalhamento.', 'Quem faz, o que faz, como faz, para quê e com qual especificação: é essa combinação que torna a proposta avaliável.'],
          ['Repertório, dado estatístico e citação de autoridade.', 'São recursos de argumentação, não elementos da proposta.', 'trocar recursos por componentes'],
        ],
        explanation: 'Agente, ação, meio, finalidade e detalhamento são os cinco componentes que tornam uma proposta concreta.',
      }),
      q({
        slug: 'q-prop-2',
        stem: 'Leia a proposta: "É preciso que a sociedade se conscientize sobre a importância da reciclagem para que o meio ambiente seja preservado."\n\nO principal problema dessa proposta é que ela:',
        difficulty: 'intermediate',
        format: 'applied',
        reasoning: 'diagnóstico de proposta genérica',
        seconds: 100,
        errors: ['achar que o problema é a extensão'],
        correct: 0,
        options: [
          ['Não indica agente específico nem meio de execução, limitando-se a um apelo genérico à conscientização.', '"A sociedade" não é um agente com competência definida, e não há indicação de como a conscientização aconteceria. Sem agente e sem meio, a proposta não pode ser avaliada nem executada.'],
          ['Apresenta finalidade incorreta, pois preservar o meio ambiente não é objetivo da reciclagem.', 'A finalidade é pertinente; o problema está na ausência de agente e meio.', 'diagnosticar problema inexistente'],
          ['É longa demais para uma conclusão de texto dissertativo.', 'A proposta é curta; o defeito não é a extensão.', 'diagnosticar o problema errado'],
          ['Deveria propor uma lei em vez de uma ação educativa.', 'Ações educativas são propostas legítimas, desde que detalhadas.', 'restringir o tipo de proposta'],
          ['Utiliza vocabulário técnico inadequado ao gênero.', 'O vocabulário é acessível e adequado.', 'apontar defeito inexistente'],
        ],
        explanation: 'Propostas genéricas de conscientização falham por não indicarem quem age e por qual meio.',
        strategy: 'Teste a sua proposta perguntando "quem?" e "como?". Se não houver resposta no texto, reescreva.',
      }),
      q({
        slug: 'q-prop-3',
        stem: 'Leia a proposta autoral:\n\n"As secretarias estaduais de educação devem oferecer formação continuada em educação financeira aos professores do ensino médio, por meio de módulos on-line vinculados ao calendário de formação já existente, a fim de que o tema seja trabalhado de forma transversal nas disciplinas, com prioridade para as escolas de regiões com maiores índices de endividamento familiar."\n\nA análise dessa proposta indica que ela:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'identificação dos elementos presentes em uma proposta',
        seconds: 130,
        errors: ['não reconhecer o detalhamento'],
        correct: 4,
        options: [
          ['Apresenta agente e ação, mas não indica meio nem finalidade.', 'O meio ("módulos on-line vinculados ao calendário existente") e a finalidade ("a fim de que o tema seja trabalhado") estão explícitos.', 'ignorar elementos presentes'],
          ['Apresenta apenas finalidade, sem indicação de responsável.', 'O agente é nomeado logo na primeira palavra.', 'ignorar o agente'],
          ['É inviável, pois formação continuada não é atribuição de secretarias de educação.', 'Formação continuada de professores está entre as atribuições típicas dessas secretarias.', 'errar a competência do agente'],
          ['Fere direitos ao estabelecer prioridade entre escolas.', 'Priorizar territórios mais afetados é critério de equidade, não violação de direitos.', 'confundir priorização com discriminação'],
          ['Apresenta os cinco elementos: agente, ação, meio, finalidade e detalhamento, este último expresso no critério de priorização.', 'Secretarias estaduais (agente) devem oferecer formação (ação) por meio de módulos no calendário existente (meio), para que o tema seja trabalhado de modo transversal (finalidade), priorizando regiões com maior endividamento (detalhamento).'],
        ],
        explanation: 'A proposta é completa: cada elemento aparece de forma identificável, incluindo um detalhamento que especifica o critério de priorização.',
      }),
      q({
        slug: 'q-prop-4',
        stem: 'Compare duas propostas para um texto que discutiu a falta de acesso à internet em escolas rurais:\n\nI. "O Ministério da Educação deve promover campanhas nas redes sociais para valorizar a educação no campo."\nII. "O Ministério da Educação, em articulação com os estados, deve ampliar a conectividade de escolas rurais por meio de contratos com provedores regionais e do uso do fundo setorial de telecomunicações, a fim de viabilizar atividades pedagógicas que dependem de acesso à rede."\n\nSobre as duas propostas:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre propostas quanto à pertinência e ao detalhamento',
        seconds: 150,
        errors: ['avaliar pela simpatia da ideia'],
        correct: 2,
        options: [
          ['Ambas respondem ao problema, variando apenas no grau de detalhamento.', 'A proposta I não trata do problema levantado, que é de infraestrutura.', 'ignorar a desconexão temática'],
          ['A proposta I é superior, por envolver a comunidade escolar de forma mais ampla.', 'Alcance amplo não compensa a ausência de relação com o problema discutido.', 'confundir abrangência com pertinência'],
          ['Apenas II responde ao problema discutido, pois trata da infraestrutura de conectividade, com agente, meio, finalidade e recursos indicados.', 'O texto discutiu falta de acesso à internet. Campanhas de valorização não resolvem infraestrutura. A proposta II nomeia agentes, indica o meio, aponta fonte de recursos e explicita a finalidade pedagógica.'],
          ['Apenas I é viável, pois campanhas custam menos que ampliação de rede.', 'Custo menor não torna uma proposta pertinente ao problema.', 'confundir viabilidade financeira com adequação'],
          ['Nenhuma das duas é adequada, pois conectividade não é atribuição do Ministério da Educação.', 'Programas de conectividade escolar são executados com participação do MEC, em articulação com outros órgãos.', 'errar a competência do agente'],
        ],
        explanation: 'A proposta precisa responder ao problema que o texto levantou. Detalhamento sem pertinência não salva; pertinência sem detalhamento não basta.',
      }),
      q({
        slug: 'q-prop-5',
        stem: 'Um texto discutiu dois problemas relacionados ao descarte de medicamentos vencidos: a ausência de pontos de coleta acessíveis e o desconhecimento da população sobre os riscos ambientais.\n\nA conclusão mais consistente com esse desenvolvimento é:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre argumentos desenvolvidos e proposta final',
        seconds: 180,
        errors: ['responder a apenas um dos problemas', 'introduzir assunto novo na conclusão'],
        correct: 1,
        options: [
          ['Propor a proibição da venda de medicamentos em farmácias sem serviço de coleta, com multa aos estabelecimentos irregulares.', 'A medida ataca um dos pontos, mas ignora a dimensão informativa e recai em uma restrição de alcance discutível como resposta principal.', 'responder parcialmente com medida desproporcional'],
          ['Propor que a vigilância sanitária, junto às redes de farmácias, instale pontos de devolução em todas as unidades e que a informação sobre riscos e locais de descarte conste na embalagem e na receita, a fim de resolver ao mesmo tempo o acesso e o desconhecimento.', 'A proposta responde aos dois problemas do texto: cria a estrutura de coleta onde as pessoas já vão e leva a informação ao momento em que o medicamento é adquirido ou prescrito.'],
          ['Propor campanhas publicitárias em horário nobre sobre a importância do meio ambiente.', 'A campanha genérica não trata do acesso e nem informa sobre onde descartar.', 'responder com medida vaga'],
          ['Propor que a população procure informações sobre descarte correto na internet.', 'Transferir a responsabilidade ao indivíduo não resolve a ausência de estrutura.', 'individualizar o problema'],
          ['Propor a criação de uma nova indústria de reciclagem de medicamentos no país.', 'A proposta introduz um tema não discutido no texto e é inviável como fechamento.', 'introduzir assunto novo'],
        ],
        explanation: 'A questão integra os dois problemas desenvolvidos em uma única proposta com agente, ação, meio e finalidade — que é exatamente o que uma boa conclusão faz.',
      }),
      q({
        slug: 'q-prop-rec-1',
        stem: 'Uma proposta de intervenção que sugira a suspensão de direitos de um grupo específico como forma de resolver um problema social:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'reconhecimento do limite dos direitos humanos na proposta',
        seconds: 70,
        recovery: true,
        errors: ['avaliar a proposta apenas pela eficácia'],
        correct: 2,
        options: [
          ['É aceitável, desde que seja detalhada e viável.', 'Detalhamento e viabilidade não tornam legítima uma medida que suprime direitos.', 'avaliar apenas por critérios técnicos'],
          ['É aceitável se aplicada temporariamente.', 'A temporalidade não altera o problema de fundo.', 'relativizar pela duração'],
          ['Não é aceitável, pois propostas devem respeitar os direitos humanos.', 'O respeito aos direitos humanos é condição da proposta, e sua violação compromete integralmente a avaliação do texto.'],
          ['É aceitável quando apoiada por dados estatísticos.', 'Dados não legitimam a supressão de direitos.', 'confundir evidência com legitimidade'],
          ['É aceitável se o texto explicar bem as consequências.', 'Explicação não converte a medida em proposta legítima.', 'confundir clareza com legitimidade'],
        ],
        explanation: 'O respeito aos direitos humanos é um limite inegociável da proposta de intervenção.',
      }),
    ],
  }),
];

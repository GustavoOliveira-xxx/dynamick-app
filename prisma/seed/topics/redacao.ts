import type { SeedTopic } from '../types';

/** Conteúdo autoral de desenvolvimento — Conscious Knowledge. */
export const REDACAO_TOPICS: SeedTopic[] = [
  {
    slug: 'tese-e-argumentacao',
    name: 'Tese e argumentação',
    subjectSlug: 'producao-textual',
    areaSlug: 'linguagens',
    summary:
      'Formular um ponto de vista claro e sustentá-lo com argumentos pertinentes e repertório legítimo.',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    curationWeight: 97,
    order: 1,
    prerequisites: ['interpretacao-e-inferencia'],
    skills: [
      {
        slug: 'formular-tese-e-sustentar-com-argumentos',
        name: 'Formular ponto de vista e sustentá-lo com argumentos pertinentes',
        description:
          'Construir tese clara e defensável, organizar argumentos com progressão e usar repertório de forma produtiva.',
      },
    ],
    content: [
      {
        slug: 'tese-resumo',
        kind: 'quick_summary',
        title: 'Em 2 minutos',
        depth: 'quick',
        order: 1,
        body: `**Tese** é a resposta que você dá ao problema do tema. Ela precisa ser:

- **Clara**: dá para repetir em uma frase.
- **Defensável**: alguém razoável poderia discordar. Se ninguém discorda, é obviedade, não tese.
- **Sustentável**: você consegue defendê-la com o que sabe.

**Teste rápido:** escreva a frase contrária à sua tese. Se a contrária for absurda, sua tese é óbvia demais. Se for razoável, você tem uma tese de verdade.

**Estrutura que funciona:**
1. Introdução: contextualiza o problema + apresenta a tese.
2. Desenvolvimento 1: primeiro argumento + repertório + análise.
3. Desenvolvimento 2: segundo argumento (ângulo diferente) + repertório + análise.
4. Conclusão: retoma a tese + proposta de intervenção (agente, ação, meio, finalidade, detalhamento).

**Repertório só conta se for usado.** Citar sem conectar ao argumento é enfeite — e enfeite não pontua.`,
      },
      {
        slug: 'tese-explicacao',
        kind: 'explanation',
        title: 'Da tese à sustentação',
        depth: 'standard',
        order: 2,
        body: `### 1. Do tema à tese

Um tema não é uma pergunta com resposta única. "Desafios do acesso à água potável no Brasil" admite muitas teses:

- O problema é de **distribuição**, não de disponibilidade.
- O problema é de **infraestrutura de saneamento**, não de escassez.
- O problema decorre da **desigualdade territorial** do investimento público.

Todas são defensáveis. O que **não** é tese: "A água é muito importante para a vida." Isso é obviedade — ninguém discorda, e não há o que sustentar.

### 2. Argumento não é opinião repetida

Um argumento tem três partes:

1. **Afirmação**: o que você defende neste parágrafo.
2. **Sustentação**: dado, exemplo, referência histórica, conceito, princípio.
3. **Análise**: por que essa sustentação prova a afirmação.

A parte 3 é a mais esquecida e a mais valiosa. Sem ela, você juntou informação sem construir raciocínio.

### 3. Repertório produtivo

Repertório é conhecimento de fora do texto motivador: dado, obra, conceito, evento histórico, legislação, princípio filosófico.

- **Produtivo**: conectado ao argumento, explicando alguma coisa.
- **Improdutivo**: citado e abandonado ("Como disse Aristóteles, o homem é um animal político. Assim, o saneamento...").

Teste: se você apagar a citação e o parágrafo continuar igual, ela era decorativa.

### 4. Progressão entre parágrafos

Os dois desenvolvimentos devem atacar **ângulos diferentes** do mesmo problema — histórico e econômico, cultural e institucional, causa e consequência.

Se o segundo parágrafo repete o primeiro com outras palavras, o texto não progride.

### 5. Proposta de intervenção

Cinco elementos, todos necessários:

| Elemento | Pergunta |
| --- | --- |
| **Agente** | quem faz? |
| **Ação** | o que faz? |
| **Meio** | como faz? |
| **Finalidade** | para quê? |
| **Detalhamento** | com que recorte, público ou parceria? |

Proposta genérica ("o governo deve investir mais em educação") não cumpre nenhum dos cinco de forma verificável. A proposta precisa também **responder ao problema que você levantou** — não a um problema qualquer.

### 6. Respeito aos direitos humanos

Propostas que envolvam violência, supressão de direitos ou discriminação invalidam a competência. Isso não é detalhe de estilo: é critério eliminatório.`,
      },
      {
        slug: 'tese-exemplo-1',
        kind: 'worked_example',
        title: 'Exemplo resolvido 1 — transformar obviedade em tese',
        order: 3,
        body: `**Tema:** "Caminhos para o combate ao desperdício de alimentos no Brasil"

**Versão fraca (obviedade):**
> "O desperdício de alimentos é um problema muito grave que precisa ser combatido."

Ninguém discorda. Não há o que defender.

**Versão forte (tese):**
> "O desperdício de alimentos no Brasil decorre menos do comportamento do consumidor final e mais de perdas na cadeia entre a colheita e a distribuição, o que exige política de infraestrutura logística, e não apenas campanhas de conscientização."

**Por que funciona:**
- É **contestável**: alguém pode defender que o consumidor é o principal responsável.
- **Delimita** onde está o problema (a cadeia logística).
- Já **aponta a direção** da proposta (infraestrutura, não só campanha).

**Bônus:** essa tese praticamente organiza os dois desenvolvimentos — um sobre perdas na cadeia, outro sobre por que a campanha isolada é insuficiente.`,
      },
      {
        slug: 'tese-exemplo-2',
        kind: 'worked_example',
        title: 'Exemplo resolvido 2 — repertório que trabalha',
        order: 4,
        body: `**Argumento a defender:** a desigualdade no acesso à internet limita o exercício de direitos.

**Versão decorativa:**
> "Segundo pesquisas, muitos brasileiros não têm internet. Isso é ruim para a sociedade."

Vago, sem fonte identificável e sem análise.

**Versão produtiva:**
> "Serviços públicos essenciais — agendamento de consultas, matrícula escolar, acesso a benefícios — migraram para plataformas digitais na última década. Quando o acesso à conexão é desigual, essa migração transfere ao cidadão um custo que antes era do Estado: quem não tem internet em casa precisa de deslocamento, tempo e, muitas vezes, de intermediários para exercer um direito que deveria ser diretamente acessível. A digitalização, nesse cenário, amplia a distância que pretendia reduzir."

**O que mudou:**
- O repertório (digitalização de serviços) está **conectado** ao argumento.
- Há **análise**: o mecanismo pelo qual a desigualdade vira barreira de direito.
- A última frase **fecha o raciocínio** em vez de apenas informar.`,
      },
      {
        slug: 'tese-erros-comuns',
        kind: 'common_mistakes',
        title: 'Três erros que mais custam ponto',
        order: 5,
        body: `**1. Tese que ninguém discorda.**
"A educação é importante." Não há o que defender. Escreva a frase contrária: se ela for absurda, refaça a tese.

**2. Repertório citado e abandonado.**
Mencionar uma obra, um dado ou um filósofo sem explicar o que aquilo prova. Depois de citar, sempre escreva a frase "isso mostra que…".

**3. Proposta que não responde ao seu próprio problema.**
Se o texto defendeu que o gargalo é logístico, propor campanha educativa contradiz a própria argumentação. A proposta precisa fechar o raciocínio que você abriu.`,
      },
      {
        slug: 'tese-autoexplicacao',
        kind: 'self_explanation',
        title: 'Explique com suas palavras',
        order: 6,
        body: `1. Qual é o teste para saber se sua tese é defensável ou apenas óbvia?
2. Quais são as três partes de um argumento completo, e qual delas costuma faltar?
3. Por que a proposta de intervenção precisa responder especificamente ao problema levantado no seu texto?`,
      },
    ],
    questions: [
      {
        slug: 'q-red-1',
        stem:
          'Sobre o tema "Desafios para a permanência de jovens no ensino médio no Brasil", qual das formulações abaixo constitui uma tese adequada para um texto dissertativo-argumentativo?',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'identificação de tese defensável',
        estimatedSeconds: 100,
        skillSlug: 'formular-tese-e-sustentar-com-argumentos',
        likelyErrors: ['confundir obviedade com tese', 'confundir tema com tese'],
        options: [
          { label: 'A', text: 'A escola é uma instituição muito importante para a sociedade brasileira.', rationale: 'É uma obviedade: ninguém discorda e não há o que sustentar ao longo do texto.', errorHint: 'confundir consenso com tese' },
          { label: 'B', text: 'A evasão no ensino médio resulta principalmente da incompatibilidade entre a jornada escolar e a necessidade de trabalho dos estudantes, o que exige políticas de permanência e não apenas de acesso.', isCorrect: true, rationale: 'É contestável, delimita a causa apontada e já orienta o tipo de proposta. Alguém poderia defender outra causa principal — e é isso que caracteriza uma tese.' },
          { label: 'C', text: 'Este texto vai discutir os desafios para a permanência de jovens no ensino médio.', rationale: 'É um anúncio do que será feito, não uma posição sobre o problema.', errorHint: 'metatexto no lugar de tese' },
          { label: 'D', text: 'Muitos jovens abandonam a escola no Brasil todos os anos.', rationale: 'É uma constatação factual: descreve o problema sem oferecer explicação nem posição.', errorHint: 'confundir dado com tese' },
          { label: 'E', text: 'Os jovens deveriam valorizar mais a oportunidade de estudar.', rationale: 'Atribui o problema exclusivamente ao indivíduo, sem sustentação, e desconsidera as condições que produzem a evasão.', errorHint: 'individualizar problema estrutural' },
        ],
        explanation: {
          summary: 'A resposta é B. Tese é posição contestável e delimitada — não anúncio, constatação nem consenso.',
          strategy: 'Teste da frase contrária: se o oposto da sua tese for absurdo, ela é óbvia demais.',
        },
      },
      {
        slug: 'q-red-2',
        stem:
          'Leia o trecho de um parágrafo de desenvolvimento:\n\n"Como afirmou o filósofo John Locke, os homens nascem livres e iguais. Dessa forma, é evidente que o transporte público precisa melhorar no Brasil."\n\nO problema central desse trecho é:',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'avaliação de uso de repertório',
        estimatedSeconds: 110,
        skillSlug: 'formular-tese-e-sustentar-com-argumentos',
        likelyErrors: ['achar que o problema é a escolha do autor citado'],
        options: [
          { label: 'A', text: 'O repertório é apresentado sem análise que o conecte à afirmação, funcionando como enfeite.', isCorrect: true, rationale: 'Falta a etapa que liga a citação ao argumento: nada explica por que a afirmação de Locke sustenta a conclusão sobre transporte público. O salto lógico deixa o repertório improdutivo.' },
          { label: 'B', text: 'O autor citado é inadequado para textos escolares.', rationale: 'Locke é repertório legítimo; o problema está no uso, não na escolha.', errorHint: 'julgar a fonte em vez do uso' },
          { label: 'C', text: 'O trecho é longo demais para um parágrafo de desenvolvimento.', rationale: 'O trecho é curto; a extensão não é o problema.', errorHint: 'avaliar forma em vez de raciocínio' },
          { label: 'D', text: 'Citações filosóficas não devem aparecer em redações.', rationale: 'Repertório filosófico é bem-vindo quando conectado ao argumento.', errorHint: 'criar regra inexistente' },
          { label: 'E', text: 'O trecho apresenta erro gramatical que compromete o sentido.', rationale: 'Não há erro gramatical: o problema é de construção argumentativa.', errorHint: 'confundir gramática com argumentação' },
        ],
        explanation: {
          summary: 'A resposta é A. Repertório sem análise é decoração — a etapa "isso mostra que…" está faltando.',
          strategy: 'Depois de citar, escreva sempre uma frase que explique o que aquilo prova no seu argumento.',
        },
      },
      {
        slug: 'q-red-3',
        stem:
          'Analise a proposta de intervenção:\n\n"Portanto, é necessário que o governo invista mais em educação para resolver esse problema."\n\nEssa proposta é insuficiente porque:',
        difficulty: 'intermediate',
        cognitiveFormat: 'interpretation',
        reasoningType: 'avaliação de proposta de intervenção',
        estimatedSeconds: 110,
        skillSlug: 'formular-tese-e-sustentar-com-argumentos',
        likelyErrors: ['achar que basta citar um agente'],
        options: [
          { label: 'A', text: 'Apesar de indicar um agente genérico, não especifica ação concreta, meio de execução, finalidade nem detalhamento.', isCorrect: true, rationale: '"Investir mais em educação" não diz o que fazer, como fazer, por meio de qual instrumento, para qual público ou com que objetivo verificável. Faltam quatro dos cinco elementos.' },
          { label: 'B', text: 'Menciona o governo, e propostas não devem envolver o poder público.', rationale: 'O poder público é agente legítimo e frequente em propostas de intervenção.', errorHint: 'criar restrição inexistente' },
          { label: 'C', text: 'Propostas de intervenção são opcionais no texto dissertativo-argumentativo.', rationale: 'A proposta é parte esperada da conclusão nesse tipo de texto.', errorHint: 'desconsiderar exigência do gênero' },
          { label: 'D', text: 'A proposta deveria vir na introdução, e não na conclusão.', rationale: 'A conclusão é o lugar usual da proposta, após a argumentação que a justifica.', errorHint: 'errar a posição estrutural' },
          { label: 'E', text: 'Investimento em educação nunca resolve problemas sociais.', rationale: 'A crítica é à falta de especificidade da proposta, não ao mérito do investimento.', errorHint: 'trocar crítica de forma por juízo de conteúdo' },
        ],
        explanation: {
          summary: 'A resposta é A. Faltam ação, meio, finalidade e detalhamento — só o agente aparece, e de forma vaga.',
          conceptRecap: 'Agente, ação, meio, finalidade e detalhamento: os cinco elementos são cumulativos.',
        },
      },
      {
        slug: 'q-red-4',
        stem:
          'Um estudante defende a tese de que a principal barreira ao acesso à cultura em cidades médias é a **concentração geográfica** dos equipamentos culturais nos centros urbanos.\n\nQual proposta de intervenção fecha melhor esse raciocínio?',
        difficulty: 'challenging',
        cognitiveFormat: 'comparison',
        reasoningType: 'coerência entre tese e proposta',
        estimatedSeconds: 150,
        skillSlug: 'formular-tese-e-sustentar-com-argumentos',
        likelyErrors: ['escolher a proposta mais detalhada sem verificar a coerência'],
        options: [
          { label: 'A', text: 'A secretaria municipal de cultura deve criar programação itinerante em equipamentos já existentes nos bairros periféricos — escolas e centros comunitários —, por meio de editais com contrapartida de transporte, a fim de aproximar a oferta cultural de quem está distante do centro.', isCorrect: true, rationale: 'Responde exatamente à barreira apontada (distância) e traz os cinco elementos: agente, ação, meio, finalidade e detalhamento.' },
          { label: 'B', text: 'O Ministério da Educação deve incluir disciplinas de história da arte no currículo nacional para ampliar o repertório dos estudantes.', rationale: 'É uma proposta bem formulada, mas responde a outro problema — repertório —, não à concentração geográfica defendida na tese.', errorHint: 'proposta coerente com outro problema' },
          { label: 'C', text: 'A população deve valorizar mais os espaços culturais disponíveis em sua cidade.', rationale: 'Transfere ao indivíduo a solução de uma barreira estrutural e não indica ação, meio nem detalhamento.', errorHint: 'individualizar solução estrutural' },
          { label: 'D', text: 'O governo deve construir um grande centro cultural no centro da cidade, com programação diversificada.', rationale: 'Reforça exatamente a concentração que a tese aponta como problema.', errorHint: 'proposta que contradiz a própria tese' },
          { label: 'E', text: 'É preciso que haja mais cultura para todos, com apoio de toda a sociedade.', rationale: 'Formulação genérica, sem nenhum dos cinco elementos.', errorHint: 'proposta vaga' },
        ],
        explanation: {
          summary: 'A resposta é A. A proposta é coerente com a barreira defendida e traz os cinco elementos.',
          detailed: 'A alternativa B é a mais perigosa: está bem escrita e completa, mas resolve um problema que o texto não levantou. Coerência com a própria tese vale mais que sofisticação isolada.',
        },
      },
      {
        slug: 'q-red-5',
        stem:
          'Um texto defende que o principal obstáculo à saúde mental de adolescentes é a ausência de acolhimento nas escolas. Os dois parágrafos de desenvolvimento tratam, respectivamente, da falta de profissionais especializados nas redes de ensino e da ausência de formação de professores para identificar sinais de sofrimento.\n\nSobre a estrutura argumentativa desse texto:',
        difficulty: 'challenging',
        cognitiveFormat: 'integration',
        reasoningType: 'integração entre tese, progressão e coerência',
        estimatedSeconds: 160,
        skillSlug: 'formular-tese-e-sustentar-com-argumentos',
        likelyErrors: ['achar que os parágrafos se repetem', 'não avaliar a progressão'],
        options: [
          { label: 'A', text: 'Há progressão adequada: os dois parágrafos abordam ângulos distintos da mesma tese — recurso especializado e capacitação —, sustentando o obstáculo apontado.', isCorrect: true, rationale: 'Ambos tratam da mesma tese (ausência de acolhimento escolar), mas por caminhos diferentes: um trata da existência de profissionais, outro da preparação de quem já está lá. Isso é progressão, não repetição.' },
          { label: 'B', text: 'Os parágrafos são redundantes, pois ambos tratam de pessoal escolar.', rationale: 'Tratar do mesmo campo não é redundância: contratar especialistas e formar professores são medidas distintas, com custos e efeitos diferentes.', errorHint: 'confundir tema comum com repetição' },
          { label: 'C', text: 'A tese está incorreta, pois saúde mental é responsabilidade exclusiva da família.', rationale: 'A avaliação pedida é da estrutura argumentativa, e a tese é legítima e defensável.', errorHint: 'substituir análise por opinião sobre o mérito' },
          { label: 'D', text: 'Faltaria um terceiro parágrafo de desenvolvimento para que o texto fosse válido.', rationale: 'Dois desenvolvimentos bem construídos são estrutura adequada e usual.', errorHint: 'criar exigência formal inexistente' },
          { label: 'E', text: 'O texto deveria abandonar a tese inicial e tratar de outros fatores de saúde mental.', rationale: 'Delimitar é qualidade do texto dissertativo; abandonar a tese quebraria a coerência.', errorHint: 'confundir delimitação com limitação' },
        ],
        explanation: {
          summary: 'A resposta é A. Os dois parágrafos atacam ângulos diferentes da mesma tese — isso é progressão.',
          detailed: 'Esta questão integra três pontos: clareza da tese, progressão entre desenvolvimentos e coerência interna. O critério de progressão não é mudar de assunto, e sim mudar de ângulo sobre o mesmo problema.',
        },
      },
      {
        slug: 'q-red-rec-1',
        stem: 'Em um texto dissertativo-argumentativo, a função do parágrafo de introdução é:',
        difficulty: 'intro',
        cognitiveFormat: 'concept',
        reasoningType: 'estrutura do texto dissertativo',
        estimatedSeconds: 70,
        isRecovery: true,
        skillSlug: 'formular-tese-e-sustentar-com-argumentos',
        likelyErrors: ['confundir introdução com desenvolvimento'],
        options: [
          { label: 'A', text: 'Apresentar o problema e explicitar a tese que será defendida.', isCorrect: true, rationale: 'A introdução situa o leitor no problema e deixa claro qual posição o texto vai sustentar.' },
          { label: 'B', text: 'Desenvolver integralmente o primeiro argumento.', rationale: 'O desenvolvimento dos argumentos ocorre nos parágrafos seguintes.', errorHint: 'confundir com o desenvolvimento' },
          { label: 'C', text: 'Apresentar a proposta de intervenção.', rationale: 'A proposta pertence à conclusão, após a argumentação que a justifica.', errorHint: 'antecipar a conclusão' },
          { label: 'D', text: 'Listar todas as fontes que serão citadas.', rationale: 'O gênero não exige lista de fontes.', errorHint: 'aplicar convenção de outro gênero' },
          { label: 'E', text: 'Resumir o texto motivador da prova.', rationale: 'Copiar ou resumir o texto motivador não constrói tese própria.', errorHint: 'depender do texto motivador' },
        ],
        explanation: { summary: 'A resposta é A. Introdução: problema + tese.' },
      },
      {
        slug: 'q-red-rec-2',
        stem:
          'Qual elemento está ausente na proposta: "As escolas devem promover rodas de conversa mensais sobre saúde mental, com apoio de psicólogos da rede pública"?',
        difficulty: 'intermediate',
        cognitiveFormat: 'applied',
        reasoningType: 'checagem dos elementos da proposta',
        estimatedSeconds: 100,
        isRecovery: true,
        skillSlug: 'formular-tese-e-sustentar-com-argumentos',
        likelyErrors: ['não conferir os cinco elementos'],
        options: [
          { label: 'A', text: 'A finalidade — não se explicita o objetivo que a ação pretende alcançar.', isCorrect: true, rationale: 'Agente (escolas), ação (rodas de conversa), meio (apoio de psicólogos) e detalhamento (mensais) estão presentes. Falta dizer para quê: reduzir evasão, ampliar identificação precoce de sofrimento, criar canal de escuta.' },
          { label: 'B', text: 'O agente — não há responsável indicado.', rationale: 'As escolas são indicadas como agente.', errorHint: 'não localizar o agente' },
          { label: 'C', text: 'A ação — não se sabe o que fazer.', rationale: 'A ação é promover rodas de conversa.', errorHint: 'não localizar a ação' },
          { label: 'D', text: 'O meio — não se indica como executar.', rationale: 'O meio é o apoio de psicólogos da rede pública.', errorHint: 'não localizar o meio' },
          { label: 'E', text: 'Nenhum elemento está ausente.', rationale: 'A finalidade não aparece de forma explícita.', errorHint: 'não conferir os cinco elementos' },
        ],
        explanation: {
          summary: 'A resposta é A. Falta a finalidade: para que a ação existe.',
          strategy: 'Confira os cinco na ordem: quem, o quê, como, para quê, com que recorte.',
        },
      },
    ],
  },
];

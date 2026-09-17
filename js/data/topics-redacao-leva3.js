import { question as q, topic } from './leva8-factory.js';

export const REDACAO_TOPICS_LEVA_3 = [
  topic({
    slug: 'norma-culta-na-redacao',
    name: 'Norma culta na redação',
    subject: 'producao-textual',
    area: 'linguagens',
    summary:
      'Dominar o que a Competência 1 do ENEM cobra: concordância, regência, crase, pontuação e registro formal, sabendo o que é desvio grave e o que é deslize tolerável.',
    difficulty: 'intermediate',
    minutes: 26,
    weight: 90,
    order: 5,
    prerequisites: ['tese-e-argumentacao'],
    related: ['coesao-e-progressao', 'variacao-linguistica'],
    skill: {
      slug: 'aplicar-a-norma-culta-na-redacao-dissertativa',
      name: 'Aplicar a norma culta na redação dissertativa',
      description:
        'Reconhecer e corrigir desvios de concordância, regência, crase, pontuação e registro em textos dissertativo-argumentativos.',
    },
    quick: `**O que a Competência 1 avalia**

> "Demonstrar domínio da modalidade escrita formal da língua portuguesa."

São **200 pontos**. E o critério é **quantidade e gravidade** dos desvios — não perfeição absoluta. Uma redação nota 200 em C1 pode ter um deslize isolado.

**Escala aproximada**

| Nota | Perfil |
| --- | --- |
| 200 | domínio excelente; no máximo desvios isolados |
| 160 | bom domínio; poucos desvios |
| 120 | domínio mediano; desvios frequentes |
| 80 ou menos | desvios sistemáticos que atrapalham a leitura |

**Os erros que mais derrubam nota**

1. **Concordância verbal** — "**Faltam** políticas públicas" (não "falta"). O verbo concorda com o sujeito, mesmo quando ele vem depois.
2. **Verbo "haver" no sentido de existir** — é **impessoal**: "**Há** muitos desafios", "**Havia** poucos recursos". Nunca "houveram".
3. **Crase** — só antes de palavra feminina, quando há a fusão de *a* + *a*. Teste: troque por masculino. "Refere-se **à** questão" → "refere-se **ao** problema" ✓.
4. **Regência** — "implicar" não pede *em*: "isso **implica** mudanças". "Assistir" no sentido de ver pede *a*: "assistir **ao** filme".
5. **Pontuação** — nunca separe sujeito de verbo por vírgula: ~~"O governo, deve agir"~~.
6. **Registro** — sem gíria, sem "a gente", sem abreviação, sem emoji, sem "né".

**Marcas de informalidade que custam caro**

- "a gente" → **nós / a sociedade**
- "coisa", "algo assim", "tipo"
- "eu acho que" → o texto deve argumentar, não confessar opinião hesitante
- "nós temos que" → **é necessário que**

**Uso de primeira pessoa**

A tradição do ENEM é a impessoalidade. Prefira **3ª pessoa** ou **1ª do plural** ("é preciso reconhecer", "observa-se"). Evite "eu penso", "na minha opinião".`,
    explanation: {
      title: 'A gramática que decide pontos na redação',
      body: `### 1. Concordância verbal: a regra e as três armadilhas

O verbo concorda com o **sujeito**. Simples — até que o sujeito se esconde.

**Armadilha 1 — sujeito posposto.** O verbo continua concordando com ele, mesmo vindo depois:

- ❌ "Falta políticas públicas eficazes."
- ✅ "**Faltam** políticas públicas eficazes." (sujeito: *políticas públicas*)

**Armadilha 2 — expressões que parecem sujeito.** Em "Um dos problemas que mais afetam...", o verbo concorda com *problemas*, e não com *um*.

**Armadilha 3 — o verbo "haver" no sentido de existir.** Ele é **impessoal**: não tem sujeito e fica sempre no singular.

- ❌ "Houveram muitas manifestações."
- ✅ "**Houve** muitas manifestações."
- ✅ "**Há** décadas o problema persiste."

O mesmo vale para o verbo *fazer* indicando tempo: "**Faz** dez anos que...".

### 2. Crase em três testes

A crase é a fusão da preposição *a* com o artigo *a*. Ela só existe antes de palavra **feminina**.

**Teste 1 — troque por masculino.** Se aparecer "ao", há crase:

- "Devido **à** falta de investimento" → "devido **ao** descaso" ✓

**Teste 2 — antes de palavra masculina, não há crase** (exceto em "à moda de").

**Teste 3 — nunca há crase antes de:**
- verbo: "começou **a** discutir"
- pronome pessoal: "entregou **a** ela"
- palavra no plural sem artigo definido: "referiu-se **a** questões sociais"

E há sempre crase em **"à medida que"**, **"à vista"**, **"às vezes"**, **"à custa de"**.

Cuidado com a confusão clássica: **"à medida que"** (proporção) ≠ **"na medida em que"** (causa). *"À medida que a desigualdade cresce..."* / *"Na medida em que não há fiscalização..."*

### 3. Regência: os verbos que a banca vê passar todo ano

| Verbo | Regência correta | Exemplo |
| --- | --- | --- |
| implicar (acarretar) | **sem preposição** | "A medida implica mudanças." |
| visar (ter por objetivo) | **a** | "A política visa **à** inclusão." |
| assistir (ver) | **a** | "Assistiu **ao** debate." |
| obedecer / desobedecer | **a** | "Obedecer **às** normas." |
| preferir | **a** (nunca "do que") | "Prefere o diálogo **à** imposição." |
| aspirar (desejar) | **a** | "Aspira **a** um país mais justo." |

### 4. Pontuação: três regras que resolvem quase tudo

**Regra 1 — não separe sujeito de verbo, nem verbo de complemento, por uma única vírgula.**

- ❌ "A educação pública brasileira, enfrenta desafios."
- ✅ "A educação pública brasileira enfrenta desafios."

**Regra 2 — elemento deslocado para o início pede vírgula.**

- ✅ "**Nesse contexto,** é necessário agir."
- ✅ "**Segundo Milton Santos,** o território..."

**Regra 3 — explicação intercalada vai entre duas vírgulas** (nunca só uma).

- ✅ "O Brasil, **país de dimensões continentais**, enfrenta..."

Ponto e vírgula é útil para separar itens longos de uma enumeração — e bem usado, impressiona.

### 5. Registro formal sem rebuscamento

O erro mais comum é achar que formal significa complicado. Não significa. O texto deve ser **claro e preciso**, sem gíria e sem afetação.

Duas frases igualmente ruins:

- ❌ "A galera tá ligada que o problema é grande." (informal demais)
- ❌ "Hodiernamente, no que concerne à supracitada problemática, exsurge a necessidade..." (empolado, e "hodiernamente" é um dos clichês mais marcados de redação)

- ✅ "Atualmente, o problema exige resposta do poder público." (formal e claro)

**Evite também:** "desde os primórdios da humanidade", "com o advento da globalização", "é notório que" — não são erros gramaticais, mas são fórmulas gastas que não acrescentam argumento.

### 6. Estratégia de revisão: os 4 minutos que salvam 40 pontos

Reserve o fim da prova para uma leitura só de C1, procurando, nesta ordem:

1. **verbos**: cada um tem sujeito? concorda com ele?
2. **"há"/"houve"**: estão no singular?
3. **crases**: aplique o teste do masculino em cada uma.
4. **vírgulas**: alguma separa sujeito de verbo?
5. **registro**: sobrou "a gente", "coisa", "eu acho"?

Se precisar corrigir, use um traço simples sobre a palavra e escreva ao lado, com letra legível. Rasura não é penalizada; texto ilegível, sim.`,
    },
    examples: [
      {
        title: 'Exemplo resolvido 1 — corrigir um parágrafo real',
        body: `**Trecho com desvios:**

> *"Atualmente, existe no Brasil muitos problemas relacionado a educação. A gente percebe que, as políticas públicas não atende a demanda da população, o que implica em prejuízos para os estudantes."*

**Correção, desvio por desvio:**

1. **"existe muitos problemas"** → o sujeito é *muitos problemas*, plural. O verbo *existir* **não** é impessoal (diferente de *haver*): **"existem muitos problemas"**.
2. **"relacionado a educação"** → o adjetivo concorda com *problemas*: **"relacionados"**. E há crase em *a educação* (relacionados **à** educação).
3. **"A gente percebe"** → marca de informalidade. Troque por **"Percebe-se"** ou **"Observa-se"**.
4. **"que, as políticas"** → vírgula separando a conjunção do sujeito. **Retirar**.
5. **"não atende a demanda"** → sujeito *as políticas públicas*, plural: **"não atendem"**. E crase: **"à demanda"**.
6. **"implica em prejuízos"** → o verbo *implicar* no sentido de acarretar **não** pede preposição: **"implica prejuízos"**.

**Versão corrigida:**

> *"Atualmente, existem no Brasil muitos problemas relacionados à educação. Percebe-se que as políticas públicas não atendem à demanda da população, o que implica prejuízos para os estudantes."*

**Balanço:** seis desvios em duas frases derrubariam a C1 para a faixa de 120 ou menos. Corrigidos, o mesmo conteúdo volta à faixa alta.`,
      },
      {
        title: 'Exemplo resolvido 2 — decidir a crase em cinco casos',
        body: `**Situação:** decida se há crase em cada caso.

I. "Devido ___ falta de saneamento..."
II. "Começou ___ discutir o tema."
III. "___ medida que a tecnologia avança..."
IV. "Referiu-se ___ questões sociais."
V. "Entregou o relatório ___ ela."

**Caso I:** teste do masculino — "devido **ao** descaso" → aparece "ao" → **há crase**: "devido **à** falta".

**Caso II:** a palavra seguinte é **verbo** (*discutir*). Nunca há crase antes de verbo → **não há**: "começou **a** discutir".

**Caso III:** expressão fixa de proporção → **sempre com crase**: "**À** medida que". (Não confundir com "na medida em que", de causa.)

**Caso IV:** plural **sem artigo definido** — "referiu-se a questões" (não a *as* questões específicas) → **não há crase**. Se fosse "referiu-se **às** questões sociais debatidas ontem", com artigo, haveria.

**Caso V:** antes de **pronome pessoal** nunca há crase → **não há**: "entregou **a** ela".

**Resumo do método:** teste do masculino primeiro; depois verifique se a palavra seguinte é verbo, pronome pessoal ou plural sem artigo — nesses três casos, descarte a crase de imediato.`,
      },
    ],
    mistakes: `**1. Usar "houveram" no sentido de existir.**
O verbo *haver* nesse sentido é impessoal e fica sempre no singular: "**houve** protestos", "**há** problemas". Já *existir* concorda normalmente: "**existem** problemas".

**2. Separar sujeito de verbo com vírgula.**
"O governo, deve agir" é desvio de pontuação que a banca identifica de imediato. Entre sujeito e verbo não entra vírgula sozinha.

**3. Confundir formalidade com rebuscamento.**
"Hodiernamente" e "no que tange à supracitada problemática" não impressionam: soam artificiais e costumam vir acompanhados de erro de regência. Formal é claro e preciso, não empolado.`,
    selfCheck: [
      'Por que "houveram problemas" está errado e "existem problemas" está certo?',
      'Descreva o teste do masculino para decidir crase e cite dois casos em que ele não se aplica.',
      'Qual a diferença entre "à medida que" e "na medida em que"?',
      'Cite três marcas de informalidade que devem ser eliminadas de uma redação e suas substituições.',
      'Que roteiro você seguiria nos últimos minutos da prova para revisar só a Competência 1?',
    ],
    questions: [
      q({
        slug: 'q-normaculta-1',
        stem: 'A Competência 1 da redação do ENEM avalia o domínio da modalidade escrita formal da língua portuguesa. A avaliação dessa competência considera principalmente:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'compreensão do critério de correção da competência',
        seconds: 75,
        errors: ['supor que qualquer desvio zera a competência'],
        correct: 2,
        options: [
          ['A quantidade de palavras difíceis empregadas no texto.', 'Vocabulário rebuscado não é critério de avaliação e frequentemente vem acompanhado de desvios.', 'confundir formalidade com rebuscamento'],
          ['A ausência absoluta de qualquer desvio, sob pena de nota zero na competência.', 'O critério considera frequência e gravidade; desvios isolados são compatíveis com a nota máxima.', 'supor exigência de perfeição'],
          ['A quantidade e a gravidade dos desvios gramaticais e de registro ao longo do texto.', 'A correção observa se os desvios são isolados ou sistemáticos e o quanto comprometem a leitura, distribuindo a nota em faixas.'],
          ['A extensão do texto produzido pelo candidato.', 'Extensão não integra o critério dessa competência.', 'trocar o critério'],
          ['A originalidade do tema escolhido pelo candidato.', 'O tema é definido pela prova, e originalidade temática não é objeto da Competência 1.', 'trocar o critério'],
        ],
        explanation: 'A Competência 1 avalia domínio da norma formal por frequência e gravidade dos desvios, em faixas de pontuação.',
      }),
      q({
        slug: 'q-normaculta-2',
        stem: 'Assinale a reescrita que corrige adequadamente o trecho "Existe no país muitos problemas relacionado a educação pública".',
        difficulty: 'intro',
        format: 'applied',
        reasoning: 'aplicação de regras de concordância e crase na reescrita',
        seconds: 100,
        errors: ['corrigir apenas um dos desvios presentes no trecho'],
        correct: 4,
        options: [
          ['"Existe no país muitos problemas relacionados à educação pública."', 'Corrige a concordância do particípio e a crase, mas mantém o verbo no singular.', 'corrigir parcialmente'],
          ['"Existem no país muitos problemas relacionado a educação pública."', 'Corrige o verbo, mas mantém o particípio no singular e a crase ausente.', 'corrigir parcialmente'],
          ['"Existem no país muitos problemas relacionados a educação pública."', 'Corrige verbo e particípio, mas mantém a ausência da crase exigida.', 'corrigir parcialmente'],
          ['"Existe no país muitos problemas relacionados a educação pública."', 'Mantém dois dos três desvios do trecho original.', 'corrigir parcialmente'],
          ['"Existem no país muitos problemas relacionados à educação pública."', 'O sujeito é "muitos problemas", que exige o verbo no plural; o particípio concorda com ele; e "relacionados a" exige a preposição, que se funde ao artigo de "a educação".'],
        ],
        explanation: 'Três desvios no mesmo trecho: concordância verbal, concordância nominal e crase. A reescrita correta resolve os três.',
        strategy: 'Liste os desvios um a um antes de comparar as alternativas — a armadilha é a correção parcial.',
      }),
      q({
        slug: 'q-normaculta-3',
        stem: 'Em um parágrafo de redação, um candidato escreveu: "Na visão da sociedade, a gente percebe que houveram poucos avanços". Sobre esse trecho, é correto afirmar que:',
        difficulty: 'intermediate',
        format: 'interpretation',
        reasoning: 'identificação simultânea de desvio de registro e de flexão verbal',
        seconds: 120,
        errors: ['identificar apenas um dos dois problemas do trecho'],
        correct: 0,
        options: [
          ['Há dois problemas: o uso de "a gente", marca de informalidade inadequada ao texto dissertativo, e a flexão de "haver", que no sentido de existir é impessoal e deve permanecer no singular.', 'O registro adequado exigiria "percebe-se" ou "observa-se", e a forma correta é "houve poucos avanços", já que "haver" nesse sentido não admite sujeito.'],
          ['O trecho está inteiramente adequado à norma formal.', 'Há desvio de registro e desvio de flexão verbal.', 'não identificar os desvios'],
          ['O único problema é o uso de "a gente", pois "houveram" está correto.', '"Houveram" no sentido de existir é desvio: o verbo é impessoal.', 'identificar apenas um desvio'],
          ['O único problema é "houveram", pois "a gente" é aceitável em redação formal.', '"A gente" é marca de oralidade e deve ser evitada no texto dissertativo.', 'identificar apenas um desvio'],
          ['O trecho deveria ser reescrito em primeira pessoa do singular para ganhar clareza.', 'A tradição do texto dissertativo do ENEM é a impessoalidade, não a primeira pessoa do singular.', 'inverter a orientação de registro'],
        ],
        explanation: '"A gente" é desvio de registro; "houveram" no sentido de existir é desvio de flexão. O trecho reúne os dois.',
      }),
      q({
        slug: 'q-normaculta-4',
        stem: 'Comparando as construções "à medida que a desigualdade aumenta" e "na medida em que não há fiscalização", é correto afirmar que:',
        difficulty: 'challenging',
        format: 'comparison',
        reasoning: 'comparação entre expressões de proporção e de causa',
        seconds: 140,
        errors: ['tratar as duas expressões como equivalentes'],
        correct: 3,
        options: [
          ['As duas expressões são equivalentes e intercambiáveis em qualquer contexto.', 'Elas expressam relações lógicas diferentes: proporção e causa.', 'igualar expressões distintas'],
          ['Ambas exprimem relação de causa entre as orações.', 'Apenas a segunda exprime causa; a primeira indica proporcionalidade.', 'unificar o sentido'],
          ['Nenhuma das duas é aceita na norma culta.', 'As duas construções são corretas, com sentidos distintos.', 'negar construções corretas'],
          ['A primeira expressa proporcionalidade — algo ocorre à medida que outro fato avança — e a segunda expressa causa, equivalendo a "uma vez que".', 'A distinção é de sentido: proporção progressiva no primeiro caso, justificativa no segundo, e trocá-las compromete a precisão argumentativa.'],
          ['A diferença entre elas é apenas de formalidade, sem alteração de sentido.', 'A alteração é de relação lógica, não de registro.', 'reduzir a diferença a registro'],
        ],
        explanation: '"À medida que" marca proporção; "na medida em que" marca causa. Trocá-las gera imprecisão lógica no parágrafo.',
        strategy: 'Substitua mentalmente por "conforme" (proporção) ou "uma vez que" (causa) para escolher a expressão certa.',
      }),
      q({
        slug: 'q-normaculta-5',
        stem: 'Um candidato produz uma redação com argumentação consistente e proposta de intervenção completa, mas comete desvios sistemáticos de concordância, pontuação e regência ao longo de todo o texto. Sobre a avaliação dessa redação, conclui-se que:',
        difficulty: 'challenging',
        format: 'integration',
        reasoning: 'integração entre as competências da redação e o impacto do domínio da norma na nota final',
        seconds: 170,
        errors: ['supor que boa argumentação compensa desvios sistemáticos'],
        correct: 1,
        options: [
          ['A qualidade da argumentação compensa integralmente os desvios, mantendo a nota máxima em todas as competências.', 'As competências são avaliadas separadamente; o domínio da norma tem pontuação própria e não é compensado pelas demais.', 'supor compensação entre competências'],
          ['A redação pode obter boa pontuação nas competências relativas ao conteúdo e à proposta, mas terá a Competência 1 penalizada, o que reduz a nota final, já que cada competência é avaliada de forma independente.', 'As cinco competências valem 200 pontos cada e são pontuadas separadamente: desvios sistemáticos derrubam especificamente a Competência 1, sem anular o mérito das demais.'],
          ['Os desvios gramaticais zeram automaticamente toda a redação.', 'A nota zero total é reservada a situações específicas, como fuga ao tema ou desrespeito aos direitos humanos.', 'confundir penalização com anulação'],
          ['A Competência 1 é a única avaliada, de modo que o conteúdo é irrelevante.', 'As cinco competências são avaliadas, e o conteúdo pesa nas demais.', 'reduzir a avaliação a uma competência'],
          ['Desvios de pontuação não são considerados na correção da redação.', 'Pontuação integra o domínio da modalidade escrita formal avaliado na Competência 1.', 'excluir um critério existente'],
        ],
        explanation: 'As competências são independentes: bom conteúdo não recupera a C1, e desvios sistemáticos não anulam o mérito argumentativo.',
      }),
      q({
        slug: 'q-normaculta-rec-1',
        stem: 'Na frase "Devido ___ falta de investimento, o problema se agravou", o preenchimento correto da lacuna e sua justificativa são:',
        difficulty: 'intro',
        format: 'concept',
        reasoning: 'aplicação do teste de crase',
        seconds: 70,
        recovery: true,
        errors: ['ignorar o teste da substituição por termo masculino'],
        correct: 2,
        options: [
          ['"a", pois nunca há crase depois de "devido".', 'A locução "devido a" exige preposição, e diante de palavra feminina com artigo ocorre a crase.', 'criar regra inexistente'],
          ['"a", pois "falta" é substantivo abstrato.', 'A natureza abstrata do substantivo não interfere na ocorrência da crase.', 'usar critério irrelevante'],
          ['"à", pois a substituição por termo masculino resulta em "devido ao", o que indica a fusão da preposição com o artigo.', 'O teste do masculino é decisivo: se aparece "ao", há crase diante do termo feminino correspondente.'],
          ['"há", pois indica tempo decorrido.', 'Não há indicação de tempo na frase; trata-se de preposição com artigo.', 'confundir crase com o verbo haver'],
          ['"a", pois antes de substantivo feminino nunca ocorre crase.', 'A crase ocorre justamente diante de palavra feminina, quando há preposição e artigo.', 'inverter a regra'],
        ],
        explanation: 'Teste do masculino: "devido ao descaso" → logo, "devido à falta". É o método mais rápido e confiável na prova.',
      }),
    ],
  }),
];

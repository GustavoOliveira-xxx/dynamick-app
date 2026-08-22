-- Gerado por scripts a partir de js/data/. Não editar à mão.
-- Regenerar: node db/gerar-seed.mjs
BEGIN;

-- Áreas
INSERT INTO areas (slug, name, short_name, description, accent, display_order) VALUES ('linguagens', 'Linguagens, Códigos e suas Tecnologias', 'Linguagens', NULL, 'cyan', 1);
INSERT INTO areas (slug, name, short_name, description, accent, display_order) VALUES ('matematica', 'Matemática e suas Tecnologias', 'Matemática', NULL, 'green', 2);
INSERT INTO areas (slug, name, short_name, description, accent, display_order) VALUES ('ciencias-humanas', 'Ciências Humanas e suas Tecnologias', 'Ciências Humanas', NULL, 'lime', 3);
INSERT INTO areas (slug, name, short_name, description, accent, display_order) VALUES ('ciencias-natureza', 'Ciências da Natureza e suas Tecnologias', 'Ciências da Natureza', NULL, 'teal', 4);

-- Disciplinas
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('lingua-portuguesa', 'linguagens', 'Língua Portuguesa', 1);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('literatura', 'linguagens', 'Literatura', 2);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('producao-textual', 'linguagens', 'Produção Textual e Redação', 3);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('matematica', 'matematica', 'Matemática', 1);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('historia', 'ciencias-humanas', 'História', 1);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('geografia', 'ciencias-humanas', 'Geografia', 2);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('filosofia', 'ciencias-humanas', 'Filosofia', 3);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('sociologia', 'ciencias-humanas', 'Sociologia', 4);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('biologia', 'ciencias-natureza', 'Biologia', 1);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('fisica', 'ciencias-natureza', 'Física', 2);
INSERT INTO subjects (slug, area_slug, name, display_order) VALUES ('quimica', 'ciencias-natureza', 'Química', 3);

-- Tópicos
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('interpretacao-e-inferencia', 'lingua-portuguesa', 'linguagens', 'Interpretação e inferência', 'Separar o que o texto diz do que ele sugere, e reconhecer a intenção de quem escreveu.', 'intro', 15, 95, 1);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('generos-textuais-e-funcao-social', 'lingua-portuguesa', 'linguagens', 'Gêneros textuais e função social', 'Relacionar formato, contexto, público e finalidade — e perceber quando um texto foge do esperado de propósito.', 'intro', 15, 85, 2);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('porcentagem-e-variacao', 'matematica', 'matematica', 'Porcentagem e variação', 'Aumento, desconto, variação percentual e a diferença entre variação sobre o valor inicial e sobre o final.', 'intro', 20, 98, 1);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('leitura-de-graficos-e-tabelas', 'matematica', 'matematica', 'Leitura de gráficos e tabelas', 'Extrair, comparar e interpretar dados — e reconhecer quando a apresentação distorce a leitura.', 'intro', 20, 96, 2);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('funcoes-e-relacoes', 'matematica', 'matematica', 'Funções e relações', 'Interpretar relações entre grandezas em tabelas, gráficos e expressões — e reconhecer o que cada modelo permite prever.', 'intermediate', 25, 92, 3);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('cidadania-e-direitos', 'sociologia', 'ciencias-humanas', 'Cidadania e direitos', 'Relacionar conceitos sociais, históricos e políticos a situações concretas do cotidiano.', 'intro', 20, 94, 1);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('urbanizacao-e-desigualdade', 'geografia', 'ciencias-humanas', 'Urbanização e desigualdade', 'Interpretar fenômenos espaciais, sociais e econômicos das cidades brasileiras e suas desigualdades internas.', 'intermediate', 25, 90, 2);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('meio-ambiente-e-sociedade', 'geografia', 'ciencias-humanas', 'Meio ambiente e sociedade', 'Analisar impactos, conflitos, políticas e formas de uso do território a partir de casos concretos.', 'intermediate', 25, 88, 3);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('ecologia-e-ciclos', 'biologia', 'ciencias-natureza', 'Ecologia e ciclos', 'Relacionar seres vivos, energia, matéria e impactos ambientais em cadeias, teias e ciclos biogeoquímicos.', 'intro', 25, 93, 1);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('energia-e-transformacoes', 'fisica', 'ciencias-natureza', 'Energia e transformações', 'Interpretar conservação, consumo e transformação de energia em situações do cotidiano.', 'intermediate', 25, 91, 2);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('transformacoes-quimicas', 'quimica', 'ciencias-natureza', 'Transformações químicas', 'Identificar reagentes, produtos, evidências de reação e proporções básicas entre as substâncias.', 'intermediate', 25, 89, 3);
INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES ('tese-e-argumentacao', 'producao-textual', 'linguagens', 'Tese e argumentação', 'Formular um ponto de vista claro e sustentá-lo com argumentos pertinentes e repertório legítimo.', 'intermediate', 25, 97, 1);

-- Habilidades
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('identificar-informacao-explicita-e-implicita', 'interpretacao-e-inferencia', 'Identificar informações explícitas, implícitas e intenção comunicativa', 'Distinguir o que está escrito, o que é possível concluir com base no texto e o que é opinião de quem lê.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('relacionar-formato-contexto-publico-finalidade', 'generos-textuais-e-funcao-social', 'Relacionar formato, contexto, público e finalidade', 'Reconhecer o gênero de um texto e explicar como sua forma serve ao objetivo e ao leitor previsto.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('resolver-situacoes-com-variacao-percentual', 'porcentagem-e-variacao', 'Resolver situações com aumento, desconto, proporção e variação percentual', 'Aplicar fatores multiplicativos, calcular variação relativa e identificar sobre qual base o percentual incide.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('extrair-comparar-interpretar-dados', 'leitura-de-graficos-e-tabelas', 'Extrair, comparar e interpretar dados', 'Ler valores, comparar séries, calcular variações e identificar limitações e distorções da representação.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('interpretar-relacoes-entre-grandezas', 'funcoes-e-relacoes', 'Interpretar relações entre grandezas em tabelas, gráficos e expressões', 'Reconhecer padrões de variação, identificar o tipo de relação e traduzir entre as três representações.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('relacionar-conceitos-a-situacoes-concretas', 'cidadania-e-direitos', 'Relacionar conceitos sociais, históricos e políticos a situações concretas', 'Reconhecer, em casos do dia a dia, quais direitos estão em jogo e que mecanismos existem para efetivá-los.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('interpretar-fenomenos-espaciais-sociais-economicos', 'urbanizacao-e-desigualdade', 'Interpretar fenômenos espaciais, sociais e econômicos', 'Relacionar processos de urbanização, segregação socioespacial e acesso desigual a serviços urbanos.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('analisar-impactos-conflitos-e-uso-do-territorio', 'meio-ambiente-e-sociedade', 'Analisar impactos, conflitos, políticas e formas de uso do território', 'Identificar interesses em disputa, distribuição desigual de custos ambientais e instrumentos de política pública.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('relacionar-seres-vivos-energia-materia-impactos', 'ecologia-e-ciclos', 'Relacionar seres vivos, energia, matéria e impactos ambientais', 'Interpretar fluxo de energia, ciclagem de matéria e efeitos de alterações em cadeias e ecossistemas.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('interpretar-conservacao-consumo-transformacao-energia', 'energia-e-transformacoes', 'Interpretar conservação, consumo e transformação de energia', 'Identificar transformações de energia, calcular consumo elétrico e avaliar eficiência em situações reais.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('identificar-reagentes-produtos-evidencias-proporcoes', 'transformacoes-quimicas', 'Identificar reagentes, produtos, evidências e proporções básicas', 'Distinguir transformação física de química, ler equações balanceadas e aplicar proporções estequiométricas simples.');
INSERT INTO skills (slug, topic_slug, name, description) VALUES ('formular-tese-e-sustentar-com-argumentos', 'tese-e-argumentacao', 'Formular ponto de vista e sustentá-lo com argumentos pertinentes', 'Construir tese clara e defensável, organizar argumentos com progressão e usar repertório de forma produtiva.');

-- Pré-requisitos e relacionados (depois dos tópicos, por causa das FKs)
INSERT INTO topic_related (topic_slug, related_slug) VALUES ('interpretacao-e-inferencia', 'generos-textuais-e-funcao-social');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('generos-textuais-e-funcao-social', 'interpretacao-e-inferencia');
INSERT INTO topic_related (topic_slug, related_slug) VALUES ('porcentagem-e-variacao', 'leitura-de-graficos-e-tabelas');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('leitura-de-graficos-e-tabelas', 'porcentagem-e-variacao');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('funcoes-e-relacoes', 'porcentagem-e-variacao');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('funcoes-e-relacoes', 'leitura-de-graficos-e-tabelas');
INSERT INTO topic_related (topic_slug, related_slug) VALUES ('cidadania-e-direitos', 'urbanizacao-e-desigualdade');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('urbanizacao-e-desigualdade', 'cidadania-e-direitos');
INSERT INTO topic_related (topic_slug, related_slug) VALUES ('urbanizacao-e-desigualdade', 'meio-ambiente-e-sociedade');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('meio-ambiente-e-sociedade', 'urbanizacao-e-desigualdade');
INSERT INTO topic_related (topic_slug, related_slug) VALUES ('ecologia-e-ciclos', 'energia-e-transformacoes');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('energia-e-transformacoes', 'ecologia-e-ciclos');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('transformacoes-quimicas', 'energia-e-transformacoes');
INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES ('tese-e-argumentacao', 'interpretacao-e-inferencia');

-- Blocos de conteúdo
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('interpretacao-resumo', 'interpretacao-e-inferencia', 'quick_summary', 'Em 2 minutos', 'quick', 'Todo texto tem três camadas:

- **Explícito**: está escrito com todas as letras. Dá para apontar com o dedo.
- **Implícito (inferência)**: não está escrito, mas o texto obriga a concluir. A pista está lá.
- **Extrapolação**: não está no texto nem é obrigatório concluir. É opinião de quem lê — e em prova, quase sempre é a armadilha.

A pergunta que resolve a maioria das questões: **"onde exatamente o texto me obriga a isso?"** Se você não consegue apontar a passagem, provavelmente está extrapolando.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('interpretacao-explicacao', 'interpretacao-e-inferencia', 'explanation', 'Como funciona a inferência', 'standard', '### 1. Explícito x implícito

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

O passo 5 é o que mais muda resultado: em interpretação, a alternativa correta costuma ser a mais **modesta**, não a mais interessante.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('interpretacao-exemplo-1', 'interpretacao-e-inferencia', 'worked_example', 'Exemplo resolvido 1 — inferência simples', NULL, '**Texto:** "O restaurante que abriu na esquina tem sempre fila na porta. O antigo, que ficava do outro lado da rua, fechou em três meses."

**Pergunta:** o que se pode concluir?

**Raciocínio:**
- Explícito: um tem fila; o outro fechou em três meses.
- O texto coloca os dois lado a lado, o que sugere **comparação**.
- Inferência sustentada: o novo restaurante teve **mais movimento** que o antigo.
- Extrapolação (armadilha): "a comida do novo é melhor". O texto **não fala de qualidade**. Fila pode ser preço, novidade, localização.

**Resposta:** o novo teve mais procura. Nada além disso.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('interpretacao-exemplo-2', 'interpretacao-e-inferencia', 'worked_example', 'Exemplo resolvido 2 — intenção do autor', NULL, '**Texto:** "A nova ciclovia custou caro, tomou uma faixa de carros e, é claro, resolveu magicamente todos os problemas de mobilidade da cidade."

**Pergunta:** qual é a intenção do autor?

**Raciocínio:**
- "é claro" e "magicamente" são exageros — ninguém acredita que uma ciclovia resolve tudo.
- Quando alguém exagera de forma óbvia, está dizendo o **contrário** do que escreve: isso é **ironia**.
- A intenção é **criticar**, não elogiar nem informar.

**Cuidado:** a crítica é ao **discurso de que a ciclovia resolveria tudo**. Concluir que "o autor é contra ciclovias" já é extrapolação: ele critica o exagero, não necessariamente a obra.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('interpretacao-erros-comuns', 'interpretacao-e-inferencia', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Responder com o que você sabe do assunto, não com o que o texto diz.**
Se você já conhece o tema, o cérebro completa lacunas sozinho. Em prova, isso faz você marcar uma alternativa verdadeira no mundo — mas ausente no texto. Teste: consigo apontar a linha?

**2. Escolher a alternativa mais forte.**
Alternativas com "sempre", "nunca", "todos", "comprova que" exigem que o texto garanta muito. Texto curto raramente garante tanto. A alternativa correta costuma usar "sugere", "indica", "aponta".

**3. Confundir o que o autor diz com o que um personagem diz.**
Em narrativas e reportagens, a opinião entre aspas é da **fonte**, não do autor. Perguntas sobre "o ponto de vista do autor" mudam de resposta se você trocar um pelo outro.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('interpretacao-autoexplicacao', 'interpretacao-e-inferencia', 'self_explanation', 'Explique com suas palavras', NULL, '1. Qual é a diferença entre uma **inferência** e uma **opinião sua** sobre o texto? Dê um exemplo de cada.
2. Que marcas concretas em um texto ajudam a perceber que o autor quer **convencer** e não apenas informar?
3. Por que a alternativa mais "forte" costuma estar errada em questões de interpretação?', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('generos-resumo', 'generos-textuais-e-funcao-social', 'quick_summary', 'Em 2 minutos', 'quick', '**Gênero textual** é o formato que um texto assume para cumprir uma função social. Receita, bula, manchete, edital, meme, carta de leitor: cada um tem uma forma porque tem um trabalho a fazer.

Quatro perguntas identificam qualquer gênero:
1. **Quem escreve?** (uma empresa, um jornal, uma pessoa comum)
2. **Para quem?** (público amplo, especialista, cliente)
3. **Para quê?** (informar, instruir, convencer, registrar, divertir)
4. **Onde circula?** (jornal, rede social, mural, embalagem)

Mudar o suporte muda o gênero: a mesma informação vira notícia, post ou cartaz — e a forma muda junto.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('generos-explicacao', 'generos-textuais-e-funcao-social', 'explanation', 'Forma, função e quebra de expectativa', 'standard', '### A forma serve à função

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

Não existe registro "certo" em abstrato. Existe registro **adequado ao contexto**. Um post institucional excessivamente formal falha tanto quanto um ofício com gíria — os dois erram o leitor.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('generos-exemplo-1', 'generos-textuais-e-funcao-social', 'worked_example', 'Exemplo resolvido 1 — identificar pela forma', NULL, '**Texto:** "Modo de preparo: leve ao fogo médio por 8 minutos, mexendo sempre. Retire antes que grude."

**Como identificar:**
- Verbos no **imperativo** ("leve", "retire") → o texto manda fazer algo.
- Sequência **ordenada** de ações com tempo.
- Presença de um **aviso** para evitar erro.

**Gênero:** instrucional (receita ou manual). **Função:** garantir que alguém execute um procedimento corretamente. **Público:** quem vai executar, não quem vai avaliar.

**Cuidado:** o imperativo sozinho não define o gênero — publicidade também usa ("Compre já"). O que fecha a identificação é a **sequência ordenada com tempo e advertência**.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('generos-exemplo-2', 'generos-textuais-e-funcao-social', 'worked_example', 'Exemplo resolvido 2 — quebra de expectativa', NULL, '**Texto de campanha:** "PRESSA. Indicação: nenhuma. Contraindicação: qualquer trajeto com outras pessoas na via. Efeitos adversos: perda irreversível."

**O que está acontecendo:**
- A forma é de **bula de remédio** (indicação, contraindicação, efeitos adversos).
- O conteúdo é de **campanha de trânsito**.

**Por que funciona:** a bula é o gênero em que a gente aceita ler sobre risco de forma seca e técnica. Ao vestir a campanha com essa forma, o texto empresta essa seriedade e evita o tom de sermão.

**O que a prova costuma perguntar:** o **efeito** da escolha (aproximar risco de trânsito de risco médico), não o nome do gênero.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('generos-erros-comuns', 'generos-textuais-e-funcao-social', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Identificar o gênero pelo tema, não pela forma.**
Um texto sobre futebol pode ser notícia, crônica, tabela, meme ou súmula. O tema não define o gênero — a forma e a função definem.

**2. Tratar linguagem informal como erro.**
Em um post ou diálogo, informalidade é **adequação**. A pergunta certa não é "está certo?", e sim "serve ao contexto e ao leitor?".

**3. Descrever a forma e parar por aí.**
Dizer "usa imperativo" não responde nada. A questão quer saber **por que** essa escolha serve à função. Sempre complete a frase: "usa X **porque** o leitor precisa Y".', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('generos-autoexplicacao', 'generos-textuais-e-funcao-social', 'self_explanation', 'Explique com suas palavras', NULL, '1. Escolha um gênero que você lê com frequência. Que elemento da forma dele existe **por causa** do leitor previsto?
2. Por que a mesma informação muda de forma ao passar de um jornal para uma rede social?
3. Quando um texto imita o formato de outro gênero, o que precisa acontecer para o recurso funcionar?', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('porcentagem-resumo', 'porcentagem-e-variacao', 'quick_summary', 'Em 2 minutos', 'quick', 'Porcentagem é comparação com 100. **25% de 80** = 0,25 × 80 = 20.

**Trabalhe com fator multiplicativo** — economiza tempo e evita erro:

| Situação | Fator |
| --- | --- |
| Aumento de 10% | × 1,10 |
| Desconto de 10% | × 0,90 |
| Aumento de 100% | × 2,00 |
| Desconto de 50% | × 0,50 |

**Variações em sequência multiplicam, não somam.**
Aumentar 10% e depois dar 10% de desconto: 1,10 × 0,90 = **0,99** → perda de 1%, não empate.

**A pergunta decisiva:** *percentual sobre qual valor?* Sair de 40 para 50 é aumento de **25%** (10/40). Voltar de 50 para 40 é queda de **20%** (10/50). Mesma diferença absoluta, percentuais diferentes.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('porcentagem-explicacao', 'porcentagem-e-variacao', 'explanation', 'Fator multiplicativo, variação e a base de comparação', 'standard', '### 1. O fator multiplicativo

Em vez de calcular a parte e depois somar, multiplique direto:

- Aumento de `p`%: fator = `1 + p/100`
- Desconto de `p`%: fator = `1 − p/100`

Um produto de R$ 200 com 15% de desconto: 200 × 0,85 = **R$ 170**. Um passo, não dois.

### 2. Variações sucessivas

Multiplique os fatores. Nunca some os percentuais.

Exemplo: um preço sobe 20% e depois cai 20%.
`1,20 × 0,80 = 0,96` → o preço final é **4% menor** que o original.

O motivo: o aumento incidiu sobre o valor menor; a queda incidiu sobre o valor maior.

### 3. Variação percentual (a fórmula que resolve metade das questões)

`variação = (valor final − valor inicial) / valor inicial × 100`

O denominador é **sempre o valor de onde você partiu**. Esse é o erro mais comum da prova.

- De 80 para 100: (100−80)/80 = 0,25 → **+25%**
- De 100 para 80: (80−100)/100 = −0,20 → **−20%**

### 4. Ponto percentual ≠ porcentagem

Se uma taxa vai de 5% para 7%:
- Aumento de **2 pontos percentuais**.
- Aumento de **40%** (2/5) em termos relativos.

As duas leituras estão certas — e questões costumam apresentar uma como se fosse a outra.

### 5. Descontos "acumulados" da publicidade

"30% + 20% de desconto" **não é 50%**. É `0,70 × 0,80 = 0,56` → desconto real de **44%**.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('porcentagem-exemplo-1', 'porcentagem-e-variacao', 'worked_example', 'Exemplo resolvido 1 — aumento e desconto em sequência', NULL, '**Situação:** um curso custava R$ 480. Em janeiro, aumentou 25%. Em março, ofereceu 20% de desconto sobre o novo valor. Quanto custa agora?

**Passo 1 — fatores:** aumento 25% → 1,25 · desconto 20% → 0,80

**Passo 2 — multiplique:** 480 × 1,25 × 0,80

**Passo 3 — calcule:** 480 × 1,25 = 600 · 600 × 0,80 = **R$ 480**

**Leitura do resultado:** voltou ao valor original. Isso acontece porque 1,25 × 0,80 = 1,00 exatamente.

**Atenção:** isso é coincidência dos números escolhidos, não regra. Com 25% e 25%, daria 1,25 × 0,75 = 0,9375 → 6,25% de queda.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('porcentagem-exemplo-2', 'porcentagem-e-variacao', 'worked_example', 'Exemplo resolvido 2 — a base da comparação', NULL, '**Situação:** uma cidade tinha 250 leitos e passou a ter 300. Um jornal diz "aumento de 20%"; outro diz "aumento de 50 leitos, cerca de 17% do novo total". Quem está certo?

**Cálculo da variação:** (300 − 250)/250 = 50/250 = 0,20 → **+20%**

**O segundo cálculo:** 50/300 ≈ 0,167 → 16,7%. Esse número existe, mas responde outra pergunta: "os leitos novos representam quanto do total atual?".

**Conclusão:** para **variação**, a base é sempre o valor inicial. O segundo jornal calculou uma **participação**, não uma variação — e chamou pelo nome errado.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('porcentagem-erros-comuns', 'porcentagem-e-variacao', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Somar percentuais sucessivos.**
"Subiu 10% e depois 10%" não é 20%. É 1,1 × 1,1 = 1,21 → 21%. Multiplique sempre.

**2. Usar a base errada na variação.**
Dividir pelo valor final em vez do inicial. Regra fixa: o denominador é **de onde você saiu**.

**3. Confundir ponto percentual com porcentagem.**
De 4% para 6% são 2 pontos percentuais e 50% de aumento relativo. Leia o enunciado com atenção: ele diz qual das duas quer.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('porcentagem-autoexplicacao', 'porcentagem-e-variacao', 'self_explanation', 'Explique com suas palavras', NULL, '1. Por que um aumento de 50% seguido de um desconto de 50% **não** devolve o valor original?
2. Qual é o denominador da fórmula de variação percentual, e por quê?
3. Dê um exemplo em que "2 pontos percentuais" e "40% de aumento" descrevem a mesma mudança.', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('graficos-resumo', 'leitura-de-graficos-e-tabelas', 'quick_summary', 'Em 2 minutos', 'quick', 'Antes de olhar as barras, leia **três coisas**:

1. **O título** — o que está sendo medido?
2. **As unidades** — reais, milhares, percentual, por 100 mil habitantes?
3. **O eixo vertical** — começa em zero?

Eixo cortado é a distorção mais comum: uma diferença de 2% vira uma montanha visual.

**Cada gráfico serve a uma pergunta:**
| Gráfico | Responde |
| --- | --- |
| Barras | quem é maior? |
| Linhas | como evoluiu no tempo? |
| Setores (pizza) | qual a participação no total? |
| Dispersão | duas grandezas andam juntas? |

E o alerta que mais cai: **correlação não é causa**.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('graficos-explicacao', 'leitura-de-graficos-e-tabelas', 'explanation', 'Ler, comparar e desconfiar', 'standard', '### 1. Valor absoluto x valor relativo

Uma cidade com 500 casos e 5 milhões de habitantes tem situação melhor que outra com 100 casos e 200 mil habitantes:
- 500/5.000.000 = 10 por 100 mil
- 100/200.000 = 50 por 100 mil

Quando as populações diferem, comparar números absolutos leva à conclusão errada. Procure a **taxa**.

### 2. O eixo que não começa em zero

Em um gráfico de barras cujo eixo vai de 48 a 52, uma diferença de 1 ponto ocupa metade da altura. A leitura visual sugere um abismo; o dado mostra estabilidade.

**Como se defender:** leia os números do eixo antes de olhar a forma. Sempre.

### 3. Total x parte

Em gráficos de setores, as fatias somam 100% **daquele recorte**. Se o recorte for "entre os que responderam", a fatia não representa a população inteira.

### 4. Tendência x oscilação

Três pontos não fazem tendência. Séries com variação sazonal (vendas em dezembro, energia no verão) sobem e descem todo ano. Comparar dezembro com janeiro e concluir "queda" ignora o padrão.

Compare **o mesmo período de anos diferentes** quando houver sazonalidade.

### 5. Correlação não é causa

Duas séries podem subir juntas por acaso, por causa comum ou por causalidade real. O gráfico sozinho **nunca** distingue essas três hipóteses. Alternativas que afirmam "X causou Y" a partir de um gráfico costumam estar erradas.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('graficos-exemplo-1', 'leitura-de-graficos-e-tabelas', 'worked_example', 'Exemplo resolvido 1 — comparar com base diferente', NULL, '**Dados:**

| Escola | Aprovados | Total de alunos |
| --- | --- | --- |
| A | 180 | 400 |
| B | 120 | 200 |

**Pergunta:** qual escola teve melhor desempenho?

**Erro comum:** A, porque tem mais aprovados (180 > 120).

**Cálculo correto:**
- A: 180/400 = 45%
- B: 120/200 = 60%

**Resposta:** B teve melhor desempenho proporcional, mesmo com menos aprovados em números absolutos.

**Cuidado extra:** a questão pode perguntar "qual formou mais estudantes?" — aí a resposta é A. Leia o comando: absoluto ou proporcional?', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('graficos-exemplo-2', 'leitura-de-graficos-e-tabelas', 'worked_example', 'Exemplo resolvido 2 — o eixo cortado', NULL, '**Situação:** um gráfico de barras compara a satisfação com dois serviços. As barras têm alturas visivelmente diferentes — uma parece o dobro da outra. O eixo vertical vai de **70 a 76**.

**Valores reais:** serviço 1 = 72; serviço 2 = 75.

**Análise:**
- Diferença real: 3 pontos, ou 4,2% em termos relativos (3/72).
- Diferença visual: a barra de 75 ocupa quase o dobro da área acima da base 70.

**Conclusão:** a diferença existe, mas é pequena. O gráfico exagera porque a base não é zero.

**O que uma questão pode pedir:** identificar a distorção, ou calcular a diferença real. Nos dois casos, a resposta vem dos **números**, não da forma.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('graficos-erros-comuns', 'leitura-de-graficos-e-tabelas', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Comparar absolutos quando as bases são diferentes.**
Cidades, escolas e países com tamanhos distintos só se comparam por taxa.

**2. Ler a forma antes dos números.**
O cérebro compara alturas em um instante. Se o eixo estiver cortado, essa comparação instantânea está errada. Leia o eixo primeiro.

**3. Transformar correlação em causa.**
"As duas linhas subiram juntas, logo uma causou a outra" é a conclusão mais tentadora e mais frequentemente errada em provas.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('graficos-autoexplicacao', 'leitura-de-graficos-e-tabelas', 'self_explanation', 'Explique com suas palavras', NULL, '1. Por que um gráfico com eixo começando em 70 pode induzir a erro mesmo com dados corretos?
2. Quando comparar números absolutos é adequado e quando é enganoso?
3. Que tipos de explicação alternativa existem quando duas séries sobem juntas?', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('funcoes-resumo', 'funcoes-e-relacoes', 'quick_summary', 'Em 2 minutos', 'quick', 'Função é uma **regra que liga duas grandezas**: para cada valor de entrada, um único valor de saída.

**Como identificar o tipo pela tabela:**

| Se a cada passo igual de x… | O tipo é |
| --- | --- |
| y muda pela mesma **soma** | linear (1º grau) |
| y muda pela mesma **multiplicação** | exponencial |
| a diferença das diferenças é constante | quadrática |

Na função do 1º grau `y = ax + b`:
- **b** é o valor quando x = 0 (o "ponto de partida", uma taxa fixa, uma taxa de adesão)
- **a** é quanto y muda a cada unidade de x (a "velocidade")

Em situações reais, `b` costuma ser a parte fixa da conta e `a`, a parte que depende do consumo.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('funcoes-explicacao', 'funcoes-e-relacoes', 'explanation', 'Reconhecer o padrão e escolher o modelo', 'standard', '### 1. O teste da tabela

Dados os pares (x, y), calcule as diferenças de y para passos iguais de x.

| x | y | diferença |
| --- | --- | --- |
| 0 | 50 | — |
| 1 | 70 | +20 |
| 2 | 90 | +20 |
| 3 | 110 | +20 |

Diferença constante → **função do 1º grau**. Aqui: `y = 20x + 50`.

Se em vez de somar sempre 20 os valores fossem 50, 75, 112,5 (multiplicando por 1,5), a relação seria **exponencial**.

### 2. Traduzir o contexto para a expressão

Um plano de internet cobra R$ 60 fixos mais R$ 4 por giga extra:
`C(g) = 4g + 60`

- `60` é o que se paga mesmo usando zero giga extra.
- `4` é o custo de cada giga adicional.

Pergunta típica: "a partir de quantos gigas o plano A fica mais caro que o B?" → iguale as duas expressões e resolva.

### 3. O ponto de encontro

Dois planos: `A(g) = 4g + 60` e `B(g) = 6g + 40`.

`4g + 60 = 6g + 40 → 20 = 2g → g = 10`

Interpretação: **com 10 gigas, os planos custam o mesmo**. Abaixo disso, B é mais barato (parte fixa menor); acima, A é mais barato (custo por giga menor).

Essa leitura — "quem é melhor antes e depois do encontro" — é o que a prova quase sempre pede.

### 4. O que o modelo não faz

Uma função ajustada a dados observados vale **dentro do intervalo observado**. Usar `y = 20x + 50` para prever x = 500 quando os dados vão até x = 5 é extrapolação sem garantia: modelos lineares raramente continuam lineares para sempre.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('funcoes-exemplo-1', 'funcoes-e-relacoes', 'worked_example', 'Exemplo resolvido 1 — da tabela para a expressão', NULL, '**Tabela:** consumo de combustível de um trajeto

| Quilômetros | Litros no tanque |
| --- | --- |
| 0 | 45 |
| 100 | 37 |
| 200 | 29 |
| 300 | 21 |

**Passo 1 — as diferenças:** −8 a cada 100 km. Constante → função do 1º grau.

**Passo 2 — a taxa por km:** −8/100 = −0,08 litro por km.

**Passo 3 — o valor inicial:** 45 litros quando km = 0.

**Expressão:** `L(k) = 45 − 0,08k`

**Pergunta derivada:** quando o tanque zera?
`45 − 0,08k = 0 → k = 562,5 km`

**Ressalva importante:** o modelo supõe consumo constante. Em subida, trânsito ou velocidade alta, o consumo muda — a previsão é uma estimativa, não uma garantia.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('funcoes-exemplo-2', 'funcoes-e-relacoes', 'worked_example', 'Exemplo resolvido 2 — comparar dois planos', NULL, '**Situação:** duas academias.
- Plano Mensal: R$ 120 por mês, sem taxa.
- Plano Anual: R$ 300 de matrícula + R$ 90 por mês.

**Expressões:** `M(t) = 120t` e `A(t) = 90t + 300`

**Ponto de encontro:**
`120t = 90t + 300 → 30t = 300 → t = 10`

**Leitura:**
- Até 10 meses: o mensal sai mais barato (não tem a matrícula).
- Exatamente 10 meses: custam o mesmo (R$ 1.200).
- Acima de 10 meses: o anual compensa (mensalidade menor).

**Erro comum:** responder apenas "t = 10" sem dizer o que acontece antes e depois. A questão quase sempre quer a interpretação, não o número.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('funcoes-erros-comuns', 'funcoes-e-relacoes', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Confundir o coeficiente angular com o valor inicial.**
Em `y = 4x + 60`, muita gente responde 4 quando a pergunta é sobre o valor fixo. O fixo é o que sobra quando x = 0: é 60.

**2. Assumir que toda relação é linear.**
Se as diferenças não forem constantes, a reta não serve. Confira a tabela antes de aplicar `y = ax + b`.

**3. Parar no ponto de encontro.**
Encontrar t = 10 é metade da resposta. A outra metade é dizer qual opção vale antes e qual vale depois.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('funcoes-autoexplicacao', 'funcoes-e-relacoes', 'self_explanation', 'Explique com suas palavras', NULL, '1. Como você distingue, olhando só uma tabela, uma relação linear de uma exponencial?
2. Em uma conta de consumo, o que representa o coeficiente angular e o que representa o termo independente?
3. Por que o ponto de encontro entre dois planos raramente é a resposta completa de uma questão?', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('cidadania-resumo', 'cidadania-e-direitos', 'quick_summary', 'Em 2 minutos', 'quick', 'Cidadania não é um título que se ganha: é um **conjunto de direitos e deveres que se exerce**.

A divisão clássica (T. H. Marshall) organiza os direitos em três gerações:

| Tipo | O que garante | Exemplos |
| --- | --- | --- |
| **Civis** | liberdade individual perante o Estado e os outros | ir e vir, expressão, propriedade, defesa em juízo |
| **Políticos** | participação nas decisões coletivas | votar, ser votado, se organizar, se manifestar |
| **Sociais** | condições materiais para exercer os demais | saúde, educação, moradia, trabalho, previdência |

O ponto que mais cai em prova: **direito garantido em lei ≠ direito efetivado na prática**. A distância entre os dois é o que a sociologia chama de **cidadania incompleta** ou **regulada**.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('cidadania-explicacao', 'cidadania-e-direitos', 'explanation', 'Do texto legal à efetivação', 'standard', '### 1. Os três tipos, em situações reais

- **Civil:** ser atendido sem discriminação em um estabelecimento comercial.
- **Político:** participar de uma audiência pública sobre o orçamento do município.
- **Social:** conseguir uma vaga em creche pública perto de casa.

Repare que o direito social é condição para os outros: quem não tem escola, transporte ou informação exerce muito pouco os direitos políticos.

### 2. Por que o Brasil é um caso particular

No percurso europeu descrito por Marshall, os direitos vieram em sequência: civis → políticos → sociais. No Brasil, a ordem foi diferente e desigual.

Direitos sociais foram ampliados em períodos de restrição de direitos políticos — por exemplo, legislação trabalhista concedida sem liberdade sindical plena. Isso deu origem ao conceito de **cidadania regulada**: os direitos chegam vinculados à ocupação formal reconhecida pelo Estado, e não à condição de pessoa.

Consequência prática: quem estava fora do emprego formal — trabalho rural, doméstico, informal — ficava fora do pacote de direitos.

### 3. Universalidade e equidade

- **Universal**: vale para todos, sem seleção prévia. Ex.: atendimento no SUS.
- **Equidade**: tratar de forma diferente quem está em situação diferente, para chegar ao mesmo resultado. Ex.: reserva de vagas, transporte adaptado, atendimento prioritário.

Equidade **não contradiz** universalidade: é o mecanismo que a torna real quando os pontos de partida são desiguais.

### 4. Como cobrar um direito

Existe um caminho institucional concreto: ouvidoria, conselho tutelar, Defensoria Pública, Ministério Público, conselhos setoriais (saúde, educação), órgãos de defesa do consumidor. Questões costumam pedir a identificação do **canal adequado** para o caso apresentado.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('cidadania-exemplo-1', 'cidadania-e-direitos', 'worked_example', 'Exemplo resolvido 1 — classificar o direito em jogo', NULL, '**Situação:** um grupo de moradores organiza um abaixo-assinado e ocupa a tribuna da câmara municipal para pedir uma linha de ônibus no bairro.

**Que direitos aparecem?**
- **Político:** organizar-se coletivamente e participar de decisão pública. É o direito exercido no ato.
- **Social:** o transporte que eles reivindicam. É o direito buscado como resultado.
- **Civil:** a liberdade de reunião e expressão que torna a ação possível.

**A pergunta típica:** "qual direito está sendo **exercido**?" A resposta é o político — o social é o objetivo, não o meio.

**Cuidado:** confundir o direito exercido com o direito reivindicado é o erro mais comum nesse tipo de questão.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('cidadania-exemplo-2', 'cidadania-e-direitos', 'worked_example', 'Exemplo resolvido 2 — lei que existe, direito que não chega', NULL, '**Situação:** uma lei garante atendimento prioritário a idosos em repartições públicas. Em uma unidade sem sinalização, sem fila separada e com um único servidor no balcão, idosos esperam o mesmo tempo que os demais.

**Análise:**
- O direito **existe formalmente**: está previsto em lei.
- O direito **não se efetiva**: faltam condições materiais e organizacionais.

**Conceito aplicável:** a distância entre a norma e a prática. A garantia legal é condição necessária, não suficiente.

**O que a questão costuma cobrar:** identificar que o problema não é ausência de lei, e sim ausência de mecanismos de implementação e fiscalização. Alternativas que propõem "criar uma nova lei" costumam estar erradas justamente por isso.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('cidadania-erros-comuns', 'cidadania-e-direitos', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Achar que direito social é "favor" ou "benefício".**
Direito social é dever do Estado e obrigação constitucional, não concessão. Alternativas que usam a palavra "benefício" para descrever direito costumam ser distratores.

**2. Confundir universalidade com tratamento idêntico.**
Universal significa que ninguém fica de fora. Para chegar lá quando os pontos de partida são diferentes, é preciso tratamento diferenciado — isso é equidade, não privilégio.

**3. Concluir que a existência da lei resolve o problema.**
A prova quase sempre apresenta um caso em que a lei existe e o direito não chega. A resposta está nos mecanismos de efetivação, não na criação de mais normas.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('cidadania-autoexplicacao', 'cidadania-e-direitos', 'self_explanation', 'Explique com suas palavras', NULL, '1. Por que direitos sociais são condição para o exercício efetivo dos direitos políticos?
2. O que a expressão "cidadania regulada" descreve, e por que ela ajuda a entender o caso brasileiro?
3. Dê um exemplo em que tratar pessoas de forma diferente é o que garante igualdade de resultado.', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('urbanizacao-resumo', 'urbanizacao-e-desigualdade', 'quick_summary', 'Em 2 minutos', 'quick', 'A urbanização brasileira foi **rápida, tardia e concentrada**: em cerca de 40 anos (1950–1990) o país passou de majoritariamente rural a mais de 80% urbano.

Rápida demais para que infraestrutura, moradia e emprego formal acompanhassem. O resultado tem nome:

- **Periferização**: quem tem menos renda mora longe do trabalho e dos serviços.
- **Segregação socioespacial**: a desigualdade social vira desigualdade de endereço.
- **Especulação imobiliária**: terrenos vazios em áreas com infraestrutura, ocupação em áreas de risco.
- **Metropolização**: a cidade real ultrapassa o limite do município.

O conceito que amarra tudo: **direito à cidade** — não é só ter uma casa, é ter acesso ao que a cidade oferece.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('urbanizacao-explicacao', 'urbanizacao-e-desigualdade', 'explanation', 'Como a desigualdade vira geografia', 'standard', '### 1. O motor do processo

Duas forças agiram juntas a partir dos anos 1950:

- **Expulsão do campo**: mecanização agrícola e concentração fundiária reduziram a necessidade de mão de obra rural.
- **Atração urbana**: industrialização concentrada no Sudeste oferecia emprego e serviços.

O saldo foi um deslocamento massivo em poucas décadas — sem política habitacional na mesma escala.

### 2. Onde as pessoas foram morar

Quem chegava não conseguia pagar pelo solo urbano central, já valorizado. Restaram três caminhos:

- áreas distantes, sem infraestrutura;
- áreas de risco (encostas, várzeas), desprezadas pelo mercado justamente por serem perigosas;
- moradia precária em áreas centrais degradadas.

Isso não é desorganização: é o resultado previsível de um mercado de terras sem regulação e sem oferta pública de moradia.

### 3. O custo cotidiano da distância

A periferização cobra em tempo e dinheiro:
- deslocamentos longos reduzem horas de estudo, descanso e convívio;
- o transporte consome parcela relevante da renda;
- serviços públicos (saúde, escola, cultura) concentram-se onde a renda está.

Por isso o **direito à cidade** é mais amplo que o direito à moradia: incluir alguém na cidade significa dar acesso a transporte, trabalho, serviço e espaço público — não apenas um teto.

### 4. Metropolização e gestão

Uma região metropolitana funciona como uma cidade só: as pessoas dormem em um município, trabalham em outro, usam hospital em um terceiro. Mas cada município tem orçamento e gestão próprios.

Esse descompasso entre a **cidade real** e a **cidade administrativa** explica boa parte dos impasses em transporte, saneamento e resíduos — e é tema frequente de prova.

### 5. Gentrificação

Quando uma área periférica ou degradada recebe investimento, o valor do solo sobe e a população original é deslocada por preço. O bairro "melhora" e as pessoas que ali moravam não usufruem da melhoria. Requalificar sem deslocar exige política habitacional explícita.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('urbanizacao-exemplo-1', 'urbanizacao-e-desigualdade', 'worked_example', 'Exemplo resolvido 1 — ler um indicador urbano', NULL, '**Dados de uma cidade fictícia:**

| Região | População | Tempo médio de deslocamento | Domicílios com esgoto |
| --- | --- | --- | --- |
| Central | 120.000 | 22 min | 96% |
| Periférica | 380.000 | 68 min | 41% |

**Leitura:**
- A maioria da população (76%) está na região com pior infraestrutura.
- O tempo de deslocamento é 3 vezes maior.
- A cobertura de esgoto é menos da metade.

**Conclusão sustentada:** existe segregação socioespacial — a desigualdade de renda se materializa em desigualdade de acesso por localização.

**Conclusão NÃO sustentada:** "a periferia foi mal planejada". Os dados mostram o resultado, não a causa. A explicação exige informação sobre política habitacional, mercado de terras e histórico de ocupação.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('urbanizacao-exemplo-2', 'urbanizacao-e-desigualdade', 'worked_example', 'Exemplo resolvido 2 — requalificação e deslocamento', NULL, '**Situação:** um bairro recebe nova estação de metrô, praças e iluminação. Em cinco anos, o aluguel médio triplica e 40% dos moradores antigos se mudam.

**O que aconteceu:**
- O investimento público aumentou a **atratividade** do bairro.
- A valorização do solo elevou aluguel e IPTU.
- Quem alugava e tinha renda menor não conseguiu permanecer.

**Nome do processo:** gentrificação.

**O ponto central:** a melhoria urbana é real, mas foi capturada por quem chegou depois. Sem instrumentos de permanência — aluguel social, cota de habitação de interesse social, controle de uso do solo — a requalificação desloca em vez de incluir.

**Erro comum:** concluir que "não se deve investir em bairros pobres". A conclusão correta é que investir exige política de permanência simultânea.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('urbanizacao-erros-comuns', 'urbanizacao-e-desigualdade', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Tratar a ocupação de áreas de risco como escolha individual.**
Ninguém prefere morar em encosta instável. A ocupação acontece porque as áreas seguras estão precificadas acima da renda disponível.

**2. Confundir crescimento urbano com desenvolvimento urbano.**
Crescer é aumentar população e área construída. Desenvolver é ampliar acesso a serviços, trabalho e espaço público. Uma cidade pode crescer e piorar.

**3. Explicar a periferização apenas por migração.**
A migração explica o volume. A **localização** de quem chegou é explicada pelo preço da terra e pela ausência de política habitacional.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('urbanizacao-autoexplicacao', 'urbanizacao-e-desigualdade', 'self_explanation', 'Explique com suas palavras', NULL, '1. Por que o direito à cidade é mais amplo que o direito à moradia?
2. Como a especulação imobiliária ajuda a explicar terrenos vazios em áreas com infraestrutura e ocupação em áreas de risco?
3. O que precisaria acompanhar um investimento urbano para que ele não deslocasse a população original?', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ambiente-resumo', 'meio-ambiente-e-sociedade', 'quick_summary', 'Em 2 minutos', 'quick', 'Questão ambiental **é questão social**: quem causa o impacto e quem paga por ele raramente são as mesmas pessoas.

Três ideias que resolvem a maioria das questões:

- **Justiça ambiental**: os custos ambientais (poluição, risco, escassez) se concentram sobre populações de menor renda e grupos vulnerabilizados.
- **Externalidade**: custo produzido por uma atividade e pago por terceiros — a fábrica lucra, o rio recebe o efluente, a comunidade adoece.
- **Desenvolvimento sustentável**: atender necessidades presentes sem comprometer a capacidade das gerações futuras. Envolve três dimensões — ambiental, social e econômica — em tensão real, não em harmonia automática.

Cuidado com a resposta fácil: culpar "o consumidor" por um problema estrutural costuma ser distrator.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ambiente-explicacao', 'meio-ambiente-e-sociedade', 'explanation', 'Conflitos, custos e instrumentos', 'standard', '### 1. Quem paga a conta ambiental

Um aterro, uma termelétrica ou um polo industrial precisa ficar em algum lugar. Historicamente, esse lugar é onde a resistência é menor: áreas de menor renda, com menos acesso a informação técnica e representação política.

O resultado é que os **benefícios** (energia, emprego, produto) se distribuem amplamente, enquanto os **custos** (poluição, ruído, risco) se concentram localmente. Essa assimetria é o objeto da **justiça ambiental**.

### 2. Externalidades e internalização

Uma **externalidade negativa** é um custo que não aparece no preço do produto. Se o efluente é lançado sem tratamento, o custo existe — mas é pago pela comunidade em saúde e pela perda do rio.

**Internalizar** significa fazer esse custo voltar para quem o produz: licenciamento com condicionantes, taxação, obrigação de tratamento, responsabilização por dano. Não é punição: é correção de preço.

### 3. Conflitos de uso do território

O mesmo espaço costuma ser disputado por usos incompatíveis:
- agricultura x conservação;
- mineração x território tradicional;
- expansão urbana x área de proteção de manancial;
- turismo x modo de vida local.

Em prova, a pergunta raramente é "quem está certo". É **identificar os interesses em jogo** e **que instrumento poderia mediar** o conflito: zoneamento, licenciamento, unidade de conservação, consulta às comunidades afetadas.

### 4. Escalas do problema

- **Local**: contaminação de um córrego, ocupação de encosta.
- **Regional**: bacia hidrográfica compartilhada por vários municípios.
- **Global**: mudanças climáticas, camada de ozônio.

Um erro comum é aplicar solução de uma escala a problema de outra. Reciclagem doméstica é ação local relevante — mas não substitui regulação industrial nem matriz energética.

### 5. Responsabilidade diferenciada

Em problemas globais, países e grupos contribuíram de forma desigual para o problema e têm capacidades desiguais de resposta. Daí o princípio das **responsabilidades comuns porém diferenciadas**: todos participam, mas não na mesma proporção.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ambiente-exemplo-1', 'meio-ambiente-e-sociedade', 'worked_example', 'Exemplo resolvido 1 — identificar a externalidade', NULL, '**Situação:** uma indústria reduz custos ao não tratar o efluente. O rio a jusante perde a pesca, e a comunidade ribeirinha registra aumento de doenças de veiculação hídrica.

**Análise em três passos:**

1. **Quem ganha:** a indústria, que reduz custo de produção.
2. **Quem paga:** a comunidade, em saúde, e os pescadores, em renda.
3. **O custo desapareceu?** Não. Ele apenas saiu da planilha da empresa e entrou na vida de terceiros.

**Nome:** externalidade negativa.

**Instrumento de correção:** exigência de tratamento como condicionante de licença, com fiscalização e responsabilização por dano — de modo que o custo volte a quem o gera.

**Erro comum:** propor "conscientização da comunidade" como solução. A comunidade não é a origem do problema.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ambiente-exemplo-2', 'meio-ambiente-e-sociedade', 'worked_example', 'Exemplo resolvido 2 — conflito de uso', NULL, '**Situação:** um município quer autorizar loteamentos em área de proteção de manancial, alegando déficit habitacional. A companhia de água alerta para risco de contaminação do reservatório que abastece 300 mil pessoas.

**Interesses em jogo:**
- Necessidade real de moradia (direito social).
- Segurança hídrica de uma população maior (direito difuso).
- Interesse imobiliário na valorização da área.

**Por que a resposta não é simples:** os dois primeiros são direitos legítimos. Reduzir o caso a "meio ambiente x pessoas" é falso — as 300 mil pessoas abastecidas também são pessoas.

**Instrumentos de mediação:** zoneamento que direcione a expansão habitacional para áreas adequadas; produção de habitação de interesse social fora da área de manancial; regularização com restrição de densidade onde já há ocupação consolidada.

**O que a prova cobra:** reconhecer que existe conflito entre direitos e que o instrumento adequado é o planejamento territorial, não a escolha entre "desenvolvimento" e "preservação".', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ambiente-erros-comuns', 'meio-ambiente-e-sociedade', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Reduzir a questão ambiental a comportamento individual.**
Consumo consciente importa, mas problemas estruturais exigem regulação, infraestrutura e política pública. Alternativas que atribuem a solução exclusivamente ao indivíduo costumam ser distratores.

**2. Opor "meio ambiente" a "pessoas".**
Populações atingidas por degradação são pessoas. A disputa real costuma ser entre grupos com interesses diferentes, não entre natureza e humanidade.

**3. Aplicar solução na escala errada.**
Separar o lixo em casa não resolve destinação industrial de resíduos perigosos. Verifique se a escala da solução corresponde à escala do problema.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ambiente-autoexplicacao', 'meio-ambiente-e-sociedade', 'self_explanation', 'Explique com suas palavras', NULL, '1. O que significa dizer que uma empresa "externalizou" um custo ambiental?
2. Por que a distribuição dos danos ambientais costuma coincidir com a distribuição da renda?
3. Dê um exemplo em que dois direitos legítimos entram em conflito no uso do território.', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ecologia-resumo', 'ecologia-e-ciclos', 'quick_summary', 'Em 2 minutos', 'quick', 'Duas regras organizam quase toda a ecologia:

1. **Energia FLUI** — entra pelo Sol, passa pelos níveis tróficos e sai como calor. **Não volta.**
2. **Matéria CICLA** — carbono, nitrogênio, água e fósforo são reutilizados indefinidamente.

**Níveis tróficos:**
produtores → consumidores primários → secundários → terciários, com **decompositores** atuando em todos.

**A regra dos 10%:** a cada nível, cerca de 90% da energia se perde como calor. Por isso as cadeias são curtas (3 a 5 níveis) e há sempre muito mais capim que onça.

**Bioacumulação:** substâncias que o organismo não elimina se concentram ao subir a cadeia. O topo é o mais atingido — inclusive quando o topo somos nós.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ecologia-explicacao', 'ecologia-e-ciclos', 'explanation', 'Fluxo, ciclagem e o efeito das alterações', 'standard', '### 1. Por que energia flui e matéria cicla

A energia solar é capturada na fotossíntese e transformada em matéria orgânica. A cada transferência, parte se dissipa como calor — energia degradada não é reaproveitada pelo ecossistema. Por isso é preciso **entrada contínua** de energia.

Já os átomos de carbono, nitrogênio e fósforo são os mesmos há bilhões de anos: passam de organismo para organismo, voltam ao solo e à atmosfera e retornam. Um ecossistema não precisa de "entrada de matéria" da mesma forma.

### 2. A pirâmide e o número de níveis

Se cada nível aproveita cerca de 10% da energia do anterior:
- 10.000 kcal em produtores
- 1.000 kcal em consumidores primários
- 100 kcal em secundários
- 10 kcal em terciários

Depois disso não sobra energia suficiente para sustentar mais um nível. É a razão física para cadeias curtas — não uma escolha dos organismos.

### 3. Cadeia x teia

**Cadeia** é uma sequência linear, uma simplificação didática. **Teia** é o que existe de fato: o mesmo organismo ocupa níveis diferentes conforme o que come.

Consequência prática: a remoção de uma espécie em uma teia tem efeitos que se propagam por vários caminhos, não apenas para cima e para baixo de uma linha.

### 4. Ciclos biogeoquímicos, em uma frase cada

- **Água:** evaporação/transpiração → condensação → precipitação → infiltração e escoamento.
- **Carbono:** fotossíntese retira CO₂; respiração, decomposição e queima devolvem. A queima de combustível fóssil devolve carbono estocado por milhões de anos em décadas — daí o desequilíbrio.
- **Nitrogênio:** o N₂ do ar é abundante mas inerte; bactérias fixadoras o convertem em formas assimiláveis. Sem elas, não há proteína.
- **Fósforo:** não tem fase gasosa relevante; vem da rocha e é o mais facilmente limitante.

### 5. Eutrofização — o encadeamento que mais cai

Excesso de nutrientes (esgoto, fertilizante) → proliferação de algas → bloqueio de luz → morte de produtores submersos → decomposição intensa → **consumo de oxigênio dissolvido** → mortandade de peixes.

Repare: o que mata os peixes é a **falta de oxigênio**, não a alga em si. Esse detalhe é a resposta correta na maioria das questões sobre o tema.

### 6. Bioacumulação e biomagnificação

- **Bioacumulação:** acúmulo ao longo da vida de um indivíduo.
- **Biomagnificação:** aumento da concentração a cada nível trófico.

Um predador de topo come muitos organismos contaminados e concentra a substância de todos eles.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ecologia-exemplo-1', 'ecologia-e-ciclos', 'worked_example', 'Exemplo resolvido 1 — o que acontece ao remover um nível', NULL, '**Situação:** em um lago, a pesca intensiva reduz drasticamente a população de peixes carnívoros que se alimentam de peixes menores herbívoros.

**Encadeamento esperado:**
1. Sem predador, a população de herbívoros **aumenta**.
2. Mais herbívoros consomem mais algas e plantas aquáticas → produtores **diminuem**.
3. Com menos produtores, o alimento se torna escasso e a população de herbívoros **cai** depois de um pico.
4. O sistema oscila até encontrar novo equilíbrio, geralmente com menor biodiversidade.

**O erro comum:** parar no passo 1 e responder "aumenta a população de herbívoros" como efeito final. A questão costuma pedir o efeito **sobre os produtores** ou o resultado após o período de ajuste.

**Conceito envolvido:** controle de cima para baixo (top-down) exercido por predadores sobre a estrutura da comunidade.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ecologia-exemplo-2', 'ecologia-e-ciclos', 'worked_example', 'Exemplo resolvido 2 — ler uma pirâmide de energia', NULL, '**Dados:** um ecossistema tem 20.000 kcal/m²/ano fixadas pelos produtores.

**Pergunta:** quanta energia chega, aproximadamente, ao terceiro nível de consumidores?

**Cálculo (transferência de ~10%):**
- Consumidores primários: 2.000 kcal
- Consumidores secundários: 200 kcal
- Consumidores terciários: **20 kcal**

**Interpretação:** 20 kcal de 20.000 — apenas 0,1% da energia inicial. Isso explica por que predadores de topo são poucos, precisam de grandes territórios e são os mais vulneráveis a alterações no ecossistema.

**Extensão útil:** também explica por que uma dieta baseada em produtores sustenta mais pessoas por hectare que uma baseada em consumidores — menos etapas, menos perda.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ecologia-erros-comuns', 'ecologia-e-ciclos', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Dizer que a energia "cicla".**
Energia flui e se dissipa; matéria cicla. Trocar os dois é o erro mais frequente da área.

**2. Dizer que na eutrofização as algas envenenam os peixes.**
Na maioria dos casos, os peixes morrem por **queda do oxigênio dissolvido** durante a decomposição da matéria orgânica. A causa é indireta.

**3. Tratar decompositores como um nível no fim da cadeia.**
Eles atuam sobre **todos** os níveis, devolvendo matéria ao ambiente. Não são o "último degrau".', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('ecologia-autoexplicacao', 'ecologia-e-ciclos', 'self_explanation', 'Explique com suas palavras', NULL, '1. Por que as cadeias alimentares raramente passam de cinco níveis?
2. Explique, passo a passo, por que a eutrofização mata peixes.
3. Qual é a diferença entre bioacumulação e biomagnificação?', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('energia-resumo', 'energia-e-transformacoes', 'quick_summary', 'Em 2 minutos', 'quick', '**Energia não é criada nem destruída — ela se transforma.** Quando dizemos "gastar energia", queremos dizer que ela foi convertida em uma forma menos útil, geralmente calor disperso.

**Potência x energia** — a confusão mais cara da área:
- **Potência (W)** = velocidade com que a energia é usada.
- **Energia (kWh)** = potência × tempo. É o que aparece na conta de luz.

`Energia (kWh) = Potência (kW) × tempo (h)`

Um chuveiro de 5.500 W ligado 10 min/dia por 30 dias:
5,5 kW × (10/60) h × 30 = **27,5 kWh**

**Eficiência** = energia útil ÷ energia fornecida. Nunca chega a 100%: sempre há perda, quase sempre como calor.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('energia-explicacao', 'energia-e-transformacoes', 'explanation', 'Transformação, consumo e eficiência', 'standard', '### 1. Cadeias de transformação

Nenhum equipamento "produz" energia: todos convertem.

- Usina hidrelétrica: potencial gravitacional → cinética → elétrica.
- Painel solar: radiante → elétrica.
- Chuveiro: elétrica → térmica.
- Corpo humano: química (alimento) → mecânica + térmica.
- Lâmpada incandescente: elétrica → radiante (~5%) + térmica (~95%).

O último exemplo mostra por que a lâmpada incandescente saiu de linha: ela é, na prática, um aquecedor que também ilumina.

### 2. O cálculo da conta de luz

Três passos:
1. Converta a potência para **quilowatts** (dividir por 1.000).
2. Multiplique pelo tempo em **horas**.
3. Multiplique pelo número de dias e pela tarifa.

Exemplo: geladeira de 150 W funcionando efetivamente 8 h por dia.
0,15 kW × 8 h × 30 dias = 36 kWh/mês. A R$ 0,80/kWh → **R$ 28,80**.

**Armadilha frequente:** a geladeira fica ligada 24 h, mas o compressor só opera parte do tempo. O enunciado costuma informar o tempo efetivo — use esse.

### 3. Por que a eficiência nunca é total

Toda transformação real dissipa parte da energia como calor por atrito, resistência elétrica ou turbulência. Essa energia não some: ela se degrada em uma forma dispersa e de difícil reaproveitamento.

Por isso não existe máquina de movimento perpétuo — não por falta de engenharia, mas por uma restrição física.

### 4. Fontes: renovável, limpa e disponível

Três adjetivos que **não são sinônimos**:
- **Renovável**: repõe-se em escala de tempo humana (solar, eólica, hídrica, biomassa).
- **Limpa**: baixa emissão de poluentes na operação.
- **Sem impacto**: não existe. Hidrelétricas alagam áreas; eólicas afetam aves e paisagem; painéis exigem mineração.

Uma alternativa que afirme "fonte totalmente sem impacto" é quase sempre distrator.

### 5. Potência, tempo e o mesmo consumo

Um equipamento de 2.000 W por 30 min consome o mesmo que um de 1.000 W por 1 h: 1 kWh. Comparar equipamentos só pela potência, sem considerar o tempo de uso, leva à conclusão errada.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('energia-exemplo-1', 'energia-e-transformacoes', 'worked_example', 'Exemplo resolvido 1 — comparar dois equipamentos', NULL, '**Situação:** qual consome mais em um mês?
- Chuveiro: 5.500 W, 8 minutos por dia.
- Ar-condicionado: 1.400 W, 6 horas por dia.

**Chuveiro:**
5,5 kW × (8/60) h ≈ 0,733 kWh/dia → × 30 = **22 kWh/mês**

**Ar-condicionado:**
1,4 kW × 6 h = 8,4 kWh/dia → × 30 = **252 kWh/mês**

**Conclusão:** o ar-condicionado consome mais de 11 vezes o que o chuveiro consome, apesar de ter menos de um terço da potência.

**A lição:** potência alta por pouco tempo pesa muito menos que potência média por muito tempo. Sempre multiplique pelo tempo antes de comparar.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('energia-exemplo-2', 'energia-e-transformacoes', 'worked_example', 'Exemplo resolvido 2 — eficiência e perda', NULL, '**Situação:** um motor recebe 800 J de energia elétrica e realiza 520 J de trabalho mecânico.

**Eficiência:**
520 ÷ 800 = 0,65 → **65%**

**Para onde foi o resto?**
800 − 520 = 280 J, dissipados principalmente como **calor** (atrito nos mancais, resistência elétrica nos enrolamentos) e um pouco como som e vibração.

**O ponto conceitual:** os 280 J não foram destruídos. A energia se conservou — o que se perdeu foi a **capacidade de realizar trabalho** com ela.

**Erro comum:** responder que "280 J foram consumidos" como se tivessem desaparecido. Em física, energia dissipada continua existindo, apenas em forma degradada.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('energia-erros-comuns', 'energia-e-transformacoes', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Confundir potência com energia.**
Watt é velocidade de uso; quilowatt-hora é quantidade usada. A conta de luz cobra o segundo.

**2. Esquecer de converter unidades.**
Watts para quilowatts (÷1.000) e minutos para horas (÷60). Esquecer uma dessas conversões erra a resposta por fator 60 ou 1.000.

**3. Chamar uma fonte de "sem impacto".**
Toda fonte tem impacto — o que varia é o tipo, a escala e quem o suporta.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('energia-autoexplicacao', 'energia-e-transformacoes', 'self_explanation', 'Explique com suas palavras', NULL, '1. Se a energia se conserva, o que significa dizer que um aparelho "gasta" energia?
2. Por que um equipamento de potência menor pode pesar mais na conta de luz?
3. Qual é a diferença entre uma fonte renovável e uma fonte limpa?', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('quimica-resumo', 'transformacoes-quimicas', 'quick_summary', 'Em 2 minutos', 'quick', '**Transformação física:** muda o estado ou a forma; as substâncias continuam as mesmas. Gelo derretendo ainda é água.

**Transformação química:** formam-se **substâncias novas**, com propriedades diferentes.

**Evidências de reação química** (nenhuma isolada é prova definitiva):
- liberação de gás sem aquecimento externo;
- formação de precipitado;
- mudança de cor não explicada por diluição;
- variação de temperatura sem fonte externa;
- emissão de luz.

**Lei de Lavoisier:** a massa total se conserva. Em sistema aberto ela parece diminuir porque o gás escapou — não porque a matéria sumiu.

**Balanceamento:** o número de átomos de cada elemento é igual dos dois lados. Os coeficientes dão a **proporção** entre as substâncias.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('quimica-explicacao', 'transformacoes-quimicas', 'explanation', 'Reconhecer, balancear e proporcionar', 'standard', '### 1. Física ou química?

A pergunta decisiva: **surgiu substância nova?**

| Situação | Tipo | Por quê |
| --- | --- | --- |
| Água fervendo | física | vapor ainda é H₂O |
| Sal dissolvendo | física | é possível recuperar o sal por evaporação |
| Ferro enferrujando | química | forma-se óxido, substância diferente |
| Papel queimando | química | formam-se CO₂, H₂O e cinzas |
| Leite azedando | química | fermentação produz ácido láctico |

Critério prático: se dá para reverter por meio físico simples (aquecer, resfriar, filtrar, evaporar), provavelmente é física.

### 2. Lavoisier na prática

Em uma reação em recipiente **fechado**, a balança não muda.

Em recipiente **aberto**:
- se um gás é liberado, a massa medida **diminui**;
- se um gás do ar é incorporado (como na oxidação de um metal), a massa **aumenta**.

Nos dois casos a matéria se conservou — o que mudou foi o que estava dentro da balança.

### 3. Balancear

`CH₄ + 2 O₂ → CO₂ + 2 H₂O`

Confira elemento por elemento:
- C: 1 e 1 ✔
- H: 4 e 4 ✔
- O: 4 e 4 ✔ (2×2 à esquerda; 2 + 2×1 à direita)

Os coeficientes **não** dizem massa: dizem **proporção em número de partículas (mol)**.

### 4. Proporção estequiométrica

Na equação acima, 1 mol de CH₄ exige 2 mol de O₂. Se você tiver 3 mol de CH₄, precisará de 6 mol de O₂.

**Reagente limitante:** quando as quantidades não estão na proporção exata, a reação para quando o reagente em menor proporção acaba. O que sobra é o **excesso** — e ele não reage sozinho.

Esse conceito responde a boa parte das questões aplicadas: "quanto de produto se forma?" depende do limitante, não do total de reagentes.

### 5. Concentração de soluções

`C = massa do soluto ÷ volume da solução`

Ao diluir, a **quantidade de soluto não muda** — só o volume aumenta. Daí:

`C₁ × V₁ = C₂ × V₂`', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('quimica-exemplo-1', 'transformacoes-quimicas', 'worked_example', 'Exemplo resolvido 1 — a massa que "some"', NULL, '**Situação:** um comprimido efervescente é colocado em um copo com água, sobre uma balança. Após a efervescência, a massa medida é menor que a inicial.

**Pergunta:** houve violação da conservação da massa?

**Análise:**
1. A efervescência indica liberação de gás — evidência de reação química.
2. O gás (CO₂) escapou do copo para o ambiente.
3. A balança mede apenas o que está sobre ela.

**Resposta:** não houve violação. A massa do gás liberado explica exatamente a diferença.

**Como confirmar:** repetir o experimento em recipiente **fechado**. A massa permanece constante — e essa é a resposta esperada quando a questão pede "como comprovar".', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('quimica-exemplo-2', 'transformacoes-quimicas', 'worked_example', 'Exemplo resolvido 2 — reagente limitante', NULL, '**Equação:** `2 H₂ + O₂ → 2 H₂O`

**Disponível:** 6 mol de H₂ e 2 mol de O₂.

**Passo 1 — qual é a proporção exigida?** 2 mol de H₂ para cada 1 mol de O₂.

**Passo 2 — quanto de O₂ seria preciso para consumir todo o H₂?**
6 mol de H₂ ÷ 2 = 3 mol de O₂. Só há 2 mol.

**Passo 3 — o limitante é o O₂.**
Com 2 mol de O₂, reagem 4 mol de H₂ e formam-se **4 mol de H₂O**.

**Passo 4 — o que sobra?** 6 − 4 = **2 mol de H₂ em excesso**.

**Erro comum:** calcular o produto a partir do reagente mais abundante. A reação para quando o limitante acaba, independentemente do que sobrou.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('quimica-erros-comuns', 'transformacoes-quimicas', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Achar que dissolver é reação química.**
Sal em água se dissolve; o sal continua sal e pode ser recuperado por evaporação. É transformação física.

**2. Concluir que a massa "não se conservou" em sistema aberto.**
Se houve gás, ele saiu. A conservação vale para o sistema completo, não para o que ficou na balança.

**3. Usar coeficientes como se fossem massa.**
Em `2 H₂ + O₂`, o "2" indica proporção em mol, não gramas. Converter exige a massa molar.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('quimica-autoexplicacao', 'transformacoes-quimicas', 'self_explanation', 'Explique com suas palavras', NULL, '1. Que pergunta você faz para decidir se uma transformação é física ou química?
2. Por que a massa medida pode diminuir em uma reação sem que a matéria seja destruída?
3. O que determina a quantidade de produto formada quando os reagentes não estão na proporção exata?', 6);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('tese-resumo', 'tese-e-argumentacao', 'quick_summary', 'Em 2 minutos', 'quick', '**Tese** é a resposta que você dá ao problema do tema. Ela precisa ser:

- **Clara**: dá para repetir em uma frase.
- **Defensável**: alguém razoável poderia discordar. Se ninguém discorda, é obviedade, não tese.
- **Sustentável**: você consegue defendê-la com o que sabe.

**Teste rápido:** escreva a frase contrária à sua tese. Se a contrária for absurda, sua tese é óbvia demais. Se for razoável, você tem uma tese de verdade.

**Estrutura que funciona:**
1. Introdução: contextualiza o problema + apresenta a tese.
2. Desenvolvimento 1: primeiro argumento + repertório + análise.
3. Desenvolvimento 2: segundo argumento (ângulo diferente) + repertório + análise.
4. Conclusão: retoma a tese + proposta de intervenção (agente, ação, meio, finalidade, detalhamento).

**Repertório só conta se for usado.** Citar sem conectar ao argumento é enfeite — e enfeite não pontua.', 1);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('tese-explicacao', 'tese-e-argumentacao', 'explanation', 'Da tese à sustentação', 'standard', '### 1. Do tema à tese

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

Propostas que envolvam violência, supressão de direitos ou discriminação invalidam a competência. Isso não é detalhe de estilo: é critério eliminatório.', 2);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('tese-exemplo-1', 'tese-e-argumentacao', 'worked_example', 'Exemplo resolvido 1 — transformar obviedade em tese', NULL, '**Tema:** "Caminhos para o combate ao desperdício de alimentos no Brasil"

**Versão fraca (obviedade):**
> "O desperdício de alimentos é um problema muito grave que precisa ser combatido."

Ninguém discorda. Não há o que defender.

**Versão forte (tese):**
> "O desperdício de alimentos no Brasil decorre menos do comportamento do consumidor final e mais de perdas na cadeia entre a colheita e a distribuição, o que exige política de infraestrutura logística, e não apenas campanhas de conscientização."

**Por que funciona:**
- É **contestável**: alguém pode defender que o consumidor é o principal responsável.
- **Delimita** onde está o problema (a cadeia logística).
- Já **aponta a direção** da proposta (infraestrutura, não só campanha).

**Bônus:** essa tese praticamente organiza os dois desenvolvimentos — um sobre perdas na cadeia, outro sobre por que a campanha isolada é insuficiente.', 3);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('tese-exemplo-2', 'tese-e-argumentacao', 'worked_example', 'Exemplo resolvido 2 — repertório que trabalha', NULL, '**Argumento a defender:** a desigualdade no acesso à internet limita o exercício de direitos.

**Versão decorativa:**
> "Segundo pesquisas, muitos brasileiros não têm internet. Isso é ruim para a sociedade."

Vago, sem fonte identificável e sem análise.

**Versão produtiva:**
> "Serviços públicos essenciais — agendamento de consultas, matrícula escolar, acesso a benefícios — migraram para plataformas digitais na última década. Quando o acesso à conexão é desigual, essa migração transfere ao cidadão um custo que antes era do Estado: quem não tem internet em casa precisa de deslocamento, tempo e, muitas vezes, de intermediários para exercer um direito que deveria ser diretamente acessível. A digitalização, nesse cenário, amplia a distância que pretendia reduzir."

**O que mudou:**
- O repertório (digitalização de serviços) está **conectado** ao argumento.
- Há **análise**: o mecanismo pelo qual a desigualdade vira barreira de direito.
- A última frase **fecha o raciocínio** em vez de apenas informar.', 4);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('tese-erros-comuns', 'tese-e-argumentacao', 'common_mistakes', 'Três erros que mais custam ponto', NULL, '**1. Tese que ninguém discorda.**
"A educação é importante." Não há o que defender. Escreva a frase contrária: se ela for absurda, refaça a tese.

**2. Repertório citado e abandonado.**
Mencionar uma obra, um dado ou um filósofo sem explicar o que aquilo prova. Depois de citar, sempre escreva a frase "isso mostra que…".

**3. Proposta que não responde ao seu próprio problema.**
Se o texto defendeu que o gargalo é logístico, propor campanha educativa contradiz a própria argumentação. A proposta precisa fechar o raciocínio que você abriu.', 5);
INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES ('tese-autoexplicacao', 'tese-e-argumentacao', 'self_explanation', 'Explique com suas palavras', NULL, '1. Qual é o teste para saber se sua tese é defensável ou apenas óbvia?
2. Quais são as três partes de um argumento completo, e qual delas costuma faltar?
3. Por que a proposta de intervenção precisa responder especificamente ao problema levantado no seu texto?', 6);

-- Questões (já com o gabarito rebalanceado pela montagem do catálogo)
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-interp-1', 'interpretacao-e-inferencia', 'identificar-informacao-explicita-e-implicita', 'intro', 'concept', false, 'Leia o trecho:

"Chegou em casa, tirou o casaco encharcado e só então percebeu que tinha deixado o celular no bolso."

Com base apenas no que o texto permite concluir, é correto afirmar que:', 'A resposta é A. "Encharcado" é a única pista concreta e ela sustenta uma única conclusão obrigatória: houve contato com muita água antes de entrar.', 'As demais alternativas acrescentam informações que o texto não garante (atraso, preferência, dano ao aparelho) ou contradizem o que está escrito (perder o celular). Em interpretação, a conclusão precisa estar ancorada em uma passagem que você consiga apontar.', 'Para cada alternativa, pergunte: "qual palavra do texto me obriga a isso?". Se não houver palavra, elimine.', 'Inferência tem âncora no texto. Extrapolação não tem.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-1', 'A', 'A personagem estava atrasada para um compromisso.', false, 'Nada no trecho menciona horário, pressa ou compromisso. É informação acrescentada por quem lê.', 'extrapolação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-1', 'B', 'A personagem não gosta de usar casaco.', false, 'Tirar o casaco molhado ao chegar em casa é comportamento comum e não revela preferência alguma.', 'inferência sobre personalidade sem pista');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-1', 'C', 'O celular da personagem parou de funcionar.', false, 'O texto não menciona funcionamento do aparelho. Concluir isso exige uma cadeia de suposições que o trecho não sustenta.', 'encadeamento de suposições');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-1', 'D', 'A personagem estava na chuva antes de chegar em casa.', true, 'O casaco "encharcado" é a pista. O texto não diz "choveu", mas obriga a concluir que houve contato com muita água antes de entrar — a leitura mais direta e sustentada.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-1', 'E', 'A personagem perdeu o celular naquele dia.', false, 'O texto diz que ela percebeu que o celular estava no bolso, ou seja, ele está com ela. Perder é o oposto do que o texto informa.', 'leitura apressada do final da frase');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-interp-2', 'interpretacao-e-inferencia', 'identificar-informacao-explicita-e-implicita', 'intermediate', 'applied', false, 'Uma placa em um parque público informa:

"Recolha o que trouxe. A natureza agradece — e a próxima família também."

A escolha de mencionar "a próxima família" cumpre qual função no texto?', 'A resposta é A. A placa troca uma consequência abstrata (a natureza) por uma consequência concreta e próxima (a próxima família), o que torna o pedido mais persuasivo.', 'Textos que pedem comportamento costumam funcionar melhor quando a consequência é imaginável. Perceber esse mecanismo é reconhecer a intenção comunicativa por trás da escolha das palavras.', 'Quando a questão pergunta pela função de um trecho, pergunte "o que mudaria se essa parte fosse retirada?". O que se perde é a função.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-2', 'A', 'Aproximar a consequência do descarte de uma situação concreta e imediata para quem lê.', true, 'Falar de "natureza" é abstrato e distante; falar da "próxima família" transforma a consequência em algo visível e próximo, aumentando a chance de adesão.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-2', 'B', 'Informar que o parque é destinado exclusivamente a famílias.', false, 'A menção é um exemplo de quem virá depois, não uma regra de acesso. O texto não restringe o público.', 'leitura literal de um exemplo como se fosse regra');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-2', 'C', 'Indicar que a limpeza do parque é responsabilidade da administração pública.', false, 'O texto faz o oposto: atribui a responsabilidade a quem trouxe o material ("recolha o que trouxe").', 'inverter o sujeito da responsabilidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-2', 'D', 'Criar um tom de ameaça para desestimular o uso do parque.', false, 'Não há ameaça: o verbo "agradece" e a construção afirmativa criam tom cordial, não punitivo.', 'atribuir tom que o vocabulário não sustenta');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-2', 'E', 'Explicar tecnicamente o tempo de decomposição dos resíduos.', false, 'Não há nenhuma informação técnica no texto. A placa não explica processos, apenas pede um comportamento.', 'buscar informação que não está presente');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-interp-3', 'interpretacao-e-inferencia', 'identificar-informacao-explicita-e-implicita', 'intermediate', 'interpretation', false, 'Leia o comentário publicado em um site de notícias sobre transporte público:

"Ampliaram a frota em 4%. Com isso, quem espera 40 minutos passará a esperar, no melhor cenário possível, uns gloriosos 38."

O efeito de sentido produzido pelo uso de "gloriosos" é:', 'A resposta é A. "Gloriosos" para descrever 2 minutos é um exagero deliberado: o autor diz o contrário do que pensa para criticar.', 'Repare que a crítica tem alvo específico — a insuficiência do ganho prático. Concluir que o autor "é contra a ampliação da frota" seria extrapolar: ele critica a dimensão da medida, não a ideia.', 'Ironia quase sempre deixa rastro: adjetivo grandioso em situação pequena, ou o contrário. Procure o desencaixe.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-3', 'A', 'Neutralidade, já que o autor apenas apresenta os números.', false, 'Se fosse neutro, o autor não escolheria um adjetivo carregado. A escolha lexical marca posição.', 'confundir presença de dados com neutralidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-3', 'B', 'Dúvida quanto à veracidade do percentual divulgado.', false, 'O autor aceita o número de 4% e trabalha a partir dele. A crítica é ao efeito prático, não à veracidade.', 'deslocar o alvo da crítica');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-3', 'C', 'Exagero técnico, próprio da linguagem estatística.', false, 'Linguagem estatística não usa adjetivos avaliativos como "gloriosos". A marca é de opinião, não de técnica.', 'confundir registro opinativo com técnico');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-3', 'D', 'Ironia, que reforça a crítica à insuficiência da medida.', true, 'Um adjetivo grandioso ("gloriosos") aplicado a um ganho mínimo (2 minutos) cria contraste evidente. Esse contraste é a marca da ironia.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-3', 'E', 'Elogio sincero ao esforço de ampliação da frota.', false, 'O elogio não se sustenta: o próprio texto expõe que o ganho é de 2 minutos e usa "no melhor cenário possível", enfraquecendo ainda mais o resultado.', 'leitura literal de ironia');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-interp-4', 'interpretacao-e-inferencia', 'identificar-informacao-explicita-e-implicita', 'challenging', 'comparison', false, 'Sobre o mesmo comentário ("Ampliaram a frota em 4%. Com isso, quem espera 40 minutos passará a esperar, no melhor cenário possível, uns gloriosos 38."), duas leituras foram propostas:

I. O autor questiona a proporção entre a medida anunciada e o problema enfrentado.
II. O autor afirma que a ampliação da frota não trará nenhuma melhora.

É correto o que se afirma em:', 'A resposta é A. A diferença entre as leituras é de **grau**: criticar que a melhora é pequena não é o mesmo que negar que exista melhora.', 'Questões com afirmações I/II costumam colocar lado a lado uma leitura correta e uma versão exagerada dela. Verifique cada uma isoladamente antes de olhar as alternativas.', 'Marque V ou F em cada afirmação na margem antes de ler as alternativas.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-4', 'A', 'Nenhuma das duas.', false, 'I é sustentada com clareza pelo contraste entre o adjetivo grandioso e o ganho mínimo.', 'excesso de cautela');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-4', 'B', 'I e II, desde que o percentual seja confirmado.', false, 'A validade de II não depende do percentual: mesmo com os números aceitos, "nenhuma melhora" continua contrariando o texto.', 'condicionar a resposta a um dado irrelevante');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-4', 'C', 'I, apenas.', true, 'O texto reconhece uma melhora (de 40 para 38 minutos) e a considera desproporcional ao problema. Isso valida I e invalida II, que nega qualquer melhora.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-4', 'D', 'II, apenas.', false, 'O próprio texto admite a redução de 2 minutos. Dizer "nenhuma melhora" contraria o que está escrito.', 'transformar crítica de grau em negação total');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-4', 'E', 'I e II.', false, 'I está correta, mas II extrapola. Basta uma afirmação falsa para invalidar a alternativa.', 'não verificar cada afirmação separadamente');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-interp-5', 'interpretacao-e-inferencia', 'identificar-informacao-explicita-e-implicita', 'challenging', 'integration', false, 'Uma campanha de saúde pública sobre hidratação distribuiu dois materiais com a mesma informação:

Material 1: "Adultos devem consumir cerca de 2 litros de água por dia, variando conforme peso, clima e atividade física."

Material 2: "Você já bebeu água hoje? Seu corpo perde líquido o tempo todo — inclusive agora, respirando."

A diferença central entre os dois materiais está:', 'A resposta é A. Mesma informação de base, propósitos diferentes: informar com precisão x chamar a atenção.', 'Esta questão integra dois conceitos: intenção comunicativa e adequação do gênero ao objetivo. Nenhum dos materiais é "melhor" — eles cumprem funções diferentes dentro da mesma campanha.', 'Quando dois textos trazem a mesma informação, a pergunta quase sempre é sobre **função**, não sobre conteúdo.', 'Forma e função andam juntas: mudar o registro muda o efeito pretendido.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-5', 'A', 'Na veracidade: o segundo material apresenta informação incorreta.', false, 'A perda de líquido pela respiração é fato. Não há erro factual, apenas escolha de abordagem.', 'confundir informalidade com imprecisão');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-5', 'B', 'No público: o primeiro se dirige a profissionais de saúde e o segundo, a pacientes.', false, 'Nada nos textos indica destinatário profissional. Ambos usam linguagem acessível ao público geral.', 'inferir público sem marca textual');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-5', 'C', 'Na quantidade de informação: o segundo material é incompleto por não trazer números.', false, '"Incompleto" pressupõe que o objetivo fosse informar quantidade. Para mobilizar atenção, o número não é necessário — a ausência é escolha, não falha.', 'avaliar um gênero pelos critérios de outro');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-5', 'D', 'No grau de formalidade, sem qualquer efeito sobre a função do texto.', false, 'A formalidade realmente muda, mas ela não é neutra: a escolha do registro é justamente o que produz a diferença de função.', 'perceber a forma e ignorar o efeito');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-5', 'E', 'Na função predominante: o primeiro prioriza informar com precisão; o segundo prioriza mobilizar a atenção do leitor.', true, 'O Material 1 traz dado numérico e ressalvas técnicas. O Material 2 usa pergunta direta e segunda pessoa para provocar reação imediata. A informação de fundo é a mesma; o que muda é o propósito da abordagem.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-interp-rec-1', 'interpretacao-e-inferencia', 'identificar-informacao-explicita-e-implicita', 'intro', 'concept', true, 'Leia:

"O bilhete estava sobre a mesa, com a caneta ainda destampada ao lado."

Qual conclusão o texto sustenta?', 'A resposta é A. "Ainda destampada" é o único detalhe que produz uma conclusão obrigatória: a escrita foi recente.', NULL, 'Procure o detalhe que parece "sobrando" na frase — ele costuma ser a pista.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-1', 'A', 'O bilhete era endereçado a mais de uma pessoa.', false, 'O destinatário não é mencionado.', 'inferir destinatário sem pista');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-1', 'B', 'O bilhete foi escrito há pouco tempo.', true, 'A caneta "ainda destampada" é a pista: quem escreveu não teve tempo ou intenção de guardá-la, o que sugere proximidade temporal.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-1', 'C', 'O bilhete contém uma má notícia.', false, 'O conteúdo do bilhete não é mencionado em momento algum.', 'extrapolação sobre conteúdo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-1', 'D', 'A pessoa que escreveu saiu de casa.', false, 'O texto não informa onde está quem escreveu. Ela pode estar na sala ao lado.', 'inferência sobre ação não mencionada');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-1', 'E', 'A mesa fica em um escritório.', false, 'Nenhum elemento identifica o ambiente.', 'inferir cenário sem pista');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-interp-rec-2', 'interpretacao-e-inferencia', 'identificar-informacao-explicita-e-implicita', 'intermediate', 'applied', true, 'Um cartaz de biblioteca diz: "Silêncio. Alguém aqui está começando a gostar de ler."

A segunda frase foi incluída para:', 'A resposta é A. A segunda frase dá um motivo à ordem, tornando o pedido mais persuasivo sem deixar de ser regra.', NULL, 'Pergunte o que se perderia se aquele trecho fosse apagado.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-2', 'A', 'Informar quantas pessoas frequentam a biblioteca.', false, '"Alguém" é indefinido de propósito e não traz dado quantitativo.', 'ler "alguém" como número');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-2', 'B', 'Restringir o acesso a leitores iniciantes.', false, 'Não há qualquer restrição de acesso no texto.', 'ler exemplo como regra');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-2', 'C', 'Substituir a regra de silêncio por uma sugestão opcional.', false, 'A regra continua: a primeira frase é imperativa. A segunda apenas a justifica.', 'achar que justificar enfraquece a regra');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-2', 'D', 'Indicar que a biblioteca oferece cursos de leitura.', false, 'Nenhum serviço é mencionado.', 'acrescentar informação ausente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-interp-rec-2', 'E', 'Justificar o pedido, dando a ele um motivo concreto e simpático.', true, '"Silêncio" sozinho é ordem seca. A segunda frase transforma a ordem em pedido com razão visível, o que aumenta a adesão.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-gen-1', 'generos-textuais-e-funcao-social', 'relacionar-formato-contexto-publico-finalidade', 'intro', 'concept', false, 'Um texto apresenta a seguinte estrutura: título curto em destaque, primeiro parágrafo respondendo quem, o quê, quando e onde, e os parágrafos seguintes com detalhes em ordem decrescente de importância.

Essa organização é típica de qual gênero e atende a qual necessidade do leitor?', 'A resposta é A. A pirâmide invertida existe porque o leitor de notícia pode parar a qualquer instante — a forma serve a essa necessidade.', NULL, 'Identifique o gênero pela estrutura e pela função, nunca pelo assunto tratado.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-1', 'A', 'Edital — precisa listar requisitos de forma exaustiva e sem ambiguidade.', false, 'Edital não usa pirâmide invertida: ele precisa ser completo e é organizado por itens normativos.', 'associar formalidade a qualquer gênero institucional');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-1', 'B', 'Notícia — permite que o leitor obtenha o essencial mesmo se interromper a leitura no início.', true, 'A estrutura descrita é a pirâmide invertida, característica da notícia: o mais importante vem primeiro justamente porque a leitura pode parar a qualquer momento.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-1', 'C', 'Artigo de opinião — apresenta a tese no início para depois sustentá-la.', false, 'Artigo de opinião abre com um ponto de vista a ser defendido, não com quem/o quê/quando/onde. Faltam as marcas de posicionamento.', 'confundir "informação primeiro" com "tese primeiro"');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-1', 'D', 'Relatório técnico — organiza os dados por ordem cronológica de coleta.', false, 'O texto descrito organiza por importância, não por cronologia, e relatórios técnicos costumam ter seções fixas.', 'confundir ordem de importância com ordem cronológica');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-1', 'E', 'Crônica — parte de um fato cotidiano para uma reflexão pessoal.', false, 'Não há marca de subjetividade nem de reflexão na estrutura descrita.', 'identificar gênero sem verificar as marcas');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-gen-2', 'generos-textuais-e-funcao-social', 'relacionar-formato-contexto-publico-finalidade', 'intermediate', 'applied', false, 'Uma prefeitura precisa comunicar a mudança do ponto final de uma linha de ônibus. Foram produzidos: (1) um aviso impresso colado no ponto antigo e (2) uma publicação no perfil oficial da prefeitura em uma rede social.

O que justifica que os dois textos sejam escritos de formas diferentes?', 'A resposta é A. A situação concreta de leitura (de pé, com pressa x voluntária, com contexto) explica a diferença de forma.', 'Esse é o princípio central do estudo de gêneros: a forma responde ao suporte, ao público e à finalidade. Nenhuma das três pode ser ignorada.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-2', 'A', 'O aviso impresso precisa ser formal e a rede social exige linguagem incorreta.', false, 'Informalidade não é incorreção. Um perfil institucional escreve de forma adequada, apenas com registro mais próximo.', 'confundir informalidade com erro');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-2', 'B', 'A publicação em rede social não tem valor oficial, então pode omitir a informação principal.', false, 'Um comunicado oficial não pode omitir o essencial em nenhum suporte — isso frustraria a função.', 'confundir informalidade com falta de compromisso');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-2', 'C', 'O público é o mesmo, portanto a diferença é apenas estética.', false, 'A situação de leitura muda mesmo quando o público é o mesmo, e isso tem efeito funcional, não estético.', 'reduzir adequação a estilo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-2', 'D', 'O aviso impresso deve conter opinião da administração sobre a mudança.', false, 'Um aviso operacional informa; opinião é função de outro gênero.', 'atribuir função de opinião a texto informativo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-2', 'E', 'O suporte e a situação de leitura são diferentes: no ponto, lê-se de pé e com pressa; na rede, a leitura é voluntária e pode incluir mais contexto.', true, 'A forma acompanha a condição real de leitura. No ponto, a informação precisa ser imediata e visual; na rede, cabe explicação, imagem e resposta a comentários.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-gen-3', 'generos-textuais-e-funcao-social', 'relacionar-formato-contexto-publico-finalidade', 'intermediate', 'interpretation', false, 'Leia a peça de campanha:

"CELULAR AO VOLANTE
Composição: 2 segundos de distração.
Indicações: nenhuma.
Efeitos adversos: podem ser permanentes."

O efeito pretendido pela escolha desse formato é:', 'A resposta é A. A forma de bula é usada de propósito para transferir a seriedade do risco médico para o risco no trânsito.', NULL, 'Quando um texto imita outro gênero, pergunte: "o que esse formato original carrega que serve aqui?".', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-3', 'A', 'Substituir a legislação de trânsito por uma recomendação médica.', false, 'A campanha não trata de norma legal nem propõe substituição de regra.', 'extrapolar consequência institucional');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-3', 'B', 'Demonstrar que campanhas de trânsito devem sempre usar linguagem técnica.', false, 'Uma peça isolada não estabelece regra geral, e o texto não faz essa defesa.', 'generalizar a partir de um caso');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-3', 'C', 'Aproximar o uso do celular ao volante de um risco médico, emprestando a seriedade técnica associada à bula.', true, 'O formato de bula carrega autoridade e sobriedade. Ao vestir a campanha com ele, o texto trata a distração como risco à saúde, evitando o tom de sermão.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-3', 'D', 'Informar corretamente a composição química de um medicamento.', false, 'Não há medicamento algum: "composição: 2 segundos de distração" é uso figurado do campo.', 'leitura literal da quebra de expectativa');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-3', 'E', 'Confundir o leitor para que ele leia o texto até o final por engano.', false, 'O recurso depende do reconhecimento imediato do formato — se confundisse, não funcionaria.', 'confundir estranhamento com confusão');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-gen-4', 'generos-textuais-e-funcao-social', 'relacionar-formato-contexto-publico-finalidade', 'challenging', 'comparison', false, 'Compare os dois trechos, ambos sobre a mesma vaga de emprego:

I. "Requisitos: ensino médio completo; disponibilidade para trabalho aos sábados; experiência mínima de 6 meses em atendimento."

II. "Se você curte lidar com gente e topa pegar alguns sábados, vem com a gente."

Sobre os dois trechos, é correto afirmar:', 'A resposta é A. A diferença não é "certo x errado", e sim o que cada escolha ganha e o que ela perde.', 'Reconhecer o custo de cada registro é mais preciso do que classificar um como melhor. Em provas, a alternativa correta costuma ser a que reconhece o trade-off.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-4', 'A', 'Os dois trechos transmitem exatamente a mesma informação.', false, 'II omite escolaridade e experiência mínima — informações presentes em I.', 'não conferir o conteúdo item a item');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-4', 'B', 'O trecho I é inadequado por ser impessoal demais para um anúncio.', false, 'Impessoalidade é adequada quando o objetivo é filtrar candidatos por critérios objetivos.', 'julgar adequação sem considerar a finalidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-4', 'C', 'O trecho II se dirige a um público mais velho, por usar linguagem coloquial.', false, 'Não há marca no texto que permita definir faixa etária do público.', 'inferir público sem evidência');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-4', 'D', 'O trecho I prioriza precisão verificável; o II prioriza aproximação, ao custo de deixar critérios menos definidos.', true, 'I lista requisitos objetivamente verificáveis. II cria identificação, mas "alguns sábados" e "curte lidar com gente" não são critérios checáveis. Cada escolha tem ganho e custo.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-4', 'E', 'O trecho II está incorreto por não usar norma padrão.', false, 'O trecho II é adequado ao registro escolhido; informalidade planejada não é incorreção.', 'confundir registro com erro gramatical');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-gen-5', 'generos-textuais-e-funcao-social', 'relacionar-formato-contexto-publico-finalidade', 'challenging', 'integration', false, 'Uma escola pediu que os estudantes transformassem uma reportagem sobre desperdício de alimentos em um cartaz para o refeitório.

Qual conjunto de decisões melhor atende a essa transformação?', 'A resposta é A. Transformar um gênero em outro significa manter a informação essencial e refazer a forma para o novo suporte, público e objetivo.', 'A questão integra três dimensões: o que preservar do conteúdo, o que mudar na forma e qual ação se espera do leitor no novo contexto.', NULL, 'Retextualizar não é resumir: é reconstruir o texto para outra situação de leitura.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-5', 'A', 'Selecionar um dado de impacto, escrever uma frase curta orientada à ação e usar hierarquia visual forte.', true, 'O cartaz é lido de passagem, por quem está prestes a servir o prato. Precisa de um dado que impacte, uma ação clara e leitura em segundos.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-5', 'B', 'Reproduzir a reportagem integralmente para preservar a informação original.', false, 'Um texto longo no refeitório não será lido: preservar o texto destrói a função.', 'confundir fidelidade ao conteúdo com fidelidade à forma');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-5', 'C', 'Manter a estrutura de pirâmide invertida com título, lide e parágrafos de apoio.', false, 'A pirâmide invertida serve à notícia, não ao cartaz. O suporte mudou, a estrutura precisa mudar.', 'transportar a estrutura do gênero de origem');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-5', 'D', 'Substituir todos os dados por opiniões dos estudantes para tornar o texto mais pessoal.', false, 'Trocar dados por opinião enfraquece a credibilidade sem ganho de função.', 'confundir aproximação com abandono da informação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-5', 'E', 'Usar linguagem técnica sobre cadeia produtiva para demonstrar profundidade.', false, 'Linguagem técnica afasta o público previsto e não gera a ação pretendida.', 'confundir profundidade com adequação');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-gen-rec-1', 'generos-textuais-e-funcao-social', 'relacionar-formato-contexto-publico-finalidade', 'intro', 'concept', true, 'Um texto começa assim: "Art. 1º Fica instituído, no âmbito do município, o programa de..." 

Esse início indica um gênero cuja principal exigência é:', 'A resposta é A. A forma "Art. 1º" indica texto normativo, cuja exigência central é não deixar margem a leituras divergentes.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-1', 'A', 'Brevidade máxima, para caber em um único parágrafo.', false, 'Normas costumam ser longas: completude importa mais que brevidade.', 'associar clareza a tamanho');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-1', 'B', 'Uso de linguagem coloquial para ampliar o alcance.', false, 'Coloquialidade aumentaria a ambiguidade, o que é incompatível com a função normativa.', 'confundir acessibilidade com informalidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-1', 'C', 'Apresentação de opinião do autor sobre o programa.', false, 'Norma não expressa opinião individual; ela institui regra.', 'confundir texto oficial com texto opinativo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-1', 'D', 'Precisão sem ambiguidade, porque o texto produz efeitos obrigatórios.', true, 'Textos normativos precisam ser interpretados da mesma forma por qualquer leitor, já que criam obrigações. Daí a linguagem repetitiva e delimitada.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-1', 'E', 'Emoção, para aproximar o leitor do tema tratado.', false, 'Texto normativo evita apelo emocional justamente para não abrir interpretação.', 'atribuir função de outro gênero');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-gen-rec-2', 'generos-textuais-e-funcao-social', 'relacionar-formato-contexto-publico-finalidade', 'intermediate', 'applied', true, 'Uma mesma informação — o horário de funcionamento de uma unidade de saúde — aparece em um cartaz na porta e em uma mensagem automática de atendimento por telefone.

A diferença entre os dois textos se explica principalmente por:', 'A resposta é A. O canal (leitura x escuta) impõe diferenças reais de ritmo, repetição e ordem.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-2', 'A', 'Um texto é lido e o outro é ouvido, o que muda ritmo, repetição e ordem da informação.', true, 'Quem ouve não pode reler: a mensagem falada precisa repetir o essencial e usar frases mais curtas e pausadas.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-2', 'B', 'O cartaz pode conter informação incorreta, já que não é oficial.', false, 'Ambos são comunicações da mesma unidade e devem ser corretos.', 'associar suporte a confiabilidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-2', 'C', 'A mensagem telefônica se dirige a profissionais de saúde.', false, 'Nada indica público profissional; o atendimento é ao público geral.', 'inferir público sem evidência');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-2', 'D', 'O cartaz precisa de linguagem mais rebuscada por estar exposto ao público.', false, 'Exposição pública pede clareza, não rebuscamento.', 'associar formalidade a qualidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-gen-rec-2', 'E', 'Não há diferença real: os dois textos podem ser idênticos.', false, 'Podem até trazer as mesmas palavras, mas a mensagem falada perde eficiência sem repetição e pausa.', 'ignorar a diferença entre ler e ouvir');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-porc-1', 'porcentagem-e-variacao', 'resolver-situacoes-com-variacao-percentual', 'intro', 'concept', false, 'Um produto que custava R$ 250,00 passou a custar R$ 300,00.

Qual foi a variação percentual do preço?', 'A resposta é B. Variação = (final − inicial)/inicial = 50/250 = 20%.', NULL, 'Antes de dividir, escreva no papel: "de onde eu saí?". Esse valor é o denominador.', 'O denominador da variação percentual é sempre o valor inicial.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-1', 'A', '16,7%', false, 'Esse é 50/300 — divide pelo valor final. A variação usa o valor inicial como base.', 'base errada na divisão');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-1', 'B', '20%', true, '(300 − 250)/250 = 50/250 = 0,20 → 20%. O denominador é o valor de onde se partiu.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-1', 'C', '25%', false, 'Resultado de 50/200. Nem 200 nem qualquer outro valor do enunciado justifica esse denominador.', 'erro de leitura do valor inicial');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-1', 'D', '50%', false, 'Confunde a diferença absoluta (50 reais) com o percentual.', 'usar a diferença absoluta como percentual');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-1', 'E', '83,3%', false, 'Corresponde a 250/300, que é a razão entre os preços, não a variação.', 'calcular razão em vez de variação');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-porc-2', 'porcentagem-e-variacao', 'resolver-situacoes-com-variacao-percentual', 'intermediate', 'applied', false, 'Uma loja anuncia: "30% de desconto e, na segunda peça, mais 20% sobre o valor já com desconto."

Uma peça de R$ 200,00 comprada como segunda peça sairá por quanto, e qual é o desconto total equivalente?', 'A resposta é B. 200 × 0,70 × 0,80 = 112. O desconto equivalente é 1 − 0,56 = 44%.', 'A opção que apresenta 56% como desconto é a mais perigosa: acerta a conta e erra a leitura. 0,56 é quanto você **paga**; o desconto é o que **sobra do 1**.', 'Multiplique fatores, depois traduza: fator 0,56 significa pagar 56% e economizar 44%.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-2', 'A', 'R$ 100,00, com desconto total de 50%.', false, 'Somar 30% + 20% é o erro clássico: o segundo desconto incide sobre um valor já reduzido, não sobre os R$ 200.', 'somar percentuais sucessivos');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-2', 'B', 'R$ 112,00, com desconto total de 44%.', true, '200 × 0,70 = 140; 140 × 0,80 = 112. Como 0,70 × 0,80 = 0,56, o desconto equivalente é 44%.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-2', 'C', 'R$ 140,00, com desconto total de 30%.', false, 'Esse é o valor após apenas o primeiro desconto — o segundo foi ignorado.', 'esquecer a segunda etapa');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-2', 'D', 'R$ 120,00, com desconto total de 40%.', false, 'Corresponde a um único desconto de 40%, que não é o resultado da composição dos dois.', 'estimar sem calcular');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-2', 'E', 'R$ 112,00, com desconto total de 56%.', false, 'O valor final está correto, mas 56% é o fator que resta (0,56), não o desconto. O desconto é 1 − 0,56 = 44%.', 'confundir fator restante com desconto');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-porc-3', 'porcentagem-e-variacao', 'resolver-situacoes-com-variacao-percentual', 'intermediate', 'interpretation', false, 'Uma pesquisa sobre transporte apresentou os dados:

| Ano | Domicílios com bicicleta |
| --- | --- |
| 2023 | 8% |
| 2026 | 11% |

Um site publicou: "O uso de bicicleta cresceu 3%." Outro publicou: "O uso de bicicleta cresceu 37,5%."

Sobre as duas manchetes:', 'A resposta é A. São 3 **pontos percentuais** de diferença, o que equivale a 37,5% de variação relativa.', 'Esse par de leituras aparece com frequência em notícias sobre desemprego, inflação e cobertura de serviços. Saber qual está sendo usada muda completamente a percepção do dado.', NULL, 'Ponto percentual mede a diferença entre dois percentuais; porcentagem mede a variação relativa entre eles.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-3', 'A', 'Ambas estão erradas, pois o crescimento foi de 11%.', false, '11% é o valor final, não o crescimento.', 'confundir valor final com variação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-3', 'B', 'A segunda está errada, pois percentual de percentual não existe.', false, 'Variação relativa entre dois percentuais é operação válida e comum em estatística.', 'rejeitar operação válida');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-3', 'C', 'A primeira está correta e a segunda exagera o resultado.', false, 'A primeira erra a unidade; a segunda aplica corretamente a fórmula de variação.', 'julgar pelo tamanho do número');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-3', 'D', 'A primeira confunde ponto percentual com porcentagem; a segunda calcula corretamente a variação relativa.', true, 'A diferença é de 3 pontos percentuais. Em variação relativa: (11−8)/8 = 0,375 → 37,5%. A primeira manchete usa a unidade errada.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-3', 'E', 'Ambas estão corretas e dizem exatamente a mesma coisa.', false, 'Descrevem a mesma mudança, mas não a mesma medida: 3 pontos percentuais e 37,5% são grandezas distintas.', 'tratar pontos percentuais e porcentagem como sinônimos');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-porc-4', 'porcentagem-e-variacao', 'resolver-situacoes-com-variacao-percentual', 'challenging', 'comparison', false, 'Considere duas situações:

I. Um salário de R$ 2.000 recebe aumento de 10% e, no ano seguinte, novo aumento de 10%.
II. O mesmo salário de R$ 2.000 recebe um único aumento de 21%.

Comparando os resultados finais:', 'A resposta é A. 1,10 × 1,10 = 1,21 → os dois caminhos chegam a R$ 2.420.', 'O ponto da questão é que "10% duas vezes" equivale a 21%, e não a 20%. O 1% extra vem do aumento incidindo sobre o valor já aumentado.', 'Sempre converta para fatores e multiplique antes de comparar.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-4', 'A', 'A situação I resulta em R$ 2.400 e a II, em R$ 2.420.', false, 'R$ 2.400 corresponderia a somar os percentuais (20%), o que não é como aumentos sucessivos funcionam.', 'somar percentuais sucessivos');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-4', 'B', 'Não é possível comparar sem saber o intervalo entre os aumentos.', false, 'O intervalo de tempo não altera o valor final quando os percentuais são dados.', 'introduzir variável irrelevante');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-4', 'C', 'Os dois resultam no mesmo valor final.', true, '1,10 × 1,10 = 1,21, exatamente o fator de um aumento único de 21%. Ambos chegam a R$ 2.420.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-4', 'D', 'A situação I resulta em valor maior.', false, 'Seria verdade se o aumento único fosse de 20%. Com 21%, os fatores se igualam.', 'lembrar a regra geral sem conferir o número');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-4', 'E', 'A situação II resulta em valor maior.', false, 'Os fatores são idênticos (1,21), então não há vantagem para nenhuma das duas.', 'estimar sem multiplicar');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-porc-5', 'porcentagem-e-variacao', 'resolver-situacoes-com-variacao-percentual', 'challenging', 'integration', false, 'Uma família gasta R$ 900 por mês em alimentação, o que corresponde a 30% da renda mensal. No mês seguinte, a renda cai 10% e o gasto com alimentação sobe 5%.

Qual passa a ser, aproximadamente, o percentual da renda comprometido com alimentação?', 'A resposta é A. Renda inicial R$ 3.000 → R$ 2.700; gasto R$ 900 → R$ 945; 945/2.700 = 35%.', 'A questão integra três passos: recuperar o valor inicial a partir de um percentual, aplicar duas variações independentes e recalcular a proporção. Nenhum atalho por soma de percentuais funciona aqui.', 'Quando o enunciado dá um percentual e um valor, comece encontrando o total. Depois trabalhe com valores absolutos.', 'Percentual de participação precisa ser recalculado quando numerador e denominador mudam.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-5', 'A', 'Cerca de 32%.', false, 'Resultado de somar as duas variações (30% + 5% − ...), sem recalcular a razão entre os novos valores.', 'somar variações em vez de recalcular a razão');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-5', 'B', 'Cerca de 31,5%.', false, 'Corresponde a aplicar apenas o aumento do gasto (30% × 1,05), ignorando a queda da renda.', 'considerar só uma das mudanças');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-5', 'C', 'Cerca de 27%.', false, 'Aplica a queda de 10% ao percentual, o que inverte o efeito: renda menor aumenta o peso do gasto.', 'inverter o sentido do efeito');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-5', 'D', 'Continua em 30%, pois as variações se compensam.', false, 'As variações têm sentidos que se somam no mesmo efeito: renda menor e gasto maior aumentam o comprometimento.', 'supor compensação sem verificar');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-5', 'E', 'Cerca de 35%.', true, 'Renda inicial = 900/0,30 = R$ 3.000. Nova renda = 2.700. Novo gasto = 945. 945/2.700 = 0,35 → 35%.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-porc-rec-1', 'porcentagem-e-variacao', 'resolver-situacoes-com-variacao-percentual', 'intro', 'concept', true, 'Um item de R$ 80,00 recebe 15% de desconto. Qual é o valor final?', 'A resposta é C. Desconto de 15% → fator 0,85 → 80 × 0,85 = R$ 68,00.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-1', 'A', 'R$ 12,00', false, 'Esse é o valor do desconto (15% de 80), não o preço final.', 'parar no cálculo da parte');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-1', 'B', 'R$ 65,00', false, 'Corresponde a um desconto de R$ 15, e não de 15%.', 'confundir percentual com valor absoluto');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-1', 'C', 'R$ 68,00', true, '80 × 0,85 = 68. Usar o fator resolve em uma operação.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-1', 'D', 'R$ 72,00', false, 'Corresponde a 10% de desconto.', 'arredondar o percentual');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-1', 'E', 'R$ 92,00', false, 'Aplicou aumento em vez de desconto.', 'inverter o sentido da variação');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-porc-rec-2', 'porcentagem-e-variacao', 'resolver-situacoes-com-variacao-percentual', 'intermediate', 'applied', true, 'O número de inscritos em uma atividade caiu de 120 para 96.

Qual foi a queda percentual?', 'A resposta é A. A base é 120 (valor inicial): 24/120 = 20% de queda.', NULL, NULL, 'Queda de 20% deixa 80% do valor: 120 × 0,80 = 96 confirma o resultado.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-2', 'A', '20%', true, '(96 − 120)/120 = −24/120 = −0,20 → queda de 20%.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-2', 'B', '24%', false, 'Usa a diferença absoluta (24) como se fosse o percentual.', 'confundir diferença com percentual');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-2', 'C', '25%', false, 'Resultado de 24/96 — divide pelo valor final em vez do inicial.', 'base errada');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-2', 'D', '80%', false, 'É a razão 96/120, ou seja, quanto restou, não quanto caiu.', 'confundir proporção restante com variação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-porc-rec-2', 'E', '4%', false, 'Não corresponde a nenhuma operação válida com os dados.', 'chute');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-graf-1', 'leitura-de-graficos-e-tabelas', 'extrair-comparar-interpretar-dados', 'intro', 'concept', false, 'A tabela mostra o número de atendimentos em duas unidades de saúde:

| Unidade | Atendimentos | População atendida |
| --- | --- | --- |
| Norte | 4.500 | 30.000 |
| Sul | 3.000 | 15.000 |

Qual unidade apresenta maior número de atendimentos por habitante?', 'A resposta é B. Taxa = atendimentos ÷ população: 0,15 (Norte) contra 0,20 (Sul).', NULL, 'Sempre que as bases forem diferentes, converta para taxa antes de comparar.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-1', 'A', 'As duas têm a mesma taxa.', false, 'As taxas são 0,15 e 0,20 — diferentes.', 'assumir equivalência sem calcular');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-1', 'B', 'Norte, com 6,67 habitantes por atendimento.', false, 'O cálculo está certo (30.000/4.500), mas a razão invertida favorece quem tem MENOS habitantes por atendimento: a Sul tem 5.', 'inverter a razão e ler ao contrário');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-1', 'C', 'Não é possível comparar sem saber o número de profissionais.', false, 'A pergunta é sobre atendimentos por habitante, e os dois dados necessários estão na tabela.', 'exigir dado desnecessário');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-1', 'D', 'Norte, pois realizou mais atendimentos.', false, 'O número absoluto é maior, mas a população também é o dobro. A comparação precisa ser proporcional.', 'comparar absolutos com bases diferentes');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-1', 'E', 'Sul, com 0,20 atendimento por habitante contra 0,15 da Norte.', true, 'Norte: 4.500/30.000 = 0,15. Sul: 3.000/15.000 = 0,20. A Sul atende proporcionalmente mais.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-graf-2', 'leitura-de-graficos-e-tabelas', 'extrair-comparar-interpretar-dados', 'intermediate', 'applied', false, 'Um relatório apresenta o consumo médio de energia de uma residência ao longo de um ano. Os valores de janeiro e julho são os mais altos; abril e outubro, os mais baixos.

Um leitor conclui: "O consumo caiu de janeiro para abril, portanto a campanha de economia lançada em fevereiro funcionou."

A principal fragilidade dessa conclusão é:', 'A resposta é A. Com padrão sazonal evidente, a queda entre janeiro e abril é esperada mesmo sem campanha alguma.', 'A forma de testar seria comparar abril deste ano com abril de anos anteriores. Comparar meses seguidos dentro de uma série sazonal não isola o efeito da intervenção.', NULL, 'Em séries sazonais, compare o mesmo período de anos diferentes.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-2', 'A', 'Séries temporais não permitem nenhum tipo de conclusão.', false, 'Permitem conclusões, desde que controlados os fatores que competem pela explicação.', 'generalizar a cautela');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-2', 'B', 'A queda pode refletir variação sazonal, e não o efeito da campanha.', true, 'A própria série indica padrão sazonal (picos em janeiro e julho). Sem comparar com o mesmo período de outros anos, não é possível separar a campanha do padrão.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-2', 'C', 'Os dados de consumo não podem ser comparados entre meses diferentes.', false, 'Podem ser comparados; a ressalva é sobre a interpretação causal, não sobre a comparabilidade.', 'rejeitar comparação válida');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-2', 'D', 'O relatório não apresenta valores em reais, apenas em consumo.', false, 'A conclusão do leitor é sobre consumo, então a unidade é adequada.', 'exigir dado irrelevante');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-2', 'E', 'A campanha começou em fevereiro, portanto não pode afetar abril.', false, 'Uma campanha de fevereiro pode, sim, afetar abril. O problema é outro: distinguir esse efeito da sazonalidade.', 'rejeitar por razão errada');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-graf-3', 'leitura-de-graficos-e-tabelas', 'extrair-comparar-interpretar-dados', 'intermediate', 'interpretation', false, 'Um gráfico de barras compara o índice de satisfação de dois serviços. As barras aparentam alturas muito diferentes. Consultando os eixos, verifica-se que o eixo vertical vai de 60 a 68, e que os valores são: Serviço A = 62 e Serviço B = 66.

A leitura correta desses dados é:', 'A resposta é A. Quatro pontos de diferença, cerca de 6,5% em termos relativos — a forma exagera, os números corrigem.', NULL, 'Leia os valores do eixo antes de comparar alturas. Sempre.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-3', 'A', 'O gráfico é inválido e não permite nenhuma conclusão.', false, 'O gráfico é enganoso na forma, mas os valores dos eixos permitem a leitura correta.', 'descartar dado utilizável');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-3', 'B', 'A diferença é de 4%, calculada como 66 − 62 dividido por 100.', false, 'Dividir por 100 pressupõe que o índice vá de 0 a 100 como base de variação, o que não é a fórmula de variação relativa.', 'usar base arbitrária');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-3', 'C', 'A diferença real é de 4 pontos (cerca de 6,5%), bem menor do que a impressão visual sugere.', true, '66 − 62 = 4 pontos; em termos relativos, 4/62 ≈ 6,5%. O eixo iniciado em 60 amplia visualmente essa diferença.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-3', 'D', 'O serviço B tem satisfação aproximadamente duas vezes maior que o A.', false, 'Essa é exatamente a leitura induzida pelo eixo cortado. Os valores mostram diferença de 6,5%, não de 100%.', 'ler a altura em vez do número');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-3', 'E', 'Não há diferença entre os serviços, pois o gráfico está distorcido.', false, 'A distorção é da representação, não dos dados. A diferença de 4 pontos existe.', 'negar o dado por causa da forma');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-graf-4', 'leitura-de-graficos-e-tabelas', 'extrair-comparar-interpretar-dados', 'challenging', 'comparison', false, 'Dois gráficos apresentam a mesma série de vendas mensais de uma empresa:

I. Gráfico de linhas com eixo vertical de 0 a 500 mil.
II. Gráfico de linhas com eixo vertical de 380 mil a 420 mil.

Sobre os dois gráficos, é correto afirmar:', 'A resposta é A. Mesmos dados, leituras diferentes: a escala é uma escolha comunicativa.', 'A conclusão útil não é "gráfico com eixo cortado mente", e sim "a escala precisa ser lida antes da forma, e escolhida de acordo com a pergunta".', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-4', 'A', 'Ambos representam os mesmos dados; I favorece a percepção de estabilidade e II, a de oscilação.', true, 'A escala não altera os dados, mas altera a leitura: escala ampla achata as variações; escala estreita as amplia. Nenhum é falso, mas cada um sugere uma narrativa.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-4', 'B', 'O gráfico II apresenta dados incorretos, pois omite parte do eixo.', false, 'Omitir parte do eixo é escolha de escala, não erro de dado.', 'confundir escolha de escala com erro');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-4', 'C', 'Apenas o gráfico I pode ser usado em publicações sérias.', false, 'Escalas estreitas são legítimas quando o objetivo é examinar variações pequenas — desde que o eixo esteja visível.', 'regra rígida sem considerar o objetivo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-4', 'D', 'Os dois gráficos levarão qualquer leitor à mesma conclusão.', false, 'A percepção visual muda de forma significativa, mesmo com dados idênticos.', 'ignorar o efeito da representação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-4', 'E', 'O gráfico I exagera as variações da série.', false, 'É o contrário: a escala ampla reduz a percepção das variações.', 'inverter o efeito da escala');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-graf-5', 'leitura-de-graficos-e-tabelas', 'extrair-comparar-interpretar-dados', 'challenging', 'integration', false, 'Um estudo apresenta um gráfico de dispersão relacionando, para 40 municípios, o número de bibliotecas públicas e o índice de desempenho escolar. Os pontos indicam associação positiva.

Qual conclusão é sustentada pelo gráfico?', 'A resposta é A. O gráfico estabelece associação; causalidade exige desenho de estudo que controle outras explicações.', 'A explicação alternativa mais provável aqui é a renda do município: cidades com mais orçamento tendem a ter mais bibliotecas E melhores indicadores educacionais. Essa terceira variável produziria a mesma associação sem qualquer relação causal direta.', NULL, 'Associação é o que o gráfico mostra. Causa é uma hipótese que precisa de mais evidência.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-5', 'A', 'O desempenho escolar determina quantas bibliotecas um município constrói.', false, 'Inverte a direção, mas comete o mesmo erro: atribuir causalidade a partir de associação.', 'causalidade invertida');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-5', 'B', 'Como há exceções entre os pontos, não existe relação alguma entre as variáveis.', false, 'Dispersão com exceções ainda pode indicar associação. A presença de casos fora do padrão não anula a tendência.', 'exigir relação perfeita');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-5', 'C', 'A associação observada só teria validade com mais de 100 municípios.', false, 'Não existe limiar fixo de 100 observações; o tamanho adequado depende do desenho do estudo.', 'inventar critério estatístico');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-5', 'D', 'Existe associação positiva entre as variáveis, o que não permite concluir, isoladamente, que uma cause a outra.', true, 'O gráfico mostra associação. Municípios com mais recursos podem ter simultaneamente mais bibliotecas e melhor desempenho — uma terceira variável explicando as duas.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-5', 'E', 'A construção de bibliotecas eleva o desempenho escolar dos municípios.', false, 'Essa é a conclusão causal que o gráfico não sustenta: correlação não distingue causa, causa comum e coincidência.', 'transformar correlação em causa');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-graf-rec-1', 'leitura-de-graficos-e-tabelas', 'extrair-comparar-interpretar-dados', 'intro', 'concept', true, 'Em um gráfico de setores sobre meios de transporte usados para ir ao trabalho, a fatia "ônibus" corresponde a 35% e a fatia "a pé" a 15%. O total de entrevistados foi 800.

Quantas pessoas usam ônibus a mais do que vão a pé?', 'A resposta é B. A diferença é de 20 pontos percentuais, e 20% de 800 = 160 pessoas.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-1', 'A', '160 pessoas', true, '20% de 800 = 160. Ou: 280 (ônibus) − 120 (a pé) = 160.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-1', 'B', '280 pessoas', false, 'É o total de usuários de ônibus, não a diferença.', 'responder o valor de uma das fatias');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-1', 'C', '400 pessoas', false, 'Corresponde a metade dos entrevistados, valor não relacionado às fatias citadas.', 'chute');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-1', 'D', '120 pessoas', false, 'É o número de quem vai a pé.', 'responder a outra fatia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-1', 'E', '20 pessoas', false, 'Esse é o valor da diferença percentual (20), não o número de pessoas.', 'confundir pontos percentuais com pessoas');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-graf-rec-2', 'leitura-de-graficos-e-tabelas', 'extrair-comparar-interpretar-dados', 'intermediate', 'interpretation', true, 'Uma série mostra o número de inscrições em um curso: 120, 118, 125, 122 e 127 nos últimos cinco semestres.

A leitura mais adequada dessa série é:', 'A resposta é A. Variações pequenas em ambas as direções indicam oscilação em torno de um patamar.', NULL, 'Antes de dizer "tendência", verifique se os movimentos são todos na mesma direção e se o tamanho da variação é relevante.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-2', 'A', 'Há queda acentuada nas inscrições.', false, 'O último valor é o maior da série.', 'leitura contrária ao dado');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-2', 'B', 'A série indica que o curso dobrará de tamanho no próximo semestre.', false, 'Nada na série sustenta projeção de dobra.', 'extrapolar projeção');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-2', 'C', 'Os dados são insuficientes para qualquer descrição.', false, 'Cinco pontos permitem descrever o comportamento observado, ainda que não permitam projeções firmes.', 'excesso de cautela');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-2', 'D', 'Os valores oscilam em torno de um patamar, com leve tendência de alta.', true, 'A variação total é de 9 inscrições sobre ~120 (cerca de 7%), com subidas e descidas. Descrever como estabilidade com leve alta é a leitura mais fiel.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-graf-rec-2', 'E', 'Há crescimento constante ao longo dos cinco semestres.', false, 'Não é constante: houve queda do primeiro para o segundo e do terceiro para o quarto.', 'ignorar as quedas intermediárias');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-func-1', 'funcoes-e-relacoes', 'interpretar-relacoes-entre-grandezas', 'intro', 'concept', false, 'Uma operadora cobra R$ 45,00 fixos por mês mais R$ 0,80 por minuto de ligação excedente.

A expressão que representa o valor total V, em função dos minutos excedentes m, é:', 'A resposta é B. O que varia com o uso multiplica a variável; o que é fixo entra somando.', NULL, 'Teste com m = 0: a expressão correta deve devolver exatamente a parte fixa (R$ 45).', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-1', 'A', 'V = 0,80m + 45', true, 'R$ 0,80 multiplica os minutos (varia com o uso) e R$ 45 é a parte fixa (existe mesmo com m = 0).', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-1', 'B', 'V = 45,80m', false, 'Somar os dois valores em um único coeficiente faria a parte fixa ser cobrada a cada minuto.', 'somar valores de naturezas diferentes');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-1', 'C', 'V = 45 − 0,80m', false, 'O sinal negativo faria a conta diminuir com o uso, o oposto do descrito.', 'errar o sinal da variação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-1', 'D', 'V = 0,80(m + 45)', false, 'Aqui os R$ 45 entrariam como minutos, sendo multiplicados por 0,80 — resultaria em R$ 36 fixos.', 'colocar o valor fixo dentro do parêntese');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-1', 'E', 'V = 45m + 0,80', false, 'Isso cobraria R$ 45 por minuto e R$ 0,80 fixos — troca os papéis dos dois valores.', 'inverter coeficiente e termo independente');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-func-2', 'funcoes-e-relacoes', 'interpretar-relacoes-entre-grandezas', 'intermediate', 'applied', false, 'Duas empresas de entrega cobram:

- Empresa X: R$ 12,00 fixos + R$ 2,00 por km
- Empresa Y: R$ 20,00 fixos + R$ 1,50 por km

A partir de quantos quilômetros a Empresa Y passa a ser mais barata?', 'A resposta é B. O ponto de igualdade é 16 km; acima dele, Y é mais barata.', 'A opção que diz depender da distância mostra por que o número sozinho não basta: quem tem taxa fixa menor ganha nas distâncias curtas; quem tem custo por km menor ganha nas longas.', 'Depois de achar o ponto, teste um valor de cada lado para confirmar quem ganha onde.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-2', 'A', 'A partir de 16 km, pois abaixo disso Y já é mais barata.', false, 'O cálculo do ponto está certo, mas a leitura está invertida: abaixo de 16 km, X é mais barata por causa da taxa fixa menor.', 'inverter a leitura do gráfico');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-2', 'B', 'Y nunca fica mais barata, pois sua taxa fixa é maior.', false, 'A taxa fixa maior é compensada pelo custo por km menor a partir de certa distância.', 'considerar apenas a parte fixa');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-2', 'C', 'A partir de 4 km.', false, 'Resultado de dividir 8 por 2 em vez de por 0,5.', 'erro na divisão final');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-2', 'D', 'A partir de 8 km.', false, 'Em 8 km os preços não se igualam: X custa R$ 28 e Y custa R$ 32.', 'erro de cálculo na equação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-2', 'E', 'A partir de 16 km, pois em 16 km os preços se igualam e, acima disso, Y fica menor.', true, '12 + 2k = 20 + 1,5k → 0,5k = 8 → k = 16. Em 16 km ambos custam R$ 44; acima disso, o menor custo por km faz Y ganhar.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-func-3', 'funcoes-e-relacoes', 'interpretar-relacoes-entre-grandezas', 'intermediate', 'interpretation', false, 'A tabela mostra a população de uma colônia de bactérias:

| Horas | População |
| --- | --- |
| 0 | 200 |
| 1 | 400 |
| 2 | 800 |
| 3 | 1.600 |

O tipo de relação e a expressão correspondente são:', 'A resposta é B. Razão constante entre valores consecutivos (×2) indica crescimento exponencial.', NULL, 'Teste soma primeiro; se a diferença não for constante, teste divisão. Razão constante = exponencial.', 'Diferença constante → linear. Razão constante → exponencial.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-3', 'A', 'Linear, P(t) = 400t.', false, 'Em t = 0 daria 0, contrariando o valor inicial de 200.', 'ignorar o valor em t = 0');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-3', 'B', 'Linear, P(t) = 200t + 200.', false, 'Se fosse linear, a diferença seria constante. Aqui as diferenças são 200, 400 e 800 — crescentes.', 'aplicar modelo linear sem testar');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-3', 'C', 'Exponencial, P(t) = 200 · 2^t.', true, 'A cada hora a população é multiplicada por 2 (razão constante), e o valor inicial é 200. Confere: 200·2³ = 1.600.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-3', 'D', 'Exponencial, P(t) = 2 · 200^t.', false, 'Inverte base e valor inicial: em t = 0 daria 2, não 200.', 'trocar base por valor inicial');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-3', 'E', 'Quadrática, P(t) = 200t² + 200.', false, 'Em t = 1 daria 400, mas em t = 2 daria 1.000, e não 800.', 'aceitar o modelo pelo primeiro ponto');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-func-4', 'funcoes-e-relacoes', 'interpretar-relacoes-entre-grandezas', 'challenging', 'comparison', false, 'Duas descrições foram propostas para a função C(x) = 25x + 150, que representa o custo total de produção de x unidades:

I. Produzir uma unidade a mais aumenta o custo em R$ 25,00.
II. O custo médio por unidade diminui conforme a produção aumenta.

É correto o que se afirma em:', 'A resposta é C. Custo marginal constante (R$ 25) e custo médio decrescente (25 + 150/x) coexistem sem contradição.', 'Verifique numericamente: com 10 unidades, o custo médio é 400/10 = R$ 40. Com 50 unidades, é 1.400/50 = R$ 28. A média cai porque os R$ 150 fixos se distribuem entre mais peças, enquanto cada peça adicional continua custando R$ 25.', NULL, 'Custo marginal é o coeficiente angular. Custo médio inclui a diluição do custo fixo.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-4', 'A', 'I e II, mas apenas para x maior que 150.', false, 'As duas afirmações valem para qualquer x positivo; 150 é o custo fixo, não um limiar.', 'confundir valor do custo fixo com limite de validade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-4', 'B', 'I, apenas.', false, 'I está correta, mas II também: o custo fixo de R$ 150 se dilui entre mais unidades, reduzindo a média.', 'não considerar a diluição do custo fixo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-4', 'C', 'II, apenas.', false, 'II está correta, mas I também: o coeficiente 25 é exatamente o acréscimo por unidade adicional.', 'não reconhecer o custo marginal');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-4', 'D', 'I e II.', true, 'I descreve o custo marginal (constante, R$ 25). II descreve o custo médio: C(x)/x = 25 + 150/x, que decresce à medida que x cresce.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-4', 'E', 'Nenhuma das duas.', false, 'Ambas descrevem corretamente aspectos diferentes da mesma função.', 'excesso de cautela');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-func-5', 'funcoes-e-relacoes', 'interpretar-relacoes-entre-grandezas', 'challenging', 'integration', false, 'Uma prefeitura ajustou a função D(t) = 3,5t + 42 para o número de dias com boa qualidade do ar por trimestre, com t medido em trimestres desde 2024, usando dados de 8 trimestres observados.

Um gestor usa a função para projetar t = 40 (dez anos à frente) e obtém 182 dias.

A principal limitação dessa projeção é:', 'A resposta é A. Dois problemas se somam: extrapolação muito além dos dados e resultado impossível no contexto.', 'O limite físico é o teste mais rápido: um trimestre tem cerca de 91 dias. A função ultrapassa esse teto quando 3,5t + 42 > 91, ou seja, a partir de t ≈ 14 — bem antes de t = 40. Modelos lineares descrevem bem trechos curtos e falham em horizontes longos.', 'Sempre confronte o resultado de uma projeção com os limites do contexto antes de aceitá-la.', 'Um modelo vale no intervalo em que foi ajustado e enquanto fizer sentido no mundo real.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-5', 'A', 'A função deveria ter coeficiente angular negativo, pois a qualidade do ar tende a piorar.', false, 'O sinal do coeficiente vem dos dados observados, não de uma expectativa sobre o tema.', 'substituir dado por opinião');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-5', 'B', 'A projeção extrapola muito além do intervalo observado e, além disso, resulta em valor incompatível com o número de dias de um trimestre.', true, 'O ajuste vale para 8 trimestres; t = 40 está cinco vezes além. E 182 dias excede os ~91 dias de um trimestre, o que mostra que o modelo linear perde sentido físico muito antes disso.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-5', 'C', 'O cálculo está incorreto: 3,5 × 40 + 42 não resulta em 182.', false, '3,5 × 40 = 140; 140 + 42 = 182. O cálculo está certo — o problema é de interpretação, não de aritmética.', 'procurar erro de conta onde não há');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-5', 'D', 'Funções do 1º grau não podem ser usadas para projeções em nenhum caso.', false, 'Podem, dentro do intervalo observado e com ressalvas. A limitação é de alcance, não de tipo de função.', 'generalizar a restrição');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-5', 'E', 'O valor de t deveria ser medido em anos, e não em trimestres.', false, 'A unidade está declarada no enunciado e é coerente com o ajuste.', 'inventar inconsistência de unidade');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-func-rec-1', 'funcoes-e-relacoes', 'interpretar-relacoes-entre-grandezas', 'intro', 'concept', true, 'Na função f(x) = 7x + 25, qual é o valor de f(x) quando x = 0, e o que ele representa em uma situação de cobrança?', 'A resposta é A. f(0) = 25 é o termo independente: a parte fixa da cobrança.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-1', 'A', '7 — o valor cobrado por unidade.', false, '7 é o coeficiente angular, que só aparece quando x é maior que zero.', 'confundir coeficiente com termo independente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-1', 'B', '0 — nada é cobrado sem consumo.', false, 'A existência do termo 25 garante cobrança mesmo com consumo zero.', 'ignorar o termo independente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-1', 'C', '32 — a soma dos dois coeficientes.', false, 'Somar 7 e 25 corresponderia a f(1), não a f(0).', 'somar sem substituir x');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-1', 'D', 'Não é possível calcular sem saber a unidade.', false, 'O valor numérico não depende da unidade escolhida.', 'exigir dado irrelevante');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-1', 'E', '25 — a parte fixa, cobrada mesmo sem consumo.', true, 'Com x = 0, o termo 7x desaparece e sobra 25: exatamente o valor que não depende do consumo.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-func-rec-2', 'funcoes-e-relacoes', 'interpretar-relacoes-entre-grandezas', 'intermediate', 'applied', true, 'Observe a tabela:

| x | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| y | 12 | 19 | 26 | 33 |

A expressão que relaciona y e x é:', 'A resposta é B. Diferença constante de 7 dá o coeficiente; substituir um ponto revela o termo independente.', NULL, 'Ache a diferença constante, depois substitua um par (x, y) para descobrir o valor que falta.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-2', 'A', 'y = 7x + 5', true, 'A diferença constante é 7, e em x = 1 temos 7 + 5 = 12. Confere em todos os pontos.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-2', 'B', 'y = 12x', false, 'Em x = 2 daria 24, e não 19.', 'usar o primeiro valor como coeficiente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-2', 'C', 'y = 5x + 7', false, 'Troca coeficiente e termo independente: em x = 1 daria 12, mas em x = 2 daria 17, e não 19.', 'inverter os dois valores');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-2', 'D', 'y = x + 11', false, 'Em x = 2 daria 13, e não 19.', 'assumir coeficiente 1');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-func-rec-2', 'E', 'y = 7x', false, 'Em x = 1 daria 7, mas a tabela mostra 12. Falta o termo independente.', 'ignorar o valor inicial');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-cid-1', 'cidadania-e-direitos', 'relacionar-conceitos-a-situacoes-concretas', 'intro', 'concept', false, 'Um município cria um conselho municipal de saúde com participação de usuários, trabalhadores e gestores, com poder de aprovar o plano municipal de saúde.

Esse mecanismo é um exemplo de exercício de qual tipo de direito?', 'A resposta é A. O direito exercido é o político; a saúde é o objeto sobre o qual se decide.', NULL, 'Pergunte "o que a pessoa está FAZENDO?", não "sobre o que é o assunto?".', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-1', 'A', 'Direito social, pois o conselho trata de saúde.', false, 'O tema é social, mas o direito exercido é o de participar. Classificar pelo assunto é o erro mais comum aqui.', 'classificar pelo tema em vez do exercício');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-1', 'B', 'Direito civil, pois garante liberdade individual.', false, 'Direitos civis protegem a liberdade individual; conselho é ação coletiva de decisão.', 'confundir individual com coletivo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-1', 'C', 'Não configura direito, apenas prática administrativa.', false, 'A participação social em conselhos é prevista como diretriz do sistema de saúde brasileiro.', 'reduzir participação a formalidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-1', 'D', 'Direito trabalhista, pois inclui trabalhadores em sua composição.', false, 'A presença de trabalhadores é parte da composição, não a natureza do direito exercido.', 'classificar pela composição');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-1', 'E', 'Direito político, pois trata de participação nas decisões públicas.', true, 'O conselho é um canal de participação na decisão coletiva. Embora o tema seja saúde, o direito exercido no ato é o de participar do poder.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-cid-2', 'cidadania-e-direitos', 'relacionar-conceitos-a-situacoes-concretas', 'intermediate', 'applied', false, 'Uma escola pública instala rampas, contrata intérprete de Libras e adapta materiais para estudantes com deficiência. Um morador critica a medida dizendo que "isso é privilégio, porque nem todos recebem esse tratamento".

O argumento do morador desconsidera que:', 'A resposta é A. Equidade é o mecanismo que torna a universalidade real quando existem barreiras distintas.', NULL, NULL, 'Igualdade de tratamento nem sempre produz igualdade de acesso.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-2', 'A', 'Tratamentos diferenciados podem ser o meio necessário para garantir acesso igual ao mesmo direito.', true, 'Sem rampa ou intérprete, o direito à educação existe no papel mas não se realiza. A diferenciação corrige a barreira, não cria vantagem.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-2', 'B', 'Direitos educacionais são facultativos e dependem da disponibilidade orçamentária.', false, 'Educação é direito, não medida facultativa sujeita a conveniência.', 'tratar direito como benefício');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-2', 'C', 'A escola deveria oferecer o mesmo recurso a todos os estudantes indistintamente.', false, 'Intérprete de Libras para quem ouve não amplia acesso nenhum; recursos de acessibilidade respondem a barreiras específicas.', 'confundir igualdade com uniformidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-2', 'D', 'Estudantes com deficiência deveriam ser atendidos em instituições separadas.', false, 'A perspectiva inclusiva prevê acesso à escola comum com os apoios necessários.', 'propor segregação como solução');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-2', 'E', 'A crítica só faria sentido se a escola fosse privada.', false, 'A obrigação de acessibilidade não depende da natureza da instituição.', 'condicionar o direito à natureza da instituição');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-cid-3', 'cidadania-e-direitos', 'relacionar-conceitos-a-situacoes-concretas', 'intermediate', 'interpretation', false, 'Leia o trecho de um relatório fictício de ouvidoria:

"Em 78% dos municípios visitados existe legislação sobre acessibilidade em prédios públicos. Em 31% deles há orçamento específico previsto. Em 12%, foram encontradas obras executadas nos últimos cinco anos."

Os dados apontam principalmente para:', 'A resposta é A. A queda ao longo da cadeia lei → orçamento → execução é a medida da não efetivação.', NULL, 'Quando houver três dados em sequência decrescente, a pergunta costuma ser sobre onde o processo trava.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-3', 'A', 'A desnecessidade de novas leis, já que o tema está totalmente resolvido.', false, 'Apenas 12% executaram obras: o tema está longe de resolvido.', 'confundir existência de lei com solução');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-3', 'B', 'A prioridade dada por gestores municipais ao tema da acessibilidade.', false, 'Prioridade se mede em orçamento e execução, e ambos são baixos.', 'inferir intenção a partir da norma');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-3', 'C', 'O excesso de recursos orçamentários destinados a acessibilidade.', false, 'Só 31% preveem orçamento específico — o oposto de excesso.', 'inverter a leitura do dado');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-3', 'D', 'A distância entre a previsão legal e a efetivação, evidenciada pela queda entre lei, orçamento e execução.', true, 'A sequência 78% → 31% → 12% mostra que a norma existe na maioria, mas orçamento e obra acompanham em proporção muito menor. Esse é o retrato de um direito garantido e não efetivado.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-3', 'E', 'A ausência de legislação sobre acessibilidade na maior parte dos municípios.', false, 'A legislação existe em 78% — é justamente o item com maior cobertura.', 'ler o dado ao contrário');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-cid-4', 'cidadania-e-direitos', 'relacionar-conceitos-a-situacoes-concretas', 'challenging', 'comparison', false, 'Considere duas afirmações sobre o conceito de cidadania regulada:

I. Descreve uma situação em que os direitos são vinculados à ocupação profissional reconhecida pelo Estado.
II. Significa que todos os trabalhadores brasileiros sempre tiveram os mesmos direitos garantidos.

É correto o que se afirma em:', 'A resposta é A. O conceito descreve exatamente a **exclusão** de quem estava fora do emprego formal reconhecido.', 'Trabalhadores rurais e domésticos só tiveram equiparação plena de direitos décadas depois da legislação trabalhista urbana — o que ilustra concretamente o conceito.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-4', 'A', 'I e II, desde que consideradas apenas as décadas recentes.', false, 'Nenhum recorte temporal torna II compatível com o conceito.', 'salvar a afirmação com condição artificial');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-4', 'B', 'I, apenas.', true, 'A cidadania regulada define direitos a partir da inserção em ocupação formalmente reconhecida — o que, por definição, deixava de fora trabalhadores rurais, domésticos e informais. II afirma o contrário disso.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-4', 'C', 'II, apenas.', false, 'II é justamente o que o conceito nega: a cobertura era desigual e condicionada.', 'inverter o sentido do conceito');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-4', 'D', 'I e II.', false, 'I está correta, mas II a contradiz: se os direitos são vinculados à ocupação reconhecida, não são universais.', 'não perceber a contradição entre as afirmações');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-4', 'E', 'Nenhuma das duas.', false, 'I descreve o conceito com precisão.', 'excesso de cautela');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-cid-5', 'cidadania-e-direitos', 'relacionar-conceitos-a-situacoes-concretas', 'challenging', 'integration', false, 'Uma comunidade rural sem transporte escolar regular tem 40% de seus adolescentes fora da escola. A prefeitura responde criando uma campanha de conscientização sobre a importância dos estudos.

A principal limitação dessa resposta é:', 'A resposta é A. A política precisa responder à barreira identificada pelos dados — no caso, deslocamento, não desinformação.', 'Esta questão integra três ideias: direito social exige condições materiais; política pública deve endereçar a causa diagnosticada; e responsabilizar o indivíduo por barreira estrutural desloca o problema em vez de resolvê-lo.', NULL, 'Diagnóstico errado produz política ineficaz mesmo com boa intenção.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-5', 'A', 'O percentual de 40% é baixo demais para justificar qualquer política pública.', false, 'Quatro em cada dez adolescentes fora da escola é indicador grave por qualquer critério.', 'minimizar o dado');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-5', 'B', 'A solução correta seria transferir os estudantes para escolas particulares.', false, 'A solução não enfrenta a barreira de deslocamento e desloca a obrigação do poder público.', 'propor solução que ignora a causa');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-5', 'C', 'A medida trata como problema de informação uma barreira que é material, deixando a causa apontada pelos dados sem resposta.', true, 'O dado apresentado aponta ausência de transporte. Campanha informativa não move ninguém até a escola: a política precisa remover a barreira concreta identificada.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-5', 'D', 'Campanhas de conscientização são sempre ineficazes em qualquer contexto.', false, 'Campanhas funcionam quando o obstáculo é de fato informacional. O problema é a inadequação ao caso, não a ferramenta em si.', 'generalizar a crítica');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-5', 'E', 'A responsabilidade pela frequência escolar é exclusiva das famílias.', false, 'A garantia de acesso à educação básica envolve o poder público, inclusive quanto ao transporte escolar.', 'transferir responsabilidade ao indivíduo');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-cid-rec-1', 'cidadania-e-direitos', 'relacionar-conceitos-a-situacoes-concretas', 'intro', 'concept', true, 'O direito de votar e ser votado pertence a qual categoria de direitos?', 'A resposta é A. Votar e ser votado são a expressão central dos direitos políticos.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-1', 'A', 'Direitos políticos.', true, 'Direitos políticos tratam da participação no poder, e votar é a forma mais direta dessa participação.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-1', 'B', 'Direitos civis.', false, 'Direitos civis protegem liberdades individuais como ir e vir, expressão e propriedade.', 'confundir liberdade individual com participação política');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-1', 'C', 'Direitos sociais.', false, 'Direitos sociais garantem condições materiais como saúde e educação.', 'confundir categorias');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-1', 'D', 'Direitos trabalhistas.', false, 'Direitos trabalhistas são um subconjunto dos sociais e não tratam de participação eleitoral.', 'usar categoria específica demais');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-1', 'E', 'Não é um direito, mas um dever obrigatório.', false, 'No Brasil o voto é obrigatório para parte da população, mas isso não retira sua natureza de direito.', 'confundir obrigatoriedade com ausência de direito');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-cid-rec-2', 'cidadania-e-direitos', 'relacionar-conceitos-a-situacoes-concretas', 'intermediate', 'applied', true, 'Uma lei garante o direito a atendimento prioritário, mas a unidade não possui sinalização nem organização de fila que o viabilize.

Essa situação ilustra:', 'A resposta é A. Direito garantido e direito efetivado são coisas distintas — e a segunda depende de meios concretos.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-2', 'A', 'A inexistência de legislação sobre o tema.', false, 'O enunciado afirma que a lei existe.', 'contrariar o enunciado');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-2', 'B', 'A necessidade de revogar a lei por ser inaplicável.', false, 'A lei não é inaplicável: faltam condições de aplicação, que podem ser criadas.', 'confundir falta de meio com impossibilidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-2', 'C', 'O excesso de direitos garantidos à população.', false, 'O problema apontado é de implementação, não de quantidade de direitos.', 'deslocar o problema');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-2', 'D', 'Uma escolha legítima da unidade quanto ao seu funcionamento.', false, 'Descumprir norma de prioridade não é escolha administrativa legítima.', 'legitimar descumprimento');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-cid-rec-2', 'E', 'A diferença entre direito previsto em lei e direito efetivado na prática.', true, 'A norma existe; faltam os meios de implementação. Essa distância é exatamente o que o conceito descreve.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-urb-1', 'urbanizacao-e-desigualdade', 'interpretar-fenomenos-espaciais-sociais-economicos', 'intro', 'concept', false, 'A urbanização brasileira, entre 1950 e 1990, caracterizou-se por ser acelerada e não acompanhada, na mesma proporção, por oferta de moradia adequada e infraestrutura.

Uma consequência direta desse descompasso foi:', 'A resposta é A. Chegada rápida sem oferta de moradia acessível produz ocupação periférica e precária.', NULL, NULL, 'A localização da moradia popular é determinada pelo preço da terra, não por preferência.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-1', 'A', 'A redução da população urbana em favor do retorno ao campo.', false, 'O movimento foi o oposto: a população urbana cresceu de forma acentuada no período.', 'inverter o sentido do processo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-1', 'B', 'A equalização das condições de moradia entre as regiões das cidades.', false, 'O período aprofundou, e não reduziu, as diferenças internas das cidades.', 'assumir efeito equalizador');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-1', 'C', 'A eliminação da especulação imobiliária nas áreas centrais.', false, 'A valorização das áreas centrais é justamente um dos motores do processo descrito.', 'inverter o papel do mercado de terras');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-1', 'D', 'A concentração exclusiva do crescimento em cidades de pequeno porte.', false, 'O crescimento concentrou-se sobretudo em grandes cidades e regiões metropolitanas.', 'errar a escala do fenômeno');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-1', 'E', 'A expansão de assentamentos precários e a ocupação de áreas periféricas e de risco.', true, 'Sem oferta de moradia acessível na velocidade da chegada, a ocupação se deu onde o solo era barato ou desprezado pelo mercado: periferias distantes e áreas de risco.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-urb-2', 'urbanizacao-e-desigualdade', 'interpretar-fenomenos-espaciais-sociais-economicos', 'intermediate', 'applied', false, 'Em uma região metropolitana, um município concentra os empregos e outro concentra a moradia dos trabalhadores. O município-dormitório arrecada pouco e precisa manter escolas e postos de saúde para uma população que trabalha fora.

Esse quadro evidencia:', 'A resposta é A. A cidade funcional ultrapassa o limite administrativo, e o financiamento público não acompanha.', 'Consórcios intermunicipais e mecanismos de repartição de receita existem justamente para enfrentar esse descompasso.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-2', 'A', 'A superioridade do modelo de cidades isoladas sobre regiões metropolitanas.', false, 'O texto descreve um desafio de gestão, não uma comparação entre modelos.', 'extrapolar juízo de valor');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-2', 'B', 'O descompasso entre a cidade real, que é metropolitana, e a gestão administrativa, que é municipal.', true, 'As pessoas vivem uma cidade única que atravessa fronteiras municipais, enquanto orçamento e responsabilidade seguem divididos por município. Daí o desequilíbrio entre onde se arrecada e onde se gasta.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-2', 'C', 'A má administração exclusiva do município-dormitório.', false, 'O problema é estrutural: mesmo uma gestão eficiente enfrenta o descompasso entre base tributária e demanda por serviços.', 'reduzir problema estrutural a gestão');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-2', 'D', 'A ausência de população economicamente ativa no município-dormitório.', false, 'A população é ativa: ela apenas trabalha em outro município.', 'confundir local de trabalho com inatividade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-2', 'E', 'A desnecessidade de políticas integradas entre municípios vizinhos.', false, 'O quadro demonstra exatamente a necessidade dessas políticas.', 'inverter a conclusão');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-urb-3', 'urbanizacao-e-desigualdade', 'interpretar-fenomenos-espaciais-sociais-economicos', 'intermediate', 'interpretation', false, 'Observe os dados de uma cidade fictícia:

| Indicador | Zona A | Zona B |
| --- | --- | --- |
| Renda média domiciliar | 6,2 salários mínimos | 1,8 salário mínimo |
| Tempo médio até o trabalho | 24 min | 71 min |
| Áreas verdes por habitante | 14 m² | 2 m² |

A leitura mais adequada desses dados é:', 'A resposta é A. Renda, tempo e espaço público variam juntos — é assim que a desigualdade se inscreve no território.', NULL, NULL, 'Segregação socioespacial: a posição social vira posição geográfica.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-3', 'A', 'A Zona A é mais populosa, o que explica seu melhor desempenho nos indicadores.', false, 'Os dados não informam população, e dois dos três indicadores são médias ou razões per capita.', 'inventar dado ausente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-3', 'B', 'O tempo de deslocamento é uma escolha individual dos moradores da Zona B.', false, 'Morar longe do trabalho decorre do preço do solo, não de preferência por deslocamento longo.', 'individualizar causa estrutural');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-3', 'C', 'A desigualdade de renda se manifesta também em acesso desigual a tempo e a espaço público, caracterizando segregação socioespacial.', true, 'Os três indicadores se alinham: menor renda coincide com maior tempo de deslocamento e menos área verde. A desigualdade social aparece inscrita no território.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-3', 'D', 'A renda mais baixa da Zona B é causada pela menor quantidade de áreas verdes.', false, 'Área verde não determina renda. Os indicadores estão associados, não em relação causal direta nessa direção.', 'inverter causa e efeito');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-3', 'E', 'Os dados não permitem qualquer comparação, pois medem coisas diferentes.', false, 'Justamente por medirem dimensões diferentes é que revelam o alinhamento entre elas.', 'recusar leitura possível');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-urb-4', 'urbanizacao-e-desigualdade', 'interpretar-fenomenos-espaciais-sociais-economicos', 'challenging', 'comparison', false, 'Dois programas urbanos foram propostos para um bairro periférico:

I. Construção de uma linha de transporte rápido ligando o bairro ao centro.
II. Construção da mesma linha, acompanhada de reserva de área para habitação de interesse social e limite de valorização do IPTU por período determinado.

A diferença central entre as propostas é que:', 'A resposta é A. Sem instrumentos de permanência, requalificação urbana tende a gentrificar.', 'Reserva de área para habitação de interesse social e moderação temporária da carga tributária são exemplos de instrumentos previstos no arcabouço urbanístico brasileiro para enfrentar esse efeito.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-4', 'A', 'A segunda prevê mecanismos de permanência, reduzindo o risco de que a valorização desloque a população que se pretende beneficiar.', true, 'Melhoria urbana valoriza o solo. Sem instrumentos de permanência, o ganho é capturado por quem chega depois e a população original é deslocada por preço.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-4', 'B', 'A primeira beneficia mais moradores, por concentrar recursos no transporte.', false, 'Beneficia enquanto os moradores permanecerem; sem política de permanência, parte deles não permanece.', 'medir benefício sem considerar o deslocamento');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-4', 'C', 'A segunda impede a valorização do bairro, o que prejudica o investimento.', false, 'Limitar a valorização por período não impede o investimento nem a melhoria: apenas modera a captura do ganho.', 'confundir moderação com impedimento');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-4', 'D', 'Não há diferença prática: transporte é o fator determinante nos dois casos.', false, 'Os efeitos sobre quem permanece no bairro são substancialmente diferentes.', 'ignorar efeitos distributivos');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-4', 'E', 'A primeira é preferível por não interferir no mercado imobiliário.', false, 'Investimento público em transporte já interfere fortemente no mercado imobiliário — a questão é se essa interferência será regulada ou não.', 'supor neutralidade do investimento público');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-urb-5', 'urbanizacao-e-desigualdade', 'interpretar-fenomenos-espaciais-sociais-economicos', 'challenging', 'integration', false, 'Uma cidade registra ocupações recorrentes em encostas com risco de deslizamento. Ao mesmo tempo, 18% dos lotes com infraestrutura completa em áreas centrais estão vazios há mais de dez anos.

A análise que melhor articula os dois fatos é:', 'A resposta é A. Terra vazia bem localizada e ocupação em área de risco são dois efeitos do mesmo mercado de terras.', 'Instrumentos como parcelamento compulsório e IPTU progressivo no tempo existem para enfrentar a retenção especulativa, aumentando a oferta de solo urbanizado.', NULL, 'Função social da propriedade: o solo urbano com infraestrutura deve cumprir uso, não apenas valorizar.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-5', 'A', 'A ocupação de encostas decorre da preferência dos moradores por áreas com vista e menor movimento.', false, 'Risco de deslizamento não é atributo desejado; a ocupação decorre de ausência de alternativa acessível.', 'individualizar causa estrutural');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-5', 'B', 'A solução adequada seria remover as ocupações sem qualquer contrapartida habitacional.', false, 'Remoção sem alternativa transfere o problema de lugar e costuma gerar nova ocupação de risco.', 'propor solução que reproduz a causa');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-5', 'C', 'Os lotes vazios devem permanecer assim para preservar o valor do solo urbano.', false, 'Preservar o valor do solo é justamente o interesse que sustenta a retenção — e o que a política urbana busca moderar em nome da função social da propriedade.', 'confundir interesse privado com interesse público');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-5', 'D', 'Os dois fatos são faces do mesmo processo: a retenção especulativa de terra bem localizada eleva o preço e empurra a ocupação para áreas de risco.', true, 'Lotes vazios com infraestrutura são mantidos à espera de valorização. Isso reduz a oferta efetiva de solo urbanizado, eleva o preço e desloca quem não pode pagar para áreas desprezadas pelo mercado — exatamente as de risco.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-5', 'E', 'São fenômenos independentes: um decorre da geografia e o outro do mercado.', false, 'A geografia define onde há encosta; o mercado define quem acaba morando lá. Os dois se articulam.', 'separar fatos conectados');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-urb-rec-1', 'urbanizacao-e-desigualdade', 'interpretar-fenomenos-espaciais-sociais-economicos', 'intro', 'concept', true, 'O termo "periferização" descreve principalmente:', 'A resposta é A. Periferização liga renda baixa a localização distante e mal servida.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-1', 'A', 'O deslocamento da população de menor renda para áreas distantes e menos servidas de infraestrutura.', true, 'O conceito descreve a relação entre renda e localização: quem tem menos renda ocupa a terra mais barata, que é a mais distante e menos equipada.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-1', 'B', 'O crescimento populacional das cidades em geral.', false, 'Crescimento populacional é urbanização; periferização é a distribuição desigual dentro da cidade.', 'confundir volume com distribuição');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-1', 'C', 'A construção de novos centros comerciais fora do centro histórico.', false, 'Isso descreve descentralização de atividades, não a distribuição da moradia por renda.', 'confundir com descentralização econômica');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-1', 'D', 'A migração de moradores urbanos para o campo.', false, 'É o movimento inverso ao descrito pelo conceito.', 'inverter o sentido');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-1', 'E', 'A valorização dos imóveis das áreas mais afastadas.', false, 'A periferização decorre justamente do preço mais baixo dessas áreas.', 'inverter a lógica de preço');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-urb-rec-2', 'urbanizacao-e-desigualdade', 'interpretar-fenomenos-espaciais-sociais-economicos', 'intermediate', 'applied', true, 'Após a instalação de equipamentos públicos em um bairro popular, o aluguel médio sobe fortemente e parte dos moradores antigos precisa se mudar.

Esse processo é conhecido como:', 'A resposta é A. Melhoria urbana sem política de permanência tende a substituir a população do bairro.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-2', 'A', 'Metropolização.', false, 'Metropolização é a integração funcional entre municípios vizinhos.', 'trocar de escala');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-2', 'B', 'Conurbação.', false, 'Conurbação é a junção física de manchas urbanas de municípios diferentes.', 'confundir com fenômeno físico');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-2', 'C', 'Êxodo rural.', false, 'Êxodo rural é a saída da população do campo para a cidade.', 'trocar de fenômeno');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-2', 'D', 'Gentrificação.', true, 'Gentrificação é a valorização de uma área que resulta na substituição da população original por moradores de renda mais alta.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-urb-rec-2', 'E', 'Periferização.', false, 'Periferização descreve o deslocamento para áreas distantes; aqui o foco é a valorização de uma área já ocupada.', 'confundir dois processos relacionados');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-amb-1', 'meio-ambiente-e-sociedade', 'analisar-impactos-conflitos-e-uso-do-territorio', 'intro', 'concept', false, 'Uma fábrica lança efluentes não tratados em um córrego. Moradores a jusante relatam perda da pesca e aumento de problemas de saúde.

Em análise econômica e ambiental, o custo suportado pelos moradores é denominado:', 'A resposta é A. O custo não desapareceu: saiu da planilha da empresa e recaiu sobre a comunidade.', NULL, NULL, 'Internalizar a externalidade é fazer o custo voltar a quem o produz.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-1', 'A', 'Externalidade negativa.', true, 'É um custo real gerado pela atividade produtiva, mas suportado por terceiros que não participam da decisão nem do lucro.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-1', 'B', 'Custo de produção.', false, 'Custo de produção é o que a empresa efetivamente paga. Aqui, o custo foi transferido para fora da empresa.', 'confundir custo interno com externo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-1', 'C', 'Subsídio ambiental.', false, 'Subsídio é transferência deliberada de recursos públicos, o que não descreve a situação.', 'trocar de conceito econômico');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-1', 'D', 'Compensação ambiental.', false, 'Compensação é a medida que repara ou contrabalança o dano — aqui ela está ausente.', 'confundir dano com reparação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-1', 'E', 'Depreciação de capital.', false, 'Depreciação refere-se à perda de valor de bens da própria empresa.', 'usar termo contábil não relacionado');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-amb-2', 'meio-ambiente-e-sociedade', 'analisar-impactos-conflitos-e-uso-do-territorio', 'intermediate', 'applied', false, 'Um estudo mapeia a localização de aterros, indústrias poluentes e áreas com maior exposição a enchentes em uma região metropolitana. Verifica-se forte coincidência com as áreas de menor renda.

Esse padrão é analisado pelo conceito de:', 'A resposta é A. Quando o mapa do dano ambiental coincide com o mapa da renda, o conceito aplicável é justiça ambiental.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-2', 'A', 'Determinismo geográfico, segundo o qual o meio define as condições sociais.', false, 'A coincidência decorre de decisões de localização e do mercado de terras, não de determinação natural.', 'naturalizar padrão socialmente produzido');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-2', 'B', 'Transição energética, que trata da mudança da matriz de energia.', false, 'Não há relação com matriz energética no caso descrito.', 'trocar de tema');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-2', 'C', 'Capacidade de suporte, que define o limite populacional de um ecossistema.', false, 'Capacidade de suporte é conceito ecológico sobre limites, não sobre distribuição social de danos.', 'usar conceito ecológico em questão social');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-2', 'D', 'Justiça ambiental, que trata da distribuição desigual dos riscos e danos ambientais entre grupos sociais.', true, 'O conceito nomeia exatamente esse padrão: os custos ambientais recaem desproporcionalmente sobre populações de menor renda e grupos vulnerabilizados.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-2', 'E', 'Desenvolvimento sustentável, que equilibra crescimento e preservação.', false, 'Esse conceito trata da relação entre gerações e dimensões do desenvolvimento, não da distribuição do dano entre grupos no presente.', 'usar conceito mais genérico');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-amb-3', 'meio-ambiente-e-sociedade', 'analisar-impactos-conflitos-e-uso-do-territorio', 'intermediate', 'interpretation', false, 'Leia o trecho de um parecer técnico fictício:

"O empreendimento gerará 400 empregos diretos e ampliará a arrecadação municipal. O estudo aponta risco de assoreamento do rio que abastece três comunidades ribeirinhas, cujas atividades de pesca representam a principal fonte de renda local."

O parecer evidencia que:', 'A resposta é A. O ponto não é aprovar ou rejeitar, mas reconhecer quem ganha, quem perde e o que fazer a respeito.', NULL, 'Em conflitos ambientais, separe sempre: quem recebe o benefício e quem suporta o custo.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-3', 'A', 'Os benefícios se distribuem de forma ampla enquanto os custos se concentram em um grupo específico, o que exige medidas de compensação e mitigação.', true, 'Emprego e arrecadação beneficiam o município como um todo; o risco recai sobre três comunidades cuja renda depende do rio. Essa assimetria é o núcleo do problema e o que justifica condicionantes.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-3', 'B', 'O empreendimento deve ser aprovado sem restrições, pois gera empregos.', false, 'O parecer aponta risco concreto à principal fonte de renda de comunidades, o que exige tratamento e não omissão.', 'considerar apenas um lado da conta');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-3', 'C', 'O empreendimento deve ser rejeitado, pois todo impacto ambiental é inaceitável.', false, 'A análise ambiental trabalha com mitigação, compensação e condicionantes; rejeição automática não decorre do parecer.', 'adotar posição absoluta');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-3', 'D', 'A pesca das comunidades é atividade econômica irrelevante frente à arrecadação municipal.', false, 'É a principal fonte de renda local — hierarquizar assim ignora a distribuição do impacto.', 'desconsiderar quem sofre o custo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-3', 'E', 'O estudo técnico é desnecessário quando há geração de emprego.', false, 'O estudo é justamente o instrumento que revela a assimetria e permite decidir com informação.', 'dispensar instrumento de análise');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-amb-4', 'meio-ambiente-e-sociedade', 'analisar-impactos-conflitos-e-uso-do-territorio', 'challenging', 'comparison', false, 'Duas propostas para reduzir resíduos plásticos em uma cidade:

I. Campanha educativa para que a população reduza o consumo de descartáveis.
II. Regulação que obrigue estabelecimentos a oferecer alternativas reutilizáveis e responsabilize produtores pela destinação das embalagens.

Sobre as propostas, é correto afirmar:', 'A resposta é A. Educação atua nas escolhas; regulação atua nas opções disponíveis e em quem paga a destinação.', NULL, NULL, 'Responsabilidade estendida do produtor: quem coloca a embalagem no mercado responde pelo seu retorno.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-4', 'A', 'As duas propostas produzem exatamente o mesmo efeito.', false, 'Elas atuam em pontos diferentes da cadeia: comportamento individual e estrutura de oferta.', 'igualar intervenções de escalas distintas');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-4', 'B', 'Nenhuma das duas trata do problema, que é exclusivamente global.', false, 'Resíduo sólido urbano tem gestão local e regional bem definidas.', 'deslocar tudo para a escala global');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-4', 'C', 'A segunda atua sobre a estrutura da oferta e a responsabilidade do produtor, tendendo a efeito mais amplo; a primeira é complementar e depende da existência de alternativas viáveis.', true, 'Campanha muda escolhas dentro das opções existentes. Regulação muda quais opções existem e onde recai o custo da destinação. As duas se somam, mas não são equivalentes em alcance.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-4', 'D', 'A primeira é suficiente, pois o consumo é a origem do problema.', false, 'Sem alternativa disponível, a orientação não se converte em prática — e a destinação segue sem responsável definido.', 'atribuir solução estrutural ao indivíduo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-4', 'E', 'A segunda é ineficaz, pois interfere na liberdade do consumidor.', false, 'Regulação de oferta amplia opções em vez de restringi-las, e a responsabilidade pela destinação é instrumento consolidado de política ambiental.', 'confundir regulação com restrição de escolha');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-amb-5', 'meio-ambiente-e-sociedade', 'analisar-impactos-conflitos-e-uso-do-territorio', 'challenging', 'integration', false, 'Um município aprova a expansão urbana sobre área de proteção de manancial, alegando déficit habitacional. A companhia de saneamento alerta para risco de contaminação do reservatório que abastece 300 mil pessoas.

A análise mais completa da situação é:', 'A resposta é A. Dois direitos legítimos em conflito exigem instrumento de planejamento, não escolha entre lados.', 'Esta questão integra três conteúdos: direito social à moradia, direito difuso à segurança hídrica e instrumentos de ordenamento territorial. A alternativa correta é a única que reconhece os três.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-5', 'A', 'A decisão é exclusivamente técnica e não comporta participação social.', false, 'Decisões sobre uso do território afetam direitos e envolvem participação prevista nos instrumentos urbanísticos.', 'excluir a dimensão política do problema');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-5', 'B', 'Há conflito entre dois direitos legítimos — moradia e segurança hídrica — que exige instrumentos de planejamento territorial capazes de atender à demanda habitacional fora da área sensível.', true, 'Os dois lados representam direitos reais de populações reais. A saída não é escolher um, e sim usar zoneamento e produção de habitação de interesse social para atender à moradia em área adequada.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-5', 'C', 'Trata-se de conflito entre desenvolvimento e meio ambiente, no qual o desenvolvimento deve prevalecer.', false, 'A oposição é falsa: 300 mil pessoas abastecidas também estão do lado social da equação.', 'opor meio ambiente a pessoas');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-5', 'D', 'O déficit habitacional justifica qualquer ocupação, independentemente do risco de abastecimento.', false, 'Comprometer o abastecimento de 300 mil pessoas criaria um problema social maior que o resolvido.', 'considerar apenas um dos direitos');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-5', 'E', 'A área de manancial deve ser preservada mesmo que nenhuma alternativa habitacional seja oferecida.', false, 'Preservar sem oferecer alternativa tende a produzir ocupação irregular na mesma área, agravando o risco.', 'ignorar a demanda social que gera a pressão');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-amb-rec-1', 'meio-ambiente-e-sociedade', 'analisar-impactos-conflitos-e-uso-do-territorio', 'intro', 'concept', true, 'O princípio das "responsabilidades comuns porém diferenciadas" estabelece que:', 'A resposta é A. Comum a todos, proporcional a cada um.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-1', 'A', 'Apenas os países mais ricos têm qualquer responsabilidade ambiental.', false, 'A responsabilidade é comum a todos: o que varia é a proporção.', 'ler "diferenciadas" como "exclusivas"');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-1', 'B', 'Todos os países devem adotar exatamente as mesmas metas.', false, 'Metas idênticas contrariam a parte "diferenciadas" do princípio.', 'ignorar a diferenciação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-1', 'C', 'Países em desenvolvimento estão dispensados de qualquer compromisso.', false, 'Dispensa total contraria a parte "comuns" do princípio.', 'confundir proporcionalidade com isenção');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-1', 'D', 'A responsabilidade recai exclusivamente sobre empresas, não sobre Estados.', false, 'O princípio organiza compromissos entre Estados em acordos internacionais.', 'trocar o sujeito do princípio');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-1', 'E', 'Todos os países têm responsabilidade sobre problemas ambientais globais, em medidas proporcionais à sua contribuição histórica e capacidade de resposta.', true, 'O princípio reconhece a responsabilidade compartilhada e, ao mesmo tempo, a desigualdade de contribuição para o problema e de capacidade de agir.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-amb-rec-2', 'meio-ambiente-e-sociedade', 'analisar-impactos-conflitos-e-uso-do-territorio', 'intermediate', 'applied', true, 'Uma cidade cria um programa de coleta seletiva doméstica e o apresenta como solução para o descarte irregular de resíduos industriais perigosos.

A principal inadequação dessa proposta é:', 'A resposta é A. A escala e o tipo da solução precisam corresponder à escala e ao tipo do problema.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-2', 'A', 'Programas municipais não podem tratar de resíduos.', false, 'Municípios têm competência sobre gestão de resíduos sólidos urbanos.', 'negar competência existente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-2', 'B', 'A solução atua em uma escala e um tipo de resíduo diferentes do problema apontado, que exige fiscalização e responsabilização do gerador industrial.', true, 'Resíduo industrial perigoso tem cadeia, regulação e responsável distintos do resíduo doméstico. A coleta seletiva é útil, mas não endereça esse problema.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-2', 'C', 'A coleta seletiva é uma política ineficaz em qualquer situação.', false, 'Ela é eficaz para resíduo domiciliar reciclável — o problema é o descompasso com o caso apresentado.', 'generalizar a crítica');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-2', 'D', 'A responsabilidade pelo descarte industrial é dos moradores da cidade.', false, 'A responsabilidade pelo resíduo perigoso é do gerador.', 'transferir responsabilidade ao indivíduo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-amb-rec-2', 'E', 'Resíduos industriais não causam impacto ambiental relevante.', false, 'Resíduos perigosos estão entre os de maior potencial de dano.', 'minimizar o problema');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-eco-1', 'ecologia-e-ciclos', 'relacionar-seres-vivos-energia-materia-impactos', 'intro', 'concept', false, 'Em um ecossistema, os produtores fixam 15.000 kcal/m²/ano. Considerando uma transferência média de 10% entre níveis tróficos, a energia disponível para os consumidores secundários é de aproximadamente:', 'A resposta é B. Produtores → primários → secundários são duas etapas de 10%: 15.000 × 0,1 × 0,1 = 150.', NULL, 'Escreva a cadeia com setas e conte quantas setas separam o nível pedido dos produtores.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-1', 'A', '15 kcal/m²/ano', false, 'Corresponde aos consumidores terciários, uma transferência além do pedido.', 'contar uma transferência a mais');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-1', 'B', '7.500 kcal/m²/ano', false, 'Corresponde a 50% de transferência, e não aos 10% informados.', 'usar percentual incorreto');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-1', 'C', '15.000 kcal/m²/ano', false, 'É o valor fixado pelos produtores, antes de qualquer transferência.', 'não aplicar a perda');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-1', 'D', '1.500 kcal/m²/ano', false, 'Esse é o valor dos consumidores primários — apenas uma transferência a partir dos produtores.', 'contar uma transferência a menos');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-1', 'E', '150 kcal/m²/ano', true, 'São duas transferências: 15.000 → 1.500 (primários) → 150 (secundários).', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-eco-2', 'ecologia-e-ciclos', 'relacionar-seres-vivos-energia-materia-impactos', 'intermediate', 'applied', false, 'Um lago próximo a área agrícola recebe grande quantidade de fertilizantes por escoamento. Semanas depois, observa-se intensa proliferação de algas e, em seguida, mortandade de peixes.

A causa direta da morte dos peixes é:', 'A resposta é A. Excesso de nutrientes → algas → morte das algas → decomposição → queda do oxigênio → mortandade.', 'A pergunta pede a causa **direta**. Rastreie a cadeia até o passo imediatamente anterior à morte dos peixes.', NULL, 'Eutrofização mata por asfixia, não por envenenamento na maioria dos casos.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-2', 'A', 'A redução do oxigênio dissolvido durante a decomposição da matéria orgânica acumulada.', true, 'As algas morrem em massa e sua decomposição consome oxigênio dissolvido. Os peixes morrem por asfixia — a causa é indireta.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-2', 'B', 'A liberação de gás carbônico pelas algas durante a fotossíntese.', false, 'Na fotossíntese as algas consomem CO₂ e liberam O₂; o processo descrito está invertido.', 'inverter reagentes e produtos da fotossíntese');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-2', 'C', 'O consumo direto das algas pelos peixes, que causa intoxicação em todos os casos.', false, 'Algumas florações produzem toxinas, mas o mecanismo geral e mais frequente da mortandade é a queda do oxigênio.', 'generalizar um caso particular');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-2', 'D', 'O aumento da luminosidade na superfície do lago.', false, 'A proliferação de algas reduz a penetração de luz, não a aumenta.', 'inverter o efeito sobre a luz');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-2', 'E', 'A elevação do pH provocada pelos fertilizantes ao entrar em contato com a água.', false, 'Alterações de pH podem ocorrer, mas não são o mecanismo central descrito no processo de eutrofização.', 'escolher um efeito secundário');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-eco-3', 'ecologia-e-ciclos', 'relacionar-seres-vivos-energia-materia-impactos', 'intermediate', 'interpretation', false, 'A tabela apresenta a concentração de um poluente persistente em organismos de um mesmo ambiente aquático:

| Organismo | Nível trófico | Concentração (ppm) |
| --- | --- | --- |
| Fitoplâncton | produtor | 0,04 |
| Zooplâncton | consumidor primário | 0,4 |
| Peixe pequeno | consumidor secundário | 3,8 |
| Ave piscívora | consumidor terciário | 42,0 |

Os dados evidenciam o fenômeno de:', 'A resposta é A. Concentração crescente a cada nível trófico é a definição de biomagnificação.', 'A ave apresenta concentração cerca de 1.000 vezes maior que o fitoplâncton. Substâncias persistentes e lipossolúveis, que o organismo não consegue excretar, produzem esse padrão.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-3', 'A', 'Produção crescente do poluente pelos organismos de níveis superiores.', false, 'Os organismos não produzem o poluente: eles o acumulam a partir do alimento.', 'inverter origem do poluente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-3', 'B', 'Decomposição progressiva do poluente ao longo da cadeia.', false, 'Se houvesse decomposição, a concentração cairia ao subir a cadeia.', 'ler o dado ao contrário');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-3', 'C', 'Equilíbrio da concentração entre todos os níveis tróficos.', false, 'A variação é de mais de mil vezes entre o primeiro e o último nível.', 'ignorar a magnitude da variação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-3', 'D', 'Biomagnificação, com aumento da concentração a cada nível trófico.', true, 'A concentração multiplica-se cerca de dez vezes a cada nível. Isso caracteriza biomagnificação: o predador concentra o que estava disperso em muitas presas.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-3', 'E', 'Bioacumulação exclusivamente individual, sem relação com a cadeia.', false, 'Bioacumulação ocorre dentro do indivíduo. Os dados mostram progressão **entre níveis**, o que caracteriza biomagnificação.', 'confundir os dois conceitos');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-eco-4', 'ecologia-e-ciclos', 'relacionar-seres-vivos-energia-materia-impactos', 'challenging', 'comparison', false, 'Considere duas afirmações sobre ecossistemas:

I. A energia entra pelo Sol, é transferida entre níveis tróficos e deixa o sistema principalmente na forma de calor.
II. O carbono presente hoje em um organismo pode já ter integrado outros seres vivos no passado.

É correto o que se afirma em:', 'A resposta é C. Energia flui; matéria cicla. As duas afirmações são complementares, não concorrentes.', NULL, NULL, 'Essa é a distinção mais cobrada em ecologia — memorize pelo par "flui × cicla".', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-4', 'A', 'II, apenas.', false, 'II está correta, mas I também descreve corretamente o fluxo unidirecional da energia.', 'não reconhecer o fluxo da energia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-4', 'B', 'I e II.', true, 'As duas afirmações descrevem os dois princípios complementares: energia flui em sentido único e se dissipa; matéria cicla e é reutilizada.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-4', 'C', 'Nenhuma das duas.', false, 'Ambas correspondem a princípios básicos da ecologia.', 'excesso de cautela');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-4', 'D', 'I e II, mas apenas em ecossistemas aquáticos.', false, 'Os dois princípios valem para qualquer ecossistema.', 'restringir indevidamente o alcance');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-4', 'E', 'I, apenas.', false, 'I está correta, mas II também: a matéria cicla, então os mesmos átomos são reutilizados indefinidamente.', 'não reconhecer a ciclagem da matéria');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-eco-5', 'ecologia-e-ciclos', 'relacionar-seres-vivos-energia-materia-impactos', 'challenging', 'integration', false, 'Uma proposta de recuperação de uma área degradada prevê o plantio exclusivo de uma única espécie de crescimento rápido, com corte previsto em sete anos.

Do ponto de vista ecológico, a principal limitação dessa proposta é:', 'A resposta é A. Cobrir o solo não é o mesmo que restaurar um ecossistema.', 'Esta questão integra três conteúdos: biodiversidade como base das interações, sucessão ecológica como processo temporal e serviços ecossistêmicos como resultado. Um plantio homogêneo com corte em sete anos atende a objetivos produtivos, não de restauração.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-5', 'A', 'A área deveria permanecer sem intervenção para que se recupere sozinha.', false, 'Em áreas muito degradadas, a regeneração natural pode não ocorrer sem intervenção. A crítica é ao desenho da intervenção.', 'trocar uma solução simplista por outra');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-5', 'B', 'Sete anos é tempo suficiente para a plena recuperação de qualquer ecossistema.', false, 'A restauração de funções ecossistêmicas costuma levar décadas, o que reforça a limitação da proposta.', 'subestimar o tempo da sucessão');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-5', 'C', 'A cobertura vegetal por uma única espécie não reconstitui as interações e a diversidade necessárias para restabelecer as funções do ecossistema.', true, 'Restauração ecológica exige diversidade de espécies, presença de polinizadores e dispersores e retomada da sucessão. Uma monocultura cobre o solo, mas não recompõe a teia de interações nem os ciclos associados.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-5', 'D', 'Espécies de crescimento rápido não realizam fotossíntese de forma eficiente.', false, 'Crescimento rápido normalmente indica alta eficiência fotossintética, não o contrário.', 'inverter relação fisiológica');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-5', 'E', 'O plantio de árvores nunca contribui para a recuperação de áreas degradadas.', false, 'O plantio contribui — a limitação está na baixa diversidade e no manejo previsto, não no ato de plantar.', 'generalizar a crítica');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-eco-rec-1', 'ecologia-e-ciclos', 'relacionar-seres-vivos-energia-materia-impactos', 'intro', 'concept', true, 'Em uma cadeia alimentar, os organismos capazes de produzir seu próprio alimento a partir da energia solar são chamados de:', 'A resposta é A. Produtores são a porta de entrada da energia no ecossistema.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-1', 'A', 'Produtores.', true, 'Produtores (autótrofos) convertem energia luminosa em matéria orgânica pela fotossíntese, sustentando os demais níveis.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-1', 'B', 'Consumidores primários.', false, 'Consumidores primários se alimentam dos produtores; não produzem o próprio alimento.', 'confundir níveis adjacentes');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-1', 'C', 'Decompositores.', false, 'Decompositores obtêm energia da matéria orgânica morta.', 'confundir com o papel de reciclagem');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-1', 'D', 'Consumidores terciários.', false, 'Estão no topo da cadeia e dependem de outros consumidores.', 'inverter a posição na cadeia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-1', 'E', 'Detritívoros.', false, 'Detritívoros consomem restos orgânicos, sem produzir o próprio alimento.', 'confundir com decomposição');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-eco-rec-2', 'ecologia-e-ciclos', 'relacionar-seres-vivos-energia-materia-impactos', 'intermediate', 'applied', true, 'A remoção de um predador de topo de um ecossistema tende a provocar, inicialmente:', 'A resposta é A. O efeito se propaga em cascata pela cadeia, começando pelo aumento das presas.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-2', 'A', 'Redução imediata da população de suas presas.', false, 'Sem o predador, a pressão sobre as presas diminui, o que tende a aumentar sua população.', 'inverter o efeito');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-2', 'B', 'Aumento imediato da população de produtores.', false, 'Com mais herbívoros, os produtores tendem a sofrer maior consumo.', 'pular níveis na cadeia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-2', 'C', 'Nenhuma alteração, pois predadores de topo são pouco numerosos.', false, 'Predadores de topo exercem controle desproporcional à sua abundância.', 'confundir número com importância ecológica');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-2', 'D', 'Extinção imediata de todos os níveis inferiores.', false, 'O efeito é de desequilíbrio e oscilação, não de extinção instantânea generalizada.', 'exagerar a magnitude do efeito');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-eco-rec-2', 'E', 'Aumento da população de suas presas, com pressão crescente sobre os níveis inferiores.', true, 'Sem controle predatório, as presas crescem em número e passam a consumir mais dos níveis abaixo, o que se propaga pela cadeia.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-ene-1', 'energia-e-transformacoes', 'interpretar-conservacao-consumo-transformacao-energia', 'intro', 'concept', false, 'Um ferro de passar de 1.200 W é utilizado durante 30 minutos por dia, ao longo de 30 dias.

O consumo mensal de energia elétrica é de:', 'A resposta é A. Energia = potência (kW) × tempo (h) × dias = 1,2 × 0,5 × 30 = 18 kWh.', NULL, 'Converta primeiro (W→kW, min→h) e só depois multiplique.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-1', 'A', '1.200 kWh', false, 'Confunde a potência em watts com o consumo em quilowatt-hora.', 'confundir potência com energia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-1', 'B', '600 kWh', false, 'Corresponde a esquecer a conversão de watts para quilowatts.', 'esquecer a divisão por 1.000');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-1', 'C', '0,6 kWh', false, 'É o consumo de um único dia, não do mês.', 'parar antes de multiplicar pelos dias');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-1', 'D', '18 kWh', true, '1,2 kW × 0,5 h = 0,6 kWh por dia; × 30 dias = 18 kWh.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-1', 'E', '36 kWh', false, 'Corresponde a usar 1 hora por dia em vez de 30 minutos.', 'não converter minutos em horas');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-ene-2', 'energia-e-transformacoes', 'interpretar-conservacao-consumo-transformacao-energia', 'intermediate', 'applied', false, 'Uma família troca 10 lâmpadas incandescentes de 60 W por lâmpadas de LED de 9 W, que produzem a mesma iluminação. O uso médio é de 5 horas por dia.

A economia mensal (30 dias) de energia é de aproximadamente:', 'A resposta é A. Economia = diferença de potência × número de lâmpadas × horas × dias.', 'Também é possível calcular os dois consumos (90 kWh e 13,5 kWh) e subtrair: 90 − 13,5 = 76,5 kWh. Os dois caminhos coincidem.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-2', 'A', '13,5 kWh', false, 'Corresponde ao consumo total das lâmpadas de LED.', 'responder o consumo novo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-2', 'B', '51 kWh', false, 'Usa a diferença de potência (51) diretamente como resultado, sem multiplicar pelo tempo e pela quantidade.', 'não completar o cálculo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-2', 'C', '76,5 kWh', true, 'Diferença por lâmpada: 60 − 9 = 51 W = 0,051 kW. Total: 0,051 × 10 × 5 h × 30 dias = 76,5 kWh.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-2', 'D', '7,65 kWh', false, 'Resultado de considerar apenas uma lâmpada em vez de dez.', 'esquecer a quantidade');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-2', 'E', '90 kWh', false, 'Corresponde ao consumo total das incandescentes, não à economia.', 'calcular consumo em vez de diferença');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-ene-3', 'energia-e-transformacoes', 'interpretar-conservacao-consumo-transformacao-energia', 'intermediate', 'interpretation', false, 'Uma usina termelétrica recebe 1.000 MJ de energia na forma de combustível e entrega 380 MJ na forma de energia elétrica.

Sobre os 620 MJ restantes, é correto afirmar que:', 'A resposta é A. Eficiência de 38%: os 62% restantes se conservam, mas dispersos como calor.', NULL, NULL, '"Perder energia" significa degradá-la, não destruí-la.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-3', 'A', 'Foram destruídos durante o processo de conversão.', false, 'Energia não é destruída — esse é o princípio da conservação.', 'violar a conservação da energia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-3', 'B', 'Foram armazenados na usina para uso posterior.', false, 'Calor dissipado no ambiente não fica armazenado de forma utilizável.', 'confundir dissipação com armazenamento');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-3', 'C', 'Correspondem a erro de medição, pois a eficiência deveria ser de 100%.', false, 'Eficiência de 100% é fisicamente impossível em conversões térmicas.', 'esperar eficiência total');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-3', 'D', 'Foram convertidos integralmente em energia química no combustível restante.', false, 'A energia química é a entrada do processo, não o destino das perdas.', 'inverter entrada e saída');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-3', 'E', 'Foram transferidos ao ambiente, sobretudo como calor, permanecendo conservados mas em forma de menor aproveitamento.', true, 'A energia se conserva. O que se perde é a capacidade de realizar trabalho: os 620 MJ se dispersam como calor de baixa temperatura, difícil de reaproveitar.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-ene-4', 'energia-e-transformacoes', 'interpretar-conservacao-consumo-transformacao-energia', 'challenging', 'comparison', false, 'Dois aparelhos são comparados:

- Aparelho X: 2.000 W, usado 30 minutos por dia.
- Aparelho Y: 250 W, usado 8 horas por dia.

Sobre o consumo mensal dos dois:', 'A resposta é A. Consumo é potência **vezes tempo** — o tempo costuma pesar mais que a potência.', NULL, 'Calcule kWh/dia de cada um antes de comparar. Nunca compare watts diretamente.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-4', 'A', 'Y consome o dobro de X, pois 2 kWh/dia contra 1 kWh/dia.', true, 'X: 2 kW × 0,5 h = 1 kWh/dia. Y: 0,25 kW × 8 h = 2 kWh/dia. O aparelho de menor potência consome mais por ficar ligado oito vezes mais tempo.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-4', 'B', 'X consome mais, pois tem potência oito vezes maior.', false, 'Potência maior não implica consumo maior quando o tempo de uso é muito menor.', 'comparar só pela potência');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-4', 'C', 'Os dois consomem exatamente o mesmo.', false, 'Os valores são 1 kWh/dia e 2 kWh/dia — diferentes.', 'supor equivalência sem calcular');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-4', 'D', 'X consome mais, pois potência elevada gera mais perdas por calor.', false, 'Perdas dependem do projeto do equipamento; o consumo faturado é potência × tempo.', 'introduzir fator não informado');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-4', 'E', 'Não é possível comparar sem conhecer a tarifa de energia.', false, 'A tarifa converte kWh em reais, mas a comparação de consumo em kWh já é possível.', 'exigir dado desnecessário');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-ene-5', 'energia-e-transformacoes', 'interpretar-conservacao-consumo-transformacao-energia', 'challenging', 'integration', false, 'Um município pretende reduzir emissões substituindo parte da energia de origem térmica por solar fotovoltaica. Um técnico observa que a geração solar cai à noite e em dias nublados, e que os painéis exigem mineração de materiais específicos.

A conclusão mais adequada é:', 'A resposta é A. Reconhece o ganho real e os dois desafios concretos, sem idealizar nem rejeitar a fonte.', 'Esta questão integra três conteúdos: transformação de energia, intermitência e análise de ciclo de vida. A alternativa correta é a única que sustenta as três dimensões ao mesmo tempo.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-5', 'A', 'A fonte solar é totalmente limpa e não apresenta impacto ambiental algum.', false, 'Extração de materiais, fabricação e descarte geram impacto. Nenhuma fonte é isenta.', 'confundir renovável com sem impacto');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-5', 'B', 'A geração térmica deve ser mantida integralmente, pois é mais estável.', false, 'Estabilidade não anula o custo ambiental das emissões; a solução usual é combinar fontes.', 'escolher um lado ignorando o outro');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-5', 'C', 'A intermitência prova que a energia solar viola a conservação da energia.', false, 'Intermitência decorre da variação da radiação disponível, sem qualquer relação com a conservação da energia.', 'misturar conceitos sem relação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-5', 'D', 'A fonte solar reduz emissões na operação, mas exige planejamento para a intermitência e avaliação dos impactos de todo o ciclo de vida.', true, 'Reconhece o benefício real (baixa emissão na geração) sem ignorar dois pontos concretos: a necessidade de armazenamento ou complementação para a intermitência e os impactos de extração e descarte.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-5', 'E', 'A fonte solar não deve ser adotada, pois sua geração é intermitente.', false, 'Intermitência é um desafio de planejamento — resolvido com armazenamento e complementaridade entre fontes —, não um impedimento.', 'rejeitar por limitação gerenciável');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-ene-rec-1', 'energia-e-transformacoes', 'interpretar-conservacao-consumo-transformacao-energia', 'intro', 'concept', true, 'Em uma lâmpada incandescente, a maior parte da energia elétrica é convertida em:', 'A resposta é A. A incandescente é, na prática, um aquecedor que também ilumina.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-1', 'A', 'Energia mecânica.', false, 'Não há movimento macroscópico associado ao funcionamento.', 'trocar de forma de energia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-1', 'B', 'Energia térmica.', true, 'Cerca de 95% da energia elétrica vira calor no filamento; apenas uma pequena parcela sai como luz visível. Por isso a lâmpada esquenta tanto.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-1', 'C', 'Energia luminosa.', false, 'A parcela convertida em luz é pequena — é justamente por isso que a tecnologia foi substituída.', 'assumir a função como destino principal da energia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-1', 'D', 'Energia química.', false, 'Não há reação química envolvida no funcionamento da lâmpada incandescente.', 'trocar de forma de energia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-1', 'E', 'Energia sonora.', false, 'A conversão em som é desprezível.', 'escolher forma irrelevante');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-ene-rec-2', 'energia-e-transformacoes', 'interpretar-conservacao-consumo-transformacao-energia', 'intermediate', 'applied', true, 'Um aparelho de 800 W permanece ligado 3 horas por dia. Qual é o consumo em 30 dias?', 'A resposta é A. 0,8 × 3 × 30 = 72 kWh.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-2', 'A', '24 kWh', false, 'Corresponde a 1 hora por dia em vez de 3.', 'usar tempo incorreto');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-2', 'B', '800 kWh', false, 'Confunde a potência com o consumo mensal.', 'confundir potência com energia');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-2', 'C', '72 kWh', true, '0,8 kW × 3 h = 2,4 kWh/dia; × 30 = 72 kWh.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-2', 'D', '2,4 kWh', false, 'É o consumo de um dia.', 'não multiplicar pelos dias');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-ene-rec-2', 'E', '720 kWh', false, 'Corresponde a esquecer a conversão de watts para quilowatts em uma das etapas.', 'erro de ordem de grandeza');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-qui-1', 'transformacoes-quimicas', 'identificar-reagentes-produtos-evidencias-proporcoes', 'intro', 'concept', false, 'Considere os processos:

I. Derretimento de um cubo de gelo.
II. Enferrujamento de um portão de ferro exposto à chuva.
III. Dissolução de açúcar em água.

Apresenta(m) transformação química apenas:', 'A resposta é B. Só a ferrugem forma substância nova.', NULL, 'Pergunte se dá para reverter por meio físico simples. Se sim, provavelmente é física.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-1', 'A', 'I e III.', false, 'Ambas são transformações físicas.', 'inverter a classificação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-1', 'B', 'II e III.', false, 'II está correta, mas III é transformação física.', 'incluir a dissolução indevidamente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-1', 'C', 'I.', false, 'O derretimento muda o estado físico; a água continua sendo água.', 'confundir mudança de estado com reação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-1', 'D', 'II.', true, 'A ferrugem é um óxido de ferro — substância nova, com propriedades diferentes do ferro metálico. É a única transformação química da lista.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-1', 'E', 'III.', false, 'A dissolução é física: o açúcar pode ser recuperado por evaporação da água.', 'confundir dissolução com reação');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-qui-2', 'transformacoes-quimicas', 'identificar-reagentes-produtos-evidencias-proporcoes', 'intermediate', 'applied', false, 'Em um experimento, palha de aço é queimada ao ar livre sobre uma balança. Ao final, a massa registrada é maior que a inicial.

A explicação correta é:', 'A resposta é A. Em sistema aberto, incorporar gás aumenta a massa; liberar gás a diminui.', NULL, NULL, 'Lavoisier vale sempre — o que muda é o que está dentro do sistema medido.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-2', 'A', 'A palha de aço absorveu umidade do ar, o que explica todo o ganho.', false, 'A umidade pode ter efeito marginal, mas o ganho característico do experimento decorre da incorporação de oxigênio.', 'escolher causa secundária');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-2', 'B', 'O ferro combinou-se com o oxigênio do ar, e a massa desse oxigênio incorporado explica o aumento.', true, 'A oxidação incorpora oxigênio atmosférico ao sólido. Como o oxigênio veio de fora da balança e passou a fazer parte do produto, a massa registrada aumenta.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-2', 'C', 'Houve criação de matéria durante a combustão.', false, 'Matéria não é criada — isso violaria a conservação da massa.', 'violar a lei de Lavoisier');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-2', 'D', 'O calor liberado tem massa e foi somado ao produto.', false, 'A energia liberada não contribui de forma mensurável para a massa em uma reação química comum.', 'atribuir massa mensurável ao calor');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-2', 'E', 'A balança apresentou defeito, pois toda combustão reduz a massa.', false, 'Combustões que liberam gases reduzem a massa medida; combustões de metais que incorporam oxigênio a aumentam.', 'generalizar a partir de um caso');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-qui-3', 'transformacoes-quimicas', 'identificar-reagentes-produtos-evidencias-proporcoes', 'intermediate', 'interpretation', false, 'A combustão completa do metano é representada por:

CH₄ + 2 O₂ → CO₂ + 2 H₂O

Sobre essa equação, é correto afirmar que:', 'A resposta é A. Coeficientes indicam proporção em mol entre as substâncias.', NULL, 'Ao ler uma equação, traduza mentalmente: "para cada X mol de..., preciso de Y mol de...".', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-3', 'A', 'A água formada é reagente da reação.', false, 'A água aparece à direita da seta: é produto.', 'inverter reagente e produto');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-3', 'B', 'A reação produz mais moléculas do que consome.', false, 'São 3 moléculas de reagentes (1 + 2) e 3 de produtos (1 + 2): o total é igual.', 'não somar os coeficientes');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-3', 'C', 'Cada 1 mol de metano consome 2 mol de gás oxigênio e produz 1 mol de gás carbônico.', true, 'Os coeficientes indicam proporção em quantidade de matéria: 1 CH₄ : 2 O₂ : 1 CO₂ : 2 H₂O.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-3', 'D', 'Cada 1 grama de metano consome 2 gramas de oxigênio.', false, 'Coeficientes expressam mol, não massa. A conversão exige as massas molares de cada substância.', 'ler coeficiente como massa');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-3', 'E', 'A equação não está balanceada, pois há mais átomos à direita.', false, 'Está balanceada: 1 C, 4 H e 4 O de cada lado.', 'contar átomos incorretamente');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-qui-4', 'transformacoes-quimicas', 'identificar-reagentes-produtos-evidencias-proporcoes', 'challenging', 'comparison', false, 'Na reação 2 H₂ + O₂ → 2 H₂O, um estudante dispõe de 6 mol de H₂ e 2 mol de O₂.

A quantidade máxima de água formada e o reagente em excesso são, respectivamente:', 'A resposta é B. O O₂ é o limitante: 2 mol de O₂ → 4 mol de H₂O, sobrando 2 mol de H₂.', 'Método seguro: para cada reagente, calcule quanto de produto ele permitiria formar sozinho. O menor valor é o real, e aquele reagente é o limitante.', NULL, 'A reação para quando o limitante acaba — o excesso permanece sem reagir.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-4', 'A', '4 mol de água, com H₂ em excesso.', true, 'Os 2 mol de O₂ reagem com 4 mol de H₂ e formam 4 mol de H₂O. Sobram 2 mol de H₂, que não têm com o que reagir.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-4', 'B', '2 mol de água, com H₂ em excesso.', false, 'A proporção 2:1 indica que 2 mol de O₂ formam 4 mol de água, não 2.', 'ignorar o coeficiente da água');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-4', 'C', '4 mol de água, com O₂ em excesso.', false, 'A quantidade está correta, mas o O₂ foi totalmente consumido: é o limitante.', 'confundir limitante com excesso');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-4', 'D', '8 mol de água, sem excesso.', false, 'Não há reagente suficiente para essa quantidade, e sobra H₂.', 'somar reagentes sem respeitar a proporção');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-4', 'E', '6 mol de água, com O₂ em excesso.', false, 'Formar 6 mol de água exigiria 3 mol de O₂, mas só há 2 mol. Além disso, o O₂ é o limitante, não o excesso.', 'usar o reagente mais abundante como base');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-qui-5', 'transformacoes-quimicas', 'identificar-reagentes-produtos-evidencias-proporcoes', 'challenging', 'integration', false, 'Uma indústria libera efluente ácido em um curso d''água. Um técnico propõe adicionar carbonato de cálcio ao efluente antes do descarte, monitorando o pH até a faixa neutra.

A avaliação mais adequada da proposta é:', 'A resposta é A. A química funciona; o monitoramento por um único parâmetro é que é insuficiente.', 'Esta questão integra três conteúdos: reação de neutralização com liberação de gás, leitura de evidência experimental (a efervescência) e avaliação ambiental de um tratamento. A alternativa correta sustenta as três.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-5', 'A', 'A proposta é inadequada, pois carbonatos não reagem com ácidos.', false, 'Carbonatos reagem com ácidos produzindo sal, água e gás carbônico — é uma neutralização clássica.', 'negar reação existente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-5', 'B', 'A proposta resolve integralmente o problema ambiental do efluente.', false, 'Corrigir o pH não remove metais, matéria orgânica ou outros contaminantes eventualmente presentes.', 'confundir um parâmetro com o todo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-5', 'C', 'A efervescência observada indicaria falha do processo.', false, 'A efervescência é justamente a evidência de que a reação está ocorrendo, com liberação de CO₂.', 'interpretar evidência de reação como falha');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-5', 'D', 'O pH deveria ser elevado o máximo possível para garantir segurança.', false, 'Efluente muito alcalino também causa dano ambiental: o objetivo é a faixa adequada, não o extremo.', 'supor que mais é sempre melhor');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-5', 'E', 'A neutralização é quimicamente adequada, mas o monitoramento do pH sozinho não garante ausência de outros contaminantes nem controla o gás e os sais gerados.', true, 'Carbonato neutraliza ácido, com liberação de CO₂ e formação de sal. O pH volta à faixa neutra, mas metais dissolvidos e carga de sais permanecem — e não aparecem na medida de pH.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-qui-rec-1', 'transformacoes-quimicas', 'identificar-reagentes-produtos-evidencias-proporcoes', 'intro', 'concept', true, 'A formação de um precipitado ao misturar duas soluções transparentes é indício de:', 'A resposta é A. Precipitado é substância nova — evidência de reação química.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-1', 'A', 'Aumento da temperatura da mistura, sem reação.', false, 'Variação de temperatura é outra evidência possível, mas não explica a formação de sólido.', 'trocar de evidência');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-1', 'B', 'Transformação química, pela formação de uma substância nova insolúvel.', true, 'O sólido que se forma não estava presente antes: é substância nova, evidência de reação química.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-1', 'C', 'Transformação física, semelhante à solidificação.', false, 'Na solidificação a mesma substância muda de estado; aqui surge substância diferente.', 'confundir com mudança de estado');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-1', 'D', 'Evaporação de um dos solventes.', false, 'Evaporação não produz sólido insolúvel de forma imediata na mistura.', 'trocar de fenômeno');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-1', 'E', 'Erro de preparo das soluções.', false, 'A formação de precipitado é resultado esperado em diversas reações.', 'tratar resultado esperado como erro');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-qui-rec-2', 'transformacoes-quimicas', 'identificar-reagentes-produtos-evidencias-proporcoes', 'intermediate', 'applied', true, 'Uma reação ocorre em um frasco hermeticamente fechado, com liberação de gás. Sobre a massa total do sistema ao final:', 'A resposta é A. Sistema fechado: nada entra, nada sai, massa constante.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-2', 'A', 'Aumenta, devido à pressão interna.', false, 'Pressão não altera a massa do conteúdo.', 'confundir pressão com massa');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-2', 'B', 'Diminui pela metade, conforme a proporção da reação.', false, 'Proporções estequiométricas não implicam perda de massa.', 'confundir proporção com perda');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-2', 'C', 'Não pode ser determinada sem conhecer os reagentes.', false, 'A conservação vale independentemente das substâncias envolvidas.', 'exigir dado desnecessário');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-2', 'D', 'Permanece igual à massa inicial, pois nada entrou nem saiu do sistema.', true, 'Em sistema fechado, o gás produzido continua dentro do frasco. A massa total se conserva, conforme a lei de Lavoisier.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-qui-rec-2', 'E', 'Diminui, porque gases têm massa desprezível.', false, 'Gases têm massa, e ela continua sendo contabilizada dentro do frasco fechado.', 'supor que gás não tem massa');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-red-1', 'tese-e-argumentacao', 'formular-tese-e-sustentar-com-argumentos', 'intro', 'concept', false, 'Sobre o tema "Desafios para a permanência de jovens no ensino médio no Brasil", qual das formulações abaixo constitui uma tese adequada para um texto dissertativo-argumentativo?', 'A resposta é B. Tese é posição contestável e delimitada — não anúncio, constatação nem consenso.', NULL, 'Teste da frase contrária: se o oposto da sua tese for absurdo, ela é óbvia demais.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-1', 'A', 'A escola é uma instituição muito importante para a sociedade brasileira.', false, 'É uma obviedade: ninguém discorda e não há o que sustentar ao longo do texto.', 'confundir consenso com tese');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-1', 'B', 'A evasão no ensino médio resulta principalmente da incompatibilidade entre a jornada escolar e a necessidade de trabalho dos estudantes, o que exige políticas de permanência e não apenas de acesso.', true, 'É contestável, delimita a causa apontada e já orienta o tipo de proposta. Alguém poderia defender outra causa principal — e é isso que caracteriza uma tese.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-1', 'C', 'Este texto vai discutir os desafios para a permanência de jovens no ensino médio.', false, 'É um anúncio do que será feito, não uma posição sobre o problema.', 'metatexto no lugar de tese');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-1', 'D', 'Muitos jovens abandonam a escola no Brasil todos os anos.', false, 'É uma constatação factual: descreve o problema sem oferecer explicação nem posição.', 'confundir dado com tese');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-1', 'E', 'Os jovens deveriam valorizar mais a oportunidade de estudar.', false, 'Atribui o problema exclusivamente ao indivíduo, sem sustentação, e desconsidera as condições que produzem a evasão.', 'individualizar problema estrutural');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-red-2', 'tese-e-argumentacao', 'formular-tese-e-sustentar-com-argumentos', 'intermediate', 'applied', false, 'Leia o trecho de um parágrafo de desenvolvimento:

"Como afirmou o filósofo John Locke, os homens nascem livres e iguais. Dessa forma, é evidente que o transporte público precisa melhorar no Brasil."

O problema central desse trecho é:', 'A resposta é A. Repertório sem análise é decoração — a etapa "isso mostra que…" está faltando.', NULL, 'Depois de citar, escreva sempre uma frase que explique o que aquilo prova no seu argumento.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-2', 'A', 'O autor citado é inadequado para textos escolares.', false, 'Locke é repertório legítimo; o problema está no uso, não na escolha.', 'julgar a fonte em vez do uso');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-2', 'B', 'O trecho é longo demais para um parágrafo de desenvolvimento.', false, 'O trecho é curto; a extensão não é o problema.', 'avaliar forma em vez de raciocínio');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-2', 'C', 'Citações filosóficas não devem aparecer em redações.', false, 'Repertório filosófico é bem-vindo quando conectado ao argumento.', 'criar regra inexistente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-2', 'D', 'O trecho apresenta erro gramatical que compromete o sentido.', false, 'Não há erro gramatical: o problema é de construção argumentativa.', 'confundir gramática com argumentação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-2', 'E', 'O repertório é apresentado sem análise que o conecte à afirmação, funcionando como enfeite.', true, 'Falta a etapa que liga a citação ao argumento: nada explica por que a afirmação de Locke sustenta a conclusão sobre transporte público. O salto lógico deixa o repertório improdutivo.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-red-3', 'tese-e-argumentacao', 'formular-tese-e-sustentar-com-argumentos', 'intermediate', 'interpretation', false, 'Analise a proposta de intervenção:

"Portanto, é necessário que o governo invista mais em educação para resolver esse problema."

Essa proposta é insuficiente porque:', 'A resposta é A. Faltam ação, meio, finalidade e detalhamento — só o agente aparece, e de forma vaga.', NULL, NULL, 'Agente, ação, meio, finalidade e detalhamento: os cinco elementos são cumulativos.', 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-3', 'A', 'Investimento em educação nunca resolve problemas sociais.', false, 'A crítica é à falta de especificidade da proposta, não ao mérito do investimento.', 'trocar crítica de forma por juízo de conteúdo');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-3', 'B', 'Apesar de indicar um agente genérico, não especifica ação concreta, meio de execução, finalidade nem detalhamento.', true, '"Investir mais em educação" não diz o que fazer, como fazer, por meio de qual instrumento, para qual público ou com que objetivo verificável. Faltam quatro dos cinco elementos.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-3', 'C', 'Menciona o governo, e propostas não devem envolver o poder público.', false, 'O poder público é agente legítimo e frequente em propostas de intervenção.', 'criar restrição inexistente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-3', 'D', 'Propostas de intervenção são opcionais no texto dissertativo-argumentativo.', false, 'A proposta é parte esperada da conclusão nesse tipo de texto.', 'desconsiderar exigência do gênero');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-3', 'E', 'A proposta deveria vir na introdução, e não na conclusão.', false, 'A conclusão é o lugar usual da proposta, após a argumentação que a justifica.', 'errar a posição estrutural');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-red-4', 'tese-e-argumentacao', 'formular-tese-e-sustentar-com-argumentos', 'challenging', 'comparison', false, 'Um estudante defende a tese de que a principal barreira ao acesso à cultura em cidades médias é a **concentração geográfica** dos equipamentos culturais nos centros urbanos.

Qual proposta de intervenção fecha melhor esse raciocínio?', 'A resposta é A. A proposta é coerente com a barreira defendida e traz os cinco elementos.', 'A proposta bem detalhada porém fora do problema é a mais perigosa: está bem escrita e completa, mas resolve um problema que o texto não levantou. Coerência com a própria tese vale mais que sofisticação isolada.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-4', 'A', 'O Ministério da Educação deve incluir disciplinas de história da arte no currículo nacional para ampliar o repertório dos estudantes.', false, 'É uma proposta bem formulada, mas responde a outro problema — repertório —, não à concentração geográfica defendida na tese.', 'proposta coerente com outro problema');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-4', 'B', 'A população deve valorizar mais os espaços culturais disponíveis em sua cidade.', false, 'Transfere ao indivíduo a solução de uma barreira estrutural e não indica ação, meio nem detalhamento.', 'individualizar solução estrutural');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-4', 'C', 'O governo deve construir um grande centro cultural no centro da cidade, com programação diversificada.', false, 'Reforça exatamente a concentração que a tese aponta como problema.', 'proposta que contradiz a própria tese');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-4', 'D', 'É preciso que haja mais cultura para todos, com apoio de toda a sociedade.', false, 'Formulação genérica, sem nenhum dos cinco elementos.', 'proposta vaga');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-4', 'E', 'A secretaria municipal de cultura deve criar programação itinerante em equipamentos já existentes nos bairros periféricos — escolas e centros comunitários —, por meio de editais com contrapartida de transporte, a fim de aproximar a oferta cultural de quem está distante do centro.', true, 'Responde exatamente à barreira apontada (distância) e traz os cinco elementos: agente, ação, meio, finalidade e detalhamento.', NULL);
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-red-5', 'tese-e-argumentacao', 'formular-tese-e-sustentar-com-argumentos', 'challenging', 'integration', false, 'Um texto defende que o principal obstáculo à saúde mental de adolescentes é a ausência de acolhimento nas escolas. Os dois parágrafos de desenvolvimento tratam, respectivamente, da falta de profissionais especializados nas redes de ensino e da ausência de formação de professores para identificar sinais de sofrimento.

Sobre a estrutura argumentativa desse texto:', 'A resposta é A. Os dois parágrafos atacam ângulos diferentes da mesma tese — isso é progressão.', 'Esta questão integra três pontos: clareza da tese, progressão entre desenvolvimentos e coerência interna. O critério de progressão não é mudar de assunto, e sim mudar de ângulo sobre o mesmo problema.', NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-5', 'A', 'Faltaria um terceiro parágrafo de desenvolvimento para que o texto fosse válido.', false, 'Dois desenvolvimentos bem construídos são estrutura adequada e usual.', 'criar exigência formal inexistente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-5', 'B', 'O texto deveria abandonar a tese inicial e tratar de outros fatores de saúde mental.', false, 'Delimitar é qualidade do texto dissertativo; abandonar a tese quebraria a coerência.', 'confundir delimitação com limitação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-5', 'C', 'Há progressão adequada: os dois parágrafos abordam ângulos distintos da mesma tese — recurso especializado e capacitação —, sustentando o obstáculo apontado.', true, 'Ambos tratam da mesma tese (ausência de acolhimento escolar), mas por caminhos diferentes: um trata da existência de profissionais, outro da preparação de quem já está lá. Isso é progressão, não repetição.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-5', 'D', 'Os parágrafos são redundantes, pois ambos tratam de pessoal escolar.', false, 'Tratar do mesmo campo não é redundância: contratar especialistas e formar professores são medidas distintas, com custos e efeitos diferentes.', 'confundir tema comum com repetição');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-5', 'E', 'A tese está incorreta, pois saúde mental é responsabilidade exclusiva da família.', false, 'A avaliação pedida é da estrutura argumentativa, e a tese é legítima e defensável.', 'substituir análise por opinião sobre o mérito');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-red-rec-1', 'tese-e-argumentacao', 'formular-tese-e-sustentar-com-argumentos', 'intro', 'concept', true, 'Em um texto dissertativo-argumentativo, a função do parágrafo de introdução é:', 'A resposta é A. Introdução: problema + tese.', NULL, NULL, NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-1', 'A', 'Apresentar a proposta de intervenção.', false, 'A proposta pertence à conclusão, após a argumentação que a justifica.', 'antecipar a conclusão');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-1', 'B', 'Listar todas as fontes que serão citadas.', false, 'O gênero não exige lista de fontes.', 'aplicar convenção de outro gênero');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-1', 'C', 'Resumir o texto motivador da prova.', false, 'Copiar ou resumir o texto motivador não constrói tese própria.', 'depender do texto motivador');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-1', 'D', 'Apresentar o problema e explicitar a tese que será defendida.', true, 'A introdução situa o leitor no problema e deixa claro qual posição o texto vai sustentar.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-1', 'E', 'Desenvolver integralmente o primeiro argumento.', false, 'O desenvolvimento dos argumentos ocorre nos parágrafos seguintes.', 'confundir com o desenvolvimento');
INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES ('q-red-rec-2', 'tese-e-argumentacao', 'formular-tese-e-sustentar-com-argumentos', 'intermediate', 'applied', true, 'Qual elemento está ausente na proposta: "As escolas devem promover rodas de conversa mensais sobre saúde mental, com apoio de psicólogos da rede pública"?', 'A resposta é A. Falta a finalidade: para que a ação existe.', NULL, 'Confira os cinco na ordem: quem, o quê, como, para quê, com que recorte.', NULL, 'AUTORAL_SEED', 'Conteúdo autoral de desenvolvimento — Conscious Knowledge');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-2', 'A', 'A finalidade — não se explicita o objetivo que a ação pretende alcançar.', true, 'Agente (escolas), ação (rodas de conversa), meio (apoio de psicólogos) e detalhamento (mensais) estão presentes. Falta dizer para quê: reduzir evasão, ampliar identificação precoce de sofrimento, criar canal de escuta.', NULL);
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-2', 'B', 'O agente — não há responsável indicado.', false, 'As escolas são indicadas como agente.', 'não localizar o agente');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-2', 'C', 'A ação — não se sabe o que fazer.', false, 'A ação é promover rodas de conversa.', 'não localizar a ação');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-2', 'D', 'O meio — não se indica como executar.', false, 'O meio é o apoio de psicólogos da rede pública.', 'não localizar o meio');
INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES ('q-red-rec-2', 'E', 'Nenhum elemento está ausente.', false, 'A finalidade não aparece de forma explícita.', 'não conferir os cinco elementos');

-- Métodos de estudo
INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES ('estudo-ativo', 'Estudo ativo', 'Tentar responder antes de ver a solução.', 'Antes de ler a explicação, você tenta resolver ou explicar por conta própria. O esforço de tentar — mesmo errando — prepara o cérebro para aproveitar melhor a correção.', 'Quando você já teve algum contato com o tema. Funciona mal como primeiro contato com um assunto totalmente novo.', '["Leia o enunciado ou a pergunta com atenção.","Escreva o que você acha, mesmo incompleto.","Só então veja a explicação.","Marque a diferença entre o que você escreveu e o que era esperado."]'::jsonb, 'Antes de ler o resumo sobre porcentagem, tente responder: "de 80 para 100, o aumento é de quantos por cento?". Depois compare com a explicação.', 'Frustra quem não tem nenhuma base no assunto. Se você não faz ideia por onde começar, leia uma explicação curta antes de tentar.', 20, '["porcentagem-e-variacao","interpretacao-e-inferencia","funcoes-e-relacoes"]'::jsonb, 1);
INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES ('recuperacao', 'Recuperação (lembrar sem consultar)', 'Resgatar a informação da memória em vez de reler.', 'Você fecha o material e tenta lembrar. O ato de recuperar fortalece a memória muito mais que reler — reler cria a sensação de saber sem criar a capacidade de lembrar.', 'Depois de já ter estudado o conteúdo pelo menos uma vez.', '["Feche o resumo.","Escreva ou fale tudo o que lembrar do tema.","Abra o material e marque o que faltou.","Repita só a parte que faltou, depois de algumas horas."]'::jsonb, 'Depois de estudar ecologia, feche o material e escreva a diferença entre fluxo de energia e ciclagem de matéria. Só então confira.', 'Pode gerar desconforto no começo, porque expõe o que você não sabe. Esse desconforto é parte do processo, mas não deve virar desânimo: comece por trechos curtos.', 10, '["ecologia-e-ciclos","cidadania-e-direitos","transformacoes-quimicas"]'::jsonb, 2);
INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES ('revisao-espacada', 'Revisão espaçada', 'O conteúdo volta em intervalos crescentes, com questões diferentes.', 'Em vez de revisar tudo de uma vez, o mesmo conteúdo retorna depois de 1, 3, 7, 14 e 30 dias. Cada retorno é feito com um item diferente, para evitar que você decore o enunciado no lugar do conceito.', 'Sempre que houver um intervalo longo até a prova. É o método que mais protege contra o esquecimento.', '["Estude o conteúdo pela primeira vez.","Revise no dia seguinte.","Aumente o intervalo a cada revisão bem-sucedida.","Ao errar, volte ao intervalo inicial."]'::jsonb, 'Você estudou funções na segunda. A plataforma traz uma questão nova de funções na terça, na sexta e duas semanas depois.', 'Exige constância ao longo de semanas. Não substitui o primeiro entendimento: revisar algo que você nunca compreendeu apenas repete a confusão.', 15, '["funcoes-e-relacoes","energia-e-transformacoes","urbanizacao-e-desigualdade"]'::jsonb, 3);
INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES ('pratica-intercalada', 'Prática intercalada', 'Alternar tópicos relacionados em vez de repetir o mesmo em bloco.', 'Em vez de dez questões seguidas do mesmo assunto, a sessão mistura tópicos relacionados. Isso obriga você a decidir qual estratégia usar — que é exatamente o que a prova cobra.', 'Quando você já acerta questões isoladas de um tópico, mas erra quando ele aparece misturado.', '["Escolha dois ou três tópicos relacionados.","Alterne as questões entre eles.","Antes de resolver, identifique de qual tópico é a questão.","Registre os casos em que você identificou errado."]'::jsonb, 'Alternar questões de porcentagem, leitura de gráficos e funções em uma mesma sessão de 30 minutos.', 'Parece mais difícil e produz mais erros no curto prazo que a prática em bloco. Isso é esperado — mas pode desanimar quem está começando um tópico agora.', 30, '["porcentagem-e-variacao","leitura-de-graficos-e-tabelas","funcoes-e-relacoes"]'::jsonb, 4);
INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES ('caderno-de-erros', 'Caderno de erros', 'Registrar o motivo do erro e transformá-lo em uma próxima ação.', 'Cada erro vira um registro com o motivo (não sabia, não entendi o enunciado, errei a conta, faltou atenção) e uma ação: revisar o conceito, resolver questão semelhante ou refazer depois.', 'Sempre. É o método que transforma erro em informação útil.', '["Ao errar, registre o motivo antes de ver a explicação completa.","Escreva com suas palavras o que faltou.","Escolha a ação: conceito, questão semelhante ou refazer depois.","Volte ao registro depois de alguns dias."]'::jsonb, 'Você errou uma questão de variação percentual por usar o valor final como base. O registro vira: "conferir sempre de onde eu saí antes de dividir".', 'Vira lista morta se você só anotar e nunca voltar. O valor está na ação seguinte, não no registro.', 10, '[]'::jsonb, 5);
INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES ('explicacao-com-as-proprias-palavras', 'Explicação com as próprias palavras', 'Escrever uma explicação curta antes de conferir a oficial.', 'Você escreve, em duas ou três frases, como explicaria o conceito para alguém. Onde a explicação trava é exatamente onde a compreensão falha.', 'Depois de ler a explicação de um tópico, antes de partir para as questões.', '["Escolha um conceito do tópico.","Escreva a explicação sem consultar o material.","Compare com a explicação oficial.","Marque os pontos em que você travou."]'::jsonb, 'Explicar por que a eutrofização mata peixes sem usar a palavra "poluição" — o exercício obriga a descrever o mecanismo.', 'Exige escrever, o que consome tempo. Em sessões muito curtas, use apenas para o conceito central da sessão.', 10, '["ecologia-e-ciclos","tese-e-argumentacao","meio-ambiente-e-sociedade"]'::jsonb, 6);
INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES ('sessao-de-foco-curto', 'Sessão de foco curto', 'Um bloco de 10 a 20 minutos com um único objetivo.', 'Você define um objetivo único e trabalha só nele por um tempo curto e determinado. Sem trocar de assunto, sem abrir outra coisa.', 'Quando o tempo é escasso ou quando começar é a parte mais difícil.', '["Escolha um objetivo único e específico.","Defina o tempo antes de começar.","Deixe o material pronto antes de iniciar a contagem.","Ao terminar, anote onde parou."]'::jsonb, '15 minutos apenas para resolver três questões de interpretação e registrar o motivo de cada erro.', 'Não é suficiente para conteúdos que exigem construção longa, como uma redação completa. Nesses casos, use blocos curtos para etapas (planejar, escrever, revisar).', 15, '[]'::jsonb, 7);
INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES ('simulado-com-analise', 'Simulado com análise', 'Conjunto cronometrado seguido da interpretação dos erros e do tempo.', 'A parte que ensina não é o simulado: é a análise depois dele. Você examina onde errou, quanto tempo gastou por questão e que padrão apareceu.', 'Quando você já tem base nos conteúdos e precisa treinar estratégia, ritmo e resistência.', '["Resolva o conjunto sem interromper, respeitando o tempo.","Só depois confira o gabarito.","Classifique cada erro por motivo.","Separe o que foi falta de conteúdo do que foi falta de estratégia."]'::jsonb, 'Depois de um simulado por área, você descobre que 4 dos 6 erros foram por tempo, não por desconhecimento. A ação passa a ser treino de ritmo.', 'Simulado sem análise é apenas cansaço. E aplicar simulados com frequência alta, sem tempo de estudar entre eles, mede sem ensinar.', 60, '[]'::jsonb, 8);

-- Simulados (antes das sessões prontas: nada depende, mas mantém a leitura em ordem)
INSERT INTO simulations (slug, title, description, kind, area_slug, question_count, minutes, blueprint) VALUES ('simulado-linguagens', 'Simulado curto de Linguagens', 'Dez questões de interpretação, gêneros textuais e argumentação, com dificuldade equilibrada.', 'area', 'linguagens', 10, 25, '{"areas":{"linguagens":10},"difficulty":{"intro":3,"intermediate":5,"challenging":2},"topics":{"interpretacao-e-inferencia":4,"generos-textuais-e-funcao-social":4,"tese-e-argumentacao":2}}'::jsonb);
INSERT INTO simulations (slug, title, description, kind, area_slug, question_count, minutes, blueprint) VALUES ('simulado-matematica', 'Simulado curto de Matemática', 'Dez questões de porcentagem, leitura de dados e funções.', 'area', 'matematica', 10, 30, '{"areas":{"matematica":10},"difficulty":{"intro":3,"intermediate":5,"challenging":2},"topics":{"porcentagem-e-variacao":4,"leitura-de-graficos-e-tabelas":3,"funcoes-e-relacoes":3}}'::jsonb);
INSERT INTO simulations (slug, title, description, kind, area_slug, question_count, minutes, blueprint) VALUES ('simulado-humanas', 'Simulado curto de Ciências Humanas', 'Dez questões de cidadania, urbanização e meio ambiente.', 'area', 'ciencias-humanas', 10, 25, '{"areas":{"ciencias-humanas":10},"difficulty":{"intro":3,"intermediate":5,"challenging":2},"topics":{"cidadania-e-direitos":4,"urbanizacao-e-desigualdade":3,"meio-ambiente-e-sociedade":3}}'::jsonb);
INSERT INTO simulations (slug, title, description, kind, area_slug, question_count, minutes, blueprint) VALUES ('simulado-natureza', 'Simulado curto de Ciências da Natureza', 'Dez questões de ecologia, energia e transformações químicas.', 'area', 'ciencias-natureza', 10, 30, '{"areas":{"ciencias-natureza":10},"difficulty":{"intro":3,"intermediate":5,"challenging":2},"topics":{"ecologia-e-ciclos":4,"energia-e-transformacoes":3,"transformacoes-quimicas":3}}'::jsonb);
INSERT INTO simulations (slug, title, description, kind, area_slug, question_count, minutes, blueprint) VALUES ('simulado-diagnostico-geral', 'Diagnóstico geral', 'Vinte questões distribuídas entre as quatro áreas, para um primeiro mapa do seu desempenho.', 'diagnostic', NULL, 20, 50, '{"areas":{"linguagens":5,"matematica":5,"ciencias-humanas":5,"ciencias-natureza":5},"difficulty":{"intro":8,"intermediate":8,"challenging":4}}'::jsonb);

-- Sessões prontas
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('comece-por-interpretacao', 'Comece por interpretação', 'Diferenciar o que o texto diz do que ele apenas sugere.', 'Leia o resumo do tópico e resolva três questões. Em cada uma, tente apontar a passagem que sustenta sua resposta antes de marcar.', 15, 'learning', 'learn', '{"topicSlugs":["interpretacao-e-inferencia"],"count":3,"includeContent":true}'::jsonb, 'all_items', 'generos-textuais-e-funcao-social', 1);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('matematica-no-cotidiano', 'Matemática no cotidiano', 'Resolver situações de aumento, desconto e variação percentual.', 'Leia o resumo e resolva duas questões aplicadas. Use fator multiplicativo em vez de calcular a parte e somar.', 20, 'learning', 'practice', '{"topicSlugs":["porcentagem-e-variacao"],"count":4,"includeContent":true}'::jsonb, 'all_items', 'leitura-de-graficos-e-tabelas', 2);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('leitura-de-dados', 'Leitura de dados', 'Extrair e comparar informações de gráficos e tabelas.', 'Antes de olhar a forma do gráfico, leia título, unidade e eixo. Só então compare.', 20, 'learning', 'practice', '{"topicSlugs":["leitura-de-graficos-e-tabelas"],"count":4,"includeContent":true}'::jsonb, 'all_items', 'funcoes-e-relacoes', 3);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('ecologia-essencial', 'Ecologia essencial', 'Relacionar energia, matéria e impactos em cadeias e ciclos.', 'Leia a explicação, faça o exercício de autoexplicação e resolva as questões. Preste atenção na diferença entre o que flui e o que cicla.', 25, 'learning', 'learn', '{"topicSlugs":["ecologia-e-ciclos"],"count":5,"includeContent":true}'::jsonb, 'all_items', 'energia-e-transformacoes', 4);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('humanas-em-contexto', 'Humanas em contexto', 'Aplicar conceitos de cidadania e sociedade a situações concretas.', 'Em cada questão, identifique primeiro qual direito está em jogo e quem é o responsável por garanti-lo.', 25, 'learning', 'practice', '{"topicSlugs":["cidadania-e-direitos","urbanizacao-e-desigualdade"],"count":5}'::jsonb, 'all_items', 'meio-ambiente-e-sociedade', 5);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('revisao-dos-meus-erros', 'Revisão dos meus erros', 'Retomar o que você errou, com questões diferentes das originais.', 'Antes de cada questão, diga se você não lembra, lembra parcialmente ou domina. Depois compare com o resultado.', 10, 'learning', 'review', '{"source":"review_queue","count":3,"requireFreshItem":true}'::jsonb, 'all_items', 'plano-da-semana', 6);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('sessao-para-quem-tem-pouco-tempo', 'Sessão para quem tem pouco tempo', 'Avançar de verdade em 10 minutos.', 'Uma explicação curta e duas questões adaptadas ao seu histórico. Se precisar sair, o progresso fica salvo.', 10, 'learning', 'practice', '{"source":"recommendation","count":2,"includeContent":"quick_summary"}'::jsonb, 'all_items', 'revisao-dos-meus-erros', 7);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('pratica-sem-gabarito-imediato', 'Prática sem gabarito imediato', 'Treinar a resolução sem apoio da correção a cada questão.', 'Você verá o resultado apenas ao final. Marque as questões em que ficou em dúvida — elas entram na revisão.', 30, 'exam', 'practice', '{"source":"recommendation","count":8,"mixAreas":true}'::jsonb, 'submit_at_end', 'revisao-dos-meus-erros', 8);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('diagnostico-leve', 'Diagnóstico leve', 'Ter um primeiro mapa de onde você está, sem cobrar tudo.', 'Questões distribuídas entre as quatro áreas. Não é prova: é só um ponto de partida. Você pode pular o que não souber.', 20, 'learning', 'diagnostic', '{"source":"diagnostic","count":8,"perArea":2,"allowSkip":true}'::jsonb, 'all_items', 'plano-da-semana', 9);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('preparacao-para-simulado', 'Preparação para simulado', 'Treinar estratégia de leitura, marcação e controle de tempo.', 'Antes das questões, leia as orientações de estratégia. Marque o horário de início de cada item.', 15, 'learning', 'learn', '{"source":"strategy","count":3,"includeContent":true}'::jsonb, 'all_items', 'simulado-diagnostico-geral', 10);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('tese-e-argumento', 'Tese e argumento', 'Formular uma tese defensável e sustentá-la.', 'Leia a explicação, escreva sua tese para o tema proposto e resolva as questões sobre argumentação.', 25, 'learning', 'learn', '{"topicSlugs":["tese-e-argumentacao"],"count":4,"includeContent":true}'::jsonb, 'all_items', 'redacao', 11);
INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES ('revisao-intercalada', 'Revisão intercalada', 'Praticar habilidades relacionadas de matérias diferentes na mesma sessão.', 'As questões alternam entre três matérias. Antes de resolver, identifique de qual tópico é cada uma.', 30, 'learning', 'review', '{"source":"interleaved","count":9,"subjects":3}'::jsonb, 'all_items', 'pratica-sem-gabarito-imediato', 12);

-- Temas de redação
INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES ('acesso-digital-e-direitos', 'Acesso digital e exercício de direitos no Brasil', 'Tecnologia e cidadania', 'A migração de serviços públicos para plataformas digitais e seus efeitos sobre quem tem acesso limitado à conexão.', '[{"title":"Texto I","body":"Agendar uma consulta, matricular uma criança na escola, solicitar um benefício ou consultar o resultado de um exame são hoje, em grande parte dos municípios, tarefas realizadas por aplicativo ou site. A digitalização reduziu filas e custos administrativos. Ao mesmo tempo, deslocou para o cidadão a exigência de conexão estável, aparelho adequado e familiaridade com a interface.","source":"Texto autoral produzido para este material."},{"title":"Texto II","body":"Ter internet no celular não é o mesmo que ter acesso pleno. Planos limitados priorizam aplicativos de mensagem e deixam de fora portais que exigem download de documentos, upload de fotos ou preenchimento de formulários longos. A conexão existe, mas não alcança o que seria necessário.","source":"Texto autoral produzido para este material."}]'::jsonb, 'A partir da leitura dos textos motivadores e com base nos seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema "Acesso digital e exercício de direitos no Brasil", apresentando proposta de intervenção que respeite os direitos humanos.', '["Qual é, na sua leitura, a principal barreira: a ausência de conexão, a qualidade dela ou a forma como os serviços foram desenhados?","Quem é mais atingido por essa barreira, e por quê?","O que aconteceria se nada mudasse nos próximos cinco anos?"]'::jsonb, '["Princípio da universalidade no acesso a serviços públicos","Diferença entre acesso formal e acesso efetivo a um direito","Desenho de serviço público e o custo transferido ao usuário","Conceito de exclusão digital como dimensão da desigualdade social"]'::jsonb, '["Minha tese aponta uma causa específica, não uma obviedade?","Cada parágrafo de desenvolvimento traz um ângulo diferente?","Depois de cada repertório, expliquei o que ele prova?","Evitei atribuir o problema apenas ao comportamento individual?"]'::jsonb, '["A tese aparece com clareza na introdução?","A proposta responde ao problema que EU levantei?","A proposta tem agente, ação, meio, finalidade e detalhamento?","Não há trecho copiado dos textos motivadores?","A conclusão retoma a tese sem apenas repeti-la?"]'::jsonb);
INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES ('saude-mental-na-escola', 'Cuidado com a saúde mental de adolescentes no ambiente escolar', 'Saúde e educação', 'O papel da escola no acolhimento e na identificação precoce do sofrimento psíquico.', '[{"title":"Texto I","body":"A escola é o espaço onde o adolescente passa mais tempo fora de casa. É também onde mudanças de comportamento, queda de rendimento e afastamento de colegas aparecem primeiro. Reconhecer esses sinais, porém, exige preparo que raramente faz parte da formação docente.","source":"Texto autoral produzido para este material."},{"title":"Texto II","body":"Falar de saúde mental na escola não significa transformar professores em terapeutas. Significa criar canais de escuta, reduzir o estigma e saber para onde encaminhar. A ausência desses canais faz com que o sofrimento apareça tarde, quando já afetou aprendizagem e permanência.","source":"Texto autoral produzido para este material."}]'::jsonb, 'Redija um texto dissertativo-argumentativo sobre "Cuidado com a saúde mental de adolescentes no ambiente escolar", com proposta de intervenção que respeite os direitos humanos.', '["O principal obstáculo é a falta de profissionais, de formação, de canais ou de reconhecimento do problema?","Que papel a escola pode assumir sem substituir o cuidado especializado?","Como evitar que a proposta transfira responsabilidade clínica ao professor?"]'::jsonb, '["A escola como espaço de convivência e observação cotidiana","Diferença entre acolhimento e tratamento clínico","Rede de atenção psicossocial e o papel do encaminhamento","Estigma como barreira à busca de ajuda"]'::jsonb, '["Evitei linguagem clínica ou diagnóstico no meu texto?","Minha tese delimita qual aspecto do problema vou defender?","Meus argumentos tratam de dimensões distintas?","Reconheci os limites do que a escola pode fazer?"]'::jsonb, '["A proposta define claramente quem faz e como?","A proposta respeita o limite entre acolhimento e tratamento?","A conclusão fecha o raciocínio dos desenvolvimentos?","Revisei concordância e pontuação?"]'::jsonb);
INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES ('desperdicio-de-alimentos', 'Caminhos para reduzir o desperdício de alimentos no Brasil', 'Meio ambiente e sociedade', 'Perdas ao longo da cadeia produtiva e o alcance limitado das campanhas de conscientização.', '[{"title":"Texto I","body":"Parte relevante do alimento produzido no país não chega à mesa. As perdas se distribuem entre colheita, transporte, armazenamento, distribuição e consumo — e a etapa em que ocorrem determina o tipo de solução necessária.","source":"Texto autoral produzido para este material."},{"title":"Texto II","body":"Campanhas que orientam o consumidor a aproveitar melhor os alimentos têm efeito real, mas limitado: elas atuam sobre a última etapa de uma cadeia longa. Quando a perda ocorre antes, por falta de refrigeração ou estrada adequada, nenhuma escolha do consumidor a evita.","source":"Texto autoral produzido para este material."}]'::jsonb, 'Redija um texto dissertativo-argumentativo sobre "Caminhos para reduzir o desperdício de alimentos no Brasil", com proposta de intervenção que respeite os direitos humanos.', '["Em que etapa da cadeia você concentra sua tese?","Que tipo de política corresponde à etapa que você escolheu?","Como relacionar desperdício e insegurança alimentar sem simplificar?"]'::jsonb, '["Cadeia produtiva de alimentos e pontos de perda","Infraestrutura logística e conservação","Bancos de alimentos e redistribuição de excedentes","Insegurança alimentar como problema de acesso, não apenas de produção"]'::jsonb, '["Minha tese delimita onde está o gargalo?","Evitei tratar o consumidor como único responsável?","Meus dois desenvolvimentos tratam de etapas ou dimensões diferentes?"]'::jsonb, '["A proposta atua na etapa que eu apontei como principal?","A proposta tem os cinco elementos?","Usei conectivos que marcam a progressão do raciocínio?"]'::jsonb);
INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES ('trabalho-por-aplicativo', 'Desafios da regulamentação do trabalho por aplicativo no Brasil', 'Trabalho e direitos', 'Autonomia declarada, dependência real e proteção social de trabalhadores de plataforma.', '[{"title":"Texto I","body":"O trabalho intermediado por plataformas digitais cresceu como alternativa de renda rápida e horário flexível. A flexibilidade, contudo, convive com definição de preços, avaliação de desempenho e possibilidade de desligamento decididos pela plataforma.","source":"Texto autoral produzido para este material."},{"title":"Texto II","body":"A discussão sobre proteção social desses trabalhadores atravessa aposentadoria, afastamento por doença, seguro em caso de acidente e custos de manutenção do próprio equipamento de trabalho — itens que, no emprego formal, não recaem integralmente sobre quem trabalha.","source":"Texto autoral produzido para este material."}]'::jsonb, 'Redija um texto dissertativo-argumentativo sobre "Desafios da regulamentação do trabalho por aplicativo no Brasil", com proposta de intervenção que respeite os direitos humanos.', '["A flexibilidade declarada corresponde à autonomia real? Em que medida?","Que proteções são mais urgentes na sua leitura?","Como propor regulação sem eliminar a fonte de renda?"]'::jsonb, '["Diferença entre autonomia formal e dependência econômica","Proteção social e financiamento da previdência","Assimetria de informação entre plataforma e trabalhador","Experiências internacionais de classificação intermediária"]'::jsonb, '["Reconheci as duas faces do problema, sem caricaturar nenhuma?","Minha tese assume uma posição clara?","Meus argumentos vão além da constatação de que \"falta regulamentação\"?"]'::jsonb, '["A proposta indica o instrumento concreto de regulação?","Considerei o efeito da proposta sobre quem depende dessa renda?","A linguagem está adequada à modalidade formal?"]'::jsonb);
INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES ('permanencia-no-ensino-medio', 'Estratégias para a permanência de jovens no ensino médio', 'Educação', 'A tensão entre jornada escolar e necessidade de trabalho ou cuidado familiar.', '[{"title":"Texto I","body":"Garantir a matrícula é diferente de garantir a conclusão. A saída da escola raramente é uma decisão súbita: ela costuma ser precedida por faltas, reprovação e afastamento progressivo, muitas vezes ligados à necessidade de renda ou de cuidado de familiares.","source":"Texto autoral produzido para este material."},{"title":"Texto II","body":"Políticas de permanência combinam apoio financeiro, flexibilidade de horário, transporte, alimentação e acompanhamento pedagógico. Cada uma responde a uma barreira diferente — e aplicar a errada não resolve o problema apontado.","source":"Texto autoral produzido para este material."}]'::jsonb, 'Redija um texto dissertativo-argumentativo sobre "Estratégias para a permanência de jovens no ensino médio", com proposta de intervenção que respeite os direitos humanos.', '["Qual barreira você elege como principal?","Sua proposta corresponde exatamente a essa barreira?","Como evitar culpabilizar o estudante pela evasão?"]'::jsonb, '["Diferença entre acesso e permanência","Trabalho juvenil e conciliação com o estudo","Trabalho de cuidado e sua distribuição desigual","Programas de apoio à permanência escolar"]'::jsonb, '["Minha tese aponta causa específica?","Evitei o argumento de \"falta de interesse dos jovens\"?","Os desenvolvimentos tratam de dimensões diferentes?"]'::jsonb, '["A proposta é executável e detalhada?","Ela responde à barreira que eu defendi?","A conclusão avança em relação à introdução?"]'::jsonb);
INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES ('mobilidade-urbana', 'Mobilidade urbana e desigualdade nas cidades brasileiras', 'Cidades e território', 'O tempo de deslocamento como forma de desigualdade e o desenho do transporte público.', '[{"title":"Texto I","body":"Quem mora longe do trabalho paga duas vezes: em dinheiro, com a passagem, e em tempo, com horas subtraídas de descanso, estudo e convívio. Esse custo raramente aparece nas estatísticas de renda, mas define a qualidade de vida.","source":"Texto autoral produzido para este material."},{"title":"Texto II","body":"Sistemas de transporte desenhados apenas para levar trabalhadores ao centro pela manhã e trazê-los de volta à noite atendem mal quem precisa se deslocar entre bairros, em horários variados ou acompanhado de crianças.","source":"Texto autoral produzido para este material."}]'::jsonb, 'Redija um texto dissertativo-argumentativo sobre "Mobilidade urbana e desigualdade nas cidades brasileiras", com proposta de intervenção que respeite os direitos humanos.', '["O problema central é custo, tempo, cobertura ou desenho da rede?","Quem é mais afetado pelo desenho atual?","Que instrumento poderia alterar isso?"]'::jsonb, '["Direito à cidade e acesso a oportunidades","Periferização e distância entre moradia e trabalho","Financiamento e tarifa do transporte público","Mobilidade e trabalho de cuidado"]'::jsonb, '["Tratei o tempo como um custo real, não apenas como inconveniente?","Minha tese delimita o aspecto que vou defender?","Evitei propor apenas \"mais ônibus\"?"]'::jsonb, '["A proposta indica agente e meio concretos?","Considerei quem seria beneficiado e quem arcaria com o custo?","O texto está dentro da modalidade formal?"]'::jsonb);
INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES ('valorizacao-da-cultura-local', 'Valorização das manifestações culturais locais no Brasil', 'Cultura', 'Circulação, financiamento e reconhecimento de expressões culturais fora dos grandes centros.', '[{"title":"Texto I","body":"Festas, ofícios, músicas e formas de fazer que estruturam a vida de comunidades inteiras raramente alcançam os circuitos que definem o que é reconhecido como cultura. O reconhecimento influencia financiamento, registro e transmissão às gerações seguintes.","source":"Texto autoral produzido para este material."},{"title":"Texto II","body":"Valorizar uma manifestação cultural não é congelá-la. Práticas vivas mudam, incorporam elementos novos e são recriadas por quem as pratica. Políticas que tratam cultura como peça de museu podem sufocar justamente o que pretendiam preservar.","source":"Texto autoral produzido para este material."}]'::jsonb, 'Redija um texto dissertativo-argumentativo sobre "Valorização das manifestações culturais locais no Brasil", com proposta de intervenção que respeite os direitos humanos.', '["O obstáculo principal é financiamento, circulação, registro ou reconhecimento?","Como valorizar sem congelar a prática?","Quem deve ter voz na definição do que é valorizado?"]'::jsonb, '["Patrimônio cultural material e imaterial","Concentração dos equipamentos culturais nos centros urbanos","Transmissão intergeracional de saberes","Editais e mecanismos de fomento à cultura"]'::jsonb, '["Evitei tratar cultura popular como algo do passado?","Minha tese assume posição sobre o obstáculo principal?","Considerei a participação das próprias comunidades?"]'::jsonb, '["A proposta prevê participação de quem pratica a manifestação?","Os cinco elementos da proposta estão presentes?","A conclusão retoma e avança em relação à tese?"]'::jsonb);
INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES ('desinformacao-e-saude-publica', 'Enfrentamento da desinformação em temas de saúde pública', 'Comunicação e saúde', 'Circulação de informação incorreta e seus efeitos sobre decisões de saúde coletiva.', '[{"title":"Texto I","body":"A informação incorreta sobre saúde circula com vantagem: costuma ser mais simples, mais emocional e mais fácil de compartilhar que a informação técnica, que precisa de ressalvas, dados e contexto.","source":"Texto autoral produzido para este material."},{"title":"Texto II","body":"Combater desinformação apenas com correção posterior tem alcance limitado: a correção raramente atinge todos os que viram a versão inicial. Estratégias preventivas envolvem comunicação clara e antecipada, vínculo com profissionais de referência e presença nos mesmos canais em que a informação circula.","source":"Texto autoral produzido para este material."}]'::jsonb, 'Redija um texto dissertativo-argumentativo sobre "Enfrentamento da desinformação em temas de saúde pública", com proposta de intervenção que respeite os direitos humanos.', '["O problema é a produção, a circulação ou a ausência de alternativa confiável?","Como enfrentar a desinformação sem propor censura?","Que papel têm profissionais de saúde locais nesse processo?"]'::jsonb, '["Confiança institucional e vínculo com o profissional de referência","Assimetria entre a velocidade da desinformação e a da correção","Educação midiática e leitura crítica de fontes","Comunicação pública em linguagem acessível"]'::jsonb, '["Minha proposta respeita a liberdade de expressão?","Evitei tratar quem foi enganado como culpado?","Meus argumentos abordam causas diferentes?"]'::jsonb, '["A proposta é preventiva ou apenas corretiva?","Ela indica agente, meio e finalidade?","O texto mantém a modalidade formal do início ao fim?"]'::jsonb);

COMMIT;

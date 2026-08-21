# ONBOARDING_SPEC.md — Dynamic CK

Especificação de produto do onboarding, exigida como **primeira tarefa obrigatória** (§16.2)
e detalhada pelas seções 4.1 e 19 do prompt mestre.
Esta é a fonte de verdade do código: `src/lib/onboarding/questionnaire.ts` e
`src/lib/profile/engine.ts` implementam exatamente o que está aqui.

Versão do questionário: **`v1`** (gravada em cada `OnboardingResponse` e `ProfileConfirmation`).

---

## 1. Princípios

1. O perfil é **hipótese de trabalho**, não rótulo, diagnóstico ou medida de inteligência.
2. Nada é obrigatório além do mínimo necessário para montar a primeira sessão.
3. Tudo é **retomável**, **editável** e **reversível**.
4. Nenhum conteúdo é bloqueado por perfil.
5. Nenhum termo clínico. Nenhuma conclusão sobre transtorno, deficiência ou condição emocional.
6. Respostas declaradas ficam **separadas** das evidências observadas no uso.

Mensagem obrigatória exibida **antes** da primeira pergunta:

> "Vamos entender como você estuda hoje para montar uma experiência que combine melhor com
> sua rotina. Seu perfil não é uma etiqueta fixa: ele pode mudar conforme você pratica."

---

## 2. Telas e fluxo

| Ordem | Tela | Rota | Obrigatória | Pode pular |
| --- | --- | --- | --- | --- |
| 0 | Boas-vindas + explicação do perfil | `/onboarding` | sim | — |
| 1 | Etapa A — Contexto | `/onboarding/contexto` | sim | não |
| 2 | Etapa B — Objetivo e motivação | `/onboarding/objetivo` | não | sim |
| 3 | Etapa C — Disponibilidade real | `/onboarding/rotina` | sim | não |
| 4 | Etapa D — Autonomia e organização | `/onboarding/autonomia` | sim | não |
| 5 | Etapa E — Preferência de estudo | `/onboarding/preferencias` | não | sim |
| 6 | Etapa F — Comportamento e dificuldades | `/onboarding/desafios` | não | sim |
| 7 | Etapa G — Autopercepção acadêmica | `/onboarding/areas` | não | sim |
| 8 | Etapa H — Interface e acessibilidade | `/onboarding/conforto` | não | sim |
| 9 | Confirmação do perfil (§19) | `/onboarding/perfil` | sim | não |
| 10 | Resumo da configuração inicial | `/onboarding/resumo` | sim | — |

**Regras de navegação**

- Barra de progresso com "etapa N de 8" **e** porcentagem.
- Botão "Voltar" em todas as etapas ≥ 1; voltar **nunca apaga** respostas já dadas.
- "Pular esta etapa" só aparece nas etapas não obrigatórias e grava `skipped: true`.
- Salvamento automático a cada resposta (debounce 400 ms) + salvamento ao sair da etapa.
- Ao reabrir, o usuário cai na **primeira etapa incompleta** com um aviso curto:
  "Você parou aqui. Suas respostas anteriores foram salvas."
- "Fazer isso depois" no topo: sai do onboarding e vai ao dashboard com um **perfil provisório
  de baixa confiança** e um cartão persistente "Completar meu perfil de estudo".
- Nunca mais de **uma dimensão por tela**; nenhuma tela com mais de 4 perguntas.

**Questionário curto (§16.3):** as etapas obrigatórias A + C + D formam o *modo rápido*,
concluível em ~2 minutos (7 perguntas). As demais etapas ficam disponíveis depois como
**"diagnóstico de perfil"** dentro de "Meu perfil de estudo", sem bloquear o uso.

---

## 3. Perguntas, opções e efeitos

Formato: `id` · pergunta · tipo · opções → efeito nas dimensões.
Dimensões (0–100): `autonomy`, `consistency`, `perceivedBase`, `needsDirection`,
`practicePreference`, `needsShortSessions`. Todas começam em 50 (neutro).

### Etapa A — Contexto  *(obrigatória)*

**A1 `schoolYear`** — "Em que momento dos estudos você está?" *(escolha única)*
`1º ano do ensino médio` · `2º ano` · `3º ano` · `Já terminei o ensino médio` ·
`Ainda não estou no ensino médio` · `Prefiro não dizer`
→ efeito: define ritmo/horizonte. `3º ano` e `Já terminei` → `perceivedBase +5`.

**A2 `previousPrep`** — "Você já se preparou para o ENEM antes?" *(única)*
`Ainda não` → `needsDirection +15`, `perceivedBase −10`
`Estudei por conta própria, sem plano` → `autonomy +5`, `needsDirection +5`
`Sigo ou já segui um cronograma/cursinho` → `autonomy +10`, `perceivedBase +10`
`Não sei ainda` → **aciona diagnóstico leve sugerido**, sem penalizar nenhuma dimensão

**A3 `examHistory`** — "Você já fez a prova ou simulados?" *(única)*
`Nunca fiz` · `Já fiz simulados` (`perceivedBase +5`) · `Já fiz o ENEM uma vez` (`+10`) ·
`Já fiz mais de uma vez` (`+12`)

**A4 `horizon`** — "Qual é o seu horizonte de preparação?" *(única)*
`ENEM 2027, com tempo pela frente` · `Uma prova em menos de 6 meses` (`practicePreference +15`) ·
`Ainda sem data definida` · `Só estou explorando` (`needsDirection +10`)

> Nenhuma opção exclui ninguém: "Não sei ainda" é sempre uma resposta válida e leva a um
> diagnóstico leve, nunca a uma mensagem de erro.

### Etapa B — Objetivo e motivação *(opcional)*

**B1 `goals`** — "O que você quer conseguir agora?" *(múltipla, 1–5)*
`Construir base com calma` (`perceivedBase −5`, `needsDirection +5`) ·
`Melhorar meu desempenho` (`practicePreference +10`) ·
`Me preparar para uma prova próxima` (`practicePreference +15`) ·
`Organizar uma rotina de estudos` (`consistency −10`, `needsDirection +10`) ·
`Testar possibilidades de curso` (`needsDirection +5`)

**B2 `primaryGoal`** — "Entre os que você marcou, qual é o principal?" *(única, entre os marcados)*
Peso dobrado do efeito correspondente. **Nunca** usado como cobrança, ranking ou meta pública.

### Etapa C — Disponibilidade real *(obrigatória)*

**C1 `daysPerWeek`** — "Quantos dias por semana você consegue estudar?" *(única)* `1`…`7`
→ `consistency = 30 + dias × 8` (limitado a 100)

**C2 `sessionMinutes`** — "Quanto tempo costuma ter em cada sessão?" *(única + campo livre)*
`10` (`needsShortSessions +30`) · `20` (`+15`) · `30` (0) · `45` (`−10`) · `60` (`−20`) ·
`Outro` (número livre de 5 a 180, mesma escala interpolada)
→ **O tempo informado é limite real, não meta.** Nenhuma sessão sugerida excede esse valor.

**C3 `preferredTimes`** — "Quais horários são mais prováveis?" *(múltipla)*
`Manhã` · `Tarde` · `Noite` · `Madrugada` · `Varia muito` (`consistency −10`)

**C4 `routineStability`** — "Sua rotina costuma variar?" *(única)*
`É bem regular` (`consistency +15`) · `Varia um pouco` (0) · `Muda bastante` (`consistency −20`,
`needsShortSessions +10`)

### Etapa D — Autonomia e organização *(obrigatória)*

**D1 `autonomyStatement`** — "Qual frase descreve melhor você hoje?" *(única)*
| Opção | Efeito |
| --- | --- |
| "Sei o que preciso estudar e quero praticar." | `autonomy +30`, `needsDirection −30`, `practicePreference +15` |
| "Tenho alguma noção, mas preciso de um plano." | `autonomy +5`, `needsDirection +10` |
| "Estou perdido e quero que a plataforma me guie." | `autonomy −25`, `needsDirection +30` |
| "Já tenho um cronograma externo e quero usar como apoio." | `autonomy +25`, `needsDirection −20` |

Esta resposta define o **grau de direção do dashboard**: quem pede direção recebe uma
recomendação principal destacada; quem é autônomo recebe controle maior e recomendação discreta.

### Etapa E — Preferência de estudo *(opcional)*

**E1 `studyPreferences`** — "O que costuma te ajudar mais?" *(múltipla)*
`Uma explicação curta` · `Um exemplo resolvido` · `Uma sequência de questões`
(`practicePreference +15`) · `Rever meus erros` (`practicePreference +5`) ·
`Uma sessão cronometrada` (`practicePreference +10`) · `Ler um resumo` ·
`Vídeo` · `Depende do dia`

> **Não** vira estilo fixo de aprendizagem. Serve apenas para **ordenar** os recursos da
> primeira sessão. A plataforma continua oferecendo formatos variados e diz isso na tela:
> "Isso só muda a ordem do que aparece primeiro. Você continua tendo acesso a tudo."

### Etapa F — Comportamento e dificuldades de rotina *(opcional)*

**F1 `frictions`** — "O que costuma atrapalhar seus estudos?" *(múltipla)*
| Opção | Apoio prático gerado (não diagnóstico) |
| --- | --- |
| `Não saber por onde começar` (`needsDirection +15`) | Recomendação única e destacada no dashboard |
| `Perder o ritmo` (`consistency −10`) | Sessões menores e retomada explícita |
| `Estudar e esquecer` | Revisão espaçada ligada por padrão |
| `Dificuldade para interpretar questões` | Prioriza tópicos de interpretação e leitura guiada |
| `Ficar ansioso com o tempo` | Timer discreto por padrão, modo sem pressão disponível |
| `Abandonar quando erro` | Correção sem linguagem de culpa + "tentar questão semelhante" |
| `Não conseguir revisar` | Bloco de revisão curto fixo no plano |

> Proibido: termo clínico, escala de sintoma, conclusão sobre saúde mental.

### Etapa G — Autopercepção acadêmica *(opcional)*

**G1 `selfAssessment`** — Para cada área (`Linguagens`, `Matemática`, `Ciências Humanas`,
`Ciências da Natureza`, `Redação`): `Me sinto seguro` · `Me sinto inseguro` · `Não sei dizer`
→ média move `perceivedBase` (+8 por "seguro", −8 por "inseguro", 0 por "não sei").
→ Guardado como **hipótese** e comparado depois com o desempenho observado. A tela diz:
"Isso é um ponto de partida. Depois vamos comparar com o que acontecer na prática."

### Etapa H — Interface e acessibilidade *(opcional, editável depois)*

`theme` (escuro padrão / claro) · `textScale` (100 %, 112 %, 125 %) ·
`reducedMotion` (auto / sempre reduzido) · `highContrast` (sim/não) ·
`visualIntensity` (completa / reduzida) · `language` (`pt-BR`) ·
`reminders` (desligado padrão, com dia/horário opcional).

Não altera dimensões. Grava em `PersonalizationPreference` e vale imediatamente.

---

## 4. Regras de classificação do perfil

### 4.1 Cálculo

1. Toda dimensão começa em **50** e recebe os efeitos acima; resultado limitado a **0–100**.
2. Cada perfil tem um alvo por dimensão. A pontuação do perfil é
   `100 − média(|dimensão − alvo| × peso)`, com pesos por dimensão declarados no código.
3. Vence o perfil de maior pontuação; empate resolve pela ordem de prioridade declarada
   (determinístico — o mesmo conjunto de respostas sempre gera o mesmo perfil).

### 4.2 Alvos por perfil

| Perfil | autonomy | consistency | perceivedBase | needsDirection | practice | shortSessions |
| --- | --- | --- | --- | --- | --- | --- |
| Explorador sem rota | 20 | 40 | 25 | 90 | 40 | 55 |
| Construtor de base | 35 | 55 | 20 | 65 | 45 | 50 |
| Praticante em ritmo | 65 | 80 | 60 | 35 | 65 | 35 |
| Caçador de lacunas | 75 | 60 | 65 | 30 | 80 | 45 |
| Treinador de desempenho | 85 | 75 | 80 | 20 | 90 | 25 |
| Estudante de rotina variável | 55 | 20 | 50 | 50 | 55 | 90 |

### 4.3 Confiança da classificação

| Situação | Confiança | Comportamento |
| --- | --- | --- |
| Todas as 8 etapas respondidas e sem contradição | **alta** | Perfil sugerido normalmente |
| Só as obrigatórias (modo rápido) | **média** | Perfil sugerido + convite a completar depois |
| Etapas obrigatórias incompletas ou respostas contraditórias | **baixa** | **Perfil provisório** + diagnóstico leve priorizado |
| Onboarding pulado por completo | **baixa** | Perfil `Explorador sem rota` provisório, dashboard em modo guiado, cartão de completar perfil |

**Contradições detectadas** (marcadas em `signals`, nunca mostradas como erro):
- Diz "estou perdido" **e** marca "sei o que preciso estudar" em outra etapa.
- Declara segurança em todas as áreas **e** nunca estudou para o ENEM.
- Declara 6–7 dias/semana **e** "minha rotina muda bastante".

### 4.4 Regras invioláveis

- O perfil **nunca** bloqueia conteúdo.
- Toda recomendação derivada do perfil pode ser ignorada ou editada.
- Mudança relevante de perfil exige **justificativa registrada** (`ProfileSnapshot.reason`) e
  mensagem ao estudante — nunca troca abrupta e silenciosa.
- A confirmação explícita do usuário **tem prioridade** sobre a classificação automática;
  as evidências observadas continuam sendo gravadas separadamente.
- Dimensões declaradas (`source: "declared"`) e observadas (`source: "observed"`) são
  linhas distintas em `StudyProfileDimension`.

---

## 5. Perfis apresentados ao estudante

| Perfil | Descrição mostrada | Primeira abordagem |
| --- | --- | --- |
| **Explorador sem rota** | "Você está começando e quer entender por onde seguir." | Trilha guiada, sessões curtas e mapa de conteúdos |
| **Construtor de base** | "Você quer fortalecer fundamentos antes de acelerar." | Explicações essenciais, pré-requisitos e prática gradual |
| **Praticante em ritmo** | "Você já consegue estudar e quer manter constância." | Plano semanal equilibrado e sessões recorrentes |
| **Caçador de lacunas** | "Você já estudou parte do conteúdo e quer atacar dificuldades específicas." | Diagnóstico por tópico, questões semelhantes e revisão de erros |
| **Treinador de desempenho** | "Você busca melhorar precisão, estratégia e tempo." | Simulados, análise de tempo e questões integradas |
| **Estudante de rotina variável** | "Seu tempo muda e o plano precisa acompanhar sua realidade." | Sessões modulares, retomada e replanejamento automático |

Nenhum nome sugere diagnóstico, julgamento, nível de inteligência ou capacidade.

### 5.1 O que o perfil personaliza

Quantidade de questões por sessão · duração sugerida · proporção aprender/praticar/revisar ·
autonomia do dashboard · frequência de lembretes · dificuldade inicial · matérias por semana ·
formato da primeira recomendação · intensidade do temporizador · tom das mensagens de progresso ·
presença de dicas antes da resposta · necessidade de retomada após abandono.

| Perfil | Questões/sessão | Duração base | Aprender / Praticar / Revisar | Direção do dashboard | Dificuldade inicial | Timer |
| --- | --- | --- | --- | --- | --- | --- |
| Explorador sem rota | 5 | 15 min | 40 / 40 / 20 | alta | introdutória | discreto |
| Construtor de base | 6 | 20 min | 45 / 40 / 15 | alta | introdutória | discreto |
| Praticante em ritmo | 10 | 30 min | 25 / 50 / 25 | média | intermediária | visível |
| Caçador de lacunas | 10 | 30 min | 20 / 45 / 35 | baixa | intermediária | visível |
| Treinador de desempenho | 14 | 45 min | 10 / 60 / 30 | baixa | desafiadora | cronometrado |
| Rotina variável | 6 | 15 min | 30 / 45 / 25 | média | intermediária | discreto |

*Duração e quantidade são sempre limitadas pelo tempo informado na etapa C.*

---

## 6. Tela de confirmação do perfil (§19)

Conteúdo obrigatório:
1. Nome do perfil provisório.
2. Descrição em linguagem natural.
3. **Sinais que levaram à sugestão** (lista legível, ex.: "Você estuda 2 dias por semana",
   "Você prefere sessões de 20 minutos", "Você pediu que a plataforma te guie") — sem
   pontuação técnica.
4. Como o perfil muda a experiência (tabela curta da §5.1).
5. Botão **"Sim, começar com este perfil"**.
6. Opção **"Nenhum parece comigo"**.
7. **"Quero comparar com outros perfis"** → mostra de 2 a 4 alternativas com características
   objetivas e permite escolher qualquer uma.
8. **"Editar minhas respostas"** → volta a uma etapa específica sem perder o resto.

Texto de abertura:
> "Pelo que você contou, seu perfil inicial parece ser **{perfil}**. Isso significa que vamos
> {primeira abordagem}. Esse perfil não é definitivo."

Pergunta de fechamento: **"Esse perfil combina com você?"**

Registro em `ProfileConfirmation`: `suggestedProfile`, `chosenProfile`, `changedAnswers`,
`decidedAt`, `questionnaireVersion`, `note` (opcional), `matchedSuggestion`.

### 6.1 Resumo pós-confirmação
Perfil escolhido · duração sugerida · proporção aprender/praticar/revisar · questões por sessão ·
nível de direção do dashboard · primeira atividade recomendada · link "Editar tudo em
**Meu perfil de estudo**".

---

## 7. Mensagens (tom de voz)

| Situação | Mensagem |
| --- | --- |
| Abertura | "Vamos entender como você estuda hoje para montar uma experiência que combine melhor com sua rotina. Seu perfil não é uma etiqueta fixa: ele pode mudar conforme você pratica." |
| Retomada | "Você parou aqui. Suas respostas anteriores foram salvas." |
| Etapa pulada | "Sem problema. Você pode responder isso depois em Meu perfil de estudo." |
| Respostas insuficientes | "Ainda não temos informação suficiente para uma sugestão firme. Vamos começar com algo leve e ajustar conforme você praticar." |
| Contradição | "Algumas respostas apontam para caminhos diferentes. Começamos pelo mais seguro e ajustamos com a prática." |
| Perfil rejeitado | "Obrigado por dizer. Escolha o que fizer mais sentido agora — dá para mudar quando quiser." |
| Mudança de perfil observada | "Depois das suas últimas sessões, percebemos que você está conseguindo manter blocos maiores de estudo. Ajustamos seu plano para oferecer mais prática integrada, mas você pode mudar essa configuração quando quiser." |
| Conclusão | "Pronto. Sua primeira sessão leva {min} minutos e já está preparada." |

Proibido: promessa de aprovação, previsão de nota, culpa por ausência, comparação com outros
estudantes, ranking, linguagem infantilizada, termo clínico.

---

## 8. Critérios de acessibilidade

- Cada etapa é um `<form>` com `<fieldset>` + `<legend>` contendo a pergunta.
- Opções são `radio`/`checkbox` **reais** (não `div` clicável) — funcionam com teclado,
  leitor de tela e sem JavaScript de estilo.
- Foco visível em todos os controles (anel de 2 px, contraste ≥ 3:1 contra o fundo).
- Ordem de tabulação segue a ordem visual; nenhum `tabindex` positivo.
- Progresso anunciado por `aria-live="polite"` ("Etapa 3 de 8").
- Erros de validação ligados por `aria-describedby`, com texto explicando **como corrigir**.
- Nenhuma informação transmitida só por cor: estado de seleção tem borda + ícone + texto.
- Alvos de toque ≥ 44 × 44 px.
- `prefers-reduced-motion` respeitado: transições viram fade curto; nada de parallax.
- Intensidade visual **média** no onboarding — o fundo animado nunca fica atrás do texto da
  pergunta em contraste menor que 4.5:1.
- Texto redimensionável até 200 % sem quebra de layout nem rolagem horizontal.
- Botão "Pular" é um `<button>` real, nunca `href="#"`.

---

## 9. Perfis de teste obrigatórios (§"Perfis de teste obrigatórios")

Cobertos por `src/lib/profile/engine.test.ts` e pelos usuários de demonstração do seed:

| # | Cenário | Perfil esperado | Confiança |
| --- | --- | --- | --- |
| 1 | Perdido com pouco tempo | Explorador sem rota | média |
| 2 | Organizado com rotina própria | Praticante em ritmo | alta |
| 3 | Boa base, erra por interpretação | Caçador de lacunas | alta |
| 4 | Abandona sessões longas | Estudante de rotina variável | alta |
| 5 | Declara segurança, desempenho baixo | perfil declarado mantido + `ProfileSnapshot` de divergência após 3 sessões | alta → revisada |
| 6 | Declara insegurança, bom desempenho | Construtor de base + snapshot de ajuste para cima | alta → revisada |
| 7 | Pula o onboarding | Explorador sem rota **provisório**, dashboard guiado | baixa |

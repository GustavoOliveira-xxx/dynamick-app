# Bugs encontrados durante os incrementos

Atualizado em 23 de agosto de 2026.

## Segundo incremento — conta, páginas, carregamento e acervo

### CK-003 — "Entrar" levava ao onboarding, mesmo para quem já o havia concluído

- Status: corrigido.
- Reprodução: abrir `index.html`, clicar em **Entrar**. O destino era `app.html#/inicio`, onde o guarda `requireOnboarding` verificava `onboardingStatus`. Como um visitante sem estado local sempre começa em `not_started`, o guarda redirecionava para `/onboarding`. Quem já havia respondido tudo, em outro navegador ou depois de limpar o site, era obrigado a refazer o questionário; e não existia nenhuma tela onde "entrar" significasse entrar.
- Impacto: alto. Era impossível voltar ao estudo pela porta da frente, e o produto parecia exigir onboarding infinito.
- Causa: o produto não tinha o conceito de conta. O único estado consultado era o do onboarding, e ele foi usado como se fosse autenticação.
- Correção: criada a camada de contas locais (`js/core/account.js`) e a tela `entrar.html`, com abas Entrar, Criar conta e Tenho um código. O guarda foi separado em dois: `requireAccount` (sem sessão → `/entrar`) e `requireOnboarding` (com sessão e sem respostas → `/onboarding`). Os botões "Entrar" das páginas públicas passaram a apontar para `entrar.html`.
- Verificação: percurso completo no navegador — criar conta com senha, sair, entrar de novo com senha errada (recusa) e correta (entra), e "Entrar" com sessão aberta oferecendo continuar em vez de recomeçar.

### CK-004 — Query string era descartada ao resolver links de rota

- Status: corrigido.
- Reprodução: na tela de preparação da sessão, clicar em **Começar**. O botão aponta para `#/sessao/<id>?comecar=sim`; nada acontecia.
- Impacto: alto durante o desenvolvimento — a sessão de estudo não iniciava.
- Causa: introduzido por este incremento. `linkTo()`, em `js/core/pages.js`, normalizava o caminho para casar a rota com o arquivo e devolvia o caminho já **sem** a consulta. A tela de sessão usa `?comecar=sim` para distinguir preparação de resolução.
- Correção: `split()` separa rota e consulta; a rota é usada para localizar o documento e a consulta é reanexada ao endereço final.
- Prevenção: o comportamento foi verificado no navegador em todo o fluxo de sessão, incluindo recarregar a página no meio da resolução.

### CK-005 — Slugs de questão colidiam entre tópicos de matérias diferentes

- Status: corrigido.
- Reprodução: após incluir a segunda leva de conteúdo, `tests/content.test.mjs` acusou 306 questões com apenas 288 slugs distintos.
- Impacto: alto se tivesse chegado ao usuário. O índice `getQuestion()` é por slug: duas questões com o mesmo identificador fariam a revisão, o caderno de erros e o resultado da sessão apontarem para o item errado.
- Causa: prefixos escolhidos por abreviação natural colidiram entre tópicos distantes — `q-gen-*` em "gêneros textuais" e em "genética", `q-func-*` em "funções da linguagem" e em "funções e relações", `q-rep-*` em "Brasil República" e em "repertório sociocultural".
- Correção: renomeados os slugs da segunda leva para `q-linguagem-*`, `q-genetica-*` e `q-repertorio-*`. Os identificadores da primeira leva ficaram intactos, para não invalidar histórico de quem já respondeu.
- Prevenção: o teste "nenhum slug de questão se repete" já existia e pegou o problema antes do navegador.

### CK-006 — Sequências inteiras de gabarito se repetiam entre tópicos

- Status: corrigido.
- Reprodução: com 39 tópicos, `tests/answer-key.test.mjs` acusou três tópicos com a mesma sequência de posições corretas.
- Impacto: médio. Um estudante atento poderia perceber o padrão e acertar sem ler, o que contamina domínio, motivo do erro e recomendação.
- Causa: o rebalanceamento derivava tanto o ponto de partida quanto o passo da **mesma** semente, sobre uma tabela de 10 posições — 40 combinações possíveis. Com 12 tópicos isso bastava; com 39, colisões viraram esperadas.
- Correção: tabela ampliada para 20 posições e passo derivado de uma segunda semente independente, com base e módulo diferentes. Passa a haver 160 combinações, e nenhuma sequência se repete três vezes.
- Verificação: distribuição das cinco posições entre 54 e 67 ocorrências em 306 questões, sem concentração.

### CK-007 — Questão citava alternativas por letra em um enunciado comparativo

- Status: corrigido.
- Reprodução: a questão de geometria sobre pizzas usava "Pizzaria A" e "Pizzaria B" no enunciado e "a opção A entrega o dobro da opção B" nas alternativas.
- Impacto: médio. As letras A e B do enunciado não têm relação com as etiquetas das alternativas, que são rotacionadas na montagem. A coincidência de letras confunde e pode induzir erro.
- Causa: nomes de estabelecimento escolhidos com letras que colidem com as etiquetas das alternativas.
- Correção: estabelecimentos renomeados ("Pizzaria do Centro" e "Pizzaria da Esquina") e alternativas reescritas sem referência a letra.
- Prevenção: `tests/answer-key.test.mjs` já rejeitava esse padrão e apontou a questão.

### CK-008 — Campo de senha desalinhado no formulário de criação de conta

- Status: corrigido.
- Reprodução: abrir `entrar.html#/entrar/criar` em largura de desktop. O campo "Repita a senha" aparecia abaixo da linha do campo "Senha", que tem uma dica sob si.
- Impacto: baixo — estético, mas o formulário é a primeira tela do produto para quem chega.
- Causa: `.field` usa grid; dentro de `grid-2`, as linhas de cada coluna eram distribuídas pela altura da célula esticada, o que empurrava o campo sem dica para baixo.
- Correção: `align-content: start` em `.field`.

## Primeiro incremento

### CK-001 — Explicação citava uma letra de gabarito que podia mudar

- Status: corrigido e coberto por teste.
- Reprodução: abrir uma questão cujo gabarito foi rotacionado por `js/data/content.js` e comparar a letra correta exibida com frases como "A resposta é A" no texto explicativo.
- Impacto: a correção funcional estava certa, mas a explicação podia contradizer a posição visual da alternativa e reduzir a confiança do estudante.
- Causa: parte do conteúdo-base foi redigida com letra fixa antes da rotação determinística de alternativas.
- Correção: remover da explicação a referência à letra e preservar a justificativa conceitual, que independe de posição.
- Prevenção: `tests/answer-key.test.mjs` rejeita novas explicações com esse padrão.

### CK-002 — Cubo do hero invadia conteúdo em largura móvel

- Status: corrigido e verificado em 390 × 844 px.
- Reprodução: abrir a landing em viewport móvel após a primeira inserção do cubo; sua área decorativa tocava o cartão principal.
- Impacto: composição apertada e risco de competir visualmente com o primeiro conteúdo.
- Causa: o deslocamento calculado para desktop foi reaproveitado no breakpoint móvel.
- Correção no primeiro incremento: reservar espaço vertical específico, reduzir a escala e reposicionar o cubo no breakpoint móvel.
- Correção adicional agora: com o cubo interativo, a sobreposição deixou de ser aceitável em qualquer largura — um objeto que recebe arraste não pode cobrir conteúdo nem roubar o gesto de rolagem. O cubo saiu do posicionamento absoluto e passou a ocupar espaço próprio no fluxo.

## Pendências

Nenhum defeito bloqueante conhecido. Permanecem como recomendações de qualidade, não como correções:

- revisão editorial independente das 306 questões;
- teste em dispositivos físicos, sobretudo do gesto de giro de camada do cubo em telas pequenas;
- verificação com leitor de tela real nas telas novas (`entrar.html` e o cubo da tela inicial).

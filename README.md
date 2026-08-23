# Dynamic CK

Plataforma de estudos para o ENEM 2027, da **Conscious Knowledge**.
HTML + CSS + JavaScript puro: **sem framework, sem build, sem dependências de runtime.**

---

## Como rodar

Os módulos usam `import`/`export` nativos, então **abrir `index.html` com duplo clique não
funciona** — o navegador bloqueia módulos em `file://`. É preciso um servidor estático
qualquer:

```bash
python3 -m http.server 8000
# ou
npx serve .
```

Isso cobre tudo menos a sincronização, que precisa das funções em `api/`. Para exercitar
essa parte localmente, use `vercel dev` — ou deixe `SYNC.habilitado = false` em
`js/config.js` enquanto trabalha só no cliente.

Depois abra `http://localhost:8000`.

| Endereço | O que é |
| --- | --- |
| `index.html` | Página inicial pública |
| `experimentar.html` | Três questões com correção, sem conta e sem salvar nada |
| `entrar.html` | Conta: entrar, criar ou trazer o progresso por código |
| `inicio.html` | O início do estudante (e o diagnóstico opcional) |
| `conteudos.html`, `praticar.html`, `sessao.html`, `revisar.html` | O ciclo de estudo |
| `simulados.html`, `redacao.html`, `metodos.html`, `buscar.html` | Áreas de apoio |
| `perfil.html`, `catalogo.html`, `onboarding.html` | Perfil, saúde do acervo e primeiro acesso |
| `app.html` | Endereço antigo: redireciona para a página certa da rota |
| `sobre.html`, `privacidade.html`, `acessibilidade.html` | Páginas institucionais |

**Por que vários arquivos e não um só.** A área de estudo era um documento único
(`app.html#/rota`). Cada troca de tela baixava e executava os mesmos 70 e poucos módulos.
Agora cada área é um documento, e o navegador carrega só o que aquela área usa: a troca
entre seções passa por um carregamento real, com tela de carregamento visível, e um erro
em uma tela não derruba a aplicação inteira. Dentro de cada página, a navegação continua
sendo por hash, sem recarregar nada.

`js/core/pages.js` é a única fonte de verdade sobre qual rota mora em qual arquivo. As
views continuam escrevendo `href="#/conteudos/x"`; a tradução para
`conteudos.html#/conteudos/x` acontece em um lugar só, dentro de `el()`.

Publicar é copiar a pasta para qualquer hospedagem estática — GitHub Pages, Netlify,
S3, um `nginx`. Não há passo de build.

---

## Banco de dados e sincronização

O estudo vive no `localStorage` do navegador. Isso continua sendo a fonte da verdade:
o site funciona offline, sem cadastro e sem servidor.

Além disso existe **sincronização opcional entre aparelhos**, por código, sem conta.
O estudante gera um código de 20 caracteres, o estado sobe **cifrado no navegador** e
digitar o mesmo código em outro aparelho traz o progresso.

- A chave é derivada do código (PBKDF2 → AES-GCM 256). O servidor recebe bytes opacos.
- O código nunca é enviado; vai apenas o SHA-256 dele, para localizar o registro.
- **Nem o operador do banco lê o conteúdo.** Não é promessa de conduta, é como foi feito.
- Perder o código é perder o acesso. Não há recuperação — não pode haver.
- Nada sobe em segundo plano: enviar e trazer são ações explícitas.

Conflito entre aparelhos é detectado por número de revisão e **nunca resolvido em
silêncio**: se o servidor está adiante, a interface mostra as opções.

Ligar ou desligar é uma linha em [`js/config.js`](js/config.js). Desligado, não existe uma
única chamada de rede — é o modo certo para hospedagem estática como o GitHub Pages, que
não tem como rodar `/api`.

O banco também guarda o acervo (áreas, tópicos, questões), para quando existir curadoria
por uma equipe. A aplicação **não** lê de lá: ela usa `js/data/`, que funciona offline.

Esquema e carga: [`db/README.md`](db/README.md). Publicação: [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Estrutura

```
index.html experimentar.html sobre.html privacidade.html acessibilidade.html
entrar.html onboarding.html inicio.html conteudos.html praticar.html sessao.html
revisar.html simulados.html redacao.html metodos.html buscar.html catalogo.html
perfil.html  app.html (compatibilidade: redireciona endereços antigos)

css/
  tokens.css       Todos os valores de design: cores, espaço, tipografia, temas
  loader.css       Tela de carregamento (carregada antes de tudo, sem depender de JS)
  base.css         Reset, tipografia, acessibilidade, movimento reduzido
  components.css   Botões, cartões, campos, alternativas, avisos, modal
  landing.css      Páginas públicas
  app.css          Shell da aplicação e telas de sessão

js/
  core/            dom, format, markdown, router, store, student, sessions,
                   account (contas locais), pages (mapa de rotas), shell (casca comum)
  engine/          domain, profiles, profile, recommendation, mastery, spaced, simulation
  data/            Conteúdo autoral: áreas, tópicos, questões, métodos, simulados, redação
  ui/              brand, background, components, loader, cubo mágico 3D, transições
  views/           Uma tela por arquivo
  pages/           Um arquivo por documento HTML: registra só as rotas daquela área
  demo.js          A amostra de experimentar.html

assets/brand/      Camada substituível de marca (ver abaixo)
db/                Esquema Postgres e seed do acervo, gerados de js/data/
api/               Funções serverless (Vercel): sincronização e limpeza
docs/              Guia de publicação e capturas de tela
tests/             Suíte própria, sem dependências
```

### Onde ficam as decisões

| Quero mudar… | Mexo em |
| --- | --- |
| cor, espaçamento, tipografia | `css/tokens.css` |
| como o próximo tópico é escolhido | `js/engine/recommendation.js` |
| quando um tópico vira "consolidado" | `js/engine/mastery.js` |
| os intervalos de revisão | `js/engine/spaced.js` |
| a montagem dos simulados | `js/engine/simulation.js` |
| as perguntas do onboarding | `js/data/questionnaire.js` |
| os seis perfis de estudo | `js/engine/profiles.js` |
| o conteúdo e as questões | `js/data/topics-*.js` |
| a estrutura de um tópico novo | `js/data/topic-factory.js` |
| em qual arquivo HTML mora cada rota | `js/core/pages.js` |
| contas locais e sessão | `js/core/account.js` |
| a tela de carregamento | `js/ui/loader.js` e `css/loader.css` |
| onde os dados são gravados | `js/core/store.js` |
| ligar/desligar a sincronização | `js/config.js` |
| a cifragem e o código de sync | `js/core/sync.js` |

---

## Testes

```bash
node tests/index.mjs        # perfil, recomendação, domínio, revisão, simulado, conteúdo, gabarito, sincronização
node tests/check-imports.mjs
```

`check-imports.mjs` existe por um motivo específico: em módulos ES, importar um nome que
não é exportado é erro de *link* — a página inteira fica em branco, sem mensagem útil no
console. O verificador acha isso antes do navegador.

Não há framework de teste. `tests/run.mjs` é um `describe`/`it`/`expect` de cem linhas.
Rodar a suíte não exige `npm install`.

---

## Conta e login

A conta do Dynamic CK **vive no navegador**. Não há servidor de autenticação, e por isso a
interface não promete o que não existe: não há e-mail de confirmação nem recuperação de
senha por e-mail.

O que a conta resolve de verdade:

- separa mais de um estudante no mesmo aparelho, cada um com seu progresso — o estado passa
  a morar em `dynamick:v1:<id da conta>`, e não em uma chave única;
- dá uma porta de entrada de verdade: "Entrar" volta para o estudo. Antes, o guarda de rota
  mandava todo mundo para o onboarding, inclusive quem já o havia concluído;
- guarda a senha como derivação PBKDF2-SHA-256 com sal (210 mil iterações), nunca em texto
  claro. Sem `crypto.subtle` — contexto não seguro —, a interface informa e oferece conta
  sem senha, em vez de fingir proteção.

`entrar.html` tem três abas: **Entrar**, **Criar conta** e **Tenho um código**. A terceira
usa a sincronização cifrada já existente para trazer o progresso de outro aparelho. Também é
possível entrar como convidado e transformar a sessão em conta depois, sem perder nada.

---

## Conteúdo

Todo o material em `js/data/` é **autoral**, escrito para este projeto. Nenhuma questão foi
copiada de prova oficial, livro ou plataforma de terceiros. Cada questão declara `origin` e
`license`.

Números atuais: 4 áreas, 11 disciplinas, **39 tópicos completos** e **306 questões**
(255 principais e 51 de recuperação), 234 blocos de conteúdo, 8 métodos de estudo,
12 sessões prontas, 5 simulados e 8 temas de redação.

O acervo está em duas levas:

- os **12 tópicos do MVP**, escritos um a um, com 10 questões principais cada — cinco
  delas vindas da expansão editorial de agosto de 2026 — e duas de recuperação;
- os **27 tópicos da segunda leva**, que cobrem os demais assuntos previstos no escopo e
  abrem as três matérias que ainda não tinham nenhum tópico — Literatura, História e
  Filosofia. Cada um traz resumo rápido, explicação, dois exemplos resolvidos, três erros
  comuns, perguntas de autoexplicação, cinco questões principais nos cinco formatos
  cognitivos e uma de recuperação.

A estrutura editorial da segunda leva é garantida por construção em
`js/data/topic-factory.js`: um tópico sem os cinco formatos cognitivos, ou uma questão
sem cinco alternativas, falha na carga do módulo — antes de chegar ao estudante.

O acervo **não cobre o programa completo do ENEM**, e a plataforma diz isso onde a falta
aparece. A tela `#/catalogo` mostra os números e aponta cada lacuna.

### O gabarito é rebalanceado na montagem

O material-base foi redigido com a resposta correta quase sempre na primeira alternativa.
Sem o rebalanceamento, marcar sempre a mesma letra distorceria domínio, motivo de erro e
recomendação.

A correção está em `js/data/content.js`, na montagem do catálogo: uma rotação
determinística por questão, com ponto de partida próprio por tópico. É determinística de
propósito — um gabarito que mudasse de lugar entre sessões quebraria a revisão e o caderno
de erros. `tests/answer-key.test.mjs` trava o resultado.

---

## Logos

As duas marcas estão no repositório e ligadas (`USE_OFFICIAL_ASSETS = true`):

```
assets/brand/logo-dynamic.png / .webp   ← produto (DynamiCK)
assets/brand/logo-ck.png / .webp        ← empresa (Conscious Knowledge)
assets/brand/originais/                 ← os arquivos como vieram, intocados
```

Os originais têm 1536×1024 e cerca de 2 MB cada. A aplicação carrega versões reduzidas
geradas por `assets/brand/gerar-web.py`: recorte da névoa externa invisível, redução de
escala com proporção preservada e WebP a q90 além do PNG — 261 KB viram 70 KB, sem banda
no brilho. A arte em si não foi alterada.

Nenhuma tela desenha a logo por conta própria: tudo passa por `js/ui/brand.js`, que monta
um `<picture>` com WebP e PNG e deriva a altura da proporção real do arquivo, para que a
marca nunca seja esticada.

Detalhes, regras de uso e a limitação conhecida do formato quadrado em cabeçalhos:
[`assets/brand/README.md`](assets/brand/README.md).

## Acessibilidade e desempenho

- Navegação completa por teclado, foco visível, link para pular ao conteúdo.
- Controles nativos (`button`, `input`, `fieldset`) — nada de `div` clicável.
- Cor nunca é o único sinal: certo/errado, estado e alerta sempre trazem texto.
- Três temas (escuro, claro, alto contraste) e três tamanhos de texto.
- `prefers-reduced-motion` respeitado por padrão, com controle manual em Configurações.
- O ambiente combina Canvas 2D com aurora e grade em CSS, todos `aria-hidden`; pausa fora
  da tela e com a aba oculta, reduz densidade em telas pequenas e desenha um único quadro
  sob movimento reduzido. O cubo mágico e a tela de carregamento usam CSS 3D, têm
  alternativa estática e não carregam WebGL. O modo "elementos visuais reduzidos" desliga
  os efeitos sem perder informação.
- O cubo da tela inicial é operável por teclado: as setas giram o cubo e as teclas Q, W, A,
  S, Z e X giram camadas. Nenhuma informação de estudo depende dele.

---

## O que a plataforma não faz

Por decisão de produto, não por falta de implementação:

- Não promete aprovação nem estima nota do ENEM.
- Não tem ranking público nem comparação entre estudantes.
- Não trava conteúdo: todo tópico é acessível em qualquer ordem.
- Não emite diagnóstico clínico — o perfil descreve hábitos declarados, e é revisável.
- Não declara domínio a partir de uma única questão.
- Não esconde por que recomendou algo: toda sugestão traz a justificativa por escrito.

---

Conteúdo autoral de desenvolvimento — Conscious Knowledge.

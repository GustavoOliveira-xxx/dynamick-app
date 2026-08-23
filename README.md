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
| `app.html` | A plataforma (rotas em `#/`) |
| `sobre.html`, `privacidade.html`, `acessibilidade.html` | Páginas institucionais |

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
index.html app.html experimentar.html sobre.html privacidade.html acessibilidade.html

css/
  tokens.css       Todos os valores de design: cores, espaço, tipografia, temas
  base.css         Reset, tipografia, acessibilidade, movimento reduzido
  components.css   Botões, cartões, campos, alternativas, avisos, modal
  landing.css      Páginas públicas
  app.css          Shell da aplicação e telas de sessão

js/
  core/            dom, format, markdown, router, store, student, sessions
  engine/          domain, profiles, profile, recommendation, mastery, spaced, simulation
  data/            Conteúdo autoral: áreas, tópicos, questões, métodos, simulados, redação
  ui/              brand, background, components, cubo 3D, transições
  views/           Uma tela por arquivo
  app.js           Rotas e bootstrap
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

## Conteúdo

Todo o material em `js/data/` é **autoral**, escrito para este projeto. Nenhuma questão foi
copiada de prova oficial, livro ou plataforma de terceiros. Cada questão declara `origin` e
`license`.

Números atuais: 4 áreas, 11 disciplinas, 12 tópicos completos, 144 questões (120 principais
e 24 de recuperação), 72 blocos de conteúdo, 8 métodos de estudo, 12 sessões prontas,
5 simulados e 8 temas de redação. Cada tópico completo oferece 10 questões principais —
cinco delas na expansão editorial de agosto de 2026 — e duas de recuperação.

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
  sob movimento reduzido. O cubo de conhecimento e o loader usam CSS 3D, têm alternativa
  estática e não carregam WebGL. O modo "elementos visuais reduzidos" desliga os efeitos
  sem perder informação.

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

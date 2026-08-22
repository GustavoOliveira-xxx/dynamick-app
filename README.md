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

## Banco de dados

Existe um projeto Neon provisionado (`dynamic-ck`), com o esquema completo aplicado:
28 tabelas e 2 visões, em [`db/`](db/). **A aplicação ainda não usa nada disso.**

Todo o estado do estudante continua no `localStorage` do navegador, sob a chave
`dynamick:v1`, e **toda** leitura e escrita passa por um único arquivo:
[`js/core/store.js`](js/core/store.js).

**O que o localStorage dá de graça**

- Funciona sem cadastro, sem login e sem servidor.
- Funciona offline depois do primeiro carregamento.
- Nenhum dado de estudante sai do aparelho — a página de privacidade pode ser honesta.
- Hospedagem estática, custo zero.

**O que ele custa**

- O progresso **não** acompanha o estudante em outro aparelho ou navegador.
- Limpar dados de navegação apaga tudo. Em aba anônima, some ao fechar.
- Não há curadoria compartilhada: o conteúdo é o que está nos arquivos `js/data/`.
- Não há como uma equipe pedagógica acompanhar turmas, nem como um professor ver nada.
- Denúncias de conteúdo ficam no navegador de quem denunciou e não chegam a ninguém.

**Quando o banco passa a valer a pena**

Se qualquer um destes entrar no escopo: conta e login com sincronização entre aparelhos;
conteúdo editado por uma equipe sem novo deploy; turmas e professores; denúncias chegando
de fato à equipe; métricas agregadas para decidir o que escrever a seguir.

**O que muda no código nesse dia**

Só `js/core/store.js`. Ele expõe `load`, `getState`, `update`, `subscribe`, `exportData`,
`importData`, `clearAll` e `watchOtherTabs` — nenhuma tela conhece `localStorage`.
Reimplementar essas funções contra uma API é o trabalho todo; as telas não mudam.

Antes disso, três coisas precisam existir e não existem: autenticação, uma API entre o
navegador e o banco (a string de conexão nunca pode ir para o cliente) e a reescrita de
`privacidade.html`, que hoje afirma que nada sai do aparelho.

Detalhes do esquema, estado da carga e como carregar o resto: [`db/README.md`](db/README.md).

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
  ui/              brand, background, components
  views/           Uma tela por arquivo
  app.js           Rotas e bootstrap
  demo.js          A amostra de experimentar.html

assets/brand/      Camada substituível de marca (ver abaixo)
db/                Esquema Postgres e seed do acervo, gerados de js/data/
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

---

## Testes

```bash
node tests/index.mjs        # 129 testes: perfil, recomendação, domínio, revisão, simulado, conteúdo, gabarito
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

Números atuais: 4 áreas, 11 disciplinas, 12 tópicos completos, 84 questões (24 delas de
recuperação), 72 blocos de conteúdo, 8 métodos de estudo, 12 sessões prontas, 5 simulados e
8 temas de redação.

O acervo **não cobre o programa completo do ENEM**, e a plataforma diz isso onde a falta
aparece. A tela `#/catalogo` mostra os números e aponta cada lacuna.

### O gabarito é rebalanceado na montagem

O material foi redigido com a resposta correta quase sempre na primeira alternativa (69 de
84). Quem marcasse sempre "A" acertaria 82% sem ler nada, e domínio, motivo de erro e
recomendação passariam a medir ruído.

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
- O fundo tridimensional é Canvas 2D, `aria-hidden`, pausa fora da tela e com a aba
  oculta, reduz densidade em telas pequenas e desenha um único quadro sob movimento
  reduzido. O modo "elementos visuais reduzidos" desliga tudo sem perder informação.

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

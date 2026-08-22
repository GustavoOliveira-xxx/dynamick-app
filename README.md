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

## Banco de dados: não há, e isso é uma escolha com consequências

Todo o estado do estudante vive no `localStorage` do navegador, sob a chave
`dynamick:v1`. **Toda** a leitura e escrita passa por um único arquivo:
[`js/core/store.js`](js/core/store.js).

**O que isso dá de graça**

- Funciona sem cadastro, sem login e sem servidor.
- Funciona offline depois do primeiro carregamento.
- Nenhum dado de estudante sai do aparelho — a página de privacidade pode ser honesta.
- Hospedagem estática, custo zero.

**O que isso custa**

- O progresso **não** acompanha o estudante em outro aparelho ou navegador.
- Limpar dados de navegação apaga tudo. Em aba anônima, some ao fechar.
- Não há curadoria compartilhada: o conteúdo é o que está nos arquivos `js/data/`.
- Não há como uma equipe pedagógica acompanhar turmas, nem como um professor ver nada.
- Denúncias de conteúdo ficam salvas no navegador de quem denunciou e não chegam a ninguém.

**Quando um banco passa a ser necessário**

Se qualquer um destes entrar no escopo, o `localStorage` deixa de servir:

1. Conta e login, com progresso sincronizado entre aparelhos.
2. Conteúdo editado por uma equipe sem precisar de novo deploy.
3. Turmas, professores, responsáveis — qualquer visão de terceiro.
4. Denúncias de conteúdo chegando de fato à equipe.
5. Métricas agregadas para decidir o que escrever a seguir.

**O que muda no código quando esse dia chegar**

Só `js/core/store.js`. Ele expõe `load`, `getState`, `update`, `subscribe`, `exportData`,
`importData`, `clearAll` e `watchOtherTabs` — nenhuma tela conhece `localStorage`.
Reimplementar essas funções contra uma API é o trabalho todo; as telas não mudam.

Se for para acontecer, a recomendação é **Postgres** (Supabase ou Neon resolvem o
servidor junto), com o formato de `exportData()` como base do esquema — ele já é
exatamente o estado do estudante, e já existe importação para migrar quem começou offline.

---

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

`assets/brand/` é a camada substituível de marca. **Nenhuma tela desenha a logo por conta
própria**: todas passam por `js/ui/brand.js`.

**Os arquivos oficiais ainda não estão no repositório.** Enquanto não chegam, o app desenha
uma marca provisória em SVG, marcada no HTML com `data-brand-fallback="true"`. Ela é um
espaço reservado, não uma proposta de identidade — a especificação proíbe recriar,
redesenhar ou interpretar as logos, então nada aqui tenta imitá-las.

Para ligar as oficiais: coloque os arquivos com os nomes listados em
[`assets/brand/README.md`](assets/brand/README.md) e troque uma linha em `js/ui/brand.js`:

```js
export const USE_OFFICIAL_ASSETS = false;  // → true
```

---

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

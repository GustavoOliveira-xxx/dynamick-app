# Auditoria do projeto — Dynamic CK

Atualizada em 24 de agosto de 2026 (terceiro incremento).

## Resumo executivo

O repositório já implementava a maior parte do produto definido na especificação: onboarding explicável, seis perfis, dashboard adaptativo, mapa de conteúdo, prática, revisão, simulados, redação, acessibilidade, persistência local e sincronização opcional cifrada.

Este incremento atua em quatro frentes pedidas pelo proprietário do projeto, sem reescrever a arquitetura:

1. **Conta e entrada.** Havia um defeito de fluxo: clicar em "Entrar" levava ao onboarding, inclusive para quem já o havia concluído. Agora existe uma tela de acesso com abas e uma camada de contas locais.
2. **Divisão em páginas.** A área de estudo deixou de ser um documento único e passou a ter um arquivo HTML por área, com carregamento visível a cada troca.
3. **Tela de carregamento.** A logo do produto passou a ser a peça central do carregamento, animada, presente em toda navegação entre documentos e nas transições internas.
4. **Cubo mágico interativo e acervo.** O cubo virou um 3×3 de verdade, fixo na tela inicial; o acervo passou de 12 para 39 tópicos, cobrindo todas as 11 matérias.

## Arquitetura encontrada e mantida

- Aplicação estática em HTML, CSS e módulos ES nativos, sem etapa de build.
- Componentes DOM em `js/ui/`, telas em `js/views/`, regras em `js/engine/`, dados autorais em `js/data/`.
- Fonte da verdade do estudante no `localStorage`, com backup local antes de recuperar um estado inválido.
- Sincronização opcional por código compartilhado, com PBKDF2, AES-GCM e funções serverless em `api/`.
- Postgres/Neon serve à sincronização e à futura curadoria; a aplicação continua funcional offline.
- Marcas oficiais centralizadas em `js/ui/brand.js`, com WebP e PNG de fallback.

## O que mudou nesta auditoria

### Roteamento e documentos

- Antes: uma rota por hash dentro de `app.html`, com `js/app.js` registrando tudo.
- Agora: 13 documentos, um por área (`entrar`, `onboarding`, `inicio`, `conteudos`, `praticar`, `sessao`, `revisar`, `simulados`, `redacao`, `metodos`, `buscar`, `catalogo`, `perfil`).
- `js/core/pages.js` é a fonte única sobre qual rota mora em qual arquivo.
- `js/core/shell.js` concentra a casca comum: cabeçalho, navegação, fundo, preferências, guardas e transição.
- `js/pages/*.js` registra apenas as rotas do seu documento.
- As views continuam escrevendo `href="#/rota"`; a tradução acontece dentro de `el()`, em `js/core/dom.js`.
- `app.html` permanece como redirecionador dos endereços antigos, sem deixar parada extra no histórico.

### Conta

- `js/core/account.js`: contas locais com nome, e-mail opcional e senha opcional, sessão persistida e modo convidado.
- Senha protegida por PBKDF2-SHA-256 com sal e 210 mil iterações; comparação em tempo constante.
- `js/core/store.js` ganhou espaço de nomes por conta: o estado passou de `dynamick:v1` para `dynamick:v1:<id>`, com migração automática do estado antigo para a primeira conta criada.
- O guarda de rota passou a distinguir "sem sessão" (vai para `/entrar`) de "sem onboarding" (vai para `/onboarding`).

### Carregamento

- `css/loader.css` é carregado antes do restante do CSS e não depende de JS: a tela aparece na primeira pintura.
- A mesma marcação é reconstruída por `js/ui/loader.js` para as transições internas e para a saída rumo a outro documento.
- A transição interna reaproveita o palco da marca em escala menor e é suprimida enquanto a tela de carregamento inicial ainda está no ar.

### Cubo e acervo

- `js/ui/rubik-cube.js` substitui `js/ui/knowledge-cube.js` (removido): 26 peças com orientação própria, giro livre por arraste, giro de camadas pelo gesto sobre a peça, teclado, embaralhar e montar.
- Acervo: 39 tópicos e 306 questões, com todas as 11 matérias cobertas — inclusive Literatura, História e Filosofia, que estavam sem nenhum tópico.
- `js/data/topic-factory.js` garante a estrutura editorial da segunda leva por construção.

## Terceiro incremento — carregamento, paleta do cubo e acervo por assunto

### Tela de carregamento

A peça central deixou de ser a logo com halo e anel e passou a ser **o cubo mágico se abrindo**: ele gira montado, as oito peças se afastam e a marca estava dentro o tempo todo; depois elas voltam e o cubo fecha.

Duas decisões técnicas sustentam isso e valem registro, porque as duas foram descobertas na tela e não no papel:

- **O apagar mora nas faces, nunca na peça.** Animar `opacity` em um elemento com `transform-style: preserve-3d` faz o Chromium achatar os filhos 3D dele — o cubo vira um recorte chapado. A opacidade foi para as faces folha, com o mesmo atraso da peça.
- **As faces escondem o verso.** Sem `backface-visibility: hidden`, as seis faces translúcidas de cada peça se somam e a peça vira um borrão marrom em vez de mostrar as três que se vê.

Toda a geometria vive em `css/loader.css` e deriva de uma escala única, `--k`. A transição entre rotas declara `--k: 0.58` e reaproveita a mesma peça reduzida, em vez de manter dois conjuntos de medidas.

### Paleta do cubo

As seis faces foram amostradas da arte oficial da marca, que ocupa a faixa entre o ciano e o verde-menta. Como não há seis matizes distintos ali, a separação é por luminosidade: `#effdff`, `#a5ffd0`, `#4defab`, `#12c98f`, `#0a8f9c` e `#0a4f66`. Os valores são tokens em `css/tokens.css` e servem ao cubo do carregamento e ao cubo interativo da tela inicial. O cubo embaralhado permanece legível, que é a condição para ele continuar sendo um cubo e não um enfeite.

### Acervo: cinco questões por assunto, em todos eles

O acervo tinha assuntos mais servidos que outros — 12 tópicos com dez questões principais e 27 com cinco. A terceira leva corrige isso pela regra mais simples possível: **cinco questões novas para cada tópico, sem exceção**. São 195 questões autorais, e o total foi de 306 para 501.

A regra está travada por teste: `tests/content.test.mjs` exige exatamente cinco questões de origem `AUTORAL_LEVA_3_2026_08` em cada tópico. Um assunto novo que entre no acervo sem as suas cinco derruba a suíte.

### PDFs de provas anteriores — avaliado e não executado

O pedido era verificar a viabilidade e não fazer se ela não existisse. Não existe, por quatro razões independentes:

1. **Teto de armazenamento.** O projeto `dynamic-ck` no Neon tem `branch_logical_size_limit` de **512 MB**, com cerca de 32 MB já em uso. Um único ano de aplicação do ENEM, com os dois dias e as versões oficiais por cor, ocupa entre 60 e 100 MB em PDF. Menos de cinco anos de provas encheriam o branch — e o histórico de seis horas de WAL multiplica cada regravação.
2. **A aplicação não lê conteúdo do banco.** O acervo é servido por módulos ES estáticos. O Postgres atende apenas à sincronização cifrada, em `api/sync.js` e `api/limpeza.js`. Guardar PDFs em `bytea` e servi-los por função serverless não teria como chegar à tela: sem requisição por faixa, sem cache de borda e com limite de tempo e de tamanho por invocação.
3. **Contrato editorial.** O acervo declara, em cada item e na tela pública de saúde do conteúdo, que nenhuma questão foi copiada de prova oficial. Hospedar os PDFs oficiais muda essa posição e é uma decisão de licenciamento do dono do projeto, não uma escolha de implementação.
4. **Acesso à rede.** A política de rede deste ambiente recusa a conexão com `download.inep.gov.br` e `www.gov.br` (403 no CONNECT). Nem para verificar tamanho real de arquivo seria possível.

**Alternativa recomendada, se o assunto voltar:** apontar para a página oficial do INEP a partir da tela de simulados, sem hospedar arquivo. Custo zero de armazenamento, sem questão de licenciamento e sempre na versão vigente.

## Estado do conteúdo

- 4 áreas, 11 disciplinas, **39 tópicos completos**, **501 questões** (450 principais e 51 de recuperação) e 234 blocos de conteúdo.
- Todo tópico tem exatamente dez questões principais e uma de recuperação. Nenhum assunto é mais servido que outro.
- Toda matéria cadastrada tem pelo menos um tópico e pelo menos cinco questões — verificado por teste.
- Cada tópico tem os cinco formatos cognitivos entre as questões principais, dois níveis de dificuldade ou mais, gabarito único, explicação e justificativa por alternativa.
- O acervo declara origem e licença em cada item e não copia enunciados oficiais.

## Riscos e limites conhecidos

- Não existe pipeline de bundling ou minificação; a disciplina de imports é protegida por teste próprio.
- O catálogo é autoral de desenvolvimento e ainda precisa de revisão editorial especializada antes de uso como material oficial.
- A conta é **local ao navegador**. Não há autenticação de servidor, e a interface diz isso: sem e-mail de confirmação e sem recuperação de senha. Cross-device continua sendo o código de sincronização cifrado.
- Sem `crypto.subtle` (contexto não seguro), a senha não pode ser protegida; a interface informa e oferece conta sem senha em vez de fingir proteção.
- Canvas e CSS 3D dependem da capacidade do navegador, por isso há redução de densidade, pausa fora de foco e modos sem animação.
- Com `cleanUrls` ativo na hospedagem, links terminados em `.html` sofrem um redirecionamento antes de servir a página. É o comportamento já existente e permanece aceitável.
- GitHub Pages não executa as funções de sincronização em `api/`; nesse destino, a configuração de sync deve ser desligada.

## Resultado da auditoria

Não foi necessária uma reconstrução. O incremento é modular: as regras de negócio, o motor de recomendação, o estado e as telas seguem intactos. O que mudou foi a fronteira — como o estudante entra, como as telas são carregadas e quanto conteúdo existe do outro lado.

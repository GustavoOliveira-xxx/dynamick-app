# Auditoria do projeto — Dynamic CK

Atualizada em 23 de agosto de 2026 (segundo incremento).

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

## Estado do conteúdo

- 4 áreas, 11 disciplinas, **39 tópicos completos**, **306 questões** (255 principais e 51 de recuperação) e 234 blocos de conteúdo.
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

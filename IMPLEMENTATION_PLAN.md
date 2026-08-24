# Plano de implementação

Atualizado em 24 de agosto de 2026. O pedido explícito de implementação substitui a pausa de aprovação inicial prevista na especificação.

---

## Terceiro incremento — o cubo na tela de carregamento e cinco questões por assunto

### O que foi executado

1. **A tela de carregamento passou a ser o cubo que se abre.** O halo cônico, o anel de energia e a varredura de luz saíram; entraram oito peças de seis faces que giram montadas, se afastam revelando a logo no centro e voltam a fechar. A peça é a mesma nos dois lugares em que a tela existe: escrita no HTML de 15 documentos, para aparecer na primeira pintura, e reconstruída por `js/ui/loader.js` nas transições internas. Toda a geometria e o tempo vivem em `css/loader.css`, de modo que as duas versões não podem divergir.
2. **Uma escala só para a peça.** O palco reduzido da transição entre rotas reaproveita o mesmo cubo. Em vez de dois tamanhos soltos, existe agora `--k`: a transição declara `--k: 0.58` e o cubo inteiro — peças, distância de abertura, perspectiva e logo — encolhe junto.
3. **As cores do cubo saíram da fábrica e vieram da marca.** As seis faces foram amostradas da própria arte oficial, que vive entre o ciano e o verde-menta. Como a arte não tem seis matizes distintos, as faces se separam por luminosidade — do gelo ao azul-petróleo, em degraus de dez a quinze pontos. Os valores são tokens em `css/tokens.css` e servem tanto ao cubo do carregamento quanto ao cubo interativo da tela inicial.
4. **Cinco questões novas para cada assunto de cada matéria.** Não para os mais servidos: para todos os 39 tópicos, sem exceção. São 195 questões autorais em cinco arquivos (`js/data/questions-leva3-*.js`), cada uma com os cinco formatos cognitivos por tópico, dois níveis de dificuldade ou mais, justificativa por alternativa, explicação, origem e licença. O acervo passou de 306 para 501 questões.
5. **A promessa virou teste.** `tests/content.test.mjs` ganhou uma verificação que exige exatamente cinco questões da terceira leva em cada tópico. Um assunto novo que entre no acervo sem receber as suas cinco derruba a suíte.
6. **PDFs de provas anteriores: avaliado e não feito.** O relatório está em `PROJECT_AUDIT.md`. Em resumo: o branch do Neon tem teto de 512 MB, a aplicação não lê conteúdo do banco em tempo de execução e o acervo declara não copiar enunciado oficial. A instrução era não fazer se não fosse viável.

### Critérios de aceitação

- A tela de carregamento mostra o cubo se abrindo com a logo dentro, na primeira pintura, sem depender de JS.
- A mesma peça aparece reduzida na transição entre rotas, com a proporção preservada.
- As faces do cubo usam a paleta da marca, e o cubo embaralhado continua legível — seis faces distinguíveis.
- Movimento reduzido mantém a tela legível: a logo fica visível e parada, sem peça apagada.
- Todo tópico do acervo tem cinco questões da terceira leva, dez questões principais e uma de recuperação.
- Nenhum slug de questão se repete; nenhuma explicação cita alternativa por letra; nenhuma duplicata.
- Suíte, verificação de imports e regeneração do seed passam sem erro.

### Resultado verificado

- 149 testes automatizados passando; nenhum import quebrado.
- 39 tópicos, **501 questões** (450 principais e 51 de recuperação), 11 matérias, zero duplicatas.
- Gabarito distribuído entre 91 e 109 ocorrências por posição em 501 questões — nenhuma posição passa de 22%.
- Dez telas percorridas em navegador headless, sem erro de console.

---

## Segundo incremento — conta, páginas, carregamento, cubo e acervo

### O que foi executado

1. **Conta e entrada.** Criar `js/core/account.js` (contas locais, sessão, modo convidado, senha protegida por PBKDF2-SHA-256 com sal), dar espaço de nomes por conta ao `js/core/store.js` e escrever `entrar.html` com três abas: Entrar, Criar conta e Tenho um código. Separar o guarda de rota em `requireAccount` e `requireOnboarding`, para que "Entrar" volte ao estudo em vez de recomeçar o onboarding.
2. **Divisão em páginas.** Transformar a área de estudo em 13 documentos, um por área. Criar `js/core/pages.js` (mapa rota → arquivo), `js/core/shell.js` (casca comum) e `js/pages/*.js` (registro de rotas por documento). Traduzir `href="#/rota"` para o arquivo correto dentro de `el()`, em um lugar só. Manter `app.html` como redirecionador dos endereços antigos.
3. **Tela de carregamento.** Criar `css/loader.css`, carregado antes do restante do CSS e sem dependência de JS, com a logo do produto animada — halo cônico, anel de energia que se forma, varredura de luz sobre a arte e lettering escalonado. Reconstruir a mesma peça em `js/ui/loader.js` para transições internas e para a saída rumo a outro documento.
4. **Cubo mágico interativo.** Substituir `js/ui/knowledge-cube.js` por `js/ui/rubik-cube.js`: 26 peças com orientação própria em matrizes inteiras, cores originais do cubo, giro livre por arraste com inércia, giro de camada pelo gesto sobre a peça, controle por teclado, embaralhar e montar. Fixar na tela inicial e no hero da landing.
5. **Acervo.** Criar `js/data/topic-factory.js` e escrever 27 tópicos novos, cobrindo os assuntos previstos no escopo que ainda não existiam e abrindo Literatura, História e Filosofia. Cada tópico com resumo, explicação, dois exemplos resolvidos, três erros comuns, autoexplicação, cinco questões principais nos cinco formatos cognitivos e uma de recuperação.
6. **Correções.** Query string preservada na resolução de links, slugs de questão sem colisão, rebalanceamento de gabarito com duas sementes independentes, questão comparativa sem referência a letra e alinhamento do formulário de conta. Registro em `BUGS_FOUND.md`.
7. **Verificação.** Suíte automatizada, verificação de imports, regeneração do seed do banco e percurso real no navegador — entrada, criação de conta, onboarding, início, mapa, tópico, sessão, correção, recarregar no meio da sessão, navegação entre documentos e endereços antigos.

### Critérios de aceitação

- Clicar em "Entrar" abre uma tela de acesso, nunca o onboarding.
- Quem tem sessão aberta recebe "continuar" como ação principal, com a opção de trocar de conta.
- Senha nunca é gravada em texto claro; sem `crypto.subtle`, a interface diz isso e oferece conta sem senha.
- Duas contas no mesmo navegador não veem nem apagam o progresso uma da outra.
- Todo endereço antigo (`app.html#/rota`) chega ao documento certo, sem parada extra no histórico.
- Digitar uma rota de outro documento na barra de endereços leva à página correta em vez de "não encontrado".
- A tela de carregamento aparece na primeira pintura de cada documento e ao clicar em um link que troca de documento.
- Movimento reduzido mantém a tela de carregamento legível, sem varredura nem rotação.
- O cubo é operável por mouse, toque e teclado, não cobre conteúdo e libera timers e ouvintes ao sair da tela.
- Toda matéria cadastrada tem pelo menos um tópico e cinco questões.
- Cada tópico novo tem os cinco formatos cognitivos, gabarito único, explicação, justificativa por alternativa, origem e licença.
- Suíte, verificação de imports e regeneração do seed passam sem erro; console do navegador sem erros ou requisições falhas.

### Resultado verificado

- 147 testes automatizados passando; 78 módulos sem import quebrado.
- 39 tópicos, 306 questões, 11 matérias cobertas, nenhuma lacuna de conteúdo ou de habilidade na tela de saúde do acervo.
- Percurso completo executado em navegador headless, sem erro de console ou requisição falha.

---

## Primeiro incremento — movimento e expansão editorial

1. Auditar a aplicação e preservar rotas, estado, componentes, conteúdo e marca que já atendiam à especificação.
2. Criar transições curtas entre rotas, com cancelamento seguro e foco devolvido ao conteúdo principal.
3. Criar um loader contextual inspirado na marca, com textos adequados à rota de destino.
4. Enriquecer o fundo único com auroras, grade em perspectiva, poeira, órbitas e sinais de energia, sem multiplicar cenas pesadas.
5. Inserir um cubo CSS 3D no hero e no loader, sem biblioteca nem WebGL.
6. Acrescentar cinco questões autorais a cada um dos 12 tópicos completos e integrar a nova origem à tela de saúde do conteúdo.
7. Corrigir textos de explicação que dependiam da letra antiga do gabarito e cobrir o caso por teste.

---

## Próximos incrementos recomendados

- Submeter as questões da segunda leva a revisão independente de especialistas por área.
- Testar o gesto de giro de camada do cubo em dispositivos físicos de tela pequena e ajustar o limiar de arraste se necessário.
- Avaliar o uso de um `<meta name="theme-color">` por documento e de `prefetch` das áreas mais visitadas, para reduzir a espera entre páginas.
- Medir em dispositivos reais de entrada a latência e o consumo energético do fundo, para ajustar densidade por classe de hardware.
- Acrescentar testes visuais versionados quando existir infraestrutura de CI com navegador.
- Expandir o catálogo somente em blocos completos, mantendo o mesmo contrato editorial e a transparência de cobertura.

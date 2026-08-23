# Plano de implementação

Atualizado em 23 de agosto de 2026. O pedido explícito de implementação substitui a pausa de aprovação inicial prevista na especificação.

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

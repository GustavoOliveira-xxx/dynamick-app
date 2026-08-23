# Plano de implementação — movimento e expansão editorial

Atualizado em 23 de agosto de 2026. O pedido explícito de implementação deste incremento substitui a pausa de aprovação inicial prevista na especificação.

## Incremento executado

1. Auditar a aplicação e preservar rotas, estado, componentes, conteúdo e marca que já atendiam à especificação.
2. Criar transições curtas entre rotas, com cancelamento seguro quando o estudante navega rapidamente e foco devolvido ao conteúdo principal.
3. Criar um loader contextual inspirado na marca, reutilizando o cubo de conhecimento e textos adequados à rota de destino.
4. Enriquecer o fundo único com auroras, grade em perspectiva, poeira, órbitas e sinais de energia, sem multiplicar cenas pesadas.
5. Inserir um cubo mágico CSS 3D no hero e no loader, sem biblioteca nem WebGL.
6. Acrescentar cinco questões autorais a cada um dos 12 tópicos completos e integrar a nova origem à tela de saúde do conteúdo.
7. Corrigir textos de explicação que dependiam da letra antiga do gabarito e cobrir o caso por teste.
8. Validar testes automatizados, imports, sintaxe, integridade, responsividade, navegação real, imagens, console e preferências de movimento reduzido.

## Critérios de aceitação

- Toda troca de rota mostra movimento contextual sem impedir navegação ou foco.
- Navegações concorrentes não deixam loader antigo sobre a tela nova.
- `prefers-reduced-motion`, a opção “Sempre reduzir” e o modo visual reduzido eliminam movimento não essencial.
- A landing, o dashboard e o mapa têm presença visual distinta, mas usam uma única cena pesada.
- O cubo é decorativo, não intercepta cliques e conserva uma apresentação estática quando o movimento está reduzido.
- Não há rolagem horizontal em 390 px nem imagem quebrada nas páginas verificadas.
- Cada tópico tem exatamente cinco questões da expansão, além do material já existente.
- Toda questão tem cinco alternativas, um único gabarito, explicação, habilidade, origem, licença e justificativas.
- A suíte, a verificação de imports, a sintaxe e a verificação de whitespace passam sem erro.

## Próximos incrementos recomendados

- Submeter as 60 questões novas a revisão independente de especialistas por área.
- Medir em dispositivos reais de entrada a latência e o consumo energético do fundo para ajustar densidade por classe de hardware.
- Acrescentar testes visuais versionados quando existir infraestrutura de CI com navegador.
- Expandir o catálogo somente em blocos completos, mantendo o mesmo contrato editorial e a transparência de cobertura.

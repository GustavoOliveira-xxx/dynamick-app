# Bugs encontrados durante o incremento

Atualizado em 23 de agosto de 2026.

## CK-001 — Explicação citava uma letra de gabarito que podia mudar

- Status: corrigido e coberto por teste.
- Reprodução: abrir uma questão cujo gabarito foi rotacionado por `js/data/content.js` e comparar a letra correta exibida com frases como “A resposta é A” no texto explicativo.
- Impacto: a correção funcional estava certa, mas a explicação podia contradizer a posição visual da alternativa e reduzir a confiança do estudante.
- Causa: parte do conteúdo-base foi redigida com letra fixa antes da rotação determinística de alternativas.
- Correção: remover da explicação a referência à letra e preservar a justificativa conceitual, que independe de posição.
- Prevenção: `tests/answer-key.test.mjs` rejeita novas explicações com esse padrão.

## CK-002 — Cubo do hero invadia conteúdo em largura móvel

- Status: corrigido e verificado em 390 × 844 px.
- Reprodução: abrir a landing em viewport móvel após a primeira inserção do cubo; sua área decorativa tocava o cartão principal.
- Impacto: composição apertada e risco de competir visualmente com o primeiro conteúdo.
- Causa: o deslocamento calculado para desktop foi reaproveitado no breakpoint móvel.
- Correção: reservar espaço vertical específico, reduzir a escala e reposicionar o cubo no breakpoint móvel.
- Verificação: o cubo ficou separado do cartão e a página permaneceu sem rolagem horizontal.

## Pendências

Nenhum defeito bloqueante conhecido neste incremento. A revisão editorial independente das questões e testes em dispositivos físicos permanecem recomendações de qualidade, não correções de bug.

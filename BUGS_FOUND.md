# BUGS_FOUND.md — Dynamic CK

Registro exigido pela §21 do prompt mestre: para cada problema encontrado, a
reprodução, o impacto, a causa provável, a correção, o teste criado e o status.

Este arquivo cobre o que foi encontrado **durante o desenvolvimento**, por verificação
manual, pela suíte automatizada e pela auditoria de interface. Ele não é uma lista de
suposições: cada item abaixo foi observado de fato.

---

## Corrigidos

### #1 — Perfil "Treinador de desempenho" sugerido para quem tem dois anos até a prova

- **Reprodução:** responder o onboarding como estudante organizado, com cronograma
  externo, 5 dias por semana, boa base percebida e horizonte "ENEM 2027".
- **Impacto:** o estudante recebia um perfil focado em simulados, tempo e alta
  dificuldade — exatamente o que a Etapa 13 do prompt proíbe induzir em quem ainda tem
  fundamentos a construir.
- **Causa:** o motor de perfil pontuava apenas por distância entre dimensões. Autonomia
  alta + base percebida alta bastavam para vencer, sem nenhum sinal de proximidade da
  prova entrar na conta.
- **Correção:** conceito de **premissa de perfil** (`PROFILE_PREMISES`). Um perfil cuja
  premissa não é atendida não é *sugerido automaticamente*, mas continua disponível para
  escolha manual na tela de comparação, com o motivo visível. Hoje há uma premissa:
  *Treinador de desempenho* exige prova em menos de 6 meses ou ENEM já realizado.
- **Teste:** `src/lib/profile/engine.test.ts` → cenário 2 dos perfis obrigatórios.
- **Status:** corrigido.

### #2 — Etapa do onboarding com "nenhuma das opções" marcada era tratada como não respondida

- **Reprodução:** na etapa F (o que atrapalha), não marcar nenhuma caixa e continuar.
- **Impacto:** a etapa contava como em branco, a confiança da classificação caía de alta
  para média e o estudante via um perfil marcado como "provisório" sem motivo.
- **Causa:** `answeredSteps` considerava lista vazia equivalente a ausência de resposta.
- **Correção:** uma lista vazia enviada pelo formulário passa a contar como resposta —
  "nenhuma dessas" é uma resposta legítima. Só texto vazio continua não contando.
- **Teste:** `src/lib/profile/engine.test.ts` → "2. estudante organizado com rotina própria"
  exige confiança `high` com `frictions: []`.
- **Status:** corrigido.

### #3 — `catch` vazio no script de aparência escondia falha silenciosamente

- **Reprodução:** forçar erro no script inline que aplica tema/contraste antes da pintura.
- **Impacto:** a preferência falhava sem qualquer sinal — exatamente o padrão que a §20.1
  proíbe ("não esconda bugs com try/catch vazio").
- **Causa:** `}catch(e){}` no script inline.
- **Correção:** o `catch` passa a marcar `data-appearance="failed"` no `<html>`. A página
  continua utilizável no tema padrão e a falha fica observável.
- **Teste:** `scripts/audit-dead-ui.mjs` falha o build se um `catch {}` vazio voltar.
- **Status:** corrigido.

### #4 — Comparação impossível na resolução de denúncias

- **Reprodução:** revisar o código de `resolveReportAction`.
- **Impacto:** `resolvedAt` nunca seria nulo ao mover uma denúncia para "em análise",
  porque a comparação era contra um valor fora do domínio do campo.
- **Causa:** comparação `status === 'open'` num campo cujo tipo já excluía `'open'`.
- **Correção:** comparar contra `'reviewing'`, que é o estado que realmente mantém a
  denúncia sem data de resolução.
- **Teste:** detectado pelo `tsc --noEmit` (TS2367); o typecheck faz parte de `npm run verify`.
- **Status:** corrigido.

### #5 — Prop inexistente em `<Card>` passava despercebida

- **Reprodução:** `<Card style-data-resolved={...}>` no cartão do caderno de erros.
- **Impacto:** atributo morto — nenhum efeito visual, falsa impressão de que o estado
  resolvido estava sendo estilizado.
- **Causa:** atributos JSX com hífen escapam da checagem de tipos do TypeScript.
- **Correção:** atributo removido; o estado resolvido já é comunicado por texto e badge.
- **Status:** corrigido.

### #6 — Seed abortava com dupla vírgula ao concatenar arquivos de tópicos

- **Reprodução:** gerar os arquivos de tópicos por concatenação programática.
- **Impacto:** array com elemento `undefined`, que quebraria o seed em tempo de execução.
- **Causa:** vírgula duplicada ao juntar blocos.
- **Correção:** corrigido e coberto pelo typecheck (`Type 'undefined' is not assignable`).
- **Status:** corrigido.

### #7 — Conflito de dependências impedia a instalação

- **Reprodução:** `npm install` com `@playwright/test@1.50.1`.
- **Impacto:** instalação falhava com ERESOLVE; nada rodava.
- **Causa:** `next@15.5.23` declara peer `@playwright/test@^1.51.1`.
- **Correção:** pin em `1.56.1`, a mesma versão do Playwright já instalado no ambiente —
  o que também evita baixar outro Chromium.
- **Status:** corrigido.

---

## Encontrados na suíte automatizada e classificados como problema do teste, não do produto

### #8 — `innerText` do Chromium devolve texto com `text-transform` aplicado

- **Sintoma:** três verificações falhavam procurando "Duração estimada", "O que levou a
  essa sugestão" e "Como isso muda seus estudos".
- **Diagnóstico:** esses títulos usam `uppercase`. O `innerText` do Chromium devolve o
  texto **já transformado**, então a comparação sensível a maiúsculas falhava. A
  interface estava correta.
- **Ação:** as verificações passaram a comparar sem diferenciar caixa (função `has` em
  `e2e/fluxos-criticos.mjs`), e o motivo ficou documentado em `e2e/README.md` para não
  ser rediagnosticado depois.
- **Status:** resolvido no teste; nenhuma mudança no produto era necessária.

---

## Prevenidos por construção (verificados, não apenas assumidos)

Itens que a §20 lista como bugs frequentes e que foram testados no navegador:

| Item da §20 | Como está tratado | Verificado por |
| --- | --- | --- |
| Sessão duplicada ao atualizar o navegador | chave de idempotência por usuário + tópico + minuto | e2e: recarregar mantém a mesma sessão |
| Gabarito visível antes de responder | correção só renderiza depois da tentativa gravada | e2e: "preparação não revela gabarito" |
| Envio duplicado ao terminar o tempo | guarda `timeExpired` no cliente **e** recusa no servidor se a execução já foi enviada | revisão de código + guarda dupla |
| Timer continuando após o envio | o intervalo é interrompido quando a questão é respondida | revisão de código |
| Botão permitindo múltiplos cliques | `Button` fica realmente `disabled` enquanto `loading` | componente único usado em todo o app |
| Rota administrativa acessível por usuário comum | `requireAdmin` no layout do servidor, antes de qualquer consulta | e2e: estudante recai em `/sem-acesso` |
| Alteração de outro usuário via manipulação de ID | toda ação confere posse antes de escrever | revisão de código em `session/actions.ts` e `notebook-actions.ts` |
| Senha ou segredo em resposta pública | exportação de dados testada contra `passwordHash` | e2e: "exportação não inclui senha" |
| XSS em conteúdo editorial | renderizador de markdown próprio, que nunca interpreta HTML bruto | `src/components/study/Markdown.tsx` |
| Rota inexistente / link morto | auditoria compara todo `href` interno com as rotas reais do app router | `npm run audit:ui` |
| Rolagem horizontal em tela pequena | tabelas rolam no próprio contêiner | e2e: 360px sem overflow |
| Sessão não invalidada após logout | `AuthSession.revokedAt` no servidor, não só remoção de cookie | revisão de código |
| Seeds duplicando registros | todos os upserts por identificador estável | três execuções seguidas com contagens idênticas |
| Perfil calculado com respostas ausentes | confiança baixa + perfil provisório + diagnóstico sugerido | testes unitários |
| Classificação automática sobrescrevendo escolha do usuário | `confirmedAt` bloqueia a sobrescrita em `syncProfileFromAnswers` | revisão de código |

---

## Em aberto

### #A — Suíte E2E não cobre leitor de tela real

- **Impacto:** navegação por teclado e semântica foram verificadas, mas não há teste com
  NVDA, VoiceOver ou TalkBack.
- **Próximo passo:** validação manual com pelo menos um leitor de tela antes de qualquer
  uso real.
- **Status:** aberto, registrado também em `/acessibilidade`.

### #B — Sem teste de queda de rede no meio de uma resposta

- **Impacto:** o estado é gravado por item, então a perda deve ser no máximo de uma
  questão — mas isso não foi exercitado com a rede realmente interrompida.
- **Próximo passo:** teste com `page.route` abortando a requisição da ação de resposta.
- **Status:** aberto.

### #C — Concorrência entre duas abas do mesmo usuário

- **Impacto:** duas abas na mesma sessão de estudo podem sobrescrever `currentIndex`.
  A resposta em si é idempotente por item, então não há perda de dado — o efeito visível
  seria a posição do cursor saltando.
- **Próximo passo:** avaliar bloqueio otimista por `updatedAt` na navegação.
- **Status:** aberto, impacto baixo.

### #D — Importação por CSV

- **Impacto:** o painel importa JSON validado; CSV foi pedido na §11.10 e não foi feito.
- **Status:** aberto, registrado no IMPLEMENTATION_PLAN.md (item 6.5).

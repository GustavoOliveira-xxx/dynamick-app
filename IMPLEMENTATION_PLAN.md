# IMPLEMENTATION_PLAN.md — Dynamic CK

Plano incremental exigido pela §9/§10 do prompt mestre. Cada incremento é pequeno,
executável e verificável, e só é considerado concluído quando tem os quatro estados
(carregando, vazio, erro, sucesso), comportamento responsivo e teste correspondente (§12).

Legenda: `[x]` concluído · `[~]` parcial · `[ ]` pendente

---

## Sprint 0 — Auditoria e fundação

| # | Incremento | Critério de aceite | Status |
| --- | --- | --- | --- |
| 0.1 | Auditar repositório e registrar em `PROJECT_AUDIT.md` | Documento lista stack, scripts, env, limitações, riscos e a ausência das logos | `[x]` |
| 0.2 | `ONBOARDING_SPEC.md` com telas, perguntas, opções, regras, perfis, mensagens e acessibilidade | Cada etapa A–H tem pergunta, opções, peso e mensagem | `[x]` |
| 0.3 | Fundação técnica: Next+TS+Tailwind+Prisma+Vitest, tokens visuais, layout raiz | `npm run typecheck` e `npm test` passam; `npm run build` gera build de produção | `[x]` |
| 0.4 | Schema Prisma com as entidades da §6 | `prisma db push` cria o banco; relações e índices presentes | `[x]` |
| 0.5 | Camada de marca substituível + fallback marcado | Trocar `useOfficialAssets` troca a marca em todo o app sem editar telas | `[x]` |
| 0.6 | Autenticação (cadastro, login, logout, sessão em cookie assinado, guarda de rota no servidor) | Rota protegida redireciona anônimo; admin recusa usuário comum com 403 no servidor | `[x]` |

## Sprint 1 — Onboarding e conteúdo inicial

| # | Incremento | Critério de aceite | Status |
| --- | --- | --- | --- |
| 1.1 | Motor de perfil determinístico e explicável (`lib/profile`) | Testes unitários cobrem os 7 perfis de teste obrigatórios da §"Perfis de teste obrigatórios" | `[x]` |
| 1.2 | Onboarding em etapas com salvamento parcial e retomada | Sair no meio e voltar retoma na mesma etapa sem perder respostas | `[x]` |
| 1.3 | Tela de confirmação de perfil (§19) com comparação e "não me identifiquei" | Escolha do usuário grava `ProfileConfirmation` e tem prioridade sobre a automática | `[x]` |
| 1.4 | Árvore de conteúdo (áreas, matérias, tópicos, habilidades) + mapa + página de tópico | Mapa mostra os 5 estados da §5.2; tópico mostra resumo, explicação, exemplos, erros comuns | `[x]` |
| 1.5 | Seed idempotente da base inicial (§11.2) | Rodar o seed 2× não duplica nada; quantidades mínimas atingidas | `[x]` |
| 1.6 | Navegação principal (Início, Conteúdos, Praticar, Revisar, Perfil) | Funciona em desktop (lateral) e celular (inferior) | `[x]` |

## Sprint 2 — Prática de questões

| # | Incremento | Critério de aceite | Status |
| --- | --- | --- | --- |
| 2.1 | Sessão de prática: preparação, resolução, navegação, marcar, anotar, abandonar | Atualizar a página no meio da sessão não perde resposta nem duplica a sessão | `[x]` |
| 2.2 | Registro de tentativa com primeira resposta ≠ resposta final, tempo e confiança | `Attempt` grava `firstAnswerId`, `answerId`, `timeSpentMs`, `confidence` | `[x]` |
| 2.3 | Correção explicada: alternativa correta, análise de cada distrator, tópico, habilidade | Modo aprendizagem corrige por questão; modo simulado só ao final | `[x]` |
| 2.4 | Pergunta "o que dificultou esta questão?" + ações curtas | Motivo grava `ErrorClassification`; ações levam a questão semelhante/conceito/caderno | `[x]` |
| 2.5 | Resultado da sessão (§ etapa 9) | Diferencia acerto com confiança, com dúvida e após troca de alternativa | `[x]` |

## Sprint 3 — Progresso, perfil observado e erros

| # | Incremento | Critério de aceite | Status |
| --- | --- | --- | --- |
| 3.1 | Domínio por tópico com os 5 estados e regra de "evidência em questões e sessões diferentes" | Uma única questão certa nunca marca "consolidado" | `[x]` |
| 3.2 | Caderno de erros com nota, motivo, conceito e ação | Cada item tem uma ação, não só estatística | `[x]` |
| 3.3 | Dimensões observadas do perfil atualizadas com justificativa legível | `ProfileSnapshot` guarda antes/depois + motivo em linguagem natural | `[x]` |
| 3.4 | Relatório do estudante (§5.14) | Poucos números, cada bloco com ação associada | `[x]` |

## Sprint 4 — Recomendações

| # | Incremento | Critério de aceite | Status |
| --- | --- | --- | --- |
| 4.1 | Motor de prioridade determinístico e explicável (§5.5) | Testes cobrem os 9 fatores e os limites anti-monopólio | `[x]` |
| 4.2 | Recomendação única no dashboard com justificativa legível | Sempre existe motivo textual; usuário pode ignorar | `[x]` |
| 4.3 | Plano semanal com blocos Aprender/Praticar/Revisar/Simular e replanejamento sem punição | Perder um dia recalcula sem mensagem de fracasso | `[x]` |
| 4.4 | Fila de revisão espaçada com "não lembro / lembro parcialmente / domino" | Revisão sempre inclui item novo ou reformulado | `[x]` |
| 4.5 | Sessões rápidas ("tenho pouco tempo") | Respeita o tempo informado como limite real | `[x]` |

## Sprint 5 — Simulados

| # | Incremento | Critério de aceite | Status |
| --- | --- | --- | --- |
| 5.1 | Gerador com matriz de distribuição e fallback quando faltam questões | Nunca repete item em excesso em silêncio; avisa o administrador | `[x]` |
| 5.2 | Execução: navegação, marcação, timer, retomada após queda | Timer não continua após envio; recarregar retoma o mesmo estado | `[x]` |
| 5.3 | Resultado por área, tópico e habilidade + análise de tempo + recomendação | Relatório aponta erros recorrentes e próximo passo | `[x]` |

## Sprint 6 — Painel editorial

| # | Incremento | Critério de aceite | Status |
| --- | --- | --- | --- |
| 6.1 | Autorização real no servidor para `/admin` | Usuário comum recebe 403 no servidor, não apenas botão escondido | `[x]` |
| 6.2 | CRUD editorial de questões com estados seed/draft/reviewed/published e auditoria | Publicar exige gabarito, explicação, classificação e licença | `[x]` |
| 6.3 | Tela de saúde do banco (§11.10) | Lista os 9 indicadores exigidos | `[x]` |
| 6.4 | Denúncias de conteúdo com fluxo de resolução | Denúncia gera item administrativo e registro da resolução | `[x]` |
| 6.5 | Importação validada por JSON | Importação rejeita item inválido com mensagem por linha | `[~]` importador JSON pronto; CSV pendente |

## Sprint 7 — Redação e IA opcional

| # | Incremento | Critério de aceite | Status |
| --- | --- | --- | --- |
| 7.1 | Temas, repertório, planejamento, rascunho, checklist e histórico | 8 temas autorais; rascunho salva versões | `[x]` |
| 7.2 | Correção automática por IA | **Não implementada por decisão** — §7 do prompt só autoriza depois do ciclo objetivo validado | `[ ]` |

## Etapa contínua — Protocolo antibugs (§20/§21)

| # | Incremento | Status |
| --- | --- | --- |
| C.1 | Testes unitários das regras (perfil, recomendação, domínio, revisão, simulado) | `[x]` |
| C.2 | Testes E2E dos fluxos críticos | `[x]` `e2e/fluxos-criticos.mjs` — 44 verificações, todas passando |
| C.3 | `BUGS_FOUND.md` com reprodução, impacto, causa, correção, teste e status | `[x]` |
| C.4 | Varredura de TODO, `console.log`, `href="#"`, handler vazio, rota não registrada | `[x]` script `scripts/audit-dead-ui.mjs` |

---

## Estado da verificação (§21)

| Passo do protocolo | Situação |
| --- | --- |
| 1. Tipos, lint e formatação | `npm run typecheck` limpo |
| 2. Testes unitários das regras | 80 testes passando |
| 3. Testes de integração de API, banco e autenticação | cobertos pelos fluxos E2E (login, exportação, autorização) |
| 4. Componentes e estados de erro | estados de carregamento/vazio/erro/sucesso em `components/ui/States.tsx`, usados nas telas |
| 5. End-to-end dos fluxos críticos | 44/44 verificações passando |
| 6. Build de produção | `npm run build` limpo |
| 7. Verificação em desktop e celular | E2E cobre 360px sem rolagem horizontal; teste em aparelho real pendente |
| 8. Animações reduzidas e sem WebGL | E2E roda com `reducedMotion: reduce`; não há WebGL a desabilitar (canvas 2D) |
| 9. Conexão lenta ou indisponível | **pendente** — registrado em BUGS_FOUND.md #B |
| 10. Revisão visual das telas principais | feita durante o desenvolvimento |
| 11. Console sem erros ou requisições falhadas | E2E coleta erros de console: nenhum |
| 12. Auditoria de botões, links e rotas sem função | `npm run audit:ui` limpo |

## Próximo incremento recomendado

1. Receber os arquivos oficiais das logos e ligar `useOfficialAssets`.
2. Teste com leitor de tela real e com rede interrompida (BUGS_FOUND.md #A e #B).
3. Importador CSV no painel administrativo (6.5).
4. Expandir a base autoral de 12 para ~30 tópicos completos, mantendo profundidade.
5. Migrar para PostgreSQL antes de qualquer uso com carga real.

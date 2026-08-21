# PROJECT_AUDIT.md — Dynamic CK

> Auditoria inicial exigida pela seção 9 e pela seção 16 do prompt mestre.
> Data da auditoria: 2026-08-21 · Branch: `claude/follow-pdf-prompt-5le3sf`

## 1. Estado do repositório encontrado

| Item | Situação encontrada |
| --- | --- |
| Commits | **Nenhum.** `git log` retornava "No commits yet" |
| Arquivos versionados | **Nenhum** (apenas `.git/`) |
| Stack pré-existente | **Não existia** |
| Autenticação | Não existia |
| Banco de dados | Não existia |
| Sistema de rotas | Não existia |
| Componentes reutilizáveis | Não existiam |
| Documentação do projeto | Não existia |
| CI / lint / testes | Não existiam |
| Assets de marca | **Ausentes** (ver §5) |

**Conclusão da auditoria:** não havia stack real para "não assumir". O repositório é
_greenfield_. Portanto a escolha de stack passou a ser uma decisão desta etapa, e está
registrada e justificada abaixo — em vez de ser assumida silenciosamente.

## 2. Stack escolhida e justificativa

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Framework | **Next.js 15 (App Router) + React 19** | Rotas, SSR, Server Actions e API em um único runtime. Permite proteger rotas administrativas no servidor (exigência §9) sem um backend separado. |
| Linguagem | **TypeScript (strict)** | Regras de negócio pedagógicas com muitas entidades relacionadas — tipagem reduz regressões silenciosas. |
| Estilo | **Tailwind CSS 3.4 + tokens CSS centralizados** | §3.9 exige tokens centralizados. Tailwind lê os tokens de `src/styles/tokens.css`; nenhum valor visual arbitrário é espalhado. |
| Banco | **SQLite via Prisma 6** (`DATABASE_URL`) | Zero infraestrutura para desenvolver e testar; o schema Prisma é portável para PostgreSQL trocando o `provider` (documentado em `.env.example`). |
| ORM/migrations/seed | **Prisma + `prisma db push` + seed idempotente** | §11.9 exige seeds idempotentes com identificadores estáveis. |
| Autenticação | **Sessão própria em cookie assinado (HMAC-SHA256, `httpOnly`, `sameSite=lax`) + bcrypt** | Evita dependência pesada; segredo em variável de ambiente; validação sempre no servidor (§9, §20.5). |
| Validação | **Zod**, compartilhado cliente/servidor | §9 exige validação nos dois lados a partir da mesma fonte. |
| Testes | **Vitest** (unitário/regra de negócio) + **Playwright** (E2E) | Playwright já está pré-instalado no ambiente (`/opt/pw-browsers`). |
| 3D / movimento | **Canvas 2D com projeção 3D própria + CSS 3D + SVG animado** | Ver §4 — decisão deliberada. |

### Dependências instaladas (mínimo necessário)
`next`, `react`, `react-dom`, `@prisma/client`, `prisma`, `bcryptjs`, `zod`,
`tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `tsx`, `vitest`, `@playwright/test`.

Nenhuma biblioteca de UI, de gráficos, de animação ou de estado global foi instalada.
Tudo o que é visual é componente próprio sobre os tokens.

## 3. Scripts disponíveis

| Script | O que faz |
| --- | --- |
| `npm run setup` | `prisma generate` + `db push` + seed (primeiro uso) |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `start` | Build e execução de produção |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Testes unitários (Vitest) |
| `npm run e2e` | Testes end-to-end (Playwright) |
| `npm run db:seed` / `db:reset` | Seed idempotente / recriação total do banco |
| `npm run verify` | typecheck + testes + build (protocolo da §21, passos 1–6) |

## 4. Decisão sobre 3D (§3.2 e §18.3) — e o risco assumido

O prompt pede "o máximo de 3D que seja tecnicamente justificável, mantendo desempenho e
acessibilidade" e explicitamente autoriza: *"Prefira objetos 3D leves, modelos otimizados,
SVGs animados, CSS 3D e canvas controlado quando forem suficientes."*

**Decisão:** a primeira versão usa **projeção 3D real calculada em canvas 2D**
(rotação em matriz, projeção em perspectiva, ordenação por profundidade) em vez de WebGL/three.js.

Motivos:
1. §18.3 exige que o app permaneça utilizável **se o WebGL falhar**. Canvas 2D não falha
   nos ambientes onde WebGL falha — o fallback e o caminho principal são o mesmo código.
2. Evita ~150 kB de JS na rota mais visitada (landing) e o risco de vazamento de memória
   de cenas WebGL, citado explicitamente na §18.3.
3. As formas pedidas (núcleo de energia, rede de conhecimento, linhas orbitais,
   partículas verde-teal, esfera de conexões) são geometricamente simples — não exigem
   materiais, luzes ou modelos importados.

**Risco assumido e registrado:** não haverá sombras, materiais PBR nem modelos `.glb`.
Se o dono do projeto quiser um hero com modelo 3D importado, a camada
`src/components/visual/` foi isolada para que uma cena WebGL possa ser adicionada
por trás da mesma API (`<KnowledgeScene intensity=... />`), com `dynamic import` e
`prefers-reduced-motion` já resolvidos.

## 5. Assets de marca — **ausência registrada** (exigência da §18)

As logos oficiais (DynamiCK e Conscious Knowledge) foram **exibidas na conversa, mas não
existem como arquivos no repositório**. Conforme a §18, não foi inventada uma logo
definitiva. Foi criado um **fallback provisório e claramente marcado**:

- `src/components/brand/` — camada de marca substituível (único lugar com SVG/cores da marca).
- `public/assets/brand/dynamick/` e `public/assets/brand/conscious-knowledge/` — pastas
  criadas com `README.md` explicando exatamente quais arquivos colocar e com quais nomes.
- Os componentes leem `BRAND_ASSETS` (`src/components/brand/assets.ts`). Ao colocar os
  arquivos oficiais nas pastas e trocar `useOfficialAssets` para `true`, todo o app passa
  a usar as imagens reais **sem tocar em nenhuma tela**.
- Todo fallback exibe o atributo `data-brand-fallback="true"` para auditoria visual.

**Pendência aberta:** enviar `logo-full.png/svg`, `logo-compact`, `symbol`, `mono` e
`favicon` das duas marcas.

## 6. Variáveis de ambiente

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `DATABASE_URL` | sim | Conexão Prisma (`file:./dev.db` em desenvolvimento) |
| `SESSION_SECRET` | sim em produção | Chave HMAC do cookie de sessão. Em desenvolvimento há um valor de fallback **que emite aviso** e é recusado em produção. |
| `NEXT_PUBLIC_APP_NAME` | não | Nome exibido (padrão `Dynamic CK`) |
| `SEED_DEMO_PASSWORD` | não | Senha dos usuários de demonstração do seed (padrão `demo1234`) |

Nenhum segredo é exposto ao cliente. Nenhuma variável `NEXT_PUBLIC_*` carrega segredo.

## 7. Limitações conhecidas desta base

1. **SQLite** não suporta escrita concorrente pesada. Aceitável para desenvolvimento e
   demonstração; migrar para PostgreSQL antes de produção (schema já é compatível).
2. **Sem envio de e-mail** — a recuperação de acesso gera um token exibido no fluxo de
   desenvolvimento em vez de enviado por e-mail. Está marcado na interface.
3. **Sem IA** — a §7/sprint 7 do prompt só autoriza IA após o ciclo objetivo estar validado.
   Nenhuma chave de IA é usada e nenhuma correção automática de redação é prometida.
4. **Conteúdo é semente de desenvolvimento**, autoral, marcado com `origin = "AUTORAL_SEED"`.
   Não representa cobertura completa do ENEM e a interface diz isso ao usuário.
5. **Sem professor/mentor** — §3.6 do prompt marca essa função como fase futura.

## 8. Riscos acompanhados

| Risco | Mitigação adotada |
| --- | --- |
| Movimento/3D prejudicando leitura de questões | Intensidade visual por rota (§18.3); tela de questão em intensidade mínima; `prefers-reduced-motion` e "modo visual reduzido" persistido no perfil |
| Perfil virar rótulo permanente | Perfil provisório + confirmação explícita + `ProfileSnapshot` com justificativa + escolha do usuário tem prioridade sobre a automática |
| Recomendação virar caixa-preta | Motor determinístico com `reason` legível gravado junto da recomendação |
| Perda de progresso em queda de rede | Estado da sessão persistido por tentativa, com chave de idempotência por item |
| Seeds duplicando dados | Todos os seeds usam `upsert` por identificador estável (`slug`/`externalId`) |
| Conteúdo de terceiros sem licença | Campo obrigatório `origin` + `license` em `Question`; publicação bloqueada sem eles |

## 9. Dúvidas não bloqueadoras (resolvidas com escolha razoável e reversível)

1. Banco: SQLite agora, Postgres depois — reversível trocando `provider`.
2. Auth própria em vez de provedor externo — reversível, isolada em `src/lib/auth/`.
3. Português do Brasil como idioma único da primeira versão (o seletor de idioma existe na
   configuração, mas só `pt-BR` está disponível e a interface deixa isso explícito).
4. 3D em canvas 2D — ver §4.

## 10. Dúvidas realmente bloqueadoras (precisam do dono do projeto)

1. **Arquivos das logos oficiais** (§5). Enquanto não chegarem, a marca é provisória.
2. **Licenciamento de conteúdo de terceiros**: a primeira leva é 100% autoral. Se houver
   intenção de importar questões oficiais do ENEM, é preciso a definição jurídica de uso
   antes de qualquer importador ser ligado.
3. **Público menor de idade**: se a plataforma atenderá menores de 16 anos, é preciso
   definir o fluxo de consentimento parental (LGPD art. 14) — hoje o cadastro pede
   apenas dados mínimos e não coleta dados sensíveis.

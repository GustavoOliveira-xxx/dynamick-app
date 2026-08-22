# Dynamic CK

Plataforma de estudos e preparação para o ENEM 2027.
Produto **Dynamic CK**, da empresa **Conscious Knowledge**.

> Não é um banco de questões. É um sistema de aprendizagem que guia o estudante por um
> ciclo contínuo: entender o que estudar → aprender o conceito → praticar → receber uma
> correção útil → identificar o motivo do erro → revisar → praticar uma situação
> diferente → acompanhar a evolução.

## Começar

```bash
npm install
cp .env.example .env      # ajuste SESSION_SECRET
npm run setup             # gera o client, cria o banco e roda o seed
npm run dev               # http://localhost:3000
```

### Contas de demonstração

Senha de todas: `demo1234` (configurável em `SEED_DEMO_PASSWORD`).

| E-mail | Cenário |
| --- | --- |
| `aluno.perdido@dynamick.local` | Perdido, com pouco tempo |
| `aluno.organizado@dynamick.local` | Rotina própria, histórico em 3 tópicos |
| `aluno.interpretacao@dynamick.local` | Boa base, erra por interpretação |
| `aluno.rotina-variavel@dynamick.local` | Abandona sessões longas |
| `aluno.confiante@dynamick.local` | Declara segurança, desempenho baixo |
| `aluno.inseguro@dynamick.local` | Declara insegurança, desempenho bom |
| `aluno.pulou-onboarding@dynamick.local` | Pulou o onboarding |
| `curadoria@dynamick.local` | **Administrador** — painel de curadoria |

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build e execução de produção |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Testes unitários das regras de negócio (Vitest) |
| `npm run audit:ui` | Auditoria de links mortos, botões sem ação, `console.log`, rotas inexistentes |
| `npm run e2e:fluxos` | Fluxos críticos no navegador (exige servidor de pé — ver `e2e/README.md`) |
| `npm run db:seed` | Seed idempotente |
| `npm run db:reset` | Recria o banco do zero e roda o seed |
| `npm run verify` | typecheck + testes + auditoria + build |

## Documentação do projeto

| Arquivo | Conteúdo |
| --- | --- |
| `PROJECT_AUDIT.md` | Estado encontrado, stack escolhida e justificada, variáveis de ambiente, limitações, riscos e dúvidas bloqueadoras |
| `ONBOARDING_SPEC.md` | Especificação do onboarding: telas, perguntas, opções, regras de classificação, perfis, mensagens e acessibilidade |
| `IMPLEMENTATION_PLAN.md` | Plano incremental com critérios de aceite e status por item |
| `BUGS_FOUND.md` | Bugs encontrados, causa, correção, teste e status |

## Estrutura

```
prisma/
  schema.prisma          modelo de dados (§6 do prompt mestre)
  seed.ts                seed idempotente
  seed/                  conteúdo autoral: áreas, tópicos, questões, redação, métodos
src/
  app/                   rotas (App Router)
    (auth)/              cadastro, login, recuperação
    (app)/               área autenticada: início, conteúdos, praticar, revisar, perfil, admin
    onboarding/          questionário em etapas + confirmação de perfil
    sessao/[id]/         resolução de questões e resultado
    experimentar/        demonstração sem conta
  components/
    brand/               CAMADA DE MARCA SUBSTITUÍVEL — ver §18
    visual/              fundo dinâmico, cena 3D em canvas, preferências visuais
    ui/                  botão, cartão, progresso, estados (carregando/vazio/erro/sucesso)
    study/               questão, correção, revisão, caderno, markdown
  lib/
    profile/             motor de perfil determinístico e explicável
    recommendation/      motor de recomendação por regras
    review/              domínio de tópico e revisão espaçada
    session/             criação de sessão, tentativas, resumo
    simulation/          gerador de simulados com matriz e fallback
    admin/               ações editoriais com auditoria
```

## Logos

As logos oficiais **ainda não estão no repositório**. A aplicação usa um fallback
provisório, marcado com `data-brand-fallback="true"` no HTML.

Para ligar as oficiais: coloque os arquivos em `public/assets/brand/` (veja o
`README.md` de lá) e troque `useOfficialAssets` para `true` em
`src/components/brand/assets.ts`. Nenhuma tela precisa ser editada.

## Decisões que valem saber

- **3D em canvas 2D, não WebGL.** A §18.3 exige que o app continue utilizável se o WebGL
  falhar. A cena da rede de conhecimento usa projeção em perspectiva calculada à mão, o
  que faz do caminho principal e do fallback o mesmo código. Justificativa completa no
  `PROJECT_AUDIT.md`.
- **Recomendação por regras, não por modelo.** Cada ponto de prioridade tem nome, peso
  declarado e uma frase legível que o estudante lê no início.
- **Conteúdo 100% autoral.** Nenhuma questão foi copiada de prova oficial, livro ou
  plataforma de terceiros. Origem e licença são campos obrigatórios.
- **Sem IA nesta versão.** A §7 do prompt só autoriza IA depois do ciclo objetivo
  validado. Não há correção automática de redação nem geração de conteúdo.
- **SQLite em desenvolvimento.** O schema é compatível com PostgreSQL; trocar exige
  apenas o `provider` e a `DATABASE_URL`.

## O que a plataforma não faz, por decisão

Não promete aprovação. Não estima nota oficial. Não usa ranking público. Não esconde por
que uma atividade foi recomendada. Não trata o perfil do estudante como diagnóstico
clínico ou rótulo permanente. Não bloqueia conteúdo por perfil.

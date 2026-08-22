# Banco de dados

Projeto Neon provisionado, esquema aplicado e verificado. **A aplicação ainda não usa
nada disto** — ela continua inteiramente em `localStorage`. Este diretório é o destino,
pronto para quando a sincronização entre aparelhos entrar no escopo.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `01-esquema.sql` | Esquema completo: 28 tabelas e 2 visões |
| `02-seed-acervo.sql` | O acervo inteiro, gerado a partir de `js/data/` |
| `gerar-seed.mjs` | Regenera o seed a partir de `js/data/` |

Com `--json`, o gerador também emite `db/acervo.json`, útil para um carregador via API que
não queira parsear SQL. Ele fica fora do repositório de propósito: é uma duplicata gerada
de `js/data/`, e arquivo gerado que fica versionado sai de sincronia em silêncio.

O seed é **derivado**, nunca editado à mão. A fonte da verdade continua sendo
`js/data/`. Para regenerar depois de mexer no conteúdo:

```bash
node db/gerar-seed.mjs          # só o SQL
node db/gerar-seed.mjs --json   # SQL + acervo.json
```

## Estado atual do banco

Aplicado e conferido por checksum contra os arquivos de origem:

| Tabela | Linhas |
| --- | --- |
| `areas` | 4 |
| `subjects` | 11 |
| `topics` | 12 |
| `skills` | 12 |
| `topic_prerequisites` | 9 |
| `topic_related` | 5 |

Falta carregar: `content_items`, `questions`, `question_options`, `study_methods`,
`session_templates`, `simulations`, `essay_prompts`.

## Carregar o resto

O ambiente onde este repositório foi montado bloqueia conexões Postgres diretas, então o
acervo pesado (270 KB de texto autoral) não pôde ser enviado de lá. De qualquer máquina
com acesso à internet:

```bash
psql "$DATABASE_URL" -f db/02-seed-acervo.sql
```

O arquivo é idempotente apenas uma vez: ele roda dentro de `BEGIN/COMMIT` e falha inteiro
se algo já existir. Para recarregar do zero, limpe antes:

```bash
psql "$DATABASE_URL" -c "TRUNCATE areas, subjects, topics, skills, topic_prerequisites, topic_related, content_items, questions, question_options, study_methods, session_templates, simulations, essay_prompts RESTART IDENTITY CASCADE;"
psql "$DATABASE_URL" -f db/02-seed-acervo.sql
```

## Conferir depois de carregar

```sql
SELECT * FROM catalog_health;      -- totais e lacunas do acervo
SELECT * FROM answer_key_balance;  -- distribuição do gabarito por posição
```

`answer_key_balance` existe por um motivo específico: o material autoral foi escrito com a
resposta correta na primeira alternativa em 69 das 84 questões. Se uma posição voltar a
concentrar mais de 30%, quem marca sempre a mesma letra acerta sem ler — e domínio, motivo
de erro e recomendação passam a medir ruído.

## Conexão

A string de conexão carrega a senha do papel `neondb_owner` e **não** está neste
repositório. Ela está no painel do Neon, em *Connection Details*, e deve ficar em
`.env` (que o `.gitignore` já ignora):

```
DATABASE_URL=postgresql://neondb_owner:SENHA@ep-....neon.tech/neondb?sslmode=require
```

## Desenho do esquema

Duas metades independentes:

**Acervo** — conteúdo editorial, igual para todo mundo. `areas` → `subjects` → `topics` →
`skills` / `content_items` / `questions` → `question_options`.

**Estudante** — o que cada pessoa fez. `students` como raiz, com `ON DELETE CASCADE` em
tudo que pendura nela: apagar um estudante apaga o rastro inteiro, sem sobras.

Regras do produto que viraram restrição do banco, e não só convenção de código:

- `question_options_one_correct` — índice único parcial que garante **exatamente uma**
  alternativa correta por questão. Gabarito quebrado não entra.
- `question_options.rationale NOT NULL` — justificativa obrigatória inclusive nas erradas.
  A correção precisa explicar por que cada distrator atrai.
- `attempts.first_answer` **e** `final_answer` — a primeira alternativa marcada nunca é
  sobrescrita. Trocar de resposta é um dado sobre o raciocínio e some se guardarmos só a última.
- `topic_mastery.distinct_questions` e `distinct_sessions` — "consolidado" exige questões
  distintas e mais de uma sessão. Domínio nunca vem de um acerto isolado.
- `study_sessions_idempotency` — recarregar a página não cria uma segunda sessão idêntica.
- `essays` **não tem coluna de nota**. Sem leitor humano, pontuar uma redação seria
  inventar um número.
- `simulation_runs.analysis` guarda desempenho por área, tópico, habilidade e tempo —
  nunca estimativa de nota do ENEM.
- `questions.origin` e `license` são `NOT NULL`: conteúdo sem procedência não entra.

## Quando ligar a aplicação nisto

Hoje, toda a persistência passa por [`js/core/store.js`](../js/core/store.js). Nenhuma tela
conhece `localStorage`. Ligar no banco é reimplementar aquele arquivo contra uma API —
`load`, `getState`, `update`, `subscribe`, `exportData`, `importData`, `clearAll`,
`watchOtherTabs`. As telas não mudam.

O que **não** existe ainda e é pré-requisito:

1. **Autenticação.** Sem ela, qualquer pessoa lê o progresso de qualquer outra.
2. **Uma API entre o navegador e o banco.** A string de conexão nunca pode ir para o
   cliente — quem tem ela tem o banco inteiro.
3. **Migração de quem já começou offline.** O `exportData()` atual serve de entrada.
4. **Reescrever `privacidade.html`.** A página hoje afirma que nada sai do aparelho. No
   dia em que sair, a promessa muda, e a mudança precisa ser anunciada antes.

-- =============================================================================
-- Dynamic CK — esquema Postgres
--
-- Espelha o estado que hoje vive no localStorage (js/core/store.js) mais o
-- acervo que hoje vive em arquivos (js/data/).  Os nomes de coluna repetem os
-- nomes dos campos em JavaScript de propósito: a tradução entre os dois lados
-- fica óbvia na hora de reimplementar o store contra uma API.
--
-- Duas metades independentes:
--   1. ACERVO   — conteúdo editorial, igual para todo mundo.
--   2. ESTUDANTE — o que cada pessoa fez, hoje preso a um navegador.
--
-- A aplicação continua funcionando sem nada disto. Este esquema é o destino,
-- não um requisito da versão atual.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- citext: e-mail não pode diferenciar maiúsculas de minúsculas.
CREATE EXTENSION IF NOT EXISTS "citext";

-- =============================================================================
-- 1. ACERVO
-- =============================================================================

CREATE TABLE areas (
  slug          text PRIMARY KEY,
  name          text NOT NULL,
  short_name    text NOT NULL,
  description   text,
  accent        text,
  display_order int  NOT NULL DEFAULT 0
);

CREATE TABLE subjects (
  slug          text PRIMARY KEY,
  area_slug     text NOT NULL REFERENCES areas(slug) ON DELETE CASCADE,
  name          text NOT NULL,
  display_order int  NOT NULL DEFAULT 0
);
CREATE INDEX subjects_area_idx ON subjects(area_slug);

CREATE TABLE topics (
  slug              text PRIMARY KEY,
  subject_slug      text NOT NULL REFERENCES subjects(slug) ON DELETE CASCADE,
  area_slug         text NOT NULL REFERENCES areas(slug)    ON DELETE CASCADE,
  name              text NOT NULL,
  summary           text NOT NULL,
  difficulty        text NOT NULL CHECK (difficulty IN ('intro', 'intermediate', 'challenging')),
  estimated_minutes int  NOT NULL DEFAULT 20,
  -- Peso de curadoria: quanto o tema recorre na prova. Entra na recomendação
  -- com peso deliberadamente baixo, para não sufocar o sinal do estudante.
  curation_weight   int  NOT NULL DEFAULT 50 CHECK (curation_weight BETWEEN 0 AND 100),
  display_order     int  NOT NULL DEFAULT 0,
  published         boolean NOT NULL DEFAULT true
);
CREATE INDEX topics_subject_idx ON topics(subject_slug);
CREATE INDEX topics_area_idx    ON topics(area_slug);

-- Pré-requisito e "relacionado" são relações entre tópicos, não campos de texto.
CREATE TABLE topic_prerequisites (
  topic_slug        text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  prerequisite_slug text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  PRIMARY KEY (topic_slug, prerequisite_slug),
  CHECK (topic_slug <> prerequisite_slug)
);

CREATE TABLE topic_related (
  topic_slug   text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  related_slug text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  PRIMARY KEY (topic_slug, related_slug),
  CHECK (topic_slug <> related_slug)
);

CREATE TABLE skills (
  slug        text PRIMARY KEY,
  topic_slug  text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  name        text NOT NULL,
  description text
);
CREATE INDEX skills_topic_idx ON skills(topic_slug);

CREATE TABLE content_items (
  slug          text PRIMARY KEY,
  topic_slug    text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  kind          text NOT NULL CHECK (kind IN (
                  'quick_summary', 'explanation', 'worked_example',
                  'common_mistakes', 'self_explanation', 'glossary')),
  title         text NOT NULL,
  depth         text NOT NULL CHECK (depth IN ('quick', 'standard', 'deep')),
  body          text NOT NULL,
  display_order int  NOT NULL DEFAULT 0
);
CREATE INDEX content_items_topic_idx ON content_items(topic_slug);

CREATE TABLE questions (
  slug                      text PRIMARY KEY,
  topic_slug                text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  skill_slug                text REFERENCES skills(slug) ON DELETE SET NULL,
  difficulty                text NOT NULL CHECK (difficulty IN ('intro', 'intermediate', 'challenging')),
  -- Formato cognitivo: cinco questões que só trocam números não avaliam a mesma
  -- habilidade em contextos diferentes. A seleção usa isto para variar.
  cognitive_format          text NOT NULL,
  -- Questão de recuperação: mesma habilidade, contexto novo, para depois do erro.
  is_recovery               boolean NOT NULL DEFAULT false,
  stem                      text NOT NULL,
  explanation_summary       text NOT NULL,
  explanation_detailed      text,
  explanation_strategy      text,
  explanation_concept_recap text,
  -- Origem e licença são obrigatórias: conteúdo sem procedência não entra.
  origin                    text NOT NULL DEFAULT 'AUTORAL_SEED',
  license                   text NOT NULL,
  published                 boolean NOT NULL DEFAULT true,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX questions_topic_idx     ON questions(topic_slug);
CREATE INDEX questions_skill_idx     ON questions(skill_slug);
CREATE INDEX questions_recovery_idx  ON questions(topic_slug, is_recovery);

CREATE TABLE question_options (
  question_slug text NOT NULL REFERENCES questions(slug) ON DELETE CASCADE,
  label         text NOT NULL CHECK (label IN ('A', 'B', 'C', 'D', 'E')),
  body          text NOT NULL,
  is_correct    boolean NOT NULL DEFAULT false,
  -- Justificativa obrigatória inclusive nas erradas: a correção precisa explicar
  -- por que cada distrator atrai, não só apontar a certa.
  rationale     text NOT NULL,
  error_hint    text,
  PRIMARY KEY (question_slug, label)
);

-- Exatamente uma alternativa correta por questão, garantido pelo banco.
CREATE UNIQUE INDEX question_options_one_correct
  ON question_options(question_slug) WHERE is_correct;

CREATE TABLE study_methods (
  slug             text PRIMARY KEY,
  title            text NOT NULL,
  summary          text NOT NULL,
  how_it_works     text NOT NULL,
  when_to_use      text NOT NULL,
  steps            jsonb NOT NULL DEFAULT '[]'::jsonb,
  example          text NOT NULL,
  -- Nenhum método é universal: declarar a limitação é obrigatório.
  limitations      text NOT NULL,
  minutes          int  NOT NULL DEFAULT 20,
  suitable_topics  jsonb NOT NULL DEFAULT '[]'::jsonb,
  display_order    int  NOT NULL DEFAULT 0
);

CREATE TABLE session_templates (
  slug                text PRIMARY KEY,
  title               text NOT NULL,
  goal                text NOT NULL,
  instructions        text NOT NULL,
  minutes             int  NOT NULL DEFAULT 20,
  mode                text NOT NULL CHECK (mode IN ('learning', 'exam')),
  kind                text NOT NULL,
  -- Regra de seleção dos itens: lista fixa de tópicos ou fonte dinâmica
  -- (fila de revisão, recomendação, intercalada, diagnóstico).
  item_rule           jsonb NOT NULL,
  completion_rule     text NOT NULL,
  next_recommendation text REFERENCES topics(slug) ON DELETE SET NULL,
  display_order       int  NOT NULL DEFAULT 0
);

CREATE TABLE simulations (
  slug           text PRIMARY KEY,
  title          text NOT NULL,
  description    text NOT NULL,
  kind           text NOT NULL CHECK (kind IN ('area', 'diagnostic', 'mixed')),
  area_slug      text REFERENCES areas(slug) ON DELETE SET NULL,
  question_count int  NOT NULL,
  minutes        int  NOT NULL,
  -- Matriz de distribuição por área, dificuldade e tópico.
  blueprint      jsonb NOT NULL
);

CREATE TABLE essay_prompts (
  slug                text PRIMARY KEY,
  title               text NOT NULL,
  theme               text NOT NULL,
  focus               text NOT NULL,
  motivating_texts    jsonb NOT NULL DEFAULT '[]'::jsonb,
  production_command  text NOT NULL,
  planning_questions  jsonb NOT NULL DEFAULT '[]'::jsonb,
  repertoire          jsonb NOT NULL DEFAULT '[]'::jsonb,
  argument_checklist  jsonb NOT NULL DEFAULT '[]'::jsonb,
  review_checklist    jsonb NOT NULL DEFAULT '[]'::jsonb
);

-- =============================================================================
-- 2. ESTUDANTE
-- =============================================================================

CREATE TABLE students (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                 citext,
  name                  text NOT NULL DEFAULT '',
  onboarding_status     text NOT NULL DEFAULT 'not_started'
                          CHECK (onboarding_status IN ('not_started', 'in_progress', 'completed', 'skipped')),
  onboarding_step       text,
  completed_steps       jsonb NOT NULL DEFAULT '[]'::jsonb,
  skipped_steps         jsonb NOT NULL DEFAULT '[]'::jsonb,
  questionnaire_version text NOT NULL DEFAULT 'v1',
  -- Respostas do questionário, com a chave da pergunta como chave do objeto.
  answers               jsonb NOT NULL DEFAULT '{}'::jsonb,
  suggested_profile     text,
  active_profile        text,
  confidence            text NOT NULL DEFAULT 'low' CHECK (confidence IN ('low', 'medium', 'high')),
  -- Perfil é provisório por definição. Nunca é diagnóstico, nunca é permanente.
  provisional           boolean NOT NULL DEFAULT true,
  confirmed_at          timestamptz,
  diagnostic_status     text NOT NULL DEFAULT 'pending'
                          CHECK (diagnostic_status IN ('pending', 'skipped', 'done')),
  -- Duas leituras de cada dimensão: o que a pessoa declarou e o que o
  -- comportamento indica. Uma nunca sobrescreve a outra em silêncio.
  dimensions_declared   jsonb NOT NULL DEFAULT '{}'::jsonb,
  dimensions_observed   jsonb NOT NULL DEFAULT '{}'::jsonb,
  days_per_week         int  NOT NULL DEFAULT 3 CHECK (days_per_week BETWEEN 1 AND 7),
  session_minutes       int  NOT NULL DEFAULT 20 CHECK (session_minutes BETWEEN 5 AND 180),
  exam_date            date,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX students_email_key ON students(email) WHERE email IS NOT NULL;

CREATE TABLE student_preferences (
  student_id        uuid PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
  theme             text    NOT NULL DEFAULT 'dark'  CHECK (theme IN ('dark', 'light', 'contrast')),
  text_scale        text    NOT NULL DEFAULT '100'   CHECK (text_scale IN ('100', '112', '125')),
  reduced_motion    text    NOT NULL DEFAULT 'auto'  CHECK (reduced_motion IN ('auto', 'reduced', 'full')),
  high_contrast     boolean NOT NULL DEFAULT false,
  visual_intensity  text    NOT NULL DEFAULT 'full'  CHECK (visual_intensity IN ('full', 'reduced')),
  correction_mode   text    NOT NULL DEFAULT 'learning' CHECK (correction_mode IN ('learning', 'exam')),
  show_timer        boolean NOT NULL DEFAULT true,
  confidence_prompt boolean NOT NULL DEFAULT true,
  reminders_enabled boolean NOT NULL DEFAULT false,
  reminder_days     jsonb   NOT NULL DEFAULT '[]'::jsonb,
  reminder_time     text
);

-- Toda mudança de perfil guarda a justificativa legível que foi mostrada.
CREATE TABLE profile_history (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  previous_profile text,
  next_profile     text NOT NULL,
  trigger          text NOT NULL CHECK (trigger IN ('confirmation', 'manual', 'behavior')),
  reason           text NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX profile_history_student_idx ON profile_history(student_id, created_at DESC);

-- Registra quando a escolha do estudante divergiu da sugestão automática.
-- A escolha da pessoa sempre prevalece; guardamos a divergência para calibrar.
CREATE TABLE profile_confirmations (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id         uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  suggested_profile  text NOT NULL,
  chosen_profile     text NOT NULL,
  matched_suggestion boolean NOT NULL,
  note               text,
  decided_at         timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX profile_confirmations_student_idx ON profile_confirmations(student_id);

CREATE TABLE study_sessions (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id         uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  title              text NOT NULL,
  kind               text NOT NULL CHECK (kind IN ('learn', 'practice', 'review', 'simulate', 'diagnostic')),
  mode               text NOT NULL DEFAULT 'learning' CHECK (mode IN ('learning', 'exam')),
  -- Por que esta sessão foi montada. Nunca é nulo em sessão recomendada:
  -- o estudante tem direito de saber o motivo.
  reason             text,
  topic_slug         text REFERENCES topics(slug) ON DELETE SET NULL,
  simulation_slug    text REFERENCES simulations(slug) ON DELETE SET NULL,
  status             text NOT NULL DEFAULT 'in_progress'
                       CHECK (status IN ('in_progress', 'paused', 'completed', 'abandoned')),
  current_index      int  NOT NULL DEFAULT 0,
  planned_minutes    int  NOT NULL DEFAULT 20,
  time_limit_seconds int,
  -- Chave de idempotência: recarregar a página ou clicar duas vezes não pode
  -- criar uma segunda sessão idêntica.
  idempotency_key    text NOT NULL,
  started_at         timestamptz NOT NULL DEFAULT now(),
  last_active_at     timestamptz NOT NULL DEFAULT now(),
  completed_at       timestamptz
);
CREATE UNIQUE INDEX study_sessions_idempotency
  ON study_sessions(student_id, idempotency_key) WHERE status <> 'completed';
CREATE INDEX study_sessions_student_idx ON study_sessions(student_id, started_at DESC);

CREATE TABLE session_items (
  session_id    uuid NOT NULL REFERENCES study_sessions(id) ON DELETE CASCADE,
  question_slug text NOT NULL REFERENCES questions(slug) ON DELETE RESTRICT,
  item_order    int  NOT NULL,
  flagged       boolean NOT NULL DEFAULT false,
  note          text,
  status        text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'answered', 'skipped')),
  PRIMARY KEY (session_id, question_slug)
);
CREATE INDEX session_items_order_idx ON session_items(session_id, item_order);

CREATE TABLE attempts (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id     uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  session_id     uuid REFERENCES study_sessions(id) ON DELETE SET NULL,
  question_slug  text NOT NULL REFERENCES questions(slug) ON DELETE RESTRICT,
  -- A PRIMEIRA alternativa marcada nunca é sobrescrita: trocar de resposta é um
  -- dado sobre o raciocínio, e some se guardarmos só a última.
  first_answer   text NOT NULL CHECK (first_answer IN ('A', 'B', 'C', 'D', 'E')),
  final_answer   text NOT NULL CHECK (final_answer IN ('A', 'B', 'C', 'D', 'E')),
  changed_answer boolean NOT NULL DEFAULT false,
  is_correct     boolean NOT NULL,
  -- Confiança declarada: separa acerto com certeza de acerto com dúvida.
  confidence     text CHECK (confidence IN ('sure', 'unsure', 'guess')),
  -- Motivo do erro, escolhido pelo estudante. Um erro sem motivo se repete.
  error_reason   text CHECK (error_reason IN (
                   'unknown_content', 'misread_question', 'calculation',
                   'attention', 'time', 'between_options', 'other')),
  time_spent_ms  int  NOT NULL DEFAULT 0,
  answered_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX attempts_student_idx  ON attempts(student_id, answered_at DESC);
CREATE INDEX attempts_question_idx ON attempts(student_id, question_slug);
CREATE INDEX attempts_session_idx  ON attempts(session_id);

CREATE TABLE topic_mastery (
  student_id        uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  topic_slug        text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  state             text NOT NULL DEFAULT 'not_started' CHECK (state IN (
                      'not_started', 'explored', 'practicing', 'needs_review', 'consolidated')),
  score             int  NOT NULL DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
  attempt_count     int  NOT NULL DEFAULT 0,
  correct_count     int  NOT NULL DEFAULT 0,
  -- "Consolidado" exige questões DISTINTAS e mais de uma sessão. Domínio nunca
  -- é declarado a partir de um acerto isolado.
  distinct_questions int NOT NULL DEFAULT 0,
  distinct_sessions  int NOT NULL DEFAULT 0,
  first_viewed_at   timestamptz,
  last_practiced_at timestamptz,
  updated_at        timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (student_id, topic_slug)
);
CREATE INDEX topic_mastery_state_idx ON topic_mastery(student_id, state);

CREATE TABLE review_queue (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  question_slug    text NOT NULL REFERENCES questions(slug) ON DELETE CASCADE,
  topic_slug       text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  kind             text NOT NULL DEFAULT 'question',
  due_at           timestamptz NOT NULL,
  interval_days    int  NOT NULL DEFAULT 1,
  ease             int  NOT NULL DEFAULT 250 CHECK (ease BETWEEN 130 AND 320),
  repetitions      int  NOT NULL DEFAULT 0,
  last_recall      text CHECK (last_recall IN ('forgot', 'partial', 'mastered')),
  last_reviewed_at timestamptz,
  status           text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done', 'dropped')),
  reason           text NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, question_slug)
);
CREATE INDEX review_queue_due_idx ON review_queue(student_id, status, due_at);

-- Caderno de erros: guarda o MOTIVO e o próximo passo, não a lista de acertos.
CREATE TABLE error_notes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  question_slug text NOT NULL REFERENCES questions(slug) ON DELETE CASCADE,
  topic_slug    text NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  concept       text NOT NULL,
  reason        text,
  note          text,
  status        text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  source        text NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'auto')),
  next_action   text NOT NULL DEFAULT 'similar_question' CHECK (next_action IN (
                  'similar_question', 'review_concept', 'self_explain', 'redo_later')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  resolved_at   timestamptz
);
CREATE INDEX error_notes_student_idx ON error_notes(student_id, status, created_at DESC);

CREATE TABLE weekly_plans (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  week_start date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, week_start)
);

CREATE TABLE plan_blocks (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id    uuid NOT NULL REFERENCES weekly_plans(id) ON DELETE CASCADE,
  weekday    int  NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  kind       text NOT NULL,
  topic_slug text REFERENCES topics(slug) ON DELETE SET NULL,
  minutes    int  NOT NULL DEFAULT 20,
  -- Perder um dia reajusta o plano. Não existe "atrasado" nem cobrança.
  status     text NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'done', 'moved')),
  block_order int NOT NULL DEFAULT 0
);
CREATE INDEX plan_blocks_plan_idx ON plan_blocks(plan_id, block_order);

CREATE TABLE simulation_runs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id      uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  simulation_slug text NOT NULL REFERENCES simulations(slug) ON DELETE RESTRICT,
  session_id      uuid NOT NULL REFERENCES study_sessions(id) ON DELETE CASCADE,
  timed           boolean NOT NULL DEFAULT true,
  total_items     int  NOT NULL,
  score           int  NOT NULL DEFAULT 0,
  submitted_at    timestamptz,
  -- Análise por área, tópico, habilidade e tempo. NUNCA contém estimativa de
  -- nota do ENEM nem projeção de aprovação.
  analysis        jsonb,
  -- Quando o acervo não cobre a matriz, avisamos em vez de repetir questão.
  fallback_note   text,
  shortfall       int NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX simulation_runs_student_idx ON simulation_runs(student_id, created_at DESC);

CREATE TABLE essays (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  prompt_slug text NOT NULL REFERENCES essay_prompts(slug) ON DELETE RESTRICT,
  outline     text NOT NULL DEFAULT '',
  body        text NOT NULL DEFAULT '',
  -- Autoavaliação por critério. Não existe coluna de nota: sem leitor humano,
  -- atribuir pontuação a uma redação seria inventar um número.
  self_check  jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, prompt_slug)
);

CREATE TABLE content_reports (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    uuid REFERENCES students(id) ON DELETE SET NULL,
  question_slug text NOT NULL REFERENCES questions(slug) ON DELETE CASCADE,
  kind          text NOT NULL CHECK (kind IN (
                  'wrong_answer_key', 'ambiguous', 'accessibility',
                  'broken_image', 'inappropriate', 'other')),
  comment       text,
  status        text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reviewing', 'fixed', 'rejected')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  resolved_at   timestamptz
);
CREATE INDEX content_reports_status_idx ON content_reports(status, created_at DESC);

-- =============================================================================
-- 3. VISÕES DE APOIO
-- =============================================================================

-- Saúde do acervo, equivalente ao que a tela #/catalogo mostra hoje.
CREATE VIEW catalog_health AS
SELECT
  (SELECT count(*) FROM areas)                                  AS areas,
  (SELECT count(*) FROM subjects)                               AS subjects,
  (SELECT count(*) FROM topics)                                 AS topics,
  (SELECT count(*) FROM questions)                              AS questions,
  (SELECT count(*) FROM questions WHERE is_recovery)            AS recovery_questions,
  (SELECT count(*) FROM content_items)                          AS content_items,
  (SELECT count(*) FROM study_methods)                          AS methods,
  (SELECT count(*) FROM session_templates)                      AS session_templates,
  (SELECT count(*) FROM simulations)                            AS simulations,
  (SELECT count(*) FROM essay_prompts)                          AS essay_prompts,
  (SELECT count(*) FROM topics t
     WHERE NOT EXISTS (SELECT 1 FROM content_items c WHERE c.topic_slug = t.slug))
                                                                AS topics_without_content,
  (SELECT count(*) FROM question_options o
     WHERE o.rationale IS NULL OR btrim(o.rationale) = '')       AS options_without_rationale;

-- Distribuição do gabarito. Se uma posição concentrar demais, quem marca sempre
-- a mesma letra acerta sem ler — e todo o resto do sistema passa a medir ruído.
CREATE VIEW answer_key_balance AS
SELECT
  label,
  count(*)                                                        AS total,
  round(100.0 * count(*) / NULLIF(sum(count(*)) OVER (), 0), 1)    AS percent
FROM question_options
WHERE is_correct
GROUP BY label
ORDER BY label;

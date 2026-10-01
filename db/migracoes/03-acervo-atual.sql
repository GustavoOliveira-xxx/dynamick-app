-- 03 · Adapta o banco ao Dynamick atual (outubro de 2026).
--
-- O esquema de agosto não comportava mais o acervo que o site tem hoje. Carregar
-- o catálogo atual falhava em quatro pontos, e este arquivo corrige cada um:
--
--   1. Simulados por matéria e por assunto (kind 'subject' e 'topic') batiam na
--      restrição que só aceitava 'area', 'diagnostic' e 'mixed'.
--   2. Só o resumo e a explicação de cada assunto têm profundidade; exemplos,
--      erros comuns e autoexplicação não têm, e a coluna exigia valor.
--   3. A próxima recomendação de uma sessão pronta pode ser um assunto, outra
--      sessão, um simulado ou uma página do site, mas a coluna só aceitava
--      assunto: 7 das 12 sessões não entravam.
--   4. Campos que o site já usa não tinham onde ficar: o resumo de áreas e
--      matérias, o texto de apoio das questões e os metadados de cada questão.
--
-- Também passam a existir no banco os modos de prova e o acervo de ENEMs
-- anteriores, e a tabela catalog_sync, que registra qual versão do acervo foi
-- carregada por último.
--
-- Nada aqui apaga linha de tabela. Pode rodar de novo sem efeito colateral.

-- Áreas e matérias ---------------------------------------------------------

-- Em áreas a coluna se chamava description e nunca recebeu valor; o site chama
-- de summary, como em matérias e assuntos.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public' AND table_name = 'areas' AND column_name = 'description')
     AND NOT EXISTS (SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public' AND table_name = 'areas' AND column_name = 'summary') THEN
    ALTER TABLE areas RENAME COLUMN description TO summary;
  END IF;
END $$;
ALTER TABLE areas    ADD COLUMN IF NOT EXISTS summary text;
ALTER TABLE subjects ADD COLUMN IF NOT EXISTS summary text;

-- Conteúdo dos assuntos ----------------------------------------------------

-- NULL quando o bloco vale para qualquer profundidade de leitura.
ALTER TABLE content_items ALTER COLUMN depth DROP NOT NULL;

-- Questões -----------------------------------------------------------------

ALTER TABLE questions ADD COLUMN IF NOT EXISTS support           text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS reasoning_type    text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS estimated_seconds int;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS likely_errors     jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS review_status     text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS source_year       int;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS source_url        text;

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_estimated_seconds_check;
ALTER TABLE questions ADD CONSTRAINT questions_estimated_seconds_check
  CHECK (estimated_seconds IS NULL OR estimated_seconds > 0);

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_likely_errors_check;
ALTER TABLE questions ADD CONSTRAINT questions_likely_errors_check
  CHECK (jsonb_typeof(likely_errors) = 'array');

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_source_year_check;
ALTER TABLE questions ADD CONSTRAINT questions_source_year_check
  CHECK (source_year IS NULL OR source_year BETWEEN 1998 AND 2100);

-- Sessões prontas ----------------------------------------------------------

-- Continua sendo texto: o slug de um assunto, de outra sessão, de um simulado
-- ou de uma página. Quem interpreta é o site.
ALTER TABLE session_templates DROP CONSTRAINT IF EXISTS session_templates_next_recommendation_fkey;

-- Simulados ----------------------------------------------------------------

ALTER TABLE simulations DROP CONSTRAINT IF EXISTS simulations_kind_check;
ALTER TABLE simulations ADD CONSTRAINT simulations_kind_check
  CHECK (kind IN ('area', 'subject', 'topic', 'diagnostic', 'mixed'));

ALTER TABLE simulations ADD COLUMN IF NOT EXISTS subject_slug text REFERENCES subjects(slug) ON DELETE SET NULL;
ALTER TABLE simulations ADD COLUMN IF NOT EXISTS topic_slug   text REFERENCES topics(slug)   ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS simulations_subject_idx ON simulations(subject_slug);
CREATE INDEX IF NOT EXISTS simulations_topic_idx   ON simulations(topic_slug);

-- Modos de prova (js/data/exam-environments.js) -----------------------------

CREATE TABLE IF NOT EXISTS exam_environments (
  slug                text PRIMARY KEY,
  title               text NOT NULL,
  eyebrow             text NOT NULL,
  description         text NOT NULL,
  -- NULL: sem limite de tempo. 1: o tempo previsto. 0.75: 75% dele.
  time_factor         numeric(4, 2) CHECK (time_factor IS NULL OR time_factor > 0),
  show_timer          boolean NOT NULL,
  allow_pause         boolean NOT NULL,
  focus_mode          boolean NOT NULL,
  pace_per_question   boolean NOT NULL,
  elimination_default boolean NOT NULL,
  confidence_prompt   boolean NOT NULL,
  display_order       int     NOT NULL DEFAULT 0
);

-- ENEMs anteriores (js/data/enem-archive.js) --------------------------------

CREATE TABLE IF NOT EXISTS enem_editions (
  year     int  PRIMARY KEY CHECK (year BETWEEN 1998 AND 2100),
  url      text NOT NULL,
  source   text NOT NULL,
  contents jsonb NOT NULL DEFAULT '[]'::jsonb
);

-- Versão do acervo carregada ------------------------------------------------

-- Uma linha só. db/migrar.mjs compara content_hash com o acervo do código e só
-- recarrega quando mudou.
CREATE TABLE IF NOT EXISTS catalog_sync (
  id            int  PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  content_hash  text NOT NULL,
  totals        jsonb NOT NULL,
  source_commit text,
  synced_at     timestamptz NOT NULL DEFAULT now()
);

-- Sincronização ------------------------------------------------------------

-- O banco de produção já tem esta restrição; bancos novos passam a ter também.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'sync_snapshots_bytes_check'
                    AND conrelid = 'public.sync_snapshots'::regclass) THEN
    ALTER TABLE sync_snapshots ADD CONSTRAINT sync_snapshots_bytes_check CHECK (bytes >= 0);
  END IF;
END $$;

-- Visões -------------------------------------------------------------------

-- As colunas antigas ficam na mesma ordem; as novas vêm depois.
DROP VIEW IF EXISTS catalog_health;
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
     WHERE o.rationale IS NULL OR btrim(o.rationale) = '')       AS options_without_rationale,
  (SELECT count(*) FROM topics t
     WHERE (SELECT count(*) FROM questions q
             WHERE q.topic_slug = t.slug AND NOT q.is_recovery) < 5)
                                                                AS topics_with_few_questions,
  (SELECT count(*) FROM questions WHERE skill_slug IS NULL)      AS questions_without_skill,
  (SELECT count(*) FROM exam_environments)                      AS exam_environments,
  (SELECT count(*) FROM enem_editions)                          AS enem_editions,
  (SELECT synced_at FROM catalog_sync WHERE id = 1)             AS synced_at;

DROP VIEW IF EXISTS answer_key_balance;
CREATE VIEW answer_key_balance AS
SELECT
  label,
  count(*)                                                        AS total,
  round(100.0 * count(*) / NULLIF(sum(count(*)) OVER (), 0), 1)    AS percent
FROM question_options
WHERE is_correct
GROUP BY label
ORDER BY label;

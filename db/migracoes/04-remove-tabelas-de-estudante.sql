-- 04 · Remove as tabelas de estudante da arquitetura antiga.
--
-- O esquema de agosto previa guardar no servidor o perfil, as respostas, as
-- revisões e as redações de cada estudante. O site não seguiu esse caminho: o
-- progresso fica no navegador e, com a sincronização ligada, sobe cifrado em
-- sync_snapshots, que o servidor não consegue ler. Estas 15 tabelas nunca
-- receberam uma linha, e a página de privacidade promete que o servidor não
-- guarda nada que ligue um registro a uma pessoa, o que uma tabela students
-- com e-mail contradiz mesmo vazia.
--
-- Por segurança, nada é apagado se alguma delas tiver dados.

DO $$
DECLARE
  tabela    text;
  tem_linha boolean;
BEGIN
  FOREACH tabela IN ARRAY ARRAY[
    'students', 'student_preferences', 'profile_history', 'profile_confirmations',
    'study_sessions', 'session_items', 'attempts', 'topic_mastery', 'review_queue',
    'error_notes', 'weekly_plans', 'plan_blocks', 'simulation_runs', 'essays',
    'content_reports'
  ] LOOP
    IF to_regclass('public.' || tabela) IS NOT NULL THEN
      EXECUTE format('SELECT EXISTS (SELECT 1 FROM public.%I)', tabela) INTO tem_linha;
      IF tem_linha THEN
        RAISE EXCEPTION 'A tabela % tem dados; nenhuma tabela foi removida.', tabela;
      END IF;
    END IF;
  END LOOP;
END $$;

-- Num comando só, para as chaves entre elas não ditarem a ordem. Sem CASCADE:
-- se algo fora desta lista depender delas, o comando falha em vez de levar
-- junto o que não devia.
DROP TABLE IF EXISTS
  session_items, attempts, simulation_runs, study_sessions,
  plan_blocks, weekly_plans,
  topic_mastery, review_queue, error_notes,
  essays, content_reports,
  profile_history, profile_confirmations, student_preferences,
  students;

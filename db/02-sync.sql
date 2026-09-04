-- Sincronização entre aparelhos (computador, celular, tablet).
--
-- Fica separado de 01-esquema.sql de propósito: aquele arquivo cria o acervo
-- inteiro e só roda uma vez, num banco vazio. Este pode ser aplicado quantas
-- vezes for preciso, sem risco de apagar nada, e é o único necessário para a
-- mesma conta funcionar em mais de um aparelho.
--
--   psql "$DATABASE_URL" -f db/02-sync.sql
--   npm run db:migrar

CREATE TABLE IF NOT EXISTS sync_snapshots (
  code_hash    text PRIMARY KEY CHECK (code_hash ~ '^[0-9a-f]{64}$'),
  ciphertext   text NOT NULL,
  iv           text NOT NULL,
  salt         text NOT NULL,
  bytes        int  NOT NULL DEFAULT 0,
  revision     bigint NOT NULL DEFAULT 1,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);

-- Bancos criados antes destas colunas existirem.
ALTER TABLE sync_snapshots ADD COLUMN IF NOT EXISTS bytes        int         NOT NULL DEFAULT 0;
ALTER TABLE sync_snapshots ADD COLUMN IF NOT EXISTS revision     bigint      NOT NULL DEFAULT 1;
ALTER TABLE sync_snapshots ADD COLUMN IF NOT EXISTS created_at   timestamptz NOT NULL DEFAULT now();
ALTER TABLE sync_snapshots ADD COLUMN IF NOT EXISTS updated_at   timestamptz NOT NULL DEFAULT now();
ALTER TABLE sync_snapshots ADD COLUMN IF NOT EXISTS last_seen_at timestamptz NOT NULL DEFAULT now();

-- Usado pela limpeza semanal em /api/limpeza.
CREATE INDEX IF NOT EXISTS sync_snapshots_last_seen_idx ON sync_snapshots(last_seen_at);

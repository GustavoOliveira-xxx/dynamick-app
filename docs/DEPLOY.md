# Publicar no Vercel

Passo a passo do que precisa acontecer, e o que só você pode fazer. O código já
está pronto — o que falta é ligar as pontas.

## O que muda em relação ao GitHub Pages

O Pages serve arquivo estático e nada mais. O Neon **não funciona lá**, e não é questão de
configuração: para falar com o banco é preciso rodar código em servidor, e a credencial do
banco não pode chegar ao navegador (quem a tivesse teria o banco inteiro). O Vercel resolve
isso com Serverless Functions — a `DATABASE_URL` fica no servidor e nunca é enviada ao
cliente.

O site continua funcionando exatamente igual sem o banco. A sincronização é opcional.

---

## 1. Variáveis de ambiente no Vercel

Em **Settings → Environment Variables** do projeto, para *Production*, *Preview* e
*Development*:

| Nome | Valor | Onde achar |
| --- | --- | --- |
| `DATABASE_URL` | string de conexão do Neon | Painel do Neon → *Connection Details* |
| `CRON_SECRET` | uma string aleatória longa | Gere você mesmo (veja abaixo) |

**Use a string com `-pooler` no host.** Funções serverless abrem e fecham conexão o tempo
todo; sem o pooler, o limite do Postgres estoura rápido.

Para gerar o `CRON_SECRET`:

```bash
openssl rand -base64 32
```

Não coloque nenhum dos dois no repositório. O `.gitignore` já cobre `.env`.

## 2. Ligar o repositório

Em **Settings → Git**, aponte para `GustavoOliveira-xxx/dyanimiCK`, branch de produção
`main` (ou a que você usar).

Não há passo de build: `vercel.json` já declara `framework: null`, `buildCommand: null` e
`outputDirectory: "."`. O Vercel serve os arquivos como estão e transforma `api/*.js` em
funções. O `npm install` acontece sozinho por causa do `package.json`.

## 3. Carregar o acervo no banco

Isto roda da **sua** máquina, uma vez só. O ambiente onde o código foi escrito não alcança
o Postgres.

```bash
export DATABASE_URL='postgresql://...'   # a mesma string do passo 1
psql "$DATABASE_URL" -f db/02-seed-acervo.sql
psql "$DATABASE_URL" -c 'SELECT * FROM catalog_health;'
```

O esquema (`db/01-esquema.sql`) e a tabela de sincronização já estão aplicados. As tabelas
estruturais — áreas, disciplinas, tópicos, habilidades — já estão carregadas e conferidas
por checksum. Falta só o acervo pesado: conteúdos, questões, alternativas, métodos,
sessões prontas, simulados e temas de redação.

> Detalhe: a aplicação **não lê** o acervo do banco. Ela usa `js/data/`, que funciona
> offline. O banco guarda o acervo para quando existir curadoria pela equipe. Carregar
> agora é preparar o terreno, não requisito para o site funcionar.

## 4. Desligar o GitHub Pages

Em **Settings → Pages** do repositório, mude a origem para *None*. Manter os dois
funcionando cria duas versões do site que saem de sincronia — e a do Pages não teria
sincronização, porque não tem `/api`.

## 5. Conferir depois do deploy

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://SEU-DOMINIO/            # 200
curl -s 'https://SEU-DOMINIO/api/sync?codeHash=invalido'                 # 400, com JSON
curl -s 'https://SEU-DOMINIO/api/sync?codeHash='$(printf 'a%.0s' {1..64}) # 404
```

O terceiro é o que prova que a função alcançou o banco: 404 significa "consultei e não
achei". Se vier 500, a `DATABASE_URL` está errada ou ausente.

Na interface: **Perfil › Meus dados → Sincronizar entre aparelhos**. Gere um código, abra
o site em outro navegador, cole o código e confirme que o progresso atravessa.

---

## Como a sincronização funciona

O estudante gera um código de 20 caracteres. Esse código é a chave.

1. O navegador deriva uma chave AES-256 do código (PBKDF2-SHA256, 210 mil iterações).
2. O estado é cifrado com AES-GCM **antes** de sair do aparelho.
3. Sobe o texto cifrado, o IV, o sal e o **SHA-256 do código** — nunca o código.
4. O servidor grava isso em `sync_snapshots`, indexado pelo hash.

Consequências, todas escritas na página de privacidade:

- **O servidor não consegue ler nada.** Não é promessa de conduta, é aritmética.
- **Perdeu o código, perdeu o acesso.** Não há recuperação possível.
- **Quem tem o código tem os dados.** É uma senha.
- **Nada sobe sozinho.** Enviar e trazer são cliques.

### Conflito entre aparelhos

Cada gravação incrementa `revision`. O aparelho manda a revisão que viu por último; se o
servidor já estiver adiante, responde **409** e o cliente mostra as opções em vez de
sobrescrever calado. Perder progresso em silêncio seria pior que qualquer erro visível.

### Limpeza

`/api/limpeza` roda por Vercel Cron aos domingos às 4h UTC e apaga snapshots sem nenhuma
leitura nem gravação há 12 meses. Protegida por `CRON_SECRET`; sem a variável, ela recusa
rodar em vez de ficar aberta.

---

## Custo

Tudo cabe no gratuito:

- **Vercel Hobby** — 100 GB de banda e 100 mil invocações por mês. Este site é estático;
  as funções só rodam quando alguém sincroniza.
- **Neon Free** — 0,5 GB de armazenamento. Um snapshot cifrado tem alguns KB.

O que faria sair do gratuito é volume de acesso, não este desenho.

## Se um dia precisar de contas de verdade

O caminho está aberto: `students.email` é nulável no esquema, com índice único parcial,
justamente para conviver com estudante anônimo. Turmas, professores ou responsáveis
exigiriam autenticação de verdade — e uma reescrita da página de privacidade, porque a
promessa mudaria.

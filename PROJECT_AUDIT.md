# Auditoria do projeto — Dynamic CK

Atualizada em 23 de agosto de 2026.

## Resumo executivo

O repositório já implementava a maior parte do produto definido na especificação: onboarding explicável, seis perfis, dashboard adaptativo, mapa de conteúdo, prática, revisão, simulados, redação, acessibilidade, persistência local e sincronização opcional cifrada. Este incremento preserva essa arquitetura e atua apenas nos pontos pedidos: sensação de movimento, transição entre telas, fundo, elemento 3D e ampliação editorial do banco.

## Arquitetura encontrada

- Aplicação multipágina estática em HTML, CSS e módulos ES nativos, sem etapa de build.
- Rotas internas da plataforma por hash em `app.html`, registradas em `js/app.js`.
- Componentes DOM em `js/ui/`, telas em `js/views/`, regras em `js/engine/` e dados autorais em `js/data/`.
- Fonte da verdade do estudante no `localStorage`, chave `dynamick:v1`, com backup local antes de recuperar um estado inválido.
- Sem conta e sem autenticação tradicional. A sincronização opcional usa um código compartilhado pelo estudante, PBKDF2, AES-GCM e funções serverless em `api/`.
- Postgres/Neon serve à sincronização e à futura curadoria do catálogo; a aplicação continua funcional offline com os módulos em `js/data/`.
- Marcas oficiais centralizadas em `js/ui/brand.js`, com WebP e PNG de fallback.

## Superfícies e rotas

- Públicas: apresentação, experiência de três questões, sobre, privacidade e acessibilidade.
- Onboarding: boas-vindas, oito etapas, confirmação de perfil e resumo.
- Estudo: início, diagnóstico, mapa e tópico, prática rápida e guiada, sessão e resultado.
- Continuidade: revisão, caderno de erros, simulados e redação.
- Apoio e transparência: métodos, busca, saúde do catálogo, perfil, configurações, relatório e dados.

## Componentes reaproveitados

- Tokens de cor, espaço, tipografia, elevação, movimento e camadas em `css/tokens.css`.
- Botões, cartões, mensagens, badges, progresso e campos em `js/ui/components.js` e `css/components.css`.
- Fundo único e contextual em `js/ui/background.js`.
- Preferências de tema, contraste, escala de texto, movimento e intensidade visual no estado do estudante.
- Motor de conteúdo com rotação determinística do gabarito, índice por área/tópico e verificação pública de integridade.

## Estado do conteúdo

- 4 áreas, 11 disciplinas e 12 tópicos completos.
- 144 questões autorais: 120 principais e 24 de recuperação.
- Cada tópico tem 10 questões principais e 2 de recuperação.
- As 60 questões deste incremento adicionam exatamente cinco itens por tópico, com cinco alternativas, gabarito único, explicação, justificativa de cada alternativa, habilidade, dificuldade, formato cognitivo, origem e licença.
- O acervo é compatível com o nível e as habilidades cobradas em ENEM e vestibulares, mas não copia enunciados oficiais nem declara cobertura integral do programa.

## Riscos e limites conhecidos

- Não existe pipeline de bundling ou minificação; a disciplina de imports é protegida por teste próprio.
- O catálogo é autoral de desenvolvimento e ainda precisa de revisão editorial especializada antes de uso como material oficial.
- A cobertura permanece deliberadamente limitada aos 12 tópicos completos do MVP.
- Canvas e CSS 3D dependem da capacidade do navegador, por isso há redução de densidade, pausa fora de foco e modos sem animação.
- GitHub Pages não executa as funções de sincronização em `api/`; nesse destino, a configuração de sync deve ser desligada ou as funções devem ser hospedadas separadamente.

## Resultado da auditoria

Não foi necessária uma reconstrução. A solução mais segura foi um incremento modular: manter rotas, estado e regras existentes, inserir uma camada cancelável de transição, enriquecer a cena única de fundo, reutilizar um cubo CSS 3D no hero e no loader e anexar a expansão editorial pelo agregador de conteúdo.

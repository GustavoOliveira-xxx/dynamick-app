# Especificação do onboarding — Dynamic CK

Versão de referência: questionário `v1`, auditada em 23 de agosto de 2026.

## Objetivo

Descobrir condições práticas de estudo e sugerir uma configuração inicial explicável. O resultado não é diagnóstico clínico, rótulo permanente nem promessa de desempenho. Respostas são salvas localmente, podem ser retomadas e continuam editáveis em “Meu perfil de estudo”.

## Fluxo

1. Boas-vindas: explica propósito, duração, privacidade e possibilidade de pular etapas opcionais.
2. Contexto (obrigatória): momento escolar, preparo anterior, experiência com prova/simulado e horizonte.
3. Objetivo e motivação (opcional): metas atuais e objetivo principal.
4. Disponibilidade real (obrigatória): dias por semana, minutos por sessão, horários prováveis e estabilidade da rotina.
5. Autonomia e organização (obrigatória): nível de direção desejado.
6. Preferência de estudo (opcional): formatos que ajudam a começar.
7. O que costuma atrapalhar (opcional): dificuldades práticas e apoios associados, sem diagnóstico.
8. Autoavaliação por área (opcional): seguro, inseguro ou não sei dizer.
9. Interface e acessibilidade (opcional): tema, escala de texto, movimento, contraste, intensidade visual e lembretes.
10. Confirmação: apresenta o perfil sugerido, sinais usados, efeitos na experiência e apoios ativados.
11. Resumo: mostra perfil escolhido, duração, mistura aprender/praticar/revisar, questões por sessão, nível de direção e primeira atividade.

As etapas de Contexto, Disponibilidade real e Autonomia são obrigatórias. As demais podem ser puladas e respondidas depois. O progresso e as respostas anteriores são preservados ao retomar.

## Dimensões funcionais

O motor calcula uma sugestão a partir de seis dimensões: autonomia, consistência, base percebida, necessidade de direção, preferência por prática e necessidade de sessões curtas. A necessidade de direção e a necessidade de sessões curtas recebem pesos maiores. A prática posterior pode contrariar a autoavaliação e orientar novos ajustes.

## Perfis disponíveis

- Explorador sem rota: direção alta, sessões curtas e mapa de conteúdos.
- Construtor de base: fundamentos, pré-requisitos e prática gradual.
- Praticante em ritmo: plano semanal equilibrado e recorrente.
- Caçador de lacunas: diagnóstico por tópico, erros e questões semelhantes.
- Treinador de desempenho: precisão, estratégia, tempo e simulados; só é sugerido automaticamente quando a prova está próxima ou existe experiência prévia com o ENEM.
- Estudante de rotina variável: sessões modulares, retomada e replanejamento.

## Confirmação e controle do estudante

- A sugestão mostra por que apareceu e como altera duração, mistura de atividades, dificuldade, cronômetro, direção e métodos.
- Baixa confiança e respostas contraditórias são declaradas em linguagem neutra.
- O estudante pode aceitar, comparar perfis, escolher outro, dizer que nenhum combina ou editar respostas.
- A escolha é sempre revisável e não bloqueia conteúdo.
- Um diagnóstico leve de oito questões pode ser oferecido depois da confirmação, mas é opcional.

## Acessibilidade e movimento

- Campos usam controles nativos, agrupamentos semânticos, rótulos e mensagens de correção.
- O foco acompanha a rota e o conteúdo principal; teclado e leitor de tela não dependem de animação.
- Tema, tamanho do texto, alto contraste, intensidade visual e redução de movimento são ajustáveis no próprio fluxo.
- Transições, loader, fundo e cubo têm comportamento estático quando o sistema ou a preferência pede movimento reduzido.

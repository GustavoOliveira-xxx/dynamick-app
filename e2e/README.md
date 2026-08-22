# Testes end-to-end

`fluxos-criticos.mjs` cobre os fluxos mínimos exigidos pela §21 do prompt mestre:

1. visitante acessa a landing e usa a sessão demonstrativa sem conta;
2. estudante conclui o onboarding, recebe o perfil e escolhe uma opção alternativa;
3. onboarding abandonado no meio e retomado depois;
4. etapa obrigatória bloqueia avanço sem resposta;
5. início de sessão pela recomendação, com justificativa visível;
6. gabarito escondido antes da resposta;
7. resposta, correção explicada e registro do motivo do erro;
8. marcação de questão, pausa e retomada da sessão;
9. fila de revisão e caderno de erros;
10. mapa de conteúdos e página de tópico;
11. simulado nos dois modos, sem correção por questão no modo prova;
12. acesso negado ao painel administrativo para usuário comum (no servidor);
13. curadoria acessando saúde do banco e lista paginada;
14. acessibilidade: link de pular, um único h1, sem rolagem horizontal em 360px;
15. movimento reduzido;
16. exportação de dados sem vazar senha;
17. rotas privadas bloqueadas para anônimo.

## Como executar

```bash
npm run build
npm run start            # em outro terminal, na porta 3100
PORT=3100 npm run e2e:fluxos
```

Ou, em uma linha:

```bash
npm run build && (npx next start -p 3100 &) && sleep 6 && npm run e2e:fluxos
```

O script usa o Chromium já presente no ambiente. Para apontar outro binário, defina
`CHROMIUM_PATH`.

## Observação sobre `innerText`

O Chromium devolve o texto **já com `text-transform` aplicado**. Por isso as verificações
comparam sem diferenciar maiúsculas de minúsculas (função `has`). Comparar com
`includes` direto produz falso negativo em qualquer título com `uppercase`.

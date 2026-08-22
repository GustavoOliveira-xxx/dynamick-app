# DynamiCK — marca do produto

Onde a marca do **produto** aparece: cabeçalho do app, favicon, landing, onboarding e início.

Coloque aqui, com estes nomes exatos:

```
logo-full.png      # ou .svg — landing e cabeçalho grande
logo-compact.png   # menu lateral e cabeçalho compacto
symbol.png         # símbolo isolado, sem texto
logo-mono.png      # versão monocromática
logo-on-light.png  # versão para fundo claro
favicon.png        # 512×512
```

Depois, em `js/ui/brand.js`, troque `USE_OFFICIAL_ASSETS = false` para `true`.
Enquanto os arquivos não chegam, o app desenha uma marca provisória marcada com
`data-brand-fallback="true"` — ela **não** é uma proposta de identidade, só um espaço reservado.

As regras de uso estão em `../README.md`.

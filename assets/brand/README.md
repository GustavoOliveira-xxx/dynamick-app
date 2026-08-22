# Assets de marca

Esta pasta é a **camada substituível de marca**. Nenhuma tela desenha a logo por conta
própria: todas leem daqui, via `js/ui/brand.js`.

## Estado atual

**Os arquivos oficiais ainda NÃO estão aqui.** Enquanto não chegarem, a aplicação desenha
uma marca provisória em SVG, identificada no HTML com `data-brand-fallback="true"`.

## Como ligar as logos oficiais

1. Coloque os arquivos com exatamente estes nomes:

```
assets/brand/dynamick/
  logo-full.png        # ou .svg — landing e cabeçalho grande
  logo-compact.png     # menu e cabeçalho compacto
  symbol.png           # símbolo CK isolado
  logo-mono.png        # versão monocromática
  logo-on-light.png    # versão para fundo claro
  favicon.png          # 512×512

assets/brand/conscious-knowledge/
  logo-full.png
  logo-compact.png
  symbol.png
  logo-mono.png
  favicon.png
```

2. Em `js/ui/brand.js`, troque:

```js
export const USE_OFFICIAL_ASSETS = false;  // → true
```

Pronto. Nenhuma outra alteração é necessária.

## Regras de uso

- **Não** redesenhar, distorcer, recolorir ou simplificar as logos.
- Preservar proporção (`object-fit: contain`) e margem de segurança.
- `DynamiCK` é a marca do **produto**: cabeçalho, favicon, landing, onboarding, início.
- `Conscious Knowledge` é a marca da **empresa**: rodapé, página "sobre", assinatura.
- Em fundo quase preto, conferir se partes escuras da imagem não somem. Se sumirem, usar
  superfície de contraste ou halo — **sem alterar o arquivo**.
- A logo não entra em movimento durante a resolução de questões.
- Formatos preferidos: SVG quando existir; PNG com fundo transparente caso contrário.

## Cores da marca

Os tokens em `css/tokens.css` (`--ck-green`, `--ck-teal`, `--ck-cyan`, `--ck-lime`) foram
estimados a partir das logos. Ao adicionar os arquivos oficiais, vale amostrar as cores
reais e ajustar esses quatro valores — todo o resto da interface acompanha sozinho.

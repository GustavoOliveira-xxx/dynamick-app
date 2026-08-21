# Assets de marca — onde colocar as logos oficiais

Esta pasta é a **camada substituível de marca** exigida pela §18 do prompt mestre.
Enquanto os arquivos oficiais não estiverem aqui, a aplicação desenha um fallback
provisório (marcado com `data-brand-fallback="true"` no HTML).

## Como ligar as logos oficiais

1. Coloque os arquivos exatamente com estes nomes:

```
public/assets/brand/dynamick/
  logo-full.png        # landing page e cabeçalho grande
  logo-compact.png     # menu e cabeçalho compacto
  symbol.png           # símbolo CK isolado (avatares, marcas de progresso)
  logo-mono.png        # versão monocromática
  logo-on-light.png    # versão para fundo claro
  favicon.png          # 512×512, usado no favicon

public/assets/brand/conscious-knowledge/
  logo-full.png
  logo-compact.png
  symbol.png
  logo-mono.png
  favicon.png
```

2. Em `src/components/brand/assets.ts`, troque:

```ts
export const useOfficialAssets = false;  // → true
```

Nenhuma tela precisa ser alterada. Todos os componentes leem daqui.

## Regras de uso (§18)

- **Não** redesenhar, distorcer, recolorir ou simplificar as logos.
- Preservar proporção (`object-fit: contain`) e margem de segurança.
- `DynamiCK` é a marca do **produto**: cabeçalho, favicon, landing, onboarding, dashboard.
- `Conscious Knowledge` é a marca da **empresa**: rodapé, página "sobre", assinatura.
- Em fundo quase preto, conferir se partes escuras da imagem não desaparecem. Se
  desaparecerem, use uma superfície de contraste ou halo — **sem alterar o arquivo**.
- A logo não entra em movimento durante a resolução de questões.
- Formatos preferidos: SVG quando existir; PNG com fundo transparente caso contrário.

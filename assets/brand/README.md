# Assets de marca

Camada substituível de marca. **Nenhuma tela desenha a logo por conta própria**:
todas passam por [`js/ui/brand.js`](../../js/ui/brand.js).

## Os dois arquivos

```
assets/brand/
  logo-dynamic.png   ← marca do PRODUTO (DynamiCK)
  logo-ck.png        ← marca da EMPRESA (Conscious Knowledge)
```

Os caminhos já estão apontados em `js/ui/brand.js`. Basta colocar os arquivos aqui
e trocar uma linha:

```js
export const USE_OFFICIAL_ASSETS = false;  // → true
```

Nenhuma outra alteração é necessária. Se depois existirem variantes (símbolo isolado,
monocromática, versão para fundo claro), é só apontar as chaves correspondentes em
`ASSETS`; enquanto não existirem, todas caem no arquivo principal.

## Estado atual

**Os arquivos ainda não estão aqui.** Enquanto não chegarem, o app desenha uma marca
provisória em SVG, identificada no HTML com `data-brand-fallback="true"`. Ela é um espaço
reservado, **não** uma proposta de identidade — a especificação proíbe recriar, redesenhar
ou interpretar as logos, então nada ali tenta imitá-las.

## Onde cada marca aparece

| Marca | Arquivo | Onde |
| --- | --- | --- |
| DynamiCK (produto) | `logo-dynamic.png` | cabeçalho do app, favicon, landing, onboarding, início |
| Conscious Knowledge (empresa) | `logo-ck.png` | rodapé, página "sobre", assinatura institucional |

A marca da empresa nunca substitui a do produto no cabeçalho do app.

## Regras de uso

- **Não** redesenhar, distorcer, recolorir ou simplificar as logos.
- Preservar proporção (`object-fit: contain`) e margem de segurança.
- Em fundo quase preto, conferir se partes escuras da imagem não somem. Se sumirem, usar
  superfície de contraste ou halo — **sem alterar o arquivo**.
- A logo não entra em movimento durante a resolução de questões.
- Formatos: SVG quando existir; PNG com fundo transparente caso contrário.

## Cores da marca

Os tokens em [`css/tokens.css`](../../css/tokens.css) (`--ck-green`, `--ck-teal`,
`--ck-cyan`, `--ck-lime`) foram estimados a partir das logos. Ao adicionar os arquivos
oficiais, vale amostrar as cores reais e ajustar esses quatro valores — todo o resto da
interface acompanha sozinho.

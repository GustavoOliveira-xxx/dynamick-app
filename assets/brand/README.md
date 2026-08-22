# Assets de marca

Camada substituível de marca. **Nenhuma tela desenha a logo por conta própria**: todas
passam por [`js/ui/brand.js`](../../js/ui/brand.js), e `USE_OFFICIAL_ASSETS` já está
ligado.

## Arquivos

```
assets/brand/
  originais/logo-dynamic.png   ← como veio, 1536x1024, intocado
  originais/logo-ck.png        ← como veio, 1536x1024, intocado

  logo-dynamic.png / .webp     ← 400x363, o que a aplicação carrega
  logo-ck.png / .webp          ← 340x350, o que a aplicação carrega
  favicon.png                  ← 192x192, quadrado com margem

  gerar-web.py                 ← regenera as versões web a partir dos originais
```

Os originais ficam guardados e nunca são servidos: 2 MB no cabeçalho de uma página aberta
em celular com plano limitado é peso demais, e o público é exatamente esse.

Para regenerar depois de trocar um original:

```bash
python3 assets/brand/gerar-web.py
```

## O que foi feito com a arte

- **Recorte da névoa externa** com opacidade ≤ 6/255 (cerca de 2%), invisível em qualquer
  fundo. Sem isso a logo ficava com uma moldura vazia enorme e encolhia dentro da própria
  caixa no cabeçalho.
- **Redução de escala** preservando a proporção.
- **WebP a q90** além do PNG. Conferido lado a lado em 1:1: sem banda no brilho, sem borda
  dura no halo. Corta 261 KB para 70 KB.

**Nada além disso.** Não houve recolorização, redesenho, distorção nem remoção de
elemento. A proporção real de cada arquivo está registrada em `ASSETS.ratio`, em
`brand.js`, justamente para que a marca nunca seja esticada.

## Onde cada marca aparece

| Marca | Arquivo | Onde | Largura exibida |
| --- | --- | --- | --- |
| DynamiCK (produto) | `logo-dynamic` | cabeçalho do app, favicon, landing, onboarding, início | 148 px na landing, 76 px no app |
| Conscious Knowledge (empresa) | `logo-ck` | rodapé, página "sobre", assinatura institucional | 96 px |

A marca da empresa nunca substitui a do produto no cabeçalho do app.

## Limitação conhecida

As duas logos são emblemas ilustrados, quase quadrados, com o letreiro embutido. Isso
funciona bem em tamanho grande, mas num cabeçalho de 40 px o letreiro vira mancha — por
isso o cabeçalho do app usa 76 px de largura, mais do que a marca provisória usava.

Se um dia existir uma **versão horizontal** (emblema à esquerda, letreiro à direita), ela
serviria muito melhor o cabeçalho e as telas estreitas. É trabalho de design, não de
código: basta adicionar o arquivo e apontar a variante `compact` para ele em `brand.js`.

## Regras de uso

- **Não** redesenhar, distorcer, recolorir ou simplificar as logos.
- Preservar proporção (`object-fit: contain`) e margem de segurança.
- Em fundo quase preto, conferir se partes escuras da imagem não somem.
- A logo não entra em movimento durante a resolução de questões.

## Cores da marca

Os tokens em [`css/tokens.css`](../../css/tokens.css) (`--ck-green`, `--ck-teal`,
`--ck-cyan`, `--ck-lime`) foram estimados antes das logos chegarem. Vale amostrar as cores
reais dos arquivos e ajustar esses quatro valores — todo o resto da interface acompanha
sozinho.

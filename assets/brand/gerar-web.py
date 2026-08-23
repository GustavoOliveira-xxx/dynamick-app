
"""
Gera as versões web das logos a partir dos originais em assets/brand/originais/.

Os originais têm 1536x1024 e cerca de 2 MB cada — peso alto demais para o
cabeçalho de uma página que vai ser aberta em celular com plano limitado, que é
justamente o público. Este script produz as versões que a aplicação carrega.

O que ele faz com a arte:
  - Recorta apenas a névoa externa com opacidade <= 6/255 (cerca de 2%), que é
    imperceptível em qualquer fundo. A ilustração em si não é tocada.
  - Reduz a escala preservando a proporção.
  - Grava PNG (compatibilidade) e WebP q90 (o que a maioria vai baixar).

O que ele NÃO faz, de propósito: recolorir, redesenhar, distorcer ou remover
elementos. Qualquer mudança na arte é decisão de quem desenhou a marca.

Uso:  python3 assets/brand/gerar-web.py
"""

from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent
ORIGINAIS = RAIZ / 'originais'


ALVOS = {
    'logo-dynamic': 400,
    'logo-ck': 340,
}


LIMIAR_ALPHA = 6


def preparar(nome: str, largura: int) -> None:
    origem = ORIGINAIS / f'{nome}.png'
    if not origem.exists():
        raise SystemExit(f'original ausente: {origem}')

    im = Image.open(origem).convert('RGBA')
    caixa = im.getchannel('A').point(lambda v: 255 if v > LIMIAR_ALPHA else 0).getbbox()
    im = im.crop(caixa)

    proporcao = im.size[1] / im.size[0]
    im = im.resize((largura, round(largura * proporcao)), Image.LANCZOS)

    png = RAIZ / f'{nome}.png'
    webp = RAIZ / f'{nome}.webp'
    im.save(png, 'PNG', optimize=True)


    im.save(webp, 'WEBP', quality=90, method=6)

    print(f'{nome}: {im.size[0]}x{im.size[1]}  '
          f'png={png.stat().st_size // 1024}KB  webp={webp.stat().st_size // 1024}KB')


def favicon() -> None:
    """Quadrado com margem, nunca recorte: a arte inteira cabe dentro."""
    im = Image.open(ORIGINAIS / 'logo-dynamic.png').convert('RGBA')
    caixa = im.getchannel('A').point(lambda v: 255 if v > LIMIAR_ALPHA else 0).getbbox()
    im = im.crop(caixa)
    im.thumbnail((180, 180), Image.LANCZOS)

    tela = Image.new('RGBA', (192, 192), (0, 0, 0, 0))
    tela.alpha_composite(im, ((192 - im.size[0]) // 2, (192 - im.size[1]) // 2))
    destino = RAIZ / 'favicon.png'
    tela.save(destino, 'PNG', optimize=True)
    print(f'favicon.png: 192x192  {destino.stat().st_size // 1024}KB')


if __name__ == '__main__':
    for nome, largura in ALVOS.items():
        preparar(nome, largura)
    favicon()

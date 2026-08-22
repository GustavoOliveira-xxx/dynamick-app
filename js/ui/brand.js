/**
 * CAMADA DE MARCA SUBSTITUÍVEL.
 *
 * As logos oficiais ainda não estão no repositório. Enquanto isso, este módulo desenha
 * uma marca PROVISÓRIA em SVG — geometria abstrata, sem recriar o personagem nem o
 * lettering originais — marcada com data-brand-fallback="true".
 *
 * Para ligar as oficiais: coloque os arquivos em assets/brand/ (veja o README de lá) e
 * troque USE_OFFICIAL_ASSETS para true. Nenhuma tela precisa mudar.
 */

import { el } from '../core/dom.js';

export const USE_OFFICIAL_ASSETS = true;

export const BRAND = {
  product: 'Dynamic CK',
  productCompact: 'DynamiCK',
  company: 'Conscious Knowledge',
  signature: 'by Conscious Knowledge',
  tagline:
    'Uma jornada de estudos que se adapta ao que você acerta, ao que você erra e ao tempo que você tem.',
};

/**
 * Um par de arquivos por marca: WebP para quem suporta (a maioria) e PNG como
 * garantia. Os dois saem do mesmo original, por assets/brand/gerar-web.py.
 *
 * `ratio` é a proporção real da arte. Ele existe para que o navegador reserve o
 * espaço certo antes da imagem chegar (sem salto de layout) e, principalmente,
 * para que a logo nunca seja esticada: distorcer a marca é proibido.
 */
const ASSETS = {
  dynamick: {
    webp: 'assets/brand/logo-dynamic.webp',
    png: 'assets/brand/logo-dynamic.png',
    ratio: 400 / 363,
  },
  consciousKnowledge: {
    webp: 'assets/brand/logo-ck.webp',
    png: 'assets/brand/logo-ck.png',
    ratio: 340 / 350,
  },
};

/**
 * Monta <picture> com WebP e PNG.
 * A altura vem da proporção real do arquivo, nunca de um número fixo.
 */
function brandPicture({ asset, alt, width, eager, className = 'brand-img' }) {
  const height = Math.round(width / asset.ratio);

  const picture = el('picture', { class: 'brand-picture' });
  picture.append(el('source', { srcset: asset.webp, type: 'image/webp' }));
  picture.append(
    el('img', {
      class: className,
      src: asset.png,
      alt,
      width,
      height,
      decoding: 'async',
      loading: eager ? 'eager' : 'lazy',
      ...(eager ? { fetchpriority: 'high' } : {}),
    }),
  );
  return picture;
}

/**
 * Largura de exibição da marca oficial, por variante. A altura sai da proporção.
 * A ilustração tem muito detalhe: abaixo de ~56px o emblema vira mancha, então o
 * cabeçalho compacto usa um valor maior do que o da marca provisória em SVG.
 */
const OFFICIAL_WIDTHS = {
  full: 148,
  compact: 76,
  symbol: 56,
  mono: 76,
};

const SIZES = {
  full: 38,
  compact: 30,
  symbol: 40,
  mono: 34,
};

const SVG_NS = 'http://www.w3.org/2000/svg';

function svg(tag, attrs) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  return node;
}

let gradientCounter = 0;

/** Símbolo provisório: escudo + núcleo luminoso + linhas orbitais + livro aberto. */
function provisionalMark(size, monochrome, animated) {
  const id = `ck-grad-${(gradientCounter += 1)}`;
  const root = svg('svg', {
    viewBox: '0 0 48 48',
    width: size,
    height: size,
    'aria-hidden': 'true',
    focusable: 'false',
  });
  root.style.flex = 'none';
  root.style.overflow = 'visible';
  if (animated) root.classList.add('brand-mark--animated');

  const defs = svg('defs', {});
  const gradient = svg('linearGradient', { id, x1: '0', y1: '0', x2: '1', y2: '1' });
  const stops = monochrome
    ? ['currentColor', 'currentColor', 'currentColor']
    : ['var(--ck-cyan)', 'var(--ck-green)', 'var(--ck-lime)'];
  ['0%', '55%', '100%'].forEach((offset, index) => {
    gradient.append(svg('stop', { offset, 'stop-color': stops[index] }));
  });
  defs.append(gradient);
  root.append(defs);

  const stroke = `url(#${id})`;

  // Escudo / crista
  root.append(
    svg('path', {
      d: 'M24 2.5 43 10v16.5c0 8.6-7.4 16.2-19 19.9C12.4 42.7 5 35.1 5 26.5V10Z',
      fill: 'var(--ck-bg-deep)',
      stroke,
      'stroke-width': '2',
      'stroke-linejoin': 'round',
    }),
  );
  // Núcleo luminoso
  root.append(svg('circle', { cx: 24, cy: 23, r: 5.4, fill: 'none', stroke, 'stroke-width': '1.6', opacity: '0.9' }));
  root.append(svg('circle', { cx: 24, cy: 23, r: 1.9, fill: stroke }));
  // Linhas orbitais — conexão entre tópicos
  root.append(
    svg('ellipse', {
      cx: 24, cy: 23, rx: 12.5, ry: 5.2, fill: 'none', stroke,
      'stroke-width': '1.1', opacity: '0.5', transform: 'rotate(-24 24 23)',
    }),
  );
  root.append(
    svg('ellipse', {
      cx: 24, cy: 23, rx: 12.5, ry: 5.2, fill: 'none', stroke,
      'stroke-width': '1.1', opacity: '0.32', transform: 'rotate(38 24 23)',
    }),
  );
  // Base: livro aberto estilizado
  root.append(
    svg('path', {
      d: 'M15 36.5c3-1.6 6-1.6 9 0 3-1.6 6-1.6 9 0',
      fill: 'none', stroke, 'stroke-width': '1.6', 'stroke-linecap': 'round', opacity: '0.75',
    }),
  );

  return root;
}

/**
 * Marca do produto.
 * @param {{variant?: 'full'|'compact'|'symbol'|'mono', animated?: boolean, signature?: boolean}} options
 */
export function dynamickLogo(options = {}) {
  const { variant = 'full', animated = true, signature = false } = options;
  const label = signature ? `${BRAND.product} ${BRAND.signature}` : BRAND.product;

  if (USE_OFFICIAL_ASSETS) {
    return brandPicture({
      asset: ASSETS.dynamick,
      alt: label,
      width: OFFICIAL_WIDTHS[variant] ?? OFFICIAL_WIDTHS.full,
      eager: true,
    });
  }

  const wrapper = el('span', {
    class: 'brand',
    role: 'img',
    'aria-label': label,
    'data-brand-fallback': 'true',
  });

  wrapper.append(provisionalMark(SIZES[variant] ?? 38, variant === 'mono', animated));

  if (variant !== 'symbol') {
    const lettering = el('span', { class: 'brand__text' });
    const name = el('span', {
      class: variant === 'compact' ? 'brand__name brand__name--sm' : 'brand__name',
    });
    name.append(el('span', {}, 'Dynami'));
    name.append(el('span', { class: 'brand__accent' }, 'CK'));
    lettering.append(name);
    if (signature) {
      lettering.append(el('span', { class: 'brand__signature' }, BRAND.signature));
    }
    wrapper.append(lettering);
  }

  return wrapper;
}

/** Marca institucional — tratamento deliberadamente mais discreto. */
export function consciousKnowledgeLogo(options = {}) {
  const { variant = 'compact' } = options;

  if (USE_OFFICIAL_ASSETS) {
    return brandPicture({
      asset: ASSETS.consciousKnowledge,
      alt: BRAND.company,
      width: variant === 'symbol' ? 40 : 96,
      eager: false,
      className: 'brand-img brand-img--institutional',
    });
  }

  const wrapper = el('span', {
    class: 'brand brand--institutional',
    role: 'img',
    'aria-label': BRAND.company,
    'data-brand-fallback': 'true',
  });

  const mark = svg('svg', { viewBox: '0 0 32 32', width: 26, height: 26, 'aria-hidden': 'true' });
  mark.style.flex = 'none';
  mark.append(svg('circle', { cx: 16, cy: 16, r: 13, fill: 'none', stroke: 'var(--ck-teal)', 'stroke-width': '1.4', opacity: '0.75' }));
  mark.append(svg('circle', { cx: 16, cy: 16, r: 6.5, fill: 'none', stroke: 'var(--ck-teal)', 'stroke-width': '1.2', opacity: '0.5' }));
  mark.append(svg('circle', { cx: 16, cy: 16, r: 2, fill: 'var(--ck-teal)' }));
  wrapper.append(mark);

  if (variant !== 'symbol') {
    wrapper.append(el('span', { class: 'brand__institutional-text' }, 'Conscious Knowledge'));
  }

  return wrapper;
}

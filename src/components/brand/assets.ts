/**
 * CAMADA DE MARCA SUBSTITUÍVEL (§18 do prompt mestre).
 *
 * As logos oficiais (DynamiCK e Conscious Knowledge) ainda NÃO estão no repositório.
 * Enquanto isso, os componentes desta pasta desenham um fallback provisório, claramente
 * marcado com `data-brand-fallback="true"`.
 *
 * PARA LIGAR AS LOGOS OFICIAIS:
 *   1. coloque os arquivos em public/assets/brand/dynamick/ e
 *      public/assets/brand/conscious-knowledge/ com os nomes abaixo;
 *   2. troque `useOfficialAssets` para true.
 * Nenhuma tela precisa ser editada.
 */

export const useOfficialAssets = false;

export const BRAND_ASSETS = {
  dynamick: {
    full: '/assets/brand/dynamick/logo-full.png',
    compact: '/assets/brand/dynamick/logo-compact.png',
    symbol: '/assets/brand/dynamick/symbol.png',
    mono: '/assets/brand/dynamick/logo-mono.png',
    onLight: '/assets/brand/dynamick/logo-on-light.png',
    favicon: '/assets/brand/dynamick/favicon.png',
  },
  consciousKnowledge: {
    full: '/assets/brand/conscious-knowledge/logo-full.png',
    compact: '/assets/brand/conscious-knowledge/logo-compact.png',
    symbol: '/assets/brand/conscious-knowledge/symbol.png',
    mono: '/assets/brand/conscious-knowledge/logo-mono.png',
    favicon: '/assets/brand/conscious-knowledge/favicon.png',
  },
} as const;

export const BRAND = {
  product: 'Dynamic CK',
  productCompact: 'DynamiCK',
  company: 'Conscious Knowledge',
  signature: 'by Conscious Knowledge',
  tagline:
    'Uma jornada de estudos que se adapta ao que você acerta, ao que você erra e ao tempo que você tem.',
} as const;

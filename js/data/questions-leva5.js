import { LINGUAGENS_QUESTOES_LEVA_5 } from './questions-leva5-linguagens.js';
import { MATEMATICA_QUESTOES_LEVA_5 } from './questions-leva5-matematica.js';
import { HUMANAS_QUESTOES_LEVA_5 } from './questions-leva5-humanas.js';
import { NATUREZA_QUESTOES_LEVA_5 } from './questions-leva5-natureza.js';
import { REDACAO_QUESTOES_LEVA_5 } from './questions-leva5-redacao.js';

export const QUESTOES_LEVA_5 = [
  ...LINGUAGENS_QUESTOES_LEVA_5,
  ...MATEMATICA_QUESTOES_LEVA_5,
  ...HUMANAS_QUESTOES_LEVA_5,
  ...NATUREZA_QUESTOES_LEVA_5,
  ...REDACAO_QUESTOES_LEVA_5,
];

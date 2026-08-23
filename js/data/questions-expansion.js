




import { LINGUAGENS_QUESTION_EXPANSION } from './questions-expansion-linguagens.js';
import { MATEMATICA_QUESTION_EXPANSION } from './questions-expansion-matematica.js';
import { HUMANAS_QUESTION_EXPANSION } from './questions-expansion-humanas.js';
import { NATUREZA_QUESTION_EXPANSION } from './questions-expansion-natureza.js';
import { REDACAO_QUESTION_EXPANSION } from './questions-expansion-redacao.js';

export const QUESTION_EXPANSION = [
  ...LINGUAGENS_QUESTION_EXPANSION,
  ...MATEMATICA_QUESTION_EXPANSION,
  ...HUMANAS_QUESTION_EXPANSION,
  ...NATUREZA_QUESTION_EXPANSION,
  ...REDACAO_QUESTION_EXPANSION,
];

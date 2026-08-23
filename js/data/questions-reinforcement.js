import { buildReinforcement } from './questions-reinforcement-factory.js';
import { LINGUAGENS_REINFORCEMENT_SETS } from './questions-reinforcement-linguagens.js';
import { MATEMATICA_REINFORCEMENT_SETS } from './questions-reinforcement-matematica.js';
import { HUMANAS_REINFORCEMENT_SETS } from './questions-reinforcement-humanas.js';
import { NATUREZA_REINFORCEMENT_SETS } from './questions-reinforcement-natureza.js';
import { REDACAO_REINFORCEMENT_SETS } from './questions-reinforcement-redacao.js';

export const QUESTION_REINFORCEMENT = buildReinforcement([
  ...LINGUAGENS_REINFORCEMENT_SETS,
  ...MATEMATICA_REINFORCEMENT_SETS,
  ...HUMANAS_REINFORCEMENT_SETS,
  ...NATUREZA_REINFORCEMENT_SETS,
  ...REDACAO_REINFORCEMENT_SETS,
]);

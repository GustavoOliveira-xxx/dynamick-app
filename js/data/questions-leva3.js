/**
 * Terceira leva de questões: cinco novas para CADA tópico do acervo.
 *
 * A regra desta leva é uniforme e vale para as onze matérias: todo assunto
 * cadastrado recebe cinco questões, nos cinco formatos cognitivos e com pelo
 * menos dois níveis de dificuldade. Nenhum tópico fica de fora, e nenhum
 * recebe mais que os outros.
 *
 * Assim como nas levas anteriores, a separação por arquivo mantém o acervo
 * original intacto e torna cada atualização auditável.
 */

import { LINGUAGENS_QUESTOES_LEVA_3 } from './questions-leva3-linguagens.js';
import { MATEMATICA_QUESTOES_LEVA_3 } from './questions-leva3-matematica.js';
import { HUMANAS_QUESTOES_LEVA_3 } from './questions-leva3-humanas.js';
import { NATUREZA_QUESTOES_LEVA_3 } from './questions-leva3-natureza.js';
import { REDACAO_QUESTOES_LEVA_3 } from './questions-leva3-redacao.js';

export const QUESTOES_LEVA_3 = [
  ...LINGUAGENS_QUESTOES_LEVA_3,
  ...MATEMATICA_QUESTOES_LEVA_3,
  ...HUMANAS_QUESTOES_LEVA_3,
  ...NATUREZA_QUESTOES_LEVA_3,
  ...REDACAO_QUESTOES_LEVA_3,
];

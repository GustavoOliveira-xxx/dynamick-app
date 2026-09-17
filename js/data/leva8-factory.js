/**
 * Oitava leva do catálogo — assuntos novos.
 *
 * As levas anteriores (3 a 7) acrescentaram questões aos assuntos que já
 * existiam. Esta leva faz o movimento contrário: abre assuntos novos nas
 * matérias que estavam mais magras, cada um entrando com o pacote padrão de
 * 5 questões principais + 1 de recuperação — exatamente como os assuntos de
 * hoje entraram antes de crescerem nas levas seguintes.
 */
import { question as questaoBase, topic } from './topic-factory.js';

export const ORIGIN_LEVA_8 = 'AUTORAL_LEVA_8_2026_09';

export function question(definition) {
  return questaoBase({ ...definition, origin: ORIGIN_LEVA_8 });
}

export { topic };

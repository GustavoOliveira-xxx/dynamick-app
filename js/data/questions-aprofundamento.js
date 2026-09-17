/**
 * Aprofundamento — assuntos que o estudante está vendo na escola e quer
 * estudar a fundo no DynamiCK. Estes pacotes elevam o assunto ao mesmo
 * tamanho dos assuntos consolidados do acervo (36 questões).
 */
import { QUESTOES_APROFUNDAMENTO_FUNCOES_ORGANICAS } from './questions-aprofundamento-quimica.js';
import { QUESTOES_APROFUNDAMENTO_ONDAS_SONORAS } from './questions-aprofundamento-fisica.js';

export const QUESTOES_APROFUNDAMENTO = [
  ...QUESTOES_APROFUNDAMENTO_FUNCOES_ORGANICAS,
  ...QUESTOES_APROFUNDAMENTO_ONDAS_SONORAS,
];

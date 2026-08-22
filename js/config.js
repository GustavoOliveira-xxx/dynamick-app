/**
 * Configuração de implantação.
 *
 * Este é o único arquivo que muda entre hospedagens. Não há etapa de build, e
 * é de propósito: quem publica edita um arquivo curto e legível, não descobre
 * qual variável de ambiente um empacotador leria.
 */

export const SYNC = {
  /**
   * Sincronização entre aparelhos.
   *
   * Ligue apenas onde existir servidor para as funções em /api — no Vercel, por
   * exemplo. Em hospedagem puramente estática (GitHub Pages, S3), deixe
   * desligado: sem back-end, /api responde 404 e a tela ofereceria algo que não
   * funciona.
   */
  habilitado: true,

  /**
   * Base das chamadas. Vazio significa mesma origem, que é o caso quando o
   * estático e as funções vivem no mesmo domínio (Vercel). Só preencha para
   * apontar a API em outro domínio — e aí é preciso liberar CORS lá.
   */
  base: '',
};

/**
 * Garante que só exista uma cena "pesada" ativa por vez (§18.3).
 * Cenas leves (baixa intensidade) não passam por aqui.
 */

let activeHeavyScene: symbol | null = null;

export function claimHeavyScene(token: symbol): boolean {
  if (activeHeavyScene === null || activeHeavyScene === token) {
    activeHeavyScene = token;
    return true;
  }
  return false;
}

export function releaseHeavyScene(token: symbol): void {
  if (activeHeavyScene === token) activeHeavyScene = null;
}

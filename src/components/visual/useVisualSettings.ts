'use client';

import { useEffect, useState } from 'react';

export type VisualSettings = {
  /** Movimento contínuo permitido? Falso com prefers-reduced-motion ou escolha do usuário. */
  motion: boolean;
  /** Fundo decorativo permitido? Falso no "modo visual reduzido". */
  decoration: boolean;
  /** Densidade de partículas já ajustada ao tamanho de tela e ao hardware. */
  density: number;
  ready: boolean;
};

/**
 * Fonte única das decisões visuais do cliente (§3.5 e §18.3):
 * prefers-reduced-motion, modo visual reduzido, tamanho de tela e economia de bateria.
 */
export function useVisualSettings(): VisualSettings {
  const [settings, setSettings] = useState<VisualSettings>({
    motion: false,
    decoration: false,
    density: 0,
    ready: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const smallQuery = window.matchMedia('(max-width: 767px)');

    function resolve() {
      const root = document.documentElement;
      const userMotion = root.dataset.motion === 'reduced';
      const userVisual = root.dataset.visual === 'reduced';
      const saveData =
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

      const reduceMotion = motionQuery.matches || userMotion;
      const decoration = !userVisual && !saveData;

      // Menos partículas em telas pequenas e em aparelhos de toque (§3.5).
      let density = 1;
      if (smallQuery.matches) density = 0.35;
      else if (coarseQuery.matches) density = 0.55;
      if (typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 4) <= 4) {
        density *= 0.6;
      }

      setSettings({
        motion: !reduceMotion && decoration,
        decoration,
        density,
        ready: true,
      });
    }

    resolve();

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion', 'data-visual'] });
    motionQuery.addEventListener('change', resolve);
    coarseQuery.addEventListener('change', resolve);
    smallQuery.addEventListener('change', resolve);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', resolve);
      coarseQuery.removeEventListener('change', resolve);
      smallQuery.removeEventListener('change', resolve);
    };
  }, []);

  return settings;
}

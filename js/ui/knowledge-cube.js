/**
 * Cubo de conhecimento do DynamiCK.
 *
 * CSS 3D é suficiente para esta peça: não adiciona biblioteca, não depende de WebGL
 * e preserva um fallback legível quando transform-style não está disponível.
 */

import { el } from '../core/dom.js';

const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];

/**
 * @param {{variant?: 'hero'|'loader'|'compact', className?: string}} options
 */
export function knowledgeCube(options = {}) {
  const { variant = 'hero', className = '' } = options;
  const root = el('div', {
    class: `knowledge-cube knowledge-cube--${variant}${className ? ` ${className}` : ''}`,
    'aria-hidden': 'true',
  });

  const orbitA = el('span', { class: 'knowledge-cube__orbit knowledge-cube__orbit--a' });
  const orbitB = el('span', { class: 'knowledge-cube__orbit knowledge-cube__orbit--b' });
  const orbitC = el('span', { class: 'knowledge-cube__orbit knowledge-cube__orbit--c' });
  const stage = el('span', { class: 'knowledge-cube__stage' });
  const body = el('span', { class: 'knowledge-cube__body' });

  for (const face of FACES) {
    const faceNode = el('span', { class: `knowledge-cube__face knowledge-cube__face--${face}` });
    for (let index = 0; index < 9; index += 1) {
      faceNode.append(
        el('span', {
          class: 'knowledge-cube__tile',
          style: { '--tile-index': String(index) },
        }),
      );
    }
    body.append(faceNode);
  }

  body.append(el('span', { class: 'knowledge-cube__core' }));
  stage.append(body);
  root.append(orbitA, orbitB, orbitC, stage);
  return root;
}

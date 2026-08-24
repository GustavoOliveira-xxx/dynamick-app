import { el } from '../core/dom.js';

const LOBES = [
  [-58, -28, 2, 38, 33], [-34, -51, 12, 42, 34], [-3, -58, 5, 39, 33],
  [30, -49, 16, 42, 35], [57, -24, 4, 37, 33], [-66, 5, 10, 39, 36],
  [-39, -13, 30, 43, 38], [-8, -20, 38, 45, 40], [24, -15, 34, 45, 39],
  [53, 7, 17, 41, 37], [-59, 38, 3, 39, 34], [-28, 31, 26, 44, 38],
  [5, 34, 36, 46, 39], [38, 34, 20, 43, 37], [58, 38, 2, 34, 31],
  [-35, 61, 7, 38, 31], [-2, 66, 14, 40, 31], [32, 59, 6, 38, 31],
];

export function brain3d({ size = 'md' } = {}) {
  const brain = el('div', { class: `brain-3d brain-3d--${size}`, 'aria-hidden': 'true' });
  const field = el('div', { class: 'brain-3d__field' });
  const core = el('div', { class: 'brain-3d__core' });
  const lobes = el('div', { class: 'brain-3d__lobes' });

  for (const [x, y, z, width, height] of LOBES) {
    lobes.append(
      el('span', {
        class: `brain-3d__lobe${x < 0 ? ' brain-3d__lobe--left' : ' brain-3d__lobe--right'}`,
        style: {
          '--brain-x': `${x}px`,
          '--brain-y': `${y}px`,
          '--brain-z': `${z}px`,
          '--brain-w': `${width}px`,
          '--brain-h': `${height}px`,
        },
      }),
    );
  }

  const signals = el(
    'div',
    { class: 'brain-3d__signals' },
    Array.from({ length: 9 }, (_, index) =>
      el('span', { style: { '--signal-index': String(index) } }),
    ),
  );

  core.append(lobes, el('span', { class: 'brain-3d__bridge' }), el('span', { class: 'brain-3d__stem' }));
  field.append(
    el('span', { class: 'brain-3d__orbit brain-3d__orbit--a' }),
    el('span', { class: 'brain-3d__orbit brain-3d__orbit--b' }),
    el('span', { class: 'brain-3d__orbit brain-3d__orbit--c' }),
    signals,
    core,
  );
  brain.append(field);

  const onMove = (event) => {
    const rect = brain.getBoundingClientRect();
    brain.style.setProperty('--brain-pointer-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 18}deg`);
    brain.style.setProperty('--brain-pointer-y', `${((event.clientY - rect.top) / rect.height - 0.5) * -12}deg`);
  };
  const onLeave = () => {
    brain.style.removeProperty('--brain-pointer-x');
    brain.style.removeProperty('--brain-pointer-y');
  };

  brain.addEventListener('pointermove', onMove, { passive: true });
  brain.addEventListener('pointerleave', onLeave);
  brain.dispose = () => {
    brain.removeEventListener('pointermove', onMove);
    brain.removeEventListener('pointerleave', onLeave);
  };
  return brain;
}

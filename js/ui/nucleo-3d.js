import { el } from '../core/dom.js';

const GIROS = [0, 90, 180, 270];
const ORBITAS = ['a', 'b', 'c'];
const FAISCAS = 7;

function metade(lado) {
  return el(
    'div',
    { class: `nucleo-3d__metade nucleo-3d__metade--${lado}` },
    GIROS.map((giro, indice) =>
      el('span', {
        class: 'nucleo-3d__face',
        style: { '--giro': `${giro}deg`, '--face': String(indice) },
      }),
    ),
  );
}

export function nucleo3d({ size = 'md' } = {}) {
  const peca = el('div', { class: `nucleo-3d nucleo-3d--${size}`, 'aria-hidden': 'true' });

  const cristal = el(
    'div',
    { class: 'nucleo-3d__cristal' },
    metade('cima'),
    metade('baixo'),
  );

  const orbitas = ORBITAS.map((letra) =>
    el(
      'div',
      { class: `nucleo-3d__orbita nucleo-3d__orbita--${letra}` },
      el('div', { class: 'nucleo-3d__anel' }, el('span', { class: 'nucleo-3d__no' })),
    ),
  );

  const faiscas = el(
    'div',
    { class: 'nucleo-3d__faiscas' },
    Array.from({ length: FAISCAS }, (_, indice) =>
      el('span', { style: { '--faisca': String(indice) } }),
    ),
  );

  const campo = el(
    'div',
    { class: 'nucleo-3d__campo' },
    orbitas,
    cristal,
    el('span', { class: 'nucleo-3d__brasa' }),
  );

  peca.append(el('span', { class: 'nucleo-3d__halo' }), campo, faiscas);

  const aoMover = (evento) => {
    const area = peca.getBoundingClientRect();
    peca.style.setProperty('--apontador-x', `${((evento.clientX - area.left) / area.width - 0.5) * 26}deg`);
    peca.style.setProperty('--apontador-y', `${((evento.clientY - area.top) / area.height - 0.5) * -18}deg`);
  };

  const aoSair = () => {
    peca.style.removeProperty('--apontador-x');
    peca.style.removeProperty('--apontador-y');
  };

  peca.addEventListener('pointermove', aoMover, { passive: true });
  peca.addEventListener('pointerleave', aoSair);
  peca.dispose = () => {
    peca.removeEventListener('pointermove', aoMover);
    peca.removeEventListener('pointerleave', aoSair);
  };

  return peca;
}

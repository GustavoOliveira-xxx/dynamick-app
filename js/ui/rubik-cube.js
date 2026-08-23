/**
 * Cubo mágico 3D — a peça de identidade do Dynamic CK na tela inicial.
 *
 * É um cubo 3x3 de verdade, não um enfeite girando sozinho:
 *  - 26 peças posicionadas em 3D, cada uma com sua orientação própria;
 *  - arrastar no vazio gira o cubo inteiro, com inércia;
 *  - arrastar em cima de uma peça gira a CAMADA daquela peça, no sentido do
 *    arraste — o mesmo gesto que se faz em um cubo de plástico;
 *  - teclado faz tudo o que o mouse faz, porque hover e arraste não podem ser a
 *    única forma de interagir;
 *  - embaralhar e resolver são botões de verdade.
 *
 * Escolhas técnicas:
 *  - CSS 3D, sem WebGL e sem biblioteca. Some o risco de tela preta quando o
 *    WebGL falha, e o custo cabe em qualquer celular.
 *  - A orientação de cada peça é uma matriz 3x3 de inteiros. Girar uma camada é
 *    multiplicar essa matriz por uma rotação de 90°, o que evita o acúmulo de
 *    erro de ponto flutuante que apareceria somando ângulos.
 *  - As cores são as do cubo original. O produto entra no entorno — aura,
 *    órbitas e brilho — e não repintando o objeto.
 */

import { el } from '../core/dom.js';
import { button } from './components.js';

/* ---------------------------------------------------------------- Geometria */

/** Faces e seus vetores normais no referencial do cubo. */
const FACES = [
  { id: 'U', axis: 'y', sign: -1, normal: [0, -1, 0] },
  { id: 'D', axis: 'y', sign: 1, normal: [0, 1, 0] },
  { id: 'R', axis: 'x', sign: 1, normal: [1, 0, 0] },
  { id: 'L', axis: 'x', sign: -1, normal: [-1, 0, 0] },
  { id: 'F', axis: 'z', sign: 1, normal: [0, 0, 1] },
  { id: 'B', axis: 'z', sign: -1, normal: [0, 0, -1] },
];

const AXIS_INDEX = { x: 0, y: 1, z: 2 };

/** Multiplica duas matrizes 3x3 de inteiros. */
function multiply(a, b) {
  const out = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      out[row][column] =
        a[row][0] * b[0][column] + a[row][1] * b[1][column] + a[row][2] * b[2][column];
    }
  }
  return out;
}

/** Rotação de 90° (ou -90°) em torno de um eixo, em inteiros exatos. */
function rotationMatrix(axis, quarterTurns) {
  const turns = ((quarterTurns % 4) + 4) % 4;
  const cos = [1, 0, -1, 0][turns];
  const sin = [0, 1, 0, -1][turns];

  if (axis === 'x') return [[1, 0, 0], [0, cos, -sin], [0, sin, cos]];
  if (axis === 'y') return [[cos, 0, sin], [0, 1, 0], [-sin, 0, cos]];
  return [[cos, -sin, 0], [sin, cos, 0], [0, 0, 1]];
}

function applyMatrix(matrix, vector) {
  return [0, 1, 2].map(
    (row) =>
      matrix[row][0] * vector[0] + matrix[row][1] * vector[1] + matrix[row][2] * vector[2],
  );
}

const IDENTITY = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

function matrix3d(m) {
  // CSS usa coluna-maior. A matriz é só rotação: sem escala e sem translação.
  return `matrix3d(${m[0][0]},${m[1][0]},${m[2][0]},0,${m[0][1]},${m[1][1]},${m[2][1]},0,${m[0][2]},${m[1][2]},${m[2][2]},0,0,0,0,1)`;
}

/* ---------------------------------------------------------------- Peças */

function createCubies() {
  const cubies = [];
  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        if (x === 0 && y === 0 && z === 0) continue; // o miolo não aparece
        cubies.push({ position: [x, y, z], orientation: IDENTITY, node: null });
      }
    }
  }
  return cubies;
}

/**
 * Constrói o elemento de uma peça com seus seis adesivos.
 * Adesivo voltado para fora recebe cor; voltado para dentro fica preto.
 */
function cubieElement(cubie, size) {
  const node = el('div', { class: 'ck-cube__cubie' });
  const half = size / 2;

  for (const face of FACES) {
    const [nx, ny, nz] = face.normal;
    const outward = cubie.position[AXIS_INDEX[face.axis]] === face.sign;
    const isCenter =
      outward &&
      cubie.position.filter((value) => value !== 0).length === 1;

    const sticker = el('span', {
      class: [
        'ck-cube__sticker',
        outward ? `ck-cube__sticker--${face.id}` : 'ck-cube__sticker--blank',
        isCenter ? 'ck-cube__sticker--core' : null,
      ]
        .filter(Boolean)
        .join(' '),
    });

    // Cada adesivo é girado para a sua face e empurrado meia aresta para fora.
    const rotation =
      face.id === 'F' ? 'rotateY(0deg)'
        : face.id === 'B' ? 'rotateY(180deg)'
          : face.id === 'R' ? 'rotateY(90deg)'
            : face.id === 'L' ? 'rotateY(-90deg)'
              : face.id === 'U' ? 'rotateX(90deg)'
                : 'rotateX(-90deg)';

    sticker.style.transform = `${rotation} translateZ(${half}px)`;
    if (outward) sticker.dataset.face = face.id;
    sticker.dataset.normal = `${nx},${ny},${nz}`;
    node.append(sticker);
  }

  return node;
}

/* ---------------------------------------------------------------- Componente */

const AXIS_KEYS = ['x', 'y', 'z'];

/**
 * @param {{
 *   size?: 'sm'|'md'|'lg',
 *   interactive?: boolean,   controles e arraste (padrão true)
 *   autoSpin?: boolean,      giro lento quando ninguém está mexendo
 *   label?: string,
 * }} options
 */
export function rubikCube(options = {}) {
  const {
    size = 'md',
    interactive = true,
    autoSpin = true,
    label = 'Cubo de conhecimento: gire com o mouse, o dedo ou o teclado.',
  } = options;

  const cubieSize = size === 'sm' ? 26 : size === 'lg' ? 42 : 34;
  const gap = 2;
  const step = cubieSize + gap;

  const root = el('div', { class: `ck-cube ck-cube--${size}` });
  const viewport = el('div', {
    class: 'ck-cube__viewport',
    role: interactive ? 'application' : 'img',
    'aria-label': label,
    tabindex: interactive ? '0' : null,
  });
  const body = el('div', { class: 'ck-cube__body' });
  const status = el('p', { class: 'ck-cube__status', role: 'status', 'aria-live': 'polite' });

  viewport.append(
    el('span', { class: 'ck-cube__aura', 'aria-hidden': 'true' }),
    el('span', { class: 'ck-cube__orbit ck-cube__orbit--a', 'aria-hidden': 'true' }),
    el('span', { class: 'ck-cube__orbit ck-cube__orbit--b', 'aria-hidden': 'true' }),
    body,
  );

  const cubies = createCubies();
  for (const cubie of cubies) {
    cubie.node = cubieElement(cubie, cubieSize);
    body.append(cubie.node);
  }

  /* ------------------------------------------------------------ Estado */

  let view = { x: -24, y: -32 }; // ângulos da câmera, em graus
  let spinVelocity = { x: 0, y: autoSpin ? 0.16 : 0 };
  let dragging = null;
  let animating = false;
  let queue = [];
  let frame = null;
  let disposed = false;

  function paintCubies() {
    for (const cubie of cubies) {
      const [x, y, z] = cubie.position;
      cubie.node.style.transform = `translate3d(${x * step}px, ${y * step}px, ${z * step}px) ${matrix3d(cubie.orientation)}`;
    }
  }

  function paintView() {
    body.style.transform = `rotateX(${view.x}deg) rotateY(${view.y}deg)`;
  }

  /* ------------------------------------------------------------ Giro de camada */

  /**
   * Gira uma camada.
   * @param {'x'|'y'|'z'} axis
   * @param {-1|0|1} layer  qual fatia do eixo
   * @param {1|-1} direction  sentido, em quartos de volta
   */
  function turn(axis, layer, direction, { animate = true, announce } = {}) {
    if (disposed) return Promise.resolve();
    if (animating) {
      // Fila curta: gestos rápidos não podem se perder nem se atropelar.
      if (queue.length < 6) queue.push([axis, layer, direction, { animate, announce }]);
      return Promise.resolve();
    }

    animating = true;
    const index = AXIS_INDEX[axis];
    const affected = cubies.filter((cubie) => cubie.position[index] === layer);
    const rotation = rotationMatrix(axis, direction);

    const group = el('div', {
      class: `ck-cube__layer${animate ? '' : ' ck-cube__layer--instant'}`,
    });
    body.append(group);
    for (const cubie of affected) group.append(cubie.node);

    function commit() {
      for (const cubie of affected) {
        cubie.position = applyMatrix(rotation, cubie.position).map((value) => Math.round(value));
        cubie.orientation = multiply(rotation, cubie.orientation);
        body.append(cubie.node);
      }
      group.remove();
      paintCubies();
      animating = false;
      if (announce) status.textContent = announce;

      const next = queue.shift();
      if (next) turn(...next);
    }

    if (!animate) {
      commit();
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        group.style.transform = `rotate${axis.toUpperCase()}(${direction * 90}deg)`;
        window.setTimeout(() => {
          commit();
          resolve();
        }, 420);
      });
    });
  }

  /* ------------------------------------------------------------ Arraste */

  /**
   * Descobre qual camada girar a partir do adesivo tocado e da direção do
   * arraste na tela. É a tradução do gesto do cubo físico para duas dimensões.
   */
  function layerFromGesture(sticker, dx, dy) {
    const cubie = cubies.find((item) => item.node === sticker.parentElement);
    if (!cubie) return null;

    // A normal do adesivo no mundo depende da orientação atual da peça.
    const localNormal = sticker.dataset.normal.split(',').map(Number);
    const normal = applyMatrix(cubie.orientation, localNormal).map(Math.round);
    const faceAxis = normal.findIndex((value) => value !== 0);
    if (faceAxis < 0) return null;

    /*
     * Projeta um vetor do cubo na tela, com a câmera atual.
     * A ordem é a mesma do CSS aplicado ao corpo: rotateX(view.x) rotateY(view.y),
     * e o eixo Y da tela cresce para BAIXO — igual ao deslocamento do ponteiro.
     */
    const rx = (view.x * Math.PI) / 180;
    const ry = (view.y * Math.PI) / 180;
    function project([x, y, z]) {
      const x1 = x * Math.cos(ry) + z * Math.sin(ry);
      const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
      return { x: x1, y: y * Math.cos(rx) - z1 * Math.sin(rx) };
    }

    /*
     * Girar em torno de um eixo u desloca um ponto p na direção de u × p.
     * Entre os dois eixos perpendiculares à face tocada, vence aquele cujo
     * deslocamento na tela mais se parece com o arraste do dedo; o sinal do
     * produto escalar dá o sentido do giro.
     */
    let best = null;
    for (const axis of [0, 1, 2].filter((value) => value !== faceAxis)) {
      const unit = [0, 0, 0];
      unit[axis] = 1;
      const motion = project([
        unit[1] * normal[2] - unit[2] * normal[1],
        unit[2] * normal[0] - unit[0] * normal[2],
        unit[0] * normal[1] - unit[1] * normal[0],
      ]);
      const score = motion.x * dx + motion.y * dy;
      if (!best || Math.abs(score) > Math.abs(best.score)) best = { axis, score };
    }

    // Gesto perpendicular ao único movimento possível: melhor não girar nada
    // do que girar a camada errada.
    if (!best || Math.abs(best.score) < 0.5) return null;

    return {
      axis: AXIS_KEYS[best.axis],
      layer: cubie.position[best.axis],
      direction: best.score > 0 ? 1 : -1,
    };
  }

  function onPointerDown(event) {
    if (!interactive || animating) return;
    const sticker = event.target.closest('.ck-cube__sticker');
    dragging = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      sticker: sticker && sticker.dataset.face ? sticker : null,
      resolved: false,
    };
    spinVelocity = { x: 0, y: 0 };
    viewport.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event) {
    if (!dragging || event.pointerId !== dragging.id) return;
    const dx = event.clientX - dragging.lastX;
    const dy = event.clientY - dragging.lastY;

    if (dragging.sticker && !dragging.resolved) {
      const totalX = event.clientX - dragging.startX;
      const totalY = event.clientY - dragging.startY;
      if (Math.hypot(totalX, totalY) < 14) return; // ainda é um clique, não um gesto

      const move = layerFromGesture(dragging.sticker, totalX, totalY);
      dragging.resolved = true;
      if (move) {
        turn(move.axis, move.layer, move.direction, {
          announce: 'Camada girada.',
        });
        return;
      }
    }

    if (dragging.sticker && dragging.resolved) return;

    view = {
      x: Math.max(-89, Math.min(89, view.x + dy * 0.4)),
      y: view.y + dx * 0.4,
    };
    spinVelocity = { x: dy * 0.12, y: dx * 0.12 };
    dragging.lastX = event.clientX;
    dragging.lastY = event.clientY;
    paintView();
  }

  function onPointerUp(event) {
    if (!dragging || event.pointerId !== dragging.id) return;
    viewport.releasePointerCapture?.(event.pointerId);
    dragging = null;
  }

  /* ------------------------------------------------------------ Teclado */

  const KEY_TURNS = {
    q: ['y', -1, -1, 'Camada de cima girada.'],
    w: ['y', -1, 1, 'Camada de cima girada ao contrário.'],
    a: ['x', -1, -1, 'Camada da esquerda girada.'],
    s: ['x', -1, 1, 'Camada da esquerda girada ao contrário.'],
    z: ['z', 1, -1, 'Camada da frente girada.'],
    x: ['z', 1, 1, 'Camada da frente girada ao contrário.'],
  };

  function onKeydown(event) {
    if (!interactive) return;
    const key = event.key.toLowerCase();

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      view.y += event.key === 'ArrowLeft' ? -12 : 12;
      paintView();
      return;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      view.x = Math.max(-89, Math.min(89, view.x + (event.key === 'ArrowUp' ? -12 : 12)));
      paintView();
      return;
    }
    if (KEY_TURNS[key]) {
      event.preventDefault();
      const [axis, layer, direction, announce] = KEY_TURNS[key];
      turn(axis, layer, direction, { announce });
    }
  }

  /* ------------------------------------------------------------ Ações */

  function randomTurn() {
    const axis = AXIS_KEYS[Math.floor(Math.random() * 3)];
    const layer = [-1, 0, 1][Math.floor(Math.random() * 3)];
    const direction = Math.random() < 0.5 ? 1 : -1;
    return [axis, layer, direction];
  }

  async function scramble(moves = 18) {
    status.textContent = 'Embaralhando…';
    for (let index = 0; index < moves; index += 1) {
      const [axis, layer, direction] = randomTurn();
      // eslint-disable-next-line no-await-in-loop
      await turn(axis, layer, direction, { animate: index > moves - 4 });
    }
    status.textContent = 'Embaralhado. Boa sorte.';
  }

  /**
   * Volta o cubo montado.
   * Recolocar cada peça na posição de origem é mais confiável do que desfazer a
   * sequência de giros: funciona mesmo se um gesto tiver sido interrompido.
   */
  function reset() {
    queue = [];
    let index = 0;
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          if (x === 0 && y === 0 && z === 0) continue;
          cubies[index].position = [x, y, z];
          cubies[index].orientation = IDENTITY;
          index += 1;
        }
      }
    }
    paintCubies();
    status.textContent = 'Cubo montado de novo.';
  }

  /* ------------------------------------------------------------ Animação */

  function tick() {
    if (disposed) return;
    if (!dragging) {
      const idle = Math.abs(spinVelocity.x) < 0.02 && Math.abs(spinVelocity.y) < 0.02;
      if (idle && autoSpin && !animating) {
        view.y += 0.12;
      } else {
        view.x = Math.max(-89, Math.min(89, view.x + spinVelocity.x));
        view.y += spinVelocity.y;
        spinVelocity = { x: spinVelocity.x * 0.94, y: spinVelocity.y * 0.94 };
      }
      paintView();
    }
    frame = requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------ Montagem */

  paintCubies();
  paintView();
  root.append(viewport);

  root.append(
    el(
      'p',
      { class: 'ck-cube__fallback' },
      'Seu navegador não desenha objetos 3D nesta tela. Nada do estudo depende disso: o cubo é decorativo.',
    ),
  );

  if (interactive) {
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('keydown', onKeydown);

    root.append(
      el(
        'div',
        { class: 'ck-cube__hud' },
        button({
          label: 'Embaralhar',
          variant: 'secondary',
          size: 'sm',
          onClick: () => scramble(),
        }),
        button({
          label: 'Montar de novo',
          variant: 'ghost',
          size: 'sm',
          onClick: reset,
        }),
      ),
      status,
      el(
        'p',
        { class: 'ck-cube__hint' },
        'Arraste no cubo para girar uma camada, arraste ao redor para virar o cubo inteiro. Pelo teclado: setas viram o cubo; Q, W, A, S, Z e X giram camadas.',
      ),
    );
  }

  const reduced =
    document.documentElement.dataset.motion === 'reduced' ||
    (document.documentElement.dataset.motion !== 'full' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

  if (!reduced) {
    frame = requestAnimationFrame(tick);
  }

  /** Encerra timers e ouvintes — chamado na limpeza da view. */
  root.dispose = () => {
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    viewport.removeEventListener('pointerdown', onPointerDown);
    viewport.removeEventListener('pointermove', onPointerMove);
    viewport.removeEventListener('pointerup', onPointerUp);
    viewport.removeEventListener('pointercancel', onPointerUp);
    viewport.removeEventListener('keydown', onKeydown);
  };

  return root;
}

/**
 * Fundo dinâmico: rede de conhecimento em 3D.
 *
 * Pontos distribuídos numa esfera (sequência de Fibonacci), rotacionados por matriz e
 * projetados em perspectiva sobre canvas 2D.
 *
 * POR QUE CANVAS 2D E NÃO WebGL: a aplicação precisa continuar utilizável se o WebGL
 * falhar. Aqui o caminho principal e o fallback são o mesmo código — não há contexto
 * perdido, não há vazamento de memória de cena, e o custo é baixo o bastante para
 * rodar em celular modesto.
 *
 * Garantias: pausa fora da viewport, pausa com a aba oculta, densidade reduzida em
 * telas pequenas e em economia de dados, um único quadro com movimento reduzido, e o
 * canvas é sempre aria-hidden + pointer-events:none — nunca cobre um botão.
 */

const PRESETS = {
  high: { nodes: 78, link: 0.62, glow: 0.5, spin: 0.045, tilt: 0.24 },
  'medium-high': { nodes: 56, link: 0.56, glow: 0.4, spin: 0.035, tilt: 0.2 },
  medium: { nodes: 38, link: 0.5, glow: 0.3, spin: 0.026, tilt: 0.16 },
  low: { nodes: 20, link: 0.42, glow: 0.2, spin: 0.016, tilt: 0.1 },
};

const GRADIENTS = {
  high:
    'radial-gradient(1100px 620px at 50% -12%, rgb(46 232 138 / 12%), transparent 62%),' +
    'radial-gradient(760px 520px at 88% 8%, rgb(53 214 192 / 9%), transparent 60%),' +
    'radial-gradient(680px 460px at 6% 32%, rgb(99 230 255 / 7%), transparent 58%)',
  'medium-high':
    'radial-gradient(900px 520px at 50% -14%, rgb(46 232 138 / 9%), transparent 60%),' +
    'radial-gradient(640px 420px at 92% 12%, rgb(53 214 192 / 7%), transparent 58%)',
  medium: 'radial-gradient(760px 420px at 50% -16%, rgb(46 232 138 / 6%), transparent 58%)',
  low: 'radial-gradient(640px 360px at 50% -20%, rgb(46 232 138 / 4%), transparent 55%)',
};

/** Só uma cena pesada por vez. */
let heavySceneOwner = null;

function visualSettings() {
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const userMotion = root.dataset.motion === 'reduced';
  const userVisual = root.dataset.visual === 'reduced';
  const saveData = navigator.connection?.saveData === true;

  const decoration = !userVisual && !saveData;
  const motion = decoration && !prefersReduced && !userMotion;

  let density = 1;
  if (window.matchMedia('(max-width: 767px)').matches) density = 0.35;
  else if (window.matchMedia('(pointer: coarse)').matches) density = 0.55;
  if ((navigator.hardwareConcurrency ?? 4) <= 4) density *= 0.6;

  return { motion, decoration, density };
}

/**
 * Monta o fundo dentro de um contêiner.
 * @param {HTMLElement} host
 * @param {{intensity?: keyof PRESETS, interactive?: boolean}} options
 * @returns {() => void} função de limpeza
 */
export function mountBackground(host, options = {}) {
  const intensity = options.intensity ?? 'medium';
  const interactive = options.interactive ?? false;

  host.replaceChildren();
  host.setAttribute('aria-hidden', 'true');
  host.className = 'bg-layer';

  // Gradiente base em CSS puro: dá profundidade sozinho e não depende de JS.
  const gradient = document.createElement('div');
  gradient.className = 'bg-layer__gradient';
  gradient.style.background = GRADIENTS[intensity];
  host.append(gradient);

  const { motion, decoration, density } = visualSettings();

  // Véu final: garante contraste do texto sobre qualquer estado da cena.
  const veil = document.createElement('div');
  veil.className = 'bg-layer__veil';

  if (!decoration || intensity === 'low') {
    host.append(veil);
    return () => host.replaceChildren();
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'bg-layer__canvas';
  host.append(canvas);
  host.append(veil);

  const context = canvas.getContext('2d');
  if (!context) {
    // Sem canvas 2D o gradiente continua valendo. Nada quebra.
    return () => host.replaceChildren();
  }

  const preset = PRESETS[intensity];
  const heavy = intensity === 'high' || intensity === 'medium-high';
  const token = Symbol('scene');
  if (heavy) {
    if (heavySceneOwner === null) heavySceneOwner = token;
  }
  const isOwner = !heavy || heavySceneOwner === token;
  const nodeCount = Math.max(8, Math.round(preset.nodes * density * (isOwner ? 1 : 0.4)));

  // Distribuição de Fibonacci: pontos espalhados na esfera, sem aglomerados.
  const nodes = Array.from({ length: nodeCount }, (_, index) => {
    const offset = 2 / nodeCount;
    const y = index * offset - 1 + offset / 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = index * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(phi) * radius, y, z: Math.sin(phi) * radius, seed: index * 0.618 };
  });

  let width = 0;
  let height = 0;
  let sphere = 0;

  function resize() {
    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    sphere = Math.min(width, height) * 0.42;
  }

  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;

  function onPointerMove(event) {
    // Resposta indireta e sutil. O layout nunca persegue o cursor.
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  }
  if (interactive && motion) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  let visible = true;
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0 },
  );
  intersectionObserver.observe(host);

  let frame = 0;
  let time = 0;
  let last = 0;

  function project(node, angle, tilt) {
    // Rotação em Y, depois inclinação em X — matriz aplicada à mão.
    const cosY = Math.cos(angle);
    const sinY = Math.sin(angle);
    const x1 = node.x * cosY - node.z * sinY;
    const z1 = node.x * sinY + node.z * cosY;

    const cosX = Math.cos(tilt);
    const sinX = Math.sin(tilt);
    const y1 = node.y * cosX - z1 * sinX;
    const z2 = node.y * sinX + z1 * cosX;

    // Perspectiva: pontos ao fundo ficam menores e mais apagados.
    const perspective = 2.6 / (2.6 - z2);
    return {
      x: width / 2 + x1 * sphere * perspective,
      y: height / 2 + y1 * sphere * perspective,
      depth: (z2 + 1) / 2,
      scale: perspective,
    };
  }

  function draw(timestamp) {
    frame = requestAnimationFrame(draw);

    if (!visible || document.hidden) {
      last = timestamp;
      return;
    }

    const delta = Math.min(64, timestamp - last || 16);
    last = timestamp;
    if (motion) time += delta / 1000;

    pointerX += (targetX - pointerX) * 0.04;
    pointerY += (targetY - pointerY) * 0.04;

    const angle = time * preset.spin + pointerX * 0.25;
    const tilt = preset.tilt + pointerY * 0.12;

    context.clearRect(0, 0, width, height);

    const projected = nodes
      .map((node) => ({ node, point: project(node, angle, tilt) }))
      .sort((a, b) => a.point.depth - b.point.depth);

    // Conexões: conhecimento ligado, não decoração aleatória.
    context.lineWidth = 1;
    const maxDistance = sphere * preset.link;
    for (let i = 0; i < projected.length; i += 1) {
      for (let j = i + 1; j < projected.length; j += 1) {
        const a = projected[i];
        const b = projected[j];
        const distance = Math.hypot(a.point.x - b.point.x, a.point.y - b.point.y);
        if (distance > maxDistance) continue;
        const strength =
          (1 - distance / maxDistance) * 0.4 * Math.min(a.point.depth, b.point.depth);
        if (strength <= 0.01) continue;
        context.strokeStyle = `rgba(53, 214, 192, ${strength * preset.glow})`;
        context.beginPath();
        context.moveTo(a.point.x, a.point.y);
        context.lineTo(b.point.x, b.point.y);
        context.stroke();
      }
    }

    // Nós
    for (const { node, point } of projected) {
      const pulse = motion ? 0.75 + Math.sin(time * 1.1 + node.seed * 6) * 0.25 : 1;
      const radius = Math.max(0.6, 1.9 * point.scale * point.depth) * pulse;
      const alpha = 0.18 + point.depth * 0.6;
      context.fillStyle = `rgba(46, 232, 138, ${alpha * preset.glow * 1.6})`;
      context.beginPath();
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fill();
    }

    // Núcleo luminoso central
    const coreRadius = sphere * 0.22;
    const core = context.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, coreRadius,
    );
    core.addColorStop(0, `rgba(92, 255, 176, ${0.16 * preset.glow})`);
    core.addColorStop(1, 'rgba(92, 255, 176, 0)');
    context.fillStyle = core;
    context.beginPath();
    context.arc(width / 2, height / 2, coreRadius, 0, Math.PI * 2);
    context.fill();

    // Com movimento reduzido, desenhamos um único quadro e paramos.
    if (!motion) cancelAnimationFrame(frame);
  }

  frame = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    if (interactive) window.removeEventListener('pointermove', onPointerMove);
    if (heavySceneOwner === token) heavySceneOwner = null;
    host.replaceChildren();
  };
}

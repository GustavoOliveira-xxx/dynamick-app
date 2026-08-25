const PRESETS = {
  high: { nodes: 82, dust: 38, link: 0.62, glow: 0.68, spin: 0.06, tilt: 0.24 },
  'medium-high': { nodes: 60, dust: 26, link: 0.56, glow: 0.52, spin: 0.045, tilt: 0.2 },
  medium: { nodes: 40, dust: 18, link: 0.5, glow: 0.36, spin: 0.032, tilt: 0.16 },
  low: { nodes: 20, dust: 8, link: 0.42, glow: 0.2, spin: 0.018, tilt: 0.1 },
};

const GRADIENTS = {
  high:
    'radial-gradient(1100px 720px at 72% 20%, rgb(46 232 138 / 17%), transparent 64%),' +
    'radial-gradient(800px 580px at 92% 8%, rgb(53 214 192 / 13%), transparent 61%),' +
    'radial-gradient(720px 520px at 2% 38%, rgb(99 230 255 / 9%), transparent 60%)',
  'medium-high':
    'radial-gradient(980px 620px at 76% 18%, rgb(46 232 138 / 13%), transparent 62%),' +
    'radial-gradient(720px 480px at 8% 34%, rgb(53 214 192 / 9%), transparent 60%)',
  medium:
    'radial-gradient(820px 480px at 72% 16%, rgb(46 232 138 / 8%), transparent 60%),' +
    'radial-gradient(560px 420px at 10% 62%, rgb(99 230 255 / 5%), transparent 62%)',
  low: 'radial-gradient(640px 360px at 50% -20%, rgb(46 232 138 / 4%), transparent 55%)',
};

const CONTEXT_ORIGINS = {
  landing: { x: 0.73, y: 0.43 },
  dashboard: { x: 0.76, y: 0.34 },
  map: { x: 0.58, y: 0.44 },
  app: { x: 0.72, y: 0.38 },
  focus: { x: 0.5, y: 0.3 },
};

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

export function mountBackground(host, options = {}) {
  const intensity = options.intensity ?? 'medium';
  const interactive = options.interactive ?? false;
  const sceneContext = options.context ?? 'app';

  host.replaceChildren();
  host.setAttribute('aria-hidden', 'true');
  host.className = 'bg-layer';
  host.dataset.context = sceneContext;

  const gradient = document.createElement('div');
  gradient.className = 'bg-layer__gradient';
  gradient.style.background = GRADIENTS[intensity];
  host.append(gradient);

  const atmosphere = document.createElement('div');
  atmosphere.className = 'bg-layer__atmosphere';
  atmosphere.append(
    Object.assign(document.createElement('span'), { className: 'bg-layer__aurora bg-layer__aurora--a' }),
    Object.assign(document.createElement('span'), { className: 'bg-layer__aurora bg-layer__aurora--b' }),
    Object.assign(document.createElement('span'), { className: 'bg-layer__grid' }),
    Object.assign(document.createElement('span'), { className: 'bg-layer__scan' }),
  );
  host.append(atmosphere);

  const { motion, decoration, density } = visualSettings();

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

  const nodes = Array.from({ length: nodeCount }, (_, index) => {
    const offset = 2 / nodeCount;
    const y = index * offset - 1 + offset / 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = index * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(phi) * radius, y, z: Math.sin(phi) * radius, seed: index * 0.618 };
  });
  const dust = Array.from({ length: Math.max(4, Math.round(preset.dust * density)) }, (_, index) => ({
    x: ((index * 0.754877666) % 1),
    y: ((index * 0.569840296 + 0.17) % 1),
    depth: 0.28 + ((index * 0.381966) % 1) * 0.72,
    phase: index * 1.732,
  }));

  let width = 0;
  let height = 0;
  let sphere = 0;
  let originX = 0;
  let originY = 0;

  function resize() {
    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    sphere = Math.min(width, height) * (sceneContext === 'landing' ? 0.46 : 0.42);
    const origin = CONTEXT_ORIGINS[sceneContext] ?? CONTEXT_ORIGINS.app;
    const compact = width < 760;
    originX = width * (compact ? 0.55 : origin.x);
    originY = height * (compact ? 0.36 : origin.y);
  }

  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;

  function onPointerMove(event) {

    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    host.style.setProperty('--background-shift-x', `${(event.clientX - window.innerWidth / 2) * -0.012}px`);
    host.style.setProperty('--background-shift-y', `${(event.clientY - window.innerHeight / 2) * -0.012}px`);
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

    const cosY = Math.cos(angle);
    const sinY = Math.sin(angle);
    const x1 = node.x * cosY - node.z * sinY;
    const z1 = node.x * sinY + node.z * cosY;

    const cosX = Math.cos(tilt);
    const sinX = Math.sin(tilt);
    const y1 = node.y * cosX - z1 * sinX;
    const z2 = node.y * sinX + z1 * cosX;

    const perspective = 2.6 / (2.6 - z2);
    return {
      x: originX + x1 * sphere * perspective,
      y: originY + y1 * sphere * perspective,
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

    for (const particle of dust) {
      const drift = motion ? time * (2 + particle.depth * 4) : 0;
      const x = (particle.x * width + drift + pointerX * 12 * particle.depth) % (width + 24) - 12;
      const y = particle.y * height + Math.sin(time * 0.28 + particle.phase) * 12 * particle.depth;
      const radius = 0.45 + particle.depth * 1.1;
      context.fillStyle = `rgba(99, 230, 255, ${0.04 + particle.depth * 0.12})`;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    const projected = nodes
      .map((node) => ({ node, point: project(node, angle, tilt) }))
      .sort((a, b) => a.point.depth - b.point.depth);

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

    context.save();
    context.translate(originX, originY);
    context.rotate(-0.22 + pointerY * 0.035);
    context.scale(1, 0.34);
    for (let ring = 0; ring < 3; ring += 1) {
      const ringRadius = sphere * (0.72 + ring * 0.17);
      context.strokeStyle = `rgba(${ring === 1 ? '99, 230, 255' : '53, 214, 192'}, ${0.055 + preset.glow * 0.08})`;
      context.lineWidth = 1 / 0.34;
      context.beginPath();
      context.arc(0, 0, ringRadius, 0, Math.PI * 2);
      context.stroke();
    }
    context.restore();

    for (let signal = 0; signal < 3; signal += 1) {
      const phase = time * (0.34 + signal * 0.05) + signal * 2.1;
      const radius = sphere * (0.78 + signal * 0.16);
      const x = originX + Math.cos(phase) * radius;
      const y = originY + Math.sin(phase) * radius * 0.34;
      const glow = context.createRadialGradient(x, y, 0, x, y, 13);
      glow.addColorStop(0, `rgba(184, 243, 106, ${0.45 * preset.glow})`);
      glow.addColorStop(1, 'rgba(184, 243, 106, 0)');
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, 13, 0, Math.PI * 2);
      context.fill();
    }

    for (const { node, point } of projected) {
      const pulse = motion ? 0.75 + Math.sin(time * 1.1 + node.seed * 6) * 0.25 : 1;
      const radius = Math.max(0.6, 1.9 * point.scale * point.depth) * pulse;
      const alpha = 0.18 + point.depth * 0.6;
      context.fillStyle = `rgba(46, 232, 138, ${alpha * preset.glow * 1.6})`;
      context.beginPath();
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fill();
    }

    const coreRadius = sphere * 0.22;
    const core = context.createRadialGradient(originX, originY, 0, originX, originY, coreRadius);
    core.addColorStop(0, `rgba(92, 255, 176, ${0.16 * preset.glow})`);
    core.addColorStop(1, 'rgba(92, 255, 176, 0)');
    context.fillStyle = core;
    context.beginPath();
    context.arc(originX, originY, coreRadius, 0, Math.PI * 2);
    context.fill();

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

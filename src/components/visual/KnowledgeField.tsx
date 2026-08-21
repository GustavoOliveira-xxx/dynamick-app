'use client';

import { useEffect, useRef } from 'react';
import { useVisualSettings } from './useVisualSettings';
import { claimHeavyScene, releaseHeavyScene } from './scene-registry';

type Props = {
  /** Controla densidade, brilho e amplitude — nunca a legibilidade do conteúdo. */
  intensity?: 'high' | 'medium-high' | 'medium' | 'low';
  /** Reage suavemente ao cursor. Desligado em telas de leitura e questões. */
  interactive?: boolean;
  className?: string;
};

type Node = { x: number; y: number; z: number; seed: number };

const PRESETS = {
  high: { nodes: 78, link: 0.62, glow: 0.5, spin: 0.045, tilt: 0.24 },
  'medium-high': { nodes: 56, link: 0.56, glow: 0.4, spin: 0.035, tilt: 0.2 },
  medium: { nodes: 38, link: 0.5, glow: 0.3, spin: 0.026, tilt: 0.16 },
  low: { nodes: 20, link: 0.42, glow: 0.2, spin: 0.016, tilt: 0.1 },
} as const;

/**
 * Rede de conhecimento em 3D — pontos distribuídos numa esfera, rotacionados por
 * matriz e projetados em perspectiva sobre canvas 2D.
 *
 * Por que canvas 2D e não WebGL (registrado em PROJECT_AUDIT.md §4): a §18.3 exige que a
 * aplicação continue utilizável se o WebGL falhar. Aqui o caminho principal e o fallback
 * são o mesmo código, sem contexto perdido nem vazamento de memória de cena.
 *
 * Garantias: pausa fora da viewport, pausa com a aba oculta, densidade reduzida em telas
 * pequenas, nada é desenhado com movimento reduzido e o elemento é sempre
 * `aria-hidden` + `pointer-events: none` — nunca cobre um botão (§20.1).
 */
export function KnowledgeField({ intensity = 'medium', interactive = false, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { motion, decoration, density, ready } = useVisualSettings();

  useEffect(() => {
    if (!ready || !decoration) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return; // sem canvas 2D, o gradiente do CSS continua valendo

    const preset = PRESETS[intensity];
    const heavy = intensity === 'high' || intensity === 'medium-high';
    const token = Symbol('knowledge-field');
    const isHeavyOwner = heavy ? claimHeavyScene(token) : true;
    const nodeCount = Math.max(8, Math.round(preset.nodes * density * (isHeavyOwner ? 1 : 0.4)));

    // Distribuição de Fibonacci: pontos bem espalhados na esfera, sem aglomerados.
    const nodes: Node[] = Array.from({ length: nodeCount }, (_, index) => {
      const offset = 2 / nodeCount;
      const y = index * offset - 1 + offset / 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = index * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(phi) * radius, y, z: Math.sin(phi) * radius, seed: index * 0.618 };
    });

    let width = 0;
    let height = 0;
    let sphereRadius = 0;
    let dpr = 1;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sphereRadius = Math.min(width, height) * 0.42;
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    function onPointerMove(event: PointerEvent) {
      // Resposta indireta e sutil: o ambiente inclina levemente, o layout nunca persegue o cursor.
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    }
    if (interactive && motion) window.addEventListener('pointermove', onPointerMove, { passive: true });

    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    let frame = 0;
    let time = 0;
    let lastTimestamp = 0;

    function project(node: Node, angle: number, tilt: number) {
      // Rotação em Y seguida de inclinação em X — matriz aplicada à mão, sem biblioteca.
      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const x1 = node.x * cosY - node.z * sinY;
      const z1 = node.x * sinY + node.z * cosY;

      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const y1 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;

      // Projeção em perspectiva: pontos ao fundo ficam menores e mais apagados.
      const perspective = 2.6 / (2.6 - z2);
      return {
        x: width / 2 + x1 * sphereRadius * perspective,
        y: height / 2 + y1 * sphereRadius * perspective,
        depth: (z2 + 1) / 2,
        scale: perspective,
      };
    }

    function draw(timestamp: number) {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) {
        lastTimestamp = timestamp;
        return;
      }

      const delta = Math.min(64, timestamp - lastTimestamp || 16);
      lastTimestamp = timestamp;
      if (motion) time += delta / 1000;

      pointerX += (targetX - pointerX) * 0.04;
      pointerY += (targetY - pointerY) * 0.04;

      const angle = time * preset.spin + pointerX * 0.25;
      const tilt = preset.tilt + pointerY * 0.12;

      context!.clearRect(0, 0, width, height);

      const projected = nodes.map((node) => ({ node, point: project(node, angle, tilt) }));
      projected.sort((a, b) => a.point.depth - b.point.depth); // pinta do fundo para a frente

      // Conexões: a ideia de conhecimento ligado, não decoração aleatória.
      context!.lineWidth = 1;
      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const a = projected[i]!;
          const b = projected[j]!;
          const dx = a.point.x - b.point.x;
          const dy = a.point.y - b.point.y;
          const distance = Math.hypot(dx, dy);
          const maxDistance = sphereRadius * preset.link;
          if (distance > maxDistance) continue;
          const strength = (1 - distance / maxDistance) * 0.4 * Math.min(a.point.depth, b.point.depth);
          if (strength <= 0.01) continue;
          context!.strokeStyle = `rgba(53, 214, 192, ${strength * preset.glow})`;
          context!.beginPath();
          context!.moveTo(a.point.x, a.point.y);
          context!.lineTo(b.point.x, b.point.y);
          context!.stroke();
        }
      }

      // Nós
      for (const { node, point } of projected) {
        const pulse = motion ? 0.75 + Math.sin(time * 1.1 + node.seed * 6) * 0.25 : 1;
        const radius = Math.max(0.6, 1.9 * point.scale * point.depth) * pulse;
        const alpha = 0.18 + point.depth * 0.6;
        context!.fillStyle = `rgba(46, 232, 138, ${alpha * preset.glow * 1.6})`;
        context!.beginPath();
        context!.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context!.fill();
      }

      // Núcleo luminoso central
      const coreRadius = sphereRadius * 0.22;
      const gradient = context!.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        coreRadius,
      );
      gradient.addColorStop(0, `rgba(92, 255, 176, ${0.16 * preset.glow})`);
      gradient.addColorStop(1, 'rgba(92, 255, 176, 0)');
      context!.fillStyle = gradient;
      context!.beginPath();
      context!.arc(width / 2, height / 2, coreRadius, 0, Math.PI * 2);
      context!.fill();

      // Com movimento reduzido desenhamos um único quadro e paramos.
      if (!motion) {
        cancelAnimationFrame(frame);
      }
    }

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) window.removeEventListener('pointermove', onPointerMove);
      releaseHeavyScene(token);
      context.clearRect(0, 0, width, height);
    };
  }, [intensity, interactive, motion, decoration, density, ready]);

  if (!decoration) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ''}`}
      style={{ opacity: 'var(--ck-visual-opacity)' }}
    />
  );
}

export default KnowledgeField;

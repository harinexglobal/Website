'use client';

import { useEffect, useRef } from 'react';

/**
 * The scene that lives *inside* the letterforms.
 *
 * Deliberately not biology. HariNex is a technology-transfer and materials
 * firm — biotech is one of seven verticals — so the fill is the firm's own
 * subject matter: crystal lattices forming and dissolving, particulate matter
 * drifting, and trade routes crossing the frame.
 *
 * How the knockout works: the scene is painted, then the wordmark is
 * composited over it with `destination-in`, which keeps scene pixels only
 * where the glyphs were. A CSS `background-clip: text` cannot do this — that
 * needs a CSS background, and a live <canvas> is not one.
 *
 * The canvas is `aria-hidden`; the caller renders a real <h1> for semantics.
 *
 * Canvas 2D rather than Three.js: the target look is flat, slow and luminous,
 * which WebGL buys nothing for. This holds 60fps on a phone at a fraction of
 * the bundle, and paints one still frame under prefers-reduced-motion.
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
type Route = { x: number; y: number; len: number; speed: number; a: number; w: number };

const LATTICE_LINK = 132; // px — draw a bond below this distance
const NODE_TARGET = 0.00006; // nodes per px², holds density constant across sizes

export function MaterialsCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let routes: Route[] = [];
    let raf = 0;
    let running = true;

    function seed() {
      const count = Math.round(width * height * NODE_TARGET);
      nodes = Array.from({ length: Math.max(28, Math.min(150, count)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        // Slow. Everything in this scene drifts rather than travels.
        vx: (Math.random() - 0.5) * 0.17,
        vy: (Math.random() - 0.5) * 0.17,
        r: 1 + Math.random() * 2.8,
        // Saffron through emerald — the brand's two accents, nothing else.
        hue: Math.random() < 0.6 ? 28 + Math.random() * 14 : 150 + Math.random() * 20,
      }));

      routes = Array.from({ length: 8 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        len: 140 + Math.random() * 300,
        speed: 0.25 + Math.random() * 0.45,
        a: 0.1 + Math.random() * 0.2,
        w: Math.random() < 0.5 ? 1.2 : 2,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed();
    }

    /** Paint the moving scene, full-bleed. */
    function paintScene() {
      const g = ctx!.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, '#0A192F');
      g.addColorStop(0.45, '#123A5E');
      g.addColorStop(1, '#06111C');
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, width, height);

      // Trade routes: long glints crossing behind the lattice.
      ctx!.lineCap = 'round';
      for (const r of routes) {
        if (running) r.x += r.speed;
        if (r.x - r.len > width) {
          r.x = -r.len;
          r.y = Math.random() * height;
        }
        const grad = ctx!.createLinearGradient(r.x - r.len, r.y, r.x, r.y);
        grad.addColorStop(0, 'rgba(16,185,129,0)');
        grad.addColorStop(0.6, `rgba(16,185,129,${r.a})`);
        grad.addColorStop(1, 'rgba(232,130,30,0)');
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = r.w;
        ctx!.beginPath();
        ctx!.moveTo(r.x - r.len, r.y);
        ctx!.lineTo(r.x, r.y);
        ctx!.stroke();
      }

      // Lattice bonds — the structure that makes it read as *material*.
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LATTICE_LINK * LATTICE_LINK) continue;
          const alpha = (1 - Math.sqrt(d2) / LATTICE_LINK) * 0.42;
          ctx!.strokeStyle = `rgba(148,197,255,${alpha})`;
          ctx!.lineWidth = 0.8;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // Particulate.
      for (const n of nodes) {
        if (running) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }
        const glow = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5.5);
        glow.addColorStop(0, `hsla(${n.hue},95%,66%,1)`);
        glow.addColorStop(1, `hsla(${n.hue},95%,66%,0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * 5.5, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function frame() {
      paintScene();
      if (running) raf = requestAnimationFrame(frame);
    }

    function start() {
      resize();
      // Wait for Space Grotesk, or the knockout is measured in a fallback face
      // and the glyphs jump when the real font lands.
      const go = () => {
        if (reduce) {
          running = false;
          paintScene();
        } else {
          running = true;
          raf = requestAnimationFrame(frame);
        }
      };
      if (document.fonts?.ready) void document.fonts.ready.then(go);
      else go();
    }

    start();

    const onResize = () => {
      resize();
      if (!running) {
        paintScene();
      }
    };
    window.addEventListener('resize', onResize);

    // Stop painting when the hero leaves the viewport — the single biggest win
    // for scroll performance further down the page.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

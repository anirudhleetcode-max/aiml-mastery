'use client';

import * as React from 'react';
import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force';
import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';
import { DOMAINS } from '@/data/domains';
import { useResponsiveCanvas } from '@/components/viz/widgets/shared';
import { isAtLeast } from '@/features/progress/mastery';
import type { GraphEdge, GraphNode } from './types';

/* ------------------------------------------------------------------ */
/* Layout constants                                                     */
/* ------------------------------------------------------------------ */

/** Simulation space, centred on the origin. Screen units come from the view. */
const WORLD = 1500;
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;

/** Node radius grows with how much the unit unlocks, not with how long it is. */
export function radiusFor(unlocks: number): number {
  return 4.5 + Math.sqrt(unlocks) * 2.6;
}

/**
 * One anchor per domain, placed around an ellipse in curriculum order, so the
 * settled graph reads left-to-right as a journey rather than a hairball.
 */
const ANCHORS: Record<string, { x: number; y: number }> = Object.fromEntries(
  DOMAINS.map((d, i) => {
    const a = (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
    return [d.id, { x: Math.cos(a) * WORLD * 0.38, y: Math.sin(a) * WORLD * 0.3 }];
  }),
);

/** Deterministic jitter, so a reload lays the graph out the same way twice. */
function jitter(i: number): number {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return (s - Math.floor(s) - 0.5) * 80;
}

interface SimNode extends SimulationNodeDatum {
  id: string;
  r: number;
  ax: number;
  ay: number;
  node: GraphNode;
}

type SimLink = SimulationLinkDatum<SimNode>;

interface View {
  x: number;
  y: number;
  k: number;
}

/* ------------------------------------------------------------------ */
/* Themed colours, read from CSS custom properties at draw time         */
/* ------------------------------------------------------------------ */

interface Palette {
  domain: (id: string, alpha?: number) => string;
  ink: (alpha?: number) => string;
  subtle: (alpha?: number) => string;
  line: (alpha?: number) => string;
  surface: (alpha?: number) => string;
  success: (alpha?: number) => string;
  primary: (alpha?: number) => string;
}

function hslFrom(triple: string, alpha: number): string {
  const parts = triple.trim().split(/[\s/]+/);
  if (parts.length < 3) return `rgba(136, 136, 136, ${alpha})`;
  return `hsla(${parseFloat(parts[0])}, ${parts[1]}, ${parts[2]}, ${alpha})`;
}

function readPalette(): Palette {
  const style = typeof window === 'undefined' ? null : getComputedStyle(document.documentElement);
  const raw = (name: string) => (style ? style.getPropertyValue(name).trim() : '');
  const domains: Record<string, string> = {};
  for (const d of DOMAINS) domains[d.id] = raw(`--d-${d.id}`);
  const text = raw('--c-text');
  const subtle = raw('--c-text-subtle');
  const border = raw('--c-border');
  const surface = raw('--c-surface');
  const success = raw('--c-success');
  const primary = raw('--c-primary');
  return {
    domain: (id, alpha = 1) => hslFrom(domains[id] ?? '', alpha),
    ink: (alpha = 1) => hslFrom(text, alpha),
    subtle: (alpha = 1) => hslFrom(subtle, alpha),
    line: (alpha = 1) => hslFrom(border, alpha),
    surface: (alpha = 1) => hslFrom(surface, alpha),
    success: (alpha = 1) => hslFrom(success, alpha),
    primary: (alpha = 1) => hslFrom(primary, alpha),
  };
}

/* ------------------------------------------------------------------ */

export interface FocusRequest {
  id: string;
  /** Bumped by the caller so the same unit can be re-centred. */
  nonce: number;
}

export interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  /** Ids passing the current filters. Everything else is drawn faintly. */
  visible: Set<string>;
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
  focus: FocusRequest | null;
  reducedMotion: boolean;
  ariaLabel: string;
  /** Called once the simulation has settled, so the shell can drop its notice. */
  onSettled?: () => void;
}

/**
 * The force-directed view of all 214 units.
 *
 * The simulation runs to a settled state and then stops: after that the canvas
 * only redraws in response to a pan, a zoom, a hover or a selection. There is
 * no permanent animation frame loop burning battery behind the page.
 */
export function GraphCanvas({
  nodes,
  edges,
  visible,
  selected,
  hovered,
  onSelect,
  onHover,
  focus,
  reducedMotion,
  ariaLabel,
  onSettled,
}: GraphCanvasProps) {
  const simNodesRef = React.useRef<SimNode[]>([]);
  const byIdRef = React.useRef<Map<string, SimNode>>(new Map());
  const edgesRef = React.useRef<GraphEdge[]>(edges);
  const viewRef = React.useRef<View>({ x: 0, y: 0, k: 1 });
  const paletteRef = React.useRef<Palette>(readPalette());
  const frameRef = React.useRef<number | null>(null);
  const tweenRef = React.useRef<number | null>(null);
  const settledRef = React.useRef(false);
  const touchedViewRef = React.useRef(false);
  const stateRef = React.useRef({ visible, selected, hovered });
  const [settled, setSettled] = React.useState(false);

  edgesRef.current = edges;

  /* ---- drawing ---------------------------------------------------- */

  const drawNow = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;

    const dpr = canvas.width / Math.max(1, w);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const p = paletteRef.current;
    const view = viewRef.current;
    const { visible: vis, selected: sel, hovered: hov } = stateRef.current;
    const byId = byIdRef.current;
    const active = hov ?? sel;

    // Neighbourhood of the active node: it and everything one hop away.
    let near: Set<string> | null = null;
    if (active) {
      const a = byId.get(active);
      near = new Set<string>([active]);
      if (a) {
        for (const id of a.node.prereqs) near.add(id);
        for (const id of a.node.next) near.add(id);
      }
    }

    ctx.save();
    ctx.translate(view.x, view.y);
    ctx.scale(view.k, view.k);

    /* edges */
    ctx.lineWidth = 1 / view.k;
    for (const e of edgesRef.current) {
      const s = byId.get(e.from);
      const t = byId.get(e.to);
      if (!s || !t || s.x == null || s.y == null || t.x == null || t.y == null) continue;

      const shown = vis.has(e.from) && vis.has(e.to);
      const linked = near ? near.has(e.from) && near.has(e.to) : false;
      if (!shown && !linked) continue;

      const dx = t.x - s.x;
      const dy = t.y - s.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist;
      const uy = dy / dist;
      const x0 = s.x + ux * (s.r + 1);
      const y0 = s.y + uy * (s.r + 1);
      const x1 = t.x - ux * (t.r + 3.5);
      const y1 = t.y - uy * (t.r + 3.5);
      const cx = (x0 + x1) / 2 - uy * dist * 0.1;
      const cy = (y0 + y1) / 2 + ux * dist * 0.1;

      const strong = linked;
      const alpha = strong ? 0.85 : near ? 0.06 : 0.22;
      ctx.strokeStyle = strong ? p.domain(s.node.domain, alpha) : p.line(alpha);
      ctx.lineWidth = (strong ? 1.6 : 1) / view.k;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cx, cy, x1, y1);
      ctx.stroke();

      if (strong || view.k > 1.1) {
        // Arrowhead aligned to the tangent at the target end.
        const tx = x1 - cx;
        const ty = y1 - cy;
        const tl = Math.hypot(tx, ty) || 1;
        const a = Math.atan2(ty / tl, tx / tl);
        const size = (strong ? 5.5 : 4) / Math.max(1, view.k * 0.7);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 - size * Math.cos(a - 0.4), y1 - size * Math.sin(a - 0.4));
        ctx.lineTo(x1 - size * Math.cos(a + 0.4), y1 - size * Math.sin(a + 0.4));
        ctx.closePath();
        ctx.fill();
      }
    }

    /* nodes */
    for (const n of simNodesRef.current) {
      if (n.x == null || n.y == null) continue;
      const shown = vis.has(n.id);
      const inNear = near ? near.has(n.id) : true;
      const dim = !shown || !inNear;
      const alpha = dim ? 0.12 : 1;
      const mastered = isAtLeast(n.node.mastery, 'MASTERED');
      const started = n.node.mastery !== 'NOT_STARTED';

      if (mastered && !dim) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 3.5, 0, Math.PI * 2);
        ctx.strokeStyle = p.domain(n.node.domain, 0.4);
        ctx.lineWidth = 1.5 / view.k;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = p.domain(n.node.domain, (mastered ? 0.95 : n.node.completed ? 0.55 : started ? 0.3 : 0.1) * alpha);
      ctx.fill();
      ctx.strokeStyle = p.domain(n.node.domain, (started ? 0.95 : 0.5) * alpha);
      ctx.lineWidth = (started ? 1.6 : 1.1) / view.k;
      ctx.stroke();

      if (n.id === sel) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2);
        ctx.strokeStyle = p.ink(0.85);
        ctx.lineWidth = 2 / view.k;
        ctx.stroke();
      }
    }

    /* labels — only where they can be read */
    const labelZoom = view.k > 1.5;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const n of simNodesRef.current) {
      if (n.x == null || n.y == null) continue;
      const isNear = near ? near.has(n.id) : false;
      const big = n.node.unlocks >= 4;
      const show = isNear || n.id === sel || (labelZoom && vis.has(n.id)) || (!near && big && view.k > 0.8);
      if (!show || !vis.has(n.id)) continue;

      const size = Math.max(9, 11 / view.k);
      ctx.font = `${size}px ui-sans-serif, system-ui, sans-serif`;
      const label = n.node.title.length > 34 ? `${n.node.title.slice(0, 33)}…` : n.node.title;
      const y = n.y + n.r + size * 0.95;
      const width = ctx.measureText(label).width;
      ctx.fillStyle = p.surface(isNear || n.id === sel ? 0.85 : 0.6);
      ctx.fillRect(n.x - width / 2 - 3 / view.k, y - size * 0.65, width + 6 / view.k, size * 1.3);
      ctx.fillStyle = isNear || n.id === sel ? p.ink(0.95) : p.subtle(0.95);
      ctx.fillText(label, n.x, y);
    }

    ctx.restore();
  }, []);

  const drawRef = React.useRef(drawNow);
  drawRef.current = drawNow;

  const requestDraw = React.useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      drawRef.current();
    });
  }, []);

  const { canvasRef } = useResponsiveCanvas(() => {
    if (settledRef.current && !touchedViewRef.current) fitRef.current();
    drawRef.current();
  }, []);

  /* ---- view helpers ----------------------------------------------- */

  const fit = React.useCallback(() => {
    const canvas = canvasRef.current;
    const list = simNodesRef.current;
    if (!canvas || list.length === 0) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const n of list) {
      if (n.x == null || n.y == null) continue;
      minX = Math.min(minX, n.x - n.r);
      minY = Math.min(minY, n.y - n.r);
      maxX = Math.max(maxX, n.x + n.r);
      maxY = Math.max(maxY, n.y + n.r);
    }
    if (!Number.isFinite(minX)) return;

    const pad = 28;
    const k = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, Math.min((w - pad * 2) / (maxX - minX || 1), (h - pad * 2) / (maxY - minY || 1))),
    );
    viewRef.current = {
      k,
      x: w / 2 - ((minX + maxX) / 2) * k,
      y: h / 2 - ((minY + maxY) / 2) * k,
    };
  }, [canvasRef]);

  const fitRef = React.useRef(fit);
  fitRef.current = fit;

  const centreOn = React.useCallback(
    (id: string, animate: boolean) => {
      const canvas = canvasRef.current;
      const n = byIdRef.current.get(id);
      if (!canvas || !n || n.x == null || n.y == null) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;

      touchedViewRef.current = true;
      const k = Math.min(MAX_ZOOM, Math.max(viewRef.current.k, 1.4));
      const target: View = { k, x: w / 2 - n.x * k, y: h / 2 - n.y * k };

      if (tweenRef.current !== null) {
        window.cancelAnimationFrame(tweenRef.current);
        tweenRef.current = null;
      }
      if (!animate) {
        viewRef.current = target;
        requestDraw();
        return;
      }

      const from = { ...viewRef.current };
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 420);
        const e = 1 - Math.pow(1 - t, 3);
        viewRef.current = {
          x: from.x + (target.x - from.x) * e,
          y: from.y + (target.y - from.y) * e,
          k: from.k + (target.k - from.k) * e,
        };
        drawRef.current();
        tweenRef.current = t < 1 ? window.requestAnimationFrame(step) : null;
      };
      tweenRef.current = window.requestAnimationFrame(step);
    },
    [canvasRef, requestDraw],
  );

  const zoomBy = React.useCallback(
    (factor: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const v = viewRef.current;
      const k = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.k * factor));
      const scale = k / v.k;
      touchedViewRef.current = true;
      viewRef.current = {
        k,
        x: w / 2 - (w / 2 - v.x) * scale,
        y: h / 2 - (h / 2 - v.y) * scale,
      };
      requestDraw();
    },
    [canvasRef, requestDraw],
  );

  const resetView = React.useCallback(() => {
    touchedViewRef.current = false;
    fitRef.current();
    requestDraw();
  }, [requestDraw]);

  /* ---- theme changes ---------------------------------------------- */

  React.useEffect(() => {
    const refresh = () => {
      paletteRef.current = readPalette();
      requestDraw();
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    return () => observer.disconnect();
  }, [requestDraw]);

  /* ---- keep the draw loop's view of React state fresh -------------- */

  React.useEffect(() => {
    stateRef.current = { visible, selected, hovered };
    requestDraw();
  }, [visible, selected, hovered, requestDraw]);

  /* ---- the simulation --------------------------------------------- */

  React.useEffect(() => {
    const simNodes: SimNode[] = nodes.map((n, i) => {
      const anchor = ANCHORS[n.domain] ?? { x: 0, y: 0 };
      return {
        id: n.id,
        r: radiusFor(n.unlocks),
        ax: anchor.x,
        ay: anchor.y,
        x: anchor.x + jitter(i),
        y: anchor.y + jitter(i + 977),
        node: n,
      };
    });
    const byId = new Map(simNodes.map((n) => [n.id, n]));
    simNodesRef.current = simNodes;
    byIdRef.current = byId;

    const links: SimLink[] = edges
      .filter((e) => byId.has(e.from) && byId.has(e.to))
      .map((e) => ({ source: e.from, target: e.to }));

    const sim = forceSimulation<SimNode>(simNodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance(46)
          .strength(0.22),
      )
      .force('charge', forceManyBody<SimNode>().strength(-95).distanceMax(460))
      .force(
        'collide',
        forceCollide<SimNode>()
          .radius((d) => d.r + 4.5)
          .strength(0.85),
      )
      .force('x', forceX<SimNode>((d) => d.ax).strength(0.075))
      .force('y', forceY<SimNode>((d) => d.ay).strength(0.075))
      .alphaDecay(0.032)
      .stop();

    let raf: number | null = null;
    let cancelled = false;

    const finish = () => {
      settledRef.current = true;
      if (!touchedViewRef.current) fitRef.current();
      drawRef.current();
      setSettled(true);
      onSettled?.();
    };

    if (reducedMotion) {
      // No animation at all: run it out, then paint the final layout once.
      for (let i = 0; i < 320; i++) sim.tick();
      finish();
    } else {
      let ticks = 0;
      const loop = () => {
        if (cancelled) return;
        sim.tick();
        sim.tick();
        ticks += 2;
        drawRef.current();
        if (sim.alpha() > 0.02 && ticks < 600) {
          raf = window.requestAnimationFrame(loop);
        } else {
          raf = null;
          finish();
        }
      };
      raf = window.requestAnimationFrame(loop);
    }

    return () => {
      cancelled = true;
      if (raf !== null) window.cancelAnimationFrame(raf);
      sim.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, reducedMotion]);

  React.useEffect(
    () => () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      if (tweenRef.current !== null) window.cancelAnimationFrame(tweenRef.current);
    },
    [],
  );

  /* ---- the focus request ------------------------------------------ */

  React.useEffect(() => {
    if (!focus || !settled) return;
    centreOn(focus.id, !reducedMotion);
  }, [focus, settled, centreOn, reducedMotion]);

  /* ---- pointer interaction ---------------------------------------- */

  const dragRef = React.useRef<{ id: number; x: number; y: number; moved: number } | null>(null);

  const nodeAt = React.useCallback(
    (clientX: number, clientY: number): SimNode | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const v = viewRef.current;
      const wx = (clientX - rect.left - v.x) / v.k;
      const wy = (clientY - rect.top - v.y) / v.k;
      let best: SimNode | null = null;
      let bestD = Infinity;
      for (const n of simNodesRef.current) {
        if (n.x == null || n.y == null) continue;
        if (!stateRef.current.visible.has(n.id)) continue;
        const d = Math.hypot(n.x - wx, n.y - wy);
        if (d < n.r + 7 / v.k && d < bestD) {
          bestD = d;
          best = n;
        }
      }
      return best;
    },
    [canvasRef],
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const v = viewRef.current;
      const k = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.k * Math.pow(0.999, e.deltaY)));
      const scale = k / v.k;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      touchedViewRef.current = true;
      viewRef.current = { k, x: px - (px - v.x) * scale, y: py - (py - v.y) * scale };
      requestDraw();
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [canvasRef, requestDraw]);

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (tweenRef.current !== null) {
      window.cancelAnimationFrame(tweenRef.current);
      tweenRef.current = null;
    }
    dragRef.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current;
    if (drag && drag.id === e.pointerId) {
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      drag.x = e.clientX;
      drag.y = e.clientY;
      touchedViewRef.current = true;
      viewRef.current = { ...viewRef.current, x: viewRef.current.x + dx, y: viewRef.current.y + dy };
      requestDraw();
      return;
    }
    const hit = nodeAt(e.clientX, e.clientY);
    if ((hit?.id ?? null) !== hovered) onHover(hit?.id ?? null);
  }

  function endDrag(e: React.PointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.id !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (drag.moved > 6) return;
    const hit = nodeAt(e.clientX, e.clientY);
    onSelect(hit ? hit.id : null);
    if (hit) centreOn(hit.id, !reducedMotion);
  }

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={ariaLabel}
        className="h-full w-full touch-none select-none"
        style={{ cursor: hovered ? 'pointer' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => onHover(null)}
      />

      <div className="absolute right-3 top-3 flex flex-col gap-1">
        {[
          { label: 'Zoom in', sign: '+', run: () => zoomBy(1.35) },
          { label: 'Zoom out', sign: '−', run: () => zoomBy(1 / 1.35) },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            aria-label={b.label}
            onClick={b.run}
            className="h-8 w-8 rounded-lg border border-line bg-surface/90 text-[15px] font-medium text-muted backdrop-blur transition-colors hover:text-ink"
          >
            {b.sign}
          </button>
        ))}
        <button
          type="button"
          onClick={resetView}
          className="rounded-lg border border-line bg-surface/90 px-2 py-1.5 text-[11px] font-medium text-muted backdrop-blur transition-colors hover:text-ink"
        >
          Fit
        </button>
      </div>

      {!settled && (
        <p className="pointer-events-none absolute left-3 top-3 rounded-lg border border-line bg-surface/90 px-2.5 py-1.5 text-[11.5px] text-subtle backdrop-blur">
          Settling the layout…
        </p>
      )}
    </div>
  );
}

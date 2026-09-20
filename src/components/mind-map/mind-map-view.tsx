'use client';

import * as React from 'react';
import Link from 'next/link';
import { domainColor } from '@/data/domains';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import type { DomainId } from '@/types/curriculum';
import { cn } from '@/lib/cn';

/* ------------------------------------------------------------------ */
/* Payload                                                              */
/* ------------------------------------------------------------------ */

export interface MindUnit {
  id: string;
  title: string;
  slug: string;
  completed: boolean;
  mastered: boolean;
}

export interface MindModule {
  name: string;
  units: MindUnit[];
}

export interface MindDomain {
  id: DomainId;
  name: string;
  shortName: string;
  tagline: string;
  total: number;
  completed: number;
  modules: MindModule[];
}

/* ------------------------------------------------------------------ */
/* Layout                                                               */
/* ------------------------------------------------------------------ */

type NodeKind = 'root' | 'domain' | 'module' | 'unit';

interface MapNode {
  key: string;
  kind: NodeKind;
  x: number;
  y: number;
  r: number;
  color: string;
  /** The same hue at low alpha, for fills. */
  soft: string;
  label: string;
  /** Degrees. Radial labels follow their spoke; vertical labels stay level. */
  labelRotate: number;
  labelDx: number;
  anchor: 'start' | 'middle' | 'end';
  fontSize: number;
  showLabel: boolean;
  domainId?: DomainId;
  slug?: string;
  completed?: boolean;
  mastered?: boolean;
  progress?: number;
  expanded?: boolean;
  aria: string;
  /** Native tooltip text, for the domain branches. */
  hint?: string;
}

interface MapLink {
  key: string;
  d: string;
  color: string;
  width: number;
}

interface Layout {
  nodes: MapNode[];
  links: MapLink[];
  width: number;
  height: number;
}

const CX = 560;
const CY = 560;
const R_DOMAIN = 180;
const R_MODULE = 292;
const R_UNIT = 402;

function polar(r: number, a: number): { x: number; y: number } {
  return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r };
}

/** The S-curve between two polar points, the shape a radial dendrogram uses. */
function radialLink(r0: number, a0: number, r1: number, a1: number): string {
  const rm = (r0 + r1) / 2;
  const p0 = polar(r0, a0);
  const c0 = polar(rm, a0);
  const c1 = polar(rm, a1);
  const p1 = polar(r1, a1);
  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} C ${c0.x.toFixed(1)} ${c0.y.toFixed(1)}, ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function layoutRadial(domains: MindDomain[], expanded: Set<DomainId>): Layout {
  const nodes: MapNode[] = [];
  const links: MapLink[] = [];

  // Angular space is shared out by how much each branch currently shows, so an
  // expanded domain is given room rather than being crushed into its slice.
  const weights = domains.map((d) => (expanded.has(d.id) ? Math.max(3, d.total) : 1));
  const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;

  nodes.push({
    key: 'root',
    kind: 'root',
    x: CX,
    y: CY,
    r: 54,
    color: 'hsl(var(--c-primary))',
    soft: 'hsl(var(--c-primary) / 0.12)',
    label: 'Artificial Intelligence',
    labelRotate: 0,
    labelDx: 0,
    anchor: 'middle',
    fontSize: 13,
    showLabel: true,
    aria: 'Artificial Intelligence, the centre of the map',
  });

  let cursor = -Math.PI / 2 - ((weights[0] ?? 1) / totalWeight) * Math.PI;
  domains.forEach((d, i) => {
    const span = (weights[i] / totalWeight) * Math.PI * 2;
    const mid = cursor + span / 2;
    cursor += span;

    const open = expanded.has(d.id);
    const p = polar(R_DOMAIN, mid);
    const right = Math.cos(mid) >= 0;
    const deg = (mid * 180) / Math.PI;

    links.push({
      key: `root-${d.id}`,
      d: radialLink(6, mid, R_DOMAIN, mid),
      color: domainColor(d.id, open ? 0.85 : 0.5),
      width: open ? 2.4 : 1.6,
    });

    nodes.push({
      key: d.id,
      kind: 'domain',
      x: p.x,
      y: p.y,
      r: 13,
      color: domainColor(d.id),
      soft: domainColor(d.id, 0.16),
      label: `${d.shortName} ${d.completed}/${d.total}`,
      // Collapsed labels point outwards into empty space; an open domain puts
      // its label back towards the centre so the modules get the outside.
      labelRotate: right ? deg : deg + 180,
      labelDx: open ? (right ? -20 : 20) : right ? 20 : -20,
      anchor: open ? (right ? 'end' : 'start') : right ? 'start' : 'end',
      fontSize: 12,
      showLabel: true,
      domainId: d.id,
      progress: d.total ? d.completed / d.total : 0,
      expanded: open,
      aria: `${d.name}. ${d.completed} of ${d.total} units complete. ${open ? 'Expanded' : 'Collapsed'}.`,
      hint: `${d.name} — ${d.tagline}`,
    });

    if (!open) return;

    const modWeights = d.modules.map((m) => Math.max(1, m.units.length));
    const modTotal = modWeights.reduce((a, b) => a + b, 0) || 1;
    // Keep a little padding inside the sector so neighbours do not touch.
    const inner = span * 0.92;
    let modCursor = mid - inner / 2;

    d.modules.forEach((m, mi) => {
      const modSpan = (modWeights[mi] / modTotal) * inner;
      const modMid = modCursor + modSpan / 2;
      modCursor += modSpan;

      const mp = polar(R_MODULE, modMid);
      const mRight = Math.cos(modMid) >= 0;
      const mDeg = (modMid * 180) / Math.PI;

      links.push({
        key: `${d.id}-${m.name}`,
        d: radialLink(R_DOMAIN, mid, R_MODULE, modMid),
        color: domainColor(d.id, 0.6),
        width: 1.5,
      });

      nodes.push({
        key: `${d.id}:${m.name}`,
        kind: 'module',
        x: mp.x,
        y: mp.y,
        r: 5.5,
        color: domainColor(d.id, 0.9),
        soft: domainColor(d.id, 0.2),
        label: truncate(m.name, 20),
        labelRotate: mRight ? mDeg : mDeg + 180,
        labelDx: mRight ? -10 : 10,
        anchor: mRight ? 'end' : 'start',
        fontSize: 10.5,
        showLabel: modSpan * R_MODULE > 15,
        aria: `${m.name}, a module of ${d.name}`,
      });

      const unitSpan = modSpan / Math.max(1, m.units.length);
      m.units.forEach((u, ui) => {
        const ua = modCursor - modSpan + unitSpan * (ui + 0.5);
        const up = polar(R_UNIT, ua);
        const uRight = Math.cos(ua) >= 0;
        const uDeg = (ua * 180) / Math.PI;

        links.push({
          key: `${m.name}-${u.id}`,
          d: radialLink(R_MODULE, modMid, R_UNIT, ua),
          color: domainColor(d.id, u.completed ? 0.55 : 0.28),
          width: 1,
        });

        nodes.push({
          key: u.id,
          kind: 'unit',
          x: up.x,
          y: up.y,
          r: 4.5,
          color: domainColor(d.id),
          soft: domainColor(d.id, 0.15),
          label: truncate(u.title, 22),
          labelRotate: uRight ? uDeg : uDeg + 180,
          labelDx: uRight ? 9 : -9,
          anchor: uRight ? 'start' : 'end',
          fontSize: 10,
          showLabel: unitSpan * R_UNIT > 13,
          slug: u.slug,
          completed: u.completed,
          mastered: u.mastered,
          aria: `${u.title}. ${u.mastered ? 'Mastered' : u.completed ? 'Completed' : 'Not completed'}. Opens the lesson.`,
        });
      });
    });
  });

  return { nodes, links, width: CX * 2, height: CY * 2 };
}

const V_WIDTH = 360;

function verticalLink(px: number, py: number, cx: number, cy: number): string {
  const mx = (px + cx) / 2;
  return `M ${px} ${py} C ${mx} ${py}, ${mx} ${cy}, ${cx} ${cy}`;
}

function layoutVertical(domains: MindDomain[], expanded: Set<DomainId>): Layout {
  const nodes: MapNode[] = [];
  const links: MapLink[] = [];

  const rootX = 26;
  const domainX = 52;
  const moduleX = 84;
  const unitX = 112;

  let y = 30;
  const rootY = y;

  nodes.push({
    key: 'root',
    kind: 'root',
    x: rootX,
    y: rootY,
    r: 12,
    color: 'hsl(var(--c-primary))',
    soft: 'hsl(var(--c-primary) / 0.12)',
    label: 'Artificial Intelligence',
    labelRotate: 0,
    labelDx: 20,
    anchor: 'start',
    fontSize: 13,
    showLabel: true,
    aria: 'Artificial Intelligence, the root of the map',
  });

  y += 44;

  for (const d of domains) {
    const open = expanded.has(d.id);
    const dy = y;

    links.push({
      key: `root-${d.id}`,
      d: verticalLink(rootX, rootY, domainX, dy),
      color: domainColor(d.id, open ? 0.85 : 0.45),
      width: open ? 2.2 : 1.5,
    });

    nodes.push({
      key: d.id,
      kind: 'domain',
      x: domainX,
      y: dy,
      r: 11,
      color: domainColor(d.id),
      soft: domainColor(d.id, 0.16),
      label: `${d.shortName} ${d.completed}/${d.total}`,
      labelRotate: 0,
      labelDx: 19,
      anchor: 'start',
      fontSize: 12,
      showLabel: true,
      domainId: d.id,
      progress: d.total ? d.completed / d.total : 0,
      expanded: open,
      aria: `${d.name}. ${d.completed} of ${d.total} units complete. ${open ? 'Expanded' : 'Collapsed'}.`,
      hint: `${d.name} — ${d.tagline}`,
    });

    y += 40;
    if (!open) continue;

    for (const m of d.modules) {
      const my = y;
      links.push({
        key: `${d.id}-${m.name}`,
        d: verticalLink(domainX, dy, moduleX, my),
        color: domainColor(d.id, 0.6),
        width: 1.4,
      });
      nodes.push({
        key: `${d.id}:${m.name}`,
        kind: 'module',
        x: moduleX,
        y: my,
        r: 5,
        color: domainColor(d.id, 0.9),
        soft: domainColor(d.id, 0.2),
        label: truncate(m.name, 30),
        labelRotate: 0,
        labelDx: 12,
        anchor: 'start',
        fontSize: 10.5,
        showLabel: true,
        aria: `${m.name}, a module of ${d.name}`,
      });
      y += 32;

      for (const u of m.units) {
        const uy = y;
        links.push({
          key: `${m.name}-${u.id}`,
          d: verticalLink(moduleX, my, unitX, uy),
          color: domainColor(d.id, u.completed ? 0.55 : 0.28),
          width: 1,
        });
        nodes.push({
          key: u.id,
          kind: 'unit',
          x: unitX,
          y: uy,
          r: 4.5,
          color: domainColor(d.id),
          soft: domainColor(d.id, 0.15),
          label: truncate(u.title, 34),
          labelRotate: 0,
          labelDx: 11,
          anchor: 'start',
          fontSize: 10.5,
          showLabel: true,
          slug: u.slug,
          completed: u.completed,
          mastered: u.mastered,
          aria: `${u.title}. ${u.mastered ? 'Mastered' : u.completed ? 'Completed' : 'Not completed'}. Opens the lesson.`,
        });
        y += 28;
      }
    }
  }

  return { nodes, links, width: V_WIDTH, height: y + 20 };
}

/* ------------------------------------------------------------------ */
/* View                                                                 */
/* ------------------------------------------------------------------ */

export interface MindMapViewProps {
  domains: MindDomain[];
  totals: { total: number; completed: number };
}

/**
 * The mind map.
 *
 * Orientation rather than dependency: one centre, fourteen branches, and the
 * modules and units underneath them. Wide screens get the radial arrangement;
 * below about 560px it becomes a vertical tree, which stays legible at 360px
 * where a squeezed circle would not.
 */
export function MindMapView({ domains, totals }: MindMapViewProps) {
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [mode, setMode] = React.useState<'radial' | 'vertical' | null>(null);
  const [expanded, setExpanded] = React.useState<Set<DomainId>>(() => new Set());

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = (w: number) => setMode(w < 560 ? 'vertical' : 'radial');
    measure(el.clientWidth || window.innerWidth);
    const ro = new ResizeObserver(([entry]) => {
      if (entry) measure(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layout = React.useMemo(() => {
    if (mode === null) return null;
    return mode === 'vertical' ? layoutVertical(domains, expanded) : layoutRadial(domains, expanded);
  }, [mode, domains, expanded]);

  function toggle(id: DomainId) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const transition = reducedMotion ? undefined : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <div className="mx-auto max-w-6xl">
      <header className="rounded-xl border border-line bg-gradient-to-br from-surface to-surface-2 p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Mind map</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">The whole field, from the centre out</h1>
        <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-subtle">
          Fourteen branches leave the centre. Open one to see its modules and the units inside them, and the branch
          shows how much of it you have finished. {totals.completed} of {totals.total} units complete.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setExpanded(new Set(domains.map((d) => d.id)))}
            className="rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-medium text-subtle transition-colors hover:text-ink"
          >
            Expand every branch
          </button>
          <button
            type="button"
            onClick={() => setExpanded(new Set())}
            className="rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-medium text-subtle transition-colors hover:text-ink"
          >
            Collapse all
          </button>
        </div>
      </header>

      <div
        ref={wrapRef}
        className={cn(
          'mt-4 rounded-xl border border-line bg-surface p-2 sm:p-4',
          mode === 'vertical' ? 'overflow-x-hidden' : 'h-[70vh] min-h-[420px]',
        )}
      >
        {layout && (
          <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            width="100%"
            height={mode === 'vertical' ? undefined : '100%'}
            role="group"
            aria-label={`Mind map of the curriculum: Artificial Intelligence at the centre, ${domains.length} domains, ${totals.total} units. Select a domain to expand it.`}
            className="block"
          >
            <g>
              {layout.links.map((l) => (
                <path
                  key={l.key}
                  d={l.d}
                  fill="none"
                  stroke={l.color}
                  strokeWidth={l.width}
                  strokeLinecap="round"
                  style={reducedMotion ? undefined : { transition: 'opacity 300ms ease' }}
                />
              ))}
            </g>

            {layout.nodes.map((n) => (
              <g key={n.key} style={{ transform: `translate(${n.x}px, ${n.y}px)`, transition }}>
                <MapNodeShape node={n} onToggle={toggle} />
              </g>
            ))}
          </svg>
        )}
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-subtle">
        Branch colours match the domain colours used across the roadmap and the knowledge graph. A filled circle on a
        unit means the lesson is done; a ring around it means the unit is mastered.
      </p>
    </div>
  );
}

function MapNodeShape({ node, onToggle }: { node: MapNode; onToggle: (id: DomainId) => void }) {
  const label = node.showLabel ? (
    <g transform={`rotate(${node.labelRotate})`}>
      <text
        x={node.labelDx}
        y={0}
        textAnchor={node.anchor}
        dominantBaseline="middle"
        fontSize={node.fontSize}
        fill={node.kind === 'unit' && !node.completed ? 'hsl(var(--c-text-subtle))' : 'hsl(var(--c-text))'}
        className="pointer-events-none select-none"
      >
        {node.label}
      </text>
    </g>
  ) : null;

  if (node.kind === 'root') {
    return (
      <g>
        <circle r={node.r} fill={node.soft} stroke="hsl(var(--c-primary) / 0.5)" strokeWidth={1.5} />
        {node.r > 20 ? (
          <text
            textAnchor="middle"
            fontSize={12}
            fill="hsl(var(--c-text))"
            className="select-none"
            fontWeight={600}
          >
            <tspan x={0} dy="-0.3em">
              Artificial
            </tspan>
            <tspan x={0} dy="1.2em">
              Intelligence
            </tspan>
          </text>
        ) : (
          label
        )}
      </g>
    );
  }

  if (node.kind === 'domain') {
    const c = 2 * Math.PI * (node.r + 4);
    return (
      <g
        role="button"
        tabIndex={0}
        aria-expanded={node.expanded}
        aria-label={node.aria}
        onClick={() => node.domainId && onToggle(node.domainId)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (node.domainId) onToggle(node.domainId);
          }
        }}
        className="group cursor-pointer outline-none"
      >
        {node.hint && <title>{node.hint}</title>}
        <circle r={node.r + 10} fill="transparent" />
        <circle
          r={node.r + 8}
          fill="none"
          stroke="hsl(var(--c-primary))"
          strokeWidth={1.5}
          className="opacity-0 group-focus-visible:opacity-100"
        />
        <circle r={node.r} fill={node.soft} stroke={node.color} strokeWidth={1.5} />
        <circle
          r={node.r + 4}
          fill="none"
          stroke={node.color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - (node.progress ?? 0))}
          transform="rotate(-90)"
          opacity={0.85}
        />
        {node.expanded ? (
          <path d="M -4 0 H 4" stroke="hsl(var(--c-text))" strokeWidth={1.6} strokeLinecap="round" />
        ) : (
          <path d="M -4 0 H 4 M 0 -4 V 4" stroke="hsl(var(--c-text))" strokeWidth={1.6} strokeLinecap="round" />
        )}
        {label}
      </g>
    );
  }

  if (node.kind === 'unit' && node.slug) {
    return (
      <Link href={`/learn/${node.slug}`} aria-label={node.aria} className="group outline-none">
        <g className="cursor-pointer">
          <circle r={node.r + 8} fill="transparent" />
          <circle
            r={node.r + 6}
            fill="none"
            stroke="hsl(var(--c-primary))"
            strokeWidth={1.5}
            className="opacity-0 group-focus-visible:opacity-100"
          />
          {node.mastered && <circle r={node.r + 3} fill="none" stroke={node.color} strokeWidth={1.2} opacity={0.6} />}
          <circle
            r={node.r}
            fill={node.completed ? node.color : node.soft}
            stroke={node.color}
            strokeWidth={1.1}
          />
          {label}
        </g>
      </Link>
    );
  }

  return (
    <g>
      <circle r={node.r} fill={node.color} opacity={0.85} />
      {label}
    </g>
  );
}

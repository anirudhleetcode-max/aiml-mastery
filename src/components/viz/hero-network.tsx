'use client';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * The landing-page hero: a layered network standing in for the shape of the
 * curriculum — inputs on the left, depth in the middle, understanding on the
 * right — with signals travelling along the edges.
 *
 * Performance is treated as a feature, not an afterthought (spec §45, §57):
 *   - two draw calls total (one Points, one LineSegments)
 *   - device pixel ratio capped at 1.5
 *   - rendering pauses entirely when the canvas scrolls out of view
 *   - a static, good-looking CSS fallback when motion is reduced or WebGL
 *     is unavailable, so nothing is ever broken or empty
 */

const LAYERS = [5, 9, 12, 12, 9, 4];
const LAYER_GAP = 2.5;
const SPREAD = 5.2;

interface Graph {
  positions: Float32Array;
  basePositions: Float32Array;
  nodeColors: Float32Array;
  linePositions: Float32Array;
  lineColors: Float32Array;
  edges: [number, number][];
  nodeLayer: number[];
  count: number;
}

function buildGraph(): Graph {
  const nodes: { x: number; y: number; z: number; layer: number }[] = [];

  LAYERS.forEach((size, layer) => {
    const x = (layer - (LAYERS.length - 1) / 2) * LAYER_GAP;
    for (let i = 0; i < size; i++) {
      const t = size === 1 ? 0.5 : i / (size - 1);
      nodes.push({
        x,
        y: (t - 0.5) * SPREAD * (0.55 + 0.45 * Math.sin(layer * 1.1 + 0.6)),
        z: (Math.sin(i * 2.399 + layer) * 0.5 + Math.cos(i * 1.7) * 0.5) * 1.5,
        layer,
      });
    }
  });

  const edges: [number, number][] = [];
  let offset = 0;
  for (let layer = 0; layer < LAYERS.length - 1; layer++) {
    const size = LAYERS[layer]!;
    const nextSize = LAYERS[layer + 1]!;
    const nextOffset = offset + size;
    for (let i = 0; i < size; i++) {
      // Connect to a deterministic subset — a fully connected graph is visual
      // noise and roughly six times the geometry.
      for (let j = 0; j < nextSize; j++) {
        const keep = (i * 7 + j * 13 + layer * 5) % 4 === 0 || j === (i * 2) % nextSize;
        if (keep) edges.push([offset + i, nextOffset + j]);
      }
    }
    offset = nextOffset;
  }

  const count = nodes.length;
  const positions = new Float32Array(count * 3);
  const nodeColors = new Float32Array(count * 3);
  const nodeLayer: number[] = [];

  nodes.forEach((n, i) => {
    positions[i * 3] = n.x;
    positions[i * 3 + 1] = n.y;
    positions[i * 3 + 2] = n.z;
    nodeLayer.push(n.layer);
    const t = n.layer / (LAYERS.length - 1);
    // violet → cyan across the depth of the network
    nodeColors[i * 3] = 0.62 - t * 0.44;
    nodeColors[i * 3 + 1] = 0.32 + t * 0.6;
    nodeColors[i * 3 + 2] = 1.0;
  });

  return {
    positions,
    basePositions: positions.slice(),
    nodeColors,
    linePositions: new Float32Array(edges.length * 6),
    lineColors: new Float32Array(edges.length * 6),
    edges,
    nodeLayer,
    count,
  };
}

/** A soft radial sprite — the default point is a hard square. */
function useDotTexture() {
  return React.useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.35, 'rgba(255,255,255,0.85)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Network({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const graph = React.useMemo(buildGraph, []);
  const dot = useDotTexture();
  const pointsRef = React.useRef<THREE.Points>(null);
  const linesRef = React.useRef<THREE.LineSegments>(null);
  const { camera } = useThree();

  const nodeGeometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(graph.positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(graph.nodeColors, 3));
    return g;
  }, [graph]);

  const lineGeometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(graph.linePositions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(graph.lineColors, 3));
    return g;
  }, [graph]);

  React.useEffect(
    () => () => {
      nodeGeometry.dispose();
      lineGeometry.dispose();
      dot.dispose();
    },
    [nodeGeometry, lineGeometry, dot],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { positions, basePositions, edges, linePositions, lineColors, nodeLayer } = graph;

    for (let i = 0; i < graph.count; i++) {
      const i3 = i * 3;
      const phase = i * 0.7;
      positions[i3] = basePositions[i3]! + Math.sin(t * 0.32 + phase) * 0.1;
      positions[i3 + 1] = basePositions[i3 + 1]! + Math.sin(t * 0.45 + phase) * 0.16;
      positions[i3 + 2] = basePositions[i3 + 2]! + Math.cos(t * 0.29 + phase) * 0.16;
    }
    nodeGeometry.attributes.position!.needsUpdate = true;

    // A wave of activation sweeping left to right, like a forward pass.
    const wave = ((t * 0.55) % 3.4) - 0.6;
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e]!;
      const a3 = a * 3;
      const b3 = b * 3;
      const o = e * 6;
      linePositions[o] = positions[a3]!;
      linePositions[o + 1] = positions[a3 + 1]!;
      linePositions[o + 2] = positions[a3 + 2]!;
      linePositions[o + 3] = positions[b3]!;
      linePositions[o + 4] = positions[b3 + 1]!;
      linePositions[o + 5] = positions[b3 + 2]!;

      const layerT = nodeLayer[a]! / (LAYERS.length - 1);
      const d = Math.abs(layerT - wave / 2.2);
      const pulse = Math.max(0, 1 - d * 5);
      const base = 0.035 + pulse * 0.4;
      // violet at the input side, cyan at the output side
      for (let k = 0; k < 2; k++) {
        const c = o + k * 3;
        lineColors[c] = base * (0.62 - layerT * 0.45);
        lineColors[c + 1] = base * (0.3 + layerT * 0.62);
        lineColors[c + 2] = base * 1.15;
      }
    }
    lineGeometry.attributes.position!.needsUpdate = true;
    lineGeometry.attributes.color!.needsUpdate = true;

    // Scroll gently rotates and pulls the camera back, so the network reads as
    // the roadmap opening out rather than as decoration.
    const scroll = scrollRef.current ?? 0;
    const targetY = 0.35 + scroll * 0.9;
    const targetZ = 11 + scroll * 5;
    camera.position.x += (-3.1 + Math.sin(t * 0.12) * 0.9 - camera.position.x) * 0.02;
    camera.position.y += (targetY + Math.sin(t * 0.16) * 0.5 - camera.position.y) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.03;
    camera.lookAt(0, 0, 0);

    if (pointsRef.current) pointsRef.current.rotation.y = Math.sin(t * 0.08) * 0.06 + scroll * 0.35;
    if (linesRef.current) linesRef.current.rotation.y = Math.sin(t * 0.08) * 0.06 + scroll * 0.35;
  });

  return (
    <group>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points ref={pointsRef} geometry={nodeGeometry}>
        <pointsMaterial
          size={0.34}
          map={dot}
          alphaTest={0.01}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function StaticFallback() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--c-primary)/0.22),transparent_62%)]" />
      <div className="absolute left-[28%] top-[42%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--c-accent)/0.16),transparent_65%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" aria-hidden>
        <defs>
          <pattern id="hero-dots" width="34" height="34" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="hsl(var(--c-primary) / 0.45)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
    </div>
  );
}

export default function HeroNetwork() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef(0);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        scrollRef.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced || failed) {
    return (
      <div ref={containerRef} className="absolute inset-0">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      <Canvas
        className="opacity-[0.72]"
        camera={{ position: [-3, 0.4, 11], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        onError={() => setFailed(true)}
      >
        <Network scrollRef={scrollRef} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,transparent_18%,hsl(var(--c-canvas)/0.55)_58%,hsl(var(--c-canvas))_86%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,hsl(var(--c-canvas))_18%,hsl(var(--c-canvas)/0.72)_38%,transparent_66%)]" />
    </div>
  );
}

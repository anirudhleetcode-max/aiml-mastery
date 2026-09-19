# Interactive widget contract

Widgets are the "see the mechanism move" half of every lesson. They are held
to the same standard as the prose: a widget that does not teach something the
text cannot is not worth its bytes.

## File and export shape

One file per widget at `src/components/viz/widgets/<widget-id>.tsx`, where
`<widget-id>` is exactly the id in `WIDGET_IDS` (`src/types/curriculum.ts`).

```tsx
'use client';

import * as React from 'react';
import { WidgetShell, Slider, Toggle, Readout, PlayButton, useResponsiveCanvas } from './shared';

export default function MyWidget({ props }: { props?: Record<string, unknown> }) { … }
```

The default export **must** accept `{ props }` (it may ignore it) and must be
the default export — `widget-mount.tsx` imports it dynamically by path.

## Reference implementations — read these first

- `src/components/viz/widgets/gradient-surface-3d.tsx` — 3D (react-three-fiber)
- `src/components/viz/widgets/big-o-growth.tsx` — 2D canvas + data table

Match their density, their comments, and their level of care.

## Rules

1. **Use `WidgetShell`** from `./shared` for chrome: it provides the frame,
   the `controls` slot, the `readout` slot and the `takeaway` line.
   Always write a `takeaway` — one sentence naming what the learner should
   notice. It is the reason the widget exists.
2. **Use the shared controls** (`Slider`, `Toggle`, `PlayButton`, `Readout`)
   rather than raw inputs, so 58 widgets feel like one product.
3. **Colours come from tokens only.** Use the `VIZ` object from `./shared`
   (`VIZ.series`, `VIZ.good`, `VIZ.warn`, `VIZ.info`, `VIZ.muted`, `VIZ.grid`,
   `VIZ.axis`) or Tailwind classes like `text-ink`, `bg-surface-2`,
   `border-line`, `text-primary`, `text-accent`. Never a raw hex outside a
   canvas colour resolved from a token. These are validated colours; do not
   invent new ones.
4. **Responsive.** Fixed heights are fine (`h-56`, `h-72`); fixed widths are
   not. Use `useResponsiveCanvas` for `<canvas>`, or an SVG with a `viewBox`.
   Must be usable at 360px wide.
5. **Reduced motion.** Anything that auto-animates must check
   `usePrefersReducedMotion()` from `@/lib/store/ui` and offer a manual
   Step control (or render the final state) instead of animating.
6. **Accessible.** Canvas and SVG get `role="img"` and a real `aria-label`.
   Every control has a label. Never rely on colour alone — pair it with a
   shape, a label or a number.
7. **Deterministic.** Seed any randomness so a learner can reason about what
   they are seeing. A "shuffle/new data" button is good; silent
   re-randomisation on every render is not.
8. **Self-contained.** No network calls, no new npm dependencies. `three` and
   `@react-three/fiber` are available for genuinely 3D concepts; do not reach
   for 3D where 2D is clearer.
9. **Performance.** Cap work per frame, stop animating when the widget is not
   playing, and dispose three.js geometries/materials on unmount.
10. **No placeholder text.** Every string must be real teaching copy.

## Tone

The same as the curriculum: precise, warm, no hype, no exclamation marks.
Labels are short; the `takeaway` does the teaching.

## Verifying

```
npx tsc --noEmit 2>&1 | grep -v '^src/data/curriculum/'
```
must be clean for your files.

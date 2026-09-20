import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { WIDGET_IDS } from '@/types/curriculum';
import { LABS } from '@/data/labs';

/**
 * Contract checks over the interactive widget suite.
 *
 * 58 widgets were authored against `docs/WIDGETS.md`; this is the mechanical
 * half of that contract, so a new widget cannot quietly drift from the house
 * style. The judgement half — whether the widget actually teaches anything —
 * is not automatable and lives in review.
 */

const DIR = path.resolve(process.cwd(), 'src/components/viz/widgets');
const files = readdirSync(DIR).filter((f) => f.endsWith('.tsx') && f !== 'shared.tsx');
const source = new Map(files.map((f) => [f.replace(/\.tsx$/, ''), readFileSync(path.join(DIR, f), 'utf8')]));

describe('widget suite', () => {
  it('implements every id the curriculum is allowed to reference', () => {
    const missing = WIDGET_IDS.filter((id) => !source.has(id));
    expect(missing, `unimplemented widgets: ${missing.join(', ')}`).toEqual([]);
  });

  it('has no widget files that are not declared in WIDGET_IDS', () => {
    const declared = new Set<string>(WIDGET_IDS);
    const extra = [...source.keys()].filter((id) => !declared.has(id));
    expect(extra, `undeclared widget files: ${extra.join(', ')}`).toEqual([]);
  });

  it('points every lab at a real widget', () => {
    const declared = new Set<string>(WIDGET_IDS);
    for (const lab of LABS) {
      expect(declared.has(lab.id), `lab "${lab.title}" references unknown widget ${lab.id}`).toBe(true);
    }
  });

  describe.each([...source.entries()])('%s', (id, code) => {
    it('is a client component with a default export', () => {
      expect(code.startsWith("'use client';"), `${id} must begin with 'use client'`).toBe(true);
      expect(/export default function|export default \w/.test(code)).toBe(true);
    });

    it('uses the shared chrome and states a takeaway', () => {
      expect(code.includes('WidgetShell'), `${id} must use WidgetShell`).toBe(true);
      expect(/takeaway=/.test(code), `${id} must state a takeaway`).toBe(true);
    });

    it('labels any canvas or svg it draws', () => {
      const draws = /<canvas|<svg/.test(code);
      if (!draws) return;
      expect(/role="img"/.test(code), `${id} draws but has no role="img"`).toBe(true);
      expect(/aria-label=/.test(code), `${id} draws but has no aria-label`).toBe(true);
    });

    it('resolves UI colour from design tokens rather than hard-coding it', () => {
      const hexes = [...code.matchAll(/['"]#[0-9a-fA-F]{3,8}['"]/g)];
      for (const match of hexes) {
        const value = match[0].slice(1, -1).toLowerCase();

        // Pure black and white are image *content*, not UI chrome: widgets
        // that synthesise a picture (a digit to augment, a pixel grid to
        // inspect) must draw the same pixels in both themes, and a label
        // written over a pixel has to contrast with that pixel rather than
        // with the page. Theming those would be a bug, not an improvement.
        if (/^#(0{3,8}|f{3,8})$/.test(value)) continue;

        // Everything else may only appear as the fallback argument of a token
        // lookup, which is what the reference widget does for canvas drawing.
        const line = code.slice(Math.max(0, match.index! - 160), match.index! + 20);
        const isFallback =
          /resolve\(|\?\?|\|\||fallback|useToken\(|createRadialGradient|addColorStop|emissive|color=\{?['"]#/.test(line);
        expect(isFallback, `${id}: raw colour ${match[0]} is not a token fallback`).toBe(true);
      }
    });

    it('honours reduced motion if it animates', () => {
      // A lone requestAnimationFrame is usually a DOM-settled callback (moving
      // a caret after a text edit), not an animation. What matters is a
      // recurring loop or a play/pause state.
      const animates =
        /useFrame|setInterval\(/.test(code) ||
        /const \[playing|const \[isPlaying|playing\s*&&|PlayButton/.test(code) ||
        (code.match(/requestAnimationFrame/g)?.length ?? 0) > 1;
      if (!animates) return;
      expect(
        /usePrefersReducedMotion|prefers-reduced-motion|reduced/.test(code),
        `${id} animates but never checks for reduced motion`,
      ).toBe(true);
    });

    it('does not reach the network or leak an API key', () => {
      // The Python playground is the one documented exception: it downloads
      // the Pyodide runtime into a worker, which is what keeps learner code
      // off the server entirely.
      if (id === 'code-playground') return;
      expect(/fetch\(|XMLHttpRequest|axios/.test(code), `${id} must not make network calls`).toBe(false);
    });
  });
});

/**
 * WCAG contrast gate for the UI design tokens.
 *
 * The chart palette is validated separately (scripts/validate_palette.js);
 * this covers the semantic UI scale, which axe was failing on. Every pair
 * below is one that actually occurs in the interface: a text token over a
 * surface it is rendered on, or the contrast token over its own fill.
 *
 * Run: node scripts/check-contrast.mjs [--suggest]
 */
import fs from 'node:fs';

const AA_SMALL = 4.5; // body text
const AA_LARGE = 3.0; // >=18.66px bold or >=24px

/* ----------------------------------------------------------- colour --- */

function hsl2rgb(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const parse = (s) => { const [h, sa, l] = s.split(/\s+/).map(parseFloat); return { h, s: sa, l }; };
const rgb = ({ h, s, l }) => hsl2rgb(h, s, l);
const hex = ([r, g, b]) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

/* -------------------------------------------------------- extraction --- */

const css = fs.readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');

function blockAfter(selector) {
  const i = css.indexOf(selector);
  if (i < 0) throw new Error(`selector not found: ${selector}`);
  let k = css.indexOf('{', i) + 1;
  let depth = 1;
  const start = k;
  while (depth > 0) {
    if (css[k] === '{') depth += 1;
    else if (css[k] === '}') depth -= 1;
    k += 1;
  }
  return css.slice(start, k - 1);
}

function tokensIn(block) {
  const out = {};
  for (const m of block.matchAll(/--([\w-]+):\s*([\d.]+\s+[\d.]+%\s+[\d.]+%)\s*;/g)) out[m[1]] = parse(m[2]);
  return out;
}

const THEMES = { dark: tokensIn(blockAfter(':root {')), light: tokensIn(blockAfter('.light')) };

/* ------------------------------------------------------------ pairs --- */

const SURFACES = ['c-canvas', 'c-surface', 'c-surface-2', 'c-surface-3'];
const BODY_TEXT = ['c-text', 'c-text-muted', 'c-text-subtle'];
/**
 * Tokens used as coloured TEXT on a surface (badges, links, stat values).
 * `c-primary` is deliberately absent: it is a fill, and its text counterpart
 * is `c-primary-ink`. One value cannot serve both — a fill dark enough for
 * near-white label text is too dark to read against a dark surface.
 */
const ACCENT_TEXT = ['c-primary-ink', 'c-success', 'c-warning', 'c-danger', 'c-info', 'c-xp', 'c-accent', 'c-accent-2'];

/** Tokens used as a FILL behind `c-primary-contrast` label text. */
const FILLS = ['c-primary', 'c-primary-soft'];

function pairs(t) {
  const out = [];
  for (const fg of BODY_TEXT) for (const bg of SURFACES) out.push([fg, bg, AA_SMALL]);
  for (const fg of ACCENT_TEXT) for (const bg of SURFACES) out.push([fg, bg, AA_SMALL]);
  for (const k of Object.keys(t).filter((k) => k.startsWith('d-'))) {
    for (const bg of SURFACES) out.push([k, bg, AA_SMALL]);
  }
  for (const fill of FILLS) out.push(['c-primary-contrast', fill, AA_SMALL]);
  out.push(['c-border-strong', 'c-surface', AA_LARGE]); // visible separators
  return out;
}

/** Smallest lightness change that reaches `min`, keeping hue and saturation. */
function suggest(fg, bg, min, towardLight) {
  for (let step = 0; step <= 100; step += 0.5) {
    const l = towardLight ? fg.l + step : fg.l - step;
    if (l < 0 || l > 100) break;
    if (ratio(rgb({ ...fg, l }), rgb(bg)) >= min) return Math.round(l * 10) / 10;
  }
  return null;
}

/* ------------------------------------------------------------- run --- */

const wantSuggest = process.argv.includes('--suggest');
let failures = 0;
const needed = {};

for (const [mode, t] of Object.entries(THEMES)) {
  const isDark = mode === 'dark';
  for (const [fg, bg, min] of pairs(t)) {
    if (!t[fg] || !t[bg]) continue;
    const r = ratio(rgb(t[fg]), rgb(t[bg]));
    if (r >= min) continue;
    failures += 1;
    // Text tokens move away from the surface; the contrast token moves toward
    // the extreme it already sits at.
    const toward = fg === 'c-primary-contrast' ? t[fg].l > 50 : isDark;
    const target = wantSuggest ? suggest(t[fg], t[bg], min, toward) : null;
    const key = `${mode}:${fg}`;
    if (target !== null) needed[key] = toward ? Math.max(needed[key] ?? 0, target) : Math.min(needed[key] ?? 100, target);
    console.log(
      `FAIL ${r.toFixed(2).padStart(5)} (need ${min})  ${mode.padEnd(5)} ${fg.padEnd(18)} on ${bg.padEnd(13)} ` +
        `${hex(rgb(t[fg]))} on ${hex(rgb(t[bg]))}`,
    );
  }
}

if (wantSuggest && Object.keys(needed).length) {
  console.log('\nMinimum lightness to satisfy every pair (hue and saturation unchanged):');
  for (const [k, l] of Object.entries(needed)) {
    const [mode, tok] = k.split(':');
    const cur = THEMES[mode][tok];
    console.log(`  ${mode.padEnd(5)} --${tok}: ${cur.h} ${cur.s}% ${cur.l}%  ->  ${cur.h} ${cur.s}% ${l}%`);
  }
}

if (failures) {
  console.error(`\n✗ ${failures} token pair(s) below WCAG AA.`);
  process.exit(1);
}
console.log('✓ All UI token pairs meet WCAG AA.');

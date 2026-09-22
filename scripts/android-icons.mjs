#!/usr/bin/env node
/**
 * Renders every Android launcher, adaptive-icon and splash asset from
 * `public/icon.svg`.
 *
 * The Android app reuses the site's existing mark rather than inventing a
 * second visual identity, and this script is how that stays true: change the
 * SVG, run `node scripts/android-icons.mjs`, and the twenty-odd raster
 * variants Android wants are regenerated from the one source of truth.
 *
 * `sharp` is already present in the tree as a Next.js image dependency, so
 * this adds no new package.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const RES = 'android/app/src/main/res';
const VIOLET = '#7c5cfb', CYAN = '#2ad5ef', SURFACE = '#0b0f19';

// The full mark, exactly as public/icon.svg draws it.
const fullIcon = readFileSync('public/icon.svg');

// Adaptive-icon foreground: the glyph alone on transparency. Android crops an
// adaptive foreground to a 66% safe zone, so the glyph is drawn into the middle
// 66% of the canvas or the launcher would clip its outer nodes.
const glyph = (size) => {
  const inner = Math.round(size * 0.66);
  const off = Math.round((size - inner) / 2);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${VIOLET}"/><stop offset="100%" stop-color="${CYAN}"/>
  </linearGradient></defs>
  <g transform="translate(${off},${off}) scale(${inner / 32})">
    <path d="M8.5 9.5 L16 16 L8.5 22.5 M16 16 L23.5 16" stroke="url(#g)" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="8.5" cy="9.5" r="2.1" fill="${VIOLET}"/>
    <circle cx="8.5" cy="22.5" r="2.1" fill="${VIOLET}"/>
    <circle cx="23.5" cy="16" r="2.4" fill="${CYAN}"/>
  </g></svg>`);
};

const circleMask = (size) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`);

const LEGACY = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
const FOREGROUND = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 };

const written = [];
for (const [dpi, size] of Object.entries(LEGACY)) {
  const dir = `${RES}/mipmap-${dpi}`;
  const square = await sharp(fullIcon, { density: 512 }).resize(size, size).png().toBuffer();
  writeFileSync(`${dir}/ic_launcher.png`, square);
  written.push(`${dir}/ic_launcher.png (${size}px)`);

  const round = await sharp(square)
    .composite([{ input: circleMask(size), blend: 'dest-in' }])
    .png()
    .toBuffer();
  writeFileSync(`${dir}/ic_launcher_round.png`, round);
  written.push(`${dir}/ic_launcher_round.png (${size}px)`);
}

for (const [dpi, size] of Object.entries(FOREGROUND)) {
  const out = `${RES}/mipmap-${dpi}/ic_launcher_foreground.png`;
  writeFileSync(out, await sharp(glyph(size), { density: 512 }).png().toBuffer());
  written.push(`${out} (${size}px, transparent)`);
}

// Legacy splash images, kept in step with the brand rather than left as the
// template's stock artwork. Each keeps the dimensions it already had.
const splashes = [
  'drawable/splash.png',
  ...['land', 'port'].flatMap((o) =>
    ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'].map((d) => `drawable-${o}-${d}/splash.png`)
  ),
];
for (const rel of splashes) {
  const p = path.join(RES, rel);
  if (!existsSync(p)) continue;
  const { width, height } = await sharp(p).metadata();
  const mark = Math.round(Math.min(width, height) * 0.28);
  const markPng = await sharp(fullIcon, { density: 512 }).resize(mark, mark).png().toBuffer();
  writeFileSync(
    p,
    await sharp({ create: { width, height, channels: 4, background: SURFACE } })
      .composite([{ input: markPng, gravity: 'center' }])
      .png()
      .toBuffer()
  );
  written.push(`${p} (${width}x${height})`);
}

console.log(written.join('\n'));
console.log(`\n${written.length} images written`);

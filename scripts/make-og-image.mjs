/**
 * Regenerates /public/brand/og-image.png — the 1200x630 link-preview card.
 * Run: node scripts/make-og-image.mjs      (see docs/ai/DECISIONS_LOG.md DEC-022)
 *
 * One-off build tool, not part of `next build`. `sharp` is resolved from next's
 * transitive install rather than a declared dep; if it ever goes missing, run
 * `npm i -D sharp`.
 *
 * No text is baked into the card: WhatsApp/Facebook already render og:title and
 * og:description beside the image, and copy at thumbnail scale is unreadable.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// pathToFileURL, not a `file:///${ROOT}` template — a Windows root ("c:\...")
// is not a valid URL and the ESM loader rejects it as protocol "c:".
const { default: sharp } = await import(
  pathToFileURL(join(ROOT, "node_modules/sharp/lib/index.js")).href
);

// Brand tokens — DESIGN_SYSTEM.md
const LINHO = "#FBF6F2";
const ACCENT = "#C4302E";

const W = 1200;
const H = 630; // 1.91:1 — the aspect that unlocks the large card (DEC-022)

// Logo art is 1200x825.2. Contain it to 430px tall so the mark keeps the
// generous whitespace the design system asks for.
const LOGO_H = 430;
const LOGO_W = Math.round((LOGO_H / 825.2) * 1200);

const logo = await sharp(readFileSync(join(ROOT, "public/brand/logo-principal-vermelho.svg")), {
  density: 300,
})
  .resize({
    width: LOGO_W,
    height: LOGO_H,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

// Bottom accent band — the red as a controlled voice, not a surface.
const band = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="10"><rect width="${W}" height="10" fill="${ACCENT}"/></svg>`
);

const out = join(ROOT, "public/brand/og-image.png");
await sharp({ create: { width: W, height: H, channels: 3, background: LINHO } })
  .composite([
    { input: logo, left: Math.round((W - LOGO_W) / 2), top: Math.round((H - LOGO_H) / 2) - 8 },
    { input: band, left: 0, top: H - 10 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out);

const { width, height } = await sharp(out).metadata();
console.log(`Wrote ${out} — ${width}x${height}`);

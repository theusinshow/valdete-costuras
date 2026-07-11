# Design

> Mirrors `/docs/ai/DESIGN_SYSTEM.md` (source of truth, per DEC-014) and the live tokens in `src/app/globals.css`. Update those first; keep this file in sync.

## Theme

**Costura Artesanal** — warm, handcrafted, trustworthy. Linho (warm off-white) canvas, Carvão ink, Vermelho Valdete as the single color voice, coral/rosé as decorative support only. Generous whitespace, large typographic hero, stitch motifs (dashes, knots, seams) as the recurring brand detail. Light theme only (`color-scheme: light`).

## Colors

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#FBF6F2` | Linho — page background |
| `--color-surface` | `#FFFFFF` | Cards, raised surfaces |
| `--color-surface-muted` | `#F4ECE4` | Areia — alt section background |
| `--color-text` | `#2C2523` | Carvão — headings/body (~13:1 on bg) |
| `--color-text-muted` | `#6E625E` | Grafite — secondary text (~4.7:1 on bg) |
| `--color-border` | `#E8DDD3` | Hairlines, dividers |
| `--color-accent` | `#C4302E` | Vermelho Valdete — CTA/highlight surfaces |
| `--color-accent-hover` | `#A8282A` | CTA hover |
| `--color-accent-strong` | `#B02A28` | Accent as text/links on light bg (AA) |
| `--color-accent-foreground` | `#FFFFFF` | Text on accent (~5.2:1, keep ≥16px/bold) |
| `--color-coral` | `#E4807D` | Decorative only — never text |
| `--color-rose` | `#F6A6A2` | Decorative only — never text |

Strategy: restrained warm neutrals + one committed red. The red is the only color voice.

## Typography

- **Display/headings:** Cormorant Garamond 400–700, tracking −0.01em (`--font-display`).
- **Body/UI:** Jost 300–600 (`--font-sans`).
- **Script signature:** Alex Brush — `.wordmark` logo only, never body/titles/UI (`--font-script`).
- Loaded via `next/font/google`, subset latin, `display: swap`.
- Scale (~1.25 modular): hero H1 clamp 3.5–4.5rem/1.05/700; H2 2.25rem/1.15/600; H3 1.5rem/1.2/600; eyebrow 0.875rem uppercase 0.08em; body 1rem/1.6; body-lg 1.125rem.

## Spacing & Layout

- Base 4px scale: 4–128. Section rhythm 96 desktop / 64 mobile. Card padding 24.
- Container `max-width: 1200px` (`.container-page`), side padding 24/32. Some sections full-bleed with inner container.
- Services grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. Mobile-first; breakpoints sm 640 / md 768 / lg 1024 / xl 1280. Test at 320px.

## Shape & Elevation

- Radius: 6 / 10 / 16px (`--radius-sm/--radius/--radius-lg`).
- Shadows minimal: `--shadow-sm` (0 1px 2px @6%), `--shadow-lift` (0 8px 26px @9%). Prefer hairline borders over heavy shadow.

## Components

Navbar (sticky, wordmark + anchors + WhatsApp), Footer, Buttons (primary accent / secondary outline / WhatsApp; ≥44px; `.btn-seam` running-stitch hover), links in `--accent-strong` with underline hover, Section wrapper + SectionHeader (eyebrow + H2 + lead + `.sig-line` stitch), Service card (icon + title + text, hover lift + accent hairline), StitchTimeline (pillars as knots on a seam), Placeholder block ("em breve", intentional-looking), FloatingWhatsApp (mobile).

## Motion

Two mechanisms (DEC-017), both seam-themed, ease-out-expo family `cubic-bezier(0.22,1,0.36,1)`:

1. `[data-intro]` — CSS-keyframe hero choreography (`both` fill; safe for no-JS/crawlers/print). Signature sews in: ring seam → "V" settles → "Valdete" wipe → "Costuras" fade.
2. `.rg` / `.is-shown` — IntersectionObserver scroll-reveal groups; hidden states gated on `html.js` + motion-safe. Verbs: rg-rise, rg-fade, rg-scale, rg-knot, rg-drawx, rg-photo; cascade via `--d`.

Signature micro-motions: `.stitch-underline` nav seam, `.btn-seam` CTA edge, logo `stitch-run` ring. All have `prefers-reduced-motion: reduce` alternatives; print forces everything visible.

## Voice constraints

No heavy motion libraries, no WebGL, no gradients-as-decoration, one accent only, placeholders never visible, empty sections must look deliberate.

# Decisions Log

## DEC-001 — Initial project architecture workflow
**Status:** Approved
**Decision:** Use Coded by M — Site Architecture System as the pre-production workflow.
**Impact:** Discovery, architecture docs and AI execution plan.

## DEC-002 — Project type: single-page landing
**Status:** Approved
**Decision:** Build a single-page landing (route `/`) rather than a multi-page site.
**Impact:** Site architecture, blueprints, navigation via in-page anchors.

## DEC-003 — Primary conversion: WhatsApp
**Status:** Approved
**Decision:** Primary goal is starting a WhatsApp conversation; no forms required. Secondary: company uniform quote (also via WhatsApp).
**Impact:** Sticky + distributed CTAs, `wa.me` links, floating mobile button.

## DEC-004 — Audience priority
**Status:** Approved
**Decision:** Primary audience = alterations/repairs (local B2C); secondary = uniforms for companies (B2B). Region = neighborhood/city-local.
**Impact:** Section order, dedicated Empresas block, local trust emphasis.

## DEC-005 — Trust without social proof
**Status:** Approved
**Decision:** No testimonials/photos exist yet. Trust is built via 4 differentiator pillars (experience, speed, personal service, fair price) + location. Gallery/testimonials are graceful placeholders.
**Impact:** Design must not depend on imagery; `CONTENT_PENDING.md` tracks assets.

## DEC-006 — Brand name & logo
**Status:** Approved
**Decision:** Display name "Valdete Costuras". Logo proposal not finalized → typographic wordmark, swappable later.
**Impact:** Header component built logo-agnostic.

## DEC-007 — Visual direction: Costura Moderna (Option C)
**Status:** Approved
**Decision:** Minimal premium, high contrast. bg `#FAFAF8`, text `#141414`, accent `#D8332A` (text variant `#C1281F`), muted `#6B6B6B`. Type: Space Grotesk + IBM Plex Sans.
**Rejected:** A — Ateliê Sereno (creme/terracota/Fraunces); B — Confiança Direta (azul-ardósia/Manrope).
**Impact:** Full design system tokens.

## DEC-008 — Motion: subtle
**Status:** Approved
**Decision:** Quiet scroll reveals, microinteractions, sticky/floating WhatsApp. No heavy libs, no WebGL. Respect `prefers-reduced-motion`.
**Impact:** Motion direction doc, performance constraints.

## DEC-010 — Logo vs. visual direction conflict
**Status:** Approved
**Decision:** A logo proposal exists (`assets/logo.pmg.png`): elegant high-contrast serif, monochrome black on cream, needle-and-thread "V", no red. It conflicts with Direction C. Developer chose to KEEP Direction C (Space Grotesk + red accent). The current logo is treated as a placeholder to be redesigned to fit Direction C.
**Decision (color):** Accent `#D8332A` used surgically — CTAs and highlights only; otherwise monochrome high-contrast. No secondary color.
**Impact:** Header stays logo-agnostic (wordmark now). Add logo redesign to `CONTENT_PENDING.md`. Do not adopt the serif/cream cues from the current logo.

## DEC-011 — Palette shifted to salmon accent
**Status:** Approved
**Decision:** Accent moved from vivid red to salmon/coral. Tokens: `--accent #E9664E`, `--accent-hover #F2826D` (lightens), `--accent-strong #B0402A` (accent-as-text on light, AA), `--accent-foreground #241310` (dark text on accent surfaces — white fails on salmon at small sizes).
**Impact:** Softer, warmer brand tone. Contrast verified WCAG AA.

## DEC-012 — Fonts changed after AI-slop audit
**Status:** Approved
**Decision:** Replaced Space Grotesk + IBM Plex Sans (both on impeccable reflex-reject/ban list) with **Petrona** (display serif) + **Hanken Grotesk** (body), pair "Alfaiataria". Warm tailoring voice, off the AI-default list.
**Impact:** Supersedes the type system in DEC-007/DESIGN_SYSTEM. Update DESIGN_SYSTEM type section.

## DEC-013 — AI-slop audit fixes
**Status:** Approved
**Decision:** From `/impeccable audit`: removed repeated uppercase section kickers (kept one in hero), rebuilt Services as an editorial hairline list (no identical card grid, no icon tiles, dropped cliché scissors/needle/ruler icons), rebuilt How-it-works as connected numbered steps (no boxes), de-numbered Pillars, varied section vertical rhythm, removed em dash from copy, reworded generic headings.
**Impact:** Lower "AI-made" signal. Hero image slot added (see CNT-009).

## DEC-014 — Adopt the official brand manual (identidade visual)
**Status:** Approved (developer request, 2026-07-07)
**Decision:** A finalized professional brand manual now exists in `identidade_visual/` (brandbook HTML/PDF + logo SVG set). The site is realigned to it, superseding the earlier synthetic "Costura Moderna" direction (DEC-007/010/011) and the type pair from DEC-012.
- **Palette (brand manual):** Linho `#FBF6F2` (bg), Areia `#F0E7E0`→ token `#F4ECE4` (muted, lightened for hairline contrast), Carvão `#2C2523` (text), Grafite `#6E625E` (muted text), Vermelho Valdete `#C4302E` (accent/CTA, white foreground ~5.2:1), plus Coral `#E4807D` / Rosé `#F6A6A2` as decorative-only support (never text).
- **Type:** Cormorant Garamond (display) · Jost (body/UI) · Alex Brush (script — **logo signature only**, never body/titles).
- **Logo:** Real assets copied to `public/brand/`. Reusable `Monogram` + `Wordmark` components (currentColor) built from the manual's dotted-"V" + script "Valdete" + tracked "Costuras". Applied to Navbar, Footer, Hero seal, final CTA. Supersedes the typographic-dot wordmark of DEC-006/010.
- **Graphic elements:** Dotted-circle monogram, traço-costura (dashed hairline) as eyebrow/divider detail, rosé radial glow on hero — per manual "Elementos gráficos".
**Impact:** `globals.css` tokens, `layout.tsx` fonts + favicon/OG, `Logo.tsx`, Navbar/Footer/Hero/FinalCta/SectionHeader. Accessibility re-checked (AA). DESIGN_SYSTEM.md updated. CNT-006 (logo) resolved.

## DEC-015 — Diferenciais as a stitched timeline
**Status:** Approved (developer request, 2026-07-08)
**Decision:** The `#diferenciais` section (the 4 trust pillars of DEC-005) is re-presented as a "stitch timeline": each pillar is a knot (node) on a running seam of round stitch points. On scroll into view the seam sews in **one point at a time** (left→right desktop, top→bottom mobile); when the needle lands each knot, its pillar settles in (gentle overshoot on the knot, fade + 8px rise on the text). Content of the 4 pillars is unchanged — this is presentation/motion only.
- **Layout chosen:** "Timeline costurada (nós)" over a plain seam-over-columns or per-column contained variant.
- **Knot motion:** gentle settle (minimal overshoot `cubic-bezier(0.34,1.4,0.5,1)`, ~420ms) over a dry pop.
- **Implementation:** new `StitchTimeline.tsx` (client, IntersectionObserver, per-element inline `transition-delay` cascade) + `.stitch-*` rules in `globals.css` (grouped with the other seam motions). DOM dots via flex so the horizontal↔vertical geometry and the one-by-one sequence come for free; no SVG/WebGL, no new deps.
- **A11y/perf:** reserves its space (no CLS), animates transform/opacity only, and under `prefers-reduced-motion` all `.stitch-*` transitions/delays are dropped so the seam appears instantly on reveal.
**Impact:** `Pillars.tsx` now renders `StitchTimeline`; new component + `globals.css` motion block. Consistent with DEC-008 (subtle motion) and the existing traço-costura vocabulary (nav underline, logo ring, button seam).

## DEC-009 — Tech stack: Next.js + Tailwind
**Status:** Approved
**Decision:** Next.js (App Router) + Tailwind + TypeScript. Slight overkill for one page; chosen for SEO, image handling, future growth.
**Impact:** Execution plan, scaffolding, `next/font`, `next/image`.

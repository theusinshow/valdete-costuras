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

## DEC-016 — Impeccable audit fixes (CSS layer + a11y)
**Status:** Approved (developer request, 2026-07-09)
**Decision:** From `/impeccable audit`. Fixed a root CSS-cascade defect and several a11y/robustness gaps found across the whole page.
- **Cascade (root cause):** the `h1–h4` `color`/`letter-spacing` rules in `globals.css` were **unlayered**, so in Tailwind v4 they beat every `text-*` utility (unlayered CSS wins over layered). Wrapped both blocks in `@layer base`. This restored: the *Empresas* card title (was carvão-on-carvão, contrast 1.0 → invisible; also given an explicit `text-[color:var(--color-bg)]`), the final-CTA title (was carvão-on-vermelho 2.7:1 → now white 5.5:1), and the active/hover **accent-strong** state on service titles (was dead).
- **A11y:** closed mobile drawer marked `inert` (its links were still keyboard-focusable); `sr-only` `<h2>` added to the titleless *Diferenciais* section (labels the region, fixes the h2→h3 gap; DEC-015 visual unchanged); final-CTA subtitle `/85`→`/90` (mobile 16px reached AA).
- **Robustness:** `html.js` flag set before paint + CSS fallback so `Reveal`/`StitchTimeline` content is never hidden without JS (crawler/no-JS safety); gallery caption scrim deepened (`black/50`→`/65`) so the white label stays legible over any photo or the placeholder; hero + fachada photos migrated to `next/image`.
**Impact:** `globals.css`, `layout.tsx`, `Companies.tsx`, `Navbar.tsx`, `Pillars.tsx`, `FinalCta.tsx`, `Reveal.tsx`, `ServicesShowcase.tsx`, `Hero.tsx`, `Location.tsx`. Palette/tokens and visual direction unchanged. Verified in-browser (computed colors + AA) and via `next build`.

## DEC-017 — Motion choreography (seam language site-wide)
**Status:** Approved (developer request, 2026-07-09)
**Decision:** From `/impeccable animate` + MOTION_DIRECTION.md. Replaces the uniform fade-and-rise `Reveal` reflex (an AI tell per the impeccable register) with reveals that *fit what they reveal*, all inside the existing traço-costura vocabulary. Two mechanisms:
- **`[data-intro]` (hero, load-time):** pure CSS keyframes with `both` fill — no JS/IO gating, so copy renders even for crawlers/no-JS/reduced-motion. Cascade: H1 → subtitle → CTA → trust marks (`--d` per element). Signature moment: in the brand panel the dotted ring fades in while its seam runs twice, the "V" settles (0.92→1), "Valdete" *writes itself* via clip-path wipe, "Costuras" breathes in last (~2.2s total).
- **`RevealGroup` + `.rg-*` verbs (scroll):** one IO per group flips `.is-shown`; children opt in with `rg-rise / rg-fade / rg-scale / rg-knot / rg-drawx / rg-photo` and `--d` delays. Hidden states gated on `html.js` **and** `prefers-reduced-motion: no-preference` (`:not(.is-shown)` so no specificity fight); print forces everything visible.
- **Applied:** Services rows rise as their hairline seams draw left→right, sticky photo settles from 1.04 (crossfade also settles); HowItWorks seam draws across, knots land in sequence, steps follow; Empresas card settles then points stitch on one by one; FinalCta band settles from 0.985 while the seal's ring runs its seam; Location photo settles; SectionHeader gains a `sig-line` (short traço-costura that sews in under the title — sanctioned by MOTION_DIRECTION "decorative"); mobile drawer items stagger in (per-property delays so hover feedback stays instant); FAB enters with scale. Empty-testimonials placeholder made static (doc: no motion while empty).
**Impact:** `globals.css` (motion system block), new `RevealGroup.tsx`, `Reveal.tsx` (`data-shown` hook), Hero/Services/ServicesShowcase/HowItWorks/Companies/FinalCta/Location/Testimonials/SectionHeader/Navbar/FloatingWhatsApp. All transform/opacity/clip-path; IO disconnects after firing. Verified: build clean; reduced-motion, no-JS and post-scroll audits report 0 hidden elements; 0 mobile overflow.

## DEC-018 — Critique fixes: conversion mechanics + testimonial invitation
**Status:** Approved (developer choice via `/impeccable critique` questions, 2026-07-11)
**Decision:** From the first `/impeccable critique` run (33/40; snapshot `.impeccable/critique/2026-07-11T03-57-13Z__src-app-page-tsx.md`). Developer chose "conversion first" scope (P1 + three P2s); trust-narrative items (mapsUrl/tel:, storefront placement) deliberately deferred.
- **Reveal threshold clamp (P1):** `RevealGroup` now clamps the IO threshold by group height (`min(threshold, 0.3·viewportHeight/groupHeight)`) — tall groups (~1900px services list) could never reach 18% visibility at an anchor position, so tapping "Serviços" landed on invisible content.
- **Service rows convert (P2):** each row in `ServicesShowcase` is now a `wa.me` link with a per-service pre-filled message (`waServiceMessage()` — "…orçamento para: {título}"). A "Pedir orçamento" affordance (real text, AT-announced) rides the active row: scroll-spy on mobile, hover/focus on desktop. The page's most-read content now leads to WhatsApp like everything else.
- **Navbar CTA cascade (P2):** `className="hidden md:inline-flex"` on `Button` silently lost to the component's own `inline-flex`; the desktop CTA is now wrapped in `hidden md:block`. Decision: mobile bar has **no** CTA (drawer + floating cover it).
- **Testimonial invitation (P2):** while `testimonials[]` is empty, the section shows a warm invitation panel ("Sua roupa já passou por aqui?" + secondary "Deixar meu depoimento" button with `waMessages.testimonial`) instead of skeleton bars — grey bars read as "failed to load"/"no clients yet" at the trust moment. Supersedes DEC-017's "static skeleton" note; real quotes still auto-replace it (CNT-007 unchanged).
**Impact:** `RevealGroup.tsx`, `ServicesShowcase.tsx`, `Navbar.tsx`, `Testimonials.tsx`, `lib/whatsapp.ts`, `lib/content.ts` (+`testimonialsInvite`). Verified in production build via Playwright: anchor reveal at 375/768/1440, per-service hrefs + `_blank/noopener`, affordance on keyboard focus, navbar CTA hidden ≤md (drawer stays `inert`), invitation renders, 0 overflow @320, reduced-motion instant, no console errors.

## DEC-019 — Refino de refino (2026-07-11)
**Status:** Approved (developer request, 2026-07-11)
**Decision:** Second refinement pass after DEC-018, addressing hero density, service-list feel, differentiators presentation, B2B framing, testimonials, map trust, final-CTA contrast and footer weight.
- **Hero:** enlarged the fallback monogram (`size={168}`) with the existing signature choreography; trust marks switched from round bullets to a traço-costura dash (`h-px w-4 bg-accent/70`), matching the seam vocabulary instead of generic dots; added a full-width "faixa da fachada" band below the fold (`fachada.webp` via `next/image`, `sizes="100vw"`, dark gradient scrim, caption "Ateliê em Palhoça - SC") anchoring the hero to the real storefront.
- **Serviços:** scroll-spy `IntersectionObserver` band softened for calmer row/photo sync on scroll and hover; the former ghost affordance is now a real "Pedir orçamento" chip (icon + text) riding the active row — shown on hover/focus/scroll-active, `motion-reduce` safe. Each row's own link (not a separate corner CTA) is the `wa.me` anchor via `waServiceMessage(service.title)`, so the whole row converts with a per-service pre-filled message.
- **Diferenciais:** replaced the DEC-015 stitch-timeline (nós de costura) with a plain 2×2 card grid (hairline `border`/`bg-border` seams, numbered 01–04, `rg-rise` cascade) — visually distinct from the "Como funciona" seam so the two sections stop reusing the same motif. **Supersede DEC-015.** `StitchTimeline.tsx` is no longer imported anywhere but is kept in the tree for reuse; its `.stitch-*` rules remain in `globals.css`.
- **Como funciona:** unchanged — now the only section using the stitched-seam/knot presentation.
- **Empresas:** added a `companies.eyebrow` marker ("Trabalho para empresas") as a small accent tab above the dark card, plus reworded `short` copy to lead with "Para empresas:" for clearer B2B framing.
- **Depoimentos:** `testimonials[]` populated with 4 real, developer-approved quotes (Carma, Rosilda, Nicélia, João). The DEC-018 invitation panel only renders while the array is empty, so it no longer appears in production. **Atualiza DEC-005 e CNT-007** — trust no longer rests solely on the 4 pillars/location; real quotes now exist.
- **Localização:** new `src/lib/maps.ts` helper (`MAPS_LAT`/`MAPS_LNG`, `mapsEmbedUrl()`, `mapsPlaceUrl()`) built from the real Google Maps place the developer supplied; `site.location.mapsUrl` filled with the real "abrir no Google Maps" directions URL (previously empty). The section gained a client-side "Ver no mapa" toggle — the `<iframe>` embed mounts only after a click (`useState` + `aria-expanded`/`aria-controls`), so the map never loads unrequested; "Abrir no Google Maps" opens the real place. The storefront photo caption also links to the real place.
- **CTA final:** rebuilt as a solid carvão (`bg-text`) band with light (`--color-bg`) text at AA contrast; vermelho now appears only on the WhatsApp button (`variant="inverse"`) — removes the vermelho-background contrast risk flagged in DEC-016.
- **Footer:** added a lazy `mapsEmbedUrl()` mini-map iframe in the Contato column, and a large (`size={280}`), 4%-opacity centered `Monogram` watermark behind the grid as a quiet brand mark.
**Impact:** `src/lib/maps.ts` (new), `src/lib/content.ts` (`site.location.mapsUrl`, `companies.eyebrow`, `testimonials`), `src/components/sections/Hero.tsx`, `src/components/ServicesShowcase.tsx`, `src/components/sections/Pillars.tsx`, `src/components/sections/Companies.tsx`, `src/components/sections/Location.tsx`, `src/components/sections/FinalCta.tsx`, `src/components/Footer.tsx`. `StitchTimeline.tsx` orphaned (kept for reuse, still styled by `globals.css`). Verified in production build via Playwright at 375/768/1440; see report `.superpowers/sdd/task-10-report.md`.

## DEC-020 — Post-DEC-019 corrections (hero faixa removed, Diferenciais → editorial ficha)
**Status:** Approved (developer request, 2026-07-11)
**Decision:** Two follow-up changes after DEC-019 shipped.
- **Hero faixa da fachada removed** (developer: "não ficou como pensei"). The full-width storefront band under the hero grid was dropped; the enlarged monogram signature panel and the traço-costura trust marks stay. The storefront photo remains in the Localização section. **Supersede the DEC-019 hero-band item.**
- **Diferenciais rebuilt as an editorial "ficha" list** after `$impeccable audit` (score 16/20; anti-patterns 1/4). The DEC-019 2×2 card grid tripped two absolute-ban tells at once: *identical card grid* and *numbered scaffolding (01–04) on a non-sequence* (the pillars are parallel attributes, not an ordered flow — that's the "Como funciona" role). Replaced with a definition-list ledger: display-serif term on the left, description on the right, entries separated by dashed vermelho *traço-costura* seams (the red thread literally running through the differentiators). No cards, no numbers; `rg-rise` cascade and `SectionHeader` retained. **Supersede the DEC-019 Diferenciais 2×2 item; DEC-015 stays superseded.**
**Impact:** `src/components/sections/Hero.tsx`, `src/components/sections/Pillars.tsx`. Verified via `next build` + Playwright screenshots of `#diferenciais` at 1440/390 (no overflow, AA contrast, distinct from "Como funciona").

## DEC-021 — `$impeccable critique` fixes (site inteiro, 33/40)
**Status:** Approved (developer request, 2026-07-11)
**Decision:** From a whole-site `$impeccable critique` (33/40 Good; two independent assessments + deterministic detector). Developer chose: reveal-gating first, keep "orçamento na hora" (no published prices → FAQ parked, needs owner facts), full scope incl. polish.
- **Reveal-gating P1 (conversion + address):** the FinalCta headline/subtitle/CTA and the Location address/hours no longer start at `opacity:0` gated on an IntersectionObserver — the two elements that close a local sale now render visible by default; only the decorative FinalCta seal ring still animates on reveal. Fixes the "blank at the decisive beat on slow/backgrounded loads" risk.
- **Local-info ergonomics P2:** address/hours bumped `text-sm`→`text-base` and kept always-visible for the Maps-arriving 55+ visitor; map stays behind the "Ver no mapa" toggle (LCP).
- **Polish:** Testimonials grid `md:grid-cols-3`→`sm:grid-cols-2` (4 quotes now balance 2×2 instead of a 3+1 orphan); `WhatsAppButton` gains an `aria-label` making the "opens WhatsApp" destination explicit to AT.
- **Deliberately kept:** the knot-settle overshoot `cubic-bezier(0.34,1.4,0.5,1)` (detector `bounce-easing`, `globals.css:307,430`) — it's the documented DEC-015 "gentle settle", sutil and intentional, not a dry pop. Flagged, not changed.
- **Hero P1 (dead space):** developer left the call to us ("faço o que achar melhor"). Chose NOT to reuse `fachada.webp` in the hero (it already anchors Localização and crops poorly to the 4:5 portrait panel). The right column keeps the brand signature — dotted-V monogram, "Valdete Costuras" wordmark, a traço-costura divider, and the real slogan `site.slogan` ("Sua roupa no ponto certo.") in Cormorant italic — sewing itself in on load. **A re-critique (below) initially framed it as a bordered seal, but that box read "broken/empty" during the ~2s sew-in first-paint; per developer choice the frame was removed (free-standing marks).** A real Valdete/atelier photo (`heroImage`) remains an optional future upgrade (CNT-009).
- **Parked (owner decision):** price/turnaround + FAQ — developer keeps "orçamento na hora" (cost depends on garment/fabric/style; no static numbers).
**Impact:** `src/components/sections/Hero.tsx`, `src/components/sections/FinalCta.tsx`, `src/components/sections/Location.tsx`, `src/components/sections/Testimonials.tsx`, `src/components/WhatsAppButton.tsx`. Snapshot `.impeccable/critique/2026-07-11T18-46-52Z__src-app-page-tsx.md`. Verified via `next build` + Playwright (FinalCta/Location visible with reveals suppressed; Testimonials 2×2; hero seal at 1440).

## DEC-009 — Tech stack: Next.js + Tailwind
**Status:** Approved
**Decision:** Next.js (App Router) + Tailwind + TypeScript. Slight overkill for one page; chosen for SEO, image handling, future growth.
**Impact:** Execution plan, scaffolding, `next/font`, `next/image`.

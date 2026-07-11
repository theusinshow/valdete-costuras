---
target: landing page (src/app/page.tsx)
total_score: 33
p0_count: 0
p1_count: 1
timestamp: 2026-07-11T03-57-13Z
slug: src-app-page-tsx
---
# Critique — Valdete Costuras landing page (`src/app/page.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Anchor-jump to `#servicos` lands on invisible (not-yet-revealed) content |
| 2 | Match System / Real World | 4 | Solid — plain pt-BR, audience-perfect copy, sewing metaphors |
| 3 | User Control and Freedom | 3 | Service rows highlight like links but aren't clickable |
| 4 | Consistency and Standards | 3 | Three different H2 sizing systems; `hidden md:inline-flex` silently fails on Button |
| 5 | Error Prevention | 3 | Good guards; `whatsappUrl()` `"#"` fallback would ship a silently dead CTA |
| 6 | Recognition Rather Than Recall | 4 | Solid — single page, nav labels match sections, contact repeated |
| 7 | Flexibility and Efficiency | 3 | WhatsApp is the only channel — no tel:, no visible number, empty `mapsUrl` |
| 8 | Aesthetic and Minimalist Design | 4 | Solid — genuine restraint; brand mark appears 4× down the page |
| 9 | Error Recovery | 3 | Images degrade gracefully; no path for users without WhatsApp |
| 10 | Help and Documentation | 3 | "Como funciona" is the help; no FAQ (price ranges, prazo) |
| **Total** | | **33/40** | **Good — solid foundation, address weak areas** |

## Anti-Patterns Verdict

**Not AI slop — the page reads art-directed.** No eyebrow-kicker scaffolding (SectionHeader is title + traço-costura + lead; Pillars even goes titleless with an sr-only heading). No identical card grids — every section has its own composition (editorial numbered services list + sticky crossfade panel, knots on a running stitch, numbered knots on a drawn hairline, one dark B2B card). Motion is literally the brand: every animation is a sewing gesture, with no-JS/reduced-motion/print safety nets verified in a real browser. Cormorant Garamond and the warm Linho background are on current reflex-watch lists, but both come from the client's official brand manual (DEC-014) — identity preservation wins, and the execution (600–700 weights, disciplined single red) is good.

**Deterministic scan (detect.mjs on `src/`, exit 2):** 2 findings — both the same mild overshoot curve `cubic-bezier(0.34,1.4,0.5,1)` on the stitch-knot settle (`globals.css:307`, `globals.css:430`). Judged intentional: ~single-digit % single overshoot, documented in DEC-017 as "the needle lands the knot." Accepted, not slop.

**In-browser detector (detect.js via live-server, headless):** 3 findings — `transition: height` on the navbar container and `transition: max-height` on `#mobile-menu` (real layout-property animations the design review missed; cheap fix via `grid-template-rows` or transform/clip), and `cream-palette` on the body background `#FBF6F2` (false positive in context: Linho is the brand manual's canvas, not an AI default).

**Residual generic tells (minor):** the three trust-bullet trio under the hero CTA, the skeleton-bar "Em breve" testimonial placeholders (the most template-y element on the page), and the corner rosé radial glow (derived from the manual's cover treatment).

## Overall Impression

This is one of the rare landing pages where the motion system *is* the brand argument — stitches, knots, and seams everywhere, engineered with unusual care (no-JS, reduced-motion, and print all verified safe; zero placeholder leakage; no overflow at 320px). The conversion architecture is clean: 10 WhatsApp CTAs, context-specific prefilled messages, everything ≥44px. The single biggest opportunity: the page's most-read content — the six service rows — looks interactive and leads nowhere, while the page's most persuasive trust asset (the storefront photo) sits at ~80% depth behind an empty testimonials section.

## What's Working

1. **Motion as brand voice, engineered responsibly.** The signature "sews itself in" (ring seam → V settles → "Valdete" writes in), nav underlines stitch left→right, CTAs carry a running seam. CSS-keyframe hero with `both` fill means copy is never gated on hydration; `html.js`-gated reveals mean no-JS never ships blank. This is motion *designed*, not added.
2. **Conversion architecture matches the one-job brief.** Context-specific prefilled messages (general vs. empresas), CTAs in every section with varied labels, floating button after 500px, zero forms. All verified in-browser: 10 anchors, all `wa.me/5548988106584`.
3. **The services showcase avoids the 6-card grid.** Numbered editorial list + sticky crossfading photo panel creates hierarchy and purposeful motion, degrading to inline photos on mobile — the most distinctive composition on the page.

## Priority Issues

**[P1] Anchor navigation lands on invisible content.** Tapping "Serviços" scrolls to `#servicos` but the whole list sits at `opacity: 0` — verified: `is-shown` still false after 1.5s at the anchor position on mobile (~250px short) and tablet 768×1024. The user's first act of navigation is rewarded with a blank section. Cause: `RevealGroup.tsx:44` uses `threshold: 0.18` on groups ~1900px tall — 18% can never be in view at the anchor. **Fix:** clamp the threshold by group height (`Math.min(0.18, 0.3 * viewportHeight / el.offsetHeight)`) or observe the first child. Same risk in `ServicesShowcase.tsx:49`. **Suggested command:** `$impeccable polish`

**[P2] Service rows advertise interactivity they don't have — the page's biggest missed conversion.** `ServicesShowcase.tsx:61,80`: rows highlight on hover and titles turn link-red, but clicking does nothing. The moment of highest intent ("found my fix") has no action. **Fix:** make each row a WhatsApp link with a per-service prefilled message ("Olá! Preciso de uma troca de zíper…") — it also tells Valdete what the client needs before she asks. **Suggested command:** `$impeccable polish`

**[P2] Empty testimonials section undermines trust at the trust moment.** `Testimonials.tsx:31-53`: three dashed skeleton cards with grey bars + "EM BREVE" at ~70% depth — reads as "content failed to load" (Dona Lúcia on a slow connection) or "no clients yet" (skeptics). **Fix:** cut the section until CNT-007 lands, or replace skeletons with one warm invitation ("Já costurou com a Valdete? Conte como foi pelo WhatsApp"). **Suggested command:** `$impeccable harden`

**[P2] `hidden md:inline-flex` silently fails → unintended triple CTA on mobile.** `Navbar.tsx:127-131` vs `Button.tsx:68`: the Button's own `inline-flex` wins the cascade — verified computed `display: flex` at 375px. Mobile shows navbar CTA + drawer CTA + floating CTA simultaneously; it happens to fit, but it contradicts intent and the pattern will bite again. **Fix:** conditional render or a `hidden md:block` wrapper, then decide deliberately whether mobile keeps a navbar CTA. **Suggested command:** `$impeccable polish`

**[P3] Single-channel contact; the Maps-arrival persona can't tap the address.** `mapsUrl` is empty so "Ver no mapa" (`Location.tsx:57-68`) never renders; no tel: or visible phone number anywhere for users who don't use WhatsApp. **Fix:** populate `mapsUrl` (zero-cost trust) and consider a small visible phone number. **Suggested command:** `$impeccable harden`

## Persona Red Flags

**Jordan (first-timer):** understands the offer in 2 seconds — good. Taps "Serviços" → blank space (P1). Wonders whether "Pedir orçamento" / "Falar no WhatsApp" / "Orçamento para empresas" are different processes (they're the same tap). Nothing says early that the budget conversation happens by message.

**Riley (stress tester):** 320px, no-JS, reduced-motion, keyboard/focus, drawer inert + Escape — all pass (verified). Catches: the `hidden` class conflict (P2), hover-state-without-action on service rows (P2), hydration-mismatch warning on every load, and `.costuras::before/after` `content: "– – –"` that some screen readers announce as stray dashes (use the `content: "…" / ""` alt-text syntax).

**Casey (distracted mobile):** floating WhatsApp button after 500px is the best element for them. But services span ~4 screens of photos before any trust content — dropping mid-services means pillars/how-it-works never got seen; reveal cascades (up to ~720ms in Companies) pop in late under fast flick-scrolling.

**Dona Lúcia (55, mid-range Android, found it via Maps):** the storefront photo with the "Costuras & Consertos" sign is *the* moment she trusts the page — and it's at ~80% depth. No visible phone number; grey skeleton cards read as a loading failure; the address isn't tappable (empty `mapsUrl`). In her favor: plain language, comfortably large type, 52px hero CTA.

## Minor Observations

- Navbar/mobile-menu animate `height`/`max-height` (detector catch) — swap for `grid-template-rows: 0fr/1fr` or transform-based reveal.
- Hydration mismatch on every load: the `classList.add('js')` inline script (`layout.tsx:67-71`) mutates `<html>` before hydration — add `suppressHydrationWarning` to `<html>`.
- Root `CLAUDE.md` is stale: still documents Costura Moderna (`#FAFAF8`/`#141414`/`#D8332A`, Space Grotesk + IBM Plex Sans), superseded by DEC-014's brand-manual tokens — confuses tooling and reviewers (Assessment B flagged the "mismatch" as fact).
- Heading scale drift: three H2 sizing systems across sections — consolidate into SectionHeader variants.
- `metadataBase` unset (Next warning) and OG image untested; no `LocalBusiness` JSON-LD though address/hours now exist.
- `FloatingWhatsApp` also renders on desktop, duplicating the navbar CTA — harmless but decide intentionally.
- Desktop hero shows the brand mark twice above the fold (navbar + fallback panel) — fine as a documented placeholder, but the real photo (CNT-009) should be content priority #1.
- `site.slogan` ("Sua roupa no ponto certo.") exists but is rendered nowhere.

## Questions to Consider

1. Why is the only photograph proving "this is a real neighborhood atelier" — the storefront — the second-to-last thing a visitor sees? If trust-through-clarity is the strategy, the fachada (or Valdete herself) arguably *is* the hero image.
2. Should the testimonials section exist before the first testimonial does? An empty reserved seat can say "nobody has come" louder than absence would.
3. If every road leads to WhatsApp, why doesn't the road that starts at "Troca de zíper"?

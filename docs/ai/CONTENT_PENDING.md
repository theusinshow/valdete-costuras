# Content Pending

## Status
Relevant content is missing and materially affects implementation and production launch.

## Items

### CNT-001 — WhatsApp number
**Type:** Contact / conversion
**Status:** Not received
**Impact:** Blocks the primary conversion. All CTAs are non-functional until set.
**Used in:** Header, hero, how-it-works, empresas, location, final CTA, footer, floating button.
**Current placeholder:** `[WHATSAPP]` (in `wa.me/[WHATSAPP]`)
**Requirements:** International format digits only, e.g. `55DDNNNNNNNNN`.

### CNT-002 — Address / neighborhood
**Type:** Location / local trust
**Status:** Received — address, neighborhood/city and `mapsUrl` filled with real values in `src/lib/content.ts`.
**Impact:** Resolved for copy and map link. `LocalBusiness` structured-data markup (if desired) is still not implemented — track separately if needed.
**Used in:** Hero subline, location section, footer.
**Resolution (2026-07-11, DEC-019):** `site.location.address`, `site.location.neighborhoodCity` and `site.location.mapsUrl` (real Google Maps directions link to the place) are set. `src/lib/maps.ts` derives `mapsEmbedUrl()`/`mapsPlaceUrl()` from the real coordinates; the Hero "faixa da fachada" and the Location/Footer map embeds use `fachada.webp` and the real place embed — no more `[ENDERECO]`/`[BAIRRO/CIDADE]` placeholders in this content.

### CNT-003 — Opening hours
**Type:** Location info
**Status:** Not received
**Impact:** Visitors can't know availability.
**Used in:** Location section, footer.
**Current placeholder:** `[HORARIO]`
**Requirements:** Days + hours (e.g. Seg–Sex 9h–18h, Sáb 9h–13h).

### CNT-004 — Years of experience
**Type:** Trust signal
**Status:** Not received
**Impact:** Weakens the "experience" pillar and hero credibility line.
**Used in:** Hero, diferenciais.
**Current placeholder:** `[ANOS]`
**Requirements:** A real number (e.g. "há mais de 15 anos"). Do not invent.

### CNT-005 — Service list (alterations)
**Type:** Copy
**Status:** Draft assumptions — confirm
**Impact:** Services grid content.
**Used in:** #servicos
**Current placeholder:** Assumed items (bainha, zíper, ajuste de cintura, conserto, botões, reforma). Confirm/adjust real services offered.

### CNT-006 — Photos (before/after) & final logo
**Type:** Imagery / brand
**Status:** Not received
**Impact:** Gallery section stays as placeholder; header uses wordmark until logo arrives.
**Used in:** #galeria, header.
**Current placeholder:** "Em breve" gallery block; typographic wordmark.
**Requirements:** Optimized images, permission to use, clear before/after pairs; logo as SVG.
**Note (logo):** Existing `assets/logo.pmg.png` is an elegant serif/cream mark that does NOT match the chosen Direction C (Space Grotesk + red). Per DEC-010, logo will be redesigned to fit Direction C. Until then, header uses the typographic wordmark.

### CNT-007 — Testimonials
**Type:** Social proof
**Status:** Resolved (2026-07-11, DEC-019)
**Impact:** `#depoimentos` now renders 4 real, developer-approved client quotes (Carma, Rosilda, Nicélia, João) instead of the invitation placeholder.
**Used in:** #depoimentos
**Resolution:** `testimonials[]` in `src/lib/content.ts` populated with quote + author for each. The `testimonialsInvite` panel (DEC-018) still exists as a graceful fallback and will reappear automatically if the array is ever emptied.

### CNT-009 — Hero image
**Type:** Imagery
**Status:** Not received
**Impact:** Hero shows a stitched-monogram fallback panel instead of a real photo.
**Used in:** Hero (right panel, desktop).
**Current placeholder:** Decorative "V" monogram panel.
**Requirements:** A real photo of Valdete / her hands / the atelier (beats stock for a local business). Drop it at `public/hero-atelie.jpg` and set `site.heroImage = "/hero-atelie.jpg"` in `src/lib/content.ts`. Portrait-ish (4:5) works best.

### CNT-008 — Slogan / brand phrase
**Type:** Copy
**Status:** Not received
**Impact:** Optional hero support line.
**Used in:** Hero, footer.
**Current placeholder:** `[SLOGAN]` (optional).

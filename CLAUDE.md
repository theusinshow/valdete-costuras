# Claude Project Instructions — Valdete Costuras

Single-page landing (Next.js + Tailwind + TS) to convert local visitors into WhatsApp contacts. Primary audience: alterations/repairs; secondary: company uniforms.

Before making changes, read in order:

1. `/docs/ai/MASTER_CONTEXT.md`
2. `/docs/ai/PROJECT.md`
3. `/docs/ai/SITE_ARCHITECTURE.md`
4. `/docs/ai/PAGE_BLUEPRINTS.md`
5. `/docs/ai/DESIGN_SYSTEM.md`
6. `/docs/ai/MOTION_DIRECTION.md`
7. `/docs/ai/EXECUTION_PLAN.md`
8. `/docs/ai/QA_CHECKLIST.md`
9. `/docs/ai/DECISIONS_LOG.md`
10. `/docs/ai/CONTENT_PENDING.md`

Rules:
- Do not implement before reading the architecture docs.
- Work phase-by-phase from `EXECUTION_PLAN.md`.
- Do not change visual direction without checking `DESIGN_SYSTEM.md` (Costura Moderna: `#FAFAF8`/`#141414`/`#D8332A`, Space Grotesk + IBM Plex Sans).
- Do not invent client facts. Use the documented placeholders (`[WHATSAPP]`, `[ENDERECO]`, `[HORARIO]`, `[ANOS]`, `[BAIRRO/CIDADE]`, `[SLOGAN]`). Never ship them visible.
- Gallery/testimonials must degrade gracefully while empty.
- Respect `prefers-reduced-motion`; keep motion subtle; no WebGL; protect Core Web Vitals.
- Preserve documented decisions unless the developer approves a change (log it in `DECISIONS_LOG.md`).
- Report changed files and pending issues after each phase.

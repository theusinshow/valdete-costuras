import { hero, site } from "@/lib/content";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";

const trust = [
  "Muitos ajustes no mesmo dia",
  "Orçamento sem compromisso",
  "Feito à mão, com cuidado",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      {/* subtle diagonal stitch texture, decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-text) 0 1px, transparent 1px 22px)",
        }}
      />
      <div className="container-page relative grid min-h-[86vh] items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-accent-strong">
              <span className="h-px w-6 bg-accent" />
              {hero.eyebrow} · {site.location.neighborhoodCity}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 max-w-2xl text-balance text-[clamp(2.5rem,6.5vw,4.25rem)] font-bold leading-[1.04] tracking-tight">
              {hero.title}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton label={hero.ctaLabel} size="lg" />
              <span className="text-sm text-text-muted">{hero.reassurance}</span>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {trust.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-text-muted"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Atelier visual — real photo when available, stitched "V" monogram fallback. */}
        <Reveal delay={200} className="hidden lg:block">
          {site.heroImage ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.heroImage}
                alt="Valdete no ateliê, ajustando uma peça na máquina de costura"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-bg/70 px-6 py-4 backdrop-blur-sm">
                <span className="font-display text-sm font-semibold tracking-tight">
                  Valdete<span className="text-accent">.</span> Costuras
                </span>
                <span className="text-xs text-text-muted">
                  {site.yearsExperience} anos de ofício
                </span>
              </div>
            </div>
          ) : (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--color-text) 0 1px, transparent 1px 16px)",
              }}
            />
            <svg
              viewBox="0 0 200 250"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              {/* thread */}
              <path
                d="M60 60 C 90 90, 110 90, 140 60"
                stroke="var(--color-text)"
                strokeWidth="1"
                strokeDasharray="4 5"
                opacity="0.35"
              />
              {/* V monogram */}
              <path
                d="M64 66 L100 176 L136 66"
                stroke="var(--color-text)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* needle eye accent */}
              <circle cx="100" cy="196" r="4" fill="var(--color-accent)" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-bg/60 px-6 py-4 backdrop-blur-sm">
              <span className="font-display text-sm font-semibold tracking-tight">
                Valdete<span className="text-accent">.</span> Costuras
              </span>
              <span className="text-xs text-text-muted">
                {site.yearsExperience} anos de ofício
              </span>
            </div>
          </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

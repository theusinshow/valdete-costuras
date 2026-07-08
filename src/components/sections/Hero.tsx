import { hero, site } from "@/lib/content";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Monogram, Wordmark } from "@/components/Logo";

const trust = [
  "Muitos ajustes no mesmo dia",
  "Orçamento sem compromisso",
  "Feito à mão, com cuidado",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      {/* warm rosé glow, radiating from the corner (manual cover treatment) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 88% -10%, color-mix(in srgb, var(--color-rose) 32%, transparent), transparent 55%)",
        }}
      />
      {/* subtle diagonal stitch texture, decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-accent) 0 1px, transparent 1px 22px)",
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
                <span className="text-accent">
                  <Wordmark scriptSize={22} layout="inline" withMonogram={false} />
                </span>
                <span className="text-xs text-text-muted">
                  {site.yearsExperience} anos de ofício
                </span>
              </div>
            </div>
          ) : (
          <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
            {/* rosé glow + stitch texture */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(110% 70% at 50% 0%, color-mix(in srgb, var(--color-rose) 26%, transparent), transparent 60%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--color-accent) 0 1px, transparent 1px 16px)",
              }}
            />
            {/* Brand seal — dotted "V" monogram + script signature */}
            <div className="relative flex flex-col items-center text-accent">
              <Monogram size={128} />
              <div className="mt-7">
                <Wordmark withMonogram={false} scriptSize={46} className="items-center" />
              </div>
              <span className="mt-6 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-text-muted">
                Feito à mão
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-bg/60 px-6 py-4 backdrop-blur-sm">
              <span className="text-accent">
                <Wordmark scriptSize={22} layout="inline" withMonogram={false} />
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

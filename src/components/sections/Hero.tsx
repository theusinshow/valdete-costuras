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
      <div className="container-page relative grid min-h-[86vh] items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <h1 className="max-w-2xl text-balance text-[clamp(2.5rem,6.5vw,4.25rem)] font-bold leading-[1.04] tracking-tight">
              {hero.title}
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton label={hero.ctaLabel} size="lg" />
              <span className="text-sm text-text-muted">{hero.reassurance}</span>
            </div>
          </Reveal>

          <Reveal delay={240}>
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

        {/* Atelier visual — real photo when available, brand logo fallback. */}
        <Reveal delay={200} className="hidden lg:block">
          {site.heroImage ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.heroImage}
                alt="Valdete no ateliê, ajustando uma peça na máquina de costura"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            // Just the brand logo, centered — no box, no supporting text.
            <div className="flex aspect-[4/5] flex-col items-center justify-center text-accent">
              <Monogram size={132} />
              <div className="mt-8">
                <Wordmark
                  withMonogram={false}
                  scriptSize={50}
                  className="items-center"
                />
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

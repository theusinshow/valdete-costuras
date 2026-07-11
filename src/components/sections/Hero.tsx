import type { CSSProperties } from "react";
import Image from "next/image";
import { hero, site } from "@/lib/content";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Monogram, Wordmark } from "@/components/Logo";

const trust = [
  "Muitos ajustes no mesmo dia",
  "Orçamento sem compromisso",
  "Feito à mão, com cuidado",
];

/** Per-element intro delay (DEC-017 hero choreography). */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      {/* warm rosé glow, radiating from the corner (manual cover treatment) */}
      <div
        aria-hidden
        data-intro="fade"
        style={{
          ...d(150),
          background:
            "radial-gradient(120% 80% at 88% -10%, color-mix(in srgb, var(--color-rose) 32%, transparent), transparent 55%)",
        }}
        className="pointer-events-none absolute inset-0"
      />
      <div className="container-page relative grid min-h-[86vh] items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        {/*
          Load choreography — typographic cascade, one breath per element:
          H1 → subtitle → CTA → trust marks. CSS keyframes (no JS/IO), so the
          copy is never gated on hydration and reduced-motion shows it still.
        */}
        <div>
          <h1
            data-intro
            style={d(0)}
            className="max-w-2xl text-balance text-[clamp(2.5rem,6.5vw,4.25rem)] font-bold leading-[1.04] tracking-tight"
          >
            {hero.title}
          </h1>

          <p
            data-intro
            style={d(130)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted"
          >
            {hero.subtitle}
          </p>

          <div
            data-intro
            style={d(260)}
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <WhatsAppButton label={hero.ctaLabel} size="lg" />
            <span className="text-sm text-text-muted">{hero.reassurance}</span>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {trust.map((item, i) => (
              <li
                key={item}
                data-intro
                style={d(400 + i * 90)}
                className="flex items-start gap-2 text-sm text-text-muted"
              >
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent/70" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Atelier visual — real photo when available, brand logo fallback. */}
        <div className="hidden lg:block">
          {site.heroImage ? (
            <div
              data-intro
              style={d(300)}
              className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-border"
            >
              <Image
                src={site.heroImage}
                alt="Valdete no ateliê, ajustando uma peça na máquina de costura"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover"
              />
            </div>
          ) : (
            /*
              The signature sews itself in (see .hero-sig in globals.css):
              the dotted ring fades in while its seam runs, the "V" settles,
              "Valdete" writes in left→right, "Costuras" breathes in last.
            */
            <div className="hero-sig flex aspect-[4/5] flex-col items-center justify-center text-accent">
              <Monogram size={168} />
              <div className="mt-8">
                <Wordmark
                  withMonogram={false}
                  scriptSize={60}
                  className="items-center"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Faixa da fachada — ancora com a loja real, largura total, fora do LCP */}
      <div className="relative h-40 w-full overflow-hidden border-t border-border md:h-48">
        <Image
          src="/fachada.webp"
          alt="Fachada do ateliê Valdete Costuras em Palhoça - SC"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
        />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-medium text-white/95">
          Ateliê em Palhoça - SC
        </span>
      </div>
    </section>
  );
}

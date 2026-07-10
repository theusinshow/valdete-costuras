import type { CSSProperties } from "react";
import { howItWorks, hero } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/** Per-element reveal delay (DEC-017). */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function HowItWorks() {
  return (
    <Section id="como-funciona" muted space="tight">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="max-w-md text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tight">
            Da peça na mão ao ajuste pronto
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <WhatsAppButton label={hero.ctaLabel} />
        </Reveal>
      </div>

      {/*
        Connected steps — one hairline, numbers on it, no boxes.
        Reveal (DEC-017): the seam draws itself across first; each numbered
        knot lands as the needle passes it, and its step settles in after.
      */}
      <RevealGroup className="relative mt-14">
        <span
          aria-hidden
          className="rg-drawx absolute inset-x-0 top-0 h-px bg-border"
          style={d(0)}
        />
        <ol className="grid gap-y-10 md:grid-cols-3 md:gap-x-10">
          {howItWorks.map((item, i) => (
            <li key={item.step} className="relative pt-6 md:pr-8">
              <span
                className="rg-knot absolute -top-4 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground"
                style={d(150 + i * 240)}
              >
                {item.step}
              </span>
              <div className="rg-rise" style={d(230 + i * 240)}>
                <h3 className="mt-3 text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
                  {item.short}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </RevealGroup>
    </Section>
  );
}

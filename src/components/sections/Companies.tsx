import type { CSSProperties } from "react";
import { companies } from "@/lib/content";
import { Section } from "@/components/Section";
import { RevealGroup } from "@/components/RevealGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { waMessages } from "@/lib/whatsapp";

/** Per-element reveal delay (DEC-017). */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Companies() {
  return (
    <Section id="empresas">
      {/*
        Reveal (DEC-017): the dark card settles in (0.985 → 1), then each
        point is stitched on — red knot pops, its line rises — ending on the CTA.
      */}
      <RevealGroup>
        <div className="relative z-10 mx-auto -mb-4 w-fit rounded-t-[var(--radius)] bg-accent px-5 py-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
            {companies.eyebrow}
          </span>
        </div>
        <div
          className="rg-scale relative rounded-[var(--radius-lg)] border border-border bg-text px-6 py-12 text-[color:var(--color-bg)] md:px-12 md:py-16"
          style={d(0)}
        >
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2
                className="rg-rise text-3xl font-semibold leading-tight tracking-tight text-[color:var(--color-bg)] md:text-4xl"
                style={d(120)}
              >
                {companies.title}
              </h2>
              <p
                className="rg-rise mt-4 max-w-md text-base leading-relaxed text-[color:var(--color-bg)]/70"
                style={d(210)}
              >
                {companies.short}
              </p>
            </div>

            <div>
              <ul className="space-y-3">
                {companies.points.map((point, i) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="rg-knot mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      style={d(300 + i * 130)}
                    />
                    <span
                      className="rg-rise text-[color:var(--color-bg)]/85"
                      style={d(300 + i * 130)}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="rg-rise mt-8" style={d(720)}>
                <WhatsAppButton
                  label={companies.ctaLabel}
                  message={waMessages.companies}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </RevealGroup>
    </Section>
  );
}

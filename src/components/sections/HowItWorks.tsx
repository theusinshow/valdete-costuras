import { howItWorks, hero } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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

      {/* Connected steps — one hairline, numbers on it, no boxes */}
      <ol className="mt-14 grid gap-y-10 border-t border-border md:grid-cols-3 md:gap-x-10">
        {howItWorks.map((item, i) => (
          <Reveal
            as="li"
            key={item.step}
            delay={i * 90}
            className="relative pt-6 md:pr-8"
          >
            <span className="absolute -top-4 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground">
              {item.step}
            </span>
            <h3 className="mt-3 text-lg font-medium tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
              {item.short}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

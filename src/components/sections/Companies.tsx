import { companies } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { waMessages } from "@/lib/whatsapp";

export function Companies() {
  return (
    <Section id="empresas">
      <div className="rounded-[var(--radius-lg)] border border-border bg-text px-6 py-12 text-[color:var(--color-bg)] md:px-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {companies.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[color:var(--color-bg)]/70">
              {companies.short}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="space-y-3">
              {companies.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-[color:var(--color-bg)]/85">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <WhatsAppButton
                label={companies.ctaLabel}
                message={waMessages.companies}
                size="lg"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

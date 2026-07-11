import { testimonials, testimonialsInvite } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { waMessages } from "@/lib/whatsapp";

export function Testimonials() {
  // While empty (CNT-007), the section earns its place by inviting the first
  // depoimentos instead of reserving visual space with skeletons — grey bars
  // read as "failed to load" and "no clients yet" right at the trust moment.
  return (
    <Section id="depoimentos">
      <SectionHeader
        title="Quem já costurou com a Valdete"
        lead={
          testimonials.length > 0
            ? "Clientes que já deixaram a roupa no ponto certo com a Valdete."
            : "Os primeiros depoimentos aparecem aqui em breve."
        }
      />

      {testimonials.length > 0 ? (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.author} delay={i * 70}>
              <figure className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7">
                <blockquote className="text-base leading-relaxed text-text">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2 text-sm font-semibold text-text">
                  <span aria-hidden className="h-px w-4 shrink-0 bg-accent/60" />
                  {t.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        /* Warm invitation — turns the empty state into engagement while
           staying honest (no fake proof). Secondary button on purpose: this
           ask must not compete with the conversion CTAs around it. */
        <Reveal className="mt-12">
          <div className="flex flex-col items-start gap-6 rounded-[var(--radius-lg)] border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-10">
            <div className="max-w-md">
              <p className="font-display text-2xl font-semibold tracking-tight">
                {testimonialsInvite.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                {testimonialsInvite.short}
              </p>
            </div>
            <WhatsAppButton
              label={testimonialsInvite.ctaLabel}
              message={waMessages.testimonial}
              variant="secondary"
              className="shrink-0"
            />
          </div>
        </Reveal>
      )}
    </Section>
  );
}

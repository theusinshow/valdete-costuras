import { testimonials } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  // Hidden entirely while empty would also be valid; we keep a light, honest
  // "em breve" so the page reads as complete. CNT-007.
  return (
    <Section id="depoimentos">
      <SectionHeader
        title="Quem já costurou com a Valdete"
        lead="Espaço reservado para os primeiros depoimentos."
      />

      {testimonials.length > 0 ? (
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.author} delay={i * 70}>
              <figure className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7">
                <blockquote className="text-base leading-relaxed text-text">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-text-muted">
                  {t.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal className="mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[var(--radius-lg)] border border-dashed border-border bg-surface-muted/40 p-7"
              >
                <div className="h-2 w-16 rounded-full bg-border" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full rounded-full bg-border" />
                  <div className="h-2 w-11/12 rounded-full bg-border" />
                  <div className="h-2 w-3/4 rounded-full bg-border" />
                </div>
                <span className="mt-5 block text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
                  Em breve
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  );
}

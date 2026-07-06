import Image from "next/image";
import { gallery } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export function Gallery() {
  return (
    <Section id="galeria" muted>
      <SectionHeader
        title="Antes e depois"
        lead="Peças ajustadas e reformadas no ateliê."
      />

      {gallery.length > 0 ? (
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <Reveal as="li" key={item.src} delay={i * 60}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius)] border border-border">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      ) : (
        // Graceful empty state — intentional, not broken. CNT-006.
        <Reveal className="mt-12">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[3/4] items-center justify-center rounded-[var(--radius)] border border-dashed border-border bg-surface/50"
              >
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
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

import { finalCta } from "@/lib/content";
import { RevealGroup } from "@/components/RevealGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Monogram } from "@/components/Logo";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-text text-[color:var(--color-bg)]">
      {/* faint monogram watermark — perfectly still */}
      <Monogram
        size={340}
        className="pointer-events-none absolute -right-16 -top-16 text-white/10"
      />
      <div className="container-page relative py-20 text-center md:py-28">
        {/*
          Reveal (DEC-017): gentle emphasis per MOTION_DIRECTION — the whole
          band settles from 0.985 while the seal's ring runs its seam once.
        */}
        <RevealGroup>
          <div className="rg-scale">
            <Monogram size={56} className="cta-seal mx-auto mb-6 text-white/90" />
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-[color:var(--color-bg)] md:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-[color:var(--color-bg)]/85 md:text-lg">
              {finalCta.short}
            </p>
            <div className="mt-9 flex justify-center">
              <WhatsAppButton
                label={finalCta.ctaLabel}
                size="lg"
                variant="inverse"
              />
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}

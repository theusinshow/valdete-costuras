import { finalCta } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Monogram } from "@/components/Logo";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-accent text-accent-foreground">
      {/* faint monogram watermark */}
      <Monogram
        size={340}
        className="pointer-events-none absolute -right-16 -top-16 text-white/10"
      />
      <div className="container-page relative py-20 text-center md:py-28">
        <Reveal>
          <Monogram size={56} className="mx-auto mb-6 text-white/90" />
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-accent-foreground md:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-accent-foreground/85 md:text-lg">
            {finalCta.short}
          </p>
          <div className="mt-9 flex justify-center">
            <WhatsAppButton
              label={finalCta.ctaLabel}
              size="lg"
              variant="secondary"
              className="border-accent-foreground/40 !text-accent-foreground hover:border-accent-foreground hover:bg-accent-foreground/10"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

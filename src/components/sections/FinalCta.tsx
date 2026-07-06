import { finalCta } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function FinalCta() {
  return (
    <section className="bg-accent text-accent-foreground">
      <div className="container-page py-20 text-center md:py-28">
        <Reveal>
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

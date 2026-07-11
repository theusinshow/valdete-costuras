"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ServiceImage } from "./ServiceImage";
import { RevealGroup } from "./RevealGroup";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl, waServiceMessage } from "@/lib/whatsapp";

type Service = {
  title: string;
  short: string;
  image: string;
  alt: string;
};

/** Per-element reveal delay (DEC-017). */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Synced services gallery. The list on the left drives a large sticky image
 * on the right: the active service is set by scroll position (a scroll-spy
 * that fires on whichever row crosses the viewport's center band) and by
 * hover/focus. On narrow screens the sticky panel is dropped and each photo
 * renders inline under its service. Crossfade + reduced-motion aware.
 *
 * Reveal (DEC-017): each row's hairline seam draws in left→right while the
 * row rises, top to bottom; the sticky photo settles from 1.04 like a print
 * being laid on the table. Incoming crossfade images settle the same way.
 */
export function ServicesShowcase({ services }: { services: readonly Service[] }) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      // only the row crossing the middle ~10% band counts as active
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <RevealGroup className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-start lg:gap-16">
      {/* List — drives the panel */}
      <ul>
        {services.map((service, i) => {
          const isActive = i === active;
          return (
            <li
              key={service.title}
              data-index={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              onMouseEnter={() => setActive(i)}
              className="group relative py-5"
            >
              {/* hairline seam — draws in with its row */}
              <span
                aria-hidden
                className="rg-drawx absolute inset-x-0 top-0 h-px bg-border"
                style={d(i * 70)}
              />
              {/* Whole row converts — per-service pre-filled WhatsApp message */}
              <a
                href={whatsappUrl(waServiceMessage(service.title))}
                target="_blank"
                rel="noopener noreferrer"
                onFocus={() => setActive(i)}
                className="rg-rise flex items-start gap-5 rounded-[var(--radius-sm)]"
                style={d(i * 70 + 60)}
              >
                <span
                  className={`font-display text-sm tabular-nums transition-colors duration-200 ${
                    isActive ? "text-accent" : "text-text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className={`text-xl font-medium tracking-tight transition-colors duration-200 group-hover:text-accent-strong ${
                        isActive ? "text-accent-strong" : "text-text"
                      }`}
                    >
                      {service.title}
                    </h3>
                    {/* Affordance — rides the active row (scroll-spy on
                        mobile, hover/focus on desktop). Real text, so the
                        link's purpose is always announced to AT. */}
                    <span
                      className={`flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-strong transition-[opacity,transform] duration-200 motion-reduce:transition-none motion-reduce:translate-x-0 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 ${
                        isActive ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0"
                      }`}
                    >
                      <WhatsAppIcon width={15} height={15} />
                      Pedir orçamento
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    {service.short}
                  </p>
                  {/* Inline photo — mobile / tablet only */}
                  <ServiceImage
                    src={service.image}
                    alt={service.alt}
                    className="mt-4 aspect-[16/10] w-full rounded-[var(--radius)] border border-border lg:hidden"
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Sticky image panel — desktop only. Photos are stacked and crossfaded. */}
      <div className="hidden lg:block">
        <div
          className="rg-photo sticky top-24 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-muted"
          style={d(200)}
        >
          <div className="relative aspect-[4/5]">
            {services.map((service, i) => (
              <ServiceImage
                key={service.title}
                src={service.image}
                alt={service.alt}
                className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
                }`}
              />
            ))}
            {/* Caption scrim — active service + index */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 via-black/20 to-transparent px-5 pb-4 pt-12">
              <span className="text-sm font-medium text-white">
                {services[active].title}
              </span>
              <span className="font-display text-xs tabular-nums text-white/75">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(services.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </RevealGroup>
  );
}

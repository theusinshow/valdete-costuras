"use client";

import { useEffect, useRef, useState } from "react";
import { ServiceImage } from "./ServiceImage";

type Service = {
  title: string;
  short: string;
  image: string;
  alt: string;
};

/**
 * Synced services gallery. The list on the left drives a large sticky image
 * on the right: the active service is set by scroll position (a scroll-spy
 * that fires on whichever row crosses the viewport's center band) and by
 * hover/focus. On narrow screens the sticky panel is dropped and each photo
 * renders inline under its service. Crossfade + reduced-motion aware.
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
    <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-start lg:gap-16">
      {/* List — drives the panel */}
      <ul className="divide-y divide-border border-t border-border">
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
              className="group py-5"
            >
              <div className="flex items-start gap-5">
                <span
                  className={`font-display text-sm tabular-nums transition-colors duration-200 ${
                    isActive ? "text-accent" : "text-text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`text-xl font-medium tracking-tight transition-colors duration-200 group-hover:text-accent-strong ${
                      isActive ? "text-accent-strong" : "text-text"
                    }`}
                  >
                    {service.title}
                  </h3>
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
              </div>
            </li>
          );
        })}
      </ul>

      {/* Sticky image panel — desktop only. Photos are stacked and crossfaded. */}
      <div className="hidden lg:block">
        <div className="sticky top-24 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-muted">
          <div className="relative aspect-[4/5]">
            {services.map((service, i) => (
              <ServiceImage
                key={service.title}
                src={service.image}
                alt={service.alt}
                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Caption scrim — active service + index */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/50 via-black/10 to-transparent px-5 pb-4 pt-12">
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
    </div>
  );
}

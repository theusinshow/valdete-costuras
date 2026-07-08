"use client";

import { useEffect, useRef, useState } from "react";

type Item = { title: string; short: string };

type Props = {
  items: readonly Item[];
  /** Round stitch points drawn on the seam between/after each node. */
  dotsPerRail?: number;
  /** Cadence between each point/knot appearing, in ms. */
  step?: number;
};

/**
 * Stitch timeline — the "diferenciais" seam. Each pillar is a knot (node) on a
 * running stitch; the seam sews in one point at a time (left→right on desktop,
 * top→bottom on mobile) as the section scrolls into view. When the needle lands
 * a knot, its pillar settles in. Fully static under prefers-reduced-motion.
 * See MOTION_DIRECTION.md + the .stitch-* rules in globals.css.
 */
export function StitchTimeline({ items, dotsPerRail = 7, step = 22 }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Reduced motion: reveal immediately, no observer (matches Reveal.tsx).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Global cadence: every knot and point gets a monotonically increasing delay
  // so the seam reads as one continuous run across all four columns.
  const perItem = 1 + dotsPerRail;

  return (
    <ol
      ref={ref}
      className={`stitch-timeline grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-8 ${
        shown ? "is-shown" : ""
      }`}
    >
      {items.map((item, i) => {
        const nodeDelay = i * perItem * step;
        return (
          <li key={item.title} className="flex flex-row md:flex-col">
            {/* Rail — horizontal on desktop, vertical gutter on mobile */}
            <div className="flex w-4 shrink-0 flex-col items-center gap-0 md:w-full md:flex-row md:justify-between">
              <span
                className="stitch-node"
                style={{ transitionDelay: `${nodeDelay}ms` }}
                aria-hidden
              />
              {Array.from({ length: dotsPerRail }).map((_, j) => (
                <span
                  key={j}
                  className="stitch-dot my-1.5 md:my-0"
                  style={{ transitionDelay: `${(i * perItem + 1 + j) * step}ms` }}
                  aria-hidden
                />
              ))}
            </div>

            {/* Pillar body — settles in as its knot lands */}
            <div
              className="stitch-body flex-1 pl-4 md:pl-0 md:pt-5"
              style={{ transitionDelay: `${nodeDelay + 30}ms` }}
            >
              <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {item.short}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

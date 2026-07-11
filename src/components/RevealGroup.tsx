"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
  /** IntersectionObserver threshold. */
  threshold?: number;
};

/**
 * Scroll-reveal group (DEC-017). Flips `.is-shown` on the wrapper once it
 * enters view; descendants opt into motion with the `.rg-*` verb classes in
 * globals.css (rise / fade / scale / knot / drawx / photo), cascading via a
 * per-element `--d` delay. Hidden states are gated on `html.js` + motion-safe,
 * so no-JS, crawlers and reduced-motion users always see the content.
 */
export function RevealGroup({
  children,
  className = "",
  as = "div",
  threshold = 0.18,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    // Tall groups (e.g. the ~1900px services list) can never have 18% of
    // their height inside the viewport, so anchor jumps would land on hidden
    // content. Clamp so ~30% of a viewport's worth of the group is enough.
    const ratio =
      el.offsetHeight > 0
        ? Math.min(threshold, (0.3 * window.innerHeight) / el.offsetHeight)
        : threshold;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: ratio, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`rg ${shown ? "is-shown" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

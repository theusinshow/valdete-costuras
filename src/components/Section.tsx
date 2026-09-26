import type { ReactNode } from "react";

type Space = "tight" | "normal" | "loose";

const spacing: Record<Space, string> = {
  tight: "py-12 md:py-16",
  normal: "py-16 md:py-24",
  loose: "py-24 md:py-36",
};

type Props = {
  id?: string;
  children: ReactNode;
  /** Alternate background for rhythm. */
  muted?: boolean;
  /** Vertical rhythm — vary across sections so spacing isn't monotone. */
  space?: Space;
  className?: string;
  /** Coded Tracker section token (data-cm-section). */
  cmSection?: string;
};

export function Section({
  id,
  children,
  muted = false,
  space = "normal",
  className = "",
  cmSection,
}: Props) {
  return (
    <section
      id={id}
      data-cm-section={cmSection}
      className={`scroll-mt-20 ${spacing[space]} ${muted ? "bg-surface-muted" : ""} ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

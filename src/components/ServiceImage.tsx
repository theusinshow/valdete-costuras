"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Service thumbnail with graceful degradation: if the file isn't in
 * /public yet (or fails to load), it falls back to a discreet stitched
 * placeholder instead of a broken image. Drop the real photos under
 * /public/servicos/ and they light up automatically. See CNT-010.
 */
export function ServiceImage({ src, alt, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden
        className={`flex items-center justify-center rounded-[var(--radius)] border border-dashed border-border bg-surface-muted/40 ${className}`}
      >
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-text-muted">
          Em breve
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

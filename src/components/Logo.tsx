import type { CSSProperties } from "react";

/**
 * Brand marks — Valdete Costuras (identidade_visual manual).
 * Both use `currentColor`, so tint by setting text color on the wrapper
 * (e.g. text-accent for vermelho, text-white on dark/red surfaces).
 */

// The monogram "V" glyph, extracted from the official logo SVG.
const V_GLYPH =
  "M332 -71Q327 -71 327 -61Q327 -28 383 107Q400 146 417.0 185.0Q434 224 450 263L496 398Q507 432 513.5 456.5Q520 481 520 497Q520 567 480.0 602.5Q440 638 374 638Q312 638 251.5 610.5Q191 583 141.5 536.0Q92 489 62 431Q19 349 19 281Q19 234 42.0 196.0Q65 158 102 144Q128 135 153 135Q188 135 218.0 150.5Q248 166 266.5 194.0Q285 222 285 257Q285 261 285.0 265.5Q285 270 284 274Q280 286 290 286Q301 286 302 270Q303 266 303.5 262.0Q304 258 304 253Q304 217 280.0 186.0Q256 155 218.5 135.5Q181 116 141 116Q100 116 62 136Q-19 180 -19 289Q-19 367 23 440Q61 506 122.0 555.0Q183 604 256.0 631.5Q329 659 401 659Q451 659 491.0 643.5Q531 628 554.5 596.5Q578 565 578 516Q578 423 494 237Q398 26 398 0Q398 -7 403 -5Q429 12 638 263Q745 391 819.5 470.5Q894 550 937 581Q975 610 1003.0 628.5Q1031 647 1048 657Q1110 691 1162 691Q1185 691 1197.5 686.5Q1210 682 1210 662Q1210 649 1201 649Q1198 649 1187.0 653.5Q1176 658 1165 658Q1112 658 1054 627Q938 565 788 405Q745 359 687.5 291.0Q630 223 558 132Q444 -12 421 -25Q378 -50 356.5 -60.5Q335 -71 332 -71Z";

type MonogramProps = {
  className?: string;
  /** rendered width/height in px (square) */
  size?: number;
  title?: string;
};

/** Dotted-circle "V" monogram — the brand symbol. Tints with currentColor. */
export function Monogram({ className = "", size = 40, title }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <circle
        className="monogram-ring"
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeDasharray="9 8"
        strokeLinecap="round"
      />
      {/* group wrapper so the "settle" scale doesn't clobber the glyph's
          own positioning transform */}
      <g className="monogram-v">
        <path
          d={V_GLYPH}
          transform="translate(100,100) scale(0.08462,-0.08462) translate(-595.5,-310)"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  /** show the dotted monogram before the script wordmark */
  withMonogram?: boolean;
  /** font-size of the "Valdete" script, in px */
  scriptSize?: number;
  /** font-size of the "Costuras" caption, in em relative to script */
  layout?: "stacked" | "inline";
};

/**
 * Full signature: dotted "V" + script "Valdete" + tracked "Costuras".
 * Uses currentColor + the brand script/sans faces. Set text color to tint.
 */
export function Wordmark({
  className = "",
  withMonogram = true,
  scriptSize = 34,
  layout = "stacked",
}: WordmarkProps) {
  const costurasSize = Math.max(9, Math.round(scriptSize * 0.2));
  const wordmarkStyle: CSSProperties = { fontSize: scriptSize };
  const costurasStyle: CSSProperties = { fontSize: costurasSize };

  return (
    <span className={`inline-flex items-center gap-3 leading-none ${className}`}>
      {withMonogram && (
        <Monogram size={Math.round(scriptSize * 1.15)} className="shrink-0" />
      )}
      <span
        className={
          layout === "stacked"
            ? "flex flex-col items-start"
            : "flex items-baseline gap-2"
        }
      >
        <span className="wordmark" style={wordmarkStyle}>
          Valdete
        </span>
        <span className="costuras" style={costurasStyle}>
          Costuras
        </span>
      </span>
    </span>
  );
}

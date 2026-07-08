import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { SpinnerIcon } from "./icons";

type Variant = "primary" | "inverse" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  // Standard CTA — the "etiqueta costurada": vermelho sólido com a bainha de
  // pontos que corre no hover (.btn-seam). This is the site-wide button style.
  primary:
    "btn-seam bg-accent text-accent-foreground hover:bg-accent-hover shadow-[var(--shadow-sm)]",
  // Same stitched treatment for use ON red/dark bands — linho fill, red seam.
  inverse:
    "btn-seam [--seam-color:var(--color-accent)] bg-bg text-accent hover:bg-surface shadow-[var(--shadow-sm)]",
  // Quiet outline, for secondary actions on light surfaces.
  secondary:
    "border border-text/15 text-text bg-transparent hover:border-text/40 hover:bg-text/[0.03]",
  ghost: "text-text hover:text-accent-strong",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  /** Shows the stitched-ring spinner and blocks interaction. */
  loading?: boolean;
  disabled?: boolean;
  /** Optional trailing icon that slides on hover (e.g. an arrow). */
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };
type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };
type Props = AnchorProps | NativeButtonProps;

/**
 * Polymorphic button: renders an <a> when `href` is set, otherwise a <button>.
 * `primary` is the site-wide stitched style; `inverse` is its dark-band twin.
 */
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  iconRight,
  className = "",
  children,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  const classes = `group/btn relative inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold tracking-tight transition-[background-color,border-color,color,transform] duration-150 hover:-translate-y-px focus-visible:outline-2 motion-reduce:hover:translate-y-0 ${
    variants[variant]
  } ${sizes[size]} ${
    isDisabled ? "pointer-events-none opacity-55 grayscale-[0.15]" : ""
  } ${className}`;

  const content = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {loading && <SpinnerIcon className="animate-spin motion-reduce:animate-none" />}
      {children}
      {iconRight && (
        <span className="transition-transform duration-150 group-hover/btn:translate-x-0.5 motion-reduce:transition-none">
          {iconRight}
        </span>
      )}
    </span>
  );

  if ("href" in rest && rest.href !== undefined) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        className={classes}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {content}
    </button>
  );
}

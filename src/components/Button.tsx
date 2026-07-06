import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-[var(--shadow-sm)]",
  secondary:
    "border border-text/15 text-text bg-transparent hover:border-text/40 hover:bg-text/[0.03]",
  ghost: "text-text hover:text-accent-strong",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/** Anchor-based button (all CTAs are links: WhatsApp or in-page anchors). */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold tracking-tight transition-[background-color,border-color,color,transform] duration-150 hover:-translate-y-px focus-visible:outline-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

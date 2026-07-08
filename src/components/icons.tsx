import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WhatsAppIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .103 5.36.1 11.945c0 2.105.55 4.16 1.595 5.976L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945 0-3.19-1.24-6.19-3.49-8.408m-8.475 18.39h-.005a9.9 9.9 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.27c.002-5.474 4.458-9.93 9.936-9.93a9.87 9.87 0 0 1 7.022 2.911 9.87 9.87 0 0 1 2.909 7.027c-.003 5.475-4.458 9.931-9.931 9.931" />
    </svg>
  );
}

export function ScissorsIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.12 8.12 20 20M8.12 15.88 20 4" />
    </svg>
  );
}

export function RulerIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M3 9.5 14.5 21 21 14.5 9.5 3 3 9.5Z" />
      <path d="M8 6.5 9.5 8M11 9.5 12.5 11M14 12.5 15.5 14M17 15.5 18.5 17" />
    </svg>
  );
}

export function NeedleIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M3 21 18 6" />
      <path d="m14 4 6 6-2 2-6-6 2-2Z" />
      <path d="M5.5 15.5c-1.5 1.5-1.5 3.5 0 4.5" />
    </svg>
  );
}

export function StitchIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M3 12c3-3 3 3 6 0s3 3 6 0 3 3 6 0" />
      <path d="M4.5 12v3M9 12v3M13.5 12v3M18 12v3" />
    </svg>
  );
}

export function ButtonIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="9.5" cy="9.5" r="1" />
      <circle cx="14.5" cy="9.5" r="1" />
      <circle cx="9.5" cy="14.5" r="1" />
      <circle cx="14.5" cy="14.5" r="1" />
    </svg>
  );
}

export function HangerIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M12 8a2 2 0 1 1 2-2" />
      <path d="M12 8v2l8.5 6c1 .7.5 2-.7 2H4.2c-1.2 0-1.7-1.3-.7-2L12 10" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SpinnerIcon({ className, ...props }: IconProps) {
  // Dashed ring — spin it (animate-spin) for an on-brand "running stitch" loader.
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeDasharray="3.5 3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  // Stitch-style menu: dashed rows echo the traço-costura motif.
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M3 7h18" strokeDasharray="3 3" />
      <path d="M3 12h18" strokeDasharray="3 3" />
      <path d="M3 17h18" strokeDasharray="3 3" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

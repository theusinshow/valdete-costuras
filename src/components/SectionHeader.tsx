import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  id,
}: Props) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignClass}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">
          <span
            aria-hidden
            className="h-px w-6 border-t border-dashed border-accent"
          />
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

import { Reveal } from "./Reveal";

type Props = {
  title: string;
  lead?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({
  title,
  lead,
  align = "left",
  id,
}: Props) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignClass}`}>
      <h2
        id={id}
        className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
      >
        {title}
      </h2>
      {/* traço-costura signature — sews in under the title (DEC-017) */}
      <span aria-hidden className="sig-line stitch-line mt-4 block w-14" />
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

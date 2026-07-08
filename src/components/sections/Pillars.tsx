import { pillars } from "@/lib/content";
import { Section } from "@/components/Section";
import { StitchTimeline } from "@/components/StitchTimeline";

export function Pillars() {
  return (
    <Section id="diferenciais" space="normal">
      <StitchTimeline items={pillars} />
    </Section>
  );
}

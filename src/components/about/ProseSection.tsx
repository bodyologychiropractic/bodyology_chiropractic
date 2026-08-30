import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProseContent, SectionTone } from "@/types";

export interface ProseSectionProps {
  content: ProseContent;
  tone?: SectionTone;
  children?: ReactNode;
}

export default function ProseSection({ content, tone = "default", children }: ProseSectionProps) {
  return (
    <Section id={content.id} tone={tone}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        align="left"
        data-aos="fade-up"
      />

      <div
        className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg"
        data-aos="fade-up"
        data-aos-delay="80"
      >
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {children}
    </Section>
  );
}

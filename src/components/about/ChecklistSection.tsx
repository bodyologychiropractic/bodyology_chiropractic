import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ChecklistContent, SectionTone } from "@/types";

export interface ChecklistSectionProps {
  content: ChecklistContent;
  tone?: SectionTone;
  note?: string;
}

export default function ChecklistSection({
  content,
  tone = "default",
  note,
}: ChecklistSectionProps) {
  return (
    <Section id={content.id} tone={tone}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        align="left"
        data-aos="fade-up"
      />

      <ul
        className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        data-aos="fade-up"
        data-aos-delay="80"
      >
        {content.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base text-foreground">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            {item}
          </li>
        ))}
      </ul>

      {note ? (
        <p
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted"
          data-aos="fade-up"
        >
          {note}
        </p>
      ) : null}
    </Section>
  );
}

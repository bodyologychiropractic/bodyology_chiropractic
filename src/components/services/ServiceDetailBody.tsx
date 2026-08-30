import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import type { Service } from "@/types";

export interface ServiceDetailBodyProps {
  service: Service;
}

export default function ServiceDetailBody({ service }: ServiceDetailBodyProps) {
  const { sections, paragraphs, itemsLabel, items } = service.detail ?? {};
  if (!sections?.length && !paragraphs?.length && !items?.length) return null;

  return (
    <Section spacing="sm" tone="surface">
      <div className="max-w-2xl">
        {sections?.length ? (
          <dl className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.label}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="border-l-2 border-accent pl-5 sm:pl-6"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {section.label}
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                  {section.body}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {paragraphs?.length ? (
          <div
            className={`space-y-4 text-base leading-relaxed text-muted sm:text-lg ${
              sections?.length ? "mt-8" : ""
            }`}
            data-aos="fade-up"
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        {items?.length ? (
          <div className="mt-8" data-aos="fade-up" data-aos-delay="80">
            {itemsLabel ? (
              <p className="text-sm font-medium text-foreground">{itemsLabel}</p>
            ) : null}
            <ul className="mt-3 space-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/services-content";

export interface OtherServicesProps {
  currentSlug: string;
}

export default function OtherServices({ currentSlug }: OtherServicesProps) {
  const others = SERVICES.filter((service) => service.slug !== currentSlug);
  if (!others.length) return null;

  return (
    <Section spacing="sm" tone="surface">
      <SectionHeading title="Other Services" align="left" data-aos="fade-up" />

      <ul className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="80">
        {others.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

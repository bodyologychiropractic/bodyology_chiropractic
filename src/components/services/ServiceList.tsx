import ServiceCard from "@/components/services/ServiceCard";
import Section from "@/components/ui/Section";
import { SERVICES } from "@/lib/services-content";

export default function ServiceList() {
  return (
    <Section spacing="sm" tone="surface">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {SERVICES.map((service, index) => (
          <li key={service.slug} data-aos="fade-up" data-aos-delay={(index % 3) * 80}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

import ServiceCard from "@/components/services/ServiceCard";
import Section from "@/components/ui/Section";
import { getServices } from "@/lib/services-content";

export default async function ServiceList() {
  const services = await getServices();

  return (
    <Section spacing="sm" tone="surface">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {services.map((service, index) => (
          <li key={service.slug} data-aos="fade-up" data-aos-delay={(index % 3) * 80}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

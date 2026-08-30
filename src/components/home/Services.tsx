import Link from "next/link";
import ServiceCard from "@/components/services/ServiceCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/services-content";

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="How We Can Help"
        description="Hands-on treatment tailored to how you move, work and recover."
        data-aos="fade-up"
      />

      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {SERVICES.map((service, index) => (
          <li
            key={service.slug}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 80}
            className="h-full"
          >
            <ServiceCard service={service} variant="compact" />
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center" data-aos="fade-up">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View all services
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </Section>
  );
}

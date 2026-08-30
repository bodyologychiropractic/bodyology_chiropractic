import Link from "next/link";
import ServiceMedia from "@/components/services/ServiceMedia";
import Section from "@/components/ui/Section";
import type { Service } from "@/types";

export interface ServiceDetailHeroProps {
  service: Service;
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  return (
    <Section spacing="sm">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="text-center sm:text-left" data-aos="fade-up">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <span aria-hidden="true">&larr;</span>
            All services
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {service.description}
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="80">
          <ServiceMedia
            service={service}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="rounded-2xl"
          />
        </div>
      </div>
    </Section>
  );
}

import Link from "next/link";
import ServiceMedia from "@/components/services/ServiceMedia";
import type { Service } from "@/types";

export interface ServiceCardProps {
  service: Service;
  /** `compact` is the tighter card used on the home page grid. */
  variant?: "default" | "compact";
}

export default function ServiceCard({
  service,
  variant = "default",
}: ServiceCardProps) {
  const compact = variant === "compact";
  // Home cards sit under the section h2; the services page cards are the h2s.
  const Heading = compact ? "h3" : "h2";

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <ServiceMedia
        service={service}
        aspect="aspect-[4/5]"
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        className="rounded-none"
      />

      <div className={compact ? "flex flex-1 flex-col p-5" : "flex flex-1 flex-col p-6 sm:p-8"}>
        <Heading className="text-lg font-semibold text-balance text-primary transition-colors group-hover:text-accent sm:text-xl">
          {service.title}
        </Heading>
        <p className={`mt-3 flex-1 leading-relaxed text-muted ${compact ? "text-sm" : "text-base"}`}>
          {service.description}
        </p>

        <span
          aria-hidden="true"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          Learn more
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingSection from "@/components/booking/BookingSection";
import {
  OtherServices,
  ServiceDetailBody,
  ServiceDetailHero,
} from "@/components/services";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";
import { findService, findServiceDoc, getServices } from "@/lib/services-content";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [service, doc] = await Promise.all([findService(slug), findServiceDoc(slug)]);
  if (!service) return buildMetadata("Services", "", "/services");

  return buildMetadata(
    service.title,
    service.description,
    `/services/${service.slug}`,
    doc?.seo,
  );
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await findService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <ServiceDetailHero service={service} />
      <ServiceDetailBody service={service} />
      <OtherServices currentSlug={service.slug} />
      <BookingSection />
    </>
  );
}

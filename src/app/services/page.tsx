import type { Metadata } from "next";
import BookingSection from "@/components/booking/BookingSection";
import { ServiceList, ServicesHero } from "@/components/services";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Chiropractic adjustments, dry needling, soft tissue therapy, Fascial Manipulation and rehabilitation at Bodyology Chiropractic.";

export function generateMetadata(): Metadata {
  return buildMetadata("Services", DESCRIPTION, "/services");
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <ServicesHero />
      <ServiceList />
      <BookingSection />
    </>
  );
}

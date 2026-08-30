import type { Metadata } from "next";
import BookingSection from "@/components/booking/BookingSection";
import { FeeList, FeesHero } from "@/components/fees";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, feesSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Consultation fees at Bodyology Chiropractic: initial, standard, extended, comprehensive and Fascial Manipulation® appointments.";

export function generateMetadata(): Metadata {
  return buildMetadata("Fees", DESCRIPTION, "/fees");
}

export default function FeesPage() {
  return (
    <>
      <JsonLd
        data={[
          feesSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Fees", path: "/fees" },
          ]),
        ]}
      />
      <FeesHero />
      <FeeList />
      <BookingSection />
    </>
  );
}

import type { Metadata } from "next";
import BookingSection from "@/components/booking/BookingSection";
import { FeeList, FeesHero } from "@/components/fees";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, feesSchema } from "@/lib/structured-data";
import { getFeesHero } from "@/lib/page-hero-content";

const DESCRIPTION =
  "Consultation fees at Bodyology Chiropractic: initial, standard, extended, comprehensive and Fascial Manipulation® appointments.";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getFeesHero();
  return buildMetadata("Fees", DESCRIPTION, "/fees", hero.seo);
}

export default async function FeesPage() {
  const [fees, breadcrumb] = await Promise.all([
    feesSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Fees", path: "/fees" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={[fees, breadcrumb]} />
      <FeesHero />
      <FeeList />
      <BookingSection />
    </>
  );
}

import type { Metadata } from "next";
import BookingSection from "@/components/booking/BookingSection";
import {
  AboutHero,
  ChecklistSection,
  ClosingStatement,
  PractitionerProfile,
  ProseSection,
} from "@/components/about";
import {
  ABOUT_BEYOND_PAIN,
  ABOUT_CARE_APPROACH,
  ABOUT_CARE_APPROACH_NOTE,
  ABOUT_CONDITIONS,
  ABOUT_FASCIA,
  ABOUT_QUALIFICATIONS,
} from "@/lib/about-content";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "A holistic, whole-body approach to chiropractic care in Bella Vista. Meet Dr Dong Tran and how we assess beyond the site of pain.";

export function generateMetadata(): Metadata {
  return buildMetadata("About", DESCRIPTION, "/about");
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <AboutHero />
      <PractitionerProfile />
      <ProseSection content={ABOUT_BEYOND_PAIN} />
      <ProseSection content={ABOUT_FASCIA} tone="surface" />
      <ChecklistSection content={ABOUT_CARE_APPROACH} note={ABOUT_CARE_APPROACH_NOTE} />
      <ChecklistSection content={ABOUT_CONDITIONS} tone="surface" />
      <ChecklistSection content={ABOUT_QUALIFICATIONS} />
      <ClosingStatement />
      <BookingSection />
    </>
  );
}

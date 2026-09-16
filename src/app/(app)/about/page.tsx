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
  getAboutBeyondPain,
  getAboutCareApproach,
  getAboutCareApproachNote,
  getAboutConditions,
  getAboutFascia,
  getAboutQualifications,
  getAboutSeo,
} from "@/lib/about-content";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "A holistic, whole-body approach to chiropractic care in Bella Vista. Meet Dr Dong Tran and how we assess beyond the site of pain.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getAboutSeo();
  return buildMetadata("About", DESCRIPTION, "/about", seo);
}

export default async function AboutPage() {
  const [beyondPain, careApproach, careApproachNote, conditions, fascia, qualifications, person, breadcrumb] =
    await Promise.all([
      getAboutBeyondPain(),
      getAboutCareApproach(),
      getAboutCareApproachNote(),
      getAboutConditions(),
      getAboutFascia(),
      getAboutQualifications(),
      personSchema(),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ]);

  return (
    <>
      <JsonLd data={[person, breadcrumb]} />
      <AboutHero />
      <PractitionerProfile />
      <ProseSection content={beyondPain} />
      <ProseSection content={fascia} tone="surface" />
      <ChecklistSection content={careApproach} note={careApproachNote} />
      <ChecklistSection content={conditions} tone="surface" />
      <ChecklistSection content={qualifications} />
      <ClosingStatement />
      <BookingSection />
    </>
  );
}

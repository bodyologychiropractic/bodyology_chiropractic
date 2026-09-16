import type { Metadata } from "next";
import { ContactHero, ContactSplit } from "@/components/contact";
import { getContact } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getContactHero } from "@/lib/page-hero-content";
import BookingSection from "@/components/booking/BookingSection";

export async function generateMetadata(): Promise<Metadata> {
  const [contact, hero] = await Promise.all([getContact(), getContactHero()]);
  const description = `Bodyology Chiropractic in ${contact.region}: address, opening hours, phone and online booking.`;
  return buildMetadata("Contact", description, "/contact", hero.seo);
}

export default async function ContactPage() {
  const breadcrumb = await breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <ContactHero />
      <ContactSplit />
      <BookingSection />
    </>
  );
}

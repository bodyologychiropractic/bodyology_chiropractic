import type { Metadata } from "next";
import { ContactHero, ContactSplit } from "@/components/contact";
import { CONTACT } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structured-data";
import BookingSection from "@/components/booking/BookingSection";

const DESCRIPTION = `Bodyology Chiropractic in ${CONTACT.region}: address, opening hours, phone and online booking.`;

export function generateMetadata(): Metadata {
  return buildMetadata("Contact", DESCRIPTION, "/contact");
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactHero />
      <ContactSplit />
      <BookingSection />
    </>
  );
}

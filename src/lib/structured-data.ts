import {
  ADDRESS,
  CONTACT,
  GEO,
  MAP_DIRECTIONS_URL,
  OPENING_HOURS_SPEC,
  PHONE_E164,
  PRACTITIONER,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { SERVICES } from "@/lib/services-content";
import { FEES } from "@/lib/fees-content";
import type { Service } from "@/types";

export const PRACTICE_ID = `${SITE_URL}/#practice`;

function absolute(path: string): string {
  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}

export function practiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Chiropractic", "LocalBusiness"],
    "@id": PRACTICE_ID,
    name: SITE_NAME,
    slogan: "Better Flow. Better Life.",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    telephone: PHONE_E164,
    email: CONTACT.email,
    priceRange: "$$",
    currenciesAccepted: "AUD",
    medicalSpecialty: "Chiropractic",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.suburb,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.postcode,
      addressCountry: ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: MAP_DIRECTIONS_URL,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${ADDRESS.suburb}, ${ADDRESS.state}`,
    },
    openingHoursSpecification: OPENING_HOURS_SPEC.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    employee: {
      "@type": "Person",
      name: PRACTITIONER.name,
      jobTitle: PRACTITIONER.role,
    },
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        url: absolute(`/services/${service.slug}`),
      },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "en-AU",
    publisher: { "@id": PRACTICE_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absolute(`/services/${service.slug}`),
    serviceType: service.title,
    provider: { "@id": PRACTICE_ID },
    areaServed: `${ADDRESS.suburb}, ${ADDRESS.state}`,
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PRACTITIONER.name,
    jobTitle: PRACTITIONER.role,
    url: absolute("/about"),
    worksFor: { "@id": PRACTICE_ID },
    knowsAbout: SERVICES.map((service) => service.title),
  };
}

export function feesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${SITE_NAME} consultation fees`,
    url: absolute("/fees"),
    itemListElement: FEES.map((fee, index) => {
      const amount = fee.price.startsWith("$")
        ? fee.price.replace(/[^0-9.]/g, "")
        : undefined;

      return {
        "@type": "Offer",
        position: index + 1,
        name: fee.name,
        url: absolute(`/fees#${fee.id}`),
        ...(amount
          ? { price: amount, priceCurrency: "AUD" }
          : { description: fee.price }),
        itemOffered: {
          "@type": "Service",
          name: fee.name,
          provider: { "@id": PRACTICE_ID },
        },
      };
    }),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

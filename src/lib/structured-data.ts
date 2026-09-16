import {
  GEO,
  MAP_DIRECTIONS_URL,
  OPENING_HOURS_SPEC,
  SITE_URL,
  getAddress,
  getContact,
  getPhoneE164,
  getPractitioner,
  getSiteDescription,
  getSiteName,
  getSocialLinks,
} from "@/lib/constants";
import { getServices } from "@/lib/services-content";
import { getFees } from "@/lib/fees-content";
import type { Service } from "@/types";

function absolute(path: string): string {
  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}

export async function practiceId(): Promise<string> {
  return `${SITE_URL}/#practice`;
}

export async function practiceSchema() {
  const [siteName, siteDescription, address, phoneE164, contact, socialLinks, practitioner, services] =
    await Promise.all([
      getSiteName(),
      getSiteDescription(),
      getAddress(),
      getPhoneE164(),
      getContact(),
      getSocialLinks(),
      getPractitioner(),
      getServices(),
    ]);
  const practiceId = `${SITE_URL}/#practice`;

  return {
    "@context": "https://schema.org",
    "@type": ["Chiropractic", "LocalBusiness"],
    "@id": practiceId,
    name: siteName,
    slogan: "Better Flow. Better Life.",
    description: siteDescription,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: absolute("/brand/icon-512.png"),
      width: 512,
      height: 512,
    },
    image: absolute("/images/hero/hero-1600.webp"),
    telephone: phoneE164,
    email: contact.email,
    priceRange: "$$",
    currenciesAccepted: "AUD",
    medicalSpecialty: "Chiropractic",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.suburb,
      addressRegion: address.state,
      postalCode: address.postcode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: MAP_DIRECTIONS_URL,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${address.suburb}, ${address.state}`,
    },
    openingHoursSpecification: OPENING_HOURS_SPEC.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: socialLinks.map((link) => link.href),
    employee: {
      "@type": "Person",
      name: practitioner.name,
      jobTitle: practitioner.role,
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        url: absolute(`/services/${service.slug}`),
      },
    })),
  };
}

export async function websiteSchema() {
  const siteName = await getSiteName();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: siteName,
    url: `${SITE_URL}/`,
    inLanguage: "en-AU",
    publisher: { "@id": `${SITE_URL}/#practice` },
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
    provider: { "@id": `${SITE_URL}/#practice` },
  };
}

export async function personSchema() {
  const [practitioner, services] = await Promise.all([getPractitioner(), getServices()]);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: practitioner.name,
    jobTitle: practitioner.role,
    url: absolute("/about"),
    worksFor: { "@id": `${SITE_URL}/#practice` },
    knowsAbout: services.map((service) => service.title),
  };
}

export async function feesSchema() {
  const [siteName, fees] = await Promise.all([getSiteName(), getFees()]);
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${siteName} consultation fees`,
    url: absolute("/fees"),
    itemListElement: fees.map((fee, index) => {
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
          provider: { "@id": `${SITE_URL}/#practice` },
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

import { cache } from "react";
import type {
  NavLink,
  OpeningHour,
  ResponsiveImageSet,
  SocialLink,
} from "@/types";
import { getPayloadClient } from "@/lib/payload";

export const SITE_URL = "https://www.bodyologychiropractic.com.au";

/** GA4 measurement ID. Empty string disables analytics. */
export const GA_MEASUREMENT_ID = "G-6RDE6FLTSY";

/** Google Ads conversion ID. Empty string disables Google Ads conversion tracking. */
export const GOOGLE_ADS_CONVERSION_ID = "AW-18417893435";

/** Google Ads call conversion label, used with the dynamic phone number swap. */
export const GOOGLE_ADS_CALL_CONVERSION_LABEL = "dWleCP3BkOscELuAq85E";

export const LOGO = {
  src: "/brand/logo.webp",
  width: 440,
  height: 114,
};

export const HERO_LOGO: ResponsiveImageSet = {
  base: "/brand/logo-mark",
  ext: "webp",
  widths: [320, 480, 640],
};

export const HERO_IMAGE: ResponsiveImageSet = {
  base: "/images/hero/hero",
  ext: "webp",
  widths: [640, 1024, 1600, 2400],
  mobile: { base: "/images/hero/hero-mobile", widths: [640, 960, 1280] },
};

export const ABOUT_IMAGE: ResponsiveImageSet = {
  base: "/images/about/portrait",
  ext: "webp",
  widths: [480, 960],
};

export const GEO = { latitude: -33.732148, longitude: 150.9465519 };

const GEO_QUERY = `${GEO.latitude},${GEO.longitude}`;

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(GEO_QUERY)}&z=17&output=embed`;

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(GEO_QUERY)}`;

export const OPENING_HOURS_SPEC = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
];

/** Cached (per-request) fetch of the Settings global from Payload. */
export const getSettings = cache(async () => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "settings" });
});

export async function getSiteName(): Promise<string> {
  return (await getSettings()).siteName;
}

export async function getSiteTagline(): Promise<string> {
  return (await getSettings()).siteTagline ?? "";
}

export async function getSiteDescription(): Promise<string> {
  return (await getSettings()).siteDescription ?? "";
}

export async function getBookingUrl(): Promise<string> {
  return (await getSettings()).bookingUrl ?? "#";
}

export async function getNavLinks(): Promise<NavLink[]> {
  return ((await getSettings()).navLinks ?? []) as NavLink[];
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return ((await getSettings()).socialLinks ?? []) as SocialLink[];
}

export async function getPractitioner() {
  const settings = await getSettings();
  return {
    name: settings.practitioner?.name ?? "",
    role: settings.practitioner?.role ?? "",
    intro: (settings.practitioner?.intro ?? []).map((entry: { value: string }) => entry.value),
    credentials: (settings.practitioner?.credentials ?? []).map(
      (entry: { value: string }) => entry.value,
    ),
  };
}

export async function getAddress() {
  const settings = await getSettings();
  return {
    street: settings.address?.street ?? "",
    suburb: settings.address?.suburb ?? "",
    state: settings.address?.state ?? "",
    postcode: settings.address?.postcode ?? "",
    country: settings.address?.country ?? "",
  };
}

export async function getPhoneE164(): Promise<string> {
  return (await getSettings()).phoneE164 ?? "";
}

export async function getContact() {
  const settings = await getSettings();
  const address = await getAddress();
  return {
    phone: settings.contact?.phone ?? "",
    email: settings.contact?.email ?? "",
    website: settings.contact?.website ?? "",
    addressLines: [
      address.street,
      `${address.suburb} ${address.state} ${address.postcode}`,
    ],
    parking: settings.contact?.parking ?? "",
    region: settings.contact?.region ?? "",
  };
}

export async function getOpeningHours(): Promise<OpeningHour[]> {
  return ((await getSettings()).openingHours ?? []) as OpeningHour[];
}

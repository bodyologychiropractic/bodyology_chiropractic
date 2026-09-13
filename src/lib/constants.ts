import type {
  NavLink,
  OpeningHour,
  ResponsiveImageSet,
  SocialLink,
} from "@/types";
import settings from "../../content/settings/settings.json";

export const SITE_NAME: string = settings.siteName;

export const SITE_TAGLINE: string = settings.siteTagline;

export const SITE_DESCRIPTION: string = settings.siteDescription;

export const SITE_URL = "https://www.bodyologychiropractic.com.au";

export const BOOKING_URL: string = settings.bookingUrl;

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

export const NAV_LINKS: NavLink[] = settings.navLinks;

export const SOCIAL_LINKS: SocialLink[] = settings.socialLinks as SocialLink[];

export const PRACTITIONER = settings.practitioner;

export const ADDRESS = settings.address;

export const PHONE_E164: string = settings.phoneE164;

export const CONTACT = {
  phone: settings.contact.phone,
  email: settings.contact.email,
  website: settings.contact.website,
  addressLines: [
    ADDRESS.street,
    `${ADDRESS.suburb} ${ADDRESS.state} ${ADDRESS.postcode}`,
  ],
  parking: settings.contact.parking,
  region: settings.contact.region,
};

export const OPENING_HOURS: OpeningHour[] = settings.openingHours;

export const OPENING_HOURS_SPEC = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
];

export const MAP_QUERY = `${SITE_NAME}, ${CONTACT.addressLines.join(", ")}`;

export const GEO = { latitude: -33.732148, longitude: 150.9465519 };

const GEO_QUERY = `${GEO.latitude},${GEO.longitude}`;

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(GEO_QUERY)}&z=17&output=embed`;

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(GEO_QUERY)}`;

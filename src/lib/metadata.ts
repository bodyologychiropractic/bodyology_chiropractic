import type { Metadata } from "next";
import { SITE_URL, getSiteName } from "@/lib/constants";

export function ogImage(siteName: string) {
  return {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: `${siteName} logo`,
    type: "image/jpeg",
  };
}

/** Joins a route path onto SITE_URL, honouring the app's trailing-slash setting. */
function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (path === "/" || path === "") return `${base}/`;
  const normalized = `/${path.replace(/^\/|\/$/g, "")}/`;
  return `${base}${normalized}`;
}

interface SeoOverride {
  title?: string | null;
  description?: string | null;
}

export async function buildMetadata(
  title: string,
  description: string,
  path: string = "/",
  seo?: SeoOverride,
): Promise<Metadata> {
  const siteName = await getSiteName();
  const url = absoluteUrl(path);
  const isHome = path === "/" || path === "";
  const resolvedTitle = seo?.title || title;
  const resolvedDescription = seo?.description || description;
  const fullTitle = isHome ? resolvedTitle : `${resolvedTitle} | ${siteName}`;
  const OG_IMAGE = ogImage(siteName);

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        { url: "/brand/icon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: fullTitle,
      description: resolvedDescription,
      url,
      siteName,
      locale: "en_AU",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: resolvedDescription,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

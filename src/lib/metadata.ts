import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

/** Joins a route path onto SITE_URL, honouring the app's trailing-slash setting. */
function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (path === "/" || path === "") return `${base}/`;
  const normalized = `/${path.replace(/^\/|\/$/g, "")}/`;
  return `${base}${normalized}`;
}

export function buildMetadata(
  title: string,
  description: string,
  path: string = "/",
): Metadata {
  const url = absoluteUrl(path);
  const isHome = path === "/" || path === "";
  const fullTitle = isHome ? title : `${title} | ${SITE_NAME}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
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

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { SERVICES } from "@/lib/services-content";

function url(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (path === "/") return `${base}/`;
  return `${base}/${path.replace(/^\/|\/$/g, "")}/`;
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/fees", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
    ...SERVICES.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.7,
    })),
  ];

  return pages.map(({ path, priority }) => ({
    url: url(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}

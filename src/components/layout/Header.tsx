import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { LOGO, getNavLinks, getSiteName } from "@/lib/constants";
import { getServices } from "@/lib/services-content";

export default async function Header() {
  const [siteName, navLinks, services] = await Promise.all([
    getSiteName(),
    getNavLinks(),
    getServices(),
  ]);

  // Sub-links are managed in the admin (Settings > Navigation Links). If a
  // link has none configured, fall back to auto-listing services under it.
  const navLinksWithChildren = navLinks.map((link) =>
    !link.children && link.href === "/services" && services.length > 0
      ? {
          ...link,
          children: services.map((service) => ({
            label: service.title,
            href: `/services/${service.slug}`,
          })),
        }
      : link,
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container-page flex h-14 items-center justify-between md:h-16">
        <Link href="/" className="flex items-center">
          <img
            src={LOGO.src}
            alt={siteName}
            width={LOGO.width}
            height={LOGO.height}
            decoding="async"
            draggable={false}
            className="h-10 w-auto select-none object-contain sm:h-12 md:h-14"
          />
        </Link>
        <Navigation navLinks={navLinksWithChildren} />
      </div>
    </header>
  );
}

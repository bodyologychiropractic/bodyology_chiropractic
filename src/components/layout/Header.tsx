import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { LOGO, getNavLinks, getSiteName } from "@/lib/constants";

export default async function Header() {
  const [siteName, navLinks] = await Promise.all([getSiteName(), getNavLinks()]);

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
        <Navigation navLinks={navLinks} />
      </div>
    </header>
  );
}

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { LOGO, SITE_NAME } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container-page flex h-14 items-center justify-between md:h-16">
        <Link href="/" className="flex items-center">
          <img
            src={LOGO.src}
            alt={SITE_NAME}
            width={LOGO.width}
            height={LOGO.height}
            decoding="async"
            draggable={false}
            className="h-10 w-auto select-none object-contain sm:h-12 md:h-14"
          />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

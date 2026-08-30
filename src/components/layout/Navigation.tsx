"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    const current = pathname.replace(/\/$/, "") || "/";
    return href === "/" ? current === "/" : current.startsWith(href);
  };

  const linkClass = (href: string) =>
    [
      "transition-colors",
      isActive(href)
        ? "text-accent font-medium border-b-2 border-accent"
        : "text-primary/80 hover:text-accent",
    ].join(" ");

  return (
    <nav className={className} aria-label="Main">
      <ul className="hidden items-center gap-6 md:flex lg:gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${linkClass(link.href)} pb-1 text-sm uppercase tracking-wider`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-primary md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
          className="h-6 w-6"
        >
          {isOpen ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-100%)] overflow-y-auto border-t border-border bg-background shadow-lg md:hidden"
        >
          <ul className="container-page flex flex-col py-2 pb-safe">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-border last:border-b-0">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`${linkClass(link.href)} flex items-center py-4 text-base`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}

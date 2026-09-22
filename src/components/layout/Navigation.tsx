"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink } from "@/types";

export interface NavigationProps {
  className?: string;
  navLinks: NavLink[];
}

export default function Navigation({ className = "", navLinks }: NavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);

  useEffect(() => {
    setIsOpen(false);
    setOpenMobileSubmenu(null);
    setOpenDesktopSubmenu(null);
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
        {navLinks.map((link, index) => {
          const isLast = index === navLinks.length - 1;
          const isSubmenuOpen = openDesktopSubmenu === link.href;
          return (
            <li
              key={link.href}
              className={link.children ? "relative" : undefined}
              onMouseEnter={link.children ? () => setOpenDesktopSubmenu(link.href) : undefined}
              onMouseLeave={link.children ? () => setOpenDesktopSubmenu(null) : undefined}
            >
              <Link
                href={link.href}
                onFocus={link.children ? () => setOpenDesktopSubmenu(link.href) : undefined}
                className={`${linkClass(link.href)} flex items-center gap-1 pb-1 text-sm uppercase tracking-wider`}
                aria-current={isActive(link.href) ? "page" : undefined}
                aria-expanded={link.children ? isSubmenuOpen : undefined}
              >
                {link.label}
                {link.children ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                ) : null}
              </Link>

              {link.children ? (
                <div
                  className={`absolute top-full z-40 w-64 pt-3 transition-opacity duration-150 ${
                    isLast ? "right-0" : "left-0"
                  } ${isSubmenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
                  role="menu"
                  onFocus={() => setOpenDesktopSubmenu(link.href)}
                  onBlur={() => setOpenDesktopSubmenu(null)}
                >
                  <ul className="overflow-hidden rounded-xl border border-border bg-background py-2 shadow-lg">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-sm text-primary/80 transition-colors hover:bg-surface hover:text-accent"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
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
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-border last:border-b-0">
                {link.children ? (
                  <>
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`${linkClass(link.href)} flex flex-1 items-center py-4 text-base`}
                        aria-current={isActive(link.href) ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileSubmenu((current) =>
                            current === link.href ? null : link.href,
                          )
                        }
                        aria-expanded={openMobileSubmenu === link.href}
                        aria-label={`Toggle ${link.label} submenu`}
                        className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-primary"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform ${
                            openMobileSubmenu === link.href ? "rotate-180" : ""
                          }`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    {openMobileSubmenu === link.href ? (
                      <ul className="flex flex-col pb-2 pl-4">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-3 text-sm text-primary/70 transition-colors hover:text-accent"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`${linkClass(link.href)} flex items-center py-4 text-base`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}

import Icon from "@/components/ui/Icon";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border py-2 pb-safe sm:py-4">
      <div className="container-page flex flex-col items-center gap-2">
        <ul className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={link.label}
                title={link.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <Icon name={link.icon} className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-muted">
          &copy; {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

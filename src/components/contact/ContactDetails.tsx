import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import {
  CONTACT,
  MAP_DIRECTIONS_URL,
  OPENING_HOURS,
  SOCIAL_LINKS,
} from "@/lib/constants";
import type { IconName } from "@/types";

function DetailRow({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
          {title}
        </h2>
        <div className="mt-2 text-base leading-relaxed text-muted">{children}</div>
      </div>
    </div>
  );
}

export default function ContactDetails() {
  return (
    <div className="space-y-8">
      <DetailRow icon="pin" title="Visit us">
        <address className="not-italic">
          {CONTACT.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <p className="mt-2 text-sm">{CONTACT.parking}</p>
        <a
          href={MAP_DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-2 inline-flex text-sm font-medium text-accent hover:underline"
        >
          Get directions
        </a>
      </DetailRow>

      <DetailRow icon="phone" title="Call us">
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          className="hover:text-foreground"
        >
          {CONTACT.phone}
        </a>
      </DetailRow>

      <DetailRow icon="mail" title="Email">
        <a href={`mailto:${CONTACT.email}`} className="break-words hover:text-foreground">
          {CONTACT.email}
        </a>
      </DetailRow>

      <DetailRow icon="clock" title="Opening hours">
        <ul className="space-y-1">
          {OPENING_HOURS.map((entry) => (
            <li key={entry.days} className="flex justify-between gap-6 sm:justify-start">
              <span className="min-w-28 font-medium text-foreground">{entry.days}</span>
              <span>{entry.hours}</span>
            </li>
          ))}
        </ul>
      </DetailRow>

      <DetailRow icon="calendar" title="Follow us">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </DetailRow>
    </div>
  );
}

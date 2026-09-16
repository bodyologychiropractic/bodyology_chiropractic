import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { getBookingUrl, getContact, getOpeningHours } from "@/lib/constants";
import type { IconName } from "@/types";

function Column({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <h3 className="flex items-center gap-3 text-lg font-medium">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-on-dark/10 text-on-dark">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        {title}
      </h3>
      <div className="mt-4 space-y-2 text-sm text-on-dark/75">{children}</div>
    </div>
  );
}

export default async function InfoBar() {
  const [bookingUrl, contact, openingHours] = await Promise.all([
    getBookingUrl(),
    getContact(),
    getOpeningHours(),
  ]);

  return (
    <Section
      id="contact"
      tone="dark"
      containerClassName="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
    >
      <div data-aos="fade-up">
        <Column icon="calendar" title="Book Online">
          <p>Book your appointment online 24/7.</p>
          <Button
            href={bookingUrl}
            variant="outline-light"
            className="mt-4"
            fullWidthOnMobile
          >
            Book online
          </Button>
        </Column>
      </div>

      <div data-aos="fade-up" data-aos-delay="80">
        <Column icon="phone" title="Contact">
          <p>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-on-dark">
              {contact.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`} className="break-words hover:text-on-dark">
              {contact.email}
            </a>
          </p>
          <p className="break-words">{contact.website}</p>
        </Column>
      </div>

      <div data-aos="fade-up" data-aos-delay="160">
        <Column icon="pin" title="Location">
          {contact.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="pt-2">{contact.parking}</p>
        </Column>
      </div>

      <div data-aos="fade-up" data-aos-delay="240">
        <Column icon="clock" title="Opening Hours">
          <dl className="space-y-2">
            {openingHours.map((entry) => (
              <div key={entry.days} className="flex justify-between gap-4">
                <dt>{entry.days}</dt>
                <dd className="text-on-dark">{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </Column>
      </div>
    </Section>
  );
}

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { getBookingUrl } from "@/lib/constants";
import { getHomeFirstTimeService } from "@/lib/home-content";

export default async function FirstTimeService() {
  const [section, bookingUrl] = await Promise.all([getHomeFirstTimeService(), getBookingUrl()]);
  if (!section.title && section.steps.length === 0) return null;

  return (
    <Section tone="dark">
      <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
        {section.title ? (
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl">
            {section.title}
          </h2>
        ) : null}
        {section.description ? (
          <p className="mt-3 text-base text-on-dark/80 sm:text-lg">{section.description}</p>
        ) : null}
      </div>

      {section.steps.length > 0 ? (
        <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3">
          {section.steps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="rounded-2xl bg-background p-6 text-center text-foreground"
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 80, 240)}
            >
              {step.image?.url ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.image.url}
                    alt={step.image.alt ?? ""}
                    width={step.image.width ?? undefined}
                    height={step.image.height ?? undefined}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <span
                className={[
                  "mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent text-lg font-semibold text-white ring-4 ring-background",
                  step.image?.url ? "-mt-6" : "mt-0",
                ].join(" ")}
              >
                {index + 1}
              </span>

              <h3 className="mt-4 text-lg font-semibold text-primary">{step.title}</h3>
              {step.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-12 text-center" data-aos="fade-up">
        <Button href={bookingUrl} className="text-base uppercase" fullWidthOnMobile>
          <Icon name="calendar" className="mr-3 h-5 w-5" />
          Book online
        </Button>
      </div>

      {section.bannerImage?.url ? (
        <div className="mx-auto mt-10 max-w-5xl" data-aos="fade-up">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={section.bannerImage.url}
            alt={section.bannerImage.alt ?? ""}
            width={section.bannerImage.width ?? undefined}
            height={section.bannerImage.height ?? undefined}
            loading="lazy"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      ) : null}
    </Section>
  );
}

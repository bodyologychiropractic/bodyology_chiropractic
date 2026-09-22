import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { getHomeAboutSection } from "@/lib/home-content";

export default async function AboutIntro() {
  const section = await getHomeAboutSection();
  if (!section.title && !section.image) return null;

  return (
    <Section
      id="about-intro"
      tone="default"
      containerClassName="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {section.image?.url ? (
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary/10 ring-1 ring-border" data-aos="fade-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={section.image.url}
            alt={section.image.alt ?? ""}
            width={section.image.width ?? undefined}
            height={section.image.height ?? undefined}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div data-aos="fade-left" data-aos-delay="100">
        {section.eyebrow ? (
          <span className="inline-flex items-center rounded-full border border-accent/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            {section.eyebrow}
          </span>
        ) : null}

        {section.title ? (
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl lg:text-4xl">
            {section.title}
          </h2>
        ) : null}

        {section.description ? (
          <p className="mt-4 text-base leading-relaxed text-muted">{section.description}</p>
        ) : null}

        {section.points.length > 0 ? (
          <ul className="mt-6 space-y-5">
            {section.points.map((point, index) => (
              <li key={`${point.title}-${index}`} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-primary">{point.title}</p>
                  {point.description ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted">{point.description}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8">
          <Button href="/about" className="text-base uppercase" fullWidthOnMobile>
            {section.buttonLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
}

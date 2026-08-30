import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Section from "@/components/ui/Section";
import { ABOUT_PRACTITIONER } from "@/lib/about-content";
import { ABOUT_IMAGE, PRACTITIONER } from "@/lib/constants";

export default function PractitionerProfile() {
  return (
    <Section
      id={ABOUT_PRACTITIONER.id}
      tone="surface"
      containerClassName="grid items-start gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16"
    >
      <div data-aos="fade-right">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary/10 ring-1 ring-border">
          <ResponsiveImage
            image={ABOUT_IMAGE}
            alt={`${PRACTITIONER.name}, ${PRACTITIONER.role}`}
            fill
            sizes="(min-width: 1024px) 22rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div data-aos="fade-left" data-aos-delay="100">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {PRACTITIONER.role}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl lg:text-4xl">
          {ABOUT_PRACTITIONER.title}
        </h2>
        <span aria-hidden="true" className="mt-4 block h-0.5 w-16 bg-accent" />

        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
          {ABOUT_PRACTITIONER.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

import Icon from "@/components/ui/Icon";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Section from "@/components/ui/Section";
import { ABOUT_IMAGE, PRACTITIONER } from "@/lib/constants";

export default function About() {
  return (
    <Section
      id="about"
      tone="surface"
      containerClassName="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div data-aos="fade-right">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary/10 ring-1 ring-border">
          <ResponsiveImage
            image={ABOUT_IMAGE}
            alt={`${PRACTITIONER.name}, ${PRACTITIONER.role}`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div data-aos="fade-left" data-aos-delay="100">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          About
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl lg:text-4xl">
          {PRACTITIONER.name}
        </h2>
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {PRACTITIONER.role}
        </p>

        <div className="mt-6 space-y-4 text-base text-muted">
          {PRACTITIONER.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="mt-8 space-y-3">
          {PRACTITIONER.credentials.map((credential) => (
            <li key={credential} className="flex items-start gap-3 text-sm text-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
              {credential}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

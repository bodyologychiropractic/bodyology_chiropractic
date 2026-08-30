import Section from "@/components/ui/Section";
import { ABOUT_INTRO } from "@/lib/about-content";
import { SITE_TAGLINE } from "@/lib/constants";

export default function AboutHero() {
  return (
    <Section spacing="sm">
      <div className="max-w-3xl text-center sm:text-left" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {ABOUT_INTRO.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
          {ABOUT_INTRO.title}
        </h1>
        <p className="mt-4 text-lg italic text-accent">{SITE_TAGLINE}</p>

        <div className="mt-6 space-y-4 text-left text-base leading-relaxed text-muted sm:text-lg">
          {ABOUT_INTRO.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

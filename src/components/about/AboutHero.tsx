import Section from "@/components/ui/Section";
import { getAboutIntro } from "@/lib/about-content";
import { getSiteTagline } from "@/lib/constants";

export default async function AboutHero() {
  const [intro, siteTagline] = await Promise.all([getAboutIntro(), getSiteTagline()]);

  return (
    <Section spacing="sm">
      <div className="max-w-3xl text-center sm:text-left" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {intro.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
          {intro.title}
        </h1>
        <p className="mt-4 text-lg italic text-accent">{siteTagline}</p>

        <div className="mt-6 space-y-4 text-left text-base leading-relaxed text-muted sm:text-lg">
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

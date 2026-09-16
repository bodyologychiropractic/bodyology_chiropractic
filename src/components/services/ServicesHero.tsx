import Section from "@/components/ui/Section";
import { getServicesHero } from "@/lib/page-hero-content";

export default async function ServicesHero() {
  const hero = await getServicesHero();

  return (
    <Section spacing="sm">
      <div className="max-w-3xl text-center sm:text-left" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {hero.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          {hero.description}
        </p>
      </div>
    </Section>
  );
}

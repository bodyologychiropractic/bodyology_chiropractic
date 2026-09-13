import Section from "@/components/ui/Section";
import heroes from "../../../content/pages/heroes.json";

export default function ServicesHero() {
  return (
    <Section spacing="sm">
      <div className="max-w-3xl text-center sm:text-left" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {heroes.services.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
          {heroes.services.title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          {heroes.services.description}
        </p>
      </div>
    </Section>
  );
}

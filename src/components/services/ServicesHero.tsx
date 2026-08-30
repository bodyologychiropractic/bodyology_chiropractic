import Section from "@/components/ui/Section";

export default function ServicesHero() {
  return (
    <Section spacing="sm">
      <div className="max-w-3xl text-center sm:text-left" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Services
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
          How We Can Help
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          Care is selected according to your presentation and clinical findings. Choose a
          service to read more about what it involves.
        </p>
      </div>
    </Section>
  );
}

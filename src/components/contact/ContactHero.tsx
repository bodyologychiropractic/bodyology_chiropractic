import Section from "@/components/ui/Section";
import { CONTACT } from "@/lib/constants";

export default function ContactHero() {
  return (
    <Section spacing="sm">
      <div className="max-w-3xl text-center sm:text-left" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Contact
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          We are in {CONTACT.region}. Book online any time, or call us if you would like
          to talk through your presentation first.
        </p>
      </div>
    </Section>
  );
}

import Section from "@/components/ui/Section";
import { FEES_INTRO } from "@/lib/fees-content";

export default function FeesHero() {
  return (
    <Section spacing="sm">
      <div className="max-w-3xl text-center sm:text-left" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Fees
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl lg:text-5xl">
          Consultation Fees
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          {FEES_INTRO}
        </p>
      </div>
    </Section>
  );
}

import Section from "@/components/ui/Section";
import { ABOUT_CLOSING } from "@/lib/about-content";
import { SITE_TAGLINE } from "@/lib/constants";

export default function ClosingStatement() {
  return (
    <Section tone="dark" spacing="sm">
      <blockquote className="mx-auto max-w-3xl text-center" data-aos="fade-up">
        <p className="text-lg italic leading-relaxed text-balance sm:text-xl">
          {ABOUT_CLOSING}
        </p>
        <footer className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {SITE_TAGLINE}
        </footer>
      </blockquote>
    </Section>
  );
}

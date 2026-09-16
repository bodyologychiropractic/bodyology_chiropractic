import Section from "@/components/ui/Section";
import { getAboutClosing } from "@/lib/about-content";
import { getSiteTagline } from "@/lib/constants";

export default async function ClosingStatement() {
  const [closing, siteTagline] = await Promise.all([getAboutClosing(), getSiteTagline()]);

  return (
    <Section tone="dark" spacing="sm">
      <blockquote className="mx-auto max-w-3xl text-center" data-aos="fade-up">
        <p className="text-lg italic leading-relaxed text-balance sm:text-xl">{closing}</p>
        <footer className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {siteTagline}
        </footer>
      </blockquote>
    </Section>
  );
}

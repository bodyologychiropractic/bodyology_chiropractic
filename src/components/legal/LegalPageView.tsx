import Section from "@/components/ui/Section";
import LegalRichText from "@/components/legal/LegalRichText";
import type { LegalPage } from "@/payload-types";

export interface LegalPageViewProps {
  page: LegalPage;
}

export default function LegalPageView({ page }: LegalPageViewProps) {
  const updatedAt = new Date(page.updatedAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Section spacing="lg">
      <div className="max-w-3xl" data-aos="fade-up">
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated {updatedAt}</p>
      </div>

      {page.body ? <LegalRichText data={page.body} /> : null}
    </Section>
  );
}

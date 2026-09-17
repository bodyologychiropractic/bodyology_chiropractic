import Section from "@/components/ui/Section";
import LegalRichText from "@/components/legal/LegalRichText";
import Button from "@/components/ui/Button";
import { getFaqs } from "@/lib/faq-content";

export default async function FaqSection() {
  const faqs = await getFaqs();
  if (faqs.length === 0) return null;

  return (
    <Section tone="dark">
      <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-base text-on-dark/80 sm:text-lg">
          Everything you need to know about your visit.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={faq.id}
            className="group rounded-2xl bg-background text-foreground open:shadow-lg"
            data-aos="fade-up"
            data-aos-delay={Math.min(index * 60, 240)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-base font-semibold sm:text-lg">
              {faq.question}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="px-6 pb-6">
              <LegalRichText data={faq.answer} />
            </div>
          </details>
        ))}
      </div>

      <div className="mt-12 text-center" data-aos="fade-up">
        <p className="text-base text-on-dark/80 sm:text-lg">Still have questions?</p>
        <div className="mt-4">
          <Button href="/contact" className="text-base uppercase" fullWidthOnMobile>
            Contact Us
          </Button>
        </div>
      </div>
    </Section>
  );
}

import ContactDetails from "@/components/contact/ContactDetails";
import ContactMap from "@/components/contact/ContactMap";
import Section from "@/components/ui/Section";

export default function ContactSplit() {
  return (
    <Section
      spacing="sm"
      containerClassName="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div data-aos="fade-right">
        <ContactDetails />
      </div>

      <div className="lg:h-full" data-aos="fade-left" data-aos-delay="80">
        <ContactMap />
      </div>
    </Section>
  );
}

import BookingWidget from "@/components/booking/BookingWidget";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SectionTone } from "@/types";

export interface BookingSectionProps {
  tone?: SectionTone;
}

export default function BookingSection({ tone = "default" }: BookingSectionProps) {
  return (
    <Section id="booking" tone={tone} className="scroll-mt-20">
      <SectionHeading
        eyebrow="Appointments"
        title="Book Online"
        description="Choose a time that suits you, bookings are open 24/7."
      />

      <div className="mx-auto mt-10 max-w-4xl">
        <BookingWidget />
      </div>
    </Section>
  );
}

import FeeCard from "@/components/fees/FeeCard";
import Section from "@/components/ui/Section";
import { FEES } from "@/lib/fees-content";

export default function FeeList() {
  return (
    <Section spacing="sm" tone="surface">
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {FEES.map((fee, index) => (
          <li key={fee.id} data-aos="fade-up" data-aos-delay={(index % 2) * 80}>
            <FeeCard fee={fee} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

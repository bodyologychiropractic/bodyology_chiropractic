import BookingSection from "@/components/booking/BookingSection";
import { About, FaqSection, Hero, InfoBar, Services } from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <FaqSection />
      <BookingSection />
      <InfoBar />
    </>
  );
}

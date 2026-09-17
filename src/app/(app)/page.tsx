import BookingSection from "@/components/booking/BookingSection";
import { About, FaqSection, FirstTimeService, Hero, InfoBar, Services } from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <FirstTimeService />
      <BookingSection />
      <FaqSection />
      <InfoBar />
    </>
  );
}

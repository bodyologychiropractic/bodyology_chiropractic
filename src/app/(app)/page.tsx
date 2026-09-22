import BookingSection from "@/components/booking/BookingSection";
import { About, AboutIntro, FaqSection, FirstTimeService, Hero, InfoBar, Services } from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <Services />
      <About />
      <FirstTimeService />
      <BookingSection />
      <FaqSection />
      <InfoBar />
    </>
  );
}

import BookingSection from "@/components/booking/BookingSection";
import { About, Hero, InfoBar, Services } from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <BookingSection />
      <InfoBar />
    </>
  );
}

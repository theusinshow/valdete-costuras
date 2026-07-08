import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Pillars } from "@/components/sections/Pillars";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Companies } from "@/components/sections/Companies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Location } from "@/components/sections/Location";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Pillars />
        <HowItWorks />
        <Companies />
        <Testimonials />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

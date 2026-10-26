import {
  Navbar,
  Hero,
  FeatureStrip,
  HowItWorks,
  Features,
  WhatsAppShowcase,
  CallToAction,
  Footer,
} from "../components/landing";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f8faf8] text-[14px] leading-[1.5] text-[#111827]">
      <Navbar />
      <main>
        <Hero />
        <FeatureStrip />
        <HowItWorks />
        <Features />
        <WhatsAppShowcase />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

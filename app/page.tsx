import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { ProcessSection } from "@/components/home/process-section";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}

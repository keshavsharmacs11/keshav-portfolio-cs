import { PortfolioIntro } from "@/components/portfolio-intro";
import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { BackToTop } from "@/components/back-to-top";
import { PortfolioScrollRuntime } from "@/components/portfolio-scroll-runtime";
import { MobileMotionRuntime } from "@/components/mobile-motion-runtime";
import { HeroSection } from "@/components/hero-section";
import { SelectedWork } from "@/components/selected-work";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { AboutSection } from "@/components/about-section";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { PortfolioAssistant } from "@/components/portfolio-assistant";
import { CommandPalette } from "@/components/command-palette";

export default function Home() {
  return (
    <>
      <PortfolioIntro />

      <PortfolioScrollRuntime />
      <MobileMotionRuntime />
      <ScrollProgress />
      <CustomCursor />

      <SiteHeader />

      <main>
        <HeroSection />
        <SelectedWork />
        <CapabilitiesSection />
        <AboutSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <SiteFooter />
      <BackToTop />
      <CommandPalette />
      <PortfolioAssistant />
    </>
  );
}
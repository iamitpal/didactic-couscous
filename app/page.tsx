// import { ModeToggle } from "@/components/ModeToggle";

import { ConsultationPage } from "@/components/Consultation";
import HeroSection from "@/components/Herosection";
import { MarqueeDemo } from "@/components/MarqueeDemo";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div>
        <MarqueeDemo />
      </div>
      <ConsultationPage />
    </main>
  );
}

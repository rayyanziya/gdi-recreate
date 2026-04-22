import { Hero } from "@/components/home/Hero";
import { DualEngine } from "@/components/home/DualEngine";
import { StatsRow } from "@/components/home/StatsRow";
import { PhilosophyQuote } from "@/components/home/PhilosophyQuote";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { CTASection } from "@/components/home/CTASection";
import { InsightsSection } from "@/components/home/InsightsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DualEngine />
      <StatsRow />
      <PhilosophyQuote />
      <PartnersMarquee />
      <CTASection />
      <InsightsSection />
    </>
  );
}

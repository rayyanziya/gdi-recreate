import { Hero } from "@/components/home/Hero";
import { ManifestoTicker } from "@/components/home/ManifestoTicker";
import { DualEngine } from "@/components/home/DualEngine";
import { StatsRow } from "@/components/home/StatsRow";
import { PhilosophyQuote } from "@/components/home/PhilosophyQuote";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoTicker />
      <DualEngine />
      <StatsRow />
      <PhilosophyQuote />
      <PartnersMarquee />
      <CTASection />
    </>
  );
}

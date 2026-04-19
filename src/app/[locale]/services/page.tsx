import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PathToggle } from "@/components/services/PathToggle";

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      {/* Hero — dark navy, same energy as home */}
      <section className="relative pt-36 pb-24 bg-navy overflow-hidden dot-grid">
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/85 to-navy pointer-events-none" />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#00c4e8 1px, transparent 1px), linear-gradient(90deg, #00c4e8 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-widest text-accent uppercase mb-8 font-medium">
              {t("hero_label")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-navy-text leading-[1.05] tracking-tight max-w-3xl mb-8">
              {t("hero_headline")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-navy-muted text-lg leading-relaxed max-w-2xl">
              {t("hero_sub")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <PathToggle />
    </>
  );
}

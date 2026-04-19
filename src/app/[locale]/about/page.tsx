import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FlywheelDiagram } from "@/components/about/FlywheelDiagram";
import { Principles } from "@/components/about/Principles";

function VentureCriteria() {
  const t = useTranslations("about");
  const criteria = [
    { num: t("v1_num"), title: t("v1_title"), body: t("v1_body") },
    { num: t("v2_num"), title: t("v2_title"), body: t("v2_body") },
    { num: t("v3_num"), title: t("v3_title"), body: t("v3_body") },
  ];

  return (
    <section className="border-t border-border bg-surface py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ScrollReveal className="mb-16">
          <p className="text-xs tracking-widest text-accent uppercase mb-4 font-medium">
            {t("ventures_label")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-primary leading-tight mb-4">
            {t("ventures_title")}
          </h2>
          <p className="text-muted text-base leading-relaxed max-w-xl">
            {t("ventures_sub")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {criteria.map(({ num, title, body }, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="border-t-2 border-accent pt-8">
                <span className="text-6xl font-black text-faint block mb-6 leading-none">
                  {num}
                </span>
                <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBlock() {
  const tf = useTranslations("footer");
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs tracking-widest text-accent uppercase mb-2 font-medium">
            Contact
          </p>
          <a
            href={`mailto:${tf("email")}`}
            className="text-primary hover:text-accent transition-colors text-lg font-semibold"
          >
            {tf("email")}
          </a>
        </div>
        <p className="text-muted text-sm">{tf("location")}</p>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      {/* Hero — light */}
      <section className="pt-32 pb-24 lg:pb-28 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-widest text-accent uppercase mb-8 font-medium">
              {t("hero_label")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-primary leading-[1.05] tracking-tight max-w-4xl mb-8">
              {t("hero_headline")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted text-lg leading-relaxed max-w-2xl">
              {t("hero_sub")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Position */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-28">
        <ScrollReveal className="mb-10">
          <p className="text-xs tracking-widest text-accent uppercase mb-4 font-medium">
            {t("position_label")}
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <ScrollReveal direction="left">
            <blockquote className="text-2xl sm:text-3xl font-bold text-primary leading-snug border-l-[3px] border-accent pl-6">
              &ldquo;{t("position_quote")}&rdquo;
            </blockquote>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <p className="text-muted text-base leading-relaxed">{t("position_body")}</p>
          </ScrollReveal>
        </div>
      </section>

      <FlywheelDiagram />
      <Principles />
      <VentureCriteria />
      <ContactBlock />
    </>
  );
}

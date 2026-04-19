import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Principles() {
  const t = useTranslations("about");

  const items = [
    { num: t("p1_num"), title: t("p1_title"), body: t("p1_body") },
    { num: t("p2_num"), title: t("p2_title"), body: t("p2_body") },
    { num: t("p3_num"), title: t("p3_title"), body: t("p3_body") },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <ScrollReveal className="mb-16">
        <p className="text-xs tracking-widest text-accent uppercase mb-4 font-medium">
          {t("philosophy_label")}
        </p>
        <h2 className="text-4xl sm:text-5xl font-black text-primary leading-tight">
          {t("philosophy_title")}
        </h2>
      </ScrollReveal>

      <div className="flex flex-col gap-0">
        {items.map(({ num, title, body }, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[5rem_1fr] gap-6 lg:gap-12 border-t border-border py-10">
              <span className="text-5xl font-black text-faint leading-none">{num}</span>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-muted leading-relaxed text-base max-w-2xl">{body}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}

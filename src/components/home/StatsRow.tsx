import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function StatsRow() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("s1_value"), label: t("s1_label") },
    { value: t("s2_value"), label: t("s2_label") },
    { value: t("s3_value"), label: t("s3_label") },
    { value: t("s4_value"), label: t("s4_label") },
  ];

  return (
    <section className="border-y border-border bg-surface">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border">
          {stats.map(({ value, label }, i) => (
            <ScrollReveal
              key={i}
              delay={i * 0.08}
              className="lg:px-10 first:lg:pl-0 last:lg:pr-0"
            >
              <p className="text-5xl sm:text-6xl font-black text-navy mb-2 leading-none">
                {value}
              </p>
              <p className="text-xs tracking-widest text-muted uppercase font-medium">
                {label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

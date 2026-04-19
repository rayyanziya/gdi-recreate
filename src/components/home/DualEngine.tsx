"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function DualEngine() {
  const t = useTranslations("dual_engine");

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <ScrollReveal className="mb-16">
        <p className="text-xs tracking-widest text-accent uppercase mb-4 font-medium">
          {t("label")}
        </p>
        <p className="text-muted text-lg max-w-2xl leading-relaxed">
          {t("intro")}
        </p>
      </ScrollReveal>

      <ScrollReveal direction="left">
        <div className="border-t-2 border-accent pt-8">
          <div className="flex items-start gap-5 mb-5">
            <span className="text-5xl font-black text-faint leading-none select-none">
              {t("engine1_num")}
            </span>
            <div className="pt-1">
              <p className="text-xs tracking-widest text-accent uppercase mb-2 font-medium">Service</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary leading-tight">{t("engine1_title")}</h3>
            </div>
          </div>
          <p className="text-muted leading-relaxed text-base max-w-3xl">{t("engine1_desc")}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

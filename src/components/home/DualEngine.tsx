"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function EnginePanel({
  num,
  title,
  desc,
  delay,
  direction,
}: {
  num: string;
  title: string;
  desc: string;
  delay: number;
  direction: "left" | "right";
}) {
  return (
    <ScrollReveal direction={direction} delay={delay} className="flex-1">
      <div className="border-t-2 border-accent pt-8 h-full">
        <div className="flex items-start gap-5 mb-5">
          <span className="text-5xl font-black text-faint leading-none select-none">
            {num}
          </span>
          <div className="pt-1">
            <p className="text-xs tracking-widest text-accent uppercase mb-2 font-medium">Engine</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary leading-tight">{title}</h3>
          </div>
        </div>
        <p className="text-muted leading-relaxed text-base">{desc}</p>
      </div>
    </ScrollReveal>
  );
}

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <EnginePanel
          num={t("engine1_num")}
          title={t("engine1_title")}
          desc={t("engine1_desc")}
          delay={0}
          direction="left"
        />
        <EnginePanel
          num={t("engine2_num")}
          title={t("engine2_title")}
          desc={t("engine2_desc")}
          delay={0.1}
          direction="right"
        />
      </div>
    </section>
  );
}

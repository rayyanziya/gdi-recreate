"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function FlywheelDiagram() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { title: t("flywheel_step1_title"), desc: t("flywheel_step1_desc") },
    { title: t("flywheel_step2_title"), desc: t("flywheel_step2_desc") },
    { title: t("flywheel_step3_title"), desc: t("flywheel_step3_desc") },
  ];

  return (
    <section ref={ref} className="border-y border-border bg-surface py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-widest text-accent uppercase mb-4 font-medium"
        >
          {t("flywheel_label")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black text-primary mb-4 leading-tight"
        >
          {t("flywheel_title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted text-base leading-relaxed max-w-2xl mb-16"
        >
          {t("flywheel_sub")}
        </motion.p>

        <div className="relative">
          {/* Animated vertical connector */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="absolute left-4 top-0 bottom-0 w-px bg-border origin-top hidden lg:block"
          />

          <div className="flex flex-col">
            {steps.map(({ title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 + i * 0.15, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-[3rem_1fr] gap-4 lg:gap-10 pb-12 last:pb-0"
              >
                <div className="lg:flex lg:flex-col lg:items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center bg-base shrink-0">
                    <span className="text-xs text-accent font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="lg:pb-12 last:lg:pb-0">
                  <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                  <p className="text-muted leading-relaxed text-sm">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

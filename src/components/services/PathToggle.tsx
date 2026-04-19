"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const techLogos = [
  { src: "/logos/frappe.png",    alt: "Frappe" },
  { src: "/logos/erpnext.jpg",   alt: "ERPNext" },
  { src: "/logos/anthropic.svg", alt: "Anthropic" },
  { src: "/logos/openai.png",    alt: "OpenAI" },
  { src: "/logos/aws.png",       alt: "AWS" },
  { src: "/logos/azure.png",     alt: "Azure" },
  { src: "/logos/ruijie.png",    alt: "Ruijie" },
  { src: "/logos/sonicwall.png", alt: "SonicWall" },
  { src: "/logos/tp-link.png",   alt: "TP-Link" },
  { src: "/logos/omada.jpg",     alt: "Omada" },
  { src: "/logos/huawei.png",    alt: "Huawei" },
  { src: "/logos/sangfor.png",   alt: "Sangfor" },
];

const fadeIn = { opacity: 0, y: 16 };
const fadeOut = { opacity: 0, y: -10 };

export function PathToggle() {
  const t = useTranslations("services");
  const [active, setActive] = useState<"orgs" | "founders">("orgs");

  const orgServices = [
    { title: t("o1_title"), desc: t("o1_desc") },
    { title: t("o2_title"), desc: t("o2_desc") },
    { title: t("o3_title"), desc: t("o3_desc") },
    { title: t("o4_title"), desc: t("o4_desc") },
    { title: t("o5_title"), desc: t("o5_desc") },
    { title: t("o6_title"), desc: t("o6_desc") },
  ];

  const founderServices = [
    { title: t("f1_title"), desc: t("f1_desc") },
    { title: t("f2_title"), desc: t("f2_desc") },
    { title: t("f3_title"), desc: t("f3_desc") },
    { title: t("f4_title"), desc: t("f4_desc") },
    { title: t("f5_title"), desc: t("f5_desc") },
    { title: t("f6_title"), desc: t("f6_desc") },
  ];

  const founderCriteria = [
    { num: t("c1_num"), title: t("c1_title"), desc: t("c1_desc") },
    { num: t("c2_num"), title: t("c2_title"), desc: t("c2_desc") },
    { num: t("c3_num"), title: t("c3_title"), desc: t("c3_desc") },
  ];

  return (
    <div>
      {/* Toggle tabs */}
      <div className="border-b border-border bg-base sticky top-16 z-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex">
            {(["orgs", "founders"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`relative py-5 pr-10 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  active === key ? "text-primary" : "text-muted hover:text-primary"
                }`}
              >
                {key === "orgs" ? t("toggle_orgs") : t("toggle_founders")}
                {active === key && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-10 h-[2px] bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <AnimatePresence mode="wait">
          {active === "orgs" ? (
            <motion.div
              key="orgs"
              initial={fadeIn}
              animate={{ opacity: 1, y: 0 }}
              exit={fadeOut}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="mb-14">
                <p className="text-xs tracking-widest text-accent uppercase mb-3 font-medium">
                  {t("orgs_label")}
                </p>
                <h2 className="text-4xl font-black text-primary mb-4">{t("orgs_title")}</h2>
                <p className="text-muted text-base max-w-xl leading-relaxed">{t("orgs_intro")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-20">
                {orgServices.map(({ title, desc }, i) => (
                  <div key={i} className="bg-base p-8 hover:bg-surface transition-colors duration-200">
                    <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs tracking-widest text-accent uppercase mb-8 font-medium">
                {t("tech_label")}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
                {techLogos.map((logo, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center h-10 opacity-40 hover:opacity-80 transition-opacity duration-300"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={80}
                      height={40}
                      className="max-h-9 max-w-[5rem] w-auto h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="founders"
              id="founders"
              initial={fadeIn}
              animate={{ opacity: 1, y: 0 }}
              exit={fadeOut}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="mb-14">
                <p className="text-xs tracking-widest text-accent uppercase mb-3 font-medium">
                  {t("founders_label")}
                </p>
                <h2 className="text-4xl font-black text-primary mb-4">{t("founders_title")}</h2>
                <p className="text-muted text-base max-w-xl leading-relaxed">{t("founders_intro")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-20">
                {founderServices.map(({ title, desc }, i) => (
                  <div key={i} className="bg-base p-8 hover:bg-surface transition-colors duration-200">
                    <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs tracking-widest text-accent uppercase mb-4 font-medium">
                {t("criteria_label")}
              </p>
              <h3 className="text-3xl font-black text-primary mb-3">{t("criteria_title")}</h3>
              <p className="text-muted text-sm mb-12 leading-relaxed">{t("criteria_sub")}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {founderCriteria.map(({ num, title, desc }, i) => (
                  <div key={i} className="border-t-2 border-accent pt-6">
                    <span className="text-5xl font-black text-faint block mb-5 leading-none">{num}</span>
                    <h4 className="text-lg font-bold text-primary mb-2">{title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

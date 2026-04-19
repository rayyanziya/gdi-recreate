"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function AnimatedWords({
  text,
  baseDelay = 0,
}: {
  text: string;
  baseDelay?: number;
}) {
  return (
    <span className="inline">
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: baseDelay + i * 0.08, ease: "easeOut" }}
          className="inline-block mr-[0.22em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    /* Dark navy section — explicit, not relying on CSS token */
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-navy dot-grid">
      {/* Vignette over dot grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/85 to-navy pointer-events-none" />

      {/* DV mark — large ghost watermark */}
      <div className="absolute right-[-6%] top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none select-none hidden lg:block">
        <Image
          src="/logo.png"
          alt=""
          width={720}
          height={720}
          className="w-[720px] h-[720px] object-contain brightness-0 invert"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-28 pb-24">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs tracking-widest text-accent uppercase mb-8 font-medium"
        >
          {t("label")}
        </motion.p>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[1.05] tracking-tight max-w-3xl mb-8 text-navy-text">
          <AnimatedWords text={t("headline1")} baseDelay={0.2} />
          <br />
          <AnimatedWords text={t("headline2")} baseDelay={0.42} />
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-navy-muted text-base sm:text-lg leading-relaxed max-w-lg mb-12"
        >
          {t("sub")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-accent/90 transition-colors duration-200"
          >
            {t("cta_primary")}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-navy-border px-7 py-3.5 text-sm font-medium text-navy-muted hover:text-navy-text hover:border-navy-muted transition-colors duration-200"
          >
            {t("cta_secondary")}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-10 left-6 lg:left-10 flex items-center gap-3"
        >
          <span className="block w-8 h-px bg-navy-border" />
          <span className="text-xs text-navy-muted tracking-widest uppercase">scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

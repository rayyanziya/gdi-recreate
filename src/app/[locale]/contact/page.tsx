"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name    = data.get("name") as string;
    const email   = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    const mailtoLink = `mailto:contact@dataverseindonesia.com?subject=${encodeURIComponent(
      `[${subject}] from ${name}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    setSending(true);
    window.location.href = mailtoLink;
    setTimeout(() => setSending(false), 2000);
  }

  return (
    <section className="min-h-[100dvh] pt-28 pb-20 border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">

          {/* Left: info */}
          <div className="pt-8 lg:pt-16">
            <ScrollReveal>
              <p className="text-xs tracking-widest text-accent uppercase mb-8 font-medium">
                {t("label")}
              </p>
              <h1 className="text-5xl sm:text-6xl font-black text-primary leading-tight mb-6">
                {t("headline")}
              </h1>
              <p className="text-muted text-base leading-relaxed max-w-sm mb-16">
                {t("sub")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-10">
                <div>
                  <p className="text-xs tracking-widest text-accent uppercase mb-2 font-medium">
                    {t("email_label")}
                  </p>
                  <a
                    href="mailto:contact@dataverseindonesia.com"
                    className="text-primary hover:text-accent transition-colors duration-200 text-base font-semibold"
                  >
                    {t("email")}
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-accent uppercase mb-2 font-medium">
                    {t("location_label")}
                  </p>
                  <p className="text-primary text-base">{t("location")}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <ScrollReveal direction="right" delay={0.15} className="pt-8 lg:pt-16">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-muted uppercase font-medium">
                    {t("form_name")}
                  </label>
                  <input
                    name="name"
                    required
                    placeholder={t("form_name")}
                    className="bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-sm text-primary placeholder:text-muted/50 transition-colors duration-200 rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-muted uppercase font-medium">
                    {t("form_email")}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t("form_email")}
                    className="bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-sm text-primary placeholder:text-muted/50 transition-colors duration-200 rounded-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-muted uppercase font-medium">
                  {t("form_subject_placeholder")}
                </label>
                <select
                  name="subject"
                  required
                  defaultValue=""
                  className="bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-sm text-primary transition-colors duration-200 appearance-none cursor-pointer rounded-none"
                >
                  <option value="" disabled className="text-muted">
                    {t("form_subject_placeholder")}
                  </option>
                  <option value="Organization">{t("form_subject_org")}</option>
                  <option value="Founder">{t("form_subject_founder")}</option>
                  <option value="Partner">{t("form_subject_partner")}</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-muted uppercase font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder={t("form_message")}
                  className="bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-sm text-primary placeholder:text-muted/50 transition-colors duration-200 resize-none rounded-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="self-start inline-flex items-center gap-2 bg-navy text-navy-text px-8 py-4 text-sm font-semibold hover:bg-accent transition-colors duration-200 disabled:opacity-60 cursor-pointer"
              >
                {sending ? t("form_sending") : t("form_submit")}
                {!sending && <span aria-hidden>→</span>}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

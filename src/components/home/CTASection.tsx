import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="bg-surface border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading */}
          <ScrollReveal direction="left">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-tight text-primary">
              {t("heading")}
            </h2>
            <p className="text-muted text-base leading-relaxed mt-5 max-w-md">
              {t("sub")}
            </p>
          </ScrollReveal>

          {/* Right: two paths */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="flex flex-col gap-px border border-border">
              {/* Path 1 */}
              <Link
                href="/services"
                className="group p-8 bg-base hover:bg-surface-light transition-colors duration-200 block"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-widest text-accent uppercase font-medium">01</p>
                  <span className="text-muted group-hover:text-accent transition-colors duration-200 text-lg">→</span>
                </div>
                <p className="text-xl font-bold text-primary mb-1">{t("org_label")}</p>
                <p className="text-sm text-muted">{t("org_desc")}</p>
              </Link>

              <div className="h-px bg-border" />

              {/* Path 2 */}
              <Link
                href="/services#founders"
                className="group p-8 bg-base hover:bg-surface-light transition-colors duration-200 block"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-widest text-accent uppercase font-medium">02</p>
                  <span className="text-muted group-hover:text-accent transition-colors duration-200 text-lg">→</span>
                </div>
                <p className="text-xl font-bold text-primary mb-1">{t("founder_label")}</p>
                <p className="text-sm text-muted">{t("founder_desc")}</p>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

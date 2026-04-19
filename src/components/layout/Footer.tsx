import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-navy border-t border-navy-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="GDI"
                width={36}
                height={36}
                className="w-9 h-9 object-contain brightness-0 invert"
              />
              <span className="text-xs tracking-wider font-medium text-navy-muted uppercase">
                Global Dataverse
              </span>
            </div>
            <p className="text-navy-muted text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-widest text-accent uppercase mb-5 font-medium">
              {t("nav_label")}
            </p>
            <ul className="flex flex-col gap-3">
              {(["home", "about", "services", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={key === "home" ? "/" : `/${key}`}
                    className="text-sm text-navy-muted hover:text-navy-text transition-colors duration-200"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest text-accent uppercase mb-5 font-medium">
              {t("contact_label")}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${t("email")}`}
                className="text-sm text-navy-muted hover:text-navy-text transition-colors duration-200"
              >
                {t("email")}
              </a>
              <p className="text-sm text-navy-muted">{t("location")}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-navy-border font-medium">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="text-xs text-navy-border">PT Global Dataverse Indonesia</p>
        </div>
      </div>
    </footer>
  );
}

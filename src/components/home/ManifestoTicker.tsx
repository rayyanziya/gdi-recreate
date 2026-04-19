import { useTranslations } from "next-intl";

export function ManifestoTicker() {
  const t = useTranslations("manifesto");
  const text = t("text");
  const repeated = Array(6).fill(text).join("  ·  ");

  return (
    <div className="border-y border-navy-border bg-navy-surface overflow-hidden py-4">
      <div className="flex animate-ticker whitespace-nowrap">
        <span className="text-xs tracking-widest text-navy-muted pr-8 font-medium">
          {repeated}
        </span>
        <span className="text-xs tracking-widest text-navy-muted pr-8 font-medium" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  );
}

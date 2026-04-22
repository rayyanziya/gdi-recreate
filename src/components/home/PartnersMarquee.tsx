import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const row1 = [
  { src: "/logos/frappe.png",    alt: "Frappe" },
  { src: "/logos/erpnext.jpg",   alt: "ERPNext" },
  { src: "/logos/aws.png",       alt: "AWS" },
  { src: "/logos/azure.png",     alt: "Azure" },
  { src: "/logos/anthropic.svg", alt: "Anthropic" },
  { src: "/logos/openai.png",    alt: "OpenAI" },
  { src: "/logos/crisp.png",     alt: "Crisp" },
  { src: "/logos/telkom.webp",   alt: "Telkom" },
  { src: "/logos/huawei.png",    alt: "Huawei" },
  { src: "/logos/ailo.png",      alt: "AILO" },
  { src: "/logos/ruijie.png",    alt: "Ruijie" },
];

const row2 = [
  { src: "/logos/sonicwall.png",  alt: "SonicWall" },
  { src: "/logos/sangfor.png",    alt: "Sangfor" },
  { src: "/logos/omada.jpg",      alt: "Omada" },
  { src: "/logos/tp-link.png",    alt: "TP-Link" },
  { src: "/logos/rainer.jpg",     alt: "Rainer" },
  { src: "/logos/komdigi.png",    alt: "Komdigi" },
  { src: "/logos/jsc.png",        alt: "JSC" },
  { src: "/logos/pnj.png",        alt: "PNJ" },
  { src: "/logos/mulawarman.png", alt: "Mulawarman" },
  { src: "/logos/iain-kediri.png",alt: "IAIN Kediri" },
];

function MarqueeRow({
  logos,
  direction,
}: {
  logos: typeof row1;
  direction: "left" | "right";
}) {
  const doubled = [...logos, ...logos];
  return (
    <div className="overflow-hidden py-4">
      <div
        className={
          direction === "left"
            ? "flex animate-marquee-left"
            : "flex animate-marquee-right"
        }
      >
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center mx-8 shrink-0 h-10 w-28 opacity-35 hover:opacity-75 transition-opacity duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={112}
              height={40}
              className="max-h-9 max-w-[7rem] w-auto h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnersMarquee() {
  const t = useTranslations("partners");

  return (
    <section className="py-20 lg:py-28 border-b border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
        <ScrollReveal>
          <p className="text-xs tracking-widest text-accent uppercase font-medium">
            {t("label")}
          </p>
        </ScrollReveal>
      </div>
      <MarqueeRow logos={row1} direction="left" />
      <MarqueeRow logos={row2} direction="right" />
    </section>
  );
}

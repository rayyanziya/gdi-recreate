import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LenisProvider } from "@/providers/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CrispProvider } from "@/providers/CrispProvider";
import "../globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PT Global Dataverse Indonesia — Systems. Execution.",
  description:
    "GDI is an AI-first systems integrator delivering end-to-end digitalization for organizations across Indonesia.",
  icons: { icon: "/logo.png" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sora.variable} ${jakarta.variable}`}>
      <body className="bg-base text-primary font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CrispProvider />
            <ChatWidget />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

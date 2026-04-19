"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/* Pages whose hero section is dark navy — navbar starts transparent */
const DARK_HERO_PAGES = ["/", "/services"];

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);
  const isLight = scrolled || !hasDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight
          ? "bg-base/95 backdrop-blur-md border-b border-border shadow-sm shadow-border/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="GDI"
            width={32}
            height={32}
            className={`w-8 h-8 object-contain transition-all duration-300 ${
              !isLight ? "brightness-0 invert" : ""
            }`}
          />
          <span
            className={`text-xs tracking-wider font-medium hidden sm:block transition-colors duration-300 ${
              isLight ? "text-muted" : "text-white/60"
            }`}
          >
            Dataverse Indonesia
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isLight
                  ? pathname === href
                    ? "text-primary"
                    : "text-muted hover:text-primary"
                  : pathname === href
                  ? "text-white"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-px w-5 transition-all duration-300 ${
                  isLight ? "bg-primary" : "bg-white"
                } ${
                  menuOpen && i === 0
                    ? "rotate-45 translate-y-1.5"
                    : menuOpen && i === 1
                    ? "opacity-0"
                    : menuOpen && i === 2
                    ? "-rotate-45 -translate-y-1.5"
                    : ""
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-72 border-b border-border" : "max-h-0"
        } bg-base/98 backdrop-blur-md`}
      >
        <div className="flex flex-col px-6 py-5 gap-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                pathname === href ? "text-accent" : "text-muted hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Moon, Sun, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/context";
import { useDarkMode } from "@/lib/darkmode";

const languages = [
  { code: "en" as const, label: "English", native: "English" },
  { code: "ar" as const, label: "Arabic", native: "العربية" },
  { code: "ur" as const, label: "Urdu", native: "اردو" },
];

const langFontMap: Record<string, string> = {
  en: "'Playfair Display', serif",
  ar: "'Scheherazade New', serif",
  ur: "'Noto Nastaliq Urdu', serif",
};

const navLinks = [
  { href: "/", en: "Home", ar: "الرئيسية", ur: "ہوم" },
  { href: "/join", en: "Join Us", ar: "انضم إلينا", ur: "ہمیں شامل ہوں" },
  { href: "/about", en: "About Us", ar: "من نحن", ur: "ہمارے بارے میں" },
  { href: "/dalail", en: "Dalail", ar: "الدلائل", ur: "دلائل" },
];

export default function Navbar() {
  const { language, setLanguage, langLabel, dir } = useLanguage();
  const { dark, toggle } = useDarkMode();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 h-16 border-b border-border backdrop-blur-md transition-colors"
      style={{ backgroundColor: dark ? "rgba(26,26,26,0.85)" : "rgba(253,252,248,0.85)" }}
      dir={dir}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Difaa-e-Deoband"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span
            className="text-lg font-semibold text-text-primary dark:text-dark-text"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Difaa-e-Deoband
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-text-secondary hover:text-primary dark:text-dark-text-secondary dark:hover:text-dark-primary transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {link[language]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <div className="relative md:hidden" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-2 hover:bg-surface dark:hover:bg-dark-surface transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? (
                <X size={22} className="text-text-primary dark:text-dark-text" />
              ) : (
                <Menu size={22} className="text-text-primary dark:text-dark-text" />
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-white py-2 shadow-lg dark:border-dark-border dark:bg-dark-surface">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface dark:text-dark-text dark:hover:bg-dark-surface transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {link[language]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggle}
            className="rounded-full p-2 hover:bg-surface dark:hover:bg-dark-surface transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <Sun size={20} className="text-dark-text" />
            ) : (
              <Moon size={20} className="text-text-secondary" />
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-full p-2 hover:bg-surface dark:hover:bg-dark-surface transition-colors"
              aria-label="Change language"
            >
              <Globe size={20} className="text-text-secondary dark:text-dark-text-secondary" />
              <span className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">
                {langLabel}
              </span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-md border border-border bg-white py-1 shadow-lg dark:border-dark-border dark:bg-dark-surface">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-surface dark:hover:bg-dark-surface ${
                      language === lang.code
                        ? "font-semibold text-primary dark:text-dark-primary"
                        : "text-text-primary dark:text-dark-text"
                    }`}
                    dir={lang.code === "en" ? "ltr" : "rtl"}
                  >
                    <span style={{ fontFamily: langFontMap[lang.code] }}>
                      {lang.native}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

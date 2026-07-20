"use client";

import React from "react";
import { useLanguage } from "@/lib/context";
import { useDarkMode } from "@/lib/darkmode";

export default function Footer() {
  const { language, dir, fontFamily } = useLanguage();
  const { dark } = useDarkMode();

  const descriptions: Record<string, string> = {
    en: "A community dedicated to Ahl al-Sunnah wa al-Jama'ah — following the path of the Sahabah and the scholars of Deoband.",
    ar: "مجتمع مكرّس لأهل السنة والجماعة — على طريق الصحابة وعلماء ديوبند.",
    ur: "اهل سنت و جماعت کے ساتھ وقف محفوظ — صحابہ کرام اور علماء دیوبند کی راہ پر۔",
  };

  return (
    <footer
      className={`border-t py-10 px-6 transition-colors ${
        dark
          ? "border-dark-border bg-dark-surface"
          : "border-border bg-secondary"
      }`}
      dir={dir}
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <p
          className="text-sm text-text-secondary dark:text-dark-text-secondary"
          style={{ fontFamily }}
        >
          © {new Date().getFullYear()} Difaa-e-Deoband. {descriptions[language]}
        </p>
      </div>
    </footer>
  );
}

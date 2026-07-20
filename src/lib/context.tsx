"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type Language = "en" | "ar" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
  fontFamily: string;
  langLabel: string;
}

const fontFamilyMap: Record<Language, string> = {
  en: "'Playfair Display', serif",
  ar: "'Scheherazade New', serif",
  ur: "'Noto Nastaliq Urdu', serif",
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  dir: "ltr",
  fontFamily: fontFamilyMap.en,
  langLabel: "English",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("difaa-language");
    if (saved && ["en", "ar", "ur"].includes(saved)) {
      setLanguageState(saved as Language);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("difaa-language", lang);
  }, []);

  const dir = language === "en" ? "ltr" : "rtl";
  const fontFamily = fontFamilyMap[language];
  const langLabel =
    language === "en" ? "English" : language === "ar" ? "العربية" : "اردو";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, fontFamily, langLabel }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

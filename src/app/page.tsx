"use client";

import React from "react";
import { BookOpen, Shield, Users } from "lucide-react";
import { useLanguage } from "@/lib/context";
import { useDarkMode } from "@/lib/darkmode";
import DiscordButton from "@/components/DiscordButton";
import IslamicPattern from "@/components/IslamicPattern";

const heroContent: Record<string, { title: string; tagline: string; description: string }> = {
  en: {
    title: "Difaa-e-Deoband",
    tagline: "دفاع of truth",
    description:
      "A community dedicated to Ahl al-Sunnah wa al-Jama'ah — following the path of the Sahabah and the scholars of Deoband. Defending the truth with authentic knowledge.",
  },
  ar: {
    title: "دفاع ديوﺑﻨﺪ",
    tagline: "دفاع عن الحق",
    description:
      "مجتمع مكرّس لأهل السنة والجماعة — على طريق الصحابة وعلماء ديوبند. الدفاع عن الحق بالعلم الأصيل.",
  },
  ur: {
    title: "دفاع دیوبند",
    tagline: "حق کی دفاع",
    description:
      "اهل سنت و جماعت کے لیے وقف محفوظ — صحابہ کرام اور علماء دیوبند کی راہ پر۔ مستند علم کے ساتھ حق کی دفاع۔",
  },
};

const cardsContent: Record<
  string,
  { icon: React.ReactNode; title: string; description: string }[]
> = {
  en: [
    {
      icon: <Shield size={28} className="text-primary" />,
      title: "Authentic Creed",
      description:
        "Rooted in the pure monotheism of Ahl al-Sunnah wa al-Jama'ah, preserved by the great scholars of the Deobandi tradition.",
    },
    {
      icon: <BookOpen size={28} className="text-primary" />,
      title: "Sacred Knowledge",
      description:
        "Access evidentiary records (Dalail) spanning Aqeedah, Fiqh, and History — sourced from classical Islamic scholarship.",
    },
    {
      icon: <Users size={28} className="text-primary" />,
      title: "Growing Community",
      description:
        "Join a global network of Muslims committed to learning, sharing, and defending the authentic teachings of Islam.",
    },
  ],
  ar: [
    {
      icon: <Shield size={28} className="text-primary" />,
      title: "عقيدة أصيلة",
      description:
        "مبنية على التوحيد الخالص لأهل السنة والجماعة، حفظها علماء التقليد الديوبندي العظماء.",
    },
    {
      icon: <BookOpen size={28} className="text-primary" />,
      title: "علم مقدس",
      description:
        "الوصول إلى سجلات الأدلة (الدلائل) التي تشمل العقيدة والفقه والتاريخ — مستمدة من العلم الإسلامي الكلاسيكي.",
    },
    {
      icon: <Users size={28} className="text-primary" />,
      title: "مجتمع متنامي",
      description:
        "انضم إلى شبكة عالمية من المسلمين الملتزمين بتعلم ومشاركة والدفاع عن التعاليم الإسلامية الأصيلة.",
    },
  ],
  ur: [
    {
      icon: <Shield size={28} className="text-primary" />,
      title: "مستند عقیدہ",
      description:
        "اهل سنت و جماعت کے خالص توحید پر مبنی — علماء دیوبند کی عظیم شان حفاظت میں۔",
    },
    {
      icon: <BookOpen size={28} className="text-primary" />,
      title: "مقدس علم",
      description:
        "عقیدہ، فقه و تاریخ پر مشتمل دلائل تک رسائی — کلاسیکی اسلامی علم سے ماخوذ۔",
    },
    {
      icon: <Users size={28} className="text-primary" />,
      title: "بڑھتا ہوا معاشرہ",
      description:
        "مسلمانوں کے عالمی نیٹ ورک میں شامل ہوں جو اسلام کی مستند تعلیمات کے научی اور دفاع کے لیے پرعزم ہیں۔",
    },
  ],
};

export default function HomePage() {
  const { language, dir, fontFamily } = useLanguage();
  const { dark } = useDarkMode();
  const hero = heroContent[language] || heroContent.en;
  const cards = cardsContent[language] || cardsContent.en;

  return (
    <div dir={dir}>
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden px-6 py-24 text-center transition-colors md:px-10 ${
          dark ? "bg-dark-background" : "bg-secondary"
        }`}
        style={{ paddingBlock: "96px", paddingInline: "40px" }}
      >
        <div className="absolute inset-0 text-tertiary" style={{ opacity: dark ? 0.06 : 0.12 }}>
          <IslamicPattern />
        </div>
        <div className="relative mx-auto max-w-[800px]">
          <h1
            className="text-4xl font-bold leading-tight tracking-tight text-text-primary dark:text-dark-text md:text-5xl"
            style={{ fontFamily }}
          >
            {hero.title}
          </h1>
          <p className="mt-4 text-lg text-tertiary md:text-xl" style={{ fontFamily }}>
            {hero.tagline}
          </p>
          <p
            className="mt-6 text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary md:text-lg"
            style={{ fontFamily }}
          >
            {hero.description}
          </p>
          <div className="mt-10">
            <DiscordButton />
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section
        className={`px-6 py-20 transition-colors md:px-10 ${
          dark ? "bg-dark-background" : "bg-background"
        }`}
      >
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`rounded-lg p-10 transition-shadow ${
                dark
                  ? "border border-dark-border bg-dark-surface"
                  : "bg-surface shadow-md"
              }`}
              style={{
                boxShadow: dark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className="mb-4">{card.icon}</div>
              <h3
                className="text-xl font-semibold text-text-primary dark:text-dark-text"
                style={{ fontFamily }}
              >
                {card.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary"
                style={{ fontFamily }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

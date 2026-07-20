"use client";

import React from "react";
import { useLanguage } from "@/lib/context";
import { useDarkMode } from "@/lib/darkmode";
import IslamicPattern from "@/components/IslamicPattern";
import DiscordButton from "@/components/DiscordButton";

const aboutContent: Record<
  string,
  {
    greeting: string;
    hadith1: { speaker: string; text: string };
    hadith2: { speaker: string; text: string };
    hadith3: { speaker: string; text: string };
    intro: string;
    hadith4: { speaker: string; text: string };
    question: string;
    answer: string;
    serverTitle: string;
    serverDesc: string;
    serverGoal: string;
    values: { icon: string; text: string }[];
    cta: string;
  }
> = {
  en: {
    greeting: "السلام عليكم ورحمة الله وبركاته",
    hadith1: {
      speaker: "Rasulullah ﷺ said:",
      text: "The best of people are my generation, then those who come after them, then those who come after them.",
    },
    hadith2: {
      speaker: "And he ﷺ said:",
      text: "Do not insult my companions… If one of you were to spend gold equal to Mount Uhud, it would not equal even a handful of what they spent.",
    },
    hadith3: {
      speaker: "And he ﷺ said:",
      text: "Allah does not take away knowledge by removing it from people, but He takes it away by taking the scholars…",
    },
    intro:
      "This server has been established upon the truth upheld by the scholars of Deoband, in following the Companions and those who followed them. This is the true path.",
    hadith4: {
      speaker: "The Prophet ﷺ said:",
      text: "My Ummah will split into 73 sects… all will be in the Fire except one.",
    },
    question: "They asked: Who are they?",
    answer: 'He said: "That which I and my companions are upon."',
    serverTitle: "Difaa\u2019 e Deoband | Islamic Knowledge Server",
    serverDesc: "A community dedicated to Ahl al-Sunnah wa al-Jama\u2019ah\nFollowing the path of the Sahabah and the scholars of Deoband",
    serverGoal: "Join us and grow in knowledge",
    values: [
      { icon: "\uD83D\uDCDA", text: "Authentic knowledge" },
      { icon: "\uD83E\uDD1D", text: "Respectful discussions" },
      { icon: "\uD83D\uDEE1\uFE0F", text: "دفاع of truth" },
    ],
    cta: "Join Us",
  },
  ar: {
    greeting: "السلام عليكم ورحمة الله وبركاته",
    hadith1: {
      speaker: "قال رسول الله ﷺ:",
      text: "خَيْرُكُمْ قَرْنِي، ثُمَّ الَّذِينَ يَلُونَهُمْ، ثُمَّ الَّذِينَ يَلُونَهُمْ",
    },
    hadith2: {
      speaker: "قال رسول الله ﷺ:",
      text: "لاَ تَسُبُّوا أَصْحَابِي فَوَالَّذِي نَفْسِي بِيَدِهِ لَوْ أَنَّ أَحَدَكُمْ أَنْفَقَ مِثْلَ أُحُدٍ ذَهَبًا مَا أَدْرَكَ مُدَّ أَحَدِهِمْ وَلاَ نَصِيفَهُ",
    },
    hadith3: {
      speaker: "وقال ﷺ:",
      text: "إِنَّ اللَّهَ لاَ يَقْبِضُ الْعِلْمَ انْتِزَاعًا يَنْتَزِعُهُ مِنَ النَّاسِ وَلَكِنْ يَقْبِضُ الْعِلْمَ بِقَبْضِ الْعُلَمَاءِ حَتَّى إِذَا لَمْ يَتْرُكْ عَالِمًا اتَّخَذَ النَّاسُ رُءُوسًا جُهَّالاً فَسُئِلُوا فَأَفْتَوْا بِغَيْرِ عِلْمٍ فَضَلُّوا وَأَضَلُّوا",
    },
    intro:
      "تم إنشاء هذا الخادم بناءً على الحقيقة التي أثبتها شيوخنا في ديوبند في اتباع الصحابة ومن جاء بعدهم واتبعهم. وهذا هو ملة الحق.",
    hadith4: {
      speaker: "قال رسولنا حبيب الله ﷺ:",
      text: "يَأْتِيَنَّ عَلَى أُمَّتِي مَا أَتَى عَلَى بَنِي إِسْرَائِيلَ حَذْوَ النَّعْلِ بِالنَّعْلِ حَتَّى إِنَّ كَانَ مِنْهُمْ مَنْ أَتَى أُمَّهُ عَلَانِيَةً لَكَانَ فِي أُمَّتِي مَنْ يَصْنَعُ ذَلِكَ وَإِنَّ بَنِي إِسْرَائِيلَ تَفَرَّقَتْ عَلَى ثِنْتَيْنِ وَسَبْعِينَ مِلَّةً وَتَفْتَرِقُ أُمَّتِي عَلَى ثَلَاثٍ وَسَبْعِينَ مِلَّةً كُلُّهُمْ فِي النَّارِ إِلَّا مِلَّةً وَاحِدَةً",
    },
    question: "قالوا: ومن هي يا رسول الله؟",
    answer: 'قال: "ما أنا عليه وأصحابي."',
    serverTitle: "دفاع ديوﺑﻨﺪ | خادم المعرفة الإسلامية",
    serverDesc: "مجتمع مكرّس لأهل السنة والجماعة\nعلى طريق الصحابة وعلماء ديوبند",
    serverGoal: "انضم إلينا وازدد علماً",
    values: [
      { icon: "\uD83D\uDCDA", text: "علم أصيل" },
      { icon: "\uD83E\uDD1D", text: "مناقشات مهذبة" },
      { icon: "\uD83D\uDEE1\uFE0F", text: "دفاع عن الحق" },
    ],
    cta: "انضم إلينا",
  },
  ur: {
    greeting: "السلام عليكم ورحمة الله وبركاته",
    hadith1: {
      speaker: "رسول اللہ ﷺ نے فرمایا:",
      text: "لوگوں میں سب اچھے میری قوم ہیں، پھر جو ان کے بعد آئیں گی، پھر جو ان کے بعد آئیں گی۔",
    },
    hadith2: {
      speaker: "اور آپ ﷺ نے فرمایا:",
      text: "میرے صحابہ کرام کو بد نام مت کرو… اگر تم میں سے کوئی اُہد پر برابر سونا خرچ کرے تو وہ بھی ان کے ایک مٹھی کے برابر نہیں ہوگا۔",
    },
    hadith3: {
      speaker: "اور آپ ﷺ نے فرمایا:",
      text: "اللہ علم کو لوگوں سے نہیں ہٹاتا، بلکہ علماء کو اٹھا کر علم لے جاتا ہے…",
    },
    intro:
      "یہ سرور علماء دیوبند کے حق پر قائم کیا گیا ہے، صحابہ کرام اور ان کے پیروکاروں کی پیروی میں۔ یہی سچا راستہ ہے۔",
    hadith4: {
      speaker: "نبی ﷺ نے فرمایا:",
      text: "میری امت تین ستر (73) فرقوں میں division ہوگی… سب آگ میں ہوں گی سوائے ایک کے۔",
    },
    question: "انہوں نے پوچھا: وہ کون ہیں؟",
    answer: 'فرمایا: "میں اور میرے صحابہ جس پر ہیں۔"',
    serverTitle: "دفاع دیوبند | اسلامی علم سرور",
    serverDesc: "اهل سنت و جماعت کے لیے وقف محفوظ\nصحابہ کرام اور علماء دیوبند کی راہ پر",
    serverGoal: "ہمیں شامل ہوں اور علم میں بڑھو",
    values: [
      { icon: "\uD83D\uDCDA", text: "مستند علم" },
      { icon: "\uD83E\uDD1D", text: "مؤدّب گفتگو" },
      { icon: "\uD83D\uDEE1\uFE0F", text: "حق کی دفاع" },
    ],
    cta: "ہمیں شامل ہوں",
  },
};

export default function AboutPage() {
  const { language, dir, fontFamily } = useLanguage();
  const { dark } = useDarkMode();
  const c = aboutContent[language] || aboutContent.en;

  return (
    <div dir={dir}>
      {/* Hero with greeting */}
      <section
        className={`relative overflow-hidden px-6 py-24 text-center transition-colors ${
          dark ? "bg-dark-background" : "bg-secondary"
        }`}
      >
        <div className="absolute inset-0 text-tertiary" style={{ opacity: dark ? 0.06 : 0.12 }}>
          <IslamicPattern />
        </div>
        <div className="relative mx-auto max-w-[800px]">
          <p
            className="text-3xl font-bold text-primary dark:text-dark-primary md:text-4xl"
            style={{ fontFamily: language === "ar" ? "'Scheherazade New', serif" : language === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif" }}
          >
            {c.greeting}
          </p>
        </div>
      </section>

      {/* Hadiths */}
      <section
        className={`px-6 py-16 transition-colors ${
          dark ? "bg-dark-background" : "bg-background"
        }`}
      >
        <div className="mx-auto max-w-[800px] space-y-10">
          {[c.hadith1, c.hadith2, c.hadith3].map((h, i) => (
            <div
              key={i}
              className={`rounded-lg p-8 ${
                dark
                  ? "border border-dark-border bg-dark-surface"
                  : "bg-surface shadow-sm"
              }`}
            >
              <p
                className="mb-2 text-sm font-semibold text-primary dark:text-dark-primary"
                style={{ fontFamily }}
              >
                {h.speaker}
              </p>
              <p
                className="text-base leading-relaxed text-text-primary dark:text-dark-text"
                style={{ fontFamily }}
              >
                {h.text}
              </p>
            </div>
          ))}

          <p
            className="text-center text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary"
            style={{ fontFamily }}
          >
            {c.intro}
          </p>

          <div
            className={`rounded-lg p-8 ${
              dark
                ? "border border-dark-border bg-dark-surface"
                : "bg-surface shadow-sm"
            }`}
          >
            <p
              className="mb-2 text-sm font-semibold text-primary dark:text-dark-primary"
              style={{ fontFamily }}
            >
              {c.hadith4.speaker}
            </p>
            <p
              className="text-base leading-relaxed text-text-primary dark:text-dark-text"
              style={{ fontFamily }}
            >
              {c.hadith4.text}
            </p>
            <p
              className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary"
              style={{ fontFamily }}
            >
              {c.question}
            </p>
            <p
              className="mt-1 text-base font-semibold text-text-primary dark:text-dark-text"
              style={{ fontFamily }}
            >
              {c.answer}
            </p>
          </div>
        </div>
      </section>

      {/* Server Info */}
      <section
        className={`px-6 py-16 transition-colors ${
          dark ? "bg-dark-background" : "bg-secondary"
        }`}
      >
        <div className="mx-auto max-w-[800px] text-center">
          <h2
            className="text-2xl font-bold text-text-primary dark:text-dark-text md:text-3xl"
            style={{ fontFamily }}
          >
            {c.serverTitle}
          </h2>
          <p
            className="mt-4 whitespace-pre-line text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary"
            style={{ fontFamily }}
          >
            {c.serverDesc}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {c.values.map((v, i) => (
              <span
                key={i}
                className="text-base text-text-primary dark:text-dark-text"
                style={{ fontFamily }}
              >
                {v.icon} {v.text}
              </span>
            ))}
          </div>

          <p
            className="mt-8 text-lg font-semibold text-tertiary"
            style={{ fontFamily }}
          >
            {c.serverGoal}
          </p>

          <div className="mt-6 flex justify-center">
            <DiscordButton />
          </div>
        </div>
      </section>
    </div>
  );
}

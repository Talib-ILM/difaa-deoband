"use client";

import React from "react";
import { useLanguage } from "@/lib/context";
import { useDarkMode } from "@/lib/darkmode";
import DiscordButton from "@/components/DiscordButton";
import IslamicPattern from "@/components/IslamicPattern";

const joinContent: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    features: { title: string; text: string }[];
  }
> = {
  en: {
    title: "Join Our Community",
    subtitle: "Become part of something greater",
    description:
      "Difaa-e-Deoband is a global community of Muslims united by the love of authentic Islamic knowledge. Whether you are seeking to learn, share, or defend the truth — there is a place for you here.",
    features: [
      { title: "Live Discussions", text: "Engage in real-time conversations about Islamic topics with scholars and students of knowledge." },
      { title: "Knowledge Sharing", text: "Access exclusive resources, notes, and evidentiary records from our community's research." },
      { title: "Mentorship", text: "Connect with experienced community members who can guide you on your learning journey." },
    ],
  },
  ar: {
    title: "انضم إلى مجتمعنا",
    subtitle: "كن جزءاً من شيء أعظم",
    description:
      "دفاع ديوبند مجتمع عالمي من المسلمين متحدون بحب العلم الإسلامي الأصيل. سواء كنت تسعى للتعلم أو المشاركة أو الدفاع عن الحق — هناك مكان لك هنا.",
    features: [
      { title: "مناقشات مباشرة", text: "شارك في محادثات في الوقت الحقيقي حول المواضيع الإسلامية مع العلماء وطلاب العلم." },
      { title: "مشاركة المعرفة", text: "الوصول إلى موارد حصرية وملاحظات وسجلات أدلة من أبحاث مجتمعنا." },
      { title: "الإرشاد", text: "تواصل مع أعضاء المجتمع ذوي الخبرة الذين يمكنهم إرشادك في رحلة تعلمك." },
    ],
  },
  ur: {
    title: "ہماری کمیونٹی میں شامل ہوں",
    subtitle: "کچھ بڑا بنیں",
    description:
      "دفاع دیوبند مسلمانوں کا ایک عالمی معاشرہ ہے جو مستند اسلامی علم کی محبت میں متحد ہے۔ چاہے آپ سیکھنے، شیئرنگ یا حق کی دفاع کے لیے کوشش کر رہے ہوں — یہاں آپ کے لیے جگہ ہے۔",
    features: [
      { title: "براہ رہ گفتگو", text: "علماء اور علم کے طلباء کے ساتھ اسلامی موضوعات پر ریئل ٹائم گفتگو میں حصہ لیں۔" },
      { title: "علم کی شیئرنگ", text: "ہمارے معاشرے کی تحقیق سے خصوصی وسائل، نوٹس اور دلائل تک رسائی۔" },
      { title: "راہنمائی", text: "تجربہ کار معاشرے کے افراد سے رابطہ کریں جو آپ کی سیکھنے کے سفر میں رہنمائی کر سکتے ہیں۔" },
    ],
  },
};

export default function JoinPage() {
  const { language, dir, fontFamily } = useLanguage();
  const { dark } = useDarkMode();
  const content = joinContent[language] || joinContent.en;

  return (
    <div dir={dir}>
      {/* Hero */}
      <section
        className={`relative overflow-hidden px-6 py-24 text-center transition-colors ${
          dark ? "bg-dark-background" : "bg-secondary"
        }`}
      >
        <div className="absolute inset-0 text-tertiary" style={{ opacity: dark ? 0.06 : 0.12 }}>
          <IslamicPattern />
        </div>
        <div className="relative mx-auto max-w-[800px]">
          <h1
            className="text-4xl font-bold text-text-primary dark:text-dark-text md:text-5xl"
            style={{ fontFamily }}
          >
            {content.title}
          </h1>
          <p className="mt-4 text-lg text-tertiary" style={{ fontFamily }}>
            {content.subtitle}
          </p>
          <p
            className="mt-6 text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary md:text-lg"
            style={{ fontFamily }}
          >
            {content.description}
          </p>
          <div className="mt-10">
            <DiscordButton />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className={`px-6 py-20 transition-colors ${
          dark ? "bg-dark-background" : "bg-background"
        }`}
      >
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-3">
          {content.features.map((feature, i) => (
            <div
              key={i}
              className={`rounded-lg p-10 ${
                dark
                  ? "border border-dark-border bg-dark-surface"
                  : "bg-surface shadow-md"
              }`}
            >
              <h3
                className="text-xl font-semibold text-text-primary dark:text-dark-text"
                style={{ fontFamily }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary"
                style={{ fontFamily }}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

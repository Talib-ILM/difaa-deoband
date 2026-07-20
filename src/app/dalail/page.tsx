"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, BookOpen, X } from "lucide-react";
import { useLanguage } from "@/lib/context";
import { useDarkMode } from "@/lib/darkmode";

interface DalailRecord {
  id: string;
  title: string;
  category: string;
  content_english: string;
  content_urdu: string;
  content_arabic: string;
}

const CATEGORIES = ["All", "Aqeedah", "Fiqh", "History", "Hadith", "Tafseer"];

const categoryLabels: Record<string, Record<string, string>> = {
  en: { All: "All", Aqeedah: "Aqeedah", Fiqh: "Fiqh", History: "History", Hadith: "Hadith", Tafseer: "Tafseer" },
  ar: { All: "الكل", Aqeedah: "العقيدة", Fiqh: "الفقه", History: "التاريخ", Hadith: "الحديث", Tafseer: "التفسير" },
  ur: { All: "سب", Aqeedah: "عقیدہ", Fiqh: "فقہ", History: "تاریخ", Hadith: "حدیث", Tafseer: "تفسیر" },
};

const emptyStateText: Record<string, string> = {
  en: "No records found",
  ar: "لم يتم العثور على سجلات",
  ur: "کوئی ریکارڈ نہیں ملا",
};

const searchPlaceholder: Record<string, string> = {
  en: "Search dalail...",
  ar: "ابحث في الدلائل...",
  ur: "دلائل تلاش کریں...",
};

export default function DalailPage() {
  const { language, dir, fontFamily } = useLanguage();
  const { dark } = useDarkMode();

  const [records, setRecords] = useState<DalailRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<DalailRecord | null>(null);

  const fetchRecords = useCallback(async (query: string, category: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category !== "All") params.set("category", category);

      const res = await fetch(`/api/dalail?${params.toString()}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.details || err.error || "Failed to fetch");
      }
      const data = await res.json();
      setRecords(data.records || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load records");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecords(search, activeCategory);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, activeCategory, fetchRecords]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedRecord(null);
    };
    if (selectedRecord) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedRecord]);

  const labels = categoryLabels[language] || categoryLabels.en;

  const getContentPreview = (record: DalailRecord): string => {
    if (language === "ar" && record.content_arabic) return record.content_arabic;
    if (language === "ur" && record.content_urdu) return record.content_urdu;
    return record.content_english || "";
  };

  const isRtl = language === "ar" || language === "ur";

  return (
    <div dir={dir}>
      <section
        className={`px-6 py-16 transition-colors ${
          dark ? "bg-dark-background" : "bg-secondary"
        }`}
      >
        <div className="mx-auto max-w-[1200px] text-center">
          <h1
            className="text-4xl font-bold text-text-primary dark:text-dark-text"
            style={{ fontFamily }}
          >
            {language === "en" ? "Dalail Database" : language === "ar" ? "قاعدة بيانات الدلائل" : "دلائل ڈیٹابیس"}
          </h1>
          <p
            className="mt-4 text-base text-text-secondary dark:text-dark-text-secondary"
            style={{ fontFamily }}
          >
            {language === "en"
              ? "Browse evidentiary records across Islamic scholarship"
              : language === "ar"
                ? "تصفح سجلات الأدلة في العلم الإسلامي"
                : "اسلامی علم میں دلائل کے ریکارڈز دیکھیں"}
          </p>
        </div>
      </section>

      <section
        className={`px-6 py-12 transition-colors ${
          dark ? "bg-dark-background" : "bg-background"
        }`}
      >
        <div className="mx-auto max-w-[1200px]">
          {/* Search Bar */}
          <div className="relative mx-auto mb-8 max-w-xl">
            <Search
              size={18}
              className="absolute start-4 top-1/2 -translate-y-1/2 text-neutral"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder[language] || searchPlaceholder.en}
              className={`w-full rounded-full py-3 ps-11 pe-6 text-sm transition-colors ${
                dark
                  ? "border border-dark-border bg-dark-surface text-dark-text"
                  : "border border-border bg-white text-text-primary"
              }`}
              style={{ fontFamily }}
            />
          </div>

          {/* Category Filter Tags */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : dark
                      ? "border border-dark-border bg-dark-surface text-dark-text-secondary hover:border-dark-primary hover:text-dark-primary"
                      : "border border-border bg-surface text-primary hover:border-primary"
                }`}
                style={{ fontFamily }}
              >
                {labels[cat] || cat}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-8 ${
                    dark
                      ? "border border-dark-border bg-dark-surface"
                      : "bg-surface"
                  }`}
                >
                  <div className={`mb-4 h-6 w-3/4 rounded ${dark ? "bg-dark-border" : "bg-border"} skeleton-pulse`} />
                  <div className={`mb-3 h-4 w-1/3 rounded ${dark ? "bg-dark-border" : "bg-border"} skeleton-pulse`} />
                  <div className={`h-16 w-full rounded ${dark ? "bg-dark-border" : "bg-border"} skeleton-pulse`} />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="text-center py-16">
              <BookOpen size={48} className="mx-auto mb-4 text-neutral opacity-40" />
              <p
                className="text-base text-text-secondary dark:text-dark-text-secondary"
                style={{ fontFamily }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && records.length === 0 && (
            <div className="text-center py-16">
              <BookOpen size={48} className="mx-auto mb-4 text-neutral opacity-40" />
              <p
                className="text-base text-text-secondary dark:text-dark-text-secondary"
                style={{ fontFamily }}
              >
                {emptyStateText[language] || emptyStateText.en}
              </p>
            </div>
          )}

          {/* Records Grid */}
          {!loading && !error && records.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {records.map((record) => (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className={`cursor-pointer rounded-lg p-8 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                    dark
                      ? "border border-dark-border bg-dark-surface"
                      : "bg-surface"
                  }`}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <h3
                    className="text-lg font-semibold text-text-primary dark:text-dark-text"
                    style={{ fontFamily }}
                  >
                    {record.title}
                  </h3>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      dark
                        ? "bg-dark-border text-dark-primary"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {labels[record.category] || record.category}
                  </span>
                  <div
                    className="mt-4 overflow-hidden text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary"
                    dir={isRtl ? "rtl" : "ltr"}
                    style={{
                      fontFamily,
                      maxHeight: "120px",
                      maskImage: "linear-gradient(to bottom, black 60%, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent)",
                    }}
                    dangerouslySetInnerHTML={{ __html: getContentPreview(record) }}
                  />
                  {getContentPreview(record) && (
                    <p
                      className={`mt-3 text-xs font-semibold ${
                        dark ? "text-dark-primary" : "text-primary"
                      }`}
                      style={{ fontFamily }}
                    >
                      {language === "en" ? "Read dalail →" : language === "ar" ? "اقرأ الدليل ←" : "دلائل پڑھیں ←"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dalail Modal */}
      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className={`relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8 ${
              dark
                ? "border border-dark-border bg-dark-surface"
                : "bg-white"
            }`}
            dir={isRtl ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedRecord(null)}
              className={`absolute end-4 top-4 rounded-full p-2 transition-colors ${
                dark
                  ? "hover:bg-dark-border text-dark-text-secondary"
                  : "hover:bg-neutral/10 text-text-secondary"
              }`}
            >
              <X size={20} />
            </button>

            <h2
              className={`text-2xl font-bold ${dark ? "text-dark-text" : "text-text-primary"}`}
              style={{ fontFamily }}
            >
              {selectedRecord.title}
            </h2>
            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                dark
                  ? "bg-dark-border text-dark-primary"
                  : "bg-primary/10 text-primary"
              }`}
              style={{ fontFamily }}
            >
              {labels[selectedRecord.category] || selectedRecord.category}
            </span>

            <div className="mt-6 space-y-4">
              {selectedRecord.content_english && (
                <div
                  dir="ltr"
                  className={`rounded-lg p-4 text-sm leading-relaxed ${
                    dark
                      ? "bg-dark-background text-dark-text-secondary"
                      : "bg-secondary text-text-secondary"
                  }`}
                  style={{ fontFamily }}
                >
                  <p className={`mb-2 text-xs font-bold uppercase tracking-wide ${dark ? "text-dark-primary" : "text-primary"}`}>
                    English
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: selectedRecord.content_english }} />
                </div>
              )}
              {selectedRecord.content_arabic && (
                <div
                  dir="rtl"
                  className={`rounded-lg p-4 text-sm leading-relaxed ${
                    dark
                      ? "bg-dark-background text-dark-text-secondary"
                      : "bg-secondary text-text-secondary"
                  }`}
                  style={{ fontFamily: "'Scheherazade New', serif" }}
                >
                  <p className={`mb-2 text-xs font-bold uppercase tracking-wide text-left ${dark ? "text-dark-primary" : "text-primary"}`}>
                    العربية
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: selectedRecord.content_arabic }} />
                </div>
              )}
              {selectedRecord.content_urdu && (
                <div
                  dir="rtl"
                  className={`rounded-lg p-4 text-sm leading-relaxed ${
                    dark
                      ? "bg-dark-background text-dark-text-secondary"
                      : "bg-secondary text-text-secondary"
                  }`}
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                >
                  <p className={`mb-2 text-xs font-bold uppercase tracking-wide text-left ${dark ? "text-dark-primary" : "text-primary"}`}>
                    اردو
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: selectedRecord.content_urdu }} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import { LanguageProvider } from "@/lib/context";
import { DarkModeProvider } from "@/lib/darkmode";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </LanguageProvider>
    </DarkModeProvider>
  );
}

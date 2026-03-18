"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export default function ToolTabs({ locale }: Props) {
  const t = getMessages(locale);
  const [activeTab, setActiveTab] = useState("image");

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={() => scrollToSection("image")}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === "image" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
      >
        {t.nav.imageTools}
      </button>
      <button
        onClick={() => scrollToSection("pdf")}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === "pdf" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
      >
        {t.nav.pdfTools}
      </button>
    </div>
  );
}

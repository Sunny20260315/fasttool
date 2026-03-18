"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

const STORAGE_KEY = "cookie-consent-v1";

export function CookieConsentBanner({ locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const handleDecision = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[340px] rounded-2xl border border-gray-200 bg-gray-100 p-4 shadow-soft">
      <p className="text-sm leading-6 text-gray-700">
        {locale === "zh"
          ? "本网站使用 Cookie 提升体验和展示广告。了解更多请阅读隐私政策。"
          : "This website uses cookies to improve experience and serve ads. Learn more in our privacy policy."}{" "}
        <Link href={`/${locale}/privacy`} className="font-medium text-indigo-600 hover:text-indigo-700">
          {locale === "zh" ? "查看隐私政策" : "Read policy"}
        </Link>
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleDecision("accepted")}
          className="rounded-lg bg-[#5e69f1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f5be6]"
        >
          {locale === "zh" ? "接受" : "Accept"}
        </button>
        <button
          type="button"
          onClick={() => handleDecision("rejected")}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
        >
          {locale === "zh" ? "拒绝" : "Reject"}
        </button>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type ConsentType = {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
};

const STORAGE_KEY = "cookie-consent-v2";

export function CookieConsentBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentType>({
    essential: true,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setConsent(parsed);
      } catch {
        setVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent = {
      essential: true,
      analytics: true,
      advertising: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    setVisible(false);
    // Reload to apply changes
    window.location.reload();
  };

  const handleRejectAll = () => {
    const newConsent = {
      essential: true,
      analytics: false,
      advertising: false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    setVisible(false);
    window.location.reload();
  };

  const handleSavePreferences = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
    window.location.reload();
  };

  const toggleConsent = (key: keyof ConsentType) => {
    if (key === "essential") return; // Cannot toggle essential
    setConsent((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-gray-900">
          {locale === "zh" ? "Cookie 设置" : "Cookie Settings"}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          {locale === "zh"
            ? "我们使用 Cookie 来增强您的浏览体验、提供个性化广告或内容，并分析我们的流量。点击\"全部接受\"即表示您同意我们使用 Cookie。"
            : "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies."}{" "}
          <Link
            href={`/${locale}/privacy`}
            className="text-indigo-600 hover:text-indigo-700 underline"
          >
            {locale === "zh" ? "隐私政策" : "Privacy Policy"}
          </Link>
        </p>

        {showDetails && (
          <div className="mt-4 space-y-3 rounded-lg bg-gray-50 p-4">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {locale === "zh" ? "必要 Cookie" : "Essential Cookies"}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === "zh"
                    ? "这些 Cookie 对网站正常运行至关重要，无法禁用。"
                    : "These cookies are essential for the website to function and cannot be disabled."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={consent.essential}
                disabled
                className="h-5 w-5 rounded border-gray-300 text-indigo-600"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {locale === "zh" ? "分析 Cookie" : "Analytics Cookies"}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === "zh"
                    ? "帮助我们了解访客如何与网站互动，发现错误。"
                    : "Help us understand how visitors interact with our website and identify errors."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={() => toggleConsent("analytics")}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600"
              />
            </div>

            {/* Advertising Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {locale === "zh" ? "广告 Cookie" : "Advertising Cookies"}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === "zh"
                    ? "用于展示相关广告和衡量广告效果。"
                    : "Used to deliver relevant advertisements and measure their effectiveness."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={consent.advertising}
                onChange={() => toggleConsent("advertising")}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600"
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={handleAcceptAll}
            className="rounded-lg bg-[#5e69f1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f5be6]"
          >
            {locale === "zh" ? "全部接受" : "Accept All"}
          </button>
          <button
            onClick={handleRejectAll}
            className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            {locale === "zh" ? "全部拒绝" : "Reject All"}
          </button>
          <button
            onClick={() =>
              showDetails ? handleSavePreferences() : setShowDetails(true)
            }
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            {showDetails
              ? locale === "zh"
                ? "保存偏好"
                : "Save Preferences"
              : locale === "zh"
              ? "自定义"
              : "Customize"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to check if analytics is enabled
export function isAnalyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;
  try {
    const parsed = JSON.parse(saved);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

// Helper function to check if advertising is enabled
export function isAdvertisingEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;
  try {
    const parsed = JSON.parse(saved);
    return parsed.advertising === true;
  } catch {
    return false;
  }
}

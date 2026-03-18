"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { getToolsByCategory } from "@/lib/tools";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AdPlaceholder } from "@/components/AdPlaceholder";

type Props = {
  locale: Locale;
};

const iconBgClasses = [
  "from-violet-500 to-violet-600",
  "from-fuchsia-500 to-pink-600",
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-red-500",
];

export function Header({ locale }: Props) {
  const t = getMessages(locale);
  const pathname = usePathname() || `/${locale}`;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === `/${locale}`;
  const isImageTools = pathname.startsWith(`/${locale}/tools`) && !pathname.includes("pdf");
  const isPdfTools = pathname.startsWith(`/${locale}/tools`) && pathname.includes("pdf");
  const isFaq = pathname.startsWith(`/${locale}/faq`);
  const isContact = pathname.startsWith(`/${locale}/contact`);
  const imageTools = getToolsByCategory("image");
  const pdfTools = getToolsByCategory("pdf");

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-3"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white shadow-[0_6px_18px_rgba(99,102,241,0.28)]">
              FT
            </span>
            <span className="text-[1.2rem] font-semibold tracking-tight text-gray-900">
              {t.site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-semibold md:flex">
            <Link
              href={`/${locale}`}
              className={`font-medium transition-colors ${
                isHome
                  ? "text-[#5e69f1]"
                  : "text-muted-foreground hover:text-[#5e69f1]"
              }`}
            >
              {t.nav.home}
            </Link>
            <div className="group relative">
              <Link
                href={`/${locale}/tools/image`}
                className={`inline-flex items-center gap-1 font-medium transition-colors ${
                  isImageTools
                    ? "text-[#5e69f1]"
                    : "text-muted-foreground hover:text-[#5e69f1]"
                }`}
              >
                {t.nav.imageTools}
                <ChevronDown className="h-4 w-4" />
              </Link>
              <div className="invisible absolute left-0 top-full z-40 mt-3 w-[400px] rounded-2xl border border-gray-200 bg-white p-3 opacity-0 shadow-soft transition-all group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-2">
                  {imageTools.map((tool, index) => {
                    const Icon = tool.icon;
                    const iconBgClass = iconBgClasses[index % iconBgClasses.length];
                    return (
                      <Link
                        key={tool.slug}
                        href={`/${locale}/tools/${tool.slug}`}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#5e69f1]"
                      >
                        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-white ${iconBgClass}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        {tool.title[locale]}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="group relative">
              <Link
                href={`/${locale}/tools/pdf`}
                className={`inline-flex items-center gap-1 font-medium transition-colors ${
                  isPdfTools
                    ? "text-[#5e69f1]"
                    : "text-muted-foreground hover:text-[#5e69f1]"
                }`}
              >
                {t.nav.pdfTools}
                <ChevronDown className="h-4 w-4" />
              </Link>
              <div className="invisible absolute left-0 top-full z-40 mt-3 w-72 rounded-2xl border border-gray-200 bg-white p-3 opacity-0 shadow-soft transition-all group-hover:visible group-hover:opacity-100">
                {pdfTools.map((tool, index) => {
                  const Icon = tool.icon;
                  const iconBgClass = iconBgClasses[index % iconBgClasses.length];
                  return (
                    <Link
                      key={tool.slug}
                      href={`/${locale}/tools/${tool.slug}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#5e69f1]"
                    >
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-white ${iconBgClass}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      {tool.title[locale]}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link
              href={`/${locale}/faq`}
              className={`font-medium transition-colors ${
                isFaq
                  ? "text-[#5e69f1]"
                  : "text-muted-foreground hover:text-[#5e69f1]"
              }`}
            >
              {t.nav.faq}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={`font-medium transition-colors ${
                isContact
                  ? "text-[#5e69f1]"
                  : "text-muted-foreground hover:text-[#5e69f1]"
              }`}
            >
              {t.nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-4 justify-self-end">
            {/* 语言切换器 - 始终显示 */}
            <LanguageSwitcher locale={locale} />
            
            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
          
          {/* 移动端侧边菜单 */}
          <div
            className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* 遮罩层 */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* 菜单内容 */}
            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-gray-900">{t.site.name}</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-700" />
                </button>
              </div>
              
              <nav className="space-y-6">
                <Link
                  href={`/${locale}`}
                  className={`block font-medium transition-colors ${isHome ? "text-[#5e69f1]" : "text-muted-foreground hover:text-[#5e69f1]"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.home}
                </Link>
                
                {/* 图片工具 */}
                <div className="space-y-2">
                  <Link
                    href={`/${locale}/tools/image`}
                    className={`block font-medium transition-colors ${isImageTools ? "text-[#5e69f1]" : "text-muted-foreground hover:text-[#5e69f1]"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.imageTools}
                  </Link>
                  <div className="pl-4 space-y-1">
                    {imageTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${locale}/tools/${tool.slug}`}
                        className="block text-sm text-gray-700 hover:text-[#5e69f1] py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tool.title[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* PDF工具 */}
                <div className="space-y-2">
                  <Link
                    href={`/${locale}/tools/pdf`}
                    className={`block font-medium transition-colors ${isPdfTools ? "text-[#5e69f1]" : "text-muted-foreground hover:text-[#5e69f1]"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.pdfTools}
                  </Link>
                  <div className="pl-4 space-y-1">
                    {pdfTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${locale}/tools/${tool.slug}`}
                        className="block text-sm text-gray-700 hover:text-[#5e69f1] py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tool.title[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link
                  href={`/${locale}/faq`}
                  className={`block font-medium transition-colors ${isFaq ? "text-[#5e69f1]" : "text-muted-foreground hover:text-[#5e69f1]"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.faq}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className={`block font-medium transition-colors ${isContact ? "text-[#5e69f1]" : "text-muted-foreground hover:text-[#5e69f1]"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.contact}
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Google AdSense - Below Navigation */}
      <div className="mx-auto flex justify-center bg-gray-50">
        <AdPlaceholder />
      </div>
    </>
  );
}

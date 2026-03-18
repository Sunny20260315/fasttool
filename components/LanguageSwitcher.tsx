"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

function getPathWithLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${locale}`;
  segments[0] = locale;
  return `/${segments.join("/")}`;
}

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const targetLocale: Locale = locale === "en" ? "zh" : "en";
  const href = getPathWithLocale(pathname, targetLocale);

  return (
    <Link
      href={href}
      className="flex items-center gap-1 rounded-full px-2.5 py-1 bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
    >
      <Globe className="h-4 w-4 text-gray-500" />
      <span className="text-sm font-semibold">{locale.toUpperCase()}</span>
    </Link>
  );
}

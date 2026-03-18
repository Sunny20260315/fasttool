"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import type { Locale } from "@/lib/i18n";
import { tools } from "@/lib/tools";
import type { ToolItem } from "@/lib/tools";
import RevealOnScrollWrapper from "@/components/RevealOnScrollWrapper";

type Props = {
  locale: Locale;
  limit?: number;
  category?: ToolItem["category"];
};

const iconBgClasses = [
  "from-violet-500 to-violet-600 shadow-[0_10px_24px_rgba(124,58,237,0.28)]",
  "from-fuchsia-500 to-pink-600 shadow-[0_10px_24px_rgba(217,70,239,0.28)]",
  "from-blue-500 to-blue-600 shadow-[0_10px_24px_rgba(59,130,246,0.28)]",
  "from-emerald-500 to-teal-500 shadow-[0_10px_24px_rgba(16,185,129,0.28)]",
  "from-amber-500 to-orange-500 shadow-[0_10px_24px_rgba(245,158,11,0.28)]",
  "from-rose-500 to-red-500 shadow-[0_10px_24px_rgba(244,63,94,0.28)]",
];

export function ToolsGrid({ locale, limit, category }: Props) {
  const filtered = category ? tools.filter((item) => item.category === category) : tools;
  const list = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((tool, index) => {
        const Icon = tool.icon;
        const iconBgClass = iconBgClasses[index % iconBgClasses.length];
        const delayMs = Math.min(index * 90, 520);
        return (
          <Suspense key={tool.slug} fallback={null}>
            <RevealOnScrollWrapper delayMs={delayMs}>
              <Link
                href={`/${locale}/tools/${tool.slug}`}
                className="group block h-full"
              >
                <div className="lift-hover h-full rounded-2xl border border-gray-200 bg-white p-6">
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white transition-transform duration-300 ease-out group-hover:scale-110 ${iconBgClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-foreground font-semibold leading-tight tracking-tight text-gray-900 transition-transform duration-300 ease-out group-hover:scale-105">
                      {tool.title[locale]}
                    </h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-gray-700" />
                  </div>

                  <p className="text-sm leading-7 text-gray-500">
                    {tool.description[locale]}
                  </p>
                </div>
              </Link>
            </RevealOnScrollWrapper>
          </Suspense>
        );
      })}
    </div>
  );
}

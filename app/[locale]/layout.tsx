import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getMessages, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const t = getMessages(params.locale);
  return {
    title: t.site.title,
    description: t.site.description
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <Suspense fallback={null}>
        <Header locale={params.locale} />
      </Suspense>
      <div className="flex-1">{children}</div>
      <Suspense fallback={null}>
        <Footer locale={params.locale} />
      </Suspense>
    </div>
  );
}

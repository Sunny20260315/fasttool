import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolsGrid } from "@/components/ToolsGrid";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片工具 - FastTool" : "Image Tools - FastTool",
    description:
      params.locale === "zh" ? "浏览全部图片工具。" : "Browse all image processing tools."
  };
}

export default function ImageToolsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">
        {params.locale === "zh" ? "图片工具" : "Image Tools"}
      </h1>
      <ToolsGrid locale={params.locale} category="image" />
    </main>
  );
}

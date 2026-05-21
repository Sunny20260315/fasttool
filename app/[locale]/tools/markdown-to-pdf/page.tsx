import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownToPdfTool } from "@/components/tools/MarkdownToPdfTool";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "Markdown转PDF - FastTool" : "Markdown to PDF - FastTool",
    description:
      params.locale === "zh" ? "将Markdown文件转换为PDF格式。" : "Convert Markdown files to PDF format."
  };
}

export default function MarkdownToPdfPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">
        {params.locale === "zh" ? "Markdown转PDF" : "Markdown to PDF"}
      </h1>

      <MarkdownToPdfTool locale={params.locale} />
    </main>
  );
}
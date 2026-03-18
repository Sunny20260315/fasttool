import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolsGrid } from "@/components/ToolsGrid";
import { getMessages, isLocale } from "@/lib/i18n";
import ToolTabs from "@/components/ToolTabs";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "所有工具 - FastTool" : "All Tools - FastTool",
    description:
      params.locale === "zh"
        ? "浏览全部在线图片工具：压缩、转换、裁剪、调整尺寸与 AI 生图。"
        : "Browse all online image tools for compression, conversion, resize, crop and AI generation."
  };
}

export default function AllToolsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getMessages(params.locale);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          {params.locale === "zh" ? "所有工具" : "All Tools"}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
          {params.locale === "zh"
            ? "从完整工具集合中选择你需要的图片处理能力。"
            : "Choose from our complete suite of image processing tools."}
        </p>

        {/* 按钮切换组 */}
        <ToolTabs locale={params.locale} />
      </header>

      <section id="image" aria-label={t.nav.imageTools} className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t.nav.imageTools}</h2>
        <ToolsGrid locale={params.locale} category="image" />
      </section>

      <section id="pdf" aria-label={t.nav.pdfTools} className="scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t.nav.pdfTools}</h2>
        <ToolsGrid locale={params.locale} category="pdf" />
      </section>
    </main>
  );
}

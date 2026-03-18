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
    title: params.locale === "zh" ? "PDF转换 - FastTool" : "PDF Convert - FastTool",
    description:
      params.locale === "zh" ? "浏览全部 PDF 转换工具。" : "Browse all PDF conversion tools."
  };
}

export default function PdfToolsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">
        {params.locale === "zh" ? "PDF转换" : "PDF Convert"}
      </h1>

      <ToolsGrid locale={params.locale} category="pdf" />

      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="text-lg font-medium text-gray-600">
          {params.locale === "zh" ? "未完待续" : "More features coming soon..."}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {params.locale === "zh" ? "更多PDF转换工具正在开发中，敬请期待" : "More PDF conversion tools are under development, stay tuned"}
        </p>
      </div>
    </main>
  );
}

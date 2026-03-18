import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderTool } from "@/components/tools/PlaceholderTool";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "CAD转PDF - 免费在线工具" : "CAD to PDF Converter | Online Free CAD Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 CAD 图纸文件转换为 PDF，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert CAD drawings to PDF online with browser-side processing for speed and privacy."
  };
}

export default function CadToPdfPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return (
    <PlaceholderTool
      locale={params.locale}
      title={params.locale === "zh" ? "CAD转PDF" : "CAD to PDF"}
      description={params.locale === "zh" ? "将 CAD 图纸文件转换为 PDF。" : "Convert CAD drawings to PDF."}
    />
  );
}

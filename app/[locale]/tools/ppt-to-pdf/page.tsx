import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const GenericPdfConverterTool = dynamic(() => import("@/components/tools/GenericPdfConverterTool").then((module) => ({ default: module.GenericPdfConverterTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "PPT转PDF - 免费在线工具" : "PPT to PDF Converter | Online Free PPT Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 PPT 幻灯片转换为 PDF，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert PPT slides to PDF online with browser-side processing for privacy."
  };
}


export default function PptToPdfPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "PPT转PDF" : "PPT to PDF"}
      description={
        params.locale === "zh"
          ? "将 PPT 幻灯片转换为 PDF。"
          : "Convert PPT slides to PDF."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术进行 PPT 到 PDF 的转换，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to convert PPT to PDF without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 PPT 文件", "点击开始转换", "下载转换后的 PDF 文件"]
          : ["Upload PPT files", "Click convert", "Download converted PDF files"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些PPT格式？" : "Which PPT formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持 .pptx 和 .ppt 格式的 PPT 文件。" 
              : ".pptx and .ppt PPT file formats are supported."
        },
        {
          question: params.locale === "zh" ? "转换后的PDF质量如何？" : "What is the quality of the converted PDF?",
          answer: params.locale === "zh" ? "转换后的 PDF 文件会保持原始 PPT 幻灯片的格式和布局。" : "The converted PDF file will preserve the format and layout of the original PPT slides."
        }
      ]}
    >
      <GenericPdfConverterTool 
        locale={params.locale} 
        targetFormat="pdf" 
        mimeType="application/pdf" 
        description={params.locale === "zh" ? "将 PPT 幻灯片转换为 PDF 文件" : "Convert PPT slides to PDF files"}
      />
    </ToolLayout>);
}
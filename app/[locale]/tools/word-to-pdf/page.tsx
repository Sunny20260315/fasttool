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
    title: params.locale === "zh" ? "Word转PDF - 免费在线工具" : "Word to PDF Converter | Online Free Word Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 Word 文档转换为 PDF，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert Word documents to PDF online with browser-side processing for privacy."
  };
}


export default function WordToPdfPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "Word转PDF" : "Word to PDF"}
      description={
        params.locale === "zh"
          ? "将 Word 文档转换为 PDF。"
          : "Convert Word documents to PDF."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术进行 Word 到 PDF 的转换，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to convert Word to PDF without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 Word 文件", "点击开始转换", "下载转换后的 PDF 文件"]
          : ["Upload Word files", "Click convert", "Download converted PDF files"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些Word格式？" : "Which Word formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持 .docx 和 .doc 格式的 Word 文档。" 
              : ".docx and .doc Word document formats are supported."
        },
        {
          question: params.locale === "zh" ? "转换后的PDF质量如何？" : "What is the quality of the converted PDF?",
          answer: params.locale === "zh" ? "转换后的 PDF 文件会保持原始 Word 文档的格式和布局。" : "The converted PDF file will preserve the format and layout of the original Word document."
        }
      ]}
    >
      <GenericPdfConverterTool 
        locale={params.locale} 
        targetFormat="pdf" 
        mimeType="application/pdf" 
        description={params.locale === "zh" ? "将 Word 文档转换为 PDF 文件" : "Convert Word documents to PDF files"}
      />
    </ToolLayout>);
}
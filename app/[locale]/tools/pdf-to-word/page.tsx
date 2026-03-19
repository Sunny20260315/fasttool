import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const PdfToWordTool = dynamic(() => import("@/components/tools/PdfToWordTool").then((module) => ({ default: module.PdfToWordTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "PDF转Word - 免费在线工具" : "PDF to Word Converter | Online Free PDF Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 PDF 转换为可编辑 Word 文档，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert PDF to editable Word documents online with browser-side processing for privacy."
  };
}


export default function PdfToWordPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "PDF转Word" : "PDF to Word"}
      description={
        params.locale === "zh"
          ? "将 PDF 转换为可编辑 Word 文档。"
          : "Convert PDF into editable Word files."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术进行 PDF 到 Word 的转换，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to convert PDF to Word without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 PDF 文件", "点击开始转换", "下载转换后的 Word 文档"]
          : ["Upload PDF files", "Click convert", "Download converted Word documents"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "转换后的Word文档质量如何？" : "What is the quality of the converted Word document?",
          answer:
            params.locale === "zh"
              ? "转换后的 Word 文档会尽可能保持原始 PDF 的格式和布局，但复杂格式可能需要手动调整。" 
              : "The converted Word document will try to preserve the original PDF's format and layout, but complex formats may require manual adjustments."
        },
        {
          question: params.locale === "zh" ? "支持哪些文件格式？" : "Which file formats are supported?",
          answer: params.locale === "zh" ? "仅支持 PDF 格式文件。" : "Only PDF format files are supported."
        }
      ]}
    >
      <PdfToWordTool locale={params.locale} />
    </ToolLayout>);
}
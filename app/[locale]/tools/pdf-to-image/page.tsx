import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PdfToImageTool } from "@/components/tools/PdfToImageTool";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "PDF转图片 - 免费在线工具" : "PDF to Image Converter | Online Free PDF Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 PDF 转换为图片，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert PDF to images online with browser-side processing for privacy."
  };
}

export default function PdfToImagePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "PDF转图片" : "PDF to Image"}
      description={
        params.locale === "zh"
          ? "将 PDF 页面导出为图片。"
          : "Export PDF pages as images."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术进行 PDF 到图片的转换，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to convert PDF to images without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 PDF 文件", "选择输出格式和质量", "点击开始转换", "下载转换后的图片"]
          : ["Upload PDF files", "Select output format and quality", "Click convert", "Download converted images"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些输出格式？" : "Which output formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持 PNG、JPG 和 WEBP 格式。" 
              : "PNG, JPG, and WEBP formats are supported."
        },
        {
          question: params.locale === "zh" ? "PDF的每一页都会转换吗？" : "Will every page of the PDF be converted?",
          answer: params.locale === "zh" ? "是的，PDF的每一页都会转换为一张独立的图片。" : "Yes, each page of the PDF will be converted to a separate image."
        }
      ]}
    >
      <PdfToImageTool locale={params.locale} />
    </ToolLayout>
  );
}

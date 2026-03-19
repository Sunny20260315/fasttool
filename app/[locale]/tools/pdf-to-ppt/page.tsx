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
    title: params.locale === "zh" ? "PDF转PPT - 免费在线工具" : "PDF to PPT Converter | Online Free PDF Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 PDF 转换为演示文稿，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert PDF to presentation online with browser-side processing for privacy."
  };
}


export default function PdfToPptPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "PDF转PPT" : "PDF to PPT"}
      description={
        params.locale === "zh"
          ? "将 PDF 转换为演示文稿。"
          : "Convert PDF into presentation."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术进行 PDF 到 PPT 的转换，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to convert PDF to PPT without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 PDF 文件", "点击开始转换", "下载转换后的 PPT 文件"]
          : ["Upload PDF files", "Click convert", "Download converted PPT files"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "转换后的PPT质量如何？" : "What is the quality of the converted PPT?",
          answer:
            params.locale === "zh"
              ? "转换后的 PPT 文件会尽可能保持原始 PDF 的格式和布局，但复杂格式可能需要手动调整。" 
              : "The converted PPT file will try to preserve the original PDF's format and layout, but complex formats may require manual adjustments."
        },
        {
          question: params.locale === "zh" ? "支持哪些文件格式？" : "Which file formats are supported?",
          answer: params.locale === "zh" ? "仅支持 PDF 格式文件。" : "Only PDF format files are supported."
        }
      ]}
    >
      <GenericPdfConverterTool 
        locale={params.locale} 
        targetFormat="pptx" 
        mimeType="application/vnd.openxmlformats-officedocument.presentationml.presentation" 
        description={params.locale === "zh" ? "将 PDF 文件转换为可编辑的 PPT 演示文稿" : "Convert PDF files to editable PPT presentations"}
      />
    </ToolLayout>);
}
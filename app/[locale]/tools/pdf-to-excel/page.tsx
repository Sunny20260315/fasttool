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
    title: params.locale === "zh" ? "PDF转Excel - 免费在线工具" : "PDF to Excel Converter | Online Free PDF Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 PDF 转换为 Excel 表格，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert PDF to Excel online with browser-side processing for privacy."
  };
}


export default function PdfToExcelPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "PDF转Excel" : "PDF to Excel"}
      description={
        params.locale === "zh"
          ? "将表格提取到 Excel。"
          : "Extract tables to Excel."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术进行 PDF 到 Excel 的转换，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to convert PDF to Excel without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 PDF 文件", "点击开始转换", "下载转换后的 Excel 文件"]
          : ["Upload PDF files", "Click convert", "Download converted Excel files"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "转换后的Excel质量如何？" : "What is the quality of the converted Excel?",
          answer:
            params.locale === "zh"
              ? "转换后的 Excel 文件会尽可能提取原始 PDF 中的表格数据，但复杂表格可能需要手动调整。" 
              : "The converted Excel file will try to extract table data from the original PDF, but complex tables may require manual adjustments."
        },
        {
          question: params.locale === "zh" ? "支持哪些文件格式？" : "Which file formats are supported?",
          answer: params.locale === "zh" ? "仅支持 PDF 格式文件。" : "Only PDF format files are supported."
        }
      ]}
    >
      <GenericPdfConverterTool 
        locale={params.locale} 
        targetFormat="xlsx" 
        mimeType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
        description={params.locale === "zh" ? "将 PDF 文件中的表格提取到可编辑的 Excel 文件" : "Extract tables from PDF files to editable Excel files"}
      />
    </ToolLayout>
  );
}
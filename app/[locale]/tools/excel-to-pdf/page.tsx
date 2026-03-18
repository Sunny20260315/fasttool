import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GenericPdfConverterTool } from "@/components/tools/GenericPdfConverterTool";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "Excel转PDF - 免费在线工具" : "Excel to PDF Converter | Online Free Excel Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 Excel 表格转换为 PDF，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert Excel spreadsheets to PDF online with browser-side processing for privacy."
  };
}

export default function ExcelToPdfPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "Excel转PDF" : "Excel to PDF"}
      description={
        params.locale === "zh"
          ? "将 Excel 表格转换为 PDF。"
          : "Convert Excel spreadsheets to PDF."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术进行 Excel 到 PDF 的转换，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to convert Excel to PDF without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 Excel 文件", "点击开始转换", "下载转换后的 PDF 文件"]
          : ["Upload Excel files", "Click convert", "Download converted PDF files"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些Excel格式？" : "Which Excel formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持 .xlsx 和 .xls 格式的 Excel 文件。" 
              : ".xlsx and .xls Excel file formats are supported."
        },
        {
          question: params.locale === "zh" ? "转换后的PDF质量如何？" : "What is the quality of the converted PDF?",
          answer: params.locale === "zh" ? "转换后的 PDF 文件会保持原始 Excel 表格的格式和布局。" : "The converted PDF file will preserve the format and layout of the original Excel spreadsheet."
        }
      ]}
    >
      <GenericPdfConverterTool 
        locale={params.locale} 
        targetFormat="pdf" 
        mimeType="application/pdf" 
        description={params.locale === "zh" ? "将 Excel 表格转换为 PDF 文件" : "Convert Excel spreadsheets to PDF files"}
      />
    </ToolLayout>
  );
}

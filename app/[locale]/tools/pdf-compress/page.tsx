import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PdfCompressTool } from "@/components/tools/PdfCompressTool";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "PDF压缩 - 免费在线工具" : "PDF Compressor | Online Free PDF Compression Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线压缩 PDF 文件体积，支持浏览器本地处理，保护隐私并快速下载。"
        : "Compress PDF files online with browser-side processing for speed and privacy."
  };
}

export default function PdfCompressPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "PDF压缩" : "PDF Compress"}
      description={
        params.locale === "zh"
          ? "在线压缩 PDF 文件体积。"
          : "Compress PDF files online."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术进行 PDF 压缩，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to compress PDF files without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 PDF 文件", "选择压缩级别", "点击开始压缩", "下载压缩后的文件"]
          : ["Upload PDF files", "Select compression level", "Click compress", "Download compressed files"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "压缩后的文件质量如何？" : "What is the quality of the compressed file?",
          answer:
            params.locale === "zh"
              ? "压缩后的文件质量取决于选择的压缩级别，高级压缩会减小文件体积但可能影响质量。" 
              : "The quality of the compressed file depends on the selected compression level. Higher compression reduces file size but may affect quality."
        },
        {
          question: params.locale === "zh" ? "支持哪些文件格式？" : "Which file formats are supported?",
          answer: params.locale === "zh" ? "仅支持 PDF 格式文件。" : "Only PDF format files are supported."
        }
      ]}
    >
      <PdfCompressTool locale={params.locale} />
    </ToolLayout>
  );
}

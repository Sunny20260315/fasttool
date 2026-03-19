import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const Base64ToImageTool = dynamic(() => import("@/components/tools/Base64ToImageTool").then((module) => ({ default: module.Base64ToImageTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "Base64 转图片 - 免费在线工具" : "Base64 to Image Converter | Online Free Base64 Decoding Tool - FastTool",
    description:
      params.locale === "zh"
        ? "将 Base64 编码文本转换为图片文件，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert Base64 encoded text into image files with browser-side processing for speed and privacy."
  };
}


export default function Base64ToImagePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "Base64 转图片" : "Base64 to Image"}
      description={
        params.locale === "zh"
          ? "将 Base64 编码还原为图片文件，支持 Data URL 格式，完全在浏览器端处理。"
          : "Decode Base64 encoded text into image files, supports Data URL format, fully processed in browser."
      }
      introduction={
        params.locale === "zh"
          ? "该工具支持将 Base64 编码文本（包括 data:image/png;base64 格式）转换为可下载的图片文件，所有处理在浏览器本地完成，无需上传到服务器，保护您的数据安全。"
          : "This tool converts Base64 encoded text (including data:image/png;base64 format) into downloadable image files. All processing is done locally in your browser without uploading to servers, protecting your data security."
      }
      howToSteps={
        params.locale === "zh"
          ? ["在文本框中粘贴 Base64 编码", "点击'转换为图片'按钮", "预览转换结果并下载"]
          : ["Paste Base64 encoded text in the textarea", "Click 'Convert to Image' button", "Preview the result and download"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些 Base64 格式？" : "What Base64 formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持标准 Base64 编码和 Data URL 格式（如 data:image/png;base64,xxx），会自动识别 MIME 类型。"
              : "Supports standard Base64 encoding and Data URL format (e.g., data:image/png;base64,xxx), automatically detecting MIME types."
        },
        {
          question: params.locale === "zh" ? "如何从图片获取 Base64？" : "How to get Base64 from an image?",
          answer:
            params.locale === "zh"
              ? "使用下方的图片上传功能，上传图片后会自动将 Base64 编码显示在文本框中。"
              : "Use the image upload feature below. After uploading, the Base64 encoding will be displayed in the textarea automatically."
        },
        {
          question: params.locale === "zh" ? "图片会上传到服务器吗？" : "Are images uploaded to the server?",
          answer:
            params.locale === "zh"
              ? "不会。所有转换都在您的浏览器本地完成，确保数据隐私和安全。"
              : "No. All conversions are completed locally in your browser, ensuring data privacy and security."
        }
      ]}
    >
      <Base64ToImageTool locale={params.locale} />
    </ToolLayout>);
}
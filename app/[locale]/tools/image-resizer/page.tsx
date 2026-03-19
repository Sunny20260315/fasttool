import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const ImageResizerTool = dynamic(() => import("@/components/tools/ImageResizerTool").then((module) => ({ default: module.ImageResizerTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片尺寸调整 - 免费在线工具" : "Image Resizer | Online Free Image Resizing Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线调整图片尺寸，支持百分比缩放、预设尺寸和自定义尺寸，浏览器本地处理保护隐私。"
        : "Resize images online with percentage scaling, preset sizes, and custom dimensions. Browser-side processing for privacy."
  };
}


export default function ImageResizerPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片尺寸调整" : "Image Resizer"}
      description={
        params.locale === "zh"
          ? "快速调整图片尺寸，支持百分比/自定义尺寸/预设尺寸多种模式。"
          : "Quickly resize images with multiple modes: percentage, custom dimensions, or presets."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器 Canvas API 进行图片尺寸调整，无需上传到服务器即可修改图片的宽度和高度。支持保持原始宽高比、选择预设尺寸（如 Full HD、Instagram 等），并可调整输出格式和质量，适合社交媒体发布和网站优化。"
          : "This tool uses browser Canvas API to resize images without uploading to servers. Adjust width and height while maintaining aspect ratio, choose from preset sizes (Full HD, Instagram, etc.), and configure output format and quality. Perfect for social media posting and web optimization."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传图片", "选择调整模式（指定尺寸/百分比/预设）", "设置目标尺寸或缩放比例", "点击开始调整并下载"]
          : ["Upload your image", "Choose resize mode (dimensions/percentage/preset)", "Set target size or scale percentage", "Click resize and download"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "会损失画质吗？" : "Will quality be lost?",
          answer:
            params.locale === "zh"
              ? "调整尺寸本身不会显著影响画质，但改变输出格式（如 PNG 转 JPEG）可能会有轻微质量损失。你可以通过质量设置来控制输出品质。"
              : "Resizing itself won't significantly affect quality, but changing output format (e.g., PNG to JPEG) may cause slight quality loss. You can control output quality through the quality setting."
        },
        {
          question: params.locale === "zh" ? "如何保持原始宽高比？" : "How to maintain the original aspect ratio?",
          answer:
            params.locale === "zh"
              ? "勾选'保持宽高比'选项后，修改宽度或高度时会自动计算另一个值以保持比例。"
              : "Check the 'Maintain aspect ratio' option. When you modify width or height, the other value will be automatically calculated to maintain the ratio."
        },
        {
          question: params.locale === "zh" ? "支持哪些预设尺寸？" : "What preset sizes are available?",
          answer:
            params.locale === "zh"
              ? "提供常用预设：Full HD (1920x1080)、HD (1280x720)、Instagram 方形和竖版、Twitter 帖子等主流社交媒体尺寸。"
              : "Common presets are provided: Full HD (1920x1080), HD (1280x720), Instagram Square and Portrait, Twitter Post, and other popular social media sizes."
        },
        {
          question: params.locale === "zh" ? "图片会上传到服务器吗？" : "Are images uploaded to the server?",
          answer:
            params.locale === "zh"
              ? "不会。所有处理都在您的浏览器本地完成，确保数据隐私和安全。"
              : "No. All processing is completed locally in your browser, ensuring data privacy and security."
        }
      ]}
    >
      <ImageResizerTool locale={params.locale} />
    </ToolLayout>);
}
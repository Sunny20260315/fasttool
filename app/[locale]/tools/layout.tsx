import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: {
      default: params.locale === "zh" ? "图片工具" : "FastTool",
      template: "%s | FastTool"
    },
    description:
      params.locale === "zh"
        ? "在线图片工具：压缩、转换、调整尺寸等。"
        : "Online FastTool for compression, conversion and resizing."
  };
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

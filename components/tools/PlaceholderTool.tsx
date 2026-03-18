import { ToolLayout } from "@/components/ToolLayout";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  title: string;
  description: string;
};

export function PlaceholderTool({ locale, title, description }: Props) {
  return (
    <ToolLayout
      locale={locale}
      title={title}
      description={description}
      introduction={
        locale === "zh"
          ? "该工具页面已预留结构，后续可快速接入 Canvas API 的完整处理逻辑。"
          : "This tool page is scaffolded and ready for full Canvas API processing logic."
      }
      howToSteps={
        locale === "zh"
          ? ["上传图片", "配置参数", "执行处理并下载"]
          : ["Upload your image", "Adjust tool settings", "Process and download"]
      }
      faq={[
        {
          question: locale === "zh" ? "什么时候上线完整功能？" : "When will full functionality be available?",
          answer: locale === "zh" ? "该工具已完成 SEO 页面，处理功能可按优先级逐步接入。" : "The SEO-ready page is complete. Processing logic can be added iteratively."
        }
      ]}
    >
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-600">
        {locale === "zh" ? "功能占位：即将上线。" : "Feature placeholder: coming soon."}
      </div>
    </ToolLayout>
  );
}

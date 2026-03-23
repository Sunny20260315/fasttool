import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const CompressImageTool = dynamic(() => import("@/components/tools/CompressImageTool").then((module) => ({ default: module.CompressImageTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片压缩_在线免费压缩图片大小工具 - FastTool" : "Image Compressor | Online Free Image Compression Tool - FastTool",
    description:
      params.locale === "zh"
        ? "免费在线图片压缩工具，支持JPG、PNG、WebP等格式，无损压缩，快速减小文件体积，无需下载安装，保护隐私安全。"
        : "Free online image compression tool supporting JPG, PNG, WebP formats. Browser-side processing for speed and privacy. No installation required."
  };
}


export default function CompressImagePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const isZh = params.locale === "zh";

  return (
    <ToolLayout
      locale={params.locale}
      title={isZh ? "图片压缩工具" : "Image Compression Tool"}
      description={
        isZh
          ? "免费在线图片压缩工具，支持 JPG、PNG、WebP 格式。在浏览器端完成压缩，保护您的隐私，无需上传图片到服务器。"
          : "Free online image compression tool supporting JPG, PNG, and WebP formats. All processing happens in your browser for maximum privacy."
      }
      introduction={
        isZh
          ? "FastTool 图片压缩工具是一款完全免费的在线图片压缩服务。我们使用先进的浏览器端压缩技术，在不上传原图的前提下降低文件体积。所有处理都在您的设备本地完成，确保您的图片隐私安全。支持批量压缩，适合网站性能优化、社交媒体发布、电子邮件附件等多种场景。"
          : "FastTool Image Compression is a completely free online image compression service. We use advanced browser-side compression technology to reduce file size without uploading your original images. All processing is done locally on your device, ensuring your image privacy. Supports batch compression for web optimization, social media, email attachments, and more."
      }
      features={
        isZh
          ? [
              { title: "浏览器端处理", description: "所有压缩操作在本地完成，图片不会上传到任何服务器，保护您的隐私安全" },
              { title: "多格式支持", description: "支持 JPG、PNG、WebP 等主流图片格式的压缩处理" },
              { title: "智能压缩", description: "采用先进的压缩算法，在保持画质的同时最大程度减小文件体积" },
              { title: "批量处理", description: "支持同时压缩多张图片，提高工作效率" },
              { title: "质量可调", description: "提供低、中、高三个压缩等级，根据需要自由调整" },
              { title: "完全免费", description: "无需注册，无使用限制，无水印，永久免费使用" }
            ]
          : [
              { title: "Browser-Side Processing", description: "All compression happens locally - images never leave your device, ensuring complete privacy" },
              { title: "Multi-Format Support", description: "Supports compression of JPG, PNG, WebP and other popular image formats" },
              { title: "Smart Compression", description: "Uses advanced algorithms to minimize file size while maintaining image quality" },
              { title: "Batch Processing", description: "Compress multiple images simultaneously to improve efficiency" },
              { title: "Adjustable Quality", description: "Choose from low, medium, or high compression levels based on your needs" },
              { title: "Completely Free", description: "No registration, no usage limits, no watermarks - free forever" }
            ]
      }
      howToSteps={
        isZh
          ? [
              "点击上传区域或拖拽图片到页面，支持 JPG、PNG、WebP 格式",
              "根据需求选择压缩等级：低压缩（画质优先）、中压缩（平衡模式）、高压缩（体积优先）",
              "点击「开始压缩」按钮，等待浏览器完成处理",
              "预览压缩效果，对比原图和压缩后的画质与文件大小",
              "满意后点击下载，保存压缩后的图片到本地"
            ]
          : [
              "Click the upload area or drag and drop images onto the page. Supports JPG, PNG, WebP formats",
              "Select compression level: Low (quality priority), Medium (balanced), or High (size priority)",
              "Click the 'Start Compression' button and wait for the browser to process",
              "Preview the compression results, comparing original and compressed quality and file size",
              "Click download to save the compressed image to your device"
            ]
      }
      howToDetail={
        isZh
          ? "提示：压缩等级越高，文件体积越小，但画质损失也会相应增加。建议根据使用场景选择合适的等级。网页展示推荐中压缩，打印输出推荐低压缩。"
          : "Tip: Higher compression levels result in smaller file sizes but may reduce image quality. Choose based on your use case: medium for web, low for print."
      }
      useCases={
        isZh
          ? [
              { title: "网站优化", description: "压缩网站图片资源，提升页面加载速度，改善用户体验和SEO排名" },
              { title: "社交媒体", description: "将图片压缩到平台限制大小以内，确保顺利上传到微信、微博、Instagram等平台" },
              { title: "邮件附件", description: "减小图片文件体积，避免超过邮箱附件大小限制，加快发送速度" },
              { title: "移动存储", description: "压缩手机相册图片，节省存储空间，同时保留珍贵回忆" },
              { title: "电商产品图", description: "优化电商平台产品图片，加快页面加载，提升转化率" }
            ]
          : [
              { title: "Website Optimization", description: "Compress website images to improve loading speed, user experience, and SEO rankings" },
              { title: "Social Media", description: "Compress images to meet platform size limits for smooth uploading to social networks" },
              { title: "Email Attachments", description: "Reduce image file size to avoid email attachment limits and send faster" },
              { title: "Mobile Storage", description: "Compress phone gallery images to save storage space while preserving memories" },
              { title: "E-commerce", description: "Optimize product images for faster loading and better conversion rates" }
            ]
      }
      tips={
        isZh
          ? [
              "对于网页使用，建议将图片压缩到 200KB 以下，可以获得最佳加载速度",
              "PNG 格式适合包含文字或透明背景的图片，JPG 适合照片类图片",
              "如果压缩后画质不满意，可以尝试降低压缩等级重新处理",
              "批量压缩时，建议先测试单张图片效果，确认后再处理全部",
              "WebP 格式通常比 JPG 体积小 25-35%，建议优先使用"
            ]
          : [
              "For web use, compress images to under 200KB for optimal loading speed",
              "PNG is best for images with text or transparency, JPG for photographs",
              "If quality is unsatisfactory, try a lower compression level",
              "When batch processing, test with one image first before processing all",
              "WebP format is typically 25-35% smaller than JPG - use when possible"
            ]
      }
      faq={[
        {
          question: isZh ? "压缩后的图片会损失画质吗？" : "Will the compressed image lose quality?",
          answer: isZh
            ? "图片压缩本质上是有损的，会带来一定程度的画质损失。但我们的工具采用智能压缩算法，在中等压缩等级下，肉眼几乎看不出差异。您可以根据需求选择低压缩（画质优先）或高压缩（体积优先）模式。"
            : "Image compression is inherently lossy and will reduce quality to some degree. However, our tool uses smart algorithms where medium compression is virtually indistinguishable to the naked eye. Choose based on your priorities."
        },
        {
          question: isZh ? "支持哪些图片格式？" : "Which image formats are supported?",
          answer: isZh
            ? "目前支持 JPG、JPEG、PNG 和 WebP 格式的图片压缩。其中 WebP 格式的压缩效率最高，推荐在支持该格式的场景下优先使用。"
            : "We currently support JPG, JPEG, PNG, and WebP formats. WebP offers the best compression efficiency and is recommended when supported."
        },
        {
          question: isZh ? "我的图片会被上传到服务器吗？" : "Are my images uploaded to your servers?",
          answer: isZh
            ? "绝对不会。所有压缩操作都在您的浏览器本地完成，图片数据不会离开您的设备。这是本工具最大的隐私保护特性。"
            : "Absolutely not. All compression happens locally in your browser. Your images never leave your device - this is our key privacy feature."
        },
        {
          question: isZh ? "有文件大小限制吗？" : "Is there a file size limit?",
          answer: isZh
            ? "由于浏览器性能限制，建议单张图片不超过 20MB。大多数日常使用场景（如社交媒体、网页图片）都在此范围内。"
            : "Due to browser limitations, we recommend images under 20MB. This covers most daily use cases like social media and web images."
        },
        {
          question: isZh ? "压缩后的图片可以用于商业用途吗？" : "Can compressed images be used commercially?",
          answer: isZh
            ? "可以。您拥有压缩后图片的完全使用权，我们不添加任何水印，也不保留任何权利。"
            : "Yes. You have full rights to use compressed images. We don't add watermarks or retain any rights."
        }
      ]}
    >
      <CompressImageTool locale={params.locale} />
    </ToolLayout>
  );
}

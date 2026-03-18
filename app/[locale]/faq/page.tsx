import type { Metadata } from "next";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "常见问题 - FastTool" : "FAQ - FastTool",
    description:
      params.locale === "zh"
        ? "浏览常见问题解答，了解如何使用我们的图片工具和PDF转换工具。"
        : "Browse frequently asked questions about using our image tools and PDF conversion tools."
  };
}

export default function FaqPage({
  params
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const isZh = params.locale === "zh";

  const faqItems = [
    {
      question: isZh ? "图片会上传到服务器吗？" : "Are my images uploaded to your server?",
      answer: isZh 
        ? "不会。大多数处理在浏览器本地完成，无需上传到服务器，保护您的隐私。只有少数需要特殊处理的功能可能会暂时上传到服务器，但处理完成后会立即删除。" 
        : "No. Most processing is done locally in your browser, no need to upload to servers, protecting your privacy. Only a few features that require special processing may temporarily upload to servers, but they are deleted immediately after processing."
    },
    {
      question: isZh ? "支持手机端吗？" : "Can I use it on mobile?",
      answer: isZh 
        ? "支持，所有工具页面都是响应式设计，适配各种屏幕尺寸。您可以在手机、平板和电脑上使用我们的工具。" 
        : "Yes, all tool pages are responsive and designed to fit various screen sizes. You can use our tools on mobile phones, tablets, and computers."
    },
    {
      question: isZh ? "可以免费使用吗？" : "Is this free?",
      answer: isZh 
        ? "是的，核心工具完全免费使用。我们不会收取任何费用，也不会要求您注册账号。" 
        : "Yes, core tools are completely free to use. We don't charge any fees and don't require you to register an account."
    },
    {
      question: isZh ? "支持哪些图片格式？" : "What image formats are supported?",
      answer: isZh 
        ? "我们支持多种常见图片格式，包括 JPG、PNG、WebP、HEIC、TIFF、BMP 和 ICO 等。您可以使用我们的工具在这些格式之间进行转换。" 
        : "We support multiple common image formats, including JPG, PNG, WebP, HEIC, TIFF, BMP, and ICO. You can use our tools to convert between these formats."
    },
    {
      question: isZh ? "图片处理速度如何？" : "How fast is the image processing?",
      answer: isZh 
        ? "处理速度取决于图片大小和您的设备性能。由于大多数处理在本地完成，所以速度通常很快，无需等待服务器响应。" 
        : "Processing speed depends on the image size and your device performance. Since most processing is done locally, it's usually fast without waiting for server responses."
    },
    {
      question: isZh ? "压缩后的图片质量如何？" : "What about the quality of compressed images?",
      answer: isZh 
        ? "我们的压缩算法会在文件大小和图片质量之间取得平衡。您可以通过调整压缩质量参数来控制最终效果，找到最适合您需求的设置。" 
        : "Our compression algorithm balances file size and image quality. You can adjust the compression quality parameter to control the final result and find the settings that best suit your needs."
    },
    {
      question: isZh ? "支持批量处理吗？" : "Does it support batch processing?",
      answer: isZh 
        ? "是的，我们的部分工具支持批量处理，例如图片压缩工具。您可以一次上传多个图片进行处理，提高工作效率。" 
        : "Yes, some of our tools support batch processing, such as the image compression tool. You can upload multiple images at once for processing, improving work efficiency."
    },
    {
      question: isZh ? "PDF转换的质量如何？" : "What about the quality of PDF conversions?",
      answer: isZh 
        ? "我们使用专业的PDF处理库，确保转换后的文件质量尽可能接近原始文件。对于复杂的PDF文件，可能需要进行一些手动调整以获得最佳效果。" 
        : "We use professional PDF processing libraries to ensure that converted files are as close to the original as possible. For complex PDF files, some manual adjustments may be needed for optimal results."
    },
    {
      question: isZh ? "处理后的文件会保存多久？" : "How long are processed files saved?",
      answer: isZh 
        ? "处理后的文件不会保存在我们的服务器上。它们只存在于您的浏览器中，直到您下载或关闭浏览器。" 
        : "Processed files are not saved on our servers. They only exist in your browser until you download them or close your browser."
    },
    {
      question: isZh ? "如何联系我们？" : "How can I contact you?",
      answer: isZh 
        ? "如果您有任何问题或建议，可以通过网站底部的联系方式与我们联系，我们会尽快回复您。" 
        : "If you have any questions or suggestions, you can contact us through the contact information at the bottom of the website, and we will reply to you as soon as possible."
    }
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isZh ? "常见问题" : "Frequently Asked Questions"}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {isZh 
            ? "这里是一些关于我们工具的常见问题和解答。如果您有其他问题，请随时联系我们。" 
            : "Here are some common questions and answers about our tools. If you have other questions, please feel free to contact us."
          }
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl shadow-soft bg-white overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link 
          href={`/${params.locale}`} 
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          {isZh ? "返回首页" : "Back to Home"}
        </Link>
      </div>
    </main>
  );
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const PdfToWordTool = dynamic(() => import("@/components/tools/PdfToWordTool").then((module) => ({ default: module.PdfToWordTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "PDF转Word - 免费在线PDF转Word转换器 - FastTool" : "PDF to Word Converter | Free Online PDF to Docx Tool - FastTool",
    description:
      params.locale === "zh"
        ? "免费在线PDF转Word工具，无需安装软件，浏览器本地转换，保护隐私安全。支持保留原文档格式，转换后可编辑。"
        : "Free online PDF to Word converter. No software installation needed. Browser-side conversion protects your privacy. Editable output with format preservation."
  };
}


export default function PdfToWordPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const isZh = params.locale === "zh";

  return (
    <ToolLayout
      locale={params.locale}
      title={isZh ? "PDF转Word转换器" : "PDF to Word Converter"}
      description={
        isZh
          ? "免费在线将PDF转换为可编辑的Word文档。支持保留原文档格式、图片和布局，转换过程在浏览器本地完成，保护您的文件隐私。"
          : "Free online PDF to editable Word document converter. Preserves original formatting, images, and layout. All conversion happens locally in your browser for privacy."
      }
      introduction={
        isZh
          ? "FastTool PDF转Word工具是一款专业的在线文档转换服务。我们使用先进的浏览器端转换技术，将PDF文件转换为可编辑的Microsoft Word格式（.docx）。整个转换过程在您的设备本地完成，无需上传文件到服务器，确保您的文档内容安全。转换后的Word文档尽可能保留原始PDF的格式、字体、图片和布局，让您可以轻松编辑和修改内容。"
          : "FastTool PDF to Word Converter is a professional online document conversion service. We use advanced browser-side technology to convert PDF files to editable Microsoft Word format (.docx). The entire conversion process happens locally on your device without uploading files to servers, ensuring your document security. The converted Word document preserves the original PDF's formatting, fonts, images, and layout as much as possible."
      }
      features={
        isZh
          ? [
              { title: "本地转换", description: "所有转换操作在浏览器本地完成，PDF文件不会上传到任何服务器，确保文档隐私安全" },
              { title: "格式保留", description: "智能识别并保留原文档的字体、段落、图片、表格等格式元素" },
              { title: "完全可编辑", description: "转换后的Word文档可自由编辑文字、修改格式、添加内容" },
              { title: "快速处理", description: "利用浏览器本地计算能力，快速完成转换，无需等待服务器响应" },
              { title: "跨平台支持", description: "支持Windows、Mac、Linux等所有主流操作系统，无需安装软件" },
              { title: "免费使用", description: "无需注册账号，无转换次数限制，无水印，永久免费" }
            ]
          : [
              { title: "Local Conversion", description: "All conversion happens in your browser - PDFs never leave your device, ensuring document privacy" },
              { title: "Format Preservation", description: "Intelligently recognizes and preserves fonts, paragraphs, images, tables, and other formatting" },
              { title: "Fully Editable", description: "Converted Word documents can be freely edited, formatted, and modified" },
              { title: "Fast Processing", description: "Uses your browser's computing power for quick conversion without server wait times" },
              { title: "Cross-Platform", description: "Works on Windows, Mac, Linux - no software installation required" },
              { title: "Free to Use", description: "No registration, no conversion limits, no watermarks - free forever" }
            ]
      }
      howToSteps={
        isZh
          ? [
              "点击上传区域选择PDF文件，或直接将PDF文件拖拽到页面中",
              "等待文件加载完成，系统会自动分析PDF文档结构",
              "点击「开始转换」按钮，浏览器将在本地执行转换操作",
              "转换完成后，预览转换效果，检查格式是否正确保留",
              "点击下载按钮，保存转换后的Word文档（.docx格式）到本地"
            ]
          : [
              "Click the upload area to select a PDF file, or drag and drop your PDF onto the page",
              "Wait for the file to load - the system will automatically analyze the PDF structure",
              "Click the 'Start Conversion' button - your browser will perform the conversion locally",
              "After conversion, preview the results to check if formatting is preserved correctly",
              "Click download to save the converted Word document (.docx) to your device"
            ]
      }
      howToDetail={
        isZh
          ? "提示：对于包含复杂排版、特殊字体或大量图片的PDF，转换后的Word文档可能需要少量手动调整。建议在编辑前检查文档格式。"
          : "Tip: PDFs with complex layouts, special fonts, or many images may need minor manual adjustments after conversion. Review the document before editing."
      }
      useCases={
        isZh
          ? [
              { title: "文档编辑", description: "将只读的PDF转换为可编辑的Word文档，方便修改合同、报告、简历等内容" },
              { title: "内容复用", description: "提取PDF中的内容到Word，便于复制、引用或重新排版使用" },
              { title: "协作办公", description: "将PDF转为Word格式后，方便团队成员使用Office软件协作编辑" },
              { title: "格式转换", description: "将扫描版PDF或图片PDF转换为可编辑文档，实现文字识别和编辑" },
              { title: "归档整理", description: "将多个PDF文件转换为统一格式的Word文档，便于归档和管理" }
            ]
          : [
              { title: "Document Editing", description: "Convert read-only PDFs to editable Word docs for modifying contracts, reports, resumes" },
              { title: "Content Reuse", description: "Extract PDF content to Word for easy copying, quoting, or reformatting" },
              { title: "Collaborative Work", description: "Convert PDF to Word for easier team collaboration using Office software" },
              { title: "Format Conversion", description: "Convert scanned or image PDFs to editable documents with OCR capabilities" },
              { title: "Archiving", description: "Convert multiple PDFs to standardized Word format for easier archiving" }
            ]
      }
      tips={
        isZh
          ? [
              "转换前请确保PDF文件未加密，加密的PDF需要先解除密码保护",
              "扫描版PDF（图片格式）转换后可能需要手动校对文字识别结果",
              "包含复杂表格的PDF，转换后建议检查表格边框和对齐方式",
              "特殊字体可能在转换后被替换为系统默认字体，建议转换后统一调整",
              "大型PDF文件（超过50MB）转换可能需要较长时间，请耐心等待"
            ]
          : [
              "Ensure PDFs are not password-protected before conversion",
              "Scanned PDFs may need manual proofreading of OCR results",
              "Check table borders and alignment after converting PDFs with complex tables",
              "Special fonts may be replaced with system defaults - adjust after conversion",
              "Large PDFs (over 50MB) may take longer to convert - please be patient"
            ]
      }
      faq={[
        {
          question: isZh ? "PDF转Word后格式会丢失吗？" : "Will formatting be lost after conversion?",
          answer: isZh
            ? "我们的工具会尽可能保留原始PDF的格式，包括字体、段落、图片位置、表格结构等。但对于特别复杂的排版（如多栏布局、特殊字体、复杂表格），转换后可能需要少量手动调整。"
            : "Our tool preserves original PDF formatting including fonts, paragraphs, image positions, and table structures. However, very complex layouts may need minor manual adjustments."
        },
        {
          question: isZh ? "转换后的Word文档可以编辑吗？" : "Can the converted Word document be edited?",
          answer: isZh
            ? "是的，转换后的Word文档是完全可编辑的。您可以修改文字内容、调整格式、添加或删除图片，就像处理普通Word文档一样。"
            : "Yes, the converted Word document is fully editable. You can modify text, adjust formatting, add or remove images just like any regular Word document."
        },
        {
          question: isZh ? "我的PDF文件会被上传到服务器吗？" : "Are my PDF files uploaded to your servers?",
          answer: isZh
            ? "绝对不会。所有转换操作都在您的浏览器本地完成，PDF文件数据不会离开您的设备。这是本工具的核心隐私保护特性。"
            : "Absolutely not. All conversion happens locally in your browser. Your PDF data never leaves your device - this is our core privacy feature."
        },
        {
          question: isZh ? "支持扫描版PDF转换吗？" : "Do you support scanned PDF conversion?",
          answer: isZh
            ? "支持。对于扫描版PDF（图片格式），我们会使用OCR技术识别文字内容。但识别准确率取决于扫描质量，建议在转换后检查并校对文字内容。"
            : "Yes. For scanned PDFs (image format), we use OCR technology to recognize text. Recognition accuracy depends on scan quality - please review and proofread after conversion."
        },
        {
          question: isZh ? "有文件大小或页数限制吗？" : "Are there file size or page limits?",
          answer: isZh
            ? "由于浏览器性能限制，建议PDF文件不超过50MB，页数不超过100页。大多数日常办公文档都在此范围内。"
            : "Due to browser limitations, we recommend PDFs under 50MB and under 100 pages. Most daily office documents fall within this range."
        },
        {
          question: isZh ? "转换后的文档有水印吗？" : "Do converted documents have watermarks?",
          answer: isZh
            ? "没有。我们不会在转换后的文档中添加任何水印或标识。您获得的是干净的Word文档，可自由使用。"
            : "No. We don't add any watermarks or branding to converted documents. You get a clean Word document for free use."
        }
      ]}
    >
      <PdfToWordTool locale={params.locale} />
    </ToolLayout>
  );
}

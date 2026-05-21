import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const PdfToImageTool = dynamic(
  () =>
    import("@/components/tools/PdfToImageTool").then((module) => ({
      default: module.PdfToImageTool,
    })),
  {
    ssr: false,
  },
);

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title:
      params.locale === "zh"
        ? "PDF 转图片 - 免费在线工具"
        : "PDF to Image | Online Free Converter - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 PDF 转换为图片，支持多种格式和分辨率，浏览器本地处理保护隐私。"
        : "Convert PDF to images online with multiple formats and resolutions. Browser-side processing for privacy.",
  };
}

export default function PdfToImagePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const isZh = params.locale === "zh";

  // 为 PDF 转图片工具添加详细内容
  const detailedContent = isZh
    ? {
        whyChooseSection: {
          title: "为什么选择 FastTool PDF 转图片转换器？",
          content: `PDF 是优秀的文档格式，但有时我们需要提取 PDF 中的页面作为图片使用，用于演示文稿、社交媒体分享、文档插图等场景。FastTool PDF 转图片转换器采用先进的浏览器端渲染技术，为您提供安全、高质量、灵活的 PDF 转图片服务。

**核心优势**
- **本地转换架构**：基于 pdf.js 和 Canvas API，所有转换操作在浏览器中完成，无需上传到服务器
- **高质量渲染**：支持高分辨率输出，确保转换后的图片清晰度和细节
- **灵活的输出选项**：支持 PNG、JPG、WebP 多种格式，可自定义输出质量和分辨率
- **批量转换能力**：可转换整个 PDF 的所有页面，也可选择特定页面
- **隐私保护**：PDF 文件不会上传到任何服务器，确保文档内容安全

**隐私保护承诺**
我们深知 PDF 文档可能包含商业机密、个人隐私或敏感信息。FastTool 采用"零上传"架构，您的所有 PDF 从上传到转换完成，整个过程都在本地浏览器中完成：
- 您的文档不会被存储在任何云端
- 您的数据不会被用于任何商业目的
- 您的隐私完全得到保障

**广泛应用场景**
无论是制作演示文稿、提取合同扫描件、保存电子书插图、分享报告图表，还是归档重要文档，FastTool 都能为您提供专业的 PDF 转图片服务，让文档处理变得更加简单高效。`,
        },
        technicalDetails: {
          title: "PDF 转图片技术原理",
          content: `PDF 转图片是将 PDF 页面渲染为位图图像的技术过程。这需要解析 PDF 的矢量图形和文本内容，并将其栅格化为像素图像。

**PDF 文件结构解析**

**PDF 的基本组成**：
PDF（Portable Document Format）是一种复杂的文档格式，包含多个层次：
- **页面对象**：定义文档中的每一页
- **内容流**：包含页面的绘制指令（文字、图形、图片）
- **资源字典**：包含字体、图像、颜色空间等资源
- **图形状态**：定义绘制时的图形属性（颜色、线宽、变换矩阵）

**PDF 的矢量特性**：
- **分辨率无关**：PDF 中的文字和图形是矢量的，可以无损缩放
- **结构化内容**：文字、图形、图片分别存储，保持独立
- **压缩编码**：内容流通常使用 Flate（ZIP）压缩

**转换流程详解**

**1. PDF 加载和解析阶段**
- **文件读取**：读取 PDF 文件的二进制数据
- **结构解析**：解析 PDF 的对象树，构建页面结构
- **资源加载**：加载字体、图像等资源
- **内容解码**：解压缩内容流，解析绘制指令

**2. 页面渲染阶段**
使用 pdf.js 等渲染引擎将 PDF 页面绘制到 Canvas：
- **文档加载**：使用 pdf.js 加载 PDF 文件并解析文档结构
- **页面获取**：获取指定页码的页面对象
- **视口设置**：设置渲染缩放比例，支持高分辨率输出
- **Canvas 创建**：创建与页面尺寸匹配的 Canvas 元素
- **页面渲染**：将 PDF 页面内容绘制到 Canvas
- **图片导出**：将 Canvas 转换为图片格式输出

**3. 栅格化处理**
- **矢量转位图**：将 PDF 的矢量图形转换为像素点阵
- **文字渲染**：使用系统字体或嵌入字体渲染文字
- **图像解码**：解码 PDF 中嵌入的图片
- **颜色空间转换**：从 PDF 的颜色空间转换到 RGB

**4. 图像编码阶段**
- **格式选择**：根据用户需求选择 PNG、JPG 或 WebP 格式
- **压缩编码**：应用对应格式的压缩算法
- **质量调整**：对于有损格式（JPG、WebP），可调整质量参数
- **元数据添加**：可选择添加 EXIF 信息

**输出格式对比**

**PNG 格式**：
- **优点**：无损压缩、支持透明度、质量最高
- **缺点**：文件体积较大
- **适用场景**：包含文字的页面、需要透明背景、高质量要求

**JPG 格式**：
- **优点**：文件体积小、兼容性最好
- **缺点**：有损压缩、不支持透明
- **适用场景**：照片类 PDF、网络分享、邮件发送

**WebP 格式**：
- **优点**：压缩效率最高（比 JPG 小 25-35%）、支持透明
- **缺点**：兼容性相对较差（老旧设备不支持）
- **适用场景**：网页使用、现代设备分享

**分辨率和缩放**

**DPI（Dots Per Inch）**：
- **标准屏幕**：72-96 DPI（适合屏幕显示）
- **高清屏幕**：150-200 DPI（适合 Retina 屏幕）
- **打印质量**：300 DPI 及以上（适合打印输出）

**缩放比例**：
- **1x（100%）**：原始大小，适合屏幕显示
- **2x（200%）**：高清输出，细节更清晰
- **3x（300%）**：超高清，适合放大查看或打印

**质量优化策略**

- **抗锯齿处理**：对文字和图形边缘进行平滑处理
- **字体优化**：使用高质量字体渲染引擎
- **图像增强**：对嵌入图片进行适度锐化和色彩增强
- **背景处理**：可选择白色背景或透明背景（PNG）`,
        },
        useCases: [
          {
            title: "演示文稿制作",
            description:
              "将 PDF 报告、图表转换为图片后插入 PPT，提升演示效果和专业性",
          },
          {
            title: "合同归档",
            description: "将签署后的 PDF 合同转为图片存档，便于预览和快速检索",
          },
          {
            title: "电子书摘录",
            description:
              "提取 PDF 电子书中的精彩插图、图表作为读书笔记或分享素材",
          },
          {
            title: "社交媒体分享",
            description:
              "将 PDF 报告的关键页面转为图片，分享到微信、微博、LinkedIn 等平台",
          },
          {
            title: "文档预览",
            description: "为 PDF 文档生成缩略图预览，便于文件管理和快速浏览",
          },
          {
            title: "扫描件提取",
            description:
              "将扫描版 PDF 的页面提取为图片，用于 OCR 识别或图像编辑",
          },
        ],
        tips: [
          "对于包含大量文字的 PDF 页面，建议使用 PNG 格式以获得最佳清晰度",
          "输出分辨率建议设置为 2x（200%）或更高，确保文字清晰可读",
          "如果 PDF 页面很大，可以降低分辨率或选择 JPG 格式以减小文件体积",
          "批量转换多页 PDF 时，建议先测试单页效果确认设置合适",
          "需要打印时，建议使用 300 DPI（约 3-4x 缩放）以确保打印质量",
          "转换后的图片建议按页码-名称格式命名，便于整理和查找",
        ],
        faq: [
          {
            question: "支持哪些输出格式？",
            answer:
              "我们支持 PNG、JPG 和 WebP 三种主流图片格式。PNG 适合高质量和透明背景需求，JPG 文件最小兼容性最好，WebP 压缩效率最高。您可以根据使用场景选择合适的格式。",
          },
          {
            question: "PDF 的每一页都会转换吗？",
            answer:
              "是的，默认情况下会将 PDF 的每一页转换为一张独立的图片。您也可以指定只转换某些页面（如第 1-5 页）。转换完成后，每张图片会以页码-文件名的格式命名。",
          },
          {
            question: "可以调整输出图片的分辨率吗？",
            answer:
              "可以的。我们提供多个分辨率选项：1x（72 DPI，适合屏幕显示）、2x（150 DPI，高清输出）、3x（300 DPI，打印质量）。分辨率越高，图片越清晰，但文件体积也会相应增大。",
          },
          {
            question: "转换后的图片清晰度如何？",
            answer:
              "我们使用高质量渲染引擎，默认 2x 缩放（约 150 DPI），确保文字和图形边缘清晰。对于包含小字的 PDF，建议使用 3x 缩放（300 DPI）以获得最佳清晰度。PNG 格式的清晰度最高。",
          },
          {
            question: "支持加密的 PDF 吗？",
            answer:
              "不支持。如果 PDF 被密码保护，需要先解除密码保护才能转换。这是为了保护您的文档安全，避免在未知密码的情况下误操作。",
          },
          {
            question: "有文件大小或页数限制吗？",
            answer:
              "由于浏览器性能限制，建议单个 PDF 文件不超过 50MB，总页数不超过 100 页。大多数日常文档都在此范围内。超大文件可能导致浏览器卡顿或转换失败。",
          },
          {
            question: "我的 PDF 会被上传吗？",
            answer:
              "绝对不会。所有转换操作都在您的浏览器本地完成，PDF 文件数据不会离开您的设备。这是我们的核心隐私保护特性，确保您的文档 100% 安全。",
          },
          {
            question: "可以只转换特定页面吗？",
            answer:
              "是的，您可以选择转换整个 PDF 的所有页面，也可以指定只转换某些页面（如1,3,5-7,10）。这样可以提高工作效率，减少不必要的文件生成。",
          },
          {
            question: "转换后的图片可以用于商业用途吗？",
            answer:
              "可以。您拥有转换后图片的完全使用权，我们不会添加任何水印或限制。无论是个人使用还是商业用途，都可以自由使用。",
          },
        ],
      }
    : {
        whyChooseSection: {
          title: "Why Choose FastTool PDF to Image Converter?",
          content: `PDF is an excellent document format, but sometimes we need to extract PDF pages as images for presentations, social media sharing, document illustrations, and other scenarios. FastTool PDF to Image Converter uses advanced browser-side rendering technology to provide you with secure, high-quality, and flexible PDF to image conversion services.

**Core Advantages**
- **Local Conversion Architecture**: Based on pdf.js and Canvas API, all conversion operations complete in your browser without uploading to servers
- **High Quality Rendering**: Supports high-resolution output to ensure image clarity and details
- **Flexible Output Options**: Supports PNG, JPG, WebP and other formats with customizable quality and resolution
- **Batch Conversion Capability**: Can convert all pages of entire PDF or select specific pages
- **Privacy Protection**: PDF files never uploaded to any server, ensuring document security

**Privacy Protection Commitment**
We understand that PDF documents may contain business secrets, personal privacy, or sensitive information. FastTool uses a "zero-upload" architecture - from upload to conversion completion, your entire PDF process happens locally in your browser:
- Your documents won't be stored in any cloud
- Your data won't be used for any commercial purposes
- Your privacy is fully protected

**Wide Range of Applications**
Whether it's creating presentations, extracting scanned contracts, saving e-book illustrations, sharing report charts, or archiving important documents, FastTool provides professional PDF to image services to make document processing simpler and more efficient.`,
        },
        technicalDetails: {
          title: "PDF to Image Conversion Technology Principles",
          content: `PDF to image conversion is the technical process of rendering PDF pages into bitmap images. This requires parsing PDF's vector graphics and text content and rasterizing them into pixel images.

**PDF File Structure Parsing**

**PDF Basic Components**:
PDF (Portable Document Format) is a complex document format containing multiple layers:
- **Page Objects**: Define each page in the document
- **Content Streams**: Contain page drawing instructions (text, graphics, images)
- **Resource Dictionaries**: Contain fonts, images, color spaces, and other resources
- **Graphics State**: Define graphics attributes during drawing (colors, line width, transformation matrices)

**PDF Vector Characteristics**:
- **Resolution Independent**: Text and graphics in PDF are vector-based and can be scaled losslessly
- **Structured Content**: Text, graphics, and images are stored separately and remain independent
- **Compressed Encoding**: Content streams typically use Flate (ZIP) compression

**Detailed Conversion Process**

**1. PDF Loading and Parsing Phase**
- **File Reading**: Read PDF file's binary data
- **Structure Parsing**: Parse PDF's object tree to build page structure
- **Resource Loading**: Load fonts, images, and other resources
- **Content Decoding**: Decompress content streams and parse drawing instructions

**2. Page Rendering Phase**
Use pdf.js and other rendering engines to draw PDF pages to Canvas:
- **Document Loading**: Load PDF file using pdf.js and parse document structure
- **Page Retrieval**: Get page object for the specified page number
- **Viewport Settings**: Set rendering scale for high-resolution output
- **Canvas Creation**: Create Canvas element matching page dimensions
- **Page Rendering**: Draw PDF page content to Canvas
- **Image Export**: Convert Canvas to image format for output

**3. Rasterization Processing**
- **Vector to Bitmap**: Convert PDF's vector graphics to pixel arrays
- **Text Rendering**: Render text using system fonts or embedded fonts
- **Image Decoding**: Decode images embedded in PDF
- **Color Space Conversion**: Convert from PDF's color space to RGB

**4. Image Encoding Phase**
- **Format Selection**: Choose PNG, JPG, or WebP format based on user needs
- **Compression Encoding**: Apply corresponding format compression algorithms
- **Quality Adjustment**: For lossy formats (JPG, WebP), quality parameters are adjustable
- **Metadata Addition**: Can optionally add EXIF information

**Output Format Comparison**

**PNG Format**:
- **Advantages**: Lossless compression, supports transparency, highest quality
- **Disadvantages**: Larger file size
- **Use Cases**: Pages with text, need transparent background, high-quality requirements

**JPG Format**:
- **Advantages**: Small file size, best compatibility
- **Disadvantages**: Lossy compression, doesn't support transparency
- **Use Cases**: Photo-type PDFs, web sharing, email sending

**WebP Format**:
- **Advantages**: Highest compression efficiency (25-35% smaller than JPG), supports transparency
- **Disadvantages**: Relatively poorer compatibility (older devices don't support)
- **Use Cases**: Web use, modern device sharing

**Resolution and Scaling**

**DPI (Dots Per Inch)**:
- **Standard Screen**: 72-96 DPI (suitable for screen display)
- **HD Screen**: 150-200 DPI (suitable for Retina screens)
- **Print Quality**: 300 DPI and above (suitable for print output)

**Scaling Ratios**:
- **1x (100%)**: Original size, suitable for screen display
- **2x (200%)**: HD output, clearer details
- **3x (300%)**: Ultra HD, suitable for zoomed viewing or printing

**Quality Optimization Strategy**

- **Anti-Aliasing**: Smooth text and graphic edges
- **Font Optimization**: Use high-quality font rendering engines
- **Image Enhancement**: Apply moderate sharpening and color enhancement to embedded images
- **Background Handling**: Can choose white background or transparent background (PNG)`,
        },
        useCases: [
          {
            title: "Presentation Creation",
            description:
              "Convert PDF reports and charts to images for insertion into PowerPoint, enhancing presentation effects and professionalism",
          },
          {
            title: "Contract Archiving",
            description:
              "Convert signed PDF contracts to images for archiving, easier previewing and quick retrieval",
          },
          {
            title: "E-book Extraction",
            description:
              "Extract wonderful illustrations and charts from PDF e-books as reading notes or sharing materials",
          },
          {
            title: "Social Media Sharing",
            description:
              "Convert key pages from PDF reports to images for sharing on WeChat, Weibo, LinkedIn, and other platforms",
          },
          {
            title: "Document Preview",
            description:
              "Generate thumbnail previews for PDF documents for easier file management and quick browsing",
          },
          {
            title: "Scan Extraction",
            description:
              "Extract pages from scanned PDFs as images for OCR recognition or image editing",
          },
        ],
        tips: [
          "For PDF pages with lots of text, we recommend PNG format for best clarity",
          "We recommend setting output resolution to 2x (200 DPI) or higher to ensure text is clearly readable",
          "If PDF pages are very large, reduce resolution or choose JPG format to decrease file size",
          "When batch converting multi-page PDF, test with a single page first to confirm settings are appropriate",
          "For printing, we recommend 300 DPI (approximately 3-4x scaling) to ensure print quality",
          "We recommend naming converted images as page-number-filename for easier organization and retrieval",
        ],
        faq: [
          {
            question: "Which output formats are supported?",
            answer:
              "We support PNG, JPG, and WebP - three mainstream image formats. PNG is suitable for high quality and transparent background needs, JPG has smallest file size and best compatibility, WebP has highest compression efficiency. You can choose the appropriate format based on your use case.",
          },
          {
            question: "Will every page of the PDF be converted?",
            answer:
              "Yes, by default every page of the PDF will be converted to a separate image. You can also specify to convert only certain pages (e.g., pages 1-5). After conversion, each image will be named in page-number-filename format.",
          },
          {
            question: "Can I adjust the output image resolution?",
            answer:
              "Yes. We provide multiple resolution options: 1x (72 DPI, suitable for screen display), 2x (150 DPI, HD output), 3x (300 DPI, print quality). Higher resolution means clearer images but also larger file sizes.",
          },
          {
            question: "How clear will the converted images be?",
            answer:
              "We use high-quality rendering engines with default 2x scaling (approximately 150 DPI) to ensure clear text and graphic edges. For PDFs with small text, we recommend 3x scaling (300 DPI) for best clarity. PNG format has the highest clarity.",
          },
          {
            question: "Are encrypted PDFs supported?",
            answer:
              "No. If PDF is password-protected, it must be decrypted first before conversion. This protects your document security and prevents accidental operations on unknown passwords.",
          },
          {
            question: "Are there file size or page limits?",
            answer:
              "Due to browser limitations, we recommend single PDF files under 50MB and total pages under 100. Most daily documents fall within this range. Very large files may cause browser lag or conversion failure.",
          },
          {
            question: "Will my PDF be uploaded?",
            answer:
              "Absolutely not. All conversion operations happen locally in your browser - PDF data never leaves your device. This is our core privacy protection feature, ensuring 100% security of your documents.",
          },
          {
            question: "Can I convert only specific pages?",
            answer:
              "Yes, you can choose to convert all pages of the entire PDF or specify only certain pages (e.g., 1,3,5-7,10). This improves work efficiency and reduces unnecessary file generation.",
          },
          {
            question: "Can converted images be used commercially?",
            answer:
              "Yes. You have full usage rights to converted images. We don't add any watermarks or restrictions. Free to use for both personal and commercial purposes.",
          },
        ],
      };

  return (
    <ToolLayout
      locale={params.locale}
      title={
        params.locale === "zh" ? "PDF 转图片转换器" : "PDF to Image Converter"
      }
      description={
        params.locale === "zh"
          ? "免费在线将 PDF 转换为高清图片，支持 PNG、JPG、WebP 格式，浏览器本地处理保护隐私。"
          : "Free online PDF to high-quality image converter supporting PNG, JPG, and WebP formats. Browser-side processing for privacy."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 pdf.js 和 Canvas API 进行 PDF 到图片的转换，无需安装软件或插件，在不上传原图的前提下完成转换。支持多格式输出、分辨率调整、批量转换，适合演示文稿制作、合同归档、电子书摘录等多种场景。"
          : "This tool uses browser-side pdf.js and Canvas API to convert PDF to images without installing software or plugins. Completes conversion without uploading originals. Supports multi-format output, resolution adjustment, and batch conversion. Perfect for presentation creation, contract archiving, e-book extraction, and more."
      }
      howToSteps={
        params.locale === "zh"
          ? [
              "点击上传区域或拖拽 PDF 文件到页面",
              "选择输出格式（PNG/JPG/WebP）和质量参数",
              "可选择转换所有页面或指定页码",
              "点击「开始转换」按钮，浏览器将在本地执行转换",
              "预览转换效果，检查图片清晰度和格式",
              "满意后点击下载，保存图片到本地设备",
            ]
          : [
              "Click the upload area or drag and drop PDF files onto the page",
              "Select output format (PNG/JPG/WebP) and quality parameters",
              "Optionally choose to convert all pages or specific page numbers",
              "Click the 'Start Conversion' button - your browser will perform the conversion locally",
              "Preview conversion results to check image clarity and format",
              "Click download to save images to your device",
            ]
      }
      howToDetail={
        params.locale === "zh"
          ? "提示：对于包含大量文字的 PDF，建议使用 PNG 格式和 2x 以上分辨率。需要打印时建议使用 300 DPI（约 3-4x 缩放）。批量转换前建议先测试单页效果。"
          : "Tip: For PDFs with lots of text, we recommend PNG format and 2x+ resolution. For printing, we recommend 300 DPI (approximately 3-4x scaling). Test with a single page before batch converting."
      }
      whyChooseSection={detailedContent.whyChooseSection}
      technicalDetails={detailedContent.technicalDetails}
      useCases={detailedContent.useCases}
      tips={detailedContent.tips}
      faq={detailedContent.faq}
    >
      <PdfToImageTool locale={params.locale} />
    </ToolLayout>
  );
}

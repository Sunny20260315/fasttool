import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const ImageConverterTool = dynamic(() => import("@/components/tools/ImageConverterTool").then((module) => ({ default: module.ImageConverterTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片转 JPG - 免费在线工具" : "Image to JPG Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将图片格式转换为 JPG，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert images to JPG format online with browser-side processing for speed and privacy."
  };
}


export default function ImageToJpgPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const isZh = params.locale === "zh";
  
  // 为图片转 JPG 工具添加详细内容
  const detailedContent = isZh ? {
    whyChooseSection: {
      title: "为什么选择图片转 JPG 工具？",
      content: `JPG（JPEG）是全球最广泛使用的图片格式，几乎所有设备和平台都支持。我们的图片转 JPG 工具采用先进的浏览器端技术，为您提供安全、快速、高质量的格式转换服务。

**核心优势**
- **完全本地转换**：使用浏览器原生 Canvas API，所有转换在您的设备本地完成，无需上传到服务器
- **高质量输出**：采用最优压缩算法，在减小文件体积的同时保持出色的画质
- **批量转换支持**：可同时转换多张图片，大幅提升工作效率
- **跨平台兼容**：转换后的 JPG 文件可在任何设备、任何平台上打开和使用

**JPG 格式的优势**
JPG 格式自 1992 年诞生以来，一直是数字图像处理的事实标准：
- **广泛兼容**：所有操作系统、浏览器、图片查看器都原生支持
- **高效压缩**：使用有损压缩算法，文件体积小，适合网络传输和存储
- **色彩丰富**：支持 24 位真彩色，可呈现 1670 万种颜色，适合照片和复杂图像
- **渐进式加载**：支持渐进式显示，提升网络加载体验

**适用场景**
- 社交媒体分享（微信、微博、Facebook、Instagram 等）
- 网站图片资源优化
- 电子邮件附件发送
- 打印店冲印照片
- 文档插入图片
- 电商平台商品展示`
    },
    technicalDetails: {
      title: "图片格式转换技术原理",
      content: `图片格式转换是将一种编码格式的图片数据重新编码为另一种格式的过程。我们的工具使用浏览器内置的 Canvas API 实现高效转换。

**转换流程**
1. **解码阶段**：浏览器读取原始图片文件（如 PNG、WebP、BMP），通过内置解码器将压缩数据还原为像素矩阵
2. **渲染阶段**：将像素数据绘制到 HTML5 Canvas 画布上，Canvas 是一个位图图形环境
3. **编码阶段**：调用 Canvas 的 toDataURL() 或 toBlob() 方法，将画布内容重新编码为 JPG 格式

**Canvas API 技术细节**
- **toDataURL('image/jpeg', quality)**：将 Canvas 内容编码为 Base64 格式的 JPG 数据 URL
- **toBlob(callback, 'image/jpeg', quality)**：将 Canvas 内容编码为 Blob 对象，更适合大文件处理
- **quality 参数**：0.0 到 1.0 之间的数值，控制 JPG 压缩质量，0.8-0.9 是最佳平衡点

**颜色空间转换**
不同格式使用不同颜色模型：
- **PNG**：使用 RGBA（红绿蓝 + 透明度），支持透明通道
- **JPG**：使用 RGB（红绿蓝），不支持透明度
- **WebP**：支持 RGBA 和 RGB 两种模式

转换时，如果原图包含透明通道（如 PNG），JPG 会自动用白色背景填充透明区域。

**质量优化策略**
我们的工具采用智能质量控制：
- 默认使用 0.92 质量参数，在画质和体积间取得最佳平衡
- 对于照片类图像，优先保持色彩准确性
- 对于文字和图形，适当提高质量以减少压缩伪影`
    },
    useCases: [
      { title: "社交媒体分享", description: "将 PNG、WebP 等格式转换为 JPG，确保在所有社交平台上都能正常显示和上传" },
      { title: "网站优化", description: "将各种格式统一转换为 JPG，减少浏览器兼容性问题，提升页面加载速度" },
      { title: "打印冲印", description: "打印店通常要求 JPG 格式，转换后可直接用于照片冲印、文档打印" },
      { title: "邮件发送", description: "JPG 文件体积小，适合作为邮件附件快速发送，避免超大文件被退回" },
      { title: "文档编辑", description: "在 Word、PPT 等文档中插入图片时，JPG 格式兼容性最好，不会出现显示问题" },
      { title: "电商上传", description: "淘宝、京东、亚马逊等电商平台都接受 JPG 格式，转换后可直接上传商品图片" }
    ],
    tips: [
      "如果原图是 PNG 透明背景，转换后会变成白色背景，这是 JPG 格式特性决定的",
      "建议转换质量设置为 85-95%，肉眼几乎看不出差异，但文件体积可减少 50% 以上",
      "对于包含文字的图片，建议使用更高的质量（95% 以上）以避免文字边缘模糊",
      "批量转换时，建议先测试一张图片，确认效果后再处理全部",
      "JPG 不支持动画，如需转换 GIF 动画，请使用专门的 GIF 转 JPG 工具"
    ],
    faq: [
      {
        question: "转换后图片质量会下降吗？",
        answer: "JPG 是有损压缩格式，转换过程会带来一定程度的质量损失。但我们使用高质量参数（默认 92%），肉眼几乎无法察觉差异。如果您对质量要求极高，建议使用 PNG 格式。"
      },
      {
        question: "支持透明背景转换吗？",
        answer: "JPG 格式本身不支持透明度。如果原图（如 PNG）包含透明背景，转换后透明区域会被填充为白色。如需保留透明背景，请转换为 PNG 格式。"
      },
      {
        question: "可以批量转换吗？",
        answer: "是的，工具支持批量上传和转换。您可以一次选择多张图片，工具会依次处理所有图片，并提供单独下载。"
      },
      {
        question: "转换后的文件大小如何？",
        answer: "JPG 采用有损压缩，文件大小通常比 PNG 小 50-80%，具体取决于图片内容和质量设置。照片类图像压缩效果最明显。"
      },
      {
        question: "支持哪些输入格式？",
        answer: "支持所有主流图片格式，包括 PNG、WebP、BMP、GIF、TIFF、HEIC 等。浏览器能识别的图片格式都可以转换。"
      },
      {
        question: "我的图片会被上传吗？",
        answer: "绝对不会。所有转换都在您的浏览器本地完成，图片数据不会离开您的设备，确保 100% 隐私安全。"
      },
      {
        question: "转换后的 JPG 可以用于商业用途吗？",
        answer: "可以。您拥有转换后图片的完全使用权，我们不会添加任何水印或限制。"
      },
      {
        question: "为什么转换后文件名变了？",
        answer: "浏览器会自动将文件扩展名改为.jpg，以反映新的文件格式。这是标准行为，不影响文件内容。"
      }
    ]
  } : {
    whyChooseSection: {
      title: "Why Choose Image to JPG Converter?",
      content: `JPG (JPEG) is the most widely used image format globally, supported by virtually all devices and platforms. Our Image to JPG converter uses advanced browser-side technology to provide you with secure, fast, and high-quality format conversion.

**Core Advantages**
- **Completely Local Conversion**: Uses browser's native Canvas API - all conversion happens on your device without uploading to servers
- **High Quality Output**: Employs optimal compression algorithms to maintain excellent quality while reducing file size
- **Batch Conversion Support**: Convert multiple images simultaneously to greatly improve work efficiency
- **Cross-Platform Compatibility**: Converted JPG files work on any device, any platform

**Advantages of JPG Format**
Since its inception in 1992, JPG has been the de facto standard for digital image processing:
- **Universal Compatibility**: All operating systems, browsers, and image viewers have native support
- **Efficient Compression**: Uses lossy compression for smaller file sizes, ideal for web transfer and storage
- **Rich Colors**: Supports 24-bit true color with 16.7 million colors, perfect for photographs and complex images
- **Progressive Loading**: Supports progressive display for better web loading experience

**Application Scenarios**
- Social media sharing (WeChat, Weibo, Facebook, Instagram, etc.)
- Website image resource optimization
- Email attachment sending
- Photo printing services
- Document image insertion
- E-commerce product displays`
    },
    technicalDetails: {
      title: "Image Format Conversion Technology Principles",
      content: `Image format conversion is the process of re-encoding image data from one coding format to another. Our tool uses the browser's built-in Canvas API for efficient conversion.

**Conversion Process**
1. **Decoding Phase**: Browser reads the original image file (PNG, WebP, BMP, etc.) and decodes compressed data into a pixel matrix through built-in decoders
2. **Rendering Phase**: Pixel data is drawn onto an HTML5 Canvas - a bitmap graphics environment
3. **Encoding Phase**: Canvas's toDataURL() or toBlob() methods are called to re-encode canvas content as JPG format

**Canvas API Technical Details**
- **toDataURL('image/jpeg', quality)**: Encodes Canvas content as Base64-formatted JPG data URL
- **toBlob(callback, 'image/jpeg', quality)**: Encodes Canvas content as Blob object, better for large files
- **quality parameter**: Value between 0.0 and 1.0 controlling JPG compression quality - 0.8-0.9 is optimal

**Color Space Conversion**
Different formats use different color models:
- **PNG**: Uses RGBA (Red-Green-Blue + Alpha transparency), supports transparency
- **JPG**: Uses RGB (Red-Green-Blue), doesn't support transparency
- **WebP**: Supports both RGBA and RGB modes

During conversion, if the original contains transparency (like PNG), JPG automatically fills transparent areas with white background.

**Quality Optimization Strategy**
Our tool uses intelligent quality control:
- Default quality parameter of 0.92 achieves best balance between quality and size
- For photographic images, prioritizes color accuracy
- For text and graphics, increases quality to reduce compression artifacts`
    },
    useCases: [
      { title: "Social Media Sharing", description: "Convert PNG, WebP and other formats to JPG to ensure normal display and upload on all social platforms" },
      { title: "Website Optimization", description: "Convert various formats to JPG for unified website images, reducing browser compatibility issues and improving page load speed" },
      { title: "Photo Printing", description: "Print shops typically require JPG format - convert for direct use in photo printing and document printing" },
      { title: "Email Sending", description: "JPG's small file size is perfect for email attachments, avoiding oversized file rejections" },
      { title: "Document Editing", description: "JPG format has best compatibility when inserting images into Word, PowerPoint, and other documents" },
      { title: "E-commerce Uploads", description: "E-commerce platforms like Taobao, JD, and Amazon all accept JPG format for direct product image uploads" }
    ],
    tips: [
      "If the original is PNG with transparent background, it will become white after conversion - this is a JPG format limitation",
      "We recommend 85-95% quality setting - visually indistinguishable but can reduce file size by over 50%",
      "For images containing text, use higher quality (95%+) to avoid blurred text edges",
      "When batch converting, test with one image first to confirm results before processing all",
      "JPG doesn't support animation - use dedicated GIF to JPG converter for animated GIFs"
    ],
    faq: [
      {
        question: "Will image quality decrease after conversion?",
        answer: "JPG is a lossy compression format, so conversion brings some quality loss. However, we use high-quality parameters (default 92%), making differences nearly imperceptible to the naked eye. For extremely high quality requirements, we recommend PNG format."
      },
      {
        question: "Is transparent background conversion supported?",
        answer: "JPG format itself doesn't support transparency. If the original (like PNG) has transparent background, transparent areas will be filled with white after conversion. To preserve transparency, please convert to PNG format instead."
      },
      {
        question: "Can I convert images in batch?",
        answer: "Yes, the tool supports batch upload and conversion. You can select multiple images at once, and the tool will process all images sequentially with individual downloads."
      },
      {
        question: "What will be the file size after conversion?",
        answer: "JPG uses lossy compression, and file size is typically 50-80% smaller than PNG, depending on image content and quality settings. Photographic images show the most significant compression."
      },
      {
        question: "Which input formats are supported?",
        answer: "All major image formats are supported including PNG, WebP, BMP, GIF, TIFF, HEIC, and more. Any format your browser can recognize can be converted."
      },
      {
        question: "Will my images be uploaded?",
        answer: "Absolutely not. All conversion happens locally in your browser - image data never leaves your device, ensuring 100% privacy and security."
      },
      {
        question: "Can converted JPG images be used commercially?",
        answer: "Yes. You have full usage rights to converted images. We don't add any watermarks or restrictions."
      },
      {
        question: "Why did the filename change after conversion?",
        answer: "The browser automatically changes the file extension to .jpg to reflect the new format. This is standard behavior and doesn't affect file content."
      }
    ]
  };

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片转 JPG" : "Image to JPG"}
      description={
        params.locale === "zh"
          ? "将各种图片格式快速转换为 JPG 格式，浏览器本地处理，保护隐私，快速下载。"
          : "Quickly convert various image formats to JPG with browser-side processing for privacy and fast downloads."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行格式转换，在不上传原图的前提下完成转换，适合快速处理图片。支持 PNG、WebP、BMP 等多种格式转换为 JPG，完全免费，无需注册。"
          : "This tool uses browser-side Canvas API to convert images without uploading originals, ideal for quick image processing. Supports converting PNG, WebP, BMP and more to JPG - completely free, no registration required."
      }
      howToSteps={
        params.locale === "zh"
          ? ["点击上传区域或拖拽图片到页面，支持 PNG、WebP、BMP 等格式", "工具会自动开始转换，无需手动操作", "预览转换效果，确认满意后点击下载", "保存 JPG 图片到本地设备"]
          : ["Click the upload area or drag and drop images onto the page, supports PNG, WebP, BMP and more", "The tool will automatically start conversion - no manual action needed", "Preview the conversion results and click download when satisfied", "Save the JPG image to your device"]
      }
      howToDetail={
        params.locale === "zh"
          ? "提示：转换过程通常在几秒内完成，具体时间取决于图片大小和设备性能。如果转换失败，请检查图片格式是否受浏览器支持。"
          : "Tip: Conversion typically completes within seconds, depending on image size and device performance. If conversion fails, check if your image format is supported by the browser."
      }
      useCases={detailedContent.useCases}
      tips={detailedContent.tips}
      whyChooseSection={detailedContent.whyChooseSection}
      technicalDetails={detailedContent.technicalDetails}
      faq={detailedContent.faq}
    >
      <ImageConverterTool locale={params.locale} targetFormat="jpg" mimeType="image/jpeg" />
    </ToolLayout>);
}
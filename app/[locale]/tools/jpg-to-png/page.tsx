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
    title: params.locale === "zh" ? "JPG 转 PNG - 免费在线 JPG 转 PNG 转换器 - FastTool" : "JPG to PNG Converter | Free Online Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "免费在线将 JPG 格式转换为 PNG，无需安装软件，浏览器本地转换，保护隐私安全。支持透明背景、无损压缩、高质量输出。"
        : "Free online JPG to PNG converter. No software installation needed. Browser-side conversion protects your privacy. Supports transparency, lossless compression, and high-quality output."
  };
}


export default function JpgToPngPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const isZh = params.locale === "zh";
  
  // 为 JPG 转 PNG 工具添加详细内容
  const detailedContent = isZh ? {
    whyChooseSection: {
      title: "为什么选择 FastTool JPG 转 PNG 转换器？",
      content: `JPG 和 PNG 是两种最常用的图片格式，各有优势和应用场景。JPG 以高压缩率和小文件体积著称，适合照片存储；而 PNG 则以无损压缩和透明背景支持闻名，适合图形设计和网页使用。FastTool JPG 转 PNG 转换器采用先进的浏览器端技术，为您提供安全、高质量、灵活的格式转换服务。

**核心优势**
- **本地转换架构**：基于 HTML5 Canvas API，所有转换操作在浏览器中完成，无需上传到服务器
- **无损压缩输出**：PNG 格式采用无损压缩，转换后图像质量完全保留，不会有任何损失
- **透明背景支持**：可选择添加透明背景，适合图标、Logo、UI 元素等设计需求
- **批量转换能力**：可同时转换多张 JPG 图片，大幅提升工作效率
- **高质量输出**：保留原图的所有细节和色彩信息，支持最高质量输出

**隐私保护承诺**
我们深知图片可能包含个人隐私或商业机密。FastTool 采用"零上传"架构，您的所有 JPG 图片从上传到转换完成，整个过程都在本地浏览器中完成：
- 您的图片不会被存储在任何云端
- 您的数据不会被用于任何商业目的
- 您的隐私完全得到保障

**广泛应用场景**
无论是网页设计、UI 制作、Logo 处理、图标设计，还是截图优化、文档插图、电商美工，FastTool 都能为您提供专业的 JPG 转 PNG 服务，让格式转换变得更加简单高效。`
    },
    technicalDetails: {
      title: "JPG 转 PNG 技术原理",
      content: `JPG 转 PNG 是将有损压缩格式转换为无损压缩格式的过程，涉及到解码、色彩空间转换和重新编码等关键技术。

**JPG 与 PNG 格式差异**

**JPG 格式特点**：
- **有损压缩**：使用离散余弦变换（DCT）压缩，会损失部分图像细节
- **不支持透明**：没有 Alpha 通道，无法实现透明或半透明效果
- **色彩丰富**：支持 24 位真彩色（1670 万色）
- **适合照片**：对连续色调的图像（如照片）压缩效果好
- **文件较小**：相同画质下，文件体积比 PNG 小 50-80%

**PNG 格式特点**：
- **无损压缩**：使用 DEFLATE 算法，压缩后不损失任何图像信息
- **支持透明度**：包含 Alpha 通道，可实现透明或半透明效果
- **色彩丰富**：支持 8 位、24 位、48 位色深
- **适合图形**：对线条、文字、图标等边缘清晰的图像压缩效果好
- **文件较大**：相同画质下，文件体积通常比 JPG 大 2-3 倍

**转换流程详解**

**1. JPG 解码阶段**
- **读取文件**：解析 JPG 文件结构，包括 SOI 标记、APPn 标记、SOF 段、熵编码数据
- **熵解码**：使用霍夫曼解码或算术解码还原压缩数据
- **逆量化**：使用量化表还原 DCT 系数
- **逆 DCT 变换**：将频域数据转换回空间域像素
- **色彩空间转换**：从 YCbCr 转换到 RGB

**2. 数据处理阶段**
- **像素重组**：将解码后的像素数据重组为 RGBA 格式
- **背景处理**：可选择添加白色背景或透明背景
- **质量增强**：可选择性应用锐化、降噪等后处理

**3. PNG 编码阶段**
- **滤镜处理**：应用 PNG 滤镜（None、Sub、Up、Average、Paeth）优化压缩
- **数据压缩**：使用 DEFLATE 算法压缩图像数据
- **添加元数据**：嵌入文本信息、伽马校正、色彩配置文件等
- **生成文件**：按照 PNG 规范生成最终文件

**Canvas API 实现**

我们的工具使用 HTML5 Canvas 的内置能力：

创建 Canvas 元素，加载 JPG 图像，绘制到 Canvas 上，然后使用 toDataURL 方法导出为 PNG 格式。整个过程在浏览器中瞬间完成，无需任何服务器交互。

**技术细节**：
- 自动处理色彩空间转换（YCbCr 到 RGB）
- 保留原始像素数据，确保无质量损失
- 支持 Alpha 通道（可选择添加透明背景）
- 使用浏览器最优压缩算法

**质量优势**

**从有损到无损**：
虽然 JPG 本身是有损压缩，但转换为 PNG 后：
- **不再继续损失**：PNG 的无损特性确保转换后不会再有质量损失
- **便于后续编辑**：PNG 格式更适合多次编辑和保存
- **支持透明**：为设计工作提供更大灵活性

**适用场景对比**：

**JPG 更适合**：
- 照片存储和分享
- 网络传输（文件小）
- 不需要透明背景的场景

**PNG 更适合**：
- 网页设计和 UI 制作
- Logo、图标、图形元素
- 需要透明背景的设计
- 需要多次编辑的图像
- 包含文字或清晰边缘的图像`
    },
    useCases: [
      { title: "网页设计", description: "将产品照片转为 PNG 格式后用于网页设计，支持透明背景和高质量显示" },
      { title: "UI 制作", description: "将界面截图转为 PNG 格式，便于 UI 设计师进行标注、修改和再设计" },
      { title: "Logo 处理", description: "将客户提供的 JPG Logo 转为 PNG，便于后续设计使用和背景抠除" },
      { title: "图标设计", description: "将手绘或拍摄的图标草图转为 PNG，便于数字化处理和矢量化" },
      { title: "截图优化", description: "将手机或电脑截图转为 PNG 格式，保留清晰的文字和界面元素" },
      { title: "电商美工", description: "将产品照片转为 PNG 后用于电商详情页设计，支持透明背景和高质量展示" }
    ],
    tips: [
      "JPG 转 PNG 后文件会变大，这是正常的，因为 PNG 是无损压缩格式",
      "如果原 JPG 图片质量较低，转为 PNG 不会提升画质，因为损失已经不可恢复",
      "需要透明背景时，建议使用专业的抠图工具，单纯的格式转换不会自动去除背景",
      "对于包含文字的截图，PNG 格式能更好地保留文字边缘的清晰度",
      "批量转换时，建议先测试一张图片确认效果，再处理全部图片",
      "转换后的 PNG 文件虽然较大，但更适合后续编辑和设计使用"
    ],
    faq: [
      {
        question: "JPG 转 PNG 会提升画质吗？",
        answer: "JPG 转 PNG 不会提升原图的画质，因为 JPG 有损压缩造成的损失已经不可恢复。但转换为 PNG 后，图像将采用无损压缩，后续编辑和保存不会再有质量损失。PNG 的优势在于便于编辑和支持透明背景，而不是提升已有画质。"
      },
      {
        question: "转换后文件会变大吗？",
        answer: "是的，PNG 文件通常比 JPG 大 2-3 倍。这是因为 PNG 采用无损压缩，保留了所有图像信息。虽然文件较大，但 PNG 更适合设计工作、多次编辑和需要透明背景的场景。"
      },
      {
        question: "支持透明背景吗？",
        answer: "PNG 格式本身支持透明背景，但 JPG 转 PNG 的简单转换不会自动去除背景。如需透明背景，建议使用专业的抠图工具或图像编辑软件先去除背景，再保存为 PNG 格式。"
      },
      {
        question: "转换速度如何？",
        answer: "转换在浏览器本地完成，通常只需 1-3 秒即可完成一张图片的转换。批量转换时，工具会依次处理每张图片，总时间取决于图片数量和大小。"
      },
      {
        question: "可以批量转换吗？",
        answer: "是的，工具支持同时上传和转换多张 JPG 图片。您可以一次选择所有需要转换的图片，工具会依次处理并提供单独下载。批量转换可以大幅提高工作效率。"
      },
      {
        question: "我的图片会被上传吗？",
        answer: "绝对不会。所有转换都在您的浏览器本地完成，图片数据不会离开您的设备。这是我们的核心隐私保护特性，确保您的图片 100% 安全。"
      },
      {
        question: "支持哪些 JPG 格式？",
        answer: "支持所有标准 JPG/JPEG 格式，包括不同质量等级、色彩空间（sRGB、Adobe RGB 等）、分辨率的图片。无论您的 JPG 是什么规格，都可以正常转换为 PNG。"
      },
      {
        question: "转换后的 PNG 可以用于商业用途吗？",
        answer: "可以。您拥有转换后图片的完全使用权，我们不会添加任何水印或限制。无论是个人使用还是商业用途，都可以自由使用。"
      }
    ]
  } : {
    whyChooseSection: {
      title: "Why Choose FastTool JPG to PNG Converter?",
      content: `JPG and PNG are two of the most commonly used image formats, each with advantages and application scenarios. JPG is known for high compression and small file size, suitable for photo storage; while PNG is renowned for lossless compression and transparency support, ideal for graphic design and web use. FastTool JPG to PNG Converter uses advanced browser-side technology to provide you with secure, high-quality, and flexible format conversion.

**Core Advantages**
- **Local Conversion Architecture**: Based on HTML5 Canvas API, all conversion operations complete in your browser without uploading to servers
- **Lossless Compression Output**: PNG format uses lossless compression - converted image quality is fully preserved without any loss
- **Transparency Support**: Can optionally add transparent background for design needs like icons, logos, and UI elements
- **Batch Conversion Capability**: Can convert multiple JPG images simultaneously to greatly improve work efficiency
- **High Quality Output**: Preserves all original image details and color information, supports highest quality output

**Privacy Protection Commitment**
We understand that images may contain personal privacy or business secrets. FastTool uses a "zero-upload" architecture - from upload to conversion completion, your entire JPG process happens locally in your browser:
- Your images won't be stored in any cloud
- Your data won't be used for any commercial purposes
- Your privacy is fully protected

**Wide Range of Applications**
Whether it's web design, UI production, logo processing, icon design, screenshot optimization, document illustration, or e-commerce design, FastTool provides professional JPG to PNG services to make format conversion simpler and more efficient.`
    },
    technicalDetails: {
      title: "JPG to PNG Conversion Technology Principles",
      content: `JPG to PNG conversion is the process of transforming lossy compression format to lossless compression format, involving key technologies like decoding, color space conversion, and re-encoding.

**JPG vs PNG Format Differences**

**JPG Format Characteristics**:
- **Lossy Compression**: Uses Discrete Cosine Transform (DCT) - loses some image details
- **No Transparency Support**: No Alpha channel - cannot achieve transparent or semi-transparent effects
- **Rich Colors**: Supports 24-bit true color (16.7 million colors)
- **Suitable for Photos**: Excellent compression for continuous-tone images like photographs
- **Smaller File Size**: Typically 50-80% smaller than PNG at same quality level

**PNG Format Characteristics**:
- **Lossless Compression**: Uses DEFLATE algorithm - no image information lost after compression
- **Supports Transparency**: Includes Alpha channel for transparent or semi-transparent effects
- **Rich Colors**: Supports 8-bit, 24-bit, 48-bit color depth
- **Suitable for Graphics**: Excellent compression for images with clear edges like lines, text, icons
- **Larger File Size**: Typically 2-3 times larger than JPG at same quality level

**Detailed Conversion Process**

**1. JPG Decoding Phase**
- **File Reading**: Parse JPG file structure including SOI markers, APPn markers, SOF segments, entropy-coded data
- **Entropy Decoding**: Use Huffman decoding or arithmetic decoding to restore compressed data
- **Inverse Quantization**: Restore DCT coefficients using quantization tables
- **Inverse DCT Transform**: Convert frequency domain data back to spatial domain pixels
- **Color Space Conversion**: Convert from YCbCr to RGB

**2. Data Processing Phase**
- **Pixel Reorganization**: Reorganize decoded pixel data into RGBA format
- **Background Handling**: Can optionally add white background or transparent background
- **Quality Enhancement**: Can optionally apply sharpening, noise reduction, and other post-processing

**3. PNG Encoding Phase**
- **Filter Processing**: Apply PNG filters (None, Sub, Up, Average, Paeth) to optimize compression
- **Data Compression**: Compress image data using DEFLATE algorithm
- **Add Metadata**: Embed text information, gamma correction, color profiles, etc.
- **Generate File**: Generate final file according to PNG specification

**Canvas API Implementation**

Our tool uses HTML5 Canvas's built-in capabilities:

Create Canvas element, load JPG image, draw onto Canvas, then export as PNG format using toDataURL method. The entire process completes instantly in the browser without any server interaction.

**Technical Details**:
- Automatically handles color space conversion (YCbCr to RGB)
- Preserves original pixel data to ensure no quality loss
- Supports Alpha channel (can optionally add transparent background)
- Uses browser's optimal compression algorithms

**Quality Advantages**

**From Lossy to Lossless**:
Although JPG itself is lossy compression, after converting to PNG:
- **No Further Loss**: PNG's lossless特性 ensures no further quality loss after conversion
- **Easy Editing**: PNG format is more suitable for multiple edits and saves
- **Transparency Support**: Provides greater flexibility for design work

**Use Case Comparison**:

**JPG is better for**:
- Photo storage and sharing
- Web transfer (smaller files)
- Scenarios not requiring transparent backgrounds

**PNG is better for**:
- Web design and UI production
- Logos, icons, graphic elements
- Designs requiring transparent backgrounds
- Images needing multiple edits
- Images containing text or clear edges`
    },
    useCases: [
      { title: "Web Design", description: "Convert product photos to PNG for web design with transparency support and high-quality display" },
      { title: "UI Production", description: "Convert interface screenshots to PNG for UI designers to annotate, modify, and redesign" },
      { title: "Logo Processing", description: "Convert client-provided JPG logos to PNG for easier use in subsequent design work and background removal" },
      { title: "Icon Design", description: "Convert hand-drawn or photographed icon sketches to PNG for digitization and vectorization" },
      { title: "Screenshot Optimization", description: "Convert phone or computer screenshots to PNG to preserve clear text and interface elements" },
      { title: "E-commerce Design", description: "Convert product photos to PNG for e-commerce detail page design with transparency support and high-quality display" }
    ],
    tips: [
      "PNG files will be larger after JPG to PNG conversion - this is normal since PNG uses lossless compression",
      "If original JPG quality is low, converting to PNG won't improve quality since the loss is already irreversible",
      "For transparent backgrounds, we recommend using professional background removal tools first, then saving as PNG",
      "For screenshots containing text, PNG format better preserves text edge clarity",
      "When batch converting, test with one image first to confirm results before processing all",
      "Converted PNG files are larger but more suitable for subsequent editing and design work"
    ],
    faq: [
      {
        question: "Will JPG to PNG conversion improve quality?",
        answer: "JPG to PNG conversion won't improve original image quality since quality loss from JPG's lossy compression is already irreversible. However, after converting to PNG, the image will use lossless compression, so no further quality loss will occur during subsequent editing and saving. PNG's advantage lies in easier editing and transparency support, not in improving existing quality."
      },
      {
        question: "Will files become larger after conversion?",
        answer: "Yes, PNG files are typically 2-3 times larger than JPG. This is because PNG uses lossless compression, preserving all image information. Although files are larger, PNG is more suitable for design work, multiple edits, and scenarios requiring transparent backgrounds."
      },
      {
        question: "Is transparency supported?",
        answer: "PNG format itself supports transparency, but simple JPG to PNG conversion won't automatically remove backgrounds. For transparent backgrounds, we recommend using professional background removal tools or image editing software first, then saving as PNG format."
      },
      {
        question: "How fast is the conversion?",
        answer: "Conversion completes locally in your browser, typically taking just 1-3 seconds per image. For batch conversion, the tool processes each image sequentially - total time depends on image count and size."
      },
      {
        question: "Can I convert images in batch?",
        answer: "Yes, the tool supports uploading and converting multiple JPG images simultaneously. You can select all images needing conversion at once, and the tool will process them sequentially with individual downloads. Batch conversion greatly improves work efficiency."
      },
      {
        question: "Will my images be uploaded?",
        answer: "Absolutely not. All conversion happens locally in your browser - image data never leaves your device. This is our core privacy protection feature, ensuring 100% security of your images."
      },
      {
        question: "Which JPG formats are supported?",
        answer: "All standard JPG/JPEG formats are supported including different quality levels, color spaces (sRGB, Adobe RGB, etc.), and resolutions. Whatever specifications your JPG has, it will convert to PNG normally."
      },
      {
        question: "Can converted PNG images be used commercially?",
        answer: "Yes. You have full usage rights to converted images. We don't add any watermarks or restrictions. Free to use for both personal and commercial purposes."
      }
    ]
  };

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "JPG 转 PNG 转换器" : "JPG to PNG Converter"}
      description={
        params.locale === "zh"
          ? "免费在线将 JPG 格式转换为 PNG，支持高质量输出，浏览器本地处理保护隐私。"
          : "Free online JPG to PNG converter with high-quality output. Browser-side processing for privacy."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行 JPG 到 PNG 的格式转换，无需安装软件或插件，在不上传原图的前提下完成转换。支持批量转换、高质量输出，适合网页设计、UI 制作、Logo 处理等多种场景。"
          : "This tool uses browser-side Canvas API to convert JPG to PNG format without installing software or plugins. Completes conversion without uploading originals. Supports batch conversion and high-quality output. Perfect for web design, UI production, logo processing, and more."
      }
      howToSteps={
        params.locale === "zh"
          ? ["点击上传区域或拖拽 JPG 图片到页面，支持单张或多张上传", "工具会自动开始转换，无需手动操作（或点击开始转换按钮）", "等待浏览器完成 JPG 解码和 PNG 编码，通常只需几秒", "预览转换效果，检查图片质量", "满意后点击下载，保存 PNG 图片到本地设备"]
          : ["Click the upload area or drag and drop JPG images onto the page, supports single or multiple uploads", "The tool will automatically start conversion (or click the Start Conversion button)", "Wait for the browser to complete JPG decoding and PNG encoding - typically just seconds", "Preview conversion results to check image quality", "Click download to save PNG images to your device"]
      }
      howToDetail={
        params.locale === "zh"
          ? "提示：JPG 转 PNG 后文件会变大（通常 2-3 倍），这是正常的。PNG 是无损压缩格式，虽然文件较大，但更适合后续编辑和设计使用。如需透明背景，建议先使用抠图工具处理。"
          : "Tip: PNG files will be larger after JPG to PNG conversion (typically 2-3 times), which is normal. PNG is a lossless compression format - although files are larger, they're more suitable for subsequent editing and design work. For transparent backgrounds, we recommend using background removal tools first."
      }
      whyChooseSection={detailedContent.whyChooseSection}
      technicalDetails={detailedContent.technicalDetails}
      useCases={detailedContent.useCases}
      tips={detailedContent.tips}
      faq={detailedContent.faq}
    >
      <ImageConverterTool locale={params.locale} targetFormat="png" mimeType="image/png" />
    </ToolLayout>);
}

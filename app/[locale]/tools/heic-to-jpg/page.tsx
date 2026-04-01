import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const HeicToJpgTool = dynamic(() => import("@/components/tools/HeicToJpgTool").then((module) => ({ default: module.HeicToJpgTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "HEIC 转 JPG - 免费在线工具" : "HEIC to JPG Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 HEIC 格式转换为 JPG，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert HEIC format to JPG online with browser-side processing for speed and privacy."
  };
}


export default function HeicToJpgPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const isZh = params.locale === "zh";
  
  // 为 HEIC 转 JPG 工具添加详细内容
  const detailedContent = isZh ? {
    whyChooseSection: {
      title: "为什么需要 HEIC 转 JPG 工具？",
      content: `HEIC（High Efficiency Image Container）是苹果公司从 iOS 11 开始采用的新一代图片格式，基于 HEVC（H.265）视频编码标准。虽然 HEIC 格式在压缩效率上优于 JPG，但其兼容性问题给跨平台使用带来了困扰。

**HEIC 格式的优势**
- **高效压缩**：相同画质下，文件体积比 JPG 小 40-50%
- **高质量**：支持 16 位色深，色彩表现更丰富
- **先进特性**：支持 Live Photo、深度信息、透明度等高级功能
- **节省空间**：iPhone 用户可以存储更多照片

**HEIC 格式的兼容性困境**
尽管 HEIC 技术先进，但现实使用中存在诸多不便：
- **Windows 兼容性差**：旧版本 Windows 10 及以前系统无法直接打开
- **Android 支持有限**：部分安卓设备不支持 HEIC 格式
- **网页兼容性低**：大多数网站和社交媒体平台不接受 HEIC 上传
- **打印困难**：打印店和在线冲印服务通常要求 JPG 格式

**我们的解决方案**
FastTool HEIC 转 JPG 工具采用先进的浏览器端解码技术，为您提供：
- **本地转换**：无需安装任何软件或插件，浏览器即可完成转换
- **快速高效**：利用现代浏览器的解码能力，秒速转换
- **隐私保护**：照片不会上传到任何服务器，100% 本地处理
- **高质量输出**：保留原图的 EXIF 信息（拍摄时间、GPS 等）和画质

**适用人群**
- iPhone/iPad 用户需要跨平台分享照片
- 需要在 Windows 电脑上查看或编辑 iOS 照片
- 要上传照片到社交媒体、网站或打印店
- 需要与使用安卓设备的朋友分享照片`
    },
    technicalDetails: {
      title: "HEIC 转 JPG 技术原理",
      content: `HEIC 转 JPG 是将高效图像格式转换为通用格式的过程，涉及到图像解码和重新编码两个关键步骤。

**HEIC 格式技术解析**

**HEIC 的编码结构**：
HEIC 基于 HEVC（High Efficiency Video Coding，也称 H.265）的帧内编码技术：
- **帧内预测**：利用图像内部的空间相关性进行压缩
- **变换编码**：使用离散余弦变换（DCT）将图像转换到频域
- **熵编码**：使用 CABAC（上下文自适应二进制算术编码）进一步压缩
- **多参考帧**：可以利用多个参考帧进行预测

**HEIC 的先进性**：
- 支持 10-bit 和 12-bit 色深（JPG 仅支持 8-bit）
- 支持广色域（P3、Rec.2020 等）
- 支持 Alpha 通道（透明度）
- 支持图像序列（Live Photo）
- 支持深度图和辅助图像

**转换流程**

**1. HEIC 解码阶段**
- **文件解析**：读取 HEIC 文件的容器结构，提取编码数据
- **熵解码**：将 CABAC 编码的比特流解码为变换系数
- **逆变换**：通过逆 DCT 将频域数据转换回空间域
- **预测重建**：根据帧内预测模式重建像素值
- **色彩空间转换**：从 YUV 色彩空间转换到 RGB

**2. JPG 编码阶段**
- **色彩空间转换**：从 RGB 转换到 YCbCr（JPG 标准色彩空间）
- **分块处理**：将图像分割为 8x8 或 16x16 的块
- **DCT 变换**：对每个块进行离散余弦变换
- **量化**：使用量化表压缩高频分量（有损压缩的关键步骤）
- **熵编码**：使用霍夫曼编码或算术编码进一步压缩
- **添加元数据**：嵌入 EXIF 信息（拍摄参数、时间、GPS 等）

**浏览器端实现技术**

**技术挑战**：
HEIC 是专利编码格式，浏览器原生不支持解码。我们采用以下方案：
- **heic2any 库**：使用 WebAssembly 编译的 libheif 库
- **Canvas 渲染**：将解码后的像素数据绘制到 Canvas
- **toBlob 导出**：使用 Canvas 的 toBlob 方法导出为 JPG

**实现流程**：
\`\`\`javascript
// 1. 使用 heic2any 解码 HEIC
const blob = await heic2any({
  blob: heicFile,
  toType: "image/jpeg",
  quality: 0.92
});

// 2. 创建 Image 对象加载解码后的数据
const img = new Image();
img.src = URL.createObjectURL(blob);

// 3. 绘制到 Canvas 并导出
const canvas = document.createElement('canvas');
canvas.width = img.width;
canvas.height = img.height;
const ctx = canvas.getContext('2d');
ctx.drawImage(img, 0, 0);
const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.92);
\`\`\`

**EXIF 信息保留**

EXIF（Exchangeable Image File Format）包含重要的拍摄元数据：
- 拍摄时间、相机型号、镜头参数
- 光圈、快门速度、ISO 感光度
- 焦距、测光模式、白平衡
- GPS 地理位置信息（如果原图包含）

我们的工具在转换过程中尽可能保留 EXIF 信息，但部分 HEIC 特有的元数据（如深度图、Live Photo 信息）可能无法保留到 JPG 格式中。

**质量优化策略**

- **高质量参数**：默认使用 92% 的 JPG 质量，在画质和体积间取得平衡
- **色深适配**：将 HEIC 的 10/12-bit 色深正确映射到 JPG 的 8-bit
- **色域转换**：从 P3 广色域正确转换到 sRGB 标准色域
- **元数据保留**：保留完整的 EXIF 信息，方便后期管理和编辑`
    },
    useCases: [
      { title: "跨平台分享", description: "将 iPhone 拍摄的 HEIC 照片转换为 JPG，方便分享给使用 Windows 或 Android 的朋友" },
      { title: "社交媒体上传", description: "转换照片为 JPG 格式，确保能顺利上传到微信、微博、Facebook、Instagram 等平台" },
      { title: "网站兼容性", description: "将 HEIC 照片转为 JPG 后上传到网站、博客或论坛，确保所有访客都能正常查看" },
      { title: "打印冲印", description: "打印店通常要求 JPG 格式，转换后可直接用于照片冲印、证件照打印等" },
      { title: "文档插入", description: "在 Word、PPT 等文档中插入照片时，JPG 格式兼容性最好，不会出现显示问题" },
      { title: "备份归档", description: "将 HEIC 照片批量转换为 JPG 后备份，确保长期可读性和兼容性" }
    ],
    tips: [
      "iPhone 用户可以在「设置」>「照片」中将拍摄格式改为「兼容性最好」，直接拍摄 JPG 格式",
      "从 iPhone 导出照片到电脑时，可以在「导入」设置中选择「传输时自动转换」为 JPG",
      "HEIC 转 JPG 会损失一些高级特性（如 Live Photo、深度信息），但主体画质几乎无差异",
      "如果照片包含重要 EXIF 信息（如 GPS），转换后请检查是否完整保留",
      "批量转换时，建议先测试一张照片确认效果，再处理全部照片",
      "转换后的 JPG 文件会比原 HEIC 大约 40-50%，这是正常现象"
    ],
    faq: [
      {
        question: "为什么需要转换 HEIC 格式？",
        answer: "HEIC 是苹果采用的新一代图片格式，虽然压缩效率高，但兼容性差。Windows 旧版本、安卓设备、大多数网站和社交媒体平台都不支持 HEIC 格式。转换为 JPG 可以确保在所有设备和平台上都能正常查看和使用。"
      },
      {
        question: "转换会损失画质吗？",
        answer: "HEIC 转 JPG 会有一定的质量损失，因为 JPG 是有损压缩格式。但我们使用高质量的转换参数（92% 质量），肉眼几乎看不出差异。主要损失在色深（从 10/12-bit 降到 8-bit）和广色域（从 P3 降到 sRGB）。"
      },
      {
        question: "EXIF 信息会保留吗？",
        answer: "是的，我们会保留完整的 EXIF 信息，包括拍摄时间、相机参数、GPS 位置等。但 HEIC 特有的元数据（如深度图、Live Photo 信息、辅助图像等）无法保留到 JPG 格式中。"
      },
      {
        question: "支持 Live Photo 转换吗？",
        answer: "Live Photo 包含静态图片和视频两部分。我们的工具只转换静态图片部分为 JPG。如需提取 Live Photo 的视频部分，需要使用专门的 Live Photo 提取工具。"
      },
      {
        question: "可以批量转换吗？",
        answer: "是的，工具支持同时上传和转换多张 HEIC 图片。您可以一次选择所有需要转换的照片，工具会依次处理并提供单独下载。批量转换可以大幅提高工作效率。"
      },
      {
        question: "转换后的文件有多大？",
        answer: "JPG 文件通常比原 HEIC 大约 40-50%。例如，一张 2MB 的 HEIC 照片转换后约为 3MB。这是为了保持高质量而付出的合理代价，确保兼容性和可用性。"
      },
      {
        question: "我的照片会被上传吗？",
        answer: "绝对不会。所有转换都在您的浏览器本地完成，照片数据不会离开您的设备。这是我们的核心隐私保护特性，确保您的照片 100% 安全。"
      },
      {
        question: "支持哪些 HEIC 格式？",
        answer: "支持标准的 HEIC 格式（基于 HEVC 编码）。如果您的 HEIC 文件使用了特殊编码或包含加密，可能无法转换。大多数 iPhone、iPad 拍摄的 HEIC 照片都可以正常转换。"
      },
      {
        question: "转换后的 JPG 可以用于商业用途吗？",
        answer: "可以。您拥有转换后照片的完全使用权，我们不会添加任何水印或限制。无论是个人使用还是商业用途，都可以自由使用。"
      }
    ]
  } : {
    whyChooseSection: {
      title: "Why Need HEIC to JPG Converter?",
      content: `HEIC (High Efficiency Image Container) is the next-generation image format adopted by Apple starting from iOS 11, based on HEVC (H.265) video coding standard. While HEIC format excels in compression efficiency, its compatibility issues create difficulties for cross-platform usage.

**Advantages of HEIC Format**
- **Efficient Compression**: File size 40-50% smaller than JPG at same quality level
- **High Quality**: Supports 16-bit color depth with richer color representation
- **Advanced Features**: Supports Live Photo, depth information, transparency and more
- **Space Saving**: iPhone users can store more photos

**HEIC Compatibility Dilemma**
Despite its technical advantages, HEIC faces practical inconveniences:
- **Poor Windows Compatibility**: Older Windows 10 and earlier cannot open directly
- **Limited Android Support**: Some Android devices don't support HEIC format
- **Low Web Compatibility**: Most websites and social media platforms don't accept HEIC uploads
- **Printing Difficulties**: Print shops and online printing services typically require JPG format

**Our Solution**
FastTool HEIC to JPG Converter uses advanced browser-side decoding technology to provide:
- **Local Conversion**: No software or plugins needed - browser completes conversion
- **Fast & Efficient**: Leverages modern browser decoding capabilities for instant conversion
- **Privacy Protection**: Photos never uploaded to any server - 100% local processing
- **High Quality Output**: Preserves original EXIF information (shooting time, GPS, etc.) and image quality

**Target Users**
- iPhone/iPad users needing to share photos across platforms
- Need to view or edit iOS photos on Windows computers
- Want to upload photos to social media, websites, or print shops
- Need to share photos with friends using Android devices`
    },
    technicalDetails: {
      title: "HEIC to JPG Conversion Technology Principles",
      content: `HEIC to JPG conversion is the process of transforming efficient image format to universal format, involving two key steps: image decoding and re-encoding.

**HEIC Format Technical Analysis**

**HEIC Encoding Structure**:
HEIC is based on HEVC (High Efficiency Video Coding, also known as H.265) intra-frame coding technology:
- **Intra Prediction**: Compresses using spatial correlations within the image
- **Transform Coding**: Uses Discrete Cosine Transform (DCT) to convert image to frequency domain
- **Entropy Coding**: Uses CABAC (Context-Adaptive Binary Arithmetic Coding) for further compression
- **Multiple Reference Frames**: Can use multiple reference frames for prediction

**HEIC Advantages**:
- Supports 10-bit and 12-bit color depth (JPG only supports 8-bit)
- Supports wide color gamut (P3, Rec.2020, etc.)
- Supports Alpha channel (transparency)
- Supports image sequences (Live Photo)
- Supports depth maps and auxiliary images

**Conversion Process**

**1. HEIC Decoding Phase**
- **File Parsing**: Read HEIC file's container structure to extract encoded data
- **Entropy Decoding**: Decode CABAC-encoded bitstream into transform coefficients
- **Inverse Transform**: Convert frequency domain data back to spatial domain through inverse DCT
- **Prediction Reconstruction**: Reconstruct pixel values based on intra-prediction modes
- **Color Space Conversion**: Convert from YUV color space to RGB

**2. JPG Encoding Phase**
- **Color Space Conversion**: Convert from RGB to YCbCr (JPG standard color space)
- **Block Processing**: Divide image into 8x8 or 16x16 blocks
- **DCT Transform**: Apply discrete cosine transform to each block
- **Quantization**: Compress high-frequency components using quantization tables (key step in lossy compression)
- **Entropy Encoding**: Further compress using Huffman coding or arithmetic coding
- **Add Metadata**: Embed EXIF information (shooting parameters, time, GPS, etc.)

**Browser-Side Implementation Technology**

**Technical Challenges**:
HEIC is a patented encoding format that browsers don't natively support decoding. We use the following solution:
- **heic2any Library**: Uses libheif library compiled with WebAssembly
- **Canvas Rendering**: Draws decoded pixel data to Canvas
- **toBlob Export**: Uses Canvas's toBlob method to export as JPG

**Implementation Flow**:
\`\`\`javascript
// 1. Decode HEIC using heic2any
const blob = await heic2any({
  blob: heicFile,
  toType: "image/jpeg",
  quality: 0.92
});

// 2. Create Image object to load decoded data
const img = new Image();
img.src = URL.createObjectURL(blob);

// 3. Draw to Canvas and export
const canvas = document.createElement('canvas');
canvas.width = img.width;
canvas.height = img.height;
const ctx = canvas.getContext('2d');
ctx.drawImage(img, 0, 0);
const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.92);
\`\`\`

**EXIF Information Preservation**

EXIF (Exchangeable Image File Format) contains important shooting metadata:
- Shooting time, camera model, lens parameters
- Aperture, shutter speed, ISO sensitivity
- Focal length, metering mode, white balance
- GPS geographic location information (if included in original)

Our tool preserves EXIF information during conversion as much as possible, but some HEIC-specific metadata (like depth maps, Live Photo information) cannot be preserved in JPG format.

**Quality Optimization Strategy**

- **High Quality Parameters**: Default 92% JPG quality balances quality and file size
- **Color Depth Adaptation**: Correctly maps HEIC's 10/12-bit color depth to JPG's 8-bit
- **Color Gamut Conversion**: Correctly converts from P3 wide gamut to sRGB standard gamut
- **Metadata Preservation**: Preserves complete EXIF information for easy management and editing`
    },
    useCases: [
      { title: "Cross-Platform Sharing", description: "Convert HEIC photos from iPhone to JPG for easy sharing with Windows or Android users" },
      { title: "Social Media Upload", description: "Convert photos to JPG format to ensure smooth uploading to WeChat, Weibo, Facebook, Instagram, etc." },
      { title: "Website Compatibility", description: "Convert HEIC photos to JPG before uploading to websites, blogs, or forums for normal viewing by all visitors" },
      { title: "Photo Printing", description: "Print shops typically require JPG format - convert for direct use in photo printing and ID photo services" },
      { title: "Document Insertion", description: "JPG format has best compatibility when inserting photos into Word, PowerPoint, and other documents" },
      { title: "Backup & Archiving", description: "Batch convert HEIC photos to JPG before backup to ensure long-term readability and compatibility" }
    ],
    tips: [
      "iPhone users can change shooting format to 'Most Compatible' in Settings > Photos to shoot in JPG directly",
      "When exporting photos from iPhone to computer, select 'Automatically Convert' in Import settings to transfer as JPG",
      "HEIC to JPG conversion loses some advanced features (Live Photo, depth information), but main image quality is nearly identical",
      "If photos contain important EXIF information (like GPS), check if it's completely preserved after conversion",
      "When batch converting, test with one photo first to confirm results before processing all",
      "Converted JPG files will be about 40-50% larger than original HEIC - this is normal"
    ],
    faq: [
      {
        question: "Why do I need to convert HEIC format?",
        answer: "HEIC is Apple's next-generation image format with high compression efficiency but poor compatibility. Older Windows versions, Android devices, most websites and social media platforms don't support HEIC. Converting to JPG ensures normal viewing and usage across all devices and platforms."
      },
      {
        question: "Will conversion affect image quality?",
        answer: "HEIC to JPG conversion causes some quality loss since JPG is a lossy format. However, we use high-quality conversion parameters (92% quality), making differences nearly imperceptible to the naked eye. Main losses are in color depth (from 10/12-bit to 8-bit) and wide color gamut (from P3 to sRGB)."
      },
      {
        question: "Will EXIF information be preserved?",
        answer: "Yes, we preserve complete EXIF information including shooting time, camera parameters, GPS location, etc. However, HEIC-specific metadata (depth maps, Live Photo information, auxiliary images) cannot be preserved in JPG format."
      },
      {
        question: "Do you support Live Photo conversion?",
        answer: "Live Photo contains both a still image and video. Our tool only converts the still image portion to JPG. To extract the video portion of Live Photo, you'll need a dedicated Live Photo extraction tool."
      },
      {
        question: "Can I convert images in batch?",
        answer: "Yes, the tool supports uploading and converting multiple HEIC images simultaneously. You can select all photos needing conversion at once, and the tool will process them sequentially with individual downloads. Batch conversion greatly improves work efficiency."
      },
      {
        question: "How large will converted files be?",
        answer: "JPG files are typically about 40-50% larger than original HEIC. For example, a 2MB HEIC photo becomes about 3MB after conversion. This is a reasonable tradeoff for maintaining high quality, compatibility, and usability."
      },
      {
        question: "Will my photos be uploaded?",
        answer: "Absolutely not. All conversion happens locally in your browser - photo data never leaves your device. This is our core privacy protection feature, ensuring 100% security of your photos."
      },
      {
        question: "Which HEIC formats are supported?",
        answer: "We support standard HEIC format (based on HEVC encoding). If your HEIC file uses special encoding or is encrypted, it may not convert. Most HEIC photos shot on iPhone and iPad will convert normally."
      },
      {
        question: "Can converted JPG images be used commercially?",
        answer: "Yes. You have full usage rights to converted images. We don't add any watermarks or restrictions. Free to use for both personal and commercial purposes."
      }
    ]
  };

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "HEIC 转 JPG 转换器" : "HEIC to JPG Converter"}
      description={
        params.locale === "zh"
          ? "将苹果 HEIC 格式快速转换为 JPG 格式，浏览器本地处理，保护隐私，兼容所有设备和平台。"
          : "Quickly convert Apple HEIC format to JPG with browser-side processing for privacy and universal compatibility."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 heic2any 库和 Canvas API 进行 HEIC 格式转换，无需安装软件或插件，在不上传原图的前提下完成转换，保留 EXIF 信息和画质。适合处理 iPhone、iPad 拍摄的照片，解决跨平台分享和兼容性问题。"
          : "This tool uses browser-side heic2any library and Canvas API to convert HEIC format without installing software or plugins. Completes conversion without uploading originals while preserving EXIF information and quality. Perfect for processing photos from iPhone/iPad to solve cross-platform sharing and compatibility issues."
      }
      howToSteps={
        params.locale === "zh"
          ? ["点击上传区域或拖拽 HEIC 图片到页面，支持单张或多张上传", "工具会自动开始转换，无需手动操作（或点击开始转换按钮）", "等待浏览器完成 HEIC 解码和 JPG 编码，通常只需几秒", "预览转换效果，检查画质和 EXIF 信息是否保留", "满意后点击下载，保存 JPG 图片到本地设备"]
          : ["Click the upload area or drag and drop HEIC images onto the page, supports single or multiple uploads", "The tool will automatically start conversion (or click the Start Conversion button)", "Wait for the browser to complete HEIC decoding and JPG encoding - typically just seconds", "Preview conversion results to check if quality and EXIF information are preserved", "Click download to save JPG images to your device"]
      }
      howToDetail={
        params.locale === "zh"
          ? "提示：HEIC 转 JPG 后文件会大约 40-50%。转换过程保留 EXIF 信息（拍摄时间、GPS 等），但 HEIC 特有的 Live Photo、深度图等信息无法保留。"
          : "Tip: JPG files will be about 40-50% larger after HEIC conversion. EXIF information (shooting time, GPS, etc.) is preserved, but HEIC-specific features like Live Photo and depth maps cannot be retained."
      }
      whyChooseSection={detailedContent.whyChooseSection}
      technicalDetails={detailedContent.technicalDetails}
      useCases={detailedContent.useCases}
      tips={detailedContent.tips}
      faq={detailedContent.faq}
    >
      <HeicToJpgTool locale={params.locale} />
    </ToolLayout>);
}
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
    title: params.locale === "zh" ? "图片转 WEBP - 免费在线工具" : "Image to WEBP Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将图片格式转换为 WEBP，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert images to WEBP format online with browser-side processing for speed and privacy."
  };
}


export default function ImageToWebpPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const isZh = params.locale === "zh";
  
  // 为图片转 WebP 工具添加详细内容
  const detailedContent = isZh ? {
    whyChooseSection: {
      title: "为什么选择 WebP 格式？",
      content: `WebP 是 Google 于 2010 年推出的现代图片格式，专为互联网优化设计。它采用先进的视频编码技术，在保持高质量的同时实现极致的压缩率，已成为现代网页性能优化的标准选择。

**WebP 的核心优势**
- **卓越的压缩率**：相比 JPG，文件体积平均减小 25-35%，而画质相当甚至更好
- **先进的编码技术**：基于 VP8 视频编码的帧内压缩，使用预测编码、离散余弦变换等先进技术
- **多功能支持**：同时支持有损压缩、无损压缩、透明通道（Alpha）和动画
- **广泛的兼容性**：所有现代浏览器（Chrome、Firefox、Edge、Safari 14+）原生支持
- **性能优化**：更小的文件意味着更快的加载速度、更少的带宽消耗、更好的 SEO 排名

**为什么需要转换工具**
尽管 WebP 优势明显，但实际使用中仍面临挑战：
- **源图片格式多样**：相机照片多为 JPG/JPEG，设计稿常用 PNG，需要统一转换为 WebP
- **批量处理需求**：网站通常有大量图片，需要高效的批量转换工具
- **质量把控**：需要在压缩率和画质之间找到最佳平衡点

**FastTool 的解决方案**
FastTool 图片转 WebP 工具采用先进的浏览器端技术，为您提供：
- **本地转换架构**：基于 HTML5 Canvas API，所有转换操作在浏览器中完成，无需上传到服务器
- **高质量输出**：使用最优压缩算法，在减小文件体积的同时保持出色的画质
- **批量转换能力**：可同时转换多张图片，大幅提升工作效率
- **灵活的参数控制**：可自定义输出质量（0-100%），满足不同场景需求

**隐私保护承诺**
我们深知图片可能包含个人隐私或商业机密。FastTool 采用"零上传"架构，您的所有图片从上传到转换完成，整个过程都在本地浏览器中完成：
- 您的图片不会被存储在任何云端
- 您的数据不会被用于任何商业目的
- 您的隐私完全得到保障

**广泛应用场景**
无论是网站优化、电商平台、社交媒体运营，还是博客写作、应用开发、数字营销，FastTool 都能为您提供专业的图片转 WebP 服务，让网页性能优化变得更加简单高效。`
    },
    technicalDetails: {
      title: "WebP 格式技术原理",
      content: `WebP 是一种现代图片格式，采用先进的视频编码技术实现高效的图像压缩。了解其技术原理有助于更好地使用和优化 WebP 图片。

**WebP 编码技术详解**

**1. 有损压缩模式（Lossy Compression）**

WebP 的有损压缩基于 VP8 视频编码的帧内压缩技术，包含以下核心组件：

**预测编码（Predictive Coding）**：
- **空间预测**：利用相邻像素的相关性进行预测
- **预测模式**：支持 4 种亮度预测模式（DC、Horizontal、Vertical、TrueMotion）和 3 种色度预测模式
- **残差编码**：只编码预测值与实际值的差异，大幅减少数据量

**变换编码（Transform Coding）**：
- **4x4 分块**：将图像分割为 4x4 像素的块
- **离散余弦变换（DCT）**：将空间域数据转换到频域
- **能量集中**：将图像能量集中在少数低频系数上

**量化（Quantization）**：
- **量化表**：使用量化表压缩高频分量（人眼不敏感的部分）
- **质量因子**：通过量化参数（QP）控制压缩程度，QP 值越大压缩率越高，画质越低
- **自适应量化**：根据图像内容动态调整量化参数

**熵编码（Entropy Coding）**：
- **概率模型**：使用上下文自适应的概率模型
- **算术编码**：采用高效的算术编码器进一步压缩数据

**2. 无损压缩模式（Lossless Compression）**

WebP 的无损压缩采用多项先进技术：

**预测编码**：
- 利用像素间的空间相关性进行预测
- 只存储预测残差，减少冗余信息

**颜色索引化**：
- 对于颜色较少的图像，使用颜色索引表
- 将 RGB 值映射到索引，减少数据量

**熵编码**：
- 使用 LZ77 算法消除长距离重复
- 应用霍夫曼编码进行最终压缩

**WebP 与 JPG/PNG 对比**

**压缩算法对比**：

**JPG（1992 年）**：
- 基于 DCT 变换编码
- 8x8 分块，使用亮度 - 色度分离（YCbCr）
- 有损压缩，不支持透明
- 压缩率：中等

**PNG（1996 年）**：
- 基于 DEFLATE 算法（LZ77 + 霍夫曼编码）
- 无损压缩，支持透明
- 压缩率：较低（文件较大）

**WebP（2010 年）**：
- 基于 VP8 视频编码技术
- 4x4 分块，使用先进的预测编码
- 同时支持有损和无损压缩
- 压缩率：显著优于 JPG 和 PNG

**实际压缩效果对比**：

**照片类图像（有损压缩）**：
- WebP vs JPG：文件减小 25-35%，画质相当或更好
- 原因：更先进的预测编码和熵编码

**图形类图像（无损压缩）**：
- WebP vs PNG：文件减小 26%
- 原因：更高效的预测和熵编码

**透明图像**：
- WebP vs PNG：文件减小 22%，支持 Alpha 通道
- WebP 优势：同时支持有损压缩 + 透明，PNG 仅支持无损

**转换流程详解**

**1. 图像解码阶段**
- **读取源文件**：解析 JPG、PNG 等格式的编码数据
- **解码还原**：将压缩数据还原为 RGB 像素阵列
- **色彩空间处理**：统一转换为标准 RGB 色彩空间

**2. WebP 编码阶段**
- **分块处理**：将图像分割为 4x4 或 16x16 的宏块
- **预测分析**：对每个块选择最优预测模式
- **变换量化**：应用 DCT 变换和量化
- **熵编码**：使用算术编码或霍夫曼编码
- **帧封装**：按照 WebP 规范封装为 RIFF 容器

**3. 质量优化**
- **SSIM 优化**：使用结构相似性指标评估画质
- **PSNR 控制**：控制峰值信噪比，确保画质
- **视觉优化**：针对人眼视觉特性优化压缩策略

**Canvas API 实现**

我们的工具使用 HTML5 Canvas 的内置能力：

创建 Canvas 元素，加载源图像，绘制到 Canvas 上，然后使用 toBlob 或 toDataURL 方法导出为 WebP 格式。浏览器会自动调用最优的 WebP 编码器。

**技术优势**：
- 利用浏览器原生 WebP 编码支持
- 自动处理色彩空间转换
- 支持可调节的质量参数（0-100%）
- 保留 EXIF 信息（部分浏览器支持）

**性能优化建议**

**质量参数选择**：
- **85-95%**：高质量，适合摄影作品、产品展示
- **75-85%**：平衡质量和体积，适合网页图片
- **60-75%**：注重加载速度，适合缩略图、背景图

**使用场景建议**：
- **JPG 源图**：转换为有损 WebP，质量 80-90%
- **PNG 源图（图形）**：转换为无损 WebP 或有损 WebP（质量 85-95%）
- **PNG 源图（透明）**：转换为有损或无损 WebP，保留透明通道`
    },
    useCases: [
      { title: "网站性能优化", description: "将网站图片批量转为 WebP，减少 25-35% 的文件体积，显著提升加载速度和 Core Web Vitals 评分" },
      { title: "电商平台", description: "将海量商品图片转为 WebP，降低带宽成本，提升用户浏览体验，减少跳出率" },
      { title: "博客和媒体网站", description: "将文章配图转为 WebP，加快页面加载，提升 SEO 排名和用户留存率" },
      { title: "移动应用", description: "将 App 内图片资源转为 WebP，减少安装包体积，加快内容加载速度" },
      { title: "社交媒体运营", description: "将营销图片转为 WebP，在保持画质的同时减小文件，便于快速上传和分享" },
      { title: "摄影师作品集", description: "将摄影作品转为 WebP，在减小体积的同时保持高质量，提升在线展示效果" }
    ],
    tips: [
      "对于照片类图片，建议使用 85% 左右的质量参数，可在画质和体积间取得最佳平衡",
      "WebP 的有损模式适合照片，无损模式适合图形、Logo、图标等边缘清晰的图像",
      "转换前建议先测试单张图片，找到最适合您图片类型的质量参数",
      "对于透明背景图片，WebP 支持有损压缩 + 透明，比 PNG 的文件小很多",
      "批量转换时，建议按图片类型分组（照片、图形、截图），分别使用不同的质量参数",
      "虽然 WebP 兼容性已很好，但如果需要支持极老旧浏览器，建议同时保留 JPG/PNG 版本"
    ],
    faq: [
      {
        question: "WebP 格式相比 JPG 有什么优势？",
        answer: "WebP 相比 JPG 有显著优势：1) 文件体积平均减小 25-35%，而画质相当甚至更好；2) 采用更先进的 VP8 视频编码技术，压缩效率更高；3) 同时支持有损压缩、无损压缩和透明通道；4) 加载更快，带宽消耗更少，SEO 更友好。JPG 是 1992 年的技术，WebP 是 2010 年的现代格式，技术代差明显。"
      },
      {
        question: "所有浏览器都支持 WebP 吗？",
        answer: "所有现代浏览器都支持 WebP：Chrome（5+）、Firefox（65+）、Edge（18+）、Safari（14+）、Opera（25+）。根据 2024 年的统计数据，全球浏览器对 WebP 的支持率已超过 97%。如果需要支持极老旧的浏览器（如 IE），建议使用<picture>标签提供 WebP 和 JPG 双格式。"
      },
      {
        question: "转换会损失画质吗？",
        answer: "这取决于您选择的模式和质量参数。有损 WebP 会有一定程度的质量损失，但我们使用高质量参数（默认 85-92%），肉眼几乎看不出差异。无损 WebP 完全不会损失画质，但文件会比有损模式大。建议根据使用场景选择合适的模式和质量。"
      },
      {
        question: "支持透明背景吗？",
        answer: "是的，WebP 完整支持 Alpha 通道（透明度）。如果源图片（如 PNG）包含透明背景，转换后的 WebP 会保留透明效果。WebP 的优势是支持有损压缩 + 透明，文件比 PNG 小 22% 左右。"
      },
      {
        question: "转换后文件会变小吗？",
        answer: "是的，这是 WebP 的核心优势。相比 JPG，文件通常减小 25-35%；相比 PNG，文件通常减小 26%（无损模式）或更多（有损模式）。具体压缩效果取决于图片内容、质量参数设置等因素。"
      },
      {
        question: "可以批量转换吗？",
        answer: "是的，工具支持同时上传和转换多张图片。您可以一次选择所有需要转换的图片，工具会依次处理并提供单独下载。批量转换可以大幅提高工作效率，特别适合网站图片优化。"
      },
      {
        question: "我的图片会被上传吗？",
        answer: "绝对不会。所有转换都在您的浏览器本地完成，图片数据不会离开您的设备。这是我们的核心隐私保护特性，确保您的图片 100% 安全。"
      },
      {
        question: "支持哪些输入格式？",
        answer: "支持所有主流图片格式：JPG/JPEG、PNG、BMP、GIF（静态）、WEBP（格式转换）等。无论您的图片是什么格式，都可以转换为 WebP。输出格式统一为 WebP。"
      },
      {
        question: "如何选择合适的质量参数？",
        answer: "质量参数（0-100%）控制压缩程度：90-100% 适合高质量摄影作品；80-90% 适合网页图片、产品展示，平衡画质和体积；70-80% 适合缩略图、背景图，注重加载速度。建议先测试单张图片，找到最适合您需求的参数。"
      },
      {
        question: "转换后的 WebP 可以用于商业用途吗？",
        answer: "可以。您拥有转换后图片的完全使用权，我们不会添加任何水印或限制。无论是个人使用还是商业用途，都可以自由使用。WebP 格式本身也是开放的，无需支付专利费用。"
      }
    ]
  } : {
    whyChooseSection: {
      title: "Why Choose WebP Format?",
      content: `WebP is a modern image format launched by Google in 2010, designed specifically for internet optimization. It uses advanced video encoding technology to achieve extreme compression rates while maintaining high quality, becoming the standard choice for modern web performance optimization.

**Core Advantages of WebP**
- **Exceptional Compression**: Average 25-35% smaller file size than JPG, with comparable or better quality
- **Advanced Encoding Technology**: Based on VP8 video codec's intra-frame compression, using predictive coding, discrete cosine transform, and other advanced techniques
- **Versatile Support**: Simultaneously supports lossy compression, lossless compression, alpha channel (transparency), and animation
- **Wide Compatibility**: Native support in all modern browsers (Chrome, Firefox, Edge, Safari 14+)
- **Performance Optimization**: Smaller files mean faster loading, less bandwidth consumption, better SEO rankings

**Why Need Conversion Tools**
Despite WebP's obvious advantages, practical use faces challenges:
- **Diverse Source Formats**: Camera photos are mostly JPG/JPEG, design files commonly use PNG, need unified conversion to WebP
- **Batch Processing Needs**: Websites typically have large numbers of images, need efficient batch conversion tools
- **Quality Control**: Need to find optimal balance between compression rate and image quality

**FastTool's Solution**
FastTool Image to WebP Converter uses advanced browser-side technology to provide:
- **Local Conversion Architecture**: Based on HTML5 Canvas API, all conversion operations complete in your browser without uploading to servers
- **High Quality Output**: Uses optimal compression algorithms to maintain excellent quality while reducing file size
- **Batch Conversion Capability**: Can convert multiple images simultaneously to greatly improve work efficiency
- **Flexible Parameter Control**: Customizable output quality (0-100%) to meet different scenario needs

**Privacy Protection Commitment**
We understand that images may contain personal privacy or business secrets. FastTool uses a "zero-upload" architecture - from upload to conversion completion, your entire image process happens locally in your browser:
- Your images won't be stored in any cloud
- Your data won't be used for any commercial purposes
- Your privacy is fully protected

**Wide Range of Applications**
Whether it's website optimization, e-commerce platforms, social media operations, blog writing, app development, or digital marketing, FastTool provides professional image to WebP services to make web performance optimization simpler and more efficient.`
    },
    technicalDetails: {
      title: "WebP Format Technology Principles",
      content: `WebP is a modern image format that uses advanced video encoding technology to achieve efficient image compression. Understanding its technical principles helps better use and optimize WebP images.

**WebP Encoding Technology Details**

**1. Lossy Compression Mode**

WebP's lossy compression is based on VP8 video codec's intra-frame compression technology, containing the following core components:

**Predictive Coding**:
- **Spatial Prediction**: Uses correlation of adjacent pixels for prediction
- **Prediction Modes**: Supports 4 luma prediction modes (DC, Horizontal, Vertical, TrueMotion) and 3 chroma prediction modes
- **Residual Encoding**: Only encodes the difference between predicted and actual values, greatly reducing data volume

**Transform Coding**:
- **4x4 Blocking**: Divides image into 4x4 pixel blocks
- **Discrete Cosine Transform (DCT)**: Converts spatial domain data to frequency domain
- **Energy Concentration**: Concentrates image energy on few low-frequency coefficients

**Quantization**:
- **Quantization Table**: Compresses high-frequency components using quantization tables (parts insensitive to human eye)
- **Quality Factor**: Controls compression degree through quantization parameter (QP) - larger QP means higher compression, lower quality
- **Adaptive Quantization**: Dynamically adjusts quantization parameters based on image content

**Entropy Coding**:
- **Probability Model**: Uses context-adaptive probability model
- **Arithmetic Coding**: Employs efficient arithmetic encoder for further compression

**2. Lossless Compression Mode**

WebP's lossless compression uses multiple advanced techniques:

**Predictive Coding**:
- Uses spatial correlation between pixels for prediction
- Only stores prediction residuals, reducing redundant information

**Color Indexing**:
- For images with few colors, uses color index table
- Maps RGB values to indices, reducing data volume

**Entropy Coding**:
- Uses LZ77 algorithm to eliminate long-distance repetition
- Applies Huffman coding for final compression

**WebP vs JPG/PNG Comparison**

**Compression Algorithm Comparison**:

**JPG (1992)**:
- Based on DCT transform coding
- 8x8 blocking, uses luma-chroma separation (YCbCr)
- Lossy compression, no transparency support
- Compression rate: Medium

**PNG (1996)**:
- Based on DEFLATE algorithm (LZ77 + Huffman coding)
- Lossless compression, supports transparency
- Compression rate: Lower (larger files)

**WebP (2010)**:
- Based on VP8 video encoding technology
- 4x4 blocking, uses advanced predictive coding
- Supports both lossy and lossless compression
- Compression rate: Significantly better than JPG and PNG

**Actual Compression Effect Comparison**:

**Photographic Images (Lossy)**:
- WebP vs JPG: 25-35% smaller files, comparable or better quality
- Reason: More advanced predictive coding and entropy coding

**Graphic Images (Lossless)**:
- WebP vs PNG: 26% smaller files
- Reason: More efficient prediction and entropy coding

**Transparent Images**:
- WebP vs PNG: 22% smaller files, supports Alpha channel
- WebP advantage: Supports lossy compression + transparency, PNG only supports lossless

**Detailed Conversion Process**

**1. Image Decoding Phase**
- **Read Source File**: Parse encoded data from JPG, PNG, and other formats
- **Decode Restoration**: Restore compressed data to RGB pixel arrays
- **Color Space Processing**: Uniformly convert to standard RGB color space

**2. WebP Encoding Phase**
- **Blocking**: Divide image into 4x4 or 16x16 macroblocks
- **Prediction Analysis**: Select optimal prediction mode for each block
- **Transform Quantization**: Apply DCT transform and quantization
- **Entropy Coding**: Use arithmetic coding or Huffman coding
- **Frame Encapsulation**: Encapsulate into RIFF container according to WebP specification

**3. Quality Optimization**
- **SSIM Optimization**: Uses Structural Similarity Index to evaluate image quality
- **PSNR Control**: Controls Peak Signal-to-Noise Ratio to ensure quality
- **Visual Optimization**: Optimizes compression strategy based on human visual characteristics

**Canvas API Implementation**

Our tool uses HTML5 Canvas's built-in capabilities:

Create Canvas element, load source image, draw onto Canvas, then export as WebP format using toBlob or toDataURL methods. The browser automatically calls the optimal WebP encoder.

**Technical Advantages**:
- Leverages browser's native WebP encoding support
- Automatically handles color space conversion
- Supports adjustable quality parameters (0-100%)
- Preserves EXIF information (browser-dependent)

**Performance Optimization Suggestions**

**Quality Parameter Selection**:
- **85-95%**: High quality, suitable for photography works, product displays
- **75-85%**: Balances quality and file size, suitable for web images
- **60-75%**: Focuses on loading speed, suitable for thumbnails, background images

**Usage Scenario Suggestions**:
- **JPG Source**: Convert to lossy WebP, quality 80-90%
- **PNG Source (Graphics)**: Convert to lossless WebP or lossy WebP (quality 85-95%)
- **PNG Source (Transparent)**: Convert to lossy or lossless WebP, preserves transparency`
    },
    useCases: [
      { title: "Website Performance Optimization", description: "Batch convert website images to WebP, reducing file size by 25-35%, significantly improving loading speed and Core Web Vitals scores" },
      { title: "E-commerce Platforms", description: "Convert massive product images to WebP, reduce bandwidth costs, improve user browsing experience, reduce bounce rates" },
      { title: "Blogs and Media Sites", description: "Convert article images to WebP, accelerate page loading, improve SEO rankings and user retention" },
      { title: "Mobile Apps", description: "Convert App image resources to WebP, reduce installation package size, accelerate content loading speed" },
      { title: "Social Media Operations", description: "Convert marketing images to WebP, maintain quality while reducing file size for fast upload and sharing" },
      { title: "Photography Portfolios", description: "Convert photography works to WebP, maintain high quality while reducing size, improve online display effects" }
    ],
    tips: [
      "For photographic images, we recommend around 85% quality parameter for best balance between quality and file size",
      "WebP's lossy mode suits photographs, lossless mode suits graphics, logos, icons, and images with clear edges",
      "Before conversion, test with a single image first to find the quality parameter most suitable for your image type",
      "For transparent background images, WebP supports lossy compression + transparency, much smaller than PNG files",
      "When batch converting, we recommend grouping by image type (photos, graphics, screenshots) and using different quality parameters",
      "Although WebP compatibility is already very good, if you need to support very old browsers, consider keeping both JPG/PNG versions"
    ],
    faq: [
      {
        question: "What advantages does WebP have over JPG?",
        answer: "WebP has significant advantages over JPG: 1) Average 25-35% smaller file size with comparable or better quality; 2) Uses more advanced VP8 video encoding technology with higher compression efficiency; 3) Simultaneously supports lossy compression, lossless compression, and transparency; 4) Faster loading, less bandwidth consumption, more SEO-friendly. JPG is 1992 technology, WebP is 2010 modern format - there's a clear technological generation gap."
      },
      {
        question: "Do all browsers support WebP?",
        answer: "All modern browsers support WebP: Chrome (5+), Firefox (65+), Edge (18+), Safari (14+), Opera (25+). According to 2024 statistics, global browser support for WebP has exceeded 97%. If you need to support very old browsers (like IE), we recommend using the <picture> tag to provide both WebP and JPG formats."
      },
      {
        question: "Will conversion affect quality?",
        answer: "It depends on the mode and quality parameter you choose. Lossy WebP will have some quality loss, but we use high-quality parameters (default 85-92%), making differences nearly imperceptible to the naked eye. Lossless WebP causes no quality loss at all, but files will be larger than lossy mode. We recommend choosing the appropriate mode and quality based on your use case."
      },
      {
        question: "Is transparency supported?",
        answer: "Yes, WebP fully supports Alpha channel (transparency). If the source image (like PNG) contains a transparent background, the converted WebP will preserve the transparency effect. WebP's advantage is supporting lossy compression + transparency, with files about 22% smaller than PNG."
      },
      {
        question: "Will files become smaller after conversion?",
        answer: "Yes, this is WebP's core advantage. Compared to JPG, files are typically 25-35% smaller; compared to PNG, files are typically 26% smaller (lossless mode) or even more (lossy mode). Specific compression effects depend on image content, quality parameter settings, and other factors."
      },
      {
        question: "Can I convert images in batch?",
        answer: "Yes, the tool supports uploading and converting multiple images simultaneously. You can select all images needing conversion at once, and the tool will process them sequentially with individual downloads. Batch conversion greatly improves work efficiency, especially for website image optimization."
      },
      {
        question: "Will my images be uploaded?",
        answer: "Absolutely not. All conversion happens locally in your browser - image data never leaves your device. This is our core privacy protection feature, ensuring 100% security of your images."
      },
      {
        question: "Which input formats are supported?",
        answer: "All mainstream image formats are supported: JPG/JPEG, PNG, BMP, GIF (static), WEBP (format conversion), etc. Whatever format your image is, it can be converted to WebP. Output format is uniformly WebP."
      },
      {
        question: "How to choose appropriate quality parameters?",
        answer: "Quality parameters (0-100%) control compression degree: 90-100% suits high-quality photography works; 80-90% suits web images and product displays, balancing quality and file size; 70-80% suits thumbnails and background images, focusing on loading speed. We recommend testing with a single image first to find the parameter most suitable for your needs."
      },
      {
        question: "Can converted WebP images be used commercially?",
        answer: "Yes. You have full usage rights to converted images. We don't add any watermarks or restrictions. Free to use for both personal and commercial purposes. WebP format itself is also open and requires no patent fees."
      }
    ]
  };

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片转 WebP 转换器 - Google 现代格式" : "Image to WebP Converter - Modern Google Format"}
      description={
        params.locale === "zh"
          ? "免费在线将 JPG/PNG 等格式转换为 WebP，文件减小 25-35%，浏览器本地处理保护隐私。"
          : "Free online converter to convert JPG/PNG and more to WebP. 25-35% smaller files. Browser-side processing for privacy."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行图片到 WebP 的格式转换，无需安装软件或插件，在不上传原图的前提下完成转换。支持批量转换、质量参数可调（0-100%），适合网站优化、电商平台、博客媒体等多种场景。WebP 是 Google 推出的现代图片格式，比 JPG 平均减小 25-35% 文件体积。"
          : "This tool uses browser-side Canvas API to convert images to WebP format without installing software or plugins. Completes conversion without uploading originals. Supports batch conversion and adjustable quality parameters (0-100%). Perfect for website optimization, e-commerce platforms, blogs, media, and more. WebP is a modern image format launched by Google, averaging 25-35% smaller file size than JPG."
      }
      howToSteps={
        params.locale === "zh"
          ? ["点击上传区域或拖拽图片到页面，支持 JPG、PNG、BMP 等多种格式", "可选择输出质量参数（默认 85%，范围 0-100%），数值越高画质越好但文件越大", "工具会自动开始转换，无需手动操作（或点击开始转换按钮）", "等待浏览器完成解码和 WebP 编码，通常只需 1-3 秒", "预览转换效果，可查看文件大小和画质变化", "满意后点击下载，保存 WebP 图片到本地设备"]
          : ["Click the upload area or drag and drop images onto the page, supports JPG, PNG, BMP, and more", "Optionally select output quality parameter (default 85%, range 0-100%) - higher values mean better quality but larger files", "The tool will automatically start conversion (or click the Start Conversion button)", "Wait for the browser to complete decoding and WebP encoding - typically just 1-3 seconds", "Preview conversion results to check file size and quality changes", "Click download to save WebP images to your device"]
      }
      howToDetail={
        params.locale === "zh"
          ? "提示：WebP 格式通常比 JPG 小 25-35%，比 PNG 小 26% 左右。推荐质量参数：照片 80-90%，图形/图标 85-95%，缩略图 70-80%。批量转换前建议先测试单张图片找到最佳参数。"
          : "Tip: WebP format is typically 25-35% smaller than JPG and about 26% smaller than PNG. Recommended quality parameters: 80-90% for photos, 85-95% for graphics/icons, 70-80% for thumbnails. Test with a single image before batch converting to find optimal parameters."
      }
      whyChooseSection={detailedContent.whyChooseSection}
      technicalDetails={detailedContent.technicalDetails}
      useCases={detailedContent.useCases}
      tips={detailedContent.tips}
      faq={detailedContent.faq}
    >
      <ImageConverterTool locale={params.locale} targetFormat="webp" mimeType="image/webp" />
    </ToolLayout>);
}
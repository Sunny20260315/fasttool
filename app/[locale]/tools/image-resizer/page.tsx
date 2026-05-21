import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const ImageResizerTool = dynamic(
  () =>
    import("@/components/tools/ImageResizerTool").then((module) => ({
      default: module.ImageResizerTool,
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
        ? "图片尺寸调整 - 免费在线工具"
        : "Image Resizer | Online Free Image Resizing Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线调整图片尺寸，支持百分比缩放、预设尺寸和自定义尺寸，浏览器本地处理保护隐私。"
        : "Resize images online with percentage scaling, preset sizes, and custom dimensions. Browser-side processing for privacy.",
  };
}

export default function ImageResizerPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const isZh = params.locale === "zh";

  // 为图片调整大小工具添加详细内容
  const detailedContent = isZh
    ? {
        whyChooseSection: {
          title: "为什么选择 FastTool 图片尺寸调整工具？",
          content: `在数字化时代，图片尺寸调整是每个人的日常需求。无论是社交媒体发布、网站优化，还是打印输出，都需要特定尺寸的图片。FastTool 图片尺寸调整工具采用先进的浏览器端技术，为您提供精准、快速、安全的图片缩放服务。

**核心优势**
- **本地处理架构**：基于 HTML5 Canvas API，所有调整操作在浏览器中完成，无需上传到服务器
- **多种调整模式**：支持百分比缩放、自定义尺寸、预设尺寸三种模式，满足不同需求
- **智能宽高比保护**：自动保持原始图片比例，避免图片变形失真
- **批量处理能力**：可同时调整多张图片尺寸，大幅提升工作效率
- **格式转换支持**：调整尺寸的同时可以转换图片格式，一举两得

**隐私保护承诺**
我们深知图片可能包含个人隐私或商业机密。FastTool 采用"零上传"架构，您的所有图片从上传到调整完成，整个过程都在本地浏览器中完成：
- 您的图片不会被存储在任何云端
- 您的数据不会被用于任何商业目的
- 您的隐私完全得到保障

**广泛应用场景**
无论是社交媒体运营、电商产品拍摄、网站内容制作，还是个人照片管理，FastTool 都能为您提供专业的图片尺寸调整服务，让图片处理变得更加简单高效。`,
        },
        technicalDetails: {
          title: "图片尺寸调整技术原理",
          content: `图片尺寸调整（Resizing）是改变图片像素尺寸的技术过程。这涉及到数字图像的重新采样和插值计算，是图像处理的基础操作之一。

**数字图像基础**

数字图像由像素点阵组成，每个像素包含颜色信息：
- **分辨率**：图片的宽度和高度（以像素为单位），如 1920x1080
- **像素密度**：每英寸的像素数（PPI），影响打印质量
- **宽高比**：宽度与高度的比例，如 16:9、4:3、1:1
- **总像素数**：宽度 × 高度，决定图片的细节程度

**尺寸调整算法**

**1. 缩小图片（Downsampling）**
缩小图片需要移除像素，关键是如何选择保留哪些像素：
- **最近邻插值**：选择最接近的源像素，速度快但可能产生锯齿
- **双线性插值**：使用周围 4 个像素的加权平均，效果平滑
- **双三次插值**：使用周围 16 个像素，效果更好但计算更复杂
- **Lanczos 重采样**：使用更复杂的核函数，质量最高但速度最慢

我们的工具使用 Canvas 内置的双线性或双三次插值，在质量和速度间取得平衡。

**2. 放大图片（Upsampling）**
放大图片需要创建新的像素，通过插值算法"猜测"新像素的颜色：
- **插值原理**：根据周围已知像素的颜色，计算新像素的颜色值
- **局限性**：放大无法创造原始图像中不存在的细节，过度放大会导致模糊
- **最佳实践**：建议放大不超过原图的 200%，否则质量下降明显

**3. 宽高比保持**
保持宽高比是避免图片变形的关键：
- **计算公式**：新高度 = 新宽度 / 原始宽高比
- **自动锁定**：修改宽度时自动计算高度，反之亦然
- **自由调整**：如需要，可以解除锁定进行自由调整

**Canvas API 实现**

我们的工具使用 HTML5 Canvas 的 drawImage() 方法实现高效缩放：
- **硬件加速**：利用 GPU 加速，速度快
- **自动插值**：浏览器自动选择最优插值算法
- **质量可控**：通过 toDataURL 的 quality 参数控制输出质量

**预设尺寸标准**

我们提供常用预设尺寸，基于行业标准：
- **Full HD (1920x1080)**：16:9 宽高比，主流显示器和视频标准
- **HD (1280x720)**：16:9 宽高比，高清视频标准
- **Instagram 方形 (1080x1080)**：1:1 宽高比，Instagram 标准方形格式
- **Instagram 竖版 (1080x1350)**：4:5 宽高比，Instagram 人像模式
- **Twitter 帖子 (1200x675)**：16:9 宽高比，Twitter 推荐尺寸
- **Facebook 帖子 (1200x630)**：1.91:1 宽高比，Facebook 推荐尺寸`,
        },
        useCases: [
          {
            title: "社交媒体发布",
            description: "调整图片到各平台推荐尺寸，确保最佳展示效果和加载速度",
          },
          {
            title: "网站优化",
            description:
              "缩小图片尺寸以减少文件大小，提升网页加载速度和 SEO 排名",
          },
          {
            title: "电商产品图",
            description: "统一产品图片尺寸，打造专业的店铺形象和一致的视觉体验",
          },
          {
            title: "打印输出",
            description:
              "调整图片分辨率和尺寸到打印要求，确保打印质量和尺寸准确",
          },
          {
            title: "头像制作",
            description:
              "将照片调整为标准头像尺寸，用于社交媒体、论坛、工作系统等",
          },
          {
            title: "壁纸定制",
            description:
              "根据设备屏幕分辨率调整图片，制作个性化的手机或电脑壁纸",
          },
        ],
        tips: [
          "缩小图片不会明显损失画质，但放大图片会导致模糊，建议适度放大（不超过 200%）",
          "社交媒体发布前，先了解平台的推荐尺寸，可以避免自动压缩导致的质量损失",
          "保持宽高比可以避免图片变形，除非特殊需求否则建议勾选此选项",
          "对于包含文字的图片，缩小后可能变模糊，建议适度锐化或使用更高的输出质量",
          "批量调整时，建议先测试一张图片确认效果，再处理全部图片",
          "PNG 格式适合包含文字或透明背景的图片，JPG 适合照片类图片",
        ],
        faq: [
          {
            question: "调整尺寸会损失画质吗？",
            answer:
              "缩小图片通常不会明显损失画质，现代插值算法能很好地保留细节。放大图片会导致一定程度的模糊，因为算法需要‘猜测’新像素的颜色。建议放大不超过原图的 200%，并通过提高输出质量参数来补偿。",
          },
          {
            question: "如何保持原始宽高比？",
            answer:
              "勾选保持宽高比选项后，修改宽度或高度时会自动计算另一个值以保持比例。这是避免图片变形的最佳实践，除非您需要进行自由裁剪或特殊比例调整。",
          },
          {
            question: "支持哪些预设尺寸？",
            answer:
              "我们提供常用预设：Full HD (1920x1080)、HD (1280x720)、Instagram 方形 (1080x1080)、Instagram 竖版 (1080x1350)、Twitter 帖子 (1200x675)、Facebook 帖子 (1200x630) 等主流社交媒体尺寸。",
          },
          {
            question: "图片会上传到服务器吗？",
            answer:
              "绝对不会。所有调整操作都在您的浏览器本地完成，图片数据不会离开您的设备。这是我们的核心隐私保护特性，确保您的图片 100% 安全。",
          },
          {
            question: "可以调整图片的 DPI 吗？",
            answer:
              "DPI（每英寸点数）主要用于打印。我们的工具调整的是像素尺寸，打印时会根据 DPI 自动计算实际尺寸。如需特定打印尺寸，建议同时考虑像素尺寸和目标 DPI。",
          },
          {
            question: "为什么放大后的图片变模糊了？",
            answer:
              "放大图片需要创建新的像素，这些像素的颜色是通过插值算法‘猜测’的，无法创造原图中不存在的细节。这是数字图像处理的固有局限。建议尽量使用等于或大于目标尺寸的源图片。",
          },
          {
            question: "支持批量调整吗？",
            answer:
              "是的，工具支持同时上传和调整多张图片。您可以一次选择所有需要调整的图片，工具会依次处理并提供单独下载。批量调整可以大幅提高工作效率。",
          },
          {
            question: "调整后的图片可以用于商业用途吗？",
            answer:
              "可以。您拥有调整后图片的完全使用权，我们不会添加任何水印或限制。无论是个人使用还是商业用途，都可以自由使用。",
          },
        ],
      }
    : {
        whyChooseSection: {
          title: "Why Choose FastTool Image Resizer?",
          content: `In the digital age, image resizing is a daily need for everyone. Whether it's social media posting, website optimization, or print output, specific image sizes are required. FastTool Image Resizer uses advanced browser-side technology to provide you with precise, fast, and secure image scaling services.

**Core Advantages**
- **Local Processing Architecture**: Based on HTML5 Canvas API, all resizing operations complete in your browser without uploading to servers
- **Multiple Resize Modes**: Supports percentage scaling, custom dimensions, and preset sizes to meet different needs
- **Smart Aspect Ratio Protection**: Automatically maintains original image proportions to avoid distortion
- **Batch Processing Capability**: Can resize multiple images simultaneously to greatly improve work efficiency
- **Format Conversion Support**: Convert image format while resizing - kill two birds with one stone

**Privacy Protection Commitment**
We understand that images may contain personal privacy or business secrets. FastTool uses a "zero-upload" architecture - from upload to resizing completion, your entire image process happens locally in your browser:
- Your images won't be stored in any cloud
- Your data won't be used for any commercial purposes
- Your privacy is fully protected

**Wide Range of Applications**
Whether it's social media operations, e-commerce product photography, website content production, or personal photo management, FastTool provides professional image resizing services to make image processing simpler and more efficient.`,
        },
        technicalDetails: {
          title: "Image Resizing Technology Principles",
          content: `Image resizing is the technical process of changing an image's pixel dimensions. This involves resampling and interpolation calculations of digital images, one of the fundamental operations in image processing.

**Digital Image Basics**

Digital images consist of pixel arrays, with each pixel containing color information:
- **Resolution**: Image width and height (in pixels), e.g., 1920x1080
- **Pixel Density**: Pixels per inch (PPI), affects print quality
- **Aspect Ratio**: Ratio of width to height, e.g., 16:9, 4:3, 1:1
- **Total Pixels**: Width × Height, determines image detail level

**Resizing Algorithms**

**1. Downsampling (Reducing Size)**
Reducing image size requires removing pixels - the key is selecting which pixels to keep:
- **Nearest Neighbor**: Selects closest source pixel, fast but may produce jagged edges
- **Bilinear Interpolation**: Uses weighted average of 4 surrounding pixels, smooth results
- **Bicubic Interpolation**: Uses 16 surrounding pixels, better quality but more complex
- **Lanczos Resampling**: Uses more complex kernel function, highest quality but slowest

Our tool uses Canvas's built-in bilinear or bicubic interpolation, balancing quality and speed.

**2. Upsampling (Enlarging)**
Enlarging images requires creating new pixels by "guessing" colors through interpolation:
- **Interpolation Principle**: Calculates new pixel colors based on surrounding known pixels
- **Limitations**: Enlargement cannot create details that don't exist in the original - excessive enlargement leads to blurriness
- **Best Practice**: Recommend enlarging no more than 200% of original size to avoid obvious quality degradation

**3. Aspect Ratio Maintenance**
Maintaining aspect ratio is key to avoiding image distortion:
- **Calculation Formula**: New Height = New Width / Original Aspect Ratio
- **Auto-Lock**: Automatically calculates the other dimension when modifying width or height
- **Free Adjustment**: Can unlock for free adjustment if needed

**Canvas API Implementation**

Our tool uses HTML5 Canvas's drawImage() method for efficient scaling:
- **Hardware Acceleration**: Utilizes GPU acceleration for fast processing
- **Automatic Interpolation**: Browser automatically selects optimal interpolation algorithm
- **Controllable Quality**: Controls output quality through toDataURL's quality parameter

**Preset Size Standards**

We provide common preset sizes based on industry standards:
- **Full HD (1920x1080)**: 16:9 aspect ratio, mainstream monitor and video standard
- **HD (1280x720)**: 16:9 aspect ratio, HD video standard
- **Instagram Square (1080x1080)**: 1:1 aspect ratio, Instagram standard square format
- **Instagram Portrait (1080x1350)**: 4:5 aspect ratio, Instagram portrait mode
- **Twitter Post (1200x675)**: 16:9 aspect ratio, Twitter recommended size
- **Facebook Post (1200x630)**: 1.91:1 aspect ratio, Facebook recommended size`,
        },
        useCases: [
          {
            title: "Social Media Posting",
            description:
              "Resize images to platform-recommended dimensions for optimal display and loading speed",
          },
          {
            title: "Website Optimization",
            description:
              "Reduce image dimensions to decrease file size, improve page loading speed and SEO rankings",
          },
          {
            title: "E-commerce Product Images",
            description:
              "Unify product image sizes for professional store appearance and consistent visual experience",
          },
          {
            title: "Print Output",
            description:
              "Adjust image resolution and size to print requirements for accurate quality and dimensions",
          },
          {
            title: "Avatar Creation",
            description:
              "Resize photos to standard avatar sizes for social media, forums, work systems, etc.",
          },
          {
            title: "Wallpaper Customization",
            description:
              "Adjust images to device screen resolutions for personalized phone or computer wallpapers",
          },
        ],
        tips: [
          "Reducing image size won't significantly affect quality, but enlarging may cause blurriness - recommend moderate enlargement (under 200%)",
          "Before posting to social media, check platform-recommended sizes to avoid quality loss from automatic compression",
          "Maintaining aspect ratio prevents distortion - check this option unless you need free cropping or special ratios",
          "For images with text, they may become blurry after reduction - consider moderate sharpening or higher output quality",
          "When batch processing, test with one image first to confirm results before processing all",
          "PNG format suits images with text or transparency; JPG is better for photographs",
        ],
        faq: [
          {
            question: "Will resizing affect image quality?",
            answer:
              "Reducing image size typically doesn't noticeably affect quality - modern interpolation algorithms preserve details well. Enlarging images causes some blurriness as the algorithm needs to 'guess' new pixel colors. Recommend enlarging no more than 200% of original size, and compensate by increasing output quality parameters.",
          },
          {
            question: "How to maintain original aspect ratio?",
            answer:
              "After checking the 'Maintain aspect ratio' option, modifying width or height will automatically calculate the other value to maintain proportions. This is best practice to avoid distortion, unless you need free cropping or special ratio adjustments.",
          },
          {
            question: "What preset sizes are available?",
            answer:
              "We provide common presets: Full HD (1920x1080), HD (1280x720), Instagram Square (1080x1080), Instagram Portrait (1080x1350), Twitter Post (1200x675), Facebook Post (1200x630), and other mainstream social media sizes.",
          },
          {
            question: "Are images uploaded to your servers?",
            answer:
              "Absolutely not. All resizing operations happen locally in your browser - image data never leaves your device. This is our core privacy protection feature, ensuring 100% security of your images.",
          },
          {
            question: "Can I adjust image DPI?",
            answer:
              "DPI (dots per inch) is primarily for printing. Our tool adjusts pixel dimensions, which will automatically calculate actual print size based on DPI. For specific print sizes, consider both pixel dimensions and target DPI.",
          },
          {
            question: "Why does my enlarged image look blurry?",
            answer:
              "Enlarging images requires creating new pixels whose colors are 'guessed' by interpolation algorithms - they cannot create details that don't exist in the original. This is an inherent limitation of digital image processing. Recommend using source images equal to or larger than target size.",
          },
          {
            question: "Do you support batch resizing?",
            answer:
              "Yes, the tool supports uploading and resizing multiple images simultaneously. You can select all images needing adjustment at once, and the tool will process them sequentially with individual downloads. Batch resizing greatly improves work efficiency.",
          },
          {
            question: "Can resized images be used commercially?",
            answer:
              "Yes. You have full usage rights to resized images. We don't add any watermarks or restrictions. Free to use for both personal and commercial purposes.",
          },
        ],
      };

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片尺寸调整工具" : "Image Resizer"}
      description={
        params.locale === "zh"
          ? "快速调整图片尺寸，支持百分比/自定义尺寸/预设尺寸多种模式，浏览器本地处理保护隐私。"
          : "Quickly resize images with multiple modes: percentage, custom dimensions, or presets. Browser-side processing for privacy."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器 Canvas API 进行图片尺寸调整，无需上传到服务器即可修改图片的宽度和高度。支持保持原始宽高比、选择预设尺寸（如 Full HD、Instagram 等），并可调整输出格式和质量，适合社交媒体发布和网站优化。"
          : "This tool uses browser Canvas API to resize images without uploading to servers. Adjust width and height while maintaining aspect ratio, choose from preset sizes (Full HD, Instagram, etc.), and configure output format and quality. Perfect for social media posting and web optimization."
      }
      howToSteps={
        params.locale === "zh"
          ? [
              "点击上传区域或拖拽图片到页面，支持 JPG、PNG、WebP 等格式",
              "选择调整模式：指定尺寸（输入宽高）、百分比（缩放比例）或预设尺寸",
              "设置目标尺寸或缩放比例，可选择是否保持原始宽高比",
              "点击「开始调整」按钮，浏览器将在本地执行调整操作",
              "预览调整效果，满意后点击下载保存到新设备",
            ]
          : [
              "Click the upload area or drag and drop images onto the page, supports JPG, PNG, WebP and more",
              "Choose resize mode: Dimensions (input width/height), Percentage (scale), or Preset size",
              "Set target dimensions or scale percentage, optionally maintain original aspect ratio",
              "Click the 'Start Resizing' button - your browser will perform the resizing locally",
              "Preview the resized image and click download to save to your device",
            ]
      }
      howToDetail={
        params.locale === "zh"
          ? "提示：缩小图片不会明显损失画质，但放大图片（超过原图 200%）会导致模糊。社交媒体发布前，建议先了解平台的推荐尺寸。"
          : "Tip: Reducing image size won't significantly affect quality, but enlarging beyond 200% may cause blurriness. Before posting to social media, check platform-recommended sizes."
      }
      whyChooseSection={detailedContent.whyChooseSection}
      technicalDetails={detailedContent.technicalDetails}
      useCases={detailedContent.useCases}
      tips={detailedContent.tips}
      faq={detailedContent.faq}
    >
      <ImageResizerTool locale={params.locale} />
    </ToolLayout>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const PlaceholderTool = dynamic(() => import("@/components/tools/PlaceholderTool").then((module) => ({ default: module.PlaceholderTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片裁剪 - 免费在线图片裁剪工具 - FastTool" : "Crop Image | Free Online Image Cropping Tool - FastTool",
    description:
      params.locale === "zh"
        ? "免费在线图片裁剪工具，支持自定义裁剪区域、预设比例裁剪，浏览器本地处理保护隐私，无需安装软件。"
        : "Free online image cropping tool supporting custom crop areas and preset aspect ratios. Browser-side processing protects your privacy - no software installation needed."
  };
}


export default function CropImagePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const isZh = params.locale === "zh";
  
  // 为图片裁剪工具添加详细内容
  const detailedContent = isZh ? {
    whyChooseSection: {
      title: "为什么需要图片裁剪工具？",
      content: `在数字化时代，图片裁剪是每个人的日常需求。无论是制作证件照、调整照片构图、裁剪产品图，还是为社交媒体准备图片，都需要精确、便捷的裁剪工具。FastTool 图片裁剪工具采用先进的浏览器端技术，为您提供直观、精准、安全的图片裁剪服务。

**核心优势**
- **本地处理架构**：基于 HTML5 Canvas API，所有裁剪操作在浏览器中完成，无需上传到服务器
- **灵活裁剪模式**：支持自由裁剪、固定比例裁剪、预设尺寸裁剪多种模式
- **实时预览功能**：拖动裁剪框即时预览效果，所见即所得
- **高质量输出**：使用最优插值算法，确保裁剪后的图片质量
- **批量处理能力**：可同时裁剪多张图片，大幅提升工作效率

**隐私保护承诺**
我们深知图片可能包含个人隐私或商业机密。FastTool 采用"零上传"架构，您的所有图片从上传到裁剪完成，整个过程都在本地浏览器中完成：
- 您的图片不会被存储在任何云端
- 您的数据不会被用于任何商业目的
- 您的隐私完全得到保障

**广泛应用场景**
无论是摄影后期、电商美工、社交媒体运营，还是证件照制作、文档插图、个人照片整理，FastTool 都能为您提供专业的图片裁剪服务，让图片编辑变得更加简单高效。`
    },
    technicalDetails: {
      title: "图片裁剪技术原理",
      content: `图片裁剪是从原始图像中选择并提取感兴趣区域的技术过程。这涉及到坐标计算、像素提取和图像重建等关键技术。

**裁剪基础概念**

**裁剪区域定义**：
裁剪区域通常由以下参数定义：
- **起始坐标** (x, y)：裁剪区域左上角在原图中的位置
- **裁剪尺寸** (width, height)：裁剪区域的宽度和高度
- **宽高比** (aspect ratio)：宽度与高度的比例，如 1:1、4:3、16:9

**坐标系系统**：
- **原图坐标系**：以原图左上角为原点 (0, 0)
- **像素单位**：坐标和尺寸都以像素为单位
- **整数化处理**：最终坐标需要取整到像素边界

**裁剪流程详解**

**1. 用户交互阶段**
- **选择裁剪区域**：用户通过鼠标或触摸拖动选择裁剪区域
- **调整裁剪框**：可调整裁剪框大小、位置、旋转角度
- **比例约束**：可选择固定比例（如 1:1 方形、16:9 宽屏）或自由比例
- **实时预览**：拖动过程中实时更新预览效果

**2. 坐标计算阶段**
- **相对坐标转换**：将屏幕坐标转换为图像坐标
- **DPI 适配**：考虑设备像素比（DPR）进行坐标缩放
- **边界检测**：确保裁剪区域不超出原图范围
- **最小尺寸限制**：避免裁剪区域过小导致质量问题

**3. 图像提取阶段**
- **Canvas 绘制**：使用 Canvas 的 drawImage() 方法提取区域
```javascript
// 创建 Canvas 元素
const canvas = document.createElement('canvas');
canvas.width = cropWidth;
canvas.height = cropHeight;

// 获取 2D 上下文
const ctx = canvas.getContext('2d');

// 从原图中提取裁剪区域
ctx.drawImage(
  originalImage,           // 原始图片对象
  sourceX, sourceY,        // 裁剪区域起始坐标
  sourceWidth, sourceHeight, // 裁剪区域尺寸
  0, 0,                    // 目标位置（Canvas 左上角）
  cropWidth, cropHeight    // 目标尺寸
);

// 导出裁剪后的图片
const croppedDataUrl = canvas.toDataURL('image/jpeg', quality);
```

**4. 图像重建阶段**
- **插值处理**：如果裁剪后需要调整尺寸，应用插值算法
- **质量优化**：应用锐化、降噪等后处理
- **格式转换**：可选择输出格式（JPG、PNG、WebP 等）
- **元数据保留**：尽可能保留原图的 EXIF 信息

**预设比例标准**

我们提供常用预设比例，基于行业标准和实际需求：
- **1:1（方形）**：Instagram 方形格式、头像、产品主图
- **4:3（标准）**：传统电视、早期数码相机、iPad 屏幕
- **3:2（经典）**：35mm 胶片、全画幅相机、标准照片
- **16:9（宽屏）**：高清视频、宽屏显示器、YouTube 视频
- **16:10（黄金）**：MacBook 屏幕、部分安卓平板
- **2:3（人像）**：证件照、人像摄影、手机竖屏
- **3:4（竖版）**：Instagram 竖版格式、手机竖屏照片
- **9:16（全屏）**：手机全屏视频、Stories 格式

**高级裁剪功能**

**1. 旋转裁剪**
- **任意角度旋转**：支持 -180° 到 +180° 旋转
- **自动校正**：自动检测并校正倾斜的水平线
- **填充策略**：旋转后空白区域用黑色、白色或透明填充

**2. 智能裁剪**
- **内容识别**：分析图像内容，自动选择最佳裁剪区域
- **主体识别**：识别人脸、建筑等主体，避免裁剪重要内容
- **三分法则**：按照摄影构图三分法则自动裁剪

**3. 批量裁剪**
- **统一尺寸**：对多张图片应用相同的裁剪尺寸和比例
- **自适应裁剪**：根据每张图片内容自动调整裁剪区域
- **高效处理**：利用浏览器并发处理能力快速完成

**质量优化策略**

- **高质量插值**：使用双三次插值或 Lanczos 重采样
- **边缘锐化**：适度锐化补偿裁剪带来的边缘软化
- **抗锯齿处理**：对裁剪边缘进行抗锯齿处理，避免锯齿
- **色彩保真**：确保裁剪前后色彩一致性`
    },
    useCases: [
      { title: "证件照制作", description: "裁剪照片到标准证件照尺寸（如 1 寸、2 寸），用于简历、申请表、证书等" },
      { title: "社交媒体头像", description: "裁剪照片为方形或圆形头像，用于微信、微博、Facebook、LinkedIn 等社交平台" },
      { title: "产品图优化", description: "裁剪电商产品图片，突出产品主体，统一店铺图片风格和尺寸" },
      { title: "照片构图调整", description: "裁剪照片改善构图，应用三分法则，移除干扰元素，突出主体" },
      { title: "视频封面制作", description: "裁剪图片为 16:9 或其他视频封面比例，用于 YouTube、B 站、抖音等平台" },
      { title: "文档插图处理", description: "裁剪图片适配 Word、PPT 等文档版面，提升文档专业性和美观度" }
    ],
    tips: [
      "裁剪前先确定目标用途和所需比例，避免反复裁剪损失画质",
      "人像裁剪时，确保头部上方留有适当空间，避免头顶被切掉",
      "风景照裁剪可应用三分法则，将地平线放在 1/3 位置而非正中间",
      "产品图裁剪建议留白 10-20%，避免产品紧贴边缘",
      "裁剪后的图片如果还要调整大小，建议先裁剪后缩放，顺序不要颠倒",
      "重要内容（如人脸、文字）应放在裁剪区域中心，避免被切掉"
    ],
    faq: [
      {
        question: "裁剪会损失画质吗？",
        answer: "裁剪本身不会损失画质，只是提取原图的一部分。但如果裁剪后还要放大图片，可能会导致画质下降。建议裁剪时使用较高的输出质量参数（90% 以上），并在裁剪前确认好尺寸和比例。"
      },
      {
        question: "支持哪些裁剪比例？",
        answer: "我们支持自由比例裁剪和多种预设比例：1:1（方形）、4:3（标准）、3:2（经典）、16:9（宽屏）、16:10（黄金）、2:3（人像）、3:4（竖版）、9:16（全屏）等。您也可以自定义任意比例。"
      },
      {
        question: "可以旋转裁剪吗？",
        answer: "是的，工具支持旋转裁剪功能。您可以先旋转图片到合适角度，再进行裁剪。这对于校正倾斜的照片特别有用。旋转角度范围为 -180° 到 +180°。"
      },
      {
        question: "裁剪后的图片尺寸是多少？",
        answer: "裁剪后的图片尺寸等于您选择的裁剪区域的像素尺寸。如果您在原图上选择了 800x600 像素的区域，裁剪后的图片就是 800x600 像素。您可以在裁剪过程中实时看到裁剪区域的尺寸。"
      },
      {
        question: "可以批量裁剪吗？",
        answer: "是的，工具支持批量裁剪功能。您可以一次上传多张图片，对每张图片应用相同或不同的裁剪设置。批量裁剪可以大幅提高工作效率，特别适合处理大量图片。"
      },
      {
        question: "我的图片会被上传吗？",
        answer: "绝对不会。所有裁剪操作都在您的浏览器本地完成，图片数据不会离开您的设备。这是我们的核心隐私保护特性，确保您的图片 100% 安全。"
      },
      {
        question: "支持哪些图片格式？",
        answer: "支持所有主流图片格式，包括 JPG、JPEG、PNG、WebP、BMP 等。无论您的图片是什么格式，都可以正常裁剪。输出格式可选择 JPG、PNG 或 WebP。"
      },
      {
        question: "裁剪后可以撤销吗？",
        answer: "可以。在点击"开始裁剪"按钮之前，您可以随时撤销或修改裁剪区域。我们建议先预览裁剪效果，确认满意后再执行裁剪操作。裁剪完成后如需重新裁剪，可重新上传图片。"
      },
      {
        question: "如何确保裁剪精确？",
        answer: "我们提供网格辅助线（三分法、黄金分割等）帮助您精确构图。您还可以放大图片进行精细调整，查看实时尺寸显示，确保裁剪区域精确到像素级别。"
      }
    ]
  } : {
    whyChooseSection: {
      title: "Why Need Image Cropping Tool?",
      content: `In the digital age, image cropping is a daily need for everyone. Whether it's making ID photos, adjusting photo composition, cropping product images, or preparing images for social media, precise and convenient cropping tools are essential. FastTool Image Cropper uses advanced browser-side technology to provide you with intuitive, accurate, and secure image cropping services.

**Core Advantages**
- **Local Processing Architecture**: Based on HTML5 Canvas API, all cropping operations complete in your browser without uploading to servers
- **Flexible Cropping Modes**: Supports free cropping, fixed ratio cropping, and preset size cropping
- **Real-time Preview**: Drag crop area to preview instantly - WYSIWYG
- **High Quality Output**: Uses optimal interpolation algorithms to ensure cropped image quality
- **Batch Processing Capability**: Can crop multiple images simultaneously to greatly improve work efficiency

**Privacy Protection Commitment**
We understand that images may contain personal privacy or business secrets. FastTool uses a "zero-upload" architecture - from upload to cropping completion, your entire image process happens locally in your browser:
- Your images won't be stored in any cloud
- Your data won't be used for any commercial purposes
- Your privacy is fully protected

**Wide Range of Applications**
Whether it's photography post-processing, e-commerce design, social media operations, ID photo production, document illustration, or personal photo organization, FastTool provides professional image cropping services to make image editing simpler and more efficient.`
    },
    technicalDetails: {
      title: "Image Cropping Technology Principles",
      content: `Image cropping is the technical process of selecting and extracting regions of interest from original images. This involves key technologies like coordinate calculation, pixel extraction, and image reconstruction.

**Cropping Basics**

**Crop Area Definition**:
Crop area is typically defined by the following parameters:
- **Starting Coordinates** (x, y): Position of crop area's top-left corner in original image
- **Crop Dimensions** (width, height): Width and height of crop area
- **Aspect Ratio**: Ratio of width to height, such as 1:1, 4:3, 16:9

**Coordinate System**:
- **Original Image Coordinates**: Origin (0, 0) at top-left corner of original image
- **Pixel Units**: Coordinates and dimensions are in pixels
- **Integer Processing**: Final coordinates need to be rounded to pixel boundaries

**Detailed Cropping Process**

**1. User Interaction Phase**
- **Select Crop Area**: User selects crop area via mouse or touch dragging
- **Adjust Crop Box**: Can adjust crop box size, position, rotation angle
- **Ratio Constraints**: Can choose fixed ratios (1:1 square, 16:9 widescreen) or free ratio
- **Real-time Preview**: Updates preview in real-time during dragging

**2. Coordinate Calculation Phase**
- **Relative Coordinate Conversion**: Convert screen coordinates to image coordinates
- **DPI Adaptation**: Scale coordinates based on device pixel ratio (DPR)
- **Boundary Detection**: Ensure crop area doesn't exceed original image bounds
- **Minimum Size Limit**: Avoid quality issues from excessively small crop areas

**3. Image Extraction Phase**
- **Canvas Drawing**: Use Canvas's drawImage() method to extract area
```javascript
// Create Canvas element
const canvas = document.createElement('canvas');
canvas.width = cropWidth;
canvas.height = cropHeight;

// Get 2D context
const ctx = canvas.getContext('2d');

// Extract crop area from original image
ctx.drawImage(
  originalImage,           // Original image object
  sourceX, sourceY,        // Crop area starting coordinates
  sourceWidth, sourceHeight, // Crop area dimensions
  0, 0,                    // Target position (Canvas top-left)
  cropWidth, cropHeight    // Target dimensions
);

// Export cropped image
const croppedDataUrl = canvas.toDataURL('image/jpeg', quality);
```

**4. Image Reconstruction Phase**
- **Interpolation Processing**: Apply interpolation algorithms if resizing after crop
- **Quality Optimization**: Apply sharpening, noise reduction, and other post-processing
- **Format Conversion**: Choose output format (JPG, PNG, WebP, etc.)
- **Metadata Preservation**: Preserve original EXIF information as much as possible

**Preset Ratio Standards**

We provide common preset ratios based on industry standards and practical needs:
- **1:1 (Square)**: Instagram square format, avatars, product main images
- **4:3 (Standard)**: Traditional TV, early digital cameras, iPad screen
- **3:2 (Classic)**: 35mm film, full-frame cameras, standard photos
- **16:9 (Widescreen)**: HD video, widescreen monitors, YouTube videos
- **16:10 (Golden)**: MacBook screens, some Android tablets
- **2:3 (Portrait)**: ID photos, portrait photography, mobile vertical screens
- **3:4 (Vertical)**: Instagram portrait format, mobile vertical photos
- **9:16 (Full Screen)**: Mobile full-screen videos, Stories format

**Advanced Cropping Features**

**1. Rotated Cropping**
- **Arbitrary Angle Rotation**: Supports -180° to +180° rotation
- **Auto Correction**: Automatically detects and corrects tilted horizontal lines
- **Fill Strategy**: Fill blank areas after rotation with black, white, or transparency

**2. Smart Cropping**
- **Content-Aware**: Analyzes image content to automatically select best crop area
- **Subject Recognition**: Recognizes faces, buildings, and other subjects to avoid cropping important content
- **Rule of Thirds**: Automatically crops according to photography composition rule of thirds

**3. Batch Cropping**
- **Unified Size**: Apply same crop dimensions and ratio to multiple images
- **Adaptive Cropping**: Automatically adjust crop area based on each image's content
- **Efficient Processing**: Leverage browser's concurrent processing capabilities for fast completion

**Quality Optimization Strategy**

- **High-Quality Interpolation**: Uses bicubic interpolation or Lanczos resampling
- **Edge Sharpening**: Moderate sharpening compensates for edge softening from cropping
- **Anti-Aliasing**: Apply anti-aliasing to crop edges to avoid jagged edges
- **Color Fidelity**: Ensure color consistency before and after cropping`
    },
    useCases: [
      { title: "ID Photo Creation", description: "Crop photos to standard ID photo sizes (1 inch, 2 inch, etc.) for resumes, applications, certificates" },
      { title: "Social Media Avatars", description: "Crop photos to square or circular avatars for WeChat, Weibo, Facebook, LinkedIn, and other social platforms" },
      { title: "Product Image Optimization", description: "Crop e-commerce product images to highlight products and unify store image style and dimensions" },
      { title: "Photo Composition Adjustment", description: "Crop photos to improve composition, apply rule of thirds, remove distracting elements, highlight subjects" },
      { title: "Video Thumbnail Creation", description: "Crop images to 16:9 or other video thumbnail ratios for YouTube, Bilibili, TikTok, and other platforms" },
      { title: "Document Illustration Processing", description: "Crop images to fit Word, PowerPoint, and other document layouts for professionalism and aesthetics" }
    ],
    tips: [
      "Determine target use and required ratio before cropping to avoid repeated cropping and quality loss",
      "When cropping portraits, leave appropriate space above the head to avoid cutting off the top",
      "For landscape photos, apply rule of thirds - place horizon at 1/3 position instead of center",
      "For product images, leave 10-20% white space to avoid products touching edges",
      "If cropped images need resizing, crop first then scale - don't reverse the order",
      "Place important content (faces, text) in center of crop area to avoid being cut off"
    ],
    faq: [
      {
        question: "Will cropping affect image quality?",
        answer: "Cropping itself doesn't affect quality - it just extracts part of the original image. However, if you enlarge the image after cropping, quality may degrade. We recommend using high output quality parameters (90%+) and confirming dimensions and ratio before cropping."
      },
      {
        question: "Which cropping ratios are supported?",
        answer: "We support free ratio cropping and multiple preset ratios: 1:1 (square), 4:3 (standard), 3:2 (classic), 16:9 (widescreen), 16:10 (golden), 2:3 (portrait), 3:4 (vertical), 9:16 (full screen), etc. You can also customize any ratio."
      },
      {
        question: "Can I rotate while cropping?",
        answer: "Yes, the tool supports rotated cropping. You can rotate the image to a suitable angle before cropping. This is particularly useful for correcting tilted photos. Rotation angle ranges from -180° to +180°."
      },
      {
        question: "What size will the cropped image be?",
        answer: "The cropped image size equals the pixel dimensions of your selected crop area. If you select an 800x600 pixel area on your original image, the cropped image will be 800x600 pixels. You can see the crop area dimensions in real-time during cropping."
      },
      {
        question: "Can I crop images in batch?",
        answer: "Yes, the tool supports batch cropping. You can upload multiple images at once and apply same or different crop settings to each image. Batch cropping greatly improves work efficiency, especially for processing large quantities of images."
      },
      {
        question: "Will my images be uploaded?",
        answer: "Absolutely not. All cropping operations happen locally in your browser - image data never leaves your device. This is our core privacy protection feature, ensuring 100% security of your images."
      },
      {
        question: "Which image formats are supported?",
        answer: "All major image formats are supported including JPG, JPEG, PNG, WebP, BMP, etc. Whatever format your image is, it will crop normally. Output format can be chosen from JPG, PNG, or WebP."
      },
      {
        question: "Can I undo after cropping?",
        answer: "Yes. Before clicking the 'Start Cropping' button, you can undo or modify the crop area at any time. We recommend previewing the crop effect first and confirming satisfaction before executing the crop operation. After cropping is complete, if you need to recrop, you can re-upload the original image."
      },
      {
        question: "How to ensure precise cropping?",
        answer: "We provide grid guidelines (rule of thirds, golden ratio, etc.) to help you compose precisely. You can also zoom in on the image for fine adjustments, view real-time dimension displays to ensure crop area is precise to the pixel level."
      }
    ]
  };

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片裁剪工具" : "Image Cropper"}
      description={
        params.locale === "zh"
          ? "免费在线图片裁剪工具，支持自定义裁剪区域、预设比例、旋转裁剪，浏览器本地处理保护隐私。"
          : "Free online image cropping tool supporting custom crop areas, preset ratios, and rotated cropping. Browser-side processing for privacy."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行图片裁剪，无需安装软件或插件，在不上传原图的前提下完成裁剪。支持自由裁剪、固定比例裁剪、预设尺寸裁剪，适合证件照制作、社交媒体头像、产品图优化等多种场景。"
          : "This tool uses browser-side Canvas API to crop images without installing software or plugins. Completes cropping without uploading originals. Supports free cropping, fixed ratio cropping, and preset size cropping. Perfect for ID photo creation, social media avatars, product image optimization, and more."
      }
      howToSteps={
        params.locale === "zh"
          ? ["点击上传区域或拖拽图片到页面，支持 JPG、PNG、WebP 等格式", "选择裁剪模式：自由裁剪、固定比例或预设尺寸", "拖动裁剪框调整裁剪区域，可调整大小、位置和旋转角度", "实时预览裁剪效果，可查看裁剪区域的精确尺寸", "满意后点击「开始裁剪」按钮，浏览器将在本地执行裁剪", "预览裁剪结果，点击下载保存到本地设备"]
          : ["Click the upload area or drag and drop images onto the page, supports JPG, PNG, WebP and more", "Choose cropping mode: free cropping, fixed ratio, or preset size", "Drag the crop box to adjust crop area - can adjust size, position, and rotation angle", "Preview crop effect in real-time and view exact dimensions of crop area", "Click the 'Start Cropping' button when satisfied - your browser will perform the crop locally", "Preview cropped result and click download to save to your device"]
      }
      howToDetail={
        params.locale === "zh"
          ? "提示：裁剪前建议先确定目标用途和所需比例。人像裁剪时确保头部上方留有适当空间。风景照可应用三分法则，将地平线放在 1/3 位置。重要内容应放在裁剪区域中心。"
          : "Tip: Determine target use and required ratio before cropping. Leave appropriate space above the head when cropping portraits. For landscapes, apply rule of thirds by placing horizon at 1/3 position. Place important content in center of crop area."
      }
      whyChooseSection={detailedContent.whyChooseSection}
      technicalDetails={detailedContent.technicalDetails}
      useCases={detailedContent.useCases}
      tips={detailedContent.tips}
      faq={detailedContent.faq}
    >
      <PlaceholderTool
        locale={params.locale}
        title={params.locale === "zh" ? "图片裁剪" : "Crop Image"}
        description={params.locale === "zh" ? "裁剪图片并保留目标区域。" : "Crop image to selected area."}
      />
    </ToolLayout>);
}

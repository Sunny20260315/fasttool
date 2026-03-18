import { Crop, ImageDown, Scan, FileImage, Monitor, RotateCcw, FileDown, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export type ToolItem = {
  slug: string;
  icon: LucideIcon;
  category: "image" | "pdf";
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const tools: ToolItem[] = [
  {
    slug: "compress-image",
    icon: ImageDown,
    category: "image",
    title: { en: "Compress Image", zh: "图片压缩" },
    description: { en: "Reduce image size quickly.", zh: "快速减小图片体积。" }
  },
  // {
  //   slug: "ai-image-generator",
  //   icon: Sparkles,
  //   category: "image",
  //   title: { en: "AI Image Generator", zh: "AI 生图" },
  //   description: { en: "Generate images from text prompt.", zh: "根据提示词生成图片。" }
  // },
  {
    slug: "image-resizer",
    icon: Scan,
    category: "image",
    title: { en: "Resize Image", zh: "图片尺寸调整" },
    description: { en: "Change width and height.", zh: "调整宽度和高度。" }
  },
  {
    slug: "heic-to-jpg",
    icon: FileImage,
    category: "image",
    title: { en: "HEIC to JPG", zh: "HEIC 转 JPG" },
    description: { en: "Convert HEIC to JPG format.", zh: "将 HEIC 转为 JPG。" }
  },
  {
    slug: "tiff-to-jpg",
    icon: FileImage,
    category: "image",
    title: { en: "TIFF to JPG", zh: "TIFF 转 JPG" },
    description: { en: "Convert TIFF to JPG format.", zh: "将 TIFF 转为 JPG。" }
  },
  {
    slug: "image-to-ico",
    icon: Monitor,
    category: "image",
    title: { en: "Image to ICO", zh: "图片转 ICO" },
    description: { en: "Convert image to ICO format.", zh: "将图片转为 ICO。" }
  },
  {
    slug: "image-to-jpg",
    icon: FileImage,
    category: "image",
    title: { en: "Image to JPG", zh: "图片转 JPG" },
    description: { en: "Convert image to JPG format.", zh: "将图片转为 JPG。" }
  },
  {
    slug: "image-to-png",
    icon: FileImage,
    category: "image",
    title: { en: "Image to PNG", zh: "图片转 PNG" },
    description: { en: "Convert image to PNG format.", zh: "将图片转为 PNG。" }
  },
  {
    slug: "image-to-bmp",
    icon: FileImage,
    category: "image",
    title: { en: "Image to BMP", zh: "图片转 BMP" },
    description: { en: "Convert image to BMP format.", zh: "将图片转为 BMP。" }
  },
  {
    slug: "image-to-webp",
    icon: FileImage,
    category: "image",
    title: { en: "Image to WEBP", zh: "图片转 WEBP" },
    description: { en: "Convert image to WEBP format.", zh: "将图片转为 WEBP。" }
  },
  {
    slug: "rotate-image",
    icon: RotateCcw,
    category: "image",
    title: { en: "Rotate Image", zh: "图片旋转" },
    description: { en: "Rotate image by any angle.", zh: "按角度旋转图片。" }
  },
  {
    slug: "crop-image",
    icon: Crop,
    category: "image",
    title: { en: "Crop Image", zh: "图片裁剪" },
    description: { en: "Crop to focused area.", zh: "裁剪指定区域。" }
  },
  {
    slug: "image-to-base64",
    icon: Code,
    category: "image",
    title: { en: "Image to Base64", zh: "图片转 Base64" },
    description: { en: "Encode images as Base64 string.", zh: "将图片编码为 Base64。" }
  },
  {
    slug: "base64-to-image",
    icon: Code,
    category: "image",
    title: { en: "Base64 to Image", zh: "Base64 转图片" },
    description: { en: "Decode Base64 to image.", zh: "将 Base64 还原为图片。" }
  },
  {
    slug: "pdf-compress",
    icon: FileDown,
    category: "pdf",
    title: { en: "PDF Compress", zh: "PDF压缩" },
    description: { en: "Reduce PDF file size quickly.", zh: "快速压缩 PDF 文件体积。" }
  },
  // {
  //   slug: "pdf-to-word",
  //   icon: FileText,
  //   category: "pdf",
  //   title: { en: "PDF to Word", zh: "PDF转Word" },
  //   description: { en: "Convert PDF to editable Word.", zh: "将 PDF 转换为可编辑 Word。" }
  // },
  {
    slug: "pdf-to-image",
    icon: FileImage,
    category: "pdf",
    title: { en: "PDF to Image", zh: "PDF转图片" },
    description: { en: "Export PDF pages as images.", zh: "将 PDF 页面导出为图片。" }
  },
  // {
  //   slug: "pdf-to-ppt",
  //   icon: FileBarChart,
  //   category: "pdf",
  //   title: { en: "PDF to PPT", zh: "PDF转PPT" },
  //   description: { en: "Convert PDF into presentation.", zh: "将 PDF 转换为演示文稿。" }
  // },
  // {
  //   slug: "pdf-to-excel",
  //   icon: FileSpreadsheet,
  //   category: "pdf",
  //   title: { en: "PDF to Excel", zh: "PDF转Excel" },
  //   description: { en: "Extract tables to Excel.", zh: "将表格提取到 Excel。" }
  // },
  // {
  //   slug: "word-to-pdf",
  //   icon: FileText,
  //   category: "pdf",
  //   title: { en: "Word to PDF", zh: "Word转PDF" },
  //   description: { en: "Convert Word documents to PDF.", zh: "将 Word 文档转换为 PDF。" }
  // },
  // {
  //   slug: "image-to-pdf",
  //   icon: FileImage,
  //   category: "pdf",
  //   title: { en: "Image to PDF", zh: "图片转PDF" },
  //   description: { en: "Merge images into one PDF.", zh: "将图片合并为 PDF。" }
  // },
  // {
  //   slug: "ppt-to-pdf",
  //   icon: FileBarChart,
  //   category: "pdf",
  //   title: { en: "PPT to PDF", zh: "PPT转PDF" },
  //   description: { en: "Convert PPT slides to PDF.", zh: "将 PPT 幻灯片转换为 PDF。" }
  // },
  // {
  //   slug: "excel-to-pdf",
  //   icon: FileSpreadsheet,
  //   category: "pdf",
  //   title: { en: "Excel to PDF", zh: "Excel转PDF" },
  //   description: { en: "Convert Excel sheets to PDF.", zh: "将 Excel 表格转换为 PDF。" }
  // },
  // {
  //   slug: "cad-to-pdf",
  //   icon: FileCode,
  //   category: "pdf",
  //   title: { en: "CAD to PDF", zh: "CAD转PDF" },
  //   description: { en: "Convert CAD files to PDF.", zh: "将 CAD 文件转换为 PDF。" }
  // }
];

export function getToolBySlug(slug: string) {
  return tools.find((item) => item.slug === slug);
}

export function getToolsByCategory(category: ToolItem["category"]) {
  return tools.filter((item) => item.category === category);
}

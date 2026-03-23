import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const AiImageGeneratorTool = dynamic(() => import("@/components/tools/AiImageGeneratorTool").then((module) => ({ default: module.AiImageGeneratorTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "AI生图 - 免费在线AI图片生成工具 - FastTool" : "AI Image Generator | Free Online AI Art Creation Tool - FastTool",
    description:
      params.locale === "zh"
        ? "免费在线AI生图工具，输入文字描述即可生成高质量图片。支持多种风格和尺寸，无需注册，浏览器本地处理保护隐私。"
        : "Free online AI image generator. Create high-quality images from text descriptions. Multiple styles and sizes supported. No registration needed."
  };
}


export default function AiImageGeneratorPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const isZh = params.locale === "zh";

  return (
    <ToolLayout
      locale={params.locale}
      title={isZh ? "AI图片生成器" : "AI Image Generator"}
      description={
        isZh
          ? "免费在线AI生图工具，通过文字描述生成高质量图片。支持多种艺术风格、尺寸比例，创意无限，让想象变为现实。"
          : "Free online AI image generator. Create high-quality images from text descriptions. Multiple artistic styles and aspect ratios supported."
      }
      introduction={
        isZh
          ? "FastTool AI图片生成器是一款基于先进人工智能技术的创意工具。只需输入文字描述，AI就能理解您的创意意图，生成独特的高质量图片。无论是概念设计、插画创作、产品原型还是艺术探索，本工具都能帮助您快速将想法可视化。支持多种风格选择（写实、动漫、油画、水彩等）和尺寸比例，满足不同场景的创作需求。"
          : "FastTool AI Image Generator is a creative tool powered by advanced artificial intelligence. Simply enter a text description, and the AI understands your creative intent to generate unique, high-quality images. Whether for concept design, illustration, product prototyping, or artistic exploration, this tool helps you quickly visualize your ideas."
      }
      features={
        isZh
          ? [
              { title: "文字生图", description: "输入自然语言描述，AI自动理解并生成对应图片，无需绘画技能" },
              { title: "多种风格", description: "支持写实、动漫、油画、水彩、素描等多种艺术风格选择" },
              { title: "尺寸灵活", description: "提供多种尺寸比例（1:1、16:9、9:16、4:3等），适应不同用途" },
              { title: "快速生成", description: "利用云端AI计算能力，通常在几秒内完成图片生成" },
              { title: "历史记录", description: "自动保存生成历史到本地，方便查看和重新下载之前的作品" },
              { title: "免费使用", description: "无需注册账号，每日免费生成次数，满足日常创作需求" }
            ]
          : [
              { title: "Text to Image", description: "Enter natural language descriptions - AI generates corresponding images without artistic skills" },
              { title: "Multiple Styles", description: "Supports realistic, anime, oil painting, watercolor, sketch and more artistic styles" },
              { title: "Flexible Sizes", description: "Multiple aspect ratios (1:1, 16:9, 9:16, 4:3) for different use cases" },
              { title: "Fast Generation", description: "Cloud AI computing power generates images in seconds" },
              { title: "History", description: "Auto-saves generation history locally for easy review and re-download" },
              { title: "Free to Use", description: "No registration required with daily free generations for regular creative needs" }
            ]
      }
      howToSteps={
        isZh
          ? [
              "在提示词输入框中详细描述您想要生成的图片内容，越具体效果越好",
              "选择喜欢的艺术风格（如写实、动漫、油画等），不同风格会产生截然不同的效果",
              "根据使用需求选择合适的尺寸比例（1:1适合头像，16:9适合壁纸）",
              "点击「生成图片」按钮，等待AI处理完成",
              "预览生成结果，满意后点击下载保存到本地"
            ]
          : [
              "Enter a detailed description of the image you want to generate in the prompt box",
              "Select your preferred artistic style - different styles produce dramatically different results",
              "Choose the appropriate aspect ratio based on your intended use",
              "Click the 'Generate Image' button and wait for AI processing",
              "Preview the result and click download to save to your device"
            ]
      }
      howToDetail={
        isZh
          ? "提示：描述越详细，生成效果越符合预期。建议包含主体、场景、风格、光线、色彩等要素。例如：'一只橘猫在夕阳下的窗台上打盹，温暖的金色光线，写实风格'。"
          : "Tip: The more detailed your description, the better the results. Include subject, scene, style, lighting, and colors. Example: 'An orange cat napping on a windowsill at sunset, warm golden light, realistic style'."
      }
      useCases={
        isZh
          ? [
              { title: "概念设计", description: "快速生成产品设计、角色设计、场景设计的概念图，辅助创意发散" },
              { title: "内容创作", description: "为博客文章、社交媒体帖子生成配图，提升内容视觉吸引力" },
              { title: "灵感收集", description: "通过文字描述探索视觉可能性，获取创作灵感和参考" },
              { title: "原型制作", description: "生成产品原型图、UI界面概念图，加速设计迭代过程" },
              { title: "个人娱乐", description: "将想象变为现实，创作独特的个人艺术作品和壁纸" }
            ]
          : [
              { title: "Concept Design", description: "Quickly generate concept art for products, characters, and scenes to aid creative brainstorming" },
              { title: "Content Creation", description: "Generate images for blog posts and social media to enhance visual appeal" },
              { title: "Inspiration", description: "Explore visual possibilities through text descriptions for creative inspiration" },
              { title: "Prototyping", description: "Generate product prototypes and UI concepts to accelerate design iteration" },
              { title: "Personal Art", description: "Turn imagination into reality by creating unique personal artwork and wallpapers" }
            ]
      }
      tips={
        isZh
          ? [
              "使用英文提示词通常能获得更好的生成效果",
              "在描述中包含光线、色彩、构图等细节可以提升图片质量",
              "尝试不同的风格选项，同一提示词在不同风格下效果差异很大",
              "如果第一次生成不满意，可以微调提示词再次尝试",
              "生成的图片仅供个人使用，商业使用请注意版权问题"
            ]
          : [
              "English prompts usually produce better results",
              "Include lighting, colors, and composition details for higher quality images",
              "Try different style options - same prompt produces very different results",
              "If not satisfied, refine your prompt and try again",
              "Generated images are for personal use - check copyright for commercial use"
            ]
      }
      faq={[
        {
          question: isZh ? "生成的图片可以商用吗？" : "Can generated images be used commercially?",
          answer: isZh
            ? "生成的图片版权归您所有，可以用于个人和商业用途。但请注意，如果提示词包含特定品牌、人物或受版权保护的内容，使用时可能需要获得相应授权。"
            : "Generated images belong to you and can be used for personal and commercial purposes. However, if prompts include specific brands, people, or copyrighted content, appropriate authorization may be needed."
        },
        {
          question: isZh ? "为什么有时候生成效果不理想？" : "Why are results sometimes not ideal?",
          answer: isZh
            ? "AI生图效果取决于提示词的准确性和详细程度。建议提供更具体的描述，包括主体、场景、风格、光线等要素。同时，某些复杂场景或特定概念可能较难准确呈现。"
            : "AI generation depends on prompt accuracy and detail. Provide specific descriptions including subject, scene, style, and lighting. Some complex scenes or specific concepts may be difficult to render accurately."
        },
        {
          question: isZh ? "生成历史会保存多久？" : "How long is generation history saved?",
          answer: isZh
            ? "生成历史保存在您浏览器的本地存储中，不会上传到服务器。只要不清除浏览器数据，历史记录会一直保留。建议及时下载喜欢的作品。"
            : "Generation history is saved in your browser's local storage, not uploaded to servers. History persists as long as browser data isn't cleared. Download favorite works promptly."
        },
        {
          question: isZh ? "有生成次数限制吗？" : "Are there generation limits?",
          answer: isZh
            ? "为了保证服务稳定性，我们设置了每日免费生成次数。一般用户日常使用完全足够。如需更多次数，可以隔天再使用。"
            : "To ensure service stability, we have daily free generation limits. This is sufficient for regular users. For more generations, please return the next day."
        },
        {
          question: isZh ? "支持生成什么类型的图片？" : "What types of images can be generated?",
          answer: isZh
            ? "本工具可以生成各种类型的图片，包括写实照片、动漫插画、艺术作品、概念设计图等。只要能用文字描述的内容，都可以尝试生成。"
            : "This tool can generate various image types including realistic photos, anime illustrations, artwork, and concept designs. Anything describable in text can be attempted."
        }
      ]}
    >
      <AiImageGeneratorTool locale={params.locale} />
    </ToolLayout>
  );
}

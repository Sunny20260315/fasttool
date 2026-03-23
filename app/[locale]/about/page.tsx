import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMessages, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const isZh = params.locale === "zh";
  return {
    title: isZh ? "关于我们 - FastTool" : "About Us - FastTool",
    description: isZh
      ? "了解 FastTool 的故事、使命和团队。我们致力于打造免费、隐私友好的在线工具平台。"
      : "Learn about FastTool's story, mission, and team. We are dedicated to building free, privacy-friendly online tools."
  };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getMessages(params.locale);
  const isZh = params.locale === "zh";

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="flex h-[400px] items-center justify-center bg-[#7268f6] px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {isZh ? "关于 FastTool" : "About FastTool"}
          </h1>
          <p className="text-lg leading-8 text-white/90 md:text-xl">
            {isZh
              ? "致力于打造快速、安全、免费的在线工具平台，让每个人都能轻松处理数字内容。"
              : "Dedicated to building fast, secure, and free online tools that make digital content processing easy for everyone."}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                {isZh ? "我们的使命" : "Our Mission"}
              </h2>
              <p className="text-base leading-8 text-gray-700">
                {isZh
                  ? "在数字化时代，图片和文档处理是每个人的日常需求。然而，市面上的工具要么收费昂贵，要么广告泛滥，要么隐私保护不足。FastTool 的诞生就是为了改变这一现状。"
                  : "In the digital age, image and document processing are daily needs for everyone. However, existing tools are either expensive, ad-heavy, or lack privacy protection. FastTool was born to change this."}
              </p>
              <p className="mt-4 text-base leading-8 text-gray-700">
                {isZh
                  ? "我们相信，优质的工具应该是免费的、易于使用的，并且尊重用户隐私。这就是我们始终坚持浏览器端处理的原因——您的文件永远不会离开您的设备。"
                  : "We believe quality tools should be free, easy to use, and respect user privacy. That's why we insist on browser-side processing - your files never leave your device."}
              </p>
            </div>
            <div className="rounded-2xl bg-[#f3f5ff] p-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {isZh ? "核心原则" : "Core Principles"}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7268f6] text-xs text-white">1</span>
                  <div>
                    <strong className="text-gray-900">{isZh ? "完全免费" : "Completely Free"}</strong>
                    <p className="text-sm text-gray-600">{isZh ? "所有核心功能永久免费，无需注册" : "All core features free forever, no registration needed"}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7268f6] text-xs text-white">2</span>
                  <div>
                    <strong className="text-gray-900">{isZh ? "隐私优先" : "Privacy First"}</strong>
                    <p className="text-sm text-gray-600">{isZh ? "浏览器本地处理，文件不上传服务器" : "Browser-side processing, files never uploaded"}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7268f6] text-xs text-white">3</span>
                  <div>
                    <strong className="text-gray-900">{isZh ? "简单易用" : "Simple & Easy"}</strong>
                    <p className="text-sm text-gray-600">{isZh ? "直观的界面设计，无需学习成本" : "Intuitive interface design, no learning curve"}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7268f6] text-xs text-white">4</span>
                  <div>
                    <strong className="text-gray-900">{isZh ? "持续改进" : "Continuous Improvement"}</strong>
                    <p className="text-sm text-gray-600">{isZh ? "根据用户反馈不断优化和添加功能" : "Constantly optimizing and adding features based on feedback"}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full bg-[#f3f5ff] py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">
            {isZh ? "我们的故事" : "Our Story"}
          </h2>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-base leading-8 text-gray-700">
              {isZh
                ? "这个项目最初源于一个很真实的开发痛点。作为一名前端开发者，我在日常工作中几乎每天都要处理图片：压缩首屏 Banner、转换产品图格式、裁剪活动素材、调整社媒封面尺寸。可当我去寻找在线工具时，总会遇到同样的问题：要么核心功能被锁在付费墙后，要么页面广告过多影响效率，要么隐私条款含糊不清，让人不敢上传敏感素材。"
                : "This project started from a real pain point. As a frontend developer, I process images daily - compressing banners, converting formats, cropping assets, resizing social covers. But when looking for online tools, I always faced the same issues: core features behind paywalls, too many ads, or vague privacy policies that make you hesitant to upload sensitive materials."}
            </p>
            <p className="mt-4 text-base leading-8 text-gray-700">
              {isZh
                ? "于是我开始思考：能不能做一个真正以用户为中心的图片工具站——免费、干净、可信赖。带着这个初心，我先做了第一个图片压缩工具，只解决一个问题：让图片快速变小且尽量保真。没想到上线后很快收到了很多反馈，大家希望再增加格式转换、裁剪、尺寸调整等能力。于是这个项目从一个小工具，逐步发展成现在的工具集合。"
                : "So I started thinking: could I build an image tool site truly centered on users - free, clean, trustworthy. With this vision, I built the first image compressor, solving one problem: making images smaller quickly while preserving quality. After launch, I received lots of feedback asking for format conversion, cropping, resizing, and more. The project grew from a single tool to the current collection."}
            </p>
            <p className="mt-4 text-base leading-8 text-gray-700">
              {isZh
                ? "未来我们会继续沿着「简单好用、隐私优先、长期免费」的方向迭代，持续增加实用功能，优化移动端体验，并将更多处理能力放在浏览器本地完成，让每一次图片处理都更快、更安全、更省心。"
                : "Going forward, we'll continue iterating along the principles of simplicity, privacy-first, and long-term free service. We'll keep adding useful features, optimizing mobile experience, and moving more processing to the browser, making every image processing task faster, safer, and more worry-free."}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7268f6]">30+</div>
              <div className="mt-2 text-sm text-gray-600">{isZh ? "在线工具" : "Online Tools"}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7268f6]">100%</div>
              <div className="mt-2 text-sm text-gray-600">{isZh ? "免费使用" : "Free to Use"}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7268f6]">0</div>
              <div className="mt-2 text-sm text-gray-600">{isZh ? "文件上传" : "File Uploads"}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7268f6]">24/7</div>
              <div className="mt-2 text-sm text-gray-600">{isZh ? "全天候服务" : "Always Available"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="w-full bg-[#f3f5ff] py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">
            {isZh ? "关于创作者" : "About the Creator"}
          </h2>
          <div className="flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm md:flex-row md:items-center">
            <div className="relative mx-auto h-48 w-36 shrink-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm md:mx-0">
              <Image
                src="/creator-photo.png"
                alt={isZh ? "创作者生活照" : "Creator photo"}
                fill
                className="object-cover"
                sizes="144px"
                priority
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900">{isZh ? "前端鱼姐" : "Yujie"}</h3>
              <p className="mt-1 text-sm text-gray-600">{isZh ? "独立开发者 / 技术博主" : "Indie Developer / Tech Blogger"}</p>
              <p className="mt-4 text-base leading-7 text-gray-700">
                {isZh
                  ? "拥有7年前端开发经验，热爱开源和技术分享。FastTool 是我在业余时间开发的作品，希望能帮助更多人高效处理数字内容。我相信好的工具应该像空气一样自然存在，不打扰却能解决实际问题。"
                  : "With 7 years of frontend development experience, passionate about open source and tech sharing. FastTool is a side project I built to help more people process digital content efficiently. I believe good tools should exist naturally like air - unobtrusive yet solving real problems."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python"].map((tag) => (
                  <span key={tag} className="rounded-full bg-[#f3f5ff] px-3 py-1 text-xs font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">
            {isZh ? "联系我们" : "Contact Us"}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-[#f3f5ff] p-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {isZh ? "反馈与建议" : "Feedback & Suggestions"}
              </h3>
              <p className="text-gray-700">
                {isZh
                  ? "我们非常重视您的反馈。如果您有任何建议、问题或合作意向，欢迎通过邮件联系我们。"
                  : "We value your feedback greatly. If you have any suggestions, questions, or collaboration inquiries, please reach out via email."}
              </p>
              <div className="mt-6">
                <a
                  href="mailto:contact@fasttool.app"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#7268f6] px-6 py-3 text-white transition hover:bg-[#5f56e5]"
                >
                  {isZh ? "发送邮件" : "Send Email"}
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-[#f3f5ff] p-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {isZh ? "社交媒体" : "Social Media"}
              </h3>
              <p className="text-gray-700">
                {isZh
                  ? "关注我们的社交媒体账号，获取最新工具更新和技术分享。"
                  : "Follow our social media accounts for the latest tool updates and tech sharing."}
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="https://twitter.com/fasttool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-50"
                >
                  Twitter
                </a>
                <a
                  href="https://github.com/fasttool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-50"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

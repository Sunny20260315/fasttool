import Image from "next/image";
import { notFound } from "next/navigation";
import { getMessages, isLocale } from "@/lib/i18n";

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getMessages(params.locale);
  const isZh = params.locale === "zh";

  return (
    <main className="w-full">
      <section className="flex h-[350px] items-center justify-center bg-[#7268f6] px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white">{t.nav.about}</h1>
          <p className="text-lg leading-8 text-white">
            {isZh
              ? "FastTool 致力于打造快速、隐私友好的在线图片处理体验。"
              : "FastTool is built to provide fast and privacy-friendly image processing online."}
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-14">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900">{isZh ? "我们的故事" : "Our Story"}</h2>
          <p className="text-base leading-8 text-gray-700">
            {isZh
              ? "这个项目最初源于一个很真实的开发痛点。作为一名前端开发者，我在日常工作中几乎每天都要处理图片：压缩首屏 Banner、转换产品图格式、裁剪活动素材、调整社媒封面尺寸。可当我去寻找在线工具时，总会遇到同样的问题：要么核心功能被锁在付费墙后，要么页面广告过多影响效率，要么隐私条款含糊不清，让人不敢上传敏感素材。于是我开始思考：能不能做一个真正以用户为中心的图片工具站——免费、干净、可信赖。带着这个初心，我先做了第一个图片压缩工具，只解决一个问题：让图片快速变小且尽量保真。没想到上线后很快收到了很多反馈，大家希望再增加格式转换、裁剪、尺寸调整等能力。于是这个项目从一个小工具，逐步发展成现在的工具集合。未来我们会继续沿着“简单好用、隐私优先、长期免费”的方向迭代，持续增加实用功能，优化移动端体验，并将更多处理能力放在浏览器本地完成，让每一次图片处理都更快、更安全、更省心。"
              : "This project started from a practical pain point. As a frontend developer, I process images every day, but many online tools are either paywalled, ad-heavy, or unclear about data privacy. I wanted to build a truly free, privacy-first, and simple toolset. We started with a single compressor and gradually expanded to conversion, crop, and resize based on user feedback. In the future, we will keep shipping useful features while staying free and privacy-friendly."}
          </p>
        </div>
      </section>

      <section className="w-full bg-[#f3f5ff] py-14">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-6 text-2xl  text-center font-semibold text-gray-900">{isZh ? "关于创作者" : "About the Creator"}</h2>
          <div className="flex flex-col gap-6 rounded-xl p-6 md:flex-row md:items-center">
            <div className="relative w-40 shrink-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm aspect-[3/4]">
              <Image
                src="/creator-photo.png"
                alt={isZh ? "创作者生活照" : "Creator photo"}
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{isZh ? "前端鱼姐" : "Yujie"}</h3>
              <p className="mt-1 text-sm text-gray-600">{isZh ? "独立开发者 / 技术分享" : "Indie Developer / technique sharing"}</p>
              <p className="mt-3 text-sm leading-7 text-gray-700">{isZh ? "7年前端开发经验，热爱开源和技术分享。这个工具站是业余时间的作品，希望能帮到更多人。" : "7 years of frontend experience, passionate about open source and practical product engineering."}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Vue", "Node.js", "Python", "Tailwind CSS", "TypeScript", "Go"].map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      {/* <section className="w-full bg-[#f3f5ff] py-14">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-semibold text-gray-900">{isZh ? "联系我们" : "Contact Us"}</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <form className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isZh ? "姓名" : "Name"}</label>
                <input type="text" className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400" placeholder={isZh ? "请输入你的姓名" : "Enter your name"} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isZh ? "邮箱" : "Email"}</label>
                <input type="email" className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400" placeholder={isZh ? "请输入你的邮箱" : "Enter your email"} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isZh ? "留言内容" : "Message"}</label>
                <textarea rows={5} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" placeholder={isZh ? "请输入你的问题或建议" : "Tell us your questions or feedback"} />
              </div>
              <button type="button" className="rounded-xl bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800">
                {isZh ? "提交" : "Submit"}
              </button>
            </form>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-600">{isZh ? "联系邮箱" : "Email"}</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">contact@example.com</p>
              <p className="mt-6 text-sm leading-7 text-gray-700">{isZh ? "我们承诺在 24 小时内回复你的消息。感谢你的建议与支持。" : "We usually reply within 24 hours. Thanks for your feedback and support."}</p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "隐私政策 - FastTool" : "Privacy Policy - FastTool",
    description:
      params.locale === "zh"
        ? "FastTool 隐私政策，包含 Cookie 使用、GDPR 权利和第三方服务说明。"
        : "FastTool privacy policy covering cookies, GDPR rights, and third-party services."
  };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const isZh = params.locale === "zh";

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">{params.locale === "zh" ? "隐私政策" : "privacy policy"}</h1>
          <p className="mt-3 text-gray-600">
            {params.locale === "zh"
              ? "最后更新：2026年3月13日"
              : "Last updated: March 13, 2026."}
          </p>
        </header>

        <article className="space-y-8 rounded-2xl ">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "1. 我们收集的信息" : "1. Information We Collect"}</h2>
            <p className="mt-3 leading-8 text-gray-700">
              {isZh ? "我们收集的信息类型包括：" : "We may collect the following information types:"}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                {isZh
                  ? "日志数据：当您访问网站时，我们的服务器可能自动记录 IP 地址、浏览器类型、访问时间等技术信息。"
                  : "Log data: when you access the website, technical details such as IP address, browser type, and access time may be recorded."}
              </li>
              <li>
                {isZh
                  ? "Cookie 信息：我们使用 Cookie 记住偏好设置并改善用户体验。"
                  : "Cookie data: we use cookies to remember preferences and improve user experience."}
              </li>
              <li>
                {isZh
                  ? "使用数据：我们通过 Google Analytics 分析网站流量与用户行为趋势。"
                  : "Usage data: we use Google Analytics to understand traffic and behavior trends."}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "2. 如何使用您的信息" : "2. How We Use Information"}</h2>
            <p className="mt-3 leading-8 text-gray-700">{isZh ? "我们使用收集的信息用于：" : "We use collected data to:"}</p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>{isZh ? "提供和维护服务" : "Provide and maintain services"}</li>
              <li>{isZh ? "改进和优化网站" : "Improve and optimize the website"}</li>
              <li>{isZh ? "分析用户行为趋势" : "Analyze usage trends"}</li>
              <li>{isZh ? "展示个性化广告" : "Display personalized ads"}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "3. Cookie 和跟踪技术" : "3. Cookies and Tracking"}</h2>
            <p className="mt-3 leading-8 text-gray-700">{isZh ? "我们使用以下类型的 Cookie：" : "We use these cookie types:"}</p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>{isZh ? "必要 Cookie：保障网站正常运行" : "Essential cookies: required for site functionality"}</li>
              <li>{isZh ? "分析 Cookie：Google Analytics 用于统计分析" : "Analytics cookies: Google Analytics for usage insights"}</li>
              <li>{isZh ? "广告 Cookie：Google AdSense 用于广告展示" : "Advertising cookies: Google AdSense for ad delivery"}</li>
            </ul>
            <p className="mt-3 text-gray-700">
              {isZh ? "您可以通过浏览器设置管理或禁用 Cookie。" : "You can manage or disable cookies in your browser settings."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "4. 第三方服务" : "4. Third-party Services"}</h2>
            <p className="mt-3 leading-8 text-gray-700">{isZh ? "我们使用以下第三方服务：" : "We use the following third-party services:"}</p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                Google Analytics -{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-700">
                  {isZh ? "隐私政策" : "Privacy Policy"}
                </a>
              </li>
              <li>
                Google AdSense -{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-700">
                  {isZh ? "广告政策" : "Ads Policy"}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "5. 数据安全" : "5. Data Security"}</h2>
            <p className="mt-3 leading-8 text-gray-700">
              {isZh
                ? "我们采取合理的技术与组织措施保护您的信息安全，但互联网传输与存储不存在 100% 安全保障。"
                : "We implement reasonable technical and organizational safeguards, but no internet transmission is 100% secure."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "6. 您的权利" : "6. Your GDPR Rights"}</h2>
            <p className="mt-3 leading-8 text-gray-700">
              {isZh ? "根据 GDPR，您有以下权利：" : "Under GDPR, you have the right to:"}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>{isZh ? "访问您的个人数据" : "Access your personal data"}</li>
              <li>{isZh ? "更正不准确的数据" : "Rectify inaccurate data"}</li>
              <li>{isZh ? "删除您的数据（被遗忘权）" : "Erase your data (right to be forgotten)"}</li>
              <li>{isZh ? "限制或反对处理" : "Restrict or object to processing"}</li>
              <li>{isZh ? "数据可携带权" : "Data portability"}</li>
            </ul>
            <p className="mt-3 text-gray-700">
              {isZh ? "如需行使上述权利，请联系：" : "To exercise these rights, contact us:"}{" "}
              <a href="mailto:yu1990jing@163.com" className="text-indigo-600 hover:text-indigo-700">
              yu1990jing@163.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "7. 儿童隐私" : "7. Children's Privacy"}</h2>
            <p className="mt-3 leading-8 text-gray-700">
              {isZh
                ? "我们不面向 13 岁以下儿童提供服务，也不会有意收集相关个人信息。"
                : "Our services are not directed to children under 13, and we do not knowingly collect their personal data."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "8. 隐私政策更新" : "8. Policy Updates"}</h2>
            <p className="mt-3 leading-8 text-gray-700">
              {isZh
                ? "我们可能不定期更新本隐私政策。更新后会在本页面公布，并更新“最后更新”日期。"
                : "We may update this policy from time to time. Any update will be posted here with a revised “last updated” date."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "9. 联系我们" : "9. Contact Us"}</h2>
            <p className="mt-3 leading-8 text-gray-700">
              {isZh ? "如有隐私相关问题，请联系：" : "For privacy-related questions, contact us at:"}{" "}
              <a href="mailto:yu1990jing@163.com" className="text-indigo-600 hover:text-indigo-700">
              yu1990jing@163.com
              </a>
            </p>
          </section>
        </article>
      </main>

      <CookieConsentBanner locale={params.locale} />
    </>
  );
}

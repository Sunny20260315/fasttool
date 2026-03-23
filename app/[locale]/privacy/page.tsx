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
        ? "FastTool 隐私政策，详细说明我们如何收集、使用和保护您的个人信息。包含 Cookie 使用、GDPR 权利、数据安全和第三方服务说明。"
        : "FastTool privacy policy detailing how we collect, use, and protect your personal information. Covers cookies, GDPR rights, data security, and third-party services."
  };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const isZh = params.locale === "zh";

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            {isZh ? "隐私政策" : "Privacy Policy"}
          </h1>
          <p className="mt-3 text-gray-600">
            {isZh
              ? "最后更新：2026年3月20日"
              : "Last updated: March 20, 2026"}
          </p>
        </header>

        <article className="space-y-10 rounded-2xl">
          {/* 简介 */}
          <section className="rounded-xl bg-blue-50 p-6">
            <p className="leading-7 text-gray-700">
              {isZh
                ? 'FastTool（"轻秒工具"）重视用户的隐私保护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息。我们承诺遵守适用的数据保护法律法规，包括欧盟《通用数据保护条例》(GDPR)和《加州消费者隐私法案》(CCPA)等。使用我们的服务即表示您同意本隐私政策中所述的做法。'
                : "FastTool values user privacy protection. This privacy policy explains how we collect, use, store, and protect your personal information. We are committed to complying with applicable data protection laws, including GDPR and CCPA. Using our services indicates your agreement with the practices described in this policy."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "1. 我们收集的信息" : "1. Information We Collect"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "当您使用 FastTool 服务时，我们可能收集以下类型的信息："
                : "When you use FastTool services, we may collect the following types of information:"}
            </p>
            
            <h3 className="mt-4 text-lg font-medium text-gray-900">{isZh ? "1.1 自动收集的信息" : "1.1 Automatically Collected Information"}</h3>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                {isZh
                  ? "日志数据：当您访问网站时，我们的服务器可能自动记录您的 IP 地址、浏览器类型、操作系统、访问时间、访问页面、引荐来源等技术信息。"
                  : "Log data: When you access the website, our servers may automatically record your IP address, browser type, operating system, access time, visited pages, and referral sources."}
              </li>
              <li>
                {isZh
                  ? "设备信息：包括设备类型、屏幕分辨率、语言设置等，用于优化网站显示效果。"
                  : "Device information: Including device type, screen resolution, and language settings to optimize website display."}
              </li>
              <li>
                {isZh
                  ? "使用数据：您与网站的交互方式，包括点击的按钮、使用的工具、停留时间等。"
                  : "Usage data: How you interact with the website, including buttons clicked, tools used, and time spent."}
              </li>
            </ul>

            <h3 className="mt-4 text-lg font-medium text-gray-900">{isZh ? "1.2 Cookie 和类似技术" : "1.2 Cookies and Similar Technologies"}</h3>
            <p className="mt-2 leading-7 text-gray-700">
              {isZh
                ? "我们使用 Cookie 和类似技术来收集和存储信息。Cookie 是存储在您设备上的小型文本文件，用于记住您的偏好设置、分析网站使用情况等。"
                : "We use cookies and similar technologies to collect and store information. Cookies are small text files stored on your device to remember preferences and analyze website usage."}
            </p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">{isZh ? "1.3 您主动提供的信息" : "1.3 Information You Voluntarily Provide"}</h3>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                {isZh
                  ? "联系信息：当您通过电子邮件联系我们时提供的邮箱地址和通信内容。"
                  : "Contact information: Email address and communication content when you contact us via email."}
              </li>
              <li>
                {isZh
                  ? "反馈信息：您通过反馈表单提交的建议、问题报告或其他信息。"
                  : "Feedback: Suggestions, bug reports, or other information submitted through feedback forms."}
              </li>
            </ul>

            <div className="mt-4 rounded-lg bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                {isZh
                  ? "重要说明：FastTool 的所有工具（图片压缩、PDF转换、AI生图等）都采用浏览器端处理技术。您上传的文件在本地浏览器中处理，不会上传到我们的服务器。这是我们对用户隐私的核心承诺。"
                  : "Important: All FastTool utilities (image compression, PDF conversion, AI image generation) use browser-side processing. Files you upload are processed locally and never uploaded to our servers. This is our core privacy commitment."}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "2. 我们如何使用您的信息" : "2. How We Use Your Information"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh ? "我们使用收集的信息用于以下目的：" : "We use collected information for the following purposes:"}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                {isZh
                  ? "提供和维护服务：确保网站正常运行，提供您请求的工具和功能。"
                  : "Provide and maintain services: Ensure website functionality and provide requested tools and features."}
              </li>
              <li>
                {isZh
                  ? "改进和优化：分析用户行为，了解哪些功能受欢迎，优化用户体验。"
                  : "Improve and optimize: Analyze user behavior to understand popular features and optimize user experience."}
              </li>
              <li>
                {isZh
                  ? "个性化体验：记住您的偏好设置（如语言选择），提供更个性化的服务。"
                  : "Personalize experience: Remember your preferences (like language choice) for more personalized service."}
              </li>
              <li>
                {isZh
                  ? "广告投放：通过 Google AdSense 展示相关广告，维持免费服务运营。"
                  : "Ad delivery: Display relevant ads through Google AdSense to maintain free service operation."}
              </li>
              <li>
                {isZh
                  ? "安全防护：检测和防止欺诈、滥用行为，保护网站和用户安全。"
                  : "Security protection: Detect and prevent fraud and abuse to protect the website and users."}
              </li>
              <li>
                {isZh
                  ? "法律合规：遵守适用的法律法规，响应法律程序或政府要求。"
                  : "Legal compliance: Comply with applicable laws and respond to legal processes or government requests."}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "3. Cookie 详细说明" : "3. Cookie Details"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh ? "我们使用以下类型的 Cookie：" : "We use the following types of cookies:"}
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900">{isZh ? "必要 Cookie（无法禁用）" : "Essential Cookies (Cannot be disabled)"}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {isZh
                    ? "这些 Cookie 对网站正常运行至关重要，包括记住您的 Cookie 偏好设置、保持会话状态等。"
                    : "These cookies are essential for website operation, including remembering cookie preferences and maintaining session state."}
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900">{isZh ? "分析 Cookie" : "Analytics Cookies"}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {isZh
                    ? "我们使用 Google Analytics 收集匿名使用数据，帮助我们了解用户如何与网站互动，从而改进服务。这些 Cookie 收集的信息是聚合的、匿名的。"
                    : "We use Google Analytics to collect anonymous usage data to understand how users interact with the website and improve services. Information collected is aggregated and anonymous."}
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900">{isZh ? "广告 Cookie" : "Advertising Cookies"}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {isZh
                    ? "我们使用 Google AdSense 展示广告。这些 Cookie 用于展示相关广告、限制广告展示次数、衡量广告效果。"
                    : "We use Google AdSense to display ads. These cookies are used to show relevant ads, limit ad frequency, and measure ad effectiveness."}
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              {isZh
                ? "您可以通过我们的 Cookie 同意横幅或浏览器设置管理 Cookie 偏好。请注意，禁用某些 Cookie 可能影响网站功能。"
                : "You can manage cookie preferences through our cookie consent banner or browser settings. Note that disabling certain cookies may affect website functionality."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "4. 第三方服务提供商" : "4. Third-Party Service Providers"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "我们使用以下第三方服务来支持网站运营："
                : "We use the following third-party services to support website operation:"}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>Google Analytics</strong> -{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-700">
                  {isZh ? "隐私政策" : "Privacy Policy"}
                </a>
                <br />
                <span className="text-sm text-gray-600">
                  {isZh
                    ? "用于网站流量分析和用户行为统计。Google Analytics 使用 Cookie 收集匿名信息。"
                    : "Used for website traffic analysis and user behavior statistics. Google Analytics uses cookies to collect anonymous information."}
                </span>
              </li>
              <li>
                <strong>Google AdSense</strong> -{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-700">
                  {isZh ? "广告政策" : "Ads Policy"}
                </a>
                <br />
                <span className="text-sm text-gray-600">
                  {isZh
                    ? "用于在网站上展示广告。Google 可能使用 Cookie 和 Web Beacon 收集信息以提供个性化广告。"
                    : "Used to display ads on the website. Google may use cookies and web beacons to collect information for personalized advertising."}
                </span>
              </li>
              <li>
                <strong>Cloudflare</strong> -{" "}
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-700">
                  {isZh ? "隐私政策" : "Privacy Policy"}
                </a>
                <br />
                <span className="text-sm text-gray-600">
                  {isZh
                    ? "用于网站加速和安全防护。Cloudflare 可能收集 IP 地址等日志信息。"
                    : "Used for website acceleration and security protection. Cloudflare may collect log information including IP addresses."}
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "5. 数据安全" : "5. Data Security"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "我们重视您的数据安全，采取了以下措施保护您的信息："
                : "We value your data security and have implemented the following measures to protect your information:"}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                {isZh
                  ? "使用 HTTPS 加密传输，保护数据在网络传输过程中的安全"
                  : "Using HTTPS encryption to protect data during network transmission"}
              </li>
              <li>
                {isZh
                  ? "浏览器端处理技术确保您的文件不会离开您的设备"
                  : "Browser-side processing ensures your files never leave your device"}
              </li>
              <li>
                {isZh
                  ? "定期安全审查和更新，防范潜在的安全漏洞"
                  : "Regular security audits and updates to prevent potential vulnerabilities"}
              </li>
              <li>
                {isZh
                  ? "限制员工访问用户数据，仅在必要时进行"
                  : "Limiting employee access to user data only when necessary"}
              </li>
            </ul>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "尽管我们采取了合理的安全措施，但请注意，互联网传输和电子存储不存在 100% 的安全保障。"
                : "While we take reasonable security measures, please note that internet transmission and electronic storage cannot be guaranteed to be 100% secure."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "6. 数据保留" : "6. Data Retention"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "我们仅在实现收集目的所需的时间内保留您的个人信息："
                : "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected:"}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                {isZh
                  ? "日志数据：通常保留 30 天，用于故障排查和安全分析"
                  : "Log data: Typically retained for 30 days for troubleshooting and security analysis"}
              </li>
              <li>
                {isZh
                  ? "分析数据：以聚合形式保留，用于长期趋势分析"
                  : "Analytics data: Retained in aggregated form for long-term trend analysis"}
              </li>
              <li>
                {isZh
                  ? "Cookie：根据类型和您的设置，保留时间从会话期间到 2 年不等"
                  : "Cookies: Retention varies from session-only to 2 years depending on type and your settings"}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "7. 您的权利" : "7. Your Rights"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "根据适用的数据保护法律（如 GDPR、CCPA），您拥有以下权利："
                : "Under applicable data protection laws (such as GDPR, CCPA), you have the following rights:"}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                {isZh
                  ? "访问权：获取我们持有的关于您的个人数据副本"
                  : "Right to access: Obtain a copy of personal data we hold about you"}
              </li>
              <li>
                {isZh
                  ? "更正权：要求更正不准确或不完整的个人数据"
                  : "Right to rectification: Request correction of inaccurate or incomplete personal data"}
              </li>
              <li>
                {isZh
                  ? "删除权（被遗忘权）：要求删除您的个人数据"
                  : "Right to erasure (right to be forgotten): Request deletion of your personal data"}
              </li>
              <li>
                {isZh
                  ? "限制处理权：要求限制对您个人数据的处理"
                  : "Right to restrict processing: Request restriction of processing your personal data"}
              </li>
              <li>
                {isZh
                  ? "反对权：反对处理您的个人数据，特别是用于直接营销"
                  : "Right to object: Object to processing of your personal data, particularly for direct marketing"}
              </li>
              <li>
                {isZh
                  ? "数据可携带权：以结构化、通用格式获取您的数据并传输给其他服务提供商"
                  : "Right to data portability: Obtain your data in a structured, commonly used format and transfer it to another service provider"}
              </li>
              <li>
                {isZh
                  ? "撤回同意权：随时撤回您之前给予的同意"
                  : "Right to withdraw consent: Withdraw consent previously given at any time"}
              </li>
            </ul>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "如需行使上述权利，或有任何隐私相关问题，请联系我们："
                : "To exercise these rights or for any privacy-related questions, contact us at:"}{" "}
              <a href="mailto:privacy@fasttool.app" className="text-indigo-600 hover:text-indigo-700">
                privacy@fasttool.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "8. 儿童隐私" : "8. Children's Privacy"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "我们的服务不面向 13 岁以下儿童。我们不会故意收集 13 岁以下儿童的个人信息。如果您认为我们可能无意中收集了儿童的个人信息，请立即联系我们，我们将尽快删除相关信息。"
                : "Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we may have inadvertently collected information from a child, please contact us immediately and we will promptly delete such information."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "9. 国际数据传输" : "9. International Data Transfers"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "我们的服务器可能位于您所在国家/地区以外的地区。我们使用的第三方服务（如 Google Analytics、Google AdSense）也可能在国际范围内处理数据。我们确保所有数据传输都符合适用的数据保护法律要求，包括使用欧盟委员会批准的标准合同条款。"
                : "Our servers may be located outside your country. Third-party services we use (such as Google Analytics, Google AdSense) may also process data internationally. We ensure all data transfers comply with applicable data protection laws, including using EU Commission-approved standard contractual clauses."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "10. 隐私政策更新" : "10. Policy Updates"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? '我们可能不定期更新本隐私政策以反映法律变化或我们的实践更新。任何重大变更将在本页面公布，并在页面顶部更新"最后更新"日期。我们建议您定期查看本政策以了解任何变更。'
                : "We may update this privacy policy from time to time to reflect legal changes or updates to our practices. Any significant changes will be posted on this page with an updated \"last updated\" date at the top. We recommend checking this policy periodically for any changes."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "11. 联系我们" : "11. Contact Us"}</h2>
            <p className="mt-3 leading-7 text-gray-700">
              {isZh
                ? "如果您对本隐私政策有任何疑问、担忧或请求，请通过以下方式联系我们："
                : "If you have any questions, concerns, or requests regarding this privacy policy, please contact us:"}
            </p>
            <div className="mt-3 text-gray-700">
              <p>Email: <a href="mailto:privacy@fasttool.app" className="text-indigo-600 hover:text-indigo-700">privacy@fasttool.app</a></p>
            </div>
          </section>
        </article>
      </main>

      <CookieConsentBanner locale={params.locale} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "服务条款 - FastTool" : "Terms of Service - FastTool",
    description:
      params.locale === "zh"
        ? "FastTool 服务条款，详细说明使用我们服务的条件、用户责任、知识产权和免责声明。"
        : "FastTool Terms of Service detailing conditions for using our services, user responsibilities, intellectual property, and disclaimers."
  };
}

export default function TermsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const isZh = params.locale === "zh";

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          {isZh ? "服务条款" : "Terms of Service"}
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
              ? "欢迎使用 FastTool（轻秒工具）。本服务条款构成您与 FastTool 之间具有法律约束力的协议。访问或使用我们的服务即表示您同意受本条款约束。如果您不同意本条款的任何部分，请勿使用我们的服务。"
              : "Welcome to FastTool. These Terms of Service constitute a legally binding agreement between you and FastTool. By accessing or using our services, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "1. 服务描述" : "1. Service Description"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "FastTool 是一个在线工具平台，提供图片处理、PDF 转换、AI 生成等多种免费工具。所有工具均在浏览器端运行，无需下载安装软件。"
              : "FastTool is an online utility platform providing various free tools including image processing, PDF conversion, AI generation, and more. All tools run in the browser without requiring software downloads or installation."}
          </p>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "我们保留随时修改、暂停或终止服务（或其任何部分）的权利，恕不另行通知。"
              : "We reserve the right to modify, suspend, or terminate the service (or any part thereof) at any time without notice."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "2. 使用条件" : "2. Conditions of Use"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh ? "使用我们的服务，您同意：" : "By using our services, you agree to:"}
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
            <li>
              {isZh
                ? "仅将服务用于合法目的，遵守所有适用的法律法规"
                : "Use the service only for lawful purposes and comply with all applicable laws and regulations"}
            </li>
            <li>
              {isZh
                ? "不上传、处理或分发任何违法、侵权、有害、诽谤、淫秽或侵犯他人权利的内容"
                : "Not upload, process, or distribute any content that is illegal, infringing, harmful, defamatory, obscene, or violates others' rights"}
            </li>
            <li>
              {isZh
                ? "不干扰或破坏服务的正常运行，不尝试未经授权访问我们的系统"
                : "Not interfere with or disrupt the normal operation of the service, and not attempt unauthorized access to our systems"}
            </li>
            <li>
              {isZh
                ? "不使用自动化手段（如机器人、爬虫）大量访问服务"
                : "Not use automated means (such as bots, crawlers) to access the service in bulk"}
            </li>
            <li>
              {isZh
                ? "不冒充他人或提供虚假信息"
                : "Not impersonate others or provide false information"}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "3. 知识产权" : "3. Intellectual Property"}</h2>
          
          <h3 className="mt-4 text-lg font-medium text-gray-900">{isZh ? "3.1 我们的知识产权" : "3.1 Our Intellectual Property"}</h3>
          <p className="mt-2 leading-7 text-gray-700">
            {isZh
              ? "FastTool 网站及其原创内容、功能和设计归 FastTool 所有，受国际版权、商标和其他知识产权法律保护。未经我们事先书面许可，您不得复制、修改、分发、出售或出租我们的服务的任何部分。"
              : "The FastTool website and its original content, features, and design are owned by FastTool and protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services without our prior written permission."}
          </p>

          <h3 className="mt-4 text-lg font-medium text-gray-900">{isZh ? "3.2 您的内容" : "3.2 Your Content"}</h3>
          <p className="mt-2 leading-7 text-gray-700">
            {isZh
              ? "您保留对上传到我们服务的任何内容的所有权。但是，通过使用我们的服务，您授予我们有限的许可，仅用于提供、维护和改进服务的目的处理您的内容。"
              : "You retain ownership of any content you upload to our services. However, by using our services, you grant us a limited license to process your content solely for the purpose of providing, maintaining, and improving the service."}
          </p>
          <p className="mt-2 leading-7 text-gray-700">
            {isZh
              ? "重要提示：FastTool 的所有工具都采用浏览器端处理技术。您的文件在本地浏览器中处理，不会上传到我们的服务器。处理完成后，我们不会保留您的文件副本。"
              : "Important: All FastTool utilities use browser-side processing. Your files are processed locally in your browser and are not uploaded to our servers. We do not retain copies of your files after processing."}
          </p>

          <h3 className="mt-4 text-lg font-medium text-gray-900">{isZh ? "3.3 AI 生成内容" : "3.3 AI-Generated Content"}</h3>
          <p className="mt-2 leading-7 text-gray-700">
            {isZh
              ? "使用我们的 AI 生图工具生成的图片，您拥有使用权，可以用于个人和商业目的。但是，您不得声称这些 AI 生成的作品是由人类创作的，也不得将生成的内容用于违法、欺诈或误导性目的。"
              : "Images generated using our AI image generation tool are yours to use for personal and commercial purposes. However, you may not claim that these AI-generated works were created by humans, nor use generated content for illegal, fraudulent, or misleading purposes."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "4. 免责声明" : "4. Disclaimer"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "我们的服务按「原样」和「可用」基础提供，不作任何明示或暗示的保证。我们明确声明不保证："
              : "Our services are provided on an \"as is\" and \"as available\" basis without any warranties of any kind. We expressly disclaim all warranties including:"}
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
            <li>
              {isZh
                ? "服务将满足您的特定需求或期望"
                : "The service will meet your specific requirements or expectations"}
            </li>
            <li>
              {isZh
                ? "服务将不间断、及时、安全或无错误"
                : "The service will be uninterrupted, timely, secure, or error-free"}
            </li>
            <li>
              {isZh
                ? "使用服务获得的结果准确或可靠"
                : "The results obtained from using the service will be accurate or reliable"}
            </li>
            <li>
              {isZh
                ? "任何服务中的错误将被纠正"
                : "Any errors in the service will be corrected"}
            </li>
          </ul>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "您明确同意使用服务的风险由您自行承担。"
              : "You expressly agree that your use of the service is at your sole risk."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "5. 责任限制" : "5. Limitation of Liability"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "在法律允许的最大范围内，FastTool 及其创始人、员工、代理人不对任何直接、间接、附带、特殊、后果性或惩罚性损害承担责任，包括但不限于利润损失、数据丢失、业务中断或其他无形损失，即使我们已被告知此类损害的可能性。"
              : "To the maximum extent permitted by law, FastTool and its founders, employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data loss, business interruption, or other intangible losses, even if we have been advised of the possibility of such damages."}
          </p>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "对于您使用或无法使用服务所导致的任何损害或损失，我们的总责任不超过您在过去 12 个月内为使用服务而支付的总金额（如有），或 100 美元（以较高者为准）。"
              : "Our total liability for any damages or losses arising from your use or inability to use the service shall not exceed the total amount you paid for using the service in the past 12 months (if any), or $100 USD, whichever is greater."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "6. 赔偿" : "6. Indemnification"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "您同意赔偿、辩护并使 FastTool 及其创始人、员工、代理人免受任何索赔、责任、损害、损失和费用（包括合理的律师费）的损害，这些损害源于或与您使用服务、违反本条款或侵犯任何第三方权利有关。"
              : "You agree to indemnify, defend, and hold harmless FastTool and its founders, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from or relating to your use of the service, violation of these terms, or infringement of any third-party rights."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "7. 第三方链接和服务" : "7. Third-Party Links and Services"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "我们的服务可能包含指向第三方网站或服务的链接。这些链接仅为方便您而提供，我们不控制、认可或对这些第三方网站或服务的内容、隐私政策或做法负责。您访问第三方网站的风险由您自行承担。"
              : "Our services may contain links to third-party websites or services. These links are provided for your convenience only, and we do not control, endorse, or assume responsibility for the content, privacy policies, or practices of these third-party websites or services. You access third-party websites at your own risk."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "8. 条款修改" : "8. Modifications to Terms"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "我们保留随时修改或替换本服务条款的权利。重大变更将在本页面公布，并在页面顶部更新「最后更新」日期。您在任何变更后继续使用服务即表示您接受修改后的条款。"
              : "We reserve the right to modify or replace these Terms of Service at any time. Material changes will be posted on this page with an updated \"last updated\" date at the top. Your continued use of the service after any changes constitutes acceptance of the modified terms."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "9. 终止" : "9. Termination"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "我们可以出于任何原因（包括但不限于违反本条款）立即终止或暂停您访问我们的服务，恕不另行通知或承担责任。"
              : "We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms."}
          </p>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "条款中依其性质应在终止后继续有效的条款（包括但不限于知识产权条款、免责声明、责任限制和赔偿条款）将在终止后继续有效。"
              : "All provisions of the Terms which by their nature should survive termination shall survive termination, including without limitation intellectual property provisions, disclaimers, limitation of liability, and indemnification."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "10. 适用法律" : "10. Governing Law"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "本条款受中华人民共和国法律管辖并依其解释，不考虑法律冲突原则。"
              : "These Terms shall be governed by and construed in accordance with the laws of the People's Republic of China, without regard to conflict of law principles."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">{isZh ? "11. 联系我们" : "11. Contact Us"}</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {isZh
              ? "如果您对本服务条款有任何疑问，请通过以下方式联系我们："
              : "If you have any questions about these Terms of Service, please contact us:"}
          </p>
          <div className="mt-3 text-gray-700">
            <p>Email: <a href="mailto:legal@fasttool.app" className="text-indigo-600 hover:text-indigo-700">legal@fasttool.app</a></p>
          </div>
        </section>
      </article>
    </main>
  );
}

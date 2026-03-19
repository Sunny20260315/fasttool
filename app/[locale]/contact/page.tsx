import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { isLocale } from "@/lib/i18n";
import wxImage from "../../../public/wx.jpg";
import xhsImage from "../../../public/xhs.jpg";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "联系我们 - FastTool" : "Contact Us - FastTool",
    description:
      params.locale === "zh"
        ? "联系FastTool团队，提出问题、建议或合作意向。" 
        : "Contact the FastTool team with questions, suggestions, or partnership inquiries."
  };
}

export default function ContactPage({
  params
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const isZh = params.locale === "zh";

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isZh ? "联系我们" : "Contact Us"}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {isZh 
            ? "如有任何问题、建议或合作意向，欢迎随时联系我们。我们会尽快回复您。" 
            : "If you have any questions, suggestions, or partnership inquiries, please feel free to contact us. We will respond to you as soon as possible."
          }
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="border border-gray-200 rounded-2xl shadow-soft bg-white p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {isZh ? "联系我们" : "Contact Us"}
          </h2>
          <p className="text-gray-600 mb-8">
            {isZh ? "如有问题或合作意向，请通过以下方式联系我们，我会尽快回复。" : "If you have any questions or cooperation intentions, please contact us through the following methods, and I will reply as soon as possible."}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{isZh ? "邮箱" : "Email"}</h3>
                <p className="text-gray-600">yu1990jing@163.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{isZh ? "地址" : "Address"}</h3>
                <p className="text-gray-600">{isZh ? "中国 北京" : "China, Beijing"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl shadow-soft bg-white p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {isZh ? "关注我们" : "Follow Us"}
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-3">{isZh ? "微信" : "WeChat"}</h3>
              <div className="mx-auto w-48 h-48 bg-white p-2 border border-gray-200 rounded-lg shadow-sm relative">
                <Image src={wxImage} alt="WeChat QR Code" fill className="object-contain" />
              </div>
              <p className="mt-3 text-sm text-gray-600">{isZh ? "扫码联系我" : "Scan to follow"}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-3">{isZh ? "小红书" : "Xiaohongshu"}</h3>
              <div className="mx-auto w-48 h-48 bg-white p-2 border border-gray-200 rounded-lg shadow-sm relative">
                <Image src={xhsImage} alt="Xiaohongshu QR Code" fill className="object-contain" />
              </div>
              <p className="mt-3 text-sm text-gray-600">{isZh ? "扫码关注小红书" : "Scan to follow"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link 
          href={`/${params.locale}`} 
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          {isZh ? "返回首页" : "Back to Home"}
        </Link>
      </div>
    </main>
  );
}
"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Users, Clock } from "lucide-react";
// import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { useState } from "react";
import Image from "next/image";

type Props = {
  locale: Locale;
};

export function PortfolioAbout({ locale }: Props) {
  const [showWechatQr, setShowWechatQr] = useState(false);
  const stats = [
    {
      icon: Briefcase,
      value: "8+",
      label: locale === "zh" ? "年行业经验" : "Years of Experience",
    },
    {
      icon: Users,
      value: "200+",
      label: locale === "zh" ? "服务客户" : "Clients Served",
    },
    {
      icon: Award,
      value: "50+",
      label: locale === "zh" ? "项目完成" : "Projects Completed",
    },
    {
      icon: Clock,
      value: "99%",
      label: locale === "zh" ? "客户满意度" : "Client Satisfaction",
    },
  ];

  return (
    <>
      <section id="about" className="py-20 px-6 bg-[#f8f9fc] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="-bottom-6 -left-6  rounded-2xl p-6"
              >
                <div className="  p-8">
                  <div className="space-y-6">
                    {/* 邮箱 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {locale === "zh" ? "邮箱" : "Email"}
                        </h3>
                        <p className="text-gray-600">yu1990jing@163.com</p>
                      </div>
                    </div>

                    {/* 地址 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {locale === "zh" ? "地址" : "Address"}
                        </h3>
                        <p className="text-gray-600">
                          {locale === "zh" ? "中国 北京" : "China, Beijing"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 社交图标 */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-4">
                      {locale === "zh" ? "社交媒体" : "Social Media"}
                    </h3>
                    <div className="flex gap-4">
                      <div className="relative">
                        <button
                          onClick={() => setShowWechatQr(true)}
                          className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                            <svg
                              className="icon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="1709"
                              width="25"
                              height="25"
                            >
                              <path
                                d="M1024 619.52c0-143.36-138.24-256-307.2-256s-307.2 112.64-307.2 256 138.24 256 307.2 256c30.72 0 61.44-5.12 92.16-10.24l97.28 51.2-25.6-76.8c87.04-51.2 143.36-128 143.36-220.16z m-414.72-40.96c-30.72 0-51.2-20.48-51.2-51.2s20.48-51.2 51.2-51.2 51.2 20.48 51.2 51.2c0 25.6-25.6 51.2-51.2 51.2z m209.92 0c-30.72 0-51.2-20.48-51.2-51.2s20.48-51.2 51.2-51.2 51.2 20.48 51.2 51.2c0 25.6-25.6 51.2-51.2 51.2z"
                                fill="#4CBF00"
                                p-id="1710"
                              ></path>
                              <path
                                d="M358.4 609.28c0-158.72 153.6-286.72 348.16-286.72h15.36c-40.96-133.12-179.2-235.52-353.28-235.52-204.8 0-368.64 138.24-368.64 307.2 0 107.52 66.56 204.8 168.96 256l-30.72 92.16L256 686.08c35.84 10.24 71.68 15.36 112.64 15.36h10.24c-15.36-30.72-20.48-61.44-20.48-92.16z m138.24-414.72c35.84 0 66.56 30.72 66.56 66.56s-30.72 66.56-66.56 66.56C460.8 322.56 430.08 291.84 430.08 256S460.8 194.56 496.64 194.56zM245.76 322.56c-35.84 0-61.44-30.72-61.44-66.56s30.72-66.56 66.56-66.56 61.44 30.72 61.44 66.56-30.72 66.56-66.56 66.56z"
                                fill="#4CBF00"
                                p-id="1711"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                            微信
                          </span>
                        </button>
                        {/* 微信二维码弹窗 - 显示在微信图标上方 */}
                        {showWechatQr && (
                          <>
                            <div
                              className="fixed inset-0 z-50"
                              onClick={() => setShowWechatQr(false)}
                            ></div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50">
                              <div className="bg-white rounded-2xl p-4 shadow-xl">
                                <div className="text-center mb-3">
                                  <p className="text-xs text-gray-500">
                                    {locale === "zh"
                                      ? "扫码添加微信"
                                      : "Scan to add WeChat"}
                                  </p>
                                </div>
                                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-xl flex items-center justify-center">
                                  <Image
                                    src="/images/projects/wx.png"
                                    alt="WeChat QR Code"
                                    width={128}
                                    height={128}
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6 text-gray-700"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                          GitHub
                        </span>
                      </a>
                      <a
                        href="https://juejin.cn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                          <svg
                            viewBox="0 0 1316 1024"
                            className="w-6 h-6"
                            fill="#1E80FF"
                          >
                            <path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                          掘金
                        </span>
                      </a>
                      <a
                        href="https://blog.csdn.net/sinat_33255495"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                          <svg
                            className="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2727"
                            width="25"
                            height="25"
                          >
                            <path
                              d="M906.475693 943.728792c-49.491181 17.325597-152.164608 28.913517-295.537993 28.913517-412.545894 0-635.223462-193.912431-608.80579-450.249611C33.545364 216.96445 363.386627 45.025473 724.595296 45.025473c139.829675 0 222.1301 11.388375 299.383578 30.263258l-24.720008 205.822692c-51.434439-17.35118-171.688267-33.208333-269.12032-33.208333-212.388225 0-392.96493 63.425541-413.440264 263.878946-18.429745 179.328271 108.114346 265.024026 347.120812 265.024026 83.251076 0 205.89944-11.884678 262.580371-29.214369L906.475693 943.728792z"
                              fill="#d81e06"
                              p-id="2728"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                          CSDN
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {locale === "zh"
                  ? "专注创造有意义的产品体验"
                  : "Committed to Creating Meaningful Product Experiences"}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {locale === "zh"
                  ? "我是一名资深产品设计师和前端开发者，拥有8年以上的行业经验。曾主导多个大型企业级项目的设计与开发，涵盖小程序、APP、可视化大屏和企业网站等领域。"
                  : "I am a senior product designer and frontend developer with over 8 years of industry experience. I have led the design and development of multiple large enterprise-level projects, covering mini programs, apps, visualization screens, and enterprise websites."}
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                {locale === "zh"
                  ? "我相信好的设计不仅仅是美观，更重要的是解决问题、创造价值。每一个项目，我都致力于理解用户需求，用技术和创意为企业打造独特的数字体验。"
                  : "I believe good design is not just about aesthetics, but more importantly about solving problems and creating value. For every project, I am committed to understanding user needs and using technology and creativity to create unique digital experiences for businesses."}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

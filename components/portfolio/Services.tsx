"use client";

import { motion } from "framer-motion";
import { Palette, Code, Layout, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export default function Services({ locale }: Props) {
  const services = [
    {
      icon: Palette,
      title: locale === "zh" ? "UI/UX 设计" : "UI/UX Design",
      description:
        locale === "zh"
          ? "深入用户研究，打造直观优雅的界面体验。从用户画像到交互原型，提供完整的设计解决方案。"
          : "In-depth user research to create intuitive and elegant interface experiences. Complete design solutions from user personas to interactive prototypes.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      icon: Code,
      title: locale === "zh" ? "前端开发" : "Frontend Development",
      description:
        locale === "zh"
          ? "使用现代技术栈构建高性能网站和应用。响应式设计确保在所有设备上完美呈现。"
          : "Build high-performance websites and applications using modern technology stacks. Responsive design ensures perfect presentation on all devices.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: Layout,
      title: locale === "zh" ? "品牌设计" : "Brand Design",
      description:
        locale === "zh"
          ? "塑造独特的品牌视觉识别系统。从Logo设计到品牌手册，建立统一的品牌形象。"
          : "Shape unique brand visual identity systems. From logo design to brand guidelines, establish a unified brand image.",
      color: "from-violet-500 to-pink-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
    },
    {
      icon: Sparkles,
      title: locale === "zh" ? "创意咨询" : "Creative Consulting",
      description:
        locale === "zh"
          ? "提供专业的设计策略咨询。帮助企业理清设计方向，制定有效的数字化转型方案。"
          : "Provide professional design strategy consulting. Help businesses clarify design directions and develop effective digital transformation plans.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-6 bg-gradient-to-b from-white to-indigo-50/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {locale === "zh"
              ? "全方位设计解决方案"
              : "Comprehensive Design Solutions"}
          </h2>
          <p className="text-lg text-slate-600">
            {locale === "zh"
              ? "从创意构思到技术实现，我们提供完整的设计服务链条，助力企业数字化转型"
              : "From creative conception to technical implementation, we provide a complete design service chain to help businesses with digital transformation."}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative ${service.bgColor} rounded-2xl p-8 border ${service.borderColor} hover:border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5`}
            >
              {/* Icon */}
              <motion.div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Arrow indicator */}
              <motion.div
                className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ x: 4 }}
              >
                <svg
                  className="w-4 h-4 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import Services from "@/components/portfolio/Services";
import {
  PortfolioProjectCard as ProjectCard,
  Project,
} from "@/components/portfolio/ProjectCard";
import { PortfolioAbout as About } from "@/components/portfolio/About";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const PROJECTS_PER_PAGE = 6;

  const categories = [
    { id: "all", label: params.locale === "zh" ? "全部" : "All" },
    { id: "小程序", label: params.locale === "zh" ? "小程序" : "Mini Program" },
    { id: "APP", label: params.locale === "zh" ? "APP" : "APP" },
    {
      id: "可视化大屏",
      label: params.locale === "zh" ? "可视化大屏" : "Data Visualization",
    },
    {
      id: "企业网站",
      label: params.locale === "zh" ? "企业网站" : "Corporate Website",
    },
    { id: "三维地图", label: params.locale === "zh" ? "三维地图" : "3D Map" },
  ];

  const projects: Project[] =
    params.locale === "zh"
      ? [
          {
            id: "1",
            title: "智慧城市数据可视化平台",
            category: "可视化大屏",
            description:
              "为政府部门打造的城市运营数据实时监控系统,整合多源数据,提供直观的可视化展示",
            image: "/images/projects/dataviz.png",
            tags: ["数据可视化", "ECharts", "实时监控"],
            year: "2026",
          },
          {
            id: "2",
            title: "蕴义法律小程序",
            category: "小程序",
            description:
              "社区生鲜配送小程序,注重流畅的购物体验和高效的订单管理",
            image: "/images/projects/yunyi.png",
            tags: ["微信小程序", "电商", "UI设计"],
            year: "2025",
          },
          {
            id: "3",
            title: "智能校园活动助手",
            category: "网站",
            description: "AI 智能校园活动助手",
            image: "/images/projects/xy.png",
            tags: ["AI应用", "健康", "社交"],
            year: "2025",
          },
          {
            id: "4",
            title: "工业园区公司官网",
            category: "企业网站",
            description: "面向 B 端客户的科技公司官网,强调品牌调性与产品展示",
            image: "/images/projects/qy1.png",
            tags: ["企业官网", "响应式", "Next.js"],
            year: "2026",
          },
          {
            id: "5",
            title: "城市规划三维展示系统",
            category: "三维地图",
            description:
              "基于 Three.js 的城市规划三维可视化系统,支持多角度浏览和数据叠加",
            image: "/images/projects/sz.png",
            tags: ["Three.js", "3D", "WebGL"],
            year: "2025",
          },
          {
            id: "6",
            title: "科技公司官网",
            category: "APP",
            description: "科技驱动未来，创新引领变革",
            image: "/images/projects/kj.png",
            tags: ["科技", "官网", "互动"],
            year: "2024",
          },
          {
            id: "9",
            title: "音乐公司官网",
            category: "网站",
            description: "著名管乐队官网",
            image: "/images/projects/qy3.png",
            tags: ["科技", "官网", "互动"],
            year: "2024",
          },
          {
            id: "10",
            title: "地产公司官网",
            category: "网站",
            description: "中国领先的产业新城运营商官方网站",
            image: "/images/projects/qy2.png",
            tags: ["科技", "官网", "互动"],
            year: "2024",
          },
          {
            id: "7",
            title: "智能拓客小程序",
            category: "小程序",
            description: "智能拓客小程序，根据地图搜索相关行业客户信息",
            image: "/images/projects/xcx.png",
            tags: ["AI应用", "智能拓客", "交互设计"],
            year: "2024",
          },
          {
            id: "8",
            title: "工业监控数据大屏",
            category: "可视化大屏",
            description: "工厂生产线实时监控大屏,多维度展示生产数据和设备状态",
            image: "/images/projects/sz.png",
            tags: ["工业", "实时数据", "监控"],
            year: "2025",
          },
        ]
      : [
          {
            id: "1",
            title: "Smart City Data Visualization Platform",
            category: "Data Visualization",
            description:
              "A real-time urban operation data monitoring system for government departments, integrating multi-source data with intuitive visualization",
            image: "/images/projects/dataviz.png",
            tags: ["Data Visualization", "ECharts", "Real-time Monitoring"],
            year: "2026",
          },
          {
            id: "2",
            title: "Yunyi Legal Mini Program",
            category: "Mini Program",
            description:
              "Community fresh food delivery mini program focusing on smooth shopping experience and efficient order management",
            image: "/images/projects/yunyi.png",
            tags: ["WeChat Mini Program", "E-commerce", "UI Design"],
            year: "2025",
          },
          {
            id: "3",
            title: "AI Campus Activity Assistant",
            category: "Website",
            description: "AI-powered intelligent campus activity assistant",
            image: "/images/projects/xy.png",
            tags: ["AI Application", "Health", "Social"],
            year: "2025",
          },
          {
            id: "4",
            title: "Industrial Park Corporate Website",
            category: "Corporate Website",
            description:
              "Tech company website for B-end customers, emphasizing brand identity and product display",
            image: "/images/projects/qy1.png",
            tags: ["Corporate Website", "Responsive", "Next.js"],
            year: "2026",
          },
          {
            id: "5",
            title: "Urban Planning 3D Display System",
            category: "3D Map",
            description:
              "Three.js-based urban planning 3D visualization system with multi-angle browsing and data overlay",
            image: "/images/projects/sz.png",
            tags: ["Three.js", "3D", "WebGL"],
            year: "2025",
          },
          {
            id: "6",
            title: "Tech Company Official Website",
            category: "APP",
            description:
              "Technology drives the future, innovation leads change",
            image: "/images/projects/kj.png",
            tags: ["Technology", "Website", "Interactive"],
            year: "2024",
          },
          {
            id: "9",
            title: "Music Company Official Website",
            category: "Website",
            description: "Famous brass band official website",
            image: "/images/projects/qy3.png",
            tags: ["Technology", "Website", "Interactive"],
            year: "2024",
          },
          {
            id: "10",
            title: "Real Estate Company Official Website",
            category: "Website",
            description:
              "Leading industrial new town operator official website in China",
            image: "/images/projects/qy2.png",
            tags: ["Technology", "Website", "Interactive"],
            year: "2024",
          },
          {
            id: "7",
            title: "Smart Customer Acquisition Mini Program",
            category: "Mini Program",
            description:
              "Smart customer acquisition mini program, search for related industry customer information based on map",
            image: "/images/projects/xcx.png",
            tags: ["AI Application", "Smart Acquisition", "Interaction Design"],
            year: "2024",
          },
          {
            id: "8",
            title: "Industrial Monitoring Data Dashboard",
            category: "Data Visualization",
            description:
              "Factory production line real-time monitoring dashboard, multi-dimensional display of production data and equipment status",
            image: "/images/projects/sz.png",
            tags: ["Industrial", "Real-time Data", "Monitoring"],
            year: "2025",
          },
        ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE,
  );

  const handlePrevPage = () => {
    setCurrentPage((prev: number) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev: number) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <Navigation activeSection={activeSection} onNavigate={setActiveSection} /> */}

      <Hero locale={params.locale as "zh" | "en"} />
      <Services locale={params.locale as "zh" | "en"} />

      <section id="works" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-sm text-muted-foreground tracking-widest uppercase">
              {params.locale === "zh" ? "精选作品" : "Featured Work"}
            </div>
            <h2 className="text-4xl md:text-5xl tracking-tight">
              {params.locale === "zh" ? "设计案例展示" : "Design Case Studies"}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-3 flex-wrap"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentPage(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Navigation arrows and projects */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <motion.button
                  onClick={handlePrevPage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </motion.button>

                {/* Page indicators */}
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <motion.div
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                        currentPage === i
                          ? "w-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                          : "bg-slate-300 hover:bg-slate-400"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handleNextPage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </section>

      <About locale={params.locale as "zh" | "en"} />

      {/* <AnimatePresence> */}
      {/* {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence> */}
    </div>
  );
}

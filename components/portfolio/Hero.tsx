"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export default function Hero({ locale }: Props) {
  return (
    <section className="relative h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orb - purple */}
        <motion.div
          className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/20 via-purple-400/15 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, 80, 0],
            x: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium gradient orb - pink */}
        <motion.div
          className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-gradient-to-br from-pink-400/20 via-rose-400/15 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, -60, 0],
            x: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Small gradient orb - violet */}
        <motion.div
          className="absolute top-[60%] right-[30%] w-[250px] h-[250px] bg-gradient-to-br from-violet-300/20 via-purple-300/15 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-white/40 to-white/20"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100 - Math.random() * 100, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Animated fluid shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="fluidGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="fluidGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Large fluid wave */}
          <motion.path
            d="M0,320 C240,400 480,240 720,320 C960,400 1200,240 1440,320 L1440,800 L0,800 Z"
            fill="url(#fluidGrad1)"
            animate={{
              d: [
                "M0,320 C240,400 480,240 720,320 C960,400 1200,240 1440,320 L1440,800 L0,800 Z",
                "M0,360 C240,440 480,280 720,360 C960,440 1200,280 1440,360 L1440,800 L0,800 Z",
                "M0,280 C240,360 480,200 720,280 C960,360 1200,200 1440,280 L1440,800 L0,800 Z",
                "M0,320 C240,400 480,240 720,320 C960,400 1200,240 1440,320 L1440,800 L0,800 Z",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Medium fluid wave */}
          <motion.path
            d="M0,480 C360,560 720,400 1080,480 C1260,520 1350,490 1440,500 L1440,800 L0,800 Z"
            fill="url(#fluidGrad2)"
            animate={{
              d: [
                "M0,480 C360,560 720,400 1080,480 C1260,520 1350,490 1440,500 L1440,800 L0,800 Z",
                "M0,520 C360,600 720,440 1080,520 C1260,560 1350,530 1440,540 L1440,800 L0,800 Z",
                "M0,440 C360,520 720,360 1080,440 C1260,480 1350,450 1440,460 L1440,800 L0,800 Z",
                "M0,480 C360,560 720,400 1080,480 C1260,520 1350,490 1440,500 L1440,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Main heading */}
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {locale === "zh" ? "创造价值的" : "Creating Valuable"}
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent pt-4">
                {locale === "zh" ? "数字体验" : "Digital Experiences"}
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {locale === "zh"
                ? "深耕小程序、APP、可视化大屏、企业网站及三维场景等领域，用技术专长解决企业痛点，创造实际价值。"
                : "Specializing in mini programs, apps, visualization screens, enterprise websites and 3D scenes. Using technical expertise to solve business pain points and create real value."}
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#works"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
            >
              <span className="flex items-center gap-2">
                查看作品
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              {locale === "zh" ? "联系我们" : "Contact Us"}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {locale === "zh" ? "向下滚动" : "Scroll Down"}
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-slate-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

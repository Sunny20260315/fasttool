'use client';

import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BannerCarouselProps {
  locale: string;
}

export default function BannerCarousel({ locale }: BannerCarouselProps) {
  // Add custom styles for Swiper navigation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .swiper-button-prev,
      .swiper-button-next {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }
      
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        background: white;
        transform: scale(1.1);
      }
      
      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 10px;
        color: #666;
        font-weight: bold;
        transition: all 0.3s ease;
      }
      
      .swiper-button-prev:hover::after,
      .swiper-button-next:hover::after {
        color: #333;
      }
      
      .swiper-button-prev svg,
      .swiper-button-next svg {
        width: 50%;
        height: 50%;
        object-fit: contain;
        transform-origin: center center;
        fill: currentcolor;
        pointer-events: none;
      }
      
      .swiper-button-prev {
        left: 16px;
      }
      
      .swiper-button-next {
        right: 16px;
      }
      
      .swiper-pagination {
        bottom: 32px;
      }
      
      .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background: rgba(0, 0, 0, 0.3);
        opacity: 1;
      }
      
      .swiper-pagination-bullet-active {
        background: #333;
        width: 24px;
        border-radius: 4px;
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="w-full overflow-hidden border-b border-gray-200">
      <div className="w-full min-h-[500px] h-[60vh]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          navigation={true}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          className="w-full h-full"
        >
          {/* Image Tools Banner */}
          <SwiperSlide className="h-full">
            <section
              className="w-full h-full px-6 py-24 md:px-10 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(236,72,153,0.08), transparent 35%), linear-gradient(180deg, #f8fbff 0%, #fbfbfd 100%)",
              }}
            >
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-indigo-500 shadow-sm">
                  <span>⚡</span>
                  {locale === "zh"
                    ? "100% 免费 · 无需注册"
                    : "100% Free · No Sign-up Required"}
                </div>

                <h1 className="mb-6 text-4xl font-semibold tracking-tight text-gray-900 md:text-6xl !font-bold">
                  {locale === "zh" ? (
                    <>
                      免费在线
                      <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                        图片工具
                      </span>
                    </>
                  ) : (
                    <>
                      Free Online{
                        " "
                      }
                      <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                        FastTool
                      </span>
                    </>
                  )}
                </h1>

                <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-7 text-gray-600 hover:shadow-xl transition-all">
                  {locale === "zh"
                    ? "即时压缩、转换和调整图片尺寸。全部在浏览器中处理，快速、安全、私密。"
                    : "Compress, convert and resize images instantly. All processing happens in your browser - fast, secure, and private."}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href={`/${locale}#tools`}
                    className="inline-flex py-3 items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-8  text-white shadow-[0_10px_24px_rgba(79,70,229,0.35)] transition hover:from-indigo-600 hover:to-blue-600"
                  >
                    {locale === "zh" ? "浏览全部工具" : "Explore Tools"}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 group-hover:text-indigo-600 transition-all duration-300 ease-in-out" />
                  </Link>
                  <Link
                    href={`/${locale}/tools/compress-image`}
                    className="inline-flex py-3 items-center rounded-2xl border border-gray-200 bg-white px-8 text-gray-800 shadow-sm transition hover:bg-gray-50"
                  >
                    {locale === "zh" ? "试试压缩工具" : "Try Compressor"}
                  </Link>
                </div>
              </div>
            </section>
          </SwiperSlide>

          {/* PDF Tools Banner */}
          <SwiperSlide className="h-full">
            <section
              className="w-full h-full px-6 py-24 md:px-10 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 10% 30%, rgba(249,115,22,0.08), transparent 40%), radial-gradient(circle at 90% 70%, rgba(59,130,246,0.08), transparent 35%), linear-gradient(180deg, #fefefe 0%, #f9fafb 100%)",
              }}
            >
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white/80 px-4 py-2 text-sm font-medium text-orange-500 shadow-sm">
                  <span>📄</span>
                  {locale === "zh"
                    ? "PDF 格式转换" 
                    : "PDF Format Conversion"}
                </div>

                <h2 className="mb-6 text-4xl font-semibold tracking-tight text-gray-900 md:text-6xl !font-bold">
                  {locale === "zh" ? (
                    <>
                      高效
                      <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                        PDF 转换工具
                      </span>
                    </>
                  ) : (
                    <>
                      Efficient{
                        " "
                      }
                      <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                        PDF Conversion Tools
                      </span>
                    </>
                  )}
                </h2>

                <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-7 text-gray-600">
                  {locale === "zh"
                    ? "轻松转换 PDF 与 Word、Excel、PPT 等格式，支持批量处理，快速高效。"
                    : "Easily convert between PDF and Word, Excel, PPT formats with batch processing capabilities."}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href={`/${locale}/tools/pdf`}
                    className="inline-flex py-3 items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8  text-white shadow-[0_10px_24px_rgba(249,115,22,0.35)] transition hover:from-orange-600 hover:to-amber-600"
                  >
                    {locale === "zh" ? "PDF 转换工具" : "PDF Tools"}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 group-hover:text-orange-600 transition-all duration-300 ease-in-out" />
                  </Link>
                  <Link
                    href={`/${locale}/tools/pdf-to-word`}
                    className="inline-flex py-3 items-center rounded-2xl border border-gray-200 bg-white px-8 text-gray-800 shadow-sm transition hover:bg-gray-50"
                  >
                    {locale === "zh" ? "PDF转Word" : "PDF to Word"}
                  </Link>
                </div>
              </div>
            </section>
          </SwiperSlide>

          {/* Swiper Pagination */}
          <div className="swiper-pagination absolute bottom-8 left-0 right-0 flex justify-center gap-2"></div>
        </Swiper>
      </div>
    </section>
  );
}
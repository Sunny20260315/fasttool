import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function Footer({ locale }: Props) {
  const t = getMessages(locale);
  // 硬编码年份，避免服务器端和客户端渲染不一致
  const year = 2026;

  return (
    <footer className="relative z-10 mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">
            © {year} {t.site.name}. {t.footer.copyright}
          </p>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-500">
          <Link
            href={`/${locale}/tools/image`}
            className="transition hover:text-gray-800"
          >
            {t.nav.imageTools}
          </Link>
          <Link
            href={`/${locale}/tools/pdf`}
            className="transition hover:text-gray-800"
          >
            {t.nav.pdfTools}
          </Link>
          <a
            href={`/${locale}#services`}
            className="transition hover:text-gray-800"
          >
            {locale === "zh" ? "服务" : "Services"}
          </a>

          <Link
            href={`/${locale}/faq`}
            className="transition hover:text-gray-800"
          >
            {t.nav.faq}
          </Link>
          <Link
            href={`/${locale}/privacy`}
            className="transition hover:text-gray-800"
          >
            {t.nav.privacy}
          </Link>
          <Link
            href={`/${locale}/terms`}
            className="transition hover:text-gray-800"
          >
            {t.nav.terms || "Terms"}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

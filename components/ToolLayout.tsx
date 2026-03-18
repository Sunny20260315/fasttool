import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  locale: Locale;
  title: string;
  description: string;
  introduction: string;
  howToSteps: string[];
  faq: FAQItem[];
  children: ReactNode;
};

export function ToolLayout({ locale, title, description, introduction, howToSteps, faq, children }: Props) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-8 space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">{title}</h1>
        <p className="max-w-2xl text-gray-600">{description}</p>
      </header>

      <section className="mb-10">{children}</section>

      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="mb-2 text-2xl font-semibold">{locale === "zh" ? "工具介绍" : "Introduction"}</h2>
        <p className="text-gray-600">{introduction}</p>
      </section>

      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-2xl font-semibold">{locale === "zh" ? "使用教程" : "How to use"}</h2>
        <ol className="list-inside list-decimal space-y-2 text-gray-600">
          {howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-2xl font-semibold">{locale === "zh" ? "常见问题" : "FAQ"}</h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.question}>
              <h3 className="font-medium text-gray-900">{item.question}</h3>
              <p className="mt-1 text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}

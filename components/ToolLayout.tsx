import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

type FAQItem = {
  question: string;
  answer: string;
};

type UseCase = {
  title: string;
  description: string;
};

type Feature = {
  title: string;
  description: string;
};

type Props = {
  locale: Locale;
  title: string;
  description: string;
  introduction: string;
  howToSteps: string[];
  howToDetail?: string;
  faq: FAQItem[];
  useCases?: UseCase[];
  features?: Feature[];
  tips?: string[];
  children: ReactNode;
};

export function ToolLayout({ 
  locale, 
  title, 
  description, 
  introduction, 
  howToSteps, 
  howToDetail,
  faq, 
  useCases,
  features,
  tips,
  children 
}: Props) {
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

      {/* 工具介绍 */}
      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-2xl font-semibold">{locale === "zh" ? "工具介绍" : "Introduction"}</h2>
        <div className="prose prose-gray max-w-none text-gray-600">
          <p>{introduction}</p>
        </div>
      </section>

      {/* 功能特点 */}
      {features && features.length > 0 && (
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
          <h2 className="mb-4 text-2xl font-semibold">{locale === "zh" ? "功能特点" : "Features"}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 使用教程 */}
      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-2xl font-semibold">{locale === "zh" ? "使用教程" : "How to use"}</h2>
        <ol className="list-inside list-decimal space-y-3 text-gray-600">
          {howToSteps.map((step, index) => (
            <li key={index} className="pl-2">{step}</li>
          ))}
        </ol>
        {howToDetail && (
          <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <p>{howToDetail}</p>
          </div>
        )}
      </section>

      {/* 使用场景 */}
      {useCases && useCases.length > 0 && (
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
          <h2 className="mb-4 text-2xl font-semibold">{locale === "zh" ? "适用场景" : "Use Cases"}</h2>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-medium text-gray-900">{useCase.title}</h3>
                <p className="mt-1 text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 使用技巧 */}
      {tips && tips.length > 0 && (
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
          <h2 className="mb-4 text-2xl font-semibold">{locale === "zh" ? "使用技巧" : "Tips & Tricks"}</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 常见问题 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-2xl font-semibold">{locale === "zh" ? "常见问题" : "FAQ"}</h2>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium text-gray-900">{item.question}</h3>
              <p className="mt-2 text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}

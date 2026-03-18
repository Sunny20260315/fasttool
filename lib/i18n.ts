import en from "@/messages/en.json";
import zh from "@/messages/zh.json";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

type Messages = typeof en;

const dictionaries: Record<Locale, Messages> = {
  en,
  zh
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale) {
  return dictionaries[locale];
}

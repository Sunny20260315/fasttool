import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { tools } from "@/lib/tools";

const baseUrl = "https://fasttool.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/tools", "/tools/image", "/tools/pdf", "/about", "/privacy", "/blog", "/blog/webp-vs-jpeg-2026"];
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.7
      });
    }

    for (const tool of tools) {
      routes.push({
        url: `${baseUrl}/${locale}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8
      });
    }
  }

  return routes;
}

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://adboard-neon-city.nuttysugar21.chatgpt.site";
  return [
    { url: origin, changeFrequency: "weekly", priority: 1 },
    ...["ai-tech", "lifestyle", "gaming", "finance", "creative"].map((slug) => ({
      url: `${origin}/industries/${slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

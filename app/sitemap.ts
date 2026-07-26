import type { MetadataRoute } from "next";

const siteUrl = "https://pllana.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = {
    de: siteUrl,
    en: `${siteUrl}/?lang=en`,
    sq: `${siteUrl}/?lang=sq`,
  };

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/website-check`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/impressum`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/datenschutz`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/agb`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cookie-richtlinie`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Leon Pllana IT-Solutions",
    short_name: "pllana.io",
    description: "Strategischer Digitalisierungspartner für B2B-Unternehmen.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    categories: ["business", "productivity", "technology"],
    lang: "de",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}

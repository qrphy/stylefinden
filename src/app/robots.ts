// robots.txt yapılandırması — arama motorlarına hangi URL'lerin taranabileceğini bildirir.
// /api/, /_next/ ve /admin/ yolları tarayıcılardan gizlenir.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://stylefinden.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

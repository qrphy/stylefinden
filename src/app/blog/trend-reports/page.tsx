// Trend raporları kategori listeleme sayfası — "trend-reports" etiketli tüm blog yazılarını filtreler ve listeler.
import type { Metadata } from "next"
import BlogCategoryPage from "@/components/blog/BlogCategoryPage"
import { getBlogCategoryConfig } from "@/lib/blog-category-config"

const config = getBlogCategoryConfig("trend-reports")

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  alternates: { canonical: "https://stylefinden.com/blog/trend-reports" },
  openGraph: {
    title: `${config.seo.title} | STYLEFINDEN`,
    description: config.seo.description,
    url: "https://stylefinden.com/blog/trend-reports",
    type: "website",
    siteName: "STYLEFINDEN",
    locale: "en_US",
    images: [{ url: "/stylefinden-logo.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.seo.title} | STYLEFINDEN`,
    description: config.seo.description,
    images: ["/stylefinden-logo.png"],
  },
}

export default function Page() {
  return <BlogCategoryPage category="trend-reports" config={config} />
}

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
}

export default function Page() {
  return <BlogCategoryPage category="trend-reports" config={config} />
}

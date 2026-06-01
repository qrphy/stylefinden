// Trend raporları kategori listeleme sayfası — "trend-reports" etiketli tüm blog yazılarını filtreler ve listeler.
import type { Metadata } from "next"
import BlogCategoryPage from "@/components/blog/BlogCategoryPage"
import { getBlogCategoryConfig } from "@/lib/blog-category-config"
import { buildMetadata } from "@/components/seo/MetadataBuilder"

const config = getBlogCategoryConfig("trend-reports")

export const metadata: Metadata = buildMetadata({
  title: config.seo.title,
  description: config.seo.description,
  canonical: "https://stylefinden.com/blog/trend-reports",
  keywords: config.seo.keywords,
})

export default function Page() {
  return <BlogCategoryPage category="trend-reports" config={config} />
}

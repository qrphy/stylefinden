// Saç stili rehberleri kategori listeleme sayfası — "hairstyle-guides" etiketli tüm blog yazılarını filtreler ve listeler.
import type { Metadata } from "next"
import BlogCategoryPage from "@/components/blog/BlogCategoryPage"
import { getBlogCategoryConfig } from "@/lib/blog-category-config"
import { buildMetadata } from "@/components/seo/MetadataBuilder"

const config = getBlogCategoryConfig("hairstyle-guides")

export const metadata: Metadata = buildMetadata({
  title: config.seo.title,
  description: config.seo.description,
  canonical: "https://stylefinden.com/blog/hairstyle-guides",
  keywords: config.seo.keywords,
})

export default function Page() {
  return <BlogCategoryPage category="hairstyle-guides" config={config} />
}

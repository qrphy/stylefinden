// Saç stili rehberleri kategori listeleme sayfası — "hairstyle-guides" etiketli tüm blog yazılarını filtreler ve listeler.
import type { Metadata } from "next"
import BlogCategoryPage from "@/components/blog/BlogCategoryPage"
import { getBlogCategoryConfig } from "@/lib/blog-category-config"

const config = getBlogCategoryConfig("hairstyle-guides")

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  alternates: { canonical: "https://stylefinden.com/blog/hairstyle-guides" },
}

export default function Page() {
  return <BlogCategoryPage category="hairstyle-guides" config={config} />
}

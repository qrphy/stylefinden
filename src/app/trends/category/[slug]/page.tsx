// Kategoriye göre trend koleksiyon detay sayfası — /trends/category/[slug] route'u.
// sanityFilter varsa Sanity'den trend verisi çeker; yoksa boş liste döner.
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import TrendCollectionPage from "@/components/trends/TrendCollectionPage"
import { getTrendCategoryConfig, TREND_CATEGORY_CONFIGS } from "@/lib/trend-collection-config"
import { buildMetadata } from "@/components/seo/MetadataBuilder"

export const dynamicParams = true

export async function generateStaticParams() {
  return Object.keys(TREND_CATEGORY_CONFIGS).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getTrendCategoryConfig(slug)
  return buildMetadata({
    title: config.seo.title,
    description: config.seo.description,
    canonical: `https://stylefinden.com/trends/category/${slug}`,
    keywords: config.seo.keywords,
  })
}

export default async function TrendCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getTrendCategoryConfig(slug)

  const trends = config.sanityFilter
    ? await client.withConfig({ useCdn: false }).fetch(
        `*[_type == "trend" && ${config.sanityFilter} && defined(slug.current)] | order(_createdAt desc) { _id, title, "slug": slug.current, image, season, category, tags }`,
        {},
        { next: { revalidate: 3600, tags: ["trend"] } },
      )
    : []

  return <TrendCollectionPage slug={slug} dimension="category" config={config} trends={trends} />
}

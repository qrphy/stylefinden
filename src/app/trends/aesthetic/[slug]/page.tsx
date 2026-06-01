// Estetiğe göre trend koleksiyon detay sayfası — /trends/aesthetic/[slug] route'u.
import type { Metadata } from "next"
import TrendCollectionPage from "@/components/trends/TrendCollectionPage"
import { getTrendAestheticConfig, TREND_AESTHETIC_CONFIGS } from "@/lib/trend-collection-config"
import { buildMetadata } from "@/components/seo/MetadataBuilder"

export const dynamicParams = true

export async function generateStaticParams() {
  return Object.keys(TREND_AESTHETIC_CONFIGS).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getTrendAestheticConfig(slug)
  return buildMetadata({
    title: config.seo.title,
    description: config.seo.description,
    canonical: `https://stylefinden.com/trends/aesthetic/${slug}`,
    keywords: config.seo.keywords,
  })
}

export default async function TrendAestheticPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getTrendAestheticConfig(slug)
  // Aesthetic slug'ları Sanity'de ayrı bir alan olmadığından sorgu yapılmaz
  return <TrendCollectionPage slug={slug} dimension="aesthetic" config={config} trends={[]} />
}

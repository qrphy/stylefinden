import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { getTrend } from "@/lib/sanity-fetchers"
import { buildMetadata } from "@/components/seo/MetadataBuilder"
import { trendSeasonLabel, trendCategoryLabel } from "@/lib/trend-labels"
import TrendDetail from "@/components/trends/TrendDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "trend" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const trend = await getTrend(slug)
  if (!trend) return {}

  const ogImage  = trend.image ? urlFor(trend.image).width(1200).height(630).url() : undefined
  const season   = trend.season   ? (trendSeasonLabel[trend.season]     ?? trend.season)   : ""
  const category = trend.category ? (trendCategoryLabel[trend.category] ?? trend.category) : ""

  const description = trend.description
    ? `${trend.description.slice(0, 140)} — STYLEFINDEN.`
    : `Discover the ${trend.title}${season ? ` ${season}` : ""} trend${category ? ` in ${category}` : ""}. Stay ahead of fashion on STYLEFINDEN.`

  return buildMetadata({
    title: trend.title,
    description,
    canonical: `https://stylefinden.com/trends/${slug}`,
    ogImage,
    keywords: [trend.title, season, category, "fashion trend", "style", "STYLEFINDEN"].filter(Boolean),
  })
}

export default async function TrendPage({ params }: Props) {
  const { slug } = await params
  const trend = await getTrend(slug)
  if (!trend) notFound()

  return <TrendDetail trend={trend} />
}

// Mevsime göre trend koleksiyon detay sayfası — /trends/season/[slug] route'u.
import type { Metadata } from "next"
import TrendCollectionPage from "@/components/trends/TrendCollectionPage"
import { getTrendSeasonConfig, TREND_SEASON_CONFIGS } from "@/lib/trend-collection-config"

export const dynamicParams = true

export async function generateStaticParams() {
  return Object.keys(TREND_SEASON_CONFIGS).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getTrendSeasonConfig(slug)
  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/trends/season/${slug}` },
    openGraph: {
      title: `${config.seo.title} | STYLEFINDEN`,
      description: config.seo.description,
      url: `https://stylefinden.com/trends/season/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
      images: [{ url: "/stylefinden-logo.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.seo.title} | STYLEFINDEN`,
      description: config.seo.description,
      images: ["/stylefinden-logo.png"],
    },
  }
}

export default async function TrendSeasonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getTrendSeasonConfig(slug)
  // Season slug'ları Sanity'deki season alanıyla bire-bir eşleşmediğinden sorgu yapılmaz
  return <TrendCollectionPage slug={slug} dimension="season" config={config} trends={[]} />
}

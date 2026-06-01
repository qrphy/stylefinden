// Ortam/duruma göre outfit kategori sayfası — /outfits/occasion/[slug] route'u.
// Fallback deseni: Sanity'de slug'a uyan outfit varsa oradan çek, yoksa config.staticFallback.
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { buildMetadata } from "@/components/seo/MetadataBuilder"
import { urlFor } from "@/sanity/lib/image"
import { OUTFITS_BY_OCCASION_QUERY } from "@/lib/queries"
import OutfitGridCategoryPage from "@/components/shared/OutfitGridCategoryPage"
import { type ConversionConfig } from "@/components/shared/ConversionCategoryPage"
import { getOccasionConfig, OCCASION_CONFIGS } from "@/lib/outfit-occasion-config"
import type { OutfitItem } from "@/types/outfit-category"

function buildConversionConfig(config: ReturnType<typeof getOccasionConfig>, items: OutfitItem[]): ConversionConfig {
  return {
    introText: config.description,
    variations: items.slice(0, 8).map((o) => o.title),
  }
}

// Sanity sayfalarını dinamik olarak da render eder — config'de olmayan yeni occasion'lar için
export const dynamicParams = true

type SanityImg = { asset?: object; hotspot?: object; crop?: object; lqip?: string }

// Sanity dökümanını CategoryPage OutfitItem formatına dönüştürür
function toItem(o: {
  _id: string
  title: string
  slug: string
  image?: SanityImg
  style?: string
  season?: string
  occasion?: string
  tags?: string[]
  featured?: boolean
  pieces?: Array<{ _key?: string; name: string; image?: SanityImg; affiliateUrl?: string }>
}): OutfitItem {
  return {
    id: o._id,
    title: o.title,
    subtitle: [o.style, o.season ?? o.occasion].filter(Boolean).join(" · "),
    tag: o.featured ? "Trending" : o.tags?.[0] === "New" ? "New" : "Popular",
    style: o.style ?? "",
    image: o.image ? urlFor(o.image).width(1400).height(1867).url() : undefined,
    lqip: o.image?.lqip,
    href: `/outfits/${o.slug}`,
    pieces: o.pieces?.map((p, i) => ({
      key: p._key ?? String(i),
      name: p.name,
      image: p.image ? urlFor(p.image).width(80).height(80).url() : undefined,
      affiliateUrl: p.affiliateUrl,
    })),
  }
}

// Build zamanında config key'leri + Sanity değerlerini birleştirerek statik parametre üretir
export async function generateStaticParams() {
  const sanityValues = await client
    .withConfig({ useCdn: false })
    .fetch<string[]>(`array::unique(*[_type == "outfit" && defined(occasion)].occasion)`)
  const allSlugs = [...new Set([...Object.keys(OCCASION_CONFIGS), ...sanityValues])]
  return allSlugs.map((slug) => ({ slug }))
}

// Slug'a göre SEO metadata oluşturur
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getOccasionConfig(slug)
  return buildMetadata({
    title: config.seo.title,
    description: config.seo.description,
    canonical: `https://stylefinden.com/outfits/occasion/${slug}`,
    keywords: config.seo.keywords,
  })
}

// Sayfa bileşeni: Sanity verisi yoksa config.staticFallback uygular, CategoryPage'e iletir
export default async function OccasionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getOccasionConfig(slug)
  const outfits = await client.fetch(
    OUTFITS_BY_OCCASION_QUERY,
    { occasion: slug },
    { next: { revalidate: 3600, tags: ["outfit"] } },
  )
  const items: OutfitItem[] =
    outfits.length > 0
      ? outfits.map(toItem).map((item: OutfitItem) => ({ ...item, href: `${item.href}?from=occasion/${slug}` }))
      : (config.staticFallback ?? [])
  return (
    <OutfitGridCategoryPage
      data={{ ...config, outfits: items }}
      config={buildConversionConfig(config, items)}
      slug={slug}
      basePath="/outfits/occasion"
      categoryLink={{ label: "Outfits", href: "/outfits" }}
      styleGuideSuffix="style it right"
    />
  )
}

// Ortam/duruma göre outfit kategori sayfası — /outfits/occasion/[slug] route'u.
// Fallback deseni: Sanity'de slug'a uyan outfit varsa oradan çek, yoksa config.staticFallback.
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { OUTFITS_BY_OCCASION_QUERY } from "@/lib/queries"
import CategoryPage from "@/components/shared/CategoryPage"
import { getOccasionConfig, OCCASION_CONFIGS } from "@/lib/outfit-occasion-config"
import type { OutfitItem } from "@/types/outfit-category"

// Sanity sayfalarını dinamik olarak da render eder — config'de olmayan yeni occasion'lar için
export const dynamicParams = true

// Sanity dökümanını CategoryPage OutfitItem formatına dönüştürür
function toItem(o: {
  _id: string
  title: string
  slug: string
  image?: object
  style?: string
  season?: string
  occasion?: string
  tags?: string[]
  featured?: boolean
}): OutfitItem {
  return {
    id: o._id,
    title: o.title,
    subtitle: [o.style, o.season ?? o.occasion].filter(Boolean).join(" · "),
    tag: o.featured ? "Trending" : o.tags?.[0] === "New" ? "New" : "Popular",
    style: o.style ?? "",
    image: o.image ? urlFor(o.image).width(400).height(533).url() : undefined,
    href: `/outfits/${o.slug}`,
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
  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/occasion/${slug}` },
    openGraph: {
      title: `${config.seo.title} | STYLEFINDEN`,
      description: config.seo.description,
      url: `https://stylefinden.com/outfits/occasion/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  }
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
    outfits.length > 0 ? outfits.map(toItem) : (config.staticFallback ?? [])
  return (
    <CategoryPage
      data={{ ...config, outfits: items }}
      slug={slug}
      basePath="/outfits/occasion"
      categoryLink={{ label: "Occasion", href: "/outfits/occasion" }}
      tipSuffix="for this occasion."
      styleGuideSuffix="style it right"
    />
  )
}

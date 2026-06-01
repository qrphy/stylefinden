import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { getOutfit, getOutfitsByPieceTags, getSimilarPieces } from "@/lib/sanity-fetchers"
import OutfitDetail from "@/components/outfits/OutfitDetail"
import { styleLabel, occasionLabel, seasonLabel } from "@/lib/outfit-labels"
import { buildMetadata } from "@/components/seo/MetadataBuilder"
import { urlFor } from "@/sanity/lib/image"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string }>
}

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "outfit" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const outfit = await getOutfit(slug)
  if (!outfit) return {}

  const ogImage = outfit.image ? urlFor(outfit.image).width(1200).height(630).url() : undefined
  const style    = outfit.style   ? (styleLabel[outfit.style]     ?? outfit.style)    : ""
  const occasion = outfit.occasion ? (occasionLabel[outfit.occasion] ?? outfit.occasion) : ""
  const description = outfit.description
    ?? `Discover the ${outfit.title} outfit${style ? ` — ${style} style` : ""}${occasion ? ` for ${occasion}` : ""}. Get inspired on STYLEFINDEN.`

  return buildMetadata({
    title: outfit.title,
    description,
    canonical: `https://stylefinden.com/outfits/${slug}`,
    ogImage,
    keywords: [outfit.title, style, occasion, "outfit", "fashion", "STYLEFINDEN"].filter(Boolean),
  })
}

function resolveBreadcrumbContext(from: string | undefined): { href: string; label: string } | undefined {
  if (!from) return undefined
  const [type, ...rest] = from.split("/")
  const categorySlug = rest.join("/")
  if (!categorySlug || !["style", "occasion", "season"].includes(type)) return undefined
  const labelMap = type === "style" ? styleLabel : type === "occasion" ? occasionLabel : seasonLabel
  const label = labelMap[categorySlug]
    ?? categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  return { href: `/outfits/${type}/${categorySlug}`, label }
}

export default async function OutfitPage({ params, searchParams }: Props) {
  const { slug } = await params
  const [outfit, { from }] = await Promise.all([getOutfit(slug), searchParams])
  if (!outfit) notFound()

  const pieces = (outfit.pieces ?? []) as Array<{ type?: string; colorTag?: string; itemTag?: string }>

  const [outfitsByPieces, similarPiecesRaw] = await Promise.all([
    pieces.length > 0
      ? getOutfitsByPieceTags(outfit._id, pieces)
      : Promise.resolve([]),
    pieces.length > 0
      ? getSimilarPieces(outfit._id, pieces)
      : Promise.resolve([]),
  ])

  return (
    <OutfitDetail
      outfit={outfit}
      outfitsByPieces={outfitsByPieces ?? []}
      similarPiecesRaw={similarPiecesRaw ?? []}
      breadcrumbContext={resolveBreadcrumbContext(from)}
    />
  )
}

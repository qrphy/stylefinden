import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { getOutfit, getOutfitsByPieceTags, getSimilarPieces } from "@/lib/sanity-fetchers"
import OutfitDetail from "@/components/outfits/OutfitDetail"
import { styleLabel, occasionLabel, seasonLabel } from "@/lib/outfit-labels"

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
  return {
    title: outfit.title,
    description: outfit.description ?? `Discover the ${outfit.title} outfit on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/outfits/${slug}` },
  }
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

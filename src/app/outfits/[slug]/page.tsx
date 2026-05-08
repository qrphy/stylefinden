import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { getOutfit, getOutfitsByPieceTags } from "@/lib/sanity-fetchers"
import OutfitDetail from "@/components/outfits/OutfitDetail"

type Props = { params: Promise<{ slug: string }> }

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

export default async function OutfitPage({ params }: Props) {
  const { slug } = await params
  const outfit = await getOutfit(slug)
  if (!outfit) notFound()

  const pieces = (outfit.pieces ?? []) as Array<{ colorTag?: string; itemTag?: string }>
  const colors = [...new Set(pieces.map((p) => p.colorTag).filter((c): c is string => Boolean(c)))]
  const items  = [...new Set(pieces.map((p) => p.itemTag).filter((i): i is string => Boolean(i)))]

  const outfitsByPieces = (colors.length > 0 || items.length > 0)
    ? await getOutfitsByPieceTags(outfit._id, colors, items)
    : []

  return <OutfitDetail outfit={outfit} outfitsByPieces={outfitsByPieces ?? []} />
}

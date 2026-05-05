import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { getOutfit, getSimilarOutfits } from "@/lib/sanity-fetchers"
import OutfitDetail from "@/components/outfits/OutfitDetail"
import type { SimilarOutfitItem } from "@/components/outfits/OutfitDetail"

type Props = { params: Promise<{ slug: string }> }

// Geçici placeholder — Sanity'de birden fazla outfit eklenince otomatik kalkar
const PLACEHOLDER_SIMILAR: SimilarOutfitItem[] = [
  { _id: "ph1", title: "Minimal Trench Look",       slug: "#" },
  { _id: "ph2", title: "Classic White Shirt Set",   slug: "#" },
  { _id: "ph3", title: "Evening Silk Midi",         slug: "#" },
  { _id: "ph4", title: "Structured Knit Ensemble",  slug: "#" },
]

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

  const similarOutfits = await getSimilarOutfits(
    outfit._id,
    outfit.style ?? "",
    outfit.occasion ?? ""
  )

  const displaySimilar = similarOutfits?.length ? similarOutfits : PLACEHOLDER_SIMILAR

  return <OutfitDetail outfit={outfit} similarOutfits={displaySimilar} />
}

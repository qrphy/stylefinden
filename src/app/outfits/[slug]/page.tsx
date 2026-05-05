import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { getOutfit, getSimilarOutfits } from "@/lib/sanity-fetchers"
import { buildMetadata } from "@/components/seo/MetadataBuilder"
import { styleLabel, seasonLabel, occasionLabel } from "@/lib/outfit-labels"
import OutfitDetail from "@/components/outfits/OutfitDetail"
import type { SimilarOutfitItem } from "@/components/outfits/OutfitDetail"

type Props = { params: Promise<{ slug: string }> }

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

  const ogImage = outfit.image ? urlFor(outfit.image).width(1200).height(630).url() : undefined
  const style   = outfit.style   ? (styleLabel[outfit.style]     ?? outfit.style)   : ""
  const occ     = outfit.occasion ? (occasionLabel[outfit.occasion] ?? outfit.occasion) : ""
  const season  = outfit.season  ? (seasonLabel[outfit.season]   ?? outfit.season)  : ""

  const description = outfit.description
    ? `${outfit.description} Shop all pieces on STYLEFINDEN.`
    : `Discover the ${outfit.title}${style ? ` ${style}` : ""} outfit${occ ? ` — perfect for ${occ}` : ""}. Shop all pieces on STYLEFINDEN.`

  return buildMetadata({
    title: outfit.title,
    description,
    canonical: `https://stylefinden.com/outfits/${slug}`,
    ogImage,
    keywords: [outfit.title, style, occ, season, "outfit", "look", "fashion", "STYLEFINDEN"].filter(Boolean),
  })
}

export default async function OutfitPage({ params }: Props) {
  const { slug } = await params
  const outfit = await getOutfit(slug)
  if (!outfit) notFound()

  const similarOutfits = await getSimilarOutfits(outfit._id, outfit.style ?? "", outfit.occasion ?? "")
  const displaySimilar = similarOutfits?.length ? similarOutfits : PLACEHOLDER_SIMILAR

  return <OutfitDetail outfit={outfit} similarOutfits={displaySimilar} />
}

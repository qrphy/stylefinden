import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { getOutfit } from "@/lib/sanity-fetchers"
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

  return <OutfitDetail outfit={outfit} />
}

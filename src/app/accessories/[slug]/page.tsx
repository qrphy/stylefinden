import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { getAccessory } from "@/lib/sanity-fetchers"
import { buildMetadata } from "@/components/seo/MetadataBuilder"
import { accessoryTypeLabel, accessoryOccasionLabel } from "@/lib/accessory-labels"
import AccessoryDetail from "@/components/accessories/AccessoryDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "accessory" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = await getAccessory(slug)
  if (!item) return {}

  const ogImage = item.image ? urlFor(item.image).width(1200).height(630).url() : undefined
  const type    = item.type    ? (accessoryTypeLabel[item.type]       ?? item.type)    : ""
  const occ     = item.occasion ? (accessoryOccasionLabel[item.occasion] ?? item.occasion) : ""

  const description = item.description
    ? `${item.description} Find matching outfits on STYLEFINDEN.`
    : `Shop ${item.title}${type ? ` — ${type}` : ""}${occ ? ` for ${occ}` : ""}. Find matching outfits on STYLEFINDEN.`

  return buildMetadata({
    title: item.title,
    description,
    canonical: `https://stylefinden.com/accessories/${slug}`,
    ogImage,
    keywords: [item.title, type, occ, "accessory", "accessories", "fashion", "STYLEFINDEN"].filter(Boolean),
  })
}

export default async function AccessoryPage({ params }: Props) {
  const { slug } = await params
  const item = await getAccessory(slug)
  if (!item) notFound()

  return <AccessoryDetail item={item} />
}

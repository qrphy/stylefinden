import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { getHairstyle } from "@/lib/sanity-fetchers"
import { buildMetadata } from "@/components/seo/MetadataBuilder"
import { hairstyleTypeLabel, hairstyleLengthLabel, hairstyleOccasionLabel } from "@/lib/hairstyle-labels"
import HairstyleDetail from "@/components/hairstyles/HairstyleDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "hairstyle" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const h = await getHairstyle(slug)
  if (!h) return {}

  const ogImage = h.image ? urlFor(h.image).width(1200).height(630).url() : undefined
  const type    = h.type   ? (hairstyleTypeLabel[h.type]       ?? h.type)    : ""
  const length  = h.length ? (hairstyleLengthLabel[h.length]   ?? h.length)  : ""
  const occ     = h.occasion ? (hairstyleOccasionLabel[h.occasion] ?? h.occasion) : ""

  const description = h.description
    ? `${h.description} Get inspired on STYLEFINDEN.`
    : `${h.title}${type ? ` — ${type}` : ""}${length ? `, ${length}` : ""}${occ ? ` hairstyle for ${occ}` : " hairstyle"}. Get styling inspiration on STYLEFINDEN.`

  return buildMetadata({
    title: h.title,
    description,
    canonical: `https://stylefinden.com/hairstyles/${slug}`,
    ogImage,
    keywords: [h.title, type, length, occ, "hairstyle", "hair", "style", "STYLEFINDEN"].filter(Boolean),
  })
}

export default async function HairstylePage({ params }: Props) {
  const { slug } = await params
  const hairstyle = await getHairstyle(slug)
  if (!hairstyle) notFound()

  return <HairstyleDetail hairstyle={hairstyle} />
}

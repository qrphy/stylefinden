import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { getAccessory } from "@/lib/sanity-fetchers"
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
  return {
    title: item.title,
    description: item.description ?? `Discover the ${item.title} accessory on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/accessories/${slug}` },
  }
}

export default async function AccessoryPage({ params }: Props) {
  const { slug } = await params
  const item = await getAccessory(slug)
  if (!item) notFound()

  return <AccessoryDetail item={item} />
}

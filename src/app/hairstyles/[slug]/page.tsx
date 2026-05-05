import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { getHairstyle } from "@/lib/sanity-fetchers"
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
  const hairstyle = await getHairstyle(slug)
  if (!hairstyle) return {}
  return {
    title: hairstyle.title,
    description: hairstyle.description ?? `Discover the ${hairstyle.title} hairstyle on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/hairstyles/${slug}` },
  }
}

export default async function HairstylePage({ params }: Props) {
  const { slug } = await params
  const hairstyle = await getHairstyle(slug)
  if (!hairstyle) notFound()

  return <HairstyleDetail hairstyle={hairstyle} />
}

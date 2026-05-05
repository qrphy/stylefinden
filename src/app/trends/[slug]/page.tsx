import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { getTrend } from "@/lib/sanity-fetchers"
import TrendDetail from "@/components/trends/TrendDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "trend" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const trend = await getTrend(slug)
  if (!trend) return {}
  return {
    title: trend.title,
    description: trend.description ?? `Discover the ${trend.title} trend on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/trends/${slug}` },
  }
}

export default async function TrendPage({ params }: Props) {
  const { slug } = await params
  const trend = await getTrend(slug)
  if (!trend) notFound()

  return <TrendDetail trend={trend} />
}

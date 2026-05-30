import { ImageResponse } from 'next/og'
import { client } from '@/sanity/lib/client'
import { OG_SIZE, OG_CONTENT_TYPE, sanityOgImageUrl } from '@/lib/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'nodejs'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

const CATEGORY_LABELS: Record<string, string> = {
  'trend-reports': 'TREND REPORT',
  'seasonal-guides': 'SEASONAL GUIDE',
  'occasion-guides': 'OCCASION GUIDE',
  'hairstyle-guides': 'HAIRSTYLE GUIDE',
  'accessories-guides': 'ACCESSORIES GUIDE',
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const data = await client.fetch<{
    title: string
    category: string | null
    imageRef: string | null
  } | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      title, category,
      "imageRef": heroImage.asset._ref
    }`,
    { slug },
    { next: { revalidate: 3600 } }
  )

  if (!data) return new Response('Not found', { status: 404 })

  const categoryLabel = data.category
    ? (CATEGORY_LABELS[data.category] ?? data.category.replace(/-/g, ' ').toUpperCase())
    : 'BLOG'

  return new ImageResponse(
    <OgCard
      category={categoryLabel}
      title={data.title}
      tags={[]}
      imageUrl={sanityOgImageUrl(data.imageRef)}
    />,
    { width: 1200, height: 630 }
  )
}

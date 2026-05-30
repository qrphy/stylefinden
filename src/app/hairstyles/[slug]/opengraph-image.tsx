import { ImageResponse } from 'next/og'
import { client } from '@/sanity/lib/client'
import { OG_SIZE, OG_CONTENT_TYPE, sanityOgImageUrl } from '@/lib/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'nodejs'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const data = await client.fetch<{
    title: string
    type: string | null
    length: string | null
    occasion: string | null
    imageRef: string | null
  } | null>(
    `*[_type == "hairstyle" && slug.current == $slug][0] {
      title, type, length, occasion,
      "imageRef": image.asset._ref
    }`,
    { slug },
    { next: { revalidate: 3600 } }
  )

  if (!data) return new Response('Not found', { status: 404 })

  const tags = [data.type, data.length, data.occasion]
    .filter(Boolean)
    .map(t => t!.replace(/-/g, ' ').toUpperCase())

  return new ImageResponse(
    <OgCard
      category="HAIRSTYLE"
      title={data.title}
      tags={tags}
      imageUrl={sanityOgImageUrl(data.imageRef)}
    />,
    { width: 1200, height: 630 }
  )
}

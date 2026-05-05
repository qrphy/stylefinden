import type { Metadata } from 'next'

const SITE_NAME = 'STYLEFINDEN'
const DEFAULT_OG = '/stylefinden-logo.png'

type BuildMetadataOptions = {
  title: string
  description: string
  canonical: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  keywords?: string[]
}

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
  type = 'website',
  publishedTime,
  keywords,
}: BuildMetadataOptions): Metadata {
  const images = ogImage
    ? [{ url: ogImage, width: 1200, height: 630 }]
    : [{ url: DEFAULT_OG }]

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      siteName: SITE_NAME,
      locale: 'en_US',
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((i) => i.url),
    },
  }
}

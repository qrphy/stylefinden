import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { QUIZ_RESULT_OUTFITS_QUERY, QUIZ_RESULT_FALLBACK_QUERY } from '@/lib/queries'
import { STYLE_PROFILES } from '@/lib/style-profiles'
import StyleResultPage from '../StyleResultPage'

type Props = {
  params: Promise<{ style: string }>
  searchParams: Promise<{ occasion?: string; season?: string }>
}

const FETCH_OPTS = { next: { revalidate: 3600, tags: ['outfit'] } }

export function generateStaticParams() {
  return Object.keys(STYLE_PROFILES).map((style) => ({ style }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { style } = await params
  const profile = STYLE_PROFILES[style]
  if (!profile) return {}
  return {
    title: `${profile.name} Style — Quiz Result | STYLEFINDEN`,
    description: `You got ${profile.name}. ${profile.tagline} Discover outfits curated for your personality.`,
    alternates: { canonical: `https://stylefinden.com/style-quiz/result/${style}` },
    openGraph: {
      images: [{ url: `/api/og/quiz-result?style=${style}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og/quiz-result?style=${style}`],
    },
  }
}

export default async function StyleResultSlugPage({ params, searchParams }: Props) {
  const { style } = await params
  const profile = STYLE_PROFILES[style]
  if (!profile) notFound()

  const { occasion, season } = await searchParams

  let outfits = await client.fetch(
    QUIZ_RESULT_OUTFITS_QUERY,
    { style, occasion: occasion ?? '' },
    FETCH_OPTS,
  )

  const usingFallback = !outfits?.length
  if (usingFallback) {
    outfits = await client.fetch(
      QUIZ_RESULT_FALLBACK_QUERY,
      { occasion: occasion ?? '' },
      FETCH_OPTS,
    )
  }

  const qs = new URLSearchParams()
  if (occasion) qs.set('occasion', occasion)
  if (season && season !== 'any') qs.set('season', season)
  const resultUrl = `/style-quiz/result/${style}${qs.size ? `?${qs}` : ''}`

  return (
    <StyleResultPage
      styleKey={style}
      profile={profile}
      occasion={occasion}
      outfits={outfits ?? []}
      usingFallback={usingFallback}
      resultUrl={resultUrl}
    />
  )
}

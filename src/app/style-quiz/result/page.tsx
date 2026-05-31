import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { QUIZ_RESULT_OUTFITS_QUERY, QUIZ_RESULT_FALLBACK_QUERY } from '@/lib/queries'
import { STYLE_PROFILES } from '@/lib/style-profiles'
import StyleResultPage from './StyleResultPage'

type SearchParams = Promise<{ style?: string; occasion?: string; season?: string }>

const FETCH_OPTS = { next: { revalidate: 3600, tags: ['outfit'] } }

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { style } = await searchParams
  const profile = style ? STYLE_PROFILES[style] : undefined
  const name = profile?.name ?? 'Your Style'
  const ogImageUrl = style ? `/api/og/quiz-result?style=${style}` : undefined
  return {
    title: `${name} Style — Quiz Result | STYLEFINDEN`,
    description: profile
      ? `You got ${name}. ${profile.tagline} Discover outfits curated for your personality.`
      : 'Discover your style personality and find outfits made for you.',
    alternates: { canonical: 'https://stylefinden.com/style-quiz/result' },
    ...(ogImageUrl && {
      openGraph: {
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        images: [ogImageUrl],
      },
    }),
  }
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { style, occasion, season } = await searchParams

  if (!style || !STYLE_PROFILES[style]) redirect('/style-quiz')

  const profile = STYLE_PROFILES[style]

  // Primary: style match (occasion-boosted)
  let outfits = await client.fetch(
    QUIZ_RESULT_OUTFITS_QUERY,
    { style, occasion: occasion ?? '' },
    FETCH_OPTS,
  )

  // Fallback: no style match → show occasion/recent outfits
  const usingFallback = !outfits?.length
  if (usingFallback) {
    outfits = await client.fetch(
      QUIZ_RESULT_FALLBACK_QUERY,
      { occasion: occasion ?? '' },
      FETCH_OPTS,
    )
  }

  const resultUrl = `/style-quiz/result?style=${style}${occasion ? `&occasion=${occasion}` : ''}${season ? `&season=${season}` : ''}`

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

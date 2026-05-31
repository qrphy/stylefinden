import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { QUIZ_RESULT_OUTFITS_QUERY } from '@/lib/queries'
import { STYLE_PROFILES } from '@/lib/style-profiles'
import StyleResultPage from './StyleResultPage'

type SearchParams = Promise<{ style?: string; occasion?: string; season?: string }>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { style } = await searchParams
  const profile = style ? STYLE_PROFILES[style] : undefined
  const name = profile?.name ?? 'Your Style'
  return {
    title: `${name} Style — Quiz Result | STYLEFINDEN`,
    description: profile
      ? `You got ${name}. ${profile.tagline} Discover outfits curated for your personality.`
      : 'Discover your style personality and find outfits made for you.',
    alternates: { canonical: 'https://stylefinden.com/style-quiz/result' },
  }
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { style, occasion, season } = await searchParams

  if (!style || !STYLE_PROFILES[style]) redirect('/style-quiz')

  const profile = STYLE_PROFILES[style]

  const outfits = await client.fetch(
    QUIZ_RESULT_OUTFITS_QUERY,
    { style, occasion: occasion ?? '' },
    { next: { revalidate: 3600, tags: ['outfit'] } },
  )

  const resultUrl = `/style-quiz/result?style=${style}${occasion ? `&occasion=${occasion}` : ''}${season ? `&season=${season}` : ''}`

  return (
    <StyleResultPage
      styleKey={style}
      profile={profile}
      occasion={occasion}
      outfits={outfits ?? []}
      resultUrl={resultUrl}
    />
  )
}

import Link from 'next/link'
import ImgPlaceholder from '@/components/shared/ImgPlaceholder'
import ShareResultButton from './ShareResultButton'
import { urlFor } from '@/sanity/lib/image'
import type { StyleProfile } from '@/lib/style-profiles'
export type { StyleProfile }
export { STYLE_PROFILES } from '@/lib/style-profiles'

type Outfit = {
  _id: string
  title: string
  slug: string
  style?: string
  season?: string
  occasion?: string
  image?: { asset?: object; hotspot?: object; crop?: object; lqip?: string }
}

const occasionLabel: Record<string, string> = {
  casual: 'Casual',
  office: 'Office',
  'date-night': 'Date Night',
  'party-night-out': 'Going Out',
  travel: 'Travel',
  wedding: 'Wedding',
  school: 'School',
  sport: 'Sport',
  beach: 'Beach',
  festival: 'Festival',
}

type Props = {
  styleKey: string
  profile: StyleProfile
  occasion?: string
  outfits: Outfit[]
  usingFallback?: boolean
  resultUrl: string
}

export default function StyleResultPage({ styleKey, profile, occasion, outfits, usingFallback, resultUrl }: Props) {
  const occasionName = occasion ? occasionLabel[occasion] : null

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="container-page pt-12 pb-10 md:pt-16 md:pb-14">
        <div className="max-w-2xl">
          <span className="eyebrow mb-4 block">Style Quiz Result</span>

          {occasionName && (
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-3">
              {occasionName} look
            </p>
          )}

          <h1 className="font-display text-[clamp(48px,8vw,96px)] font-light tracking-tight leading-[1] text-black mb-4">
            {profile.name}
          </h1>

          <p className="text-base text-gray-400 tracking-wide italic mb-8">
            &ldquo;{profile.tagline}&rdquo;
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {profile.traits.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase border border-gray-200 text-gray-600"
              >
                {trait}
              </span>
            ))}
          </div>

          <p className="body-text max-w-lg">
            {profile.description}
          </p>
        </div>
      </section>

      {/* ── Outfits ──────────────────────────────────────────────────────────── */}
      {outfits.length > 0 && (
        <section className="section-divider">
          <div className="container-page py-10 md:py-14 flex flex-col gap-6">
            {usingFallback && (
              <p className="text-xs text-gray-400 border border-gray-100 px-3 py-2">
                We&apos;re building out the {profile.name} collection — here are some looks you might enjoy in the meantime.
              </p>
            )}
            <div className="section-header">
              <span className="eyebrow">{usingFallback ? 'You might also like' : 'Outfits for you'}</span>
              <Link
                href={`/outfits?style=${styleKey}${occasion ? `&occasion=${occasion}` : ''}`}
                className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
              >
                See all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {outfits.map((outfit) => (
                <Link
                  key={outfit._id}
                  href={`/outfits/${outfit.slug}`}
                  className="group flex flex-col gap-2"
                >
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <ImgPlaceholder
                      src={outfit.image ? urlFor(outfit.image).width(600).height(800).url() : undefined}
                      alt={outfit.title}
                      sizes="(max-width: 640px) 50vw, 33vw"
                      blurDataURL={outfit.image?.lqip}
                    />
                    <div className="card-overlay" />
                  </div>
                  <span className="card-title px-0.5 line-clamp-2">{outfit.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTAs ─────────────────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="container-page py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/outfits?style=${styleKey}${occasion ? `&occasion=${occasion}` : ''}`}
              className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-400 transition-colors duration-200"
            >
              All {profile.name} outfits
              <svg viewBox="0 0 24 24" className="size-3 stroke-current group-hover:translate-x-0.5 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/style-quiz"
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
            >
              Retake quiz
            </Link>
          </div>
          <ShareResultButton url={resultUrl} styleName={profile.name} />
        </div>
      </section>

    </main>
  )
}

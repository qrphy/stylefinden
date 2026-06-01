import type { Metadata } from 'next'
import Link from 'next/link'
import { STYLE_PROFILES } from '@/lib/style-profiles'

export const metadata: Metadata = {
  title: 'Style Guides — Find Your Aesthetic | STYLEFINDEN',
  description: 'From minimalist to Y2K, old money to coquette — explore 17 style guides with curated outfits for every aesthetic.',
  keywords: [
    'style guides', 'aesthetic styles', 'fashion aesthetics', 'personal style',
    'minimalist style', 'y2k aesthetic', 'old money style', 'boho aesthetic',
    'style finder', 'fashion personality', 'style inspiration', 'style types',
  ],
  alternates: { canonical: 'https://stylefinden.com/styles' },
  openGraph: {
    title: 'Style Guides — Find Your Aesthetic | STYLEFINDEN',
    description: 'Explore 17 style guides — minimalist, Y2K, old money, boho and more. Curated outfits for every aesthetic.',
    url: 'https://stylefinden.com/styles',
    type: 'website',
    siteName: 'STYLEFINDEN',
    locale: 'en_US',
    images: [{ url: '/stylefinden-logo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Style Guides — Find Your Aesthetic | STYLEFINDEN',
    description: 'Explore 17 style guides — minimalist, Y2K, old money, boho and more.',
    images: ['/stylefinden-logo.png'],
  },
}

const STYLE_ORDER = [
  'minimalist', 'old-money', 'clean-girl', 'elegant', 'classic',
  'casual', 'streetstyle', 'retro-vintage', 'boho', 'korean-fashion',
  'y2k', 'cute-coquette', 'black-dark', 'sienna-vibe', 'western',
  'festival', 'formal',
]

export default function StylesIndexPage() {
  const styles = STYLE_ORDER.map((slug) => ({ slug, ...STYLE_PROFILES[slug] })).filter(Boolean)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="container-page py-12 md:py-16">
        <span className="eyebrow mb-4 block">Style Guides</span>
        <h1 className="font-display text-[clamp(36px,6vw,72px)] font-light tracking-tight leading-[1.05] text-black mb-4 max-w-2xl">
          Find your aesthetic.
        </h1>
        <p className="body-text max-w-lg mb-8">
          Every wardrobe has a language. Browse 17 style personalities — from quiet luxury to bold streetwear — and discover outfits curated for each.
        </p>
        <Link
          href="/style-quiz"
          className="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
        >
          Not sure? Take the quiz
          <svg viewBox="0 0 24 24" className="size-3 stroke-current group-hover:translate-x-0.5 transition-transform duration-200" fill="none" strokeWidth={2}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </section>

      {/* ── Style grid ───────────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="container-page py-10 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            {styles.map(({ slug, name, tagline, traits }) => (
              <Link
                key={slug}
                href={`/styles/${slug}`}
                className="group bg-white p-8 flex flex-col gap-3 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-2xl font-light tracking-tight text-black group-hover:text-gray-600 transition-colors duration-200">
                    {name}
                  </h2>
                  <svg viewBox="0 0 24 24" className="size-3.5 stroke-gray-300 group-hover:stroke-black group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-1.5" fill="none" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 italic">&ldquo;{tagline}&rdquo;</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {traits.slice(0, 3).map((trait) => (
                    <span
                      key={trait}
                      className="text-[9px] font-semibold tracking-widest uppercase text-gray-400 border border-gray-100 px-2 py-1"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

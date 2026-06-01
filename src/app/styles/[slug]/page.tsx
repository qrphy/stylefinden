import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { STYLE_GUIDE_OUTFITS_QUERY } from '@/lib/queries'
import { STYLE_PROFILES } from '@/lib/style-profiles'
import ImgPlaceholder from '@/components/shared/ImgPlaceholder'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return Object.keys(STYLE_PROFILES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const profile = STYLE_PROFILES[slug]
  if (!profile) return {}
  return {
    title: `${profile.name} Style Outfits — ${profile.tagline} | STYLEFINDEN`,
    description: `Explore ${profile.name} aesthetic outfits. ${profile.description}`,
    keywords: [profile.name, `${profile.name} style`, `${profile.name} outfits`, `${profile.name} aesthetic`, ...profile.traits, 'style guide', 'STYLEFINDEN'],
    alternates: { canonical: `https://stylefinden.com/styles/${slug}` },
    openGraph: {
      title: `${profile.name} Style — STYLEFINDEN`,
      description: profile.description,
      url: `https://stylefinden.com/styles/${slug}`,
      type: 'website',
      siteName: 'STYLEFINDEN',
      locale: 'en_US',
      images: [{ url: '/stylefinden-logo.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} Style — STYLEFINDEN`,
      description: profile.description,
      images: ['/stylefinden-logo.png'],
    },
  }
}

export default async function StyleGuidePage({ params }: { params: Params }) {
  const { slug } = await params
  const profile = STYLE_PROFILES[slug]
  if (!profile) notFound()

  const outfits = await client.fetch(
    STYLE_GUIDE_OUTFITS_QUERY,
    { style: slug },
    { next: { revalidate: 3600, tags: ['outfit'] } },
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${profile.name} Style Outfits`,
    description: profile.description,
    url: `https://stylefinden.com/styles/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stylefinden.com' },
        { '@type': 'ListItem', position: 2, name: 'Style Guides', item: 'https://stylefinden.com/styles' },
        { '@type': 'ListItem', position: 3, name: profile.name, item: `https://stylefinden.com/styles/${slug}` },
      ],
    },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Breadcrumb ───────────────────────────────────────────────────────── */}
      <div className="container-page pt-8 pb-2">
        <nav className="breadcrumb-nav">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span>/</span>
          <Link href="/styles" className="breadcrumb-link">Style Guides</Link>
          <span>/</span>
          <span className="text-black">{profile.name}</span>
        </nav>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="container-page py-10 md:py-14">
        <div className="max-w-2xl">
          <span className="eyebrow mb-4 block">Style Guide</span>

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

          <p className="body-text max-w-lg mb-8">
            {profile.description}
          </p>

          <Link
            href="/style-quiz"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
          >
            Is this your style? Take the quiz
            <svg viewBox="0 0 24 24" className="size-3 stroke-current group-hover:translate-x-0.5 transition-transform duration-200" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Outfit grid ──────────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="container-page py-10 md:py-14 flex flex-col gap-6">
          <div className="section-header">
            <span className="eyebrow">
              {outfits?.length > 0 ? `${outfits.length} outfits` : 'Outfits'}
            </span>
            <Link
              href={`/outfits?style=${slug}`}
              className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
            >
              Filter view &rarr;
            </Link>
          </div>

          {outfits?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {outfits.map((outfit: { _id: string; title: string; slug: string; occasion?: string; season?: string; image?: { asset?: object; hotspot?: object; crop?: object; lqip?: string } }) => (
                <Link
                  key={outfit._id}
                  href={`/outfits/${outfit.slug}`}
                  className="group flex flex-col gap-2"
                >
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <ImgPlaceholder
                      src={outfit.image ? urlFor(outfit.image).width(600).height(800).url() : undefined}
                      alt={outfit.title}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      blurDataURL={outfit.image?.lqip}
                    />
                    <div className="card-overlay" />
                  </div>
                  <span className="card-title px-0.5 line-clamp-2">{outfit.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No outfits yet for this style.{' '}
              <Link href="/outfits" className="underline underline-offset-2 hover:text-black transition-colors">
                Browse all outfits
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="container-page py-12 cta-row">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="eyebrow">Not sure about your style?</span>
            <span className="text-lg font-semibold text-black tracking-tight">Find your aesthetic in 3 questions.</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/style-quiz"
              className="px-5 py-3 bg-black text-white text-[10px] font-semibold tracking-widest uppercase hover:bg-gray-900 transition-colors duration-200"
            >
              Take the Style Quiz
            </Link>
            <Link
              href="/styles"
              className="px-5 py-3 border border-gray-200 text-black text-[10px] font-semibold tracking-widest uppercase hover:border-black transition-colors duration-200"
            >
              All Style Guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

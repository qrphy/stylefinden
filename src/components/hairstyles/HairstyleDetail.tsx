import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import JsonLd from "@/components/seo/JsonLd"
import Button from "@/components/shared/Button"
import { urlFor } from "@/sanity/lib/image"
import {
  hairstyleTypeLabel,
  hairstyleLengthLabel,
  hairstyleMoodLabel,
  hairstyleOccasionLabel,
} from "@/lib/hairstyle-labels"

const BASE = "https://stylefinden.com"

export type HairstyleDetailData = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: object
  type?: string
  length?: string
  mood?: string
  occasion?: string
  tags?: string[]
}

type Props = {
  hairstyle: HairstyleDetailData
}

export default function HairstyleDetail({ hairstyle }: Props) {
  const imageUrl = hairstyle.image
    ? urlFor(hairstyle.image).url()
    : undefined

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: hairstyle.title,
    ...(hairstyle.description ? { description: hairstyle.description } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    url: `${BASE}/hairstyles/${hairstyle.slug}`,
    author: { "@type": "Organization", name: "STYLEFINDEN", url: BASE },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",       item: BASE },
      { "@type": "ListItem", position: 2, name: "Hairstyles", item: `${BASE}/hairstyles` },
      { "@type": "ListItem", position: 3, name: hairstyle.title },
    ],
  }

  return (
    <>
      <JsonLd data={creativeWorkSchema} />
      <JsonLd data={breadcrumbSchema} />
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-3 md:px-5 pt-6 pb-2">
        <nav className="breadcrumb-nav">
          <a href="/" className="breadcrumb-link">Home</a>
          <span>/</span>
          <a href="/hairstyles" className="breadcrumb-link">Hairstyles</a>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{hairstyle.title}</span>
        </nav>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="py-5 md:py-7">
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] items-start">

          {/* Sol — Ana görsel */}
          <div className="pl-2 pr-3 md:pl-3 md:pr-5">
            <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden md:sticky md:top-6">
              <ImgPlaceholder
                src={imageUrl}
                alt={hairstyle.title}
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Sağ — Detaylar */}
          <div className="px-4 md:px-6 pr-4 md:pr-5 flex flex-col gap-3">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              {hairstyle.type && (
                <span className="badge bg-black text-white">
                  {hairstyleTypeLabel[hairstyle.type] ?? hairstyle.type}
                </span>
              )}
              {hairstyle.length && (
                <span className="badge bg-gray-100 text-gray-700">
                  {hairstyleLengthLabel[hairstyle.length] ?? hairstyle.length}
                </span>
              )}
              {hairstyle.mood && (
                <span className="badge border border-gray-200 text-gray-600">
                  {hairstyleMoodLabel[hairstyle.mood] ?? hairstyle.mood}
                </span>
              )}
              {hairstyle.occasion && (
                <span className="badge bg-gray-50 text-gray-500 border border-gray-200">
                  {hairstyleOccasionLabel[hairstyle.occasion] ?? hairstyle.occasion}
                </span>
              )}
            </div>

            {/* Başlık */}
            <h1 className="font-display text-xl md:text-2xl font-light text-black tracking-tight leading-tight">
              {hairstyle.title}
            </h1>

            {/* Açıklama */}
            {hairstyle.description && (
              <p className="text-xs text-gray-500 leading-relaxed">
                {hairstyle.description}
              </p>
            )}

            {/* Back link */}
            <Button variant="ghost" href="/hairstyles" arrow arrowDir="left" className="self-start mt-2">
              Back to Hairstyles
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="px-3 md:px-5 py-10 cta-row">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="eyebrow">Style your look</span>
            <span className="text-lg font-semibold text-black tracking-tight">Find matching outfits</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="primary" href="/outfits">Browse Outfits</Button>
            <Button variant="outline" href="/hairstyles">All Hairstyles</Button>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}

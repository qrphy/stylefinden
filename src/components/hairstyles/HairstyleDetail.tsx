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
    ? urlFor(hairstyle.image).width(800).height(1067).url()
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
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/hairstyles" className="hover:text-black transition-colors">Hairstyles</a>
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
                <span className="px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-black text-white">
                  {hairstyleTypeLabel[hairstyle.type] ?? hairstyle.type}
                </span>
              )}
              {hairstyle.length && (
                <span className="px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-gray-100 text-gray-700">
                  {hairstyleLengthLabel[hairstyle.length] ?? hairstyle.length}
                </span>
              )}
              {hairstyle.mood && (
                <span className="px-2 py-1 text-xs font-semibold tracking-widest uppercase border border-gray-200 text-gray-600">
                  {hairstyleMoodLabel[hairstyle.mood] ?? hairstyle.mood}
                </span>
              )}
              {hairstyle.occasion && (
                <span className="px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-gray-50 text-gray-500 border border-gray-200">
                  {hairstyleOccasionLabel[hairstyle.occasion] ?? hairstyle.occasion}
                </span>
              )}
            </div>

            {/* Başlık */}
            <h1 className="text-xl md:text-2xl font-black text-black tracking-tight leading-tight">
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
      <section className="border-t border-gray-100">
        <div className="px-3 md:px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Style your look</span>
            <span className="text-lg font-black text-black tracking-tight">Find matching outfits</span>
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

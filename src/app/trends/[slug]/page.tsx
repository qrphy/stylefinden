// Trend detay sayfası — Sanity'den tek bir trend öğesini slug ile çeker.
// Geniş hero görseli, açıklama, etiketler ve "key items" listesi içerir.
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { getTrend } from "@/lib/sanity-fetchers"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"

type Props = { params: Promise<{ slug: string }> }

// UI etiketleri — schema value'larıyla eşleşmeli
const seasonLabel: Record<string, string> = {
  "spring-summer": "Spring / Summer",
  "fall-winter": "Fall / Winter",
  "year-round": "Year-Round",
}
const categoryLabel: Record<string, string> = {
  fashion: "Fashion", accessories: "Accessories", hairstyle: "Hairstyle", beauty: "Beauty",
}

// Build zamanında Sanity'deki tüm trend slug'larını SSG ile üretir
export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "trend" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const trend = await getTrend(slug)
  if (!trend) return {}
  return {
    title: trend.title,
    description: trend.description ?? `Discover the ${trend.title} trend on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/trends/${slug}` },
  }
}

export default async function TrendPage({ params }: Props) {
  const { slug } = await params
  const trend = await getTrend(slug)
  if (!trend) notFound()

  const imageUrl = trend.image ? urlFor(trend.image).width(1200).height(700).url() : undefined

  return (
    <main>
      {/* Hero */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[600px] overflow-hidden bg-gray-100">
        <ImgPlaceholder src={imageUrl} alt={trend.title} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pb-10 md:pb-14 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {trend.season && (
              <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-white text-black">
                {seasonLabel[trend.season] ?? trend.season}
              </span>
            )}
            {trend.category && (
              <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-black/60 text-white border border-white/30">
                {categoryLabel[trend.category] ?? trend.category}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl">
            {trend.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/trends" className="hover:text-black transition-colors">Trends</a>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{trend.title}</span>
        </nav>
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {trend.description && (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">{trend.description}</p>
            )}
            {trend.tags && trend.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {trend.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {trend.keyItems && trend.keyItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Must-haves</span>
                <h2 className="text-xl font-black text-black tracking-tight">Key Items</h2>
              </div>
              <ul className="flex flex-col gap-2">
                {trend.keyItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100">
                    <span className="text-xs font-black text-gray-300 tracking-widest shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-black">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Get inspired</span>
            <span className="text-lg font-black text-black tracking-tight">Shop the trend</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/outfits" className="px-8 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200">
              Browse Outfits
            </a>
            <a href="/trends" className="px-8 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
              All Trends
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

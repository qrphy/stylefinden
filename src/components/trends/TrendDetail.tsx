import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import JsonLd from "@/components/seo/JsonLd"
import Button from "@/components/shared/Button"
import { urlFor } from "@/sanity/lib/image"
import { trendSeasonLabel, trendCategoryLabel } from "@/lib/trend-labels"

const BASE = "https://stylefinden.com"

export type TrendDetailData = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: object
  season?: string
  category?: string
  keyItems?: string[]
  tags?: string[]
}

type Props = {
  trend: TrendDetailData
}

export default function TrendDetail({ trend }: Props) {
  const imageUrl = trend.image
    ? urlFor(trend.image).url()
    : undefined

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: trend.title,
    ...(trend.description ? { description: trend.description } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    url: `${BASE}/trends/${trend.slug}`,
    author: { "@type": "Organization", name: "STYLEFINDEN", url: BASE },
    publisher: { "@type": "Organization", name: "STYLEFINDEN", url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/stylefinden-logo.png` } },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",   item: BASE },
      { "@type": "ListItem", position: 2, name: "Trends", item: `${BASE}/trends` },
      { "@type": "ListItem", position: 3, name: trend.title },
    ],
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
    <main>
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[600px] overflow-hidden bg-gray-100">
        <ImgPlaceholder src={imageUrl} alt={trend.title} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-3 md:px-5 pb-8 md:pb-12 flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {trend.season && (
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase bg-white text-black">
                {trendSeasonLabel[trend.season] ?? trend.season}
              </span>
            )}
            {trend.category && (
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase bg-black/60 text-white border border-white/30">
                {trendCategoryLabel[trend.category] ?? trend.category}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            {trend.title}
          </h1>
        </div>
      </section>

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-3 md:px-5 pt-6 pb-2">
        <nav className="breadcrumb-nav">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span>/</span>
          <Link href="/trends" className="breadcrumb-link">Trends</Link>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{trend.title}</span>
        </nav>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <section className="px-3 md:px-5 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {trend.description && (
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {trend.description}
              </p>
            )}
            <Button variant="ghost" href="/trends" arrow arrowDir="left" className="self-start">
              Back to Trends
            </Button>
          </div>

          {trend.keyItems && trend.keyItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="eyebrow">Must-haves</span>
                <h2 className="text-lg font-black text-black tracking-tight">Key Items</h2>
              </div>
              <ul className="flex flex-col gap-2">
                {trend.keyItems.map((item: string, i: number) => (
                  <li key={item} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100">
                    <span className="text-xs font-black text-gray-300 tracking-widest shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-black">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="px-3 md:px-5 py-10 cta-row">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="eyebrow">Get inspired</span>
            <span className="text-lg font-black text-black tracking-tight">Shop the trend</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="primary" href="/outfits">Browse Outfits</Button>
            <Button variant="outline" href="/trends">All Trends</Button>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}

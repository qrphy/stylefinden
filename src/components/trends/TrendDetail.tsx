import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import { urlFor } from "@/sanity/lib/image"
import { trendSeasonLabel, trendCategoryLabel } from "@/lib/trend-labels"

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
    ? urlFor(trend.image).width(1200).height(700).url()
    : undefined

  return (
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
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/trends" className="hover:text-black transition-colors">Trends</a>
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
            <a
              href="/trends"
              className="self-start flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors duration-200 group"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current rotate-180 group-hover:-translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              Back to Trends
            </a>
          </div>

          {trend.keyItems && trend.keyItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">Must-haves</span>
                <h2 className="text-lg font-black text-black tracking-tight">Key Items</h2>
              </div>
              <ul className="flex flex-col gap-2">
                {trend.keyItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100">
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
      <section className="border-t border-gray-100">
        <div className="px-3 md:px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
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

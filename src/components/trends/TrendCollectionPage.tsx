// Paylaşılan trend koleksiyon sayfası bileşeni — season/aesthetic/category [slug] sayfaları kullanır.
// Breadcrumb, hero, highlights, trend grid ve boş durum bölümlerini içerir.
import type { TrendCollectionConfig } from "@/lib/trend-collection-config"
import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import { urlFor } from "@/sanity/lib/image"

type TrendItem = {
  _id: string
  title: string
  slug: string
  image?: object
  season?: string
  category?: string
  tags?: string[]
}

type Props = {
  slug: string
  dimension: "season" | "aesthetic" | "category"
  config: TrendCollectionConfig
  trends?: TrendItem[]
}

const DIMENSION_LABELS: Record<Props["dimension"], string> = {
  season: "By Season",
  aesthetic: "By Aesthetic",
  category: "By Category",
}

const DIMENSION_HREFS: Record<Props["dimension"], string> = {
  season: "/trends/season",
  aesthetic: "/trends/aesthetic",
  category: "/trends/category",
}

export default function TrendCollectionPage({ slug, dimension, config, trends = [] }: Props) {
  const dimensionLabel = DIMENSION_LABELS[dimension]
  const dimensionHref = DIMENSION_HREFS[dimension]

  const safeAccentText =
    config.accentText === "text-white" ? "text-gray-400" : config.accentText
  const safeBadgeClasses =
    config.accentText === "text-white"
      ? "bg-gray-100 text-gray-700"
      : `${config.accent} ${config.accentText}`

  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      <div className="container-page pt-8 pb-2">
        <nav className="breadcrumb-nav">
          {[
            { label: "Home", href: "/" },
            { label: "Trends", href: "/trends" },
            { label: dimensionLabel, href: dimensionHref },
            { label: config.label },
          ].map((crumb, i) => (
            <span key={crumb.href ?? crumb.label} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="breadcrumb-link">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-black">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="w-full border-b border-gray-100">
        <div className="container-page py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className={`text-xs font-semibold tracking-widest uppercase ${safeAccentText}`}>
                {dimensionLabel}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                {config.label} <br />
                <span className="italic font-light">Trends</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                {config.description}
              </p>
              {/* Tags row */}
              {config.card.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {config.card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-gray-200 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Accent card */}
            <div
              className={`hidden md:flex flex-col gap-3 ${config.accent} border border-gray-100 p-8 xl:p-10 w-full md:w-72 xl:w-80 flex-shrink-0`}
            >
              <span className={`text-xs font-semibold tracking-widest uppercase ${safeAccentText}`}>
                {config.label}
              </span>
              <p className="text-sm font-black text-black leading-snug tracking-tight">
                {config.description}
              </p>
              <span className={`self-start flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase ${safeAccentText} mt-auto`}>
                Trending Now
                <svg viewBox="0 0 24 24" className="size-3.5 stroke-current" fill="none" strokeWidth={2.5}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      {config.highlights && config.highlights.length > 0 && (
        <section className="w-full border-b border-gray-100">
          <div className="container-page py-12 md:py-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="eyebrow">
                What to Know
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.highlights.map((point, i) => (
                <div key={point} className="flex gap-4 p-5 border border-gray-100">
                  <span className="text-xs font-black text-gray-300 mt-0.5 shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trends Grid ── */}
      <section className="w-full border-b border-gray-100">
        <div className="container-page py-12 md:py-16">

          <div className="flex items-center gap-4 mb-8">
            <span className="eyebrow">
              Latest {config.label}
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {trends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {trends.map((trend) => {
                const imgSrc = trend.image
                  ? urlFor(trend.image).width(1400).height(1867).url()
                  : undefined
                const badge = trend.season ?? trend.category ?? null

                return (
                  <a
                    key={trend._id}
                    href={`/trends/${trend.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                      <ImgPlaceholder src={imgSrc} alt={trend.title} />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
                      {badge && (
                        <span className={`absolute top-3 left-3 badge ${safeBadgeClasses}`}>
                          {badge}
                        </span>
                      )}
                      <div className="card-overlay" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 stroke-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          fill="none"
                          strokeWidth={2}
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 px-0.5">
                      <h3 className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200">
                        {trend.title}
                      </h3>
                      {trend.tags && trend.tags.length > 0 && (
                        <p className="text-xs tracking-widest uppercase text-gray-400">
                          {trend.tags.slice(0, 2).join(" · ")}
                        </p>
                      )}
                    </div>
                  </a>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-16 border border-gray-100">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-300">
                Coming Soon
              </span>
              <p className="text-sm text-gray-500 leading-relaxed text-center max-w-xs">
                More {config.label.toLowerCase()} trends are being curated — check back soon.
              </p>
              <Link
                href="/trends"
                className="mt-2 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-500 transition-colors duration-200"
              >
                All Trends
                <svg viewBox="0 0 24 24" className="size-3.5 stroke-current" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* ── Back navigation ── */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-8">
          <a
            href={dimensionHref}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200 group"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 stroke-current group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              strokeWidth={2}
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back to {dimensionLabel}
          </a>
        </div>
      </section>

    </main>
  )
}

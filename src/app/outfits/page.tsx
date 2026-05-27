import type { Metadata } from "next"
import { Suspense } from "react"
import RankedOutfitsView from "@/components/outfits/RankedOutfitsView"
import OutfitCategoryNav from "@/components/outfits/OutfitCategoryNav"

export const metadata: Metadata = {
  title: "Outfit Ideas for Women – Casual, Party & Summer Looks",
  description:
    "Browse outfit ideas for women for every occasion, season and aesthetic — casual outfits, party looks, summer dresses, winter layers and more. New styles added weekly.",
  keywords: [
    "outfit ideas for women",
    "women outfit ideas",
    "casual outfits",
    "cute outfits",
    "party outfit ideas",
    "summer outfits",
    "winter outfits",
    "spring outfits",
    "autumn outfit ideas",
    "date outfit ideas",
    "concert outfit ideas",
    "festival outfit ideas",
    "wedding guest outfit ideas",
    "work outfit ideas",
    "aesthetic outfits",
    "street style",
    "vintage style",
    "old money outfits",
    "y2k outfits",
  ],
  alternates: { canonical: "https://stylefinden.com/outfits" },
  openGraph: {
    title: "Outfit Ideas for Women – Casual, Party & Summer Looks | STYLEFINDEN",
    description: "Outfit ideas for every season and occasion — casual, party, summer, winter and more.",
    url: "https://stylefinden.com/outfits",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfit Ideas for Women – Casual, Party & Summer Looks | STYLEFINDEN",
    description: "Outfit ideas for every season and occasion — casual, party, summer, winter and more.",
    images: ["/stylefinden-logo.png"],
  },
}

type Tab = "all" | "season" | "occasion" | "style" | "trend" | "color"

type SearchParams = Promise<{
  tab?: string
  occasion?: string
  season?: string
  style?: string
  color?: string
  trend?: string
}>

const VALID_TABS = ["season", "occasion", "style", "trend", "color"] as const

function getActiveTab(params: Awaited<SearchParams>): Tab {
  if (params.season)   return "season"
  if (params.occasion) return "occasion"
  if (params.style)    return "style"
  if (params.trend)    return "trend"
  if (params.color)    return "color"
  if (params.tab && (VALID_TABS as readonly string[]).includes(params.tab)) {
    return params.tab as Tab
  }
  return "all"
}

export default async function OutfitsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const activeTab = getActiveTab(params)

  return (
    <main className="flex-1 bg-white">
      <div className="container-page py-14 md:py-20">

        <div className="mb-10">
          <span className="eyebrow">Outfit Ideas for Women</span>
          <h1 className="hero-heading mt-3">
            Find your <span className="italic font-light">perfect look.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-4 max-w-lg leading-relaxed">
            Browse curated outfit ideas for every occasion, season and aesthetic — new styles added weekly.
          </p>
        </div>

        <OutfitCategoryNav active={activeTab} />

        <Suspense fallback={
          <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-300">
            Loading…
          </p>
        }>
          <RankedOutfitsView
            occasion={params.occasion}
            season={params.season}
            style={params.style}
            color={params.color}
            trend={params.trend}
          />
        </Suspense>

      </div>
    </main>
  )
}

import type { Metadata } from "next"
import { Suspense } from "react"
import OutfitCategoryNav from "@/components/outfits/OutfitCategoryNav"
import RankedOutfitsView from "@/components/outfits/RankedOutfitsView"

export const metadata: Metadata = {
  title: "Trending Outfit Aesthetics – Y2K, Old Money, Clean Girl & More",
  description:
    "Explore trending outfit aesthetics – from Y2K and Old Money to Clean Girl, Coquette and Korean Fashion. Curated looks for every aesthetic.",
  alternates: { canonical: "https://stylefinden.com/outfits/trend" },
  openGraph: {
    title: "Trending Outfit Aesthetics | STYLEFINDEN",
    description: "Curated looks for every trending aesthetic.",
    url: "https://stylefinden.com/outfits/trend",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Outfit Aesthetics | STYLEFINDEN",
    description: "Curated looks for every trending aesthetic.",
    images: ["/stylefinden-logo.png"],
  },
}

const TREND_CHIPS = [
  { label: "All",            value: ""               },
  { label: "Y2K",            value: "y2k"            },
  { label: "Old Money",      value: "old-money"      },
  { label: "Clean Girl",     value: "clean-girl"     },
  { label: "Korean Fashion", value: "korean-fashion" },
  { label: "Coquette",       value: "cute-coquette"  },
  { label: "Dark",           value: "black-dark"     },
  { label: "Retro Vintage",  value: "retro-vintage"  },
  { label: "Sienna Vibe",    value: "sienna-vibe"    },
]

type SearchParams = Promise<{ filter?: string }>

export default async function TrendIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const { filter } = await searchParams

  return (
    <main className="flex-1 bg-white">
      <div className="container-page py-14 md:py-20">

        <div className="mb-10">
          <span className="eyebrow">By Trend</span>
          <h1 className="hero-heading mt-3">
            Outfits for every <span className="italic font-light">aesthetic.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-4 max-w-lg leading-relaxed">
            From Y2K and Old Money to Clean Girl and Coquette – explore curated looks for every trending aesthetic.
          </p>
        </div>

        <OutfitCategoryNav active="trend" />

        <div className="flex gap-2 flex-wrap mb-8">
          {TREND_CHIPS.map((chip) => {
            const isActive = chip.value === "" ? !filter : chip.value === filter
            return (
              <a
                key={chip.value || "all"}
                href={chip.value ? `/outfits/trend?filter=${chip.value}` : "/outfits/trend"}
                className={`px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase border transition-colors ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
                }`}
              >
                {chip.label}
              </a>
            )
          })}
        </div>

        <Suspense fallback={
          <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-300">
            Loading…
          </p>
        }>
          <RankedOutfitsView trend={filter} />
        </Suspense>

      </div>
    </main>
  )
}

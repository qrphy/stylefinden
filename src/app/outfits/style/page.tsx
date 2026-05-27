import type { Metadata } from "next"
import { Suspense } from "react"
import OutfitCategoryNav from "@/components/outfits/OutfitCategoryNav"
import RankedOutfitsView from "@/components/outfits/RankedOutfitsView"

export const metadata: Metadata = {
  title: "Outfit Collections by Style – Boho, Minimalist, Street Style & More",
  description:
    "Browse curated outfit collections by style – from effortless boho and clean minimalist looks to bold street style and timeless classic outfits.",
  alternates: { canonical: "https://stylefinden.com/outfits/style" },
  openGraph: {
    title: "Outfit Collections by Style | STYLEFINDEN",
    description: "Curated outfit collections for every style.",
    url: "https://stylefinden.com/outfits/style",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfit Collections by Style | STYLEFINDEN",
    description: "Curated outfit collections for every style.",
    images: ["/stylefinden-logo.png"],
  },
}

const STYLE_CHIPS = [
  { label: "All",          value: ""           },
  { label: "Casual",       value: "casual"     },
  { label: "Street Style", value: "streetstyle"},
  { label: "Elegant",      value: "elegant"    },
  { label: "Boho",         value: "boho"       },
  { label: "Sporty",       value: "sporty"     },
  { label: "Minimalist",   value: "minimalist" },
  { label: "Classic",      value: "classic"    },
  { label: "Vintage",      value: "vintage"    },
  { label: "Formal",       value: "formal"     },
  { label: "Western",      value: "western"    },
]

type SearchParams = Promise<{ filter?: string }>

export default async function StyleIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const { filter } = await searchParams

  return (
    <main className="flex-1 bg-white">
      <div className="container-page py-14 md:py-20">

        <div className="mb-10">
          <span className="eyebrow">Style Collections</span>
          <h1 className="hero-heading mt-3">
            Find your <span className="italic font-light">signature style.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-4 max-w-lg leading-relaxed">
            From effortless boho and clean minimalist looks to bold street style and timeless classic outfits – discover the style that speaks to you.
          </p>
        </div>

        <OutfitCategoryNav active="style" />

        <div className="flex gap-2 flex-wrap mb-8">
          {STYLE_CHIPS.map((chip) => {
            const isActive = chip.value === "" ? !filter : chip.value === filter
            return (
              <a
                key={chip.value || "all"}
                href={chip.value ? `/outfits/style?filter=${chip.value}` : "/outfits/style"}
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
          <RankedOutfitsView style={filter} />
        </Suspense>

      </div>
    </main>
  )
}

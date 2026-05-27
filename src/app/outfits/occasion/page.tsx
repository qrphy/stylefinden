import type { Metadata } from "next"
import { Suspense } from "react"
import OutfitCategoryNav from "@/components/outfits/OutfitCategoryNav"
import RankedOutfitsView from "@/components/outfits/RankedOutfitsView"

export const metadata: Metadata = {
  title: "Outfit Collections by Occasion – Office, Evening, Casual & More",
  description:
    "Browse curated outfit collections for every occasion – from polished office looks and elegant evening outfits to casual everyday styles and beach vibes.",
  alternates: { canonical: "https://stylefinden.com/outfits/occasion" },
  openGraph: {
    title: "Outfit Collections by Occasion | STYLEFINDEN",
    description: "Curated outfit collections for every occasion.",
    url: "https://stylefinden.com/outfits/occasion",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfit Collections by Occasion | STYLEFINDEN",
    description: "Curated outfit collections for every occasion.",
    images: ["/stylefinden-logo.png"],
  },
}

const OCCASION_CHIPS = [
  { label: "All",        value: ""              },
  { label: "Everyday",   value: "casual"        },
  { label: "Office",     value: "office"        },
  { label: "Evening",    value: "evening"       },
  { label: "Date Night", value: "date-night"    },
  { label: "Party",      value: "party-night-out"},
  { label: "School",     value: "school"        },
  { label: "Travel",     value: "travel"        },
  { label: "Sport",      value: "sport"         },
  { label: "Beach",      value: "beach"         },
  { label: "Festival",   value: "festival"      },
  { label: "Wedding",    value: "wedding"       },
]

type SearchParams = Promise<{ filter?: string }>

export default async function OccasionIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const { filter } = await searchParams

  return (
    <main className="flex-1 bg-white">
      <div className="container-page py-14 md:py-20">

        <div className="mb-10">
          <span className="eyebrow">By Occasion</span>
          <h1 className="hero-heading mt-3">
            The right look for <span className="italic font-light">every moment.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-4 max-w-lg leading-relaxed">
            From polished office looks to relaxed weekend styles and elegant evening outfits – discover curated collections for every occasion.
          </p>
        </div>

        <OutfitCategoryNav active="occasion" />

        <div className="flex gap-2 flex-wrap mb-8">
          {OCCASION_CHIPS.map((chip) => {
            const isActive = chip.value === "" ? !filter : chip.value === filter
            return (
              <a
                key={chip.value || "all"}
                href={chip.value ? `/outfits/occasion?filter=${chip.value}` : "/outfits/occasion"}
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
          <RankedOutfitsView occasion={filter} />
        </Suspense>

      </div>
    </main>
  )
}

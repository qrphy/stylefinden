import type { Metadata } from "next"
import { Suspense } from "react"
import OutfitCategoryNav from "@/components/outfits/OutfitCategoryNav"
import RankedOutfitsView from "@/components/outfits/RankedOutfitsView"

export const metadata: Metadata = {
  title: "Outfit Ideas by Color – Black, White, Beige, Pink & More",
  description:
    "Browse curated outfit ideas by color palette – from classic all-black looks and crisp whites to soft beige, bold red and fresh green combinations.",
  alternates: { canonical: "https://stylefinden.com/outfits/color" },
  openGraph: {
    title: "Outfit Ideas by Color | STYLEFINDEN",
    description: "Curated outfit ideas for every color palette.",
    url: "https://stylefinden.com/outfits/color",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfit Ideas by Color | STYLEFINDEN",
    description: "Curated outfit ideas for every color palette.",
    images: ["/stylefinden-logo.png"],
  },
}

const COLOR_CHIPS = [
  { label: "All",      value: ""        },
  { label: "Black",    value: "black"   },
  { label: "White",    value: "white"   },
  { label: "Beige",    value: "beige"   },
  { label: "Grey",     value: "grey"    },
  { label: "Navy",     value: "navy"    },
  { label: "Blue",     value: "blue"    },
  { label: "Pink",     value: "pink"    },
  { label: "Red",      value: "red"     },
  { label: "Burgundy", value: "burgundy"},
  { label: "Green",    value: "green"   },
  { label: "Khaki",    value: "khaki"   },
  { label: "Brown",    value: "brown"   },
]

type SearchParams = Promise<{ filter?: string }>

export default async function ColorIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const { filter } = await searchParams

  return (
    <main className="flex-1 bg-white">
      <div className="container-page py-14 md:py-20">

        <div className="mb-10">
          <span className="eyebrow">By Color</span>
          <h1 className="hero-heading mt-3">
            Dress in your <span className="italic font-light">favorite color.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-4 max-w-lg leading-relaxed">
            From classic all-black looks and crisp whites to soft beige and bold statement colors – find outfits that match your palette.
          </p>
        </div>

        <OutfitCategoryNav active="color" />

        <div className="flex gap-2 flex-wrap mb-8">
          {COLOR_CHIPS.map((chip) => {
            const isActive = chip.value === "" ? !filter : chip.value === filter
            return (
              <a
                key={chip.value || "all"}
                href={chip.value ? `/outfits/color?filter=${chip.value}` : "/outfits/color"}
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
          <RankedOutfitsView color={filter} />
        </Suspense>

      </div>
    </main>
  )
}

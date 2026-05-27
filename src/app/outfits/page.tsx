import type { Metadata } from "next"
import { Suspense } from "react"
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage"
import RankedOutfitsView from "@/components/outfits/RankedOutfitsView"
import { OCCASION_ORDER, getOccasionCard } from "@/lib/outfit-occasion-config"
import { STYLE_ORDER, getStyleCard } from "@/lib/outfit-style-config"

export const metadata: Metadata = {
  title: "Outfit Ideas for Women – Casual, Party & Summer Looks",
  description:
    "Browse outfit ideas for women for every occasion and season — casual outfits, party looks, summer dresses, winter layers and more. New styles added weekly.",
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

const STYLE_SLUGS      = ["boho", "minimalist", "streetstyle", "old-money", "retro-vintage", "y2k", "western"]
const TREND_SLUGS      = ["sienna-vibe", "korean-fashion", "clean-girl", "cute-coquette"]
const COLOR_MOOD_SLUGS = ["black-dark"]

const collections: CollectionGroup[] = [
  {
    label: "Seasonal Outfits",
    description:
      "Each season has its own visual language. Summer calls for linen and lightness; winter for structure and warmth; spring for fresh layers and pastel energy. Browse outfits organized by what the weather demands — and what your wardrobe can offer back.",
    basePath: "/outfits/season",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: [
      { slug: "summer", label: "Summer Outfits",      description: "Light dresses, floral prints & linen looks for hot days",       tags: ["Maxi", "Midi", "Mini", "Floral"],        badge: "New", accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]", active: true, image: "/categories/outfits/summer.webp", priority: true, sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" },
      { slug: "winter", label: "Cozy Winter Outfits", description: "Warm layering looks, coats and cozy combinations for cold days", tags: ["Coat", "Layering", "Knitwear", "Boots"], badge: "New", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]", active: true, image: "/categories/outfits/winter.png",  priority: true, sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" },
      { slug: "spring", label: "Spring Looks",        description: "Pastel tones, light blazers and fresh combinations",             tags: ["Pastels", "Blazer", "Linen", "Floral"],  badge: "New", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]", active: true, image: "/categories/outfits/spring.png",  sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" },
    ],
  },
  {
    label: "Occasion Outfits",
    description:
      "Dressed for the moment. From workwear and elegant evenings to party nights, school days and travel looks — find outfits built around where you're actually going. Each collection is curated for real life, not just the photo.",
    basePath: "/outfits/occasion",
    gridCols: "grid-cols-1 md:grid-cols-3",
    items: OCCASION_ORDER.map(getOccasionCard),
  },
  {
    label: "Style Outfits",
    description:
      "Your aesthetic is a decision, not an accident. Whether you're drawn to boho layering, minimalist clean lines, old-money elegance, retro prints or western frontier energy — explore collections that commit to a point of view.",
    basePath: "/outfits/style",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: STYLE_SLUGS.map(getStyleCard),
  },
  {
    label: "Trend & Aesthetic",
    description:
      "Beyond classic styles, these collections track the aesthetics shaping fashion right now. From the effortless Sienna vibe and Seoul-inspired K-fashion to the clean girl polish and soft coquette femininity — find the look that defines your moment.",
    basePath: "/outfits/style",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: TREND_SLUGS.map(getStyleCard),
  },
  {
    label: "Color & Mood",
    description:
      "Some aesthetics are built around a single color — and black is the most powerful of them all. All-black looks, leather, monochrome dark palettes and bold power dressing for those who find sophistication at the deepest end of the spectrum.",
    basePath: "/outfits/style",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: COLOR_MOOD_SLUGS.map(getStyleCard),
  },
]

type SearchParams = Promise<{ occasion?: string; season?: string; style?: string }>

export default async function OutfitsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const hasFilters = !!(params.occasion || params.season || params.style)

  if (hasFilters) {
    return (
      <main>
        <div className="container-page py-16 md:py-20">
          <div className="section-header mb-10">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">Outfit Results</span>
              <h1 className="section-title-lg">Your matches.</h1>
            </div>
            <a
              href="/outfits"
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200 self-start sm:self-auto"
            >
              ← All Collections
            </a>
          </div>
          <Suspense fallback={
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-300">
              Loading…
            </p>
          }>
            <RankedOutfitsView
              occasion={params.occasion}
              season={params.season}
              style={params.style}
            />
          </Suspense>
        </div>
      </main>
    )
  }

  return (
    <SectionMainPage
      hero={{
        eyebrow: "Outfit Collections",
        heading: "Find your",
        headingItalic: "perfect look.",
        description:
          "Style doesn't look the same twice. Different seasons demand different choices — summer calls for linen and lightness, winter for structure and warmth. Different occasions shape what you reach for. Different aesthetics define how you carry yourself. Browse to find outfits that fit where you are: in the year, in the week, in your own sense of style.",
      }}
      collections={collections}
    />
  )
}

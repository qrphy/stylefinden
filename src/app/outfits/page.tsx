// Outfits ana listeleme sayfası — SectionMainPage paylaşımlı layout'unu kullanarak
// outfit koleksiyonlarını mevsim, ortam ve stile göre gruplandırarak gösterir.
import type { Metadata } from "next"
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage"
import { OCCASION_ORDER, getOccasionCard } from "@/lib/outfit-occasion-config"
import { STYLE_ORDER, getStyleCard } from "@/lib/outfit-style-config"

export const metadata: Metadata = {
  title: "Outfits – Looks for Every Occasion & Style",
  description:
    "Discover curated outfit collections for every season, every style and every occasion – from summer dresses to elegant evening looks.",
  alternates: { canonical: "https://stylefinden.com/outfits" },
  openGraph: {
    title: "Outfits – Looks for Every Occasion & Style | STYLEFINDEN",
    description: "Curated outfit collections for every season and every occasion.",
    url: "https://stylefinden.com/outfits",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfits – Looks for Every Occasion & Style | STYLEFINDEN",
    description: "Curated outfit collections for every season and every occasion.",
    images: ["/stylefinden-logo.png"],
  },
}

// Her koleksiyon grubu SectionMainPage'de ayrı bir başlık ve grid olarak render edilir
const collections: CollectionGroup[] = [
  {
    label: "By Season",
    basePath: "/outfits/season",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: [
      { slug: "summer", label: "Summer Dresses", description: "Light dresses, floral prints & linen robes for hot days",         tags: ["Maxi", "Midi", "Mini", "Floral"],        badge: "New", accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]", active: true },
      { slug: "winter", label: "Winter Outfits", description: "Warm layering looks, coats and cozy combinations for cold days",   tags: ["Coat", "Layering", "Knitwear", "Boots"], badge: "New", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]", active: true },
      { slug: "autumn", label: "Autumn Looks",   description: "Earth tones, trench coats and crisp transitional looks",          tags: ["Earth Tones", "Trench", "Midi", "Boots"],badge: "New", accent: "bg-[#efebe9]", accentText: "text-[#4e342e]", active: true },
      { slug: "spring", label: "Spring Looks",   description: "Pastel tones, light blazers and fresh combinations",              tags: ["Pastels", "Blazer", "Linen", "Floral"],  badge: "New", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]", active: true },
    ],
  },
  {
    label: "By Occasion",
    basePath: "/outfits/occasion",
    gridCols: "grid-cols-2 md:grid-cols-3",
    items: OCCASION_ORDER.map(getOccasionCard),
  },
  {
    label: "By Style",
    basePath: "/outfits/style",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: STYLE_ORDER.map(getStyleCard),
  },
]

export default function OutfitsPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "Outfit Collections",
        heading: "Find your",
        headingItalic: "perfect look.",
        description:
          "Browse curated outfit collections – sorted by season, occasion and style. New collections added regularly.",
      }}
      collections={collections}
    />
  )
}

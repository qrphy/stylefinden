// Outfits ana listeleme sayfası — SectionMainPage paylaşımlı layout'unu kullanarak
// outfit koleksiyonlarını mevsim, ortam ve stile göre gruplandırarak gösterir.
import type { Metadata } from "next"
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage"
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

// Her koleksiyon grubu SectionMainPage'de ayrı bir başlık ve grid olarak render edilir
const collections: CollectionGroup[] = [
  {
    label: "By Season",
    basePath: "/outfits/season",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: [
      { slug: "summer", label: "Summer Outfits", description: "Light dresses, floral prints & linen robes for hot days",         tags: ["Maxi", "Midi", "Mini", "Floral"],        badge: "New", accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]", active: true, image: "/categories/outfits/summer.webp", priority: true, sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" },
      { slug: "winter", label: "Cozy Winter Outfits", description: "Warm layering looks, coats and cozy combinations for cold days",   tags: ["Coat", "Layering", "Knitwear", "Boots"], badge: "New", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]", active: true, image: "/categories/outfits/winter.png", priority: true, sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" },
      { slug: "spring", label: "Spring Looks",   description: "Pastel tones, light blazers and fresh combinations",              tags: ["Pastels", "Blazer", "Linen", "Floral"],  badge: "New", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]", active: true, image: "/categories/outfits/spring.png", sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" },
    ],
  },
  {
    label: "By Occasion",
    basePath: "/outfits/occasion",
    gridCols: "grid-cols-1 md:grid-cols-3",
    items: OCCASION_ORDER.map(getOccasionCard),
  },
  {
    label: "By Style",
    basePath: "/outfits/style",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    cardVariant: "editorial",
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

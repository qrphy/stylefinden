import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"

export const metadata: Metadata = {
  title: "Outfit Collections by Season – Summer, Winter, Autumn & Spring",
  description:
    "Browse curated outfit collections for every season – from light summer dresses to warm winter layering looks, fresh spring styles and earthy autumn tones.",
  alternates: { canonical: "https://stylefinden.com/outfits/season" },
  openGraph: {
    title: "Seasonal Outfit Collections | STYLEFINDEN",
    description: "Curated outfit collections for every season.",
    url: "https://stylefinden.com/outfits/season",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seasonal Outfit Collections | STYLEFINDEN",
    description: "Curated outfit collections for every season.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function SeasonIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "Seasonal Collections",
        heading: "Dress for every",
        headingItalic: "season.",
        description:
          "From light summer dresses to warm winter layering looks – discover curated outfit collections for every season of the year.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Outfits", href: "/outfits" },
        { label: "By Season" },
      ]}
      collections={[
        {
          label: "All Seasons",
          basePath: "/outfits/season",
          gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          items: [
            {
              slug: "summer",
              label: "Summer Dresses",
              description: "Light dresses, floral prints & linen robes for hot days",
              tags: ["Maxi", "Midi", "Mini", "Floral"],
              badge: "New",
              accent: "bg-[#EDCFA9]",
              accentText: "text-[#f57f17]",
              active: true,
            },
            {
              slug: "winter",
              label: "Winter Outfits",
              description: "Warm layering looks, coats and cozy combinations for cold days",
              tags: ["Coat", "Layering", "Knitwear", "Boots"],
              badge: "New",
              accent: "bg-[#e3f2fd]",
              accentText: "text-[#1565c0]",
              active: true,
            },
            {
              slug: "autumn",
              label: "Autumn Looks",
              description: "Earth tones, trench coats and crisp transitional looks",
              tags: ["Earth Tones", "Trench", "Midi", "Boots"],
              badge: "New",
              accent: "bg-[#efebe9]",
              accentText: "text-[#4e342e]",
              active: true,
            },
            {
              slug: "spring",
              label: "Spring Looks",
              description: "Pastel tones, light blazers and fresh combinations",
              tags: ["Pastels", "Blazer", "Linen", "Floral"],
              badge: "New",
              accent: "bg-[#e8f5e9]",
              accentText: "text-[#2e7d32]",
              active: true,
            },
          ],
        },
      ]}
    />
  )
}

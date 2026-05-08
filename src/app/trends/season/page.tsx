// Trends by Season alt-indeks sayfası — tüm mevsim koleksiyonlarını listeler.
import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"
import { TREND_SEASON_ORDER, getTrendSeasonCard } from "@/lib/trend-collection-config"

export const metadata: Metadata = {
  title: "Trends by Season – Spring, Summer, Autumn & Winter Fashion",
  description:
    "Browse fashion trends by season — from spring/summer freshness and resort wear to autumn/winter layering and pre-fall transitional looks.",
  alternates: { canonical: "https://stylefinden.com/trends/season" },
  openGraph: {
    title: "Trends by Season | STYLEFINDEN",
    description: "Fashion trends curated by season — spring, summer, autumn, winter and resort.",
    url: "https://stylefinden.com/trends/season",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trends by Season | STYLEFINDEN",
    description: "Fashion trends curated by season — spring, summer, autumn, winter and resort.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function TrendSeasonIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "By Season",
        heading: "Trends by",
        headingItalic: "season.",
        description:
          "Explore the most relevant looks for every time of year — from spring's fresh palettes to winter's richest textures.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Trends", href: "/trends" },
        { label: "By Season" },
      ]}
      collections={[
        {
          label: "All Seasons",
          basePath: "/trends/season",
          gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          items: TREND_SEASON_ORDER.map(getTrendSeasonCard),
        },
      ]}
    />
  )
}

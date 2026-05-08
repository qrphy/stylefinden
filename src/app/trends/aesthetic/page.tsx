// Trends by Aesthetic alt-indeks sayfası — tüm estetik koleksiyonlarını listeler.
import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"
import { TREND_AESTHETIC_ORDER, getTrendAestheticCard } from "@/lib/trend-collection-config"

export const metadata: Metadata = {
  title: "Trends by Aesthetic – Quiet Luxury, Dark Academia, Y2K & More",
  description:
    "Discover fashion trends by aesthetic — quiet luxury, coastal grandmother, dark academia, Y2K revival, street luxe and romantic femininity.",
  alternates: { canonical: "https://stylefinden.com/trends/aesthetic" },
  openGraph: {
    title: "Trends by Aesthetic | STYLEFINDEN",
    description: "Fashion trends curated by aesthetic — from quiet luxury to Y2K revival.",
    url: "https://stylefinden.com/trends/aesthetic",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trends by Aesthetic | STYLEFINDEN",
    description: "Fashion trends curated by aesthetic — from quiet luxury to Y2K revival.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function TrendAestheticIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "By Aesthetic",
        heading: "Trends by",
        headingItalic: "aesthetic.",
        description:
          "Find your style tribe — from understated quiet luxury and moody dark academia to the bold energy of Y2K and street luxe.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Trends", href: "/trends" },
        { label: "By Aesthetic" },
      ]}
      collections={[
        {
          label: "All Aesthetics",
          basePath: "/trends/aesthetic",
          gridCols: "grid-cols-2 md:grid-cols-3",
          items: TREND_AESTHETIC_ORDER.map(getTrendAestheticCard),
        },
      ]}
    />
  )
}

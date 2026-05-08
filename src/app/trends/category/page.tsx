// Trends by Category alt-indeks sayfası — tüm kategori koleksiyonlarını listeler.
import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"
import { TREND_CATEGORY_ORDER, getTrendCategoryCard } from "@/lib/trend-collection-config"

export const metadata: Metadata = {
  title: "Trends by Category – Outfit, Hair & Accessory Trends",
  description:
    "Browse fashion trends by category — the most-wanted outfit looks, seasonal hair trends, and accessory trends in bags, shoes and jewellery.",
  alternates: { canonical: "https://stylefinden.com/trends/category" },
  openGraph: {
    title: "Trends by Category | STYLEFINDEN",
    description: "Fashion trends by category — outfits, hair and accessories.",
    url: "https://stylefinden.com/trends/category",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trends by Category | STYLEFINDEN",
    description: "Fashion trends by category — outfits, hair and accessories.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function TrendCategoryIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "By Category",
        heading: "Trends by",
        headingItalic: "category.",
        description:
          "Explore what's trending across every fashion category — from the season's key clothing looks to the it-bags and haircuts making headlines.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Trends", href: "/trends" },
        { label: "By Category" },
      ]}
      collections={[
        {
          label: "All Categories",
          basePath: "/trends/category",
          gridCols: "grid-cols-1 md:grid-cols-3",
          items: TREND_CATEGORY_ORDER.map(getTrendCategoryCard),
        },
      ]}
    />
  )
}

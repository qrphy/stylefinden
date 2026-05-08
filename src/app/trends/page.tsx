// Trends ana listeleme sayfası — trend koleksiyonlarını mevsim, estetik ve kategoriye
// göre gruplandırarak SectionMainPage paylaşımlı layout'u ile gösterir.
import type { Metadata } from "next";
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage";
import {
  TREND_SEASON_ORDER, getTrendSeasonCard,
  TREND_AESTHETIC_ORDER, getTrendAestheticCard,
  TREND_CATEGORY_ORDER, getTrendCategoryCard,
} from "@/lib/trend-collection-config";

export const metadata: Metadata = {
  title: "Trends – What's Hot in Fashion Right Now",
  description:
    "Discover the latest fashion trends – from seasonal must-haves and style aesthetics to emerging looks in outfits, hairstyles and accessories.",
  alternates: { canonical: "https://stylefinden.com/trends" },
  openGraph: {
    title: "Trends – What's Hot in Fashion Right Now | STYLEFINDEN",
    description: "The latest fashion trends curated by season, aesthetic and category.",
    url: "https://stylefinden.com/trends",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trends – What's Hot in Fashion Right Now | STYLEFINDEN",
    description: "The latest fashion trends curated by season, aesthetic and category.",
    images: ["/stylefinden-logo.png"],
  },
};

const collections: CollectionGroup[] = [
  {
    label: "By Season",
    basePath: "/trends/season",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: TREND_SEASON_ORDER.map(getTrendSeasonCard),
  },
  {
    label: "By Aesthetic",
    basePath: "/trends/aesthetic",
    gridCols: "grid-cols-2 md:grid-cols-3",
    items: TREND_AESTHETIC_ORDER.map(getTrendAestheticCard),
  },
  {
    label: "By Category",
    basePath: "/trends/category",
    gridCols: "grid-cols-1 md:grid-cols-3",
    items: TREND_CATEGORY_ORDER.map(getTrendCategoryCard),
  },
];

export default function TrendsPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "Fashion Trends",
        heading: "Stay ahead of",
        headingItalic: "every trend.",
        description: "Explore the latest fashion trends curated by season, aesthetic and category — from quiet luxury to Y2K revivals and beyond.",
      }}
      collections={collections}
    />
  );
}

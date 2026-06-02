// Trends ana listeleme sayfası — trend koleksiyonlarını mevsim, estetik ve kategoriye
// göre gruplandırarak SectionMainPage paylaşımlı layout'u ile gösterir.
import type { Metadata } from "next";
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage";
import SectionComingSoonPopup from "@/components/shared/SectionComingSoonPopup";
import {
  TREND_SEASON_ORDER, getTrendSeasonCard,
  TREND_AESTHETIC_ORDER, getTrendAestheticCard,
  TREND_CATEGORY_ORDER, getTrendCategoryCard,
} from "@/lib/trend-collection-config";

export const metadata: Metadata = {
  title: "Fashion Trends 2026 – Street Style, Aesthetic & Style Inspiration",
  description:
    "Discover fashion trends for 2026 — street style, aesthetic outfits, old money looks, y2k fashion and seasonal style inspiration curated by category.",
  keywords: [
    "fashion trends 2026",
    "street style",
    "aesthetic outfits",
    "style trends",
    "old money outfits",
    "old money style",
    "y2k outfits",
    "vintage style",
    "retro style",
    "90s outfits",
    "80s outfits",
    "clean girl style",
    "scene outfits",
    "chic style",
    "grunge style",
    "boho style",
    "korean outfits",
    "streetwear style",
  ],
  alternates: { canonical: "https://stylefinden.com/trends" },
  openGraph: {
    title: "Fashion Trends 2026 – Street Style, Aesthetic & Style Inspiration | STYLEFINDEN",
    description: "Fashion trends 2026 — street style, aesthetic outfits, old money, y2k and seasonal inspiration.",
    url: "https://stylefinden.com/trends",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Trends 2026 – Street Style, Aesthetic & Style Inspiration | STYLEFINDEN",
    description: "Fashion trends 2026 — street style, aesthetic outfits, old money, y2k and seasonal inspiration.",
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
    gridCols: "grid-cols-1 md:grid-cols-3",
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
    <>
      <SectionComingSoonPopup
        section="Trends"
        storageKey="coming_soon_trends"
        outfitsHref="/outfits"
        outfitsLabel="Browse Outfits"
      />
      <SectionMainPage
        hero={{
          eyebrow: "Fashion Trends",
          heading: "Stay ahead of",
          headingItalic: "every trend.",
          description: "Explore the latest fashion trends curated by season, aesthetic and category — from quiet luxury to Y2K revivals and beyond.",
        }}
        collections={collections}
      />
    </>
  );
}

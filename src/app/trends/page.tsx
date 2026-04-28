import type { Metadata } from "next";
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage";

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
  },
};

const collections: CollectionGroup[] = [
  {
    label: "By Season",
    basePath: "/trends/season",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: [
      { slug: "spring-summer", label: "Spring / Summer",  description: "Bright palettes, airy fabrics and the freshest looks of the warm season",  tags: ["Linen", "Pastel", "Floral", "Minimal"],        badge: "New", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]", active: true },
      { slug: "autumn-winter", label: "Autumn / Winter",  description: "Rich textures, layering and the season's most coveted colour stories",       tags: ["Coat", "Earth Tones", "Knitwear", "Leather"],  badge: "New", accent: "bg-[#efebe9]", accentText: "text-[#4e342e]", active: true },
      { slug: "resort",        label: "Resort & Holiday", description: "Vacation-ready pieces and resort wear that travels from pool to dinner",      tags: ["Kaftan", "Linen", "Maxi", "Tropical"],         badge: "New", accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]", active: true },
      { slug: "pre-fall",      label: "Pre-Fall",         description: "Transitional dressing — bridging summer warmth and autumn depth",            tags: ["Trench", "Midi", "Neutral", "Blazer"],         badge: "New", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]", active: true },
    ],
  },
  {
    label: "By Aesthetic",
    basePath: "/trends/aesthetic",
    gridCols: "grid-cols-2 md:grid-cols-3",
    items: [
      { slug: "quiet-luxury",        label: "Quiet Luxury",        description: "Understated elegance, premium fabrics and no-logo sophistication",         tags: ["Cashmere", "Tailored", "Neutral", "Minimal"],  badge: "New", accent: "bg-[#fafafa]",  accentText: "text-gray-900",  active: true },
      { slug: "coastal-grandmother", label: "Coastal Grandmother",  description: "Relaxed linen, woven textures and seaside-inspired calm",                  tags: ["Linen", "Woven", "White", "Relaxed"],          badge: "New", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]", active: true },
      { slug: "dark-academia",       label: "Dark Academia",        description: "Plaid blazers, turtlenecks and a literary, moody atmosphere",              tags: ["Plaid", "Turtleneck", "Brown", "Oxford"],      badge: "New", accent: "bg-[#efebe9]", accentText: "text-[#4e342e]", active: true },
      { slug: "y2k",                 label: "Y2K Revival",          description: "Low-rise denim, metallics and the nostalgia of early 2000s fashion",        tags: ["Low-Rise", "Metallic", "Crop", "Bold"],        badge: "New", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]", active: true },
      { slug: "street-luxe",         label: "Street Luxe",          description: "High-end streetwear — where luxury meets urban cool",                      tags: ["Oversized", "Logo", "Sneaker", "Layering"],    badge: "New", accent: "bg-gray-900",   accentText: "text-white",     active: true },
      { slug: "romantic-femininity", label: "Romantic Femininity",  description: "Soft florals, ruffles and delicate details in pastel palettes",             tags: ["Floral", "Ruffle", "Pastel", "Midi"],          badge: "New", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]", active: true },
    ],
  },
  {
    label: "By Category",
    basePath: "/trends/category",
    gridCols: "grid-cols-1 md:grid-cols-3",
    items: [
      { slug: "outfit-trends",      label: "Outfit Trends",      description: "The most-wanted looks in clothing — from runway to real life",          tags: ["Looks", "Silhouette", "Color", "Key Pieces"], badge: "New", accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]", active: true },
      { slug: "hair-trends",        label: "Hair Trends",        description: "Cuts, colours and styling techniques setting the tone this season",      tags: ["Cut", "Colour", "Texture", "Styling"],        badge: "New", accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]", active: true },
      { slug: "accessory-trends",   label: "Accessory Trends",   description: "Bags, shoes and jewellery — the finishing touches every look needs",     tags: ["Bags", "Shoes", "Jewellery", "Statement"],    badge: "New", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]", active: true },
    ],
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

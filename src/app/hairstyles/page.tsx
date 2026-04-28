import type { Metadata } from "next";
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage";

export const metadata: Metadata = {
  title: "Hairstyles – Cuts, Styles & Looks for Every Occasion",
  description:
    "Discover curated hairstyle collections for every hair type and occasion – from braids and buns to everyday looks and wedding styles.",
  alternates: { canonical: "https://stylefinden.com/hairstyles" },
  openGraph: {
    title: "Hairstyles – Cuts & Styles for Every Occasion | STYLEFINDEN",
    description: "Curated hairstyle collections for every hair type and occasion.",
    url: "https://stylefinden.com/hairstyles",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
  },
};

const collections: CollectionGroup[] = [
  {
    label: "By Hair Type",
    basePath: "/hairstyles/type",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: [
      { slug: "braids", label: "Braids", description: "Classic braids, box braids, fishtail and more – for any hair length",    tags: ["Box Braid", "Fishtail", "Crown", "Dutch"],     badge: "New", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]", active: true },
      { slug: "buns",   label: "Buns",   description: "Elegant or effortless – bun hairstyles for every day and occasion",      tags: ["Messy Bun", "Top Knot", "Low Bun", "Chignon"], badge: "New", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]", active: true },
      { slug: "waves",  label: "Waves",  description: "Soft, beachy or defined – wave styles that suit every face shape",       tags: ["Beach Wave", "Soft Wave", "S-Wave", "Loose"],  badge: "New", accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]", active: true },
      { slug: "curls",  label: "Curls",  description: "Natural curls, defined coils and bouncy ringlets for textured hair",     tags: ["Ringlet", "Coil", "Spiral", "Defined"],        badge: "New", accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]", active: true },
    ],
  },
  {
    label: "By Occasion",
    basePath: "/hairstyles/occasion",
    gridCols: "grid-cols-2 md:grid-cols-4",
    items: [
      { slug: "everyday", label: "Everyday", description: "Quick and effortless looks for busy mornings and casual days",       tags: ["5 Min", "No-Heat", "Practical", "Casual"],  badge: "New", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]", active: true },
      { slug: "wedding",  label: "Wedding",  description: "Romantic updos, soft waves and elegant styles for the big day",     tags: ["Updo", "Bridal", "Romantic", "Floral"],     badge: "New", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]", active: true },
      { slug: "party",    label: "Party",    description: "Glamorous and bold hairstyles that steal the spotlight",            tags: ["Glam", "Volume", "Statement", "Bold"],       badge: "New", accent: "bg-gray-900",   accentText: "text-white",     active: true },
      { slug: "office",   label: "Office",   description: "Polished and put-together looks for professional environments",     tags: ["Sleek", "Low Bun", "Polished", "Clean"],    badge: "New", accent: "bg-[#efebe9]",  accentText: "text-[#4e342e]", active: true },
    ],
  },
];

export default function HairstylesPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "Hairstyle Collections",
        heading: "Find your",
        headingItalic: "perfect cut.",
        description: "Browse curated hairstyle collections – sorted by hair type and occasion. From braids and buns to wedding and everyday looks.",
      }}
      collections={collections}
    />
  );
}

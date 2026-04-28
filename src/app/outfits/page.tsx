import type { Metadata } from "next";
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage";

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
  },
};

const collections: CollectionGroup[] = [
  {
    label: "By Season",
    basePath: "/outfits/season",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: [
      { slug: "summer",  label: "Summer Dresses",  description: "Light dresses, floral prints & linen robes for hot days",              tags: ["Maxi", "Midi", "Mini", "Floral"],           badge: "New", accent: "bg-[#EDCFA9]",  accentText: "text-[#f57f17]", active: true  },
      { slug: "winter",  label: "Winter Outfits",  description: "Warm layering looks, coats and cozy combinations for cold days",        tags: ["Coat", "Layering", "Knitwear", "Boots"],    badge: "New", accent: "bg-[#e3f2fd]",  accentText: "text-[#1565c0]", active: true  },
      { slug: "autumn",  label: "Autumn Looks",    description: "Earth tones, trench coats and crisp transitional looks",               tags: ["Earth Tones", "Trench", "Midi", "Boots"],   badge: "New", accent: "bg-[#efebe9]",  accentText: "text-[#4e342e]", active: true  },
      { slug: "spring",  label: "Spring Looks",    description: "Pastel tones, light blazers and fresh combinations",                   tags: ["Pastels", "Blazer", "Linen", "Floral"],     badge: "New", accent: "bg-[#e8f5e9]",  accentText: "text-[#2e7d32]", active: true  },
    ],
  },
  {
    label: "By Occasion",
    basePath: "/outfits/occasion",
    gridCols: "grid-cols-2 md:grid-cols-3",
    items: [
      { slug: "office",     label: "Office & Business", description: "Polished and professional – looks for meetings, office and more",        tags: ["Blazer", "Tailoring", "Neutral", "Polished"],  badge: "New", accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]", active: true },
      { slug: "evening",    label: "Evening & Event",   description: "Elegant outfits for dinners, parties and special occasions",             tags: ["Midi", "Silk", "Statement", "Elegant"],        badge: "New", accent: "bg-gray-900",   accentText: "text-white",     active: true },
      { slug: "casual",     label: "Casual & Everyday", description: "Comfortable, stylish everyday looks for relaxed days",                  tags: ["Denim", "Basics", "Comfort", "Layering"],      badge: "New", accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]", active: true },
      { slug: "beach",      label: "Beach & Vacation",  description: "Beach vibes, cover-ups and summery vacation looks",                     tags: ["Linen", "Cover-up", "Maxi", "Kaftan"],         badge: "New", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]", active: true },
      { slug: "festival",   label: "Festival & Outdoor",description: "Boho, denim and playful layering looks for open air",                  tags: ["Boho", "Denim", "Fringe", "Floral"],           badge: "New", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]", active: true },
      { slug: "date-night", label: "Date Night",        description: "Romantic and confident looks for unforgettable evenings",               tags: ["Midi", "Romantic", "Bold", "Feminine"],        badge: "New", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]", active: true },
    ],
  },
  {
    label: "By Style",
    basePath: "/outfits/style",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: [
      { slug: "boho",        label: "Boho",        description: "Flowing fabrics, fringe & earthy tones",          tags: ["Maxi", "Floral", "Fringe", "Linen"],         badge: "New", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]", active: true },
      { slug: "minimalist",  label: "Minimalist",  description: "Clean, simple and timelessly elegant",            tags: ["Neutral", "Monochrome", "Basics", "Clean"],  badge: "New", accent: "bg-gray-100",   accentText: "text-gray-700",  active: true },
      { slug: "streetstyle", label: "Street Style",description: "Urban, bold and always on trend",                 tags: ["Denim", "Oversized", "Graphic", "Sneaker"],  badge: "New", accent: "bg-gray-900",   accentText: "text-white",     active: true },
      { slug: "classic",     label: "Classic",     description: "Timeless basics with a modern twist",             tags: ["Blazer", "Trench", "Tailoring", "Neutral"],  badge: "New", accent: "bg-[#fafafa]",  accentText: "text-gray-900",  active: true },
    ],
  },
];

export default function OutfitsPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "Outfit Collections",
        heading: "Find your",
        headingItalic: "perfect look.",
        description: "Browse curated outfit collections – sorted by season, occasion and style. New collections added regularly.",
      }}
      collections={collections}
    />
  );
}

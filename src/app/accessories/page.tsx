// Accessories ana listeleme sayfası — aksesuar tipine göre gruplandırılmış
// koleksiyonları SectionMainPage paylaşımlı layout'u ile gösterir.
import type { Metadata } from "next";
import SectionMainPage, { type CollectionGroup } from "@/components/shared/SectionMainPage";

export const metadata: Metadata = {
  title: "Accessories – Bags, Jewelry, Shoes & More",
  description:
    "Discover curated accessories for every style and occasion – from classic handbags and statement jewelry to shoes, scarves and seasonal must-haves.",
  alternates: { canonical: "https://stylefinden.com/accessories" },
  openGraph: {
    title: "Accessories – Bags, Jewelry, Shoes & More | STYLEFINDEN",
    description: "Curated accessories collections: bags, jewelry, shoes and scarves for every outfit.",
    url: "https://stylefinden.com/accessories",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessories – Bags, Jewelry, Shoes & More | STYLEFINDEN",
    description: "Curated accessories collections: bags, jewelry, shoes and scarves for every outfit.",
    images: ["/stylefinden-logo.png"],
  },
};

const collections: CollectionGroup[] = [
  {
    label: "By Type",
    basePath: "/accessories/type",
    gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    items: [
      { slug: "bags",     label: "Bags & Handbags",  description: "Totes, crossbodies, clutches and shoulder bags for every day and occasion",     tags: ["Tote", "Crossbody", "Clutch", "Mini Bag"],       badge: "New", accent: "bg-[#efebe9]", accentText: "text-[#4e342e]", active: true },
      { slug: "jewelry",  label: "Jewelry",           description: "Gold chains, statement earrings, layered necklaces and delicate rings",         tags: ["Necklace", "Earrings", "Rings", "Bracelets"],    badge: "New", accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]", active: true },
      { slug: "shoes",    label: "Shoes & Footwear",  description: "Loafers, heels, sneakers and boots – shoes that complete every outfit",         tags: ["Loafers", "Heels", "Sneakers", "Boots"],         badge: "New", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]", active: true },
      { slug: "scarves",  label: "Scarves & Wraps",   description: "Silk neck scarves, knit wraps and head ties that add elegance to any look",     tags: ["Silk", "Knit", "Head Wrap", "Neck Tie"],         badge: "New", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]", active: true },
    ],
  },
];

export default function AccessoriesPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "Accessories Collections",
        heading: "The finishing",
        headingItalic: "touch.",
        description: "Browse curated accessories – bags, jewelry, shoes and scarves sorted by type. The right accessory transforms any outfit.",
      }}
      collections={collections}
    />
  );
}

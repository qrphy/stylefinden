import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"

export const metadata: Metadata = {
  title: "Accessory Collections by Type – Bags, Jewelry, Shoes & Scarves",
  description:
    "Browse curated accessory collections by type – from classic handbags and statement jewelry to shoes, scarves and seasonal must-haves.",
  alternates: { canonical: "https://stylefinden.com/accessories/type" },
  openGraph: {
    title: "Accessory Collections by Type | STYLEFINDEN",
    description: "Curated accessory collections for every style.",
    url: "https://stylefinden.com/accessories/type",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessory Collections by Type | STYLEFINDEN",
    description: "Curated accessory collections for every style.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function AccessoryTypeIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "Accessory Collections",
        heading: "The finishing",
        headingItalic: "touch.",
        description:
          "From classic handbags and statement jewelry to shoes and scarves – discover curated accessory collections that complete every look.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Accessories", href: "/accessories" },
        { label: "By Type" },
      ]}
      collections={[
        {
          label: "All Types",
          basePath: "/accessories/type",
          gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          items: [
            {
              slug: "bags",
              label: "Bags & Handbags",
              description: "Totes, crossbodies, clutches and shoulder bags for every day and occasion",
              tags: ["Tote", "Crossbody", "Clutch", "Mini Bag"],
              badge: "New",
              accent: "bg-[#efebe9]",
              accentText: "text-[#4e342e]",
              active: true,
            },
            {
              slug: "jewelry",
              label: "Jewelry",
              description: "Gold chains, statement earrings, layered necklaces and delicate rings",
              tags: ["Necklace", "Earrings", "Rings", "Bracelets"],
              badge: "New",
              accent: "bg-[#EDCFA9]",
              accentText: "text-[#f57f17]",
              active: true,
            },
            {
              slug: "shoes",
              label: "Shoes & Footwear",
              description: "Loafers, heels, sneakers and boots – shoes that complete every outfit",
              tags: ["Loafers", "Heels", "Sneakers", "Boots"],
              badge: "New",
              accent: "bg-[#e3f2fd]",
              accentText: "text-[#1565c0]",
              active: true,
            },
            {
              slug: "scarves",
              label: "Scarves & Wraps",
              description: "Silk neck scarves, knit wraps and head ties that add elegance to any look",
              tags: ["Silk", "Knit", "Head Wrap", "Neck Tie"],
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

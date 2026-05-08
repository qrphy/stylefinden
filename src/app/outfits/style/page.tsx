import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"

export const metadata: Metadata = {
  title: "Outfit Collections by Style – Boho, Minimalist, Street Style & More",
  description:
    "Browse curated outfit collections by style – from effortless boho and clean minimalist looks to bold street style and timeless classic outfits.",
  alternates: { canonical: "https://stylefinden.com/outfits/style" },
  openGraph: {
    title: "Outfit Collections by Style | STYLEFINDEN",
    description: "Curated outfit collections for every style.",
    url: "https://stylefinden.com/outfits/style",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfit Collections by Style | STYLEFINDEN",
    description: "Curated outfit collections for every style.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function StyleIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "Style Collections",
        heading: "Find your",
        headingItalic: "signature style.",
        description:
          "From effortless boho and clean minimalist looks to bold street style and timeless classic outfits – discover the style that speaks to you.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Outfits", href: "/outfits" },
        { label: "By Style" },
      ]}
      collections={[
        {
          label: "All Styles",
          basePath: "/outfits/style",
          gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          items: [
            {
              slug: "boho",
              label: "Boho",
              description: "Flowing fabrics, fringe & earthy tones",
              tags: ["Maxi", "Floral", "Fringe", "Linen"],
              badge: "New",
              accent: "bg-[#e8f5e9]",
              accentText: "text-[#2e7d32]",
              active: true,
            },
            {
              slug: "minimalist",
              label: "Minimalist",
              description: "Clean, simple and timelessly elegant",
              tags: ["Neutral", "Monochrome", "Basics", "Clean"],
              badge: "New",
              accent: "bg-gray-100",
              accentText: "text-gray-700",
              active: true,
            },
            {
              slug: "streetstyle",
              label: "Street Style",
              description: "Urban, bold and always on trend",
              tags: ["Denim", "Oversized", "Graphic", "Sneaker"],
              badge: "New",
              accent: "bg-gray-900",
              accentText: "text-white",
              active: true,
            },
            {
              slug: "classic",
              label: "Classic",
              description: "Timeless basics with a modern twist",
              tags: ["Blazer", "Trench", "Tailoring", "Neutral"],
              badge: "New",
              accent: "bg-[#fafafa]",
              accentText: "text-gray-900",
              active: true,
            },
          ],
        },
      ]}
    />
  )
}

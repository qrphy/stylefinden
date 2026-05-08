import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"

export const metadata: Metadata = {
  title: "Hairstyle Collections by Occasion – Everyday, Wedding, Party & Office",
  description:
    "Browse curated hairstyle collections for every occasion – from quick everyday looks and polished office styles to romantic wedding updos and bold party hair.",
  alternates: { canonical: "https://stylefinden.com/hairstyles/occasion" },
  openGraph: {
    title: "Hairstyle Collections by Occasion | STYLEFINDEN",
    description: "Curated hairstyle collections for every occasion.",
    url: "https://stylefinden.com/hairstyles/occasion",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairstyle Collections by Occasion | STYLEFINDEN",
    description: "Curated hairstyle collections for every occasion.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function HairstyleOccasionIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "By Occasion",
        heading: "The right style for",
        headingItalic: "every moment.",
        description:
          "From quick no-heat everyday looks to glamorous party hair and romantic wedding updos – discover curated hairstyle collections for every occasion.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Hairstyles", href: "/hairstyles" },
        { label: "By Occasion" },
      ]}
      collections={[
        {
          label: "All Occasions",
          basePath: "/hairstyles/occasion",
          gridCols: "grid-cols-2 md:grid-cols-4",
          items: [
            {
              slug: "everyday",
              label: "Everyday",
              description: "Quick and effortless looks for busy mornings and casual days",
              tags: ["5 Min", "No-Heat", "Practical", "Casual"],
              badge: "New",
              accent: "bg-[#e3f2fd]",
              accentText: "text-[#1565c0]",
              active: true,
            },
            {
              slug: "wedding",
              label: "Wedding",
              description: "Romantic updos, soft waves and elegant styles for the big day",
              tags: ["Updo", "Bridal", "Romantic", "Floral"],
              badge: "New",
              accent: "bg-[#fce4ec]",
              accentText: "text-[#c62828]",
              active: true,
            },
            {
              slug: "party",
              label: "Party",
              description: "Glamorous and bold hairstyles that steal the spotlight",
              tags: ["Glam", "Volume", "Statement", "Bold"],
              badge: "New",
              accent: "bg-gray-900",
              accentText: "text-white",
              active: true,
            },
            {
              slug: "office",
              label: "Office",
              description: "Polished and put-together looks for professional environments",
              tags: ["Sleek", "Low Bun", "Polished", "Clean"],
              badge: "New",
              accent: "bg-[#efebe9]",
              accentText: "text-[#4e342e]",
              active: true,
            },
          ],
        },
      ]}
    />
  )
}

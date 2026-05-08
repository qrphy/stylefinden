import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"

export const metadata: Metadata = {
  title: "Hairstyle Collections by Type – Braids, Buns, Waves & Curls",
  description:
    "Browse curated hairstyle collections by hair type – from classic braids and elegant buns to soft waves and natural curls.",
  alternates: { canonical: "https://stylefinden.com/hairstyles/type" },
  openGraph: {
    title: "Hairstyle Collections by Type | STYLEFINDEN",
    description: "Curated hairstyle collections for every hair type.",
    url: "https://stylefinden.com/hairstyles/type",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairstyle Collections by Type | STYLEFINDEN",
    description: "Curated hairstyle collections for every hair type.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function HairstyleTypeIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "By Hair Type",
        heading: "Find your",
        headingItalic: "perfect style.",
        description:
          "From classic braids and elegant buns to soft waves and natural curls – discover curated hairstyle collections for every hair type.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Hairstyles", href: "/hairstyles" },
        { label: "By Type" },
      ]}
      collections={[
        {
          label: "All Hair Types",
          basePath: "/hairstyles/type",
          gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          items: [
            {
              slug: "braids",
              label: "Braids",
              description: "Classic braids, box braids, fishtail and more – for any hair length",
              tags: ["Box Braid", "Fishtail", "Crown", "Dutch"],
              badge: "New",
              accent: "bg-[#e8f5e9]",
              accentText: "text-[#2e7d32]",
              active: true,
            },
            {
              slug: "buns",
              label: "Buns",
              description: "Elegant or effortless – bun hairstyles for every day and occasion",
              tags: ["Messy Bun", "Top Knot", "Low Bun", "Chignon"],
              badge: "New",
              accent: "bg-[#fce4ec]",
              accentText: "text-[#c62828]",
              active: true,
            },
            {
              slug: "waves",
              label: "Waves",
              description: "Soft, beachy or defined – wave styles that suit every face shape",
              tags: ["Beach Wave", "Soft Wave", "S-Wave", "Loose"],
              badge: "New",
              accent: "bg-[#EDCFA9]",
              accentText: "text-[#f57f17]",
              active: true,
            },
            {
              slug: "curls",
              label: "Curls",
              description: "Natural curls, defined coils and bouncy ringlets for textured hair",
              tags: ["Ringlet", "Coil", "Spiral", "Defined"],
              badge: "New",
              accent: "bg-[#f3e5f5]",
              accentText: "text-[#6a1b9a]",
              active: true,
            },
          ],
        },
      ]}
    />
  )
}

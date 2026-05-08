import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"

export const metadata: Metadata = {
  title: "Outfit Collections by Occasion – Office, Evening, Casual & More",
  description:
    "Browse curated outfit collections for every occasion – from polished office looks and elegant evening outfits to casual everyday styles and beach vibes.",
  alternates: { canonical: "https://stylefinden.com/outfits/occasion" },
  openGraph: {
    title: "Outfit Collections by Occasion | STYLEFINDEN",
    description: "Curated outfit collections for every occasion.",
    url: "https://stylefinden.com/outfits/occasion",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfit Collections by Occasion | STYLEFINDEN",
    description: "Curated outfit collections for every occasion.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function OccasionIndexPage() {
  return (
    <SectionMainPage
      hero={{
        eyebrow: "By Occasion",
        heading: "The right look for",
        headingItalic: "every moment.",
        description:
          "From polished office looks to relaxed weekend styles and elegant evening outfits – discover curated collections for every occasion.",
      }}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Outfits", href: "/outfits" },
        { label: "By Occasion" },
      ]}
      collections={[
        {
          label: "All Occasions",
          basePath: "/outfits/occasion",
          gridCols: "grid-cols-2 md:grid-cols-3",
          items: [
            {
              slug: "office",
              label: "Office & Business",
              description: "Polished and professional – looks for meetings, office and more",
              tags: ["Blazer", "Tailoring", "Neutral", "Polished"],
              badge: "New",
              accent: "bg-[#f3e5f5]",
              accentText: "text-[#6a1b9a]",
              active: true,
            },
            {
              slug: "evening",
              label: "Evening & Event",
              description: "Elegant outfits for dinners, parties and special occasions",
              tags: ["Midi", "Silk", "Statement", "Elegant"],
              badge: "New",
              accent: "bg-gray-900",
              accentText: "text-white",
              active: true,
            },
            {
              slug: "casual",
              label: "Casual & Everyday",
              description: "Comfortable, stylish everyday looks for relaxed days",
              tags: ["Denim", "Basics", "Comfort", "Layering"],
              badge: "New",
              accent: "bg-[#fff8e1]",
              accentText: "text-[#f57f17]",
              active: true,
            },
            {
              slug: "beach",
              label: "Beach & Vacation",
              description: "Beach vibes, cover-ups and summery vacation looks",
              tags: ["Linen", "Cover-up", "Maxi", "Kaftan"],
              badge: "New",
              accent: "bg-[#e3f2fd]",
              accentText: "text-[#1565c0]",
              active: true,
            },
            {
              slug: "festival",
              label: "Festival & Outdoor",
              description: "Boho, denim and playful layering looks for open air",
              tags: ["Boho", "Denim", "Fringe", "Floral"],
              badge: "New",
              accent: "bg-[#fce4ec]",
              accentText: "text-[#c62828]",
              active: true,
            },
            {
              slug: "date-night",
              label: "Date Night",
              description: "Romantic and confident looks for unforgettable evenings",
              tags: ["Midi", "Romantic", "Bold", "Feminine"],
              badge: "New",
              accent: "bg-[#fce4ec]",
              accentText: "text-[#c62828]",
              active: true,
            },
          ],
        },
      ]}
    />
  )
}

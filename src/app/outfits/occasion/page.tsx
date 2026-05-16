import type { Metadata } from "next"
import SectionMainPage from "@/components/shared/SectionMainPage"
import { OCCASION_ORDER, getOccasionCard } from "@/lib/outfit-occasion-config"

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
          gridCols: "grid-cols-1 md:grid-cols-3",
          items: OCCASION_ORDER.map(getOccasionCard),
        },
      ]}
    />
  )
}

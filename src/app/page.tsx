import type { Metadata } from "next"
import dynamic from "next/dynamic"
import HeroSection from "@/components/sections/home/HeroSection"
import FeaturedOutfits from "@/components/sections/home/FeaturedOutfits"
import StyleFinderWidgetServer from "@/components/home/StyleFinderWidgetServer"
import JsonLd from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: { absolute: "Outfit Ideas, Hairstyles & Fashion Trends for Women | STYLEFINDEN" },
  description: "Discover outfit ideas, hairstyles and accessories for every occasion and style. From casual outfits to party looks — your go-to fashion platform for modern women.",
  keywords: [
    "outfit ideas for women",
    "women outfit ideas",
    "casual outfits",
    "cute outfits",
    "party outfit ideas",
    "summer outfits",
    "aesthetic outfits",
    "street style",
    "fashion trends 2026",
    "hairstyle ideas",
    "style inspiration",
    "women fashion",
  ],
  alternates: { canonical: "https://stylefinden.com" },
  openGraph: {
    title: "Outfit Ideas, Hairstyles & Fashion Trends for Women | STYLEFINDEN",
    description: "Outfit ideas, hairstyles and accessories for every style and occasion — from casual looks to party outfits.",
    url: "https://stylefinden.com",
    type: "website",
    siteName: "STYLEFINDEN",
    locale: "en_US",
    images: [{ url: "/stylefinden-logo.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfit Ideas, Hairstyles & Fashion Trends for Women | STYLEFINDEN",
    description: "Outfit ideas, hairstyles and accessories for every style and occasion — from casual looks to party outfits.",
    images: ["/stylefinden-logo.png"],
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "STYLEFINDEN",
  url: "https://stylefinden.com",
  description: "Curated outfits, hairstyles and accessories for every style and occasion.",
  publisher: {
    "@type": "Organization",
    name: "STYLEFINDEN",
    url: "https://stylefinden.com",
    logo: { "@type": "ImageObject", url: "https://stylefinden.com/stylefinden-logo.png" },
  },
}

const FeaturedCategories    = dynamic(() => import("@/components/sections/home/FeaturedCategories"))
const SeasonalHighlights    = dynamic(() => import("@/components/sections/home/SeasonalHighlights"))
const HairstyleHighlights   = dynamic(() => import("@/components/sections/home/HairstyleHighlights"))
const AccessoriesHighlights = dynamic(() => import("@/components/sections/home/AccessoriesHighlights"))
const NewsletterSection     = dynamic(() => import("@/components/sections/home/NewsletterSection"))
const LatestArticles        = dynamic(() => import("@/components/sections/home/LatestArticles"))

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <main>
        <HeroSection />
        <StyleFinderWidgetServer />
        <FeaturedOutfits />
        <FeaturedCategories />
        <SeasonalHighlights />
        <HairstyleHighlights />
        <AccessoriesHighlights />
        <NewsletterSection />
        <LatestArticles />
      </main>
    </>
  )
}

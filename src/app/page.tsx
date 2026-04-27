import dynamic from "next/dynamic"
import HeroSection from "@/components/sections/home/HeroSection"
import FeaturedOutfits from "@/components/sections/home/FeaturedOutfits"

const FeaturedCategories    = dynamic(() => import("@/components/sections/home/FeaturedCategories"))
const SeasonalHighlights    = dynamic(() => import("@/components/sections/home/SeasonalHighlights"))
const HairstyleHighlights   = dynamic(() => import("@/components/sections/home/HairstyleHighlights"))
const AccessoriesHighlights = dynamic(() => import("@/components/sections/home/AccessoriesHighlights"))
const LatestArticles        = dynamic(() => import("@/components/sections/home/LatestArticles"))


export default function Home() {
  return (
  <main>
    <HeroSection />
    <FeaturedOutfits />
    <FeaturedCategories />
    <SeasonalHighlights />
    <HairstyleHighlights />
    <AccessoriesHighlights />
    <LatestArticles />
  </main>
  );
}

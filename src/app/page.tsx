import dynamic from "next/dynamic"
import HeroSection from "@/components/sections/home/HeroSection"
import FeaturedOutfits from "@/components/sections/home/FeaturedOutfits"

// Aşağıdaki bölümler lazy load edilir — ilk ekran dışındaki içerikler
// sayfa yüklenirken kullanıcıyı bekletmez.
const FeaturedCategories    = dynamic(() => import("@/components/sections/home/FeaturedCategories"))
const SeasonalHighlights    = dynamic(() => import("@/components/sections/home/SeasonalHighlights"))
const HairstyleHighlights   = dynamic(() => import("@/components/sections/home/HairstyleHighlights"))
const AccessoriesHighlights = dynamic(() => import("@/components/sections/home/AccessoriesHighlights"))
const LatestArticles        = dynamic(() => import("@/components/sections/home/LatestArticles"))

export default function Home() {
  return (
    <main>
      {/* 1. HERO — Ana başlık, slogan, CTA butonları ve istatistikler */}
      <HeroSection />

      {/* 2. FEATURED OUTFITS — Öne çıkan kıyafet kombinasyonları (Sanity → statik fallback) */}
      <FeaturedOutfits />

      {/* 3. FEATURED CATEGORIES — Outfits / Hairstyles / Accessories / Trends / Blog / Style Guide kategori kartları */}
      <FeaturedCategories />

      {/* 4. SEASONAL HIGHLIGHTS — İlkbahar ve Yaz için mevsimsel kombin önerileri (statik) */}
      <SeasonalHighlights />

      {/* 5. HAIRSTYLE HIGHLIGHTS — Featured saç stili + filtreli grid (Sanity → statik fallback) */}
      <HairstyleHighlights />

      {/* 6. ACCESSORIES HIGHLIGHTS — Jewelry / Bags / Sunglasses kategorilere göre gruplandırılmış (Sanity → statik fallback) */}
      <AccessoriesHighlights />

      {/* 7. LATEST ARTICLES — En son blog yazıları: büyük öne çıkan + küçük yan liste (Sanity → statik fallback) */}
      <LatestArticles />
    </main>
  );
}

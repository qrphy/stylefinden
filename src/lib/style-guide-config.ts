// Style Guide sayfası için statik veri — style-guide/page.tsx bu dosyadan okur.

export type StyleGuideTopic = {
  slug: string
  label: string
  description: string
  icon: string
  accent: string
  accentText: string
  href: string
}

export type StyleGuideFeaturedGuide = {
  slug: string
  category: string
  title: string
  subtitle: string
  excerpt: string
  readTime: string
  href: string
  accent: string
  accentText: string
  wide: boolean
}

export type StyleGuideQuickTip = {
  tip: string
}

// 6 ana stil konusu — her biri ilgili blog kategorisine veya makalesine yönlendirir
export const styleGuideTopics: StyleGuideTopic[] = [
  {
    slug: "body-type",
    label: "Body Type Guide",
    description: "Dress for your silhouette — flattering shapes for every figure",
    icon: "◈",
    accent: "bg-[#f3e5f5]",
    accentText: "text-[#6a1b9a]",
    href: "/blog/seasonal-guides/body-type-guide",
  },
  {
    slug: "color-theory",
    label: "Color Theory",
    description: "Skin tone palettes, complementary colors and what to wear",
    icon: "◉",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    href: "/blog/trend-reports/color-theory",
  },
  {
    slug: "capsule-wardrobe",
    label: "Capsule Wardrobe",
    description: "10 pieces, 30 outfits — building a wardrobe that works",
    icon: "◫",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    href: "/blog/seasonal-guides/capsule-wardrobe-guide",
  },
  {
    slug: "occasion-dressing",
    label: "Occasion Dressing",
    description: "The right look for work, weddings, dates and beyond",
    icon: "◷",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    href: "/blog/occasion-guides",
  },
  {
    slug: "seasonal-style",
    label: "Seasonal Style",
    description: "What to wear each season — layering, transitions and key pieces",
    icon: "◌",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    href: "/blog/seasonal-guides",
  },
  {
    slug: "accessories-101",
    label: "Accessories 101",
    description: "How to choose, layer and style bags, jewelry and shoes",
    icon: "◎",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    href: "/blog/accessories-guides",
  },
]

// Öne çıkan rehberler — sayfanın ortasındaki "Essential Guides" grid bölümü için veri
export const styleGuideFeaturedGuides: StyleGuideFeaturedGuide[] = [
  {
    slug: "capsule-wardrobe",
    category: "Wardrobe",
    title: "Build Your Capsule Wardrobe",
    subtitle: "The foundation of every great outfit",
    excerpt:
      "10 timeless pieces that mix and match into 30+ outfits. Quality over quantity — a capsule wardrobe saves time, money and decision fatigue.",
    readTime: "8 min",
    href: "/blog/seasonal-guides/capsule-wardrobe-guide",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    wide: true,
  },
  {
    slug: "body-type",
    category: "Body Type",
    title: "Dressing for Your Body Type",
    subtitle: "Find your most flattering silhouette",
    excerpt:
      "Hourglass, pear, apple, rectangle — understand your shape and discover which cuts, proportions and styles work best for you.",
    readTime: "6 min",
    href: "/blog/seasonal-guides/body-type-guide",
    accent: "bg-[#f3e5f5]",
    accentText: "text-[#6a1b9a]",
    wide: false,
  },
  {
    slug: "color-palettes",
    category: "Color Theory",
    title: "Your Personal Color Palette",
    subtitle: "Warm, cool or neutral undertones",
    excerpt:
      "How to identify your skin undertone and build a wardrobe palette that makes every outfit work together effortlessly.",
    readTime: "5 min",
    href: "/blog/trend-reports/color-theory",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    wide: false,
  },
]

// Hızlı stil kuralları — sayfanın altında 3 sütunlu grid olarak gösterilen kısa ipuçları
export const styleGuideQuickTips: StyleGuideQuickTip[] = [
  { tip: "The 1 in, 1 out rule: for every new item you buy, donate one you no longer wear." },
  { tip: "Fit is everything — a well-fitted cheap piece beats an ill-fitted expensive one every time." },
  { tip: "Neutral basics + one statement piece = a complete, balanced outfit." },
  { tip: "Shoes and bag don't need to match exactly — they should complement each other in tone." },
  { tip: "Layer to add depth: a blazer over a simple dress changes the entire register of an outfit." },
  { tip: "When building a capsule, choose a 3-color palette that all work together." },
]

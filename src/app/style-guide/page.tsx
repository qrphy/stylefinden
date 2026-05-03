// Style Guide ana sayfası — vücut tipi rehberleri, renk teorisi, kapsül gardırop ve
// mevsimsel stil konularını gruplandırarak gösterir. Tamamen statik içerik.
import type { Metadata } from "next";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

export const metadata: Metadata = {
  title: "Style Guide – Body Types, Color Theory & Capsule Wardrobe",
  description:
    "Your complete fashion reference: body type guides, color combinations, capsule wardrobe tips, seasonal dressing and occasion styling — all in one place.",
  alternates: { canonical: "https://stylefinden.com/style-guide" },
  openGraph: {
    title: "Style Guide – Body Types, Color Theory & Capsule Wardrobe | STYLEFINDEN",
    description: "Your complete fashion reference for body types, color theory, capsule wardrobes and seasonal style.",
    url: "https://stylefinden.com/style-guide",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
  },
};

// 6 ana stil konusu — her biri ilgili blog kategorisine veya makalesine yönlendirir
const topics = [
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
];

// Öne çıkan rehberler — sayfanın ortasındaki "Essential Guides" grid bölümü için veri
const featuredGuides = [
  {
    slug: "capsule-wardrobe",
    category: "Wardrobe",
    title: "Build Your Capsule Wardrobe",
    subtitle: "The foundation of every great outfit",
    excerpt: "10 timeless pieces that mix and match into 30+ outfits. Quality over quantity — a capsule wardrobe saves time, money and decision fatigue.",
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
    excerpt: "Hourglass, pear, apple, rectangle — understand your shape and discover which cuts, proportions and styles work best for you.",
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
    excerpt: "How to identify your skin undertone and build a wardrobe palette that makes every outfit work together effortlessly.",
    readTime: "5 min",
    href: "/blog/trend-reports/color-theory",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    wide: false,
  },
];

// Hızlı stil kuralları — sayfanın altında 3 sütunlu grid olarak gösterilen kısa ipuçları
const quickTips = [
  { tip: "The 1 in, 1 out rule: for every new item you buy, donate one you no longer wear." },
  { tip: "Fit is everything — a well-fitted cheap piece beats an ill-fitted expensive one every time." },
  { tip: "Neutral basics + one statement piece = a complete, balanced outfit." },
  { tip: "Shoes and bag don't need to match exactly — they should complement each other in tone." },
  { tip: "Layer to add depth: a blazer over a simple dress changes the entire register of an outfit." },
  { tip: "When building a capsule, choose a 3-color palette that all work together." },
];

export default function StyleGuidePage() {
  return (
    <main className="flex-1 bg-white">

      {/* ── Hero ── */}
      <section className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex flex-col gap-5 max-w-xl">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Style Guide
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                Dress with<br />
                <span className="italic font-light">intention.</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                Your complete fashion reference — body type guides, color theory, capsule wardrobe building and seasonal dressing, all in one place.
              </p>
            </div>
            <div className="flex items-center gap-10 md:gap-16 pb-1">
              {[
                { value: "6", label: "Topics" },
                { value: "30+", label: "Guides" },
                { value: "Free", label: "Always" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-10 md:gap-16">
                  {i > 0 && <div className="w-px h-8 bg-gray-200" />}
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-black">{stat.value}</span>
                    <span className="text-xs tracking-widest uppercase text-gray-400">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Browse by Topic</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {topics.map((topic) => (
              <a
                key={topic.slug}
                href={topic.href}
                className={`group flex flex-col gap-3 p-5 ${topic.accent} hover:opacity-90 transition-opacity duration-200`}
              >
                <span className={`text-lg font-black ${topic.accentText}`}>{topic.icon}</span>
                <div className="flex flex-col gap-1 mt-auto">
                  <span className="text-sm font-black text-black tracking-tight leading-tight">{topic.label}</span>
                  <span className="text-xs text-gray-500 leading-snug">{topic.description}</span>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold tracking-widest uppercase ${topic.accentText} group-hover:gap-2 transition-all duration-200`}>
                  Read
                  <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current" fill="none" strokeWidth={2.5}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Guides ── */}
      <section className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Essential Guides</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {featuredGuides.map((guide) => (
              <a
                key={guide.slug}
                href={guide.href}
                className={`group flex flex-col border border-gray-100 hover:border-gray-300 transition-colors duration-200 overflow-hidden ${guide.wide ? "md:col-span-2 xl:col-span-1" : ""}`}
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[16/9]">
                  <ImgPlaceholder />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${guide.accent} ${guide.accentText}`}>
                    {guide.category}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <span className="text-xs tracking-widest uppercase text-gray-400">{guide.readTime} read</span>
                  <h2 className="text-lg font-black text-black tracking-tight leading-tight group-hover:text-gray-600 transition-colors duration-200">
                    {guide.title}
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{guide.excerpt}</p>
                  <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black group-hover:gap-3 transition-all duration-200 mt-auto pt-4 border-t border-gray-100">
                    Read Guide
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={2}>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Style Tips ── */}
      <section className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Quick Style Rules</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {quickTips.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 border border-gray-100">
                <span className="text-xs font-black text-gray-300 mt-0.5 shrink-0">0{i + 1}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Ready to explore?</span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Find your personal<br />
                <span className="italic font-light">style direction.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/outfits"
                className="px-8 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-gray-100 transition-colors duration-200"
              >
                Browse Outfits
              </a>
              <a
                href="/trends"
                className="px-8 py-3 border border-gray-700 text-white text-xs font-semibold tracking-widest uppercase hover:border-white transition-colors duration-200"
              >
                Latest Trends
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

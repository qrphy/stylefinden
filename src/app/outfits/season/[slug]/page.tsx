import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ─── Data Layer ───────────────────────────────────────────────────────────────

type OutfitItem = {
  id: number;
  title: string;
  subtitle: string;
  tag: "Trending" | "New" | "Popular";
  style: string;
  image: string;
  href: string;
};

type RelatedCategory = {
  label: string;
  href: string;
  accent: string;
  accentText: string;
};

type Faq = { q: string; a: string };

type SeasonData = {
  label: string;
  subtitle: string;
  description: string;
  accent: string;
  accentText: string;
  tipTitle: string;
  tipBody: string;
  tipTags: string[];
  filters: string[];
  outfitGridLabel: string;
  styleGuideHref: string;
  stats: { value: string; label: string }[];
  outfits: OutfitItem[];
  relatedCategories: RelatedCategory[];
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
};

const seasons: Record<string, SeasonData> = {
  "summer": {
    label: "Summer Dresses",
    subtitle: "Summer 2025",
    description:
      "From playful floral dresses to elegant maxi gowns and casual mini dresses – discover curated summer outfit looks for every style, every day and every occasion.",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    tipTitle: "Light fabrics, bold prints,",
    tipBody:
      "The perfect summer dress combines lightness with style – for beach, city and beyond.",
    tipTags: ["Linen", "Floral", "Maxi", "Boho"],
    filters: ["All", "Maxi", "Midi", "Mini", "Floral", "Linen", "Boho"],
    outfitGridLabel: "Latest Summer Dress Looks",
    styleGuideHref: "/blog/seasonal-guides/summer-style-guide",
    stats: [
      { value: "80+", label: "Looks" },
      { value: "3", label: "Cuts" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Floral Maxi Dress",   subtitle: "Beach & Vacation",   tag: "Trending", style: "Maxi", image: "/outfits/sfold.png", href: "/outfits/floral-maxi-dress"   },
      { id: 2, title: "Linen Slip Dress",    subtitle: "Casual & City",      tag: "New",      style: "Midi", image: "/outfits/sfold.png", href: "/outfits/linen-slip-dress"    },
      { id: 3, title: "Boho Wrap Dress",     subtitle: "Festival & Nature",  tag: "Popular",  style: "Maxi", image: "/outfits/sfold.png", href: "/outfits/boho-wrap-dress"     },
      { id: 4, title: "Mini Sun Dress",      subtitle: "Summer & Leisure",   tag: "Trending", style: "Mini", image: "/outfits/sfold.png", href: "/outfits/mini-sun-dress"      },
      { id: 5, title: "Stripe Midi Dress",   subtitle: "Chic & Modern",      tag: "New",      style: "Midi", image: "/outfits/sfold.png", href: "/outfits/stripe-midi-dress"   },
      { id: 6, title: "Off-Shoulder Dress",  subtitle: "Evening & Event",    tag: "Popular",  style: "Midi", image: "/outfits/sfold.png", href: "/outfits/off-shoulder-dress"  },
      { id: 7, title: "Cotton Sundress",     subtitle: "Everyday & Picnic",  tag: "Trending", style: "Mini", image: "/outfits/sfold.png", href: "/outfits/cotton-sundress"     },
      { id: 8, title: "Flowy Chiffon Dress", subtitle: "Elegant & Light",    tag: "New",      style: "Maxi", image: "/outfits/sfold.png", href: "/outfits/flowy-chiffon-dress" },
    ],
    relatedCategories: [
      { label: "Boho Style",    href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Beach Looks",   href: "/outfits/occasion/beach",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Festival Style",href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Autumn Looks",  href: "/outfits/season/autumn",     accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
    ],
    faqs: [
      {
        q: "How do you style a summer dress elegantly?",
        a: "A summer dress is versatile: with sandals and a straw hat for the beach, with white sneakers for a city stroll, or with mules and a clutch for evening occasions. A light linen oversized blazer transforms it into a business-casual look.",
      },
      {
        q: "Which summer dress cuts suit which body type?",
        a: "Maxi dresses emphasize the waist and suit all figures. Midi dresses visually elongate the legs. A-line cuts work well for pear shapes, while empire cuts elegantly conceal the midsection.",
      },
      {
        q: "Which accessories pair well with summer dresses?",
        a: "Straw hats, rattan bags, gold jewelry and flat sandals complement summer dresses perfectly. For evening, strappy sandals with a small heel and a minimalist clutch are ideal.",
      },
    ],
    seo: {
      title: "Summer Dress Outfits – Light Looks for Hot Days",
      description:
        "Discover the most beautiful summer dress outfits 2025: maxi dresses, midi dresses, floral prints and light linen dresses for every occasion – from beach to city.",
      keywords: ["Summer Dresses", "Summer Dress Outfit", "Maxi Dress", "Midi Dress", "Summer Dress 2025", "Floral Dress", "Linen Dress", "Beach Dress"],
    },
  },

  "winter": {
    label: "Winter Outfits",
    subtitle: "Winter 2025 / 2026",
    description:
      "Warm layering looks, elegant coats and cozy combinations – discover curated winter outfits for every style, every day and every occasion.",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    tipTitle: "Warmth meets elegance,",
    tipBody:
      "The perfect winter look combines functionality with style – for city, office and weekend.",
    tipTags: ["Coat", "Layering", "Knitwear", "Boots"],
    filters: ["All", "Coat", "Knitwear", "Layering", "Casual", "Elegant", "Business"],
    outfitGridLabel: "Latest Winter Looks",
    styleGuideHref: "/blog/seasonal-guides/winter-style-guide",
    stats: [
      { value: "60+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Classic Wool Coat",      subtitle: "City & Business",    tag: "Trending", style: "Coat",     image: "/outfits/sfold.png", href: "/outfits/classic-wool-coat"      },
      { id: 2, title: "Chunky Knit Combo",      subtitle: "Casual & Cozy",      tag: "Popular",  style: "Knitwear", image: "/outfits/sfold.png", href: "/outfits/chunky-knit-combo"      },
      { id: 3, title: "Monochrome Layer Look",  subtitle: "Minimal & Modern",   tag: "New",      style: "Layering", image: "/outfits/sfold.png", href: "/outfits/monochrome-layer-look"  },
      { id: 4, title: "Teddy Coat Outfit",      subtitle: "Weekend & Leisure",  tag: "Trending", style: "Coat",     image: "/outfits/sfold.png", href: "/outfits/teddy-coat-outfit"      },
      { id: 5, title: "Turtleneck & Trousers",  subtitle: "Office & Business",  tag: "Popular",  style: "Business", image: "/outfits/sfold.png", href: "/outfits/turtleneck-trousers"    },
      { id: 6, title: "Plaid Scarf Look",       subtitle: "Casual & Everyday",  tag: "New",      style: "Casual",   image: "/outfits/sfold.png", href: "/outfits/plaid-scarf-look"       },
      { id: 7, title: "Velvet Evening Look",    subtitle: "Evening & Event",    tag: "Trending", style: "Elegant",  image: "/outfits/sfold.png", href: "/outfits/velvet-evening-look"    },
      { id: 8, title: "Oversized Puffer Coat",  subtitle: "Street & Urban",     tag: "New",      style: "Coat",     image: "/outfits/sfold.png", href: "/outfits/oversized-puffer-coat"  },
    ],
    relatedCategories: [
      { label: "Summer Dresses",   href: "/outfits/season/summer",    accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Autumn Looks",     href: "/outfits/season/autumn",    accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Office & Business",href: "/outfits/occasion/office",  accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Classic Style",    href: "/outfits/style/classic",    accent: "bg-gray-100",  accentText: "text-gray-700"  },
    ],
    faqs: [
      {
        q: "How do you layer winter outfits correctly?",
        a: "Start with a thin base layer (turtleneck, thermal shirt), add a warming middle layer (knit sweater, wool vest) and finish with a coat or jacket. This keeps the look stylish and you can adjust layers depending on the temperature.",
      },
      {
        q: "Which coats are trending in winter 2025/2026?",
        a: "Oversized wool coats in camel and dark green, structured teddy coats and fitted midi coats are the big winter trends. Puffer coats in muted tones like navy, black and olive also remain a reliable everyday companion.",
      },
      {
        q: "Which shoes pair with winter outfits?",
        a: "Chelsea boots and knee-high boots are the most versatile winter companions. Chunky loafers with thick socks give the look a modern touch. For elegant occasions, black ankle boots with a heel are a timeless choice.",
      },
    ],
    seo: {
      title: "Winter Outfits 2025 – Warm Looks for Cold Days",
      description:
        "Discover curated winter outfits 2025: elegant coats, cozy knitwear combinations and stylish layering looks for every occasion – from everyday to evening.",
      keywords: ["Winter Outfits", "Winter Look 2025", "Winter Coat Outfit", "Layering Look", "Knitwear Outfit", "Winter Fashion", "Cozy Outfit", "Winter Style"],
    },
  },

  "autumn": {
    label: "Autumn Looks",
    subtitle: "Autumn 2025",
    description:
      "Earth tones, crisp transition looks and elegant trench coats – discover curated autumn outfits for every style and every day.",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    tipTitle: "Earth tones, warm textures,",
    tipBody:
      "The perfect autumn look lives through layering, a rich color palette and the right coat.",
    tipTags: ["Trench", "Earth Tones", "Boots", "Layering"],
    filters: ["All", "Trench", "Knitwear", "Denim", "Casual", "Elegant", "Layering"],
    outfitGridLabel: "Latest Autumn Looks",
    styleGuideHref: "/blog/seasonal-guides/autumn-style-guide",
    stats: [
      { value: "70+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Camel Trench Coat",      subtitle: "City & Everyday",    tag: "Trending", style: "Trench",   image: "/outfits/sfold.png", href: "/outfits/camel-trench-coat"      },
      { id: 2, title: "Rust Knit & Jeans",      subtitle: "Casual & Weekend",   tag: "Popular",  style: "Knitwear", image: "/outfits/sfold.png", href: "/outfits/rust-knit-jeans"        },
      { id: 3, title: "Olive Cargo Look",        subtitle: "Street & Urban",     tag: "New",      style: "Casual",   image: "/outfits/sfold.png", href: "/outfits/olive-cargo-look"       },
      { id: 4, title: "Plaid Blazer Outfit",     subtitle: "Office & Business",  tag: "Trending", style: "Elegant",  image: "/outfits/sfold.png", href: "/outfits/plaid-blazer-outfit"    },
      { id: 5, title: "Denim Layer Look",        subtitle: "Casual & Modern",    tag: "Popular",  style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/denim-layer-look"       },
      { id: 6, title: "Brown Leather Jacket",    subtitle: "Street & Leisure",   tag: "New",      style: "Layering", image: "/outfits/sfold.png", href: "/outfits/brown-leather-jacket"   },
      { id: 7, title: "Midi Skirt & Boots",      subtitle: "Elegant & Chic",     tag: "Trending", style: "Elegant",  image: "/outfits/sfold.png", href: "/outfits/midi-skirt-boots"       },
      { id: 8, title: "Oversized Blazer Look",   subtitle: "Business Casual",    tag: "New",      style: "Trench",   image: "/outfits/sfold.png", href: "/outfits/oversized-blazer-look"  },
    ],
    relatedCategories: [
      { label: "Winter Outfits", href: "/outfits/season/winter",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Spring Looks",   href: "/outfits/season/spring",    accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Boho Style",     href: "/outfits/style/boho",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Classic Style",  href: "/outfits/style/classic",    accent: "bg-gray-100",  accentText: "text-gray-700"  },
    ],
    faqs: [
      {
        q: "What colors are trending in autumn 2025?",
        a: "Earth tones like camel, rust brown, olive green and dark red dominate the autumn 2025 palette. Muted neutrals like greige and dark grey serve as versatile base colors.",
      },
      {
        q: "How do you style a trench coat in autumn?",
        a: "A camel trench coat pairs with almost everything: over a simple white shirt and straight-leg jeans for everyday, over a midi dress for elegant occasions, or over a chunky turtleneck sweater for cooler days.",
      },
      {
        q: "Which shoes pair with autumn outfits?",
        a: "Knee-high boots in brown or black are the classic autumn companion. Ankle boots with a block heel give the look a modern touch, while Chelsea boots are a versatile everyday option.",
      },
    ],
    seo: {
      title: "Autumn Outfits 2025 – Looks for the Golden Season",
      description:
        "Discover curated autumn outfits 2025: trench coats, earth tone combinations, layering looks and elegant boot outfits for every occasion – from everyday to evening.",
      keywords: ["Autumn Outfits", "Autumn Look 2025", "Trench Coat Outfit", "Autumn Fashion", "Earth Tones Outfit", "Layering Autumn", "Autumn Style", "Transitional Outfit"],
    },
  },

  "spring": {
    label: "Spring Looks",
    subtitle: "Spring 2026",
    description:
      "Pastel tones, light blazers and fresh combinations – discover curated spring outfits for bright days full of energy.",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    tipTitle: "Fresh colors, light fabrics,",
    tipBody:
      "The perfect spring look brings new energy to your wardrobe – with pastels, linen and floral.",
    tipTags: ["Pastels", "Linen", "Blazer", "Floral"],
    filters: ["All", "Pastels", "Floral", "Blazer", "Linen", "Casual", "Elegant"],
    outfitGridLabel: "Latest Spring Looks",
    styleGuideHref: "/blog/seasonal-guides/spring-style-guide",
    stats: [
      { value: "65+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Pastel Blazer Set",       subtitle: "Office & Chic",       tag: "Trending", style: "Blazer",  image: "/outfits/sfold.png", href: "/outfits/pastel-blazer-set"      },
      { id: 2, title: "Floral Midi Dress",        subtitle: "Everyday & Leisure",  tag: "Popular",  style: "Floral",  image: "/outfits/sfold.png", href: "/outfits/floral-midi-dress"      },
      { id: 3, title: "Linen Wide-Leg Pants",     subtitle: "Casual & Modern",     tag: "New",      style: "Linen",   image: "/outfits/sfold.png", href: "/outfits/linen-wide-leg-pants"   },
      { id: 4, title: "White & Sage Combo",       subtitle: "Minimal & Fresh",     tag: "Trending", style: "Pastels", image: "/outfits/sfold.png", href: "/outfits/white-sage-combo"       },
      { id: 5, title: "Denim & Floral Top",       subtitle: "Street & Casual",     tag: "Popular",  style: "Floral",  image: "/outfits/sfold.png", href: "/outfits/denim-floral-top"       },
      { id: 6, title: "Mint Trench Look",         subtitle: "City & Business",     tag: "New",      style: "Blazer",  image: "/outfits/sfold.png", href: "/outfits/mint-trench-look"       },
      { id: 7, title: "Lilac Knit Dress",         subtitle: "Elegant & Soft",      tag: "Trending", style: "Pastels", image: "/outfits/sfold.png", href: "/outfits/lilac-knit-dress"       },
      { id: 8, title: "Striped Linen Shirt Look", subtitle: "Weekend & Outdoor",   tag: "New",      style: "Linen",   image: "/outfits/sfold.png", href: "/outfits/striped-linen-shirt"    },
    ],
    relatedCategories: [
      { label: "Summer Dresses", href: "/outfits/season/summer",    accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Autumn Looks",   href: "/outfits/season/autumn",    accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Boho Style",     href: "/outfits/style/boho",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Beach Looks",    href: "/outfits/occasion/beach",   accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "What colors are trending in spring 2026?",
        a: "Soft pastels like mint green, lilac, baby blue and pale pink dominate spring 2026. Fresh neutrals like off-white and light beige serve as an elegant base.",
      },
      {
        q: "How do you style a spring blazer?",
        a: "A pastel blazer works over solid-color trousers for an office look, over a light floral dress for a feminine touch, or with jeans and a white tee for a casual-chic everyday look.",
      },
      {
        q: "Which shoes pair with spring outfits?",
        a: "White sneakers are the most versatile spring companion. Loafers in nude or pastel add an elegant touch, while flat sandals are the first choice on warmer spring days.",
      },
    ],
    seo: {
      title: "Spring Outfits 2026 – Fresh Looks for Bright Days",
      description:
        "Discover curated spring outfits 2026: pastel blazers, floral dresses, linen combinations and light layering looks for every occasion – from everyday to evening.",
      keywords: ["Spring Outfits", "Spring Look 2026", "Pastel Outfit", "Spring Fashion", "Linen Outfit", "Blazer Outfit Spring", "Spring Style", "Floral Dress"],
    },
  },
};

// ─── Static Params (SSG) ──────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(seasons).map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const season = seasons[slug];
  if (!season) return {};

  return {
    title: season.seo.title,
    description: season.seo.description,
    keywords: season.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/season/${slug}` },
    openGraph: {
      title: `${season.seo.title} | STYLEFINDEN`,
      description: season.seo.description,
      url: `https://stylefinden.com/outfits/season/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tagColors: Record<string, string> = {
  Trending: "bg-black text-white",
  New:      "bg-white text-black border border-black",
  Popular:  "bg-gray-100 text-gray-700",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SeasonPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const season = seasons[slug];

  if (!season) notFound();

  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-6 pb-0">
        <nav className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors duration-200">Home</a>
          <span>/</span>
          <a href="/outfits" className="hover:text-black transition-colors duration-200">Outfits</a>
          <span>/</span>
          <a href="/outfits/season" className="hover:text-black transition-colors duration-200">Season</a>
          <span>/</span>
          <span className="text-black">{season.label}</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className={`text-xs font-semibold tracking-widest uppercase ${season.accentText}`}>
                {season.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                {season.label} <br />
                <span className="italic font-light">Outfits & Looks</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                {season.description}
              </p>

              <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
                {season.stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-8">
                    {i > 0 && <div className="w-px h-8 bg-gray-200" />}
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-black">{stat.value}</span>
                      <span className="text-xs tracking-widest uppercase text-gray-400">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Card */}
            <div className={`hidden md:flex flex-col gap-3 ${season.accent} p-8 xl:p-10 w-full md:w-80 xl:w-96 flex-shrink-0`}>
              <span className={`text-xs font-semibold tracking-widest uppercase ${season.accentText}`}>
                Style Tip
              </span>
              <p className="text-sm md:text-base font-black text-black leading-snug tracking-tight">
                {season.tipTitle}<br />
                <span className="italic font-light">timeless elegance.</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">{season.tipBody}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {season.tipTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Style Filter ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mr-2">
              Filter:
            </span>
            {season.filters.map((filter, i) => (
              <a
                key={filter}
                href={i === 0
                  ? `/outfits/season/${slug}`
                  : `/outfits/season/${slug}?style=${filter.toLowerCase()}`}
                className={[
                  "px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200",
                  i === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white",
                ].join(" ")}
              >
                {filter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outfit Grid ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Curated Selection
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                {season.outfitGridLabel}
              </h2>
            </div>
            <a
              href="/outfits"
              className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group"
            >
              All Outfits
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {season.outfits.map((outfit, index) => (
              <a key={outfit.id} href={outfit.href} className="group flex flex-col gap-3">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <img
                    src={outfit.image}
                    alt={`${outfit.title} – ${outfit.subtitle}`}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top
                               transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${tagColors[outfit.tag]}`}>
                      {outfit.tag}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${season.accent} ${season.accentText}`}>
                      {outfit.style}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-0.5 px-0.5">
                  <h3 className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200">
                    {outfit.title}
                  </h3>
                  <p className="text-xs tracking-widest uppercase text-gray-400">{outfit.subtitle}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href={`/outfits?season=${slug}`}
              className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
            >
              Load More {season.label}
            </a>
          </div>

        </div>
      </section>

      {/* ── Related Categories ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              You Might Also Like
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
              Similar Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {season.relatedCategories.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className={`group flex flex-col justify-between gap-6 p-6 md:p-8 ${cat.accent} hover:opacity-90 transition-opacity duration-200`}
              >
                <span className={`text-xs font-semibold tracking-widest uppercase ${cat.accentText}`}>
                  Discover
                </span>
                <div className="flex items-end justify-between">
                  <h3 className="text-sm md:text-base font-black text-black tracking-tight leading-tight">
                    {cat.label}
                  </h3>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 stroke-current text-black opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 ml-2"
                    fill="none"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ── SEO / FAQ ── */}
      <section className="w-full border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">

            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Style Guide
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                {season.label} <span className="italic font-light">find & style</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{season.description}</p>
              <a
                href={season.styleGuideHref}
                className="self-start flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-600 transition-colors duration-200 group"
              >
                View Style Guide
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Frequently Asked Questions
              </span>
              {season.faqs.map((faq, i) => (
                <div key={i} className="flex flex-col gap-2 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                  <h3 className="text-sm font-black text-black tracking-tight">{faq.q}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

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

type StyleData = {
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

const styles: Record<string, StyleData> = {
  "boho": {
    label: "Boho Style",
    subtitle: "Free & Playful",
    description:
      "Flowing fabrics, fringe, earthy tones and feminine details – discover curated boho outfits for those who live by their own rhythm.",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    tipTitle: "Flowing, free and feminine,",
    tipBody:
      "Boho lives through layering, natural materials and a touch of romance – from festival to city stroll.",
    tipTags: ["Fringe", "Linen", "Maxi", "Floral"],
    filters: ["All", "Maxi", "Midi", "Floral", "Fringe", "Festival", "Casual"],
    outfitGridLabel: "Latest Boho Looks",
    styleGuideHref: "/blog/occasion-guides/boho-style-guide",
    stats: [
      { value: "55+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Floral Wrap Maxi",       subtitle: "Festival & Nature",    tag: "Trending", style: "Maxi",    image: "/outfits/sfold.png", href: "/outfits/floral-wrap-maxi"      },
      { id: 2, title: "Fringe Vest & Jeans",    subtitle: "Street & Casual",      tag: "Popular",  style: "Fringe",  image: "/outfits/sfold.png", href: "/outfits/fringe-vest-jeans"     },
      { id: 3, title: "Linen Boho Dress",       subtitle: "Beach & Vacation",     tag: "New",      style: "Linen",   image: "/outfits/sfold.png", href: "/outfits/linen-boho-dress"      },
      { id: 4, title: "Embroidered Midi",       subtitle: "Romantic & Soft",      tag: "Trending", style: "Midi",    image: "/outfits/sfold.png", href: "/outfits/embroidered-midi"      },
      { id: 5, title: "Crochet Top & Skirt",    subtitle: "Summer & Festival",    tag: "Popular",  style: "Floral",  image: "/outfits/sfold.png", href: "/outfits/crochet-top-skirt"     },
      { id: 6, title: "Boho Layer Look",        subtitle: "Autumn & Nature",      tag: "New",      style: "Fringe",  image: "/outfits/sfold.png", href: "/outfits/boho-layer-look"       },
      { id: 7, title: "Paisley Print Dress",    subtitle: "Casual & Playful",     tag: "Trending", style: "Maxi",    image: "/outfits/sfold.png", href: "/outfits/paisley-print-dress"   },
      { id: 8, title: "Earthy Boho Set",        subtitle: "Earth Tones & Nature", tag: "New",      style: "Casual",  image: "/outfits/sfold.png", href: "/outfits/earthy-boho-set"       },
    ],
    relatedCategories: [
      { label: "Summer Dresses", href: "/outfits/season/summer",      accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Festival Style", href: "/outfits/occasion/festival",  accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Minimalist",     href: "/outfits/style/minimalist",   accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Beach Looks",    href: "/outfits/occasion/beach",     accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "What defines a boho look?",
        a: "Boho style is characterized by flowing fabrics, earthy tones, fringe, embroidery and natural materials like linen and cotton. Layering is a key element – vests over dresses, scarves and multiple jewelry pieces combined.",
      },
      {
        q: "How do you style boho for everyday wear?",
        a: "For an everyday boho look: a floral midi dress with white sneakers and a rattan bag. Or wide linen trousers with an embroidered top and flat sandals. The key is not to combine too many elements at once.",
      },
      {
        q: "Which accessories suit the boho style?",
        a: "Rattan and wicker bags, feather jewelry, turquoise rings, leather belts with details, sun hats and flat leather sandals are the perfect boho companions. Layering necklaces and bracelets rounds off the look.",
      },
    ],
    seo: {
      title: "Boho Style Outfits – Free, Feminine & Playful",
      description:
        "Discover curated boho outfits: flowing maxi dresses, fringe looks, linen combinations and feminine details for festival, everyday and beach.",
      keywords: ["Boho Outfit", "Boho Style", "Boho Dress", "Festival Outfit", "Boho Look", "Fringe Outfit", "Bohemian Style", "Boho Summer"],
    },
  },

  "minimalist": {
    label: "Minimalist Style",
    subtitle: "Clean & Timeless",
    description:
      "Clean lines, neutral tones and high-quality basics – discover curated minimalist outfits for those who understand that less is more.",
    accent: "bg-gray-100",
    accentText: "text-gray-700",
    tipTitle: "Less is more,",
    tipBody:
      "Minimalist style thrives on perfect fit, high-quality materials and a reduced color palette.",
    tipTags: ["Neutral", "Clean", "Basics", "Monochrome"],
    filters: ["All", "Monochrome", "Neutral", "Business", "Casual", "Elegant", "Basics"],
    outfitGridLabel: "Latest Minimalist Looks",
    styleGuideHref: "/blog/occasion-guides/minimalist-style-guide",
    stats: [
      { value: "60+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "All White Look",          subtitle: "Clean & Modern",     tag: "Trending", style: "Monochrome", image: "/outfits/sfold.png", href: "/outfits/all-white-look"         },
      { id: 2, title: "Beige Linen Set",          subtitle: "Casual & Elegant",   tag: "Popular",  style: "Neutral",   image: "/outfits/sfold.png", href: "/outfits/beige-linen-set"        },
      { id: 3, title: "Black Straight Trousers",  subtitle: "Office & Business",  tag: "New",      style: "Business",  image: "/outfits/sfold.png", href: "/outfits/black-straight-trousers"},
      { id: 4, title: "Grey Oversized Blazer",    subtitle: "Smart Casual",       tag: "Trending", style: "Business",  image: "/outfits/sfold.png", href: "/outfits/grey-oversized-blazer"  },
      { id: 5, title: "Cream Knit & Trousers",   subtitle: "Cozy & Minimal",     tag: "Popular",  style: "Neutral",   image: "/outfits/sfold.png", href: "/outfits/cream-knit-trousers"    },
      { id: 6, title: "Minimal Slip Dress",       subtitle: "Evening & Event",    tag: "New",      style: "Elegant",   image: "/outfits/sfold.png", href: "/outfits/minimal-slip-dress"     },
      { id: 7, title: "White Shirt & Denim",      subtitle: "Everyday Basics",    tag: "Trending", style: "Basics",    image: "/outfits/sfold.png", href: "/outfits/white-shirt-denim"      },
      { id: 8, title: "Monochrome Brown Set",     subtitle: "Warm & Simple",      tag: "New",      style: "Monochrome",image: "/outfits/sfold.png", href: "/outfits/monochrome-brown-set"   },
    ],
    relatedCategories: [
      { label: "Classic Style",    href: "/outfits/style/classic",     accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Office & Business",href: "/outfits/occasion/office",   accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Boho Style",       href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Autumn Looks",     href: "/outfits/season/autumn",     accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
    ],
    faqs: [
      {
        q: "What are the basic rules of minimalist style?",
        a: "Minimalist style is based on a neutral color palette (black, white, beige, grey), clean silhouettes without elaborate details, high-quality basics and the principle that every piece should be combinable with everything else.",
      },
      {
        q: "What basics do you need for a minimalist wardrobe?",
        a: "A well-cut blazer in black or camel, a white Oxford shirt, a cashmere or merino turtleneck, a beige trench coat, a structured blazer and a simple midi dress form the perfect minimalist foundation.",
      },
      {
        q: "How do you add interest to minimalist outfits?",
        a: "Texture play is the key: silk next to linen texture, leather accessories with wool knitwear, or shiny details with matte fabrics. Silhouette also counts – an oversized blazer over slim trousers creates tension without color.",
      },
    ],
    seo: {
      title: "Minimalist Style Outfits – Clean, Simple & Timeless",
      description:
        "Discover curated minimalist outfits: monochrome looks, neutral color combinations and timeless basics for everyday, office and special occasions.",
      keywords: ["Minimalist Outfit", "Minimalist Style", "Clean Style", "Neutral Outfit", "Monochrome Look", "Minimalist Fashion", "Simple Elegant", "Capsule Wardrobe"],
    },
  },

  "streetstyle": {
    label: "Street Style",
    subtitle: "Urban & Bold",
    description:
      "Bold combinations, denim, oversized pieces and urban energy – discover curated street style outfits for those who want to stand out.",
    accent: "bg-gray-900",
    accentText: "text-white",
    tipTitle: "Bold, urban and distinctive,",
    tipBody:
      "Street style lives through creative combinations, statement pieces and the freedom to break the rules.",
    tipTags: ["Denim", "Oversized", "Sneaker", "Graphic"],
    filters: ["All", "Denim", "Oversized", "Sporty", "Graphic", "Layering", "Bold"],
    outfitGridLabel: "Latest Street Looks",
    styleGuideHref: "/blog/occasion-guides/streetstyle-guide",
    stats: [
      { value: "65+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Baggy Denim & Crop Top",  subtitle: "Urban & Casual",     tag: "Trending", style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/baggy-denim-crop-top"   },
      { id: 2, title: "Oversized Hoodie Look",   subtitle: "Cozy & Street",      tag: "Popular",  style: "Oversized",image: "/outfits/sfold.png", href: "/outfits/oversized-hoodie-look"  },
      { id: 3, title: "Graphic Tee & Blazer",    subtitle: "Smart Street",       tag: "New",      style: "Graphic",  image: "/outfits/sfold.png", href: "/outfits/graphic-tee-blazer"     },
      { id: 4, title: "Cargo Pants Outfit",      subtitle: "Utility & Urban",    tag: "Trending", style: "Bold",     image: "/outfits/sfold.png", href: "/outfits/cargo-pants-outfit"     },
      { id: 5, title: "Leather Jacket & Jeans",  subtitle: "Classic Street",     tag: "Popular",  style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/leather-jacket-jeans"   },
      { id: 6, title: "Sporty Layered Set",      subtitle: "Athleisure & City",  tag: "New",      style: "Sporty",   image: "/outfits/sfold.png", href: "/outfits/sporty-layered-set"     },
      { id: 7, title: "Wide Leg & Tank",         subtitle: "Minimal Street",     tag: "Trending", style: "Oversized",image: "/outfits/sfold.png", href: "/outfits/wide-leg-tank"          },
      { id: 8, title: "Denim-on-Denim",          subtitle: "Bold & Modern",      tag: "New",      style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/denim-on-denim"         },
    ],
    relatedCategories: [
      { label: "Boho Style",    href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Minimalist",    href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Festival Style",href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Autumn Looks",  href: "/outfits/season/autumn",     accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
    ],
    faqs: [
      {
        q: "What is street style?",
        a: "Street style is a fashion style that emerged from everyday life, combining high fashion with personal expression. It is characterized by denim, sneakers, oversized pieces, graphic prints and bold color combinations – often shaped by streetwear brands and urban culture.",
      },
      {
        q: "How do you combine street style for work?",
        a: "A graphic tee under a structured blazer, paired with well-fitting straight jeans and loafers – that's the perfect smart-street office look. Statement sneakers in neutral tones also work in many modern workplaces.",
      },
      {
        q: "Which sneakers suit street style outfits?",
        a: "Chunky sneakers (dad shoes) add volume to any look. Clean white sneakers like the Air Force 1 are timeless classics. Low-top models in black or grey complement minimal street looks, while colorblocking sneakers make bold statements.",
      },
    ],
    seo: {
      title: "Street Style Outfits – Urban, Bold & Distinctive",
      description:
        "Discover curated street style outfits: denim looks, oversized pieces, cargo outfits and urban combinations for those who live fashion as expression.",
      keywords: ["Street Style Outfit", "Streetwear", "Urban Outfit", "Denim Look", "Oversized Outfit", "Streetstyle Fashion", "Bold Outfit", "Sneaker Outfit"],
    },
  },

  "classic": {
    label: "Classic Style",
    subtitle: "Timeless & Elegant",
    description:
      "Tailoring, high-quality basics and looks that never go out of fashion – discover curated classic style outfits for women who embrace timeless elegance.",
    accent: "bg-[#fafafa]",
    accentText: "text-gray-900",
    tipTitle: "Timeless elegance, perfect tailoring,",
    tipBody:
      "Classic style invests in quality, not quantity – every piece is a long-term companion.",
    tipTags: ["Blazer", "Trench", "Tailoring", "Neutral"],
    filters: ["All", "Blazer", "Trench", "Tailoring", "Business", "Evening", "Casual"],
    outfitGridLabel: "Latest Classic Looks",
    styleGuideHref: "/blog/occasion-guides/classic-style-guide",
    stats: [
      { value: "70+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Camel Blazer & Trousers", subtitle: "Office & Chic",      tag: "Trending", style: "Blazer",    image: "/outfits/sfold.png", href: "/outfits/camel-blazer-trousers"  },
      { id: 2, title: "Navy & White Stripes",    subtitle: "Smart Casual",       tag: "Popular",  style: "Casual",    image: "/outfits/sfold.png", href: "/outfits/navy-white-stripes"     },
      { id: 3, title: "Wrap Coat Outfit",        subtitle: "City & Business",    tag: "New",      style: "Trench",    image: "/outfits/sfold.png", href: "/outfits/wrap-coat-outfit"       },
      { id: 4, title: "Little Black Dress",      subtitle: "Evening & Event",    tag: "Trending", style: "Evening",   image: "/outfits/sfold.png", href: "/outfits/little-black-dress"     },
      { id: 5, title: "Pencil Skirt & Blouse",   subtitle: "Office & Elegant",   tag: "Popular",  style: "Business",  image: "/outfits/sfold.png", href: "/outfits/pencil-skirt-blouse"    },
      { id: 6, title: "Trench & Straight Jeans", subtitle: "Weekend & City",     tag: "New",      style: "Trench",    image: "/outfits/sfold.png", href: "/outfits/trench-straight-jeans"  },
      { id: 7, title: "Pearl & Silk Blouse",     subtitle: "Elegant & Feminine", tag: "Trending", style: "Evening",   image: "/outfits/sfold.png", href: "/outfits/pearl-silk-blouse"      },
      { id: 8, title: "Grey Suit Set",           subtitle: "Power & Profession", tag: "New",      style: "Tailoring", image: "/outfits/sfold.png", href: "/outfits/grey-suit-set"          },
    ],
    relatedCategories: [
      { label: "Minimalist",      href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Office & Business",href: "/outfits/occasion/office",  accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Winter Outfits",  href: "/outfits/season/winter",     accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Evening & Event", href: "/outfits/occasion/evening",  accent: "bg-gray-900",  accentText: "text-white"     },
    ],
    faqs: [
      {
        q: "What are the core pieces of a classic wardrobe?",
        a: "A well-cut blazer in black or camel, a white shirt, a tailored black trouser, a trench coat, a simple black dress and high-quality pumps or loafers form the unshakeable foundation of classic style.",
      },
      {
        q: "How do you modernize classic outfits?",
        a: "Classic pieces can be refreshed with contemporary details: chunky loafers instead of pointed pumps, an oversized blazer instead of a fitted cut, or the classic black dress paired with white sneakers. Subtle updates keep the look fresh.",
      },
      {
        q: "What colors belong to classic style?",
        a: "Black, white, navy, camel, grey and cream are the timeless classics. Add occasional accents in bordeaux, dark green or cobalt blue. The strength lies in the neutral base – it allows endless combinations.",
      },
    ],
    seo: {
      title: "Classic Style Outfits – Timeless, Elegant & Distinctive",
      description:
        "Discover curated classic style outfits: blazer looks, trench coats, evening outfits and timeless combinations for women who embrace lasting elegance.",
      keywords: ["Classic Style Outfit", "Classic Elegant Outfit", "Timeless Outfit", "Blazer Outfit", "Trench Coat Look", "Business Outfit Women", "Classic Fashion", "Elegant Outfit"],
    },
  },
};

// ─── Static Params (SSG) ──────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(styles).map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const styleData = styles[slug];
  if (!styleData) return {};

  return {
    title: styleData.seo.title,
    description: styleData.seo.description,
    keywords: styleData.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/style/${slug}` },
    openGraph: {
      title: `${styleData.seo.title} | STYLEFINDEN`,
      description: styleData.seo.description,
      url: `https://stylefinden.com/outfits/style/${slug}`,
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

export default async function StylePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const styleData = styles[slug];

  if (!styleData) notFound();

  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-6 pb-0">
        <nav className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors duration-200">Home</a>
          <span>/</span>
          <a href="/outfits" className="hover:text-black transition-colors duration-200">Outfits</a>
          <span>/</span>
          <a href="/outfits/style" className="hover:text-black transition-colors duration-200">Style</a>
          <span>/</span>
          <span className="text-black">{styleData.label}</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className={`text-xs font-semibold tracking-widest uppercase ${styleData.accentText === "text-white" ? "text-gray-400" : styleData.accentText}`}>
                {styleData.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                {styleData.label} <br />
                <span className="italic font-light">Outfits & Looks</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                {styleData.description}
              </p>
              <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
                {styleData.stats.map((stat, i) => (
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
            <div className={`hidden md:flex flex-col gap-3 ${styleData.accent} border border-gray-100 p-8 xl:p-10 w-full md:w-80 xl:w-96 flex-shrink-0`}>
              <span className={`text-xs font-semibold tracking-widest uppercase ${styleData.accentText === "text-white" ? "text-gray-500" : styleData.accentText}`}>
                Style Tip
              </span>
              <p className="text-sm md:text-base font-black text-black leading-snug tracking-tight">
                {styleData.tipTitle}<br />
                <span className="italic font-light">for every day.</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">{styleData.tipBody}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {styleData.tipTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Filter ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mr-2">
              Filter:
            </span>
            {styleData.filters.map((filter, i) => (
              <a
                key={filter}
                href={i === 0 ? `/outfits/style/${slug}` : `/outfits/style/${slug}?filter=${filter.toLowerCase()}`}
                className={[
                  "px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200",
                  i === 0 ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white",
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
                {styleData.outfitGridLabel}
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
            {styleData.outfits.map((outfit, index) => (
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
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${styleData.accent} ${styleData.accentText === "text-white" ? "text-gray-700 bg-gray-100" : styleData.accentText}`}>
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
              href={`/outfits?style=${slug}`}
              className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
            >
              Load More {styleData.label}
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
            {styleData.relatedCategories.map((cat) => (
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
                {styleData.label} <span className="italic font-light">understand & style</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{styleData.description}</p>
              <a
                href={styleData.styleGuideHref}
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
              {styleData.faqs.map((faq, i) => (
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

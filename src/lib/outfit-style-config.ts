// Tüm style verilerinin tek kaynağı — style/[slug]/page.tsx bu dosyadan okur.
import type { CategoryData, OutfitItem } from "@/types/outfit-category"
import type { CollectionItem } from "@/components/shared/CollectionCard"

export type StyleConfig = Omit<CategoryData, "outfits"> & {
  card: { description: string; tags: string[]; badge?: string }
  staticFallback?: OutfitItem[]
}

// Slug'u "Street Style" formatına çevirir
function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

// Bilinmeyen slug için generic config üretir
export function makeDefaultStyleConfig(slug: string): StyleConfig {
  const label = slugToLabel(slug)
  return {
    label,
    subtitle: "Curated Looks",
    description: `Discover curated ${label.toLowerCase()} outfit collections.`,
    accent: "bg-gray-100",
    accentText: "text-gray-700",
    tipTitle: "Style tip,",
    tipBody: "Find pieces that express your personality and fit well.",
    tipTags: ["Outfit", "Style", "Look"],
    filters: ["All"],
    outfitGridLabel: `Latest ${label} Looks`,
    styleGuideHref: `/blog/occasion-guides/${slug}-style-guide`,
    stats: [
      { value: "—", label: "Looks" },
      { value: "—", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [],
    faqs: [],
    seo: {
      title: `${label} Outfits – Curated Looks`,
      description: `Discover curated ${label.toLowerCase()} outfit collections.`,
      keywords: [`${label} Outfit`, `${label} Look`, `${label} Style`],
    },
    card: {
      description: `Curated ${label.toLowerCase()} outfit collections.`,
      tags: ["Outfit", "Style"],
      badge: "New",
    },
  }
}

// Config veya default döndürür — notFound() çağrılmaz
export function getStyleConfig(slug: string): StyleConfig {
  return STYLE_CONFIGS[slug] ?? makeDefaultStyleConfig(slug)
}

// CollectionCard için CollectionItem döndürür
export function getStyleCard(slug: string): CollectionItem {
  const cfg = getStyleConfig(slug)
  return {
    slug,
    label: cfg.label,
    description: cfg.card.description,
    tags: cfg.card.tags,
    badge: cfg.card.badge ?? "New",
    accent: cfg.accent,
    accentText: cfg.accentText,
    active: true,
  }
}

// Koleksiyon sayfalarında görüntülenme sırası
export const STYLE_ORDER = ["boho", "minimalist", "streetstyle", "classic"]

// Tüm style config'leri
export const STYLE_CONFIGS: Record<string, StyleConfig> = {
  boho: {
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
    relatedCategories: [
      { label: "Summer Dresses", href: "/outfits/season/summer",     accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Festival Style", href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Minimalist",     href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Beach Looks",    href: "/outfits/occasion/beach",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
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
    card: {
      description: "Flowing fabrics, fringe & earthy tones",
      tags: ["Maxi", "Floral", "Fringe", "Linen"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Floral Wrap Maxi",    subtitle: "Festival & Nature",    tag: "Trending", style: "Maxi",   href: "/outfits/floral-wrap-maxi"      },
      { id: 2, title: "Fringe Vest & Jeans", subtitle: "Street & Casual",      tag: "Popular",  style: "Fringe", href: "/outfits/fringe-vest-jeans"     },
      { id: 3, title: "Linen Boho Dress",    subtitle: "Beach & Vacation",     tag: "New",      style: "Linen",  href: "/outfits/linen-boho-dress"      },
      { id: 4, title: "Embroidered Midi",    subtitle: "Romantic & Soft",      tag: "Trending", style: "Midi",   href: "/outfits/embroidered-midi"      },
      { id: 5, title: "Crochet Top & Skirt", subtitle: "Summer & Festival",    tag: "Popular",  style: "Floral", href: "/outfits/crochet-top-skirt"     },
      { id: 6, title: "Boho Layer Look",     subtitle: "Autumn & Nature",      tag: "New",      style: "Fringe", href: "/outfits/boho-layer-look"       },
      { id: 7, title: "Paisley Print Dress", subtitle: "Casual & Playful",     tag: "Trending", style: "Maxi",   href: "/outfits/paisley-print-dress"   },
      { id: 8, title: "Earthy Boho Set",     subtitle: "Earth Tones & Nature", tag: "New",      style: "Casual", href: "/outfits/earthy-boho-set"       },
    ],
  },

  minimalist: {
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
    relatedCategories: [
      { label: "Classic Style",     href: "/outfits/style/classic",   accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Office & Business", href: "/outfits/occasion/office", accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Boho Style",        href: "/outfits/style/boho",      accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Autumn Looks",      href: "/outfits/season/autumn",   accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
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
    card: {
      description: "Clean, simple and timelessly elegant",
      tags: ["Neutral", "Monochrome", "Basics", "Clean"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "All White Look",          subtitle: "Clean & Modern",    tag: "Trending", style: "Monochrome", href: "/outfits/all-white-look"          },
      { id: 2, title: "Beige Linen Set",          subtitle: "Casual & Elegant",  tag: "Popular",  style: "Neutral",    href: "/outfits/beige-linen-set"         },
      { id: 3, title: "Black Straight Trousers",  subtitle: "Office & Business", tag: "New",      style: "Business",   href: "/outfits/black-straight-trousers" },
      { id: 4, title: "Grey Oversized Blazer",    subtitle: "Smart Casual",      tag: "Trending", style: "Business",   href: "/outfits/grey-oversized-blazer"   },
      { id: 5, title: "Cream Knit & Trousers",    subtitle: "Cozy & Minimal",    tag: "Popular",  style: "Neutral",    href: "/outfits/cream-knit-trousers"     },
      { id: 6, title: "Minimal Slip Dress",       subtitle: "Evening & Event",   tag: "New",      style: "Elegant",    href: "/outfits/minimal-slip-dress"      },
      { id: 7, title: "White Shirt & Denim",      subtitle: "Everyday Basics",   tag: "Trending", style: "Basics",     href: "/outfits/white-shirt-denim"       },
      { id: 8, title: "Monochrome Brown Set",     subtitle: "Warm & Simple",     tag: "New",      style: "Monochrome", href: "/outfits/monochrome-brown-set"    },
    ],
  },

  streetstyle: {
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
    relatedCategories: [
      { label: "Boho Style",     href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Minimalist",     href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Festival Style", href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Autumn Looks",   href: "/outfits/season/autumn",     accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
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
    card: {
      description: "Urban, bold and always on trend",
      tags: ["Denim", "Oversized", "Graphic", "Sneaker"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Baggy Denim & Crop Top", subtitle: "Urban & Casual",    tag: "Trending", style: "Denim",     href: "/outfits/baggy-denim-crop-top"   },
      { id: 2, title: "Oversized Hoodie Look",  subtitle: "Cozy & Street",     tag: "Popular",  style: "Oversized", href: "/outfits/oversized-hoodie-look"  },
      { id: 3, title: "Graphic Tee & Blazer",   subtitle: "Smart Street",      tag: "New",      style: "Graphic",   href: "/outfits/graphic-tee-blazer"     },
      { id: 4, title: "Cargo Pants Outfit",     subtitle: "Utility & Urban",   tag: "Trending", style: "Bold",      href: "/outfits/cargo-pants-outfit"     },
      { id: 5, title: "Leather Jacket & Jeans", subtitle: "Classic Street",    tag: "Popular",  style: "Denim",     href: "/outfits/leather-jacket-jeans"   },
      { id: 6, title: "Sporty Layered Set",     subtitle: "Athleisure & City", tag: "New",      style: "Sporty",    href: "/outfits/sporty-layered-set"     },
      { id: 7, title: "Wide Leg & Tank",        subtitle: "Minimal Street",    tag: "Trending", style: "Oversized", href: "/outfits/wide-leg-tank"          },
      { id: 8, title: "Denim-on-Denim",         subtitle: "Bold & Modern",     tag: "New",      style: "Denim",     href: "/outfits/denim-on-denim"         },
    ],
  },

  classic: {
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
    relatedCategories: [
      { label: "Minimalist",        href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Office & Business", href: "/outfits/occasion/office",   accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Winter Outfits",    href: "/outfits/season/winter",     accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Evening & Event",   href: "/outfits/occasion/evening",  accent: "bg-gray-900",  accentText: "text-white"     },
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
    card: {
      description: "Timeless basics with a modern twist",
      tags: ["Blazer", "Trench", "Tailoring", "Neutral"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Camel Blazer & Trousers",subtitle: "Office & Chic",      tag: "Trending", style: "Blazer",    href: "/outfits/camel-blazer-trousers"  },
      { id: 2, title: "Navy & White Stripes",   subtitle: "Smart Casual",       tag: "Popular",  style: "Casual",    href: "/outfits/navy-white-stripes"     },
      { id: 3, title: "Wrap Coat Outfit",       subtitle: "City & Business",    tag: "New",      style: "Trench",    href: "/outfits/wrap-coat-outfit"       },
      { id: 4, title: "Little Black Dress",     subtitle: "Evening & Event",    tag: "Trending", style: "Evening",   href: "/outfits/little-black-dress"     },
      { id: 5, title: "Pencil Skirt & Blouse",  subtitle: "Office & Elegant",   tag: "Popular",  style: "Business",  href: "/outfits/pencil-skirt-blouse"    },
      { id: 6, title: "Trench & Straight Jeans",subtitle: "Weekend & City",     tag: "New",      style: "Trench",    href: "/outfits/trench-straight-jeans"  },
      { id: 7, title: "Pearl & Silk Blouse",    subtitle: "Elegant & Feminine", tag: "Trending", style: "Evening",   href: "/outfits/pearl-silk-blouse"      },
      { id: 8, title: "Grey Suit Set",          subtitle: "Power & Profession", tag: "New",      style: "Tailoring", href: "/outfits/grey-suit-set"          },
    ],
  },
}

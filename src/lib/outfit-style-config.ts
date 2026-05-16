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

const STYLE_IMAGES: Record<string, string> = {
  "boho":              "/categories/outfits/boho.png",
  "minimalist":        "/categories/outfits/minimalist.png",
  "streetstyle":       "/categories/outfits/street-style.png",
  "old-money":         "/categories/outfits/old-money.png",
  "retro-vintage":     "/categories/outfits/retro-vintage.png",
  "y2k":               "/categories/outfits/y2k.png",
  "western":           "/categories/outfits/western.png",
  "sienna-vibe":       "/categories/outfits/sienna.webp",
  "black-dark":        "/categories/outfits/black-dark.png",
  "clean-girl":        "/categories/outfits/clean-girl.png",
  "korean-fashion":    "/categories/outfits/korean-fashion.webp",
  "party-night-out":   "/categories/outfits/party-night.webp",
  "cute-coquette":     "/categories/outfits/cute-coquette.webp",
  "spring":            "/categories/outfits/spring.png",
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
    image: STYLE_IMAGES[slug],
  }
}

// Koleksiyon sayfalarında görüntülenme sırası
export const STYLE_ORDER = ["boho", "minimalist", "streetstyle", "classic", "old-money", "retro-vintage", "y2k", "western", "sienna-vibe", "korean-fashion", "clean-girl", "cute-coquette", "black-dark"]

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

  "old-money": {
    label: "Old Money Style",
    subtitle: "Quietly Luxurious",
    description:
      "Tailored polo shirts, heritage knitwear, loafers and a muted navy-camel-cream palette – discover curated old money outfits for those who wear wealth with effortless restraint.",
    accent: "bg-[#f5f0e8]",
    accentText: "text-[#5c4a1e]",
    tipTitle: "Understated luxury speaks loudest,",
    tipBody:
      "Old money style is defined by quality fabrics, impeccable tailoring and a palette that never shouts – invest in fewer, better pieces.",
    tipTags: ["Tailored", "Heritage", "Loafers", "Camel"],
    filters: ["All", "Tailored", "Heritage", "Preppy", "Casual Luxury", "Evening", "Weekend"],
    outfitGridLabel: "Latest Old Money Looks",
    styleGuideHref: "/blog/occasion-guides/old-money-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Classic Style",     href: "/outfits/style/classic",    accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Minimalist",        href: "/outfits/style/minimalist", accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Office & Business", href: "/outfits/occasion/office",  accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Evening & Event",   href: "/outfits/occasion/evening", accent: "bg-gray-900",  accentText: "text-white"     },
    ],
    faqs: [
      {
        q: "What defines the old money aesthetic?",
        a: "Old money style is rooted in quiet luxury: well-tailored pieces in muted tones like navy, cream, camel and ivory, heritage brand staples, polo shirts, loafers and cashmere knitwear. The look communicates wealth through quality and restraint rather than logos or trend-chasing.",
      },
      {
        q: "Which pieces are essential for an old money wardrobe?",
        a: "A navy blazer, cream cable-knit sweater, tailored chinos, a classic polo shirt, a camel or plaid wrap coat, leather loafers and a structured leather bag are the cornerstones. Every piece should be made from natural fabrics – wool, cashmere, linen, cotton.",
      },
      {
        q: "How is old money style different from quiet luxury?",
        a: "Quiet luxury is the modern minimalist take on understated dressing – clean, logo-free, often monochromatic. Old money goes further by incorporating prep school heritage: plaids, argyle, nautical stripes, club blazers and the specific palette of inherited wealth. Think New England sailing club rather than Scandi minimalism.",
      },
    ],
    seo: {
      title: "Old Money Style Outfits – Quiet Luxury & Heritage Looks",
      description:
        "Discover curated old money outfits: tailored blazers, heritage knitwear, loafer looks and muted navy-camel-cream combinations for effortlessly luxurious style.",
      keywords: ["Old Money Outfit", "Quiet Luxury Fashion", "Old Money Aesthetic", "Heritage Style Outfit", "Preppy Outfit Women", "Tailored Luxury Look", "Camel Blazer Outfit", "Old Money Style Stylefinden"],
    },
    card: {
      description: "Tailored, heritage-inspired and quietly luxurious",
      tags: ["Tailored", "Heritage", "Loafers", "Camel"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Navy Blazer & Cream Trousers", subtitle: "Heritage & Elegant",    tag: "Trending", style: "Tailored",        href: "/outfits/navy-blazer-cream-trousers"   },
      { id: 2, title: "Camel Polo & Wide-Leg Pants",  subtitle: "Preppy & Relaxed",      tag: "Popular",  style: "Preppy",          href: "/outfits/camel-polo-wide-leg"          },
      { id: 3, title: "Argyle Knit & Tailored Skirt", subtitle: "Heritage Charm",        tag: "New",      style: "Heritage",        href: "/outfits/argyle-knit-tailored-skirt"  },
      { id: 4, title: "Ivory Cashmere & Loafers",     subtitle: "Quiet Luxury",          tag: "Trending", style: "Casual Luxury",   href: "/outfits/ivory-cashmere-loafers"       },
      { id: 5, title: "Plaid Wrap Coat Outfit",       subtitle: "City & Uptown",         tag: "Popular",  style: "Heritage",        href: "/outfits/plaid-wrap-coat"              },
      { id: 6, title: "Linen Blazer & Chinos",        subtitle: "Country Club Casual",   tag: "New",      style: "Preppy",          href: "/outfits/linen-blazer-chinos"          },
      { id: 7, title: "Striped Oxford & Trousers",    subtitle: "Nautical & Polished",   tag: "Trending", style: "Tailored",        href: "/outfits/striped-oxford-trousers"      },
      { id: 8, title: "Cashmere Turtleneck Set",      subtitle: "Winter Luxury",         tag: "New",      style: "Casual Luxury",   href: "/outfits/cashmere-turtleneck-set"      },
    ],
  },

  "retro-vintage": {
    label: "Retro & Vintage Style",
    subtitle: "Nostalgic & Timeless",
    description:
      "High-waisted silhouettes, bold prints, thrifted gems and the nostalgic energy of past decades – discover curated retro and vintage outfits for those who find inspiration in fashion history.",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#880e4f]",
    tipTitle: "The past never goes out of style,",
    tipBody:
      "Mix genuine vintage finds with modern basics for an authentic retro look – let one statement piece anchor the entire outfit.",
    tipTags: ["High-Waisted", "Prints", "Thrifted", "Retro"],
    filters: ["All", "70s", "80s", "90s", "High-Waisted", "Prints", "Thrifted", "Denim"],
    outfitGridLabel: "Latest Retro & Vintage Looks",
    styleGuideHref: "/blog/occasion-guides/retro-vintage-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Boho Style",   href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Y2K Style",    href: "/outfits/style/y2k",         accent: "bg-[#f3e5f5]", accentText: "text-[#7b1fa2]" },
      { label: "Street Style", href: "/outfits/style/streetstyle", accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Festival & Outdoor", href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
    ],
    faqs: [
      {
        q: "What is the difference between retro and vintage fashion?",
        a: "Vintage refers to clothing that was actually produced in a past era – typically 20 or more years old. Retro describes contemporary clothing designed to evoke the aesthetic of a past decade. Both can be worn together: a genuine 70s blouse paired with modern high-waisted jeans, for example, creates a cohesive and authentic look.",
      },
      {
        q: "How do you style a 70s-inspired outfit for today?",
        a: "High-waisted flared trousers or a wide-leg denim in earthy tones, a fitted knit top or peasant blouse, and platform sandals or chunky heels are the building blocks. Add a fringed suede bag and oversized tinted sunglasses to complete the decade reference without looking like a costume.",
      },
      {
        q: "Where do you find quality vintage pieces?",
        a: "Thrift stores, vintage markets, consignment boutiques and online platforms like Depop, Vestiaire Collective and eBay are the best sources. Focus on natural fabrics – wool, silk, cotton – as they age better than synthetics. Check seams, zips and linings carefully before buying.",
      },
    ],
    seo: {
      title: "Retro & Vintage Style Outfits – Nostalgic Fashion Looks",
      description:
        "Discover curated retro and vintage outfits: 70s, 80s and 90s inspired looks, high-waisted silhouettes, bold prints and thrifted combinations for every occasion.",
      keywords: ["Retro Outfit", "Vintage Style Outfit", "70s Inspired Outfit", "80s Fashion Outfit", "90s Retro Look", "High-Waisted Outfit", "Thrift Style", "Vintage Fashion Women"],
    },
    card: {
      description: "Bold prints, high-waisted silhouettes and nostalgic decade vibes",
      tags: ["High-Waisted", "Prints", "Thrifted", "Retro"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Flared Denim & Knit Top",      subtitle: "70s Revival",          tag: "Trending", style: "70s",          href: "/outfits/flared-denim-knit-top"        },
      { id: 2, title: "High-Waist Plaid Trousers",    subtitle: "Preppy Vintage",        tag: "Popular",  style: "High-Waisted", href: "/outfits/high-waist-plaid-trousers"    },
      { id: 3, title: "80s Power Shoulder Blazer",    subtitle: "Bold & Structured",     tag: "New",      style: "80s",          href: "/outfits/80s-power-shoulder-blazer"   },
      { id: 4, title: "90s Slip Dress & Turtleneck",  subtitle: "Layered Nostalgia",     tag: "Trending", style: "90s",          href: "/outfits/90s-slip-dress-turtleneck"   },
      { id: 5, title: "Corduroy Wide-Leg Set",         subtitle: "Earthy & Retro",        tag: "Popular",  style: "70s",          href: "/outfits/corduroy-wide-leg-set"        },
      { id: 6, title: "Vintage Band Tee & Flare",     subtitle: "Rock & Retro",          tag: "New",      style: "Thrifted",     href: "/outfits/vintage-band-tee-flare"       },
      { id: 7, title: "Midi Wrap Dress 70s Print",    subtitle: "Floral & Nostalgic",    tag: "Trending", style: "Prints",       href: "/outfits/midi-wrap-dress-70s-print"   },
      { id: 8, title: "Denim Overalls & Striped Tee", subtitle: "90s Casual",            tag: "New",      style: "90s",          href: "/outfits/denim-overalls-striped-tee"  },
    ],
  },

  y2k: {
    label: "Y2K Style",
    subtitle: "Early 2000s Revival",
    description:
      "Low-rise denim, butterfly clips, metallic accents, mini skirts and crop tops – discover curated Y2K outfits channeling the playful, maximalist energy of early 2000s fashion.",
    accent: "bg-[#f3e5f5]",
    accentText: "text-[#7b1fa2]",
    tipTitle: "Bring the 2000s back with confidence,",
    tipBody:
      "Y2K styling is all about playful proportions and unapologetic details – mix pastel and neon sparingly for a modern take on early 2000s maximalism.",
    tipTags: ["Low-Rise", "Metallic", "Crop Top", "Mini"],
    filters: ["All", "Low-Rise", "Crop Top", "Mini", "Metallic", "Pastel", "Denim", "Party"],
    outfitGridLabel: "Latest Y2K Looks",
    styleGuideHref: "/blog/occasion-guides/y2k-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Retro & Vintage",  href: "/outfits/style/retro-vintage", accent: "bg-[#fce4ec]", accentText: "text-[#880e4f]" },
      { label: "Street Style",     href: "/outfits/style/streetstyle",   accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Festival & Outdoor",href: "/outfits/occasion/festival",  accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Date Night",       href: "/outfits/occasion/date-night", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
    ],
    faqs: [
      {
        q: "What are the key elements of a Y2K outfit?",
        a: "Low-rise jeans or skirts, crop tops, baby tees, velour tracksuits, metallic or holographic fabrics, mini skirts, platform shoes and bold accessories like butterfly clips, chunky belts and colorful sunglasses define the aesthetic. Pastel tones, neon accents and logo-heavy pieces also feature strongly.",
      },
      {
        q: "How do you wear Y2K style without looking dated?",
        a: "The key is restraint and mixing eras. Pair one statement Y2K piece – a low-rise cargo skirt or metallic top – with contemporary basics. Modern silhouettes in the rest of the outfit ground the look. High-quality fabrics and a considered color story elevate Y2K beyond costume into genuine style.",
      },
      {
        q: "Which shoes go best with Y2K outfits?",
        a: "Platform trainers, block-heel mules, chunky sandals and kitten-heel slingbacks all capture the Y2K footwear spirit. Boots with a chunky sole or pointed toe also work well. Avoid overly sleek minimalist shoes – the era favored bold, statement footwear that added height and volume.",
      },
    ],
    seo: {
      title: "Y2K Style Outfits – Early 2000s Fashion Revival",
      description:
        "Discover curated Y2K outfits: low-rise denim, metallic tops, mini skirts, crop top looks and early 2000s-inspired combinations for the ultimate nostalgia-forward style.",
      keywords: ["Y2K Outfit", "Y2K Fashion", "2000s Style Outfit", "Low-Rise Outfit", "Crop Top Look", "Y2K Aesthetic", "Metallic Outfit", "Y2K Outfit Women"],
    },
    card: {
      description: "Low-rise, metallic and unapologetically early 2000s",
      tags: ["Low-Rise", "Metallic", "Crop Top", "Mini"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Low-Rise Cargo & Crop Top",      subtitle: "Y2K Street",           tag: "Trending", style: "Low-Rise",  href: "/outfits/low-rise-cargo-crop-top"       },
      { id: 2, title: "Velour Tracksuit Set",            subtitle: "2000s Lounge",         tag: "Popular",  style: "Pastel",    href: "/outfits/velour-tracksuit-set"          },
      { id: 3, title: "Metallic Mini Skirt Look",        subtitle: "Party & Night Out",    tag: "New",      style: "Metallic",  href: "/outfits/metallic-mini-skirt-look"      },
      { id: 4, title: "Baby Tee & Denim Midi Skirt",     subtitle: "Y2K Casual",           tag: "Trending", style: "Denim",     href: "/outfits/baby-tee-denim-midi-skirt"     },
      { id: 5, title: "Rhinestone Crop & Flares",        subtitle: "Glam Y2K",             tag: "Popular",  style: "Metallic",  href: "/outfits/rhinestone-crop-flares"        },
      { id: 6, title: "Pastel Co-ord Set",               subtitle: "Sweet & Playful",      tag: "New",      style: "Pastel",    href: "/outfits/pastel-coord-set"              },
      { id: 7, title: "Butterfly-Print Mini Dress",      subtitle: "Fun & Flirty",         tag: "Trending", style: "Mini",      href: "/outfits/butterfly-print-mini-dress"    },
      { id: 8, title: "Platform Boots & Mini Skirt",     subtitle: "Bold Y2K Edge",        tag: "New",      style: "Party",     href: "/outfits/platform-boots-mini-skirt"     },
    ],
  },

  western: {
    label: "Western Style",
    subtitle: "Cowgirl & Ranch Vibes",
    description:
      "Cowboy boots, denim, plaid shirts, fringe jackets and earthy rodeo-inspired tones – discover curated western outfits that bring frontier spirit to modern everyday dressing.",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    tipTitle: "Saddle up in style,",
    tipBody:
      "Western dressing works best when you anchor the look with one statement piece – a great pair of cowboy boots or a fringe jacket carries the whole outfit.",
    tipTags: ["Cowboy Boots", "Denim", "Fringe", "Plaid"],
    filters: ["All", "Cowboy Boots", "Denim", "Fringe", "Plaid", "Earthy", "Festival"],
    outfitGridLabel: "Latest Western Looks",
    styleGuideHref: "/blog/occasion-guides/western-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Boho Style",         href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Festival & Outdoor", href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Casual & Everyday",  href: "/outfits/occasion/casual",   accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
      { label: "Retro & Vintage",    href: "/outfits/style/retro-vintage", accent: "bg-[#fce4ec]", accentText: "text-[#880e4f]" },
    ],
    faqs: [
      {
        q: "What are the core pieces of a western outfit?",
        a: "Cowboy boots are the non-negotiable foundation. Build around them with straight or flared denim, a plaid or chambray shirt, a fringe suede jacket or denim vest, and a wide-brim hat. Leather belts with Western hardware, bolo ties and turquoise jewelry complete the look.",
      },
      {
        q: "How do you wear western style in an urban setting?",
        a: "Pair classic cowboy boots with straight dark denim and a simple tucked-in shirt for a city-ready western look. A fringe bag or leather belt adds the Western nod without going full rodeo. Keep everything else neutral and well-fitted – the boots do the talking.",
      },
      {
        q: "What colors are typical in western fashion?",
        a: "Earthy tones dominate: tan, rust, sand, terracotta, chocolate brown, olive and warm ivory. Denim blue in all shades is a constant. Black adds edge and is widely used for boots and accessories. Occasional turquoise or burnt orange accents appear in jewelry and embroidered details.",
      },
    ],
    seo: {
      title: "Western Style Outfits – Cowgirl, Denim & Fringe Looks",
      description:
        "Discover curated western outfits: cowboy boots, fringe jackets, plaid shirts and rodeo-inspired looks for festival, everyday and city dressing with frontier spirit.",
      keywords: ["Western Outfit Women", "Cowgirl Outfit", "Cowboy Boots Outfit", "Western Fashion", "Fringe Outfit", "Western Style", "Rodeo Outfit", "Denim Western Look"],
    },
    card: {
      description: "Cowboy boots, fringe and denim with frontier spirit",
      tags: ["Cowboy Boots", "Denim", "Fringe", "Plaid"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Cowboy Boots & Flare Jeans",   subtitle: "Classic Western",      tag: "Trending", style: "Cowboy Boots", href: "/outfits/cowboy-boots-flare-jeans"      },
      { id: 2, title: "Fringe Suede Jacket Look",      subtitle: "Festival & Boho",      tag: "Popular",  style: "Fringe",       href: "/outfits/fringe-suede-jacket-look"      },
      { id: 3, title: "Plaid Shirt & Denim Shorts",    subtitle: "Ranch Casual",         tag: "New",      style: "Plaid",        href: "/outfits/plaid-shirt-denim-shorts"      },
      { id: 4, title: "Western Midi Dress & Boots",    subtitle: "Feminine & Frontier",  tag: "Trending", style: "Earthy",       href: "/outfits/western-midi-dress-boots"      },
      { id: 5, title: "Denim-on-Denim Western",        subtitle: "Rodeo Double Denim",   tag: "Popular",  style: "Denim",        href: "/outfits/denim-on-denim-western"        },
      { id: 6, title: "Suede Shorts & Cowboy Hat",     subtitle: "Boho Western",         tag: "New",      style: "Earthy",       href: "/outfits/suede-shorts-cowboy-hat"       },
      { id: 7, title: "Embroidered Western Blouse",    subtitle: "Detail & Craft",       tag: "Trending", style: "Plaid",        href: "/outfits/embroidered-western-blouse"    },
      { id: 8, title: "Bolo Tie & Tailored Look",      subtitle: "Modern Western",       tag: "New",      style: "Cowboy Boots", href: "/outfits/bolo-tie-tailored-look"        },
    ],
  },

  "sienna-vibe": {
    label: "Sienna Vibe",
    subtitle: "Boho-Chic & Effortless",
    description:
      "Sun-kissed boho-chic layers, earthy tones and effortlessly undone elegance – discover curated Sienna vibe outfits inspired by the iconic free-spirited look that never goes out of fashion.",
    accent: "bg-[#fdf6ec]",
    accentText: "text-[#8b5e3c]",
    tipTitle: "Effortless is the new perfect,",
    tipBody:
      "Sienna vibe is about looking like you didn't try too hard – layer a vintage crochet top with wide-leg denim and let one piece (a scarf, a bag, a boot) do all the talking.",
    tipTags: ["Crochet", "Wide-Leg", "Earthy", "Layered"],
    filters: ["All", "Crochet", "Wide-Leg", "Floral", "Layered", "Boho", "Vintage"],
    outfitGridLabel: "Latest Sienna Vibe Looks",
    styleGuideHref: "/blog/occasion-guides/sienna-vibe-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Boho Style",        href: "/outfits/style/boho",           accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Retro & Vintage",   href: "/outfits/style/retro-vintage",  accent: "bg-[#fce4ec]", accentText: "text-[#880e4f]" },
      { label: "Festival & Outdoor",href: "/outfits/occasion/festival",    accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Beach & Vacation",  href: "/outfits/occasion/beach",       accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "What is the Sienna vibe aesthetic?",
        a: "The Sienna vibe aesthetic draws from the iconic boho-chic style of early 2000s and 2010s fashion – think floaty peasant blouses, wide-leg trousers, crochet layers, suede boots and an effortlessly undone feel. The palette runs through sandy beige, chocolate brown, rust and warm ivory, often anchored with vintage denim.",
      },
      {
        q: "How do you style a Sienna vibe outfit for everyday?",
        a: "Start with a floaty linen or cotton blouse – peasant neck or smocked – tucked loosely into wide-leg jeans or a tiered midi skirt. Add suede ankle boots or flat sandals, a raffia bag and a long pendant necklace. Finish with an oversized shearling jacket for cooler days. The key is relaxed confidence – nothing should look too precise.",
      },
      {
        q: "Which accessories complete the Sienna vibe look?",
        a: "Raffia and woven bags, suede fringe bags, round or oversized tinted sunglasses, layered gold and coin jewelry, silk or printed headscarves and wide-brim hats are the signature accessories. Suede ankle boots and flat sandals in tan or cognac complete every look. The more personal and eclectic, the better.",
      },
    ],
    seo: {
      title: "Sienna Vibe Outfits – Boho-Chic & Effortlessly Undone",
      description:
        "Discover curated Sienna vibe outfits: crochet tops, wide-leg denim, suede boots and earthy boho-chic combinations for a free-spirited and effortlessly stylish look.",
      keywords: ["Sienna Vibe Outfit", "Sienna Vibe Aesthetic", "Boho Chic Outfit", "70s Boho Style", "Crochet Outfit", "Wide Leg Boho", "Sienna Miller Style", "Effortless Boho Look"],
    },
    card: {
      description: "Earthy boho-chic layers with effortless undone elegance",
      tags: ["Crochet", "Wide-Leg", "Earthy", "Boho"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Crochet Top & Wide-Leg Denim",    subtitle: "Boho & Effortless",     tag: "Trending", style: "Crochet",   href: "/outfits/crochet-top-wide-leg-denim"      },
      { id: 2, title: "Floaty Peasant Blouse Look",       subtitle: "Free-Spirited & Soft",  tag: "Popular",  style: "Boho",     href: "/outfits/floaty-peasant-blouse"           },
      { id: 3, title: "Suede Boots & Midi Skirt",         subtitle: "Earthy & Vintage",      tag: "New",      style: "Vintage",  href: "/outfits/suede-boots-midi-skirt-sienna"   },
      { id: 4, title: "Shearling Jacket & Flares",        subtitle: "Layered & Warm",        tag: "Trending", style: "Layered",  href: "/outfits/shearling-jacket-flares"         },
      { id: 5, title: "Tiered Floral Midi & Sandals",     subtitle: "Festival & Romantic",   tag: "Popular",  style: "Floral",   href: "/outfits/tiered-floral-midi-sandals"      },
      { id: 6, title: "Vintage Knit & Denim Shorts",      subtitle: "Casual & Retro",        tag: "New",      style: "Vintage",  href: "/outfits/vintage-knit-denim-shorts"       },
      { id: 7, title: "Raffia Bag & Linen Co-ord",        subtitle: "Beach & Boho",          tag: "Trending", style: "Boho",     href: "/outfits/raffia-bag-linen-coord"          },
      { id: 8, title: "Smocked Dress & Suede Bag",        subtitle: "Romantic & Earthy",     tag: "New",      style: "Floral",   href: "/outfits/smocked-dress-suede-bag"         },
    ],
  },

  "korean-fashion": {
    label: "Korean Fashion",
    subtitle: "K-Style & Seoul Vibes",
    description:
      "Oversized blazers, pastel knits, clean co-ords and the playful precision of Seoul street style – discover curated Korean fashion outfits for those who love effortless cool with a polished edge.",
    accent: "bg-[#f8f0fb]",
    accentText: "text-[#7b1fa2]",
    tipTitle: "Seoul-approved and effortlessly cool,",
    tipBody:
      "K-style lives in the details: a perfectly oversized blazer, a carefully chosen color palette and the discipline to never overdo it.",
    tipTags: ["Oversized", "Pastel", "Co-ord", "Minimal"],
    filters: ["All", "Oversized", "Pastel", "Co-ord", "Streetwear", "Preppy", "Minimal"],
    outfitGridLabel: "Latest Korean Fashion Looks",
    styleGuideHref: "/blog/occasion-guides/korean-fashion-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Clean Girl",     href: "/outfits/style/clean-girl",    accent: "bg-[#f5f5f5]",  accentText: "text-gray-700"  },
      { label: "Minimalist",     href: "/outfits/style/minimalist",    accent: "bg-gray-100",   accentText: "text-gray-700"  },
      { label: "Street Style",   href: "/outfits/style/streetstyle",   accent: "bg-gray-900",   accentText: "text-white"     },
      { label: "Y2K Style",      href: "/outfits/style/y2k",           accent: "bg-[#f3e5f5]",  accentText: "text-[#7b1fa2]" },
    ],
    faqs: [
      {
        q: "What defines Korean fashion style?",
        a: "Korean fashion — often called K-fashion — is known for its blend of oversized silhouettes, pastel and muted color palettes, preppy co-ord sets, structured blazers and meticulous styling. It draws from both minimalist and playful aesthetics, often mixing streetwear elements with feminine details. The result is polished yet effortless, editorial without being inaccessible.",
      },
      {
        q: "How do you style a Korean fashion outfit?",
        a: "A classic K-fashion approach: oversized blazer in a muted tone over a simple tee, wide-leg or straight-cut trousers and loafers or clean white sneakers. Pastel knit co-ord sets are a K-fashion staple. Accessories tend to be understated – a small structured bag, minimal jewelry and a simple hair tie. Proportions are everything.",
      },
      {
        q: "Where can you shop for Korean fashion pieces?",
        a: "Korean fashion brands like Musinsa, Stylenanda, Ader Error, Gentle Monster (accessories) and Sandro-inspired Korean labels produce K-fashion staples. For accessible options, ZARA and COS regularly carry K-fashion-adjacent pieces. Online platforms like YesStyle and W Concept ship internationally.",
      },
    ],
    seo: {
      title: "Korean Fashion Outfits – K-Style, Seoul Street & Co-ord Looks",
      description:
        "Discover curated Korean fashion outfits: oversized blazers, pastel co-ords, Seoul street style and K-fashion inspired looks for a polished and effortlessly cool wardrobe.",
      keywords: ["Korean Fashion Outfit", "K-Fashion Style", "Korean Outfit Women", "Seoul Street Style", "K-Style Outfit", "Korean Co-ord Set", "Oversized Blazer Korean", "K-Fashion Aesthetic"],
    },
    card: {
      description: "Oversized silhouettes, pastel co-ords and Seoul street polish",
      tags: ["Oversized", "Pastel", "Co-ord", "K-Style"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Oversized Blazer & Wide-Leg",      subtitle: "K-Style Classic",       tag: "Trending", style: "Oversized",  href: "/outfits/oversized-blazer-wide-leg-korean"  },
      { id: 2, title: "Pastel Knit Co-ord Set",            subtitle: "Sweet & Polished",      tag: "Popular",  style: "Pastel",     href: "/outfits/pastel-knit-coord-korean"           },
      { id: 3, title: "Pleated Mini & Cardigan",           subtitle: "Preppy & Playful",      tag: "New",      style: "Preppy",     href: "/outfits/pleated-mini-cardigan-korean"       },
      { id: 4, title: "Monochrome Seoul Look",             subtitle: "Minimal & Sharp",       tag: "Trending", style: "Minimal",    href: "/outfits/monochrome-seoul-look"              },
      { id: 5, title: "Puffer Vest & Midi Skirt",          subtitle: "Street & Feminine",     tag: "Popular",  style: "Streetwear", href: "/outfits/puffer-vest-midi-skirt-korean"      },
      { id: 6, title: "Cream Trench & Loafers",            subtitle: "Clean & Chic",          tag: "New",      style: "Minimal",    href: "/outfits/cream-trench-loafers-korean"        },
      { id: 7, title: "Graphic Tee & Tailored Trousers",   subtitle: "Urban & Smart",         tag: "Trending", style: "Streetwear", href: "/outfits/graphic-tee-tailored-trousers-k"   },
      { id: 8, title: "Knit Vest & Shirt Combo",           subtitle: "Layered & Preppy",      tag: "New",      style: "Preppy",     href: "/outfits/knit-vest-shirt-combo-korean"       },
    ],
  },

  "clean-girl": {
    label: "Clean Girl",
    subtitle: "Minimal, Polished & Effortless",
    description:
      "Slick buns, gold hoops, dewy skin and effortlessly put-together basics – discover curated clean girl outfits built on quality neutrals and understated polish that looks like no effort at all.",
    accent: "bg-[#f5f5f5]",
    accentText: "text-gray-700",
    tipTitle: "Polished is the new effortless,",
    tipBody:
      "Clean girl dressing is about investment: one great neutral piece, perfect tailoring and accessories that feel personal, not purchased.",
    tipTags: ["Neutral", "Minimal", "Basics", "Gold"],
    filters: ["All", "Neutral", "Minimal", "Tailored", "Basics", "Monochrome", "Linen"],
    outfitGridLabel: "Latest Clean Girl Looks",
    styleGuideHref: "/blog/occasion-guides/clean-girl-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Minimalist",      href: "/outfits/style/minimalist",    accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Old Money Style", href: "/outfits/style/old-money",     accent: "bg-[#f5f0e8]", accentText: "text-[#5c4a1e]" },
      { label: "Korean Fashion",  href: "/outfits/style/korean-fashion",accent: "bg-[#f8f0fb]", accentText: "text-[#7b1fa2]" },
      { label: "Office & Business",href: "/outfits/occasion/office",    accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
    ],
    faqs: [
      {
        q: "What is the clean girl aesthetic?",
        a: "The clean girl aesthetic is a TikTok and Pinterest-born trend defined by effortlessly put-together simplicity: slicked-back buns, gold hoop earrings, minimal makeup, high-quality basics in neutral tones and a calm, collected energy. It's the visual language of someone who looks great without appearing to try.",
      },
      {
        q: "What are the key pieces for a clean girl wardrobe?",
        a: "Quality neutral basics are everything: a white or cream fitted tank, a well-cut beige or white linen shirt, straight-leg trousers in black or camel, a simple midi dress, clean white sneakers and a structured leather tote. Every piece should feel high-quality and versatile. Minimal gold jewelry – hoops, a chain necklace – completes the look.",
      },
      {
        q: "How is clean girl different from minimalist style?",
        a: "Both share a pared-back philosophy, but clean girl is more about lifestyle aspiration and personal grooming as part of the outfit. Minimalist style focuses on intentional reduction and architecture. Clean girl is warmer – more skin, softer shapes, personal touches like a scrunchie or specific bag. It feels more approachable and everyday.",
      },
    ],
    seo: {
      title: "Clean Girl Outfits – Minimal, Polished & Effortlessly Chic",
      description:
        "Discover curated clean girl outfits: neutral basics, gold accessories, slicked-back styling and minimal looks built on quality and understated polish for every day.",
      keywords: ["Clean Girl Outfit", "Clean Girl Aesthetic", "Minimal Outfit Women", "Neutral Outfit", "Clean Girl Style", "Effortless Chic Outfit", "Basics Outfit", "Clean Aesthetic Fashion"],
    },
    card: {
      description: "Neutral basics, gold hoops and understated everyday polish",
      tags: ["Neutral", "Minimal", "Basics", "Gold"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Cream Linen Set",                  subtitle: "Clean & Polished",      tag: "Trending", style: "Linen",      href: "/outfits/cream-linen-set-clean"             },
      { id: 2, title: "White Tank & Straight Jeans",      subtitle: "Everyday Essential",    tag: "Popular",  style: "Basics",     href: "/outfits/white-tank-straight-jeans-clean"  },
      { id: 3, title: "Beige Midi & Gold Hoops",          subtitle: "Effortless & Feminine", tag: "New",      style: "Minimal",    href: "/outfits/beige-midi-gold-hoops"             },
      { id: 4, title: "Monochrome Neutral Set",           subtitle: "Quiet & Polished",      tag: "Trending", style: "Monochrome", href: "/outfits/monochrome-neutral-set-clean"      },
      { id: 5, title: "Structured Tote & Basics",         subtitle: "Office & Everyday",     tag: "Popular",  style: "Tailored",   href: "/outfits/structured-tote-basics"            },
      { id: 6, title: "White Shirt & Tailored Trousers",  subtitle: "Clean & Sharp",         tag: "New",      style: "Basics",     href: "/outfits/white-shirt-tailored-trousers-cg"  },
      { id: 7, title: "Camel Knit & Dark Denim",          subtitle: "Cozy Clean",            tag: "Trending", style: "Neutral",    href: "/outfits/camel-knit-dark-denim-clean"       },
      { id: 8, title: "Slip Skirt & Simple Tee",          subtitle: "Soft & Minimal",        tag: "New",      style: "Minimal",    href: "/outfits/slip-skirt-simple-tee-clean"       },
    ],
  },

  "cute-coquette": {
    label: "Cute & Coquette",
    subtitle: "Soft, Feminine & Playfully Flirty",
    description:
      "Bows, lace, baby pink, ballet flats and ribbons – discover curated cute and coquette outfits for the ultra-feminine aesthetic that celebrates softness and playful femininity without apology.",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    tipTitle: "Soft is a superpower,",
    tipBody:
      "Coquette dressing is intentional femininity – let one signature piece (a bow headband, a lace top, a ribbon belt) set the tone for the entire outfit.",
    tipTags: ["Bow", "Lace", "Pink", "Ribbon"],
    filters: ["All", "Bow", "Lace", "Pink", "Ribbon", "Mini", "Floral", "Ballet"],
    outfitGridLabel: "Latest Cute & Coquette Looks",
    styleGuideHref: "/blog/occasion-guides/cute-coquette-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Y2K Style",      href: "/outfits/style/y2k",             accent: "bg-[#f3e5f5]", accentText: "text-[#7b1fa2]" },
      { label: "Boho Style",     href: "/outfits/style/boho",            accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Date Night",     href: "/outfits/occasion/date-night",   accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Spring Looks",   href: "/outfits/season/spring",         accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
    ],
    faqs: [
      {
        q: "What is the coquette aesthetic?",
        a: "The coquette aesthetic is a hyper-feminine, intentionally soft and flirtatious style rooted in old Hollywood romanticism and ballet culture. It centers on bows, lace, ribbons, pastel pinks, sheer fabrics, ballet flats and a dreamy, doll-like quality. Popularized on TikTok and Tumblr, it reclaims girliness as a deliberate style choice.",
      },
      {
        q: "How do you style a coquette outfit without going overboard?",
        a: "The key is to let one coquette signature lead. A lace-trimmed white top with simple straight jeans and ballet flats reads coquette without feeling costume-like. A bow headband with a clean midi dress is a similarly understated approach. Build from one detail outward – add a ribbon belt or pearl jewelry if you want more, but resist stacking every element at once.",
      },
      {
        q: "What are the must-have pieces for a coquette wardrobe?",
        a: "Ballet flats in black or white, a lace-trimmed slip dress or camisole, a baby pink or white blouse with ruffled or bow details, a pleated mini skirt, a ribbon or bow headband and pearl jewelry form the coquette core wardrobe. A simple blazer or cropped cardigan in ivory adds a subtle contrast that keeps the look fresh.",
      },
    ],
    seo: {
      title: "Cute & Coquette Outfits – Soft, Feminine & Flirtatiously Chic",
      description:
        "Discover curated cute and coquette outfits: bows, lace, ballet flats, baby pink combinations and soft feminine looks for those who embrace playful femininity.",
      keywords: ["Coquette Outfit", "Cute Coquette Aesthetic", "Coquette Style", "Bow Outfit Women", "Lace Outfit", "Ballet Core Outfit", "Soft Feminine Style", "Pink Coquette Look"],
    },
    card: {
      description: "Bows, lace, pink ribbons and intentional soft femininity",
      tags: ["Bow", "Lace", "Pink", "Ballet"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Bow Blouse & Pleated Skirt",        subtitle: "Sweet & Feminine",      tag: "Trending", style: "Bow",     href: "/outfits/bow-blouse-pleated-skirt"           },
      { id: 2, title: "Lace Slip Dress & Ballerina Flats", subtitle: "Soft & Romantic",       tag: "Popular",  style: "Lace",   href: "/outfits/lace-slip-dress-ballerina"          },
      { id: 3, title: "Baby Pink Co-ord Set",              subtitle: "Pastel & Playful",      tag: "New",      style: "Pink",   href: "/outfits/baby-pink-coord-set"                },
      { id: 4, title: "Ribbon Detail Midi Dress",          subtitle: "Romantic & Dainty",     tag: "Trending", style: "Ribbon", href: "/outfits/ribbon-detail-midi-dress"           },
      { id: 5, title: "Crochet Top & Mini Skirt",          subtitle: "Flirty & Sweet",        tag: "Popular",  style: "Lace",   href: "/outfits/crochet-top-mini-skirt-coquette"   },
      { id: 6, title: "Tulle Midi & Simple Knit",          subtitle: "Ballet & Dreamy",       tag: "New",      style: "Ballet", href: "/outfits/tulle-midi-simple-knit"             },
      { id: 7, title: "Pearl Earrings & White Dress",      subtitle: "Dainty & Elegant",      tag: "Trending", style: "Pink",   href: "/outfits/pearl-earrings-white-dress-coq"    },
      { id: 8, title: "Ruffle Blouse & Denim Look",        subtitle: "Casual Coquette",       tag: "New",      style: "Floral", href: "/outfits/ruffle-blouse-denim-coquette"       },
    ],
  },

  "black-dark": {
    label: "Black & Dark",
    subtitle: "All-Black & Dark Aesthetic",
    description:
      "All-black looks, monochrome dark palettes and bold power dressing – discover curated black and dark outfits for those who find strength and sophistication in the deepest end of the color spectrum.",
    accent: "bg-gray-900",
    accentText: "text-white",
    tipTitle: "Black is not a color — it's a statement,",
    tipBody:
      "An all-black outfit lives through texture contrast and silhouette: leather against silk, matte against shine, oversized against fitted.",
    tipTags: ["All-Black", "Leather", "Monochrome", "Edge"],
    filters: ["All", "All-Black", "Leather", "Monochrome", "Layered", "Evening", "Street"],
    outfitGridLabel: "Latest Black & Dark Looks",
    styleGuideHref: "/blog/occasion-guides/black-dark-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Minimalist",      href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Street Style",    href: "/outfits/style/streetstyle", accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Evening & Event", href: "/outfits/occasion/evening",  accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Classic Style",   href: "/outfits/style/classic",     accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
    ],
    faqs: [
      {
        q: "How do you make an all-black outfit interesting?",
        a: "The secret to an elevated all-black look is texture contrast: pair a matte wool coat with a shiny satin blouse underneath, or combine leather trousers with a soft cashmere knit. Silhouette contrast also adds depth – an oversized blazer over slim leather trousers creates visual tension without introducing color. Finish with black accessories in different materials (suede bag, silver jewelry, patent shoes).",
      },
      {
        q: "What are the best black outfit combinations for everyday?",
        a: "A black turtleneck with straight-leg jeans and white sneakers is the perfect everyday anchor. For a more polished look: black tailored trousers, a black silk blouse and pointed loafers. For weekend: black cargo pants, a black oversized hoodie and chunky black sneakers. Each reads entirely differently despite being the same palette.",
      },
      {
        q: "Can you wear all-black to formal occasions?",
        a: "Absolutely – black is the most sophisticated evening option. A long black satin slip dress or a structured black blazer over wide-leg trousers with heels is always appropriate. For black-tie, add metallic jewelry and a sleek clutch. The key is fabric quality: velvet, satin and silk elevate black from everyday to formal instantly.",
      },
    ],
    seo: {
      title: "Black & Dark Outfits – All-Black Looks & Dark Aesthetic Styles",
      description:
        "Discover curated black and dark outfits: all-black combinations, leather looks, monochrome dark aesthetics and bold power dressing for every occasion.",
      keywords: ["All Black Outfit Women", "Black Outfit Style", "Dark Aesthetic Outfit", "Black Fashion Look", "Monochrome Black Outfit", "Leather Outfit Women", "Black Street Style", "Dark Outfit Ideas"],
    },
    card: {
      description: "All-black looks, leather and monochrome dark power dressing",
      tags: ["All-Black", "Leather", "Monochrome", "Edge"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "All-Black Street Look",           subtitle: "Urban & Edgy",          tag: "Trending", style: "All-Black",   href: "/outfits/all-black-street-look"              },
      { id: 2, title: "Leather Jacket & Black Jeans",    subtitle: "Classic Dark Edge",     tag: "Popular",  style: "Leather",    href: "/outfits/leather-jacket-black-jeans"         },
      { id: 3, title: "Black Blazer Power Suit",         subtitle: "Office & Bold",         tag: "New",      style: "Evening",    href: "/outfits/black-blazer-power-suit"            },
      { id: 4, title: "Satin Slip & Leather Coat",       subtitle: "Evening & Dramatic",    tag: "Trending", style: "Evening",    href: "/outfits/satin-slip-leather-coat"            },
      { id: 5, title: "Black Turtleneck & Wide-Leg",     subtitle: "Minimal & Sharp",       tag: "Popular",  style: "Monochrome", href: "/outfits/black-turtleneck-wide-leg"          },
      { id: 6, title: "Oversized Black Hoodie & Cargo",  subtitle: "Street & Dark",         tag: "New",      style: "Street",     href: "/outfits/oversized-black-hoodie-cargo"       },
      { id: 7, title: "Black Midi Dress & Boots",        subtitle: "Everyday Dark",         tag: "Trending", style: "Layered",    href: "/outfits/black-midi-dress-boots"             },
      { id: 8, title: "Velvet Blazer & Trousers",        subtitle: "Dark & Luxurious",      tag: "New",      style: "Evening",    href: "/outfits/velvet-blazer-trousers-black"       },
    ],
  },
}

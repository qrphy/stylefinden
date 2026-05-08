// Tüm trend koleksiyon verilerinin tek kaynağı — season/aesthetic/category slug sayfaları bu dosyadan okur.
import type { CollectionItem } from "@/components/shared/CollectionCard"

export type TrendCollectionConfig = {
  label: string
  description: string
  accent: string
  accentText: string
  seo: { title: string; description: string; keywords: string[] }
  card: { description: string; tags: string[]; badge?: string }
  highlights?: string[]
  sanityFilter?: string
}

// Slug'u "Spring Summer" formatına çevirir
function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

// Bilinmeyen slug için generic config üretir
export function makeDefaultTrendConfig(slug: string): TrendCollectionConfig {
  const label = slugToLabel(slug)
  return {
    label,
    description: `Discover the latest ${label.toLowerCase()} trends curated by our fashion editors.`,
    accent: "bg-gray-100",
    accentText: "text-gray-700",
    seo: {
      title: `${label} Trends – Latest Fashion`,
      description: `Explore the latest ${label.toLowerCase()} fashion trends curated by our editors.`,
      keywords: [`${label} Trends`, `${label} Fashion`, `${label} Style`],
    },
    card: {
      description: `The latest ${label.toLowerCase()} trends.`,
      tags: ["Trend", "Fashion", "Style"],
      badge: "New",
    },
    highlights: [
      "Editor-curated looks updated every season",
      "Key pieces, silhouettes and colour stories",
      "Real-world styling inspiration",
      "From runway to everyday wearable looks",
    ],
  }
}

// ── Season Configs ────────────────────────────────────────────────────────────

export const TREND_SEASON_ORDER = [
  "spring-summer",
  "autumn-winter",
  "resort",
  "pre-fall",
]

export const TREND_SEASON_CONFIGS: Record<string, TrendCollectionConfig> = {
  "spring-summer": {
    label: "Spring / Summer",
    description: "Bright palettes, airy fabrics and the freshest looks of the warm season",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    seo: {
      title: "Spring / Summer Trends – Fresh Looks & Warm Season Fashion",
      description:
        "Discover the latest spring and summer fashion trends: fresh palettes, airy fabrics, floral prints and the most-wanted warm-season looks.",
      keywords: [
        "Spring Summer Trends",
        "Spring Fashion",
        "Summer Trends",
        "Warm Season Fashion",
        "Spring Looks",
        "Summer Style",
        "Floral Trends",
        "Pastel Fashion",
      ],
    },
    card: {
      description: "Bright palettes, airy fabrics and the freshest looks of the warm season",
      tags: ["Linen", "Pastel", "Floral", "Minimal"],
      badge: "New",
    },
    highlights: [
      "Pastels and soft botanicals dominate the colour story this season",
      "Linen and lightweight fabrics replace heavy textures across every category",
      "Floral prints evolve from romantic to graphic and abstract",
      "Minimal layering and effortless silhouettes define the mood",
    ],
  },

  "autumn-winter": {
    label: "Autumn / Winter",
    description: "Rich textures, layering and the season's most coveted colour stories",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    seo: {
      title: "Autumn / Winter Trends – Rich Textures & Seasonal Colour Stories",
      description:
        "Explore the latest autumn and winter fashion trends: rich textures, knitwear, earth tones and the season's most coveted layering looks.",
      keywords: [
        "Autumn Winter Trends",
        "Winter Fashion Trends",
        "Fall Trends",
        "Autumn Looks",
        "Knitwear Trends",
        "Earth Tone Fashion",
        "Winter Layering",
        "Coat Trends",
      ],
    },
    card: {
      description: "Rich textures, layering and the season's most coveted colour stories",
      tags: ["Coat", "Earth Tones", "Knitwear", "Leather"],
      badge: "New",
    },
    highlights: [
      "Earth tones and burgundy lead the seasonal colour palette",
      "Oversized knitwear becomes the centrepiece of every winter wardrobe",
      "Statement coats replace the blazer as the season's power piece",
      "Leather and suede textures add depth to transitional layering looks",
    ],
  },

  resort: {
    label: "Resort & Holiday",
    description: "Vacation-ready pieces and resort wear that travels from pool to dinner",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    seo: {
      title: "Resort & Holiday Trends – Vacation Fashion & Travel Looks",
      description:
        "Discover the latest resort and holiday fashion trends: kaftans, maxi dresses, linen sets and vacation-ready looks from pool to dinner.",
      keywords: [
        "Resort Trends",
        "Holiday Fashion",
        "Resort Wear",
        "Vacation Outfits",
        "Resort Style",
        "Travel Fashion",
        "Kaftan Trends",
        "Tropical Fashion",
      ],
    },
    card: {
      description: "Vacation-ready pieces and resort wear that travels from pool to dinner",
      tags: ["Kaftan", "Linen", "Maxi", "Tropical"],
      badge: "New",
    },
    highlights: [
      "Kaftans and cover-ups become versatile day-to-evening staples",
      "Tropical prints and bold colours define the resort mood",
      "Lightweight linen and cotton sets travel effortlessly from beach to restaurant",
      "Gold jewellery and woven accessories complete every holiday look",
    ],
  },

  "pre-fall": {
    label: "Pre-Fall",
    description: "Transitional dressing — bridging summer warmth and autumn depth",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    seo: {
      title: "Pre-Fall Trends – Transitional Fashion for Season Changes",
      description:
        "Explore pre-fall fashion trends: transitional dressing, trench coats, midi silhouettes and neutral layering looks for the season shift.",
      keywords: [
        "Pre Fall Trends",
        "Transitional Fashion",
        "Pre Fall Style",
        "Autumn Transition",
        "Trench Coat Trends",
        "Midi Trends",
        "Neutral Fashion",
        "Layering Trends",
      ],
    },
    card: {
      description: "Transitional dressing — bridging summer warmth and autumn depth",
      tags: ["Trench", "Midi", "Neutral", "Blazer"],
      badge: "New",
    },
    highlights: [
      "Neutral tones form the bridge between sun-drenched summer and muted autumn palettes",
      "Trench coats return as the definitive transitional outerwear piece",
      "Midi silhouettes lead the way in pre-fall suiting and dress edits",
      "Blazers and structured separates replace the summer jacket with ease",
    ],
  },
}

export function getTrendSeasonConfig(slug: string): TrendCollectionConfig {
  return TREND_SEASON_CONFIGS[slug] ?? makeDefaultTrendConfig(slug)
}

export function getTrendSeasonCard(slug: string): CollectionItem {
  const cfg = getTrendSeasonConfig(slug)
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

// ── Aesthetic Configs ─────────────────────────────────────────────────────────

export const TREND_AESTHETIC_ORDER = [
  "quiet-luxury",
  "coastal-grandmother",
  "dark-academia",
  "y2k",
  "street-luxe",
  "romantic-femininity",
]

export const TREND_AESTHETIC_CONFIGS: Record<string, TrendCollectionConfig> = {
  "quiet-luxury": {
    label: "Quiet Luxury",
    description: "Understated elegance, premium fabrics and no-logo sophistication",
    accent: "bg-[#fafafa]",
    accentText: "text-gray-900",
    seo: {
      title: "Quiet Luxury Trends – Understated Elegance & Premium Fashion",
      description:
        "Explore quiet luxury fashion trends: understated elegance, premium fabrics, neutral palettes and no-logo sophistication for every wardrobe.",
      keywords: [
        "Quiet Luxury Trend",
        "Quiet Luxury Fashion",
        "Understated Elegance",
        "Old Money Style",
        "Premium Fashion",
        "Minimal Luxury",
        "No Logo Fashion",
        "Elevated Basics",
      ],
    },
    card: {
      description: "Understated elegance, premium fabrics and no-logo sophistication",
      tags: ["Cashmere", "Tailored", "Neutral", "Minimal"],
      badge: "New",
    },
    highlights: [
      "Investment-quality fabrics — cashmere, merino and fine wool — over fast fashion",
      "A muted colour palette of cream, camel, oat and slate defines the look",
      "Clean tailoring and precise fits replace oversized or logo-heavy silhouettes",
      "Subtle, minimal accessories signal wealth without announcing it",
    ],
  },

  "coastal-grandmother": {
    label: "Coastal Grandmother",
    description: "Relaxed linen, woven textures and seaside-inspired calm",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    seo: {
      title: "Coastal Grandmother Trend – Relaxed Linen & Seaside Style",
      description:
        "Discover the coastal grandmother aesthetic: relaxed linen, woven textures, white and navy palettes and seaside-inspired calm.",
      keywords: [
        "Coastal Grandmother Trend",
        "Coastal Style",
        "Linen Fashion",
        "Beach Aesthetic",
        "Relaxed Fashion",
        "Coastal Aesthetic",
        "Woven Textures",
        "Seaside Style",
      ],
    },
    card: {
      description: "Relaxed linen, woven textures and seaside-inspired calm",
      tags: ["Linen", "Woven", "White", "Relaxed"],
      badge: "New",
    },
    highlights: [
      "Effortless linen in white, pale blue and natural tones anchors the wardrobe",
      "Woven bags, rattan accessories and straw hats complete the look",
      "Loose-fit trousers and wide-leg silhouettes bring a relaxed ease",
      "Simple white sneakers and flat sandals ground every coastal outfit",
    ],
  },

  "dark-academia": {
    label: "Dark Academia",
    description: "Plaid blazers, turtlenecks and a literary, moody atmosphere",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    seo: {
      title: "Dark Academia Trend – Plaid, Turtlenecks & Moody Fashion",
      description:
        "Explore the dark academia aesthetic: plaid blazers, turtlenecks, oxford shoes and a literary, moody atmosphere in fashion.",
      keywords: [
        "Dark Academia Trend",
        "Dark Academia Fashion",
        "Plaid Fashion",
        "Turtleneck Trend",
        "Oxford Style",
        "Moody Fashion",
        "Academic Aesthetic",
        "Intellectual Style",
      ],
    },
    card: {
      description: "Plaid blazers, turtlenecks and a literary, moody atmosphere",
      tags: ["Plaid", "Turtleneck", "Brown", "Oxford"],
      badge: "New",
    },
    highlights: [
      "Plaid blazers and herringbone coats form the backbone of every dark academia look",
      "Turtlenecks in cream, brown and forest green layer under every blazer and coat",
      "Oxford shoes and brogues replace sneakers as the academic footwear of choice",
      "Deep earthy tones — chocolate, burnt sienna and olive — define the palette",
    ],
  },

  y2k: {
    label: "Y2K Revival",
    description: "Low-rise denim, metallics and the nostalgia of early 2000s fashion",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    seo: {
      title: "Y2K Fashion Trend – Low-Rise Denim, Metallics & 2000s Revival",
      description:
        "Discover Y2K fashion trends: low-rise denim, metallics, crop tops and the nostalgic energy of early 2000s style updated for now.",
      keywords: [
        "Y2K Trend",
        "Y2K Fashion",
        "2000s Fashion Revival",
        "Low Rise Denim",
        "Metallic Fashion",
        "Crop Top Trend",
        "Nostalgic Fashion",
        "Early 2000s Style",
      ],
    },
    card: {
      description: "Low-rise denim, metallics and the nostalgia of early 2000s fashion",
      tags: ["Low-Rise", "Metallic", "Crop", "Bold"],
      badge: "New",
    },
    highlights: [
      "Low-rise jeans and mini skirts reclaim the early 2000s silhouette",
      "Metallics in silver, chrome and holographic finishes dominate party dressing",
      "Crop tops and bralette-layering bring the Y2K energy into everyday outfits",
      "Chunky platform shoes and baby tees complete the throwback aesthetic",
    ],
  },

  "street-luxe": {
    label: "Street Luxe",
    description: "High-end streetwear — where luxury meets urban cool",
    accent: "bg-gray-900",
    accentText: "text-white",
    seo: {
      title: "Street Luxe Trend – High-End Streetwear & Urban Fashion",
      description:
        "Explore street luxe fashion trends: luxury streetwear, oversized silhouettes, sneaker culture and where high fashion meets urban cool.",
      keywords: [
        "Street Luxe Trend",
        "Luxury Streetwear",
        "High End Street Style",
        "Urban Fashion",
        "Oversized Fashion",
        "Sneaker Culture",
        "Street Fashion",
        "Logo Fashion Trend",
      ],
    },
    card: {
      description: "High-end streetwear — where luxury meets urban cool",
      tags: ["Oversized", "Logo", "Sneaker", "Layering"],
      badge: "New",
    },
    highlights: [
      "Oversized hoodies, wide-leg cargo pants and chunky sneakers define the silhouette",
      "Designer logos and branding are worn with intention, not excess",
      "Layering pieces from different registers — sport, formal and casual — creates the tension",
      "Premium streetwear labels blur the line between runway and sidewalk",
    ],
  },

  "romantic-femininity": {
    label: "Romantic Femininity",
    description: "Soft florals, ruffles and delicate details in pastel palettes",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    seo: {
      title: "Romantic Femininity Trend – Florals, Ruffles & Pastel Fashion",
      description:
        "Discover romantic femininity fashion trends: soft florals, ruffles, delicate details and pastel palettes for a dreamy, feminine wardrobe.",
      keywords: [
        "Romantic Femininity Trend",
        "Romantic Fashion",
        "Floral Fashion Trend",
        "Ruffle Trend",
        "Pastel Fashion",
        "Feminine Style",
        "Soft Girl Aesthetic",
        "Cottagecore Fashion",
      ],
    },
    card: {
      description: "Soft florals, ruffles and delicate details in pastel palettes",
      tags: ["Floral", "Ruffle", "Pastel", "Midi"],
      badge: "New",
    },
    highlights: [
      "Soft floral prints in watercolour and ditsy scales lead the romantic fashion moment",
      "Ruffles at the hem, sleeve and neckline add movement and delicacy",
      "Pastel palettes — blush, lilac and powder blue — replace stark minimalism",
      "Midi and maxi lengths restore a graceful, fluid silhouette to everyday dressing",
    ],
  },
}

export function getTrendAestheticConfig(slug: string): TrendCollectionConfig {
  return TREND_AESTHETIC_CONFIGS[slug] ?? makeDefaultTrendConfig(slug)
}

export function getTrendAestheticCard(slug: string): CollectionItem {
  const cfg = getTrendAestheticConfig(slug)
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

// ── Category Configs ──────────────────────────────────────────────────────────

export const TREND_CATEGORY_ORDER = [
  "outfit-trends",
  "hair-trends",
  "accessory-trends",
]

export const TREND_CATEGORY_CONFIGS: Record<string, TrendCollectionConfig> = {
  "outfit-trends": {
    label: "Outfit Trends",
    description: "The most-wanted looks in clothing — from runway to real life",
    accent: "bg-[#f3e5f5]",
    accentText: "text-[#6a1b9a]",
    sanityFilter: 'category == "fashion"',
    seo: {
      title: "Outfit Trends – Most-Wanted Clothing Looks Right Now",
      description:
        "Discover the most-wanted outfit trends: key silhouettes, colour stories, statement pieces and the looks defining fashion right now.",
      keywords: [
        "Outfit Trends",
        "Fashion Trends",
        "Clothing Trends",
        "What to Wear Trend",
        "Key Pieces Trend",
        "Silhouette Trends",
        "Color Trends Fashion",
        "Style Trends",
      ],
    },
    card: {
      description: "The most-wanted looks in clothing — from runway to real life",
      tags: ["Looks", "Silhouette", "Color", "Key Pieces"],
      badge: "New",
    },
    highlights: [
      "Key silhouettes and cuts defining the current fashion season",
      "Colour stories and palette directions from the major runway shows",
      "Statement pieces worth investing in versus trend-driven fast buys",
      "Wearable translations of runway looks for real-life styling",
    ],
  },

  "hair-trends": {
    label: "Hair Trends",
    description: "Cuts, colours and styling techniques setting the tone this season",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    sanityFilter: 'category == "hairstyle"',
    seo: {
      title: "Hair Trends – Cuts, Colours & Styling Techniques This Season",
      description:
        "Explore the latest hair trends: new cuts, colour techniques, styling ideas and the looks setting the tone in hairstyle this season.",
      keywords: [
        "Hair Trends",
        "Hairstyle Trends",
        "Hair Colour Trends",
        "Haircut Trends",
        "Hair Styling Trends",
        "New Hair Trends",
        "Trendy Haircuts",
        "Hair Color Ideas",
      ],
    },
    card: {
      description: "Cuts, colours and styling techniques setting the tone this season",
      tags: ["Cut", "Colour", "Texture", "Styling"],
      badge: "New",
    },
    highlights: [
      "The headline cuts of the season — from micro fringe to long layers",
      "Colour techniques including balayage, glazing and bold single-process shades",
      "Texture-forward styling: natural waves, lived-in blowouts and braided looks",
      "Low-maintenance options for real life alongside editorial statement styles",
    ],
  },

  "accessory-trends": {
    label: "Accessory Trends",
    description: "Bags, shoes and jewellery — the finishing touches every look needs",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    sanityFilter: 'category == "accessories"',
    seo: {
      title: "Accessory Trends – Bags, Shoes & Jewellery Right Now",
      description:
        "Discover the latest accessory trends: it-bags, statement shoes, jewellery and the finishing touches that define the season's best looks.",
      keywords: [
        "Accessory Trends",
        "Bag Trends",
        "Shoe Trends",
        "Jewellery Trends",
        "It Bag Season",
        "Statement Accessories",
        "Fashion Accessories",
        "Trending Shoes",
      ],
    },
    card: {
      description: "Bags, shoes and jewellery — the finishing touches every look needs",
      tags: ["Bags", "Shoes", "Jewellery", "Statement"],
      badge: "New",
    },
    highlights: [
      "The season's it-bags — from micro clutches to oversized totes",
      "Footwear directions: which heels, boots and flats are dominating right now",
      "Jewellery layering techniques and the standout pieces worth buying",
      "How accessories can shift the entire register of any outfit",
    ],
  },
}

export function getTrendCategoryConfig(slug: string): TrendCollectionConfig {
  return TREND_CATEGORY_CONFIGS[slug] ?? makeDefaultTrendConfig(slug)
}

export function getTrendCategoryCard(slug: string): CollectionItem {
  const cfg = getTrendCategoryConfig(slug)
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

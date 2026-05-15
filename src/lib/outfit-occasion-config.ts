// Tüm occasion verilerinin tek kaynağı — occasion/[slug]/page.tsx bu dosyadan okur.
import type { CategoryData, OutfitItem } from "@/types/outfit-category"
import type { CollectionItem } from "@/components/shared/CollectionCard"

export type OccasionConfig = Omit<CategoryData, "outfits"> & {
  card: { description: string; tags: string[]; badge?: string }
  staticFallback?: OutfitItem[]
}

// Slug'u "Date Night" formatına çevirir
function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

// Bilinmeyen slug için generic config üretir
export function makeDefaultOccasionConfig(slug: string): OccasionConfig {
  const label = slugToLabel(slug)
  return {
    label,
    subtitle: "Curated Looks",
    description: `Discover curated outfit collections for ${label.toLowerCase()} occasions.`,
    accent: "bg-gray-100",
    accentText: "text-gray-700",
    tipTitle: "Style tip,",
    tipBody: "Choose pieces that make you feel confident and comfortable.",
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
      description: `Discover curated outfit collections for ${label.toLowerCase()} occasions.`,
      keywords: [`${label} Outfit`, `${label} Look`, `${label} Style`],
    },
    card: {
      description: `Curated looks for ${label.toLowerCase()} occasions.`,
      tags: ["Outfit", "Style"],
      badge: "New",
    },
  }
}

// Config veya default döndürür — notFound() çağrılmaz
export function getOccasionConfig(slug: string): OccasionConfig {
  return OCCASION_CONFIGS[slug] ?? makeDefaultOccasionConfig(slug)
}

const OCCASION_IMAGES: Record<string, string> = {
  office:  "/categories/outfits/office.jpeg",
  evening: "/categories/outfits/evening.jpeg",
  casual:  "/categories/outfits/casual.png",
  sport:   "/categories/outfits/sport.png",
  school:  "/categories/outfits/school.png",
  travel:  "/categories/outfits/travel.jpeg",
}

// CollectionCard için CollectionItem döndürür
export function getOccasionCard(slug: string): CollectionItem {
  const cfg = getOccasionConfig(slug)
  return {
    slug,
    label: cfg.label,
    description: cfg.card.description,
    tags: cfg.card.tags,
    badge: cfg.card.badge ?? "New",
    accent: cfg.accent,
    accentText: cfg.accentText,
    active: true,
    image: OCCASION_IMAGES[slug],
  }
}

// Koleksiyon sayfalarında görüntülenme sırası
export const OCCASION_ORDER = [
  "office",
  "evening",
  "casual",
  "beach",
  "festival",
  "date-night",
  "party-night-out",
  "sport",
  "school",
  "travel",
]

// Tüm occasion config'leri
export const OCCASION_CONFIGS: Record<string, OccasionConfig> = {
  office: {
    label: "Office & Business",
    subtitle: "Professional & Polished",
    description:
      "Tailored blazers, elegant trousers and clever combinations – discover curated business outfits for meetings, the office and all professional occasions.",
    accent: "bg-[#f3e5f5]",
    accentText: "text-[#6a1b9a]",
    tipTitle: "Confidence starts with the right outfit,",
    tipBody:
      "A good business outfit connects professionalism with personal style – first impressions count.",
    tipTags: ["Blazer", "Tailoring", "Neutral", "Polished"],
    filters: ["All", "Blazer", "Tailoring", "Smart Casual", "Meeting", "Casual Friday", "Elegant"],
    outfitGridLabel: "Latest Business Looks",
    styleGuideHref: "/blog/occasion-guides/office-style-guide",
    stats: [
      { value: "50+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Classic Style",   href: "/outfits/style/classic",    accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Minimalist",      href: "/outfits/style/minimalist", accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Evening & Event", href: "/outfits/occasion/evening", accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Winter Outfits",  href: "/outfits/season/winter",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "What do you wear to an important meeting?",
        a: "A well-fitting blazer in black, navy or camel over a solid blouse or turtleneck, paired with tailored trousers or a midi skirt, is the safe choice for important meetings. Keep accessories minimal and high quality.",
      },
      {
        q: "What is business casual?",
        a: "Business casual falls between formal and relaxed: chinos or smart trousers instead of suit trousers, a neat shirt or blouse without a tie, a structured blazer or cardigan. Sneakers are often acceptable in modern offices if they are clean and simple.",
      },
      {
        q: "Which colors work best in the office?",
        a: "Neutral tones like black, navy, grey, camel and cream are the reliable base palette. Accents in bordeaux, dark green or deep blue add personality without dominating. Soft pastels feel fresh and professional in summer.",
      },
    ],
    seo: {
      title: "Office & Business Outfits – Professional & Polished",
      description:
        "Discover curated business outfits: blazer looks, tailoring combinations and smart-casual outfits for the office, meetings and all professional occasions.",
      keywords: ["Business Outfit Women", "Office Outfit", "Office Look", "Blazer Outfit", "Business Casual", "Work Outfit Women", "Meeting Outfit", "Professional Style"],
    },
    card: {
      description: "Polished and professional – looks for meetings, office and more",
      tags: ["Blazer", "Tailoring", "Neutral", "Polished"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Power Blazer Set",       subtitle: "Meeting & Presentation", tag: "Trending", style: "Blazer",        href: "/outfits/power-blazer-set"       },
      { id: 2, title: "Tailored Wide-Leg Look", subtitle: "Office & Everyday",      tag: "Popular",  style: "Tailoring",     href: "/outfits/tailored-wide-leg"      },
      { id: 3, title: "Minimal Shirt Dress",    subtitle: "Smart Casual",           tag: "New",      style: "Smart Casual",  href: "/outfits/minimal-shirt-dress"    },
      { id: 4, title: "Monochrome Office Look", subtitle: "Clean & Professional",   tag: "Trending", style: "Neutral",       href: "/outfits/monochrome-office"      },
      { id: 5, title: "Pencil Skirt Combo",     subtitle: "Classic Business",       tag: "Popular",  style: "Tailoring",     href: "/outfits/pencil-skirt-combo"     },
      { id: 6, title: "Casual Friday Look",     subtitle: "Relaxed & Stylish",      tag: "New",      style: "Casual Friday", href: "/outfits/casual-friday-look"     },
      { id: 7, title: "Structured Midi Dress",  subtitle: "Conference & Event",     tag: "Trending", style: "Elegant",       href: "/outfits/structured-midi-dress"  },
      { id: 8, title: "Linen Blazer Outfit",    subtitle: "Summer Business",        tag: "New",      style: "Blazer",        href: "/outfits/linen-blazer-outfit"    },
    ],
  },

  evening: {
    label: "Evening & Event",
    subtitle: "Glamorous & Unforgettable",
    description:
      "Elegant dresses, statement looks and evening outfits for dinners, parties and special occasions – so you leave a lasting impression.",
    accent: "bg-gray-900",
    accentText: "text-white",
    tipTitle: "The evening is yours,",
    tipBody:
      "A good evening outfit combines elegance with confidence – for dinner, gala or cocktail party.",
    tipTags: ["Midi", "Silk", "Statement", "Elegant"],
    filters: ["All", "Midi", "Maxi", "Mini", "Cocktail", "Gala", "Dinner"],
    outfitGridLabel: "Latest Evening Looks",
    styleGuideHref: "/blog/occasion-guides/evening-style-guide",
    stats: [
      { value: "45+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Date Night",        href: "/outfits/occasion/date-night", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Classic Style",     href: "/outfits/style/classic",       accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Winter Outfits",    href: "/outfits/season/winter",       accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Office & Business", href: "/outfits/occasion/office",     accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
    ],
    faqs: [
      {
        q: "What do you wear to a formal dinner?",
        a: "An elegant midi dress in black, navy or burgundy is the classic choice. Alternatively, satin palazzo trousers with an elegant blouse look very chic. Choose high-quality fabrics like silk, satin or velvet and complete the look with understated jewelry and heels.",
      },
      {
        q: "What is the difference between cocktail and black-tie dress codes?",
        a: "Cocktail means knee-length to midi dresses or elegant trouser suits – festive, but not necessarily a ball gown. Black tie calls for floor-length evening gowns or very formal midi dresses in fine fabrics. Semi-formal falls in between and allows more flexibility.",
      },
      {
        q: "Which shoes pair with evening outfits?",
        a: "Pointed stilettos add elegance to any evening look. Strappy sandals with a block heel are more comfortable and equally glamorous. For a modern touch, flat mules or kitten heels in metallic tones also work beautifully with festive outfits.",
      },
    ],
    seo: {
      title: "Evening & Event Outfits – Elegant Looks for Special Occasions",
      description:
        "Discover curated evening outfits: midi dresses, cocktail looks and gala outfits for dinners, parties and unforgettable evenings.",
      keywords: ["Evening Outfit Women", "Evening Dress Outfit", "Event Outfit", "Cocktail Outfit", "Evening Look", "Elegant Outfit", "Party Outfit Women", "Gala Outfit"],
    },
    card: {
      description: "Elegant outfits for dinners, parties and special occasions",
      tags: ["Midi", "Silk", "Statement", "Elegant"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Silk Slip Dress",       subtitle: "Dinner & Cocktail",    tag: "Trending", style: "Midi",     href: "/outfits/silk-slip-dress"        },
      { id: 2, title: "Velvet Midi Dress",      subtitle: "Gala & Event",         tag: "Popular",  style: "Midi",     href: "/outfits/velvet-midi-dress"      },
      { id: 3, title: "Sequin Mini Look",       subtitle: "Party & Club",         tag: "New",      style: "Mini",     href: "/outfits/sequin-mini-look"       },
      { id: 4, title: "Black Tie Maxi",         subtitle: "Gala & Wedding",       tag: "Trending", style: "Maxi",     href: "/outfits/black-tie-maxi"         },
      { id: 5, title: "Blazer & Satin Pants",   subtitle: "Cocktail & Dinner",    tag: "Popular",  style: "Cocktail", href: "/outfits/blazer-satin-pants"     },
      { id: 6, title: "Wrap Evening Dress",     subtitle: "Restaurant & Theatre", tag: "New",      style: "Midi",     href: "/outfits/wrap-evening-dress"     },
      { id: 7, title: "Feather Trim Look",      subtitle: "Statement & Bold",     tag: "Trending", style: "Gala",     href: "/outfits/feather-trim-look"      },
      { id: 8, title: "Classic LBD Elevated",  subtitle: "Timeless & Elegant",   tag: "New",      style: "Elegant",  href: "/outfits/classic-lbd-elevated"   },
    ],
  },

  casual: {
    label: "Casual & Everyday",
    subtitle: "Comfortable & Stylish",
    description:
      "Comfortable basics, relaxed combinations and everyday looks that feel effortlessly stylish – for every day without compromise.",
    accent: "bg-[#fff8e1]",
    accentText: "text-[#f57f17]",
    tipTitle: "Effortless style every day,",
    tipBody:
      "Casual doesn't mean boring – the right basics and a good fit make all the difference.",
    tipTags: ["Denim", "Basics", "Comfort", "Layering"],
    filters: ["All", "Denim", "Basics", "Layering", "Weekend", "Sporty", "Cozy"],
    outfitGridLabel: "Latest Casual Looks",
    styleGuideHref: "/blog/occasion-guides/casual-style-guide",
    stats: [
      { value: "75+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Street Style",  href: "/outfits/style/streetstyle", accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Minimalist",    href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Weekend Looks", href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Spring Looks",  href: "/outfits/season/spring",     accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
    ],
    faqs: [
      {
        q: "How do you make a simple casual look stand out?",
        a: "Details make the difference: a white tee looks instantly polished with well-fitting straight-leg jeans and white sneakers. Add a structured blazer or leather jacket for an immediate upgrade. High-quality basics and a good fit are everything.",
      },
      {
        q: "What are the must-have basics for a casual wardrobe?",
        a: "White tee, grey sweatshirt, well-fitting straight jeans, linen trousers in beige or black, a simple midi dress, classic sneakers and a denim or leather jacket form the perfect casual foundation for endless combinations.",
      },
      {
        q: "How do you style sneakers elegantly?",
        a: "Clean white sneakers go with almost everything – from midi skirts to blazer outfits. Chunky sneakers give feminine looks a modern contrast. The key: sneakers should be clean and in good condition. A simple, sporty shoe elevates the entire outfit.",
      },
    ],
    seo: {
      title: "Casual & Everyday Outfits – Comfortable, Stylish & Effortless",
      description:
        "Discover curated casual outfits: denim looks, relaxed basics, layering combinations and everyday looks for every day without compromise.",
      keywords: ["Casual Outfit Women", "Everyday Outfit", "Relaxed Outfits", "Casual Look", "Basic Outfit", "Weekend Outfit", "Casual Chic", "Everyday Style"],
    },
    card: {
      description: "Comfortable, stylish everyday looks for relaxed days",
      tags: ["Denim", "Basics", "Comfort", "Layering"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "White Tee & Straight Jeans", subtitle: "Everyday Essential", tag: "Trending", style: "Basics",   href: "/outfits/white-tee-straight-jeans" },
      { id: 2, title: "Cozy Knit & Wide Leg",       subtitle: "Weekend & Relax",    tag: "Popular",  style: "Cozy",     href: "/outfits/cozy-knit-wide-leg"       },
      { id: 3, title: "Denim Jacket Layer",          subtitle: "Street & Casual",    tag: "New",      style: "Layering", href: "/outfits/denim-jacket-layer"       },
      { id: 4, title: "Linen Shirt Outfit",          subtitle: "Summer Everyday",    tag: "Trending", style: "Basics",   href: "/outfits/linen-shirt-outfit"       },
      { id: 5, title: "Sweatshirt & Midi Skirt",     subtitle: "Casual Chic",        tag: "Popular",  style: "Denim",    href: "/outfits/sweatshirt-midi-skirt"    },
      { id: 6, title: "Oversized Blazer & Jeans",   subtitle: "Smart Casual",       tag: "New",      style: "Layering", href: "/outfits/oversized-blazer-jeans"   },
      { id: 7, title: "Sporty Chic Look",            subtitle: "Athleisure & City",  tag: "Trending", style: "Sporty",   href: "/outfits/sporty-chic-look"         },
      { id: 8, title: "Flowy Midi & Sneakers",       subtitle: "Feminine Casual",    tag: "New",      style: "Basics",   href: "/outfits/flowy-midi-sneakers"      },
    ],
  },

  beach: {
    label: "Beach & Vacation",
    subtitle: "Beach & Vacation Vibes",
    description:
      "Light cover-ups, summery dresses and vacation looks – discover curated beach outfits for the sea, pool and summer holidays.",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    tipTitle: "Sun, sea & style,",
    tipBody:
      "The perfect beach look is light, breezy and still stylish – from morning by the sea to sunset.",
    tipTags: ["Linen", "Cover-up", "Maxi", "Kaftan"],
    filters: ["All", "Cover-up", "Maxi", "Mini", "Kaftan", "Linen", "Boho"],
    outfitGridLabel: "Latest Beach Looks",
    styleGuideHref: "/blog/occasion-guides/beach-style-guide",
    stats: [
      { value: "55+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Summer Dresses",   href: "/outfits/season/summer",     accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Boho Style",       href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Festival Style",   href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Casual & Everyday",href: "/outfits/occasion/casual",   accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
    ],
    faqs: [
      {
        q: "What do you wear over a bikini at the beach?",
        a: "A light linen cover-up dress is the most versatile option – it works from the beach to a beach restaurant. Alternatively, kaftans in colorful prints or simple tones are an elegant companion. Denim shorts with an open linen blouse create a relaxed look.",
      },
      {
        q: "What do you wear in the evening at your vacation destination?",
        a: "A flowing maxi dress in vibrant summer colors or a boho print is perfect for sundowners and dinner at your vacation spot. With flat sandals and gold jewelry, the look becomes effortlessly glamorous without being formal.",
      },
      {
        q: "What materials are ideal for beach outfits?",
        a: "Linen is the ultimate beach material – breathable, dries quickly and looks chic even crumpled. Cotton jersey and viscose are also great options. Avoid synthetic materials that can become uncomfortable in the heat.",
      },
    ],
    seo: {
      title: "Beach & Vacation Outfits – Beach Looks for Summer",
      description:
        "Discover curated beach outfits: cover-ups, maxi dresses, kaftans and vacation looks for beach, pool and summer evenings.",
      keywords: ["Beach Outfit", "Beach Look", "Vacation Outfit", "Cover-up Dress", "Beach Fashion", "Beach Style", "Summer Holiday Outfit", "Kaftan Outfit"],
    },
    card: {
      description: "Beach vibes, cover-ups and summery vacation looks",
      tags: ["Linen", "Cover-up", "Maxi", "Kaftan"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Linen Cover-up Dress",  subtitle: "Beach & Pool",           tag: "Trending", style: "Cover-up", href: "/outfits/linen-cover-up-dress"   },
      { id: 2, title: "Boho Beach Maxi",        subtitle: "Vacation & Relaxation",  tag: "Popular",  style: "Maxi",     href: "/outfits/boho-beach-maxi"        },
      { id: 3, title: "Crochet Mini & Shorts", subtitle: "Beach & Casual",          tag: "New",      style: "Mini",     href: "/outfits/crochet-mini-shorts"    },
      { id: 4, title: "Stripe Linen Set",       subtitle: "Promenade & Café",        tag: "Trending", style: "Linen",    href: "/outfits/stripe-linen-set"       },
      { id: 5, title: "Kaftan Look",            subtitle: "Pool & Sundowner",        tag: "Popular",  style: "Kaftan",   href: "/outfits/kaftan-look"            },
      { id: 6, title: "Denim Cut-off & Blouse",subtitle: "Beach Stroll",            tag: "New",      style: "Casual",   href: "/outfits/denim-cutoff-blouse"    },
      { id: 7, title: "White Maxi Beach Dress",subtitle: "Elegant by the Sea",      tag: "Trending", style: "Maxi",     href: "/outfits/white-maxi-beach-dress" },
      { id: 8, title: "Resort Coord Set",      subtitle: "Luxury & Vacation",       tag: "New",      style: "Cover-up", href: "/outfits/resort-coord-set"       },
    ],
  },

  festival: {
    label: "Festival & Outdoor",
    subtitle: "Boho, Bold & Free",
    description:
      "Fringe, denim, floral prints and playful layering looks – discover curated festival outfits for open air events, concerts and outdoor occasions.",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    tipTitle: "Dance like nobody's watching,",
    tipBody:
      "The perfect festival outfit is comfortable, expressive and survives a long day in the sun.",
    tipTags: ["Boho", "Denim", "Fringe", "Floral"],
    filters: ["All", "Boho", "Denim", "Floral", "Fringe", "Layering", "Bold"],
    outfitGridLabel: "Latest Festival Looks",
    styleGuideHref: "/blog/occasion-guides/festival-style-guide",
    stats: [
      { value: "50+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Boho Style",      href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Summer Dresses",  href: "/outfits/season/summer",     accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Street Style",    href: "/outfits/style/streetstyle", accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Beach & Vacation",href: "/outfits/occasion/beach",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "What do you wear to an outdoor festival?",
        a: "Priority is comfort and practicality: comfortable shoes (boots or sneakers), breathable fabrics and layerable pieces. A floral boho dress with cowboy boots, or denim shorts with an embroidered top and fringe vest are classic festival looks.",
      },
      {
        q: "How do you protect yourself from the weather at a festival?",
        a: "A light kimono or denim jacket for cooler evenings, a hat for sun protection and a small backpack instead of a handbag are practical festival essentials. Choose fabrics that still look good after a long day – linen and jersey are ideal.",
      },
      {
        q: "Which shoes do you wear at festivals?",
        a: "Cowboy boots are the classic festival shoe – they look great, are sturdy and provide support. Chunky sandals with a platform sole or robust sneakers also work well. Avoid heels on uneven festival grounds.",
      },
    ],
    seo: {
      title: "Festival & Outdoor Outfits – Boho, Bold & Unforgettable",
      description:
        "Discover curated festival outfits: boho dresses, denim looks, fringe styles and playful combinations for open air events, concerts and outdoor occasions.",
      keywords: ["Festival Outfit Women", "Open Air Outfit", "Boho Festival Look", "Concert Outfit", "Festival Fashion", "Outdoor Outfit", "Summer Festival Outfit", "Fringe Outfit"],
    },
    card: {
      description: "Boho, denim and playful layering looks for open air",
      tags: ["Boho", "Denim", "Fringe", "Floral"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Boho Fringe Dress",      subtitle: "Festival & Open Air", tag: "Trending", style: "Boho",     href: "/outfits/boho-fringe-dress"      },
      { id: 2, title: "Denim & Crop Top",        subtitle: "Concert & Outdoor",   tag: "Popular",  style: "Denim",    href: "/outfits/denim-crop-top"         },
      { id: 3, title: "Floral Maxi & Boots",     subtitle: "Boho & Wild",         tag: "New",      style: "Floral",   href: "/outfits/floral-maxi-boots"      },
      { id: 4, title: "Crochet & Denim Shorts", subtitle: "Summer Festival",     tag: "Trending", style: "Boho",     href: "/outfits/crochet-denim-shorts"   },
      { id: 5, title: "Embroidered Midi Look",   subtitle: "Playful & Feminine",  tag: "Popular",  style: "Floral",   href: "/outfits/embroidered-midi-look"  },
      { id: 6, title: "Layered Boho Set",        subtitle: "Layering & Style",    tag: "New",      style: "Layering", href: "/outfits/layered-boho-set"       },
      { id: 7, title: "Tie-Dye & Wide Leg",      subtitle: "Retro & Bold",        tag: "Trending", style: "Bold",     href: "/outfits/tie-dye-wide-leg"       },
      { id: 8, title: "Western Fringe Jacket",   subtitle: "Statement Look",      tag: "New",      style: "Fringe",   href: "/outfits/western-fringe-jacket"  },
    ],
  },

  "date-night": {
    label: "Date Night",
    subtitle: "Romantic & Confident",
    description:
      "Romantic dresses, confident combinations and looks that leave a lasting impression – for an unforgettable evening.",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    tipTitle: "Dress for the moment,",
    tipBody:
      "A good date night outfit radiates confidence – choose something you truly feel good in.",
    tipTags: ["Midi", "Romantic", "Bold", "Feminine"],
    filters: ["All", "Midi", "Mini", "Maxi", "Romantic", "Bold", "Elegant"],
    outfitGridLabel: "Latest Date Night Looks",
    styleGuideHref: "/blog/occasion-guides/date-night-style-guide",
    stats: [
      { value: "40+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Evening & Event",href: "/outfits/occasion/evening",  accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Classic Style",  href: "/outfits/style/classic",     accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Minimalist",     href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Summer Dresses", href: "/outfits/season/summer",     accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
    ],
    faqs: [
      {
        q: "What do you wear on a first date?",
        a: "Choose something you truly feel comfortable and confident in. A well-fitting midi dress or an elegant casual outfit is usually the best choice – it shows effort without looking overdressed. Avoid completely new, unworn pieces since you won't know how they feel.",
      },
      {
        q: "What is the perfect date night outfit for a restaurant date?",
        a: "A wrap midi in satin or viscose is the classic and safe choice. Alternatively: a silky blouse with well-fitting trousers or a midi skirt. Complete the look with subtle heels or elegant sandals and minimal, high-quality jewelry.",
      },
      {
        q: "How do you transform an everyday outfit into a date night look?",
        a: "Simple upgrades: swap sneakers for heels or elegant sandals, add a satin clutch, replace the everyday top with something silkier or featuring a special detail (neckline, open back). A red lipstick transforms any look.",
      },
    ],
    seo: {
      title: "Date Night Outfits – Romantic & Confident Looks",
      description:
        "Discover curated date night outfits: romantic dresses, elegant combinations and confident looks for unforgettable evenings.",
      keywords: ["Date Night Outfit", "Date Outfit Women", "Romantic Outfit", "First Date Outfit", "Evening Look Date", "Date Look", "Romantic Fashion", "Dinner Date Outfit"],
    },
    card: {
      description: "Romantic and confident looks for unforgettable evenings",
      tags: ["Midi", "Romantic", "Bold", "Feminine"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Wrap Satin Midi",        subtitle: "Dinner & Romance",    tag: "Trending", style: "Midi",     href: "/outfits/wrap-satin-midi"        },
      { id: 2, title: "Floral Midi Dress",       subtitle: "Café & Stroll",       tag: "Popular",  style: "Romantic", href: "/outfits/floral-date-midi"       },
      { id: 3, title: "Leather Mini Skirt Look",subtitle: "Bold & Confident",    tag: "New",      style: "Bold",     href: "/outfits/leather-mini-skirt"     },
      { id: 4, title: "Slip Dress & Blazer",     subtitle: "Casual Chic Date",    tag: "Trending", style: "Elegant",  href: "/outfits/slip-dress-blazer"      },
      { id: 5, title: "Off-Shoulder Mini",       subtitle: "Feminine & Flirty",   tag: "Popular",  style: "Mini",     href: "/outfits/off-shoulder-mini"      },
      { id: 6, title: "Wide Leg & Silk Top",     subtitle: "Sophisticated Date",  tag: "New",      style: "Elegant",  href: "/outfits/wide-leg-silk-top"      },
      { id: 7, title: "Lace Detail Dress",       subtitle: "Romantic & Delicate", tag: "Trending", style: "Romantic", href: "/outfits/lace-detail-dress"      },
      { id: 8, title: "Monochrome Bold Set",     subtitle: "Statement & Strong",  tag: "New",      style: "Bold",     href: "/outfits/monochrome-bold-set"    },
    ],
  },

  sport: {
    label: "Sport & Outdoor",
    subtitle: "Active & Functional",
    description:
      "Athletic, functional and stylish – discover curated sport and outdoor outfits for the gym, trail, court and active lifestyle.",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    tipTitle: "Performance meets style,",
    tipBody:
      "The best sport outfit moves with you – breathable fabrics, the right fit and a touch of personal style.",
    tipTags: ["Athleisure", "Running", "Outdoor", "Active"],
    filters: ["All", "Athleisure", "Running", "Tennis", "Yoga", "Hiking", "Activewear"],
    outfitGridLabel: "Latest Sport & Outdoor Looks",
    styleGuideHref: "/blog/occasion-guides/sport-style-guide",
    stats: [
      { value: "40+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Casual & Everyday",  href: "/outfits/occasion/casual",    accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
      { label: "Festival & Outdoor", href: "/outfits/occasion/festival",  accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Street Style",       href: "/outfits/style/streetstyle",  accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Summer Dresses",     href: "/outfits/season/summer",      accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
    ],
    faqs: [
      {
        q: "How do you make an athleisure look stylish?",
        a: "The key is fit and fabric quality. Well-fitting leggings or joggers paired with a structured crop or oversized hoodie, plus clean sneakers and minimal accessories, elevate athleisure from gym to street instantly.",
      },
      {
        q: "What do you wear for outdoor activities like hiking?",
        a: "Layering is essential: a moisture-wicking base layer, a lightweight mid-layer and a wind-resistant outer shell. Functional trousers or shorts in stretch fabric, trail shoes and a small backpack complete a practical yet stylish outdoor look.",
      },
      {
        q: "Which fabrics work best for sport outfits?",
        a: "Look for moisture-wicking synthetics like polyester and nylon blends for high-intensity activities. For yoga and casual gym sessions, soft cotton-elastane blends offer comfort and flexibility. Merino wool is excellent for outdoor activities – it regulates temperature and resists odor.",
      },
    ],
    seo: {
      title: "Sport & Outdoor Outfits – Athletic & Stylish Looks",
      description:
        "Discover curated sport and outdoor outfits: athleisure looks, tennis outfits, hiking styles and activewear combinations for every active lifestyle.",
      keywords: ["Sport Outfit Women", "Athleisure Outfit", "Tennis Outfit", "Gym Outfit", "Outdoor Outfit Women", "Active Style", "Sport Fashion", "Activewear Look"],
    },
    card: {
      description: "Athletic, functional and stylish – for the gym, trail, court and active lifestyle",
      tags: ["Athleisure", "Tennis", "Outdoor", "Active"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Sportive Tennis Outfit",  subtitle: "Court & Active",       tag: "Trending", style: "Sporty",     href: "/outfits/sportive-tennis-outfit"  },
      { id: 2, title: "Athleisure City Look",     subtitle: "Gym to Street",        tag: "Popular",  style: "Athleisure", href: "/outfits/athleisure-city-look"    },
      { id: 3, title: "Trail Running Set",        subtitle: "Outdoor & Trail",      tag: "New",      style: "Running",    href: "/outfits/trail-running-set"       },
      { id: 4, title: "Yoga Studio Outfit",       subtitle: "Studio & Wellness",    tag: "Trending", style: "Sporty",     href: "/outfits/yoga-studio-outfit"      },
      { id: 5, title: "Hiking Chic Look",         subtitle: "Mountain & Nature",    tag: "Popular",  style: "Outdoor",    href: "/outfits/hiking-chic-look"        },
      { id: 6, title: "Cycling Style Outfit",     subtitle: "Bike & Urban Active",  tag: "New",      style: "Activewear", href: "/outfits/cycling-style-outfit"    },
      { id: 7, title: "Beach Volleyball Look",    subtitle: "Beach & Active",       tag: "Trending", style: "Sporty",     href: "/outfits/beach-volleyball-look"   },
      { id: 8, title: "Weekend Sporty Casual",    subtitle: "Athleisure & Relax",   tag: "New",      style: "Athleisure", href: "/outfits/weekend-sporty-casual"   },
    ],
  },

  school: {
    label: "School & College",
    subtitle: "Campus-Ready Everyday",
    description:
      "Comfortable, put-together and backpack-friendly – discover curated school and college outfits for lectures, campus days and student life without sacrificing personal style.",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    tipTitle: "Look polished, stay comfortable,",
    tipBody:
      "The best campus outfit moves with you from morning lecture to evening study session – versatile layering and comfortable shoes are non-negotiable.",
    tipTags: ["Casual", "Layering", "Denim", "Basics"],
    filters: ["All", "Casual", "Layering", "Denim", "Basics", "Smart Casual", "Cozy"],
    outfitGridLabel: "Latest School & College Looks",
    styleGuideHref: "/blog/occasion-guides/school-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Casual & Everyday", href: "/outfits/occasion/casual",      accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
      { label: "Street Style",      href: "/outfits/style/streetstyle",    accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Minimalist",        href: "/outfits/style/minimalist",     accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Sport & Outdoor",   href: "/outfits/occasion/sport",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
    ],
    faqs: [
      {
        q: "What do you wear to university on a regular day?",
        a: "A reliable campus formula: straight-leg jeans or relaxed chinos, a clean graphic tee or simple knit, a denim or bomber jacket for layering, and comfortable sneakers or loafers. A structured tote or backpack completes the look. The goal is an outfit you can wear for eight hours without thinking about it.",
      },
      {
        q: "How do you look stylish in school without trying too hard?",
        a: "Invest in well-fitting basics in neutral tones – they combine easily and always look intentional. A quality hoodie, a good pair of jeans and clean white sneakers is a formula that never fails. Add one personal detail – a vintage tee, an interesting bag or a patterned knit – to make it yours.",
      },
      {
        q: "What shoes work best for a full day on campus?",
        a: "Comfort is paramount for a day of walking between buildings. Clean white sneakers, low-top canvas shoes and leather loafers cover most style directions while keeping your feet comfortable. Avoid heels for all-day campus use – save them for evening events. Chunky sneakers in neutral tones are a favourite as they add visual interest without sacrificing comfort.",
      },
    ],
    seo: {
      title: "School & College Outfits – Campus Style That Works",
      description:
        "Discover curated school and college outfits: casual campus looks, layering combinations and student-friendly style for lectures, study days and everyday university life.",
      keywords: ["School Outfit", "College Outfit Women", "Campus Style", "University Outfit", "Student Fashion", "Back to School Outfit", "College Look", "Campus Outfit Ideas"],
    },
    card: {
      description: "Campus-ready looks that are comfortable and stylish",
      tags: ["Casual", "Layering", "Denim", "Basics"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Oversized Hoodie & Straight Jeans", subtitle: "Casual Campus",       tag: "Trending", style: "Casual",       href: "/outfits/oversized-hoodie-straight-jeans"  },
      { id: 2, title: "Knit Cardigan & Midi Skirt",        subtitle: "Smart Campus",         tag: "Popular",  style: "Layering",     href: "/outfits/knit-cardigan-midi-skirt"          },
      { id: 3, title: "Denim Jacket & White Tee",          subtitle: "Everyday College",     tag: "New",      style: "Denim",        href: "/outfits/denim-jacket-white-tee-campus"     },
      { id: 4, title: "Cargo Trousers & Crop Knit",        subtitle: "Utility & Casual",     tag: "Trending", style: "Basics",       href: "/outfits/cargo-trousers-crop-knit"          },
      { id: 5, title: "Pleated Skirt & Loafers",           subtitle: "Preppy & Polished",    tag: "Popular",  style: "Smart Casual", href: "/outfits/pleated-skirt-loafers"             },
      { id: 6, title: "Linen Shirt & Wide-Leg Pants",      subtitle: "Relaxed Everyday",     tag: "New",      style: "Basics",       href: "/outfits/linen-shirt-wide-leg-campus"       },
      { id: 7, title: "Sweatshirt & Biker Shorts",         subtitle: "Sporty Campus",        tag: "Trending", style: "Casual",       href: "/outfits/sweatshirt-biker-shorts"           },
      { id: 8, title: "Blazer & Joggers Combo",            subtitle: "Smart Athleisure",     tag: "New",      style: "Smart Casual", href: "/outfits/blazer-joggers-campus"             },
    ],
  },

  "party-night-out": {
    label: "Party & Night Out",
    subtitle: "Bold, Glam & After-Dark",
    description:
      "Sequins, mini dresses, bold statement looks and outfits built for the night – discover curated party and night out outfits for club nights, birthdays, bar crawls and every occasion that calls for your best.",
    accent: "bg-gray-900",
    accentText: "text-white",
    tipTitle: "Dress like the night belongs to you,",
    tipBody:
      "A great party outfit balances one statement element with everything else kept simple – let the dress, the sequins or the bold shoe lead, not compete.",
    tipTags: ["Sequin", "Mini", "Bold", "Glam"],
    filters: ["All", "Sequin", "Mini", "Maxi", "Bold", "Club", "Birthday", "Glam"],
    outfitGridLabel: "Latest Party & Night Out Looks",
    styleGuideHref: "/blog/occasion-guides/party-night-out-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Evening & Event",href: "/outfits/occasion/evening",   accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Date Night",     href: "/outfits/occasion/date-night",accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Y2K Style",      href: "/outfits/style/y2k",          accent: "bg-[#f3e5f5]", accentText: "text-[#7b1fa2]" },
      { label: "Black & Dark",   href: "/outfits/style/black-dark",   accent: "bg-gray-900",  accentText: "text-white"     },
    ],
    faqs: [
      {
        q: "What do you wear to a night out at a club?",
        a: "A bodycon or mini dress in a statement fabric (sequin, metallic, velvet) is the classic club choice. Alternatively, a crop top with high-waisted leather or satin trousers offers a more versatile option. Heels or chunky block-heel boots elevate the look. Keep jewelry bold but not bulky – a statement earring paired with a simple chain works best.",
      },
      {
        q: "What is the perfect birthday night out outfit?",
        a: "For a birthday, you want to feel like the main character: a sequin mini dress, a bold cutout gown or a statement two-piece set in a rich jewel tone – emerald, cobalt, deep red. Satin and metallic fabrics photograph beautifully. Add heeled sandals or knee-high boots and a small evening bag. Don't forget: wear something you actually feel amazing in.",
      },
      {
        q: "How do you style a night out outfit that transitions from dinner to dancing?",
        a: "A midi or mini wrap dress in satin or jersey moves from dinner elegantly and dances just as well. A blazer over a bodysuit with tailored trousers is smart enough for dinner and bold enough for after. Swap flat sandals for heeled mules between venues. A small crossbody or chain bag keeps your hands free on the dance floor.",
      },
    ],
    seo: {
      title: "Party & Night Out Outfits – Glam Looks for Every Night",
      description:
        "Discover curated party and night out outfits: sequin dresses, bold minis, glam looks and statement combinations for club nights, birthdays and after-dark occasions.",
      keywords: ["Party Outfit Women", "Night Out Outfit", "Club Outfit Women", "Birthday Outfit", "Glam Outfit", "Sequin Dress Outfit", "Going Out Look", "Party Night Outfit Ideas"],
    },
    card: {
      description: "Sequins, bold minis and glam looks built for the night",
      tags: ["Sequin", "Mini", "Bold", "Glam"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Sequin Mini Dress Look",          subtitle: "Club & Birthday",       tag: "Trending", style: "Sequin", href: "/outfits/sequin-mini-dress-party"            },
      { id: 2, title: "Metallic Crop & Trousers",        subtitle: "Bar & After-Dark",      tag: "Popular",  style: "Bold",   href: "/outfits/metallic-crop-trousers-party"      },
      { id: 3, title: "Velvet Mini Dress",               subtitle: "Dinner to Dancing",     tag: "New",      style: "Mini",   href: "/outfits/velvet-mini-dress-night-out"       },
      { id: 4, title: "Bold Cutout Gown",                subtitle: "Statement & Glam",      tag: "Trending", style: "Maxi",   href: "/outfits/bold-cutout-gown-party"            },
      { id: 5, title: "Leather Mini & Thigh Boots",      subtitle: "Edge & Night",          tag: "Popular",  style: "Bold",   href: "/outfits/leather-mini-thigh-boots"          },
      { id: 6, title: "Blazer & Bodysuit Party Look",    subtitle: "Smart & Sexy",          tag: "New",      style: "Glam",   href: "/outfits/blazer-bodysuit-party"             },
      { id: 7, title: "Slip Dress & Chain Bag",          subtitle: "Effortless Night Out",  tag: "Trending", style: "Glam",   href: "/outfits/slip-dress-chain-bag-night"        },
      { id: 8, title: "Rhinestone & Satin Co-ord",       subtitle: "Birthday & Club",       tag: "New",      style: "Sequin", href: "/outfits/rhinestone-satin-coord-party"       },
    ],
  },

  travel: {
    label: "Travel & Vacation",
    subtitle: "Comfortable & Versatile",
    description:
      "Wrinkle-resistant fabrics, versatile layering and looks that carry you from the airport to sightseeing to dinner – discover curated travel outfits built for long days and new destinations.",
    accent: "bg-[#fff8e1]",
    accentText: "text-[#f57f17]",
    tipTitle: "Pack less, wear more,",
    tipBody:
      "The best travel outfit is one that works across multiple settings – choose pieces that layer, transition from day to evening and survive a long-haul flight without creasing.",
    tipTags: ["Comfortable", "Versatile", "Layering", "Linen"],
    filters: ["All", "Comfortable", "Layering", "Linen", "Casual", "City Break", "Long-Haul"],
    outfitGridLabel: "Latest Travel & Vacation Looks",
    styleGuideHref: "/blog/occasion-guides/travel-style-guide",
    stats: [
      { value: "New", label: "Collection" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Beach & Vacation",   href: "/outfits/occasion/beach",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Casual & Everyday",  href: "/outfits/occasion/casual",   accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
      { label: "Boho Style",         href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Minimalist",         href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
    ],
    faqs: [
      {
        q: "What do you wear on a long-haul flight?",
        a: "Comfort and adaptability are the priorities. Wide-leg trousers or soft straight-cut trousers in a non-creasing fabric, a breathable layering top, and an oversized knit or hoodie for temperature changes work perfectly. Slip-on shoes and compression socks make the journey far more comfortable. Avoid tight waistbands and rough denim for flights over six hours.",
      },
      {
        q: "How do you pack light but still look stylish while traveling?",
        a: "Build a travel capsule around 3-4 neutral base pieces that combine with each other: a pair of dark straight jeans, a white shirt, a knit or light jacket, and a versatile dress. Add 2-3 tops in complementary tones. Everything should work with one pair of walking shoes and one pair of sandals. The fewer the items, the more intentional each combination becomes.",
      },
      {
        q: "What fabrics travel best?",
        a: "Linen is breathable and beautiful but wrinkles easily – best for destinations where a relaxed look is fine. Viscose and modal blends drape well and resist creasing. Jersey cotton is comfortable and forgiving. Avoid 100% cotton shirts for travel as they crease heavily and take long to dry. Lightweight merino wool is exceptional: it regulates temperature, resists odor and barely wrinkles.",
      },
    ],
    seo: {
      title: "Travel & Vacation Outfits – Comfortable Looks for Every Trip",
      description:
        "Discover curated travel outfits: versatile airport looks, wrinkle-resistant combinations and layering styles for city breaks, long-haul flights and sightseeing adventures.",
      keywords: ["Travel Outfit Women", "Airport Outfit", "Vacation Outfit", "Travel Style", "Comfortable Travel Outfit", "City Break Outfit", "Long-Haul Flight Outfit", "Packing Light Fashion"],
    },
    card: {
      description: "Versatile, wrinkle-resistant looks from airport to destination",
      tags: ["Comfortable", "Versatile", "Layering", "Linen"],
      badge: "New",
    },
    staticFallback: [
      { id: 1, title: "Linen Wide-Leg & Tee",          subtitle: "City Break & Stroll",   tag: "Trending", style: "Linen",      href: "/outfits/linen-wide-leg-tee-travel"       },
      { id: 2, title: "Oversized Knit & Straight Jeans",subtitle: "Long-Haul Comfort",     tag: "Popular",  style: "Layering",   href: "/outfits/oversized-knit-straight-jeans"   },
      { id: 3, title: "Jersey Midi Dress & Sneakers",   subtitle: "Sightseeing & Easy",    tag: "New",      style: "Comfortable",href: "/outfits/jersey-midi-dress-sneakers"      },
      { id: 4, title: "Cargo Pants & Linen Shirt",      subtitle: "Utility Travel",        tag: "Trending", style: "Casual",     href: "/outfits/cargo-pants-linen-shirt-travel"  },
      { id: 5, title: "Wrap Dress & Flat Sandals",      subtitle: "Resort to Dinner",      tag: "Popular",  style: "Linen",      href: "/outfits/wrap-dress-flat-sandals-travel"  },
      { id: 6, title: "Trench Coat & Slip-Ons",         subtitle: "Airport & City",        tag: "New",      style: "Layering",   href: "/outfits/trench-coat-slip-ons-travel"     },
      { id: 7, title: "Merino Knit & Tailored Trousers",subtitle: "Long-Haul Elevated",    tag: "Trending", style: "Comfortable",href: "/outfits/merino-knit-tailored-trousers"   },
      { id: 8, title: "Denim Jacket & Midi Skirt",      subtitle: "City Break Versatile",  tag: "New",      style: "Casual",     href: "/outfits/denim-jacket-midi-skirt-travel"  },
    ],
  },
}

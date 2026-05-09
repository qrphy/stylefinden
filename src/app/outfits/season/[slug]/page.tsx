// Mevsime göre outfit kategori sayfası — /outfits/season/[slug] route'u.
// Fallback deseni: Sanity'de slug'a uyan outfit varsa onları göster,
// yoksa STATIC_OUTFITS[slug] dizisine düş. CategoryPage paylaşılan layout'u kullanır.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CategoryData, OutfitItem } from "@/types/outfit-category";
import CategoryPage from "@/components/shared/CategoryPage";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { OUTFITS_BY_SEASON_QUERY } from "@/lib/queries";

// Sanity dökümanını CategoryPage'in beklediği OutfitItem şekline dönüştürür
function toItem(o: {
  _id: string; title: string; slug: string; image?: object; style?: string;
  season?: string; occasion?: string; tags?: string[]; featured?: boolean;
  pieces?: Array<{ _key?: string; name: string; image?: object; affiliateUrl?: string }>
}): OutfitItem {
  return {
    id: o._id,
    title: o.title,
    subtitle: [o.style, o.season ?? o.occasion].filter(Boolean).join(' · '),
    tag: o.featured ? "Trending" : (o.tags?.[0] === "New" ? "New" : "Popular"),
    style: o.style ?? '',
    image: o.image ? urlFor(o.image).width(400).height(533).url() : undefined,
    href: `/outfits/${o.slug}`,
    pieces: o.pieces?.map((p, i) => ({
      key: p._key ?? String(i),
      name: p.name,
      image: p.image ? urlFor(p.image).width(80).height(80).url() : undefined,
      affiliateUrl: p.affiliateUrl,
    })),
  }
}

// Sanity boşken gösterilecek statik fallback verileri — mevsim slug'ına göre diziye erişilir
const STATIC_OUTFITS: Record<string, OutfitItem[]> = {
  "summer": [
    { id: 1, title: "Floral Maxi Dress",   subtitle: "Beach & Vacation",   tag: "Trending", style: "Maxi",     href: "/outfits/floral-maxi-dress"   },
    { id: 2, title: "Linen Slip Dress",    subtitle: "Casual & City",      tag: "New",      style: "Midi",     href: "/outfits/linen-slip-dress"    },
    { id: 3, title: "Boho Wrap Dress",     subtitle: "Festival & Nature",  tag: "Popular",  style: "Maxi",     href: "/outfits/boho-wrap-dress"     },
    { id: 4, title: "Mini Sun Dress",      subtitle: "Summer & Leisure",   tag: "Trending", style: "Mini",     href: "/outfits/mini-sun-dress"      },
    { id: 5, title: "Stripe Midi Dress",   subtitle: "Chic & Modern",      tag: "New",      style: "Midi",     href: "/outfits/stripe-midi-dress"   },
    { id: 6, title: "Off-Shoulder Dress",  subtitle: "Evening & Event",    tag: "Popular",  style: "Midi",     href: "/outfits/off-shoulder-dress"  },
    { id: 7, title: "Cotton Sundress",     subtitle: "Everyday & Picnic",  tag: "Trending", style: "Mini",     href: "/outfits/cotton-sundress"     },
    { id: 8, title: "Flowy Chiffon Dress", subtitle: "Elegant & Light",    tag: "New",      style: "Maxi",     href: "/outfits/flowy-chiffon-dress" },
  ],
  "winter": [
    { id: 1, title: "Classic Wool Coat",      subtitle: "City & Business",   tag: "Trending", style: "Coat",     href: "/outfits/classic-wool-coat"      },
    { id: 2, title: "Chunky Knit Combo",      subtitle: "Casual & Cozy",     tag: "Popular",  style: "Knitwear", href: "/outfits/chunky-knit-combo"      },
    { id: 3, title: "Monochrome Layer Look",  subtitle: "Minimal & Modern",  tag: "New",      style: "Layering", href: "/outfits/monochrome-layer-look"  },
    { id: 4, title: "Teddy Coat Outfit",      subtitle: "Weekend & Leisure", tag: "Trending", style: "Coat",     href: "/outfits/teddy-coat-outfit"      },
    { id: 5, title: "Turtleneck & Trousers",  subtitle: "Office & Business", tag: "Popular",  style: "Business", href: "/outfits/turtleneck-trousers"    },
    { id: 6, title: "Plaid Scarf Look",       subtitle: "Casual & Everyday", tag: "New",      style: "Casual",   href: "/outfits/plaid-scarf-look"       },
    { id: 7, title: "Velvet Evening Look",    subtitle: "Evening & Event",   tag: "Trending", style: "Elegant",  href: "/outfits/velvet-evening-look"    },
    { id: 8, title: "Oversized Puffer Coat",  subtitle: "Street & Urban",    tag: "New",      style: "Coat",     href: "/outfits/oversized-puffer-coat"  },
  ],
  "autumn": [
    { id: 1, title: "Camel Trench Coat",     subtitle: "City & Everyday",   tag: "Trending", style: "Trench",   href: "/outfits/camel-trench-coat"      },
    { id: 2, title: "Rust Knit & Jeans",     subtitle: "Casual & Weekend",  tag: "Popular",  style: "Knitwear", href: "/outfits/rust-knit-jeans"        },
    { id: 3, title: "Olive Cargo Look",      subtitle: "Street & Urban",    tag: "New",      style: "Casual",   href: "/outfits/olive-cargo-look"       },
    { id: 4, title: "Plaid Blazer Outfit",   subtitle: "Office & Business", tag: "Trending", style: "Elegant",  href: "/outfits/plaid-blazer-outfit"    },
    { id: 5, title: "Denim Layer Look",      subtitle: "Casual & Modern",   tag: "Popular",  style: "Denim",    href: "/outfits/denim-layer-look"       },
    { id: 6, title: "Brown Leather Jacket",  subtitle: "Street & Leisure",  tag: "New",      style: "Layering", href: "/outfits/brown-leather-jacket"   },
    { id: 7, title: "Midi Skirt & Boots",    subtitle: "Elegant & Chic",    tag: "Trending", style: "Elegant",  href: "/outfits/midi-skirt-boots"       },
    { id: 8, title: "Oversized Blazer Look", subtitle: "Business Casual",   tag: "New",      style: "Trench",   href: "/outfits/oversized-blazer-look"  },
  ],
  "spring": [
    { id: 1, title: "Pastel Blazer Set",         subtitle: "Office & Chic",        tag: "Trending", style: "Blazer",  href: "/outfits/pastel-blazer-set"         },
    { id: 2, title: "Floral Midi Dress",          subtitle: "Casual & Feminine",    tag: "Popular",  style: "Floral",  href: "/outfits/floral-midi-dress"          },
    { id: 3, title: "Linen Wide-Leg Pants",       subtitle: "Relaxed & Elegant",    tag: "New",      style: "Linen",   href: "/outfits/linen-wide-leg-pants"       },
    { id: 4, title: "White & Sage Combo",         subtitle: "Minimal & Fresh",      tag: "Trending", style: "Pastels", href: "/outfits/white-sage-combo"           },
    { id: 5, title: "Denim & Floral Top",         subtitle: "Casual & Spring",      tag: "Popular",  style: "Floral",  href: "/outfits/denim-floral-top"           },
    { id: 6, title: "Mint Trench Look",           subtitle: "City & Modern",        tag: "New",      style: "Blazer",  href: "/outfits/mint-trench-look"           },
    { id: 7, title: "Lilac Knit Dress",           subtitle: "Soft & Romantic",      tag: "Trending", style: "Pastels", href: "/outfits/lilac-knit-dress"           },
    { id: 8, title: "Striped Linen Shirt Look",   subtitle: "Weekend & Casual",     tag: "New",      style: "Linen",   href: "/outfits/striped-linen-shirt-look"   },
  ],
};

// Her mevsim için CategoryPage'e aktarılan metadata, SEO ve UI konfigürasyonu
const seasons: Record<string, Omit<CategoryData, 'outfits'>> = {
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
    relatedCategories: [
      { label: "Boho Style",     href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Beach Looks",    href: "/outfits/occasion/beach",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Festival Style", href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Autumn Looks",   href: "/outfits/season/autumn",     accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
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
    relatedCategories: [
      { label: "Summer Dresses",    href: "/outfits/season/summer",   accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Autumn Looks",      href: "/outfits/season/autumn",   accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Office & Business", href: "/outfits/occasion/office", accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Classic Style",     href: "/outfits/style/classic",   accent: "bg-gray-100",  accentText: "text-gray-700"  },
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
    relatedCategories: [
      { label: "Winter Outfits", href: "/outfits/season/winter", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Spring Looks",   href: "/outfits/season/spring", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Boho Style",     href: "/outfits/style/boho",    accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Classic Style",  href: "/outfits/style/classic", accent: "bg-gray-100",  accentText: "text-gray-700"  },
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
    relatedCategories: [
      { label: "Summer Dresses", href: "/outfits/season/summer",  accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Autumn Looks",   href: "/outfits/season/autumn",  accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Boho Style",     href: "/outfits/style/boho",     accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Beach Looks",    href: "/outfits/occasion/beach", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
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

// Build zamanında tüm mevsim slug'larını statik sayfa olarak üretir (SSG)
export function generateStaticParams() {
  return Object.keys(seasons).map((slug) => ({ slug }));
}

// Slug'a göre SEO metadata oluşturur; bilinmeyen slug için boş obje döner
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = seasons[slug];
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/season/${slug}` },
    openGraph: {
      title: `${data.seo.title} | STYLEFINDEN`,
      description: data.seo.description,
      url: `https://stylefinden.com/outfits/season/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  };
}

// Sayfa bileşeni: Sanity'den veri çeker, fallback uygular ve CategoryPage'e aktarır
export default async function SeasonPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = seasons[slug];
  if (!data) notFound();
  const outfits = await client.fetch(OUTFITS_BY_SEASON_QUERY, { season: slug }, { next: { revalidate: 3600, tags: ['outfit'] } });
  // Sanity'de veri varsa dönüştür, yoksa statik fallback'e geç
  const items = outfits.length > 0 ? outfits.map(toItem) : (STATIC_OUTFITS[slug] ?? []);
  return (
    <CategoryPage
      data={{ ...data, outfits: items }}
      slug={slug}
      basePath="/outfits/season"
      categoryLink={{ label: "Season", href: "/outfits/season" }}
      tipSuffix="timeless elegance."
      styleGuideSuffix="find & style"
    />
  );
}

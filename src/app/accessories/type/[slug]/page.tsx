// Aksesuar tipine göre kategori sayfası — /accessories/type/[slug] route'u.
// Fallback deseni: Sanity'de slug'a uyan aksesuar varsa oradan çek, yoksa STATIC_ACCESSORIES[slug].
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CategoryData, OutfitItem } from "@/types/outfit-category";
import OutfitGridCategoryPage from "@/components/shared/OutfitGridCategoryPage";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ACCESSORIES_BY_TYPE_QUERY } from "@/lib/queries";

type SanityImg = { asset?: object; hotspot?: object; crop?: object; lqip?: string }

// Sanity aksesuar dökümanını CategoryPage OutfitItem formatına dönüştürür
function toItem(a: { _id: string; title: string; slug: string; image?: SanityImg; type?: string; occasion?: string; pairingTip?: string; tags?: string[]; featured?: boolean }): OutfitItem {
  return {
    id: a._id,
    title: a.title,
    subtitle: [a.type, a.occasion].filter(Boolean).join(' · '),
    tag: a.featured ? "Trending" : "New",
    style: a.type ?? '',
    image: a.image ? urlFor(a.image).width(1400).height(1400).url() : undefined,
    lqip: a.image?.lqip,
    href: `/accessories/${a.slug}`,
  }
}

// Sanity boşken gösterilecek statik fallback — tip slug'ına göre erişilir
const STATIC_ACCESSORIES: Record<string, OutfitItem[]> = {
  "bags": [
    { id: 1, title: "Classic Leather Tote",      subtitle: "Office & Everyday",    tag: "Trending", style: "Tote",      href: "/accessories/classic-leather-tote"   },
    { id: 2, title: "Mini Crossbody",             subtitle: "Casual & Weekend",     tag: "Popular",  style: "Crossbody", href: "/accessories/mini-crossbody"         },
    { id: 3, title: "Satin Evening Clutch",       subtitle: "Elegant & Evening",    tag: "New",      style: "Clutch",    href: "/accessories/satin-evening-clutch"   },
    { id: 4, title: "Canvas Shopper",             subtitle: "Everyday & Market",    tag: "Trending", style: "Tote",      href: "/accessories/canvas-shopper"         },
    { id: 5, title: "Chain Shoulder Bag",         subtitle: "Chic & Versatile",     tag: "Popular",  style: "Shoulder",  href: "/accessories/chain-shoulder-bag"     },
    { id: 6, title: "Bucket Bag",                 subtitle: "Boho & Casual",        tag: "New",      style: "Bucket",    href: "/accessories/bucket-bag"             },
    { id: 7, title: "Structured Top Handle",      subtitle: "Classic & Polished",   tag: "Trending", style: "Shoulder",  href: "/accessories/structured-top-handle"  },
    { id: 8, title: "Micro Mini Bag",             subtitle: "Statement & Bold",     tag: "New",      style: "Mini Bag",  href: "/accessories/micro-mini-bag"         },
  ],
  "jewelry": [
    { id: 1, title: "Gold Chain Layering",       subtitle: "Trendy & Versatile",   tag: "Trending", style: "Necklace",  href: "/accessories/gold-chain-layering"    },
    { id: 2, title: "Statement Hoops",            subtitle: "Bold & Chic",          tag: "Popular",  style: "Earrings",  href: "/accessories/statement-hoops"        },
    { id: 3, title: "Stacking Rings",             subtitle: "Minimal & Modern",     tag: "New",      style: "Rings",     href: "/accessories/stacking-rings"         },
    { id: 4, title: "Pearl Necklace",             subtitle: "Classic & Timeless",   tag: "Trending", style: "Necklace",  href: "/accessories/pearl-necklace"         },
    { id: 5, title: "Cuff Bracelet",              subtitle: "Bold & Statement",     tag: "Popular",  style: "Bracelets", href: "/accessories/cuff-bracelet"          },
    { id: 6, title: "Delicate Ear Cuff",          subtitle: "Edgy & Subtle",        tag: "New",      style: "Earrings",  href: "/accessories/delicate-ear-cuff"      },
    { id: 7, title: "Tennis Bracelet",            subtitle: "Elegant & Evening",    tag: "Trending", style: "Bracelets", href: "/accessories/tennis-bracelet"        },
    { id: 8, title: "Layered Necklace Set",       subtitle: "Effortless & Chic",    tag: "New",      style: "Necklace",  href: "/accessories/layered-necklace-set"   },
  ],
  "shoes": [
    { id: 1, title: "Chunky Loafers",            subtitle: "Casual & Chic",        tag: "Trending", style: "Loafers",      href: "/accessories/chunky-loafers"        },
    { id: 2, title: "Strappy Heeled Sandals",    subtitle: "Evening & Summer",     tag: "Popular",  style: "Sandals",      href: "/accessories/strappy-heeled-sandals" },
    { id: 3, title: "White Sneakers",             subtitle: "Everyday Essential",   tag: "New",      style: "Sneakers",     href: "/accessories/white-sneakers"        },
    { id: 4, title: "Knee-High Boots",            subtitle: "Autumn & Statement",   tag: "Trending", style: "Boots",        href: "/accessories/knee-high-boots"       },
    { id: 5, title: "Ballet Flats",               subtitle: "Elegant & Wearable",   tag: "Popular",  style: "Ballet Flats", href: "/accessories/ballet-flats"          },
    { id: 6, title: "Block Heel Mules",           subtitle: "Comfortable & Stylish",tag: "New",      style: "Heels",        href: "/accessories/block-heel-mules"      },
    { id: 7, title: "Chelsea Boots",              subtitle: "Year-Round Classic",   tag: "Trending", style: "Boots",        href: "/accessories/chelsea-boots"         },
    { id: 8, title: "Platform Sandals",           subtitle: "Bold & Summer",        tag: "New",      style: "Sandals",      href: "/accessories/platform-sandals"      },
  ],
  "scarves": [
    { id: 1, title: "Silk Neck Scarf",           subtitle: "Chic & French Girl",   tag: "Trending", style: "Silk",      href: "/accessories/silk-neck-scarf"       },
    { id: 2, title: "Oversized Knit Wrap",        subtitle: "Cozy & Autumn",        tag: "Popular",  style: "Knit",      href: "/accessories/oversized-knit-wrap"   },
    { id: 3, title: "Bandana Head Wrap",          subtitle: "Boho & Festival",      tag: "New",      style: "Head Wrap", href: "/accessories/bandana-head-wrap"     },
    { id: 4, title: "Silk Bag Charm Scarf",       subtitle: "Accessory Detail",     tag: "Trending", style: "Silk",      href: "/accessories/silk-bag-charm"        },
    { id: 5, title: "Wool Blanket Scarf",         subtitle: "Winter & Cozy",        tag: "Popular",  style: "Knit",      href: "/accessories/wool-blanket-scarf"    },
    { id: 6, title: "Printed Silk Square",        subtitle: "Evening & Classic",    tag: "New",      style: "Silk",      href: "/accessories/printed-silk-square"   },
    { id: 7, title: "Linen Neck Scarf",           subtitle: "Summer & Minimal",     tag: "Trending", style: "Linen",     href: "/accessories/linen-neck-scarf"      },
    { id: 8, title: "Hair Ribbon Scarf",          subtitle: "Cute & Trendy",        tag: "New",      style: "Head Wrap", href: "/accessories/hair-ribbon-scarf"     },
  ],
};

// Her aksesuar tipi için CategoryPage metadata, SEO ve UI konfigürasyonu
const accessoryTypes: Record<string, Omit<CategoryData, 'outfits'>> = {
  "bags": {
    label: "Bags & Handbags",
    subtitle: "The Finishing Touch",
    description:
      "From structured totes to mini crossbodies and evening clutches – discover curated bag styles for every outfit, every day and every occasion.",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    tipTitle: "The right bag completes every look,",
    tipBody: "A quality bag is worth the investment. Choose neutral tones first – black, tan, white – and build from there.",
    tipTags: ["Tote", "Crossbody", "Clutch", "Mini Bag"],
    filters: ["All", "Tote", "Crossbody", "Clutch", "Shoulder", "Mini Bag", "Bucket"],
    outfitGridLabel: "Latest Bag Styles",
    styleGuideHref: "/blog/accessories-guides/bags-guide",
    stats: [
      { value: "60+", label: "Styles" },
      { value: "5", label: "Types" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Jewelry",           href: "/accessories/type/jewelry",   accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Shoes",             href: "/accessories/type/shoes",     accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Scarves & Wraps",   href: "/accessories/type/scarves",   accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Office Outfits",    href: "/outfits/occasion/office",    accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
    ],
    faqs: [
      {
        q: "Which bag works for both office and evening?",
        a: "A structured medium-sized bag in black or nude leather transitions effortlessly from desk to dinner. Chain-strap shoulder bags are especially versatile – remove the strap for a polished clutch effect, or wear it for hands-free convenience.",
      },
      {
        q: "What bag should every woman own?",
        a: "A classic leather tote in black or tan for everyday use, a structured shoulder bag or crossbody for occasions, and a simple clutch for evenings form the perfect three-bag foundation. Quality over quantity – invest in neutral tones that work with everything.",
      },
      {
        q: "How do you match a bag to an outfit?",
        a: "Match the bag's tone to your shoes or belt for a cohesive look. When in doubt, a neutral bag (black, tan, white) works with everything. A pop of color through the bag is a safe way to add interest to a neutral outfit without overwhelming it.",
      },
    ],
    seo: {
      title: "Bags & Handbags – Totes, Crossbodies & Clutches for Every Style",
      description: "Discover curated bags and handbags: leather totes, mini crossbodies, evening clutches and structured shoulder bags for every outfit and occasion.",
      keywords: ["Handbags", "Women's Bags", "Crossbody Bag", "Tote Bag", "Clutch Bag", "Shoulder Bag", "Mini Bag", "Designer Bag Styles"],
    },
  },

  "jewelry": {
    label: "Jewelry & Accessories",
    subtitle: "Details That Define",
    description:
      "Gold chains, statement earrings, layered necklaces and subtle rings – discover curated jewelry styles that elevate any look from simple to polished.",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    tipTitle: "Jewelry tells your story,",
    tipBody: "Less is more with jewelry – one statement piece or a carefully layered set draws the eye better than wearing everything at once.",
    tipTags: ["Gold", "Layered", "Statement", "Minimal"],
    filters: ["All", "Necklace", "Earrings", "Rings", "Bracelets", "Statement", "Minimal"],
    outfitGridLabel: "Latest Jewelry Styles",
    styleGuideHref: "/blog/accessories-guides/jewelry-guide",
    stats: [
      { value: "70+", label: "Styles" },
      { value: "4", label: "Types" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Bags & Handbags",   href: "/accessories/type/bags",      accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Shoes",             href: "/accessories/type/shoes",     accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Evening Outfits",   href: "/outfits/occasion/evening",   accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Minimalist",        href: "/outfits/style/minimalist",   accent: "bg-gray-100",  accentText: "text-gray-700"  },
    ],
    faqs: [
      {
        q: "How do you layer necklaces without tangling?",
        a: "Choose necklaces of different lengths (16\", 18\", 22\") so each sits at a distinct depth. Mix chain widths and textures – a delicate chain with a pendant, a simple chain, and a chunkier link look intentional together. Fasten all necklaces before putting them on.",
      },
      {
        q: "Gold or silver – how do you choose?",
        a: "Warm skin tones with olive or peachy undertones generally suit gold. Cool skin tones with pink or blue undertones tend to suit silver. Rose gold is universally flattering. Ultimately, choose what you love – the rule is just a starting point, not a restriction.",
      },
      {
        q: "Which earrings suit which face shape?",
        a: "Long drop earrings elongate round faces. Studs and small hoops flatter oval faces. Angular or geometric earrings add definition to round faces. Avoid very wide earrings with wide face shapes. Heart-shaped faces look great with drop earrings that are wider at the bottom.",
      },
    ],
    seo: {
      title: "Jewelry & Accessories – Necklaces, Earrings & More",
      description: "Discover curated jewelry styles: gold chain layering, statement earrings, stacking rings and elegant accessories to elevate any outfit.",
      keywords: ["Jewelry Accessories", "Gold Necklace", "Statement Earrings", "Layered Necklace", "Stacking Rings", "Women's Jewelry", "Accessory Styling", "Jewelry Trends"],
    },
  },

  "shoes": {
    label: "Shoes & Footwear",
    subtitle: "Step Up Your Style",
    description:
      "From sleek heels to chunky loafers and classic sneakers – discover curated shoe styles that complete every outfit and suit every occasion.",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    tipTitle: "The right shoes change everything,",
    tipBody: "Shoes signal intention. Swap sneakers for loafers and a casual outfit instantly becomes smart-casual.",
    tipTags: ["Loafers", "Heels", "Sneakers", "Boots"],
    filters: ["All", "Heels", "Loafers", "Sneakers", "Boots", "Sandals", "Ballet Flats"],
    outfitGridLabel: "Latest Shoe Styles",
    styleGuideHref: "/blog/accessories-guides/shoes-guide",
    stats: [
      { value: "55+", label: "Styles" },
      { value: "6", label: "Types" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Bags & Handbags",   href: "/accessories/type/bags",      accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Jewelry",           href: "/accessories/type/jewelry",   accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Winter Outfits",    href: "/outfits/season/winter",      accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Street Style",      href: "/outfits/style/streetstyle",  accent: "bg-gray-900",  accentText: "text-white"     },
    ],
    faqs: [
      {
        q: "Which shoes are the most versatile investment?",
        a: "A pair of quality white sneakers, nude or black pointed-toe heels, and classic loafers in tan or black cover 90% of occasions. Add a pair of ankle boots and you have a year-round capsule footwear wardrobe that pairs with almost everything.",
      },
      {
        q: "How do you style loafers with different outfits?",
        a: "Loafers work with midi skirts, wide-leg trousers, straight jeans and even tailored shorts. For the most flattering silhouette with trousers, wear them with a slightly cropped hem to show the shoe. Add a no-show sock for comfort without visual bulk.",
      },
      {
        q: "Are chunky sneakers still in style?",
        a: "Yes – chunky or \"dad\" sneakers remain a strong fashion staple. They add a sporty contrast to feminine silhouettes and work particularly well with straight-leg jeans, midi skirts and wide-leg trousers. Neutral colorways (white, grey, beige) stay wearable season after season.",
      },
    ],
    seo: {
      title: "Shoes & Footwear – Loafers, Heels, Sneakers & Boots",
      description: "Discover curated shoe styles: chunky loafers, heeled sandals, white sneakers, knee-high boots and ballet flats for every outfit and occasion.",
      keywords: ["Women's Shoes", "Loafers", "Heeled Sandals", "White Sneakers", "Knee High Boots", "Ballet Flats", "Shoe Styles", "Footwear Trends"],
    },
  },

  "scarves": {
    label: "Scarves & Wraps",
    subtitle: "Effortless Layering",
    description:
      "Silk neck scarves, oversized knit wraps and lightweight linen scarves – discover curated scarf styles that add texture, color and elegance to any outfit.",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    tipTitle: "A scarf transforms any outfit,",
    tipBody: "One silk scarf can be worn 10+ ways – as a neck tie, head wrap, bag charm, belt or top. It's the most versatile accessory you can own.",
    tipTags: ["Silk", "Knit", "Head Wrap", "Neck Tie"],
    filters: ["All", "Silk", "Knit", "Linen", "Head Wrap", "Neck Tie", "Oversized"],
    outfitGridLabel: "Latest Scarf Styles",
    styleGuideHref: "/blog/accessories-guides/scarves-guide",
    stats: [
      { value: "40+", label: "Styles" },
      { value: "4", label: "Types" },
      { value: "Daily", label: "Updated" },
    ],
    relatedCategories: [
      { label: "Jewelry",           href: "/accessories/type/jewelry",   accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Bags & Handbags",   href: "/accessories/type/bags",      accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Boho Style",        href: "/outfits/style/boho",         accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Spring Looks",      href: "/outfits/season/spring",      accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
    ],
    faqs: [
      {
        q: "How do you tie a silk scarf around your neck?",
        a: "Fold a 90cm square scarf diagonally into a triangle, then roll it from the point to create a long strip. Tie it loosely around the neck with a simple knot off-centre for a casual look, or in a neat bow under the collar for a classic French style.",
      },
      {
        q: "How do you wear a scarf as a top?",
        a: "A large 90cm silk square can become a halter top: fold diagonally, place the longest edge at your chest, tie the two ends behind your neck. Secure with a knot or belt at the waist. Works best with high-waisted trousers or a midi skirt.",
      },
      {
        q: "Which scarf material is best for winter?",
        a: "Cashmere is the warmest and softest option but comes at a premium. Merino wool is an excellent alternative – warm, soft and less prone to pilling. Avoid scratchy wool blends that can irritate the neck. For transitional weather, a cotton-cashmere blend works beautifully.",
      },
    ],
    seo: {
      title: "Scarves & Wraps – Silk, Knit & Linen Scarf Styles",
      description: "Discover curated scarf styles: silk neck scarves, oversized knit wraps, head wraps and linen scarves for every season and outfit.",
      keywords: ["Scarves Women", "Silk Scarf", "How to Wear a Scarf", "Knit Wrap", "Head Wrap", "Neck Scarf Styles", "Scarf Outfit", "Accessory Scarf"],
    },
  },
};

// Build zamanında tüm tip slug'larını statik sayfa olarak üretir
export function generateStaticParams() {
  return Object.keys(accessoryTypes).map((slug) => ({ slug }));
}

// Slug'a göre SEO metadata oluşturur
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = accessoryTypes[slug];
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/accessories/type/${slug}` },
    openGraph: {
      title: `${data.seo.title} | STYLEFINDEN`,
      description: data.seo.description,
      url: `https://stylefinden.com/accessories/type/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  };
}

// Sayfa bileşeni: Sanity verisi yoksa statik fallback uygular, CategoryPage'e iletir
export default async function AccessoryTypePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = accessoryTypes[slug];
  if (!data) notFound();
  const accessories = await client.fetch(ACCESSORIES_BY_TYPE_QUERY, { type: slug }, { next: { revalidate: 3600, tags: ['accessory'] } });
  const items = accessories.length > 0 ? accessories.map(toItem) : (STATIC_ACCESSORIES[slug] ?? []);
  return (
    <OutfitGridCategoryPage
      data={{ ...data, outfits: items }}
      config={{ introText: data.description, variations: [] }}
      slug={slug}
      basePath="/accessories/type"
      categoryLink={{ label: "Accessories", href: "/accessories" }}
      styleGuideSuffix="find & style"
      showShopTheLook={false}
      affiliateDisclaimer={false}
    />
  );
}

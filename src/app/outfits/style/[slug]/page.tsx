// Stile göre outfit kategori sayfası — /outfits/style/[slug] route'u.
// Fallback deseni: Sanity'de slug'a uyan outfit varsa oradan çek, yoksa config.staticFallback.
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { OUTFITS_BY_STYLE_QUERY } from "@/lib/queries"
import OutfitGridCategoryPage from "@/components/shared/OutfitGridCategoryPage"
import { type ConversionConfig } from "@/components/shared/ConversionCategoryPage"
import { getStyleConfig, STYLE_CONFIGS } from "@/lib/outfit-style-config"
import type { OutfitItem } from "@/types/outfit-category"

const STYLE_CONVERSION: Record<string, ConversionConfig> = {
  boho: {
    introText:
      "Shop curated boho outfits for women — flowing maxis, fringe looks, linen dresses and earthy festival combinations. Each outfit comes with a full shop-the-look section. Updated weekly.",
    variations: [
      "Floral wrap maxi + flat sandals + rattan bag",
      "Fringe vest + wide-leg jeans + ankle boots",
      "Linen midi dress + leather belt + straw hat",
      "Embroidered blouse + wide-leg trousers + espadrilles",
      "Crochet top + flare jeans + block-heel mules",
      "Boho layer look + suede boots + layered necklaces",
      "Paisley print maxi + flat sandals + coin jewelry",
      "Earthy co-ord set + woven bag + beaded bracelets",
    ],
  },
  minimalist: {
    introText:
      "Shop curated minimalist outfits for women — clean lines, neutral palettes and high-quality basics that work across every context. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "White shirt + straight trousers + pointed loafers",
      "Beige linen set + simple sandals + structured tote",
      "Black turtleneck + wide-leg trousers + ankle boots",
      "Grey oversized blazer + slim trousers + white sneakers",
      "Cream knit + tailored trousers + flat mules",
      "Minimal slip dress + strappy heels + small clutch",
      "White oversized shirt + dark denim + chunky sneakers",
      "Monochrome brown co-ord + leather bag + gold hoops",
    ],
  },
  streetstyle: {
    introText:
      "Shop curated streetwear outfits for women — denim, oversized pieces, cargo looks and bold urban combinations. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Baggy denim + crop top + chunky sneakers",
      "Oversized hoodie + straight jeans + white trainers",
      "Graphic tee + structured blazer + loafers",
      "Cargo pants + fitted tank + lug-sole boots",
      "Leather jacket + straight-leg jeans + ankle boots",
      "Sporty layered set + cap + crossbody bag",
      "Wide-leg trousers + ribbed tank + sneakers",
      "Denim-on-denim + white sneakers + chain necklace",
    ],
  },
  "old-money": {
    introText:
      "Shop curated old money outfits for women — tailored blazers, heritage knitwear, loafers and a muted navy-camel-cream palette that communicates quiet luxury. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Navy blazer + cream trousers + penny loafers",
      "Camel polo + wide-leg chinos + leather belt",
      "Argyle knit + tailored midi skirt + ballet flats",
      "Ivory cashmere turtleneck + straight trousers + loafers",
      "Plaid wrap coat + simple knit + knee-high boots",
      "Linen blazer + white shirt + chinos + boat shoes",
      "Striped Oxford shirt + tailored trousers + loafers",
      "Cashmere turtleneck set + pearl jewelry + ankle boots",
    ],
  },
  "retro-vintage": {
    introText:
      "Shop curated retro and vintage outfits for women — high-waisted silhouettes, 70s flares, 90s slip dresses and bold decade-inspired combinations. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Flared denim + fitted knit + platform sandals",
      "High-waist plaid trousers + tucked blouse + loafers",
      "80s power-shoulder blazer + straight trousers + heels",
      "90s slip dress + fitted turtleneck underneath",
      "Corduroy wide-leg set + suede ankle boots",
      "Vintage band tee + high-waist flares + block heels",
      "70s print wrap midi dress + platform mules",
      "Denim overalls + striped tee + chunky sneakers",
    ],
  },
  y2k: {
    introText:
      "Shop curated Y2K outfits for women — low-rise denim, metallic tops, mini skirts and early 2000s combinations with a modern edge. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Low-rise cargo skirt + crop top + platform trainers",
      "Velour tracksuit + chunky sneakers + mini bag",
      "Metallic mini skirt + fitted top + block-heel boots",
      "Baby tee + denim midi skirt + kitten heel mules",
      "Rhinestone crop top + wide-leg flares + platform heels",
      "Pastel co-ord set + mini bag + statement sunglasses",
      "Butterfly-print mini dress + strappy sandals",
      "Platform boots + mini skirt + fitted long-sleeve",
    ],
  },
  western: {
    introText:
      "Shop curated western and cowgirl outfits for women — cowboy boots, fringe jackets, plaid shirts and frontier-inspired looks for festival, everyday and city dressing. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Cowboy boots + flare jeans + tucked-in western shirt",
      "Fringe suede jacket + straight denim + ankle boots",
      "Plaid shirt + denim shorts + western belt + boots",
      "Western midi dress + cowboy boots + brim hat",
      "Double denim + western belt buckle + pointed boots",
      "Suede shorts + embroidered blouse + cowboy hat",
      "Embroidered western blouse + wide-leg trousers + boots",
      "Bolo tie + tailored trousers + suede ankle boots",
    ],
  },
  "sienna-vibe": {
    introText:
      "Shop curated Sienna vibe outfits for women — crochet tops, wide-leg denim, suede boots and effortlessly undone earthy boho-chic combinations. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Crochet top + wide-leg jeans + suede ankle boots",
      "Floaty peasant blouse + midi skirt + flat sandals",
      "Suede boots + tiered midi skirt + vintage knit",
      "Shearling jacket + flare jeans + raffia bag",
      "Tiered floral midi dress + flat sandals + sun hat",
      "Vintage knit + denim shorts + woven bag",
      "Linen co-ord + raffia tote + layered necklaces",
      "Smocked dress + suede bag + gold coin jewelry",
    ],
  },
  "korean-fashion": {
    introText:
      "Shop curated Korean fashion outfits for women — oversized blazers, pastel co-ords, Seoul street style and K-fashion inspired looks with polished, effortless cool. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Oversized blazer + wide-leg trousers + loafers",
      "Pastel knit co-ord set + white sneakers + mini bag",
      "Pleated mini skirt + cardigan + mary jane shoes",
      "Monochrome cream look + structured bag + simple jewelry",
      "Puffer vest + midi pleated skirt + knee-high socks",
      "Cream trench coat + loafers + minimal accessories",
      "Graphic tee + tailored wide-leg trousers + sneakers",
      "Knit vest + collared shirt + straight trousers",
    ],
  },
  "clean-girl": {
    introText:
      "Shop curated clean girl outfits for women — neutral basics, gold hoop earrings, slick styling and understated polish that looks effortless. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Cream linen set + gold hoops + structured tote",
      "White tank + straight-leg jeans + white sneakers",
      "Beige midi dress + gold jewelry + flat sandals",
      "Monochrome neutral co-ord + minimal jewelry + mules",
      "White shirt + tailored trousers + pointed loafers",
      "Camel knit + dark straight jeans + ankle boots",
      "Slip skirt + simple tee + gold chain necklace",
      "Linen wide-leg pants + fitted tank + leather tote",
    ],
  },
  "cute-coquette": {
    introText:
      "Shop curated cute and coquette outfits for women — bows, lace, baby pink, ballet flats and soft feminine combinations for those who dress with intentional softness. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Bow blouse + pleated mini skirt + ballet flats",
      "Lace slip dress + pearl earrings + flat sandals",
      "Baby pink knit co-ord + white sneakers + mini bag",
      "Ribbon-detail midi dress + kitten heel mules",
      "Crochet lace top + mini skirt + strappy sandals",
      "Tulle midi skirt + simple fitted knit + ballet flats",
      "White lace dress + pearl jewelry + white sneakers",
      "Ruffle blouse + straight jeans + pointed flats",
    ],
  },
  "black-dark": {
    introText:
      "Shop curated all-black and dark outfits for women — leather, silk, velvet and texture-contrast combinations that communicate power and sophistication. Each outfit includes a full shop-the-look section. Updated weekly.",
    variations: [
      "Black leather trousers + cashmere knit + ankle boots",
      "Black jacket + straight jeans + white sneakers",
      "Black blazer suit + silk blouse + pointed loafers",
      "Satin slip dress + leather coat + heeled sandals",
      "Black turtleneck + wide-leg trousers + chunky boots",
      "Oversized black hoodie + cargo pants + sneakers",
      "Black midi dress + knee-high boots + minimal jewelry",
      "Velvet blazer + tailored trousers + patent shoes",
    ],
  },
}

function buildConversionConfig(config: ReturnType<typeof getStyleConfig>, slug: string, items: OutfitItem[]): ConversionConfig {
  return STYLE_CONVERSION[slug] ?? {
    introText: config.description,
    variations: items.slice(0, 8).map((o) => o.title),
  }
}

// Sanity sayfalarını dinamik olarak da render eder — config'de olmayan yeni stiller için
export const dynamicParams = true

// Sanity dökümanını CategoryPage OutfitItem formatına dönüştürür
function toItem(o: {
  _id: string
  title: string
  slug: string
  image?: object
  style?: string
  season?: string
  occasion?: string
  tags?: string[]
  featured?: boolean
  pieces?: Array<{ _key?: string; name: string; image?: object; affiliateUrl?: string }>
}): OutfitItem {
  return {
    id: o._id,
    title: o.title,
    subtitle: [o.style, o.season ?? o.occasion].filter(Boolean).join(" · "),
    tag: o.featured ? "Trending" : o.tags?.[0] === "New" ? "New" : "Popular",
    style: o.style ?? "",
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

// Build zamanında config key'leri + Sanity değerlerini birleştirerek statik parametre üretir
export async function generateStaticParams() {
  const sanityValues = await client
    .withConfig({ useCdn: false })
    .fetch<string[]>(`array::unique(*[_type == "outfit" && defined(style)].style)`)
  const allSlugs = [...new Set([...Object.keys(STYLE_CONFIGS), ...sanityValues])]
  return allSlugs.map((slug) => ({ slug }))
}

// Slug'a göre SEO metadata oluşturur
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getStyleConfig(slug)
  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/style/${slug}` },
    openGraph: {
      title: `${config.seo.title} | STYLEFINDEN`,
      description: config.seo.description,
      url: `https://stylefinden.com/outfits/style/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  }
}

// Sayfa bileşeni: Sanity verisi yoksa config.staticFallback uygular, CategoryPage'e iletir
export default async function StylePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getStyleConfig(slug)
  const outfits = await client.fetch(
    OUTFITS_BY_STYLE_QUERY,
    { style: slug },
    { next: { revalidate: 3600, tags: ["outfit"] } },
  )
  const items: OutfitItem[] =
    outfits.length > 0 ? outfits.map(toItem) : (config.staticFallback ?? [])
  return (
    <OutfitGridCategoryPage
      data={{ ...config, outfits: items }}
      config={buildConversionConfig(config, slug, items)}
      slug={slug}
      basePath="/outfits/style"
      categoryLink={{ label: "Outfits", href: "/outfits" }}
      styleGuideSuffix="understand & style"
    />
  )
}

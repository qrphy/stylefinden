import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CategoryData, OutfitItem } from "@/types/outfit-category";
import CategoryPage from "@/components/shared/CategoryPage";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { OUTFITS_BY_STYLE_QUERY } from "@/lib/queries";

function toItem(o: { _id: string; title: string; slug: string; image?: object; style?: string; season?: string; occasion?: string; tags?: string[]; featured?: boolean }): OutfitItem {
  return {
    id: o._id,
    title: o.title,
    subtitle: [o.style, o.season ?? o.occasion].filter(Boolean).join(' · '),
    tag: o.featured ? "Trending" : (o.tags?.[0] === "New" ? "New" : "Popular"),
    style: o.style ?? '',
    image: o.image ? urlFor(o.image).width(400).height(533).url() : undefined,
    href: `/outfits/${o.slug}`,
  }
}

const styles: Record<string, Omit<CategoryData, 'outfits'>> = {
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
    relatedCategories: [
      { label: "Classic Style",     href: "/outfits/style/classic",    accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Office & Business", href: "/outfits/occasion/office",  accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Boho Style",        href: "/outfits/style/boho",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Autumn Looks",      href: "/outfits/season/autumn",    accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
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
  },
};

export function generateStaticParams() {
  return Object.keys(styles).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = styles[slug];
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/style/${slug}` },
    openGraph: {
      title: `${data.seo.title} | STYLEFINDEN`,
      description: data.seo.description,
      url: `https://stylefinden.com/outfits/style/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  };
}

export default async function StylePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = styles[slug];
  if (!data) notFound();
  const outfits = await client.fetch(OUTFITS_BY_STYLE_QUERY, { style: slug }, { next: { revalidate: 3600, tags: ['outfit'] } });
  const items = outfits.map(toItem);
  return (
    <CategoryPage
      data={{ ...data, outfits: items }}
      slug={slug}
      basePath="/outfits/style"
      categoryLink={{ label: "Style", href: "/outfits/style" }}
      tipSuffix="for every day."
      styleGuideSuffix="understand & style"
    />
  );
}

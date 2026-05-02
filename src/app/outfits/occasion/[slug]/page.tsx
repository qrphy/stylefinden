import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CategoryData, OutfitItem } from "@/types/outfit-category";
import CategoryPage from "@/components/shared/CategoryPage";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { OUTFITS_BY_OCCASION_QUERY } from "@/lib/queries";

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

const occasions: Record<string, Omit<CategoryData, 'outfits'>> = {
  "office": {
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
      { label: "Classic Style",     href: "/outfits/style/classic",    accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Minimalist",        href: "/outfits/style/minimalist", accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Evening & Event",   href: "/outfits/occasion/evening", accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Winter Outfits",    href: "/outfits/season/winter",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
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
  },

  "evening": {
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
      { label: "Date Night",         href: "/outfits/occasion/date-night", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Classic Style",      href: "/outfits/style/classic",       accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Winter Outfits",     href: "/outfits/season/winter",       accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Office & Business",  href: "/outfits/occasion/office",     accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
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
  },

  "casual": {
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
      { label: "Street Style",   href: "/outfits/style/streetstyle", accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Minimalist",     href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Weekend Looks",  href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Spring Looks",   href: "/outfits/season/spring",     accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
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
  },

  "beach": {
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
      { label: "Summer Dresses",    href: "/outfits/season/summer",     accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Boho Style",        href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Festival Style",    href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Casual & Everyday", href: "/outfits/occasion/casual",   accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
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
  },

  "festival": {
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
      { label: "Boho Style",       href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Summer Dresses",   href: "/outfits/season/summer",     accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Street Style",     href: "/outfits/style/streetstyle", accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Beach & Vacation", href: "/outfits/occasion/beach",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
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
      { label: "Evening & Event", href: "/outfits/occasion/evening",  accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Classic Style",   href: "/outfits/style/classic",     accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Minimalist",      href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Summer Dresses",  href: "/outfits/season/summer",     accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
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
  },
};

export function generateStaticParams() {
  return Object.keys(occasions).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = occasions[slug];
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/occasion/${slug}` },
    openGraph: {
      title: `${data.seo.title} | STYLEFINDEN`,
      description: data.seo.description,
      url: `https://stylefinden.com/outfits/occasion/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  };
}

export default async function OccasionPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = occasions[slug];
  if (!data) notFound();
  const outfits = await client.fetch(OUTFITS_BY_OCCASION_QUERY, { occasion: slug }, { next: { revalidate: 3600, tags: ['outfit'] } });
  const items = outfits.map(toItem);
  return (
    <CategoryPage
      data={{ ...data, outfits: items }}
      slug={slug}
      basePath="/outfits/occasion"
      categoryLink={{ label: "Occasion", href: "/outfits/occasion" }}
      tipSuffix="for this occasion."
      styleGuideSuffix="style it right"
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CategoryData } from "@/types/outfit-category";
import CategoryPage from "@/components/shared/CategoryPage";

const hairstyleTypes: Record<string, CategoryData> = {
  "braids": {
    label: "Braided Hairstyles",
    subtitle: "Timeless & Versatile",
    description:
      "From simple three-strand braids to intricate fishtails and boho braided updos – discover curated braided hairstyles for every occasion and every hair length.",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    tipTitle: "Braids work for every occasion,",
    tipBody: "Master a few key techniques and you'll have a go-to hairstyle for everything from casual Sundays to weddings.",
    tipTags: ["Fishtail", "Dutch", "French", "Boho"],
    filters: ["All", "French", "Dutch", "Fishtail", "Crown", "Boho", "Box Braids"],
    outfitGridLabel: "Latest Braided Looks",
    styleGuideHref: "/blog/hairstyle-guides/braids-guide",
    stats: [
      { value: "40+", label: "Styles" },
      { value: "3", label: "Lengths" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Classic French Braid",    subtitle: "Everyday & Casual",   tag: "Trending", style: "French",    image: "/outfits/sfold.png", href: "/hairstyles/classic-french-braid"   },
      { id: 2, title: "Fishtail Side Braid",      subtitle: "Romantic & Elegant",  tag: "Popular",  style: "Fishtail",  image: "/outfits/sfold.png", href: "/hairstyles/fishtail-side-braid"    },
      { id: 3, title: "Dutch Crown Braid",        subtitle: "Boho & Festival",     tag: "New",      style: "Crown",     image: "/outfits/sfold.png", href: "/hairstyles/dutch-crown-braid"      },
      { id: 4, title: "Boho Loose Braid",         subtitle: "Casual & Free",       tag: "Trending", style: "Boho",      image: "/outfits/sfold.png", href: "/hairstyles/boho-loose-braid"       },
      { id: 5, title: "Box Braids",               subtitle: "Bold & Protective",   tag: "Popular",  style: "Box Braids",image: "/outfits/sfold.png", href: "/hairstyles/box-braids"             },
      { id: 6, title: "Waterfall Braid",          subtitle: "Soft & Feminine",     tag: "New",      style: "French",    image: "/outfits/sfold.png", href: "/hairstyles/waterfall-braid"        },
      { id: 7, title: "Half-Up Braid",            subtitle: "Versatile & Modern",  tag: "Trending", style: "Dutch",     image: "/outfits/sfold.png", href: "/hairstyles/half-up-braid"          },
      { id: 8, title: "Micro Braids Updo",        subtitle: "Evening & Glam",      tag: "New",      style: "Crown",     image: "/outfits/sfold.png", href: "/hairstyles/micro-braids-updo"      },
    ],
    relatedCategories: [
      { label: "Bun Hairstyles",   href: "/hairstyles/type/buns",         accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Wavy Hairstyles",  href: "/hairstyles/type/waves",        accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Wedding Hair",     href: "/hairstyles/occasion/wedding",  accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Everyday Hair",    href: "/hairstyles/occasion/everyday", accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
    ],
    faqs: [
      {
        q: "How do you keep a braid neat all day?",
        a: "Start with slightly textured or second-day hair for better grip. Use small elastic bands at the base and tip. A light mist of hairspray after braiding locks everything in place. For looser boho braids, gently tug sections apart after braiding for volume.",
      },
      {
        q: "Which braids work best for thin hair?",
        a: "French and waterfall braids work beautifully on thin hair as they incorporate all strands. Adding dry shampoo or texturizing spray beforehand creates volume and grip. Avoid box braids on very thin hair as they can stress the roots.",
      },
      {
        q: "Can you braid short hair?",
        a: "Yes! For short hair, a small fishtail or mini French braid at the crown looks beautiful. A half-up Dutch braid works well from chin length upward. Bobby pins and clear elastics are your best friends for securing shorter sections.",
      },
    ],
    seo: {
      title: "Braided Hairstyles – Elegant Braids for Every Occasion",
      description: "Discover curated braided hairstyles: French braids, fishtails, Dutch braids, crown braids and boho braided looks for everyday, wedding and festival.",
      keywords: ["Braided Hairstyles", "French Braid", "Fishtail Braid", "Dutch Braid", "Crown Braid", "Boho Braid", "Braid Tutorial", "Easy Braids"],
    },
  },

  "buns": {
    label: "Bun Hairstyles",
    subtitle: "Chic & Effortless",
    description:
      "From sleek ballet buns to messy topknots and low chignons – discover curated bun hairstyles that work for the office, a night out and everything in between.",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    tipTitle: "The bun – forever elegant,",
    tipBody: "A well-executed bun instantly elevates any look. Master the basics and you'll always have a polished style option.",
    tipTags: ["Topknot", "Chignon", "Ballet", "Messy"],
    filters: ["All", "Topknot", "Chignon", "Ballet", "Messy", "Low Bun", "Half-Up"],
    outfitGridLabel: "Latest Bun Looks",
    styleGuideHref: "/blog/hairstyle-guides/buns-guide",
    stats: [
      { value: "35+", label: "Styles" },
      { value: "2", label: "Types" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Sleek Ballet Bun",        subtitle: "Polished & Classic",   tag: "Trending", style: "Ballet",   image: "/outfits/sfold.png", href: "/hairstyles/sleek-ballet-bun"       },
      { id: 2, title: "Messy Topknot",            subtitle: "Casual & Effortless",  tag: "Popular",  style: "Topknot",  image: "/outfits/sfold.png", href: "/hairstyles/messy-topknot"          },
      { id: 3, title: "Low French Twist",         subtitle: "Elegant & Evening",    tag: "New",      style: "Chignon",  image: "/outfits/sfold.png", href: "/hairstyles/low-french-twist"       },
      { id: 4, title: "Textured Low Bun",         subtitle: "Modern & Relaxed",     tag: "Trending", style: "Low Bun",  image: "/outfits/sfold.png", href: "/hairstyles/textured-low-bun"       },
      { id: 5, title: "Braided Bun Updo",         subtitle: "Boho & Romantic",      tag: "Popular",  style: "Chignon",  image: "/outfits/sfold.png", href: "/hairstyles/braided-bun-updo"       },
      { id: 6, title: "Half-Up Top Knot",         subtitle: "Casual & Trendy",      tag: "New",      style: "Half-Up",  image: "/outfits/sfold.png", href: "/hairstyles/half-up-top-knot"       },
      { id: 7, title: "Sleek Chignon",            subtitle: "Office & Event",       tag: "Trending", style: "Chignon",  image: "/outfits/sfold.png", href: "/hairstyles/sleek-chignon"          },
      { id: 8, title: "Bubble Ponytail Bun",      subtitle: "Fun & Modern",         tag: "New",      style: "Topknot",  image: "/outfits/sfold.png", href: "/hairstyles/bubble-ponytail-bun"    },
    ],
    relatedCategories: [
      { label: "Braided Hairstyles", href: "/hairstyles/type/braids",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Curly Hairstyles",   href: "/hairstyles/type/curls",        accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Wedding Hair",       href: "/hairstyles/occasion/wedding",  accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Office Hair",        href: "/hairstyles/occasion/office",   accent: "bg-gray-100",  accentText: "text-gray-700"  },
    ],
    faqs: [
      {
        q: "How do you make a bun stay all day?",
        a: "Use a strong-hold elastic and secure with bobby pins in an X pattern. Hairspray over the finished bun locks flyaways. For sleek buns, apply a small amount of gel to the hairline before pulling hair back. For messy buns, texturizing spray is your friend.",
      },
      {
        q: "What bun styles suit round faces?",
        a: "High buns and topknots add vertical height, elongating a round face beautifully. A bun with loose face-framing pieces softens the effect. Avoid low, wide buns as they can emphasize facial width.",
      },
      {
        q: "How do you create a sleek ballet bun?",
        a: "Brush hair smooth and pull into a high ponytail. Twist the ponytail tightly around its base in a spiral. Secure with bobby pins going inward toward the scalp. Smooth any bumps with a fine-tooth comb and finish with hairspray.",
      },
    ],
    seo: {
      title: "Bun Hairstyles – From Messy Topknot to Sleek Chignon",
      description: "Discover curated bun hairstyles: ballet buns, messy topknots, low chignons and braided updos for office, evening and everyday wear.",
      keywords: ["Bun Hairstyles", "Topknot", "Messy Bun", "Ballet Bun", "Chignon", "Low Bun", "Updo Hairstyle", "Hair Bun Tutorial"],
    },
  },

  "waves": {
    label: "Wavy Hairstyles",
    subtitle: "Effortless & Romantic",
    description:
      "Beachy waves, soft curls and romantic waves – discover curated wavy hairstyle looks that suit every hair type and length.",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    tipTitle: "Waves for every hair type,",
    tipBody: "The right wave technique for your hair texture makes all the difference. Heat-free options work beautifully for fine hair.",
    tipTags: ["Beach Waves", "S-Waves", "Crimped", "Soft Curls"],
    filters: ["All", "Beach Waves", "S-Waves", "Soft Curls", "Textured", "Heat-Free", "Long"],
    outfitGridLabel: "Latest Wavy Looks",
    styleGuideHref: "/blog/hairstyle-guides/waves-guide",
    stats: [
      { value: "30+", label: "Styles" },
      { value: "3", label: "Textures" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Beach Waves",              subtitle: "Casual & Summer",     tag: "Trending", style: "Beach Waves", image: "/outfits/sfold.png", href: "/hairstyles/beach-waves"            },
      { id: 2, title: "Soft Romantic Waves",      subtitle: "Elegant & Feminine",  tag: "Popular",  style: "S-Waves",    image: "/outfits/sfold.png", href: "/hairstyles/soft-romantic-waves"    },
      { id: 3, title: "Textured Waves",           subtitle: "Edgy & Modern",       tag: "New",      style: "Textured",   image: "/outfits/sfold.png", href: "/hairstyles/textured-waves"         },
      { id: 4, title: "Long Boho Waves",          subtitle: "Boho & Free",         tag: "Trending", style: "Beach Waves", image: "/outfits/sfold.png", href: "/hairstyles/long-boho-waves"        },
      { id: 5, title: "Heat-Free Waves",          subtitle: "Natural & Healthy",   tag: "Popular",  style: "Heat-Free",  image: "/outfits/sfold.png", href: "/hairstyles/heat-free-waves"        },
      { id: 6, title: "Crimped Waves",            subtitle: "Bold & Retro",        tag: "New",      style: "Crimped",    image: "/outfits/sfold.png", href: "/hairstyles/crimped-waves"          },
      { id: 7, title: "Half-Up Waves",            subtitle: "Romantic & Versatile",tag: "Trending", style: "Soft Curls", image: "/outfits/sfold.png", href: "/hairstyles/half-up-waves"          },
      { id: 8, title: "Voluminous Waves",         subtitle: "Glam & Full",         tag: "New",      style: "S-Waves",    image: "/outfits/sfold.png", href: "/hairstyles/voluminous-waves"       },
    ],
    relatedCategories: [
      { label: "Curly Hairstyles",   href: "/hairstyles/type/curls",         accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Braided Hairstyles", href: "/hairstyles/type/braids",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Everyday Hair",      href: "/hairstyles/occasion/everyday",  accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
      { label: "Party Hair",         href: "/hairstyles/occasion/party",     accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
    ],
    faqs: [
      {
        q: "How do you create beach waves without heat?",
        a: "Apply a salt spray or wave cream to damp hair, scrunch gently, then twist sections into loose ropes and let air dry. Alternatively, braid damp hair in two sections, sleep on it, then undo in the morning for natural waves.",
      },
      {
        q: "Which wave tool gives the best results?",
        a: "A curling wand (cone-shaped, no clip) gives the most natural-looking waves. Wrap 1-inch sections away from the face, hold for 8-10 seconds, then release without touching. Let cool completely before running fingers through.",
      },
      {
        q: "How do you make waves last longer?",
        a: "Start with a heat protectant that also holds. After waving, let each section cool completely before touching. Finish with a flexible hold hairspray. Sleeping with hair in a loose bun helps waves last overnight.",
      },
    ],
    seo: {
      title: "Wavy Hairstyles – Beach Waves, Soft Curls & Romantic Waves",
      description: "Discover curated wavy hairstyles: beach waves, S-waves, soft curls and heat-free wave techniques for every hair type and length.",
      keywords: ["Wavy Hairstyles", "Beach Waves", "Soft Waves Hair", "Wave Tutorial", "S-Waves", "Natural Waves", "How to Get Waves", "Wavy Hair Styles"],
    },
  },

  "curls": {
    label: "Curly Hairstyles",
    subtitle: "Bold & Beautiful",
    description:
      "Defined ringlets, voluminous curls and natural coils – discover curated curly hairstyle looks that celebrate texture and bounce.",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    tipTitle: "Embrace your natural texture,",
    tipBody: "Curly hair thrives on moisture and the right products. Less manipulation means more definition and less frizz.",
    tipTags: ["Ringlets", "Coils", "Volume", "Defined"],
    filters: ["All", "Ringlets", "Coils", "Afro", "Defined", "Volume", "Protective"],
    outfitGridLabel: "Latest Curly Looks",
    styleGuideHref: "/blog/hairstyle-guides/curls-guide",
    stats: [
      { value: "35+", label: "Styles" },
      { value: "4", label: "Curl Types" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Defined Ringlets",         subtitle: "Natural & Beautiful",  tag: "Trending", style: "Ringlets",  image: "/outfits/sfold.png", href: "/hairstyles/defined-ringlets"       },
      { id: 2, title: "Big Voluminous Curls",      subtitle: "Glam & Bold",          tag: "Popular",  style: "Volume",    image: "/outfits/sfold.png", href: "/hairstyles/big-voluminous-curls"   },
      { id: 3, title: "Curly Half-Up",             subtitle: "Casual & Versatile",   tag: "New",      style: "Ringlets",  image: "/outfits/sfold.png", href: "/hairstyles/curly-half-up"          },
      { id: 4, title: "Natural Afro",              subtitle: "Bold & Statement",     tag: "Trending", style: "Afro",      image: "/outfits/sfold.png", href: "/hairstyles/natural-afro"           },
      { id: 5, title: "Curly Bob",                 subtitle: "Short & Chic",         tag: "Popular",  style: "Defined",   image: "/outfits/sfold.png", href: "/hairstyles/curly-bob"              },
      { id: 6, title: "Coily Updo",               subtitle: "Elegant & Protective", tag: "New",      style: "Coils",     image: "/outfits/sfold.png", href: "/hairstyles/coily-updo"             },
      { id: 7, title: "Wash and Go",              subtitle: "Effortless & Natural",  tag: "Trending", style: "Defined",   image: "/outfits/sfold.png", href: "/hairstyles/wash-and-go"            },
      { id: 8, title: "Curly Ponytail",           subtitle: "High & Bouncy",         tag: "New",      style: "Volume",    image: "/outfits/sfold.png", href: "/hairstyles/curly-ponytail"         },
    ],
    relatedCategories: [
      { label: "Wavy Hairstyles",  href: "/hairstyles/type/waves",        accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Bun Hairstyles",   href: "/hairstyles/type/buns",         accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Party Hair",       href: "/hairstyles/occasion/party",    accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Everyday Hair",    href: "/hairstyles/occasion/everyday", accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
    ],
    faqs: [
      {
        q: "How do you reduce frizz in curly hair?",
        a: "Apply a leave-in conditioner to wet hair, then seal with a curl cream or gel. Scrunch – don't rub – with a microfiber towel. Avoid touching while drying. Once completely dry, gently break the cast from the gel by scrunching with a small amount of oil in your hands.",
      },
      {
        q: "What is the curly girl method?",
        a: "The curly girl method avoids sulfates, silicones and heat. It involves co-washing (conditioner-only washing), detangling with a wide-tooth comb while wet, applying curl-enhancing products on wet hair, and diffusing or air drying. Many people find it significantly improves curl definition.",
      },
      {
        q: "Which products are best for curly hair?",
        a: "A hydrating shampoo (sulfate-free), a rich conditioner, a leave-in conditioner, a curl cream or custard for definition, and a gel for hold are the essentials. The order matters: leave-in → cream → gel, applied to soaking wet hair for best results.",
      },
    ],
    seo: {
      title: "Curly Hairstyles – Natural Curls, Ringlets & Coily Looks",
      description: "Discover curated curly hairstyles: defined ringlets, voluminous curls, natural afro and coily updo styles that celebrate your natural texture.",
      keywords: ["Curly Hairstyles", "Curly Hair Styles", "Natural Curls", "Ringlets", "Curly Hair Tips", "Wavy Curly Hair", "Defined Curls", "Curly Girl Method"],
    },
  },
};

export function generateStaticParams() {
  return Object.keys(hairstyleTypes).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = hairstyleTypes[slug];
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/hairstyles/type/${slug}` },
    openGraph: {
      title: `${data.seo.title} | STYLEFINDEN`,
      description: data.seo.description,
      url: `https://stylefinden.com/hairstyles/type/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  };
}

export default async function HairstyleTypePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = hairstyleTypes[slug];
  if (!data) notFound();
  return (
    <CategoryPage
      data={data}
      slug={slug}
      basePath="/hairstyles/type"
      categoryLink={{ label: "Type", href: "/hairstyles/type" }}
      heroSuffix="Hairstyles & Looks"
      tipSuffix="for every hair type."
      styleGuideSuffix="find & style"
    />
  );
}

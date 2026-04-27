import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CategoryData } from "@/types/outfit-category";
import OutfitCategoryPage from "@/components/sections/outfits/OutfitCategoryPage";

const hairstyleOccasions: Record<string, CategoryData> = {
  "everyday": {
    label: "Everyday Hairstyles",
    subtitle: "Quick & Effortless",
    description:
      "Low-maintenance looks that are polished enough for any situation – discover curated everyday hairstyles that take under 10 minutes and last all day.",
    accent: "bg-[#fff8e1]",
    accentText: "text-[#f57f17]",
    tipTitle: "Effortless daily styling,",
    tipBody: "The best everyday hairstyle is one you can repeat on autopilot. Master 2-3 looks and rotate them throughout the week.",
    tipTags: ["Quick", "Low-Maintenance", "Versatile", "Polished"],
    filters: ["All", "Under 5 min", "Under 10 min", "No Heat", "Ponytail", "Bun", "Half-Up"],
    outfitGridLabel: "Latest Everyday Looks",
    styleGuideHref: "/blog/hairstyle-guides/everyday-hair-guide",
    stats: [
      { value: "50+", label: "Styles" },
      { value: "3", label: "Lengths" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Sleek Low Ponytail",       subtitle: "5 min & Polished",    tag: "Trending", style: "Ponytail",  image: "/outfits/sfold.png", href: "/hairstyles/sleek-low-ponytail"     },
      { id: 2, title: "Messy Bun",                subtitle: "2 min & Effortless",  tag: "Popular",  style: "Bun",       image: "/outfits/sfold.png", href: "/hairstyles/messy-bun-everyday"     },
      { id: 3, title: "Half-Up Half-Down",        subtitle: "Simple & Versatile",  tag: "New",      style: "Half-Up",   image: "/outfits/sfold.png", href: "/hairstyles/half-up-half-down"      },
      { id: 4, title: "Air Dry Natural",          subtitle: "No Heat & Healthy",   tag: "Trending", style: "No Heat",   image: "/outfits/sfold.png", href: "/hairstyles/air-dry-natural"        },
      { id: 5, title: "Blowout & Down",           subtitle: "Classic & Smooth",    tag: "Popular",  style: "Blowout",   image: "/outfits/sfold.png", href: "/hairstyles/blowout-down"           },
      { id: 6, title: "French Tuck Braid",        subtitle: "Casual & Boho",       tag: "New",      style: "Half-Up",   image: "/outfits/sfold.png", href: "/hairstyles/french-tuck-braid"      },
      { id: 7, title: "High Ponytail",            subtitle: "Energetic & Clean",   tag: "Trending", style: "Ponytail",  image: "/outfits/sfold.png", href: "/hairstyles/high-ponytail-everyday"  },
      { id: 8, title: "Curtain Bang Style",       subtitle: "Trendy & Easy",       tag: "New",      style: "No Heat",   image: "/outfits/sfold.png", href: "/hairstyles/curtain-bang-style"     },
    ],
    relatedCategories: [
      { label: "Office Hairstyles", href: "/hairstyles/occasion/office",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Braided Styles",    href: "/hairstyles/type/braids",      accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Bun Hairstyles",    href: "/hairstyles/type/buns",        accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Wavy Hairstyles",   href: "/hairstyles/type/waves",       accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "What is the fastest everyday hairstyle?",
        a: "The messy bun takes under 2 minutes and looks intentionally casual. Gather hair, twist it around once, secure with an elastic, then pull a few pieces loose at the front. A quick spritz of texturizing spray finishes it off.",
      },
      {
        q: "How do you keep hair looking good on day 2 or 3?",
        a: "Dry shampoo at the roots on day 2 absorbs oil and adds volume. A loose braid overnight preserves a blowout. On day 3, embrace the texture – a half-up style or low bun looks better with slightly oilier hair than freshly washed.",
      },
      {
        q: "Which everyday hairstyle protects hair from damage?",
        a: "Low-manipulation styles like loose buns, loose braids and low ponytails minimize breakage. Avoid tight elastics that pull at the hairline. Silk or satin scrunchies are much gentler than regular elastics and reduce friction-based breakage.",
      },
    ],
    seo: {
      title: "Everyday Hairstyles – Quick, Easy & Effortless Looks",
      description: "Discover curated everyday hairstyles: quick ponytails, effortless buns, half-up styles and no-heat looks that work for any day of the week.",
      keywords: ["Everyday Hairstyles", "Easy Hairstyles", "Quick Hairstyles", "Simple Hair Looks", "Low Maintenance Hair", "5 Minute Hairstyle", "Casual Hairstyles", "Daily Hair Ideas"],
    },
  },

  "wedding": {
    label: "Wedding Hairstyles",
    subtitle: "Timeless & Romantic",
    description:
      "From soft romantic updos to flowing waves and intricate braided styles – discover curated wedding hairstyles for brides, bridesmaids and wedding guests.",
    accent: "bg-[#f3e5f5]",
    accentText: "text-[#6a1b9a]",
    tipTitle: "Your wedding hair, your story,",
    tipBody: "Test your wedding hairstyle at least twice before the big day. What looks great in a trial often needs small adjustments with your actual dress and veil.",
    tipTags: ["Updo", "Romantic", "Veil-Ready", "Timeless"],
    filters: ["All", "Updo", "Half-Up", "Down", "Braided", "Veil-Ready", "Simple"],
    outfitGridLabel: "Latest Wedding Looks",
    styleGuideHref: "/blog/hairstyle-guides/wedding-hair-guide",
    stats: [
      { value: "45+", label: "Styles" },
      { value: "3", label: "Occasions" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Romantic Low Chignon",     subtitle: "Bride & Classic",      tag: "Trending", style: "Updo",     image: "/outfits/sfold.png", href: "/hairstyles/romantic-low-chignon"   },
      { id: 2, title: "Soft Bridal Waves",         subtitle: "Flowing & Feminine",   tag: "Popular",  style: "Down",     image: "/outfits/sfold.png", href: "/hairstyles/soft-bridal-waves"      },
      { id: 3, title: "Braided Bridal Crown",      subtitle: "Boho & Garden Wedding",tag: "New",      style: "Braided",  image: "/outfits/sfold.png", href: "/hairstyles/braided-bridal-crown"   },
      { id: 4, title: "French Twist Updo",         subtitle: "Elegant & Timeless",   tag: "Trending", style: "Updo",     image: "/outfits/sfold.png", href: "/hairstyles/french-twist-updo"      },
      { id: 5, title: "Half-Up Floral Style",      subtitle: "Romantic & Fresh",     tag: "Popular",  style: "Half-Up",  image: "/outfits/sfold.png", href: "/hairstyles/half-up-floral"         },
      { id: 6, title: "Sleek Ballerina Bun",       subtitle: "Modern Bride",         tag: "New",      style: "Updo",     image: "/outfits/sfold.png", href: "/hairstyles/sleek-ballerina-bun"    },
      { id: 7, title: "Bridesmaid Braid",          subtitle: "Coordinated & Pretty", tag: "Trending", style: "Braided",  image: "/outfits/sfold.png", href: "/hairstyles/bridesmaid-braid"       },
      { id: 8, title: "Guest Blow-Dry Waves",      subtitle: "Wedding Guest Look",   tag: "New",      style: "Down",     image: "/outfits/sfold.png", href: "/hairstyles/guest-blowdry-waves"    },
    ],
    relatedCategories: [
      { label: "Party Hair",       href: "/hairstyles/occasion/party",   accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Bun Hairstyles",   href: "/hairstyles/type/buns",        accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Braided Styles",   href: "/hairstyles/type/braids",      accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Wavy Hairstyles",  href: "/hairstyles/type/waves",       accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "When should you schedule your wedding hair trial?",
        a: "Schedule your trial 6-8 weeks before the wedding. This gives you time to adjust or try a different style. Bring photos of your dress neckline, your veil if you have one, and any hair accessories. Take photos from all angles to review later.",
      },
      {
        q: "What wedding hairstyle works with a cathedral veil?",
        a: "A low, elegant updo like a chignon or French twist sits beautifully under a cathedral veil. The veil attaches at the crown or nape and doesn't disturb the style. Avoid very high buns which can create an imbalanced silhouette with a long veil.",
      },
      {
        q: "How do you make a wedding hairstyle last all day?",
        a: "Start with a dry shampoo base for grip. Use professional-strength hold products throughout the styling process. Set with strong-hold hairspray and finish with a fine mist of weather-resistant spray. Bobby pins should be placed in crossing X-patterns for maximum security.",
      },
    ],
    seo: {
      title: "Wedding Hairstyles – Bridal Looks for Your Special Day",
      description: "Discover curated wedding hairstyles for brides, bridesmaids and guests: romantic updos, soft waves, braided crowns and timeless bridal looks.",
      keywords: ["Wedding Hairstyles", "Bridal Hair", "Wedding Updo", "Bridal Waves", "Bridesmaid Hair", "Wedding Guest Hair", "Romantic Hairstyle", "Bridal Braid"],
    },
  },

  "party": {
    label: "Party Hairstyles",
    subtitle: "Glam & Unforgettable",
    description:
      "Statement updos, glamorous waves and bold hair looks – discover curated party hairstyles that ensure you stand out at every celebration.",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    tipTitle: "Dress your hair for the occasion,",
    tipBody: "Party hair should feel special. Even a simple everyday style elevated with accessories or extra volume reads as festive.",
    tipTags: ["Glam", "Volume", "Statement", "Accessorized"],
    filters: ["All", "Updo", "Down & Glam", "Half-Up", "Volume", "Accessorized", "Sleek"],
    outfitGridLabel: "Latest Party Looks",
    styleGuideHref: "/blog/hairstyle-guides/party-hair-guide",
    stats: [
      { value: "35+", label: "Styles" },
      { value: "2", label: "Formality" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Old Hollywood Waves",      subtitle: "Glam & Classic",       tag: "Trending", style: "Down & Glam", image: "/outfits/sfold.png", href: "/hairstyles/old-hollywood-waves"    },
      { id: 2, title: "High Glam Ponytail",        subtitle: "Sleek & Chic",         tag: "Popular",  style: "Sleek",      image: "/outfits/sfold.png", href: "/hairstyles/high-glam-ponytail"     },
      { id: 3, title: "Braided Crown Updo",        subtitle: "Boho Party",           tag: "New",      style: "Updo",       image: "/outfits/sfold.png", href: "/hairstyles/braided-crown-updo"     },
      { id: 4, title: "Big Volume Blowout",        subtitle: "Dramatic & Bold",      tag: "Trending", style: "Volume",     image: "/outfits/sfold.png", href: "/hairstyles/big-volume-blowout"     },
      { id: 5, title: "Embellished Half-Up",       subtitle: "Accessorized & Chic",  tag: "Popular",  style: "Accessorized",image: "/outfits/sfold.png", href: "/hairstyles/embellished-half-up"  },
      { id: 6, title: "Sleek Low Bun + Pin",       subtitle: "Modern & Elegant",     tag: "New",      style: "Updo",       image: "/outfits/sfold.png", href: "/hairstyles/sleek-low-bun-pin"      },
      { id: 7, title: "Curly Volume Out",          subtitle: "Natural & Glam",       tag: "Trending", style: "Volume",     image: "/outfits/sfold.png", href: "/hairstyles/curly-volume-out"       },
      { id: 8, title: "Disco-Inspired Waves",      subtitle: "Retro & Fun",          tag: "New",      style: "Down & Glam", image: "/outfits/sfold.png", href: "/hairstyles/disco-waves"            },
    ],
    relatedCategories: [
      { label: "Wedding Hair",     href: "/hairstyles/occasion/wedding",  accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Bun Hairstyles",   href: "/hairstyles/type/buns",         accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Curly Hairstyles", href: "/hairstyles/type/curls",        accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Wavy Hairstyles",  href: "/hairstyles/type/waves",        accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "How do you add volume to fine hair for a party?",
        a: "Start with a volumizing mousse on damp hair, then blow dry upside down. Use a round brush for the final pass. Backcomb lightly at the roots with a fine-tooth comb, then smooth the surface. Set with a light-hold volumizing spray.",
      },
      {
        q: "What hair accessories work best for parties?",
        a: "Crystal or pearl hair clips on an updo add instant glamour. A jeweled headband elevates simple waves. Barrettes placed asymmetrically look chic and modern. For a disco-inspired look, try a metallic hair scarf tied around a low ponytail.",
      },
      {
        q: "How do you make a ponytail look party-worthy?",
        a: "Use a straightener to create a very sleek, high ponytail. Wrap a small section of hair around the elastic to hide it. Add a hair extension or wrap for extra length. A high ponytail with a slicked-back top looks incredibly polished for evening events.",
      },
    ],
    seo: {
      title: "Party Hairstyles – Glam Looks for Every Celebration",
      description: "Discover curated party hairstyles: glamorous waves, statement updos, volume styles and accessorized looks for every festive occasion.",
      keywords: ["Party Hairstyles", "Glam Hair", "Evening Hairstyle", "Party Updo", "Festive Hair", "New Year Hair", "Birthday Hairstyle", "Night Out Hair"],
    },
  },

  "office": {
    label: "Office Hairstyles",
    subtitle: "Polished & Professional",
    description:
      "Clean, professional and put-together – discover curated office hairstyles that look polished in meetings and stay neat throughout the workday.",
    accent: "bg-gray-100",
    accentText: "text-gray-700",
    tipTitle: "Polished hair for a confident day,",
    tipBody: "Professional hairstyles don't have to take long. A sleek ponytail or neat bun communicates confidence in seconds.",
    tipTags: ["Sleek", "Neat", "Professional", "Polished"],
    filters: ["All", "Updo", "Ponytail", "Bun", "Half-Up", "Down", "Short Hair"],
    outfitGridLabel: "Latest Office Looks",
    styleGuideHref: "/blog/hairstyle-guides/office-hair-guide",
    stats: [
      { value: "40+", label: "Styles" },
      { value: "3", label: "Hair Lengths" },
      { value: "Daily", label: "Updated" },
    ],
    outfits: [
      { id: 1, title: "Sleek Blowout",            subtitle: "Classic & Professional",tag: "Trending", style: "Down",     image: "/outfits/sfold.png", href: "/hairstyles/sleek-blowout-office"   },
      { id: 2, title: "Polished Low Bun",          subtitle: "Neat & Timeless",       tag: "Popular",  style: "Bun",      image: "/outfits/sfold.png", href: "/hairstyles/polished-low-bun"       },
      { id: 3, title: "Structured Ponytail",       subtitle: "Clean & Sharp",         tag: "New",      style: "Ponytail", image: "/outfits/sfold.png", href: "/hairstyles/structured-ponytail"    },
      { id: 4, title: "French Twist",              subtitle: "Elegant & Secure",      tag: "Trending", style: "Updo",     image: "/outfits/sfold.png", href: "/hairstyles/french-twist-office"    },
      { id: 5, title: "Chic Half-Up",             subtitle: "Versatile & Modern",    tag: "Popular",  style: "Half-Up",  image: "/outfits/sfold.png", href: "/hairstyles/chic-half-up-office"    },
      { id: 6, title: "Short Bob Blowout",         subtitle: "Sharp & Modern",        tag: "New",      style: "Short Hair",image: "/outfits/sfold.png", href: "/hairstyles/short-bob-blowout"     },
      { id: 7, title: "Twisted Crown",             subtitle: "Elegant & Secure",      tag: "Trending", style: "Updo",     image: "/outfits/sfold.png", href: "/hairstyles/twisted-crown-office"   },
      { id: 8, title: "Smooth Side Part",          subtitle: "Classic & Minimal",     tag: "New",      style: "Down",     image: "/outfits/sfold.png", href: "/hairstyles/smooth-side-part"       },
    ],
    relatedCategories: [
      { label: "Everyday Hair",    href: "/hairstyles/occasion/everyday", accent: "bg-[#fff8e1]", accentText: "text-[#f57f17]" },
      { label: "Bun Hairstyles",   href: "/hairstyles/type/buns",         accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Braided Styles",   href: "/hairstyles/type/braids",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Office Outfits",   href: "/outfits/occasion/office",      accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
    ],
    faqs: [
      {
        q: "Which hairstyle looks most professional?",
        a: "A sleek blowout, a low bun or a structured low ponytail consistently read as the most professional. The key is neatness – flyaways and frizz undermine any style. A light application of smoothing serum and a mist of hairspray keeps everything in place.",
      },
      {
        q: "How do you style short hair professionally?",
        a: "For short hair, a well-executed blowout with volume at the roots looks polished and modern. A smooth side part gives a classic professional finish. Use a small amount of pomade or wax to control the ends and eliminate frizz.",
      },
      {
        q: "What hairstyles work well for video calls?",
        a: "Pull hair back or to the sides – hair falling forward can be distracting on camera. A neat half-up, a low ponytail or a simple blowout-down with hair behind the shoulders all photograph well on video. Avoid very elaborate styles that can look busy on screen.",
      },
    ],
    seo: {
      title: "Office Hairstyles – Professional & Polished Hair for Work",
      description: "Discover curated office hairstyles: sleek blowouts, polished buns, structured ponytails and professional updo looks for the workplace.",
      keywords: ["Office Hairstyles", "Professional Hairstyles", "Work Hair Ideas", "Polished Hair", "Business Hairstyle", "Neat Hairstyle", "Corporate Hair", "Professional Updo"],
    },
  },
};

export function generateStaticParams() {
  return Object.keys(hairstyleOccasions).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = hairstyleOccasions[slug];
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/hairstyles/occasion/${slug}` },
    openGraph: {
      title: `${data.seo.title} | STYLEFINDEN`,
      description: data.seo.description,
      url: `https://stylefinden.com/hairstyles/occasion/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  };
}

export default async function HairstyleOccasionPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = hairstyleOccasions[slug];
  if (!data) notFound();
  return (
    <OutfitCategoryPage
      data={data}
      slug={slug}
      basePath="/hairstyles/occasion"
      categoryLink={{ label: "Occasion", href: "/hairstyles/occasion" }}
      heroSuffix="Hairstyles & Looks"
      tipSuffix="for this occasion."
      styleGuideSuffix="style it right"
    />
  );
}

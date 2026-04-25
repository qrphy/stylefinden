import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ─── Data Layer ───────────────────────────────────────────────────────────────

type OutfitItem = {
  id: number;
  title: string;
  subtitle: string;
  tag: "Trending" | "New" | "Popular";
  style: string;
  image: string;
  href: string;
};

type RelatedCategory = {
  label: string;
  href: string;
  accent: string;
  accentText: string;
};

type Faq = { q: string; a: string };

type OccasionData = {
  label: string;
  subtitle: string;
  description: string;
  accent: string;
  accentText: string;
  tipTitle: string;
  tipBody: string;
  tipTags: string[];
  filters: string[];
  outfitGridLabel: string;
  styleGuideHref: string;
  stats: { value: string; label: string }[];
  outfits: OutfitItem[];
  relatedCategories: RelatedCategory[];
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
};

const occasions: Record<string, OccasionData> = {
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
    outfits: [
      { id: 1, title: "Power Blazer Set",        subtitle: "Meeting & Presentation", tag: "Trending", style: "Blazer",        image: "/outfits/sfold.png", href: "/outfits/power-blazer-set"       },
      { id: 2, title: "Tailored Wide-Leg Look",  subtitle: "Office & Everyday",      tag: "Popular",  style: "Tailoring",     image: "/outfits/sfold.png", href: "/outfits/tailored-wide-leg"      },
      { id: 3, title: "Minimal Shirt Dress",     subtitle: "Smart Casual",           tag: "New",      style: "Smart Casual",  image: "/outfits/sfold.png", href: "/outfits/minimal-shirt-dress"    },
      { id: 4, title: "Monochrome Office Look",  subtitle: "Clean & Professional",   tag: "Trending", style: "Neutral",       image: "/outfits/sfold.png", href: "/outfits/monochrome-office"      },
      { id: 5, title: "Pencil Skirt Combo",      subtitle: "Classic Business",       tag: "Popular",  style: "Tailoring",     image: "/outfits/sfold.png", href: "/outfits/pencil-skirt-combo"     },
      { id: 6, title: "Casual Friday Look",      subtitle: "Relaxed & Stylish",      tag: "New",      style: "Casual Friday", image: "/outfits/sfold.png", href: "/outfits/casual-friday-look"     },
      { id: 7, title: "Structured Midi Dress",   subtitle: "Conference & Event",     tag: "Trending", style: "Elegant",       image: "/outfits/sfold.png", href: "/outfits/structured-midi-dress"  },
      { id: 8, title: "Linen Blazer Outfit",     subtitle: "Summer Business",        tag: "New",      style: "Blazer",        image: "/outfits/sfold.png", href: "/outfits/linen-blazer-outfit"    },
    ],
    relatedCategories: [
      { label: "Classic Style",   href: "/outfits/style/classic",     accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Minimalist",      href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Evening & Event", href: "/outfits/occasion/evening",  accent: "bg-gray-900",  accentText: "text-white"     },
      { label: "Winter Outfits",  href: "/outfits/season/winter",     accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
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
    outfits: [
      { id: 1, title: "Silk Slip Dress",         subtitle: "Dinner & Cocktail",    tag: "Trending", style: "Midi",     image: "/outfits/sfold.png", href: "/outfits/silk-slip-dress"        },
      { id: 2, title: "Velvet Midi Dress",        subtitle: "Gala & Event",         tag: "Popular",  style: "Midi",     image: "/outfits/sfold.png", href: "/outfits/velvet-midi-dress"      },
      { id: 3, title: "Sequin Mini Look",         subtitle: "Party & Club",         tag: "New",      style: "Mini",     image: "/outfits/sfold.png", href: "/outfits/sequin-mini-look"       },
      { id: 4, title: "Black Tie Maxi",           subtitle: "Gala & Wedding",       tag: "Trending", style: "Maxi",     image: "/outfits/sfold.png", href: "/outfits/black-tie-maxi"         },
      { id: 5, title: "Blazer & Satin Pants",     subtitle: "Cocktail & Dinner",    tag: "Popular",  style: "Cocktail", image: "/outfits/sfold.png", href: "/outfits/blazer-satin-pants"     },
      { id: 6, title: "Wrap Evening Dress",       subtitle: "Restaurant & Theatre", tag: "New",      style: "Midi",     image: "/outfits/sfold.png", href: "/outfits/wrap-evening-dress"     },
      { id: 7, title: "Feather Trim Look",        subtitle: "Statement & Bold",     tag: "Trending", style: "Gala",     image: "/outfits/sfold.png", href: "/outfits/feather-trim-look"      },
      { id: 8, title: "Classic LBD Elevated",    subtitle: "Timeless & Elegant",   tag: "New",      style: "Elegant",  image: "/outfits/sfold.png", href: "/outfits/classic-lbd-elevated"   },
    ],
    relatedCategories: [
      { label: "Date Night",      href: "/outfits/occasion/date-night", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Classic Style",   href: "/outfits/style/classic",       accent: "bg-[#fafafa]", accentText: "text-gray-900"  },
      { label: "Winter Outfits",  href: "/outfits/season/winter",       accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Office & Business",href: "/outfits/occasion/office",    accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
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
    outfits: [
      { id: 1, title: "White Tee & Straight Jeans", subtitle: "Everyday Essential",   tag: "Trending", style: "Basics",   image: "/outfits/sfold.png", href: "/outfits/white-tee-straight-jeans" },
      { id: 2, title: "Cozy Knit & Wide Leg",       subtitle: "Weekend & Relax",      tag: "Popular",  style: "Cozy",     image: "/outfits/sfold.png", href: "/outfits/cozy-knit-wide-leg"       },
      { id: 3, title: "Denim Jacket Layer",          subtitle: "Street & Casual",      tag: "New",      style: "Layering", image: "/outfits/sfold.png", href: "/outfits/denim-jacket-layer"       },
      { id: 4, title: "Linen Shirt Outfit",          subtitle: "Summer Everyday",      tag: "Trending", style: "Basics",   image: "/outfits/sfold.png", href: "/outfits/linen-shirt-outfit"       },
      { id: 5, title: "Sweatshirt & Midi Skirt",     subtitle: "Casual Chic",          tag: "Popular",  style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/sweatshirt-midi-skirt"    },
      { id: 6, title: "Oversized Blazer & Jeans",   subtitle: "Smart Casual",         tag: "New",      style: "Layering", image: "/outfits/sfold.png", href: "/outfits/oversized-blazer-jeans"   },
      { id: 7, title: "Sporty Chic Look",            subtitle: "Athleisure & City",    tag: "Trending", style: "Sporty",   image: "/outfits/sfold.png", href: "/outfits/sporty-chic-look"         },
      { id: 8, title: "Flowy Midi & Sneakers",       subtitle: "Feminine Casual",      tag: "New",      style: "Basics",   image: "/outfits/sfold.png", href: "/outfits/flowy-midi-sneakers"      },
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
    outfits: [
      { id: 1, title: "Linen Cover-up Dress",    subtitle: "Beach & Pool",            tag: "Trending", style: "Cover-up", image: "/outfits/sfold.png", href: "/outfits/linen-cover-up-dress"   },
      { id: 2, title: "Boho Beach Maxi",          subtitle: "Vacation & Relaxation",   tag: "Popular",  style: "Maxi",     image: "/outfits/sfold.png", href: "/outfits/boho-beach-maxi"        },
      { id: 3, title: "Crochet Mini & Shorts",   subtitle: "Beach & Casual",           tag: "New",      style: "Mini",     image: "/outfits/sfold.png", href: "/outfits/crochet-mini-shorts"    },
      { id: 4, title: "Stripe Linen Set",         subtitle: "Promenade & Café",         tag: "Trending", style: "Linen",    image: "/outfits/sfold.png", href: "/outfits/stripe-linen-set"       },
      { id: 5, title: "Kaftan Look",              subtitle: "Pool & Sundowner",         tag: "Popular",  style: "Kaftan",   image: "/outfits/sfold.png", href: "/outfits/kaftan-look"            },
      { id: 6, title: "Denim Cut-off & Blouse",  subtitle: "Beach Stroll",             tag: "New",      style: "Casual",   image: "/outfits/sfold.png", href: "/outfits/denim-cutoff-blouse"    },
      { id: 7, title: "White Maxi Beach Dress",  subtitle: "Elegant by the Sea",       tag: "Trending", style: "Maxi",     image: "/outfits/sfold.png", href: "/outfits/white-maxi-beach-dress" },
      { id: 8, title: "Resort Coord Set",        subtitle: "Luxury & Vacation",        tag: "New",      style: "Cover-up", image: "/outfits/sfold.png", href: "/outfits/resort-coord-set"       },
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
    outfits: [
      { id: 1, title: "Boho Fringe Dress",        subtitle: "Festival & Open Air",  tag: "Trending", style: "Boho",     image: "/outfits/sfold.png", href: "/outfits/boho-fringe-dress"      },
      { id: 2, title: "Denim & Crop Top",          subtitle: "Concert & Outdoor",    tag: "Popular",  style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/denim-crop-top"         },
      { id: 3, title: "Floral Maxi & Boots",       subtitle: "Boho & Wild",          tag: "New",      style: "Floral",   image: "/outfits/sfold.png", href: "/outfits/floral-maxi-boots"      },
      { id: 4, title: "Crochet & Denim Shorts",   subtitle: "Summer Festival",      tag: "Trending", style: "Boho",     image: "/outfits/sfold.png", href: "/outfits/crochet-denim-shorts"   },
      { id: 5, title: "Embroidered Midi Look",     subtitle: "Playful & Feminine",   tag: "Popular",  style: "Floral",   image: "/outfits/sfold.png", href: "/outfits/embroidered-midi-look"  },
      { id: 6, title: "Layered Boho Set",          subtitle: "Layering & Style",     tag: "New",      style: "Layering", image: "/outfits/sfold.png", href: "/outfits/layered-boho-set"       },
      { id: 7, title: "Tie-Dye & Wide Leg",        subtitle: "Retro & Bold",         tag: "Trending", style: "Bold",     image: "/outfits/sfold.png", href: "/outfits/tie-dye-wide-leg"       },
      { id: 8, title: "Western Fringe Jacket",     subtitle: "Statement Look",       tag: "New",      style: "Fringe",   image: "/outfits/sfold.png", href: "/outfits/western-fringe-jacket"  },
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
    outfits: [
      { id: 1, title: "Wrap Satin Midi",          subtitle: "Dinner & Romance",     tag: "Trending", style: "Midi",     image: "/outfits/sfold.png", href: "/outfits/wrap-satin-midi"        },
      { id: 2, title: "Floral Midi Dress",         subtitle: "Café & Stroll",        tag: "Popular",  style: "Romantic", image: "/outfits/sfold.png", href: "/outfits/floral-date-midi"       },
      { id: 3, title: "Leather Mini Skirt Look",  subtitle: "Bold & Confident",     tag: "New",      style: "Bold",     image: "/outfits/sfold.png", href: "/outfits/leather-mini-skirt"     },
      { id: 4, title: "Slip Dress & Blazer",       subtitle: "Casual Chic Date",     tag: "Trending", style: "Elegant",  image: "/outfits/sfold.png", href: "/outfits/slip-dress-blazer"      },
      { id: 5, title: "Off-Shoulder Mini",         subtitle: "Feminine & Flirty",    tag: "Popular",  style: "Mini",     image: "/outfits/sfold.png", href: "/outfits/off-shoulder-mini"      },
      { id: 6, title: "Wide Leg & Silk Top",       subtitle: "Sophisticated Date",   tag: "New",      style: "Elegant",  image: "/outfits/sfold.png", href: "/outfits/wide-leg-silk-top"      },
      { id: 7, title: "Lace Detail Dress",         subtitle: "Romantic & Delicate",  tag: "Trending", style: "Romantic", image: "/outfits/sfold.png", href: "/outfits/lace-detail-dress"      },
      { id: 8, title: "Monochrome Bold Set",       subtitle: "Statement & Strong",   tag: "New",      style: "Bold",     image: "/outfits/sfold.png", href: "/outfits/monochrome-bold-set"    },
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

// ─── Static Params (SSG) ──────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(occasions).map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const occasion = occasions[slug];
  if (!occasion) return {};

  return {
    title: occasion.seo.title,
    description: occasion.seo.description,
    keywords: occasion.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/occasion/${slug}` },
    openGraph: {
      title: `${occasion.seo.title} | STYLEFINDEN`,
      description: occasion.seo.description,
      url: `https://stylefinden.com/outfits/occasion/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: "STYLEFINDEN",
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tagColors: Record<string, string> = {
  Trending: "bg-black text-white",
  New:      "bg-white text-black border border-black",
  Popular:  "bg-gray-100 text-gray-700",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function OccasionPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const occasion = occasions[slug];

  if (!occasion) notFound();

  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-6 pb-0">
        <nav className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors duration-200">Home</a>
          <span>/</span>
          <a href="/outfits" className="hover:text-black transition-colors duration-200">Outfits</a>
          <span>/</span>
          <a href="/outfits/occasion" className="hover:text-black transition-colors duration-200">Occasion</a>
          <span>/</span>
          <span className="text-black">{occasion.label}</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className={`text-xs font-semibold tracking-widest uppercase ${occasion.accentText === "text-white" ? "text-gray-400" : occasion.accentText}`}>
                {occasion.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                {occasion.label} <br />
                <span className="italic font-light">Outfits & Looks</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                {occasion.description}
              </p>
              <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
                {occasion.stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-8">
                    {i > 0 && <div className="w-px h-8 bg-gray-200" />}
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-black">{stat.value}</span>
                      <span className="text-xs tracking-widest uppercase text-gray-400">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Card */}
            <div className={`hidden md:flex flex-col gap-3 ${occasion.accent} border border-gray-100 p-8 xl:p-10 w-full md:w-80 xl:w-96 flex-shrink-0`}>
              <span className={`text-xs font-semibold tracking-widest uppercase ${occasion.accentText === "text-white" ? "text-gray-500" : occasion.accentText}`}>
                Style Tip
              </span>
              <p className="text-sm md:text-base font-black text-black leading-snug tracking-tight">
                {occasion.tipTitle}<br />
                <span className="italic font-light">for this occasion.</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">{occasion.tipBody}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {occasion.tipTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Filter ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mr-2">Filter:</span>
            {occasion.filters.map((filter, i) => (
              <a
                key={filter}
                href={i === 0 ? `/outfits/occasion/${slug}` : `/outfits/occasion/${slug}?filter=${filter.toLowerCase()}`}
                className={[
                  "px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200",
                  i === 0 ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white",
                ].join(" ")}
              >
                {filter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outfit Grid ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Curated Selection</span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">{occasion.outfitGridLabel}</h2>
            </div>
            <a href="/outfits" className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group">
              All Outfits
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {occasion.outfits.map((outfit, index) => (
              <a key={outfit.id} href={outfit.href} className="group flex flex-col gap-3">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <img
                    src={outfit.image}
                    alt={`${outfit.title} – ${outfit.subtitle}`}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${tagColors[outfit.tag]}`}>
                      {outfit.tag}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${occasion.accentText === "text-white" ? "bg-gray-100 text-gray-700" : `${occasion.accent} ${occasion.accentText}`}`}>
                      {outfit.style}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-0.5 px-0.5">
                  <h3 className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200">{outfit.title}</h3>
                  <p className="text-xs tracking-widest uppercase text-gray-400">{outfit.subtitle}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a href={`/outfits?occasion=${slug}`} className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
              Load More {occasion.label}
            </a>
          </div>

        </div>
      </section>

      {/* ── Related Categories ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">You Might Also Like</span>
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">Similar Categories</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {occasion.relatedCategories.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className={`group flex flex-col justify-between gap-6 p-6 md:p-8 ${cat.accent} hover:opacity-90 transition-opacity duration-200`}
              >
                <span className={`text-xs font-semibold tracking-widest uppercase ${cat.accentText}`}>Discover</span>
                <div className="flex items-end justify-between">
                  <h3 className="text-sm md:text-base font-black text-black tracking-tight leading-tight">{cat.label}</h3>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current text-black opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 ml-2" fill="none" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ── SEO / FAQ ── */}
      <section className="w-full border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">

            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Style Guide</span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                {occasion.label} <span className="italic font-light">style it right</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{occasion.description}</p>
              <a href={occasion.styleGuideHref} className="self-start flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-600 transition-colors duration-200 group">
                View Style Guide
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Frequently Asked Questions</span>
              {occasion.faqs.map((faq, i) => (
                <div key={i} className="flex flex-col gap-2 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                  <h3 className="text-sm font-black text-black tracking-tight">{faq.q}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

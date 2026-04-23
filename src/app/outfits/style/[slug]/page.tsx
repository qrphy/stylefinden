import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ─── Veri Katmanı ─────────────────────────────────────────────────────────────

type OutfitItem = {
  id: number;
  title: string;
  subtitle: string;
  tag: "Trending" | "Neu" | "Beliebt";
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

type StyleData = {
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

const styles: Record<string, StyleData> = {
  "boho": {
    label: "Boho Style",
    subtitle: "Frei & Verspielt",
    description:
      "Fließende Stoffe, Fransen, Naturfarben und femininen Details – entdecke kuratierte Boho-Outfits für alle, die ihren eigenen Rhythmus leben.",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    tipTitle: "Fließend, frei und feminin,",
    tipBody:
      "Boho lebt von Layering, natürlichen Materialien und einem Hauch Romantik – für Festival bis Stadtspaziergang.",
    tipTags: ["Fransen", "Linen", "Maxi", "Floral"],
    filters: ["Alle", "Maxi", "Midi", "Floral", "Fransen", "Festival", "Casual"],
    outfitGridLabel: "Aktuelle Boho-Looks",
    styleGuideHref: "/blog/occasion-guides/boho-style-guide",
    stats: [
      { value: "55+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Täglich", label: "Aktualisiert" },
    ],
    outfits: [
      { id: 1, title: "Floral Wrap Maxi",       subtitle: "Festival & Natur",   tag: "Trending", style: "Maxi",    image: "/outfits/sfold.png", href: "/outfits/floral-wrap-maxi"      },
      { id: 2, title: "Fringe Vest & Jeans",    subtitle: "Street & Casual",    tag: "Beliebt",  style: "Fransen", image: "/outfits/sfold.png", href: "/outfits/fringe-vest-jeans"     },
      { id: 3, title: "Linen Boho Dress",       subtitle: "Strand & Urlaub",    tag: "Neu",      style: "Linen",   image: "/outfits/sfold.png", href: "/outfits/linen-boho-dress"      },
      { id: 4, title: "Embroidered Midi",       subtitle: "Romantisch & Soft",  tag: "Trending", style: "Midi",    image: "/outfits/sfold.png", href: "/outfits/embroidered-midi"      },
      { id: 5, title: "Crochet Top & Skirt",    subtitle: "Sommer & Festival",  tag: "Beliebt",  style: "Floral",  image: "/outfits/sfold.png", href: "/outfits/crochet-top-skirt"     },
      { id: 6, title: "Boho Layer Look",        subtitle: "Herbst & Natur",     tag: "Neu",      style: "Fransen", image: "/outfits/sfold.png", href: "/outfits/boho-layer-look"       },
      { id: 7, title: "Paisley Print Dress",    subtitle: "Casual & Verspielt", tag: "Trending", style: "Maxi",    image: "/outfits/sfold.png", href: "/outfits/paisley-print-dress"   },
      { id: 8, title: "Earthy Boho Set",        subtitle: "Erdtöne & Natur",    tag: "Neu",      style: "Casual",  image: "/outfits/sfold.png", href: "/outfits/earthy-boho-set"       },
    ],
    relatedCategories: [
      { label: "Sommerkleider",  href: "/outfits/season/summer",      accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Festival Style", href: "/outfits/occasion/festival",  accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Minimalist",     href: "/outfits/style/minimalist",   accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Beach Looks",    href: "/outfits/occasion/strand",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "Was macht einen Boho-Look aus?",
        a: "Boho-Style zeichnet sich durch fließende Stoffe, erdige Farben, Fransen, Stickereien und natürliche Materialien wie Leinen und Baumwolle aus. Layering ist ein wichtiges Element – Westen über Kleidern, Schals und mehrere Schmuckstücke kombiniert.",
      },
      {
        q: "Wie stylt man Boho für den Alltag?",
        a: "Für einen alltagstauglichen Boho-Look: ein florale Midi-Kleid mit weißen Sneakers und einer Rattan-Tasche. Oder weite Leinenhose mit einem bestickten Top und flachen Sandalen. Der Schlüssel ist, nicht zu viele Elemente auf einmal zu kombinieren.",
      },
      {
        q: "Welche Accessoires passen zum Boho-Style?",
        a: "Rattan- und Korbgeflechttaschen, Federschmuck, Türkisringe, Ledergürtel mit Details, Sonnenhüte und flache Ledersandalen sind die perfekten Boho-Begleiter. Layering bei Ketten und Armbändern rundet den Look ab.",
      },
    ],
    seo: {
      title: "Boho Style Outfits – Frei, Feminin & Verspielt",
      description:
        "Entdecke kuratierte Boho-Outfits: Fließende Maxi-Kleider, Fransen-Looks, Leinenkombi und feminine Details für Festival, Alltag und Strand.",
      keywords: ["Boho Outfit", "Boho Style", "Boho Kleid", "Festival Outfit", "Boho Look", "Fransen Outfit", "Bohemian Style", "Boho Sommer"],
    },
  },

  "minimalist": {
    label: "Minimalist Style",
    subtitle: "Clean & Zeitlos",
    description:
      "Klare Linien, neutrale Farben und hochwertige Basics – entdecke kuratierte Minimalist-Outfits für alle, die weniger als mehr verstehen.",
    accent: "bg-gray-100",
    accentText: "text-gray-700",
    tipTitle: "Weniger ist mehr,",
    tipBody:
      "Minimalistischer Stil lebt von perfektem Fit, hochwertigen Materialien und einer reduzierten Farbpalette.",
    tipTags: ["Neutral", "Clean", "Basics", "Monochrome"],
    filters: ["Alle", "Monochrome", "Neutral", "Business", "Casual", "Elegant", "Basics"],
    outfitGridLabel: "Aktuelle Minimalist-Looks",
    styleGuideHref: "/blog/occasion-guides/minimalist-style-guide",
    stats: [
      { value: "60+", label: "Looks" },
      { value: "3", label: "Styles" },
      { value: "Täglich", label: "Aktualisiert" },
    ],
    outfits: [
      { id: 1, title: "All White Look",          subtitle: "Clean & Modern",     tag: "Trending", style: "Monochrome", image: "/outfits/sfold.png", href: "/outfits/all-white-look"         },
      { id: 2, title: "Beige Linen Set",          subtitle: "Casual & Elegant",   tag: "Beliebt",  style: "Neutral",   image: "/outfits/sfold.png", href: "/outfits/beige-linen-set"        },
      { id: 3, title: "Black Straight Trousers",  subtitle: "Office & Business",  tag: "Neu",      style: "Business",  image: "/outfits/sfold.png", href: "/outfits/black-straight-trousers"},
      { id: 4, title: "Grey Oversized Blazer",    subtitle: "Smart Casual",       tag: "Trending", style: "Business",  image: "/outfits/sfold.png", href: "/outfits/grey-oversized-blazer"  },
      { id: 5, title: "Cream Knit & Trousers",   subtitle: "Cozy & Minimal",     tag: "Beliebt",  style: "Neutral",   image: "/outfits/sfold.png", href: "/outfits/cream-knit-trousers"    },
      { id: 6, title: "Minimal Slip Dress",       subtitle: "Abend & Event",      tag: "Neu",      style: "Elegant",   image: "/outfits/sfold.png", href: "/outfits/minimal-slip-dress"     },
      { id: 7, title: "White Shirt & Denim",      subtitle: "Everyday Basics",    tag: "Trending", style: "Basics",    image: "/outfits/sfold.png", href: "/outfits/white-shirt-denim"      },
      { id: 8, title: "Monochrome Brown Set",     subtitle: "Warm & Schlicht",    tag: "Neu",      style: "Monochrome",image: "/outfits/sfold.png", href: "/outfits/monochrome-brown-set"   },
    ],
    relatedCategories: [
      { label: "Classic Style",  href: "/outfits/style/classic",     accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Büro & Business",href: "/outfits/occasion/buero",    accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Boho Style",     href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Herbstlooks",    href: "/outfits/season/herbst",     accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
    ],
    faqs: [
      {
        q: "Was sind die Grundregeln des minimalistischen Stils?",
        a: "Minimalistischer Stil basiert auf einer neutralen Farbpalette (Schwarz, Weiß, Beige, Grau), klaren Silhouetten ohne aufwendige Details, hochwertigen Basics und dem Prinzip, dass jedes Teil mit allem anderen kombinierbar sein sollte.",
      },
      {
        q: "Welche Basics braucht man für einen minimalistischen Kleiderschrank?",
        a: "Ein weißes Oxford-Hemd, eine gut sitzende schwarze Hose, ein Kaschmir- oder Merinorollkragen, ein beiger Trench Coat, ein strukturierter Blazer und ein einfarbiges Midi-Kleid bilden die perfekte minimalistischen Basis.",
      },
      {
        q: "Wie fügt man Interesse in minimalistische Outfits ein?",
        a: "Texturspiel ist der Schlüssel: Seide neben Leinenstruktur, Leder-Accessoires zu Wollstrick, oder glänzende Details zu matten Stoffen. Auch die Silhouette zählt – ein oversizede Blazer über schmalem Hose schafft Spannung ohne Farbe.",
      },
    ],
    seo: {
      title: "Minimalist Style Outfits – Clean, Schlicht & Zeitlos",
      description:
        "Entdecke kuratierte Minimalist-Outfits: Monochrome Looks, neutrale Farbkombinationen und zeitlose Basics für Alltag, Office und besondere Anlässe.",
      keywords: ["Minimalist Outfit", "Minimalistisch Outfit", "Clean Style", "Neutral Outfit", "Monochrome Look", "Minimalist Mode", "Schlicht Elegant", "Capsule Wardrobe"],
    },
  },

  "streetstyle": {
    label: "Street Style",
    subtitle: "Urban & Bold",
    description:
      "Kühne Kombinationen, Denim, Oversized Pieces und urbane Energie – entdecke kuratierte Street-Style-Outfits für alle, die auf der Straße auffallen wollen.",
    accent: "bg-gray-900",
    accentText: "text-white",
    tipTitle: "Bold, urban und unverwechselbar,",
    tipBody:
      "Street Style lebt von kreativen Kombinationen, Statement-Pieces und der Freiheit, Regeln zu brechen.",
    tipTags: ["Denim", "Oversized", "Sneaker", "Graphic"],
    filters: ["Alle", "Denim", "Oversized", "Sporty", "Graphic", "Layering", "Bold"],
    outfitGridLabel: "Aktuelle Street-Looks",
    styleGuideHref: "/blog/occasion-guides/streetstyle-guide",
    stats: [
      { value: "65+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Täglich", label: "Aktualisiert" },
    ],
    outfits: [
      { id: 1, title: "Baggy Denim & Crop Top",  subtitle: "Urban & Casual",     tag: "Trending", style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/baggy-denim-crop-top"   },
      { id: 2, title: "Oversized Hoodie Look",   subtitle: "Cozy & Street",      tag: "Beliebt",  style: "Oversized",image: "/outfits/sfold.png", href: "/outfits/oversized-hoodie-look"  },
      { id: 3, title: "Graphic Tee & Blazer",    subtitle: "Smart Street",       tag: "Neu",      style: "Graphic",  image: "/outfits/sfold.png", href: "/outfits/graphic-tee-blazer"     },
      { id: 4, title: "Cargo Pants Outfit",      subtitle: "Utility & Urban",    tag: "Trending", style: "Bold",     image: "/outfits/sfold.png", href: "/outfits/cargo-pants-outfit"     },
      { id: 5, title: "Leather Jacket & Jeans",  subtitle: "Classic Street",     tag: "Beliebt",  style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/leather-jacket-jeans"   },
      { id: 6, title: "Sporty Layered Set",      subtitle: "Athleisure & City",  tag: "Neu",      style: "Sporty",   image: "/outfits/sfold.png", href: "/outfits/sporty-layered-set"     },
      { id: 7, title: "Wide Leg & Tank",         subtitle: "Minimal Street",     tag: "Trending", style: "Oversized",image: "/outfits/sfold.png", href: "/outfits/wide-leg-tank"          },
      { id: 8, title: "Denim-on-Denim",          subtitle: "Bold & Modern",      tag: "Neu",      style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/denim-on-denim"         },
    ],
    relatedCategories: [
      { label: "Boho Style",     href: "/outfits/style/boho",        accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Minimalist",     href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Festival Style", href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Herbstlooks",    href: "/outfits/season/herbst",     accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
    ],
    faqs: [
      {
        q: "Was ist Street Style?",
        a: "Street Style ist ein aus dem Alltag entstandener Modestil, der Hochmode mit persönlichem Ausdruck verbindet. Er zeichnet sich durch Denim, Sneakers, Oversized Pieces, Grafik-Prints und kühne Farbkombinationen aus – und wird oft durch Streetwear-Marken und Stadtkultur geprägt.",
      },
      {
        q: "Wie kombiniert man Street Style für die Arbeit?",
        a: "Ein gutes Graphic-Tee unter einem strukturierten Blazer, dazu eine gut sitzende Straight-Jeans und Loafer – das ist der perfekte Smart-Street-Office-Look. Statement-Sneakers in Neutraltönen funktionieren auch in vielen modernen Arbeitsumgebungen.",
      },
      {
        q: "Welche Sneakers passen zu Street-Style-Outfits?",
        a: "Chunky Sneakers (Dad Shoes) verleihen jedem Look Volumen. Clean White Sneakers wie die Air Force 1 sind zeitlose Klassiker. Low-Top-Modelle in Schwarz oder Grau ergänzen minimale Street Looks, während Colorblocking-Sneakers mutige Statements setzen.",
      },
    ],
    seo: {
      title: "Street Style Outfits – Urban, Bold & Unverwechselbar",
      description:
        "Entdecke kuratierte Street-Style-Outfits: Denim Looks, Oversized Pieces, Cargo-Outfits und urbane Kombinationen für alle, die Mode als Ausdruck leben.",
      keywords: ["Street Style Outfit", "Streetwear", "Urban Outfit", "Denim Look", "Oversized Outfit", "Streetstyle Mode", "Bold Outfit", "Sneaker Outfit"],
    },
  },

  "classic": {
    label: "Classic Style",
    subtitle: "Zeitlos & Elegant",
    description:
      "Tailoring, hochwertige Basics und Looks, die nie aus der Mode kommen – entdecke kuratierte Classic-Style-Outfits für Frauen, die auf zeitlose Eleganz setzen.",
    accent: "bg-[#fafafa]",
    accentText: "text-gray-900",
    tipTitle: "Zeitlose Eleganz, perfektes Tailoring,",
    tipBody:
      "Classic Style investiert in Qualität, nicht Quantität – jedes Teil ist ein Langzeitbegleiter.",
    tipTags: ["Blazer", "Trench", "Tailoring", "Neutral"],
    filters: ["Alle", "Blazer", "Trench", "Tailoring", "Business", "Abend", "Casual"],
    outfitGridLabel: "Aktuelle Classic-Looks",
    styleGuideHref: "/blog/occasion-guides/classic-style-guide",
    stats: [
      { value: "70+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Täglich", label: "Aktualisiert" },
    ],
    outfits: [
      { id: 1, title: "Camel Blazer & Trousers", subtitle: "Office & Chic",      tag: "Trending", style: "Blazer",   image: "/outfits/sfold.png", href: "/outfits/camel-blazer-trousers"  },
      { id: 2, title: "Navy & White Stripes",    subtitle: "Smart Casual",       tag: "Beliebt",  style: "Casual",   image: "/outfits/sfold.png", href: "/outfits/navy-white-stripes"     },
      { id: 3, title: "Wrap Coat Outfit",        subtitle: "City & Business",    tag: "Neu",      style: "Trench",   image: "/outfits/sfold.png", href: "/outfits/wrap-coat-outfit"       },
      { id: 4, title: "Little Black Dress",      subtitle: "Abend & Event",      tag: "Trending", style: "Abend",    image: "/outfits/sfold.png", href: "/outfits/little-black-dress"     },
      { id: 5, title: "Pencil Skirt & Blouse",   subtitle: "Office & Elegant",   tag: "Beliebt",  style: "Business", image: "/outfits/sfold.png", href: "/outfits/pencil-skirt-blouse"    },
      { id: 6, title: "Trench & Straight Jeans", subtitle: "Weekend & City",     tag: "Neu",      style: "Trench",   image: "/outfits/sfold.png", href: "/outfits/trench-straight-jeans"  },
      { id: 7, title: "Pearl & Silk Blouse",     subtitle: "Elegant & Feminin",  tag: "Trending", style: "Abend",    image: "/outfits/sfold.png", href: "/outfits/pearl-silk-blouse"      },
      { id: 8, title: "Grey Suit Set",           subtitle: "Power & Profession", tag: "Neu",      style: "Tailoring",image: "/outfits/sfold.png", href: "/outfits/grey-suit-set"          },
    ],
    relatedCategories: [
      { label: "Minimalist",     href: "/outfits/style/minimalist",  accent: "bg-gray-100",  accentText: "text-gray-700"  },
      { label: "Büro & Business",href: "/outfits/occasion/buero",    accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Winteroutfits",  href: "/outfits/season/winter",     accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Abend & Event",  href: "/outfits/occasion/abend",    accent: "bg-gray-900",  accentText: "text-white"     },
    ],
    faqs: [
      {
        q: "Was sind die Kernstücke eines klassischen Kleiderschranks?",
        a: "Ein gut geschnittener Blazer in Schwarz oder Camel, ein weißes Hemd, eine schwarze Taillenhose, ein Trench Coat, ein einfaches schwarzes Kleid und qualitativ hochwertige Pumps oder Loafer bilden die unerschütterliche Basis des Classic Style.",
      },
      {
        q: "Wie modernisiert man klassische Outfits?",
        a: "Klassische Stücke lassen sich durch zeitgemäße Details auffrischen: Chunky-Loafer statt spitzer Pumps, ein oversizede Blazer statt taillierter Schnitt, oder das klassische schwarze Kleid mit weißen Sneakers kombiniert. Subtile Aktualisierungen halten den Look frisch.",
      },
      {
        q: "Welche Farben gehören zum Classic Style?",
        a: "Schwarz, Weiß, Navy, Camel, Grau und Creme sind die zeitlosen Klassiker. Dazu kommen gelegentliche Akzente in Bordeaux, Dunkelgrün oder Kobaltblau. Die Stärke liegt in der neutralen Basis – sie erlaubt endlose Kombinationsmöglichkeiten.",
      },
    ],
    seo: {
      title: "Classic Style Outfits – Zeitlos, Elegant & Unverwechselbar",
      description:
        "Entdecke kuratierte Classic-Style-Outfits: Blazer-Looks, Trench Coats, Abendoutfits und zeitlose Kombinationen für Frauen, die auf bleibende Eleganz setzen.",
      keywords: ["Classic Style Outfit", "Klassisch Elegant Outfit", "Zeitloses Outfit", "Blazer Outfit", "Trench Coat Look", "Business Outfit Damen", "Classic Mode", "Elegant Outfit"],
    },
  },
};

// ─── Static Params (SSG) ──────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(styles).map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const styleData = styles[slug];
  if (!styleData) return {};

  return {
    title: styleData.seo.title,
    description: styleData.seo.description,
    keywords: styleData.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/style/${slug}` },
    openGraph: {
      title: `${styleData.seo.title} | STYLEFINDEN`,
      description: styleData.seo.description,
      url: `https://stylefinden.com/outfits/style/${slug}`,
      type: "website",
      locale: "de_DE",
      siteName: "STYLEFINDEN",
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tagColors: Record<string, string> = {
  Trending: "bg-black text-white",
  Neu:      "bg-white text-black border border-black",
  Beliebt:  "bg-gray-100 text-gray-700",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function StylePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const styleData = styles[slug];

  if (!styleData) notFound();

  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-6 pb-0">
        <nav className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors duration-200">Start</a>
          <span>/</span>
          <a href="/outfits" className="hover:text-black transition-colors duration-200">Outfits</a>
          <span>/</span>
          <a href="/outfits/style" className="hover:text-black transition-colors duration-200">Stil</a>
          <span>/</span>
          <span className="text-black">{styleData.label}</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className={`text-xs font-semibold tracking-widest uppercase ${styleData.accentText === "text-white" ? "text-gray-400" : styleData.accentText}`}>
                {styleData.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                {styleData.label} <br />
                <span className="italic font-light">Outfits & Looks</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                {styleData.description}
              </p>
              <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
                {styleData.stats.map((stat, i) => (
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

            {/* Accent Kart */}
            <div className={`hidden md:flex flex-col gap-3 ${styleData.accent} border border-gray-100 p-8 xl:p-10 w-full md:w-80 xl:w-96 flex-shrink-0`}>
              <span className={`text-xs font-semibold tracking-widest uppercase ${styleData.accentText === "text-white" ? "text-gray-500" : styleData.accentText}`}>
                Style Tipp
              </span>
              <p className="text-sm md:text-base font-black text-black leading-snug tracking-tight">
                {styleData.tipTitle}<br />
                <span className="italic font-light">für jeden Tag.</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">{styleData.tipBody}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {styleData.tipTags.map((tag) => (
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
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mr-2">
              Filter:
            </span>
            {styleData.filters.map((filter, i) => (
              <a
                key={filter}
                href={i === 0 ? `/outfits/style/${slug}` : `/outfits/style/${slug}?filter=${filter.toLowerCase()}`}
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
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Kuratierte Auswahl
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                {styleData.outfitGridLabel}
              </h2>
            </div>
            <a
              href="/outfits"
              className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group"
            >
              Alle Outfits
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {styleData.outfits.map((outfit, index) => (
              <a key={outfit.id} href={outfit.href} className="group flex flex-col gap-3">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <img
                    src={outfit.image}
                    alt={`${outfit.title} – ${outfit.subtitle}`}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top
                               transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${tagColors[outfit.tag]}`}>
                      {outfit.tag}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${styleData.accent} ${styleData.accentText === "text-white" ? "text-gray-700 bg-gray-100" : styleData.accentText}`}>
                      {outfit.style}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-0.5 px-0.5">
                  <h3 className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200">
                    {outfit.title}
                  </h3>
                  <p className="text-xs tracking-widest uppercase text-gray-400">{outfit.subtitle}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href={`/outfits?stil=${slug}`}
              className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
            >
              Mehr {styleData.label} laden
            </a>
          </div>

        </div>
      </section>

      {/* ── Related Categories ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Passend dazu
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
              Ähnliche Kategorien
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {styleData.relatedCategories.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className={`group flex flex-col justify-between gap-6 p-6 md:p-8 ${cat.accent} hover:opacity-90 transition-opacity duration-200`}
              >
                <span className={`text-xs font-semibold tracking-widest uppercase ${cat.accentText}`}>
                  Entdecken
                </span>
                <div className="flex items-end justify-between">
                  <h3 className="text-sm md:text-base font-black text-black tracking-tight leading-tight">
                    {cat.label}
                  </h3>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 stroke-current text-black opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 ml-2"
                    fill="none"
                    strokeWidth={2}
                  >
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
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Style Guide
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                {styleData.label} <span className="italic font-light">verstehen & stylen</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{styleData.description}</p>
              <a
                href={styleData.styleGuideHref}
                className="self-start flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-600 transition-colors duration-200 group"
              >
                Zum Style Guide
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Häufige Fragen
              </span>
              {styleData.faqs.map((faq, i) => (
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

import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ─── Data Layer ───────────────────────────────────────────────────────────────

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

type SeasonData = {
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

const seasons: Record<string, SeasonData> = {
  "summer": {
    label: "Sommerkleider",
    subtitle: "Sommer 2025",
    description:
      "Von verspielten Blumenkleidern über elegante Maxi-Roben bis hin zu lässigen Mini-Dresses – entdecke kuratierte Sommerkleid-Outfits für jeden Stil, jeden Tag und jeden Anlass.",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    tipTitle: "Leichte Stoffe, mutige Prints,",
    tipBody:
      "Das perfekte Sommerkleid kombiniert Leichtigkeit mit Stil – für Beach, City und Beyond.",
    tipTags: ["Linen", "Floral", "Maxi", "Boho"],
    filters: ["Alle", "Maxi", "Midi", "Mini", "Floral", "Linen", "Boho"],
    outfitGridLabel: "Aktuelle Sommerkleid-Looks",
    styleGuideHref: "/blog/seasonal-guides/sommer-style-guide",
    stats: [
      { value: "80+", label: "Looks" },
      { value: "3", label: "Schnitte" },
      { value: "Täglich", label: "Aktualisiert" },
    ],
    outfits: [
      { id: 1, title: "Floral Maxi Dress",   subtitle: "Strand & Urlaub",    tag: "Trending", style: "Maxi", image: "/outfits/sfold.png", href: "/outfits/floral-maxi-dress"   },
      { id: 2, title: "Linen Slip Dress",    subtitle: "Casual & City",      tag: "Neu",      style: "Midi", image: "/outfits/sfold.png", href: "/outfits/linen-slip-dress"    },
      { id: 3, title: "Boho Wrap Dress",     subtitle: "Festival & Natur",   tag: "Beliebt",  style: "Maxi", image: "/outfits/sfold.png", href: "/outfits/boho-wrap-dress"     },
      { id: 4, title: "Mini Sun Dress",      subtitle: "Sommer & Freizeit",  tag: "Trending", style: "Mini", image: "/outfits/sfold.png", href: "/outfits/mini-sun-dress"      },
      { id: 5, title: "Stripe Midi Dress",   subtitle: "Chic & Modern",      tag: "Neu",      style: "Midi", image: "/outfits/sfold.png", href: "/outfits/stripe-midi-dress"   },
      { id: 6, title: "Off-Shoulder Dress",  subtitle: "Abend & Event",      tag: "Beliebt",  style: "Midi", image: "/outfits/sfold.png", href: "/outfits/off-shoulder-dress"  },
      { id: 7, title: "Cotton Sundress",     subtitle: "Alltag & Picknick",  tag: "Trending", style: "Mini", image: "/outfits/sfold.png", href: "/outfits/cotton-sundress"     },
      { id: 8, title: "Flowy Chiffon Dress", subtitle: "Elegant & Leicht",   tag: "Neu",      style: "Maxi", image: "/outfits/sfold.png", href: "/outfits/flowy-chiffon-dress" },
    ],
    relatedCategories: [
      { label: "Boho Style",     href: "/outfits/style/boho",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Beach Looks",    href: "/outfits/occasion/strand",  accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Festival Style", href: "/outfits/occasion/festival",accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
      { label: "Herbstlooks",    href: "/outfits/season/autumn",    accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
    ],
    faqs: [
      {
        q: "Wie kombiniert man ein Sommerkleid stilvoll?",
        a: "Ein Sommerkleid lässt sich vielseitig stylen: Mit Sandalen und Strohhut für den Strand, mit weißen Sneakers für den Stadtbummel oder mit Mules und Clutch für Abendanlässe. Ein leichter Leinenoversize-Blazer macht daraus auch einen Business-casual-Look.",
      },
      {
        q: "Welche Sommerkleid-Schnitte passen zu welchem Körpertyp?",
        a: "Maxi-Kleider betonen die Taille und eignen sich für alle Figuren. Midi-Kleider strecken optisch die Beine. A-Linien-Schnitte harmonieren mit Birnenformen, während Empire-Schnitte den Bauchbereich elegant kaschieren.",
      }, 
     {
        q: "Welche Accessoires passen zum Sommerkleid?",
        a: "Strohhüte, Rattan-Taschen, goldene Schmuckstücke und flache Sandalen ergänzen Sommerkleider perfekt. Für den Abend empfehlen sich Riemchensandalen mit kleinem Absatz und eine minimalistische Clutch.",
      },
    ],
    seo: {
      title: "Sommerkleider Outfits – Leichte Looks für heiße Tage",
      description:
        "Entdecke die schönsten Sommerkleider-Outfits 2025: Maxi-Kleider, Midi-Kleider, florale Prints und leichte Leinenkleider für jeden Anlass – von Strand bis Stadtbummel.",
      keywords: ["Sommerkleider", "Sommerkleid Outfit", "Maxikleid", "Midikleid", "Sommerkleid 2025", "Blumenkleid", "Leinenkleid", "Strandkleid"],
    },
  },

  "winter": {
    label: "Winteroutfits",
    subtitle: "Winter 2025 / 2026",
    description:
      "Warme Layering-Looks, elegante Mäntel und kuschelige Kombis – entdecke kuratierte Winteroutfits für jeden Stil, jeden Tag und jeden Anlass.",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    tipTitle: "Wärme trifft Eleganz,",
    tipBody:
      "Der perfekte Winterlook kombiniert Funktionalität mit Stil – für City, Office und Wochenende.",
    tipTags: ["Mantel", "Layering", "Strick", "Boots"],
    filters: ["Alle", "Mantel", "Strick", "Layering", "Casual", "Elegant", "Business"],
    outfitGridLabel: "Aktuelle Winter-Looks",
    styleGuideHref: "/blog/seasonal-guides/winter-style-guide",
    stats: [
      { value: "60+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Täglich", label: "Aktualisiert" },
    ],
    outfits: [
      { id: 1, title: "Classic Wool Coat",      subtitle: "City & Business",    tag: "Trending", style: "Mantel",  image: "/outfits/sfold.png", href: "/outfits/classic-wool-coat"      },
      { id: 2, title: "Chunky Knit Combo",      subtitle: "Casual & Cozy",      tag: "Beliebt",  style: "Strick",  image: "/outfits/sfold.png", href: "/outfits/chunky-knit-combo"      },
      { id: 3, title: "Monochrome Layer Look",  subtitle: "Minimal & Modern",   tag: "Neu",      style: "Layering",image: "/outfits/sfold.png", href: "/outfits/monochrome-layer-look"  },
      { id: 4, title: "Teddy Coat Outfit",      subtitle: "Weekend & Freizeit", tag: "Trending", style: "Mantel",  image: "/outfits/sfold.png", href: "/outfits/teddy-coat-outfit"      },
      { id: 5, title: "Turtleneck & Trousers",  subtitle: "Office & Business",  tag: "Beliebt",  style: "Business",image: "/outfits/sfold.png", href: "/outfits/turtleneck-trousers"    },
      { id: 6, title: "Plaid Scarf Look",       subtitle: "Casual & Alltag",    tag: "Neu",      style: "Casual",  image: "/outfits/sfold.png", href: "/outfits/plaid-scarf-look"       },
      { id: 7, title: "Velvet Evening Look",    subtitle: "Abend & Event",      tag: "Trending", style: "Elegant", image: "/outfits/sfold.png", href: "/outfits/velvet-evening-look"    },
      { id: 8, title: "Oversized Puffer Coat",  subtitle: "Street & Urban",     tag: "Neu",      style: "Mantel",  image: "/outfits/sfold.png", href: "/outfits/oversized-puffer-coat"  },
    ],
    relatedCategories: [
      { label: "Sommerkleider",  href: "/outfits/season/summer",    accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Herbstlooks",    href: "/outfits/season/autumn",    accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Büro & Business",href: "/outfits/occasion/buero",   accent: "bg-[#f3e5f5]", accentText: "text-[#6a1b9a]" },
      { label: "Classic Style",  href: "/outfits/style/classic",    accent: "bg-gray-100",  accentText: "text-gray-700"  },
    ],
    faqs: [
      {
        q: "Wie layert man Winteroutfits richtig?",
        a: "Beginne mit einer dünnen Basisschicht (Turtleneck, Thermoshirt), füge eine wärmende Mittelschicht (Strickpullover, Wollweste) hinzu und schließe mit einem Mantel oder einer Jacke ab. So bleibt der Look stilvoll und du kannst Schichten je nach Temperatur anpassen.",
      },
      {
        q: "Welche Mäntel sind im Winter 2025/2026 im Trend?",
        a: "Oversized Wollmäntel in Camel und Dunkelgrün, strukturierte Teddy-Coats und taillierte Midi-Mäntel sind die großen Wintertrends. Auch Puffer-Coats in gedeckten Tönen wie Navy, Schwarz und Olivgrün bleiben ein sicherer Alltagsbegleiter.",
      },
      {
        q: "Welche Schuhe passen zu Winteroutfits?",
        a: "Chelsea Boots und Kniehohe Stiefel sind die vielseitigsten Winterbegleiter. Chunky Loafer mit dicken Socken verleihen dem Look einen modernen Touch. Für elegante Anlässe sind schwarze Stiefeletten mit Absatz eine zeitlose Wahl.",
      },
    ],
    seo: {
      title: "Winteroutfits 2025 – Warme Looks für kalte Tage",
      description:
        "Entdecke kuratierte Winteroutfits 2025: Elegante Mäntel, cozy Strick-Kombis und stylische Layering-Looks für jeden Anlass – von Alltag bis Abend.",
      keywords: ["Winteroutfits", "Winter Look 2025", "Wintermantel Outfit", "Layering Look", "Strick Outfit", "Wintermode", "cozy Outfit", "Winterstyle"],
    },
  },

  "autumn": {
    label: "Herbstlooks",
    subtitle: "Herbst 2025",
    description:
      "Erdtöne, knackige Übergangslooks und elegante Trench Coats – entdecke kuratierte Herbstoutfits für jeden Stil und jeden Tag.",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    tipTitle: "Erdtöne, warme Texturen,",
    tipBody:
      "Der perfekte Herbstlook lebt von Schichtungen, satter Farbpalette und dem richtigen Mantel.",
    tipTags: ["Trench", "Erdtöne", "Stiefel", "Layering"],
    filters: ["Alle", "Trench", "Strick", "Denim", "Casual", "Elegant", "Layering"],
    outfitGridLabel: "Aktuelle Herbst-Looks",
    styleGuideHref: "/blog/seasonal-guides/autumn-style-guide",
    stats: [
      { value: "70+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Täglich", label: "Aktualisiert" },
    ],
    outfits: [
      { id: 1, title: "Camel Trench Coat",      subtitle: "City & Alltag",      tag: "Trending", style: "Trench",   image: "/outfits/sfold.png", href: "/outfits/camel-trench-coat"      },
      { id: 2, title: "Rust Knit & Jeans",      subtitle: "Casual & Weekend",   tag: "Beliebt",  style: "Strick",   image: "/outfits/sfold.png", href: "/outfits/rust-knit-jeans"        },
      { id: 3, title: "Olive Cargo Look",        subtitle: "Street & Urban",     tag: "Neu",      style: "Casual",   image: "/outfits/sfold.png", href: "/outfits/olive-cargo-look"       },
      { id: 4, title: "Plaid Blazer Outfit",     subtitle: "Office & Business",  tag: "Trending", style: "Elegant",  image: "/outfits/sfold.png", href: "/outfits/plaid-blazer-outfit"    },
      { id: 5, title: "Denim Layer Look",        subtitle: "Casual & Modern",    tag: "Beliebt",  style: "Denim",    image: "/outfits/sfold.png", href: "/outfits/denim-layer-look"       },
      { id: 6, title: "Brown Leather Jacket",    subtitle: "Street & Freizeit",  tag: "Neu",      style: "Layering", image: "/outfits/sfold.png", href: "/outfits/brown-leather-jacket"   },
      { id: 7, title: "Midi Skirt & Boots",      subtitle: "Elegant & Chic",     tag: "Trending", style: "Elegant",  image: "/outfits/sfold.png", href: "/outfits/midi-skirt-boots"       },
      { id: 8, title: "Oversized Blazer Look",   subtitle: "Business Casual",    tag: "Neu",      style: "Trench",   image: "/outfits/sfold.png", href: "/outfits/oversized-blazer-look"  },
    ],
    relatedCategories: [
      { label: "Winteroutfits",  href: "/outfits/season/winter",    accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
      { label: "Frühlingslooks", href: "/outfits/season/spring", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Boho Style",     href: "/outfits/style/boho",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Classic Style",  href: "/outfits/style/classic",    accent: "bg-gray-100",  accentText: "text-gray-700"  },
    ],
    faqs: [
      {
        q: "Welche Farben sind im Herbst 2025 angesagt?",
        a: "Erdtöne wie Camel, Rostbraun, Olivgrün und Dunkelrot dominieren die Herbstpalette 2025. Dazu kommen gedeckte Neutraltöne wie Greige und Dunkelgrau als vielseitige Basisfarben.",
      },
      {
        q: "Wie kombiniert man einen Trench Coat im Herbst?",
        a: "Ein Camel Trench Coat passt zu fast allem: über einem schlichten weißen Hemd und Straight-Leg-Jeans für den Alltag, über einem Midi-Kleid für elegante Anlässe oder über einem kräftigen Rollkragenpullover für kühlere Tage.",
      },
      {
        q: "Welche Schuhe passen zu Herbstoutfits?",
        a: "Kniehohe Stiefel in Braun oder Schwarz sind der klassische Herbstbegleiter. Ankle Boots mit Blockabsatz verleihen dem Look einen modernen Touch, während Chelsea Boots eine vielseitige Alltagsoption sind.",
      },
    ],
    seo: {
      title: "Herbstoutfits 2025 – Looks für die goldene Jahreszeit",
      description:
        "Entdecke kuratierte Herbstoutfits 2025: Trench Coats, Erdton-Kombis, Layering-Looks und elegante Stiefeloutfits für jeden Anlass – von Alltag bis Abend.",
      keywords: ["Herbstoutfits", "Herbst Look 2025", "Trench Coat Outfit", "Herbstmode", "Erdtöne Outfit", "Layering Herbst", "Herbststyle", "Übergangsoutfit"],
    },
  },

  "spring": {
    label: "Frühlingslooks",
    subtitle: "Frühling 2026",
    description:
      "Pastelltöne, leichte Blazer und frische Kombinationen – entdecke kuratierte Frühlingsoutfits für helle Tage voller Energie.",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    tipTitle: "Frische Farben, leichte Stoffe,",
    tipBody:
      "Der perfekte Frühlingslook bringt neue Energie in den Kleiderschrank – mit Pastell, Leinen und Floral.",
    tipTags: ["Pastell", "Leinen", "Blazer", "Floral"],
    filters: ["Alle", "Pastell", "Floral", "Blazer", "Leinen", "Casual", "Elegant"],
    outfitGridLabel: "Aktuelle Frühlings-Looks",
    styleGuideHref: "/blog/seasonal-guides/spring-style-guide",
    stats: [
      { value: "65+", label: "Looks" },
      { value: "4", label: "Styles" },
      { value: "Täglich", label: "Aktualisiert" },
    ],
    outfits: [
      { id: 1, title: "Pastel Blazer Set",       subtitle: "Office & Chic",      tag: "Trending", style: "Blazer",  image: "/outfits/sfold.png", href: "/outfits/pastel-blazer-set"      },
      { id: 2, title: "Floral Midi Dress",        subtitle: "Alltag & Freizeit",  tag: "Beliebt",  style: "Floral",  image: "/outfits/sfold.png", href: "/outfits/floral-midi-dress"      },
      { id: 3, title: "Linen Wide-Leg Pants",     subtitle: "Casual & Modern",    tag: "Neu",      style: "Leinen",  image: "/outfits/sfold.png", href: "/outfits/linen-wide-leg-pants"   },
      { id: 4, title: "White & Sage Combo",       subtitle: "Minimal & Fresh",    tag: "Trending", style: "Pastell", image: "/outfits/sfold.png", href: "/outfits/white-sage-combo"       },
      { id: 5, title: "Denim & Floral Top",       subtitle: "Street & Casual",    tag: "Beliebt",  style: "Floral",  image: "/outfits/sfold.png", href: "/outfits/denim-floral-top"       },
      { id: 6, title: "Mint Trench Look",         subtitle: "City & Business",    tag: "Neu",      style: "Blazer",  image: "/outfits/sfold.png", href: "/outfits/mint-trench-look"       },
      { id: 7, title: "Lilac Knit Dress",         subtitle: "Elegant & Soft",     tag: "Trending", style: "Pastell", image: "/outfits/sfold.png", href: "/outfits/lilac-knit-dress"       },
      { id: 8, title: "Striped Linen Shirt Look", subtitle: "Weekend & Outdoor",  tag: "Neu",      style: "Leinen",  image: "/outfits/sfold.png", href: "/outfits/striped-linen-shirt"    },
    ],
    relatedCategories: [
      { label: "Sommerkleider",  href: "/outfits/season/summer",    accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
      { label: "Herbstlooks",    href: "/outfits/season/autumn",    accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
      { label: "Boho Style",     href: "/outfits/style/boho",       accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
      { label: "Beach Looks",    href: "/outfits/occasion/strand",  accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
    ],
    faqs: [
      {
        q: "Welche Farben sind im Frühling 2026 angesagt?",
        a: "Weiche Pastelltöne wie Mintgrün, Flieder, Babyblau und zartes Rosa dominieren den Frühling 2026. Dazu kommen frische Neutraltöne wie Off-White und Hellbeige als elegante Basis.",
      },
      {
        q: "Wie stylt man einen Frühlingsblazor?",
        a: "Ein Pastellblazer funktioniert over einer einfarbigen Hose für den Office-Look, über einem leichten Blumenkleid für einen femininen Touch oder mit Jeans und weißem T-Shirt für einen casual-chic Alltagslook.",
      },
      {
        q: "Welche Schuhe passen zu Frühlingsoutfits?",
        a: "Weiße Sneakers sind der vielseitigste Frühlingsbegleiter. Loafer in Nude oder Pastell verleihen dem Look einen eleganten Touch, während flache Sandalen an wärmeren Frühlingstagen die erste Wahl sind.",
      },
    ],
    
    // SEO TAGS
    seo: {
      title: "Frühlingsoutfits 2026 – Frische Looks für helle Tage",
      description:
        "Entdecke kuratierte Frühlingsoutfits 2026: Pastell-Blazer, Blumenkleider, Leinenkombi und leichte Layering-Looks für jeden Anlass – von Alltag bis Abend.",
      keywords: ["Frühlingsoutfits", "Frühling Look 2026", "Pastell Outfit", "Frühlingsmode", "Leinenoutfit", "Blazer Outfit Frühling", "Frühlingstyle", "Blumenkleid"],
    },
  },
};

// ─── Static Params (SSG) ──────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(seasons).map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const season = seasons[slug];
  if (!season) return {};

  return {
    title: season.seo.title,
    description: season.seo.description,
    keywords: season.seo.keywords,
    alternates: { canonical: `https://stylefinden.com/outfits/season/${slug}` },
    openGraph: {
      title: `${season.seo.title} | STYLEFINDEN`,
      description: season.seo.description,
      url: `https://stylefinden.com/outfits/season/${slug}`,
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

export default async function SeasonPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const season = seasons[slug];

  if (!season) notFound();

  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-6 pb-0">
        <nav className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors duration-200">Start</a>
          <span>/</span>
          <a href="/outfits" className="hover:text-black transition-colors duration-200">Outfits</a>
          <span>/</span>
          <a href="/outfits/season" className="hover:text-black transition-colors duration-200">Saison</a>
          <span>/</span>
          <span className="text-black">{season.label}</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className={`text-xs font-semibold tracking-widest uppercase ${season.accentText}`}>
                {season.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                {season.label} <br />
                <span className="italic font-light">Outfits & Looks</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                {season.description}
              </p>

              <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
                {season.stats.map((stat, i) => (
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
            <div className={`hidden md:flex flex-col gap-3 ${season.accent} p-8 xl:p-10 w-full md:w-80 xl:w-96 flex-shrink-0`}>
              <span className={`text-xs font-semibold tracking-widest uppercase ${season.accentText}`}>
                Style Tipp
              </span>
              <p className="text-sm md:text-base font-black text-black leading-snug tracking-tight">
                {season.tipTitle}<br />
                <span className="italic font-light">zeitlose Eleganz.</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">{season.tipBody}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {season.tipTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Style Filter ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mr-2">
              Filter:
            </span>
            {season.filters.map((filter, i) => (
              <a
                key={filter}
                href={i === 0
                  ? `/outfits/season/${slug}`
                  : `/outfits/season/${slug}?style=${filter.toLowerCase()}`}
                className={[
                  "px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200",
                  i === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white",
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
                {season.outfitGridLabel}
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
            {season.outfits.map((outfit, index) => (
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
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${season.accent} ${season.accentText}`}>
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
              href={`/outfits?saison=${slug}`}
              className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
            >
              Mehr {season.label} laden
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
            {season.relatedCategories.map((cat) => (
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
                {season.label} <span className="italic font-light">finden & stylen</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{season.description}</p>
              <a
                href={season.styleGuideHref}
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
              {season.faqs.map((faq, i) => (
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

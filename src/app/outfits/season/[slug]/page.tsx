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
  "summer-dress": {
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
      { label: "Herbstlooks",    href: "/outfits/season/herbst",    accent: "bg-[#efebe9]", accentText: "text-[#4e342e]" },
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

  // Buraya yeni sezonlar eklenebilir: "winter", "herbst", "fruehling", vb.
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

            {/* Accent Kart */}
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
            {season.outfits.map((outfit) => (
              <a key={outfit.id} href={outfit.href} className="group flex flex-col gap-3">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <img
                    src={outfit.image}
                    alt={`${outfit.title} – ${outfit.subtitle}`}
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

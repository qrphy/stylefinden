import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outfits – Looks für jeden Anlass & Stil",
  description:
    "Entdecke kuratierte Outfit-Kollektionen für jede Saison, jeden Stil und jeden Anlass – von Sommerkleidern bis hin zu eleganten Abendlooks.",
  alternates: { canonical: "https://stylefinden.com/outfits" },
  openGraph: {
    title: "Outfits – Looks für jeden Anlass & Stil | STYLEFINDEN",
    description: "Kuratierte Outfit-Kollektionen für jede Saison und jeden Anlass.",
    url: "https://stylefinden.com/outfits",
    type: "website",
    locale: "de_DE",
    siteName: "STYLEFINDEN",
  },
};

// ─── Daten ────────────────────────────────────────────────────────────────────

const saisonCollections = [
  {
    slug: "summer",
    label: "Sommerkleider",
    description: "Leichte Kleider, florale Prints & Leinenroben für heiße Tage",
    tags: ["Maxi", "Midi", "Mini", "Floral"],
    badge: "Neu",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "winter",
    label: "Winteroutfits",
    description: "Warme Layering-Looks, Mäntel und kuschelige Kombis für kalte Tage",
    tags: ["Mantel", "Layering", "Strick", "Boots"],
    badge: "Neu",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "herbst",
    label: "Herbstlooks",
    description: "Erdtöne, Trench Coats und knackige Übergangslooks",
    tags: ["Erdtöne", "Trench", "Midi", "Stiefel"],
    badge: "Neu",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "fruehling",
    label: "Frühlingslooks",
    description: "Pastelltöne, leichte Blazer und frische Kombinationen",
    tags: ["Pastell", "Blazer", "Leinen", "Floral"],
    badge: "Neu",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    image: "/outfits/sfold.png",
    active: true,
  },
];

const anlassCollections = [
  {
    slug: "buero-outfit",
    label: "Büro & Business",
    description: "Polished und professionell – Looks für Meeting, Office und Co.",
    badge: "Bald",
    active: false,
  },
  {
    slug: "abend-outfit",
    label: "Abend & Event",
    description: "Elegante Outfits für Dinner, Partys und besondere Anlässe",
    badge: "Bald",
    active: false,
  },
  {
    slug: "casual-outfit",
    label: "Casual & Alltag",
    description: "Bequeme, stylische Alltagslooks für entspannte Tage",
    badge: "Bald",
    active: false,
  },
  {
    slug: "strand-outfit",
    label: "Strand & Urlaub",
    description: "Beach Vibes, Cover-ups und sommerliche Urlaubslooks",
    badge: "Bald",
    active: false,
  },
  {
    slug: "festival-outfit",
    label: "Festival & Outdoor",
    description: "Boho, Denim und verspielte Layering-Looks für Open Air",
    badge: "Bald",
    active: false,
  },
  {
    slug: "date-night-outfit",
    label: "Date Night",
    description: "Romantische und selbstbewusste Looks für unvergessliche Abende",
    badge: "Bald",
    active: false,
  },
];

const stilCollections = [
  { slug: "boho-style",       label: "Boho",       description: "Fließende Stoffe, Fransen & Naturfarben", badge: "Bald", active: false },
  { slug: "minimalist-style", label: "Minimalist", description: "Clean, schlicht und zeitlos elegant",       badge: "Bald", active: false },
  { slug: "streetstyle",      label: "Street Style",description: "Urban, bold und immer im Trend",           badge: "Bald", active: false },
  { slug: "classic-style",    label: "Classic",    description: "Zeitlose Basics mit modernem Twist",        badge: "Bald", active: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  Neu:  "bg-black text-white",
  Bald: "bg-gray-100 text-gray-500",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OutfitsPage() {
  return (
    <main className="flex-1 bg-white">

      {/* ── Hero ── */}
      <section className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-14 md:py-20">
          <div className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Outfit-Kollektionen
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
              Finde deinen <br />
              <span className="italic font-light">perfekten Look.</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
              Stöbere durch kuratierte Outfit-Kollektionen – sortiert nach Saison,
              Anlass und Stil. Neue Kollektionen erscheinen regelmäßig.
            </p>
          </div>
        </div>
      </section>

      {/* ── Saison Kollektionen ── */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Nach Saison
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {saisonCollections.map((col) =>
              col.active ? (
                <a
                  key={col.slug}
                  href={`/outfits/season/${col.slug}`}
                  className="group relative overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <img
                      src={col.image}
                      alt={col.label}
                      className="absolute inset-0 w-full h-full object-cover object-top
                                 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
                    <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${badgeColors[col.badge]}`}>
                      {col.badge}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h2 className="text-lg font-black text-white tracking-tight leading-tight">
                        {col.label}
                      </h2>
                    </div>
                  </div>
                  {/* Info */}
                  <div className={`flex flex-col gap-3 p-5 ${col.accent}`}>
                    <p className="text-xs text-gray-700 leading-relaxed">{col.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {col.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs font-medium tracking-widest uppercase bg-white text-gray-600 border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={`self-start flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase ${col.accentText} group-hover:gap-3 transition-all duration-200`}>
                      Entdecken
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={2.5}>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </a>
              ) : (
                <div
                  key={col.slug}
                  className="relative flex flex-col opacity-60 cursor-not-allowed"
                >
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <img
                      src={col.image}
                      alt={col.label}
                      className="absolute inset-0 w-full h-full object-cover object-top grayscale"
                    />
                    <div className="absolute inset-0 bg-white/40" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
                    <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${badgeColors[col.badge]}`}>
                      {col.badge}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h2 className="text-lg font-black text-black tracking-tight leading-tight">
                        {col.label}
                      </h2>
                    </div>
                  </div>
                  <div className={`flex flex-col gap-3 p-5 ${col.accent}`}>
                    <p className="text-xs text-gray-600 leading-relaxed">{col.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {col.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs font-medium tracking-widest uppercase bg-white/70 text-gray-500 border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="self-start text-xs font-semibold tracking-widest uppercase text-gray-400">
                      Demnächst verfügbar
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Anlass Kollektionen ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Nach Anlass
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
            {anlassCollections.map((col) => (
              col.active ? (
                <a
                  key={col.slug}
                  href={`/outfits/occasion/${col.slug}`}
                  className="group flex flex-col gap-3 p-5 bg-gray-50 hover:bg-black transition-colors duration-300"
                >
                  <span className={`self-start px-2 py-0.5 text-xs font-semibold tracking-widest uppercase ${badgeColors[col.badge]}`}>
                    {col.badge}
                  </span>
                  <h3 className="text-sm font-black text-black group-hover:text-white tracking-tight leading-tight transition-colors duration-300">
                    {col.label}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-300 line-clamp-2">
                    {col.description}
                  </p>
                </a>
              ) : (
                <div
                  key={col.slug}
                  className="flex flex-col gap-3 p-5 bg-gray-50 opacity-50 cursor-not-allowed"
                >
                  <span className={`self-start px-2 py-0.5 text-xs font-semibold tracking-widest uppercase ${badgeColors[col.badge]}`}>
                    {col.badge}
                  </span>
                  <h3 className="text-sm font-black text-black tracking-tight leading-tight">
                    {col.label}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── Stil Kollektionen ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Nach Stil
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stilCollections.map((col) => (
              col.active ? (
                <a
                  key={col.slug}
                  href={`/outfits/style/${col.slug}`}
                  className="group flex flex-col gap-3 p-6 md:p-8 border border-black hover:bg-black transition-colors duration-300"
                >
                  <span className={`self-start px-2 py-0.5 text-xs font-semibold tracking-widest uppercase ${badgeColors[col.badge]}`}>
                    {col.badge}
                  </span>
                  <h3 className="text-base font-black text-black group-hover:text-white tracking-tight transition-colors duration-300">
                    {col.label}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                    {col.description}
                  </p>
                </a>
              ) : (
                <div
                  key={col.slug}
                  className="flex flex-col gap-3 p-6 md:p-8 border border-gray-200 opacity-50 cursor-not-allowed"
                >
                  <span className={`self-start px-2 py-0.5 text-xs font-semibold tracking-widest uppercase ${badgeColors[col.badge]}`}>
                    {col.badge}
                  </span>
                  <h3 className="text-base font-black text-black tracking-tight">{col.label}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{col.description}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

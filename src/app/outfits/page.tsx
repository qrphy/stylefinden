import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outfits – Looks for Every Occasion & Style",
  description:
    "Discover curated outfit collections for every season, every style and every occasion – from summer dresses to elegant evening looks.",
  alternates: { canonical: "https://stylefinden.com/outfits" },
  openGraph: {
    title: "Outfits – Looks for Every Occasion & Style | STYLEFINDEN",
    description: "Curated outfit collections for every season and every occasion.",
    url: "https://stylefinden.com/outfits",
    type: "website",
    locale: "en_US",
    siteName: "STYLEFINDEN",
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const seasonCollections = [
  {
    slug: "summer",
    label: "Summer Dresses",
    description: "Light dresses, floral prints & linen robes for hot days",
    tags: ["Maxi", "Midi", "Mini", "Floral"],
    badge: "New",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "winter",
    label: "Winter Outfits",
    description: "Warm layering looks, coats and cozy combinations for cold days",
    tags: ["Coat", "Layering", "Knitwear", "Boots"],
    badge: "New",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "autumn",
    label: "Autumn Looks",
    description: "Earth tones, trench coats and crisp transitional looks",
    tags: ["Earth Tones", "Trench", "Midi", "Boots"],
    badge: "New",
    accent: "bg-[#efebe9]",
    accentText: "text-[#4e342e]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "spring",
    label: "Spring Looks",
    description: "Pastel tones, light blazers and fresh combinations",
    tags: ["Pastels", "Blazer", "Linen", "Floral"],
    badge: "New",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    image: "/outfits/sfold.png",
    active: true,
  },
];

const occasionCollections = [
  {
    slug: "office",
    label: "Office & Business",
    description: "Polished and professional – looks for meetings, office and more",
    tags: ["Blazer", "Tailoring", "Neutral", "Polished"],
    badge: "New",
    accent: "bg-[#f3e5f5]",
    accentText: "text-[#6a1b9a]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "evening",
    label: "Evening & Event",
    description: "Elegant outfits for dinners, parties and special occasions",
    tags: ["Midi", "Silk", "Statement", "Elegant"],
    badge: "New",
    accent: "bg-gray-900",
    accentText: "text-white",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "casual",
    label: "Casual & Everyday",
    description: "Comfortable, stylish everyday looks for relaxed days",
    tags: ["Denim", "Basics", "Comfort", "Layering"],
    badge: "New",
    accent: "bg-[#fff8e1]",
    accentText: "text-[#f57f17]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "beach",
    label: "Beach & Vacation",
    description: "Beach vibes, cover-ups and summery vacation looks",
    tags: ["Linen", "Cover-up", "Maxi", "Kaftan"],
    badge: "New",
    accent: "bg-[#e3f2fd]",
    accentText: "text-[#1565c0]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "festival",
    label: "Festival & Outdoor",
    description: "Boho, denim and playful layering looks for open air",
    tags: ["Boho", "Denim", "Fringe", "Floral"],
    badge: "New",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "date-night",
    label: "Date Night",
    description: "Romantic and confident looks for unforgettable evenings",
    tags: ["Midi", "Romantic", "Bold", "Feminine"],
    badge: "New",
    accent: "bg-[#fce4ec]",
    accentText: "text-[#c62828]",
    image: "/outfits/sfold.png",
    active: true,
  },
];

const styleCollections = [
  {
    slug: "boho",
    label: "Boho",
    description: "Flowing fabrics, fringe & earthy tones",
    tags: ["Maxi", "Floral", "Fringe", "Linen"],
    badge: "New",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "minimalist",
    label: "Minimalist",
    description: "Clean, simple and timelessly elegant",
    tags: ["Neutral", "Monochrome", "Basics", "Clean"],
    badge: "New",
    accent: "bg-gray-100",
    accentText: "text-gray-700",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "streetstyle",
    label: "Street Style",
    description: "Urban, bold and always on trend",
    tags: ["Denim", "Oversized", "Graphic", "Sneaker"],
    badge: "New",
    accent: "bg-gray-900",
    accentText: "text-white",
    image: "/outfits/sfold.png",
    active: true,
  },
  {
    slug: "classic",
    label: "Classic",
    description: "Timeless basics with a modern twist",
    tags: ["Blazer", "Trench", "Tailoring", "Neutral"],
    badge: "New",
    accent: "bg-[#fafafa]",
    accentText: "text-gray-900",
    image: "/outfits/sfold.png",
    active: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  New:  "bg-black text-white",
  Soon: "bg-gray-100 text-gray-500",
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
              Outfit Collections
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
              Find your <br />
              <span className="italic font-light">perfect look.</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
              Browse curated outfit collections – sorted by season,
              occasion and style. New collections added regularly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Season Collections ── */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              By Season
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {seasonCollections.map((col) =>
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
                      loading="lazy"
                      decoding="async"
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
                      Discover
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
                      Coming Soon
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Occasion Collections ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              By Occasion
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
            {occasionCollections.map((col) =>
              col.active ? (
                <a
                  key={col.slug}
                  href={`/outfits/occasion/${col.slug}`}
                  className="group relative overflow-hidden flex flex-col"
                >
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <img
                      src={col.image}
                      alt={col.label}
                      loading="lazy"
                      decoding="async"
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
                  <div className={`flex flex-col gap-3 p-5 ${col.accent}`}>
                    <p className={`text-xs leading-relaxed ${col.accentText === "text-white" ? "text-gray-300" : "text-gray-700"}`}>{col.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {col.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs font-medium tracking-widest uppercase bg-white text-gray-600 border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={`self-start flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase ${col.accentText === "text-white" ? "text-gray-300" : col.accentText} group-hover:gap-3 transition-all duration-200`}>
                      Discover
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={2.5}>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </a>
              ) : (
                <div key={col.slug} className="relative flex flex-col opacity-60 cursor-not-allowed">
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
                      <h2 className="text-lg font-black text-black tracking-tight leading-tight">{col.label}</h2>
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
                      Coming Soon
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Style Collections ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              By Style
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {styleCollections.map((col) =>
              col.active ? (
                <a
                  key={col.slug}
                  href={`/outfits/style/${col.slug}`}
                  className="group relative overflow-hidden flex flex-col"
                >
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <img
                      src={col.image}
                      alt={col.label}
                      loading="lazy"
                      decoding="async"
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
                  <div className={`flex flex-col gap-3 p-5 ${col.accent}`}>
                    <p className={`text-xs leading-relaxed ${col.accentText === "text-white" ? "text-gray-300" : "text-gray-700"}`}>{col.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {col.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs font-medium tracking-widest uppercase bg-white text-gray-600 border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={`self-start flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase ${col.accentText === "text-white" ? "text-gray-300" : col.accentText} group-hover:gap-3 transition-all duration-200`}>
                      Discover
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={2.5}>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </a>
              ) : (
                <div key={col.slug} className="relative flex flex-col opacity-60 cursor-not-allowed">
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
                      <h2 className="text-lg font-black text-black tracking-tight leading-tight">{col.label}</h2>
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
                      Coming Soon
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

    </main>
  );
}

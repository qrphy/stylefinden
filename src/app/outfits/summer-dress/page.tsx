import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sommerkleider Outfits – Leichte Looks für heiße Tage",
  description:
    "Entdecke die schönsten Sommerkleider-Outfits 2025: Maxi-Kleider, Midi-Kleider, florale Prints und leichte Leinenkleider für jeden Anlass – von Strand bis Stadtbummel.",
  keywords: [
    "Sommerkleider",
    "Sommerkleid Outfit",
    "Maxikleid",
    "Midikleid",
    "Sommerkleid 2025",
    "Sommerkleid Styling",
    "Blumenkleid",
    "Leinenkleid",
    "Strandkleid",
    "leichte Kleider Sommer",
  ],
  alternates: {
    canonical: "https://stylefinden.com/outfits/summer-dress",
  },
  openGraph: {
    title: "Sommerkleider Outfits – Leichte Looks für heiße Tage | STYLEFINDEN",
    description:
      "Maxi, Midi, Floral oder Linen – entdecke kuratierte Sommerkleid-Outfits für jeden Stil und jeden Anlass.",
    url: "https://stylefinden.com/outfits/summer-dress",
    type: "website",
    locale: "de_DE",
    siteName: "STYLEFINDEN",
  },
};

const outfits = [
  {
    id: 1,
    title: "Floral Maxi Dress",
    subtitle: "Strand & Urlaub",
    tag: "Trending",
    style: "Maxi",
    image: "/outfits/sfold.png",
    href: "/outfits/floral-maxi-dress",
  },
  {
    id: 2,
    title: "Linen Slip Dress",
    subtitle: "Casual & City",
    tag: "Neu",
    style: "Midi",
    image: "/outfits/sfold.png",
    href: "/outfits/linen-slip-dress",
  },
  {
    id: 3,
    title: "Boho Wrap Dress",
    subtitle: "Festival & Natur",
    tag: "Beliebt",
    style: "Maxi",
    image: "/outfits/sfold.png",
    href: "/outfits/boho-wrap-dress",
  },
  {
    id: 4,
    title: "Mini Sun Dress",
    subtitle: "Sommer & Freizeit",
    tag: "Trending",
    style: "Mini",
    image: "/outfits/sfold.png",
    href: "/outfits/mini-sun-dress",
  },
  {
    id: 5,
    title: "Stripe Midi Dress",
    subtitle: "Chic & Modern",
    tag: "Neu",
    style: "Midi",
    image: "/outfits/sfold.png",
    href: "/outfits/stripe-midi-dress",
  },
  {
    id: 6,
    title: "Off-Shoulder Dress",
    subtitle: "Abend & Event",
    tag: "Beliebt",
    style: "Midi",
    image: "/outfits/sfold.png",
    href: "/outfits/off-shoulder-dress",
  },
  {
    id: 7,
    title: "Cotton Sundress",
    subtitle: "Alltag & Picknick",
    tag: "Trending",
    style: "Mini",
    image: "/outfits/sfold.png",
    href: "/outfits/cotton-sundress",
  },
  {
    id: 8,
    title: "Flowy Chiffon Dress",
    subtitle: "Elegant & Leicht",
    tag: "Neu",
    style: "Maxi",
    image: "/outfits/sfold.png",
    href: "/outfits/flowy-chiffon-dress",
  },
];

const tagColors: Record<string, string> = {
  Trending: "bg-black text-white",
  Neu: "bg-white text-black border border-black",
  Beliebt: "bg-gray-100 text-gray-700",
};

const styles = ["Alle", "Maxi", "Midi", "Mini", "Floral", "Linen", "Boho"];

const relatedCategories = [
  { label: "Sommer Outfits", href: "/outfits/season/sommer", accent: "bg-[#EDCFA9]", accentText: "text-[#f57f17]" },
  { label: "Boho Style", href: "/outfits/style/boho", accent: "bg-[#e8f5e9]", accentText: "text-[#2e7d32]" },
  { label: "Beach Looks", href: "/outfits/occasion/strand", accent: "bg-[#e3f2fd]", accentText: "text-[#1565c0]" },
  { label: "Festival Style", href: "/outfits/occasion/festival", accent: "bg-[#fce4ec]", accentText: "text-[#c62828]" },
];

const seoFaqs = [
  {
    q: "Wie kombiniert man ein Sommerkleid stilvoll?",
    a: "Ein Sommerkleid lässt sich vielseitig stylen: Mit Sandalen und Strohhut für den Strand, mit weißen Sneakers für den Stadtbummel oder mit Mules und Clutch für Abendanlässe. Ein leichter Leinenoversize-Blazer macht daraus auch ein Business-casual-Look.",
  },
  {
    q: "Welche Sommerkleid-Schnitte passen zu welchem Körpertyp?",
    a: "Maxi-Kleider betonen die Taille und eignen sich für alle Figuren. Midi-Kleider strecken optisch die Beine. A-Linien-Schnitte harmonieren mit Birnenformen, während Empire-Schnitte den Bauchbereich elegant kaschieren.",
  },
  {
    q: "Welche Accessoires passen zum Sommerkleid?",
    a: "Strohhüte, Rattan-Taschen, goldene Schmuckstücke und flache Sandalen ergänzen Sommerkleider perfekt. Für den Abend empfehlen sich Riemchensandalen mit kleinem Absatz und eine minimalistische Clutch.",
  },
];

export default function SummerDressPage() {
  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-6 pb-0">
        <nav className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors duration-200">Start</a>
          <span>/</span>
          <a href="/outfits" className="hover:text-black transition-colors duration-200">Outfits</a>
          <span>/</span>
          <span className="text-black">Sommerkleider</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#f57f17]">
                Sommer 2025
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                Sommerkleider <br />
                <span className="italic font-light">Outfits & Looks</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                Von verspielten Blumenkleidern über elegante Maxi-Roben bis hin zu
                lässigen Mini-Dresses – entdecke kuratierte Sommerkleid-Outfits für
                jeden Stil, jeden Tag und jeden Anlass.
              </p>

              <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-black">80+</span>
                  <span className="text-xs tracking-widest uppercase text-gray-400">Looks</span>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-xl font-black text-black">3</span>
                  <span className="text-xs tracking-widest uppercase text-gray-400">Schnitte</span>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-xl font-black text-black">Täglich</span>
                  <span className="text-xs tracking-widest uppercase text-gray-400">Aktualisiert</span>
                </div>
              </div>
            </div>

            {/* Hero accent card */}
            <div className="hidden md:flex flex-col gap-3 bg-[#EDCFA9] p-8 xl:p-10 w-full md:w-80 xl:w-96 flex-shrink-0">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#f57f17]">
                Style Tipp
              </span>
              <p className="text-sm md:text-base font-black text-black leading-snug tracking-tight">
                Leichte Stoffe, mutige Prints,<br />
                <span className="italic font-light">zeitlose Eleganz.</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Das perfekte Sommerkleid kombiniert Leichtigkeit mit Stil –
                für Beach, City und Beyond.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Linen", "Floral", "Maxi", "Boho"].map((tag) => (
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
            {styles.map((style, i) => (
              <a
                key={style}
                href={i === 0 ? "/outfits/summer-dress" : `/outfits/summer-dress?style=${style.toLowerCase()}`}
                className={[
                  "px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200",
                  i === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white",
                ].join(" ")}
              >
                {style}
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
                Aktuelle Sommerkleid-Looks
              </h2>
            </div>
            <a
              href="/outfits?kategorie=kleid"
              className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group"
            >
              Alle Kleider
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {outfits.map((outfit) => (
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
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${tagColors[outfit.tag] ?? "bg-gray-100 text-gray-700"}`}>
                      {outfit.tag}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-[#EDCFA9] text-[#f57f17]">
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
              href="/outfits?kategorie=kleid&saison=sommer"
              className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
            >
              Mehr Sommerkleid-Outfits laden
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
            {relatedCategories.map((cat) => (
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

      {/* ── SEO Text ── */}
      <section className="w-full border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">

            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Style Guide
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                Das perfekte Sommerkleid <span className="italic font-light">finden & stylen</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Das Sommerkleid ist das vielseitigste Kleidungsstück der warmen Jahreszeit.
                Ob verspieltes Blumenprint-Midi für den Farmers Market, ein fließendes
                Leinenmaxi für den Strandtag oder ein strukturiertes Off-Shoulder-Kleid
                für sommerliche Abendveranstaltungen – die richtige Wahl macht den Unterschied.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bei STYLEFINDEN findest du kuratierte Sommerkleid-Outfits mit konkreten
                Styling-Tipps, Accessoire-Empfehlungen und Kombinationsideen – damit du
                deinen Look von Kopf bis Fuß stimmig gestalten kannst.
              </p>
              <a
                href="/blog/seasonal-guides/sommer-style-guide"
                className="self-start flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-600 transition-colors duration-200 group"
              >
                Zum Sommer Style Guide
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Häufige Fragen
              </span>
              {seoFaqs.map((faq, i) => (
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

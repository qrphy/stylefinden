const seasons = [
  {
    id: "fruehling",
    label: "Jetzt aktuell",
    season: "Frühling 2025",
    heading: "Frische Looks für den Frühling",
    description:
      "Pastelltöne, leichte Stoffe und florale Muster – der Frühling bringt neue Energie in deinen Kleiderschrank. Entdecke die schönsten Kombinationen für sonnige Tage.",
    tags: ["Pastell", "Leinen", "Floral", "Trench Coat"],
    cta: { label: "Frühlings-Outfits entdecken", href: "/outfits?saison=fruehling" },
    image: "seasons/sfold.png",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
  },
  {
    id: "sommer",
    label: "Vorschau",
    season: "Sommer 2025",
    heading: "Sommer Looks, die begeistern",
    description:
      "Leichte Kleider, kühle Leinenhosen und mutige Farben – bereite dich jetzt auf die heißen Monate vor. Unsere kuratierten Sommer-Looks machen jede Gelegenheit zum Highlight.",
    tags: ["Linen", "Maxikleid", "Strandlook", "Sommerfarben"],
    cta: { label: "Sommer-Outfits entdecken", href: "/outfits?saison=sommer" },
    image: "seasons/sfold.png",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
  },
];

export default function SeasonalHighlights() {
  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">

        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Saisonale Guides
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            Style passend zur Saison
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {seasons.map((s, i) => (
            <div
              key={s.id}
              className={["flex flex-col md:flex-row overflow-hidden", i % 2 !== 0 ? "md:flex-row-reverse" : ""].join(" ")}
            >
              <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={s.image}
                  alt={s.season}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center
                             transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold tracking-widest uppercase ${s.accent} ${s.accentText}`}>
                    {s.label}
                  </span>
                </div>
              </div>

              <div className={`flex flex-col justify-center gap-6 p-8 md:p-12 xl:p-16 w-full md:w-1/2 ${s.accent}`}>
                <span className={`text-xs font-semibold tracking-widest uppercase ${s.accentText}`}>
                  {s.season}
                </span>
                <h3 className="text-2xl md:text-3xl xl:text-4xl font-black text-black leading-tight tracking-tight">
                  {s.heading}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={s.cta.href}
                  className="self-start flex items-center gap-2 px-8 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200 group"
                >
                  {s.cta.label}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

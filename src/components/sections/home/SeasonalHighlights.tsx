// Mevsimsel kombin rehberleri — her mevsim için görsel + açıklama + etiketler
// içeren yan yana kartlar. Tek sayılı kartlar sağa hizalanır (alternatif layout).
// Tamamen statik, CTA'lar /outfits?season= filtrelerine yönlendirir.
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

const seasons = [
  {
    id: "spring",
    label: "Now trending",
    season: "Spring 2025",
    heading: "Fresh looks for Spring",
    description:
      "Pastel tones, lightweight fabrics and floral patterns — spring brings new energy to your wardrobe. Discover the most beautiful combinations for sunny days.",
    tags: ["Pastels", "Linen", "Floral", "Trench Coat"],
    cta: { label: "Discover Spring Outfits", href: "/outfits?season=spring" },
    image: "seasons/sfold.png",
    accent: "bg-[#e8f5e9]",
    accentText: "text-[#2e7d32]",
  },
  {
    id: "summer",
    label: "Preview",
    season: "Summer 2025",
    heading: "Summer looks that inspire",
    description:
      "Light dresses, cool linen trousers and bold colors — get ready for the warm months now. Our curated summer looks make every occasion a highlight.",
    tags: ["Linen", "Maxi Dress", "Beach Look", "Summer Colors"],
    cta: { label: "Discover Summer Outfits", href: "/outfits?season=summer" },
    image: "seasons/sfold.png",
    accent: "bg-[#EDCFA9]",
    accentText: "text-[#f57f17]",
  },
];

export default function SeasonalHighlights() {
  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="container-page py-16 md:py-20">

        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="eyebrow">
            Seasonal Guides
          </span>
          <h2 className="section-title-lg">
            Style for the Season
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {seasons.map((s, i) => (
            <div
              key={s.id}
              className={["flex flex-col md:flex-row overflow-hidden", i % 2 !== 0 ? "md:flex-row-reverse" : ""].join(" ")}
            >
              <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100 flex-shrink-0">
                <ImgPlaceholder />
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
                    <span key={tag} className="tag">
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

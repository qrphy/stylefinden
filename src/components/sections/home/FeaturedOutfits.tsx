const outfits = [
  { id: 1, title: "Casual Chic",       subtitle: "Alltag & Freizeit",     tag: "Trending", image: "/outfits/sfold.png" },
  { id: 2, title: "Business Elegance", subtitle: "Büro & Meeting",        tag: "Neu",      image: "/outfits/sfold.png" },
  { id: 3, title: "Weekend Vibes",     subtitle: "Wochenende & Ausflug",  tag: "Trending", image: "/outfits/sfold.png" },
  { id: 4, title: "Evening Glam",      subtitle: "Abend & Event",         tag: "Beliebt",  image: "/outfits/sfold.png" },
  { id: 5, title: "Street Style",      subtitle: "Urban & Modern",        tag: "Neu",      image: "/outfits/sfold.png" },
  { id: 6, title: "Minimalist Look",   subtitle: "Schlicht & Edel",       tag: "Trending", image: "/outfits/sfold.png" },
  { id: 7, title: "Boho Dreams",       subtitle: "Festival & Natur",      tag: "Beliebt",  image: "/outfits/sfold.png" },
  { id: 8, title: "Classic Noir",      subtitle: "Zeitlos & Stark",       tag: "Trending", image: "/outfits/sfold.png" },
];

const tagColors: Record<string, string> = {
  Trending: "bg-black text-white",
  Neu:      "bg-white text-black border border-black",
  Beliebt:  "bg-gray-100 text-gray-700",
};

export default function FeaturedOutfits() {
  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Diese Woche angesagt
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
              Trending Outfits
            </h2>
          </div>
          <a
            href="/outfits"
            className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group"
          >
            Alle Outfits
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {outfits.map((outfit, index) => (
            <a key={outfit.id} href={`/outfits/${outfit.id}`} className="group flex flex-col gap-3">
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                <img
                  src={outfit.image}
                  alt={outfit.title}
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-top
                             transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${tagColors[outfit.tag] ?? "bg-gray-100 text-gray-700"}`}>
                  {outfit.tag}
                </span>
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
          <a href="/outfits" className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
            Alle Outfits entdecken
          </a>
        </div>

      </div>
    </section>
  );
}

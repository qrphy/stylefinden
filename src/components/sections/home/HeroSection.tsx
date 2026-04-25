export default function HeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20 xl:py-28">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-8 xl:gap-16">

          {/* ── left Side: Text Content ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:max-w-lg xl:max-w-xl">

            {/* Top Label  */}
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Deine Stil-Plattform
            </span>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
              Entdecke deinen <br />
              <span className="italic font-light">perfekten</span> Stil.
            </h1>

            {/* Context */}
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-sm md:max-w-none">
              Outfits, Frisuren und Accessoires für moderne Frauen –
              kuratiert, inspirierend und immer aktuell.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="/outfits"
                className="w-full sm:w-auto px-8 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200"
              >
                Jetzt entdecken
              </a>
              <a
                href="/style-guide"
                className="w-full sm:w-auto px-8 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
              >
                Styling Leitfaden
              </a>
            </div>

            {/* Site Statistics */}
            <div className="flex items-center gap-8 pt-4 border-t border-gray-100 w-full justify-center md:justify-start">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-black text-black">300+</span>
                <span className="text-xs tracking-widest uppercase text-gray-400">Outfits</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-black text-black">50+</span>
                <span className="text-xs tracking-widest uppercase text-gray-400">Frisuren</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-black text-black">100+</span>
                <span className="text-xs tracking-widest uppercase text-gray-400">Trends</span>
              </div>
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className="relative w-full md:w-1/2 xl:w-5/12 flex-shrink-0">

            {/* Main Image */}
            <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] w-full max-w-sm mx-auto md:max-w-none">
              <img
                src="seasons/sfold.png"
                alt="Stilvolle Frau mit modernem Outfit"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="w-full h-full object-cover object-top"
              />
              {/* Fallback gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
            </div>

            {/* Top left decorative card */}
            <div className="absolute -top-4 -left-4 md:-left-8 bg-white border border-gray-200 shadow-sm px-4 py-3 hidden sm:flex flex-col gap-1">
              <span className="text-xs tracking-widest uppercase text-gray-400">Neu</span>
              <span className="text-sm font-bold text-black">Herbst Trends 2025</span>
            </div>

            {/* Bottom right decorative card */}
            <div className="absolute -bottom-4 -right-4 md:-right-8 bg-black text-white px-4 py-3 hidden sm:flex flex-col gap-1">
              <span className="text-xs tracking-widest uppercase text-gray-400">Täglich</span>
              <span className="text-sm font-bold">Neue Inspirationen</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

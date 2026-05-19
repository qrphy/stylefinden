// Ana sayfa hero bölümü — editöryal tam-yükseklik layout
// Editorial meta bar + 7/5 grid: devasa başlık sola, dikey görsel sağa
// Grid container-page dışında — sağ görsel viewport kenarına kadar uzanır (full-bleed)
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

export default function HeroSection() {
  return (
    <section className="w-full bg-white overflow-hidden">

      {/* Editorial meta bar */}
      <div className="border-b border-gray-100">
        <div className="container-page py-3 flex items-center justify-center">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-400">
            Your Style Platform
          </span>
        </div>
      </div>

      {/* Main editorial grid — full viewport width, sağ görsel viewport kenarına uzanır */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[80vh] md:min-h-[82vh]">

        {/* Left column — container-page padding ile eşleştirildi */}
        <div className="md:col-span-7 flex flex-col justify-between py-10 md:py-14 xl:py-16
                        pl-6 md:pl-8 xl:pl-12
                        pr-6 md:pr-10 xl:pr-16">

          <h1 className="font-display text-[clamp(52px,9vw,128px)] font-normal text-black leading-[0.9] tracking-tight">
            Discover<br />
            your<br />
            <span className="italic font-light">perfect</span><br />
            style.
          </h1>

          <div className="flex items-center gap-6 pt-8 border-t border-gray-100 mt-8 md:mt-0">
            <a
              href="/outfits"
              className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-400 transition-colors duration-200"
            >
              Explore the Collection
              <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current group-hover:translate-x-0.5 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="w-px h-4 bg-gray-200" />
            <a
              href="/trends"
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
            >
              Summer 2026 Trends
            </a>
          </div>
        </div>

        {/* Right column — iç padding kaldırıldı, görsel viewport sağ kenarına kadar uzanır */}
        <div className="hidden md:block md:col-span-5 relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100" />
          <div className="absolute inset-0">
            <div className="relative h-full overflow-hidden bg-gray-100">
              <ImgPlaceholder className="w-full h-full" />
            </div>
          </div>
        </div>

      </div>

      {/* Mobile image strip */}
      <div className="md:hidden">
        <div className="container-page pb-10">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <ImgPlaceholder className="w-full h-full" />
          </div>
        </div>
      </div>

    </section>
  );
}
